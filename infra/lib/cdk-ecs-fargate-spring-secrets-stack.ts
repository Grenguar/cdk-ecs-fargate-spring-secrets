import * as cdk from "@aws-cdk/core";
import { Vpc } from "@aws-cdk/aws-ec2";
import {
  Cluster,
  ContainerImage,
  FargateTaskDefinition,
  LogDrivers,
  Secret,
} from "@aws-cdk/aws-ecs";
import { SpecificProps } from "../model/specific-props";
import { Role } from "@aws-cdk/aws-iam/lib/role";
import { ServicePrincipal } from "@aws-cdk/aws-iam/lib/principals";
import { ManagedPolicy } from "@aws-cdk/aws-iam/lib/managed-policy";
import { StringParameter } from "@aws-cdk/aws-ssm/lib/parameter";
import { RetentionDays } from "@aws-cdk/aws-logs/lib/log-group";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class CdkEcsFargateSpringSecretsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: SpecificProps) {
    super(scope, id, props);
    const { stage } = props;

    // The code that defines your stack goes here
    const vpc = new Vpc(this, "VPC", {
      maxAzs: 3,
      natGateways: 1,
    });

    const cluster = new Cluster(this, "ECSCluster", {
      vpc,
      clusterName: `${stage}-ecs-cluster`,
    });

    const taskRole = new Role(this, "DemoTaskRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonECSTaskExecutionRolePolicy"
        ),
      ],
    });

    const user = StringParameter.fromStringParameterAttributes(this, "User", {
      parameterName: `/${stage}/demo/user`,
    });

    const password = StringParameter.fromSecureStringParameterAttributes(
      this,
      "Password",
      {
        parameterName: `/${stage}/demo/password`,
        version: 1,
      }
    );

    user.grantRead(taskRole);
    password.grantRead(taskRole);

    const demoTaskDefinition = new FargateTaskDefinition(
      this,
      `${stage}-demo-task-definition`,
      {
        memoryLimitMiB: 512,
        cpu: 256,
        taskRole,
      }
    );

    demoTaskDefinition
      .addContainer("DemoContainer", {
        image: ContainerImage.fromAsset("../code/demo"),
        environment: {
          USER: user.stringValue,
        },
        secrets: {
          PASSWORD: Secret.fromSsmParameter(password),
        },
        memoryLimitMiB: 512,
        logging: LogDrivers.awsLogs({
          streamPrefix: "DemoContainerLogs",
          logRetention: RetentionDays.ONE_WEEK,
        }),
      })
      .addPortMappings({
        containerPort: 80,
      });

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${stage}-demo-service-with-lb`,
      {
        cluster,
        cpu: 512,
        desiredCount: 1,
        memoryLimitMiB: 512,
        publicLoadBalancer: true,
        taskDefinition: demoTaskDefinition,
        listenerPort: 80,
      }
    );
  }
}

import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
  SynthUtils,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as CdkEcsFargateSpringSecrets from "../lib/cdk-ecs-fargate-spring-secrets-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkEcsFargateSpringSecrets.CdkEcsFargateSpringSecretsStack(
    app,
    "MyTestStack",
    {
      stage: "dev",
    }
  );
  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

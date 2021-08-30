# Deploying Spring app to AWS ECS with Fargate and CDK

[![Deploy](https://github.com/Grenguar/cdk-ecs-fargate-spring-secrets/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Grenguar/cdk-ecs-fargate-spring-secrets/actions/workflows/deploy.yml)

This is a CDK app which is deploying Kotlin Spring app to the AWS ECS as Fargate service with Load Balancer. The great part that this project includes GitHub Actions template and AWS SSM to store secrets.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

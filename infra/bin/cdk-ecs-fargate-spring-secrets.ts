#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEcsFargateSpringSecretsStack } from '../lib/cdk-ecs-fargate-spring-secrets-stack';

const app = new cdk.App();
new CdkEcsFargateSpringSecretsStack(app, 'CdkEcsFargateSpringSecretsStack');

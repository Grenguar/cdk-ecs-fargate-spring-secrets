import { StackProps } from "@aws-cdk/core";

export interface SpecificProps extends StackProps {
  stage: String;
}

export class LambdaStepFunction {
  name: string;
  arn: string;
  nextFunction: LambdaStepFunction;

  constructor(name: string, arn: string) {
    this.name = name;
    this.arn = arn;
  }
  
  withNextStep(lambdaFunction: LambdaStepFunction) {
    this.nextFunction = lambdaFunction;
    return this;
  }
}

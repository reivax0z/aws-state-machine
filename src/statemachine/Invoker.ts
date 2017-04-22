import {LambdaStepFunction} from '../stepfunction/LambdaStepFunction';

export interface Invoker {
  invoke(lambdaFunction: LambdaStepFunction, payload: any): Promise<any>;
}

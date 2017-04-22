import {LambdaStepFunction} from './LambdaStepFunction';
import {STEP1_ARN, STEP2_ARN, STEP3_ARN} from '../Config';

export const STEPS = new LambdaStepFunction('step1', STEP1_ARN)
  .withNextStep(
    new LambdaStepFunction('step2', STEP2_ARN)
      .withNextStep(
        new LambdaStepFunction('step3', STEP3_ARN)));

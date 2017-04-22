import {ENVIRONMENT} from './Constants';

// AWS arn values for each step function
export const STEP1_ARN = process.env.STEP1_ARN || 'STEP1_ARN';
export const STEP2_ARN = process.env.STEP2_ARN || 'STEP2_ARN';
export const STEP3_ARN = process.env.STEP3_ARN || 'STEP3_ARN';

// Defines what environment we are running in
export const RUNNING_ENV = process.env.RUNNING_ENV || ENVIRONMENT.LOCAL;

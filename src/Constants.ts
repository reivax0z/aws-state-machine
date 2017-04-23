import {LambdaInvoker} from './statemachine/LambdaInvoker';
import {LocalInvoker} from './statemachine/LocalInvoker';

export const ENVIRONMENT = {
  LOCAL: 'LOCAL',
  REMOTE: 'REMOTE'
}

export const localInvoker = new LocalInvoker();
export const remoteInvoker = new LambdaInvoker();

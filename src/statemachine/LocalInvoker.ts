import {LambdaStepFunction} from '../stepfunction/LambdaStepFunction';
import {LOGGER} from '../logger/Logger';
import {Invoker} from './Invoker';
import Step1Handler = require('../handler/Step1Handler');
import Step2Handler = require('../handler/Step2Handler');
import Step3Handler = require('../handler/Step3Handler');

export class LocalInvoker implements Invoker {

  invoke(lambdaFunction: LambdaStepFunction, payload: any): Promise<any> {
    let stepHandler;

    switch(lambdaFunction.arn) {
      case 'STEP1_ARN': stepHandler = Step1Handler;
      break;
      case 'STEP2_ARN': stepHandler = Step2Handler;
      break;
      case 'STEP3_ARN': stepHandler = Step3Handler;
      break;
    }
    
    return new Promise((resolve, reject) => {
      stepHandler.handler(payload, null, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

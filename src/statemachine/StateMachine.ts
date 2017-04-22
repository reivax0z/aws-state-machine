import async = require('async');

import {LambdaStepFunction} from '../stepfunction/LambdaStepFunction';
import {LambdaInvoker} from './LambdaInvoker';
import {LocalInvoker} from './LocalInvoker';
import {Invoker} from './Invoker';
import {LOGGER} from '../logger/Logger';
import {ENVIRONMENT} from '../Constants';
import {RUNNING_ENV} from '../Config';

const localInvoker = new LocalInvoker();
const remoteInvoker = new LambdaInvoker();

export abstract class StateMachine {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getInvoker(): Invoker {
    if (RUNNING_ENV === ENVIRONMENT.LOCAL) {
      return localInvoker;
    } else {
      return remoteInvoker;
    }
  }

  abstract getEntryStep(): LambdaStepFunction;

  start(payload: any): Promise<any> {
    let currentStep = this.getEntryStep();
    let currentPayload = payload;
    let invoker = this.getInvoker();

    return new Promise((resolve, reject) => {
      async.doUntil(
        (cb) => {
          invoker.invoke(currentStep, currentPayload)
          .then((data) => {
            currentStep = currentStep.nextFunction;
            currentPayload = data;
            cb();
          })
          .catch((error) => {
            cb(error);
          });
        },
        () => {
          // finish when no more step is available
          return currentStep == null;
        },
        (err, data) => {
          if (err) {
            LOGGER.error('Failure to complete the StateMachine %s, stopped at step=%s - ', this.name, currentStep.name, err);
            reject(err);
          } else {
            LOGGER.info('Successfully completed the StateMachine %s with returned data - ', this.name, currentPayload);
            resolve(currentPayload);
          }
        }
      );
    });
  }
}
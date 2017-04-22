import AWS = require('aws-sdk');

import {LambdaStepFunction} from '../stepfunction/LambdaStepFunction';
import {LOGGER} from '../logger/Logger';
import {Invoker} from './Invoker';

// Note that your credentials need to be in the following file:
// C:\Users\USER_NAME\.aws\credentials

// And containing the following information:
// aws_access_key_id = <YOUR_ACCESS_KEY_ID>
// aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>

const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
});

export class LambdaInvoker implements Invoker {

  invoke(lambdaFunction: LambdaStepFunction, payload: any): Promise<any> {

    let params = {
      FunctionName: lambdaFunction.arn,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: payload
    };

    return new Promise((resolve, reject) => {
      lambda.invoke(params, function(err, data) {
        if (err) {
          LOGGER.error('Failure while calling function %s - ', lambdaFunction.name, err);
          reject(err);
        }
        else {
          if (data.FunctionError) {
            LOGGER.error('FunctionError happened while calling function %s - ', lambdaFunction.name, data.FunctionError);
            reject(data.Payload);
          }
          LOGGER.info('Successfully called function %s, returning data - ', lambdaFunction.name, data.Payload);
          resolve(data.Payload);
        }
      });
    });
  }
}

import {StateMachine} from './StateMachine';
import {STEPS} from '../stepfunction/Steps';
import {LambdaStepFunction} from '../stepfunction/LambdaStepFunction';

export class ExampleStateMachine extends StateMachine {

  constructor() {
    super('example-state-machine');
  }

  getEntryStep(): LambdaStepFunction {
    return STEPS;
  }
}

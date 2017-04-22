import {ExampleStateMachine} from './statemachine/ExampleStateMachine';
import {LOGGER} from './logger/Logger';

const exampleStateMachine = new ExampleStateMachine();

/**
TODO: Use express to expose a start service
**/
let handler = function(event: any, context: any, callback: any) {
  let input = {
    data: 'SomeData'
  }
  LOGGER.debug('Starting StateMachine');
  exampleStateMachine.start(JSON.stringify(input));
  LOGGER.debug('Finished StateMachine');
}

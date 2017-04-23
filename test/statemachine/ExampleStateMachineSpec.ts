import chai = require('chai');
import sinon = require('sinon');

import {ExampleStateMachine} from '../../src/statemachine/ExampleStateMachine';
import {STEPS} from '../../src/stepfunction/Steps';
import {ENVIRONMENT} from '../../src/Constants';
import {remoteInvoker} from '../../src/Constants';

let assert = chai.assert;
let expect = chai.expect;

describe('ExampleStateMachine', () => {

  describe('Object', () => {
    it('Creates an object with appropriate properties', () => {
      let machine = new ExampleStateMachine();

      assert.equal(machine.name, 'example-state-machine');
      expect(machine.getEntryStep()).to.equal(STEPS);
    });
  });

  describe('Methods', () => {

    let mock;
    let payload = {
      data: 'inputData'
    };

    beforeEach(() => {
      mock = sinon.mock(remoteInvoker);
      mock.expects('invoke')
        .once()
        .withArgs(STEPS, payload)
        .returns(Promise.resolve({data: 'output1'}));
      mock.expects('invoke')
        .once()
        .withArgs(STEPS.nextFunction, {data: 'output1'})
        .returns(Promise.resolve({data: 'output2'}));
      mock.expects('invoke')
        .once()
        .withArgs(STEPS.nextFunction.nextFunction, {data: 'output2'})
        .returns(Promise.resolve({data: 'output3'}));
    });

    afterEach(() => {
      mock.restore();
    });

    it('start', (done) => {
      let machine = new ExampleStateMachine();

      machine.start(payload).then((data) => {
        mock.verify();
        expect(data).to.deep.equal({data: 'output3'});
        done();
      });
    });
  });

});

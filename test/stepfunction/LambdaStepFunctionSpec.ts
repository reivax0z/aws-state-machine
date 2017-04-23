import chai = require('chai');

import {LambdaStepFunction} from '../../src/stepfunction/LambdaStepFunction';

let assert = chai.assert;
let expect = chai.expect;

describe('LambdaStepFunction', () => {

  it('Creates an object with appropriate properties', () => {
    let lambda = new LambdaStepFunction('name', 'arn');

    assert.equal(lambda.name, 'name');
    assert.equal(lambda.arn, 'arn');
    expect(lambda.nextFunction).to.be.undefined;
  });

  it('Allows to include a next step', () => {
    let lambdaNext = new LambdaStepFunction('nameNext', 'arnNext');
    let lambda = new LambdaStepFunction('name', 'arn').withNextStep(lambdaNext);
    
    expect(lambda.nextFunction).to.equal(lambdaNext);
  });
});

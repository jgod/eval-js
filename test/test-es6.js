import assert from 'assert';
import _eval from '../prod/eval.js';

// Same test cases as C++ version (since this is a port)

function evalWithVar(str, _var, val) {
  const VARS = new Map();
  VARS.set(_var, val);
  return _eval(str, VARS);
}

function evalWithFn(str, fnName, val) {
  const FNS = new Map();
  fns.set(fnName, () => val);
  return _eval(str, new Map(), FNS);
}

describe('basic evaluation', () => {
  it('nothing', () => assert.equal(_eval(''), 0));
  it('only whitespace', () => assert.equal(_eval('     '), 0));
  it('number', () => assert.equal(_eval('2'), 2));

  describe('decimals', () => {
    it('basic', () => assert.equal(_eval('2.5'), 2.5));
    it('operations', () => assert.equal(_eval('2.5*2 + 1.75'), 6.75));
  });
});

'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _eval2 = require('../prod/eval.js');

var _eval3 = _interopRequireDefault(_eval2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Same test cases as C++ version (since this is a port)

function evalWithVar(str, _var, val) {
  var VARS = new Map();
  VARS.set(_var, val);
  return (0, _eval3.default)(str, VARS);
}

function evalWithFn(str, fnName, val) {
  var FNS = new Map();
  fns.set(fnName, function () {
    return val;
  });
  return (0, _eval3.default)(str, new Map(), FNS);
}

describe('basic evaluation', function () {
  it('nothing', function () {
    return _assert2.default.equal((0, _eval3.default)(''), 0);
  });
  it('only whitespace', function () {
    return _assert2.default.equal((0, _eval3.default)('     '), 0);
  });
  it('number', function () {
    return _assert2.default.equal((0, _eval3.default)('2'), 2);
  });

  describe('decimals', function () {
    it('basic', function () {
      return _assert2.default.equal((0, _eval3.default)('2.5'), 2.5);
    });
    it('operations', function () {
      return _assert2.default.equal((0, _eval3.default)('2.5*2 + 1.75'), 6.75);
    });
  });
});
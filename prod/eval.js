'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
The MIT License (MIT)

Copyright (c) 2017 Justin Godesky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var _EVAL = {
  bindBuiltIns: function bindBuiltIns(vars, fns) {
    vars.set('pi', Math.PI);
    fns.set('abs', Math.abs);
    fns.set('sqrt', Math.sqrt);fns.set('cbrt', Math.cbrt);
    fns.set('sin', Math.sin);fns.set('cos', Math.cos);fns.set('tan', Math.tan);
    fns.set('asin', Math.asin);fns.set('acos', Math.asin);fns.set('atan', Math.atan);
    fns.set('floor', Math.floor);fns.set('ceil', Math.floor);fns.set('trunc', Math.trunc);
    fns.set('round', Math.round);
    fns.set('hypot', Math.hypot);
  }
};

exports.default = function (str) {
  var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
  var fns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();

  if (!str || typeof str !== 'string' || !str.length || str === '') return 0; // "null" evaluates to 0.

  str.replace(/\s/g, ''); // Remove whitespace.
  if (!str.length) return 0;

  _EVAL.bindBuiltIns(vars, fns);
  var Q = _EVAL.read(_EVAL.rewriteExpression(str), vars, fns);
  return _EVAL.queue(Q);
};
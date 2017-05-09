/*
The MIT License (MIT)

Copyright (c) 2017 Justin Godesky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Make it clear that this is an implementation.
const _EVAL = {
  // Utils
  replaceAll(str, search, r) => str.replace(new RegExp(search, 'g'), r)

  // Type Checking
  isNumber() {

  }

  bindBuiltIns(vars, fns) {
    vars.set('pi', Math.PI);
    fns.set('abs', Math.abs);
    fns.set('sqrt', Math.sqrt); fns.set('cbrt', Math.cbrt);
    fns.set('sin', Math.sin); fns.set('cos', Math.cos); fns.set('tan', Math.tan);
    fns.set('asin', Math.asin); fns.set('acos', Math.asin); fns.set('atan', Math.atan);
    fns.set('floor', Math.floor); fns.set('ceil', Math.floor); fns.set('trunc', Math.trunc);
    fns.set('round', Math.round);
    fns.set('hypot', Math.hypot);
  },

// Evaluation
  /**
   * Rewrites an expression to something that can be tokenized easier.
   *
   * @param  {String} exp
   * @return {String}
   */
  rewriteExpression(exp) {
    // Rewriting adjacent operators:
    // Unary operators next to binary operators of the same symbol can easily be
    // rewritten throughout the whole string all at once.
    exp = this.replaceAll(exp, '+-', '-');
    exp = this.replaceAll(exp, '-+', '-');
    exp = this.replaceAll(exp, '++', '+');
    exp = this.replaceAll(exp, '--', '+');
    return exp;
  }
};

/**
 * Evaluates a string by tokenizing, creating an RPN stack, and evaluating it.
 *
 * @param  {String} str
 * @param  {Map.<String,Number>} vars
 * @param  {Map.<String,Function} fns
 * @return {Number} result
 */
export default (str, vars=new Map(), fns=new Map()) => {
  if (!str ||
  typeof str !== 'string' ||
  !str.length ||
  str === '') return 0; // 'null' evaluates to 0.

  str.replace(/\s/g, ''); // Remove whitespace.
  if (!str.length) return 0;

  _EVAL.bindBuiltIns(vars, fns);
  const Q = _EVAL.read(_EVAL.rewriteExpression(str), vars, fns);
  return _EVAL.queue(Q);
};

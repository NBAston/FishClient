
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/decimal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49ecbDLHJlITYn29magvOf+', 'decimal');
// frames/util/decimal.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! decimal.js v10.0.1 https://github.com/MikeMcl/decimal.js/LICENCE */
;

(function (globalScope) {
  'use strict';
  /*
   *  decimal.js v10.0.1
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */
  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //
  // The maximum exponent magnitude.
  // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.

  var EXP_LIMIT = 9e15,
      // 0 to 9e15
  // The limit on the value of `precision`, and on the value of the first argument to
  // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
  MAX_DIGITS = 1e9,
      // 0 to 1e9
  // Base conversion alphabet.
  NUMERALS = '0123456789abcdef',
      // The natural logarithm of 10 (1025 digits).
  LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
      // Pi (1025 digits).
  PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
      // The initial configuration properties of the Decimal constructor.
  DEFAULTS = {
    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed at run-time using the `Decimal.config` method.
    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,
    // 1 to MAX_DIGITS
    // The rounding mode used when rounding to `precision`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,
    // 0 to 8
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP         0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN  6 The IEEE 754 remainder function.
    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
    //
    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
    // division (9) are commonly used for the modulus operation. The other rounding modes can also
    // be used, but they may not give useful results.
    modulo: 1,
    // 0 to 9
    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,
    // 0 to -EXP_LIMIT
    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos: 21,
    // 0 to EXP_LIMIT
    // The minimum exponent value, beneath which underflow to zero occurs.
    // JavaScript numbers: -324  (5e-324)
    minE: -EXP_LIMIT,
    // -1 to -EXP_LIMIT
    // The maximum exponent value, above which overflow to Infinity occurs.
    // JavaScript numbers: 308  (1.7976931348623157e+308)
    maxE: EXP_LIMIT,
    // 1 to EXP_LIMIT
    // Whether to use cryptographically-secure random number generation, if available.
    crypto: false // true/false

  },
      // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //
  Decimal,
      inexact,
      noConflict,
      quadrant,
      external = true,
      decimalError = '[DecimalError] ',
      invalidArgument = decimalError + 'Invalid argument: ',
      precisionLimitExceeded = decimalError + 'Precision limit exceeded',
      cryptoUnavailable = decimalError + 'crypto unavailable',
      mathfloor = Math.floor,
      mathpow = Math.pow,
      isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
      isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
      isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
      isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      BASE = 1e7,
      LOG_BASE = 7,
      MAX_SAFE_INTEGER = 9007199254740991,
      LN10_PRECISION = LN10.length - 1,
      PI_PRECISION = PI.length - 1,
      // Decimal.prototype object
  P = {
    name: '[object Decimal]'
  }; // Decimal prototype methods

  /*
   *  absoluteValue             abs
   *  ceil
   *  comparedTo                cmp
   *  cosine                    cos
   *  cubeRoot                  cbrt
   *  decimalPlaces             dp
   *  dividedBy                 div
   *  dividedToIntegerBy        divToInt
   *  equals                    eq
   *  floor
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyperbolicCosine          cosh
   *  hyperbolicSine            sinh
   *  hyperbolicTangent         tanh
   *  inverseCosine             acos
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine     asinh
   *  inverseHyperbolicTangent  atanh
   *  inverseSine               asin
   *  inverseTangent            atan
   *  isFinite
   *  isInteger                 isInt
   *  isNaN
   *  isNegative                isNeg
   *  isPositive                isPos
   *  isZero
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 log
   *  [maximum]                 [max]
   *  [minimum]                 [min]
   *  minus                     sub
   *  modulo                    mod
   *  naturalExponential        exp
   *  naturalLogarithm          ln
   *  negated                   neg
   *  plus                      add
   *  precision                 sd
   *  round
   *  sine                      sin
   *  squareRoot                sqrt
   *  tangent                   tan
   *  times                     mul
   *  toBinary
   *  toDecimalPlaces           toDP
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal             toHex
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower                   pow
   *  toPrecision
   *  toSignificantDigits       toSD
   *  toString
   *  truncated                 trunc
   *  valueOf                   toJSON
   */

  /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */

  P.absoluteValue = P.abs = function () {
    var x = new this.constructor(this);
    if (x.s < 0) x.s = 1;
    return finalise(x);
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */


  P.ceil = function () {
    return finalise(new this.constructor(this), this.e + 1, 2);
  };
  /*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */


  P.comparedTo = P.cmp = function (y) {
    var i,
        j,
        xdL,
        ydL,
        x = this,
        xd = x.d,
        yd = (y = new x.constructor(y)).d,
        xs = x.s,
        ys = y.s; // Either NaN or ±Infinity?

    if (!xd || !yd) {
      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    } // Either zero?


    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0; // Signs differ?

    if (xs !== ys) return xs; // Compare exponents.

    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
    xdL = xd.length;
    ydL = yd.length; // Compare digit by digit.

    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    } // Compare lengths.


    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };
  /*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)         = 1
   * cos(-0)        = 1
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)       = NaN
   *
   */


  P.cosine = P.cos = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.d) return new Ctor(NaN); // cos(0) = cos(-0) = 1

    if (!x.d[0]) return new Ctor(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };
  /*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */


  P.cubeRoot = P.cbrt = function () {
    var e,
        m,
        n,
        r,
        rep,
        s,
        sd,
        t,
        t3,
        t3plusx,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    external = false; // Initial estimate.

    s = x.s * Math.pow(x.s * x, 1 / 3); // Math.cbrt underflow/overflow?
    // Pass x to Math.pow as integer, then adjust the exponent of the result.

    if (!s || Math.abs(s) == 1 / 0) {
      n = digitsToString(x.d);
      e = x.e; // Adjust n exponent so it is a multiple of 3 away from x exponent.

      if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? '0' : '00';
      s = Math.pow(n, 1 / 3); // Rarely, e may be one less than the result exponent value.

      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
      r.s = x.s;
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3; // Halley's method.
    // TODO? Compare Newton's method.

    for (;;) {
      t = r;
      t3 = t.times(t).times(t);
      t3plusx = t3.plus(x);
      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1); // TODO? Replace with for-loop and checkRoundingDigits.

      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
        // , i.e. approaching a rounding boundary, continue the iteration.

        if (n == '9999' || !rep && n == '4999') {
          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {
          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  /*
   * Return the number of decimal places of the value of this Decimal.
   *
   */


  P.decimalPlaces = P.dp = function () {
    var w,
        d = this.d,
        n = NaN;

    if (d) {
      w = d.length - 1;
      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE; // Subtract the number of trailing zeros of the last word.

      w = d[w];
      if (w) for (; w % 10 == 0; w /= 10) {
        n--;
      }
      if (n < 0) n = 0;
    }

    return n;
  };
  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */


  P.dividedBy = P.div = function (y) {
    return divide(this, new this.constructor(y));
  };
  /*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */


  P.dividedToIntegerBy = P.divToInt = function (y) {
    var x = this,
        Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };
  /*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */


  P.equals = P.eq = function (y) {
    return this.cmp(y) === 0;
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */


  P.floor = function () {
    return finalise(new this.constructor(this), this.e + 1, 3);
  };
  /*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */


  P.greaterThan = P.gt = function (y) {
    return this.cmp(y) > 0;
  };
  /*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */


  P.greaterThanOrEqualTo = P.gte = function (y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
  };
  /*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)         = 1
   * cosh(-0)        = 1
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)       = NaN
   *
   *  x        time taken (ms)   result
   * 1000      9                 9.8503555700852349694e+433
   * 10000     25                4.4034091128314607936e+4342
   * 100000    171               1.4033316802130615897e+43429
   * 1000000   3817              1.5166076984010437725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */


  P.hyperbolicCosine = P.cosh = function () {
    var k,
        n,
        pr,
        rm,
        len,
        x = this,
        Ctor = x.constructor,
        one = new Ctor(1);
    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero()) return one;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length; // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))
    // Estimate the optimum number of times to use the argument reduction.
    // TODO? Estimation reused from cosine() and may not be optimal here.

    if (len < 32) {
      k = Math.ceil(len / 3);
      n = Math.pow(4, -k).toString();
    } else {
      k = 16;
      n = '2.3283064365386962890625e-10';
    }

    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true); // Reverse argument reduction

    var cosh2_x,
        i = k,
        d8 = new Ctor(8);

    for (; i--;) {
      cosh2_x = x.times(x);
      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }

    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  /*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)         = 0
   * sinh(-0)        = -0
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)       = NaN
   *
   * x        time taken (ms)
   * 10       2 ms
   * 100      5 ms
   * 1000     14 ms
   * 10000    82 ms
   * 100000   886 ms            1.4033316802130615897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms          8.7080643612718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */


  P.hyperbolicSine = P.sinh = function () {
    var k,
        pr,
        rm,
        len,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;

    if (len < 3) {
      x = taylorSeries(Ctor, 2, x, x, true);
    } else {
      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
      // 3 multiplications and 1 addition
      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
      // 4 multiplications and 2 additions
      // Estimate the optimum number of times to use the argument reduction.
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;
      x = x.times(Math.pow(5, -k));
      x = taylorSeries(Ctor, 2, x, x, true); // Reverse argument reduction

      var sinh2_x,
          d5 = new Ctor(5),
          d16 = new Ctor(16),
          d20 = new Ctor(20);

      for (; k--;) {
        sinh2_x = x.times(x);
        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
    }

    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(x, pr, rm, true);
  };
  /*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)         = 0
   * tanh(-0)        = -0
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)       = NaN
   *
   */


  P.hyperbolicTangent = P.tanh = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(x.s);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;
    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };
  /*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)       = pi/2
   * acos(-0)      = pi/2
   * acos(1)       = 0
   * acos(-1)      = pi
   * acos(1/2)     = pi/3
   * acos(-1/2)    = 2*pi/3
   * acos(|x| > 1) = NaN
   * acos(NaN)     = NaN
   *
   */


  P.inverseCosine = P.acos = function () {
    var halfPi,
        x = this,
        Ctor = x.constructor,
        k = x.abs().cmp(1),
        pr = Ctor.precision,
        rm = Ctor.rounding;

    if (k !== -1) {
      return k === 0 // |x| is 1
      ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) // |x| > 1 or x is NaN
      : new Ctor(NaN);
    }

    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5); // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return halfPi.minus(x);
  };
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)     = NaN
   * acosh(NaN)       = NaN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)         = NaN
   * acosh(-0)        = NaN
   * acosh(1)         = 0
   * acosh(-1)        = NaN
   *
   */


  P.inverseHyperbolicCosine = P.acosh = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).minus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)       = NaN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)         = 0
   * asinh(-0)        = -0
   *
   */


  P.inverseHyperbolicSine = P.asinh = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).plus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)       = NaN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)         = 0
   * atanh(-0)        = -0
   * atanh(1)         = Infinity
   * atanh(-1)        = -Infinity
   *
   */


  P.inverseHyperbolicTangent = P.atanh = function () {
    var pr,
        rm,
        wpr,
        xsd,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();
    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
    Ctor.precision = wpr = xsd - x.e;
    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
    Ctor.precision = pr + 4;
    Ctor.rounding = 1;
    x = x.ln();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(0.5);
  };
  /*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)       = 0
   * asin(-0)      = -0
   * asin(1/2)     = pi/6
   * asin(-1/2)    = -pi/6
   * asin(1)       = pi/2
   * asin(-1)      = -pi/2
   * asin(|x| > 1) = NaN
   * asin(NaN)     = NaN
   *
   * TODO? Compare performance of Taylor series.
   *
   */


  P.inverseSine = P.asin = function () {
    var halfPi,
        k,
        pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (x.isZero()) return new Ctor(x);
    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;

    if (k !== -1) {
      // |x| is 1
      if (k === 0) {
        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
        halfPi.s = x.s;
        return halfPi;
      } // |x| > 1 or x is NaN


      return new Ctor(NaN);
    } // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6


    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
  };
  /*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)         = 0
   * atan(-0)        = -0
   * atan(1)         = pi/4
   * atan(-1)        = -pi/4
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)       = NaN
   *
   */


  P.inverseTangent = P.atan = function () {
    var i,
        j,
        k,
        n,
        px,
        t,
        r,
        wpr,
        x2,
        x = this,
        Ctor = x.constructor,
        pr = Ctor.precision,
        rm = Ctor.rounding;

    if (!x.isFinite()) {
      if (!x.s) return new Ctor(NaN);

      if (pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.5);
        r.s = x.s;
        return r;
      }
    } else if (x.isZero()) {
      return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.25);
      r.s = x.s;
      return r;
    }

    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1; // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);
    // Argument reduction
    // Ensure |x| < 0.42
    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

    k = Math.min(28, wpr / LOG_BASE + 2 | 0);

    for (i = k; i; --i) {
      x = x.div(x.times(x).plus(1).sqrt().plus(1));
    }

    external = false;
    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x; // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...

    for (; i !== -1;) {
      px = px.times(x2);
      t = r.minus(px.div(n += 2));
      px = px.times(x2);
      r = t.plus(px.div(n += 2));
      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;) {
        ;
      }
    }

    if (k) r = r.times(2 << k - 1);
    external = true;
    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  /*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */


  P.isFinite = function () {
    return !!this.d;
  };
  /*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */


  P.isInteger = P.isInt = function () {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };
  /*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */


  P.isNaN = function () {
    return !this.s;
  };
  /*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */


  P.isNegative = P.isNeg = function () {
    return this.s < 0;
  };
  /*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */


  P.isPositive = P.isPos = function () {
    return this.s > 0;
  };
  /*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */


  P.isZero = function () {
    return !!this.d && this.d[0] === 0;
  };
  /*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */


  P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0;
  };
  /*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */


  P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) < 1;
  };
  /*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */


  P.logarithm = P.log = function (base) {
    var isBase10,
        d,
        denominator,
        k,
        inf,
        num,
        sd,
        r,
        arg = this,
        Ctor = arg.constructor,
        pr = Ctor.precision,
        rm = Ctor.rounding,
        guard = 5; // Default base is 10.

    if (base == null) {
      base = new Ctor(10);
      isBase10 = true;
    } else {
      base = new Ctor(base);
      d = base.d; // Return NaN if base is negative, or non-finite, or is 0 or 1.

      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
      isBase10 = base.eq(10);
    }

    d = arg.d; // Is arg negative, non-finite, 0 or 1?

    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    } // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
    // integer power of 10.


    if (isBase10) {
      if (d.length > 1) {
        inf = true;
      } else {
        for (k = d[0]; k % 10 === 0;) {
          k /= 10;
        }

        inf = k !== 1;
      }
    }

    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd); // The result will have 5 rounding digits.

    r = divide(num, denominator, sd, 1); // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
    // calculate 10 further digits.
    //
    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
    // that the result is above or below the boundary. Otherwise, if after calculating the 10
    // further digits, the last 14 are nines, round up and assume the result is exact.
    // Also assume the result is exact if the last 14 are zero.
    //
    // Example of a result that will be incorrectly rounded:
    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
    // place is still 2.6.

    if (checkRoundingDigits(r.d, k = pr, rm)) {
      do {
        sd += 10;
        num = naturalLogarithm(arg, sd);
        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
        r = divide(num, denominator, sd, 1);

        if (!inf) {
          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }

          break;
        }
      } while (checkRoundingDigits(r.d, k += 10, rm));
    }

    external = true;
    return finalise(r, pr, rm);
  };
  /*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'lt');
  };
   */

  /*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'gt');
  };
   */

  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */


  P.minus = P.sub = function (y) {
    var d,
        e,
        i,
        j,
        k,
        len,
        pr,
        rm,
        xd,
        xe,
        xLTy,
        yd,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y); // If either is not finite...

    if (!x.d || !y.d) {
      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN); // Return y negated if x is finite and y is ±Infinity.
      else if (x.d) y.s = -y.s; // Return x if y is finite and x is ±Infinity.
        // Return x if both are ±Infinity with different signs.
        // Return NaN if both are ±Infinity with the same sign.
        else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
      return y;
    } // If signs differ...


    if (x.s != y.s) {
      y.s = -y.s;
      return x.plus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding; // If either is zero...

    if (!xd[0] || !yd[0]) {
      // Return y negated if x is zero and y is non-zero.
      if (yd[0]) y.s = -y.s; // Return x if y is zero and x is non-zero.
      else if (xd[0]) y = new Ctor(x); // Return zero if both are zero.
        // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
        else return new Ctor(rm === 3 ? -0 : 0);
      return external ? finalise(y, pr, rm) : y;
    } // x and y are finite, non-zero numbers with the same sign.
    // Calculate base 1e7 exponents.


    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);
    xd = xd.slice();
    k = xe - e; // If base 1e7 exponents differ...

    if (k) {
      xLTy = k < 0;

      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      } // Numbers with massively different exponents would result in a very high number of
      // zeros needing to be prepended, but this can be avoided while still ensuring correct
      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.


      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

      if (k > i) {
        k = i;
        d.length = 1;
      } // Prepend zeros to equalise exponents.


      d.reverse();

      for (i = k; i--;) {
        d.push(0);
      }

      d.reverse(); // Base 1e7 exponents equal.
    } else {
      // Check digits to determine which is the bigger number.
      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;

      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }

      k = 0;
    }

    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }

    len = xd.length; // Append zeros to `xd` if shorter.
    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.

    for (i = yd.length - len; i > 0; --i) {
      xd[len++] = 0;
    } // Subtract yd from xd.


    for (i = yd.length; i > k;) {
      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0;) {
          xd[j] = BASE - 1;
        }

        --xd[j];
        xd[i] += BASE;
      }

      xd[i] -= yd[i];
    } // Remove trailing zeros.


    for (; xd[--len] === 0;) {
      xd.pop();
    } // Remove leading zeros and adjust exponent accordingly.


    for (; xd[0] === 0; xd.shift()) {
      --e;
    } // Zero?


    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */


  P.modulo = P.mod = function (y) {
    var q,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y); // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.

    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN); // Return x if y is ±Infinity or x is ±0.

    if (!y.d || x.d && !x.d[0]) {
      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    } // Prevent rounding of intermediate calculations.


    external = false;

    if (Ctor.modulo == 9) {
      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // result = x - q * y    where  0 <= result < abs(y)
      q = divide(x, y.abs(), 0, 3, 1);
      q.s *= y.s;
    } else {
      q = divide(x, y, 0, Ctor.modulo, 1);
    }

    q = q.times(y);
    external = true;
    return x.minus(q);
  };
  /*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */


  P.naturalExponential = P.exp = function () {
    return naturalExponential(this);
  };
  /*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */


  P.naturalLogarithm = P.ln = function () {
    return naturalLogarithm(this);
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */


  P.negated = P.neg = function () {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
  };
  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */


  P.plus = P.add = function (y) {
    var carry,
        d,
        e,
        i,
        k,
        len,
        pr,
        rm,
        xd,
        yd,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y); // If either is not finite...

    if (!x.d || !y.d) {
      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN); // Return x if y is finite and x is ±Infinity.
      // Return x if both are ±Infinity with the same sign.
      // Return NaN if both are ±Infinity with different signs.
      // Return y if x is finite and y is ±Infinity.
      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
      return y;
    } // If signs differ...


    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding; // If either is zero...

    if (!xd[0] || !yd[0]) {
      // Return x if y is zero.
      // Return y if y is non-zero.
      if (!yd[0]) y = new Ctor(x);
      return external ? finalise(y, pr, rm) : y;
    } // x and y are finite, non-zero numbers with the same sign.
    // Calculate base 1e7 exponents.


    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);
    xd = xd.slice();
    i = k - e; // If base 1e7 exponents differ...

    if (i) {
      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      } // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.


      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;

      if (i > len) {
        i = len;
        d.length = 1;
      } // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.


      d.reverse();

      for (; i--;) {
        d.push(0);
      }

      d.reverse();
    }

    len = xd.length;
    i = yd.length; // If yd is longer than xd, swap xd and yd so xd points to the longer array.

    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    } // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.


    for (carry = 0; i;) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }

    if (carry) {
      xd.unshift(carry);
      ++e;
    } // Remove trailing zeros.
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0


    for (len = xd.length; xd[--len] == 0;) {
      xd.pop();
    }

    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  /*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */


  P.precision = P.sd = function (z) {
    var k,
        x = this;
    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

    if (x.d) {
      k = getPrecision(x.d);
      if (z && x.e + 1 > k) k = x.e + 1;
    } else {
      k = NaN;
    }

    return k;
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */


  P.round = function () {
    var x = this,
        Ctor = x.constructor;
    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };
  /*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)         = 0
   * sin(-0)        = -0
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)       = NaN
   *
   */


  P.sine = P.sin = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = sine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };
  /*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */


  P.squareRoot = P.sqrt = function () {
    var m,
        n,
        sd,
        r,
        rep,
        t,
        x = this,
        d = x.d,
        e = x.e,
        s = x.s,
        Ctor = x.constructor; // Negative/NaN/Infinity/zero?

    if (s !== 1 || !d || !d[0]) {
      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }

    external = false; // Initial estimate.

    s = Math.sqrt(+x); // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.

    if (s == 0 || s == 1 / 0) {
      n = digitsToString(d);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3; // Newton-Raphson iteration.

    for (;;) {
      t = r;
      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5); // TODO? Replace with for-loop and checkRoundingDigits.

      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
        // 4999, i.e. approaching a rounding boundary, continue the iteration.

        if (n == '9999' || !rep && n == '4999') {
          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {
          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  /*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)         = 0
   * tan(-0)        = -0
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)       = NaN
   *
   */


  P.tangent = P.tan = function () {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;
    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };
  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */


  P.times = P.mul = function (y) {
    var carry,
        e,
        i,
        k,
        r,
        rL,
        t,
        xdL,
        ydL,
        x = this,
        Ctor = x.constructor,
        xd = x.d,
        yd = (y = new Ctor(y)).d;
    y.s *= x.s; // If either is NaN, ±Infinity or ±0...

    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd // Return NaN if either is NaN.
      // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
      ? NaN // Return ±Infinity if either is ±Infinity.
      // Return ±0 if either is ±0.
      : !xd || !yd ? y.s / 0 : y.s * 0);
    }

    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length; // Ensure xd points to the longer array.

    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    } // Initialise the result array with zeros.


    r = [];
    rL = xdL + ydL;

    for (i = rL; i--;) {
      r.push(0);
    } // Multiply!


    for (i = ydL; --i >= 0;) {
      carry = 0;

      for (k = xdL + i; k > i;) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }

      r[k] = (r[k] + carry) % BASE | 0;
    } // Remove trailing zeros.


    for (; !r[--rL];) {
      r.pop();
    }

    if (carry) ++e;else r.shift();
    y.d = r;
    y.e = getBase10Exponent(r, e);
    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };
  /*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toBinary = function (sd, rm) {
    return toStringBinary(this, 2, sd, rm);
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toDecimalPlaces = P.toDP = function (dp, rm) {
    var x = this,
        Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0) return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
    return finalise(x, dp + x.e + 1, rm);
  };
  /*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toExponential = function (dp, rm) {
    var str,
        x = this,
        Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), dp + 1, rm);
      str = finiteToString(x, true, dp + 1);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  /*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */


  P.toFixed = function (dp, rm) {
    var str,
        y,
        x = this,
        Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
      y = finalise(new Ctor(x), dp + x.e + 1, rm);
      str = finiteToString(y, false, dp + y.e + 1);
    } // To determine whether to add the minus sign look at the value before it was rounded,
    // i.e. look at `x` rather than `y`.


    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  /*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */


  P.toFraction = function (maxD) {
    var d,
        d0,
        d1,
        d2,
        e,
        k,
        n,
        n0,
        n1,
        pr,
        q,
        r,
        x = this,
        xd = x.d,
        Ctor = x.constructor;
    if (!xd) return new Ctor(x);
    n1 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);
    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

    if (maxD == null) {
      // d is 10**e, the minimum max-denominator needed.
      maxD = e > 0 ? d : n1;
    } else {
      n = new Ctor(maxD);
      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
      maxD = n.gt(d) ? e > 0 ? d : n1 : n;
    }

    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;

    for (;;) {
      q = divide(n, d, 0, 1, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.cmp(maxD) == 1) break;
      d0 = d1;
      d1 = d2;
      d2 = n1;
      n1 = n0.plus(q.times(d2));
      n0 = d2;
      d2 = d;
      d = n.minus(q.times(d2));
      n = d2;
    }

    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s; // Determine which fraction is closer to x, n0/d0 or n1/d1?

    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
    Ctor.precision = pr;
    external = true;
    return r;
  };
  /*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toHexadecimal = P.toHex = function (sd, rm) {
    return toStringBinary(this, 16, sd, rm);
  };
  /*
   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */


  P.toNearest = function (y, rm) {
    var x = this,
        Ctor = x.constructor;
    x = new Ctor(x);

    if (y == null) {
      // If x is not finite, return x.
      if (!x.d) return x;
      y = new Ctor(1);
      rm = Ctor.rounding;
    } else {
      y = new Ctor(y);

      if (rm === void 0) {
        rm = Ctor.rounding;
      } else {
        checkInt32(rm, 0, 8);
      } // If x is not finite, return x if y is not NaN, else NaN.


      if (!x.d) return y.s ? x : y; // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.

      if (!y.d) {
        if (y.s) y.s = x.s;
        return y;
      }
    } // If y is not zero, calculate the nearest multiple of y to x.


    if (y.d[0]) {
      external = false;
      x = divide(x, y, 0, rm, 1).times(y);
      external = true;
      finalise(x); // If y is zero, return zero with the sign of x.
    } else {
      y.s = x.s;
      x = y;
    }

    return x;
  };
  /*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */


  P.toNumber = function () {
    return +this;
  };
  /*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toOctal = function (sd, rm) {
    return toStringBinary(this, 8, sd, rm);
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)                           = NaN
   *   pow(x, ±0)                            = 1
     *   pow(NaN, non-zero)                    = NaN
   *   pow(abs(x) > 1, +Infinity)            = +Infinity
   *   pow(abs(x) > 1, -Infinity)            = +0
   *   pow(abs(x) == 1, ±Infinity)           = NaN
   *   pow(abs(x) < 1, +Infinity)            = +0
   *   pow(abs(x) < 1, -Infinity)            = +Infinity
   *   pow(+Infinity, y > 0)                 = +Infinity
   *   pow(+Infinity, y < 0)                 = +0
   *   pow(-Infinity, odd integer > 0)       = -Infinity
   *   pow(-Infinity, even integer > 0)      = +Infinity
   *   pow(-Infinity, odd integer < 0)       = -0
   *   pow(-Infinity, even integer < 0)      = +0
   *   pow(+0, y > 0)                        = +0
   *   pow(+0, y < 0)                        = +Infinity
   *   pow(-0, odd integer > 0)              = -0
   *   pow(-0, even integer > 0)             = +0
   *   pow(-0, odd integer < 0)              = -Infinity
   *   pow(-0, even integer < 0)             = +Infinity
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */


  P.toPower = P.pow = function (y) {
    var e,
        k,
        pr,
        r,
        rm,
        s,
        x = this,
        Ctor = x.constructor,
        yn = +(y = new Ctor(y)); // Either ±Infinity, NaN or ±0?

    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
    x = new Ctor(x);
    if (x.eq(1)) return x;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (y.eq(1)) return finalise(x, pr, rm); // y exponent

    e = mathfloor(y.e / LOG_BASE); // If y is a small integer use the 'exponentiation by squaring' algorithm.

    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = intPow(Ctor, x, k, pr);
      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }

    s = x.s; // if x is negative

    if (s < 0) {
      // if y is not an integer
      if (e < y.d.length - 1) return new Ctor(NaN); // Result is positive if x is negative and the last digit of integer y is even.

      if ((y.d[e] & 1) == 0) s = 1; // if x.eq(-1)

      if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
        x.s = s;
        return x;
      }
    } // Estimate result exponent.
    // x^y = 10^e,  where e = y * log10(x)
    // log10(x) = log10(x_significand) + x_exponent
    // log10(x_significand) = ln(x_significand) / ln(10)


    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + '').e; // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.
    // Overflow/underflow?

    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
    external = false;
    Ctor.rounding = x.s = 1; // Estimate the extra guard digits needed to ensure five correct rounding digits from
    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
    // new Decimal(2.32456).pow('2087987436534566.46411')
    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815

    k = Math.min(12, (e + '').length); // r = x^y = exp(y*ln(x))

    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr); // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)

    if (r.d) {
      // Truncate to the required precision plus five rounding digits.
      r = finalise(r, pr + 5, 1); // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
      // the result.

      if (checkRoundingDigits(r.d, pr, rm)) {
        e = pr + 10; // Truncate to the increased precision plus five rounding digits.

        r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1); // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).

        if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
      }
    }

    r.s = s;
    external = true;
    Ctor.rounding = rm;
    return finalise(r, pr, rm);
  };
  /*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */


  P.toPrecision = function (sd, rm) {
    var str,
        x = this,
        Ctor = x.constructor;

    if (sd === void 0) {
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), sd, rm);
      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */


  P.toSignificantDigits = P.toSD = function (sd, rm) {
    var x = this,
        Ctor = x.constructor;

    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
    }

    return finalise(new Ctor(x), sd, rm);
  };
  /*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */


  P.toString = function () {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  /*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */


  P.truncated = P.trunc = function () {
    return finalise(new this.constructor(this), this.e + 1, 1);
  };
  /*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */


  P.valueOf = P.toJSON = function () {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() ? '-' + str : str;
  };
  /*
  // Add aliases to match BigDecimal method names.
  // P.add = P.plus;
  P.subtract = P.minus;
  P.multiply = P.times;
  P.divide = P.div;
  P.remainder = P.mod;
  P.compareTo = P.cmp;
  P.negate = P.neg;
   */
  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.

  /*
   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *                           finiteToString, naturalExponential, naturalLogarithm
   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase              toStringBinary, parseOther
   *  cos                      P.cos
   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
   *                           taylorSeries, atan2, parseOther
   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
   *                           naturalLogarithm, ceil, floor, round, trunc
   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *                           toStringBinary
   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
   *  getLn10                  P.logarithm, naturalLogarithm
   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
   *  getPrecision             P.precision, P.toFraction
   *  getZeroString            digitsToString, finiteToString
   *  intPow                   P.toPower, parseOther
   *  isOdd                    toLessThanHalfPi
   *  maxOrMin                 max, min
   *  naturalExponential       P.naturalExponential, P.toPower
   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *                           P.toPower, naturalExponential
   *  nonFiniteToString        finiteToString, toStringBinary
   *  parseDecimal             Decimal
   *  parseOther               Decimal
   *  sin                      P.sin
   *  taylorSeries             P.cosh, P.sinh, cos, sin
   *  toLessThanHalfPi         P.cos, P.sin
   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
   *  truncate                 intPow
   *
   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
   *                           naturalLogarithm, config, parseOther, random, Decimal
   */


  function digitsToString(d) {
    var i,
        k,
        ws,
        indexOfLastWord = d.length - 1,
        str = '',
        w = d[0];

    if (indexOfLastWord > 0) {
      str += w;

      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + '';
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }

      w = d[i];
      ws = w + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return '0';
    } // Remove trailing zeros of last w.


    for (; w % 10 === 0;) {
      w /= 10;
    }

    return str + w;
  }

  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }
  /*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */


  function checkRoundingDigits(d, i, rm, repeating) {
    var di, k, r, rd; // Get the length of the first word of the array d.

    for (k = d[0]; k >= 10; k /= 10) {
      --i;
    } // Is the rounding digit in the first word of d?


    if (--i < 0) {
      i += LOG_BASE;
      di = 0;
    } else {
      di = Math.ceil((i + 1) / LOG_BASE);
      i %= LOG_BASE;
    } // i is the index (0 - 6) of the rounding digit.
    // E.g. if within the word 3487563 the first rounding digit is 5,
    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563


    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;

    if (repeating == null) {
      if (i < 3) {
        if (i == 0) rd = rd / 100 | 0;else if (i == 1) rd = rd / 10 | 0;
        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
      } else {
        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
      }
    } else {
      if (i < 4) {
        if (i == 0) rd = rd / 1000 | 0;else if (i == 1) rd = rd / 100 | 0;else if (i == 2) rd = rd / 10 | 0;
        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
      } else {
        r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
      }
    }

    return r;
  } // Convert string of `baseIn` to an array of numbers of `baseOut`.
  // Eg. convertBase('255', 10, 16) returns [15, 15].
  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].


  function convertBase(str, baseIn, baseOut) {
    var j,
        arr = [0],
        arrL,
        i = 0,
        strL = str.length;

    for (; i < strL;) {
      for (arrL = arr.length; arrL--;) {
        arr[arrL] *= baseIn;
      }

      arr[0] += NUMERALS.indexOf(str.charAt(i++));

      for (j = 0; j < arr.length; j++) {
        if (arr[j] > baseOut - 1) {
          if (arr[j + 1] === void 0) arr[j + 1] = 0;
          arr[j + 1] += arr[j] / baseOut | 0;
          arr[j] %= baseOut;
        }
      }
    }

    return arr.reverse();
  }
  /*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */


  function cosine(Ctor, x) {
    var k,
        y,
        len = x.d.length; // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1
    // Estimate the optimum number of times to use the argument reduction.

    if (len < 32) {
      k = Math.ceil(len / 3);
      y = Math.pow(4, -k).toString();
    } else {
      k = 16;
      y = '2.3283064365386962890625e-10';
    }

    Ctor.precision += k;
    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1)); // Reverse argument reduction

    for (var i = k; i--;) {
      var cos2x = x.times(x);
      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }

    Ctor.precision -= k;
    return x;
  }
  /*
   * Perform division in the specified base.
   */


  var divide = function () {
    // Assumes non-zero x and k, and hence non-zero result.
    function multiplyInteger(x, k, base) {
      var temp,
          carry = 0,
          i = x.length;

      for (x = x.slice(); i--;) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
      }

      if (carry) x.unshift(carry);
      return x;
    }

    function compare(a, b, aL, bL) {
      var i, r;

      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return r;
    }

    function subtract(a, b, aL, base) {
      var i = 0; // Subtract b from a.

      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      } // Remove leading zeros.


      for (; !a[0] && a.length > 1;) {
        a.shift();
      }
    }

    return function (x, y, pr, rm, dp, base) {
      var cmp,
          e,
          i,
          k,
          logBase,
          more,
          prod,
          prodL,
          q,
          qd,
          rem,
          remL,
          rem0,
          sd,
          t,
          xi,
          xL,
          yd0,
          yL,
          yz,
          Ctor = x.constructor,
          sign = x.s == y.s ? 1 : -1,
          xd = x.d,
          yd = y.d; // Either NaN, Infinity or 0?

      if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor( // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
        xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
      }

      if (base) {
        logBase = 1;
        e = x.e - y.e;
      } else {
        base = BASE;
        logBase = LOG_BASE;
        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
      }

      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = []; // Result exponent may be one less than e.
      // The digit array of a Decimal from toStringBinary may have trailing zeros.

      for (i = 0; yd[i] == (xd[i] || 0); i++) {
        ;
      }

      if (yd[i] > (xd[i] || 0)) e--;

      if (pr == null) {
        sd = pr = Ctor.precision;
        rm = Ctor.rounding;
      } else if (dp) {
        sd = pr + (x.e - y.e) + 1;
      } else {
        sd = pr;
      }

      if (sd < 0) {
        qd.push(1);
        more = true;
      } else {
        // Convert precision in number of base 10 digits to base 1e7 digits.
        sd = sd / logBase + 2 | 0;
        i = 0; // divisor < 1e7

        if (yL == 1) {
          k = 0;
          yd = yd[0];
          sd++; // k is the carry.

          for (; (i < xL || k) && sd--; i++) {
            t = k * base + (xd[i] || 0);
            qd[i] = t / yd | 0;
            k = t % yd | 0;
          }

          more = k || i < xL; // divisor >= 1e7
        } else {
          // Normalise xd and yd so highest order digit of yd is >= base/2
          k = base / (yd[0] + 1) | 0;

          if (k > 1) {
            yd = multiplyInteger(yd, k, base);
            xd = multiplyInteger(xd, k, base);
            yL = yd.length;
            xL = xd.length;
          }

          xi = yL;
          rem = xd.slice(0, yL);
          remL = rem.length; // Add zeros to make remainder as long as divisor.

          for (; remL < yL;) {
            rem[remL++] = 0;
          }

          yz = yd.slice();
          yz.unshift(0);
          yd0 = yd[0];
          if (yd[1] >= base / 2) ++yd0;

          do {
            k = 0; // Compare divisor and remainder.

            cmp = compare(yd, rem, yL, remL); // If divisor < remainder.

            if (cmp < 0) {
              // Calculate trial digit, k.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0); // k will be how many times the divisor goes into the current remainder.

              k = rem0 / yd0 | 0; //  Algorithm:
              //  1. product = divisor * trial digit (k)
              //  2. if product > remainder: product -= divisor, k--
              //  3. remainder -= product
              //  4. if product was < remainder at 2:
              //    5. compare new remainder and divisor
              //    6. If remainder > divisor: remainder -= divisor, k++

              if (k > 1) {
                if (k >= base) k = base - 1; // product = divisor * trial digit.

                prod = multiplyInteger(yd, k, base);
                prodL = prod.length;
                remL = rem.length; // Compare product and remainder.

                cmp = compare(prod, rem, prodL, remL); // product > remainder.

                if (cmp == 1) {
                  k--; // Subtract divisor from product.

                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
                }
              } else {
                // cmp is -1.
                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
                if (k == 0) cmp = k = 1;
                prod = yd.slice();
              }

              prodL = prod.length;
              if (prodL < remL) prod.unshift(0); // Subtract product from remainder.

              subtract(rem, prod, remL, base); // If product was < previous remainder.

              if (cmp == -1) {
                remL = rem.length; // Compare divisor and new remainder.

                cmp = compare(yd, rem, yL, remL); // If divisor < new remainder, subtract divisor from remainder.

                if (cmp < 1) {
                  k++; // Subtract divisor from remainder.

                  subtract(rem, yL < remL ? yz : yd, remL, base);
                }
              }

              remL = rem.length;
            } else if (cmp === 0) {
              k++;
              rem = [0];
            } // if cmp === 1, k will be 0
            // Add the next digit, k, to the result array.


            qd[i++] = k; // Update the remainder.

            if (cmp && rem[0]) {
              rem[remL++] = xd[xi] || 0;
            } else {
              rem = [xd[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] !== void 0) && sd--);

          more = rem[0] !== void 0;
        } // Leading zero?


        if (!qd[0]) qd.shift();
      } // logBase is 1 when divide is being used for base conversion.


      if (logBase == 1) {
        q.e = e;
        inexact = more;
      } else {
        // To calculate q.e, first get the number of digits of qd[0].
        for (i = 1, k = qd[0]; k >= 10; k /= 10) {
          i++;
        }

        q.e = i + e * logBase - 1;
        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
      }

      return q;
    };
  }();
  /*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */


  function finalise(x, sd, rm, isTruncated) {
    var digits,
        i,
        j,
        k,
        rd,
        roundUp,
        w,
        xd,
        xdi,
        Ctor = x.constructor; // Don't round if sd is null or undefined.

    out: if (sd != null) {
      xd = x.d; // Infinity/NaN.

      if (!xd) return x; // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
      // w: the word of xd containing rd, a base 1e7 number.
      // xdi: the index of w within xd.
      // digits: the number of digits of w.
      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
      // they had leading zeros)
      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).
      // Get the length of the first word of the digits array xd.

      for (digits = 1, k = xd[0]; k >= 10; k /= 10) {
        digits++;
      }

      i = sd - digits; // Is the rounding digit in the first word of xd?

      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0]; // Get the rounding digit at index j of w.

        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;

        if (xdi >= k) {
          if (isTruncated) {
            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
            for (; k++ <= xdi;) {
              xd.push(0);
            }

            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi]; // Get the number of digits of w.

          for (digits = 1; k >= 10; k /= 10) {
            digits++;
          } // Get the index of rd within w.


          i %= LOG_BASE; // Get the index of rd within w, adjusted for leading zeros.
          // The number of leading zeros of w is given by LOG_BASE - digits.

          j = i - LOG_BASE + digits; // Get the rounding digit at index j of w.

          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      } // Are there any non-zero digits after the rounding digit?


      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1)); // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
      // will give 714.

      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

      if (sd < 1 || !xd[0]) {
        xd.length = 0;

        if (roundUp) {
          // Convert sd to decimal places.
          sd -= x.e + 1; // 1, 0.1, 0.01, 0.001, 0.0001 etc.

          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          // Zero.
          xd[0] = x.e = 0;
        }

        return x;
      } // Remove excess digits.


      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i); // E.g. 56700 becomes 56000 if 7 is the rounding digit.
        // j > 0 means i > number of leading zeros of w.

        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }

      if (roundUp) {
        for (;;) {
          // Is the digit to be rounded up in the first word of xd?
          if (xdi == 0) {
            // i will be the length of xd[0] before k is added.
            for (i = 1, j = xd[0]; j >= 10; j /= 10) {
              i++;
            }

            j = xd[0] += k;

            for (k = 1; j >= 10; j /= 10) {
              k++;
            } // if i != k the length has increased.


            if (i != k) {
              x.e++;
              if (xd[0] == BASE) xd[0] = 1;
            }

            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE) break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      } // Remove trailing zeros.


      for (i = xd.length; xd[--i] === 0;) {
        xd.pop();
      }
    }

    if (external) {
      // Overflow?
      if (x.e > Ctor.maxE) {
        // Infinity.
        x.d = null;
        x.e = NaN; // Underflow?
      } else if (x.e < Ctor.minE) {
        // Zero.
        x.e = 0;
        x.d = [0]; // Ctor.underflow = true;
      } // else Ctor.underflow = false;

    }

    return x;
  }

  function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x);
    var k,
        e = x.e,
        str = digitsToString(x.d),
        len = str.length;

    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + '.' + str.slice(1);
      }

      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
    } else if (e < 0) {
      str = '0.' + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);

      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += '.';
        str += getZeroString(k);
      }
    }

    return str;
  } // Calculate the base 10 exponent from the base 1e7 exponent.


  function getBase10Exponent(digits, e) {
    var w = digits[0]; // Add the number of digits of the first word of the digits array.

    for (e *= LOG_BASE; w >= 10; w /= 10) {
      e++;
    }

    return e;
  }

  function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {
      // Reset global state in case the exception is caught.
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(precisionLimitExceeded);
    }

    return finalise(new Ctor(LN10), sd, 1, true);
  }

  function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
  }

  function getPrecision(digits) {
    var w = digits.length - 1,
        len = w * LOG_BASE + 1;
    w = digits[w]; // If non-zero...

    if (w) {
      // Subtract the number of trailing zeros of the last word.
      for (; w % 10 == 0; w /= 10) {
        len--;
      } // Add the number of digits of the first word.


      for (w = digits[0]; w >= 10; w /= 10) {
        len++;
      }
    }

    return len;
  }

  function getZeroString(k) {
    var zs = '';

    for (; k--;) {
      zs += '0';
    }

    return zs;
  }
  /*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */


  function intPow(Ctor, x, n, pr) {
    var isTruncated,
        r = new Ctor(1),
        // Max n of 9007199254740991 takes 53 loop iterations.
    // Maximum digits array length; leaves [28, 34] guard digits.
    k = Math.ceil(pr / LOG_BASE + 4);
    external = false;

    for (;;) {
      if (n % 2) {
        r = r.times(x);
        if (truncate(r.d, k)) isTruncated = true;
      }

      n = mathfloor(n / 2);

      if (n === 0) {
        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
        n = r.d.length - 1;
        if (isTruncated && r.d[n] === 0) ++r.d[n];
        break;
      }

      x = x.times(x);
      truncate(x.d, k);
    }

    external = true;
    return r;
  }

  function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
  }
  /*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */


  function maxOrMin(Ctor, args, ltgt) {
    var y,
        x = new Ctor(args[0]),
        i = 0;

    for (; ++i < args.length;) {
      y = new Ctor(args[i]);

      if (!y.s) {
        x = y;
        break;
      } else if (x[ltgt](y)) {
        x = y;
      }
    }

    return x;
  }
  /*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)       = NaN
   *  exp(±0)        = 1
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */


  function naturalExponential(x, sd) {
    var denominator,
        guard,
        j,
        pow,
        sum,
        t,
        wpr,
        rep = 0,
        i = 0,
        k = 0,
        Ctor = x.constructor,
        rm = Ctor.rounding,
        pr = Ctor.precision; // 0/NaN/Infinity?

    if (!x.d || !x.d[0] || x.e > 17) {
      return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    t = new Ctor(0.03125); // while abs(x) >= 0.1

    while (x.e > -2) {
      // x = x / 2^5
      x = x.times(t);
      k += 5;
    } // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
    // necessary to ensure the first 4 rounding digits are correct.


    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(1);
    Ctor.precision = wpr;

    for (;;) {
      pow = finalise(pow.times(x), wpr, 1);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        j = k;

        while (j--) {
          sum = finalise(sum.times(sum), wpr, 1);
        } // Check to see if the first 4 rounding digits are [49]999.
        // If so, repeat the summation with a higher precision, otherwise
        // e.g. with precision: 18, rounding: 1
        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
        // `wpr - guard` is the index of first rounding digit.


        if (sd == null) {
          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += 10;
            denominator = pow = t = new Ctor(1);
            i = 0;
            rep++;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
    }
  }
  /*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)        = NaN
   *  ln(0)         = -Infinity
   *  ln(-0)        = -Infinity
   *  ln(1)         = 0
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)       = NaN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */


  function naturalLogarithm(y, sd) {
    var c,
        c0,
        denominator,
        e,
        numerator,
        rep,
        sum,
        t,
        wpr,
        x1,
        x2,
        n = 1,
        guard = 10,
        x = y,
        xd = x.d,
        Ctor = x.constructor,
        rm = Ctor.rounding,
        pr = Ctor.precision; // Is x negative or Infinity, NaN, 0 or 1?

    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);

    if (Math.abs(e = x.e) < 1.5e15) {
      // Argument reduction.
      // The series converges faster the closer the argument is to 1, so using
      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
      // later be divided by this number, then separate out the power of 10 using
      // ln(a*10^b) = ln(a) + b*ln(10).
      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
      // max n is 6 (gives 0.7 - 1.3)
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }

      e = x.e;

      if (c0 > 1) {
        x = new Ctor('0.' + c);
        e++;
      } else {
        x = new Ctor(c0 + '.' + c.slice(1));
      }
    } else {
      // The argument reduction method above may result in overflow if the argument y is a massive
      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
      // function using ln(x*10^e) = ln(x) + e*ln(10).
      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;
      return sd == null ? finalise(x, pr, rm, external = true) : x;
    } // x1 is x reduced to a value near 1.


    x1 = x; // Taylor series.
    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
    // where x = (y - 1)/(y + 1)    (|x| < 1)

    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;

    for (;;) {
      numerator = finalise(numerator.times(x2), wpr, 1);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2); // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.

        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
        sum = divide(sum, new Ctor(n), wpr, 1); // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
        // been repeated previously) and the first 4 rounding digits 9999?
        // If so, restart the summation with a higher precision, otherwise
        // e.g. with precision: 12, rounding: 1
        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
        // `wpr - guard` is the index of first rounding digit.

        if (sd == null) {
          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += guard;
            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = rep = 1;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
      denominator += 2;
    }
  } // ±Infinity, NaN.


  function nonFiniteToString(x) {
    // Unsigned.
    return String(x.s * x.s / 0);
  }
  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */


  function parseDecimal(x, str) {
    var e, i, len; // Decimal point?

    if ((e = str.indexOf('.')) > -1) str = str.replace('.', ''); // Exponential form?

    if ((i = str.search(/e/i)) > 0) {
      // Determine exponent.
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {
      // Integer.
      e = str.length;
    } // Determine leading zeros.


    for (i = 0; str.charCodeAt(i) === 48; i++) {
      ;
    } // Determine trailing zeros.


    for (len = str.length; str.charCodeAt(len - 1) === 48; --len) {
      ;
    }

    str = str.slice(i, len);

    if (str) {
      len -= i;
      x.e = e = e - i - 1;
      x.d = []; // Transform base
      // e is the base 10 exponent.
      // i is where to slice str to get the first word of the digits array.

      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;

      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));

        for (len -= LOG_BASE; i < len;) {
          x.d.push(+str.slice(i, i += LOG_BASE));
        }

        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }

      for (; i--;) {
        str += '0';
      }

      x.d.push(+str);

      if (external) {
        // Overflow?
        if (x.e > x.constructor.maxE) {
          // Infinity.
          x.d = null;
          x.e = NaN; // Underflow?
        } else if (x.e < x.constructor.minE) {
          // Zero.
          x.e = 0;
          x.d = [0]; // x.constructor.underflow = true;
        } // else x.constructor.underflow = false;

      }
    } else {
      // Zero.
      x.e = 0;
      x.d = [0];
    }

    return x;
  }
  /*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */


  function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

    if (str === 'Infinity' || str === 'NaN') {
      if (!+str) x.s = NaN;
      x.e = NaN;
      x.d = null;
      return x;
    }

    if (isHex.test(str)) {
      base = 16;
      str = str.toLowerCase();
    } else if (isBinary.test(str)) {
      base = 2;
    } else if (isOctal.test(str)) {
      base = 8;
    } else {
      throw Error(invalidArgument + str);
    } // Is there a binary exponent part?


    i = str.search(/p/i);

    if (i > 0) {
      p = +str.slice(i + 1);
      str = str.substring(2, i);
    } else {
      str = str.slice(2);
    } // Convert `str` as an integer then divide the result by `base` raised to a power such that the
    // fraction part will be restored.


    i = str.indexOf('.');
    isFloat = i >= 0;
    Ctor = x.constructor;

    if (isFloat) {
      str = str.replace('.', '');
      len = str.length;
      i = len - i; // log[10](16) = 1.2041... , log[10](88) = 1.9444....

      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }

    xd = convertBase(str, base, BASE);
    xe = xd.length - 1; // Remove trailing zeros.

    for (i = xe; xd[i] === 0; --i) {
      xd.pop();
    }

    if (i < 0) return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false; // At what precision to perform the division to ensure exact conversion?
    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
    // Therefore using 4 * the number of digits of str will always be enough.

    if (isFloat) x = divide(x, divisor, len * 4); // Multiply by the binary exponent part if present.

    if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
    external = true;
    return x;
  }
  /*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */


  function sine(Ctor, x) {
    var k,
        len = x.d.length;
    if (len < 3) return taylorSeries(Ctor, 2, x, x); // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))
    // Estimate the optimum number of times to use the argument reduction.

    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0; // Max k before Math.pow precision loss is 22

    x = x.times(Math.pow(5, -k));
    x = taylorSeries(Ctor, 2, x, x); // Reverse argument reduction

    var sin2_x,
        d5 = new Ctor(5),
        d16 = new Ctor(16),
        d20 = new Ctor(20);

    for (; k--;) {
      sin2_x = x.times(x);
      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }

    return x;
  } // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.


  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j,
        t,
        u,
        x2,
        i = 1,
        pr = Ctor.precision,
        k = Math.ceil(pr / LOG_BASE);
    external = false;
    x2 = x.times(x);
    u = new Ctor(y);

    for (;;) {
      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
      u = isHyperbolic ? y.plus(t) : y.minus(t);
      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
      t = u.plus(y);

      if (t.d[k] !== void 0) {
        for (j = k; t.d[j] === u.d[j] && j--;) {
          ;
        }

        if (j == -1) break;
      }

      j = u;
      u = y;
      y = t;
      t = j;
      i++;
    }

    external = true;
    t.d.length = k + 1;
    return t;
  } // Return the absolute value of `x` reduced to less than or equal to half pi.


  function toLessThanHalfPi(Ctor, x) {
    var t,
        isNeg = x.s < 0,
        pi = getPi(Ctor, Ctor.precision, 1),
        halfPi = pi.times(0.5);
    x = x.abs();

    if (x.lte(halfPi)) {
      quadrant = isNeg ? 4 : 1;
      return x;
    }

    t = x.divToInt(pi);

    if (t.isZero()) {
      quadrant = isNeg ? 3 : 2;
    } else {
      x = x.minus(t.times(pi)); // 0 <= x < pi

      if (x.lte(halfPi)) {
        quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
        return x;
      }

      quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
    }

    return x.minus(pi).abs();
  }
  /*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */


  function toStringBinary(x, baseOut, sd, rm) {
    var base,
        e,
        i,
        k,
        len,
        roundUp,
        str,
        xd,
        y,
        Ctor = x.constructor,
        isExp = sd !== void 0;

    if (isExp) {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;else checkInt32(rm, 0, 8);
    } else {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    }

    if (!x.isFinite()) {
      str = nonFiniteToString(x);
    } else {
      str = finiteToString(x);
      i = str.indexOf('.'); // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
      // minBinaryExponent = floor(decimalExponent * log[2](10))
      // log[2](10) = 3.321928094887362347870319429489390175864

      if (isExp) {
        base = 2;

        if (baseOut == 16) {
          sd = sd * 4 - 3;
        } else if (baseOut == 8) {
          sd = sd * 3 - 2;
        }
      } else {
        base = baseOut;
      } // Convert the number as an integer then divide the result by its base raised to a power such
      // that the fraction part will be restored.
      // Non-integer.


      if (i >= 0) {
        str = str.replace('.', '');
        y = new Ctor(1);
        y.e = str.length - i;
        y.d = convertBase(finiteToString(y), 10, base);
        y.e = y.d.length;
      }

      xd = convertBase(str, 10, base);
      e = len = xd.length; // Remove trailing zeros.

      for (; xd[--len] == 0;) {
        xd.pop();
      }

      if (!xd[0]) {
        str = isExp ? '0p+0' : '0';
      } else {
        if (i < 0) {
          e--;
        } else {
          x = new Ctor(x);
          x.d = xd;
          x.e = e;
          x = divide(x, y, sd, rm, 0, base);
          xd = x.d;
          e = x.e;
          roundUp = inexact;
        } // The rounding digit, i.e. the digit after the digit that may be rounded up.


        i = xd[sd];
        k = base / 2;
        roundUp = roundUp || xd[sd + 1] !== void 0;
        roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
        xd.length = sd;

        if (roundUp) {
          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (; ++xd[--sd] > base - 1;) {
            xd[sd] = 0;

            if (!sd) {
              ++e;
              xd.unshift(1);
            }
          }
        } // Determine trailing zeros.


        for (len = xd.length; !xd[len - 1]; --len) {
          ;
        } // E.g. [4, 11, 15] becomes 4bf.


        for (i = 0, str = ''; i < len; i++) {
          str += NUMERALS.charAt(xd[i]);
        } // Add binary exponent suffix?


        if (isExp) {
          if (len > 1) {
            if (baseOut == 16 || baseOut == 8) {
              i = baseOut == 16 ? 4 : 3;

              for (--len; len % i; len++) {
                str += '0';
              }

              xd = convertBase(str, base, baseOut);

              for (len = xd.length; !xd[len - 1]; --len) {
                ;
              } // xd[0] will always be be 1


              for (i = 1, str = '1.'; i < len; i++) {
                str += NUMERALS.charAt(xd[i]);
              }
            } else {
              str = str.charAt(0) + '.' + str.slice(1);
            }
          }

          str = str + (e < 0 ? 'p' : 'p+') + e;
        } else if (e < 0) {
          for (; ++e;) {
            str = '0' + str;
          }

          str = '0.' + str;
        } else {
          if (++e > len) for (e -= len; e--;) {
            str += '0';
          } else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
        }
      }

      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
    }

    return x.s < 0 ? '-' + str : str;
  } // Does not strip trailing zeros.


  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  } // Decimal methods

  /*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  set
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  tan
   *  tanh
   *  trunc
   */

  /*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */


  function abs(x) {
    return new this(x).abs();
  }
  /*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */


  function acos(x) {
    return new this(x).acos();
  }
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function acosh(x) {
    return new this(x).acosh();
  }
  /*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */


  function add(x, y) {
    return new this(x).plus(y);
  }
  /*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function asin(x) {
    return new this(x).asin();
  }
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function asinh(x) {
    return new this(x).asinh();
  }
  /*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function atan(x) {
    return new this(x).atan();
  }
  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function atanh(x) {
    return new this(x).atanh();
  }
  /*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)               = ±pi
   * atan2(±0, +0)               = ±0
   * atan2(±0, -x)               = ±pi for x > 0
   * atan2(±0, x)                = ±0 for x > 0
   * atan2(-y, ±0)               = -pi/2 for y > 0
   * atan2(y, ±0)                = pi/2 for y > 0
   * atan2(±y, -Infinity)        = ±pi for finite y > 0
   * atan2(±y, +Infinity)        = ±0 for finite y > 0
   * atan2(±Infinity, x)         = ±pi/2 for finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */


  function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r,
        pr = this.precision,
        rm = this.rounding,
        wpr = pr + 4; // Either NaN

    if (!y.s || !x.s) {
      r = new this(NaN); // Both ±Infinity
    } else if (!y.d && !x.d) {
      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
      r.s = y.s; // x is ±Infinity or y is ±0
    } else if (!x.d || y.isZero()) {
      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
      r.s = y.s; // y is ±Infinity or x is ±0
    } else if (!y.d || x.isZero()) {
      r = getPi(this, wpr, 1).times(0.5);
      r.s = y.s; // Both non-zero and finite
    } else if (x.s < 0) {
      this.precision = wpr;
      this.rounding = 1;
      r = this.atan(divide(y, x, wpr, 1));
      x = getPi(this, wpr, 1);
      this.precision = pr;
      this.rounding = rm;
      r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
      r = this.atan(divide(y, x, wpr, 1));
    }

    return r;
  }
  /*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function cbrt(x) {
    return new this(x).cbrt();
  }
  /*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */


  function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
  }
  /*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number}
   *   defaults   {true}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */


  function config(obj) {
    if (!obj || _typeof(obj) !== 'object') throw Error(decimalError + 'Object expected');
    var i,
        p,
        v,
        useDefaults = obj.defaults === true,
        ps = ['precision', 1, MAX_DIGITS, 'rounding', 0, 8, 'toExpNeg', -EXP_LIMIT, 0, 'toExpPos', 0, EXP_LIMIT, 'maxE', 0, EXP_LIMIT, 'minE', -EXP_LIMIT, 0, 'modulo', 0, 9];

    for (i = 0; i < ps.length; i += 3) {
      if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];

      if ((v = obj[p]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;else throw Error(invalidArgument + p + ': ' + v);
      }
    }

    if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];

    if ((v = obj[p]) !== void 0) {
      if (v === true || v === false || v === 0 || v === 1) {
        if (v) {
          if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
            this[p] = true;
          } else {
            throw Error(cryptoUnavailable);
          }
        } else {
          this[p] = false;
        }
      } else {
        throw Error(invalidArgument + p + ': ' + v);
      }
    }

    return this;
  }
  /*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function cos(x) {
    return new this(x).cos();
  }
  /*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function cosh(x) {
    return new this(x).cosh();
  }
  /*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */


  function clone(obj) {
    var i, p, ps;
    /*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */

    function Decimal(v) {
      var e,
          i,
          t,
          x = this; // Decimal called without new.

      if (!(x instanceof Decimal)) return new Decimal(v); // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
      // which points to Object.

      x.constructor = Decimal; // Duplicate.

      if (v instanceof Decimal) {
        x.s = v.s;
        x.e = v.e;
        x.d = (v = v.d) ? v.slice() : v;
        return;
      }

      t = _typeof(v);

      if (t === 'number') {
        if (v === 0) {
          x.s = 1 / v < 0 ? -1 : 1;
          x.e = 0;
          x.d = [0];
          return;
        }

        if (v < 0) {
          v = -v;
          x.s = -1;
        } else {
          x.s = 1;
        } // Fast path for small integers.


        if (v === ~~v && v < 1e7) {
          for (e = 0, i = v; i >= 10; i /= 10) {
            e++;
          }

          x.e = e;
          x.d = [v];
          return; // Infinity, NaN.
        } else if (v * 0 !== 0) {
          if (!v) x.s = NaN;
          x.e = NaN;
          x.d = null;
          return;
        }

        return parseDecimal(x, v.toString());
      } else if (t !== 'string') {
        throw Error(invalidArgument + v);
      } // Minus sign?


      if (v.charCodeAt(0) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      }

      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }

    Decimal.prototype = P;
    Decimal.ROUND_UP = 0;
    Decimal.ROUND_DOWN = 1;
    Decimal.ROUND_CEIL = 2;
    Decimal.ROUND_FLOOR = 3;
    Decimal.ROUND_HALF_UP = 4;
    Decimal.ROUND_HALF_DOWN = 5;
    Decimal.ROUND_HALF_EVEN = 6;
    Decimal.ROUND_HALF_CEIL = 7;
    Decimal.ROUND_HALF_FLOOR = 8;
    Decimal.EUCLID = 9;
    Decimal.config = Decimal.set = config;
    Decimal.clone = clone;
    Decimal.isDecimal = isDecimalInstance;
    Decimal.abs = abs;
    Decimal.acos = acos;
    Decimal.acosh = acosh; // ES6

    Decimal.add = add;
    Decimal.asin = asin;
    Decimal.asinh = asinh; // ES6

    Decimal.atan = atan;
    Decimal.atanh = atanh; // ES6

    Decimal.atan2 = atan2;
    Decimal.cbrt = cbrt; // ES6

    Decimal.ceil = ceil;
    Decimal.cos = cos;
    Decimal.cosh = cosh; // ES6

    Decimal.div = div;
    Decimal.exp = exp;
    Decimal.floor = floor;
    Decimal.hypot = hypot; // ES6

    Decimal.ln = ln;
    Decimal.log = log;
    Decimal.log10 = log10; // ES6

    Decimal.log2 = log2; // ES6

    Decimal.max = max;
    Decimal.min = min;
    Decimal.mod = mod;
    Decimal.mul = mul;
    Decimal.pow = pow;
    Decimal.random = random;
    Decimal.round = round;
    Decimal.sign = sign; // ES6

    Decimal.sin = sin;
    Decimal.sinh = sinh; // ES6

    Decimal.sqrt = sqrt;
    Decimal.sub = sub;
    Decimal.tan = tan;
    Decimal.tanh = tanh; // ES6

    Decimal.trunc = trunc; // ES6

    if (obj === void 0) obj = {};

    if (obj) {
      if (obj.defaults !== true) {
        ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];

        for (i = 0; i < ps.length;) {
          if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
        }
      }
    }

    Decimal.config(obj);
    return Decimal;
  }
  /*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */


  function div(x, y) {
    return new this(x).div(y);
  }
  /*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */


  function exp(x) {
    return new this(x).exp();
  }
  /*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */


  function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
  }
  /*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   */


  function hypot() {
    var i,
        n,
        t = new this(0);
    external = false;

    for (i = 0; i < arguments.length;) {
      n = new this(arguments[i++]);

      if (!n.d) {
        if (n.s) {
          external = true;
          return new this(1 / 0);
        }

        t = n;
      } else if (t.d) {
        t = t.plus(n.times(n));
      }
    }

    external = true;
    return t.sqrt();
  }
  /*
   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
   * otherwise return false.
   *
   */


  function isDecimalInstance(obj) {
    return obj instanceof Decimal || obj && obj.name === '[object Decimal]' || false;
  }
  /*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function ln(x) {
    return new this(x).ln();
  }
  /*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */


  function log(x, y) {
    return new this(x).log(y);
  }
  /*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function log2(x) {
    return new this(x).log(2);
  }
  /*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function log10(x) {
    return new this(x).log(10);
  }
  /*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */


  function max() {
    return maxOrMin(this, arguments, 'lt');
  }
  /*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */


  function min() {
    return maxOrMin(this, arguments, 'gt');
  }
  /*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */


  function mod(x, y) {
    return new this(x).mod(y);
  }
  /*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */


  function mul(x, y) {
    return new this(x).mul(y);
  }
  /*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */


  function pow(x, y) {
    return new this(x).pow(y);
  }
  /*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */


  function random(sd) {
    var d,
        e,
        k,
        n,
        i = 0,
        r = new this(1),
        rd = [];
    if (sd === void 0) sd = this.precision;else checkInt32(sd, 1, MAX_DIGITS);
    k = Math.ceil(sd / LOG_BASE);

    if (!this.crypto) {
      for (; i < k;) {
        rd[i++] = Math.random() * 1e7 | 0;
      } // Browsers supporting crypto.getRandomValues.

    } else if (crypto.getRandomValues) {
      d = crypto.getRandomValues(new Uint32Array(k));

      for (; i < k;) {
        n = d[i]; // 0 <= n < 4294967296
        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).

        if (n >= 4.29e9) {
          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
        } else {
          // 0 <= n <= 4289999999
          // 0 <= (n % 1e7) <= 9999999
          rd[i++] = n % 1e7;
        }
      } // Node.js supporting crypto.randomBytes.

    } else if (crypto.randomBytes) {
      // buffer
      d = crypto.randomBytes(k *= 4);

      for (; i < k;) {
        // 0 <= n < 2147483648
        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24); // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).

        if (n >= 2.14e9) {
          crypto.randomBytes(4).copy(d, i);
        } else {
          // 0 <= n <= 2139999999
          // 0 <= (n % 1e7) <= 9999999
          rd.push(n % 1e7);
          i += 4;
        }
      }

      i = k / 4;
    } else {
      throw Error(cryptoUnavailable);
    }

    k = rd[--i];
    sd %= LOG_BASE; // Convert trailing digits to zeros according to sd.

    if (k && sd) {
      n = mathpow(10, LOG_BASE - sd);
      rd[i] = (k / n | 0) * n;
    } // Remove trailing words which are zero.


    for (; rd[i] === 0; i--) {
      rd.pop();
    } // Zero?


    if (i < 0) {
      e = 0;
      rd = [0];
    } else {
      e = -1; // Remove leading words which are zero and adjust exponent accordingly.

      for (; rd[0] === 0; e -= LOG_BASE) {
        rd.shift();
      } // Count the digits of the first word of rd to determine leading zeros.


      for (k = 1, n = rd[0]; n >= 10; n /= 10) {
        k++;
      } // Adjust the exponent for leading zeros of the first word of rd.


      if (k < LOG_BASE) e -= LOG_BASE - k;
    }

    r.e = e;
    r.d = rd;
    return r;
  }
  /*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */


  function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
  }
  /*
   * Return
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   */


  function sign(x) {
    x = new this(x);
    return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
  }
  /*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function sin(x) {
    return new this(x).sin();
  }
  /*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function sinh(x) {
    return new this(x).sinh();
  }
  /*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */


  function sqrt(x) {
    return new this(x).sqrt();
  }
  /*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */


  function sub(x, y) {
    return new this(x).sub(y);
  }
  /*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function tan(x) {
    return new this(x).tan();
  }
  /*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */


  function tanh(x) {
    return new this(x).tanh();
  }
  /*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */


  function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
  } // Create and configure initial Decimal constructor.


  Decimal = clone(DEFAULTS);
  Decimal['default'] = Decimal.Decimal = Decimal; // Create the internal constants from their string values.

  LN10 = new Decimal(LN10);
  PI = new Decimal(PI); // Export.
  // AMD.

  if (typeof define == 'function' && define.amd) {
    define(function () {
      return Decimal;
    }); // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Decimal; // Browser.
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self ? self : window;
    }

    noConflict = globalScope.Decimal;

    Decimal.noConflict = function () {
      globalScope.Decimal = noConflict;
      return Decimal;
    };

    globalScope.Decimal = Decimal;
  }
})(void 0);

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxkZWNpbWFsLmpzIl0sIm5hbWVzIjpbImdsb2JhbFNjb3BlIiwiRVhQX0xJTUlUIiwiTUFYX0RJR0lUUyIsIk5VTUVSQUxTIiwiTE4xMCIsIlBJIiwiREVGQVVMVFMiLCJwcmVjaXNpb24iLCJyb3VuZGluZyIsIm1vZHVsbyIsInRvRXhwTmVnIiwidG9FeHBQb3MiLCJtaW5FIiwibWF4RSIsImNyeXB0byIsIkRlY2ltYWwiLCJpbmV4YWN0Iiwibm9Db25mbGljdCIsInF1YWRyYW50IiwiZXh0ZXJuYWwiLCJkZWNpbWFsRXJyb3IiLCJpbnZhbGlkQXJndW1lbnQiLCJwcmVjaXNpb25MaW1pdEV4Y2VlZGVkIiwiY3J5cHRvVW5hdmFpbGFibGUiLCJtYXRoZmxvb3IiLCJNYXRoIiwiZmxvb3IiLCJtYXRocG93IiwicG93IiwiaXNCaW5hcnkiLCJpc0hleCIsImlzT2N0YWwiLCJpc0RlY2ltYWwiLCJCQVNFIiwiTE9HX0JBU0UiLCJNQVhfU0FGRV9JTlRFR0VSIiwiTE4xMF9QUkVDSVNJT04iLCJsZW5ndGgiLCJQSV9QUkVDSVNJT04iLCJQIiwibmFtZSIsImFic29sdXRlVmFsdWUiLCJhYnMiLCJ4IiwiY29uc3RydWN0b3IiLCJzIiwiZmluYWxpc2UiLCJjZWlsIiwiZSIsImNvbXBhcmVkVG8iLCJjbXAiLCJ5IiwiaSIsImoiLCJ4ZEwiLCJ5ZEwiLCJ4ZCIsImQiLCJ5ZCIsInhzIiwieXMiLCJOYU4iLCJjb3NpbmUiLCJjb3MiLCJwciIsInJtIiwiQ3RvciIsIm1heCIsInNkIiwidG9MZXNzVGhhbkhhbGZQaSIsIm5lZyIsImN1YmVSb290IiwiY2JydCIsIm0iLCJuIiwiciIsInJlcCIsInQiLCJ0MyIsInQzcGx1c3giLCJpc0Zpbml0ZSIsImlzWmVybyIsImRpZ2l0c1RvU3RyaW5nIiwidG9FeHBvbmVudGlhbCIsInNsaWNlIiwiaW5kZXhPZiIsInRvU3RyaW5nIiwidGltZXMiLCJwbHVzIiwiZGl2aWRlIiwiZXEiLCJjaGFyQXQiLCJkZWNpbWFsUGxhY2VzIiwiZHAiLCJ3IiwiZGl2aWRlZEJ5IiwiZGl2IiwiZGl2aWRlZFRvSW50ZWdlckJ5IiwiZGl2VG9JbnQiLCJlcXVhbHMiLCJncmVhdGVyVGhhbiIsImd0IiwiZ3JlYXRlclRoYW5PckVxdWFsVG8iLCJndGUiLCJrIiwiaHlwZXJib2xpY0Nvc2luZSIsImNvc2giLCJsZW4iLCJvbmUiLCJ0YXlsb3JTZXJpZXMiLCJjb3NoMl94IiwiZDgiLCJtaW51cyIsImh5cGVyYm9saWNTaW5lIiwic2luaCIsInNxcnQiLCJzaW5oMl94IiwiZDUiLCJkMTYiLCJkMjAiLCJoeXBlcmJvbGljVGFuZ2VudCIsInRhbmgiLCJpbnZlcnNlQ29zaW5lIiwiYWNvcyIsImhhbGZQaSIsImlzTmVnIiwiZ2V0UGkiLCJhc2luIiwiaW52ZXJzZUh5cGVyYm9saWNDb3NpbmUiLCJhY29zaCIsImx0ZSIsImxuIiwiaW52ZXJzZUh5cGVyYm9saWNTaW5lIiwiYXNpbmgiLCJpbnZlcnNlSHlwZXJib2xpY1RhbmdlbnQiLCJhdGFuaCIsIndwciIsInhzZCIsImludmVyc2VTaW5lIiwiYXRhbiIsImludmVyc2VUYW5nZW50IiwicHgiLCJ4MiIsIm1pbiIsImlzSW50ZWdlciIsImlzSW50IiwiaXNOYU4iLCJpc05lZ2F0aXZlIiwiaXNQb3NpdGl2ZSIsImlzUG9zIiwibGVzc1RoYW4iLCJsdCIsImxlc3NUaGFuT3JFcXVhbFRvIiwibG9nYXJpdGhtIiwibG9nIiwiYmFzZSIsImlzQmFzZTEwIiwiZGVub21pbmF0b3IiLCJpbmYiLCJudW0iLCJhcmciLCJndWFyZCIsIm5hdHVyYWxMb2dhcml0aG0iLCJnZXRMbjEwIiwiY2hlY2tSb3VuZGluZ0RpZ2l0cyIsInN1YiIsInhlIiwieExUeSIsInJldmVyc2UiLCJwdXNoIiwicG9wIiwic2hpZnQiLCJnZXRCYXNlMTBFeHBvbmVudCIsIm1vZCIsInEiLCJuYXR1cmFsRXhwb25lbnRpYWwiLCJleHAiLCJuZWdhdGVkIiwiYWRkIiwiY2FycnkiLCJ1bnNoaWZ0IiwieiIsIkVycm9yIiwiZ2V0UHJlY2lzaW9uIiwicm91bmQiLCJzaW5lIiwic2luIiwic3F1YXJlUm9vdCIsInRhbmdlbnQiLCJ0YW4iLCJtdWwiLCJyTCIsInRvQmluYXJ5IiwidG9TdHJpbmdCaW5hcnkiLCJ0b0RlY2ltYWxQbGFjZXMiLCJ0b0RQIiwiY2hlY2tJbnQzMiIsInN0ciIsImZpbml0ZVRvU3RyaW5nIiwidG9GaXhlZCIsInRvRnJhY3Rpb24iLCJtYXhEIiwiZDAiLCJkMSIsImQyIiwibjAiLCJuMSIsInRvSGV4YWRlY2ltYWwiLCJ0b0hleCIsInRvTmVhcmVzdCIsInRvTnVtYmVyIiwidG9PY3RhbCIsInRvUG93ZXIiLCJ5biIsImludFBvdyIsInRvUHJlY2lzaW9uIiwidG9TaWduaWZpY2FudERpZ2l0cyIsInRvU0QiLCJ0cnVuY2F0ZWQiLCJ0cnVuYyIsInZhbHVlT2YiLCJ0b0pTT04iLCJ3cyIsImluZGV4T2ZMYXN0V29yZCIsImdldFplcm9TdHJpbmciLCJyZXBlYXRpbmciLCJkaSIsInJkIiwiY29udmVydEJhc2UiLCJiYXNlSW4iLCJiYXNlT3V0IiwiYXJyIiwiYXJyTCIsInN0ckwiLCJjb3MyeCIsIm11bHRpcGx5SW50ZWdlciIsInRlbXAiLCJjb21wYXJlIiwiYSIsImIiLCJhTCIsImJMIiwic3VidHJhY3QiLCJsb2dCYXNlIiwibW9yZSIsInByb2QiLCJwcm9kTCIsInFkIiwicmVtIiwicmVtTCIsInJlbTAiLCJ4aSIsInhMIiwieWQwIiwieUwiLCJ5eiIsInNpZ24iLCJpc1RydW5jYXRlZCIsImRpZ2l0cyIsInJvdW5kVXAiLCJ4ZGkiLCJvdXQiLCJpc0V4cCIsIm5vbkZpbml0ZVRvU3RyaW5nIiwienMiLCJ0cnVuY2F0ZSIsImlzT2RkIiwibWF4T3JNaW4iLCJhcmdzIiwibHRndCIsInN1bSIsImMiLCJjMCIsIm51bWVyYXRvciIsIngxIiwiU3RyaW5nIiwicGFyc2VEZWNpbWFsIiwicmVwbGFjZSIsInNlYXJjaCIsInN1YnN0cmluZyIsImNoYXJDb2RlQXQiLCJwYXJzZU90aGVyIiwiZGl2aXNvciIsImlzRmxvYXQiLCJwIiwidGVzdCIsInRvTG93ZXJDYXNlIiwic2luMl94IiwiaXNIeXBlcmJvbGljIiwidSIsInBpIiwiYXRhbjIiLCJjb25maWciLCJvYmoiLCJ2IiwidXNlRGVmYXVsdHMiLCJkZWZhdWx0cyIsInBzIiwiZ2V0UmFuZG9tVmFsdWVzIiwicmFuZG9tQnl0ZXMiLCJjbG9uZSIsInByb3RvdHlwZSIsIlJPVU5EX1VQIiwiUk9VTkRfRE9XTiIsIlJPVU5EX0NFSUwiLCJST1VORF9GTE9PUiIsIlJPVU5EX0hBTEZfVVAiLCJST1VORF9IQUxGX0RPV04iLCJST1VORF9IQUxGX0VWRU4iLCJST1VORF9IQUxGX0NFSUwiLCJST1VORF9IQUxGX0ZMT09SIiwiRVVDTElEIiwic2V0IiwiaXNEZWNpbWFsSW5zdGFuY2UiLCJoeXBvdCIsImxvZzEwIiwibG9nMiIsInJhbmRvbSIsImhhc093blByb3BlcnR5IiwiYXJndW1lbnRzIiwiVWludDMyQXJyYXkiLCJjb3B5IiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGYiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUFDLENBQUMsVUFBVUEsV0FBVixFQUF1QjtBQUN2QjtBQUdBOzs7Ozs7O0FBU0E7QUFHRTtBQUNBOztBQUNGLE1BQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUFBLE1BQTJDO0FBRXpDO0FBQ0E7QUFDQUMsRUFBQUEsVUFBVSxHQUFHLEdBSmY7QUFBQSxNQUkyQztBQUV6QztBQUNBQyxFQUFBQSxRQUFRLEdBQUcsa0JBUGI7QUFBQSxNQVNFO0FBQ0FDLEVBQUFBLElBQUksR0FBRyxvZ0NBVlQ7QUFBQSxNQVlFO0FBQ0FDLEVBQUFBLEVBQUUsR0FBRyxvZ0NBYlA7QUFBQSxNQWdCRTtBQUNBQyxFQUFBQSxRQUFRLEdBQUc7QUFFVDtBQUNBO0FBRUE7QUFDQTtBQUNBQyxJQUFBQSxTQUFTLEVBQUUsRUFQRjtBQU84QjtBQUV2QztBQUNB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QUFmLElBQThCQSxJQUE5QixJQUFzQ0EsSUFBSSxDQUFDQSxJQUFMLElBQWFBLElBQW5ELEdBQTBEQSxJQUExRCxHQUFpRUMsTUFBL0U7QUFDRDs7QUFFRHRULElBQUFBLFVBQVUsR0FBR2pCLFdBQVcsQ0FBQ2UsT0FBekI7O0FBQ0FBLElBQUFBLE9BQU8sQ0FBQ0UsVUFBUixHQUFxQixZQUFZO0FBQy9CakIsTUFBQUEsV0FBVyxDQUFDZSxPQUFaLEdBQXNCRSxVQUF0QjtBQUNBLGFBQU9GLE9BQVA7QUFDRCxLQUhEOztBQUtBZixJQUFBQSxXQUFXLENBQUNlLE9BQVosR0FBc0JBLE9BQXRCO0FBQ0Q7QUFDRixDQTF0SkEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qISBkZWNpbWFsLmpzIHYxMC4wLjEgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy9MSUNFTkNFICovXHJcbjsoZnVuY3Rpb24gKGdsb2JhbFNjb3BlKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgZGVjaW1hbC5qcyB2MTAuMC4xXHJcbiAgICogIEFuIGFyYml0cmFyeS1wcmVjaXNpb24gRGVjaW1hbCB0eXBlIGZvciBKYXZhU2NyaXB0LlxyXG4gICAqICBodHRwczovL2dpdGh1Yi5jb20vTWlrZU1jbC9kZWNpbWFsLmpzXHJcbiAgICogIENvcHlyaWdodCAoYykgMjAxNyBNaWNoYWVsIE1jbGF1Z2hsaW4gPE04Y2g4OGxAZ21haWwuY29tPlxyXG4gICAqICBNSVQgTGljZW5jZVxyXG4gICAqL1xyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEVESVRBQkxFIERFRkFVTFRTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblxyXG4gICAgLy8gVGhlIG1heGltdW0gZXhwb25lbnQgbWFnbml0dWRlLlxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBgdG9FeHBOZWdgLCBgdG9FeHBQb3NgLCBgbWluRWAgYW5kIGBtYXhFYC5cclxuICB2YXIgRVhQX0xJTUlUID0gOWUxNSwgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA5ZTE1XHJcblxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBgcHJlY2lzaW9uYCwgYW5kIG9uIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgYXJndW1lbnQgdG9cclxuICAgIC8vIGB0b0RlY2ltYWxQbGFjZXNgLCBgdG9FeHBvbmVudGlhbGAsIGB0b0ZpeGVkYCwgYHRvUHJlY2lzaW9uYCBhbmQgYHRvU2lnbmlmaWNhbnREaWdpdHNgLlxyXG4gICAgTUFYX0RJR0lUUyA9IDFlOSwgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDFlOVxyXG5cclxuICAgIC8vIEJhc2UgY29udmVyc2lvbiBhbHBoYWJldC5cclxuICAgIE5VTUVSQUxTID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxyXG5cclxuICAgIC8vIFRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiAxMCAoMTAyNSBkaWdpdHMpLlxyXG4gICAgTE4xMCA9ICcyLjMwMjU4NTA5Mjk5NDA0NTY4NDAxNzk5MTQ1NDY4NDM2NDIwNzYwMTEwMTQ4ODYyODc3Mjk3NjAzMzMyNzkwMDk2NzU3MjYwOTY3NzM1MjQ4MDIzNTk5NzIwNTA4OTU5ODI5ODM0MTk2Nzc4NDA0MjI4NjI0ODYzMzQwOTUyNTQ2NTA4MjgwNjc1NjY2NjI4NzM2OTA5ODc4MTY4OTQ4MjkwNzIwODMyNTU1NDY4MDg0Mzc5OTg5NDgyNjIzMzE5ODUyODM5MzUwNTMwODk2NTM3NzczMjYyODg0NjE2MzM2NjIyMjI4NzY5ODIxOTg4Njc0NjU0MzY2NzQ3NDQwNDI0MzI3NDM2NTE1NTA0ODkzNDMxNDkzOTM5MTQ3OTYxOTQwNDQwMDIyMjEwNTEwMTcxNDE3NDgwMDM2ODgwODQwMTI2NDcwODA2ODU1Njc3NDMyMTYyMjgzNTUyMjAxMTQ4MDQ2NjM3MTU2NTkxMjEzNzM0NTA3NDc4NTY5NDc2ODM0NjM2MTY3OTIxMDE4MDY0NDUwNzA2NDgwMDAyNzc1MDI2ODQ5MTY3NDY1NTA1ODY4NTY5MzU2NzM0MjA2NzA1ODExMzY0MjkyMjQ1NTQ0MDU3NTg5MjU3MjQyMDgyNDEzMTQ2OTU2ODkwMTY3NTg5NDAyNTY3NzYzMTEzNTY5MTkyOTIwMzMzNzY1ODcxNDE2NjAyMzAxMDU3MDMwODk2MzQ1NzIwNzU0NDAzNzA4NDc0Njk5NDAxNjgyNjkyODI4MDg0ODExODQyODkzMTQ4NDg1MjQ5NDg2NDQ4NzE5Mjc4MDk2NzYyNzEyNzU3NzUzOTcwMjc2Njg2MDU5NTI0OTY3MTY2NzQxODM0ODU3MDQ0MjI1MDcxOTc5NjUwMDQ3MTQ5NTEwNTA0OTIyMTQ3NzY1Njc2MzY5Mzg2NjI5NzY5Nzk1MjIxMTA3MTgyNjQ1NDk3MzQ3NzI2NjI0MjU3MDk0MjkzMjI1ODI3OTg1MDI1ODU1MDk3ODUyNjUzODMyMDc2MDY3MjYzMTcxNjQzMDk1MDU5OTUwODc4MDc1MjM3MTAzMzMxMDExOTc4NTc1NDczMzE1NDE0MjE4MDg0Mjc1NDM4NjM1OTE3NzgxMTcwNTQzMDk4Mjc0ODIzODUwNDU2NDgwMTkwOTU2MTAyOTkyOTE4MjQzMTgyMzc1MjUzNTc3MDk3NTA1Mzk1NjUxODc2OTc1MTAzNzQ5NzA4ODg2OTIxODAyMDUxODkzMzk1MDcyMzg1MzkyMDUxNDQ2MzQxOTcyNjUyODcyODY5NjUxMTA4NjI1NzE0OTIxOTg4NDk5Nzg3NDg4NzM3NzEzNDU2ODYyMDkxNjcwNTgnLFxyXG5cclxuICAgIC8vIFBpICgxMDI1IGRpZ2l0cykuXHJcbiAgICBQSSA9ICczLjE0MTU5MjY1MzU4OTc5MzIzODQ2MjY0MzM4MzI3OTUwMjg4NDE5NzE2OTM5OTM3NTEwNTgyMDk3NDk0NDU5MjMwNzgxNjQwNjI4NjIwODk5ODYyODAzNDgyNTM0MjExNzA2Nzk4MjE0ODA4NjUxMzI4MjMwNjY0NzA5Mzg0NDYwOTU1MDU4MjIzMTcyNTM1OTQwODEyODQ4MTExNzQ1MDI4NDEwMjcwMTkzODUyMTEwNTU1OTY0NDYyMjk0ODk1NDkzMDM4MTk2NDQyODgxMDk3NTY2NTkzMzQ0NjEyODQ3NTY0ODIzMzc4Njc4MzE2NTI3MTIwMTkwOTE0NTY0ODU2NjkyMzQ2MDM0ODYxMDQ1NDMyNjY0ODIxMzM5MzYwNzI2MDI0OTE0MTI3MzcyNDU4NzAwNjYwNjMxNTU4ODE3NDg4MTUyMDkyMDk2MjgyOTI1NDA5MTcxNTM2NDM2Nzg5MjU5MDM2MDAxMTMzMDUzMDU0ODgyMDQ2NjUyMTM4NDE0Njk1MTk0MTUxMTYwOTQzMzA1NzI3MDM2NTc1OTU5MTk1MzA5MjE4NjExNzM4MTkzMjYxMTc5MzEwNTExODU0ODA3NDQ2MjM3OTk2Mjc0OTU2NzM1MTg4NTc1MjcyNDg5MTIyNzkzODE4MzAxMTk0OTEyOTgzMzY3MzM2MjQ0MDY1NjY0MzA4NjAyMTM5NDk0NjM5NTIyNDczNzE5MDcwMjE3OTg2MDk0MzcwMjc3MDUzOTIxNzE3NjI5MzE3Njc1MjM4NDY3NDgxODQ2NzY2OTQwNTEzMjAwMDU2ODEyNzE0NTI2MzU2MDgyNzc4NTc3MTM0Mjc1Nzc4OTYwOTE3MzYzNzE3ODcyMTQ2ODQ0MDkwMTIyNDk1MzQzMDE0NjU0OTU4NTM3MTA1MDc5MjI3OTY4OTI1ODkyMzU0MjAxOTk1NjExMjEyOTAyMTk2MDg2NDAzNDQxODE1OTgxMzYyOTc3NDc3MTMwOTk2MDUxODcwNzIxMTM0OTk5OTk5ODM3Mjk3ODA0OTk1MTA1OTczMTczMjgxNjA5NjMxODU5NTAyNDQ1OTQ1NTM0NjkwODMwMjY0MjUyMjMwODI1MzM0NDY4NTAzNTI2MTkzMTE4ODE3MTAxMDAwMzEzNzgzODc1Mjg4NjU4NzUzMzIwODM4MTQyMDYxNzE3NzY2OTE0NzMwMzU5ODI1MzQ5MDQyODc1NTQ2ODczMTE1OTU2Mjg2Mzg4MjM1Mzc4NzU5Mzc1MTk1Nzc4MTg1Nzc4MDUzMjE3MTIyNjgwNjYxMzAwMTkyNzg3NjYxMTE5NTkwOTIxNjQyMDE5ODkzODA5NTI1NzIwMTA2NTQ4NTg2MzI3ODknLFxyXG5cclxuXHJcbiAgICAvLyBUaGUgaW5pdGlhbCBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgb2YgdGhlIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgICBERUZBVUxUUyA9IHtcclxuXHJcbiAgICAgIC8vIFRoZXNlIHZhbHVlcyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgc3RhdGVkIHJhbmdlcyAoaW5jbHVzaXZlKS5cclxuICAgICAgLy8gTW9zdCBvZiB0aGVzZSB2YWx1ZXMgY2FuIGJlIGNoYW5nZWQgYXQgcnVuLXRpbWUgdXNpbmcgdGhlIGBEZWNpbWFsLmNvbmZpZ2AgbWV0aG9kLlxyXG5cclxuICAgICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgcmVzdWx0IG9mIGEgY2FsY3VsYXRpb24gb3IgYmFzZSBjb252ZXJzaW9uLlxyXG4gICAgICAvLyBFLmcuIGBEZWNpbWFsLmNvbmZpZyh7IHByZWNpc2lvbjogMjAgfSk7YFxyXG4gICAgICBwcmVjaXNpb246IDIwLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxIHRvIE1BWF9ESUdJVFNcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgd2hlbiByb3VuZGluZyB0byBgcHJlY2lzaW9uYC5cclxuICAgICAgLy9cclxuICAgICAgLy8gUk9VTkRfVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9ET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9DRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0ZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEUuZy5cclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSA0O2BcclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSBEZWNpbWFsLlJPVU5EX0hBTEZfVVA7YFxyXG4gICAgICByb3VuZGluZzogNCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAgIC8vIFRoZSBtb2R1bG8gbW9kZSB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgdGhlIG1vZHVsdXM6IGEgbW9kIG4uXHJcbiAgICAgIC8vIFRoZSBxdW90aWVudCAocSA9IGEgLyBuKSBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgY29ycmVzcG9uZGluZyByb3VuZGluZyBtb2RlLlxyXG4gICAgICAvLyBUaGUgcmVtYWluZGVyIChyKSBpcyBjYWxjdWxhdGVkIGFzOiByID0gYSAtIG4gKiBxLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBVUCAgICAgICAgIDAgVGhlIHJlbWFpbmRlciBpcyBwb3NpdGl2ZSBpZiB0aGUgZGl2aWRlbmQgaXMgbmVnYXRpdmUsIGVsc2UgaXMgbmVnYXRpdmUuXHJcbiAgICAgIC8vIERPV04gICAgICAgMSBUaGUgcmVtYWluZGVyIGhhcyB0aGUgc2FtZSBzaWduIGFzIHRoZSBkaXZpZGVuZCAoSmF2YVNjcmlwdCAlKS5cclxuICAgICAgLy8gRkxPT1IgICAgICAzIFRoZSByZW1haW5kZXIgaGFzIHRoZSBzYW1lIHNpZ24gYXMgdGhlIGRpdmlzb3IgKFB5dGhvbiAlKS5cclxuICAgICAgLy8gSEFMRl9FVkVOICA2IFRoZSBJRUVFIDc1NCByZW1haW5kZXIgZnVuY3Rpb24uXHJcbiAgICAgIC8vIEVVQ0xJRCAgICAgOSBFdWNsaWRpYW4gZGl2aXNpb24uIHEgPSBzaWduKG4pICogZmxvb3IoYSAvIGFicyhuKSkuIEFsd2F5cyBwb3NpdGl2ZS5cclxuICAgICAgLy9cclxuICAgICAgLy8gVHJ1bmNhdGVkIGRpdmlzaW9uICgxKSwgZmxvb3JlZCBkaXZpc2lvbiAoMyksIHRoZSBJRUVFIDc1NCByZW1haW5kZXIgKDYpLCBhbmQgRXVjbGlkaWFuXHJcbiAgICAgIC8vIGRpdmlzaW9uICg5KSBhcmUgY29tbW9ubHkgdXNlZCBmb3IgdGhlIG1vZHVsdXMgb3BlcmF0aW9uLiBUaGUgb3RoZXIgcm91bmRpbmcgbW9kZXMgY2FuIGFsc29cclxuICAgICAgLy8gYmUgdXNlZCwgYnV0IHRoZXkgbWF5IG5vdCBnaXZlIHVzZWZ1bCByZXN1bHRzLlxyXG4gICAgICBtb2R1bG86IDEsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDlcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogLTdcclxuICAgICAgdG9FeHBOZWc6IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAtRVhQX0xJTUlUXHJcblxyXG4gICAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGFib3ZlIHdoaWNoIGB0b1N0cmluZ2AgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gSmF2YVNjcmlwdCBudW1iZXJzOiAyMVxyXG4gICAgICB0b0V4cFBvczogIDIxLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIEVYUF9MSU1JVFxyXG5cclxuICAgICAgLy8gVGhlIG1pbmltdW0gZXhwb25lbnQgdmFsdWUsIGJlbmVhdGggd2hpY2ggdW5kZXJmbG93IHRvIHplcm8gb2NjdXJzLlxyXG4gICAgICAvLyBKYXZhU2NyaXB0IG51bWJlcnM6IC0zMjQgICg1ZS0zMjQpXHJcbiAgICAgIG1pbkU6IC1FWFBfTElNSVQsICAgICAgICAgICAgICAgICAgICAgIC8vIC0xIHRvIC1FWFBfTElNSVRcclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIGV4cG9uZW50IHZhbHVlLCBhYm92ZSB3aGljaCBvdmVyZmxvdyB0byBJbmZpbml0eSBvY2N1cnMuXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogMzA4ICAoMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpXHJcbiAgICAgIG1heEU6IEVYUF9MSU1JVCwgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gRVhQX0xJTUlUXHJcblxyXG4gICAgICAvLyBXaGV0aGVyIHRvIHVzZSBjcnlwdG9ncmFwaGljYWxseS1zZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0aW9uLCBpZiBhdmFpbGFibGUuXHJcbiAgICAgIGNyeXB0bzogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWUvZmFsc2VcclxuICAgIH0sXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgT0YgRURJVEFCTEUgREVGQVVMVFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICBEZWNpbWFsLCBpbmV4YWN0LCBub0NvbmZsaWN0LCBxdWFkcmFudCxcclxuICAgIGV4dGVybmFsID0gdHJ1ZSxcclxuXHJcbiAgICBkZWNpbWFsRXJyb3IgPSAnW0RlY2ltYWxFcnJvcl0gJyxcclxuICAgIGludmFsaWRBcmd1bWVudCA9IGRlY2ltYWxFcnJvciArICdJbnZhbGlkIGFyZ3VtZW50OiAnLFxyXG4gICAgcHJlY2lzaW9uTGltaXRFeGNlZWRlZCA9IGRlY2ltYWxFcnJvciArICdQcmVjaXNpb24gbGltaXQgZXhjZWVkZWQnLFxyXG4gICAgY3J5cHRvVW5hdmFpbGFibGUgPSBkZWNpbWFsRXJyb3IgKyAnY3J5cHRvIHVuYXZhaWxhYmxlJyxcclxuXHJcbiAgICBtYXRoZmxvb3IgPSBNYXRoLmZsb29yLFxyXG4gICAgbWF0aHBvdyA9IE1hdGgucG93LFxyXG5cclxuICAgIGlzQmluYXJ5ID0gL14wYihbMDFdKyhcXC5bMDFdKik/fFxcLlswMV0rKShwWystXT9cXGQrKT8kL2ksXHJcbiAgICBpc0hleCA9IC9eMHgoWzAtOWEtZl0rKFxcLlswLTlhLWZdKik/fFxcLlswLTlhLWZdKykocFsrLV0/XFxkKyk/JC9pLFxyXG4gICAgaXNPY3RhbCA9IC9eMG8oWzAtN10rKFxcLlswLTddKik/fFxcLlswLTddKykocFsrLV0/XFxkKyk/JC9pLFxyXG4gICAgaXNEZWNpbWFsID0gL14oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/JC9pLFxyXG5cclxuICAgIEJBU0UgPSAxZTcsXHJcbiAgICBMT0dfQkFTRSA9IDcsXHJcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MSxcclxuXHJcbiAgICBMTjEwX1BSRUNJU0lPTiA9IExOMTAubGVuZ3RoIC0gMSxcclxuICAgIFBJX1BSRUNJU0lPTiA9IFBJLmxlbmd0aCAtIDEsXHJcblxyXG4gICAgLy8gRGVjaW1hbC5wcm90b3R5cGUgb2JqZWN0XHJcbiAgICBQID0geyBuYW1lOiAnW29iamVjdCBEZWNpbWFsXScgfTtcclxuXHJcblxyXG4gIC8vIERlY2ltYWwgcHJvdG90eXBlIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFic29sdXRlVmFsdWUgICAgICAgICAgICAgYWJzXHJcbiAgICogIGNlaWxcclxuICAgKiAgY29tcGFyZWRUbyAgICAgICAgICAgICAgICBjbXBcclxuICAgKiAgY29zaW5lICAgICAgICAgICAgICAgICAgICBjb3NcclxuICAgKiAgY3ViZVJvb3QgICAgICAgICAgICAgICAgICBjYnJ0XHJcbiAgICogIGRlY2ltYWxQbGFjZXMgICAgICAgICAgICAgZHBcclxuICAgKiAgZGl2aWRlZEJ5ICAgICAgICAgICAgICAgICBkaXZcclxuICAgKiAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgICBkaXZUb0ludFxyXG4gICAqICBlcXVhbHMgICAgICAgICAgICAgICAgICAgIGVxXHJcbiAgICogIGZsb29yXHJcbiAgICogIGdyZWF0ZXJUaGFuICAgICAgICAgICAgICAgZ3RcclxuICAgKiAgZ3JlYXRlclRoYW5PckVxdWFsVG8gICAgICBndGVcclxuICAgKiAgaHlwZXJib2xpY0Nvc2luZSAgICAgICAgICBjb3NoXHJcbiAgICogIGh5cGVyYm9saWNTaW5lICAgICAgICAgICAgc2luaFxyXG4gICAqICBoeXBlcmJvbGljVGFuZ2VudCAgICAgICAgIHRhbmhcclxuICAgKiAgaW52ZXJzZUNvc2luZSAgICAgICAgICAgICBhY29zXHJcbiAgICogIGludmVyc2VIeXBlcmJvbGljQ29zaW5lICAgYWNvc2hcclxuICAgKiAgaW52ZXJzZUh5cGVyYm9saWNTaW5lICAgICBhc2luaFxyXG4gICAqICBpbnZlcnNlSHlwZXJib2xpY1RhbmdlbnQgIGF0YW5oXHJcbiAgICogIGludmVyc2VTaW5lICAgICAgICAgICAgICAgYXNpblxyXG4gICAqICBpbnZlcnNlVGFuZ2VudCAgICAgICAgICAgIGF0YW5cclxuICAgKiAgaXNGaW5pdGVcclxuICAgKiAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICBpc0ludFxyXG4gICAqICBpc05hTlxyXG4gICAqICBpc05lZ2F0aXZlICAgICAgICAgICAgICAgIGlzTmVnXHJcbiAgICogIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgaXNQb3NcclxuICAgKiAgaXNaZXJvXHJcbiAgICogIGxlc3NUaGFuICAgICAgICAgICAgICAgICAgbHRcclxuICAgKiAgbGVzc1RoYW5PckVxdWFsVG8gICAgICAgICBsdGVcclxuICAgKiAgbG9nYXJpdGhtICAgICAgICAgICAgICAgICBsb2dcclxuICAgKiAgW21heGltdW1dICAgICAgICAgICAgICAgICBbbWF4XVxyXG4gICAqICBbbWluaW11bV0gICAgICAgICAgICAgICAgIFttaW5dXHJcbiAgICogIG1pbnVzICAgICAgICAgICAgICAgICAgICAgc3ViXHJcbiAgICogIG1vZHVsbyAgICAgICAgICAgICAgICAgICAgbW9kXHJcbiAgICogIG5hdHVyYWxFeHBvbmVudGlhbCAgICAgICAgZXhwXHJcbiAgICogIG5hdHVyYWxMb2dhcml0aG0gICAgICAgICAgbG5cclxuICAgKiAgbmVnYXRlZCAgICAgICAgICAgICAgICAgICBuZWdcclxuICAgKiAgcGx1cyAgICAgICAgICAgICAgICAgICAgICBhZGRcclxuICAgKiAgcHJlY2lzaW9uICAgICAgICAgICAgICAgICBzZFxyXG4gICAqICByb3VuZFxyXG4gICAqICBzaW5lICAgICAgICAgICAgICAgICAgICAgIHNpblxyXG4gICAqICBzcXVhcmVSb290ICAgICAgICAgICAgICAgIHNxcnRcclxuICAgKiAgdGFuZ2VudCAgICAgICAgICAgICAgICAgICB0YW5cclxuICAgKiAgdGltZXMgICAgICAgICAgICAgICAgICAgICBtdWxcclxuICAgKiAgdG9CaW5hcnlcclxuICAgKiAgdG9EZWNpbWFsUGxhY2VzICAgICAgICAgICB0b0RQXHJcbiAgICogIHRvRXhwb25lbnRpYWxcclxuICAgKiAgdG9GaXhlZFxyXG4gICAqICB0b0ZyYWN0aW9uXHJcbiAgICogIHRvSGV4YWRlY2ltYWwgICAgICAgICAgICAgdG9IZXhcclxuICAgKiAgdG9OZWFyZXN0XHJcbiAgICogIHRvTnVtYmVyXHJcbiAgICogIHRvT2N0YWxcclxuICAgKiAgdG9Qb3dlciAgICAgICAgICAgICAgICAgICBwb3dcclxuICAgKiAgdG9QcmVjaXNpb25cclxuICAgKiAgdG9TaWduaWZpY2FudERpZ2l0cyAgICAgICB0b1NEXHJcbiAgICogIHRvU3RyaW5nXHJcbiAgICogIHRydW5jYXRlZCAgICAgICAgICAgICAgICAgdHJ1bmNcclxuICAgKiAgdmFsdWVPZiAgICAgICAgICAgICAgICAgICB0b0pTT05cclxuICAgKi9cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIGlmICh4LnMgPCAwKSB4LnMgPSAxO1xyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHgpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIHdob2xlIG51bWJlciBpbiB0aGVcclxuICAgKiBkaXJlY3Rpb24gb2YgcG9zaXRpdmUgSW5maW5pdHkuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmNlaWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZmluYWxpc2UobmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyksIHRoaXMuZSArIDEsIDIpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVyblxyXG4gICAqICAgMSAgICBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqICAtMSAgICBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqICAgMCAgICBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWUsXHJcbiAgICogICBOYU4gIGlmIHRoZSB2YWx1ZSBvZiBlaXRoZXIgRGVjaW1hbCBpcyBOYU4uXHJcbiAgICpcclxuICAgKi9cclxuICBQLmNvbXBhcmVkVG8gPSBQLmNtcCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgaSwgaiwgeGRMLCB5ZEwsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgeWQgPSAoeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpKS5kLFxyXG4gICAgICB4cyA9IHgucyxcclxuICAgICAgeXMgPSB5LnM7XHJcblxyXG4gICAgLy8gRWl0aGVyIE5hTiBvciDCsUluZmluaXR5P1xyXG4gICAgaWYgKCF4ZCB8fCAheWQpIHtcclxuICAgICAgcmV0dXJuICF4cyB8fCAheXMgPyBOYU4gOiB4cyAhPT0geXMgPyB4cyA6IHhkID09PSB5ZCA/IDAgOiAheGQgXiB4cyA8IDAgPyAxIDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICBpZiAoIXhkWzBdIHx8ICF5ZFswXSkgcmV0dXJuIHhkWzBdID8geHMgOiB5ZFswXSA/IC15cyA6IDA7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKHhzICE9PSB5cykgcmV0dXJuIHhzO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZXhwb25lbnRzLlxyXG4gICAgaWYgKHguZSAhPT0geS5lKSByZXR1cm4geC5lID4geS5lIF4geHMgPCAwID8gMSA6IC0xO1xyXG5cclxuICAgIHhkTCA9IHhkLmxlbmd0aDtcclxuICAgIHlkTCA9IHlkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBDb21wYXJlIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgZm9yIChpID0gMCwgaiA9IHhkTCA8IHlkTCA/IHhkTCA6IHlkTDsgaSA8IGo7ICsraSkge1xyXG4gICAgICBpZiAoeGRbaV0gIT09IHlkW2ldKSByZXR1cm4geGRbaV0gPiB5ZFtpXSBeIHhzIDwgMCA/IDEgOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wYXJlIGxlbmd0aHMuXHJcbiAgICByZXR1cm4geGRMID09PSB5ZEwgPyAwIDogeGRMID4geWRMIF4geHMgPCAwID8gMSA6IC0xO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBjb3NpbmUgb2YgdGhlIHZhbHVlIGluIHJhZGlhbnMgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogRG9tYWluOiBbLUluZmluaXR5LCBJbmZpbml0eV1cclxuICAgKiBSYW5nZTogWy0xLCAxXVxyXG4gICAqXHJcbiAgICogY29zKDApICAgICAgICAgPSAxXHJcbiAgICogY29zKC0wKSAgICAgICAgPSAxXHJcbiAgICogY29zKEluZmluaXR5KSAgPSBOYU5cclxuICAgKiBjb3MoLUluZmluaXR5KSA9IE5hTlxyXG4gICAqIGNvcyhOYU4pICAgICAgID0gTmFOXHJcbiAgICpcclxuICAgKi9cclxuICBQLmNvc2luZSA9IFAuY29zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByLCBybSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmICgheC5kKSByZXR1cm4gbmV3IEN0b3IoTmFOKTtcclxuXHJcbiAgICAvLyBjb3MoMCkgPSBjb3MoLTApID0gMVxyXG4gICAgaWYgKCF4LmRbMF0pIHJldHVybiBuZXcgQ3RvcigxKTtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwciArIE1hdGgubWF4KHguZSwgeC5zZCgpKSArIExPR19CQVNFO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcblxyXG4gICAgeCA9IGNvc2luZShDdG9yLCB0b0xlc3NUaGFuSGFsZlBpKEN0b3IsIHgpKTtcclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHJtO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZShxdWFkcmFudCA9PSAyIHx8IHF1YWRyYW50ID09IDMgPyB4Lm5lZygpIDogeCwgcHIsIHJtLCB0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBjdWJlIHJvb3Qgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCwgcm91bmRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiAgY2JydCgwKSAgPSAgMFxyXG4gICAqICBjYnJ0KC0wKSA9IC0wXHJcbiAgICogIGNicnQoMSkgID0gIDFcclxuICAgKiAgY2JydCgtMSkgPSAtMVxyXG4gICAqICBjYnJ0KE4pICA9ICBOXHJcbiAgICogIGNicnQoLUkpID0gLUlcclxuICAgKiAgY2JydChJKSAgPSAgSVxyXG4gICAqXHJcbiAgICogTWF0aC5jYnJ0KHgpID0gKHggPCAwID8gLU1hdGgucG93KC14LCAxLzMpIDogTWF0aC5wb3coeCwgMS8zKSlcclxuICAgKlxyXG4gICAqL1xyXG4gIFAuY3ViZVJvb3QgPSBQLmNicnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZSwgbSwgbiwgciwgcmVwLCBzLCBzZCwgdCwgdDMsIHQzcGx1c3gsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoIXguaXNGaW5pdGUoKSB8fCB4LmlzWmVybygpKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICBzID0geC5zICogTWF0aC5wb3coeC5zICogeCwgMSAvIDMpO1xyXG5cclxuICAgICAvLyBNYXRoLmNicnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgIC8vIFBhc3MgeCB0byBNYXRoLnBvdyBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgIGlmICghcyB8fCBNYXRoLmFicyhzKSA9PSAxIC8gMCkge1xyXG4gICAgICBuID0gZGlnaXRzVG9TdHJpbmcoeC5kKTtcclxuICAgICAgZSA9IHguZTtcclxuXHJcbiAgICAgIC8vIEFkanVzdCBuIGV4cG9uZW50IHNvIGl0IGlzIGEgbXVsdGlwbGUgb2YgMyBhd2F5IGZyb20geCBleHBvbmVudC5cclxuICAgICAgaWYgKHMgPSAoZSAtIG4ubGVuZ3RoICsgMSkgJSAzKSBuICs9IChzID09IDEgfHwgcyA9PSAtMiA/ICcwJyA6ICcwMCcpO1xyXG4gICAgICBzID0gTWF0aC5wb3cobiwgMSAvIDMpO1xyXG5cclxuICAgICAgLy8gUmFyZWx5LCBlIG1heSBiZSBvbmUgbGVzcyB0aGFuIHRoZSByZXN1bHQgZXhwb25lbnQgdmFsdWUuXHJcbiAgICAgIGUgPSBtYXRoZmxvb3IoKGUgKyAxKSAvIDMpIC0gKGUgJSAzID09IChlIDwgMCA/IC0xIDogMikpO1xyXG5cclxuICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICBuID0gJzVlJyArIGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKDAsIG4uaW5kZXhPZignZScpICsgMSkgKyBlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByID0gbmV3IEN0b3Iobik7XHJcbiAgICAgIHIucyA9IHgucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHIgPSBuZXcgQ3RvcihzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNkID0gKGUgPSBDdG9yLnByZWNpc2lvbikgKyAzO1xyXG5cclxuICAgIC8vIEhhbGxleSdzIG1ldGhvZC5cclxuICAgIC8vIFRPRE8/IENvbXBhcmUgTmV3dG9uJ3MgbWV0aG9kLlxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICB0ID0gcjtcclxuICAgICAgdDMgPSB0LnRpbWVzKHQpLnRpbWVzKHQpO1xyXG4gICAgICB0M3BsdXN4ID0gdDMucGx1cyh4KTtcclxuICAgICAgciA9IGRpdmlkZSh0M3BsdXN4LnBsdXMoeCkudGltZXModCksIHQzcGx1c3gucGx1cyh0MyksIHNkICsgMiwgMSk7XHJcblxyXG4gICAgICAvLyBUT0RPPyBSZXBsYWNlIHdpdGggZm9yLWxvb3AgYW5kIGNoZWNrUm91bmRpbmdEaWdpdHMuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHNkKSA9PT0gKG4gPSBkaWdpdHNUb1N0cmluZyhyLmQpKS5zbGljZSgwLCBzZCkpIHtcclxuICAgICAgICBuID0gbi5zbGljZShzZCAtIDMsIHNkICsgMSk7XHJcblxyXG4gICAgICAgIC8vIFRoZSA0dGggcm91bmRpbmcgZGlnaXQgbWF5IGJlIGluIGVycm9yIGJ5IC0xIHNvIGlmIHRoZSA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgOTk5OSBvciA0OTk5XHJcbiAgICAgICAgLy8gLCBpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnksIGNvbnRpbnVlIHRoZSBpdGVyYXRpb24uXHJcbiAgICAgICAgaWYgKG4gPT0gJzk5OTknIHx8ICFyZXAgJiYgbiA9PSAnNDk5OScpIHtcclxuXHJcbiAgICAgICAgICAvLyBPbiB0aGUgZmlyc3QgaXRlcmF0aW9uIG9ubHksIGNoZWNrIHRvIHNlZSBpZiByb3VuZGluZyB1cCBnaXZlcyB0aGUgZXhhY3QgcmVzdWx0IGFzIHRoZVxyXG4gICAgICAgICAgLy8gbmluZXMgbWF5IGluZmluaXRlbHkgcmVwZWF0LlxyXG4gICAgICAgICAgaWYgKCFyZXApIHtcclxuICAgICAgICAgICAgZmluYWxpc2UodCwgZSArIDEsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHQudGltZXModCkudGltZXModCkuZXEoeCkpIHtcclxuICAgICAgICAgICAgICByID0gdDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNkICs9IDQ7XHJcbiAgICAgICAgICByZXAgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIHJvdW5kaW5nIGRpZ2l0cyBhcmUgbnVsbCwgMHswLDR9IG9yIDUwezAsM30sIGNoZWNrIGZvciBhbiBleGFjdCByZXN1bHQuXHJcbiAgICAgICAgICAvLyBJZiBub3QsIHRoZW4gdGhlcmUgYXJlIGZ1cnRoZXIgZGlnaXRzIGFuZCBtIHdpbGwgYmUgdHJ1dGh5LlxyXG4gICAgICAgICAgaWYgKCErbiB8fCAhK24uc2xpY2UoMSkgJiYgbi5jaGFyQXQoMCkgPT0gJzUnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUcnVuY2F0ZSB0byB0aGUgZmlyc3Qgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgICAgIGZpbmFsaXNlKHIsIGUgKyAxLCAxKTtcclxuICAgICAgICAgICAgbSA9ICFyLnRpbWVzKHIpLnRpbWVzKHIpLmVxKHgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxpc2UociwgZSwgQ3Rvci5yb3VuZGluZywgbSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdyxcclxuICAgICAgZCA9IHRoaXMuZCxcclxuICAgICAgbiA9IE5hTjtcclxuXHJcbiAgICBpZiAoZCkge1xyXG4gICAgICB3ID0gZC5sZW5ndGggLSAxO1xyXG4gICAgICBuID0gKHcgLSBtYXRoZmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpKSAqIExPR19CQVNFO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCB3b3JkLlxyXG4gICAgICB3ID0gZFt3XTtcclxuICAgICAgaWYgKHcpIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgbi0tO1xyXG4gICAgICBpZiAobiA8IDApIG4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqICBuIC8gMCA9IElcclxuICAgKiAgbiAvIE4gPSBOXHJcbiAgICogIG4gLyBJID0gMFxyXG4gICAqICAwIC8gbiA9IDBcclxuICAgKiAgMCAvIDAgPSBOXHJcbiAgICogIDAgLyBOID0gTlxyXG4gICAqICAwIC8gSSA9IDBcclxuICAgKiAgTiAvIG4gPSBOXHJcbiAgICogIE4gLyAwID0gTlxyXG4gICAqICBOIC8gTiA9IE5cclxuICAgKiAgTiAvIEkgPSBOXHJcbiAgICogIEkgLyBuID0gSVxyXG4gICAqICBJIC8gMCA9IElcclxuICAgKiAgSSAvIE4gPSBOXHJcbiAgICogIEkgLyBJID0gTlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBkaXZpZGVkIGJ5IGB5YCwgcm91bmRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmRpdmlkZWRCeSA9IFAuZGl2ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiBkaXZpZGUodGhpcywgbmV3IHRoaXMuY29uc3RydWN0b3IoeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnRlZ2VyIHBhcnQgb2YgZGl2aWRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbFxyXG4gICAqIGJ5IHRoZSB2YWx1ZSBvZiBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5kaXZUb0ludCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIGZpbmFsaXNlKGRpdmlkZSh4LCBuZXcgQ3Rvcih5KSwgMCwgMSwgMSksIEN0b3IucHJlY2lzaW9uLCBDdG9yLnJvdW5kaW5nKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmVxdWFscyA9IFAuZXEgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID09PSAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIHdob2xlIG51bWJlciBpbiB0aGVcclxuICAgKiBkaXJlY3Rpb24gb2YgbmVnYXRpdmUgSW5maW5pdHkuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmZsb29yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGZpbmFsaXNlKG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpLCB0aGlzLmUgKyAxLCAzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLCBvdGhlcndpc2UgcmV0dXJuXHJcbiAgICogZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuID0gUC5ndCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZ3JlYXRlclRoYW5PckVxdWFsVG8gPSBQLmd0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgayA9IHRoaXMuY21wKHkpO1xyXG4gICAgcmV0dXJuIGsgPT0gMSB8fCBrID09PSAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBoeXBlcmJvbGljIGNvc2luZSBvZiB0aGUgdmFsdWUgaW4gcmFkaWFucyBvZiB0aGlzXHJcbiAgICogRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIERvbWFpbjogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICogUmFuZ2U6IFsxLCBJbmZpbml0eV1cclxuICAgKlxyXG4gICAqIGNvc2goeCkgPSAxICsgeF4yLzIhICsgeF40LzQhICsgeF42LzYhICsgLi4uXHJcbiAgICpcclxuICAgKiBjb3NoKDApICAgICAgICAgPSAxXHJcbiAgICogY29zaCgtMCkgICAgICAgID0gMVxyXG4gICAqIGNvc2goSW5maW5pdHkpICA9IEluZmluaXR5XHJcbiAgICogY29zaCgtSW5maW5pdHkpID0gSW5maW5pdHlcclxuICAgKiBjb3NoKE5hTikgICAgICAgPSBOYU5cclxuICAgKlxyXG4gICAqICB4ICAgICAgICB0aW1lIHRha2VuIChtcykgICByZXN1bHRcclxuICAgKiAxMDAwICAgICAgOSAgICAgICAgICAgICAgICAgOS44NTAzNTU1NzAwODUyMzQ5Njk0ZSs0MzNcclxuICAgKiAxMDAwMCAgICAgMjUgICAgICAgICAgICAgICAgNC40MDM0MDkxMTI4MzE0NjA3OTM2ZSs0MzQyXHJcbiAgICogMTAwMDAwICAgIDE3MSAgICAgICAgICAgICAgIDEuNDAzMzMxNjgwMjEzMDYxNTg5N2UrNDM0MjlcclxuICAgKiAxMDAwMDAwICAgMzgxNyAgICAgICAgICAgICAgMS41MTY2MDc2OTg0MDEwNDM3NzI1ZSs0MzQyOTRcclxuICAgKiAxMDAwMDAwMCAgYWJhbmRvbmVkIGFmdGVyIDIgbWludXRlIHdhaXRcclxuICAgKlxyXG4gICAqIFRPRE8/IENvbXBhcmUgcGVyZm9ybWFuY2Ugb2YgY29zaCh4KSA9IDAuNSAqIChleHAoeCkgKyBleHAoLXgpKVxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5oeXBlcmJvbGljQ29zaW5lID0gUC5jb3NoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGssIG4sIHByLCBybSwgbGVuLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIG9uZSA9IG5ldyBDdG9yKDEpO1xyXG5cclxuICAgIGlmICgheC5pc0Zpbml0ZSgpKSByZXR1cm4gbmV3IEN0b3IoeC5zID8gMSAvIDAgOiBOYU4pO1xyXG4gICAgaWYgKHguaXNaZXJvKCkpIHJldHVybiBvbmU7XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHIgKyBNYXRoLm1heCh4LmUsIHguc2QoKSkgKyA0O1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcbiAgICBsZW4gPSB4LmQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEFyZ3VtZW50IHJlZHVjdGlvbjogY29zKDR4KSA9IDEgLSA4Y29zXjIoeCkgKyA4Y29zXjQoeCkgKyAxXHJcbiAgICAvLyBpLmUuIGNvcyh4KSA9IDEgLSBjb3NeMih4LzQpKDggLSA4Y29zXjIoeC80KSlcclxuXHJcbiAgICAvLyBFc3RpbWF0ZSB0aGUgb3B0aW11bSBudW1iZXIgb2YgdGltZXMgdG8gdXNlIHRoZSBhcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAvLyBUT0RPPyBFc3RpbWF0aW9uIHJldXNlZCBmcm9tIGNvc2luZSgpIGFuZCBtYXkgbm90IGJlIG9wdGltYWwgaGVyZS5cclxuICAgIGlmIChsZW4gPCAzMikge1xyXG4gICAgICBrID0gTWF0aC5jZWlsKGxlbiAvIDMpO1xyXG4gICAgICBuID0gTWF0aC5wb3coNCwgLWspLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBrID0gMTY7XHJcbiAgICAgIG4gPSAnMi4zMjgzMDY0MzY1Mzg2OTYyODkwNjI1ZS0xMCc7XHJcbiAgICB9XHJcblxyXG4gICAgeCA9IHRheWxvclNlcmllcyhDdG9yLCAxLCB4LnRpbWVzKG4pLCBuZXcgQ3RvcigxKSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gUmV2ZXJzZSBhcmd1bWVudCByZWR1Y3Rpb25cclxuICAgIHZhciBjb3NoMl94LFxyXG4gICAgICBpID0gayxcclxuICAgICAgZDggPSBuZXcgQ3Rvcig4KTtcclxuICAgIGZvciAoOyBpLS07KSB7XHJcbiAgICAgIGNvc2gyX3ggPSB4LnRpbWVzKHgpO1xyXG4gICAgICB4ID0gb25lLm1pbnVzKGNvc2gyX3gudGltZXMoZDgubWludXMoY29zaDJfeC50aW1lcyhkOCkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHgsIEN0b3IucHJlY2lzaW9uID0gcHIsIEN0b3Iucm91bmRpbmcgPSBybSwgdHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGh5cGVyYm9saWMgc2luZSBvZiB0aGUgdmFsdWUgaW4gcmFkaWFucyBvZiB0aGlzXHJcbiAgICogRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIERvbWFpbjogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICogUmFuZ2U6IFstSW5maW5pdHksIEluZmluaXR5XVxyXG4gICAqXHJcbiAgICogc2luaCh4KSA9IHggKyB4XjMvMyEgKyB4XjUvNSEgKyB4XjcvNyEgKyAuLi5cclxuICAgKlxyXG4gICAqIHNpbmgoMCkgICAgICAgICA9IDBcclxuICAgKiBzaW5oKC0wKSAgICAgICAgPSAtMFxyXG4gICAqIHNpbmgoSW5maW5pdHkpICA9IEluZmluaXR5XHJcbiAgICogc2luaCgtSW5maW5pdHkpID0gLUluZmluaXR5XHJcbiAgICogc2luaChOYU4pICAgICAgID0gTmFOXHJcbiAgICpcclxuICAgKiB4ICAgICAgICB0aW1lIHRha2VuIChtcylcclxuICAgKiAxMCAgICAgICAyIG1zXHJcbiAgICogMTAwICAgICAgNSBtc1xyXG4gICAqIDEwMDAgICAgIDE0IG1zXHJcbiAgICogMTAwMDAgICAgODIgbXNcclxuICAgKiAxMDAwMDAgICA4ODYgbXMgICAgICAgICAgICAxLjQwMzMzMTY4MDIxMzA2MTU4OTdlKzQzNDI5XHJcbiAgICogMjAwMDAwICAgMjYxMyBtc1xyXG4gICAqIDMwMDAwMCAgIDU0MDcgbXNcclxuICAgKiA0MDAwMDAgICA4ODI0IG1zXHJcbiAgICogNTAwMDAwICAgMTMwMjYgbXMgICAgICAgICAgOC43MDgwNjQzNjEyNzE4MDg0MTI5ZSsyMTcxNDZcclxuICAgKiAxMDAwMDAwICA0ODU0MyBtc1xyXG4gICAqXHJcbiAgICogVE9ETz8gQ29tcGFyZSBwZXJmb3JtYW5jZSBvZiBzaW5oKHgpID0gMC41ICogKGV4cCh4KSAtIGV4cCgteCkpXHJcbiAgICpcclxuICAgKi9cclxuICBQLmh5cGVyYm9saWNTaW5lID0gUC5zaW5oID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGssIHByLCBybSwgbGVuLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKCF4LmlzRmluaXRlKCkgfHwgeC5pc1plcm8oKSkgcmV0dXJuIG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByICsgTWF0aC5tYXgoeC5lLCB4LnNkKCkpICsgNDtcclxuICAgIEN0b3Iucm91bmRpbmcgPSAxO1xyXG4gICAgbGVuID0geC5kLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuIDwgMykge1xyXG4gICAgICB4ID0gdGF5bG9yU2VyaWVzKEN0b3IsIDIsIHgsIHgsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIEFsdGVybmF0aXZlIGFyZ3VtZW50IHJlZHVjdGlvbjogc2luaCgzeCkgPSBzaW5oKHgpKDMgKyA0c2luaF4yKHgpKVxyXG4gICAgICAvLyBpLmUuIHNpbmgoeCkgPSBzaW5oKHgvMykoMyArIDRzaW5oXjIoeC8zKSlcclxuICAgICAgLy8gMyBtdWx0aXBsaWNhdGlvbnMgYW5kIDEgYWRkaXRpb25cclxuXHJcbiAgICAgIC8vIEFyZ3VtZW50IHJlZHVjdGlvbjogc2luaCg1eCkgPSBzaW5oKHgpKDUgKyBzaW5oXjIoeCkoMjAgKyAxNnNpbmheMih4KSkpXHJcbiAgICAgIC8vIGkuZS4gc2luaCh4KSA9IHNpbmgoeC81KSg1ICsgc2luaF4yKHgvNSkoMjAgKyAxNnNpbmheMih4LzUpKSlcclxuICAgICAgLy8gNCBtdWx0aXBsaWNhdGlvbnMgYW5kIDIgYWRkaXRpb25zXHJcblxyXG4gICAgICAvLyBFc3RpbWF0ZSB0aGUgb3B0aW11bSBudW1iZXIgb2YgdGltZXMgdG8gdXNlIHRoZSBhcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAgIGsgPSAxLjQgKiBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgayA9IGsgPiAxNiA/IDE2IDogayB8IDA7XHJcblxyXG4gICAgICB4ID0geC50aW1lcyhNYXRoLnBvdyg1LCAtaykpO1xyXG5cclxuICAgICAgeCA9IHRheWxvclNlcmllcyhDdG9yLCAyLCB4LCB4LCB0cnVlKTtcclxuXHJcbiAgICAgIC8vIFJldmVyc2UgYXJndW1lbnQgcmVkdWN0aW9uXHJcbiAgICAgIHZhciBzaW5oMl94LFxyXG4gICAgICAgIGQ1ID0gbmV3IEN0b3IoNSksXHJcbiAgICAgICAgZDE2ID0gbmV3IEN0b3IoMTYpLFxyXG4gICAgICAgIGQyMCA9IG5ldyBDdG9yKDIwKTtcclxuICAgICAgZm9yICg7IGstLTspIHtcclxuICAgICAgICBzaW5oMl94ID0geC50aW1lcyh4KTtcclxuICAgICAgICB4ID0geC50aW1lcyhkNS5wbHVzKHNpbmgyX3gudGltZXMoZDE2LnRpbWVzKHNpbmgyX3gpLnBsdXMoZDIwKSkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICBDdG9yLnJvdW5kaW5nID0gcm07XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHgsIHByLCBybSwgdHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGh5cGVyYm9saWMgdGFuZ2VudCBvZiB0aGUgdmFsdWUgaW4gcmFkaWFucyBvZiB0aGlzXHJcbiAgICogRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIERvbWFpbjogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICogUmFuZ2U6IFstMSwgMV1cclxuICAgKlxyXG4gICAqIHRhbmgoeCkgPSBzaW5oKHgpIC8gY29zaCh4KVxyXG4gICAqXHJcbiAgICogdGFuaCgwKSAgICAgICAgID0gMFxyXG4gICAqIHRhbmgoLTApICAgICAgICA9IC0wXHJcbiAgICogdGFuaChJbmZpbml0eSkgID0gMVxyXG4gICAqIHRhbmgoLUluZmluaXR5KSA9IC0xXHJcbiAgICogdGFuaChOYU4pICAgICAgID0gTmFOXHJcbiAgICpcclxuICAgKi9cclxuICBQLmh5cGVyYm9saWNUYW5nZW50ID0gUC50YW5oID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByLCBybSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmICgheC5pc0Zpbml0ZSgpKSByZXR1cm4gbmV3IEN0b3IoeC5zKTtcclxuICAgIGlmICh4LmlzWmVybygpKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHIgKyA3O1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcblxyXG4gICAgcmV0dXJuIGRpdmlkZSh4LnNpbmgoKSwgeC5jb3NoKCksIEN0b3IucHJlY2lzaW9uID0gcHIsIEN0b3Iucm91bmRpbmcgPSBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFyY2Nvc2luZSAoaW52ZXJzZSBjb3NpbmUpIGluIHJhZGlhbnMgb2YgdGhlIHZhbHVlIG9mXHJcbiAgICogdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogRG9tYWluOiBbLTEsIDFdXHJcbiAgICogUmFuZ2U6IFswLCBwaV1cclxuICAgKlxyXG4gICAqIGFjb3MoeCkgPSBwaS8yIC0gYXNpbih4KVxyXG4gICAqXHJcbiAgICogYWNvcygwKSAgICAgICA9IHBpLzJcclxuICAgKiBhY29zKC0wKSAgICAgID0gcGkvMlxyXG4gICAqIGFjb3MoMSkgICAgICAgPSAwXHJcbiAgICogYWNvcygtMSkgICAgICA9IHBpXHJcbiAgICogYWNvcygxLzIpICAgICA9IHBpLzNcclxuICAgKiBhY29zKC0xLzIpICAgID0gMipwaS8zXHJcbiAgICogYWNvcyh8eHwgPiAxKSA9IE5hTlxyXG4gICAqIGFjb3MoTmFOKSAgICAgPSBOYU5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaW52ZXJzZUNvc2luZSA9IFAuYWNvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBoYWxmUGksXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgayA9IHguYWJzKCkuY21wKDEpLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uLFxyXG4gICAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcblxyXG4gICAgaWYgKGsgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBrID09PSAwXHJcbiAgICAgICAgLy8gfHh8IGlzIDFcclxuICAgICAgICA/IHguaXNOZWcoKSA/IGdldFBpKEN0b3IsIHByLCBybSkgOiBuZXcgQ3RvcigwKVxyXG4gICAgICAgIC8vIHx4fCA+IDEgb3IgeCBpcyBOYU5cclxuICAgICAgICA6IG5ldyBDdG9yKE5hTik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHguaXNaZXJvKCkpIHJldHVybiBnZXRQaShDdG9yLCBwciArIDQsIHJtKS50aW1lcygwLjUpO1xyXG5cclxuICAgIC8vIFRPRE8/IFNwZWNpYWwgY2FzZSBhY29zKDAuNSkgPSBwaS8zIGFuZCBhY29zKC0wLjUpID0gMipwaS8zXHJcblxyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwciArIDY7XHJcbiAgICBDdG9yLnJvdW5kaW5nID0gMTtcclxuXHJcbiAgICB4ID0geC5hc2luKCk7XHJcbiAgICBoYWxmUGkgPSBnZXRQaShDdG9yLCBwciArIDQsIHJtKS50aW1lcygwLjUpO1xyXG5cclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICBDdG9yLnJvdW5kaW5nID0gcm07XHJcblxyXG4gICAgcmV0dXJuIGhhbGZQaS5taW51cyh4KTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgaW52ZXJzZSBvZiB0aGUgaHlwZXJib2xpYyBjb3NpbmUgaW4gcmFkaWFucyBvZiB0aGVcclxuICAgKiB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFsxLCBJbmZpbml0eV1cclxuICAgKiBSYW5nZTogWzAsIEluZmluaXR5XVxyXG4gICAqXHJcbiAgICogYWNvc2goeCkgPSBsbih4ICsgc3FydCh4XjIgLSAxKSlcclxuICAgKlxyXG4gICAqIGFjb3NoKHggPCAxKSAgICAgPSBOYU5cclxuICAgKiBhY29zaChOYU4pICAgICAgID0gTmFOXHJcbiAgICogYWNvc2goSW5maW5pdHkpICA9IEluZmluaXR5XHJcbiAgICogYWNvc2goLUluZmluaXR5KSA9IE5hTlxyXG4gICAqIGFjb3NoKDApICAgICAgICAgPSBOYU5cclxuICAgKiBhY29zaCgtMCkgICAgICAgID0gTmFOXHJcbiAgICogYWNvc2goMSkgICAgICAgICA9IDBcclxuICAgKiBhY29zaCgtMSkgICAgICAgID0gTmFOXHJcbiAgICpcclxuICAgKi9cclxuICBQLmludmVyc2VIeXBlcmJvbGljQ29zaW5lID0gUC5hY29zaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwciwgcm0sXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoeC5sdGUoMSkpIHJldHVybiBuZXcgQ3Rvcih4LmVxKDEpID8gMCA6IE5hTik7XHJcbiAgICBpZiAoIXguaXNGaW5pdGUoKSkgcmV0dXJuIG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByICsgTWF0aC5tYXgoTWF0aC5hYnMoeC5lKSwgeC5zZCgpKSArIDQ7XHJcbiAgICBDdG9yLnJvdW5kaW5nID0gMTtcclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcblxyXG4gICAgeCA9IHgudGltZXMoeCkubWludXMoMSkuc3FydCgpLnBsdXMoeCk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgIEN0b3Iucm91bmRpbmcgPSBybTtcclxuXHJcbiAgICByZXR1cm4geC5sbigpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBoeXBlcmJvbGljIHNpbmUgaW4gcmFkaWFucyBvZiB0aGUgdmFsdWVcclxuICAgKiBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFstSW5maW5pdHksIEluZmluaXR5XVxyXG4gICAqIFJhbmdlOiBbLUluZmluaXR5LCBJbmZpbml0eV1cclxuICAgKlxyXG4gICAqIGFzaW5oKHgpID0gbG4oeCArIHNxcnQoeF4yICsgMSkpXHJcbiAgICpcclxuICAgKiBhc2luaChOYU4pICAgICAgID0gTmFOXHJcbiAgICogYXNpbmgoSW5maW5pdHkpICA9IEluZmluaXR5XHJcbiAgICogYXNpbmgoLUluZmluaXR5KSA9IC1JbmZpbml0eVxyXG4gICAqIGFzaW5oKDApICAgICAgICAgPSAwXHJcbiAgICogYXNpbmgoLTApICAgICAgICA9IC0wXHJcbiAgICpcclxuICAgKi9cclxuICBQLmludmVyc2VIeXBlcmJvbGljU2luZSA9IFAuYXNpbmggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcHIsIHJtLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKCF4LmlzRmluaXRlKCkgfHwgeC5pc1plcm8oKSkgcmV0dXJuIG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByICsgMiAqIE1hdGgubWF4KE1hdGguYWJzKHguZSksIHguc2QoKSkgKyA2O1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIHggPSB4LnRpbWVzKHgpLnBsdXMoMSkuc3FydCgpLnBsdXMoeCk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgIEN0b3Iucm91bmRpbmcgPSBybTtcclxuXHJcbiAgICByZXR1cm4geC5sbigpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBoeXBlcmJvbGljIHRhbmdlbnQgaW4gcmFkaWFucyBvZiB0aGVcclxuICAgKiB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFstMSwgMV1cclxuICAgKiBSYW5nZTogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICpcclxuICAgKiBhdGFuaCh4KSA9IDAuNSAqIGxuKCgxICsgeCkgLyAoMSAtIHgpKVxyXG4gICAqXHJcbiAgICogYXRhbmgofHh8ID4gMSkgICA9IE5hTlxyXG4gICAqIGF0YW5oKE5hTikgICAgICAgPSBOYU5cclxuICAgKiBhdGFuaChJbmZpbml0eSkgID0gTmFOXHJcbiAgICogYXRhbmgoLUluZmluaXR5KSA9IE5hTlxyXG4gICAqIGF0YW5oKDApICAgICAgICAgPSAwXHJcbiAgICogYXRhbmgoLTApICAgICAgICA9IC0wXHJcbiAgICogYXRhbmgoMSkgICAgICAgICA9IEluZmluaXR5XHJcbiAgICogYXRhbmgoLTEpICAgICAgICA9IC1JbmZpbml0eVxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pbnZlcnNlSHlwZXJib2xpY1RhbmdlbnQgPSBQLmF0YW5oID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByLCBybSwgd3ByLCB4c2QsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoIXguaXNGaW5pdGUoKSkgcmV0dXJuIG5ldyBDdG9yKE5hTik7XHJcbiAgICBpZiAoeC5lID49IDApIHJldHVybiBuZXcgQ3Rvcih4LmFicygpLmVxKDEpID8geC5zIC8gMCA6IHguaXNaZXJvKCkgPyB4IDogTmFOKTtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgeHNkID0geC5zZCgpO1xyXG5cclxuICAgIGlmIChNYXRoLm1heCh4c2QsIHByKSA8IDIgKiAteC5lIC0gMSkgcmV0dXJuIGZpbmFsaXNlKG5ldyBDdG9yKHgpLCBwciwgcm0sIHRydWUpO1xyXG5cclxuICAgIEN0b3IucHJlY2lzaW9uID0gd3ByID0geHNkIC0geC5lO1xyXG5cclxuICAgIHggPSBkaXZpZGUoeC5wbHVzKDEpLCBuZXcgQ3RvcigxKS5taW51cyh4KSwgd3ByICsgcHIsIDEpO1xyXG5cclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHIgKyA0O1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcblxyXG4gICAgeCA9IHgubG4oKTtcclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHJtO1xyXG5cclxuICAgIHJldHVybiB4LnRpbWVzKDAuNSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFyY3NpbmUgKGludmVyc2Ugc2luZSkgaW4gcmFkaWFucyBvZiB0aGUgdmFsdWUgb2YgdGhpc1xyXG4gICAqIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFstSW5maW5pdHksIEluZmluaXR5XVxyXG4gICAqIFJhbmdlOiBbLXBpLzIsIHBpLzJdXHJcbiAgICpcclxuICAgKiBhc2luKHgpID0gMiphdGFuKHgvKDEgKyBzcXJ0KDEgLSB4XjIpKSlcclxuICAgKlxyXG4gICAqIGFzaW4oMCkgICAgICAgPSAwXHJcbiAgICogYXNpbigtMCkgICAgICA9IC0wXHJcbiAgICogYXNpbigxLzIpICAgICA9IHBpLzZcclxuICAgKiBhc2luKC0xLzIpICAgID0gLXBpLzZcclxuICAgKiBhc2luKDEpICAgICAgID0gcGkvMlxyXG4gICAqIGFzaW4oLTEpICAgICAgPSAtcGkvMlxyXG4gICAqIGFzaW4ofHh8ID4gMSkgPSBOYU5cclxuICAgKiBhc2luKE5hTikgICAgID0gTmFOXHJcbiAgICpcclxuICAgKiBUT0RPPyBDb21wYXJlIHBlcmZvcm1hbmNlIG9mIFRheWxvciBzZXJpZXMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmludmVyc2VTaW5lID0gUC5hc2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGhhbGZQaSwgayxcclxuICAgICAgcHIsIHJtLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKHguaXNaZXJvKCkpIHJldHVybiBuZXcgQ3Rvcih4KTtcclxuXHJcbiAgICBrID0geC5hYnMoKS5jbXAoMSk7XHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG5cclxuICAgIGlmIChrICE9PSAtMSkge1xyXG5cclxuICAgICAgLy8gfHh8IGlzIDFcclxuICAgICAgaWYgKGsgPT09IDApIHtcclxuICAgICAgICBoYWxmUGkgPSBnZXRQaShDdG9yLCBwciArIDQsIHJtKS50aW1lcygwLjUpO1xyXG4gICAgICAgIGhhbGZQaS5zID0geC5zO1xyXG4gICAgICAgIHJldHVybiBoYWxmUGk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHx4fCA+IDEgb3IgeCBpcyBOYU5cclxuICAgICAgcmV0dXJuIG5ldyBDdG9yKE5hTik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETz8gU3BlY2lhbCBjYXNlIGFzaW4oMS8yKSA9IHBpLzYgYW5kIGFzaW4oLTEvMikgPSAtcGkvNlxyXG5cclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHIgKyA2O1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcblxyXG4gICAgeCA9IHguZGl2KG5ldyBDdG9yKDEpLm1pbnVzKHgudGltZXMoeCkpLnNxcnQoKS5wbHVzKDEpKS5hdGFuKCk7XHJcblxyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgIEN0b3Iucm91bmRpbmcgPSBybTtcclxuXHJcbiAgICByZXR1cm4geC50aW1lcygyKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgYXJjdGFuZ2VudCAoaW52ZXJzZSB0YW5nZW50KSBpbiByYWRpYW5zIG9mIHRoZSB2YWx1ZVxyXG4gICAqIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIERvbWFpbjogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICogUmFuZ2U6IFstcGkvMiwgcGkvMl1cclxuICAgKlxyXG4gICAqIGF0YW4oeCkgPSB4IC0geF4zLzMgKyB4XjUvNSAtIHheNy83ICsgLi4uXHJcbiAgICpcclxuICAgKiBhdGFuKDApICAgICAgICAgPSAwXHJcbiAgICogYXRhbigtMCkgICAgICAgID0gLTBcclxuICAgKiBhdGFuKDEpICAgICAgICAgPSBwaS80XHJcbiAgICogYXRhbigtMSkgICAgICAgID0gLXBpLzRcclxuICAgKiBhdGFuKEluZmluaXR5KSAgPSBwaS8yXHJcbiAgICogYXRhbigtSW5maW5pdHkpID0gLXBpLzJcclxuICAgKiBhdGFuKE5hTikgICAgICAgPSBOYU5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaW52ZXJzZVRhbmdlbnQgPSBQLmF0YW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaSwgaiwgaywgbiwgcHgsIHQsIHIsIHdwciwgeDIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbixcclxuICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG5cclxuICAgIGlmICgheC5pc0Zpbml0ZSgpKSB7XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoTmFOKTtcclxuICAgICAgaWYgKHByICsgNCA8PSBQSV9QUkVDSVNJT04pIHtcclxuICAgICAgICByID0gZ2V0UGkoQ3RvciwgcHIgKyA0LCBybSkudGltZXMoMC41KTtcclxuICAgICAgICByLnMgPSB4LnM7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoeC5pc1plcm8oKSkge1xyXG4gICAgICByZXR1cm4gbmV3IEN0b3IoeCk7XHJcbiAgICB9IGVsc2UgaWYgKHguYWJzKCkuZXEoMSkgJiYgcHIgKyA0IDw9IFBJX1BSRUNJU0lPTikge1xyXG4gICAgICByID0gZ2V0UGkoQ3RvciwgcHIgKyA0LCBybSkudGltZXMoMC4yNSk7XHJcbiAgICAgIHIucyA9IHgucztcclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHIgPSBwciArIDEwO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IDE7XHJcblxyXG4gICAgLy8gVE9ETz8gaWYgKHggPj0gMSAmJiBwciA8PSBQSV9QUkVDSVNJT04pIGF0YW4oeCkgPSBoYWxmUGkgKiB4LnMgLSBhdGFuKDEgLyB4KTtcclxuXHJcbiAgICAvLyBBcmd1bWVudCByZWR1Y3Rpb25cclxuICAgIC8vIEVuc3VyZSB8eHwgPCAwLjQyXHJcbiAgICAvLyBhdGFuKHgpID0gMiAqIGF0YW4oeCAvICgxICsgc3FydCgxICsgeF4yKSkpXHJcblxyXG4gICAgayA9IE1hdGgubWluKDI4LCB3cHIgLyBMT0dfQkFTRSArIDIgfCAwKTtcclxuXHJcbiAgICBmb3IgKGkgPSBrOyBpOyAtLWkpIHggPSB4LmRpdih4LnRpbWVzKHgpLnBsdXMoMSkuc3FydCgpLnBsdXMoMSkpO1xyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcblxyXG4gICAgaiA9IE1hdGguY2VpbCh3cHIgLyBMT0dfQkFTRSk7XHJcbiAgICBuID0gMTtcclxuICAgIHgyID0geC50aW1lcyh4KTtcclxuICAgIHIgPSBuZXcgQ3Rvcih4KTtcclxuICAgIHB4ID0geDtcclxuXHJcbiAgICAvLyBhdGFuKHgpID0geCAtIHheMy8zICsgeF41LzUgLSB4XjcvNyArIC4uLlxyXG4gICAgZm9yICg7IGkgIT09IC0xOykge1xyXG4gICAgICBweCA9IHB4LnRpbWVzKHgyKTtcclxuICAgICAgdCA9IHIubWludXMocHguZGl2KG4gKz0gMikpO1xyXG5cclxuICAgICAgcHggPSBweC50aW1lcyh4Mik7XHJcbiAgICAgIHIgPSB0LnBsdXMocHguZGl2KG4gKz0gMikpO1xyXG5cclxuICAgICAgaWYgKHIuZFtqXSAhPT0gdm9pZCAwKSBmb3IgKGkgPSBqOyByLmRbaV0gPT09IHQuZFtpXSAmJiBpLS07KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaykgciA9IHIudGltZXMoMiA8PCAoayAtIDEpKTtcclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHIsIEN0b3IucHJlY2lzaW9uID0gcHIsIEN0b3Iucm91bmRpbmcgPSBybSwgdHJ1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBhIGZpbml0ZSBudW1iZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzRmluaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5kO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgYW4gaW50ZWdlciwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNJbnRlZ2VyID0gUC5pc0ludCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZCAmJiBtYXRoZmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpID4gdGhpcy5kLmxlbmd0aCAtIDI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBOYU4sIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzTmFOID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnM7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNOZWdhdGl2ZSA9IFAuaXNOZWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIHBvc2l0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc1Bvc2l0aXZlID0gUC5pc1BvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgMCBvciAtMCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5kICYmIHRoaXMuZFswXSA9PT0gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAxO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgdG8gdGhlIHNwZWNpZmllZCBiYXNlLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIElmIG5vIGJhc2UgaXMgc3BlY2lmaWVkLCByZXR1cm4gbG9nWzEwXShhcmcpLlxyXG4gICAqXHJcbiAgICogbG9nW2Jhc2VdKGFyZykgPSBsbihhcmcpIC8gbG4oYmFzZSlcclxuICAgKlxyXG4gICAqIFRoZSByZXN1bHQgd2lsbCBhbHdheXMgYmUgY29ycmVjdGx5IHJvdW5kZWQgaWYgdGhlIGJhc2Ugb2YgdGhlIGxvZyBpcyAxMCwgYW5kICdhbG1vc3QgYWx3YXlzJ1xyXG4gICAqIG90aGVyd2lzZTpcclxuICAgKlxyXG4gICAqIERlcGVuZGluZyBvbiB0aGUgcm91bmRpbmcgbW9kZSwgdGhlIHJlc3VsdCBtYXkgYmUgaW5jb3JyZWN0bHkgcm91bmRlZCBpZiB0aGUgZmlyc3QgZmlmdGVlblxyXG4gICAqIHJvdW5kaW5nIGRpZ2l0cyBhcmUgWzQ5XTk5OTk5OTk5OTk5OTk5IG9yIFs1MF0wMDAwMDAwMDAwMDAwMC4gSW4gdGhhdCBjYXNlLCB0aGUgbWF4aW11bSBlcnJvclxyXG4gICAqIGJldHdlZW4gdGhlIHJlc3VsdCBhbmQgdGhlIGNvcnJlY3RseSByb3VuZGVkIHJlc3VsdCB3aWxsIGJlIG9uZSB1bHAgKHVuaXQgaW4gdGhlIGxhc3QgcGxhY2UpLlxyXG4gICAqXHJcbiAgICogbG9nWy1iXShhKSAgICAgICA9IE5hTlxyXG4gICAqIGxvZ1swXShhKSAgICAgICAgPSBOYU5cclxuICAgKiBsb2dbMV0oYSkgICAgICAgID0gTmFOXHJcbiAgICogbG9nW05hTl0oYSkgICAgICA9IE5hTlxyXG4gICAqIGxvZ1tJbmZpbml0eV0oYSkgPSBOYU5cclxuICAgKiBsb2dbYl0oMCkgICAgICAgID0gLUluZmluaXR5XHJcbiAgICogbG9nW2JdKC0wKSAgICAgICA9IC1JbmZpbml0eVxyXG4gICAqIGxvZ1tiXSgtYSkgICAgICAgPSBOYU5cclxuICAgKiBsb2dbYl0oMSkgICAgICAgID0gMFxyXG4gICAqIGxvZ1tiXShJbmZpbml0eSkgPSBJbmZpbml0eVxyXG4gICAqIGxvZ1tiXShOYU4pICAgICAgPSBOYU5cclxuICAgKlxyXG4gICAqIFtiYXNlXSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgYmFzZSBvZiB0aGUgbG9nYXJpdGhtLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sb2dhcml0aG0gPSBQLmxvZyA9IGZ1bmN0aW9uIChiYXNlKSB7XHJcbiAgICB2YXIgaXNCYXNlMTAsIGQsIGRlbm9taW5hdG9yLCBrLCBpbmYsIG51bSwgc2QsIHIsXHJcbiAgICAgIGFyZyA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSBhcmcuY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb24sXHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZyxcclxuICAgICAgZ3VhcmQgPSA1O1xyXG5cclxuICAgIC8vIERlZmF1bHQgYmFzZSBpcyAxMC5cclxuICAgIGlmIChiYXNlID09IG51bGwpIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKDEwKTtcclxuICAgICAgaXNCYXNlMTAgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKGJhc2UpO1xyXG4gICAgICBkID0gYmFzZS5kO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIE5hTiBpZiBiYXNlIGlzIG5lZ2F0aXZlLCBvciBub24tZmluaXRlLCBvciBpcyAwIG9yIDEuXHJcbiAgICAgIGlmIChiYXNlLnMgPCAwIHx8ICFkIHx8ICFkWzBdIHx8IGJhc2UuZXEoMSkpIHJldHVybiBuZXcgQ3RvcihOYU4pO1xyXG5cclxuICAgICAgaXNCYXNlMTAgPSBiYXNlLmVxKDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBkID0gYXJnLmQ7XHJcblxyXG4gICAgLy8gSXMgYXJnIG5lZ2F0aXZlLCBub24tZmluaXRlLCAwIG9yIDE/XHJcbiAgICBpZiAoYXJnLnMgPCAwIHx8ICFkIHx8ICFkWzBdIHx8IGFyZy5lcSgxKSkge1xyXG4gICAgICByZXR1cm4gbmV3IEN0b3IoZCAmJiAhZFswXSA/IC0xIC8gMCA6IGFyZy5zICE9IDEgPyBOYU4gOiBkID8gMCA6IDEgLyAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgcmVzdWx0IHdpbGwgaGF2ZSBhIG5vbi10ZXJtaW5hdGluZyBkZWNpbWFsIGV4cGFuc2lvbiBpZiBiYXNlIGlzIDEwIGFuZCBhcmcgaXMgbm90IGFuXHJcbiAgICAvLyBpbnRlZ2VyIHBvd2VyIG9mIDEwLlxyXG4gICAgaWYgKGlzQmFzZTEwKSB7XHJcbiAgICAgIGlmIChkLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBpbmYgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoayA9IGRbMF07IGsgJSAxMCA9PT0gMDspIGsgLz0gMTA7XHJcbiAgICAgICAgaW5mID0gayAhPT0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICBzZCA9IHByICsgZ3VhcmQ7XHJcbiAgICBudW0gPSBuYXR1cmFsTG9nYXJpdGhtKGFyZywgc2QpO1xyXG4gICAgZGVub21pbmF0b3IgPSBpc0Jhc2UxMCA/IGdldExuMTAoQ3Rvciwgc2QgKyAxMCkgOiBuYXR1cmFsTG9nYXJpdGhtKGJhc2UsIHNkKTtcclxuXHJcbiAgICAvLyBUaGUgcmVzdWx0IHdpbGwgaGF2ZSA1IHJvdW5kaW5nIGRpZ2l0cy5cclxuICAgIHIgPSBkaXZpZGUobnVtLCBkZW5vbWluYXRvciwgc2QsIDEpO1xyXG5cclxuICAgIC8vIElmIGF0IGEgcm91bmRpbmcgYm91bmRhcnksIGkuZS4gdGhlIHJlc3VsdCdzIHJvdW5kaW5nIGRpZ2l0cyBhcmUgWzQ5XTk5OTkgb3IgWzUwXTAwMDAsXHJcbiAgICAvLyBjYWxjdWxhdGUgMTAgZnVydGhlciBkaWdpdHMuXHJcbiAgICAvL1xyXG4gICAgLy8gSWYgdGhlIHJlc3VsdCBpcyBrbm93biB0byBoYXZlIGFuIGluZmluaXRlIGRlY2ltYWwgZXhwYW5zaW9uLCByZXBlYXQgdGhpcyB1bnRpbCBpdCBpcyBjbGVhclxyXG4gICAgLy8gdGhhdCB0aGUgcmVzdWx0IGlzIGFib3ZlIG9yIGJlbG93IHRoZSBib3VuZGFyeS4gT3RoZXJ3aXNlLCBpZiBhZnRlciBjYWxjdWxhdGluZyB0aGUgMTBcclxuICAgIC8vIGZ1cnRoZXIgZGlnaXRzLCB0aGUgbGFzdCAxNCBhcmUgbmluZXMsIHJvdW5kIHVwIGFuZCBhc3N1bWUgdGhlIHJlc3VsdCBpcyBleGFjdC5cclxuICAgIC8vIEFsc28gYXNzdW1lIHRoZSByZXN1bHQgaXMgZXhhY3QgaWYgdGhlIGxhc3QgMTQgYXJlIHplcm8uXHJcbiAgICAvL1xyXG4gICAgLy8gRXhhbXBsZSBvZiBhIHJlc3VsdCB0aGF0IHdpbGwgYmUgaW5jb3JyZWN0bHkgcm91bmRlZDpcclxuICAgIC8vIGxvZ1sxMDQ4NTc2XSg0NTAzNTk5NjI3MzcwNTAyKSA9IDIuNjAwMDAwMDAwMDAwMDAwMDk2MTAyNzk1MTE0NDQ3NDYuLi5cclxuICAgIC8vIFRoZSBhYm92ZSByZXN1bHQgY29ycmVjdGx5IHJvdW5kZWQgdXNpbmcgUk9VTkRfQ0VJTCB0byAxIGRlY2ltYWwgcGxhY2Ugc2hvdWxkIGJlIDIuNywgYnV0IGl0XHJcbiAgICAvLyB3aWxsIGJlIGdpdmVuIGFzIDIuNiBhcyB0aGVyZSBhcmUgMTUgemVyb3MgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHJlcXVlc3RlZCBkZWNpbWFsIHBsYWNlLCBzb1xyXG4gICAgLy8gdGhlIGV4YWN0IHJlc3VsdCB3b3VsZCBiZSBhc3N1bWVkIHRvIGJlIDIuNiwgd2hpY2ggcm91bmRlZCB1c2luZyBST1VORF9DRUlMIHRvIDEgZGVjaW1hbFxyXG4gICAgLy8gcGxhY2UgaXMgc3RpbGwgMi42LlxyXG4gICAgaWYgKGNoZWNrUm91bmRpbmdEaWdpdHMoci5kLCBrID0gcHIsIHJtKSkge1xyXG5cclxuICAgICAgZG8ge1xyXG4gICAgICAgIHNkICs9IDEwO1xyXG4gICAgICAgIG51bSA9IG5hdHVyYWxMb2dhcml0aG0oYXJnLCBzZCk7XHJcbiAgICAgICAgZGVub21pbmF0b3IgPSBpc0Jhc2UxMCA/IGdldExuMTAoQ3Rvciwgc2QgKyAxMCkgOiBuYXR1cmFsTG9nYXJpdGhtKGJhc2UsIHNkKTtcclxuICAgICAgICByID0gZGl2aWRlKG51bSwgZGVub21pbmF0b3IsIHNkLCAxKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbmYpIHtcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayBmb3IgMTQgbmluZXMgZnJvbSB0aGUgMm5kIHJvdW5kaW5nIGRpZ2l0LCBhcyB0aGUgZmlyc3QgbWF5IGJlIDQuXHJcbiAgICAgICAgICBpZiAoK2RpZ2l0c1RvU3RyaW5nKHIuZCkuc2xpY2UoayArIDEsIGsgKyAxNSkgKyAxID09IDFlMTQpIHtcclxuICAgICAgICAgICAgciA9IGZpbmFsaXNlKHIsIHByICsgMSwgMCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IHdoaWxlIChjaGVja1JvdW5kaW5nRGlnaXRzKHIuZCwgayArPSAxMCwgcm0pKTtcclxuICAgIH1cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHIsIHByLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG1heGltdW0gb2YgdGhlIGFyZ3VtZW50cyBhbmQgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIGFyZ3VtZW50cyB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgUC5tYXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKGFyZ3VtZW50cywgdGhpcyk7XHJcbiAgICByZXR1cm4gbWF4T3JNaW4odGhpcy5jb25zdHJ1Y3RvciwgYXJndW1lbnRzLCAnbHQnKTtcclxuICB9O1xyXG4gICAqL1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbWluaW11bSBvZiB0aGUgYXJndW1lbnRzIGFuZCB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogYXJndW1lbnRzIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICBQLm1pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwoYXJndW1lbnRzLCB0aGlzKTtcclxuICAgIHJldHVybiBtYXhPck1pbih0aGlzLmNvbnN0cnVjdG9yLCBhcmd1bWVudHMsICdndCcpO1xyXG4gIH07XHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBuIC0gMCA9IG5cclxuICAgKiAgbiAtIE4gPSBOXHJcbiAgICogIG4gLSBJID0gLUlcclxuICAgKiAgMCAtIG4gPSAtblxyXG4gICAqICAwIC0gMCA9IDBcclxuICAgKiAgMCAtIE4gPSBOXHJcbiAgICogIDAgLSBJID0gLUlcclxuICAgKiAgTiAtIG4gPSBOXHJcbiAgICogIE4gLSAwID0gTlxyXG4gICAqICBOIC0gTiA9IE5cclxuICAgKiAgTiAtIEkgPSBOXHJcbiAgICogIEkgLSBuID0gSVxyXG4gICAqICBJIC0gMCA9IElcclxuICAgKiAgSSAtIE4gPSBOXHJcbiAgICogIEkgLSBJID0gTlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBtaW51cyBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5taW51cyA9IFAuc3ViID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBkLCBlLCBpLCBqLCBrLCBsZW4sIHByLCBybSwgeGQsIHhlLCB4TFR5LCB5ZCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIHkgPSBuZXcgQ3Rvcih5KTtcclxuXHJcbiAgICAvLyBJZiBlaXRoZXIgaXMgbm90IGZpbml0ZS4uLlxyXG4gICAgaWYgKCF4LmQgfHwgIXkuZCkge1xyXG5cclxuICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgaXMgTmFOLlxyXG4gICAgICBpZiAoIXgucyB8fCAheS5zKSB5ID0gbmV3IEN0b3IoTmFOKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiB5IG5lZ2F0ZWQgaWYgeCBpcyBmaW5pdGUgYW5kIHkgaXMgwrFJbmZpbml0eS5cclxuICAgICAgZWxzZSBpZiAoeC5kKSB5LnMgPSAteS5zO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyBmaW5pdGUgYW5kIHggaXMgwrFJbmZpbml0eS5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgYm90aCBhcmUgwrFJbmZpbml0eSB3aXRoIGRpZmZlcmVudCBzaWducy5cclxuICAgICAgLy8gUmV0dXJuIE5hTiBpZiBib3RoIGFyZSDCsUluZmluaXR5IHdpdGggdGhlIHNhbWUgc2lnbi5cclxuICAgICAgZWxzZSB5ID0gbmV3IEN0b3IoeS5kIHx8IHgucyAhPT0geS5zID8geCA6IE5hTik7XHJcblxyXG4gICAgICByZXR1cm4geTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBzaWducyBkaWZmZXIuLi5cclxuICAgIGlmICh4LnMgIT0geS5zKSB7XHJcbiAgICAgIHkucyA9IC15LnM7XHJcbiAgICAgIHJldHVybiB4LnBsdXMoeSk7XHJcbiAgICB9XHJcblxyXG4gICAgeGQgPSB4LmQ7XHJcbiAgICB5ZCA9IHkuZDtcclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcblxyXG4gICAgLy8gSWYgZWl0aGVyIGlzIHplcm8uLi5cclxuICAgIGlmICgheGRbMF0gfHwgIXlkWzBdKSB7XHJcblxyXG4gICAgICAvLyBSZXR1cm4geSBuZWdhdGVkIGlmIHggaXMgemVybyBhbmQgeSBpcyBub24temVyby5cclxuICAgICAgaWYgKHlkWzBdKSB5LnMgPSAteS5zO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvIGFuZCB4IGlzIG5vbi16ZXJvLlxyXG4gICAgICBlbHNlIGlmICh4ZFswXSkgeSA9IG5ldyBDdG9yKHgpO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgLy8gRnJvbSBJRUVFIDc1NCAoMjAwOCkgNi4zOiAwIC0gMCA9IC0wIC0gLTAgPSAtMCB3aGVuIHJvdW5kaW5nIHRvIC1JbmZpbml0eS5cclxuICAgICAgZWxzZSByZXR1cm4gbmV3IEN0b3Iocm0gPT09IDMgPyAtMCA6IDApO1xyXG5cclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gZmluYWxpc2UoeSwgcHIsIHJtKSA6IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8geCBhbmQgeSBhcmUgZmluaXRlLCBub24temVybyBudW1iZXJzIHdpdGggdGhlIHNhbWUgc2lnbi5cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgYmFzZSAxZTcgZXhwb25lbnRzLlxyXG4gICAgZSA9IG1hdGhmbG9vcih5LmUgLyBMT0dfQkFTRSk7XHJcbiAgICB4ZSA9IG1hdGhmbG9vcih4LmUgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgeGQgPSB4ZC5zbGljZSgpO1xyXG4gICAgayA9IHhlIC0gZTtcclxuXHJcbiAgICAvLyBJZiBiYXNlIDFlNyBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaykge1xyXG4gICAgICB4TFR5ID0gayA8IDA7XHJcblxyXG4gICAgICBpZiAoeExUeSkge1xyXG4gICAgICAgIGQgPSB4ZDtcclxuICAgICAgICBrID0gLWs7XHJcbiAgICAgICAgbGVuID0geWQubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgPSB5ZDtcclxuICAgICAgICBlID0geGU7XHJcbiAgICAgICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1iZXJzIHdpdGggbWFzc2l2ZWx5IGRpZmZlcmVudCBleHBvbmVudHMgd291bGQgcmVzdWx0IGluIGEgdmVyeSBoaWdoIG51bWJlciBvZlxyXG4gICAgICAvLyB6ZXJvcyBuZWVkaW5nIHRvIGJlIHByZXBlbmRlZCwgYnV0IHRoaXMgY2FuIGJlIGF2b2lkZWQgd2hpbGUgc3RpbGwgZW5zdXJpbmcgY29ycmVjdFxyXG4gICAgICAvLyByb3VuZGluZyBieSBsaW1pdGluZyB0aGUgbnVtYmVyIG9mIHplcm9zIHRvIGBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSkgKyAyYC5cclxuICAgICAgaSA9IE1hdGgubWF4KE1hdGguY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDI7XHJcblxyXG4gICAgICBpZiAoayA+IGkpIHtcclxuICAgICAgICBrID0gaTtcclxuICAgICAgICBkLmxlbmd0aCA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLlxyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgICAgZm9yIChpID0gazsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuXHJcbiAgICAvLyBCYXNlIDFlNyBleHBvbmVudHMgZXF1YWwuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gQ2hlY2sgZGlnaXRzIHRvIGRldGVybWluZSB3aGljaCBpcyB0aGUgYmlnZ2VyIG51bWJlci5cclxuXHJcbiAgICAgIGkgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgeExUeSA9IGkgPCBsZW47XHJcbiAgICAgIGlmICh4TFR5KSBsZW4gPSBpO1xyXG5cclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHhkW2ldICE9IHlkW2ldKSB7XHJcbiAgICAgICAgICB4TFR5ID0geGRbaV0gPCB5ZFtpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgayA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHhMVHkpIHtcclxuICAgICAgZCA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IGQ7XHJcbiAgICAgIHkucyA9IC15LnM7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuID0geGQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEFwcGVuZCB6ZXJvcyB0byBgeGRgIGlmIHNob3J0ZXIuXHJcbiAgICAvLyBEb24ndCBhZGQgemVyb3MgdG8gYHlkYCBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0aW9uIG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgYHlkYCBsZW5ndGguXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGggLSBsZW47IGkgPiAwOyAtLWkpIHhkW2xlbisrXSA9IDA7XHJcblxyXG4gICAgLy8gU3VidHJhY3QgeWQgZnJvbSB4ZC5cclxuICAgIGZvciAoaSA9IHlkLmxlbmd0aDsgaSA+IGs7KSB7XHJcblxyXG4gICAgICBpZiAoeGRbLS1pXSA8IHlkW2ldKSB7XHJcbiAgICAgICAgZm9yIChqID0gaTsgaiAmJiB4ZFstLWpdID09PSAwOykgeGRbal0gPSBCQVNFIC0gMTtcclxuICAgICAgICAtLXhkW2pdO1xyXG4gICAgICAgIHhkW2ldICs9IEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhkW2ldIC09IHlkW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyB4ZFstLWxlbl0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgZm9yICg7IHhkWzBdID09PSAwOyB4ZC5zaGlmdCgpKSAtLWU7XHJcblxyXG4gICAgLy8gWmVybz9cclxuICAgIGlmICgheGRbMF0pIHJldHVybiBuZXcgQ3RvcihybSA9PT0gMyA/IC0wIDogMCk7XHJcblxyXG4gICAgeS5kID0geGQ7XHJcbiAgICB5LmUgPSBnZXRCYXNlMTBFeHBvbmVudCh4ZCwgZSk7XHJcblxyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gZmluYWxpc2UoeSwgcHIsIHJtKSA6IHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogICBuICUgMCA9ICBOXHJcbiAgICogICBuICUgTiA9ICBOXHJcbiAgICogICBuICUgSSA9ICBuXHJcbiAgICogICAwICUgbiA9ICAwXHJcbiAgICogIC0wICUgbiA9IC0wXHJcbiAgICogICAwICUgMCA9ICBOXHJcbiAgICogICAwICUgTiA9ICBOXHJcbiAgICogICAwICUgSSA9ICAwXHJcbiAgICogICBOICUgbiA9ICBOXHJcbiAgICogICBOICUgMCA9ICBOXHJcbiAgICogICBOICUgTiA9ICBOXHJcbiAgICogICBOICUgSSA9ICBOXHJcbiAgICogICBJICUgbiA9ICBOXHJcbiAgICogICBJICUgMCA9ICBOXHJcbiAgICogICBJICUgTiA9ICBOXHJcbiAgICogICBJICUgSSA9ICBOXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1vZHVsbyBgeWAsIHJvdW5kZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogVGhlIHJlc3VsdCBkZXBlbmRzIG9uIHRoZSBtb2R1bG8gbW9kZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubW9kdWxvID0gUC5tb2QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHEsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICB5ID0gbmV3IEN0b3IoeSk7XHJcblxyXG4gICAgLy8gUmV0dXJuIE5hTiBpZiB4IGlzIMKxSW5maW5pdHkgb3IgTmFOLCBvciB5IGlzIE5hTiBvciDCsTAuXHJcbiAgICBpZiAoIXguZCB8fCAheS5zIHx8IHkuZCAmJiAheS5kWzBdKSByZXR1cm4gbmV3IEN0b3IoTmFOKTtcclxuXHJcbiAgICAvLyBSZXR1cm4geCBpZiB5IGlzIMKxSW5maW5pdHkgb3IgeCBpcyDCsTAuXHJcbiAgICBpZiAoIXkuZCB8fCB4LmQgJiYgIXguZFswXSkge1xyXG4gICAgICByZXR1cm4gZmluYWxpc2UobmV3IEN0b3IoeCksIEN0b3IucHJlY2lzaW9uLCBDdG9yLnJvdW5kaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcmV2ZW50IHJvdW5kaW5nIG9mIGludGVybWVkaWF0ZSBjYWxjdWxhdGlvbnMuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChDdG9yLm1vZHVsbyA9PSA5KSB7XHJcblxyXG4gICAgICAvLyBFdWNsaWRpYW4gZGl2aXNpb246IHEgPSBzaWduKHkpICogZmxvb3IoeCAvIGFicyh5KSlcclxuICAgICAgLy8gcmVzdWx0ID0geCAtIHEgKiB5ICAgIHdoZXJlICAwIDw9IHJlc3VsdCA8IGFicyh5KVxyXG4gICAgICBxID0gZGl2aWRlKHgsIHkuYWJzKCksIDAsIDMsIDEpO1xyXG4gICAgICBxLnMgKj0geS5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcSA9IGRpdmlkZSh4LCB5LCAwLCBDdG9yLm1vZHVsbywgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcSA9IHEudGltZXMoeSk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB4Lm1pbnVzKHEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogaS5lLiB0aGUgYmFzZSBlIHJhaXNlZCB0byB0aGUgcG93ZXIgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5hdHVyYWxFeHBvbmVudGlhbCA9IFAuZXhwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5hdHVyYWxFeHBvbmVudGlhbCh0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCxcclxuICAgKiByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5hdHVyYWxMb2dhcml0aG0gPSBQLmxuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5hdHVyYWxMb2dhcml0aG0odGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBuZWdhdGVkLCBpLmUuIGFzIGlmIG11bHRpcGxpZWQgYnlcclxuICAgKiAtMS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmVnYXRlZCA9IFAubmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHgucyA9IC14LnM7XHJcbiAgICByZXR1cm4gZmluYWxpc2UoeCk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIG4gKyAwID0gblxyXG4gICAqICBuICsgTiA9IE5cclxuICAgKiAgbiArIEkgPSBJXHJcbiAgICogIDAgKyBuID0gblxyXG4gICAqICAwICsgMCA9IDBcclxuICAgKiAgMCArIE4gPSBOXHJcbiAgICogIDAgKyBJID0gSVxyXG4gICAqICBOICsgbiA9IE5cclxuICAgKiAgTiArIDAgPSBOXHJcbiAgICogIE4gKyBOID0gTlxyXG4gICAqICBOICsgSSA9IE5cclxuICAgKiAgSSArIG4gPSBJXHJcbiAgICogIEkgKyAwID0gSVxyXG4gICAqICBJICsgTiA9IE5cclxuICAgKiAgSSArIEkgPSBJXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHBsdXMgYHlgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAucGx1cyA9IFAuYWRkID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBjYXJyeSwgZCwgZSwgaSwgaywgbGVuLCBwciwgcm0sIHhkLCB5ZCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIHkgPSBuZXcgQ3Rvcih5KTtcclxuXHJcbiAgICAvLyBJZiBlaXRoZXIgaXMgbm90IGZpbml0ZS4uLlxyXG4gICAgaWYgKCF4LmQgfHwgIXkuZCkge1xyXG5cclxuICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgaXMgTmFOLlxyXG4gICAgICBpZiAoIXgucyB8fCAheS5zKSB5ID0gbmV3IEN0b3IoTmFOKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIHkgaXMgZmluaXRlIGFuZCB4IGlzIMKxSW5maW5pdHkuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIGJvdGggYXJlIMKxSW5maW5pdHkgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG4gICAgICAvLyBSZXR1cm4gTmFOIGlmIGJvdGggYXJlIMKxSW5maW5pdHkgd2l0aCBkaWZmZXJlbnQgc2lnbnMuXHJcbiAgICAgIC8vIFJldHVybiB5IGlmIHggaXMgZmluaXRlIGFuZCB5IGlzIMKxSW5maW5pdHkuXHJcbiAgICAgIGVsc2UgaWYgKCF4LmQpIHkgPSBuZXcgQ3Rvcih5LmQgfHwgeC5zID09PSB5LnMgPyB4IDogTmFOKTtcclxuXHJcbiAgICAgIHJldHVybiB5O1xyXG4gICAgfVxyXG5cclxuICAgICAvLyBJZiBzaWducyBkaWZmZXIuLi5cclxuICAgIGlmICh4LnMgIT0geS5zKSB7XHJcbiAgICAgIHkucyA9IC15LnM7XHJcbiAgICAgIHJldHVybiB4Lm1pbnVzKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHhkID0geC5kO1xyXG4gICAgeWQgPSB5LmQ7XHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG5cclxuICAgIC8vIElmIGVpdGhlciBpcyB6ZXJvLi4uXHJcbiAgICBpZiAoIXhkWzBdIHx8ICF5ZFswXSkge1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvLlxyXG4gICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLlxyXG4gICAgICBpZiAoIXlkWzBdKSB5ID0gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgICByZXR1cm4gZXh0ZXJuYWwgPyBmaW5hbGlzZSh5LCBwciwgcm0pIDogeTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB4IGFuZCB5IGFyZSBmaW5pdGUsIG5vbi16ZXJvIG51bWJlcnMgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBiYXNlIDFlNyBleHBvbmVudHMuXHJcbiAgICBrID0gbWF0aGZsb29yKHguZSAvIExPR19CQVNFKTtcclxuICAgIGUgPSBtYXRoZmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGkgPSBrIC0gZTtcclxuXHJcbiAgICAvLyBJZiBiYXNlIDFlNyBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaSkge1xyXG5cclxuICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgZCA9IHhkO1xyXG4gICAgICAgIGkgPSAtaTtcclxuICAgICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IHlkO1xyXG4gICAgICAgIGUgPSBrO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIHplcm9zIHByZXBlbmRlZCB0byBtYXgoY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDEuXHJcbiAgICAgIGsgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGxlbiA9IGsgPiBsZW4gPyBrICsgMSA6IGxlbiArIDE7XHJcblxyXG4gICAgICBpZiAoaSA+IGxlbikge1xyXG4gICAgICAgIGkgPSBsZW47XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gTm90ZTogRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgICBmb3IgKDsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICBpID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIHlkIGlzIGxvbmdlciB0aGFuIHhkLCBzd2FwIHhkIGFuZCB5ZCBzbyB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmIChsZW4gLSBpIDwgMCkge1xyXG4gICAgICBpID0gbGVuO1xyXG4gICAgICBkID0geWQ7XHJcbiAgICAgIHlkID0geGQ7XHJcbiAgICAgIHhkID0gZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IHN0YXJ0IGFkZGluZyBhdCB5ZC5sZW5ndGggLSAxIGFzIHRoZSBmdXJ0aGVyIGRpZ2l0cyBvZiB4ZCBjYW4gYmUgbGVmdCBhcyB0aGV5IGFyZS5cclxuICAgIGZvciAoY2FycnkgPSAwOyBpOykge1xyXG4gICAgICBjYXJyeSA9ICh4ZFstLWldID0geGRbaV0gKyB5ZFtpXSArIGNhcnJ5KSAvIEJBU0UgfCAwO1xyXG4gICAgICB4ZFtpXSAlPSBCQVNFO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXJyeSkge1xyXG4gICAgICB4ZC51bnNoaWZ0KGNhcnJ5KTtcclxuICAgICAgKytlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIHplcm8sIGFzICt4ICsgK3kgIT0gMCAmJiAteCArIC15ICE9IDBcclxuICAgIGZvciAobGVuID0geGQubGVuZ3RoOyB4ZFstLWxlbl0gPT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZ2V0QmFzZTEwRXhwb25lbnQoeGQsIGUpO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IGZpbmFsaXNlKHksIHByLCBybSkgOiB5O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW3pdIHtib29sZWFufG51bWJlcn0gV2hldGhlciB0byBjb3VudCBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3M6IHRydWUsIGZhbHNlLCAxIG9yIDAuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnByZWNpc2lvbiA9IFAuc2QgPSBmdW5jdGlvbiAoeikge1xyXG4gICAgdmFyIGssXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIGlmICh6ICE9PSB2b2lkIDAgJiYgeiAhPT0gISF6ICYmIHogIT09IDEgJiYgeiAhPT0gMCkgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgeik7XHJcblxyXG4gICAgaWYgKHguZCkge1xyXG4gICAgICBrID0gZ2V0UHJlY2lzaW9uKHguZCk7XHJcbiAgICAgIGlmICh6ICYmIHguZSArIDEgPiBrKSBrID0geC5lICsgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGsgPSBOYU47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGs7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgd2hvbGUgbnVtYmVyIHVzaW5nXHJcbiAgICogcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5yb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKG5ldyBDdG9yKHgpLCB4LmUgKyAxLCBDdG9yLnJvdW5kaW5nKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgc2luZSBvZiB0aGUgdmFsdWUgaW4gcmFkaWFucyBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFstSW5maW5pdHksIEluZmluaXR5XVxyXG4gICAqIFJhbmdlOiBbLTEsIDFdXHJcbiAgICpcclxuICAgKiBzaW4oeCkgPSB4IC0geF4zLzMhICsgeF41LzUhIC0gLi4uXHJcbiAgICpcclxuICAgKiBzaW4oMCkgICAgICAgICA9IDBcclxuICAgKiBzaW4oLTApICAgICAgICA9IC0wXHJcbiAgICogc2luKEluZmluaXR5KSAgPSBOYU5cclxuICAgKiBzaW4oLUluZmluaXR5KSA9IE5hTlxyXG4gICAqIHNpbihOYU4pICAgICAgID0gTmFOXHJcbiAgICpcclxuICAgKi9cclxuICBQLnNpbmUgPSBQLnNpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwciwgcm0sXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoIXguaXNGaW5pdGUoKSkgcmV0dXJuIG5ldyBDdG9yKE5hTik7XHJcbiAgICBpZiAoeC5pc1plcm8oKSkgcmV0dXJuIG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByICsgTWF0aC5tYXgoeC5lLCB4LnNkKCkpICsgTE9HX0JBU0U7XHJcbiAgICBDdG9yLnJvdW5kaW5nID0gMTtcclxuXHJcbiAgICB4ID0gc2luZShDdG9yLCB0b0xlc3NUaGFuSGFsZlBpKEN0b3IsIHgpKTtcclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHJtO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZShxdWFkcmFudCA+IDIgPyB4Lm5lZygpIDogeCwgcHIsIHJtLCB0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhpcyBEZWNpbWFsLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqICBzcXJ0KC1uKSA9ICBOXHJcbiAgICogIHNxcnQoTikgID0gIE5cclxuICAgKiAgc3FydCgtSSkgPSAgTlxyXG4gICAqICBzcXJ0KEkpICA9ICBJXHJcbiAgICogIHNxcnQoMCkgID0gIDBcclxuICAgKiAgc3FydCgtMCkgPSAtMFxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5zcXVhcmVSb290ID0gUC5zcXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG0sIG4sIHNkLCByLCByZXAsIHQsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBkID0geC5kLFxyXG4gICAgICBlID0geC5lLFxyXG4gICAgICBzID0geC5zLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAvLyBOZWdhdGl2ZS9OYU4vSW5maW5pdHkvemVybz9cclxuICAgIGlmIChzICE9PSAxIHx8ICFkIHx8ICFkWzBdKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ3RvcighcyB8fCBzIDwgMCAmJiAoIWQgfHwgZFswXSkgPyBOYU4gOiBkID8geCA6IDEgLyAwKTtcclxuICAgIH1cclxuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICBzID0gTWF0aC5zcXJ0KCt4KTtcclxuXHJcbiAgICAvLyBNYXRoLnNxcnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICBuID0gZGlnaXRzVG9TdHJpbmcoZCk7XHJcblxyXG4gICAgICBpZiAoKG4ubGVuZ3RoICsgZSkgJSAyID09IDApIG4gKz0gJzAnO1xyXG4gICAgICBzID0gTWF0aC5zcXJ0KG4pO1xyXG4gICAgICBlID0gbWF0aGZsb29yKChlICsgMSkgLyAyKSAtIChlIDwgMCB8fCBlICUgMik7XHJcblxyXG4gICAgICBpZiAocyA9PSAxIC8gMCkge1xyXG4gICAgICAgIG4gPSAnMWUnICsgZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuID0gcy50b0V4cG9uZW50aWFsKCk7XHJcbiAgICAgICAgbiA9IG4uc2xpY2UoMCwgbi5pbmRleE9mKCdlJykgKyAxKSArIGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHIgPSBuZXcgQ3RvcihuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHIgPSBuZXcgQ3RvcihzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNkID0gKGUgPSBDdG9yLnByZWNpc2lvbikgKyAzO1xyXG5cclxuICAgIC8vIE5ld3Rvbi1SYXBoc29uIGl0ZXJhdGlvbi5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgdCA9IHI7XHJcbiAgICAgIHIgPSB0LnBsdXMoZGl2aWRlKHgsIHQsIHNkICsgMiwgMSkpLnRpbWVzKDAuNSk7XHJcblxyXG4gICAgICAvLyBUT0RPPyBSZXBsYWNlIHdpdGggZm9yLWxvb3AgYW5kIGNoZWNrUm91bmRpbmdEaWdpdHMuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHNkKSA9PT0gKG4gPSBkaWdpdHNUb1N0cmluZyhyLmQpKS5zbGljZSgwLCBzZCkpIHtcclxuICAgICAgICBuID0gbi5zbGljZShzZCAtIDMsIHNkICsgMSk7XHJcblxyXG4gICAgICAgIC8vIFRoZSA0dGggcm91bmRpbmcgZGlnaXQgbWF5IGJlIGluIGVycm9yIGJ5IC0xIHNvIGlmIHRoZSA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgOTk5OSBvclxyXG4gICAgICAgIC8vIDQ5OTksIGkuZS4gYXBwcm9hY2hpbmcgYSByb3VuZGluZyBib3VuZGFyeSwgY29udGludWUgdGhlIGl0ZXJhdGlvbi5cclxuICAgICAgICBpZiAobiA9PSAnOTk5OScgfHwgIXJlcCAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZSBleGFjdCByZXN1bHQgYXMgdGhlXHJcbiAgICAgICAgICAvLyBuaW5lcyBtYXkgaW5maW5pdGVseSByZXBlYXQuXHJcbiAgICAgICAgICBpZiAoIXJlcCkge1xyXG4gICAgICAgICAgICBmaW5hbGlzZSh0LCBlICsgMSwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodC50aW1lcyh0KS5lcSh4KSkge1xyXG4gICAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2QgKz0gNDtcclxuICAgICAgICAgIHJlcCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgcm91bmRpbmcgZGlnaXRzIGFyZSBudWxsLCAwezAsNH0gb3IgNTB7MCwzfSwgY2hlY2sgZm9yIGFuIGV4YWN0IHJlc3VsdC5cclxuICAgICAgICAgIC8vIElmIG5vdCwgdGhlbiB0aGVyZSBhcmUgZnVydGhlciBkaWdpdHMgYW5kIG0gd2lsbCBiZSB0cnV0aHkuXHJcbiAgICAgICAgICBpZiAoIStuIHx8ICErbi5zbGljZSgxKSAmJiBuLmNoYXJBdCgwKSA9PSAnNScpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRydW5jYXRlIHRvIHRoZSBmaXJzdCByb3VuZGluZyBkaWdpdC5cclxuICAgICAgICAgICAgZmluYWxpc2UociwgZSArIDEsIDEpO1xyXG4gICAgICAgICAgICBtID0gIXIudGltZXMocikuZXEoeCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZShyLCBlLCBDdG9yLnJvdW5kaW5nLCBtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdGFuZ2VudCBvZiB0aGUgdmFsdWUgaW4gcmFkaWFucyBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBEb21haW46IFstSW5maW5pdHksIEluZmluaXR5XVxyXG4gICAqIFJhbmdlOiBbLUluZmluaXR5LCBJbmZpbml0eV1cclxuICAgKlxyXG4gICAqIHRhbigwKSAgICAgICAgID0gMFxyXG4gICAqIHRhbigtMCkgICAgICAgID0gLTBcclxuICAgKiB0YW4oSW5maW5pdHkpICA9IE5hTlxyXG4gICAqIHRhbigtSW5maW5pdHkpID0gTmFOXHJcbiAgICogdGFuKE5hTikgICAgICAgPSBOYU5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudGFuZ2VudCA9IFAudGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByLCBybSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmICgheC5pc0Zpbml0ZSgpKSByZXR1cm4gbmV3IEN0b3IoTmFOKTtcclxuICAgIGlmICh4LmlzWmVybygpKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIEN0b3IucHJlY2lzaW9uID0gcHIgKyAxMDtcclxuICAgIEN0b3Iucm91bmRpbmcgPSAxO1xyXG5cclxuICAgIHggPSB4LnNpbigpO1xyXG4gICAgeC5zID0gMTtcclxuICAgIHggPSBkaXZpZGUoeCwgbmV3IEN0b3IoMSkubWludXMoeC50aW1lcyh4KSkuc3FydCgpLCBwciArIDEwLCAwKTtcclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHJtO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZShxdWFkcmFudCA9PSAyIHx8IHF1YWRyYW50ID09IDQgPyB4Lm5lZygpIDogeCwgcHIsIHJtLCB0cnVlKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgbiAqIDAgPSAwXHJcbiAgICogIG4gKiBOID0gTlxyXG4gICAqICBuICogSSA9IElcclxuICAgKiAgMCAqIG4gPSAwXHJcbiAgICogIDAgKiAwID0gMFxyXG4gICAqICAwICogTiA9IE5cclxuICAgKiAgMCAqIEkgPSBOXHJcbiAgICogIE4gKiBuID0gTlxyXG4gICAqICBOICogMCA9IE5cclxuICAgKiAgTiAqIE4gPSBOXHJcbiAgICogIE4gKiBJID0gTlxyXG4gICAqICBJICogbiA9IElcclxuICAgKiAgSSAqIDAgPSBOXHJcbiAgICogIEkgKiBOID0gTlxyXG4gICAqICBJICogSSA9IElcclxuICAgKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoaXMgRGVjaW1hbCB0aW1lcyBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50aW1lcyA9IFAubXVsID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBjYXJyeSwgZSwgaSwgaywgciwgckwsIHQsIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICB5ZCA9ICh5ID0gbmV3IEN0b3IoeSkpLmQ7XHJcblxyXG4gICAgeS5zICo9IHgucztcclxuXHJcbiAgICAgLy8gSWYgZWl0aGVyIGlzIE5hTiwgwrFJbmZpbml0eSBvciDCsTAuLi5cclxuICAgIGlmICgheGQgfHwgIXhkWzBdIHx8ICF5ZCB8fCAheWRbMF0pIHtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgQ3RvcigheS5zIHx8IHhkICYmICF4ZFswXSAmJiAheWQgfHwgeWQgJiYgIXlkWzBdICYmICF4ZFxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBpcyBOYU4uXHJcbiAgICAgICAgLy8gUmV0dXJuIE5hTiBpZiB4IGlzIMKxMCBhbmQgeSBpcyDCsUluZmluaXR5LCBvciB5IGlzIMKxMCBhbmQgeCBpcyDCsUluZmluaXR5LlxyXG4gICAgICAgID8gTmFOXHJcblxyXG4gICAgICAgIC8vIFJldHVybiDCsUluZmluaXR5IGlmIGVpdGhlciBpcyDCsUluZmluaXR5LlxyXG4gICAgICAgIC8vIFJldHVybiDCsTAgaWYgZWl0aGVyIGlzIMKxMC5cclxuICAgICAgICA6ICF4ZCB8fCAheWQgPyB5LnMgLyAwIDogeS5zICogMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZSA9IG1hdGhmbG9vcih4LmUgLyBMT0dfQkFTRSkgKyBtYXRoZmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgeGRMID0geGQubGVuZ3RoO1xyXG4gICAgeWRMID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEVuc3VyZSB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmICh4ZEwgPCB5ZEwpIHtcclxuICAgICAgciA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IHI7XHJcbiAgICAgIHJMID0geGRMO1xyXG4gICAgICB4ZEwgPSB5ZEw7XHJcbiAgICAgIHlkTCA9IHJMO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgciA9IFtdO1xyXG4gICAgckwgPSB4ZEwgKyB5ZEw7XHJcbiAgICBmb3IgKGkgPSByTDsgaS0tOykgci5wdXNoKDApO1xyXG5cclxuICAgIC8vIE11bHRpcGx5IVxyXG4gICAgZm9yIChpID0geWRMOyAtLWkgPj0gMDspIHtcclxuICAgICAgY2FycnkgPSAwO1xyXG4gICAgICBmb3IgKGsgPSB4ZEwgKyBpOyBrID4gaTspIHtcclxuICAgICAgICB0ID0gcltrXSArIHlkW2ldICogeGRbayAtIGkgLSAxXSArIGNhcnJ5O1xyXG4gICAgICAgIHJbay0tXSA9IHQgJSBCQVNFIHwgMDtcclxuICAgICAgICBjYXJyeSA9IHQgLyBCQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcltrXSA9IChyW2tdICsgY2FycnkpICUgQkFTRSB8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7ICFyWy0tckxdOykgci5wb3AoKTtcclxuXHJcbiAgICBpZiAoY2FycnkpICsrZTtcclxuICAgIGVsc2Ugci5zaGlmdCgpO1xyXG5cclxuICAgIHkuZCA9IHI7XHJcbiAgICB5LmUgPSBnZXRCYXNlMTBFeHBvbmVudChyLCBlKTtcclxuXHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyBmaW5hbGlzZSh5LCBDdG9yLnByZWNpc2lvbiwgQ3Rvci5yb3VuZGluZykgOiB5O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBiYXNlIDIsIHJvdW5kIHRvIGBzZGAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIG9wdGlvbmFsIGBzZGAgYXJndW1lbnQgaXMgcHJlc2VudCB0aGVuIHJldHVybiBiaW5hcnkgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvQmluYXJ5ID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgcmV0dXJuIHRvU3RyaW5nQmluYXJ5KHRoaXMsIDIsIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgZHBgXHJcbiAgICogZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogSWYgYGRwYCBpcyBvbWl0dGVkLCByZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRGVjaW1hbFBsYWNlcyA9IFAudG9EUCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB4O1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZSh4LCBkcCArIHguZSArIDEsIHJtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gZXhwb25lbnRpYWwgbm90YXRpb24gcm91bmRlZCB0b1xyXG4gICAqIGBkcGAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRXhwb25lbnRpYWwgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgc3RyLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHtcclxuICAgICAgc3RyID0gZmluaXRlVG9TdHJpbmcoeCwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgICB4ID0gZmluYWxpc2UobmV3IEN0b3IoeCksIGRwICsgMSwgcm0pO1xyXG4gICAgICBzdHIgPSBmaW5pdGVUb1N0cmluZyh4LCB0cnVlLCBkcCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4LmlzTmVnKCkgJiYgIXguaXNaZXJvKCkgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGluIG5vcm1hbCAoZml4ZWQtcG9pbnQpIG5vdGF0aW9uIHRvXHJcbiAgICogYGRwYCBmaXhlZCBkZWNpbWFsIHBsYWNlcyBhbmQgcm91bmRlZCB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgb3IgYHJvdW5kaW5nYCBpZiBgcm1gIGlzXHJcbiAgICogb21pdHRlZC5cclxuICAgKlxyXG4gICAqIEFzIHdpdGggSmF2YVNjcmlwdCBudW1iZXJzLCAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLCBidXQgZS5nLiAoLTAuMDAwMDEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogKC0wKS50b0ZpeGVkKDApIGlzICcwJywgYnV0ICgtMC4xKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICogKC0wKS50b0ZpeGVkKDEpIGlzICcwLjAnLCBidXQgKC0wLjAxKS50b0ZpeGVkKDEpIGlzICctMC4wJy5cclxuICAgKiAoLTApLnRvRml4ZWQoMykgaXMgJzAuMDAwJy5cclxuICAgKiAoLTAuNSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ZpeGVkID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHN0ciwgeSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHN0ciA9IGZpbml0ZVRvU3RyaW5nKHgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgICAgeSA9IGZpbmFsaXNlKG5ldyBDdG9yKHgpLCBkcCArIHguZSArIDEsIHJtKTtcclxuICAgICAgc3RyID0gZmluaXRlVG9TdHJpbmcoeSwgZmFsc2UsIGRwICsgeS5lICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gYWRkIHRoZSBtaW51cyBzaWduIGxvb2sgYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCB3YXMgcm91bmRlZCxcclxuICAgIC8vIGkuZS4gbG9vayBhdCBgeGAgcmF0aGVyIHRoYW4gYHlgLlxyXG4gICAgcmV0dXJuIHguaXNOZWcoKSAmJiAheC5pc1plcm8oKSA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgYXMgYSBzaW1wbGUgZnJhY3Rpb24gd2l0aCBhbiBpbnRlZ2VyXHJcbiAgICogbnVtZXJhdG9yIGFuZCBhbiBpbnRlZ2VyIGRlbm9taW5hdG9yLlxyXG4gICAqXHJcbiAgICogVGhlIGRlbm9taW5hdG9yIHdpbGwgYmUgYSBwb3NpdGl2ZSBub24temVybyB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBtYXhpbXVtXHJcbiAgICogZGVub21pbmF0b3IuIElmIGEgbWF4aW11bSBkZW5vbWluYXRvciBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgZGVub21pbmF0b3Igd2lsbCBiZSB0aGUgbG93ZXN0XHJcbiAgICogdmFsdWUgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgbnVtYmVyIGV4YWN0bHkuXHJcbiAgICpcclxuICAgKiBbbWF4RF0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gTWF4aW11bSBkZW5vbWluYXRvci4gSW50ZWdlciA+PSAxIGFuZCA8IEluZmluaXR5LlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ZyYWN0aW9uID0gZnVuY3Rpb24gKG1heEQpIHtcclxuICAgIHZhciBkLCBkMCwgZDEsIGQyLCBlLCBrLCBuLCBuMCwgbjEsIHByLCBxLCByLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgeGQgPSB4LmQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmICgheGQpIHJldHVybiBuZXcgQ3Rvcih4KTtcclxuXHJcbiAgICBuMSA9IGQwID0gbmV3IEN0b3IoMSk7XHJcbiAgICBkMSA9IG4wID0gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgZCA9IG5ldyBDdG9yKGQxKTtcclxuICAgIGUgPSBkLmUgPSBnZXRQcmVjaXNpb24oeGQpIC0geC5lIC0gMTtcclxuICAgIGsgPSBlICUgTE9HX0JBU0U7XHJcbiAgICBkLmRbMF0gPSBtYXRocG93KDEwLCBrIDwgMCA/IExPR19CQVNFICsgayA6IGspO1xyXG5cclxuICAgIGlmIChtYXhEID09IG51bGwpIHtcclxuXHJcbiAgICAgIC8vIGQgaXMgMTAqKmUsIHRoZSBtaW5pbXVtIG1heC1kZW5vbWluYXRvciBuZWVkZWQuXHJcbiAgICAgIG1heEQgPSBlID4gMCA/IGQgOiBuMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG4gPSBuZXcgQ3RvcihtYXhEKTtcclxuICAgICAgaWYgKCFuLmlzSW50KCkgfHwgbi5sdChuMSkpIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIG4pO1xyXG4gICAgICBtYXhEID0gbi5ndChkKSA/IChlID4gMCA/IGQgOiBuMSkgOiBuO1xyXG4gICAgfVxyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICBuID0gbmV3IEN0b3IoZGlnaXRzVG9TdHJpbmcoeGQpKTtcclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IGUgPSB4ZC5sZW5ndGggKiBMT0dfQkFTRSAqIDI7XHJcblxyXG4gICAgZm9yICg7OykgIHtcclxuICAgICAgcSA9IGRpdmlkZShuLCBkLCAwLCAxLCAxKTtcclxuICAgICAgZDIgPSBkMC5wbHVzKHEudGltZXMoZDEpKTtcclxuICAgICAgaWYgKGQyLmNtcChtYXhEKSA9PSAxKSBicmVhaztcclxuICAgICAgZDAgPSBkMTtcclxuICAgICAgZDEgPSBkMjtcclxuICAgICAgZDIgPSBuMTtcclxuICAgICAgbjEgPSBuMC5wbHVzKHEudGltZXMoZDIpKTtcclxuICAgICAgbjAgPSBkMjtcclxuICAgICAgZDIgPSBkO1xyXG4gICAgICBkID0gbi5taW51cyhxLnRpbWVzKGQyKSk7XHJcbiAgICAgIG4gPSBkMjtcclxuICAgIH1cclxuXHJcbiAgICBkMiA9IGRpdmlkZShtYXhELm1pbnVzKGQwKSwgZDEsIDAsIDEsIDEpO1xyXG4gICAgbjAgPSBuMC5wbHVzKGQyLnRpbWVzKG4xKSk7XHJcbiAgICBkMCA9IGQwLnBsdXMoZDIudGltZXMoZDEpKTtcclxuICAgIG4wLnMgPSBuMS5zID0geC5zO1xyXG5cclxuICAgIC8vIERldGVybWluZSB3aGljaCBmcmFjdGlvbiBpcyBjbG9zZXIgdG8geCwgbjAvZDAgb3IgbjEvZDE/XHJcbiAgICByID0gZGl2aWRlKG4xLCBkMSwgZSwgMSkubWludXMoeCkuYWJzKCkuY21wKGRpdmlkZShuMCwgZDAsIGUsIDEpLm1pbnVzKHgpLmFicygpKSA8IDFcclxuICAgICAgICA/IFtuMSwgZDFdIDogW24wLCBkMF07XHJcblxyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gYmFzZSAxNiwgcm91bmQgdG8gYHNkYCBzaWduaWZpY2FudFxyXG4gICAqIGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgb3B0aW9uYWwgYHNkYCBhcmd1bWVudCBpcyBwcmVzZW50IHRoZW4gcmV0dXJuIGJpbmFyeSBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9IZXhhZGVjaW1hbCA9IFAudG9IZXggPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICByZXR1cm4gdG9TdHJpbmdCaW5hcnkodGhpcywgMTYsIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybnMgYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmVhcmVzdCBtdWx0aXBsZSBvZiBgeWAgaW4gdGhlIGRpcmVjdGlvbiBvZiByb3VuZGluZ1xyXG4gICAqIG1vZGUgYHJtYCwgb3IgYERlY2ltYWwucm91bmRpbmdgIGlmIGBybWAgaXMgb21pdHRlZCwgdG8gdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHdheXMgaGF2ZSB0aGUgc2FtZSBzaWduIGFzIHRoaXMgRGVjaW1hbCwgdW5sZXNzIGVpdGhlciB0aGlzIERlY2ltYWxcclxuICAgKiBvciBgeWAgaXMgTmFOLCBpbiB3aGljaCBjYXNlIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSBhbHNvIGJlIE5hTi5cclxuICAgKlxyXG4gICAqIFRoZSByZXR1cm4gdmFsdWUgaXMgbm90IGFmZmVjdGVkIGJ5IHRoZSB2YWx1ZSBvZiBgcHJlY2lzaW9uYC5cclxuICAgKlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIG1hZ25pdHVkZSB0byByb3VuZCB0byBhIG11bHRpcGxlIG9mLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqICd0b05lYXJlc3QoKSByb3VuZGluZyBtb2RlIG5vdCBhbiBpbnRlZ2VyOiB7cm19J1xyXG4gICAqICd0b05lYXJlc3QoKSByb3VuZGluZyBtb2RlIG91dCBvZiByYW5nZToge3JtfSdcclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9OZWFyZXN0ID0gZnVuY3Rpb24gKHksIHJtKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIHggPSBuZXcgQ3Rvcih4KTtcclxuXHJcbiAgICBpZiAoeSA9PSBudWxsKSB7XHJcblxyXG4gICAgICAvLyBJZiB4IGlzIG5vdCBmaW5pdGUsIHJldHVybiB4LlxyXG4gICAgICBpZiAoIXguZCkgcmV0dXJuIHg7XHJcblxyXG4gICAgICB5ID0gbmV3IEN0b3IoMSk7XHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHkgPSBuZXcgQ3Rvcih5KTtcclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHtcclxuICAgICAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHggaXMgbm90IGZpbml0ZSwgcmV0dXJuIHggaWYgeSBpcyBub3QgTmFOLCBlbHNlIE5hTi5cclxuICAgICAgaWYgKCF4LmQpIHJldHVybiB5LnMgPyB4IDogeTtcclxuXHJcbiAgICAgIC8vIElmIHkgaXMgbm90IGZpbml0ZSwgcmV0dXJuIEluZmluaXR5IHdpdGggdGhlIHNpZ24gb2YgeCBpZiB5IGlzIEluZmluaXR5LCBlbHNlIE5hTi5cclxuICAgICAgaWYgKCF5LmQpIHtcclxuICAgICAgICBpZiAoeS5zKSB5LnMgPSB4LnM7XHJcbiAgICAgICAgcmV0dXJuIHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB5IGlzIG5vdCB6ZXJvLCBjYWxjdWxhdGUgdGhlIG5lYXJlc3QgbXVsdGlwbGUgb2YgeSB0byB4LlxyXG4gICAgaWYgKHkuZFswXSkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB4ID0gZGl2aWRlKHgsIHksIDAsIHJtLCAxKS50aW1lcyh5KTtcclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICBmaW5hbGlzZSh4KTtcclxuXHJcbiAgICAvLyBJZiB5IGlzIHplcm8sIHJldHVybiB6ZXJvIHdpdGggdGhlIHNpZ24gb2YgeC5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHkucyA9IHgucztcclxuICAgICAgeCA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgY29udmVydGVkIHRvIGEgbnVtYmVyIHByaW1pdGl2ZS5cclxuICAgKiBaZXJvIGtlZXBzIGl0cyBzaWduLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiArdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gYmFzZSA4LCByb3VuZCB0byBgc2RgIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYC5cclxuICAgKlxyXG4gICAqIElmIHRoZSBvcHRpb25hbCBgc2RgIGFyZ3VtZW50IGlzIHByZXNlbnQgdGhlbiByZXR1cm4gYmluYXJ5IGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAqXHJcbiAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b09jdGFsID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgcmV0dXJuIHRvU3RyaW5nQmluYXJ5KHRoaXMsIDgsIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByYWlzZWQgdG8gdGhlIHBvd2VyIGB5YCwgcm91bmRlZFxyXG4gICAqIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBFQ01BU2NyaXB0IGNvbXBsaWFudC5cclxuICAgKlxyXG4gICAqICAgcG93KHgsIE5hTikgICAgICAgICAgICAgICAgICAgICAgICAgICA9IE5hTlxyXG4gICAqICAgcG93KHgsIMKxMCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSAxXHJcblxyXG4gICAqICAgcG93KE5hTiwgbm9uLXplcm8pICAgICAgICAgICAgICAgICAgICA9IE5hTlxyXG4gICAqICAgcG93KGFicyh4KSA+IDEsICtJbmZpbml0eSkgICAgICAgICAgICA9ICtJbmZpbml0eVxyXG4gICAqICAgcG93KGFicyh4KSA+IDEsIC1JbmZpbml0eSkgICAgICAgICAgICA9ICswXHJcbiAgICogICBwb3coYWJzKHgpID09IDEsIMKxSW5maW5pdHkpICAgICAgICAgICA9IE5hTlxyXG4gICAqICAgcG93KGFicyh4KSA8IDEsICtJbmZpbml0eSkgICAgICAgICAgICA9ICswXHJcbiAgICogICBwb3coYWJzKHgpIDwgMSwgLUluZmluaXR5KSAgICAgICAgICAgID0gK0luZmluaXR5XHJcbiAgICogICBwb3coK0luZmluaXR5LCB5ID4gMCkgICAgICAgICAgICAgICAgID0gK0luZmluaXR5XHJcbiAgICogICBwb3coK0luZmluaXR5LCB5IDwgMCkgICAgICAgICAgICAgICAgID0gKzBcclxuICAgKiAgIHBvdygtSW5maW5pdHksIG9kZCBpbnRlZ2VyID4gMCkgICAgICAgPSAtSW5maW5pdHlcclxuICAgKiAgIHBvdygtSW5maW5pdHksIGV2ZW4gaW50ZWdlciA+IDApICAgICAgPSArSW5maW5pdHlcclxuICAgKiAgIHBvdygtSW5maW5pdHksIG9kZCBpbnRlZ2VyIDwgMCkgICAgICAgPSAtMFxyXG4gICAqICAgcG93KC1JbmZpbml0eSwgZXZlbiBpbnRlZ2VyIDwgMCkgICAgICA9ICswXHJcbiAgICogICBwb3coKzAsIHkgPiAwKSAgICAgICAgICAgICAgICAgICAgICAgID0gKzBcclxuICAgKiAgIHBvdygrMCwgeSA8IDApICAgICAgICAgICAgICAgICAgICAgICAgPSArSW5maW5pdHlcclxuICAgKiAgIHBvdygtMCwgb2RkIGludGVnZXIgPiAwKSAgICAgICAgICAgICAgPSAtMFxyXG4gICAqICAgcG93KC0wLCBldmVuIGludGVnZXIgPiAwKSAgICAgICAgICAgICA9ICswXHJcbiAgICogICBwb3coLTAsIG9kZCBpbnRlZ2VyIDwgMCkgICAgICAgICAgICAgID0gLUluZmluaXR5XHJcbiAgICogICBwb3coLTAsIGV2ZW4gaW50ZWdlciA8IDApICAgICAgICAgICAgID0gK0luZmluaXR5XHJcbiAgICogICBwb3coZmluaXRlIHggPCAwLCBmaW5pdGUgbm9uLWludGVnZXIpID0gTmFOXHJcbiAgICpcclxuICAgKiBGb3Igbm9uLWludGVnZXIgb3IgdmVyeSBsYXJnZSBleHBvbmVudHMgcG93KHgsIHkpIGlzIGNhbGN1bGF0ZWQgdXNpbmdcclxuICAgKlxyXG4gICAqICAgeF55ID0gZXhwKHkqbG4oeCkpXHJcbiAgICpcclxuICAgKiBBc3N1bWluZyB0aGUgZmlyc3QgMTUgcm91bmRpbmcgZGlnaXRzIGFyZSBlYWNoIGVxdWFsbHkgbGlrZWx5IHRvIGJlIGFueSBkaWdpdCAwLTksIHRoZVxyXG4gICAqIHByb2JhYmlsaXR5IG9mIGFuIGluY29ycmVjdGx5IHJvdW5kZWQgcmVzdWx0XHJcbiAgICogUChbNDldOXsxNH0gfCBbNTBdMHsxNH0pID0gMiAqIDAuMiAqIDEwXi0xNCA9IDRlLTE1ID0gMS8yLjVlKzE0XHJcbiAgICogaS5lLiAxIGluIDI1MCwwMDAsMDAwLDAwMCwwMDBcclxuICAgKlxyXG4gICAqIElmIGEgcmVzdWx0IGlzIGluY29ycmVjdGx5IHJvdW5kZWQgdGhlIG1heGltdW0gZXJyb3Igd2lsbCBiZSAxIHVscCAodW5pdCBpbiBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIHBvd2VyIHRvIHdoaWNoIHRvIHJhaXNlIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9Qb3dlciA9IFAucG93ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBlLCBrLCBwciwgciwgcm0sIHMsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgeW4gPSArKHkgPSBuZXcgQ3Rvcih5KSk7XHJcblxyXG4gICAgLy8gRWl0aGVyIMKxSW5maW5pdHksIE5hTiBvciDCsTA/XHJcbiAgICBpZiAoIXguZCB8fCAheS5kIHx8ICF4LmRbMF0gfHwgIXkuZFswXSkgcmV0dXJuIG5ldyBDdG9yKG1hdGhwb3coK3gsIHluKSk7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIGlmICh4LmVxKDEpKSByZXR1cm4geDtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG5cclxuICAgIGlmICh5LmVxKDEpKSByZXR1cm4gZmluYWxpc2UoeCwgcHIsIHJtKTtcclxuXHJcbiAgICAvLyB5IGV4cG9uZW50XHJcbiAgICBlID0gbWF0aGZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuXHJcbiAgICAvLyBJZiB5IGlzIGEgc21hbGwgaW50ZWdlciB1c2UgdGhlICdleHBvbmVudGlhdGlvbiBieSBzcXVhcmluZycgYWxnb3JpdGhtLlxyXG4gICAgaWYgKGUgPj0geS5kLmxlbmd0aCAtIDEgJiYgKGsgPSB5biA8IDAgPyAteW4gOiB5bikgPD0gTUFYX1NBRkVfSU5URUdFUikge1xyXG4gICAgICByID0gaW50UG93KEN0b3IsIHgsIGssIHByKTtcclxuICAgICAgcmV0dXJuIHkucyA8IDAgPyBuZXcgQ3RvcigxKS5kaXYocikgOiBmaW5hbGlzZShyLCBwciwgcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHMgPSB4LnM7XHJcblxyXG4gICAgLy8gaWYgeCBpcyBuZWdhdGl2ZVxyXG4gICAgaWYgKHMgPCAwKSB7XHJcblxyXG4gICAgICAvLyBpZiB5IGlzIG5vdCBhbiBpbnRlZ2VyXHJcbiAgICAgIGlmIChlIDwgeS5kLmxlbmd0aCAtIDEpIHJldHVybiBuZXcgQ3RvcihOYU4pO1xyXG5cclxuICAgICAgLy8gUmVzdWx0IGlzIHBvc2l0aXZlIGlmIHggaXMgbmVnYXRpdmUgYW5kIHRoZSBsYXN0IGRpZ2l0IG9mIGludGVnZXIgeSBpcyBldmVuLlxyXG4gICAgICBpZiAoKHkuZFtlXSAmIDEpID09IDApIHMgPSAxO1xyXG5cclxuICAgICAgLy8gaWYgeC5lcSgtMSlcclxuICAgICAgaWYgKHguZSA9PSAwICYmIHguZFswXSA9PSAxICYmIHguZC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIHgucyA9IHM7XHJcbiAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBFc3RpbWF0ZSByZXN1bHQgZXhwb25lbnQuXHJcbiAgICAvLyB4XnkgPSAxMF5lLCAgd2hlcmUgZSA9IHkgKiBsb2cxMCh4KVxyXG4gICAgLy8gbG9nMTAoeCkgPSBsb2cxMCh4X3NpZ25pZmljYW5kKSArIHhfZXhwb25lbnRcclxuICAgIC8vIGxvZzEwKHhfc2lnbmlmaWNhbmQpID0gbG4oeF9zaWduaWZpY2FuZCkgLyBsbigxMClcclxuICAgIGsgPSBtYXRocG93KCt4LCB5bik7XHJcbiAgICBlID0gayA9PSAwIHx8ICFpc0Zpbml0ZShrKVxyXG4gICAgICA/IG1hdGhmbG9vcih5biAqIChNYXRoLmxvZygnMC4nICsgZGlnaXRzVG9TdHJpbmcoeC5kKSkgLyBNYXRoLkxOMTAgKyB4LmUgKyAxKSlcclxuICAgICAgOiBuZXcgQ3RvcihrICsgJycpLmU7XHJcblxyXG4gICAgLy8gRXhwb25lbnQgZXN0aW1hdGUgbWF5IGJlIGluY29ycmVjdCBlLmcuIHg6IDAuOTk5OTk5OTk5OTk5OTk5OTk5LCB5OiAyLjI5LCBlOiAwLCByLmU6IC0xLlxyXG5cclxuICAgIC8vIE92ZXJmbG93L3VuZGVyZmxvdz9cclxuICAgIGlmIChlID4gQ3Rvci5tYXhFICsgMSB8fCBlIDwgQ3Rvci5taW5FIC0gMSkgcmV0dXJuIG5ldyBDdG9yKGUgPiAwID8gcyAvIDAgOiAwKTtcclxuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHgucyA9IDE7XHJcblxyXG4gICAgLy8gRXN0aW1hdGUgdGhlIGV4dHJhIGd1YXJkIGRpZ2l0cyBuZWVkZWQgdG8gZW5zdXJlIGZpdmUgY29ycmVjdCByb3VuZGluZyBkaWdpdHMgZnJvbVxyXG4gICAgLy8gbmF0dXJhbExvZ2FyaXRobSh4KS4gRXhhbXBsZSBvZiBmYWlsdXJlIHdpdGhvdXQgdGhlc2UgZXh0cmEgZGlnaXRzIChwcmVjaXNpb246IDEwKTpcclxuICAgIC8vIG5ldyBEZWNpbWFsKDIuMzI0NTYpLnBvdygnMjA4Nzk4NzQzNjUzNDU2Ni40NjQxMScpXHJcbiAgICAvLyBzaG91bGQgYmUgMS4xNjIzNzc4MjNlKzc2NDkxNDkwNTE3MzgxNSwgYnV0IGlzIDEuMTYyMzU1ODIzZSs3NjQ5MTQ5MDUxNzM4MTVcclxuICAgIGsgPSBNYXRoLm1pbigxMiwgKGUgKyAnJykubGVuZ3RoKTtcclxuXHJcbiAgICAvLyByID0geF55ID0gZXhwKHkqbG4oeCkpXHJcbiAgICByID0gbmF0dXJhbEV4cG9uZW50aWFsKHkudGltZXMobmF0dXJhbExvZ2FyaXRobSh4LCBwciArIGspKSwgcHIpO1xyXG5cclxuICAgIC8vIHIgbWF5IGJlIEluZmluaXR5LCBlLmcuICgwLjk5OTk5OTk5OTk5OTk5OTkpLnBvdygtMWUrNDApXHJcbiAgICBpZiAoci5kKSB7XHJcblxyXG4gICAgICAvLyBUcnVuY2F0ZSB0byB0aGUgcmVxdWlyZWQgcHJlY2lzaW9uIHBsdXMgZml2ZSByb3VuZGluZyBkaWdpdHMuXHJcbiAgICAgIHIgPSBmaW5hbGlzZShyLCBwciArIDUsIDEpO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIHJvdW5kaW5nIGRpZ2l0cyBhcmUgWzQ5XTk5OTkgb3IgWzUwXTAwMDAgaW5jcmVhc2UgdGhlIHByZWNpc2lvbiBieSAxMCBhbmQgcmVjYWxjdWxhdGVcclxuICAgICAgLy8gdGhlIHJlc3VsdC5cclxuICAgICAgaWYgKGNoZWNrUm91bmRpbmdEaWdpdHMoci5kLCBwciwgcm0pKSB7XHJcbiAgICAgICAgZSA9IHByICsgMTA7XHJcblxyXG4gICAgICAgIC8vIFRydW5jYXRlIHRvIHRoZSBpbmNyZWFzZWQgcHJlY2lzaW9uIHBsdXMgZml2ZSByb3VuZGluZyBkaWdpdHMuXHJcbiAgICAgICAgciA9IGZpbmFsaXNlKG5hdHVyYWxFeHBvbmVudGlhbCh5LnRpbWVzKG5hdHVyYWxMb2dhcml0aG0oeCwgZSArIGspKSwgZSksIGUgKyA1LCAxKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIDE0IG5pbmVzIGZyb20gdGhlIDJuZCByb3VuZGluZyBkaWdpdCAodGhlIGZpcnN0IHJvdW5kaW5nIGRpZ2l0IG1heSBiZSA0IG9yIDkpLlxyXG4gICAgICAgIGlmICgrZGlnaXRzVG9TdHJpbmcoci5kKS5zbGljZShwciArIDEsIHByICsgMTUpICsgMSA9PSAxZTE0KSB7XHJcbiAgICAgICAgICByID0gZmluYWxpc2UociwgcHIgKyAxLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByLnMgPSBzO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgQ3Rvci5yb3VuZGluZyA9IHJtO1xyXG5cclxuICAgIHJldHVybiBmaW5hbGlzZShyLCBwciwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIGBzZGAgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnRcclxuICAgKiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBub3JtYWwgbm90YXRpb24uXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvUHJlY2lzaW9uID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHN0ciA9IGZpbml0ZVRvU3RyaW5nKHgsIHguZSA8PSBDdG9yLnRvRXhwTmVnIHx8IHguZSA+PSBDdG9yLnRvRXhwUG9zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSBmaW5hbGlzZShuZXcgQ3Rvcih4KSwgc2QsIHJtKTtcclxuICAgICAgc3RyID0gZmluaXRlVG9TdHJpbmcoeCwgc2QgPD0geC5lIHx8IHguZSA8PSBDdG9yLnRvRXhwTmVnLCBzZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHguaXNOZWcoKSAmJiAheC5pc1plcm8oKSA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIGBzZGBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gLCBvciB0byBgcHJlY2lzaW9uYCBhbmQgYHJvdW5kaW5nYCByZXNwZWN0aXZlbHkgaWZcclxuICAgKiBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ3RvU0QoKSBkaWdpdHMgb3V0IG9mIHJhbmdlOiB7c2R9J1xyXG4gICAqICd0b1NEKCkgZGlnaXRzIG5vdCBhbiBpbnRlZ2VyOiB7c2R9J1xyXG4gICAqICd0b1NEKCkgcm91bmRpbmcgbW9kZSBub3QgYW4gaW50ZWdlcjoge3JtfSdcclxuICAgKiAndG9TRCgpIHJvdW5kaW5nIG1vZGUgb3V0IG9mIHJhbmdlOiB7cm19J1xyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1NpZ25pZmljYW50RGlnaXRzID0gUC50b1NEID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoc2QgPT09IHZvaWQgMCkge1xyXG4gICAgICBzZCA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKHNkLCAxLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKG5ldyBDdG9yKHgpLCBzZCwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbiBpZiB0aGlzIERlY2ltYWwgaGFzIGEgcG9zaXRpdmUgZXhwb25lbnQgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuXHJcbiAgICogYHRvRXhwUG9zYCwgb3IgYSBuZWdhdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBsZXNzIHRoYW4gYHRvRXhwTmVnYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBzdHIgPSBmaW5pdGVUb1N0cmluZyh4LCB4LmUgPD0gQ3Rvci50b0V4cE5lZyB8fCB4LmUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcblxyXG4gICAgcmV0dXJuIHguaXNOZWcoKSAmJiAheC5pc1plcm8oKSA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRydW5jYXRlZCB0byBhIHdob2xlIG51bWJlci5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudHJ1bmNhdGVkID0gUC50cnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmaW5hbGlzZShuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKSwgdGhpcy5lICsgMSwgMSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqIFVubGlrZSBgdG9TdHJpbmdgLCBuZWdhdGl2ZSB6ZXJvIHdpbGwgaW5jbHVkZSB0aGUgbWludXMgc2lnbi5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudmFsdWVPZiA9IFAudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgc3RyID0gZmluaXRlVG9TdHJpbmcoeCwgeC5lIDw9IEN0b3IudG9FeHBOZWcgfHwgeC5lID49IEN0b3IudG9FeHBQb3MpO1xyXG5cclxuICAgIHJldHVybiB4LmlzTmVnKCkgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgLy8gQWRkIGFsaWFzZXMgdG8gbWF0Y2ggQmlnRGVjaW1hbCBtZXRob2QgbmFtZXMuXHJcbiAgLy8gUC5hZGQgPSBQLnBsdXM7XHJcbiAgUC5zdWJ0cmFjdCA9IFAubWludXM7XHJcbiAgUC5tdWx0aXBseSA9IFAudGltZXM7XHJcbiAgUC5kaXZpZGUgPSBQLmRpdjtcclxuICBQLnJlbWFpbmRlciA9IFAubW9kO1xyXG4gIFAuY29tcGFyZVRvID0gUC5jbXA7XHJcbiAgUC5uZWdhdGUgPSBQLm5lZztcclxuICAgKi9cclxuXHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIERlY2ltYWwucHJvdG90eXBlIChQKSBhbmQvb3IgRGVjaW1hbCBtZXRob2RzLCBhbmQgdGhlaXIgY2FsbGVycy5cclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGRpZ2l0c1RvU3RyaW5nICAgICAgICAgICBQLmN1YmVSb290LCBQLmxvZ2FyaXRobSwgUC5zcXVhcmVSb290LCBQLnRvRnJhY3Rpb24sIFAudG9Qb3dlcixcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbml0ZVRvU3RyaW5nLCBuYXR1cmFsRXhwb25lbnRpYWwsIG5hdHVyYWxMb2dhcml0aG1cclxuICAgKiAgY2hlY2tJbnQzMiAgICAgICAgICAgICAgIFAudG9EZWNpbWFsUGxhY2VzLCBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC50b05lYXJlc3QsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBQLnRvUHJlY2lzaW9uLCBQLnRvU2lnbmlmaWNhbnREaWdpdHMsIHRvU3RyaW5nQmluYXJ5LCByYW5kb21cclxuICAgKiAgY2hlY2tSb3VuZGluZ0RpZ2l0cyAgICAgIFAubG9nYXJpdGhtLCBQLnRvUG93ZXIsIG5hdHVyYWxFeHBvbmVudGlhbCwgbmF0dXJhbExvZ2FyaXRobVxyXG4gICAqICBjb252ZXJ0QmFzZSAgICAgICAgICAgICAgdG9TdHJpbmdCaW5hcnksIHBhcnNlT3RoZXJcclxuICAgKiAgY29zICAgICAgICAgICAgICAgICAgICAgIFAuY29zXHJcbiAgICogIGRpdmlkZSAgICAgICAgICAgICAgICAgICBQLmF0YW5oLCBQLmN1YmVSb290LCBQLmRpdmlkZWRCeSwgUC5kaXZpZGVkVG9JbnRlZ2VyQnksXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBQLmxvZ2FyaXRobSwgUC5tb2R1bG8sIFAuc3F1YXJlUm9vdCwgUC50YW4sIFAudGFuaCwgUC50b0ZyYWN0aW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUC50b05lYXJlc3QsIHRvU3RyaW5nQmluYXJ5LCBuYXR1cmFsRXhwb25lbnRpYWwsIG5hdHVyYWxMb2dhcml0aG0sXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICB0YXlsb3JTZXJpZXMsIGF0YW4yLCBwYXJzZU90aGVyXHJcbiAgICogIGZpbmFsaXNlICAgICAgICAgICAgICAgICBQLmFic29sdXRlVmFsdWUsIFAuYXRhbiwgUC5hdGFuaCwgUC5jZWlsLCBQLmNvcywgUC5jb3NoLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUC5jdWJlUm9vdCwgUC5kaXZpZGVkVG9JbnRlZ2VyQnksIFAuZmxvb3IsIFAubG9nYXJpdGhtLCBQLm1pbnVzLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUC5tb2R1bG8sIFAubmVnYXRlZCwgUC5wbHVzLCBQLnJvdW5kLCBQLnNpbiwgUC5zaW5oLCBQLnNxdWFyZVJvb3QsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBQLnRhbiwgUC50aW1lcywgUC50b0RlY2ltYWxQbGFjZXMsIFAudG9FeHBvbmVudGlhbCwgUC50b0ZpeGVkLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUC50b05lYXJlc3QsIFAudG9Qb3dlciwgUC50b1ByZWNpc2lvbiwgUC50b1NpZ25pZmljYW50RGlnaXRzLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUC50cnVuY2F0ZWQsIGRpdmlkZSwgZ2V0TG4xMCwgZ2V0UGksIG5hdHVyYWxFeHBvbmVudGlhbCxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxMb2dhcml0aG0sIGNlaWwsIGZsb29yLCByb3VuZCwgdHJ1bmNcclxuICAgKiAgZmluaXRlVG9TdHJpbmcgICAgICAgICAgIFAudG9FeHBvbmVudGlhbCwgUC50b0ZpeGVkLCBQLnRvUHJlY2lzaW9uLCBQLnRvU3RyaW5nLCBQLnZhbHVlT2YsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICB0b1N0cmluZ0JpbmFyeVxyXG4gICAqICBnZXRCYXNlMTBFeHBvbmVudCAgICAgICAgUC5taW51cywgUC5wbHVzLCBQLnRpbWVzLCBwYXJzZU90aGVyXHJcbiAgICogIGdldExuMTAgICAgICAgICAgICAgICAgICBQLmxvZ2FyaXRobSwgbmF0dXJhbExvZ2FyaXRobVxyXG4gICAqICBnZXRQaSAgICAgICAgICAgICAgICAgICAgUC5hY29zLCBQLmFzaW4sIFAuYXRhbiwgdG9MZXNzVGhhbkhhbGZQaSwgYXRhbjJcclxuICAgKiAgZ2V0UHJlY2lzaW9uICAgICAgICAgICAgIFAucHJlY2lzaW9uLCBQLnRvRnJhY3Rpb25cclxuICAgKiAgZ2V0WmVyb1N0cmluZyAgICAgICAgICAgIGRpZ2l0c1RvU3RyaW5nLCBmaW5pdGVUb1N0cmluZ1xyXG4gICAqICBpbnRQb3cgICAgICAgICAgICAgICAgICAgUC50b1Bvd2VyLCBwYXJzZU90aGVyXHJcbiAgICogIGlzT2RkICAgICAgICAgICAgICAgICAgICB0b0xlc3NUaGFuSGFsZlBpXHJcbiAgICogIG1heE9yTWluICAgICAgICAgICAgICAgICBtYXgsIG1pblxyXG4gICAqICBuYXR1cmFsRXhwb25lbnRpYWwgICAgICAgUC5uYXR1cmFsRXhwb25lbnRpYWwsIFAudG9Qb3dlclxyXG4gICAqICBuYXR1cmFsTG9nYXJpdGhtICAgICAgICAgUC5hY29zaCwgUC5hc2luaCwgUC5hdGFuaCwgUC5sb2dhcml0aG0sIFAubmF0dXJhbExvZ2FyaXRobSxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFAudG9Qb3dlciwgbmF0dXJhbEV4cG9uZW50aWFsXHJcbiAgICogIG5vbkZpbml0ZVRvU3RyaW5nICAgICAgICBmaW5pdGVUb1N0cmluZywgdG9TdHJpbmdCaW5hcnlcclxuICAgKiAgcGFyc2VEZWNpbWFsICAgICAgICAgICAgIERlY2ltYWxcclxuICAgKiAgcGFyc2VPdGhlciAgICAgICAgICAgICAgIERlY2ltYWxcclxuICAgKiAgc2luICAgICAgICAgICAgICAgICAgICAgIFAuc2luXHJcbiAgICogIHRheWxvclNlcmllcyAgICAgICAgICAgICBQLmNvc2gsIFAuc2luaCwgY29zLCBzaW5cclxuICAgKiAgdG9MZXNzVGhhbkhhbGZQaSAgICAgICAgIFAuY29zLCBQLnNpblxyXG4gICAqICB0b1N0cmluZ0JpbmFyeSAgICAgICAgICAgUC50b0JpbmFyeSwgUC50b0hleGFkZWNpbWFsLCBQLnRvT2N0YWxcclxuICAgKiAgdHJ1bmNhdGUgICAgICAgICAgICAgICAgIGludFBvd1xyXG4gICAqXHJcbiAgICogIFRocm93czogICAgICAgICAgICAgICAgICBQLmxvZ2FyaXRobSwgUC5wcmVjaXNpb24sIFAudG9GcmFjdGlvbiwgY2hlY2tJbnQzMiwgZ2V0TG4xMCwgZ2V0UGksXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBuYXR1cmFsTG9nYXJpdGhtLCBjb25maWcsIHBhcnNlT3RoZXIsIHJhbmRvbSwgRGVjaW1hbFxyXG4gICAqL1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gZGlnaXRzVG9TdHJpbmcoZCkge1xyXG4gICAgdmFyIGksIGssIHdzLFxyXG4gICAgICBpbmRleE9mTGFzdFdvcmQgPSBkLmxlbmd0aCAtIDEsXHJcbiAgICAgIHN0ciA9ICcnLFxyXG4gICAgICB3ID0gZFswXTtcclxuXHJcbiAgICBpZiAoaW5kZXhPZkxhc3RXb3JkID4gMCkge1xyXG4gICAgICBzdHIgKz0gdztcclxuICAgICAgZm9yIChpID0gMTsgaSA8IGluZGV4T2ZMYXN0V29yZDsgaSsrKSB7XHJcbiAgICAgICAgd3MgPSBkW2ldICsgJyc7XHJcbiAgICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICAgIGlmIChrKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgICBzdHIgKz0gd3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHcgPSBkW2ldO1xyXG4gICAgICB3cyA9IHcgKyAnJztcclxuICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2UgaWYgKHcgPT09IDApIHtcclxuICAgICAgcmV0dXJuICcwJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3Mgb2YgbGFzdCB3LlxyXG4gICAgZm9yICg7IHcgJSAxMCA9PT0gMDspIHcgLz0gMTA7XHJcblxyXG4gICAgcmV0dXJuIHN0ciArIHc7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tJbnQzMihpLCBtaW4sIG1heCkge1xyXG4gICAgaWYgKGkgIT09IH5+aSB8fCBpIDwgbWluIHx8IGkgPiBtYXgpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDaGVjayA1IHJvdW5kaW5nIGRpZ2l0cyBpZiBgcmVwZWF0aW5nYCBpcyBudWxsLCA0IG90aGVyd2lzZS5cclxuICAgKiBgcmVwZWF0aW5nID09IG51bGxgIGlmIGNhbGxlciBpcyBgbG9nYCBvciBgcG93YCxcclxuICAgKiBgcmVwZWF0aW5nICE9IG51bGxgIGlmIGNhbGxlciBpcyBgbmF0dXJhbExvZ2FyaXRobWAgb3IgYG5hdHVyYWxFeHBvbmVudGlhbGAuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2hlY2tSb3VuZGluZ0RpZ2l0cyhkLCBpLCBybSwgcmVwZWF0aW5nKSB7XHJcbiAgICB2YXIgZGksIGssIHIsIHJkO1xyXG5cclxuICAgIC8vIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBhcnJheSBkLlxyXG4gICAgZm9yIChrID0gZFswXTsgayA+PSAxMDsgayAvPSAxMCkgLS1pO1xyXG5cclxuICAgIC8vIElzIHRoZSByb3VuZGluZyBkaWdpdCBpbiB0aGUgZmlyc3Qgd29yZCBvZiBkP1xyXG4gICAgaWYgKC0taSA8IDApIHtcclxuICAgICAgaSArPSBMT0dfQkFTRTtcclxuICAgICAgZGkgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGkgPSBNYXRoLmNlaWwoKGkgKyAxKSAvIExPR19CQVNFKTtcclxuICAgICAgaSAlPSBMT0dfQkFTRTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpIGlzIHRoZSBpbmRleCAoMCAtIDYpIG9mIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgIC8vIEUuZy4gaWYgd2l0aGluIHRoZSB3b3JkIDM0ODc1NjMgdGhlIGZpcnN0IHJvdW5kaW5nIGRpZ2l0IGlzIDUsXHJcbiAgICAvLyB0aGVuIGkgPSA0LCBrID0gMTAwMCwgcmQgPSAzNDg3NTYzICUgMTAwMCA9IDU2M1xyXG4gICAgayA9IG1hdGhwb3coMTAsIExPR19CQVNFIC0gaSk7XHJcbiAgICByZCA9IGRbZGldICUgayB8IDA7XHJcblxyXG4gICAgaWYgKHJlcGVhdGluZyA9PSBudWxsKSB7XHJcbiAgICAgIGlmIChpIDwgMykge1xyXG4gICAgICAgIGlmIChpID09IDApIHJkID0gcmQgLyAxMDAgfCAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGkgPT0gMSkgcmQgPSByZCAvIDEwIHwgMDtcclxuICAgICAgICByID0gcm0gPCA0ICYmIHJkID09IDk5OTk5IHx8IHJtID4gMyAmJiByZCA9PSA0OTk5OSB8fCByZCA9PSA1MDAwMCB8fCByZCA9PSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHIgPSAocm0gPCA0ICYmIHJkICsgMSA9PSBrIHx8IHJtID4gMyAmJiByZCArIDEgPT0gayAvIDIpICYmXHJcbiAgICAgICAgICAoZFtkaSArIDFdIC8gayAvIDEwMCB8IDApID09IG1hdGhwb3coMTAsIGkgLSAyKSAtIDEgfHxcclxuICAgICAgICAgICAgKHJkID09IGsgLyAyIHx8IHJkID09IDApICYmIChkW2RpICsgMV0gLyBrIC8gMTAwIHwgMCkgPT0gMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGkgPCA0KSB7XHJcbiAgICAgICAgaWYgKGkgPT0gMCkgcmQgPSByZCAvIDEwMDAgfCAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGkgPT0gMSkgcmQgPSByZCAvIDEwMCB8IDA7XHJcbiAgICAgICAgZWxzZSBpZiAoaSA9PSAyKSByZCA9IHJkIC8gMTAgfCAwO1xyXG4gICAgICAgIHIgPSAocmVwZWF0aW5nIHx8IHJtIDwgNCkgJiYgcmQgPT0gOTk5OSB8fCAhcmVwZWF0aW5nICYmIHJtID4gMyAmJiByZCA9PSA0OTk5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHIgPSAoKHJlcGVhdGluZyB8fCBybSA8IDQpICYmIHJkICsgMSA9PSBrIHx8XHJcbiAgICAgICAgKCFyZXBlYXRpbmcgJiYgcm0gPiAzKSAmJiByZCArIDEgPT0gayAvIDIpICYmXHJcbiAgICAgICAgICAoZFtkaSArIDFdIC8gayAvIDEwMDAgfCAwKSA9PSBtYXRocG93KDEwLCBpIC0gMykgLSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ29udmVydCBzdHJpbmcgb2YgYGJhc2VJbmAgdG8gYW4gYXJyYXkgb2YgbnVtYmVycyBvZiBgYmFzZU91dGAuXHJcbiAgLy8gRWcuIGNvbnZlcnRCYXNlKCcyNTUnLCAxMCwgMTYpIHJldHVybnMgWzE1LCAxNV0uXHJcbiAgLy8gRWcuIGNvbnZlcnRCYXNlKCdmZicsIDE2LCAxMCkgcmV0dXJucyBbMiwgNSwgNV0uXHJcbiAgZnVuY3Rpb24gY29udmVydEJhc2Uoc3RyLCBiYXNlSW4sIGJhc2VPdXQpIHtcclxuICAgIHZhciBqLFxyXG4gICAgICBhcnIgPSBbMF0sXHJcbiAgICAgIGFyckwsXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBzdHJMID0gc3RyLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKDsgaSA8IHN0ckw7KSB7XHJcbiAgICAgIGZvciAoYXJyTCA9IGFyci5sZW5ndGg7IGFyckwtLTspIGFyclthcnJMXSAqPSBiYXNlSW47XHJcbiAgICAgIGFyclswXSArPSBOVU1FUkFMUy5pbmRleE9mKHN0ci5jaGFyQXQoaSsrKSk7XHJcbiAgICAgIGZvciAoaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoYXJyW2pdID4gYmFzZU91dCAtIDEpIHtcclxuICAgICAgICAgIGlmIChhcnJbaiArIDFdID09PSB2b2lkIDApIGFycltqICsgMV0gPSAwO1xyXG4gICAgICAgICAgYXJyW2ogKyAxXSArPSBhcnJbal0gLyBiYXNlT3V0IHwgMDtcclxuICAgICAgICAgIGFycltqXSAlPSBiYXNlT3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogY29zKHgpID0gMSAtIHheMi8yISArIHheNC80ISAtIC4uLlxyXG4gICAqIHx4fCA8IHBpLzJcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvc2luZShDdG9yLCB4KSB7XHJcbiAgICB2YXIgaywgeSxcclxuICAgICAgbGVuID0geC5kLmxlbmd0aDtcclxuXHJcbiAgICAvLyBBcmd1bWVudCByZWR1Y3Rpb246IGNvcyg0eCkgPSA4Kihjb3NeNCh4KSAtIGNvc14yKHgpKSArIDFcclxuICAgIC8vIGkuZS4gY29zKHgpID0gOCooY29zXjQoeC80KSAtIGNvc14yKHgvNCkpICsgMVxyXG5cclxuICAgIC8vIEVzdGltYXRlIHRoZSBvcHRpbXVtIG51bWJlciBvZiB0aW1lcyB0byB1c2UgdGhlIGFyZ3VtZW50IHJlZHVjdGlvbi5cclxuICAgIGlmIChsZW4gPCAzMikge1xyXG4gICAgICBrID0gTWF0aC5jZWlsKGxlbiAvIDMpO1xyXG4gICAgICB5ID0gTWF0aC5wb3coNCwgLWspLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBrID0gMTY7XHJcbiAgICAgIHkgPSAnMi4zMjgzMDY0MzY1Mzg2OTYyODkwNjI1ZS0xMCc7XHJcbiAgICB9XHJcblxyXG4gICAgQ3Rvci5wcmVjaXNpb24gKz0gaztcclxuXHJcbiAgICB4ID0gdGF5bG9yU2VyaWVzKEN0b3IsIDEsIHgudGltZXMoeSksIG5ldyBDdG9yKDEpKTtcclxuXHJcbiAgICAvLyBSZXZlcnNlIGFyZ3VtZW50IHJlZHVjdGlvblxyXG4gICAgZm9yICh2YXIgaSA9IGs7IGktLTspIHtcclxuICAgICAgdmFyIGNvczJ4ID0geC50aW1lcyh4KTtcclxuICAgICAgeCA9IGNvczJ4LnRpbWVzKGNvczJ4KS5taW51cyhjb3MyeCkudGltZXMoOCkucGx1cygxKTtcclxuICAgIH1cclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiAtPSBrO1xyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUGVyZm9ybSBkaXZpc2lvbiBpbiB0aGUgc3BlY2lmaWVkIGJhc2UuXHJcbiAgICovXHJcbiAgdmFyIGRpdmlkZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQXNzdW1lcyBub24temVybyB4IGFuZCBrLCBhbmQgaGVuY2Ugbm9uLXplcm8gcmVzdWx0LlxyXG4gICAgZnVuY3Rpb24gbXVsdGlwbHlJbnRlZ2VyKHgsIGssIGJhc2UpIHtcclxuICAgICAgdmFyIHRlbXAsXHJcbiAgICAgICAgY2FycnkgPSAwLFxyXG4gICAgICAgIGkgPSB4Lmxlbmd0aDtcclxuXHJcbiAgICAgIGZvciAoeCA9IHguc2xpY2UoKTsgaS0tOykge1xyXG4gICAgICAgIHRlbXAgPSB4W2ldICogayArIGNhcnJ5O1xyXG4gICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZSB8IDA7XHJcbiAgICAgICAgY2FycnkgPSB0ZW1wIC8gYmFzZSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYXJyeSkgeC51bnNoaWZ0KGNhcnJ5KTtcclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgYUwsIGJMKSB7XHJcbiAgICAgIHZhciBpLCByO1xyXG5cclxuICAgICAgaWYgKGFMICE9IGJMKSB7XHJcbiAgICAgICAgciA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gciA9IDA7IGkgPCBhTDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoYVtpXSAhPSBiW2ldKSB7XHJcbiAgICAgICAgICAgIHIgPSBhW2ldID4gYltpXSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCwgYmFzZSkge1xyXG4gICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCBiIGZyb20gYS5cclxuICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgYVthTF0gLT0gaTtcclxuICAgICAgICBpID0gYVthTF0gPCBiW2FMXSA/IDEgOiAwO1xyXG4gICAgICAgIGFbYUxdID0gaSAqIGJhc2UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTspIGEuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHksIHByLCBybSwgZHAsIGJhc2UpIHtcclxuICAgICAgdmFyIGNtcCwgZSwgaSwgaywgbG9nQmFzZSwgbW9yZSwgcHJvZCwgcHJvZEwsIHEsIHFkLCByZW0sIHJlbUwsIHJlbTAsIHNkLCB0LCB4aSwgeEwsIHlkMCxcclxuICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgICAgc2lnbiA9IHgucyA9PSB5LnMgPyAxIDogLTEsXHJcbiAgICAgICAgeGQgPSB4LmQsXHJcbiAgICAgICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgTmFOLCBJbmZpbml0eSBvciAwP1xyXG4gICAgICBpZiAoIXhkIHx8ICF4ZFswXSB8fCAheWQgfHwgIXlkWzBdKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ3RvcigvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBOYU4sIG9yIGJvdGggSW5maW5pdHkgb3IgMC5cclxuICAgICAgICAgICF4LnMgfHwgIXkucyB8fCAoeGQgPyB5ZCAmJiB4ZFswXSA9PSB5ZFswXSA6ICF5ZCkgPyBOYU4gOlxyXG5cclxuICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgeCBpcyAwIG9yIHkgaXMgwrFJbmZpbml0eSwgb3IgcmV0dXJuIMKxSW5maW5pdHkgYXMgeSBpcyAwLlxyXG4gICAgICAgICAgeGQgJiYgeGRbMF0gPT0gMCB8fCAheWQgPyBzaWduICogMCA6IHNpZ24gLyAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJhc2UpIHtcclxuICAgICAgICBsb2dCYXNlID0gMTtcclxuICAgICAgICBlID0geC5lIC0geS5lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJhc2UgPSBCQVNFO1xyXG4gICAgICAgIGxvZ0Jhc2UgPSBMT0dfQkFTRTtcclxuICAgICAgICBlID0gbWF0aGZsb29yKHguZSAvIGxvZ0Jhc2UpIC0gbWF0aGZsb29yKHkuZSAvIGxvZ0Jhc2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5TCA9IHlkLmxlbmd0aDtcclxuICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIHEgPSBuZXcgQ3RvcihzaWduKTtcclxuICAgICAgcWQgPSBxLmQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFJlc3VsdCBleHBvbmVudCBtYXkgYmUgb25lIGxlc3MgdGhhbiBlLlxyXG4gICAgICAvLyBUaGUgZGlnaXQgYXJyYXkgb2YgYSBEZWNpbWFsIGZyb20gdG9TdHJpbmdCaW5hcnkgbWF5IGhhdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IDA7IHlkW2ldID09ICh4ZFtpXSB8fCAwKTsgaSsrKTtcclxuXHJcbiAgICAgIGlmICh5ZFtpXSA+ICh4ZFtpXSB8fCAwKSkgZS0tO1xyXG5cclxuICAgICAgaWYgKHByID09IG51bGwpIHtcclxuICAgICAgICBzZCA9IHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICB9IGVsc2UgaWYgKGRwKSB7XHJcbiAgICAgICAgc2QgPSBwciArICh4LmUgLSB5LmUpICsgMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZCA9IHByO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2QgPCAwKSB7XHJcbiAgICAgICAgcWQucHVzaCgxKTtcclxuICAgICAgICBtb3JlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBwcmVjaXNpb24gaW4gbnVtYmVyIG9mIGJhc2UgMTAgZGlnaXRzIHRvIGJhc2UgMWU3IGRpZ2l0cy5cclxuICAgICAgICBzZCA9IHNkIC8gbG9nQmFzZSArIDIgfCAwO1xyXG4gICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAvLyBkaXZpc29yIDwgMWU3XHJcbiAgICAgICAgaWYgKHlMID09IDEpIHtcclxuICAgICAgICAgIGsgPSAwO1xyXG4gICAgICAgICAgeWQgPSB5ZFswXTtcclxuICAgICAgICAgIHNkKys7XHJcblxyXG4gICAgICAgICAgLy8gayBpcyB0aGUgY2FycnkuXHJcbiAgICAgICAgICBmb3IgKDsgKGkgPCB4TCB8fCBrKSAmJiBzZC0tOyBpKyspIHtcclxuICAgICAgICAgICAgdCA9IGsgKiBiYXNlICsgKHhkW2ldIHx8IDApO1xyXG4gICAgICAgICAgICBxZFtpXSA9IHQgLyB5ZCB8IDA7XHJcbiAgICAgICAgICAgIGsgPSB0ICUgeWQgfCAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG1vcmUgPSBrIHx8IGkgPCB4TDtcclxuXHJcbiAgICAgICAgLy8gZGl2aXNvciA+PSAxZTdcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIE5vcm1hbGlzZSB4ZCBhbmQgeWQgc28gaGlnaGVzdCBvcmRlciBkaWdpdCBvZiB5ZCBpcyA+PSBiYXNlLzJcclxuICAgICAgICAgIGsgPSBiYXNlIC8gKHlkWzBdICsgMSkgfCAwO1xyXG5cclxuICAgICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICB5ZCA9IG11bHRpcGx5SW50ZWdlcih5ZCwgaywgYmFzZSk7XHJcbiAgICAgICAgICAgIHhkID0gbXVsdGlwbHlJbnRlZ2VyKHhkLCBrLCBiYXNlKTtcclxuICAgICAgICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHhMID0geGQubGVuZ3RoO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHhpID0geUw7XHJcbiAgICAgICAgICByZW0gPSB4ZC5zbGljZSgwLCB5TCk7XHJcbiAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAvLyBBZGQgemVyb3MgdG8gbWFrZSByZW1haW5kZXIgYXMgbG9uZyBhcyBkaXZpc29yLlxyXG4gICAgICAgICAgZm9yICg7IHJlbUwgPCB5TDspIHJlbVtyZW1MKytdID0gMDtcclxuXHJcbiAgICAgICAgICB5eiA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgICB5ei51bnNoaWZ0KDApO1xyXG4gICAgICAgICAgeWQwID0geWRbMF07XHJcblxyXG4gICAgICAgICAgaWYgKHlkWzFdID49IGJhc2UgLyAyKSArK3lkMDtcclxuXHJcbiAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGsgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgZGl2aXNvciA8IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKGNtcCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRyaWFsIGRpZ2l0LCBrLlxyXG4gICAgICAgICAgICAgIHJlbTAgPSByZW1bMF07XHJcbiAgICAgICAgICAgICAgaWYgKHlMICE9IHJlbUwpIHJlbTAgPSByZW0wICogYmFzZSArIChyZW1bMV0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGsgd2lsbCBiZSBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGsgPSByZW0wIC8geWQwIHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gIEFsZ29yaXRobTpcclxuICAgICAgICAgICAgICAvLyAgMS4gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdCAoaylcclxuICAgICAgICAgICAgICAvLyAgMi4gaWYgcHJvZHVjdCA+IHJlbWFpbmRlcjogcHJvZHVjdCAtPSBkaXZpc29yLCBrLS1cclxuICAgICAgICAgICAgICAvLyAgMy4gcmVtYWluZGVyIC09IHByb2R1Y3RcclxuICAgICAgICAgICAgICAvLyAgNC4gaWYgcHJvZHVjdCB3YXMgPCByZW1haW5kZXIgYXQgMjpcclxuICAgICAgICAgICAgICAvLyAgICA1LiBjb21wYXJlIG5ldyByZW1haW5kZXIgYW5kIGRpdmlzb3JcclxuICAgICAgICAgICAgICAvLyAgICA2LiBJZiByZW1haW5kZXIgPiBkaXZpc29yOiByZW1haW5kZXIgLT0gZGl2aXNvciwgaysrXHJcblxyXG4gICAgICAgICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPj0gYmFzZSkgayA9IGJhc2UgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgICBwcm9kID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUocHJvZCwgcmVtLCBwcm9kTCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvZHVjdCA+IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIGlmIChjbXAgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICBrLS07XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgICAgc3VidHJhY3QocHJvZCwgeUwgPCBwcm9kTCA/IHl6IDogeWQsIHByb2RMLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNtcCBpcyAtMS5cclxuICAgICAgICAgICAgICAgIC8vIElmIGsgaXMgMCwgdGhlcmUgaXMgbm8gbmVlZCB0byBjb21wYXJlIHlkIGFuZCByZW0gYWdhaW4gYmVsb3csIHNvIGNoYW5nZSBjbXAgdG8gMVxyXG4gICAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgaXQuIElmIGsgaXMgMSB0aGVyZSBpcyBhIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LlxyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gMCkgY21wID0gayA9IDE7XHJcbiAgICAgICAgICAgICAgICBwcm9kID0geWQuc2xpY2UoKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgaWYgKHByb2RMIDwgcmVtTCkgcHJvZC51bnNoaWZ0KDApO1xyXG5cclxuICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgcHJvZCwgcmVtTCwgYmFzZSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcHJldmlvdXMgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgbmV3IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCBuZXcgcmVtYWluZGVyLCBzdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgaWYgKGNtcCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgaysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCB5TCA8IHJlbUwgPyB5eiA6IHlkLCByZW1MLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgICByZW0gPSBbMF07XHJcbiAgICAgICAgICAgIH0gICAgLy8gaWYgY21wID09PSAxLCBrIHdpbGwgYmUgMFxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IGRpZ2l0LCBrLCB0byB0aGUgcmVzdWx0IGFycmF5LlxyXG4gICAgICAgICAgICBxZFtpKytdID0gaztcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBpZiAoY21wICYmIHJlbVswXSkge1xyXG4gICAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGRbeGldIHx8IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVtID0gW3hkW3hpXV07XHJcbiAgICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9IHdoaWxlICgoeGkrKyA8IHhMIHx8IHJlbVswXSAhPT0gdm9pZCAwKSAmJiBzZC0tKTtcclxuXHJcbiAgICAgICAgICBtb3JlID0gcmVtWzBdICE9PSB2b2lkIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMZWFkaW5nIHplcm8/XHJcbiAgICAgICAgaWYgKCFxZFswXSkgcWQuc2hpZnQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbG9nQmFzZSBpcyAxIHdoZW4gZGl2aWRlIGlzIGJlaW5nIHVzZWQgZm9yIGJhc2UgY29udmVyc2lvbi5cclxuICAgICAgaWYgKGxvZ0Jhc2UgPT0gMSkge1xyXG4gICAgICAgIHEuZSA9IGU7XHJcbiAgICAgICAgaW5leGFjdCA9IG1vcmU7XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIFRvIGNhbGN1bGF0ZSBxLmUsIGZpcnN0IGdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBxZFswXS5cclxuICAgICAgICBmb3IgKGkgPSAxLCBrID0gcWRbMF07IGsgPj0gMTA7IGsgLz0gMTApIGkrKztcclxuICAgICAgICBxLmUgPSBpICsgZSAqIGxvZ0Jhc2UgLSAxO1xyXG5cclxuICAgICAgICBmaW5hbGlzZShxLCBkcCA/IHByICsgcS5lICsgMSA6IHByLCBybSwgbW9yZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBxO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSb3VuZCBgeGAgdG8gYHNkYCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gLlxyXG4gICAqIENoZWNrIGZvciBvdmVyL3VuZGVyLWZsb3cuXHJcbiAgICovXHJcbiAgIGZ1bmN0aW9uIGZpbmFsaXNlKHgsIHNkLCBybSwgaXNUcnVuY2F0ZWQpIHtcclxuICAgIHZhciBkaWdpdHMsIGksIGosIGssIHJkLCByb3VuZFVwLCB3LCB4ZCwgeGRpLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAvLyBEb24ndCByb3VuZCBpZiBzZCBpcyBudWxsIG9yIHVuZGVmaW5lZC5cclxuICAgIG91dDogaWYgKHNkICE9IG51bGwpIHtcclxuICAgICAgeGQgPSB4LmQ7XHJcblxyXG4gICAgICAvLyBJbmZpbml0eS9OYU4uXHJcbiAgICAgIGlmICgheGQpIHJldHVybiB4O1xyXG5cclxuICAgICAgLy8gcmQ6IHRoZSByb3VuZGluZyBkaWdpdCwgaS5lLiB0aGUgZGlnaXQgYWZ0ZXIgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAgIC8vIHc6IHRoZSB3b3JkIG9mIHhkIGNvbnRhaW5pbmcgcmQsIGEgYmFzZSAxZTcgbnVtYmVyLlxyXG4gICAgICAvLyB4ZGk6IHRoZSBpbmRleCBvZiB3IHdpdGhpbiB4ZC5cclxuICAgICAgLy8gZGlnaXRzOiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgICAvLyBpOiB3aGF0IHdvdWxkIGJlIHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdyBpZiBhbGwgdGhlIG51bWJlcnMgd2VyZSA3IGRpZ2l0cyBsb25nIChpLmUuIGlmXHJcbiAgICAgIC8vIHRoZXkgaGFkIGxlYWRpbmcgemVyb3MpXHJcbiAgICAgIC8vIGo6IGlmID4gMCwgdGhlIGFjdHVhbCBpbmRleCBvZiByZCB3aXRoaW4gdyAoaWYgPCAwLCByZCBpcyBhIGxlYWRpbmcgemVybykuXHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5IHhkLlxyXG4gICAgICBmb3IgKGRpZ2l0cyA9IDEsIGsgPSB4ZFswXTsgayA+PSAxMDsgayAvPSAxMCkgZGlnaXRzKys7XHJcbiAgICAgIGkgPSBzZCAtIGRpZ2l0cztcclxuXHJcbiAgICAgIC8vIElzIHRoZSByb3VuZGluZyBkaWdpdCBpbiB0aGUgZmlyc3Qgd29yZCBvZiB4ZD9cclxuICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgaSArPSBMT0dfQkFTRTtcclxuICAgICAgICBqID0gc2Q7XHJcbiAgICAgICAgdyA9IHhkW3hkaSA9IDBdO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygdy5cclxuICAgICAgICByZCA9IHcgLyBtYXRocG93KDEwLCBkaWdpdHMgLSBqIC0gMSkgJSAxMCB8IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeGRpID0gTWF0aC5jZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcbiAgICAgICAgayA9IHhkLmxlbmd0aDtcclxuICAgICAgICBpZiAoeGRpID49IGspIHtcclxuICAgICAgICAgIGlmIChpc1RydW5jYXRlZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gTmVlZGVkIGJ5IGBuYXR1cmFsRXhwb25lbnRpYWxgLCBgbmF0dXJhbExvZ2FyaXRobWAgYW5kIGBzcXVhcmVSb290YC5cclxuICAgICAgICAgICAgZm9yICg7IGsrKyA8PSB4ZGk7KSB4ZC5wdXNoKDApO1xyXG4gICAgICAgICAgICB3ID0gcmQgPSAwO1xyXG4gICAgICAgICAgICBkaWdpdHMgPSAxO1xyXG4gICAgICAgICAgICBpICU9IExPR19CQVNFO1xyXG4gICAgICAgICAgICBqID0gaSAtIExPR19CQVNFICsgMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJyZWFrIG91dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdyA9IGsgPSB4ZFt4ZGldO1xyXG5cclxuICAgICAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgICAgICAgZm9yIChkaWdpdHMgPSAxOyBrID49IDEwOyBrIC89IDEwKSBkaWdpdHMrKztcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LlxyXG4gICAgICAgICAgaSAlPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LCBhZGp1c3RlZCBmb3IgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3IGlzIGdpdmVuIGJ5IExPR19CQVNFIC0gZGlnaXRzLlxyXG4gICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIGRpZ2l0cztcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygdy5cclxuICAgICAgICAgIHJkID0gaiA8IDAgPyAwIDogdyAvIG1hdGhwb3coMTAsIGRpZ2l0cyAtIGogLSAxKSAlIDEwIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFyZSB0aGVyZSBhbnkgbm9uLXplcm8gZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdD9cclxuICAgICAgaXNUcnVuY2F0ZWQgPSBpc1RydW5jYXRlZCB8fCBzZCA8IDAgfHxcclxuICAgICAgICB4ZFt4ZGkgKyAxXSAhPT0gdm9pZCAwIHx8IChqIDwgMCA/IHcgOiB3ICUgbWF0aHBvdygxMCwgZGlnaXRzIC0gaiAtIDEpKTtcclxuXHJcbiAgICAgIC8vIFRoZSBleHByZXNzaW9uIGB3ICUgbWF0aHBvdygxMCwgZGlnaXRzIC0gaiAtIDEpYCByZXR1cm5zIGFsbCB0aGUgZGlnaXRzIG9mIHcgdG8gdGhlIHJpZ2h0XHJcbiAgICAgIC8vIG9mIHRoZSBkaWdpdCBhdCAobGVmdC10by1yaWdodCkgaW5kZXggaiwgZS5nLiBpZiB3IGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvblxyXG4gICAgICAvLyB3aWxsIGdpdmUgNzE0LlxyXG5cclxuICAgICAgcm91bmRVcCA9IHJtIDwgNFxyXG4gICAgICAgID8gKHJkIHx8IGlzVHJ1bmNhdGVkKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICA6IHJkID4gNSB8fCByZCA9PSA1ICYmIChybSA9PSA0IHx8IGlzVHJ1bmNhdGVkIHx8IHJtID09IDYgJiZcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBkaWdpdCB0byB0aGUgbGVmdCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgb2RkLlxyXG4gICAgICAgICAgKChpID4gMCA/IGogPiAwID8gdyAvIG1hdGhwb3coMTAsIGRpZ2l0cyAtIGopIDogMCA6IHhkW3hkaSAtIDFdKSAlIDEwKSAmIDEgfHxcclxuICAgICAgICAgICAgcm0gPT0gKHgucyA8IDAgPyA4IDogNykpO1xyXG5cclxuICAgICAgaWYgKHNkIDwgMSB8fCAheGRbMF0pIHtcclxuICAgICAgICB4ZC5sZW5ndGggPSAwO1xyXG4gICAgICAgIGlmIChyb3VuZFVwKSB7XHJcblxyXG4gICAgICAgICAgLy8gQ29udmVydCBzZCB0byBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAgICAgIHNkIC09IHguZSArIDE7XHJcblxyXG4gICAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICAgIHhkWzBdID0gbWF0aHBvdygxMCwgKExPR19CQVNFIC0gc2QgJSBMT0dfQkFTRSkgJSBMT0dfQkFTRSk7XHJcbiAgICAgICAgICB4LmUgPSAtc2QgfHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgICB4ZFswXSA9IHguZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGV4Y2VzcyBkaWdpdHMuXHJcbiAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICB4ZC5sZW5ndGggPSB4ZGk7XHJcbiAgICAgICAgayA9IDE7XHJcbiAgICAgICAgeGRpLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeGQubGVuZ3RoID0geGRpICsgMTtcclxuICAgICAgICBrID0gbWF0aHBvdygxMCwgTE9HX0JBU0UgLSBpKTtcclxuXHJcbiAgICAgICAgLy8gRS5nLiA1NjcwMCBiZWNvbWVzIDU2MDAwIGlmIDcgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgIC8vIGogPiAwIG1lYW5zIGkgPiBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3LlxyXG4gICAgICAgIHhkW3hkaV0gPSBqID4gMCA/ICh3IC8gbWF0aHBvdygxMCwgZGlnaXRzIC0gaikgJSBtYXRocG93KDEwLCBqKSB8IDApICogayA6IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyb3VuZFVwKSB7XHJcbiAgICAgICAgZm9yICg7Oykge1xyXG5cclxuICAgICAgICAgIC8vIElzIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgICAgICAgaWYgKHhkaSA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpIHdpbGwgYmUgdGhlIGxlbmd0aCBvZiB4ZFswXSBiZWZvcmUgayBpcyBhZGRlZC5cclxuICAgICAgICAgICAgZm9yIChpID0gMSwgaiA9IHhkWzBdOyBqID49IDEwOyBqIC89IDEwKSBpKys7XHJcbiAgICAgICAgICAgIGogPSB4ZFswXSArPSBrO1xyXG4gICAgICAgICAgICBmb3IgKGsgPSAxOyBqID49IDEwOyBqIC89IDEwKSBrKys7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBpICE9IGsgdGhlIGxlbmd0aCBoYXMgaW5jcmVhc2VkLlxyXG4gICAgICAgICAgICBpZiAoaSAhPSBrKSB7XHJcbiAgICAgICAgICAgICAgeC5lKys7XHJcbiAgICAgICAgICAgICAgaWYgKHhkWzBdID09IEJBU0UpIHhkWzBdID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ZFt4ZGldICs9IGs7XHJcbiAgICAgICAgICAgIGlmICh4ZFt4ZGldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgICB4ZFt4ZGktLV0gPSAwO1xyXG4gICAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChpID0geGQubGVuZ3RoOyB4ZFstLWldID09PSAwOykgeGQucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV4dGVybmFsKSB7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdz9cclxuICAgICAgaWYgKHguZSA+IEN0b3IubWF4RSkge1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICB4LmQgPSBudWxsO1xyXG4gICAgICAgIHguZSA9IE5hTjtcclxuXHJcbiAgICAgIC8vIFVuZGVyZmxvdz9cclxuICAgICAgfSBlbHNlIGlmICh4LmUgPCBDdG9yLm1pbkUpIHtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICB4LmUgPSAwO1xyXG4gICAgICAgIHguZCA9IFswXTtcclxuICAgICAgICAvLyBDdG9yLnVuZGVyZmxvdyA9IHRydWU7XHJcbiAgICAgIH0gLy8gZWxzZSBDdG9yLnVuZGVyZmxvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGZpbml0ZVRvU3RyaW5nKHgsIGlzRXhwLCBzZCkge1xyXG4gICAgaWYgKCF4LmlzRmluaXRlKCkpIHJldHVybiBub25GaW5pdGVUb1N0cmluZyh4KTtcclxuICAgIHZhciBrLFxyXG4gICAgICBlID0geC5lLFxyXG4gICAgICBzdHIgPSBkaWdpdHNUb1N0cmluZyh4LmQpLFxyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgIGlmIChpc0V4cCkge1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKSArIGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGVuID4gMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5jaGFyQXQoMCkgKyAnLicgKyBzdHIuc2xpY2UoMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IHN0ciArICh4LmUgPCAwID8gJ2UnIDogJ2UrJykgKyB4LmU7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcbiAgICAgIHN0ciA9ICcwLicgKyBnZXRaZXJvU3RyaW5nKC1lIC0gMSkgKyBzdHI7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmIChlID49IGxlbikge1xyXG4gICAgICBzdHIgKz0gZ2V0WmVyb1N0cmluZyhlICsgMSAtIGxlbik7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gZSAtIDEpID4gMCkgc3RyID0gc3RyICsgJy4nICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgoayA9IGUgKyAxKSA8IGxlbikgc3RyID0gc3RyLnNsaWNlKDAsIGspICsgJy4nICsgc3RyLnNsaWNlKGspO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSB7XHJcbiAgICAgICAgaWYgKGUgKyAxID09PSBsZW4pIHN0ciArPSAnLic7XHJcbiAgICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudCBmcm9tIHRoZSBiYXNlIDFlNyBleHBvbmVudC5cclxuICBmdW5jdGlvbiBnZXRCYXNlMTBFeHBvbmVudChkaWdpdHMsIGUpIHtcclxuICAgIHZhciB3ID0gZGlnaXRzWzBdO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgZm9yICggZSAqPSBMT0dfQkFTRTsgdyA+PSAxMDsgdyAvPSAxMCkgZSsrO1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZ2V0TG4xMChDdG9yLCBzZCwgcHIpIHtcclxuICAgIGlmIChzZCA+IExOMTBfUFJFQ0lTSU9OKSB7XHJcblxyXG4gICAgICAvLyBSZXNldCBnbG9iYWwgc3RhdGUgaW4gY2FzZSB0aGUgZXhjZXB0aW9uIGlzIGNhdWdodC5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICBpZiAocHIpIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHRocm93IEVycm9yKHByZWNpc2lvbkxpbWl0RXhjZWVkZWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbmFsaXNlKG5ldyBDdG9yKExOMTApLCBzZCwgMSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UGkoQ3Rvciwgc2QsIHJtKSB7XHJcbiAgICBpZiAoc2QgPiBQSV9QUkVDSVNJT04pIHRocm93IEVycm9yKHByZWNpc2lvbkxpbWl0RXhjZWVkZWQpO1xyXG4gICAgcmV0dXJuIGZpbmFsaXNlKG5ldyBDdG9yKFBJKSwgc2QsIHJtLCB0cnVlKTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRQcmVjaXNpb24oZGlnaXRzKSB7XHJcbiAgICB2YXIgdyA9IGRpZ2l0cy5sZW5ndGggLSAxLFxyXG4gICAgICBsZW4gPSB3ICogTE9HX0JBU0UgKyAxO1xyXG5cclxuICAgIHcgPSBkaWdpdHNbd107XHJcblxyXG4gICAgLy8gSWYgbm9uLXplcm8uLi5cclxuICAgIGlmICh3KSB7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IHdvcmQuXHJcbiAgICAgIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgbGVuLS07XHJcblxyXG4gICAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQuXHJcbiAgICAgIGZvciAodyA9IGRpZ2l0c1swXTsgdyA+PSAxMDsgdyAvPSAxMCkgbGVuKys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxlbjtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRaZXJvU3RyaW5nKGspIHtcclxuICAgIHZhciB6cyA9ICcnO1xyXG4gICAgZm9yICg7IGstLTspIHpzICs9ICcwJztcclxuICAgIHJldHVybiB6cztcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiBEZWNpbWFsIGB4YCB0byB0aGUgcG93ZXIgYG5gLCB3aGVyZSBgbmAgaXMgYW5cclxuICAgKiBpbnRlZ2VyIG9mIHR5cGUgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogSW1wbGVtZW50cyAnZXhwb25lbnRpYXRpb24gYnkgc3F1YXJpbmcnLiBDYWxsZWQgYnkgYHBvd2AgYW5kIGBwYXJzZU90aGVyYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGludFBvdyhDdG9yLCB4LCBuLCBwcikge1xyXG4gICAgdmFyIGlzVHJ1bmNhdGVkLFxyXG4gICAgICByID0gbmV3IEN0b3IoMSksXHJcblxyXG4gICAgICAvLyBNYXggbiBvZiA5MDA3MTk5MjU0NzQwOTkxIHRha2VzIDUzIGxvb3AgaXRlcmF0aW9ucy5cclxuICAgICAgLy8gTWF4aW11bSBkaWdpdHMgYXJyYXkgbGVuZ3RoOyBsZWF2ZXMgWzI4LCAzNF0gZ3VhcmQgZGlnaXRzLlxyXG4gICAgICBrID0gTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UgKyA0KTtcclxuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgaWYgKG4gJSAyKSB7XHJcbiAgICAgICAgciA9IHIudGltZXMoeCk7XHJcbiAgICAgICAgaWYgKHRydW5jYXRlKHIuZCwgaykpIGlzVHJ1bmNhdGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbiA9IG1hdGhmbG9vcihuIC8gMik7XHJcbiAgICAgIGlmIChuID09PSAwKSB7XHJcblxyXG4gICAgICAgIC8vIFRvIGVuc3VyZSBjb3JyZWN0IHJvdW5kaW5nIHdoZW4gci5kIGlzIHRydW5jYXRlZCwgaW5jcmVtZW50IHRoZSBsYXN0IHdvcmQgaWYgaXQgaXMgemVyby5cclxuICAgICAgICBuID0gci5kLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGlzVHJ1bmNhdGVkICYmIHIuZFtuXSA9PT0gMCkgKytyLmRbbl07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHggPSB4LnRpbWVzKHgpO1xyXG4gICAgICB0cnVuY2F0ZSh4LmQsIGspO1xyXG4gICAgfVxyXG5cclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBpc09kZChuKSB7XHJcbiAgICByZXR1cm4gbi5kW24uZC5sZW5ndGggLSAxXSAmIDE7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBIYW5kbGUgYG1heGAgYW5kIGBtaW5gLiBgbHRndGAgaXMgJ2x0JyBvciAnZ3QnLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG1heE9yTWluKEN0b3IsIGFyZ3MsIGx0Z3QpIHtcclxuICAgIHZhciB5LFxyXG4gICAgICB4ID0gbmV3IEN0b3IoYXJnc1swXSksXHJcbiAgICAgIGkgPSAwO1xyXG5cclxuICAgIGZvciAoOyArK2kgPCBhcmdzLmxlbmd0aDspIHtcclxuICAgICAgeSA9IG5ldyBDdG9yKGFyZ3NbaV0pO1xyXG4gICAgICBpZiAoIXkucykge1xyXG4gICAgICAgIHggPSB5O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2UgaWYgKHhbbHRndF0oeSkpIHtcclxuICAgICAgICB4ID0geTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgYHhgIHJvdW5kZWQgdG8gYHNkYCBzaWduaWZpY2FudFxyXG4gICAqIGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIFRheWxvci9NYWNsYXVyaW4gc2VyaWVzLlxyXG4gICAqXHJcbiAgICogZXhwKHgpID0geF4wLzAhICsgeF4xLzEhICsgeF4yLzIhICsgeF4zLzMhICsgLi4uXHJcbiAgICpcclxuICAgKiBBcmd1bWVudCByZWR1Y3Rpb246XHJcbiAgICogICBSZXBlYXQgeCA9IHggLyAzMiwgayArPSA1LCB1bnRpbCB8eHwgPCAwLjFcclxuICAgKiAgIGV4cCh4KSA9IGV4cCh4IC8gMl5rKV4oMl5rKVxyXG4gICAqXHJcbiAgICogUHJldmlvdXNseSwgdGhlIGFyZ3VtZW50IHdhcyBpbml0aWFsbHkgcmVkdWNlZCBieVxyXG4gICAqIGV4cCh4KSA9IGV4cChyKSAqIDEwXmsgIHdoZXJlIHIgPSB4IC0gayAqIGxuMTAsIGsgPSBmbG9vcih4IC8gbG4xMClcclxuICAgKiB0byBmaXJzdCBwdXQgciBpbiB0aGUgcmFuZ2UgWzAsIGxuMTBdLCBiZWZvcmUgZGl2aWRpbmcgYnkgMzIgdW50aWwgfHh8IDwgMC4xLCBidXQgdGhpcyB3YXNcclxuICAgKiBmb3VuZCB0byBiZSBzbG93ZXIgdGhhbiBqdXN0IGRpdmlkaW5nIHJlcGVhdGVkbHkgYnkgMzIgYXMgYWJvdmUuXHJcbiAgICpcclxuICAgKiBNYXggaW50ZWdlciBhcmd1bWVudDogZXhwKCcyMDcyMzI2NTgzNjk0NjQxMycpID0gNi4zZSs5MDAwMDAwMDAwMDAwMDAwXHJcbiAgICogTWluIGludGVnZXIgYXJndW1lbnQ6IGV4cCgnLTIwNzIzMjY1ODM2OTQ2NDExJykgPSAxLjJlLTkwMDAwMDAwMDAwMDAwMDBcclxuICAgKiAoTWF0aCBvYmplY3QgaW50ZWdlciBtaW4vbWF4OiBNYXRoLmV4cCg3MDkpID0gOC4yZSszMDcsIE1hdGguZXhwKC03NDUpID0gNWUtMzI0KVxyXG4gICAqXHJcbiAgICogIGV4cChJbmZpbml0eSkgID0gSW5maW5pdHlcclxuICAgKiAgZXhwKC1JbmZpbml0eSkgPSAwXHJcbiAgICogIGV4cChOYU4pICAgICAgID0gTmFOXHJcbiAgICogIGV4cCjCsTApICAgICAgICA9IDFcclxuICAgKlxyXG4gICAqICBleHAoeCkgaXMgbm9uLXRlcm1pbmF0aW5nIGZvciBhbnkgZmluaXRlLCBub24temVybyB4LlxyXG4gICAqXHJcbiAgICogIFRoZSByZXN1bHQgd2lsbCBhbHdheXMgYmUgY29ycmVjdGx5IHJvdW5kZWQuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBuYXR1cmFsRXhwb25lbnRpYWwoeCwgc2QpIHtcclxuICAgIHZhciBkZW5vbWluYXRvciwgZ3VhcmQsIGosIHBvdywgc3VtLCB0LCB3cHIsXHJcbiAgICAgIHJlcCA9IDAsXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBrID0gMCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZyxcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyAwL05hTi9JbmZpbml0eT9cclxuICAgIGlmICgheC5kIHx8ICF4LmRbMF0gfHwgeC5lID4gMTcpIHtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgQ3Rvcih4LmRcclxuICAgICAgICA/ICF4LmRbMF0gPyAxIDogeC5zIDwgMCA/IDAgOiAxIC8gMFxyXG4gICAgICAgIDogeC5zID8geC5zIDwgMCA/IDAgOiB4IDogMCAvIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZCA9PSBudWxsKSB7XHJcbiAgICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICAgIHdwciA9IHByO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3ByID0gc2Q7XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IG5ldyBDdG9yKDAuMDMxMjUpO1xyXG5cclxuICAgIC8vIHdoaWxlIGFicyh4KSA+PSAwLjFcclxuICAgIHdoaWxlICh4LmUgPiAtMikge1xyXG5cclxuICAgICAgLy8geCA9IHggLyAyXjVcclxuICAgICAgeCA9IHgudGltZXModCk7XHJcbiAgICAgIGsgKz0gNTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVc2UgMiAqIGxvZzEwKDJeaykgKyA1IChlbXBpcmljYWxseSBkZXJpdmVkKSB0byBlc3RpbWF0ZSB0aGUgaW5jcmVhc2UgaW4gcHJlY2lzaW9uXHJcbiAgICAvLyBuZWNlc3NhcnkgdG8gZW5zdXJlIHRoZSBmaXJzdCA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgY29ycmVjdC5cclxuICAgIGd1YXJkID0gTWF0aC5sb2cobWF0aHBvdygyLCBrKSkgLyBNYXRoLkxOMTAgKiAyICsgNSB8IDA7XHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBkZW5vbWluYXRvciA9IHBvdyA9IHN1bSA9IG5ldyBDdG9yKDEpO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHI7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBwb3cgPSBmaW5hbGlzZShwb3cudGltZXMoeCksIHdwciwgMSk7XHJcbiAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IudGltZXMoKytpKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShwb3csIGRlbm9taW5hdG9yLCB3cHIsIDEpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgaiA9IGs7XHJcbiAgICAgICAgd2hpbGUgKGotLSkgc3VtID0gZmluYWxpc2Uoc3VtLnRpbWVzKHN1bSksIHdwciwgMSk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZmlyc3QgNCByb3VuZGluZyBkaWdpdHMgYXJlIFs0OV05OTkuXHJcbiAgICAgICAgLy8gSWYgc28sIHJlcGVhdCB0aGUgc3VtbWF0aW9uIHdpdGggYSBoaWdoZXIgcHJlY2lzaW9uLCBvdGhlcndpc2VcclxuICAgICAgICAvLyBlLmcuIHdpdGggcHJlY2lzaW9uOiAxOCwgcm91bmRpbmc6IDFcclxuICAgICAgICAvLyBleHAoMTguNDA0MjcyNDYyNTk1MDM0MDgzNTY3NzkzOTE5ODQzNzYxKSA9IDk4MzcyNTYwLjEyMjk5OTk5OTkgKHNob3VsZCBiZSA5ODM3MjU2MC4xMjMpXHJcbiAgICAgICAgLy8gYHdwciAtIGd1YXJkYCBpcyB0aGUgaW5kZXggb2YgZmlyc3Qgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgaWYgKHNkID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICBpZiAocmVwIDwgMyAmJiBjaGVja1JvdW5kaW5nRGlnaXRzKHN1bS5kLCB3cHIgLSBndWFyZCwgcm0sIHJlcCkpIHtcclxuICAgICAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSB3cHIgKz0gMTA7XHJcbiAgICAgICAgICAgIGRlbm9taW5hdG9yID0gcG93ID0gdCA9IG5ldyBDdG9yKDEpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgcmVwKys7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmluYWxpc2Uoc3VtLCBDdG9yLnByZWNpc2lvbiA9IHByLCBybSwgZXh0ZXJuYWwgPSB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICAgIHJldHVybiBzdW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGB4YCByb3VuZGVkIHRvIGBzZGAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMuXHJcbiAgICpcclxuICAgKiAgbG4oLW4pICAgICAgICA9IE5hTlxyXG4gICAqICBsbigwKSAgICAgICAgID0gLUluZmluaXR5XHJcbiAgICogIGxuKC0wKSAgICAgICAgPSAtSW5maW5pdHlcclxuICAgKiAgbG4oMSkgICAgICAgICA9IDBcclxuICAgKiAgbG4oSW5maW5pdHkpICA9IEluZmluaXR5XHJcbiAgICogIGxuKC1JbmZpbml0eSkgPSBOYU5cclxuICAgKiAgbG4oTmFOKSAgICAgICA9IE5hTlxyXG4gICAqXHJcbiAgICogIGxuKG4pIChuICE9IDEpIGlzIG5vbi10ZXJtaW5hdGluZy5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG5hdHVyYWxMb2dhcml0aG0oeSwgc2QpIHtcclxuICAgIHZhciBjLCBjMCwgZGVub21pbmF0b3IsIGUsIG51bWVyYXRvciwgcmVwLCBzdW0sIHQsIHdwciwgeDEsIHgyLFxyXG4gICAgICBuID0gMSxcclxuICAgICAgZ3VhcmQgPSAxMCxcclxuICAgICAgeCA9IHksXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIElzIHggbmVnYXRpdmUgb3IgSW5maW5pdHksIE5hTiwgMCBvciAxP1xyXG4gICAgaWYgKHgucyA8IDAgfHwgIXhkIHx8ICF4ZFswXSB8fCAheC5lICYmIHhkWzBdID09IDEgJiYgeGQubGVuZ3RoID09IDEpIHtcclxuICAgICAgcmV0dXJuIG5ldyBDdG9yKHhkICYmICF4ZFswXSA/IC0xIC8gMCA6IHgucyAhPSAxID8gTmFOIDogeGQgPyAwIDogeCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNkID09IG51bGwpIHtcclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgICAgd3ByID0gcHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cHIgPSBzZDtcclxuICAgIH1cclxuXHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwciArPSBndWFyZDtcclxuICAgIGMgPSBkaWdpdHNUb1N0cmluZyh4ZCk7XHJcbiAgICBjMCA9IGMuY2hhckF0KDApO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhlID0geC5lKSA8IDEuNWUxNSkge1xyXG5cclxuICAgICAgLy8gQXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAvLyBUaGUgc2VyaWVzIGNvbnZlcmdlcyBmYXN0ZXIgdGhlIGNsb3NlciB0aGUgYXJndW1lbnQgaXMgdG8gMSwgc28gdXNpbmdcclxuICAgICAgLy8gbG4oYV5iKSA9IGIgKiBsbihhKSwgICBsbihhKSA9IGxuKGFeYikgLyBiXHJcbiAgICAgIC8vIG11bHRpcGx5IHRoZSBhcmd1bWVudCBieSBpdHNlbGYgdW50aWwgdGhlIGxlYWRpbmcgZGlnaXRzIG9mIHRoZSBzaWduaWZpY2FuZCBhcmUgNywgOCwgOSxcclxuICAgICAgLy8gMTAsIDExLCAxMiBvciAxMywgcmVjb3JkaW5nIHRoZSBudW1iZXIgb2YgbXVsdGlwbGljYXRpb25zIHNvIHRoZSBzdW0gb2YgdGhlIHNlcmllcyBjYW5cclxuICAgICAgLy8gbGF0ZXIgYmUgZGl2aWRlZCBieSB0aGlzIG51bWJlciwgdGhlbiBzZXBhcmF0ZSBvdXQgdGhlIHBvd2VyIG9mIDEwIHVzaW5nXHJcbiAgICAgIC8vIGxuKGEqMTBeYikgPSBsbihhKSArIGIqbG4oMTApLlxyXG5cclxuICAgICAgLy8gbWF4IG4gaXMgMjEgKGdpdmVzIDAuOSwgMS4wIG9yIDEuMSkgKDllMTUgLyAyMSA9IDQuMmUxNCkuXHJcbiAgICAgIC8vd2hpbGUgKGMwIDwgOSAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAxKSB7XHJcbiAgICAgIC8vIG1heCBuIGlzIDYgKGdpdmVzIDAuNyAtIDEuMylcclxuICAgICAgd2hpbGUgKGMwIDwgNyAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAzKSB7XHJcbiAgICAgICAgeCA9IHgudGltZXMoeSk7XHJcbiAgICAgICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgICAgYzAgPSBjLmNoYXJBdCgwKTtcclxuICAgICAgICBuKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGUgPSB4LmU7XHJcblxyXG4gICAgICBpZiAoYzAgPiAxKSB7XHJcbiAgICAgICAgeCA9IG5ldyBDdG9yKCcwLicgKyBjKTtcclxuICAgICAgICBlKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IG5ldyBDdG9yKGMwICsgJy4nICsgYy5zbGljZSgxKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBUaGUgYXJndW1lbnQgcmVkdWN0aW9uIG1ldGhvZCBhYm92ZSBtYXkgcmVzdWx0IGluIG92ZXJmbG93IGlmIHRoZSBhcmd1bWVudCB5IGlzIGEgbWFzc2l2ZVxyXG4gICAgICAvLyBudW1iZXIgd2l0aCBleHBvbmVudCA+PSAxNTAwMDAwMDAwMDAwMDAwICg5ZTE1IC8gNiA9IDEuNWUxNSksIHNvIGluc3RlYWQgcmVjYWxsIHRoaXNcclxuICAgICAgLy8gZnVuY3Rpb24gdXNpbmcgbG4oeCoxMF5lKSA9IGxuKHgpICsgZSpsbigxMCkuXHJcbiAgICAgIHQgPSBnZXRMbjEwKEN0b3IsIHdwciArIDIsIHByKS50aW1lcyhlICsgJycpO1xyXG4gICAgICB4ID0gbmF0dXJhbExvZ2FyaXRobShuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpLCB3cHIgLSBndWFyZCkucGx1cyh0KTtcclxuICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuXHJcbiAgICAgIHJldHVybiBzZCA9PSBudWxsID8gZmluYWxpc2UoeCwgcHIsIHJtLCBleHRlcm5hbCA9IHRydWUpIDogeDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB4MSBpcyB4IHJlZHVjZWQgdG8gYSB2YWx1ZSBuZWFyIDEuXHJcbiAgICB4MSA9IHg7XHJcblxyXG4gICAgLy8gVGF5bG9yIHNlcmllcy5cclxuICAgIC8vIGxuKHkpID0gbG4oKDEgKyB4KS8oMSAtIHgpKSA9IDIoeCArIHheMy8zICsgeF41LzUgKyB4XjcvNyArIC4uLilcclxuICAgIC8vIHdoZXJlIHggPSAoeSAtIDEpLyh5ICsgMSkgICAgKHx4fCA8IDEpXHJcbiAgICBzdW0gPSBudW1lcmF0b3IgPSB4ID0gZGl2aWRlKHgubWludXMoMSksIHgucGx1cygxKSwgd3ByLCAxKTtcclxuICAgIHgyID0gZmluYWxpc2UoeC50aW1lcyh4KSwgd3ByLCAxKTtcclxuICAgIGRlbm9taW5hdG9yID0gMztcclxuXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIG51bWVyYXRvciA9IGZpbmFsaXNlKG51bWVyYXRvci50aW1lcyh4MiksIHdwciwgMSk7XHJcbiAgICAgIHQgPSBzdW0ucGx1cyhkaXZpZGUobnVtZXJhdG9yLCBuZXcgQ3RvcihkZW5vbWluYXRvciksIHdwciwgMSkpO1xyXG5cclxuICAgICAgaWYgKGRpZ2l0c1RvU3RyaW5nKHQuZCkuc2xpY2UoMCwgd3ByKSA9PT0gZGlnaXRzVG9TdHJpbmcoc3VtLmQpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICBzdW0gPSBzdW0udGltZXMoMik7XHJcblxyXG4gICAgICAgIC8vIFJldmVyc2UgdGhlIGFyZ3VtZW50IHJlZHVjdGlvbi4gQ2hlY2sgdGhhdCBlIGlzIG5vdCAwIGJlY2F1c2UsIGJlc2lkZXMgcHJldmVudGluZyBhblxyXG4gICAgICAgIC8vIHVubmVjZXNzYXJ5IGNhbGN1bGF0aW9uLCAtMCArIDAgPSArMCBhbmQgdG8gZW5zdXJlIGNvcnJlY3Qgcm91bmRpbmcgLTAgbmVlZHMgdG8gc3RheSAtMC5cclxuICAgICAgICBpZiAoZSAhPT0gMCkgc3VtID0gc3VtLnBsdXMoZ2V0TG4xMChDdG9yLCB3cHIgKyAyLCBwcikudGltZXMoZSArICcnKSk7XHJcbiAgICAgICAgc3VtID0gZGl2aWRlKHN1bSwgbmV3IEN0b3IobiksIHdwciwgMSk7XHJcblxyXG4gICAgICAgIC8vIElzIHJtID4gMyBhbmQgdGhlIGZpcnN0IDQgcm91bmRpbmcgZGlnaXRzIDQ5OTksIG9yIHJtIDwgNCAob3IgdGhlIHN1bW1hdGlvbiBoYXNcclxuICAgICAgICAvLyBiZWVuIHJlcGVhdGVkIHByZXZpb3VzbHkpIGFuZCB0aGUgZmlyc3QgNCByb3VuZGluZyBkaWdpdHMgOTk5OT9cclxuICAgICAgICAvLyBJZiBzbywgcmVzdGFydCB0aGUgc3VtbWF0aW9uIHdpdGggYSBoaWdoZXIgcHJlY2lzaW9uLCBvdGhlcndpc2VcclxuICAgICAgICAvLyBlLmcuIHdpdGggcHJlY2lzaW9uOiAxMiwgcm91bmRpbmc6IDFcclxuICAgICAgICAvLyBsbigxMzU1MjAwMjguNjEyNjA5MTcxNDI2NTM4MTUzMykgPSAxOC43MjQ2Mjk5OTk5IHdoZW4gaXQgc2hvdWxkIGJlIDE4LjcyNDYzLlxyXG4gICAgICAgIC8vIGB3cHIgLSBndWFyZGAgaXMgdGhlIGluZGV4IG9mIGZpcnN0IHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgIGlmIChzZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAoY2hlY2tSb3VuZGluZ0RpZ2l0cyhzdW0uZCwgd3ByIC0gZ3VhcmQsIHJtLCByZXApKSB7XHJcbiAgICAgICAgICAgIEN0b3IucHJlY2lzaW9uID0gd3ByICs9IGd1YXJkO1xyXG4gICAgICAgICAgICB0ID0gbnVtZXJhdG9yID0geCA9IGRpdmlkZSh4MS5taW51cygxKSwgeDEucGx1cygxKSwgd3ByLCAxKTtcclxuICAgICAgICAgICAgeDIgPSBmaW5hbGlzZSh4LnRpbWVzKHgpLCB3cHIsIDEpO1xyXG4gICAgICAgICAgICBkZW5vbWluYXRvciA9IHJlcCA9IDE7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmluYWxpc2Uoc3VtLCBDdG9yLnByZWNpc2lvbiA9IHByLCBybSwgZXh0ZXJuYWwgPSB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICAgIHJldHVybiBzdW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgICBkZW5vbWluYXRvciArPSAyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIMKxSW5maW5pdHksIE5hTi5cclxuICBmdW5jdGlvbiBub25GaW5pdGVUb1N0cmluZyh4KSB7XHJcbiAgICAvLyBVbnNpZ25lZC5cclxuICAgIHJldHVybiBTdHJpbmcoeC5zICogeC5zIC8gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBQYXJzZSB0aGUgdmFsdWUgb2YgYSBuZXcgRGVjaW1hbCBgeGAgZnJvbSBzdHJpbmcgYHN0cmAuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcGFyc2VEZWNpbWFsKHgsIHN0cikge1xyXG4gICAgdmFyIGUsIGksIGxlbjtcclxuXHJcbiAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgaWYgKChlID0gc3RyLmluZGV4T2YoJy4nKSkgPiAtMSkgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgLy8gRXhwb25lbnRpYWwgZm9ybT9cclxuICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGV4cG9uZW50LlxyXG4gICAgICBpZiAoZSA8IDApIGUgPSBpO1xyXG4gICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGkpO1xyXG4gICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgZSA9IHN0ci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MuXHJcbiAgICBmb3IgKGkgPSAwOyBzdHIuY2hhckNvZGVBdChpKSA9PT0gNDg7IGkrKyk7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBzdHIuY2hhckNvZGVBdChsZW4gLSAxKSA9PT0gNDg7IC0tbGVuKTtcclxuICAgIHN0ciA9IHN0ci5zbGljZShpLCBsZW4pO1xyXG5cclxuICAgIGlmIChzdHIpIHtcclxuICAgICAgbGVuIC09IGk7XHJcbiAgICAgIHguZSA9IGUgPSBlIC0gaSAtIDE7XHJcbiAgICAgIHguZCA9IFtdO1xyXG5cclxuICAgICAgLy8gVHJhbnNmb3JtIGJhc2VcclxuXHJcbiAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgIC8vIGkgaXMgd2hlcmUgdG8gc2xpY2Ugc3RyIHRvIGdldCB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICBpZiAoZSA8IDApIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgIGlmIChpKSB4LmQucHVzaCgrc3RyLnNsaWNlKDAsIGkpKTtcclxuICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHguZC5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShpKTtcclxuICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgLT0gbGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKDsgaS0tOykgc3RyICs9ICcwJztcclxuICAgICAgeC5kLnB1c2goK3N0cik7XHJcblxyXG4gICAgICBpZiAoZXh0ZXJuYWwpIHtcclxuXHJcbiAgICAgICAgLy8gT3ZlcmZsb3c/XHJcbiAgICAgICAgaWYgKHguZSA+IHguY29uc3RydWN0b3IubWF4RSkge1xyXG5cclxuICAgICAgICAgIC8vIEluZmluaXR5LlxyXG4gICAgICAgICAgeC5kID0gbnVsbDtcclxuICAgICAgICAgIHguZSA9IE5hTjtcclxuXHJcbiAgICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeC5lIDwgeC5jb25zdHJ1Y3Rvci5taW5FKSB7XHJcblxyXG4gICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbMF07XHJcbiAgICAgICAgICAvLyB4LmNvbnN0cnVjdG9yLnVuZGVyZmxvdyA9IHRydWU7XHJcbiAgICAgICAgfSAvLyBlbHNlIHguY29uc3RydWN0b3IudW5kZXJmbG93ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBaZXJvLlxyXG4gICAgICB4LmUgPSAwO1xyXG4gICAgICB4LmQgPSBbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBQYXJzZSB0aGUgdmFsdWUgb2YgYSBuZXcgRGVjaW1hbCBgeGAgZnJvbSBhIHN0cmluZyBgc3RyYCwgd2hpY2ggaXMgbm90IGEgZGVjaW1hbCB2YWx1ZS5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwYXJzZU90aGVyKHgsIHN0cikge1xyXG4gICAgdmFyIGJhc2UsIEN0b3IsIGRpdmlzb3IsIGksIGlzRmxvYXQsIGxlbiwgcCwgeGQsIHhlO1xyXG5cclxuICAgIGlmIChzdHIgPT09ICdJbmZpbml0eScgfHwgc3RyID09PSAnTmFOJykge1xyXG4gICAgICBpZiAoIStzdHIpIHgucyA9IE5hTjtcclxuICAgICAgeC5lID0gTmFOO1xyXG4gICAgICB4LmQgPSBudWxsO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNIZXgudGVzdChzdHIpKSAge1xyXG4gICAgICBiYXNlID0gMTY7XHJcbiAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfSBlbHNlIGlmIChpc0JpbmFyeS50ZXN0KHN0cikpICB7XHJcbiAgICAgIGJhc2UgPSAyO1xyXG4gICAgfSBlbHNlIGlmIChpc09jdGFsLnRlc3Qoc3RyKSkgIHtcclxuICAgICAgYmFzZSA9IDg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyBzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElzIHRoZXJlIGEgYmluYXJ5IGV4cG9uZW50IHBhcnQ/XHJcbiAgICBpID0gc3RyLnNlYXJjaCgvcC9pKTtcclxuXHJcbiAgICBpZiAoaSA+IDApIHtcclxuICAgICAgcCA9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDIsIGkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RyID0gc3RyLnNsaWNlKDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnZlcnQgYHN0cmAgYXMgYW4gaW50ZWdlciB0aGVuIGRpdmlkZSB0aGUgcmVzdWx0IGJ5IGBiYXNlYCByYWlzZWQgdG8gYSBwb3dlciBzdWNoIHRoYXQgdGhlXHJcbiAgICAvLyBmcmFjdGlvbiBwYXJ0IHdpbGwgYmUgcmVzdG9yZWQuXHJcbiAgICBpID0gc3RyLmluZGV4T2YoJy4nKTtcclxuICAgIGlzRmxvYXQgPSBpID49IDA7XHJcbiAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoaXNGbG9hdCkge1xyXG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgaSA9IGxlbiAtIGk7XHJcblxyXG4gICAgICAvLyBsb2dbMTBdKDE2KSA9IDEuMjA0MS4uLiAsIGxvZ1sxMF0oODgpID0gMS45NDQ0Li4uLlxyXG4gICAgICBkaXZpc29yID0gaW50UG93KEN0b3IsIG5ldyBDdG9yKGJhc2UpLCBpLCBpICogMik7XHJcbiAgICB9XHJcblxyXG4gICAgeGQgPSBjb252ZXJ0QmFzZShzdHIsIGJhc2UsIEJBU0UpO1xyXG4gICAgeGUgPSB4ZC5sZW5ndGggLSAxO1xyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IHhlOyB4ZFtpXSA9PT0gMDsgLS1pKSB4ZC5wb3AoKTtcclxuICAgIGlmIChpIDwgMCkgcmV0dXJuIG5ldyBDdG9yKHgucyAqIDApO1xyXG4gICAgeC5lID0gZ2V0QmFzZTEwRXhwb25lbnQoeGQsIHhlKTtcclxuICAgIHguZCA9IHhkO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBBdCB3aGF0IHByZWNpc2lvbiB0byBwZXJmb3JtIHRoZSBkaXZpc2lvbiB0byBlbnN1cmUgZXhhY3QgY29udmVyc2lvbj9cclxuICAgIC8vIG1heERlY2ltYWxJbnRlZ2VyUGFydERpZ2l0Q291bnQgPSBjZWlsKGxvZ1sxMF0oYikgKiBvdGhlckJhc2VJbnRlZ2VyUGFydERpZ2l0Q291bnQpXHJcbiAgICAvLyBsb2dbMTBdKDIpID0gMC4zMDEwMywgbG9nWzEwXSg4KSA9IDAuOTAzMDksIGxvZ1sxMF0oMTYpID0gMS4yMDQxMlxyXG4gICAgLy8gRS5nLiBjZWlsKDEuMiAqIDMpID0gNCwgc28gdXAgdG8gNCBkZWNpbWFsIGRpZ2l0cyBhcmUgbmVlZGVkIHRvIHJlcHJlc2VudCAzIGhleCBpbnQgZGlnaXRzLlxyXG4gICAgLy8gbWF4RGVjaW1hbEZyYWN0aW9uUGFydERpZ2l0Q291bnQgPSB7SGV4OjR8T2N0OjN8QmluOjF9ICogb3RoZXJCYXNlRnJhY3Rpb25QYXJ0RGlnaXRDb3VudFxyXG4gICAgLy8gVGhlcmVmb3JlIHVzaW5nIDQgKiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBzdHIgd2lsbCBhbHdheXMgYmUgZW5vdWdoLlxyXG4gICAgaWYgKGlzRmxvYXQpIHggPSBkaXZpZGUoeCwgZGl2aXNvciwgbGVuICogNCk7XHJcblxyXG4gICAgLy8gTXVsdGlwbHkgYnkgdGhlIGJpbmFyeSBleHBvbmVudCBwYXJ0IGlmIHByZXNlbnQuXHJcbiAgICBpZiAocCkgeCA9IHgudGltZXMoTWF0aC5hYnMocCkgPCA1NCA/IE1hdGgucG93KDIsIHApIDogRGVjaW1hbC5wb3coMiwgcCkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogc2luKHgpID0geCAtIHheMy8zISArIHheNS81ISAtIC4uLlxyXG4gICAqIHx4fCA8IHBpLzJcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNpbmUoQ3RvciwgeCkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgIGxlbiA9IHguZC5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbiA8IDMpIHJldHVybiB0YXlsb3JTZXJpZXMoQ3RvciwgMiwgeCwgeCk7XHJcblxyXG4gICAgLy8gQXJndW1lbnQgcmVkdWN0aW9uOiBzaW4oNXgpID0gMTYqc2luXjUoeCkgLSAyMCpzaW5eMyh4KSArIDUqc2luKHgpXHJcbiAgICAvLyBpLmUuIHNpbih4KSA9IDE2KnNpbl41KHgvNSkgLSAyMCpzaW5eMyh4LzUpICsgNSpzaW4oeC81KVxyXG4gICAgLy8gYW5kICBzaW4oeCkgPSBzaW4oeC81KSg1ICsgc2luXjIoeC81KSgxNnNpbl4yKHgvNSkgLSAyMCkpXHJcblxyXG4gICAgLy8gRXN0aW1hdGUgdGhlIG9wdGltdW0gbnVtYmVyIG9mIHRpbWVzIHRvIHVzZSB0aGUgYXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgayA9IDEuNCAqIE1hdGguc3FydChsZW4pO1xyXG4gICAgayA9IGsgPiAxNiA/IDE2IDogayB8IDA7XHJcblxyXG4gICAgLy8gTWF4IGsgYmVmb3JlIE1hdGgucG93IHByZWNpc2lvbiBsb3NzIGlzIDIyXHJcbiAgICB4ID0geC50aW1lcyhNYXRoLnBvdyg1LCAtaykpO1xyXG4gICAgeCA9IHRheWxvclNlcmllcyhDdG9yLCAyLCB4LCB4KTtcclxuXHJcbiAgICAvLyBSZXZlcnNlIGFyZ3VtZW50IHJlZHVjdGlvblxyXG4gICAgdmFyIHNpbjJfeCxcclxuICAgICAgZDUgPSBuZXcgQ3Rvcig1KSxcclxuICAgICAgZDE2ID0gbmV3IEN0b3IoMTYpLFxyXG4gICAgICBkMjAgPSBuZXcgQ3RvcigyMCk7XHJcbiAgICBmb3IgKDsgay0tOykge1xyXG4gICAgICBzaW4yX3ggPSB4LnRpbWVzKHgpO1xyXG4gICAgICB4ID0geC50aW1lcyhkNS5wbHVzKHNpbjJfeC50aW1lcyhkMTYudGltZXMoc2luMl94KS5taW51cyhkMjApKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENhbGN1bGF0ZSBUYXlsb3Igc2VyaWVzIGZvciBgY29zYCwgYGNvc2hgLCBgc2luYCBhbmQgYHNpbmhgLlxyXG4gIGZ1bmN0aW9uIHRheWxvclNlcmllcyhDdG9yLCBuLCB4LCB5LCBpc0h5cGVyYm9saWMpIHtcclxuICAgIHZhciBqLCB0LCB1LCB4MixcclxuICAgICAgaSA9IDEsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb24sXHJcbiAgICAgIGsgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHgyID0geC50aW1lcyh4KTtcclxuICAgIHUgPSBuZXcgQ3Rvcih5KTtcclxuXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIHQgPSBkaXZpZGUodS50aW1lcyh4MiksIG5ldyBDdG9yKG4rKyAqIG4rKyksIHByLCAxKTtcclxuICAgICAgdSA9IGlzSHlwZXJib2xpYyA/IHkucGx1cyh0KSA6IHkubWludXModCk7XHJcbiAgICAgIHkgPSBkaXZpZGUodC50aW1lcyh4MiksIG5ldyBDdG9yKG4rKyAqIG4rKyksIHByLCAxKTtcclxuICAgICAgdCA9IHUucGx1cyh5KTtcclxuXHJcbiAgICAgIGlmICh0LmRba10gIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGZvciAoaiA9IGs7IHQuZFtqXSA9PT0gdS5kW2pdICYmIGotLTspO1xyXG4gICAgICAgIGlmIChqID09IC0xKSBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgaiA9IHU7XHJcbiAgICAgIHUgPSB5O1xyXG4gICAgICB5ID0gdDtcclxuICAgICAgdCA9IGo7XHJcbiAgICAgIGkrKztcclxuICAgIH1cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcbiAgICB0LmQubGVuZ3RoID0gayArIDE7XHJcblxyXG4gICAgcmV0dXJuIHQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiBgeGAgcmVkdWNlZCB0byBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gaGFsZiBwaS5cclxuICBmdW5jdGlvbiB0b0xlc3NUaGFuSGFsZlBpKEN0b3IsIHgpIHtcclxuICAgIHZhciB0LFxyXG4gICAgICBpc05lZyA9IHgucyA8IDAsXHJcbiAgICAgIHBpID0gZ2V0UGkoQ3RvciwgQ3Rvci5wcmVjaXNpb24sIDEpLFxyXG4gICAgICBoYWxmUGkgPSBwaS50aW1lcygwLjUpO1xyXG5cclxuICAgIHggPSB4LmFicygpO1xyXG5cclxuICAgIGlmICh4Lmx0ZShoYWxmUGkpKSB7XHJcbiAgICAgIHF1YWRyYW50ID0gaXNOZWcgPyA0IDogMTtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IHguZGl2VG9JbnQocGkpO1xyXG5cclxuICAgIGlmICh0LmlzWmVybygpKSB7XHJcbiAgICAgIHF1YWRyYW50ID0gaXNOZWcgPyAzIDogMjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHggPSB4Lm1pbnVzKHQudGltZXMocGkpKTtcclxuXHJcbiAgICAgIC8vIDAgPD0geCA8IHBpXHJcbiAgICAgIGlmICh4Lmx0ZShoYWxmUGkpKSB7XHJcbiAgICAgICAgcXVhZHJhbnQgPSBpc09kZCh0KSA/IChpc05lZyA/IDIgOiAzKSA6IChpc05lZyA/IDQgOiAxKTtcclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcXVhZHJhbnQgPSBpc09kZCh0KSA/IChpc05lZyA/IDEgOiA0KSA6IChpc05lZyA/IDMgOiAyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geC5taW51cyhwaSkuYWJzKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIERlY2ltYWwgYHhgIGFzIGEgc3RyaW5nIGluIGJhc2UgYGJhc2VPdXRgLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIG9wdGlvbmFsIGBzZGAgYXJndW1lbnQgaXMgcHJlc2VudCBpbmNsdWRlIGEgYmluYXJ5IGV4cG9uZW50IHN1ZmZpeC5cclxuICAgKi9cclxuICBmdW5jdGlvbiB0b1N0cmluZ0JpbmFyeSh4LCBiYXNlT3V0LCBzZCwgcm0pIHtcclxuICAgIHZhciBiYXNlLCBlLCBpLCBrLCBsZW4sIHJvdW5kVXAsIHN0ciwgeGQsIHksXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBpc0V4cCA9IHNkICE9PSB2b2lkIDA7XHJcblxyXG4gICAgaWYgKGlzRXhwKSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2QgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgheC5pc0Zpbml0ZSgpKSB7XHJcbiAgICAgIHN0ciA9IG5vbkZpbml0ZVRvU3RyaW5nKHgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RyID0gZmluaXRlVG9TdHJpbmcoeCk7XHJcbiAgICAgIGkgPSBzdHIuaW5kZXhPZignLicpO1xyXG5cclxuICAgICAgLy8gVXNlIGV4cG9uZW50aWFsIG5vdGF0aW9uIGFjY29yZGluZyB0byBgdG9FeHBQb3NgIGFuZCBgdG9FeHBOZWdgPyBObywgYnV0IGlmIHJlcXVpcmVkOlxyXG4gICAgICAvLyBtYXhCaW5hcnlFeHBvbmVudCA9IGZsb29yKChkZWNpbWFsRXhwb25lbnQgKyAxKSAqIGxvZ1syXSgxMCkpXHJcbiAgICAgIC8vIG1pbkJpbmFyeUV4cG9uZW50ID0gZmxvb3IoZGVjaW1hbEV4cG9uZW50ICogbG9nWzJdKDEwKSlcclxuICAgICAgLy8gbG9nWzJdKDEwKSA9IDMuMzIxOTI4MDk0ODg3MzYyMzQ3ODcwMzE5NDI5NDg5MzkwMTc1ODY0XHJcblxyXG4gICAgICBpZiAoaXNFeHApIHtcclxuICAgICAgICBiYXNlID0gMjtcclxuICAgICAgICBpZiAoYmFzZU91dCA9PSAxNikge1xyXG4gICAgICAgICAgc2QgPSBzZCAqIDQgLSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFzZU91dCA9PSA4KSB7XHJcbiAgICAgICAgICBzZCA9IHNkICogMyAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJhc2UgPSBiYXNlT3V0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDb252ZXJ0IHRoZSBudW1iZXIgYXMgYW4gaW50ZWdlciB0aGVuIGRpdmlkZSB0aGUgcmVzdWx0IGJ5IGl0cyBiYXNlIHJhaXNlZCB0byBhIHBvd2VyIHN1Y2hcclxuICAgICAgLy8gdGhhdCB0aGUgZnJhY3Rpb24gcGFydCB3aWxsIGJlIHJlc3RvcmVkLlxyXG5cclxuICAgICAgLy8gTm9uLWludGVnZXIuXHJcbiAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICB5ID0gbmV3IEN0b3IoMSk7XHJcbiAgICAgICAgeS5lID0gc3RyLmxlbmd0aCAtIGk7XHJcbiAgICAgICAgeS5kID0gY29udmVydEJhc2UoZmluaXRlVG9TdHJpbmcoeSksIDEwLCBiYXNlKTtcclxuICAgICAgICB5LmUgPSB5LmQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB4ZCA9IGNvbnZlcnRCYXNlKHN0ciwgMTAsIGJhc2UpO1xyXG4gICAgICBlID0gbGVuID0geGQubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKDsgeGRbLS1sZW5dID09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICAgIGlmICgheGRbMF0pIHtcclxuICAgICAgICBzdHIgPSBpc0V4cCA/ICcwcCswJyA6ICcwJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgIGUtLTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeCA9IG5ldyBDdG9yKHgpO1xyXG4gICAgICAgICAgeC5kID0geGQ7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG4gICAgICAgICAgeCA9IGRpdmlkZSh4LCB5LCBzZCwgcm0sIDAsIGJhc2UpO1xyXG4gICAgICAgICAgeGQgPSB4LmQ7XHJcbiAgICAgICAgICBlID0geC5lO1xyXG4gICAgICAgICAgcm91bmRVcCA9IGluZXhhY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgICAgIGkgPSB4ZFtzZF07XHJcbiAgICAgICAgayA9IGJhc2UgLyAyO1xyXG4gICAgICAgIHJvdW5kVXAgPSByb3VuZFVwIHx8IHhkW3NkICsgMV0gIT09IHZvaWQgMDtcclxuXHJcbiAgICAgICAgcm91bmRVcCA9IHJtIDwgNFxyXG4gICAgICAgICAgPyAoaSAhPT0gdm9pZCAwIHx8IHJvdW5kVXApICYmIChybSA9PT0gMCB8fCBybSA9PT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgICA6IGkgPiBrIHx8IGkgPT09IGsgJiYgKHJtID09PSA0IHx8IHJvdW5kVXAgfHwgcm0gPT09IDYgJiYgeGRbc2QgLSAxXSAmIDEgfHxcclxuICAgICAgICAgICAgcm0gPT09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuXHJcbiAgICAgICAgeGQubGVuZ3RoID0gc2Q7XHJcblxyXG4gICAgICAgIGlmIChyb3VuZFVwKSB7XHJcblxyXG4gICAgICAgICAgLy8gUm91bmRpbmcgdXAgbWF5IG1lYW4gdGhlIHByZXZpb3VzIGRpZ2l0IGhhcyB0byBiZSByb3VuZGVkIHVwIGFuZCBzbyBvbi5cclxuICAgICAgICAgIGZvciAoOyArK3hkWy0tc2RdID4gYmFzZSAtIDE7KSB7XHJcbiAgICAgICAgICAgIHhkW3NkXSA9IDA7XHJcbiAgICAgICAgICAgIGlmICghc2QpIHtcclxuICAgICAgICAgICAgICArK2U7XHJcbiAgICAgICAgICAgICAgeGQudW5zaGlmdCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAobGVuID0geGQubGVuZ3RoOyAheGRbbGVuIC0gMV07IC0tbGVuKTtcclxuXHJcbiAgICAgICAgLy8gRS5nLiBbNCwgMTEsIDE1XSBiZWNvbWVzIDRiZi5cclxuICAgICAgICBmb3IgKGkgPSAwLCBzdHIgPSAnJzsgaSA8IGxlbjsgaSsrKSBzdHIgKz0gTlVNRVJBTFMuY2hhckF0KHhkW2ldKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmFyeSBleHBvbmVudCBzdWZmaXg/XHJcbiAgICAgICAgaWYgKGlzRXhwKSB7XHJcbiAgICAgICAgICBpZiAobGVuID4gMSkge1xyXG4gICAgICAgICAgICBpZiAoYmFzZU91dCA9PSAxNiB8fCBiYXNlT3V0ID09IDgpIHtcclxuICAgICAgICAgICAgICBpID0gYmFzZU91dCA9PSAxNiA/IDQgOiAzO1xyXG4gICAgICAgICAgICAgIGZvciAoLS1sZW47IGxlbiAlIGk7IGxlbisrKSBzdHIgKz0gJzAnO1xyXG4gICAgICAgICAgICAgIHhkID0gY29udmVydEJhc2Uoc3RyLCBiYXNlLCBiYXNlT3V0KTtcclxuICAgICAgICAgICAgICBmb3IgKGxlbiA9IHhkLmxlbmd0aDsgIXhkW2xlbiAtIDFdOyAtLWxlbik7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHhkWzBdIHdpbGwgYWx3YXlzIGJlIGJlIDFcclxuICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBzdHIgPSAnMS4nOyBpIDwgbGVuOyBpKyspIHN0ciArPSBOVU1FUkFMUy5jaGFyQXQoeGRbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN0ciA9IHN0ci5jaGFyQXQoMCkgKyAnLicgKyBzdHIuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzdHIgPSAgc3RyICsgKGUgPCAwID8gJ3AnIDogJ3ArJykgKyBlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuICAgICAgICAgIGZvciAoOyArK2U7KSBzdHIgPSAnMCcgKyBzdHI7XHJcbiAgICAgICAgICBzdHIgPSAnMC4nICsgc3RyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoKytlID4gbGVuKSBmb3IgKGUgLT0gbGVuOyBlLS0gOykgc3RyICs9ICcwJztcclxuICAgICAgICAgIGVsc2UgaWYgKGUgPCBsZW4pIHN0ciA9IHN0ci5zbGljZSgwLCBlKSArICcuJyArIHN0ci5zbGljZShlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IChiYXNlT3V0ID09IDE2ID8gJzB4JyA6IGJhc2VPdXQgPT0gMiA/ICcwYicgOiBiYXNlT3V0ID09IDggPyAnMG8nIDogJycpICsgc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4LnMgPCAwID8gJy0nICsgc3RyIDogc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIERvZXMgbm90IHN0cmlwIHRyYWlsaW5nIHplcm9zLlxyXG4gIGZ1bmN0aW9uIHRydW5jYXRlKGFyciwgbGVuKSB7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA+IGxlbikge1xyXG4gICAgICBhcnIubGVuZ3RoID0gbGVuO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBEZWNpbWFsIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFic1xyXG4gICAqICBhY29zXHJcbiAgICogIGFjb3NoXHJcbiAgICogIGFkZFxyXG4gICAqICBhc2luXHJcbiAgICogIGFzaW5oXHJcbiAgICogIGF0YW5cclxuICAgKiAgYXRhbmhcclxuICAgKiAgYXRhbjJcclxuICAgKiAgY2JydFxyXG4gICAqICBjZWlsXHJcbiAgICogIGNsb25lXHJcbiAgICogIGNvbmZpZ1xyXG4gICAqICBjb3NcclxuICAgKiAgY29zaFxyXG4gICAqICBkaXZcclxuICAgKiAgZXhwXHJcbiAgICogIGZsb29yXHJcbiAgICogIGh5cG90XHJcbiAgICogIGxuXHJcbiAgICogIGxvZ1xyXG4gICAqICBsb2cyXHJcbiAgICogIGxvZzEwXHJcbiAgICogIG1heFxyXG4gICAqICBtaW5cclxuICAgKiAgbW9kXHJcbiAgICogIG11bFxyXG4gICAqICBwb3dcclxuICAgKiAgcmFuZG9tXHJcbiAgICogIHJvdW5kXHJcbiAgICogIHNldFxyXG4gICAqICBzaWduXHJcbiAgICogIHNpblxyXG4gICAqICBzaW5oXHJcbiAgICogIHNxcnRcclxuICAgKiAgc3ViXHJcbiAgICogIHRhblxyXG4gICAqICB0YW5oXHJcbiAgICogIHRydW5jXHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiBgeGAuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBhYnMoeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmFicygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFyY2Nvc2luZSBpbiByYWRpYW5zIG9mIGB4YC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFjb3MoeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmFjb3MoKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBoeXBlcmJvbGljIGNvc2luZSBvZiBgeGAsIHJvdW5kZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBBIHZhbHVlIGluIHJhZGlhbnMuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBhY29zaCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkuYWNvc2goKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBzdW0gb2YgYHhgIGFuZCBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFkZCh4LCB5KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkucGx1cyh5KTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBhcmNzaW5lIGluIHJhZGlhbnMgb2YgYHhgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFzaW4oeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmFzaW4oKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBoeXBlcmJvbGljIHNpbmUgb2YgYHhgLCByb3VuZGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSB2YWx1ZSBpbiByYWRpYW5zLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXNpbmgoeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmFzaW5oKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgYXJjdGFuZ2VudCBpbiByYWRpYW5zIG9mIGB4YCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBhdGFuKHgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5hdGFuKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgaW52ZXJzZSBvZiB0aGUgaHlwZXJib2xpYyB0YW5nZW50IG9mIGB4YCwgcm91bmRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IEEgdmFsdWUgaW4gcmFkaWFucy5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGF0YW5oKHgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5hdGFuaCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFyY3RhbmdlbnQgaW4gcmFkaWFucyBvZiBgeS94YCBpbiB0aGUgcmFuZ2UgLXBpIHRvIHBpXHJcbiAgICogKGluY2x1c2l2ZSksIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIERvbWFpbjogWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbiAgICogUmFuZ2U6IFstcGksIHBpXVxyXG4gICAqXHJcbiAgICogeSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgeS1jb29yZGluYXRlLlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIHgtY29vcmRpbmF0ZS5cclxuICAgKlxyXG4gICAqIGF0YW4yKMKxMCwgLTApICAgICAgICAgICAgICAgPSDCsXBpXHJcbiAgICogYXRhbjIowrEwLCArMCkgICAgICAgICAgICAgICA9IMKxMFxyXG4gICAqIGF0YW4yKMKxMCwgLXgpICAgICAgICAgICAgICAgPSDCsXBpIGZvciB4ID4gMFxyXG4gICAqIGF0YW4yKMKxMCwgeCkgICAgICAgICAgICAgICAgPSDCsTAgZm9yIHggPiAwXHJcbiAgICogYXRhbjIoLXksIMKxMCkgICAgICAgICAgICAgICA9IC1waS8yIGZvciB5ID4gMFxyXG4gICAqIGF0YW4yKHksIMKxMCkgICAgICAgICAgICAgICAgPSBwaS8yIGZvciB5ID4gMFxyXG4gICAqIGF0YW4yKMKxeSwgLUluZmluaXR5KSAgICAgICAgPSDCsXBpIGZvciBmaW5pdGUgeSA+IDBcclxuICAgKiBhdGFuMijCsXksICtJbmZpbml0eSkgICAgICAgID0gwrEwIGZvciBmaW5pdGUgeSA+IDBcclxuICAgKiBhdGFuMijCsUluZmluaXR5LCB4KSAgICAgICAgID0gwrFwaS8yIGZvciBmaW5pdGUgeFxyXG4gICAqIGF0YW4yKMKxSW5maW5pdHksIC1JbmZpbml0eSkgPSDCsTMqcGkvNFxyXG4gICAqIGF0YW4yKMKxSW5maW5pdHksICtJbmZpbml0eSkgPSDCsXBpLzRcclxuICAgKiBhdGFuMihOYU4sIHgpID0gTmFOXHJcbiAgICogYXRhbjIoeSwgTmFOKSA9IE5hTlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXRhbjIoeSwgeCkge1xyXG4gICAgeSA9IG5ldyB0aGlzKHkpO1xyXG4gICAgeCA9IG5ldyB0aGlzKHgpO1xyXG4gICAgdmFyIHIsXHJcbiAgICAgIHByID0gdGhpcy5wcmVjaXNpb24sXHJcbiAgICAgIHJtID0gdGhpcy5yb3VuZGluZyxcclxuICAgICAgd3ByID0gcHIgKyA0O1xyXG5cclxuICAgIC8vIEVpdGhlciBOYU5cclxuICAgIGlmICgheS5zIHx8ICF4LnMpIHtcclxuICAgICAgciA9IG5ldyB0aGlzKE5hTik7XHJcblxyXG4gICAgLy8gQm90aCDCsUluZmluaXR5XHJcbiAgICB9IGVsc2UgaWYgKCF5LmQgJiYgIXguZCkge1xyXG4gICAgICByID0gZ2V0UGkodGhpcywgd3ByLCAxKS50aW1lcyh4LnMgPiAwID8gMC4yNSA6IDAuNzUpO1xyXG4gICAgICByLnMgPSB5LnM7XHJcblxyXG4gICAgLy8geCBpcyDCsUluZmluaXR5IG9yIHkgaXMgwrEwXHJcbiAgICB9IGVsc2UgaWYgKCF4LmQgfHwgeS5pc1plcm8oKSkge1xyXG4gICAgICByID0geC5zIDwgMCA/IGdldFBpKHRoaXMsIHByLCBybSkgOiBuZXcgdGhpcygwKTtcclxuICAgICAgci5zID0geS5zO1xyXG5cclxuICAgIC8vIHkgaXMgwrFJbmZpbml0eSBvciB4IGlzIMKxMFxyXG4gICAgfSBlbHNlIGlmICgheS5kIHx8IHguaXNaZXJvKCkpIHtcclxuICAgICAgciA9IGdldFBpKHRoaXMsIHdwciwgMSkudGltZXMoMC41KTtcclxuICAgICAgci5zID0geS5zO1xyXG5cclxuICAgIC8vIEJvdGggbm9uLXplcm8gYW5kIGZpbml0ZVxyXG4gICAgfSBlbHNlIGlmICh4LnMgPCAwKSB7XHJcbiAgICAgIHRoaXMucHJlY2lzaW9uID0gd3ByO1xyXG4gICAgICB0aGlzLnJvdW5kaW5nID0gMTtcclxuICAgICAgciA9IHRoaXMuYXRhbihkaXZpZGUoeSwgeCwgd3ByLCAxKSk7XHJcbiAgICAgIHggPSBnZXRQaSh0aGlzLCB3cHIsIDEpO1xyXG4gICAgICB0aGlzLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICB0aGlzLnJvdW5kaW5nID0gcm07XHJcbiAgICAgIHIgPSB5LnMgPCAwID8gci5taW51cyh4KSA6IHIucGx1cyh4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHIgPSB0aGlzLmF0YW4oZGl2aWRlKHksIHgsIHdwciwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGN1YmUgcm9vdCBvZiBgeGAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2JydCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkuY2JydCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgYHhgIHJvdW5kZWQgdG8gYW4gaW50ZWdlciB1c2luZyBgUk9VTkRfQ0VJTGAuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjZWlsKHgpIHtcclxuICAgIHJldHVybiBmaW5hbGlzZSh4ID0gbmV3IHRoaXMoeCksIHguZSArIDEsIDIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ29uZmlndXJlIGdsb2JhbCBzZXR0aW5ncyBmb3IgYSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogYG9iamAgaXMgYW4gb2JqZWN0IHdpdGggb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLFxyXG4gICAqXHJcbiAgICogICBwcmVjaXNpb24gIHtudW1iZXJ9XHJcbiAgICogICByb3VuZGluZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cE5lZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cFBvcyAgIHtudW1iZXJ9XHJcbiAgICogICBtYXhFICAgICAgIHtudW1iZXJ9XHJcbiAgICogICBtaW5FICAgICAgIHtudW1iZXJ9XHJcbiAgICogICBtb2R1bG8gICAgIHtudW1iZXJ9XHJcbiAgICogICBjcnlwdG8gICAgIHtib29sZWFufG51bWJlcn1cclxuICAgKiAgIGRlZmF1bHRzICAge3RydWV9XHJcbiAgICpcclxuICAgKiBFLmcuIERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCwgcm91bmRpbmc6IDQgfSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvbmZpZyhvYmopIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkJyk7XHJcbiAgICB2YXIgaSwgcCwgdixcclxuICAgICAgdXNlRGVmYXVsdHMgPSBvYmouZGVmYXVsdHMgPT09IHRydWUsXHJcbiAgICAgIHBzID0gW1xyXG4gICAgICAgICdwcmVjaXNpb24nLCAxLCBNQVhfRElHSVRTLFxyXG4gICAgICAgICdyb3VuZGluZycsIDAsIDgsXHJcbiAgICAgICAgJ3RvRXhwTmVnJywgLUVYUF9MSU1JVCwgMCxcclxuICAgICAgICAndG9FeHBQb3MnLCAwLCBFWFBfTElNSVQsXHJcbiAgICAgICAgJ21heEUnLCAwLCBFWFBfTElNSVQsXHJcbiAgICAgICAgJ21pbkUnLCAtRVhQX0xJTUlULCAwLFxyXG4gICAgICAgICdtb2R1bG8nLCAwLCA5XHJcbiAgICAgIF07XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGlmIChwID0gcHNbaV0sIHVzZURlZmF1bHRzKSB0aGlzW3BdID0gREVGQVVMVFNbcF07XHJcbiAgICAgIGlmICgodiA9IG9ialtwXSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmIChtYXRoZmxvb3IodikgPT09IHYgJiYgdiA+PSBwc1tpICsgMV0gJiYgdiA8PSBwc1tpICsgMl0pIHRoaXNbcF0gPSB2O1xyXG4gICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgcCArICc6ICcgKyB2KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwID0gJ2NyeXB0bycsIHVzZURlZmF1bHRzKSB0aGlzW3BdID0gREVGQVVMVFNbcF07XHJcbiAgICBpZiAoKHYgPSBvYmpbcF0pICE9PSB2b2lkIDApIHtcclxuICAgICAgaWYgKHYgPT09IHRydWUgfHwgdiA9PT0gZmFsc2UgfHwgdiA9PT0gMCB8fCB2ID09PSAxKSB7XHJcbiAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9ICd1bmRlZmluZWQnICYmIGNyeXB0byAmJlxyXG4gICAgICAgICAgICAoY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB8fCBjcnlwdG8ucmFuZG9tQnl0ZXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbcF0gPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoY3J5cHRvVW5hdmFpbGFibGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzW3BdID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBjb3NpbmUgb2YgYHhgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSB2YWx1ZSBpbiByYWRpYW5zLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY29zKHgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5jb3MoKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBoeXBlcmJvbGljIGNvc2luZSBvZiBgeGAsIHJvdW5kZWQgdG8gcHJlY2lzaW9uXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSB2YWx1ZSBpbiByYWRpYW5zLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY29zaCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkuY29zaCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ3JlYXRlIGFuZCByZXR1cm4gYSBEZWNpbWFsIGNvbnN0cnVjdG9yIHdpdGggdGhlIHNhbWUgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIGFzIHRoaXMgRGVjaW1hbFxyXG4gICAqIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICB2YXIgaSwgcCwgcHM7XHJcblxyXG4gICAgLypcclxuICAgICAqIFRoZSBEZWNpbWFsIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIHYge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGVjaW1hbCh2KSB7XHJcbiAgICAgIHZhciBlLCBpLCB0LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRGVjaW1hbCBjYWxsZWQgd2l0aG91dCBuZXcuXHJcbiAgICAgIGlmICghKHggaW5zdGFuY2VvZiBEZWNpbWFsKSkgcmV0dXJuIG5ldyBEZWNpbWFsKHYpO1xyXG5cclxuICAgICAgLy8gUmV0YWluIGEgcmVmZXJlbmNlIHRvIHRoaXMgRGVjaW1hbCBjb25zdHJ1Y3RvciwgYW5kIHNoYWRvdyBEZWNpbWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvclxyXG4gICAgICAvLyB3aGljaCBwb2ludHMgdG8gT2JqZWN0LlxyXG4gICAgICB4LmNvbnN0cnVjdG9yID0gRGVjaW1hbDtcclxuXHJcbiAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgaWYgKHYgaW5zdGFuY2VvZiBEZWNpbWFsKSB7XHJcbiAgICAgICAgeC5zID0gdi5zO1xyXG4gICAgICAgIHguZSA9IHYuZTtcclxuICAgICAgICB4LmQgPSAodiA9IHYuZCkgPyB2LnNsaWNlKCkgOiB2O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdCA9IHR5cGVvZiB2O1xyXG5cclxuICAgICAgaWYgKHQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgaWYgKHYgPT09IDApIHtcclxuICAgICAgICAgIHgucyA9IDEgLyB2IDwgMCA/IC0xIDogMTtcclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbMF07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodiA8IDApIHtcclxuICAgICAgICAgIHYgPSAtdjtcclxuICAgICAgICAgIHgucyA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBzbWFsbCBpbnRlZ2Vycy5cclxuICAgICAgICBpZiAodiA9PT0gfn52ICYmIHYgPCAxZTcpIHtcclxuICAgICAgICAgIGZvciAoZSA9IDAsIGkgPSB2OyBpID49IDEwOyBpIC89IDEwKSBlKys7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG4gICAgICAgICAgeC5kID0gW3ZdO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eSwgTmFOLlxyXG4gICAgICAgIH0gZWxzZSBpZiAodiAqIDAgIT09IDApIHtcclxuICAgICAgICAgIGlmICghdikgeC5zID0gTmFOO1xyXG4gICAgICAgICAgeC5lID0gTmFOO1xyXG4gICAgICAgICAgeC5kID0gbnVsbDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJzZURlY2ltYWwoeCwgdi50b1N0cmluZygpKTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWludXMgc2lnbj9cclxuICAgICAgaWYgKHYuY2hhckNvZGVBdCgwKSA9PT0gNDUpIHtcclxuICAgICAgICB2ID0gdi5zbGljZSgxKTtcclxuICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4LnMgPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gaXNEZWNpbWFsLnRlc3QodikgPyBwYXJzZURlY2ltYWwoeCwgdikgOiBwYXJzZU90aGVyKHgsIHYpO1xyXG4gICAgfVxyXG5cclxuICAgIERlY2ltYWwucHJvdG90eXBlID0gUDtcclxuXHJcbiAgICBEZWNpbWFsLlJPVU5EX1VQID0gMDtcclxuICAgIERlY2ltYWwuUk9VTkRfRE9XTiA9IDE7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0NFSUwgPSAyO1xyXG4gICAgRGVjaW1hbC5ST1VORF9GTE9PUiA9IDM7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfVVAgPSA0O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0RPV04gPSA1O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0NFSUwgPSA3O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0ZMT09SID0gODtcclxuICAgIERlY2ltYWwuRVVDTElEID0gOTtcclxuXHJcbiAgICBEZWNpbWFsLmNvbmZpZyA9IERlY2ltYWwuc2V0ID0gY29uZmlnO1xyXG4gICAgRGVjaW1hbC5jbG9uZSA9IGNsb25lO1xyXG4gICAgRGVjaW1hbC5pc0RlY2ltYWwgPSBpc0RlY2ltYWxJbnN0YW5jZTtcclxuXHJcbiAgICBEZWNpbWFsLmFicyA9IGFicztcclxuICAgIERlY2ltYWwuYWNvcyA9IGFjb3M7XHJcbiAgICBEZWNpbWFsLmFjb3NoID0gYWNvc2g7ICAgICAgICAvLyBFUzZcclxuICAgIERlY2ltYWwuYWRkID0gYWRkO1xyXG4gICAgRGVjaW1hbC5hc2luID0gYXNpbjtcclxuICAgIERlY2ltYWwuYXNpbmggPSBhc2luaDsgICAgICAgIC8vIEVTNlxyXG4gICAgRGVjaW1hbC5hdGFuID0gYXRhbjtcclxuICAgIERlY2ltYWwuYXRhbmggPSBhdGFuaDsgICAgICAgIC8vIEVTNlxyXG4gICAgRGVjaW1hbC5hdGFuMiA9IGF0YW4yO1xyXG4gICAgRGVjaW1hbC5jYnJ0ID0gY2JydDsgICAgICAgICAgLy8gRVM2XHJcbiAgICBEZWNpbWFsLmNlaWwgPSBjZWlsO1xyXG4gICAgRGVjaW1hbC5jb3MgPSBjb3M7XHJcbiAgICBEZWNpbWFsLmNvc2ggPSBjb3NoOyAgICAgICAgICAvLyBFUzZcclxuICAgIERlY2ltYWwuZGl2ID0gZGl2O1xyXG4gICAgRGVjaW1hbC5leHAgPSBleHA7XHJcbiAgICBEZWNpbWFsLmZsb29yID0gZmxvb3I7XHJcbiAgICBEZWNpbWFsLmh5cG90ID0gaHlwb3Q7ICAgICAgICAvLyBFUzZcclxuICAgIERlY2ltYWwubG4gPSBsbjtcclxuICAgIERlY2ltYWwubG9nID0gbG9nO1xyXG4gICAgRGVjaW1hbC5sb2cxMCA9IGxvZzEwOyAgICAgICAgLy8gRVM2XHJcbiAgICBEZWNpbWFsLmxvZzIgPSBsb2cyOyAgICAgICAgICAvLyBFUzZcclxuICAgIERlY2ltYWwubWF4ID0gbWF4O1xyXG4gICAgRGVjaW1hbC5taW4gPSBtaW47XHJcbiAgICBEZWNpbWFsLm1vZCA9IG1vZDtcclxuICAgIERlY2ltYWwubXVsID0gbXVsO1xyXG4gICAgRGVjaW1hbC5wb3cgPSBwb3c7XHJcbiAgICBEZWNpbWFsLnJhbmRvbSA9IHJhbmRvbTtcclxuICAgIERlY2ltYWwucm91bmQgPSByb3VuZDtcclxuICAgIERlY2ltYWwuc2lnbiA9IHNpZ247ICAgICAgICAgIC8vIEVTNlxyXG4gICAgRGVjaW1hbC5zaW4gPSBzaW47XHJcbiAgICBEZWNpbWFsLnNpbmggPSBzaW5oOyAgICAgICAgICAvLyBFUzZcclxuICAgIERlY2ltYWwuc3FydCA9IHNxcnQ7XHJcbiAgICBEZWNpbWFsLnN1YiA9IHN1YjtcclxuICAgIERlY2ltYWwudGFuID0gdGFuO1xyXG4gICAgRGVjaW1hbC50YW5oID0gdGFuaDsgICAgICAgICAgLy8gRVM2XHJcbiAgICBEZWNpbWFsLnRydW5jID0gdHJ1bmM7ICAgICAgICAvLyBFUzZcclxuXHJcbiAgICBpZiAob2JqID09PSB2b2lkIDApIG9iaiA9IHt9O1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICBpZiAob2JqLmRlZmF1bHRzICE9PSB0cnVlKSB7XHJcbiAgICAgICAgcHMgPSBbJ3ByZWNpc2lvbicsICdyb3VuZGluZycsICd0b0V4cE5lZycsICd0b0V4cFBvcycsICdtYXhFJywgJ21pbkUnLCAnbW9kdWxvJywgJ2NyeXB0byddO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7KSBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShwID0gcHNbaSsrXSkpIG9ialtwXSA9IHRoaXNbcF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBEZWNpbWFsLmNvbmZpZyhvYmopO1xyXG5cclxuICAgIHJldHVybiBEZWNpbWFsO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgYHhgIGRpdmlkZWQgYnkgYHlgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKiB5IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBkaXYoeCwgeSkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmRpdih5KTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIGB4YCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IFRoZSBwb3dlciB0byB3aGljaCB0byByYWlzZSB0aGUgYmFzZSBvZiB0aGUgbmF0dXJhbCBsb2cuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBleHAoeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLmV4cCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgYHhgIHJvdW5kIHRvIGFuIGludGVnZXIgdXNpbmcgYFJPVU5EX0ZMT09SYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGZsb29yKHgpIHtcclxuICAgIHJldHVybiBmaW5hbGlzZSh4ID0gbmV3IHRoaXMoeCksIHguZSArIDEsIDMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoZSBzdW0gb2YgdGhlIHNxdWFyZXMgb2YgdGhlIGFyZ3VtZW50cyxcclxuICAgKiByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBoeXBvdChhLCBiLCAuLi4pID0gc3FydChhXjIgKyBiXjIgKyAuLi4pXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBoeXBvdCgpIHtcclxuICAgIHZhciBpLCBuLFxyXG4gICAgICB0ID0gbmV3IHRoaXMoMCk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDspIHtcclxuICAgICAgbiA9IG5ldyB0aGlzKGFyZ3VtZW50c1tpKytdKTtcclxuICAgICAgaWYgKCFuLmQpIHtcclxuICAgICAgICBpZiAobi5zKSB7XHJcbiAgICAgICAgICBleHRlcm5hbCA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoMSAvIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ID0gbjtcclxuICAgICAgfSBlbHNlIGlmICh0LmQpIHtcclxuICAgICAgICB0ID0gdC5wbHVzKG4udGltZXMobikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0LnNxcnQoKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIG9iamVjdCBpcyBhIERlY2ltYWwgaW5zdGFuY2UgKHdoZXJlIERlY2ltYWwgaXMgYW55IERlY2ltYWwgY29uc3RydWN0b3IpLFxyXG4gICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBpc0RlY2ltYWxJbnN0YW5jZShvYmopIHtcclxuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEZWNpbWFsIHx8IG9iaiAmJiBvYmoubmFtZSA9PT0gJ1tvYmplY3QgRGVjaW1hbF0nIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGB4YCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBsbih4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkubG4oKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBsb2cgb2YgYHhgIHRvIHRoZSBiYXNlIGB5YCwgb3IgdG8gYmFzZSAxMCBpZiBubyBiYXNlXHJcbiAgICogaXMgc3BlY2lmaWVkLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBsb2dbeV0oeClcclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIGFyZ3VtZW50IG9mIHRoZSBsb2dhcml0aG0uXHJcbiAgICogeSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgYmFzZSBvZiB0aGUgbG9nYXJpdGhtLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbG9nKHgsIHkpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5sb2coeSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgYmFzZSAyIGxvZ2FyaXRobSBvZiBgeGAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbG9nMih4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkubG9nKDIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGJhc2UgMTAgbG9nYXJpdGhtIG9mIGB4YCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBsb2cxMCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkubG9nKDEwKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBtYXhpbXVtIG9mIHRoZSBhcmd1bWVudHMuXHJcbiAgICpcclxuICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG1heCgpIHtcclxuICAgIHJldHVybiBtYXhPck1pbih0aGlzLCBhcmd1bWVudHMsICdsdCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG1pbmltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgKlxyXG4gICAqIGFyZ3VtZW50cyB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbWluKCkge1xyXG4gICAgcmV0dXJuIG1heE9yTWluKHRoaXMsIGFyZ3VtZW50cywgJ2d0Jyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyBgeGAgbW9kdWxvIGB5YCwgcm91bmRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgKiB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9XHJcbiAgICogeSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbW9kKHgsIHkpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5tb2QoeSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyBgeGAgbXVsdGlwbGllZCBieSBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG11bCh4LCB5KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkubXVsKHkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgYHhgIHJhaXNlZCB0byB0aGUgcG93ZXIgYHlgLCByb3VuZGVkIHRvIHByZWNpc2lvblxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiB4IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IFRoZSBiYXNlLlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIGV4cG9uZW50LlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcG93KHgsIHkpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5wb3coeSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5zIGEgbmV3IERlY2ltYWwgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsIGFuZCB3aXRoXHJcbiAgICogYHNkYCwgb3IgYERlY2ltYWwucHJlY2lzaW9uYCBpZiBgc2RgIGlzIG9taXR0ZWQsIHNpZ25pZmljYW50IGRpZ2l0cyAob3IgbGVzcyBpZiB0cmFpbGluZyB6ZXJvc1xyXG4gICAqIGFyZSBwcm9kdWNlZCkuXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHJhbmRvbShzZCkge1xyXG4gICAgdmFyIGQsIGUsIGssIG4sXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICByID0gbmV3IHRoaXMoMSksXHJcbiAgICAgIHJkID0gW107XHJcblxyXG4gICAgaWYgKHNkID09PSB2b2lkIDApIHNkID0gdGhpcy5wcmVjaXNpb247XHJcbiAgICBlbHNlIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGsgPSBNYXRoLmNlaWwoc2QgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNyeXB0bykge1xyXG4gICAgICBmb3IgKDsgaSA8IGs7KSByZFtpKytdID0gTWF0aC5yYW5kb20oKSAqIDFlNyB8IDA7XHJcblxyXG4gICAgLy8gQnJvd3NlcnMgc3VwcG9ydGluZyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLlxyXG4gICAgfSBlbHNlIGlmIChjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XHJcbiAgICAgIGQgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrKSk7XHJcblxyXG4gICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcbiAgICAgICAgbiA9IGRbaV07XHJcblxyXG4gICAgICAgIC8vIDAgPD0gbiA8IDQyOTQ5NjcyOTZcclxuICAgICAgICAvLyBQcm9iYWJpbGl0eSBuID49IDQuMjllOSwgaXMgNDk2NzI5NiAvIDQyOTQ5NjcyOTYgPSAwLjAwMTE2ICgxIGluIDg2NSkuXHJcbiAgICAgICAgaWYgKG4gPj0gNC4yOWU5KSB7XHJcbiAgICAgICAgICBkW2ldID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMSkpWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gMCA8PSBuIDw9IDQyODk5OTk5OTlcclxuICAgICAgICAgIC8vIDAgPD0gKG4gJSAxZTcpIDw9IDk5OTk5OTlcclxuICAgICAgICAgIHJkW2krK10gPSBuICUgMWU3O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIC8vIE5vZGUuanMgc3VwcG9ydGluZyBjcnlwdG8ucmFuZG9tQnl0ZXMuXHJcbiAgICB9IGVsc2UgaWYgKGNyeXB0by5yYW5kb21CeXRlcykge1xyXG5cclxuICAgICAgLy8gYnVmZmVyXHJcbiAgICAgIGQgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoayAqPSA0KTtcclxuXHJcbiAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgLy8gMCA8PSBuIDwgMjE0NzQ4MzY0OFxyXG4gICAgICAgIG4gPSBkW2ldICsgKGRbaSArIDFdIDw8IDgpICsgKGRbaSArIDJdIDw8IDE2KSArICgoZFtpICsgM10gJiAweDdmKSA8PCAyNCk7XHJcblxyXG4gICAgICAgIC8vIFByb2JhYmlsaXR5IG4gPj0gMi4xNGU5LCBpcyA3NDgzNjQ4IC8gMjE0NzQ4MzY0OCA9IDAuMDAzNSAoMSBpbiAyODYpLlxyXG4gICAgICAgIGlmIChuID49IDIuMTRlOSkge1xyXG4gICAgICAgICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDQpLmNvcHkoZCwgaSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyAwIDw9IG4gPD0gMjEzOTk5OTk5OVxyXG4gICAgICAgICAgLy8gMCA8PSAobiAlIDFlNykgPD0gOTk5OTk5OVxyXG4gICAgICAgICAgcmQucHVzaChuICUgMWU3KTtcclxuICAgICAgICAgIGkgKz0gNDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGkgPSBrIC8gNDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IEVycm9yKGNyeXB0b1VuYXZhaWxhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBrID0gcmRbLS1pXTtcclxuICAgIHNkICU9IExPR19CQVNFO1xyXG5cclxuICAgIC8vIENvbnZlcnQgdHJhaWxpbmcgZGlnaXRzIHRvIHplcm9zIGFjY29yZGluZyB0byBzZC5cclxuICAgIGlmIChrICYmIHNkKSB7XHJcbiAgICAgIG4gPSBtYXRocG93KDEwLCBMT0dfQkFTRSAtIHNkKTtcclxuICAgICAgcmRbaV0gPSAoayAvIG4gfCAwKSAqIG47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHdvcmRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgZm9yICg7IHJkW2ldID09PSAwOyBpLS0pIHJkLnBvcCgpO1xyXG5cclxuICAgIC8vIFplcm8/XHJcbiAgICBpZiAoaSA8IDApIHtcclxuICAgICAgZSA9IDA7XHJcbiAgICAgIHJkID0gWzBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZSA9IC0xO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgd29yZHMgd2hpY2ggYXJlIHplcm8gYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgICAgZm9yICg7IHJkWzBdID09PSAwOyBlIC09IExPR19CQVNFKSByZC5zaGlmdCgpO1xyXG5cclxuICAgICAgLy8gQ291bnQgdGhlIGRpZ2l0cyBvZiB0aGUgZmlyc3Qgd29yZCBvZiByZCB0byBkZXRlcm1pbmUgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChrID0gMSwgbiA9IHJkWzBdOyBuID49IDEwOyBuIC89IDEwKSBrKys7XHJcblxyXG4gICAgICAvLyBBZGp1c3QgdGhlIGV4cG9uZW50IGZvciBsZWFkaW5nIHplcm9zIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHJkLlxyXG4gICAgICBpZiAoayA8IExPR19CQVNFKSBlIC09IExPR19CQVNFIC0gaztcclxuICAgIH1cclxuXHJcbiAgICByLmUgPSBlO1xyXG4gICAgci5kID0gcmQ7XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyBgeGAgcm91bmRlZCB0byBhbiBpbnRlZ2VyIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIFRvIGVtdWxhdGUgYE1hdGgucm91bmRgLCBzZXQgcm91bmRpbmcgdG8gNyAoUk9VTkRfSEFMRl9DRUlMKS5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHJvdW5kKHgpIHtcclxuICAgIHJldHVybiBmaW5hbGlzZSh4ID0gbmV3IHRoaXMoeCksIHguZSArIDEsIHRoaXMucm91bmRpbmcpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuXHJcbiAgICogICAxICAgIGlmIHggPiAwLFxyXG4gICAqICAtMSAgICBpZiB4IDwgMCxcclxuICAgKiAgIDAgICAgaWYgeCBpcyAwLFxyXG4gICAqICAtMCAgICBpZiB4IGlzIC0wLFxyXG4gICAqICAgTmFOICBvdGhlcndpc2VcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNpZ24oeCkge1xyXG4gICAgeCA9IG5ldyB0aGlzKHgpO1xyXG4gICAgcmV0dXJuIHguZCA/ICh4LmRbMF0gPyB4LnMgOiAwICogeC5zKSA6IHgucyB8fCBOYU47XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgc2luZSBvZiBgeGAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBBIHZhbHVlIGluIHJhZGlhbnMuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBzaW4oeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLnNpbigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGh5cGVyYm9saWMgc2luZSBvZiBgeGAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBBIHZhbHVlIGluIHJhZGlhbnMuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBzaW5oKHgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS5zaW5oKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgYHhgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNxcnQoeCkge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzKHgpLnNxcnQoKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIGB4YCBtaW51cyBgeWAsIHJvdW5kZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH1cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHN1Yih4LCB5KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkuc3ViKHkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHRhbmdlbnQgb2YgYHhgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSB2YWx1ZSBpbiByYWRpYW5zLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdGFuKHgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyh4KS50YW4oKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBoeXBlcmJvbGljIHRhbmdlbnQgb2YgYHhgLCByb3VuZGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIHgge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSB2YWx1ZSBpbiByYWRpYW5zLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdGFuaCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoeCkudGFuaCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgYHhgIHRydW5jYXRlZCB0byBhbiBpbnRlZ2VyLlxyXG4gICAqXHJcbiAgICogeCB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdHJ1bmMoeCkge1xyXG4gICAgcmV0dXJuIGZpbmFsaXNlKHggPSBuZXcgdGhpcyh4KSwgeC5lICsgMSwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGFuZCBjb25maWd1cmUgaW5pdGlhbCBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gIERlY2ltYWwgPSBjbG9uZShERUZBVUxUUyk7XHJcblxyXG4gIERlY2ltYWxbJ2RlZmF1bHQnXSA9IERlY2ltYWwuRGVjaW1hbCA9IERlY2ltYWw7XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgaW50ZXJuYWwgY29uc3RhbnRzIGZyb20gdGhlaXIgc3RyaW5nIHZhbHVlcy5cclxuICBMTjEwID0gbmV3IERlY2ltYWwoTE4xMCk7XHJcbiAgUEkgPSBuZXcgRGVjaW1hbChQSSk7XHJcblxyXG5cclxuICAvLyBFeHBvcnQuXHJcblxyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gRGVjaW1hbDtcclxuICAgIH0pO1xyXG5cclxuICAvLyBOb2RlIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBEZWNpbWFsO1xyXG5cclxuICAvLyBCcm93c2VyLlxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWdsb2JhbFNjb3BlKSB7XHJcbiAgICAgIGdsb2JhbFNjb3BlID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAmJiBzZWxmLnNlbGYgPT0gc2VsZiA/IHNlbGYgOiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgbm9Db25mbGljdCA9IGdsb2JhbFNjb3BlLkRlY2ltYWw7XHJcbiAgICBEZWNpbWFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGdsb2JhbFNjb3BlLkRlY2ltYWwgPSBub0NvbmZsaWN0O1xyXG4gICAgICByZXR1cm4gRGVjaW1hbDtcclxuICAgIH07XHJcblxyXG4gICAgZ2xvYmFsU2NvcGUuRGVjaW1hbCA9IERlY2ltYWw7XHJcbiAgfVxyXG59KSh0aGlzKTtcclxuIl19

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/localEncode/base64.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (global){
"use strict";
cc._RF.push(module, 'c52f3y7hUJMrr4QAh3jcX6e', 'base64');
// frames/util/localEncode/base64.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) : typeof define === 'function' && define.amd ? define(factory) : factory(global);
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : void 0, function (global) {
  'use strict'; // existing version for noConflict()

  global = global || {};
  var _Base64 = global.Base64;
  var version = "2.5.1"; // if node.js and NOT React Native, we use Buffer

  var buffer;

  if (typeof module !== 'undefined' && module.exports) {
    try {
      buffer = eval("require('buffer').Buffer");
    } catch (err) {
      buffer = undefined;
    }
  } // constants


  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var b64tab = function (bin) {
    var t = {};

    for (var i = 0, l = bin.length; i < l; i++) {
      t[bin.charAt(i)] = i;
    }

    return t;
  }(b64chars);

  var fromCharCode = String.fromCharCode; // encoder stuff

  var cb_utob = function cb_utob(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    } else {
      var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
      return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    }
  };

  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

  var utob = function utob(u) {
    return u.replace(re_utob, cb_utob);
  };

  var cb_encode = function cb_encode(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
        chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
    return chars.join('');
  };

  var btoa = global.btoa ? function (b) {
    return global.btoa(b);
  } : function (b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };

  var _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (u) {
    return (u.constructor === buffer.constructor ? u : buffer.from(u)).toString('base64');
  } : function (u) {
    return (u.constructor === buffer.constructor ? u : new buffer(u)).toString('base64');
  } : function (u) {
    return btoa(utob(u));
  };

  var encode = function encode(u, urisafe) {
    return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };

  var encodeURI = function encodeURI(u) {
    return encode(u, true);
  }; // decoder stuff


  var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');

  var cb_btou = function cb_btou(cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
            offset = cp - 0x10000;
        return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);

      case 3:
        return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));

      default:
        return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
    }
  };

  var btou = function btou(b) {
    return b.replace(re_btou, cb_btou);
  };

  var cb_decode = function cb_decode(cccc) {
    var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
        chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };

  var _atob = global.atob ? function (a) {
    return global.atob(a);
  } : function (a) {
    return a.replace(/\S{1,4}/g, cb_decode);
  };

  var atob = function atob(a) {
    return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };

  var _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (a) {
    return (a.constructor === buffer.constructor ? a : buffer.from(a, 'base64')).toString();
  } : function (a) {
    return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
  } : function (a) {
    return btou(_atob(a));
  };

  var decode = function decode(a) {
    return _decode(String(a).replace(/[-_]/g, function (m0) {
      return m0 == '-' ? '+' : '/';
    }).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };

  var noConflict = function noConflict() {
    var Base64 = global.Base64;
    global.Base64 = _Base64;
    return Base64;
  }; // export Base64


  global.Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict,
    __buffer__: buffer
  }; // if ES5 is available, make Base64.extendString() available

  if (typeof Object.defineProperty === 'function') {
    var noEnum = function noEnum(v) {
      return {
        value: v,
        enumerable: false,
        writable: true,
        configurable: true
      };
    };

    global.Base64.extendString = function () {
      Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
        return decode(this);
      }));
      Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
        return encode(this, urisafe);
      }));
      Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
        return encode(this, true);
      }));
    };
  } //
  // export Base64 to the namespace
  //


  if (global['Meteor']) {
    // Meteor.js
    Base64 = global.Base64;
  } // module.exports and AMD are mutually exclusive.
  // module.exports has precedence.


  if (typeof module !== 'undefined' && module.exports) {
    module.exports.Base64 = global.Base64;
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return global.Base64;
    });
  } // that's it!


  return {
    Base64: global.Base64
  };
});

cc._RF.pop();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXGZyYW1lc1xcdXRpbFxcbG9jYWxFbmNvZGVcXGJhc2U2NC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7QUFTQTs7QUFBRSxXQUFVLE1BQVYsRUFBa0IsT0FBbEIsRUFBMkI7QUFDekIsVUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsT0FBTyxNQUFQLEtBQWtCLFdBQWpELEdBQ00sTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBTyxDQUFDLE1BQUQsQ0FEOUIsR0FFTSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsTUFBTSxDQUFDLEdBQXZDLEdBQ0EsTUFBTSxDQUFDLE9BQUQsQ0FETixHQUNrQixPQUFPLENBQUMsTUFBRCxDQUgvQjtBQUlILENBTEMsRUFNRSxPQUFPLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEIsSUFBOUIsR0FDTSxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0MsTUFBaEMsR0FDQSxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0MsTUFBaEMsU0FSUixFQVVDLFVBQVMsTUFBVCxFQUFpQjtBQUNoQixlQURnQixDQUVoQjs7QUFDQSxFQUFBLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBbkI7QUFDQSxNQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBckI7QUFDQSxNQUFJLE9BQU8sR0FBRyxPQUFkLENBTGdCLENBTWhCOztBQUNBLE1BQUksTUFBSjs7QUFDQSxNQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixJQUFpQyxNQUFNLENBQUMsT0FBNUMsRUFBcUQ7QUFDakQsUUFBSTtBQUNBLE1BQUEsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBRCxDQUFiO0FBQ0gsS0FGRCxDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1YsTUFBQSxNQUFNLEdBQUcsU0FBVDtBQUNIO0FBQ0osR0FkZSxDQWVoQjs7O0FBQ0EsTUFBSSxRQUFRLEdBQ04sa0VBRE47O0FB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LE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBaEI7QUFDSCxHQTNNZSxDQTRNaEI7QUFDQTs7O0FBQ0EsTUFBSSxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsTUFBTSxDQUFDLE9BQTVDLEVBQXFEO0FBQ2pELElBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxNQUFmLEdBQXdCLE1BQU0sQ0FBQyxNQUEvQjtBQUNILEdBRkQsTUFHSyxJQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxNQUFNLENBQUMsR0FBM0MsRUFBZ0Q7QUFDakQ7QUFDQSxJQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUssWUFBVTtBQUFFLGFBQU8sTUFBTSxDQUFDLE1BQWQ7QUFBc0IsS0FBdkMsQ0FBTjtBQUNILEdBcE5lLENBcU5oQjs7O0FBQ0EsU0FBTztBQUFDLElBQUEsTUFBTSxFQUFFLE1BQU0sQ0FBQztBQUFoQixHQUFQO0FBQ0gsQ0FqT0MsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=
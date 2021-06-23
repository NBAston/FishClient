
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/localEncode/jsencrypt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2aa4dJ2LxERa0dfKxVwKoS', 'jsencrypt');
// frames/util/localEncode/jsencrypt.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.JSEncrypt = {});
})(void 0, function (exports) {
  'use strict';

  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

  function int2char(n) {
    return BI_RM.charAt(n);
  } //#region BIT_OPERATIONS
  // (public) this & a


  function op_and(x, y) {
    return x & y;
  } // (public) this | a


  function op_or(x, y) {
    return x | y;
  } // (public) this ^ a


  function op_xor(x, y) {
    return x ^ y;
  } // (public) this & ~a


  function op_andnot(x, y) {
    return x & ~y;
  } // return index of lowest 1-bit in x, x < 2^31


  function lbit(x) {
    if (x == 0) {
      return -1;
    }

    var r = 0;

    if ((x & 0xffff) == 0) {
      x >>= 16;
      r += 16;
    }

    if ((x & 0xff) == 0) {
      x >>= 8;
      r += 8;
    }

    if ((x & 0xf) == 0) {
      x >>= 4;
      r += 4;
    }

    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }

    if ((x & 1) == 0) {
      ++r;
    }

    return r;
  } // return number of 1 bits in x


  function cbit(x) {
    var r = 0;

    while (x != 0) {
      x &= x - 1;
      ++r;
    }

    return r;
  } //#endregion BIT_OPERATIONS


  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";

  function hex2b64(h) {
    var i;
    var c;
    var ret = "";

    for (i = 0; i + 3 <= h.length; i += 3) {
      c = parseInt(h.substring(i, i + 3), 16);
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }

    if (i + 1 == h.length) {
      c = parseInt(h.substring(i, i + 1), 16);
      ret += b64map.charAt(c << 2);
    } else if (i + 2 == h.length) {
      c = parseInt(h.substring(i, i + 2), 16);
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }

    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }

    return ret;
  } // convert a base64 string to hex


  function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3

    var slop = 0;

    for (i = 0; i < s.length; ++i) {
      if (s.charAt(i) == b64pad) {
        break;
      }

      var v = b64map.indexOf(s.charAt(i));

      if (v < 0) {
        continue;
      }

      if (k == 0) {
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 1;
      } else if (k == 1) {
        ret += int2char(slop << 2 | v >> 4);
        slop = v & 0xf;
        k = 2;
      } else if (k == 2) {
        ret += int2char(slop);
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 3;
      } else {
        ret += int2char(slop << 2 | v >> 4);
        ret += int2char(v & 0xf);
        k = 0;
      }
    }

    if (k == 1) {
      ret += int2char(slop << 2);
    }

    return ret;
  }
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */


  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  } // Hex JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */


  var decoder;
  var Hex = {
    decode: function decode(a) {
      var i;

      if (decoder === undefined) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r\t\xA0\u2028\u2029";
        decoder = {};

        for (i = 0; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }

        hex = hex.toLowerCase();

        for (i = 10; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }

        for (i = 0; i < ignore.length; ++i) {
          decoder[ignore.charAt(i)] = -1;
        }
      }

      var out = [];
      var bits = 0;
      var char_count = 0;

      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);

        if (c == "=") {
          break;
        }

        c = decoder[c];

        if (c == -1) {
          continue;
        }

        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }

        bits |= c;

        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 4;
        }
      }

      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }

      return out;
    }
  }; // Base64 JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

  var decoder$1;
  var Base64 = {
    decode: function decode(a) {
      var i;

      if (decoder$1 === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r\t\xA0\u2028\u2029";
        decoder$1 = Object.create(null);

        for (i = 0; i < 64; ++i) {
          decoder$1[b64.charAt(i)] = i;
        }

        for (i = 0; i < ignore.length; ++i) {
          decoder$1[ignore.charAt(i)] = -1;
        }
      }

      var out = [];
      var bits = 0;
      var char_count = 0;

      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);

        if (c == "=") {
          break;
        }

        c = decoder$1[c];

        if (c == -1) {
          continue;
        }

        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }

        bits |= c;

        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          out[out.length] = bits & 0xFF;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 6;
        }
      }

      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");

        case 2:
          out[out.length] = bits >> 10;
          break;

        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          break;
      }

      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function unarmor(a) {
      var m = Base64.re.exec(a);

      if (m) {
        if (m[1]) {
          a = m[1];
        } else if (m[2]) {
          a = m[2];
        } else {
          throw new Error("RegExp out of sync");
        }
      }

      return Base64.decode(a);
    }
  }; // Big integer base-10 printing library
  // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

  var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256

  var Int10 =
  /** @class */
  function () {
    function Int10(value) {
      this.buf = [+value || 0];
    }

    Int10.prototype.mulAdd = function (m, c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;

      for (i = 0; i < l; ++i) {
        t = b[i] * m + c;

        if (t < max) {
          c = 0;
        } else {
          c = 0 | t / max;
          t -= c * max;
        }

        b[i] = t;
      }

      if (c > 0) {
        b[i] = c;
      }
    };

    Int10.prototype.sub = function (c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;

      for (i = 0; i < l; ++i) {
        t = b[i] - c;

        if (t < 0) {
          t += max;
          c = 1;
        } else {
          c = 0;
        }

        b[i] = t;
      }

      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };

    Int10.prototype.toString = function (base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }

      var b = this.buf;
      var s = b[b.length - 1].toString();

      for (var i = b.length - 2; i >= 0; --i) {
        s += (max + b[i]).toString().substring(1);
      }

      return s;
    };

    Int10.prototype.valueOf = function () {
      var b = this.buf;
      var v = 0;

      for (var i = b.length - 1; i >= 0; --i) {
        v = v * max + b[i];
      }

      return v;
    };

    Int10.prototype.simplify = function () {
      var b = this.buf;
      return b.length == 1 ? b[0] : this;
    };

    return Int10;
  }(); // ASN.1 JavaScript decoder


  var ellipsis = "\u2026";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }

    return str;
  }

  var Stream =
  /** @class */
  function () {
    function Stream(enc, pos) {
      this.hexDigits = "0123456789ABCDEF";

      if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else {
        // enc should be an array or a binary string
        this.enc = enc;
        this.pos = pos;
      }
    }

    Stream.prototype.get = function (pos) {
      if (pos === undefined) {
        pos = this.pos++;
      }

      if (pos >= this.enc.length) {
        throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
      }

      return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
    };

    Stream.prototype.hexByte = function (b) {
      return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
    };

    Stream.prototype.hexDump = function (start, end, raw) {
      var s = "";

      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));

        if (raw !== true) {
          switch (i & 0xF) {
            case 0x7:
              s += "  ";
              break;

            case 0xF:
              s += "\n";
              break;

            default:
              s += " ";
          }
        }
      }

      return s;
    };

    Stream.prototype.isASCII = function (start, end) {
      for (var i = start; i < end; ++i) {
        var c = this.get(i);

        if (c < 32 || c > 176) {
          return false;
        }
      }

      return true;
    };

    Stream.prototype.parseStringISO = function (start, end) {
      var s = "";

      for (var i = start; i < end; ++i) {
        s += String.fromCharCode(this.get(i));
      }

      return s;
    };

    Stream.prototype.parseStringUTF = function (start, end) {
      var s = "";

      for (var i = start; i < end;) {
        var c = this.get(i++);

        if (c < 128) {
          s += String.fromCharCode(c);
        } else if (c > 191 && c < 224) {
          s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
        } else {
          s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
        }
      }

      return s;
    };

    Stream.prototype.parseStringBMP = function (start, end) {
      var str = "";
      var hi;
      var lo;

      for (var i = start; i < end;) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode(hi << 8 | lo);
      }

      return str;
    };

    Stream.prototype.parseTime = function (start, end, shortYear) {
      var s = this.parseStringISO(start, end);
      var m = (shortYear ? reTimeS : reTimeL).exec(s);

      if (!m) {
        return "Unrecognized time: " + s;
      }

      if (shortYear) {
        // to avoid querying the timer, use the fixed range [1970, 2069]
        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2000 : 1900;
      }

      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];

      if (m[5]) {
        s += ":" + m[5];

        if (m[6]) {
          s += ":" + m[6];

          if (m[7]) {
            s += "." + m[7];
          }
        }
      }

      if (m[8]) {
        s += " UTC";

        if (m[8] != "Z") {
          s += m[8];

          if (m[9]) {
            s += ":" + m[9];
          }
        }
      }

      return s;
    };

    Stream.prototype.parseInteger = function (start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s = ""; // skip unuseful bits (not allowed in DER)

      while (v == pad && ++start < end) {
        v = this.get(start);
      }

      len = end - start;

      if (len === 0) {
        return neg ? -1 : 0;
      } // show bit length of huge integers


      if (len > 4) {
        s = v;
        len <<= 3;

        while (((+s ^ pad) & 0x80) == 0) {
          s = +s << 1;
          --len;
        }

        s = "(" + len + " bit)\n";
      } // decode the integer


      if (neg) {
        v = v - 256;
      }

      var n = new Int10(v);

      for (var i = start + 1; i < end; ++i) {
        n.mulAdd(256, this.get(i));
      }

      return s + n.toString();
    };

    Stream.prototype.parseBitString = function (start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s = "";

      for (var i = start + 1; i < end; ++i) {
        var b = this.get(i);
        var skip = i == end - 1 ? unusedBit : 0;

        for (var j = 7; j >= skip; --j) {
          s += b >> j & 1 ? "1" : "0";
        }

        if (s.length > maxLength) {
          return intro + stringCut(s, maxLength);
        }
      }

      return intro + s;
    };

    Stream.prototype.parseOctetString = function (start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }

      var len = end - start;
      var s = "(" + len + " byte)\n";
      maxLength /= 2; // we work in bytes

      if (len > maxLength) {
        end = start + maxLength;
      }

      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
      }

      if (len > maxLength) {
        s += ellipsis;
      }

      return s;
    };

    Stream.prototype.parseOID = function (start, end, maxLength) {
      var s = "";
      var n = new Int10();
      var bits = 0;

      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 0x7F);
        bits += 7;

        if (!(v & 0x80)) {
          // finished
          if (s === "") {
            n = n.simplify();

            if (n instanceof Int10) {
              n.sub(80);
              s = "2." + n.toString();
            } else {
              var m = n < 80 ? n < 40 ? 0 : 1 : 2;
              s = m + "." + (n - m * 40);
            }
          } else {
            s += "." + n.toString();
          }

          if (s.length > maxLength) {
            return stringCut(s, maxLength);
          }

          n = new Int10();
          bits = 0;
        }
      }

      if (bits > 0) {
        s += ".incomplete";
      }

      return s;
    };

    return Stream;
  }();

  var ASN1 =
  /** @class */
  function () {
    function ASN1(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }

      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }

    ASN1.prototype.typeName = function () {
      switch (this.tag.tagClass) {
        case 0:
          // universal
          switch (this.tag.tagNumber) {
            case 0x00:
              return "EOC";

            case 0x01:
              return "BOOLEAN";

            case 0x02:
              return "INTEGER";

            case 0x03:
              return "BIT_STRING";

            case 0x04:
              return "OCTET_STRING";

            case 0x05:
              return "NULL";

            case 0x06:
              return "OBJECT_IDENTIFIER";

            case 0x07:
              return "ObjectDescriptor";

            case 0x08:
              return "EXTERNAL";

            case 0x09:
              return "REAL";

            case 0x0A:
              return "ENUMERATED";

            case 0x0B:
              return "EMBEDDED_PDV";

            case 0x0C:
              return "UTF8String";

            case 0x10:
              return "SEQUENCE";

            case 0x11:
              return "SET";

            case 0x12:
              return "NumericString";

            case 0x13:
              return "PrintableString";
            // ASCII subset

            case 0x14:
              return "TeletexString";
            // aka T61String

            case 0x15:
              return "VideotexString";

            case 0x16:
              return "IA5String";
            // ASCII

            case 0x17:
              return "UTCTime";

            case 0x18:
              return "GeneralizedTime";

            case 0x19:
              return "GraphicString";

            case 0x1A:
              return "VisibleString";
            // ASCII subset

            case 0x1B:
              return "GeneralString";

            case 0x1C:
              return "UniversalString";

            case 0x1E:
              return "BMPString";
          }

          return "Universal_" + this.tag.tagNumber.toString();

        case 1:
          return "Application_" + this.tag.tagNumber.toString();

        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        // Context

        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    };

    ASN1.prototype.content = function (maxLength) {
      if (this.tag === undefined) {
        return null;
      }

      if (maxLength === undefined) {
        maxLength = Infinity;
      }

      var content = this.posContent();
      var len = Math.abs(this.length);

      if (!this.tag.isUniversal()) {
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        }

        return this.stream.parseOctetString(content, content + len, maxLength);
      }

      switch (this.tag.tagNumber) {
        case 0x01:
          // BOOLEAN
          return this.stream.get(content) === 0 ? "false" : "true";

        case 0x02:
          // INTEGER
          return this.stream.parseInteger(content, content + len);

        case 0x03:
          // BIT_STRING
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);

        case 0x04:
          // OCTET_STRING
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
        // case 0x05: // NULL

        case 0x06:
          // OBJECT_IDENTIFIER
          return this.stream.parseOID(content, content + len, maxLength);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV

        case 0x10: // SEQUENCE

        case 0x11:
          // SET
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          } else {
            return "(no elem)";
          }

        case 0x0C:
          // UTF8String
          return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);

        case 0x12: // NumericString

        case 0x13: // PrintableString

        case 0x14: // TeletexString

        case 0x15: // VideotexString

        case 0x16: // IA5String
        // case 0x19: // GraphicString

        case 0x1A:
          // VisibleString
          // case 0x1B: // GeneralString
          // case 0x1C: // UniversalString
          return stringCut(this.stream.parseStringISO(content, content + len), maxLength);

        case 0x1E:
          // BMPString
          return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);

        case 0x17: // UTCTime

        case 0x18:
          // GeneralizedTime
          return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);
      }

      return null;
    };

    ASN1.prototype.toString = function () {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    };

    ASN1.prototype.toPrettyString = function (indent) {
      if (indent === undefined) {
        indent = "";
      }

      var s = indent + this.typeName() + " @" + this.stream.pos;

      if (this.length >= 0) {
        s += "+";
      }

      s += this.length;

      if (this.tag.tagConstructed) {
        s += " (constructed)";
      } else if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
        s += " (encapsulates)";
      }

      s += "\n";

      if (this.sub !== null) {
        indent += "  ";

        for (var i = 0, max = this.sub.length; i < max; ++i) {
          s += this.sub[i].toPrettyString(indent);
        }
      }

      return s;
    };

    ASN1.prototype.posStart = function () {
      return this.stream.pos;
    };

    ASN1.prototype.posContent = function () {
      return this.stream.pos + this.header;
    };

    ASN1.prototype.posEnd = function () {
      return this.stream.pos + this.header + Math.abs(this.length);
    };

    ASN1.prototype.toHexString = function () {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };

    ASN1.decodeLength = function (stream) {
      var buf = stream.get();
      var len = buf & 0x7F;

      if (len == buf) {
        return len;
      } // no reason to use Int10, as it would be a huge buffer anyways


      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }

      if (len === 0) {
        return null;
      } // undefined


      buf = 0;

      for (var i = 0; i < len; ++i) {
        buf = buf * 256 + stream.get();
      }

      return buf;
    };
    /**
     * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
     * @returns {string}
     * @public
     */


    ASN1.prototype.getHexStringValue = function () {
      var hexString = this.toHexString();
      var offset = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset, length);
    };

    ASN1.decode = function (str) {
      var stream;

      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else {
        stream = str;
      }

      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN1.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;

      var getSub = function getSub() {
        var ret = [];

        if (len !== null) {
          // definite length
          var end = start + len;

          while (stream.pos < end) {
            ret[ret.length] = ASN1.decode(stream);
          }

          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else {
          // undefined length
          try {
            for (;;) {
              var s = ASN1.decode(stream);

              if (s.tag.isEOC()) {
                break;
              }

              ret[ret.length] = s;
            }

            len = start - stream.pos; // undefined lengths are represented as negative values
          } catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e);
          }
        }

        return ret;
      };

      if (tag.tagConstructed) {
        // must have valid content
        sub = getSub();
      } else if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
        // sometimes BitString and OctetString are used to encapsulate ASN.1
        try {
          if (tag.tagNumber == 0x03) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }

          sub = getSub();

          for (var i = 0; i < sub.length; ++i) {
            if (sub[i].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        } catch (e) {
          // but silently ignore when they don't
          sub = null;
        }
      }

      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }

        stream.pos = start + Math.abs(len);
      }

      return new ASN1(streamStart, header, len, tag, sub);
    };

    return ASN1;
  }();

  var ASN1Tag =
  /** @class */
  function () {
    function ASN1Tag(stream) {
      var buf = stream.get();
      this.tagClass = buf >> 6;
      this.tagConstructed = (buf & 0x20) !== 0;
      this.tagNumber = buf & 0x1F;

      if (this.tagNumber == 0x1F) {
        // long tag
        var n = new Int10();

        do {
          buf = stream.get();
          n.mulAdd(128, buf & 0x7F);
        } while (buf & 0x80);

        this.tagNumber = n.simplify();
      }
    }

    ASN1Tag.prototype.isUniversal = function () {
      return this.tagClass === 0x00;
    };

    ASN1Tag.prototype.isEOC = function () {
      return this.tagClass === 0x00 && this.tagNumber === 0x00;
    };

    return ASN1Tag;
  }(); // Copyright (c) 2005  Tom Wu
  // Bits per digit


  var dbits; // JavaScript engine analysis

  var canary = 0xdeadbeefcafe;
  var j_lm = (canary & 0xffffff) == 0xefcafe; //#region

  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; //#endregion
  // (public) Constructor

  var BigInteger =
  /** @class */
  function () {
    function BigInteger(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else {
          this.fromString(a, b);
        }
      }
    } //#region PUBLIC
    // BigInteger.prototype.toString = bnToString;
    // (public) return string representation in given radix


    BigInteger.prototype.toString = function (b) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b);
      }

      var k;

      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        return this.toRadix(b);
      }

      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i = this.t;
      var p = this.DB - i * this.DB % k;

      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }

        while (i >= 0) {
          if (p < k) {
            d = (this[i] & (1 << p) - 1) << k - p;
            d |= this[--i] >> (p += this.DB - k);
          } else {
            d = this[i] >> (p -= k) & km;

            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }

          if (d > 0) {
            m = true;
          }

          if (m) {
            r += int2char(d);
          }
        }
      }

      return m ? r : "0";
    }; // BigInteger.prototype.negate = bnNegate;
    // (public) -this


    BigInteger.prototype.negate = function () {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    }; // BigInteger.prototype.abs = bnAbs;
    // (public) |this|


    BigInteger.prototype.abs = function () {
      return this.s < 0 ? this.negate() : this;
    }; // BigInteger.prototype.compareTo = bnCompareTo;
    // (public) return + if this > a, - if this < a, 0 if equal


    BigInteger.prototype.compareTo = function (a) {
      var r = this.s - a.s;

      if (r != 0) {
        return r;
      }

      var i = this.t;
      r = i - a.t;

      if (r != 0) {
        return this.s < 0 ? -r : r;
      }

      while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
          return r;
        }
      }

      return 0;
    }; // BigInteger.prototype.bitLength = bnBitLength;
    // (public) return the number of bits in "this"


    BigInteger.prototype.bitLength = function () {
      if (this.t <= 0) {
        return 0;
      }

      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    }; // BigInteger.prototype.mod = bnMod;
    // (public) this mod a


    BigInteger.prototype.mod = function (a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);

      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
      }

      return r;
    }; // BigInteger.prototype.modPowInt = bnModPowInt;
    // (public) this^e % m, 0 <= e < 2^32


    BigInteger.prototype.modPowInt = function (e, m) {
      var z;

      if (e < 256 || m.isEven()) {
        z = new Classic(m);
      } else {
        z = new Montgomery(m);
      }

      return this.exp(e, z);
    }; // BigInteger.prototype.clone = bnClone;
    // (public)


    BigInteger.prototype.clone = function () {
      var r = nbi();
      this.copyTo(r);
      return r;
    }; // BigInteger.prototype.intValue = bnIntValue;
    // (public) return value as integer


    BigInteger.prototype.intValue = function () {
      if (this.s < 0) {
        if (this.t == 1) {
          return this[0] - this.DV;
        } else if (this.t == 0) {
          return -1;
        }
      } else if (this.t == 1) {
        return this[0];
      } else if (this.t == 0) {
        return 0;
      } // assumes 16 < DB < 32


      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }; // BigInteger.prototype.byteValue = bnByteValue;
    // (public) return value as byte


    BigInteger.prototype.byteValue = function () {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }; // BigInteger.prototype.shortValue = bnShortValue;
    // (public) return value as short (assumes DB>=16)


    BigInteger.prototype.shortValue = function () {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }; // BigInteger.prototype.signum = bnSigNum;
    // (public) 0 if this == 0, 1 if this > 0


    BigInteger.prototype.signum = function () {
      if (this.s < 0) {
        return -1;
      } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
        return 0;
      } else {
        return 1;
      }
    }; // BigInteger.prototype.toByteArray = bnToByteArray;
    // (public) convert to bigendian byte array


    BigInteger.prototype.toByteArray = function () {
      var i = this.t;
      var r = [];
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8;
      var d;
      var k = 0;

      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
          r[k++] = d | this.s << this.DB - p;
        }

        while (i >= 0) {
          if (p < 8) {
            d = (this[i] & (1 << p) - 1) << 8 - p;
            d |= this[--i] >> (p += this.DB - 8);
          } else {
            d = this[i] >> (p -= 8) & 0xff;

            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }

          if ((d & 0x80) != 0) {
            d |= -256;
          }

          if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
            ++k;
          }

          if (k > 0 || d != this.s) {
            r[k++] = d;
          }
        }
      }

      return r;
    }; // BigInteger.prototype.equals = bnEquals;


    BigInteger.prototype.equals = function (a) {
      return this.compareTo(a) == 0;
    }; // BigInteger.prototype.min = bnMin;


    BigInteger.prototype.min = function (a) {
      return this.compareTo(a) < 0 ? this : a;
    }; // BigInteger.prototype.max = bnMax;


    BigInteger.prototype.max = function (a) {
      return this.compareTo(a) > 0 ? this : a;
    }; // BigInteger.prototype.and = bnAnd;


    BigInteger.prototype.and = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }; // BigInteger.prototype.or = bnOr;


    BigInteger.prototype.or = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }; // BigInteger.prototype.xor = bnXor;


    BigInteger.prototype.xor = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }; // BigInteger.prototype.andNot = bnAndNot;


    BigInteger.prototype.andNot = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }; // BigInteger.prototype.not = bnNot;
    // (public) ~this


    BigInteger.prototype.not = function () {
      var r = nbi();

      for (var i = 0; i < this.t; ++i) {
        r[i] = this.DM & ~this[i];
      }

      r.t = this.t;
      r.s = ~this.s;
      return r;
    }; // BigInteger.prototype.shiftLeft = bnShiftLeft;
    // (public) this << n


    BigInteger.prototype.shiftLeft = function (n) {
      var r = nbi();

      if (n < 0) {
        this.rShiftTo(-n, r);
      } else {
        this.lShiftTo(n, r);
      }

      return r;
    }; // BigInteger.prototype.shiftRight = bnShiftRight;
    // (public) this >> n


    BigInteger.prototype.shiftRight = function (n) {
      var r = nbi();

      if (n < 0) {
        this.lShiftTo(-n, r);
      } else {
        this.rShiftTo(n, r);
      }

      return r;
    }; // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    // (public) returns index of lowest 1-bit (or -1 if none)


    BigInteger.prototype.getLowestSetBit = function () {
      for (var i = 0; i < this.t; ++i) {
        if (this[i] != 0) {
          return i * this.DB + lbit(this[i]);
        }
      }

      if (this.s < 0) {
        return this.t * this.DB;
      }

      return -1;
    }; // BigInteger.prototype.bitCount = bnBitCount;
    // (public) return number of set bits


    BigInteger.prototype.bitCount = function () {
      var r = 0;
      var x = this.s & this.DM;

      for (var i = 0; i < this.t; ++i) {
        r += cbit(this[i] ^ x);
      }

      return r;
    }; // BigInteger.prototype.testBit = bnTestBit;
    // (public) true iff nth bit is set


    BigInteger.prototype.testBit = function (n) {
      var j = Math.floor(n / this.DB);

      if (j >= this.t) {
        return this.s != 0;
      }

      return (this[j] & 1 << n % this.DB) != 0;
    }; // BigInteger.prototype.setBit = bnSetBit;
    // (public) this | (1<<n)


    BigInteger.prototype.setBit = function (n) {
      return this.changeBit(n, op_or);
    }; // BigInteger.prototype.clearBit = bnClearBit;
    // (public) this & ~(1<<n)


    BigInteger.prototype.clearBit = function (n) {
      return this.changeBit(n, op_andnot);
    }; // BigInteger.prototype.flipBit = bnFlipBit;
    // (public) this ^ (1<<n)


    BigInteger.prototype.flipBit = function (n) {
      return this.changeBit(n, op_xor);
    }; // BigInteger.prototype.add = bnAdd;
    // (public) this + a


    BigInteger.prototype.add = function (a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }; // BigInteger.prototype.subtract = bnSubtract;
    // (public) this - a


    BigInteger.prototype.subtract = function (a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }; // BigInteger.prototype.multiply = bnMultiply;
    // (public) this * a


    BigInteger.prototype.multiply = function (a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }; // BigInteger.prototype.divide = bnDivide;
    // (public) this / a


    BigInteger.prototype.divide = function (a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }; // BigInteger.prototype.remainder = bnRemainder;
    // (public) this % a


    BigInteger.prototype.remainder = function (a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }; // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    // (public) [this/a,this%a]


    BigInteger.prototype.divideAndRemainder = function (a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    }; // BigInteger.prototype.modPow = bnModPow;
    // (public) this^e % m (HAC 14.85)


    BigInteger.prototype.modPow = function (e, m) {
      var i = e.bitLength();
      var k;
      var r = nbv(1);
      var z;

      if (i <= 0) {
        return r;
      } else if (i < 18) {
        k = 1;
      } else if (i < 48) {
        k = 3;
      } else if (i < 144) {
        k = 4;
      } else if (i < 768) {
        k = 5;
      } else {
        k = 6;
      }

      if (i < 8) {
        z = new Classic(m);
      } else if (m.isEven()) {
        z = new Barrett(m);
      } else {
        z = new Montgomery(m);
      } // precomputation


      var g = [];
      var n = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z.convert(this);

      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);

        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }

      var j = e.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t;
      i = nbits(e[j]) - 1;

      while (j >= 0) {
        if (i >= k1) {
          w = e[j] >> i - k1 & km;
        } else {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;

          if (j > 0) {
            w |= e[j - 1] >> this.DB + i - k1;
          }
        }

        n = k;

        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }

        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }

        if (is1) {
          // ret == 1, don't bother squaring or multiplying it
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }

          if (n > 0) {
            z.sqrTo(r, r2);
          } else {
            t = r;
            r = r2;
            r2 = t;
          }

          z.mulTo(r2, g[w], r);
        }

        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;

          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }

      return z.revert(r);
    }; // BigInteger.prototype.modInverse = bnModInverse;
    // (public) 1/this % m (HAC 14.61)


    BigInteger.prototype.modInverse = function (m) {
      var ac = m.isEven();

      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger.ZERO;
      }

      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);

      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);

          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }

            a.rShiftTo(1, a);
          } else if (!b.isEven()) {
            b.subTo(m, b);
          }

          b.rShiftTo(1, b);
        }

        while (v.isEven()) {
          v.rShiftTo(1, v);

          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }

            c.rShiftTo(1, c);
          } else if (!d.isEven()) {
            d.subTo(m, d);
          }

          d.rShiftTo(1, d);
        }

        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);

          if (ac) {
            a.subTo(c, a);
          }

          b.subTo(d, b);
        } else {
          v.subTo(u, v);

          if (ac) {
            c.subTo(a, c);
          }

          d.subTo(b, d);
        }
      }

      if (v.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
      }

      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }

      if (d.signum() < 0) {
        d.addTo(m, d);
      } else {
        return d;
      }

      if (d.signum() < 0) {
        return d.add(m);
      } else {
        return d;
      }
    }; // BigInteger.prototype.pow = bnPow;
    // (public) this^e


    BigInteger.prototype.pow = function (e) {
      return this.exp(e, new NullExp());
    }; // BigInteger.prototype.gcd = bnGCD;
    // (public) gcd(this,a) (HAC 14.54)


    BigInteger.prototype.gcd = function (a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();

      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }

      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();

      if (g < 0) {
        return x;
      }

      if (i < g) {
        g = i;
      }

      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }

      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }

        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }

        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }

      if (g > 0) {
        y.lShiftTo(g, y);
      }

      return y;
    }; // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    // (public) test primality with certainty >= 1-.5^t


    BigInteger.prototype.isProbablePrime = function (t) {
      var i;
      var x = this.abs();

      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) {
          if (x[0] == lowprimes[i]) {
            return true;
          }
        }

        return false;
      }

      if (x.isEven()) {
        return false;
      }

      i = 1;

      while (i < lowprimes.length) {
        var m = lowprimes[i];
        var j = i + 1;

        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }

        m = x.modInt(m);

        while (i < j) {
          if (m % lowprimes[i++] == 0) {
            return false;
          }
        }
      }

      return x.millerRabin(t);
    }; //#endregion PUBLIC
    //#region PROTECTED
    // BigInteger.prototype.copyTo = bnpCopyTo;
    // (protected) copy this to r


    BigInteger.prototype.copyTo = function (r) {
      for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
      }

      r.t = this.t;
      r.s = this.s;
    }; // BigInteger.prototype.fromInt = bnpFromInt;
    // (protected) set from integer value x, -DV <= x < DV


    BigInteger.prototype.fromInt = function (x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;

      if (x > 0) {
        this[0] = x;
      } else if (x < -1) {
        this[0] = x + this.DV;
      } else {
        this.t = 0;
      }
    }; // BigInteger.prototype.fromString = bnpFromString;
    // (protected) set from string and radix


    BigInteger.prototype.fromString = function (s, b) {
      var k;

      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 256) {
        k = 8;
        /* byte array */
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        this.fromRadix(s, b);
        return;
      }

      this.t = 0;
      this.s = 0;
      var i = s.length;
      var mi = false;
      var sh = 0;

      while (--i >= 0) {
        var x = k == 8 ? +s[i] & 0xff : intAt(s, i);

        if (x < 0) {
          if (s.charAt(i) == "-") {
            mi = true;
          }

          continue;
        }

        mi = false;

        if (sh == 0) {
          this[this.t++] = x;
        } else if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else {
          this[this.t - 1] |= x << sh;
        }

        sh += k;

        if (sh >= this.DB) {
          sh -= this.DB;
        }
      }

      if (k == 8 && (+s[0] & 0x80) != 0) {
        this.s = -1;

        if (sh > 0) {
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
      }

      this.clamp();

      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    }; // BigInteger.prototype.clamp = bnpClamp;
    // (protected) clamp off excess high words


    BigInteger.prototype.clamp = function () {
      var c = this.s & this.DM;

      while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
      }
    }; // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    // (protected) r = this << n*DB


    BigInteger.prototype.dlShiftTo = function (n, r) {
      var i;

      for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
      }

      for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
      }

      r.t = this.t + n;
      r.s = this.s;
    }; // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    // (protected) r = this >> n*DB


    BigInteger.prototype.drShiftTo = function (n, r) {
      for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
      }

      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    }; // BigInteger.prototype.lShiftTo = bnpLShiftTo;
    // (protected) r = this << n


    BigInteger.prototype.lShiftTo = function (n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB);
      var c = this.s << bs & this.DM;

      for (var i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = this[i] >> cbs | c;
        c = (this[i] & bm) << bs;
      }

      for (var i = ds - 1; i >= 0; --i) {
        r[i] = 0;
      }

      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    }; // BigInteger.prototype.rShiftTo = bnpRShiftTo;
    // (protected) r = this >> n


    BigInteger.prototype.rShiftTo = function (n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);

      if (ds >= this.t) {
        r.t = 0;
        return;
      }

      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;

      for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
      }

      if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      }

      r.t = this.t - ds;
      r.clamp();
    }; // BigInteger.prototype.subTo = bnpSubTo;
    // (protected) r = this - a


    BigInteger.prototype.subTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);

      while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }

      if (a.t < this.t) {
        c -= a.s;

        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }

        c += this.s;
      } else {
        c += this.s;

        while (i < a.t) {
          c -= a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }

        c -= a.s;
      }

      r.s = c < 0 ? -1 : 0;

      if (c < -1) {
        r[i++] = this.DV + c;
      } else if (c > 0) {
        r[i++] = c;
      }

      r.t = i;
      r.clamp();
    }; // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyTo = function (a, r) {
      var x = this.abs();
      var y = a.abs();
      var i = x.t;
      r.t = i + y.t;

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      }

      r.s = 0;
      r.clamp();

      if (this.s != a.s) {
        BigInteger.ZERO.subTo(r, r);
      }
    }; // BigInteger.prototype.squareTo = bnpSquareTo;
    // (protected) r = this^2, r != this (HAC 14.16)


    BigInteger.prototype.squareTo = function (r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);

        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }

      if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      }

      r.s = 0;
      r.clamp();
    }; // BigInteger.prototype.divRemTo = bnpDivRemTo;
    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.


    BigInteger.prototype.divRemTo = function (m, q, r) {
      var pm = m.abs();

      if (pm.t <= 0) {
        return;
      }

      var pt = this.abs();

      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }

        if (r != null) {
          this.copyTo(r);
        }

        return;
      }

      if (r == null) {
        r = nbi();
      }

      var y = nbi();
      var ts = this.s;
      var ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus

      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }

      var ys = y.t;
      var y0 = y[ys - 1];

      if (y0 == 0) {
        return;
      }

      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e = 1 << this.F2;
      var i = r.t;
      var j = i - ys;
      var t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);

      if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
      }

      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y); // "negative" y so we can replace sub with am later

      while (y.t < ys) {
        y[y.t++] = 0;
      }

      while (--j >= 0) {
        // Estimate quotient digit
        var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);

        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          // Try it out
          y.dlShiftTo(j, t);
          r.subTo(t, r);

          while (r[i] < --qd) {
            r.subTo(t, r);
          }
        }
      }

      if (q != null) {
        r.drShiftTo(ys, q);

        if (ts != ms) {
          BigInteger.ZERO.subTo(q, q);
        }
      }

      r.t = ys;
      r.clamp();

      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      } // Denormalize remainder


      if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
      }
    }; // BigInteger.prototype.invDigit = bnpInvDigit;
    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.


    BigInteger.prototype.invDigit = function () {
      if (this.t < 1) {
        return 0;
      }

      var x = this[0];

      if ((x & 1) == 0) {
        return 0;
      }

      var y = x & 3; // y == 1/x mod 2^2

      y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4

      y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8

      y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
      // last step - calculate inverse mod DV directly;
      // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints

      y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
      // we really want the negative inverse, and -DV < y < DV

      return y > 0 ? this.DV - y : -y;
    }; // BigInteger.prototype.isEven = bnpIsEven;
    // (protected) true iff this is even


    BigInteger.prototype.isEven = function () {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }; // BigInteger.prototype.exp = bnpExp;
    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)


    BigInteger.prototype.exp = function (e, z) {
      if (e > 0xffffffff || e < 1) {
        return BigInteger.ONE;
      }

      var r = nbi();
      var r2 = nbi();
      var g = z.convert(this);
      var i = nbits(e) - 1;
      g.copyTo(r);

      while (--i >= 0) {
        z.sqrTo(r, r2);

        if ((e & 1 << i) > 0) {
          z.mulTo(r2, g, r);
        } else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }

      return z.revert(r);
    }; // BigInteger.prototype.chunkSize = bnpChunkSize;
    // (protected) return x s.t. r^x < DV


    BigInteger.prototype.chunkSize = function (r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }; // BigInteger.prototype.toRadix = bnpToRadix;
    // (protected) convert to radix string


    BigInteger.prototype.toRadix = function (b) {
      if (b == null) {
        b = 10;
      }

      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }

      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z = nbi();
      var r = "";
      this.divRemTo(d, y, z);

      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }

      return z.intValue().toString(b) + r;
    }; // BigInteger.prototype.fromRadix = bnpFromRadix;
    // (protected) convert from radix string


    BigInteger.prototype.fromRadix = function (s, b) {
      this.fromInt(0);

      if (b == null) {
        b = 10;
      }

      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;

      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);

        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0) {
            mi = true;
          }

          continue;
        }

        w = b * w + x;

        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }

      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }

      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    }; // BigInteger.prototype.fromNumber = bnpFromNumber;
    // (protected) alternate constructor


    BigInteger.prototype.fromNumber = function (a, b, c) {
      if ("number" == typeof b) {
        // new BigInteger(int,int,RNG)
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);

          if (!this.testBit(a - 1)) {
            // force MSB set
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }

          if (this.isEven()) {
            this.dAddOffset(1, 0);
          } // force odd


          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);

            if (this.bitLength() > a) {
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
            }
          }
        }
      } else {
        // new BigInteger(int,RNG)
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);

        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }

        this.fromString(x, 256);
      }
    }; // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    // (protected) r = this op a (bitwise)


    BigInteger.prototype.bitwiseTo = function (a, op, r) {
      var i;
      var f;
      var m = Math.min(a.t, this.t);

      for (i = 0; i < m; ++i) {
        r[i] = op(this[i], a[i]);
      }

      if (a.t < this.t) {
        f = a.s & this.DM;

        for (i = m; i < this.t; ++i) {
          r[i] = op(this[i], f);
        }

        r.t = this.t;
      } else {
        f = this.s & this.DM;

        for (i = m; i < a.t; ++i) {
          r[i] = op(f, a[i]);
        }

        r.t = a.t;
      }

      r.s = op(this.s, a.s);
      r.clamp();
    }; // BigInteger.prototype.changeBit = bnpChangeBit;
    // (protected) this op (1<<n)


    BigInteger.prototype.changeBit = function (n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    }; // BigInteger.prototype.addTo = bnpAddTo;
    // (protected) r = this + a


    BigInteger.prototype.addTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);

      while (i < m) {
        c += this[i] + a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }

      if (a.t < this.t) {
        c += a.s;

        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }

        c += this.s;
      } else {
        c += this.s;

        while (i < a.t) {
          c += a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }

        c += a.s;
      }

      r.s = c < 0 ? -1 : 0;

      if (c > 0) {
        r[i++] = c;
      } else if (c < -1) {
        r[i++] = this.DV + c;
      }

      r.t = i;
      r.clamp();
    }; // BigInteger.prototype.dMultiply = bnpDMultiply;
    // (protected) this *= n, this >= 0, 1 < n < DV


    BigInteger.prototype.dMultiply = function (n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }; // BigInteger.prototype.dAddOffset = bnpDAddOffset;
    // (protected) this += n << w words, this >= 0


    BigInteger.prototype.dAddOffset = function (n, w) {
      if (n == 0) {
        return;
      }

      while (this.t <= w) {
        this[this.t++] = 0;
      }

      this[w] += n;

      while (this[w] >= this.DV) {
        this[w] -= this.DV;

        if (++w >= this.t) {
          this[this.t++] = 0;
        }

        ++this[w];
      }
    }; // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0; // assumes a,this >= 0

      r.t = i;

      while (i > 0) {
        r[--i] = 0;
      }

      for (var j = r.t - this.t; i < j; ++i) {
        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
      }

      for (var j = Math.min(a.t, n); i < j; ++i) {
        this.am(0, a[i], r, i, 0, n - i);
      }

      r.clamp();
    }; // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0; // assumes a,this >= 0

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
      }

      r.clamp();
      r.drShiftTo(1, r);
    }; // BigInteger.prototype.modInt = bnpModInt;
    // (protected) this % n, n < 2^26


    BigInteger.prototype.modInt = function (n) {
      if (n <= 0) {
        return 0;
      }

      var d = this.DV % n;
      var r = this.s < 0 ? n - 1 : 0;

      if (this.t > 0) {
        if (d == 0) {
          r = this[0] % n;
        } else {
          for (var i = this.t - 1; i >= 0; --i) {
            r = (d * r + this[i]) % n;
          }
        }
      }

      return r;
    }; // BigInteger.prototype.millerRabin = bnpMillerRabin;
    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)


    BigInteger.prototype.millerRabin = function (t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();

      if (k <= 0) {
        return false;
      }

      var r = n1.shiftRight(k);
      t = t + 1 >> 1;

      if (t > lowprimes.length) {
        t = lowprimes.length;
      }

      var a = nbi();

      for (var i = 0; i < t; ++i) {
        // Pick bases at random, instead of starting at 2
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);

        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;

          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);

            if (y.compareTo(BigInteger.ONE) == 0) {
              return false;
            }
          }

          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }

      return true;
    }; // BigInteger.prototype.square = bnSquare;
    // (public) this^2


    BigInteger.prototype.square = function () {
      var r = nbi();
      this.squareTo(r);
      return r;
    }; //#region ASYNC
    // Public API method


    BigInteger.prototype.gcda = function (a, callback) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();

      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }

      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();

      if (g < 0) {
        callback(x);
        return;
      }

      if (i < g) {
        g = i;
      }

      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      } // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.


      var gcda1 = function gcda1() {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }

        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }

        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }

        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }

          setTimeout(function () {
            callback(y);
          }, 0); // escape
        } else {
          setTimeout(gcda1, 0);
        }
      };

      setTimeout(gcda1, 10);
    }; // (protected) alternate constructor


    BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);

          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }

          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }

          var bnp_1 = this;

          var bnpfn1_1 = function bnpfn1_1() {
            bnp_1.dAddOffset(2, 0);

            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
            }

            if (bnp_1.isProbablePrime(b)) {
              setTimeout(function () {
                callback();
              }, 0); // escape
            } else {
              setTimeout(bnpfn1_1, 0);
            }
          };

          setTimeout(bnpfn1_1, 0);
        }
      } else {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);

        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }

        this.fromString(x, 256);
      }
    };

    return BigInteger;
  }(); //#region REDUCERS
  //#region NullExp


  var NullExp =
  /** @class */
  function () {
    function NullExp() {} // NullExp.prototype.convert = nNop;


    NullExp.prototype.convert = function (x) {
      return x;
    }; // NullExp.prototype.revert = nNop;


    NullExp.prototype.revert = function (x) {
      return x;
    }; // NullExp.prototype.mulTo = nMulTo;


    NullExp.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
    }; // NullExp.prototype.sqrTo = nSqrTo;


    NullExp.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
    };

    return NullExp;
  }(); // Modular reduction using "classic" algorithm


  var Classic =
  /** @class */
  function () {
    function Classic(m) {
      this.m = m;
    } // Classic.prototype.convert = cConvert;


    Classic.prototype.convert = function (x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
      } else {
        return x;
      }
    }; // Classic.prototype.revert = cRevert;


    Classic.prototype.revert = function (x) {
      return x;
    }; // Classic.prototype.reduce = cReduce;


    Classic.prototype.reduce = function (x) {
      x.divRemTo(this.m, null, x);
    }; // Classic.prototype.mulTo = cMulTo;


    Classic.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Classic.prototype.sqrTo = cSqrTo;


    Classic.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Classic;
  }(); //#endregion
  //#region Montgomery
  // Montgomery reduction


  var Montgomery =
  /** @class */
  function () {
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 0x7fff;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    } // Montgomery.prototype.convert = montConvert;
    // xR mod m


    Montgomery.prototype.convert = function (x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);

      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
      }

      return r;
    }; // Montgomery.prototype.revert = montRevert;
    // x/R mod m


    Montgomery.prototype.revert = function (x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }; // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)


    Montgomery.prototype.reduce = function (x) {
      while (x.t <= this.mt2) {
        // pad x so am has enough room later
        x[x.t++] = 0;
      }

      for (var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 0x7fff;
        var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM; // use am to combine the multiply-shift-add into one call

        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t); // propagate carry

        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }

      x.clamp();
      x.drShiftTo(this.m.t, x);

      if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    }; // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r


    Montgomery.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r


    Montgomery.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Montgomery;
  }(); //#endregion Montgomery
  //#region Barrett
  // Barrett modular reduction


  var Barrett =
  /** @class */
  function () {
    function Barrett(m) {
      this.m = m; // setup Barrett

      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
    } // Barrett.prototype.convert = barrettConvert;


    Barrett.prototype.convert = function (x) {
      if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
      } else if (x.compareTo(this.m) < 0) {
        return x;
      } else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }; // Barrett.prototype.revert = barrettRevert;


    Barrett.prototype.revert = function (x) {
      return x;
    }; // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)


    Barrett.prototype.reduce = function (x) {
      x.drShiftTo(this.m.t - 1, this.r2);

      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }

      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);

      while (x.compareTo(this.r2) < 0) {
        x.dAddOffset(1, this.m.t + 1);
      }

      x.subTo(this.r2, x);

      while (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    }; // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r


    Barrett.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r


    Barrett.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Barrett;
  }(); //#endregion
  //#endregion REDUCERS
  // return new, unset BigInteger


  function nbi() {
    return new BigInteger(null);
  }

  function parseBigInt(str, r) {
    return new BigInteger(str, r);
  } // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)


  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }

    return c;
  } // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)


  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;

    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }

    return c;
  } // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.


  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;

    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }

    return c;
  }

  var navigator = {};
  navigator.userAgent = false;

  if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP; // Digit conversions

  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);

  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }

  rr = "a".charCodeAt(0);

  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }

  rr = "A".charCodeAt(0);

  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }

  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  } // return bigint initialized to value


  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  } // returns bit length of the integer x


  function nbits(x) {
    var r = 1;
    var t;

    if ((t = x >>> 16) != 0) {
      x = t;
      r += 16;
    }

    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }

    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }

    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }

    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }

    return r;
  } // "constants"


  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1); // prng4.js - uses Arcfour as a PRNG

  var Arcfour =
  /** @class */
  function () {
    function Arcfour() {
      this.i = 0;
      this.j = 0;
      this.S = [];
    } // Arcfour.prototype.init = ARC4init;
    // Initialize arcfour context from key, an array of ints, each from [0..255]


    Arcfour.prototype.init = function (key) {
      var i;
      var j;
      var t;

      for (i = 0; i < 256; ++i) {
        this.S[i] = i;
      }

      j = 0;

      for (i = 0; i < 256; ++i) {
        j = j + this.S[i] + key[i % key.length] & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
      }

      this.i = 0;
      this.j = 0;
    }; // Arcfour.prototype.next = ARC4next;


    Arcfour.prototype.next = function () {
      var t;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t;
      return this.S[t + this.S[this.i] & 255];
    };

    return Arcfour;
  }(); // Plug in your RNG constructor here


  function prng_newstate() {
    return new Arcfour();
  } // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()


  var rng_psize = 256; // Random number generator - requires a PRNG backend, e.g. prng4.js

  var rng_state;
  var rng_pool = null;
  var rng_pptr; // Initialize the pool with junk if needed.

  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t = void 0;

    if (window.crypto && window.crypto.getRandomValues) {
      // Extract entropy (2048 bits) from RNG if available
      var z = new Uint32Array(256);
      window.crypto.getRandomValues(z);

      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z[t] & 255;
      }
    } // Use mouse events for entropy, if we do not have enough entropy by the time
    // we need it, entropy will be generated by Math.random.


    var onMouseMoveListener_1 = function onMouseMoveListener_1(ev) {
      this.count = this.count || 0;

      if (this.count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }

        return;
      }

      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        this.count += 1;
      } catch (e) {// Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
      }
    };

    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }

  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate(); // At this point, we may not have collected enough entropy.  If not, fall back to Math.random

      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }

      rng_state.init(rng_pool);

      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }

      rng_pptr = 0;
    } // TODO: allow reseeding after first request


    return rng_state.next();
  }

  var SecureRandom =
  /** @class */
  function () {
    function SecureRandom() {}

    SecureRandom.prototype.nextBytes = function (ba) {
      for (var i = 0; i < ba.length; ++i) {
        ba[i] = rng_get_byte();
      }
    };

    return SecureRandom;
  }(); // Depends on jsbn.js and rng.js
  // function linebrk(s,n) {
  //   var ret = "";
  //   var i = 0;
  //   while(i + n < s.length) {
  //     ret += s.substring(i,i+n) + "\n";
  //     i += n;
  //   }
  //   return ret + s.substring(i,s.length);
  // }
  // function byte2Hex(b) {
  //   if(b < 0x10)
  //     return "0" + b.toString(16);
  //   else
  //     return b.toString(16);
  // }


  function pkcs1pad1(s, n) {
    if (n < s.length + 22) {
      console.error("Message too long for RSA");
      return null;
    }

    var len = n - s.length - 6;
    var filler = "";

    for (var f = 0; f < len; f += 2) {
      filler += "ff";
    }

    var m = "0001" + filler + "00" + s;
    return parseBigInt(m, 16);
  } // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint


  function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
      // TODO: fix for utf-8
      console.error("Message too long for RSA");
      return null;
    }

    var ba = [];
    var i = s.length - 1;

    while (i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);

      if (c < 128) {
        // encode using utf-8
        ba[--n] = c;
      } else if (c > 127 && c < 2048) {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 | 192;
      } else {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 & 63 | 128;
        ba[--n] = c >> 12 | 224;
      }
    }

    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = [];

    while (n > 2) {
      // random non-zero pad
      x[0] = 0;

      while (x[0] == 0) {
        rng.nextBytes(x);
      }

      ba[--n] = x[0];
    }

    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  } // "empty" RSA key constructor


  var RSAKey =
  /** @class */
  function () {
    function RSAKey() {
      this.n = null;
      this.e = 0;
      this.d = null;
      this.p = null;
      this.q = null;
      this.dmp1 = null;
      this.dmq1 = null;
      this.coeff = null;
    } //#region PROTECTED
    // protected
    // RSAKey.prototype.doPublic = RSADoPublic;
    // Perform raw public operation on "x": return x^e (mod n)


    RSAKey.prototype.doPublic = function (x) {
      return x.modPowInt(this.e, this.n);
    }; // RSAKey.prototype.doPrivate = RSADoPrivate;
    // Perform raw private operation on "x": return x^d (mod n)


    RSAKey.prototype.doPrivate = function (x) {
      if (this.p == null || this.q == null) {
        return x.modPow(this.d, this.n);
      } // TODO: re-calculate any missing CRT params


      var xp = x.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x.mod(this.q).modPow(this.dmq1, this.q);

      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }

      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    }; //#endregion PROTECTED
    //#region PUBLIC
    // RSAKey.prototype.setPublic = RSASetPublic;
    // Set the public key fields N and e from hex strings


    RSAKey.prototype.setPublic = function (N, E) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
      } else {
        console.error("Invalid RSA public key");
      }
    }; // RSAKey.prototype.encrypt = RSAEncrypt;
    // Return the PKCS#1 RSA encryption of "text" as an even-length hex string


    RSAKey.prototype.encrypt = function (text) {
      var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);

      if (m == null) {
        return null;
      }

      var c = this.doPublic(m);

      if (c == null) {
        return null;
      }

      var h = c.toString(16);

      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    }; // RSAKey.prototype.setPrivate = RSASetPrivate;
    // Set the private key fields N, e, and d from hex strings


    RSAKey.prototype.setPrivate = function (N, E, D) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    }; // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    // Set the private key fields N, e, d and CRT params from hex strings


    RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
        this.p = parseBigInt(P, 16);
        this.q = parseBigInt(Q, 16);
        this.dmp1 = parseBigInt(DP, 16);
        this.dmq1 = parseBigInt(DQ, 16);
        this.coeff = parseBigInt(C, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    }; // RSAKey.prototype.generate = RSAGenerate;
    // Generate a new random private key B bits long, using public expt E


    RSAKey.prototype.generate = function (B, E) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);

      for (;;) {
        for (;;) {
          this.p = new BigInteger(B - qs, 1, rng);

          if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }

        for (;;) {
          this.q = new BigInteger(qs, 1, rng);

          if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
            break;
          }
        }

        if (this.p.compareTo(this.q) <= 0) {
          var t = this.p;
          this.p = this.q;
          this.q = t;
        }

        var p1 = this.p.subtract(BigInteger.ONE);
        var q1 = this.q.subtract(BigInteger.ONE);
        var phi = p1.multiply(q1);

        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }; // RSAKey.prototype.decrypt = RSADecrypt;
    // Return the PKCS#1 RSA decryption of "ctext".
    // "ctext" is an even-length hex string and the output is a plain string.


    RSAKey.prototype.decrypt = function (ctext) {
      var c = parseBigInt(ctext, 16);
      var m = this.doPrivate(c);

      if (m == null) {
        return null;
      }

      return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    }; // Generate a new random private key B bits long, using public expt E


    RSAKey.prototype.generateAsync = function (B, E, callback) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      var rsa = this; // These functions have non-descript names because they were originally for(;;) loops.
      // I don't know about cryptography to give them better names than loop1-4.

      var loop1 = function loop1() {
        var loop4 = function loop4() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }

          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);

          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function () {
              callback();
            }, 0); // escape
          } else {
            setTimeout(loop1, 0);
          }
        };

        var loop3 = function loop3() {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function () {
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else {
                setTimeout(loop3, 0);
              }
            });
          });
        };

        var loop2 = function loop2() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else {
                setTimeout(loop2, 0);
              }
            });
          });
        };

        setTimeout(loop2, 0);
      };

      setTimeout(loop1, 0);
    };

    RSAKey.prototype.sign = function (text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m = pkcs1pad1(digest, this.n.bitLength() / 4);

      if (m == null) {
        return null;
      }

      var c = this.doPrivate(m);

      if (c == null) {
        return null;
      }

      var h = c.toString(16);

      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    };

    RSAKey.prototype.verify = function (text, signature, digestMethod) {
      var c = parseBigInt(signature, 16);
      var m = this.doPublic(c);

      if (m == null) {
        return null;
      }

      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };

    return RSAKey;
  }(); // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext


  function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    var i = 0;

    while (i < b.length && b[i] == 0) {
      ++i;
    }

    if (b.length - i != n - 1 || b[i] != 2) {
      return null;
    }

    ++i;

    while (b[i] != 0) {
      if (++i >= b.length) {
        return null;
      }
    }

    var ret = "";

    while (++i < b.length) {
      var c = b[i] & 255;

      if (c < 128) {
        // utf-8 decode
        ret += String.fromCharCode(c);
      } else if (c > 191 && c < 224) {
        ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
        ++i;
      } else {
        ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
        i += 2;
      }
    }

    return ret;
  } // https://tools.ietf.org/html/rfc3447#page-43


  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
  };

  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }

  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;

        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }

    return str;
  } // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
  // function RSAEncryptB64(text) {
  //  var h = this.encrypt(text);
  //  if(h) return hex2b64(h); else return null;
  // }
  // public
  // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */


  var YAHOO = {};
  YAHOO.lang = {
    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @static
     * @param {Function} subc   the object to modify
     * @param {Function} superc the object to inherit
     * @param {Object} overrides  additional properties/methods to add to the
     *                              subclass prototype.  These will override the
     *                              matching items obtained from the superclass
     *                              if present.
     */
    extend: function extend(subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");
      }

      var F = function F() {};

      F.prototype = superc.prototype;
      subc.prototype = new F();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;

      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }

      if (overrides) {
        var i;

        for (i in overrides) {
          subc.prototype[i] = overrides[i];
        }
        /*
         * IE will not enumerate native functions in a derived object even if the
         * function was overridden.  This is a workaround for specific functions
         * we care about on the Object prototype.
         * @property _IEEnumFix
         * @param {Function} r  the object to receive the augmentation
         * @param {Function} s  the object that supplies the properties to augment
         * @static
         * @private
         */


        var _IEEnumFix = function _IEEnumFix() {},
            ADD = ["toString", "valueOf"];

        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function _IEEnumFix(r, s) {
              for (i = 0; i < ADD.length; i = i + 1) {
                var fname = ADD[i],
                    f = s[fname];

                if (typeof f === 'function' && f != Object.prototype[fname]) {
                  r[fname] = f;
                }
              }
            };
          }
        } catch (ex) {}

        _IEEnumFix(subc.prototype, overrides);
      }
    }
  };
  /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
   */

  /**
   * @fileOverview
   * @name asn1-1.0.js
   * @author Kenji Urushima kenji.urushima@gmail.com
   * @version asn1 1.0.13 (2017-Jun-02)
   * @since jsrsasign 2.1
   * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
   */

  /**
   * kjur's class library name space
   * <p>
   * This name space provides following name spaces:
   * <ul>
   * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
   * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
   * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
   * class and utilities</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
   * @name KJUR
   * @namespace kjur's class library name space
   */

  var KJUR = {};
  /**
   * kjur's ASN.1 class library name space
   * <p>
   * This is ITU-T X.690 ASN.1 DER encoder class library and
   * class structure and methods is very similar to
   * org.bouncycastle.asn1 package of
   * well known BouncyCaslte Cryptography Library.
   * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
   * Here are ASN.1 DER primitive classes.
   * <ul>
   * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
   * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
   * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
   * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
   * <li>0x05 {@link KJUR.asn1.DERNull}</li>
   * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
   * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
   * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
   * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
   * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
   * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
   * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
   * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
   * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
   * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
   * <li>0x31 {@link KJUR.asn1.DERSet}</li>
   * </ul>
   * <h4>OTHER ASN.1 CLASSES</h4>
   * <ul>
   * <li>{@link KJUR.asn1.ASN1Object}</li>
   * <li>{@link KJUR.asn1.DERAbstractString}</li>
   * <li>{@link KJUR.asn1.DERAbstractTime}</li>
   * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
   * <li>{@link KJUR.asn1.DERTaggedObject}</li>
   * </ul>
   * <h4>SUB NAME SPACES</h4>
   * <ul>
   * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
   * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
   * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
   * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
   * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace.
   * This caused by a bug of jsdoc2.
   * @name KJUR.asn1
   * @namespace
   */

  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
  /**
   * ASN1 utilities class
   * @name KJUR.asn1.ASN1Util
   * @class ASN1 utilities class
   * @since asn1 1.0.2
   */

  KJUR.asn1.ASN1Util = new function () {
    this.integerToByteHex = function (i) {
      var h = i.toString(16);
      if (h.length % 2 == 1) h = '0' + h;
      return h;
    };

    this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
      var h = bigIntegerValue.toString(16);

      if (h.substr(0, 1) != '-') {
        if (h.length % 2 == 1) {
          h = '0' + h;
        } else {
          if (!h.match(/^[0-7]/)) {
            h = '00' + h;
          }
        }
      } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;

        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }

        var hMask = '';

        for (var i = 0; i < xorLen; i++) {
          hMask += 'f';
        }

        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, '');
      }

      return h;
    };
    /**
     * get PEM string from hexadecimal data and header string
     * @name getPEMStringFromHex
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {String} dataHex hexadecimal string of PEM body
     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
     * @return {String} PEM formatted string of input data
     * @description
     * This method converts a hexadecimal string to a PEM string with
     * a specified header. Its line break will be CRLF("\r\n").
     * @example
     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
     * // value of pem will be:
     * -----BEGIN PRIVATE KEY-----
     * YWFh
     * -----END PRIVATE KEY-----
     */


    this.getPEMStringFromHex = function (dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };
    /**
     * generate ASN1Object specifed by JSON parameters
     * @name newObject
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {Array} param JSON parameter to generate ASN1Object
     * @return {KJUR.asn1.ASN1Object} generated object
     * @since asn1 1.0.3
     * @description
     * generate any ASN1Object specified by JSON param
     * including ASN.1 primitive or structured.
     * Generally 'param' can be described as follows:
     * <blockquote>
     * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
     * </blockquote>
     * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
     * <ul>
     * <li>'bool' - DERBoolean</li>
     * <li>'int' - DERInteger</li>
     * <li>'bitstr' - DERBitString</li>
     * <li>'octstr' - DEROctetString</li>
     * <li>'null' - DERNull</li>
     * <li>'oid' - DERObjectIdentifier</li>
     * <li>'enum' - DEREnumerated</li>
     * <li>'utf8str' - DERUTF8String</li>
     * <li>'numstr' - DERNumericString</li>
     * <li>'prnstr' - DERPrintableString</li>
     * <li>'telstr' - DERTeletexString</li>
     * <li>'ia5str' - DERIA5String</li>
     * <li>'utctime' - DERUTCTime</li>
     * <li>'gentime' - DERGeneralizedTime</li>
     * <li>'seq' - DERSequence</li>
     * <li>'set' - DERSet</li>
     * <li>'tag' - DERTaggedObject</li>
     * </ul>
     * @example
     * newObject({'prnstr': 'aaa'});
     * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
     * // ASN.1 Tagged Object
     * newObject({'tag': {'tag': 'a1',
     *                    'explicit': true,
     *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
     * // more simple representation of ASN.1 Tagged Object
     * newObject({'tag': ['a1',
     *                    true,
     *                    {'seq': [
     *                      {'int': 3},
     *                      {'prnstr': 'aaa'}]}
     *                   ]});
     */


    this.newObject = function (param) {
      var _KJUR = KJUR,
          _KJUR_asn1 = _KJUR.asn1,
          _DERBoolean = _KJUR_asn1.DERBoolean,
          _DERInteger = _KJUR_asn1.DERInteger,
          _DERBitString = _KJUR_asn1.DERBitString,
          _DEROctetString = _KJUR_asn1.DEROctetString,
          _DERNull = _KJUR_asn1.DERNull,
          _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
          _DEREnumerated = _KJUR_asn1.DEREnumerated,
          _DERUTF8String = _KJUR_asn1.DERUTF8String,
          _DERNumericString = _KJUR_asn1.DERNumericString,
          _DERPrintableString = _KJUR_asn1.DERPrintableString,
          _DERTeletexString = _KJUR_asn1.DERTeletexString,
          _DERIA5String = _KJUR_asn1.DERIA5String,
          _DERUTCTime = _KJUR_asn1.DERUTCTime,
          _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
          _DERSequence = _KJUR_asn1.DERSequence,
          _DERSet = _KJUR_asn1.DERSet,
          _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
          _newObject = _KJUR_asn1.ASN1Util.newObject;
      var keys = Object.keys(param);
      if (keys.length != 1) throw "key of param shall be only one.";
      var key = keys[0];
      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1) throw "undefined key: " + key;
      if (key == "bool") return new _DERBoolean(param[key]);
      if (key == "int") return new _DERInteger(param[key]);
      if (key == "bitstr") return new _DERBitString(param[key]);
      if (key == "octstr") return new _DEROctetString(param[key]);
      if (key == "null") return new _DERNull(param[key]);
      if (key == "oid") return new _DERObjectIdentifier(param[key]);
      if (key == "enum") return new _DEREnumerated(param[key]);
      if (key == "utf8str") return new _DERUTF8String(param[key]);
      if (key == "numstr") return new _DERNumericString(param[key]);
      if (key == "prnstr") return new _DERPrintableString(param[key]);
      if (key == "telstr") return new _DERTeletexString(param[key]);
      if (key == "ia5str") return new _DERIA5String(param[key]);
      if (key == "utctime") return new _DERUTCTime(param[key]);
      if (key == "gentime") return new _DERGeneralizedTime(param[key]);

      if (key == "seq") {
        var paramList = param[key];
        var a = [];

        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);

          a.push(asn1Obj);
        }

        return new _DERSequence({
          'array': a
        });
      }

      if (key == "set") {
        var paramList = param[key];
        var a = [];

        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);

          a.push(asn1Obj);
        }

        return new _DERSet({
          'array': a
        });
      }

      if (key == "tag") {
        var tagParam = param[key];

        if (Object.prototype.toString.call(tagParam) === '[object Array]' && tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);

          return new _DERTaggedObject({
            tag: tagParam[0],
            explicit: tagParam[1],
            obj: obj
          });
        } else {
          var newParam = {};
          if (tagParam.explicit !== undefined) newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== undefined) newParam.tag = tagParam.tag;
          if (tagParam.obj === undefined) throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };
    /**
     * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
     * @name jsonToASN1HEX
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {Array} param JSON parameter to generate ASN1Object
     * @return hexadecimal string of ASN1Object
     * @since asn1 1.0.4
     * @description
     * As for ASN.1 object representation of JSON object,
     * please see {@link newObject}.
     * @example
     * jsonToASN1HEX({'prnstr': 'aaa'});
     */


    this.jsonToASN1HEX = function (param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();
  /**
   * get dot noted oid number string from hexadecimal value of OID
   * @name oidHexToInt
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} hex hexadecimal value of object identifier
   * @return {String} dot noted string of object identifier
   * @since jsrsasign 4.8.3 asn1 1.0.7
   * @description
   * This static method converts from hexadecimal string representation of
   * ASN.1 value of object identifier to oid number string.
   * @example
   * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
   */

  KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
    var s = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s = i0 + "." + i1;
    var binbuf = "";

    for (var i = 2; i < hex.length; i += 2) {
      var value = parseInt(hex.substr(i, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);

      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s = s + "." + bi.toString(10);
        binbuf = "";
      }
    }

    return s;
  };
  /**
   * get hexadecimal value of object identifier from dot noted oid value
   * @name oidIntToHex
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} oidString dot noted string of object identifier
   * @return {String} hexadecimal value of object identifier
   * @since jsrsasign 4.8.3 asn1 1.0.7
   * @description
   * This static method converts from object identifier value string.
   * to hexadecimal string representation of it.
   * @example
   * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
   */


  KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };

    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';

      for (var i = 0; i < padLen; i++) {
        bPad += '0';
      }

      b = bPad + b;

      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }

      return h;
    };

    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }

    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);

    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }

    return h;
  }; // ********************************************************************
  //  Abstract ASN.1 Classes
  // ********************************************************************
  // ********************************************************************

  /**
   * base class for ASN.1 DER encoder object
   * @name KJUR.asn1.ASN1Object
   * @class base class for ASN.1 DER encoder object
   * @property {Boolean} isModified flag whether internal data was changed
   * @property {String} hTLV hexadecimal string of ASN.1 TLV
   * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
   * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
   * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
   * @description
   */


  KJUR.asn1.ASN1Object = function () {
    var hV = '';
    /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     * @name getLengthHexFromValue
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV length(L)
     */

    this.getLengthHexFromValue = function () {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }

      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }

      var n = this.hV.length / 2;
      var hN = n.toString(16);

      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }

      if (n < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;

        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }

        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };
    /**
     * get hexadecimal string of ASN.1 TLV bytes
     * @name getEncodedHex
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV
     */


    this.getEncodedHex = function () {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false; //alert("first time: " + this.hTLV);
      }

      return this.hTLV;
    };
    /**
     * get hexadecimal string of ASN.1 TLV value(V) bytes
     * @name getValueHex
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
     */


    this.getValueHex = function () {
      this.getEncodedHex();
      return this.hV;
    };

    this.getFreshValueHex = function () {
      return '';
    };
  }; // == BEGIN DERAbstractString ================================================

  /**
   * base class for ASN.1 DER string classes
   * @name KJUR.asn1.DERAbstractString
   * @class base class for ASN.1 DER string classes
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @property {String} s internal string of value
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */


  KJUR.asn1.DERAbstractString = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @return {String} string value of this string object
     */

    this.getString = function () {
      return this.s;
    };
    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @param {String} newS value by a string to set
     */


    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };
    /**
     * set value by a hexadecimal string
     * @name setStringHex
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @param {String} newHexString value by a hexadecimal string to set
     */


    this.setStringHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object); // == END   DERAbstractString ================================================
  // == BEGIN DERAbstractTime ==================================================

  /**
   * base class for ASN.1 DER Generalized/UTCTime class
   * @name KJUR.asn1.DERAbstractTime
   * @class base class for ASN.1 DER Generalized/UTCTime class
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERAbstractTime = function (params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this); // --- PRIVATE METHODS --------------------

    this.localDateToUTC = function (d) {
      utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var utcDate = new Date(utc);
      return utcDate;
    };
    /*
     * format date string by Data object
     * @name formatDate
     * @memberOf KJUR.asn1.AbstractTime;
     * @param {Date} dateObject
     * @param {string} type 'utc' or 'gen'
     * @param {boolean} withMillis flag for with millisections or not
     * @description
     * 'withMillis' flag is supported from asn1 1.0.6.
     */


    this.formatDate = function (dateObject, type, withMillis) {
      var pad = this.zeroPadding;
      var d = this.localDateToUTC(dateObject);
      var year = String(d.getFullYear());
      if (type == 'utc') year = year.substr(2, 2);
      var month = pad(String(d.getMonth() + 1), 2);
      var day = pad(String(d.getDate()), 2);
      var hour = pad(String(d.getHours()), 2);
      var min = pad(String(d.getMinutes()), 2);
      var sec = pad(String(d.getSeconds()), 2);
      var s = year + month + day + hour + min + sec;

      if (withMillis === true) {
        var millis = d.getMilliseconds();

        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s = s + "." + sMillis;
        }
      }

      return s + "Z";
    };

    this.zeroPadding = function (s, len) {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join('0') + s;
    }; // --- PUBLIC METHODS --------------------

    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @return {String} string value of this time object
     */


    this.getString = function () {
      return this.s;
    };
    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @param {String} newS value by a string to set such like "130430235959Z"
     */


    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(newS);
    };
    /**
     * set value by a Date object
     * @name setByDateValue
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @param {Integer} year year of date (ex. 2013)
     * @param {Integer} month month of date between 1 and 12 (ex. 12)
     * @param {Integer} day day of month
     * @param {Integer} hour hours of date
     * @param {Integer} min minutes of date
     * @param {Integer} sec seconds of date
     */


    this.setByDateValue = function (year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object); // == END   DERAbstractTime ==================================================
  // == BEGIN DERAbstractStructured ============================================

  /**
   * base class for ASN.1 DER structured class
   * @name KJUR.asn1.DERAbstractStructured
   * @class base class for ASN.1 DER structured class
   * @property {Array} asn1Array internal array of ASN1Object
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERAbstractStructured = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    /**
     * set value by array of ASN1Object
     * @name setByASN1ObjectArray
     * @memberOf KJUR.asn1.DERAbstractStructured#
     * @function
     * @param {array} asn1ObjectArray array of ASN1Object to set
     */

    this.setByASN1ObjectArray = function (asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };
    /**
     * append an ASN1Object to internal array
     * @name appendASN1Object
     * @memberOf KJUR.asn1.DERAbstractStructured#
     * @function
     * @param {ASN1Object} asn1Object to add
     */


    this.appendASN1Object = function (asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();

    if (typeof params != "undefined") {
      if (typeof params['array'] != "undefined") {
        this.asn1Array = params['array'];
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object); // ********************************************************************
  //  ASN.1 Object Classes
  // ********************************************************************
  // ********************************************************************

  /**
   * class for ASN.1 DER Boolean
   * @name KJUR.asn1.DERBoolean
   * @class class for ASN.1 DER Boolean
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERBoolean = function () {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };

  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER Integer
   * @name KJUR.asn1.DERInteger
   * @class class for ASN.1 DER Integer
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERInteger = function (params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DERInteger#
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */

    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {Integer} integer value to set
     */


    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DERInteger#
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     * @example
     * new KJUR.asn1.DERInteger(123);
     * new KJUR.asn1.DERInteger({'int': 123});
     * new KJUR.asn1.DERInteger({'hex': '1fad'});
     */


    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['bigint'] != "undefined") {
        this.setByBigInteger(params['bigint']);
      } else if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER encoded BitString primitive
   * @name KJUR.asn1.DERBitString
   * @class class for ASN.1 DER encoded BitString primitive
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>bin - specify binary string (ex. '10111')</li>
   * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
   * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
   * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
   * argument for "BitString encapsulates" structure.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: 'obj' parameter have been supported since
   * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
   * @example
   * // default constructor
   * o = new KJUR.asn1.DERBitString();
   * // initialize with binary string
   * o = new KJUR.asn1.DERBitString({bin: "1011"});
   * // initialize with boolean array
   * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
   * // initialize with hexadecimal string (04 is unused bits)
   * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
   * // initialize with ASN1Util.newObject argument for encapsulated
   * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // BIT STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */

  KJUR.asn1.DERBitString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o.getEncodedHex();
    }

    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    /**
     * set ASN.1 value(V) by a hexadecimal string including unused bits
     * @name setHexValueIncludingUnusedBits
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {String} newHexStringIncludingUnusedBits
     */

    this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };
    /**
     * set ASN.1 value(V) by unused bit and hexadecimal string of value
     * @name setUnusedBitsAndHexValue
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {Integer} unusedBits
     * @param {String} hValue
     */


    this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }

      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };
    /**
     * set ASN.1 DER BitString by binary string<br/>
     * @name setByBinaryString
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {String} binaryString binary value string (i.e. '10111')
     * @description
     * Its unused bits will be calculated automatically by length of
     * 'binaryValue'. <br/>
     * NOTE: Trailing zeros '0' will be ignored.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.setByBooleanArray("01011");
     */


    this.setByBinaryString = function (binaryString) {
      binaryString = binaryString.replace(/0+$/, '');
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8) unusedBits = 0;

      for (var i = 0; i <= unusedBits; i++) {
        binaryString += '0';
      }

      var h = '';

      for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = '0' + x;
        h += x;
      }

      this.hTLV = null;
      this.isModified = true;
      this.hV = '0' + unusedBits + h;
    };
    /**
     * set ASN.1 TLV value(V) by an array of boolean<br/>
     * @name setByBooleanArray
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {array} booleanArray array of boolean (ex. [true, false, true])
     * @description
     * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.setByBooleanArray([false, true, false, true, true]);
     */


    this.setByBooleanArray = function (booleanArray) {
      var s = '';

      for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
          s += '1';
        } else {
          s += '0';
        }
      }

      this.setByBinaryString(s);
    };
    /**
     * generate an array of falses with specified length<br/>
     * @name newFalseArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} nLength length of array to generate
     * @return {array} array of boolean falses
     * @description
     * This static method may be useful to initialize boolean array.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.newFalseArray(3) &rarr; [false, false, false]
     */


    this.newFalseArray = function (nLength) {
      var a = new Array(nLength);

      for (var i = 0; i < nLength; i++) {
        a[i] = false;
      }

      return a;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setHexValueIncludingUnusedBits(params['hex']);
      } else if (typeof params['bin'] != "undefined") {
        this.setByBinaryString(params['bin']);
      } else if (typeof params['array'] != "undefined") {
        this.setByBooleanArray(params['array']);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER OctetString<br/>
   * @name KJUR.asn1.DEROctetString
   * @class class for ASN.1 DER OctetString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * This class provides ASN.1 OctetString simple type.<br/>
   * Supported "params" attributes are:
   * <ul>
   * <li>str - to set a string as a value</li>
   * <li>hex - to set a hexadecimal string as a value</li>
   * <li>obj - to set a encapsulated ASN.1 value by JSON object
   * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
   * </ul>
   * NOTE: A parameter 'obj' have been supported
   * for "OCTET STRING, encapsulates" structure.
   * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
   * @see KJUR.asn1.DERAbstractString - superclass
   * @example
   * // default constructor
   * o = new KJUR.asn1.DEROctetString();
   * // initialize with string
   * o = new KJUR.asn1.DEROctetString({str: "aaa"});
   * // initialize with hexadecimal string
   * o = new KJUR.asn1.DEROctetString({hex: "616161"});
   * // initialize with ASN1Util.newObject argument
   * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // OCTET STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */

  KJUR.asn1.DEROctetString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o.getEncodedHex();
    }

    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };

  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER Null
   * @name KJUR.asn1.DERNull
   * @class class for ASN.1 DER Null
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERNull = function () {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };

  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER ObjectIdentifier
   * @name KJUR.asn1.DERObjectIdentifier
   * @class class for ASN.1 DER ObjectIdentifier
   * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERObjectIdentifier = function (params) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };

    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';

      for (var i = 0; i < padLen; i++) {
        bPad += '0';
      }

      b = bPad + b;

      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }

      return h;
    };

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    /**
     * set value by a hexadecimal string
     * @name setValueHex
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} newHexString hexadecimal value of OID bytes
     */

    this.setValueHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };
    /**
     * set value by a OID string<br/>
     * @name setValueOidString
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} oidString OID string (ex. 2.5.4.13)
     * @example
     * o = new KJUR.asn1.DERObjectIdentifier();
     * o.setValueOidString("2.5.4.13");
     */


    this.setValueOidString = function (oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }

      var h = '';
      var a = oidString.split('.');
      var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
      h += itox(i0);
      a.splice(0, 2);

      for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
      }

      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h;
    };
    /**
     * set value by a OID name
     * @name setValueName
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} oidName OID name (ex. 'serverAuth')
     * @since 1.0.1
     * @description
     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
     * Otherwise raise error.
     * @example
     * o = new KJUR.asn1.DERObjectIdentifier();
     * o.setValueName("serverAuth");
     */


    this.setValueName = function (oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);

      if (oid !== '') {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (params !== undefined) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== undefined) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== undefined) {
        this.setValueHex(params.hex);
      } else if (params.name !== undefined) {
        this.setValueName(params.name);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER Enumerated
   * @name KJUR.asn1.DEREnumerated
   * @class class for ASN.1 DER Enumerated
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * @example
   * new KJUR.asn1.DEREnumerated(123);
   * new KJUR.asn1.DEREnumerated({int: 123});
   * new KJUR.asn1.DEREnumerated({hex: '1fad'});
   */

  KJUR.asn1.DEREnumerated = function (params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";
    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */

    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {Integer} integer value to set
     */


    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     */


    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER UTF8String
   * @name KJUR.asn1.DERUTF8String
   * @class class for ASN.1 DER UTF8String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERUTF8String = function (params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };

  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER NumericString
   * @name KJUR.asn1.DERNumericString
   * @class class for ASN.1 DER NumericString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERNumericString = function (params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };

  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER PrintableString
   * @name KJUR.asn1.DERPrintableString
   * @class class for ASN.1 DER PrintableString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERPrintableString = function (params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };

  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER TeletexString
   * @name KJUR.asn1.DERTeletexString
   * @class class for ASN.1 DER TeletexString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERTeletexString = function (params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };

  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER IA5String
   * @name KJUR.asn1.DERIA5String
   * @class class for ASN.1 DER IA5String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERIA5String = function (params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };

  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER UTCTime
   * @name KJUR.asn1.DERUTCTime
   * @class class for ASN.1 DER UTCTime
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * <h4>EXAMPLES</h4>
   * @example
   * d1 = new KJUR.asn1.DERUTCTime();
   * d1.setString('130430125959Z');
   *
   * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
   * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
   * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
   */

  KJUR.asn1.DERUTCTime = function (params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";
    /**
     * set value by a Date object<br/>
     * @name setByDate
     * @memberOf KJUR.asn1.DERUTCTime#
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * o = new KJUR.asn1.DERUTCTime();
     * o.setByDate(new Date("2016/12/31"));
     */

    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (typeof this.date == "undefined" && typeof this.s == "undefined") {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'utc');
        this.hV = stohex(this.s);
      }

      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

  /**
   * class for ASN.1 DER GeneralizedTime
   * @name KJUR.asn1.DERGeneralizedTime
   * @class class for ASN.1 DER GeneralizedTime
   * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
   * @property {Boolean} withMillis flag to show milliseconds or not
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
   * </ul>
   * NOTE1: 'params' can be omitted.
   * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
   */

  KJUR.asn1.DERGeneralizedTime = function (params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";
    this.withMillis = false;
    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERGeneralizedTime#
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * When you specify UTC time, use 'Date.UTC' method like this:<br/>
     * o1 = new DERUTCTime();
     * o1.setByDate(date);
     *
     * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
     */

    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'gen', this.withMillis);
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (this.date === undefined && this.s === undefined) {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'gen', this.withMillis);
        this.hV = stohex(this.s);
      }

      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }

      if (params.millis === true) {
        this.withMillis = true;
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

  /**
   * class for ASN.1 DER Sequence
   * @name KJUR.asn1.DERSequence
   * @class class for ASN.1 DER Sequence
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERSequence = function (params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";

    this.getFreshValueHex = function () {
      var h = '';

      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        h += asn1Obj.getEncodedHex();
      }

      this.hV = h;
      return this.hV;
    };
  };

  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured); // ********************************************************************

  /**
   * class for ASN.1 DER Set
   * @name KJUR.asn1.DERSet
   * @class class for ASN.1 DER Set
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: sortflag is supported since 1.0.5.
   */

  KJUR.asn1.DERSet = function (params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.sortFlag = true; // item shall be sorted only in ASN.1 DER

    this.getFreshValueHex = function () {
      var a = new Array();

      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
      }

      if (this.sortFlag == true) a.sort();
      this.hV = a.join('');
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" && params.sortflag == false) this.sortFlag = false;
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured); // ********************************************************************

  /**
   * class for ASN.1 DER TaggedObject
   * @name KJUR.asn1.DERTaggedObject
   * @class class for ASN.1 DER TaggedObject
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
   * For example, if you find '[1]' tag in a ASN.1 dump,
   * 'tagNoHex' will be 'a1'.
   * <br/>
   * As for optional argument 'params' for constructor, you can specify *ANY* of
   * following properties:
   * <ul>
   * <li>explicit - specify true if this is explicit tag otherwise false
   *     (default is 'true').</li>
   * <li>tag - specify tag (default is 'a0' which means [0])</li>
   * <li>obj - specify ASN1Object which is tagged</li>
   * </ul>
   * @example
   * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
   * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
   * hex = d2.getEncodedHex();
   */

  KJUR.asn1.DERTaggedObject = function (params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;
    /**
     * set value by an ASN1Object
     * @name setString
     * @memberOf KJUR.asn1.DERTaggedObject#
     * @function
     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
     * @param {ASN1Object} asn1Object ASN.1 to encapsulate
     */

    this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;

      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['tag'] != "undefined") {
        this.hT = params['tag'];
      }

      if (typeof params['explicit'] != "undefined") {
        this.isExplicit = params['explicit'];
      }

      if (typeof params['obj'] != "undefined") {
        this.asn1Object = params['obj'];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
  /**
   * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
   * This object is just a decorator for parsing the key parameter
   * @param {string|Object} key - The key in string format, or an object containing
   * the parameters needed to build a RSAKey object.
   * @constructor
   */

  var JSEncryptRSAKey =
  /** @class */
  function (_super) {
    __extends(JSEncryptRSAKey, _super);

    function JSEncryptRSAKey(key) {
      var _this = _super.call(this) || this; // Call the super constructor.
      //  RSAKey.call(this);
      // If a key key was provided.


      if (key) {
        // If this is a string...
        if (typeof key === "string") {
          _this.parseKey(key);
        } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
          // Set the values for the key.
          _this.parsePropertiesFrom(key);
        }
      }

      return _this;
    }
    /**
     * Method to parse a pem encoded string containing both a public or private key.
     * The method will translate the pem encoded string in a der encoded string and
     * will parse private key and public key parameters. This method accepts public key
     * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
     *
     * @todo Check how many rsa formats use the same format of pkcs #1.
     *
     * The format is defined as:
     * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
     * Where AlgorithmIdentifier is:
     * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
     * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
     * it's possible to examine the structure of the keys obtained from openssl using
     * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
     * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
     * @private
     */


    JSEncryptRSAKey.prototype.parseKey = function (pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der); // Fixes a bug with OpenSSL 1.0+ private keys

        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }

        if (asn1.sub.length === 9) {
          // Parse the private key.
          modulus = asn1.sub[1].getHexStringValue(); // bigint

          this.n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue(); // int

          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue(); // bigint

          this.d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue(); // bigint

          this.p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue(); // bigint

          this.q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue(); // bigint

          this.dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue(); // bigint

          this.dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue(); // bigint

          this.coeff = parseBigInt(coefficient, 16);
        } else if (asn1.sub.length === 2) {
          // Parse the public key.
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          this.n = parseBigInt(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        } else {
          return false;
        }

        return true;
      } catch (ex) {
        return false;
      }
    };
    /**
     * Translate rsa parameters in a hex encoded string representing the rsa key.
     *
     * The translation follow the ASN.1 notation :
     * RSAPrivateKey ::= SEQUENCE {
     *   version           Version,
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER,  -- e
     *   privateExponent   INTEGER,  -- d
     *   prime1            INTEGER,  -- p
     *   prime2            INTEGER,  -- q
     *   exponent1         INTEGER,  -- d mod (p1)
     *   exponent2         INTEGER,  -- d mod (q-1)
     *   coefficient       INTEGER,  -- (inverse of q) mod p
     * }
     * @returns {string}  DER Encoded String representing the rsa private key
     * @private
     */


    JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
      var options = {
        array: [new KJUR.asn1.DERInteger({
          "int": 0
        }), new KJUR.asn1.DERInteger({
          bigint: this.n
        }), new KJUR.asn1.DERInteger({
          "int": this.e
        }), new KJUR.asn1.DERInteger({
          bigint: this.d
        }), new KJUR.asn1.DERInteger({
          bigint: this.p
        }), new KJUR.asn1.DERInteger({
          bigint: this.q
        }), new KJUR.asn1.DERInteger({
          bigint: this.dmp1
        }), new KJUR.asn1.DERInteger({
          bigint: this.dmq1
        }), new KJUR.asn1.DERInteger({
          bigint: this.coeff
        })]
      };
      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    /**
     * Translate rsa parameters in a hex encoded string representing the rsa public key.
     * The representation follow the ASN.1 notation :
     * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
     * Where AlgorithmIdentifier is:
     * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
     * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
     * @returns {string} DER Encoded String representing the rsa public key
     * @private
     */


    JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [new KJUR.asn1.DERObjectIdentifier({
          oid: "1.2.840.113549.1.1.1"
        }), new KJUR.asn1.DERNull()]
      });
      var second_sequence = new KJUR.asn1.DERSequence({
        array: [new KJUR.asn1.DERInteger({
          bigint: this.n
        }), new KJUR.asn1.DERInteger({
          "int": this.e
        })]
      });
      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex()
      });
      var seq = new KJUR.asn1.DERSequence({
        array: [first_sequence, bit_string]
      });
      return seq.getEncodedHex();
    };
    /**
     * wrap the string in block of width chars. The default value for rsa keys is 64
     * characters.
     * @param {string} str the pem encoded string without header and footer
     * @param {Number} [width=64] - the length the string has to be wrapped at
     * @returns {string}
     * @private
     */


    JSEncryptRSAKey.wordwrap = function (str, width) {
      width = width || 64;

      if (!str) {
        return str;
      }

      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    /**
     * Check if the object contains the necessary parameters to populate the rsa modulus
     * and public exponent parameters.
     * @param {Object} [obj={}] - An object that may contain the two public key
     * parameters
     * @returns {boolean} true if the object contains both the modulus and the public exponent
     * properties (n and e)
     * @todo check for types of n and e. N should be a parseable bigInt object, E should
     * be a parseable integer number
     * @private
     */


    JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
    };
    /**
     * Check if the object contains ALL the parameters of an RSA key.
     * @param {Object} [obj={}] - An object that may contain nine rsa key
     * parameters
     * @returns {boolean} true if the object contains all the parameters needed
     * @todo check for types of the parameters all the parameters but the public exponent
     * should be parseable bigint objects, the public exponent should be a parseable integer number
     * @private
     */


    JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
    };
    /**
     * Parse the properties of obj in the current rsa object. Obj should AT LEAST
     * include the modulus and public exponent (n, e) parameters.
     * @param {Object} obj - the object containing rsa parameters
     * @private
     */


    JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
      this.n = obj.n;
      this.e = obj.e;

      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };

    return JSEncryptRSAKey;
  }(RSAKey);
  /**
   *
   * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
   * possible parameters are:
   * - default_key_size        {number}  default: 1024 the key size in bit
   * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
   * - log                     {boolean} default: false whether log warn/error or not
   * @constructor
   */


  var JSEncrypt =
  /** @class */
  function () {
    function JSEncrypt(options) {
      options = options || {};
      this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
      this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type

      this.log = options.log || false; // The private and public key.

      this.key = null;
    }
    /**
     * Method to set the rsa key parameter (one method is enough to set both the public
     * and the private key, since the private key contains the public key paramenters)
     * Log a warning if logs are enabled
     * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
     * @public
     */


    JSEncrypt.prototype.setKey = function (key) {
      if (this.log && this.key) {
        console.warn("A key was already set, overriding existing.");
      }

      this.key = new JSEncryptRSAKey(key);
    };
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */


    JSEncrypt.prototype.setPrivateKey = function (privkey) {
      // Create the key.
      this.setKey(privkey);
    };
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */


    JSEncrypt.prototype.setPublicKey = function (pubkey) {
      // Sets the public key.
      this.setKey(pubkey);
    };
    /**
     * Proxy method for RSAKey object's decrypt, decrypt the string using the private
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str base64 encoded crypted string to decrypt
     * @return {string} the decrypted string
     * @public
     */


    JSEncrypt.prototype.decrypt = function (str) {
      // Return the decrypted string.
      try {
        return this.getKey().decrypt(b64tohex(str));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's encrypt, encrypt the string using the public
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str the string to encrypt
     * @return {string} the encrypted string encoded in base64
     * @public
     */


    JSEncrypt.prototype.encrypt = function (str) {
      // Return the encrypted string.
      try {
        return hex2b64(this.getKey().encrypt(str));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's sign.
     * @param {string} str the string to sign
     * @param {function} digestMethod hash method
     * @param {string} digestName the name of the hash algorithm
     * @return {string} the signature encoded in base64
     * @public
     */


    JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
      // return the RSA signature of 'str' in 'hex' format.
      try {
        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's verify.
     * @param {string} str the string to verify
     * @param {string} signature the signature encoded in base64 to compare the string to
     * @param {function} digestMethod hash method
     * @return {boolean} whether the data and signature match
     * @public
     */


    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
      // Return the decrypted 'digest' of the signature.
      try {
        return this.getKey().verify(str, b64tohex(signature), digestMethod);
      } catch (ex) {
        return false;
      }
    };
    /**
     * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
     * will be created and returned
     * @param {callback} [cb] the callback to be called if we want the key to be generated
     * in an async fashion
     * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
     * @public
     */


    JSEncrypt.prototype.getKey = function (cb) {
      // Only create new if it does not exist.
      if (!this.key) {
        // Get a new private key.
        this.key = new JSEncryptRSAKey();

        if (cb && {}.toString.call(cb) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
          return;
        } // Generate the key.


        this.key.generate(this.default_key_size, this.default_public_exponent);
      }

      return this.key;
    };

    JSEncrypt.version = "3.0.0-rc.1";
    return JSEncrypt;
  }();

  window.JSEncrypt = JSEncrypt;
  exports.JSEncrypt = JSEncrypt;
  exports["default"] = JSEncrypt;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxsb2NhbEVuY29kZVxcanNlbmNyeXB0LmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiSlNFbmNyeXB0IiwiQklfUk0iLCJpbnQyY2hhciIsIm4iLCJjaGFyQXQiLCJvcF9hbmQiLCJ4IiwieSIsIm9wX29yIiwib3BfeG9yIiwib3BfYW5kbm90IiwibGJpdCIsInIiLCJjYml0IiwiYjY0bWFwIiwiYjY0cGFkIiwiaGV4MmI2NCIsImgiLCJpIiwiYyIsInJldCIsImxlbmd0aCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiYjY0dG9oZXgiLCJzIiwiayIsInNsb3AiLCJ2IiwiaW5kZXhPZiIsImV4dGVuZFN0YXRpY3MiLCJkIiwiYiIsIk9iamVjdCIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiQXJyYXkiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJfX2V4dGVuZHMiLCJfXyIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiZGVjb2RlciIsIkhleCIsImRlY29kZSIsImEiLCJ1bmRlZmluZWQiLCJoZXgiLCJpZ25vcmUiLCJ0b0xvd2VyQ2FzZSIsIm91dCIsImJpdHMiLCJjaGFyX2NvdW50IiwiRXJyb3IiLCJkZWNvZGVyJDEiLCJCYXNlNjQiLCJiNjQiLCJyZSIsInVuYXJtb3IiLCJtIiwiZXhlYyIsIm1heCIsIkludDEwIiwidmFsdWUiLCJidWYiLCJtdWxBZGQiLCJsIiwidCIsInN1YiIsInBvcCIsInRvU3RyaW5nIiwiYmFzZSIsInZhbHVlT2YiLCJzaW1wbGlmeSIsImVsbGlwc2lzIiwicmVUaW1lUyIsInJlVGltZUwiLCJzdHJpbmdDdXQiLCJzdHIiLCJsZW4iLCJTdHJlYW0iLCJlbmMiLCJwb3MiLCJoZXhEaWdpdHMiLCJnZXQiLCJjaGFyQ29kZUF0IiwiaGV4Qnl0ZSIsImhleER1bXAiLCJzdGFydCIsImVuZCIsInJhdyIsImlzQVNDSUkiLCJwYXJzZVN0cmluZ0lTTyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInBhcnNlU3RyaW5nVVRGIiwicGFyc2VTdHJpbmdCTVAiLCJoaSIsImxvIiwicGFyc2VUaW1lIiwic2hvcnRZZWFyIiwicGFyc2VJbnRlZ2VyIiwibmVnIiwicGFkIiwicGFyc2VCaXRTdHJpbmciLCJtYXhMZW5ndGgiLCJ1bnVzZWRCaXQiLCJsZW5CaXQiLCJpbnRybyIsInNraXAiLCJqIiwicGFyc2VPY3RldFN0cmluZyIsInBhcnNlT0lEIiwiQVNOMSIsInN0cmVhbSIsImhlYWRlciIsInRhZyIsIkFTTjFUYWciLCJ0eXBlTmFtZSIsInRhZ0NsYXNzIiwidGFnTnVtYmVyIiwiY29udGVudCIsIkluZmluaXR5IiwicG9zQ29udGVudCIsIk1hdGgiLCJhYnMiLCJpc1VuaXZlcnNhbCIsInRvUHJldHR5U3RyaW5nIiwiaW5kZW50IiwidGFnQ29uc3RydWN0ZWQiLCJwb3NTdGFydCIsInBvc0VuZCIsInRvSGV4U3RyaW5nIiwiZGVjb2RlTGVuZ3RoIiwiZ2V0SGV4U3RyaW5nVmFsdWUiLCJoZXhTdHJpbmciLCJvZmZzZXQiLCJzdWJzdHIiLCJzdHJlYW1TdGFydCIsImdldFN1YiIsImlzRU9DIiwiZSIsImRiaXRzIiwiY2FuYXJ5Iiwial9sbSIsImxvd3ByaW1lcyIsImxwbGltIiwiQmlnSW50ZWdlciIsImZyb21OdW1iZXIiLCJmcm9tU3RyaW5nIiwibmVnYXRlIiwidG9SYWRpeCIsImttIiwiREIiLCJuYmkiLCJaRVJPIiwic3ViVG8iLCJjb21wYXJlVG8iLCJiaXRMZW5ndGgiLCJuYml0cyIsIkRNIiwibW9kIiwiZGl2UmVtVG8iLCJtb2RQb3dJbnQiLCJ6IiwiaXNFdmVuIiwiQ2xhc3NpYyIsIk1vbnRnb21lcnkiLCJleHAiLCJjbG9uZSIsImNvcHlUbyIsImludFZhbHVlIiwiRFYiLCJieXRlVmFsdWUiLCJzaG9ydFZhbHVlIiwic2lnbnVtIiwidG9CeXRlQXJyYXkiLCJlcXVhbHMiLCJtaW4iLCJhbmQiLCJiaXR3aXNlVG8iLCJvciIsInhvciIsImFuZE5vdCIsIm5vdCIsInNoaWZ0TGVmdCIsInJTaGlmdFRvIiwibFNoaWZ0VG8iLCJzaGlmdFJpZ2h0IiwiZ2V0TG93ZXN0U2V0Qml0IiwiYml0Q291bnQiLCJ0ZXN0Qml0IiwiZmxvb3IiLCJzZXRCaXQiLCJjaGFuZ2VCaXQiLCJjbGVhckJpdCIsImZsaXBCaXQiLCJhZGQiLCJhZGRUbyIsInN1YnRyYWN0IiwibXVsdGlwbHkiLCJtdWx0aXBseVRvIiwiZGl2aWRlIiwicmVtYWluZGVyIiwiZGl2aWRlQW5kUmVtYWluZGVyIiwicSIsIm1vZFBvdyIsIm5idiIsIkJhcnJldHQiLCJnIiwiazEiLCJjb252ZXJ0IiwiZzIiLCJzcXJUbyIsIm11bFRvIiwidyIsImlzMSIsInIyIiwicmV2ZXJ0IiwibW9kSW52ZXJzZSIsImFjIiwidSIsIk9ORSIsInBvdyIsIk51bGxFeHAiLCJnY2QiLCJpc1Byb2JhYmxlUHJpbWUiLCJtb2RJbnQiLCJtaWxsZXJSYWJpbiIsImZyb21JbnQiLCJmcm9tUmFkaXgiLCJtaSIsInNoIiwiaW50QXQiLCJjbGFtcCIsImRsU2hpZnRUbyIsImRyU2hpZnRUbyIsImJzIiwiY2JzIiwiYm0iLCJkcyIsImFtIiwic3F1YXJlVG8iLCJwbSIsInB0IiwidHMiLCJtcyIsIm5zaCIsInlzIiwieTAiLCJ5dCIsIkYxIiwiRjIiLCJkMSIsIkZWIiwiZDIiLCJxZCIsImludkRpZ2l0IiwiY2h1bmtTaXplIiwiTE4yIiwibG9nIiwiY3MiLCJkTXVsdGlwbHkiLCJkQWRkT2Zmc2V0IiwibmV4dEJ5dGVzIiwib3AiLCJmIiwibXVsdGlwbHlMb3dlclRvIiwibXVsdGlwbHlVcHBlclRvIiwibjEiLCJyYW5kb20iLCJzcXVhcmUiLCJnY2RhIiwiY2FsbGJhY2siLCJnY2RhMSIsInNldFRpbWVvdXQiLCJmcm9tTnVtYmVyQXN5bmMiLCJibnBfMSIsImJucGZuMV8xIiwicmVkdWNlIiwibXAiLCJtcGwiLCJtcGgiLCJ1bSIsIm10MiIsInUwIiwicTMiLCJtdSIsInBhcnNlQmlnSW50IiwiYW0xIiwiYW0yIiwieGwiLCJ4aCIsImFtMyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJCSV9GUCIsIkJJX1JDIiwicnIiLCJ2diIsIkFyY2ZvdXIiLCJTIiwiaW5pdCIsImtleSIsIm5leHQiLCJwcm5nX25ld3N0YXRlIiwicm5nX3BzaXplIiwicm5nX3N0YXRlIiwicm5nX3Bvb2wiLCJybmdfcHB0ciIsIndpbmRvdyIsImNyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsIlVpbnQzMkFycmF5Iiwib25Nb3VzZU1vdmVMaXN0ZW5lcl8xIiwiZXYiLCJjb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsIm1vdXNlQ29vcmRpbmF0ZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJybmdfZ2V0X2J5dGUiLCJTZWN1cmVSYW5kb20iLCJiYSIsInBrY3MxcGFkMSIsImNvbnNvbGUiLCJlcnJvciIsImZpbGxlciIsInBrY3MxcGFkMiIsInJuZyIsIlJTQUtleSIsImRtcDEiLCJkbXExIiwiY29lZmYiLCJkb1B1YmxpYyIsImRvUHJpdmF0ZSIsInhwIiwieHEiLCJzZXRQdWJsaWMiLCJOIiwiRSIsImVuY3J5cHQiLCJ0ZXh0Iiwic2V0UHJpdmF0ZSIsIkQiLCJzZXRQcml2YXRlRXgiLCJQIiwiUSIsIkRQIiwiRFEiLCJDIiwiZ2VuZXJhdGUiLCJCIiwicXMiLCJlZSIsInAxIiwicTEiLCJwaGkiLCJkZWNyeXB0IiwiY3RleHQiLCJwa2NzMXVucGFkMiIsImdlbmVyYXRlQXN5bmMiLCJyc2EiLCJsb29wMSIsImxvb3A0IiwibG9vcDMiLCJsb29wMiIsInNpZ24iLCJkaWdlc3RNZXRob2QiLCJkaWdlc3ROYW1lIiwiZ2V0RGlnZXN0SGVhZGVyIiwiZGlnZXN0IiwidmVyaWZ5Iiwic2lnbmF0dXJlIiwidW5wYWRkZWQiLCJyZXBsYWNlIiwicmVtb3ZlRGlnZXN0SGVhZGVyIiwiRElHRVNUX0hFQURFUlMiLCJtZDIiLCJtZDUiLCJzaGExIiwic2hhMjI0Iiwic2hhMjU2Iiwic2hhMzg0Iiwic2hhNTEyIiwicmlwZW1kMTYwIiwibmFtZSIsIm5hbWVfMSIsIllBSE9PIiwibGFuZyIsImV4dGVuZCIsInN1YmMiLCJzdXBlcmMiLCJvdmVycmlkZXMiLCJGIiwic3VwZXJjbGFzcyIsIl9JRUVudW1GaXgiLCJBREQiLCJ0ZXN0IiwiZm5hbWUiLCJleCIsIktKVVIiLCJhc24xIiwiQVNOMVV0aWwiLCJpbnRlZ2VyVG9CeXRlSGV4IiwiYmlnSW50VG9NaW5Ud29zQ29tcGxlbWVudHNIZXgiLCJiaWdJbnRlZ2VyVmFsdWUiLCJtYXRjaCIsImhQb3MiLCJ4b3JMZW4iLCJoTWFzayIsImJpTWFzayIsImJpTmVnIiwiZ2V0UEVNU3RyaW5nRnJvbUhleCIsImRhdGFIZXgiLCJwZW1IZWFkZXIiLCJoZXh0b3BlbSIsIm5ld09iamVjdCIsInBhcmFtIiwiX0tKVVIiLCJfS0pVUl9hc24xIiwiX0RFUkJvb2xlYW4iLCJERVJCb29sZWFuIiwiX0RFUkludGVnZXIiLCJERVJJbnRlZ2VyIiwiX0RFUkJpdFN0cmluZyIsIkRFUkJpdFN0cmluZyIsIl9ERVJPY3RldFN0cmluZyIsIkRFUk9jdGV0U3RyaW5nIiwiX0RFUk51bGwiLCJERVJOdWxsIiwiX0RFUk9iamVjdElkZW50aWZpZXIiLCJERVJPYmplY3RJZGVudGlmaWVyIiwiX0RFUkVudW1lcmF0ZWQiLCJERVJFbnVtZXJhdGVkIiwiX0RFUlVURjhTdHJpbmciLCJERVJVVEY4U3RyaW5nIiwiX0RFUk51bWVyaWNTdHJpbmciLCJERVJOdW1lcmljU3RyaW5nIiwiX0RFUlByaW50YWJsZVN0cmluZyIsIkRFUlByaW50YWJsZVN0cmluZyIsIl9ERVJUZWxldGV4U3RyaW5nIiwiREVSVGVsZXRleFN0cmluZyIsIl9ERVJJQTVTdHJpbmciLCJERVJJQTVTdHJpbmciLCJfREVSVVRDVGltZSIsIkRFUlVUQ1RpbWUiLCJfREVSR2VuZXJhbGl6ZWRUaW1lIiwiREVSR2VuZXJhbGl6ZWRUaW1lIiwiX0RFUlNlcXVlbmNlIiwiREVSU2VxdWVuY2UiLCJfREVSU2V0IiwiREVSU2V0IiwiX0RFUlRhZ2dlZE9iamVjdCIsIkRFUlRhZ2dlZE9iamVjdCIsIl9uZXdPYmplY3QiLCJrZXlzIiwicGFyYW1MaXN0IiwiYXNuMU9iaiIsInB1c2giLCJ0YWdQYXJhbSIsImNhbGwiLCJvYmoiLCJleHBsaWNpdCIsIm5ld1BhcmFtIiwianNvblRvQVNOMUhFWCIsImdldEVuY29kZWRIZXgiLCJvaWRIZXhUb0ludCIsImkwMSIsImkwIiwiaTEiLCJiaW5idWYiLCJiaW4iLCJzbGljZSIsImJpIiwib2lkSW50VG9IZXgiLCJvaWRTdHJpbmciLCJpdG94Iiwicm9pZHRveCIsInJvaWQiLCJwYWRMZW4iLCJiUGFkIiwiYjgiLCJzcGxpdCIsInNwbGljZSIsIkFTTjFPYmplY3QiLCJoViIsImdldExlbmd0aEhleEZyb21WYWx1ZSIsImhOIiwiaE5sZW4iLCJoZWFkIiwiaFRMViIsImlzTW9kaWZpZWQiLCJnZXRGcmVzaFZhbHVlSGV4IiwiaEwiLCJoVCIsImdldFZhbHVlSGV4IiwiREVSQWJzdHJhY3RTdHJpbmciLCJwYXJhbXMiLCJnZXRTdHJpbmciLCJzZXRTdHJpbmciLCJuZXdTIiwic3RvaGV4Iiwic2V0U3RyaW5nSGV4IiwibmV3SGV4U3RyaW5nIiwiREVSQWJzdHJhY3RUaW1lIiwibG9jYWxEYXRlVG9VVEMiLCJ1dGMiLCJnZXRUaW1lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGNEYXRlIiwiRGF0ZSIsImZvcm1hdERhdGUiLCJkYXRlT2JqZWN0IiwidHlwZSIsIndpdGhNaWxsaXMiLCJ6ZXJvUGFkZGluZyIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInNlYyIsImdldFNlY29uZHMiLCJtaWxsaXMiLCJnZXRNaWxsaXNlY29uZHMiLCJzTWlsbGlzIiwiam9pbiIsInNldEJ5RGF0ZVZhbHVlIiwiVVRDIiwic2V0QnlEYXRlIiwiREVSQWJzdHJhY3RTdHJ1Y3R1cmVkIiwic2V0QnlBU04xT2JqZWN0QXJyYXkiLCJhc24xT2JqZWN0QXJyYXkiLCJhc24xQXJyYXkiLCJhcHBlbmRBU04xT2JqZWN0IiwiYXNuMU9iamVjdCIsInNldEJ5QmlnSW50ZWdlciIsInNldEJ5SW50ZWdlciIsInNldFZhbHVlSGV4IiwibyIsInNldEhleFZhbHVlSW5jbHVkaW5nVW51c2VkQml0cyIsIm5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHMiLCJzZXRVbnVzZWRCaXRzQW5kSGV4VmFsdWUiLCJ1bnVzZWRCaXRzIiwiaFZhbHVlIiwiaFVudXNlZEJpdHMiLCJzZXRCeUJpbmFyeVN0cmluZyIsImJpbmFyeVN0cmluZyIsInNldEJ5Qm9vbGVhbkFycmF5IiwiYm9vbGVhbkFycmF5IiwibmV3RmFsc2VBcnJheSIsIm5MZW5ndGgiLCJzZXRWYWx1ZU9pZFN0cmluZyIsInNldFZhbHVlTmFtZSIsIm9pZE5hbWUiLCJvaWQiLCJ4NTA5IiwiT0lEIiwibmFtZTJvaWQiLCJkYXRlIiwic29ydEZsYWciLCJzb3J0Iiwic29ydGZsYWciLCJpc0V4cGxpY2l0Iiwic2V0QVNOMU9iamVjdCIsImlzRXhwbGljaXRGbGFnIiwidGFnTm9IZXgiLCJKU0VuY3J5cHRSU0FLZXkiLCJfc3VwZXIiLCJfdGhpcyIsInBhcnNlS2V5IiwiaGFzUHJpdmF0ZUtleVByb3BlcnR5IiwiaGFzUHVibGljS2V5UHJvcGVydHkiLCJwYXJzZVByb3BlcnRpZXNGcm9tIiwicGVtIiwibW9kdWx1cyIsInB1YmxpY19leHBvbmVudCIsInJlSGV4IiwiZGVyIiwicHJpdmF0ZV9leHBvbmVudCIsInByaW1lMSIsInByaW1lMiIsImV4cG9uZW50MSIsImV4cG9uZW50MiIsImNvZWZmaWNpZW50IiwiYml0X3N0cmluZyIsInNlcXVlbmNlIiwiZ2V0UHJpdmF0ZUJhc2VLZXkiLCJvcHRpb25zIiwiYXJyYXkiLCJiaWdpbnQiLCJzZXEiLCJnZXRQdWJsaWNCYXNlS2V5IiwiZmlyc3Rfc2VxdWVuY2UiLCJzZWNvbmRfc2VxdWVuY2UiLCJ3b3Jkd3JhcCIsIndpZHRoIiwicmVnZXgiLCJSZWdFeHAiLCJkZWZhdWx0X2tleV9zaXplIiwiZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQiLCJzZXRLZXkiLCJ3YXJuIiwic2V0UHJpdmF0ZUtleSIsInByaXZrZXkiLCJzZXRQdWJsaWNLZXkiLCJwdWJrZXkiLCJnZXRLZXkiLCJjYiIsInZlcnNpb24iLCJkZWZpbmVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLFdBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3hCLFVBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsT0FBT0MsTUFBUCxLQUFrQixXQUFqRCxHQUErREYsT0FBTyxDQUFDQyxPQUFELENBQXRFLEdBQ0ksT0FBT0UsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDQyxHQUF2QyxHQUE2Q0QsTUFBTSxDQUFDLENBQUMsU0FBRCxDQUFELEVBQWNILE9BQWQsQ0FBbkQsR0FDS0EsT0FBTyxDQUFFRCxNQUFNLENBQUNNLFNBQVAsR0FBbUIsRUFBckIsQ0FGaEI7QUFHSCxDQUpBLFVBSVEsVUFBVUosT0FBVixFQUFtQjtBQUN4Qjs7QUFFQSxNQUFJSyxLQUFLLEdBQUcsc0NBQVo7O0FBQ0EsV0FBU0MsUUFBVCxDQUFrQkMsQ0FBbEIsRUFBcUI7QUFDakIsV0FBT0YsS0FBSyxDQUFDRyxNQUFOLENBQWFELENBQWIsQ0FBUDtBQUNILEdBTnVCLENBT3hCO0FBQ0E7OztBQUNBLFdBQVNFLE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQjtBQUNsQixXQUFPRCxDQUFDLEdBQUdDLENBQVg7QUFDSCxHQVh1QixDQVl4Qjs7O0FBQ0EsV0FBU0MsS0FBVCxDQUFlRixDQUFmLEVBQWtCQyxDQUFsQixFQUFxQjtBQUNqQixXQUFPRCxDQUFDLEdBQUdDLENBQVg7QUFDSCxHQWZ1QixDQWdC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RSxFQUE3RSxFQUFpRixFQUFqRixFQUFxRixFQUFyRixFQUF5RixFQUF6RixFQUE2RixFQUE3RixFQUFpRyxHQUFqRyxFQUFzRyxHQUF0RyxFQUEyRyxHQUEzRyxFQUFnSCxHQUFoSCxFQUFxSCxHQUFySCxFQUEwSCxHQUExSCxFQUErSCxHQUEvSCxFQUFvSSxHQUFwSSxFQUF5SSxHQUF6SSxFQUE4SSxHQUE5SSxFQUFtSixHQUFuSixFQUF3SixHQUF4SixFQUE2SixHQUE3SixFQUFrSyxHQUFsSyxFQUF1SyxHQUF2SyxFQUE0SyxHQUE1SyxFQUFpTCxHQUFqTCxFQUFzTCxHQUF0TCxFQUEyTCxHQUEzTCxFQUFnTSxHQUFoTSxFQUFxTSxHQUFyTSxFQUEwTSxHQUExTSxFQUErTSxHQUEvTSxFQUFvTixHQUFwTixFQUF5TixHQUF6TixFQUE4TixHQUE5TixFQUFtTyxHQUFuTyxFQUF3TyxHQUF4TyxFQUE2TyxHQUE3TyxFQUFrUCxHQUFsUCxFQUF1UCxHQUF2UCxFQUE0UCxHQUE1UCxFQUFpUSxHQUFqUSxFQUFzUSxHQUF0USxFQUEyUSxHQUEzUSxFQUFnUixHQUFoUixFQUFxUixHQUFyUixFQUEwUixHQUExUixFQUErUixHQUEvUixFQUFvUyxHQUFwUyxFQUF5UyxHQUF6UyxFQUE4UyxHQUE5UyxFQUFtVCxHQUFuVCxFQUF3VCxHQUF4VCxFQUE2VCxHQUE3VCxFQUFrVSxHQUFsVSxFQUF1VSxHQUF2VSxFQUE0VSxHQUE1VSxFQUFpVixHQUFqVixFQUFzVixHQUF0VixFQUEyVixHQUEzVixFQUFnVyxHQUFoVyxFQUFxVyxHQUFyVyxFQUEwVyxHQUExVyxFQUErVyxHQUEvVyxFQUFvWCxHQUFwWCxFQUF5WCxHQUF6WCxFQUE4WCxHQUE5WCxFQUFtWSxHQUFuWSxFQUF3WSxHQUF4WSxFQUE2WSxHQUE3WSxFQUFrWixHQUFsWixFQUF1WixHQUF2WixFQUE0WixHQUE1WixFQUFpYSxHQUFqYSxFQUFzYSxHQUF0YSxFQUEyYSxHQUEzYSxFQUFnYixHQUFoYixFQUFxYixHQUFyYixFQUEwYixHQUExYixFQUEr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LGFBQUtBLEdBQUwsR0FBVyxJQUFJOFEsZUFBSixFQUFYOztBQUNBLFlBQUl5QyxFQUFFLElBQUksR0FBR2ppQixRQUFILENBQVl5WSxJQUFaLENBQWlCd0osRUFBakIsTUFBeUIsbUJBQW5DLEVBQXdEO0FBQ3BELGVBQUt2VCxHQUFMLENBQVMyRCxhQUFULENBQXVCLEtBQUttUCxnQkFBNUIsRUFBOEMsS0FBS0MsdUJBQW5ELEVBQTRFUSxFQUE1RTtBQUNBO0FBQ0gsU0FOVSxDQU9YOzs7QUFDQSxhQUFLdlQsR0FBTCxDQUFTaUQsUUFBVCxDQUFrQixLQUFLNlAsZ0JBQXZCLEVBQXlDLEtBQUtDLHVCQUE5QztBQUNIOztBQUNELGFBQU8sS0FBSy9TLEdBQVo7QUFDSCxLQWJEOztBQWNBbFQsSUFBQUEsU0FBUyxDQUFDMG1CLE9BQVYsR0FBb0IsWUFBcEI7QUFDQSxXQUFPMW1CLFNBQVA7QUFDSCxHQXBJOEIsRUFBL0I7O0FBc0lBeVQsRUFBQUEsTUFBTSxDQUFDelQsU0FBUCxHQUFtQkEsU0FBbkI7QUFFQUosRUFBQUEsT0FBTyxDQUFDSSxTQUFSLEdBQW9CQSxTQUFwQjtBQUNBSixFQUFBQSxPQUFPLFdBQVAsR0FBa0JJLFNBQWxCO0FBRUFpQyxFQUFBQSxNQUFNLENBQUMwa0IsY0FBUCxDQUFzQi9tQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFcUUsSUFBQUEsS0FBSyxFQUFFO0FBQVQsR0FBN0M7QUFFSCxDQWhyS0EsQ0FBRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxyXG4gICAgICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxyXG4gICAgICAgICAgICAoZmFjdG9yeSgoZ2xvYmFsLkpTRW5jcnlwdCA9IHt9KSkpO1xyXG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBCSV9STSA9IFwiMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XHJcbiAgICBmdW5jdGlvbiBpbnQyY2hhcihuKSB7XHJcbiAgICAgICAgcmV0dXJuIEJJX1JNLmNoYXJBdChuKTtcclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBCSVRfT1BFUkFUSU9OU1xyXG4gICAgLy8gKHB1YmxpYykgdGhpcyAmIGFcclxuICAgIGZ1bmN0aW9uIG9wX2FuZCh4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHggJiB5O1xyXG4gICAgfVxyXG4gICAgLy8gKHB1YmxpYykgdGhpcyB8IGFcclxuICAgIGZ1bmN0aW9uIG9wX29yKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4geCB8IHk7XHJcbiAgICB9XHJcbiAgICAvLyAocHVibGljKSB0aGlzIF4gYVxyXG4gICAgZnVuY3Rpb24gb3BfeG9yKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4geCBeIHk7XHJcbiAgICB9XHJcbiAgICAvLyAocHVibGljKSB0aGlzICYgfmFcclxuICAgIGZ1bmN0aW9uIG9wX2FuZG5vdCh4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHggJiB+eTtcclxuICAgIH1cclxuICAgIC8vIHJldHVybiBpbmRleCBvZiBsb3dlc3QgMS1iaXQgaW4geCwgeCA8IDJeMzFcclxuICAgIGZ1bmN0aW9uIGxiaXQoeCkge1xyXG4gICAgICAgIGlmICh4ID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgciA9IDA7XHJcbiAgICAgICAgaWYgKCh4ICYgMHhmZmZmKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHggPj49IDE2O1xyXG4gICAgICAgICAgICByICs9IDE2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHggJiAweGZmKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHggPj49IDg7XHJcbiAgICAgICAgICAgIHIgKz0gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh4ICYgMHhmKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHggPj49IDQ7XHJcbiAgICAgICAgICAgIHIgKz0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh4ICYgMykgPT0gMCkge1xyXG4gICAgICAgICAgICB4ID4+PSAyO1xyXG4gICAgICAgICAgICByICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoeCAmIDEpID09IDApIHtcclxuICAgICAgICAgICAgKytyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuICAgIC8vIHJldHVybiBudW1iZXIgb2YgMSBiaXRzIGluIHhcclxuICAgIGZ1bmN0aW9uIGNiaXQoeCkge1xyXG4gICAgICAgIHZhciByID0gMDtcclxuICAgICAgICB3aGlsZSAoeCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHggJj0geCAtIDE7XHJcbiAgICAgICAgICAgICsrcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb24gQklUX09QRVJBVElPTlNcclxuXHJcbiAgICB2YXIgYjY0bWFwID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcbiAgICB2YXIgYjY0cGFkID0gXCI9XCI7XHJcbiAgICBmdW5jdGlvbiBoZXgyYjY0KGgpIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICB2YXIgYztcclxuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpICsgMyA8PSBoLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgIGMgPSBwYXJzZUludChoLnN1YnN0cmluZyhpLCBpICsgMyksIDE2KTtcclxuICAgICAgICAgICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA+PiA2KSArIGI2NG1hcC5jaGFyQXQoYyAmIDYzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgKyAxID09IGgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGMgPSBwYXJzZUludChoLnN1YnN0cmluZyhpLCBpICsgMSksIDE2KTtcclxuICAgICAgICAgICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA8PCAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaSArIDIgPT0gaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYyA9IHBhcnNlSW50KGguc3Vic3RyaW5nKGksIGkgKyAyKSwgMTYpO1xyXG4gICAgICAgICAgICByZXQgKz0gYjY0bWFwLmNoYXJBdChjID4+IDIpICsgYjY0bWFwLmNoYXJBdCgoYyAmIDMpIDw8IDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoKHJldC5sZW5ndGggJiAzKSA+IDApIHtcclxuICAgICAgICAgICAgcmV0ICs9IGI2NHBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIC8vIGNvbnZlcnQgYSBiYXNlNjQgc3RyaW5nIHRvIGhleFxyXG4gICAgZnVuY3Rpb24gYjY0dG9oZXgocykge1xyXG4gICAgICAgIHZhciByZXQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBrID0gMDsgLy8gYjY0IHN0YXRlLCAwLTNcclxuICAgICAgICB2YXIgc2xvcCA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKHMuY2hhckF0KGkpID09IGI2NHBhZCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHYgPSBiNjRtYXAuaW5kZXhPZihzLmNoYXJBdChpKSk7XHJcbiAgICAgICAgICAgIGlmICh2IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGsgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ICs9IGludDJjaGFyKHYgPj4gMik7XHJcbiAgICAgICAgICAgICAgICBzbG9wID0gdiAmIDM7XHJcbiAgICAgICAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldCArPSBpbnQyY2hhcigoc2xvcCA8PCAyKSB8ICh2ID4+IDQpKTtcclxuICAgICAgICAgICAgICAgIHNsb3AgPSB2ICYgMHhmO1xyXG4gICAgICAgICAgICAgICAgayA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoayA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgKz0gaW50MmNoYXIoc2xvcCk7XHJcbiAgICAgICAgICAgICAgICByZXQgKz0gaW50MmNoYXIodiA+PiAyKTtcclxuICAgICAgICAgICAgICAgIHNsb3AgPSB2ICYgMztcclxuICAgICAgICAgICAgICAgIGsgPSAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0ICs9IGludDJjaGFyKChzbG9wIDw8IDIpIHwgKHYgPj4gNCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0ICs9IGludDJjaGFyKHYgJiAweGYpO1xyXG4gICAgICAgICAgICAgICAgayA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGsgPT0gMSkge1xyXG4gICAgICAgICAgICByZXQgKz0gaW50MmNoYXIoc2xvcCA8PCAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbiAgICB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG4gICAgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICAgIFxyXG4gICAgVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG4gICAgS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG4gICAgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuICAgIE1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcbiAgICBcclxuICAgIFNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG4gICAgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgIC8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZXggSmF2YVNjcmlwdCBkZWNvZGVyXHJcbiAgICAvLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cclxuICAgIC8vIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgLy8gcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoZSBhYm92ZVxyXG4gICAgLy8gY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBhcHBlYXIgaW4gYWxsIGNvcGllcy5cclxuICAgIC8vXHJcbiAgICAvLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xyXG4gICAgLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxyXG4gICAgLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1JcclxuICAgIC8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcclxuICAgIC8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxyXG4gICAgLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0ZcclxuICAgIC8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAvKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIGltbWVkOiB0cnVlLCBsYXRlZGVmOiB0cnVlLCB1bmRlZjogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSAqL1xyXG4gICAgdmFyIGRlY29kZXI7XHJcbiAgICB2YXIgSGV4ID0ge1xyXG4gICAgICAgIGRlY29kZTogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIGlmIChkZWNvZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoZXggPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcclxuICAgICAgICAgICAgICAgIHZhciBpZ25vcmUgPSBcIiBcXGZcXG5cXHJcXHRcXHUwMEEwXFx1MjAyOFxcdTIwMjlcIjtcclxuICAgICAgICAgICAgICAgIGRlY29kZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlcltoZXguY2hhckF0KGkpXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBoZXggPSBoZXgudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDEwOyBpIDwgMTY7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY29kZXJbaGV4LmNoYXJBdChpKV0gPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGlnbm9yZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY29kZXJbaWdub3JlLmNoYXJBdChpKV0gPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XHJcbiAgICAgICAgICAgIHZhciBiaXRzID0gMDtcclxuICAgICAgICAgICAgdmFyIGNoYXJfY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBhLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IFwiPVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjID0gZGVjb2RlcltjXTtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBjaGFyYWN0ZXIgYXQgb2Zmc2V0IFwiICsgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiaXRzIHw9IGM7XHJcbiAgICAgICAgICAgICAgICBpZiAoKytjaGFyX2NvdW50ID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSBiaXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYml0cyA8PD0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhcl9jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGV4IGVuY29kaW5nIGluY29tcGxldGU6IDQgYml0cyBtaXNzaW5nXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCYXNlNjQgSmF2YVNjcmlwdCBkZWNvZGVyXHJcbiAgICAvLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cclxuICAgIC8vIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgLy8gcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoZSBhYm92ZVxyXG4gICAgLy8gY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBhcHBlYXIgaW4gYWxsIGNvcGllcy5cclxuICAgIC8vXHJcbiAgICAvLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xyXG4gICAgLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxyXG4gICAgLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1JcclxuICAgIC8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcclxuICAgIC8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxyXG4gICAgLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0ZcclxuICAgIC8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAvKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIGltbWVkOiB0cnVlLCBsYXRlZGVmOiB0cnVlLCB1bmRlZjogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSAqL1xyXG4gICAgdmFyIGRlY29kZXIkMTtcclxuICAgIHZhciBCYXNlNjQgPSB7XHJcbiAgICAgICAgZGVjb2RlOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgaWYgKGRlY29kZXIkMSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYjY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWdub3JlID0gXCI9IFxcZlxcblxcclxcdFxcdTAwQTBcXHUyMDI4XFx1MjAyOVwiO1xyXG4gICAgICAgICAgICAgICAgZGVjb2RlciQxID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA2NDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlciQxW2I2NC5jaGFyQXQoaSldID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpZ25vcmUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVyJDFbaWdub3JlLmNoYXJBdChpKV0gPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XHJcbiAgICAgICAgICAgIHZhciBiaXRzID0gMDtcclxuICAgICAgICAgICAgdmFyIGNoYXJfY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBhLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IFwiPVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjID0gZGVjb2RlciQxW2NdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGNoYXJhY3RlciBhdCBvZmZzZXQgXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJpdHMgfD0gYztcclxuICAgICAgICAgICAgICAgIGlmICgrK2NoYXJfY291bnQgPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IChiaXRzID4+IDE2KTtcclxuICAgICAgICAgICAgICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSAoYml0cyA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyAmIDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgYml0cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcl9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRzIDw8PSA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhcl9jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhc2U2NCBlbmNvZGluZyBpbmNvbXBsZXRlOiBhdCBsZWFzdCAyIGJpdHMgbWlzc2luZ1wiKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSAoYml0cyA+PiAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gKGJpdHMgPj4gMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IChiaXRzID4+IDgpICYgMHhGRjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmU6IC8tLS0tLUJFR0lOIFteLV0rLS0tLS0oW0EtWmEtejAtOStcXC89XFxzXSspLS0tLS1FTkQgW14tXSstLS0tLXxiZWdpbi1iYXNlNjRbXlxcbl0rXFxuKFtBLVphLXowLTkrXFwvPVxcc10rKT09PT0vLFxyXG4gICAgICAgIHVuYXJtb3I6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gQmFzZTY0LnJlLmV4ZWMoYSk7XHJcbiAgICAgICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGEgPSBtWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobVsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGEgPSBtWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnRXhwIG91dCBvZiBzeW5jXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBCYXNlNjQuZGVjb2RlKGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gQmlnIGludGVnZXIgYmFzZS0xMCBwcmludGluZyBsaWJyYXJ5XHJcbiAgICAvLyBDb3B5cmlnaHQgKGMpIDIwMTQgTGFwbyBMdWNoaW5pIDxsYXBvQGxhcG8uaXQ+XHJcbiAgICAvLyBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIC8vIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcclxuICAgIC8vIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXHJcbiAgICAvL1xyXG4gICAgLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVNcclxuICAgIC8vIFdJVEggUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0ZcclxuICAgIC8vIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SXHJcbiAgICAvLyBBTlkgU1BFQ0lBTCwgRElSRUNULCBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTXHJcbiAgICAvLyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU5cclxuICAgIC8vIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GXHJcbiAgICAvLyBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCBpbW1lZDogdHJ1ZSwgbGF0ZWRlZjogdHJ1ZSwgdW5kZWY6IHRydWUsIHJlZ2V4ZGFzaDogZmFsc2UgKi9cclxuICAgIHZhciBtYXggPSAxMDAwMDAwMDAwMDAwMDsgLy8gYmlnZ2VzdCBpbnRlZ2VyIHRoYXQgY2FuIHN0aWxsIGZpdCAyXjUzIHdoZW4gbXVsdGlwbGllZCBieSAyNTZcclxuICAgIHZhciBJbnQxMCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBJbnQxMCh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZiA9IFsrdmFsdWUgfHwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEludDEwLnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiAobSwgYykge1xyXG4gICAgICAgICAgICAvLyBhc3NlcnQobSA8PSAyNTYpXHJcbiAgICAgICAgICAgIHZhciBiID0gdGhpcy5idWY7XHJcbiAgICAgICAgICAgIHZhciBsID0gYi5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICB2YXIgdDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdCA9IGJbaV0gKiBtICsgYztcclxuICAgICAgICAgICAgICAgIGlmICh0IDwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjID0gMCB8ICh0IC8gbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICB0IC09IGMgKiBtYXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiW2ldID0gdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJbaV0gPSBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnQxMC5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAgLy8gYXNzZXJ0KG0gPD0gMjU2KVxyXG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuYnVmO1xyXG4gICAgICAgICAgICB2YXIgbCA9IGIubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgdmFyIHQ7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBiW2ldIC0gYztcclxuICAgICAgICAgICAgICAgIGlmICh0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQgKz0gbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIGMgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiW2ldID0gdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoYltiLmxlbmd0aCAtIDFdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBiLnBvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnQxMC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoYmFzZSkge1xyXG4gICAgICAgICAgICBpZiAoKGJhc2UgfHwgMTApICE9IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IGJhc2UgMTAgaXMgc3VwcG9ydGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBiID0gdGhpcy5idWY7XHJcbiAgICAgICAgICAgIHZhciBzID0gYltiLmxlbmd0aCAtIDFdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBiLmxlbmd0aCAtIDI7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IChtYXggKyBiW2ldKS50b1N0cmluZygpLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludDEwLnByb3RvdHlwZS52YWx1ZU9mID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuYnVmO1xyXG4gICAgICAgICAgICB2YXIgdiA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBiLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICB2ID0gdiAqIG1heCArIGJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnQxMC5wcm90b3R5cGUuc2ltcGxpZnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBiID0gdGhpcy5idWY7XHJcbiAgICAgICAgICAgIHJldHVybiAoYi5sZW5ndGggPT0gMSkgPyBiWzBdIDogdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBJbnQxMDtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgLy8gQVNOLjEgSmF2YVNjcmlwdCBkZWNvZGVyXHJcbiAgICB2YXIgZWxsaXBzaXMgPSBcIlxcdTIwMjZcIjtcclxuICAgIHZhciByZVRpbWVTID0gL14oXFxkXFxkKSgwWzEtOV18MVswLTJdKSgwWzEtOV18WzEyXVxcZHwzWzAxXSkoWzAxXVxcZHwyWzAtM10pKD86KFswLTVdXFxkKSg/OihbMC01XVxcZCkoPzpbLixdKFxcZHsxLDN9KSk/KT8pPyhafFstK10oPzpbMF1cXGR8MVswLTJdKShbMC01XVxcZCk/KT8kLztcclxuICAgIHZhciByZVRpbWVMID0gL14oXFxkXFxkXFxkXFxkKSgwWzEtOV18MVswLTJdKSgwWzEtOV18WzEyXVxcZHwzWzAxXSkoWzAxXVxcZHwyWzAtM10pKD86KFswLTVdXFxkKSg/OihbMC01XVxcZCkoPzpbLixdKFxcZHsxLDN9KSk/KT8pPyhafFstK10oPzpbMF1cXGR8MVswLTJdKShbMC01XVxcZCk/KT8kLztcclxuICAgIGZ1bmN0aW9uIHN0cmluZ0N1dChzdHIsIGxlbikge1xyXG4gICAgICAgIGlmIChzdHIubGVuZ3RoID4gbGVuKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbGVuKSArIGVsbGlwc2lzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgdmFyIFN0cmVhbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBTdHJlYW0oZW5jLCBwb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5oZXhEaWdpdHMgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcclxuICAgICAgICAgICAgaWYgKGVuYyBpbnN0YW5jZW9mIFN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmMgPSBlbmMuZW5jO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBlbmMucG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZW5jIHNob3VsZCBiZSBhbiBhcnJheSBvciBhIGJpbmFyeSBzdHJpbmdcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5jID0gZW5jO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU3RyZWFtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcG9zID0gdGhpcy5wb3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9zID49IHRoaXMuZW5jLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWVzdGluZyBieXRlIG9mZnNldCBcIiArIHBvcyArIFwiIG9uIGEgc3RyZWFtIG9mIGxlbmd0aCBcIiArIHRoaXMuZW5jLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcInN0cmluZ1wiID09PSB0eXBlb2YgdGhpcy5lbmMpID8gdGhpcy5lbmMuY2hhckNvZGVBdChwb3MpIDogdGhpcy5lbmNbcG9zXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUuaGV4Qnl0ZSA9IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhleERpZ2l0cy5jaGFyQXQoKGIgPj4gNCkgJiAweEYpICsgdGhpcy5oZXhEaWdpdHMuY2hhckF0KGIgJiAweEYpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU3RyZWFtLnByb3RvdHlwZS5oZXhEdW1wID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHJhdykge1xyXG4gICAgICAgICAgICB2YXIgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuaGV4Qnl0ZSh0aGlzLmdldChpKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmF3ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpICYgMHhGKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU3RyZWFtLnByb3RvdHlwZS5pc0FTQ0lJID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjID0gdGhpcy5nZXQoaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDMyIHx8IGMgPiAxNzYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nSVNPID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgdmFyIHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuZ2V0KGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUucGFyc2VTdHJpbmdVVEYgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjID0gdGhpcy5nZXQoaSsrKTtcclxuICAgICAgICAgICAgICAgIGlmIChjIDwgMTI4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKGMgPiAxOTEpICYmIChjIDwgMjI0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDFGKSA8PCA2KSB8ICh0aGlzLmdldChpKyspICYgMHgzRikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MEYpIDw8IDEyKSB8ICgodGhpcy5nZXQoaSsrKSAmIDB4M0YpIDw8IDYpIHwgKHRoaXMuZ2V0KGkrKykgJiAweDNGKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nQk1QID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBoaTtcclxuICAgICAgICAgICAgdmFyIGxvO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7KSB7XHJcbiAgICAgICAgICAgICAgICBoaSA9IHRoaXMuZ2V0KGkrKyk7XHJcbiAgICAgICAgICAgICAgICBsbyA9IHRoaXMuZ2V0KGkrKyk7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaGkgPDwgOCkgfCBsbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUucGFyc2VUaW1lID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHNob3J0WWVhcikge1xyXG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMucGFyc2VTdHJpbmdJU08oc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHZhciBtID0gKHNob3J0WWVhciA/IHJlVGltZVMgOiByZVRpbWVMKS5leGVjKHMpO1xyXG4gICAgICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlVucmVjb2duaXplZCB0aW1lOiBcIiArIHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNob3J0WWVhcikge1xyXG4gICAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgcXVlcnlpbmcgdGhlIHRpbWVyLCB1c2UgdGhlIGZpeGVkIHJhbmdlIFsxOTcwLCAyMDY5XVxyXG4gICAgICAgICAgICAgICAgLy8gaXQgd2lsbCBjb25mb3JtIHdpdGggSVRVIFguNDAwIFstMTAsICs0MF0gc2xpZGluZyB3aW5kb3cgdW50aWwgMjAzMFxyXG4gICAgICAgICAgICAgICAgbVsxXSA9ICttWzFdO1xyXG4gICAgICAgICAgICAgICAgbVsxXSArPSAoK21bMV0gPCA3MCkgPyAyMDAwIDogMTkwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzID0gbVsxXSArIFwiLVwiICsgbVsyXSArIFwiLVwiICsgbVszXSArIFwiIFwiICsgbVs0XTtcclxuICAgICAgICAgICAgaWYgKG1bNV0pIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCI6XCIgKyBtWzVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1bNl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzICs9IFwiOlwiICsgbVs2XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobVs3XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiLlwiICsgbVs3XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1bOF0pIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgVVRDXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAobVs4XSAhPSBcIlpcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgKz0gbVs4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobVs5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiOlwiICsgbVs5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlSW50ZWdlciA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5nZXQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbmVnID0gKHYgPiAxMjcpO1xyXG4gICAgICAgICAgICB2YXIgcGFkID0gbmVnID8gMjU1IDogMDtcclxuICAgICAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICAgICAgdmFyIHMgPSBcIlwiO1xyXG4gICAgICAgICAgICAvLyBza2lwIHVudXNlZnVsIGJpdHMgKG5vdCBhbGxvd2VkIGluIERFUilcclxuICAgICAgICAgICAgd2hpbGUgKHYgPT0gcGFkICYmICsrc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldChzdGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZWcgPyAtMSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2hvdyBiaXQgbGVuZ3RoIG9mIGh1Z2UgaW50ZWdlcnNcclxuICAgICAgICAgICAgaWYgKGxlbiA+IDQpIHtcclxuICAgICAgICAgICAgICAgIHMgPSB2O1xyXG4gICAgICAgICAgICAgICAgbGVuIDw8PSAzO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCgoK3MgXiBwYWQpICYgMHg4MCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgPSArcyA8PCAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC0tbGVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcyA9IFwiKFwiICsgbGVuICsgXCIgYml0KVxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRlY29kZSB0aGUgaW50ZWdlclxyXG4gICAgICAgICAgICBpZiAobmVnKSB7XHJcbiAgICAgICAgICAgICAgICB2ID0gdiAtIDI1NjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbiA9IG5ldyBJbnQxMCh2KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0ICsgMTsgaSA8IGVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBuLm11bEFkZCgyNTYsIHRoaXMuZ2V0KGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcyArIG4udG9TdHJpbmcoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUucGFyc2VCaXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciB1bnVzZWRCaXQgPSB0aGlzLmdldChzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciBsZW5CaXQgPSAoKGVuZCAtIHN0YXJ0IC0gMSkgPDwgMykgLSB1bnVzZWRCaXQ7XHJcbiAgICAgICAgICAgIHZhciBpbnRybyA9IFwiKFwiICsgbGVuQml0ICsgXCIgYml0KVxcblwiO1xyXG4gICAgICAgICAgICB2YXIgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCArIDE7IGkgPCBlbmQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGIgPSB0aGlzLmdldChpKTtcclxuICAgICAgICAgICAgICAgIHZhciBza2lwID0gKGkgPT0gZW5kIC0gMSkgPyB1bnVzZWRCaXQgOiAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDc7IGogPj0gc2tpcDsgLS1qKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyArPSAoYiA+PiBqKSAmIDEgPyBcIjFcIiA6IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludHJvICsgc3RyaW5nQ3V0KHMsIG1heExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGludHJvICsgcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUucGFyc2VPY3RldFN0cmluZyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBtYXhMZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBU0NJSShzdGFydCwgZW5kKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0N1dCh0aGlzLnBhcnNlU3RyaW5nSVNPKHN0YXJ0LCBlbmQpLCBtYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcclxuICAgICAgICAgICAgdmFyIHMgPSBcIihcIiArIGxlbiArIFwiIGJ5dGUpXFxuXCI7XHJcbiAgICAgICAgICAgIG1heExlbmd0aCAvPSAyOyAvLyB3ZSB3b3JrIGluIGJ5dGVzXHJcbiAgICAgICAgICAgIGlmIChsZW4gPiBtYXhMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuaGV4Qnl0ZSh0aGlzLmdldChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxlbiA+IG1heExlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcyArPSBlbGxpcHNpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN0cmVhbS5wcm90b3R5cGUucGFyc2VPSUQgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIG4gPSBuZXcgSW50MTAoKTtcclxuICAgICAgICAgICAgdmFyIGJpdHMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSB0aGlzLmdldChpKTtcclxuICAgICAgICAgICAgICAgIG4ubXVsQWRkKDEyOCwgdiAmIDB4N0YpO1xyXG4gICAgICAgICAgICAgICAgYml0cyArPSA3O1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodiAmIDB4ODApKSB7IC8vIGZpbmlzaGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG4uc2ltcGxpZnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gaW5zdGFuY2VvZiBJbnQxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5zdWIoODApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IFwiMi5cIiArIG4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gbiA8IDgwID8gbiA8IDQwID8gMCA6IDEgOiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IG0gKyBcIi5cIiArIChuIC0gbSAqIDQwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIi5cIiArIG4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdDdXQocywgbWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5ldyBJbnQxMCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiaXRzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIi5pbmNvbXBsZXRlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gU3RyZWFtO1xyXG4gICAgfSgpKTtcclxuICAgIHZhciBBU04xID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEFTTjEoc3RyZWFtLCBoZWFkZXIsIGxlbmd0aCwgdGFnLCBzdWIpIHtcclxuICAgICAgICAgICAgaWYgKCEodGFnIGluc3RhbmNlb2YgQVNOMVRhZykpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIHZhbHVlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnRhZyA9IHRhZztcclxuICAgICAgICAgICAgdGhpcy5zdWIgPSBzdWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFTTjEucHJvdG90eXBlLnR5cGVOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudGFnLnRhZ0NsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IC8vIHVuaXZlcnNhbFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50YWcudGFnTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVPQ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJCT09MRUFOXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIklOVEVHRVJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQklUX1NUUklOR1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJPQ1RFVF9TVFJJTkdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTlVMTFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJPQkpFQ1RfSURFTlRJRklFUlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJPYmplY3REZXNjcmlwdG9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVYVEVSTkFMXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlJFQUxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDBBOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRU5VTUVSQVRFRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFTUJFRERFRF9QRFZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDBDOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVVRGOFN0cmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTRVFVRU5DRVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTRVRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtZXJpY1N0cmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJQcmludGFibGVTdHJpbmdcIjsgLy8gQVNDSUkgc3Vic2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlRlbGV0ZXhTdHJpbmdcIjsgLy8gYWthIFQ2MVN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWaWRlb3RleFN0cmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJJQTVTdHJpbmdcIjsgLy8gQVNDSUlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDE3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVVRDVGltZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHZW5lcmFsaXplZFRpbWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDE5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR3JhcGhpY1N0cmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWaXNpYmxlU3RyaW5nXCI7IC8vIEFTQ0lJIHN1YnNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHZW5lcmFsU3RyaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxQzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlVuaXZlcnNhbFN0cmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJCTVBTdHJpbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVW5pdmVyc2FsX1wiICsgdGhpcy50YWcudGFnTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQXBwbGljYXRpb25fXCIgKyB0aGlzLnRhZy50YWdOdW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJbXCIgKyB0aGlzLnRhZy50YWdOdW1iZXIudG9TdHJpbmcoKSArIFwiXVwiOyAvLyBDb250ZXh0XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUHJpdmF0ZV9cIiArIHRoaXMudGFnLnRhZ051bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBU04xLnByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24gKG1heExlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGggPSBJbmZpbml0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMucG9zQ29udGVudCgpO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5hYnModGhpcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGFnLmlzVW5pdmVyc2FsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VPY3RldFN0cmluZyhjb250ZW50LCBjb250ZW50ICsgbGVuLCBtYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50YWcudGFnTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDE6IC8vIEJPT0xFQU5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc3RyZWFtLmdldChjb250ZW50KSA9PT0gMCkgPyBcImZhbHNlXCIgOiBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMjogLy8gSU5URUdFUlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZUludGVnZXIoY29udGVudCwgY29udGVudCArIGxlbik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDM6IC8vIEJJVF9TVFJJTkdcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdWIgPyBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5wYXJzZUJpdFN0cmluZyhjb250ZW50LCBjb250ZW50ICsgbGVuLCBtYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDA0OiAvLyBPQ1RFVF9TVFJJTkdcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdWIgPyBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5wYXJzZU9jdGV0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4sIG1heExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDB4MDU6IC8vIE5VTExcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwNjogLy8gT0JKRUNUX0lERU5USUZJRVJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VPSUQoY29udGVudCwgY29udGVudCArIGxlbiwgbWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgMHgwNzogLy8gT2JqZWN0RGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAweDA4OiAvLyBFWFRFUk5BTFxyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAweDA5OiAvLyBSRUFMXHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlIDB4MEE6IC8vIEVOVU1FUkFURURcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgMHgwQjogLy8gRU1CRURERURfUERWXHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MTA6IC8vIFNFUVVFTkNFXHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MTE6IC8vIFNFVFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIoXCIgKyB0aGlzLnN1Yi5sZW5ndGggKyBcIiBlbGVtKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiKG5vIGVsZW0pXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAweDBDOiAvLyBVVEY4U3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0N1dCh0aGlzLnN0cmVhbS5wYXJzZVN0cmluZ1VURihjb250ZW50LCBjb250ZW50ICsgbGVuKSwgbWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgxMjogLy8gTnVtZXJpY1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDEzOiAvLyBQcmludGFibGVTdHJpbmdcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgxNDogLy8gVGVsZXRleFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDE1OiAvLyBWaWRlb3RleFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDE2OiAvLyBJQTVTdHJpbmdcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgMHgxOTogLy8gR3JhcGhpY1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDFBOiAvLyBWaXNpYmxlU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSAweDFCOiAvLyBHZW5lcmFsU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSAweDFDOiAvLyBVbml2ZXJzYWxTdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nQ3V0KHRoaXMuc3RyZWFtLnBhcnNlU3RyaW5nSVNPKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pLCBtYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDFFOiAvLyBCTVBTdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nQ3V0KHRoaXMuc3RyZWFtLnBhcnNlU3RyaW5nQk1QKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pLCBtYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDE3OiAvLyBVVENUaW1lXHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MTg6IC8vIEdlbmVyYWxpemVkVGltZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZVRpbWUoY29udGVudCwgY29udGVudCArIGxlbiwgKHRoaXMudGFnLnRhZ051bWJlciA9PSAweDE3KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBU04xLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHlwZU5hbWUoKSArIFwiQFwiICsgdGhpcy5zdHJlYW0ucG9zICsgXCJbaGVhZGVyOlwiICsgdGhpcy5oZWFkZXIgKyBcIixsZW5ndGg6XCIgKyB0aGlzLmxlbmd0aCArIFwiLHN1YjpcIiArICgodGhpcy5zdWIgPT09IG51bGwpID8gXCJudWxsXCIgOiB0aGlzLnN1Yi5sZW5ndGgpICsgXCJdXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBU04xLnByb3RvdHlwZS50b1ByZXR0eVN0cmluZyA9IGZ1bmN0aW9uIChpbmRlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzID0gaW5kZW50ICsgdGhpcy50eXBlTmFtZSgpICsgXCIgQFwiICsgdGhpcy5zdHJlYW0ucG9zO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIitcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzICs9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWcudGFnQ29uc3RydWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgKGNvbnN0cnVjdGVkKVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCh0aGlzLnRhZy5pc1VuaXZlcnNhbCgpICYmICgodGhpcy50YWcudGFnTnVtYmVyID09IDB4MDMpIHx8ICh0aGlzLnRhZy50YWdOdW1iZXIgPT0gMHgwNCkpKSAmJiAodGhpcy5zdWIgIT09IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IFwiIChlbmNhcHN1bGF0ZXMpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcyArPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiAgXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5zdWIubGVuZ3RoOyBpIDwgbWF4OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuc3ViW2ldLnRvUHJldHR5U3RyaW5nKGluZGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBU04xLnByb3RvdHlwZS5wb3NTdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBvcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFTTjEucHJvdG90eXBlLnBvc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wb3MgKyB0aGlzLmhlYWRlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFTTjEucHJvdG90eXBlLnBvc0VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBvcyArIHRoaXMuaGVhZGVyICsgTWF0aC5hYnModGhpcy5sZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQVNOMS5wcm90b3R5cGUudG9IZXhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5oZXhEdW1wKHRoaXMucG9zU3RhcnQoKSwgdGhpcy5wb3NFbmQoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBU04xLmRlY29kZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcclxuICAgICAgICAgICAgdmFyIGJ1ZiA9IHN0cmVhbS5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IGJ1ZiAmIDB4N0Y7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPT0gYnVmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG5vIHJlYXNvbiB0byB1c2UgSW50MTAsIGFzIGl0IHdvdWxkIGJlIGEgaHVnZSBidWZmZXIgYW55d2F5c1xyXG4gICAgICAgICAgICBpZiAobGVuID4gNikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIG92ZXIgNDggYml0cyBub3Qgc3VwcG9ydGVkIGF0IHBvc2l0aW9uIFwiICsgKHN0cmVhbS5wb3MgLSAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxlbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0gLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIGJ1ZiA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZiA9IChidWYgKiAyNTYpICsgc3RyZWFtLmdldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWY7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZSB0aGUgaGV4YWRlY2ltYWwgdmFsdWUgKGFzIGEgc3RyaW5nKSBvZiB0aGUgY3VycmVudCBBU04uMSBlbGVtZW50XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKiBAcHVibGljXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQVNOMS5wcm90b3R5cGUuZ2V0SGV4U3RyaW5nVmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZXhTdHJpbmcgPSB0aGlzLnRvSGV4U3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLmhlYWRlciAqIDI7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCAqIDI7XHJcbiAgICAgICAgICAgIHJldHVybiBoZXhTdHJpbmcuc3Vic3RyKG9mZnNldCwgbGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFTTjEuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICB2YXIgc3RyZWFtO1xyXG4gICAgICAgICAgICBpZiAoIShzdHIgaW5zdGFuY2VvZiBTdHJlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0gPSBuZXcgU3RyZWFtKHN0ciwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0gPSBzdHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0cmVhbVN0YXJ0ID0gbmV3IFN0cmVhbShzdHJlYW0pO1xyXG4gICAgICAgICAgICB2YXIgdGFnID0gbmV3IEFTTjFUYWcoc3RyZWFtKTtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IEFTTjEuZGVjb2RlTGVuZ3RoKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHN0cmVhbS5wb3M7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBzdGFydCAtIHN0cmVhbVN0YXJ0LnBvcztcclxuICAgICAgICAgICAgdmFyIHN1YiA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdWIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobGVuICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmaW5pdGUgbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChzdHJlYW0ucG9zIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFtyZXQubGVuZ3RoXSA9IEFTTjEuZGVjb2RlKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJlYW0ucG9zICE9IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb250ZW50IHNpemUgaXMgbm90IGNvcnJlY3QgZm9yIGNvbnRhaW5lciBzdGFydGluZyBhdCBvZmZzZXQgXCIgKyBzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IEFTTjEuZGVjb2RlKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy50YWcuaXNFT0MoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0W3JldC5sZW5ndGhdID0gcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBzdGFydCAtIHN0cmVhbS5wb3M7IC8vIHVuZGVmaW5lZCBsZW5ndGhzIGFyZSByZXByZXNlbnRlZCBhcyBuZWdhdGl2ZSB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhjZXB0aW9uIHdoaWxlIGRlY29kaW5nIHVuZGVmaW5lZCBsZW5ndGggY29udGVudDogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGFnLnRhZ0NvbnN0cnVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtdXN0IGhhdmUgdmFsaWQgY29udGVudFxyXG4gICAgICAgICAgICAgICAgc3ViID0gZ2V0U3ViKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGFnLmlzVW5pdmVyc2FsKCkgJiYgKCh0YWcudGFnTnVtYmVyID09IDB4MDMpIHx8ICh0YWcudGFnTnVtYmVyID09IDB4MDQpKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc29tZXRpbWVzIEJpdFN0cmluZyBhbmQgT2N0ZXRTdHJpbmcgYXJlIHVzZWQgdG8gZW5jYXBzdWxhdGUgQVNOLjFcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZy50YWdOdW1iZXIgPT0gMHgwMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtLmdldCgpICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJJVCBTVFJJTkdzIHdpdGggdW51c2VkIGJpdHMgY2Fubm90IGVuY2Fwc3VsYXRlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdWIgPSBnZXRTdWIoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Yi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViW2ldLnRhZy5pc0VPQygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFT0MgaXMgbm90IHN1cHBvc2VkIHRvIGJlIGFjdHVhbCBjb250ZW50LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHNpbGVudGx5IGlnbm9yZSB3aGVuIHRoZXkgZG9uJ3RcclxuICAgICAgICAgICAgICAgICAgICBzdWIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdWIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZSBjYW4ndCBza2lwIG92ZXIgYW4gaW52YWxpZCB0YWcgd2l0aCB1bmRlZmluZWQgbGVuZ3RoIGF0IG9mZnNldCBcIiArIHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0cmVhbS5wb3MgPSBzdGFydCArIE1hdGguYWJzKGxlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBU04xKHN0cmVhbVN0YXJ0LCBoZWFkZXIsIGxlbiwgdGFnLCBzdWIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFTTjE7XHJcbiAgICB9KCkpO1xyXG4gICAgdmFyIEFTTjFUYWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gQVNOMVRhZyhzdHJlYW0pIHtcclxuICAgICAgICAgICAgdmFyIGJ1ZiA9IHN0cmVhbS5nZXQoKTtcclxuICAgICAgICAgICAgdGhpcy50YWdDbGFzcyA9IGJ1ZiA+PiA2O1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0NvbnN0cnVjdGVkID0gKChidWYgJiAweDIwKSAhPT0gMCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFnTnVtYmVyID0gYnVmICYgMHgxRjtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFnTnVtYmVyID09IDB4MUYpIHsgLy8gbG9uZyB0YWdcclxuICAgICAgICAgICAgICAgIHZhciBuID0gbmV3IEludDEwKCk7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gc3RyZWFtLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG4ubXVsQWRkKDEyOCwgYnVmICYgMHg3Rik7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChidWYgJiAweDgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnTnVtYmVyID0gbi5zaW1wbGlmeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFTTjFUYWcucHJvdG90eXBlLmlzVW5pdmVyc2FsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWdDbGFzcyA9PT0gMHgwMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFTTjFUYWcucHJvdG90eXBlLmlzRU9DID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWdDbGFzcyA9PT0gMHgwMCAmJiB0aGlzLnRhZ051bWJlciA9PT0gMHgwMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBBU04xVGFnO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvLyBDb3B5cmlnaHQgKGMpIDIwMDUgIFRvbSBXdVxyXG4gICAgLy8gQml0cyBwZXIgZGlnaXRcclxuICAgIHZhciBkYml0cztcclxuICAgIC8vIEphdmFTY3JpcHQgZW5naW5lIGFuYWx5c2lzXHJcbiAgICB2YXIgY2FuYXJ5ID0gMHhkZWFkYmVlZmNhZmU7XHJcbiAgICB2YXIgal9sbSA9ICgoY2FuYXJ5ICYgMHhmZmZmZmYpID09IDB4ZWZjYWZlKTtcclxuICAgIC8vI3JlZ2lvblxyXG4gICAgdmFyIGxvd3ByaW1lcyA9IFsyLCAzLCA1LCA3LCAxMSwgMTMsIDE3LCAxOSwgMjMsIDI5LCAzMSwgMzcsIDQxLCA0MywgNDcsIDUzLCA1OSwgNjEsIDY3LCA3MSwgNzMsIDc5LCA4MywgODksIDk3LCAxMDEsIDEwMywgMTA3LCAxMDksIDExMywgMTI3LCAxMzEsIDEzNywgMTM5LCAxNDksIDE1MSwgMTU3LCAxNjMsIDE2NywgMTczLCAxNzksIDE4MSwgMTkxLCAxOTMsIDE5NywgMTk5LCAyMTEsIDIyMywgMjI3LCAyMjksIDIzMywgMjM5LCAyNDEsIDI1MSwgMjU3LCAyNjMsIDI2OSwgMjcxLCAyNzcsIDI4MSwgMjgzLCAyOTMsIDMwNywgMzExLCAzMTMsIDMxNywgMzMxLCAzMzcsIDM0NywgMzQ5LCAzNTMsIDM1OSwgMzY3LCAzNzMsIDM3OSwgMzgzLCAzODksIDM5NywgNDAxLCA0MDksIDQxOSwgNDIxLCA0MzEsIDQzMywgNDM5LCA0NDMsIDQ0OSwgNDU3LCA0NjEsIDQ2MywgNDY3LCA0NzksIDQ4NywgNDkxLCA0OTksIDUwMywgNTA5LCA1MjEsIDUyMywgNTQxLCA1NDcsIDU1NywgNTYzLCA1NjksIDU3MSwgNTc3LCA1ODcsIDU5MywgNTk5LCA2MDEsIDYwNywgNjEzLCA2MTcsIDYxOSwgNjMxLCA2NDEsIDY0MywgNjQ3LCA2NTMsIDY1OSwgNjYxLCA2NzMsIDY3NywgNjgzLCA2OTEsIDcwMSwgNzA5LCA3MTksIDcyNywgNzMzLCA3MzksIDc0MywgNzUxLCA3NTcsIDc2MSwgNzY5LCA3NzMsIDc4NywgNzk3LCA4MDksIDgxMSwgODIxLCA4MjMsIDgyNywgODI5LCA4MzksIDg1MywgODU3LCA4NTksIDg2MywgODc3LCA4ODEsIDg4MywgODg3LCA5MDcsIDkxMSwgOTE5LCA5MjksIDkzNywgOTQxLCA5NDcsIDk1MywgOTY3LCA5NzEsIDk3NywgOTgzLCA5OTEsIDk5N107XHJcbiAgICB2YXIgbHBsaW0gPSAoMSA8PCAyNikgLyBsb3dwcmltZXNbbG93cHJpbWVzLmxlbmd0aCAtIDFdO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyAocHVibGljKSBDb25zdHJ1Y3RvclxyXG4gICAgdmFyIEJpZ0ludGVnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gQmlnSW50ZWdlcihhLCBiLCBjKSB7XHJcbiAgICAgICAgICAgIGlmIChhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsIGIsIGMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYiA9PSBudWxsICYmIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb21TdHJpbmcoYSwgMjU2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbVN0cmluZyhhLCBiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNyZWdpb24gUFVCTElDXHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUudG9TdHJpbmcgPSBiblRvU3RyaW5nO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIHJldHVybiBzdHJpbmcgcmVwcmVzZW50YXRpb24gaW4gZ2l2ZW4gcmFkaXhcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCItXCIgKyB0aGlzLm5lZ2F0ZSgpLnRvU3RyaW5nKGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBrO1xyXG4gICAgICAgICAgICBpZiAoYiA9PSAxNikge1xyXG4gICAgICAgICAgICAgICAgayA9IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYiA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBrID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChiID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGIgPT0gMzIpIHtcclxuICAgICAgICAgICAgICAgIGsgPSA1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGIgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgayA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b1JhZGl4KGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBrbSA9ICgxIDw8IGspIC0gMTtcclxuICAgICAgICAgICAgdmFyIGQ7XHJcbiAgICAgICAgICAgIHZhciBtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnQ7XHJcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5EQiAtIChpICogdGhpcy5EQikgJSBrO1xyXG4gICAgICAgICAgICBpZiAoaS0tID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAgPCB0aGlzLkRCICYmIChkID0gdGhpc1tpXSA+PiBwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByID0gaW50MmNoYXIoZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPCBrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQgPSAodGhpc1tpXSAmICgoMSA8PCBwKSAtIDEpKSA8PCAoayAtIHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkIHw9IHRoaXNbLS1pXSA+PiAocCArPSB0aGlzLkRCIC0gayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkID0gKHRoaXNbaV0gPj4gKHAgLT0gaykpICYga207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgKz0gdGhpcy5EQjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0taTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIgKz0gaW50MmNoYXIoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtID8gciA6IFwiMFwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubmVnYXRlID0gYm5OZWdhdGU7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgLXRoaXNcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyh0aGlzLCByKTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hYnMgPSBibkFicztcclxuICAgICAgICAvLyAocHVibGljKSB8dGhpc3xcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hYnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zIDwgMCkgPyB0aGlzLm5lZ2F0ZSgpIDogdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmVUbyA9IGJuQ29tcGFyZVRvO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIHJldHVybiArIGlmIHRoaXMgPiBhLCAtIGlmIHRoaXMgPCBhLCAwIGlmIGVxdWFsXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuY29tcGFyZVRvID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSB0aGlzLnMgLSBhLnM7XHJcbiAgICAgICAgICAgIGlmIChyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy50O1xyXG4gICAgICAgICAgICByID0gaSAtIGEudDtcclxuICAgICAgICAgICAgaWYgKHIgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnMgPCAwKSA/IC1yIDogcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgociA9IHRoaXNbaV0gLSBhW2ldKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRMZW5ndGggPSBibkJpdExlbmd0aDtcclxuICAgICAgICAvLyAocHVibGljKSByZXR1cm4gdGhlIG51bWJlciBvZiBiaXRzIGluIFwidGhpc1wiXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYml0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkRCICogKHRoaXMudCAtIDEpICsgbmJpdHModGhpc1t0aGlzLnQgLSAxXSBeICh0aGlzLnMgJiB0aGlzLkRNKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2QgPSBibk1vZDtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzIG1vZCBhXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuYmkoKTtcclxuICAgICAgICAgICAgdGhpcy5hYnMoKS5kaXZSZW1UbyhhLCBudWxsLCByKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGEuc3ViVG8ociwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3dJbnQgPSBibk1vZFBvd0ludDtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzXmUgJSBtLCAwIDw9IGUgPCAyXjMyXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93SW50ID0gZnVuY3Rpb24gKGUsIG0pIHtcclxuICAgICAgICAgICAgdmFyIHo7XHJcbiAgICAgICAgICAgIGlmIChlIDwgMjU2IHx8IG0uaXNFdmVuKCkpIHtcclxuICAgICAgICAgICAgICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHogPSBuZXcgTW9udGdvbWVyeShtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHAoZSwgeik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbG9uZSA9IGJuQ2xvbmU7XHJcbiAgICAgICAgLy8gKHB1YmxpYylcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuYmkoKTtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VG8ocik7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaW50VmFsdWUgPSBibkludFZhbHVlO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIHJldHVybiB2YWx1ZSBhcyBpbnRlZ2VyXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuaW50VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXSAtIHRoaXMuRFY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFzc3VtZXMgMTYgPCBEQiA8IDMyXHJcbiAgICAgICAgICAgIHJldHVybiAoKHRoaXNbMV0gJiAoKDEgPDwgKDMyIC0gdGhpcy5EQikpIC0gMSkpIDw8IHRoaXMuREIpIHwgdGhpc1swXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmJ5dGVWYWx1ZSA9IGJuQnl0ZVZhbHVlO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIHJldHVybiB2YWx1ZSBhcyBieXRlXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYnl0ZVZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudCA9PSAwKSA/IHRoaXMucyA6ICh0aGlzWzBdIDw8IDI0KSA+PiAyNDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNob3J0VmFsdWUgPSBiblNob3J0VmFsdWU7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIHNob3J0IChhc3N1bWVzIERCPj0xNilcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaG9ydFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudCA9PSAwKSA/IHRoaXMucyA6ICh0aGlzWzBdIDw8IDE2KSA+PiAxNjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNpZ251bSA9IGJuU2lnTnVtO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIDAgaWYgdGhpcyA9PSAwLCAxIGlmIHRoaXMgPiAwXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2lnbnVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudCA8PSAwIHx8ICh0aGlzLnQgPT0gMSAmJiB0aGlzWzBdIDw9IDApKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b0J5dGVBcnJheSA9IGJuVG9CeXRlQXJyYXk7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgY29udmVydCB0byBiaWdlbmRpYW4gYnl0ZSBhcnJheVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnRvQnl0ZUFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMudDtcclxuICAgICAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAgICAgclswXSA9IHRoaXMucztcclxuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLkRCIC0gKGkgKiB0aGlzLkRCKSAlIDg7XHJcbiAgICAgICAgICAgIHZhciBkO1xyXG4gICAgICAgICAgICB2YXIgayA9IDA7XHJcbiAgICAgICAgICAgIGlmIChpLS0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocCA8IHRoaXMuREIgJiYgKGQgPSB0aGlzW2ldID4+IHApICE9ICh0aGlzLnMgJiB0aGlzLkRNKSA+PiBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcltrKytdID0gZCB8ICh0aGlzLnMgPDwgKHRoaXMuREIgLSBwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQgPSAodGhpc1tpXSAmICgoMSA8PCBwKSAtIDEpKSA8PCAoOCAtIHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkIHw9IHRoaXNbLS1pXSA+PiAocCArPSB0aGlzLkRCIC0gOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkID0gKHRoaXNbaV0gPj4gKHAgLT0gOCkpICYgMHhmZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCArPSB0aGlzLkRCO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLS1pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZCAmIDB4ODApICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZCB8PSAtMjU2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSAwICYmICh0aGlzLnMgJiAweDgwKSAhPSAoZCAmIDB4ODApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsraztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPiAwIHx8IGQgIT0gdGhpcy5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJbaysrXSA9IGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gYm5FcXVhbHM7XHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNvbXBhcmVUbyhhKSA9PSAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm1pbiA9IGJuTWluO1xyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jb21wYXJlVG8oYSkgPCAwKSA/IHRoaXMgOiBhO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubWF4ID0gYm5NYXg7XHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmNvbXBhcmVUbyhhKSA+IDApID8gdGhpcyA6IGE7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbmQgPSBibkFuZDtcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhhLCBvcF9hbmQsIHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm9yID0gYm5PcjtcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYml0d2lzZVRvKGEsIG9wX29yLCByKTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS54b3IgPSBiblhvcjtcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS54b3IgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhhLCBvcF94b3IsIHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGJuQW5kTm90O1xyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYml0d2lzZVRvKGEsIG9wX2FuZG5vdCwgcik7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubm90ID0gYm5Ob3Q7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgfnRoaXNcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHJbaV0gPSB0aGlzLkRNICYgfnRoaXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci50ID0gdGhpcy50O1xyXG4gICAgICAgICAgICByLnMgPSB+dGhpcy5zO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0TGVmdCA9IGJuU2hpZnRMZWZ0O1xyXG4gICAgICAgIC8vIChwdWJsaWMpIHRoaXMgPDwgblxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0TGVmdCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIGlmIChuIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yU2hpZnRUbygtbiwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxTaGlmdFRvKG4sIHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc2hpZnRSaWdodCA9IGJuU2hpZnRSaWdodDtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzID4+IG5cclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdFJpZ2h0ID0gZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuYmkoKTtcclxuICAgICAgICAgICAgaWYgKG4gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxTaGlmdFRvKC1uLCByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuclNoaWZ0VG8obiwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nZXRMb3dlc3RTZXRCaXQgPSBibkdldExvd2VzdFNldEJpdDtcclxuICAgICAgICAvLyAocHVibGljKSByZXR1cm5zIGluZGV4IG9mIGxvd2VzdCAxLWJpdCAob3IgLTEgaWYgbm9uZSlcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nZXRMb3dlc3RTZXRCaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSAqIHRoaXMuREIgKyBsYml0KHRoaXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ICogdGhpcy5EQjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRDb3VudCA9IGJuQml0Q291bnQ7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgcmV0dXJuIG51bWJlciBvZiBzZXQgYml0c1xyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdENvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgciA9IDA7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5zICYgdGhpcy5ETTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgciArPSBjYml0KHRoaXNbaV0gXiB4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnRlc3RCaXQgPSBiblRlc3RCaXQ7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdHJ1ZSBpZmYgbnRoIGJpdCBpcyBzZXRcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50ZXN0Qml0ID0gZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgdmFyIGogPSBNYXRoLmZsb29yKG4gLyB0aGlzLkRCKTtcclxuICAgICAgICAgICAgaWYgKGogPj0gdGhpcy50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMucyAhPSAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCh0aGlzW2pdICYgKDEgPDwgKG4gJSB0aGlzLkRCKSkpICE9IDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc2V0Qml0ID0gYm5TZXRCaXQ7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGhpcyB8ICgxPDxuKVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnNldEJpdCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBvcF9vcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbGVhckJpdCA9IGJuQ2xlYXJCaXQ7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGhpcyAmIH4oMTw8bilcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbGVhckJpdCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBvcF9hbmRub3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZmxpcEJpdCA9IGJuRmxpcEJpdDtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzIF4gKDE8PG4pXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZmxpcEJpdCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBvcF94b3IpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkID0gYm5BZGQ7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGhpcyArIGFcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvKGEsIHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0ID0gYm5TdWJ0cmFjdDtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzIC0gYVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuYmkoKTtcclxuICAgICAgICAgICAgdGhpcy5zdWJUbyhhLCByKTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseSA9IGJuTXVsdGlwbHk7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGhpcyAqIGFcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbHlUbyhhLCByKTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGUgPSBibkRpdmlkZTtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzIC8gYVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2UmVtVG8oYSwgciwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUucmVtYWluZGVyID0gYm5SZW1haW5kZXI7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGhpcyAlIGFcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5yZW1haW5kZXIgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpdlJlbVRvKGEsIG51bGwsIHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZUFuZFJlbWFpbmRlciA9IGJuRGl2aWRlQW5kUmVtYWluZGVyO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIFt0aGlzL2EsdGhpcyVhXVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZUFuZFJlbWFpbmRlciA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciBxID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2UmVtVG8oYSwgcSwgcik7XHJcbiAgICAgICAgICAgIHJldHVybiBbcSwgcl07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3cgPSBibk1vZFBvdztcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzXmUgJSBtIChIQUMgMTQuODUpXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93ID0gZnVuY3Rpb24gKGUsIG0pIHtcclxuICAgICAgICAgICAgdmFyIGkgPSBlLmJpdExlbmd0aCgpO1xyXG4gICAgICAgICAgICB2YXIgaztcclxuICAgICAgICAgICAgdmFyIHIgPSBuYnYoMSk7XHJcbiAgICAgICAgICAgIHZhciB6O1xyXG4gICAgICAgICAgICBpZiAoaSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpIDwgMTgpIHtcclxuICAgICAgICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPCA0OCkge1xyXG4gICAgICAgICAgICAgICAgayA9IDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IDE0NCkge1xyXG4gICAgICAgICAgICAgICAgayA9IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgayA9IDU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBrID0gNjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA8IDgpIHtcclxuICAgICAgICAgICAgICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtLmlzRXZlbigpKSB7XHJcbiAgICAgICAgICAgICAgICB6ID0gbmV3IEJhcnJldHQobSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB6ID0gbmV3IE1vbnRnb21lcnkobSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcHJlY29tcHV0YXRpb25cclxuICAgICAgICAgICAgdmFyIGcgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG4gPSAzO1xyXG4gICAgICAgICAgICB2YXIgazEgPSBrIC0gMTtcclxuICAgICAgICAgICAgdmFyIGttID0gKDEgPDwgaykgLSAxO1xyXG4gICAgICAgICAgICBnWzFdID0gei5jb252ZXJ0KHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBnMiA9IG5iaSgpO1xyXG4gICAgICAgICAgICAgICAgei5zcXJUbyhnWzFdLCBnMik7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobiA8PSBrbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdbbl0gPSBuYmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB6Lm11bFRvKGcyLCBnW24gLSAyXSwgZ1tuXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbiArPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBqID0gZS50IC0gMTtcclxuICAgICAgICAgICAgdmFyIHc7XHJcbiAgICAgICAgICAgIHZhciBpczEgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBuYmkoKTtcclxuICAgICAgICAgICAgdmFyIHQ7XHJcbiAgICAgICAgICAgIGkgPSBuYml0cyhlW2pdKSAtIDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChqID49IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IGsxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdyA9IChlW2pdID4+IChpIC0gazEpKSAmIGttO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdyA9IChlW2pdICYgKCgxIDw8IChpICsgMSkpIC0gMSkpIDw8IChrMSAtIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3IHw9IGVbaiAtIDFdID4+ICh0aGlzLkRCICsgaSAtIGsxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuID0gaztcclxuICAgICAgICAgICAgICAgIHdoaWxlICgodyAmIDEpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB3ID4+PSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC0tbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgoaSAtPSBuKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpICs9IHRoaXMuREI7XHJcbiAgICAgICAgICAgICAgICAgICAgLS1qO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzMSkgeyAvLyByZXQgPT0gMSwgZG9uJ3QgYm90aGVyIHNxdWFyaW5nIG9yIG11bHRpcGx5aW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgZ1t3XS5jb3B5VG8ocik7XHJcbiAgICAgICAgICAgICAgICAgICAgaXMxID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobiA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgei5zcXJUbyhyLCByMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHouc3FyVG8ocjIsIHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuIC09IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6LnNxclRvKHIsIHIyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByID0gcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIyID0gdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgei5tdWxUbyhyMiwgZ1t3XSwgcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaiA+PSAwICYmIChlW2pdICYgKDEgPDwgaSkpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB6LnNxclRvKHIsIHIyKTtcclxuICAgICAgICAgICAgICAgICAgICB0ID0gcjtcclxuICAgICAgICAgICAgICAgICAgICByID0gcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgcjIgPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgtLWkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSB0aGlzLkRCIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLS1qO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gei5yZXZlcnQocik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnZlcnNlID0gYm5Nb2RJbnZlcnNlO1xyXG4gICAgICAgIC8vIChwdWJsaWMpIDEvdGhpcyAlIG0gKEhBQyAxNC42MSlcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnZlcnNlID0gZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICAgICAgdmFyIGFjID0gbS5pc0V2ZW4oKTtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmlzRXZlbigpICYmIGFjKSB8fCBtLnNpZ251bSgpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCaWdJbnRlZ2VyLlpFUk87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHUgPSBtLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICB2YXIgYSA9IG5idigxKTtcclxuICAgICAgICAgICAgdmFyIGIgPSBuYnYoMCk7XHJcbiAgICAgICAgICAgIHZhciBjID0gbmJ2KDApO1xyXG4gICAgICAgICAgICB2YXIgZCA9IG5idigxKTtcclxuICAgICAgICAgICAgd2hpbGUgKHUuc2lnbnVtKCkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHUuaXNFdmVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB1LnJTaGlmdFRvKDEsIHUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWEuaXNFdmVuKCkgfHwgIWIuaXNFdmVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuYWRkVG8odGhpcywgYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLnN1YlRvKG0sIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGEuclNoaWZ0VG8oMSwgYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFiLmlzRXZlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIuc3ViVG8obSwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGIuclNoaWZ0VG8oMSwgYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodi5pc0V2ZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuclNoaWZ0VG8oMSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYy5pc0V2ZW4oKSB8fCAhZC5pc0V2ZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5hZGRUbyh0aGlzLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuc3ViVG8obSwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYy5yU2hpZnRUbygxLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWQuaXNFdmVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC5zdWJUbyhtLCBkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZC5yU2hpZnRUbygxLCBkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh1LmNvbXBhcmVUbyh2KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdS5zdWJUbyh2LCB1KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYS5zdWJUbyhjLCBhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYi5zdWJUbyhkLCBiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuc3ViVG8odSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuc3ViVG8oYSwgYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGQuc3ViVG8oYiwgZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHYuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmlnSW50ZWdlci5aRVJPO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkLmNvbXBhcmVUbyhtKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdWJ0cmFjdChtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZC5zaWdudW0oKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGQuYWRkVG8obSwgZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZC5zaWdudW0oKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmFkZChtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5wb3cgPSBiblBvdztcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzXmVcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5wb3cgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHAoZSwgbmV3IE51bGxFeHAoKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nY2QgPSBibkdDRDtcclxuICAgICAgICAvLyAocHVibGljKSBnY2QodGhpcyxhKSAoSEFDIDE0LjU0KVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmdjZCA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKHRoaXMucyA8IDApID8gdGhpcy5uZWdhdGUoKSA6IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICAgICAgdmFyIHkgPSAoYS5zIDwgMCkgPyBhLm5lZ2F0ZSgpIDogYS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeC5jb21wYXJlVG8oeSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHg7XHJcbiAgICAgICAgICAgICAgICB4ID0geTtcclxuICAgICAgICAgICAgICAgIHkgPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpID0geC5nZXRMb3dlc3RTZXRCaXQoKTtcclxuICAgICAgICAgICAgdmFyIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xyXG4gICAgICAgICAgICBpZiAoZyA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpIDwgZykge1xyXG4gICAgICAgICAgICAgICAgZyA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB4LnJTaGlmdFRvKGcsIHgpO1xyXG4gICAgICAgICAgICAgICAgeS5yU2hpZnRUbyhnLCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoeC5zaWdudW0oKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHguclNoaWZ0VG8oaSwgeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKGkgPSB5LmdldExvd2VzdFNldEJpdCgpKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB5LnJTaGlmdFRvKGksIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHguY29tcGFyZVRvKHkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB4LnN1YlRvKHksIHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHguclNoaWZ0VG8oMSwgeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB5LnN1YlRvKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHkuclNoaWZ0VG8oMSwgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB5LmxTaGlmdFRvKGcsIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaXNQcm9iYWJsZVByaW1lID0gYm5Jc1Byb2JhYmxlUHJpbWU7XHJcbiAgICAgICAgLy8gKHB1YmxpYykgdGVzdCBwcmltYWxpdHkgd2l0aCBjZXJ0YWludHkgPj0gMS0uNV50XHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuaXNQcm9iYWJsZVByaW1lID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5hYnMoKTtcclxuICAgICAgICAgICAgaWYgKHgudCA9PSAxICYmIHhbMF0gPD0gbG93cHJpbWVzW2xvd3ByaW1lcy5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxvd3ByaW1lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4WzBdID09IGxvd3ByaW1lc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHguaXNFdmVuKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPCBsb3dwcmltZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IGxvd3ByaW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBqID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaiA8IGxvd3ByaW1lcy5sZW5ndGggJiYgbSA8IGxwbGltKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbSAqPSBsb3dwcmltZXNbaisrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG0gPSB4Lm1vZEludChtKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtICUgbG93cHJpbWVzW2krK10gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB4Lm1pbGxlclJhYmluKHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFBVQkxJQ1xyXG4gICAgICAgIC8vI3JlZ2lvbiBQUk9URUNURURcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb3B5VG8gPSBibnBDb3B5VG87XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgY29weSB0aGlzIHRvIHJcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHJbaV0gPSB0aGlzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIudCA9IHRoaXMudDtcclxuICAgICAgICAgICAgci5zID0gdGhpcy5zO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbUludCA9IGJucEZyb21JbnQ7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgc2V0IGZyb20gaW50ZWdlciB2YWx1ZSB4LCAtRFYgPD0geCA8IERWXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbUludCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucyA9ICh4IDwgMCkgPyAtMSA6IDA7XHJcbiAgICAgICAgICAgIGlmICh4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXSA9IHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoeCA8IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdID0geCArIHRoaXMuRFY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tU3RyaW5nID0gYm5wRnJvbVN0cmluZztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSBzZXQgZnJvbSBzdHJpbmcgYW5kIHJhZGl4XHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBrO1xyXG4gICAgICAgICAgICBpZiAoYiA9PSAxNikge1xyXG4gICAgICAgICAgICAgICAgayA9IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYiA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBrID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChiID09IDI1Nikge1xyXG4gICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAvKiBieXRlIGFycmF5ICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChiID09IDMyKSB7XHJcbiAgICAgICAgICAgICAgICBrID0gNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChiID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGsgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tUmFkaXgocywgYik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zID0gMDtcclxuICAgICAgICAgICAgdmFyIGkgPSBzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIG1pID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBzaCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSAoayA9PSA4KSA/ICgrc1tpXSkgJiAweGZmIDogaW50QXQocywgaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocy5jaGFyQXQoaSkgPT0gXCItXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1pID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2ggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdGhpcy50KytdID0geDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNoICsgayA+IHRoaXMuREIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3RoaXMudCAtIDFdIHw9ICh4ICYgKCgxIDw8ICh0aGlzLkRCIC0gc2gpKSAtIDEpKSA8PCBzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3RoaXMudCsrXSA9ICh4ID4+ICh0aGlzLkRCIC0gc2gpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdGhpcy50IC0gMV0gfD0geCA8PCBzaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNoICs9IGs7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2ggPj0gdGhpcy5EQikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoIC09IHRoaXMuREI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGsgPT0gOCAmJiAoKCtzWzBdKSAmIDB4ODApICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdGhpcy50IC0gMV0gfD0gKCgxIDw8ICh0aGlzLkRCIC0gc2gpKSAtIDEpIDw8IHNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcclxuICAgICAgICAgICAgaWYgKG1pKSB7XHJcbiAgICAgICAgICAgICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcywgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsYW1wID0gYm5wQ2xhbXA7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgY2xhbXAgb2ZmIGV4Y2VzcyBoaWdoIHdvcmRzXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2xhbXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5zICYgdGhpcy5ETTtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMudCA+IDAgJiYgdGhpc1t0aGlzLnQgLSAxXSA9PSBjKSB7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZGxTaGlmdFRvID0gYm5wRExTaGlmdFRvO1xyXG4gICAgICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG4qREJcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kbFNoaWZ0VG8gPSBmdW5jdGlvbiAobiwgcikge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHJbaSArIG5dID0gdGhpc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGkgPSBuIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHJbaV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIudCA9IHRoaXMudCArIG47XHJcbiAgICAgICAgICAgIHIucyA9IHRoaXMucztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRyU2hpZnRUbyA9IGJucERSU2hpZnRUbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA+PiBuKkRCXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZHJTaGlmdFRvID0gZnVuY3Rpb24gKG4sIHIpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IG47IGkgPCB0aGlzLnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgcltpIC0gbl0gPSB0aGlzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIudCA9IE1hdGgubWF4KHRoaXMudCAtIG4sIDApO1xyXG4gICAgICAgICAgICByLnMgPSB0aGlzLnM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5sU2hpZnRUbyA9IGJucExTaGlmdFRvO1xyXG4gICAgICAgIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG5cclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5sU2hpZnRUbyA9IGZ1bmN0aW9uIChuLCByKSB7XHJcbiAgICAgICAgICAgIHZhciBicyA9IG4gJSB0aGlzLkRCO1xyXG4gICAgICAgICAgICB2YXIgY2JzID0gdGhpcy5EQiAtIGJzO1xyXG4gICAgICAgICAgICB2YXIgYm0gPSAoMSA8PCBjYnMpIC0gMTtcclxuICAgICAgICAgICAgdmFyIGRzID0gTWF0aC5mbG9vcihuIC8gdGhpcy5EQik7XHJcbiAgICAgICAgICAgIHZhciBjID0gKHRoaXMucyA8PCBicykgJiB0aGlzLkRNO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHJbaSArIGRzICsgMV0gPSAodGhpc1tpXSA+PiBjYnMpIHwgYztcclxuICAgICAgICAgICAgICAgIGMgPSAodGhpc1tpXSAmIGJtKSA8PCBicztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZHMgLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgcltpXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcltkc10gPSBjO1xyXG4gICAgICAgICAgICByLnQgPSB0aGlzLnQgKyBkcyArIDE7XHJcbiAgICAgICAgICAgIHIucyA9IHRoaXMucztcclxuICAgICAgICAgICAgci5jbGFtcCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuclNoaWZ0VG8gPSBibnBSU2hpZnRUbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA+PiBuXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuclNoaWZ0VG8gPSBmdW5jdGlvbiAobiwgcikge1xyXG4gICAgICAgICAgICByLnMgPSB0aGlzLnM7XHJcbiAgICAgICAgICAgIHZhciBkcyA9IE1hdGguZmxvb3IobiAvIHRoaXMuREIpO1xyXG4gICAgICAgICAgICBpZiAoZHMgPj0gdGhpcy50KSB7XHJcbiAgICAgICAgICAgICAgICByLnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBicyA9IG4gJSB0aGlzLkRCO1xyXG4gICAgICAgICAgICB2YXIgY2JzID0gdGhpcy5EQiAtIGJzO1xyXG4gICAgICAgICAgICB2YXIgYm0gPSAoMSA8PCBicykgLSAxO1xyXG4gICAgICAgICAgICByWzBdID0gdGhpc1tkc10gPj4gYnM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkcyArIDE7IGkgPCB0aGlzLnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgcltpIC0gZHMgLSAxXSB8PSAodGhpc1tpXSAmIGJtKSA8PCBjYnM7XHJcbiAgICAgICAgICAgICAgICByW2kgLSBkc10gPSB0aGlzW2ldID4+IGJzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChicyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJbdGhpcy50IC0gZHMgLSAxXSB8PSAodGhpcy5zICYgYm0pIDw8IGNicztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLnQgPSB0aGlzLnQgLSBkcztcclxuICAgICAgICAgICAgci5jbGFtcCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc3ViVG8gPSBibnBTdWJUbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyAtIGFcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zdWJUbyA9IGZ1bmN0aW9uIChhLCByKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgdmFyIGMgPSAwO1xyXG4gICAgICAgICAgICB2YXIgbSA9IE1hdGgubWluKGEudCwgdGhpcy50KTtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPCBtKSB7XHJcbiAgICAgICAgICAgICAgICBjICs9IHRoaXNbaV0gLSBhW2ldO1xyXG4gICAgICAgICAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XHJcbiAgICAgICAgICAgICAgICBjID4+PSB0aGlzLkRCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhLnQgPCB0aGlzLnQpIHtcclxuICAgICAgICAgICAgICAgIGMgLT0gYS5zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjICs9IHRoaXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XHJcbiAgICAgICAgICAgICAgICAgICAgYyA+Pj0gdGhpcy5EQjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGMgKz0gdGhpcy5zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYyArPSB0aGlzLnM7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGEudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGMgLT0gYVtpXTtcclxuICAgICAgICAgICAgICAgICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcclxuICAgICAgICAgICAgICAgICAgICBjID4+PSB0aGlzLkRCO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYyAtPSBhLnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci5zID0gKGMgPCAwKSA/IC0xIDogMDtcclxuICAgICAgICAgICAgaWYgKGMgPCAtMSkge1xyXG4gICAgICAgICAgICAgICAgcltpKytdID0gdGhpcy5EViArIGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJbaSsrXSA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci50ID0gaTtcclxuICAgICAgICAgICAgci5jbGFtcCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlUbyA9IGJucE11bHRpcGx5VG87XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgKiBhLCByICE9IHRoaXMsYSAoSEFDIDE0LjEyKVxyXG4gICAgICAgIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseVRvID0gZnVuY3Rpb24gKGEsIHIpIHtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLmFicygpO1xyXG4gICAgICAgICAgICB2YXIgeSA9IGEuYWJzKCk7XHJcbiAgICAgICAgICAgIHZhciBpID0geC50O1xyXG4gICAgICAgICAgICByLnQgPSBpICsgeS50O1xyXG4gICAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJbaV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB5LnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgcltpICsgeC50XSA9IHguYW0oMCwgeVtpXSwgciwgaSwgMCwgeC50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLnMgPSAwO1xyXG4gICAgICAgICAgICByLmNsYW1wKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnMgIT0gYS5zKSB7XHJcbiAgICAgICAgICAgICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8ociwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZVRvID0gYm5wU3F1YXJlVG87XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXNeMiwgciAhPSB0aGlzIChIQUMgMTQuMTYpXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuc3F1YXJlVG8gPSBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuYWJzKCk7XHJcbiAgICAgICAgICAgIHZhciBpID0gci50ID0gMiAqIHgudDtcclxuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByW2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgeC50IC0gMTsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHguYW0oaSwgeFtpXSwgciwgMiAqIGksIDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKChyW2kgKyB4LnRdICs9IHguYW0oaSArIDEsIDIgKiB4W2ldLCByLCAyICogaSArIDEsIGMsIHgudCAtIGkgLSAxKSkgPj0geC5EVikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJbaSArIHgudF0gLT0geC5EVjtcclxuICAgICAgICAgICAgICAgICAgICByW2kgKyB4LnQgKyAxXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHIudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJbci50IC0gMV0gKz0geC5hbShpLCB4W2ldLCByLCAyICogaSwgMCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci5zID0gMDtcclxuICAgICAgICAgICAgci5jbGFtcCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZGl2UmVtVG8gPSBibnBEaXZSZW1UbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSBkaXZpZGUgdGhpcyBieSBtLCBxdW90aWVudCBhbmQgcmVtYWluZGVyIHRvIHEsIHIgKEhBQyAxNC4yMClcclxuICAgICAgICAvLyByICE9IHEsIHRoaXMgIT0gbS4gIHEgb3IgciBtYXkgYmUgbnVsbC5cclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZSZW1UbyA9IGZ1bmN0aW9uIChtLCBxLCByKSB7XHJcbiAgICAgICAgICAgIHZhciBwbSA9IG0uYWJzKCk7XHJcbiAgICAgICAgICAgIGlmIChwbS50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHQgPSB0aGlzLmFicygpO1xyXG4gICAgICAgICAgICBpZiAocHQudCA8IHBtLnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChxICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBxLmZyb21JbnQoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAociAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5VG8ocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB5ID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHZhciB0cyA9IHRoaXMucztcclxuICAgICAgICAgICAgdmFyIG1zID0gbS5zO1xyXG4gICAgICAgICAgICB2YXIgbnNoID0gdGhpcy5EQiAtIG5iaXRzKHBtW3BtLnQgLSAxXSk7IC8vIG5vcm1hbGl6ZSBtb2R1bHVzXHJcbiAgICAgICAgICAgIGlmIChuc2ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwbS5sU2hpZnRUbyhuc2gsIHkpO1xyXG4gICAgICAgICAgICAgICAgcHQubFNoaWZ0VG8obnNoLCByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBtLmNvcHlUbyh5KTtcclxuICAgICAgICAgICAgICAgIHB0LmNvcHlUbyhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgeXMgPSB5LnQ7XHJcbiAgICAgICAgICAgIHZhciB5MCA9IHlbeXMgLSAxXTtcclxuICAgICAgICAgICAgaWYgKHkwID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgeXQgPSB5MCAqICgxIDw8IHRoaXMuRjEpICsgKCh5cyA+IDEpID8geVt5cyAtIDJdID4+IHRoaXMuRjIgOiAwKTtcclxuICAgICAgICAgICAgdmFyIGQxID0gdGhpcy5GViAvIHl0O1xyXG4gICAgICAgICAgICB2YXIgZDIgPSAoMSA8PCB0aGlzLkYxKSAvIHl0O1xyXG4gICAgICAgICAgICB2YXIgZSA9IDEgPDwgdGhpcy5GMjtcclxuICAgICAgICAgICAgdmFyIGkgPSByLnQ7XHJcbiAgICAgICAgICAgIHZhciBqID0gaSAtIHlzO1xyXG4gICAgICAgICAgICB2YXIgdCA9IChxID09IG51bGwpID8gbmJpKCkgOiBxO1xyXG4gICAgICAgICAgICB5LmRsU2hpZnRUbyhqLCB0KTtcclxuICAgICAgICAgICAgaWYgKHIuY29tcGFyZVRvKHQpID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJbci50KytdID0gMTtcclxuICAgICAgICAgICAgICAgIHIuc3ViVG8odCwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKHlzLCB0KTtcclxuICAgICAgICAgICAgdC5zdWJUbyh5LCB5KTsgLy8gXCJuZWdhdGl2ZVwiIHkgc28gd2UgY2FuIHJlcGxhY2Ugc3ViIHdpdGggYW0gbGF0ZXJcclxuICAgICAgICAgICAgd2hpbGUgKHkudCA8IHlzKSB7XHJcbiAgICAgICAgICAgICAgICB5W3kudCsrXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKC0taiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFc3RpbWF0ZSBxdW90aWVudCBkaWdpdFxyXG4gICAgICAgICAgICAgICAgdmFyIHFkID0gKHJbLS1pXSA9PSB5MCkgPyB0aGlzLkRNIDogTWF0aC5mbG9vcihyW2ldICogZDEgKyAocltpIC0gMV0gKyBlKSAqIGQyKTtcclxuICAgICAgICAgICAgICAgIGlmICgocltpXSArPSB5LmFtKDAsIHFkLCByLCBqLCAwLCB5cykpIDwgcWQpIHsgLy8gVHJ5IGl0IG91dFxyXG4gICAgICAgICAgICAgICAgICAgIHkuZGxTaGlmdFRvKGosIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHIuc3ViVG8odCwgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHJbaV0gPCAtLXFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuc3ViVG8odCwgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChxICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHIuZHJTaGlmdFRvKHlzLCBxKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cyAhPSBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyhxLCBxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLnQgPSB5cztcclxuICAgICAgICAgICAgci5jbGFtcCgpO1xyXG4gICAgICAgICAgICBpZiAobnNoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgci5yU2hpZnRUbyhuc2gsIHIpO1xyXG4gICAgICAgICAgICB9IC8vIERlbm9ybWFsaXplIHJlbWFpbmRlclxyXG4gICAgICAgICAgICBpZiAodHMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8ociwgcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmludkRpZ2l0ID0gYm5wSW52RGlnaXQ7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgcmV0dXJuIFwiLTEvdGhpcyAlIDJeREJcIjsgdXNlZnVsIGZvciBNb250LiByZWR1Y3Rpb25cclxuICAgICAgICAvLyBqdXN0aWZpY2F0aW9uOlxyXG4gICAgICAgIC8vICAgICAgICAgeHkgPT0gMSAobW9kIG0pXHJcbiAgICAgICAgLy8gICAgICAgICB4eSA9ICAxK2ttXHJcbiAgICAgICAgLy8gICB4eSgyLXh5KSA9ICgxK2ttKSgxLWttKVxyXG4gICAgICAgIC8vIHhbeSgyLXh5KV0gPSAxLWteMm1eMlxyXG4gICAgICAgIC8vIHhbeSgyLXh5KV0gPT0gMSAobW9kIG1eMilcclxuICAgICAgICAvLyBpZiB5IGlzIDEveCBtb2QgbSwgdGhlbiB5KDIteHkpIGlzIDEveCBtb2QgbV4yXHJcbiAgICAgICAgLy8gc2hvdWxkIHJlZHVjZSB4IGFuZCB5KDIteHkpIGJ5IG1eMiBhdCBlYWNoIHN0ZXAgdG8ga2VlcCBzaXplIGJvdW5kZWQuXHJcbiAgICAgICAgLy8gSlMgbXVsdGlwbHkgXCJvdmVyZmxvd3NcIiBkaWZmZXJlbnRseSBmcm9tIEMvQysrLCBzbyBjYXJlIGlzIG5lZWRlZCBoZXJlLlxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmludkRpZ2l0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50IDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzWzBdO1xyXG4gICAgICAgICAgICBpZiAoKHggJiAxKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgeSA9IHggJiAzOyAvLyB5ID09IDEveCBtb2QgMl4yXHJcbiAgICAgICAgICAgIHkgPSAoeSAqICgyIC0gKHggJiAweGYpICogeSkpICYgMHhmOyAvLyB5ID09IDEveCBtb2QgMl40XHJcbiAgICAgICAgICAgIHkgPSAoeSAqICgyIC0gKHggJiAweGZmKSAqIHkpKSAmIDB4ZmY7IC8vIHkgPT0gMS94IG1vZCAyXjhcclxuICAgICAgICAgICAgeSA9ICh5ICogKDIgLSAoKCh4ICYgMHhmZmZmKSAqIHkpICYgMHhmZmZmKSkpICYgMHhmZmZmOyAvLyB5ID09IDEveCBtb2QgMl4xNlxyXG4gICAgICAgICAgICAvLyBsYXN0IHN0ZXAgLSBjYWxjdWxhdGUgaW52ZXJzZSBtb2QgRFYgZGlyZWN0bHk7XHJcbiAgICAgICAgICAgIC8vIGFzc3VtZXMgMTYgPCBEQiA8PSAzMiBhbmQgYXNzdW1lcyBhYmlsaXR5IHRvIGhhbmRsZSA0OC1iaXQgaW50c1xyXG4gICAgICAgICAgICB5ID0gKHkgKiAoMiAtIHggKiB5ICUgdGhpcy5EVikpICUgdGhpcy5EVjsgLy8geSA9PSAxL3ggbW9kIDJeZGJpdHNcclxuICAgICAgICAgICAgLy8gd2UgcmVhbGx5IHdhbnQgdGhlIG5lZ2F0aXZlIGludmVyc2UsIGFuZCAtRFYgPCB5IDwgRFZcclxuICAgICAgICAgICAgcmV0dXJuICh5ID4gMCkgPyB0aGlzLkRWIC0geSA6IC15O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaXNFdmVuID0gYm5wSXNFdmVuO1xyXG4gICAgICAgIC8vIChwcm90ZWN0ZWQpIHRydWUgaWZmIHRoaXMgaXMgZXZlblxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmlzRXZlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgodGhpcy50ID4gMCkgPyAodGhpc1swXSAmIDEpIDogdGhpcy5zKSA9PSAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZXhwID0gYm5wRXhwO1xyXG4gICAgICAgIC8vIChwcm90ZWN0ZWQpIHRoaXNeZSwgZSA8IDJeMzIsIGRvaW5nIHNxciBhbmQgbXVsIHdpdGggXCJyXCIgKEhBQyAxNC43OSlcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5leHAgPSBmdW5jdGlvbiAoZSwgeikge1xyXG4gICAgICAgICAgICBpZiAoZSA+IDB4ZmZmZmZmZmYgfHwgZSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCaWdJbnRlZ2VyLk9ORTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBuYmkoKTtcclxuICAgICAgICAgICAgdmFyIGcgPSB6LmNvbnZlcnQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBpID0gbmJpdHMoZSkgLSAxO1xyXG4gICAgICAgICAgICBnLmNvcHlUbyhyKTtcclxuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB6LnNxclRvKHIsIHIyKTtcclxuICAgICAgICAgICAgICAgIGlmICgoZSAmICgxIDw8IGkpKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB6Lm11bFRvKHIyLCBnLCByKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcjtcclxuICAgICAgICAgICAgICAgICAgICByID0gcjI7XHJcbiAgICAgICAgICAgICAgICAgICAgcjIgPSB0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB6LnJldmVydChyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNodW5rU2l6ZSA9IGJucENodW5rU2l6ZTtcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByZXR1cm4geCBzLnQuIHJeeCA8IERWXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2h1bmtTaXplID0gZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5MTjIgKiB0aGlzLkRCIC8gTWF0aC5sb2cocikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUudG9SYWRpeCA9IGJucFRvUmFkaXg7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgY29udmVydCB0byByYWRpeCBzdHJpbmdcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1JhZGl4ID0gZnVuY3Rpb24gKGIpIHtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYiA9IDEwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNpZ251bSgpID09IDAgfHwgYiA8IDIgfHwgYiA+IDM2KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNzID0gdGhpcy5jaHVua1NpemUoYik7XHJcbiAgICAgICAgICAgIHZhciBhID0gTWF0aC5wb3coYiwgY3MpO1xyXG4gICAgICAgICAgICB2YXIgZCA9IG5idihhKTtcclxuICAgICAgICAgICAgdmFyIHkgPSBuYmkoKTtcclxuICAgICAgICAgICAgdmFyIHogPSBuYmkoKTtcclxuICAgICAgICAgICAgdmFyIHIgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmRpdlJlbVRvKGQsIHksIHopO1xyXG4gICAgICAgICAgICB3aGlsZSAoeS5zaWdudW0oKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHIgPSAoYSArIHouaW50VmFsdWUoKSkudG9TdHJpbmcoYikuc3Vic3RyKDEpICsgcjtcclxuICAgICAgICAgICAgICAgIHkuZGl2UmVtVG8oZCwgeSwgeik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHouaW50VmFsdWUoKS50b1N0cmluZyhiKSArIHI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tUmFkaXggPSBibnBGcm9tUmFkaXg7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgY29udmVydCBmcm9tIHJhZGl4IHN0cmluZ1xyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21SYWRpeCA9IGZ1bmN0aW9uIChzLCBiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbUludCgwKTtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYiA9IDEwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjcyA9IHRoaXMuY2h1bmtTaXplKGIpO1xyXG4gICAgICAgICAgICB2YXIgZCA9IE1hdGgucG93KGIsIGNzKTtcclxuICAgICAgICAgICAgdmFyIG1pID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBqID0gMDtcclxuICAgICAgICAgICAgdmFyIHcgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gaW50QXQocywgaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocy5jaGFyQXQoaSkgPT0gXCItXCIgJiYgdGhpcy5zaWdudW0oKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3ID0gYiAqIHcgKyB4O1xyXG4gICAgICAgICAgICAgICAgaWYgKCsraiA+PSBjcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZE11bHRpcGx5KGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZEFkZE9mZnNldCh3LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZE11bHRpcGx5KE1hdGgucG93KGIsIGopKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZEFkZE9mZnNldCh3LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWkpIHtcclxuICAgICAgICAgICAgICAgIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyh0aGlzLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbU51bWJlciA9IGJucEZyb21OdW1iZXI7XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgYWx0ZXJuYXRlIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbU51bWJlciA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcbiAgICAgICAgICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiBiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXcgQmlnSW50ZWdlcihpbnQsaW50LFJORylcclxuICAgICAgICAgICAgICAgIGlmIChhIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbUludCgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbU51bWJlcihhLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGVzdEJpdChhIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yY2UgTVNCIHNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYSAtIDEpLCBvcF9vciwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXZlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZEFkZE9mZnNldCgxLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IC8vIGZvcmNlIG9kZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghdGhpcy5pc1Byb2JhYmxlUHJpbWUoYikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KDIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXRMZW5ndGgoKSA+IGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEgLSAxKSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXcgQmlnSW50ZWdlcihpbnQsUk5HKVxyXG4gICAgICAgICAgICAgICAgdmFyIHggPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gYSAmIDc7XHJcbiAgICAgICAgICAgICAgICB4Lmxlbmd0aCA9IChhID4+IDMpICsgMTtcclxuICAgICAgICAgICAgICAgIGIubmV4dEJ5dGVzKHgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeFswXSAmPSAoKDEgPDwgdCkgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHhbMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tU3RyaW5nKHgsIDI1Nik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdHdpc2VUbyA9IGJucEJpdHdpc2VUbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyBvcCBhIChiaXR3aXNlKVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdHdpc2VUbyA9IGZ1bmN0aW9uIChhLCBvcCwgcikge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgdmFyIGY7XHJcbiAgICAgICAgICAgIHZhciBtID0gTWF0aC5taW4oYS50LCB0aGlzLnQpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICByW2ldID0gb3AodGhpc1tpXSwgYVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEudCA8IHRoaXMudCkge1xyXG4gICAgICAgICAgICAgICAgZiA9IGEucyAmIHRoaXMuRE07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBtOyBpIDwgdGhpcy50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICByW2ldID0gb3AodGhpc1tpXSwgZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByLnQgPSB0aGlzLnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmID0gdGhpcy5zICYgdGhpcy5ETTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IG07IGkgPCBhLnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJbaV0gPSBvcChmLCBhW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHIudCA9IGEudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLnMgPSBvcCh0aGlzLnMsIGEucyk7XHJcbiAgICAgICAgICAgIHIuY2xhbXAoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNoYW5nZUJpdCA9IGJucENoYW5nZUJpdDtcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSB0aGlzIG9wICgxPDxuKVxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmNoYW5nZUJpdCA9IGZ1bmN0aW9uIChuLCBvcCkge1xyXG4gICAgICAgICAgICB2YXIgciA9IEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChuKTtcclxuICAgICAgICAgICAgdGhpcy5iaXR3aXNlVG8ociwgb3AsIHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFkZFRvID0gYm5wQWRkVG87XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgKyBhXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkVG8gPSBmdW5jdGlvbiAoYSwgcikge1xyXG4gICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBjID0gMDtcclxuICAgICAgICAgICAgdmFyIG0gPSBNYXRoLm1pbihhLnQsIHRoaXMudCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpIDwgbSkge1xyXG4gICAgICAgICAgICAgICAgYyArPSB0aGlzW2ldICsgYVtpXTtcclxuICAgICAgICAgICAgICAgIHJbaSsrXSA9IGMgJiB0aGlzLkRNO1xyXG4gICAgICAgICAgICAgICAgYyA+Pj0gdGhpcy5EQjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYS50IDwgdGhpcy50KSB7XHJcbiAgICAgICAgICAgICAgICBjICs9IGEucztcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyArPSB0aGlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJbaSsrXSA9IGMgJiB0aGlzLkRNO1xyXG4gICAgICAgICAgICAgICAgICAgIGMgPj49IHRoaXMuREI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjICs9IHRoaXMucztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGMgKz0gdGhpcy5zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBhLnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjICs9IGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XHJcbiAgICAgICAgICAgICAgICAgICAgYyA+Pj0gdGhpcy5EQjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGMgKz0gYS5zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIucyA9IChjIDwgMCkgPyAtMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChjID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcltpKytdID0gYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjIDwgLTEpIHtcclxuICAgICAgICAgICAgICAgIHJbaSsrXSA9IHRoaXMuRFYgKyBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIudCA9IGk7XHJcbiAgICAgICAgICAgIHIuY2xhbXAoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRNdWx0aXBseSA9IGJucERNdWx0aXBseTtcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSB0aGlzICo9IG4sIHRoaXMgPj0gMCwgMSA8IG4gPCBEVlxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmRNdWx0aXBseSA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIHRoaXNbdGhpcy50XSA9IHRoaXMuYW0oMCwgbiAtIDEsIHRoaXMsIDAsIDAsIHRoaXMudCk7XHJcbiAgICAgICAgICAgICsrdGhpcy50O1xyXG4gICAgICAgICAgICB0aGlzLmNsYW1wKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kQWRkT2Zmc2V0ID0gYm5wREFkZE9mZnNldDtcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSB0aGlzICs9IG4gPDwgdyB3b3JkcywgdGhpcyA+PSAwXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuZEFkZE9mZnNldCA9IGZ1bmN0aW9uIChuLCB3KSB7XHJcbiAgICAgICAgICAgIGlmIChuID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy50IDw9IHcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbdGhpcy50KytdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzW3ddICs9IG47XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzW3ddID49IHRoaXMuRFYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbd10gLT0gdGhpcy5EVjtcclxuICAgICAgICAgICAgICAgIGlmICgrK3cgPj0gdGhpcy50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t0aGlzLnQrK10gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKyt0aGlzW3ddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseUxvd2VyVG8gPSBibnBNdWx0aXBseUxvd2VyVG87XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgciA9IGxvd2VyIG4gd29yZHMgb2YgXCJ0aGlzICogYVwiLCBhLnQgPD0gblxyXG4gICAgICAgIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseUxvd2VyVG8gPSBmdW5jdGlvbiAoYSwgbiwgcikge1xyXG4gICAgICAgICAgICB2YXIgaSA9IE1hdGgubWluKHRoaXMudCArIGEudCwgbik7XHJcbiAgICAgICAgICAgIHIucyA9IDA7IC8vIGFzc3VtZXMgYSx0aGlzID49IDBcclxuICAgICAgICAgICAgci50ID0gaTtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByWy0taV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSByLnQgLSB0aGlzLnQ7IGkgPCBqOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHJbaSArIHRoaXMudF0gPSB0aGlzLmFtKDAsIGFbaV0sIHIsIGksIDAsIHRoaXMudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWluKGEudCwgbik7IGkgPCBqOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW0oMCwgYVtpXSwgciwgaSwgMCwgbiAtIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIuY2xhbXAoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VXBwZXJUbyA9IGJucE11bHRpcGx5VXBwZXJUbztcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSByID0gXCJ0aGlzICogYVwiIHdpdGhvdXQgbG93ZXIgbiB3b3JkcywgbiA+IDBcclxuICAgICAgICAvLyBcInRoaXNcIiBzaG91bGQgYmUgdGhlIGxhcmdlciBvbmUgaWYgYXBwcm9wcmlhdGUuXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlVcHBlclRvID0gZnVuY3Rpb24gKGEsIG4sIHIpIHtcclxuICAgICAgICAgICAgLS1uO1xyXG4gICAgICAgICAgICB2YXIgaSA9IHIudCA9IHRoaXMudCArIGEudCAtIG47XHJcbiAgICAgICAgICAgIHIucyA9IDA7IC8vIGFzc3VtZXMgYSx0aGlzID49IDBcclxuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByW2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGkgPSBNYXRoLm1heChuIC0gdGhpcy50LCAwKTsgaSA8IGEudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICByW3RoaXMudCArIGkgLSBuXSA9IHRoaXMuYW0obiAtIGksIGFbaV0sIHIsIDAsIDAsIHRoaXMudCArIGkgLSBuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLmNsYW1wKCk7XHJcbiAgICAgICAgICAgIHIuZHJTaGlmdFRvKDEsIHIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kSW50ID0gYm5wTW9kSW50O1xyXG4gICAgICAgIC8vIChwcm90ZWN0ZWQpIHRoaXMgJSBuLCBuIDwgMl4yNlxyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZEludCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgIGlmIChuIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkID0gdGhpcy5EViAlIG47XHJcbiAgICAgICAgICAgIHZhciByID0gKHRoaXMucyA8IDApID8gbiAtIDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIgPSB0aGlzWzBdICUgbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnQgLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByID0gKGQgKiByICsgdGhpc1tpXSkgJSBuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm1pbGxlclJhYmluID0gYm5wTWlsbGVyUmFiaW47XHJcbiAgICAgICAgLy8gKHByb3RlY3RlZCkgdHJ1ZSBpZiBwcm9iYWJseSBwcmltZSAoSEFDIDQuMjQsIE1pbGxlci1SYWJpbilcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5taWxsZXJSYWJpbiA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHZhciBuMSA9IHRoaXMuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xyXG4gICAgICAgICAgICB2YXIgayA9IG4xLmdldExvd2VzdFNldEJpdCgpO1xyXG4gICAgICAgICAgICBpZiAoayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHIgPSBuMS5zaGlmdFJpZ2h0KGspO1xyXG4gICAgICAgICAgICB0ID0gKHQgKyAxKSA+PiAxO1xyXG4gICAgICAgICAgICBpZiAodCA+IGxvd3ByaW1lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBsb3dwcmltZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhID0gbmJpKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQaWNrIGJhc2VzIGF0IHJhbmRvbSwgaW5zdGVhZCBvZiBzdGFydGluZyBhdCAyXHJcbiAgICAgICAgICAgICAgICBhLmZyb21JbnQobG93cHJpbWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxvd3ByaW1lcy5sZW5ndGgpXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGEubW9kUG93KHIsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHkuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSAhPSAwICYmIHkuY29tcGFyZVRvKG4xKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqKysgPCBrICYmIHkuY29tcGFyZVRvKG4xKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB5Lm1vZFBvd0ludCgyLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkuY29tcGFyZVRvKG4xKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmUgPSBiblNxdWFyZTtcclxuICAgICAgICAvLyAocHVibGljKSB0aGlzXjJcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlVG8ocik7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8jcmVnaW9uIEFTWU5DXHJcbiAgICAgICAgLy8gUHVibGljIEFQSSBtZXRob2RcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nY2RhID0gZnVuY3Rpb24gKGEsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKHRoaXMucyA8IDApID8gdGhpcy5uZWdhdGUoKSA6IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICAgICAgdmFyIHkgPSAoYS5zIDwgMCkgPyBhLm5lZ2F0ZSgpIDogYS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeC5jb21wYXJlVG8oeSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHg7XHJcbiAgICAgICAgICAgICAgICB4ID0geTtcclxuICAgICAgICAgICAgICAgIHkgPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpID0geC5nZXRMb3dlc3RTZXRCaXQoKTtcclxuICAgICAgICAgICAgdmFyIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xyXG4gICAgICAgICAgICBpZiAoZyA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpIDwgZykge1xyXG4gICAgICAgICAgICAgICAgZyA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB4LnJTaGlmdFRvKGcsIHgpO1xyXG4gICAgICAgICAgICAgICAgeS5yU2hpZnRUbyhnLCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBXb3JraG9yc2Ugb2YgdGhlIGFsZ29yaXRobSwgZ2V0cyBjYWxsZWQgMjAwIC0gODAwIHRpbWVzIHBlciA1MTIgYml0IGtleWdlbi5cclxuICAgICAgICAgICAgdmFyIGdjZGExID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChpID0geC5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5yU2hpZnRUbyhpLCB4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgoaSA9IHkuZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkuclNoaWZ0VG8oaSwgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeC5jb21wYXJlVG8oeSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHguc3ViVG8oeSwgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5yU2hpZnRUbygxLCB4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHkuc3ViVG8oeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgeS5yU2hpZnRUbygxLCB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghKHguc2lnbnVtKCkgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5LmxTaGlmdFRvKGcsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgY2FsbGJhY2soeSk7IH0sIDApOyAvLyBlc2NhcGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZ2NkYTEsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGdjZGExLCAxMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyAocHJvdGVjdGVkKSBhbHRlcm5hdGUgY29uc3RydWN0b3JcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tTnVtYmVyQXN5bmMgPSBmdW5jdGlvbiAoYSwgYiwgYywgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgaWYgKFwibnVtYmVyXCIgPT0gdHlwZW9mIGIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbUludCgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbU51bWJlcihhLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGVzdEJpdChhIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXR3aXNlVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEgLSAxKSwgb3Bfb3IsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V2ZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRBZGRPZmZzZXQoMSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBibnBfMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJucGZuMV8xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibnBfMS5kQWRkT2Zmc2V0KDIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm5wXzEuYml0TGVuZ3RoKCkgPiBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibnBfMS5zdWJUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYSAtIDEpLCBibnBfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJucF8xLmlzUHJvYmFibGVQcmltZShiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKCk7IH0sIDApOyAvLyBlc2NhcGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYm5wZm4xXzEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJucGZuMV8xLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGEgJiA3O1xyXG4gICAgICAgICAgICAgICAgeC5sZW5ndGggPSAoYSA+PiAzKSArIDE7XHJcbiAgICAgICAgICAgICAgICBiLm5leHRCeXRlcyh4KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhbMF0gJj0gKCgxIDw8IHQpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB4WzBdID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbVN0cmluZyh4LCAyNTYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gQmlnSW50ZWdlcjtcclxuICAgIH0oKSk7XHJcbiAgICAvLyNyZWdpb24gUkVEVUNFUlNcclxuICAgIC8vI3JlZ2lvbiBOdWxsRXhwXHJcbiAgICB2YXIgTnVsbEV4cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBOdWxsRXhwKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOdWxsRXhwLnByb3RvdHlwZS5jb252ZXJ0ID0gbk5vcDtcclxuICAgICAgICBOdWxsRXhwLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBOdWxsRXhwLnByb3RvdHlwZS5yZXZlcnQgPSBuTm9wO1xyXG4gICAgICAgIE51bGxFeHAucHJvdG90eXBlLnJldmVydCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBuTXVsVG87XHJcbiAgICAgICAgTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiAoeCwgeSwgcikge1xyXG4gICAgICAgICAgICB4Lm11bHRpcGx5VG8oeSwgcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBOdWxsRXhwLnByb3RvdHlwZS5zcXJUbyA9IG5TcXJUbztcclxuICAgICAgICBOdWxsRXhwLnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XHJcbiAgICAgICAgICAgIHguc3F1YXJlVG8ocik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gTnVsbEV4cDtcclxuICAgIH0oKSk7XHJcbiAgICAvLyBNb2R1bGFyIHJlZHVjdGlvbiB1c2luZyBcImNsYXNzaWNcIiBhbGdvcml0aG1cclxuICAgIHZhciBDbGFzc2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIENsYXNzaWMobSkge1xyXG4gICAgICAgICAgICB0aGlzLm0gPSBtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDbGFzc2ljLnByb3RvdHlwZS5jb252ZXJ0ID0gY0NvbnZlcnQ7XHJcbiAgICAgICAgQ2xhc3NpYy5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIGlmICh4LnMgPCAwIHx8IHguY29tcGFyZVRvKHRoaXMubSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgubW9kKHRoaXMubSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQ2xhc3NpYy5wcm90b3R5cGUucmV2ZXJ0ID0gY1JldmVydDtcclxuICAgICAgICBDbGFzc2ljLnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIENsYXNzaWMucHJvdG90eXBlLnJlZHVjZSA9IGNSZWR1Y2U7XHJcbiAgICAgICAgQ2xhc3NpYy5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgeC5kaXZSZW1Ubyh0aGlzLm0sIG51bGwsIHgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQ2xhc3NpYy5wcm90b3R5cGUubXVsVG8gPSBjTXVsVG87XHJcbiAgICAgICAgQ2xhc3NpYy5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiAoeCwgeSwgcikge1xyXG4gICAgICAgICAgICB4Lm11bHRpcGx5VG8oeSwgcik7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlKHIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQ2xhc3NpYy5wcm90b3R5cGUuc3FyVG8gPSBjU3FyVG87XHJcbiAgICAgICAgQ2xhc3NpYy5wcm90b3R5cGUuc3FyVG8gPSBmdW5jdGlvbiAoeCwgcikge1xyXG4gICAgICAgICAgICB4LnNxdWFyZVRvKHIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZHVjZShyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBDbGFzc2ljO1xyXG4gICAgfSgpKTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jcmVnaW9uIE1vbnRnb21lcnlcclxuICAgIC8vIE1vbnRnb21lcnkgcmVkdWN0aW9uXHJcbiAgICB2YXIgTW9udGdvbWVyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBNb250Z29tZXJ5KG0pIHtcclxuICAgICAgICAgICAgdGhpcy5tID0gbTtcclxuICAgICAgICAgICAgdGhpcy5tcCA9IG0uaW52RGlnaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5tcGwgPSB0aGlzLm1wICYgMHg3ZmZmO1xyXG4gICAgICAgICAgICB0aGlzLm1waCA9IHRoaXMubXAgPj4gMTU7XHJcbiAgICAgICAgICAgIHRoaXMudW0gPSAoMSA8PCAobS5EQiAtIDE1KSkgLSAxO1xyXG4gICAgICAgICAgICB0aGlzLm10MiA9IDIgKiBtLnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1vbnRnb21lcnkucHJvdG90eXBlLmNvbnZlcnQgPSBtb250Q29udmVydDtcclxuICAgICAgICAvLyB4UiBtb2QgbVxyXG4gICAgICAgIE1vbnRnb21lcnkucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICB4LmFicygpLmRsU2hpZnRUbyh0aGlzLm0udCwgcik7XHJcbiAgICAgICAgICAgIHIuZGl2UmVtVG8odGhpcy5tLCBudWxsLCByKTtcclxuICAgICAgICAgICAgaWYgKHgucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubS5zdWJUbyhyLCByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE1vbnRnb21lcnkucHJvdG90eXBlLnJldmVydCA9IG1vbnRSZXZlcnQ7XHJcbiAgICAgICAgLy8geC9SIG1vZCBtXHJcbiAgICAgICAgTW9udGdvbWVyeS5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuYmkoKTtcclxuICAgICAgICAgICAgeC5jb3B5VG8ocik7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlKHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE1vbnRnb21lcnkucHJvdG90eXBlLnJlZHVjZSA9IG1vbnRSZWR1Y2U7XHJcbiAgICAgICAgLy8geCA9IHgvUiBtb2QgbSAoSEFDIDE0LjMyKVxyXG4gICAgICAgIE1vbnRnb21lcnkucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHdoaWxlICh4LnQgPD0gdGhpcy5tdDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHBhZCB4IHNvIGFtIGhhcyBlbm91Z2ggcm9vbSBsYXRlclxyXG4gICAgICAgICAgICAgICAgeFt4LnQrK10gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tLnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZmFzdGVyIHdheSBvZiBjYWxjdWxhdGluZyB1MCA9IHhbaV0qbXAgbW9kIERWXHJcbiAgICAgICAgICAgICAgICB2YXIgaiA9IHhbaV0gJiAweDdmZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgdTAgPSAoaiAqIHRoaXMubXBsICsgKCgoaiAqIHRoaXMubXBoICsgKHhbaV0gPj4gMTUpICogdGhpcy5tcGwpICYgdGhpcy51bSkgPDwgMTUpKSAmIHguRE07XHJcbiAgICAgICAgICAgICAgICAvLyB1c2UgYW0gdG8gY29tYmluZSB0aGUgbXVsdGlwbHktc2hpZnQtYWRkIGludG8gb25lIGNhbGxcclxuICAgICAgICAgICAgICAgIGogPSBpICsgdGhpcy5tLnQ7XHJcbiAgICAgICAgICAgICAgICB4W2pdICs9IHRoaXMubS5hbSgwLCB1MCwgeCwgaSwgMCwgdGhpcy5tLnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gcHJvcGFnYXRlIGNhcnJ5XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoeFtqXSA+PSB4LkRWKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeFtqXSAtPSB4LkRWO1xyXG4gICAgICAgICAgICAgICAgICAgIHhbKytqXSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHguY2xhbXAoKTtcclxuICAgICAgICAgICAgeC5kclNoaWZ0VG8odGhpcy5tLnQsIHgpO1xyXG4gICAgICAgICAgICBpZiAoeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB4LnN1YlRvKHRoaXMubSwgeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE1vbnRnb21lcnkucHJvdG90eXBlLm11bFRvID0gbW9udE11bFRvO1xyXG4gICAgICAgIC8vIHIgPSBcInh5L1IgbW9kIG1cIjsgeCx5ICE9IHJcclxuICAgICAgICBNb250Z29tZXJ5LnByb3RvdHlwZS5tdWxUbyA9IGZ1bmN0aW9uICh4LCB5LCByKSB7XHJcbiAgICAgICAgICAgIHgubXVsdGlwbHlUbyh5LCByKTtcclxuICAgICAgICAgICAgdGhpcy5yZWR1Y2Uocik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5zcXJUbyA9IG1vbnRTcXJUbztcclxuICAgICAgICAvLyByID0gXCJ4XjIvUiBtb2QgbVwiOyB4ICE9IHJcclxuICAgICAgICBNb250Z29tZXJ5LnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XHJcbiAgICAgICAgICAgIHguc3F1YXJlVG8ocik7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlKHIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIE1vbnRnb21lcnk7XHJcbiAgICB9KCkpO1xyXG4gICAgLy8jZW5kcmVnaW9uIE1vbnRnb21lcnlcclxuICAgIC8vI3JlZ2lvbiBCYXJyZXR0XHJcbiAgICAvLyBCYXJyZXR0IG1vZHVsYXIgcmVkdWN0aW9uXHJcbiAgICB2YXIgQmFycmV0dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBCYXJyZXR0KG0pIHtcclxuICAgICAgICAgICAgdGhpcy5tID0gbTtcclxuICAgICAgICAgICAgLy8gc2V0dXAgQmFycmV0dFxyXG4gICAgICAgICAgICB0aGlzLnIyID0gbmJpKCk7XHJcbiAgICAgICAgICAgIHRoaXMucTMgPSBuYmkoKTtcclxuICAgICAgICAgICAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKDIgKiBtLnQsIHRoaXMucjIpO1xyXG4gICAgICAgICAgICB0aGlzLm11ID0gdGhpcy5yMi5kaXZpZGUobSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJhcnJldHQucHJvdG90eXBlLmNvbnZlcnQgPSBiYXJyZXR0Q29udmVydDtcclxuICAgICAgICBCYXJyZXR0LnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgaWYgKHgucyA8IDAgfHwgeC50ID4gMiAqIHRoaXMubS50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geC5tb2QodGhpcy5tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh4LmNvbXBhcmVUbyh0aGlzLm0pIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgICAgICAgICAgeC5jb3B5VG8ocik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHVjZShyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCYXJyZXR0LnByb3RvdHlwZS5yZXZlcnQgPSBiYXJyZXR0UmV2ZXJ0O1xyXG4gICAgICAgIEJhcnJldHQucHJvdG90eXBlLnJldmVydCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmFycmV0dC5wcm90b3R5cGUucmVkdWNlID0gYmFycmV0dFJlZHVjZTtcclxuICAgICAgICAvLyB4ID0geCBtb2QgbSAoSEFDIDE0LjQyKVxyXG4gICAgICAgIEJhcnJldHQucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHguZHJTaGlmdFRvKHRoaXMubS50IC0gMSwgdGhpcy5yMik7XHJcbiAgICAgICAgICAgIGlmICh4LnQgPiB0aGlzLm0udCArIDEpIHtcclxuICAgICAgICAgICAgICAgIHgudCA9IHRoaXMubS50ICsgMTtcclxuICAgICAgICAgICAgICAgIHguY2xhbXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm11Lm11bHRpcGx5VXBwZXJUbyh0aGlzLnIyLCB0aGlzLm0udCArIDEsIHRoaXMucTMpO1xyXG4gICAgICAgICAgICB0aGlzLm0ubXVsdGlwbHlMb3dlclRvKHRoaXMucTMsIHRoaXMubS50ICsgMSwgdGhpcy5yMik7XHJcbiAgICAgICAgICAgIHdoaWxlICh4LmNvbXBhcmVUbyh0aGlzLnIyKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHguZEFkZE9mZnNldCgxLCB0aGlzLm0udCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHguc3ViVG8odGhpcy5yMiwgeCk7XHJcbiAgICAgICAgICAgIHdoaWxlICh4LmNvbXBhcmVUbyh0aGlzLm0pID49IDApIHtcclxuICAgICAgICAgICAgICAgIHguc3ViVG8odGhpcy5tLCB4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQmFycmV0dC5wcm90b3R5cGUubXVsVG8gPSBiYXJyZXR0TXVsVG87XHJcbiAgICAgICAgLy8gciA9IHgqeSBtb2QgbTsgeCx5ICE9IHJcclxuICAgICAgICBCYXJyZXR0LnByb3RvdHlwZS5tdWxUbyA9IGZ1bmN0aW9uICh4LCB5LCByKSB7XHJcbiAgICAgICAgICAgIHgubXVsdGlwbHlUbyh5LCByKTtcclxuICAgICAgICAgICAgdGhpcy5yZWR1Y2Uocik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBCYXJyZXR0LnByb3RvdHlwZS5zcXJUbyA9IGJhcnJldHRTcXJUbztcclxuICAgICAgICAvLyByID0geF4yIG1vZCBtOyB4ICE9IHJcclxuICAgICAgICBCYXJyZXR0LnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XHJcbiAgICAgICAgICAgIHguc3F1YXJlVG8ocik7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlKHIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEJhcnJldHQ7XHJcbiAgICB9KCkpO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb24gUkVEVUNFUlNcclxuICAgIC8vIHJldHVybiBuZXcsIHVuc2V0IEJpZ0ludGVnZXJcclxuICAgIGZ1bmN0aW9uIG5iaSgpIHsgcmV0dXJuIG5ldyBCaWdJbnRlZ2VyKG51bGwpOyB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZUJpZ0ludChzdHIsIHIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ0ludGVnZXIoc3RyLCByKTtcclxuICAgIH1cclxuICAgIC8vIGFtOiBDb21wdXRlIHdfaiArPSAoeCp0aGlzX2kpLCBwcm9wYWdhdGUgY2FycmllcyxcclxuICAgIC8vIGMgaXMgaW5pdGlhbCBjYXJyeSwgcmV0dXJucyBmaW5hbCBjYXJyeS5cclxuICAgIC8vIGMgPCAzKmR2YWx1ZSwgeCA8IDIqZHZhbHVlLCB0aGlzX2kgPCBkdmFsdWVcclxuICAgIC8vIFdlIG5lZWQgdG8gc2VsZWN0IHRoZSBmYXN0ZXN0IG9uZSB0aGF0IHdvcmtzIGluIHRoaXMgZW52aXJvbm1lbnQuXHJcbiAgICAvLyBhbTE6IHVzZSBhIHNpbmdsZSBtdWx0IGFuZCBkaXZpZGUgdG8gZ2V0IHRoZSBoaWdoIGJpdHMsXHJcbiAgICAvLyBtYXggZGlnaXQgYml0cyBzaG91bGQgYmUgMjYgYmVjYXVzZVxyXG4gICAgLy8gbWF4IGludGVybmFsIHZhbHVlID0gMipkdmFsdWVeMi0yKmR2YWx1ZSAoPCAyXjUzKVxyXG4gICAgZnVuY3Rpb24gYW0xKGksIHgsIHcsIGosIGMsIG4pIHtcclxuICAgICAgICB3aGlsZSAoLS1uID49IDApIHtcclxuICAgICAgICAgICAgdmFyIHYgPSB4ICogdGhpc1tpKytdICsgd1tqXSArIGM7XHJcbiAgICAgICAgICAgIGMgPSBNYXRoLmZsb29yKHYgLyAweDQwMDAwMDApO1xyXG4gICAgICAgICAgICB3W2orK10gPSB2ICYgMHgzZmZmZmZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuICAgIC8vIGFtMiBhdm9pZHMgYSBiaWcgbXVsdC1hbmQtZXh0cmFjdCBjb21wbGV0ZWx5LlxyXG4gICAgLy8gTWF4IGRpZ2l0IGJpdHMgc2hvdWxkIGJlIDw9IDMwIGJlY2F1c2Ugd2UgZG8gYml0d2lzZSBvcHNcclxuICAgIC8vIG9uIHZhbHVlcyB1cCB0byAyKmhkdmFsdWVeMi1oZHZhbHVlLTEgKDwgMl4zMSlcclxuICAgIGZ1bmN0aW9uIGFtMihpLCB4LCB3LCBqLCBjLCBuKSB7XHJcbiAgICAgICAgdmFyIHhsID0geCAmIDB4N2ZmZjtcclxuICAgICAgICB2YXIgeGggPSB4ID4+IDE1O1xyXG4gICAgICAgIHdoaWxlICgtLW4gPj0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbCA9IHRoaXNbaV0gJiAweDdmZmY7XHJcbiAgICAgICAgICAgIHZhciBoID0gdGhpc1tpKytdID4+IDE1O1xyXG4gICAgICAgICAgICB2YXIgbSA9IHhoICogbCArIGggKiB4bDtcclxuICAgICAgICAgICAgbCA9IHhsICogbCArICgobSAmIDB4N2ZmZikgPDwgMTUpICsgd1tqXSArIChjICYgMHgzZmZmZmZmZik7XHJcbiAgICAgICAgICAgIGMgPSAobCA+Pj4gMzApICsgKG0gPj4+IDE1KSArIHhoICogaCArIChjID4+PiAzMCk7XHJcbiAgICAgICAgICAgIHdbaisrXSA9IGwgJiAweDNmZmZmZmZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuICAgIC8vIEFsdGVybmF0ZWx5LCBzZXQgbWF4IGRpZ2l0IGJpdHMgdG8gMjggc2luY2Ugc29tZVxyXG4gICAgLy8gYnJvd3NlcnMgc2xvdyBkb3duIHdoZW4gZGVhbGluZyB3aXRoIDMyLWJpdCBudW1iZXJzLlxyXG4gICAgZnVuY3Rpb24gYW0zKGksIHgsIHcsIGosIGMsIG4pIHtcclxuICAgICAgICB2YXIgeGwgPSB4ICYgMHgzZmZmO1xyXG4gICAgICAgIHZhciB4aCA9IHggPj4gMTQ7XHJcbiAgICAgICAgd2hpbGUgKC0tbiA+PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBsID0gdGhpc1tpXSAmIDB4M2ZmZjtcclxuICAgICAgICAgICAgdmFyIGggPSB0aGlzW2krK10gPj4gMTQ7XHJcbiAgICAgICAgICAgIHZhciBtID0geGggKiBsICsgaCAqIHhsO1xyXG4gICAgICAgICAgICBsID0geGwgKiBsICsgKChtICYgMHgzZmZmKSA8PCAxNCkgKyB3W2pdICsgYztcclxuICAgICAgICAgICAgYyA9IChsID4+IDI4KSArIChtID4+IDE0KSArIHhoICogaDtcclxuICAgICAgICAgICAgd1tqKytdID0gbCAmIDB4ZmZmZmZmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICB2YXIgbmF2aWdhdG9yID0ge307XHJcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50ID0gZmFsc2U7XHJcbiAgICBpZiAoal9sbSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgPT0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIikpIHtcclxuICAgICAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbSA9IGFtMjtcclxuICAgICAgICBkYml0cyA9IDMwO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoal9sbSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgIT0gXCJOZXRzY2FwZVwiKSkge1xyXG4gICAgICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLmFtID0gYW0xO1xyXG4gICAgICAgIGRiaXRzID0gMjY7XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gTW96aWxsYS9OZXRzY2FwZSBzZWVtcyB0byBwcmVmZXIgYW0zXHJcbiAgICAgICAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW0gPSBhbTM7XHJcbiAgICAgICAgZGJpdHMgPSAyODtcclxuICAgIH1cclxuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkRCID0gZGJpdHM7XHJcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5ETSA9ICgoMSA8PCBkYml0cykgLSAxKTtcclxuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkRWID0gKDEgPDwgZGJpdHMpO1xyXG4gICAgdmFyIEJJX0ZQID0gNTI7XHJcbiAgICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5GViA9IE1hdGgucG93KDIsIEJJX0ZQKTtcclxuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkYxID0gQklfRlAgLSBkYml0cztcclxuICAgIEJpZ0ludGVnZXIucHJvdG90eXBlLkYyID0gMiAqIGRiaXRzIC0gQklfRlA7XHJcbiAgICAvLyBEaWdpdCBjb252ZXJzaW9uc1xyXG4gICAgdmFyIEJJX1JDID0gW107XHJcbiAgICB2YXIgcnI7XHJcbiAgICB2YXIgdnY7XHJcbiAgICByciA9IFwiMFwiLmNoYXJDb2RlQXQoMCk7XHJcbiAgICBmb3IgKHZ2ID0gMDsgdnYgPD0gOTsgKyt2dikge1xyXG4gICAgICAgIEJJX1JDW3JyKytdID0gdnY7XHJcbiAgICB9XHJcbiAgICByciA9IFwiYVwiLmNoYXJDb2RlQXQoMCk7XHJcbiAgICBmb3IgKHZ2ID0gMTA7IHZ2IDwgMzY7ICsrdnYpIHtcclxuICAgICAgICBCSV9SQ1tycisrXSA9IHZ2O1xyXG4gICAgfVxyXG4gICAgcnIgPSBcIkFcIi5jaGFyQ29kZUF0KDApO1xyXG4gICAgZm9yICh2diA9IDEwOyB2diA8IDM2OyArK3Z2KSB7XHJcbiAgICAgICAgQklfUkNbcnIrK10gPSB2djtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGludEF0KHMsIGkpIHtcclxuICAgICAgICB2YXIgYyA9IEJJX1JDW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgcmV0dXJuIChjID09IG51bGwpID8gLTEgOiBjO1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGJpZ2ludCBpbml0aWFsaXplZCB0byB2YWx1ZVxyXG4gICAgZnVuY3Rpb24gbmJ2KGkpIHtcclxuICAgICAgICB2YXIgciA9IG5iaSgpO1xyXG4gICAgICAgIHIuZnJvbUludChpKTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuICAgIC8vIHJldHVybnMgYml0IGxlbmd0aCBvZiB0aGUgaW50ZWdlciB4XHJcbiAgICBmdW5jdGlvbiBuYml0cyh4KSB7XHJcbiAgICAgICAgdmFyIHIgPSAxO1xyXG4gICAgICAgIHZhciB0O1xyXG4gICAgICAgIGlmICgodCA9IHggPj4+IDE2KSAhPSAwKSB7XHJcbiAgICAgICAgICAgIHggPSB0O1xyXG4gICAgICAgICAgICByICs9IDE2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHQgPSB4ID4+IDgpICE9IDApIHtcclxuICAgICAgICAgICAgeCA9IHQ7XHJcbiAgICAgICAgICAgIHIgKz0gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh0ID0geCA+PiA0KSAhPSAwKSB7XHJcbiAgICAgICAgICAgIHggPSB0O1xyXG4gICAgICAgICAgICByICs9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodCA9IHggPj4gMikgIT0gMCkge1xyXG4gICAgICAgICAgICB4ID0gdDtcclxuICAgICAgICAgICAgciArPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHQgPSB4ID4+IDEpICE9IDApIHtcclxuICAgICAgICAgICAgeCA9IHQ7XHJcbiAgICAgICAgICAgIHIgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICAvLyBcImNvbnN0YW50c1wiXHJcbiAgICBCaWdJbnRlZ2VyLlpFUk8gPSBuYnYoMCk7XHJcbiAgICBCaWdJbnRlZ2VyLk9ORSA9IG5idigxKTtcclxuXHJcbiAgICAvLyBwcm5nNC5qcyAtIHVzZXMgQXJjZm91ciBhcyBhIFBSTkdcclxuICAgIHZhciBBcmNmb3VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEFyY2ZvdXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuUyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBcmNmb3VyLnByb3RvdHlwZS5pbml0ID0gQVJDNGluaXQ7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhcmNmb3VyIGNvbnRleHQgZnJvbSBrZXksIGFuIGFycmF5IG9mIGludHMsIGVhY2ggZnJvbSBbMC4uMjU1XVxyXG4gICAgICAgIEFyY2ZvdXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICB2YXIgajtcclxuICAgICAgICAgICAgdmFyIHQ7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TW2ldID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDI1NjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBqID0gKGogKyB0aGlzLlNbaV0gKyBrZXlbaSAlIGtleS5sZW5ndGhdKSAmIDI1NTtcclxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLlNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNbaV0gPSB0aGlzLlNbal07XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNbal0gPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaiA9IDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBcmNmb3VyLnByb3RvdHlwZS5uZXh0ID0gQVJDNG5leHQ7XHJcbiAgICAgICAgQXJjZm91ci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHQ7XHJcbiAgICAgICAgICAgIHRoaXMuaSA9ICh0aGlzLmkgKyAxKSAmIDI1NTtcclxuICAgICAgICAgICAgdGhpcy5qID0gKHRoaXMuaiArIHRoaXMuU1t0aGlzLmldKSAmIDI1NTtcclxuICAgICAgICAgICAgdCA9IHRoaXMuU1t0aGlzLmldO1xyXG4gICAgICAgICAgICB0aGlzLlNbdGhpcy5pXSA9IHRoaXMuU1t0aGlzLmpdO1xyXG4gICAgICAgICAgICB0aGlzLlNbdGhpcy5qXSA9IHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNbKHQgKyB0aGlzLlNbdGhpcy5pXSkgJiAyNTVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFyY2ZvdXI7XHJcbiAgICB9KCkpO1xyXG4gICAgLy8gUGx1ZyBpbiB5b3VyIFJORyBjb25zdHJ1Y3RvciBoZXJlXHJcbiAgICBmdW5jdGlvbiBwcm5nX25ld3N0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQXJjZm91cigpO1xyXG4gICAgfVxyXG4gICAgLy8gUG9vbCBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0IGFuZCBncmVhdGVyIHRoYW4gMzIuXHJcbiAgICAvLyBBbiBhcnJheSBvZiBieXRlcyB0aGUgc2l6ZSBvZiB0aGUgcG9vbCB3aWxsIGJlIHBhc3NlZCB0byBpbml0KClcclxuICAgIHZhciBybmdfcHNpemUgPSAyNTY7XHJcblxyXG4gICAgLy8gUmFuZG9tIG51bWJlciBnZW5lcmF0b3IgLSByZXF1aXJlcyBhIFBSTkcgYmFja2VuZCwgZS5nLiBwcm5nNC5qc1xyXG4gICAgdmFyIHJuZ19zdGF0ZTtcclxuICAgIHZhciBybmdfcG9vbCA9IG51bGw7XHJcbiAgICB2YXIgcm5nX3BwdHI7XHJcbiAgICAvLyBJbml0aWFsaXplIHRoZSBwb29sIHdpdGgganVuayBpZiBuZWVkZWQuXHJcbiAgICBpZiAocm5nX3Bvb2wgPT0gbnVsbCkge1xyXG4gICAgICAgIHJuZ19wb29sID0gW107XHJcbiAgICAgICAgcm5nX3BwdHIgPSAwO1xyXG4gICAgICAgIHZhciB0ID0gdm9pZCAwO1xyXG4gICAgICAgIGlmICh3aW5kb3cuY3J5cHRvICYmIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgZW50cm9weSAoMjA0OCBiaXRzKSBmcm9tIFJORyBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgdmFyIHogPSBuZXcgVWludDMyQXJyYXkoMjU2KTtcclxuICAgICAgICAgICAgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoeik7XHJcbiAgICAgICAgICAgIGZvciAodCA9IDA7IHQgPCB6Lmxlbmd0aDsgKyt0KSB7XHJcbiAgICAgICAgICAgICAgICBybmdfcG9vbFtybmdfcHB0cisrXSA9IHpbdF0gJiAyNTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVXNlIG1vdXNlIGV2ZW50cyBmb3IgZW50cm9weSwgaWYgd2UgZG8gbm90IGhhdmUgZW5vdWdoIGVudHJvcHkgYnkgdGhlIHRpbWVcclxuICAgICAgICAvLyB3ZSBuZWVkIGl0LCBlbnRyb3B5IHdpbGwgYmUgZ2VuZXJhdGVkIGJ5IE1hdGgucmFuZG9tLlxyXG4gICAgICAgIHZhciBvbk1vdXNlTW92ZUxpc3RlbmVyXzEgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuY291bnQgfHwgMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPj0gMjU2IHx8IHJuZ19wcHRyID49IHJuZ19wc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3aW5kb3cuZGV0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGV0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZUxpc3RlbmVyXzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW91c2VDb29yZGluYXRlcyA9IGV2LnggKyBldi55O1xyXG4gICAgICAgICAgICAgICAgcm5nX3Bvb2xbcm5nX3BwdHIrK10gPSBtb3VzZUNvb3JkaW5hdGVzICYgMjU1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgRmlyZWZveCB3aWxsIGRlbnkgcGVybWlzc2lvbiB0byBhY2Nlc3MgZXZlbnQgcHJvcGVydGllcyBmb3Igc29tZSByZWFzb24uIElnbm9yZS5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlTGlzdGVuZXJfMSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBybmdfZ2V0X2J5dGUoKSB7XHJcbiAgICAgICAgaWYgKHJuZ19zdGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJuZ19zdGF0ZSA9IHBybmdfbmV3c3RhdGUoKTtcclxuICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgbWF5IG5vdCBoYXZlIGNvbGxlY3RlZCBlbm91Z2ggZW50cm9weS4gIElmIG5vdCwgZmFsbCBiYWNrIHRvIE1hdGgucmFuZG9tXHJcbiAgICAgICAgICAgIHdoaWxlIChybmdfcHB0ciA8IHJuZ19wc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbSA9IE1hdGguZmxvb3IoNjU1MzYgKiBNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICAgICAgICAgIHJuZ19wb29sW3JuZ19wcHRyKytdID0gcmFuZG9tICYgMjU1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJuZ19zdGF0ZS5pbml0KHJuZ19wb29sKTtcclxuICAgICAgICAgICAgZm9yIChybmdfcHB0ciA9IDA7IHJuZ19wcHRyIDwgcm5nX3Bvb2wubGVuZ3RoOyArK3JuZ19wcHRyKSB7XHJcbiAgICAgICAgICAgICAgICBybmdfcG9vbFtybmdfcHB0cl0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJuZ19wcHRyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVE9ETzogYWxsb3cgcmVzZWVkaW5nIGFmdGVyIGZpcnN0IHJlcXVlc3RcclxuICAgICAgICByZXR1cm4gcm5nX3N0YXRlLm5leHQoKTtcclxuICAgIH1cclxuICAgIHZhciBTZWN1cmVSYW5kb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU2VjdXJlUmFuZG9tKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZWN1cmVSYW5kb20ucHJvdG90eXBlLm5leHRCeXRlcyA9IGZ1bmN0aW9uIChiYSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBiYVtpXSA9IHJuZ19nZXRfYnl0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gU2VjdXJlUmFuZG9tO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvLyBEZXBlbmRzIG9uIGpzYm4uanMgYW5kIHJuZy5qc1xyXG4gICAgLy8gZnVuY3Rpb24gbGluZWJyayhzLG4pIHtcclxuICAgIC8vICAgdmFyIHJldCA9IFwiXCI7XHJcbiAgICAvLyAgIHZhciBpID0gMDtcclxuICAgIC8vICAgd2hpbGUoaSArIG4gPCBzLmxlbmd0aCkge1xyXG4gICAgLy8gICAgIHJldCArPSBzLnN1YnN0cmluZyhpLGkrbikgKyBcIlxcblwiO1xyXG4gICAgLy8gICAgIGkgKz0gbjtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gICByZXR1cm4gcmV0ICsgcy5zdWJzdHJpbmcoaSxzLmxlbmd0aCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBmdW5jdGlvbiBieXRlMkhleChiKSB7XHJcbiAgICAvLyAgIGlmKGIgPCAweDEwKVxyXG4gICAgLy8gICAgIHJldHVybiBcIjBcIiArIGIudG9TdHJpbmcoMTYpO1xyXG4gICAgLy8gICBlbHNlXHJcbiAgICAvLyAgICAgcmV0dXJuIGIudG9TdHJpbmcoMTYpO1xyXG4gICAgLy8gfVxyXG4gICAgZnVuY3Rpb24gcGtjczFwYWQxKHMsIG4pIHtcclxuICAgICAgICBpZiAobiA8IHMubGVuZ3RoICsgMjIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1lc3NhZ2UgdG9vIGxvbmcgZm9yIFJTQVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZW4gPSBuIC0gcy5sZW5ndGggLSA2O1xyXG4gICAgICAgIHZhciBmaWxsZXIgPSBcIlwiO1xyXG4gICAgICAgIGZvciAodmFyIGYgPSAwOyBmIDwgbGVuOyBmICs9IDIpIHtcclxuICAgICAgICAgICAgZmlsbGVyICs9IFwiZmZcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG0gPSBcIjAwMDFcIiArIGZpbGxlciArIFwiMDBcIiArIHM7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlQmlnSW50KG0sIDE2KTtcclxuICAgIH1cclxuICAgIC8vIFBLQ1MjMSAodHlwZSAyLCByYW5kb20pIHBhZCBpbnB1dCBzdHJpbmcgcyB0byBuIGJ5dGVzLCBhbmQgcmV0dXJuIGEgYmlnaW50XHJcbiAgICBmdW5jdGlvbiBwa2NzMXBhZDIocywgbikge1xyXG4gICAgICAgIGlmIChuIDwgcy5sZW5ndGggKyAxMSkgeyAvLyBUT0RPOiBmaXggZm9yIHV0Zi04XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNZXNzYWdlIHRvbyBsb25nIGZvciBSU0FcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYmEgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIG4gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KGktLSk7XHJcbiAgICAgICAgICAgIGlmIChjIDwgMTI4KSB7IC8vIGVuY29kZSB1c2luZyB1dGYtOFxyXG4gICAgICAgICAgICAgICAgYmFbLS1uXSA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKGMgPiAxMjcpICYmIChjIDwgMjA0OCkpIHtcclxuICAgICAgICAgICAgICAgIGJhWy0tbl0gPSAoYyAmIDYzKSB8IDEyODtcclxuICAgICAgICAgICAgICAgIGJhWy0tbl0gPSAoYyA+PiA2KSB8IDE5MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhWy0tbl0gPSAoYyAmIDYzKSB8IDEyODtcclxuICAgICAgICAgICAgICAgIGJhWy0tbl0gPSAoKGMgPj4gNikgJiA2MykgfCAxMjg7XHJcbiAgICAgICAgICAgICAgICBiYVstLW5dID0gKGMgPj4gMTIpIHwgMjI0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJhWy0tbl0gPSAwO1xyXG4gICAgICAgIHZhciBybmcgPSBuZXcgU2VjdXJlUmFuZG9tKCk7XHJcbiAgICAgICAgdmFyIHggPSBbXTtcclxuICAgICAgICB3aGlsZSAobiA+IDIpIHsgLy8gcmFuZG9tIG5vbi16ZXJvIHBhZFxyXG4gICAgICAgICAgICB4WzBdID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHhbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm5nLm5leHRCeXRlcyh4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYVstLW5dID0geFswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFbLS1uXSA9IDI7XHJcbiAgICAgICAgYmFbLS1uXSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdJbnRlZ2VyKGJhKTtcclxuICAgIH1cclxuICAgIC8vIFwiZW1wdHlcIiBSU0Ega2V5IGNvbnN0cnVjdG9yXHJcbiAgICB2YXIgUlNBS2V5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFJTQUtleSgpIHtcclxuICAgICAgICAgICAgdGhpcy5uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5kID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5xID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5kbXAxID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5kbXExID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI3JlZ2lvbiBQUk9URUNURURcclxuICAgICAgICAvLyBwcm90ZWN0ZWRcclxuICAgICAgICAvLyBSU0FLZXkucHJvdG90eXBlLmRvUHVibGljID0gUlNBRG9QdWJsaWM7XHJcbiAgICAgICAgLy8gUGVyZm9ybSByYXcgcHVibGljIG9wZXJhdGlvbiBvbiBcInhcIjogcmV0dXJuIHheZSAobW9kIG4pXHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS5kb1B1YmxpYyA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4Lm1vZFBvd0ludCh0aGlzLmUsIHRoaXMubik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSU0FLZXkucHJvdG90eXBlLmRvUHJpdmF0ZSA9IFJTQURvUHJpdmF0ZTtcclxuICAgICAgICAvLyBQZXJmb3JtIHJhdyBwcml2YXRlIG9wZXJhdGlvbiBvbiBcInhcIjogcmV0dXJuIHheZCAobW9kIG4pXHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS5kb1ByaXZhdGUgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wID09IG51bGwgfHwgdGhpcy5xID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4Lm1vZFBvdyh0aGlzLmQsIHRoaXMubik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogcmUtY2FsY3VsYXRlIGFueSBtaXNzaW5nIENSVCBwYXJhbXNcclxuICAgICAgICAgICAgdmFyIHhwID0geC5tb2QodGhpcy5wKS5tb2RQb3codGhpcy5kbXAxLCB0aGlzLnApO1xyXG4gICAgICAgICAgICB2YXIgeHEgPSB4Lm1vZCh0aGlzLnEpLm1vZFBvdyh0aGlzLmRtcTEsIHRoaXMucSk7XHJcbiAgICAgICAgICAgIHdoaWxlICh4cC5jb21wYXJlVG8oeHEpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgeHAgPSB4cC5hZGQodGhpcy5wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4geHAuc3VidHJhY3QoeHEpLm11bHRpcGx5KHRoaXMuY29lZmYpLm1vZCh0aGlzLnApLm11bHRpcGx5KHRoaXMucSkuYWRkKHhxKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBQUk9URUNURURcclxuICAgICAgICAvLyNyZWdpb24gUFVCTElDXHJcbiAgICAgICAgLy8gUlNBS2V5LnByb3RvdHlwZS5zZXRQdWJsaWMgPSBSU0FTZXRQdWJsaWM7XHJcbiAgICAgICAgLy8gU2V0IHRoZSBwdWJsaWMga2V5IGZpZWxkcyBOIGFuZCBlIGZyb20gaGV4IHN0cmluZ3NcclxuICAgICAgICBSU0FLZXkucHJvdG90eXBlLnNldFB1YmxpYyA9IGZ1bmN0aW9uIChOLCBFKSB7XHJcbiAgICAgICAgICAgIGlmIChOICE9IG51bGwgJiYgRSAhPSBudWxsICYmIE4ubGVuZ3RoID4gMCAmJiBFLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KE4sIDE2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIFJTQSBwdWJsaWMga2V5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSU0FLZXkucHJvdG90eXBlLmVuY3J5cHQgPSBSU0FFbmNyeXB0O1xyXG4gICAgICAgIC8vIFJldHVybiB0aGUgUEtDUyMxIFJTQSBlbmNyeXB0aW9uIG9mIFwidGV4dFwiIGFzIGFuIGV2ZW4tbGVuZ3RoIGhleCBzdHJpbmdcclxuICAgICAgICBSU0FLZXkucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbSA9IHBrY3MxcGFkMih0ZXh0LCAodGhpcy5uLmJpdExlbmd0aCgpICsgNykgPj4gMyk7XHJcbiAgICAgICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5kb1B1YmxpYyhtKTtcclxuICAgICAgICAgICAgaWYgKGMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGggPSBjLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgaWYgKChoLmxlbmd0aCAmIDEpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMFwiICsgaDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUlNBS2V5LnByb3RvdHlwZS5zZXRQcml2YXRlID0gUlNBU2V0UHJpdmF0ZTtcclxuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUga2V5IGZpZWxkcyBOLCBlLCBhbmQgZCBmcm9tIGhleCBzdHJpbmdzXHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS5zZXRQcml2YXRlID0gZnVuY3Rpb24gKE4sIEUsIEQpIHtcclxuICAgICAgICAgICAgaWYgKE4gIT0gbnVsbCAmJiBFICE9IG51bGwgJiYgTi5sZW5ndGggPiAwICYmIEUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uID0gcGFyc2VCaWdJbnQoTiwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kID0gcGFyc2VCaWdJbnQoRCwgMTYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgUlNBIHByaXZhdGUga2V5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSU0FLZXkucHJvdG90eXBlLnNldFByaXZhdGVFeCA9IFJTQVNldFByaXZhdGVFeDtcclxuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUga2V5IGZpZWxkcyBOLCBlLCBkIGFuZCBDUlQgcGFyYW1zIGZyb20gaGV4IHN0cmluZ3NcclxuICAgICAgICBSU0FLZXkucHJvdG90eXBlLnNldFByaXZhdGVFeCA9IGZ1bmN0aW9uIChOLCBFLCBELCBQLCBRLCBEUCwgRFEsIEMpIHtcclxuICAgICAgICAgICAgaWYgKE4gIT0gbnVsbCAmJiBFICE9IG51bGwgJiYgTi5sZW5ndGggPiAwICYmIEUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uID0gcGFyc2VCaWdJbnQoTiwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kID0gcGFyc2VCaWdJbnQoRCwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gcGFyc2VCaWdJbnQoUCwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xID0gcGFyc2VCaWdJbnQoUSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbXAxID0gcGFyc2VCaWdJbnQoRFAsIDE2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG1xMSA9IHBhcnNlQmlnSW50KERRLCAxNik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZWZmID0gcGFyc2VCaWdJbnQoQywgMTYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgUlNBIHByaXZhdGUga2V5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSU0FLZXkucHJvdG90eXBlLmdlbmVyYXRlID0gUlNBR2VuZXJhdGU7XHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgcmFuZG9tIHByaXZhdGUga2V5IEIgYml0cyBsb25nLCB1c2luZyBwdWJsaWMgZXhwdCBFXHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIChCLCBFKSB7XHJcbiAgICAgICAgICAgIHZhciBybmcgPSBuZXcgU2VjdXJlUmFuZG9tKCk7XHJcbiAgICAgICAgICAgIHZhciBxcyA9IEIgPj4gMTtcclxuICAgICAgICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xyXG4gICAgICAgICAgICB2YXIgZWUgPSBuZXcgQmlnSW50ZWdlcihFLCAxNik7XHJcbiAgICAgICAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgOykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucCA9IG5ldyBCaWdJbnRlZ2VyKEIgLSBxcywgMSwgcm5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKS5nY2QoZWUpLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCAmJiB0aGlzLnAuaXNQcm9iYWJsZVByaW1lKDEwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgOykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucSA9IG5ldyBCaWdJbnRlZ2VyKHFzLCAxLCBybmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnEuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpLmdjZChlZSkuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHRoaXMucS5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnAuY29tcGFyZVRvKHRoaXMucSkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnEgPSB0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHAxID0gdGhpcy5wLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKTtcclxuICAgICAgICAgICAgICAgIHZhciBxMSA9IHRoaXMucS5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGhpID0gcDEubXVsdGlwbHkocTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBoaS5nY2QoZWUpLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubiA9IHRoaXMucC5tdWx0aXBseSh0aGlzLnEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZCA9IGVlLm1vZEludmVyc2UocGhpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRtcDEgPSB0aGlzLmQubW9kKHAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRtcTEgPSB0aGlzLmQubW9kKHExKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZWZmID0gdGhpcy5xLm1vZEludmVyc2UodGhpcy5wKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUlNBS2V5LnByb3RvdHlwZS5kZWNyeXB0ID0gUlNBRGVjcnlwdDtcclxuICAgICAgICAvLyBSZXR1cm4gdGhlIFBLQ1MjMSBSU0EgZGVjcnlwdGlvbiBvZiBcImN0ZXh0XCIuXHJcbiAgICAgICAgLy8gXCJjdGV4dFwiIGlzIGFuIGV2ZW4tbGVuZ3RoIGhleCBzdHJpbmcgYW5kIHRoZSBvdXRwdXQgaXMgYSBwbGFpbiBzdHJpbmcuXHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24gKGN0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gcGFyc2VCaWdJbnQoY3RleHQsIDE2KTtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmRvUHJpdmF0ZShjKTtcclxuICAgICAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBrY3MxdW5wYWQyKG0sICh0aGlzLm4uYml0TGVuZ3RoKCkgKyA3KSA+PiAzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEdlbmVyYXRlIGEgbmV3IHJhbmRvbSBwcml2YXRlIGtleSBCIGJpdHMgbG9uZywgdXNpbmcgcHVibGljIGV4cHQgRVxyXG4gICAgICAgIFJTQUtleS5wcm90b3R5cGUuZ2VuZXJhdGVBc3luYyA9IGZ1bmN0aW9uIChCLCBFLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB2YXIgcm5nID0gbmV3IFNlY3VyZVJhbmRvbSgpO1xyXG4gICAgICAgICAgICB2YXIgcXMgPSBCID4+IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcclxuICAgICAgICAgICAgdmFyIGVlID0gbmV3IEJpZ0ludGVnZXIoRSwgMTYpO1xyXG4gICAgICAgICAgICB2YXIgcnNhID0gdGhpcztcclxuICAgICAgICAgICAgLy8gVGhlc2UgZnVuY3Rpb25zIGhhdmUgbm9uLWRlc2NyaXB0IG5hbWVzIGJlY2F1c2UgdGhleSB3ZXJlIG9yaWdpbmFsbHkgZm9yKDs7KSBsb29wcy5cclxuICAgICAgICAgICAgLy8gSSBkb24ndCBrbm93IGFib3V0IGNyeXB0b2dyYXBoeSB0byBnaXZlIHRoZW0gYmV0dGVyIG5hbWVzIHRoYW4gbG9vcDEtNC5cclxuICAgICAgICAgICAgdmFyIGxvb3AxID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvb3A0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyc2EucC5jb21wYXJlVG8ocnNhLnEpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSByc2EucDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnNhLnAgPSByc2EucTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnNhLnEgPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcDEgPSByc2EucC5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHExID0gcnNhLnEuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwaGkgPSBwMS5tdWx0aXBseShxMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBoaS5nY2QoZWUpLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByc2EubiA9IHJzYS5wLm11bHRpcGx5KHJzYS5xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnNhLmQgPSBlZS5tb2RJbnZlcnNlKHBoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzYS5kbXAxID0gcnNhLmQubW9kKHAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnNhLmRtcTEgPSByc2EuZC5tb2QocTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByc2EuY29lZmYgPSByc2EucS5tb2RJbnZlcnNlKHJzYS5wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKCk7IH0sIDApOyAvLyBlc2NhcGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9vcDMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnNhLnEgPSBuYmkoKTtcclxuICAgICAgICAgICAgICAgICAgICByc2EucS5mcm9tTnVtYmVyQXN5bmMocXMsIDEsIHJuZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByc2EucS5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSkuZ2NkYShlZSwgZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCAmJiByc2EucS5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChsb29wNCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvb3AyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJzYS5wID0gbmJpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcnNhLnAuZnJvbU51bWJlckFzeW5jKEIgLSBxcywgMSwgcm5nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzYS5wLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKS5nY2RhKGVlLCBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHJzYS5wLmlzUHJvYmFibGVQcmltZSgxMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AyLCAwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChsb29wMSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSU0FLZXkucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbiAodGV4dCwgZGlnZXN0TWV0aG9kLCBkaWdlc3ROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBnZXREaWdlc3RIZWFkZXIoZGlnZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBkaWdlc3QgPSBoZWFkZXIgKyBkaWdlc3RNZXRob2QodGV4dCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFyIG0gPSBwa2NzMXBhZDEoZGlnZXN0LCB0aGlzLm4uYml0TGVuZ3RoKCkgLyA0KTtcclxuICAgICAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmRvUHJpdmF0ZShtKTtcclxuICAgICAgICAgICAgaWYgKGMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGggPSBjLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgaWYgKChoLmxlbmd0aCAmIDEpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMFwiICsgaDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgUlNBS2V5LnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAodGV4dCwgc2lnbmF0dXJlLCBkaWdlc3RNZXRob2QpIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBwYXJzZUJpZ0ludChzaWduYXR1cmUsIDE2KTtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmRvUHVibGljKGMpO1xyXG4gICAgICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdW5wYWRkZWQgPSBtLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9eMWYrMDAvLCBcIlwiKTtcclxuICAgICAgICAgICAgdmFyIGRpZ2VzdCA9IHJlbW92ZURpZ2VzdEhlYWRlcih1bnBhZGRlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWdlc3QgPT0gZGlnZXN0TWV0aG9kKHRleHQpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUlNBS2V5O1xyXG4gICAgfSgpKTtcclxuICAgIC8vIFVuZG8gUEtDUyMxICh0eXBlIDIsIHJhbmRvbSkgcGFkZGluZyBhbmQsIGlmIHZhbGlkLCByZXR1cm4gdGhlIHBsYWludGV4dFxyXG4gICAgZnVuY3Rpb24gcGtjczF1bnBhZDIoZCwgbikge1xyXG4gICAgICAgIHZhciBiID0gZC50b0J5dGVBcnJheSgpO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB3aGlsZSAoaSA8IGIubGVuZ3RoICYmIGJbaV0gPT0gMCkge1xyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiLmxlbmd0aCAtIGkgIT0gbiAtIDEgfHwgYltpXSAhPSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICArK2k7XHJcbiAgICAgICAgd2hpbGUgKGJbaV0gIT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoKytpID49IGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcclxuICAgICAgICB3aGlsZSAoKytpIDwgYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBiW2ldICYgMjU1O1xyXG4gICAgICAgICAgICBpZiAoYyA8IDEyOCkgeyAvLyB1dGYtOCBkZWNvZGVcclxuICAgICAgICAgICAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKChjID4gMTkxKSAmJiAoYyA8IDIyNCkpIHtcclxuICAgICAgICAgICAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDMxKSA8PCA2KSB8IChiW2kgKyAxXSAmIDYzKSk7XHJcbiAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAxNSkgPDwgMTIpIHwgKChiW2kgKyAxXSAmIDYzKSA8PCA2KSB8IChiW2kgKyAyXSAmIDYzKSk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDQ3I3BhZ2UtNDNcclxuICAgIHZhciBESUdFU1RfSEVBREVSUyA9IHtcclxuICAgICAgICBtZDI6IFwiMzAyMDMwMGMwNjA4MmE4NjQ4ODZmNzBkMDIwMjA1MDAwNDEwXCIsXHJcbiAgICAgICAgbWQ1OiBcIjMwMjAzMDBjMDYwODJhODY0ODg2ZjcwZDAyMDUwNTAwMDQxMFwiLFxyXG4gICAgICAgIHNoYTE6IFwiMzAyMTMwMDkwNjA1MmIwZTAzMDIxYTA1MDAwNDE0XCIsXHJcbiAgICAgICAgc2hhMjI0OiBcIjMwMmQzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwNDA1MDAwNDFjXCIsXHJcbiAgICAgICAgc2hhMjU2OiBcIjMwMzEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMTA1MDAwNDIwXCIsXHJcbiAgICAgICAgc2hhMzg0OiBcIjMwNDEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMjA1MDAwNDMwXCIsXHJcbiAgICAgICAgc2hhNTEyOiBcIjMwNTEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMzA1MDAwNDQwXCIsXHJcbiAgICAgICAgcmlwZW1kMTYwOiBcIjMwMjEzMDA5MDYwNTJiMjQwMzAyMDEwNTAwMDQxNFwiLFxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGdldERpZ2VzdEhlYWRlcihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIERJR0VTVF9IRUFERVJTW25hbWVdIHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZW1vdmVEaWdlc3RIZWFkZXIoc3RyKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZV8xIGluIERJR0VTVF9IRUFERVJTKSB7XHJcbiAgICAgICAgICAgIGlmIChESUdFU1RfSEVBREVSUy5oYXNPd25Qcm9wZXJ0eShuYW1lXzEpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGVyID0gRElHRVNUX0hFQURFUlNbbmFtZV8xXTtcclxuICAgICAgICAgICAgICAgIHZhciBsZW4gPSBoZWFkZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ci5zdWJzdHIoMCwgbGVuKSA9PSBoZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihsZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm4gdGhlIFBLQ1MjMSBSU0EgZW5jcnlwdGlvbiBvZiBcInRleHRcIiBhcyBhIEJhc2U2NC1lbmNvZGVkIHN0cmluZ1xyXG4gICAgLy8gZnVuY3Rpb24gUlNBRW5jcnlwdEI2NCh0ZXh0KSB7XHJcbiAgICAvLyAgdmFyIGggPSB0aGlzLmVuY3J5cHQodGV4dCk7XHJcbiAgICAvLyAgaWYoaCkgcmV0dXJuIGhleDJiNjQoaCk7IGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBwdWJsaWNcclxuICAgIC8vIFJTQUtleS5wcm90b3R5cGUuZW5jcnlwdF9iNjQgPSBSU0FFbmNyeXB0QjY0O1xyXG5cclxuICAgIC8qIVxyXG4gICAgQ29weXJpZ2h0IChjKSAyMDExLCBZYWhvbyEgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gICAgQ29kZSBsaWNlbnNlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2U6XHJcbiAgICBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95dWkvbGljZW5zZS5odG1sXHJcbiAgICB2ZXJzaW9uOiAyLjkuMFxyXG4gICAgKi9cclxuICAgIHZhciBZQUhPTyA9IHt9O1xyXG4gICAgWUFIT08ubGFuZyA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVdGlsaXR5IHRvIHNldCB1cCB0aGUgcHJvdG90eXBlLCBjb25zdHJ1Y3RvciBhbmQgc3VwZXJjbGFzcyBwcm9wZXJ0aWVzIHRvXHJcbiAgICAgICAgICogc3VwcG9ydCBhbiBpbmhlcml0YW5jZSBzdHJhdGVneSB0aGF0IGNhbiBjaGFpbiBjb25zdHJ1Y3RvcnMgYW5kIG1ldGhvZHMuXHJcbiAgICAgICAgICogU3RhdGljIG1lbWJlcnMgd2lsbCBub3QgYmUgaW5oZXJpdGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1ldGhvZCBleHRlbmRcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3ViYyAgIHRoZSBvYmplY3QgdG8gbW9kaWZ5XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJjIHRoZSBvYmplY3QgdG8gaW5oZXJpdFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgIGFkZGl0aW9uYWwgcHJvcGVydGllcy9tZXRob2RzIHRvIGFkZCB0byB0aGVcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzIHByb3RvdHlwZS4gIFRoZXNlIHdpbGwgb3ZlcnJpZGUgdGhlXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZyBpdGVtcyBvYnRhaW5lZCBmcm9tIHRoZSBzdXBlcmNsYXNzXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBwcmVzZW50LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKHN1YmMsIHN1cGVyYywgb3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgICAgIGlmICghc3VwZXJjIHx8ICFzdWJjKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZQUhPTy5sYW5nLmV4dGVuZCBmYWlsZWQsIHBsZWFzZSBjaGVjayB0aGF0IFwiICtcclxuICAgICAgICAgICAgICAgICAgICBcImFsbCBkZXBlbmRlbmNpZXMgYXJlIGluY2x1ZGVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgIEYucHJvdG90eXBlID0gc3VwZXJjLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgc3ViYy5wcm90b3R5cGUgPSBuZXcgRigpO1xyXG4gICAgICAgICAgICBzdWJjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YmM7XHJcbiAgICAgICAgICAgIHN1YmMuc3VwZXJjbGFzcyA9IHN1cGVyYy5wcm90b3R5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VwZXJjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PSBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlcmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3VwZXJjO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSBpbiBvdmVycmlkZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJjLnByb3RvdHlwZVtpXSA9IG92ZXJyaWRlc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogSUUgd2lsbCBub3QgZW51bWVyYXRlIG5hdGl2ZSBmdW5jdGlvbnMgaW4gYSBkZXJpdmVkIG9iamVjdCBldmVuIGlmIHRoZVxyXG4gICAgICAgICAgICAgICAgICogZnVuY3Rpb24gd2FzIG92ZXJyaWRkZW4uICBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3Igc3BlY2lmaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgKiB3ZSBjYXJlIGFib3V0IG9uIHRoZSBPYmplY3QgcHJvdG90eXBlLlxyXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IF9JRUVudW1GaXhcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHIgIHRoZSBvYmplY3QgdG8gcmVjZWl2ZSB0aGUgYXVnbWVudGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzICB0aGUgb2JqZWN0IHRoYXQgc3VwcGxpZXMgdGhlIHByb3BlcnRpZXMgdG8gYXVnbWVudFxyXG4gICAgICAgICAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIF9JRUVudW1GaXggPSBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgQUREID0gW1widG9TdHJpbmdcIiwgXCJ2YWx1ZU9mXCJdO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoL01TSUUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0lFRW51bUZpeCA9IGZ1bmN0aW9uIChyLCBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgQURELmxlbmd0aDsgaSA9IGkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuYW1lID0gQUREW2ldLCBmID0gc1tmbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmID09PSAnZnVuY3Rpb24nICYmIGYgIT0gT2JqZWN0LnByb3RvdHlwZVtmbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcltmbmFtZV0gPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleCkgeyB9IF9JRUVudW1GaXgoc3ViYy5wcm90b3R5cGUsIG92ZXJyaWRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGFzbjEtMS4wLjEzLmpzIChjKSAyMDEzLTIwMTcgS2VuamkgVXJ1c2hpbWEgfCBranVyLmdpdGh1Yi5jb20vanNyc2FzaWduL2xpY2Vuc2VcclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGZpbGVPdmVydmlld1xyXG4gICAgICogQG5hbWUgYXNuMS0xLjAuanNcclxuICAgICAqIEBhdXRob3IgS2VuamkgVXJ1c2hpbWEga2VuamkudXJ1c2hpbWFAZ21haWwuY29tXHJcbiAgICAgKiBAdmVyc2lvbiBhc24xIDEuMC4xMyAoMjAxNy1KdW4tMDIpXHJcbiAgICAgKiBAc2luY2UganNyc2FzaWduIDIuMVxyXG4gICAgICogQGxpY2Vuc2UgPGEgaHJlZj1cImh0dHBzOi8va2p1ci5naXRodWIuaW8vanNyc2FzaWduL2xpY2Vuc2UvXCI+TUlUIExpY2Vuc2U8L2E+XHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIGtqdXIncyBjbGFzcyBsaWJyYXJ5IG5hbWUgc3BhY2VcclxuICAgICAqIDxwPlxyXG4gICAgICogVGhpcyBuYW1lIHNwYWNlIHByb3ZpZGVzIGZvbGxvd2luZyBuYW1lIHNwYWNlczpcclxuICAgICAqIDx1bD5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5hc24xfSAtIEFTTi4xIHByaW1pdGl2ZSBoZXhhZGVjaW1hbCBlbmNvZGVyPC9saT5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5hc24xLng1MDl9IC0gQVNOLjEgc3RydWN0dXJlIGZvciBYLjUwOSBjZXJ0aWZpY2F0ZSBhbmQgQ1JMPC9saT5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5jcnlwdG99IC0gSmF2YSBDcnlwdG9ncmFwaGljIEV4dGVuc2lvbihKQ0UpIHN0eWxlIE1lc3NhZ2VEaWdlc3QvU2lnbmF0dXJlXHJcbiAgICAgKiBjbGFzcyBhbmQgdXRpbGl0aWVzPC9saT5cclxuICAgICAqIDwvdWw+XHJcbiAgICAgKiA8L3A+XHJcbiAgICAgKiBOT1RFOiBQbGVhc2UgaWdub3JlIG1ldGhvZCBzdW1tYXJ5IGFuZCBkb2N1bWVudCBvZiB0aGlzIG5hbWVzcGFjZS4gVGhpcyBjYXVzZWQgYnkgYSBidWcgb2YganNkb2MyLlxyXG4gICAgICogQG5hbWUgS0pVUlxyXG4gICAgICogQG5hbWVzcGFjZSBranVyJ3MgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIHZhciBLSlVSID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBranVyJ3MgQVNOLjEgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXHJcbiAgICAgKiA8cD5cclxuICAgICAqIFRoaXMgaXMgSVRVLVQgWC42OTAgQVNOLjEgREVSIGVuY29kZXIgY2xhc3MgbGlicmFyeSBhbmRcclxuICAgICAqIGNsYXNzIHN0cnVjdHVyZSBhbmQgbWV0aG9kcyBpcyB2ZXJ5IHNpbWlsYXIgdG9cclxuICAgICAqIG9yZy5ib3VuY3ljYXN0bGUuYXNuMSBwYWNrYWdlIG9mXHJcbiAgICAgKiB3ZWxsIGtub3duIEJvdW5jeUNhc2x0ZSBDcnlwdG9ncmFwaHkgTGlicmFyeS5cclxuICAgICAqIDxoND5QUk9WSURJTkcgQVNOLjEgUFJJTUlUSVZFUzwvaDQ+XHJcbiAgICAgKiBIZXJlIGFyZSBBU04uMSBERVIgcHJpbWl0aXZlIGNsYXNzZXMuXHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+MHgwMSB7QGxpbmsgS0pVUi5hc24xLkRFUkJvb2xlYW59PC9saT5cclxuICAgICAqIDxsaT4weDAyIHtAbGluayBLSlVSLmFzbjEuREVSSW50ZWdlcn08L2xpPlxyXG4gICAgICogPGxpPjB4MDMge0BsaW5rIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmd9PC9saT5cclxuICAgICAqIDxsaT4weDA0IHtAbGluayBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmd9PC9saT5cclxuICAgICAqIDxsaT4weDA1IHtAbGluayBLSlVSLmFzbjEuREVSTnVsbH08L2xpPlxyXG4gICAgICogPGxpPjB4MDYge0BsaW5rIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyfTwvbGk+XHJcbiAgICAgKiA8bGk+MHgwYSB7QGxpbmsgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWR9PC9saT5cclxuICAgICAqIDxsaT4weDBjIHtAbGluayBLSlVSLmFzbjEuREVSVVRGOFN0cmluZ308L2xpPlxyXG4gICAgICogPGxpPjB4MTIge0BsaW5rIEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nfTwvbGk+XHJcbiAgICAgKiA8bGk+MHgxMyB7QGxpbmsgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZ308L2xpPlxyXG4gICAgICogPGxpPjB4MTQge0BsaW5rIEtKVVIuYXNuMS5ERVJUZWxldGV4U3RyaW5nfTwvbGk+XHJcbiAgICAgKiA8bGk+MHgxNiB7QGxpbmsgS0pVUi5hc24xLkRFUklBNVN0cmluZ308L2xpPlxyXG4gICAgICogPGxpPjB4MTcge0BsaW5rIEtKVVIuYXNuMS5ERVJVVENUaW1lfTwvbGk+XHJcbiAgICAgKiA8bGk+MHgxOCB7QGxpbmsgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZX08L2xpPlxyXG4gICAgICogPGxpPjB4MzAge0BsaW5rIEtKVVIuYXNuMS5ERVJTZXF1ZW5jZX08L2xpPlxyXG4gICAgICogPGxpPjB4MzEge0BsaW5rIEtKVVIuYXNuMS5ERVJTZXR9PC9saT5cclxuICAgICAqIDwvdWw+XHJcbiAgICAgKiA8aDQ+T1RIRVIgQVNOLjEgQ0xBU1NFUzwvaDQ+XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5BU04xT2JqZWN0fTwvbGk+XHJcbiAgICAgKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ308L2xpPlxyXG4gICAgICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lfTwvbGk+XHJcbiAgICAgKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWR9PC9saT5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdH08L2xpPlxyXG4gICAgICogPC91bD5cclxuICAgICAqIDxoND5TVUIgTkFNRSBTUEFDRVM8L2g0PlxyXG4gICAgICogPHVsPlxyXG4gICAgICogPGxpPntAbGluayBLSlVSLmFzbjEuY2FkZXN9IC0gQ0FkRVMgbG9uZyB0ZXJtIHNpZ25hdHVyZSBmb3JtYXQ8L2xpPlxyXG4gICAgICogPGxpPntAbGluayBLSlVSLmFzbjEuY21zfSAtIENyeXB0b2dyYXBoaWMgTWVzc2FnZSBTeW50YXg8L2xpPlxyXG4gICAgICogPGxpPntAbGluayBLSlVSLmFzbjEuY3NyfSAtIENlcnRpZmljYXRlIFNpZ25pbmcgUmVxdWVzdCAoQ1NSL1BLQ1MjMTApPC9saT5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5hc24xLnRzcH0gLSBSRkMgMzE2MSBUaW1lc3RhbXBpbmcgUHJvdG9jb2wgRm9ybWF0PC9saT5cclxuICAgICAqIDxsaT57QGxpbmsgS0pVUi5hc24xLng1MDl9IC0gUkZDIDUyODAgWC41MDkgY2VydGlmaWNhdGUgYW5kIENSTDwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICogPC9wPlxyXG4gICAgICogTk9URTogUGxlYXNlIGlnbm9yZSBtZXRob2Qgc3VtbWFyeSBhbmQgZG9jdW1lbnQgb2YgdGhpcyBuYW1lc3BhY2UuXHJcbiAgICAgKiBUaGlzIGNhdXNlZCBieSBhIGJ1ZyBvZiBqc2RvYzIuXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjFcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG4gICAgaWYgKHR5cGVvZiBLSlVSLmFzbjEgPT0gXCJ1bmRlZmluZWRcIiB8fCAhS0pVUi5hc24xKSBLSlVSLmFzbjEgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFTTjEgdXRpbGl0aWVzIGNsYXNzXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuQVNOMVV0aWxcclxuICAgICAqIEBjbGFzcyBBU04xIHV0aWxpdGllcyBjbGFzc1xyXG4gICAgICogQHNpbmNlIGFzbjEgMS4wLjJcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkFTTjFVdGlsID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmludGVnZXJUb0J5dGVIZXggPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICB2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICBpZiAoKGgubGVuZ3RoICUgMikgPT0gMSkgaCA9ICcwJyArIGg7XHJcbiAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5iaWdJbnRUb01pblR3b3NDb21wbGVtZW50c0hleCA9IGZ1bmN0aW9uIChiaWdJbnRlZ2VyVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGggPSBiaWdJbnRlZ2VyVmFsdWUudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICBpZiAoaC5zdWJzdHIoMCwgMSkgIT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaC5sZW5ndGggJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBoID0gJzAnICsgaDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoLm1hdGNoKC9eWzAtN10vKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoID0gJzAwJyArIGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhQb3MgPSBoLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgICAgIHZhciB4b3JMZW4gPSBoUG9zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmICh4b3JMZW4gJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB4b3JMZW4gKz0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoLm1hdGNoKC9eWzAtN10vKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4b3JMZW4gKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaE1hc2sgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeG9yTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBoTWFzayArPSAnZic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYmlNYXNrID0gbmV3IEJpZ0ludGVnZXIoaE1hc2ssIDE2KTtcclxuICAgICAgICAgICAgICAgIHZhciBiaU5lZyA9IGJpTWFzay54b3IoYmlnSW50ZWdlclZhbHVlKS5hZGQoQmlnSW50ZWdlci5PTkUpO1xyXG4gICAgICAgICAgICAgICAgaCA9IGJpTmVnLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9eLS8sICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldCBQRU0gc3RyaW5nIGZyb20gaGV4YWRlY2ltYWwgZGF0YSBhbmQgaGVhZGVyIHN0cmluZ1xyXG4gICAgICAgICAqIEBuYW1lIGdldFBFTVN0cmluZ0Zyb21IZXhcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFIZXggaGV4YWRlY2ltYWwgc3RyaW5nIG9mIFBFTSBib2R5XHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBlbUhlYWRlciBQRU0gaGVhZGVyIHN0cmluZyAoZXguICdSU0EgUFJJVkFURSBLRVknKVxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gUEVNIGZvcm1hdHRlZCBzdHJpbmcgb2YgaW5wdXQgZGF0YVxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGNvbnZlcnRzIGEgaGV4YWRlY2ltYWwgc3RyaW5nIHRvIGEgUEVNIHN0cmluZyB3aXRoXHJcbiAgICAgICAgICogYSBzcGVjaWZpZWQgaGVhZGVyLiBJdHMgbGluZSBicmVhayB3aWxsIGJlIENSTEYoXCJcXHJcXG5cIikuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiB2YXIgcGVtICA9IEtKVVIuYXNuMS5BU04xVXRpbC5nZXRQRU1TdHJpbmdGcm9tSGV4KCc2MTYxNjEnLCAnUlNBIFBSSVZBVEUgS0VZJyk7XHJcbiAgICAgICAgICogLy8gdmFsdWUgb2YgcGVtIHdpbGwgYmU6XHJcbiAgICAgICAgICogLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXHJcbiAgICAgICAgICogWVdGaFxyXG4gICAgICAgICAqIC0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldFBFTVN0cmluZ0Zyb21IZXggPSBmdW5jdGlvbiAoZGF0YUhleCwgcGVtSGVhZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoZXh0b3BlbShkYXRhSGV4LCBwZW1IZWFkZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdlbmVyYXRlIEFTTjFPYmplY3Qgc3BlY2lmZWQgYnkgSlNPTiBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICogQG5hbWUgbmV3T2JqZWN0XHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xVXRpbFxyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtIEpTT04gcGFyYW1ldGVyIHRvIGdlbmVyYXRlIEFTTjFPYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJuIHtLSlVSLmFzbjEuQVNOMU9iamVjdH0gZ2VuZXJhdGVkIG9iamVjdFxyXG4gICAgICAgICAqIEBzaW5jZSBhc24xIDEuMC4zXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICogZ2VuZXJhdGUgYW55IEFTTjFPYmplY3Qgc3BlY2lmaWVkIGJ5IEpTT04gcGFyYW1cclxuICAgICAgICAgKiBpbmNsdWRpbmcgQVNOLjEgcHJpbWl0aXZlIG9yIHN0cnVjdHVyZWQuXHJcbiAgICAgICAgICogR2VuZXJhbGx5ICdwYXJhbScgY2FuIGJlIGRlc2NyaWJlZCBhcyBmb2xsb3dzOlxyXG4gICAgICAgICAqIDxibG9ja3F1b3RlPlxyXG4gICAgICAgICAqIHtUWVBFLU9GLUFTTk9CSjogQVNOMU9CSi1QQVJBTUVURVJ9XHJcbiAgICAgICAgICogPC9ibG9ja3F1b3RlPlxyXG4gICAgICAgICAqICdUWVBFLU9GLUFTTjFPQkonIGNhbiBiZSBvbmUgb2YgZm9sbG93aW5nIHN5bWJvbHM6XHJcbiAgICAgICAgICogPHVsPlxyXG4gICAgICAgICAqIDxsaT4nYm9vbCcgLSBERVJCb29sZWFuPC9saT5cclxuICAgICAgICAgKiA8bGk+J2ludCcgLSBERVJJbnRlZ2VyPC9saT5cclxuICAgICAgICAgKiA8bGk+J2JpdHN0cicgLSBERVJCaXRTdHJpbmc8L2xpPlxyXG4gICAgICAgICAqIDxsaT4nb2N0c3RyJyAtIERFUk9jdGV0U3RyaW5nPC9saT5cclxuICAgICAgICAgKiA8bGk+J251bGwnIC0gREVSTnVsbDwvbGk+XHJcbiAgICAgICAgICogPGxpPidvaWQnIC0gREVST2JqZWN0SWRlbnRpZmllcjwvbGk+XHJcbiAgICAgICAgICogPGxpPidlbnVtJyAtIERFUkVudW1lcmF0ZWQ8L2xpPlxyXG4gICAgICAgICAqIDxsaT4ndXRmOHN0cicgLSBERVJVVEY4U3RyaW5nPC9saT5cclxuICAgICAgICAgKiA8bGk+J251bXN0cicgLSBERVJOdW1lcmljU3RyaW5nPC9saT5cclxuICAgICAgICAgKiA8bGk+J3BybnN0cicgLSBERVJQcmludGFibGVTdHJpbmc8L2xpPlxyXG4gICAgICAgICAqIDxsaT4ndGVsc3RyJyAtIERFUlRlbGV0ZXhTdHJpbmc8L2xpPlxyXG4gICAgICAgICAqIDxsaT4naWE1c3RyJyAtIERFUklBNVN0cmluZzwvbGk+XHJcbiAgICAgICAgICogPGxpPid1dGN0aW1lJyAtIERFUlVUQ1RpbWU8L2xpPlxyXG4gICAgICAgICAqIDxsaT4nZ2VudGltZScgLSBERVJHZW5lcmFsaXplZFRpbWU8L2xpPlxyXG4gICAgICAgICAqIDxsaT4nc2VxJyAtIERFUlNlcXVlbmNlPC9saT5cclxuICAgICAgICAgKiA8bGk+J3NldCcgLSBERVJTZXQ8L2xpPlxyXG4gICAgICAgICAqIDxsaT4ndGFnJyAtIERFUlRhZ2dlZE9iamVjdDwvbGk+XHJcbiAgICAgICAgICogPC91bD5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIG5ld09iamVjdCh7J3BybnN0cic6ICdhYWEnfSk7XHJcbiAgICAgICAgICogbmV3T2JqZWN0KHsnc2VxJzogW3snaW50JzogM30sIHsncHJuc3RyJzogJ2FhYSd9XX0pXHJcbiAgICAgICAgICogLy8gQVNOLjEgVGFnZ2VkIE9iamVjdFxyXG4gICAgICAgICAqIG5ld09iamVjdCh7J3RhZyc6IHsndGFnJzogJ2ExJyxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgJ2V4cGxpY2l0JzogdHJ1ZSxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgJ29iaic6IHsnc2VxJzogW3snaW50JzogM30sIHsncHJuc3RyJzogJ2FhYSd9XX19fSk7XHJcbiAgICAgICAgICogLy8gbW9yZSBzaW1wbGUgcmVwcmVzZW50YXRpb24gb2YgQVNOLjEgVGFnZ2VkIE9iamVjdFxyXG4gICAgICAgICAqIG5ld09iamVjdCh7J3RhZyc6IFsnYTEnLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICB7J3NlcSc6IFtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICB7J2ludCc6IDN9LFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgIHsncHJuc3RyJzogJ2FhYSd9XX1cclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICBdfSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uZXdPYmplY3QgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICAgICAgdmFyIF9LSlVSID0gS0pVUixcclxuICAgICAgICAgICAgICAgIF9LSlVSX2FzbjEgPSBfS0pVUi5hc24xLFxyXG4gICAgICAgICAgICAgICAgX0RFUkJvb2xlYW4gPSBfS0pVUl9hc24xLkRFUkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICBfREVSSW50ZWdlciA9IF9LSlVSX2FzbjEuREVSSW50ZWdlcixcclxuICAgICAgICAgICAgICAgIF9ERVJCaXRTdHJpbmcgPSBfS0pVUl9hc24xLkRFUkJpdFN0cmluZyxcclxuICAgICAgICAgICAgICAgIF9ERVJPY3RldFN0cmluZyA9IF9LSlVSX2FzbjEuREVST2N0ZXRTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBfREVSTnVsbCA9IF9LSlVSX2FzbjEuREVSTnVsbCxcclxuICAgICAgICAgICAgICAgIF9ERVJPYmplY3RJZGVudGlmaWVyID0gX0tKVVJfYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgX0RFUkVudW1lcmF0ZWQgPSBfS0pVUl9hc24xLkRFUkVudW1lcmF0ZWQsXHJcbiAgICAgICAgICAgICAgICBfREVSVVRGOFN0cmluZyA9IF9LSlVSX2FzbjEuREVSVVRGOFN0cmluZyxcclxuICAgICAgICAgICAgICAgIF9ERVJOdW1lcmljU3RyaW5nID0gX0tKVVJfYXNuMS5ERVJOdW1lcmljU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgX0RFUlByaW50YWJsZVN0cmluZyA9IF9LSlVSX2FzbjEuREVSUHJpbnRhYmxlU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgX0RFUlRlbGV0ZXhTdHJpbmcgPSBfS0pVUl9hc24xLkRFUlRlbGV0ZXhTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBfREVSSUE1U3RyaW5nID0gX0tKVVJfYXNuMS5ERVJJQTVTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBfREVSVVRDVGltZSA9IF9LSlVSX2FzbjEuREVSVVRDVGltZSxcclxuICAgICAgICAgICAgICAgIF9ERVJHZW5lcmFsaXplZFRpbWUgPSBfS0pVUl9hc24xLkRFUkdlbmVyYWxpemVkVGltZSxcclxuICAgICAgICAgICAgICAgIF9ERVJTZXF1ZW5jZSA9IF9LSlVSX2FzbjEuREVSU2VxdWVuY2UsXHJcbiAgICAgICAgICAgICAgICBfREVSU2V0ID0gX0tKVVJfYXNuMS5ERVJTZXQsXHJcbiAgICAgICAgICAgICAgICBfREVSVGFnZ2VkT2JqZWN0ID0gX0tKVVJfYXNuMS5ERVJUYWdnZWRPYmplY3QsXHJcbiAgICAgICAgICAgICAgICBfbmV3T2JqZWN0ID0gX0tKVVJfYXNuMS5BU04xVXRpbC5uZXdPYmplY3Q7XHJcblxyXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtKTtcclxuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcImtleSBvZiBwYXJhbSBzaGFsbCBiZSBvbmx5IG9uZS5cIjtcclxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoXCI6Ym9vbDppbnQ6Yml0c3RyOm9jdHN0cjpudWxsOm9pZDplbnVtOnV0ZjhzdHI6bnVtc3RyOnBybnN0cjp0ZWxzdHI6aWE1c3RyOnV0Y3RpbWU6Z2VudGltZTpzZXE6c2V0OnRhZzpcIi5pbmRleE9mKFwiOlwiICsga2V5ICsgXCI6XCIpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJ1bmRlZmluZWQga2V5OiBcIiArIGtleTtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJib29sXCIpIHJldHVybiBuZXcgX0RFUkJvb2xlYW4ocGFyYW1ba2V5XSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJpbnRcIikgcmV0dXJuIG5ldyBfREVSSW50ZWdlcihwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcImJpdHN0clwiKSByZXR1cm4gbmV3IF9ERVJCaXRTdHJpbmcocGFyYW1ba2V5XSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJvY3RzdHJcIikgcmV0dXJuIG5ldyBfREVST2N0ZXRTdHJpbmcocGFyYW1ba2V5XSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJudWxsXCIpIHJldHVybiBuZXcgX0RFUk51bGwocGFyYW1ba2V5XSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJvaWRcIikgcmV0dXJuIG5ldyBfREVST2JqZWN0SWRlbnRpZmllcihwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcImVudW1cIikgcmV0dXJuIG5ldyBfREVSRW51bWVyYXRlZChwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcInV0ZjhzdHJcIikgcmV0dXJuIG5ldyBfREVSVVRGOFN0cmluZyhwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcIm51bXN0clwiKSByZXR1cm4gbmV3IF9ERVJOdW1lcmljU3RyaW5nKHBhcmFtW2tleV0pO1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IFwicHJuc3RyXCIpIHJldHVybiBuZXcgX0RFUlByaW50YWJsZVN0cmluZyhwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcInRlbHN0clwiKSByZXR1cm4gbmV3IF9ERVJUZWxldGV4U3RyaW5nKHBhcmFtW2tleV0pO1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IFwiaWE1c3RyXCIpIHJldHVybiBuZXcgX0RFUklBNVN0cmluZyhwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcInV0Y3RpbWVcIikgcmV0dXJuIG5ldyBfREVSVVRDVGltZShwYXJhbVtrZXldKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcImdlbnRpbWVcIikgcmV0dXJuIG5ldyBfREVSR2VuZXJhbGl6ZWRUaW1lKHBhcmFtW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcInNlcVwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1MaXN0ID0gcGFyYW1ba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhc24xT2JqID0gX25ld09iamVjdChwYXJhbUxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEucHVzaChhc24xT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgX0RFUlNlcXVlbmNlKHsgJ2FycmF5JzogYSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGtleSA9PSBcInNldFwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1MaXN0ID0gcGFyYW1ba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhc24xT2JqID0gX25ld09iamVjdChwYXJhbUxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEucHVzaChhc24xT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgX0RFUlNldCh7ICdhcnJheSc6IGEgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJ0YWdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZ1BhcmFtID0gcGFyYW1ba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFnUGFyYW0pID09PSAnW29iamVjdCBBcnJheV0nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnUGFyYW0ubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gX25ld09iamVjdCh0YWdQYXJhbVsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBfREVSVGFnZ2VkT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWdQYXJhbVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwbGljaXQ6IHRhZ1BhcmFtWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmo6IG9ialxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UGFyYW0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnUGFyYW0uZXhwbGljaXQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFyYW0uZXhwbGljaXQgPSB0YWdQYXJhbS5leHBsaWNpdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnUGFyYW0udGFnICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcmFtLnRhZyA9IHRhZ1BhcmFtLnRhZztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnUGFyYW0ub2JqID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwib2JqIHNoYWxsIGJlIHNwZWNpZmllZCBmb3IgJ3RhZycuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UGFyYW0ub2JqID0gX25ld09iamVjdCh0YWdQYXJhbS5vYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgX0RFUlRhZ2dlZE9iamVjdChuZXdQYXJhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgZW5jb2RlZCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOMU9iamVjdCBzcGVjaWZlZCBieSBKU09OIHBhcmFtZXRlcnNcclxuICAgICAgICAgKiBAbmFtZSBqc29uVG9BU04xSEVYXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xVXRpbFxyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtIEpTT04gcGFyYW1ldGVyIHRvIGdlbmVyYXRlIEFTTjFPYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJuIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04xT2JqZWN0XHJcbiAgICAgICAgICogQHNpbmNlIGFzbjEgMS4wLjRcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAgICAgKiBBcyBmb3IgQVNOLjEgb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIEpTT04gb2JqZWN0LFxyXG4gICAgICAgICAqIHBsZWFzZSBzZWUge0BsaW5rIG5ld09iamVjdH0uXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBqc29uVG9BU04xSEVYKHsncHJuc3RyJzogJ2FhYSd9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmpzb25Ub0FTTjFIRVggPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICAgICAgdmFyIGFzbjFPYmogPSB0aGlzLm5ld09iamVjdChwYXJhbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhc24xT2JqLmdldEVuY29kZWRIZXgoKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBkb3Qgbm90ZWQgb2lkIG51bWJlciBzdHJpbmcgZnJvbSBoZXhhZGVjaW1hbCB2YWx1ZSBvZiBPSURcclxuICAgICAqIEBuYW1lIG9pZEhleFRvSW50XHJcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZXggaGV4YWRlY2ltYWwgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXJcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZG90IG5vdGVkIHN0cmluZyBvZiBvYmplY3QgaWRlbnRpZmllclxyXG4gICAgICogQHNpbmNlIGpzcnNhc2lnbiA0LjguMyBhc24xIDEuMC43XHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIFRoaXMgc3RhdGljIG1ldGhvZCBjb252ZXJ0cyBmcm9tIGhleGFkZWNpbWFsIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZlxyXG4gICAgICogQVNOLjEgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXIgdG8gb2lkIG51bWJlciBzdHJpbmcuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogS0pVUi5hc24xLkFTTjFVdGlsLm9pZEhleFRvSW50KCc1NTA0MDYnKSAmcmFycjsgXCIyLjUuNC42XCJcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkFTTjFVdGlsLm9pZEhleFRvSW50ID0gZnVuY3Rpb24gKGhleCkge1xyXG4gICAgICAgIHZhciBzID0gXCJcIjtcclxuICAgICAgICB2YXIgaTAxID0gcGFyc2VJbnQoaGV4LnN1YnN0cigwLCAyKSwgMTYpO1xyXG4gICAgICAgIHZhciBpMCA9IE1hdGguZmxvb3IoaTAxIC8gNDApO1xyXG4gICAgICAgIHZhciBpMSA9IGkwMSAlIDQwO1xyXG4gICAgICAgIHZhciBzID0gaTAgKyBcIi5cIiArIGkxO1xyXG5cclxuICAgICAgICB2YXIgYmluYnVmID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGhleC5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChoZXguc3Vic3RyKGksIDIpLCAxNik7XHJcbiAgICAgICAgICAgIHZhciBiaW4gPSAoXCIwMDAwMDAwMFwiICsgdmFsdWUudG9TdHJpbmcoMikpLnNsaWNlKC0gOCk7XHJcbiAgICAgICAgICAgIGJpbmJ1ZiA9IGJpbmJ1ZiArIGJpbi5zdWJzdHIoMSwgNyk7XHJcbiAgICAgICAgICAgIGlmIChiaW4uc3Vic3RyKDAsIDEpID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmkgPSBuZXcgQmlnSW50ZWdlcihiaW5idWYsIDIpO1xyXG4gICAgICAgICAgICAgICAgcyA9IHMgKyBcIi5cIiArIGJpLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgIGJpbmJ1ZiA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGhleGFkZWNpbWFsIHZhbHVlIG9mIG9iamVjdCBpZGVudGlmaWVyIGZyb20gZG90IG5vdGVkIG9pZCB2YWx1ZVxyXG4gICAgICogQG5hbWUgb2lkSW50VG9IZXhcclxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMVV0aWxcclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9pZFN0cmluZyBkb3Qgbm90ZWQgc3RyaW5nIG9mIG9iamVjdCBpZGVudGlmaWVyXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHZhbHVlIG9mIG9iamVjdCBpZGVudGlmaWVyXHJcbiAgICAgKiBAc2luY2UganNyc2FzaWduIDQuOC4zIGFzbjEgMS4wLjdcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogVGhpcyBzdGF0aWMgbWV0aG9kIGNvbnZlcnRzIGZyb20gb2JqZWN0IGlkZW50aWZpZXIgdmFsdWUgc3RyaW5nLlxyXG4gICAgICogdG8gaGV4YWRlY2ltYWwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGl0LlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIEtKVVIuYXNuMS5BU04xVXRpbC5vaWRJbnRUb0hleChcIjIuNS40LjZcIikgJnJhcnI7IFwiNTUwNDA2XCJcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkFTTjFVdGlsLm9pZEludFRvSGV4ID0gZnVuY3Rpb24gKG9pZFN0cmluZykge1xyXG4gICAgICAgIHZhciBpdG94ID0gZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgdmFyIGggPSBpLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgaWYgKGgubGVuZ3RoID09IDEpIGggPSAnMCcgKyBoO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgcm9pZHRveCA9IGZ1bmN0aW9uIChyb2lkKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBiaSA9IG5ldyBCaWdJbnRlZ2VyKHJvaWQsIDEwKTtcclxuICAgICAgICAgICAgdmFyIGIgPSBiaS50b1N0cmluZygyKTtcclxuICAgICAgICAgICAgdmFyIHBhZExlbiA9IDcgLSBiLmxlbmd0aCAlIDc7XHJcbiAgICAgICAgICAgIGlmIChwYWRMZW4gPT0gNykgcGFkTGVuID0gMDtcclxuICAgICAgICAgICAgdmFyIGJQYWQgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWRMZW47IGkrKykgYlBhZCArPSAnMCc7XHJcbiAgICAgICAgICAgIGIgPSBiUGFkICsgYjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aCAtIDE7IGkgKz0gNykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGI4ID0gYi5zdWJzdHIoaSwgNyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBiLmxlbmd0aCAtIDcpIGI4ID0gJzEnICsgYjg7XHJcbiAgICAgICAgICAgICAgICBoICs9IGl0b3gocGFyc2VJbnQoYjgsIDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIW9pZFN0cmluZy5tYXRjaCgvXlswLTkuXSskLykpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJtYWxmb3JtZWQgb2lkIHN0cmluZzogXCIgKyBvaWRTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoID0gJyc7XHJcbiAgICAgICAgdmFyIGEgPSBvaWRTdHJpbmcuc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgaTAgPSBwYXJzZUludChhWzBdKSAqIDQwICsgcGFyc2VJbnQoYVsxXSk7XHJcbiAgICAgICAgaCArPSBpdG94KGkwKTtcclxuICAgICAgICBhLnNwbGljZSgwLCAyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaCArPSByb2lkdG94KGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvLyAgQWJzdHJhY3QgQVNOLjEgQ2xhc3Nlc1xyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZXIgb2JqZWN0XHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGNsYXNzIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBlbmNvZGVyIG9iamVjdFxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc01vZGlmaWVkIGZsYWcgd2hldGhlciBpbnRlcm5hbCBkYXRhIHdhcyBjaGFuZ2VkXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gaFRMViBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gaFQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViB0YWcoVClcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBoTCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGxlbmd0aChMKVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGhWIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVilcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuQVNOMU9iamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaFYgPSAnJztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IGhleGFkZWNpbWFsIEFTTi4xIFRMViBsZW5ndGgoTCkgYnl0ZXMgZnJvbSBUTFYgdmFsdWUoVilcclxuICAgICAgICAgKiBAbmFtZSBnZXRMZW5ndGhIZXhGcm9tVmFsdWVcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFPYmplY3QjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGxlbmd0aChMKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0TGVuZ3RoSGV4RnJvbVZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaFYgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmhWID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwidGhpcy5oViBpcyBudWxsIG9yIHVuZGVmaW5lZC5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5oVi5sZW5ndGggJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwidmFsdWUgaGV4IG11c3QgYmUgZXZlbiBsZW5ndGg6IG49XCIgKyBoVi5sZW5ndGggKyBcIix2PVwiICsgdGhpcy5oVjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbiA9IHRoaXMuaFYubGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgdmFyIGhOID0gbi50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIGlmIChoTi5sZW5ndGggJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGhOID0gXCIwXCIgKyBoTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobiA8IDEyOCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhOO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhObGVuID0gaE4ubGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgICAgIGlmIChoTmxlbiA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJBU04uMSBsZW5ndGggdG9vIGxvbmcgdG8gcmVwcmVzZW50IGJ5IDh4OiBuID0gXCIgKyBuLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBoZWFkID0gMTI4ICsgaE5sZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVhZC50b1N0cmluZygxNikgKyBoTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGJ5dGVzXHJcbiAgICAgICAgICogQG5hbWUgZ2V0RW5jb2RlZEhleFxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdCNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFZcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldEVuY29kZWRIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhUTFYgPT0gbnVsbCB8fCB0aGlzLmlzTW9kaWZpZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaFYgPSB0aGlzLmdldEZyZXNoVmFsdWVIZXgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaEwgPSB0aGlzLmdldExlbmd0aEhleEZyb21WYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oVExWID0gdGhpcy5oVCArIHRoaXMuaEwgKyB0aGlzLmhWO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiZmlyc3QgdGltZTogXCIgKyB0aGlzLmhUTFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhUTFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVikgYnl0ZXNcclxuICAgICAgICAgKiBAbmFtZSBnZXRWYWx1ZUhleFxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdCNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVikgYnl0ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldEVuY29kZWRIZXgoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gPT0gQkVHSU4gREVSQWJzdHJhY3RTdHJpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvKipcclxuICAgICAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBzdHJpbmcgY2xhc3Nlc1xyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXHJcbiAgICAgKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cmluZyBjbGFzc2VzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHMgaW50ZXJuYWwgc3RyaW5nIG9mIHZhbHVlXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+c3RyIC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgc3RyaW5nPC9saT5cclxuICAgICAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxyXG4gICAgICogPC91bD5cclxuICAgICAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHN0cmluZyBvYmplY3RcclxuICAgICAgICAgKiBAbmFtZSBnZXRTdHJpbmdcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nI1xyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhIHN0cmluZ1xyXG4gICAgICAgICAqIEBuYW1lIHNldFN0cmluZ1xyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5ld1MgdmFsdWUgYnkgYSBzdHJpbmcgdG8gc2V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbiAobmV3Uykge1xyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnMgPSBuZXdTO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IHZhbHVlIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nXHJcbiAgICAgICAgICogQG5hbWUgc2V0U3RyaW5nSGV4XHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3SGV4U3RyaW5nIHZhbHVlIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0U3RyaW5nSGV4ID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ3N0ciddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtc1snc3RyJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nSGV4KHBhcmFtc1snaGV4J10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZywgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xyXG4gICAgLy8gPT0gRU5EICAgREVSQWJzdHJhY3RTdHJpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy8gPT0gQkVHSU4gREVSQWJzdHJhY3RUaW1lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvKipcclxuICAgICAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBHZW5lcmFsaXplZC9VVENUaW1lIGNsYXNzXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lXHJcbiAgICAgKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIEdlbmVyYWxpemVkL1VUQ1RpbWUgY2xhc3NcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnMTMwNDMwMjM1OTU5Wid9KVxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQHNlZSBLSlVSLmFzbjEuQVNOMU9iamVjdCAtIHN1cGVyY2xhc3NcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gLS0tIFBSSVZBVEUgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMubG9jYWxEYXRlVG9VVEMgPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICB1dGMgPSBkLmdldFRpbWUoKSArIChkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCk7XHJcbiAgICAgICAgICAgIHZhciB1dGNEYXRlID0gbmV3IERhdGUodXRjKTtcclxuICAgICAgICAgICAgcmV0dXJuIHV0Y0RhdGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBmb3JtYXQgZGF0ZSBzdHJpbmcgYnkgRGF0YSBvYmplY3RcclxuICAgICAgICAgKiBAbmFtZSBmb3JtYXREYXRlXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BYnN0cmFjdFRpbWU7XHJcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlT2JqZWN0XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ3V0Yycgb3IgJ2dlbidcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhNaWxsaXMgZmxhZyBmb3Igd2l0aCBtaWxsaXNlY3Rpb25zIG9yIG5vdFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgICAqICd3aXRoTWlsbGlzJyBmbGFnIGlzIHN1cHBvcnRlZCBmcm9tIGFzbjEgMS4wLjYuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5mb3JtYXREYXRlID0gZnVuY3Rpb24gKGRhdGVPYmplY3QsIHR5cGUsIHdpdGhNaWxsaXMpIHtcclxuICAgICAgICAgICAgdmFyIHBhZCA9IHRoaXMuemVyb1BhZGRpbmc7XHJcbiAgICAgICAgICAgIHZhciBkID0gdGhpcy5sb2NhbERhdGVUb1VUQyhkYXRlT2JqZWN0KTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBTdHJpbmcoZC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3V0YycpIHllYXIgPSB5ZWFyLnN1YnN0cigyLCAyKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gcGFkKFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKSwgMik7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBwYWQoU3RyaW5nKGQuZ2V0RGF0ZSgpKSwgMik7XHJcbiAgICAgICAgICAgIHZhciBob3VyID0gcGFkKFN0cmluZyhkLmdldEhvdXJzKCkpLCAyKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9IHBhZChTdHJpbmcoZC5nZXRNaW51dGVzKCkpLCAyKTtcclxuICAgICAgICAgICAgdmFyIHNlYyA9IHBhZChTdHJpbmcoZC5nZXRTZWNvbmRzKCkpLCAyKTtcclxuICAgICAgICAgICAgdmFyIHMgPSB5ZWFyICsgbW9udGggKyBkYXkgKyBob3VyICsgbWluICsgc2VjO1xyXG4gICAgICAgICAgICBpZiAod2l0aE1pbGxpcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pbGxpcyA9IGQuZ2V0TWlsbGlzZWNvbmRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlsbGlzICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc01pbGxpcyA9IHBhZChTdHJpbmcobWlsbGlzKSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc01pbGxpcyA9IHNNaWxsaXMucmVwbGFjZSgvWzBdKyQvLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzID0gcyArIFwiLlwiICsgc01pbGxpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcyArIFwiWlwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuemVyb1BhZGRpbmcgPSBmdW5jdGlvbiAocywgbGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChzLmxlbmd0aCA+PSBsZW4pIHJldHVybiBzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGxlbiAtIHMubGVuZ3RoICsgMSkuam9pbignMCcpICsgcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyAtLS0gUFVCTElDIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxyXG4gICAgICAgICAqIEBuYW1lIGdldFN0cmluZ1xyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lI1xyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHZhbHVlIG9mIHRoaXMgdGltZSBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzZXQgdmFsdWUgYnkgYSBzdHJpbmdcclxuICAgICAgICAgKiBAbmFtZSBzZXRTdHJpbmdcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3UyB2YWx1ZSBieSBhIHN0cmluZyB0byBzZXQgc3VjaCBsaWtlIFwiMTMwNDMwMjM1OTU5WlwiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbiAobmV3Uykge1xyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnMgPSBuZXdTO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gc3RvaGV4KG5ld1MpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhIERhdGUgb2JqZWN0XHJcbiAgICAgICAgICogQG5hbWUgc2V0QnlEYXRlVmFsdWVcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHllYXIgeWVhciBvZiBkYXRlIChleC4gMjAxMylcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IG1vbnRoIG1vbnRoIG9mIGRhdGUgYmV0d2VlbiAxIGFuZCAxMiAoZXguIDEyKVxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gZGF5IGRheSBvZiBtb250aFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaG91ciBob3VycyBvZiBkYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBtaW4gbWludXRlcyBvZiBkYXRlXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBzZWMgc2Vjb25kcyBvZiBkYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRCeURhdGVWYWx1ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW4sIHNlYykge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW4sIHNlYywgMCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ5RGF0ZShkYXRlT2JqZWN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhWO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xyXG4gICAgLy8gPT0gRU5EICAgREVSQWJzdHJhY3RUaW1lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy8gPT0gQkVHSU4gREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvKipcclxuICAgICAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBzdHJ1Y3R1cmVkIGNsYXNzXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXHJcbiAgICAgKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cnVjdHVyZWQgY2xhc3NcclxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFzbjFBcnJheSBpbnRlcm5hbCBhcnJheSBvZiBBU04xT2JqZWN0XHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhcnJheSBvZiBBU04xT2JqZWN0XHJcbiAgICAgICAgICogQG5hbWUgc2V0QnlBU04xT2JqZWN0QXJyYXlcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSBhc24xT2JqZWN0QXJyYXkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEJ5QVNOMU9iamVjdEFycmF5ID0gZnVuY3Rpb24gKGFzbjFPYmplY3RBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFzbjFBcnJheSA9IGFzbjFPYmplY3RBcnJheTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBhcHBlbmQgYW4gQVNOMU9iamVjdCB0byBpbnRlcm5hbCBhcnJheVxyXG4gICAgICAgICAqIEBuYW1lIGFwcGVuZEFTTjFPYmplY3RcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge0FTTjFPYmplY3R9IGFzbjFPYmplY3QgdG8gYWRkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hcHBlbmRBU04xT2JqZWN0ID0gZnVuY3Rpb24gKGFzbjFPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hc24xQXJyYXkucHVzaChhc24xT2JqZWN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFzbjFBcnJheSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbJ2FycmF5J10gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc24xQXJyYXkgPSBwYXJhbXNbJ2FycmF5J107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xyXG5cclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLy8gIEFTTi4xIE9iamVjdCBDbGFzc2VzXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIGZvciBBU04uMSBERVIgQm9vbGVhblxyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUkJvb2xlYW5cclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIEJvb2xlYW5cclxuICAgICAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXHJcbiAgICAgKi9cclxuICAgIEtKVVIuYXNuMS5ERVJCb29sZWFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJCb29sZWFuLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhUID0gXCIwMVwiO1xyXG4gICAgICAgIHRoaXMuaFRMViA9IFwiMDEwMWZmXCI7XHJcbiAgICB9O1xyXG4gICAgWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkJvb2xlYW4sIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIEludGVnZXJcclxuICAgICAqIEBuYW1lIEtKVVIuYXNuMS5ERVJJbnRlZ2VyXHJcbiAgICAgKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBJbnRlZ2VyXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+aW50IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGludGVnZXIgdmFsdWU8L2xpPlxyXG4gICAgICogPGxpPmJpZ2ludCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBCaWdJbnRlZ2VyIG9iamVjdDwvbGk+XHJcbiAgICAgKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cclxuICAgICAqIDwvdWw+XHJcbiAgICAgKiBOT1RFOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUkludGVnZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUkludGVnZXIuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaFQgPSBcIjAyXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBUb20gV3UncyBCaWdJbnRlZ2VyIG9iamVjdFxyXG4gICAgICAgICAqIEBuYW1lIHNldEJ5QmlnSW50ZWdlclxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSSW50ZWdlciNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge0JpZ0ludGVnZXJ9IGJpZ0ludGVnZXJWYWx1ZSB0byBzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEJ5QmlnSW50ZWdlciA9IGZ1bmN0aW9uIChiaWdJbnRlZ2VyVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oViA9IEtKVVIuYXNuMS5BU04xVXRpbC5iaWdJbnRUb01pblR3b3NDb21wbGVtZW50c0hleChiaWdJbnRlZ2VyVmFsdWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXHJcbiAgICAgICAgICogQG5hbWUgc2V0QnlJbnRlZ2VyXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJJbnRlZ2VyXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbnRlZ2VyIHZhbHVlIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0QnlJbnRlZ2VyID0gZnVuY3Rpb24gKGludFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBiaSA9IG5ldyBCaWdJbnRlZ2VyKFN0cmluZyhpbnRWYWx1ZSksIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIoYmkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXHJcbiAgICAgICAgICogQG5hbWUgc2V0VmFsdWVIZXhcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkludGVnZXIjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBpbnRlZ2VyIHZhbHVlXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICogPGJyLz5cclxuICAgICAgICAgKiBOT1RFOiBWYWx1ZSBzaGFsbCBiZSByZXByZXNlbnRlZCBieSBtaW5pbXVtIG9jdGV0IGxlbmd0aCBvZlxyXG4gICAgICAgICAqIHR3bydzIGNvbXBsZW1lbnQgcmVwcmVzZW50YXRpb24uXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoMTIzKTtcclxuICAgICAgICAgKiBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydpbnQnOiAxMjN9KTtcclxuICAgICAgICAgKiBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydoZXgnOiAnMWZhZCd9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldFZhbHVlSGV4ID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1snYmlnaW50J10gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIocGFyYW1zWydiaWdpbnQnXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaW50J10gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zWydpbnQnXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ5SW50ZWdlcihwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zWydoZXgnXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkludGVnZXIsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZWQgQml0U3RyaW5nIHByaW1pdGl2ZVxyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgZW5jb2RlZCBCaXRTdHJpbmcgcHJpbWl0aXZlXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+YmluIC0gc3BlY2lmeSBiaW5hcnkgc3RyaW5nIChleC4gJzEwMTExJyk8L2xpPlxyXG4gICAgICogPGxpPmFycmF5IC0gc3BlY2lmeSBhcnJheSBvZiBib29sZWFuIChleC4gW3RydWUsZmFsc2UsdHJ1ZSx0cnVlXSk8L2xpPlxyXG4gICAgICogPGxpPmhleCAtIHNwZWNpZnkgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIHZhbHVlKFYpIGluY2x1ZGluZyB1bnVzZWQgYml0czwvbGk+XHJcbiAgICAgKiA8bGk+b2JqIC0gc3BlY2lmeSB7QGxpbmsgS0pVUi5hc24xLkFTTjFVdGlsLm5ld09iamVjdH1cclxuICAgICAqIGFyZ3VtZW50IGZvciBcIkJpdFN0cmluZyBlbmNhcHN1bGF0ZXNcIiBzdHJ1Y3R1cmUuPC9saT5cclxuICAgICAqIDwvdWw+XHJcbiAgICAgKiBOT1RFMTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuPGJyLz5cclxuICAgICAqIE5PVEUyOiAnb2JqJyBwYXJhbWV0ZXIgaGF2ZSBiZWVuIHN1cHBvcnRlZCBzaW5jZVxyXG4gICAgICogYXNuMSAxLjAuMTEsIGpzcnNhc2lnbiA2LjEuMSAoMjAxNi1TZXAtMjUpLjxici8+XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gZGVmYXVsdCBjb25zdHJ1Y3RvclxyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKCk7XHJcbiAgICAgKiAvLyBpbml0aWFsaXplIHdpdGggYmluYXJ5IHN0cmluZ1xyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKHtiaW46IFwiMTAxMVwifSk7XHJcbiAgICAgKiAvLyBpbml0aWFsaXplIHdpdGggYm9vbGVhbiBhcnJheVxyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKHthcnJheTogW3RydWUsZmFsc2UsdHJ1ZSx0cnVlXX0pO1xyXG4gICAgICogLy8gaW5pdGlhbGl6ZSB3aXRoIGhleGFkZWNpbWFsIHN0cmluZyAoMDQgaXMgdW51c2VkIGJpdHMpXHJcbiAgICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZyh7aGV4OiBcIjA0YmFjMFwifSk7XHJcbiAgICAgKiAvLyBpbml0aWFsaXplIHdpdGggQVNOMVV0aWwubmV3T2JqZWN0IGFyZ3VtZW50IGZvciBlbmNhcHN1bGF0ZWRcclxuICAgICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7b2JqOiB7c2VxOiBbe2ludDogM30sIHtwcm5zdHI6ICdhYWEnfV19fSk7XHJcbiAgICAgKiAvLyBhYm92ZSBnZW5lcmF0ZXMgYSBBU04uMSBkYXRhIGxpa2UgdGhpczpcclxuICAgICAqIC8vIEJJVCBTVFJJTkcsIGVuY2Fwc3VsYXRlcyB7XHJcbiAgICAgKiAvLyAgIFNFUVVFTkNFIHtcclxuICAgICAqIC8vICAgICBJTlRFR0VSIDNcclxuICAgICAqIC8vICAgICBQcmludGFibGVTdHJpbmcgJ2FhYSdcclxuICAgICAqIC8vICAgICB9XHJcbiAgICAgKiAvLyAgIH1cclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUkJpdFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHBhcmFtcy5vYmogIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIG8gPSBLSlVSLmFzbjEuQVNOMVV0aWwubmV3T2JqZWN0KHBhcmFtcy5vYmopO1xyXG4gICAgICAgICAgICBwYXJhbXMuaGV4ID0gXCIwMFwiICsgby5nZXRFbmNvZGVkSGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaFQgPSBcIjAzXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZyBpbmNsdWRpbmcgdW51c2VkIGJpdHNcclxuICAgICAgICAgKiBAbmFtZSBzZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHNcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZyNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3SGV4U3RyaW5nSW5jbHVkaW5nVW51c2VkQml0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0SGV4VmFsdWVJbmNsdWRpbmdVbnVzZWRCaXRzID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHMpIHtcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oViA9IG5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IEFTTi4xIHZhbHVlKFYpIGJ5IHVudXNlZCBiaXQgYW5kIGhleGFkZWNpbWFsIHN0cmluZyBvZiB2YWx1ZVxyXG4gICAgICAgICAqIEBuYW1lIHNldFVudXNlZEJpdHNBbmRIZXhWYWx1ZVxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQml0U3RyaW5nI1xyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdW51c2VkQml0c1xyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoVmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldFVudXNlZEJpdHNBbmRIZXhWYWx1ZSA9IGZ1bmN0aW9uICh1bnVzZWRCaXRzLCBoVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHVudXNlZEJpdHMgPCAwIHx8IDcgPCB1bnVzZWRCaXRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcInVudXNlZCBiaXRzIHNoYWxsIGJlIGZyb20gMCB0byA3OiB1ID0gXCIgKyB1bnVzZWRCaXRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBoVW51c2VkQml0cyA9IFwiMFwiICsgdW51c2VkQml0cztcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oViA9IGhVbnVzZWRCaXRzICsgaFZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCBBU04uMSBERVIgQml0U3RyaW5nIGJ5IGJpbmFyeSBzdHJpbmc8YnIvPlxyXG4gICAgICAgICAqIEBuYW1lIHNldEJ5QmluYXJ5U3RyaW5nXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGJpbmFyeVN0cmluZyBiaW5hcnkgdmFsdWUgc3RyaW5nIChpLmUuICcxMDExMScpXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICogSXRzIHVudXNlZCBiaXRzIHdpbGwgYmUgY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGxlbmd0aCBvZlxyXG4gICAgICAgICAqICdiaW5hcnlWYWx1ZScuIDxici8+XHJcbiAgICAgICAgICogTk9URTogVHJhaWxpbmcgemVyb3MgJzAnIHdpbGwgYmUgaWdub3JlZC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xyXG4gICAgICAgICAqIG8uc2V0QnlCb29sZWFuQXJyYXkoXCIwMTAxMVwiKTtcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEJ5QmluYXJ5U3RyaW5nID0gZnVuY3Rpb24gKGJpbmFyeVN0cmluZykge1xyXG4gICAgICAgICAgICBiaW5hcnlTdHJpbmcgPSBiaW5hcnlTdHJpbmcucmVwbGFjZSgvMCskLywgJycpO1xyXG4gICAgICAgICAgICB2YXIgdW51c2VkQml0cyA9IDggLSBiaW5hcnlTdHJpbmcubGVuZ3RoICUgODtcclxuICAgICAgICAgICAgaWYgKHVudXNlZEJpdHMgPT0gOCkgdW51c2VkQml0cyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHVudXNlZEJpdHM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYmluYXJ5U3RyaW5nICs9ICcwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeVN0cmluZy5sZW5ndGggLSAxOyBpICs9IDgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBiID0gYmluYXJ5U3RyaW5nLnN1YnN0cihpLCA4KTtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gcGFyc2VJbnQoYiwgMikudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHgubGVuZ3RoID09IDEpIHggPSAnMCcgKyB4O1xyXG4gICAgICAgICAgICAgICAgaCArPSB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaFRMViA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaFYgPSAnMCcgKyB1bnVzZWRCaXRzICsgaDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzZXQgQVNOLjEgVExWIHZhbHVlKFYpIGJ5IGFuIGFycmF5IG9mIGJvb2xlYW48YnIvPlxyXG4gICAgICAgICAqIEBuYW1lIHNldEJ5Qm9vbGVhbkFycmF5XHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHthcnJheX0gYm9vbGVhbkFycmF5IGFycmF5IG9mIGJvb2xlYW4gKGV4LiBbdHJ1ZSwgZmFsc2UsIHRydWVdKVxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgICAqIE5PVEU6IFRyYWlsaW5nIGZhbHNlcyB3aWxsIGJlIGlnbm9yZWQgaW4gdGhlIEFTTi4xIERFUiBPYmplY3QuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcoKTtcclxuICAgICAgICAgKiBvLnNldEJ5Qm9vbGVhbkFycmF5KFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEJ5Qm9vbGVhbkFycmF5ID0gZnVuY3Rpb24gKGJvb2xlYW5BcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgcyA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvb2xlYW5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvb2xlYW5BcnJheVtpXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyArPSAnMSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgKz0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnlCaW5hcnlTdHJpbmcocyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2VuZXJhdGUgYW4gYXJyYXkgb2YgZmFsc2VzIHdpdGggc3BlY2lmaWVkIGxlbmd0aDxici8+XHJcbiAgICAgICAgICogQG5hbWUgbmV3RmFsc2VBcnJheVxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQml0U3RyaW5nXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBuTGVuZ3RoIGxlbmd0aCBvZiBhcnJheSB0byBnZW5lcmF0ZVxyXG4gICAgICAgICAqIEByZXR1cm4ge2FycmF5fSBhcnJheSBvZiBib29sZWFuIGZhbHNlc1xyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgICAqIFRoaXMgc3RhdGljIG1ldGhvZCBtYXkgYmUgdXNlZnVsIHRvIGluaXRpYWxpemUgYm9vbGVhbiBhcnJheS5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xyXG4gICAgICAgICAqIG8ubmV3RmFsc2VBcnJheSgzKSAmcmFycjsgW2ZhbHNlLCBmYWxzZSwgZmFsc2VdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uZXdGYWxzZUFycmF5ID0gZnVuY3Rpb24gKG5MZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBuZXcgQXJyYXkobkxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oVjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09IFwic3RyaW5nXCIgJiYgcGFyYW1zLnRvTG93ZXJDYXNlKCkubWF0Y2goL15bMC05YS1mXSskLykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGV4VmFsdWVJbmNsdWRpbmdVbnVzZWRCaXRzKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHMocGFyYW1zWydoZXgnXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snYmluJ10gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCeUJpbmFyeVN0cmluZyhwYXJhbXNbJ2JpbiddKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydhcnJheSddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnlCb29sZWFuQXJyYXkocGFyYW1zWydhcnJheSddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSQml0U3RyaW5nLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBPY3RldFN0cmluZzxici8+XHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmdcclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE9jdGV0U3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgQVNOLjEgT2N0ZXRTdHJpbmcgc2ltcGxlIHR5cGUuPGJyLz5cclxuICAgICAqIFN1cHBvcnRlZCBcInBhcmFtc1wiIGF0dHJpYnV0ZXMgYXJlOlxyXG4gICAgICogPHVsPlxyXG4gICAgICogPGxpPnN0ciAtIHRvIHNldCBhIHN0cmluZyBhcyBhIHZhbHVlPC9saT5cclxuICAgICAqIDxsaT5oZXggLSB0byBzZXQgYSBoZXhhZGVjaW1hbCBzdHJpbmcgYXMgYSB2YWx1ZTwvbGk+XHJcbiAgICAgKiA8bGk+b2JqIC0gdG8gc2V0IGEgZW5jYXBzdWxhdGVkIEFTTi4xIHZhbHVlIGJ5IEpTT04gb2JqZWN0XHJcbiAgICAgKiB3aGljaCBpcyBkZWZpbmVkIGluIHtAbGluayBLSlVSLmFzbjEuQVNOMVV0aWwubmV3T2JqZWN0fTwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICogTk9URTogQSBwYXJhbWV0ZXIgJ29iaicgaGF2ZSBiZWVuIHN1cHBvcnRlZFxyXG4gICAgICogZm9yIFwiT0NURVQgU1RSSU5HLCBlbmNhcHN1bGF0ZXNcIiBzdHJ1Y3R1cmUuXHJcbiAgICAgKiBzaW5jZSBhc24xIDEuMC4xMSwganNyc2FzaWduIDYuMS4xICgyMDE2LVNlcC0yNSkuXHJcbiAgICAgKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBkZWZhdWx0IGNvbnN0cnVjdG9yXHJcbiAgICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZygpO1xyXG4gICAgICogLy8gaW5pdGlhbGl6ZSB3aXRoIHN0cmluZ1xyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcoe3N0cjogXCJhYWFcIn0pO1xyXG4gICAgICogLy8gaW5pdGlhbGl6ZSB3aXRoIGhleGFkZWNpbWFsIHN0cmluZ1xyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcoe2hleDogXCI2MTYxNjFcIn0pO1xyXG4gICAgICogLy8gaW5pdGlhbGl6ZSB3aXRoIEFTTjFVdGlsLm5ld09iamVjdCBhcmd1bWVudFxyXG4gICAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcoe29iajoge3NlcTogW3tpbnQ6IDN9LCB7cHJuc3RyOiAnYWFhJ31dfX0pO1xyXG4gICAgICogLy8gYWJvdmUgZ2VuZXJhdGVzIGEgQVNOLjEgZGF0YSBsaWtlIHRoaXM6XHJcbiAgICAgKiAvLyBPQ1RFVCBTVFJJTkcsIGVuY2Fwc3VsYXRlcyB7XHJcbiAgICAgKiAvLyAgIFNFUVVFTkNFIHtcclxuICAgICAqIC8vICAgICBJTlRFR0VSIDNcclxuICAgICAqIC8vICAgICBQcmludGFibGVTdHJpbmcgJ2FhYSdcclxuICAgICAqIC8vICAgICB9XHJcbiAgICAgKiAvLyAgIH1cclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcGFyYW1zLm9iaiAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgbyA9IEtKVVIuYXNuMS5BU04xVXRpbC5uZXdPYmplY3QocGFyYW1zLm9iaik7XHJcbiAgICAgICAgICAgIHBhcmFtcy5oZXggPSBvLmdldEVuY29kZWRIZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuaFQgPSBcIjA0XCI7XHJcbiAgICB9O1xyXG4gICAgWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIGZvciBBU04uMSBERVIgTnVsbFxyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUk51bGxcclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE51bGxcclxuICAgICAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXHJcbiAgICAgKi9cclxuICAgIEtKVVIuYXNuMS5ERVJOdWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJOdWxsLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhUID0gXCIwNVwiO1xyXG4gICAgICAgIHRoaXMuaFRMViA9IFwiMDUwMFwiO1xyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJOdWxsLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBPYmplY3RJZGVudGlmaWVyXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllclxyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgT2JqZWN0SWRlbnRpZmllclxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J29pZCc6ICcyLjUuNC41J30pXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+b2lkIC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgb2lkIHN0cmluZyAoZXguIDIuNS40LjEzKTwvbGk+XHJcbiAgICAgKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cclxuICAgICAqIDwvdWw+XHJcbiAgICAgKiBOT1RFOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIGl0b3ggPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICB2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICBpZiAoaC5sZW5ndGggPT0gMSkgaCA9ICcwJyArIGg7XHJcbiAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJvaWR0b3ggPSBmdW5jdGlvbiAocm9pZCkge1xyXG4gICAgICAgICAgICB2YXIgaCA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgYmkgPSBuZXcgQmlnSW50ZWdlcihyb2lkLCAxMCk7XHJcbiAgICAgICAgICAgIHZhciBiID0gYmkudG9TdHJpbmcoMik7XHJcbiAgICAgICAgICAgIHZhciBwYWRMZW4gPSA3IC0gYi5sZW5ndGggJSA3O1xyXG4gICAgICAgICAgICBpZiAocGFkTGVuID09IDcpIHBhZExlbiA9IDA7XHJcbiAgICAgICAgICAgIHZhciBiUGFkID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkTGVuOyBpKyspIGJQYWQgKz0gJzAnO1xyXG4gICAgICAgICAgICBiID0gYlBhZCArIGI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGggLSAxOyBpICs9IDcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBiOCA9IGIuc3Vic3RyKGksIDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gYi5sZW5ndGggLSA3KSBiOCA9ICcxJyArIGI4O1xyXG4gICAgICAgICAgICAgICAgaCArPSBpdG94KHBhcnNlSW50KGI4LCAyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaFQgPSBcIjA2XCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhIGhleGFkZWNpbWFsIHN0cmluZ1xyXG4gICAgICAgICAqIEBuYW1lIHNldFZhbHVlSGV4XHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyI1xyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmcgaGV4YWRlY2ltYWwgdmFsdWUgb2YgT0lEIGJ5dGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUhleCA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5oViA9IG5ld0hleFN0cmluZztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzZXQgdmFsdWUgYnkgYSBPSUQgc3RyaW5nPGJyLz5cclxuICAgICAgICAgKiBAbmFtZSBzZXRWYWx1ZU9pZFN0cmluZ1xyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2lkU3RyaW5nIE9JRCBzdHJpbmcgKGV4LiAyLjUuNC4xMylcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIoKTtcclxuICAgICAgICAgKiBvLnNldFZhbHVlT2lkU3RyaW5nKFwiMi41LjQuMTNcIik7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZU9pZFN0cmluZyA9IGZ1bmN0aW9uIChvaWRTdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFvaWRTdHJpbmcubWF0Y2goL15bMC05Ll0rJC8pKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIm1hbGZvcm1lZCBvaWQgc3RyaW5nOiBcIiArIG9pZFN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaCA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgYSA9IG9pZFN0cmluZy5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICB2YXIgaTAgPSBwYXJzZUludChhWzBdKSAqIDQwICsgcGFyc2VJbnQoYVsxXSk7XHJcbiAgICAgICAgICAgIGggKz0gaXRveChpMCk7XHJcbiAgICAgICAgICAgIGEuc3BsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGggKz0gcm9pZHRveChhW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gaDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzZXQgdmFsdWUgYnkgYSBPSUQgbmFtZVxyXG4gICAgICAgICAqIEBuYW1lIHNldFZhbHVlTmFtZVxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2lkTmFtZSBPSUQgbmFtZSAoZXguICdzZXJ2ZXJBdXRoJylcclxuICAgICAgICAgKiBAc2luY2UgMS4wLjFcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAgICAgKiBPSUQgbmFtZSBzaGFsbCBiZSBkZWZpbmVkIGluICdLSlVSLmFzbjEueDUwOS5PSUQubmFtZTJvaWRMaXN0Jy5cclxuICAgICAgICAgKiBPdGhlcndpc2UgcmFpc2UgZXJyb3IuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyKCk7XHJcbiAgICAgICAgICogby5zZXRWYWx1ZU5hbWUoXCJzZXJ2ZXJBdXRoXCIpO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVOYW1lID0gZnVuY3Rpb24gKG9pZE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIG9pZCA9IEtKVVIuYXNuMS54NTA5Lk9JRC5uYW1lMm9pZChvaWROYW1lKTtcclxuICAgICAgICAgICAgaWYgKG9pZCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcob2lkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiREVST2JqZWN0SWRlbnRpZmllciBvaWROYW1lIHVuZGVmaW5lZDogXCIgKyBvaWROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oVjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubWF0Y2goL15bMC0yXS5bMC05Ll0rJC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9pZFN0cmluZyhwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlTmFtZShwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5vaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9pZFN0cmluZyhwYXJhbXMub2lkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuaGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zLmhleCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLm5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU5hbWUocGFyYW1zLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBFbnVtZXJhdGVkXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSRW51bWVyYXRlZFxyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgRW51bWVyYXRlZFxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogPGJyLz5cclxuICAgICAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcclxuICAgICAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICogPHVsPlxyXG4gICAgICogPGxpPmludCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBpbnRlZ2VyIHZhbHVlPC9saT5cclxuICAgICAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxyXG4gICAgICogPC91bD5cclxuICAgICAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIG5ldyBLSlVSLmFzbjEuREVSRW51bWVyYXRlZCgxMjMpO1xyXG4gICAgICogbmV3IEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkKHtpbnQ6IDEyM30pO1xyXG4gICAgICogbmV3IEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkKHtoZXg6ICcxZmFkJ30pO1xyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSRW51bWVyYXRlZCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSRW51bWVyYXRlZC5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMGFcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IHZhbHVlIGJ5IFRvbSBXdSdzIEJpZ0ludGVnZXIgb2JqZWN0XHJcbiAgICAgICAgICogQG5hbWUgc2V0QnlCaWdJbnRlZ2VyXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkI1xyXG4gICAgICAgICAqIEBmdW5jdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7QmlnSW50ZWdlcn0gYmlnSW50ZWdlclZhbHVlIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0QnlCaWdJbnRlZ2VyID0gZnVuY3Rpb24gKGJpZ0ludGVnZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhUTFYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gS0pVUi5hc24xLkFTTjFVdGlsLmJpZ0ludFRvTWluVHdvc0NvbXBsZW1lbnRzSGV4KGJpZ0ludGVnZXJWYWx1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IHZhbHVlIGJ5IGludGVnZXIgdmFsdWVcclxuICAgICAgICAgKiBAbmFtZSBzZXRCeUludGVnZXJcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbnRlZ2VyIHZhbHVlIHRvIHNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0QnlJbnRlZ2VyID0gZnVuY3Rpb24gKGludFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBiaSA9IG5ldyBCaWdJbnRlZ2VyKFN0cmluZyhpbnRWYWx1ZSksIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIoYmkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXHJcbiAgICAgICAgICogQG5hbWUgc2V0VmFsdWVIZXhcclxuICAgICAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBpbnRlZ2VyIHZhbHVlXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICogPGJyLz5cclxuICAgICAgICAgKiBOT1RFOiBWYWx1ZSBzaGFsbCBiZSByZXByZXNlbnRlZCBieSBtaW5pbXVtIG9jdGV0IGxlbmd0aCBvZlxyXG4gICAgICAgICAqIHR3bydzIGNvbXBsZW1lbnQgcmVwcmVzZW50YXRpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUhleCA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5oViA9IG5ld0hleFN0cmluZztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhWO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbJ2ludCddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnlJbnRlZ2VyKHBhcmFtc1snaW50J10pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydoZXgnXSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlSGV4KHBhcmFtc1snaGV4J10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBVVEY4U3RyaW5nXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSVVRGOFN0cmluZ1xyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVVRGOFN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcclxuICAgICAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUlVURjhTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUlVURjhTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMGNcIjtcclxuICAgIH07XHJcbiAgICBZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVVRGOFN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIE51bWVyaWNTdHJpbmdcclxuICAgICAqIEBuYW1lIEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nXHJcbiAgICAgKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBOdW1lcmljU3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcclxuICAgICAgICB0aGlzLmhUID0gXCIxMlwiO1xyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIGZvciBBU04uMSBERVIgUHJpbnRhYmxlU3RyaW5nXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nXHJcbiAgICAgKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBQcmludGFibGVTdHJpbmdcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXHJcbiAgICAgKi9cclxuICAgIEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcclxuICAgICAgICB0aGlzLmhUID0gXCIxM1wiO1xyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBUZWxldGV4U3RyaW5nXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZ1xyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVGVsZXRleFN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcclxuICAgICAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMTRcIjtcclxuICAgIH07XHJcbiAgICBZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIElBNVN0cmluZ1xyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUklBNVN0cmluZ1xyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgSUE1U3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSSUE1U3RyaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJJQTVTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMTZcIjtcclxuICAgIH07XHJcbiAgICBZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSSUE1U3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIGZvciBBU04uMSBERVIgVVRDVGltZVxyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUlVUQ1RpbWVcclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFVUQ1RpbWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnMTMwNDMwMjM1OTU5Wid9KVxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZVxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+c3RyIC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgc3RyaW5nIChleC4nMTMwNDMwMjM1OTU5WicpPC9saT5cclxuICAgICAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxyXG4gICAgICogPGxpPmRhdGUgLSBzcGVjaWZ5IERhdGUgb2JqZWN0LjwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXHJcbiAgICAgKiA8aDQ+RVhBTVBMRVM8L2g0PlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGQxID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKCk7XHJcbiAgICAgKiBkMS5zZXRTdHJpbmcoJzEzMDQzMDEyNTk1OVonKTtcclxuICAgICAqXHJcbiAgICAgKiBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSh7J3N0cic6ICcxMzA0MzAxMjU5NTlaJ30pO1xyXG4gICAgICogZDMgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoeydkYXRlJzogbmV3IERhdGUoRGF0ZS5VVEMoMjAxNSwgMCwgMzEsIDAsIDAsIDAsIDApKX0pO1xyXG4gICAgICogZDQgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoJzEzMDQzMDEyNTk1OVonKTtcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUlVUQ1RpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgS0pVUi5hc24xLkRFUlVUQ1RpbWUuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMTdcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IHZhbHVlIGJ5IGEgRGF0ZSBvYmplY3Q8YnIvPlxyXG4gICAgICAgICAqIEBuYW1lIHNldEJ5RGF0ZVxyXG4gICAgICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSVVRDVGltZSNcclxuICAgICAgICAgKiBAZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVPYmplY3QgRGF0ZSBvYmplY3QgdG8gc2V0IEFTTi4xIHZhbHVlKFYpXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKCk7XHJcbiAgICAgICAgICogby5zZXRCeURhdGUobmV3IERhdGUoXCIyMDE2LzEyLzMxXCIpKTtcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEJ5RGF0ZSA9IGZ1bmN0aW9uIChkYXRlT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaFRMViA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVPYmplY3Q7XHJcbiAgICAgICAgICAgIHRoaXMucyA9IHRoaXMuZm9ybWF0RGF0ZSh0aGlzLmRhdGUsICd1dGMnKTtcclxuICAgICAgICAgICAgdGhpcy5oViA9IHN0b2hleCh0aGlzLnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRhdGUgPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5zID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnMgPSB0aGlzLmZvcm1hdERhdGUodGhpcy5kYXRlLCAndXRjJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuc3RyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtcy5zdHIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJzdHJpbmdcIiAmJiBwYXJhbXMubWF0Y2goL15bMC05XXsxMn1aJC8pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5oZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmdIZXgocGFyYW1zLmhleCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmRhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCeURhdGUocGFyYW1zLmRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJVVENUaW1lLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lKTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIEdlbmVyYWxpemVkVGltZVxyXG4gICAgICogQG5hbWUgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZVxyXG4gICAgICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWRUaW1lXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzIwMTMwNDMwMjM1OTU5Wid9KVxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSB3aXRoTWlsbGlzIGZsYWcgdG8gc2hvdyBtaWxsaXNlY29uZHMgb3Igbm90XHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXHJcbiAgICAgKiBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgICAqIDx1bD5cclxuICAgICAqIDxsaT5zdHIgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBzdHJpbmcgKGV4LicyMDEzMDQzMDIzNTk1OVonKTwvbGk+XHJcbiAgICAgKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cclxuICAgICAqIDxsaT5kYXRlIC0gc3BlY2lmeSBEYXRlIG9iamVjdC48L2xpPlxyXG4gICAgICogPGxpPm1pbGxpcyAtIHNwZWNpZnkgZmxhZyB0byBzaG93IG1pbGxpc2Vjb25kcyAoZnJvbSAxLjAuNik8L2xpPlxyXG4gICAgICogPC91bD5cclxuICAgICAqIE5PVEUxOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cclxuICAgICAqIE5PVEUyOiAnd2l0aE1pbGxpcycgcHJvcGVydHkgaXMgc3VwcG9ydGVkIGZyb20gYXNuMSAxLjAuNi5cclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuaFQgPSBcIjE4XCI7XHJcbiAgICAgICAgdGhpcy53aXRoTWlsbGlzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhIERhdGUgb2JqZWN0XHJcbiAgICAgICAgICogQG5hbWUgc2V0QnlEYXRlXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWUjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlT2JqZWN0IERhdGUgb2JqZWN0IHRvIHNldCBBU04uMSB2YWx1ZShWKVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogV2hlbiB5b3Ugc3BlY2lmeSBVVEMgdGltZSwgdXNlICdEYXRlLlVUQycgbWV0aG9kIGxpa2UgdGhpczo8YnIvPlxyXG4gICAgICAgICAqIG8xID0gbmV3IERFUlVUQ1RpbWUoKTtcclxuICAgICAgICAgKiBvMS5zZXRCeURhdGUoZGF0ZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMjAxNSwgMCwgMzEsIDIzLCA1OSwgNTksIDApKTsgIzIwMTVKQU4zMSAyMzo1OTo1OVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0QnlEYXRlID0gZnVuY3Rpb24gKGRhdGVPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcclxuICAgICAgICAgICAgdGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ2dlbicsIHRoaXMud2l0aE1pbGxpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucyA9IHRoaXMuZm9ybWF0RGF0ZSh0aGlzLmRhdGUsICdnZW4nLCB0aGlzLndpdGhNaWxsaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oViA9IHN0b2hleCh0aGlzLnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhWO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnN0ciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMuc3RyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09IFwic3RyaW5nXCIgJiYgcGFyYW1zLm1hdGNoKC9eWzAtOV17MTR9WiQvKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuaGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nSGV4KHBhcmFtcy5oZXgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5kYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnlEYXRlKHBhcmFtcy5kYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLm1pbGxpcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aXRoTWlsbGlzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lKTtcclxuXHJcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGFzcyBmb3IgQVNOLjEgREVSIFNlcXVlbmNlXHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSU2VxdWVuY2VcclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFNlcXVlbmNlXHJcbiAgICAgKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXHJcbiAgICAgKiBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgICAqIDx1bD5cclxuICAgICAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXQgZWxlbWVudHMgb2YgY29udGVudDwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXHJcbiAgICAgKi9cclxuICAgIEtKVVIuYXNuMS5ERVJTZXF1ZW5jZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSU2VxdWVuY2Uuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMzBcIjtcclxuICAgICAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hc24xQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhc24xT2JqID0gdGhpcy5hc24xQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBoICs9IGFzbjFPYmouZ2V0RW5jb2RlZEhleCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaFYgPSBoO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oVjtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJTZXF1ZW5jZSwgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCk7XHJcblxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8qKlxyXG4gICAgICogY2xhc3MgZm9yIEFTTi4xIERFUiBTZXRcclxuICAgICAqIEBuYW1lIEtKVVIuYXNuMS5ERVJTZXRcclxuICAgICAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFNldFxyXG4gICAgICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxyXG4gICAgICogZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiA8bGk+YXJyYXkgLSBzcGVjaWZ5IGFycmF5IG9mIEFTTjFPYmplY3QgdG8gc2V0IGVsZW1lbnRzIG9mIGNvbnRlbnQ8L2xpPlxyXG4gICAgICogPGxpPnNvcnRmbGFnIC0gZmxhZyBmb3Igc29ydCAoZGVmYXVsdDogdHJ1ZSkuIEFTTi4xIEJFUiBpcyBub3Qgc29ydGVkIGluICdTRVQgT0YnLjwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICogTk9URTE6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLjxici8+XHJcbiAgICAgKiBOT1RFMjogc29ydGZsYWcgaXMgc3VwcG9ydGVkIHNpbmNlIDEuMC41LlxyXG4gICAgICovXHJcbiAgICBLSlVSLmFzbjEuREVSU2V0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgIEtKVVIuYXNuMS5ERVJTZXQuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5oVCA9IFwiMzFcIjtcclxuICAgICAgICB0aGlzLnNvcnRGbGFnID0gdHJ1ZTsgLy8gaXRlbSBzaGFsbCBiZSBzb3J0ZWQgb25seSBpbiBBU04uMSBERVJcclxuICAgICAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hc24xQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhc24xT2JqID0gdGhpcy5hc24xQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBhLnB1c2goYXNuMU9iai5nZXRFbmNvZGVkSGV4KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnRGbGFnID09IHRydWUpIGEuc29ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhWID0gYS5qb2luKCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaFY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy5zb3J0ZmxhZyAhPSBcInVuZGVmaW5lZFwiICYmXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuc29ydGZsYWcgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJTZXQsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQpO1xyXG5cclxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvKipcclxuICAgICAqIGNsYXNzIGZvciBBU04uMSBERVIgVGFnZ2VkT2JqZWN0XHJcbiAgICAgKiBAbmFtZSBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0XHJcbiAgICAgKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBUYWdnZWRPYmplY3RcclxuICAgICAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBQYXJhbWV0ZXIgJ3RhZ05vTmV4JyBpcyBBU04uMSB0YWcoVCkgdmFsdWUgZm9yIHRoaXMgb2JqZWN0LlxyXG4gICAgICogRm9yIGV4YW1wbGUsIGlmIHlvdSBmaW5kICdbMV0nIHRhZyBpbiBhIEFTTi4xIGR1bXAsXHJcbiAgICAgKiAndGFnTm9IZXgnIHdpbGwgYmUgJ2ExJy5cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBBcyBmb3Igb3B0aW9uYWwgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgKkFOWSogb2ZcclxuICAgICAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICogPHVsPlxyXG4gICAgICogPGxpPmV4cGxpY2l0IC0gc3BlY2lmeSB0cnVlIGlmIHRoaXMgaXMgZXhwbGljaXQgdGFnIG90aGVyd2lzZSBmYWxzZVxyXG4gICAgICogICAgIChkZWZhdWx0IGlzICd0cnVlJykuPC9saT5cclxuICAgICAqIDxsaT50YWcgLSBzcGVjaWZ5IHRhZyAoZGVmYXVsdCBpcyAnYTAnIHdoaWNoIG1lYW5zIFswXSk8L2xpPlxyXG4gICAgICogPGxpPm9iaiAtIHNwZWNpZnkgQVNOMU9iamVjdCB3aGljaCBpcyB0YWdnZWQ8L2xpPlxyXG4gICAgICogPC91bD5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkMSA9IG5ldyBLSlVSLmFzbjEuREVSVVRGOFN0cmluZyh7J3N0cic6J2EnfSk7XHJcbiAgICAgKiBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0KHsnb2JqJzogZDF9KTtcclxuICAgICAqIGhleCA9IGQyLmdldEVuY29kZWRIZXgoKTtcclxuICAgICAqL1xyXG4gICAgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0LnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhUID0gXCJhMFwiO1xyXG4gICAgICAgIHRoaXMuaFYgPSAnJztcclxuICAgICAgICB0aGlzLmlzRXhwbGljaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXNuMU9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldCB2YWx1ZSBieSBhbiBBU04xT2JqZWN0XHJcbiAgICAgICAgICogQG5hbWUgc2V0U3RyaW5nXHJcbiAgICAgICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3QjXHJcbiAgICAgICAgICogQGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpc0V4cGxpY2l0RmxhZyBmbGFnIGZvciBleHBsaWNpdC9pbXBsaWNpdCB0YWdcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHRhZ05vSGV4IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSB0YWdcclxuICAgICAgICAgKiBAcGFyYW0ge0FTTjFPYmplY3R9IGFzbjFPYmplY3QgQVNOLjEgdG8gZW5jYXBzdWxhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEFTTjFPYmplY3QgPSBmdW5jdGlvbiAoaXNFeHBsaWNpdEZsYWcsIHRhZ05vSGV4LCBhc24xT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaFQgPSB0YWdOb0hleDtcclxuICAgICAgICAgICAgdGhpcy5pc0V4cGxpY2l0ID0gaXNFeHBsaWNpdEZsYWc7XHJcbiAgICAgICAgICAgIHRoaXMuYXNuMU9iamVjdCA9IGFzbjFPYmplY3Q7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwbGljaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaFYgPSB0aGlzLmFzbjFPYmplY3QuZ2V0RW5jb2RlZEhleCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oVExWID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhWID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaFRMViA9IGFzbjFPYmplY3QuZ2V0RW5jb2RlZEhleCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oVExWID0gdGhpcy5oVExWLnJlcGxhY2UoL14uLi8sIHRhZ05vSGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNb2RpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oVjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zWyd0YWcnXSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhUID0gcGFyYW1zWyd0YWcnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1snZXhwbGljaXQnXSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRXhwbGljaXQgPSBwYXJhbXNbJ2V4cGxpY2l0J107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbJ29iaiddICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXNuMU9iamVjdCA9IHBhcmFtc1snb2JqJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFTTjFPYmplY3QodGhpcy5pc0V4cGxpY2l0LCB0aGlzLmhULCB0aGlzLmFzbjFPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFlBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3QsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBKU0VuY3J5cHRSU0FLZXkgdGhhdCBleHRlbmRzIFRvbSBXdSdzIFJTQSBrZXkgb2JqZWN0LlxyXG4gICAgICogVGhpcyBvYmplY3QgaXMganVzdCBhIGRlY29yYXRvciBmb3IgcGFyc2luZyB0aGUga2V5IHBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBrZXkgLSBUaGUga2V5IGluIHN0cmluZyBmb3JtYXQsIG9yIGFuIG9iamVjdCBjb250YWluaW5nXHJcbiAgICAgKiB0aGUgcGFyYW1ldGVycyBuZWVkZWQgdG8gYnVpbGQgYSBSU0FLZXkgb2JqZWN0LlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHZhciBKU0VuY3J5cHRSU0FLZXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKEpTRW5jcnlwdFJTQUtleSwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBKU0VuY3J5cHRSU0FLZXkoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1cGVyIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICAvLyAgUlNBS2V5LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIElmIGEga2V5IGtleSB3YXMgcHJvdmlkZWQuXHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBzdHJpbmcuLi5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFyc2VLZXkoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEpTRW5jcnlwdFJTQUtleS5oYXNQcml2YXRlS2V5UHJvcGVydHkoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIEpTRW5jcnlwdFJTQUtleS5oYXNQdWJsaWNLZXlQcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB2YWx1ZXMgZm9yIHRoZSBrZXkuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFyc2VQcm9wZXJ0aWVzRnJvbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0aG9kIHRvIHBhcnNlIGEgcGVtIGVuY29kZWQgc3RyaW5nIGNvbnRhaW5pbmcgYm90aCBhIHB1YmxpYyBvciBwcml2YXRlIGtleS5cclxuICAgICAgICAgKiBUaGUgbWV0aG9kIHdpbGwgdHJhbnNsYXRlIHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcgaW4gYSBkZXIgZW5jb2RlZCBzdHJpbmcgYW5kXHJcbiAgICAgICAgICogd2lsbCBwYXJzZSBwcml2YXRlIGtleSBhbmQgcHVibGljIGtleSBwYXJhbWV0ZXJzLiBUaGlzIG1ldGhvZCBhY2NlcHRzIHB1YmxpYyBrZXlcclxuICAgICAgICAgKiBpbiB0aGUgcnNhZW5jcnlwdGlvbiBwa2NzICMxIGZvcm1hdCAob2lkOiAxLjIuODQwLjExMzU0OS4xLjEuMSkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdG9kbyBDaGVjayBob3cgbWFueSByc2EgZm9ybWF0cyB1c2UgdGhlIHNhbWUgZm9ybWF0IG9mIHBrY3MgIzEuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBUaGUgZm9ybWF0IGlzIGRlZmluZWQgYXM6XHJcbiAgICAgICAgICogUHVibGljS2V5SW5mbyA6Oj0gU0VRVUVOQ0Uge1xyXG4gICAgICAgICAqICAgYWxnb3JpdGhtICAgICAgIEFsZ29yaXRobUlkZW50aWZpZXIsXHJcbiAgICAgICAgICogICBQdWJsaWNLZXkgICAgICAgQklUIFNUUklOR1xyXG4gICAgICAgICAqIH1cclxuICAgICAgICAgKiBXaGVyZSBBbGdvcml0aG1JZGVudGlmaWVyIGlzOlxyXG4gICAgICAgICAqIEFsZ29yaXRobUlkZW50aWZpZXIgOjo9IFNFUVVFTkNFIHtcclxuICAgICAgICAgKiAgIGFsZ29yaXRobSAgICAgICBPQkpFQ1QgSURFTlRJRklFUiwgICAgIHRoZSBPSUQgb2YgdGhlIGVuYyBhbGdvcml0aG1cclxuICAgICAgICAgKiAgIHBhcmFtZXRlcnMgICAgICBBTlkgREVGSU5FRCBCWSBhbGdvcml0aG0gT1BUSU9OQUwgKE5VTEwgZm9yIFBLQ1MgIzEpXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqIGFuZCBQdWJsaWNLZXkgaXMgYSBTRVFVRU5DRSBlbmNhcHN1bGF0ZWQgaW4gYSBCSVQgU1RSSU5HXHJcbiAgICAgICAgICogUlNBUHVibGljS2V5IDo6PSBTRVFVRU5DRSB7XHJcbiAgICAgICAgICogICBtb2R1bHVzICAgICAgICAgICBJTlRFR0VSLCAgLS0gblxyXG4gICAgICAgICAqICAgcHVibGljRXhwb25lbnQgICAgSU5URUdFUiAgIC0tIGVcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICogaXQncyBwb3NzaWJsZSB0byBleGFtaW5lIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGtleXMgb2J0YWluZWQgZnJvbSBvcGVuc3NsIHVzaW5nXHJcbiAgICAgICAgICogYW4gYXNuLjEgZHVtcGVyIGFzIHRoZSBvbmUgdXNlZCBoZXJlIHRvIHBhcnNlIHRoZSBjb21wb25lbnRzOiBodHRwOi8vbGFwby5pdC9hc24xanMvXHJcbiAgICAgICAgICogQGFyZ3VtZW50IHtzdHJpbmd9IHBlbSB0aGUgcGVtIGVuY29kZWQgc3RyaW5nLCBjYW4gaW5jbHVkZSB0aGUgQkVHSU4vRU5EIGhlYWRlci9mb290ZXJcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUucGFyc2VLZXkgPSBmdW5jdGlvbiAocGVtKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWx1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHVibGljX2V4cG9uZW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciByZUhleCA9IC9eXFxzKig/OlswLTlBLUZhLWZdWzAtOUEtRmEtZl1cXHMqKSskLztcclxuICAgICAgICAgICAgICAgIHZhciBkZXIgPSByZUhleC50ZXN0KHBlbSkgPyBIZXguZGVjb2RlKHBlbSkgOiBCYXNlNjQudW5hcm1vcihwZW0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFzbjEgPSBBU04xLmRlY29kZShkZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gRml4ZXMgYSBidWcgd2l0aCBPcGVuU1NMIDEuMCsgcHJpdmF0ZSBrZXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXNuMS5zdWIubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNuMSA9IGFzbjEuc3ViWzJdLnN1YlswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhc24xLnN1Yi5sZW5ndGggPT09IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgcHJpdmF0ZSBrZXkuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWx1cyA9IGFzbjEuc3ViWzFdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KG1vZHVsdXMsIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICBwdWJsaWNfZXhwb25lbnQgPSBhc24xLnN1YlsyXS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBpbnRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmUgPSBwYXJzZUludChwdWJsaWNfZXhwb25lbnQsIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpdmF0ZV9leHBvbmVudCA9IGFzbjEuc3ViWzNdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZCA9IHBhcnNlQmlnSW50KHByaXZhdGVfZXhwb25lbnQsIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbWUxID0gYXNuMS5zdWJbNF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wID0gcGFyc2VCaWdJbnQocHJpbWUxLCAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByaW1lMiA9IGFzbjEuc3ViWzVdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucSA9IHBhcnNlQmlnSW50KHByaW1lMiwgMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBvbmVudDEgPSBhc24xLnN1Yls2XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRtcDEgPSBwYXJzZUJpZ0ludChleHBvbmVudDEsIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQyID0gYXNuMS5zdWJbN10uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kbXExID0gcGFyc2VCaWdJbnQoZXhwb25lbnQyLCAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZWZmaWNpZW50ID0gYXNuMS5zdWJbOF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2VmZiA9IHBhcnNlQmlnSW50KGNvZWZmaWNpZW50LCAxNik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhc24xLnN1Yi5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgcHVibGljIGtleS5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYml0X3N0cmluZyA9IGFzbjEuc3ViWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IGJpdF9zdHJpbmcuc3ViWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsdXMgPSBzZXF1ZW5jZS5zdWJbMF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm4gPSBwYXJzZUJpZ0ludChtb2R1bHVzLCAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVibGljX2V4cG9uZW50ID0gc2VxdWVuY2Uuc3ViWzFdLmdldEhleFN0cmluZ1ZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lID0gcGFyc2VJbnQocHVibGljX2V4cG9uZW50LCAxNik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNsYXRlIHJzYSBwYXJhbWV0ZXJzIGluIGEgaGV4IGVuY29kZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIGtleS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRoZSB0cmFuc2xhdGlvbiBmb2xsb3cgdGhlIEFTTi4xIG5vdGF0aW9uIDpcclxuICAgICAgICAgKiBSU0FQcml2YXRlS2V5IDo6PSBTRVFVRU5DRSB7XHJcbiAgICAgICAgICogICB2ZXJzaW9uICAgICAgICAgICBWZXJzaW9uLFxyXG4gICAgICAgICAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cclxuICAgICAgICAgKiAgIHB1YmxpY0V4cG9uZW50ICAgIElOVEVHRVIsICAtLSBlXHJcbiAgICAgICAgICogICBwcml2YXRlRXhwb25lbnQgICBJTlRFR0VSLCAgLS0gZFxyXG4gICAgICAgICAqICAgcHJpbWUxICAgICAgICAgICAgSU5URUdFUiwgIC0tIHBcclxuICAgICAgICAgKiAgIHByaW1lMiAgICAgICAgICAgIElOVEVHRVIsICAtLSBxXHJcbiAgICAgICAgICogICBleHBvbmVudDEgICAgICAgICBJTlRFR0VSLCAgLS0gZCBtb2QgKHAxKVxyXG4gICAgICAgICAqICAgZXhwb25lbnQyICAgICAgICAgSU5URUdFUiwgIC0tIGQgbW9kIChxLTEpXHJcbiAgICAgICAgICogICBjb2VmZmljaWVudCAgICAgICBJTlRFR0VSLCAgLS0gKGludmVyc2Ugb2YgcSkgbW9kIHBcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gIERFUiBFbmNvZGVkIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBwcml2YXRlIGtleVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlQmFzZUtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheTogW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7IGludDogMCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMubiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBpbnQ6IHRoaXMuZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMuZCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMucCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMucSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMuZG1wMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMuZG1xMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMuY29lZmYgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHNlcSA9IG5ldyBLSlVSLmFzbjEuREVSU2VxdWVuY2Uob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXEuZ2V0RW5jb2RlZEhleCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNsYXRlIHJzYSBwYXJhbWV0ZXJzIGluIGEgaGV4IGVuY29kZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIHB1YmxpYyBrZXkuXHJcbiAgICAgICAgICogVGhlIHJlcHJlc2VudGF0aW9uIGZvbGxvdyB0aGUgQVNOLjEgbm90YXRpb24gOlxyXG4gICAgICAgICAqIFB1YmxpY0tleUluZm8gOjo9IFNFUVVFTkNFIHtcclxuICAgICAgICAgKiAgIGFsZ29yaXRobSAgICAgICBBbGdvcml0aG1JZGVudGlmaWVyLFxyXG4gICAgICAgICAqICAgUHVibGljS2V5ICAgICAgIEJJVCBTVFJJTkdcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICogV2hlcmUgQWxnb3JpdGhtSWRlbnRpZmllciBpczpcclxuICAgICAgICAgKiBBbGdvcml0aG1JZGVudGlmaWVyIDo6PSBTRVFVRU5DRSB7XHJcbiAgICAgICAgICogICBhbGdvcml0aG0gICAgICAgT0JKRUNUIElERU5USUZJRVIsICAgICB0aGUgT0lEIG9mIHRoZSBlbmMgYWxnb3JpdGhtXHJcbiAgICAgICAgICogICBwYXJhbWV0ZXJzICAgICAgQU5ZIERFRklORUQgQlkgYWxnb3JpdGhtIE9QVElPTkFMIChOVUxMIGZvciBQS0NTICMxKVxyXG4gICAgICAgICAqIH1cclxuICAgICAgICAgKiBhbmQgUHVibGljS2V5IGlzIGEgU0VRVUVOQ0UgZW5jYXBzdWxhdGVkIGluIGEgQklUIFNUUklOR1xyXG4gICAgICAgICAqIFJTQVB1YmxpY0tleSA6Oj0gU0VRVUVOQ0Uge1xyXG4gICAgICAgICAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cclxuICAgICAgICAgKiAgIHB1YmxpY0V4cG9uZW50ICAgIElOVEVHRVIgICAtLSBlXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IERFUiBFbmNvZGVkIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBwdWJsaWMga2V5XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLmdldFB1YmxpY0Jhc2VLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZXF1ZW5jZSA9IG5ldyBLSlVSLmFzbjEuREVSU2VxdWVuY2Uoe1xyXG4gICAgICAgICAgICAgICAgYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIoeyBvaWQ6IFwiMS4yLjg0MC4xMTM1NDkuMS4xLjFcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUk51bGwoKVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHNlY29uZF9zZXF1ZW5jZSA9IG5ldyBLSlVSLmFzbjEuREVSU2VxdWVuY2Uoe1xyXG4gICAgICAgICAgICAgICAgYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBiaWdpbnQ6IHRoaXMubiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeyBpbnQ6IHRoaXMuZSB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGJpdF9zdHJpbmcgPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7XHJcbiAgICAgICAgICAgICAgICBoZXg6IFwiMDBcIiArIHNlY29uZF9zZXF1ZW5jZS5nZXRFbmNvZGVkSGV4KClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzZXEgPSBuZXcgS0pVUi5hc24xLkRFUlNlcXVlbmNlKHtcclxuICAgICAgICAgICAgICAgIGFycmF5OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Rfc2VxdWVuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYml0X3N0cmluZ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcS5nZXRFbmNvZGVkSGV4KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB3cmFwIHRoZSBzdHJpbmcgaW4gYmxvY2sgb2Ygd2lkdGggY2hhcnMuIFRoZSBkZWZhdWx0IHZhbHVlIGZvciByc2Ega2V5cyBpcyA2NFxyXG4gICAgICAgICAqIGNoYXJhY3RlcnMuXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgcGVtIGVuY29kZWQgc3RyaW5nIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoPTY0XSAtIHRoZSBsZW5ndGggdGhlIHN0cmluZyBoYXMgdG8gYmUgd3JhcHBlZCBhdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHRSU0FLZXkud29yZHdyYXAgPSBmdW5jdGlvbiAoc3RyLCB3aWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDY0O1xyXG4gICAgICAgICAgICBpZiAoIXN0cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcmVnZXggPSBcIiguezEsXCIgKyB3aWR0aCArIFwifSkoICt8JFxcbj8pfCguezEsXCIgKyB3aWR0aCArIFwifSlcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5tYXRjaChSZWdFeHAocmVnZXgsIFwiZ1wiKSkuam9pbihcIlxcblwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBvYmplY3QgY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzIHRvIHBvcHVsYXRlIHRoZSByc2EgbW9kdWx1c1xyXG4gICAgICAgICAqIGFuZCBwdWJsaWMgZXhwb25lbnQgcGFyYW1ldGVycy5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29iaj17fV0gLSBBbiBvYmplY3QgdGhhdCBtYXkgY29udGFpbiB0aGUgdHdvIHB1YmxpYyBrZXlcclxuICAgICAgICAgKiBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBjb250YWlucyBib3RoIHRoZSBtb2R1bHVzIGFuZCB0aGUgcHVibGljIGV4cG9uZW50XHJcbiAgICAgICAgICogcHJvcGVydGllcyAobiBhbmQgZSlcclxuICAgICAgICAgKiBAdG9kbyBjaGVjayBmb3IgdHlwZXMgb2YgbiBhbmQgZS4gTiBzaG91bGQgYmUgYSBwYXJzZWFibGUgYmlnSW50IG9iamVjdCwgRSBzaG91bGRcclxuICAgICAgICAgKiBiZSBhIHBhcnNlYWJsZSBpbnRlZ2VyIG51bWJlclxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSlNFbmNyeXB0UlNBS2V5Lmhhc1B1YmxpY0tleVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICBvYmogPSBvYmogfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqLmhhc093blByb3BlcnR5KFwiblwiKSAmJlxyXG4gICAgICAgICAgICAgICAgb2JqLmhhc093blByb3BlcnR5KFwiZVwiKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgb2JqZWN0IGNvbnRhaW5zIEFMTCB0aGUgcGFyYW1ldGVycyBvZiBhbiBSU0Ega2V5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqPXt9XSAtIEFuIG9iamVjdCB0aGF0IG1heSBjb250YWluIG5pbmUgcnNhIGtleVxyXG4gICAgICAgICAqIHBhcmFtZXRlcnNcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgb2JqZWN0IGNvbnRhaW5zIGFsbCB0aGUgcGFyYW1ldGVycyBuZWVkZWRcclxuICAgICAgICAgKiBAdG9kbyBjaGVjayBmb3IgdHlwZXMgb2YgdGhlIHBhcmFtZXRlcnMgYWxsIHRoZSBwYXJhbWV0ZXJzIGJ1dCB0aGUgcHVibGljIGV4cG9uZW50XHJcbiAgICAgICAgICogc2hvdWxkIGJlIHBhcnNlYWJsZSBiaWdpbnQgb2JqZWN0cywgdGhlIHB1YmxpYyBleHBvbmVudCBzaG91bGQgYmUgYSBwYXJzZWFibGUgaW50ZWdlciBudW1iZXJcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdFJTQUtleS5oYXNQcml2YXRlS2V5UHJvcGVydHkgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IG9iaiB8fCB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmouaGFzT3duUHJvcGVydHkoXCJuXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJlXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJkXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJwXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJxXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJkbXAxXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJkbXExXCIpICYmXHJcbiAgICAgICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoXCJjb2VmZlwiKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJzZSB0aGUgcHJvcGVydGllcyBvZiBvYmogaW4gdGhlIGN1cnJlbnQgcnNhIG9iamVjdC4gT2JqIHNob3VsZCBBVCBMRUFTVFxyXG4gICAgICAgICAqIGluY2x1ZGUgdGhlIG1vZHVsdXMgYW5kIHB1YmxpYyBleHBvbmVudCAobiwgZSkgcGFyYW1ldGVycy5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCBjb250YWluaW5nIHJzYSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLnBhcnNlUHJvcGVydGllc0Zyb20gPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMubiA9IG9iai5uO1xyXG4gICAgICAgICAgICB0aGlzLmUgPSBvYmouZTtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZCA9IG9iai5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gb2JqLnA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEgPSBvYmoucTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG1wMSA9IG9iai5kbXAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbXExID0gb2JqLmRtcTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZWZmID0gb2JqLmNvZWZmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gSlNFbmNyeXB0UlNBS2V5O1xyXG4gICAgfShSU0FLZXkpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMgPSB7fV0gLSBBbiBvYmplY3QgdG8gY3VzdG9taXplIEpTRW5jcnlwdCBiZWhhdmlvdXJcclxuICAgICAqIHBvc3NpYmxlIHBhcmFtZXRlcnMgYXJlOlxyXG4gICAgICogLSBkZWZhdWx0X2tleV9zaXplICAgICAgICB7bnVtYmVyfSAgZGVmYXVsdDogMTAyNCB0aGUga2V5IHNpemUgaW4gYml0XHJcbiAgICAgKiAtIGRlZmF1bHRfcHVibGljX2V4cG9uZW50IHtzdHJpbmd9ICBkZWZhdWx0OiAnMDEwMDAxJyB0aGUgaGV4YWRlY2ltYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHB1YmxpYyBleHBvbmVudFxyXG4gICAgICogLSBsb2cgICAgICAgICAgICAgICAgICAgICB7Ym9vbGVhbn0gZGVmYXVsdDogZmFsc2Ugd2hldGhlciBsb2cgd2Fybi9lcnJvciBvciBub3RcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB2YXIgSlNFbmNyeXB0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEpTRW5jcnlwdChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRfa2V5X3NpemUgPSBwYXJzZUludChvcHRpb25zLmRlZmF1bHRfa2V5X3NpemUsIDEwKSB8fCAxMDI0O1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRfcHVibGljX2V4cG9uZW50ID0gb3B0aW9ucy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCB8fCBcIjAxMDAwMVwiOyAvLyA2NTUzNyBkZWZhdWx0IG9wZW5zc2wgcHVibGljIGV4cG9uZW50IGZvciByc2Ega2V5IHR5cGVcclxuICAgICAgICAgICAgdGhpcy5sb2cgPSBvcHRpb25zLmxvZyB8fCBmYWxzZTtcclxuICAgICAgICAgICAgLy8gVGhlIHByaXZhdGUgYW5kIHB1YmxpYyBrZXkuXHJcbiAgICAgICAgICAgIHRoaXMua2V5ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgcnNhIGtleSBwYXJhbWV0ZXIgKG9uZSBtZXRob2QgaXMgZW5vdWdoIHRvIHNldCBib3RoIHRoZSBwdWJsaWNcclxuICAgICAgICAgKiBhbmQgdGhlIHByaXZhdGUga2V5LCBzaW5jZSB0aGUgcHJpdmF0ZSBrZXkgY29udGFpbnMgdGhlIHB1YmxpYyBrZXkgcGFyYW1lbnRlcnMpXHJcbiAgICAgICAgICogTG9nIGEgd2FybmluZyBpZiBsb2dzIGFyZSBlbmFibGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBrZXkgdGhlIHBlbSBlbmNvZGVkIHN0cmluZyBvciBhbiBvYmplY3QgKHdpdGggb3Igd2l0aG91dCBoZWFkZXIvZm9vdGVyKVxyXG4gICAgICAgICAqIEBwdWJsaWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHQucHJvdG90eXBlLnNldEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9nICYmIHRoaXMua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBIGtleSB3YXMgYWxyZWFkeSBzZXQsIG92ZXJyaWRpbmcgZXhpc3RpbmcuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMua2V5ID0gbmV3IEpTRW5jcnlwdFJTQUtleShrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJveHkgbWV0aG9kIGZvciBzZXRLZXksIGZvciBhcGkgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgICAqIEBzZWUgc2V0S2V5XHJcbiAgICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdC5wcm90b3R5cGUuc2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uIChwcml2a2V5KSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUga2V5LlxyXG4gICAgICAgICAgICB0aGlzLnNldEtleShwcml2a2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3h5IG1ldGhvZCBmb3Igc2V0S2V5LCBmb3IgYXBpIGNvbXBhdGliaWxpdHlcclxuICAgICAgICAgKiBAc2VlIHNldEtleVxyXG4gICAgICAgICAqIEBwdWJsaWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHQucHJvdG90eXBlLnNldFB1YmxpY0tleSA9IGZ1bmN0aW9uIChwdWJrZXkpIHtcclxuICAgICAgICAgICAgLy8gU2V0cyB0aGUgcHVibGljIGtleS5cclxuICAgICAgICAgICAgdGhpcy5zZXRLZXkocHVia2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIGRlY3J5cHQsIGRlY3J5cHQgdGhlIHN0cmluZyB1c2luZyB0aGUgcHJpdmF0ZVxyXG4gICAgICAgICAqIGNvbXBvbmVudHMgb2YgdGhlIHJzYSBrZXkgb2JqZWN0LiBOb3RlIHRoYXQgaWYgdGhlIG9iamVjdCB3YXMgbm90IHNldCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAgICAgKiBvbiB0aGUgZmx5IChieSB0aGUgZ2V0S2V5IG1ldGhvZCkgdXNpbmcgdGhlIHBhcmFtZXRlcnMgcGFzc2VkIGluIHRoZSBKU0VuY3J5cHQgY29uc3RydWN0b3JcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIGJhc2U2NCBlbmNvZGVkIGNyeXB0ZWQgc3RyaW5nIHRvIGRlY3J5cHRcclxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBkZWNyeXB0ZWQgc3RyaW5nXHJcbiAgICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdC5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBkZWNyeXB0ZWQgc3RyaW5nLlxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZGVjcnlwdChiNjR0b2hleChzdHIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJveHkgbWV0aG9kIGZvciBSU0FLZXkgb2JqZWN0J3MgZW5jcnlwdCwgZW5jcnlwdCB0aGUgc3RyaW5nIHVzaW5nIHRoZSBwdWJsaWNcclxuICAgICAgICAgKiBjb21wb25lbnRzIG9mIHRoZSByc2Ega2V5IG9iamVjdC4gTm90ZSB0aGF0IGlmIHRoZSBvYmplY3Qgd2FzIG5vdCBzZXQgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgICAgICogb24gdGhlIGZseSAoYnkgdGhlIGdldEtleSBtZXRob2QpIHVzaW5nIHRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBpbiB0aGUgSlNFbmNyeXB0IGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIGVuY3J5cHRcclxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlbmNyeXB0ZWQgc3RyaW5nIGVuY29kZWQgaW4gYmFzZTY0XHJcbiAgICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdC5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBlbmNyeXB0ZWQgc3RyaW5nLlxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleDJiNjQodGhpcy5nZXRLZXkoKS5lbmNyeXB0KHN0cikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm94eSBtZXRob2QgZm9yIFJTQUtleSBvYmplY3QncyBzaWduLlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgdGhlIHN0cmluZyB0byBzaWduXHJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnZXN0TWV0aG9kIGhhc2ggbWV0aG9kXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGRpZ2VzdE5hbWUgdGhlIG5hbWUgb2YgdGhlIGhhc2ggYWxnb3JpdGhtXHJcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgc2lnbmF0dXJlIGVuY29kZWQgaW4gYmFzZTY0XHJcbiAgICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEpTRW5jcnlwdC5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChzdHIsIGRpZ2VzdE1ldGhvZCwgZGlnZXN0TmFtZSkge1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIFJTQSBzaWduYXR1cmUgb2YgJ3N0cicgaW4gJ2hleCcgZm9ybWF0LlxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleDJiNjQodGhpcy5nZXRLZXkoKS5zaWduKHN0ciwgZGlnZXN0TWV0aG9kLCBkaWdlc3ROYW1lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIHZlcmlmeS5cclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIHRoZSBzdHJpbmcgdG8gdmVyaWZ5XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHNpZ25hdHVyZSB0aGUgc2lnbmF0dXJlIGVuY29kZWQgaW4gYmFzZTY0IHRvIGNvbXBhcmUgdGhlIHN0cmluZyB0b1xyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ2VzdE1ldGhvZCBoYXNoIG1ldGhvZFxyXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHdoZXRoZXIgdGhlIGRhdGEgYW5kIHNpZ25hdHVyZSBtYXRjaFxyXG4gICAgICAgICAqIEBwdWJsaWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHQucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIChzdHIsIHNpZ25hdHVyZSwgZGlnZXN0TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgZGVjcnlwdGVkICdkaWdlc3QnIG9mIHRoZSBzaWduYXR1cmUuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS52ZXJpZnkoc3RyLCBiNjR0b2hleChzaWduYXR1cmUpLCBkaWdlc3RNZXRob2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXR0ZXIgZm9yIHRoZSBjdXJyZW50IEpTRW5jcnlwdFJTQUtleSBvYmplY3QuIElmIGl0IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IG9iamVjdFxyXG4gICAgICAgICAqIHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWRcclxuICAgICAgICAgKiBAcGFyYW0ge2NhbGxiYWNrfSBbY2JdIHRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgaWYgd2Ugd2FudCB0aGUga2V5IHRvIGJlIGdlbmVyYXRlZFxyXG4gICAgICAgICAqIGluIGFuIGFzeW5jIGZhc2hpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7SlNFbmNyeXB0UlNBS2V5fSB0aGUgSlNFbmNyeXB0UlNBS2V5IG9iamVjdFxyXG4gICAgICAgICAqIEBwdWJsaWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBKU0VuY3J5cHQucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAvLyBPbmx5IGNyZWF0ZSBuZXcgaWYgaXQgZG9lcyBub3QgZXhpc3QuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5rZXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdldCBhIG5ldyBwcml2YXRlIGtleS5cclxuICAgICAgICAgICAgICAgIHRoaXMua2V5ID0gbmV3IEpTRW5jcnlwdFJTQUtleSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiICYmIHt9LnRvU3RyaW5nLmNhbGwoY2IpID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleS5nZW5lcmF0ZUFzeW5jKHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSwgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCwgY2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSBrZXkuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleS5nZW5lcmF0ZSh0aGlzLmRlZmF1bHRfa2V5X3NpemUsIHRoaXMuZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEpTRW5jcnlwdC52ZXJzaW9uID0gXCIzLjAuMC1yYy4xXCI7XHJcbiAgICAgICAgcmV0dXJuIEpTRW5jcnlwdDtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgd2luZG93LkpTRW5jcnlwdCA9IEpTRW5jcnlwdDtcclxuXHJcbiAgICBleHBvcnRzLkpTRW5jcnlwdCA9IEpTRW5jcnlwdDtcclxuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEpTRW5jcnlwdDtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5cclxufSkpKTtcclxuIl19
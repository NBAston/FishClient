
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/localEncode/cryptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7833ijv+FI7onGzaJLMY8t', 'cryptor');
// frames/util/localEncode/cryptor.js

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Created by Fabio on 21/05/2017.
 */
var crypto = require('crypto');

var helper = require('./helper'); //const deprecate = require('depreca');


var _require = require('./constants'),
    ALGORITHM = _require.ALGORITHM;
/**
 * Cryptor class
 */


var Cryptor = /*#__PURE__*/function () {
  /**
   * Cryptor constructor
   * @param key
   * @param algorithm
   */
  function Cryptor(key) {
    var algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aes-256-cbc';

    _classCallCheck(this, Cryptor);

    if (typeof key !== 'string') throw new Error('required an string key');
    if (key === '') throw new Error('key cannot be empty');
    if (!ALGORITHM.includes(algorithm)) throw new Error("algorithm ".concat(algorithm, " not supported, use those available: ").concat(ALGORITHM.join(', '))); // Transform to 32 chars

    key = this.constructor.hash(key, 'md5');
    Object.defineProperties(this, {
      algorithm: {
        value: algorithm
      },
      key: {
        value: key
      },
      iv: {
        value: "zadeqxlallllaqer" //key.substr(16)

      },
      options: {
        value: {}
      }
    });
  }
  /**
   * Encode string
   * @param str
   * @return {string}
   */


  _createClass(Cryptor, [{
    key: "encode",
    value: function encode(str) {
      str = helper.normalizeInput(str);
      var cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv, this.options);
      return cipher.update(str, 'utf8', 'hex') + cipher["final"]('hex');
    }
    /**
     * Decode string
     * @param str
     * @return {string}
     */

  }, {
    key: "decode",
    value: function decode(str) {
      str = helper.normalizeInput(str);
      var decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv, this.options);
      var decoded = decipher.update(str, 'hex', 'utf8') + decipher["final"]('utf8');
      return helper.normalizeOutput(decoded);
    }
    /**
     * Get available ciphers
     * @return {array}
     */

  }], [{
    key: "getCiphers",
    value: function getCiphers() {
      return crypto.getCiphers();
    }
    /**
     * Get available hashes
     * @return {array}
     */

  }, {
    key: "getHashes",
    value: function getHashes() {
      return crypto.getHashes();
    }
    /**
     * MD5 hash
     * @param str
     * @returns {*}
     * @deprecated
     */

  }, {
    key: "md5",
    value: function md5(str) {
      //deprecate('md5 is deprecated, use hash method instead. e.g. hash("your string", "md5")');
      return crypto.createHash('md5').update(str).digest('hex');
    }
    /**
     * SHA1 hash
     * @param str
     * @returns {*}
     * @deprecated
     */

  }, {
    key: "sha1",
    value: function sha1(str) {
      //deprecate('sha1 is deprecated, use hash method instead. e.g. hash("your string", "sha1")');
      return crypto.createHash('sha1').update(str).digest('hex');
    }
    /**
     * Creates hash of an string based on available hashes of platform
     * @param str
     * @param hash
     * @returns {*}
     */

  }, {
    key: "hash",
    value: function hash(str, _hash) {
      if (Cryptor.hasHash(_hash)) {
        return crypto.createHash(_hash).update(str).digest('hex');
      } else {
        throw new Error('hash ' + _hash + ' not found in your platform');
      }
    }
    /**
     * Check if hash exists
     * @param hash
     * @returns {boolean}
     */

  }, {
    key: "hasHash",
    value: function hasHash(hash) {
      return Cryptor.getHashes().indexOf(hash) !== -1;
    }
  }]);

  return Cryptor;
}();

module.exports = Cryptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxsb2NhbEVuY29kZVxcY3J5cHRvci5qcyJdLCJuYW1lcyI6WyJjcnlwdG8iLCJyZXF1aXJlIiwiaGVscGVyIiwiQUxHT1JJVEhNIiwiQ3J5cHRvciIsImtleSIsImFsZ29yaXRobSIsIkVycm9yIiwiaW5jbHVkZXMiLCJqb2luIiwiY29uc3RydWN0b3IiLCJoYXNoIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInZhbHVlIiwiaXYiLCJvcHRpb25zIiwic3RyIiwibm9ybWFsaXplSW5wdXQiLCJjaXBoZXIiLCJjcmVhdGVDaXBoZXJpdiIsInVwZGF0ZSIsImRlY2lwaGVyIiwiY3JlYXRlRGVjaXBoZXJpdiIsImRlY29kZWQiLCJub3JtYWxpemVPdXRwdXQiLCJnZXRDaXBoZXJzIiwiZ2V0SGFzaGVzIiwiY3JlYXRlSGFzaCIsImRpZ2VzdCIsImhhc0hhc2giLCJpbmRleE9mIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0EsSUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCLEVBQ0E7OztlQUNvQkEsT0FBTyxDQUFDLGFBQUQ7SUFBcEJFLHFCQUFBQTtBQUNQOzs7OztJQUdNQztBQUVGOzs7OztBQUtBLG1CQUFZQyxHQUFaLEVBQTRDO0FBQUEsUUFBM0JDLFNBQTJCLHVFQUFmLGFBQWU7O0FBQUE7O0FBQ3hDLFFBQUksT0FBT0QsR0FBUCxLQUFlLFFBQW5CLEVBQ0ksTUFBTSxJQUFJRSxLQUFKLENBQVUsd0JBQVYsQ0FBTjtBQUVKLFFBQUlGLEdBQUcsS0FBSyxFQUFaLEVBQ0ksTUFBTSxJQUFJRSxLQUFKLENBQVUscUJBQVYsQ0FBTjtBQUVKLFFBQUksQ0FBQ0osU0FBUyxDQUFDSyxRQUFWLENBQW1CRixTQUFuQixDQUFMLEVBQ0ksTUFBTSxJ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TyxDQUFDdUIsU0FBUixHQUFvQkksT0FBcEIsQ0FBNEJwQixJQUE1QixNQUFzQyxDQUFDLENBQTlDO0FBQ0g7Ozs7OztBQUdMcUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0IsT0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEZhYmlvIG9uIDIxLzA1LzIwMTcuXHJcbiAqL1xyXG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcclxuY29uc3QgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcclxuLy9jb25zdCBkZXByZWNhdGUgPSByZXF1aXJlKCdkZXByZWNhJyk7XHJcbmNvbnN0IHtBTEdPUklUSE19ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcclxuLyoqXHJcbiAqIENyeXB0b3IgY2xhc3NcclxuICovXHJcbmNsYXNzIENyeXB0b3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3J5cHRvciBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIGFsZ29yaXRobVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihrZXksIGFsZ29yaXRobSA9ICdhZXMtMjU2LWNiYycpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmVxdWlyZWQgYW4gc3RyaW5nIGtleScpO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSAnJylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXkgY2Fubm90IGJlIGVtcHR5Jyk7XHJcblxyXG4gICAgICAgIGlmICghQUxHT1JJVEhNLmluY2x1ZGVzKGFsZ29yaXRobSkpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYWxnb3JpdGhtICR7YWxnb3JpdGhtfSBub3Qgc3VwcG9ydGVkLCB1c2UgdGhvc2UgYXZhaWxhYmxlOiAke0FMR09SSVRITS5qb2luKCcsICcpfWApO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2Zvcm0gdG8gMzIgY2hhcnNcclxuICAgICAgICBrZXkgPSB0aGlzLmNvbnN0cnVjdG9yLmhhc2goa2V5LCAnbWQ1Jyk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICAgICAgYWxnb3JpdGhtOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogYWxnb3JpdGhtXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGtleToge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGtleVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpdjoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiemFkZXF4bGFsbGxsYXFlclwiLy9rZXkuc3Vic3RyKDE2KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZToge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5jb2RlIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBlbmNvZGUoc3RyKSB7XHJcbiAgICAgICAgc3RyID0gaGVscGVyLm5vcm1hbGl6ZUlucHV0KHN0cik7XHJcbiAgICAgICAgY29uc3QgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KHRoaXMuYWxnb3JpdGhtLCB0aGlzLmtleSwgdGhpcy5pdiwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gY2lwaGVyLnVwZGF0ZShzdHIsICd1dGY4JywgJ2hleCcpICsgY2lwaGVyLmZpbmFsKCdoZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29kZSBzdHJpbmdcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZGVjb2RlKHN0cikge1xyXG4gICAgICAgIHN0ciA9IGhlbHBlci5ub3JtYWxpemVJbnB1dChzdHIpO1xyXG4gICAgICAgIGNvbnN0IGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyaXYodGhpcy5hbGdvcml0aG0sIHRoaXMua2V5LCB0aGlzLml2LCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNpcGhlci51cGRhdGUoc3RyLCAnaGV4JywgJ3V0ZjgnKSArIGRlY2lwaGVyLmZpbmFsKCd1dGY4Jyk7XHJcbiAgICAgICAgcmV0dXJuIGhlbHBlci5ub3JtYWxpemVPdXRwdXQoZGVjb2RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYXZhaWxhYmxlIGNpcGhlcnNcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Q2lwaGVycygpIHtcclxuICAgICAgICByZXR1cm4gY3J5cHRvLmdldENpcGhlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhdmFpbGFibGUgaGFzaGVzXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEhhc2hlcygpIHtcclxuICAgICAgICByZXR1cm4gY3J5cHRvLmdldEhhc2hlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTUQ1IGhhc2hcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQGRlcHJlY2F0ZWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1kNShzdHIpIHtcclxuICAgICAgICAvL2RlcHJlY2F0ZSgnbWQ1IGlzIGRlcHJlY2F0ZWQsIHVzZSBoYXNoIG1ldGhvZCBpbnN0ZWFkLiBlLmcuIGhhc2goXCJ5b3VyIHN0cmluZ1wiLCBcIm1kNVwiKScpO1xyXG4gICAgICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1JykudXBkYXRlKHN0cikuZGlnZXN0KCdoZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNIQTEgaGFzaFxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hhMShzdHIpIHtcclxuICAgICAgICAvL2RlcHJlY2F0ZSgnc2hhMSBpcyBkZXByZWNhdGVkLCB1c2UgaGFzaCBtZXRob2QgaW5zdGVhZC4gZS5nLiBoYXNoKFwieW91ciBzdHJpbmdcIiwgXCJzaGExXCIpJyk7XHJcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdzaGExJykudXBkYXRlKHN0cikuZGlnZXN0KCdoZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgaGFzaCBvZiBhbiBzdHJpbmcgYmFzZWQgb24gYXZhaWxhYmxlIGhhc2hlcyBvZiBwbGF0Zm9ybVxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHBhcmFtIGhhc2hcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGFzaChzdHIsIGhhc2gpIHtcclxuICAgICAgICBpZiAoQ3J5cHRvci5oYXNIYXNoKGhhc2gpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaChoYXNoKS51cGRhdGUoc3RyKS5kaWdlc3QoJ2hleCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaGFzaCAnICsgaGFzaCArICcgbm90IGZvdW5kIGluIHlvdXIgcGxhdGZvcm0nKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGhhc2ggZXhpc3RzXHJcbiAgICAgKiBAcGFyYW0gaGFzaFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoYXNIYXNoKGhhc2gpIHtcclxuICAgICAgICByZXR1cm4gQ3J5cHRvci5nZXRIYXNoZXMoKS5pbmRleE9mKGhhc2gpICE9PSAtMTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcnlwdG9yO1xyXG5cclxuIl19
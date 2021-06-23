"use strict";
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
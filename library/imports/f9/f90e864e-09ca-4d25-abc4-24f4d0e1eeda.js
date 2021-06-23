"use strict";
cc._RF.push(module, 'f90e8ZOCcpNJavEJPTQ4e7a', 'helper');
// frames/util/localEncode/helper.js

/**
 * Created by Fabio on 07/06/2017.
 */
'use strict';
/**
 * Helper class
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helper = /*#__PURE__*/function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "normalizeInput",

    /**
     * Normalize string
     * @param str
     * @returns {*}
     */
    value: function normalizeInput(str) {
      if (str === null || typeof str === 'undefined') throw new Error('required origin');
      if (_typeof(str) === 'object') str = JSON.stringify(str);
      if (typeof str !== 'string') str = str.toString();
      return str;
    }
    /**
     * If is JSON string then parse
     * @param str
     * @returns {*}
     */

  }, {
    key: "normalizeOutput",
    value: function normalizeOutput(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
  }]);

  return Helper;
}();

module.exports = Helper;

cc._RF.pop();
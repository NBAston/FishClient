
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/localEncode/helper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxsb2NhbEVuY29kZVxcaGVscGVyLmpzIl0sIm5hbWVzIjpbIkhlbHBlciIsInN0ciIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvU3RyaW5nIiwicGFyc2UiLCJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBO0FBRUE7Ozs7Ozs7Ozs7OztJQUdNQTs7Ozs7Ozs7QUFFRjs7Ozs7bUNBS3NCQyxLQUFLO0FBQ3ZCLFVBQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLE9BQU9BLEdBQVAsS0FBZSxXQUFuQyxFQUNJLE1BQU0sSUFBSUMsS0FBSixDQUFVLGlCQUFWLENBQU47QUFFSixVQUFJLFFBQU9ELEdBQVAsTUFBZSxRQUFuQixFQUNJQSxHQUFHLEdBQUdFLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxHQUFmLENBQU47QUFFSixVQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUNJQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0ksUUFBSixFQUFOO0FBRUosYUFBT0osR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O29DQUt1QkEsS0FBSztBQUN4QixVQUFJO0FBQ0EsZUFBT0UsSUFBSSxDQUFDRyxLQUFMLENBQVdMLEdBQVgsQ0FBUDtBQUNILE9BRkQsQ0FFRSxPQUFPTSxDQUFQLEVBQVU7QUFDUixlQUFPTixHQUFQO0FBQ0g7QUFDSjs7Ozs7O0FBR0xPLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlQsTUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEZhYmlvIG9uIDA3LzA2LzIwMTcuXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogSGVscGVyIGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBIZWxwZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9ybWFsaXplIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxpemVJbnB1dChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlcXVpcmVkIG9yaWdpbicpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIHN0ciA9IEpTT04uc3RyaW5naWZ5KHN0cik7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBpcyBKU09OIHN0cmluZyB0aGVuIHBhcnNlXHJcbiAgICAgKiBAcGFyYW0gc3RyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5vcm1hbGl6ZU91dHB1dChzdHIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVscGVyOyJdfQ==
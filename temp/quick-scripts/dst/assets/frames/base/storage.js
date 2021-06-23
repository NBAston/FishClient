
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/storage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b9d3Ibq0xG+Kq6jjiuWd5u', 'storage');
// frames/base/storage.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 存储和读取用户本地缓存数据
 */
var LocalStorage = function LocalStorage() {},
    localStorage = LocalStorage.prototype,
    g_instance = null;
/**
 * 设置缓存数据
 * @param {String} key    数据唯一ID
 * @param {Object} value  需要缓存数据
 */


localStorage.setItem = function (key, value) {
  if (typeof key !== "string") return console.error("传入 key 类型错误");
  if (_typeof(value) !== "object") return console.error("传入 value 类型错误");
  var data = JSON.stringify(value);
  console.log("存入数据", data);
  cc.sys.localStorage.setItem(key, data);
};
/**
 * 获取缓存数据
 * @param {String} key   数据唯一ID
 * @returns Object
 */


localStorage.getItem = function (key) {
  if (typeof key !== "string") return console.error("传入 key 类型错误");
  var data = cc.sys.localStorage.getItem(key);
  console.log("获取数据", data);
  return data ? JSON.parse(data) : data;
};
/**
 * 删除缓存值
 * @param {String} key   数据唯一ID
 */


localStorage.removeItemByKey = function (key) {
  if (typeof key !== "string") return console.error("传入 key 类型错误");
  console.log("删除数据", key);
  cc.sys.localStorage.removeItem(key);
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new LocalStorage();
  }

  return g_instance;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxzdG9yYWdlLmpzIl0sIm5hbWVzIjpbIkxvY2FsU3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsInByb3RvdHlwZSIsImdfaW5zdGFuY2UiLCJzZXRJdGVtIiwia2V5IiwidmFsdWUiLCJjb25zb2xlIiwiZXJyb3IiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvZyIsImNjIiwic3lzIiwiZ2V0SXRlbSIsInBhcnNlIiwicmVtb3ZlSXRlbUJ5S2V5IiwicmVtb3ZlSXRlbSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0EsSUFDQ0EsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBWSxDQUFHLENBRC9CO0FBQUEsSUFFQ0MsWUFBWSxHQUFHRCxZQUFZLENBQUNFLFNBRjdCO0FBQUEsSUFHQ0MsVUFBVSxHQUFHLElBSGQ7QUFLQTs7Ozs7OztBQUtBRixZQUFZLENBQUNHLE9BQWIsR0FBdUIsVUFBVUMsR0FBVixFQUFlQyxLQUFmLEVBQXNCO0FBQzVDLE1BQUksT0FBT0QsR0FBUCxLQUFlLFFBQW5CLEVBQTZCLE9BQU9FLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGFBQWQsQ0FBUDtBQUM3QixNQUFJLFFBQU9GLEtBQVAsTUFBaUIsUUFBckIsRUFBK0IsT0FBT0MsT0FBTyxDQUFDQyxLQUFSLENBQWMsZUFBZCxDQUFQO0FBQy9CLE1BQUlDLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWVMLEtBQWYsQ0FBWDtBQUNBQyxFQUFBQSxPQUFPLENBQUNLLEdBQVIsQ0FBWSxNQUFaLEVBQW9CSCxJQUFwQjtBQUNBSSxFQUFBQSxFQUFFLENBQUNDLEdBQUgsQ0FBT2IsWUFBUCxDQUFvQkcsT0FBcEIsQ0FBNEJDLEdBQTVCLEVBQWlDSSxJQUFqQztBQUNBLENBTkQ7QUFPQTs7Ozs7OztBQUtBUixZQUFZLENBQUNjLE9BQWIsR0FBdUIsVUFBVVYsR0FBVixFQUFlO0FBQ3JDLE1BQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCLE9BQU9FLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGFBQWQsQ0FBUDtBQUM3QixNQUFJQyxJQUFJLEdBQUdJLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPYixZQUFQLENBQW9CYyxPQUFwQixDQUE0QlYsR0FBNUIsQ0FBWDtBQUNBRSxFQUFBQSxPQUFPLENBQUNLLEdBQVIsQ0FBWSxNQUFaLEVBQW9CSCxJQUFwQjtBQUNBLFNBQU9BLElBQUksR0FBR0MsSUFBSSxDQUFDTSxLQUFMLENBQVdQLElBQVgsQ0FBSCxHQUFzQkEsSUFBakM7QUFDQSxDQUxEO0FBTUE7Ozs7OztBQUlBUixZQUFZLENBQUNnQixlQUFiLEdBQStCLFVBQVVaLEdBQVYsRUFBZTtBQUM3QyxNQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QixPQUFPRSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxhQUFkLENBQVA7QUFDN0JELEVBQUFBLE9BQU8sQ0FBQ0ssR0FBUixDQUFZLE1BQVosRUFBb0JQLEdBQXBCO0FBQ0FRLEVBQUFBLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPYixZQUFQLENBQW9CaUIsVUFBcEIsQ0FBK0JiLEdBQS9CO0FBQ0EsQ0FKRDs7QUFLQWMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDNUIsTUFBSSxDQUFDakIsVUFBTCxFQUFpQjtBQUNoQkEsSUFBQUEsVUFBVSxHQUFHLElBQUlILFlBQUosRUFBYjtBQUNBOztBQUNELFNBQU9HLFVBQVA7QUFDQSxDQUxEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5a2Y5YKo5ZKM6K+75Y+W55So5oi35pys5Zyw57yT5a2Y5pWw5o2uXHJcbiAqL1xyXG5sZXRcclxuXHRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7IH0sXHJcblx0bG9jYWxTdG9yYWdlID0gTG9jYWxTdG9yYWdlLnByb3RvdHlwZSxcclxuXHRnX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiDorr7nva7nvJPlrZjmlbDmja5cclxuICogQHBhcmFtIHtTdHJpbmd9IGtleSAgICDmlbDmja7llK/kuIBJRFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgIOmcgOimgee8k+WtmOaVsOaNrlxyXG4gKi9cclxubG9jYWxTdG9yYWdlLnNldEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuS8oOWFpSBrZXkg57G75Z6L6ZSZ6K+vXCIpO1xyXG5cdGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBjb25zb2xlLmVycm9yKFwi5Lyg5YWlIHZhbHVlIOexu+Wei+mUmeivr1wiKTtcclxuXHRsZXQgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuXHRjb25zb2xlLmxvZyhcIuWtmOWFpeaVsOaNrlwiLCBkYXRhKTtcclxuXHRjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTtcclxufVxyXG4vKipcclxuICog6I635Y+W57yT5a2Y5pWw5o2uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgICDmlbDmja7llK/kuIBJRFxyXG4gKiBAcmV0dXJucyBPYmplY3RcclxuICovXHJcbmxvY2FsU3RvcmFnZS5nZXRJdGVtID0gZnVuY3Rpb24gKGtleSkge1xyXG5cdGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSByZXR1cm4gY29uc29sZS5lcnJvcihcIuS8oOWFpSBrZXkg57G75Z6L6ZSZ6K+vXCIpO1xyXG5cdGxldCBkYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblx0Y29uc29sZS5sb2coXCLojrflj5bmlbDmja5cIiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcclxufVxyXG4vKipcclxuICog5Yig6Zmk57yT5a2Y5YC8XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgICDmlbDmja7llK/kuIBJRFxyXG4gKi9cclxubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW1CeUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLkvKDlhaUga2V5IOexu+Wei+mUmeivr1wiKTtcclxuXHRjb25zb2xlLmxvZyhcIuWIoOmZpOaVsOaNrlwiLCBrZXkpXHJcblx0Y2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCFnX2luc3RhbmNlKSB7XHJcblx0XHRnX2luc3RhbmNlID0gbmV3IExvY2FsU3RvcmFnZSgpO1xyXG5cdH1cclxuXHRyZXR1cm4gZ19pbnN0YW5jZTtcclxufTsiXX0=
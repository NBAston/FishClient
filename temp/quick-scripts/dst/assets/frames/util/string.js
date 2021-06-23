
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/string.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c8f8bRBgyVHoIU1CBVYY6OM', 'string');
// frames/util/string.js

"use strict";

/**
 * 自定义字符串格式化函数
 * 例子:
 *  let str = "替换字符串 %s";
 *  str.format("啊啊");
 *  console.log(str) => "替换字符串 啊啊"
 */
String.prototype.format = function () {
  //将arguments转化为数组（ES5中并非严格的数组）
  var args = Array.prototype.slice.call(arguments);
  var count = 0; //通过正则替换%s

  return this.replace(/%s/g, function (s, i) {
    return args[count++];
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxzdHJpbmcuanMiXSwibmFtZXMiOlsiU3RyaW5nIiwicHJvdG90eXBlIiwiZm9ybWF0IiwiYXJncyIsIkFycmF5Iiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiY291bnQiLCJyZXBsYWNlIiwicyIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7QUFPQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixHQUEwQixZQUFZO0FBQ2xDO0FBQ0EsTUFBSUMsSUFBSSxHQUFHQyxLQUFLLENBQUNILFNBQU4sQ0FBZ0JJLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsQ0FBWDtBQUNBLE1BQUlDLEtBQUssR0FBQyxDQUFWLENBSGtDLENBSWxDOztBQUNBLFNBQU8sS0FBS0MsT0FBTCxDQUFhLEtBQWIsRUFBbUIsVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFDbkMsV0FBT1IsSUFBSSxDQUFDSyxLQUFLLEVBQU4sQ0FBWDtBQUNILEdBRk0sQ0FBUDtBQUdILENBUkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDoh6rlrprkuYnlrZfnrKbkuLLmoLzlvI/ljJblh73mlbBcclxuICog5L6L5a2QOlxyXG4gKiAgbGV0IHN0ciA9IFwi5pu/5o2i5a2X56ym5LiyICVzXCI7XHJcbiAqICBzdHIuZm9ybWF0KFwi5ZWK5ZWKXCIpO1xyXG4gKiAgY29uc29sZS5sb2coc3RyKSA9PiBcIuabv+aNouWtl+espuS4siDllYrllYpcIlxyXG4gKi9cclxuU3RyaW5nLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL+WwhmFyZ3VtZW50c+i9rOWMluS4uuaVsOe7hO+8iEVTNeS4reW5tumdnuS4peagvOeahOaVsOe7hO+8iVxyXG4gICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgbGV0IGNvdW50PTA7XHJcbiAgICAvL+mAmui/h+ato+WImeabv+aNoiVzXHJcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8lcy9nLGZ1bmN0aW9uKHMsaSl7XHJcbiAgICAgICAgcmV0dXJuIGFyZ3NbY291bnQrK107XHJcbiAgICB9KTtcclxufTsiXX0=
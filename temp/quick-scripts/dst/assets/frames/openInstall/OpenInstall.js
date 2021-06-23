
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/openInstall/OpenInstall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f91eakeQzlIrKkg6v6hy0BM', 'OpenInstall');
// frames/openInstall/OpenInstall.js

"use strict";

var openinstall = {
  installCallback: function installCallback(appData) {},
  wakeupCallback: function wakeupCallback(appData) {},
  // 初始化
  getInstall: function getInstall(s, callback) {
    this.installCallback = callback;
    this.fun_error = null;

    if (cc.sys.OS_ANDROID == cc.sys.os) {
      console.log("调用java getInstall============================");
      this.fun_error = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getInstall", "(I)Z", s);
    } else if (cc.sys.OS_IOS == cc.sys.os) {
      this.fun_error = jsb.reflection.callStaticMethod("IOSOpenInstallBridge", "getInstall:", s);
    }

    console.log("js to openinstall this.fun_error", this.fun_error);

    if (!this.fun_error) {
      console.log("js to openinstall 方法不存或者调用出错");

      this._installCallback({
        "channelCode": "",
        "bindData": ""
      });
    }
  },
  // 唤醒
  registerWakeUpHandler: function registerWakeUpHandler(callback) {
    this.wakeupCallback = callback;

    if (cc.sys.OS_ANDROID == cc.sys.os) {
      console.log("调用java registerWakeUpHandler============================");
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "registerWakeup", "()V");
    } else if (cc.sys.OS_IOS == cc.sys.os) {
      jsb.reflection.callStaticMethod("IOSOpenInstallBridge", "registerWakeUpHandler");
    }
  },
  reportRegister: function reportRegister() {
    if (cc.sys.OS_ANDROID == cc.sys.os) {
      jsb.reflection.callStaticMethod("com/fm/openinstall/OpenInstall", "reportRegister", "()V");
    } else if (cc.sys.OS_IOS == cc.sys.os) {
      jsb.reflection.callStaticMethod("IOSOpenInstallBridge", "reportRegister");
    }
  },
  reportEffectPoint: function reportEffectPoint(pointId, pointValue) {
    if (cc.sys.OS_ANDROID == cc.sys.os) {
      jsb.reflection.callStaticMethod("com/fm/openinstall/OpenInstall", "reportEffectPoint", "(Ljava/lang/String;J)V", pointId, pointValue);
    } else if (cc.sys.OS_IOS == cc.sys.os) {
      jsb.reflection.callStaticMethod("IOSOpenInstallBridge", "reportEffectPoint:Value:", pointId, pointValue);
    }
  },
  _installCallback: function _installCallback(appData) {
    console.log("安装参数：", appData.channelCode, appData.bindData);

    for (var key in appData.bindData) {
      console.log("installCallback", key, appData.bindData[key]);
    }

    this.installCallback(appData);
  },
  _wakeupCallback: function _wakeupCallback(appData) {
    console.log("唤醒参数:", appData.channelCode, appData.bindData);

    for (var key in appData.bindData) {
      console.log("wakeupCallback", key, appData.bindData[key]);
    }

    this.wakeupCallback(appData);
  }
};
module.exports = openinstall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxvcGVuSW5zdGFsbFxcT3Blbkluc3RhbGwuanMiXSwibmFtZXMiOlsib3Blbmluc3RhbGwiLCJpbnN0YWxsQ2FsbGJhY2siLCJhcHBEYXRhIiwid2FrZXVwQ2FsbGJhY2siLCJnZXRJbnN0YWxsIiwicyIsImNhbGxiYWNrIiwiZnVuX2Vycm9yIiwiY2MiLCJzeXMiLCJPU19BTkRST0lEIiwib3MiLCJjb25zb2xlIiwibG9nIiwianNiIiwicmVmbGVjdGlvbiIsImNhbGxTdGF0aWNNZXRob2QiLCJPU19JT1MiLCJfaW5zdGFsbENhbGxiYWNrIiwicmVnaXN0ZXJXYWtlVXBIYW5kbGVyIiwicmVwb3J0UmVnaXN0ZXIiLCJyZXBvcnRFZmZlY3RQb2ludCIsInBvaW50SWQiLCJwb2ludFZhbHVlIiwiY2hhbm5lbENvZGUiLCJiaW5kRGF0YSIsImtleSIsIl93YWtldXBDYWxsYmFjayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsV0FBVyxHQUFFO0FBRWJDLEVBQUFBLGVBRmEsMkJBRUdDLE9BRkgsRUFFVyxDQUN2QixDQUhZO0FBS2JDLEVBQUFBLGNBTGEsMEJBS0VELE9BTEYsRUFLVSxDQUN0QixDQU5ZO0FBT2I7QUFDQUUsRUFBQUEsVUFBVSxFQUFFLG9CQUFVQyxDQUFWLEVBQWFDLFFBQWIsRUFBdUI7QUFDL0IsU0FBS0wsZUFBTCxHQUF1QkssUUFBdkI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElBQWpCOztBQUNBLFFBQUlDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxVQUFQLElBQXFCRixFQUFFLENBQUNDLEdBQUgsQ0FBT0UsRUFBaEMsRUFBb0M7QUFDaENDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtDQUFaO0FBQ0EsV0FBS04sU0FBTCxHQUFpQk8sR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLHFDQUFoQyxFQUNiLFlBRGEsRUFDQyxNQURE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LFNBQUssSUFBSUMsR0FBVCxJQUFnQnhCLE9BQU8sQ0FBQ3VCLFFBQXhCLEVBQWtDO0FBQzlCYixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQmEsR0FBL0IsRUFBb0N4QixPQUFPLENBQUN1QixRQUFSLENBQWlCQyxHQUFqQixDQUFwQztBQUNIOztBQUNELFNBQUt6QixlQUFMLENBQXFCQyxPQUFyQjtBQUNILEdBN0RZO0FBK0RieUIsRUFBQUEsZUFBZSxFQUFFLHlCQUFVekIsT0FBVixFQUFtQjtBQUNoQ1UsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWixFQUFxQlgsT0FBTyxDQUFDc0IsV0FBN0IsRUFBMEN0QixPQUFPLENBQUN1QixRQUFsRDs7QUFDQSxTQUFLLElBQUlDLEdBQVQsSUFBZ0J4QixPQUFPLENBQUN1QixRQUF4QixFQUFrQztBQUM5QmIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEJhLEdBQTlCLEVBQW1DeEIsT0FBTyxDQUFDdUIsUUFBUixDQUFpQkMsR0FBakIsQ0FBbkM7QUFDSDs7QUFDRCxTQUFLdkIsY0FBTCxDQUFvQkQsT0FBcEI7QUFDSDtBQXJFWSxDQUFqQjtBQXdFQTBCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLFdBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIG9wZW5pbnN0YWxsPSB7XHJcblxyXG4gICAgaW5zdGFsbENhbGxiYWNrKGFwcERhdGEpe1xyXG4gICAgfSxcclxuXHJcbiAgICB3YWtldXBDYWxsYmFjayhhcHBEYXRhKXtcclxuICAgIH0sXHJcbiAgICAvLyDliJ3lp4vljJZcclxuICAgIGdldEluc3RhbGw6IGZ1bmN0aW9uIChzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5mdW5fZXJyb3IgPSBudWxsO1xyXG4gICAgICAgIGlmIChjYy5zeXMuT1NfQU5EUk9JRCA9PSBjYy5zeXMub3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLosIPnlKhqYXZhIGdldEluc3RhbGw9PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXHJcbiAgICAgICAgICAgIHRoaXMuZnVuX2Vycm9yID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgICAgICBcImdldEluc3RhbGxcIiwgXCIoSSlaXCIsIHMpO1xyXG4gICAgICAgIH0gZWxzZSBpZihjYy5zeXMuT1NfSU9TID09IGNjLnN5cy5vcyl7XHJcbiAgICAgICAgICAgIHRoaXMuZnVuX2Vycm9yID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIklPU09wZW5JbnN0YWxsQnJpZGdlXCIsXCJnZXRJbnN0YWxsOlwiLHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJqcyB0byBvcGVuaW5zdGFsbCB0aGlzLmZ1bl9lcnJvclwiLCB0aGlzLmZ1bl9lcnJvcilcclxuICAgICAgICBpZiAoIXRoaXMuZnVuX2Vycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianMgdG8gb3Blbmluc3RhbGwg5pa55rOV5LiN5a2Y5oiW6ICF6LCD55So5Ye66ZSZXCIpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbGxDYWxsYmFjayh7XCJjaGFubmVsQ29kZVwiOlwiXCIsXCJiaW5kRGF0YVwiOlwiXCJ9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDllKTphpJcclxuICAgIHJlZ2lzdGVyV2FrZVVwSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy53YWtldXBDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGlmIChjYy5zeXMuT1NfQU5EUk9JRCA9PSBjYy5zeXMub3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLosIPnlKhqYXZhIHJlZ2lzdGVyV2FrZVVwSGFuZGxlcj09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyV2FrZXVwXCIsIFwiKClWXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZihjYy5zeXMuT1NfSU9TID09IGNjLnN5cy5vcyl7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJJT1NPcGVuSW5zdGFsbEJyaWRnZVwiLFwicmVnaXN0ZXJXYWtlVXBIYW5kbGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVwb3J0UmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLk9TX0FORFJPSUQgPT0gY2Muc3lzLm9zKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vZm0vb3Blbmluc3RhbGwvT3Blbkluc3RhbGxcIixcclxuICAgICAgICAgICAgICAgIFwicmVwb3J0UmVnaXN0ZXJcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmKGNjLnN5cy5PU19JT1MgPT0gY2Muc3lzLm9zKXtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIklPU09wZW5JbnN0YWxsQnJpZGdlXCIsXCJyZXBvcnRSZWdpc3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcG9ydEVmZmVjdFBvaW50OiBmdW5jdGlvbiAocG9pbnRJZCwgcG9pbnRWYWx1ZSkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuT1NfQU5EUk9JRCA9PSBjYy5zeXMub3MpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9mbS9vcGVuaW5zdGFsbC9PcGVuSW5zdGFsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBvcnRFZmZlY3RQb2ludFwiLCBcIihMamF2YS9sYW5nL1N0cmluZztKKVZcIiwgcG9pbnRJZCwgcG9pbnRWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGNjLnN5cy5PU19JT1MgPT0gY2Muc3lzLm9zKXtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIklPU09wZW5JbnN0YWxsQnJpZGdlXCIsXCJyZXBvcnRFZmZlY3RQb2ludDpWYWx1ZTpcIixwb2ludElkLHBvaW50VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2luc3RhbGxDYWxsYmFjazogZnVuY3Rpb24gKGFwcERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWuieijheWPguaVsO+8mlwiLCBhcHBEYXRhLmNoYW5uZWxDb2RlLCBhcHBEYXRhLmJpbmREYXRhKTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXBwRGF0YS5iaW5kRGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc3RhbGxDYWxsYmFja1wiLCBrZXksIGFwcERhdGEuYmluZERhdGFba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKGFwcERhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfd2FrZXVwQ2FsbGJhY2s6IGZ1bmN0aW9uIChhcHBEYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLllKTphpLlj4LmlbA6XCIsIGFwcERhdGEuY2hhbm5lbENvZGUsIGFwcERhdGEuYmluZERhdGEpO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcHBEYXRhLmJpbmREYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2FrZXVwQ2FsbGJhY2tcIiwga2V5LCBhcHBEYXRhLmJpbmREYXRhW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndha2V1cENhbGxiYWNrKGFwcERhdGEpO1xyXG4gICAgfSxcclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gb3Blbmluc3RhbGw7XHJcbiJdfQ==
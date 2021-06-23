
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/openInstall/OICallFunc.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dfd05G5Tv5AQqDZipXh4/6S', 'OICallFunc');
// frames/openInstall/OICallFunc.js

"use strict";

var openinstall = require("OpenInstall");

var OICallFunc = function OICallFunc() {};

var oiCallFunc = OICallFunc.prototype;
var g_instance = null;

oiCallFunc.registerWakeUpHandler = function (callback) {
  openinstall.registerWakeUpHandler(callback);
};

oiCallFunc.getInstall = function (delaytime, callback) {
  openinstall.getInstall(delaytime, callback);
};

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new OICallFunc();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxvcGVuSW5zdGFsbFxcT0lDYWxsRnVuYy5qcyJdLCJuYW1lcyI6WyJvcGVuaW5zdGFsbCIsInJlcXVpcmUiLCJPSUNhbGxGdW5jIiwib2lDYWxsRnVuYyIsInByb3RvdHlwZSIsImdfaW5zdGFuY2UiLCJyZWdpc3Rlcldha2VVcEhhbmRsZXIiLCJjYWxsYmFjayIsImdldEluc3RhbGwiLCJkZWxheXRpbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0SW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxJQUFJQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFVLENBRTFCLENBRkQ7O0FBR0EsSUFBSUMsVUFBVSxHQUFHRCxVQUFVLENBQUNFLFNBQTVCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLElBQWpCOztBQUVBRixVQUFVLENBQUNHLHFCQUFYLEdBQW1DLFVBQVVDLFFBQVYsRUFBb0I7QUFDbkRQLEVBQUFBLFdBQVcsQ0FBQ00scUJBQVosQ0FBa0NDLFFBQWxDO0FBQ0gsQ0FGRDs7QUFJQUosVUFBVSxDQUFDSyxVQUFYLEdBQXdCLFVBQVVDLFNBQVYsRUFBcUJGLFFBQXJCLEVBQStCO0FBQ25EUCxFQUFBQSxXQUFXLENBQUNRLFVBQVosQ0FBdUJDLFNBQXZCLEVBQWtDRixRQUFsQztBQUNILENBRkQ7O0FBSUFHLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxXQUFmLEdBQTZCLFlBQVk7QUFDckMsTUFBSSxDQUFDUCxVQUFMLEVBQWlCO0FBQ2JBLElBQUFBLFVBQVUsR0FBRyxJQUFJSCxVQUFKLEVBQWI7QUFDSDs7QUFDRCxTQUFPRyxVQUFQO0FBQ0gsQ0FMRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IG9wZW5pbnN0YWxsID0gcmVxdWlyZShcIk9wZW5JbnN0YWxsXCIpO1xyXG5sZXQgT0lDYWxsRnVuYyA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5sZXQgb2lDYWxsRnVuYyA9IE9JQ2FsbEZ1bmMucHJvdG90eXBlO1xyXG5sZXQgZ19pbnN0YW5jZSA9IG51bGw7XHJcblxyXG5vaUNhbGxGdW5jLnJlZ2lzdGVyV2FrZVVwSGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgb3Blbmluc3RhbGwucmVnaXN0ZXJXYWtlVXBIYW5kbGVyKGNhbGxiYWNrKTtcclxufTtcclxuXHJcbm9pQ2FsbEZ1bmMuZ2V0SW5zdGFsbCA9IGZ1bmN0aW9uIChkZWxheXRpbWUsIGNhbGxiYWNrKSB7XHJcbiAgICBvcGVuaW5zdGFsbC5nZXRJbnN0YWxsKGRlbGF5dGltZSwgY2FsbGJhY2spO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWdfaW5zdGFuY2UpIHtcclxuICAgICAgICBnX2luc3RhbmNlID0gbmV3IE9JQ2FsbEZ1bmMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59OyJdfQ==
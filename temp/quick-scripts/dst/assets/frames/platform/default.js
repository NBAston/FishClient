
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/platform/default.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ec1ad9I4VMsaAIuyaAGWso', 'default');
// frames/platform/default.js

"use strict";

var Default = function Default() {},
    Def = Default.prototype,
    g_instance = null;
/**
 * 复制到剪切板
 */


Def.copyToClip = function () {
  glGame.panel.showMsgBox("", "Default copyToClip, 平台脚本重写改拷贝函数...");
};

Def.getMachineCode = function () {
  return "";
};

Def.setHBSLLockingOrientation = function (isRota) {};

Def.getClipText = function () {
  return "";
};

Def.getSystemVersion = function () {
  return 0;
};

Def.getPhoneModel = function () {
  return null;
};

Def.getRegisID = function () {
  return "win32";
};

Def.DownloadApk = function (strUrl) {};

Def.UpdateProgress = function () {
  return null;
};

Def.changeOrientation = function (isRota) {};

Def.offSuspension = function () {};

Default.getInstance = function () {
  if (!g_instance) {
    g_instance = new Default();
  }

  return g_instance;
};
/**
 * 简单的写个原型继承
 */


Default.extend = function (o) {
  function Class() {}

  ;

  for (var key in Default) {
    Class.prototype[key] = Default.prototype[key];
  }

  for (var _key in o) {
    Class.prototype[_key] = o[_key];
  }

  return Class;
};

module.exports = Default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxwbGF0Zm9ybVxcZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0IiwiRGVmIiwicHJvdG90eXBlIiwiZ19pbnN0YW5jZSIsImNvcHlUb0NsaXAiLCJnbEdhbWUiLCJwYW5lbCIsInNob3dNc2dCb3giLCJnZXRNYWNoaW5lQ29kZSIsInNldEhCU0xMb2NraW5nT3JpZW50YXRpb24iLCJpc1JvdGEiLCJnZXRDbGlwVGV4dCIsImdldFN5c3RlbVZlcnNpb24iLCJnZXRQaG9uZU1vZGVsIiwiZ2V0UmVnaXNJRCIsIkRvd25sb2FkQXBrIiwic3RyVXJsIiwiVXBkYXRlUHJvZ3Jlc3MiLCJjaGFuZ2VPcmllbnRhdGlvbiIsIm9mZlN1c3BlbnNpb24iLCJnZXRJbnN0YW5jZSIsImV4dGVuZCIsIm8iLCJDbGFzcyIsImtleSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFDSUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWSxDQUVyQixDQUhMO0FBQUEsSUFJSUMsR0FBRyxHQUFHRCxPQUFPLENBQUNFLFNBSmxCO0FBQUEsSUFLSUMsVUFBVSxHQUFHLElBTGpCO0FBT0E7Ozs7O0FBR0FGLEdBQUcsQ0FBQ0csVUFBSixHQUFpQixZQUFZO0FBQ3pCQyxFQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUMsVUFBYixDQUF3QixFQUF4QixFQUE0QixvQ0FBNUI7QUFDSCxDQUZEOztBQUlBTixHQUFHLENBQUNPLGNBQUosR0FBcUIsWUFBWTtBQUFFLFNBQU8sRUFBUDtBQUFZLENBQS9DOztBQUVBUCxHQUFHLENBQUNRLHlCQUFKLEdBQWdDLFVBQVVDLE1BQVYsRUFBa0IsQ0FBRyxDQUFyRDs7QUFFQVQsR0FBRyxDQUFDVSxXQUFKLEdBQWtCLFlBQVk7QUFBRSxTQUFPLEVBQVA7QUFBVyxDQUEzQzs7QUFFQVYsR0FBRyxDQUFDVyxnQkFBSixHQUF1QixZQUFZO0FBQUUsU0FBTyxDQUFQO0FBQVcsQ0FBaEQ7O0FBRUFYLEdBQUcsQ0FBQ1ksYUFBSixHQUFvQixZQUFZO0FBQUUsU0FBTyxJQUFQO0FBQWMsQ0FBaEQ7O0FBRUFaLEdBQUcsQ0FBQ2EsVUFBSixHQUFpQixZQUFZO0FBQUUsU0FBTyxPQUFQO0FBQWlCLENBQWhEOztBQUVBYixHQUFHLENBQUNjLFdBQUosR0FBa0IsVUFBVUMsTUFBVixFQUFrQixDQUFHLENBQXZDOztBQUVBZixHQUFHLENBQUNnQixjQUFKLEdBQXFCLFlBQVk7QUFBRSxTQUFPLElBQVA7QUFBYyxDQUFqRDs7QUFFQWhCLEdBQUcsQ0FBQ2lCLGlCQUFKLEdBQXdCLFVBQVVSLE1BQVYsRUFBa0IsQ0FBRyxDQUE3Qzs7QUFFQVQsR0FBRyxDQUFDa0IsYUFBSixHQUFvQixZQUFZLENBQUcsQ0FBbkM7O0FBRUFuQixPQUFPLENBQUNvQixXQUFSLEdBQXNCLFlBQVk7QUFDOUIsTUFBSSxDQUFDakIsVUFBTCxFQUFpQjtBQUNiQSxJQUFBQSxVQUFVLEdBQUcsSUFBSUgsT0FBSixFQUFiO0FBQ0g7O0FBQ0QsU0FBT0csVUFBUDtBQUNILENBTEQ7QUFPQTs7Ozs7QUFHQUgsT0FBTyxDQUFDcUIsTUFBUixHQUFpQixVQUFVQyxDQUFWLEVBQWE7QUFDMUIsV0FBU0MsS0FBVCxHQUFpQixDQUFHOztBQUFBOztBQUNwQixPQUFLLElBQUlDLEdBQVQsSUFBZ0J4QixPQUFoQixFQUF5QjtBQUNyQnVCLElBQUFBLEtBQUssQ0FBQ3JCLFNBQU4sQ0FBZ0JzQixHQUFoQixJQUF1QnhCLE9BQU8sQ0FBQ0UsU0FBUixDQUFrQnNCLEdBQWxCLENBQXZCO0FBQ0g7O0FBQ0QsT0FBSyxJQUFJQSxJQUFULElBQWdCRixDQUFoQixFQUFtQjtBQUNmQyxJQUFBQSxLQUFLLENBQUNyQixTQUFOLENBQWdCc0IsSUFBaEIsSUFBdUJGLENBQUMsQ0FBQ0UsSUFBRCxDQUF4QjtBQUNIOztBQUNELFNBQU9ELEtBQVA7QUFDSCxDQVREOztBQVdBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUIxQixPQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0XHJcbiAgICBEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBEZWYgPSBEZWZhdWx0LnByb3RvdHlwZSxcclxuICAgIGdfaW5zdGFuY2UgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIOWkjeWItuWIsOWJquWIh+adv1xyXG4gKi9cclxuRGVmLmNvcHlUb0NsaXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIlwiLCBcIkRlZmF1bHQgY29weVRvQ2xpcCwg5bmz5Y+w6ISa5pys6YeN5YaZ5pS55ou36LSd5Ye95pWwLi4uXCIpO1xyXG59O1xyXG5cclxuRGVmLmdldE1hY2hpbmVDb2RlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gXCJcIjsgfTtcclxuXHJcbkRlZi5zZXRIQlNMTG9ja2luZ09yaWVudGF0aW9uID0gZnVuY3Rpb24gKGlzUm90YSkgeyB9O1xyXG5cclxuRGVmLmdldENsaXBUZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gXCJcIiB9O1xyXG5cclxuRGVmLmdldFN5c3RlbVZlcnNpb24gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9O1xyXG5cclxuRGVmLmdldFBob25lTW9kZWwgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xyXG5cclxuRGVmLmdldFJlZ2lzSUQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBcIndpbjMyXCI7IH07XHJcblxyXG5EZWYuRG93bmxvYWRBcGsgPSBmdW5jdGlvbiAoc3RyVXJsKSB7IH07XHJcblxyXG5EZWYuVXBkYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xyXG5cclxuRGVmLmNoYW5nZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gKGlzUm90YSkgeyB9O1xyXG5cclxuRGVmLm9mZlN1c3BlbnNpb24gPSBmdW5jdGlvbiAoKSB7IH07XHJcblxyXG5EZWZhdWx0LmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyBEZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ19pbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDnroDljZXnmoTlhpnkuKrljp/lnovnu6fmib9cclxuICovXHJcbkRlZmF1bHQuZXh0ZW5kID0gZnVuY3Rpb24gKG8pIHtcclxuICAgIGZ1bmN0aW9uIENsYXNzKCkgeyB9O1xyXG4gICAgZm9yIChsZXQga2V5IGluIERlZmF1bHQpIHtcclxuICAgICAgICBDbGFzcy5wcm90b3R5cGVba2V5XSA9IERlZmF1bHQucHJvdG90eXBlW2tleV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gbykge1xyXG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtrZXldID0gb1trZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENsYXNzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERlZmF1bHQ7XHJcbiJdfQ==
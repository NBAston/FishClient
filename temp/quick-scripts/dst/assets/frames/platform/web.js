
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/platform/web.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70bb5Y3yFRG8ryzRvlV2H5F', 'web');
// frames/platform/web.js

"use strict";

var Def = require("default"),
    Web = Def.extend({
  copyToClip: function copyToClip(str, tipStr) {
    var textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
    } catch (err) {}

    document.body.removeChild(textArea);
  },
  openURL: function openURL(url) {
    cc.sys.openURL(url);
  },
  changeOrientation: function changeOrientation(isRota) {},
  offSuspension: function offSuspension() {},
  setHBSLLockingOrientation: function setHBSLLockingOrientation(isRota) {},
  isWxAppInstalled: function isWxAppInstalled() {
    return false;
  }
}),
    g_instance = null;

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new Web();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxwbGF0Zm9ybVxcd2ViLmpzIl0sIm5hbWVzIjpbIkRlZiIsInJlcXVpcmUiLCJXZWIiLCJleHRlbmQiLCJjb3B5VG9DbGlwIiwic3RyIiwidGlwU3RyIiwidGV4dEFyZWEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJhY2tncm91bmQiLCJ2YWx1ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNlbGVjdCIsInN1Y2Nlc3NmdWwiLCJleGVjQ29tbWFuZCIsImdsR2FtZSIsInBhbmVsIiwic2hvd1RpcCIsInRpcHMiLCJDT01NT04iLCJDT1BZU1VDQ0VTUyIsImVyciIsInJlbW92ZUNoaWxkIiwib3BlblVSTCIsInVybCIsImNjIiwic3lzIiwiY2hhbmdlT3JpZW50YXRpb24iLCJpc1JvdGEiLCJvZmZTdXNwZW5zaW9uIiwic2V0SEJTTExvY2tpbmdPcmllbnRhdGlvbiIsImlzV3hBcHBJbnN0YWxsZWQiLCJnX2luc3RhbmNlIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldEluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQ0lBLEdBQUcsR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FEakI7QUFBQSxJQUVJQyxHQUFHLEdBQUdGLEdBQUcsQ0FBQ0csTUFBSixDQUFXO0FBQ2JDLEVBQUFBLFVBQVUsRUFBRSxvQkFBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCO0FBQy9CLFFBQUlDLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQWY7QUFDQUYsSUFBQUEsUUFBUSxDQUFDRyxLQUFULENBQWVDLFVBQWYsR0FBNEIsYUFBNUI7QUFDQUosSUFBQUEsUUFBUSxDQUFDSyxLQUFULEdBQWlCUCxHQUFqQjtBQUNBRyxJQUFBQSxRQUFRLENBQUNLLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlAsUUFBMUI7QUFDQUEsSUFBQUEsUUFBUSxDQUFDUSxNQUFUOztBQUNBLFFBQUk7QUFDQSxVQUFJQyxVQUFVLEdBQUdSLFFBQVEsQ0FBQ1MsV0FBVCxDQUFxQixNQUFyQixDQUFqQjtBQUNBQyxNQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUMsT0FBYixDQUFxQmQsTUFBTSxHQUFHQSxNQUFILEdBQVlZLE1BQU0sQ0FBQ0csSUFBUCxDQUFZQyxNQUFaLENBQW1CQyxXQUExRDtBQUNILEtBSEQsQ0FHRSxPQUFPQyxHQUFQLEVBQVksQ0FDYjs7QUFDRGhCLElBQUFBLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjWSxXQUFkLENBQTBCbEIsUUFBMUI7QUFDSCxHQWJZO0FBY2JtQixFQUFBQSxPQUFPLEVBQUUsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQkMsSUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU9ILE9BQVAsQ0FBZUMsR0FBZjtBQUNILEdBaEJZO0FBaUJiRyxFQUFBQSxpQkFBaUIsRUFBRSwyQkFBVUMsTUFBVixFQUFrQixDQUFHLENBakIzQjtBQWtCYkMsRUFBQUEsYUFBYSxFQUFFLHlCQUFZLENBQUcsQ0FsQmpCO0FBbUJiQyxFQUFBQSx5QkFBeUIsRUFBRSxtQ0FBVUYsTUFBVixFQUFrQixDQUFHLENBbkJuQztBQW9CYkcsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVk7QUFBRSxXQUFPLEtBQVA7QUFBYztBQXBCakMsQ0FBWCxDQUZWO0FBQUEsSUF3QklDLFVBQVUsR0FBRyxJQXhCakI7O0FBeUJBQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsV0FBZixHQUE2QixZQUFZO0FBQ3JDLE1BQUksQ0FBQ0gsVUFBTCxFQUFpQjtBQUNiQSxJQUFBQSxVQUFVLEdBQUcsSUFBSWpDLEdBQUosRUFBYjtBQUNIOztBQUNELFNBQU9pQyxVQUFQO0FBQ0gsQ0FMRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0XHJcbiAgICBEZWYgPSByZXF1aXJlKFwiZGVmYXVsdFwiKSxcclxuICAgIFdlYiA9IERlZi5leHRlbmQoe1xyXG4gICAgICAgIGNvcHlUb0NsaXA6IGZ1bmN0aW9uIChzdHIsIHRpcFN0cikge1xyXG4gICAgICAgICAgICBsZXQgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgICAgICAgICAgIHRleHRBcmVhLnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IHN0cjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XHJcbiAgICAgICAgICAgIHRleHRBcmVhLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dUaXAodGlwU3RyID8gdGlwU3RyIDogZ2xHYW1lLnRpcHMuQ09NTU9OLkNPUFlTVUNDRVNTKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuVVJMOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKHVybClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZU9yaWVudGF0aW9uOiBmdW5jdGlvbiAoaXNSb3RhKSB7IH0sXHJcbiAgICAgICAgb2ZmU3VzcGVuc2lvbjogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgIHNldEhCU0xMb2NraW5nT3JpZW50YXRpb246IGZ1bmN0aW9uIChpc1JvdGEpIHsgfSxcclxuICAgICAgICBpc1d4QXBwSW5zdGFsbGVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZSB9XHJcbiAgICB9KSxcclxuICAgIGdfaW5zdGFuY2UgPSBudWxsO1xyXG5tb2R1bGUuZXhwb3J0cy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghZ19pbnN0YW5jZSkge1xyXG4gICAgICAgIGdfaW5zdGFuY2UgPSBuZXcgV2ViKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ19pbnN0YW5jZTtcclxufTtcclxuXHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/control/WebViewEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87832G1mL1EHbVVAxwF7GDG', 'WebViewEx');
// modules/public/script/control/WebViewEx.js

"use strict";

// 仅提供给第三方电子webview使用,不适用于其他场合
var WebViewImpl = require('./webview-impl');

var EventType = WebViewImpl.EventType;

function emptyCallback() {}

var WebViewEx = cc.Class({
  "extends": cc.Component,
  properties: {
    _useOriginalSize: true,
    _url: '',

    /**
     * !#en A given URL to be loaded by the WebView, it should have a http or https prefix.
     * !#zh 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
     * @property {String} url
     */
    url: {
      type: cc.String,
      get: function get() {
        return this._url;
      },
      set: function set(url) {
        this._url = url;

        if (this._impl == null) {
          this._impl = new WebViewImpl();

          this._impl.createDomElementIfNeeded(cc.game.container.style.width, cc.game.container.style.height);
        }

        this._impl.setVisible(true);

        var impl = this._impl;

        if (impl) {
          impl.loadURL(url);
        }
      }
    }
  },
  ctor: function ctor() {},
  onEnable: function onEnable() {// this._impl.setVisible(true);
  },
  onDisable: function onDisable() {
    var impl = this._impl;
    impl.setVisible(false);

    if (!CC_EDITOR) {
      impl.setEventListener(EventType.LOADED, emptyCallback);
      impl.setEventListener(EventType.LOADING, emptyCallback);
      impl.setEventListener(EventType.ERROR, emptyCallback);
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  },
  update: function update(dt) {// if (this._impl) {
    //     this._impl.updateMatrix(this.node);
    // }
  },
  setJavascriptInterfaceScheme: function setJavascriptInterfaceScheme(scheme) {},
  setOnJSCallback: function setOnJSCallback(callback) {}
});
cc.WebViewEx = module.exports = WebViewEx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGNvbnRyb2xcXFdlYlZpZXdFeC5qcyJdLCJuYW1lcyI6WyJXZWJWaWV3SW1wbCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJlbXB0eUNhbGxiYWNrIiwiV2ViVmlld0V4IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfdXNlT3JpZ2luYWxTaXplIiwiX3VybCIsInVybCIsInR5cGUiLCJTdHJpbmciLCJnZXQiLCJzZXQiLCJfaW1wbCIsImNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCIsImdhbWUiLCJjb250YWluZXIiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VmlzaWJsZSIsImltcGwiLCJsb2FkVVJMIiwiY3RvciIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwiQ0NfRURJVE9SIiwic2V0RXZlbnRMaXN0ZW5lciIsIkxPQURFRCIsIkxPQURJTkciLCJFUlJPUiIsIm9uRGVzdHJveSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJkdCIsInNldEphdmFzY3JpcHRJbnRlcmZhY2VTY2hlbWUiLCJzY2hlbWUiLCJzZXRPbkpTQ2FsbGJhY2siLCJjYWxsYmFjayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUEzQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFdBQVcsQ0FBQ0UsU0FBOUI7O0FBRUEsU0FBU0MsYUFBVCxHQUEwQixDQUFHOztBQUc3QixJQUFJQyxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3JCLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUztBQUdyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFLElBRFY7QUFHUkMsSUFBQUEsSUFBSSxFQUFFLEVBSEU7O0FBSVI7Ozs7O0FBS0FDLElBQUFBLEdBQUcsRUFBRTtBQUNEQyxNQUFBQSxJQUFJLEVBQUVQLEVBQUUsQ0FBQ1EsTUFEUjtBQUVEQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osSUFBWjtBQUNILE9BSkE7QUFLREssTUFBQUEsR0FBRyxFQUFFLGFBQVVKLEdBQVYsRUFBZTtBQUNoQixhQUFLRCxJQUFMLEdBQVlDLEdBQVo7O0FBQ0EsWUFBRyxLQUFLSyxLQUFMLElBQWMsSUFBakIsRUFDQTtBQUNJLGVBQUtBLEtBQUwsR0FBYSxJQUFJaEIsV0FBSixFQUFiOztBQUNBLGVBQUtnQixLQUFMLENBQVdDLHdCQUFYLENBQW9DWixFQUFFLENBQUNhLElBQUgsQ0FBUUMsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JDLEtBQTVELEVBQW1FaEIsRUFBRSxDQUFDYSxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLEtBQWxCLENBQXdCRSxNQUEzRjtBQUNIOztBQUVELGFBQUtOLEtBQUwsQ0FBV08sVUFBWCxDQUFzQixJQUF0Qjs7QUFDQSxZQUFJQyxJQUFJLEdBQUcsS0FBS1IsS0FBaEI7O0FBQ0EsWUFBSVEsSUFBSixFQUFVO0FBQ05BLFVBQUFBLElBQUksQ0FBQ0MsT0FBTCxDQUFhZCxHQUFiO0FBQ0g7QUFDSjtBQWxCQTtBQVRHLEdBSFM7QUFrQ3JCZSxFQUFBQSxJQWxDcUIsa0JBa0NiLENBRVAsQ0FwQ29CO0FBc0NyQkMsRUFBQUEsUUF0Q3FCLHNCQXNDVCxDQUNSO0FBQ0gsR0F4Q29CO0FBMENyQkMsRUFBQUEsU0ExQ3FCLHVCQTBDUjtBQUNULFFBQUlKLElBQUksR0FBRyxLQUFLUixLQUFoQjtBQUNBUSxJQUFBQSxJQUFJLENBQUNELFVBQUwsQ0FBZ0IsS0FBaEI7O0FBQ0EsUUFBSSxDQUFDTSxTQUFMLEVBQWdCO0FBQ1pMLE1BQUFBLElBQUksQ0FBQ00sZ0JBQUwsQ0FBc0I1QixTQUFTLENBQUM2QixNQUFoQyxFQUF3QzVCLGFBQXhDO0FBQ0FxQixNQUFBQSxJQUFJLENBQUNNLGdCQUFMLENBQXNCNUIsU0FBUyxDQUFDOEIsT0FBaEMsRUFBeUM3QixhQUF6QztBQUNBcUIsTUFBQUEsSUFBSSxDQUFDTSxnQkFBTCxDQUFzQjVCLFNBQVMsQ0FBQytCLEtBQWhDLEVBQXVDOUIsYUFBdkM7QUFDSDtBQUNKLEdBbERvQjtBQW9EckIrQixFQUFBQSxTQXBEcUIsdUJBb0RSO0FBQ1QsUUFBSSxLQUFLbEIsS0FBVCxFQUFnQjtBQUNaLFdBQUtBLEtBQUwsQ0FBV21CLE9BQVg7O0FBQ0EsV0FBS25CLEtBQUwsR0FBYSxJQUFiO0FBQ0g7QUFDSixHQXpEb0I7QUEyRHJCb0IsRUFBQUEsTUEzRHFCLGtCQTJEYkMsRUEzRGEsRUEyRFQsQ0FDUjtBQUNBO0FBQ0E7QUFDSCxHQS9Eb0I7QUFpRXJCQyxFQUFBQSw0QkFqRXFCLHdDQWlFU0MsTUFqRVQsRUFpRWlCLENBRXJDLENBbkVvQjtBQXFFckJDLEVBQUFBLGVBckVxQiwyQkFxRUpDLFFBckVJLEVBcUVNLENBRTFCO0FBdkVvQixDQUFULENBQWhCO0FBMEVBcEMsRUFBRSxDQUFDRCxTQUFILEdBQWVzQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ2QyxTQUFoQyIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5LuF5o+Q5L6b57uZ56ys5LiJ5pa555S15a2Qd2Vidmlld+S9v+eUqCzkuI3pgILnlKjkuo7lhbbku5blnLrlkIhcclxuXHJcbmNvbnN0IFdlYlZpZXdJbXBsID0gcmVxdWlyZSgnLi93ZWJ2aWV3LWltcGwnKTtcclxuY29uc3QgRXZlbnRUeXBlID0gV2ViVmlld0ltcGwuRXZlbnRUeXBlO1xyXG5cclxuZnVuY3Rpb24gZW1wdHlDYWxsYmFjayAoKSB7IH1cclxuXHJcblxyXG5sZXQgV2ViVmlld0V4ID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfdXNlT3JpZ2luYWxTaXplOiB0cnVlLFxyXG5cclxuICAgICAgICBfdXJsOiAnJyxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEEgZ2l2ZW4gVVJMIHRvIGJlIGxvYWRlZCBieSB0aGUgV2ViVmlldywgaXQgc2hvdWxkIGhhdmUgYSBodHRwIG9yIGh0dHBzIHByZWZpeC5cclxuICAgICAgICAgKiAhI3poIOaMh+WumiBXZWJWaWV3IOWKoOi9veeahOe9keWdgO+8jOWug+W6lOivpeaYr+S4gOS4qiBodHRwIOaIluiAhSBodHRwcyDlvIDlpLTnmoTlrZfnrKbkuLJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gdXJsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXJsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlN0cmluZyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VybCA9IHVybDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ltcGwgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFdlYlZpZXdJbXBsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1wbC5jcmVhdGVEb21FbGVtZW50SWZOZWVkZWQoY2MuZ2FtZS5jb250YWluZXIuc3R5bGUud2lkdGgsIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwuc2V0VmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcclxuICAgICAgICAgICAgICAgIGlmIChpbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbC5sb2FkVVJMKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5faW1wbC5zZXRWaXNpYmxlKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcclxuICAgICAgICBpbXBsLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTE9BREVELCBlbXB0eUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5MT0FESU5HLCBlbXB0eUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5FUlJPUiwgZW1wdHlDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3kgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9pbXBsLnVwZGF0ZU1hdHJpeCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZSAoc2NoZW1lKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldE9uSlNDYWxsYmFjayAoY2FsbGJhY2spIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuV2ViVmlld0V4ID0gbW9kdWxlLmV4cG9ydHMgPSBXZWJWaWV3RXg7XHJcbiJdfQ==
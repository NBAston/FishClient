"use strict";
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
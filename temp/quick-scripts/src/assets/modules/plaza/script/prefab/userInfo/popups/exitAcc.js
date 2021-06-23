"use strict";
cc._RF.push(module, 'cb469rMs7dPQo3mEbR6WknH', 'exitAcc');
// modules/plaza/script/prefab/userInfo/popups/exitAcc.js

"use strict";

/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  unRegisterEvent: function unRegisterEvent() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_exitAccSure":
        this.exitAccSure_cb();
        break;

      case "btn_exitAccCancel":
        this.exitAccCancel_cb();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  exitAccSure_cb: function exitAccSure_cb() {
    var loginCache = glGame.storage.getItem("loginCache");

    if (loginCache) {
      var username = loginCache.pd.substr(-loginCache.le);
      glGame.storage.setItem("number", {
        data: username
      });
    }

    glGame.storage.removeItemByKey("loginCache");
    glGame.logon.reqTouLogin();
    this.remove();
    glGame.emitter.emit("unRegisterEventMyinfo");
  },
  exitAccCancel_cb: function exitAccCancel_cb() {
    this.remove();
  }
});

cc._RF.pop();
"use strict";
cc._RF.push(module, 'c0ac4FoNJJMIJBacpBzS1R9', 'login_frame');
// modules/login/script/prefab/login_frame.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.bolLogin = false;
  },
  OnDestroy: function OnDestroy() {},
  // 按钮点击事件
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_acc":
        return glGame.panel.showRegistration();

      case "btn_tourist":
        return this.touristLogin();

      default:
        console.error("no find button name -> %s", name);
    }
  },
  // 游客登陆
  touristLogin: function touristLogin() {
    if (this.bolLogin) return;
    this.bolLogin = true; // glGame.logon.reqTouLogin();
  }
});

cc._RF.pop();
"use strict";
cc._RF.push(module, 'b6313Vr+LdAIYdlHJGtU/AP', 'extractpass');
// modules/plaza/script/prefab/withdrawal/popup/extractpass.js

"use strict";

glGame.baseclass.extend({
  properties: {
    password: cc.EditBox,
    tips: cc.Node
  },
  onLoad: function onLoad() {
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
    this.type = 0;
    this.coin = 0;
    this.cashPwdMode = 0;
  },
  initView: function initView(t, m, c) {
    this.type = t;
    this.coin = m;
    this.cashPwdMode = c;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sure":
        this.sure();
        break;

      case "forgetpass":
        this.forgetpass();
        break;

      case "btn_callSevice":
        this.callSevice();
        break;
    }
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  sure: function sure() {
    if (this.password.string == "") {
      return glGame.panel.showTip('请填写取现密码');
    }

    glGame.user.reqWithdraw(Number(this.coin), this.type, this.password.string);
  },
  forgetpass: function forgetpass() {
    if (this.cashPwdMode == 1) {
      return glGame.user.get("phone") == 0 ? glGame.panel.showPanelByName("bindPhone") : glGame.panel.showPanelByName("modifyPass");
    } else {
      this.tips.active = true;
    }
  },
  callSevice: function callSevice() {
    this.remove();
    glGame.panel.showService();
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("withdrawSuccess", this);
  }
});

cc._RF.pop();
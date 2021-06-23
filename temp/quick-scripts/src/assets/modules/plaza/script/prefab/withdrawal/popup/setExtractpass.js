"use strict";
cc._RF.push(module, 'a8ee3ARw0dEe59l/niHmEtU', 'setExtractpass');
// modules/plaza/script/prefab/withdrawal/popup/setExtractpass.js

"use strict";

glGame.baseclass.extend({
  properties: {
    pwd: cc.EditBox,
    pwdCheck: cc.EditBox,
    tips: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sure":
        this.reqSetDrawPassword();
        break;
    }
  },
  setTips: function setTips(mode) {
    this.tips.active = mode == 2;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    if (!psw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    }

    if (psw.length < 4 || psw.length > 12) {
      glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
      return false;
    }

    if (!/^[A-Za-z0-9]{4,12}$/.test(psw)) {
      glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
      return null;
    }

    if (confimpsw == null) return psw;

    if (!confimpsw || psw !== confimpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
      return null;
    }

    return psw;
  },
  reqSetDrawPassword: function reqSetDrawPassword() {
    var _this = this;

    var psw = this.checkPassword(this.pwd.string);
    var confirm = this.checkPassword(this.pwd.string, this.pwdCheck.string);
    if (!psw) return;
    if (!confirm) return;
    var newPwd = md5(this.pwd.string);
    var msg = {
      cpwd: md5(this.pwdCheck.string),
      pwd: md5(this.pwd.string)
    };
    glGame.gameNet.send_msg("http.reqSetWithdrawPwd", msg, function (route, data) {
      //刷新当前界面为输入密码界面
      glGame.user.reqWithdraw(Number(_this.coin), _this.type, newPwd); // this.initData();
    });
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("withdrawSuccess", this);
  } // update (dt) {},

});

cc._RF.pop();
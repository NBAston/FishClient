"use strict";
cc._RF.push(module, 'b37cdrHexZHn7jqwj5XW18C', 'modifyPass');
// modules/plaza/script/prefab/withdrawal/popup/modifyPass.js

"use strict";

glGame.baseclass.extend({
  properties: {
    phoneNumber: cc.EditBox,
    passWord: cc.EditBox,
    surePassWord: cc.EditBox,
    verificaCode: cc.EditBox,
    btn_sendCode: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.VerificaCD = 60;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sure":
        this.sure();
        break;

      case "btn_sendCode":
        this.sendCode();
        break;
    }
  },
  //设置60秒倒计时
  setCutDown: function setCutDown() {
    var _this = this;

    this.btn_sendCode.getComponent(cc.Button).interactable = false;
    this.btn_sendCode.getChildByName("time").active = true;
    this.btn_sendCode.getChildByName("tip").active = false;
    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      _this.VerificaCD--;
      _this.btn_sendCode.getChildByName("time").getComponent(cc.Label).string = "".concat(_this.VerificaCD, "\u79D2");

      if (_this.VerificaCD == 0) {
        _this.node.stopAllActions();

        _this.VerificaCD = 60;
        _this.btn_sendCode.getChildByName("time").active = false;
        _this.btn_sendCode.getChildByName("tip").active = true;
        _this.btn_sendCode.getComponent(cc.Button).interactable = true;
      }
    }))));
  },
  // 手机号码检查
  checkPhone: function checkPhone(acc) {
    if (!acc) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
      return null;
    }

    var reg = /^\d{11}$/; //验证规则

    var isacc_matcher = reg.test(acc);

    if (!isacc_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONETYPE);
      pingf;
      return false;
    }

    return acc;
  },
  sendCode: function sendCode() {
    var _this2 = this;

    var phone = this.checkPhone(this.phoneNumber.string);
    if (!phone) return;
    var msg = {
      phone: phone,
      type: 11
    };
    glGame.gameNet.send_msg("http.ReqPostPhoneCode", msg, function (route, data) {
      glGame.panel.showTip("验证码发送成功");

      _this2.setCutDown();
    });
  },
  sure: function sure() {
    var _this3 = this;

    var psw = this.checkPassword(this.passWord.string);
    var confirm = this.checkPassword(this.passWord.string, this.surePassWord.string);
    var phone = this.checkPhone(this.phoneNumber.string);
    if (!psw) return;
    if (!confirm) return;
    if (!phone) return;
    if (this.verificaCode.string == "") return glGame.panel.showErrorTip(glGame.tips.COMMON.CODE_NULL);
    var reg = /^[0-9]{0,6}$/; //验证规则

    var verif = reg.test(this.verificaCode.string);

    if (!verif) {
      return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
    }

    var msg = {
      pwd: md5(psw),
      phone: phone,
      type: 3,
      code: verif
    };
    glGame.gameNet.send_msg("http.ReqEditPwd", msg, function (route, data) {
      _this3.remove();

      glGame.panel.showTip("修改成功");
    });
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    if (!psw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    }

    if (psw.length < 4) {
      glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
      return false;
    }

    if (!/\w$/.test(psw)) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWWRONGFUL);
      return null;
    }

    if (confimpsw == null) return psw;

    if (!confimpsw || psw !== confimpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
      return null;
    }

    return psw;
  },
  OnDestroy: function OnDestroy() {} // update (dt) {},

});

cc._RF.pop();
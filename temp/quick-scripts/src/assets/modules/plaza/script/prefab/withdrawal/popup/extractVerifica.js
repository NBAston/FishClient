"use strict";
cc._RF.push(module, 'd3117G6pIlIQ5ceUvcxvQCX', 'extractVerifica');
// modules/plaza/script/prefab/withdrawal/popup/extractVerifica.js

"use strict";

glGame.baseclass.extend({
  properties: {
    phoneNumber: cc.Label,
    extracttip: cc.RichText,
    btn_sendCode: cc.Node,
    verificaCode: cc.EditBox
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.VerificaCD = 60;
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
  },
  initData: function initData(phoneNumber, coin) {
    var Number_str = phoneNumber.toString();
    this.phoneNumber.string = Number_str.replace(Number_str.substring(3, 7), "****");
    this.coin = coin;
    this.extracttip.string = "\u662F\u5426\u786E\u5B9A\u7ACB\u5373\u63D0\u73B0".concat(coin, "\u91D1\u5E01\uFF1F");
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sendCode":
        this.sendCode();
        break;

      case "btn_sure":
        this.sure();
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
  sendCode: function sendCode() {
    var _this2 = this;

    if (this.VerificaCD != 60) return;
    glGame.gameNet.send_msg("http.reqWithdrawPhone", null, function (route, data) {
      if (!data.result) {
        glGame.panel.showTip("验证码发送失败");
        return;
      }

      glGame.panel.showTip("验证码发送成功");

      _this2.setCutDown();

      if (data && data.code) {
        console.log("是否有验证码", data.code);
      }
    });
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  sure: function sure() {
    if (this.verificaCode.string == "") return glGame.panel.showErrorTip(glGame.tips.COMMON.CODE_NULL);
    glGame.user.reqWithdraw(Number(this.coin), this.type, this.verificaCode.string);
  },
  set: function set(key, value) {
    this[key] = value;
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("withdrawSuccess", this);
  } // update (dt) {},

});

cc._RF.pop();
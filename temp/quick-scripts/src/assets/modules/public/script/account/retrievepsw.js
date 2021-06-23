"use strict";
cc._RF.push(module, 'd43e7t2TJ1CQovnp5NoxL34', 'retrievepsw');
// modules/public/script/account/retrievepsw.js

"use strict";

glGame.baseclass.extend({
  properties: {
    retrieve_phone: cc.EditBox,
    retrieve_verifica: cc.EditBox,
    retrieve_psw: cc.EditBox,
    retrieve_cpsw: cc.EditBox,
    retrieve_sendVerifica: [cc.Node],
    label_retrivevcode: cc.Label,
    btn_retrievePswSend: cc.Button
  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("retrievePswCD", this.retrievePswCD, this);
    glGame.emitter.on("changePswSuccess", this.changePswSuccess, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("retrievePswCD", this);
    glGame.emitter.off("changePswSuccess", this);
  },
  changePswSuccess: function changePswSuccess() {
    this.remove();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_retrievePsw":
        this.retrievePsw_cb();
        break;

      case "btn_retrievePswSend":
        this.retrievePswSend_cb();
        break;

      case "btn_close":
        this.remove();
        break;

      default:
        break;
    }
  },
  //找回密码
  retrievePsw_cb: function retrievePsw_cb() {
    var msg = {};
    var phone = this.checkPhone(this.retrieve_phone.string);
    if (!phone) return;
    var psw = this.checkPassword(this.retrieve_psw.string, this.retrieve_cpsw.string);
    if (!psw) return;
    var code = this.retrieve_verifica.string;
    msg.phone = phone;
    msg.pwd = psw;
    msg.code = code;
    glGame.user.ReqRetrievePwd(msg);
  },
  //找回密码发送验证码
  retrievePswSend_cb: function retrievePswSend_cb() {
    var phone = this.checkPhone(this.retrieve_phone.string);
    if (!phone) return;
    glGame.user.ReqPostPhoneCode({
      phone: phone,
      type: 8
    });
  },
  //找回密码验证码
  retrievePswCD: function retrievePswCD(msg) {
    if (glGame.user.get("retrievePswState") && msg > 0) {
      this.btn_retrievePswSend.node.getChildByName("img_liang").active = false;
      this.btn_retrievePswSend.node.getChildByName("img_an").active = true;
      this.btn_retrievePswSend.interactable = false;
      this.retrieve_sendVerifica[0].active = false;
      this.retrieve_sendVerifica[1].active = true;
      this.label_retrivevcode.string = "".concat(msg, "\u79D2");
    } else {
      this.btn_retrievePswSend.node.getChildByName("img_liang").active = true;
      this.btn_retrievePswSend.node.getChildByName("img_an").active = false;
      this.btn_retrievePswSend.interactable = true;
      this.retrieve_sendVerifica[0].active = true;
      this.retrieve_sendVerifica[1].active = false;
    }
  },
  // 手机号码检查
  checkPhone: function checkPhone(acc) {
    if (!acc) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
      return null;
    } //放开限定
    //var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    //使用服务端限定正则方式


    var reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[0-9]\d{8}$/; // let reg = /^\d{11}$/; //验证规则

    var isacc_matcher = reg.test(acc);

    if (!isacc_matcher) {
      glGame.panel.showErrorTip('请输入正确的手机号');
      return false;
    }

    return acc;
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    if (!psw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    }

    if (psw.length < 6) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
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
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
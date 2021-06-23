"use strict";
cc._RF.push(module, '5839d7mN+BEXrpjHshoYTqJ', 'register');
// modules/public/script/account/register.js

"use strict";

glGame.baseclass.extend({
  properties: {
    //登录
    login_accf: cc.Node,
    login_acc: cc.EditBox,
    login_psw: cc.EditBox,
    retrievepsw: cc.Prefab,
    protocol: cc.Prefab,
    node_agree: cc.Toggle,
    downFrame: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.iSagree = false;
  },
  start: function start() {
    this.initUI();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  initUI: function initUI() {
    var strAcc = glGame.storage.getItem("accNumber") ? glGame.storage.getItem("accNumber").data : '';
    if (strAcc != '') this.login_accf.getSelfFunc().setString(strAcc);
    this.iSagree = glGame.storage.getItem("isAgree") ? glGame.storage.getItem("isAgree").data : true;
    this.node_agree.isChecked = this.iSagree;
  },
  //账号登录
  accLogin_cb: function accLogin_cb() {
    if (!this.iSagree) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PROTOCOL);
      return;
    } //将空格去除指令


    var regex = / /gi;
    this.login_acc.string = this.login_acc.string.replace(regex, '');
    var acc = this.checkAcc(this.login_acc.string);
    if (!acc) return;
    var psw = this.checkPassword(this.login_psw.string);
    if (!psw) return;
    glGame.logon.reqAccLogin({
      username: acc,
      password: md5(psw)
    }); //username:phone,code:验证码,plat:5

    glGame.storage.setItem("accNumber", {
      data: acc
    });
  },
  editCheckAcc: function editCheckAcc() {
    var str = this.login_acc.string;
    this.checkAcc(str);
  },
  // 账号检查
  checkAcc: function checkAcc(acc) {
    if (!acc || acc == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCNULL);
      return false;
    }

    if (acc.length < 4) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCLENGTH);
      return false;
    } // let reg = /^\w{4,15}$/;


    var reg = /^[A-Za-z0-9]{4,15}$/;
    var acc_check = reg.test(acc);

    if (!acc_check) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCTYPE);
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
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_accLogin":
        this.accLogin_cb();
        break;

      case "btn_goregister":
        this.goRegister_cb();
        break;

      case "btn_forgetpas":
        this.showFindPsw();
        break;

      case "btn_explain":
        this.btn_protocol();
        break;

      case "checkExplain":
        this.selectExplain();
        break;

      case "btn_close":
        this.remove();
        break;

      default:
        break;
    }
  },
  //跳转立即注册
  goRegister_cb: function goRegister_cb() {
    this.remove(false);
    glGame.panel.showRegistration();
  },
  btn_protocol: function btn_protocol() {
    glGame.panel.showChildPanel(this.protocol, this.node);
  },
  showFindPsw: function showFindPsw() {
    if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
      glGame.panel.showChildPanel(this.retrievepsw, this.node);
    } else {
      glGame.panel.showServiceBox(glGame.tips.USER.PASSWORD.SERVICE);
    }
  },
  selectExplain: function selectExplain() {
    this.iSagree = this.node_agree.isChecked;
    glGame.storage.setItem("isAgree", {
      data: this.iSagree
    });
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
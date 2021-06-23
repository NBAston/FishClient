"use strict";
cc._RF.push(module, '1a17buFQwtPg5omtYyb242I', 'settingModifypsd');
// modules/plaza/script/prefab/setting/settingModifypsd.js

"use strict";

/**
 * 设置
 */
var EditBoxCustom = require("EditBoxCustom");

glGame.baseclass.extend({
  properties: {
    modifypsd: cc.Node,
    contactkefu: cc.Node,
    psw: cc.EditBox,
    // 旧密码
    newpsw: cc.EditBox,
    // 新密码
    confirmpsw: cc.EditBox,
    // 确认新密码
    cuspsw: EditBoxCustom,
    cusnewpsd: EditBoxCustom,
    cusconfirm: EditBoxCustom
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.initUI();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "kefu":
        glGame.panel.showService(false);
        break;
    }
  },
  initUI: function initUI() {
    if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
      this.modifypsd.active = true;
      this.contactkefu.active = false;
    } else {
      this.contactkefu.active = true;
      this.modifypsd.active = false;
    }
  },
  // 确认更改密码
  click_confirm: function click_confirm() {
    var psw = this.checkPassword(this.psw.string, this.newpsw.string, this.confirmpsw.string);

    if (psw) {
      glGame.user.reqEditPwd({
        old_pwd: md5(this.psw.string),
        pwd: md5(this.newpsw.string),
        type: 1
      });
    }
  },
  // 密码检查
  checkPassword: function checkPassword(psw, newpsw, confirmpsw) {
    if (!psw) return this.showErrorTip(glGame.tips.EDITBOX.PSWNULL);
    if (psw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(psw)) return this.showErrorTip(glGame.tips.EDITBOX.PSWWRONGFUL);
    if (!newpsw) return this.showErrorTip(glGame.tips.EDITBOX.NEWPSWNULL);
    if (newpsw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(newpsw)) return this.showErrorTip(glGame.tips.EDITBOX.NEWPSWWRONGFUL);
    if (!confirmpsw) return this.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWNULL);
    if (confirmpsw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(confirmpsw)) return this.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWWRONGFUL);
    if (psw === newpsw) return this.showErrorTip(glGame.tips.EDITBOX.OLDNEWPSWEQUALS);
    if (newpsw !== confirmpsw) return this.showErrorTip(glGame.tips.EDITBOX.PSWCOFAIL);
    return psw;
  },
  showErrorTip: function showErrorTip(msg) {
    glGame.panel.showTip(msg);
    return null;
  },
  clearUIData: function clearUIData() {
    this.cuspsw.setString("");
    this.cusnewpsd.setString("");
    this.cusconfirm.setString("");
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("editpswsuccess", this);
  },
  editpswsuccess: function editpswsuccess() {
    this.clearUIData();
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
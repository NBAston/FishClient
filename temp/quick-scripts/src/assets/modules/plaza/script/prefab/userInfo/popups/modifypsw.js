"use strict";
cc._RF.push(module, '1e3142A+6NCsq9PtEEokgNh', 'modifypsw');
// modules/plaza/script/prefab/userInfo/popups/modifypsw.js

"use strict";

/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
  properties: {
    psw: cc.EditBox,
    // 旧密码
    newpsw: cc.EditBox,
    // 新密码
    confirmpsw: cc.EditBox // 确认新密码

  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("editpswsuccess", this);
  },
  editpswsuccess: function editpswsuccess() {
    this.remove();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "confirm":
        this.click_confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
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
    this.clearUIData();
    return null;
  },
  clearUIData: function clearUIData() {// this.psw.string = "";
    // this.newpsw.string = "";
    // this.confirmpsw.string = "";
  }
});

cc._RF.pop();
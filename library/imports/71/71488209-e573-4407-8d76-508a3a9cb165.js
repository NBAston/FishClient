"use strict";
cc._RF.push(module, '71488IJ5XNEB412UIo6nLFl', 'bankmodifypsw');
// modules/plaza/script/prefab/userInfo/popups/bankmodifypsw.js

"use strict";

/**
 * 修改银行密码
 */
glGame.baseclass.extend({
  properties: {
    usedpsw: cc.EditBox,
    // 旧密码
    newpsw: cc.EditBox,
    // 新密码
    confirmpsw: cc.EditBox // 确认新密码

  },
  onLoad: function onLoad() {
    glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "btn_close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_confirm: function click_confirm() {
    var psw = this.checkPassword(this.usedpsw.string, this.newpsw.string, this.confirmpsw.string);

    if (psw) {
      glGame.user.reqEditPwd(psw);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  editpswsuccess: function editpswsuccess() {
    this.usedpsw.string = "";
    this.newpsw.string = "";
    this.confirmpsw.string = "";
    this.remove();
  },
  // 密码检查
  checkPassword: function checkPassword(usedpsw, newpsw, confirmpsw) {
    if (!usedpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.OLDPSW);
      return null;
    }

    if (!/\w$/.test(usedpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.PSWWRONGFUL);
      return null;
    }

    if (!newpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NEWPSWNULL);
      return null;
    }

    if (!/\w$/.test(newpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NEWPSWWRONGFUL);
      return null;
    }

    if (!confirmpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.CONFIRMNEWPSW);
      return null;
    }

    if (!/\w$/.test(confirmpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWWRONGFUL);
      return null;
    }

    if (usedpsw === newpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.OLDNEWPSWEQUALS);
      return null;
    }

    if (newpsw !== confirmpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.PSWCOFAIL);
      return null;
    }

    if (!/^[0-9]{6,6}$/.test(newpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NUMBERIC6);
      return null;
    }

    return {
      old_pwd: md5(usedpsw),
      pwd: md5(newpsw),
      type: 2
    };
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("editpswsuccess", this);
  }
});

cc._RF.pop();
/**
 * 设置
 */

let EditBoxCustom = require("EditBoxCustom");

glGame.baseclass.extend({
    properties: {
        modifypsd: cc.Node,
        contactkefu: cc.Node,

        psw: cc.EditBox,        // 旧密码
        newpsw: cc.EditBox,     // 新密码
        confirmpsw: cc.EditBox,  // 确认新密码

        cuspsw: EditBoxCustom,
        cusnewpsd: EditBoxCustom,
        cusconfirm: EditBoxCustom,
    },

    onLoad() {
        this.registerEvent();
        this.initUI();
    },

    onClick(name, node) {
        switch (name) {
            case "confirm":
                this.click_confirm();
                break;
            case "kefu":
                glGame.panel.showService(false);
                break;
        }
    },

    initUI() {
        if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
            this.modifypsd.active = true;
            this.contactkefu.active = false;
        } else {
            this.contactkefu.active = true;
            this.modifypsd.active = false;
        }
    },

    // 确认更改密码
    click_confirm() {
        let psw = this.checkPassword(this.psw.string, this.newpsw.string, this.confirmpsw.string);
        if (psw) {
            glGame.user.reqEditPwd({ old_pwd: md5(this.psw.string), pwd: md5(this.newpsw.string), type: 1 });
        }
    },

    // 密码检查
    checkPassword(psw, newpsw, confirmpsw) {
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

    showErrorTip(msg) {
        glGame.panel.showTip(msg);
        return null;
    },

    clearUIData() {
        this.cuspsw.setString("");
        this.cusnewpsd.setString("");
        this.cusconfirm.setString("");
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
    },

    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("editpswsuccess", this);
    },

    editpswsuccess() {
        this.clearUIData();
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
});

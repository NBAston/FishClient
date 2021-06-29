
glGame.baseclass.extend({

    properties: {
        pwd: cc.EditBox,
        pwdCheck: cc.EditBox,
        tips:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
     },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_sure": this.reqSetDrawPassword(); break;
        }
    },
    setTips(mode){
        this.tips.active = mode == 2;
    },
    set(key, value) {
        this[key] = value;
    },
    // 密码检查
    checkPassword(psw, confimpsw) {
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
    reqSetDrawPassword() {
        let psw = this.checkPassword(this.pwd.string)
        let confirm = this.checkPassword(this.pwd.string, this.pwdCheck.string)
        if (!psw) return;
        if (!confirm) return;
        let newPwd = md5(this.pwd.string)
        let msg = {
            cpwd: md5(this.pwdCheck.string),
            pwd: md5(this.pwd.string)
        }
        glGame.gameNet.send_msg("http.reqSetWithdrawPwd", msg, (route, data) => {
            //刷新当前界面为输入密码界面
            glGame.user.reqWithdraw(Number(this.coin), this.type, newPwd);
            // this.initData();

        })
    },
    withdrawSuccess(){
        this.remove();
    },
    OnDestroy() {
        glGame.emitter.off("withdrawSuccess",this);
    }
    // update (dt) {},
});

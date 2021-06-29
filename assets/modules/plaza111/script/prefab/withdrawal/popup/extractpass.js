
glGame.baseclass.extend({

    properties: {
        password: cc.EditBox,
        tips: cc.Node,
    },
    onLoad() {
        glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
        this.type = 0;
        this.coin = 0;
        this.cashPwdMode = 0;
    },
    initView(t, m, c) {
        this.type = t;
        this.coin = m;
        this.cashPwdMode = c;
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_sure": this.sure(); break;
            case "forgetpass": this.forgetpass(); break;
            case "btn_callSevice": this.callSevice(); break;
        }
    },
    withdrawSuccess() {
        this.remove();
    },
    sure() {
        if (this.password.string == "") {
            return glGame.panel.showTip('请填写取现密码');
        }
        glGame.user.reqWithdraw(Number(this.coin), this.type, this.password.string);
    },
    forgetpass() {
        if (this.cashPwdMode == 1) {
            return glGame.user.get("phone") == 0 ? glGame.panel.showPanelByName("bindPhone") : glGame.panel.showPanelByName("modifyPass");
        } else {
            this.tips.active = true;
        }
    },
    callSevice() {
        this.remove();
        glGame.panel.showService();
    },
    OnDestroy() {
        glGame.emitter.off("withdrawSuccess", this);
    }
});
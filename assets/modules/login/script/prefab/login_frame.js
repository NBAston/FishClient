glGame.baseclass.extend({
    properties: {

    },
    onLoad() {
        this.bolLogin = false;
    },

    OnDestroy() {

    },
    // 按钮点击事件
    onClick(name, node) {
        switch (name) {
            case "btn_acc": return glGame.panel.showRegistration();
            case "btn_tourist": return this.touristLogin();
            default: console.error("no find button name -> %s", name);
        }
    },
    // 游客登陆
    touristLogin() {
        if (this.bolLogin) return;
        this.bolLogin = true;
        // glGame.logon.reqTouLogin();
    },
});

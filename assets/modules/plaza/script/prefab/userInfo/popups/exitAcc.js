/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
    properties: {
    },
    onLoad () {
        this.registerEvent();
    },
    registerEvent () {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    unRegisterEvent () {
    },
    onClick (name, node) {
        switch (name) {
            case "btn_exitAccSure": this.exitAccSure_cb(); break;
            case "btn_exitAccCancel": this.exitAccCancel_cb(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_close () {
        this.remove();
    },
    exitAccSure_cb() {
        let loginCache = glGame.storage.getItem("loginCache");
        if (loginCache) {
            let username = loginCache.pd.substr(-loginCache.le);
            glGame.storage.setItem("number", { data: username })
        }
        glGame.storage.removeItemByKey("loginCache");
        glGame.logon.reqTouLogin();
        this.remove();
        glGame.emitter.emit("unRegisterEventMyinfo")
    },
    exitAccCancel_cb(){
        this.remove();
    }
});
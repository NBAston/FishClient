glGame.baseclass.extend({
    properties: {
        pswedit: cc.EditBox,    // 银行密码输入框
    },
    onLoad () {
        this.resetData();
    },
    resetData () {
        this.pay_password = glGame.user.get("pay_password");
    },
    onClick (name, node) {
        switch (name) {
            case "confirm": this.click_confirm(); break;
            case "btn_close": this.close_cb(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    close_cb(){
        this.node.destroy();
    },
    click_confirm () {
        let psw = this.checkPassword(this.pswedit.string);
        if (psw) {
            this.confirmNext(psw);
            this.remove();
        }
    },
    // 密码检查
    checkPassword (editpsw) {
        this.resetData();
        if (!editpsw) {
            return this.showErrorTip(glGame.tips.EDITBOX.BANKPSWNULL);
        }
        editpsw = md5(editpsw);
        return editpsw;
    },
    click_began(){
       this.pswedit.placeholder= "";
    },
    click_end(){
       if(this.pswedit.string==""){
        this.pswedit.placeholder = "      请输入您设置的银行密码"
       }
    },
    showErrorTip (msg) {
        glGame.panel.showErrorTip(msg);
        return null;
    },
    setConfirmNext (func) {
        this.confirmNext = func;
    },
    set (key, value) {
        this[key] = value;
    }
});
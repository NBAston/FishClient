
glGame.baseclass.extend({

    properties: {
        phoneNumber: cc.Label,
        extracttip: cc.RichText,
        btn_sendCode: cc.Node,
        verificaCode:cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { 
        this.VerificaCD = 60;
        
        glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
    },
    initData(phoneNumber, coin) {
        let Number_str = phoneNumber.toString();
        this.phoneNumber.string = Number_str.replace(Number_str.substring(3, 7), "****");
        this.coin = coin
        this.extracttip.string = `是否确定立即提现${coin}金币？`
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_sendCode": this.sendCode(); break;
            case "btn_sure": this.sure(); break;
        }
    },
    //设置60秒倒计时
    setCutDown() {
        this.btn_sendCode.getComponent(cc.Button).interactable = false;
        this.btn_sendCode.getChildByName("time").active = true;
        this.btn_sendCode.getChildByName("tip").active = false;
        this.node.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(() => {
                this.VerificaCD--
                this.btn_sendCode.getChildByName("time").getComponent(cc.Label).string = `${this.VerificaCD}秒`;
                if (this.VerificaCD == 0) {
                    this.node.stopAllActions();
                    this.VerificaCD = 60;
                    this.btn_sendCode.getChildByName("time").active = false;
                    this.btn_sendCode.getChildByName("tip").active = true;
                    this.btn_sendCode.getComponent(cc.Button).interactable = true;
                }
            })
        )
        ))
    },
    sendCode() {
        if(this.VerificaCD!=60)return
        glGame.gameNet.send_msg("http.reqWithdrawPhone", null, (route, data) => {
            if (!data.result) {
                glGame.panel.showTip("验证码发送失败");
                return;
            }
            glGame.panel.showTip("验证码发送成功");
            this.setCutDown();
            if (data && data.code) {
                console.log("是否有验证码", data.code)
            }
            
        })
    },
    withdrawSuccess(){
        this.remove();
    },
    sure() {
        if (this.verificaCode.string == "")return glGame.panel.showErrorTip(glGame.tips.COMMON.CODE_NULL);
        glGame.user.reqWithdraw(Number(this.coin), this.type, this.verificaCode.string);
    },
    set(key, value) {
        this[key] = value;
    },
    OnDestroy(){
        glGame.emitter.off("withdrawSuccess",this);
    }
    // update (dt) {},
});

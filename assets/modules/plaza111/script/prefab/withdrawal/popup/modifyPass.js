
glGame.baseclass.extend({

    properties: {
        phoneNumber: cc.EditBox,
        passWord: cc.EditBox,
        surePassWord: cc.EditBox,
        verificaCode: cc.EditBox,
        btn_sendCode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.VerificaCD = 60;
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_sure": this.sure(); break;
            case "btn_sendCode": this.sendCode(); break;
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
    // 手机号码检查
    checkPhone(acc) {
        if (!acc) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
            return null;
        }

        let reg = /^\d{11}$/; //验证规则
        let isacc_matcher = reg.test(acc);
        if (!isacc_matcher) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONETYPE); pingf
            return false;
        }
        return acc;
    },
    sendCode() {
        let phone = this.checkPhone(this.phoneNumber.string)
        if (!phone) return;
        let msg = {
            phone: phone,
            type: 11,
        }
        glGame.gameNet.send_msg("http.ReqPostPhoneCode", msg, (route, data) => {
            glGame.panel.showTip("验证码发送成功");
            this.setCutDown();
        })
    },
    sure() {
        let psw = this.checkPassword(this.passWord.string)
        let confirm = this.checkPassword(this.passWord.string, this.surePassWord.string)
        let phone = this.checkPhone(this.phoneNumber.string)
        if (!psw) return;
        if (!confirm) return;
        if (!phone) return;
        if (this.verificaCode.string == "") return glGame.panel.showErrorTip(glGame.tips.COMMON.CODE_NULL);
        let reg = /^[0-9]{0,6}$/;//验证规则
        let verif = reg.test(this.verificaCode.string);
        if (!verif) {
            return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
        }
        let msg = {
            pwd: md5(psw),
            phone: phone,
            type: 3,
            code: verif,
        }
        glGame.gameNet.send_msg("http.ReqEditPwd", msg, (route, data) => {
            this.remove();
            glGame.panel.showTip("修改成功");
        })
    },
    // 密码检查
    checkPassword(psw, confimpsw) {
        if (!psw) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
            return null;
        }
        if (psw.length < 4) {
            glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
            return false;
        }
        if (!/\w$/.test(psw)) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWWRONGFUL);
            return null;
        }
        if (confimpsw == null) return psw;
        if (!confimpsw || psw !== confimpsw) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
            return null;
        }
        return psw;
    },
    OnDestroy() {
    }
    // update (dt) {},
});

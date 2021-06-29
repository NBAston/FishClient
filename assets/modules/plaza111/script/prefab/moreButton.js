
glGame.baseclass.extend({

    properties: {
        btn_bind: cc.Node,
        btn_lucky: cc.Node,
        btn_yuebao: cc.Node,
        btn_sign: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        glGame.emitter.on("updatePlazaSwitch", this.updatePlazaSwitch, this);
        this.btn_lucky.active = glGame.user.dialSwitch == 1;
        this.btn_bind.active = glGame.user.bindPhoneFirst == 0;
        if (glGame.user.isTourist()) {
            this.btn_bind.active = glGame.user.bind_phone_gold == 0 ? false : true;
        } else {
            if (glGame.user.phone != 0 || glGame.user.is_receive_register_phone_coin == 1 || glGame.user.bind_phone_gold == 0) {
                this.btn_bind.active = false
            } else {
                this.btn_bind.active = true
            }
        }
        this.reqRedDot();
        this.updatePlazaSwitch();
    },

    updatePlazaSwitch() {
        this.btn_sign.active = glGame.user.signinSwitch == 1;
    },
    reqRedDot(data) {
        if (!data) data = glGame.user.get('redDotData');
        let count = 0;
        for (let i in data) { count++ };
        if (count == 0) return;
        this.btn_lucky.getChildByName("redMark").active = data['dialRed'] == 1;
        this.btn_yuebao.getChildByName("redMark").active = data['payingReq'] == 1;
        this.btn_sign.getChildByName("redMark").active = data['signinReq'] == 1;
    },
    onClick(name, node) {
        switch (name) {
            case "btn_lucky": this.click_lucky(); break;
            case "btn_bind": this.click_bindPhone(); break;
            case "btn_sign": this.click_sign(); break;
            case "btn_yuebao": this.click_yuebao(); break;
            default: console.error("no find button name -> %s", name);
        }
        this.remove();
    },
    click_lucky(){
        if (glGame.panel.showSuspicious("point_treasure")) {
            return;
        }
        glGame.panel.showPanelByName("luckDraw");
    },
    click_bindPhone(){
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        glGame.panel.showPanelByName("bindPhone");
    },
    click_sign() {
        if (glGame.panel.showSuspicious("receive_Signin_award")) {
            return;
        }
        glGame.panel.showPanelByName('signin');
    },
    click_yuebao(){
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        if (glGame.panel.showSuspicious("balance")) {
            return;
        }
        glGame.panel.showPanelByName('yubao');
    },
    OnDestroy() {
        glGame.emitter.off("updatePlazaSwitch", this);
    }
    // update (dt) {},
});

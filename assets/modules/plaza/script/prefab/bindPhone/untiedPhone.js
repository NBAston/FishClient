glGame.baseclass.extend({
    properties: {
        //解绑手机
        label_untied: cc.Node,
        edit_untiedCode: cc.EditBox,
        node_untiedSend: cc.Node,
        label_untiedCD: cc.Label,
        btn_send: cc.Button,
    },
    onLoad() {
        this.registerEvent();
        
        if (glGame.user.untiedCodeState && glGame.user.untiedVerifiCD > 0) this.UntiedCode(glGame.user.untiedVerifiCD);
    },

    start() {
        let phoneStr = glGame.user.get("phone").toString();
        let new_str = '';
        for (let i = 0; i < phoneStr.length; i++) {
            let valueNum = phoneStr[i];
            if (i > 2 && i < 8) {
                valueNum = '*';
            }
            new_str += valueNum
        }
        this.label_untied.getSelfFunc().setString(glGame.user.get("phone") ? new_str : "");
    },
    registerEvent() {
        glGame.emitter.on("UntiedCode", this.UntiedCode, this);
    },
    unRegisterEvent() {
        glGame.emitter.off("UntiedCode", this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "close": this.close(); break;
            case "btn_untiedSure": this.untiedSure_cb(); break;
            case "btn_untiedSend": this.untiedSend_cb(); break;
            default:
                break;
        }
    },

    untiedSure_cb() {
        let phone = glGame.user.get("phone").toString();
        let code = this.edit_untiedCode.string;
        this.edit_untiedCode.string = '';
        if (!code || code == '') return glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.UNCODE);
        glGame.gameNet.send_msg('http.ReqUntyingPhone', { phone: phone, code: code }, (route, msg) => {
            glGame.panel.showTip(glGame.tips.USER.BIND.UNTIED);
            glGame.user.phone = ''
            glGame.emitter.emit("updateUserData");
            glGame.emitter.emit('updatePlazaSwitch');
            glGame.user.clearUntiedInterval();
            this.UntiedCode(0);

            this.close();
        });
    },

    //解绑手机
    untiedSend_cb() {
        let phone = glGame.user.get("phone").toString();
        glGame.user.reqUntiedCode({ phone: phone, type: 10 })
    },

    UntiedCode(msg) {
        if (glGame.user.get("untiedCodeState") && msg > 0) {            //解绑手机验证码倒计时
            this.node_untiedSend.getComponent(cc.Button).interactable = false;
            this.btn_send.node.getChildByName("img_liang").active = false;
            this.btn_send.node.getChildByName("img_an").active = true;
            this.node_untiedSend.children[0].active = false;
            this.node_untiedSend.children[1].active = true;
            this.label_untiedCD.node.active = true;
            this.node_untiedSend.getChildByName("img_fasong").active = false;
            this.label_untiedCD.string = `${msg}秒`;
        } else {
            this.node_untiedSend.getComponent(cc.Button).interactable = true;
            this.btn_send.node.getChildByName("img_liang").active = true;
            this.btn_send.node.getChildByName("img_an").active = false;
            this.node_untiedSend.children[0].active = true;
            this.node_untiedSend.children[1].active = false;
        }
    },

    close() {
        this.remove()
    },

    // 手机号码检查
    checkPhone(acc) {
        if (!acc) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
            return null;
        }

        //let reg = /^\d{11}$/; //验证规则
        var reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[0-9]\d{8}$/;
        let isacc_matcher = reg.test(acc);
        if (!isacc_matcher) {
            glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONETYPE);
            return false;
        }
        return acc;
    },


    //浮点型运算取俩位
    cutFloat(num) {
        return (Number(num).div(100)).toString();
    },
});

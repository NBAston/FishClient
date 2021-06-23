
glGame.baseclass.extend({

    properties: {
        node_bg: cc.Node,
        phoneItem: cc.Node,
        phoneParent: cc.Node,
    },

    onLoad() {
        this.CustomServerPhone = null;
        this.registerEvent();
        glGame.user.ReqCustomServerPhone();
    },

    refPayData() {
    },



    registerEvent() {
        glGame.emitter.on("updateCustomServerPhone", this.updateCustomServerPhone, this);
    },
    unRegisterEvent() {
        glGame.emitter.off("updateCustomServerPhone", this);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_nowCall": this.callPhoneNum(); break;
        }
    },
    callPhoneNum() {
        if (!this.CustomServerPhone) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            cc.sys.openURL(`tel://${this.CustomServerPhone.phone}`)
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL(`tel://${this.CustomServerPhone.dialCode + this.CustomServerPhone.phone}`)
        } else {
            cc.sys.openURL(`tel://${this.CustomServerPhone.phone}`)
        }

    },
    customData() {
    },

    updateCustomServerPhone(data) {
        this.CustomServerPhone = data;
        glGame.panel.showRemoteImage(this.node_bg, this.CustomServerPhone.imgUrl)
        // this.node_bg.position = cc.v2(0,0); 
        let phoneNumber = this.CustomServerPhone.phone;
        this.phoneParent.getComponent(cc.Label).string = phoneNumber;
        console.log("这是获取客服电话", this.CustomServerPhone)
    },


    start() {

    },

    OnDestroy() {
        this.unRegisterEvent();
    },
    // update (dt) {},
});

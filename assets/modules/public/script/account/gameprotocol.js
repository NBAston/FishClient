
glGame.baseclass.extend({

    properties: {
        content_str: cc.RichText,
    },

    onLoad() {
        this.registerEvent();
        this.initUI();
    },
    start() {

    },
    registerEvent() {
    },
    unRegisterEvent() {
    },

    initUI() {
        this.content_str.string =glGame.gamecfg.TERMSOFSERVICES;
    },


    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            default: break;
        }
    },


    OnDestroy() {
        this.unRegisterEvent();
    },
    // update (dt) {},
});

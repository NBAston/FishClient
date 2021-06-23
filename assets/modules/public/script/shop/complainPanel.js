
glGame.baseclass.extend({

    properties: {
        labReward: cc.Label,
        //buttonLab: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.active = false;
        this.reqComplaintConfig();
    },

    reqComplaintConfig() {
        glGame.gameNet.send_msg("http.reqComplaintContact", null, (route, data) => {
            this.Type = data.type;
            ///this.buttonLab.string = data.type == "qq" ? "复制并打开QQ" : "复制并打开微信";
            this.labReward.string = this.cutFloat(data.reward)+"元"
            this.openUrl = data.url;
            console.log("链接地址", this.openUrl)
            this.node.active = true;
        })
    },

    onClick(name, node) {
        switch (name) {
            case "close":
                console.log("close-------")
                this.remove();
                break;
            case "copy_open":
                this.copy_open();
                break;
        }
    },

    cutFloat(num) {
        return (this.getFloat(Number(num).div(100))).toString();
    },

    getFloat(value, num = 2) {
        value = Number(value);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else {
            return value.toFixed(num);
        }
    },

    copy_open() {
        console.log("copy_open", this.openUrl)
        if (this.Type == "qq") {
            console.log("copy_open", this.openUrl)
            //cc.sys.openURL(this.openUrl)
            glGame.platform.openURL(this.openUrl)
        } else {
            glGame.platform.openURL("weixin://")
        }
    },

    OnDestroy() { },

    start() {

    },

    // update (dt) {},
});

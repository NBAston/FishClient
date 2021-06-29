glGame.baseclass.extend({

    properties: {
        urgentnotice: cc.Node,
        content: cc.Label,
        tip_ctr: cc.Toggle,
        close_node: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.reqEmergentNotice();
        this.initEmergent();
        glGame.emitter.on("newrotice", this.newrotice, this);
    },
    onClick(name, node) {
        console.log("这是当前按键的按钮名字", name)
        switch (name) {
            case "Background":
                // this.reqIgnoreEmergentNotice();
                break;
            case "close":
                if (this.tip_ctr.isChecked) {
                    this.reqIgnoreEmergentNotice();
                }

                glGame.panel.showFirstEnterPanel();
                glGame.isfirstEnterPlaza = false;
                this.urgentnotice.active = false;
                break;
            case "Tip_ctr":
                this.tip_ctr.node.getChildByName("Background").active = !this.tip_ctr.isChecked;
                break;
        }
    },
    newrotice() {
        this.reqEmergentNotice();
    },
    initEmergent() {
        if (glGame.user.get('emergentNotice')) {
            if (glGame.user.get('emergentNotice').content) {
                this.urgentnotice.active = true;
                this.content.string = `${glGame.user.get('emergentNotice').content}`
            } else {
                this.urgentnotice.active = false;
                glGame.panel.showFirstEnterPanel();
                glGame.isfirstEnterPlaza = false;
            }
        }
    },
    //紧急公告请求
    reqEmergentNotice() {
        glGame.gameNet.send_msg("http.reqEmergentNotice", {}, (route, msg) => {
            console.log("这是当前紧急公告的消息", msg)
            if (msg.result.content) {
                this.urgentnotice.active = true;
                this.content.string = `${msg.result.content}`
            } else {
                this.urgentnotice.active = false;
                glGame.panel.showFirstEnterPanel();
                glGame.isfirstEnterPlaza = false;
            }
        })
    },

    setTipCtr(bol) {
        this.tip_ctr.node.active = bol;
    },

    setClose(bol){
        this.close_node.active = bol;
    },

    //不显示紧急公告
    reqIgnoreEmergentNotice() {
        glGame.gameNet.send_msg("http.reqIgnoreEmergentNotice", {}, (route, msg) => {
            console.log("不再显示紧急公告请求成功")
        })
    },
    OnDestroy() {
        glGame.emitter.off("newrotice", this);
    }
});

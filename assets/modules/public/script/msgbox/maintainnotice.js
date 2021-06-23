glGame.baseclass.extend({

    properties: {
        content: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    },
    onClick(name, node) {
        console.log("这是当前按键的按钮名字", name)
        switch (name) {
            case "btn_exit":
                cc.game.end();
                break;
            case "btn_sever":
                this.serviceUrl = glGame.user.get('url').serviceOuter;
                cc.sys.openURL(this.serviceUrl);
                break;
        }
    },
    setContent(content){
        this.content.string = content;
    },

    OnDestroy() {
    }
});

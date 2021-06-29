glGame.baseclass.extend({
    properties: {
        node_cancel: cc.Node,
        node_confirm: cc.Node,
        lab_content: cc.Label,
        richText_content: cc.RichText,
        node_exitRoomTip: cc.Node,
    },
    onLoad() {
        this.node.zIndex = 1000;
        this.confirm = null;
        this.cancel = null;
        this.registerEvent();
    },
    registerEvent() {
        glGame.emitter.on("onStartGame", this.onStartGame, this);
    },
    unRegisterEvent() {
        glGame.emitter.off("onStartGame", this);
    },
    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "close": this.cancel(); break;
            case "confirm": this.confirm(); break;
            default: console.error("no find button name -> %s", name);
        }
        this.remove();
    },
    /**
     * @param content 提示内容
     * @param isSingle 是否显示单个确定按钮
     * @param next 确定回调
     * @param cancel 取消回调
     */
    showMsg(content, isSingle, next, cancel, center = false) {
        this.confirm = next || function () { };
        this.cancel = cancel || function () { this.node.destroy() };
        this.setType(isSingle);
        if (~content.indexOf("<color=")) {
            this.lab_content.node.active = false;
            this.richText_content.node.active = true;
            this.richText_content.string = content;
        } else {
            this.lab_content.string = content;
        }
        this.lab_content._forceUpdateRenderData();
        if (this.lab_content.node.height > 60) {
            this.lab_content.horizontalAlign = 0;
        }
        if (center) {
            this.lab_content.horizontalAlign = 1;
        }
    },

    /**
     * @param next 确定回调
     */
    showMsgExit() {
        this.confirm = function () { glGame.room.exitRoom(); };
        this.cancel = function () { this.remove(); };
        this.node_exitRoomTip.active = true;
    },

    onStartGame() {
        this.remove();
    },
    //显示类型
    setType(isSingle) {
        if (isSingle) {
            this.node_cancel.active = false;
            this.node_confirm['_firstX'] = this.node_confirm.x;
            this.node_confirm.x = 0;
        } else {
            this.node_cancel.active = true;
            if (this.node_confirm['_firstX']) this.node_confirm.x = this.node_confirm['_firstX'];
        }
    }
});

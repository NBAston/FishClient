glGame.baseclass.extend({
    properties: {
        lab_content: cc.Label,
        richText_content: cc.RichText,
    },
    onLoad() {
        this.node.zIndex = 1000;
        this.confirm = null;
        this.cancel = null;
        this.registerEvent();
    },

    registerEvent() { },

    unRegisterEvent() { },

    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "close": break;
            case "confirm": this.confirm(); break;
            default: console.error("no find button name -> %s", name);
        }
        this.remove();
    },
    /**
     * @param content   提示内容
     * @param next      确定回调
     * @param center    水平对齐
     */
    showMsg(content, next, center = false) {
        this.confirm = next || function () { glGame.panel.showService(true); };
        if (~content.indexOf("<color=")) {
            this.lab_content.node.active = false;
            this.richText_content.node.active = true;
            this.richText_content.string = content;
        } else {
            this.lab_content.string = content;
        }
        this.lab_content._forceUpdateRenderData();
        if (this.lab_content.node.height > 120) {
            this.lab_content.horizontalAlign = 0;
        }
        if (center) {
            this.lab_content.horizontalAlign = 1;
        }
    },

});

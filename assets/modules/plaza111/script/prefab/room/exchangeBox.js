glGame.baseclass.extend({
    properties: {
        richText_content: cc.RichText,
    },
    onLoad() {
        this.node.zIndex = 1000;
        this.registerEvent();
    },
    registerEvent() {
    },
    unRegisterEvent() {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_close": break;
            case "btn_confirm": this.confirm(); break;
            default: console.error("no find button name -> %s", name);
        }
        this.remove();
    },
    /**
     * @param content 提示内容
     * @param next 确定回调
     */
    showMsg(content, next) {
        this.confirm = next || function () { };

        this.richText_content.string = content;
    },
});

glGame.baseclass.extend({
    properties: {
    },
    onLoad() {
        this.registerEvent();
    },

    start() {
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
            case "close": this.close(); break;
            case "btn_unbindSure": this.unbindSure_cb(); break;
            default:
                break;
        }
    },

    //无法更改手机
    unbindSure_cb() {
        this.close();
        glGame.panel.showService();
    },

    close() {
        this.remove()
    },
});

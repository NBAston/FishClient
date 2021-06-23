glGame.baseclass.extend({
    properties: {
        hundred: cc.Node,
        coin: cc.Node,
    },
    onLoad() {
        this.node.scale = glGame.systemclass.convertInterface();
    },

    showType(_type) {
        this[_type].active = true;
    },

    onClick(name, node) {
        switch (name) {
            case 'btn_confirm':
                glGame.room.exitRoom();
                break;
            case 'btn_cancle':
                this.node.destroy();
                break;
        }
    }
});

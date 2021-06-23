glGame.baseclass.extend({
    properties: {
    },
    onLoad() {
        this.node.zIndex = 1000;
    },
    OnDestroy() {
    },

    onClick(name, node) {
        switch (name) {
            case "close": this.close(); break;
            case "confirm": this.confirm(); break;
            case "repairgame": this.repairgame(); break;
            case "btn_remind": this.btn_remind(node); break;
            default: console.error("no find button name -> %s", name);
        }
    },

    close() {
        glGame.panel.showFirstEnterPanel();
        this.remove();
    },
    setTips(bool) {
        this.node.getChildByName("remind_tip").active = bool;
        this.node.getChildByName("btn_remind").active = bool;
        if (!bool) {
            this.node.getChildByName("confirm").y -= 50
            this.node.getChildByName("repairgame").y -= 50
        }
    },
    confirm() {
        cc.sys.openURL(glGame.user.get("url").repair);
        console.log("click 马上安装")
        let isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
        isShowSetupPanel.isSetup = true;
        glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
    },

    repairgame() {
        this.remove();
        glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', () => { clearGame(); console.log("清空游戏缓存") }, () => { }, "取消", "确定");
    },

    btn_remind(node) {
        if (node.children[0].active) {
            node.children[0].active = false;
        } else {
            node.children[0].active = true;
        }
        let isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
        isShowSetupPanel.isSetup = !node.children[0].active;
        glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
    }
});

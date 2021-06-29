/**
 * 设置
 */

glGame.baseclass.extend({
    properties: {
    
    },

    onLoad() {
        this.initUI();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_ok":
                this.onOkClick();
                break;
            case "btn_repair":
                this.onRepairClick();
                break;
            case "btn_install":
                this.onInstallClick();
                break;
        }
    },

    initUI() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.node.getChildByName("android").active = true;
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            this.node.getChildByName("ios").active = true;
        }
    },

    onOkClick() {
        glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', () => { clearGame(); console.log("清空游戏缓存") }, () => { }, "取消", "确定");
    },

    onRepairClick() {
        glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', () => { clearGame(); console.log("清空游戏缓存") }, () => { }, "取消", "确定");
    },

    onInstallClick() {
        cc.sys.openURL(glGame.user.get("url").repair);
        let isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
        isShowSetupPanel.isSetup = true;
        glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
    },

    // 注册界面监听事件
    registerEvent() {
        
    },

    // 销毁界面监听事件
    unRegisterEvent() {
        
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
});

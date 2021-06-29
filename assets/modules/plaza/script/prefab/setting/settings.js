/**
 * 设置
 */

glGame.baseclass.extend({
    properties: {
        mainPanel: cc.Node,
        toggleRepair: cc.Node,
        toggleModify: cc.Node,
    },

    onLoad() {
        this.registerEvent();
        if(!cc.sys.isNative) {
            this.toggleRepair.active = false;
        }

        if (glGame.user.isTourist()) {
            this.toggleModify.active = false;
        }

        if(cc.sys.isNative) {
            let frame = this.node.getChildByName("bg");
            frame.getChildByName("version").getComponent(cc.Label).string = `当前版本: ${glGame.version}`;
        }

        this.showPanel("volume");

        glGame.panel.showEffectPariticle(this.node);
    },

    onClick(name, node) {
        switch (name) {
            case "volume":
            case "sound":
            case "repair":
            case "about":
            case "modifypsd":
                this.showPanel(name); break;
            case "head": this.changeHead_cb(); break;
            case 'btn_grzl': this.userEdit_cb(); break;
            case 'btn_phoneEdit': this.phoneEdit_cb(); break;
            case 'btn_nicknameEdit': this.nicknameEdit_cb(); break;
            case "close":
                this.remove()
                break;
        }
    },

    //显示某个界面。按名字来显示
    showPanel(panelName) {
        this.hideAllPanel();
        let panellist = {};
        panellist["volume"] = "settingVolume";
        panellist["sound"] = "settingSelectMusic";
        panellist["repair"] = "settingRepair";
        panellist["about"] = "settingAbout";
        panellist["modifypsd"] = "settingModifypsd";
        
        for (let name in panellist) {
            let index = 0;
            if (panelName == name) index = 1;
        }

        if (this.mainPanel.getChildByName(panellist[panelName])) {
            this.mainPanel.getChildByName(panellist[panelName]).active = true;
            return;
        }

        glGame.panel.getPanelByName(panellist[panelName]).then(panelData => {
            panelData.setPosition(cc.v2(0, 0));
            panelData.parent = this.mainPanel;

        })
    },

    //隐藏所有界面
    hideAllPanel() {
        if (!this.mainPanel.childrenCount) return;
        for (let i = 0; i < this.mainPanel.childrenCount; i++) {
            this.mainPanel.children[i].active = false;
        }
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

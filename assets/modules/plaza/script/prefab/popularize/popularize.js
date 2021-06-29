glGame.baseclass.extend({
    properties: {
        select: cc.Node,
        content: cc.Node,
        audio: {
            type: cc.AudioClip,
            default: null
        },
    },
    onLoad() {
        this.registerEvent();
        glGame.audio.playSoundEffect(this.audio)
        this.openAllChildInteractable(false);
        glGame.panel.showEffectPariticle(this.node);
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("refreshPopularize", this.refreshPopularize, this);
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.ReqPlayerExtensionCountless, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("refreshPopularize", this);
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    },

    refreshPopularize() {
        // 清理相关数据界面
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountless', {}, (route, msg) => {
            this.pandectdata = msg;
            this.ruleDetaildata = msg.level;
            let name = "pandect";
            let pandect = this.content.getChildByName(name);
            let script = pandect.getComponent(name);
            script.initUI(this.pandectdata, this.ruleDetaildata);
            if (this.content.getChildByName("getrecord")) this.content.getChildByName("getrecord").removeFromParent();
            if (this.content.getChildByName("ruleDetail")) this.content.getChildByName("ruleDetail").removeFromParent();
        })
    },

    onClick(name, node) {
        switch (name) {
            case "pandect": this.pandect_CB(); break;
            case "todaybrokerage": this.todaybrokerage_CB(); break;
            case "historybrokerage": this.historybrokerage_CB(); break;
            case "subordinate": this.subordinate_CB(); break;
            case "getrecord": this.getrecord_CB(); break;
            case "bonus": this.bonus_CB(); break;
            case "btn_return": this.close(); break;
        }
    },
    //推广总览的数据
    ReqPlayerExtensionCountless() {
        this.openAllChildInteractable(false);
        let name = "pandect";
        if (this.pandectdata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountless', {}, (route, msg) => {
            this.pandectdata = msg;
            this.ruleDetaildata = msg.level;
            glGame.panel.getPanelByName(name).then(pandect => {
                pandect.parent = this.content;
                this.openAllChildInteractable(true);
                let script = pandect.getComponent(name);
                script.initUI(this.pandectdata, this.ruleDetaildata);
            });
        })
    },
    //今日佣金
    ReqPlayerExtensionCountlessDaily() {
        this.openAllChildInteractable(false);
        let name = "todaybrokerage";
        if (this.todaybrokeragetdata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessDaily', { page: 1, page_size: 8 }, (route, msg) => {
            this.todaybrokeragetdata = msg;
            glGame.panel.showPanelByName(name).then(todaybrokerage => {
                todaybrokerage.parent = this.content;
                this.openAllChildInteractable(true);
                let script = todaybrokerage.getComponent(name);
                script.initUI(this.todaybrokeragetdata)
            });
        })
    },
    ReqPlayerExtensionCountlessRecord() {
        this.openAllChildInteractable(false);
        let name = "historybrokerage";
        if (this.historybrokeragedata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecord', { page: 1, page_size: 8 }, (route, msg) => {
            this.historybrokeragedata = msg;
            glGame.panel.showPanelByName(name).then(historybrokerage => {
                historybrokerage.parent = this.content;
                this.openAllChildInteractable(true);
                let script = historybrokerage.getComponent(name);
                script.initUI(this.historybrokeragedata);
            });
        })
    },
    ReqPlayerExtensionCountlessMember() {
        this.openAllChildInteractable(false);
        let name = "subordinate";
        if (this.subordinatedata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessMember', { page: 1, page_size: 8 }, (route, msg) => {
            this.subordinatedata = msg;
            glGame.panel.showPanelByName(name).then(subordinate => {
                subordinate.parent = this.content;
                this.openAllChildInteractable(true);
                let script = subordinate.getComponent(name);
                script.initUI(this.subordinatedata);
            });
        })
    },
    ReqPlayerExtensionCountlessFlow() {
        this.openAllChildInteractable(false);
        let name = "getrecord";
        if (this.getrecorddata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessFlow', { page: 1, page_size: 8 }, (route, msg) => {
            this.getrecorddata = msg;
            glGame.panel.showPanelByName(name).then(getrecord => {
                getrecord.parent = this.content;
                this.openAllChildInteractable(true);
                let script = getrecord.getComponent(name);
                script.initUI(this.pandectdata, this.getrecorddata);
            });
        })
    },
    ReqPlayerExtensionCountlessLevel() {
        this.openAllChildInteractable(false);
        let name = "ruleDetail";
        if (this.ruleDetaildata && this.content.getChildByName(name)) {
            this.content.getChildByName(name).active = true;
            this.openAllChildInteractable(true);
        } else if (this.ruleDetaildata) {
            glGame.panel.showPanelByName(name).then(ruleDetail => {
                ruleDetail.parent = this.content;
                this.openAllChildInteractable(true);
                let script = ruleDetail.getComponent(name);
                script.initUI(this.pandectdata, this.ruleDetaildata);
            });
        } else {
            glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessLevel', {}, (route, msg) => {
                this.ruleDetaildata = msg;
                glGame.panel.showPanelByName(name).then(ruleDetail => {
                    ruleDetail.parent = this.content;
                    this.openAllChildInteractable(true);
                    let script = ruleDetail.getComponent(name);
                    script.initUI(this.pandectdata, this.ruleDetaildata);
                });
            })
        }
    },
    pandect_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountless();
    },
    todaybrokerage_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountlessDaily();
    },
    historybrokerage_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountlessRecord();
    },
    subordinate_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountlessMember();
    },
    getrecord_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountlessFlow();
    },
    bonus_CB() {
        this.allChildActive();
        this.ReqPlayerExtensionCountlessLevel();
    },

    allChildActive() {
        if (!this.content.childrenCount) return;
        for (let i = 0; i < this.content.childrenCount; i++) {
            this.content.children[i].active = false;
        }
    },

    openAllChildInteractable(bol) {
        if (!this.select.childrenCount) return;
        for (let i = 0; i < this.select.childrenCount; i++) {
            if (!this.select.children[i].getComponent(cc.Toggle)) continue;
            this.select.children[i].getComponent(cc.Toggle).interactable = bol;
        }
    },

    close() {
        this.remove()
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    // update (dt) {},
});

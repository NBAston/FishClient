glGame.baseclass.extend({

    properties: {
        content: cc.Node,
        labDiamonds: cc.Label,
        btnContent: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent();
        this.updataInfo();
    },

    start() {

    },

    setGameButton(gameId) {
        this.gameId = gameId;
        let gameName = glGame.scene.getSceneNameByID(gameId);
        this.selectGame(gameName);
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("updateUserData", this.updataInfo, this);
        glGame.emitter.on(MESSAGE.UI.EXIT_CREATE_ROOM, this.remove, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("updateUserData", this);
        glGame.emitter.off(MESSAGE.UI.EXIT_CREATE_ROOM, this);
    },

    onClick(name, node) {
        switch (name) {
            case "rqznn":
            case "rzjh":
            case "rsss":
            case "rddz":
            case "rbjl":
            case "resyd":
            case "rxzdd":
                this.selectGame(name);
                break;
            case "btn_close": this.remove(); break;
            case "btn_add": glGame.panel.showPanelByName("exchangeDiamond"); break;
            default: break;
        }
    },

    //刷新钻石数量
    updataInfo() {
        this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
    },

    //隐藏所有界面
    hideAllPanel() {
        if (!this.content.childrenCount) return;
        for (let i = 0; i < this.content.childrenCount; i++) {
            this.content.children[i].active = false;
        }
    },

    setButton(name) {
        for (let i = 0; i < this.btnContent.childrenCount; i++) {
            let btn = this.btnContent.children[i];
            if (btn.name === name) {
                btn.getComponent(cc.Toggle).isChecked = true;
            }
        }
    },

    selectGame(name) {
        this.hideAllPanel();
        this.setButton(name);
        this.getGameIdByRoomNum(name);
        // if (name == "rqznn") {
        //     this.getGameIdByRoomNum(name);
        // } else {
        //     if (this.content.getChildByName(`${name}Create`)) {
        //         this.content.getChildByName(`${name}Create`).active = true;
        //         return;
        //     }

        //     glGame.panel.getPanelByName(`${name}Create`).then(panelData => {
        //         if (!panelData) return;
        //         panelData.parent = this.content;
        //     })
        // }
    },

    getGameIdByRoomNum(gameName) {
        // 检查当前游戏是否已经在更新队列
        if (glGame.assetsManager.isUpdateQueue(this.gameId)) return;

        // 检查游戏是否需要更新
        glGame.gamelistcfg.isNeedUpdate(this.gameId).then(bol => {
            if (bol) {
                // 开始更新【%s(游戏名称)】，请耐心等待...
                glGame.panel.showTip(`开始更新【${glGame.room.getGameDictById(this.gameId)}】，请耐心等待...`);
                let gameName = glGame.scene.getSceneNameByID(this.gameId);
                glGame.gamelistcfg.setGameUpdate(gameName, false);
                glGame.assetsManager.gameUpdata({gameID: this.gameId, manifestUrl: null});
                this.remove();
            } else {
                if (this.content.getChildByName(`${gameName}Create`)) {
                    this.content.getChildByName(`${gameName}Create`).active = true;
                    return;
                }
        
                glGame.panel.getPanelByName(`${gameName}Create`).then(panelData => {
                    if (!panelData) return;
                    panelData.parent = this.content;
                })
            }
        });
    },

    //浮点型运算取俩位
    cutFloat(value, num = 2) {
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.div(100).toString();
        } else {
            value = Number(value).div(100);
            return (Math.floor(value * 100) / 100).toFixed(num);
        }
    },

    getFixNumber(value) {
        let value1 = Number(value).div(10);
        value = Number(value).div(100);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else if (~~value1 === value1) {
            return value.toFixed(1);
        } else {
            return value.toFixed(2);
        }
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
})
/**
 * 金币房间入口通用脚本
 */
glGame.baseclass.extend({
    properties: {
        level: {
            type: cc.Node,
            default: []
        },
    },

    onLoad() {
        this.node.active = false;
        this.reqEnterArea();
        this.registerEvent();
    },

    start() {

    },
    //事件监听
    registerEvent() {
        glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },
    //事件销毁
    unregisterEvent() {
        glGame.emitter.off("goldOnlineNum", this);
        glGame.emitter.off("onGameConfig", this);
    },
    onGameConfig(msg) {
        this.gameConfig = msg;
        this.initUI();
    },
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
    reqEnterArea() {
        switch (this.node.name) {
            case 'ddzselect':
                this.gameID = glGame.scenetag.DDZ;
                glGame.readyroom.reqEnterArea(glGame.scenetag.DDZ);
                break;
            case 'dzpkselect':
                this.gameID = glGame.scenetag.DZPK;
                glGame.readyroom.reqEnterArea(glGame.scenetag.DZPK);
                break;
            case 'paijiuselect':
                this.gameID = glGame.scenetag.PAIJIU;
                glGame.readyroom.reqEnterArea(glGame.scenetag.PAIJIU);
                break;
            case 'qznnselect':
                this.gameID = glGame.scenetag.QZNN;
                glGame.readyroom.reqEnterArea(glGame.scenetag.QZNN);
                break;
            case 'sangongselect':
                this.gameID = glGame.scenetag.SANGONG;
                glGame.readyroom.reqEnterArea(glGame.scenetag.SANGONG);
                break;
            case 'zhajinhuaselect':
                this.gameID = glGame.scenetag.ZHAJINHUA;
                glGame.readyroom.reqEnterArea(glGame.scenetag.ZHAJINHUA);
                break;
            case 'ebgselect':
                this.gameID = glGame.scenetag.EBG;
                glGame.readyroom.reqEnterArea(glGame.scenetag.EBG);
                break;
            case 'esydselect':
                this.gameID = glGame.scenetag.ESYD;
                glGame.readyroom.reqEnterArea(glGame.scenetag.ESYD);
                break;
            case 'fishselect':
                this.gameID = glGame.scenetag.FISH2;
                glGame.readyroom.reqEnterArea(glGame.scenetag.FISH2);
                break;
            case 'jszjhselect':
                this.gameID = glGame.scenetag.JSZJH;
                glGame.readyroom.reqEnterArea(glGame.scenetag.JSZJH);
                break;
            case 'sssselect':
                this.gameID = glGame.scenetag.SSS;
                glGame.readyroom.reqEnterArea(glGame.scenetag.SSS);
                break;
        }
    },
    goldOnlineNum(msg) {
        console.log("这是在线人数的消息", msg)
        let count = this.level.length;
        for (let i = 0; i < count; i++) {
            if (msg[i + 1]) {
                this.level[i].getChildByName("people_num").getComponent(cc.Label).string = msg[i + 1]
            }
        }
    },
    initUI() {
        this.node.active = true;
        let configure = this.gameConfig;
        if (this.gameID == glGame.scenetag.FISH2) {
            this.level[0].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = `${this["gameConfig"]['99'].BaseConsume >= 1000000 ? this.cutFloat(this["gameConfig"]['99'].BaseConsume / 10000) + '万' : this.cutFloat(this["gameConfig"]['99'].BaseConsume)}`;
            let downString1 = this["gameConfig"]['99'].EntranceRestrictions >= 1000000 ? `${this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions / 10000)}万` : this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions);
            this.level[0].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString1;
            for (let i = 1; i < 6; i++) {
                let roomConfig = this["gameConfig"][i];
                let downString = roomConfig.EntranceRestrictions >= 1000000 ? `${this.cutFloat(roomConfig.EntranceRestrictions / 10000)}万` : this.cutFloat(roomConfig.EntranceRestrictions);
                this.level[i].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = `${roomConfig.BaseConsume >= 1000000 ? this.cutFloat(roomConfig.BaseConsume / 10000) + '万' : this.cutFloat(roomConfig.BaseConsume)}`;

                this.level[i].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString;
            }
            return;
        };

        let count = this.level.length;
        for (let i = 1; i < count; i++) {
            if (this.gameID == glGame.scenetag.DZPK) {
                this.level[i].getChildByName("dizhulaout").getChildByName('dizhu_numbig').getComponent(cc.Label).string = `${this.cutFloat(configure[i].SmallBaseChips)}/${this.cutFloat(configure[i].BaseChips)}`
                this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
            } else {
                this.level[i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
                this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
            }
            if (this.gameID == glGame.scenetag.DDZ) {
                this.level[i].getChildByName('label').getComponent(cc.Label).string = `最大${configure[i].RoomMaxMultiple}倍`
                this.level[i].getChildByName('black').width = this.level[i].getChildByName('label').width + 10
            }
        }
        if (this.gameID == glGame.scenetag.DDZ) {
            this.level[0].getChildByName('label').getComponent(cc.Label).string = `最大${this["gameConfig"]['99'].RoomMaxMultiple}倍`
            this.level[0].getChildByName('black').width = this.level[0].getChildByName('label').width + 10
        }
    },
    // 重写父类按钮点击事件
    onClick(name, node) {
        switch (name) {
            case "primary": this.enterGame(99); break;
            case "intermediate": this.enterGame(1); break;
            case "senior": this.enterGame(2); break;
            case "tuhao": this.enterGame(3); break;
            case "supremacy": this.enterGame(4); break;
            case "volvo": this.enterGame(5); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    /**
     * 进入金币场房间
     * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
     */
    enterGame(level) {
        glGame.room.reqMyGameState(this.gameID, level).then(() => {
            let gameID = this.gameID;
            if (this.gameConfig[level] == null) {
                glGame.panel.showMsgBox('提示', '该房间尚未开放，请尝试其他房间。');
                return;
            }
            if (glGame.user.isTourist()) {
                if (level != 99) {
                    glGame.panel.showRegisteredGift(true)
                    return;
                }
            }
            if (gameID == glGame.scenetag.FISH2) {
                if (glGame.user.get("coin") >= this["gameConfig"][level].EntranceRestrictions) {
                    glGame.room.sendEnterRoom(level);
                } else {
                    let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
                    glGame.panel.showDialog("", string, () => { glGame.panel.showShop() }, () => { }, "取消", "充值");
                }
                return;
            };
            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                console.log("这是当前的房间限制", this.gameConfig)
                let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
                glGame.panel.showDialog("", string, () => { glGame.panel.showShop() }, () => { }, "取消", "充值");
                return
            }
            glGame.panel.showJuHua();
            // glGame.readyroom.reqExitArea();
            this.node.runAction(cc.sequence(
                cc.delayTime(15),
                cc.callFunc(() => {
                    glGame.panel.closeJuHua();
                })
            ))
            // TODO
            // reqGoldRoomVerify为旧的进入房间方法，需要先请求验证，再进入房间
            // setGoldRoomInfo 新的进入房间方法，无需验证，设置游戏类型以及房间信息后，直接进入房间
            // if (glGame.enterRoomVerification) {
            //     glGame.room.reqGoldRoomVerify(gameID, level);
            // } else {
            //     glGame.room.setGoldRoomInfo(gameID, level);
            // }
            glGame.room.setGoldRoomInfo(gameID, level);
        })
    },
    /**
     * 检查玩家金币是否足够
     * @returns {boolean}
     */
    checkGold(coin, minCion) {
        console.log("金币检测", coin, minCion);
        if (parseInt(coin) < parseInt(minCion)) {
            glGame.panel.showDialog(glGame.i18n.t("USER.GOLDLACK.TITLE"), glGame.i18n.t("USER.GOLDLACK.CONTENT"), () => {
                glGame.panel.showPanelByName("shop");
            }, null);
            return false;
        }
        return true;
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    set(key, value) {
        this[key] = value;
    },
    get(key) {
        return this[key];
    },
    OnDestroy() {
        this.unregisterEvent();
    }
});

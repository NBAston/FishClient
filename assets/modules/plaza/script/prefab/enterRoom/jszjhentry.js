glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        selectNode: cc.Node,
        gameRule: cc.Prefab,
        gameRecord: cc.Prefab,
        BGM: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad() {
        this.gameid = 0;
        this.node.zIndex = 20;
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
        glGame.emitter.on("nodeRemove", this.click_back, this);
        glGame.emitter.on("updateUserData", this.updateuserInfo, this);
        this.registerEvent();
        this.reqEnterArea();
        this.updateuserInfo();
        this.playEnterAnimation();
    },

    // 播放入场动画
    playEnterAnimation() {
        for (let i = 1; i <= 4; i++) {
            let entryNode = this.selectNode.getChildByName(`entry${i}`);
            entryNode.opacity = 0;
            let originPos = entryNode.position;
            if (i % 2 == 1) {
                entryNode.x -= 300;
            } else {
                entryNode.x += 300;
            }

            let moveTo = cc.moveTo(0.3, originPos);
            let fadeIn = cc.fadeIn(0.1);
            moveTo.easing(cc.easeBackOut());
            entryNode.runAction(cc.spawn(moveTo, fadeIn));
        }
    },

    RootNodeShow() {
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
    },

    RootNodeHide() {
        this.node.active = false;
        this.unregisterEvent();
    },

    //事件监听
    registerEvent() {
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },

    //事件销毁
    unregisterEvent() {
        glGame.emitter.off("onGameConfig", this);
    },

    onGameConfig(msg) {
        this.gameConfig = msg;
        this.refreshUI();
    },

    reqEnterArea() {
        this.gameID = glGame.scenetag.JSZJH;
        glGame.readyroom.reqEnterArea(glGame.scenetag.JSZJH);
    },

    refreshUI() {
        this.node.active = true;
        let gameConfig = this.gameConfig;

        for (let i = 1; i <= 3; i++) {
            let entryNode = this.selectNode.getChildByName(`entry${i + 1}`);
            entryNode.getChildByName("dizhu_num").getComponent(cc.Label).string = `底注：${this.getFloat(gameConfig[i].BaseChips)}`;
            entryNode.getChildByName("zhunru_num").getComponent(cc.Label).string = `准入：${this.getFloat(gameConfig[i].EntranceRestrictions)}`;
        }
    },

    onClick(name, node) {
        switch (name) {
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo": this.click_addgold(); break;
            case "headbg": this.click_userinfo(); break;
            case "btn_chongzhi": this.click_addgold(); break;
            case "entry1": this.enterGame(99); break;
            case "entry2": this.enterGame(1); break;
            case "entry3": this.enterGame(2); break;
            case "entry4": this.enterGame(3); break;
            default: console.error("no find button name -> %s", name);
        }
    },

    /**
     * 进入金币场房间
     * @param level 场次类型 1:普通房 2:贵宾房 3:富豪房 4:至尊房
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
                    glGame.panel.showRegisteredGift(true);
                    return;
                }
            }

            if ((glGame.user.suspicious == 1 && glGame.user.game == 2) || glGame.user.is_game == 2) {
                glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => { }, "我知道了", "联系客服")
                return;
            }

            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                console.log("这是当前的房间限制", this.gameConfig)
                let string = ` <color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
                glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "取消", "充值");
                return
            }

            glGame.panel.showJuHua();
            this.node.runAction(cc.sequence(
                cc.delayTime(15),
                cc.callFunc(() => {
                    glGame.panel.closeJuHua();
                })
            ))

            glGame.room.setGoldRoomInfo(gameID, level);
        })
    },

    /**
     * 检查玩家金币是否足够
     * @returns {boolean}
     */
    checkGold(coin, minCion) {
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

    showUserInfo() {
        glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
    },

    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.goldCount.string = glGame.user.cutFloat(coin);
    },

    setGameId(gameid) {
        this.gameid = gameid;
    },

    updateBgInfo() {
    },

    click_userinfo() {
        glGame.panel.showPanelByName("userinfo");
    },

    click_addgold() {
        glGame.panel.showShop(30);
    },

    click_back() {
        glGame.readyroom.reqExitArea();
        this.remove();
    },

    click_help() {
        let game_rule = glGame.panel.showPanel(this.gameRule);
        game_rule.zIndex = 30;
    },

    click_record() {
        let game_record = glGame.panel.showPanel(this.gameRecord);
        game_record.zIndex = 30;
    },

    set(key, value) {
        this[key] = value;
    },

    get(key) {
        return this[key];
    },

    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData", this);
        this.unregisterEvent();
    }
});

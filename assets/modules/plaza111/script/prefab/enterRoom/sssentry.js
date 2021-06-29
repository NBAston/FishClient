glGame.baseclass.extend({

    properties: {
        BGM: {
            type: cc.AudioClip,
            default: null,
        },
        goldCount: cc.Label,
        sssRecord: cc.Prefab,
        sssRule: cc.Prefab,

        ptf_text: [cc.Label],
        gbf_text: [cc.Label],
        fhf_text: [cc.Label],

        sp_role: [sp.Skeleton],

        level: {
            type: cc.Node,
            default: []
        },
    },

    onLoad() {
        this.limitTxt = [
            this.tyf_text,
            this.ptf_text,
            this.gbf_text,
            this.fhf_text
        ];

        this.gameid = 0;
        this.node.zIndex = 20;
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
        glGame.emitter.on("nodeRemove", this.click_back, this);
        glGame.emitter.on("updateUserData", this.updateuserInfo, this);
        this.registerEvent();
        this.reqEnterArea();
        this.updateuserInfo();
        this.aniEvent();
    },

    RootNodeShow(){
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
    },

    RootNodeHide(){
        this.node.active = false;
        this.unregisterEvent();
    },

    registerEvent() {
        glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },

    unregisterEvent() {
        glGame.emitter.off("goldOnlineNum", this);
        glGame.emitter.off("onGameConfig", this);
    },

    reqEnterArea() {
        this.gameID = glGame.scenetag.SSS;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SSS);
    },

    onGameConfig(msg) {
        this.gameConfig = msg;
        this.initUI();
    },

    initUI() {
        this.node.active = true;
        let configure = this.gameConfig;
        let count = this.level.length;
        for (let i = 0; i < count; i++) {
            if (i > 0) {
                // 底注
                this.limitTxt[i][0].string = this.getFloat(configure[i].BaseChips);
                // 准入
                this.limitTxt[i][1].string = this.getFloat(configure[i].EntranceRestrictions);
            }
        }
    },

    //骨骼动画播放结束的回调
    aniEvent() {
        let count = this.level.length;
        for (let i = 0; i < count; i++) {
            let tiem = i * 0.13;
            this.node.runAction(cc.sequence(cc.delayTime(tiem), cc.callFunc(() => {
                this.sp_role[i].node.active = true;
                this.sp_role[i].setAnimation(0, "idle3", false);
                this.sp_role[i].setCompleteListener((trackEntry, loopCount) => {
                    let name = trackEntry.animation ? trackEntry.animation.name : "";
                    if (name == "idle3") {
                        this.sp_role[i].setAnimation(0, "idle2", true);
                    }
                })
            })))
        }
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

    onClick(name, node) {
        switch (name) {
            case "primary": this.enterGame(99); break;
            case "intermediate": this.enterGame(1); break;
            case "senior": this.enterGame(2); break;
            case "tuhao": this.enterGame(3); break;
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo": this.click_addgold(); break;
            case "headbg": this.click_userinfo(); break;
            case "btn_chongzhi": this.click_addgold(); break;
            default: console.error("no find button name -> %s", name);
        }
    },

    /**
     * 进入金币场房间
     * @param level 场次类型 1:普通场 2:贵宾场 3:富豪场
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
            if((glGame.user.suspicious == 1 &&glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
                glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服")
                return;
            }
            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                console.log("这是当前的房间限制", this.gameConfig)
                let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
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

    showUserInfo() {
        glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
    },

    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.goldCount.string = glGame.user.GoldTemp(coin); //glGame.user.cutFloat(coin);
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
        let panel = glGame.panel.showPanel(this.sssRule);
        panel.zIndex = 30;
    },

    click_record() {
        let panel = glGame.panel.showPanel(this.sssRecord);
        panel.zIndex = 30;
    },

    set(key, value) {
        this[key] = value;
    },

    get(key) {
        return this[key];
    },

    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW,this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE,this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData",this);
        this.unregisterEvent();
    }
});

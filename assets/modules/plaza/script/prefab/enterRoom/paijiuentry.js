glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        level: {
            type: cc.Node,
            default: []
        },
        pre_record: cc.Prefab,
        pre_help: cc.Prefab,
        BGM: {                              //背景声音
            type:cc.AudioClip,
            default:null,
        },
        dizhulaoutList:[cc.Node],
        zhunrulayoutList:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameid = 0;
        this.node.zIndex = 20;
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
        glGame.emitter.on("nodeRemove", this.click_back, this);
        glGame.emitter.on("updateUserData", this.updateuserInfo, this);
        this.updateuserInfo();
        this.registerEvent();
        this.reqEnterArea();
    },
    RootNodeShow() {
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
    },
    RootNodeHide() {
        this.node.active = false;
        this.resetView();
        this.unregisterEvent();
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
    goldOnlineNum() {

    },
    reqEnterArea() {
        this.gameID = glGame.scenetag.PAIJIU;
        glGame.readyroom.reqEnterArea(glGame.scenetag.PAIJIU);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo": this.click_addgold(); break;
            case "headbg": this.click_userinfo(); break;
            case "btn_chongzhi": this.click_addgold(); break;
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
            if ((glGame.user.suspicious == 1 && glGame.user.game == 2) || glGame.user.is_game == 2) {
                glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => { }, "我知道了", "联系客服")
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
    initUI() {
        this.resetView();
        this.node.active = true;
        let configure = this.gameConfig;
        let count = this.level.length;
        for (let i = 1; i < count; i++) {
            this.dizhulaoutList[i-1].getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
            this.zhunrulayoutList[i-1].getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
        }
      
        let animation = [];
        for (let i = 0; i < 4; i++) {
            animation.push(
                cc.delayTime(0.05 * i),
                cc.callFunc(() => {
                    this.level[i].active = true;
                    this.level[i].runAction(cc.sequence(
                        cc.callFunc(() => {
                            this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
                                let name = trackEntry.animation ? trackEntry.animation.name : "";
                                if (name == "idle1") {
                                    this.level[i].getChildByName("spine").getComponent(sp.Skeleton).timeScale = 1;
                                    this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle2", true);
                                }
                            })
                            this.level[i].getChildByName("spine").getComponent(sp.Skeleton).timeScale = 1.3;
                            this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle1", false)
                        }),
                        cc.delayTime(0.4),
                        cc.callFunc(() => {
                            // if(this.level[i].getChildByName("zhunrulayout"))this.level[i].getChildByName("zhunrulayout").active = true;
                            // if(this.level[i].getChildByName("dizhulaout"))this.level[i].getChildByName("dizhulaout").active = true;
                        })
                    ))
                })
            )
        }
        this.node.runAction(cc.sequence(animation))
    },
    resetView(){
        for (let i = 0; i < 4; i++) {
            this.level[i].active = false;
        }
    },
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
    showUserInfo() {
        glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
    },
    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.goldCount.string = glGame.user.cutFloat(coin);
        // this.goldCount.string = glGame.user.GoldTemp(coin);
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
        glGame.panel.showPanel(this.pre_help).zIndex = 30;
    },
    click_record() {
        glGame.panel.showPanel(this.pre_record).zIndex = 30;
    },

    set(key, value) {
        this[key] = value;
    },
    get(key) {
        return this[key];
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData", this);
        this.unregisterEvent();
    },
    // update (dt) {},
});

glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        ebg_record:cc.Prefab,
        ebg_gamerule:cc.Prefab,
        level: {
            type: cc.Node,
            default: []
        },
        dizhu:{
            type: cc.Node,
            default: []
        },
        zhunru:{
            type: cc.Node,
            default: []
        },
        BGM: {
            type: cc.AudioClip,
            default: null,
        },
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
    reqEnterArea() {
        this.gameID = glGame.scenetag.EBG;
        glGame.readyroom.reqEnterArea(glGame.scenetag.EBG);

    },
    RootNodeShow(){
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
    },
    RootNodeHide(){
        this.node.active = false;
        this.resetView();
        this.unregisterEvent();
    },
     //????????????
     registerEvent() {
        glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },
    //????????????
    unregisterEvent() {
        glGame.emitter.off("goldOnlineNum", this);
        glGame.emitter.off("onGameConfig", this);
    },
    onGameConfig(msg) {
        this.gameConfig = msg;
        this.initUI();
    },
    goldOnlineNum(msg) {
        console.log("???????????????????????????", msg)
        let count = this.level.length;
        for (let i = 0; i < count; i++) {
            if (msg[i + 1]) {
                this.level[i].getChildByName("people_num").getComponent(cc.Label).string = msg[i + 1]
            }
        }
    },
    initUI() {
        let configure = this.gameConfig;
        let count = this.level.length;
        for (let i = 1; i < 4; i++) {
            this.dizhu[i].getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
            this.zhunru[i].getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
        }
      
        let animation = [];
        for (let i = 0; i < 4; i++) {
            animation.push(
                cc.delayTime(0.05 * i),
                cc.callFunc(() => {
                    this.level[i].active = true;
                    this.level[i].runAction(cc.sequence(
                        cc.callFunc(() => {
                            this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle3", false)
                            this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
                                let name = trackEntry.animation ? trackEntry.animation.name : "";
                                if (name == "idle3") {
                                    this.level[i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle2", true);
                                }
                            })
                        }),
                        cc.delayTime(0.3),
                        cc.callFunc(() => {
                            if(this.level[i].getChildByName("zhunrulayout"))this.level[i].getChildByName("zhunrulayout").active = true;
                            if(this.level[i].getChildByName("dizhulaout"))this.level[i].getChildByName("dizhulaout").active = true;
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
            if(this.level[i].getChildByName("zhunrulayout"))this.level[i].getChildByName("zhunrulayout").active = false;
            if(this.level[i].getChildByName("dizhulaout"))this.level[i].getChildByName("dizhulaout").active = false;
        }
    },
     /**
     * ?????????????????????
     * @param level ???????????? 1:????????? 2:????????? 3:????????? 4:????????? 5:?????????
     */
    enterGame(level) {
        glGame.room.reqMyGameState(this.gameID, level).then(() => {
            let gameID = this.gameID;
            if (this.gameConfig[level] == null) {
                glGame.panel.showMsgBox('??????', '????????????????????????????????????????????????');
                return;
            }
            if (glGame.user.isTourist()) {
                if (level != 99) {
                    glGame.panel.showRegisteredGift(true)
                    return;
                }
            }
            if((glGame.user.suspicious == 1 &&glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
                glGame.panel.showDialog("", "???????????????????????????????????????????????????????????????????????????????????????", () => { glGame.panel.showService() }, () => {}, "????????????", "????????????")
                return;
            }
            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                console.log("???????????????????????????", this.gameConfig)
                let string = `<color=#99C7FF>????????????????????????????????????</c> <color=#ff0000> ${this.cutFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>????????????????????????????????????????????????</c>`
                glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "??????", "??????");
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
            // reqGoldRoomVerify?????????????????????????????????????????????????????????????????????
            // setGoldRoomInfo ??????????????????????????????????????????????????????????????????????????????????????????????????????
            // if (glGame.enterRoomVerification) {
            //     glGame.room.reqGoldRoomVerify(gameID, level);
            // } else {
            //     glGame.room.setGoldRoomInfo(gameID, level);
            // }
            glGame.room.setGoldRoomInfo(gameID, level);
        })
    },
    /**
     * ??????????????????????????????
     * @returns {boolean}
     */
    checkGold(coin, minCion) {
        console.log("????????????", coin, minCion);
        if (parseInt(coin) < parseInt(minCion)) {
            glGame.panel.showDialog(glGame.i18n.t("USER.GOLDLACK.TITLE"), glGame.i18n.t("USER.GOLDLACK.CONTENT"), () => {
                glGame.panel.showPanelByName("shop");
            }, null);
            return false;
        }
        return true;
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
        let ebg_gamerule = glGame.panel.showPanel(this.ebg_gamerule);
        ebg_gamerule.zIndex = 30;
    },
    click_record() {
        //glGame.panel.showNewGameRecord(this.gameid,30);
        let ebg_record = glGame.panel.showPanel(this.ebg_record);
        ebg_record.zIndex = 30;
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
    },
    // update (dt) {},
});

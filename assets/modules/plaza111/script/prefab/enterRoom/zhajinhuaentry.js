glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        zjhRule: cc.Prefab,
        zjhRecod: cc.Prefab,
        level: {
            type: cc.Node,
            default: []
        },
        infoNode: [cc.Node],
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
        this.registerEvent();
        this.reqEnterArea();
        this.updateuserInfo();

        for(let i = 0; i < this.level.length; i++) {
            let spineNode = this.level[i].getChildByName("spine");
            spineNode.active = false;
            let skeleton = spineNode.getComponent(sp.Skeleton);
            let delayTime = cc.delayTime(0.06 * i);
            let callFunc = cc.callFunc(()=> {
                skeleton.setAnimation(0, "animation", false); 
                spineNode.active = true;
            })
            skeleton.setCompleteListener(() => {
                skeleton.setAnimation(0, "animation2", true);
            });
            this.node.runAction(cc.sequence(delayTime, callFunc));
        }

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
    reqEnterArea() {
        this.gameID = glGame.scenetag.ZHAJINHUA;
        glGame.readyroom.reqEnterArea(glGame.scenetag.ZHAJINHUA);
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

        let count = this.level.length;
        for (let i = 1; i < count; i++) {
            this.infoNode[i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.getFloat(configure[i].BaseChips);
            this.infoNode[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.getFloat(configure[i].EntranceRestrictions);
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
            case "primary": this.enterGame(99); break;
            case "intermediate": this.enterGame(1); break;
            case "senior": this.enterGame(2); break;
            case "tuhao": this.enterGame(3); break;
            case "supremacy": this.enterGame(4); break;
            case "volvo": this.enterGame(5); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    showUserInfo() {
        glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
    },
    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.goldCount.string = this.getFloat(coin);
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
        let panel = glGame.panel.showPanel(this.zjhRule);
        panel.zIndex = 30;
    },
    click_record() {
        let panel = glGame.panel.showPanel(this.zjhRecod);
        panel.zIndex = 30;
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
            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                console.log("这是当前的房间限制", this.gameConfig)
                let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
                glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "取消", "充值");
                return
            }
            if((glGame.user.suspicious == 1 &&glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
                glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服")
                return;
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
    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW,this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE,this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData",this);
        this.unregisterEvent();
    }
});

glGame.baseclass.extend({

    properties: {
        sgRecord: cc.Prefab,
        sgRule: cc.Prefab,
        goldCount: cc.Label,
        level: {
            type: cc.Node,
            default: []
        },
        kmdContent: cc.Node,
        kmd: {
            type: cc.Node,
            default: []
        },
        BGM: {
            type: cc.AudioClip,
            default: null,
        },
    },

    onLoad() {
        this.gameid = 0;
        this.node.zIndex = 20;
        this.topRight = this.kmdContent.getChildByName("topright").position;
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
        glGame.emitter.on("nodeRemove", this.click_back, this);
        glGame.emitter.on("updateUserData", this.updateuserInfo, this);
        this.registerEvent();
        this.reqEnterArea();
        this.updateuserInfo();
        this.playEnterAnimation();
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
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },

    unregisterEvent() {
        glGame.emitter.off("onGameConfig", this);
    },

    onGameConfig(msg) {
        this.gameConfig = msg;
        this.initUI();
    },
    
    reqEnterArea() {
        this.gameID = glGame.scenetag.SANGONG;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SANGONG);
    },
   
    initUI() {
        this.node.active = true;
        let configure = this.gameConfig;
        let count = this.level.length;
        for (let i = 1; i < count; i++) {
            let layout = this.level[i].getChildByName("layout");
            let dizhu = layout.getChildByName("dizhu");
            let zhunru = layout.getChildByName("zhunrun");

            dizhu.getChildByName("dizhu_num").getComponent(cc.Label).string = this.getFloat(configure[i].BaseChips);
            zhunru.getChildByName("zhunru_num").getComponent(cc.Label).string = this.getFloat(configure[i].EntranceRestrictions);
        }
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
            case "btn_chongzhi": this.click_addgold(); break;
            default: console.error("no find button name -> %s", name);
        }
    },

    onScrollview() {
        this.node.getChildByName("gesture").active = false;
    },

    // 播放进入动画
    playEnterAnimation() {
        // 手势动画
        if(!cc.sys.localStorage.getItem("zjh_gesture")) {
            this.node.getChildByName("gesture").active = true;
            this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=> {
                this.node.getChildByName("gesture").active = false;
            })));

            cc.sys.localStorage.setItem("zjh_gesture", true);
        }

        let nCount = this.level.length;
        let rightPos = this.level[nCount - 2].position;

        for(let i = 0; i < nCount; i++) {
            let lvNode = this.level[i];
            let originPos = lvNode.position;
            lvNode.opacity = 0;
            lvNode.setPosition(cc.v2(originPos.x + 400, originPos.y));
            let delay = cc.delayTime(i * 0.05);
            let moveTo1 = cc.moveTo(0.3, cc.v2(originPos, originPos.y));
            let fadeIn = cc.fadeIn(0.1);
            moveTo1.easing(cc.easeBackOut());
            lvNode.runAction(cc.sequence(delay, cc.spawn(moveTo1, fadeIn)));
        }

        this.kmdCaches = [];    // 孔明灯缓存
        this.kmdUsed = [];      // 孔明灯列表
        this.kmdDelay = 2;      // 孔明灯生成间隔
        this.kmdDelta = 0;      // 孔明灯累计时间
        this.kmdYure();
    },

    update(dt) {
        this.kmdDelta += dt;
        if(this.kmdDelta > this.kmdDelay) {
            this.kmdDelta = 0;
            this.createKmd();

            // console.log("cached length: " + this.kmdCaches.length);
            // console.log("used length: " + this.kmdUsed.length);
        }

        // 移动位置
        let kmdNode;
        for(let i = 0, count = this.kmdUsed.length; i < count; i++) {
            kmdNode = this.kmdUsed[i];
            kmdNode.x += kmdNode.speed.x * dt;
            kmdNode.y += kmdNode.speed.y * dt;
        }

        for(let i = 0, count = this.kmdUsed.length; i < count; i++) {
            kmdNode = this.kmdUsed[i];
            if(kmdNode.x > this.topRight.x || kmdNode.y > this.topRight.y) {
                this.kmdUsed.splice(i, 1);
                this.kmdCaches.push(kmdNode);
                kmdNode.active = false;
                return;
            }
        }

    },

    // 孔明灯预热
    kmdYure() {
        for(let i = 0; i < 300; i++) {
            this.update(1);
        }
    },

    // 创建新的孔明灯
    createKmd() {
        let randValue = Math.random() * 0.9 + 0.1;

        if(Math.random() < 0.7) {
            randValue = Math.random() * 0.3 + 0.1;
        }

        let cloneNode;
        if(this.kmdCaches.length > 0) {
           cloneNode = this.kmdCaches.pop();
        }

        if(!cloneNode) {
            cloneNode = cc.instantiate(Math.random() < 0.5 ? this.kmd[0] : this.kmd[1]);
        }
        cloneNode.active = true;
    
        cloneNode.parent = this.kmdContent;
        if(randValue > 0.5) {
            cloneNode.speed = cc.v2(Math.random() * 2,  randValue * 20 + 10);
        } else {
            cloneNode.speed = cc.v2(0,  randValue * 20 + 10);
        }

        cloneNode.angle = (Math.random() - 0.5) * 10; 
        cloneNode.scale = randValue;
        cloneNode.opacity = randValue * 255;
        cloneNode.x = this.getRandomX();
        cloneNode.y = randValue < 0.5 ? 0 : -640;
        this.kmdUsed.push(cloneNode);
    },

    // 获取随机x坐标
    getRandomX() {
        let nCount = this.kmdUsed.length;
        let distance = nCount > 9 ? 50 : 150;
        if(nCount == 0) {
            return (Math.random() - 0.5) * 1800;
        }

        let randx = 0;

        for(let i = 0; i < 20; i++) {
            randx = (Math.random() - 0.5) * 1800;
            for(let j = 0; j < nCount; j++) {
                if(Math.abs(randx - this.kmdUsed[j].x) > distance) {
                    return randx;
                }
            }
        }

        return randx;
    },

    /**
     * 进入金币场房间
     * @param level 99：体验场 场次类型 1:普通车 2:贵宾场 3:富豪场 
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

            if((glGame.user.suspicious == 1 && glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
                glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服")
                return;
            }

            if (this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
                let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig[level].EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
                glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "取消", "充值");
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

    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.goldCount.string = glGame.user.GoldTemp(coin);
    },

    setGameId(gameid) {
        this.gameid = gameid;
    },

    updateBgInfo() {
    },

    click_addgold() {
        glGame.panel.showShop(30);
    },

    click_back() {
        glGame.readyroom.reqExitArea();
        this.remove();
    },

    click_help() {
        let panel = glGame.panel.showPanel(this.sgRule);
        panel.zIndex = 30;
    },

    click_record() {
        let panel = glGame.panel.showPanel(this.sgRecord);
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

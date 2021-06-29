//德州扑克 入口
glGame.baseclass.extend({
    properties: {
        goldCount: cc.Label,
        level: {
            type: cc.Node,
            default: []
        },
        rulePrefab : cc.Prefab,
        recordPrefab : cc.Prefab,
        buttonList : [cc.Node],
        scrollView: cc.ScrollView,
        BGM: {                              //背景声音
            type:cc.AudioClip,
            default:null,
        },
    },
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

        let old_width = this.scrollView.node.width;
        this.scrollView.getComponent(cc.Widget).updateAlignment();
        let new_width = this.scrollView.node.width;
        console.log("old_width=", old_width, ",new_width=", new_width)
        this.spacing_x =  new_width / old_width;
    },
    start(){
        this.startMove();
    },
    //动画
    startMove() {
        let content = this.scrollView.node.getChildByName("view").getChildByName("content");
        content.width = content.width * this.spacing_x;
        content.getComponent(cc.Widget).updateAlignment();
        content.opacity = 255;
        content.getComponent(cc.Widget).enabled = false;
        content.getComponent(cc.Layout).enabled = false;

        let posList = [];
        let index = 0;
        for (let i=0;i<this.buttonList.length;i++){
            let item = this.buttonList[i];
            item.getComponent(cc.Widget).updateAlignment();
            posList.push(cc.v2(item.position.x,item.position.y));
        }

        for (let i=0;i<posList.length;i++){
            let item = this.buttonList[i];
            item.x += posList[posList.length-1].x + (Math.random() * 30);
            item.stopAllActions();
            let t = 0.1*i;
            item.runAction(cc.sequence(cc.delayTime(t),cc.moveTo(0.2,cc.v2(posList[i].x - 40, posList[i].y)), cc.callFunc(()=>{
                item.stopAllActions();
                item.runAction(cc.sequence(cc.moveTo(0.1, posList[i]),cc.callFunc(()=>{
                    index++;
                    if(index == 4){
                        content.getComponent(cc.Widget).enabled = true;
                    }
                })));
            })));
        }
        let game_logo = this.node.getChildByName("Bg").getChildByName("game_logomask").getChildByName("game_logo");
        game_logo.x = this.node.getChildByName("point2").x;
        game_logo.y = this.node.getChildByName("point2").y;
        game_logo.opacity = 255;
        let go2 = cc.moveTo(0.2,this.node.getChildByName("point3").position);
        let back2 = cc.moveTo(0.1,this.node.getChildByName("point4").position);
        game_logo.runAction(cc.sequence(go2,back2));
    },
     //事件监听
     registerEvent() {
        // 监听scrollView的滚动事件
        this.scrollView.node.on("scroll-to-left", this.scrollLeftCb, this);
        this.scrollView.node.on("scroll-to-right", this.scrollRigthCb, this);

        glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
        glGame.emitter.on("onGameConfig", this.onGameConfig, this);
    },
    //事件销毁
    unregisterEvent() {
        glGame.emitter.off("goldOnlineNum", this);
        glGame.emitter.off("onGameConfig", this);
    },
    scrollLeftCb(scrollView){
        // cc.log("**********************************触摸到Left，反弹函数");
        this.node.getChildByName("jiantou_l").active = false;
        this.node.getChildByName("jiantou_r").active = false;
        this.node.getChildByName("jiantou_r").active = true;
    },
    scrollRigthCb(scrollView) {
        // 回调的参数是 ScrollView 组件
        // do whatever you want with scrollview
        // cc.log("**********************************触摸到Rigth，反弹函数");
        this.node.getChildByName("jiantou_l").active = false;
        this.node.getChildByName("jiantou_r").active = false;
        this.node.getChildByName("jiantou_l").active = true;
     },
    reqEnterArea() {
        this.gameID = glGame.scenetag.DZPK;
        glGame.readyroom.reqEnterArea(glGame.scenetag.DZPK);
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
            case "jiantou_l":
            case "jiantou_r":
                console.log("点击了按钮");
                this.executionScrollTo(name);
                break;
            default: console.error("no find button name -> %s", name);
        }
    },
    executionScrollTo(name) {
        this.node.getChildByName("jiantou_l").active = false;
        this.node.getChildByName("jiantou_r").active = false;

        if (name == "jiantou_l") {
            this.node.getChildByName("jiantou_r").active = true;
            this.scrollView.scrollToLeft(0.1);
        } else {
            this.node.getChildByName("jiantou_l").active = true;
            this.scrollView.scrollToRight(0.1);
        }
    },
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
    getFloat(value){
        return Number(value).div(100);
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
    goldOnlineNum(){

    },
    onGameConfig(msg) {
        this.gameConfig = msg;
        this.initUI();
    },
    initUI() {
        this.node.active = true;
        let configure = this.gameConfig;
        let count = this.level.length;
        for (let i = 1; i < 4; i++) {
            this.level[i].getChildByName("dizhulaout").getChildByName('dizhu_numbig').getComponent(cc.Label).string = `${this.cutFloat(configure[i].SmallBaseChips)}/${this.cutFloat(configure[i].BaseChips)}`
            this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);

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
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
    showUserInfo() {
        glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
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
        glGame.panel.showPanel(this.rulePrefab).zIndex = 30;
    },
    click_record() {
        glGame.panel.showPanel(this.recordPrefab).zIndex = 30;
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
});
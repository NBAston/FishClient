glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        prefab_record:cc.Prefab,
        prefab_gameRule:cc.Prefab,
        slwhselect: cc.Node,
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
        this.nodeInfo = {};
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
    //发包
    reqEnterArea() {
        this.gameID = glGame.scenetag.SLWH;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SLWH);
    },
    //事件监听
    registerEvent() {
        glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
        glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
        glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
    },
    //事件销毁
    unregisterEvent() {
        glGame.emitter.off("onGameInfolist_area", this);
        glGame.emitter.off("onRoomInfo_area", this);
        glGame.emitter.off("onDeleteRoom_area", this);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo": this.click_addgold(); break;
            case "headbg": this.click_userinfo(); break;
            case "btn_chongzhi": this.click_addgold(); break;
            case "btn_start": this.enterroom(name, node); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    enterroom(name, node) {
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true)
            return;
        }
        if((glGame.user.suspicious == 1 &&glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
            glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服");
            return;
        }
        glGame.panel.showFieldSelectionJuHua();
        glGame.room.reqMyGameState(this.gameID,node.parent.name).then(() => {
            glGame.readyroom.enterHundredsRoomOther(this.gameID,node.parent.name);
        })
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
        let prefab_gameRule = glGame.panel.showPanel(this.prefab_gameRule);
        prefab_gameRule.zIndex = 30;
    },
    click_record() {
        let prefab_record = glGame.panel.showPanel(this.prefab_record);
        prefab_record.zIndex = 30;
    },
    onGameInfolist(msg) {
        this.gameInfoTest = glGame.readyroom.get("gameInfo");
        for(let key in this.gameInfoTest){
            if(this.slwhselect.getChildByName(`${key}`)){
                let content = this.slwhselect.getChildByName(`${key}`).getChildByName("content");
                let lab_zhunru = content.getChildByName('lab_zhunru').getComponent(cc.Label);
                lab_zhunru.string = " " + this.cutFloat(this.gameInfoTest[key].Chips[0]);
            }
        }
    },
    onRoomInfo(msg) {

    },
    onDeleteRoom(msg) {

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
    },
    // update (dt) {},
});

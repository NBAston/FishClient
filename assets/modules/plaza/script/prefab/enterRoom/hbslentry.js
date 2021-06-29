glGame.baseclass.extend({

    properties: {
        BGM: {
            type: cc.AudioClip,
            default: null,
        },
        gold_count: cc.Label,
        entrance_item: cc.Node,
        scrollView: cc.ScrollView,
        content: cc.Node,
        hbslRecord: cc.Prefab,
        hbslRule: cc.Prefab,
        sp_bg: [sp.SkeletonData],
        font: [cc.Font],
        hbsl_tipAni: cc.Prefab,
        bg_mask: cc.Node,
        fire_node: cc.Node,
        fireworks: cc.Node,
        launchPoint: cc.Node,
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
        this.initUI();
        this.indexFire = 0;
        this.playFireworks();
    },
    initUI() {
        this.scrollView.getComponent(cc.Widget).updateAlignment();

        let s_width = this.scrollView.node.width;
        let item_width = this.entrance_item.width;
        this.spacing_x =  (s_width - item_width * 3) / 5;
        // let c_layout = this.content.getComponent(cc.Layout);
        // c_layout.spacingX = spacing_x * 1.5;
        // c_layout.paddingLeft = spacing_x * 1.25;
        // c_layout.paddingRight = spacing_x * 1.25;
    },
    //事件监听
    registerEvent() {
        // 监听scrollView的滚动事件
        this.scrollView.node.on("scroll-to-left", this.scrollLeftCb, this);
        this.scrollView.node.on("scroll-to-right", this.scrollRigthCb, this);

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
    RootNodeShow() {
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
    },
    RootNodeHide() {
        for (let index = 0; index < this.content.childrenCount; index++) {
            this.content.children[index].active = false;
        }
        this.node.active = false;
        this.unregisterEvent();
    },
    //发包
    reqEnterArea() {
        this.gameID = glGame.scenetag.HBSL;
        glGame.readyroom.reqEnterArea(glGame.scenetag.HBSL);
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
    onGameInfolist(msg) {
        this.content.removeAllChildren();
        let index = 0;
        let roomlist = glGame.readyroom.roomlist;
        let gameInfoTest = glGame.readyroom.get("gameInfo");
        let spacingX = this.spacing_x * 1.5;
        this.content.width = (this.entrance_item.width + spacingX) * 4  + this.spacing_x * 1.25 * 2 - spacingX;
        this.content.getComponent(cc.Widget).updateAlignment();
        Object.values(gameInfoTest).forEach(gameInfo=>{
            if (index < 4) {
                let item = cc.instantiate(this.entrance_item);
                item.parent = this.content;
                item.active = false;
                item.name = (index + 1) + "";
                item.x = this.spacing_x * 1.25 + this.entrance_item.width / 2 + (this.entrance_item.width + spacingX) * index;
                item.y = -this.content.height/2;

                // let bettype = index + 1;
                // let roomid = Object.keys(roomlist[bettype])[0];
                // item.name = roomid;
                // this.nodeInfo[roomid] = {
                //     tag: roomlist[bettype][roomid].roomserverid,
                //     type: bettype
                // }

                // 设置位置和刷新数据
                item.getChildByName("spine").getComponent(sp.Skeleton).skeletonData = this.sp_bg[index];
                // item.getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0,"animation", true);
                item.getChildByName("difen_txt").getComponent(cc.Label).font = this.font[index];
                let zhunru_txt = item.getChildByName("zhunru_txt").getComponent(cc.Label);
                zhunru_txt.font = this.font[index];
                let small_num = this.cutFloat(gameInfo.RedPacketMoney[0]);
                let big_num = this.cutFloat(gameInfo.RedPacketMoney[gameInfo.RedPacketMoney.length-1]);
                zhunru_txt.string = `${small_num}-${big_num}`;

                index++;
            }
        });

        this.initAni();
    },
    initAni() {
        this.renwu_pos = [];
        for (let index = 0; index < this.content.childrenCount; index++) {
            let pos = this.content.children[index].getPosition()
            this.renwu_pos.push(pos);
            this.content.children[index].x = this.node.width / 2 + pos.x;
            this.content.children[index].active = true
            this.content.children[index].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0,"animation", true);
        }

        for (let i = 0; i < this.content.childrenCount; i++) {
            this.content.children[i].runAction(cc.sequence(
                cc.delayTime(i * 0.05),
                cc.moveTo(0.25, cc.v2(this.renwu_pos[i].x - 40, this.renwu_pos[i].y)),
                cc.moveTo(0.1, this.renwu_pos[i])
            ))
        }
    },
    playFireworks() {
        let time = Math.random() * 2;
        let indextemp = [1, 0, 3, 2]
        let index = indextemp[this.indexFire % 4];
        this.node.runAction(cc.sequence(
            cc.delayTime(time),
            cc.callFunc(()=>{
                this.indexFire++;
                // console.log("烟花发射111111", index)
                this.emissionFire(index)
                this.playFireworks();
            })
        ))
    },
    emissionFire(index) {
        let distance = [this.node.height / 2, this.node.height / 2.5, this.node.height / 2.1, this.node.height / 1.8];
        let aniList = ["bluefireworks","redfireworks","yellowfireworks","bluefireworks"];
        let scaleList = [2.5 ,1.7, 1.5, 2];

        let fire_node = cc.instantiate(this.fire_node);
        fire_node.parent = this.bg_mask;
        fire_node.position = this.launchPoint.children[index].position;
        fire_node.active = true;
        let fireworks = cc.instantiate(this.fireworks);
        fireworks.parent = this.bg_mask;
        fireworks.setScale(scaleList[index]);
        fire_node.runAction(cc.sequence(
            cc.moveBy(1, 0, distance[index]),
            cc.callFunc(() => {
                fire_node.opacity = 0;
                fireworks.position = fire_node.position;
                fireworks.active = true;
                fireworks.getComponent(cc.Animation).play(`${aniList[index]}`);
            }),
            cc.delayTime(1.2),
            cc.callFunc(() => {
                fire_node.destroy();
                fireworks.destroy();
            })
        ))
    },
    onRoomInfo(msg) {

    },
    onDeleteRoom(msg) {

    },
    onClick(name, node) {
        switch (name) {
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo":
            case "btn_addgold": 
                this.click_addgold(); break;
            case "btn_start": this.showTip(name, node); break;
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
    showTip(name, node){
        let tipAni = glGame.panel.showPanel(this.hbsl_tipAni);
        tipAni.zIndex = 30;
        this.node.runAction(cc.sequence(
            cc.delayTime(1.5),
            cc.callFunc(() => {
                glGame.emitter.emit("hbsl.hbsl_close_tip_ani");
                this.enterroom(name, node);
            })
        ));
    },
    // 进入游戏的入口
    enterroom(name, node) {
        // 判断是否是游客
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true)
            return;
        }
        // （判断用户账号是否异常 && 是否可以玩游戏） || 针对玩家游戏
        if((glGame.user.suspicious == 1 && glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
            glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服")
            return;
        }

        glGame.panel.showFieldSelectionJuHua();
        glGame.room.reqMyGameState(this.gameID, node.parent.name).then(() => {
            glGame.readyroom.enterHundredsRoomOther(this.gameID, node.parent.name);
        })
    },
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
    // 刷新金币
    updateuserInfo() {
        let coin = glGame.user.get("coin")
        this.gold_count.string = glGame.user.GoldTemp(coin);
    },
    setGameId(gameid) {
        this.gameid = gameid;
    },
    updateBgInfo() {

    },
    // 充值
    click_addgold() {
        glGame.panel.showShop(30);
    },
    // 关闭当前页面
    click_back() {
        glGame.readyroom.reqExitArea();
        this.remove();
    },
    // 帮助
    click_help() {
        // glGame.panel.showNewGameRule(this.gameid, 30);
        let panel = glGame.panel.showPanel(this.hbslRule);
        panel.zIndex = 30;

        // this.showTip();
    },
    // 游戏记录
    click_record() {
        // glGame.panel.showNewGameRecord(this.gameid, 30);
        let panel = glGame.panel.showPanel(this.hbslRecord);
        panel.zIndex = 30;
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

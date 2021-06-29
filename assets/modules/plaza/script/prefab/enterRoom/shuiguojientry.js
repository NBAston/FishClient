const toggle_map = {
    toggle_base: 1,
    toggle_elementary: 2,
    toggle_medium: 3,
    toggle_higher: 4,
    toggle_plute: 5
}

const state_Arr = ["下注中", "结算中"];

glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        content: cc.Node,
        node_record: cc.Node,
        node_result: cc.Node,
        battleWatchpic: cc.SpriteFrame,
        sgjRule: cc.Prefab,
        pre_record: cc.Prefab,
        BGM: {                              //背景声音
            type:cc.AudioClip,
            default:null,
        },
        special_List:[cc.SpriteFrame],
        common_List:[cc.SpriteFrame],
        beishu_List:[cc.SpriteFrame],

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
        this.roomType = 1;
        this.coundowmTime = 0;
        this.waittime = {};
        this.nodeInfo = {};
        this.process = {};
    },

    RootNodeShow(){
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
        this.waittime = {};
        this.nodeInfo = {};
        this.process = {};
    },

    RootNodeHide(){
        this.node.active = false;
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        this.cleanTimer();
        this.unregisterEvent();
    },

    //事件监听
    registerEvent() {
        glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
        glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
        glGame.emitter.on("onHandInfo_area", this.onHandInfo, this);
        glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
    },
    //事件销毁
    unregisterEvent() {
        glGame.emitter.off("onGameInfolist_area", this);
        glGame.emitter.off("onRoomInfo_area", this);
        glGame.emitter.off("onHandInfo_area", this);
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
            case 'btn_enter':
            case 'btn_start':
                if (glGame.user.isTourist()) {
                    glGame.panel.showRegisteredGift(true)
                    return;
                }
                if((glGame.user.suspicious == 1 &&glGame.user.game == 2 ) || glGame.user.is_game == 2 ){
                    glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => { glGame.panel.showService() }, () => {}, "我知道了", "联系客服")
                    return;
                }
                glGame.panel.showFieldSelectionJuHua();
                glGame.room.reqMyGameState(this.gameID, this.nodeInfo[node.parent.name].type, node.parent.name).then(() => {
                    glGame.readyroom.enterHundredsRoom(node.parent.name, this.nodeInfo[node.parent.name].tag);
                })
                break;
            default: 
                let roomType = toggle_map[name];
                if(!roomType) return;
                if(this.roomType != roomType) {
                    this.roomType = roomType;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.updateUI();
                }
                break;
        }
    },

    //发包
    reqEnterArea() {
        this.gameID = glGame.scenetag.SHUIGUOJI;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SHUIGUOJI);
    },

    //事件回调
    //进入游戏信息回调
    onDeleteRoom(msg) {
        for (let i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i].name == msg.roomid) {
                this.content.children[i].destroy();
            }
        }

    },
    onGameInfolist(msg) {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        this.gameInfoTest = glGame.readyroom.get("gameInfo");
        console.log('this.gameInfoTest', this.gameInfoTest)
        if (!this.gameInfoTest) return;
        this.serverTimeOff = Date.now() - msg.servertime;
        this.updateUI();
    },

    onHandInfo(msg) {
        this.roomRecord = glGame.readyroom.roomrecord;
        console.log("奖励", this.roomRecord);
        for (let i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i].name == msg.roomid) {
                this.showRecord(this.content.children[i], this.roomRecord[msg.roomid], msg.roomid);
            }
        }
    },

    onRoomInfo(msg) {
        this.roomList = glGame.readyroom.roomlist;
        this.serverTimeOff = Date.now() - msg.servertime;
        if (this.roomType != msg.roomdata.bettype && this.roomType !== 0) return
        let count = 0;
        for (let i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i].name == msg.roomdata.roomid) {
                count++;
            }
        }
        if (count == 0) {
            let infoNode = cc.instantiate(this.node_record);
            infoNode.parent = this.content;
            infoNode.active = false;
            infoNode.getChildByName("img_new").active = false;
            infoNode.name = `${msg.roomdata.roomid}`;
            this.nodeInfo[infoNode.name] = {
                tag: this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].roomserverid,
                type: msg.roomdata.bettype
            }
            let waitTime = Math.round((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
            this.waittime[msg.roomdata.roomid] = {};
            this.waittime[msg.roomdata.roomid].cutdown = waitTime;
            this.waittime[msg.roomdata.roomid].totaltime = waitTime;
            this.process[msg.roomdata.roomid] = msg.roomdata.process;
            infoNode.getChildByName('online').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
            infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
            this.roomRecord = glGame.readyroom.roomrecord;
            this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid], msg.roomdata.roomid);
        }
        for (let i=0;i<this.content.childrenCount;i++){
            this.content.children[i].getChildByName("img_new").active = false;
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true,0.1,()=>{
            this.scheduleOnce(()=>{
                for (let i=0;i<this.content.childrenCount;i++){
                    this.content.children[i].getChildByName("img_new").active = true;
                }
            },0.8);
        });

        for (let i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i].name == msg.roomdata.roomid) {
                let waitTime = Math.round((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
                this.waittime[this.content.children[i].name].cutdown = waitTime;
                this.waittime[this.content.children[i].name].totaltime = waitTime;
                this.process[this.content.children[i].name] = msg.roomdata.process;
                this.content.children[i].getChildByName('online').getComponent(cc.Label).string = msg.roomdata.online;
            }
        }

        this.cleanTimer();
        this.showClock();

    },
    //更新UI
    updateUI() {
        this.roomList = []

        for (let key in glGame.readyroom.roomlist[this.roomType]) {
            this.roomList.push(glGame.readyroom.roomlist[this.roomType][key])
        }

        this.roomList.sort((a, b) => {
            return a.bettype - b.bettype;
        });
        this.roomRecord = glGame.readyroom.roomrecord;
        if (!this.roomList) {
            return;
        }
        this.cleanTimer();
        for (let roomid in this.roomList) {
            if(roomid == "hasValue" || roomid == "resize"){
                continue;
            }
            if (!this.roomList[roomid]) continue;
            for (let i = 0; i < this.content.childrenCount; i++) {
                if (this.content.children[i].name == this.roomList[roomid].roomid) {
                    return;
                }
            }
            let infoNode = cc.instantiate(this.node_record);
            infoNode.parent = this.content;
            infoNode.active = false;
            infoNode.getChildByName("img_new").active = false;
            infoNode.name = `${this.roomList[roomid].roomid}`;
            console.log('infoNode.name', infoNode.name, this.roomList[roomid], this.roomList)
            this.nodeInfo[infoNode.name] = {
                tag: this.roomList[roomid].roomserverid,
                type: this.roomList[roomid].bettype
            }
            let str = this.roomList[roomid].roomid.toString();
            infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;

            infoNode.getChildByName('online').getComponent(cc.Label).string = this.roomList[roomid].online;
            let minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
                maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
            console.log("入口数据调整", this.gameInfoTest[this.roomList[roomid].bettype].Chips[0], minbet / 100, this.gameInfoTest[this.roomList[roomid].bettype].MaxBet / 100, maxbet)
            infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "-" + maxbet;
            if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
                infoNode.getChildByName("btn_enter").getChildByName("flash").active = true
                infoNode.getChildByName('btn_enter_effect').active = true;
                infoNode.getChildByName('btn_enter').opacity = 0;
            } else {//观战
                infoNode.getChildByName('btn_enter_effect').active = false;
                infoNode.getChildByName('btn_enter').opacity = 255;
                infoNode.getChildByName("btn_enter").getChildByName("img_jinruyouxi").getComponent(cc.Sprite).spriteFrame = this.battleWatchpic;
            }
            let waitTime = Math.round((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
            if (waitTime < 0) {
                waitTime = 0;
            }
            this.waittime[this.roomList[roomid].roomid] = {};
            this.waittime[this.roomList[roomid].roomid].cutdown = waitTime;
            this.waittime[this.roomList[roomid].roomid].totaltime = waitTime;
            this.process[this.roomList[roomid].roomid] = this.roomList[roomid].process;
            
            this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true,0.1,()=>{
            this.scheduleOnce(()=>{
                for (let i=0;i<this.content.childrenCount;i++){
                    this.content.children[i].getChildByName("img_new").active = true;
                }
            },0.8);
        });
        this.showClock();


    },
    //桌面数据的显示
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    //显示倒计时
    showClock() {
        let call = () => {
            if (this.content.children) {
                for (let i = 0; i < this.content.children.length; i++) {
                    let roomid = this.content.children[i].name;
                    this.waittime[roomid].cutdown -= 1;
                    if (this.waittime[roomid].cutdown < 0) {
                        this.waittime[roomid].cutdown = 0;
                    }

                    let process = this.process[roomid];
                    let remainTime = Math.floor(this.waittime[roomid].cutdown);

                    let szState = state_Arr[process-1];
                    let lbClock = this.content.children[i].getChildByName('clock').getComponent(cc.Label);
                    if(process == 1) {
                        lbClock.string = `${szState}:  ${remainTime}s`;
                        if(remainTime <= 3) {
                            lbClock.node.color = new cc.Color(255, 96, 47);
                        }
                        else {
                            lbClock.node.color = new cc.Color(141, 209, 37);
                        }
                    }
                    else {
                        lbClock.string = szState;
                        lbClock.node.color = new cc.Color(226, 137, 255);
                    }
                }
            }
        }
        call();
        this.setTimeOut = setInterval(call, 1000)
    },

    showRecord(node, record, roomid) {
        if (!record) {
            return
        }
        let index = 0;
        let dotNode;
        node.getChildByName('node_dot').destroyAllChildren();
        node.getChildByName('node_dot').removeAllChildren();
        if (record.length > 16) {
            index = record.length - 16;
        }
        for (let i = index; i < record.length; i++) {
            dotNode = cc.instantiate(this.node_result);
            dotNode.active = false;
            if (record[i].rewardType != 11) {
                let result_node = dotNode.getChildByName("node_results");
                result_node.active = true;
                result_node.getComponent(cc.Sprite).spriteFrame = this.special_List[ record[i].rewardType];
                dotNode.getChildByName("multiple").getChildByName("cheng").active = false;
            } else {
                let result_node = dotNode.getChildByName("node_result");
                result_node.active = true;
                if(this.common_List[record[i].rewardArr[0].fruitType]){
                    result_node.getComponent(cc.Sprite).spriteFrame = this.common_List[record[i].rewardArr[0].fruitType];
                }else{
                    cc.error(">>> 缺少 "+record[i].rewardArr[0].fruitType)
                }
                this.setmultiple(dotNode, record[i].rewardArr[0].priceMultiple)
            }
            dotNode.parent = node.getChildByName('node_dot');
            if (i == record.length - 1) {
                dotNode.getChildByName("new").active = true;
            }
        }
        glGame.panel.showEffectNode(this,node.getChildByName('node_dot'),0.02,true);

    },
    //根据倍数用plist图集拼接数字
    setmultiple(node, multiple) {
        let stringCount = multiple.toString();
        let count = stringCount.length;
        for (let i = 0; i < count; i++) {
            let newNode = new cc.Node();
            newNode.addComponent(cc.Sprite).spriteFrame = this.beishu_List[stringCount[i]];
            newNode.parent = node.getChildByName("multiple");
        }
    },

    //清理倒计时
    cleanTimer() {
        if (this.setTimeOut != null) {
            clearTimeout(this.setTimeOut);
        }
        this.setTimeOut = null;
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
        let panel = glGame.panel.showPanel(this.sgjRule);
        panel.zIndex = 30;
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

    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW,this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE,this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData",this);
        this.cleanTimer();
        this.unregisterEvent();
    },
});

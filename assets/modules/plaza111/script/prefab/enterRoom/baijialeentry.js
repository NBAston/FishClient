glGame.baseclass.extend({

    properties: {
        goldCount: cc.Label,
        content: cc.Node,
        node_record: cc.Node,
        node_result: cc.Node,
        sprite_Atlas: cc.SpriteAtlas,
        rulePrefab: cc.Prefab,
        recordPrefab:cc.Prefab,
        BGM:{
            type:cc.AudioClip,
            default:null
         },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameid = 0;
        this.node.zIndex = 20;
        glGame.audio.playBGM(this.BGM);
        glGame.emitter.on("nodeRemove", this.click_back, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
        glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
        glGame.emitter.on("updateUserData", this.updateuserInfo, this);
        this.updateuserInfo();
        this.registerEvent();
        this.reqEnterArea();
        this.roomType = 1;
        this.nodeInfo = {};
        this.gameState = { 0: cc.color(255, 96, 47), 1: cc.color(137, 218, 255), 2: cc.color(141, 222, 37), 3: cc.color(226, 137, 255),4: cc.color(226, 137, 255) };
        this.stateWord = { 1: "休息中", 2: "下注中", 3: "结算中", 4: "洗牌中" };
        this.isUpdateTrend = {};
    },
    //发包
    reqEnterArea() {
        this.gameID = glGame.scenetag.BAIJIALE;
        glGame.readyroom.reqEnterArea(glGame.scenetag.BAIJIALE);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_back": this.click_back(); break;
            case "btn_help": this.click_help(); break;
            case "btn_record": this.click_record(); break;
            case "mycoinInfo": this.click_addgold(); break;
            case "headbg": this.click_userinfo(); break;
            case "btn_chongzhi": this.click_addgold(); break;
            case 'toggle_all':
                if (this.roomType != 0) {
                    this.roomType = 0;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.isUpdateTrend = {};
                    this.updateUI();
                }
                break;
            case 'toggle_base':
                if (this.roomType != 1) {
                    this.roomType = 1;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.isUpdateTrend = {};
                    this.updateUI();
                }
                break;
            case 'toggle_elementary':
                if (this.roomType != 2) {
                    this.roomType = 2;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.isUpdateTrend = {};
                    this.updateUI();
                }
                break;
            case 'toggle_medium':
                if (this.roomType != 3) {
                    this.roomType = 3;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.isUpdateTrend = {};
                    this.updateUI();
                }
                break;
            case 'toggle_higher':
                if (this.roomType != 4) {
                    this.roomType = 4;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.updateUI();
                }
                break;
            case 'toggle_plute':
                if (this.roomType != 5) {
                    this.roomType = 5;
                    this.content.destroyAllChildren();
                    this.content.removeAllChildren();
                    this.updateUI();
                }
                break;
            case 'btn_enter':
            case 'btn_start':
                if (glGame.user.isTourist()) {
                    glGame.panel.showRegisteredGift(true)
                    return;
                }
                if ((glGame.user.suspicious == 1 && glGame.user.game == 2) || glGame.user.is_game == 2) {
                    glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", () => {
                        glGame.panel.showService()
                    }, () => {
                    }, "我知道了", "联系客服")
                    return;
                }
                glGame.panel.showFieldSelectionJuHua();
                glGame.room.reqMyGameState(this.gameID, this.nodeInfo[node.parent.name].type, node.parent.name).then(() => {
                    glGame.readyroom.enterHundredsRoom(node.parent.name, this.nodeInfo[node.parent.name].tag);
                })
                break;
            default: console.error("no find button name -> %s", name);
        }
    },
    RootNodeShow() {
        this.node.active = true;
        this.registerEvent();
        this.reqEnterArea();
        this.nodeInfo = {};
    },
    RootNodeHide() {
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
        let rulePrefab = glGame.panel.showPanel(this.rulePrefab);
        rulePrefab.zIndex = 30;
    },
    click_record() {
        let recordPrefab = glGame.panel.showPanel(this.recordPrefab);
        recordPrefab.zIndex = 30
    },

    set(key, value) {
        this[key] = value;
    },
    get(key) {
        return this[key];
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
        if (!this.gameInfoTest) return;
        this.serverTimeOff = Date.now() - msg.servertime;
        this.updateUI();
    },
    onHandInfo(msg) {
        this.roomRecord = glGame.readyroom.roomrecord;
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
            infoNode.active = true;
            infoNode.name = `${msg.roomdata.roomid}`;
            this.nodeInfo[infoNode.name] = {
                tag: this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].roomserverid,
                type: msg.roomdata.bettype
            }
            let waitTime = Math.floor((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
            infoNode.waitTime = waitTime;
            infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
            infoNode.getChildByName('roomId').getChildByName('lab_roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
            let minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[msg.roomdata.bettype].Chips[0]),
                maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[msg.roomdata.bettype].MaxBet);
            infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "~" + maxbet;
            if (this.gameInfoTest[msg.roomdata.bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
                infoNode.getChildByName("btn_enter").getChildByName("enter").active = true;
                infoNode.getChildByName("btn_enter").getChildByName("watch").active = false;
            } else {
                infoNode.getChildByName("btn_enter").getChildByName("enter").active = false;
                infoNode.getChildByName("btn_enter").getChildByName("watch").active = true;
            }
            this.roomRecord = glGame.readyroom.roomrecord;
            this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid], msg.roomdata.roomid);

        }
        for (let i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i].name == msg.roomdata.roomid) {
                let waitTime = Math.floor((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
                this.content.children[i].waitTime = waitTime;
                this.content.children[i].getChildByName("time").getComponent(cc.Label).string = waitTime + "s";
                this.content.children[i].getChildByName("gamestate").color = this.gameState[msg.roomdata.process];
                this.content.children[i].getChildByName("time").color = this.gameState[msg.roomdata.process];
                this.content.children[i].process = msg.roomdata.process;
                this.content.children[i].getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[msg.roomdata.process];
                this.content.children[i].getChildByName('onlineNum').getComponent(cc.Label).string = msg.roomdata.online;
            }
        }
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
            if (!this.roomList[roomid]) continue;
            for (let i = 0; i < this.content.childrenCount; i++) {
                if (this.content.children[i].name == this.roomList[roomid].roomid) {
                    return;
                }
            }
            let infoNode = cc.instantiate(this.node_record);
            infoNode.parent = this.content;
            infoNode.active = true;
            infoNode.name = `${this.roomList[roomid].roomid}`;
            this.nodeInfo[infoNode.name] = {
                tag: this.roomList[roomid].roomserverid,
                type: this.roomList[roomid].bettype
            }
            let str = this.roomList[roomid].roomid.toString();
            infoNode.getChildByName('roomId').getChildByName('lab_roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
            infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
            let minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
                maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
            infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "~" + maxbet;
            if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
                infoNode.getChildByName("btn_enter").getChildByName("enter").active = true;
                infoNode.getChildByName("btn_enter").getChildByName("watch").active = false;
            } else {
                infoNode.getChildByName("btn_enter").getChildByName("enter").active = false;
                infoNode.getChildByName("btn_enter").getChildByName("watch").active = true;
            }
            infoNode.getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[this.roomList[roomid].process]
            infoNode.process = this.roomList[roomid].process;
            let waitTime = Math.floor((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
            infoNode.waitTime = waitTime;
            infoNode.getChildByName("time").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
            infoNode.getChildByName("gamestate").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
            infoNode.getChildByName('time').getComponent(cc.Label).string = waitTime + "s"
            this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
        }
        this.showClock();
    },
    //桌面数据的显示
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    //显示倒计时
    showClock() {
        this.setTimeOut = setInterval(() => {
            if (this.content.children) {
                for (let i = 0; i < this.content.children.length; i++) {
                    this.content.children[i].waitTime -= 1;
                    if (this.content.children[i].waitTime <= 0) {
                        this.content.children[i].waitTime = 0;
                    }
                    if (this.content.children[i].waitTime <= 3 && this.content.children[i].process == 2) {
                        this.content.children[i].getChildByName("gamestate").color = this.gameState[0];
                        this.content.children[i].getChildByName("time").color = this.gameState[0];
                    }
                    this.content.children[i].getChildByName("time").getComponent(cc.Label).string = this.content.children[i].waitTime + "s";
                }
            }
        }, 1000)
    },

    showRecord(node, record, roomid) {
        if (!record) {
            return
        }
        let index = 0;
        let dotNode;
        let row = 0,
            col = 0;
        node.getChildByName('node_dot').destroyAllChildren();
        node.getChildByName('node_dot').removeAllChildren();
        this.showSmallTrend(node, record, roomid);
        index = 0;
        row = 0;
        col = 0;
        let recordArr = [];
        index = this.getIndex(record);
        for (let i = index; i < record.length; i++) {
            let isChangeRow = false;
            for (let j = 0; j < record[i].count; j++) {
                let labelColor = null;
                dotNode = cc.instantiate(this.node_result);
                if (record[i].result == 1) {
                    labelColor = cc.Color(179, 6, 7);
                    dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hongquan'];
                } else if (record[i].result == 2) {
                    labelColor = cc.color(30, 2, 3);
                    dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_heiquan'];
                }
                if (record[i].he) {
                    for (let k = 0; k < record[i].he.length; k++) {
                        if (record[i].he[k].index - 1 == j) {
                            dotNode.children[0].active = true;
                            dotNode.children[0].getComponent(cc.Label).string = record[i].he[k].num;
                            dotNode.children[0].color = labelColor;
                        }
                    }
                }
                dotNode.parent = node.getChildByName('node_dot');
                let newCol = col;
                let newRow = row;
                while (newRow > 5) {
                    newRow--;
                    newCol++;
                }
                for (let k = 0; k < recordArr.length; k++) {
                    if (newRow == recordArr[k][0] && newCol == recordArr[k][1]) {
                        isChangeRow = true;
                    }
                }
                if (isChangeRow) {
                    newRow--;
                }
                dotNode.setPosition(cc.v2(-343 + newCol * 43, 84 - newRow * 36));
                recordArr.push([newRow, newCol]);
                if(this.isUpdateTrend[roomid]){
                    dotNode.active = true;
                }
                
                row++;
            }
            col++;
            row = 0;
        }
        if(!this.isUpdateTrend[roomid]){
            glGame.panel.showEffectNode(this,node.getChildByName('node_dot'),0.02,true);
            this.isUpdateTrend[roomid] = true;
        }
    },
    //显示当前的小路
    showSmallTrend(node, record, roomid) {
        let roundRecord = [], dotNode;
        node.getChildByName("trend").destroyAllChildren();
        node.getChildByName("trend").removeAllChildren();

        for (let i = 0; i < record.length; i++) {
            for (let j = 0; j < record[i].count; j++) {
                roundRecord.push(record[i].result)
                if (record[i].he) {
                    for (let k = 0; k < record[i].he.length; k++) {
                        if (record[i].he[k].index - 1 == j) {
                            for (let z = 0; z < record[i].he[k].num; z++) {
                                roundRecord.push(3);
                            }
                        }
                    }
                }
            }

        }
        let doublerecord = glGame.readyroom.doublerecord[roomid]
        let index = roundRecord.length > 15 ? roundRecord.length - 15 : 0;
        for (let i = index; i < roundRecord.length; i++) {
            dotNode = cc.instantiate(this.node_result);
            dotNode.parent = node.getChildByName("trend");
            if (roundRecord[i] == 1) {
                dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_zhuang'];
            } else if (roundRecord[i] == 2) {
                dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_xian'];
            } else if (roundRecord[i] == 3) {
                dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_he'];
            }
            if (doublerecord[i] == 1) {
                dotNode.children[1].active = true;
            } else if (doublerecord[i] == 2) {
                dotNode.children[2].active = true;
            } else if (doublerecord[i] == 3) {
                dotNode.children[1].active = true;
                dotNode.children[2].active = true;
            }
            dotNode.active = true;
        }
    },
    getIndex(record) {
        let index = 0;
        if (record.length > 17) {
            index = record.length - 17;
        }
        for (let j = index; j < record.length; j++) {
            if (j - index + record[j].count >= 29) {
                index += j - index + record[j].count - 29;
            }
        }
        return index;
    },
    //清理倒计时
    cleanTimer() {
        if (this.setTimeOut != null) {
            clearTimeout(this.setTimeOut);
        }
        this.setTimeOut = null;
    },
    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
        glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
        glGame.emitter.off("nodeRemove", this);
        glGame.emitter.off("updateUserData", this);
        this.cleanTimer();
        this.unregisterEvent();
    },
    // update (dt) {},
});

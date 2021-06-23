"use strict";
cc._RF.push(module, 'd679f08xalEf7J/m5+Me2xm', 'brnnentry');
// modules/plaza/script/prefab/enterRoom/brnnentry.js

"use strict";

var PROCESS = [{
  tip: "准备中",
  color: cc.color(137, 218, 255)
}, {
  tip: "下注中",
  color: cc.color(141, 222, 37)
}, {
  tip: "结算中",
  color: cc.color(226, 137, 255)
}];
glGame.baseclass.extend({
  properties: {
    BGM: {
      type: cc.AudioClip,
      "default": null
    },
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    sprite_Atlas: cc.SpriteAtlas,
    recordPrefab: cc.Prefab,
    rulePrefab: cc.Prefab,
    battleWatchpic: cc.SpriteFrame
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
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
    this.waittime = {};
    this.nodeInfo = {};
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.BRNN;
    glGame.readyroom.reqEnterArea(glGame.scenetag.BRNN);
  },
  onClick: function onClick(name, node) {
    var _this = this;

    switch (name) {
      case "btn_back":
        this.click_back();
        break;

      case "btn_help":
        this.click_help();
        break;

      case "btn_record":
        this.click_record();
        break;

      case "mycoinInfo":
        this.click_addgold();
        break;

      case "headbg":
        this.click_userinfo();
        break;

      case "img_recharge":
      case "btn_chongzhi":
        this.click_addgold();
        break;

      case 'toggle_base':
        if (this.roomType != 1) {
          this.roomType = 1; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;

      case 'toggle_elementary':
        if (this.roomType != 2) {
          this.roomType = 2; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;

      case 'toggle_medium':
        if (this.roomType != 3) {
          this.roomType = 3; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;

      case 'toggle_higher':
        if (this.roomType != 4) {
          this.roomType = 4; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;

      case 'toggle_plute':
        if (this.roomType != 5) {
          this.roomType = 5; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;

      case 'btn_enter':
      case 'btn_start':
        console.log("BRNN_TEST ===> 点击开始游戏"); // if (this.isHaveEnterif) return;
        // this.isHaveEnterif = true;
        // this.scheduleOnce(()=>{
        //     this.isHaveEnterif = false;
        // }, 1.0);

        if (glGame.user.isTourist()) {
          glGame.panel.showRegisteredGift(true);
          return;
        }

        if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
          glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
            glGame.panel.showService();
          }, function () {}, "我知道了", "联系客服");
          return;
        }

        glGame.panel.showFieldSelectionJuHua();
        glGame.room.reqMyGameState(this.gameID, this.nodeInfo[node.parent.name].type, node.parent.name).then(function () {
          console.log("BRNN_TEST ===> 点击开始游戏 11111");
          glGame.readyroom.enterHundredsRoom(node.parent.name, _this.nodeInfo[node.parent.name].tag);
        });
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
    glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
    glGame.emitter.on("onHandInfo_area", this.onHandInfo, this);
    glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("onGameInfolist_area", this);
    glGame.emitter.off("onRoomInfo_area", this);
    glGame.emitter.off("onHandInfo_area", this);
    glGame.emitter.off("onDeleteRoom_area", this);
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
    this.waittime = {};
    this.nodeInfo = {};
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.cleanTimer();
    this.unregisterEvent();
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin);
  },
  setGameId: function setGameId(gameid) {
    this.gameid = gameid;
  },
  updateBgInfo: function updateBgInfo() {},
  click_userinfo: function click_userinfo() {
    glGame.panel.showPanelByName("userinfo");
  },
  click_addgold: function click_addgold() {
    glGame.panel.showShop(30);
  },
  click_back: function click_back() {
    glGame.readyroom.reqExitArea();
    this.remove();
  },
  // 规则
  click_help: function click_help() {
    // let gameName = glGame.scene.getSceneNameByID(this.gameid);
    // if (gameName == "ddz" || gameName == "dzpk") {
    // glGame.panel.showNewGameRule(this.gameid,30);
    // } else {
    // glGame.panel.showGameRule(gameName);
    // }
    var panel = glGame.panel.showPanel(this.rulePrefab);
    panel.zIndex = 30;
  },
  // 游戏记录
  click_record: function click_record() {
    // console.log("gameid", this.gameid)
    // if (this.gameid == 36 || this.gameid == 35 || this.gameid == 30) {
    // glGame.panel.showNewGameRecord(this.gameid,30);
    // } else {
    //     glGame.panel.showGameRecord(this.gameid);
    // }
    var panel = glGame.panel.showPanel(this.recordPrefab);
    panel.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  //事件回调
  //进入游戏信息回调
  onDeleteRoom: function onDeleteRoom(msg) {
    for (var i = 0; i < this.content.children.length; i++) {
      if (this.content.children[i].name == msg.roomid) {
        this.content.children[i].destroy();
      }
    }
  },
  onGameInfolist: function onGameInfolist(msg) {
    cc.log("服务端发送数据222", msg);
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.gameInfoTest = glGame.readyroom.get("gameInfo");
    console.log('this.gameInfoTest', this.gameInfoTest);
    if (!this.gameInfoTest) return;
    this.serverTimeOff = Date.now() - msg.servertime;
    this.updateUI();
  },
  onHandInfo: function onHandInfo(msg) {
    this.roomRecord = glGame.readyroom.roomrecord;
    console.log("奖励", this.roomRecord);

    for (var i = 0; i < this.content.children.length; i++) {
      if (this.content.children[i].name == msg.roomid) {
        this.showRecord(this.content.children[i], this.roomRecord[msg.roomid], msg.roomid);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {
    //this.updateUI();
    console.log('onRoomInfo ===> r');
    this.roomList = glGame.readyroom.roomlist;
    this.serverTimeOff = Date.now() - msg.servertime; //if (this.gameInfo.id != msg.gameid) return

    if (this.roomType != msg.roomdata.bettype && this.roomType !== 0) return;
    var count = 0;

    for (var i = 0; i < this.content.children.length; i++) {
      if (this.content.children[i].name == msg.roomdata.roomid) {
        count++;
      }
    }

    if (count == 0) {
      var infoNode = cc.instantiate(this.node_record);
      infoNode.parent = this.content;
      infoNode.active = true;
      infoNode.name = "".concat(msg.roomdata.roomid);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].roomserverid,
        type: msg.roomdata.bettype
      };
      var waitTime = Math.round((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      var process = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].process - 1;
      infoNode.getChildByName("lab_time").color = process == 1 && waitTime < 4 ? cc.color(255, 96, 47) : PROCESS[process].color;
      infoNode.getChildByName("lab_time").getComponent(cc.Label).string = "".concat(PROCESS[process].tip, ":").concat(waitTime, "S");
      infoNode.getChildByName('onlinePeople').getChildByName('lab_onlineNum').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      this.roomRecord = glGame.readyroom.roomrecord;
      this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid], msg.roomdata.roomid);
    }

    for (var _i = 0; _i < this.content.children.length; _i++) {
      if (this.content.children[_i].name == msg.roomdata.roomid) {
        var _waitTime2 = Math.round((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

        this.content.children[_i].process = msg.roomdata.process;
        this.content.children[_i].waitTime = _waitTime2;
        this.content.children[_i].getChildByName('onlinePeople').getChildByName('lab_onlineNum').getComponent(cc.Label).string = msg.roomdata.online;
      }
    }
  },
  //更新UI
  updateUI: function updateUI() {
    this.roomList = [];

    for (var key in glGame.readyroom.roomlist[this.roomType]) {
      this.roomList.push(glGame.readyroom.roomlist[this.roomType][key]);
    }

    this.roomList.sort(function (a, b) {
      return a.bettype - b.bettype;
    });
    this.roomRecord = glGame.readyroom.roomrecord;

    if (!this.roomList) {
      return;
    }

    this.cleanTimer();

    for (var roomid in this.roomList) {
      if (!this.roomList[roomid]) continue;

      for (var i = 0; i < this.content.childrenCount; i++) {
        if (this.content.children[i].name == this.roomList[roomid].roomid) {
          return;
        }
      }

      var infoNode = cc.instantiate(this.node_record);
      infoNode.parent = this.content;
      infoNode.active = true;
      infoNode.name = "".concat(this.roomList[roomid].roomid);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[roomid].roomserverid,
        type: this.roomList[roomid].bettype
      };
      var str = this.roomList[roomid].roomid.toString();
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('onlinePeople').getChildByName('lab_onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      infoNode.getChildByName('chiplimitNode').getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "-" + maxbet;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("flash").active = true;
      } else {
        infoNode.getChildByName("btn_enter").getChildByName("img_jinruyouxi").getComponent(cc.Sprite).spriteFrame = this.battleWatchpic;
      }

      var waitTime = Math.round((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      infoNode.process = this.roomList[roomid].process;

      var _process = this.roomList[roomid].process - 1;

      infoNode.getChildByName("lab_time").color = _process == 1 && waitTime < 4 ? cc.color(255, 96, 47) : PROCESS[_process].color;
      infoNode.getChildByName("lab_time").getComponent(cc.Label).string = "".concat(PROCESS[_process].tip, ":").concat(waitTime, "S");
      this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
    }

    this.showClock();
  },
  //显示倒计时
  showClock: function showClock() {
    var _this2 = this;

    this.setTimeOut = setInterval(function () {
      if (_this2.content.children) {
        for (var i = 0; i < _this2.content.children.length; i++) {
          _this2.content.children[i].waitTime -= 1;

          if (_this2.content.children[i].waitTime < 0) {
            _this2.content.children[i].waitTime = 0;
          }

          var _process = _this2.content.children[i].process - 1;

          var _waitTime = _this2.content.children[i].waitTime;
          _this2.content.children[i].getChildByName("lab_time").color = _process == 1 && _waitTime < 4 ? cc.color(255, 96, 47) : PROCESS[_process].color;
          _this2.content.children[i].getChildByName("lab_time").getComponent(cc.Label).string = "".concat(PROCESS[_process].tip, ":").concat(_waitTime, "S");
        }
      }
    }, 1000);
  },
  showRecord: function showRecord(node, record, roomid) {
    if (!record) {
      return;
    }

    var index = record.length > 10 ? record.length - 10 : 0;
    var dotNode;
    node.getChildByName('node_dot').destroyAllChildren();
    var resultNumArr = [0, 0, 0, 0];

    for (var i = index; i < record.length; i++) {
      for (var j in record[i]) {
        if (j == 0) {
          continue;
        }

        dotNode = cc.instantiate(this.node_result);

        if (record[i][j] == 0) {
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_cha'];
        } else {
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_gou'];
          resultNumArr[j - 1] += 1;
        }

        dotNode.parent = node.getChildByName('node_dot'); // dotNode.setPosition(cc.v2(-160 + (i - index) * 63.5, 110 - (Number(j) - 1) * 70));

        dotNode.setPosition(cc.v2(-105 + (i - index) * 47.5, 82.5 - (Number(j) - 1) * 52.5));
        dotNode.active = false;
      }
    }

    glGame.panel.showEffectNode(this, node.getChildByName('node_dot'), 0.02, true); // node.getChildByName("frame_new").active = record.length != 0;
    // node.getChildByName("frame_new").x = record.length > 20 ? -380 + 19 * 42.3 : -380 + (record.length - 1) * 42.3

    node.getChildByName('node_left').getChildByName('tian').children[0].getComponent(cc.Label).string = resultNumArr[0] > 0 && resultNumArr[0] < 10 ? '0' + resultNumArr[0] : resultNumArr[0];
    node.getChildByName('node_left').getChildByName('di').children[0].getComponent(cc.Label).string = resultNumArr[1] > 0 && resultNumArr[1] < 10 ? '0' + resultNumArr[1] : resultNumArr[1];
    node.getChildByName('node_left').getChildByName('xuan').children[0].getComponent(cc.Label).string = resultNumArr[2] > 0 && resultNumArr[2] < 10 ? '0' + resultNumArr[2] : resultNumArr[2];
    node.getChildByName('node_left').getChildByName('huang').children[0].getComponent(cc.Label).string = resultNumArr[3] > 0 && resultNumArr[3] < 10 ? '0' + resultNumArr[3] : resultNumArr[3];
  },
  //清理倒计时
  cleanTimer: function cleanTimer() {
    if (this.setTimeOut != null) {
      clearTimeout(this.setTimeOut);
    }

    this.setTimeOut = null;
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.unregisterEvent();
    this.cleanTimer();
  } // update (dt) {},

});

cc._RF.pop();
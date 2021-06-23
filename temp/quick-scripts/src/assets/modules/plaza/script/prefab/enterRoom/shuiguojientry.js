"use strict";
cc._RF.push(module, '890a0jRjhZD+pfRaz/SYI/c', 'shuiguojientry');
// modules/plaza/script/prefab/enterRoom/shuiguojientry.js

"use strict";

var toggle_map = {
  toggle_base: 1,
  toggle_elementary: 2,
  toggle_medium: 3,
  toggle_higher: 4,
  toggle_plute: 5
};
var state_Arr = ["下注中", "结算中"];
glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    battleWatchpic: cc.SpriteFrame,
    sgjRule: cc.Prefab,
    pre_record: cc.Prefab,
    BGM: {
      //背景声音
      type: cc.AudioClip,
      "default": null
    },
    special_List: [cc.SpriteFrame],
    common_List: [cc.SpriteFrame],
    beishu_List: [cc.SpriteFrame]
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
    this.coundowmTime = 0;
    this.waittime = {};
    this.nodeInfo = {};
    this.process = {};
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
    this.waittime = {};
    this.nodeInfo = {};
    this.process = {};
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.cleanTimer();
    this.unregisterEvent();
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

      case "btn_chongzhi":
        this.click_addgold();
        break;

      case 'btn_enter':
      case 'btn_start':
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
          glGame.readyroom.enterHundredsRoom(node.parent.name, _this.nodeInfo[node.parent.name].tag);
        });
        break;

      default:
        var roomType = toggle_map[name];
        if (!roomType) return;

        if (this.roomType != roomType) {
          this.roomType = roomType;
          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;
    }
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.SHUIGUOJI;
    glGame.readyroom.reqEnterArea(glGame.scenetag.SHUIGUOJI);
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
    var _this2 = this;

    this.roomList = glGame.readyroom.roomlist;
    this.serverTimeOff = Date.now() - msg.servertime;
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
      infoNode.active = false;
      infoNode.getChildByName("img_new").active = false;
      infoNode.name = "".concat(msg.roomdata.roomid);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].roomserverid,
        type: msg.roomdata.bettype
      };
      var waitTime = Math.round((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      this.waittime[msg.roomdata.roomid] = {};
      this.waittime[msg.roomdata.roomid].cutdown = waitTime;
      this.waittime[msg.roomdata.roomid].totaltime = waitTime;
      this.process[msg.roomdata.roomid] = msg.roomdata.process;
      infoNode.getChildByName('online').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      this.roomRecord = glGame.readyroom.roomrecord;
      this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid], msg.roomdata.roomid);
    }

    for (var _i = 0; _i < this.content.childrenCount; _i++) {
      this.content.children[_i].getChildByName("img_new").active = false;
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true, 0.1, function () {
      _this2.scheduleOnce(function () {
        for (var _i2 = 0; _i2 < _this2.content.childrenCount; _i2++) {
          _this2.content.children[_i2].getChildByName("img_new").active = true;
        }
      }, 0.8);
    });

    for (var _i3 = 0; _i3 < this.content.children.length; _i3++) {
      if (this.content.children[_i3].name == msg.roomdata.roomid) {
        var _waitTime = Math.round((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

        this.waittime[this.content.children[_i3].name].cutdown = _waitTime;
        this.waittime[this.content.children[_i3].name].totaltime = _waitTime;
        this.process[this.content.children[_i3].name] = msg.roomdata.process;
        this.content.children[_i3].getChildByName('online').getComponent(cc.Label).string = msg.roomdata.online;
      }
    }

    this.cleanTimer();
    this.showClock();
  },
  //更新UI
  updateUI: function updateUI() {
    var _this3 = this;

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
      if (roomid == "hasValue" || roomid == "resize") {
        continue;
      }

      if (!this.roomList[roomid]) continue;

      for (var i = 0; i < this.content.childrenCount; i++) {
        if (this.content.children[i].name == this.roomList[roomid].roomid) {
          return;
        }
      }

      var infoNode = cc.instantiate(this.node_record);
      infoNode.parent = this.content;
      infoNode.active = false;
      infoNode.getChildByName("img_new").active = false;
      infoNode.name = "".concat(this.roomList[roomid].roomid);
      console.log('infoNode.name', infoNode.name, this.roomList[roomid], this.roomList);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[roomid].roomserverid,
        type: this.roomList[roomid].bettype
      };
      var str = this.roomList[roomid].roomid.toString();
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('online').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      console.log("入口数据调整", this.gameInfoTest[this.roomList[roomid].bettype].Chips[0], minbet / 100, this.gameInfoTest[this.roomList[roomid].bettype].MaxBet / 100, maxbet);
      infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "-" + maxbet;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("flash").active = true;
        infoNode.getChildByName('btn_enter_effect').active = true;
        infoNode.getChildByName('btn_enter').opacity = 0;
      } else {
        //观战
        infoNode.getChildByName('btn_enter_effect').active = false;
        infoNode.getChildByName('btn_enter').opacity = 255;
        infoNode.getChildByName("btn_enter").getChildByName("img_jinruyouxi").getComponent(cc.Sprite).spriteFrame = this.battleWatchpic;
      }

      var waitTime = Math.round((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

      if (waitTime < 0) {
        waitTime = 0;
      }

      this.waittime[this.roomList[roomid].roomid] = {};
      this.waittime[this.roomList[roomid].roomid].cutdown = waitTime;
      this.waittime[this.roomList[roomid].roomid].totaltime = waitTime;
      this.process[this.roomList[roomid].roomid] = this.roomList[roomid].process;
      this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true, 0.1, function () {
      _this3.scheduleOnce(function () {
        for (var _i4 = 0; _i4 < _this3.content.childrenCount; _i4++) {
          _this3.content.children[_i4].getChildByName("img_new").active = true;
        }
      }, 0.8);
    });
    this.showClock();
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  //显示倒计时
  showClock: function showClock() {
    var _this4 = this;

    var call = function call() {
      if (_this4.content.children) {
        for (var i = 0; i < _this4.content.children.length; i++) {
          var roomid = _this4.content.children[i].name;
          _this4.waittime[roomid].cutdown -= 1;

          if (_this4.waittime[roomid].cutdown < 0) {
            _this4.waittime[roomid].cutdown = 0;
          }

          var process = _this4.process[roomid];
          var remainTime = Math.floor(_this4.waittime[roomid].cutdown);
          var szState = state_Arr[process - 1];

          var lbClock = _this4.content.children[i].getChildByName('clock').getComponent(cc.Label);

          if (process == 1) {
            lbClock.string = "".concat(szState, ":  ").concat(remainTime, "s");

            if (remainTime <= 3) {
              lbClock.node.color = new cc.Color(255, 96, 47);
            } else {
              lbClock.node.color = new cc.Color(141, 209, 37);
            }
          } else {
            lbClock.string = szState;
            lbClock.node.color = new cc.Color(226, 137, 255);
          }
        }
      }
    };

    call();
    this.setTimeOut = setInterval(call, 1000);
  },
  showRecord: function showRecord(node, record, roomid) {
    if (!record) {
      return;
    }

    var index = 0;
    var dotNode;
    node.getChildByName('node_dot').destroyAllChildren();
    node.getChildByName('node_dot').removeAllChildren();

    if (record.length > 16) {
      index = record.length - 16;
    }

    for (var i = index; i < record.length; i++) {
      dotNode = cc.instantiate(this.node_result);
      dotNode.active = false;

      if (record[i].rewardType != 11) {
        var result_node = dotNode.getChildByName("node_results");
        result_node.active = true;
        result_node.getComponent(cc.Sprite).spriteFrame = this.special_List[record[i].rewardType];
        dotNode.getChildByName("multiple").getChildByName("cheng").active = false;
      } else {
        var _result_node = dotNode.getChildByName("node_result");

        _result_node.active = true;

        if (this.common_List[record[i].rewardArr[0].fruitType]) {
          _result_node.getComponent(cc.Sprite).spriteFrame = this.common_List[record[i].rewardArr[0].fruitType];
        } else {
          cc.error(">>> 缺少 " + record[i].rewardArr[0].fruitType);
        }

        this.setmultiple(dotNode, record[i].rewardArr[0].priceMultiple);
      }

      dotNode.parent = node.getChildByName('node_dot');

      if (i == record.length - 1) {
        dotNode.getChildByName("new").active = true;
      }
    }

    glGame.panel.showEffectNode(this, node.getChildByName('node_dot'), 0.02, true);
  },
  //根据倍数用plist图集拼接数字
  setmultiple: function setmultiple(node, multiple) {
    var stringCount = multiple.toString();
    var count = stringCount.length;

    for (var i = 0; i < count; i++) {
      var newNode = new cc.Node();
      newNode.addComponent(cc.Sprite).spriteFrame = this.beishu_List[stringCount[i]];
      newNode.parent = node.getChildByName("multiple");
    }
  },
  //清理倒计时
  cleanTimer: function cleanTimer() {
    if (this.setTimeOut != null) {
      clearTimeout(this.setTimeOut);
    }

    this.setTimeOut = null;
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
  click_help: function click_help() {
    var panel = glGame.panel.showPanel(this.sgjRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    glGame.panel.showPanel(this.pre_record).zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.cleanTimer();
    this.unregisterEvent();
  }
});

cc._RF.pop();
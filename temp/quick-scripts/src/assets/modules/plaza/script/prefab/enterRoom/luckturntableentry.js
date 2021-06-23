"use strict";
cc._RF.push(module, 'efff6CwBkVMVakryA2V1KhW', 'luckturntableentry');
// modules/plaza/script/prefab/enterRoom/luckturntableentry.js

"use strict";

var dzp_result = {
  1: "img_hongdian",
  2: "img_heidian",
  3: "img_hongdian",
  4: "img_heidian",
  5: "img_hongdian",
  6: "img_heidian",
  7: "img_hongdian",
  8: "img_heidian",
  9: "img_hongdian",
  10: "img_heidian",
  11: "img_heidian",
  12: "img_hongdian",
  13: "img_heidian",
  14: "img_hongdian",
  15: "img_heidian",
  16: "img_hongdian",
  17: "img_heidian",
  18: "img_hongdian",
  19: "img_hongdian",
  20: "img_heidian",
  21: "img_hongdian",
  22: "img_heidian",
  23: "img_hongdian",
  24: "img_heidian",
  25: "img_hongdian",
  26: "img_heidian",
  27: "img_hongdian",
  28: "img_heidian",
  29: "img_heidian",
  30: "img_hongdian",
  31: "img_heidian",
  32: "img_hongdian",
  33: "img_heidian",
  34: "img_hongdian",
  35: "img_heidian",
  36: "img_hongdian"
};
var state_Arr = ["准备中", "下注中", "结算中"];
var toggle_map = {
  toggle_base: 1,
  toggle_elementary: 2,
  toggle_medium: 3,
  toggle_higher: 4,
  toggle_plute: 5
};
glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    sprite_Atlas: cc.SpriteAtlas,
    battleWatchpic: cc.SpriteFrame,
    lttRecord: cc.Prefab,
    lttRule: cc.Prefab,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.roomType = 1;
    this.waittime = {};
    this.nodeInfo = {};
    this.process = {};
    this.colors = [new cc.Color(255, 96, 47), new cc.Color(137, 218, 255), new cc.Color(141, 222, 37), new cc.Color(226, 137, 255)];
    this.updateuserInfo();
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
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.LUCKTURNTABLE;
    glGame.readyroom.reqEnterArea(glGame.scenetag.LUCKTURNTABLE);
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

        if (this.roomType != roomType) {
          this.roomType = roomType;
          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

        break;
    }
  },
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
    if (!this.gameInfoTest) return;
    this.serverTimeOff = Date.now() - msg.servertime;
    this.updateUI();
  },
  onHandInfo: function onHandInfo(msg) {
    this.roomRecord = glGame.readyroom.roomrecord;

    for (var i = 0; i < this.content.children.length; i++) {
      if (this.content.children[i].name == msg.roomid) {
        this.showRecord(this.content.children[i], this.roomRecord[msg.roomid]);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {
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
      infoNode.active = true;
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
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      this.roomRecord = glGame.readyroom.roomrecord;
      this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid]);

      if (this.gameInfoTest[msg.roomdata.bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("flash").active = true;
        infoNode.getChildByName("btn_enter").getComponent(cc.Sprite).enabled = false;
      } else {
        infoNode.getChildByName("btn_enter").getChildByName("img_jinruyouxi").getComponent(cc.Sprite).spriteFrame = this.battleWatchpic;
      }
    }

    for (var _i = 0; _i < this.content.children.length; _i++) {
      if (this.content.children[_i].name == msg.roomdata.roomid) {
        var _waitTime = Math.round((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

        this.waittime[this.content.children[_i].name].cutdown = _waitTime;
        this.waittime[this.content.children[_i].name].totaltime = _waitTime;
        this.process[this.content.children[_i].name] = msg.roomdata.process;
        this.content.children[_i].getChildByName('onlineNum').getComponent(cc.Label).string = msg.roomdata.online;
      }
    }

    this.startClock();
  },
  //更新UI
  updateUI: function updateUI() {
    this.roomList = [];
    this.lbClocks = [];

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

    for (var roomid in this.roomList) {
      if (!this.roomList[roomid]) continue;

      for (var i = 0; i < this.content.childrenCount; i++) {
        if (this.content.children[i].name == this.roomList[roomid].roomid) {
          return;
        }
      }

      var infoNode = cc.instantiate(this.node_record);
      infoNode.parent = this.content;
      infoNode.active = false;
      infoNode.name = "".concat(this.roomList[roomid].roomid);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[roomid].roomserverid,
        type: this.roomList[roomid].bettype
      };
      this.lbClocks[roomid] = infoNode.getChildByName("clock").getComponent(cc.Label);
      var str = this.roomList[roomid].roomid.toString();
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "~" + maxbet;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("flash").active = true;
        infoNode.getChildByName("btn_enter").getComponent(cc.Sprite).enabled = false;
      } else {
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
      if (this.roomList[roomid].gameid == glGame.scenetag.QHBJL) continue;
      this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid]);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
    this.startClock();
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  //显示倒计时
  startClock: function startClock() {
    var _this2 = this;

    this.cleanTimer();
    this.setTimeOut = setInterval(function () {
      _this2.showClock();
    }, 1000);
    this.showClock();
  },
  showClock: function showClock() {
    for (var i = 0; i < this.content.children.length; i++) {
      var roomid = this.content.children[i].name;
      this.waittime[roomid].cutdown -= 1;

      if (this.waittime[roomid].cutdown < 0) {
        this.waittime[roomid].cutdown = 0;
      }

      var process = this.process[roomid];
      var remainTime = Math.floor(this.waittime[roomid].cutdown);
      var szState = state_Arr[process - 1];
      var lbClock = this.content.children[i].getChildByName('clock').getComponent(cc.Label);
      lbClock.node.color = this.colors[process];

      if (process == 2) {
        lbClock.string = "".concat(szState, ":  ").concat(remainTime);

        if (remainTime <= 3) {
          lbClock.node.color = this.colors[0];
        }
      } else {
        lbClock.string = szState;
      }
    }
  },
  showRecord: function showRecord(node, record) {
    if (!record) {
      return;
    }

    var index = 0;
    var dotNode;
    var nodeDot = node.getChildByName('node_dot');
    nodeDot.destroyAllChildren();
    var change = [0, 0, 0, 0, 0];

    if (record.length > 48) {
      index = record.length - 48;
    }

    var count = 0;

    for (var i = index; i < record.length; i++) {
      dotNode = cc.instantiate(this.node_result);

      if (record[i] == 0) {
        dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_ludian'];
        change[4]++;
      } else {
        dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames[dzp_result[record[i]]];
        record[i] % 2 == 1 ? change[0]++ : change[1]++;
        dzp_result[record[i]] == "img_hongdian" ? change[2]++ : change[3]++;
      }

      this.setmultiple(dotNode, record[i]);
      dotNode.parent = nodeDot;
      dotNode.opacity = 0;
      dotNode.active = true;
      var delay = cc.delayTime(Math.floor(count++ / 12) * 0.10);
      var fadeIn = cc.fadeIn(0.15);
      dotNode.runAction(cc.sequence(delay, fadeIn));
    }

    var percent = [];

    for (var _i2 = 4; _i2 >= 0; _i2--) {
      var change_string = Math.round((record.length > 48 ? change[_i2] / 48 : change[_i2] / record.length) * 100);

      if (_i2 == 0 || _i2 == 2) {
        change_string = 100 - percent[4] - percent[_i2 + 1];
      }

      percent[_i2] = change_string;
      node.getChildByName("change").children[_i2].getComponent(cc.Label).string = "".concat(change_string, "%");
    }
  },
  //根据倍数用plist图集拼接数字
  setmultiple: function setmultiple(node, multiple) {
    var stringCount = multiple.toString();
    var count = stringCount.length;

    for (var i = 0; i < count; i++) {
      var newNode = new cc.Node();
      newNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas.getSpriteFrame("img_bai" + stringCount[i]);
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
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin);
  },
  updateBgInfo: function updateBgInfo() {},
  setGameId: function setGameId(gameid) {
    this.gameid = gameid;
  },
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
    var panel = glGame.panel.showPanel(this.lttRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.lttRecord);
    panel.zIndex = 30;
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
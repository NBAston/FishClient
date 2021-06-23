
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/luckturntableentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGx1Y2t0dXJudGFibGVlbnRyeS5qcyJdLCJuYW1lcyI6WyJkenBfcmVzdWx0Iiwic3RhdGVfQXJyIiwidG9nZ2xlX21hcCIsInRvZ2dsZV9iYXNlIiwidG9nZ2xlX2VsZW1lbnRhcnkiLCJ0b2dnbGVfbWVkaXVtIiwidG9nZ2xlX2hpZ2hlciIsInRvZ2dsZV9wbHV0ZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJnb2xkQ291bnQiLCJjYyIsIkxhYmVsIiwiY29udGVudCIsIk5vZGUiLCJub2RlX3JlY29yZCIsIm5vZGVfcmVzdWx0Iiwic3ByaXRlX0F0bGFzIiwiU3ByaXRlQXRsYXMiLCJiYXR0bGVXYXRjaHBpYyIsIlNwcml0ZUZyYW1lIiwibHR0UmVjb3JkIiwiUHJlZmFiIiwibHR0UnVsZSIsIkJHTSIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJnYW1laWQiLCJub2RlIiwiekluZGV4IiwiZW1pdHRlciIsIm9uIiwiTUVTU0FHRSIsIlVJIiwiUk9PTV9FTlRFUl9TSE9XIiwiUm9vdE5vZGVTaG93IiwiUk9PTV9FTlRFUl9ISURFIiwiUm9vdE5vZGVIaWRlIiwiY2xpY2tfYmFjayIsInVwZGF0ZXVzZXJJbmZvIiwicmVnaXN0ZXJFdmVudCIsInJlcUVudGVyQXJlYSIsInJvb21UeXBlIiwid2FpdHRpbWUiLCJub2RlSW5mbyIsInByb2Nlc3MiLCJjb2xvcnMiLCJDb2xvciIsImFjdGl2ZSIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsInJlbW92ZUFsbENoaWxkcmVuIiwiY2xlYW5UaW1lciIsInVucmVnaXN0ZXJFdmVudCIsImdhbWVJRCIsInNjZW5ldGFnIiwiTFVDS1RVUk5UQUJMRSIsInJlYWR5cm9vbSIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfaGVscCIsImNsaWNrX3JlY29yZCIsImNsaWNrX2FkZGdvbGQiLCJjbGlja191c2VyaW5mbyIsInVzZXIiLCJpc1RvdXJpc3QiLCJwYW5lbCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInN1c3BpY2lvdXMiLCJnYW1lIiwiaXNfZ2FtZSIsInNob3dEaWFsb2ciLCJzaG93U2VydmljZSIsInNob3dGaWVsZFNlbGVjdGlvbkp1SHVhIiwicm9vbSIsInJlcU15R2FtZVN0YXRlIiwicGFyZW50IiwidGhlbiIsImVudGVySHVuZHJlZHNSb29tIiwidGFnIiwidXBkYXRlVUkiLCJvbkRlbGV0ZVJvb20iLCJtc2ciLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJyb29taWQiLCJkZXN0cm95Iiwib25HYW1lSW5mb2xpc3QiLCJnYW1lSW5mb1Rlc3QiLCJnZXQiLCJzZXJ2ZXJUaW1lT2ZmIiwiRGF0ZSIsIm5vdyIsInNlcnZlcnRpbWUiLCJvbkhhbmRJbmZvIiwicm9vbVJlY29yZCIsInJvb21yZWNvcmQiLCJzaG93UmVjb3JkIiwib25Sb29tSW5mbyIsInJvb21MaXN0Iiwicm9vbWxpc3QiLCJyb29tZGF0YSIsImJldHR5cGUiLCJjb3VudCIsImluZm9Ob2RlIiwiaW5zdGFudGlhdGUiLCJyb29tc2VydmVyaWQiLCJ3YWl0VGltZSIsIk1hdGgiLCJyb3VuZCIsImN1cndhaXR0aW1lIiwiY3V0ZG93biIsInRvdGFsdGltZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwib25saW5lIiwiRW50cmFuY2VSZXN0cmljdGlvbnMiLCJTcHJpdGUiLCJlbmFibGVkIiwic3ByaXRlRnJhbWUiLCJzdGFydENsb2NrIiwibGJDbG9ja3MiLCJrZXkiLCJwdXNoIiwic29ydCIsImEiLCJiIiwiY2hpbGRyZW5Db3VudCIsInN0ciIsInRvU3RyaW5nIiwic3Vic3RyIiwibWluYmV0IiwiRW50ZXJSb29tR29sZFRlbXAiLCJDaGlwcyIsIm1heGJldCIsIk1heEJldCIsIlFIQkpMIiwic2hvd0VmZmVjdE5vZGUiLCJnZXRGbG9hdCIsInZhbHVlIiwiTnVtYmVyIiwiZGl2Iiwic2V0VGltZU91dCIsInNldEludGVydmFsIiwic2hvd0Nsb2NrIiwicmVtYWluVGltZSIsImZsb29yIiwic3pTdGF0ZSIsImxiQ2xvY2siLCJjb2xvciIsInJlY29yZCIsImluZGV4IiwiZG90Tm9kZSIsIm5vZGVEb3QiLCJjaGFuZ2UiLCJfc3ByaXRlRnJhbWVzIiwic2V0bXVsdGlwbGUiLCJvcGFjaXR5IiwiZGVsYXkiLCJkZWxheVRpbWUiLCJmYWRlSW4iLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInBlcmNlbnQiLCJjaGFuZ2Vfc3RyaW5nIiwibXVsdGlwbGUiLCJzdHJpbmdDb3VudCIsIm5ld05vZGUiLCJhZGRDb21wb25lbnQiLCJnZXRTcHJpdGVGcmFtZSIsImNsZWFyVGltZW91dCIsInNob3dVc2VySW5mbyIsInNob3dSZW1vdGVJbWFnZSIsIlBsYXllcmhlYWQiLCJjb2luIiwiR29sZFRlbXAiLCJ1cGRhdGVCZ0luZm8iLCJzZXRHYW1lSWQiLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2hvcCIsInJlcUV4aXRBcmVhIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwib2ZmIiwic2V0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFVBQVUsR0FBRztBQUNmLEtBQUcsY0FEWTtBQUNJLEtBQUcsYUFEUDtBQUNzQixLQUFHLGNBRHpCO0FBQ3lDLEtBQUcsYUFENUM7QUFDMkQsS0FBRyxjQUQ5RDtBQUM4RSxLQUFHLGFBRGpGO0FBQ2dHLEtBQUcsY0FEbkc7QUFDbUgsS0FBRyxhQUR0SDtBQUNxSSxLQUFHLGNBRHhJO0FBQ3dKLE1BQUksYUFENUo7QUFFZixNQUFJLGFBRlc7QUFFSSxNQUFJLGNBRlI7QUFFd0IsTUFBSSxhQUY1QjtBQUUyQyxNQUFJLGNBRi9DO0FBRStELE1BQUksYUFGbkU7QUFFa0YsTUFBSSxjQUZ0RjtBQUVzRyxNQUFJLGFBRjFHO0FBRXlILE1BQUksY0FGN0g7QUFFNkksTUFBSSxjQUZqSjtBQUVpSyxNQUFJLGFBRnJLO0FBRW9MLE1BQUksY0FGeEw7QUFHZixNQUFJLGFBSFc7QUFHSSxNQUFJLGNBSFI7QUFHd0IsTUFBSSxhQUg1QjtBQUcyQyxNQUFJLGNBSC9DO0FBRytELE1BQUksYUFIbkU7QUFHa0YsTUFBSSxjQUh0RjtBQUdzRyxNQUFJLGFBSDFHO0FBR3lILE1BQUksYUFIN0g7QUFHNEksTUFBSSxjQUhoSjtBQUdnSyxNQUFJLGFBSHBLO0FBR21MLE1BQUksY0FIdkw7QUFJZixNQUFJLGFBSlc7QUFJSSxNQUFJLGNBSlI7QUFJd0IsTUFBSSxhQUo1QjtBQUkyQyxNQUFJO0FBSi9DLENBQW5CO0FBT0EsSUFBTUMsU0FBUyxHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLENBQWxCO0FBSUEsSUFBTUMsVUFBVSxHQUFHO0FBQ2ZDLEVBQUFBLFdBQVcsRUFBRSxDQURFO0FBRWZDLEVBQUFBLGlCQUFpQixFQUFFLENBRko7QUFHZkMsRUFBQUEsYUFBYSxFQUFFLENBSEE7QUFJZkMsRUFBQUEsYUFBYSxFQUFFLENBSkE7QUFLZkMsRUFBQUEsWUFBWSxFQUFFO0FBTEMsQ0FBbkI7QUFRQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxLQUROO0FBRVJDLElBQUFBLE9BQU8sRUFBRUYsRUFBRSxDQUFDRyxJQUZKO0FBR1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDRyxJQUhSO0FBSVJFLElBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDRyxJQUpSO0FBS1JHLElBQUFBLFlBQVksRUFBRU4sRUFBRSxDQUFDTyxXQUxUO0FBTVJDLElBQUFBLGNBQWMsRUFBRVIsRUFBRSxDQUFDUyxXQU5YO0FBT1JDLElBQUFBLFNBQVMsRUFBRVYsRUFBRSxDQUFDVyxNQVBOO0FBUVJDLElBQUFBLE9BQU8sRUFBRVosRUFBRSxDQUFDVyxNQVJKO0FBU1JFLElBQUFBLEdBQUcsRUFBRTtBQUNEQyxNQUFBQSxJQUFJLEVBQUVkLEVBQUUsQ0FBQ2UsU0FEUjtBQUVELGlCQUFTO0FBRlI7QUFURyxHQUZRO0FBaUJwQkMsRUFBQUEsTUFqQm9CLG9CQWlCWDtBQUNMLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEVBQW5CO0FBQ0F4QixJQUFBQSxNQUFNLENBQUN5QixPQUFQLENBQWVDLEVBQWYsQ0FBa0JDLE9BQU8sQ0FBQ0MsRUFBUixDQUFXQyxlQUE3QixFQUE4QyxLQUFLQyxZQUFuRCxFQUFpRSxJQUFqRTtBQUNBOUIsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCQyxPQUFPLENBQUNDLEVBQVIsQ0FBV0csZUFBN0IsRUFBOEMsS0FBS0MsWUFBbkQsRUFBaUUsSUFBakU7QUFDQWhDLElBQUFBLE1BQU0sQ0FBQ3lCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixZQUFsQixFQUFnQyxLQUFLTyxVQUFyQyxFQUFpRCxJQUFqRDtBQUNBakMsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCLGdCQUFsQixFQUFvQyxLQUFLUSxjQUF6QyxFQUF5RCxJQUF6RDtBQUNBLFNBQUtDLGFBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBQyxJQUFJcEMsRUFBRSxDQUFDcUMsS0FBUCxDQUFhLEdBQWIsRUFBaUIsRUFBakIsRUFBb0IsRUFBcEIsQ0FBRCxFQUEwQixJQUFJckMsRUFBRSxDQUFDcUMsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBMUIsRUFBcUQsSUFBSXJDLEVBQUUsQ0FBQ3FDLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEVBQXJCLENBQXJELEVBQStFLElBQUlyQyxFQUFFLENBQUNxQyxLQUFQLENBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixDQUEvRSxDQUFkO0FBQ0EsU0FBS1IsY0FBTDtBQUNILEdBaENtQjtBQWtDcEJKLEVBQUFBLFlBbENvQiwwQkFrQ047QUFDVixTQUFLUCxJQUFMLENBQVVvQixNQUFWLEdBQW1CLElBQW5CO0FBQ0EsU0FBS1IsYUFBTDtBQUNBLFNBQUtDLFlBQUw7QUFDQSxTQUFLRSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0gsR0F6Q21CO0FBMkNwQlIsRUFBQUEsWUEzQ29CLDBCQTJDTjtBQUNWLFNBQUtULElBQUwsQ0FBVW9CLE1BQVYsR0FBbUIsS0FBbkI7QUFDQSxTQUFLcEMsT0FBTCxDQUFhcUMsa0JBQWI7QUFDQSxTQUFLckMsT0FBTCxDQUFhc0MsaUJBQWI7QUFDQSxTQUFLQyxVQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNILEdBakRtQjtBQW1EcEJYLEVBQUFBLFlBbkRvQiwwQkFtREw7QUFDWCxTQUFLWSxNQUFMLEdBQWNoRCxNQUFNLENBQUNpRCxRQUFQLENBQWdCQyxhQUE5QjtBQUNBbEQsSUFBQUEsTUFBTSxDQUFDbUQsU0FBUCxDQUFpQmYsWUFBakIsQ0FBOEJwQyxNQUFNLENBQUNpRCxRQUFQLENBQWdCQyxhQUE5QztBQUNILEdBdERtQjtBQXdEcEJFLEVBQUFBLE9BeERvQixtQkF3RFpDLElBeERZLEVBd0ROOUIsSUF4RE0sRUF3REE7QUFBQTs7QUFDaEIsWUFBUThCLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFBaUIsYUFBS3BCLFVBQUw7QUFBbUI7O0FBQ3BDLFdBQUssVUFBTDtBQUFpQixhQUFLcUIsVUFBTDtBQUFtQjs7QUFDcEMsV0FBSyxZQUFMO0FBQW1CLGFBQUtDLFlBQUw7QUFBcUI7O0FBQ3hDLFdBQUssWUFBTDtBQUFtQixhQUFLQyxhQUFMO0FBQXNCOztBQUN6QyxXQUFLLFFBQUw7QUFBZSxhQUFLQyxjQUFMO0FBQXVCOztBQUN0QyxXQUFLLGNBQUw7QUFBcUIsYUFBS0QsYUFBTDtBQUFzQjs7QUFDM0MsV0FBSyxXQUFMO0FBQ0EsV0FBSyxXQUFMO0FBQ0ksWUFBSXhELE1BQU0sQ0FBQzBELElBQVAsQ0FBWUMsU0FBWixFQUFKLEVBQTZCO0FBQ3pCM0QsVUFBQUEsTUFBTSxDQUFDNEQsS0FBUCxDQUFhQyxrQkFBYixDQUFnQyxJQUFoQztBQUNBO0FBQ0g7O0FBQ0QsWUFBSTdELE1BQU0sQ0FBQzBELElBQVAsQ0FBWUksVUFBWixJQUEwQixDQUExQixJQUE4QjlELE1BQU0sQ0FBQzBELElBQVAsQ0FBWUssSUFBWixJQUFvQixDQUFuRCxJQUEwRC9ELE1BQU0sQ0FBQzBELElBQVAsQ0FBWU0sT0FBWixJQUF1QixDQUFwRixFQUF1RjtBQUNuRmhFLFVBQUFBLE1BQU0sQ0FBQzRELEtBQVAsQ0FBYUssVUFBYixDQUF3QixFQUF4QixFQUE0QiwrQkFBNUIsRUFBNkQsWUFBTTtBQUFFakUsWUFBQUEsTUFBTSxDQUFDNEQsS0FBUCxDQUFhTSxXQUFiO0FBQTRCLFdBQWpHLEVBQW1HLFlBQU0sQ0FBRSxDQUEzRyxFQUE2RyxNQUE3RyxFQUFxSCxNQUFySDtBQUNBO0FBQ0g7O0FBQ0RsRSxRQUFBQSxNQUFNLENBQUM0RCxLQUFQLENBQWFPLHVCQUFiO0FBQ0FuRSxRQUFBQSxNQUFNLENBQUNvRSxJQUFQLENBQVlDLGNBQVosQ0FBMkIsS0FBS3JCLE1BQWhDLEVBQXdDLEtBQUtULFFBQUwsQ0FBY2hCLElBQUksQ0FBQytDLE1BQUwsQ0FBWWpCLElBQTFCLEVBQWdDbEMsSUFBeEUsRUFBOEVJLElBQUksQ0FBQytDLE1BQUwsQ0FBWWpCLElBQTFGLEVBQWdHa0IsSUFBaEcsQ0FBcUcsWUFBTTtBQUN2R3ZFLFVBQUFBLE1BQU0sQ0FBQ21ELFNBQVAsQ0FBaUJxQixpQkFBakIsQ0FBbUNqRCxJQUFJLENBQUMrQyxNQUFMLENBQVlqQixJQUEvQyxFQUFxRCxLQUFJLENBQUNkLFFBQUwsQ0FBY2hCLElBQUksQ0FBQytDLE1BQUwsQ0FBWWpCLElBQTFCLEVBQWdDb0IsR0FBckY7QUFDSCxTQUZEO0FBR0E7O0FBQ0o7QUFDSSxZQUFJcEMsUUFBUSxHQUFHM0MsVUFBVSxDQUFDMkQsSUFBRCxDQUF6Qjs7QUFDQSxZQUFHLEtBQUtoQixRQUFMLElBQWlCQSxRQUFwQixFQUE4QjtBQUMxQixlQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGVBQUs5QixPQUFMLENBQWFxQyxrQkFBYjtBQUNBLGVBQUtyQyxPQUFMLENBQWFzQyxpQkFBYjtBQUNBLGVBQUs2QixRQUFMO0FBQ0g7O0FBQ0Q7QUE5QlI7QUFnQ0gsR0F6Rm1CO0FBMkZwQkMsRUFBQUEsWUEzRm9CLHdCQTJGUEMsR0EzRk8sRUEyRkY7QUFDZCxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3RFLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUksS0FBS3RFLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCeEIsSUFBekIsSUFBaUN1QixHQUFHLENBQUNJLE1BQXpDLEVBQWlEO0FBQzdDLGFBQUt6RSxPQUFMLENBQWF1RSxRQUFiLENBQXNCRCxDQUF0QixFQUF5QkksT0FBekI7QUFDSDtBQUNKO0FBQ0osR0FqR21CO0FBbUdwQkMsRUFBQUEsY0FuR29CLDBCQW1HTE4sR0FuR0ssRUFtR0E7QUFDaEIsU0FBS3JFLE9BQUwsQ0FBYXFDLGtCQUFiO0FBQ0EsU0FBS3JDLE9BQUwsQ0FBYXNDLGlCQUFiO0FBQ0EsU0FBS3NDLFlBQUwsR0FBb0JuRixNQUFNLENBQUNtRCxTQUFQLENBQWlCaUMsR0FBakIsQ0FBcUIsVUFBckIsQ0FBcEI7QUFDQSxRQUFJLENBQUMsS0FBS0QsWUFBVixFQUF3QjtBQUN4QixTQUFLRSxhQUFMLEdBQXFCQyxJQUFJLENBQUNDLEdBQUwsS0FBYVgsR0FBRyxDQUFDWSxVQUF0QztBQUNBLFNBQUtkLFFBQUw7QUFDSCxHQTFHbUI7QUE0R3BCZSxFQUFBQSxVQTVHb0Isc0JBNEdUYixHQTVHUyxFQTRHSjtBQUNaLFNBQUtjLFVBQUwsR0FBa0IxRixNQUFNLENBQUNtRCxTQUFQLENBQWlCd0MsVUFBbkM7O0FBQ0EsU0FBSyxJQUFJZCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0RSxPQUFMLENBQWF1RSxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUt0RSxPQUFMLENBQWF1RSxRQUFiLENBQXNCRCxDQUF0QixFQUF5QnhCLElBQXpCLElBQWlDdUIsR0FBRyxDQUFDSSxNQUF6QyxFQUFpRDtBQUM3QyxhQUFLWSxVQUFMLENBQWdCLEtBQUtyRixPQUFMLENBQWF1RSxRQUFiLENBQXNCRCxDQUF0QixDQUFoQixFQUEwQyxLQUFLYSxVQUFMLENBQWdCZCxHQUFHLENBQUNJLE1BQXBCLENBQTFDO0FBQ0g7QUFDSjtBQUNKLEdBbkhtQjtBQXFIcEJhLEVBQUFBLFVBckhvQixzQkFxSFRqQixHQXJIUyxFQXFISjtBQUNaLFNBQUtrQixRQUFMLEdBQWdCOUYsTUFBTSxDQUFDbUQsU0FBUCxDQUFpQjRDLFFBQWpDO0FBQ0EsU0FBS1YsYUFBTCxHQUFxQkMsSUFBSSxDQUFDQyxHQUFMLEtBQWFYLEdBQUcsQ0FBQ1ksVUFBdEM7QUFDQSxRQUFJLEtBQUtuRCxRQUFMLElBQWlCdUMsR0FBRyxDQUFDb0IsUUFBSixDQUFhQyxPQUE5QixJQUF5QyxLQUFLNUQsUUFBTCxLQUFrQixDQUEvRCxFQUFrRTtBQUNsRSxRQUFJNkQsS0FBSyxHQUFHLENBQVo7O0FBQ0EsU0FBSyxJQUFJckIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEUsT0FBTCxDQUFhdUUsUUFBYixDQUFzQkMsTUFBMUMsRUFBa0RGLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBSSxLQUFLdEUsT0FBTCxDQUFhdUUsUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ4QixJQUF6QixJQUFpQ3VCLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQWxELEVBQTBEO0FBQ3REa0IsUUFBQUEsS0FBSztBQUNSO0FBQ0o7O0FBRUQsUUFBSUEsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixVQUFJQyxRQUFRLEdBQUc5RixFQUFFLENBQUMrRixXQUFILENBQWUsS0FBSzNGLFdBQXBCLENBQWY7QUFDQTBGLE1BQUFBLFFBQVEsQ0FBQzdCLE1BQVQsR0FBa0IsS0FBSy9ELE9BQXZCO0FBQ0E0RixNQUFBQSxRQUFRLENBQUN4RCxNQUFULEdBQWtCLElBQWxCO0FBQ0F3RCxNQUFBQSxRQUFRLENBQUM5QyxJQUFULGFBQW1CdUIsR0FBRyxDQUFDb0IsUUFBSixDQUFhaEIsTUFBaEM7QUFDQSxXQUFLekMsUUFBTCxDQUFjNEQsUUFBUSxDQUFDOUMsSUFBdkIsSUFBK0I7QUFDM0JvQixRQUFBQSxHQUFHLEVBQUUsS0FBS3FCLFFBQUwsQ0FBY2xCLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYUMsT0FBM0IsRUFBb0NyQixHQUFHLENBQUNvQixRQUFKLENBQWFoQixNQUFqRCxFQUF5RHFCLFlBRG5DO0FBRTNCbEYsUUFBQUEsSUFBSSxFQUFFeUQsR0FBRyxDQUFDb0IsUUFBSixDQUFhQztBQUZRLE9BQS9CO0FBSUEsVUFBSUssUUFBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLEtBQUtWLFFBQUwsQ0FBY2xCLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYUMsT0FBM0IsRUFBb0NyQixHQUFHLENBQUNvQixRQUFKLENBQWFoQixNQUFqRCxFQUF5RHlCLFdBQXpELElBQXdFbkIsSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS0YsYUFBMUYsQ0FBRCxJQUE2RyxJQUF4SCxDQUFmO0FBQ0EsV0FBSy9DLFFBQUwsQ0FBY3NDLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQTNCLElBQXFDLEVBQXJDO0FBQ0EsV0FBSzFDLFFBQUwsQ0FBY3NDLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQTNCLEVBQW1DMEIsT0FBbkMsR0FBNkNKLFFBQTdDO0FBQ0EsV0FBS2hFLFFBQUwsQ0FBY3NDLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQTNCLEVBQW1DMkIsU0FBbkMsR0FBK0NMLFFBQS9DO0FBQ0EsV0FBSzlELE9BQUwsQ0FBYW9DLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQTFCLElBQW9DSixHQUFHLENBQUNvQixRQUFKLENBQWF4RCxPQUFqRDtBQUNBMkQsTUFBQUEsUUFBUSxDQUFDUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxZQUFyQyxDQUFrRHhHLEVBQUUsQ0FBQ0MsS0FBckQsRUFBNER3RyxNQUE1RCxHQUFxRSxLQUFLaEIsUUFBTCxDQUFjbEIsR0FBRyxDQUFDb0IsUUFBSixDQUFhQyxPQUEzQixFQUFvQ3JCLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQWpELEVBQXlEK0IsTUFBOUg7QUFDQVosTUFBQUEsUUFBUSxDQUFDUyxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxZQUFsQyxDQUErQ3hHLEVBQUUsQ0FBQ0MsS0FBbEQsRUFBeUR3RyxNQUF6RCxHQUFrRWxDLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQS9FO0FBQ0EsV0FBS1UsVUFBTCxHQUFrQjFGLE1BQU0sQ0FBQ21ELFNBQVAsQ0FBaUJ3QyxVQUFuQztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0JPLFFBQWhCLEVBQTBCLEtBQUtULFVBQUwsQ0FBZ0JkLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYWhCLE1BQTdCLENBQTFCOztBQUVBLFVBQUksS0FBS0csWUFBTCxDQUFrQlAsR0FBRyxDQUFDb0IsUUFBSixDQUFhQyxPQUEvQixFQUF3Q2Usb0JBQXhDLElBQWdFaEgsTUFBTSxDQUFDMEQsSUFBUCxDQUFZMEIsR0FBWixDQUFnQixNQUFoQixDQUFoRSxJQUEyRixDQUFDcEYsTUFBTSxDQUFDMEQsSUFBUCxDQUFZQyxTQUFaLEVBQWhHLEVBQXlIO0FBQ3JId0MsUUFBQUEsUUFBUSxDQUFDUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQSxjQUFyQyxDQUFvRCxPQUFwRCxFQUE2RGpFLE1BQTdELEdBQXNFLElBQXRFO0FBQ0F3RCxRQUFBQSxRQUFRLENBQUNTLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNDLFlBQXJDLENBQWtEeEcsRUFBRSxDQUFDNEcsTUFBckQsRUFBNkRDLE9BQTdELEdBQXVFLEtBQXZFO0FBQ0gsT0FIRCxNQUdPO0FBQ0hmLFFBQUFBLFFBQVEsQ0FBQ1MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0EsY0FBckMsQ0FBb0QsZ0JBQXBELEVBQXNFQyxZQUF0RSxDQUFtRnhHLEVBQUUsQ0FBQzRHLE1BQXRGLEVBQThGRSxXQUE5RixHQUE0RyxLQUFLdEcsY0FBakg7QUFDSDtBQUNKOztBQUVELFNBQUssSUFBSWdFLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsS0FBS3RFLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixFQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUksS0FBS3RFLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JELEVBQXRCLEVBQXlCeEIsSUFBekIsSUFBaUN1QixHQUFHLENBQUNvQixRQUFKLENBQWFoQixNQUFsRCxFQUEwRDtBQUN0RCxZQUFJc0IsU0FBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDNUIsR0FBRyxDQUFDb0IsUUFBSixDQUFhUyxXQUFiLElBQTRCbkIsSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS0YsYUFBOUMsQ0FBRCxJQUFpRSxJQUE1RSxDQUFmOztBQUNBLGFBQUsvQyxRQUFMLENBQWMsS0FBSy9CLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JELEVBQXRCLEVBQXlCeEIsSUFBdkMsRUFBNkNxRCxPQUE3QyxHQUF1REosU0FBdkQ7QUFDQSxhQUFLaEUsUUFBTCxDQUFjLEtBQUsvQixPQUFMLENBQWF1RSxRQUFiLENBQXNCRCxFQUF0QixFQUF5QnhCLElBQXZDLEVBQTZDc0QsU0FBN0MsR0FBeURMLFNBQXpEO0FBQ0EsYUFBSzlELE9BQUwsQ0FBYSxLQUFLakMsT0FBTCxDQUFhdUUsUUFBYixDQUFzQkQsRUFBdEIsRUFBeUJ4QixJQUF0QyxJQUE4Q3VCLEdBQUcsQ0FBQ29CLFFBQUosQ0FBYXhELE9BQTNEO0FBQ0EsYUFBS2pDLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JELEVBQXRCLEVBQXlCK0IsY0FBekIsQ0FBd0MsV0FBeEMsRUFBcURDLFlBQXJELENBQWtFeEcsRUFBRSxDQUFDQyxLQUFyRSxFQUE0RXdHLE1BQTVFLEdBQXFGbEMsR0FBRyxDQUFDb0IsUUFBSixDQUFhZSxNQUFsRztBQUNIO0FBQ0o7O0FBRUQsU0FBS0ssVUFBTDtBQUNILEdBdEttQjtBQXdLcEI7QUFDQTFDLEVBQUFBLFFBektvQixzQkF5S1Q7QUFDUCxTQUFLb0IsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUt1QixRQUFMLEdBQWdCLEVBQWhCOztBQUVBLFNBQUssSUFBSUMsR0FBVCxJQUFnQnRILE1BQU0sQ0FBQ21ELFNBQVAsQ0FBaUI0QyxRQUFqQixDQUEwQixLQUFLMUQsUUFBL0IsQ0FBaEIsRUFBMEQ7QUFDdEQsV0FBS3lELFFBQUwsQ0FBY3lCLElBQWQsQ0FBbUJ2SCxNQUFNLENBQUNtRCxTQUFQLENBQWlCNEMsUUFBakIsQ0FBMEIsS0FBSzFELFFBQS9CLEVBQXlDaUYsR0FBekMsQ0FBbkI7QUFDSDs7QUFFRCxTQUFLeEIsUUFBTCxDQUFjMEIsSUFBZCxDQUFtQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUN6QixhQUFPRCxDQUFDLENBQUN4QixPQUFGLEdBQVl5QixDQUFDLENBQUN6QixPQUFyQjtBQUNILEtBRkQ7QUFJQSxTQUFLUCxVQUFMLEdBQWtCMUYsTUFBTSxDQUFDbUQsU0FBUCxDQUFpQndDLFVBQW5DOztBQUNBLFFBQUksQ0FBQyxLQUFLRyxRQUFWLEVBQW9CO0FBQ2hCO0FBQ0g7O0FBRUQsU0FBSyxJQUFJZCxNQUFULElBQW1CLEtBQUtjLFFBQXhCLEVBQWtDO0FBQzlCLFVBQUksQ0FBQyxLQUFLQSxRQUFMLENBQWNkLE1BQWQsQ0FBTCxFQUE0Qjs7QUFDNUIsV0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0RSxPQUFMLENBQWFvSCxhQUFqQyxFQUFnRDlDLENBQUMsRUFBakQsRUFBcUQ7QUFDakQsWUFBSSxLQUFLdEUsT0FBTCxDQUFhdUUsUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ4QixJQUF6QixJQUFpQyxLQUFLeUMsUUFBTCxDQUFjZCxNQUFkLEVBQXNCQSxNQUEzRCxFQUFtRTtBQUMvRDtBQUNIO0FBQ0o7O0FBQ0QsVUFBSW1CLFFBQVEsR0FBRzlGLEVBQUUsQ0FBQytGLFdBQUgsQ0FBZSxLQUFLM0YsV0FBcEIsQ0FBZjtBQUVBMEYsTUFBQUEsUUFBUSxDQUFDN0IsTUFBVCxHQUFrQixLQUFLL0QsT0FBdkI7QUFDQTRGLE1BQUFBLFFBQVEsQ0FBQ3hELE1BQVQsR0FBa0IsS0FBbEI7QUFDQXdELE1BQUFBLFFBQVEsQ0FBQzlDLElBQVQsYUFBbUIsS0FBS3lDLFFBQUwsQ0FBY2QsTUFBZCxFQUFzQkEsTUFBekM7QUFDQSxXQUFLekMsUUFBTCxDQUFjNEQsUUFBUSxDQUFDOUMsSUFBdkIsSUFBK0I7QUFDM0JvQixRQUFBQSxHQUFHLEVBQUUsS0FBS3FCLFFBQUwsQ0FBY2QsTUFBZCxFQUFzQnFCLFlBREE7QUFFM0JsRixRQUFBQSxJQUFJLEVBQUUsS0FBSzJFLFFBQUwsQ0FBY2QsTUFBZCxFQUFzQmlCO0FBRkQsT0FBL0I7QUFJQSxXQUFLb0IsUUFBTCxDQUFjckMsTUFBZCxJQUF3Qm1CLFFBQVEsQ0FBQ1MsY0FBVCxDQUF3QixPQUF4QixFQUFpQ0MsWUFBakMsQ0FBOEN4RyxFQUFFLENBQUNDLEtBQWpELENBQXhCO0FBRUEsVUFBSXNILEdBQUcsR0FBRyxLQUFLOUIsUUFBTCxDQUFjZCxNQUFkLEVBQXNCQSxNQUF0QixDQUE2QjZDLFFBQTdCLEVBQVY7QUFDQTFCLE1BQUFBLFFBQVEsQ0FBQ1MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0MsWUFBbEMsQ0FBK0N4RyxFQUFFLENBQUNDLEtBQWxELEVBQXlEd0csTUFBekQsR0FBa0VjLEdBQUcsQ0FBQzdDLE1BQUosR0FBYSxDQUFiLEdBQWlCNkMsR0FBRyxDQUFDRSxNQUFKLENBQVdGLEdBQUcsQ0FBQzdDLE1BQUosR0FBYSxDQUF4QixDQUFqQixHQUE4QzZDLEdBQWhIO0FBRUF6QixNQUFBQSxRQUFRLENBQUNTLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNDLFlBQXJDLENBQWtEeEcsRUFBRSxDQUFDQyxLQUFyRCxFQUE0RHdHLE1BQTVELEdBQXFFLEtBQUtoQixRQUFMLENBQWNkLE1BQWQsRUFBc0IrQixNQUEzRjtBQUNBLFVBQUlnQixNQUFNLEdBQUcvSCxNQUFNLENBQUMwRCxJQUFQLENBQVlzRSxpQkFBWixDQUE4QixLQUFLN0MsWUFBTCxDQUFrQixLQUFLVyxRQUFMLENBQWNkLE1BQWQsRUFBc0JpQixPQUF4QyxFQUFpRGdDLEtBQWpELENBQXVELENBQXZELENBQTlCLENBQWI7QUFBQSxVQUNJQyxNQUFNLEdBQUdsSSxNQUFNLENBQUMwRCxJQUFQLENBQVlzRSxpQkFBWixDQUE4QixLQUFLN0MsWUFBTCxDQUFrQixLQUFLVyxRQUFMLENBQWNkLE1BQWQsRUFBc0JpQixPQUF4QyxFQUFpRGtDLE1BQS9FLENBRGI7QUFFQWhDLE1BQUFBLFFBQVEsQ0FBQ1MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsWUFBckMsQ0FBa0R4RyxFQUFFLENBQUNDLEtBQXJELEVBQTREd0csTUFBNUQsR0FBcUVpQixNQUFNLEdBQUcsR0FBVCxHQUFlRyxNQUFwRjs7QUFDQSxVQUFJLEtBQUsvQyxZQUFMLENBQWtCLEtBQUtXLFFBQUwsQ0FBY2QsTUFBZCxFQUFzQmlCLE9BQXhDLEVBQWlEZSxvQkFBakQsSUFBeUVoSCxNQUFNLENBQUMwRCxJQUFQLENBQVkwQixHQUFaLENBQWdCLE1BQWhCLENBQXpFLElBQW9HLENBQUNwRixNQUFNLENBQUMwRCxJQUFQLENBQVlDLFNBQVosRUFBekcsRUFBa0k7QUFDOUh3QyxRQUFBQSxRQUFRLENBQUNTLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNBLGNBQXJDLENBQW9ELE9BQXBELEVBQTZEakUsTUFBN0QsR0FBc0UsSUFBdEU7QUFDQXdELFFBQUFBLFFBQVEsQ0FBQ1MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsWUFBckMsQ0FBa0R4RyxFQUFFLENBQUM0RyxNQUFyRCxFQUE2REMsT0FBN0QsR0FBdUUsS0FBdkU7QUFDSCxPQUhELE1BR087QUFDSGYsUUFBQUEsUUFBUSxDQUFDUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQSxjQUFyQyxDQUFvRCxnQkFBcEQsRUFBc0VDLFlBQXRFLENBQW1GeEcsRUFBRSxDQUFDNEcsTUFBdEYsRUFBOEZFLFdBQTlGLEdBQTRHLEtBQUt0RyxjQUFqSDtBQUNIOztBQUNELFVBQUl5RixRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsS0FBS1YsUUFBTCxDQUFjZCxNQUFkLEVBQXNCeUIsV0FBdEIsSUFBcUNuQixJQUFJLENBQUNDLEdBQUwsS0FBYSxLQUFLRixhQUF2RCxDQUFELElBQTBFLElBQXJGLENBQWY7O0FBQ0EsVUFBSWlCLFFBQVEsR0FBRyxDQUFmLEVBQWtCO0FBQ2RBLFFBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0g7O0FBQ0QsV0FBS2hFLFFBQUwsQ0FBYyxLQUFLd0QsUUFBTCxDQUFjZCxNQUFkLEVBQXNCQSxNQUFwQyxJQUE4QyxFQUE5QztBQUNBLFdBQUsxQyxRQUFMLENBQWMsS0FBS3dELFFBQUwsQ0FBY2QsTUFBZCxFQUFzQkEsTUFBcEMsRUFBNEMwQixPQUE1QyxHQUFzREosUUFBdEQ7QUFDQSxXQUFLaEUsUUFBTCxDQUFjLEtBQUt3RCxRQUFMLENBQWNkLE1BQWQsRUFBc0JBLE1BQXBDLEVBQTRDMkIsU0FBNUMsR0FBd0RMLFFBQXhEO0FBQ0EsV0FBSzlELE9BQUwsQ0FBYSxLQUFLc0QsUUFBTCxDQUFjZCxNQUFkLEVBQXNCQSxNQUFuQyxJQUE2QyxLQUFLYyxRQUFMLENBQWNkLE1BQWQsRUFBc0J4QyxPQUFuRTtBQUNBLFVBQUksS0FBS3NELFFBQUwsQ0FBY2QsTUFBZCxFQUFzQjFELE1BQXRCLElBQWdDdEIsTUFBTSxDQUFDaUQsUUFBUCxDQUFnQm1GLEtBQXBELEVBQTJEO0FBQzNELFdBQUt4QyxVQUFMLENBQWdCTyxRQUFoQixFQUEwQixLQUFLVCxVQUFMLENBQWdCLEtBQUtJLFFBQUwsQ0FBY2QsTUFBZCxFQUFzQkEsTUFBdEMsQ0FBMUI7QUFDSDs7QUFFRGhGLElBQUFBLE1BQU0sQ0FBQzRELEtBQVAsQ0FBYXlFLGNBQWIsQ0FBNEIsSUFBNUIsRUFBa0MsS0FBSzlILE9BQXZDLEVBQWdELElBQWhELEVBQXNELElBQXREO0FBRUEsU0FBSzZHLFVBQUw7QUFDSCxHQXhPbUI7QUEwT3BCO0FBQ0FrQixFQUFBQSxRQTNPb0Isb0JBMk9YQyxLQTNPVyxFQTJPSjtBQUNaLFdBQVFDLE1BQU0sQ0FBQ0QsS0FBRCxDQUFOLENBQWNFLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBRCxDQUF5QlosUUFBekIsRUFBUDtBQUNILEdBN09tQjtBQStPcEI7QUFDQVQsRUFBQUEsVUFoUG9CLHdCQWdQUDtBQUFBOztBQUNULFNBQUt0RSxVQUFMO0FBQ0EsU0FBSzRGLFVBQUwsR0FBa0JDLFdBQVcsQ0FBQyxZQUFNO0FBQ2hDLE1BQUEsTUFBSSxDQUFDQyxTQUFMO0FBQ0gsS0FGNEIsRUFFMUIsSUFGMEIsQ0FBN0I7QUFJQSxTQUFLQSxTQUFMO0FBQ0gsR0F2UG1CO0FBeVBwQkEsRUFBQUEsU0F6UG9CLHVCQXlQUjtBQUNSLFNBQUssSUFBSS9ELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3RFLE9BQUwsQ0FBYXVFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUlHLE1BQU0sR0FBRyxLQUFLekUsT0FBTCxDQUFhdUUsUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ4QixJQUF0QztBQUNBLFdBQUtmLFFBQUwsQ0FBYzBDLE1BQWQsRUFBc0IwQixPQUF0QixJQUFpQyxDQUFqQzs7QUFDQSxVQUFJLEtBQUtwRSxRQUFMLENBQWMwQyxNQUFkLEVBQXNCMEIsT0FBdEIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDbkMsYUFBS3BFLFFBQUwsQ0FBYzBDLE1BQWQsRUFBc0IwQixPQUF0QixHQUFnQyxDQUFoQztBQUNIOztBQUVELFVBQUlsRSxPQUFPLEdBQUcsS0FBS0EsT0FBTCxDQUFhd0MsTUFBYixDQUFkO0FBQ0EsVUFBSTZELFVBQVUsR0FBR3RDLElBQUksQ0FBQ3VDLEtBQUwsQ0FBVyxLQUFLeEcsUUFBTCxDQUFjMEMsTUFBZCxFQUFzQjBCLE9BQWpDLENBQWpCO0FBRUEsVUFBSXFDLE9BQU8sR0FBR3RKLFNBQVMsQ0FBQytDLE9BQU8sR0FBQyxDQUFULENBQXZCO0FBQ0EsVUFBSXdHLE9BQU8sR0FBRyxLQUFLekksT0FBTCxDQUFhdUUsUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUIrQixjQUF6QixDQUF3QyxPQUF4QyxFQUFpREMsWUFBakQsQ0FBOER4RyxFQUFFLENBQUNDLEtBQWpFLENBQWQ7QUFDQTBJLE1BQUFBLE9BQU8sQ0FBQ3pILElBQVIsQ0FBYTBILEtBQWIsR0FBcUIsS0FBS3hHLE1BQUwsQ0FBWUQsT0FBWixDQUFyQjs7QUFFQSxVQUFHQSxPQUFPLElBQUksQ0FBZCxFQUFpQjtBQUNid0csUUFBQUEsT0FBTyxDQUFDbEMsTUFBUixhQUFvQmlDLE9BQXBCLGdCQUFpQ0YsVUFBakM7O0FBQ0EsWUFBR0EsVUFBVSxJQUFJLENBQWpCLEVBQW9CO0FBQ2hCRyxVQUFBQSxPQUFPLENBQUN6SCxJQUFSLENBQWEwSCxLQUFiLEdBQXFCLEtBQUt4RyxNQUFMLENBQVksQ0FBWixDQUFyQjtBQUNIO0FBQ0osT0FMRCxNQU1LO0FBQ0R1RyxRQUFBQSxPQUFPLENBQUNsQyxNQUFSLEdBQWlCaUMsT0FBakI7QUFDSDtBQUNKO0FBQ0osR0FsUm1CO0FBb1JwQm5ELEVBQUFBLFVBcFJvQixzQkFvUlRyRSxJQXBSUyxFQW9SSDJILE1BcFJHLEVBb1JLO0FBQ3JCLFFBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1Q7QUFDSDs7QUFFRCxRQUFJQyxLQUFLLEdBQUcsQ0FBWjtBQUNBLFFBQUlDLE9BQUo7QUFFQSxRQUFJQyxPQUFPLEdBQUc5SCxJQUFJLENBQUNxRixjQUFMLENBQW9CLFVBQXBCLENBQWQ7QUFDQXlDLElBQUFBLE9BQU8sQ0FBQ3pHLGtCQUFSO0FBRUEsUUFBSTBHLE1BQU0sR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQWI7O0FBQ0EsUUFBSUosTUFBTSxDQUFDbkUsTUFBUCxHQUFnQixFQUFwQixFQUF3QjtBQUNwQm9FLE1BQUFBLEtBQUssR0FBR0QsTUFBTSxDQUFDbkUsTUFBUCxHQUFnQixFQUF4QjtBQUNIOztBQUVELFFBQUltQixLQUFLLEdBQUcsQ0FBWjs7QUFDQSxTQUFLLElBQUlyQixDQUFDLEdBQUdzRSxLQUFiLEVBQW9CdEUsQ0FBQyxHQUFHcUUsTUFBTSxDQUFDbkUsTUFBL0IsRUFBdUNGLENBQUMsRUFBeEMsRUFBNEM7QUFDeEN1RSxNQUFBQSxPQUFPLEdBQUcvSSxFQUFFLENBQUMrRixXQUFILENBQWUsS0FBSzFGLFdBQXBCLENBQVY7O0FBQ0EsVUFBSXdJLE1BQU0sQ0FBQ3JFLENBQUQsQ0FBTixJQUFhLENBQWpCLEVBQW9CO0FBQ2hCdUUsUUFBQUEsT0FBTyxDQUFDdkMsWUFBUixDQUFxQnhHLEVBQUUsQ0FBQzRHLE1BQXhCLEVBQWdDRSxXQUFoQyxHQUE4QyxLQUFLeEcsWUFBTCxDQUFrQjRJLGFBQWxCLENBQWdDLFlBQWhDLENBQTlDO0FBQ0FELFFBQUFBLE1BQU0sQ0FBQyxDQUFELENBQU47QUFDSCxPQUhELE1BR087QUFDSEYsUUFBQUEsT0FBTyxDQUFDdkMsWUFBUixDQUFxQnhHLEVBQUUsQ0FBQzRHLE1BQXhCLEVBQWdDRSxXQUFoQyxHQUE4QyxLQUFLeEcsWUFBTCxDQUFrQjRJLGFBQWxCLENBQWdDL0osVUFBVSxDQUFDMEosTUFBTSxDQUFDckUsQ0FBRCxDQUFQLENBQTFDLENBQTlDO0FBQ0FxRSxRQUFBQSxNQUFNLENBQUNyRSxDQUFELENBQU4sR0FBWSxDQUFaLElBQWlCLENBQWpCLEdBQXFCeUUsTUFBTSxDQUFDLENBQUQsQ0FBTixFQUFyQixHQUFtQ0EsTUFBTSxDQUFDLENBQUQsQ0FBTixFQUFuQztBQUNBOUosUUFBQUEsVUFBVSxDQUFDMEosTUFBTSxDQUFDckUsQ0FBRCxDQUFQLENBQVYsSUFBeUIsY0FBekIsR0FBMEN5RSxNQUFNLENBQUMsQ0FBRCxDQUFOLEVBQTFDLEdBQXdEQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEVBQXhEO0FBQ0g7O0FBRUQsV0FBS0UsV0FBTCxDQUFpQkosT0FBakIsRUFBMEJGLE1BQU0sQ0FBQ3JFLENBQUQsQ0FBaEM7QUFDQXVFLE1BQUFBLE9BQU8sQ0FBQzlFLE1BQVIsR0FBaUIrRSxPQUFqQjtBQUNBRCxNQUFBQSxPQUFPLENBQUNLLE9BQVIsR0FBa0IsQ0FBbEI7QUFDQUwsTUFBQUEsT0FBTyxDQUFDekcsTUFBUixHQUFpQixJQUFqQjtBQUVBLFVBQUkrRyxLQUFLLEdBQUdySixFQUFFLENBQUNzSixTQUFILENBQWFwRCxJQUFJLENBQUN1QyxLQUFMLENBQVc1QyxLQUFLLEtBQUcsRUFBbkIsSUFBeUIsSUFBdEMsQ0FBWjtBQUNBLFVBQUkwRCxNQUFNLEdBQUd2SixFQUFFLENBQUN1SixNQUFILENBQVUsSUFBVixDQUFiO0FBQ0FSLE1BQUFBLE9BQU8sQ0FBQ1MsU0FBUixDQUFrQnhKLEVBQUUsQ0FBQ3lKLFFBQUgsQ0FBWUosS0FBWixFQUFtQkUsTUFBbkIsQ0FBbEI7QUFDSDs7QUFFRCxRQUFJRyxPQUFPLEdBQUcsRUFBZDs7QUFDQSxTQUFLLElBQUlsRixHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxJQUFJLENBQXJCLEVBQXdCQSxHQUFDLEVBQXpCLEVBQTZCO0FBQ3pCLFVBQUltRixhQUFhLEdBQUl6RCxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDMEMsTUFBTSxDQUFDbkUsTUFBUCxHQUFnQixFQUFoQixHQUFxQnVFLE1BQU0sQ0FBQ3pFLEdBQUQsQ0FBTixHQUFZLEVBQWpDLEdBQXNDeUUsTUFBTSxDQUFDekUsR0FBRCxDQUFOLEdBQVlxRSxNQUFNLENBQUNuRSxNQUExRCxJQUFvRSxHQUEvRSxDQUFyQjs7QUFDQSxVQUFHRixHQUFDLElBQUUsQ0FBSCxJQUFRQSxHQUFDLElBQUUsQ0FBZCxFQUFpQjtBQUNibUYsUUFBQUEsYUFBYSxHQUFJLE1BQU1ELE9BQU8sQ0FBQyxDQUFELENBQWIsR0FBbUJBLE9BQU8sQ0FBQ2xGLEdBQUMsR0FBQyxDQUFILENBQTNDO0FBQ0g7O0FBQ0RrRixNQUFBQSxPQUFPLENBQUNsRixHQUFELENBQVAsR0FBYW1GLGFBQWI7QUFDQXpJLE1BQUFBLElBQUksQ0FBQ3FGLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEI5QixRQUE5QixDQUF1Q0QsR0FBdkMsRUFBMENnQyxZQUExQyxDQUF1RHhHLEVBQUUsQ0FBQ0MsS0FBMUQsRUFBaUV3RyxNQUFqRSxhQUE2RWtELGFBQTdFO0FBQ0g7QUFDSixHQW5VbUI7QUFxVXBCO0FBQ0FSLEVBQUFBLFdBdFVvQix1QkFzVVJqSSxJQXRVUSxFQXNVRjBJLFFBdFVFLEVBc1VRO0FBQ3hCLFFBQUlDLFdBQVcsR0FBR0QsUUFBUSxDQUFDcEMsUUFBVCxFQUFsQjtBQUNBLFFBQUkzQixLQUFLLEdBQUdnRSxXQUFXLENBQUNuRixNQUF4Qjs7QUFDQSxTQUFLLElBQUlGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxQixLQUFwQixFQUEyQnJCLENBQUMsRUFBNUIsRUFBZ0M7QUFDNUIsVUFBSXNGLE9BQU8sR0FBRyxJQUFJOUosRUFBRSxDQUFDRyxJQUFQLEVBQWQ7QUFDQTJKLE1BQUFBLE9BQU8sQ0FBQ0MsWUFBUixDQUFxQi9KLEVBQUUsQ0FBQzRHLE1BQXhCLEVBQWdDRSxXQUFoQyxHQUE4QyxLQUFLeEcsWUFBTCxDQUFrQjBKLGNBQWxCLENBQWlDLFlBQVlILFdBQVcsQ0FBQ3JGLENBQUQsQ0FBeEQsQ0FBOUM7QUFDQXNGLE1BQUFBLE9BQU8sQ0FBQzdGLE1BQVIsR0FBaUIvQyxJQUFJLENBQUNxRixjQUFMLENBQW9CLFVBQXBCLENBQWpCO0FBQ0g7QUFDSixHQTlVbUI7QUFnVnBCO0FBQ0E5RCxFQUFBQSxVQWpWb0Isd0JBaVZQO0FBQ1QsUUFBSSxLQUFLNEYsVUFBTCxJQUFtQixJQUF2QixFQUE2QjtBQUN6QjRCLE1BQUFBLFlBQVksQ0FBQyxLQUFLNUIsVUFBTixDQUFaO0FBQ0g7O0FBQ0QsU0FBS0EsVUFBTCxHQUFrQixJQUFsQjtBQUNILEdBdFZtQjtBQXdWcEI2QixFQUFBQSxZQXhWb0IsMEJBd1ZMO0FBQ1h2SyxJQUFBQSxNQUFNLENBQUM0RCxLQUFQLENBQWE0RyxlQUFiLENBQTZCLEtBQUtDLFVBQWxDLEVBQThDekssTUFBTSxDQUFDMEQsSUFBUCxDQUFZMEIsR0FBWixDQUFnQixTQUFoQixDQUE5QztBQUNILEdBMVZtQjtBQTRWcEJsRCxFQUFBQSxjQTVWb0IsNEJBNFZIO0FBQ2IsUUFBSXdJLElBQUksR0FBRzFLLE1BQU0sQ0FBQzBELElBQVAsQ0FBWTBCLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBWDtBQUNBLFNBQUtoRixTQUFMLENBQWUwRyxNQUFmLEdBQXdCOUcsTUFBTSxDQUFDMEQsSUFBUCxDQUFZaUgsUUFBWixDQUFxQkQsSUFBckIsQ0FBeEI7QUFDSCxHQS9WbUI7QUFpV3BCRSxFQUFBQSxZQWpXb0IsMEJBaVdMLENBRWQsQ0FuV21CO0FBcVdwQkMsRUFBQUEsU0FyV29CLHFCQXFXVnZKLE1BcldVLEVBcVdGO0FBQ2QsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0gsR0F2V21CO0FBeVdwQm1DLEVBQUFBLGNBeldvQiw0QkF5V0g7QUFDYnpELElBQUFBLE1BQU0sQ0FBQzRELEtBQVAsQ0FBYWtILGVBQWIsQ0FBNkIsVUFBN0I7QUFDSCxHQTNXbUI7QUE2V3BCdEgsRUFBQUEsYUE3V29CLDJCQTZXSjtBQUNaeEQsSUFBQUEsTUFBTSxDQUFDNEQsS0FBUCxDQUFhbUgsUUFBYixDQUFzQixFQUF0QjtBQUNILEdBL1dtQjtBQWlYcEI5SSxFQUFBQSxVQWpYb0Isd0JBaVhQO0FBQ1RqQyxJQUFBQSxNQUFNLENBQUNtRCxTQUFQLENBQWlCNkgsV0FBakI7QUFDQSxTQUFLQyxNQUFMO0FBQ0gsR0FwWG1CO0FBc1hwQjNILEVBQUFBLFVBdFhvQix3QkFzWFA7QUFDVCxRQUFJTSxLQUFLLEdBQUc1RCxNQUFNLENBQUM0RCxLQUFQLENBQWFzSCxTQUFiLENBQXVCLEtBQUtqSyxPQUE1QixDQUFaO0FBQ0EyQyxJQUFBQSxLQUFLLENBQUNwQyxNQUFOLEdBQWUsRUFBZjtBQUNILEdBelhtQjtBQTJYcEIrQixFQUFBQSxZQTNYb0IsMEJBMlhMO0FBQ1gsUUFBSUssS0FBSyxHQUFHNUQsTUFBTSxDQUFDNEQsS0FBUCxDQUFhc0gsU0FBYixDQUF1QixLQUFLbkssU0FBNUIsQ0FBWjtBQUNBNkMsSUFBQUEsS0FBSyxDQUFDcEMsTUFBTixHQUFlLEVBQWY7QUFDSCxHQTlYbUI7QUFnWXBCO0FBQ0FXLEVBQUFBLGFBallvQiwyQkFpWUo7QUFDWm5DLElBQUFBLE1BQU0sQ0FBQ3lCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixxQkFBbEIsRUFBeUMsS0FBS3dELGNBQTlDLEVBQThELElBQTlEO0FBQ0FsRixJQUFBQSxNQUFNLENBQUN5QixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsaUJBQWxCLEVBQXFDLEtBQUttRSxVQUExQyxFQUFzRCxJQUF0RDtBQUNBN0YsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCLGlCQUFsQixFQUFxQyxLQUFLK0QsVUFBMUMsRUFBc0QsSUFBdEQ7QUFDQXpGLElBQUFBLE1BQU0sQ0FBQ3lCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixtQkFBbEIsRUFBdUMsS0FBS2lELFlBQTVDLEVBQTBELElBQTFEO0FBQ0gsR0F0WW1CO0FBd1lwQjtBQUNBNUIsRUFBQUEsZUF6WW9CLDZCQXlZRjtBQUNkL0MsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQixxQkFBbkIsRUFBMEMsSUFBMUM7QUFDQW5MLElBQUFBLE1BQU0sQ0FBQ3lCLE9BQVAsQ0FBZTBKLEdBQWYsQ0FBbUIsaUJBQW5CLEVBQXNDLElBQXRDO0FBQ0FuTCxJQUFBQSxNQUFNLENBQUN5QixPQUFQLENBQWUwSixHQUFmLENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QztBQUNBbkwsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQixtQkFBbkIsRUFBd0MsSUFBeEM7QUFDSCxHQTlZbUI7QUFnWnBCQyxFQUFBQSxHQWhab0IsZUFnWmhCOUQsR0FoWmdCLEVBZ1pYaUIsS0FoWlcsRUFnWko7QUFDWixTQUFLakIsR0FBTCxJQUFZaUIsS0FBWjtBQUNILEdBbFptQjtBQW9acEJuRCxFQUFBQSxHQXBab0IsZUFvWmhCa0MsR0FwWmdCLEVBb1pYO0FBQ0wsV0FBTyxLQUFLQSxHQUFMLENBQVA7QUFDSCxHQXRabUI7QUF3WnBCK0QsRUFBQUEsU0F4Wm9CLHVCQXdaUjtBQUNSckwsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQnhKLE9BQU8sQ0FBQ0MsRUFBUixDQUFXQyxlQUE5QixFQUE4QyxJQUE5QztBQUNBN0IsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQnhKLE9BQU8sQ0FBQ0MsRUFBUixDQUFXRyxlQUE5QixFQUE4QyxJQUE5QztBQUNBL0IsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQixZQUFuQixFQUFpQyxJQUFqQztBQUNBbkwsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFlMEosR0FBZixDQUFtQixnQkFBbkIsRUFBb0MsSUFBcEM7QUFDQSxTQUFLckksVUFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDSDtBQS9abUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGR6cF9yZXN1bHQgPSB7XHJcbiAgICAxOiBcImltZ19ob25nZGlhblwiLCAyOiBcImltZ19oZWlkaWFuXCIsIDM6IFwiaW1nX2hvbmdkaWFuXCIsIDQ6IFwiaW1nX2hlaWRpYW5cIiwgNTogXCJpbWdfaG9uZ2RpYW5cIiwgNjogXCJpbWdfaGVpZGlhblwiLCA3OiBcImltZ19ob25nZGlhblwiLCA4OiBcImltZ19oZWlkaWFuXCIsIDk6IFwiaW1nX2hvbmdkaWFuXCIsIDEwOiBcImltZ19oZWlkaWFuXCIsXHJcbiAgICAxMTogXCJpbWdfaGVpZGlhblwiLCAxMjogXCJpbWdfaG9uZ2RpYW5cIiwgMTM6IFwiaW1nX2hlaWRpYW5cIiwgMTQ6IFwiaW1nX2hvbmdkaWFuXCIsIDE1OiBcImltZ19oZWlkaWFuXCIsIDE2OiBcImltZ19ob25nZGlhblwiLCAxNzogXCJpbWdfaGVpZGlhblwiLCAxODogXCJpbWdfaG9uZ2RpYW5cIiwgMTk6IFwiaW1nX2hvbmdkaWFuXCIsIDIwOiBcImltZ19oZWlkaWFuXCIsIDIxOiBcImltZ19ob25nZGlhblwiLFxyXG4gICAgMjI6IFwiaW1nX2hlaWRpYW5cIiwgMjM6IFwiaW1nX2hvbmdkaWFuXCIsIDI0OiBcImltZ19oZWlkaWFuXCIsIDI1OiBcImltZ19ob25nZGlhblwiLCAyNjogXCJpbWdfaGVpZGlhblwiLCAyNzogXCJpbWdfaG9uZ2RpYW5cIiwgMjg6IFwiaW1nX2hlaWRpYW5cIiwgMjk6IFwiaW1nX2hlaWRpYW5cIiwgMzA6IFwiaW1nX2hvbmdkaWFuXCIsIDMxOiBcImltZ19oZWlkaWFuXCIsIDMyOiBcImltZ19ob25nZGlhblwiLFxyXG4gICAgMzM6IFwiaW1nX2hlaWRpYW5cIiwgMzQ6IFwiaW1nX2hvbmdkaWFuXCIsIDM1OiBcImltZ19oZWlkaWFuXCIsIDM2OiBcImltZ19ob25nZGlhblwiXHJcbn0gXHJcblxyXG5jb25zdCBzdGF0ZV9BcnIgPSBbXCLlh4blpIfkuK1cIiwgXCLkuIvms6jkuK1cIiwgXCLnu5PnrpfkuK1cIl07XHJcblxyXG5cclxuXHJcbmNvbnN0IHRvZ2dsZV9tYXAgPSB7XHJcbiAgICB0b2dnbGVfYmFzZTogMSxcclxuICAgIHRvZ2dsZV9lbGVtZW50YXJ5OiAyLFxyXG4gICAgdG9nZ2xlX21lZGl1bTogMyxcclxuICAgIHRvZ2dsZV9oaWdoZXI6IDQsXHJcbiAgICB0b2dnbGVfcGx1dGU6IDVcclxufVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnb2xkQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZWNvcmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZXN1bHQ6IGNjLk5vZGUsXHJcbiAgICAgICAgc3ByaXRlX0F0bGFzOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICBiYXR0bGVXYXRjaHBpYzogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgbHR0UmVjb3JkOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbHR0UnVsZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIEJHTToge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMjA7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csIHRoaXMuUm9vdE5vZGVTaG93LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSwgdGhpcy5Sb290Tm9kZUhpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwibm9kZVJlbW92ZVwiLCB0aGlzLmNsaWNrX2JhY2ssIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcy51cGRhdGV1c2VySW5mbywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLnJvb21UeXBlID0gMTtcclxuICAgICAgICB0aGlzLndhaXR0aW1lID0ge307XHJcbiAgICAgICAgdGhpcy5ub2RlSW5mbyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJvY2VzcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29sb3JzID0gW25ldyBjYy5Db2xvcigyNTUsOTYsNDcpLCBuZXcgY2MuQ29sb3IoMTM3LDIxOCwyNTUpLCBuZXcgY2MuQ29sb3IoMTQxLDIyMiwzNyksIG5ldyBjYy5Db2xvcigyMjYsMTM3LDI1NSldO1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgIH0sXHJcblxyXG4gICAgUm9vdE5vZGVTaG93KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLndhaXR0aW1lID0ge307XHJcbiAgICAgICAgdGhpcy5ub2RlSW5mbyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJvY2VzcyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBSb290Tm9kZUhpZGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcUVudGVyQXJlYSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdsR2FtZS5zY2VuZXRhZy5MVUNLVFVSTlRBQkxFO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5MVUNLVFVSTlRBQkxFKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYmFja1wiOiB0aGlzLmNsaWNrX2JhY2soKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5faGVscFwiOiB0aGlzLmNsaWNrX2hlbHAoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVjb3JkXCI6IHRoaXMuY2xpY2tfcmVjb3JkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibXljb2luSW5mb1wiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkYmdcIjogdGhpcy5jbGlja191c2VyaW5mbygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jaG9uZ3poaVwiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9lbnRlcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9zdGFydCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKGdsR2FtZS51c2VyLnN1c3BpY2lvdXMgPT0gMSAmJmdsR2FtZS51c2VyLmdhbWUgPT0gMiApIHx8IGdsR2FtZS51c2VyLmlzX2dhbWUgPT0gMiApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIFwi5oKo55qE6LSm5Y+35pWw5o2u5byC5bi477yM5pqC5pe256aB5q2i6L+b5YWl5ri45oiP77yM5aaC5pyJ55aR6Zeu77yM6K+36IGU57O75a6i5pyN77yBXCIsICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4ge30sIFwi5oiR55+l6YGT5LqGXCIsIFwi6IGU57O75a6i5pyNXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dGaWVsZFNlbGVjdGlvbkp1SHVhKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucm9vbS5yZXFNeUdhbWVTdGF0ZSh0aGlzLmdhbWVJRCwgdGhpcy5ub2RlSW5mb1tub2RlLnBhcmVudC5uYW1lXS50eXBlLCBub2RlLnBhcmVudC5uYW1lKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucmVhZHlyb29tLmVudGVySHVuZHJlZHNSb29tKG5vZGUucGFyZW50Lm5hbWUsIHRoaXMubm9kZUluZm9bbm9kZS5wYXJlbnQubmFtZV0udGFnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGxldCByb29tVHlwZSA9IHRvZ2dsZV9tYXBbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJvb21UeXBlICE9IHJvb21UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IHJvb21UeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlbGV0ZVJvb20obXNnKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uR2FtZUluZm9saXN0KG1zZykge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvVGVzdCA9IGdsR2FtZS5yZWFkeXJvb20uZ2V0KFwiZ2FtZUluZm9cIik7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVJbmZvVGVzdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZU9mZiA9IERhdGUubm93KCkgLSBtc2cuc2VydmVydGltZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uSGFuZEluZm8obXNnKSB7XHJcbiAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLCB0aGlzLnJvb21SZWNvcmRbbXNnLnJvb21pZF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblJvb21JbmZvKG1zZykge1xyXG4gICAgICAgIHRoaXMucm9vbUxpc3QgPSBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0O1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZU9mZiA9IERhdGUubm93KCkgLSBtc2cuc2VydmVydGltZTtcclxuICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSBtc2cucm9vbWRhdGEuYmV0dHlwZSAmJiB0aGlzLnJvb21UeXBlICE9PSAwKSByZXR1cm5cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWRhdGEucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVjb3JkKTtcclxuICAgICAgICAgICAgaW5mb05vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5uYW1lID0gYCR7bXNnLnJvb21kYXRhLnJvb21pZH1gO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVJbmZvW2luZm9Ob2RlLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgdGFnOiB0aGlzLnJvb21MaXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXVttc2cucm9vbWRhdGEucm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBtc2cucm9vbWRhdGEuYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGgucm91bmQoKHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW21zZy5yb29tZGF0YS5yb29taWRdID0ge307XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbWVbbXNnLnJvb21kYXRhLnJvb21pZF0uY3V0ZG93biA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW21zZy5yb29tZGF0YS5yb29taWRdLnRvdGFsdGltZSA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NbbXNnLnJvb21kYXRhLnJvb21pZF0gPSBtc2cucm9vbWRhdGEucHJvY2VzcztcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZU51bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5yb29tTGlzdFttc2cucm9vbWRhdGEuYmV0dHlwZV1bbXNnLnJvb21kYXRhLnJvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgncm9vbUlkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2cucm9vbWRhdGEucm9vbWlkO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JlY29yZChpbmZvTm9kZSwgdGhpcy5yb29tUmVjb3JkW21zZy5yb29tZGF0YS5yb29taWRdKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVJbmZvVGVzdFttc2cucm9vbWRhdGEuYmV0dHlwZV0uRW50cmFuY2VSZXN0cmljdGlvbnMgPD0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSAmJiAhZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiZmxhc2hcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfamlucnV5b3V4aVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmF0dGxlV2F0Y2hwaWM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWRhdGEucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2FpdFRpbWUgPSBNYXRoLnJvdW5kKChtc2cucm9vbWRhdGEuY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXR0aW1lW3RoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lXS5jdXRkb3duID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXR0aW1lW3RoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lXS50b3RhbHRpbWUgPSB3YWl0VGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1t0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZV0gPSBtc2cucm9vbWRhdGEucHJvY2VzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2cucm9vbWRhdGEub25saW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0Q2xvY2soKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mm7TmlrBVSVxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5sYkNsb2NrcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdFt0aGlzLnJvb21UeXBlXSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb21MaXN0LnB1c2goZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdFt0aGlzLnJvb21UeXBlXVtrZXldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucm9vbUxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5iZXR0eXBlIC0gYi5iZXR0eXBlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvb21pZCBpbiB0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yb29tTGlzdFtyb29taWRdKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaW5mb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgaW5mb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLm5hbWUgPSBgJHt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkfWA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGJDbG9ja3Nbcm9vbWlkXSA9IGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiY2xvY2tcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHIgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdyb29tSWQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0ci5sZW5ndGggPiA1ID8gc3RyLnN1YnN0cihzdHIubGVuZ3RoIC0gNSkgOiBzdHI7XHJcblxyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtaW5iZXQgKyBcIn5cIiArIG1heGJldDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5FbnRyYW5jZVJlc3RyaWN0aW9ucyA8PSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpICYmICFnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJmbGFzaFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcImltZ19qaW5ydXlvdXhpXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5iYXR0bGVXYXRjaHBpYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2FpdFRpbWUgPSBNYXRoLnJvdW5kKCh0aGlzLnJvb21MaXN0W3Jvb21pZF0uY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgIGlmICh3YWl0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHdhaXRUaW1lID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWRdID0ge307XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbWVbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0uY3V0ZG93biA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWRdLnRvdGFsdGltZSA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0gPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2VzcztcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5nYW1laWQgPT0gZ2xHYW1lLnNjZW5ldGFnLlFIQkpMKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsIHRoaXMuY29udGVudCAsMC4wMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRDbG9jaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+ahjOmdouaVsOaNrueahOaYvuekulxyXG4gICAgZ2V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5pi+56S65YCS6K6h5pe2XHJcbiAgICBzdGFydENsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc2V0VGltZU91dCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2xvY2soKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG5cclxuICAgICAgICB0aGlzLnNob3dDbG9jaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93Q2xvY2soKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvb21pZCA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW3Jvb21pZF0uY3V0ZG93biAtPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0dGltZVtyb29taWRdLmN1dGRvd24gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXR0aW1lW3Jvb21pZF0uY3V0ZG93biA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9jZXNzID0gdGhpcy5wcm9jZXNzW3Jvb21pZF07XHJcbiAgICAgICAgICAgIGxldCByZW1haW5UaW1lID0gTWF0aC5mbG9vcih0aGlzLndhaXR0aW1lW3Jvb21pZF0uY3V0ZG93bik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3pTdGF0ZSA9IHN0YXRlX0Fycltwcm9jZXNzLTFdO1xyXG4gICAgICAgICAgICBsZXQgbGJDbG9jayA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZSgnY2xvY2snKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsYkNsb2NrLm5vZGUuY29sb3IgPSB0aGlzLmNvbG9yc1twcm9jZXNzXTtcclxuXHJcbiAgICAgICAgICAgIGlmKHByb2Nlc3MgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbGJDbG9jay5zdHJpbmcgPSBgJHtzelN0YXRlfTogICR7cmVtYWluVGltZX1gO1xyXG4gICAgICAgICAgICAgICAgaWYocmVtYWluVGltZSA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGJDbG9jay5ub2RlLmNvbG9yID0gdGhpcy5jb2xvcnNbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYkNsb2NrLnN0cmluZyA9IHN6U3RhdGU7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93UmVjb3JkKG5vZGUsIHJlY29yZCkge1xyXG4gICAgICAgIGlmICghcmVjb3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBsZXQgZG90Tm9kZTtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBub2RlRG90ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKVxyXG4gICAgICAgIG5vZGVEb3QuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2UgPSBbMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgaWYgKHJlY29yZC5sZW5ndGggPiA0OCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHJlY29yZC5sZW5ndGggLSA0ODtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgcmVjb3JkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRvdE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVzdWx0KTtcclxuICAgICAgICAgICAgaWYgKHJlY29yZFtpXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2x1ZGlhbiddO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlWzRdKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1tkenBfcmVzdWx0W3JlY29yZFtpXV1dO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW2ldICUgMiA9PSAxID8gY2hhbmdlWzBdKysgOiBjaGFuZ2VbMV0rKztcclxuICAgICAgICAgICAgICAgIGR6cF9yZXN1bHRbcmVjb3JkW2ldXSA9PSBcImltZ19ob25nZGlhblwiID8gY2hhbmdlWzJdKysgOiBjaGFuZ2VbM10rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRtdWx0aXBsZShkb3ROb2RlLCByZWNvcmRbaV0pO1xyXG4gICAgICAgICAgICBkb3ROb2RlLnBhcmVudCA9IG5vZGVEb3Q7XHJcbiAgICAgICAgICAgIGRvdE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGRvdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWxheSA9IGNjLmRlbGF5VGltZShNYXRoLmZsb29yKGNvdW50KysvMTIpICogMC4xMCk7XHJcbiAgICAgICAgICAgIGxldCBmYWRlSW4gPSBjYy5mYWRlSW4oMC4xNSk7XHJcbiAgICAgICAgICAgIGRvdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGRlbGF5LCBmYWRlSW4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZXJjZW50ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDQ7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2Vfc3RyaW5nID0gIE1hdGgucm91bmQoKHJlY29yZC5sZW5ndGggPiA0OCA/IGNoYW5nZVtpXSAvIDQ4IDogY2hhbmdlW2ldIC8gcmVjb3JkLmxlbmd0aCkgKiAxMDApO1xyXG4gICAgICAgICAgICBpZihpPT0wIHx8IGk9PTIpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZV9zdHJpbmcgPSAgMTAwIC0gcGVyY2VudFs0XSAtIHBlcmNlbnRbaSsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwZXJjZW50W2ldID0gY2hhbmdlX3N0cmluZztcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNoYW5nZVwiKS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2NoYW5nZV9zdHJpbmd9JWBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5qC55o2u5YCN5pWw55SocGxpc3Tlm77pm4bmi7zmjqXmlbDlrZdcclxuICAgIHNldG11bHRpcGxlKG5vZGUsIG11bHRpcGxlKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZ0NvdW50ID0gbXVsdGlwbGUudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgY291bnQgPSBzdHJpbmdDb3VudC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLmdldFNwcml0ZUZyYW1lKFwiaW1nX2JhaVwiICsgc3RyaW5nQ291bnRbaV0pO1xyXG4gICAgICAgICAgICBuZXdOb2RlLnBhcmVudCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtdWx0aXBsZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5riF55CG5YCS6K6h5pe2XHJcbiAgICBjbGVhblRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldFRpbWVPdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZXRUaW1lT3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lT3V0ID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1VzZXJJbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UodGhpcy5QbGF5ZXJoZWFkLCBnbEdhbWUudXNlci5nZXQoXCJoZWFkVVJMXCIpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRldXNlckluZm8oKSB7XHJcbiAgICAgICAgbGV0IGNvaW4gPSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpXHJcbiAgICAgICAgdGhpcy5nb2xkQ291bnQuc3RyaW5nID0gZ2xHYW1lLnVzZXIuR29sZFRlbXAoY29pbik7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJnSW5mbygpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldEdhbWVJZChnYW1laWQpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IGdhbWVpZDtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfdXNlcmluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInVzZXJpbmZvXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19hZGRnb2xkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgzMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX2JhY2soKSB7XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFeGl0QXJlYSgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX2hlbHAoKSB7XHJcbiAgICAgICAgbGV0IHBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmx0dFJ1bGUpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19yZWNvcmQoKSB7XHJcbiAgICAgICAgbGV0IHBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmx0dFJlY29yZCk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzLm9uR2FtZUluZm9saXN0LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uUm9vbUluZm9fYXJlYVwiLCB0aGlzLm9uUm9vbUluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMub25IYW5kSW5mbywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkRlbGV0ZVJvb21fYXJlYVwiLCB0aGlzLm9uRGVsZXRlUm9vbSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5LqL5Lu26ZSA5q+BXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlJPT01fRU5URVJfU0hPVyx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwibm9kZVJlbW92ZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVVc2VyRGF0YVwiLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
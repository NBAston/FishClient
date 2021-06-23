
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/shuiguojientry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXHNodWlndW9qaWVudHJ5LmpzIl0sIm5hbWVzIjpbInRvZ2dsZV9tYXAiLCJ0b2dnbGVfYmFzZSIsInRvZ2dsZV9lbGVtZW50YXJ5IiwidG9nZ2xlX21lZGl1bSIsInRvZ2dsZV9oaWdoZXIiLCJ0b2dnbGVfcGx1dGUiLCJzdGF0ZV9BcnIiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZ29sZENvdW50IiwiY2MiLCJMYWJlbCIsImNvbnRlbnQiLCJOb2RlIiwibm9kZV9yZWNvcmQiLCJub2RlX3Jlc3VsdCIsImJhdHRsZVdhdGNocGljIiwiU3ByaXRlRnJhbWUiLCJzZ2pSdWxlIiwiUHJlZmFiIiwicHJlX3JlY29yZCIsIkJHTSIsInR5cGUiLCJBdWRpb0NsaXAiLCJzcGVjaWFsX0xpc3QiLCJjb21tb25fTGlzdCIsImJlaXNodV9MaXN0Iiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlJPT01fRU5URVJfU0hPVyIsIlJvb3ROb2RlU2hvdyIsIlJPT01fRU5URVJfSElERSIsIlJvb3ROb2RlSGlkZSIsImNsaWNrX2JhY2siLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJyb29tVHlwZSIsImNvdW5kb3dtVGltZSIsIndhaXR0aW1lIiwibm9kZUluZm8iLCJwcm9jZXNzIiwiYWN0aXZlIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJjbGVhblRpbWVyIiwidW5yZWdpc3RlckV2ZW50Iiwib25HYW1lSW5mb2xpc3QiLCJvblJvb21JbmZvIiwib25IYW5kSW5mbyIsIm9uRGVsZXRlUm9vbSIsIm9mZiIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfaGVscCIsImNsaWNrX3JlY29yZCIsImNsaWNrX2FkZGdvbGQiLCJjbGlja191c2VyaW5mbyIsInVzZXIiLCJpc1RvdXJpc3QiLCJwYW5lbCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInN1c3BpY2lvdXMiLCJnYW1lIiwiaXNfZ2FtZSIsInNob3dEaWFsb2ciLCJzaG93U2VydmljZSIsInNob3dGaWVsZFNlbGVjdGlvbkp1SHVhIiwicm9vbSIsInJlcU15R2FtZVN0YXRlIiwiZ2FtZUlEIiwicGFyZW50IiwidGhlbiIsInJlYWR5cm9vbSIsImVudGVySHVuZHJlZHNSb29tIiwidGFnIiwidXBkYXRlVUkiLCJzY2VuZXRhZyIsIlNIVUlHVU9KSSIsIm1zZyIsImkiLCJjaGlsZHJlbiIsImxlbmd0aCIsInJvb21pZCIsImRlc3Ryb3kiLCJnYW1lSW5mb1Rlc3QiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwic2VydmVyVGltZU9mZiIsIkRhdGUiLCJub3ciLCJzZXJ2ZXJ0aW1lIiwicm9vbVJlY29yZCIsInJvb21yZWNvcmQiLCJzaG93UmVjb3JkIiwicm9vbUxpc3QiLCJyb29tbGlzdCIsInJvb21kYXRhIiwiYmV0dHlwZSIsImNvdW50IiwiaW5mb05vZGUiLCJpbnN0YW50aWF0ZSIsImdldENoaWxkQnlOYW1lIiwicm9vbXNlcnZlcmlkIiwid2FpdFRpbWUiLCJNYXRoIiwicm91bmQiLCJjdXJ3YWl0dGltZSIsImN1dGRvd24iLCJ0b3RhbHRpbWUiLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJvbmxpbmUiLCJjaGlsZHJlbkNvdW50Iiwic2hvd0VmZmVjdE5vZGUiLCJzY2hlZHVsZU9uY2UiLCJzaG93Q2xvY2siLCJrZXkiLCJwdXNoIiwic29ydCIsImEiLCJiIiwic3RyIiwidG9TdHJpbmciLCJzdWJzdHIiLCJtaW5iZXQiLCJFbnRlclJvb21Hb2xkVGVtcCIsIkNoaXBzIiwibWF4YmV0IiwiTWF4QmV0IiwiRW50cmFuY2VSZXN0cmljdGlvbnMiLCJvcGFjaXR5IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJnZXRGbG9hdCIsInZhbHVlIiwiTnVtYmVyIiwiZGl2IiwiY2FsbCIsInJlbWFpblRpbWUiLCJmbG9vciIsInN6U3RhdGUiLCJsYkNsb2NrIiwiY29sb3IiLCJDb2xvciIsInNldFRpbWVPdXQiLCJzZXRJbnRlcnZhbCIsInJlY29yZCIsImluZGV4IiwiZG90Tm9kZSIsInJld2FyZFR5cGUiLCJyZXN1bHRfbm9kZSIsInJld2FyZEFyciIsImZydWl0VHlwZSIsImVycm9yIiwic2V0bXVsdGlwbGUiLCJwcmljZU11bHRpcGxlIiwibXVsdGlwbGUiLCJzdHJpbmdDb3VudCIsIm5ld05vZGUiLCJhZGRDb21wb25lbnQiLCJjbGVhclRpbWVvdXQiLCJjdXRGbG9hdCIsInNob3dVc2VySW5mbyIsInNob3dSZW1vdGVJbWFnZSIsIlBsYXllcmhlYWQiLCJjb2luIiwiR29sZFRlbXAiLCJzZXRHYW1lSWQiLCJ1cGRhdGVCZ0luZm8iLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2hvcCIsInJlcUV4aXRBcmVhIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwic2V0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFVBQVUsR0FBRztBQUNmQyxFQUFBQSxXQUFXLEVBQUUsQ0FERTtBQUVmQyxFQUFBQSxpQkFBaUIsRUFBRSxDQUZKO0FBR2ZDLEVBQUFBLGFBQWEsRUFBRSxDQUhBO0FBSWZDLEVBQUFBLGFBQWEsRUFBRSxDQUpBO0FBS2ZDLEVBQUFBLFlBQVksRUFBRTtBQUxDLENBQW5CO0FBUUEsSUFBTUMsU0FBUyxHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FBbEI7QUFFQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxLQUROO0FBRVJDLElBQUFBLE9BQU8sRUFBRUYsRUFBRSxDQUFDRyxJQUZKO0FBR1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDRyxJQUhSO0FBSVJFLElBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDRyxJQUpSO0FBS1JHLElBQUFBLGNBQWMsRUFBRU4sRUFBRSxDQUFDTyxXQUxYO0FBTVJDLElBQUFBLE9BQU8sRUFBRVIsRUFBRSxDQUFDUyxNQU5KO0FBT1JDLElBQUFBLFVBQVUsRUFBRVYsRUFBRSxDQUFDUyxNQVBQO0FBUVJFLElBQUFBLEdBQUcsRUFBRTtBQUErQjtBQUNoQ0MsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNhLFNBRFA7QUFFRCxpQkFBUTtBQUZQLEtBUkc7QUFZUkMsSUFBQUEsWUFBWSxFQUFDLENBQUNkLEVBQUUsQ0FBQ08sV0FBSixDQVpMO0FBYVJRLElBQUFBLFdBQVcsRUFBQyxDQUFDZixFQUFFLENBQUNPLFdBQUosQ0FiSjtBQWNSUyxJQUFBQSxXQUFXLEVBQUMsQ0FBQ2hCLEVBQUUsQ0FBQ08sV0FBSjtBQWRKLEdBRlE7QUFvQnBCO0FBRUFVLEVBQUFBLE1BdEJvQixvQkFzQlg7QUFDTCxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixFQUFuQjtBQUNBekIsSUFBQUEsTUFBTSxDQUFDMEIsT0FBUCxDQUFlQyxFQUFmLENBQWtCQyxPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBN0IsRUFBOEMsS0FBS0MsWUFBbkQsRUFBaUUsSUFBakU7QUFDQS9CLElBQUFBLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQkMsT0FBTyxDQUFDQyxFQUFSLENBQVdHLGVBQTdCLEVBQThDLEtBQUtDLFlBQW5ELEVBQWlFLElBQWpFO0FBQ0FqQyxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsWUFBbEIsRUFBZ0MsS0FBS08sVUFBckMsRUFBaUQsSUFBakQ7QUFDQWxDLElBQUFBLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixnQkFBbEIsRUFBb0MsS0FBS1EsY0FBekMsRUFBeUQsSUFBekQ7QUFDQSxTQUFLQSxjQUFMO0FBQ0EsU0FBS0MsYUFBTDtBQUNBLFNBQUtDLFlBQUw7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDSCxHQXJDbUI7QUF1Q3BCWCxFQUFBQSxZQXZDb0IsMEJBdUNOO0FBQ1YsU0FBS1AsSUFBTCxDQUFVbUIsTUFBVixHQUFtQixJQUFuQjtBQUNBLFNBQUtQLGFBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBS0csUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNILEdBOUNtQjtBQWdEcEJULEVBQUFBLFlBaERvQiwwQkFnRE47QUFDVixTQUFLVCxJQUFMLENBQVVtQixNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS3BDLE9BQUwsQ0FBYXFDLGtCQUFiO0FBQ0EsU0FBS3JDLE9BQUwsQ0FBYXNDLGlCQUFiO0FBQ0EsU0FBS0MsVUFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDSCxHQXREbUI7QUF3RHBCO0FBQ0FYLEVBQUFBLGFBekRvQiwyQkF5REo7QUFDWnBDLElBQUFBLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixxQkFBbEIsRUFBeUMsS0FBS3FCLGNBQTlDLEVBQThELElBQTlEO0FBQ0FoRCxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsaUJBQWxCLEVBQXFDLEtBQUtzQixVQUExQyxFQUFzRCxJQUF0RDtBQUNBakQsSUFBQUEsTUFBTSxDQUFDMEIsT0FBUCxDQUFlQyxFQUFmLENBQWtCLGlCQUFsQixFQUFxQyxLQUFLdUIsVUFBMUMsRUFBc0QsSUFBdEQ7QUFDQWxELElBQUFBLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixtQkFBbEIsRUFBdUMsS0FBS3dCLFlBQTVDLEVBQTBELElBQTFEO0FBQ0gsR0E5RG1CO0FBK0RwQjtBQUNBSixFQUFBQSxlQWhFb0IsNkJBZ0VGO0FBQ2QvQyxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CLHFCQUFuQixFQUEwQyxJQUExQztBQUNBcEQsSUFBQUEsTUFBTSxDQUFDMEIsT0FBUCxDQUFlMEIsR0FBZixDQUFtQixpQkFBbkIsRUFBc0MsSUFBdEM7QUFDQXBELElBQUFBLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZTBCLEdBQWYsQ0FBbUIsaUJBQW5CLEVBQXNDLElBQXRDO0FBQ0FwRCxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CLG1CQUFuQixFQUF3QyxJQUF4QztBQUNILEdBckVtQjtBQXVFcEJDLEVBQUFBLE9BdkVvQixtQkF1RVpDLElBdkVZLEVBdUVOOUIsSUF2RU0sRUF1RUE7QUFBQTs7QUFDaEIsWUFBUThCLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFBaUIsYUFBS3BCLFVBQUw7QUFBbUI7O0FBQ3BDLFdBQUssVUFBTDtBQUFpQixhQUFLcUIsVUFBTDtBQUFtQjs7QUFDcEMsV0FBSyxZQUFMO0FBQW1CLGFBQUtDLFlBQUw7QUFBcUI7O0FBQ3hDLFdBQUssWUFBTDtBQUFtQixhQUFLQyxhQUFMO0FBQXNCOztBQUN6QyxXQUFLLFFBQUw7QUFBZSxhQUFLQyxjQUFMO0FBQXVCOztBQUN0QyxXQUFLLGNBQUw7QUFBcUIsYUFBS0QsYUFBTDtBQUFzQjs7QUFDM0MsV0FBSyxXQUFMO0FBQ0EsV0FBSyxXQUFMO0FBQ0ksWUFBSXpELE1BQU0sQ0FBQzJELElBQVAsQ0FBWUMsU0FBWixFQUFKLEVBQTZCO0FBQ3pCNUQsVUFBQUEsTUFBTSxDQUFDNkQsS0FBUCxDQUFhQyxrQkFBYixDQUFnQyxJQUFoQztBQUNBO0FBQ0g7O0FBQ0QsWUFBSTlELE1BQU0sQ0FBQzJELElBQVAsQ0FBWUksVUFBWixJQUEwQixDQUExQixJQUE4Qi9ELE1BQU0sQ0FBQzJELElBQVAsQ0FBWUssSUFBWixJQUFvQixDQUFuRCxJQUEwRGhFLE1BQU0sQ0FBQzJELElBQVAsQ0FBWU0sT0FBWixJQUF1QixDQUFwRixFQUF1RjtBQUNuRmpFLFVBQUFBLE1BQU0sQ0FBQzZELEtBQVAsQ0FBYUssVUFBYixDQUF3QixFQUF4QixFQUE0QiwrQkFBNUIsRUFBNkQsWUFBTTtBQUFFbEUsWUFBQUEsTUFBTSxDQUFDNkQsS0FBUCxDQUFhTSxXQUFiO0FBQTRCLFdBQWpHLEVBQW1HLFlBQU0sQ0FBRSxDQUEzRyxFQUE2RyxNQUE3RyxFQUFxSCxNQUFySDtBQUNBO0FBQ0g7O0FBQ0RuRSxRQUFBQSxNQUFNLENBQUM2RCxLQUFQLENBQWFPLHVCQUFiO0FBQ0FwRSxRQUFBQSxNQUFNLENBQUNxRSxJQUFQLENBQVlDLGNBQVosQ0FBMkIsS0FBS0MsTUFBaEMsRUFBd0MsS0FBSzlCLFFBQUwsQ0FBY2pCLElBQUksQ0FBQ2dELE1BQUwsQ0FBWWxCLElBQTFCLEVBQWdDckMsSUFBeEUsRUFBOEVPLElBQUksQ0FBQ2dELE1BQUwsQ0FBWWxCLElBQTFGLEVBQWdHbUIsSUFBaEcsQ0FBcUcsWUFBTTtBQUN2R3pFLFVBQUFBLE1BQU0sQ0FBQzBFLFNBQVAsQ0FBaUJDLGlCQUFqQixDQUFtQ25ELElBQUksQ0FBQ2dELE1BQUwsQ0FBWWxCLElBQS9DLEVBQXFELEtBQUksQ0FBQ2IsUUFBTCxDQUFjakIsSUFBSSxDQUFDZ0QsTUFBTCxDQUFZbEIsSUFBMUIsRUFBZ0NzQixHQUFyRjtBQUNILFNBRkQ7QUFHQTs7QUFDSjtBQUNJLFlBQUl0QyxRQUFRLEdBQUc3QyxVQUFVLENBQUM2RCxJQUFELENBQXpCO0FBQ0EsWUFBRyxDQUFDaEIsUUFBSixFQUFjOztBQUNkLFlBQUcsS0FBS0EsUUFBTCxJQUFpQkEsUUFBcEIsRUFBOEI7QUFDMUIsZUFBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxlQUFLL0IsT0FBTCxDQUFhcUMsa0JBQWI7QUFDQSxlQUFLckMsT0FBTCxDQUFhc0MsaUJBQWI7QUFDQSxlQUFLZ0MsUUFBTDtBQUNIOztBQUNEO0FBL0JSO0FBaUNILEdBekdtQjtBQTJHcEI7QUFDQXhDLEVBQUFBLFlBNUdvQiwwQkE0R0w7QUFDWCxTQUFLa0MsTUFBTCxHQUFjdkUsTUFBTSxDQUFDOEUsUUFBUCxDQUFnQkMsU0FBOUI7QUFDQS9FLElBQUFBLE1BQU0sQ0FBQzBFLFNBQVAsQ0FBaUJyQyxZQUFqQixDQUE4QnJDLE1BQU0sQ0FBQzhFLFFBQVAsQ0FBZ0JDLFNBQTlDO0FBQ0gsR0EvR21CO0FBaUhwQjtBQUNBO0FBQ0E1QixFQUFBQSxZQW5Ib0Isd0JBbUhQNkIsR0FuSE8sRUFtSEY7QUFDZCxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUksS0FBSzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCM0IsSUFBekIsSUFBaUMwQixHQUFHLENBQUNJLE1BQXpDLEVBQWlEO0FBQzdDLGFBQUs3RSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxDQUF0QixFQUF5QkksT0FBekI7QUFDSDtBQUNKO0FBRUosR0ExSG1CO0FBMkhwQnJDLEVBQUFBLGNBM0hvQiwwQkEySExnQyxHQTNISyxFQTJIQTtBQUNoQixTQUFLekUsT0FBTCxDQUFhcUMsa0JBQWI7QUFDQSxTQUFLckMsT0FBTCxDQUFhc0MsaUJBQWI7QUFDQSxTQUFLeUMsWUFBTCxHQUFvQnRGLE1BQU0sQ0FBQzBFLFNBQVAsQ0FBaUJhLEdBQWpCLENBQXFCLFVBQXJCLENBQXBCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEtBQUtILFlBQXRDO0FBQ0EsUUFBSSxDQUFDLEtBQUtBLFlBQVYsRUFBd0I7QUFDeEIsU0FBS0ksYUFBTCxHQUFxQkMsSUFBSSxDQUFDQyxHQUFMLEtBQWFaLEdBQUcsQ0FBQ2EsVUFBdEM7QUFDQSxTQUFLaEIsUUFBTDtBQUNILEdBbkltQjtBQXFJcEIzQixFQUFBQSxVQXJJb0Isc0JBcUlUOEIsR0FySVMsRUFxSUo7QUFDWixTQUFLYyxVQUFMLEdBQWtCOUYsTUFBTSxDQUFDMEUsU0FBUCxDQUFpQnFCLFVBQW5DO0FBQ0FQLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVosRUFBa0IsS0FBS0ssVUFBdkI7O0FBQ0EsU0FBSyxJQUFJYixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUsxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxDQUF0QixFQUF5QjNCLElBQXpCLElBQWlDMEIsR0FBRyxDQUFDSSxNQUF6QyxFQUFpRDtBQUM3QyxhQUFLWSxVQUFMLENBQWdCLEtBQUt6RixPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxDQUF0QixDQUFoQixFQUEwQyxLQUFLYSxVQUFMLENBQWdCZCxHQUFHLENBQUNJLE1BQXBCLENBQTFDLEVBQXVFSixHQUFHLENBQUNJLE1BQTNFO0FBQ0g7QUFDSjtBQUNKLEdBN0ltQjtBQStJcEJuQyxFQUFBQSxVQS9Jb0Isc0JBK0lUK0IsR0EvSVMsRUErSUo7QUFBQTs7QUFDWixTQUFLaUIsUUFBTCxHQUFnQmpHLE1BQU0sQ0FBQzBFLFNBQVAsQ0FBaUJ3QixRQUFqQztBQUNBLFNBQUtSLGFBQUwsR0FBcUJDLElBQUksQ0FBQ0MsR0FBTCxLQUFhWixHQUFHLENBQUNhLFVBQXRDO0FBQ0EsUUFBSSxLQUFLdkQsUUFBTCxJQUFpQjBDLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYUMsT0FBOUIsSUFBeUMsS0FBSzlELFFBQUwsS0FBa0IsQ0FBL0QsRUFBa0U7QUFDbEUsUUFBSStELEtBQUssR0FBRyxDQUFaOztBQUNBLFNBQUssSUFBSXBCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUksS0FBSzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCM0IsSUFBekIsSUFBaUMwQixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQWxELEVBQTBEO0FBQ3REaUIsUUFBQUEsS0FBSztBQUNSO0FBQ0o7O0FBQ0QsUUFBSUEsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixVQUFJQyxRQUFRLEdBQUdqRyxFQUFFLENBQUNrRyxXQUFILENBQWUsS0FBSzlGLFdBQXBCLENBQWY7QUFDQTZGLE1BQUFBLFFBQVEsQ0FBQzlCLE1BQVQsR0FBa0IsS0FBS2pFLE9BQXZCO0FBQ0ErRixNQUFBQSxRQUFRLENBQUMzRCxNQUFULEdBQWtCLEtBQWxCO0FBQ0EyRCxNQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUM3RCxNQUFuQyxHQUE0QyxLQUE1QztBQUNBMkQsTUFBQUEsUUFBUSxDQUFDaEQsSUFBVCxhQUFtQjBCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBaEM7QUFDQSxXQUFLM0MsUUFBTCxDQUFjNkQsUUFBUSxDQUFDaEQsSUFBdkIsSUFBK0I7QUFDM0JzQixRQUFBQSxHQUFHLEVBQUUsS0FBS3FCLFFBQUwsQ0FBY2pCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYUMsT0FBM0IsRUFBb0NwQixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQWpELEVBQXlEcUIsWUFEbkM7QUFFM0J4RixRQUFBQSxJQUFJLEVBQUUrRCxHQUFHLENBQUNtQixRQUFKLENBQWFDO0FBRlEsT0FBL0I7QUFJQSxVQUFJTSxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsS0FBS1gsUUFBTCxDQUFjakIsR0FBRyxDQUFDbUIsUUFBSixDQUFhQyxPQUEzQixFQUFvQ3BCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBakQsRUFBeUR5QixXQUF6RCxJQUF3RWxCLElBQUksQ0FBQ0MsR0FBTCxLQUFhLEtBQUtGLGFBQTFGLENBQUQsSUFBNkcsSUFBeEgsQ0FBZjtBQUNBLFdBQUtsRCxRQUFMLENBQWN3QyxHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTNCLElBQXFDLEVBQXJDO0FBQ0EsV0FBSzVDLFFBQUwsQ0FBY3dDLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBM0IsRUFBbUMwQixPQUFuQyxHQUE2Q0osUUFBN0M7QUFDQSxXQUFLbEUsUUFBTCxDQUFjd0MsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUEzQixFQUFtQzJCLFNBQW5DLEdBQStDTCxRQUEvQztBQUNBLFdBQUtoRSxPQUFMLENBQWFzQyxHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTFCLElBQW9DSixHQUFHLENBQUNtQixRQUFKLENBQWF6RCxPQUFqRDtBQUNBNEQsTUFBQUEsUUFBUSxDQUFDRSxjQUFULENBQXdCLFFBQXhCLEVBQWtDUSxZQUFsQyxDQUErQzNHLEVBQUUsQ0FBQ0MsS0FBbEQsRUFBeUQyRyxNQUF6RCxHQUFrRSxLQUFLaEIsUUFBTCxDQUFjakIsR0FBRyxDQUFDbUIsUUFBSixDQUFhQyxPQUEzQixFQUFvQ3BCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBakQsRUFBeUQ4QixNQUEzSDtBQUNBWixNQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NRLFlBQWxDLENBQStDM0csRUFBRSxDQUFDQyxLQUFsRCxFQUF5RDJHLE1BQXpELEdBQWtFakMsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUEvRTtBQUNBLFdBQUtVLFVBQUwsR0FBa0I5RixNQUFNLENBQUMwRSxTQUFQLENBQWlCcUIsVUFBbkM7QUFDQSxXQUFLQyxVQUFMLENBQWdCTSxRQUFoQixFQUEwQixLQUFLUixVQUFMLENBQWdCZCxHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTdCLENBQTFCLEVBQWdFSixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTdFO0FBQ0g7O0FBQ0QsU0FBSyxJQUFJSCxFQUFDLEdBQUMsQ0FBWCxFQUFhQSxFQUFDLEdBQUMsS0FBSzFFLE9BQUwsQ0FBYTRHLGFBQTVCLEVBQTBDbEMsRUFBQyxFQUEzQyxFQUE4QztBQUMxQyxXQUFLMUUsT0FBTCxDQUFhMkUsUUFBYixDQUFzQkQsRUFBdEIsRUFBeUJ1QixjQUF6QixDQUF3QyxTQUF4QyxFQUFtRDdELE1BQW5ELEdBQTRELEtBQTVEO0FBQ0g7O0FBQ0QzQyxJQUFBQSxNQUFNLENBQUM2RCxLQUFQLENBQWF1RCxjQUFiLENBQTRCLElBQTVCLEVBQWlDLEtBQUs3RyxPQUF0QyxFQUE4QyxJQUE5QyxFQUFtRCxJQUFuRCxFQUF3RCxHQUF4RCxFQUE0RCxZQUFJO0FBQzVELE1BQUEsTUFBSSxDQUFDOEcsWUFBTCxDQUFrQixZQUFJO0FBQ2xCLGFBQUssSUFBSXBDLEdBQUMsR0FBQyxDQUFYLEVBQWFBLEdBQUMsR0FBQyxNQUFJLENBQUMxRSxPQUFMLENBQWE0RyxhQUE1QixFQUEwQ2xDLEdBQUMsRUFBM0MsRUFBOEM7QUFDMUMsVUFBQSxNQUFJLENBQUMxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxHQUF0QixFQUF5QnVCLGNBQXpCLENBQXdDLFNBQXhDLEVBQW1EN0QsTUFBbkQsR0FBNEQsSUFBNUQ7QUFDSDtBQUNKLE9BSkQsRUFJRSxHQUpGO0FBS0gsS0FORDs7QUFRQSxTQUFLLElBQUlzQyxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEtBQUsxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsR0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUsxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxHQUF0QixFQUF5QjNCLElBQXpCLElBQWlDMEIsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUFsRCxFQUEwRDtBQUN0RCxZQUFJc0IsU0FBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDNUIsR0FBRyxDQUFDbUIsUUFBSixDQUFhVSxXQUFiLElBQTRCbEIsSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS0YsYUFBOUMsQ0FBRCxJQUFpRSxJQUE1RSxDQUFmOztBQUNBLGFBQUtsRCxRQUFMLENBQWMsS0FBS2pDLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELEdBQXRCLEVBQXlCM0IsSUFBdkMsRUFBNkN3RCxPQUE3QyxHQUF1REosU0FBdkQ7QUFDQSxhQUFLbEUsUUFBTCxDQUFjLEtBQUtqQyxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxHQUF0QixFQUF5QjNCLElBQXZDLEVBQTZDeUQsU0FBN0MsR0FBeURMLFNBQXpEO0FBQ0EsYUFBS2hFLE9BQUwsQ0FBYSxLQUFLbkMsT0FBTCxDQUFhMkUsUUFBYixDQUFzQkQsR0FBdEIsRUFBeUIzQixJQUF0QyxJQUE4QzBCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYXpELE9BQTNEO0FBQ0EsYUFBS25DLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELEdBQXRCLEVBQXlCdUIsY0FBekIsQ0FBd0MsUUFBeEMsRUFBa0RRLFlBQWxELENBQStEM0csRUFBRSxDQUFDQyxLQUFsRSxFQUF5RTJHLE1BQXpFLEdBQWtGakMsR0FBRyxDQUFDbUIsUUFBSixDQUFhZSxNQUEvRjtBQUNIO0FBQ0o7O0FBRUQsU0FBS3BFLFVBQUw7QUFDQSxTQUFLd0UsU0FBTDtBQUVILEdBck1tQjtBQXNNcEI7QUFDQXpDLEVBQUFBLFFBdk1vQixzQkF1TVQ7QUFBQTs7QUFDUCxTQUFLb0IsUUFBTCxHQUFnQixFQUFoQjs7QUFFQSxTQUFLLElBQUlzQixHQUFULElBQWdCdkgsTUFBTSxDQUFDMEUsU0FBUCxDQUFpQndCLFFBQWpCLENBQTBCLEtBQUs1RCxRQUEvQixDQUFoQixFQUEwRDtBQUN0RCxXQUFLMkQsUUFBTCxDQUFjdUIsSUFBZCxDQUFtQnhILE1BQU0sQ0FBQzBFLFNBQVAsQ0FBaUJ3QixRQUFqQixDQUEwQixLQUFLNUQsUUFBL0IsRUFBeUNpRixHQUF6QyxDQUFuQjtBQUNIOztBQUVELFNBQUt0QixRQUFMLENBQWN3QixJQUFkLENBQW1CLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3pCLGFBQU9ELENBQUMsQ0FBQ3RCLE9BQUYsR0FBWXVCLENBQUMsQ0FBQ3ZCLE9BQXJCO0FBQ0gsS0FGRDtBQUdBLFNBQUtOLFVBQUwsR0FBa0I5RixNQUFNLENBQUMwRSxTQUFQLENBQWlCcUIsVUFBbkM7O0FBQ0EsUUFBSSxDQUFDLEtBQUtFLFFBQVYsRUFBb0I7QUFDaEI7QUFDSDs7QUFDRCxTQUFLbkQsVUFBTDs7QUFDQSxTQUFLLElBQUlzQyxNQUFULElBQW1CLEtBQUthLFFBQXhCLEVBQWtDO0FBQzlCLFVBQUdiLE1BQU0sSUFBSSxVQUFWLElBQXdCQSxNQUFNLElBQUksUUFBckMsRUFBOEM7QUFDMUM7QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBS2EsUUFBTCxDQUFjYixNQUFkLENBQUwsRUFBNEI7O0FBQzVCLFdBQUssSUFBSUgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUUsT0FBTCxDQUFhNEcsYUFBakMsRUFBZ0RsQyxDQUFDLEVBQWpELEVBQXFEO0FBQ2pELFlBQUksS0FBSzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCM0IsSUFBekIsSUFBaUMsS0FBSzJDLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQkEsTUFBM0QsRUFBbUU7QUFDL0Q7QUFDSDtBQUNKOztBQUNELFVBQUlrQixRQUFRLEdBQUdqRyxFQUFFLENBQUNrRyxXQUFILENBQWUsS0FBSzlGLFdBQXBCLENBQWY7QUFDQTZGLE1BQUFBLFFBQVEsQ0FBQzlCLE1BQVQsR0FBa0IsS0FBS2pFLE9BQXZCO0FBQ0ErRixNQUFBQSxRQUFRLENBQUMzRCxNQUFULEdBQWtCLEtBQWxCO0FBQ0EyRCxNQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUM3RCxNQUFuQyxHQUE0QyxLQUE1QztBQUNBMkQsTUFBQUEsUUFBUSxDQUFDaEQsSUFBVCxhQUFtQixLQUFLMkMsUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUF6QztBQUNBSSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCYSxRQUFRLENBQUNoRCxJQUF0QyxFQUE0QyxLQUFLMkMsUUFBTCxDQUFjYixNQUFkLENBQTVDLEVBQW1FLEtBQUthLFFBQXhFO0FBQ0EsV0FBS3hELFFBQUwsQ0FBYzZELFFBQVEsQ0FBQ2hELElBQXZCLElBQStCO0FBQzNCc0IsUUFBQUEsR0FBRyxFQUFFLEtBQUtxQixRQUFMLENBQWNiLE1BQWQsRUFBc0JxQixZQURBO0FBRTNCeEYsUUFBQUEsSUFBSSxFQUFFLEtBQUtnRixRQUFMLENBQWNiLE1BQWQsRUFBc0JnQjtBQUZELE9BQS9CO0FBSUEsVUFBSXdCLEdBQUcsR0FBRyxLQUFLM0IsUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUF0QixDQUE2QnlDLFFBQTdCLEVBQVY7QUFDQXZCLE1BQUFBLFFBQVEsQ0FBQ0UsY0FBVCxDQUF3QixRQUF4QixFQUFrQ1EsWUFBbEMsQ0FBK0MzRyxFQUFFLENBQUNDLEtBQWxELEVBQXlEMkcsTUFBekQsR0FBa0VXLEdBQUcsQ0FBQ3pDLE1BQUosR0FBYSxDQUFiLEdBQWlCeUMsR0FBRyxDQUFDRSxNQUFKLENBQVdGLEdBQUcsQ0FBQ3pDLE1BQUosR0FBYSxDQUF4QixDQUFqQixHQUE4Q3lDLEdBQWhIO0FBRUF0QixNQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NRLFlBQWxDLENBQStDM0csRUFBRSxDQUFDQyxLQUFsRCxFQUF5RDJHLE1BQXpELEdBQWtFLEtBQUtoQixRQUFMLENBQWNiLE1BQWQsRUFBc0I4QixNQUF4RjtBQUNBLFVBQUlhLE1BQU0sR0FBRy9ILE1BQU0sQ0FBQzJELElBQVAsQ0FBWXFFLGlCQUFaLENBQThCLEtBQUsxQyxZQUFMLENBQWtCLEtBQUtXLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQmdCLE9BQXhDLEVBQWlENkIsS0FBakQsQ0FBdUQsQ0FBdkQsQ0FBOUIsQ0FBYjtBQUFBLFVBQ0lDLE1BQU0sR0FBR2xJLE1BQU0sQ0FBQzJELElBQVAsQ0FBWXFFLGlCQUFaLENBQThCLEtBQUsxQyxZQUFMLENBQWtCLEtBQUtXLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQmdCLE9BQXhDLEVBQWlEK0IsTUFBL0UsQ0FEYjtBQUVBM0MsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFzQixLQUFLSCxZQUFMLENBQWtCLEtBQUtXLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQmdCLE9BQXhDLEVBQWlENkIsS0FBakQsQ0FBdUQsQ0FBdkQsQ0FBdEIsRUFBaUZGLE1BQU0sR0FBRyxHQUExRixFQUErRixLQUFLekMsWUFBTCxDQUFrQixLQUFLVyxRQUFMLENBQWNiLE1BQWQsRUFBc0JnQixPQUF4QyxFQUFpRCtCLE1BQWpELEdBQTBELEdBQXpKLEVBQThKRCxNQUE5SjtBQUNBNUIsTUFBQUEsUUFBUSxDQUFDRSxjQUFULENBQXdCLFdBQXhCLEVBQXFDUSxZQUFyQyxDQUFrRDNHLEVBQUUsQ0FBQ0MsS0FBckQsRUFBNEQyRyxNQUE1RCxHQUFxRWMsTUFBTSxHQUFHLEdBQVQsR0FBZUcsTUFBcEY7O0FBQ0EsVUFBSSxLQUFLNUMsWUFBTCxDQUFrQixLQUFLVyxRQUFMLENBQWNiLE1BQWQsRUFBc0JnQixPQUF4QyxFQUFpRGdDLG9CQUFqRCxJQUF5RXBJLE1BQU0sQ0FBQzJELElBQVAsQ0FBWTRCLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBekUsSUFBb0csQ0FBQ3ZGLE1BQU0sQ0FBQzJELElBQVAsQ0FBWUMsU0FBWixFQUF6RyxFQUFrSTtBQUM5SDBDLFFBQUFBLFFBQVEsQ0FBQ0UsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0EsY0FBckMsQ0FBb0QsT0FBcEQsRUFBNkQ3RCxNQUE3RCxHQUFzRSxJQUF0RTtBQUNBMkQsUUFBQUEsUUFBUSxDQUFDRSxjQUFULENBQXdCLGtCQUF4QixFQUE0QzdELE1BQTVDLEdBQXFELElBQXJEO0FBQ0EyRCxRQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUM2QixPQUFyQyxHQUErQyxDQUEvQztBQUNILE9BSkQsTUFJTztBQUFDO0FBQ0ovQixRQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDN0QsTUFBNUMsR0FBcUQsS0FBckQ7QUFDQTJELFFBQUFBLFFBQVEsQ0FBQ0UsY0FBVCxDQUF3QixXQUF4QixFQUFxQzZCLE9BQXJDLEdBQStDLEdBQS9DO0FBQ0EvQixRQUFBQSxRQUFRLENBQUNFLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNBLGNBQXJDLENBQW9ELGdCQUFwRCxFQUFzRVEsWUFBdEUsQ0FBbUYzRyxFQUFFLENBQUNpSSxNQUF0RixFQUE4RkMsV0FBOUYsR0FBNEcsS0FBSzVILGNBQWpIO0FBQ0g7O0FBQ0QsVUFBSStGLFFBQVEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVcsQ0FBQyxLQUFLWCxRQUFMLENBQWNiLE1BQWQsRUFBc0J5QixXQUF0QixJQUFxQ2xCLElBQUksQ0FBQ0MsR0FBTCxLQUFhLEtBQUtGLGFBQXZELENBQUQsSUFBMEUsSUFBckYsQ0FBZjs7QUFDQSxVQUFJZ0IsUUFBUSxHQUFHLENBQWYsRUFBa0I7QUFDZEEsUUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDSDs7QUFDRCxXQUFLbEUsUUFBTCxDQUFjLEtBQUt5RCxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQXBDLElBQThDLEVBQTlDO0FBQ0EsV0FBSzVDLFFBQUwsQ0FBYyxLQUFLeUQsUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUFwQyxFQUE0QzBCLE9BQTVDLEdBQXNESixRQUF0RDtBQUNBLFdBQUtsRSxRQUFMLENBQWMsS0FBS3lELFFBQUwsQ0FBY2IsTUFBZCxFQUFzQkEsTUFBcEMsRUFBNEMyQixTQUE1QyxHQUF3REwsUUFBeEQ7QUFDQSxXQUFLaEUsT0FBTCxDQUFhLEtBQUt1RCxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQW5DLElBQTZDLEtBQUthLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQjFDLE9BQW5FO0FBRUEsV0FBS3NELFVBQUwsQ0FBZ0JNLFFBQWhCLEVBQTBCLEtBQUtSLFVBQUwsQ0FBZ0IsS0FBS0csUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUF0QyxDQUExQixFQUF5RSxLQUFLYSxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQS9GO0FBQ0g7O0FBQ0RwRixJQUFBQSxNQUFNLENBQUM2RCxLQUFQLENBQWF1RCxjQUFiLENBQTRCLElBQTVCLEVBQWlDLEtBQUs3RyxPQUF0QyxFQUE4QyxJQUE5QyxFQUFtRCxJQUFuRCxFQUF3RCxHQUF4RCxFQUE0RCxZQUFJO0FBQzVELE1BQUEsTUFBSSxDQUFDOEcsWUFBTCxDQUFrQixZQUFJO0FBQ2xCLGFBQUssSUFBSXBDLEdBQUMsR0FBQyxDQUFYLEVBQWFBLEdBQUMsR0FBQyxNQUFJLENBQUMxRSxPQUFMLENBQWE0RyxhQUE1QixFQUEwQ2xDLEdBQUMsRUFBM0MsRUFBOEM7QUFDMUMsVUFBQSxNQUFJLENBQUMxRSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxHQUF0QixFQUF5QnVCLGNBQXpCLENBQXdDLFNBQXhDLEVBQW1EN0QsTUFBbkQsR0FBNEQsSUFBNUQ7QUFDSDtBQUNKLE9BSkQsRUFJRSxHQUpGO0FBS0gsS0FORDtBQU9BLFNBQUsyRSxTQUFMO0FBR0gsR0FoUm1CO0FBaVJwQjtBQUNBa0IsRUFBQUEsUUFsUm9CLG9CQWtSWEMsS0FsUlcsRUFrUko7QUFDWixXQUFRQyxNQUFNLENBQUNELEtBQUQsQ0FBTixDQUFjRSxHQUFkLENBQWtCLEdBQWxCLENBQUQsQ0FBeUJkLFFBQXpCLEVBQVA7QUFDSCxHQXBSbUI7QUFxUnBCO0FBQ0FQLEVBQUFBLFNBdFJvQix1QkFzUlI7QUFBQTs7QUFDUixRQUFJc0IsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUNiLFVBQUksTUFBSSxDQUFDckksT0FBTCxDQUFhMkUsUUFBakIsRUFBMkI7QUFDdkIsYUFBSyxJQUFJRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLE1BQUksQ0FBQzFFLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELGNBQUlHLE1BQU0sR0FBRyxNQUFJLENBQUM3RSxPQUFMLENBQWEyRSxRQUFiLENBQXNCRCxDQUF0QixFQUF5QjNCLElBQXRDO0FBQ0EsVUFBQSxNQUFJLENBQUNkLFFBQUwsQ0FBYzRDLE1BQWQsRUFBc0IwQixPQUF0QixJQUFpQyxDQUFqQzs7QUFDQSxjQUFJLE1BQUksQ0FBQ3RFLFFBQUwsQ0FBYzRDLE1BQWQsRUFBc0IwQixPQUF0QixHQUFnQyxDQUFwQyxFQUF1QztBQUNuQyxZQUFBLE1BQUksQ0FBQ3RFLFFBQUwsQ0FBYzRDLE1BQWQsRUFBc0IwQixPQUF0QixHQUFnQyxDQUFoQztBQUNIOztBQUVELGNBQUlwRSxPQUFPLEdBQUcsTUFBSSxDQUFDQSxPQUFMLENBQWEwQyxNQUFiLENBQWQ7QUFDQSxjQUFJeUQsVUFBVSxHQUFHbEMsSUFBSSxDQUFDbUMsS0FBTCxDQUFXLE1BQUksQ0FBQ3RHLFFBQUwsQ0FBYzRDLE1BQWQsRUFBc0IwQixPQUFqQyxDQUFqQjtBQUVBLGNBQUlpQyxPQUFPLEdBQUdoSixTQUFTLENBQUMyQyxPQUFPLEdBQUMsQ0FBVCxDQUF2Qjs7QUFDQSxjQUFJc0csT0FBTyxHQUFHLE1BQUksQ0FBQ3pJLE9BQUwsQ0FBYTJFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCdUIsY0FBekIsQ0FBd0MsT0FBeEMsRUFBaURRLFlBQWpELENBQThEM0csRUFBRSxDQUFDQyxLQUFqRSxDQUFkOztBQUNBLGNBQUdvQyxPQUFPLElBQUksQ0FBZCxFQUFpQjtBQUNic0csWUFBQUEsT0FBTyxDQUFDL0IsTUFBUixhQUFvQjhCLE9BQXBCLGdCQUFpQ0YsVUFBakM7O0FBQ0EsZ0JBQUdBLFVBQVUsSUFBSSxDQUFqQixFQUFvQjtBQUNoQkcsY0FBQUEsT0FBTyxDQUFDeEgsSUFBUixDQUFheUgsS0FBYixHQUFxQixJQUFJNUksRUFBRSxDQUFDNkksS0FBUCxDQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsQ0FBckI7QUFDSCxhQUZELE1BR0s7QUFDREYsY0FBQUEsT0FBTyxDQUFDeEgsSUFBUixDQUFheUgsS0FBYixHQUFxQixJQUFJNUksRUFBRSxDQUFDNkksS0FBUCxDQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsRUFBdkIsQ0FBckI7QUFDSDtBQUNKLFdBUkQsTUFTSztBQUNERixZQUFBQSxPQUFPLENBQUMvQixNQUFSLEdBQWlCOEIsT0FBakI7QUFDQUMsWUFBQUEsT0FBTyxDQUFDeEgsSUFBUixDQUFheUgsS0FBYixHQUFxQixJQUFJNUksRUFBRSxDQUFDNkksS0FBUCxDQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQTdCRDs7QUE4QkFOLElBQUFBLElBQUk7QUFDSixTQUFLTyxVQUFMLEdBQWtCQyxXQUFXLENBQUNSLElBQUQsRUFBTyxJQUFQLENBQTdCO0FBQ0gsR0F2VG1CO0FBeVRwQjVDLEVBQUFBLFVBelRvQixzQkF5VFR4RSxJQXpUUyxFQXlUSDZILE1BelRHLEVBeVRLakUsTUF6VEwsRUF5VGE7QUFDN0IsUUFBSSxDQUFDaUUsTUFBTCxFQUFhO0FBQ1Q7QUFDSDs7QUFDRCxRQUFJQyxLQUFLLEdBQUcsQ0FBWjtBQUNBLFFBQUlDLE9BQUo7QUFDQS9ILElBQUFBLElBQUksQ0FBQ2dGLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0M1RCxrQkFBaEM7QUFDQXBCLElBQUFBLElBQUksQ0FBQ2dGLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0MzRCxpQkFBaEM7O0FBQ0EsUUFBSXdHLE1BQU0sQ0FBQ2xFLE1BQVAsR0FBZ0IsRUFBcEIsRUFBd0I7QUFDcEJtRSxNQUFBQSxLQUFLLEdBQUdELE1BQU0sQ0FBQ2xFLE1BQVAsR0FBZ0IsRUFBeEI7QUFDSDs7QUFDRCxTQUFLLElBQUlGLENBQUMsR0FBR3FFLEtBQWIsRUFBb0JyRSxDQUFDLEdBQUdvRSxNQUFNLENBQUNsRSxNQUEvQixFQUF1Q0YsQ0FBQyxFQUF4QyxFQUE0QztBQUN4Q3NFLE1BQUFBLE9BQU8sR0FBR2xKLEVBQUUsQ0FBQ2tHLFdBQUgsQ0FBZSxLQUFLN0YsV0FBcEIsQ0FBVjtBQUNBNkksTUFBQUEsT0FBTyxDQUFDNUcsTUFBUixHQUFpQixLQUFqQjs7QUFDQSxVQUFJMEcsTUFBTSxDQUFDcEUsQ0FBRCxDQUFOLENBQVV1RSxVQUFWLElBQXdCLEVBQTVCLEVBQWdDO0FBQzVCLFlBQUlDLFdBQVcsR0FBR0YsT0FBTyxDQUFDL0MsY0FBUixDQUF1QixjQUF2QixDQUFsQjtBQUNBaUQsUUFBQUEsV0FBVyxDQUFDOUcsTUFBWixHQUFxQixJQUFyQjtBQUNBOEcsUUFBQUEsV0FBVyxDQUFDekMsWUFBWixDQUF5QjNHLEVBQUUsQ0FBQ2lJLE1BQTVCLEVBQW9DQyxXQUFwQyxHQUFrRCxLQUFLcEgsWUFBTCxDQUFtQmtJLE1BQU0sQ0FBQ3BFLENBQUQsQ0FBTixDQUFVdUUsVUFBN0IsQ0FBbEQ7QUFDQUQsUUFBQUEsT0FBTyxDQUFDL0MsY0FBUixDQUF1QixVQUF2QixFQUFtQ0EsY0FBbkMsQ0FBa0QsT0FBbEQsRUFBMkQ3RCxNQUEzRCxHQUFvRSxLQUFwRTtBQUNILE9BTEQsTUFLTztBQUNILFlBQUk4RyxZQUFXLEdBQUdGLE9BQU8sQ0FBQy9DLGNBQVIsQ0FBdUIsYUFBdkIsQ0FBbEI7O0FBQ0FpRCxRQUFBQSxZQUFXLENBQUM5RyxNQUFaLEdBQXFCLElBQXJCOztBQUNBLFlBQUcsS0FBS3ZCLFdBQUwsQ0FBaUJpSSxNQUFNLENBQUNwRSxDQUFELENBQU4sQ0FBVXlFLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJDLFNBQXhDLENBQUgsRUFBc0Q7QUFDbERGLFVBQUFBLFlBQVcsQ0FBQ3pDLFlBQVosQ0FBeUIzRyxFQUFFLENBQUNpSSxNQUE1QixFQUFvQ0MsV0FBcEMsR0FBa0QsS0FBS25ILFdBQUwsQ0FBaUJpSSxNQUFNLENBQUNwRSxDQUFELENBQU4sQ0FBVXlFLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJDLFNBQXhDLENBQWxEO0FBQ0gsU0FGRCxNQUVLO0FBQ0R0SixVQUFBQSxFQUFFLENBQUN1SixLQUFILENBQVMsWUFBVVAsTUFBTSxDQUFDcEUsQ0FBRCxDQUFOLENBQVV5RSxTQUFWLENBQW9CLENBQXBCLEVBQXVCQyxTQUExQztBQUNIOztBQUNELGFBQUtFLFdBQUwsQ0FBaUJOLE9BQWpCLEVBQTBCRixNQUFNLENBQUNwRSxDQUFELENBQU4sQ0FBVXlFLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJJLGFBQWpEO0FBQ0g7O0FBQ0RQLE1BQUFBLE9BQU8sQ0FBQy9FLE1BQVIsR0FBaUJoRCxJQUFJLENBQUNnRixjQUFMLENBQW9CLFVBQXBCLENBQWpCOztBQUNBLFVBQUl2QixDQUFDLElBQUlvRSxNQUFNLENBQUNsRSxNQUFQLEdBQWdCLENBQXpCLEVBQTRCO0FBQ3hCb0UsUUFBQUEsT0FBTyxDQUFDL0MsY0FBUixDQUF1QixLQUF2QixFQUE4QjdELE1BQTlCLEdBQXVDLElBQXZDO0FBQ0g7QUFDSjs7QUFDRDNDLElBQUFBLE1BQU0sQ0FBQzZELEtBQVAsQ0FBYXVELGNBQWIsQ0FBNEIsSUFBNUIsRUFBaUM1RixJQUFJLENBQUNnRixjQUFMLENBQW9CLFVBQXBCLENBQWpDLEVBQWlFLElBQWpFLEVBQXNFLElBQXRFO0FBRUgsR0E3Vm1CO0FBOFZwQjtBQUNBcUQsRUFBQUEsV0EvVm9CLHVCQStWUnJJLElBL1ZRLEVBK1ZGdUksUUEvVkUsRUErVlE7QUFDeEIsUUFBSUMsV0FBVyxHQUFHRCxRQUFRLENBQUNsQyxRQUFULEVBQWxCO0FBQ0EsUUFBSXhCLEtBQUssR0FBRzJELFdBQVcsQ0FBQzdFLE1BQXhCOztBQUNBLFNBQUssSUFBSUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR29CLEtBQXBCLEVBQTJCcEIsQ0FBQyxFQUE1QixFQUFnQztBQUM1QixVQUFJZ0YsT0FBTyxHQUFHLElBQUk1SixFQUFFLENBQUNHLElBQVAsRUFBZDtBQUNBeUosTUFBQUEsT0FBTyxDQUFDQyxZQUFSLENBQXFCN0osRUFBRSxDQUFDaUksTUFBeEIsRUFBZ0NDLFdBQWhDLEdBQThDLEtBQUtsSCxXQUFMLENBQWlCMkksV0FBVyxDQUFDL0UsQ0FBRCxDQUE1QixDQUE5QztBQUNBZ0YsTUFBQUEsT0FBTyxDQUFDekYsTUFBUixHQUFpQmhELElBQUksQ0FBQ2dGLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBakI7QUFDSDtBQUNKLEdBdldtQjtBQXlXcEI7QUFDQTFELEVBQUFBLFVBMVdvQix3QkEwV1A7QUFDVCxRQUFJLEtBQUtxRyxVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQ3pCZ0IsTUFBQUEsWUFBWSxDQUFDLEtBQUtoQixVQUFOLENBQVo7QUFDSDs7QUFDRCxTQUFLQSxVQUFMLEdBQWtCLElBQWxCO0FBQ0gsR0EvV21CO0FBaVhwQmlCLEVBQUFBLFFBalhvQixvQkFpWFgzQixLQWpYVyxFQWlYSjtBQUNaLFdBQVFDLE1BQU0sQ0FBQ0QsS0FBRCxDQUFOLENBQWNFLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBRCxDQUF5QmQsUUFBekIsRUFBUDtBQUNILEdBblhtQjtBQW9YcEJ3QyxFQUFBQSxZQXBYb0IsMEJBb1hMO0FBQ1hySyxJQUFBQSxNQUFNLENBQUM2RCxLQUFQLENBQWF5RyxlQUFiLENBQTZCLEtBQUtDLFVBQWxDLEVBQThDdkssTUFBTSxDQUFDMkQsSUFBUCxDQUFZNEIsR0FBWixDQUFnQixTQUFoQixDQUE5QztBQUNILEdBdFhtQjtBQXVYcEJwRCxFQUFBQSxjQXZYb0IsNEJBdVhIO0FBQ2IsUUFBSXFJLElBQUksR0FBR3hLLE1BQU0sQ0FBQzJELElBQVAsQ0FBWTRCLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBWDtBQUNBLFNBQUtuRixTQUFMLENBQWU2RyxNQUFmLEdBQXdCakgsTUFBTSxDQUFDMkQsSUFBUCxDQUFZOEcsUUFBWixDQUFxQkQsSUFBckIsQ0FBeEI7QUFDSCxHQTFYbUI7QUE0WHBCRSxFQUFBQSxTQTVYb0IscUJBNFhWbkosTUE1WFUsRUE0WEY7QUFDZCxTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxHQTlYbUI7QUFnWXBCb0osRUFBQUEsWUFoWW9CLDBCQWdZTCxDQUNkLENBalltQjtBQW1ZcEJqSCxFQUFBQSxjQW5Zb0IsNEJBbVlIO0FBQ2IxRCxJQUFBQSxNQUFNLENBQUM2RCxLQUFQLENBQWErRyxlQUFiLENBQTZCLFVBQTdCO0FBQ0gsR0FyWW1CO0FBdVlwQm5ILEVBQUFBLGFBdllvQiwyQkF1WUo7QUFDWnpELElBQUFBLE1BQU0sQ0FBQzZELEtBQVAsQ0FBYWdILFFBQWIsQ0FBc0IsRUFBdEI7QUFDSCxHQXpZbUI7QUEyWXBCM0ksRUFBQUEsVUEzWW9CLHdCQTJZUDtBQUNUbEMsSUFBQUEsTUFBTSxDQUFDMEUsU0FBUCxDQUFpQm9HLFdBQWpCO0FBQ0EsU0FBS0MsTUFBTDtBQUNILEdBOVltQjtBQWdacEJ4SCxFQUFBQSxVQWhab0Isd0JBZ1pQO0FBQ1QsUUFBSU0sS0FBSyxHQUFHN0QsTUFBTSxDQUFDNkQsS0FBUCxDQUFhbUgsU0FBYixDQUF1QixLQUFLbkssT0FBNUIsQ0FBWjtBQUNBZ0QsSUFBQUEsS0FBSyxDQUFDcEMsTUFBTixHQUFlLEVBQWY7QUFDSCxHQW5abUI7QUFxWnBCK0IsRUFBQUEsWUFyWm9CLDBCQXFaTDtBQUNYeEQsSUFBQUEsTUFBTSxDQUFDNkQsS0FBUCxDQUFhbUgsU0FBYixDQUF1QixLQUFLakssVUFBNUIsRUFBd0NVLE1BQXhDLEdBQWlELEVBQWpEO0FBQ0gsR0F2Wm1CO0FBeVpwQndKLEVBQUFBLEdBelpvQixlQXlaaEIxRCxHQXpaZ0IsRUF5WlhrQixLQXpaVyxFQXlaSjtBQUNaLFNBQUtsQixHQUFMLElBQVlrQixLQUFaO0FBQ0gsR0EzWm1CO0FBNlpwQmxELEVBQUFBLEdBN1pvQixlQTZaaEJnQyxHQTdaZ0IsRUE2Wlg7QUFDTCxXQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNILEdBL1ptQjtBQWlhcEIyRCxFQUFBQSxTQWphb0IsdUJBaWFSO0FBQ1JsTCxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CeEIsT0FBTyxDQUFDQyxFQUFSLENBQVdDLGVBQTlCLEVBQThDLElBQTlDO0FBQ0E5QixJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CeEIsT0FBTyxDQUFDQyxFQUFSLENBQVdHLGVBQTlCLEVBQThDLElBQTlDO0FBQ0FoQyxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CLFlBQW5CLEVBQWlDLElBQWpDO0FBQ0FwRCxJQUFBQSxNQUFNLENBQUMwQixPQUFQLENBQWUwQixHQUFmLENBQW1CLGdCQUFuQixFQUFvQyxJQUFwQztBQUNBLFNBQUtOLFVBQUw7QUFDQSxTQUFLQyxlQUFMO0FBQ0g7QUF4YW1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2dnbGVfbWFwID0ge1xyXG4gICAgdG9nZ2xlX2Jhc2U6IDEsXHJcbiAgICB0b2dnbGVfZWxlbWVudGFyeTogMixcclxuICAgIHRvZ2dsZV9tZWRpdW06IDMsXHJcbiAgICB0b2dnbGVfaGlnaGVyOiA0LFxyXG4gICAgdG9nZ2xlX3BsdXRlOiA1XHJcbn1cclxuXHJcbmNvbnN0IHN0YXRlX0FyciA9IFtcIuS4i+azqOS4rVwiLCBcIue7k+eul+S4rVwiXTtcclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZENvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVjb3JkOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVzdWx0OiBjYy5Ob2RlLFxyXG4gICAgICAgIGJhdHRsZVdhdGNocGljOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBzZ2pSdWxlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcHJlX3JlY29yZDogY2MuUHJlZmFiLFxyXG4gICAgICAgIEJHTTogeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6IOM5pmv5aOw6Z+zXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcGVjaWFsX0xpc3Q6W2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBjb21tb25fTGlzdDpbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGJlaXNodV9MaXN0OltjYy5TcHJpdGVGcmFtZV0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1laWQgPSAwO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAyMDtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlJPT01fRU5URVJfU0hPVywgdGhpcy5Sb290Tm9kZVNob3csIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9ISURFLCB0aGlzLlJvb3ROb2RlSGlkZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJub2RlUmVtb3ZlXCIsIHRoaXMuY2xpY2tfYmFjaywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzLnVwZGF0ZXVzZXJJbmZvLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZXVzZXJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLnJvb21UeXBlID0gMTtcclxuICAgICAgICB0aGlzLmNvdW5kb3dtVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy53YWl0dGltZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgICAgICB0aGlzLnByb2Nlc3MgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgUm9vdE5vZGVTaG93KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLndhaXR0aW1lID0ge307XHJcbiAgICAgICAgdGhpcy5ub2RlSW5mbyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJvY2VzcyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBSb290Tm9kZUhpZGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzLm9uR2FtZUluZm9saXN0LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uUm9vbUluZm9fYXJlYVwiLCB0aGlzLm9uUm9vbUluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMub25IYW5kSW5mbywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkRlbGV0ZVJvb21fYXJlYVwiLCB0aGlzLm9uRGVsZXRlUm9vbSwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy/kuovku7bplIDmr4FcclxuICAgIHVucmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkdhbWVJbmZvbGlzdF9hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uUm9vbUluZm9fYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkhhbmRJbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25EZWxldGVSb29tX2FyZWFcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tcIjogdGhpcy5jbGlja19iYWNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlbHBcIjogdGhpcy5jbGlja19oZWxwKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY29yZFwiOiB0aGlzLmNsaWNrX3JlY29yZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm15Y29pbkluZm9cIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZGJnXCI6IHRoaXMuY2xpY2tfdXNlcmluZm8oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2hvbmd6aGlcIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdidG5fZW50ZXInOlxyXG4gICAgICAgICAgICBjYXNlICdidG5fc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiZnbEdhbWUudXNlci5nYW1lID09IDIgKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIgKXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBcIuaCqOeahOi0puWPt+aVsOaNruW8guW4uO+8jOaaguaXtuemgeatoui/m+WFpea4uOaIj++8jOWmguacieeWkemXru+8jOivt+iBlOezu+Wuouacje+8gVwiLCAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHt9LCBcIuaIkeefpemBk+S6hlwiLCBcIuiBlOezu+WuouacjVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RmllbGRTZWxlY3Rpb25KdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnJvb20ucmVxTXlHYW1lU3RhdGUodGhpcy5nYW1lSUQsIHRoaXMubm9kZUluZm9bbm9kZS5wYXJlbnQubmFtZV0udHlwZSwgbm9kZS5wYXJlbnQubmFtZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5lbnRlckh1bmRyZWRzUm9vbShub2RlLnBhcmVudC5uYW1lLCB0aGlzLm5vZGVJbmZvW25vZGUucGFyZW50Lm5hbWVdLnRhZyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgbGV0IHJvb21UeXBlID0gdG9nZ2xlX21hcFtuYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmKCFyb29tVHlwZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yb29tVHlwZSAhPSByb29tVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSByb29tVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPkeWMhVxyXG4gICAgcmVxRW50ZXJBcmVhKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUlEID0gZ2xHYW1lLnNjZW5ldGFnLlNIVUlHVU9KSTtcclxuICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUVudGVyQXJlYShnbEdhbWUuc2NlbmV0YWcuU0hVSUdVT0pJKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/kuovku7blm57osINcclxuICAgIC8v6L+b5YWl5ri45oiP5L+h5oGv5Zue6LCDXHJcbiAgICBvbkRlbGV0ZVJvb20obXNnKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uR2FtZUluZm9saXN0KG1zZykge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvVGVzdCA9IGdsR2FtZS5yZWFkeXJvb20uZ2V0KFwiZ2FtZUluZm9cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuZ2FtZUluZm9UZXN0JywgdGhpcy5nYW1lSW5mb1Rlc3QpXHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVJbmZvVGVzdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZU9mZiA9IERhdGUubm93KCkgLSBtc2cuc2VydmVydGltZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uSGFuZEluZm8obXNnKSB7XHJcbiAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5aWW5YqxXCIsIHRoaXMucm9vbVJlY29yZCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlY29yZCh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0sIHRoaXMucm9vbVJlY29yZFttc2cucm9vbWlkXSwgbXNnLnJvb21pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUm9vbUluZm8obXNnKSB7XHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbWxpc3Q7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJUaW1lT2ZmID0gRGF0ZS5ub3coKSAtIG1zZy5zZXJ2ZXJ0aW1lO1xyXG4gICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IG1zZy5yb29tZGF0YS5iZXR0eXBlICYmIHRoaXMucm9vbVR5cGUgIT09IDApIHJldHVyblxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29tZGF0YS5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGluZm9Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3JlY29yZCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgaW5mb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX25ld1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5mb05vZGUubmFtZSA9IGAke21zZy5yb29tZGF0YS5yb29taWR9YDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlSW5mb1tpbmZvTm9kZS5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHRhZzogdGhpcy5yb29tTGlzdFttc2cucm9vbWRhdGEuYmV0dHlwZV1bbXNnLnJvb21kYXRhLnJvb21pZF0ucm9vbXNlcnZlcmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbXNnLnJvb21kYXRhLmJldHR5cGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2FpdFRpbWUgPSBNYXRoLnJvdW5kKCh0aGlzLnJvb21MaXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXVttc2cucm9vbWRhdGEucm9vbWlkXS5jdXJ3YWl0dGltZSAtIChEYXRlLm5vdygpIC0gdGhpcy5zZXJ2ZXJUaW1lT2ZmKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgdGhpcy53YWl0dGltZVttc2cucm9vbWRhdGEucm9vbWlkXSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW1lW21zZy5yb29tZGF0YS5yb29taWRdLmN1dGRvd24gPSB3YWl0VGltZTtcclxuICAgICAgICAgICAgdGhpcy53YWl0dGltZVttc2cucm9vbWRhdGEucm9vbWlkXS50b3RhbHRpbWUgPSB3YWl0VGltZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzW21zZy5yb29tZGF0YS5yb29taWRdID0gbXNnLnJvb21kYXRhLnByb2Nlc3M7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdvbmxpbmUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnLnJvb21kYXRhLnJvb21pZDtcclxuICAgICAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQoaW5mb05vZGUsIHRoaXMucm9vbVJlY29yZFttc2cucm9vbWRhdGEucm9vbWlkXSwgbXNnLnJvb21kYXRhLnJvb21pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50O2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19uZXdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuY29udGVudCwwLjAyLHRydWUsMC4xLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19uZXdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwwLjgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21kYXRhLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5yb3VuZCgobXNnLnJvb21kYXRhLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0dGltZVt0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZV0uY3V0ZG93biA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0dGltZVt0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZV0udG90YWx0aW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NbdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWVdID0gbXNnLnJvb21kYXRhLnByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnLnJvb21kYXRhLm9ubGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93Q2xvY2soKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrBVSVxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUxpc3QucHVzaChnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdW2tleV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvb21MaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuYmV0dHlwZSAtIGIuYmV0dHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgcm9vbWlkIGluIHRoaXMucm9vbUxpc3QpIHtcclxuICAgICAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm9vbUxpc3Rbcm9vbWlkXSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZm9Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3JlY29yZCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgaW5mb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX25ld1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5mb05vZGUubmFtZSA9IGAke3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWR9YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZm9Ob2RlLm5hbWUnLCBpbmZvTm9kZS5uYW1lLCB0aGlzLnJvb21MaXN0W3Jvb21pZF0sIHRoaXMucm9vbUxpc3QpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdyb29tSWQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0ci5sZW5ndGggPiA1ID8gc3RyLnN1YnN0cihzdHIubGVuZ3RoIC0gNSkgOiBzdHI7XHJcblxyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWFpeWPo+aVsOaNruiwg+aVtFwiLCB0aGlzLmdhbWVJbmZvVGVzdFt0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZV0uQ2hpcHNbMF0sIG1pbmJldCAvIDEwMCwgdGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLk1heEJldCAvIDEwMCwgbWF4YmV0KVxyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtaW5iZXQgKyBcIi1cIiArIG1heGJldDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5FbnRyYW5jZVJlc3RyaWN0aW9ucyA8PSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpICYmICFnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJmbGFzaFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2VudGVyX2VmZmVjdCcpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2VudGVyJykub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7Ly/op4LmiJhcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdidG5fZW50ZXJfZWZmZWN0JykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2VudGVyJykub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX2ppbnJ1eW91eGlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJhdHRsZVdhdGNocGljO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGgucm91bmQoKHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5jdXJ3YWl0dGltZSAtIChEYXRlLm5vdygpIC0gdGhpcy5zZXJ2ZXJUaW1lT2ZmKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgaWYgKHdhaXRUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbWVbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy53YWl0dGltZVt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkXS5jdXRkb3duID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbWVbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0udG90YWx0aW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1t0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkXSA9IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0sIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyx0aGlzLmNvbnRlbnQsMC4wMix0cnVlLDAuMSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbmV3XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sMC44KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNob3dDbG9jaygpO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/moYzpnaLmlbDmja7nmoTmmL7npLpcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIC8v5pi+56S65YCS6K6h5pe2XHJcbiAgICBzaG93Q2xvY2soKSB7XHJcbiAgICAgICAgbGV0IGNhbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvb21pZCA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdHRpbWVbcm9vbWlkXS5jdXRkb3duIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMud2FpdHRpbWVbcm9vbWlkXS5jdXRkb3duIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXR0aW1lW3Jvb21pZF0uY3V0ZG93biA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvY2VzcyA9IHRoaXMucHJvY2Vzc1tyb29taWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5UaW1lID0gTWF0aC5mbG9vcih0aGlzLndhaXR0aW1lW3Jvb21pZF0uY3V0ZG93bik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzelN0YXRlID0gc3RhdGVfQXJyW3Byb2Nlc3MtMV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxiQ2xvY2sgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoJ2Nsb2NrJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihwcm9jZXNzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGJDbG9jay5zdHJpbmcgPSBgJHtzelN0YXRlfTogICR7cmVtYWluVGltZX1zYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVtYWluVGltZSA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYkNsb2NrLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCA5NiwgNDcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGJDbG9jay5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDE0MSwgMjA5LCAzNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxiQ2xvY2suc3RyaW5nID0gc3pTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGJDbG9jay5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDIyNiwgMTM3LCAyNTUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lT3V0ID0gc2V0SW50ZXJ2YWwoY2FsbCwgMTAwMClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1JlY29yZChub2RlLCByZWNvcmQsIHJvb21pZCkge1xyXG4gICAgICAgIGlmICghcmVjb3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBkb3ROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90JykuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChyZWNvcmQubGVuZ3RoID4gMTYpIHtcclxuICAgICAgICAgICAgaW5kZXggPSByZWNvcmQubGVuZ3RoIC0gMTY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkb3ROb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgIGRvdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmRbaV0ucmV3YXJkVHlwZSAhPSAxMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdF9ub2RlID0gZG90Tm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vZGVfcmVzdWx0c1wiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BlY2lhbF9MaXN0WyByZWNvcmRbaV0ucmV3YXJkVHlwZV07XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENoaWxkQnlOYW1lKFwibXVsdGlwbGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVuZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRfbm9kZSA9IGRvdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub2RlX3Jlc3VsdFwiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbW1vbl9MaXN0W3JlY29yZFtpXS5yZXdhcmRBcnJbMF0uZnJ1aXRUeXBlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0X25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNvbW1vbl9MaXN0W3JlY29yZFtpXS5yZXdhcmRBcnJbMF0uZnJ1aXRUeXBlXTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj4+IOe8uuWwkSBcIityZWNvcmRbaV0ucmV3YXJkQXJyWzBdLmZydWl0VHlwZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0bXVsdGlwbGUoZG90Tm9kZSwgcmVjb3JkW2ldLnJld2FyZEFyclswXS5wcmljZU11bHRpcGxlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvdE5vZGUucGFyZW50ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gcmVjb3JkLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuZXdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyxub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpLDAuMDIsdHJ1ZSk7XHJcblxyXG4gICAgfSxcclxuICAgIC8v5qC55o2u5YCN5pWw55SocGxpc3Tlm77pm4bmi7zmjqXmlbDlrZdcclxuICAgIHNldG11bHRpcGxlKG5vZGUsIG11bHRpcGxlKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZ0NvdW50ID0gbXVsdGlwbGUudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgY291bnQgPSBzdHJpbmdDb3VudC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmVpc2h1X0xpc3Rbc3RyaW5nQ291bnRbaV1dO1xyXG4gICAgICAgICAgICBuZXdOb2RlLnBhcmVudCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtdWx0aXBsZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5riF55CG5YCS6K6h5pe2XHJcbiAgICBjbGVhblRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldFRpbWVPdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZXRUaW1lT3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lT3V0ID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgY3V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1VzZXJJbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UodGhpcy5QbGF5ZXJoZWFkLCBnbEdhbWUudXNlci5nZXQoXCJoZWFkVVJMXCIpKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGV1c2VySW5mbygpIHtcclxuICAgICAgICBsZXQgY29pbiA9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIilcclxuICAgICAgICB0aGlzLmdvbGRDb3VudC5zdHJpbmcgPSBnbEdhbWUudXNlci5Hb2xkVGVtcChjb2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0R2FtZUlkKGdhbWVpZCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gZ2FtZWlkO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCZ0luZm8oKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX3VzZXJpbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJ1c2VyaW5mb1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfYWRkZ29sZCgpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Nob3AoMzApO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19iYWNrKCkge1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRXhpdEFyZWEoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19oZWxwKCkge1xyXG4gICAgICAgIGxldCBwYW5lbCA9IGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy5zZ2pSdWxlKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAzMDtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy5wcmVfcmVjb3JkKS56SW5kZXggPSAzMDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9ISURFLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm5vZGVSZW1vdmVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIix0aGlzKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
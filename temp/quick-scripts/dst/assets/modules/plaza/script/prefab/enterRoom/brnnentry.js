
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/brnnentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGJybm5lbnRyeS5qcyJdLCJuYW1lcyI6WyJQUk9DRVNTIiwidGlwIiwiY29sb3IiLCJjYyIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJCR00iLCJ0eXBlIiwiQXVkaW9DbGlwIiwiZ29sZENvdW50IiwiTGFiZWwiLCJjb250ZW50IiwiTm9kZSIsIm5vZGVfcmVjb3JkIiwibm9kZV9yZXN1bHQiLCJzcHJpdGVfQXRsYXMiLCJTcHJpdGVBdGxhcyIsInJlY29yZFByZWZhYiIsIlByZWZhYiIsInJ1bGVQcmVmYWIiLCJiYXR0bGVXYXRjaHBpYyIsIlNwcml0ZUZyYW1lIiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlJPT01fRU5URVJfU0hPVyIsIlJvb3ROb2RlU2hvdyIsIlJPT01fRU5URVJfSElERSIsIlJvb3ROb2RlSGlkZSIsImNsaWNrX2JhY2siLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJyb29tVHlwZSIsIndhaXR0aW1lIiwibm9kZUluZm8iLCJnYW1lSUQiLCJzY2VuZXRhZyIsIkJSTk4iLCJyZWFkeXJvb20iLCJvbkNsaWNrIiwibmFtZSIsImNsaWNrX2hlbHAiLCJjbGlja19yZWNvcmQiLCJjbGlja19hZGRnb2xkIiwiY2xpY2tfdXNlcmluZm8iLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInVwZGF0ZVVJIiwiY29uc29sZSIsImxvZyIsInVzZXIiLCJpc1RvdXJpc3QiLCJwYW5lbCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInN1c3BpY2lvdXMiLCJnYW1lIiwiaXNfZ2FtZSIsInNob3dEaWFsb2ciLCJzaG93U2VydmljZSIsInNob3dGaWVsZFNlbGVjdGlvbkp1SHVhIiwicm9vbSIsInJlcU15R2FtZVN0YXRlIiwicGFyZW50IiwidGhlbiIsImVudGVySHVuZHJlZHNSb29tIiwidGFnIiwiZXJyb3IiLCJvbkdhbWVJbmZvbGlzdCIsIm9uUm9vbUluZm8iLCJvbkhhbmRJbmZvIiwib25EZWxldGVSb29tIiwidW5yZWdpc3RlckV2ZW50Iiwib2ZmIiwiYWN0aXZlIiwiY2xlYW5UaW1lciIsImN1dEZsb2F0IiwidmFsdWUiLCJOdW1iZXIiLCJkaXYiLCJ0b1N0cmluZyIsInNob3dVc2VySW5mbyIsInNob3dSZW1vdGVJbWFnZSIsIlBsYXllcmhlYWQiLCJnZXQiLCJjb2luIiwic3RyaW5nIiwiR29sZFRlbXAiLCJzZXRHYW1lSWQiLCJ1cGRhdGVCZ0luZm8iLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2hvcCIsInJlcUV4aXRBcmVhIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwic2V0Iiwia2V5IiwibXNnIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwicm9vbWlkIiwiZGVzdHJveSIsImdhbWVJbmZvVGVzdCIsInNlcnZlclRpbWVPZmYiLCJEYXRlIiwibm93Iiwic2VydmVydGltZSIsInJvb21SZWNvcmQiLCJyb29tcmVjb3JkIiwic2hvd1JlY29yZCIsInJvb21MaXN0Iiwicm9vbWxpc3QiLCJyb29tZGF0YSIsImJldHR5cGUiLCJjb3VudCIsImluZm9Ob2RlIiwiaW5zdGFudGlhdGUiLCJyb29tc2VydmVyaWQiLCJ3YWl0VGltZSIsIk1hdGgiLCJyb3VuZCIsImN1cndhaXR0aW1lIiwicHJvY2VzcyIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50Iiwib25saW5lIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsImNoaWxkcmVuQ291bnQiLCJzdHIiLCJzdWJzdHIiLCJtaW5iZXQiLCJFbnRlclJvb21Hb2xkVGVtcCIsIkNoaXBzIiwibWF4YmV0IiwiTWF4QmV0IiwiRW50cmFuY2VSZXN0cmljdGlvbnMiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIl9wcm9jZXNzIiwic2hvd0Nsb2NrIiwic2V0VGltZU91dCIsInNldEludGVydmFsIiwiX3dhaXRUaW1lIiwicmVjb3JkIiwiaW5kZXgiLCJkb3ROb2RlIiwicmVzdWx0TnVtQXJyIiwiaiIsIl9zcHJpdGVGcmFtZXMiLCJzZXRQb3NpdGlvbiIsInYyIiwic2hvd0VmZmVjdE5vZGUiLCJjbGVhclRpbWVvdXQiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsSUFBTUEsT0FBTyxHQUFHLENBQ2I7QUFBQ0MsRUFBQUEsR0FBRyxFQUFDLEtBQUw7QUFBWUMsRUFBQUEsS0FBSyxFQUFDQyxFQUFFLENBQUNELEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQjtBQUFsQixDQURhLEVBRWI7QUFBQ0QsRUFBQUEsR0FBRyxFQUFDLEtBQUw7QUFBWUMsRUFBQUEsS0FBSyxFQUFDQyxFQUFFLENBQUNELEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixFQUFuQjtBQUFsQixDQUZhLEVBR2I7QUFBQ0QsRUFBQUEsR0FBRyxFQUFDLEtBQUw7QUFBWUMsRUFBQUEsS0FBSyxFQUFDQyxFQUFFLENBQUNELEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQjtBQUFsQixDQUhhLENBQWhCO0FBTURFLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFFcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUU7QUFDREMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLFNBRFI7QUFFRCxpQkFBUztBQUZSLEtBREc7QUFLUkMsSUFBQUEsU0FBUyxFQUFFUixFQUFFLENBQUNTLEtBTE47QUFNUkMsSUFBQUEsT0FBTyxFQUFFVixFQUFFLENBQUNXLElBTko7QUFPUkMsSUFBQUEsV0FBVyxFQUFFWixFQUFFLENBQUNXLElBUFI7QUFRUkUsSUFBQUEsV0FBVyxFQUFFYixFQUFFLENBQUNXLElBUlI7QUFTUkcsSUFBQUEsWUFBWSxFQUFFZCxFQUFF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WSxDQUFDLENBQUQsQ0FBWixHQUFrQixDQUFsQixJQUF1QkEsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQixFQUF6QyxHQUE4QyxNQUFNQSxZQUFZLENBQUMsQ0FBRCxDQUFoRSxHQUFzRUEsWUFBWSxDQUFDLENBQUQsQ0FBdkw7QUFFSCxHQWxZbUI7QUFtWXBCO0FBQ0EzRSxFQUFBQSxVQXBZb0Isd0JBb1lQO0FBQ1QsUUFBSSxLQUFLcUUsVUFBTCxJQUFtQixJQUF2QixFQUE2QjtBQUN6QlksTUFBQUEsWUFBWSxDQUFDLEtBQUtaLFVBQU4sQ0FBWjtBQUNIOztBQUNELFNBQUtBLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxHQXpZbUI7QUEwWXBCYSxFQUFBQSxTQTFZb0IsdUJBMFlSO0FBQ1JoSyxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVvRCxHQUFmLENBQW1CbEQsT0FBTyxDQUFDQyxFQUFSLENBQVdDLGVBQTlCLEVBQThDLElBQTlDO0FBQ0E1QixJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVvRCxHQUFmLENBQW1CbEQsT0FBTyxDQUFDQyxFQUFSLENBQVdHLGVBQTlCLEVBQThDLElBQTlDO0FBQ0E5QixJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVvRCxHQUFmLENBQW1CLFlBQW5CLEVBQWlDLElBQWpDO0FBQ0E1RSxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVvRCxHQUFmLENBQW1CLGdCQUFuQixFQUFvQyxJQUFwQztBQUNBLFNBQUtELGVBQUw7QUFDQSxTQUFLRyxVQUFMO0FBQ0gsR0FqWm1CLENBa1pwQjs7QUFsWm9CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIgY29uc3QgUFJPQ0VTUyA9IFtcclxuICAgIHt0aXA6XCLlh4blpIfkuK1cIiwgY29sb3I6Y2MuY29sb3IoMTM3LCAyMTgsIDI1NSl9LCBcclxuICAgIHt0aXA6XCLkuIvms6jkuK1cIiwgY29sb3I6Y2MuY29sb3IoMTQxLCAyMjIsIDM3KX0sXHJcbiAgICB7dGlwOlwi57uT566X5LitXCIsIGNvbG9yOmNjLmNvbG9yKDIyNiwgMTM3LCAyNTUpfVxyXG5dXHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJHTToge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb2xkQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZWNvcmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZXN1bHQ6IGNjLk5vZGUsXHJcbiAgICAgICAgc3ByaXRlX0F0bGFzOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICByZWNvcmRQcmVmYWIgOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcnVsZVByZWZhYiA6IGNjLlByZWZhYixcclxuICAgICAgICBiYXR0bGVXYXRjaHBpYzogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDIwO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzLlJvb3ROb2RlU2hvdywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMuUm9vdE5vZGVIaWRlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRldXNlckluZm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMucm9vbVR5cGUgPSAxO1xyXG4gICAgICAgIHRoaXMud2FpdHRpbWUgPSB7fTtcclxuICAgICAgICB0aGlzLm5vZGVJbmZvID0ge307XHJcbiAgICB9LFxyXG4gICAgIC8v5Y+R5YyFXHJcbiAgICAgcmVxRW50ZXJBcmVhKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUlEID0gZ2xHYW1lLnNjZW5ldGFnLkJSTk47XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFbnRlckFyZWEoZ2xHYW1lLnNjZW5ldGFnLkJSTk4pO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tcIjogdGhpcy5jbGlja19iYWNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlbHBcIjogdGhpcy5jbGlja19oZWxwKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY29yZFwiOiB0aGlzLmNsaWNrX3JlY29yZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm15Y29pbkluZm9cIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZGJnXCI6IHRoaXMuY2xpY2tfdXNlcmluZm8oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbWdfcmVjaGFyZ2VcIjogXHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2hvbmd6aGlcIjogXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9iYXNlJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2VsZW1lbnRhcnknOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVxRW50ZXJBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfbWVkaXVtJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gMztcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2hpZ2hlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9wbHV0ZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9lbnRlcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9zdGFydCc6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJSTk5fVEVTVCA9PT0+IOeCueWHu+W8gOWni+a4uOaIj1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmlzSGF2ZUVudGVyaWYpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNIYXZlRW50ZXJpZiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaXNIYXZlRW50ZXJpZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMS4wKTtcclxuICAgICAgICAgICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKGdsR2FtZS51c2VyLnN1c3BpY2lvdXMgPT0gMSAmJiBnbEdhbWUudXNlci5nYW1lID09IDIpIHx8IGdsR2FtZS51c2VyLmlzX2dhbWUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIFwi5oKo55qE6LSm5Y+35pWw5o2u5byC5bi477yM5pqC5pe256aB5q2i6L+b5YWl5ri45oiP77yM5aaC5pyJ55aR6Zeu77yM6K+36IGU57O75a6i5pyN77yBXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKClcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEoKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5yb29tLnJlcU15R2FtZVN0YXRlKHRoaXMuZ2FtZUlELCB0aGlzLm5vZGVJbmZvW25vZGUucGFyZW50Lm5hbWVdLnR5cGUsIG5vZGUucGFyZW50Lm5hbWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQlJOTl9URVNUID09PT4g54K55Ye75byA5aeL5ri45oiPIDExMTExXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5yZWFkeXJvb20uZW50ZXJIdW5kcmVkc1Jvb20obm9kZS5wYXJlbnQubmFtZSwgdGhpcy5ub2RlSW5mb1tub2RlLnBhcmVudC5uYW1lXS50YWcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcy5vbkdhbWVJbmZvbGlzdCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcy5vblJvb21JbmZvLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uSGFuZEluZm9fYXJlYVwiLCB0aGlzLm9uSGFuZEluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25EZWxldGVSb29tX2FyZWFcIiwgdGhpcy5vbkRlbGV0ZVJvb20sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8v5LqL5Lu26ZSA5q+BXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIFJvb3ROb2RlU2hvdygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMucmVxRW50ZXJBcmVhKCk7XHJcbiAgICAgICAgdGhpcy53YWl0dGltZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZUhpZGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgY3V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1VzZXJJbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UodGhpcy5QbGF5ZXJoZWFkLCBnbEdhbWUudXNlci5nZXQoXCJoZWFkVVJMXCIpKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGV1c2VySW5mbygpIHtcclxuICAgICAgICBsZXQgY29pbiA9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIilcclxuICAgICAgICB0aGlzLmdvbGRDb3VudC5zdHJpbmcgPSBnbEdhbWUudXNlci5Hb2xkVGVtcChjb2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0R2FtZUlkKGdhbWVpZCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gZ2FtZWlkO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCZ0luZm8oKSB7XHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfdXNlcmluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInVzZXJpbmZvXCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2FkZGdvbGQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dTaG9wKDMwKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19iYWNrKCkge1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRXhpdEFyZWEoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIC8vIOinhOWImVxyXG4gICAgY2xpY2tfaGVscCgpIHtcclxuICAgICAgICAvLyBsZXQgZ2FtZU5hbWUgPSBnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lQnlJRCh0aGlzLmdhbWVpZCk7XHJcbiAgICAgICAgLy8gaWYgKGdhbWVOYW1lID09IFwiZGR6XCIgfHwgZ2FtZU5hbWUgPT0gXCJkenBrXCIpIHtcclxuICAgICAgICAvLyBnbEdhbWUucGFuZWwuc2hvd05ld0dhbWVSdWxlKHRoaXMuZ2FtZWlkLDMwKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGdsR2FtZS5wYW5lbC5zaG93R2FtZVJ1bGUoZ2FtZU5hbWUpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLnJ1bGVQcmVmYWIpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuICAgIC8vIOa4uOaIj+iusOW9lVxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2FtZWlkXCIsIHRoaXMuZ2FtZWlkKVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmdhbWVpZCA9PSAzNiB8fCB0aGlzLmdhbWVpZCA9PSAzNSB8fCB0aGlzLmdhbWVpZCA9PSAzMCkge1xyXG4gICAgICAgIC8vIGdsR2FtZS5wYW5lbC5zaG93TmV3R2FtZVJlY29yZCh0aGlzLmdhbWVpZCwzMCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgZ2xHYW1lLnBhbmVsLnNob3dHYW1lUmVjb3JkKHRoaXMuZ2FtZWlkKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lbCA9IGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy5yZWNvcmRQcmVmYWIpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSxcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xyXG4gICAgfSxcclxuICAgICAgLy/kuovku7blm57osINcclxuICAgIC8v6L+b5YWl5ri45oiP5L+h5oGv5Zue6LCDXHJcbiAgICBvbkRlbGV0ZVJvb20obXNnKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uR2FtZUluZm9saXN0KG1zZykge1xyXG4gICAgICAgIGNjLmxvZyhcIuacjeWKoeerr+WPkemAgeaVsOaNrjIyMlwiLCBtc2cpXHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUluZm9UZXN0ID0gZ2xHYW1lLnJlYWR5cm9vbS5nZXQoXCJnYW1lSW5mb1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5nYW1lSW5mb1Rlc3QnLCB0aGlzLmdhbWVJbmZvVGVzdClcclxuICAgICAgICBpZiAoIXRoaXMuZ2FtZUluZm9UZXN0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJUaW1lT2ZmID0gRGF0ZS5ub3coKSAtIG1zZy5zZXJ2ZXJ0aW1lO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgIH0sXHJcbiAgICBvbkhhbmRJbmZvKG1zZykge1xyXG4gICAgICAgIHRoaXMucm9vbVJlY29yZCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbXJlY29yZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWlluWKsVwiLCB0aGlzLnJvb21SZWNvcmQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLCB0aGlzLnJvb21SZWNvcmRbbXNnLnJvb21pZF0sIG1zZy5yb29taWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uUm9vbUluZm8obXNnKSB7XHJcbiAgICAgICAgLy90aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uUm9vbUluZm8gPT09PiByJylcclxuICAgICAgICB0aGlzLnJvb21MaXN0ID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdDtcclxuICAgICAgICB0aGlzLnNlcnZlclRpbWVPZmYgPSBEYXRlLm5vdygpIC0gbXNnLnNlcnZlcnRpbWU7XHJcbiAgICAgICAgLy9pZiAodGhpcy5nYW1lSW5mby5pZCAhPSBtc2cuZ2FtZWlkKSByZXR1cm5cclxuICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSBtc2cucm9vbWRhdGEuYmV0dHlwZSAmJiB0aGlzLnJvb21UeXBlICE9PSAwKSByZXR1cm5cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWRhdGEucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZWNvcmQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLm5hbWUgPSBgJHttc2cucm9vbWRhdGEucm9vbWlkfWA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLnJvb21zZXJ2ZXJpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG1zZy5yb29tZGF0YS5iZXR0eXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5yb3VuZCgodGhpcy5yb29tTGlzdFttc2cucm9vbWRhdGEuYmV0dHlwZV1bbXNnLnJvb21kYXRhLnJvb21pZF0uY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZXNzID0gdGhpcy5yb29tTGlzdFttc2cucm9vbWRhdGEuYmV0dHlwZV1bbXNnLnJvb21kYXRhLnJvb21pZF0ucHJvY2VzcyAtIDE7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwibGFiX3RpbWVcIikuY29sb3IgPSBwcm9jZXNzID09IDEgJiYgd2FpdFRpbWUgPCA0ID8gY2MuY29sb3IoMjU1LCA5NiwgNDcpIDogUFJPQ0VTU1twcm9jZXNzXS5jb2xvcjtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke1BST0NFU1NbcHJvY2Vzc10udGlwfToke3dhaXRUaW1lfVNgO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lUGVvcGxlJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYl9vbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnLnJvb21kYXRhLnJvb21pZDtcclxuICAgICAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQoaW5mb05vZGUsIHRoaXMucm9vbVJlY29yZFttc2cucm9vbWRhdGEucm9vbWlkXSwgbXNnLnJvb21kYXRhLnJvb21pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWRhdGEucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2FpdFRpbWUgPSBNYXRoLnJvdW5kKChtc2cucm9vbWRhdGEuY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ucHJvY2VzcyA9IG1zZy5yb29tZGF0YS5wcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZVBlb3BsZScpLmdldENoaWxkQnlOYW1lKCdsYWJfb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2cucm9vbWRhdGEub25saW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5pu05pawVUlcclxuICAgIHVwZGF0ZVVJKCkge1xyXG4gICAgICAgIHRoaXMucm9vbUxpc3QgPSBbXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdFt0aGlzLnJvb21UeXBlXSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb21MaXN0LnB1c2goZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdFt0aGlzLnJvb21UeXBlXVtrZXldKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yb29tTGlzdC5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmJldHR5cGUgLSBiLmJldHR5cGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgIGlmICghdGhpcy5yb29tTGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYW5UaW1lcigpO1xyXG4gICAgICAgIGZvciAobGV0IHJvb21pZCBpbiB0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yb29tTGlzdFtyb29taWRdKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaW5mb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVjb3JkKTtcclxuICAgICAgICAgICAgaW5mb05vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5uYW1lID0gYCR7dGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZH1gO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVJbmZvW2luZm9Ob2RlLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgdGFnOiB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbXNlcnZlcmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RyID0gdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgncm9vbUlkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHIubGVuZ3RoID4gNSA/IHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIDUpIDogc3RyO1xyXG5cclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZVBlb3BsZScpLmdldENoaWxkQnlOYW1lKCdsYWJfb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0Tm9kZScpLmdldENoaWxkQnlOYW1lKCdjaGlwbGltaXQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1pbmJldCArIFwiLVwiICsgbWF4YmV0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkVudHJhbmNlUmVzdHJpY3Rpb25zIDw9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIikgJiYgIWdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcImZsYXNoXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX2ppbnJ1eW91eGlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJhdHRsZVdhdGNocGljO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgd2FpdFRpbWUgPSBNYXRoLnJvdW5kKCh0aGlzLnJvb21MaXN0W3Jvb21pZF0uY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnByb2Nlc3MgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2VzcztcclxuICAgICAgICAgICAgbGV0IF9wcm9jZXNzID0gdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3MgLSAxO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmNvbG9yID0gX3Byb2Nlc3MgPT0gMSAmJiB3YWl0VGltZSA8IDQgPyBjYy5jb2xvcigyNTUsIDk2LCA0NykgOiBQUk9DRVNTW19wcm9jZXNzXS5jb2xvcjtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke1BST0NFU1NbX3Byb2Nlc3NdLnRpcH06JHt3YWl0VGltZX1TYDtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0sIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dDbG9jaygpO1xyXG4gICAgfSxcclxuICAgIC8v5pi+56S65YCS6K6h5pe2XHJcbiAgICBzaG93Q2xvY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lT3V0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ud2FpdFRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfcHJvY2VzcyA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5wcm9jZXNzIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX3dhaXRUaW1lID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmNvbG9yID0gX3Byb2Nlc3MgPT0gMSAmJiBfd2FpdFRpbWUgPCA0ID8gY2MuY29sb3IoMjU1LCA5NiwgNDcpIDogUFJPQ0VTU1tfcHJvY2Vzc10uY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwibGFiX3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHtQUk9DRVNTW19wcm9jZXNzXS50aXB9OiR7X3dhaXRUaW1lfVNgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH0sXHJcbiAgICBzaG93UmVjb3JkKG5vZGUsIHJlY29yZCwgcm9vbWlkKSB7XHJcbiAgICAgICAgaWYgKCFyZWNvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IHJlY29yZC5sZW5ndGggPiAxMD9yZWNvcmQubGVuZ3RoIC0gMTA6MDtcclxuICAgICAgICBsZXQgZG90Tm9kZTtcclxuXHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgcmVzdWx0TnVtQXJyID0gWzAsIDAsIDAsIDBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIHJlY29yZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGogPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG90Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXVtqXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19jaGEnXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19nb3UnXTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHROdW1BcnJbaiAtIDFdICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLnBhcmVudCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBkb3ROb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xNjAgKyAoaSAtIGluZGV4KSAqIDYzLjUsIDExMCAtIChOdW1iZXIoaikgLSAxKSAqIDcwKSk7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xMDUgKyAoaSAtIGluZGV4KSAqIDQ3LjUsIDgyLjUgLSAoTnVtYmVyKGopIC0gMSkgKiA1Mi41KSk7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpLCAwLjAyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImZyYW1lX25ld1wiKS5hY3RpdmUgPSByZWNvcmQubGVuZ3RoICE9IDA7XHJcbiAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImZyYW1lX25ld1wiKS54ID0gcmVjb3JkLmxlbmd0aCA+IDIwID8gLTM4MCArIDE5ICogNDIuMyA6IC0zODAgKyAocmVjb3JkLmxlbmd0aCAtIDEpICogNDIuM1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfbGVmdCcpLmdldENoaWxkQnlOYW1lKCd0aWFuJykuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXN1bHROdW1BcnJbMF0gPiAwICYmIHJlc3VsdE51bUFyclswXSA8IDEwID8gJzAnICsgcmVzdWx0TnVtQXJyWzBdIDogcmVzdWx0TnVtQXJyWzBdO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfbGVmdCcpLmdldENoaWxkQnlOYW1lKCdkaScpLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzdWx0TnVtQXJyWzFdID4gMCAmJiByZXN1bHROdW1BcnJbMV0gPCAxMCA/ICcwJyArIHJlc3VsdE51bUFyclsxXSA6IHJlc3VsdE51bUFyclsxXTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2xlZnQnKS5nZXRDaGlsZEJ5TmFtZSgneHVhbicpLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzdWx0TnVtQXJyWzJdID4gMCAmJiByZXN1bHROdW1BcnJbMl0gPCAxMCA/ICcwJyArIHJlc3VsdE51bUFyclsyXSA6IHJlc3VsdE51bUFyclsyXTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2xlZnQnKS5nZXRDaGlsZEJ5TmFtZSgnaHVhbmcnKS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlc3VsdE51bUFyclszXSA+IDAgJiYgcmVzdWx0TnVtQXJyWzNdIDwgMTAgPyAnMCcgKyByZXN1bHROdW1BcnJbM10gOiByZXN1bHROdW1BcnJbM107XHJcblxyXG4gICAgfSxcclxuICAgIC8v5riF55CG5YCS6K6h5pe2XHJcbiAgICBjbGVhblRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldFRpbWVPdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZXRUaW1lT3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lT3V0ID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJub2RlUmVtb3ZlXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZVVzZXJEYXRhXCIsdGhpcyk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
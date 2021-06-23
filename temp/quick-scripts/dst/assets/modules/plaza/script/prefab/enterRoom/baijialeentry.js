
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/baijialeentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70168CXi4BDxZKBPjTuFQ5z', 'baijialeentry');
// modules/plaza/script/prefab/enterRoom/baijialeentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    sprite_Atlas: cc.SpriteAtlas,
    rulePrefab: cc.Prefab,
    recordPrefab: cc.Prefab,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
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
    this.gameState = {
      0: cc.color(255, 96, 47),
      1: cc.color(137, 218, 255),
      2: cc.color(141, 222, 37),
      3: cc.color(226, 137, 255),
      4: cc.color(226, 137, 255)
    };
    this.stateWord = {
      1: "休息中",
      2: "下注中",
      3: "结算中",
      4: "洗牌中"
    };
    this.isUpdateTrend = {};
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.BAIJIALE;
    glGame.readyroom.reqEnterArea(glGame.scenetag.BAIJIALE);
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
        console.error("no find button name -> %s", name);
    }
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
    this.nodeInfo = {};
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
    var rulePrefab = glGame.panel.showPanel(this.rulePrefab);
    rulePrefab.zIndex = 30;
  },
  click_record: function click_record() {
    var recordPrefab = glGame.panel.showPanel(this.recordPrefab);
    recordPrefab.zIndex = 30;
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
        this.showRecord(this.content.children[i], this.roomRecord[msg.roomid], msg.roomid);
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
      var waitTime = Math.floor((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
      infoNode.getChildByName('roomId').getChildByName('lab_roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[msg.roomdata.bettype].Chips[0]),
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

    for (var _i = 0; _i < this.content.children.length; _i++) {
      if (this.content.children[_i].name == msg.roomdata.roomid) {
        var _waitTime = Math.floor((msg.roomdata.curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

        this.content.children[_i].waitTime = _waitTime;
        this.content.children[_i].getChildByName("time").getComponent(cc.Label).string = _waitTime + "s";
        this.content.children[_i].getChildByName("gamestate").color = this.gameState[msg.roomdata.process];
        this.content.children[_i].getChildByName("time").color = this.gameState[msg.roomdata.process];
        this.content.children[_i].process = msg.roomdata.process;
        this.content.children[_i].getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[msg.roomdata.process];
        this.content.children[_i].getChildByName('onlineNum').getComponent(cc.Label).string = msg.roomdata.online;
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
      infoNode.getChildByName('roomId').getChildByName('lab_roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      infoNode.getChildByName('chiplimit').getComponent(cc.Label).string = minbet + "~" + maxbet;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("enter").active = true;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = false;
      } else {
        infoNode.getChildByName("btn_enter").getChildByName("enter").active = false;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = true;
      }

      infoNode.getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[this.roomList[roomid].process];
      infoNode.process = this.roomList[roomid].process;
      var waitTime = Math.floor((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      infoNode.getChildByName("time").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName("gamestate").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName('time').getComponent(cc.Label).string = waitTime + "s";
      this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
    }

    this.showClock();
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  //显示倒计时
  showClock: function showClock() {
    var _this2 = this;

    this.setTimeOut = setInterval(function () {
      if (_this2.content.children) {
        for (var i = 0; i < _this2.content.children.length; i++) {
          _this2.content.children[i].waitTime -= 1;

          if (_this2.content.children[i].waitTime <= 0) {
            _this2.content.children[i].waitTime = 0;
          }

          if (_this2.content.children[i].waitTime <= 3 && _this2.content.children[i].process == 2) {
            _this2.content.children[i].getChildByName("gamestate").color = _this2.gameState[0];
            _this2.content.children[i].getChildByName("time").color = _this2.gameState[0];
          }

          _this2.content.children[i].getChildByName("time").getComponent(cc.Label).string = _this2.content.children[i].waitTime + "s";
        }
      }
    }, 1000);
  },
  showRecord: function showRecord(node, record, roomid) {
    if (!record) {
      return;
    }

    var index = 0;
    var dotNode;
    var row = 0,
        col = 0;
    node.getChildByName('node_dot').destroyAllChildren();
    node.getChildByName('node_dot').removeAllChildren();
    this.showSmallTrend(node, record, roomid);
    index = 0;
    row = 0;
    col = 0;
    var recordArr = [];
    index = this.getIndex(record);

    for (var i = index; i < record.length; i++) {
      var isChangeRow = false;

      for (var j = 0; j < record[i].count; j++) {
        var labelColor = null;
        dotNode = cc.instantiate(this.node_result);

        if (record[i].result == 1) {
          labelColor = cc.Color(179, 6, 7);
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hongquan'];
        } else if (record[i].result == 2) {
          labelColor = cc.color(30, 2, 3);
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_heiquan'];
        }

        if (record[i].he) {
          for (var k = 0; k < record[i].he.length; k++) {
            if (record[i].he[k].index - 1 == j) {
              dotNode.children[0].active = true;
              dotNode.children[0].getComponent(cc.Label).string = record[i].he[k].num;
              dotNode.children[0].color = labelColor;
            }
          }
        }

        dotNode.parent = node.getChildByName('node_dot');
        var newCol = col;
        var newRow = row;

        while (newRow > 5) {
          newRow--;
          newCol++;
        }

        for (var _k = 0; _k < recordArr.length; _k++) {
          if (newRow == recordArr[_k][0] && newCol == recordArr[_k][1]) {
            isChangeRow = true;
          }
        }

        if (isChangeRow) {
          newRow--;
        }

        dotNode.setPosition(cc.v2(-343 + newCol * 43, 84 - newRow * 36));
        recordArr.push([newRow, newCol]);

        if (this.isUpdateTrend[roomid]) {
          dotNode.active = true;
        }

        row++;
      }

      col++;
      row = 0;
    }

    if (!this.isUpdateTrend[roomid]) {
      glGame.panel.showEffectNode(this, node.getChildByName('node_dot'), 0.02, true);
      this.isUpdateTrend[roomid] = true;
    }
  },
  //显示当前的小路
  showSmallTrend: function showSmallTrend(node, record, roomid) {
    var roundRecord = [],
        dotNode;
    node.getChildByName("trend").destroyAllChildren();
    node.getChildByName("trend").removeAllChildren();

    for (var i = 0; i < record.length; i++) {
      for (var j = 0; j < record[i].count; j++) {
        roundRecord.push(record[i].result);

        if (record[i].he) {
          for (var k = 0; k < record[i].he.length; k++) {
            if (record[i].he[k].index - 1 == j) {
              for (var z = 0; z < record[i].he[k].num; z++) {
                roundRecord.push(3);
              }
            }
          }
        }
      }
    }

    var doublerecord = glGame.readyroom.doublerecord[roomid];
    var index = roundRecord.length > 15 ? roundRecord.length - 15 : 0;

    for (var _i2 = index; _i2 < roundRecord.length; _i2++) {
      dotNode = cc.instantiate(this.node_result);
      dotNode.parent = node.getChildByName("trend");

      if (roundRecord[_i2] == 1) {
        dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_zhuang'];
      } else if (roundRecord[_i2] == 2) {
        dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_xian'];
      } else if (roundRecord[_i2] == 3) {
        dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_he'];
      }

      if (doublerecord[_i2] == 1) {
        dotNode.children[1].active = true;
      } else if (doublerecord[_i2] == 2) {
        dotNode.children[2].active = true;
      } else if (doublerecord[_i2] == 3) {
        dotNode.children[1].active = true;
        dotNode.children[2].active = true;
      }

      dotNode.active = true;
    }
  },
  getIndex: function getIndex(record) {
    var index = 0;

    if (record.length > 17) {
      index = record.length - 17;
    }

    for (var j = index; j < record.length; j++) {
      if (j - index + record[j].count >= 29) {
        index += j - index + record[j].count - 29;
      }
    }

    return index;
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
    this.cleanTimer();
    this.unregisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGJhaWppYWxlZW50cnkuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImdvbGRDb3VudCIsImNjIiwiTGFiZWwiLCJjb250ZW50IiwiTm9kZSIsIm5vZGVfcmVjb3JkIiwibm9kZV9yZXN1bHQiLCJzcHJpdGVfQXRsYXMiLCJTcHJpdGVBdGxhcyIsInJ1bGVQcmVmYWIiLCJQcmVmYWIiLCJyZWNvcmRQcmVmYWIiLCJCR00iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImF1ZGlvIiwicGxheUJHTSIsImVtaXR0ZXIiLCJvbiIsImNsaWNrX2JhY2siLCJNRVNTQUdFIiwiVUkiLCJST09NX0VOVEVSX1NIT1ciLCJSb290Tm9kZVNob3ciLCJST09NX0VOVEVSX0hJREUiLCJSb290Tm9kZUhpZGUiLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJyb29tVHlwZSIsIm5vZGVJbmZvIiwiZ2FtZVN0YXRlIiwiY29sb3IiLCJzdGF0ZVdvcmQiLCJpc1VwZGF0ZVRyZW5kIiwiZ2FtZUlEIiwic2NlbmV0YWciLCJCQUlKSUFMRSIsInJlYWR5cm9vbSIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfaGVscCIsImNsaWNrX3JlY29yZCIsImNsaWNrX2FkZGdvbGQiLCJjbGlja191c2VyaW5mbyIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsInJlbW92ZUFsbENoaWxkcmVuIiwidXBkYXRlVUkiLCJ1c2VyIiwiaXNUb3VyaXN0IiwicGFuZWwiLCJzaG93UmVnaXN0ZXJlZEdpZnQiLCJzdXNwaWNpb3VzIiwiZ2FtZSIsImlzX2dhbWUiLCJzaG93RGlhbG9nIiwic2hvd1NlcnZpY2UiLCJzaG93RmllbGRTZWxlY3Rpb25KdUh1YSIsInJvb20iLCJyZXFNeUdhbWVTdGF0ZSIsInBhcmVudCIsInRoZW4iLCJlbnRlckh1bmRyZWRzUm9vbSIsInRhZyIsImNvbnNvbGUiLCJlcnJvciIsImFjdGl2ZSIsImNsZWFuVGltZXIiLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvbkdhbWVJbmZvbGlzdCIsIm9uUm9vbUluZm8iLCJvbkhhbmRJbmZvIiwib25EZWxldGVSb29tIiwib2ZmIiwiY3V0RmxvYXQiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwic2hvd1VzZXJJbmZvIiwic2hvd1JlbW90ZUltYWdlIiwiUGxheWVyaGVhZCIsImdldCIsImNvaW4iLCJzdHJpbmciLCJHb2xkVGVtcCIsInNldEdhbWVJZCIsInVwZGF0ZUJnSW5mbyIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dTaG9wIiwicmVxRXhpdEFyZWEiLCJyZW1vdmUiLCJzaG93UGFuZWwiLCJzZXQiLCJrZXkiLCJtc2ciLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJyb29taWQiLCJkZXN0cm95IiwiZ2FtZUluZm9UZXN0Iiwic2VydmVyVGltZU9mZiIsIkRhdGUiLCJub3ciLCJzZXJ2ZXJ0aW1lIiwicm9vbVJlY29yZCIsInJvb21yZWNvcmQiLCJzaG93UmVjb3JkIiwicm9vbUxpc3QiLCJyb29tbGlzdCIsInJvb21kYXRhIiwiYmV0dHlwZSIsImNvdW50IiwiaW5mb05vZGUiLCJpbnN0YW50aWF0ZSIsInJvb21zZXJ2ZXJpZCIsIndhaXRUaW1lIiwiTWF0aCIsImZsb29yIiwiY3Vyd2FpdHRpbWUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIm9ubGluZSIsIm1pbmJldCIsIkVudGVyUm9vbUdvbGRUZW1wIiwiQ2hpcHMiLCJtYXhiZXQiLCJNYXhCZXQiLCJFbnRyYW5jZVJlc3RyaWN0aW9ucyIsInByb2Nlc3MiLCJwdXNoIiwic29ydCIsImEiLCJiIiwiY2hpbGRyZW5Db3VudCIsInN0ciIsInN1YnN0ciIsInNob3dDbG9jayIsImdldEZsb2F0Iiwic2V0VGltZU91dCIsInNldEludGVydmFsIiwicmVjb3JkIiwiaW5kZXgiLCJkb3ROb2RlIiwicm93IiwiY29sIiwic2hvd1NtYWxsVHJlbmQiLCJyZWNvcmRBcnIiLCJnZXRJbmRleCIsImlzQ2hhbmdlUm93IiwiaiIsImxhYmVsQ29sb3IiLCJyZXN1bHQiLCJDb2xvciIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiX3Nwcml0ZUZyYW1lcyIsImhlIiwiayIsIm51bSIsIm5ld0NvbCIsIm5ld1JvdyIsInNldFBvc2l0aW9uIiwidjIiLCJzaG93RWZmZWN0Tm9kZSIsInJvdW5kUmVjb3JkIiwieiIsImRvdWJsZXJlY29yZCIsImNsZWFyVGltZW91dCIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxLQUROO0FBRVJDLElBQUFBLE9BQU8sRUFBRUYsRUFBRSxDQUFDRyxJQUZKO0FBR1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDRyxJQUhSO0FBSVJFLElBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDRyxJQUpSO0FBS1JHLElBQUFBLFlBQVksRUFBRU4sRUFBRSxDQUFDTyxXQUxUO0FBTVJDLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDUyxNQU5QO0FBT1JDLElBQUFBLFlBQVksRUFBQ1YsRUFBRSxDQUFDUyxNQVBSO0FBUVJFLElBQUFBLEdBQUcsRUFBQztBQUNBQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ2EsU0FEUjtBQUVBLGlCQUFRO0FBRlI7QUFSSSxHQUZRO0FBZ0JwQjtBQUVBQyxFQUFBQSxNQWxCb0Isb0JBa0JYO0FBQ0wsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsRUFBbkI7QUFDQXRCLElBQUFBLE1BQU0sQ0FBQ3VCLEtBQVAsQ0FBYUMsT0FB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SUFBbEI7QUFDSCxHQTFkbUI7QUEyZHBCOEIsRUFBQUEsU0EzZG9CLHVCQTJkUjtBQUNSbEwsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFld0QsR0FBZixDQUFtQnJELE9BQU8sQ0FBQ0MsRUFBUixDQUFXQyxlQUE5QixFQUErQyxJQUEvQztBQUNBOUIsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFld0QsR0FBZixDQUFtQnJELE9BQU8sQ0FBQ0MsRUFBUixDQUFXRyxlQUE5QixFQUErQyxJQUEvQztBQUNBaEMsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFld0QsR0FBZixDQUFtQixZQUFuQixFQUFpQyxJQUFqQztBQUNBakYsSUFBQUEsTUFBTSxDQUFDeUIsT0FBUCxDQUFld0QsR0FBZixDQUFtQixnQkFBbkIsRUFBcUMsSUFBckM7QUFDQSxTQUFLTixVQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNILEdBbGVtQixDQW1lcEI7O0FBbmVvQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnb2xkQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZWNvcmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9yZXN1bHQ6IGNjLk5vZGUsXHJcbiAgICAgICAgc3ByaXRlX0F0bGFzOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICBydWxlUHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcmVjb3JkUHJlZmFiOmNjLlByZWZhYixcclxuICAgICAgICBCR006e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDIwO1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5QkdNKHRoaXMuQkdNKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlJPT01fRU5URVJfU0hPVywgdGhpcy5Sb290Tm9kZVNob3csIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9ISURFLCB0aGlzLlJvb3ROb2RlSGlkZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzLnVwZGF0ZXVzZXJJbmZvLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZXVzZXJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLnJvb21UeXBlID0gMTtcclxuICAgICAgICB0aGlzLm5vZGVJbmZvID0ge307XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB7IDA6IGNjLmNvbG9yKDI1NSwgOTYsIDQ3KSwgMTogY2MuY29sb3IoMTM3LCAyMTgsIDI1NSksIDI6IGNjLmNvbG9yKDE0MSwgMjIyLCAzNyksIDM6IGNjLmNvbG9yKDIyNiwgMTM3LCAyNTUpLDQ6IGNjLmNvbG9yKDIyNiwgMTM3LCAyNTUpIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZVdvcmQgPSB7IDE6IFwi5LyR5oGv5LitXCIsIDI6IFwi5LiL5rOo5LitXCIsIDM6IFwi57uT566X5LitXCIsIDQ6IFwi5rSX54mM5LitXCIgfTtcclxuICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgIH0sXHJcbiAgICAvL+WPkeWMhVxyXG4gICAgcmVxRW50ZXJBcmVhKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUlEID0gZ2xHYW1lLnNjZW5ldGFnLkJBSUpJQUxFO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5CQUlKSUFMRSk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYmFja1wiOiB0aGlzLmNsaWNrX2JhY2soKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5faGVscFwiOiB0aGlzLmNsaWNrX2hlbHAoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVjb3JkXCI6IHRoaXMuY2xpY2tfcmVjb3JkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibXljb2luSW5mb1wiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkYmdcIjogdGhpcy5jbGlja191c2VyaW5mbygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jaG9uZ3poaVwiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9hbGwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2Jhc2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2VsZW1lbnRhcnknOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX21lZGl1bSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNVcGRhdGVUcmVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfaGlnaGVyJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gNDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9wbHV0ZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdidG5fZW50ZXInOlxyXG4gICAgICAgICAgICBjYXNlICdidG5fc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgoZ2xHYW1lLnVzZXIuc3VzcGljaW91cyA9PSAxICYmIGdsR2FtZS51c2VyLmdhbWUgPT0gMikgfHwgZ2xHYW1lLnVzZXIuaXNfZ2FtZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCJcIiwgXCLmgqjnmoTotKblj7fmlbDmja7lvILluLjvvIzmmoLml7bnpoHmraLov5vlhaXmuLjmiI/vvIzlpoLmnInnlpHpl67vvIzor7fogZTns7vlrqLmnI3vvIFcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1NlcnZpY2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB9LCBcIuaIkeefpemBk+S6hlwiLCBcIuiBlOezu+WuouacjVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RmllbGRTZWxlY3Rpb25KdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnJvb20ucmVxTXlHYW1lU3RhdGUodGhpcy5nYW1lSUQsIHRoaXMubm9kZUluZm9bbm9kZS5wYXJlbnQubmFtZV0udHlwZSwgbm9kZS5wYXJlbnQubmFtZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5lbnRlckh1bmRyZWRzUm9vbShub2RlLnBhcmVudC5uYW1lLCB0aGlzLm5vZGVJbmZvW25vZGUucGFyZW50Lm5hbWVdLnRhZyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBSb290Tm9kZVNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLm5vZGVJbmZvID0ge307XHJcbiAgICB9LFxyXG4gICAgUm9vdE5vZGVIaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tuebkeWQrFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcy5vbkdhbWVJbmZvbGlzdCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcy5vblJvb21JbmZvLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uSGFuZEluZm9fYXJlYVwiLCB0aGlzLm9uSGFuZEluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25EZWxldGVSb29tX2FyZWFcIiwgdGhpcy5vbkRlbGV0ZVJvb20sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8v5LqL5Lu26ZSA5q+BXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGN1dEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIHNob3dVc2VySW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKHRoaXMuUGxheWVyaGVhZCwgZ2xHYW1lLnVzZXIuZ2V0KFwiaGVhZFVSTFwiKSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRldXNlckluZm8oKSB7XHJcbiAgICAgICAgbGV0IGNvaW4gPSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpXHJcbiAgICAgICAgdGhpcy5nb2xkQ291bnQuc3RyaW5nID0gZ2xHYW1lLnVzZXIuR29sZFRlbXAoY29pbik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEdhbWVJZChnYW1laWQpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IGdhbWVpZDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQmdJbmZvKCkge1xyXG4gICAgfSxcclxuICAgIGNsaWNrX3VzZXJpbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJ1c2VyaW5mb1wiKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19hZGRnb2xkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgzMCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYmFjaygpIHtcclxuICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUV4aXRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19oZWxwKCkge1xyXG4gICAgICAgIGxldCBydWxlUHJlZmFiID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLnJ1bGVQcmVmYWIpO1xyXG4gICAgICAgIHJ1bGVQcmVmYWIuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIGxldCByZWNvcmRQcmVmYWIgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMucmVjb3JkUHJlZmFiKTtcclxuICAgICAgICByZWNvcmRQcmVmYWIuekluZGV4ID0gMzBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tuWbnuiwg1xyXG4gICAgLy/ov5vlhaXmuLjmiI/kv6Hmga/lm57osINcclxuICAgIG9uRGVsZXRlUm9vbShtc2cpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25HYW1lSW5mb2xpc3QobXNnKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUluZm9UZXN0ID0gZ2xHYW1lLnJlYWR5cm9vbS5nZXQoXCJnYW1lSW5mb1wiKTtcclxuICAgICAgICBpZiAoIXRoaXMuZ2FtZUluZm9UZXN0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJUaW1lT2ZmID0gRGF0ZS5ub3coKSAtIG1zZy5zZXJ2ZXJ0aW1lO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgIH0sXHJcbiAgICBvbkhhbmRJbmZvKG1zZykge1xyXG4gICAgICAgIHRoaXMucm9vbVJlY29yZCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbXJlY29yZDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKHRoaXMuY29udGVudC5jaGlsZHJlbltpXSwgdGhpcy5yb29tUmVjb3JkW21zZy5yb29taWRdLCBtc2cucm9vbWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblJvb21JbmZvKG1zZykge1xyXG4gICAgICAgIHRoaXMucm9vbUxpc3QgPSBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0O1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZU9mZiA9IERhdGUubm93KCkgLSBtc2cuc2VydmVydGltZTtcclxuICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSBtc2cucm9vbWRhdGEuYmV0dHlwZSAmJiB0aGlzLnJvb21UeXBlICE9PSAwKSByZXR1cm5cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWRhdGEucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZWNvcmQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLm5hbWUgPSBgJHttc2cucm9vbWRhdGEucm9vbWlkfWA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLnJvb21zZXJ2ZXJpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG1zZy5yb29tZGF0YS5iZXR0eXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5mbG9vcigodGhpcy5yb29tTGlzdFttc2cucm9vbWRhdGEuYmV0dHlwZV1bbXNnLnJvb21kYXRhLnJvb21pZF0uY3Vyd2FpdHRpbWUgLSAoRGF0ZS5ub3coKSAtIHRoaXMuc2VydmVyVGltZU9mZikpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENoaWxkQnlOYW1lKCdsYWJfcm9vbUlkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2cucm9vbWRhdGEucm9vbWlkO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtaW5iZXQgKyBcIn5cIiArIG1heGJldDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZUluZm9UZXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXS5FbnRyYW5jZVJlc3RyaWN0aW9ucyA8PSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpICYmICFnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlbnRlclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRjaFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiZW50ZXJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcIndhdGNoXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQoaW5mb05vZGUsIHRoaXMucm9vbVJlY29yZFttc2cucm9vbWRhdGEucm9vbWlkXSwgbXNnLnJvb21kYXRhLnJvb21pZCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21kYXRhLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5mbG9vcigobXNnLnJvb21kYXRhLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gd2FpdFRpbWUgKyBcInNcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImdhbWVzdGF0ZVwiKS5jb2xvciA9IHRoaXMuZ2FtZVN0YXRlW21zZy5yb29tZGF0YS5wcm9jZXNzXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuY29sb3IgPSB0aGlzLmdhbWVTdGF0ZVttc2cucm9vbWRhdGEucHJvY2Vzc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ucHJvY2VzcyA9IG1zZy5yb29tZGF0YS5wcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5zdGF0ZVdvcmRbbXNnLnJvb21kYXRhLnByb2Nlc3NdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1zZy5yb29tZGF0YS5vbmxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrBVSVxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUxpc3QucHVzaChnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdW2tleV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvb21MaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuYmV0dHlwZSAtIGIuYmV0dHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgcm9vbWlkIGluIHRoaXMucm9vbUxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0W3Jvb21pZF0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpbmZvTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZWNvcmQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLm5hbWUgPSBgJHt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkfWA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdyb29tSWQnKS5nZXRDaGlsZEJ5TmFtZSgnbGFiX3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyLmxlbmd0aCA+IDUgPyBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSA1KSA6IHN0cjtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZU51bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5yb29tTGlzdFtyb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgbGV0IG1pbmJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5DaGlwc1swXSksXHJcbiAgICAgICAgICAgICAgICBtYXhiZXQgPSBnbEdhbWUudXNlci5FbnRlclJvb21Hb2xkVGVtcCh0aGlzLmdhbWVJbmZvVGVzdFt0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZV0uTWF4QmV0KTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NoaXBsaW1pdCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWluYmV0ICsgXCJ+XCIgKyBtYXhiZXQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVJbmZvVGVzdFt0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZV0uRW50cmFuY2VSZXN0cmljdGlvbnMgPD0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSAmJiAhZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiZW50ZXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwid2F0Y2hcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcImVudGVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRjaFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5zdGF0ZVdvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3NdXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnByb2Nlc3MgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2VzcztcclxuICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5mbG9vcigodGhpcy5yb29tTGlzdFtyb29taWRdLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS53YWl0VGltZSA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuY29sb3IgPSB3YWl0VGltZSA8PSAzICYmIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzID09IDIgPyB0aGlzLmdhbWVTdGF0ZVswXSA6IHRoaXMuZ2FtZVN0YXRlW3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzXTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lc3RhdGVcIikuY29sb3IgPSB3YWl0VGltZSA8PSAzICYmIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzID09IDIgPyB0aGlzLmdhbWVTdGF0ZVswXSA6IHRoaXMuZ2FtZVN0YXRlW3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzXTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdhaXRUaW1lICsgXCJzXCJcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0sIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dDbG9jaygpO1xyXG4gICAgfSxcclxuICAgIC8v5qGM6Z2i5pWw5o2u55qE5pi+56S6XHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICAvL+aYvuekuuWAkuiuoeaXtlxyXG4gICAgc2hvd0Nsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGltZU91dCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ud2FpdFRpbWUgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSA8PSAzICYmIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5wcm9jZXNzID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuY29sb3IgPSB0aGlzLmdhbWVTdGF0ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSArIFwic1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1JlY29yZChub2RlLCByZWNvcmQsIHJvb21pZCkge1xyXG4gICAgICAgIGlmICghcmVjb3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBkb3ROb2RlO1xyXG4gICAgICAgIGxldCByb3cgPSAwLFxyXG4gICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90JykuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NtYWxsVHJlbmQobm9kZSwgcmVjb3JkLCByb29taWQpO1xyXG4gICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgbGV0IHJlY29yZEFyciA9IFtdO1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleChyZWNvcmQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNDaGFuZ2VSb3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWNvcmRbaV0uY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5yZXN1bHQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjYy5Db2xvcigxNzksIDYsIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfaG9uZ3F1YW4nXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjb3JkW2ldLnJlc3VsdCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxDb2xvciA9IGNjLmNvbG9yKDMwLCAyLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2hlaXF1YW4nXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZWNvcmRbaV0uaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlY29yZFtpXS5oZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ldLmhlW2tdLmluZGV4IC0gMSA9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVjb3JkW2ldLmhlW2tdLm51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMF0uY29sb3IgPSBsYWJlbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5wYXJlbnQgPSBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbCA9IGNvbDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3c7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobmV3Um93ID4gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvdy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NvbCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZWNvcmRBcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Um93ID09IHJlY29yZEFycltrXVswXSAmJiBuZXdDb2wgPT0gcmVjb3JkQXJyW2tdWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlUm93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDaGFuZ2VSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSb3ctLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTM0MyArIG5ld0NvbCAqIDQzLCA4NCAtIG5ld1JvdyAqIDM2KSk7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRBcnIucHVzaChbbmV3Um93LCBuZXdDb2xdKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNVcGRhdGVUcmVuZFtyb29taWRdKXtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbCsrO1xyXG4gICAgICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5pc1VwZGF0ZVRyZW5kW3Jvb21pZF0pe1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyxub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpLDAuMDIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNVcGRhdGVUcmVuZFtyb29taWRdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mmL7npLrlvZPliY3nmoTlsI/ot69cclxuICAgIHNob3dTbWFsbFRyZW5kKG5vZGUsIHJlY29yZCwgcm9vbWlkKSB7XHJcbiAgICAgICAgbGV0IHJvdW5kUmVjb3JkID0gW10sIGRvdE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcInRyZW5kXCIpLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0cmVuZFwiKS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlY29yZFtpXS5jb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICByb3VuZFJlY29yZC5wdXNoKHJlY29yZFtpXS5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ldLmhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZWNvcmRbaV0uaGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZVtrXS5pbmRleCAtIDEgPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCByZWNvcmRbaV0uaGVba10ubnVtOyB6KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZFJlY29yZC5wdXNoKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZG91YmxlcmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5kb3VibGVyZWNvcmRbcm9vbWlkXVxyXG4gICAgICAgIGxldCBpbmRleCA9IHJvdW5kUmVjb3JkLmxlbmd0aCA+IDE1ID8gcm91bmRSZWNvcmQubGVuZ3RoIC0gMTUgOiAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJvdW5kUmVjb3JkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRvdE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVzdWx0KTtcclxuICAgICAgICAgICAgZG90Tm9kZS5wYXJlbnQgPSBub2RlLmdldENoaWxkQnlOYW1lKFwidHJlbmRcIik7XHJcbiAgICAgICAgICAgIGlmIChyb3VuZFJlY29yZFtpXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX3podWFuZyddO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvdW5kUmVjb3JkW2ldID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfeGlhbiddO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvdW5kUmVjb3JkW2ldID09IDMpIHtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfaGUnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZG91YmxlcmVjb3JkW2ldID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkb3VibGVyZWNvcmRbaV0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvdWJsZXJlY29yZFtpXSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG90Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRJbmRleChyZWNvcmQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGlmIChyZWNvcmQubGVuZ3RoID4gMTcpIHtcclxuICAgICAgICAgICAgaW5kZXggPSByZWNvcmQubGVuZ3RoIC0gMTc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGogPSBpbmRleDsgaiA8IHJlY29yZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoaiAtIGluZGV4ICsgcmVjb3JkW2pdLmNvdW50ID49IDI5KSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCArPSBqIC0gaW5kZXggKyByZWNvcmRbal0uY291bnQgLSAyOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9LFxyXG4gICAgLy/muIXnkIblgJLorqHml7ZcclxuICAgIGNsZWFuVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0VGltZU91dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNldFRpbWVPdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRpbWVPdXQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwibm9kZVJlbW92ZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
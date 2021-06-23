
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/longhudouentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a667buvlrBH6qzFV1CEKSxL', 'longhudouentry');
// modules/plaza/script/prefab/enterRoom/longhudouentry.js

"use strict";

var _glGame$baseclass$ext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

glGame.baseclass.extend((_glGame$baseclass$ext = {
  properties: {
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    Lhd_record: cc.Prefab,
    Lhd_gamerule: cc.Prefab,
    sprite_Atlas: cc.SpriteAtlas,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20; // glGame.audio.playBGM(this.BGM_audio);

    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
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
    this.nodeInfo = {};
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.cleanTimer();
    this.unregisterEvent();
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
          this.isUpdateTrend = {};
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
    var Lhd_gamerule = glGame.panel.showPanel(this.Lhd_gamerule);
    Lhd_gamerule.zIndex = 30;
  },
  click_record: function click_record() {
    var Lhd_record = glGame.panel.showPanel(this.Lhd_record);
    Lhd_record.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.LONGHUDOU;
    glGame.readyroom.reqEnterArea(glGame.scenetag.LONGHUDOU);
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
    console.log('r');
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
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[msg.roomdata.bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[msg.roomdata.bettype].MaxBet);
      infoNode.getChildByName('chiplimit').getChildByName('lab_coin').getComponent(cc.Label).string = minbet + "~" + maxbet;

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
        this.content.children[_i].getChildByName("lab_time").getComponent(cc.Label).string = _waitTime + "s";
        this.content.children[_i].getChildByName("gamestate").color = this.gameState[msg.roomdata.process];
        this.content.children[_i].getChildByName("lab_time").color = this.gameState[msg.roomdata.process];
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
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      infoNode.getChildByName('chiplimit').getChildByName('lab_coin').getComponent(cc.Label).string = minbet + "~" + maxbet;
      infoNode.getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[this.roomList[roomid].process];
      infoNode.process = this.roomList[roomid].process;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("enter").active = true;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = false;
      } else {
        infoNode.getChildByName("btn_enter").getChildByName("enter").active = false;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = true;
      }

      var waitTime = Math.floor((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);

      if (waitTime < 0) {
        waitTime = 0;
      }

      infoNode.waitTime = waitTime;
      infoNode.getChildByName("lab_time").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName("gamestate").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName('lab_time').getComponent(cc.Label).string = waitTime + "s";
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
            _this2.content.children[i].getChildByName("lab_time").color = _this2.gameState[0];
          }

          _this2.content.children[i].getChildByName("lab_time").getComponent(cc.Label).string = _this2.content.children[i].waitTime + "s";
        }
      }
    }, 1000);
  },
  //显示总局数以及红 、蓝的出现局数
  showRound: function showRound(node, record) {
    var _long = 0,
        hu = 0,
        he = 0,
        round = 0;

    for (var i = 0; i < record.length; i++) {
      if (record[i].result == 1) {
        _long += record[i].count;
        round += record[i].count;
      } else if (record[i].result == 2) {
        hu += record[i].count;
        round += record[i].count;
      }

      if (record[i].he) {
        for (var k = 0; k < record[i].he.length; k++) {
          he += record[i].he[k].num;
          round += record[i].he[k].num;
        }
      }
    }

    node.getChildByName('jushu').getChildByName("count").getComponent(cc.Label).string = round < 10 && round > 0 ? '0' + round : round;
    node.getChildByName('hong').getChildByName("count").getComponent(cc.Label).string = _long < 10 && _long > 0 ? '0' + _long : _long;
    node.getChildByName('lan').getChildByName("count").getComponent(cc.Label).string = hu < 10 && hu > 0 ? '0' + hu : hu;
    node.getChildByName('lv').getChildByName("count").getComponent(cc.Label).string = he < 10 && he > 0 ? '0' + he : he;
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
    this.updateTrend(node, record);
    var recordArr = [];
    index = this.getIndex(record);

    for (var i = index; i < record.length; i++) {
      var isChangeRow = false;
      var newCol = col;

      for (var j = 0; j < record[i].count; j++) {
        var labelColor = null;
        dotNode = cc.instantiate(this.node_result);

        if (record[i].result == 1) {
          labelColor = cc.color(176, 4, 4);
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hongquan'];
        } else if (record[i].result == 2) {
          labelColor = cc.color(30, 2, 3);
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_haquan'];
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
        var newRow = row;

        if (newRow > 5 && !isChangeRow) {
          isChangeRow = true;
        }

        for (var _k = 0; _k < recordArr.length; _k++) {
          if (newRow == recordArr[_k][0] && newCol == recordArr[_k][1]) {
            isChangeRow = true;
          }
        }

        if (isChangeRow) {
          newRow--;
          newCol++;
        }

        dotNode.setPosition(cc.v2(-299 + newCol * 43, 89 - newRow * 36));
        recordArr.push([newRow, newCol]);

        if (this.isUpdateTrend[roomid]) {
          dotNode.active = true;
        }

        if (!isChangeRow) row++;
      }

      col++;
      row = 0;
    }

    if (!this.isUpdateTrend[roomid]) {
      glGame.panel.showEffectNode(this, node.getChildByName('node_dot'), 0.02, true, 0.1, function () {});
      this.isUpdateTrend[roomid] = true;
    }
  },
  //这是珠盘路的显示
  updateTrend: function updateTrend(node, record) {
    node.getChildByName('trend').destroyAllChildren();
    node.getChildByName('trend').removeAllChildren();
    var Round = [];

    for (var i = 0; i < record.length; i++) {
      for (var j = 0; j < record[i].count; j++) {
        Round.push(record[i].result);

        if (record[i].he) {
          for (var k = 0; k < record[i].he.length; k++) {
            if (record[i].he[k].index - 1 == j) {
              for (var z = 0; z < record[i].he[k].num; z++) {
                Round.push(3);
              }
            }
          }
        }
      }
    }

    var index = Round.length > 15 ? Round.length - 15 : 0;

    for (var _i2 = index; _i2 < Round.length; _i2++) {
      var dotNode = new cc.Node();

      if (Round[_i2] == 1) {
        dotNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_long'];
      } else if (Round[_i2] == 2) {
        dotNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_ha'];
      } else if (Round[_i2] == 3) {
        dotNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_he'];
      }

      dotNode.parent = node.getChildByName('trend');
      dotNode.width = 46.5;
      dotNode.height = 46.5;
    }
  },
  getIndex: function getIndex(record) {
    var index = 0;

    if (record.length > 17) {
      index = record.length - 17;
    }

    for (var j = index; j < record.length; j++) {
      if (j - index + record[j].count >= 22) {
        index += j - index + record[j].count - 22;
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
  }
}, _defineProperty(_glGame$baseclass$ext, "set", function set(key, value) {
  this[key] = value;
}), _defineProperty(_glGame$baseclass$ext, "OnDestroy", function OnDestroy() {
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
  glGame.emitter.off("nodeRemove", this);
  glGame.emitter.off("updateUserData", this);
  this.cleanTimer();
  this.unregisterEvent();
}), _glGame$baseclass$ext));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGxvbmdodWRvdWVudHJ5LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJnb2xkQ291bnQiLCJjYyIsIkxhYmVsIiwiY29udGVudCIsIk5vZGUiLCJub2RlX3JlY29yZCIsIm5vZGVfcmVzdWx0IiwiTGhkX3JlY29yZCIsIlByZWZhYiIsIkxoZF9nYW1lcnVsZSIsInNwcml0ZV9BdGxhcyIsIlNwcml0ZUF0bGFzIiwiQkdNIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdhbWVpZCIsIm5vZGUiLCJ6SW5kZXgiLCJlbWl0dGVyIiwib24iLCJNRVNTQUdFIiwiVUkiLCJST09NX0VOVEVSX1NIT1ciLCJSb290Tm9kZVNob3ciLCJST09NX0VOVEVSX0hJREUiLCJSb290Tm9kZUhpZGUiLCJjbGlja19iYWNrIiwidXBkYXRldXNlckluZm8iLCJyZWdpc3RlckV2ZW50IiwicmVxRW50ZXJBcmVhIiwicm9vbVR5cGUiLCJub2RlSW5mbyIsImdhbWVTdGF0ZSIsImNvbG9yIiwic3RhdGVXb3JkIiwiaXNVcGRhdGVUcmVuZCIsIm9uR2FtZUluZm9saXN0Iiwib25Sb29tSW5mbyIsIm9uSGFuZEluZm8iLCJvbkRlbGV0ZVJvb20iLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJhY3RpdmUiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImNsZWFuVGltZXIiLCJvbkNsaWNrIiwibmFtZSIsImNsaWNrX2hlbHAiLCJjbGlja19yZWNvcmQiLCJjbGlja19hZGRnb2xkIiwiY2xpY2tfdXNlcmluZm8iLCJ1cGRhdGVVSSIsInVzZXIiLCJpc1RvdXJpc3QiLCJwYW5lbCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInN1c3BpY2lvdXMiLCJnYW1lIiwiaXNfZ2FtZSIsInNob3dEaWFsb2ciLCJzaG93U2VydmljZSIsInNob3dGaWVsZFNlbGVjdGlvbkp1SHVhIiwicm9vbSIsInJlcU15R2FtZVN0YXRlIiwiZ2FtZUlEIiwicGFyZW50IiwidGhlbiIsInJlYWR5cm9vbSIsImVudGVySHVuZHJlZHNSb29tIiwidGFnIiwiY29uc29sZSIsImVycm9yIiwiY3V0RmxvYXQiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwic2hvd1VzZXJJbmZvIiwic2hvd1JlbW90ZUltYWdlIiwiUGxheWVyaGVhZCIsImdldCIsImNvaW4iLCJzdHJpbmciLCJHb2xkVGVtcCIsInNldEdhbWVJZCIsInVwZGF0ZUJnSW5mbyIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dTaG9wIiwicmVxRXhpdEFyZWEiLCJyZW1vdmUiLCJzaG93UGFuZWwiLCJzZXQiLCJrZXkiLCJzY2VuZXRhZyIsIkxPTkdIVURPVSIsIm1zZyIsImkiLCJjaGlsZHJlbiIsImxlbmd0aCIsInJvb21pZCIsImRlc3Ryb3kiLCJsb2ciLCJnYW1lSW5mb1Rlc3QiLCJzZXJ2ZXJUaW1lT2ZmIiwiRGF0ZSIsIm5vdyIsInNlcnZlcnRpbWUiLCJyb29tUmVjb3JkIiwicm9vbXJlY29yZCIsInNob3dSZWNvcmQiLCJyb29tTGlzdCIsInJvb21saXN0Iiwicm9vbWRhdGEiLCJiZXR0eXBlIiwiY291bnQiLCJpbmZvTm9kZSIsImluc3RhbnRpYXRlIiwicm9vbXNlcnZlcmlkIiwid2FpdFRpbWUiLCJNYXRoIiwiZmxvb3IiLCJjdXJ3YWl0dGltZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50Iiwib25saW5lIiwibWluYmV0IiwiRW50ZXJSb29tR29sZFRlbXAiLCJDaGlwcyIsIm1heGJldCIsIk1heEJldCIsIkVudHJhbmNlUmVzdHJpY3Rpb25zIiwicHJvY2VzcyIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJjaGlsZHJlbkNvdW50Iiwic3RyIiwic3Vic3RyIiwic2hvd0Nsb2NrIiwiZ2V0RmxvYXQiLCJzZXRUaW1lT3V0Iiwic2V0SW50ZXJ2YWwiLCJzaG93Um91bmQiLCJyZWNvcmQiLCJsb25nIiwiaHUiLCJoZSIsInJvdW5kIiwicmVzdWx0IiwiayIsIm51bSIsImluZGV4IiwiZG90Tm9kZSIsInJvdyIsImNvbCIsInVwZGF0ZVRyZW5kIiwicmVjb3JkQXJyIiwiZ2V0SW5kZXgiLCJpc0NoYW5nZVJvdyIsIm5ld0NvbCIsImoiLCJsYWJlbENvbG9yIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJfc3ByaXRlRnJhbWVzIiwibmV3Um93Iiwic2V0UG9zaXRpb24iLCJ2MiIsInNob3dFZmZlY3ROb2RlIiwiUm91bmQiLCJ6IiwiYWRkQ29tcG9uZW50Iiwid2lkdGgiLCJoZWlnaHQiLCJjbGVhclRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCO0FBRUlDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsS0FETjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVGLEVBQUUsQ0FBQ0csSUFGSjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0csSUFIUjtBQUlSRSxJQUFBQSxXQUFXLEVBQUVMLEVBQUUsQ0FBQ0csSUFKUjtBQUtSRyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFMUDtBQU1SQyxJQUFBQSxZQUFZLEVBQUVSLEVBQUUsQ0FBQ08sTUFOVDtBQU9SRSxJQUFBQSxZQUFZLEVBQUVULEVBQUUsQ0FBQ1UsV0FQVDtBQVFSQyxJQUFBQSxHQUFHLEVBQUU7QUFDREMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNhLFNBRFI7QUFFRCxpQkFBUztBQUZSO0FBUkcsR0FGaEI7QUFnQkk7QUFFQUMsRUFBQUEsTUFsQkosb0JBa0JhO0FBQ0wsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsRUFBbkIsQ0FGSyxDQUdMOztBQUNBdEIsSUFBQUEsTUFBTSxDQUFD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QUFKLEdBQVlSLE1BQU0sQ0FBQ2lCLENBQUQsQ0FBTixDQUFVL0MsS0FBdEIsSUFBK0IsRUFBbkMsRUFBdUM7QUFDbkNzQyxRQUFBQSxLQUFLLElBQUlTLENBQUMsR0FBR1QsS0FBSixHQUFZUixNQUFNLENBQUNpQixDQUFELENBQU4sQ0FBVS9DLEtBQXRCLEdBQThCLEVBQXZDO0FBQ0g7QUFDSjs7QUFDRCxXQUFPc0MsS0FBUDtBQUNILEdBaGVMO0FBa2VJO0FBQ0E1RyxFQUFBQSxVQW5lSix3QkFtZWlCO0FBQ1QsUUFBSSxLQUFLaUcsVUFBTCxJQUFtQixJQUF2QixFQUE2QjtBQUN6QmtDLE1BQUFBLFlBQVksQ0FBQyxLQUFLbEMsVUFBTixDQUFaO0FBQ0g7O0FBQ0QsU0FBS0EsVUFBTCxHQUFrQixJQUFsQjtBQUNIO0FBeGVMLDhEQXllUWpELEdBemVSLEVBeWVhbkIsS0F6ZWIsRUF5ZW9CO0FBQ1osT0FBS21CLEdBQUwsSUFBWW5CLEtBQVo7QUFDSCxDQTNlTCw0RUE0ZWdCO0FBQ1IvRSxFQUFBQSxNQUFNLENBQUN1QixPQUFQLENBQWV1QixHQUFmLENBQW1CckIsT0FBTyxDQUFDQyxFQUFSLENBQVdDLGVBQTlCLEVBQStDLElBQS9DO0FBQ0EzQixFQUFBQSxNQUFNLENBQUN1QixPQUFQLENBQWV1QixHQUFmLENBQW1CckIsT0FBTyxDQUFDQyxFQUFSLENBQVdHLGVBQTlCLEVBQStDLElBQS9DO0FBQ0E3QixFQUFBQSxNQUFNLENBQUN1QixPQUFQLENBQWV1QixHQUFmLENBQW1CLFlBQW5CLEVBQWlDLElBQWpDO0FBQ0E5QyxFQUFBQSxNQUFNLENBQUN1QixPQUFQLENBQWV1QixHQUFmLENBQW1CLGdCQUFuQixFQUFxQyxJQUFyQztBQUNBLE9BQUtJLFVBQUw7QUFDQSxPQUFLTCxlQUFMO0FBQ0gsQ0FuZkwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZENvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVjb3JkOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVzdWx0OiBjYy5Ob2RlLFxyXG4gICAgICAgIExoZF9yZWNvcmQ6IGNjLlByZWZhYixcclxuICAgICAgICBMaGRfZ2FtZXJ1bGU6IGNjLlByZWZhYixcclxuICAgICAgICBzcHJpdGVfQXRsYXM6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIEJHTToge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMjA7XHJcbiAgICAgICAgLy8gZ2xHYW1lLmF1ZGlvLnBsYXlCR00odGhpcy5CR01fYXVkaW8pO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzLlJvb3ROb2RlU2hvdywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMuUm9vdE5vZGVIaWRlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRldXNlckluZm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMucm9vbVR5cGUgPSAxO1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHsgMDogY2MuY29sb3IoMjU1LCA5NiwgNDcpLCAxOiBjYy5jb2xvcigxMzcsIDIxOCwgMjU1KSwgMjogY2MuY29sb3IoMTQxLCAyMjIsIDM3KSwgMzogY2MuY29sb3IoMjI2LCAxMzcsIDI1NSksIDQ6IGNjLmNvbG9yKDIyNiwgMTM3LCAyNTUpIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZVdvcmQgPSB7IDE6IFwi5LyR5oGv5LitXCIsIDI6IFwi5LiL5rOo5LitXCIsIDM6IFwi57uT566X5LitXCIsIDQ6IFwi5rSX54mM5LitXCIgfTtcclxuICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tuebkeWQrFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcy5vbkdhbWVJbmZvbGlzdCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcy5vblJvb21JbmZvLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uSGFuZEluZm9fYXJlYVwiLCB0aGlzLm9uSGFuZEluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25EZWxldGVSb29tX2FyZWFcIiwgdGhpcy5vbkRlbGV0ZVJvb20sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8v5LqL5Lu26ZSA5q+BXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIFJvb3ROb2RlU2hvdygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tcIjogdGhpcy5jbGlja19iYWNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlbHBcIjogdGhpcy5jbGlja19oZWxwKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY29yZFwiOiB0aGlzLmNsaWNrX3JlY29yZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm15Y29pbkluZm9cIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZGJnXCI6IHRoaXMuY2xpY2tfdXNlcmluZm8oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2hvbmd6aGlcIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfYmFzZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNVcGRhdGVUcmVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfZWxlbWVudGFyeSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNVcGRhdGVUcmVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfbWVkaXVtJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1VwZGF0ZVRyZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9oaWdoZXInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX3BsdXRlJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9lbnRlcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9zdGFydCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiYgZ2xHYW1lLnVzZXIuZ2FtZSA9PSAyKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBcIuaCqOeahOi0puWPt+aVsOaNruW8guW4uO+8jOaaguaXtuemgeatoui/m+WFpea4uOaIj++8jOWmguacieeWkemXru+8jOivt+iBlOezu+Wuouacje+8gVwiLCAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEoKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5yb29tLnJlcU15R2FtZVN0YXRlKHRoaXMuZ2FtZUlELCB0aGlzLm5vZGVJbmZvW25vZGUucGFyZW50Lm5hbWVdLnR5cGUsIG5vZGUucGFyZW50Lm5hbWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5yZWFkeXJvb20uZW50ZXJIdW5kcmVkc1Jvb20obm9kZS5wYXJlbnQubmFtZSwgdGhpcy5ub2RlSW5mb1tub2RlLnBhcmVudC5uYW1lXS50YWcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1VzZXJJbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UodGhpcy5QbGF5ZXJoZWFkLCBnbEdhbWUudXNlci5nZXQoXCJoZWFkVVJMXCIpKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGV1c2VySW5mbygpIHtcclxuICAgICAgICBsZXQgY29pbiA9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIilcclxuICAgICAgICB0aGlzLmdvbGRDb3VudC5zdHJpbmcgPSBnbEdhbWUudXNlci5Hb2xkVGVtcChjb2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0R2FtZUlkKGdhbWVpZCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gZ2FtZWlkO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCZ0luZm8oKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX3VzZXJpbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJ1c2VyaW5mb1wiKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19hZGRnb2xkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgzMCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYmFjaygpIHtcclxuICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUV4aXRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19oZWxwKCkge1xyXG4gICAgICAgIGxldCBMaGRfZ2FtZXJ1bGUgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuTGhkX2dhbWVydWxlKTtcclxuICAgICAgICBMaGRfZ2FtZXJ1bGUuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIGxldCBMaGRfcmVjb3JkID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLkxoZF9yZWNvcmQpO1xyXG4gICAgICAgIExoZF9yZWNvcmQuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XHJcbiAgICB9LFxyXG4gICAgLy/lj5HljIVcclxuICAgIHJlcUVudGVyQXJlYSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdsR2FtZS5zY2VuZXRhZy5MT05HSFVET1U7XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFbnRlckFyZWEoZ2xHYW1lLnNjZW5ldGFnLkxPTkdIVURPVSk7XHJcblxyXG4gICAgfSxcclxuICAgIC8v5LqL5Lu25Zue6LCDXHJcbiAgICAvL+i/m+WFpea4uOaIj+S/oeaBr+Wbnuiwg1xyXG4gICAgb25EZWxldGVSb29tKG1zZykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSBtc2cucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvbkdhbWVJbmZvbGlzdChtc2cpIHtcclxuICAgICAgICBjYy5sb2coXCLmnI3liqHnq6/lj5HpgIHmlbDmja4yMjJcIiwgbXNnKVxyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvVGVzdCA9IGdsR2FtZS5yZWFkeXJvb20uZ2V0KFwiZ2FtZUluZm9cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuZ2FtZUluZm9UZXN0JywgdGhpcy5nYW1lSW5mb1Rlc3QpXHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVJbmZvVGVzdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZU9mZiA9IERhdGUubm93KCkgLSBtc2cuc2VydmVydGltZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9LFxyXG4gICAgb25IYW5kSW5mbyhtc2cpIHtcclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlpZblirFcIiwgdGhpcy5yb29tUmVjb3JkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKHRoaXMuY29udGVudC5jaGlsZHJlbltpXSwgdGhpcy5yb29tUmVjb3JkW21zZy5yb29taWRdLCBtc2cucm9vbWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblJvb21JbmZvKG1zZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyJylcclxuICAgICAgICB0aGlzLnJvb21MaXN0ID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tbGlzdDtcclxuICAgICAgICB0aGlzLnNlcnZlclRpbWVPZmYgPSBEYXRlLm5vdygpIC0gbXNnLnNlcnZlcnRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gbXNnLnJvb21kYXRhLmJldHR5cGUgJiYgdGhpcy5yb29tVHlwZSAhPT0gMCkgcmV0dXJuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21kYXRhLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVjb3JkKTtcclxuICAgICAgICAgICAgaW5mb05vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5uYW1lID0gYCR7bXNnLnJvb21kYXRhLnJvb21pZH1gO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVJbmZvW2luZm9Ob2RlLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgdGFnOiB0aGlzLnJvb21MaXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXVttc2cucm9vbWRhdGEucm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBtc2cucm9vbWRhdGEuYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGguZmxvb3IoKHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS53YWl0VGltZSA9IHdhaXRUaW1lXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnLnJvb21kYXRhLnJvb21pZDtcclxuICAgICAgICAgICAgbGV0IG1pbmJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXS5DaGlwc1swXSksXHJcbiAgICAgICAgICAgICAgICBtYXhiZXQgPSBnbEdhbWUudXNlci5FbnRlclJvb21Hb2xkVGVtcCh0aGlzLmdhbWVJbmZvVGVzdFttc2cucm9vbWRhdGEuYmV0dHlwZV0uTWF4QmV0KTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NoaXBsaW1pdCcpLmdldENoaWxkQnlOYW1lKCdsYWJfY29pbicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWluYmV0ICsgXCJ+XCIgKyBtYXhiZXQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVJbmZvVGVzdFttc2cucm9vbWRhdGEuYmV0dHlwZV0uRW50cmFuY2VSZXN0cmljdGlvbnMgPD0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSAmJiAhZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiZW50ZXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwid2F0Y2hcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcImVudGVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRjaFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm9vbVJlY29yZCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbXJlY29yZDtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbbXNnLnJvb21kYXRhLnJvb21pZF0sIG1zZy5yb29tZGF0YS5yb29taWQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IG1zZy5yb29tZGF0YS5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGguZmxvb3IoKG1zZy5yb29tZGF0YS5jdXJ3YWl0dGltZSAtIChEYXRlLm5vdygpIC0gdGhpcy5zZXJ2ZXJUaW1lT2ZmKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwibGFiX3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB3YWl0VGltZSArIFwic1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbbXNnLnJvb21kYXRhLnByb2Nlc3NdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwibGFiX3RpbWVcIikuY29sb3IgPSB0aGlzLmdhbWVTdGF0ZVttc2cucm9vbWRhdGEucHJvY2Vzc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ucHJvY2VzcyA9IG1zZy5yb29tZGF0YS5wcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5zdGF0ZVdvcmRbbXNnLnJvb21kYXRhLnByb2Nlc3NdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1zZy5yb29tZGF0YS5vbmxpbmU7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5pu05pawVUlcclxuICAgIHVwZGF0ZVVJKCkge1xyXG4gICAgICAgIHRoaXMucm9vbUxpc3QgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUxpc3QucHVzaChnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdW2tleV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvb21MaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuYmV0dHlwZSAtIGIuYmV0dHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgcm9vbWlkIGluIHRoaXMucm9vbUxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0W3Jvb21pZF0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpbmZvTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZWNvcmQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLm5hbWUgPSBgJHt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkfWA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUluZm9baW5mb05vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdyb29tSWQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0ci5sZW5ndGggPiA1ID8gc3RyLnN1YnN0cihzdHIubGVuZ3RoIC0gNSkgOiBzdHI7XHJcblxyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0JykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYl9jb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtaW5iZXQgKyBcIn5cIiArIG1heGJldDtcclxuXHJcblxyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImdhbWVzdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuc3RhdGVXb3JkW3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzXVxyXG4gICAgICAgICAgICBpbmZvTm9kZS5wcm9jZXNzID0gdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3M7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVJbmZvVGVzdFt0aGlzLnJvb21MaXN0W3Jvb21pZF0uYmV0dHlwZV0uRW50cmFuY2VSZXN0cmljdGlvbnMgPD0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSAmJiAhZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwiZW50ZXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2VudGVyXCIpLmdldENoaWxkQnlOYW1lKFwid2F0Y2hcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcImVudGVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRjaFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGguZmxvb3IoKHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5jdXJ3YWl0dGltZSAtIChEYXRlLm5vdygpIC0gdGhpcy5zZXJ2ZXJUaW1lT2ZmKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgaWYgKHdhaXRUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLndhaXRUaW1lID0gd2FpdFRpbWVcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKS5jb2xvciA9IHdhaXRUaW1lIDw9IDMgJiYgdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3MgPT0gMiA/IHRoaXMuZ2FtZVN0YXRlWzBdIDogdGhpcy5nYW1lU3RhdGVbdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3NdO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImdhbWVzdGF0ZVwiKS5jb2xvciA9IHdhaXRUaW1lIDw9IDMgJiYgdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3MgPT0gMiA/IHRoaXMuZ2FtZVN0YXRlWzBdIDogdGhpcy5nYW1lU3RhdGVbdGhpcy5yb29tTGlzdFtyb29taWRdLnByb2Nlc3NdO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiX3RpbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdhaXRUaW1lICsgXCJzXCJcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZF0sIHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dDbG9jaygpO1xyXG4gICAgfSxcclxuICAgIC8v5qGM6Z2i5pWw5o2u55qE5pi+56S6XHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICAvL+aYvuekuuWAkuiuoeaXtlxyXG4gICAgc2hvd0Nsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGltZU91dCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ud2FpdFRpbWUgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSA8PSAzICYmIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5wcm9jZXNzID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lICsgXCJzXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfSxcclxuICAgIC8v5pi+56S65oC75bGA5pWw5Lul5Y+K57qiIOOAgeiTneeahOWHuueOsOWxgOaVsFxyXG4gICAgc2hvd1JvdW5kKG5vZGUsIHJlY29yZCkge1xyXG4gICAgICAgIGxldCBsb25nID0gMCxcclxuICAgICAgICAgICAgaHUgPSAwLFxyXG4gICAgICAgICAgICBoZSA9IDAsXHJcbiAgICAgICAgICAgIHJvdW5kID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkW2ldLnJlc3VsdCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsb25nICs9IHJlY29yZFtpXS5jb3VudFxyXG4gICAgICAgICAgICAgICAgcm91bmQgKz0gcmVjb3JkW2ldLmNvdW50XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjb3JkW2ldLnJlc3VsdCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBodSArPSByZWNvcmRbaV0uY291bnRcclxuICAgICAgICAgICAgICAgIHJvdW5kICs9IHJlY29yZFtpXS5jb3VudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmRbaV0uaGUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVjb3JkW2ldLmhlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGUgKz0gcmVjb3JkW2ldLmhlW2tdLm51bTtcclxuICAgICAgICAgICAgICAgICAgICByb3VuZCArPSByZWNvcmRbaV0uaGVba10ubnVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2p1c2h1JykuZ2V0Q2hpbGRCeU5hbWUoXCJjb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJvdW5kIDwgMTAgJiYgcm91bmQgPiAwID8gJzAnICsgcm91bmQgOiByb3VuZDtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdob25nJykuZ2V0Q2hpbGRCeU5hbWUoXCJjb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxvbmcgPCAxMCAmJiBsb25nID4gMCA/ICcwJyArIGxvbmcgOiBsb25nO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhbicpLmdldENoaWxkQnlOYW1lKFwiY291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBodSA8IDEwICYmIGh1ID4gMCA/ICcwJyArIGh1IDogaHU7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbHYnKS5nZXRDaGlsZEJ5TmFtZShcImNvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaGUgPCAxMCAmJiBoZSA+IDAgPyAnMCcgKyBoZSA6IGhlO1xyXG4gICAgfSxcclxuICAgIHNob3dSZWNvcmQobm9kZSwgcmVjb3JkLCByb29taWQpIHtcclxuICAgICAgICBpZiAoIXJlY29yZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBsZXQgZG90Tm9kZTtcclxuICAgICAgICBsZXQgcm93ID0gMCxcclxuICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90JykucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyZW5kKG5vZGUsIHJlY29yZCk7XHJcbiAgICAgICAgbGV0IHJlY29yZEFyciA9IFtdO1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleChyZWNvcmQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNDaGFuZ2VSb3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5ld0NvbCA9IGNvbDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWNvcmRbaV0uY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5yZXN1bHQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjYy5jb2xvcigxNzYsIDQsIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfaG9uZ3F1YW4nXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjb3JkW2ldLnJlc3VsdCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxDb2xvciA9IGNjLmNvbG9yKDMwLCAyLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2hhcXVhbiddO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVjb3JkW2ldLmhlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRbaV0uaGVba10uaW5kZXggLSAxID09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZWNvcmRbaV0uaGVba10ubnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5jaGlsZHJlblswXS5jb2xvciA9IGxhYmVsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLnBhcmVudCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Um93ID0gcm93O1xyXG4gICAgICAgICAgICAgICAgaWYobmV3Um93ID4gNSYmIWlzQ2hhbmdlUm93KXtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5nZVJvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlY29yZEFyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdSb3cgPT0gcmVjb3JkQXJyW2tdWzBdICYmIG5ld0NvbCA9PSByZWNvcmRBcnJba11bMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2VSb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0NoYW5nZVJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvdy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NvbCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0yOTkgKyBuZXdDb2wgKiA0MywgODkgLSBuZXdSb3cgKiAzNikpO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkQXJyLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1VwZGF0ZVRyZW5kW3Jvb21pZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ2hhbmdlUm93KSByb3crKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgcm93ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVXBkYXRlVHJlbmRbcm9vbWlkXSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcywgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKSwgMC4wMiwgdHJ1ZSwgMC4xLCAoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICB0aGlzLmlzVXBkYXRlVHJlbmRbcm9vbWlkXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6L+Z5piv54+g55uY6Lev55qE5pi+56S6XHJcbiAgICB1cGRhdGVUcmVuZChub2RlLCByZWNvcmQpIHtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0cmVuZCcpLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RyZW5kJykucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgUm91bmQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlY29yZFtpXS5jb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBSb3VuZC5wdXNoKHJlY29yZFtpXS5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ldLmhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZWNvcmRbaV0uaGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZVtrXS5pbmRleCAtIDEgPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCByZWNvcmRbaV0uaGVba10ubnVtOyB6KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb3VuZC5wdXNoKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSBSb3VuZC5sZW5ndGggPiAxNSA/IFJvdW5kLmxlbmd0aCAtIDE1IDogMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCBSb3VuZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZG90Tm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIGlmIChSb3VuZFtpXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2xvbmcnXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChSb3VuZFtpXSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2hhJ107XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUm91bmRbaV0gPT0gMykge1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19oZSddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvdE5vZGUucGFyZW50ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHJlbmQnKTtcclxuICAgICAgICAgICAgZG90Tm9kZS53aWR0aCA9IDQ2LjU7XHJcbiAgICAgICAgICAgIGRvdE5vZGUuaGVpZ2h0ID0gNDYuNTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5kZXgocmVjb3JkKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBpZiAocmVjb3JkLmxlbmd0aCA+IDE3KSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gcmVjb3JkLmxlbmd0aCAtIDE3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBqID0gaW5kZXg7IGogPCByZWNvcmQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKGogLSBpbmRleCArIHJlY29yZFtqXS5jb3VudCA+PSAyMikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gaiAtIGluZGV4ICsgcmVjb3JkW2pdLmNvdW50IC0gMjI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+a4heeQhuWAkuiuoeaXtlxyXG4gICAgY2xlYW5UaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXRUaW1lT3V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2V0VGltZU91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VGltZU91dCA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm5vZGVSZW1vdmVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
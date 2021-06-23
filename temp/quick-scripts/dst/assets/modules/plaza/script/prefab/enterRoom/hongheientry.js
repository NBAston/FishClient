
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/hongheientry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd506d6QTdBGWLKdtVfzhaXx', 'hongheientry');
// modules/plaza/script/prefab/enterRoom/hongheientry.js

"use strict";

var cartTypeStr = {
  0: '散 牌',
  1: '对 A',
  7: '散 牌',
  8: '散 牌',
  9: '对 9',
  10: '对 10',
  11: '对 J',
  12: '对 Q',
  13: '对 K',
  16: '顺 子',
  17: '金 花',
  18: '顺 金',
  19: '豹 子'
};
glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    content: cc.Node,
    node_record: cc.Node,
    node_result: cc.Node,
    type_node: cc.Node,
    help_Prefab: cc.Prefab,
    sprite_Atlas: cc.SpriteAtlas,
    record_Prefab: cc.Prefab,
    BGM: {
      //背景声音
      type: cc.AudioClip,
      "default": null
    }
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
    this.nodeInfo = {};
    this.gameState = {
      0: cc.color(255, 96, 47),
      1: cc.color(137, 218, 255),
      2: cc.color(141, 222, 37),
      3: cc.color(226, 137, 255)
    };
    this.stateWord = {
      1: "休息中",
      2: "下注中",
      3: "结算中",
      4: "洗牌中"
    };
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.HONGHEI;
    glGame.readyroom.reqEnterArea(glGame.scenetag.HONGHEI);
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
          this.roomType = 0; // this.reqEnterArea();

          this.content.destroyAllChildren();
          this.content.removeAllChildren();
          this.updateUI();
        }

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
    glGame.panel.showPanel(this.help_Prefab).zIndex = 30;
  },
  click_record: function click_record() {
    // glGame.panel.showNewGameRecord(this.gameid, 30);
    glGame.panel.showPanel(this.record_Prefab).zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
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
    this.hhTypeRecord = glGame.readyroom.hhTypeRecord;
    console.log("奖励", this.roomRecord);

    for (var i = 0; i < this.content.children.length; i++) {
      if (this.content.children[i].name == msg.roomid) {
        this.showRecord(this.content.children[i], this.roomRecord[msg.roomid], msg.roomid);
        this.showCardType(this.content.children[i], msg.roomid);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {
    //this.updateUI();
    console.log('r');
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
      var waitTime = Math.floor((this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      infoNode.getChildByName("lab_time").getComponent(cc.Label).string = waitTime + "s";
      infoNode.getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[msg.roomdata.bettype][msg.roomdata.roomid].online;
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = msg.roomdata.roomid;
      this.roomRecord = glGame.readyroom.roomrecord;
      this.showRecord(infoNode, this.roomRecord[msg.roomdata.roomid], msg.roomdata.roomid);
      this.showCardType(infoNode, msg.roomdata.roomid);
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
        this.content.children[_i].getChildByName('onlinepeople').getChildByName('onlineNum').getComponent(cc.Label).string = msg.roomdata.online;
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
    this.hhTypeRecord = glGame.readyroom.hhTypeRecord;

    for (var roomid in this.roomList) {
      if (!this.roomList[roomid].roomid) {
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
      infoNode.active = true;
      infoNode.name = "".concat(this.roomList[roomid].roomid);
      this.nodeInfo[infoNode.name] = {
        tag: this.roomList[roomid].roomserverid,
        type: this.roomList[roomid].bettype
      };
      var str = this.roomList[roomid].roomid.toString();
      infoNode.getChildByName('roomId').getComponent(cc.Label).string = str.length > 5 ? str.substr(str.length - 5) : str;
      infoNode.getChildByName('onlinepeople').getChildByName('onlineNum').getComponent(cc.Label).string = this.roomList[roomid].online;
      var minbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].Chips[0]),
          maxbet = glGame.user.EnterRoomGoldTemp(this.gameInfoTest[this.roomList[roomid].bettype].MaxBet);
      infoNode.getChildByName('chiplimit').getChildByName('lab_coin').getComponent(cc.Label).string = minbet + "-" + maxbet;
      infoNode.getChildByName("gamestate").getComponent(cc.Label).string = this.stateWord[this.roomList[roomid].process];
      infoNode.process = this.roomList[roomid].process;

      if (this.gameInfoTest[this.roomList[roomid].bettype].EntranceRestrictions <= glGame.user.get("coin") && !glGame.user.isTourist()) {
        infoNode.getChildByName("btn_enter").getChildByName("watchBg").active = false;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = false;
      } else {
        infoNode.getChildByName("btn_enter").getChildByName("watchBg").active = true;
        infoNode.getChildByName("btn_enter").getChildByName("watch").active = true;
      }

      var waitTime = Math.floor((this.roomList[roomid].curwaittime - (Date.now() - this.serverTimeOff)) / 1000);
      infoNode.waitTime = waitTime;
      infoNode.getChildByName("lab_time").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName("gamestate").color = waitTime <= 3 && this.roomList[roomid].process == 2 ? this.gameState[0] : this.gameState[this.roomList[roomid].process];
      infoNode.getChildByName('lab_time').getComponent(cc.Label).string = waitTime + "s";
      this.showRecord(infoNode, this.roomRecord[this.roomList[roomid].roomid], this.roomList[roomid].roomid);
      this.showCardType(infoNode, this.roomList[roomid].roomid);
    }

    this.showClock();
  },
  showCardType: function showCardType(infoNode, roomid) {
    var data = this.hhTypeRecord[roomid];
    if (!data) return;
    infoNode.getChildByName("trend").destroyAllChildren();
    infoNode.getChildByName("trend").removeAllChildren();
    var index = data.length > 8 ? data.length - 8 : 0;

    for (var i = index; i < data.length; i++) {
      var type_node = cc.instantiate(this.type_node);
      type_node.parent = infoNode.getChildByName("trend");
      type_node.getChildByName("lab_type").getComponent(cc.Label).string = cartTypeStr[data[i].curType];
      type_node.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas.getSpriteFrame(data[i].areaIndex == 1 ? "img_heidi" : "img_hongdi");
      type_node.getChildByName("lab_type").color = data[i].curType == 0 ? cc.color(255, 255, 255) : cc.color(255, 195, 21);
      type_node.active = true;
    }
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
        round = 0,
        roundCount = [];

    for (var i = 0; i < record.length; i++) {
      if (record[i].result == 1 || record[i].result == 2) {
        for (var k = 0; k < record[i].count; k++) {
          roundCount.push(record[i].result);
        }
      }

      if (record[i].he) {
        for (var _k = 0; _k < record[i].he.length; _k++) {
          for (var j = 0; j < record[i].he[_k].num; j++) {
            roundCount.push(3);
          }
        }
      }
    }

    var index = roundCount.length > 100 ? roundCount.length - 100 : 0;

    for (var _i2 = index; _i2 < roundCount.length; _i2++) {
      if (roundCount[_i2] == 1) {
        _long++;
      } else if (roundCount[_i2] == 2) {
        hu++;
      } else {
        he++;
      }
    }

    if (roundCount.length < 10 && roundCount.length > 0) {
      node.getChildByName('jushu').getChildByName("count").getComponent(cc.Label).string = '0' + roundCount.length;
    } else {
      node.getChildByName('jushu').getChildByName("count").getComponent(cc.Label).string = roundCount.length > 100 ? 100 : roundCount.length;
    }

    node.getChildByName('hei').getChildByName("count").getComponent(cc.Label).string = _long < 10 && _long > 0 ? '0' + _long : _long;
    node.getChildByName('hong').getChildByName("count").getComponent(cc.Label).string = hu < 10 && hu > 0 ? '0' + hu : hu;
  },
  showRecord: function showRecord(node, record, roomid) {
    if (!record) {
      return;
    }

    var index = 0;
    var dotNode;
    var row = 0,
        col = 0;
    this.showRound(node, record); //局数记录

    node.getChildByName('node_dot').destroyAllChildren();
    node.getChildByName('node_dot').removeAllChildren(); //this.beadplateTrend(node, record, roomid); // 珠盘路

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
          labelColor = cc.color(0, 238, 238);
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_heiquan'];
        } else if (record[i].result == 2) {
          labelColor = cc.Color.RED;
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hongquan'];
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

        for (var _k2 = 0; _k2 < recordArr.length; _k2++) {
          if (newRow == recordArr[_k2][0] && newCol == recordArr[_k2][1]) {
            isChangeRow = true;
          }
        }

        if (isChangeRow) {
          newRow--;
        }

        dotNode.setPosition(cc.v2(-306 + newCol * 42.6, 121 - newRow * 35));
        recordArr.push([newRow, newCol]);
        dotNode.active = false;
        row++;
      }

      col++;
      row = 0;
    }

    glGame.panel.showEffectNode(this, node.getChildByName('node_dot'), 0.02, true);
  },
  //这是珠盘路的显示
  beadplateTrend: function beadplateTrend(node, record, roomid) {
    var Round = [],
        index = 0,
        dotNode,
        row = 0,
        col = 0;

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

    index = Round.length % 6;
    index = index == 0 ? 6 : index;
    index = Round.length > 48 ? Round.length - 42 - index : 0;

    if (this.node.name == "baijialeselect") {
      var doublerecord = glGame.readyroom.doublerecord[roomid];

      for (var _i3 = index; _i3 < Round.length; _i3++) {
        while (row > 5) {
          row = 0;
          col++;
        }

        dotNode = cc.instantiate(this.node_result);

        if (Round[_i3] == 1) {
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hei'];
        } else if (Round[_i3] == 2) {
          dotNode.getComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hong'];
        }

        if (doublerecord[_i3] == 1) {
          dotNode.children[1].active = true;
        } else if (doublerecord[_i3] == 2) {
          dotNode.children[2].active = true;
        } else if (doublerecord[_i3] == 3) {
          dotNode.children[1].active = true;
          dotNode.children[2].active = true;
        }

        dotNode.parent = node.getChildByName('node_dot');
        dotNode.width = 32;
        dotNode.height = 32;
        dotNode.name = "0";
        dotNode.setPosition(cc.v2(-413 + col * 40, 119 - row * 40));
        dotNode.active = true;
        row++;
      }

      return;
    }

    for (var _i4 = index; _i4 < Round.length; _i4++) {
      while (row > 5) {
        row = 0;
        col++;
      }

      dotNode = new cc.Node();

      if (Round[_i4] == 1) {
        dotNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hei'];
      } else if (Round[_i4] == 2) {
        dotNode.addComponent(cc.Sprite).spriteFrame = this.sprite_Atlas._spriteFrames['img_hong'];
      }

      dotNode.parent = node.getChildByName('node_dot');
      dotNode.width = 32;
      dotNode.height = 32;
      dotNode.name = "0";
      dotNode.setPosition(cc.v2(-413 + col * 40, 119 - row * 40));
      dotNode.active = true;
      row++;
    }
  },
  getIndex: function getIndex(record) {
    var index = 0;

    if (record.length > 16) {
      index = record.length - 16;
    }

    for (var j = index; j < record.length; j++) {
      if (j - index + record[j].count >= 21) {
        index += j - index + record[j].count - 21;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGhvbmdoZWllbnRyeS5qcyJdLCJuYW1lcyI6WyJjYXJ0VHlwZVN0ciIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJnb2xkQ291bnQiLCJjYyIsIkxhYmVsIiwiY29udGVudCIsIk5vZGUiLCJub2RlX3JlY29yZCIsIm5vZGVfcmVzdWx0IiwidHlwZV9ub2RlIiwiaGVscF9QcmVmYWIiLCJQcmVmYWIiLCJzcHJpdGVfQXRsYXMiLCJTcHJpdGVBdGxhcyIsInJlY29yZF9QcmVmYWIiLCJCR00iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlJPT01fRU5URVJfU0hPVyIsIlJvb3ROb2RlU2hvdyIsIlJPT01fRU5URVJfSElERSIsIlJvb3ROb2RlSGlkZSIsImNsaWNrX2JhY2siLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJyb29tVHlwZSIsIm5vZGVJbmZvIiwiZ2FtZVN0YXRlIiwiY29sb3IiLCJzdGF0ZVdvcmQiLCJnYW1lSUQiLCJzY2VuZXRhZyIsIkhPTkdIRUkiLCJyZWFkeXJvb20iLCJvbkNsaWNrIiwibmFtZSIsImNsaWNrX2hlbHAiLCJjbGlja19yZWNvcmQiLCJjbGlja19hZGRnb2xkIiwiY2xpY2tfdXNlcmluZm8iLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInVwZGF0ZVVJIiwidXNlciIsImlzVG91cmlzdCIsInBhbmVsIiwic2hvd1JlZ2lzdGVyZWRHaWZ0Iiwic3VzcGljaW91cyIsImdhbWUiLCJpc19nYW1lIiwic2hvd0RpYWxvZyIsInNob3dTZXJ2aWNlIiwic2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEiLCJyb29tIiwicmVxTXlHYW1lU3RhdGUiLCJwYXJlbnQiLCJ0aGVuIiwiZW50ZXJIdW5kcmVkc1Jvb20iLCJ0YWciLCJjb25zb2xlIiwiZXJyb3IiLCJhY3RpdmUiLCJjbGVhblRpbWVyIiwidW5yZWdpc3RlckV2ZW50IiwiY3V0RmxvYXQiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwic2hvd1VzZXJJbmZvIiwic2hvd1JlbW90ZUltYWdlIiwiUGxheWVyaGVhZCIsImdldCIsImNvaW4iLCJzdHJpbmciLCJHb2xkVGVtcCIsInNldEdhbWVJZCIsInVwZGF0ZUJnSW5mbyIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dTaG9wIiwicmVxRXhpdEFyZWEiLCJyZW1vdmUiLCJzaG93UGFuZWwiLCJzZXQiLCJrZXkiLCJvbkdhbWVJbmZvbGlzdCIsIm9uUm9vbUluZm8iLCJvbkhhbmRJbmZvIiwib25EZWxldGVSb29tIiwib2ZmIiwibXNnIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwicm9vbWlkIiwiZGVzdHJveSIsImxvZyIsImdhbWVJbmZvVGVzdCIsInNlcnZlclRpbWVPZmYiLCJEYXRlIiwibm93Iiwic2VydmVydGltZSIsInJvb21SZWNvcmQiLCJyb29tcmVjb3JkIiwiaGhUeXBlUmVjb3JkIiwic2hvd1JlY29yZCIsInNob3dDYXJkVHlwZSIsInJvb21MaXN0Iiwicm9vbWxpc3QiLCJyb29tZGF0YSIsImJldHR5cGUiLCJjb3VudCIsImluZm9Ob2RlIiwiaW5zdGFudGlhdGUiLCJyb29tc2VydmVyaWQiLCJ3YWl0VGltZSIsIk1hdGgiLCJmbG9vciIsImN1cndhaXR0aW1lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJvbmxpbmUiLCJwcm9jZXNzIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsImNoaWxkcmVuQ291bnQiLCJzdHIiLCJzdWJzdHIiLCJtaW5iZXQiLCJFbnRlclJvb21Hb2xkVGVtcCIsIkNoaXBzIiwibWF4YmV0IiwiTWF4QmV0IiwiRW50cmFuY2VSZXN0cmljdGlvbnMiLCJzaG93Q2xvY2siLCJkYXRhIiwiaW5kZXgiLCJjdXJUeXBlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJnZXRTcHJpdGVGcmFtZSIsImFyZWFJbmRleCIsImdldEZsb2F0Iiwic2V0VGltZU91dCIsInNldEludGVydmFsIiwic2hvd1JvdW5kIiwicmVjb3JkIiwibG9uZyIsImh1IiwiaGUiLCJyb3VuZCIsInJvdW5kQ291bnQiLCJyZXN1bHQiLCJrIiwiaiIsIm51bSIsImRvdE5vZGUiLCJyb3ciLCJjb2wiLCJyZWNvcmRBcnIiLCJnZXRJbmRleCIsImlzQ2hhbmdlUm93IiwibGFiZWxDb2xvciIsIl9zcHJpdGVGcmFtZXMiLCJDb2xvciIsIlJFRCIsIm5ld0NvbCIsIm5ld1JvdyIsInNldFBvc2l0aW9uIiwidjIiLCJzaG93RWZmZWN0Tm9kZSIsImJlYWRwbGF0ZVRyZW5kIiwiUm91bmQiLCJ6IiwiZG91YmxlcmVjb3JkIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRDb21wb25lbnQiLCJjbGVhclRpbWVvdXQiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsV0FBVyxHQUFHO0FBQ2hCLEtBQUcsS0FEYTtBQUVoQixLQUFHLEtBRmE7QUFHaEIsS0FBRyxLQUhhO0FBSWhCLEtBQUcsS0FKYTtBQUtoQixLQUFHLEtBTGE7QUFNaEIsTUFBSSxNQU5ZO0FBT2hCLE1BQUksS0FQWTtBQVFoQixNQUFJLEtBUlk7QUFTaEIsTUFBSSxLQVRZO0FBVWhCLE1BQUksS0FWWTtBQVdoQixNQUFJLEtBWFk7QUFZaEIsTUFBSSxLQVpZO0FBYWhCLE1BQUk7QUFiWSxDQUFwQjtBQWVBQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBRXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFQyxFQUFFLENBQUNDLEtBRE47QUFFUkMsSUFBQUEsT0FBTyxFQUFFRixFQUFFLENBQUNHLElBRko7QUFHUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNHLElBSFI7QUFJUkUsSUFBQUEsV0FBVyxFQUFFTCxFQUFFLENBQUNHLElBSlI7QUFLUkcsSUFBQUEsU0FBUyxFQUFFTixFQUFFLENBQUNHLElBTE47QUFNUkksSUFBQUEsV0FBVyxFQUFFUCxFQUFFLENBQUNRLE1BTlI7QUFPUkMsSUFBQUEsWUFBWSxFQUFFVCxFQUFFLENBQUNVLFdBUFQ7QUFRUkMsSUFBQUEsYUFBYSxFQUFFWCxFQUFFLENBQUNRLE1BUlY7QUFTUkksSUFBQUEsR0FBRyxFQUFFO0FBQStCO0FBQ2hDQyxNQUFBQSxJQUFJLEVBQUNiLEVBQUUsQ0FBQ2MsU0FEUDtBQUVELGlCQUFRO0FBRlA7QUFURyxHQUZRO0FBaUJwQjtBQUVBQyxFQUFBQSxNQW5Cb0Isb0JBbUJYO0FBQ0wsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsRUFBbkI7QUFDQXZCLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQkMsT0FBTyxDQUFDQyxFQUFSLENBQVdDLGVBQTdCLEVBQThDLEtBQUtDLFlBQW5ELEVBQWlFLElBQWpFO0FBQ0E3QixJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLEVBQWYsQ0FBa0JDLE9BQU8sQ0FBQ0MsRUFBUixDQUFXRyxlQUE3QixFQUE4QyxLQUFLQyxZQUFuRCxFQUFpRSxJQUFqRTtBQUNBL0IsSUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxFQUFmLENBQWtCLFlBQWxCLEVBQWdDLEtBQUtPLFVBQXJDLEVBQWlELElBQWpEO0FBQ0FoQyxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsZ0JBQWxCLEVBQW9DLEtBQUtRLGNBQXpDLEVBQXlELElBQXpEO0FBQ0EsU0FBS0EsY0FBTDtBQUNBLFNBQUtDLGFBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCO0FBQUUsU0FBR2pDLEVBQUUsQ0FBQ2tDLEtBQUgsQ0FBUyxHQUFULEVBQWMsRUFBZCxFQUFrQixFQUFsQixDQUFMO0FBQTRCLFNBQUdsQyxFQUFFLENBQUNrQyxLQUFILENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsR0FBbkIsQ0FBL0I7QUFBd0QsU0FBR2xDLEVBQUUsQ0FBQ2tDLEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixFQUFuQixDQUEzRDtBQUFtRixTQUFHbEMsRUFBRSxDQUFDa0MsS0FBSCxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEdBQW5CO0FBQXRGLEtBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQjtBQUFFLFNBQUcsS0FBTDtBQUFZLFNBQUcsS0FBZjtBQUFzQixTQUFHLEtBQXpCO0FBQWdDLFNBQUc7QUFBbkMsS0FBakI7QUFDSCxHQWpDbUI7QUFrQ3BCO0FBQ0FMLEVBQUFBLFlBbkNvQiwwQkFtQ0w7QUFDWCxTQUFLTSxNQUFMLEdBQWN6QyxNQUFNLENBQUMwQyxRQUFQLENBQWdCQyxPQUE5QjtBQUNBM0MsSUFBQUEsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQlQsWUFBakIsQ0FBOEJuQyxNQUFNLENBQUMwQyxRQUFQLENBQWdCQyxPQUE5QztBQUNILEdBdENtQjtBQXVDcEJFLEVBQUFBLE9BdkNvQixtQkF1Q1pDLElBdkNZLEVBdUNOeEIsSUF2Q00sRUF1Q0E7QUFBQTs7QUFDaEIsWUFBUXdCLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFBaUIsYUFBS2QsVUFBTDtBQUFtQjs7QUFDcEMsV0FBSyxVQUFMO0FBQWlCLGFBQUtlLFVBQUw7QUFBbUI7O0FBQ3BDLFdBQUssWUFBTDtBQUFtQixhQUFLQyxZQUFMO0FBQXFCOztBQUN4QyxXQUFLLFlBQUw7QUFBbUIsYUFBS0MsYUFBTDtBQUFzQjs7QUFDekMsV0FBSyxRQUFMO0FBQWUsYUFBS0MsY0FBTDtBQUF1Qjs7QUFDdEMsV0FBSyxjQUFMO0FBQXFCLGFBQUtELGFBQUw7QUFBc0I7O0FBQzNDLFdBQUssWUFBTDtBQUNJLFlBQUksS0FBS2IsUUFBTCxJQUFpQixDQUFyQixFQUF3QjtBQUNwQixlQUFLQSxRQUFMLEdBQWdCLENBQWhCLENBRG9CLENBRXBCOztBQUNBLGVBQUs3QixPQUFMLENBQWE0QyxrQkFBYjtBQUNBLGVBQUs1QyxPQUFMLENBQWE2QyxpQkFBYjtBQUNBLGVBQUtDLFFBQUw7QUFDSDs7QUFDRDs7QUFDSixXQUFLLGFBQUw7QUFDSSxZQUFJLEtBQUtqQixRQUFMLElBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FEb0IsQ0FFcEI7O0FBQ0EsZUFBSzdCLE9BQUwsQ0FBYTRDLGtCQUFiO0FBQ0EsZUFBSzVDLE9BQUwsQ0FBYTZDLGlCQUFiO0FBQ0EsZUFBS0MsUUFBTDtBQUNIOztBQUNEOztBQUNKLFdBQUssbUJBQUw7QUFDSSxZQUFJLEtBQUtqQixRQUFMLElBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FEb0IsQ0FFcEI7O0FBQ0EsZUFBSzdCLE9BQUwsQ0FBYTRDLGtCQUFiO0FBQ0EsZUFBSzVDLE9BQUwsQ0FBYTZDLGlCQUFiO0FBQ0EsZUFBS0MsUUFBTDtBQUNIOztBQUNEOztBQUNKLFdBQUssZUFBTDtBQUNJLFlBQUksS0FBS2pCLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDcEIsZUFBS0EsUUFBTCxHQUFnQixDQUFoQixDQURvQixDQUVwQjs7QUFDQSxlQUFLN0IsT0FBTCxDQUFhNEMsa0JBQWI7QUFDQSxlQUFLNUMsT0FBTCxDQUFhNkMsaUJBQWI7QUFDQSxlQUFLQyxRQUFMO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBSyxlQUFMO0FBQ0ksWUFBSSxLQUFLakIsUUFBTCxJQUFpQixDQUFyQixFQUF3QjtBQUNwQixlQUFLQSxRQUFMLEdBQWdCLENBQWhCLENBRG9CLENBRXBCOztBQUNBLGVBQUs3QixPQUFMLENBQWE0QyxrQkFBYjtBQUNBLGVBQUs1QyxPQUFMLENBQWE2QyxpQkFBYjtBQUNBLGVBQUtDLFFBQUw7QUFDSDs7QUFDRDs7QUFDSixXQUFLLGNBQUw7QUFDSSxZQUFJLEtBQUtqQixRQUFMLElBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLGVBQUtBLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FEb0IsQ0FFcEI7O0FBQ0EsZUFBSzdCLE9BQUwsQ0FBYTRDLGtCQUFiO0FBQ0EsZUFBSzVDLE9BQUwsQ0FBYTZDLGlCQUFiO0FBQ0EsZUFBS0MsUUFBTDtBQUNIOztBQUNEOztBQUNKLFdBQUssV0FBTDtBQUNBLFdBQUssV0FBTDtBQUNJLFlBQUlyRCxNQUFNLENBQUNzRCxJQUFQLENBQVlDLFNBQVosRUFBSixFQUE2QjtBQUN6QnZELFVBQUFBLE1BQU0sQ0FBQ3dELEtBQVAsQ0FBYUMsa0JBQWIsQ0FBZ0MsSUFBaEM7QUFDQTtBQUNIOztBQUNELFlBQUt6RCxNQUFNLENBQUNzRCxJQUFQLENBQVlJLFVBQVosSUFBMEIsQ0FBMUIsSUFBK0IxRCxNQUFNLENBQUNzRCxJQUFQLENBQVlLLElBQVosSUFBb0IsQ0FBcEQsSUFBMEQzRCxNQUFNLENBQUNzRCxJQUFQLENBQVlNLE9BQVosSUFBdUIsQ0FBckYsRUFBd0Y7QUFDcEY1RCxVQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFLLFVBQWIsQ0FBd0IsRUFBeEIsRUFBNEIsK0JBQTVCLEVBQTZELFlBQU07QUFDL0Q3RCxZQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFNLFdBQWI7QUFDSCxXQUZELEVBRUcsWUFBTSxDQUNSLENBSEQsRUFHRyxNQUhILEVBR1csTUFIWDtBQUlBO0FBQ0g7O0FBQ0Q5RCxRQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFPLHVCQUFiO0FBQ0EvRCxRQUFBQSxNQUFNLENBQUNnRSxJQUFQLENBQVlDLGNBQVosQ0FBMkIsS0FBS3hCLE1BQWhDLEVBQXdDLEtBQUtKLFFBQUwsQ0FBY2YsSUFBSSxDQUFDNEMsTUFBTCxDQUFZcEIsSUFBMUIsRUFBZ0M1QixJQUF4RSxFQUE4RUksSUFBSSxDQUFDNEMsTUFBTCxDQUFZcEIsSUFBMUYsRUFBZ0dxQixJQUFoRyxDQUFxRyxZQUFNO0FBQ3ZHbkUsVUFBQUEsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQndCLGlCQUFqQixDQUFtQzlDLElBQUksQ0FBQzRDLE1BQUwsQ0FBWXBCLElBQS9DLEVBQXFELEtBQUksQ0FBQ1QsUUFBTCxDQUFjZixJQUFJLENBQUM0QyxNQUFMLENBQVlwQixJQUExQixFQUFnQ3VCLEdBQXJGO0FBQ0gsU0FGRDtBQUdBOztBQUNKO0FBQVNDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDekIsSUFBM0M7QUEvRWI7QUFpRkgsR0F6SG1CO0FBMEhwQmpCLEVBQUFBLFlBMUhvQiwwQkEwSEw7QUFDWCxTQUFLUCxJQUFMLENBQVVrRCxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsU0FBS3RDLGFBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixFQUFoQjtBQUNILEdBL0htQjtBQWdJcEJOLEVBQUFBLFlBaElvQiwwQkFnSUw7QUFDWCxTQUFLVCxJQUFMLENBQVVrRCxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS2pFLE9BQUwsQ0FBYTRDLGtCQUFiO0FBQ0EsU0FBSzVDLE9BQUwsQ0FBYTZDLGlCQUFiO0FBQ0EsU0FBS3FCLFVBQUw7QUFDQSxTQUFLQyxlQUFMO0FBQ0gsR0F0SW1CO0FBdUlwQkMsRUFBQUEsUUF2SW9CLG9CQXVJWEMsS0F2SVcsRUF1SUo7QUFDWixXQUFRQyxNQUFNLENBQUNELEtBQUQsQ0FBTixDQUFjRSxHQUFkLENBQWtCLEdBQWxCLENBQUQsQ0FBeUJDLFFBQXpCLEVBQVA7QUFDSCxHQXpJbUI7QUEwSXBCQyxFQUFBQSxZQTFJb0IsMEJBMElMO0FBQ1hoRixJQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWF5QixlQUFiLENBQTZCLEtBQUtDLFVBQWxDLEVBQThDbEYsTUFBTSxDQUFDc0QsSUFBUCxDQUFZNkIsR0FBWixDQUFnQixTQUFoQixDQUE5QztBQUNILEdBNUltQjtBQTZJcEJsRCxFQUFBQSxjQTdJb0IsNEJBNklIO0FBQ2IsUUFBSW1ELElBQUksR0FBR3BGLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWTZCLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBWDtBQUNBLFNBQUsvRSxTQUFMLENBQWVpRixNQUFmLEdBQXdCckYsTUFBTSxDQUFDc0QsSUFBUCxDQUFZZ0MsUUFBWixDQUFxQkYsSUFBckIsQ0FBeEI7QUFDSCxHQWhKbUI7QUFrSnBCRyxFQUFBQSxTQWxKb0IscUJBa0pWbEUsTUFsSlUsRUFrSkY7QUFDZCxTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxHQXBKbUI7QUFzSnBCbUUsRUFBQUEsWUF0Sm9CLDBCQXNKTCxDQUVkLENBeEptQjtBQXlKcEJ0QyxFQUFBQSxjQXpKb0IsNEJBeUpIO0FBQ2JsRCxJQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFpQyxlQUFiLENBQTZCLFVBQTdCO0FBQ0gsR0EzSm1CO0FBNEpwQnhDLEVBQUFBLGFBNUpvQiwyQkE0Sko7QUFDWmpELElBQUFBLE1BQU0sQ0FBQ3dELEtBQVAsQ0FBYWtDLFFBQWIsQ0FBc0IsRUFBdEI7QUFDSCxHQTlKbUI7QUErSnBCMUQsRUFBQUEsVUEvSm9CLHdCQStKUDtBQUNUaEMsSUFBQUEsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQitDLFdBQWpCO0FBQ0EsU0FBS0MsTUFBTDtBQUNILEdBbEttQjtBQW1LcEI3QyxFQUFBQSxVQW5Lb0Isd0JBbUtQO0FBQ1QvQyxJQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFxQyxTQUFiLENBQXVCLEtBQUtqRixXQUE1QixFQUF5Q1csTUFBekMsR0FBa0QsRUFBbEQ7QUFDSCxHQXJLbUI7QUFzS3BCeUIsRUFBQUEsWUF0S29CLDBCQXNLTDtBQUNYO0FBQ0FoRCxJQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFxQyxTQUFiLENBQXVCLEtBQUs3RSxhQUE1QixFQUEyQ08sTUFBM0MsR0FBb0QsRUFBcEQ7QUFDSCxHQXpLbUI7QUEyS3BCdUUsRUFBQUEsR0EzS29CLGVBMktoQkMsR0EzS2dCLEVBMktYbkIsS0EzS1csRUEyS0o7QUFDWixTQUFLbUIsR0FBTCxJQUFZbkIsS0FBWjtBQUNILEdBN0ttQjtBQThLcEJPLEVBQUFBLEdBOUtvQixlQThLaEJZLEdBOUtnQixFQThLWDtBQUNMLFdBQU8sS0FBS0EsR0FBTCxDQUFQO0FBQ0gsR0FoTG1CO0FBaUxwQjtBQUNBN0QsRUFBQUEsYUFsTG9CLDJCQWtMSjtBQUNabEMsSUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxFQUFmLENBQWtCLHFCQUFsQixFQUF5QyxLQUFLdUUsY0FBOUMsRUFBOEQsSUFBOUQ7QUFDQWhHLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixpQkFBbEIsRUFBcUMsS0FBS3dFLFVBQTFDLEVBQXNELElBQXREO0FBQ0FqRyxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsaUJBQWxCLEVBQXFDLEtBQUt5RSxVQUExQyxFQUFzRCxJQUF0RDtBQUNBbEcsSUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxFQUFmLENBQWtCLG1CQUFsQixFQUF1QyxLQUFLMEUsWUFBNUMsRUFBMEQsSUFBMUQ7QUFDSCxHQXZMbUI7QUF3THBCO0FBQ0F6QixFQUFBQSxlQXpMb0IsNkJBeUxGO0FBQ2QxRSxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWU0RSxHQUFmLENBQW1CLHFCQUFuQixFQUEwQyxJQUExQztBQUNBcEcsSUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlNEUsR0FBZixDQUFtQixpQkFBbkIsRUFBc0MsSUFBdEM7QUFDQXBHLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZTRFLEdBQWYsQ0FBbUIsaUJBQW5CLEVBQXNDLElBQXRDO0FBQ0FwRyxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWU0RSxHQUFmLENBQW1CLG1CQUFuQixFQUF3QyxJQUF4QztBQUNILEdBOUxtQjtBQStMcEI7QUFDQTtBQUNBRCxFQUFBQSxZQWpNb0Isd0JBaU1QRSxHQWpNTyxFQWlNRjtBQUNkLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLL0YsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkMsTUFBMUMsRUFBa0RGLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBSSxLQUFLL0YsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ4RCxJQUF6QixJQUFpQ3VELEdBQUcsQ0FBQ0ksTUFBekMsRUFBaUQ7QUFDN0MsYUFBS2xHLE9BQUwsQ0FBYWdHLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCSSxPQUF6QjtBQUNIO0FBQ0o7QUFFSixHQXhNbUI7QUF5TXBCVixFQUFBQSxjQXpNb0IsMEJBeU1MSyxHQXpNSyxFQXlNQTtBQUNoQmhHLElBQUFBLEVBQUUsQ0FBQ3NHLEdBQUgsQ0FBTyxZQUFQLEVBQXFCTixHQUFyQjtBQUNBLFNBQUs5RixPQUFMLENBQWE0QyxrQkFBYjtBQUNBLFNBQUs1QyxPQUFMLENBQWE2QyxpQkFBYjtBQUNBLFNBQUt3RCxZQUFMLEdBQW9CNUcsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQnVDLEdBQWpCLENBQXFCLFVBQXJCLENBQXBCO0FBQ0FiLElBQUFBLE9BQU8sQ0FBQ3FDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxLQUFLQyxZQUF0QztBQUNBLFFBQUksQ0FBQyxLQUFLQSxZQUFWLEVBQXdCO0FBQ3hCLFNBQUtDLGFBQUwsR0FBcUJDLElBQUksQ0FBQ0MsR0FBTCxLQUFhVixHQUFHLENBQUNXLFVBQXRDO0FBQ0EsU0FBSzNELFFBQUw7QUFDSCxHQWxObUI7QUFtTnBCNkMsRUFBQUEsVUFuTm9CLHNCQW1OVEcsR0FuTlMsRUFtTko7QUFDWixTQUFLWSxVQUFMLEdBQWtCakgsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQnNFLFVBQW5DO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQm5ILE1BQU0sQ0FBQzRDLFNBQVAsQ0FBaUJ1RSxZQUFyQztBQUNBN0MsSUFBQUEsT0FBTyxDQUFDcUMsR0FBUixDQUFZLElBQVosRUFBa0IsS0FBS00sVUFBdkI7O0FBQ0EsU0FBSyxJQUFJWCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixFQUF5QnhELElBQXpCLElBQWlDdUQsR0FBRyxDQUFDSSxNQUF6QyxFQUFpRDtBQUM3QyxhQUFLVyxVQUFMLENBQWdCLEtBQUs3RyxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixDQUFoQixFQUEwQyxLQUFLVyxVQUFMLENBQWdCWixHQUFHLENBQUNJLE1BQXBCLENBQTFDLEVBQXVFSixHQUFHLENBQUNJLE1BQTNFO0FBQ0EsYUFBS1ksWUFBTCxDQUFrQixLQUFLOUcsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsQ0FBbEIsRUFBNENELEdBQUcsQ0FBQ0ksTUFBaEQ7QUFDSDtBQUNKO0FBQ0osR0E3Tm1CO0FBOE5wQlIsRUFBQUEsVUE5Tm9CLHNCQThOVEksR0E5TlMsRUE4Tko7QUFDWjtBQUNBL0IsSUFBQUEsT0FBTyxDQUFDcUMsR0FBUixDQUFZLEdBQVo7QUFDQSxTQUFLVyxRQUFMLEdBQWdCdEgsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQjJFLFFBQWpDO0FBQ0EsU0FBS1YsYUFBTCxHQUFxQkMsSUFBSSxDQUFDQyxHQUFMLEtBQWFWLEdBQUcsQ0FBQ1csVUFBdEMsQ0FKWSxDQUtaOztBQUNBLFFBQUksS0FBSzVFLFFBQUwsSUFBaUJpRSxHQUFHLENBQUNtQixRQUFKLENBQWFDLE9BQTlCLElBQXlDLEtBQUtyRixRQUFMLEtBQWtCLENBQS9ELEVBQWtFO0FBQ2xFLFFBQUlzRixLQUFLLEdBQUcsQ0FBWjs7QUFDQSxTQUFLLElBQUlwQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixFQUF5QnhELElBQXpCLElBQWlDdUQsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUFsRCxFQUEwRDtBQUN0RGlCLFFBQUFBLEtBQUs7QUFDUjtBQUNKOztBQUNELFFBQUlBLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ1osVUFBSUMsUUFBUSxHQUFHdEgsRUFBRSxDQUFDdUgsV0FBSCxDQUFlLEtBQUtuSCxXQUFwQixDQUFmO0FBQ0FrSCxNQUFBQSxRQUFRLENBQUN6RCxNQUFULEdBQWtCLEtBQUszRCxPQUF2QjtBQUNBb0gsTUFBQUEsUUFBUSxDQUFDbkQsTUFBVCxHQUFrQixJQUFsQjtBQUNBbUQsTUFBQUEsUUFBUSxDQUFDN0UsSUFBVCxhQUFtQnVELEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBaEM7QUFDQSxXQUFLcEUsUUFBTCxDQUFjc0YsUUFBUSxDQUFDN0UsSUFBdkIsSUFBK0I7QUFDM0J1QixRQUFBQSxHQUFHLEVBQUUsS0FBS2lELFFBQUwsQ0FBY2pCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYUMsT0FBM0IsRUFBb0NwQixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQWpELEVBQXlEb0IsWUFEbkM7QUFFM0IzRyxRQUFBQSxJQUFJLEVBQUVtRixHQUFHLENBQUNtQixRQUFKLENBQWFDO0FBRlEsT0FBL0I7QUFJQSxVQUFJSyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsS0FBS1YsUUFBTCxDQUFjakIsR0FBRyxDQUFDbUIsUUFBSixDQUFhQyxPQUEzQixFQUFvQ3BCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBakQsRUFBeUR3QixXQUF6RCxJQUF3RW5CLElBQUksQ0FBQ0MsR0FBTCxLQUFhLEtBQUtGLGFBQTFGLENBQUQsSUFBNkcsSUFBeEgsQ0FBZjtBQUNBYyxNQUFBQSxRQUFRLENBQUNHLFFBQVQsR0FBb0JBLFFBQXBCO0FBQ0FILE1BQUFBLFFBQVEsQ0FBQ08sY0FBVCxDQUF3QixVQUF4QixFQUFvQ0MsWUFBcEMsQ0FBaUQ5SCxFQUFFLENBQUNDLEtBQXBELEVBQTJEK0UsTUFBM0QsR0FBb0V5QyxRQUFRLEdBQUcsR0FBL0U7QUFDQUgsTUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxZQUFyQyxDQUFrRDlILEVBQUUsQ0FBQ0MsS0FBckQsRUFBNEQrRSxNQUE1RCxHQUFxRSxLQUFLaUMsUUFBTCxDQUFjakIsR0FBRyxDQUFDbUIsUUFBSixDQUFhQyxPQUEzQixFQUFvQ3BCLEdBQUcsQ0FBQ21CLFFBQUosQ0FBYWYsTUFBakQsRUFBeUQyQixNQUE5SDtBQUNBVCxNQUFBQSxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFlBQWxDLENBQStDOUgsRUFBRSxDQUFDQyxLQUFsRCxFQUF5RCtFLE1BQXpELEdBQWtFZ0IsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUEvRTtBQUVBLFdBQUtRLFVBQUwsR0FBa0JqSCxNQUFNLENBQUM0QyxTQUFQLENBQWlCc0UsVUFBbkM7QUFDQSxXQUFLRSxVQUFMLENBQWdCTyxRQUFoQixFQUEwQixLQUFLVixVQUFMLENBQWdCWixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTdCLENBQTFCLEVBQWdFSixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQTdFO0FBQ0EsV0FBS1ksWUFBTCxDQUFrQk0sUUFBbEIsRUFBNEJ0QixHQUFHLENBQUNtQixRQUFKLENBQWFmLE1BQXpDO0FBRUg7O0FBQ0QsU0FBSyxJQUFJSCxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCQyxNQUExQyxFQUFrREYsRUFBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QnhELElBQXpCLElBQWlDdUQsR0FBRyxDQUFDbUIsUUFBSixDQUFhZixNQUFsRCxFQUEwRDtBQUN0RCxZQUFJcUIsU0FBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDM0IsR0FBRyxDQUFDbUIsUUFBSixDQUFhUyxXQUFiLElBQTRCbkIsSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS0YsYUFBOUMsQ0FBRCxJQUFpRSxJQUE1RSxDQUFmOztBQUNBLGFBQUt0RyxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QndCLFFBQXpCLEdBQW9DQSxTQUFwQztBQUNBLGFBQUt2SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLFVBQXhDLEVBQW9EQyxZQUFwRCxDQUFpRTlILEVBQUUsQ0FBQ0MsS0FBcEUsRUFBMkUrRSxNQUEzRSxHQUFvRnlDLFNBQVEsR0FBRyxHQUEvRjtBQUNBLGFBQUt2SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLFdBQXhDLEVBQXFEM0YsS0FBckQsR0FBNkQsS0FBS0QsU0FBTCxDQUFlK0QsR0FBRyxDQUFDbUIsUUFBSixDQUFhYSxPQUE1QixDQUE3RDtBQUNBLGFBQUs5SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLFVBQXhDLEVBQW9EM0YsS0FBcEQsR0FBNEQsS0FBS0QsU0FBTCxDQUFlK0QsR0FBRyxDQUFDbUIsUUFBSixDQUFhYSxPQUE1QixDQUE1RDtBQUNBLGFBQUs5SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QitCLE9BQXpCLEdBQW1DaEMsR0FBRyxDQUFDbUIsUUFBSixDQUFhYSxPQUFoRDtBQUNBLGFBQUs5SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLFdBQXhDLEVBQXFEQyxZQUFyRCxDQUFrRTlILEVBQUUsQ0FBQ0MsS0FBckUsRUFBNEUrRSxNQUE1RSxHQUFxRixLQUFLN0MsU0FBTCxDQUFlNkQsR0FBRyxDQUFDbUIsUUFBSixDQUFhYSxPQUE1QixDQUFyRjtBQUNBLGFBQUs5SCxPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxFQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLGNBQXhDLEVBQXdEQSxjQUF4RCxDQUF1RSxXQUF2RSxFQUFvRkMsWUFBcEYsQ0FBaUc5SCxFQUFFLENBQUNDLEtBQXBHLEVBQTJHK0UsTUFBM0csR0FBb0hnQixHQUFHLENBQUNtQixRQUFKLENBQWFZLE1BQWpJO0FBQ0g7QUFDSjtBQUNKLEdBM1FtQjtBQTRRcEI7QUFDQS9FLEVBQUFBLFFBN1FvQixzQkE2UVQ7QUFDUCxTQUFLaUUsUUFBTCxHQUFnQixFQUFoQjs7QUFFQSxTQUFLLElBQUl2QixHQUFULElBQWdCL0YsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQjJFLFFBQWpCLENBQTBCLEtBQUtuRixRQUEvQixDQUFoQixFQUEwRDtBQUN0RCxXQUFLa0YsUUFBTCxDQUFjZ0IsSUFBZCxDQUFtQnRJLE1BQU0sQ0FBQzRDLFNBQVAsQ0FBaUIyRSxRQUFqQixDQUEwQixLQUFLbkYsUUFBL0IsRUFBeUMyRCxHQUF6QyxDQUFuQjtBQUNIOztBQUVELFNBQUt1QixRQUFMLENBQWNpQixJQUFkLENBQW1CLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3pCLGFBQU9ELENBQUMsQ0FBQ2YsT0FBRixHQUFZZ0IsQ0FBQyxDQUFDaEIsT0FBckI7QUFDSCxLQUZEO0FBR0EsU0FBS1IsVUFBTCxHQUFrQmpILE1BQU0sQ0FBQzRDLFNBQVAsQ0FBaUJzRSxVQUFuQzs7QUFDQSxRQUFJLENBQUMsS0FBS0ksUUFBVixFQUFvQjtBQUNoQjtBQUNIOztBQUNELFNBQUs3QyxVQUFMO0FBQ0EsU0FBSzBDLFlBQUwsR0FBb0JuSCxNQUFNLENBQUM0QyxTQUFQLENBQWlCdUUsWUFBckM7O0FBQ0EsU0FBSyxJQUFJVixNQUFULElBQW1CLEtBQUthLFFBQXhCLEVBQWtDO0FBQzlCLFVBQUcsQ0FBQyxLQUFLQSxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQTFCLEVBQWlDO0FBQzdCO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDLEtBQUthLFFBQUwsQ0FBY2IsTUFBZCxDQUFMLEVBQTRCOztBQUM1QixXQUFLLElBQUlILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSy9GLE9BQUwsQ0FBYW1JLGFBQWpDLEVBQWdEcEMsQ0FBQyxFQUFqRCxFQUFxRDtBQUNqRCxZQUFJLEtBQUsvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixFQUF5QnhELElBQXpCLElBQWlDLEtBQUt3RSxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQTNELEVBQW1FO0FBQy9EO0FBQ0g7QUFDSjs7QUFDRCxVQUFJa0IsUUFBUSxHQUFHdEgsRUFBRSxDQUFDdUgsV0FBSCxDQUFlLEtBQUtuSCxXQUFwQixDQUFmO0FBQ0FrSCxNQUFBQSxRQUFRLENBQUN6RCxNQUFULEdBQWtCLEtBQUszRCxPQUF2QjtBQUNBb0gsTUFBQUEsUUFBUSxDQUFDbkQsTUFBVCxHQUFrQixJQUFsQjtBQUNBbUQsTUFBQUEsUUFBUSxDQUFDN0UsSUFBVCxhQUFtQixLQUFLd0UsUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUF6QztBQUNBLFdBQUtwRSxRQUFMLENBQWNzRixRQUFRLENBQUM3RSxJQUF2QixJQUErQjtBQUMzQnVCLFFBQUFBLEdBQUcsRUFBRSxLQUFLaUQsUUFBTCxDQUFjYixNQUFkLEVBQXNCb0IsWUFEQTtBQUUzQjNHLFFBQUFBLElBQUksRUFBRSxLQUFLb0csUUFBTCxDQUFjYixNQUFkLEVBQXNCZ0I7QUFGRCxPQUEvQjtBQUlBLFVBQUlrQixHQUFHLEdBQUcsS0FBS3JCLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQkEsTUFBdEIsQ0FBNkIxQixRQUE3QixFQUFWO0FBQ0E0QyxNQUFBQSxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFlBQWxDLENBQStDOUgsRUFBRSxDQUFDQyxLQUFsRCxFQUF5RCtFLE1BQXpELEdBQWtFc0QsR0FBRyxDQUFDbkMsTUFBSixHQUFhLENBQWIsR0FBaUJtQyxHQUFHLENBQUNDLE1BQUosQ0FBV0QsR0FBRyxDQUFDbkMsTUFBSixHQUFhLENBQXhCLENBQWpCLEdBQThDbUMsR0FBaEg7QUFFQWhCLE1BQUFBLFFBQVEsQ0FBQ08sY0FBVCxDQUF3QixjQUF4QixFQUF3Q0EsY0FBeEMsQ0FBdUQsV0FBdkQsRUFBb0VDLFlBQXBFLENBQWlGOUgsRUFBRSxDQUFDQyxLQUFwRixFQUEyRitFLE1BQTNGLEdBQW9HLEtBQUtpQyxRQUFMLENBQWNiLE1BQWQsRUFBc0IyQixNQUExSDtBQUNBLFVBQUlTLE1BQU0sR0FBRzdJLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWXdGLGlCQUFaLENBQThCLEtBQUtsQyxZQUFMLENBQWtCLEtBQUtVLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQmdCLE9BQXhDLEVBQWlEc0IsS0FBakQsQ0FBdUQsQ0FBdkQsQ0FBOUIsQ0FBYjtBQUFBLFVBQ0lDLE1BQU0sR0FBR2hKLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWXdGLGlCQUFaLENBQThCLEtBQUtsQyxZQUFMLENBQWtCLEtBQUtVLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQmdCLE9BQXhDLEVBQWlEd0IsTUFBL0UsQ0FEYjtBQUVBdEIsTUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQSxjQUFyQyxDQUFvRCxVQUFwRCxFQUFnRUMsWUFBaEUsQ0FBNkU5SCxFQUFFLENBQUNDLEtBQWhGLEVBQXVGK0UsTUFBdkYsR0FBZ0d3RCxNQUFNLEdBQUcsR0FBVCxHQUFlRyxNQUEvRztBQUNBckIsTUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxZQUFyQyxDQUFrRDlILEVBQUUsQ0FBQ0MsS0FBckQsRUFBNEQrRSxNQUE1RCxHQUFxRSxLQUFLN0MsU0FBTCxDQUFlLEtBQUs4RSxRQUFMLENBQWNiLE1BQWQsRUFBc0I0QixPQUFyQyxDQUFyRTtBQUNBVixNQUFBQSxRQUFRLENBQUNVLE9BQVQsR0FBbUIsS0FBS2YsUUFBTCxDQUFjYixNQUFkLEVBQXNCNEIsT0FBekM7O0FBQ0EsVUFBSSxLQUFLekIsWUFBTCxDQUFrQixLQUFLVSxRQUFMLENBQWNiLE1BQWQsRUFBc0JnQixPQUF4QyxFQUFpRHlCLG9CQUFqRCxJQUF5RWxKLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWTZCLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBekUsSUFBb0csQ0FBQ25GLE1BQU0sQ0FBQ3NELElBQVAsQ0FBWUMsU0FBWixFQUF6RyxFQUFrSTtBQUM5SG9FLFFBQUFBLFFBQVEsQ0FBQ08sY0FBVCxDQUF3QixXQUF4QixFQUFxQ0EsY0FBckMsQ0FBb0QsU0FBcEQsRUFBK0QxRCxNQUEvRCxHQUF3RSxLQUF4RTtBQUNBbUQsUUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQSxjQUFyQyxDQUFvRCxPQUFwRCxFQUE2RDFELE1BQTdELEdBQXNFLEtBQXRFO0FBQ0gsT0FIRCxNQUdPO0FBQ0htRCxRQUFBQSxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNBLGNBQXJDLENBQW9ELFNBQXBELEVBQStEMUQsTUFBL0QsR0FBd0UsSUFBeEU7QUFDQW1ELFFBQUFBLFFBQVEsQ0FBQ08sY0FBVCxDQUF3QixXQUF4QixFQUFxQ0EsY0FBckMsQ0FBb0QsT0FBcEQsRUFBNkQxRCxNQUE3RCxHQUFzRSxJQUF0RTtBQUNIOztBQUNELFVBQUlzRCxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsS0FBS1YsUUFBTCxDQUFjYixNQUFkLEVBQXNCd0IsV0FBdEIsSUFBcUNuQixJQUFJLENBQUNDLEdBQUwsS0FBYSxLQUFLRixhQUF2RCxDQUFELElBQTBFLElBQXJGLENBQWY7QUFDQWMsTUFBQUEsUUFBUSxDQUFDRyxRQUFULEdBQW9CQSxRQUFwQjtBQUNBSCxNQUFBQSxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MzRixLQUFwQyxHQUE0Q3VGLFFBQVEsSUFBSSxDQUFaLElBQWlCLEtBQUtSLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQjRCLE9BQXRCLElBQWlDLENBQWxELEdBQXNELEtBQUsvRixTQUFMLENBQWUsQ0FBZixDQUF0RCxHQUEwRSxLQUFLQSxTQUFMLENBQWUsS0FBS2dGLFFBQUwsQ0FBY2IsTUFBZCxFQUFzQjRCLE9BQXJDLENBQXRIO0FBQ0FWLE1BQUFBLFFBQVEsQ0FBQ08sY0FBVCxDQUF3QixXQUF4QixFQUFxQzNGLEtBQXJDLEdBQTZDdUYsUUFBUSxJQUFJLENBQVosSUFBaUIsS0FBS1IsUUFBTCxDQUFjYixNQUFkLEVBQXNCNEIsT0FBdEIsSUFBaUMsQ0FBbEQsR0FBc0QsS0FBSy9GLFNBQUwsQ0FBZSxDQUFmLENBQXRELEdBQTBFLEtBQUtBLFNBQUwsQ0FBZSxLQUFLZ0YsUUFBTCxDQUFjYixNQUFkLEVBQXNCNEIsT0FBckMsQ0FBdkg7QUFDQVYsTUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLFVBQXhCLEVBQW9DQyxZQUFwQyxDQUFpRDlILEVBQUUsQ0FBQ0MsS0FBcEQsRUFBMkQrRSxNQUEzRCxHQUFvRXlDLFFBQVEsR0FBRyxHQUEvRTtBQUNBLFdBQUtWLFVBQUwsQ0FBZ0JPLFFBQWhCLEVBQTBCLEtBQUtWLFVBQUwsQ0FBZ0IsS0FBS0ssUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUF0QyxDQUExQixFQUF5RSxLQUFLYSxRQUFMLENBQWNiLE1BQWQsRUFBc0JBLE1BQS9GO0FBQ0EsV0FBS1ksWUFBTCxDQUFrQk0sUUFBbEIsRUFBNEIsS0FBS0wsUUFBTCxDQUFjYixNQUFkLEVBQXNCQSxNQUFsRDtBQUNIOztBQUNELFNBQUswQyxTQUFMO0FBQ0gsR0F4VW1CO0FBeVVwQjlCLEVBQUFBLFlBelVvQix3QkF5VVBNLFFBelVPLEVBeVVHbEIsTUF6VUgsRUF5VVc7QUFDM0IsUUFBSTJDLElBQUksR0FBRyxLQUFLakMsWUFBTCxDQUFrQlYsTUFBbEIsQ0FBWDtBQUNBLFFBQUksQ0FBQzJDLElBQUwsRUFBVztBQUNYekIsSUFBQUEsUUFBUSxDQUFDTyxjQUFULENBQXdCLE9BQXhCLEVBQWlDL0Usa0JBQWpDO0FBQ0F3RSxJQUFBQSxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUM5RSxpQkFBakM7QUFDQSxRQUFJaUcsS0FBSyxHQUFHRCxJQUFJLENBQUM1QyxNQUFMLEdBQWMsQ0FBZCxHQUFrQjRDLElBQUksQ0FBQzVDLE1BQUwsR0FBYyxDQUFoQyxHQUFvQyxDQUFoRDs7QUFDQSxTQUFLLElBQUlGLENBQUMsR0FBRytDLEtBQWIsRUFBb0IvQyxDQUFDLEdBQUc4QyxJQUFJLENBQUM1QyxNQUE3QixFQUFxQ0YsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QyxVQUFJM0YsU0FBUyxHQUFHTixFQUFFLENBQUN1SCxXQUFILENBQWUsS0FBS2pILFNBQXBCLENBQWhCO0FBQ0FBLE1BQUFBLFNBQVMsQ0FBQ3VELE1BQVYsR0FBbUJ5RCxRQUFRLENBQUNPLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBbkI7QUFDQXZILE1BQUFBLFNBQVMsQ0FBQ3VILGNBQVYsQ0FBeUIsVUFBekIsRUFBcUNDLFlBQXJDLENBQWtEOUgsRUFBRSxDQUFDQyxLQUFyRCxFQUE0RCtFLE1BQTVELEdBQXFFdEYsV0FBVyxDQUFDcUosSUFBSSxDQUFDOUMsQ0FBRCxDQUFKLENBQVFnRCxPQUFULENBQWhGO0FBQ0EzSSxNQUFBQSxTQUFTLENBQUN3SCxZQUFWLENBQXVCOUgsRUFBRSxDQUFDa0osTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUsxSSxZQUFMLENBQWtCMkksY0FBbEIsQ0FBaUNMLElBQUksQ0FBQzlDLENBQUQsQ0FBSixDQUFRb0QsU0FBUixJQUFxQixDQUFyQixHQUF5QixXQUF6QixHQUF1QyxZQUF4RSxDQUFoRDtBQUNBL0ksTUFBQUEsU0FBUyxDQUFDdUgsY0FBVixDQUF5QixVQUF6QixFQUFxQzNGLEtBQXJDLEdBQTZDNkcsSUFBSSxDQUFDOUMsQ0FBRCxDQUFKLENBQVFnRCxPQUFSLElBQW1CLENBQW5CLEdBQXVCakosRUFBRSxDQUFDa0MsS0FBSCxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEdBQW5CLENBQXZCLEdBQWlEbEMsRUFBRSxDQUFDa0MsS0FBSCxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEVBQW5CLENBQTlGO0FBQ0E1QixNQUFBQSxTQUFTLENBQUM2RCxNQUFWLEdBQW1CLElBQW5CO0FBQ0g7QUFDSixHQXZWbUI7QUF3VnBCO0FBQ0FtRixFQUFBQSxRQXpWb0Isb0JBeVZYL0UsS0F6VlcsRUF5Vko7QUFDWixXQUFRQyxNQUFNLENBQUNELEtBQUQsQ0FBTixDQUFjRSxHQUFkLENBQWtCLEdBQWxCLENBQUQsQ0FBeUJDLFFBQXpCLEVBQVA7QUFDSCxHQTNWbUI7QUE0VnBCO0FBQ0FvRSxFQUFBQSxTQTdWb0IsdUJBNlZSO0FBQUE7O0FBQ1IsU0FBS1MsVUFBTCxHQUFrQkMsV0FBVyxDQUFDLFlBQU07QUFDaEMsVUFBSSxNQUFJLENBQUN0SixPQUFMLENBQWFnRyxRQUFqQixFQUEyQjtBQUN2QixhQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsTUFBSSxDQUFDL0YsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkMsTUFBMUMsRUFBa0RGLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBQSxNQUFJLENBQUMvRixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixFQUF5QndCLFFBQXpCLElBQXFDLENBQXJDOztBQUNBLGNBQUksTUFBSSxDQUFDdkgsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ3QixRQUF6QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxZQUFBLE1BQUksQ0FBQ3ZILE9BQUwsQ0FBYWdHLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCd0IsUUFBekIsR0FBb0MsQ0FBcEM7QUFDSDs7QUFDRCxjQUFJLE1BQUksQ0FBQ3ZILE9BQUwsQ0FBYWdHLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCd0IsUUFBekIsSUFBcUMsQ0FBckMsSUFBMEMsTUFBSSxDQUFDdkgsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUIrQixPQUF6QixJQUFvQyxDQUFsRixFQUFxRjtBQUNqRixZQUFBLE1BQUksQ0FBQzlILE9BQUwsQ0FBYWdHLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCNEIsY0FBekIsQ0FBd0MsV0FBeEMsRUFBcUQzRixLQUFyRCxHQUE2RCxNQUFJLENBQUNELFNBQUwsQ0FBZSxDQUFmLENBQTdEO0FBQ0EsWUFBQSxNQUFJLENBQUMvQixPQUFMLENBQWFnRyxRQUFiLENBQXNCRCxDQUF0QixFQUF5QjRCLGNBQXpCLENBQXdDLFVBQXhDLEVBQW9EM0YsS0FBcEQsR0FBNEQsTUFBSSxDQUFDRCxTQUFMLENBQWUsQ0FBZixDQUE1RDtBQUNIOztBQUNELFVBQUEsTUFBSSxDQUFDL0IsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUI0QixjQUF6QixDQUF3QyxVQUF4QyxFQUFvREMsWUFBcEQsQ0FBaUU5SCxFQUFFLENBQUNDLEtBQXBFLEVBQTJFK0UsTUFBM0UsR0FBb0YsTUFBSSxDQUFDOUUsT0FBTCxDQUFhZ0csUUFBYixDQUFzQkQsQ0FBdEIsRUFBeUJ3QixRQUF6QixHQUFvQyxHQUF4SDtBQUNIO0FBQ0o7QUFDSixLQWQ0QixFQWMxQixJQWQwQixDQUE3QjtBQWVILEdBN1dtQjtBQThXcEI7QUFDQWdDLEVBQUFBLFNBL1dvQixxQkErV1Z4SSxJQS9XVSxFQStXSnlJLE1BL1dJLEVBK1dJO0FBQ3BCLFFBQUlDLEtBQUksR0FBRyxDQUFYO0FBQUEsUUFDSUMsRUFBRSxHQUFHLENBRFQ7QUFBQSxRQUVJQyxFQUFFLEdBQUcsQ0FGVDtBQUFBLFFBR0lDLEtBQUssR0FBRyxDQUhaO0FBQUEsUUFJSUMsVUFBVSxHQUFHLEVBSmpCOztBQUtBLFNBQUssSUFBSTlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5RCxNQUFNLENBQUN2RCxNQUEzQixFQUFtQ0YsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxVQUFJeUQsTUFBTSxDQUFDekQsQ0FBRCxDQUFOLENBQVUrRCxNQUFWLElBQW9CLENBQXBCLElBQXlCTixNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVStELE1BQVYsSUFBb0IsQ0FBakQsRUFBb0Q7QUFDaEQsYUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUCxNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVW9CLEtBQTlCLEVBQXFDNEMsQ0FBQyxFQUF0QyxFQUEwQztBQUN0Q0YsVUFBQUEsVUFBVSxDQUFDOUIsSUFBWCxDQUFnQnlCLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVK0QsTUFBMUI7QUFDSDtBQUNKOztBQUNELFVBQUlOLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVNEQsRUFBZCxFQUFrQjtBQUNkLGFBQUssSUFBSUksRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBR1AsTUFBTSxDQUFDekQsQ0FBRCxDQUFOLENBQVU0RCxFQUFWLENBQWExRCxNQUFqQyxFQUF5QzhELEVBQUMsRUFBMUMsRUFBOEM7QUFDMUMsZUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUixNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQVYsQ0FBYUksRUFBYixFQUFnQkUsR0FBcEMsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUNILFlBQUFBLFVBQVUsQ0FBQzlCLElBQVgsQ0FBZ0IsQ0FBaEI7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFDRCxRQUFJZSxLQUFLLEdBQUdlLFVBQVUsQ0FBQzVELE1BQVgsR0FBb0IsR0FBcEIsR0FBMEI0RCxVQUFVLENBQUM1RCxNQUFYLEdBQW9CLEdBQTlDLEdBQW9ELENBQWhFOztBQUNBLFNBQUssSUFBSUYsR0FBQyxHQUFHK0MsS0FBYixFQUFvQi9DLEdBQUMsR0FBRzhELFVBQVUsQ0FBQzVELE1BQW5DLEVBQTJDRixHQUFDLEVBQTVDLEVBQWdEO0FBQzVDLFVBQUk4RCxVQUFVLENBQUM5RCxHQUFELENBQVYsSUFBaUIsQ0FBckIsRUFBd0I7QUFDcEIwRCxRQUFBQSxLQUFJO0FBQ1AsT0FGRCxNQUVPLElBQUlJLFVBQVUsQ0FBQzlELEdBQUQsQ0FBVixJQUFpQixDQUFyQixFQUF3QjtBQUMzQjJELFFBQUFBLEVBQUU7QUFDTCxPQUZNLE1BRUE7QUFDSEMsUUFBQUEsRUFBRTtBQUNMO0FBQ0o7O0FBQ0QsUUFBSUUsVUFBVSxDQUFDNUQsTUFBWCxHQUFvQixFQUFwQixJQUEwQjRELFVBQVUsQ0FBQzVELE1BQVgsR0FBb0IsQ0FBbEQsRUFBcUQ7QUFDakRsRixNQUFBQSxJQUFJLENBQUM0RyxjQUFMLENBQW9CLE9BQXBCLEVBQTZCQSxjQUE3QixDQUE0QyxPQUE1QyxFQUFxREMsWUFBckQsQ0FBa0U5SCxFQUFFLENBQUNDLEtBQXJFLEVBQTRFK0UsTUFBNUUsR0FBcUYsTUFBTStFLFVBQVUsQ0FBQzVELE1BQXRHO0FBQ0gsS0FGRCxNQUVPO0FBQ0hsRixNQUFBQSxJQUFJLENBQUM0RyxjQUFMLENBQW9CLE9BQXBCLEVBQTZCQSxjQUE3QixDQUE0QyxPQUE1QyxFQUFxREMsWUFBckQsQ0FBa0U5SCxFQUFFLENBQUNDLEtBQXJFLEVBQTRFK0UsTUFBNUUsR0FBcUYrRSxVQUFVLENBQUM1RCxNQUFYLEdBQW9CLEdBQXBCLEdBQTBCLEdBQTFCLEdBQWdDNEQsVUFBVSxDQUFDNUQsTUFBaEk7QUFDSDs7QUFDRGxGLElBQUFBLElBQUksQ0FBQzRHLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJBLGNBQTNCLENBQTBDLE9BQTFDLEVBQW1EQyxZQUFuRCxDQUFnRTlILEVBQUUsQ0FBQ0MsS0FBbkUsRUFBMEUrRSxNQUExRSxHQUFtRjJFLEtBQUksR0FBRyxFQUFQLElBQWFBLEtBQUksR0FBRyxDQUFwQixHQUF3QixNQUFNQSxLQUE5QixHQUFxQ0EsS0FBeEg7QUFDQTFJLElBQUFBLElBQUksQ0FBQzRHLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEJBLGNBQTVCLENBQTJDLE9BQTNDLEVBQW9EQyxZQUFwRCxDQUFpRTlILEVBQUUsQ0FBQ0MsS0FBcEUsRUFBMkUrRSxNQUEzRSxHQUFvRjRFLEVBQUUsR0FBRyxFQUFMLElBQVdBLEVBQUUsR0FBRyxDQUFoQixHQUFvQixNQUFNQSxFQUExQixHQUErQkEsRUFBbkg7QUFDSCxHQXBabUI7QUFxWnBCN0MsRUFBQUEsVUFyWm9CLHNCQXFaVDlGLElBclpTLEVBcVpIeUksTUFyWkcsRUFxWkt0RCxNQXJaTCxFQXFaYTtBQUM3QixRQUFJLENBQUNzRCxNQUFMLEVBQWE7QUFDVDtBQUNIOztBQUNELFFBQUlWLEtBQUssR0FBRyxDQUFaO0FBQ0EsUUFBSW9CLE9BQUo7QUFDQSxRQUFJQyxHQUFHLEdBQUcsQ0FBVjtBQUFBLFFBQ0lDLEdBQUcsR0FBRyxDQURWO0FBR0EsU0FBS2IsU0FBTCxDQUFleEksSUFBZixFQUFxQnlJLE1BQXJCLEVBVDZCLENBU0U7O0FBQy9CekksSUFBQUEsSUFBSSxDQUFDNEcsY0FBTCxDQUFvQixVQUFwQixFQUFnQy9FLGtCQUFoQztBQUNBN0IsSUFBQUEsSUFBSSxDQUFDNEcsY0FBTCxDQUFvQixVQUFwQixFQUFnQzlFLGlCQUFoQyxHQVg2QixDQVk3Qjs7QUFDQWlHLElBQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0FxQixJQUFBQSxHQUFHLEdBQUcsQ0FBTjtBQUNBQyxJQUFBQSxHQUFHLEdBQUcsQ0FBTjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBdkIsSUFBQUEsS0FBSyxHQUFHLEtBQUt3QixRQUFMLENBQWNkLE1BQWQsQ0FBUjs7QUFDQSxTQUFLLElBQUl6RCxDQUFDLEdBQUcrQyxLQUFiLEVBQW9CL0MsQ0FBQyxHQUFHeUQsTUFBTSxDQUFDdkQsTUFBL0IsRUFBdUNGLENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsVUFBSXdFLFdBQVcsR0FBRyxLQUFsQjs7QUFDQSxXQUFLLElBQUlQLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVb0IsS0FBOUIsRUFBcUM2QyxDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDLFlBQUlRLFVBQVUsR0FBRyxJQUFqQjtBQUNBTixRQUFBQSxPQUFPLEdBQUdwSyxFQUFFLENBQUN1SCxXQUFILENBQWUsS0FBS2xILFdBQXBCLENBQVY7O0FBQ0EsWUFBSXFKLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVK0QsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN2QlUsVUFBQUEsVUFBVSxHQUFHMUssRUFBRSxDQUFDa0MsS0FBSCxDQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCLEdBQWpCLENBQWI7QUFDQWtJLFVBQUFBLE9BQU8sQ0FBQ3RDLFlBQVIsQ0FBcUI5SCxFQUFFLENBQUNrSixNQUF4QixFQUFnQ0MsV0FBaEMsR0FBOEMsS0FBSzFJLFlBQUwsQ0FBa0JrSyxhQUFsQixDQUFnQyxhQUFoQyxDQUE5QztBQUNILFNBSEQsTUFHTyxJQUFJakIsTUFBTSxDQUFDekQsQ0FBRCxDQUFOLENBQVUrRCxNQUFWLElBQW9CLENBQXhCLEVBQTJCO0FBQzlCVSxVQUFBQSxVQUFVLEdBQUcxSyxFQUFFLENBQUM0SyxLQUFILENBQVNDLEdBQXRCO0FBQ0FULFVBQUFBLE9BQU8sQ0FBQ3RDLFlBQVIsQ0FBcUI5SCxFQUFFLENBQUNrSixNQUF4QixFQUFnQ0MsV0FBaEMsR0FBOEMsS0FBSzFJLFlBQUwsQ0FBa0JrSyxhQUFsQixDQUFnQyxjQUFoQyxDQUE5QztBQUNIOztBQUNELFlBQUlqQixNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQWQsRUFBa0I7QUFDZCxlQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdQLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVNEQsRUFBVixDQUFhMUQsTUFBakMsRUFBeUM4RCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLGdCQUFJUCxNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQVYsQ0FBYUksQ0FBYixFQUFnQmpCLEtBQWhCLEdBQXdCLENBQXhCLElBQTZCa0IsQ0FBakMsRUFBb0M7QUFDaENFLGNBQUFBLE9BQU8sQ0FBQ2xFLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IvQixNQUFwQixHQUE2QixJQUE3QjtBQUNBaUcsY0FBQUEsT0FBTyxDQUFDbEUsUUFBUixDQUFpQixDQUFqQixFQUFvQjRCLFlBQXBCLENBQWlDOUgsRUFBRSxDQUFDQyxLQUFwQyxFQUEyQytFLE1BQTNDLEdBQW9EMEUsTUFBTSxDQUFDekQsQ0FBRCxDQUFOLENBQVU0RCxFQUFWLENBQWFJLENBQWIsRUFBZ0JFLEdBQXBFO0FBQ0FDLGNBQUFBLE9BQU8sQ0FBQ2xFLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0JoRSxLQUFwQixHQUE0QndJLFVBQTVCO0FBQ0g7QUFDSjtBQUNKOztBQUNETixRQUFBQSxPQUFPLENBQUN2RyxNQUFSLEdBQWlCNUMsSUFBSSxDQUFDNEcsY0FBTCxDQUFvQixVQUFwQixDQUFqQjtBQUNBLFlBQUlpRCxNQUFNLEdBQUdSLEdBQWI7QUFDQSxZQUFJUyxNQUFNLEdBQUdWLEdBQWI7O0FBQ0EsZUFBT1UsTUFBTSxHQUFHLENBQWhCLEVBQW1CO0FBQ2ZBLFVBQUFBLE1BQU07QUFDTkQsVUFBQUEsTUFBTTtBQUNUOztBQUNELGFBQUssSUFBSWIsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR00sU0FBUyxDQUFDcEUsTUFBOUIsRUFBc0M4RCxHQUFDLEVBQXZDLEVBQTJDO0FBQ3ZDLGNBQUljLE1BQU0sSUFBSVIsU0FBUyxDQUFDTixHQUFELENBQVQsQ0FBYSxDQUFiLENBQVYsSUFBNkJhLE1BQU0sSUFBSVAsU0FBUyxDQUFDTixHQUFELENBQVQsQ0FBYSxDQUFiLENBQTNDLEVBQTREO0FBQ3hEUSxZQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNIO0FBQ0o7O0FBQ0QsWUFBSUEsV0FBSixFQUFpQjtBQUNiTSxVQUFBQSxNQUFNO0FBQ1Q7O0FBQ0RYLFFBQUFBLE9BQU8sQ0FBQ1ksV0FBUixDQUFvQmhMLEVBQUUsQ0FBQ2lMLEVBQUgsQ0FBTSxDQUFDLEdBQUQsR0FBT0gsTUFBTSxHQUFHLElBQXRCLEVBQTRCLE1BQU1DLE1BQU0sR0FBRyxFQUEzQyxDQUFwQjtBQUNBUixRQUFBQSxTQUFTLENBQUN0QyxJQUFWLENBQWUsQ0FBQzhDLE1BQUQsRUFBU0QsTUFBVCxDQUFmO0FBQ0FWLFFBQUFBLE9BQU8sQ0FBQ2pHLE1BQVIsR0FBaUIsS0FBakI7QUFDQWtHLFFBQUFBLEdBQUc7QUFDTjs7QUFDREMsTUFBQUEsR0FBRztBQUNIRCxNQUFBQSxHQUFHLEdBQUcsQ0FBTjtBQUNIOztBQUNEMUssSUFBQUEsTUFBTSxDQUFDd0QsS0FBUCxDQUFhK0gsY0FBYixDQUE0QixJQUE1QixFQUFpQ2pLLElBQUksQ0FBQzRHLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBakMsRUFBaUUsSUFBakUsRUFBc0UsSUFBdEU7QUFDSCxHQXBkbUI7QUFxZHBCO0FBQ0FzRCxFQUFBQSxjQXRkb0IsMEJBc2RMbEssSUF0ZEssRUFzZEN5SSxNQXRkRCxFQXNkU3RELE1BdGRULEVBc2RpQjtBQUNqQyxRQUFJZ0YsS0FBSyxHQUFHLEVBQVo7QUFBQSxRQUNJcEMsS0FBSyxHQUFHLENBRFo7QUFBQSxRQUVJb0IsT0FGSjtBQUFBLFFBR0lDLEdBQUcsR0FBRyxDQUhWO0FBQUEsUUFJSUMsR0FBRyxHQUFHLENBSlY7O0FBS0EsU0FBSyxJQUFJckUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lELE1BQU0sQ0FBQ3ZELE1BQTNCLEVBQW1DRixDQUFDLEVBQXBDLEVBQXdDO0FBQ3BDLFdBQUssSUFBSWlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVb0IsS0FBOUIsRUFBcUM2QyxDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDa0IsUUFBQUEsS0FBSyxDQUFDbkQsSUFBTixDQUFXeUIsTUFBTSxDQUFDekQsQ0FBRCxDQUFOLENBQVUrRCxNQUFyQjs7QUFDQSxZQUFJTixNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQWQsRUFBa0I7QUFDZCxlQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdQLE1BQU0sQ0FBQ3pELENBQUQsQ0FBTixDQUFVNEQsRUFBVixDQUFhMUQsTUFBakMsRUFBeUM4RCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLGdCQUFJUCxNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQVYsQ0FBYUksQ0FBYixFQUFnQmpCLEtBQWhCLEdBQXdCLENBQXhCLElBQTZCa0IsQ0FBakMsRUFBb0M7QUFDaEMsbUJBQUssSUFBSW1CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUczQixNQUFNLENBQUN6RCxDQUFELENBQU4sQ0FBVTRELEVBQVYsQ0FBYUksQ0FBYixFQUFnQkUsR0FBcEMsRUFBeUNrQixDQUFDLEVBQTFDLEVBQThDO0FBQzFDRCxnQkFBQUEsS0FBSyxDQUFDbkQsSUFBTixDQUFXLENBQVg7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBRUo7O0FBQ0RlLElBQUFBLEtBQUssR0FBR29DLEtBQUssQ0FBQ2pGLE1BQU4sR0FBZSxDQUF2QjtBQUNBNkMsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksQ0FBVCxHQUFhLENBQWIsR0FBaUJBLEtBQXpCO0FBQ0FBLElBQUFBLEtBQUssR0FBR29DLEtBQUssQ0FBQ2pGLE1BQU4sR0FBZSxFQUFmLEdBQW9CaUYsS0FBSyxDQUFDakYsTUFBTixHQUFlLEVBQWYsR0FBb0I2QyxLQUF4QyxHQUFnRCxDQUF4RDs7QUFDQSxRQUFJLEtBQUsvSCxJQUFMLENBQVV3QixJQUFWLElBQWtCLGdCQUF0QixFQUF3QztBQUNwQyxVQUFJNkksWUFBWSxHQUFHM0wsTUFBTSxDQUFDNEMsU0FBUCxDQUFpQitJLFlBQWpCLENBQThCbEYsTUFBOUIsQ0FBbkI7O0FBQ0EsV0FBSyxJQUFJSCxHQUFDLEdBQUcrQyxLQUFiLEVBQW9CL0MsR0FBQyxHQUFHbUYsS0FBSyxDQUFDakYsTUFBOUIsRUFBc0NGLEdBQUMsRUFBdkMsRUFBMkM7QUFDdkMsZUFBT29FLEdBQUcsR0FBRyxDQUFiLEVBQWdCO0FBQ1pBLFVBQUFBLEdBQUcsR0FBRyxDQUFOO0FBQ0FDLFVBQUFBLEdBQUc7QUFDTjs7QUFDREYsUUFBQUEsT0FBTyxHQUFHcEssRUFBRSxDQUFDdUgsV0FBSCxDQUFlLEtBQUtsSCxXQUFwQixDQUFWOztBQUNBLFlBQUkrSyxLQUFLLENBQUNuRixHQUFELENBQUwsSUFBWSxDQUFoQixFQUFtQjtBQUNmbUUsVUFBQUEsT0FBTyxDQUFDdEMsWUFBUixDQUFxQjlILEVBQUUsQ0FBQ2tKLE1BQXhCLEVBQWdDQyxXQUFoQyxHQUE4QyxLQUFLMUksWUFBTCxDQUFrQmtLLGFBQWxCLENBQWdDLFNBQWhDLENBQTlDO0FBQ0gsU0FGRCxNQUVPLElBQUlTLEtBQUssQ0FBQ25GLEdBQUQsQ0FBTCxJQUFZLENBQWhCLEVBQW1CO0FBQ3RCbUUsVUFBQUEsT0FBTyxDQUFDdEMsWUFBUixDQUFxQjlILEVBQUUsQ0FBQ2tKLE1BQXhCLEVBQWdDQyxXQUFoQyxHQUE4QyxLQUFLMUksWUFBTCxDQUFrQmtLLGFBQWxCLENBQWdDLFVBQWhDLENBQTlDO0FBQ0g7O0FBQ0QsWUFBSVcsWUFBWSxDQUFDckYsR0FBRCxDQUFaLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCbUUsVUFBQUEsT0FBTyxDQUFDbEUsUUFBUixDQUFpQixDQUFqQixFQUFvQi9CLE1BQXBCLEdBQTZCLElBQTdCO0FBQ0gsU0FGRCxNQUVPLElBQUltSCxZQUFZLENBQUNyRixHQUFELENBQVosSUFBbUIsQ0FBdkIsRUFBMEI7QUFDN0JtRSxVQUFBQSxPQUFPLENBQUNsRSxRQUFSLENBQWlCLENBQWpCLEVBQW9CL0IsTUFBcEIsR0FBNkIsSUFBN0I7QUFDSCxTQUZNLE1BRUEsSUFBSW1ILFlBQVksQ0FBQ3JGLEdBQUQsQ0FBWixJQUFtQixDQUF2QixFQUEwQjtBQUM3Qm1FLFVBQUFBLE9BQU8sQ0FBQ2xFLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IvQixNQUFwQixHQUE2QixJQUE3QjtBQUNBaUcsVUFBQUEsT0FBTyxDQUFDbEUsUUFBUixDQUFpQixDQUFqQixFQUFvQi9CLE1BQXBCLEdBQTZCLElBQTdCO0FBQ0g7O0FBQ0RpRyxRQUFBQSxPQUFPLENBQUN2RyxNQUFSLEdBQWlCNUMsSUFBSSxDQUFDNEcsY0FBTCxDQUFvQixVQUFwQixDQUFqQjtBQUNBdUMsUUFBQUEsT0FBTyxDQUFDbUIsS0FBUixHQUFnQixFQUFoQjtBQUNBbkIsUUFBQUEsT0FBTyxDQUFDb0IsTUFBUixHQUFpQixFQUFqQjtBQUNBcEIsUUFBQUEsT0FBTyxDQUFDM0gsSUFBUixHQUFlLEdBQWY7QUFDQTJILFFBQUFBLE9BQU8sQ0FBQ1ksV0FBUixDQUFvQmhMLEVBQUUsQ0FBQ2lMLEVBQUgsQ0FBTSxDQUFDLEdBQUQsR0FBT1gsR0FBRyxHQUFHLEVBQW5CLEVBQXVCLE1BQU1ELEdBQUcsR0FBRyxFQUFuQyxDQUFwQjtBQUNBRCxRQUFBQSxPQUFPLENBQUNqRyxNQUFSLEdBQWlCLElBQWpCO0FBQ0FrRyxRQUFBQSxHQUFHO0FBQ047O0FBQ0Q7QUFDSDs7QUFDRCxTQUFLLElBQUlwRSxHQUFDLEdBQUcrQyxLQUFiLEVBQW9CL0MsR0FBQyxHQUFHbUYsS0FBSyxDQUFDakYsTUFBOUIsRUFBc0NGLEdBQUMsRUFBdkMsRUFBMkM7QUFDdkMsYUFBT29FLEdBQUcsR0FBRyxDQUFiLEVBQWdCO0FBQ1pBLFFBQUFBLEdBQUcsR0FBRyxDQUFOO0FBQ0FDLFFBQUFBLEdBQUc7QUFDTjs7QUFDREYsTUFBQUEsT0FBTyxHQUFHLElBQUlwSyxFQUFFLENBQUNHLElBQVAsRUFBVjs7QUFDQSxVQUFJaUwsS0FBSyxDQUFDbkYsR0FBRCxDQUFMLElBQVksQ0FBaEIsRUFBbUI7QUFDZm1FLFFBQUFBLE9BQU8sQ0FBQ3FCLFlBQVIsQ0FBcUJ6TCxFQUFFLENBQUNrSixNQUF4QixFQUFnQ0MsV0FBaEMsR0FBOEMsS0FBSzFJLFlBQUwsQ0FBa0JrSyxhQUFsQixDQUFnQyxTQUFoQyxDQUE5QztBQUNILE9BRkQsTUFFTyxJQUFJUyxLQUFLLENBQUNuRixHQUFELENBQUwsSUFBWSxDQUFoQixFQUFtQjtBQUN0Qm1FLFFBQUFBLE9BQU8sQ0FBQ3FCLFlBQVIsQ0FBcUJ6TCxFQUFFLENBQUNrSixNQUF4QixFQUFnQ0MsV0FBaEMsR0FBOEMsS0FBSzFJLFlBQUwsQ0FBa0JrSyxhQUFsQixDQUFnQyxVQUFoQyxDQUE5QztBQUNIOztBQUNEUCxNQUFBQSxPQUFPLENBQUN2RyxNQUFSLEdBQWlCNUMsSUFBSSxDQUFDNEcsY0FBTCxDQUFvQixVQUFwQixDQUFqQjtBQUNBdUMsTUFBQUEsT0FBTyxDQUFDbUIsS0FBUixHQUFnQixFQUFoQjtBQUNBbkIsTUFBQUEsT0FBTyxDQUFDb0IsTUFBUixHQUFpQixFQUFqQjtBQUNBcEIsTUFBQUEsT0FBTyxDQUFDM0gsSUFBUixHQUFlLEdBQWY7QUFDQTJILE1BQUFBLE9BQU8sQ0FBQ1ksV0FBUixDQUFvQmhMLEVBQUUsQ0FBQ2lMLEVBQUgsQ0FBTSxDQUFDLEdBQUQsR0FBT1gsR0FBRyxHQUFHLEVBQW5CLEVBQXVCLE1BQU1ELEdBQUcsR0FBRyxFQUFuQyxDQUFwQjtBQUNBRCxNQUFBQSxPQUFPLENBQUNqRyxNQUFSLEdBQWlCLElBQWpCO0FBQ0FrRyxNQUFBQSxHQUFHO0FBQ047QUFDSixHQWhpQm1CO0FBaWlCcEJHLEVBQUFBLFFBamlCb0Isb0JBaWlCWGQsTUFqaUJXLEVBaWlCSDtBQUNiLFFBQUlWLEtBQUssR0FBRyxDQUFaOztBQUNBLFFBQUlVLE1BQU0sQ0FBQ3ZELE1BQVAsR0FBZ0IsRUFBcEIsRUFBd0I7QUFDcEI2QyxNQUFBQSxLQUFLLEdBQUdVLE1BQU0sQ0FBQ3ZELE1BQVAsR0FBZ0IsRUFBeEI7QUFDSDs7QUFDRCxTQUFLLElBQUkrRCxDQUFDLEdBQUdsQixLQUFiLEVBQW9Ca0IsQ0FBQyxHQUFHUixNQUFNLENBQUN2RCxNQUEvQixFQUF1QytELENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsVUFBSUEsQ0FBQyxHQUFHbEIsS0FBSixHQUFZVSxNQUFNLENBQUNRLENBQUQsQ0FBTixDQUFVN0MsS0FBdEIsSUFBK0IsRUFBbkMsRUFBdUM7QUFDbkMyQixRQUFBQSxLQUFLLElBQUlrQixDQUFDLEdBQUdsQixLQUFKLEdBQVlVLE1BQU0sQ0FBQ1EsQ0FBRCxDQUFOLENBQVU3QyxLQUF0QixHQUE4QixFQUF2QztBQUNIO0FBQ0o7O0FBQ0QsV0FBTzJCLEtBQVA7QUFDSCxHQTVpQm1CO0FBOGlCcEI7QUFDQTVFLEVBQUFBLFVBL2lCb0Isd0JBK2lCUDtBQUNULFFBQUksS0FBS21GLFVBQUwsSUFBbUIsSUFBdkIsRUFBNkI7QUFDekJtQyxNQUFBQSxZQUFZLENBQUMsS0FBS25DLFVBQU4sQ0FBWjtBQUNIOztBQUNELFNBQUtBLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxHQXBqQm1CO0FBcWpCcEJvQyxFQUFBQSxTQXJqQm9CLHVCQXFqQlI7QUFDUmhNLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZTRFLEdBQWYsQ0FBbUIxRSxPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBOUIsRUFBK0MsSUFBL0M7QUFDQTVCLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZTRFLEdBQWYsQ0FBbUIxRSxPQUFPLENBQUNDLEVBQVIsQ0FBV0csZUFBOUIsRUFBK0MsSUFBL0M7QUFDQTlCLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZTRFLEdBQWYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakM7QUFDQXBHLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZTRFLEdBQWYsQ0FBbUIsZ0JBQW5CLEVBQXFDLElBQXJDO0FBQ0EsU0FBSzNCLFVBQUw7QUFDQSxTQUFLQyxlQUFMO0FBQ0gsR0E1akJtQixDQTZqQnBCOztBQTdqQm9CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjYXJ0VHlwZVN0ciA9IHtcclxuICAgIDA6ICfmlaMg54mMJyxcclxuICAgIDE6ICflr7kgQScsXHJcbiAgICA3OiAn5pWjIOeJjCcsXHJcbiAgICA4OiAn5pWjIOeJjCcsXHJcbiAgICA5OiAn5a+5IDknLFxyXG4gICAgMTA6ICflr7kgMTAnLFxyXG4gICAgMTE6ICflr7kgSicsXHJcbiAgICAxMjogJ+WvuSBRJyxcclxuICAgIDEzOiAn5a+5IEsnLFxyXG4gICAgMTY6ICfpobog5a2QJyxcclxuICAgIDE3OiAn6YeRIOiKsScsXHJcbiAgICAxODogJ+mhuiDph5EnLFxyXG4gICAgMTk6ICfosbkg5a2QJ1xyXG59XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZENvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVjb3JkOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfcmVzdWx0OiBjYy5Ob2RlLFxyXG4gICAgICAgIHR5cGVfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBoZWxwX1ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNwcml0ZV9BdGxhczogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgcmVjb3JkX1ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIEJHTTogeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6IOM5pmv5aOw6Z+zXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMjA7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csIHRoaXMuUm9vdE5vZGVTaG93LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSwgdGhpcy5Sb290Tm9kZUhpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwibm9kZVJlbW92ZVwiLCB0aGlzLmNsaWNrX2JhY2ssIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcy51cGRhdGV1c2VySW5mbywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGV1c2VySW5mbygpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMucmVxRW50ZXJBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yb29tVHlwZSA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlSW5mbyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0geyAwOiBjYy5jb2xvcigyNTUsIDk2LCA0NyksIDE6IGNjLmNvbG9yKDEzNywgMjE4LCAyNTUpLCAyOiBjYy5jb2xvcigxNDEsIDIyMiwgMzcpLCAzOiBjYy5jb2xvcigyMjYsIDEzNywgMjU1KSB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGVXb3JkID0geyAxOiBcIuS8keaBr+S4rVwiLCAyOiBcIuS4i+azqOS4rVwiLCAzOiBcIue7k+eul+S4rVwiLCA0OiBcIua0l+eJjOS4rVwiIH07XHJcbiAgICB9LFxyXG4gICAgLy/lj5HljIVcclxuICAgIHJlcUVudGVyQXJlYSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdsR2FtZS5zY2VuZXRhZy5IT05HSEVJO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5IT05HSEVJKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9iYWNrXCI6IHRoaXMuY2xpY2tfYmFjaygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9oZWxwXCI6IHRoaXMuY2xpY2tfaGVscCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yZWNvcmRcIjogdGhpcy5jbGlja19yZWNvcmQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJteWNvaW5JbmZvXCI6IHRoaXMuY2xpY2tfYWRkZ29sZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImhlYWRiZ1wiOiB0aGlzLmNsaWNrX3VzZXJpbmZvKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nob25nemhpXCI6IHRoaXMuY2xpY2tfYWRkZ29sZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2FsbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9iYXNlJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2VsZW1lbnRhcnknOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbVR5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVxRW50ZXJBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b2dnbGVfbWVkaXVtJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb21UeXBlICE9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21UeXBlID0gMztcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9nZ2xlX2hpZ2hlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZV9wbHV0ZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb29tVHlwZSAhPSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tVHlwZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9lbnRlcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9zdGFydCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiYgZ2xHYW1lLnVzZXIuZ2FtZSA9PSAyKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBcIuaCqOeahOi0puWPt+aVsOaNruW8guW4uO+8jOaaguaXtuemgeatoui/m+WFpea4uOaIj++8jOWmguacieeWkemXru+8jOivt+iBlOezu+Wuouacje+8gVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwi5oiR55+l6YGT5LqGXCIsIFwi6IGU57O75a6i5pyNXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dGaWVsZFNlbGVjdGlvbkp1SHVhKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucm9vbS5yZXFNeUdhbWVTdGF0ZSh0aGlzLmdhbWVJRCwgdGhpcy5ub2RlSW5mb1tub2RlLnBhcmVudC5uYW1lXS50eXBlLCBub2RlLnBhcmVudC5uYW1lKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucmVhZHlyb29tLmVudGVySHVuZHJlZHNSb29tKG5vZGUucGFyZW50Lm5hbWUsIHRoaXMubm9kZUluZm9bbm9kZS5wYXJlbnQubmFtZV0udGFnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFJvb3ROb2RlU2hvdygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIGN1dEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIHNob3dVc2VySW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKHRoaXMuUGxheWVyaGVhZCwgZ2xHYW1lLnVzZXIuZ2V0KFwiaGVhZFVSTFwiKSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRldXNlckluZm8oKSB7XHJcbiAgICAgICAgbGV0IGNvaW4gPSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpXHJcbiAgICAgICAgdGhpcy5nb2xkQ291bnQuc3RyaW5nID0gZ2xHYW1lLnVzZXIuR29sZFRlbXAoY29pbik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEdhbWVJZChnYW1laWQpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IGdhbWVpZDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQmdJbmZvKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjbGlja191c2VyaW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwidXNlcmluZm9cIik7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYWRkZ29sZCgpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Nob3AoMzApO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2JhY2soKSB7XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFeGl0QXJlYSgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfaGVscCgpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuaGVscF9QcmVmYWIpLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX3JlY29yZCgpIHtcclxuICAgICAgICAvLyBnbEdhbWUucGFuZWwuc2hvd05ld0dhbWVSZWNvcmQodGhpcy5nYW1laWQsIDMwKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMucmVjb3JkX1ByZWZhYikuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XHJcbiAgICB9LFxyXG4gICAgLy/kuovku7bnm5HlkKxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkdhbWVJbmZvbGlzdF9hcmVhXCIsIHRoaXMub25HYW1lSW5mb2xpc3QsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25Sb29tSW5mb19hcmVhXCIsIHRoaXMub25Sb29tSW5mbywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkhhbmRJbmZvX2FyZWFcIiwgdGhpcy5vbkhhbmRJbmZvLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMub25EZWxldGVSb29tLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tumUgOavgVxyXG4gICAgdW5yZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25Sb29tSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uSGFuZEluZm9fYXJlYVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkRlbGV0ZVJvb21fYXJlYVwiLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tuWbnuiwg1xyXG4gICAgLy/ov5vlhaXmuLjmiI/kv6Hmga/lm57osINcclxuICAgIG9uRGVsZXRlUm9vbShtc2cpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25HYW1lSW5mb2xpc3QobXNnKSB7XHJcbiAgICAgICAgY2MubG9nKFwi5pyN5Yqh56uv5Y+R6YCB5pWw5o2uMjIyXCIsIG1zZylcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSW5mb1Rlc3QgPSBnbEdhbWUucmVhZHlyb29tLmdldChcImdhbWVJbmZvXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmdhbWVJbmZvVGVzdCcsIHRoaXMuZ2FtZUluZm9UZXN0KVxyXG4gICAgICAgIGlmICghdGhpcy5nYW1lSW5mb1Rlc3QpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNlcnZlclRpbWVPZmYgPSBEYXRlLm5vdygpIC0gbXNnLnNlcnZlcnRpbWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgfSxcclxuICAgIG9uSGFuZEluZm8obXNnKSB7XHJcbiAgICAgICAgdGhpcy5yb29tUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5yb29tcmVjb3JkO1xyXG4gICAgICAgIHRoaXMuaGhUeXBlUmVjb3JkID0gZ2xHYW1lLnJlYWR5cm9vbS5oaFR5cGVSZWNvcmQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlpZblirFcIiwgdGhpcy5yb29tUmVjb3JkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKHRoaXMuY29udGVudC5jaGlsZHJlbltpXSwgdGhpcy5yb29tUmVjb3JkW21zZy5yb29taWRdLCBtc2cucm9vbWlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NhcmRUeXBlKHRoaXMuY29udGVudC5jaGlsZHJlbltpXSwgbXNnLnJvb21pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Sb29tSW5mbyhtc2cpIHtcclxuICAgICAgICAvL3RoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygncicpXHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbWxpc3Q7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJUaW1lT2ZmID0gRGF0ZS5ub3coKSAtIG1zZy5zZXJ2ZXJ0aW1lO1xyXG4gICAgICAgIC8vaWYgKHRoaXMuZ2FtZUluZm8uaWQgIT0gbXNnLmdhbWVpZCkgcmV0dXJuXHJcbiAgICAgICAgaWYgKHRoaXMucm9vbVR5cGUgIT0gbXNnLnJvb21kYXRhLmJldHR5cGUgJiYgdGhpcy5yb29tVHlwZSAhPT0gMCkgcmV0dXJuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21kYXRhLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGVfcmVjb3JkKTtcclxuICAgICAgICAgICAgaW5mb05vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5uYW1lID0gYCR7bXNnLnJvb21kYXRhLnJvb21pZH1gO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVJbmZvW2luZm9Ob2RlLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgdGFnOiB0aGlzLnJvb21MaXN0W21zZy5yb29tZGF0YS5iZXR0eXBlXVttc2cucm9vbWRhdGEucm9vbWlkXS5yb29tc2VydmVyaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBtc2cucm9vbWRhdGEuYmV0dHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWl0VGltZSA9IE1hdGguZmxvb3IoKHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS53YWl0VGltZSA9IHdhaXRUaW1lXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwibGFiX3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB3YWl0VGltZSArIFwic1wiXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucm9vbUxpc3RbbXNnLnJvb21kYXRhLmJldHR5cGVdW21zZy5yb29tZGF0YS5yb29taWRdLm9ubGluZTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnLnJvb21kYXRhLnJvb21pZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm9vbVJlY29yZCA9IGdsR2FtZS5yZWFkeXJvb20ucm9vbXJlY29yZDtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjb3JkKGluZm9Ob2RlLCB0aGlzLnJvb21SZWNvcmRbbXNnLnJvb21kYXRhLnJvb21pZF0sIG1zZy5yb29tZGF0YS5yb29taWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDYXJkVHlwZShpbmZvTm9kZSwgbXNnLnJvb21kYXRhLnJvb21pZCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gbXNnLnJvb21kYXRhLnJvb21pZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5mbG9vcigobXNnLnJvb21kYXRhLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gd2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdhaXRUaW1lICsgXCJzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lc3RhdGVcIikuY29sb3IgPSB0aGlzLmdhbWVTdGF0ZVttc2cucm9vbWRhdGEucHJvY2Vzc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKS5jb2xvciA9IHRoaXMuZ2FtZVN0YXRlW21zZy5yb29tZGF0YS5wcm9jZXNzXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5wcm9jZXNzID0gbXNnLnJvb21kYXRhLnByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnN0YXRlV29yZFttc2cucm9vbWRhdGEucHJvY2Vzc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoJ29ubGluZXBlb3BsZScpLmdldENoaWxkQnlOYW1lKCdvbmxpbmVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1zZy5yb29tZGF0YS5vbmxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrBVSVxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUxpc3QucHVzaChnbEdhbWUucmVhZHlyb29tLnJvb21saXN0W3RoaXMucm9vbVR5cGVdW2tleV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvb21MaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuYmV0dHlwZSAtIGIuYmV0dHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJvb21SZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLnJvb21yZWNvcmQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhblRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5oaFR5cGVSZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLmhoVHlwZVJlY29yZDtcclxuICAgICAgICBmb3IgKGxldCByb29taWQgaW4gdGhpcy5yb29tTGlzdCkge1xyXG4gICAgICAgICAgICBpZighdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm9vbUxpc3Rbcm9vbWlkXSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZm9Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3JlY29yZCk7XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgaW5mb05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW5mb05vZGUubmFtZSA9IGAke3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWR9YDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlSW5mb1tpbmZvTm9kZS5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHRhZzogdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21zZXJ2ZXJpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0ciA9IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5yb29taWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb21JZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyLmxlbmd0aCA+IDUgPyBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSA1KSA6IHN0cjtcclxuXHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdvbmxpbmVwZW9wbGUnKS5nZXRDaGlsZEJ5TmFtZSgnb25saW5lTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJvb21MaXN0W3Jvb21pZF0ub25saW5lO1xyXG4gICAgICAgICAgICBsZXQgbWluYmV0ID0gZ2xHYW1lLnVzZXIuRW50ZXJSb29tR29sZFRlbXAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkNoaXBzWzBdKSxcclxuICAgICAgICAgICAgICAgIG1heGJldCA9IGdsR2FtZS51c2VyLkVudGVyUm9vbUdvbGRUZW1wKHRoaXMuZ2FtZUluZm9UZXN0W3RoaXMucm9vbUxpc3Rbcm9vbWlkXS5iZXR0eXBlXS5NYXhCZXQpO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2hpcGxpbWl0JykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYl9jb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtaW5iZXQgKyBcIi1cIiArIG1heGJldDtcclxuICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnN0YXRlV29yZFt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2Vzc11cclxuICAgICAgICAgICAgaW5mb05vZGUucHJvY2VzcyA9IHRoaXMucm9vbUxpc3Rbcm9vbWlkXS5wcm9jZXNzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lSW5mb1Rlc3RbdGhpcy5yb29tTGlzdFtyb29taWRdLmJldHR5cGVdLkVudHJhbmNlUmVzdHJpY3Rpb25zIDw9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIikgJiYgIWdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcIndhdGNoQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcIndhdGNoXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZW50ZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRjaEJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9lbnRlclwiKS5nZXRDaGlsZEJ5TmFtZShcIndhdGNoXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdhaXRUaW1lID0gTWF0aC5mbG9vcigodGhpcy5yb29tTGlzdFtyb29taWRdLmN1cndhaXR0aW1lIC0gKERhdGUubm93KCkgLSB0aGlzLnNlcnZlclRpbWVPZmYpKSAvIDEwMDApO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS53YWl0VGltZSA9IHdhaXRUaW1lO1xyXG4gICAgICAgICAgICBpbmZvTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmNvbG9yID0gd2FpdFRpbWUgPD0gMyAmJiB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2VzcyA9PSAyID8gdGhpcy5nYW1lU3RhdGVbMF0gOiB0aGlzLmdhbWVTdGF0ZVt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2Vzc107XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmNvbG9yID0gd2FpdFRpbWUgPD0gMyAmJiB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2VzcyA9PSAyID8gdGhpcy5nYW1lU3RhdGVbMF0gOiB0aGlzLmdhbWVTdGF0ZVt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucHJvY2Vzc107XHJcbiAgICAgICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKCdsYWJfdGltZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gd2FpdFRpbWUgKyBcInNcIlxyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNvcmQoaW5mb05vZGUsIHRoaXMucm9vbVJlY29yZFt0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkXSwgdGhpcy5yb29tTGlzdFtyb29taWRdLnJvb21pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhcmRUeXBlKGluZm9Ob2RlLCB0aGlzLnJvb21MaXN0W3Jvb21pZF0ucm9vbWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Q2xvY2soKTtcclxuICAgIH0sXHJcbiAgICBzaG93Q2FyZFR5cGUoaW5mb05vZGUsIHJvb21pZCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5oaFR5cGVSZWNvcmRbcm9vbWlkXTtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVyblxyXG4gICAgICAgIGluZm9Ob2RlLmdldENoaWxkQnlOYW1lKFwidHJlbmRcIikuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0cmVuZFwiKS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGRhdGEubGVuZ3RoID4gOCA/IGRhdGEubGVuZ3RoIC0gOCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZV9ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50eXBlX25vZGUpO1xyXG4gICAgICAgICAgICB0eXBlX25vZGUucGFyZW50ID0gaW5mb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0cmVuZFwiKTtcclxuICAgICAgICAgICAgdHlwZV9ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiX3R5cGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXJ0VHlwZVN0cltkYXRhW2ldLmN1clR5cGVdO1xyXG4gICAgICAgICAgICB0eXBlX25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5nZXRTcHJpdGVGcmFtZShkYXRhW2ldLmFyZWFJbmRleCA9PSAxID8gXCJpbWdfaGVpZGlcIiA6IFwiaW1nX2hvbmdkaVwiKTtcclxuICAgICAgICAgICAgdHlwZV9ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiX3R5cGVcIikuY29sb3IgPSBkYXRhW2ldLmN1clR5cGUgPT0gMCA/IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpIDogY2MuY29sb3IoMjU1LCAxOTUsIDIxKTtcclxuICAgICAgICAgICAgdHlwZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5qGM6Z2i5pWw5o2u55qE5pi+56S6XHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICAvL+aYvuekuuWAkuiuoeaXtlxyXG4gICAgc2hvd0Nsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGltZU91dCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV0ud2FpdFRpbWUgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpXS53YWl0VGltZSA8PSAzICYmIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5wcm9jZXNzID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiZ2FtZXN0YXRlXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmNvbG9yID0gdGhpcy5nYW1lU3RhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLndhaXRUaW1lICsgXCJzXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfSxcclxuICAgIC8v5pi+56S65oC75bGA5pWw5Lul5Y+K57qiIOOAgeiTneeahOWHuueOsOWxgOaVsFxyXG4gICAgc2hvd1JvdW5kKG5vZGUsIHJlY29yZCkge1xyXG4gICAgICAgIGxldCBsb25nID0gMCxcclxuICAgICAgICAgICAgaHUgPSAwLFxyXG4gICAgICAgICAgICBoZSA9IDAsXHJcbiAgICAgICAgICAgIHJvdW5kID0gMCxcclxuICAgICAgICAgICAgcm91bmRDb3VudCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3JkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmRbaV0ucmVzdWx0ID09IDEgfHwgcmVjb3JkW2ldLnJlc3VsdCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlY29yZFtpXS5jb3VudDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm91bmRDb3VudC5wdXNoKHJlY29yZFtpXS5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZWNvcmRbaV0uaGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlY29yZFtpXS5oZVtrXS5udW07IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZENvdW50LnB1c2goMylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gcm91bmRDb3VudC5sZW5ndGggPiAxMDAgPyByb3VuZENvdW50Lmxlbmd0aCAtIDEwMCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgcm91bmRDb3VudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocm91bmRDb3VudFtpXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsb25nKytcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyb3VuZENvdW50W2ldID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGh1KytcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm91bmRDb3VudC5sZW5ndGggPCAxMCAmJiByb3VuZENvdW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnanVzaHUnKS5nZXRDaGlsZEJ5TmFtZShcImNvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJzAnICsgcm91bmRDb3VudC5sZW5ndGhcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdqdXNodScpLmdldENoaWxkQnlOYW1lKFwiY291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByb3VuZENvdW50Lmxlbmd0aCA+IDEwMCA/IDEwMCA6IHJvdW5kQ291bnQubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlaScpLmdldENoaWxkQnlOYW1lKFwiY291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsb25nIDwgMTAgJiYgbG9uZyA+IDAgPyAnMCcgKyBsb25nIDogbG9uZztcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdob25nJykuZ2V0Q2hpbGRCeU5hbWUoXCJjb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGh1IDwgMTAgJiYgaHUgPiAwID8gJzAnICsgaHUgOiBodTtcclxuICAgIH0sXHJcbiAgICBzaG93UmVjb3JkKG5vZGUsIHJlY29yZCwgcm9vbWlkKSB7XHJcbiAgICAgICAgaWYgKCFyZWNvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IGRvdE5vZGU7XHJcbiAgICAgICAgbGV0IHJvdyA9IDAsXHJcbiAgICAgICAgICAgIGNvbCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1JvdW5kKG5vZGUsIHJlY29yZCk7ICAvL+WxgOaVsOiusOW9lVxyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90JykuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8vdGhpcy5iZWFkcGxhdGVUcmVuZChub2RlLCByZWNvcmQsIHJvb21pZCk7IC8vIOePoOebmOi3r1xyXG4gICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgbGV0IHJlY29yZEFyciA9IFtdO1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleChyZWNvcmQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNDaGFuZ2VSb3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWNvcmRbaV0uY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZV9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5yZXN1bHQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjYy5jb2xvcigwLCAyMzgsIDIzOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19oZWlxdWFuJ107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlY29yZFtpXS5yZXN1bHQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19ob25ncXVhbiddO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVjb3JkW2ldLmhlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRbaV0uaGVba10uaW5kZXggLSAxID09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZWNvcmRbaV0uaGVba10ubnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5jaGlsZHJlblswXS5jb2xvciA9IGxhYmVsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLnBhcmVudCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vZGVfZG90Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29sID0gY29sO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdztcclxuICAgICAgICAgICAgICAgIHdoaWxlIChuZXdSb3cgPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Um93LS07XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29sKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlY29yZEFyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdSb3cgPT0gcmVjb3JkQXJyW2tdWzBdICYmIG5ld0NvbCA9PSByZWNvcmRBcnJba11bMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2VSb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0NoYW5nZVJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvdy0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5zZXRQb3NpdGlvbihjYy52MigtMzA2ICsgbmV3Q29sICogNDIuNiwgMTIxIC0gbmV3Um93ICogMzUpKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZEFyci5wdXNoKFtuZXdSb3csIG5ld0NvbF0pO1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbCsrO1xyXG4gICAgICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyxub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpLDAuMDIsdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgLy/ov5nmmK/nj6Dnm5jot6/nmoTmmL7npLpcclxuICAgIGJlYWRwbGF0ZVRyZW5kKG5vZGUsIHJlY29yZCwgcm9vbWlkKSB7XHJcbiAgICAgICAgbGV0IFJvdW5kID0gW10sXHJcbiAgICAgICAgICAgIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgZG90Tm9kZSxcclxuICAgICAgICAgICAgcm93ID0gMCxcclxuICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlY29yZFtpXS5jb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBSb3VuZC5wdXNoKHJlY29yZFtpXS5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ldLmhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZWNvcmRbaV0uaGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZFtpXS5oZVtrXS5pbmRleCAtIDEgPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCByZWNvcmRbaV0uaGVba10ubnVtOyB6KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb3VuZC5wdXNoKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCA9IFJvdW5kLmxlbmd0aCAlIDY7XHJcbiAgICAgICAgaW5kZXggPSBpbmRleCA9PSAwID8gNiA6IGluZGV4O1xyXG4gICAgICAgIGluZGV4ID0gUm91bmQubGVuZ3RoID4gNDggPyBSb3VuZC5sZW5ndGggLSA0MiAtIGluZGV4IDogMDtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUgPT0gXCJiYWlqaWFsZXNlbGVjdFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBkb3VibGVyZWNvcmQgPSBnbEdhbWUucmVhZHlyb29tLmRvdWJsZXJlY29yZFtyb29taWRdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IFJvdW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocm93ID4gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoUm91bmRbaV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfaGVpJ107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFJvdW5kW2ldID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVfQXRsYXMuX3Nwcml0ZUZyYW1lc1snaW1nX2hvbmcnXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkb3VibGVyZWNvcmRbaV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG91YmxlcmVjb3JkW2ldID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb3ROb2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvdWJsZXJlY29yZFtpXSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90Tm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdE5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvdE5vZGUucGFyZW50ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm9kZV9kb3QnKTtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUud2lkdGggPSAzMjtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuaGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLm5hbWUgPSBcIjBcIlxyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5zZXRQb3NpdGlvbihjYy52MigtNDEzICsgY29sICogNDAsIDExOSAtIHJvdyAqIDQwKSk7XHJcbiAgICAgICAgICAgICAgICBkb3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByb3crK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgUm91bmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgd2hpbGUgKHJvdyA+IDUpIHtcclxuICAgICAgICAgICAgICAgIHJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3ROb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgaWYgKFJvdW5kW2ldID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRvdE5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9BdGxhcy5fc3ByaXRlRnJhbWVzWydpbWdfaGVpJ107XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUm91bmRbaV0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZG90Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX0F0bGFzLl9zcHJpdGVGcmFtZXNbJ2ltZ19ob25nJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG90Tm9kZS5wYXJlbnQgPSBub2RlLmdldENoaWxkQnlOYW1lKCdub2RlX2RvdCcpO1xyXG4gICAgICAgICAgICBkb3ROb2RlLndpZHRoID0gMzI7XHJcbiAgICAgICAgICAgIGRvdE5vZGUuaGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgICAgIGRvdE5vZGUubmFtZSA9IFwiMFwiXHJcbiAgICAgICAgICAgIGRvdE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTQxMyArIGNvbCAqIDQwLCAxMTkgLSByb3cgKiA0MCkpO1xyXG4gICAgICAgICAgICBkb3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJvdysrXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEluZGV4KHJlY29yZCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHJlY29yZC5sZW5ndGggPiAxNikge1xyXG4gICAgICAgICAgICBpbmRleCA9IHJlY29yZC5sZW5ndGggLSAxNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IGluZGV4OyBqIDwgcmVjb3JkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChqIC0gaW5kZXggKyByZWNvcmRbal0uY291bnQgPj0gMjEpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ICs9IGogLSBpbmRleCArIHJlY29yZFtqXS5jb3VudCAtIDIxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH0sXHJcblxyXG4gICAgLy/muIXnkIblgJLorqHml7ZcclxuICAgIGNsZWFuVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0VGltZU91dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNldFRpbWVPdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRpbWVPdXQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwibm9kZVJlbW92ZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNsZWFuVGltZXIoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
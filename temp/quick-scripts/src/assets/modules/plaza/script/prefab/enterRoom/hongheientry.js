"use strict";
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
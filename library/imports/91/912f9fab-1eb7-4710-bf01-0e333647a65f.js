"use strict";
cc._RF.push(module, '912f9+rHrdHEL8BDjM2R6Zf', 'joinRoom');
// modules/plaza/script/prefab/room/joinRoom.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_roomid: [cc.Label],
    labDiamonds: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.registerEvent();
    this.index = 0;
    this.indexMax = 5;
    this.indexMin = 0;
    this.updataInfo();
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updataInfo, this);
    glGame.emitter.on("getGameIdByRoomNum", this.getGameIdByRoomNum, this);
    glGame.emitter.on("roomgameupdateend", this.roomgameupdateend, this);
    glGame.emitter.on(MESSAGE.UI.REFRESH_ROOM_NUM, this.click_numclose, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("getGameIdByRoomNum", this);
    glGame.emitter.off("roomgameupdateend", this);
    glGame.emitter.off(MESSAGE.UI.REFRESH_ROOM_NUM, this);
  },
  //刷新钻石数量
  updataInfo: function updataInfo() {
    this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
  },
  getGameIdByRoomNum: function getGameIdByRoomNum(msg) {
    var _this = this;

    this.gameId = msg.gameId; // 检查当前游戏是否已经在更新队列

    if (glGame.assetsManager.isUpdateQueue(this.gameId)) return; // 检查游戏是否需要更新

    glGame.gamelistcfg.isNeedUpdate(this.gameId).then(function (bol) {
      if (bol) {
        // 开始更新【%s(游戏名称)】，请耐心等待...
        glGame.panel.showTip("\u5F00\u59CB\u66F4\u65B0\u3010".concat(glGame.room.getGameDictById(_this.gameId), "\u3011\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85..."));
        var gameName = glGame.scene.getSceneNameByID(_this.gameId);
        glGame.gamelistcfg.setGameUpdate(gameName, false);
        glGame.assetsManager.gameUpdata({
          gameID: _this.gameId,
          manifestUrl: null
        });

        _this.remove();
      } else {
        glGame.room.EnterRoomCheck();
      }
    });
  },
  roomgameupdateend: function roomgameupdateend() {
    glGame.room.EnterRoomCheck();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_numclose":
        this.click_numclose();
        break;

      case "btn_numreturn":
        this.click_numreturn();
        break;

      case "btn_add":
        glGame.panel.showPanelByName("exchangeDiamond");
        break;

      default:
        if (name.indexOf("btn_num") > -1) return this.click_number(name);
        break;
    }
  },
  click_number: function click_number(event, type) {
    glGame.audio.playLoadSoundEffectByPath("click");
    if (this.index > this.indexMax) return;
    var name = event.target.name;
    var text = name.substring(7);
    this.lab_roomid[this.index++].string = text;

    if (this.index > this.indexMax) {
      // TODO 进入游戏
      var numStr = "";

      for (var key in this.lab_roomid) {
        numStr += this.lab_roomid[key].string;
      }

      glGame.room.getGameIdByRoomNum({
        roomNum: numStr
      });
    }

    ;
  },
  click_numclose: function click_numclose() {
    glGame.audio.playLoadSoundEffectByPath("click");
    if (this.index <= this.indexMin) return;
    this.index = this.indexMin;

    for (var key in this.lab_roomid) {
      this.lab_roomid[key].string = "";
    }
  },
  click_numreturn: function click_numreturn() {
    glGame.audio.playLoadSoundEffectByPath("click");
    this.index = Math.min(this.index, this.indexMax);
    if (this.lab_roomid[this.index].string == "") this.index = Math.max(this.index - 1, this.indexMin);
    this.lab_roomid[this.index].string = "";
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
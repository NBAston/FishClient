"use strict";
cc._RF.push(module, '1f68fYwr6xCh49HZJJZYaAF', 'rqznnGameRecord');
// modules/plaza/script/prefab/room/record/rqznn/rqznnGameRecord.js

"use strict";

var ROUND_STRIP_NAME = "roundstrip";
glGame.baseclass.extend({
  properties: {
    //牌局
    gameData: cc.Node,
    UserData: cc.Node,
    gameContent: cc.Node,
    gameItem: cc.Node,
    labPage: cc.Label
  },
  onLoad: function onLoad() {
    this.gameDetails = {};
    this.PageIndex = 1;
    this.pageCount = 1;
    this.pageMax = 8;
    this.playerMax = 5;
    this.gameAllData = null;
    this.registerEvent();
  },
  initData: function initData(data) {
    this.gameAllData = data;
    this.gameContent.removeAllChildren();
    this.initRoomData();
    this.reqRoomGameRoundList();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_return":
        glGame.emitter.emit("openRoomList");
        break;

      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      default:
        if (name.indexOf(ROUND_STRIP_NAME) > -1) return this.click_roundStrip(name);
        break;
    }
  },
  lastPage_cb: function lastPage_cb() {
    if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！");
    this.PageIndex--;
    this.reqRoomGameRoundList();
  },
  nextPage_cb: function nextPage_cb() {
    if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.PageIndex++;
    this.reqRoomGameRoundList();
  },
  click_roundStrip: function click_roundStrip(name) {
    var string = name.substring(ROUND_STRIP_NAME.length);
    var data = this.gameDetails[this.gameAllData.gameId][this.gameAllData.summaryId][this.PageIndex][Number(string)];
    glGame.emitter.emit("openRoomRound", data);
  },
  reqRoomGameRoundList: function reqRoomGameRoundList() {
    var _this = this;

    var msg = {};
    msg.gameId = this.gameAllData.gameId;
    msg.summaryId = this.gameAllData.summaryId;
    msg.page = this.PageIndex;
    msg.pageSize = this.pageMax;

    if (this.gameDetails[msg.gameId] && this.gameDetails[msg.gameId][msg.summaryId] && this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex]) {
      this.initGameContent(this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex]);
    } else {
      glGame.gameNet.send_msg('http.ReqRoomGameRoundList', msg, function (route, data) {
        var result = data.result;
        _this.pageCount = result.totalPage;
        _this.gameDetails[msg.gameId] ? null : _this.gameDetails[msg.gameId] = {};
        _this.gameDetails[msg.gameId][msg.summaryId] ? null : _this.gameDetails[msg.gameId][msg.summaryId] = {};
        result.data = _this.sortUserData(result.data);
        _this.gameDetails[msg.gameId][msg.summaryId][_this.PageIndex] = result.data;

        _this.initGameTitle(result.data);

        _this.initGameContent(_this.gameDetails[msg.gameId][msg.summaryId][_this.PageIndex]);
      });
    }
  },
  initRoomData: function initRoomData() {
    var data = this.gameAllData;
    this.gameData.getChildByName("number").getComponent(cc.Label).string = data.summaryId;
    var timeStamp = new Date(data.createTime);
    var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
    strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
    strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
    strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
    strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
    this.gameData.getChildByName("time").getComponent(cc.Label).string = strTime;
    this.gameData.getChildByName("game").getComponent(cc.Label).string = data.gameName;
    this.gameData.getChildByName("round").getComponent(cc.Label).string = data.totalRound;
    this.gameData.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.score);
    this.gameData.getChildByName("score").color = data.score > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
  },
  initGameTitle: function initGameTitle(list) {
    if (list.length == 0) return; // 便利出自己数据

    for (var index in list[0].detail) {
      var data = list[0].detail[index];
      if (!data) continue;

      if (Number(data.uid) == glGame.user.get("userID")) {
        this.UserData.getChildByName("seat1").active = true;
        this.UserData.getChildByName("seat1").getComponent(cc.Label).string = "\uFF3B\u6211\uFF3D";
        break;
      }
    } // 清理其他角色


    for (var _i = 2; _i < this.playerMax; _i++) {
      this.UserData.getChildByName("seat".concat(_i)).active = false;
    } // 便利出其他角色


    var i = 2;

    for (var _index in list[0].detail) {
      var _data = list[0].detail[_index];
      if (!_data) continue;

      if (Number(_data.uid) != glGame.user.get("userID")) {
        this.UserData.getChildByName("seat".concat(i)).active = true;
        this.UserData.getChildByName("seat".concat(i)).getComponent(cc.Label).string = "\uFF3B".concat(_data.nickname, "\uFF3D");
        i++;
      }
    }
  },
  initGameContent: function initGameContent(list) {
    this.gameContent.removeAllChildren();

    if (list.length == 0) {
      this.labPage.string = '第0/0页';
      return;
    }

    this.labPage.string = "\u7B2C".concat(this.PageIndex, "/").concat(this.pageCount, "\u9875");

    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].detail) continue;
      var node = cc.instantiate(this.gameItem);
      node.name = "".concat(ROUND_STRIP_NAME).concat(i);
      node.getChildByName("bg").active = i % 2 != 0;
      node.parent = this.gameContent;
      node.active = true;
      node.getChildByName("round").getComponent(cc.Label).string = "\u7B2C".concat(list.length - i + (this.PageIndex - 1) * this.pageMax, "\u5C40"); // 便利出自己数据

      for (var index in list[i].detail) {
        var data = list[i].detail[index];
        if (!data) continue;

        if (Number(data.uid) == glGame.user.get("userID")) {
          node.getChildByName("score1").active = true;
          node.getChildByName("score1").getComponent(cc.Label).string = this.getFixNumber(data.scoreOffset);
          node.getChildByName("score1").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
          break;
        }
      } // 便利出其他角色


      var count = 2;

      for (var _index2 in list[i].detail) {
        var _data2 = list[i].detail[_index2];
        if (!_data2) continue;

        if (Number(_data2.uid) != glGame.user.get("userID")) {
          node.getChildByName("score".concat(count)).active = true;
          node.getChildByName("score".concat(count)).getComponent(cc.Label).string = this.getFixNumber(_data2.scoreOffset);
          node.getChildByName("score".concat(count)).color = _data2.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
          count++;
        }
      }
    }
  },
  sortUserData: function sortUserData(list) {
    for (var key in list) {
      if (!list[key].detail) continue;
      list[key].detail.sort(function (a, b) {
        return a.uid - b.uid;
      });
    }

    return list;
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
  }
});

cc._RF.pop();
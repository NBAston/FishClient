"use strict";
cc._RF.push(module, '3178etbRQNNY54YlPrnn/MD', 'roomRecord');
// modules/plaza/script/prefab/room/record/roomRecord.js

"use strict";

var GAME_ITEM_NAME = "itemGame";
var GAME_STRIP_NAME = "gamestrip";
var GAME_NAME = {
  45: "rqznn"
};
glGame.baseclass.extend({
  properties: {
    //游戏分类
    nodeRoomList: cc.Node,
    nodeGameRecord: cc.Node,
    nodeRoundRecord: cc.Node,
    //游戏选择
    gameitem: cc.Node,
    gameScr: cc.Node,
    game_lab: cc.Label,
    gameContent: cc.Node,
    mask: cc.Node,
    //记录查看
    content: cc.Node,
    item: cc.Node,
    labPage: cc.Label,
    norecord: cc.Node
  },
  onLoad: function onLoad() {
    this.PageIndex = 1;
    this.pageCount = 1;
    this.gameId = 0;
    this.recordList = {};
    this.gamelist = {};
    this.selectName = "";
    this.registerEvent();
    this.reqRoomGameList();
    this.reqRoomGameRecordList();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("openRoomList", this.openRoomList, this);
    glGame.emitter.on("openGameRecord", this.openGameRecord, this);
    glGame.emitter.on("openRoomRound", this.openRoomRound, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("openRoomList", this);
    glGame.emitter.off("openGameRecord", this);
    glGame.emitter.off("openRoomRound", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  openRoomList: function openRoomList() {
    this.nodeRoomList.active = true;
    this.nodeGameRecord.active = false;
    var count = this.nodeGameRecord.childrenCount;

    for (var i = 0; i < count; i++) {
      this.nodeGameRecord.children[i].active = false;
    }
  },
  openGameRecord: function openGameRecord() {
    this.nodeGameRecord.active = true;
    this.nodeRoundRecord.active = false;
    var count = this.nodeRoundRecord.childrenCount;

    for (var i = 0; i < count; i++) {
      this.nodeRoundRecord.children[i].active = false;
    }
  },
  openRoomRound: function openRoomRound(list) {
    var _this = this;

    this.nodeGameRecord.active = false;
    this.nodeRoundRecord.active = true;
    var string = this.selectName.substring(GAME_STRIP_NAME.length);
    var data = this.recordList[this.gameId][this.PageIndex][Number(string)];
    var panelName = "".concat(GAME_NAME[data.gameId], "RoomRound");

    if (this.nodeRoundRecord.getChildByName(panelName)) {
      this.nodeRoundRecord.getChildByName(panelName).active = true;
      var panelData = this.nodeRoundRecord.getChildByName(panelName);
      var script = panelData.getComponent(panelData.name);
      script.initData(data, list);
      return;
    }

    glGame.panel.getPanelByName(panelName).then(function (panelData) {
      panelData.parent = _this.nodeRoundRecord;
      var script = panelData.getComponent(panelData.name);
      script.initData(data, list);
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_selectType":
        this.selectGame_cb();
        break;

      case "mask":
        this.mask_cb();
        break;

      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      default:
        if (name.indexOf(GAME_ITEM_NAME) > -1) return this.click_itemGame(name);
        if (name.indexOf(GAME_STRIP_NAME) > -1) return this.click_gameStrip(name);
        break;
    }
  },
  lastPage_cb: function lastPage_cb() {
    if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！");
    this.PageIndex--;
    this.reqRoomGameRecordList();
  },
  nextPage_cb: function nextPage_cb() {
    if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.PageIndex++;
    this.reqRoomGameRecordList();
  },
  click_itemGame: function click_itemGame(name) {
    var string = name.substring(GAME_ITEM_NAME.length);
    this.PageIndex = 1;
    this.game_lab.string = string == "All" ? "全部" : this.gamelist[string];
    this.gameScr.active = this.mask.active = false;
    this.gameId = string == "All" ? 0 : Number(string);
    this.reqRoomGameRecordList();
  },
  click_gameStrip: function click_gameStrip(name) {
    var _this2 = this;

    this.selectName = name;
    var string = name.substring(GAME_STRIP_NAME.length);
    this.nodeRoomList.active = false;
    this.nodeGameRecord.active = true;
    var data = this.recordList[this.gameId][this.PageIndex][Number(string)];
    var panelName = "".concat(GAME_NAME[data.gameId], "GameRecord");

    if (this.nodeGameRecord.getChildByName(panelName)) {
      this.nodeGameRecord.getChildByName(panelName).active = true;
      var panelData = this.nodeGameRecord.getChildByName(panelName);
      var script = panelData.getComponent(panelData.name);
      script.initData(data);
      return;
    }

    glGame.panel.getPanelByName(panelName).then(function (panelData) {
      panelData.parent = _this2.nodeGameRecord;
      var script = panelData.getComponent(panelData.name);
      script.initData(data);
    });
  },
  selectGame_cb: function selectGame_cb() {
    this.gameScr.active = !this.gameScr.active;
    if (this.gameScr.active) this.mask.active = true;
  },
  mask_cb: function mask_cb() {
    this.gameScr.active = this.mask.active = false;
  },
  reqRoomGameRecordList: function reqRoomGameRecordList() {
    var _this3 = this;

    var msg = {};
    msg.page = this.PageIndex;
    msg.pageSize = 8;
    if (this.gameId != 0) msg.gameId = this.gameId;

    if (this.recordList[this.gameId] && this.recordList[this.gameId][this.PageIndex]) {
      this.initRecordUI(this.recordList[this.gameId][this.PageIndex]);
    } else {
      glGame.gameNet.send_msg('http.ReqRoomGameRecordList', msg, function (route, data) {
        var result = data.result;
        _this3.pageCount = result.totalPage;
        _this3.recordList[_this3.gameId] ? null : _this3.recordList[_this3.gameId] = {};
        _this3.recordList[_this3.gameId][_this3.PageIndex] = result.data;

        _this3.initRecordUI(result.data);
      });
    }
  },
  reqRoomGameList: function reqRoomGameList() {
    var _this4 = this;

    glGame.gameNet.send_msg('http.ReqRoomGameList', {}, function (route, data) {
      _this4.gamelist = data.result;

      _this4.initgameItemUI();
    });
  },
  //初始化游戏列表
  initgameItemUI: function initgameItemUI() {
    var gameItem = cc.instantiate(this.gameitem);
    gameItem.name = "".concat(GAME_ITEM_NAME, "All");
    gameItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    gameItem.parent = this.gameContent;
    gameItem.active = true;

    for (var gameid in this.gamelist) {
      if (!this.gamelist[gameid]) continue;

      var _gameItem = cc.instantiate(this.gameitem);

      _gameItem.name = "".concat(GAME_ITEM_NAME).concat(gameid);
      _gameItem.getChildByName("label").getComponent(cc.Label).string = "".concat(this.gamelist[gameid]);
      _gameItem.parent = this.gameContent;
      _gameItem.active = true;
    }

    var string = this.gameContent.children[0].name.substring(8);
    this.gameId = string == "All" ? 0 : Number(string);
    this.game_lab.string = this.gameId == 0 ? "\u5168\u90E8" : "".concat(this.gamelist[string]);
  },
  hiadShowNode: function hiadShowNode(isBool) {
    this.nodeRoomList.getChildByName("btn_lastPage").active = isBool;
    this.nodeRoomList.getChildByName("btn_nextPage").active = isBool;
    this.nodeRoomList.getChildByName("pageIndex").active = isBool;
    this.nodeRoomList.getChildByName("downtips").active = isBool;
  },
  //渲染牌局记录
  initRecordUI: function initRecordUI(list) {
    this.content.removeAllChildren(); // if (list.length == 0) {
    //     this.labPage.string = '第0/0页';
    //     return;
    // }

    var count = list.length;

    if (count == 0) {
      this.norecord.active = true;
      return;
    }

    this.hiadShowNode(count > 0);
    this.labPage.string = "\u7B2C".concat(this.PageIndex, "/").concat(this.pageCount, "\u9875");

    for (var i = 0; i < list.length; i++) {
      var node = cc.instantiate(this.item);
      node.name = "".concat(GAME_STRIP_NAME).concat(i);
      node.getChildByName("bg").active = i % 2 != 0;
      node.parent = this.content;
      node.active = true;
      node.getChildByName("number").getComponent(cc.Label).string = list[i].summaryId;
      var timeStamp = new Date(list[i].createTime);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      node.getChildByName("time").getComponent(cc.Label).string = strTime;
      node.getChildByName("game").getComponent(cc.Label).string = list[i].gameName;
      node.getChildByName("round").getComponent(cc.Label).string = list[i].totalRound;
      node.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(list[i].score);
      node.getChildByName("score").color = list[i].score > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf4, 0xc4, 0x04);
    }
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
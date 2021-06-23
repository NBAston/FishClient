"use strict";
cc._RF.push(module, 'a738e52dn5BaqZAaZ4cH5kc', 'userinforecord');
// modules/plaza/script/prefab/userInfo/userinforecord.js

"use strict";

var TIMETYPE = {
  0: "全部时间",
  1: "今日",
  2: "昨日",
  3: "三日以内",
  4: "一周以内",
  5: "一个月以内"
};
var MODEL = {
  CHESS: 1,
  COMPLEX: 2
}; //1棋牌版 2综合版

var GAMESOUCE = {
  OFFICIAL: 1,
  OTHER: 2
}; //1官方 2三方

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    hunditem: cc.Node,
    hundtitle: cc.Node,
    gameitem: cc.Node,
    gameScr: cc.Node,
    game_lab: cc.Label,
    gameContent: cc.Node,
    lab_pageIndex: cc.Label,
    noitem: cc.Node,
    infonode: cc.Node,
    platView: cc.Node,
    lab_plat: cc.Label //mask: cc.Node,

  },
  onLoad: function onLoad() {
    this.endTime = null;
    this.startTime = null;
    this.gameid = 0;
    this.PageIndex = 1;
    this.recordList = {};
    this.registerEvent();
    this.reqBetFlow(this.gameid);
  },
  start: function start() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_selectType":
        this.selectGame_cb();
        break;

      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      case "gameView":
        this.gameScr.active = false;
        break;

      default:
        if (name.indexOf("itemGame") > -1) return this.click_itemGame(name);
        if (name.indexOf("gameRecord") > -1) return this.click_gameRecord(name);
        break;
    }
  },
  lastPage_cb: function lastPage_cb() {
    if (this.PageIndex <= 1) return glGame.panel.showTip("已经是第一页了！");
    this.PageIndex--;
    this.reqBetFlow(); //请求协议
  },
  nextPage_cb: function nextPage_cb() {
    if (this.PageIndex == this.pageCount || this.pageCount == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.PageIndex++;
    this.reqBetFlow(); //请求协议
  },
  click_itemGame: function click_itemGame(name) {
    var string = name.substring(8);
    this.PageIndex = 1;
    this.gameid = string == "All" ? 0 : this.ComplexGamesData[Number(string)].id;
    this.game_lab.string = string == "All" ? "全部" : this.ComplexGamesData[Number(string)].gameName;
    this.gameScr.active = false;
    this.reqBetFlow(this.gameid);
  },
  selectGame_cb: function selectGame_cb() {
    this.ReqComplexGames();
  },
  //初始化三方游戏列表
  initgameItemUI: function initgameItemUI() {
    this.gameContent.destroyAllChildren();
    var gameItem = cc.instantiate(this.gameitem);
    gameItem.name = "itemGameAll";
    gameItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    gameItem.parent = this.gameContent;
    gameItem.active = true;

    for (var i = 0; i < this.ComplexGamesData.length; i++) {
      gameItem = cc.instantiate(this.gameitem);
      gameItem.name = "itemGame".concat(i);
      gameItem.getChildByName("label").getComponent(cc.Label).string = "".concat(this.ComplexGamesData[i].gameName);
      gameItem.parent = this.gameContent;
      gameItem.active = true;
    }

    if (gameItem) {
      gameItem.getChildByName("img_xialafengexian").active = false;
    }

    this.gameScr.active = true;
  },
  //渲染牌局记录
  initRecordUI: function initRecordUI(list) {
    this.content.removeAllChildren();

    if (list.length == 0) {
      this.noitem.active = true;
      this.infonode.active = false;
      this.lab_pageIndex.string = '第0/0页';
      return;
    }

    this.noitem.active = false;
    this.infonode.active = true;
    this.lab_pageIndex.string = "\u7B2C".concat(this.PageIndex, "/").concat(this.pageCount, "\u9875");

    for (var i = 0; i < list.length; i++) {
      var node = cc.instantiate(this.hunditem);
      node.getChildByName("bg").active = i % 2 != 0;
      node.parent = this.content;
      node.active = false;
      var item = node.getChildByName("hunditem"); //item.getChildByName("no").children[0].getComponent(cc.Label).string = list[i].hand_number;

      item.getChildByName("room").getComponent(cc.Label).string = list[i].gameName;
      item.getChildByName("coin").getComponent(cc.Label).string = this.cutFloat(list[i].betAmount);
      item.getChildByName("win").getComponent(cc.Label).string = list[i].netAmount < 0 ? this.cutFloat(list[i].netAmount) : "+" + this.cutFloat(list[i].netAmount);
      glGame.panel.settingTableLabelColor(item.getChildByName("win"));
      var timeStamp = new Date(list[i].settlementTime);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      item.getChildByName("endtime").getComponent(cc.Label).string = strTime;
      item.name = "gameRecord_".concat(list[i].hand_number, "_").concat(list[i].game_id);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  reqBetFlow: function reqBetFlow(game_id, start, end) {
    var _this = this;

    var msg = {};
    msg.gameId = game_id ? game_id : this.gameid;
    if (start || this.startTime) msg.start = start ? start : this.startTime;
    if (end || this.endTime) msg.end = end ? end : this.endTime;
    msg.page = this.PageIndex;
    msg.pageSize = 6;
    console.log(this.recordList, "this.recordList");

    if (this.recordList[msg.gameId] && this.recordList[msg.gameId][this.PageIndex]) {
      this.pageCount = this.recordList[msg.gameId].pageCount;
      this.initRecordUI(this.recordList[msg.gameId][this.PageIndex]);
    } else {
      console.log("这是当前的发包", msg);
      glGame.gameNet.send_msg('http.reqBetFlow', msg, function (route, data) {
        var result = data.result;
        _this.pageCount = result.total_page;
        _this.recordList[msg.gameId] ? null : _this.recordList[msg.gameId] = {};
        _this.recordList[msg.gameId][_this.PageIndex] = result.list;
        _this.recordList[msg.gameId].pageCount = result.total_page;

        _this.initRecordUI(result.list);
      });
    }
  },
  //游戏游戏列表
  ReqComplexGames: function ReqComplexGames() {
    var _this2 = this;

    if (this.ComplexGamesData) return this.initgameItemUI();
    glGame.gameNet.send_msg('http.ReqComplexGames', {
      model: MODEL.CHESS
    }, function (route, data) {
      _this2.ComplexGamesData = data;

      _this2.initgameItemUI();
    });
  },
  click_gameRecord: function click_gameRecord(name) {
    var _this3 = this;

    var arr = name.split("_");
    var hand_number = arr[1];
    var gameid = arr[2];
    var gameName = glGame.scene.getSceneNameByID(gameid);
    if (gameid === glGame.scenetag.FISH2) return;
    var self = this;
    glGame.panel.showRecordPanelByName("".concat(gameName, "_recordDetails")).then(function (detailsNode) {
      var script = detailsNode.getComponent("".concat(gameName, "RecordDetails"));
      var data;
      var list = self.recordList[1][_this3.gameid][self.PageIndex];

      for (var i = 0; i < list.length; i++) {
        if (list[i].hand_number == hand_number) {
          data = list[i];
        }
      } // script.set("recordDetailsData", data);
      // script.set("modelType", 2)


      script.refreshData(data, 2);
      detailsNode.parent = self.node.parent.parent;
    });
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("userinfo_switchFace", this);
  },
  closeDown: function closeDown() {
    this.gameScr.active = false;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
    this.recordList = {};
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.div(100).toString();
    } else {
      value = Number(value).div(100);
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  }
});

cc._RF.pop();

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinforecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9yZWNvcmQuanMiXSwibmFtZXMiOlsiVElNRVRZUEUiLCJNT0RFTCIsIkNIRVNTIiwiQ09NUExFWCIsIkdBTUVTT1VDRSIsIk9GRklDSUFMIiwiT1RIRVIiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiY29udGVudCIsImNjIiwiTm9kZSIsImh1bmRpdGVtIiwiaHVuZHRpdGxlIiwiZ2FtZWl0ZW0iLCJnYW1lU2NyIiwiZ2FtZV9sYWIiLCJMYWJlbCIsImdhbWVDb250ZW50IiwibGFiX3BhZ2VJbmRleCIsIm5vaXRlbSIsImluZm9ub2RlIiwicGxhdFZpZXciLCJsYWJfcGxhdCIsIm9uTG9hZCIsImVuZFRpbWUiLCJzdGFydFRpbWUiLCJnYW1laWQiLCJQYWdlSW5kZXgiLCJyZWNvcmRMaXN0IiwicmVnaXN0ZXJFdmVudCIsInJlcUJldEZsb3ciLCJzdGFydCIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsInNlbGVjdEdhbWVfY2IiLCJsYXN0UGFnZV9jYiIsIm5leHRQYWdlX2NiIiwiYWN0aXZlIiwiaW5kZXhPZiIsImNsaWNrX2l0ZW1HYW1lIiwiY2xpY2tfZ2FtZVJlY29yZCIsInBhbmVsIiwic2hvd1RpcCIsInBhZ2VDb3VudCIsInN0cmluZyIsInN1YnN0cmluZyIsIkNvbXBsZXhHYW1lc0RhdGEiLCJOdW1iZXIiLCJpZCIsImdhbWVOYW1lIiwiUmVxQ29tcGxleEdhbWVzIiwiaW5pdGdhbWVJdGVtVUkiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJnYW1lSXRlbSIsImluc3RhbnRpYXRlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJwYXJlbnQiLCJpIiwibGVuZ3RoIiwiaW5pdFJlY29yZFVJIiwibGlzdCIsInJlbW92ZUFsbENoaWxkcmVuIiwiaXRlbSIsImN1dEZsb2F0IiwiYmV0QW1vdW50IiwibmV0QW1vdW50Iiwic2V0dGluZ1RhYmxlTGFiZWxDb2xvciIsInRpbWVTdGFtcCIsIkRhdGUiLCJzZXR0bGVtZW50VGltZSIsInN0clRpbWUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRpcHMiLCJXRUVLTkFNRSIsImdldERheSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJoYW5kX251bWJlciIsImdhbWVfaWQiLCJzaG93RWZmZWN0Tm9kZSIsImVuZCIsIm1zZyIsImdhbWVJZCIsInBhZ2UiLCJwYWdlU2l6ZSIsImNvbnNvbGUiLCJsb2ciLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb3V0ZSIsImRhdGEiLCJyZXN1bHQiLCJ0b3RhbF9wYWdlIiwibW9kZWwiLCJhcnIiLCJzcGxpdCIsInNjZW5lIiwiZ2V0U2NlbmVOYW1lQnlJRCIsInNjZW5ldGFnIiwiRklTSDIiLCJzZWxmIiwic2hvd1JlY29yZFBhbmVsQnlOYW1lIiwidGhlbiIsImRldGFpbHNOb2RlIiwic2NyaXB0IiwicmVmcmVzaERhdGEiLCJlbWl0dGVyIiwib24iLCJjbG9zZURvd24iLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiLCJ2YWx1ZSIsIm51bSIsImlzTmFOIiwiZGl2IiwidG9TdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRztBQUNiLEtBQUcsTUFEVTtBQUViLEtBQUcsSUFGVTtBQUdiLEtBQUcsSUFIVTtBQUliLEtBQUcsTUFKVTtBQUtiLEtBQUcsTUFMVTtBQU1iLEtBQUc7QUFOVSxDQUFqQjtBQVFBLElBQU1DLEtBQUssR0FBQztBQUFDQyxFQUFBQSxLQUFLLEVBQUMsQ0FBUDtBQUFTQyxFQUFBQSxPQUFPLEVBQUM7QUFBakIsQ0FBWixFQUErQjs7QUFDL0IsSUFBTUMsU0FBUyxHQUFHO0FBQUNDLEVBQUFBLFFBQVEsRUFBQyxDQUFWO0FBQVlDLEVBQUFB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UUFBVEMsR0FBUyx1RUFBSCxDQUFHO0FBQ3JCLFFBQUlDLEtBQUssQ0FBQ0YsS0FBRCxDQUFULEVBQWtCOztBQUNsQixRQUFJLENBQUMsQ0FBQ0EsS0FBRixLQUFZQSxLQUFoQixFQUF1QjtBQUNuQixhQUFPQSxLQUFLLENBQUNHLEdBQU4sQ0FBVSxHQUFWLEVBQWVDLFFBQWYsRUFBUDtBQUNILEtBRkQsTUFFTztBQUNISixNQUFBQSxLQUFLLEdBQUdyRSxNQUFNLENBQUNxRSxLQUFELENBQU4sQ0FBY0csR0FBZCxDQUFrQixHQUFsQixDQUFSO0FBQ0EsYUFBTyxDQUFDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV04sS0FBSyxHQUFHLEdBQW5CLElBQTBCLEdBQTNCLEVBQWdDTyxPQUFoQyxDQUF3Q04sR0FBeEMsQ0FBUDtBQUNIO0FBQ0o7QUF0Tm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUSU1FVFlQRSA9IHtcclxuICAgIDA6IFwi5YWo6YOo5pe26Ze0XCIsXHJcbiAgICAxOiBcIuS7iuaXpVwiLFxyXG4gICAgMjogXCLmmKjml6VcIixcclxuICAgIDM6IFwi5LiJ5pel5Lul5YaFXCIsXHJcbiAgICA0OiBcIuS4gOWRqOS7peWGhVwiLFxyXG4gICAgNTogXCLkuIDkuKrmnIjku6XlhoVcIixcclxufVxyXG5jb25zdCBNT0RFTD17Q0hFU1M6MSxDT01QTEVYOjJ9Ly8x5qOL54mM54mIIDLnu7zlkIjniYhcclxuY29uc3QgR0FNRVNPVUNFID0ge09GRklDSUFMOjEsT1RIRVI6Mn0vLzHlrpjmlrkgMuS4ieaWuVxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBodW5kaXRlbTogY2MuTm9kZSxcclxuICAgICAgICBodW5kdGl0bGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIGdhbWVpdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdhbWVTY3I6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2FtZV9sYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGdhbWVDb250ZW50OiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICBsYWJfcGFnZUluZGV4OiBjYy5MYWJlbCxcclxuICAgICAgICBub2l0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgaW5mb25vZGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIHBsYXRWaWV3OmNjLk5vZGUsXHJcbiAgICAgICAgbGFiX3BsYXQ6Y2MuTGFiZWwsXHJcblxyXG4gICAgICAgIC8vbWFzazogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1laWQgPSAwO1xyXG4gICAgICAgIHRoaXMuUGFnZUluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnJlY29yZExpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUJldEZsb3codGhpcy5nYW1laWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3NlbGVjdFR5cGVcIjogdGhpcy5zZWxlY3RHYW1lX2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2xhc3RQYWdlXCI6IHRoaXMubGFzdFBhZ2VfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbmV4dFBhZ2VcIjogdGhpcy5uZXh0UGFnZV9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdhbWVWaWV3XCI6dGhpcy5nYW1lU2NyLmFjdGl2ZSA9IGZhbHNlO2JyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcIml0ZW1HYW1lXCIpID4gLTEpIHJldHVybiB0aGlzLmNsaWNrX2l0ZW1HYW1lKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcImdhbWVSZWNvcmRcIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfZ2FtZVJlY29yZChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsYXN0UGFnZV9jYigpIHtcclxuICAgICAgICBpZiAodGhpcy5QYWdlSW5kZXggPD0gMSkgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi5bey57uP5piv56ys5LiA6aG15LqG77yBXCIpXHJcbiAgICAgICAgdGhpcy5QYWdlSW5kZXgtLTtcclxuICAgICAgICB0aGlzLnJlcUJldEZsb3coKTsgICAvL+ivt+axguWNj+iurlxyXG4gICAgfSxcclxuXHJcbiAgICBuZXh0UGFnZV9jYigpIHtcclxuICAgICAgICBpZiAodGhpcy5QYWdlSW5kZXggPT0gdGhpcy5wYWdlQ291bnQgfHwgdGhpcy5wYWdlQ291bnQgPT0gMCkgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi5bey57uP5piv5pyA5ZCO5LiA6aG15LqG77yBXCIpXHJcbiAgICAgICAgdGhpcy5QYWdlSW5kZXgrKztcclxuICAgICAgICB0aGlzLnJlcUJldEZsb3coKTsgICAvL+ivt+axguWNj+iurlxyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19pdGVtR2FtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IG5hbWUuc3Vic3RyaW5nKDgpO1xyXG4gICAgICAgIHRoaXMuUGFnZUluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IHN0cmluZyA9PSBcIkFsbFwiID8gMCA6IHRoaXMuQ29tcGxleEdhbWVzRGF0YVtOdW1iZXIoc3RyaW5nKV0uaWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lX2xhYi5zdHJpbmcgPSBzdHJpbmcgPT0gXCJBbGxcIiA/IFwi5YWo6YOoXCIgOiB0aGlzLkNvbXBsZXhHYW1lc0RhdGFbTnVtYmVyKHN0cmluZyldLmdhbWVOYW1lXHJcbiAgICAgICAgdGhpcy5nYW1lU2NyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVxQmV0Rmxvdyh0aGlzLmdhbWVpZCk7XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0R2FtZV9jYigpe1xyXG4gICAgICAgIHRoaXMuUmVxQ29tcGxleEdhbWVzKCk7XHJcbiAgICB9LFxyXG4gICBcclxuICAgIC8v5Yid5aeL5YyW5LiJ5pa55ri45oiP5YiX6KGoXHJcbiAgICBpbml0Z2FtZUl0ZW1VSSgpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGdhbWVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5nYW1laXRlbSk7XHJcbiAgICAgICAgZ2FtZUl0ZW0ubmFtZSA9IGBpdGVtR2FtZUFsbGBcclxuICAgICAgICBnYW1lSXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ+WFqOmDqCdcclxuICAgICAgICBnYW1lSXRlbS5wYXJlbnQgPSB0aGlzLmdhbWVDb250ZW50O1xyXG4gICAgICAgIGdhbWVJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLkNvbXBsZXhHYW1lc0RhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGdhbWVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5nYW1laXRlbSk7XHJcbiAgICAgICAgICAgIGdhbWVJdGVtLm5hbWUgPSBgaXRlbUdhbWUke2l9YFxyXG4gICAgICAgICAgICBnYW1lSXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGhpcy5Db21wbGV4R2FtZXNEYXRhW2ldLmdhbWVOYW1lfWA7XHJcbiAgICAgICAgICAgIGdhbWVJdGVtLnBhcmVudCA9IHRoaXMuZ2FtZUNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGdhbWVJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihnYW1lSXRlbSkge1xyXG4gICAgICAgICAgICBnYW1lSXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ194aWFsYWZlbmdleGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVNjci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v5riy5p+T54mM5bGA6K6w5b2VXHJcbiAgICBpbml0UmVjb3JkVUkobGlzdCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9pdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX3BhZ2VJbmRleC5zdHJpbmcgPSAn56ysMC8w6aG1JztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluZm9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubGFiX3BhZ2VJbmRleC5zdHJpbmcgPSBg56ysJHt0aGlzLlBhZ2VJbmRleH0vJHt0aGlzLnBhZ2VDb3VudH3pobVgO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaHVuZGl0ZW0pO1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gaSAlIDIgIT0gMDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJodW5kaXRlbVwiKTtcclxuICAgICAgICAgICAgLy9pdGVtLmdldENoaWxkQnlOYW1lKFwibm9cIikuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsaXN0W2ldLmhhbmRfbnVtYmVyO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwicm9vbVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaV0uZ2FtZU5hbWU7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChsaXN0W2ldLmJldEFtb3VudClcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIndpblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaV0ubmV0QW1vdW50IDwgMCA/IHRoaXMuY3V0RmxvYXQobGlzdFtpXS5uZXRBbW91bnQpIDogXCIrXCIgKyB0aGlzLmN1dEZsb2F0KGxpc3RbaV0ubmV0QW1vdW50KTtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNldHRpbmdUYWJsZUxhYmVsQ29sb3IoaXRlbS5nZXRDaGlsZEJ5TmFtZShcIndpblwiKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGltZVN0YW1wID0gbmV3IERhdGUobGlzdFtpXS5zZXR0bGVtZW50VGltZSk7XHJcbiAgICAgICAgICAgIGxldCBzdHJUaW1lID0gYCR7dGltZVN0YW1wLmdldEZ1bGxZZWFyKCl9LyR7dGltZVN0YW1wLmdldE1vbnRoKCkgKyAxID49IDEwID8gdGltZVN0YW1wLmdldE1vbnRoKCkgKyAxIDogXCIwXCIgKyAodGltZVN0YW1wLmdldE1vbnRoKCkgKyAxKX0vJHt0aW1lU3RhbXAuZ2V0RGF0ZSgpID49IDEwID8gdGltZVN0YW1wLmdldERhdGUoKSA6ICcwJyArIHRpbWVTdGFtcC5nZXREYXRlKCl9YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGDvvIgke2dsR2FtZS50aXBzLldFRUtOQU1FW3RpbWVTdGFtcC5nZXREYXkoKV1977yJYFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRIb3VycygpID49IDEwID8gdGltZVN0YW1wLmdldEhvdXJzKCkgOiBcIjBcIiArIHRpbWVTdGFtcC5nZXRIb3VycygpfTpgXHJcbiAgICAgICAgICAgIHN0clRpbWUgKz0gYCR7dGltZVN0YW1wLmdldE1pbnV0ZXMoKSA+PSAxMCA/IHRpbWVTdGFtcC5nZXRNaW51dGVzKCkgOiBcIjBcIiArIHRpbWVTdGFtcC5nZXRNaW51dGVzKCl9OmBcclxuICAgICAgICAgICAgc3RyVGltZSArPSBgJHt0aW1lU3RhbXAuZ2V0U2Vjb25kcygpID49IDEwID8gdGltZVN0YW1wLmdldFNlY29uZHMoKSA6IFwiMFwiICsgdGltZVN0YW1wLmdldFNlY29uZHMoKX1gXHJcblxyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiZW5kdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0clRpbWU7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGBnYW1lUmVjb3JkXyR7bGlzdFtpXS5oYW5kX251bWJlcn1fJHtsaXN0W2ldLmdhbWVfaWR9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuY29udGVudCwwLjAyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXFCZXRGbG93KGdhbWVfaWQsIHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICBsZXQgbXNnID0ge307XHJcbiAgICAgICAgbXNnLmdhbWVJZCA9IGdhbWVfaWQgPyBnYW1lX2lkIDogdGhpcy5nYW1laWQ7XHJcbiAgICAgICAgaWYgKHN0YXJ0IHx8IHRoaXMuc3RhcnRUaW1lKSBtc2cuc3RhcnQgPSBzdGFydCA/IHN0YXJ0IDogdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgaWYgKGVuZCB8fCB0aGlzLmVuZFRpbWUpIG1zZy5lbmQgPSBlbmQgPyBlbmQgOiB0aGlzLmVuZFRpbWU7XHJcbiAgICAgICAgbXNnLnBhZ2UgPSB0aGlzLlBhZ2VJbmRleDtcclxuICAgICAgICBtc2cucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVjb3JkTGlzdCwgXCJ0aGlzLnJlY29yZExpc3RcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkTGlzdFttc2cuZ2FtZUlkXSAmJiB0aGlzLnJlY29yZExpc3RbbXNnLmdhbWVJZF1bdGhpcy5QYWdlSW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gdGhpcy5yZWNvcmRMaXN0W21zZy5nYW1lSWRdLnBhZ2VDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5pbml0UmVjb3JkVUkodGhpcy5yZWNvcmRMaXN0W21zZy5nYW1lSWRdW3RoaXMuUGFnZUluZGV4XSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE5Y+R5YyFXCIsbXNnKVxyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFCZXRGbG93JywgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBkYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gcmVzdWx0LnRvdGFsX3BhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZExpc3RbbXNnLmdhbWVJZF0gPyBudWxsIDogdGhpcy5yZWNvcmRMaXN0W21zZy5nYW1lSWRdID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZExpc3RbbXNnLmdhbWVJZF1bdGhpcy5QYWdlSW5kZXhdID0gcmVzdWx0Lmxpc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZExpc3RbbXNnLmdhbWVJZF0ucGFnZUNvdW50ID0gcmVzdWx0LnRvdGFsX3BhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSZWNvcmRVSShyZXN1bHQubGlzdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5ri45oiP5ri45oiP5YiX6KGoXHJcbiAgICBSZXFDb21wbGV4R2FtZXMoKXtcclxuICAgICAgICBpZih0aGlzLkNvbXBsZXhHYW1lc0RhdGEpcmV0dXJuIHRoaXMuaW5pdGdhbWVJdGVtVUkoKTtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFDb21wbGV4R2FtZXMnLCB7bW9kZWw6TU9ERUwuQ0hFU1N9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV4R2FtZXNEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbml0Z2FtZUl0ZW1VSSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2xpY2tfZ2FtZVJlY29yZChuYW1lKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IG5hbWUuc3BsaXQoXCJfXCIpO1xyXG4gICAgICAgIGxldCBoYW5kX251bWJlciA9IGFyclsxXTtcclxuICAgICAgICBsZXQgZ2FtZWlkID0gYXJyWzJdO1xyXG4gICAgICAgIGxldCBnYW1lTmFtZSA9IGdsR2FtZS5zY2VuZS5nZXRTY2VuZU5hbWVCeUlEKGdhbWVpZCk7XHJcbiAgICAgICAgaWYgKGdhbWVpZCA9PT0gZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVjb3JkUGFuZWxCeU5hbWUoYCR7Z2FtZU5hbWV9X3JlY29yZERldGFpbHNgKS50aGVuKGRldGFpbHNOb2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRldGFpbHNOb2RlLmdldENvbXBvbmVudChgJHtnYW1lTmFtZX1SZWNvcmREZXRhaWxzYCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHNlbGYucmVjb3JkTGlzdFsxXVt0aGlzLmdhbWVpZF1bc2VsZi5QYWdlSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5oYW5kX251bWJlciA9PSBoYW5kX251bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNjcmlwdC5zZXQoXCJyZWNvcmREZXRhaWxzRGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gc2NyaXB0LnNldChcIm1vZGVsVHlwZVwiLCAyKVxyXG4gICAgICAgICAgICBzY3JpcHQucmVmcmVzaERhdGEoZGF0YSwgMik7XHJcbiAgICAgICAgICAgIGRldGFpbHNOb2RlLnBhcmVudCA9IHNlbGYubm9kZS5wYXJlbnQucGFyZW50O1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVzZXJpbmZvX3N3aXRjaEZhY2VcIiwgdGhpcy5jbG9zZURvd24sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8vIOmUgOavgeeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVzZXJpbmZvX3N3aXRjaEZhY2VcIix0aGlzKTtcclxuICAgIH0sXHJcbiAgICBjbG9zZURvd24oKXtcclxuICAgICAgICB0aGlzLmdhbWVTY3IuYWN0aXZlID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlY29yZExpc3QgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mta7ngrnlnovov5Dnrpflj5bkv6nkvY1cclxuICAgIGN1dEZsb2F0KHZhbHVlLCBudW0gPSAyKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh+fnZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZGl2KDEwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSkuZGl2KDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5mbG9vcih2YWx1ZSAqIDEwMCkgLyAxMDApLnRvRml4ZWQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19
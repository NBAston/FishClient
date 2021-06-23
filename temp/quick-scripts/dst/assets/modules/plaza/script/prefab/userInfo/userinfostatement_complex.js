
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfostatement_complex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9bab89PHoFAJa4l72Z46mko', 'userinfostatement_complex');
// modules/plaza/script/prefab/userInfo/userinfostatement_complex.js

"use strict";

var valueDirt = [{
  name: '今天',
  value: 0,
  type: "day"
}, {
  name: '昨天',
  value: 1 * 24 * 60 * 60 * 1000,
  type: "day"
}, {
  name: '前天',
  value: 2 * 24 * 60 * 60 * 1000,
  type: "day"
}, {
  name: '本周',
  value: 0,
  type: "week"
}, {
  name: '上周',
  value: 7 * 24 * 60 * 60 * 1000,
  type: "week"
}];
glGame.baseclass.extend({
  properties: {
    //
    //打码量
    //棋牌版
    bet_lab: cc.Label,
    betScroll: cc.Node,
    betContent: cc.Node,
    betItem: cc.Node,
    //奖励金额
    award_lab: cc.Label,
    awardScroll: cc.Node,
    awardContent: cc.Node,
    awardItem: cc.Node,
    pageinfo: cc.Label,
    //时间选项
    timeContent: cc.Node,
    wordItem: cc.Node,
    timeView: cc.Node,
    mask: cc.Node,
    type_lab: cc.Label,
    //游戏类型选项
    gameContnet: cc.Node,
    gameView: cc.Node,
    gametype_lab: cc.Label,
    platView: cc.Node,
    platform_lab: cc.Label,
    platContent: cc.Node,
    safebox_lab: cc.Label,
    coin_lab: cc.Label,
    norecord: cc.Node,
    infonode: cc.Node,
    myinfo: cc.Node,
    complexSelect: cc.Node,
    // 
    toggleAllbet: cc.Toggle,
    toggleAward: cc.Toggle
  },
  onLoad: function onLoad() {
    this.timeIndex = 0;
    this.endTime = null;
    this.startTime = null;
    this.pageIndex = 1;
    this.gameIndex = 0;
    this.platIndex = 0;
    this.gameId = 0;
    this.platId = 0;
    this.recordPageData = {}; //缓存数据

    this.registerEvent();
    this.initCoin();
    this.allbet_cb();
    this.initTypeUI();
  },
  start: function start() {
    this.searchByTime(true);
  },
  initCoin: function initCoin() {
    this.safebox_lab.string = this.cutFloat(glGame.user.get("bank_coin"));
    this.coin_lab.string = this.cutFloat(glGame.user.get("coin"));
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_selectType":
        this.selectType_cb();
        break;

      case "mask":
        this.mask_cb();
        break;

      case "btn_allbet":
        this.allbet_cb();
        break;

      case "btn_allaward":
        this.allaward_cb();
        break;

      case "btn_up":
        this.btn_upCB();
        break;

      case "btn_down":
        this.btn_downCB();
        break;

      case "btn_type":
        this.btn_typeCB();
        break;

      case "btn_platform":
        this.btn_platformCB();
        break;

      default:
        if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
        if (name.indexOf("gameItem") > -1) return this.click_gameItem(name);
        if (name.indexOf("platItem") > -1) return this.click_platItem(name);
        break;
    }
  },
  //游戏类型
  btn_typeCB: function btn_typeCB() {
    this.sendReqComplexTypes();
  },
  //平台类型
  btn_platformCB: function btn_platformCB() {
    if (this.gameId == 0) return glGame.panel.showTip("请先选择类型");
    this.sendReqComplexPlats();
  },
  btn_upCB: function btn_upCB() {
    if (this.pageIndex <= 1) {
      return glGame.panel.showTip("已经是第一页了！");
    }

    this.pageIndex--;
    this.sendReqBetReport();
  },
  btn_downCB: function btn_downCB() {
    if (this.pageIndex >= this.pageTotal) {
      return glGame.panel.showTip("已经是最后一页了！");
    }

    this.pageIndex++;
    this.sendReqBetReport();
  },
  allbet_cb: function allbet_cb() {
    if (this.betScroll.active) return;
    this.awardScroll.active = false;
    this.betScroll.active = true;
    this.complexSelect.active = true;
    this.myinfo.active = false;
    this.click_typeItem('typeItem0');
  },
  allaward_cb: function allaward_cb() {
    if (this.awardScroll.active) return;
    this.betScroll.active = false;
    this.awardScroll.active = true;
    this.complexSelect.active = false;
    this.myinfo.active = true;
    this.click_typeItem('typeItem0');
  },
  click_typeItem: function click_typeItem(name) {
    var string = name.substring(8);
    this.type_lab.string = valueDirt[Number(string)].name;
    this.timeView.active = this.mask.active = false;
    this.timeIndex = Number(string); //全部游戏不传这个字段就OK

    console.log("这是当前的数字", name, string);
    this.searchByTime();
  },
  click_gameItem: function click_gameItem(name) {
    var string = name.substring(8);
    this.gameIndex = Number(string);
    console.log("当前的gameindex", this.gameIndex);
    this.ComplexPlatsData = null;
    this.platform_lab.string = "全部";
    this.gametype_lab.string = string == "All" ? "全部" : this.ComplexTypesData[this.gameIndex].name;
    this.gameId = string == "All" ? 0 : this.ComplexTypesData[this.gameIndex].id;
    this.platId = 0;
    this.gameView.active = this.mask.active = false;
    this.pageIndex = 1;
    this.sendReqBetReport();
  },
  click_platItem: function click_platItem(name) {
    var string = name.substring(8);
    this.platIndex = Number(string);
    console.log("当前的platindex", this.platIndex);
    this.platform_lab.string = string == "All" ? "全部" : this.ComplexPlatsData[this.platIndex].platName;
    this.platId = string == "All" ? 0 : this.ComplexPlatsData[this.platIndex].id;
    this.platView.active = this.mask.active = false;
    this.pageIndex = 1;
    this.sendReqBetReport();
  },
  initBetScrollUI: function initBetScrollUI() {
    var list = this.BetReportData.betList.data;
    this.bet_lab.string = this.cutFloat(this.BetReportData.betTotalCoin);
    this.betContent.removeAllChildren();

    if (list.length == 0) {
      this.norecord.active = true;
      this.infonode.active = false;
      return;
    }

    this.norecord.active = false;
    this.infonode.active = true;

    for (var i = 0; i < list.length; i++) {
      var node = cc.instantiate(this.betItem);
      node.parent = this.betContent;
      node.getChildByName("bg").active = i % 2 == 0;
      node.getChildByName("gametype").getComponent(cc.Label).string = list[i].gameType;
      node.getChildByName("platform").getComponent(cc.Label).string = list[i].platName;
      node.getChildByName("gamename").getComponent(cc.Label).string = list[i].gameName;
      node.getChildByName("playNumber").getComponent(cc.Label).string = this.cutFloat(list[i].bet);
      node.getChildByName("rewardCoin").getComponent(cc.Label).string = this.cutFloat(list[i].profit);
      glGame.panel.settingTableLabelColor(node.getChildByName("rewardCoin"));
    }

    glGame.panel.showEffectNode(this, this.betContent, 0.02, true);
  },
  initAwardScrollUI: function initAwardScrollUI(data) {
    var list = data.rewardList;
    this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
    console.log("这是当前的奖励总金额信息", list, list.length);
    this.awardContent.removeAllChildren();
    if (list.length == 0) return;
    var stripMax = 2;
    var count = Math.ceil(list.length / stripMax);
    var stripName = ['leftLabel', 'rightLabel'];

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.awardItem);
      node.parent = this.awardContent;
      node.active = true;
      node.getChildByName("bg").active = i % 2 != 0;
      var stripCount = Math.min((i + 1) * stripMax);

      for (var index = i * stripMax; index < stripCount; index++) {
        var nodeLabel = node.getChildByName(stripName[index % stripMax]);
        if (index >= list.length) nodeLabel.active = false;else {
          nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
          nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
        }
      }
    }

    console.log("这是当前节点", this.awardContent); //glGame.panel.showEffectNode(this,this.awardContent,0.02,true);
  },
  setColor: function setColor(coin, node) {
    if (coin < 0) {
      node.color = glGame.plazaColor.loss;
    } else {
      node.color = glGame.plazaColor.gain;
    }
  },
  selectType_cb: function selectType_cb() {
    this.pageIndex = 1;
    this.timeView.active = !this.timeView.active;
    if (this.timeView.active) this.mask.active = true;
  },
  mask_cb: function mask_cb() {
    this.timeView.active = this.mask.active = false;
    this.gameView.active = this.mask.active = false;
    this.platView.active = this.mask.active = false;
  },
  ReqReport: function ReqReport(bAll) {
    if (bAll) {
      this.sendReqBetReport();
      this.sendReqRewardReport();
      return;
    }

    if (this.toggleAllbet.isChecked) {
      this.sendReqBetReport();
    } else {
      this.sendReqRewardReport();
    }
  },
  sendReqBetReport: function sendReqBetReport() {
    var _this = this;

    var msg = {
      page: this.pageIndex,
      pageSize: 5,
      model: 2,
      type: this.timeIndex + 1,
      typeId: this.gameId,
      platId: this.platId
    };

    if (this.recordPageData[msg.typeId] && this.recordPageData[msg.typeId][msg.platId] && this.recordPageData[msg.typeId][msg.platId][msg.type] && this.recordPageData[msg.typeId][msg.platId][msg.type][this.pageIndex]) {
      this.BetReportData = this.recordPageData[msg.typeId][msg.platId][msg.type][this.pageIndex];
      this.initBetScrollUI();
      this.pageTotal = this.BetReportData.betList.pageTotal == 0 ? 1 : this.BetReportData.betList.pageTotal;
      this.pageinfo.string = "\u7B2C".concat(this.pageIndex, "/").concat(this.pageTotal, "\u9875");
      return;
    }

    console.log("这是当前发送的消息", msg);
    glGame.gameNet.send_msg('http.ReqBetReport', msg, function (route, data) {
      _this.BetReportData = data;
      _this.recordPageData[msg.typeId] ? null : _this.recordPageData[msg.typeId] = {};
      _this.recordPageData[msg.typeId][msg.platId] ? null : _this.recordPageData[msg.typeId][msg.platId] = {};
      _this.recordPageData[msg.typeId][msg.platId][msg.type] ? null : _this.recordPageData[msg.typeId][msg.platId][msg.type] = {};
      _this.recordPageData[msg.typeId][msg.platId][msg.type][_this.pageIndex] ? null : _this.recordPageData[msg.typeId][msg.platId][msg.type][_this.pageIndex] = {};
      _this.recordPageData[msg.typeId][msg.platId][msg.type][_this.pageIndex] = data;

      _this.initBetScrollUI();

      _this.pageTotal = _this.BetReportData.betList.pageTotal == 0 ? 1 : _this.BetReportData.betList.pageTotal;
      _this.pageinfo.string = "\u7B2C".concat(_this.pageIndex, "/").concat(_this.pageTotal, "\u9875");
    });
  },
  sendReqRewardReport: function sendReqRewardReport() {
    var _this2 = this;

    glGame.gameNet.send_msg('http.ReqRewardReport', {
      type: this.timeIndex + 1
    }, function (route, data) {
      _this2.RewardReportData = data;

      _this2.initAwardScrollUI(data);
    });
  },
  sendReqComplexTypes: function sendReqComplexTypes() {
    var _this3 = this;

    if (this.ComplexTypesData) {
      this.gameView.active = true;
      this.mask.active = true;
      return;
    }

    glGame.gameNet.send_msg('http.ReqComplexTypes', null, function (route, data) {
      _this3.ComplexTypesData = data;

      _this3.initComplexTypes();

      _this3.mask.active = true;
      console.log("这是当前分类的数据", data);
    });
  },
  sendReqComplexPlats: function sendReqComplexPlats() {
    var _this4 = this;

    var id = this.ComplexTypesData[this.gameIndex].id;
    glGame.gameNet.send_msg('http.ReqComplexPlats', {
      type: id
    }, function (route, data) {
      _this4.ComplexPlatsData = data;

      _this4.initPlats();

      _this4.mask.active = true;
    });
  },
  //时段内容
  initTypeUI: function initTypeUI() {
    var typeItem = null;

    for (var key in valueDirt) {
      if (!valueDirt[key]) continue;
      typeItem = cc.instantiate(this.wordItem);
      typeItem.name = "typeItem".concat(key);
      typeItem.getChildByName("label").getComponent(cc.Label).string = valueDirt[key].name;
      typeItem.parent = this.timeContent;
      typeItem.active = true;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    }

    this.timeView.height = this.timeContent.childrenCount <= 10 ? this.timeContent.childrenCount * this.wordItem.height + 32 : 10 * this.wordItem.height + 32;
    console.log("这是当前游戏内容", this.timeContent.children);
  },
  //生成平台内容
  initPlats: function initPlats() {
    this.platContent.destroyAllChildren();
    this.platContent.removeAllChildren();
    var wordItem = cc.instantiate(this.wordItem);
    wordItem.name = "platItemAll";
    wordItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    wordItem.parent = this.platContent;
    wordItem.active = true;
    var typeItem = null;

    for (var i = 0; i < this.ComplexPlatsData.length; i++) {
      typeItem = cc.instantiate(this.wordItem);
      typeItem.parent = this.platContent;
      typeItem.active = true;
      typeItem.name = "platItem".concat(i);
      typeItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexPlatsData[i].platName;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    } else {
      wordItem.getChildByName("img_xialafengexian").active = false;
    }

    this.platView.height = this.platContent.childrenCount <= 10 ? this.platContent.childrenCount * this.wordItem.height + 32 : 10 * this.wordItem.height + 32;
    this.platView.active = true;
  },
  //生成游戏分类内容
  initComplexTypes: function initComplexTypes() {
    var wordItem = cc.instantiate(this.wordItem);
    wordItem.name = "gameItemAll";
    wordItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    wordItem.parent = this.gameContnet;
    wordItem.active = true;
    var typeItem = null;

    for (var i = 0; i < this.ComplexTypesData.length; i++) {
      typeItem = cc.instantiate(this.wordItem);
      typeItem.parent = this.gameContnet;
      typeItem.active = true;
      typeItem.name = "gameItem".concat(i);
      typeItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexTypesData[i].name;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    } else {
      wordItem.getChildByName("img_xialafengexian").active = false;
    }

    this.gameView.height = this.gameContnet.childrenCount <= 10 ? this.gameContnet.childrenCount * this.wordItem.height + 32 : 10 * this.wordItem.height + 32;
    this.gameView.active = true;
  },
  cutTimeString: function cutTimeString(time) {
    var newTime = new Date(time);
    var y = newTime.getFullYear();
    var m = newTime.getMonth() + 1 < 10 ? "0" + (newTime.getMonth() + 1) : newTime.getMonth() + 1;
    var d = newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
    var strTime = y + "-" + m + "-" + d;
    return strTime;
  },
  searchByTime: function searchByTime(bAll) {
    var index = this.timeIndex;

    if (valueDirt[index].type == "day") {
      var startTime = Date.now() - valueDirt[index].value;
      this.startTime = this.cutTimeString(startTime);
      this.endTime = this.cutTimeString(startTime);
    } else if (valueDirt[index].type == "week") {
      var _startTime = Date.now() - valueDirt[index].value;

      var newTime = new Date(_startTime);
      var y = newTime.getFullYear();
      var m = newTime.getMonth();
      var d = newTime.getDate();
      var wd = newTime.getDay() == 0 ? 7 : newTime.getDay();
      var weekStartDate = new Date(y, m, d - wd + 1);
      var weekEndDate = new Date(y, m, d + (6 - wd) + 1);
      this.startTime = this.cutTimeString(weekStartDate);
      this.endTime = this.cutTimeString(weekEndDate);
    } else {
      this.endTime = null;
      this.startTime = null;
    }

    this.ReqReport(bAll);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.initCoin, this);
    glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("userinfo_switchFace", this);
  },
  closeDown: function closeDown() {
    this.timeView.active = this.mask.active = false;
    this.gameView.active = this.mask.active = false;
    this.platView.active = this.mask.active = false;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9zdGF0ZW1lbnRfY29tcGxleC5qcyJdLCJuYW1lcyI6WyJ2YWx1ZURpcnQiLCJuYW1lIiwidmFsdWUiLCJ0eXBlIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImJldF9sYWIiLCJjYyIsIkxhYmVsIiwiYmV0U2Nyb2xsIiwiTm9kZSIsImJldENvbnRlbnQiLCJiZXRJdGVtIiwiYXdhcmRfbGFiIiwiYXdhcmRTY3JvbGwiLCJhd2FyZENvbnRlbnQiLCJhd2FyZEl0ZW0iLCJwYWdlaW5mbyIsInRpbWVDb250ZW50Iiwid29yZEl0ZW0iLCJ0aW1lVmlldyIsIm1hc2siLCJ0eXBlX2xhYiIsImdhbWVDb250bmV0IiwiZ2FtZVZpZXciLCJnYW1ldHlwZV9sYWIiLCJwbGF0VmlldyIsInBsYXRmb3JtX2xhYiIsInBsYXRDb250ZW50Iiwic2FmZWJveF9sYWIiLCJjb2luX2xhYiIsIm5vcmVjb3JkIiwiaW5mb25vZGUiLCJteWluZm8iLCJjb21wbGV4U2VsZWN0IiwidG9nZ2xlQWxsYmV0IiwiVG9nZ2xlIiwidG9nZ2xlQXdhcmQiLCJvbkxvYWQiLCJ0aW1lSW5kZXgiLCJlbmRUaW1lIiwic3RhcnRUaW1lIiwicGFnZUluZGV4IiwiZ2FtZUluZGV4IiwicGxhdEluZGV4IiwiZ2FtZUlkIiwicGxhdElkIiwicmVjb3JkUGFnZURhdGEiLCJyZWdpc3RlckV2ZW50IiwiaW5pdENvaW4iLCJhbGxiZXRfY2IiLCJpbml0VHlwZVVJIiwic3RhcnQiLCJzZWFyY2hCeVRpbWUiLCJzdHJpbmciLCJjdXRGbG9hdCIsInVzZXIiLCJnZXQiLCJvbkNsaWNrIiwibm9kZSIsInNlbGVjdFR5cGVfY2IiLCJtYXNrX2NiIiwiYWxsYXdhcmRfY2IiLCJidG5fdXBDQiIsImJ0bl9kb3duQ0IiLCJidG5fdHlwZUNCIiwiYnRuX3BsYXRmb3JtQ0IiLCJpbmRleE9mIiwiY2xpY2tfdHlwZUl0ZW0iLCJjbGlja19nYW1lSXRlbSIsImNsaWNrX3BsYXRJdGVtIiwic2VuZFJlcUNvbXBsZXhUeXBlcyIsInBhbmVsIiwic2hvd1RpcCIsInNlbmRSZXFDb21wbGV4UGxhdHMiLCJzZW5kUmVxQmV0UmVwb3J0IiwicGFnZVRvdGFsIiwiYWN0aXZlIiwic3Vic3RyaW5nIiwiTnVtYmVyIiwiY29uc29sZSIsImxvZyIsIkNvbXBsZXhQbGF0c0RhdGEiLCJDb21wbGV4VHlwZXNEYXRhIiwiaWQiLCJwbGF0TmFtZSIsImluaXRCZXRTY3JvbGxVSSIsImxpc3QiLCJCZXRSZXBvcnREYXRhIiwiYmV0TGlzdCIsImRhdGEiLCJiZXRUb3RhbENvaW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImxlbmd0aCIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZVR5cGUiLCJnYW1lTmFtZSIsImJldCIsInByb2ZpdCIsInNldHRpbmdUYWJsZUxhYmVsQ29sb3IiLCJzaG93RWZmZWN0Tm9kZSIsImluaXRBd2FyZFNjcm9sbFVJIiwicmV3YXJkTGlzdCIsInJld2FyZFRvdGFsQ29pbiIsInN0cmlwTWF4IiwiY291bnQiLCJNYXRoIiwiY2VpbCIsInN0cmlwTmFtZSIsInN0cmlwQ291bnQiLCJtaW4iLCJpbmRleCIsIm5vZGVMYWJlbCIsImNvaW4iLCJzZXRDb2xvciIsImNvbG9yIiwicGxhemFDb2xvciIsImxvc3MiLCJnYWluIiwiUmVxUmVwb3J0IiwiYkFsbCIsInNlbmRSZXFSZXdhcmRSZXBvcnQiLCJpc0NoZWNrZWQiLCJtc2ciLCJwYWdlIiwicGFnZVNpemUiLCJtb2RlbCIsInR5cGVJZCIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJvdXRlIiwiUmV3YXJkUmVwb3J0RGF0YSIsImluaXRDb21wbGV4VHlwZXMiLCJpbml0UGxhdHMiLCJ0eXBlSXRlbSIsImtleSIsImhlaWdodCIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsImN1dFRpbWVTdHJpbmciLCJ0aW1lIiwibmV3VGltZSIsIkRhdGUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtIiwiZ2V0TW9udGgiLCJkIiwiZ2V0RGF0ZSIsInN0clRpbWUiLCJub3ciLCJ3ZCIsImdldERheSIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImVtaXR0ZXIiLCJvbiIsImNsb3NlRG93biIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsIk9uRGVzdHJveSIsImRpdiIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFNBQVMsR0FBRyxDQUNkO0FBQUVDLEVBQUFBLElBQUksRUFBRSxJQUFSO0FBQWNDLEVBQUFBLEtBQUssRUFBRSxDQUFyQjtBQUF3QkMsRUFBQUEsSUFBSSxFQUFFO0FBQTlCLENBRGMsRUFFZDtBQUFFRixFQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxFQUFBQSxLQUFLLEVBQUUsSUFBSSxFQUFKLEdBQVMsRUFBVCxHQUFjLEVBQWQsR0FBbUIsSUFBeEM7QUFBOENDLEVBQUFBLElBQUksRUFBRTtBQUFwRCxDQUZjLEVBR2Q7QUFBRUYsRUFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0MsRUFBQUEsS0FBSyxFQUFFLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxFQUFkLEdBQW1CLElBQXhDO0FBQThDQyxFQUFBQSxJQUFJLEVBQUU7QUFBcEQsQ0FIYyxFQUlkO0FBQUVGLEVBQUFBLElBQUksRUFBRSxJQUFSO0FBQWNDLEVBQUFBLEtBQUssRUFBRSxDQUFyQjtBQUF3QkMsRUFBQUEsSUFBSSxFQUFFO0FBQTlCLENBSmMsRUFLZDtBQUFFRixFQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxFQUFBQSxLQUFLLEVBQUUsSUFBSSxFQUFKLEdBQVMsRUFBVCxHQUFjLEVBQWQsR0FBbUIsSUFBeEM7QUFBOENDLEVBQUFBLElBQUksRUFBRTtBQUFwRCxDQUxjLENBQWxCO0FBUUFDLE1BQU0s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QixDQUFELENBQXlCQyxRQUF6QixFQUFQO0FBQ0g7QUE1Ym1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgdmFsdWVEaXJ0ID0gW1xyXG4gICAgeyBuYW1lOiAn5LuK5aSpJywgdmFsdWU6IDAsIHR5cGU6IFwiZGF5XCIgfSxcclxuICAgIHsgbmFtZTogJ+aYqOWkqScsIHZhbHVlOiAxICogMjQgKiA2MCAqIDYwICogMTAwMCwgdHlwZTogXCJkYXlcIiB9LFxyXG4gICAgeyBuYW1lOiAn5YmN5aSpJywgdmFsdWU6IDIgKiAyNCAqIDYwICogNjAgKiAxMDAwLCB0eXBlOiBcImRheVwiIH0sXHJcbiAgICB7IG5hbWU6ICfmnKzlkagnLCB2YWx1ZTogMCwgdHlwZTogXCJ3ZWVrXCIgfSxcclxuICAgIHsgbmFtZTogJ+S4iuWRqCcsIHZhbHVlOiA3ICogMjQgKiA2MCAqIDYwICogMTAwMCwgdHlwZTogXCJ3ZWVrXCIgfSxcclxuXVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIC8v5omT56CB6YePXHJcbiAgICAgICAgLy/mo4vniYzniYhcclxuICAgICAgICBiZXRfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBiZXRTY3JvbGw6IGNjLk5vZGUsXHJcbiAgICAgICAgYmV0Q29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBiZXRJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIC8v5aWW5Yqx6YeR6aKdXHJcbiAgICAgICAgYXdhcmRfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBhd2FyZFNjcm9sbDogY2MuTm9kZSxcclxuICAgICAgICBhd2FyZENvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgYXdhcmRJdGVtOiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICBwYWdlaW5mbzogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIC8v5pe26Ze06YCJ6aG5XHJcbiAgICAgICAgdGltZUNvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgd29yZEl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgdGltZVZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgbWFzazogY2MuTm9kZSxcclxuICAgICAgICB0eXBlX2xhYjogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIC8v5ri45oiP57G75Z6L6YCJ6aG5XHJcbiAgICAgICAgZ2FtZUNvbnRuZXQ6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2FtZVZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2FtZXR5cGVfbGFiOiBjYy5MYWJlbCxcclxuXHJcbiAgICAgICAgcGxhdFZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgcGxhdGZvcm1fbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBwbGF0Q29udGVudDogY2MuTm9kZSxcclxuXHJcbiAgICAgICAgc2FmZWJveF9sYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvaW5fbGFiOiBjYy5MYWJlbCxcclxuXHJcbiAgICAgICAgbm9yZWNvcmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgaW5mb25vZGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIG15aW5mbzogY2MuTm9kZSxcclxuICAgICAgICBjb21wbGV4U2VsZWN0OiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICAvLyBcclxuICAgICAgICB0b2dnbGVBbGxiZXQ6IGNjLlRvZ2dsZSxcclxuICAgICAgICB0b2dnbGVBd2FyZDogY2MuVG9nZ2xlLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMuZ2FtZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnBsYXRJbmRleCA9IDBcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lSWQgPSAwO1xyXG4gICAgICAgIHRoaXMucGxhdElkID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5yZWNvcmRQYWdlRGF0YSA9IHt9Oy8v57yT5a2Y5pWw5o2uXHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdENvaW4oKTtcclxuICAgICAgICB0aGlzLmFsbGJldF9jYigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFR5cGVVSSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEJ5VGltZSh0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdENvaW4oKSB7XHJcbiAgICAgICAgdGhpcy5zYWZlYm94X2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGdsR2FtZS51c2VyLmdldChcImJhbmtfY29pblwiKSk7XHJcbiAgICAgICAgdGhpcy5jb2luX2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGdsR2FtZS51c2VyLmdldChcImNvaW5cIikpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc2VsZWN0VHlwZVwiOiB0aGlzLnNlbGVjdFR5cGVfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6IHRoaXMubWFza19jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hbGxiZXRcIjogdGhpcy5hbGxiZXRfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWxsYXdhcmRcIjogdGhpcy5hbGxhd2FyZF9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl91cFwiOiB0aGlzLmJ0bl91cENCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Rvd25cIjogdGhpcy5idG5fZG93bkNCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3R5cGVcIjogdGhpcy5idG5fdHlwZUNCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3BsYXRmb3JtXCI6IHRoaXMuYnRuX3BsYXRmb3JtQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwidHlwZUl0ZW1cIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfdHlwZUl0ZW0obmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwiZ2FtZUl0ZW1cIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfZ2FtZUl0ZW0obmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwicGxhdEl0ZW1cIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfcGxhdEl0ZW0obmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/muLjmiI/nsbvlnotcclxuICAgIGJ0bl90eXBlQ0IoKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kUmVxQ29tcGxleFR5cGVzKCk7XHJcbiAgICB9LFxyXG4gICAgLy/lubPlj7DnsbvlnotcclxuICAgIGJ0bl9wbGF0Zm9ybUNCKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVJZCA9PSAwKSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dUaXAoXCLor7flhYjpgInmi6nnsbvlnotcIik7XHJcbiAgICAgICAgdGhpcy5zZW5kUmVxQ29tcGxleFBsYXRzKCk7XHJcbiAgICB9LFxyXG4gICAgYnRuX3VwQ0IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4IDw9IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi5bey57uP5piv56ys5LiA6aG15LqG77yBXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZUluZGV4LS07XHJcbiAgICAgICAgdGhpcy5zZW5kUmVxQmV0UmVwb3J0KClcclxuICAgIH0sXHJcbiAgICBidG5fZG93bkNCKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VJbmRleCA+PSB0aGlzLnBhZ2VUb3RhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dUaXAoXCLlt7Lnu4/mmK/mnIDlkI7kuIDpobXkuobvvIFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlSW5kZXgrKztcclxuICAgICAgICB0aGlzLnNlbmRSZXFCZXRSZXBvcnQoKTtcclxuICAgIH0sXHJcbiAgICBhbGxiZXRfY2IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmV0U2Nyb2xsLmFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYXdhcmRTY3JvbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZXRTY3JvbGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbXBsZXhTZWxlY3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm15aW5mby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWNrX3R5cGVJdGVtKCd0eXBlSXRlbTAnKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxsYXdhcmRfY2IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXdhcmRTY3JvbGwuYWN0aXZlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5iZXRTY3JvbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hd2FyZFNjcm9sbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tcGxleFNlbGVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm15aW5mby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tfdHlwZUl0ZW0oJ3R5cGVJdGVtMCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja190eXBlSXRlbShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IG5hbWUuc3Vic3RyaW5nKDgpO1xyXG4gICAgICAgIHRoaXMudHlwZV9sYWIuc3RyaW5nID0gdmFsdWVEaXJ0W051bWJlcihzdHJpbmcpXS5uYW1lO1xyXG4gICAgICAgIHRoaXMudGltZVZpZXcuYWN0aXZlID0gdGhpcy5tYXNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGltZUluZGV4ID0gTnVtYmVyKHN0cmluZyk7ICAgICAgLy/lhajpg6jmuLjmiI/kuI3kvKDov5nkuKrlrZfmrrXlsLFPS1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE5pWw5a2XXCIsIG5hbWUsIHN0cmluZylcclxuICAgICAgICB0aGlzLnNlYXJjaEJ5VGltZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19nYW1lSXRlbShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IG5hbWUuc3Vic3RyaW5nKDgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUluZGV4ID0gTnVtYmVyKHN0cmluZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3nmoRnYW1laW5kZXhcIiwgdGhpcy5nYW1lSW5kZXgpXHJcbiAgICAgICAgdGhpcy5Db21wbGV4UGxhdHNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXRmb3JtX2xhYi5zdHJpbmcgPSBcIuWFqOmDqFwiXHJcbiAgICAgICAgdGhpcy5nYW1ldHlwZV9sYWIuc3RyaW5nID0gc3RyaW5nID09IFwiQWxsXCIgPyBcIuWFqOmDqFwiIDogdGhpcy5Db21wbGV4VHlwZXNEYXRhW3RoaXMuZ2FtZUluZGV4XS5uYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZUlkID0gc3RyaW5nID09IFwiQWxsXCIgPyAwIDogdGhpcy5Db21wbGV4VHlwZXNEYXRhW3RoaXMuZ2FtZUluZGV4XS5pZDtcclxuICAgICAgICB0aGlzLnBsYXRJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5nYW1lVmlldy5hY3RpdmUgPSB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAxXHJcbiAgICAgICAgdGhpcy5zZW5kUmVxQmV0UmVwb3J0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX3BsYXRJdGVtKG5hbWUpIHtcclxuICAgICAgICBsZXQgc3RyaW5nID0gbmFtZS5zdWJzdHJpbmcoOCk7XHJcbiAgICAgICAgdGhpcy5wbGF0SW5kZXggPSBOdW1iZXIoc3RyaW5nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeahHBsYXRpbmRleFwiLCB0aGlzLnBsYXRJbmRleClcclxuICAgICAgICB0aGlzLnBsYXRmb3JtX2xhYi5zdHJpbmcgPSBzdHJpbmcgPT0gXCJBbGxcIiA/IFwi5YWo6YOoXCIgOiB0aGlzLkNvbXBsZXhQbGF0c0RhdGFbdGhpcy5wbGF0SW5kZXhdLnBsYXROYW1lO1xyXG4gICAgICAgIHRoaXMucGxhdElkID0gc3RyaW5nID09IFwiQWxsXCIgPyAwIDogdGhpcy5Db21wbGV4UGxhdHNEYXRhW3RoaXMucGxhdEluZGV4XS5pZDtcclxuICAgICAgICB0aGlzLnBsYXRWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2VJbmRleCA9IDFcclxuICAgICAgICB0aGlzLnNlbmRSZXFCZXRSZXBvcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdEJldFNjcm9sbFVJKCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5CZXRSZXBvcnREYXRhLmJldExpc3QuZGF0YTtcclxuICAgICAgICB0aGlzLmJldF9sYWIuc3RyaW5nID0gdGhpcy5jdXRGbG9hdCh0aGlzLkJldFJlcG9ydERhdGEuYmV0VG90YWxDb2luKTtcclxuICAgICAgICB0aGlzLmJldENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vcmVjb3JkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9yZWNvcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbmZvbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJldEl0ZW0pO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuYmV0Q29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyID09IDA7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1ldHlwZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaV0uZ2FtZVR5cGU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwbGF0Zm9ybVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaV0ucGxhdE5hbWU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lbmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaV0uZ2FtZU5hbWU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwbGF5TnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChsaXN0W2ldLmJldCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRDb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChsaXN0W2ldLnByb2ZpdCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zZXR0aW5nVGFibGVMYWJlbENvbG9yKG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRDb2luXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsIHRoaXMuYmV0Q29udGVudCwgMC4wMiwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRBd2FyZFNjcm9sbFVJKGRhdGEpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGRhdGEucmV3YXJkTGlzdDtcclxuICAgICAgICB0aGlzLmF3YXJkX2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGRhdGEucmV3YXJkVG90YWxDb2luKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOWlluWKseaAu+mHkemineS/oeaBr1wiLCBsaXN0LCBsaXN0Lmxlbmd0aClcclxuICAgICAgICB0aGlzLmF3YXJkQ29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHN0cmlwTWF4ID0gMjtcclxuICAgICAgICBsZXQgY291bnQgPSBNYXRoLmNlaWwobGlzdC5sZW5ndGggLyBzdHJpcE1heCk7XHJcbiAgICAgICAgbGV0IHN0cmlwTmFtZSA9IFsnbGVmdExhYmVsJywgJ3JpZ2h0TGFiZWwnXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmF3YXJkSXRlbSk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5hd2FyZENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyICE9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RyaXBDb3VudCA9IE1hdGgubWluKChpICsgMSkgKiBzdHJpcE1heCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gaSAqIHN0cmlwTWF4OyBpbmRleCA8IHN0cmlwQ291bnQ7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlTGFiZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKHN0cmlwTmFtZVtpbmRleCAlIHN0cmlwTWF4XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gbGlzdC5sZW5ndGgpIG5vZGVMYWJlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMYWJlbC5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbGlzdFtpbmRleF0ubmFtZSArIFwi77yaXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUxhYmVsLmdldENoaWxkQnlOYW1lKCdjb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGxpc3RbaW5kZXhdLmNvaW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN6IqC54K5XCIsIHRoaXMuYXdhcmRDb250ZW50KVxyXG4gICAgICAgIC8vZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsdGhpcy5hd2FyZENvbnRlbnQsMC4wMix0cnVlKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHNldENvbG9yKGNvaW4sIG5vZGUpIHtcclxuICAgICAgICBpZiAoY29pbiA8IDApIHtcclxuICAgICAgICAgICAgbm9kZS5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmxvc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZS5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmdhaW47XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFR5cGVfY2IoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMudGltZVZpZXcuYWN0aXZlID0gIXRoaXMudGltZVZpZXcuYWN0aXZlO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVWaWV3LmFjdGl2ZSkgdGhpcy5tYXNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFza19jYigpIHtcclxuICAgICAgICB0aGlzLnRpbWVWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXRWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBSZXFSZXBvcnQoYkFsbCkge1xyXG4gICAgICAgIGlmKGJBbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVxQmV0UmVwb3J0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFJlcVJld2FyZFJlcG9ydCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnRvZ2dsZUFsbGJldC5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVxQmV0UmVwb3J0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVxUmV3YXJkUmVwb3J0KCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZW5kUmVxQmV0UmVwb3J0KCkge1xyXG4gICAgICAgIGxldCBtc2cgPSB7XHJcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZUluZGV4LFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogNSxcclxuICAgICAgICAgICAgbW9kZWw6IDIsXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudGltZUluZGV4ICsgMSxcclxuICAgICAgICAgICAgdHlwZUlkOiB0aGlzLmdhbWVJZCxcclxuICAgICAgICAgICAgcGxhdElkOiB0aGlzLnBsYXRJZFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkUGFnZURhdGFbbXNnLnR5cGVJZF0gJiYgdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXVttc2cucGxhdElkXSAmJlxyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFBhZ2VEYXRhW21zZy50eXBlSWRdW21zZy5wbGF0SWRdW21zZy50eXBlXSAmJiB0aGlzLnJlY29yZFBhZ2VEYXRhW21zZy50eXBlSWRdW21zZy5wbGF0SWRdW21zZy50eXBlXVt0aGlzLnBhZ2VJbmRleF0pIHtcclxuICAgICAgICAgICAgdGhpcy5CZXRSZXBvcnREYXRhID0gdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXVttc2cucGxhdElkXVttc2cudHlwZV1bdGhpcy5wYWdlSW5kZXhdXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJldFNjcm9sbFVJKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRvdGFsID0gdGhpcy5CZXRSZXBvcnREYXRhLmJldExpc3QucGFnZVRvdGFsID09IDAgPyAxIDogdGhpcy5CZXRSZXBvcnREYXRhLmJldExpc3QucGFnZVRvdGFsO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VpbmZvLnN0cmluZyA9IGDnrKwke3RoaXMucGFnZUluZGV4fS8ke3RoaXMucGFnZVRvdGFsfemhtWBcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5Y+R6YCB55qE5raI5oGvXCIsIG1zZylcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFCZXRSZXBvcnQnLCBtc2csIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkJldFJlcG9ydERhdGEgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkUGFnZURhdGFbbXNnLnR5cGVJZF0gPyBudWxsIDogdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFBhZ2VEYXRhW21zZy50eXBlSWRdW21zZy5wbGF0SWRdID8gbnVsbCA6IHRoaXMucmVjb3JkUGFnZURhdGFbbXNnLnR5cGVJZF1bbXNnLnBsYXRJZF0gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXVttc2cucGxhdElkXVttc2cudHlwZV0gPyBudWxsIDogdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXVttc2cucGxhdElkXVttc2cudHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRQYWdlRGF0YVttc2cudHlwZUlkXVttc2cucGxhdElkXVttc2cudHlwZV1bdGhpcy5wYWdlSW5kZXhdID8gbnVsbCA6IHRoaXMucmVjb3JkUGFnZURhdGFbbXNnLnR5cGVJZF1bbXNnLnBsYXRJZF1bbXNnLnR5cGVdW3RoaXMucGFnZUluZGV4XSA9IHt9XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkUGFnZURhdGFbbXNnLnR5cGVJZF1bbXNnLnBsYXRJZF1bbXNnLnR5cGVdW3RoaXMucGFnZUluZGV4XSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJldFNjcm9sbFVJKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRvdGFsID0gdGhpcy5CZXRSZXBvcnREYXRhLmJldExpc3QucGFnZVRvdGFsID09IDAgPyAxIDogdGhpcy5CZXRSZXBvcnREYXRhLmJldExpc3QucGFnZVRvdGFsO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VpbmZvLnN0cmluZyA9IGDnrKwke3RoaXMucGFnZUluZGV4fS8ke3RoaXMucGFnZVRvdGFsfemhtWBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNlbmRSZXFSZXdhcmRSZXBvcnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUmV3YXJkUmVwb3J0JywgeyB0eXBlOiB0aGlzLnRpbWVJbmRleCArIDEgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkUmVwb3J0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEF3YXJkU2Nyb2xsVUkoZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZW5kUmVxQ29tcGxleFR5cGVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLkNvbXBsZXhUeXBlc0RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcUNvbXBsZXhUeXBlcycsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXhUeXBlc0RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDb21wbGV4VHlwZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5YiG57G755qE5pWw5o2uXCIsIGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZW5kUmVxQ29tcGxleFBsYXRzKCkge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuQ29tcGxleFR5cGVzRGF0YVt0aGlzLmdhbWVJbmRleF0uaWQ7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxQ29tcGxleFBsYXRzJywgeyB0eXBlOiBpZCB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV4UGxhdHNEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbml0UGxhdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvL+aXtuauteWGheWuuVxyXG4gICAgaW5pdFR5cGVVSSgpIHtcclxuICAgICAgICBsZXQgdHlwZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB2YWx1ZURpcnQpIHtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZURpcnRba2V5XSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy53b3JkSXRlbSk7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLm5hbWUgPSBgdHlwZUl0ZW0ke2tleX1gXHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZURpcnRba2V5XS5uYW1lO1xyXG4gICAgICAgICAgICB0eXBlSXRlbS5wYXJlbnQgPSB0aGlzLnRpbWVDb250ZW50O1xyXG4gICAgICAgICAgICB0eXBlSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVJdGVtKSB7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX3hpYWxhZmVuZ2V4aWFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aW1lVmlldy5oZWlnaHQgPSB0aGlzLnRpbWVDb250ZW50LmNoaWxkcmVuQ291bnQgPD0gMTAgPyB0aGlzLnRpbWVDb250ZW50LmNoaWxkcmVuQ291bnQgKiB0aGlzLndvcmRJdGVtLmhlaWdodCArIDMyIDogMTAgKiB0aGlzLndvcmRJdGVtLmhlaWdodCArIDMyO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5ri45oiP5YaF5a65XCIsIHRoaXMudGltZUNvbnRlbnQuY2hpbGRyZW4pXHJcbiAgICB9LFxyXG4gICAgLy/nlJ/miJDlubPlj7DlhoXlrrlcclxuICAgIGluaXRQbGF0cygpIHtcclxuICAgICAgICB0aGlzLnBsYXRDb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMucGxhdENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgd29yZEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndvcmRJdGVtKTtcclxuICAgICAgICB3b3JkSXRlbS5uYW1lID0gYHBsYXRJdGVtQWxsYFxyXG4gICAgICAgIHdvcmRJdGVtLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAn5YWo6YOoJ1xyXG4gICAgICAgIHdvcmRJdGVtLnBhcmVudCA9IHRoaXMucGxhdENvbnRlbnQ7XHJcbiAgICAgICAgd29yZEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdHlwZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Db21wbGV4UGxhdHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy53b3JkSXRlbSk7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLnBhcmVudCA9IHRoaXMucGxhdENvbnRlbnQ7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLm5hbWUgPSBgcGxhdEl0ZW0ke2l9YDtcclxuICAgICAgICAgICAgdHlwZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuQ29tcGxleFBsYXRzRGF0YVtpXS5wbGF0TmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlSXRlbSkge1xyXG4gICAgICAgICAgICB0eXBlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ194aWFsYWZlbmdleGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3b3JkSXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ194aWFsYWZlbmdleGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxhdFZpZXcuaGVpZ2h0ID0gdGhpcy5wbGF0Q29udGVudC5jaGlsZHJlbkNvdW50IDw9IDEwID8gdGhpcy5wbGF0Q29udGVudC5jaGlsZHJlbkNvdW50ICogdGhpcy53b3JkSXRlbS5oZWlnaHQgKyAzMiA6IDEwICogdGhpcy53b3JkSXRlbS5oZWlnaHQgKyAzMjtcclxuICAgICAgICB0aGlzLnBsYXRWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgLy/nlJ/miJDmuLjmiI/liIbnsbvlhoXlrrlcclxuICAgIGluaXRDb21wbGV4VHlwZXMoKSB7XHJcbiAgICAgICAgbGV0IHdvcmRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy53b3JkSXRlbSk7XHJcbiAgICAgICAgd29yZEl0ZW0ubmFtZSA9IGBnYW1lSXRlbUFsbGBcclxuICAgICAgICB3b3JkSXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ+WFqOmDqCdcclxuICAgICAgICB3b3JkSXRlbS5wYXJlbnQgPSB0aGlzLmdhbWVDb250bmV0O1xyXG4gICAgICAgIHdvcmRJdGVtLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB0eXBlSXRlbSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkNvbXBsZXhUeXBlc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHlwZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndvcmRJdGVtKTtcclxuICAgICAgICAgICAgdHlwZUl0ZW0ucGFyZW50ID0gdGhpcy5nYW1lQ29udG5ldDtcclxuICAgICAgICAgICAgdHlwZUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHlwZUl0ZW0ubmFtZSA9IGBnYW1lSXRlbSR7aX1gXHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkNvbXBsZXhUeXBlc0RhdGFbaV0ubmFtZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVJdGVtKSB7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX3hpYWxhZmVuZ2V4aWFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdvcmRJdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX3hpYWxhZmVuZ2V4aWFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lVmlldy5oZWlnaHQgPSB0aGlzLmdhbWVDb250bmV0LmNoaWxkcmVuQ291bnQgPD0gMTAgPyB0aGlzLmdhbWVDb250bmV0LmNoaWxkcmVuQ291bnQgKiB0aGlzLndvcmRJdGVtLmhlaWdodCArIDMyIDogMTAgKiB0aGlzLndvcmRJdGVtLmhlaWdodCArIDMyO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjdXRUaW1lU3RyaW5nKHRpbWUpIHtcclxuICAgICAgICBsZXQgbmV3VGltZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gICAgICAgIGxldCB5ID0gbmV3VGltZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBtID0gKG5ld1RpbWUuZ2V0TW9udGgoKSArIDEpIDwgMTAgPyBcIjBcIiArIChuZXdUaW1lLmdldE1vbnRoKCkgKyAxKSA6IChuZXdUaW1lLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICBsZXQgZCA9IG5ld1RpbWUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIG5ld1RpbWUuZ2V0RGF0ZSgpIDogbmV3VGltZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IHN0clRpbWUgPSB5ICsgXCItXCIgKyBtICsgXCItXCIgKyBkO1xyXG4gICAgICAgIHJldHVybiBzdHJUaW1lO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIHNlYXJjaEJ5VGltZShiQWxsKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50aW1lSW5kZXg7XHJcbiAgICAgICAgaWYgKHZhbHVlRGlydFtpbmRleF0udHlwZSA9PSBcImRheVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gdmFsdWVEaXJ0W2luZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmN1dFRpbWVTdHJpbmcoc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5jdXRUaW1lU3RyaW5nKHN0YXJ0VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZURpcnRbaW5kZXhdLnR5cGUgPT0gXCJ3ZWVrXCIpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KCkgLSB2YWx1ZURpcnRbaW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgbmV3VGltZSA9IG5ldyBEYXRlKHN0YXJ0VGltZSk7XHJcbiAgICAgICAgICAgIGxldCB5ID0gbmV3VGltZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBsZXQgbSA9IG5ld1RpbWUuZ2V0TW9udGgoKTtcclxuICAgICAgICAgICAgbGV0IGQgPSBuZXdUaW1lLmdldERhdGUoKTtcclxuICAgICAgICAgICAgbGV0IHdkID0gbmV3VGltZS5nZXREYXkoKSA9PSAwID8gNyA6IG5ld1RpbWUuZ2V0RGF5KCk7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrU3RhcnREYXRlID0gbmV3IERhdGUoeSwgbSwgZCAtIHdkICsgMSk7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrRW5kRGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQgKyAoNiAtIHdkKSArIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmN1dFRpbWVTdHJpbmcod2Vla1N0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuY3V0VGltZVN0cmluZyh3ZWVrRW5kRGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlcVJlcG9ydChiQWxsKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5rOo5YaM55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcy5pbml0Q29pbiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1c2VyaW5mb19zd2l0Y2hGYWNlXCIsIHRoaXMuY2xvc2VEb3duLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1c2VyaW5mb19zd2l0Y2hGYWNlXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGNsb3NlRG93bigpIHtcclxuICAgICAgICB0aGlzLnRpbWVWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXRWaWV3LmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbiAgICBjdXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
"use strict";
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
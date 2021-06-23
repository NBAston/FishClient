"use strict";
cc._RF.push(module, 'b7fa3ZATyVNfYfaGXTkFETI', 'userinfostatement');
// modules/plaza/script/prefab/userInfo/userinfostatement.js

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
    bet_lab: cc.Label,
    betScroll: cc.Node,
    betContent: cc.Node,
    betItem: cc.Node,
    //奖励金额
    award_lab: cc.Label,
    awardScroll: cc.Node,
    awardContent: cc.Node,
    awardItem: cc.Node,
    //时间选项
    typeContent: cc.Node,
    typeItem: cc.Node,
    typeScr: cc.Node,
    mask: cc.Node,
    type_lab: cc.Label,
    safebox_lab: cc.Label,
    coin_lab: cc.Label,
    norecord: cc.Node
  },
  onLoad: function onLoad() {
    this.timeIndex = 0;
    this.endTime = null;
    this.startTime = null;
    this.summary = {};
    this.statementList = [];
    this.bInit = false;
    this.registerEvent();
    this.initCoin();
    this.allbet_cb();
    this.initTypeUI();
  },
  start: function start() {
    this.searchByTime();
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

      default:
        if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
        break;
    }
  },
  allbet_cb: function allbet_cb() {
    if (this.betScroll.active) return;
    this.awardScroll.active = false;
    this.betScroll.active = true;
    this.click_typeItem("typeItem0");
  },
  allaward_cb: function allaward_cb() {
    if (this.awardScroll.active) return;
    this.betScroll.active = false;
    this.awardScroll.active = true;
    this.click_typeItem("typeItem0");
  },
  click_typeItem: function click_typeItem(name) {
    var string = name.substring(8);
    this.type_lab.string = valueDirt[Number(string)].name;
    this.typeScr.active = this.mask.active = false;
    this.timeIndex = Number(string); //全部游戏不传这个字段就OK

    this.searchByTime();
  },
  initTypeUI: function initTypeUI() {
    var typeItem = null;

    for (var key in valueDirt) {
      if (!valueDirt[key]) continue;
      typeItem = cc.instantiate(this.typeItem);
      typeItem.name = "typeItem".concat(key);
      typeItem.getChildByName("label").getComponent(cc.Label).string = valueDirt[key].name;
      typeItem.parent = this.typeContent;
      typeItem.active = true;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    }

    this.typeScr.height = this.typeContent.childrenCount <= 10 ? this.typeContent.childrenCount * this.typeItem.height : 10 * this.typeItem.height;
  },
  initUi: function initUi() {
    var data = this.statementList[this.timeIndex];

    if (!this.bInit) {
      this.bet_lab.string = this.cutFloat(data.betTotalCoin);
      this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
      this.initBetScrollUI();
      this.initAwardScrollUI();
      this.bInit = true;
      return;
    }

    if (this.betScroll.active) {
      this.bet_lab.string = this.cutFloat(data.betTotalCoin);
      this.initBetScrollUI();
    } else {
      this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
      this.initAwardScrollUI();
    }
  },
  initBetScrollUI: function initBetScrollUI() {
    var list = this.statementList[this.timeIndex].betList;
    this.betContent.removeAllChildren();

    if (list.length == 0) {
      this.norecord.active = true;
      return;
    }

    this.norecord.active = false;
    var stripMax = 3;
    var count = Math.ceil(list.length / stripMax);
    var stripName = ['leftLabel', 'middleLabel', 'rightLabel'];

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.betItem);
      node.parent = this.betContent;
      node.active = false;
      node.getChildByName("bg").active = i % 2 != 0;
      var stripCount = Math.min((i + 1) * stripMax);

      for (var index = i * stripMax; index < stripCount; index++) {
        var nodeLabel = node.getChildByName(stripName[index % stripMax]);
        if (index >= list.length) nodeLabel.active = false;else {
          nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
          nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
          glGame.panel.settingTableLabelColor(nodeLabel.getChildByName('coin'));
        }
      }
    }

    glGame.panel.showEffectNode(this, this.betContent, 0.02, true);
  },
  initAwardScrollUI: function initAwardScrollUI() {
    var list = this.statementList[this.timeIndex].rewardList;
    this.awardContent.removeAllChildren();
    if (list.length == 0) return;
    var stripMax = 2;
    var count = Math.ceil(list.length / stripMax);
    var stripName = ['leftLabel', 'rightLabel'];

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.awardItem);
      node.parent = this.awardContent;
      node.active = false;
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

    glGame.panel.showEffectNode(this, this.awardContent, 0.02, true);
  },
  selectType_cb: function selectType_cb() {
    this.typeScr.active = !this.typeScr.active;
    if (this.typeScr.active) this.mask.active = true;
  },
  mask_cb: function mask_cb() {
    this.typeScr.active = this.mask.active = false;
  },
  ReqReport: function ReqReport() {
    var _this = this;

    if (this.statementList[this.timeIndex]) {
      this.initUi();
      return;
    }

    var msg = {};
    msg.type = this.timeIndex + 1;
    glGame.gameNet.send_msg('http.ReqReport', msg, function (route, data) {
      _this.statementList[_this.timeIndex] = data;

      _this.initUi();
    });
  },
  cutTimeString: function cutTimeString(time) {
    var newTime = new Date(time);
    var y = newTime.getFullYear();
    var m = newTime.getMonth() + 1 < 10 ? "0" + (newTime.getMonth() + 1) : newTime.getMonth() + 1;
    var d = newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
    var strTime = y + "-" + m + "-" + d;
    return strTime;
  },
  searchByTime: function searchByTime() {
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

    this.ReqReport();
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
    this.typeScr.active = this.mask.active = false;
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
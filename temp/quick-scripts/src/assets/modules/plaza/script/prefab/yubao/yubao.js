"use strict";
cc._RF.push(module, 'b0a79OVtlZIX458mf7Zg2+7', 'yubao');
// modules/plaza/script/prefab/yubao/yubao.js

"use strict";

var STATE_TEXT = {
  0: "已发放",
  1: "审核中",
  2: "失败"
};
glGame.baseclass.extend({
  properties: {
    //大分类
    son_panel: cc.Node,
    yuebao_panel: cc.Node,
    eamings_panel: cc.Node,
    getaward_panel: cc.Node,
    // 页面1
    lb_effectivebalance: cc.Label,
    lb_yesterdayes: cc.Label,
    lb_differenceexplain: cc.RichText,
    lb_yeares: cc.Label,
    lb_dayes: cc.Label,
    lb_totales: cc.Label,
    lb_nowes: cc.Label,
    lb_yue: cc.Label,
    lb_time: cc.Label,
    lb_rate: cc.Label,
    // 页面2
    lb_weekes: cc.Label,
    lb_monthes: cc.Label,
    lb_totales2: cc.Label,
    earnings_content: cc.Node,
    earnings_item: cc.Node,
    lb_earningspage: cc.Label,
    // 页面3
    lb_nowes3: cc.Label,
    lb_formerlyes: cc.Label,
    lb_totales3: cc.Label,
    record_content: cc.Node,
    record_item: cc.Node,
    lb_recordpage: cc.Label
  },
  onLoad: function onLoad() {
    this.registerEvent(); // ----

    this.yubaoData = null;
    this.earningsList = [];
    this.earningsPage = 1;
    this.earningsMax = 1;
    this.earningsSize = 8;
    this.recordList = [];
    this.recordPage = 1;
    this.recordMax = 1;
    this.recordSize = 8;
    this.isUpdate = false; // this.ReqDiscountCoinBalanceRecordList();

    glGame.panel.showEffectPariticle(this.node);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UI.SHOW_YUEBAO_LOWEST, this.showLowesttips, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.ReqDiscountCoinBalanceSummary, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UI.SHOW_YUEBAO_LOWEST, this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
  },
  // 界面销毁
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  // start(){
  showLowesttips: function showLowesttips() {
    if (this.yubaoData.can_receive_profit <= 0 && this.yubaoData.can_receive_profit == 0) {
      var str = glGame.tips.YUBAO.NOREWARD;
      glGame.panel.showErrorTip(str);
      return;
    } else {
      var _str = glGame.tips.YUBAO.MINPROFIT.format("".concat(this.getFloat(this.yubaoData.min_receive_profit)));

      glGame.panel.showErrorTip(_str);
      return;
    }
  },
  // },
  // 初始化余额宝界面数值显示
  initMainUI: function initMainUI() {
    // 界面 1
    this.lb_effectivebalance.string = glGame.user.isTourist() ? 0 : this.getFloat(this.yubaoData.accounts_effective_coin);
    this.lb_yesterdayes.string = this.getFloat(this.yubaoData.yesterday_profit);
    this.lb_differenceexplain.string = "\u60A8\u8FD8\u6709 <color=#f4c404>".concat(this.getFloat(this.yubaoData.unsatisfied_coin), "</color> \u91D1\u5E01\u4E0D\u6EE1\u8DB3\u6253\u7801\u91CF\u8981\u6C42\uFF0C\u672A\u8F6C\u5316\u4E3A\u6709\u6548\u4F59\u989D\uFF01");
    if (this.yubaoData.unsatisfied_coin <= 0) this.lb_differenceexplain.node.active = false;
    this.lb_yeares.string = "".concat((this.yubaoData.profit_percent / 100 * 365).toFixed(2), "%");
    var dayes = (this.yubaoData.accounts_effective_coin * this.yubaoData.profit_percent / 10000).div(100).toFixed(2);
    this.lb_dayes.string = this.yubaoData.min_effective_coin > this.accounts_effective_coin ? 0 : dayes;
    this.lb_totales.string = this.getFloat(this.yubaoData.all_produce_profit);
    this.lb_nowes.string = this.getFloat(this.yubaoData.can_receive_profit);
    this.lb_yue.string = this.getFloat(this.yubaoData.min_effective_coin);
    this.lb_time.string = this.yubaoData.settlement_time;
    this.lb_rate.string = this.yubaoData.audit; // 界面 2

    this.lb_weekes.string = this.getFloat(this.yubaoData.week_profit);
    this.lb_monthes.string = this.getFloat(this.yubaoData.month_profit);
    this.lb_totales2.string = this.getFloat(this.yubaoData.all_produce_profit); // 界面 3

    this.lb_nowes3.string = this.getFloat(this.yubaoData.can_receive_profit);
    this.lb_formerlyes.string = this.getFloat(this.yubaoData.all_receive_profit);
    this.lb_totales3.string = this.getFloat(this.yubaoData.all_produce_profit);
  },
  // 获取收益记录
  setEarningsUI: function setEarningsUI() {
    if (this.earningsList.length <= 0) {
      this.eamings_panel.getChildByName("norecord").active = true;
      return;
    }

    this.eamings_panel.getChildByName("btn_up").active = true;
    this.eamings_panel.getChildByName("btn_next").active = true;
    this.eamings_panel.getChildByName("pageLabel").active = true;
    this.eamings_panel.getChildByName("label").active = true;
    var begin = (this.earningsPage - 1) * this.earningsSize;
    if (begin > this.earningsList.length) return;
    var end = Math.min(this.earningsPage * this.earningsSize, this.earningsList.length);
    this.earnings_content.destroyAllChildren();
    this.earnings_content.removeAllChildren();
    this.lb_earningspage.string = "\u7B2C ".concat(this.earningsPage, "/").concat(this.earningsMax, " \u9875");

    for (var i = begin; i < end; i++) {
      var data = this.earningsList[i];
      var rightItem = cc.instantiate(this.earnings_item);
      rightItem.parent = this.earnings_content; //rightItem.active = true;

      rightItem.getChildByName("bg").active = i % 2 != 1;
      rightItem.getChildByName("date").getComponent(cc.Label).string = data.create_time;
      rightItem.getChildByName("effective").getComponent(cc.Label).string = this.getFloat(data.balance);
      rightItem.getChildByName("yearget").getComponent(cc.Label).string = "".concat((data.percent / 100 * 365).toFixed(2), "%");
      rightItem.getChildByName("Profit").getComponent(cc.Label).string = this.getFloat(data.profit);
      rightItem.getChildByName("Profit").color = glGame.plazaColor.gain;
    }

    glGame.panel.showEffectNode(this, this.earnings_content, 0.01, true);
  },
  setRecordUI: function setRecordUI() {
    if (this.recordList.length <= 0) {
      this.getaward_panel.getChildByName("norecord").active = true;
      return;
    }

    this.getaward_panel.getChildByName("btn_pageup").active = true;
    this.getaward_panel.getChildByName("btn_pagedown").active = true;
    this.getaward_panel.getChildByName("pageLabel").active = true;
    this.getaward_panel.getChildByName("label").active = true;
    var begin = (this.recordPage - 1) * this.recordSize;
    if (begin > this.recordList.length) return;
    var end = Math.min(this.recordPage * this.recordSize, this.recordList.length);
    this.record_content.destroyAllChildren();
    this.record_content.removeAllChildren();
    this.lb_recordpage.string = "\u7B2C ".concat(this.recordPage, "/").concat(this.recordMax, " \u9875");

    for (var i = begin; i < end; i++) {
      var data = this.recordList[i];
      var recordItem = cc.instantiate(this.record_item);
      recordItem.parent = this.record_content; //recordItem.active = true;

      recordItem.getChildByName("bg").active = i % 2 != 1;
      recordItem.getChildByName("date").getComponent(cc.Label).string = data.create_time;
      recordItem.getChildByName("getCoin").getComponent(cc.Label).string = this.getFloat(data.number);
      recordItem.getChildByName("getCoin").color = glGame.plazaColor.gain;
      recordItem.getChildByName("state").getComponent(cc.Label).string = this.getStringState(data.state);
      recordItem.getChildByName("state").color = this.getColor(data.state);
    }

    glGame.panel.showEffectNode(this, this.record_content, 0.01, true);
  },
  //余额宝数据获取
  ReqDiscountCoinBalanceSummary: function ReqDiscountCoinBalanceSummary() {
    var _this = this;

    if (this.yubaoData == null) {
      glGame.gameNet.send_msg('http.ReqDiscountCoinBalanceSummary', {}, function (route, msg) {
        _this.yubaoData = msg.result;

        _this.initMainUI();
      });
    }
  },
  // 收益记录显示
  ReqDiscountCoinBalanceRecordList: function ReqDiscountCoinBalanceRecordList() {
    var _this2 = this;

    if (this.earningsList.length <= this.earningsSize * (this.earningsPage - 1) && this.earningsPage <= this.earningsMax) {
      glGame.gameNet.send_msg('http.ReqDiscountCoinBalanceRecordList', {
        page: this.earningsPage,
        page_size: this.earningsSize
      }, function (route, msg) {
        _this2.earningsList = _this2.earningsList.concat(msg.list);
        _this2.earningsMax = msg.total_page;

        _this2.setEarningsUI();
      });
    } else this.setEarningsUI();
  },
  //领取记录
  ReqDiscountCoinBalance: function ReqDiscountCoinBalance() {
    var _this3 = this;

    if (this.recordList.length <= this.recordSize * (this.recordPage - 1) && this.recordPage <= this.recordMax || this.isUpdate) {
      glGame.gameNet.send_msg('http.ReqDiscountCoinBalance', {
        page: this.recordPage,
        page_size: this.recordSize
      }, function (route, msg) {
        _this3.recordList = _this3.recordList.concat(msg.result.list);
        _this3.recordMax = msg.result.total_page;
        _this3.isUpdate = false;

        _this3.setRecordUI();
      });
    } else this.setRecordUI();
  },
  ReqDiscountCoinBalanceApply: function ReqDiscountCoinBalanceApply() {
    var _this4 = this;

    if (this.yubaoData.can_receive_profit <= 0 && this.yubaoData.can_receive_profit == 0) {
      var str = glGame.tips.YUBAO.NOREWARD;
      glGame.panel.showErrorTip(str);
      return;
    } else if (this.yubaoData.min_receive_profit > this.yubaoData.can_receive_profit) {
      var _str2 = glGame.tips.YUBAO.MINPROFIT.format("".concat(this.getFloat(this.yubaoData.min_receive_profit)));

      glGame.panel.showErrorTip(_str2);
      return;
    }

    glGame.gameNet.send_msg('http.ReqDiscountCoinBalanceApply', {}, function (route, msg) {
      _this4.isUpdate = true;

      if (_this4.yubaoData.mod == 1) {
        var strTitle = glGame.tips.YUBAO.CONGRATULATE;
        glGame.panel.showAwardBox(strTitle, [{
          type: glGame.awardtype.COIN,
          value: _this4.getFloat(_this4.yubaoData.can_receive_profit)
        }]);
      } else if (_this4.yubaoData.mod == 2) {
        glGame.panel.showMsgBox("", glGame.tips.YUBAO.NOTICETIPS.format("".concat(_this4.getFloat(_this4.yubaoData.can_receive_profit))));
      }

      glGame.user.ReqRedDot();
      glGame.user.reqGetCoin();
      _this4.yubaoData = null;

      _this4.ReqDiscountCoinBalanceSummary();

      _this4.recordList = [];
    });
  },
  getColor: function getColor(state) {
    var color = cc.color(0, 255, 54);

    switch (state) {
      case 0:
      case 1:
      case 4:
        color = cc.color(0, 255, 54);
        break;

      case 2:
      case 3:
        color = cc.color(102, 144, 204);
        break;

      case 5:
      case 6:
        color = cc.color(255, 0, 0);
        break;
    }

    return color;
  },
  getStringState: function getStringState(state) {
    var strText = STATE_TEXT[1];

    switch (state) {
      case 0:
      case 1:
      case 4:
        strText = STATE_TEXT[0];
        break;

      case 2:
      case 3:
        strText = STATE_TEXT[1];
        break;

      case 5:
      case 6:
        strText = STATE_TEXT[2];
        break;
    }

    return strText;
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.click_cancel();
        break;

      case "btn_getrecord":
        this.btn_getrecordCB();
        break;

      case "btn_require":
        this.btn_requireCB();
        break;

      case "btn_closeget":
        this.btn_closegetCB();
        break;

      case "btn_getearnings":
        this.btn_getearningsCB();
        break;

      case "btn_pageup":
        this.btn_pageupCB();
        break;

      case "btn_pagedown":
        this.btn_pagedownCB();
        break;

      case "btn_up":
        this.btn_earningsup();
        break;

      case "btn_next":
        this.btn_earningsnext();
        break;

      case "yuebaoMain":
      case "earnings":
      case "getaward":
        this.cutshowPanel(name);
        break;

      default:
        break;
    }
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.son_panel.childrenCount) return;

    for (var i = 0; i < this.son_panel.childrenCount; i++) {
      this.son_panel.children[i].active = false;
    }
  },
  //显示某个界面。按名字来显示
  cutshowPanel: function cutshowPanel(panelName) {
    this.hideAllPanel();

    if (panelName == "yuebaoMain") {
      this.yuebao_panel.active = true;
      this.ReqDiscountCoinBalance();
    } else if (panelName == "earnings") {
      this.eamings_panel.active = true;
      if (this.earningsList.length == 0) this.ReqDiscountCoinBalanceRecordList();
    } else if (panelName == "getaward") {
      this.getaward_panel.active = true;

      if (this.recordList.length == 0 || this.isUpdate) {
        this.ReqDiscountCoinBalance();
      }
    }
  },
  btn_getearningsCB: function btn_getearningsCB() {
    this.ReqDiscountCoinBalanceApply();
  },
  click_cancel: function click_cancel() {
    this.remove();
  },
  btn_getrecordCB: function btn_getrecordCB() {
    this.ReqDiscountCoinBalance();
  },
  btn_closegetCB: function btn_closegetCB() {
    this.getrecord.active = false;
  },
  btn_pageupCB: function btn_pageupCB() {
    this.recordPage--;
    if (this.recordPage < 1) this.recordPage = 1;else this.setRecordUI();
  },
  btn_pagedownCB: function btn_pagedownCB() {
    this.recordPage++;
    if (this.recordPage > this.recordMax) this.recordPage = this.recordMax;else this.ReqDiscountCoinBalance();
  },
  btn_earningsup: function btn_earningsup() {
    this.earningsPage--;
    if (this.earningsPage < 1) this.earningsPage = 1;else this.setEarningsUI();
  },
  btn_earningsnext: function btn_earningsnext() {
    this.earningsPage++;
    if (this.earningsPage > this.earningsMax) this.earningsPage = this.earningsMax;else this.ReqDiscountCoinBalanceRecordList();
  },
  btn_requireCB: function btn_requireCB() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("withdraw")) {
      return;
    }

    glGame.panel.showPanelByName("backWaterRule");
  }
});

cc._RF.pop();
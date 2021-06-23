
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/yubao/yubao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx5dWJhb1xceXViYW8uanMiXSwibmFtZXMiOlsiU1RBVEVfVEVYVCIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzb25fcGFuZWwiLCJjYyIsIk5vZGUiLCJ5dWViYW9fcGFuZWwiLCJlYW1pbmdzX3BhbmVsIiwiZ2V0YXdhcmRfcGFuZWwiLCJsYl9lZmZlY3RpdmViYWxhbmNlIiwiTGFiZWwiLCJsYl95ZXN0ZXJkYXllcyIsImxiX2RpZmZlcmVuY2VleHBsYWluIiwiUmljaFRleHQiLCJsYl95ZWFyZXMiLCJsYl9kYXllcyIsImxiX3RvdGFsZXMiLCJsYl9ub3dlcyIsImxiX3l1ZSIsImxiX3RpbWUiLCJsYl9yYXRlIiwibGJfd2Vla2VzIiwibGJfbW9udGhlcyIsImxiX3RvdGFsZXMyIiwiZWFybmluZ3NfY29udGVudCIsImVhcm5pbmdzX2l0ZW0iLCJsYl9lYXJuaW5nc3BhZ2UiLCJsYl9ub3dlczMiLCJsYl9mb3JtZXJseWVzIiwibGJfdG90YWxlczMiLCJyZWNvcmRfY29udGVudCIsInJlY29yZF9pdGVtIiwibGJfcmVjb3JkcGFnZSIsIm9uTG9hZCIsInJlZ2lzdGVyRXZlbnQiLCJ5dWJhb0RhdGEiLCJlYXJuaW5nc0xpc3QiLCJlYXJuaW5nc1BhZ2UiLCJlYXJuaW5nc01heCIsImVhcm5pbmdzU2l6ZSIsInJlY29yZExpc3QiLCJyZWNvcmRQYWdlIiwicmVjb3JkTWF4IiwicmVjb3JkU2l6ZSIsImlzVXBkYXRlIiwicGFuZWwiLCJzaG93RWZmZWN0UGFyaXRpY2xlIiwibm9kZSIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlNIT1dfWVVFQkFPX0xPV0VTVCIsInNob3dMb3dlc3R0aXBzIiwibmFtZSIsIkFDVElPTl9FTkQiLCJSZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeSIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsIk9uRGVzdHJveSIsImNhbl9yZWNlaXZlX3Byb2ZpdCIsInN0ciIsInRpcHMiLCJZVUJBTyIsIk5PUkVXQVJEIiwic2hvd0Vycm9yVGlwIiwiTUlOUFJPRklUIiwiZm9ybWF0IiwiZ2V0RmxvYXQiLCJtaW5fcmVjZWl2ZV9wcm9maXQiLCJpbml0TWFpblVJIiwic3RyaW5nIiwidXNlciIsImlzVG91cmlzdCIsImFjY291bnRzX2VmZmVjdGl2ZV9jb2luIiwieWVzdGVyZGF5X3Byb2ZpdCIsInVuc2F0aXNmaWVkX2NvaW4iLCJhY3RpdmUiLCJwcm9maXRfcGVyY2VudCIsInRvRml4ZWQiLCJkYXllcyIsImRpdiIsIm1pbl9lZmZlY3RpdmVfY29pbiIsImFsbF9wcm9kdWNlX3Byb2ZpdCIsInNldHRsZW1lbnRfdGltZSIsImF1ZGl0Iiwid2Vla19wcm9maXQiLCJtb250aF9wcm9maXQiLCJhbGxfcmVjZWl2ZV9wcm9maXQiLCJzZXRFYXJuaW5nc1VJIiwibGVuZ3RoIiwiZ2V0Q2hpbGRCeU5hbWUiLCJiZWdpbiIsImVuZCIsIk1hdGgiLCJtaW4iLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImkiLCJkYXRhIiwicmlnaHRJdGVtIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJjcmVhdGVfdGltZSIsImJhbGFuY2UiLCJwZXJjZW50IiwicHJvZml0IiwiY29sb3IiLCJwbGF6YUNvbG9yIiwiZ2FpbiIsInNob3dFZmZlY3ROb2RlIiwic2V0UmVjb3JkVUkiLCJyZWNvcmRJdGVtIiwibnVtYmVyIiwiZ2V0U3RyaW5nU3RhdGUiLCJzdGF0ZSIsImdldENvbG9yIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJtc2ciLCJyZXN1bHQiLCJSZXFEaXNjb3VudENvaW5CYWxhbmNlUmVjb3JkTGlzdCIsInBhZ2UiLCJwYWdlX3NpemUiLCJjb25jYXQiLCJsaXN0IiwidG90YWxfcGFnZSIsIlJlcURpc2NvdW50Q29pbkJhbGFuY2UiLCJSZXFEaXNjb3VudENvaW5CYWxhbmNlQXBwbHkiLCJtb2QiLCJzdHJUaXRsZSIsIkNPTkdSQVRVTEFURSIsInNob3dBd2FyZEJveCIsInR5cGUiLCJhd2FyZHR5cGUiLCJDT0lOIiwidmFsdWUiLCJzaG93TXNnQm94IiwiTk9USUNFVElQUyIsIlJlcVJlZERvdCIsInJlcUdldENvaW4iLCJzdHJUZXh0IiwiTnVtYmVyIiwidG9TdHJpbmciLCJvbkNsaWNrIiwiY2xpY2tfY2FuY2VsIiwiYnRuX2dldHJlY29yZENCIiwiYnRuX3JlcXVpcmVDQiIsImJ0bl9jbG9zZWdldENCIiwiYnRuX2dldGVhcm5pbmdzQ0IiLCJidG5fcGFnZXVwQ0IiLCJidG5fcGFnZWRvd25DQiIsImJ0bl9lYXJuaW5nc3VwIiwiYnRuX2Vhcm5pbmdzbmV4dCIsImN1dHNob3dQYW5lbCIsImhpZGVBbGxQYW5lbCIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsInBhbmVsTmFtZSIsInJlbW92ZSIsImdldHJlY29yZCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInNob3dTdXNwaWNpb3VzIiwic2hvd1BhbmVsQnlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFVBQVUsR0FBRztBQUNmLEtBQUcsS0FEWTtBQUVmLEtBQUcsS0FGWTtBQUdmLEtBQUc7QUFIWSxDQUFuQjtBQU1BQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsSUFGTjtBQUdSQyxJQUFBQSxZQUFZLEVBQUVGLEVBQUUsQ0FBQ0MsSUFIVDtBQUlSRSxJQUFBQSxhQUFhLEVBQUVILEVBQUUsQ0FBQ0MsSUFKVjtBQUtSRyxJQUFBQSxjQUFjLEVBQUVKLEVBQUUsQ0FBQ0MsSUFMWDtBQU1SO0FBQ0FJLElBQUFBLG1CQUFtQixFQUFFTCxFQUFFLENBQUNNLEtBUGhCO0FBUVJDLElBQUFBLGNBQWMsRUFBRVAsRUFBRSxDQUFDTSxLQVJY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QUFiLENBQTZCLGVBQTdCO0FBQ0g7QUFuV21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTVEFURV9URVhUID0ge1xyXG4gICAgMDogXCLlt7Llj5HmlL5cIixcclxuICAgIDE6IFwi5a6h5qC45LitXCIsXHJcbiAgICAyOiBcIuWksei0pVwiLFxyXG59XHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy/lpKfliIbnsbtcclxuICAgICAgICBzb25fcGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgeXVlYmFvX3BhbmVsOiBjYy5Ob2RlLFxyXG4gICAgICAgIGVhbWluZ3NfcGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2V0YXdhcmRfcGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgLy8g6aG16Z2iMVxyXG4gICAgICAgIGxiX2VmZmVjdGl2ZWJhbGFuY2U6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxiX3llc3RlcmRheWVzOiBjYy5MYWJlbCxcclxuICAgICAgICBsYl9kaWZmZXJlbmNlZXhwbGFpbjogY2MuUmljaFRleHQsXHJcbiAgICAgICAgbGJfeWVhcmVzOiBjYy5MYWJlbCxcclxuICAgICAgICBsYl9kYXllczogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfdG90YWxlczogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfbm93ZXM6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxiX3l1ZTogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfdGltZTogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfcmF0ZTogY2MuTGFiZWwsXHJcbiAgICAgICAgLy8g6aG16Z2iMlxyXG4gICAgICAgIGxiX3dlZWtlczogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfbW9udGhlczogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJfdG90YWxlczI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGVhcm5pbmdzX2NvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgZWFybmluZ3NfaXRlbTogY2MuTm9kZSxcclxuICAgICAgICBsYl9lYXJuaW5nc3BhZ2U6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8vIOmhtemdojNcclxuICAgICAgICBsYl9ub3dlczM6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxiX2Zvcm1lcmx5ZXM6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxiX3RvdGFsZXMzOiBjYy5MYWJlbCxcclxuICAgICAgICByZWNvcmRfY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICByZWNvcmRfaXRlbTogY2MuTm9kZSxcclxuICAgICAgICBsYl9yZWNvcmRwYWdlOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgLy8gLS0tLVxyXG4gICAgICAgIHRoaXMueXViYW9EYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5lYXJuaW5nc0xpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmVhcm5pbmdzUGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5lYXJuaW5nc01heCA9IDE7XHJcbiAgICAgICAgdGhpcy5lYXJuaW5nc1NpemUgPSA4O1xyXG5cclxuICAgICAgICB0aGlzLnJlY29yZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJlY29yZFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucmVjb3JkTWF4ID0gMTtcclxuICAgICAgICB0aGlzLnJlY29yZFNpemUgPSA4O1xyXG5cclxuICAgICAgICB0aGlzLmlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlUmVjb3JkTGlzdCgpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0UGFyaXRpY2xlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlNIT1dfWVVFQkFPX0xPV0VTVCwgdGhpcy5zaG93TG93ZXN0dGlwcywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeSwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy8g6ZSA5q+B55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuU0hPV19ZVUVCQU9fTE9XRVNULCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOeVjOmdoumUgOavgVxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gc3RhcnQoKXtcclxuICAgIHNob3dMb3dlc3R0aXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQgPD0gMCAmJiB0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZ2xHYW1lLnRpcHMuWVVCQU8uTk9SRVdBUkRcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChzdHIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZ2xHYW1lLnRpcHMuWVVCQU8uTUlOUFJPRklULmZvcm1hdChgJHt0aGlzLmdldEZsb2F0KHRoaXMueXViYW9EYXRhLm1pbl9yZWNlaXZlX3Byb2ZpdCl9YCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoc3RyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyDliJ3lp4vljJbkvZnpop3lrp3nlYzpnaLmlbDlgLzmmL7npLpcclxuICAgIGluaXRNYWluVUkoKSB7XHJcbiAgICAgICAgLy8g55WM6Z2iIDFcclxuICAgICAgICB0aGlzLmxiX2VmZmVjdGl2ZWJhbGFuY2Uuc3RyaW5nID0gZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkgPyAwIDogdGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5hY2NvdW50c19lZmZlY3RpdmVfY29pbik7XHJcbiAgICAgICAgdGhpcy5sYl95ZXN0ZXJkYXllcy5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMueXViYW9EYXRhLnllc3RlcmRheV9wcm9maXQpO1xyXG4gICAgICAgIHRoaXMubGJfZGlmZmVyZW5jZWV4cGxhaW4uc3RyaW5nID0gYOaCqOi/mOaciSA8Y29sb3I9I2Y0YzQwND4ke3RoaXMuZ2V0RmxvYXQodGhpcy55dWJhb0RhdGEudW5zYXRpc2ZpZWRfY29pbil9PC9jb2xvcj4g6YeR5biB5LiN5ruh6Laz5omT56CB6YeP6KaB5rGC77yM5pyq6L2s5YyW5Li65pyJ5pWI5L2Z6aKd77yBYDtcclxuICAgICAgICBpZiAodGhpcy55dWJhb0RhdGEudW5zYXRpc2ZpZWRfY29pbiA8PSAwKSB0aGlzLmxiX2RpZmZlcmVuY2VleHBsYWluLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYl95ZWFyZXMuc3RyaW5nID0gYCR7KHRoaXMueXViYW9EYXRhLnByb2ZpdF9wZXJjZW50IC8gMTAwICogMzY1KS50b0ZpeGVkKDIpfSVgXHJcbiAgICAgICAgbGV0IGRheWVzID0gKCh0aGlzLnl1YmFvRGF0YS5hY2NvdW50c19lZmZlY3RpdmVfY29pbiAqIHRoaXMueXViYW9EYXRhLnByb2ZpdF9wZXJjZW50IC8gMTAwMDApLmRpdigxMDApKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMubGJfZGF5ZXMuc3RyaW5nID0gdGhpcy55dWJhb0RhdGEubWluX2VmZmVjdGl2ZV9jb2luID4gdGhpcy5hY2NvdW50c19lZmZlY3RpdmVfY29pbiA/IDAgOiBkYXllcztcclxuICAgICAgICB0aGlzLmxiX3RvdGFsZXMuc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5hbGxfcHJvZHVjZV9wcm9maXQpO1xyXG4gICAgICAgIHRoaXMubGJfbm93ZXMuc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQpO1xyXG4gICAgICAgIHRoaXMubGJfeXVlLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy55dWJhb0RhdGEubWluX2VmZmVjdGl2ZV9jb2luKTtcclxuICAgICAgICB0aGlzLmxiX3RpbWUuc3RyaW5nID0gdGhpcy55dWJhb0RhdGEuc2V0dGxlbWVudF90aW1lO1xyXG4gICAgICAgIHRoaXMubGJfcmF0ZS5zdHJpbmcgPSB0aGlzLnl1YmFvRGF0YS5hdWRpdDtcclxuICAgICAgICAvLyDnlYzpnaIgMlxyXG4gICAgICAgIHRoaXMubGJfd2Vla2VzLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy55dWJhb0RhdGEud2Vla19wcm9maXQpO1xyXG4gICAgICAgIHRoaXMubGJfbW9udGhlcy5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMueXViYW9EYXRhLm1vbnRoX3Byb2ZpdCk7XHJcbiAgICAgICAgdGhpcy5sYl90b3RhbGVzMi5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMueXViYW9EYXRhLmFsbF9wcm9kdWNlX3Byb2ZpdCk7XHJcbiAgICAgICAgLy8g55WM6Z2iIDNcclxuICAgICAgICB0aGlzLmxiX25vd2VzMy5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMueXViYW9EYXRhLmNhbl9yZWNlaXZlX3Byb2ZpdCk7XHJcbiAgICAgICAgdGhpcy5sYl9mb3JtZXJseWVzLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy55dWJhb0RhdGEuYWxsX3JlY2VpdmVfcHJvZml0KTtcclxuICAgICAgICB0aGlzLmxiX3RvdGFsZXMzLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy55dWJhb0RhdGEuYWxsX3Byb2R1Y2VfcHJvZml0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5pS255uK6K6w5b2VXHJcbiAgICBzZXRFYXJuaW5nc1VJKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVhcm5pbmdzTGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVhbWluZ3NfcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJub3JlY29yZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWFtaW5nc19wYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJ0bl91cFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZWFtaW5nc19wYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9uZXh0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lYW1pbmdzX3BhbmVsLmdldENoaWxkQnlOYW1lKFwicGFnZUxhYmVsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lYW1pbmdzX3BhbmVsLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IGJlZ2luID0gKHRoaXMuZWFybmluZ3NQYWdlIC0gMSkgKiB0aGlzLmVhcm5pbmdzU2l6ZTtcclxuICAgICAgICBpZiAoYmVnaW4gPiB0aGlzLmVhcm5pbmdzTGlzdC5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICBsZXQgZW5kID0gTWF0aC5taW4odGhpcy5lYXJuaW5nc1BhZ2UgKiB0aGlzLmVhcm5pbmdzU2l6ZSwgdGhpcy5lYXJuaW5nc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmVhcm5pbmdzX2NvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5lYXJuaW5nc19jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5sYl9lYXJuaW5nc3BhZ2Uuc3RyaW5nID0gYOesrCAke3RoaXMuZWFybmluZ3NQYWdlfS8ke3RoaXMuZWFybmluZ3NNYXh9IOmhtWBcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVnaW47IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZWFybmluZ3NMaXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5lYXJuaW5nc19pdGVtKTtcclxuICAgICAgICAgICAgcmlnaHRJdGVtLnBhcmVudCA9IHRoaXMuZWFybmluZ3NfY29udGVudDtcclxuICAgICAgICAgICAgLy9yaWdodEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmlnaHRJdGVtLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gaSAlIDIgIT0gMVxyXG4gICAgICAgICAgICByaWdodEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJkYXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5jcmVhdGVfdGltZTtcclxuICAgICAgICAgICAgcmlnaHRJdGVtLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0aXZlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChkYXRhLmJhbGFuY2UpO1xyXG4gICAgICAgICAgICByaWdodEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ5ZWFyZ2V0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7KGRhdGEucGVyY2VudCAvIDEwMCAqIDM2NSkudG9GaXhlZCgyKX0lYDtcclxuICAgICAgICAgICAgcmlnaHRJdGVtLmdldENoaWxkQnlOYW1lKFwiUHJvZml0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChkYXRhLnByb2ZpdCk7XHJcbiAgICAgICAgICAgIHJpZ2h0SXRlbS5nZXRDaGlsZEJ5TmFtZShcIlByb2ZpdFwiKS5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmdhaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCB0aGlzLmVhcm5pbmdzX2NvbnRlbnQsIDAuMDEsIHRydWUpXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlY29yZFVJKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZExpc3QubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRhd2FyZF9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIm5vcmVjb3JkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRhd2FyZF9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWdldXBcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdldGF3YXJkX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhZ2Vkb3duXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nZXRhd2FyZF9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcInBhZ2VMYWJlbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2V0YXdhcmRfcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgYmVnaW4gPSAodGhpcy5yZWNvcmRQYWdlIC0gMSkgKiB0aGlzLnJlY29yZFNpemU7XHJcbiAgICAgICAgaWYgKGJlZ2luID4gdGhpcy5yZWNvcmRMaXN0Lmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbih0aGlzLnJlY29yZFBhZ2UgKiB0aGlzLnJlY29yZFNpemUsIHRoaXMucmVjb3JkTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMucmVjb3JkX2NvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRfY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMubGJfcmVjb3JkcGFnZS5zdHJpbmcgPSBg56ysICR7dGhpcy5yZWNvcmRQYWdlfS8ke3RoaXMucmVjb3JkTWF4fSDpobVgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlZ2luOyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnJlY29yZExpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCByZWNvcmRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZWNvcmRfaXRlbSk7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0ucGFyZW50ID0gdGhpcy5yZWNvcmRfY29udGVudDtcclxuICAgICAgICAgICAgLy9yZWNvcmRJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBpICUgMiAhPSAxO1xyXG4gICAgICAgICAgICByZWNvcmRJdGVtLmdldENoaWxkQnlOYW1lKFwiZGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEuY3JlYXRlX3RpbWU7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJnZXRDb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChkYXRhLm51bWJlcik7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJnZXRDb2luXCIpLmNvbG9yID0gZ2xHYW1lLnBsYXphQ29sb3IuZ2FpbjtcclxuICAgICAgICAgICAgcmVjb3JkSXRlbS5nZXRDaGlsZEJ5TmFtZShcInN0YXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRTdHJpbmdTdGF0ZShkYXRhLnN0YXRlKTtcclxuICAgICAgICAgICAgcmVjb3JkSXRlbS5nZXRDaGlsZEJ5TmFtZShcInN0YXRlXCIpLmNvbG9yID0gdGhpcy5nZXRDb2xvcihkYXRhLnN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsIHRoaXMucmVjb3JkX2NvbnRlbnQsIDAuMDEsIHRydWUpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5L2Z6aKd5a6d5pWw5o2u6I635Y+WXHJcbiAgICBSZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeSgpIHtcclxuICAgICAgICBpZiAodGhpcy55dWJhb0RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeScsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55dWJhb0RhdGEgPSBtc2cucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TWFpblVJKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmlLbnm4rorrDlvZXmmL7npLpcclxuICAgIFJlcURpc2NvdW50Q29pbkJhbGFuY2VSZWNvcmRMaXN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVhcm5pbmdzTGlzdC5sZW5ndGggPD0gdGhpcy5lYXJuaW5nc1NpemUgKiAodGhpcy5lYXJuaW5nc1BhZ2UgLSAxKSAmJiB0aGlzLmVhcm5pbmdzUGFnZSA8PSB0aGlzLmVhcm5pbmdzTWF4KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcURpc2NvdW50Q29pbkJhbGFuY2VSZWNvcmRMaXN0JywgeyBwYWdlOiB0aGlzLmVhcm5pbmdzUGFnZSwgcGFnZV9zaXplOiB0aGlzLmVhcm5pbmdzU2l6ZSB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lYXJuaW5nc0xpc3QgPSB0aGlzLmVhcm5pbmdzTGlzdC5jb25jYXQobXNnLmxpc3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lYXJuaW5nc01heCA9IG1zZy50b3RhbF9wYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFYXJuaW5nc1VJKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2V0RWFybmluZ3NVSSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+mihuWPluiusOW9lVxyXG4gICAgUmVxRGlzY291bnRDb2luQmFsYW5jZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRMaXN0Lmxlbmd0aCA8PSB0aGlzLnJlY29yZFNpemUgKiAodGhpcy5yZWNvcmRQYWdlIC0gMSkgJiYgdGhpcy5yZWNvcmRQYWdlIDw9IHRoaXMucmVjb3JkTWF4fHx0aGlzLmlzVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcURpc2NvdW50Q29pbkJhbGFuY2UnLCB7IHBhZ2U6IHRoaXMucmVjb3JkUGFnZSwgcGFnZV9zaXplOiB0aGlzLnJlY29yZFNpemUgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkTGlzdCA9IHRoaXMucmVjb3JkTGlzdC5jb25jYXQobXNnLnJlc3VsdC5saXN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkTWF4ID0gbXNnLnJlc3VsdC50b3RhbF9wYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSZWNvcmRVSSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnNldFJlY29yZFVJKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcURpc2NvdW50Q29pbkJhbGFuY2VBcHBseSgpIHtcclxuICAgICAgICBpZiAodGhpcy55dWJhb0RhdGEuY2FuX3JlY2VpdmVfcHJvZml0IDw9IDAgJiYgdGhpcy55dWJhb0RhdGEuY2FuX3JlY2VpdmVfcHJvZml0ID09IDApIHtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IGdsR2FtZS50aXBzLllVQkFPLk5PUkVXQVJEXHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoc3RyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnl1YmFvRGF0YS5taW5fcmVjZWl2ZV9wcm9maXQgPiB0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQpIHtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IGdsR2FtZS50aXBzLllVQkFPLk1JTlBST0ZJVC5mb3JtYXQoYCR7dGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5taW5fcmVjZWl2ZV9wcm9maXQpfWApO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKHN0cilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFEaXNjb3VudENvaW5CYWxhbmNlQXBwbHknLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnl1YmFvRGF0YS5tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0clRpdGxlID0gZ2xHYW1lLnRpcHMuWVVCQU8uQ09OR1JBVFVMQVRFO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dBd2FyZEJveChzdHJUaXRsZSwgW3sgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5DT0lOLCB2YWx1ZTogdGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQpIH1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnl1YmFvRGF0YS5tb2QgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCJcIiwgZ2xHYW1lLnRpcHMuWVVCQU8uTk9USUNFVElQUy5mb3JtYXQoYCR7dGhpcy5nZXRGbG9hdCh0aGlzLnl1YmFvRGF0YS5jYW5fcmVjZWl2ZV9wcm9maXQpfWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxR2V0Q29pbigpO1xyXG4gICAgICAgICAgICB0aGlzLnl1YmFvRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuUmVxRGlzY291bnRDb2luQmFsYW5jZVN1bW1hcnkoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRMaXN0ID0gW107XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdldENvbG9yKHN0YXRlKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuY29sb3IoMCwgMjU1LCA1NCk7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSBjYy5jb2xvcigwLCAyNTUsIDU0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6IGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gY2MuY29sb3IoMTAyLCAxNDQsIDIwNCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfSxcclxuICAgIGdldFN0cmluZ1N0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgbGV0IHN0clRleHQgPSBTVEFURV9URVhUWzFdO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHN0clRleHQgPSBTVEFURV9URVhUWzBdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjogY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgc3RyVGV4dCA9IFNUQVRFX1RFWFRbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OiBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICBzdHJUZXh0ID0gU1RBVEVfVEVYVFsyXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyVGV4dDtcclxuICAgIH0sXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLmNsaWNrX2NhbmNlbCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nZXRyZWNvcmRcIjogdGhpcy5idG5fZ2V0cmVjb3JkQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVxdWlyZVwiOiB0aGlzLmJ0bl9yZXF1aXJlQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VnZXRcIjogdGhpcy5idG5fY2xvc2VnZXRDQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nZXRlYXJuaW5nc1wiOiB0aGlzLmJ0bl9nZXRlYXJuaW5nc0NCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3BhZ2V1cFwiOiB0aGlzLmJ0bl9wYWdldXBDQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9wYWdlZG93blwiOiB0aGlzLmJ0bl9wYWdlZG93bkNCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3VwXCI6IHRoaXMuYnRuX2Vhcm5pbmdzdXAoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbmV4dFwiOiB0aGlzLmJ0bl9lYXJuaW5nc25leHQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ5dWViYW9NYWluXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJlYXJuaW5nc1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZ2V0YXdhcmRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3V0c2hvd1BhbmVsKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+makOiXj+aJgOacieeVjOmdolxyXG4gICAgaGlkZUFsbFBhbmVsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zb25fcGFuZWwuY2hpbGRyZW5Db3VudCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb25fcGFuZWwuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29uX3BhbmVsLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mmL7npLrmn5DkuKrnlYzpnaLjgILmjInlkI3lrZfmnaXmmL7npLpcclxuICAgIGN1dHNob3dQYW5lbChwYW5lbE5hbWUpIHtcclxuICAgICAgICB0aGlzLmhpZGVBbGxQYW5lbCgpO1xyXG4gICAgICAgIGlmIChwYW5lbE5hbWUgPT0gXCJ5dWViYW9NYWluXCIpIHtcclxuICAgICAgICAgICAgdGhpcy55dWViYW9fcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYW5lbE5hbWUgPT0gXCJlYXJuaW5nc1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWFtaW5nc19wYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lYXJuaW5nc0xpc3QubGVuZ3RoID09IDApIHRoaXMuUmVxRGlzY291bnRDb2luQmFsYW5jZVJlY29yZExpc3QoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhbmVsTmFtZSA9PSBcImdldGF3YXJkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRhd2FyZF9wYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNvcmRMaXN0Lmxlbmd0aCA9PSAwfHx0aGlzLmlzVXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcURpc2NvdW50Q29pbkJhbGFuY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYnRuX2dldGVhcm5pbmdzQ0IoKSB7XHJcbiAgICAgICAgdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlQXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgIH0sXHJcblxyXG4gICAgYnRuX2dldHJlY29yZENCKCkge1xyXG4gICAgICAgIHRoaXMuUmVxRGlzY291bnRDb2luQmFsYW5jZSgpO1xyXG4gICAgfSxcclxuICAgIGJ0bl9jbG9zZWdldENCKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0cmVjb3JkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGJ0bl9wYWdldXBDQigpIHtcclxuICAgICAgICB0aGlzLnJlY29yZFBhZ2UtLTtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRQYWdlIDwgMSkgdGhpcy5yZWNvcmRQYWdlID0gMTtcclxuICAgICAgICBlbHNlIHRoaXMuc2V0UmVjb3JkVUkoKTtcclxuICAgIH0sXHJcbiAgICBidG5fcGFnZWRvd25DQigpIHtcclxuICAgICAgICB0aGlzLnJlY29yZFBhZ2UrKztcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRQYWdlID4gdGhpcy5yZWNvcmRNYXgpIHRoaXMucmVjb3JkUGFnZSA9IHRoaXMucmVjb3JkTWF4O1xyXG4gICAgICAgIGVsc2UgdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlKCk7XHJcbiAgICB9LFxyXG4gICAgYnRuX2Vhcm5pbmdzdXAoKSB7XHJcbiAgICAgICAgdGhpcy5lYXJuaW5nc1BhZ2UtLTtcclxuICAgICAgICBpZiAodGhpcy5lYXJuaW5nc1BhZ2UgPCAxKSB0aGlzLmVhcm5pbmdzUGFnZSA9IDE7XHJcbiAgICAgICAgZWxzZSB0aGlzLnNldEVhcm5pbmdzVUkoKTtcclxuICAgIH0sXHJcbiAgICBidG5fZWFybmluZ3NuZXh0KCkge1xyXG4gICAgICAgIHRoaXMuZWFybmluZ3NQYWdlKys7XHJcbiAgICAgICAgaWYgKHRoaXMuZWFybmluZ3NQYWdlID4gdGhpcy5lYXJuaW5nc01heCkgdGhpcy5lYXJuaW5nc1BhZ2UgPSB0aGlzLmVhcm5pbmdzTWF4O1xyXG4gICAgICAgIGVsc2UgdGhpcy5SZXFEaXNjb3VudENvaW5CYWxhbmNlUmVjb3JkTGlzdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidG5fcmVxdWlyZUNCKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbEdhbWUucGFuZWwuc2hvd1N1c3BpY2lvdXMoXCJ3aXRoZHJhd1wiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJiYWNrV2F0ZXJSdWxlXCIpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
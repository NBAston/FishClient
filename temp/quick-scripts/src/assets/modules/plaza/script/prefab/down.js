"use strict";
cc._RF.push(module, 'eb73ee59rVJGbO+daPZZB4c', 'down');
// modules/plaza/script/prefab/down.js

"use strict";

glGame.baseclass.extend({
  properties: {
    btnLayout: cc.Node,
    //按钮父节点排序之用
    btn_popu: cc.Node,
    //推广按钮
    btn_acctivit: cc.Node,
    //活动按钮
    //btn_yuebao: cc.Node,//余额宝按钮
    btn_backWater: cc.Node,
    //返水按钮
    btn_email: cc.Node,
    //邮件按钮
    btn_task: cc.Node,
    //任务按钮
    btn_withdraw: cc.Node,
    //提现按钮
    btn_shop: cc.Node,
    //充值按钮
    btn_rank: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.initUI();
    this.reqRedDot();
  },
  initUI: function initUI() {
    this.btn_task.active = glGame.user.missionSwitch == 1;
    this.btn_backWater.active = glGame.user.rebateSwitch == 1;
    console.log("这是当前的开关", glGame.user.missionSwitch, glGame.user.rebateSwitch);
    var count = 0;

    for (var i = 1; i < this.btnLayout.childrenCount; i++) {
      if (this.btnLayout.children[i].active) {
        count++;
      }
    } //根据当前窗口大小调整按钮大小从而调整间距


    var windowsWidth = (cc.winSize.width - this.btn_shop.width - this.btn_popu.width) / count;

    for (var _i = 1; _i < this.btnLayout.childrenCount; _i++) {
      this.btnLayout.children[_i].width = windowsWidth;
    }
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UI.SCENE, this.initUI, this);
    glGame.emitter.on("ReqRedDot", this.reqRedDot, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UI.SCENE, this);
    glGame.emitter.off("ReqRedDot", this);
  },
  //刷新按钮上的红点
  reqRedDot: function reqRedDot(data) {
    if (!data) data = glGame.user.get('redDotData');
    var count = 0;

    for (var i in data) {
      count++;
    }

    ;
    if (count == 0) return;
    this.btn_email.getChildByName("redMark").active = data['mailReq'] == 1 || data['mailCapitalReq'] == 1;
    this.btn_popu.getChildByName("redMark").active = data['extensionReq'] == 1;
    this.btn_acctivit.getChildByName("redMark").active = data['discountReq'].length != 0;
    this.btn_backWater.getChildByName("redMark").active = data['playerRebatReq'] == 1;
    this.btn_task.getChildByName("redMark").active = data['missionReq'] == 1;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  // 重写父类按钮点击事件
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_email":
        this.click_email();
        break;

      case "btn_withdraw":
        this.click_exchange();
        break;

      case "btn_shop":
        this.click_shop();
        break;

      case "btn_acctivit":
        this.click_acctivit();
        break;

      case "btn_popu":
        this.click_popu();
        break;

      case "btn_task":
        this.click_task();
        break;

      case "btn_backWater":
        this.click_backWater();
        break;
      //这是洗码的功能

      case "btn_rank":
        this.click_Rank();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_Rank: function click_Rank() {
    glGame.panel.showPanelByName("rank");
  },
  click_backWater: function click_backWater() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("receive_rebate")) {
      return;
    }

    if (glGame.user.get("rebateSwitchEx") != 1) {
      glGame.panel.showTip("该功能暂未开放");
      return;
    }

    glGame.panel.showPanelByName('backWater');
  },
  click_task: function click_task() {
    glGame.panel.showPanelByName("Task");
  },
  click_popu: function click_popu() {
    if (glGame.panel.showSuspicious("receive_promotion_award")) {
      return;
    }

    glGame.panel.showPanelByName("popularize");
  },
  click_acctivit: function click_acctivit() {
    if (glGame.panel.showSuspicious("receive_discount")) {
      return;
    }

    glGame.panel.showPanelByName("announcement");
  },
  click_email: function click_email() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.panel.showPanelByName("email");
  },
  click_exchange: function click_exchange() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("withdraw")) {
      return;
    }

    if (glGame.user.is_withdraw == 2) {
      glGame.panel.showDialog("账号异常", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return;
    } //glGame.panel.showPanelByName("exchangeType");


    glGame.panel.showPanelByName("withdrawal");
  },
  click_shop: function click_shop() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("recharge")) {
      return;
    }

    glGame.panel.showShop();
  }
});

cc._RF.pop();
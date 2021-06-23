"use strict";
cc._RF.push(module, 'bdf93UW5XFFTq6bdu4Drdwh', 'backWaterRule');
// modules/plaza/script/prefab/withdrawal/backWaterRule.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    item: cc.Node,
    curPage: cc.Label,
    totalPage: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.page = 1;
    this.record = {};
    this.reqWithdrawDiscount();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_upPage":
        this.upPage();
        break;

      case "btn_downPage":
        this.downPage();
        break;
    }
  },
  reqWithdrawDiscount: function reqWithdrawDiscount() {
    var _this = this;

    if (this.record[this.page]) {
      this.curPage.string = this.page;
      this.updateItem(this.record[this.page]);
      return;
    }

    glGame.gameNet.send_msg("http.reqWithdrawDiscount", {
      page: this.page,
      page_size: 8
    }, function (route, data) {
      _this.totalPage.string = data.result.total_page;
      _this.curPage.string = _this.page;
      _this.record[_this.page] = data;

      _this.updateItem(data);
    });
  },
  updateItem: function updateItem(data) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var list = data.result.list;

    for (var i = 0; i < list.length; i++) {
      var panel = cc.instantiate(this.item);
      panel.parent = this.content;
      var bg = panel.getChildByName("bg");
      var time = panel.getChildByName("time").getComponent(cc.Label);
      var type = panel.getChildByName("type").getComponent(cc.Label);
      var coinNumber = panel.getChildByName("coinNumber").getComponent(cc.Label);
      var state = panel.getChildByName("state").getComponent(cc.Label);
      var waterAsk = panel.getChildByName("waterAsk").getComponent(cc.RichText); // let current_flow = panel.getChildByName("waterAsk").getChildByName("lab_one").getComponent(cc.Label);
      // let need_flow = panel.getChildByName("waterAsk").getChildByName("lab_two").getComponent(cc.Label);

      bg.active = i % 2 != 0;
      var timeStamp = new Date(list[i].rechargeTimeStamp * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      time.string = strTime;
      type.string = list[i].source;
      coinNumber.string = this.getFloat(list[i].coin) + "元";

      if (list[i].current_flow == list[i].need_flow) {
        waterAsk.string = "<color=#00ff18>".concat(this.getFloat(list[i].current_flow), "</c>/").concat(this.getFloat(list[i].need_flow));
      } else {
        waterAsk.string = "<color=#dc4848>".concat(this.getFloat(list[i].current_flow), "</c>/").concat(this.getFloat(list[i].need_flow));
      }

      state.node.color = list[i].current_flow == list[i].need_flow ? cc.color(0, 255, 24) : cc.color(220, 72, 72);
      state.string = list[i].type; //panel.active = true;
    }

    this.node.getChildByName("tip").active = list.length > 0;
    this.node.getChildByName("btn_downPage").active = list.length > 0;
    this.node.getChildByName("btn_upPage").active = list.length > 0;
    this.node.getChildByName("pageLayout").active = list.length > 0;
    this.node.getChildByName("img_wujilu").active = list.length == 0;
    glGame.panel.showEffectNode(this, this.content, 0.01, true);
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  set: function set(key, value) {
    this[key] = value;
  },
  upPage: function upPage() {
    if (this.page - 1 < 1) {
      return;
    }

    this.page--;
    this.reqWithdrawDiscount();
  },
  downPage: function downPage() {
    if (this.page + 1 > Number(this.totalPage.string)) {
      return;
    }

    this.page++;
    this.reqWithdrawDiscount();
  },
  OnDestroy: function OnDestroy() {} // update (dt) {},

});

cc._RF.pop();
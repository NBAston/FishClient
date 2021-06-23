"use strict";
cc._RF.push(module, 'f3f3bpqUsZOp6lEeeGwOK0Q', 'exchangerecord');
// modules/plaza/script/prefab/withdrawal/exchangerecord.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    exchangeitem: cc.Node,
    curPage: cc.Label,
    totalPage: cc.Label
  },
  onLoad: function onLoad() {
    this.resetData();
    this.page = 1;
    this.record = {};
    this.reqWithdrawLog();
  },
  resetData: function resetData() {
    this.exchangeState = ["处理中", "成功", "退回", "失败"];
    this.exchangeColor = [cc.color(102, 144, 204), cc.color(0, 255, 24), cc.color(244, 20, 36), cc.color(244, 20, 36)];
  },
  reqWithdrawLog: function reqWithdrawLog() {
    var _this = this;

    if (this.record[this.page]) {
      this.curPage.string = this.page;
      this.updateItem(this.record[this.page]);
      return;
    }

    glGame.gameNet.send_msg("http.reqWithdrawLog", {
      type: 0,
      page: this.page,
      pageSize: 7
    }, function (route, data) {
      _this.totalPage.string = data.result.pageTotal;
      _this.curPage.string = _this.page;
      _this.record[_this.page] = data;

      _this.updateItem(data);
    });
  },
  //浮点型运算取俩位
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return (Math.floor(value * 100) / 100).toFixed(num).toString();
    }
  },
  updateItem: function updateItem(msg) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var exchangeInfo = msg.result.data;
    var count = exchangeInfo.length;
    this.node.getChildByName("img_wujilu").active = count == 0;
    this.node.getChildByName("pageLayout").active = count > 0;
    this.node.getChildByName("btn_upPage").active = count > 0;
    this.node.getChildByName("btn_downPage").active = count > 0;
    this.node.getChildByName("panel").getChildByName("tip").active = count > 0;

    for (var i = 0; i < count; i++) {
      var info = exchangeInfo[i];
      var panel = cc.instantiate(this.exchangeitem);
      panel.parent = this.content;
      panel.active = false;
      var bg = panel.getChildByName("bg");
      var coin = panel.getChildByName("coin").getComponent(cc.Label);
      var acc = panel.getChildByName("acc").getComponent(cc.Label);
      var time = panel.getChildByName("time").getComponent(cc.Label);
      var state = panel.getChildByName("state").getComponent(cc.Label);
      var type = panel.getChildByName("type").getComponent(cc.Label);
      bg.active = i % 2 == 0;
      type.string = info.payeeMethod == 1 ? "支付宝" : "银行卡";
      var accNum = info.accountName;
      acc.string = info.payeeMethod == 1 ? accNum.replace(accNum.substring(3, 7), "****") : accNum.replace(accNum.substring(4, 13), "*********");
      coin.string = "".concat(this.getFloat(info.money), "\u5143");
      glGame.panel.settingTableLabelColor(panel.getChildByName("coin"));
      state.string = info.state;
      var timeStamp = new Date(exchangeInfo[i].rechargeTimeStamp * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      time.string = strTime;

      for (var x = 0; x < this.exchangeState.length; x++) {
        if (info.state == this.exchangeState[x]) {
          state.node.color = this.exchangeColor[x];
        }
      }

      console.log("兑换记录", exchangeInfo[i]);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "btn_upPage":
        this.upPage();
        break;

      case "btn_downPage":
        this.downPage();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  upPage: function upPage() {
    if (this.page - 1 < 1) {
      return;
    }

    this.page--;
    this.reqWithdrawLog();
  },
  downPage: function downPage() {
    if (this.page + 1 > Number(this.totalPage.string)) {
      return;
    }

    this.page++;
    this.reqWithdrawLog();
  },
  click_close: function click_close() {
    this.remove();
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  }
});

cc._RF.pop();
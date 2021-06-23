"use strict";
cc._RF.push(module, '51aaf4pFbNJNaPN2weMwSpH', 'activemember');
// modules/plaza/script/prefab/popularize/activemember.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    effectiveItem: cc.Node,
    Lab_condition: cc.RichText,
    effectivemember: cc.Label,
    achiveData: cc.Label
  },
  onLoad: function onLoad() {
    this.ReqPlayerExtensionCountlessReward();
  },
  ReqPlayerExtensionCountlessReward: function ReqPlayerExtensionCountlessReward() {
    var _this = this;

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessReward', {}, function (route, msg) {
      _this.TaskData = msg;
      var str = _this.TaskData.recharge == 0 ? "\u60A8\u7684\u4E0B\u7EA7\u65E0\u6761\u4EF6\u6210\u4E3A\u56E2\u961F\u6709\u6548\u6210\u5458" : "\u5B58\u6B3E\u91D1\u989D\u8FBE\u5230 <color=#f4c404>".concat(_this.getFloat(_this.TaskData.recharge), "</color> \u5143\uFF0C\u6253\u7801\u91CF\u8FBE\u5230 <color=#f4c404>").concat(_this.getFloat(_this.TaskData.bet), "</color> \u5143");
      _this.Lab_condition.string = str;
      _this.effectivemember.string = _this.TaskData.effective_number;
      _this.achiveData.string = "\u4EE5\u4E0A\u5956\u52B1\uFF0C\u53EA\u9700\u8981\u6253\u7801\u91CF\u8FBE\u5230".concat(_this.TaskData.audit, "\u500D\u5373\u53EF\u63D0\u73B0");

      _this.setTable(msg.list);

      console.log("这是任务列表的消息", msg);
    });
  },
  ReqPlayerExtensionCountlessRewardApply: function ReqPlayerExtensionCountlessRewardApply(id) {},
  setTable: function setTable(data) {
    for (var i = 0; i < data.length; i++) {
      var effectiveItem = cc.instantiate(this.effectiveItem);
      effectiveItem.parent = this.content;
      effectiveItem.active = false;
      var strTip = "\u76F4\u5C5E\u4E0B\u7EA7\u6709\u6548\u6210\u5458\u8FBE <color=#f4c404>".concat(data[i].number, "</color> \u4EBA");
      effectiveItem.getChildByName("Lab_condition").getComponent(cc.RichText).string = strTip;
      var Count = 0;

      for (var j = i; j >= 0; j--) {
        Count += data[j].reward;
      }

      var strReward = "\u989D\u5916\u5956\u52B1 <color=#f4c404>".concat(this.getFloat(data[i].reward), "</color> \u5143(\u7D2F\u79EF <color=#f4c404>").concat(this.getFloat(Count), "</color> \u5143)");
      effectiveItem.getChildByName("Lab_reward").getComponent(cc.RichText).string = strReward;
      effectiveItem.getChildByName("Havereceived").active = data[i].state == 0;

      if (data[i].state == 2) {
        effectiveItem.getChildByName("needpeople").active = true;
        effectiveItem.getChildByName("needpeople").getComponent(cc.Label).string = "\u5DEE".concat(data[i].number - this.TaskData.effective_number, "\u4EBA");
      }

      effectiveItem.getChildByName("btn_received").active = data[i].state == 1;
      effectiveItem.getChildByName("bg").active = i % 2 == 1;
      effectiveItem.name = "".concat(i);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_received":
        this.btn_receivedCB(node);
        break;

      default:
        break;
    }
  },
  btn_receivedCB: function btn_receivedCB(node) {
    var _this2 = this;

    var id = this.TaskData.list[node.parent.name].id;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRewardApply', {
      id: id
    }, function (route, msg) {
      node.parent.getChildByName("Havereceived").active = true;
      node.active = false;
      var strTitle = glGame.tips.POPULARIZE.GETMEMBERPRIZE;
      glGame.panel.showAwardBox(strTitle, [{
        type: glGame.awardtype.COIN,
        value: _this2.getFloat(_this2.TaskData.list[node.parent.name].reward)
      }]);
      _this2.TaskData.list[node.parent.name].state = 3;

      _this2.isCloseRed();

      glGame.user.ReqRedDot();
      glGame.user.reqGetCoin();
    });
  },
  isCloseRed: function isCloseRed() {
    var data = this.TaskData.list;

    for (var i = 0; i < data.length; i++) {
      if (data[i].state == 1) {
        return;
      }
    }

    glGame.emitter.emit("activeRedclose");
  },
  initUI: function initUI(data) {
    console.log("这是本条数据的显示", data);
  }
});

cc._RF.pop();
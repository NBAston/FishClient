"use strict";
cc._RF.push(module, '34dc1/7F6ZCrba4dMu4/NxL', 'waterrecord');
// modules/plaza/script/prefab/backWater/waterrecord.js

"use strict";

/**
 * 返水记录
 */
var status = {
  0: '定时返水',
  1: '实时返水'
};
glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    recorditem: cc.Node,
    noitem: cc.Node,
    today_bet: cc.Label,
    //未返水有效投注
    today_back: cc.Label,
    //今日预计返水
    Lab_CurPage: cc.Label,
    Lab_totalPage: cc.Label
  },
  onLoad: function onLoad() {
    this.registerEvent();
    var userPumpRecord = glGame.user.get("userPumpRecord");
    this.gameRecord = userPumpRecord;
    this.today_bet.string = "".concat(this.cutFloat(this.gameRecord.betCoin));
    this.today_back.string = "".concat(this.cutFloat(this.gameRecord.rebateCoin));
    this.page = 1;
    this.Lab_CurPage.string = this.page;
    this.pageSize = 7;
    this.pageTotal = 1;
    this.record = []; //  蓝 绿 红 黄 

    this.stateColor = [cc.color(102, 144, 204), cc.color(0, 255, 24), cc.color(244, 20, 36), cc.color(187, 151, 4)];
    glGame.user.ReqRebateRecordList(this.page, this.pageSize);
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateReqRebateRecordList", this.updateReqRebateRecordList, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateReqRebateRecordList", this);
  },
  updateReqRebateRecordList: function updateReqRebateRecordList(recordData) {
    this.record = recordData.data;
    this.pageTotal = recordData.totalPage;
    this.Lab_totalPage.string = recordData.totalPage;
    this.initUI();
    this.noitem.active = this.record.length == 0;
  },
  initUI: function initUI() {
    var _this = this;

    this.unscheduleAllCallbacks();
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.Lab_CurPage.string = this.page;
    var len = this.record.length;
    this.node.getChildByName("pagelayout").active = len > 0;
    this.node.getChildByName("noThink").active = len == 0;
    this.node.getChildByName("explain").active = len != 0;
    this.node.getChildByName("btn_pageup").active = len != 0;
    this.node.getChildByName("btn_pagedown").active = len != 0;
    var i = 0;
    this.schedule(function () {
      if (!_this.record[i]) {
        return;
      }

      var node = cc.instantiate(_this.recorditem);
      node.parent = _this.content;
      node.active = true;
      var timeStamp = new Date(_this.record[i].createTime * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "-").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "-").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += " ";
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      node.getChildByName("time").getComponent(cc.Label).string = strTime;
      node.getChildByName("type").getComponent(cc.Label).string = status[_this.record[i].receiveType - 1];
      node.getChildByName("betcoin").getComponent(cc.Label).string = _this.cutFloat(_this.record[i].allBetting);
      node.getChildByName("coin").getComponent(cc.Label).string = _this.cutFloat(_this.record[i].number);
      glGame.panel.settingTableLabelColor(node.getChildByName("coin"));
      node.getChildByName("status").getComponent(cc.Label).string = _this.record[i].stateDes; // 0，未领取；1，已领取。2，审核中。3，已拒绝。12，过期作废

      var color = _this.stateColor[0];
      var state = _this.record[i].state;

      switch (state) {
        case 0:
        case 1:
        case 4:
          // 成功
          color = _this.stateColor[1];
          break;

        case 2:
        case 3:
          // 处理中
          color = _this.stateColor[0];
          break;

        case 5:
        case 6:
        case 12:
          // 失败
          color = _this.stateColor[2];
          break;

        case 11:
          // 
          color = _this.stateColor[3];
          break;
      }

      node.getChildByName("status").color = color;
      node.getChildByName("bg").active = i % 2 == 1;
      i++;
    }, 0.08, len - 1, 0.3);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_pageup":
        this.pageup_click();
        break;

      case "btn_pagedown":
        this.pagedown_click();
        break;

      default:
        break;
    }
  },
  pageup_click: function pageup_click() {
    if (this.page <= 1) return;
    this.page--;
    glGame.user.ReqRebateRecordList(this.page, this.pageSize);
  },
  pagedown_click: function pagedown_click() {
    if (this.page >= this.pageTotal) return;
    this.page++;
    glGame.user.ReqRebateRecordList(this.page, this.pageSize);
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toFixed(2).toString();
  }
});

cc._RF.pop();
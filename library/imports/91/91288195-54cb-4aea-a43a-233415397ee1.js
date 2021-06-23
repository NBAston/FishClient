"use strict";
cc._RF.push(module, '91288GVVMtK6qQ6IzQVOX7h', 'diamondRecord');
// modules/plaza/script/prefab/room/diamondRecord.js

"use strict";

glGame.baseclass.extend({
  properties: {
    norecord: cc.Node,
    content: cc.Node,
    item: cc.Node,
    labPage: cc.Label
  },
  onLoad: function onLoad() {
    this.PageIndex = 1;
    this.pageCount = 1;
    this.recordList = {};
    this.registerEvent();
    this.reqDiamondTransactionRecord();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  lastPage_cb: function lastPage_cb() {
    if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！");
    this.PageIndex--;
    this.reqDiamondTransactionRecord();
  },
  nextPage_cb: function nextPage_cb() {
    if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.PageIndex++;
    this.reqDiamondTransactionRecord();
  },
  reqDiamondTransactionRecord: function reqDiamondTransactionRecord() {
    var _this = this;

    var msg = {};
    msg.page = this.PageIndex;
    msg.pageSize = 8;
    console.log(this.recordList, "this.recordList");

    if (this.recordList[this.PageIndex]) {
      this.initRecordUI(this.recordList[this.PageIndex]);
    } else {
      glGame.gameNet.send_msg('http.ReqDiamondTransactionRecord', msg, function (route, data) {
        var result = data.result;
        _this.pageCount = result.totalPage;
        _this.recordList ? null : _this.recordList = {};
        _this.recordList[_this.PageIndex] = result.data;

        _this.initRecordUI(result.data);
      });
    }
  },
  //渲染牌局记录
  initRecordUI: function initRecordUI(list) {
    this.content.removeAllChildren(); // if (list.length == 0) {
    //     this.labPage.string = '第0/0页';
    //     return;
    // }

    var count = list.length;

    if (count == 0) {
      this.norecord.active = true;
      return;
    }

    this.hiadShowNode(count > 0);
    this.labPage.string = "\u7B2C".concat(this.PageIndex, "/").concat(this.pageCount, "\u9875");

    for (var i = 0; i < list.length; i++) {
      var node = cc.instantiate(this.item);
      node.getChildByName("bg").active = i % 2 != 0;
      node.parent = this.content;
      node.active = true;
      var timeStamp = new Date(list[i].createTime * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      node.getChildByName("time").getComponent(cc.Label).string = strTime;
      node.getChildByName("type").getComponent(cc.Label).string = list[i].typeDes;
      var diamondNum = 0;
      diamondNum += list[i].diamondIncome;
      diamondNum -= list[i].diamondExpenses;
      node.getChildByName("diamond").getComponent(cc.Label).string = this.getFixNumber(diamondNum);
      node.getChildByName("diamond").color = diamondNum > 0 ? cc.color(0x66, 0x90, 0xcc) : cc.color(0xf4, 0xc4, 0x04);
    }
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  hiadShowNode: function hiadShowNode(isBool) {
    this.node.getChildByName("btn_lastPage").active = isBool;
    this.node.getChildByName("btn_nextPage").active = isBool;
    this.node.getChildByName("pageIndex").active = isBool;
    this.node.getChildByName("downtips").active = isBool;
  }
});

cc._RF.pop();
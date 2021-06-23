"use strict";
cc._RF.push(module, 'c07e0tLfa1D14yc7WXtX3Jd', 'historybrokerage');
// modules/plaza/script/prefab/popularize/historybrokerage.js

"use strict";

glGame.baseclass.extend({
  properties: {
    histroyCommission: cc.Prefab,
    norecord: cc.Node,
    //noneLab
    infoItem: cc.Node,
    content: cc.Node,
    Lab_CurPage: cc.Label,
    Lab_totalPage: cc.Label,
    history_direct_achievement: cc.Label,
    history_achievement: cc.Label,
    history_commission: cc.Label,
    kuang: cc.Node
  },
  onLoad: function onLoad() {
    this.page = 1;
    this.Lab_CurPage.string = this.page;
    this.date = "";
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;

      case "btn_pageup":
        this.pageup_CB();
        break;

      case "btn_pagedown":
        this.pagedown_CB();
        break;

      case "btn_detail":
        this.btn_detailCB(node);
        break;
    }
  },
  ReqPlayerExtensionCountlessRecord: function ReqPlayerExtensionCountlessRecord() {
    var _this = this;

    var page = this.page,
        date = this.date;
    this.Lab_CurPage.string = this.page;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecord', {
      page: page,
      date: date,
      page_size: 8
    }, function (route, msg) {
      _this.recordData = msg;
      _this.Lab_CurPage.string = page;
      _this.Lab_totalPage.string = _this.recordData.page_total == 0 ? 1 : _this.recordData.page_total;

      _this.setTable(_this.recordData.list);
    });
  },
  initUI: function initUI(data) {
    this.recordData = data;
    this.history_direct_achievement.string = this.getFloat(this.recordData.history_direct_achievement);
    this.history_achievement.string = this.getFloat(this.recordData.history_achievement);
    this.history_commission.string = this.getFloat(this.recordData.history_commission);
    this.totalPage = this.recordData.page_total;
    this.Lab_totalPage.string = this.recordData.page_total == 0 ? 1 : this.recordData.page_total;
    this.setTable(this.recordData.list);
  },
  setTable: function setTable(data) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var count = data.length;

    if (count == 0) {
      this.norecord.active = true;
      return;
    }

    this.hiadShowNode(count > 0);

    for (var i = 0; i < count; i++) {
      var infoItem = cc.instantiate(this.infoItem);
      infoItem.parent = this.content;
      infoItem.active = false;
      infoItem.getChildByName("bg").active = i % 2 == 1;
      infoItem.getChildByName("time").getComponent(cc.Label).string = data[i].date;
      infoItem.getChildByName("Directachieve").getComponent(cc.Label).string = this.getFloat(data[i].direct_achievement); //直推业绩

      var DirectCommission = infoItem.getChildByName("DirectCommission");
      DirectCommission.getComponent(cc.Label).string = this.getFloat(data[i].direct_commission); //直推佣金

      glGame.panel.settingTableLabelColor(DirectCommission);
      infoItem.getChildByName("teamachieve").getComponent(cc.Label).string = this.getFloat(data[i].achievement); //团队业绩

      var teamDiffachieve = infoItem.getChildByName("teamDiffachieve");
      teamDiffachieve.getComponent(cc.Label).string = this.getFloat(data[i].sub_commission); //级差佣金

      glGame.panel.settingTableLabelColor(teamDiffachieve);
      var totalCommission = infoItem.getChildByName("totalCommission");
      totalCommission.getComponent(cc.Label).string = this.getFloat(data[i].direct_commission + data[i].sub_commission);
      glGame.panel.settingTableLabelColor(totalCommission);
      infoItem.name = "".concat(data[i].date);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  hiadShowNode: function hiadShowNode(isBool) {
    this.node.getChildByName("btn_pageup").active = isBool;
    this.node.getChildByName("pagelayout").active = isBool;
    this.node.getChildByName("btn_pagedown").active = isBool;
    this.node.getChildByName("explain").active = isBool;
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  btn_detailCB: function btn_detailCB(node) {
    var _this2 = this;

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecordDetail', {
      page: 1,
      date: node.parent.name,
      page_size: 8
    }, function (route, msg) {
      _this2.histroyCommissiondata = msg;
      var histroyCommission = glGame.panel.showChildPanel(_this2.histroyCommission, _this2.node.parent.parent);
      var script = histroyCommission.getComponent("histroyCommission");
      script.initUI(_this2.histroyCommissiondata, node.parent.name);
    });
  },
  pageup_CB: function pageup_CB() {
    this.page--;

    if (this.page < 1) {
      this.page = 1;
      return;
    }

    this.ReqPlayerExtensionCountlessRecord();
  },
  pagedown_CB: function pagedown_CB() {
    this.page++;

    if (this.page > Number(this.Lab_totalPage.string)) {
      this.page = Number(this.Lab_totalPage.string);
      return;
    }

    this.ReqPlayerExtensionCountlessRecord();
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
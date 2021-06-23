"use strict";
cc._RF.push(module, '58617Da2iZJrI2JKWoU+/Xx', 'subordinate');
// modules/plaza/script/prefab/popularize/subordinate.js

"use strict";

glGame.baseclass.extend({
  properties: {
    norecord: cc.Node,
    //noneLab
    infoItem: cc.Node,
    content: cc.Node,
    Lab_CurPage: cc.Label,
    Lab_totalPage: cc.Label,
    //up
    sub_number: cc.Label,
    sub_effective_number: cc.Label,
    team_number: cc.Label,
    team_effective_number: cc.Label
  },
  onLoad: function onLoad() {
    this.page = 1;
    this.Lab_CurPage.string = this.page;
    this.recordReqData = {
      id: "",
      nickname: "",
      date: ""
    };
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
    }
  },
  ReqPlayerExtensionCountlessMember: function ReqPlayerExtensionCountlessMember() {
    var _this = this;

    var page = this.page,
        id = this.recordReqData.id,
        nickname = this.recordReqData.nickname,
        date = this.recordReqData.date;
    this.Lab_CurPage.string = this.page;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessMember', {
      page: page,
      id: id,
      nickname: nickname,
      date: date,
      page_size: 8
    }, function (route, msg) {
      _this.recordData = msg;
      _this.Lab_totalPage.string = _this.recordData.page_total == 0 ? 1 : _this.recordData.page_total;

      _this.setTable(_this.recordData.list);
    });
  },
  initUI: function initUI(data) {
    this.recordData = data;
    this.sub_number.string = this.recordData.sub_number;
    this.sub_effective_number.string = "(".concat(this.recordData.sub_effective_number, ")");
    this.team_number.string = this.recordData.team_sub_number;
    this.team_effective_number.string = "(".concat(this.recordData.effective_number, ")"); //this.history_commission.string = this.getFloat(this.recordData.history_commission);

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
      infoItem.getChildByName("memberID").getComponent(cc.Label).string = data[i].logicid;
      infoItem.getChildByName("name").getComponent(cc.Label).string = data[i].nickname;
      infoItem.getChildByName("isTrue").getChildByName(data[i].ag_effective == 1 ? "img_gou" : "img_cha").active = true;
      infoItem.getChildByName("trueMember").getComponent(cc.Label).string = data[i].effective_number; //团队有效成员

      var histroytotalcommission = data[i].history_contribute_sub_commission + data[i].history_contribute_bet_commission;
      var m_histroytotalcommission = infoItem.getChildByName("histroytotalcommission");
      m_histroytotalcommission.getComponent(cc.Label).string = this.getFloat(histroytotalcommission); //总佣金

      glGame.panel.settingTableLabelColor(m_histroytotalcommission);
      infoItem.getChildByName("loginTime").getComponent(cc.Label).string = data[i].offline_time; //离线时间
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  hiadShowNode: function hiadShowNode(isBool) {
    this.node.getChildByName("btn_pageup").active = isBool;
    this.node.getChildByName("pagelayout").active = isBool;
    this.node.getChildByName("btn_pagedown").active = isBool; // this.node.getChildByName("explain").active = isBool;
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  pageup_CB: function pageup_CB() {
    this.page--;

    if (this.page < 1) {
      this.page = 1;
      return;
    }

    this.ReqPlayerExtensionCountlessMember();
  },
  pagedown_CB: function pagedown_CB() {
    this.page++;

    if (this.page > Number(this.Lab_totalPage.string)) {
      this.page = Number(this.Lab_totalPage.string);
      return;
    }

    this.ReqPlayerExtensionCountlessMember();
  },
  timestampToTime: function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return Y + M + D + h + m;
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
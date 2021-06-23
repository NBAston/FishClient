"use strict";
cc._RF.push(module, '189ca8BQXdACIz1oq2eORaz', 'userinfoaccount');
// modules/plaza/script/prefab/userInfo/userinfoaccount.js

"use strict";

glGame.baseclass.extend({
  properties: {
    accountContent: cc.Node,
    accountItem: cc.Node,
    typeContent: cc.Node,
    typeItem: cc.Node,
    typeScr: cc.Node,
    mask: cc.Node,
    type_lab: cc.Label,
    noitem: cc.Node,
    lab_pageIndex: cc.Label,
    safebox_lab: cc.Label,
    coin_lab: cc.Label,
    infonode: cc.Node
  },
  onLoad: function onLoad() {
    this.endTime = null;
    this.startTime = null;
    this.type = null;
    this.is_first = true;
    this.PageIndex = 1;
    this.summary = {};
    this.registerEvent();
    this.initCoin();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.initCoin, this);
    glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("userinfo_switchFace", this);
  },
  closeDown: function closeDown() {
    this.typeScr.active = false;
  },
  start: function start() {
    this.reqCapitalFlow(this.type, this.startTime, this.endTime, this.is_first);
  },
  initCoin: function initCoin() {
    this.safebox_lab.string = this.cutFloat(glGame.user.get("bank_coin"));
    this.coin_lab.string = this.cutFloat(glGame.user.get("coin"));
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_selectType":
        this.selectType_cb();
        break;

      case "mask":
        this.mask_cb();
        break;

      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      default:
        if (name.indexOf("itemTime") > -1) return this.click_itemTime(name);
        if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
        break;
    }
  },
  lastPage_cb: function lastPage_cb() {
    if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！");
    this.PageIndex--;
    this.reqCapitalFlow();
  },
  nextPage_cb: function nextPage_cb() {
    if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.PageIndex++;
    this.reqCapitalFlow();
  },
  click_typeItem: function click_typeItem(name) {
    this.PageIndex = 1;
    var string = name.substring(8);
    this.type_lab.string = Number(string) == 0 ? "全部" : this.Alltype[Number(string)];
    this.typeScr.active = this.mask.active = false;
    this.type = Number(string) == 0 ? null : Number(string); //全部游戏不传这个字段就OK

    this.reqCapitalFlow(this.type);
  },
  initTypeUI: function initTypeUI(data) {
    var typeItem = cc.instantiate(this.typeItem);
    typeItem.name = "typeItem".concat(0);
    typeItem.getChildByName("label").getComponent(cc.Label).string = "全部";
    typeItem.parent = this.typeContent;
    typeItem.active = true;

    for (var key in data) {
      typeItem = cc.instantiate(this.typeItem);
      typeItem.name = "typeItem".concat(key);
      typeItem.getChildByName("label").getComponent(cc.Label).string = data[key];
      typeItem.parent = this.typeContent;
      typeItem.active = true;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    } //需求：需要直接展示所有的类型
    // let length = Object.keys(data).length, height = typeItem.height;
    // this.typeContent.parent.parent.height = height * (length + 1);
    // this.typeContent.parent.height = height * (length + 1);

  },
  initRecordUI: function initRecordUI(list) {
    this.accountContent.removeAllChildren();

    if (list.length == 0) {
      this.lab_pageIndex.string = '第0/0页';
      this.noitem.active = true;
      this.infonode.active = false;
      return;
    }

    this.noitem.active = false;
    this.infonode.active = true;
    this.lab_pageIndex.string = "\u7B2C".concat(this.PageIndex, "/").concat(this.pageCount, "\u9875");

    for (var i = 0; i < list.length; i++) {
      var item = cc.instantiate(this.accountItem);
      item.parent = this.accountContent;
      item.getChildByName("bg").active = i % 2 == 0;
      var time = item.getChildByName("time");
      var timeStamp = new Date(list[i].rechargeTimeStamp * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      time.getComponent(cc.Label).string = strTime;
      item.getChildByName("type").getComponent(cc.Label).string = list[i].type;
      item.getChildByName("coin").getComponent(cc.Label).string = list[i].coin < 0 ? this.cutFloat(list[i].coin) : "+" + this.cutFloat(list[i].coin);
      glGame.panel.settingTableLabelColor(item.getChildByName("coin"));
      item.active = false;
    }

    glGame.panel.showEffectNode(this, this.accountContent, 0.02, true);
  },
  selectType_cb: function selectType_cb() {
    this.typeScr.active = !this.typeScr.active;
    if (this.typeScr.active) this.mask.active = true;
  },
  mask_cb: function mask_cb() {
    this.typeScr.active = this.mask.active = false;
  },
  reqCapitalFlow: function reqCapitalFlow(type, start, end, is_first) {
    var _this = this;

    var msg = {};
    if (type || this.type) msg.type = type ? type : this.type;
    if (start || this.startTime) msg.start = start ? start : this.startTime;
    if (end || this.endTime) msg.end = end ? end : this.endTime;
    if (is_first || this.is_first) msg.is_first = is_first ? is_first : this.is_first;
    msg.page = this.PageIndex;
    msg.pagesize = 6;
    glGame.gameNet.send_msg('http.reqCapitalFlow', msg, function (route, data) {
      var result = data.result;

      if (result.current_page == 1) {
        _this.summary = result.summary;
      }

      _this.pageCount = result.total_page;

      if (is_first) {
        _this.is_first = null;
        _this.Alltype = result.summary.type;
        if (_this.Alltype) _this.initTypeUI(_this.Alltype);
      }

      _this.initRecordUI(result.list);
    });
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
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
  }
});

cc._RF.pop();
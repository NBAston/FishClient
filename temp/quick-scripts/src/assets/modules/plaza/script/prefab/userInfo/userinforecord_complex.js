"use strict";
cc._RF.push(module, '8108f5vbjNFqqxexw7zosa8', 'userinforecord_complex');
// modules/plaza/script/prefab/userInfo/userinforecord_complex.js

"use strict";

glGame.baseclass.extend({
  properties: {
    gameView: cc.Node,
    lab_game: cc.Label,
    gameContent: cc.Node,
    typeView: cc.Node,
    lab_type: cc.Label,
    typeContent: cc.Node,
    platView: cc.Node,
    lab_plat: cc.Label,
    platContent: cc.Node,
    content: cc.Node,
    wordItem: cc.Node,
    infoItem: cc.Node,
    pageInfo: cc.Label,
    norecord: cc.Node,
    infonode: cc.Node
  },
  onLoad: function onLoad() {
    this.pageIndex = 1;
    this.typeIndex = 0;
    this.platIndex = 0;
    this.gameIndex = 0;
    this.pageCount = 0;
    this.typeId = 0;
    this.platId = 0;
    this.gameId = 0; // this.ComplexTypesData = null // 类型数据
    // this.ComplexPlatsData = null // 平台数据
    // this.ComplexGamesData = null // 游戏数据

    this.registerEvent();
    this.recordPageData = {}; //记录

    this.sendReqBetFlow();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_lastPage":
        this.lastPage_cb();
        break;

      case "btn_nextPage":
        this.nextPage_cb();
        break;

      case "btn_type":
        this.btn_type_cb();
        break;

      case "btn_plat":
        this.btn_plat_cb();
        break;

      case "btn_game":
        this.btn_game_cb();
        break;

      case "gameView":
        this.gameView.active = false;
        break;

      case "typeView":
        this.typeView.active = false;
        break;

      case "platView":
        this.platView.active = false;
        break;

      default:
        if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
        if (name.indexOf("platItem") > -1) return this.click_platItem(name);
        if (name.indexOf("gameItem") > -1) return this.click_gameItem(name);
        break;
    }
  },
  closeDown: function closeDown() {
    this.gameView.active = false;
    this.typeView.active = false;
    this.platView.active = false;
  },
  btn_type_cb: function btn_type_cb() {
    this.sendReqComplexTypes();
  },
  btn_plat_cb: function btn_plat_cb() {
    //this.initPlats();
    this.sendReqComplexPlats();
  },
  btn_game_cb: function btn_game_cb() {
    this.sendReqComplexGames();
  },
  //获取综合版类型数据
  sendReqComplexTypes: function sendReqComplexTypes() {
    var _this = this;

    if (this.ComplexTypesData) return this.initComplexTypes();
    glGame.gameNet.send_msg('http.ReqComplexTypes', null, function (route, data) {
      _this.ComplexTypesData = data;

      _this.initComplexTypes();
    });
  },
  //获取综合版平台数据
  sendReqComplexPlats: function sendReqComplexPlats() {
    var _this2 = this;

    if (this.typeId == 0) return glGame.panel.showTip("请先选择类型");
    var id = this.ComplexTypesData[this.typeIndex].id;
    console.log("这是发送的id", this.ComplexTypesData, this.typeIndex, id);
    glGame.gameNet.send_msg('http.ReqComplexPlats', {
      type: id
    }, function (route, data) {
      _this2.ComplexPlatsData = data;

      _this2.initPlats();
    });
  },
  //获取综合版游戏数据
  sendReqComplexGames: function sendReqComplexGames() {
    var _this3 = this;

    if (this.platId == 0) return glGame.panel.showTip("请先选择平台");
    var msg = {
      model: 2,
      typeId: this.typeId,
      platId: this.platId
    };
    glGame.gameNet.send_msg('http.ReqComplexGames', msg, function (route, data) {
      _this3.ComplexGamesData = data;

      _this3.initGames();
    });
  },
  sendReqBetFlow: function sendReqBetFlow() {
    var _this4 = this;

    var msg = {
      model: 2,
      typeId: this.typeId,
      platId: this.platId,
      gameId: this.gameId,
      page: this.pageIndex,
      pageSize: 6
    };
    console.log("这是当前的消息", msg);

    if (this.recordPageData[msg.typeId] && this.recordPageData[msg.typeId][msg.platId] && this.recordPageData[msg.typeId][msg.platId][msg.gameId] && this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex]) {
      this.BetFlowData = this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex];
      var total_page = this.BetFlowData.result.total_page == 0 ? 1 : this.BetFlowData.result.total_page;
      this.pageCount = total_page;
      this.pageInfo.string = "\u7B2C".concat(this.pageIndex, "/").concat(total_page, "\u9875");
      this.initBetFlow();
      return;
    }

    console.log("这是发送的详情信息", msg);
    glGame.gameNet.send_msg('http.reqBetFlow', msg, function (route, data) {
      _this4.BetFlowData = data;
      var total_page = _this4.BetFlowData.result.total_page == 0 ? 1 : _this4.BetFlowData.result.total_page;
      _this4.pageInfo.string = "\u7B2C".concat(_this4.pageIndex, "/").concat(total_page, "\u9875");
      _this4.pageCount = total_page;
      _this4.recordPageData[msg.typeId] ? null : _this4.recordPageData[msg.typeId] = {};
      _this4.recordPageData[msg.typeId][msg.platId] ? null : _this4.recordPageData[msg.typeId][msg.platId] = {};
      _this4.recordPageData[msg.typeId][msg.platId][msg.gameId] ? null : _this4.recordPageData[msg.typeId][msg.platId][msg.gameId] = {};
      _this4.recordPageData[msg.typeId][msg.platId][msg.gameId][_this4.pageIndex] ? null : _this4.recordPageData[msg.typeId][msg.platId][msg.gameId][_this4.pageIndex] = {};
      _this4.recordPageData[msg.typeId][msg.platId][msg.gameId][_this4.pageIndex] = data;

      _this4.initBetFlow();
    });
  },
  //生成记录内容
  initBetFlow: function initBetFlow() {
    this.content.destroyAllChildren();
    var list = this.BetFlowData.result.list;

    if (list.length == 0) {
      this.norecord.active = true;
      this.infonode.active = false;
      return;
    }

    this.norecord.active = false;
    this.infonode.active = true;

    for (var i = 0; i < list.length; i++) {
      var infoItem = cc.instantiate(this.infoItem);
      infoItem.parent = this.content;
      infoItem.getChildByName("bg").active = i % 2 == 0;
      var timeStamp = new Date(list[i].settlementTime);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      infoItem.getChildByName("lab_time").getComponent(cc.Label).string = strTime;
      infoItem.getChildByName("lab_type").getComponent(cc.Label).string = list[i].typeName;
      infoItem.getChildByName("lab_plat").getComponent(cc.Label).string = list[i].platName;
      infoItem.getChildByName("lab_gamename").getComponent(cc.Label).string = list[i].gameName;
      infoItem.getChildByName("lab_playNumber").getComponent(cc.Label).string = this.cutFloat(list[i].betAmount);
      infoItem.getChildByName("lab_rewarCoin").getComponent(cc.Label).string = this.cutFloat(list[i].netAmount);
      glGame.panel.settingTableLabelColor(infoItem.getChildByName("lab_rewarCoin"));
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  //生成游戏分类内容
  initComplexTypes: function initComplexTypes() {
    this.typeContent.destroyAllChildren();
    var wordItem = cc.instantiate(this.wordItem);
    wordItem.name = "typeItemAll";
    wordItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    wordItem.parent = this.typeContent;
    wordItem.active = true;

    for (var i = 0; i < this.ComplexTypesData.length; i++) {
      var _wordItem = cc.instantiate(this.wordItem);

      _wordItem.parent = this.typeContent;
      _wordItem.active = true;
      _wordItem.name = "typeItem".concat(i);
      _wordItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexTypesData[i].name;

      if (i == this.ComplexTypesData.length - 1) {
        _wordItem.getChildByName("img_xialafengexian").active = false;
      }
    }

    this.typeView.getChildByName("typeScrollView").height = (this.ComplexTypesData.length + 1) * this.wordItem.height + 32;
    this.typeView.active = true;
  },
  //生成平台内容
  initPlats: function initPlats() {
    this.platContent.destroyAllChildren();
    var wordItem = cc.instantiate(this.wordItem);
    wordItem.name = "platItemAll";
    wordItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    wordItem.parent = this.platContent;
    wordItem.active = true;

    for (var i = 0; i < this.ComplexPlatsData.length; i++) {
      var _wordItem2 = cc.instantiate(this.wordItem);

      _wordItem2.parent = this.platContent;
      _wordItem2.active = true;
      _wordItem2.name = "platItem".concat(i);
      _wordItem2.getChildByName("label").getComponent(cc.Label).string = this.ComplexPlatsData[i].platName;

      if (i == this.ComplexPlatsData.length - 1) {
        _wordItem2.getChildByName("img_xialafengexian").active = false;
      }
    }

    this.platView.getChildByName("platScrollView").height = (this.ComplexPlatsData.length + 1) * this.wordItem.height + 32;
    this.platView.active = true;
  },
  //生成游戏内容
  initGames: function initGames() {
    this.gameContent.destroyAllChildren();
    var wordItem = cc.instantiate(this.wordItem);
    wordItem.name = "gameItemAll";
    wordItem.getChildByName("label").getComponent(cc.Label).string = '全部';
    wordItem.parent = this.gameContent;
    wordItem.active = true;

    if (this.ComplexGamesData.length == 0) {
      wordItem.getChildByName("img_xialafengexian").active = false;
    }

    for (var i = 0; i < this.ComplexGamesData.length; i++) {
      var _wordItem3 = cc.instantiate(this.wordItem);

      _wordItem3.parent = this.gameContent;
      _wordItem3.active = true;
      _wordItem3.name = "gameItem".concat(i);
      _wordItem3.getChildByName("label").getComponent(cc.Label).string = this.ComplexGamesData[i].gameName;

      if (i == this.ComplexGamesData.length - 1) {
        _wordItem3.getChildByName("img_xialafengexian").active = false;
      }
    }

    this.gameView.getChildByName("gameScrollView").height = this.ComplexGamesData.length + 1 <= 10 ? (this.ComplexGamesData.length + 1) * this.wordItem.height + 32 : 10 * this.wordItem.height + 32;
    this.gameView.active = true;
  },
  lastPage_cb: function lastPage_cb() {
    if (this.pageIndex <= 1) return glGame.panel.showTip("已经是第一页了！");
    this.pageIndex--;
    this.sendReqBetFlow(); //请求协议
  },
  nextPage_cb: function nextPage_cb() {
    if (this.pageIndex == this.pageCount || this.pageCount == 0) return glGame.panel.showTip("已经是最后一页了！");
    this.pageIndex++;
    this.sendReqBetFlow(); //请求协议
  },
  click_typeItem: function click_typeItem(name) {
    var string = name.substring(8);
    this.typeView.active = false;
    this.typeIndex = Number(string);
    this.typeId = this.ComplexTypesData[this.typeIndex] ? this.ComplexTypesData[this.typeIndex].id : 0;
    this.lab_type.string = string == "All" ? "全部" : this.ComplexTypesData[this.typeIndex].name;
    this.lab_plat.string = "全部";
    this.lab_game.string = "全部";
    this.platId = 0;
    this.gameId = 0;
    this.platIndex = 0;
    this.pageIndex = 1;
    this.sendReqBetFlow();
  },
  click_platItem: function click_platItem(name) {
    var string = name.substring(8);
    this.platView.active = false;
    this.platIndex = Number(string);
    this.platId = this.ComplexPlatsData[this.platIndex] ? this.ComplexPlatsData[this.platIndex].id : 0;
    this.lab_plat.string = string == "All" ? "全部" : this.ComplexPlatsData[this.platIndex].platName;
    this.lab_game.string = "全部";
    this.pageIndex = 1;
    this.gameId = 0;
    console.log("点击了列表click_platItem", string);
    this.sendReqBetFlow();
  },
  click_gameItem: function click_gameItem(name) {
    var string = name.substring(8);
    this.gameView.active = false;
    this.gameIndex = Number(string);
    this.lab_game.string = string == "All" ? "全部" : this.ComplexGamesData[this.gameIndex].gameName;
    this.gameId = this.ComplexGamesData[this.gameIndex] ? this.ComplexGamesData[this.gameIndex].id : 0;
    console.log("点击了列表click_gameItem", string);
    this.pageIndex = 1;
    this.sendReqBetFlow();
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("userinfo_switchFace", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
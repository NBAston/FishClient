"use strict";
cc._RF.push(module, 'ad000y8nyxPm43avH3x/Qlj', 'slwhentry');
// modules/plaza/script/prefab/enterRoom/slwhentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    prefab_record: cc.Prefab,
    prefab_gameRule: cc.Prefab,
    slwhselect: cc.Node,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.updateuserInfo();
    this.registerEvent();
    this.reqEnterArea();
    this.nodeInfo = {};
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.unregisterEvent();
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.SLWH;
    glGame.readyroom.reqEnterArea(glGame.scenetag.SLWH);
  },
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
    glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
    glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("onGameInfolist_area", this);
    glGame.emitter.off("onRoomInfo_area", this);
    glGame.emitter.off("onDeleteRoom_area", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_back":
        this.click_back();
        break;

      case "btn_help":
        this.click_help();
        break;

      case "btn_record":
        this.click_record();
        break;

      case "mycoinInfo":
        this.click_addgold();
        break;

      case "headbg":
        this.click_userinfo();
        break;

      case "btn_chongzhi":
        this.click_addgold();
        break;

      case "btn_start":
        this.enterroom(name, node);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  enterroom: function enterroom(name, node) {
    var _this = this;

    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
      glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return;
    }

    glGame.panel.showFieldSelectionJuHua();
    glGame.room.reqMyGameState(this.gameID, node.parent.name).then(function () {
      glGame.readyroom.enterHundredsRoomOther(_this.gameID, node.parent.name);
    });
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin);
  },
  setGameId: function setGameId(gameid) {
    this.gameid = gameid;
  },
  updateBgInfo: function updateBgInfo() {},
  click_userinfo: function click_userinfo() {
    glGame.panel.showPanelByName("userinfo");
  },
  click_addgold: function click_addgold() {
    glGame.panel.showShop(30);
  },
  click_back: function click_back() {
    glGame.readyroom.reqExitArea();
    this.remove();
  },
  click_help: function click_help() {
    var prefab_gameRule = glGame.panel.showPanel(this.prefab_gameRule);
    prefab_gameRule.zIndex = 30;
  },
  click_record: function click_record() {
    var prefab_record = glGame.panel.showPanel(this.prefab_record);
    prefab_record.zIndex = 30;
  },
  onGameInfolist: function onGameInfolist(msg) {
    this.gameInfoTest = glGame.readyroom.get("gameInfo");

    for (var key in this.gameInfoTest) {
      if (this.slwhselect.getChildByName("".concat(key))) {
        var content = this.slwhselect.getChildByName("".concat(key)).getChildByName("content");
        var lab_zhunru = content.getChildByName('lab_zhunru').getComponent(cc.Label);
        lab_zhunru.string = " " + this.cutFloat(this.gameInfoTest[key].Chips[0]);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {},
  onDeleteRoom: function onDeleteRoom(msg) {},
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.unregisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
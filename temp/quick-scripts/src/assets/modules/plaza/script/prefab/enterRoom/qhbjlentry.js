"use strict";
cc._RF.push(module, 'fb4c8L36aBKMbxJ/7koda04', 'qhbjlentry');
// modules/plaza/script/prefab/enterRoom/qhbjlentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    BGM: {
      type: cc.AudioClip,
      "default": null
    },
    goldCount: cc.Label,
    qhbjlselect: cc.Node,
    record: cc.Prefab,
    rule: cc.Prefab,
    fire_node: cc.Node,
    fireworks: cc.Node,
    launchPoint: cc.Node
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
    this.indexFire = 0;
    this.playFireworks();
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
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.unregisterEvent();
  },
  playFireworks: function playFireworks() {
    var _this = this;

    var time = Math.random() * 2;
    var indextemp = [1, 0, 3, 2];
    var index = indextemp[this.indexFire % 4];
    this.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
      _this.indexFire++;
      console.log("烟花发射111111");

      _this.emissionFire(index);

      _this.playFireworks();
    })));
  },
  emissionFire: function emissionFire(index) {
    var distance = [this.node.height / 3.5, this.node.height / 3.8, this.node.height / 3, this.node.height / 3.5];
    var aniList = ["bluefireworks", "redfireworks", "yellowfireworks", "bluefireworks"];
    var scaleList = [1.18, 1.78, 1.13, 1.3];
    var fire_node = cc.instantiate(this.fire_node);
    fire_node.parent = this.node;
    fire_node.position = this.launchPoint.children[index].position;
    fire_node.active = true;
    var fireworks = cc.instantiate(this.fireworks);
    fireworks.parent = this.node;
    fireworks.setScale(scaleList[index]);
    fire_node.runAction(cc.sequence(cc.moveBy(1, 0, distance[index]), cc.callFunc(function () {
      fire_node.opacity = 0;
      fireworks.position = fire_node.position;
      fireworks.active = true;
      fireworks.getComponent(cc.Animation).play("".concat(aniList[index]));
    }), cc.delayTime(1.2), cc.callFunc(function () {
      fire_node.destroy();
      fireworks.destroy();
    })));
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.QHBJL;
    glGame.readyroom.reqEnterArea(glGame.scenetag.QHBJL);
  },
  onGameInfolist: function onGameInfolist(msg) {
    //this.roomlist = glGame.readyroom.roomlist;
    this.gameInfoTest = glGame.readyroom.get("gameInfo");
    console.log("这是当前房间配置", this.gameInfoTest);

    for (var key in this.gameInfoTest) {
      if (this.qhbjlselect.getChildByName("".concat(key))) {
        var lab_chiplimit = this.qhbjlselect.getChildByName("".concat(key)).getChildByName('chiplimit').getChildByName('num').getComponent(cc.Label);
        var lab_chip = this.qhbjlselect.getChildByName("".concat(key)).getChildByName('chip').getChildByName('num').getComponent(cc.Label);
        lab_chiplimit.string = this.cutFloat(this.gameInfoTest[key].EntranceRestrictions);
        lab_chip.string = this.cutFloat(this.gameInfoTest[key].BaseChips);
      }
    }

    this.initAni(); // console.log("这是当前的房间配置",this.gameInfoTest);
    // for (let bettype in this.roomlist) {
    //     for (let roomid in this.roomlist[bettype]) {
    //         if (!this.qhbjlselect.children[bettype - 1]) break;
    //         let chiplimitNum = this.qhbjlselect.children[bettype - 1].getChildByName('chiplimit').getChildByName('num').getComponent(cc.Label);
    //         let chipNum = this.qhbjlselect.children[bettype - 1].getChildByName('chip').getChildByName('num').getComponent(cc.Label);
    //         chiplimitNum.string = this.cutFloat(this.gameInfoTest[bettype].BaseChips);
    //         chipNum.string = this.cutFloat(this.gameInfoTest[bettype].EntranceRestrictions);
    //         this.qhbjlselect.children[bettype - 1].name = roomid;
    //         this.nodeInfo[roomid] = {
    //             tag: this.roomlist[bettype][roomid].roomserverid,
    //             type: bettype
    //         }
    //         break;
    //     }
    // }
  },
  onRoomInfo: function onRoomInfo(msg) {},
  onDeleteRoom: function onDeleteRoom(msg) {},
  initAni: function initAni() {
    this.renwu_pos = [];

    for (var index = 0; index < this.qhbjlselect.childrenCount; index++) {
      var pos = this.qhbjlselect.children[index].getPosition();
      this.renwu_pos.push(pos);
      this.qhbjlselect.children[index].x = this.node.width / 2 + pos.x;
      this.qhbjlselect.children[index].active = true;
    }

    for (var i = 0; i < this.qhbjlselect.childrenCount; i++) {
      this.qhbjlselect.children[i].runAction(cc.sequence(cc.delayTime(i * 0.05), cc.moveTo(0.25, cc.v2(this.renwu_pos[i].x - 40, this.renwu_pos[i].y)), cc.moveTo(0.1, this.renwu_pos[i])));
    }
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
  //传房间id以及房间等级
  enterroom: function enterroom(name, node) {
    var _this2 = this;

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
      glGame.readyroom.enterHundredsRoomOther(_this2.gameID, node.parent.name);
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
    // glGame.panel.showNewGameRule(this.gameid, 30);
    var panel = glGame.panel.showPanel(this.rule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    // glGame.panel.showNewGameRecord(this.gameid, 30);
    var panel = glGame.panel.showPanel(this.record);
    panel.zIndex = 30;
  },
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
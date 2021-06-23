"use strict";
cc._RF.push(module, 'da06dssZ6hNXLPeirKOC6SF', 'hcpyentry');
// modules/plaza/script/prefab/enterRoom/hcpyentry.js

"use strict";

var _glGame$baseclass$ext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

glGame.baseclass.extend((_glGame$baseclass$ext = {
  properties: {
    hcpyRecord: cc.Prefab,
    hcpyRule: cc.Prefab,
    goldCount: cc.Label,
    hcpySelect: cc.Node,
    girl: cc.Node,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.roomType = 1;
    this.nodeInfo = {};
    this.updateuserInfo();
    this.playEnterAnimation();
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
    this.nodeInfo = {};
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.unregisterEvent();
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
  // 播放入场动画
  playEnterAnimation: function playEnterAnimation() {
    this.girl.getComponent(cc.Widget).updateAlignment();
    this.girl.x -= 200;
    this.girl.opacity = 0;
    var moveBy = cc.moveBy(0.2, cc.v2(200, 0));
    var fadeIn = cc.fadeIn(0.2);
    this.girl.runAction(cc.spawn(moveBy, fadeIn));
    this.girl.getComponent(cc.Widget).enabled = false;
  },
  onClick: function onClick(name, node) {
    var _this = this;

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

      case 'btn_enter':
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
        console.log("这是当前传送", this.gameID, node.parent.name);
        glGame.room.reqMyGameState(this.gameID, node.parent.name).then(function () {
          glGame.readyroom.enterHundredsRoomOther(_this.gameID, node.parent.name);
        });
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.HCPY;
    glGame.readyroom.reqEnterArea(glGame.scenetag.HCPY);
  },
  onGameInfolist: function onGameInfolist(msg) {
    this.gameInfoTest = glGame.readyroom.get("gameInfo");
    console.log("这是当前房间配置", this.gameInfoTest);

    for (var key in this.gameInfoTest) {
      if (this.hcpySelect.getChildByName("".concat(key))) {
        var lab_basescore = this.hcpySelect.getChildByName("".concat(key)).getChildByName('basescore').getComponent(cc.Label);
        var lab_chiplimit = this.hcpySelect.getChildByName("".concat(key)).getChildByName('chiplimit').getComponent(cc.Label);
        lab_basescore.string = "底注:   " + this.getFloat(this.gameInfoTest[key].Chips[0]);
        lab_chiplimit.string = "准入:   " + this.getFloat(this.gameInfoTest[key].EntranceRestrictions);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {},
  onDeleteRoom: function onDeleteRoom(msg) {},
  //桌面数据的显示
  getFloat: function getFloat(value) {
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
  updateBgInfo: function updateBgInfo() {
    this.goldCount.node.color = new cc.Color(229, 248, 255);
  },
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
    var panel = glGame.panel.showPanel(this.hcpyRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.hcpyRecord);
    panel.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  }
}, _defineProperty(_glGame$baseclass$ext, "getFloat", function getFloat(value) {
  return Number(value).div(100).toString();
}), _defineProperty(_glGame$baseclass$ext, "OnDestroy", function OnDestroy() {
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
  glGame.emitter.off("nodeRemove", this);
  glGame.emitter.off("updateUserData", this);
  this.unregisterEvent();
}), _glGame$baseclass$ext));

cc._RF.pop();
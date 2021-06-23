"use strict";
cc._RF.push(module, 'd549fmtIfZDpJ9Ew8kIlrRN', 'jszjhentry');
// modules/plaza/script/prefab/enterRoom/jszjhentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    selectNode: cc.Node,
    gameRule: cc.Prefab,
    gameRecord: cc.Prefab,
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
    this.updateuserInfo();
    this.playEnterAnimation();
  },
  // 播放入场动画
  playEnterAnimation: function playEnterAnimation() {
    for (var i = 1; i <= 4; i++) {
      var entryNode = this.selectNode.getChildByName("entry".concat(i));
      entryNode.opacity = 0;
      var originPos = entryNode.position;

      if (i % 2 == 1) {
        entryNode.x -= 300;
      } else {
        entryNode.x += 300;
      }

      var moveTo = cc.moveTo(0.3, originPos);
      var fadeIn = cc.fadeIn(0.1);
      moveTo.easing(cc.easeBackOut());
      entryNode.runAction(cc.spawn(moveTo, fadeIn));
    }
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
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("onGameConfig", this);
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.refreshUI();
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.JSZJH;
    glGame.readyroom.reqEnterArea(glGame.scenetag.JSZJH);
  },
  refreshUI: function refreshUI() {
    this.node.active = true;
    var gameConfig = this.gameConfig;

    for (var i = 1; i <= 3; i++) {
      var entryNode = this.selectNode.getChildByName("entry".concat(i + 1));
      entryNode.getChildByName("dizhu_num").getComponent(cc.Label).string = "\u5E95\u6CE8\uFF1A".concat(this.getFloat(gameConfig[i].BaseChips));
      entryNode.getChildByName("zhunru_num").getComponent(cc.Label).string = "\u51C6\u5165\uFF1A".concat(this.getFloat(gameConfig[i].EntranceRestrictions));
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

      case "entry1":
        this.enterGame(99);
        break;

      case "entry2":
        this.enterGame(1);
        break;

      case "entry3":
        this.enterGame(2);
        break;

      case "entry4":
        this.enterGame(3);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * 进入金币场房间
   * @param level 场次类型 1:普通房 2:贵宾房 3:富豪房 4:至尊房
   */
  enterGame: function enterGame(level) {
    var _this = this;

    glGame.room.reqMyGameState(this.gameID, level).then(function () {
      var gameID = _this.gameID;

      if (_this.gameConfig[level] == null) {
        glGame.panel.showMsgBox('提示', '该房间尚未开放，请尝试其他房间。');
        return;
      }

      if (glGame.user.isTourist()) {
        if (level != 99) {
          glGame.panel.showRegisteredGift(true);
          return;
        }
      }

      if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
        glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
          glGame.panel.showService();
        }, function () {}, "我知道了", "联系客服");
        return;
      }

      if (_this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        console.log("这是当前的房间限制", _this.gameConfig);
        var string = " <color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this.getFloat(_this.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua();

      _this.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      })));

      glGame.room.setGoldRoomInfo(gameID, level);
    });
  },

  /**
   * 检查玩家金币是否足够
   * @returns {boolean}
   */
  checkGold: function checkGold(coin, minCion) {
    if (parseInt(coin) < parseInt(minCion)) {
      glGame.panel.showDialog(glGame.i18n.t("USER.GOLDLACK.TITLE"), glGame.i18n.t("USER.GOLDLACK.CONTENT"), function () {
        glGame.panel.showPanelByName("shop");
      }, null);
      return false;
    }

    return true;
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.cutFloat(coin);
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
    var game_rule = glGame.panel.showPanel(this.gameRule);
    game_rule.zIndex = 30;
  },
  click_record: function click_record() {
    var game_record = glGame.panel.showPanel(this.gameRecord);
    game_record.zIndex = 30;
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
  }
});

cc._RF.pop();
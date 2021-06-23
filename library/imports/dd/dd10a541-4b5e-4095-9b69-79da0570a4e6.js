"use strict";
cc._RF.push(module, 'dd10aVBS15AlZtpedoFcKTm', 'nfishentry');
// modules/plaza/script/prefab/enterRoom/nfishentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    username: cc.Label,
    help_pre: cc.Prefab,
    record_pre: cc.Prefab,
    BGM: {
      //背景声音
      type: cc.AudioClip,
      "default": null
    },
    LOADING: cc.Prefab,
    level: {
      type: cc.Node,
      "default": []
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
    this.gameID = glGame.scenetag.FISH2;
    glGame.readyroom.reqEnterArea(glGame.scenetag.FISH2);
    this.registerEvent();
    this.updateuserInfo();
    this.startPlayMove();
    this.node.getChildByName("mask").active = false;
  },
  startPlayMove: function startPlayMove() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var game_logo = this.node.getChildByName("game_logo");
    game_logo.getComponent(cc.Widget).enabled = false;
    game_logo.scale = 0;
    game_logo.opacity = 0;
    game_logo.stopAllActions();
    var act = cc.spawn(cc.fadeTo(0.26, 255), cc.scaleTo(0.3, 1.3, 1.3));
    game_logo.runAction(cc.sequence(act, cc.callFunc(function () {
      game_logo.stopAllActions();
      game_logo.runAction(cc.sequence(cc.scaleTo(0.13, 1), cc.callFunc(function () {
        game_logo.getComponent(cc.Widget).enabled = true;
      })));
    })));
    var ind = 0;
    var qd = q; //q弹值

    if (arg) {
      this.playQJunpMovieClip(0.01, this.node.getChildByName("primary"), this.node.getChildByName("primaryPos").position, ind, qd);
      this.playQJunpMovieClip(0.137, this.node.getChildByName("intermediate"), this.node.getChildByName("intermediatePos").position, ind, qd);
      this.playQJunpMovieClip(0.237, this.node.getChildByName("senior"), this.node.getChildByName("seniorPos").position, ind, qd);
      this.playQJunpMovieClip(0.39, this.node.getChildByName("supremacy"), this.node.getChildByName("supremacyPos").position, ind, qd);
    } else {
      this.playQJunpMovieClip(0.01, this.node.getChildByName("primary"), this.node.getChildByName("primaryPos").position, ind, qd);
      this.playQJunpMovieClip(0.01, this.node.getChildByName("intermediate"), this.node.getChildByName("intermediatePos").position, ind, qd);
      this.playQJunpMovieClip(0.01, this.node.getChildByName("senior"), this.node.getChildByName("seniorPos").position, ind, qd);
      this.playQJunpMovieClip(0.01, this.node.getChildByName("supremacy"), this.node.getChildByName("supremacyPos").position, ind, qd);
    }
  },
  playQJunpMovieClip: function playQJunpMovieClip(delay, mc, pos, ind, qd) {
    var _this = this;

    mc.stopAllActions();
    var qjPos = cc.v2(pos.x, mc.y > pos.y ? pos.y - qd : pos.y + qd);
    var go = cc.callFunc(function () {
      mc.stopAllActions();
      mc.runAction(cc.sequence(cc.moveTo(0.137 + 0.05, pos), cc.callFunc(function () {
        ind++;

        _this.endEffectPlayed(ind);
      })));
    });
    mc.runAction(cc.sequence(cc.delayTime(delay), cc.moveTo(0.17 + 0.05, qjPos), go));
  },
  endEffectPlayed: function endEffectPlayed(arg) {
    if (arg == 4) {// this.node.getComponent(cc.Widget).enabled = true;
      // this.node.getComponent(cc.Widget).updateAlignment();
    }
  },
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("goldOnlineNum", this);
    glGame.emitter.off("onGameConfig", this);
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  goldOnlineNum: function goldOnlineNum(msg) {
    console.log("这是在线人数的消息", msg);
    var count = this.level.length;

    for (var i = 0; i < count; i++) {
      if (msg[i + 1]) {
        this.level[i].getChildByName("people_num").getComponent(cc.Label).string = msg[i + 1];
      }
    }
  },
  RootNodeShow: function RootNodeShow() {
    this.registerEvent();
    this.node.active = true;
    this.gameID = glGame.scenetag.FISH2;
    glGame.readyroom.reqEnterArea(glGame.scenetag.FISH2);
  },
  RootNodeHide: function RootNodeHide() {
    this.unregisterEvent();
    this.node.active = false;
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

      case "primary":
        this.enterGame(99);
        break;

      case "intermediate":
        this.enterGame(1);
        break;

      case "senior":
        this.enterGame(2);
        break;
      // case "tuhao": this.enterGame(3); break;

      case "supremacy":
        this.enterGame(3);
        break;

      case "volvo":
        this.enterGame(5);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * 进入金币场房间
   * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
   */
  enterGame: function enterGame(level) {
    var _this2 = this;

    glGame.room.reqMyGameState(this.gameID, level).then(function () {
      var gameID = _this2.gameID;

      if (_this2.gameConfig[level] == null) {
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

      if (gameID == glGame.scenetag.FISH2) {
        if (glGame.user.get("coin") >= _this2["gameConfig"][level].EntranceRestrictions) {
          glGame.room.sendEnterRoom(level, _this2.gameID);
        } else {
          var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.getFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u8FDB\u5165\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
          glGame.panel.showDialog("", string, function () {
            glGame.panel.showShop(100);
          }, function () {}, "取消", "充值");
        }

        return;
      }

      if (_this2.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        var _string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.getFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u8FDB\u5165\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");

        glGame.panel.showDialog("", _string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua(); // glGame.readyroom.reqExitArea();

      _this2.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      })));

      _this2.node.getChildByName("mask").active = true; // TODO
      // reqGoldRoomVerify为旧的进入房间方法，需要先请求验证，再进入房间
      // setGoldRoomInfo 新的进入房间方法，无需验证，设置游戏类型以及房间信息后，直接进入房间
      // if (glGame.enterRoomVerification) {
      //     glGame.room.reqGoldRoomVerify(gameID, level);
      // } else {
      //     glGame.room.setGoldRoomInfo(gameID, level);
      // }

      glGame.room.setGoldRoomInfo(gameID, level);
    });
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },

  /**
   * 检查玩家金币是否足够
   * @returns {boolean}
   */
  checkGold: function checkGold(coin, minCion) {
    console.log("金币检测", coin, minCion);

    if (parseInt(coin) < parseInt(minCion)) {
      glGame.panel.showDialog(glGame.i18n.t("USER.GOLDLACK.TITLE"), glGame.i18n.t("USER.GOLDLACK.CONTENT"), function () {
        glGame.panel.showPanelByName("shop");
      }, null);
      return false;
    }

    return true;
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.cutFloat(coin);
    this.username.string = glGame.user.get("nickname");
  },
  initUI: function initUI() {
    this.node.active = true;
    this.level[0].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = "".concat(this["gameConfig"]['99'].BaseConsume >= 1000000 ? this.cutFloat(this["gameConfig"]['99'].BaseConsume / 10000) + '万' : this.cutFloat(this["gameConfig"]['99'].BaseConsume));
    var downString1 = this["gameConfig"]['99'].EntranceRestrictions >= 1000000 ? "".concat(this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions / 10000), "\u4E07") : this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions);
    this.level[0].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString1;

    for (var i = 1; i < this.level.length; i++) {
      var roomConfig = this["gameConfig"][i];
      var downString = roomConfig.EntranceRestrictions >= 1000000 ? "".concat(this.cutFloat(roomConfig.EntranceRestrictions / 10000), "\u4E07") : this.cutFloat(roomConfig.EntranceRestrictions);
      this.level[i].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = "".concat(roomConfig.BaseConsume >= 1000000 ? this.cutFloat(roomConfig.BaseConsume / 10000) + '万' : this.cutFloat(roomConfig.BaseConsume));
      this.level[i].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString;
    }
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
    var panel = glGame.panel.showPanel(this.help_pre);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.record_pre);
    panel.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
  } // update (dt) {},

});

cc._RF.pop();
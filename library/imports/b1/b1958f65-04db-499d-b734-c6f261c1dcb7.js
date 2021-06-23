"use strict";
cc._RF.push(module, 'b19589lBNtJnbc0xvJhwdy3', 'ebgentry');
// modules/plaza/script/prefab/enterRoom/ebgentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    ebg_record: cc.Prefab,
    ebg_gamerule: cc.Prefab,
    level: {
      type: cc.Node,
      "default": []
    },
    dizhu: {
      type: cc.Node,
      "default": []
    },
    zhunru: {
      type: cc.Node,
      "default": []
    },
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

      case "tuhao":
        this.enterGame(3);
        break;

      case "supremacy":
        this.enterGame(4);
        break;

      case "volvo":
        this.enterGame(5);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.EBG;
    glGame.readyroom.reqEnterArea(glGame.scenetag.EBG);
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.resetView();
    this.unregisterEvent();
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
  initUI: function initUI() {
    var _this = this;

    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < 4; i++) {
      this.dizhu[i].getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
      this.zhunru[i].getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
    }

    var animation = [];

    var _loop = function _loop(_i) {
      animation.push(cc.delayTime(0.05 * _i), cc.callFunc(function () {
        _this.level[_i].active = true;

        _this.level[_i].runAction(cc.sequence(cc.callFunc(function () {
          _this.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle3", false);

          _this.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : "";

            if (name == "idle3") {
              _this.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle2", true);
            }
          });
        }), cc.delayTime(0.3), cc.callFunc(function () {
          if (_this.level[_i].getChildByName("zhunrulayout")) _this.level[_i].getChildByName("zhunrulayout").active = true;
          if (_this.level[_i].getChildByName("dizhulaout")) _this.level[_i].getChildByName("dizhulaout").active = true;
        })));
      }));
    };

    for (var _i = 0; _i < 4; _i++) {
      _loop(_i);
    }

    this.node.runAction(cc.sequence(animation));
  },
  resetView: function resetView() {
    for (var i = 0; i < 4; i++) {
      this.level[i].active = false;
      if (this.level[i].getChildByName("zhunrulayout")) this.level[i].getChildByName("zhunrulayout").active = false;
      if (this.level[i].getChildByName("dizhulaout")) this.level[i].getChildByName("dizhulaout").active = false;
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

      if (_this2.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        console.log("这是当前的房间限制", _this2.gameConfig);
        var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.cutFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua(); // glGame.readyroom.reqExitArea();

      _this2.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      }))); // TODO
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
    var ebg_gamerule = glGame.panel.showPanel(this.ebg_gamerule);
    ebg_gamerule.zIndex = 30;
  },
  click_record: function click_record() {
    //glGame.panel.showNewGameRecord(this.gameid,30);
    var ebg_record = glGame.panel.showPanel(this.ebg_record);
    ebg_record.zIndex = 30;
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
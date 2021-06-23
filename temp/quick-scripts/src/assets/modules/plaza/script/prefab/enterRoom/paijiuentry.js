"use strict";
cc._RF.push(module, 'cd167DnItJPnpZEHND1Piit', 'paijiuentry');
// modules/plaza/script/prefab/enterRoom/paijiuentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    level: {
      type: cc.Node,
      "default": []
    },
    pre_record: cc.Prefab,
    pre_help: cc.Prefab,
    BGM: {
      //背景声音
      type: cc.AudioClip,
      "default": null
    },
    dizhulaoutList: [cc.Node],
    zhunrulayoutList: [cc.Node]
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
  goldOnlineNum: function goldOnlineNum() {},
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.PAIJIU;
    glGame.readyroom.reqEnterArea(glGame.scenetag.PAIJIU);
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

  /**
  * 进入金币场房间
  * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
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
        var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this.getFloat(_this.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua();

      _this.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
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
  initUI: function initUI() {
    var _this2 = this;

    this.resetView();
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < count; i++) {
      this.dizhulaoutList[i - 1].getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
      this.zhunrulayoutList[i - 1].getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
    }

    var animation = [];

    var _loop = function _loop(_i) {
      animation.push(cc.delayTime(0.05 * _i), cc.callFunc(function () {
        _this2.level[_i].active = true;

        _this2.level[_i].runAction(cc.sequence(cc.callFunc(function () {
          _this2.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : "";

            if (name == "idle1") {
              _this2.level[_i].getChildByName("spine").getComponent(sp.Skeleton).timeScale = 1;

              _this2.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle2", true);
            }
          });

          _this2.level[_i].getChildByName("spine").getComponent(sp.Skeleton).timeScale = 1.3;

          _this2.level[_i].getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "idle1", false);
        }), cc.delayTime(0.4), cc.callFunc(function () {// if(this.level[i].getChildByName("zhunrulayout"))this.level[i].getChildByName("zhunrulayout").active = true;
          // if(this.level[i].getChildByName("dizhulaout"))this.level[i].getChildByName("dizhulaout").active = true;
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
    }
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.cutFloat(coin); // this.goldCount.string = glGame.user.GoldTemp(coin);
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
    glGame.panel.showPanel(this.pre_help).zIndex = 30;
  },
  click_record: function click_record() {
    glGame.panel.showPanel(this.pre_record).zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
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
"use strict";
cc._RF.push(module, '5bb7b5yqmtGrrpfzkGiCXKP', 'sssentry');
// modules/plaza/script/prefab/enterRoom/sssentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    BGM: {
      type: cc.AudioClip,
      "default": null
    },
    goldCount: cc.Label,
    sssRecord: cc.Prefab,
    sssRule: cc.Prefab,
    ptf_text: [cc.Label],
    gbf_text: [cc.Label],
    fhf_text: [cc.Label],
    sp_role: [sp.Skeleton],
    level: {
      type: cc.Node,
      "default": []
    }
  },
  onLoad: function onLoad() {
    this.limitTxt = [this.tyf_text, this.ptf_text, this.gbf_text, this.fhf_text];
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.updateuserInfo();
    this.aniEvent();
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
  registerEvent: function registerEvent() {
    glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("goldOnlineNum", this);
    glGame.emitter.off("onGameConfig", this);
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.SSS;
    glGame.readyroom.reqEnterArea(glGame.scenetag.SSS);
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  initUI: function initUI() {
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 0; i < count; i++) {
      if (i > 0) {
        // 底注
        this.limitTxt[i][0].string = this.getFloat(configure[i].BaseChips); // 准入

        this.limitTxt[i][1].string = this.getFloat(configure[i].EntranceRestrictions);
      }
    }
  },
  //骨骼动画播放结束的回调
  aniEvent: function aniEvent() {
    var _this = this;

    var count = this.level.length;

    var _loop = function _loop(i) {
      var tiem = i * 0.13;

      _this.node.runAction(cc.sequence(cc.delayTime(tiem), cc.callFunc(function () {
        _this.sp_role[i].node.active = true;

        _this.sp_role[i].setAnimation(0, "idle3", false);

        _this.sp_role[i].setCompleteListener(function (trackEntry, loopCount) {
          var name = trackEntry.animation ? trackEntry.animation.name : "";

          if (name == "idle3") {
            _this.sp_role[i].setAnimation(0, "idle2", true);
          }
        });
      })));
    };

    for (var i = 0; i < count; i++) {
      _loop(i);
    }
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
  onClick: function onClick(name, node) {
    switch (name) {
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

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * 进入金币场房间
   * @param level 场次类型 1:普通场 2:贵宾场 3:富豪场
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
        var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.getFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua();

      _this2.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      })));

      glGame.room.setGoldRoomInfo(gameID, level);
    });
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin); //glGame.user.cutFloat(coin);
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
    var panel = glGame.panel.showPanel(this.sssRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.sssRecord);
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
  }
});

cc._RF.pop();
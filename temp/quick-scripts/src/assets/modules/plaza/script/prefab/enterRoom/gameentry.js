"use strict";
cc._RF.push(module, '6224envDaJKDayEmMYCEHex', 'gameentry');
// modules/plaza/script/prefab/enterRoom/gameentry.js

"use strict";

/**
 * 金币房间入口通用脚本
 */
glGame.baseclass.extend({
  properties: {
    level: {
      type: cc.Node,
      "default": []
    }
  },
  onLoad: function onLoad() {
    this.node.active = false;
    this.reqEnterArea();
    this.registerEvent();
  },
  start: function start() {},
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
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  reqEnterArea: function reqEnterArea() {
    switch (this.node.name) {
      case 'ddzselect':
        this.gameID = glGame.scenetag.DDZ;
        glGame.readyroom.reqEnterArea(glGame.scenetag.DDZ);
        break;

      case 'dzpkselect':
        this.gameID = glGame.scenetag.DZPK;
        glGame.readyroom.reqEnterArea(glGame.scenetag.DZPK);
        break;

      case 'paijiuselect':
        this.gameID = glGame.scenetag.PAIJIU;
        glGame.readyroom.reqEnterArea(glGame.scenetag.PAIJIU);
        break;

      case 'qznnselect':
        this.gameID = glGame.scenetag.QZNN;
        glGame.readyroom.reqEnterArea(glGame.scenetag.QZNN);
        break;

      case 'sangongselect':
        this.gameID = glGame.scenetag.SANGONG;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SANGONG);
        break;

      case 'zhajinhuaselect':
        this.gameID = glGame.scenetag.ZHAJINHUA;
        glGame.readyroom.reqEnterArea(glGame.scenetag.ZHAJINHUA);
        break;

      case 'ebgselect':
        this.gameID = glGame.scenetag.EBG;
        glGame.readyroom.reqEnterArea(glGame.scenetag.EBG);
        break;

      case 'esydselect':
        this.gameID = glGame.scenetag.ESYD;
        glGame.readyroom.reqEnterArea(glGame.scenetag.ESYD);
        break;

      case 'fishselect':
        this.gameID = glGame.scenetag.FISH2;
        glGame.readyroom.reqEnterArea(glGame.scenetag.FISH2);
        break;

      case 'jszjhselect':
        this.gameID = glGame.scenetag.JSZJH;
        glGame.readyroom.reqEnterArea(glGame.scenetag.JSZJH);
        break;

      case 'sssselect':
        this.gameID = glGame.scenetag.SSS;
        glGame.readyroom.reqEnterArea(glGame.scenetag.SSS);
        break;
    }
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
    this.node.active = true;
    var configure = this.gameConfig;

    if (this.gameID == glGame.scenetag.FISH2) {
      this.level[0].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = "".concat(this["gameConfig"]['99'].BaseConsume >= 1000000 ? this.cutFloat(this["gameConfig"]['99'].BaseConsume / 10000) + '万' : this.cutFloat(this["gameConfig"]['99'].BaseConsume));
      var downString1 = this["gameConfig"]['99'].EntranceRestrictions >= 1000000 ? "".concat(this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions / 10000), "\u4E07") : this.cutFloat(this["gameConfig"]['99'].EntranceRestrictions);
      this.level[0].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString1;

      for (var i = 1; i < 6; i++) {
        var roomConfig = this["gameConfig"][i];
        var downString = roomConfig.EntranceRestrictions >= 1000000 ? "".concat(this.cutFloat(roomConfig.EntranceRestrictions / 10000), "\u4E07") : this.cutFloat(roomConfig.EntranceRestrictions);
        this.level[i].getChildByName("dizhulaout").getChildByName('lab_top').getComponent(cc.Label).string = "".concat(roomConfig.BaseConsume >= 1000000 ? this.cutFloat(roomConfig.BaseConsume / 10000) + '万' : this.cutFloat(roomConfig.BaseConsume));
        this.level[i].getChildByName("zhunrulayout").getChildByName('lab_center').getComponent(cc.Label).string = downString;
      }

      return;
    }

    ;
    var count = this.level.length;

    for (var _i = 1; _i < count; _i++) {
      if (this.gameID == glGame.scenetag.DZPK) {
        this.level[_i].getChildByName("dizhulaout").getChildByName('dizhu_numbig').getComponent(cc.Label).string = "".concat(this.cutFloat(configure[_i].SmallBaseChips), "/").concat(this.cutFloat(configure[_i].BaseChips));
        this.level[_i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[_i].EntranceRestrictions);
      } else {
        this.level[_i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[_i].BaseChips);
        this.level[_i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[_i].EntranceRestrictions);
      }

      if (this.gameID == glGame.scenetag.DDZ) {
        this.level[_i].getChildByName('label').getComponent(cc.Label).string = "\u6700\u5927".concat(configure[_i].RoomMaxMultiple, "\u500D");
        this.level[_i].getChildByName('black').width = this.level[_i].getChildByName('label').width + 10;
      }
    }

    if (this.gameID == glGame.scenetag.DDZ) {
      this.level[0].getChildByName('label').getComponent(cc.Label).string = "\u6700\u5927".concat(this["gameConfig"]['99'].RoomMaxMultiple, "\u500D");
      this.level[0].getChildByName('black').width = this.level[0].getChildByName('label').width + 10;
    }
  },
  // 重写父类按钮点击事件
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

      if (gameID == glGame.scenetag.FISH2) {
        if (glGame.user.get("coin") >= _this["gameConfig"][level].EntranceRestrictions) {
          glGame.room.sendEnterRoom(level);
        } else {
          var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this.getFloat(_this.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
          glGame.panel.showDialog("", string, function () {
            glGame.panel.showShop();
          }, function () {}, "取消", "充值");
        }

        return;
      }

      ;

      if (_this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        console.log("这是当前的房间限制", _this.gameConfig);

        var _string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this.getFloat(_this.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");

        glGame.panel.showDialog("", _string, function () {
          glGame.panel.showShop();
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua(); // glGame.readyroom.reqExitArea();

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
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
  }
});

cc._RF.pop();
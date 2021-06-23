"use strict";
cc._RF.push(module, '0cf4fLefY1F65sbn3RZ9LRn', 'sangongentry');
// modules/plaza/script/prefab/enterRoom/sangongentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    sgRecord: cc.Prefab,
    sgRule: cc.Prefab,
    goldCount: cc.Label,
    level: {
      type: cc.Node,
      "default": []
    },
    kmdContent: cc.Node,
    kmd: {
      type: cc.Node,
      "default": []
    },
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    this.topRight = this.kmdContent.getChildByName("topright").position;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.updateuserInfo();
    this.playEnterAnimation();
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
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("onGameConfig", this);
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.SANGONG;
    glGame.readyroom.reqEnterArea(glGame.scenetag.SANGONG);
  },
  initUI: function initUI() {
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < count; i++) {
      var layout = this.level[i].getChildByName("layout");
      var dizhu = layout.getChildByName("dizhu");
      var zhunru = layout.getChildByName("zhunrun");
      dizhu.getChildByName("dizhu_num").getComponent(cc.Label).string = this.getFloat(configure[i].BaseChips);
      zhunru.getChildByName("zhunru_num").getComponent(cc.Label).string = this.getFloat(configure[i].EntranceRestrictions);
    }
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

      case "btn_chongzhi":
        this.click_addgold();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  onScrollview: function onScrollview() {
    this.node.getChildByName("gesture").active = false;
  },
  // 播放进入动画
  playEnterAnimation: function playEnterAnimation() {
    var _this = this;

    // 手势动画
    if (!cc.sys.localStorage.getItem("zjh_gesture")) {
      this.node.getChildByName("gesture").active = true;
      this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
        _this.node.getChildByName("gesture").active = false;
      })));
      cc.sys.localStorage.setItem("zjh_gesture", true);
    }

    var nCount = this.level.length;
    var rightPos = this.level[nCount - 2].position;

    for (var i = 0; i < nCount; i++) {
      var lvNode = this.level[i];
      var originPos = lvNode.position;
      lvNode.opacity = 0;
      lvNode.setPosition(cc.v2(originPos.x + 400, originPos.y));
      var delay = cc.delayTime(i * 0.05);
      var moveTo1 = cc.moveTo(0.3, cc.v2(originPos, originPos.y));
      var fadeIn = cc.fadeIn(0.1);
      moveTo1.easing(cc.easeBackOut());
      lvNode.runAction(cc.sequence(delay, cc.spawn(moveTo1, fadeIn)));
    }

    this.kmdCaches = []; // 孔明灯缓存

    this.kmdUsed = []; // 孔明灯列表

    this.kmdDelay = 2; // 孔明灯生成间隔

    this.kmdDelta = 0; // 孔明灯累计时间

    this.kmdYure();
  },
  update: function update(dt) {
    this.kmdDelta += dt;

    if (this.kmdDelta > this.kmdDelay) {
      this.kmdDelta = 0;
      this.createKmd(); // console.log("cached length: " + this.kmdCaches.length);
      // console.log("used length: " + this.kmdUsed.length);
    } // 移动位置


    var kmdNode;

    for (var i = 0, count = this.kmdUsed.length; i < count; i++) {
      kmdNode = this.kmdUsed[i];
      kmdNode.x += kmdNode.speed.x * dt;
      kmdNode.y += kmdNode.speed.y * dt;
    }

    for (var _i = 0, _count = this.kmdUsed.length; _i < _count; _i++) {
      kmdNode = this.kmdUsed[_i];

      if (kmdNode.x > this.topRight.x || kmdNode.y > this.topRight.y) {
        this.kmdUsed.splice(_i, 1);
        this.kmdCaches.push(kmdNode);
        kmdNode.active = false;
        return;
      }
    }
  },
  // 孔明灯预热
  kmdYure: function kmdYure() {
    for (var i = 0; i < 300; i++) {
      this.update(1);
    }
  },
  // 创建新的孔明灯
  createKmd: function createKmd() {
    var randValue = Math.random() * 0.9 + 0.1;

    if (Math.random() < 0.7) {
      randValue = Math.random() * 0.3 + 0.1;
    }

    var cloneNode;

    if (this.kmdCaches.length > 0) {
      cloneNode = this.kmdCaches.pop();
    }

    if (!cloneNode) {
      cloneNode = cc.instantiate(Math.random() < 0.5 ? this.kmd[0] : this.kmd[1]);
    }

    cloneNode.active = true;
    cloneNode.parent = this.kmdContent;

    if (randValue > 0.5) {
      cloneNode.speed = cc.v2(Math.random() * 2, randValue * 20 + 10);
    } else {
      cloneNode.speed = cc.v2(0, randValue * 20 + 10);
    }

    cloneNode.angle = (Math.random() - 0.5) * 10;
    cloneNode.scale = randValue;
    cloneNode.opacity = randValue * 255;
    cloneNode.x = this.getRandomX();
    cloneNode.y = randValue < 0.5 ? 0 : -640;
    this.kmdUsed.push(cloneNode);
  },
  // 获取随机x坐标
  getRandomX: function getRandomX() {
    var nCount = this.kmdUsed.length;
    var distance = nCount > 9 ? 50 : 150;

    if (nCount == 0) {
      return (Math.random() - 0.5) * 1800;
    }

    var randx = 0;

    for (var i = 0; i < 20; i++) {
      randx = (Math.random() - 0.5) * 1800;

      for (var j = 0; j < nCount; j++) {
        if (Math.abs(randx - this.kmdUsed[j].x) > distance) {
          return randx;
        }
      }
    }

    return randx;
  },

  /**
   * 进入金币场房间
   * @param level 99：体验场 场次类型 1:普通车 2:贵宾场 3:富豪场 
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
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin);
  },
  setGameId: function setGameId(gameid) {
    this.gameid = gameid;
  },
  updateBgInfo: function updateBgInfo() {},
  click_addgold: function click_addgold() {
    glGame.panel.showShop(30);
  },
  click_back: function click_back() {
    glGame.readyroom.reqExitArea();
    this.remove();
  },
  click_help: function click_help() {
    var panel = glGame.panel.showPanel(this.sgRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.sgRecord);
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
"use strict";
cc._RF.push(module, '45747rvQrdI0ofeuaIL5mlh', 'dzpkentry');
// modules/plaza/script/prefab/enterRoom/dzpkentry.js

"use strict";

//德州扑克 入口
glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    level: {
      type: cc.Node,
      "default": []
    },
    rulePrefab: cc.Prefab,
    recordPrefab: cc.Prefab,
    buttonList: [cc.Node],
    scrollView: cc.ScrollView,
    BGM: {
      //背景声音
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
    this.updateuserInfo();
    this.registerEvent();
    this.reqEnterArea();
    var old_width = this.scrollView.node.width;
    this.scrollView.getComponent(cc.Widget).updateAlignment();
    var new_width = this.scrollView.node.width;
    console.log("old_width=", old_width, ",new_width=", new_width);
    this.spacing_x = new_width / old_width;
  },
  start: function start() {
    this.startMove();
  },
  //动画
  startMove: function startMove() {
    var _this = this;

    var content = this.scrollView.node.getChildByName("view").getChildByName("content");
    content.width = content.width * this.spacing_x;
    content.getComponent(cc.Widget).updateAlignment();
    content.opacity = 255;
    content.getComponent(cc.Widget).enabled = false;
    content.getComponent(cc.Layout).enabled = false;
    var posList = [];
    var index = 0;

    for (var i = 0; i < this.buttonList.length; i++) {
      var item = this.buttonList[i];
      item.getComponent(cc.Widget).updateAlignment();
      posList.push(cc.v2(item.position.x, item.position.y));
    }

    var _loop = function _loop(_i) {
      var item = _this.buttonList[_i];
      item.x += posList[posList.length - 1].x + Math.random() * 30;
      item.stopAllActions();
      var t = 0.1 * _i;
      item.runAction(cc.sequence(cc.delayTime(t), cc.moveTo(0.2, cc.v2(posList[_i].x - 40, posList[_i].y)), cc.callFunc(function () {
        item.stopAllActions();
        item.runAction(cc.sequence(cc.moveTo(0.1, posList[_i]), cc.callFunc(function () {
          index++;

          if (index == 4) {
            content.getComponent(cc.Widget).enabled = true;
          }
        })));
      })));
    };

    for (var _i = 0; _i < posList.length; _i++) {
      _loop(_i);
    }

    var game_logo = this.node.getChildByName("Bg").getChildByName("game_logomask").getChildByName("game_logo");
    game_logo.x = this.node.getChildByName("point2").x;
    game_logo.y = this.node.getChildByName("point2").y;
    game_logo.opacity = 255;
    var go2 = cc.moveTo(0.2, this.node.getChildByName("point3").position);
    var back2 = cc.moveTo(0.1, this.node.getChildByName("point4").position);
    game_logo.runAction(cc.sequence(go2, back2));
  },
  //事件监听
  registerEvent: function registerEvent() {
    // 监听scrollView的滚动事件
    this.scrollView.node.on("scroll-to-left", this.scrollLeftCb, this);
    this.scrollView.node.on("scroll-to-right", this.scrollRigthCb, this);
    glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("goldOnlineNum", this);
    glGame.emitter.off("onGameConfig", this);
  },
  scrollLeftCb: function scrollLeftCb(scrollView) {
    // cc.log("**********************************触摸到Left，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_r").active = true;
  },
  scrollRigthCb: function scrollRigthCb(scrollView) {
    // 回调的参数是 ScrollView 组件
    // do whatever you want with scrollview
    // cc.log("**********************************触摸到Rigth，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_l").active = true;
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.DZPK;
    glGame.readyroom.reqEnterArea(glGame.scenetag.DZPK);
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

      case "jiantou_l":
      case "jiantou_r":
        console.log("点击了按钮");
        this.executionScrollTo(name);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  executionScrollTo: function executionScrollTo(name) {
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;

    if (name == "jiantou_l") {
      this.node.getChildByName("jiantou_r").active = true;
      this.scrollView.scrollToLeft(0.1);
    } else {
      this.node.getChildByName("jiantou_l").active = true;
      this.scrollView.scrollToRight(0.1);
    }
  },
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
        var string = " <color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.getFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      glGame.panel.showJuHua();

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
  getFloat: function getFloat(value) {
    return Number(value).div(100);
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
  goldOnlineNum: function goldOnlineNum() {},
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  initUI: function initUI() {
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < 4; i++) {
      this.level[i].getChildByName("dizhulaout").getChildByName('dizhu_numbig').getComponent(cc.Label).string = "".concat(this.cutFloat(configure[i].SmallBaseChips), "/").concat(this.cutFloat(configure[i].BaseChips));
      this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
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
    glGame.panel.showPanel(this.rulePrefab).zIndex = 30;
  },
  click_record: function click_record() {
    glGame.panel.showPanel(this.recordPrefab).zIndex = 30;
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
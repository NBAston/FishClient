"use strict";
cc._RF.push(module, '3f1e34gKfNNjrdaGRD6g2wu', 'esydentry');
// modules/plaza/script/prefab/enterRoom/esydentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    BGM: {
      type: cc.AudioClip,
      "default": null
    },
    goldCount: cc.Label,
    level: {
      type: cc.Node,
      "default": []
    },
    record: cc.Prefab,
    rule: cc.Prefab,
    sp_game_logo: sp.Skeleton,
    sp_deng: sp.Skeleton
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    this.node.getChildByName("esydselect").active = false;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.updateuserInfo();
    this.registerEvent();
    this.reqEnterArea();
  },
  initAni: function initAni() {
    this.renwu_pos = [];

    for (var index = 0; index < this.level.length; index++) {
      var pos = this.level[index].getPosition();
      this.renwu_pos.push(pos);

      if (index > 1) {
        this.level[index].x = this.node.width / 2 + pos.x;
      } else {
        this.level[index].x = pos.x - this.node.width / 2;
      }

      this.level[index].active = true;
    }

    var _fadeTo = cc.sequence(cc.fadeTo(0.1, 130), cc.delayTime(0.1), cc.fadeTo(0.05, 220));

    var _callFunc = cc.callFunc(function () {
      this.playShow();
      this.playMove();
      this.aniEvent();
    }, this);

    this.node.runAction(_callFunc);
  },
  // 任务渐变出来
  playShow: function playShow() {
    var _index = 0; // let action_node = [2, 1, 3, 0];

    var action_node = [1, 2, 0, 3];
    var roomSelect = this.node.getChildByName("girls");
    action_node.forEach(function (i) {
      roomSelect.children[i].runAction(cc.sequence(cc.delayTime(_index * 0.15), cc.tintTo(0.1, 255, 255, 255)));
      _index++;
    });
  },
  //打开界面的图标移动动作
  playMove: function playMove() {
    // let roomSelect = this.node.getChildByName("qznnselect");
    // for (let i = 0; i < roomSelect.childrenCount; i++) {
    for (var i = 0; i < this.level.length; i++) {
      if (i < 4) {
        var time = i * 0.1;

        switch (i) {
          case 0:
            time = (i + 1) * 0.1;
            break;

          case 1:
            time = 0;
            break;
        }

        this.level[i].runAction(cc.sequence(cc.delayTime(time), cc.moveTo(0.15, cc.v2(this.renwu_pos[i].x - 40, this.renwu_pos[i].y)), cc.moveTo(0.07, this.renwu_pos[i])));
      }
    }
  },
  //骨骼动画播放结束的回调
  aniEvent: function aniEvent() {
    var _this = this;

    this.sp_game_logo.setAnimation(0, "animation1", false);
    this.sp_game_logo.setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : "";

      if (name == "animation1") {
        _this.sp_game_logo.setAnimation(0, "animation2", true);
      }
    });
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
        this.enterGame(name, node);
        break;

      default:
        console.error("no find button name -> %s", name);
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
    glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("goldOnlineNum", this);
    glGame.emitter.off("onGameConfig", this);
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
    // glGame.panel.showNewGameRule(this.gameid,30);
    var panel = glGame.panel.showPanel(this.rule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    // glGame.panel.showNewGameRecord(this.gameid,30);
    var panel = glGame.panel.showPanel(this.record);
    panel.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.ESYD;
    glGame.readyroom.reqEnterArea(glGame.scenetag.ESYD);
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
    this.node.getChildByName("esydselect").active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < count; i++) {
      this.level[i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
      this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
    }

    this.initAni();
  },

  /**
   * 进入金币场房间
   * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
   */
  enterGame: function enterGame(name, node) {
    var _this2 = this;

    var level = Number(node.parent.name);
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
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.unregisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
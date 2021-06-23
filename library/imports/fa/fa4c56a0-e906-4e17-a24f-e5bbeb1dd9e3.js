"use strict";
cc._RF.push(module, 'fa4c5ag6QZOF6JP5bvrHdnj', 'luckDraw');
// modules/plaza/script/prefab/luckDraw/luckDraw.js

"use strict";

glGame.baseclass.extend({
  properties: {
    leftbtns: cc.Node,
    fnt_needScore: [cc.Font],
    spin_node: cc.Sprite,
    img_spin: [cc.SpriteFrame],
    start_node: cc.Node,
    img_start: [cc.SpriteFrame],
    startbg_node: cc.Sprite,
    img_startbg: [cc.SpriteFrame],
    outside_node: cc.Sprite,
    img_outside: [cc.SpriteFrame],
    turnTable: cc.Node,
    img_turnTable: [cc.SpriteFrame],
    selectPanel: cc.Node,
    fullService: cc.Node,
    fullServiceItem: cc.Node,
    personRecord: cc.Node,
    nopersonRecord: cc.Node,
    recordItem: cc.Node,
    lab_needScore: cc.Label,
    lab_myScore: cc.Label,
    lab_getRule: cc.Label,
    allGift: cc.Node,
    //转盘上所有图标
    turnFlash: cc.Node,
    sp_turnFlash: [sp.SkeletonData],
    maskButton: cc.Node,
    // 屏蔽按钮
    drawAudio: {
      type: cc.AudioClip,
      "default": null
    },
    point_node: cc.Sprite,
    img_point: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.registerEvent(); //this.reqData();

    this.in_type = 0;
    this.angle = 0;
    this.startTurnTable = true; //转盘转动过程中限制点击

    this.time = null; //全服大奖记录刷新

    this.switchPanel("fullService");
    this.btnStart = this.start_node.children[0];
    this.playBtnAni();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateDialPrizeList", this.updateDialPrizeList, this);
    glGame.emitter.on("updateTopPrize", this.updateTopPrize, this);
    glGame.emitter.on("getDialResult", this.getDialResult, this);
    glGame.emitter.on("updateMyRecord", this.updateMyRecord, this);
    glGame.emitter.on("updateDialScore", this.updateDialScore, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.reqData, this);
    glGame.emitter.on("closeLuckDrawMaskButton", this.closeLuckDrawMaskButton, this);
  },
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("updateDialPrizeList", this);
    glGame.emitter.off("updateTopPrize", this);
    glGame.emitter.off("getDialResult", this);
    glGame.emitter.off("updateMyRecord", this);
    glGame.emitter.off("updateDialScore", this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
    glGame.emitter.off("closeLuckDrawMaskButton", this);
  },
  //检查当前红点
  checkRedDot: function checkRedDot() {
    if (this.dialPrizeList[0].consume_integral.div(100) <= Number(this.lab_myScore.string)) {
      glGame.user.redDotData.dialRed = 1;
    } else {
      glGame.user.redDotData.dialRed = 2;
    }

    glGame.emitter.emit("ReqRedDot");
  },
  closeLuckDrawMaskButton: function closeLuckDrawMaskButton() {
    this.maskButton.active = false;
    this.startTurnTable = true;
  },
  playBtnAni: function playBtnAni() {
    this.btnStart.stopAllActions();
    this.btnStart.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.35, 1.1, 1.1), cc.scaleTo(0.35, 1, 1))));
  },
  //界面我的积分等数据
  updateDialPrizeList: function updateDialPrizeList() {
    this.dialPrizeList = glGame.user.dialPrizeList;
    this.lab_needScore.string = "(".concat(this.getFloat(this.dialPrizeList[this.in_type].consume_integral), "\u79EF\u5206)");
    glGame.user.reqDialIntegral();
    this.updateAwardNum();
  },
  //全服大奖记录
  updateTopPrize: function updateTopPrize() {
    this.dialTopPrize = glGame.user.dialTopPrize;

    if (this.dialTopPrize.length > 0) {
      this.time = this.dialTopPrize[this.dialTopPrize.length - 1].time;
    }

    console.log("这是当前全服大奖记录", this.dialTopPrize);
    this.initTopPrize();
  },
  //刚开始界面的生成
  initTopPrize: function initTopPrize() {
    if (this.fullService.childrenCount != 0) {
      this.recordIndex = 0;
    } else {
      this.recordIndex = 10;
      var Count = this.dialTopPrize.length >= 10 ? 10 : this.dialTopPrize.length;

      for (var i = 0; i < Count; i++) {
        var fullServiceItem = cc.instantiate(this.fullServiceItem);
        fullServiceItem.parent = this.fullService; //fullServiceItem.active = true;

        var name = this.dialTopPrize[i].nickname,
            lab_type = this.dialTopPrize[i].dial_type,
            prize = this.getFloat(this.dialTopPrize[i].prize);
        fullServiceItem.getChildByName("notice").getComponent(cc.RichText).string = "\u606D\u559C <color=#0fe6ff>".concat(name, "</color>\u5728 <color=#ab9afe>[").concat(lab_type, "]</c> \u4E2D\u83B7\u5F97\u5956\u52B1 <color=#f4c404>").concat(prize, "\u5143</c>\uFF01");
        fullServiceItem.getChildByName("bg").active = i % 2 != 0;
      }

      glGame.panel.showEffectNode(this, this.fullService, 0.01, true);
    }

    this.playScrollNotice();
  },
  playScrollNotice: function playScrollNotice() {
    var _this = this;

    if (this.dialTopPrize.length == 0) {
      this.scheduleOnce(function () {
        glGame.user.reqDialTopPrizeLog(_this.time);
      }, 5);
      return;
    }

    var time = Math.random() * 2 + 3;
    this.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
      _this.addItem();

      _this.recordIndex++;

      if (_this.recordIndex >= _this.dialTopPrize.length) {
        glGame.user.reqDialTopPrizeLog(_this.time);
      } else {
        _this.playScrollNotice();
      }
    })));
  },
  //刷新转盘上的数字
  updateAwardNum: function updateAwardNum() {
    for (var i = 0; i < this.allGift.childrenCount; i++) {
      var award = this.getFloat(this.dialPrizeList[this.in_type].item[i].award);
      this.allGift.children[i].getChildByName("number").getComponent(cc.Label).string = award;
    }
  },
  //刷新记录
  addItem: function addItem() {
    if (!this.dialTopPrize[this.recordIndex]) return;
    if (this.fullService.childrenCount >= 10) this.fullService.children[this.fullService.childrenCount - 1].destroy();
    var fullServiceItem = cc.instantiate(this.fullServiceItem);
    fullServiceItem.parent = this.fullService;
    fullServiceItem.setSiblingIndex(0);
    fullServiceItem.active = true;
    var name = this.dialTopPrize[this.recordIndex].nickname,
        lab_type = this.dialTopPrize[this.recordIndex].dial_type,
        prize = this.getFloat(this.dialTopPrize[this.recordIndex].prize);
    fullServiceItem.getChildByName("notice").getComponent(cc.RichText).string = "\u606D\u559C <color=#0fe6ff>".concat(name, "</color> \u5728 <color=#ab9afe>[").concat(lab_type, "]</c> \u4E2D\u83B7\u5F97\u5956\u52B1 <color=#f4c404>").concat(prize, "\u5143</c>\uFF01");
    fullServiceItem.getChildByName("bg").active = this.recordIndex % 2 != 0;
  },
  //更新个人记录
  updateMyRecord: function updateMyRecord() {
    this.myDialRecord = glGame.user.myDialRecord;
    this.personRecord.destroyAllChildren();
    this.personRecord.removeAllChildren();
    this.nopersonRecord.active = this.myDialRecord.length == 0;

    for (var i = 0; i < this.myDialRecord.length; i++) {
      var recordItem = cc.instantiate(this.recordItem);
      recordItem.parent = this.personRecord;
      recordItem.getChildByName("time").getComponent(cc.Label).string = this.myDialRecord[i].create_time;
      recordItem.getChildByName("type").getComponent(cc.Label).string = this.myDialRecord[i].dial_type;
      recordItem.getChildByName("coin").getComponent(cc.Label).string = this.getFloat(this.myDialRecord[i].prize) + '元';
      recordItem.getChildByName("coin").color = glGame.plazaColor.gain;
      recordItem.getChildByName("bg").active = i % 2 != 0; //recordItem.active = true;
    }

    glGame.panel.showEffectNode(this, this.personRecord, 0.01, true);
  },
  //当前我的积分
  updateDialScore: function updateDialScore() {
    this.lab_myScore.string = this.getFloat(glGame.user.dialScore);
    this.checkRedDot();
  },
  //开奖结果
  getDialResult: function getDialResult() {
    // //转盘四秒左右可以点击抽奖按钮
    // this.scheduleOnce(() => {
    // }, 4)
    this.myDialResult = glGame.user.myDialResult;
    this.lab_myScore.string = this.getFloat(this.myDialResult.treasure);
    this.setFlash(this.in_type);
    this.btnStart.getComponent(cc.Button).interactable = false;
    this.btnStart.stopAllActions();
    this.btnStart.children[0].setScale(0.9);
    this.btnStart.children[1].setScale(0.9);
    cc.audioEngine.setVolume(glGame.audio.getBGM(), 0.1);
    this.runTurnTable();
  },
  //请求获奖数据
  reqDial: function reqDial() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (this.dialPrizeList[this.in_type].consume_integral.div(100) > Number(this.lab_myScore.string)) {
      return glGame.panel.showErrorTip(glGame.tips.LUCKDRAW.SCORENOTENOUGH);
    }

    if (!this.startTurnTable) return;
    this.startTurnTable = false;
    this.maskButton.active = !this.startTurnTable;
    console.log('开启请求');
    var type = this.in_type + 1;
    glGame.user.reqDial(type);
  },
  //刚开始进入界面的数据
  reqData: function reqData() {
    glGame.user.reqDialPrize();
    glGame.user.reqDialTopPrizeLog();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "silver":
      case "gold":
      case "diamonds":
        this.switchTable(name, node);
        break;

      case "btn_close":
        this.remove();
        break;

      case "btn_start":
        this.reqDial();
        break;

      case "fullService":
      case "personRecord":
      case "getRule":
        this.switchPanel(name);
        break;

      default:
        console.error('luckDraw->onClick', name);
        break;
    }
  },
  //转换转盘颜色
  switchTable: function switchTable(name, node) {
    var selectType = {
      "silver": 0,
      "gold": 1,
      "diamonds": 2
    };
    var flash = node.getChildByName("checkmark").getChildByName("flash").getComponent(sp.Skeleton);
    flash.node.active = true;
    flash.setAnimation(0, name == "gold" ? "huangjin" : "baiyin", false);
    flash.setCompleteListener(function (trackEntry, loopCount) {
      flash.node.active = false;
    });
    this.in_type = selectType[name]; //this.img_turnTable.spriteFrame = this.turnTableArr[this.in_type];
    //this.img_title.spriteFrame = this.titleArr[this.in_type];

    this.changeSkin(this.in_type);
    this.updateAwardNum();
  },
  //修改轮盘的皮肤
  changeSkin: function changeSkin(index) {
    this.spin_node.spriteFrame = this.img_spin[index]; //this.start_node.spriteFrame = this.img_start[index];

    this.startbg_node.spriteFrame = this.img_startbg[index];
    this.outside_node.spriteFrame = this.img_outside[index];
    this.turnTable.getComponent(cc.Sprite).spriteFrame = this.img_turnTable[index];
    this.point_node.spriteFrame = this.img_point[index];

    for (var i = 0; i < this.start_node.childrenCount; i++) {
      if (i == index) {
        this.start_node.children[i].active = true;
        this.start_node.children[i].getChildByName("needScore").getComponent(cc.Label).font = this.fnt_needScore[index];
        this.start_node.children[i].getChildByName("needScore").getComponent(cc.Label).string = "(".concat(this.getFloat(this.dialPrizeList[this.in_type].consume_integral), "\u79EF\u5206)");
        this.btnStart = this.start_node.children[i];
        this.playBtnAni();
      } else {
        this.start_node.children[i].active = false;
      }
    }
  },
  //切换三个界面
  switchPanel: function switchPanel(name) {
    for (var i = 0; i < this.leftbtns.childrenCount; i++) {
      var _children = this.leftbtns.children[i];
      var index = 0;
      if (_children.name == name) index = 1;
      _children.zIndex = index;
    }

    if (name == "personRecord" && !this.myDialRecord) {
      glGame.user.reqDialPersonal();
    } else if (name == "getRule" && !this.scoreBet && !this.dialRefreshTime) {
      this.dialRefreshTime = glGame.user.get("dialRefreshTime");
      this.scoreBet = glGame.user.get("scoreBet");

      if (glGame.user.get("dialRefreshType") == 2) {
        this.lab_getRule.string = "1.\u79EF\u5206\u6BCF\u65E5".concat(this.dialRefreshTime, "\u8FDB\u884C\u66F4\u65B0\uFF0C\u66F4\u65B0\u65F6\uFF0C\u5C06\u672A\u4F7F\u7528\u7684\u79EF\u5206\u6E05\u96F6\u3002\u7136\u540E\u5C06\u524D24\u5C0F\u65F6\u5185\u7684\u6709\u6548\u6295\u6CE8\u8F6C\u5316\u4E3A\u79EF\u5206\u3002\n\n2.\u79EF\u5206\u8F6C\u5316\u6BD4\u4F8B\uFF1A\u6709\u6548\u6295\u6CE8").concat(this.getFloat(this.scoreBet), "\u91D1\u5E01=1\u79EF\u5206\u3002\n\n3.\u8F6C\u76D8\u6863\u6B21\u8D8A\u9AD8\uFF0C\u6BCF\u6B21\u62BD\u5956\u9700\u6D88\u8017\u7684\u79EF\u5206\u8D8A\u591A\uFF0C\u5956\u52B1\u4E5F\u8D8A\u9AD8");
      } else {
        this.lab_getRule.string = "1.\u6BCF\u65E5\u79EF\u5206\u4F1A\u5B9E\u65F6\u7ED3\u7B97\u5237\u65B0\u3002\n\n2.\u79EF\u5206\u8F6C\u5316\u6BD4\u4F8B\uFF1A\u6709\u6548\u6295\u6CE8".concat(this.getFloat(this.scoreBet), "\u91D1\u5E01=1\u79EF\u5206\u3002\n\n3.\u8F6C\u76D8\u6863\u6B21\u8D8A\u9AD8\uFF0C\u6BCF\u6B21\u62BD\u5956\u9700\u6D88\u8017\u7684\u79EF\u5206\u8D8A\u591A\uFF0C\u5956\u52B1\u4E5F\u8D8A\u9AD8");
      }
    }

    for (var _i = 0; _i < this.selectPanel.childrenCount; _i++) {
      if (this.selectPanel.children[_i].name == name) {
        this.selectPanel.children[_i].active = true;
      } else {
        this.selectPanel.children[_i].active = false;
      }
    }
  },
  // //启动转盘
  runTurnTable: function runTurnTable() {
    var _this2 = this;

    var time = 5;
    var index = this.getIndex(); //let angle = null

    glGame.audio.playSoundEffect(this.drawAudio); //this.btnStartFlash.active = false;
    //this.turnTable.angle = this.angle;

    if (this.turnTable.angle == 0) {
      this.angle = 360 - (18 + index * 36) + 360 * 3;
    } else {
      var targetAngle = 360 - (index + 1) * 36;
      this.angle = targetAngle - Math.abs(this.turnTable.angle % 360) + 18 + 360 * 3;
    }

    this.turnTable.stopAllActions();
    this.turnTable.runAction(cc.sequence(cc.rotateBy(time, this.angle).easing(this.easeExponentialOut()), cc.callFunc(function () {
      _this2.setFlash();

      console.log("这是当前角度", _this2.turnTable.angle, _this2.angle);
      glGame.user.reqDialPersonal();
      glGame.panel.showAwardBox(glGame.tips.LUCKDRAW.CONGRATULATE, [{
        type: glGame.awardtype.COIN,
        value: _this2.getFloat(_this2.myDialResult.coin)
      }]);
      cc.audioEngine.setVolume(glGame.audio.getBGM(), glGame.audio.getBGMVolume());
      _this2.btnStart.getComponent(cc.Button).interactable = true;

      _this2.playBtnAni();

      _this2.btnStart.children[0].setScale(1);

      _this2.btnStart.children[1].setScale(1);

      _this2.startTurnTable = true;
      _this2.maskButton.active = !_this2.startTurnTable;

      _this2.checkRedDot();
    }))); // this.angle = angle;
    // this.startAngle = this.turnTable.angle;
    // this.range = this.angle - this.startAngle;
    // this.delta = 0;
    // this.duration = 4;
    // this.abcstart = true
  },
  setFlash: function setFlash() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    for (var i = 0; i < this.turnFlash.childrenCount; i++) {
      if (i == index) this.turnFlash.children[i].active = true;else this.turnFlash.children[i].active = false;
    }
  },
  easeExponentialOut: function easeExponentialOut() {
    var _easeExponentialOutObj = {
      easing: function easing(dt) {
        return -Math.pow(2, -10 * dt) + 1;
      },
      reverse: function reverse() {
        return _easeExponentialInObj;
      }
    };
    return _easeExponentialOutObj;
  },
  //函数思想
  // update(dt) {
  //     if(!this.abcstart)return;
  //     this.delta += dt;
  //     let percent = this.delta / this.duration;
  //     percent = this.easing(percent);
  //     this.turnTable.angle = this.startAngle + (this.angle - this.startAngle) * percent;
  // },
  // //转换当前指数函数
  // easing(dt) {
  //     return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
  // },
  //获取索引
  getIndex: function getIndex() {
    var allItem = this.dialPrizeList[this.in_type].item;

    for (var i = 0; i < allItem.length; i++) {
      if (allItem[i].id == this.myDialResult.item_id) {
        return i;
      }
    }
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
  }
});

cc._RF.pop();
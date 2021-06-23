
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/luckDraw/luckDraw.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxsdWNrRHJhd1xcbHVja0RyYXcuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImxlZnRidG5zIiwiY2MiLCJOb2RlIiwiZm50X25lZWRTY29yZSIsIkZvbnQiLCJzcGluX25vZGUiLCJTcHJpdGUiLCJpbWdfc3BpbiIsIlNwcml0ZUZyYW1lIiwic3RhcnRfbm9kZSIsImltZ19zdGFydCIsInN0YXJ0Ymdfbm9kZSIsImltZ19zdGFydGJnIiwib3V0c2lkZV9ub2RlIiwiaW1nX291dHNpZGUiLCJ0dXJuVGFibGUiLCJpbWdfdHVyblRhYmxlIiwic2VsZWN0UGFuZWwiLCJmdWxsU2VydmljZSIsImZ1bGxTZXJ2aWNlSXRlbSIsInBlcnNvblJlY29yZCIsIm5vcGVyc29uUmVjb3JkIiwicmVjb3JkSXRlbSIsImxhYl9uZWVkU2NvcmUiLCJMYWJlbCIsImxhYl9teVNjb3JlIiwibGFiX2dldFJ1bGUiLCJhbGxHaWZ0IiwidHVybkZsYXNoIiwic3BfdHVybkZsYXNoIiwic3AiLCJTa2VsZXRvbkRhdGEiLCJtYXNrQnV0dG9uIiwiZHJhd0F1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsInBvaW50X25vZGUiLCJpbWdfcG9pbnQiLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50IiwiaW5fdHlwZSIsImFuZ2xlIiwic3RhcnRUdXJuVGFibGUiLCJ0aW1lIiwic3dpdGNoUGFuZWwiLCJidG5TdGFydCIsImNoaWxkcmVuIiwicGxheUJ0bkFuaSIsImVtaXR0ZXIiLCJvbiIsInVwZGF0ZURpYWxQcml6ZUxpc3QiLCJ1cGRhdGVUb3BQcml6ZSIsImdldERpYWxSZXN1bHQiLCJ1cGRhdGVNeVJlY29yZCIsInVwZGF0ZURpYWxTY29yZSIsIm5vZGUiLCJuYW1lIiwiTUVTU0FHRSIsIlVJIiwiQUNUSU9OX0VORCIsInJlcURhdGEiLCJjbG9zZUx1Y2tEcmF3TWFza0J1dHRvbiIsInVucmVnaXN0ZXJFdmVudCIsIm9mZiIsImNoZWNrUmVkRG90IiwiZGlhbFByaXplTGlzdCIsImNvbnN1bWVfaW50ZWdyYWwiLCJkaXYiLCJOdW1iZXIiLCJzdHJpbmciLCJ1c2VyIiwicmVkRG90RGF0YSIsImRpYWxSZWQiLCJlbWl0IiwiYWN0aXZlIiwic3RvcEFsbEFjdGlvbnMiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJzY2FsZVRvIiwiZ2V0RmxvYXQiLCJyZXFEaWFsSW50ZWdyYWwiLCJ1cGRhdGVBd2FyZE51bSIsImRpYWxUb3BQcml6ZSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJpbml0VG9wUHJpemUiLCJjaGlsZHJlbkNvdW50IiwicmVjb3JkSW5kZXgiLCJDb3VudCIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIm5pY2tuYW1lIiwibGFiX3R5cGUiLCJkaWFsX3R5cGUiLCJwcml6ZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiUmljaFRleHQiLCJwYW5lbCIsInNob3dFZmZlY3ROb2RlIiwicGxheVNjcm9sbE5vdGljZSIsInNjaGVkdWxlT25jZSIsInJlcURpYWxUb3BQcml6ZUxvZyIsIk1hdGgiLCJyYW5kb20iLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsImFkZEl0ZW0iLCJhd2FyZCIsIml0ZW0iLCJkZXN0cm95Iiwic2V0U2libGluZ0luZGV4IiwibXlEaWFsUmVjb3JkIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJjcmVhdGVfdGltZSIsImNvbG9yIiwicGxhemFDb2xvciIsImdhaW4iLCJkaWFsU2NvcmUiLCJteURpYWxSZXN1bHQiLCJ0cmVhc3VyZSIsInNldEZsYXNoIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwic2V0U2NhbGUiLCJhdWRpb0VuZ2luZSIsInNldFZvbHVtZSIsImF1ZGlvIiwiZ2V0QkdNIiwicnVuVHVyblRhYmxlIiwicmVxRGlhbCIsImlzVG91cmlzdCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInNob3dFcnJvclRpcCIsInRpcHMiLCJMVUNLRFJBVyIsIlNDT1JFTk9URU5PVUdIIiwicmVxRGlhbFByaXplIiwib25DbGljayIsInN3aXRjaFRhYmxlIiwicmVtb3ZlIiwiZXJyb3IiLCJzZWxlY3RUeXBlIiwiZmxhc2giLCJTa2VsZXRvbiIsInNldEFuaW1hdGlvbiIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJ0cmFja0VudHJ5IiwibG9vcENvdW50IiwiY2hhbmdlU2tpbiIsImluZGV4Iiwic3ByaXRlRnJhbWUiLCJmb250IiwiX2NoaWxkcmVuIiwiekluZGV4IiwicmVxRGlhbFBlcnNvbmFsIiwic2NvcmVCZXQiLCJkaWFsUmVmcmVzaFRpbWUiLCJnZXQiLCJnZXRJbmRleCIsInBsYXlTb3VuZEVmZmVjdCIsInRhcmdldEFuZ2xlIiwiYWJzIiwicm90YXRlQnkiLCJlYXNpbmciLCJlYXNlRXhwb25lbnRpYWxPdXQiLCJzaG93QXdhcmRCb3giLCJDT05HUkFUVUxBVEUiLCJhd2FyZHR5cGUiLCJDT0lOIiwidmFsdWUiLCJjb2luIiwiZ2V0QkdNVm9sdW1lIiwiX2Vhc2VFeHBvbmVudGlhbE91dE9iaiIsImR0IiwicG93IiwicmV2ZXJzZSIsIl9lYXNlRXhwb25lbnRpYWxJbk9iaiIsImFsbEl0ZW0iLCJpZCIsIml0ZW1faWQiLCJ0b1N0cmluZyIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUMsRUFBRSxDQUFDQyxJQURMO0FBRVJDLElBQUFBLGFBQWEsRUFBRSxDQUFDRixFQUFFLENBQUNHLElBQUosQ0FGUDtBQUdSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssTUFITjtBQUlSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04sRUFBRSxDQUFDTyxXQUFKLENBSkY7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LENBQWtCLEdBQWxCLENBQUQsQ0FBeUJzSCxRQUF6QixFQUFQO0FBQ0gsR0ExWW1CO0FBNFlwQkMsRUFBQUEsU0E1WW9CLHVCQTRZUjtBQUNSLFNBQUs1SCxlQUFMO0FBQ0g7QUE5WW1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsZWZ0YnRuczogY2MuTm9kZSxcclxuICAgICAgICBmbnRfbmVlZFNjb3JlOiBbY2MuRm9udF0sXHJcbiAgICAgICAgc3Bpbl9ub2RlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgaW1nX3NwaW46IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgc3RhcnRfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBpbWdfc3RhcnQ6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgc3RhcnRiZ19ub2RlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgaW1nX3N0YXJ0Ymc6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgb3V0c2lkZV9ub2RlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgaW1nX291dHNpZGU6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgdHVyblRhYmxlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGltZ190dXJuVGFibGU6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgc2VsZWN0UGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgZnVsbFNlcnZpY2U6IGNjLk5vZGUsXHJcbiAgICAgICAgZnVsbFNlcnZpY2VJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIHBlcnNvblJlY29yZDogY2MuTm9kZSxcclxuICAgICAgICBub3BlcnNvblJlY29yZDogY2MuTm9kZSxcclxuICAgICAgICByZWNvcmRJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxhYl9uZWVkU2NvcmU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9teVNjb3JlOiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfZ2V0UnVsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgYWxsR2lmdDogY2MuTm9kZSwvL+i9rOebmOS4iuaJgOacieWbvuagh1xyXG4gICAgICAgIHR1cm5GbGFzaDogY2MuTm9kZSxcclxuICAgICAgICBzcF90dXJuRmxhc2g6IFtzcC5Ta2VsZXRvbkRhdGFdLFxyXG4gICAgICAgIG1hc2tCdXR0b246IGNjLk5vZGUsIC8vIOWxj+iUveaMiemSrlxyXG4gICAgICAgIGRyYXdBdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvaW50X25vZGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBpbWdfcG9pbnQ6IFtjYy5TcHJpdGVGcmFtZV1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIC8vdGhpcy5yZXFEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5pbl90eXBlID0gMDtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJ0VHVyblRhYmxlID0gdHJ1ZTsvL+i9rOebmOi9rOWKqOi/h+eoi+S4remZkOWItueCueWHu1xyXG4gICAgICAgIHRoaXMudGltZSA9IG51bGwgLy/lhajmnI3lpKflpZborrDlvZXliLfmlrBcclxuICAgICAgICB0aGlzLnN3aXRjaFBhbmVsKFwiZnVsbFNlcnZpY2VcIik7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydCA9IHRoaXMuc3RhcnRfbm9kZS5jaGlsZHJlblswXTtcclxuICAgICAgICB0aGlzLnBsYXlCdG5BbmkoKTtcclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlRGlhbFByaXplTGlzdFwiLCB0aGlzLnVwZGF0ZURpYWxQcml6ZUxpc3QsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVG9wUHJpemVcIiwgdGhpcy51cGRhdGVUb3BQcml6ZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJnZXREaWFsUmVzdWx0XCIsIHRoaXMuZ2V0RGlhbFJlc3VsdCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVNeVJlY29yZFwiLCB0aGlzLnVwZGF0ZU15UmVjb3JkLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZURpYWxTY29yZVwiLCB0aGlzLnVwZGF0ZURpYWxTY29yZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcy5yZXFEYXRhLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcImNsb3NlTHVja0RyYXdNYXNrQnV0dG9uXCIsIHRoaXMuY2xvc2VMdWNrRHJhd01hc2tCdXR0b24sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlRGlhbFByaXplTGlzdFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVUb3BQcml6ZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJnZXREaWFsUmVzdWx0XCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZU15UmVjb3JkXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZURpYWxTY29yZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiY2xvc2VMdWNrRHJhd01hc2tCdXR0b25cIiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy/mo4Dmn6XlvZPliY3nuqLngrlcclxuICAgIGNoZWNrUmVkRG90KCl7XHJcbiAgICAgICAgaWYgKCh0aGlzLmRpYWxQcml6ZUxpc3RbMF0uY29uc3VtZV9pbnRlZ3JhbCkuZGl2KDEwMCkgPD0gTnVtYmVyKHRoaXMubGFiX215U2NvcmUuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZWREb3REYXRhLmRpYWxSZWQgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZWREb3REYXRhLmRpYWxSZWQgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiUmVxUmVkRG90XCIpO1xyXG4gICAgfSxcclxuICAgIGNsb3NlTHVja0RyYXdNYXNrQnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMubWFza0J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VHVyblRhYmxlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBwbGF5QnRuQW5pKCl7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuYnRuU3RhcnQucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjM1LDEuMSwxLjEpLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjM1LDEsMSksXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuICAgIC8v55WM6Z2i5oiR55qE56ev5YiG562J5pWw5o2uXHJcbiAgICB1cGRhdGVEaWFsUHJpemVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuZGlhbFByaXplTGlzdCA9IGdsR2FtZS51c2VyLmRpYWxQcml6ZUxpc3Q7XHJcbiAgICAgICAgdGhpcy5sYWJfbmVlZFNjb3JlLnN0cmluZyA9IGAoJHt0aGlzLmdldEZsb2F0KHRoaXMuZGlhbFByaXplTGlzdFt0aGlzLmluX3R5cGVdLmNvbnN1bWVfaW50ZWdyYWwpfeenr+WIhilgO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxJbnRlZ3JhbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXdhcmROdW0oKTtcclxuICAgIH0sXHJcbiAgICAvL+WFqOacjeWkp+WlluiusOW9lVxyXG4gICAgdXBkYXRlVG9wUHJpemUoKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsVG9wUHJpemUgPSBnbEdhbWUudXNlci5kaWFsVG9wUHJpemU7XHJcbiAgICAgICAgaWYodGhpcy5kaWFsVG9wUHJpemUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmRpYWxUb3BQcml6ZVt0aGlzLmRpYWxUb3BQcml6ZS5sZW5ndGggLSAxXS50aW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5YWo5pyN5aSn5aWW6K6w5b2VXCIsdGhpcy5kaWFsVG9wUHJpemUpXHJcbiAgICAgICAgdGhpcy5pbml0VG9wUHJpemUoKTtcclxuICAgIH0sXHJcbiAgICAvL+WImuW8gOWni+eVjOmdoueahOeUn+aIkFxyXG4gICAgaW5pdFRvcFByaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bGxTZXJ2aWNlLmNoaWxkcmVuQ291bnQgIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZEluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZEluZGV4ID0gMTA7XHJcbiAgICAgICAgICAgIGxldCBDb3VudCA9IHRoaXMuZGlhbFRvcFByaXplLmxlbmd0aCA+PSAxMCA/IDEwIDogdGhpcy5kaWFsVG9wUHJpemUubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdWxsU2VydmljZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZ1bGxTZXJ2aWNlSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBmdWxsU2VydmljZUl0ZW0ucGFyZW50ID0gdGhpcy5mdWxsU2VydmljZTtcclxuICAgICAgICAgICAgICAgIC8vZnVsbFNlcnZpY2VJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZGlhbFRvcFByaXplW2ldLm5pY2tuYW1lLCBsYWJfdHlwZSA9IHRoaXMuZGlhbFRvcFByaXplW2ldLmRpYWxfdHlwZSwgcHJpemUgPSB0aGlzLmdldEZsb2F0KHRoaXMuZGlhbFRvcFByaXplW2ldLnByaXplKTtcclxuICAgICAgICAgICAgICAgIGZ1bGxTZXJ2aWNlSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5vdGljZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgYOaBreWWnCA8Y29sb3I9IzBmZTZmZj4ke25hbWV9PC9jb2xvcj7lnKggPGNvbG9yPSNhYjlhZmU+WyR7bGFiX3R5cGV9XTwvYz4g5Lit6I635b6X5aWW5YqxIDxjb2xvcj0jZjRjNDA0PiR7cHJpemV95YWDPC9jPu+8gWA7XHJcbiAgICAgICAgICAgICAgICBmdWxsU2VydmljZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBpICUgMiAhPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCB0aGlzLmZ1bGxTZXJ2aWNlLCAwLjAxLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXlTY3JvbGxOb3RpY2UoKTtcclxuICAgIH0sXHJcbiAgICBwbGF5U2Nyb2xsTm90aWNlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZGlhbFRvcFByaXplLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxUb3BQcml6ZUxvZyh0aGlzLnRpbWUpO1xyXG4gICAgICAgICAgICB9LDUpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgbGV0IHRpbWUgPSBNYXRoLnJhbmRvbSgpICogMiArIDM7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRpbWUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlY29yZEluZGV4ID49IHRoaXMuZGlhbFRvcFByaXplLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxUb3BQcml6ZUxvZyh0aGlzLnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTY3JvbGxOb3RpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuICAgIC8v5Yi35paw6L2s55uY5LiK55qE5pWw5a2XXHJcbiAgICB1cGRhdGVBd2FyZE51bSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWxsR2lmdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGF3YXJkID0gdGhpcy5nZXRGbG9hdCh0aGlzLmRpYWxQcml6ZUxpc3RbdGhpcy5pbl90eXBlXS5pdGVtW2ldLmF3YXJkKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxHaWZ0LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwibnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYXdhcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5Yi35paw6K6w5b2VXHJcbiAgICBhZGRJdGVtKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaWFsVG9wUHJpemVbdGhpcy5yZWNvcmRJbmRleF0pIHJldHVyblxyXG4gICAgICAgIGlmICh0aGlzLmZ1bGxTZXJ2aWNlLmNoaWxkcmVuQ291bnQgPj0gMTApIHRoaXMuZnVsbFNlcnZpY2UuY2hpbGRyZW5bdGhpcy5mdWxsU2VydmljZS5jaGlsZHJlbkNvdW50IC0gMV0uZGVzdHJveSgpO1xyXG4gICAgICAgIGxldCBmdWxsU2VydmljZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZ1bGxTZXJ2aWNlSXRlbSk7XHJcbiAgICAgICAgZnVsbFNlcnZpY2VJdGVtLnBhcmVudCA9IHRoaXMuZnVsbFNlcnZpY2U7XHJcbiAgICAgICAgZnVsbFNlcnZpY2VJdGVtLnNldFNpYmxpbmdJbmRleCgwKVxyXG4gICAgICAgIGZ1bGxTZXJ2aWNlSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5kaWFsVG9wUHJpemVbdGhpcy5yZWNvcmRJbmRleF0ubmlja25hbWUsXHJcbiAgICAgICAgICAgIGxhYl90eXBlID0gdGhpcy5kaWFsVG9wUHJpemVbdGhpcy5yZWNvcmRJbmRleF0uZGlhbF90eXBlLFxyXG4gICAgICAgICAgICBwcml6ZSA9IHRoaXMuZ2V0RmxvYXQodGhpcy5kaWFsVG9wUHJpemVbdGhpcy5yZWNvcmRJbmRleF0ucHJpemUpO1xyXG4gICAgICAgIGZ1bGxTZXJ2aWNlSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5vdGljZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9XHJcbiAgICAgICAgICAgIGDmga3llpwgPGNvbG9yPSMwZmU2ZmY+JHtuYW1lfTwvY29sb3I+IOWcqCA8Y29sb3I9I2FiOWFmZT5bJHtsYWJfdHlwZX1dPC9jPiDkuK3ojrflvpflpZblirEgPGNvbG9yPSNmNGM0MDQ+JHtwcml6ZX3lhYM8L2M+77yBYDtcclxuICAgICAgICBmdWxsU2VydmljZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0aGlzLnJlY29yZEluZGV4ICUgMiAhPSAwO1xyXG4gICAgfSxcclxuICAgIC8v5pu05paw5Liq5Lq66K6w5b2VXHJcbiAgICB1cGRhdGVNeVJlY29yZCgpIHtcclxuICAgICAgICB0aGlzLm15RGlhbFJlY29yZCA9IGdsR2FtZS51c2VyLm15RGlhbFJlY29yZDtcclxuICAgICAgICB0aGlzLnBlcnNvblJlY29yZC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLnBlcnNvblJlY29yZC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMubm9wZXJzb25SZWNvcmQuYWN0aXZlID0gdGhpcy5teURpYWxSZWNvcmQubGVuZ3RoID09IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm15RGlhbFJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVjb3JkSXRlbSk7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0ucGFyZW50ID0gdGhpcy5wZXJzb25SZWNvcmQ7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5teURpYWxSZWNvcmRbaV0uY3JlYXRlX3RpbWU7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0eXBlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5teURpYWxSZWNvcmRbaV0uZGlhbF90eXBlO1xyXG4gICAgICAgICAgICByZWNvcmRJdGVtLmdldENoaWxkQnlOYW1lKFwiY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5teURpYWxSZWNvcmRbaV0ucHJpemUpICsgJ+WFgyc7XHJcbiAgICAgICAgICAgIHJlY29yZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpLmNvbG9yID0gZ2xHYW1lLnBsYXphQ29sb3IuZ2FpbjtcclxuICAgICAgICAgICAgcmVjb3JkSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyICE9IDA7XHJcbiAgICAgICAgICAgIC8vcmVjb3JkSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcywgdGhpcy5wZXJzb25SZWNvcmQsIDAuMDEsIHRydWUpXHJcbiAgICB9LFxyXG4gICAgLy/lvZPliY3miJHnmoTnp6/liIZcclxuICAgIHVwZGF0ZURpYWxTY29yZSgpIHtcclxuICAgICAgICB0aGlzLmxhYl9teVNjb3JlLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZ2xHYW1lLnVzZXIuZGlhbFNjb3JlKTtcclxuICAgICAgICB0aGlzLmNoZWNrUmVkRG90KCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvIDlpZbnu5PmnpxcclxuICAgIGdldERpYWxSZXN1bHQoKSB7XHJcbiAgICAgICAgLy8gLy/ovaznm5jlm5vnp5Llt6blj7Plj6/ku6Xngrnlh7vmir3lpZbmjInpkq5cclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSwgNClcclxuXHJcbiAgICAgICAgdGhpcy5teURpYWxSZXN1bHQgPSBnbEdhbWUudXNlci5teURpYWxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5sYWJfbXlTY29yZS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMubXlEaWFsUmVzdWx0LnRyZWFzdXJlKTtcclxuICAgICAgICB0aGlzLnNldEZsYXNoKHRoaXMuaW5fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ0blN0YXJ0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5jaGlsZHJlblswXS5zZXRTY2FsZSgwLjkpXHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5jaGlsZHJlblsxXS5zZXRTY2FsZSgwLjkpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZShnbEdhbWUuYXVkaW8uZ2V0QkdNKCksIDAuMSk7XHJcbiAgICAgICAgdGhpcy5ydW5UdXJuVGFibGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+ivt+axguiOt+WlluaVsOaNrlxyXG4gICAgcmVxRGlhbCgpIHtcclxuICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHRoaXMuZGlhbFByaXplTGlzdFt0aGlzLmluX3R5cGVdLmNvbnN1bWVfaW50ZWdyYWwpLmRpdigxMDApID4gTnVtYmVyKHRoaXMubGFiX215U2NvcmUuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5MVUNLRFJBVy5TQ09SRU5PVEVOT1VHSCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zdGFydFR1cm5UYWJsZSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGFydFR1cm5UYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFza0J1dHRvbi5hY3RpdmUgPSAhdGhpcy5zdGFydFR1cm5UYWJsZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCflvIDlkK/or7fmsYInKVxyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5pbl90eXBlICsgMTtcclxuICAgICAgICBnbEdhbWUudXNlci5yZXFEaWFsKHR5cGUpO1xyXG4gICAgfSxcclxuICAgIC8v5Yia5byA5aeL6L+b5YWl55WM6Z2i55qE5pWw5o2uXHJcbiAgICByZXFEYXRhKCkge1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxQcml6ZSgpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxUb3BQcml6ZUxvZygpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic2lsdmVyXCI6IGNhc2UgXCJnb2xkXCI6IGNhc2UgXCJkaWFtb25kc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hUYWJsZShuYW1lLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMucmVtb3ZlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3N0YXJ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcURpYWwoKTsgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxTZXJ2aWNlXCI6IGNhc2UgXCJwZXJzb25SZWNvcmRcIjogY2FzZSBcImdldFJ1bGVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoUGFuZWwobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2x1Y2tEcmF3LT5vbkNsaWNrJywgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ovazmjaLovaznm5jpopzoibJcclxuICAgIHN3aXRjaFRhYmxlKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBsZXQgc2VsZWN0VHlwZSA9IHsgXCJzaWx2ZXJcIjogMCwgXCJnb2xkXCI6IDEsIFwiZGlhbW9uZHNcIjogMiB9O1xyXG4gICAgICAgIGxldCBmbGFzaCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJmbGFzaFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGZsYXNoLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBmbGFzaC5zZXRBbmltYXRpb24oMCwgbmFtZSA9PSBcImdvbGRcIiA/IFwiaHVhbmdqaW5cIiA6IFwiYmFpeWluXCIsIGZhbHNlKTtcclxuICAgICAgICBmbGFzaC5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgZmxhc2gubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5fdHlwZSA9IHNlbGVjdFR5cGVbbmFtZV07XHJcblxyXG4gICAgICAgIC8vdGhpcy5pbWdfdHVyblRhYmxlLnNwcml0ZUZyYW1lID0gdGhpcy50dXJuVGFibGVBcnJbdGhpcy5pbl90eXBlXTtcclxuICAgICAgICAvL3RoaXMuaW1nX3RpdGxlLnNwcml0ZUZyYW1lID0gdGhpcy50aXRsZUFyclt0aGlzLmluX3R5cGVdO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlU2tpbih0aGlzLmluX3R5cGUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXdhcmROdW0oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/kv67mlLnova7nm5jnmoTnmq7ogqRcclxuICAgIGNoYW5nZVNraW4oaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNwaW5fbm9kZS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX3NwaW5baW5kZXhdO1xyXG4gICAgICAgIC8vdGhpcy5zdGFydF9ub2RlLnNwcml0ZUZyYW1lID0gdGhpcy5pbWdfc3RhcnRbaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuc3RhcnRiZ19ub2RlLnNwcml0ZUZyYW1lID0gdGhpcy5pbWdfc3RhcnRiZ1tpbmRleF07XHJcbiAgICAgICAgdGhpcy5vdXRzaWRlX25vZGUuc3ByaXRlRnJhbWUgPSB0aGlzLmltZ19vdXRzaWRlW2luZGV4XTtcclxuICAgICAgICB0aGlzLnR1cm5UYWJsZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX3R1cm5UYWJsZVtpbmRleF07XHJcbiAgICAgICAgdGhpcy5wb2ludF9ub2RlLnNwcml0ZUZyYW1lID0gdGhpcy5pbWdfcG9pbnRbaW5kZXhdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFydF9ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0X25vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkU2NvcmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250ID0gdGhpcy5mbnRfbmVlZFNjb3JlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIm5lZWRTY29yZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAoJHt0aGlzLmdldEZsb2F0KHRoaXMuZGlhbFByaXplTGlzdFt0aGlzLmluX3R5cGVdLmNvbnN1bWVfaW50ZWdyYWwpfeenr+WIhilgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TdGFydCA9IHRoaXMuc3RhcnRfbm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUJ0bkFuaSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIh+aNouS4ieS4queVjOmdolxyXG4gICAgc3dpdGNoUGFuZWwobmFtZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZWZ0YnRucy5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IF9jaGlsZHJlbiA9IHRoaXMubGVmdGJ0bnMuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChfY2hpbGRyZW4ubmFtZSA9PSBuYW1lKSBpbmRleCA9IDE7XHJcbiAgICAgICAgICAgIF9jaGlsZHJlbi56SW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuYW1lID09IFwicGVyc29uUmVjb3JkXCIgJiYgIXRoaXMubXlEaWFsUmVjb3JkKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcURpYWxQZXJzb25hbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PSBcImdldFJ1bGVcIiAmJiAhdGhpcy5zY29yZUJldCAmJiAhdGhpcy5kaWFsUmVmcmVzaFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFsUmVmcmVzaFRpbWUgPSBnbEdhbWUudXNlci5nZXQoXCJkaWFsUmVmcmVzaFRpbWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVCZXQgPSBnbEdhbWUudXNlci5nZXQoXCJzY29yZUJldFwiKTtcclxuICAgICAgICAgICAgaWYgKGdsR2FtZS51c2VyLmdldChcImRpYWxSZWZyZXNoVHlwZVwiKSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9nZXRSdWxlLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgYDEu56ev5YiG5q+P5pelJHt0aGlzLmRpYWxSZWZyZXNoVGltZX3ov5vooYzmm7TmlrDvvIzmm7TmlrDml7bvvIzlsIbmnKrkvb/nlKjnmoTnp6/liIbmuIXpm7bjgILnhLblkI7lsIbliY0yNOWwj+aXtuWGheeahOacieaViOaKleazqOi9rOWMluS4uuenr+WIhuOAglxcblxcbjIu56ev5YiG6L2s5YyW5q+U5L6L77ya5pyJ5pWI5oqV5rOoJHt0aGlzLmdldEZsb2F0KHRoaXMuc2NvcmVCZXQpfemHkeW4gT0x56ev5YiG44CCXFxuXFxuMy7ovaznm5jmoaPmrKHotorpq5jvvIzmr4/mrKHmir3lpZbpnIDmtojogJfnmoTnp6/liIbotorlpJrvvIzlpZblirHkuZ/otorpq5hgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9nZXRSdWxlLnN0cmluZyA9IGAxLuavj+aXpeenr+WIhuS8muWunuaXtue7k+eul+WIt+aWsOOAglxcblxcbjIu56ev5YiG6L2s5YyW5q+U5L6L77ya5pyJ5pWI5oqV5rOoJHt0aGlzLmdldEZsb2F0KHRoaXMuc2NvcmVCZXQpfemHkeW4gT0x56ev5YiG44CCXFxuXFxuMy7ovaznm5jmoaPmrKHotorpq5jvvIzmr4/mrKHmir3lpZbpnIDmtojogJfnmoTnp6/liIbotorlpJrvvIzlpZblirHkuZ/otorpq5hgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RQYW5lbC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0UGFuZWwuY2hpbGRyZW5baV0ubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFBhbmVsLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFBhbmVsLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIC8v5ZCv5Yqo6L2s55uYXHJcbiAgICBydW5UdXJuVGFibGUoKSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSA1XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleCgpO1xyXG4gICAgICAgIC8vbGV0IGFuZ2xlID0gbnVsbFxyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5U291bmRFZmZlY3QodGhpcy5kcmF3QXVkaW8pO1xyXG4gICAgICAgIC8vdGhpcy5idG5TdGFydEZsYXNoLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy50dXJuVGFibGUuYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG4gICAgICAgIGlmICh0aGlzLnR1cm5UYWJsZS5hbmdsZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAzNjAgLSAoMTggKyBpbmRleCAqIDM2KSArIDM2MCAqIDM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldEFuZ2xlID0gMzYwIC0gKChpbmRleCArIDEpICogMzYpO1xyXG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gdGFyZ2V0QW5nbGUgLSBNYXRoLmFicyh0aGlzLnR1cm5UYWJsZS5hbmdsZSAlIDM2MCkgKyAxOCArIDM2MCAqIDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHVyblRhYmxlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy50dXJuVGFibGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5yb3RhdGVCeSh0aW1lLCB0aGlzLmFuZ2xlKS5lYXNpbmcodGhpcy5lYXNlRXhwb25lbnRpYWxPdXQoKSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rmxhc2goKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN6KeS5bqmXCIsIHRoaXMudHVyblRhYmxlLmFuZ2xlLCB0aGlzLmFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxRGlhbFBlcnNvbmFsKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KGdsR2FtZS50aXBzLkxVQ0tEUkFXLkNPTkdSQVRVTEFURSwgW3sgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5DT0lOLCB2YWx1ZTogdGhpcy5nZXRGbG9hdCh0aGlzLm15RGlhbFJlc3VsdC5jb2luKSB9XSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoZ2xHYW1lLmF1ZGlvLmdldEJHTSgpLCBnbEdhbWUuYXVkaW8uZ2V0QkdNVm9sdW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TdGFydC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QnRuQW5pKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXJ0LmNoaWxkcmVuWzBdLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXJ0LmNoaWxkcmVuWzFdLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VHVyblRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFza0J1dHRvbi5hY3RpdmUgPSAhdGhpcy5zdGFydFR1cm5UYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZERvdCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICAgICAgLy8gdGhpcy5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRBbmdsZSA9IHRoaXMudHVyblRhYmxlLmFuZ2xlO1xyXG4gICAgICAgIC8vIHRoaXMucmFuZ2UgPSB0aGlzLmFuZ2xlIC0gdGhpcy5zdGFydEFuZ2xlO1xyXG4gICAgICAgIC8vIHRoaXMuZGVsdGEgPSAwO1xyXG4gICAgICAgIC8vIHRoaXMuZHVyYXRpb24gPSA0O1xyXG4gICAgICAgIC8vIHRoaXMuYWJjc3RhcnQgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgc2V0Rmxhc2goaW5kZXggPSBudWxsKXtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudHVybkZsYXNoLmNoaWxkcmVuQ291bnQ7aSsrKXtcclxuICAgICAgICAgICAgaWYoaSA9PSBpbmRleCl0aGlzLnR1cm5GbGFzaC5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMudHVybkZsYXNoLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlYXNlRXhwb25lbnRpYWxPdXQoKSB7XHJcbiAgICAgICAgbGV0IF9lYXNlRXhwb25lbnRpYWxPdXRPYmogPSB7XHJcbiAgICAgICAgICAgIGVhc2luZzogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKC0oTWF0aC5wb3coMiwgLTEwICogZHQpKSArIDEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsT3V0T2JqO1xyXG4gICAgfSxcclxuICAgIC8v5Ye95pWw5oCd5oOzXHJcbiAgICAvLyB1cGRhdGUoZHQpIHtcclxuICAgIC8vICAgICBpZighdGhpcy5hYmNzdGFydClyZXR1cm47XHJcbiAgICAvLyAgICAgdGhpcy5kZWx0YSArPSBkdDtcclxuICAgIC8vICAgICBsZXQgcGVyY2VudCA9IHRoaXMuZGVsdGEgLyB0aGlzLmR1cmF0aW9uO1xyXG4gICAgLy8gICAgIHBlcmNlbnQgPSB0aGlzLmVhc2luZyhwZXJjZW50KTtcclxuICAgIC8vICAgICB0aGlzLnR1cm5UYWJsZS5hbmdsZSA9IHRoaXMuc3RhcnRBbmdsZSArICh0aGlzLmFuZ2xlIC0gdGhpcy5zdGFydEFuZ2xlKSAqIHBlcmNlbnQ7XHJcbiAgICAvLyB9LFxyXG4gICAgLy8gLy/ovazmjaLlvZPliY3mjIfmlbDlh73mlbBcclxuICAgIC8vIGVhc2luZyhkdCkge1xyXG4gICAgLy8gICAgIHJldHVybiBkdCA9PT0gMSA/IDEgOiAoLShNYXRoLnBvdygyLCAtMTAgKiBkdCkpICsgMSk7XHJcbiAgICAvLyB9LFxyXG4gICAgLy/ojrflj5bntKLlvJVcclxuICAgIGdldEluZGV4KCkge1xyXG4gICAgICAgIGxldCBhbGxJdGVtID0gdGhpcy5kaWFsUHJpemVMaXN0W3RoaXMuaW5fdHlwZV0uaXRlbTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFsbEl0ZW1baV0uaWQgPT0gdGhpcy5teURpYWxSZXN1bHQuaXRlbV9pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG59KTtcclxuIl19
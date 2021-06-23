"use strict";
cc._RF.push(module, '3bc59nMYjhNvo+GgGKod9Uk', 'nfish_turntable');
// modules/games/nfish/script/prefab/nfish_turntable.js

"use strict";

//玉如意转盘
var CONST = require("nfishConst");

glGame.baseclass.extend({
  properties: {
    turntablePosList: cc.Node,
    turntable: cc.Node,
    mask_turntable: cc.Node,
    turntableMask: cc.Node,
    turntableBg: cc.Node,
    turntableBg2: cc.Node,
    spine_IdleEffect: cc.Node,
    spine_showEffect: cc.Node,
    //金币银币漂移动画 图集
    moneyEffect_Atlas: {
      "default": null,
      displayName: "moneyEffect_Atlas",
      tooltip: "金币银币漂移动画 图集",
      type: cc.SpriteAtlas
    }
  },
  onLoad: function onLoad() {
    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.isInitIng = false;
  },
  //启动转盘
  initTurntableView: function initTurntableView(res) {
    var _this = this;

    if (res == null || this.isInitIng) {
      return;
    }

    var Normal = 255;
    this.node.opacity = Normal;
    this.node.active = true;

    for (var i = 0; i < this.turntable.childrenCount; i++) {
      var heightLine = this.turntable.children[i].getChildByName("heightLine");
      heightLine.active = false;
    }

    this.turntableMask.getComponent(cc.BlockInputEvents).enabled = true;
    this.isInitIng = true;
    this.node.active = true;
    this.data = res.rewardArray.sort(function (a, b) {
      return a - b;
    }); //奖励列表（聚宝盆、玉如意）

    this.reward = res.rewardMultiple; //最总奖励倍数（聚宝盆、玉如意）

    cc.warn(">>>> 玉如意 转盘 data  ", this.data, " reward ", this.reward);
    this.initTurntableData();
    this.logic.playSpine(this.spine_showEffect, false, true, CONST.SpineName.TurnTableShowTime);
    var BoomHighTime = 0.8;
    var ShowTimeOver = 0.8;
    var NotOpacity = 0;
    var NotScale = 0;
    var NormalOpacity = 255;
    this.turntableBg.scale = NotScale;
    this.turntableBg2.scale = NotScale;
    this.turntable.scale = NotScale;
    this.mask_turntable.scale = NotScale;
    this.turntableBg.opacity = NotOpacity;
    this.turntableBg2.opacity = NotOpacity;
    this.turntable.opacity = NotOpacity;
    this.mask_turntable.opacity = NotOpacity;
    this.spine_IdleEffect.stopAllActions();
    this.spine_IdleEffect.opacity = NotOpacity;
    this.scheduleOnce(function () {
      _this.spine_IdleEffect.opacity = NormalOpacity;

      _this.logic.playSpine(_this.spine_IdleEffect, true, false, CONST.SpineName.TurnTableIdle);
    }, BoomHighTime);
    this.scheduleOnce(function () {
      _this.starTurn(res);

      _this.isInitIng = false;
    }, ShowTimeOver);
  },
  //初始化转盘上面的数字
  initTurntableData: function initTurntableData() {
    var MaxIcon = 8;

    for (var i = 0; i < MaxIcon; i++) {
      var lab_number = this.turntable.getChildByName(i + "").getComponent(cc.Label);
      lab_number.string = this.logic.getFloat(this.data[i]);
    }
  },
  //传入获奖结果获得转盘的index
  getIndex: function getIndex(reward) {
    var MaxIcon = 8;

    for (var i = 0; i < MaxIcon; i++) {
      var lab_number = this.turntable.getChildByName(i + "").getComponent(cc.Label);
      var rewardIndex = lab_number.string;

      if (rewardIndex == this.logic.getFloat(reward)) {
        switch (i) {
          //根据图片金币大小种类规则来
          case 6:
            return 0;

          case 1:
            return 1;

          case 5:
            return 2;

          case 3:
            return 3;

          case 4:
            return 4;

          case 0:
            return 5;

          case 7:
            return 6;

          case 2:
            return 7;
        }
      }
    }
  },
  //开始转动
  starTurn: function starTurn(res) {
    var _this2 = this;

    var NormalScale = 1;
    var NormalOpacity = 255;
    this.turntable.angle = 0;
    this.mask_turntable.angle = 0;
    var index = this.getIndex(this.reward);
    var times = 3;
    var angle = 360 - index * 45 + 360 * times;
    this.node.stopAllActions();
    this.turntableBg.opacity = NormalOpacity;
    this.turntableBg2.opacity = NormalOpacity;
    this.turntable.opacity = NormalOpacity;
    this.mask_turntable.opacity = NormalOpacity;
    this.turntableBg.scale = NormalScale;
    this.turntableBg2.scale = NormalScale;
    this.turntable.scale = NormalScale;
    this.mask_turntable.scale = NormalScale;
    this.turntableBg.stopAllActions();
    this.turntableBg2.stopAllActions();
    this.turntable.stopAllActions();
    var RunTime = 5;
    var WaitTime = 1;
    this.scheduleOnce(function () {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "userYuRuYi"); //玉如意转盘使用
    }, 1);
    this.turntable.runAction(cc.sequence(cc.delayTime(WaitTime), cc.rotateBy(RunTime, angle).easing(this.easeExponentialOut()), cc.delayTime(0.6), cc.callFunc(function () {
      _this2.flyGoldEffect(res, index);
    })));
    this.mask_turntable.stopAllActions();
    this.mask_turntable.runAction(cc.sequence(cc.delayTime(WaitTime), cc.rotateBy(RunTime, angle).easing(this.easeExponentialOut())));
  },
  //漂移金币动画
  flyGoldEffect: function flyGoldEffect(res, index) {
    var _this3 = this;

    glGame.emitter.emit(CONST.clientEvent.fishSound, "yuRuGet"); //玉如意获得

    var glodEndPosPre = this.logic.getIsRotation() ? "glodEndPosR" : "glodEndPos";
    var targetPosition = this.turntablePosList.getChildByName(glodEndPosPre + res.seatNum).position;
    var Multiple = 100;
    var MaxCoin = 70; //最大数量

    var CoinSaclc = 3;
    var effectCoin = Math.ceil(res.rewardGold / Multiple) * CoinSaclc;

    if (effectCoin > MaxCoin) {
      effectCoin = MaxCoin;
    }

    var StartName = 0;
    var endName = 9;
    var plyTime = 8;
    var isHaveZero = false;
    var speed = 0.035;
    var plyedDestroy = false;
    var isRandomPly = 1;
    var RandomOffsexX = 30;
    var RandomOffsexY = 50;
    var RandomMinY = 20;
    var OneDelayTime = 0.01;
    var ScaleToTime = 0.3;
    var BezierToTime = 0.5;
    var ScaleToArg = 0.8;
    var FadeToTime = 0.1;
    var MoveToTime = 0.15;
    var EndOpacity = 255;
    var glodStartPosPre = this.logic.getIsRotation() ? "glodStartPosR" : "glodStartPos";

    for (var i = 0; i < effectCoin; i++) {
      var startPos = this.turntablePosList.getChildByName(glodStartPosPre + parseInt(Math.random() * 5 + 1)).position;
      var ui_CoinEffect = this.logic.creatorEffect();
      ui_CoinEffect.x = startPos.x;
      ui_CoinEffect.y = startPos.y;
      ui_CoinEffect.active = true;
      ui_CoinEffect.parent = null;
      ui_CoinEffect.opacity = 0;
      var playName = "gold";
      ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);
      this.node.addChild(ui_CoinEffect);
      var upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

      if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
        upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
      }

      var bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
      var bounceAct2 = cc.moveTo(MoveToTime, upPos);
      var bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
      var act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));
      ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i * OneDelayTime), bounceAct1, bounceAct2, act));
    }

    var endGlodTime = 2.7; //最后一个金币漂移的时间

    var TurntableFadeTo = 0.6;
    this.turntableBg.stopAllActions();
    this.turntableBg2.stopAllActions();
    this.turntable.stopAllActions();
    this.mask_turntable.stopAllActions();
    this.spine_IdleEffect.stopAllActions();
    var indexNode;

    switch (index) {
      //根据图片金币大小种类规则来
      case 0:
        indexNode = 6;
        break;

      case 1:
        indexNode = 1;
        break;

      case 2:
        indexNode = 5;
        break;

      case 3:
        indexNode = 3;
        break;

      case 4:
        indexNode = 4;
        break;

      case 5:
        indexNode = 0;
        break;

      case 6:
        indexNode = 7;
        break;

      case 7:
        indexNode = 2;
        break;
    }

    var lab_number = this.turntable.getChildByName(indexNode + "").getComponent(cc.Label);
    var heightLine = this.turntable.getChildByName(indexNode + "").getChildByName("heightLine");
    var RepeatTimes = 14;
    var SubTimes = Math.ceil(Number(lab_number.string) / RepeatTimes);
    var currentCoin = Number(lab_number.string); //读数消失

    this.schedule(function () {
      currentCoin -= SubTimes;

      if (currentCoin <= 0) {
        lab_number.string = "0";
      } else {
        lab_number.string = currentCoin + "";
      }
    }, 0.1, RepeatTimes - 1);
    var RepeatBuiBuiBuiTimes = 4;
    this.schedule(function () {
      heightLine.active = !heightLine.active;
    }, 0.3, RepeatBuiBuiBuiTimes - 1);
    this.turntableBg.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.fadeTo(TurntableFadeTo, 0), cc.callFunc(function () {
      _this3.logic.isYuRuyiRuning = false;
      _this3.turntableMask.getComponent(cc.BlockInputEvents).enabled = false;
      var Not = 0;
      _this3.node.opacity = Not;
      _this3.node.active = false;

      if (_this3.logic.seatNum == res.seatNum) {
        glGame.emitter.emit(CONST.clientEvent.addGoldEffect, res);
      }
    })));
    this.turntableBg2.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.fadeTo(TurntableFadeTo, 0)));
    this.turntable.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.fadeTo(TurntableFadeTo, 0)));
    this.mask_turntable.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.fadeTo(TurntableFadeTo, 0)));
    this.spine_IdleEffect.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.fadeTo(TurntableFadeTo, 0)));
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
  OnDestroy: function OnDestroy() {
    this.logic = null;
  }
});

cc._RF.pop();
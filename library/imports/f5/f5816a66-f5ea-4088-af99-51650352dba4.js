"use strict";
cc._RF.push(module, 'f5816pm9epAiK+ZUWUDUtuk', 'nfish_cornucopia');
// modules/games/nfish/script/prefab/nfish_cornucopia.js

"use strict";

var CONST = require("nfishConst"); //拉霸


glGame.baseclass.extend({
  properties: {
    nodeNumber: cc.Node,
    nodeView: cc.Node,
    door: cc.Node,
    img_door_open: cc.Node,
    img_door_close: cc.Node,
    // litght: cc.Node,
    spine_boom: cc.Node,
    mask: cc.Node,
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

    this.stopTime = -1;
    this.runSpeed = 0;
    this.nodeView.scale = 0;
    this.node.stopAllActions();
    this.node.scale = 1;
    this.cuarr_gonudaner = 1;
    this.strobeFrequency = 0.1;
    this.strobeTime = 1;
    this.data = null;
  },
  //开始拉霸
  startRunCornucopia: function startRunCornucopia(res) {
    var _this = this;

    var fontIndex = this.logic.getRandomNum(1, 8);

    for (var i = 1; i < 9; i++) {
      this.door.getChildByName("img_font" + i).active = i == fontIndex;
    }

    this.node.active = true;
    this.node.getChildByName("mask").getComponent(cc.BlockInputEvents).enabled = true;
    this.data = res;
    this.mask.active = true;
    this.mask.getComponent(cc.Widget).updateAlignment();
    var Normal = 255;
    this.nodeView.scale = 0;
    this.node.opacity = Normal;
    this.spine_boom.active = false;
    this.logic.playSpine(this.node.getChildByName("spine_show"), false, true, CONST.SpineName.TurnTableShowTime);
    this.nodeView.stopAllActions();
    this.nodeView.runAction(cc.sequence(cc.delayTime(0.1), cc.scaleTo(0.15, 1.2), cc.scaleTo(0.15, 1)));
    this.door.active = true;
    this.door.stopAllActions();
    this.door.setPosition(this.img_door_close.position);
    var MaxNum = 6;

    for (var _i = 0; _i < MaxNum; _i++) {
      var num = this.nodeNumber.getChildByName("" + _i);
      var top_num = this.nodeNumber.getChildByName("t_" + _i);
      top_num.getComponent(cc.Label).string = this.logic.getRandomNum(1, 9);
      num.getComponent(cc.Label).string = "0";
    }

    this.door.runAction(cc.sequence(cc.delayTime(0.7), cc.moveTo(0.3, this.img_door_open.position), cc.callFunc(function () {
      var Count = 7;
      var Frequency = 0.65;
      var StartTimes = 1;
      var reward = parseInt(_this.logic.getFloat(res.rewardGold));
      var str_reward = reward.toString();
      var numCount = MaxNum - str_reward.length;

      for (var _i2 = 0; _i2 < numCount; _i2++) {
        str_reward = "0" + str_reward;
      }

      for (var _i3 = 0; _i3 < MaxNum; _i3++) {
        var _num = _this.nodeNumber.getChildByName("" + _i3);

        var _top_num = _this.nodeNumber.getChildByName("t_" + _i3);

        _num.stopTime = _top_num.stopTime = (Count - (StartTimes + _i3)) * Frequency; //单个停止时间

        _num.num = _top_num.num = str_reward.charAt(_i3);
      }

      _this.stopTime = 4; //所有停止时间

      _this.runSpeed = 1000; //运行速度
    })));
  },
  update: function update(dt) {
    var _this2 = this;

    var NumMax = 6;
    var Offsex = 160;
    var Speed = 260;

    if (this.stopTime > 0) {
      var LightNum = 4;

      if (this.runSpeed < 2600) {
        this.runSpeed += dt * Speed;
      }

      for (var i = 0; i < NumMax; i++) {
        var num = this.nodeNumber.getChildByName("" + i);
        var top_num = this.nodeNumber.getChildByName("t_" + i);

        if (num.stopTime != null) {
          if (num.stopTime > 0) {
            num.stopTime -= dt;
            num.getComponent(cc.Label).string = this.logic.getRandomNum(i == 0 ? 1 : 0, 9);
            num.y -= dt * this.runSpeed;

            if (num.y <= -Offsex) {
              num.y = Offsex;
            }
          } else {
            num.stopTime = null;
            num.y = 0;
            num.getComponent(cc.Label).string = num.num;
            glGame.emitter.emit(CONST.clientEvent.fishSound, "juBaoShowNum"); //聚宝盆显示数字
          }
        }

        if (top_num.stopTime != null) {
          if (top_num.stopTime > 0) {
            top_num.stopTime -= dt;
            top_num.getComponent(cc.Label).string = this.logic.getRandomNum(i == 0 ? 1 : 0, 9);
            top_num.y -= dt * this.runSpeed;

            if (top_num.y <= -Offsex) {
              top_num.y = Offsex;
            }
          } else {
            top_num.y = Offsex;
            top_num.getComponent(cc.Label).string = num.num;
          }
        }
      }

      this.stopTime -= dt;
    } else {
      if (this.stopTime > -1) {
        this.stopTime = -1;

        for (var _i4 = 0; _i4 < NumMax; _i4++) {
          var _num2 = this.nodeNumber.getChildByName("" + _i4);

          var _top_num2 = this.nodeNumber.getChildByName("t_" + _i4);

          _num2.getComponent(cc.Label).string = _num2.num;
          _num2.y = 0;
          _top_num2.y = Offsex;
        }

        this.door.runAction(cc.sequence(cc.moveTo(0.7, this.img_door_open.position), cc.callFunc(function () {
          _this2.flyGoldEffect(_this2.data);
        })));
      }
    }
  },
  //漂移金币动画
  flyGoldEffect: function flyGoldEffect(res) {
    var _this3 = this;

    glGame.emitter.emit(CONST.clientEvent.fishSound, "juBaoGet"); //聚宝盆获得

    this.logic.playSpine(this.spine_boom, false, false, CONST.SpineName.Normal);
    var glodEndPosPer = this.logic.getIsRotation() ? "glodEndPosR" : "glodEndPos";
    var targetPosition = this.node.getChildByName("posList").getChildByName(glodEndPosPer + res.seatNum).position;
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
    var TwoDelayTime = 0.05;
    var ScaleToTime = 0.3;
    var BezierToTime = 0.5;
    var ScaleToArg = 0.8;
    var FadeToTime = 0.1;
    var MoveToTime = 0.15;
    var EndOpacity = 255;
    var glodStartPer = this.logic.getIsRotation() ? "glodStartPosR" : "glodStartPos";

    var _loop = function _loop(i) {
      var startPos = _this3.node.getChildByName("posList").getChildByName(glodStartPer + parseInt(Math.random() * 5 + 1)).position;

      var ui_CoinEffect = _this3.logic.creatorEffect();

      ui_CoinEffect.x = startPos.x;
      ui_CoinEffect.y = startPos.y;
      ui_CoinEffect.active = true;
      ui_CoinEffect.parent = null;
      ui_CoinEffect.opacity = 0;
      var playName = "gold";
      ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(_this3.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);

      _this3.node.addChild(ui_CoinEffect);

      var upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

      if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
        upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
      }

      var bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
      var bounceAct2 = cc.moveTo(MoveToTime, upPos);
      var bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
      var act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));
      ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i * OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(TwoDelayTime), cc.callFunc(function () {
        ui_CoinEffect.destroy();
      })));
    };

    for (var i = 0; i < effectCoin; i++) {
      _loop(i);
    }

    var endGlodTime = 1; //最后一个金币漂移的时间

    var CornucopiaScaleToArg = 0;
    var CornucopiaScaleToTime = 0.3;
    this.door.runAction(cc.sequence(cc.delayTime(endGlodTime), cc.moveTo(1, this.img_door_close.position), cc.callFunc(function () {
      _this3.node.stopAllActions();

      _this3.node.runAction(cc.sequence(cc.delayTime(endGlodTime / 2), cc.fadeTo(CornucopiaScaleToTime, CornucopiaScaleToArg), cc.callFunc(function () {
        _this3.logic.isYuRuyiRuning = false;
        _this3.mask.active = false;

        if (_this3.logic.seatNum == res.seatNum) {
          glGame.emitter.emit(CONST.clientEvent.addGoldEffect, res);
        }
      })));
    })));
  }
});

cc._RF.pop();
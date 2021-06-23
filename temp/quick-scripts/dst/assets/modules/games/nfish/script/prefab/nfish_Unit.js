
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_Unit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28e75A44DNHCqEya9za3tOV', 'nfish_Unit');
// modules/games/nfish/script/prefab/nfish_Unit.js

"use strict";

/***
 *  捕鱼：鱼，初始化 播放图片、移动（同步状态）
 * **/
var CONST = require("nfishConst");

glGame.movieClip.extend({
  onLoad: function onLoad() {
    this.initFishMovieClip(); //调用基类的初始化动画方法

    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.whirlpool = null;
    this.fishData = null;
    this._bUpdate = false;
    this.moveList = null;
    this.posArray = null;
    this.isHit = false;
    this.hitTime = 0;
    this.isPlayStartMc = false;
    this.addSpeed = 0;
    this.showBubblesTime = 1;
    this.closeBubblesTime = -1;
    this.isQuickDie = false;
    this.isPlayerSound = false;
    this.isShowTip = false;
    this.cantainerName = null;
  },
  //初始化鱼
  initFish: function initFish(fishData) {
    // this.node.getChildByName("bg").active = false;
    this.hideTip();
    this.fishData = JSON.parse(JSON.stringify(fishData));
    this.moveList = this.fishData.moveList;
    this.posArray = this.fishData.posArray;
    this.showTime = this.fishData.showTime; //配置表默认 等待 时间

    this.localFishData = this.logic.json_fishTable[this.fishData.fishTypeId + ""];
    this.resGroupId = this.localFishData.resGroupId;
    this.fishResData = this.logic.json_fishResEdit["fish" + this.resGroupId];
    this.runTime = this.fishData.runTime; //总时间

    this._time = Date.now();
    this.node.x = this.posArray[0].x;
    this.node.y = this.posArray[0].y;
    var fishLocalData = this.logic.json_fishTable[this.fishData.fishTypeId + ""];
    this.node.zIndex = fishLocalData.resHierarchy;

    if (this.fishData.frequency != undefined) {
      this.runSpeed = this.localFishData.frameRate * this.fishData.frequency * CONST.Runfrequency;
    }

    var liveTime = (fishData.serverTime - fishData.createTime) / 1000; //出生时间

    this._allTime = Number(this.runTime + this.showTime + ""); //最大寿命时间

    var newLiveTime = Math.abs(liveTime); //矫正 已经出生时间

    if (liveTime < 0) {
      //没出生
      this.showTime += newLiveTime;
      this._startTime = 0;
    } else {
      var _newLiveTime = Math.abs(liveTime); //矫正 已经出生时间


      if (_newLiveTime >= this._allTime) {
        this.death(CONST.dieType0);
        return;
      }

      if (_newLiveTime > this.showTime) {
        this._startTime = _newLiveTime - this.showTime;
      } else {
        this.showTime -= _newLiveTime;
        this._startTime = 0;
      }
    }

    if (this._startTime > 0) {
      this.startMove(); //直接开始移动
    } else {
      this._bUpdate = true;
    }
  },
  startMove: function startMove() {
    this.setBoxColliderSizeOffsetAndAnchor();
    this.node.getComponent(cc.Sprite).enabled = true;
    this._time = Date.now();
    this.startFishRuning();
    this.isPlayStartMc = true;
    this.showTime = -1;
    this._bUpdate = true;
    var NotSay = 0;
    var ChatVoiceType2 = 2;
    var FishRunTime = this.runTime;

    if (Number(this.localFishData.chatVoiceType) != NotSay || Number(this.localFishData.chatVoiceType) != ChatVoiceType2) {
      var P20 = FishRunTime * 0.2;
      var P40 = FishRunTime * 0.35; //计算运行时间 根据规则需要运行到 20-40% 的区间才可以播放

      this.showBubblesTime = -Math.abs(this.logic.getRandomNum(P20, P40));
    }

    if (this.logic.getIsRotation()) {
      this.node.oldScaleY = -this.node.scaleY;
      this.node.scaleY = this.node.oldScaleY;
    }
  },
  move: function move(dt) {
    //是否可以开始计时
    if (this.moveList && this.showTime > -1) {
      this.showTime -= dt;

      if (this.showTime <= 0) {
        this.startMove(); //开始移动
      }
    } //移动


    if (this._bUpdate && this.moveList && this.showTime <= 0) {
      var l_time = Date.now();
      this._startTime = this._startTime + (l_time - this._time) / 1000 + this._startTime * this.addSpeed;
      this._time = l_time; //二阶贝塞尔曲线运动

      this.timeIndex = this.getIndexByTime(this._startTime);

      if (this.timeIndex == -1) {
        //到尽头了，销毁
        this.death(CONST.dieType0);
        return;
      }

      var t;
      var currTime;
      var nextTime;

      if (this.lastIndex == null || this.timeIndex != this.lastIndex) {
        currTime = this.getTimeByIndex(this.timeIndex);
        nextTime = this.getTimeByIndex(this.timeIndex + 1);
        this.currTime = currTime;
        this.nextTime = nextTime;
      } else {
        currTime = this.currTime;
        nextTime = this.nextTime;
      }

      var fz = this._startTime - currTime;
      var fm = nextTime - currTime;
      t = fz / fm;
      var FIRST = 2;
      var SCENT = 3;
      var Bz_OnePos = 0;
      var Bz_TowPos = 1;
      var Bz_ThreePos = 2;
      var i = this.timeIndex > 0 ? SCENT * this.timeIndex : FIRST * this.timeIndex;
      var a = this.posArray[i + Bz_OnePos];
      var b = this.posArray[i + Bz_TowPos];
      var c = this.posArray[i + Bz_ThreePos];

      if (!a) {
        //拿不到数据，到尽头了，销毁
        this.death(CONST.dieType0);
        return;
      } //轨迹运动


      var x = (Math.pow(1 - t, 2) * a.x + 2 * t * (1 - t) * b.x + Math.pow(t, 2) * c.x) * this.logic.gameZoomX;
      var y = (Math.pow(1 - t, 2) * a.y + 2 * t * (1 - t) * b.y + Math.pow(t, 2) * c.y) * this.logic.gameZoomY; //设置朝向

      var newAngle = this.setAngle(x, y, this.node.position);

      if (this.localFishData.fixedResource != 1) {
        this.node.angle = newAngle;
      }

      this.node.x = x;
      this.node.y = y;
      this.lastIndex = this.timeIndex;
    }
  },
  //冰冻/解冻
  settingIcing: function settingIcing(isInFreeze) {
    if (isInFreeze) {
      this._time = Date.now();
    }

    this._bUpdate = isInFreeze;
  },
  //快速移动
  quickDie: function quickDie() {
    var _this = this;

    var islow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (this._bUpdate) {
      this.isQuickDie = true;
      this.runSpeed = islow ? 0.0003 : 0.0004; //加快帧播放 原来 0.0166

      this.addSpeed = islow ? 0.02 : 0.003;
      var collider = this.node.getComponent(cc.BoxCollider);

      if (collider) {
        collider.enabled = false;
      }

      this.node.stopAllActions();
      var OneTime = 3;
      this.node.runAction(cc.sequence(cc.delayTime(OneTime), cc.fadeTo(0.5, 0), cc.callFunc(function () {
        _this.dispose();
      })));
    }
  },
  //是否正在快速移动死亡
  isWellDie: function isWellDie() {
    return !this.isQuickDie;
  },
  //设定锁定鱼是自己
  lockSelf: function lockSelf() {
    var nameID = Number(this.node.name);

    if (this.logic.lockFishID != nameID) {
      glGame.emitter.emit(CONST.clientEvent.playLockSpine);
    }

    this.logic.lockFishID = nameID; // cc.error(">> 锁定 1  ",this.logic.lockFishID , " id ",this.getFishID());

    this.logic.isAuto = true;
    glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
  },
  //获取鱼线id 锁定、碰撞、死亡 等使用
  getFishID: function getFishID() {
    if (this.fishData != null) {
      return Number(this.fishData.id);
    }

    return null;
  },
  //循环体
  update: function update(dt) {
    //播放游的动画
    if (this.isPlayStartMc) {
      this.playFishMovieClip(dt);
    } //移动


    this.move(dt); //子弹碰撞 变色 恢复颜色

    if (this.isHit) {
      this.hitTime -= dt;

      if (this.hitTime < 0) {
        this.isHit = false;
        this.node.color = CONST.HitColor.Normal;
      }
    }

    if (this.showBubblesTime != 1) {
      this.showBubblesTime += dt;

      if (this.showBubblesTime >= 0) {
        this.showBubblesTime = 1;
        this.startTalk(false, false); //鱼游到屏幕
      }
    }

    if (this.closeBubblesTime > -1) {
      this.closeBubblesTime -= dt;

      if (this.closeBubblesTime <= 0) {
        this.hideTip();
        this.closeBubblesTime = -1;
      }
    }

    if (this.logic != null && this.logic.lockFishID != null && this.logic.lockFishID == Number(this.node.name)) {
      if (!this.logic.getClickArea(this.node.position, this.node.width, this.node.height)) {
        // cc.error(">> 解锁 9 "+this.logic.lockFishID)
        this.logic.lastLockFishID = Number(this.logic.lockFishID + "");
        this.logic.lockFishID = null;
        this.logic.lockFishIndex = null;

        if (this.logic.isLockAutoChange == false) {
          this.logic.isAuto = false;
          glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
        }
      }
    }
  },
  //获取时间
  getIndexByTime: function getIndexByTime(existTime) {
    var HALF = 2;
    var OFFSEX = 1;
    var Not = -1;
    var time = 0;

    for (var i = 0; i < this.moveList.length / HALF; i++) {
      time = time + this.moveList[HALF * i] + this.moveList[HALF * i + OFFSEX];

      if (time >= existTime) {
        return i;
      }
    }

    return Not;
  },
  //获取时间
  getTimeByIndex: function getTimeByIndex(index) {
    var HALF = 2;
    var OFFSEX = 1;
    var time = 0;

    for (var i = 0; i < this.moveList.length / HALF; i++) {
      if (i == index) {
        break;
      }

      time = time + this.moveList[HALF * i] + this.moveList[HALF * i + OFFSEX];
    }

    return time;
  },
  //设置碰撞胶囊大小
  setBoxColliderSizeOffsetAndAnchor: function setBoxColliderSizeOffsetAndAnchor() {
    var collider = this.node.getComponent(cc.BoxCollider);

    if (!collider) {
      collider = this.node.addComponent(cc.BoxCollider);
    }

    collider.enabled = true;

    if (this.fishResData) {
      this.node.anchorX = this.fishResData.anchorX;
      this.node.anchorY = this.fishResData.anchorY;
      collider.offset = cc.v2(this.fishResData.offsetX, this.fishResData.offsetY);
      collider.size = cc.size(this.fishResData.sizeW, this.fishResData.sizeH);
    }

    collider.tag = this.getFishID() + "";
    this.node.name = "" + this.getFishID();
  },
  //受击
  hit: function hit() {
    var HitLongTime = 0.08;
    this.node.color = CONST.HitColor.Attack;
    this.hitTime = HitLongTime;
    this.isHit = true;
    this.startTalk(true, false); //鱼被击中
  },
  setAngle: function setAngle(x2, y2, point) {
    var x1 = point.x;
    var y1 = point.y;
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    this.setscale(angle);
    return angle;
  },
  // 开始说话 isAttack = true 是被击中时候的时候  ，  death = true 死亡的时候
  // ChatVoiceType:
  // 0=不播放聊天及语音
  // 1=入场屏幕20%~40%，20%随机播放音效及聊天
  // 2=死亡仅播放音效
  // 3=入场屏幕20%~40%，必然播放聊天和音效
  // 4=入场屏幕20%~40%，50%概率播放聊天和音效
  // 5=入场屏幕20%~40%，25%概率播放聊天和音效
  // 6=入场屏幕20%~40%，被击中时，播放聊天和音效
  startTalk: function startTalk() {
    var isAttack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var death = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    //test代码
    // if(this.localFishData == null || this.localFishData.chatBubble == -1){
    //     return;
    // }
    if (!this._bUpdate) {
      return;
    }

    if (!this.isPlayStartMc) {
      return;
    }

    if (this.logic == undefined || this.logic.playSoundTime == undefined) {
      return;
    }

    var GAPTIME = 10; //上一次播放时间和当前时间的间隔

    var lastPlayTime = (Date.now() - this.logic.playSoundTime) / 1000;

    if (this.localFishData == null || this.localFishData.chatBubble == -1 || this.isPlayerSound || lastPlayTime < GAPTIME) {
      return;
    }

    this.isPlayerSound = true;
    var ChatVoiceType1 = 1;
    var ChatVoiceType2 = 2;
    var ChatVoiceType3 = 3;
    var ChatVoiceType4 = 4;
    var ChatVoiceType5 = 5;
    var ChatVoiceType6 = 6;
    var BasePercentageFactor = 100;
    var FishRunTime = this.runTime;

    if (death) {
      this.isShowTip = true;
    }

    if (isAttack) {
      var P20 = FishRunTime * (20 / BasePercentageFactor);
      var P40 = FishRunTime * (40 / BasePercentageFactor);

      if (Number(this.localFishData.chatVoiceType) == ChatVoiceType6 && this._startTime > P20 && this._startTime < P40) {
        this.isShowTip = true;
      } else {
        return;
      }
    }

    if (Number(this.localFishData.chatVoiceType) == ChatVoiceType3) {
      this.isShowTip = true;
    }

    var IsShow = Math.random() * BasePercentageFactor;
    var P1_20 = 20 / BasePercentageFactor;
    var P4_20 = 50 / BasePercentageFactor;
    var P5_20 = 25 / BasePercentageFactor;

    switch (Number(this.localFishData.chatVoiceType)) {
      case ChatVoiceType1:
        if (IsShow > P1_20) {
          this.isShowTip = true;
        }

        break;

      case ChatVoiceType4:
        if (IsShow > P4_20) {
          this.isShowTip = true;
        }

        break;

      case ChatVoiceType5:
        if (IsShow > P5_20) {
          this.isShowTip = true;
        }

        break;
    }

    if (this.isShowTip) {
      this.showTip();
    }
  },
  //显示气泡
  showTip: function showTip() {
    this.closeBubblesTime = 5;
    this.logic.playSoundTime = Date.now();
    var FishVoice = "voiceFile";
    glGame.emitter.emit(CONST.clientEvent.fishSound, FishVoice + this.localFishData.voiceFile);
    var text;

    if (this.localFishData.chatBubble.indexOf("&&") != -1) {
      var str = (this.localFishData.chatBubble + "").split("&&");
      text = str[0] + "\n" + str[1];
    } else {
      text = this.localFishData.chatBubble;
    }

    glGame.emitter.emit(CONST.clientEvent.followFishTip, {
      id: this.node.name,
      text: text,
      time: CONST.TipTime,
      size: this.node.getComponent(cc.Sprite).spriteFrame.getOriginalSize(),
      direction: this.posArray[0].x > 0 // data:this.localFishData,

    });
  },
  setscale: function setscale(angle) {
    var Normal = 1;
    var GoBack = -1;
    var oneX = this.posArray[0].x;

    if (this.logic.getIsRotation()) {
      if (this.localFishData.fixedResource == 1 && oneX > 0) {
        //悬浮鱼类特殊处理
        this.node.scaleY = GoBack;
        this.node.scaleX = oneX > 0 ? GoBack : Normal;
      } else {
        this.node.scaleY = oneX > 0 ? Normal : GoBack;
      }
    } else {
      if (this.localFishData.fixedResource == 1 && oneX > 0) {
        //悬浮鱼类特殊处理
        this.node.scaleY = Normal;
        this.node.scaleX = oneX > 0 ? GoBack : Normal;
      } else {
        this.node.scaleY = oneX > 0 ? GoBack : Normal;
      }
    } // if(this.isShowTip)this.setTipText(angle);

  },
  //设置tip
  setTipText: function setTipText(angle) {
    if (this.localFishData == null || this.localFishData.chatBubble == -1) {
      return;
    }

    var oneX = this.posArray[0].x;
    var bgAngle = 0;
    var desc = "";

    if (this.logic.getIsRotation()) {
      if (oneX > 0) {
        if (this.localFishData.fixedResource == 1) {
          //悬浮鱼类特殊处理
          desc = "A-f";
        } else {
          bgAngle = -angle;
          desc = "A";
        }

        this.cantainerName = "A";
      } else {
        if (this.localFishData.fixedResource == 1) {
          //悬浮鱼类特殊处理
          desc = "B-f";
        } else {
          bgAngle = angle;
          desc = "B";
        }

        this.cantainerName = "B";
      }
    } else {
      if (oneX > 0) {
        if (this.localFishData.fixedResource == 1) {
          //悬浮鱼类特殊处理
          desc = "C-f";
        } else {
          desc = "C";
          bgAngle = angle;
        }

        this.cantainerName = "C";
      } else {
        if (this.localFishData.fixedResource == 1) {
          //悬浮鱼类特殊处理
          desc = "D-f";
        } else {
          desc = "D-f";
          bgAngle = -angle;
        }

        this.cantainerName = "D";
      }
    }

    var cantainer = this.node.getChildByName("cantainer" + this.cantainerName);
    var lab = cantainer.getChildByName("bg").getChildByName("lab");

    if (cantainer.width == 0 && this.node.getComponent(cc.Sprite).spriteFrame != null) {
      var size = this.node.getComponent(cc.Sprite).spriteFrame.getOriginalSize();
      cantainer.active = true;
      cantainer.width = size.width;
      cantainer.height = size.height;

      if (this.localFishData.chatBubble.indexOf("&&") != -1) {
        var str = (this.localFishData.chatBubble + "").split("&&");
        lab.getComponent(cc.Label).string = str[0] + "\n" + str[1];
      } else {
        lab.getComponent(cc.Label).string = this.localFishData.chatBubble;
      }
    }

    if (this.logic.getIsRotation()) {
      if (this.localFishData.fixedResource == 1) {
        //悬浮鱼类特殊处理
        if (oneX > 0) {
          // lab.getComponent(cc.Label).string = "- A-1 -";
          lab.scaleY = 1;
        } else {
          // lab.getComponent(cc.Label).string = "- B-1 -";
          lab.scaleY = 1;
        }
      } else {
        if (oneX > 0) {
          // lab.getComponent(cc.Label).string = "- A-2 TTT -";
          lab.scaleX = -1;
        } else {// lab.getComponent(cc.Label).string = "- B-2 -";
        }
      }
    } else {
      if (this.localFishData.fixedResource == 1) {
        //悬浮鱼类特殊处理
        if (oneX > 0) {
          // lab.getComponent(cc.Label).string = "- C-1 -";
          lab.scaleX = -1;
        } else {// lab.getComponent(cc.Label).string = "- D-1 -";
        }
      } else {
        if (oneX > 0) {
          lab.scaleY = -1; // lab.getComponent(cc.Label).string = "- C-2 -";
        } else {// lab.getComponent(cc.Label).string = "- D-2 -";
          }
      }
    }

    if (this.localFishData.fixedResource != 1) {
      cantainer.angle = bgAngle;
    }
  },
  //隐藏Tip
  hideTip: function hideTip() {
    this.isShowTip = false; // let cantainer = this.node.getChildByName("cantainer" + this.cantainerName);
    // if(cantainer){
    //     cantainer.active = false;
    // }
  },
  //死亡 - 开始 dieType: 0 自然死亡 1玩家攻击 2全屏炸弹 3闪电  4旋涡 delayDieTime 延迟死亡
  death: function death(dieType) {
    var _this2 = this;

    var seatNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var delayDieTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    glGame.emitter.emit(CONST.clientEvent.clearFollowFishTip, {
      fishId: this.getFishID() + ""
    });

    if (delayDieTime > 0) {
      this.scheduleOnce(function () {
        _this2.deathNext(dieType, seatNum);
      }, delayDieTime);
    } else {
      this.deathNext(dieType, seatNum);
    }
  },
  //死亡 - 开始 dieType: 0 自然死亡 1玩家攻击 2全屏炸弹 3闪电  4旋涡
  deathNext: function deathNext(dieType) {
    var _this3 = this;

    var seatNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    glGame.emitter.emit(CONST.clientEvent.clearFollowFishTip, {
      fishId: this.getFishID() + ""
    });
    this.hideTip();
    this.node.getComponent(cc.BoxCollider).enabled = false; //播放死亡动画开始 结束后调用 dispose

    this.isStart = false;
    this._bUpdate = false;

    if (this.lockBulletList && this.lockBulletList.length > 0) {
      var len = this.lockBulletList.length;

      for (var i = 0; i < len; i++) {
        this.lockBulletList[i].getComponent("nfish_Bullet").deathFish(this.getFishID());
      }
    }

    if (dieType != CONST.dieType0 && this.localFishData.shock == 1) {
      glGame.emitter.emit(CONST.clientEvent.onSshock);
    }

    this.lockBulletList = null;

    if (dieType == CONST.dieType1) {
      this.isHit = false;
      this.node.color = CONST.HitColor.Deat;
      var TIME = 0.8;
      var EndAngle;
      var SX = 0;
      var act;

      if (this.logic.getIsRotation()) {
        EndAngle = -360 * 3;
        act = cc.spawn(cc.scaleTo(TIME, SX), cc.rotateTo(TIME, EndAngle));
      } else {
        EndAngle = -360 * 3;
        act = cc.spawn(cc.scaleTo(TIME, SX), cc.rotateTo(TIME, EndAngle));
      }

      this.startTalk(false, true); //鱼被玩家打死

      this.node.stopAllActions();
      this.node.runAction(cc.sequence(act, cc.callFunc(function () {
        _this3.dispose();
      })));
    } else if (dieType == CONST.dieType3) {
      var oldAngle = this.node.angle + "";
      var angle = this.node.angle > 0 ? this.node.angle - 20 : this.node.angle + 20;

      var _act = cc.sequence(cc.rotateTo(0.1, angle), cc.rotateTo(0.1, Number(oldAngle)));

      this.node.stopAllActions();
      this.node.runAction(cc.sequence(cc.repeat(_act, 7), cc.scaleTo(1, 0), cc.callFunc(function () {
        _this3.dispose();
      })));
    } else if (dieType == CONST.dieType4) {
      this.node.stopAllActions();

      var _act2 = cc.spawn(cc.scaleTo(2, 0.01, 0.01), cc.repeat(cc.rotateBy(0.5, 360), 5), cc.sequence(cc.moveTo(0.6, this.node.x + 9, this.node.y - 9), cc.moveTo(0.6, this.node.x - 9, this.node.y + 9)));

      this.node.runAction(cc.sequence(_act2, cc.callFunc(function () {
        _this3.dispose();
      })));
    } else {
      this.dispose();
    }
  },
  //卸载自己
  dispose: function dispose() {
    this.clearTideCorrect();
    var fishID = Number(this.getFishID() + "");
    glGame.emitter.emit(CONST.clientEvent.clearFollowFishTip, {
      fishId: this.getFishID() + ""
    });
    this.fishData = null;
    this._bUpdate = false;
    this.moveList = null;
    this.posArray = null;
    if (this.whirlpool) this.whirlpool.destroy();

    if (this.node.parent) {
      this.node.parent.removeChild(this.node);
    } // this.node.destroy();


    if (!this.isQuickDie) {
      glGame.emitter.emit(CONST.clientEvent.disposeFishNode, fishID);
    }

    if (this.logic) {
      var ind = this.logic.bossIDList.indexOf(fishID);

      if (ind != -1) {
        this.logic.bossIDList.splice(ind, 1); //如有boss 死亡的时候就删除
      }

      this.node.off(cc.Node.EventType.TOUCH_START);
      this.logic.fishPool.put(this.node);
    }

    this.logic = null;
  },
  //延迟销毁
  delayDestroy: function delayDestroy(i) {
    var _this4 = this;

    var delayTime = 0.01 + 0.1 * i;
    var MaxTime = 3;

    if (delayTime > MaxTime) {
      delayTime = Math.random() * MaxTime;
    }

    this.scheduleOnce(function () {
      if (_this4.node != null) {
        _this4.node.destroy();
      }
    }, delayTime);
  },
  OnDestroy: function OnDestroy() {
    this.moveList = [];
    this.logic = null;
    this.fishData = null;
    this.posArray = null;
    this.isHit = false;
    this.hitTime = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfVW5pdC5qcyJdLCJuYW1lcyI6WyJDT05TVCIsInJlcXVpcmUiLCJnbEdhbWUiLCJtb3ZpZUNsaXAiLCJleHRlbmQiLCJvbkxvYWQiLCJpbml0RmlzaE1vdmllQ2xpcCIsImxvZ2ljIiwiZ2V0SW5zdGFuY2UiLCJ3aGlybHBvb2wiLCJmaXNoRGF0YSIsIl9iVXBkYXRlIiwibW92ZUxpc3QiLCJwb3NBcnJheSIsImlzSGl0IiwiaGl0VGltZSIsImlzUGxheVN0YXJ0TWMiLCJhZGRTcGVlZCIsInNob3dCdWJibGVzVGltZSIsImNsb3NlQnViYmxlc1RpbWUiLCJpc1F1aWNrRGllIiwiaXNQbGF5ZXJTb3VuZCIsImlzU2hvd1RpcCIsImNhbnRhaW5lck5hbWUiLCJpbml0RmlzaCIsImhpZGVUaXAiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaG93VGltZSIsImxvY2FsRmlzaERhdGEiLCJqc29uX2Zpc2hUYWJsZSIsImZpc2hUeXBlSWQiLCJyZXNHcm91cElkIiwiZmlzaFJlc0RhdGEiLCJqc29uX2Zpc2hSZXNFZGl0IiwicnVuVGltZSIsIl90aW1lIiwiRGF0ZSIsIm5vdyIsIm5vZGUiLCJ4IiwieSIsImZpc2hMb2NhbERhdGEiLCJ6SW5kZXgiLCJyZXNIaWVyYXJjaHkiLCJmcmVxdWVuY3kiLCJ1bmRlZmluZWQiLCJydW5TcGVlZCIsImZyYW1lUmF0ZSIsIlJ1bmZyZXF1ZW5jeSIsImxpdmVUaW1lIiwic2VydmVyVGltZSIsImNyZWF0ZVRpbWUiLCJfYWxsVGltZSIsIk51bWJlciIsIm5ld0xpdmVUaW1lIiwiTWF0aCIsImFicyIsIl9zdGFydFRpbWUiLCJkZWF0aCIsImRpZVR5cGUwIiwic3RhcnRNb3ZlIiwic2V0Qm94Q29sbGlkZXJTaXplT2Zmc2V0QW5kQW5jaG9yIiwiZ2V0Q29tcG9uZW50IiwiY2MiLCJTcHJpdGUiLCJlbmFibGVkIiwic3RhcnRGaXNoUnVuaW5nIiwiTm90U2F5IiwiQ2hhdFZvaWNlVHlwZTIiLCJGaXNoUnVuVGltZSIsImNoYXRWb2ljZVR5cGUiLCJQMjAiLCJQNDAiLCJnZXRSYW5kb21OdW0iLCJnZXRJc1JvdGF0aW9uIiwib2xkU2NhbGVZIiwic2NhbGVZIiwibW92ZSIsImR0IiwibF90aW1lIiwidGltZUluZGV4IiwiZ2V0SW5kZXhCeVRpbWUiLCJ0IiwiY3VyclRpbWUiLCJuZXh0VGltZSIsImxhc3RJbmRleCIsImdldFRpbWVCeUluZGV4IiwiZnoiLCJmbSIsIkZJUlNUIiwiU0NFTlQiLCJCel9PbmVQb3MiLCJCel9Ub3dQb3MiLCJCel9UaHJlZVBvcyIsImkiLCJhIiwiYiIsImMiLCJwb3ciLCJnYW1lWm9vbVgiLCJnYW1lWm9vbVkiLCJuZXdBbmdsZSIsInNldEFuZ2xlIiwicG9zaXRpb24iLCJmaXhlZFJlc291cmNlIiwiYW5nbGUiLCJzZXR0aW5nSWNpbmciLCJpc0luRnJlZXplIiwicXVpY2tEaWUiLCJpc2xvdyIsImNvbGxpZGVyIiwiQm94Q29sbGlkZXIiLCJzdG9wQWxsQWN0aW9ucyIsIk9uZVRpbWUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsImZhZGVUbyIsImNhbGxGdW5jIiwiZGlzcG9zZSIsImlzV2VsbERpZSIsImxvY2tTZWxmIiwibmFtZUlEIiwibmFtZSIsImxvY2tGaXNoSUQiLCJlbWl0dGVyIiwiZW1pdCIsImNsaWVudEV2ZW50IiwicGxheUxvY2tTcGluZSIsImlzQXV0byIsInVzZUF1dG9Ta2lsbCIsImdldEZpc2hJRCIsImlkIiwidXBkYXRlIiwicGxheUZpc2hNb3ZpZUNsaXAiLCJjb2xvciIsIkhpdENvbG9yIiwiTm9ybWFsIiwic3RhcnRUYWxrIiwiZ2V0Q2xpY2tBcmVhIiwid2lkdGgiLCJoZWlnaHQiLCJsYXN0TG9ja0Zpc2hJRCIsImxvY2tGaXNoSW5kZXgiLCJpc0xvY2tBdXRvQ2hhbmdlIiwiZXhpc3RUaW1lIiwiSEFMRiIsIk9GRlNFWCIsIk5vdCIsInRpbWUiLCJsZW5ndGgiLCJpbmRleCIsImFkZENvbXBvbmVudCIsImFuY2hvclgiLCJhbmNob3JZIiwib2Zmc2V0IiwidjIiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInNpemUiLCJzaXplVyIsInNpemVIIiwidGFnIiwiaGl0IiwiSGl0TG9uZ1RpbWUiLCJBdHRhY2siLCJ4MiIsInkyIiwicG9pbnQiLCJ4MSIsInkxIiwiYXRhbjIiLCJQSSIsInNldHNjYWxlIiwiaXNBdHRhY2siLCJwbGF5U291bmRUaW1lIiwiR0FQVElNRSIsImxhc3RQbGF5VGltZSIsImNoYXRCdWJibGUiLCJDaGF0Vm9pY2VUeXBlMSIsIkNoYXRWb2ljZVR5cGUzIiwiQ2hhdFZvaWNlVHlwZTQiLCJDaGF0Vm9pY2VUeXBlNSIsIkNoYXRWb2ljZVR5cGU2IiwiQmFzZVBlcmNlbnRhZ2VGYWN0b3IiLCJJc1Nob3ciLCJyYW5kb20iLCJQMV8yMCIsIlA0XzIwIiwiUDVfMjAiLCJzaG93VGlwIiwiRmlzaFZvaWNlIiwiZmlzaFNvdW5kIiwidm9pY2VGaWxlIiwidGV4dCIsImluZGV4T2YiLCJzdHIiLCJzcGxpdCIsImZvbGxvd0Zpc2hUaXAiLCJUaXBUaW1lIiwic3ByaXRlRnJhbWUiLCJnZXRPcmlnaW5hbFNpemUiLCJkaXJlY3Rpb24iLCJHb0JhY2siLCJvbmVYIiwic2NhbGVYIiwic2V0VGlwVGV4dCIsImJnQW5nbGUiLCJkZXNjIiwiY2FudGFpbmVyIiwiZ2V0Q2hpbGRCeU5hbWUiLCJsYWIiLCJhY3RpdmUiLCJMYWJlbCIsInN0cmluZyIsImRpZVR5cGUiLCJzZWF0TnVtIiwiZGVsYXlEaWVUaW1lIiwiY2xlYXJGb2xsb3dGaXNoVGlwIiwiZmlzaElkIiwic2NoZWR1bGVPbmNlIiwiZGVhdGhOZXh0IiwiaXNTdGFydCIsImxvY2tCdWxsZXRMaXN0IiwibGVuIiwiZGVhdGhGaXNoIiwic2hvY2siLCJvblNzaG9jayIsImRpZVR5cGUxIiwiRGVhdCIsIlRJTUUiLCJFbmRBbmdsZSIsIlNYIiwiYWN0Iiwic3Bhd24iLCJzY2FsZVRvIiwicm90YXRlVG8iLCJkaWVUeXBlMyIsIm9sZEFuZ2xlIiwicmVwZWF0IiwiZGllVHlwZTQiLCJyb3RhdGVCeSIsIm1vdmVUbyIsImNsZWFyVGlkZUNvcnJlY3QiLCJmaXNoSUQiLCJkZXN0cm95IiwicGFyZW50IiwicmVtb3ZlQ2hpbGQiLCJkaXNwb3NlRmlzaE5vZGUiLCJpbmQiLCJib3NzSURMaXN0Iiwic3BsaWNlIiwib2ZmIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiZmlzaFBvb2wiLCJwdXQiLCJkZWxheURlc3Ryb3kiLCJNYXhUaW1lIiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQW5COztBQUNBQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxNQURvQixvQkFDVjtBQUNOLFNBQUtDLGlCQUFMLEdBRE0sQ0FDbUI7O0FBQ3pCLFNBQUtDLEtBQUwsR0FBYU4sT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQk8sV0FBdEIsRUFBYixDQUZNLENBRTJDOztBQUNqRCxTQUFLQyxTQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLEtBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLENBQXZCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0IsQ0FBQyxDQUF6QjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS0MsU0FBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsSUFBckI7QUFDSCxHQW5CbUI7QUFvQnBCO0FBQ0FDLEVBQUFBLFFBckJvQixvQkFxQlhkLFFBckJXLEVBcUJGO0FBQ2Q7QUFDQSxTQUFLZSxPQUFMO0FBQ0EsU0FBS2YsUUFBTCxHQUFvQmdCLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLFNBQUwsQ0FBZWxCLFFBQWYsQ0FBWCxDQUFwQjtBQUNBLFNBQUtFLFFBQUwsR0FBb0IsS0FBS0YsUUFBTCxDQUFjRSxRQUFsQztBQUNBLFNBQUtDLFFBQUwsR0FBb0IsS0FBS0gsUUFBTCxDQUFjRyxRQUFsQztBQUNBLFNBQUtnQixRQUFMLEdBQW9CLEtBQUtuQixRQUFMLENBQWNtQixRQUFsQyxDQU5jLENBTWtDOztBQUNoRCxTQUFLQyxhQUFMLEdBQW9CLEtBQUt2QixLQUFMLENBQVd3QixjQUFYLENBQTBCLEtBQUtyQixRQUFMLENBQWNzQixVQUFkLEdBQXlCLEVBQW5ELENBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFvQixLQUFLSCxhQUFMLENBQW1CRyxVQUF2QztBQUNBLFNBQUtDLFdBQUwsR0FBb0IsS0FBSzNCLEtBQUwsQ0FBVzRCLGdCQUFYLENBQTRCLFNBQU8sS0FBS0YsVUFBeEMsQ0FBcEI7QUFDQSxTQUFLRyxPQUFMLEdBQW9CLEtBQUsxQixRQUFMLENBQWMwQixPQUFsQyxDQVZjLENBVWtDOztBQUNoRCxTQUFLQyxLQUFMLEdBQW9CQyxJQUFJLENBQUNDLEdBQUwsRUFBcEI7QUFDQSxTQUFLQyxJQUFMLENBQVVDLENBQVYsR0FBb0IsS0FBSzVCLFFBQUwsQ0FBYyxDQUFkLEVBQWlCNEIsQ0FBckM7QUFDQSxTQUFLRCxJQUFMLENBQVVFLENBQVYsR0FBb0IsS0FBSzdCLFFBQUwsQ0FBYyxDQUFkLEVBQWlCNkIsQ0FBckM7QUFDQSxRQUFJQyxhQUFhLEdBQUcsS0FBS3BDLEtBQUwsQ0FBV3dCLGNBQVgsQ0FBMEIsS0FBS3JCLFFBQUwsQ0FBY3NCLFVBQWQsR0FBeUIsRUFBbkQsQ0FBcEI7QUFFQSxTQUFLUSxJQUFMLENBQVVJLE1BQVYsR0FBb0JELGFBQWEsQ0FBQ0UsWUFBbEM7O0FBRUEsUUFBRyxLQUFLbkMsUUFBTCxDQUFjb0MsU0FBZCxJQUEyQkMsU0FBOUIsRUFBd0M7QUFDcEMsV0FBS0MsUUFBTCxHQUFnQixLQUFLbEIsYUFBTCxDQUFtQm1CLFNBQW5CLEdBQStCLEtBQUt2QyxRQUFMLENBQWNvQyxTQUE3QyxHQUF5RDlDLEtBQUssQ0FBQ2tELFlBQS9FO0FBQ0g7O0FBRUQsUUFBSUMsUUFBUSxHQUFHLENBQUN6QyxRQUFRLENBQUMwQyxVQUFULEdBQXNCMUMsUUFBUSxDQUFDMkMsVUFBaEMsSUFBNEMsSUFBM0QsQ0F0QmMsQ0FzQm1EOztBQUNqRSxTQUFLQyxRQUFMLEdBQWdCQyxNQUFNLENBQUMsS0FBS25CLE9BQUwsR0FBYSxLQUFLUCxRQUFsQixHQUEyQixFQUE1QixDQUF0QixDQXZCYyxDQXVCNkM7O0FBQzNELFFBQUkyQixXQUFXLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTUCxRQUFULENBQWxCLENBeEJjLENBd0JtRDs7QUFDakUsUUFBR0EsUUFBUSxHQUFHLENBQWQsRUFBZ0I7QUFBQztBQUNiLFdBQUt0QixRQUFMLElBQWlCMkIsV0FBakI7QUFDQSxXQUFLRyxVQUFMLEdBQWtCLENBQWxCO0FBQ0gsS0FIRCxNQUdLO0FBQ0QsVUFBSUgsWUFBVyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU1AsUUFBVCxDQUFsQixDQURDLENBQzREOzs7QUFDN0QsVUFBR0ssWUFBVyxJQUFJLEtBQUtGLFFBQXZCLEVBQWdDO0FBQzVCLGFBQUtNLEtBQUwsQ0FBVzVELEtBQUssQ0FBQzZELFFBQWpCO0FBQ0E7QUFDSDs7QUFFRCxVQUFHTCxZQUFXLEdBQUcsS0FBSzNCLFFBQXRCLEVBQStCO0FBQzNCLGFBQUs4QixVQUFMLEdBQWtCSCxZQUFXLEdBQUcsS0FBSzNCLFFBQXJDO0FBQ0gsT0FGRCxNQUVLO0FBQ0QsYUFBS0EsUUFBTCxJQUFpQjJCLFlBQWpCO0FBQ0EsYUFBS0csVUFBTCxHQUFrQixDQUFsQjtBQUNIO0FBQ0o7O0FBQ0QsUUFBRyxLQUFLQSxVQUFMLEdBQWtCLENBQXJCLEVBQXVCO0FBQ25CLFdBQUtHLFNBQUwsR0FEbUIsQ0FDRjtBQUNwQixLQUZELE1BRUs7QUFDRCxXQUFLbkQsUUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBQ0osR0FwRW1CO0FBcUVwQm1ELEVBQUFBLFNBckVvQix1QkFxRVQ7QUFDUCxTQUFLQyxpQ0FBTDtBQUNBLFNBQUt2QixJQUFMLENBQVV3QixZQUFWLENBQXVCQyxFQUFFLENBQUNDLE1BQTFCLEVBQWtDQyxPQUFsQyxHQUE0QyxJQUE1QztBQUNBLFNBQUs5QixLQUFMLEdBQWFDLElBQUksQ0FBQ0MsR0FBTCxFQUFiO0FBQ0EsU0FBSzZCLGVBQUw7QUFDQSxTQUFLcEQsYUFBTCxHQUFzQixJQUF0QjtBQUNBLFNBQUthLFFBQUwsR0FBZ0IsQ0FBQyxDQUFqQjtBQUNBLFNBQUtsQixRQUFMLEdBQWlCLElBQWpCO0FBQ0EsUUFBTTBELE1BQU0sR0FBRyxDQUFmO0FBQ0EsUUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsUUFBTUMsV0FBVyxHQUFHLEtBQUtuQyxPQUF6Qjs7QUFFQSxRQUFHbUIsTUFBTSxDQUFDLEtBQUt6QixhQUFMLENBQW1CMEMsYUFBcEIsQ0FBTixJQUE0Q0gsTUFBNUMsSUFBc0RkLE1BQU0sQ0FBQyxLQUFLekIsYUFBTCxDQUFtQjBDLGFBQXBCLENBQU4sSUFBNENGLGNBQXJHLEVBQW9IO0FBQ2hILFVBQU1HLEdBQUcsR0FBR0YsV0FBVyxHQUFHLEdBQTFCO0FBQ0EsVUFBTUcsR0FBRyxHQUFHSCxXQUFXLEdBQUcsSUFBMUIsQ0FGZ0gsQ0FHaEg7O0FBQ0EsV0FBS3JELGVBQUwsR0FBdUIsQ0FBQ3VDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtuRCxLQUFMLENBQVdvRSxZQUFYLENBQXdCRixHQUF4QixFQUE0QkMsR0FBNUIsQ0FBVCxDQUF4QjtBQUNIOztBQUNELFFBQUcsS0FBS25FLEtBQUwsQ0FBV3FFLGFBQVgsRUFBSCxFQUE4QjtBQUMxQixXQUFLcEMsSUFBTCxDQUFVcUMsU0FBVixHQUFzQixDQUFDLEtBQUtyQyxJQUFMLENBQVVzQyxNQUFqQztBQUNBLFdBQUt0QyxJQUFMLENBQVVzQyxNQUFWLEdBQW1CLEtBQUt0QyxJQUFMLENBQVVxQyxTQUE3QjtBQUNIO0FBQ0osR0EzRm1CO0FBNEZwQkUsRUFBQUEsSUE1Rm9CLGdCQTRGZkMsRUE1RmUsRUE0Rlo7QUFDSjtBQUNBLFFBQUksS0FBS3BFLFFBQUwsSUFBaUIsS0FBS2lCLFFBQUwsR0FBZ0IsQ0FBQyxDQUF0QyxFQUF3QztBQUNwQyxXQUFLQSxRQUFMLElBQWlCbUQsRUFBakI7O0FBQ0EsVUFBRyxLQUFLbkQsUUFBTCxJQUFlLENBQWxCLEVBQW9CO0FBQ2hCLGFBQUtpQyxTQUFMLEdBRGdCLENBQ0M7QUFDcEI7QUFDSixLQVBHLENBUUo7OztBQUNBLFFBQUksS0FBS25ELFFBQUwsSUFBaUIsS0FBS0MsUUFBdEIsSUFBa0MsS0FBS2lCLFFBQUwsSUFBaUIsQ0FBdkQsRUFBMEQ7QUFDdEQsVUFBSW9ELE1BQU0sR0FBRzNDLElBQUksQ0FBQ0MsR0FBTCxFQUFiO0FBQ0EsV0FBS29CLFVBQUwsR0FBbUIsS0FBS0EsVUFBTCxHQUFrQixDQUFDc0IsTUFBTSxHQUFHLEtBQUs1QyxLQUFmLElBQXdCLElBQTNDLEdBQW9ELEtBQUtzQixVQUFMLEdBQWtCLEtBQUsxQyxRQUE3RjtBQUNBLFdBQUtvQixLQUFMLEdBQWE0QyxNQUFiLENBSHNELENBSXREOztBQUNBLFdBQUtDLFNBQUwsR0FBaUIsS0FBS0MsY0FBTCxDQUFvQixLQUFLeEIsVUFBekIsQ0FBakI7O0FBQ0EsVUFBSSxLQUFLdUIsU0FBTCxJQUFrQixDQUFDLENBQXZCLEVBQTBCO0FBQUM7QUFDdkIsYUFBS3RCLEtBQUwsQ0FBVzVELEtBQUssQ0FBQzZELFFBQWpCO0FBQ0E7QUFDSDs7QUFDRCxVQUFJdUIsQ0FBSjtBQUNBLFVBQUlDLFFBQUo7QUFDQSxVQUFJQyxRQUFKOztBQUNBLFVBQUcsS0FBS0MsU0FBTCxJQUFrQixJQUFsQixJQUEwQixLQUFLTCxTQUFMLElBQWtCLEtBQUtLLFNBQXBELEVBQThEO0FBQzFERixRQUFBQSxRQUFRLEdBQUcsS0FBS0csY0FBTCxDQUFvQixLQUFLTixTQUF6QixDQUFYO0FBQ0FJLFFBQUFBLFFBQVEsR0FBRyxLQUFLRSxjQUFMLENBQW9CLEtBQUtOLFNBQUwsR0FBaUIsQ0FBckMsQ0FBWDtBQUNBLGFBQUtHLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSCxPQUxELE1BTUE7QUFDSUQsUUFBQUEsUUFBUSxHQUFHLEtBQUtBLFFBQWhCO0FBQ0FDLFFBQUFBLFFBQVEsR0FBRyxLQUFLQSxRQUFoQjtBQUNIOztBQUNELFVBQUlHLEVBQUUsR0FBRyxLQUFLOUIsVUFBTCxHQUFrQjBCLFFBQTNCO0FBQ0EsVUFBSUssRUFBRSxHQUFHSixRQUFRLEdBQUdELFFBQXBCO0FBQ0FELE1BQUFBLENBQUMsR0FBSUssRUFBRSxHQUFDQyxFQUFSO0FBQ0EsVUFBTUMsS0FBSyxHQUFHLENBQWQ7QUFDQSxVQUFNQyxLQUFLLEdBQUcsQ0FBZDtBQUNBLFVBQU1DLFNBQVMsR0FBRyxDQUFsQjtBQUNBLFVBQU1DLFNBQVMsR0FBRyxDQUFsQjtBQUNBLFVBQU1DLFdBQVcsR0FBRyxDQUFwQjtBQUNBLFVBQUlDLENBQUMsR0FBRyxLQUFLZCxTQUFMLEdBQWlCLENBQWpCLEdBQXNCVSxLQUFLLEdBQUcsS0FBS1YsU0FBbkMsR0FBK0NTLEtBQUssR0FBRyxLQUFLVCxTQUFwRTtBQUNBLFVBQUllLENBQUMsR0FBRyxLQUFLcEYsUUFBTCxDQUFjbUYsQ0FBQyxHQUFHSCxTQUFsQixDQUFSO0FBQ0EsVUFBSUssQ0FBQyxHQUFHLEtBQUtyRixRQUFMLENBQWNtRixDQUFDLEdBQUdGLFNBQWxCLENBQVI7QUFDQSxVQUFJSyxDQUFDLEdBQUcsS0FBS3RGLFFBQUwsQ0FBY21GLENBQUMsR0FBR0QsV0FBbEIsQ0FBUjs7QUFDQSxVQUFHLENBQUNFLENBQUosRUFBTTtBQUFDO0FBQ0gsYUFBS3JDLEtBQUwsQ0FBVzVELEtBQUssQ0FBQzZELFFBQWpCO0FBQ0E7QUFDSCxPQXRDcUQsQ0F1Q3REOzs7QUFDQSxVQUFJcEIsQ0FBQyxHQUFHLENBQUNnQixJQUFJLENBQUMyQyxHQUFMLENBQVMsSUFBSWhCLENBQWIsRUFBZ0IsQ0FBaEIsSUFBcUJhLENBQUMsQ0FBQ3hELENBQXZCLEdBQTJCLElBQUkyQyxDQUFKLElBQVMsSUFBSUEsQ0FBYixJQUFrQmMsQ0FBQyxDQUFDekQsQ0FBL0MsR0FBbURnQixJQUFJLENBQUMyQyxHQUFMLENBQVNoQixDQUFULEVBQVksQ0FBWixJQUFpQmUsQ0FBQyxDQUFDMUQsQ0FBdkUsSUFBNEUsS0FBS2xDLEtBQUwsQ0FBVzhGLFNBQS9GO0FBQ0EsVUFBSTNELENBQUMsR0FBRyxDQUFDZSxJQUFJLENBQUMyQyxHQUFMLENBQVMsSUFBSWhCLENBQWIsRUFBZ0IsQ0FBaEIsSUFBcUJhLENBQUMsQ0FBQ3ZELENBQXZCLEdBQTJCLElBQUkwQyxDQUFKLElBQVMsSUFBSUEsQ0FBYixJQUFrQmMsQ0FBQyxDQUFDeEQsQ0FBL0MsR0FBbURlLElBQUksQ0FBQzJDLEdBQUwsQ0FBU2hCLENBQVQsRUFBWSxDQUFaLElBQWlCZSxDQUFDLENBQUN6RCxDQUF2RSxJQUE0RSxLQUFLbkMsS0FBTCxDQUFXK0YsU0FBL0YsQ0F6Q3NELENBMEN0RDs7QUFDQSxVQUFJQyxRQUFRLEdBQUcsS0FBS0MsUUFBTCxDQUFjL0QsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0IsS0FBS0YsSUFBTCxDQUFVaUUsUUFBNUIsQ0FBZjs7QUFDQSxVQUFHLEtBQUszRSxhQUFMLENBQW1CNEUsYUFBbkIsSUFBb0MsQ0FBdkMsRUFBeUM7QUFDckMsYUFBS2xFLElBQUwsQ0FBVW1FLEtBQVYsR0FBa0JKLFFBQWxCO0FBQ0g7O0FBQ0QsV0FBSy9ELElBQUwsQ0FBVUMsQ0FBVixHQUFjQSxDQUFkO0FBQ0EsV0FBS0QsSUFBTCxDQUFVRSxDQUFWLEdBQWNBLENBQWQ7QUFDQSxXQUFLNkMsU0FBTCxHQUFpQixLQUFLTCxTQUF0QjtBQUNIO0FBQ0osR0F4Sm1CO0FBeUpwQjtBQUNBMEIsRUFBQUEsWUExSm9CLHdCQTBKUEMsVUExSk8sRUEwSkk7QUFDcEIsUUFBR0EsVUFBSCxFQUFjO0FBQ1YsV0FBS3hFLEtBQUwsR0FBYUMsSUFBSSxDQUFDQyxHQUFMLEVBQWI7QUFDSDs7QUFDRCxTQUFLNUIsUUFBTCxHQUFnQmtHLFVBQWhCO0FBQ0gsR0EvSm1CO0FBZ0twQjtBQUNBQyxFQUFBQSxRQWpLb0Isc0JBaUtFO0FBQUE7O0FBQUEsUUFBYkMsS0FBYSx1RUFBTCxJQUFLOztBQUNsQixRQUFHLEtBQUtwRyxRQUFSLEVBQWlCO0FBQ2IsV0FBS1MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFdBQUs0QixRQUFMLEdBQWdCK0QsS0FBSyxHQUFHLE1BQUgsR0FBWSxNQUFqQyxDQUZhLENBRTRCOztBQUN6QyxXQUFLOUYsUUFBTCxHQUFnQjhGLEtBQUssR0FBRyxJQUFILEdBQVUsS0FBL0I7QUFDQSxVQUFJQyxRQUFRLEdBQUcsS0FBS3hFLElBQUwsQ0FBVXdCLFlBQVYsQ0FBdUJDLEVBQUUsQ0FBQ2dELFdBQTFCLENBQWY7O0FBQ0EsVUFBR0QsUUFBSCxFQUFZO0FBQ1JBLFFBQUFBLFFBQVEsQ0FBQzdDLE9BQVQsR0FBbUIsS0FBbkI7QUFDSDs7QUFFRCxXQUFLM0IsSUFBTCxDQUFVMEUsY0FBVjtBQUNBLFVBQU1DLE9BQU8sR0FBRyxDQUFoQjtBQUNBLFdBQUszRSxJQUFMLENBQVU0RSxTQUFWLENBQW9CbkQsRUFBRSxDQUFDb0QsUUFBSCxDQUFZcEQsRUFBRSxDQUFDcUQsU0FBSCxDQUFhSCxPQUFiLENBQVosRUFBa0NsRCxFQUFFLENBQUNzRCxNQUFILENBQVUsR0FBVixFQUFjLENBQWQsQ0FBbEMsRUFBbUR0RCxFQUFFLENBQUN1RCxRQUFILENBQVksWUFBSTtBQUNuRixRQUFBLEtBQUksQ0FBQ0MsT0FBTDtBQUNILE9BRnNFLENBQW5ELENBQXBCO0FBR0g7QUFDSixHQWpMbUI7QUFrTHBCO0FBQ0FDLEVBQUFBLFNBbkxvQix1QkFtTFQ7QUFDUCxXQUFPLENBQUMsS0FBS3RHLFVBQWI7QUFDSCxHQXJMbUI7QUFzTHBCO0FBQ0F1RyxFQUFBQSxRQXZMb0Isc0JBdUxWO0FBQ04sUUFBSUMsTUFBTSxHQUFHckUsTUFBTSxDQUFDLEtBQUtmLElBQUwsQ0FBVXFGLElBQVgsQ0FBbkI7O0FBQ0EsUUFBRyxLQUFLdEgsS0FBTCxDQUFXdUgsVUFBWCxJQUF5QkYsTUFBNUIsRUFBbUM7QUFDL0IxSCxNQUFBQSxNQUFNLENBQUM2SCxPQUFQLENBQWVDLElBQWYsQ0FBb0JoSSxLQUFLLENBQUNpSSxXQUFOLENBQWtCQyxhQUF0QztBQUNIOztBQUNELFNBQUszSCxLQUFMLENBQVd1SCxVQUFYLEdBQXdCRixNQUF4QixDQUxNLENBTU47O0FBQ0EsU0FBS3JILEtBQUwsQ0FBVzRILE1BQVgsR0FBb0IsSUFBcEI7QUFDQWpJLElBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0JHLFlBQXRDO0FBQ0gsR0FoTW1CO0FBaU1wQjtBQUNBQyxFQUFBQSxTQWxNb0IsdUJBa01UO0FBQ1AsUUFBRyxLQUFLM0gsUUFBTCxJQUFpQixJQUFwQixFQUF5QjtBQUNyQixhQUFPNkMsTUFBTSxDQUFDLEtBQUs3QyxRQUFMLENBQWM0SCxFQUFmLENBQWI7QUFDSDs7QUFDRCxXQUFPLElBQVA7QUFDSCxHQXZNbUI7QUF3TXBCO0FBQ0FDLEVBQUFBLE1Bek1vQixrQkF5TWJ2RCxFQXpNYSxFQXlNVjtBQUNOO0FBQ0EsUUFBRyxLQUFLaEUsYUFBUixFQUFzQjtBQUNsQixXQUFLd0gsaUJBQUwsQ0FBdUJ4RCxFQUF2QjtBQUNILEtBSkssQ0FLTjs7O0FBQ0EsU0FBS0QsSUFBTCxDQUFVQyxFQUFWLEVBTk0sQ0FPTjs7QUFDQSxRQUFHLEtBQUtsRSxLQUFSLEVBQWM7QUFDVixXQUFLQyxPQUFMLElBQWdCaUUsRUFBaEI7O0FBQ0EsVUFBRyxLQUFLakUsT0FBTCxHQUFlLENBQWxCLEVBQW9CO0FBQ2hCLGFBQUtELEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSzBCLElBQUwsQ0FBVWlHLEtBQVYsR0FBa0J6SSxLQUFLLENBQUMwSSxRQUFOLENBQWVDLE1BQWpDO0FBQ0g7QUFDSjs7QUFDRCxRQUFHLEtBQUt6SCxlQUFMLElBQXdCLENBQTNCLEVBQTZCO0FBQ3pCLFdBQUtBLGVBQUwsSUFBd0I4RCxFQUF4Qjs7QUFDQSxVQUFHLEtBQUs5RCxlQUFMLElBQXdCLENBQTNCLEVBQTZCO0FBQ3pCLGFBQUtBLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxhQUFLMEgsU0FBTCxDQUFlLEtBQWYsRUFBcUIsS0FBckIsRUFGeUIsQ0FFRztBQUMvQjtBQUNKOztBQUVELFFBQUcsS0FBS3pILGdCQUFMLEdBQXdCLENBQUMsQ0FBNUIsRUFBOEI7QUFDMUIsV0FBS0EsZ0JBQUwsSUFBeUI2RCxFQUF6Qjs7QUFDQSxVQUFHLEtBQUs3RCxnQkFBTCxJQUF5QixDQUE1QixFQUE4QjtBQUMxQixhQUFLTSxPQUFMO0FBQ0EsYUFBS04sZ0JBQUwsR0FBd0IsQ0FBQyxDQUF6QjtBQUNIO0FBQ0o7O0FBRUQsUUFBRyxLQUFLWixLQUFMLElBQWMsSUFBZCxJQUFzQixLQUFLQSxLQUFMLENBQVd1SCxVQUFYLElBQXlCLElBQS9DLElBQXVELEtBQUt2SCxLQUFMLENBQVd1SCxVQUFYLElBQXlCdkUsTUFBTSxDQUFDLEtBQUtmLElBQUwsQ0FBVXFGLElBQVgsQ0FBekYsRUFBMEc7QUFDdEcsVUFBRyxDQUFDLEtBQUt0SCxLQUFMLENBQVdzSSxZQUFYLENBQXdCLEtBQUtyRyxJQUFMLENBQVVpRSxRQUFsQyxFQUEyQyxLQUFLakUsSUFBTCxDQUFVc0csS0FBckQsRUFBMkQsS0FBS3RHLElBQUwsQ0FBVXVHLE1BQXJFLENBQUosRUFBaUY7QUFDN0U7QUFDQSxhQUFLeEksS0FBTCxDQUFXeUksY0FBWCxHQUE0QnpGLE1BQU0sQ0FBQyxLQUFLaEQsS0FBTCxDQUFXdUgsVUFBWCxHQUFzQixFQUF2QixDQUFsQztBQUNBLGFBQUt2SCxLQUFMLENBQVd1SCxVQUFYLEdBQXdCLElBQXhCO0FBQ0EsYUFBS3ZILEtBQUwsQ0FBVzBJLGFBQVgsR0FBMkIsSUFBM0I7O0FBQ0EsWUFBRyxLQUFLMUksS0FBTCxDQUFXMkksZ0JBQVgsSUFBK0IsS0FBbEMsRUFBd0M7QUFDcEMsZUFBSzNJLEtBQUwsQ0FBVzRILE1BQVgsR0FBb0IsS0FBcEI7QUFDQWpJLFVBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0JHLFlBQXRDO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0FwUG1CO0FBcVBwQjtBQUNBakQsRUFBQUEsY0F0UG9CLDBCQXNQTGdFLFNBdFBLLEVBc1BNO0FBQ3RCLFFBQU1DLElBQUksR0FBSyxDQUFmO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLENBQWY7QUFDQSxRQUFNQyxHQUFHLEdBQU0sQ0FBQyxDQUFoQjtBQUNBLFFBQUlDLElBQUksR0FBTyxDQUFmOztBQUNBLFNBQUssSUFBSXZELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3BGLFFBQUwsQ0FBYzRJLE1BQWQsR0FBdUJKLElBQTNDLEVBQWlEcEQsQ0FBQyxFQUFsRCxFQUFzRDtBQUNsRHVELE1BQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHLEtBQUszSSxRQUFMLENBQWN3SSxJQUFJLEdBQUdwRCxDQUFyQixDQUFQLEdBQWlDLEtBQUtwRixRQUFMLENBQWN3SSxJQUFJLEdBQUdwRCxDQUFQLEdBQVdxRCxNQUF6QixDQUF4Qzs7QUFDQSxVQUFJRSxJQUFJLElBQUlKLFNBQVosRUFBdUI7QUFDbkIsZUFBT25ELENBQVA7QUFDSDtBQUNKOztBQUNELFdBQU9zRCxHQUFQO0FBQ0gsR0FsUW1CO0FBbVFwQjtBQUNBOUQsRUFBQUEsY0FwUW9CLDBCQW9RTGlFLEtBcFFLLEVBb1FFO0FBQ2xCLFFBQU1MLElBQUksR0FBSyxDQUFmO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLENBQWY7QUFDQSxRQUFJRSxJQUFJLEdBQU8sQ0FBZjs7QUFDQSxTQUFLLElBQUl2RCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtwRixRQUFMLENBQWM0SSxNQUFkLEdBQXVCSixJQUEzQyxFQUFpRHBELENBQUMsRUFBbEQsRUFBc0Q7QUFDbEQsVUFBSUEsQ0FBQyxJQUFJeUQsS0FBVCxFQUFnQjtBQUNaO0FBQ0g7O0FBQ0RGLE1BQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHLEtBQUszSSxRQUFMLENBQWN3SSxJQUFJLEdBQUdwRCxDQUFyQixDQUFQLEdBQWlDLEtBQUtwRixRQUFMLENBQWN3SSxJQUFJLEdBQUdwRCxDQUFQLEdBQVdxRCxNQUF6QixDQUF4QztBQUNIOztBQUNELFdBQU9FLElBQVA7QUFDSCxHQS9RbUI7QUFnUnBCO0FBQ0F4RixFQUFBQSxpQ0FqUm9CLCtDQWlSZTtBQUMvQixRQUFJaUQsUUFBUSxHQUFHLEtBQUt4RSxJQUFMLENBQVV3QixZQUFWLENBQXVCQyxFQUFFLENBQUNnRCxXQUExQixDQUFmOztBQUNBLFFBQUcsQ0FBQ0QsUUFBSixFQUFhO0FBQ1RBLE1BQUFBLFFBQVEsR0FBRyxLQUFLeEUsSUFBTCxDQUFVa0gsWUFBVixDQUF1QnpGLEVBQUUsQ0FBQ2dELFdBQTFCLENBQVg7QUFDSDs7QUFDREQsSUFBQUEsUUFBUSxDQUFDN0MsT0FBVCxHQUFtQixJQUFuQjs7QUFDQSxRQUFHLEtBQUtqQyxXQUFSLEVBQW9CO0FBQ2hCLFdBQUtNLElBQUwsQ0FBVW1ILE9BQVYsR0FBb0IsS0FBS3pILFdBQUwsQ0FBaUJ5SCxPQUFyQztBQUNBLFdBQUtuSCxJQUFMLENBQVVvSCxPQUFWLEdBQW9CLEtBQUsxSCxXQUFMLENBQWlCMEgsT0FBckM7QUFDQTVDLE1BQUFBLFFBQVEsQ0FBQzZDLE1BQVQsR0FBcUI1RixFQUFFLENBQUM2RixFQUFILENBQU0sS0FBSzVILFdBQUwsQ0FBaUI2SCxPQUF2QixFQUErQixLQUFLN0gsV0FBTCxDQUFpQjhILE9BQWhELENBQXJCO0FBQ0FoRCxNQUFBQSxRQUFRLENBQUNpRCxJQUFULEdBQW9CaEcsRUFBRSxDQUFDZ0csSUFBSCxDQUFRLEtBQUsvSCxXQUFMLENBQWlCZ0ksS0FBekIsRUFBK0IsS0FBS2hJLFdBQUwsQ0FBaUJpSSxLQUFoRCxDQUFwQjtBQUNIOztBQUNEbkQsSUFBQUEsUUFBUSxDQUFDb0QsR0FBVCxHQUFlLEtBQUsvQixTQUFMLEtBQWlCLEVBQWhDO0FBQ0EsU0FBSzdGLElBQUwsQ0FBVXFGLElBQVYsR0FBaUIsS0FBRyxLQUFLUSxTQUFMLEVBQXBCO0FBQ0gsR0EvUm1CO0FBZ1NwQjtBQUNBZ0MsRUFBQUEsR0FqU29CLGlCQWlTZjtBQUNELFFBQU1DLFdBQVcsR0FBRyxJQUFwQjtBQUNBLFNBQUs5SCxJQUFMLENBQVVpRyxLQUFWLEdBQWtCekksS0FBSyxDQUFDMEksUUFBTixDQUFlNkIsTUFBakM7QUFDQSxTQUFLeEosT0FBTCxHQUFrQnVKLFdBQWxCO0FBQ0EsU0FBS3hKLEtBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLOEgsU0FBTCxDQUFlLElBQWYsRUFBb0IsS0FBcEIsRUFMQyxDQUswQjtBQUM5QixHQXZTbUI7QUF3U3BCcEMsRUFBQUEsUUF4U29CLG9CQXdTWGdFLEVBeFNXLEVBd1NSQyxFQXhTUSxFQXdTTEMsS0F4U0ssRUF3U0M7QUFDakIsUUFBSUMsRUFBRSxHQUFHRCxLQUFLLENBQUNqSSxDQUFmO0FBQ0EsUUFBSW1JLEVBQUUsR0FBR0YsS0FBSyxDQUFDaEksQ0FBZjtBQUNBLFFBQUlpRSxLQUFLLEdBQUdsRCxJQUFJLENBQUNvSCxLQUFMLENBQVdKLEVBQUUsR0FBR0csRUFBaEIsRUFBb0JKLEVBQUUsR0FBR0csRUFBekIsSUFBK0IsR0FBL0IsR0FBcUNsSCxJQUFJLENBQUNxSCxFQUF0RDtBQUNBLFNBQUtDLFFBQUwsQ0FBY3BFLEtBQWQ7QUFDQSxXQUFPQSxLQUFQO0FBQ0gsR0E5U21CO0FBK1NwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQWlDLEVBQUFBLFNBeFRvQix1QkF3VHFCO0FBQUEsUUFBL0JvQyxRQUErQix1RUFBcEIsS0FBb0I7QUFBQSxRQUFkcEgsS0FBYyx1RUFBTixLQUFNOztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUcsQ0FBQyxLQUFLakQsUUFBVCxFQUFrQjtBQUNkO0FBQ0g7O0FBQ0QsUUFBRyxDQUFDLEtBQUtLLGFBQVQsRUFBdUI7QUFDbkI7QUFDSDs7QUFDRCxRQUFHLEtBQUtULEtBQUwsSUFBY3dDLFNBQWQsSUFBMkIsS0FBS3hDLEtBQUwsQ0FBVzBLLGFBQVgsSUFBNEJsSSxTQUExRCxFQUFvRTtBQUNoRTtBQUNIOztBQUNELFFBQU1tSSxPQUFPLEdBQUcsRUFBaEIsQ0FkcUMsQ0FjbEI7O0FBQ25CLFFBQUlDLFlBQVksR0FBRyxDQUFDN0ksSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS2hDLEtBQUwsQ0FBVzBLLGFBQXpCLElBQXdDLElBQTNEOztBQUNBLFFBQUcsS0FBS25KLGFBQUwsSUFBc0IsSUFBdEIsSUFBOEIsS0FBS0EsYUFBTCxDQUFtQnNKLFVBQW5CLElBQWlDLENBQUMsQ0FBaEUsSUFBcUUsS0FBSy9KLGFBQTFFLElBQTJGOEosWUFBWSxHQUFHRCxPQUE3RyxFQUFxSDtBQUNqSDtBQUNIOztBQUNELFNBQUs3SixhQUFMLEdBQXFCLElBQXJCO0FBQ0EsUUFBTWdLLGNBQWMsR0FBRyxDQUF2QjtBQUNBLFFBQU0vRyxjQUFjLEdBQUcsQ0FBdkI7QUFDQSxRQUFNZ0gsY0FBYyxHQUFHLENBQXZCO0FBQ0EsUUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsUUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsUUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsUUFBTUMsb0JBQW9CLEdBQUcsR0FBN0I7QUFDQSxRQUFNbkgsV0FBVyxHQUFHLEtBQUtuQyxPQUF6Qjs7QUFFQSxRQUFHd0IsS0FBSCxFQUFTO0FBQ0wsV0FBS3RDLFNBQUwsR0FBaUIsSUFBakI7QUFDSDs7QUFDRCxRQUFHMEosUUFBSCxFQUFZO0FBQ1IsVUFBTXZHLEdBQUcsR0FBR0YsV0FBVyxJQUFJLEtBQUdtSCxvQkFBUCxDQUF2QjtBQUNBLFVBQU1oSCxHQUFHLEdBQUdILFdBQVcsSUFBSSxLQUFHbUgsb0JBQVAsQ0FBdkI7O0FBQ0EsVUFBR25JLE1BQU0sQ0FBQyxLQUFLekIsYUFBTCxDQUFtQjBDLGFBQXBCLENBQU4sSUFBNENpSCxjQUE1QyxJQUE4RCxLQUFLOUgsVUFBTCxHQUFrQmMsR0FBaEYsSUFBdUYsS0FBS2QsVUFBTCxHQUFrQmUsR0FBNUcsRUFBZ0g7QUFDNUcsYUFBS3BELFNBQUwsR0FBaUIsSUFBakI7QUFDSCxPQUZELE1BRUs7QUFDRDtBQUNIO0FBQ0o7O0FBQ0QsUUFBR2lDLE1BQU0sQ0FBQyxLQUFLekIsYUFBTCxDQUFtQjBDLGFBQXBCLENBQU4sSUFBNEM4RyxjQUEvQyxFQUE4RDtBQUMxRCxXQUFLaEssU0FBTCxHQUFpQixJQUFqQjtBQUNIOztBQUVELFFBQUlxSyxNQUFNLEdBQUdsSSxJQUFJLENBQUNtSSxNQUFMLEtBQWdCRixvQkFBN0I7QUFDQSxRQUFNRyxLQUFLLEdBQUcsS0FBR0gsb0JBQWpCO0FBQ0EsUUFBTUksS0FBSyxHQUFHLEtBQUdKLG9CQUFqQjtBQUNBLFFBQU1LLEtBQUssR0FBRyxLQUFHTCxvQkFBakI7O0FBQ0EsWUFBUW5JLE1BQU0sQ0FBQyxLQUFLekIsYUFBTCxDQUFtQjBDLGFBQXBCLENBQWQ7QUFDSSxXQUFLNkcsY0FBTDtBQUNJLFlBQUdNLE1BQU0sR0FBR0UsS0FBWixFQUFrQjtBQUNkLGVBQUt2SyxTQUFMLEdBQWlCLElBQWpCO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBS2lLLGNBQUw7QUFDSSxZQUFHSSxNQUFNLEdBQUdHLEtBQVosRUFBa0I7QUFDZCxlQUFLeEssU0FBTCxHQUFpQixJQUFqQjtBQUNIOztBQUNEOztBQUNKLFdBQUtrSyxjQUFMO0FBQ0ksWUFBR0csTUFBTSxHQUFHSSxLQUFaLEVBQWtCO0FBQ2QsZUFBS3pLLFNBQUwsR0FBaUIsSUFBakI7QUFDSDs7QUFDRDtBQWZSOztBQWlCQSxRQUFHLEtBQUtBLFNBQVIsRUFBa0I7QUFDZCxXQUFLMEssT0FBTDtBQUNIO0FBQ0osR0E3WG1CO0FBOFhwQjtBQUNBQSxFQUFBQSxPQS9Yb0IscUJBK1hYO0FBQ0wsU0FBSzdLLGdCQUFMLEdBQXdCLENBQXhCO0FBQ0EsU0FBS1osS0FBTCxDQUFXMEssYUFBWCxHQUEyQjNJLElBQUksQ0FBQ0MsR0FBTCxFQUEzQjtBQUNBLFFBQU0wSixTQUFTLEdBQUcsV0FBbEI7QUFDQS9MLElBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0JpRSxTQUF0QyxFQUFnREQsU0FBUyxHQUFDLEtBQUtuSyxhQUFMLENBQW1CcUssU0FBN0U7QUFDQSxRQUFJQyxJQUFKOztBQUNBLFFBQUcsS0FBS3RLLGFBQUwsQ0FBbUJzSixVQUFuQixDQUE4QmlCLE9BQTlCLENBQXNDLElBQXRDLEtBQStDLENBQUMsQ0FBbkQsRUFBcUQ7QUFDakQsVUFBSUMsR0FBRyxHQUFHLENBQUMsS0FBS3hLLGFBQUwsQ0FBbUJzSixVQUFuQixHQUE4QixFQUEvQixFQUFtQ21CLEtBQW5DLENBQXlDLElBQXpDLENBQVY7QUFDQUgsTUFBQUEsSUFBSSxHQUFHRSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVMsSUFBVCxHQUFnQkEsR0FBRyxDQUFDLENBQUQsQ0FBMUI7QUFDSCxLQUhELE1BR0s7QUFDREYsTUFBQUEsSUFBSSxHQUFHLEtBQUt0SyxhQUFMLENBQW1Cc0osVUFBMUI7QUFDSDs7QUFDRGxMLElBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0J1RSxhQUF0QyxFQUFxRDtBQUM3Q2xFLE1BQUFBLEVBQUUsRUFBQyxLQUFLOUYsSUFBTCxDQUFVcUYsSUFEZ0M7QUFFN0N1RSxNQUFBQSxJQUFJLEVBQUNBLElBRndDO0FBRzdDN0MsTUFBQUEsSUFBSSxFQUFDdkosS0FBSyxDQUFDeU0sT0FIa0M7QUFJN0N4QyxNQUFBQSxJQUFJLEVBQUMsS0FBS3pILElBQUwsQ0FBVXdCLFlBQVYsQ0FBdUJDLEVBQUUsQ0FBQ0MsTUFBMUIsRUFBa0N3SSxXQUFsQyxDQUE4Q0MsZUFBOUMsRUFKd0M7QUFLN0NDLE1BQUFBLFNBQVMsRUFBQyxLQUFLL0wsUUFBTCxDQUFjLENBQWQsRUFBaUI0QixDQUFqQixHQUFxQixDQUxjLENBTTdDOztBQU42QyxLQUFyRDtBQVFILEdBblptQjtBQW9acEJzSSxFQUFBQSxRQXBab0Isb0JBb1pYcEUsS0FwWlcsRUFvWkw7QUFDWCxRQUFNZ0MsTUFBTSxHQUFHLENBQWY7QUFDQSxRQUFNa0UsTUFBTSxHQUFHLENBQUMsQ0FBaEI7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS2pNLFFBQUwsQ0FBYyxDQUFkLEVBQWlCNEIsQ0FBNUI7O0FBQ0EsUUFBRyxLQUFLbEMsS0FBTCxDQUFXcUUsYUFBWCxFQUFILEVBQThCO0FBQzFCLFVBQUcsS0FBSzlDLGFBQUwsQ0FBbUI0RSxhQUFuQixJQUFvQyxDQUFwQyxJQUF5Q29HLElBQUksR0FBRyxDQUFuRCxFQUFzRDtBQUFDO0FBQ25ELGFBQUt0SyxJQUFMLENBQVVzQyxNQUFWLEdBQW1CK0gsTUFBbkI7QUFDQSxhQUFLckssSUFBTCxDQUFVdUssTUFBVixHQUFtQkQsSUFBSSxHQUFHLENBQVAsR0FBV0QsTUFBWCxHQUFvQmxFLE1BQXZDO0FBQ0gsT0FIRCxNQUdLO0FBQ0QsYUFBS25HLElBQUwsQ0FBVXNDLE1BQVYsR0FBbUJnSSxJQUFJLEdBQUcsQ0FBUCxHQUFZbkUsTUFBWixHQUFxQmtFLE1BQXhDO0FBQ0g7QUFDSixLQVBELE1BT0s7QUFDRCxVQUFHLEtBQUsvSyxhQUFMLENBQW1CNEUsYUFBbkIsSUFBb0MsQ0FBcEMsSUFBeUNvRyxJQUFJLEdBQUcsQ0FBbkQsRUFBc0Q7QUFBQztBQUNuRCxhQUFLdEssSUFBTCxDQUFVc0MsTUFBVixHQUFtQjZELE1BQW5CO0FBQ0EsYUFBS25HLElBQUwsQ0FBVXVLLE1BQVYsR0FBbUJELElBQUksR0FBRyxDQUFQLEdBQVdELE1BQVgsR0FBb0JsRSxNQUF2QztBQUNILE9BSEQsTUFHSztBQUNELGFBQUtuRyxJQUFMLENBQVVzQyxNQUFWLEdBQW1CZ0ksSUFBSSxHQUFHLENBQVAsR0FBWUQsTUFBWixHQUFxQmxFLE1BQXhDO0FBQ0g7QUFDSixLQWxCVSxDQW1CWDs7QUFDSCxHQXhhbUI7QUF5YXBCO0FBQ0FxRSxFQUFBQSxVQTFhb0Isc0JBMGFUckcsS0ExYVMsRUEwYUg7QUFDYixRQUFHLEtBQUs3RSxhQUFMLElBQXNCLElBQXRCLElBQThCLEtBQUtBLGFBQUwsQ0FBbUJzSixVQUFuQixJQUFpQyxDQUFDLENBQW5FLEVBQXFFO0FBQ2pFO0FBQ0g7O0FBQ0QsUUFBSTBCLElBQUksR0FBRyxLQUFLak0sUUFBTCxDQUFjLENBQWQsRUFBaUI0QixDQUE1QjtBQUNBLFFBQUl3SyxPQUFPLEdBQUcsQ0FBZDtBQUNBLFFBQUlDLElBQUksR0FBRyxFQUFYOztBQUNBLFFBQUcsS0FBSzNNLEtBQUwsQ0FBV3FFLGFBQVgsRUFBSCxFQUE4QjtBQUMxQixVQUFHa0ksSUFBSSxHQUFHLENBQVYsRUFBWTtBQUNSLFlBQUcsS0FBS2hMLGFBQUwsQ0FBbUI0RSxhQUFuQixJQUFvQyxDQUF2QyxFQUEwQztBQUFDO0FBQ3ZDd0csVUFBQUEsSUFBSSxHQUFHLEtBQVA7QUFDSCxTQUZELE1BRUs7QUFDREQsVUFBQUEsT0FBTyxHQUFHLENBQUN0RyxLQUFYO0FBQ0F1RyxVQUFBQSxJQUFJLEdBQUcsR0FBUDtBQUNIOztBQUNELGFBQUszTCxhQUFMLEdBQXFCLEdBQXJCO0FBQ0gsT0FSRCxNQVFLO0FBQ0QsWUFBRyxLQUFLTyxhQUFMLENBQW1CNEUsYUFBbkIsSUFBb0MsQ0FBdkMsRUFBMEM7QUFBQztBQUN2Q3dHLFVBQUFBLElBQUksR0FBRyxLQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0RELFVBQUFBLE9BQU8sR0FBR3RHLEtBQVY7QUFDQXVHLFVBQUFBLElBQUksR0FBRyxHQUFQO0FBQ0g7O0FBQ0QsYUFBSzNMLGFBQUwsR0FBcUIsR0FBckI7QUFDSDtBQUNKLEtBbEJELE1Ba0JLO0FBQ0QsVUFBR3VMLElBQUksR0FBRyxDQUFWLEVBQVk7QUFDUixZQUFHLEtBQUtoTCxhQUFMLENBQW1CNEUsYUFBbkIsSUFBb0MsQ0FBdkMsRUFBMEM7QUFBQztBQUN2Q3dHLFVBQUFBLElBQUksR0FBRyxLQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0RBLFVBQUFBLElBQUksR0FBRyxHQUFQO0FBQ0FELFVBQUFBLE9BQU8sR0FBR3RHLEtBQVY7QUFDSDs7QUFDRCxhQUFLcEYsYUFBTCxHQUFxQixHQUFyQjtBQUNILE9BUkQsTUFRSztBQUNELFlBQUcsS0FBS08sYUFBTCxDQUFtQjRFLGFBQW5CLElBQW9DLENBQXZDLEVBQTBDO0FBQUM7QUFDdkN3RyxVQUFBQSxJQUFJLEdBQUcsS0FBUDtBQUNILFNBRkQsTUFFSztBQUNEQSxVQUFBQSxJQUFJLEdBQUcsS0FBUDtBQUNBRCxVQUFBQSxPQUFPLEdBQUcsQ0FBQ3RHLEtBQVg7QUFDSDs7QUFDRCxhQUFLcEYsYUFBTCxHQUFxQixHQUFyQjtBQUNIO0FBQ0o7O0FBQ0QsUUFBSTRMLFNBQVMsR0FBRyxLQUFLM0ssSUFBTCxDQUFVNEssY0FBVixDQUF5QixjQUFjLEtBQUs3TCxhQUE1QyxDQUFoQjtBQUNBLFFBQUk4TCxHQUFHLEdBQUdGLFNBQVMsQ0FBQ0MsY0FBVixDQUF5QixJQUF6QixFQUErQkEsY0FBL0IsQ0FBOEMsS0FBOUMsQ0FBVjs7QUFDQSxRQUFHRCxTQUFTLENBQUNyRSxLQUFWLElBQW1CLENBQW5CLElBQXdCLEtBQUt0RyxJQUFMLENBQVV3QixZQUFWLENBQXVCQyxFQUFFLENBQUNDLE1BQTFCLEVBQWtDd0ksV0FBbEMsSUFBaUQsSUFBNUUsRUFBaUY7QUFDN0UsVUFBSXpDLElBQUksR0FBRyxLQUFLekgsSUFBTCxDQUFVd0IsWUFBVixDQUF1QkMsRUFBRSxDQUFDQyxNQUExQixFQUFrQ3dJLFdBQWxDLENBQThDQyxlQUE5QyxFQUFYO0FBQ0FRLE1BQUFBLFNBQVMsQ0FBQ0csTUFBVixHQUFtQixJQUFuQjtBQUNBSCxNQUFBQSxTQUFTLENBQUNyRSxLQUFWLEdBQW1CbUIsSUFBSSxDQUFDbkIsS0FBeEI7QUFDQXFFLE1BQUFBLFNBQVMsQ0FBQ3BFLE1BQVYsR0FBbUJrQixJQUFJLENBQUNsQixNQUF4Qjs7QUFDQSxVQUFHLEtBQUtqSCxhQUFMLENBQW1Cc0osVUFBbkIsQ0FBOEJpQixPQUE5QixDQUFzQyxJQUF0QyxLQUErQyxDQUFDLENBQW5ELEVBQXFEO0FBQ2pELFlBQUlDLEdBQUcsR0FBRyxDQUFDLEtBQUt4SyxhQUFMLENBQW1Cc0osVUFBbkIsR0FBOEIsRUFBL0IsRUFBbUNtQixLQUFuQyxDQUF5QyxJQUF6QyxDQUFWO0FBQ0FjLFFBQUFBLEdBQUcsQ0FBQ3JKLFlBQUosQ0FBaUJDLEVBQUUsQ0FBQ3NKLEtBQXBCLEVBQTJCQyxNQUEzQixHQUFvQ2xCLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBUyxJQUFULEdBQWdCQSxHQUFHLENBQUMsQ0FBRCxDQUF2RDtBQUNILE9BSEQsTUFHSztBQUNEZSxRQUFBQSxHQUFHLENBQUNySixZQUFKLENBQWlCQyxFQUFFLENBQUNzSixLQUFwQixFQUEyQkMsTUFBM0IsR0FBb0MsS0FBSzFMLGFBQUwsQ0FBbUJzSixVQUF2RDtBQUNIO0FBQ0o7O0FBRUQsUUFBRyxLQUFLN0ssS0FBTCxDQUFXcUUsYUFBWCxFQUFILEVBQThCO0FBQzFCLFVBQUcsS0FBSzlDLGFBQUwsQ0FBbUI0RSxhQUFuQixJQUFvQyxDQUF2QyxFQUEwQztBQUFDO0FBQ3ZDLFlBQUdvRyxJQUFJLEdBQUcsQ0FBVixFQUFZO0FBQ1I7QUFDQU8sVUFBQUEsR0FBRyxDQUFDdkksTUFBSixHQUFhLENBQWI7QUFDSCxTQUhELE1BR0s7QUFDRDtBQUNBdUksVUFBQUEsR0FBRyxDQUFDdkksTUFBSixHQUFhLENBQWI7QUFDSDtBQUNKLE9BUkQsTUFRSztBQUNELFlBQUdnSSxJQUFJLEdBQUcsQ0FBVixFQUFZO0FBQ1I7QUFDQU8sVUFBQUEsR0FBRyxDQUFDTixNQUFKLEdBQWEsQ0FBQyxDQUFkO0FBQ0gsU0FIRCxNQUdLLENBQ0Q7QUFDSDtBQUNKO0FBQ0osS0FqQkQsTUFpQks7QUFDRCxVQUFHLEtBQUtqTCxhQUFMLENBQW1CNEUsYUFBbkIsSUFBb0MsQ0FBdkMsRUFBMEM7QUFBQztBQUN2QyxZQUFHb0csSUFBSSxHQUFHLENBQVYsRUFBWTtBQUNSO0FBQ0FPLFVBQUFBLEdBQUcsQ0FBQ04sTUFBSixHQUFhLENBQUMsQ0FBZDtBQUNILFNBSEQsTUFHSyxDQUNEO0FBQ0g7QUFDSixPQVBELE1BT007QUFDRixZQUFHRCxJQUFJLEdBQUcsQ0FBVixFQUFZO0FBQ1JPLFVBQUFBLEdBQUcsQ0FBQ3ZJLE1BQUosR0FBYSxDQUFDLENBQWQsQ0FEUSxDQUVSO0FBQ0gsU0FIRCxNQUdLLENBQ0Q7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsUUFBRyxLQUFLaEQsYUFBTCxDQUFtQjRFLGFBQW5CLElBQW9DLENBQXZDLEVBQXlDO0FBQ3JDeUcsTUFBQUEsU0FBUyxDQUFDeEcsS0FBVixHQUFtQnNHLE9BQW5CO0FBQ0g7QUFDSixHQTFnQm1CO0FBMmdCcEI7QUFDQXhMLEVBQUFBLE9BNWdCb0IscUJBNGdCWDtBQUNMLFNBQUtILFNBQUwsR0FBaUIsS0FBakIsQ0FESyxDQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0FsaEJtQjtBQW1oQnBCO0FBQ0FzQyxFQUFBQSxLQXBoQm9CLGlCQW9oQmQ2SixPQXBoQmMsRUFvaEJ5QjtBQUFBOztBQUFBLFFBQS9CQyxPQUErQix1RUFBckIsQ0FBQyxDQUFvQjtBQUFBLFFBQWxCQyxZQUFrQix1RUFBSCxDQUFDLENBQUU7QUFDekN6TixJQUFBQSxNQUFNLENBQUM2SCxPQUFQLENBQWVDLElBQWYsQ0FBb0JoSSxLQUFLLENBQUNpSSxXQUFOLENBQWtCMkYsa0JBQXRDLEVBQTBEO0FBQUNDLE1BQUFBLE1BQU0sRUFBQyxLQUFLeEYsU0FBTCxLQUFpQjtBQUF6QixLQUExRDs7QUFDQSxRQUFHc0YsWUFBWSxHQUFHLENBQWxCLEVBQW9CO0FBQ2hCLFdBQUtHLFlBQUwsQ0FBa0IsWUFBSTtBQUNsQixRQUFBLE1BQUksQ0FBQ0MsU0FBTCxDQUFlTixPQUFmLEVBQXVCQyxPQUF2QjtBQUNILE9BRkQsRUFFRUMsWUFGRjtBQUdILEtBSkQsTUFJSztBQUNELFdBQUtJLFNBQUwsQ0FBZU4sT0FBZixFQUF1QkMsT0FBdkI7QUFDSDtBQUNKLEdBN2hCbUI7QUE4aEJwQjtBQUNBSyxFQUFBQSxTQS9oQm9CLHFCQStoQlZOLE9BL2hCVSxFQStoQlc7QUFBQTs7QUFBQSxRQUFiQyxPQUFhLHVFQUFILENBQUMsQ0FBRTtBQUMzQnhOLElBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0IyRixrQkFBdEMsRUFBMEQ7QUFBQ0MsTUFBQUEsTUFBTSxFQUFDLEtBQUt4RixTQUFMLEtBQWlCO0FBQXpCLEtBQTFEO0FBQ0EsU0FBSzVHLE9BQUw7QUFDQSxTQUFLZSxJQUFMLENBQVV3QixZQUFWLENBQXVCQyxFQUFFLENBQUNnRCxXQUExQixFQUF1QzlDLE9BQXZDLEdBQWlELEtBQWpELENBSDJCLENBSTNCOztBQUNBLFNBQUs2SixPQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS3JOLFFBQUwsR0FBZ0IsS0FBaEI7O0FBQ0EsUUFBRyxLQUFLc04sY0FBTCxJQUF1QixLQUFLQSxjQUFMLENBQW9CekUsTUFBcEIsR0FBNkIsQ0FBdkQsRUFBeUQ7QUFDckQsVUFBSTBFLEdBQUcsR0FBRyxLQUFLRCxjQUFMLENBQW9CekUsTUFBOUI7O0FBQ0EsV0FBSyxJQUFJeEQsQ0FBQyxHQUFHLENBQWIsRUFBZUEsQ0FBQyxHQUFDa0ksR0FBakIsRUFBcUJsSSxDQUFDLEVBQXRCLEVBQXlCO0FBQ3JCLGFBQUtpSSxjQUFMLENBQW9CakksQ0FBcEIsRUFBdUJoQyxZQUF2QixDQUFvQyxjQUFwQyxFQUFvRG1LLFNBQXBELENBQThELEtBQUs5RixTQUFMLEVBQTlEO0FBQ0g7QUFDSjs7QUFFRCxRQUFHb0YsT0FBTyxJQUFJek4sS0FBSyxDQUFDNkQsUUFBakIsSUFBNkIsS0FBSy9CLGFBQUwsQ0FBbUJzTSxLQUFuQixJQUE0QixDQUE1RCxFQUE4RDtBQUMxRGxPLE1BQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0JvRyxRQUF0QztBQUNIOztBQUNELFNBQUtKLGNBQUwsR0FBc0IsSUFBdEI7O0FBQ0EsUUFBR1IsT0FBTyxJQUFJek4sS0FBSyxDQUFDc08sUUFBcEIsRUFBNkI7QUFDekIsV0FBS3hOLEtBQUwsR0FBYSxLQUFiO0FBQ0EsV0FBSzBCLElBQUwsQ0FBVWlHLEtBQVYsR0FBa0J6SSxLQUFLLENBQUMwSSxRQUFOLENBQWU2RixJQUFqQztBQUNBLFVBQU1DLElBQUksR0FBRyxHQUFiO0FBQ0EsVUFBSUMsUUFBSjtBQUNBLFVBQU1DLEVBQUUsR0FBRyxDQUFYO0FBQ0EsVUFBSUMsR0FBSjs7QUFDQSxVQUFHLEtBQUtwTyxLQUFMLENBQVdxRSxhQUFYLEVBQUgsRUFBOEI7QUFDMUI2SixRQUFBQSxRQUFRLEdBQUcsQ0FBQyxHQUFELEdBQU8sQ0FBbEI7QUFDQUUsUUFBQUEsR0FBRyxHQUFHMUssRUFBRSxDQUFDMkssS0FBSCxDQUNGM0ssRUFBRSxDQUFDNEssT0FBSCxDQUFXTCxJQUFYLEVBQWdCRSxFQUFoQixDQURFLEVBRUZ6SyxFQUFFLENBQUM2SyxRQUFILENBQVlOLElBQVosRUFBaUJDLFFBQWpCLENBRkUsQ0FBTjtBQUlILE9BTkQsTUFNSztBQUNEQSxRQUFBQSxRQUFRLEdBQUcsQ0FBQyxHQUFELEdBQU8sQ0FBbEI7QUFDQUUsUUFBQUEsR0FBRyxHQUFHMUssRUFBRSxDQUFDMkssS0FBSCxDQUNGM0ssRUFBRSxDQUFDNEssT0FBSCxDQUFXTCxJQUFYLEVBQWdCRSxFQUFoQixDQURFLEVBRUZ6SyxFQUFFLENBQUM2SyxRQUFILENBQVlOLElBQVosRUFBaUJDLFFBQWpCLENBRkUsQ0FBTjtBQUlIOztBQUNELFdBQUs3RixTQUFMLENBQWUsS0FBZixFQUFxQixJQUFyQixFQXBCeUIsQ0FvQkU7O0FBQzNCLFdBQUtwRyxJQUFMLENBQVUwRSxjQUFWO0FBQ0EsV0FBSzFFLElBQUwsQ0FBVTRFLFNBQVYsQ0FBb0JuRCxFQUFFLENBQUNvRCxRQUFILENBQVlzSCxHQUFaLEVBQWdCMUssRUFBRSxDQUFDdUQsUUFBSCxDQUFZLFlBQUk7QUFDaEQsUUFBQSxNQUFJLENBQUNDLE9BQUw7QUFDSCxPQUZtQyxDQUFoQixDQUFwQjtBQUdILEtBekJELE1BeUJNLElBQUdnRyxPQUFPLElBQUl6TixLQUFLLENBQUMrTyxRQUFwQixFQUE2QjtBQUMvQixVQUFJQyxRQUFRLEdBQUcsS0FBS3hNLElBQUwsQ0FBVW1FLEtBQVYsR0FBa0IsRUFBakM7QUFDQSxVQUFJQSxLQUFLLEdBQUcsS0FBS25FLElBQUwsQ0FBVW1FLEtBQVYsR0FBa0IsQ0FBbEIsR0FBc0IsS0FBS25FLElBQUwsQ0FBVW1FLEtBQVYsR0FBa0IsRUFBeEMsR0FBNkMsS0FBS25FLElBQUwsQ0FBVW1FLEtBQVYsR0FBa0IsRUFBM0U7O0FBQ0EsVUFBSWdJLElBQUcsR0FBRzFLLEVBQUUsQ0FBQ29ELFFBQUgsQ0FDTnBELEVBQUUsQ0FBQzZLLFFBQUgsQ0FBWSxHQUFaLEVBQWdCbkksS0FBaEIsQ0FETSxFQUVOMUMsRUFBRSxDQUFDNkssUUFBSCxDQUFZLEdBQVosRUFBZ0J2TCxNQUFNLENBQUN5TCxRQUFELENBQXRCLENBRk0sQ0FBVjs7QUFJQSxXQUFLeE0sSUFBTCxDQUFVMEUsY0FBVjtBQUNBLFdBQUsxRSxJQUFMLENBQVU0RSxTQUFWLENBQW9CbkQsRUFBRSxDQUFDb0QsUUFBSCxDQUFZcEQsRUFBRSxDQUFDZ0wsTUFBSCxDQUFVTixJQUFWLEVBQWMsQ0FBZCxDQUFaLEVBQTZCMUssRUFBRSxDQUFDNEssT0FBSCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQTdCLEVBQTZDNUssRUFBRSxDQUFDdUQsUUFBSCxDQUFZLFlBQUk7QUFDN0UsUUFBQSxNQUFJLENBQUNDLE9BQUw7QUFDSCxPQUZnRSxDQUE3QyxDQUFwQjtBQUdILEtBWEssTUFXQSxJQUFHZ0csT0FBTyxJQUFJek4sS0FBSyxDQUFDa1AsUUFBcEIsRUFBNkI7QUFDL0IsV0FBSzFNLElBQUwsQ0FBVTBFLGNBQVY7O0FBQ0EsVUFBSXlILEtBQUcsR0FBRzFLLEVBQUUsQ0FBQzJLLEtBQUgsQ0FDTjNLLEVBQUUsQ0FBQzRLLE9BQUgsQ0FBVyxDQUFYLEVBQWEsSUFBYixFQUFrQixJQUFsQixDQURNLEVBRU41SyxFQUFFLENBQUNnTCxNQUFILENBQVVoTCxFQUFFLENBQUNrTCxRQUFILENBQVksR0FBWixFQUFnQixHQUFoQixDQUFWLEVBQStCLENBQS9CLENBRk0sRUFHTmxMLEVBQUUsQ0FBQ29ELFFBQUgsQ0FDSXBELEVBQUUsQ0FBQ21MLE1BQUgsQ0FBVSxHQUFWLEVBQWMsS0FBSzVNLElBQUwsQ0FBVUMsQ0FBVixHQUFjLENBQTVCLEVBQThCLEtBQUtELElBQUwsQ0FBVUUsQ0FBVixHQUFjLENBQTVDLENBREosRUFFSXVCLEVBQUUsQ0FBQ21MLE1BQUgsQ0FBVSxHQUFWLEVBQWMsS0FBSzVNLElBQUwsQ0FBVUMsQ0FBVixHQUFjLENBQTVCLEVBQThCLEtBQUtELElBQUwsQ0FBVUUsQ0FBVixHQUFjLENBQTVDLENBRkosQ0FITSxDQUFWOztBQVFBLFdBQUtGLElBQUwsQ0FBVTRFLFNBQVYsQ0FBb0JuRCxFQUFFLENBQUNvRCxRQUFILENBQVlzSCxLQUFaLEVBQWdCMUssRUFBRSxDQUFDdUQsUUFBSCxDQUFZLFlBQUk7QUFDaEQsUUFBQSxNQUFJLENBQUNDLE9BQUw7QUFDSCxPQUZtQyxDQUFoQixDQUFwQjtBQUdILEtBYkssTUFhRDtBQUNELFdBQUtBLE9BQUw7QUFDSDtBQUNKLEdBcm1CbUI7QUFzbUJwQjtBQUNBQSxFQUFBQSxPQXZtQm9CLHFCQXVtQlg7QUFDTCxTQUFLNEgsZ0JBQUw7QUFDQSxRQUFJQyxNQUFNLEdBQUcvTCxNQUFNLENBQUMsS0FBSzhFLFNBQUwsS0FBaUIsRUFBbEIsQ0FBbkI7QUFDQW5JLElBQUFBLE1BQU0sQ0FBQzZILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmhJLEtBQUssQ0FBQ2lJLFdBQU4sQ0FBa0IyRixrQkFBdEMsRUFBMEQ7QUFBQ0MsTUFBQUEsTUFBTSxFQUFDLEtBQUt4RixTQUFMLEtBQWlCO0FBQXpCLEtBQTFEO0FBQ0EsU0FBSzNILFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFHLEtBQUtKLFNBQVIsRUFBa0IsS0FBS0EsU0FBTCxDQUFlOE8sT0FBZjs7QUFDbEIsUUFBRyxLQUFLL00sSUFBTCxDQUFVZ04sTUFBYixFQUFvQjtBQUNoQixXQUFLaE4sSUFBTCxDQUFVZ04sTUFBVixDQUFpQkMsV0FBakIsQ0FBNkIsS0FBS2pOLElBQWxDO0FBQ0gsS0FYSSxDQVlMOzs7QUFDQSxRQUFHLENBQUMsS0FBS3BCLFVBQVQsRUFBb0I7QUFDaEJsQixNQUFBQSxNQUFNLENBQUM2SCxPQUFQLENBQWVDLElBQWYsQ0FBb0JoSSxLQUFLLENBQUNpSSxXQUFOLENBQWtCeUgsZUFBdEMsRUFBc0RKLE1BQXREO0FBQ0g7O0FBQ0QsUUFBRyxLQUFLL08sS0FBUixFQUFjO0FBQ1YsVUFBSW9QLEdBQUcsR0FBRyxLQUFLcFAsS0FBTCxDQUFXcVAsVUFBWCxDQUFzQnZELE9BQXRCLENBQThCaUQsTUFBOUIsQ0FBVjs7QUFDQSxVQUFHSyxHQUFHLElBQUksQ0FBQyxDQUFYLEVBQWE7QUFDVCxhQUFLcFAsS0FBTCxDQUFXcVAsVUFBWCxDQUFzQkMsTUFBdEIsQ0FBNkJGLEdBQTdCLEVBQWlDLENBQWpDLEVBRFMsQ0FDMkI7QUFDdkM7O0FBQ0QsV0FBS25OLElBQUwsQ0FBVXNOLEdBQVYsQ0FBYzdMLEVBQUUsQ0FBQzhMLElBQUgsQ0FBUUMsU0FBUixDQUFrQkMsV0FBaEM7QUFDQSxXQUFLMVAsS0FBTCxDQUFXMlAsUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0IsS0FBSzNOLElBQTdCO0FBQ0g7O0FBQ0QsU0FBS2pDLEtBQUwsR0FBZ0IsSUFBaEI7QUFFSCxHQWpvQm1CO0FBa29CcEI7QUFDQTZQLEVBQUFBLFlBbm9Cb0Isd0JBbW9CUHBLLENBbm9CTyxFQW1vQkw7QUFBQTs7QUFDWCxRQUFJc0IsU0FBUyxHQUFHLE9BQU8sTUFBSXRCLENBQTNCO0FBQ0EsUUFBTXFLLE9BQU8sR0FBRyxDQUFoQjs7QUFDQSxRQUFHL0ksU0FBUyxHQUFHK0ksT0FBZixFQUF1QjtBQUNuQi9JLE1BQUFBLFNBQVMsR0FBRzdELElBQUksQ0FBQ21JLE1BQUwsS0FBZ0J5RSxPQUE1QjtBQUNIOztBQUNELFNBQUt2QyxZQUFMLENBQWtCLFlBQUk7QUFDbEIsVUFBRyxNQUFJLENBQUN0TCxJQUFMLElBQWEsSUFBaEIsRUFBcUI7QUFDakIsUUFBQSxNQUFJLENBQUNBLElBQUwsQ0FBVStNLE9BQVY7QUFDSDtBQUNKLEtBSkQsRUFJRWpJLFNBSkY7QUFLSCxHQTlvQm1CO0FBK29CcEJnSixFQUFBQSxTQS9vQm9CLHVCQStvQlI7QUFDUixTQUFLMVAsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtMLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBS0csUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtHLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFnQixDQUFoQjtBQUNIO0FBdHBCbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcclxuICogIOaNlemxvO+8mumxvO+8jOWIneWni+WMliDmkq3mlL7lm77niYfjgIHnp7vliqjvvIjlkIzmraXnirbmgIHvvIlcclxuICogKiovXHJcbmxldCBDT05TVCA9IHJlcXVpcmUoXCJuZmlzaENvbnN0XCIpO1xyXG5nbEdhbWUubW92aWVDbGlwLmV4dGVuZCh7XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEZpc2hNb3ZpZUNsaXAoKTsvL+iwg+eUqOWfuuexu+eahOWIneWni+WMluWKqOeUu+aWueazlVxyXG4gICAgICAgIHRoaXMubG9naWMgPSByZXF1aXJlKFwibmZpc2hsb2dpY1wiKS5nZXRJbnN0YW5jZSgpOy8v5pWw5o2u5Lit5b+DXHJcbiAgICAgICAgdGhpcy53aGlybHBvb2w9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maXNoRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYlVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubW92ZUxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9zQXJyYXkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNIaXQgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpdFRpbWUgID0gMDtcclxuICAgICAgICB0aGlzLmlzUGxheVN0YXJ0TWMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZFNwZWVkID0gMDtcclxuICAgICAgICB0aGlzLnNob3dCdWJibGVzVGltZSA9IDE7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1YmJsZXNUaW1lID0gLTE7XHJcbiAgICAgICAgdGhpcy5pc1F1aWNrRGllID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BsYXllclNvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dUaXAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW50YWluZXJOYW1lID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMlumxvFxyXG4gICAgaW5pdEZpc2goZmlzaERhdGEpe1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGlkZVRpcCgpO1xyXG4gICAgICAgIHRoaXMuZmlzaERhdGEgICAgID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaXNoRGF0YSkpO1xyXG4gICAgICAgIHRoaXMubW92ZUxpc3QgICAgID0gdGhpcy5maXNoRGF0YS5tb3ZlTGlzdDtcclxuICAgICAgICB0aGlzLnBvc0FycmF5ICAgICA9IHRoaXMuZmlzaERhdGEucG9zQXJyYXk7XHJcbiAgICAgICAgdGhpcy5zaG93VGltZSAgICAgPSB0aGlzLmZpc2hEYXRhLnNob3dUaW1lOyAgICAgLy/phY3nva7ooajpu5jorqQg562J5b6FIOaXtumXtFxyXG4gICAgICAgIHRoaXMubG9jYWxGaXNoRGF0YT0gdGhpcy5sb2dpYy5qc29uX2Zpc2hUYWJsZVt0aGlzLmZpc2hEYXRhLmZpc2hUeXBlSWQrXCJcIl07XHJcbiAgICAgICAgdGhpcy5yZXNHcm91cElkICAgPSB0aGlzLmxvY2FsRmlzaERhdGEucmVzR3JvdXBJZDtcclxuICAgICAgICB0aGlzLmZpc2hSZXNEYXRhICA9IHRoaXMubG9naWMuanNvbl9maXNoUmVzRWRpdFtcImZpc2hcIit0aGlzLnJlc0dyb3VwSWRdO1xyXG4gICAgICAgIHRoaXMucnVuVGltZSAgICAgID0gdGhpcy5maXNoRGF0YS5ydW5UaW1lOyAgICAgIC8v5oC75pe26Ze0XHJcbiAgICAgICAgdGhpcy5fdGltZSAgICAgICAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMubm9kZS54ICAgICAgID0gdGhpcy5wb3NBcnJheVswXS54O1xyXG4gICAgICAgIHRoaXMubm9kZS55ICAgICAgID0gdGhpcy5wb3NBcnJheVswXS55O1xyXG4gICAgICAgIGxldCBmaXNoTG9jYWxEYXRhID0gdGhpcy5sb2dpYy5qc29uX2Zpc2hUYWJsZVt0aGlzLmZpc2hEYXRhLmZpc2hUeXBlSWQrXCJcIl07XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggID0gZmlzaExvY2FsRGF0YS5yZXNIaWVyYXJjaHk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZmlzaERhdGEuZnJlcXVlbmN5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucnVuU3BlZWQgPSB0aGlzLmxvY2FsRmlzaERhdGEuZnJhbWVSYXRlICogdGhpcy5maXNoRGF0YS5mcmVxdWVuY3kgKiBDT05TVC5SdW5mcmVxdWVuY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGl2ZVRpbWUgPSAoZmlzaERhdGEuc2VydmVyVGltZSAtIGZpc2hEYXRhLmNyZWF0ZVRpbWUpLzEwMDA7IC8v5Ye655Sf5pe26Ze0XHJcbiAgICAgICAgdGhpcy5fYWxsVGltZSA9IE51bWJlcih0aGlzLnJ1blRpbWUrdGhpcy5zaG93VGltZStcIlwiKTsgICAgIC8v5pyA5aSn5a+/5ZG95pe26Ze0XHJcbiAgICAgICAgbGV0IG5ld0xpdmVUaW1lID0gTWF0aC5hYnMobGl2ZVRpbWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+efq+atoyDlt7Lnu4/lh7rnlJ/ml7bpl7RcclxuICAgICAgICBpZihsaXZlVGltZSA8IDApey8v5rKh5Ye655SfXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgKz0gbmV3TGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBuZXdMaXZlVGltZSA9IE1hdGguYWJzKGxpdmVUaW1lKTsgICAgICAgICAgICAgICAgICAgICAgICAvL+efq+atoyDlt7Lnu4/lh7rnlJ/ml7bpl7RcclxuICAgICAgICAgICAgaWYobmV3TGl2ZVRpbWUgPj0gdGhpcy5fYWxsVGltZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYXRoKENPTlNULmRpZVR5cGUwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYobmV3TGl2ZVRpbWUgPiB0aGlzLnNob3dUaW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IG5ld0xpdmVUaW1lIC0gdGhpcy5zaG93VGltZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgLT0gbmV3TGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3N0YXJ0VGltZSA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZSgpOy8v55u05o6l5byA5aeL56e75YqoXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2JVcGRhdGUgICAgID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnRNb3ZlKCl7XHJcbiAgICAgICAgdGhpcy5zZXRCb3hDb2xsaWRlclNpemVPZmZzZXRBbmRBbmNob3IoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEZpc2hSdW5pbmcoKTtcclxuICAgICAgICB0aGlzLmlzUGxheVN0YXJ0TWMgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dUaW1lID0gLTE7XHJcbiAgICAgICAgdGhpcy5fYlVwZGF0ZSAgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IE5vdFNheSA9IDA7XHJcbiAgICAgICAgY29uc3QgQ2hhdFZvaWNlVHlwZTIgPSAyO1xyXG4gICAgICAgIGNvbnN0IEZpc2hSdW5UaW1lID0gdGhpcy5ydW5UaW1lO1xyXG5cclxuICAgICAgICBpZihOdW1iZXIodGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRWb2ljZVR5cGUpICE9IE5vdFNheSB8fCBOdW1iZXIodGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRWb2ljZVR5cGUpICE9IENoYXRWb2ljZVR5cGUyKXtcclxuICAgICAgICAgICAgY29uc3QgUDIwID0gRmlzaFJ1blRpbWUgKiAwLjI7XHJcbiAgICAgICAgICAgIGNvbnN0IFA0MCA9IEZpc2hSdW5UaW1lICogMC4zNTtcclxuICAgICAgICAgICAgLy/orqHnrpfov5DooYzml7bpl7Qg5qC55o2u6KeE5YiZ6ZyA6KaB6L+Q6KGM5YiwIDIwLTQwJSDnmoTljLrpl7TmiY3lj6/ku6Xmkq3mlL5cclxuICAgICAgICAgICAgdGhpcy5zaG93QnViYmxlc1RpbWUgPSAtTWF0aC5hYnModGhpcy5sb2dpYy5nZXRSYW5kb21OdW0oUDIwLFA0MCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbGRTY2FsZVkgPSAtdGhpcy5ub2RlLnNjYWxlWTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHRoaXMubm9kZS5vbGRTY2FsZVk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmUoZHQpe1xyXG4gICAgICAgIC8v5piv5ZCm5Y+v5Lul5byA5aeL6K6h5pe2XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUxpc3QgJiYgdGhpcy5zaG93VGltZSA+IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYodGhpcy5zaG93VGltZTw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZSgpOy8v5byA5aeL56e75YqoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/np7vliqhcclxuICAgICAgICBpZiAodGhpcy5fYlVwZGF0ZSAmJiB0aGlzLm1vdmVMaXN0ICYmIHRoaXMuc2hvd1RpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbF90aW1lID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAodGhpcy5fc3RhcnRUaW1lICsgKGxfdGltZSAtIHRoaXMuX3RpbWUpIC8gMTAwMCkgKyAodGhpcy5fc3RhcnRUaW1lICogdGhpcy5hZGRTcGVlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSBsX3RpbWVcclxuICAgICAgICAgICAgLy/kuozpmLbotJ3loZ7lsJTmm7Lnur/ov5DliqhcclxuICAgICAgICAgICAgdGhpcy50aW1lSW5kZXggPSB0aGlzLmdldEluZGV4QnlUaW1lKHRoaXMuX3N0YXJ0VGltZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVJbmRleCA9PSAtMSkgey8v5Yiw5bC95aS05LqG77yM6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYXRoKENPTlNULmRpZVR5cGUwKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0O1xyXG4gICAgICAgICAgICBsZXQgY3VyclRpbWU7XHJcbiAgICAgICAgICAgIGxldCBuZXh0VGltZTtcclxuICAgICAgICAgICAgaWYodGhpcy5sYXN0SW5kZXggPT0gbnVsbCB8fCB0aGlzLnRpbWVJbmRleCAhPSB0aGlzLmxhc3RJbmRleCl7XHJcbiAgICAgICAgICAgICAgICBjdXJyVGltZSA9IHRoaXMuZ2V0VGltZUJ5SW5kZXgodGhpcy50aW1lSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgbmV4dFRpbWUgPSB0aGlzLmdldFRpbWVCeUluZGV4KHRoaXMudGltZUluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJUaW1lID0gY3VyclRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRUaW1lID0gbmV4dFRpbWU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnJUaW1lID0gdGhpcy5jdXJyVGltZTtcclxuICAgICAgICAgICAgICAgIG5leHRUaW1lID0gdGhpcy5uZXh0VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnogPSB0aGlzLl9zdGFydFRpbWUgLSBjdXJyVGltZTtcclxuICAgICAgICAgICAgbGV0IGZtID0gbmV4dFRpbWUgLSBjdXJyVGltZTtcclxuICAgICAgICAgICAgdCAgPSBmei9mbTtcclxuICAgICAgICAgICAgY29uc3QgRklSU1QgPSAyO1xyXG4gICAgICAgICAgICBjb25zdCBTQ0VOVCA9IDM7XHJcbiAgICAgICAgICAgIGNvbnN0IEJ6X09uZVBvcyA9IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IEJ6X1Rvd1BvcyA9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IEJ6X1RocmVlUG9zID0gMjtcclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLnRpbWVJbmRleCA+IDAgPyAgU0NFTlQgKiB0aGlzLnRpbWVJbmRleCA6IEZJUlNUICogdGhpcy50aW1lSW5kZXg7XHJcbiAgICAgICAgICAgIGxldCBhID0gdGhpcy5wb3NBcnJheVtpICsgQnpfT25lUG9zXTtcclxuICAgICAgICAgICAgbGV0IGIgPSB0aGlzLnBvc0FycmF5W2kgKyBCel9Ub3dQb3NdO1xyXG4gICAgICAgICAgICBsZXQgYyA9IHRoaXMucG9zQXJyYXlbaSArIEJ6X1RocmVlUG9zXTtcclxuICAgICAgICAgICAgaWYoIWEpey8v5ou/5LiN5Yiw5pWw5o2u77yM5Yiw5bC95aS05LqG77yM6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYXRoKENPTlNULmRpZVR5cGUwKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6L2o6L+56L+Q5YqoXHJcbiAgICAgICAgICAgIGxldCB4ID0gKE1hdGgucG93KDEgLSB0LCAyKSAqIGEueCArIDIgKiB0ICogKDEgLSB0KSAqIGIueCArIE1hdGgucG93KHQsIDIpICogYy54KSAqIHRoaXMubG9naWMuZ2FtZVpvb21YO1xyXG4gICAgICAgICAgICBsZXQgeSA9IChNYXRoLnBvdygxIC0gdCwgMikgKiBhLnkgKyAyICogdCAqICgxIC0gdCkgKiBiLnkgKyBNYXRoLnBvdyh0LCAyKSAqIGMueSkgKiB0aGlzLmxvZ2ljLmdhbWVab29tWTtcclxuICAgICAgICAgICAgLy/orr7nva7mnJ3lkJFcclxuICAgICAgICAgICAgbGV0IG5ld0FuZ2xlID0gdGhpcy5zZXRBbmdsZSh4LHksdGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2NhbEZpc2hEYXRhLmZpeGVkUmVzb3VyY2UgIT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBuZXdBbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0geTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXggPSB0aGlzLnRpbWVJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lhrDlhrsv6Kej5Ya7XHJcbiAgICBzZXR0aW5nSWNpbmcoaXNJbkZyZWV6ZSl7XHJcbiAgICAgICAgaWYoaXNJbkZyZWV6ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9iVXBkYXRlID0gaXNJbkZyZWV6ZTtcclxuICAgIH0sXHJcbiAgICAvL+W/q+mAn+enu+WKqFxyXG4gICAgcXVpY2tEaWUoaXNsb3cgPSB0cnVlKXtcclxuICAgICAgICBpZih0aGlzLl9iVXBkYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5pc1F1aWNrRGllID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ydW5TcGVlZCA9IGlzbG93ID8gMC4wMDAzIDogMC4wMDA0OyAvL+WKoOW/q+W4p+aSreaUviDljp/mnaUgMC4wMTY2XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3BlZWQgPSBpc2xvdyA/IDAuMDIgOiAwLjAwMztcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgIGlmKGNvbGxpZGVyKXtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IE9uZVRpbWUgPSAzO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShPbmVUaW1lKSxjYy5mYWRlVG8oMC41LDApLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mmK/lkKbmraPlnKjlv6vpgJ/np7vliqjmrbvkuqFcclxuICAgIGlzV2VsbERpZSgpe1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc1F1aWNrRGllO1xyXG4gICAgfSxcclxuICAgIC8v6K6+5a6a6ZSB5a6a6bG85piv6Ieq5bexXHJcbiAgICBsb2NrU2VsZigpe1xyXG4gICAgICAgIGxldCBuYW1lSUQgPSBOdW1iZXIodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMubG9ja0Zpc2hJRCAhPSBuYW1lSUQpe1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnBsYXlMb2NrU3BpbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2ljLmxvY2tGaXNoSUQgPSBuYW1lSUQ7XHJcbiAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiDplIHlrpogMSAgXCIsdGhpcy5sb2dpYy5sb2NrRmlzaElEICwgXCIgaWQgXCIsdGhpcy5nZXRGaXNoSUQoKSk7XHJcbiAgICAgICAgdGhpcy5sb2dpYy5pc0F1dG8gPSB0cnVlO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlumxvOe6v2lkIOmUgeWumuOAgeeisOaSnuOAgeatu+S6oSDnrYnkvb/nlKhcclxuICAgIGdldEZpc2hJRCgpe1xyXG4gICAgICAgIGlmKHRoaXMuZmlzaERhdGEgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5maXNoRGF0YS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIC8v5b6q546v5L2TXHJcbiAgICB1cGRhdGUoZHQpe1xyXG4gICAgICAgIC8v5pKt5pS+5ri455qE5Yqo55S7XHJcbiAgICAgICAgaWYodGhpcy5pc1BsYXlTdGFydE1jKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5RmlzaE1vdmllQ2xpcChkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v56e75YqoXHJcbiAgICAgICAgdGhpcy5tb3ZlKGR0KTtcclxuICAgICAgICAvL+WtkOW8ueeisOaSniDlj5joibIg5oGi5aSN6aKc6ImyXHJcbiAgICAgICAgaWYodGhpcy5pc0hpdCl7XHJcbiAgICAgICAgICAgIHRoaXMuaGl0VGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYodGhpcy5oaXRUaW1lIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBDT05TVC5IaXRDb2xvci5Ob3JtYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zaG93QnViYmxlc1RpbWUgIT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0J1YmJsZXNUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dCdWJibGVzVGltZSA+PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1YmJsZXNUaW1lID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUYWxrKGZhbHNlLGZhbHNlKTsvL+mxvOa4uOWIsOWxj+W5lVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNsb3NlQnViYmxlc1RpbWUgPiAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdWJibGVzVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgaWYodGhpcy5jbG9zZUJ1YmJsZXNUaW1lIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVGlwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQnViYmxlc1RpbWUgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5sb2dpYyAhPSBudWxsICYmIHRoaXMubG9naWMubG9ja0Zpc2hJRCAhPSBudWxsICYmIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9PSBOdW1iZXIodGhpcy5ub2RlLm5hbWUpKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMubG9naWMuZ2V0Q2xpY2tBcmVhKHRoaXMubm9kZS5wb3NpdGlvbix0aGlzLm5vZGUud2lkdGgsdGhpcy5ub2RlLmhlaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiDop6PplIEgOSBcIit0aGlzLmxvZ2ljLmxvY2tGaXNoSUQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmxhc3RMb2NrRmlzaElEID0gTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJRCtcIlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmxvY2tGaXNoSW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5pc0xvY2tBdXRvQ2hhbmdlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmlzQXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluaXtumXtFxyXG4gICAgZ2V0SW5kZXhCeVRpbWUoZXhpc3RUaW1lKSB7XHJcbiAgICAgICAgY29uc3QgSEFMRiAgID0gMjtcclxuICAgICAgICBjb25zdCBPRkZTRVggPSAxO1xyXG4gICAgICAgIGNvbnN0IE5vdCAgICA9IC0xO1xyXG4gICAgICAgIGxldCB0aW1lICAgICA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW92ZUxpc3QubGVuZ3RoIC8gSEFMRjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSB0aW1lICsgdGhpcy5tb3ZlTGlzdFtIQUxGICogaV0gKyB0aGlzLm1vdmVMaXN0W0hBTEYgKiBpICsgT0ZGU0VYXVxyXG4gICAgICAgICAgICBpZiAodGltZSA+PSBleGlzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE5vdFxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5pe26Ze0XHJcbiAgICBnZXRUaW1lQnlJbmRleChpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IEhBTEYgICA9IDI7XHJcbiAgICAgICAgY29uc3QgT0ZGU0VYID0gMTtcclxuICAgICAgICBsZXQgdGltZSAgICAgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1vdmVMaXN0Lmxlbmd0aCAvIEhBTEY7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1lID0gdGltZSArIHRoaXMubW92ZUxpc3RbSEFMRiAqIGldICsgdGhpcy5tb3ZlTGlzdFtIQUxGICogaSArIE9GRlNFWF1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbWVcclxuICAgIH0sXHJcbiAgICAvL+iuvue9rueisOaSnuiDtuWbiuWkp+Wwj1xyXG4gICAgc2V0Qm94Q29sbGlkZXJTaXplT2Zmc2V0QW5kQW5jaG9yKCl7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgaWYoIWNvbGxpZGVyKXtcclxuICAgICAgICAgICAgY29sbGlkZXIgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29sbGlkZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5maXNoUmVzRGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmNob3JYID0gdGhpcy5maXNoUmVzRGF0YS5hbmNob3JYO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5jaG9yWSA9IHRoaXMuZmlzaFJlc0RhdGEuYW5jaG9yWTtcclxuICAgICAgICAgICAgY29sbGlkZXIub2Zmc2V0ICAgID0gY2MudjIodGhpcy5maXNoUmVzRGF0YS5vZmZzZXRYLHRoaXMuZmlzaFJlc0RhdGEub2Zmc2V0WSk7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyLnNpemUgICAgID0gY2Muc2l6ZSh0aGlzLmZpc2hSZXNEYXRhLnNpemVXLHRoaXMuZmlzaFJlc0RhdGEuc2l6ZUgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xsaWRlci50YWcgPSB0aGlzLmdldEZpc2hJRCgpK1wiXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlLm5hbWUgPSBcIlwiK3RoaXMuZ2V0RmlzaElEKCk7XHJcbiAgICB9LFxyXG4gICAgLy/lj5flh7tcclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IEhpdExvbmdUaW1lID0gMC4wODtcclxuICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBDT05TVC5IaXRDb2xvci5BdHRhY2s7XHJcbiAgICAgICAgdGhpcy5oaXRUaW1lICAgID0gSGl0TG9uZ1RpbWU7XHJcbiAgICAgICAgdGhpcy5pc0hpdCAgICAgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGFsayh0cnVlLGZhbHNlKTsvL+mxvOiiq+WHu+S4rVxyXG4gICAgfSxcclxuICAgIHNldEFuZ2xlKHgyLHkyLHBvaW50KXtcclxuICAgICAgICBsZXQgeDEgPSBwb2ludC54O1xyXG4gICAgICAgIGxldCB5MSA9IHBvaW50Lnk7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgdGhpcy5zZXRzY2FsZShhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgfSxcclxuICAgIC8vIOW8gOWni+ivtOivnSBpc0F0dGFjayA9IHRydWUg5piv6KKr5Ye75Lit5pe25YCZ55qE5pe25YCZICDvvIwgIGRlYXRoID0gdHJ1ZSDmrbvkuqHnmoTml7blgJlcclxuICAgIC8vIENoYXRWb2ljZVR5cGU6XHJcbiAgICAvLyAwPeS4jeaSreaUvuiBiuWkqeWPiuivremfs1xyXG4gICAgLy8gMT3lhaXlnLrlsY/luZUyMCV+NDAl77yMMjAl6ZqP5py65pKt5pS+6Z+z5pWI5Y+K6IGK5aSpXHJcbiAgICAvLyAyPeatu+S6oeS7heaSreaUvumfs+aViFxyXG4gICAgLy8gMz3lhaXlnLrlsY/luZUyMCV+NDAl77yM5b+F54S25pKt5pS+6IGK5aSp5ZKM6Z+z5pWIXHJcbiAgICAvLyA0PeWFpeWcuuWxj+W5lTIwJX40MCXvvIw1MCXmpoLnjofmkq3mlL7ogYrlpKnlkozpn7PmlYhcclxuICAgIC8vIDU95YWl5Zy65bGP5bmVMjAlfjQwJe+8jDI1JeamgueOh+aSreaUvuiBiuWkqeWSjOmfs+aViFxyXG4gICAgLy8gNj3lhaXlnLrlsY/luZUyMCV+NDAl77yM6KKr5Ye75Lit5pe277yM5pKt5pS+6IGK5aSp5ZKM6Z+z5pWIXHJcbiAgICBzdGFydFRhbGsoaXNBdHRhY2sgPSBmYWxzZSxkZWF0aCA9IGZhbHNlKXtcclxuICAgICAgICAvL3Rlc3Tku6PnoIFcclxuICAgICAgICAvLyBpZih0aGlzLmxvY2FsRmlzaERhdGEgPT0gbnVsbCB8fCB0aGlzLmxvY2FsRmlzaERhdGEuY2hhdEJ1YmJsZSA9PSAtMSl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYoIXRoaXMuX2JVcGRhdGUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLmlzUGxheVN0YXJ0TWMpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9naWMgPT0gdW5kZWZpbmVkIHx8IHRoaXMubG9naWMucGxheVNvdW5kVGltZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEdBUFRJTUUgPSAxMDsvL+S4iuS4gOasoeaSreaUvuaXtumXtOWSjOW9k+WJjeaXtumXtOeahOmXtOmalFxyXG4gICAgICAgIGxldCBsYXN0UGxheVRpbWUgPSAoRGF0ZS5ub3coKSAtIHRoaXMubG9naWMucGxheVNvdW5kVGltZSkvMTAwMDtcclxuICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEgPT0gbnVsbCB8fCB0aGlzLmxvY2FsRmlzaERhdGEuY2hhdEJ1YmJsZSA9PSAtMSB8fCB0aGlzLmlzUGxheWVyU291bmQgfHwgbGFzdFBsYXlUaW1lIDwgR0FQVElNRSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1BsYXllclNvdW5kID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBDaGF0Vm9pY2VUeXBlMSA9IDE7XHJcbiAgICAgICAgY29uc3QgQ2hhdFZvaWNlVHlwZTIgPSAyO1xyXG4gICAgICAgIGNvbnN0IENoYXRWb2ljZVR5cGUzID0gMztcclxuICAgICAgICBjb25zdCBDaGF0Vm9pY2VUeXBlNCA9IDQ7XHJcbiAgICAgICAgY29uc3QgQ2hhdFZvaWNlVHlwZTUgPSA1O1xyXG4gICAgICAgIGNvbnN0IENoYXRWb2ljZVR5cGU2ID0gNjtcclxuICAgICAgICBjb25zdCBCYXNlUGVyY2VudGFnZUZhY3RvciA9IDEwMDtcclxuICAgICAgICBjb25zdCBGaXNoUnVuVGltZSA9IHRoaXMucnVuVGltZTtcclxuXHJcbiAgICAgICAgaWYoZGVhdGgpe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd1RpcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQXR0YWNrKXtcclxuICAgICAgICAgICAgY29uc3QgUDIwID0gRmlzaFJ1blRpbWUgKiAoMjAvQmFzZVBlcmNlbnRhZ2VGYWN0b3IpO1xyXG4gICAgICAgICAgICBjb25zdCBQNDAgPSBGaXNoUnVuVGltZSAqICg0MC9CYXNlUGVyY2VudGFnZUZhY3Rvcik7XHJcbiAgICAgICAgICAgIGlmKE51bWJlcih0aGlzLmxvY2FsRmlzaERhdGEuY2hhdFZvaWNlVHlwZSkgPT0gQ2hhdFZvaWNlVHlwZTYgJiYgdGhpcy5fc3RhcnRUaW1lID4gUDIwICYmIHRoaXMuX3N0YXJ0VGltZSA8IFA0MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd1RpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE51bWJlcih0aGlzLmxvY2FsRmlzaERhdGEuY2hhdFZvaWNlVHlwZSkgPT0gQ2hhdFZvaWNlVHlwZTMpe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd1RpcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgSXNTaG93ID0gTWF0aC5yYW5kb20oKSAqIEJhc2VQZXJjZW50YWdlRmFjdG9yO1xyXG4gICAgICAgIGNvbnN0IFAxXzIwID0gMjAvQmFzZVBlcmNlbnRhZ2VGYWN0b3I7XHJcbiAgICAgICAgY29uc3QgUDRfMjAgPSA1MC9CYXNlUGVyY2VudGFnZUZhY3RvcjtcclxuICAgICAgICBjb25zdCBQNV8yMCA9IDI1L0Jhc2VQZXJjZW50YWdlRmFjdG9yO1xyXG4gICAgICAgIHN3aXRjaCAoTnVtYmVyKHRoaXMubG9jYWxGaXNoRGF0YS5jaGF0Vm9pY2VUeXBlKSkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXRWb2ljZVR5cGUxOlxyXG4gICAgICAgICAgICAgICAgaWYoSXNTaG93ID4gUDFfMjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93VGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXRWb2ljZVR5cGU0OlxyXG4gICAgICAgICAgICAgICAgaWYoSXNTaG93ID4gUDRfMjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93VGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXRWb2ljZVR5cGU1OlxyXG4gICAgICAgICAgICAgICAgaWYoSXNTaG93ID4gUDVfMjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93VGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzU2hvd1RpcCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aYvuekuuawlOazoVxyXG4gICAgc2hvd1RpcCgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdWJibGVzVGltZSA9IDU7XHJcbiAgICAgICAgdGhpcy5sb2dpYy5wbGF5U291bmRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBjb25zdCBGaXNoVm9pY2UgPSBcInZvaWNlRmlsZVwiO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLEZpc2hWb2ljZSt0aGlzLmxvY2FsRmlzaERhdGEudm9pY2VGaWxlKTtcclxuICAgICAgICBsZXQgdGV4dDtcclxuICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuY2hhdEJ1YmJsZS5pbmRleE9mKFwiJiZcIikgIT0gLTEpe1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gKHRoaXMubG9jYWxGaXNoRGF0YS5jaGF0QnViYmxlK1wiXCIpLnNwbGl0KFwiJiZcIik7XHJcbiAgICAgICAgICAgIHRleHQgPSBzdHJbMF0gKyBcIlxcblwiICsgc3RyWzFdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRCdWJibGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZm9sbG93RmlzaFRpcCwge1xyXG4gICAgICAgICAgICAgICAgaWQ6dGhpcy5ub2RlLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OnRleHQsXHJcbiAgICAgICAgICAgICAgICB0aW1lOkNPTlNULlRpcFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzaXplOnRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjp0aGlzLnBvc0FycmF5WzBdLnggPiAwLFxyXG4gICAgICAgICAgICAgICAgLy8gZGF0YTp0aGlzLmxvY2FsRmlzaERhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2V0c2NhbGUoYW5nbGUpe1xyXG4gICAgICAgIGNvbnN0IE5vcm1hbCA9IDE7XHJcbiAgICAgICAgY29uc3QgR29CYWNrID0gLTE7XHJcbiAgICAgICAgbGV0IG9uZVggPSB0aGlzLnBvc0FycmF5WzBdLng7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuZml4ZWRSZXNvdXJjZSA9PSAxICYmIG9uZVggPiAwKSB7Ly/mgqzmta7psbznsbvnibnmrorlpITnkIZcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSBHb0JhY2s7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gb25lWCA+IDAgPyBHb0JhY2sgOiBOb3JtYWw7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IG9uZVggPiAwID8gIE5vcm1hbCA6IEdvQmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuZml4ZWRSZXNvdXJjZSA9PSAxICYmIG9uZVggPiAwKSB7Ly/mgqzmta7psbznsbvnibnmrorlpITnkIZcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSBOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gb25lWCA+IDAgPyBHb0JhY2sgOiBOb3JtYWw7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IG9uZVggPiAwID8gIEdvQmFjayA6IE5vcm1hbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZih0aGlzLmlzU2hvd1RpcCl0aGlzLnNldFRpcFRleHQoYW5nbGUpO1xyXG4gICAgfSxcclxuICAgIC8v6K6+572udGlwXHJcbiAgICBzZXRUaXBUZXh0KGFuZ2xlKXtcclxuICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEgPT0gbnVsbCB8fCB0aGlzLmxvY2FsRmlzaERhdGEuY2hhdEJ1YmJsZSA9PSAtMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9uZVggPSB0aGlzLnBvc0FycmF5WzBdLng7XHJcbiAgICAgICAgbGV0IGJnQW5nbGUgPSAwO1xyXG4gICAgICAgIGxldCBkZXNjID0gXCJcIjtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgIGlmKG9uZVggPiAwKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9jYWxGaXNoRGF0YS5maXhlZFJlc291cmNlID09IDEpIHsvL+aCrOa1rumxvOexu+eJueauiuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MgPSBcIkEtZlwiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYmdBbmdsZSA9IC1hbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gXCJBXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnRhaW5lck5hbWUgPSBcIkFcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuZml4ZWRSZXNvdXJjZSA9PSAxKSB7Ly/mgqzmta7psbznsbvnibnmrorlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gXCJCLWZcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJnQW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gXCJCXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnRhaW5lck5hbWUgPSBcIkJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihvbmVYID4gMCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuZml4ZWRSZXNvdXJjZSA9PSAxKSB7Ly/mgqzmta7psbznsbvnibnmrorlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gXCJDLWZcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MgPSBcIkNcIjtcclxuICAgICAgICAgICAgICAgICAgICBiZ0FuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnRhaW5lck5hbWUgPSBcIkNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvY2FsRmlzaERhdGEuZml4ZWRSZXNvdXJjZSA9PSAxKSB7Ly/mgqzmta7psbznsbvnibnmrorlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gXCJELWZcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MgPSBcIkQtZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJnQW5nbGUgPSAtYW5nbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnRhaW5lck5hbWUgPSBcIkRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FudGFpbmVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FudGFpbmVyXCIgKyB0aGlzLmNhbnRhaW5lck5hbWUpO1xyXG4gICAgICAgIGxldCBsYWIgPSBjYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImxhYlwiKTtcclxuICAgICAgICBpZihjYW50YWluZXIud2lkdGggPT0gMCAmJiB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLmdldE9yaWdpbmFsU2l6ZSgpO1xyXG4gICAgICAgICAgICBjYW50YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2FudGFpbmVyLndpZHRoICA9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIGNhbnRhaW5lci5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRCdWJibGUuaW5kZXhPZihcIiYmXCIpICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGxldCBzdHIgPSAodGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRCdWJibGUrXCJcIikuc3BsaXQoXCImJlwiKTtcclxuICAgICAgICAgICAgICAgIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0clswXSArIFwiXFxuXCIgKyBzdHJbMV07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5sb2NhbEZpc2hEYXRhLmNoYXRCdWJibGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2NhbEZpc2hEYXRhLmZpeGVkUmVzb3VyY2UgPT0gMSkgey8v5oKs5rWu6bG857G754m55q6K5aSE55CGXHJcbiAgICAgICAgICAgICAgICBpZihvbmVYID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCItIEEtMSAtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi0gQi0xIC1cIjtcclxuICAgICAgICAgICAgICAgICAgICBsYWIuc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihvbmVYID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCItIEEtMiBUVFQgLVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYi5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiLSBCLTIgLVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9jYWxGaXNoRGF0YS5maXhlZFJlc291cmNlID09IDEpIHsvL+aCrOa1rumxvOexu+eJueauiuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYob25lWCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiLSBDLTEgLVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYi5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiLSBELTEgLVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihvbmVYID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiLnNjYWxlWSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiLSBDLTIgLVwiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCItIEQtMiAtXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2NhbEZpc2hEYXRhLmZpeGVkUmVzb3VyY2UgIT0gMSl7XHJcbiAgICAgICAgICAgIGNhbnRhaW5lci5hbmdsZSAgPSBiZ0FuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+makOiXj1RpcFxyXG4gICAgaGlkZVRpcCgpe1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGlwID0gZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGNhbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhbnRhaW5lclwiICsgdGhpcy5jYW50YWluZXJOYW1lKTtcclxuICAgICAgICAvLyBpZihjYW50YWluZXIpe1xyXG4gICAgICAgIC8vICAgICBjYW50YWluZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIC8v5q275LqhIC0g5byA5aeLIGRpZVR5cGU6IDAg6Ieq54S25q275LqhIDHnjqnlrrbmlLvlh7sgMuWFqOWxj+eCuOW8uSAz6Zeq55S1ICA05peL5rahIGRlbGF5RGllVGltZSDlu7bov5/mrbvkuqFcclxuICAgIGRlYXRoKGRpZVR5cGUsc2VhdE51bSA9IC0xLGRlbGF5RGllVGltZSA9IC0xKXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNsZWFyRm9sbG93RmlzaFRpcCwge2Zpc2hJZDp0aGlzLmdldEZpc2hJRCgpK1wiXCJ9KTtcclxuICAgICAgICBpZihkZWxheURpZVRpbWUgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhOZXh0KGRpZVR5cGUsc2VhdE51bSk7XHJcbiAgICAgICAgICAgIH0sZGVsYXlEaWVUaW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWF0aE5leHQoZGllVHlwZSxzZWF0TnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mrbvkuqEgLSDlvIDlp4sgZGllVHlwZTogMCDoh6rnhLbmrbvkuqEgMeeOqeWutuaUu+WHuyAy5YWo5bGP54K45by5IDPpl6rnlLUgIDTml4vmtqFcclxuICAgIGRlYXRoTmV4dChkaWVUeXBlLHNlYXROdW0gPSAtMSl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGVhckZvbGxvd0Zpc2hUaXAsIHtmaXNoSWQ6dGhpcy5nZXRGaXNoSUQoKStcIlwifSk7XHJcbiAgICAgICAgdGhpcy5oaWRlVGlwKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8v5pKt5pS+5q275Lqh5Yqo55S75byA5aeLIOe7k+adn+WQjuiwg+eUqCBkaXNwb3NlXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2JVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLmxvY2tCdWxsZXRMaXN0ICYmIHRoaXMubG9ja0J1bGxldExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLmxvY2tCdWxsZXRMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja0J1bGxldExpc3RbaV0uZ2V0Q29tcG9uZW50KFwibmZpc2hfQnVsbGV0XCIpLmRlYXRoRmlzaCh0aGlzLmdldEZpc2hJRCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZGllVHlwZSAhPSBDT05TVC5kaWVUeXBlMCAmJiB0aGlzLmxvY2FsRmlzaERhdGEuc2hvY2sgPT0gMSl7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25Tc2hvY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvY2tCdWxsZXRMaXN0ID0gbnVsbDtcclxuICAgICAgICBpZihkaWVUeXBlID09IENPTlNULmRpZVR5cGUxKXtcclxuICAgICAgICAgICAgdGhpcy5pc0hpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBDT05TVC5IaXRDb2xvci5EZWF0O1xyXG4gICAgICAgICAgICBjb25zdCBUSU1FID0gMC44O1xyXG4gICAgICAgICAgICBsZXQgRW5kQW5nbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IFNYID0gMDtcclxuICAgICAgICAgICAgbGV0IGFjdDtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkpe1xyXG4gICAgICAgICAgICAgICAgRW5kQW5nbGUgPSAtMzYwICogMztcclxuICAgICAgICAgICAgICAgIGFjdCA9IGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oVElNRSxTWCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oVElNRSxFbmRBbmdsZSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRW5kQW5nbGUgPSAtMzYwICogMztcclxuICAgICAgICAgICAgICAgIGFjdCA9IGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oVElNRSxTWCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oVElNRSxFbmRBbmdsZSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdGFydFRhbGsoZmFsc2UsdHJ1ZSk7Ly/psbzooqvnjqnlrrbmiZPmrbtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0LGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9ZWxzZSBpZihkaWVUeXBlID09IENPTlNULmRpZVR5cGUzKXtcclxuICAgICAgICAgICAgbGV0IG9sZEFuZ2xlID0gdGhpcy5ub2RlLmFuZ2xlICsgXCJcIjtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5ub2RlLmFuZ2xlID7jgIAwID8gdGhpcy5ub2RlLmFuZ2xlIC0gMjAgOiB0aGlzLm5vZGUuYW5nbGUgKyAyMDtcclxuICAgICAgICAgICAgbGV0IGFjdCA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4xLGFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMSxOdW1iZXIob2xkQW5nbGUpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yZXBlYXQoYWN0LDcpLGNjLnNjYWxlVG8oMSwwKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfWVsc2UgaWYoZGllVHlwZSA9PSBDT05TVC5kaWVUeXBlNCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgYWN0ID0gY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDIsMC4wMSwwLjAxKSxcclxuICAgICAgICAgICAgICAgIGNjLnJlcGVhdChjYy5yb3RhdGVCeSgwLjUsMzYwKSw1KSxcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjYsdGhpcy5ub2RlLnggKyA5LHRoaXMubm9kZS55IC0gOSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNix0aGlzLm5vZGUueCAtIDksdGhpcy5ub2RlLnkgKyA5KSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3QsY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ljbjovb3oh6rlt7FcclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmNsZWFyVGlkZUNvcnJlY3QoKTtcclxuICAgICAgICBsZXQgZmlzaElEID0gTnVtYmVyKHRoaXMuZ2V0RmlzaElEKCkrXCJcIik7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGVhckZvbGxvd0Zpc2hUaXAsIHtmaXNoSWQ6dGhpcy5nZXRGaXNoSUQoKStcIlwifSk7XHJcbiAgICAgICAgdGhpcy5maXNoRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYlVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubW92ZUxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9zQXJyYXkgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMud2hpcmxwb29sKXRoaXMud2hpcmxwb29sLmRlc3Ryb3koKTtcclxuICAgICAgICBpZih0aGlzLm5vZGUucGFyZW50KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzUXVpY2tEaWUpe1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmRpc3Bvc2VGaXNoTm9kZSxmaXNoSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljKXtcclxuICAgICAgICAgICAgbGV0IGluZCA9IHRoaXMubG9naWMuYm9zc0lETGlzdC5pbmRleE9mKGZpc2hJRCk7XHJcbiAgICAgICAgICAgIGlmKGluZCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmJvc3NJRExpc3Quc3BsaWNlKGluZCwxKTsvL+WmguaciWJvc3Mg5q275Lqh55qE5pe25YCZ5bCx5Yig6ZmkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuZmlzaFBvb2wucHV0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9naWMgICAgPSBudWxsO1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+W7tui/n+mUgOavgVxyXG4gICAgZGVsYXlEZXN0cm95KGkpe1xyXG4gICAgICAgIGxldCBkZWxheVRpbWUgPSAwLjAxICsgMC4xKmk7XHJcbiAgICAgICAgY29uc3QgTWF4VGltZSA9IDM7XHJcbiAgICAgICAgaWYoZGVsYXlUaW1lID4gTWF4VGltZSl7XHJcbiAgICAgICAgICAgIGRlbGF5VGltZSA9IE1hdGgucmFuZG9tKCkgKiBNYXhUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxkZWxheVRpbWUpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm1vdmVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sb2dpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maXNoRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb3NBcnJheSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0hpdCAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGl0VGltZSAgPSAwO1xyXG4gICAgfVxyXG59KTsiXX0=
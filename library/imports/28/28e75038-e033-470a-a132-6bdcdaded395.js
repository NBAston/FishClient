"use strict";
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
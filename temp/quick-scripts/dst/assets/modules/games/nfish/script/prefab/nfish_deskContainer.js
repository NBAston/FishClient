
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_deskContainer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5bd9J/Wh1N0ajWjJhqI3Ng', 'nfish_deskContainer');
// modules/games/nfish/script/prefab/nfish_deskContainer.js

"use strict";

/***
 *  捕鱼：桌子：渔场 、 子弹池、部分UI(隐式大炮）,部分特效
 * **/
var CONST = require("nfishConst");

glGame.baseclass.extend({
  properties: {
    ui_physicalPool: cc.Node,
    //物理池： 鱼 子弹 参与碰撞检测的对象
    hitNode: cc.Node,
    //点击屏幕的碰撞快
    ui_LockCantainer: cc.Node,
    //点击屏幕的碰撞快
    partialBombEffect: cc.Node,
    //炎爆爆炸效果
    fish_Bullet: cc.Prefab,
    //子弹预制单位
    fish_Unit: cc.Prefab,
    //鱼预制单位
    //子弹UI
    explosionAndLightning_Atlas: {
      "default": null,
      displayName: "特效图集",
      tooltip: "爆炸，灰烬，闪电",
      type: cc.SpriteAtlas
    },
    //子弹UI
    bullet_Atlas: {
      "default": null,
      displayName: "子弹UI",
      tooltip: "子弹UI 1 - 10",
      type: cc.SpriteAtlas
    },
    //仙剑子弹UI
    missilBullet_Atlas: {
      "default": null,
      displayName: "仙剑子弹UI",
      tooltip: "仙剑子弹UI",
      type: cc.SpriteAtlas
    },
    //fish
    fish_AtlaLists: {
      "default": [],
      displayName: "所有鱼",
      tooltip: "鱼",
      type: [cc.SpriteAtlas]
    }
  },
  onLoad: function onLoad() {
    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.logic.ui_physicalPool = this.ui_physicalPool;
    this.startRunFish = false;
    this.currTouchEvent = null;
    this.fireTime = 0; //开火计时器

    this.fireTimeFrequency = 0.17; //开火频率

    this.isFire = true; //是否可以开火

    this.shootTime = 0;
    this.autoShootTime = 0; //隐藏特殊鱼 node

    this.lockBulletList = [];
    this.fishNodeList = {};
    this.fishNodeListLenght = 0;
    this.oldPos = this.node.position;
    this.hitNode.addComponent("nfish_hitNode");
    this.hitNode.active = false;
    this.isSshockIng = false;
    cc.director.getCollisionManager().enabled = true; //打开碰撞检测

    cc.director.getPhysicsManager().enabled = true; //启用物理引擎相关功能
    //调试模式

    cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit || cc.PhysicsManager.DrawBits.e_pairBit; // cc.director.getCollisionManager().enabledDrawBoundingBox = true;         //是否绘制碰撞组件的包围盒
    // cc.director.getCollisionManager().enabledDebugDraw = true;               //是否绘制碰撞组件的形状

    this.registerEvent();
  },
  start: function start() {},
  //注册监听
  registerEvent: function registerEvent() {
    glGame.emitter.on(CONST.clientEvent.adjustGunAngle, this.adjustGunAngleHandler, this); //调整高射炮角度

    glGame.emitter.on(CONST.clientEvent.initFishPool, this.initFishPoolHandler, this); //初始化鱼塘

    glGame.emitter.on(CONST.clientEvent.addFishPool, this.addFishPoolHandler, this); //加鱼

    glGame.emitter.on(CONST.clientEvent.addFishTide, this.addFishTideHandler, this); //加鱼潮

    glGame.emitter.on(CONST.clientEvent.playShootBullet, this.playShootBulletHandler, this); //用户射击

    glGame.emitter.on(CONST.clientEvent.playFishnetEffect, this.playFishnetEffectHandler, this); //生成渔网

    glGame.emitter.on(CONST.clientEvent.onKillFish, this.onKillFishHandler, this); //销毁鱼

    glGame.emitter.on(CONST.clientEvent.onFreezeStartStop, this.onFreezeStartStopHandler, this); //冰冻 开始-结束

    glGame.emitter.on(CONST.clientEvent.useAutoSkill, this.useAutoSkillHandler, this); //使用锁定技能

    glGame.emitter.on(CONST.clientEvent.leaveRoomUnLock, this.leaveRoomUnLockHandler, this); //用户离开解锁

    glGame.emitter.on(CONST.clientEvent.seaWaveFishGroup, this.seaWaveFishGroupHandler, this); //海浪鱼群 - 快速游走

    glGame.emitter.on(CONST.clientEvent.fishCancelShoot, this.onClickHandler, this); //停止射击

    glGame.emitter.on(CONST.clientEvent.disposeFishNode, this.disposeFishNodeHandler, this); //销毁鱼

    glGame.emitter.on(CONST.clientEvent.initBulletList, this.initBulletListHandler, this); //初始化鱼池子弹-断连

    glGame.emitter.on(CONST.clientEvent.onSshock, this.onShockHandler, this); //震动屏幕

    glGame.emitter.on(CONST.clientEvent.playLockSpine, this.playLockSpineHandler, this); //播放锁定动画

    glGame.emitter.on(CONST.clientEvent.onSpecialBulletExp, this.onSpecialBulletExpHandler, this); //特殊子弹爆炸

    glGame.emitter.on(CONST.clientEvent.onSpecialBomb, this.onSpecialBombHandler, this); //熔岩玄武 全屏爆炸

    glGame.emitter.on(CONST.clientEvent.changeCantainer, this.changeCantainerHandler, this); //改变物理容器 scale

    glGame.emitter.on(CONST.clientEvent.changeCantainer, this.changeCantainerHandler, this); //改变物理容器 scale

    glGame.emitter.on(CONST.clientEvent.lockSelfFish, this.lockSelfFishHandler, this); //锁定鱼

    glGame.emitter.on(CONST.clientEvent.checkBgMusic, this.checkBgMusicHandler, this); //根据是否有boss 检查切换背景音乐

    this.ui_physicalPool.on(cc.Node.EventType.TOUCH_END, this.onFireHooHandler, this); //结束点击 鱼池

    this.ui_physicalPool.on(cc.Node.EventType.TOUCH_START, this.onFireHooHandler, this); //开始点击 鱼池

    this.ui_physicalPool.on(cc.Node.EventType.TOUCH_CANCEL, this.onFireHooHandler, this); //取消点击 鱼池
  },
  //反注册监听
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off(CONST.clientEvent.adjustGunAngle, this);
    glGame.emitter.off(CONST.clientEvent.initFishPool, this);
    glGame.emitter.off(CONST.clientEvent.addFishPool, this);
    glGame.emitter.off(CONST.clientEvent.addFishTide, this);
    glGame.emitter.off(CONST.clientEvent.playShootBullet, this);
    glGame.emitter.off(CONST.clientEvent.playFishnetEffect, this);
    glGame.emitter.off(CONST.clientEvent.onKillFish, this);
    glGame.emitter.off(CONST.clientEvent.onFreezeStartStop, this);
    glGame.emitter.off(CONST.clientEvent.useAutoSkill, this);
    glGame.emitter.off(CONST.clientEvent.leaveRoomUnLock, this);
    glGame.emitter.off(CONST.clientEvent.seaWaveFishGroup, this);
    glGame.emitter.off(CONST.clientEvent.fishCancelShoot, this);
    glGame.emitter.off(CONST.clientEvent.disposeFishNode, this);
    glGame.emitter.off(CONST.clientEvent.initBulletList, this);
    glGame.emitter.off(CONST.clientEvent.onSshock, this);
    glGame.emitter.off(CONST.clientEvent.playLockSpine, this);
    glGame.emitter.off(CONST.clientEvent.onSpecialBulletExp, this);
    glGame.emitter.off(CONST.clientEvent.onSpecialBomb, this);
    glGame.emitter.off(CONST.clientEvent.changeCantainer, this);
    glGame.emitter.off(CONST.clientEvent.lockSelfFish, this);
    glGame.emitter.off(CONST.clientEvent.checkBgMusic, this);
  },
  //生成渔网
  playFishnetEffectHandler: function playFishnetEffectHandler(res) {
    var bulletEffect = null;

    if (res.gunLevel >= 1 && res.gunLevel <= 3) {
      bulletEffect = "bulletEffect1_3";
    }

    if (res.gunLevel >= 4 && res.gunLevel <= 6) {
      bulletEffect = "bulletEffect4_6";
    }

    if (res.gunLevel >= 7 && res.gunLevel <= 9) {
      bulletEffect = "bulletEffect7_9";
    }

    if (res.gunLevel == 10) {
      bulletEffect = "bulletEffect10";
    }

    if (res.cannonType == CONST.CannonType.Missile) {
      bulletEffect = "bulletEffectMissile";
    }

    var bulletNode = this.node.getChildByName(bulletEffect);

    if (!bulletNode) {
      cc.warn(">无 生成渔网");
      return;
    } //根据这两个参数 实例化相对于 子弹特效


    var fishNet = cc.instantiate(bulletNode);
    fishNet.parent = null;
    fishNet.position = res.position;
    fishNet.active = true;
    fishNet.zIndex = res.zIndex;
    var maxScaleSet = 1.5;
    var m = this.logic.getRandomNum(0.6, 1);

    if (res.gunLevel == 9) {
      m = this.logic.getRandomNum(0.5, 0.7);
    }

    if (res.gunLevel == 10) {
      m = this.logic.getRandomNum(0.5, 1);
    }

    if (res.cannonType == CONST.CannonType.Missile) {
      m = maxScaleSet;
    }

    fishNet.setScale(m);
    fishNet.angle = this.logic.getRandomNum(0, 360);
    this.ui_physicalPool.addChild(fishNet);
    fishNet.getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : "";

      if (name == CONST.SpineName.Attack) {
        fishNet.destroy();
      }
    });
    fishNet.getComponent(sp.Skeleton).setAnimation(0, CONST.SpineName.Attack, false);
  },
  //点击 鱼池
  onFireHooHandler: function onFireHooHandler(evt) {
    if (evt != null && evt.type == cc.Node.EventType.TOUCH_START) {
      if (this.isFire) {
        this.isFire = false;
        glGame.emitter.emit(CONST.clientEvent.fishCancelShoot, evt);
      }
    } else {
      this.shootTime = -1000;
      this.currTouchEvent = null;
      glGame.emitter.emit(CONST.clientEvent.fishCancelShoot, evt);
    }
  },
  //点击 鱼池
  onClickHandler: function onClickHandler(evt) {
    if (evt != null && evt.type == cc.Node.EventType.TOUCH_START) {
      if (this.logic.isLock) {
        //锁定鱼 逻辑重写
        var pos = evt.getLocation();
        var direction = this.ui_physicalPool.convertToNodeSpaceAR(pos);
        this.hitNode.active = true;
        this.hitNode.getComponent("nfish_hitNode").setClick(direction);
      }

      glGame.emitter.emit(CONST.clientEvent.clickFishPool, evt.getLocation().y > CONST.ShootButtomMin ? evt : null);
      this.shootTime = 0;
      this.currTouchEvent = evt;
    } else {
      this.shootTime = -1000;
      this.currTouchEvent = null;
    }
  },
  //检测射击
  checkShoot: function checkShoot(dt) {
    var ShotInterval = 0.2;
    var ShotIntervalTime = -1000;

    if (this.logic.isAuto) {
      //如果使用了锁定技能，那么必须有锁定对象
      if (!this.logic.isLock || this.logic.isLock && this.logic.lockFishID != undefined) {
        this.autoShootTime += dt;

        if (this.autoShootTime > ShotInterval) {
          this.autoShootTime = 0;
          glGame.emitter.emit(CONST.clientEvent.clickFishPool, null);
        }
      }
    } else if (this.currTouchEvent != null) {
      if (this.currTouchEvent.type == cc.Node.EventType.TOUCH_END) {
        this.currTouchEvent = null;
        this.shootTime = ShotIntervalTime;
        return;
      }

      if (this.currTouchEvent.type == cc.Node.EventType.TOUCH_START) {
        this.shootTime += dt;

        if (this.shootTime > ShotInterval) {
          this.shootTime = 0;
          var pos = this.currTouchEvent.getLocation();
          glGame.emitter.emit(CONST.clientEvent.clickFishPool, pos.y > CONST.ShootButtomMin ? this.currTouchEvent : null);
        }
      }
    }
  },
  //服务器广播发射子弹
  playShootBulletHandler: function playShootBulletHandler(res) {
    if (res.cannonType == undefined) {
      res.cannonType = CONST.CannonType.Normal;
    }

    var playerInfo = this.logic.playerInfo[Number(res.uid)];

    if (res.cannonType == CONST.CannonType.Normal && playerInfo.cannonType != CONST.CannonType.Normal) {
      cc.error("====服务器 onShoot 数据有误 ", res, "  info ", playerInfo);
    }

    if (res.cannonType == CONST.CannonType.Normal && playerInfo.cannonType != CONST.CannonType.Normal) {
      cc.error(">>服务器广播发射子弹  数据有误 纠正数据 " + res.seatNum);
      this.logic.playerInfo[Number(res.uid)].cannonType = CONST.CannonType.Normal;
      this.logic.playerInfo[Number(res.uid)].cannonAmount = 0;
      glGame.emitter.emit(CONST.clientEvent.checkSpecialCannon, true); //检查炮台
    }

    if (Number(res.seatNum) == Number(this.logic.seatNum)) {
      cc.error("服务器广播 发射子弹 过滤自己的！");
      return;
    }

    var Moving = 1;

    if (this.logic["isGunMoving" + res.seatNum] == Moving) {
      cc.log(">正在更换炮台 播放特效 无法发射子弹!");
      return;
    }

    if (res.aimFishId != null) {
      var fish = this.ui_physicalPool.getChildByName("" + res.aimFishId);

      if (fish != null) {
        //符合要求的鱼才可以锁定，否则解锁
        if (this.logic.getClickArea(fish.position, fish.width, fish.height)) {
          res.lock = Number(res.aimFishId);
          res.angle = null;
        } else {
          res.lock = null;

          if (res.angle == undefined) {
            //解锁时的角度可能为空
            if (this.lastAngle) {
              res.angle = this.lastAngle;
            } else {
              res.angle = this.ui_physicalPool.getChildByName("ui_gun" + res.seatNum).angle;
            }
          }

          cc.error(">> 服务器广播发射子弹 :  锁定失败  fishID " + res.aimFishId);
        }
      }

      this.adjustGunAngleHandler(res);
      glGame.emitter.emit(CONST.clientEvent.updateGunRecoil, res); // cc.warn(">> 广播 射击 更新其他用户的钱 5")

      glGame.emitter.emit(CONST.clientEvent.updateShootGold, res);
    } else {
      this.adjustGunAngleHandler(res);
      glGame.emitter.emit(CONST.clientEvent.updateGunRecoil, res); // cc.warn(">> 广播 射击 更新其他用户的钱 5")

      glGame.emitter.emit(CONST.clientEvent.updateShootGold, res);
    }
  },
  //断线重连 发射子弹
  initBulletListHandler: function initBulletListHandler(res) {
    this.adjustGunAngleHandler(res, true);
  },
  //发射子弹 -> 炮台 转向，坐标，位置  offLine 是否是断线重连
  adjustGunAngleHandler: function adjustGunAngleHandler(res) {
    var _this = this;

    var offLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var myid = glGame.user.userID;

    if (res.uid == null) {
      cc.error(">>无法确定 子弹 身份 res", res);
      return;
    }

    var isMe = Number(res.uid) == myid;

    if (isMe && !offLine) {
      switch (Number(this.logic.cannonLevel)) {
        case 1:
        case 2:
        case 3:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "attack1_3");
          break;

        case 4:
        case 5:
        case 6:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "attack4_6");
          break;

        case 7:
        case 8:
        case 9:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "attack7_9");
          break;

        case 10:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "attack10");
          break;
      }
    } //普通攻击


    var ui_gun = this.ui_physicalPool.getChildByName("ui_gun" + res.seatNum);

    if (ui_gun == undefined) {
      cc.error(">>> 找不到炮台 ", res);
      return;
    }

    var oldAngle = Number(ui_gun.angle + "");

    if (res.angle != undefined) {
      ui_gun.angle = res.angle;
    }

    var fire = ui_gun.getChildByName("point_bullet" + res.seatNum);
    var worldPoint = fire.convertToWorldSpaceAR(fire.position);
    var localPoint = this.ui_physicalPool.convertToNodeSpaceAR(worldPoint);

    if (res.gunType == null) {
      res.gunType == 1;
    }

    if (res.lock != undefined && res.angle == undefined) {
      res.angle = this.getTargetFishAngle(res.lock, res.seatNum);

      if (res.angle == null) {
        cc.error(this.logic.lockFishID + "  >>> fish  fishNodeList ", this.fishNodeList, " fishPoolData ", this.logic.fishPoolData);
        res.lock = null; //解锁

        if (isMe) {
          this.logic.lockFishID = null; //找不到鱼解锁

          cc.error(">>>用户自己 发射子弹 找不到鱼 " + res.lock);
        } else {
          cc.error(">>>其他人 发射子弹 找不到鱼 " + res.lock);
        }
      }
    }

    res.placeOfBirth = cc.v2(localPoint.x, localPoint.y);
    var tpmAngle;

    if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
      tpmAngle = res.angle;
    } else {
      tpmAngle = -res.angle;
    }

    var NormalAngel = 180;
    res.placeOfBirth.x += Math.sin(tpmAngle / NormalAngel * Math.PI);
    res.placeOfBirth.y += Math.cos(tpmAngle / NormalAngel * Math.PI);

    if (res.angle != undefined) {
      ui_gun.angle = res.angle;
    }

    if (res.bulletId == undefined) {
      res.bulletId = Number(this.logic.seatNum + Date.now());
    }

    var playerInfo;
    var currentUid;

    if (isMe) {
      currentUid = Number(glGame.user.userID);
      playerInfo = this.logic.playerInfo[currentUid];
    } else {
      currentUid = Number(res.uid);
      playerInfo = this.logic.playerInfo[currentUid];
    }

    var isHaveLaser = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Laser; // 龙息

    var isHaveMissile = playerInfo.hitMax != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Missile; // 仙剑

    var isHavePartialBomb = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.PartialBomb; // 炎爆

    var isHaveLightning = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Lightning; // 闪电

    if (!isMe || offLine) {
      //其他玩家 或者断线重连的时候
      isHaveLaser = false;
      isHaveMissile = false;
      isHavePartialBomb = false;
      isHaveLightning = false;

      switch (res.cannonType) {
        case CONST.CannonType.Laser:
          isHaveLaser = true;
          break;

        case CONST.CannonType.Missile:
          isHaveMissile = true;
          break;

        case CONST.CannonType.PartialBomb:
          isHavePartialBomb = true;
          break;

        case CONST.CannonType.Lightning:
          isHaveLightning = true;
          break;
      }

      this.logic["lastBullteType" + res.seatNum] = res.cannonType;
    } else {
      this.logic["lastBullteType" + res.seatNum] = playerInfo.cannonType;
    }

    res.isHaveMissile = false;
    res.isHavePartialBomb = false;
    res.isHaveLightning = false;

    if (!offLine) {
      res.cannonType = CONST.CannonType.Normal; //先给一个普通的标签
    }

    if (offLine && res.cannonType == CONST.CannonType.Missile) {
      //仙剑断线重连特殊处理
      cc.error(">> 仙剑断线重连特殊处理 ========= ", res);
      isHaveMissile = true;
      this.logic["lastBullteType" + res.seatNum] = CONST.CannonType.Missile;

      if (isMe) {
        this.logic.currentBullteType = CONST.CannonType.Missile; //刷新限制
      }
    }

    var op = CONST.CannonOpention.Normal;
    var dataAngle = res.angle ? res.angle : ui_gun.angle;

    if (dataAngle == undefined) {
      dataAngle = oldAngle;
    } //->判断是否有 特殊炮弹 如果有就优先发射 特殊炮弹


    if (playerInfo != null) {
      //找不到用户信息 就无法发射子弹
      if (isHaveLaser) {
        //龙溪炮弹 发射逻辑
        if (isMe && offLine) {
          //如果是我自己，如果是断线重连
          cc.error(">>断线重连 不发射 龙溪 ");
          return;
        }

        if (isMe && this.logic.currentBullteType != CONST.CannonType.Not) {
          cc.error(">>非法发射龙溪子弹");
          return;
        }

        if (isMe) {
          this.logic.currentBullteType = playerInfo.cannonType;
          this.logic.isFireLaser = true;
          var CD = CONST.MaximumBulletCollisionTime;

          if (playerInfo.cannonAmount == 1) {
            CD += 0.4;
          } //发出去的子弹不一定能有鱼碰撞，需要手动恢复


          this.scheduleOnce(function () {
            _this.logic.isFireLaser = false;

            if (_this.logic.currentBullteType != CONST.CannonType.Not && _this.logic.currentBullteType == CONST.CannonType.Laser) {
              _this.logic.currentBullteType = CONST.CannonType.Not; // cc.error("======== delete ========= 炮弹 uid "+Number(res.seatNum))

              glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool, res.seatNum);
            }
          }, CD);
        }

        this.logic.specialBulletPool[res.seatNum] = res.cannonType; //根据规则：每个玩家同屏下只允许有一个特殊子弹

        glGame.emitter.emit(CONST.clientEvent.fishSound, "LaserSend");
        glGame.emitter.emit(CONST.clientEvent.onLaserDispath, {
          seatNum: res.seatNum,
          angle: dataAngle,
          uid: currentUid
        }); //龙溪不发射实体子弹，显示激光柱即可

        glGame.emitter.emit(CONST.clientEvent.playFiringEffect, {
          seatNum: res.seatNum,
          gunLevel: res.gunLevel,
          gunType: playerInfo.cannonType
        });

        if (playerInfo.cannonAmount == 0) {
          var lastCammpmType = Number("" + this.logic.playerInfo[currentUid].cannonType); //记录老的炮台类型

          this.logic.playerInfo[currentUid].cannonType = CONST.CannonType.Normal;
          glGame.emitter.emit(CONST.clientEvent.restoreCannon, {
            uid: currentUid,
            isNow: true,
            lastCammpmType: lastCammpmType
          });
        } else {
          glGame.emitter.emit(CONST.clientEvent.upSpecialGunCoin, {
            seatNum: res.seatNum,
            cannonLevel: playerInfo.cannonAmount
          });
        }

        if (isMe) {
          this.logic.curWaitTime = Date.now(); //重置时间

          glGame.emitter.emit(CONST.clientEvent.fireSettingRecoil, {
            angle: res.angle,
            gunType: res.gunType
          });
        }

        return;
      }

      var isNeedSend = false;

      if (isHaveMissile) {
        //仙剑 发射前赋值
        if (!offLine) {
          //如果是我自己，如果是断线重连
          res.cannonType = CONST.CannonType.Missile;
          res.hitMax = Number(playerInfo.hitMax + ""); // 仙剑最大击中鱼数量(数据拷贝赋值)
        }

        op = CONST.CannonOpention.Missile;
        isNeedSend = true;
      }

      if (isHaveLightning) {
        //闪电 发射前赋值
        if (!offLine) {
          //如果是断线重连
          res.cannonType = CONST.CannonType.Lightning;
        }

        isNeedSend = true;
        op = CONST.CannonOpention.Lightning;

        if (isMe) {
          glGame.emitter.emit(CONST.clientEvent.fishSound, "lightningDispath"); //闪电发射
        }
      }

      if (isHavePartialBomb) {
        //炎爆 发射前赋值
        if (!offLine) {
          //如果是断线重连
          res.cannonType = CONST.CannonType.PartialBomb;
        }

        isNeedSend = true;
        op = CONST.CannonOpention.PartialBomb;
        glGame.emitter.emit(CONST.clientEvent.fishSound, "PartialSend");
      }

      if (isNeedSend) {
        //特殊炮弹 数量更新
        if (playerInfo.cannonAmount == 0) {
          var _lastCammpmType = Number("" + this.logic.playerInfo[currentUid].cannonType); //记录老的炮台类型


          this.logic.playerInfo[currentUid].cannonType = CONST.CannonType.Normal;
          glGame.emitter.emit(CONST.clientEvent.restoreCannon, {
            uid: currentUid,
            isNow: true,
            lastCammpmType: _lastCammpmType
          });
        } else {
          glGame.emitter.emit(CONST.clientEvent.upSpecialGunCoin, {
            seatNum: res.seatNum,
            cannonLevel: playerInfo.cannonAmount
          });
        }
      } //这是一个 子弹 可能是 普通的 可能是 特殊子弹的三个之一


      var bullet;

      if (this.logic.bulletPool.size() > 0) {
        bullet = this.logic.bulletPool.get();
      } else {
        bullet = cc.instantiate(this.fish_Bullet);
      }

      bullet.name = "";
      var script = bullet.getComponent("nfish_Bullet");
      this.ui_physicalPool.addChild(bullet);

      if (isHaveMissile || isHavePartialBomb || isHaveLightning) {
        //自己的 特殊子计数
        this.logic.specialBulletPool[res.seatNum] = res.cannonType; //根据规则：每个玩家同屏下只允许有一个特殊子弹
      }

      if (isMe) {
        res.uid = glGame.user.userID;

        if (isHaveMissile || isHavePartialBomb || isHaveLightning) {
          //自己的 特殊子计数
          this.logic.currentBullteType = res.cannonType;
        } else {
          //自己的 普通子弹计数
          if (!offLine) {
            this.logic.bullteNum++;
          }
        }

        if (this.logic.currentBullteType == CONST.CannonType.PartialBomb || this.logic.currentBullteType == CONST.CannonType.Lightning) {
          //定时 解锁发射锁定 炎爆 、闪电
          var ReTime = 1;
          this.scheduleOnce(function () {
            _this.logic.currentBullteType = CONST.CannonType.Not;
          }, ReTime);
        }
      }

      glGame.emitter.emit(CONST.clientEvent.playFiringEffect, {
        seatNum: res.seatNum,
        gunLevel: res.gunLevel,
        gunType: res.cannonType
      }); //开炮效果

      script.initBulletAtlas(isHaveMissile ? this.missilBullet_Atlas : this.bullet_Atlas); //初始化子弹图片资源

      if (isMe) {
        this.logic.curWaitTime = Date.now(); //重置时间

        glGame.emitter.emit(CONST.clientEvent.fireSettingRecoil, {
          angle: res.angle,
          gunType: res.gunType
        });
      }

      script.initBullet(res); //子弹开始运动

      if (bullet.lock != null) {
        this.lockBulletList.push(bullet); //辅助 解锁 存储
      }

      if (isMe && !offLine) {
        //只管自己的正常子弹发射发送协议 ，无权替别人的子弹发发送发射协议 走断连协议的子弹不再发 发射协议
        glGame.emitter.emit(CONST.clientEvent.hiddenLocationTip); //发送 射击

        var data = {
          "op": op,
          "angle": dataAngle
        };

        if (op == CONST.CannonOpention.Normal) {
          data["shellId"] = res.bulletId;
        } else {
          cc.log(">>发射特殊子弹 发射协议 :", data);
        }

        if (res.lock != null) {
          data["fishId"] = res.lock;
        }

        if (this.logic.isEnterRoom) {
          glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), data); //是自己就发送 射击
        }
      }
    }
  },
  //获取炮的朝向：炮口到目标鱼的角度
  getTargetFishAngle: function getTargetFishAngle(key, seatNum) {
    var fish = this.ui_physicalPool.getChildByName("" + key);

    if (fish) {
      var startPos = this.ui_physicalPool.getChildByName("ui_gun" + seatNum).position;
      return this.logic.getP1ToP2Angle(startPos, fish.position);
    } else {
      return null;
    }
  },
  //鱼的死亡
  onKillFishHandler: function onKillFishHandler(res) {
    var Not = -1; //无人座位

    var fish = this.ui_physicalPool.getChildByName("" + res.fishId); //销毁锁定的鱼

    if (fish != null) {
      if (this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(fish.name)) {
        //cc.error(">> 解锁 1 "+this.logic.lockFishID)
        this.logic.lastLockFishID = Number(this.logic.lockFishID + "");
        this.logic.lockFishID = null;
        this.logic.lockFishIndex = null;

        if (this.logic.isLockAutoChange == false) {
          this.logic.isAuto = false;
          glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
        }
      }
    }

    if (fish && fish._components != undefined && fish.getComponent("nfish_Unit")) {
      if (this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(res.fishId)) {
        this.ui_LockCantainer.getChildByName("ui_Lock" + this.logic.seatNum).active = false;
      }

      if (res.fishTypeId != null && res.fishTypeId == CONST.BossGodOfWealth) {
        //财神死亡方式是快速移动出屏外
        fish.getComponent("nfish_Unit").quickDie(false); //解锁

        if (this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(res.fishId)) {
          this.logic.lastLockFishID = Number(this.logic.lockFishID + "");
          this.logic.lockFishID = null;
          this.logic.lockFishIndex = null;
          glGame.emitter.emit(CONST.clientEvent.disposeFishNode, res.fishId);

          if (this.logic.isLockAutoChange == false) {
            this.logic.isAuto = false;
            glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
          }

          this.ui_LockCantainer.getChildByName("ui_Lock" + this.logic.seatNum).active = false;
        }
      } else {
        var type = res.killType == CONST.CannonType.Lightning ? CONST.dieType3 : CONST.dieType1;
        fish.getComponent("nfish_Unit").death(type, res.seatNum ? res.seatNum : Not, res.delayDieTime);
      }
    } else {
      glGame.emitter.emit(CONST.clientEvent.disposeFishNode, res.fishId);
      console.warn("鱼的死亡>>找不到鱼", res, "  fishNodeList ", this.fishNodeList, " fishPoolData ", this.logic.fishPoolData);
    }
  },
  //检查背景音乐播放
  checkBgMusicHandler: function checkBgMusicHandler() {
    var currBgMusicIndex = -1;

    for (var fishId in this.fishNodeList) {
      var item = this.fishNodeList[fishId];
      var fish = this.ui_physicalPool.getChildByName("" + fishId);

      if (fish != null) {
        var fishTypeId = Number(item.fishTypeId);

        if (fishTypeId == CONST.BossLavaBasalt) {
          //仍有 熔岩玄武
          currBgMusicIndex = CONST.BossLavaBasaltBgMusic;
        }

        if (fishTypeId == CONST.BossSYLW) {
          //仍有 深渊龙王
          currBgMusicIndex = CONST.BossSYLWBgMusic;
        }

        if (fishTypeId == CONST.BossGodOfWealth && fish._components != undefined && fish.getComponent("nfish_Unit") != undefined && fish.getComponent("nfish_Unit").isWellDie()) {
          //仍有 财神
          currBgMusicIndex = CONST.BossGodOfWealthBgMusic;
        }
      }
    }

    switch (currBgMusicIndex) {
      case -1:
        glGame.emitter.emit(CONST.clientEvent.fishBgSound); //播放 春夏秋冬

        break;

      case CONST.BossLavaBasaltBgMusic:
        glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossLavaBasaltBgMusic); //播放 熔岩玄武 背景声音

        break;

      case CONST.BossSYLWBgMusic:
        glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossSYLWBgMusic); //播放 深渊龙王 背景声音

        break;

      case CONST.BossGodOfWealthBgMusic:
        glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossGodOfWealthBgMusic); //播放 财神 背景声音

        break;
    }
  },
  //加鱼
  addFishPoolHandler: function addFishPoolHandler(res) {
    if (this.logic.quickMove) {
      cc.error("加鱼失败，正在初始化鱼潮");
      return;
    }

    this.initFishData(res);
  },
  //加鱼潮
  addFishTideHandler: function addFishTideHandler(res) {
    var _this2 = this;

    if (this.logic.quickMove) {
      cc.error("加鱼潮失败，鱼潮处理中");
      return;
    }

    var tmpArray = [];

    for (var id in res) {
      tmpArray.push(res[id]);
    }

    var i = 0;
    var len = Number(tmpArray.length + "") - 1;
    this.schedule(function () {
      for (var j = 0; j < 10; j++) {
        if (tmpArray[i] != null) {
          _this2.initFishData(tmpArray[i]);

          i++;
        }
      }
    }, 0.01, len);
  },
  //初始化渔场
  initFishPoolHandler: function initFishPoolHandler() {
    if (this.logic.quickMove) {
      cc.error("初始化渔场 遇到问题 ： 正在初始化鱼潮，无法初始化");
      return;
    }

    for (var id in this.logic.fishPoolData) {
      var fishSetverData = this.logic.fishPoolData[id];

      if (fishSetverData.used == undefined) {
        fishSetverData.used = Number(id + "");
        this.initFishData(this.logic.fishPoolData[Number(id)]);
      }
    }
  },
  //初始化 鱼 数据
  initFishData: function initFishData(fishData) {
    if (this.logic.quickMove) {
      cc.error("正在初始化鱼潮 稍等");
      return;
    }

    var ToScond = 1000;
    var serverTime = fishData.serverTime == undefined ? this.logic.serverTime : fishData.serverTime;
    var time = (serverTime - fishData.createTime) / ToScond; //出生时间 默认 0 断线重连 可能是 2或5或别的

    var runTime = fishData.runTime; //鱼的总运行时间

    if (time < fishData.showTime + runTime) {
      this.createFish(fishData);
    } else {// cc.warn("无法出生 id ",fishData.id," 出生时间 ",time," serverTime ",fishData.serverTime," createTime ",fishData.createTime," 运行时间 ",runTime," 显示时间 ",fishData.showTime,"data:",fishData)
    }
  },
  //鱼工厂：实例化一条鱼
  createFish: function createFish(fishData) {
    var fishNode;

    if (this.logic.fishPool.size() > 0) {
      fishNode = this.logic.fishPool.get();
    } else {
      fishNode = cc.instantiate(this.fish_Unit);
    }

    fishNode.name = "nfish_Unit";
    fishNode.parent = null;
    fishNode.active = true;
    fishNode.isFish = true;
    this.fishNodeList[Number(fishData.id + "")] = JSON.parse(JSON.stringify(fishData)); //数据拷贝

    this.fishNodeListLenght++;
    this.ui_physicalPool.addChild(fishNode);
    fishNode.getComponent("nfish_Unit").initAtlas(this.fish_AtlaLists);
    fishNode.getComponent("nfish_Unit").initFish(fishData);
  },
  //刷新冰冻状态 有就冻结 没有就解冻
  updateIcing: function updateIcing() {
    for (var id in this.fishNodeList) {
      var fish = this.ui_physicalPool.getChildByName("" + id);
      if (fish) fish.getComponent("nfish_Unit").settingIcing(this.startRunFish);
    }

    if (this.startRunFish) {
      this._time = Date.now();
    }
  },
  //锁定鱼
  lockSelfFishHandler: function lockSelfFishHandler(fishId) {
    var firstNode = this.ui_physicalPool.getChildByName("".concat(fishId));

    if (firstNode != null && firstNode._components != undefined && firstNode.getComponent("nfish_Unit") != null) {
      firstNode.getComponent("nfish_Unit").lockSelf();
    }
  },
  //浪潮鱼群来了，加速死亡
  seaWaveFishGroupHandler: function seaWaveFishGroupHandler(msg) {
    var _this3 = this;

    glGame.emitter.emit(CONST.clientEvent.showFishTideTitle);
    var NotHaveFish = -1;
    glGame.emitter.emit(CONST.clientEvent.fishSound, "tideComin"); //鱼潮来袭使用

    var next = function next() {
      glGame.emitter.emit(CONST.clientEvent.seaWaveChangeBg, _this3.logic.bgIndex);
      glGame.emitter.emit(CONST.clientEvent.onSurfStart);
      _this3.logic.startFire = true;
      var fishLenth = _this3.ui_physicalPool.childrenCount;

      for (var i = 0; i < fishLenth; i++) {
        var currNode = _this3.ui_physicalPool.children[i];

        if (currNode != null) {
          var fish_Unit = currNode.getComponent("nfish_Unit");

          if (fish_Unit != null && fish_Unit.getFishID() != null) {
            if (_this3.logic.bossIDList.indexOf(Number(currNode.name)) == NotHaveFish) ////除了boss不删除 其余都删除
              {
                _this3.ui_physicalPool.removeChild(currNode);

                currNode.destroy();
              }
          } else if (currNode.isFish != null && _this3.logic.bossIDList.indexOf(Number(currNode.name)) == NotHaveFish) {
            ////除了boss不删除 其余都删除
            _this3.ui_physicalPool.removeChild(currNode);

            currNode.destroy();
          }
        }
      }

      _this3.logic.specialFishListBorn = {};

      _this3.logic.addTide(msg, msg.groupId);

      _this3.logic.quickMove = false;
      glGame.emitter.emit(CONST.clientEvent.addFishTide, _this3.logic.fishPoolData);
      glGame.emitter.emit(CONST.clientEvent.hideBossConinUI);
    };

    var MaxUserNum = 4;

    for (var i = 0; i < MaxUserNum; i++) {
      var ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock" + i);
      ui_lock.active = false;
    }

    var SeaWaveRunTime = 4.5;
    this.scheduleOnce(next, SeaWaveRunTime);
    this.logic.startFire = false;
    this.logic.quickMove = true; //除了boss不删除 其余都删除

    for (var id in this.fishNodeList) {
      if (this.logic.bossIDList.indexOf(id) == -1) {
        delete this.fishNodeList[id];
        this.fishNodeListLenght--;
      }
    }

    this.logic.fishPoolData = {};
    var fishLenth = this.ui_physicalPool.childrenCount;

    for (var _i = 0; _i < fishLenth; _i++) {
      var fish_Unit = this.ui_physicalPool.children[_i].getComponent("nfish_Unit");

      if (fish_Unit != null && fish_Unit.getFishID() != null && this.logic.bossIDList.indexOf(fish_Unit.getFishID()) == NotHaveFish) {
        ////除了boss不删除 其余都删除
        fish_Unit.getComponent("nfish_Unit").quickDie();
      }
    }
  },
  //删除一条鱼 id Number 类型
  disposeFishNodeHandler: function disposeFishNodeHandler(id) {
    var fData = this.fishNodeList[Number(id)];

    if (fData != null) {
      delete this.fishNodeList[Number(id)];
      this.fishNodeListLenght--;
    } else {
      var tmpfish = this.ui_physicalPool.getChildByName("" + id);

      if (tmpfish) {
        // tmpfish.destroy();
        this.logic.fishPool.put(tmpfish);
      }
    }

    if (this.logic != null && this.logic.fishPoolData != null && this.logic.fishPoolData.hasOwnProperty(Number(id))) {
      delete this.logic.fishPoolData[Number(id)];
    }

    glGame.emitter.emit(CONST.clientEvent.checkBgMusic);
  },
  //冰冻 - 开始 - 结束
  onFreezeStartStopHandler: function onFreezeStartStopHandler() {
    this.startRunFish = !this.logic.isInFreeze;
    this.updateIcing();
  },
  //游戏循环体
  update: function update(dt) {
    if (window.s1 != null) {
      cc.error("fishNodeList : ", this.fishNodeList[Number(window.s1 + "")]);
      cc.error("ui_physicalPool : ", this.ui_physicalPool.getChildByName(window.s1 + ""));
      window.s1 = null;
    }

    if (!this.logic.startFire) {
      return;
    }

    this.checkShoot(dt);
    this.unLockFish(dt);

    if (!this.logic.quickMove && this.logic.isLock && this.logic.lockFishID == null && this.logic.isLockAutoChange) {
      var lockFishId = this.findFish();

      if (lockFishId) {
        this.logic.lockFishID = lockFishId;
        cc.error(">>----findFish---- 锁定 " + this.logic.lockFishID);
        this.logic.isAuto = true;
        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
      }
    }

    if (this.logic.lockFishID != undefined) {
      if (this.logic.quickMove) {
        this.logic.lockFishID = null;
      }

      var fish = this.ui_physicalPool.getChildByName("" + this.logic.lockFishID);

      if (fish == null) {
        this.logic.lockFishID = null;
      } else {
        if (this.logic.getClickArea(fish.position, fish.width, fish.height)) {} else {
          this.logic.lastLockFishID = Number(this.logic.lockFishID + "");
          this.logic.lockFishID = null;
          this.logic.lockFishIndex = null;

          if (this.logic.isLockAutoChange == false) {
            this.logic.isAuto = false;
            glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
          }
        }
      }
    }

    this.fireTime += dt;

    if (this.fireTime > this.fireTimeFrequency) {
      this.fireTime = 0;
      this.isFire = true;
    }
  },
  //解锁与死亡
  unLockFish: function unLockFish(dt) {
    var MaxUserNum = 4;

    for (var i = 0; i < MaxUserNum; i++) {
      var fish = void 0;
      var ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock" + i);

      if (this.logic.seatNum == i) {
        if (this.logic.lockFishID != null && this.logic.startFire) {
          fish = this.ui_physicalPool.getChildByName("" + this.logic.lockFishID);
        } else {
          ui_lock.isPlaySpined = false;
          ui_lock.active = false;
        }
      }

      if (fish == null) {
        ui_lock.active = false;
        ui_lock.isPlaySpined = false;
      } else {
        ui_lock.x = fish.x;
        ui_lock.y = fish.y;

        if (ui_lock.active == false) {
          ui_lock.active = true;

          if (ui_lock.isPlaySpined == null || ui_lock.isPlaySpined == false) {
            ui_lock.isPlaySpined = true;
            this.playLockSpineHandler(ui_lock);
          }
        }
      }
    }
  },
  //播放锁定动画
  playLockSpineHandler: function playLockSpineHandler(lockNode) {
    var ui_lock;

    if (lockNode == null) {
      ui_lock = this.currentLockUi;
      if (ui_lock) ui_lock.isPlaySpined = true;
    } else {
      ui_lock = lockNode;
    }

    if (ui_lock == undefined) {
      ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock" + this.logic.seatNum);
    }

    if (ui_lock.isPlaySpined == null || ui_lock.isPlaySpined == false) return;
    this.currentLockUi = ui_lock;
    this.logic.playSpine(ui_lock.getChildByName("spine"), false, false, CONST.SpineName.LockStart, null, CONST.SpineName.LockIng, true);
  },
  //用户离开 解锁
  leaveRoomUnLockHandler: function leaveRoomUnLockHandler(res) {
    this.ui_LockCantainer.getChildByName("ui_Lock" + res.seatNum);
  },
  //寻找一条大鱼
  findFish: function findFish() {
    //符合条件的鱼
    var fishId = 0,
        priorityMax = 0;

    for (var id in this.fishNodeList) {
      var fish = this.ui_physicalPool.getChildByName("" + id);

      if (fish != null && fish._components != null && fish.getComponent("nfish_Unit")) {
        var isNext = false;

        if (this.logic.lastLockFishID != undefined) {
          if (fish != null && Number(this.logic.lastLockFishID) != Number(fish.name)) {
            isNext = true;
          }
        } else if (fish != null) isNext = true;

        if (isNext) {
          if (this.logic.getClickArea(fish.position, fish.width, fish.height) && this.logic.fishPoolData[Number(id)] != null) {
            var fishTypeId = this.logic.fishPoolData[Number(id)].fishTypeId;
            var priority = this.logic.json_fishTable[fishTypeId].priority;

            if (priorityMax <= priority) {
              priorityMax = priority;
              fishId = Number(fish.getComponent("nfish_Unit").getFishID());
            }
          }
        }
      }
    }

    return fishId > 0 ? fishId : null;
  },
  //特殊子弹的最后爆炸
  onSpecialBulletExpHandler: function onSpecialBulletExpHandler(res) {
    if (!this.logic.isEnterRoom) {
      if (res.offLine != null) {
        //如果是断线重
        this.logic.offLineMissileData = res;
      }

      return;
    }

    var op;

    if (res.cannonType == CONST.CannonType.PartialBomb) {
      op = CONST.CannonOpention.PartialBombHit;
      glGame.emitter.emit(CONST.clientEvent.fishSound, "PartialBomb");
    }

    if (res.cannonType == CONST.CannonType.Missile) {
      op = CONST.CannonOpention.MissileHit;
    }

    if (res.cannonType == CONST.CannonType.Lightning) {
      op = CONST.CannonOpention.LightningHit;
    }

    var killFishData = this.getFishByRange(res.pos, res.cannonType);

    if (res.cannonType == CONST.CannonType.Lightning) {
      this.runLightningEffect(res, killFishData.killFishList);
    }

    var killFishList = killFishData.killFishList;
    var posList = killFishData.posList;

    if (killFishList.length > 0) {
      if (res.cannonType == CONST.CannonType.PartialBomb) {
        this.creatpartialBombEffect(res.pos);
      } else if (res.cannonType == CONST.CannonType.Missile) {
        //仙剑爆炸效果
        this.creatoMissil(res.pos, killFishList.length + 10); //协议要求添加至少2个0

        killFishList.push(0);
        killFishList.push(0);
      }

      var pos = null;

      if (res.cannonType == CONST.CannonType.Missile) {
        pos = res.pos;
      }

      this.sendHitFishData(op, killFishList, res.uid, res.pos);
    } else {
      if (res.cannonType == CONST.CannonType.Missile) {
        killFishList = [0, 0];
        this.sendHitFishData(op, killFishList, res.uid, res.pos);
      } //仙剑的最后爆炸是一个特效 然后 半径则是 特效的宽度 并不是多个spine 播放


      if (res.cannonType == CONST.CannonType.PartialBomb) {
        this.creatpartialBombEffect(res.pos);
      } else if (res.cannonType == CONST.CannonType.Missile) {
        this.creatoMissil(res.pos, 10);
      }
    }
  },
  //创建仙剑
  creatoMissil: function creatoMissil(pos, num) {
    var Harf = 50;
    var EffectOffsexX = 100;
    var EffectOffsexY = 100;
    var EffectPosOffsexX = 200;
    var EffectPosOffsexY = 200;

    for (var i = 0; i < num; i++) {
      var Xdirection = Math.random() * EffectOffsexX > Harf ? 1 : -1;
      var Ydirection = Math.random() * EffectOffsexY > Harf ? 1 : -1;
      this.creatBoomEffect(cc.v2(pos.x + Math.random() * EffectPosOffsexX * Xdirection, pos.y + Math.random() * EffectPosOffsexY * Ydirection));
    }
  },
  //特殊子弹 仙剑炸弹、闪电、炎爆炸弹 的碰撞 协议
  sendHitFishData: function sendHitFishData(op, killFishList, uid, pos) {
    var hitFishData = {
      "op": op,
      "fishIds": killFishList
    };

    if (Number(uid) != glGame.user.userID) {
      hitFishData["uid"] = uid;
      cc.log(">> 其他人 特殊子弹的碰撞 : ", hitFishData);
    }

    if (pos != null) {
      hitFishData["pos"] = {
        x: pos.x,
        y: pos.y
      };
    } else {
      hitFishData["pos"] = {
        x: 0,
        y: 0
      };
    }

    if (this.logic.isEnterRoom) {
      cc.log("--==-->发送 特殊子弹 仙剑炸弹、闪电、炎爆炸弹 的碰撞 ", hitFishData);
      cc.warn("======== 发送特殊子弹的碰撞 ", hitFishData);
      glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), hitFishData); //子弹碰撞
    }
  },
  //设置旋转
  changeCantainerHandler: function changeCantainerHandler() {
    cc.warn(">> 角度旋转180  changeCantainerHandler");
    this.logic.isNeedSet180Angle(this.node);
  },
  //熔岩玄武 全屏爆炸
  onSpecialBombHandler: function onSpecialBombHandler(res) {
    this.scheduleOnce(function () {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "rongYanBossBoom"); //熔岩玄武爆炸
    }, 0.5);

    if (this.logic.seatNum == Number(res.seatNum)) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "rongYanBossDie"); //熔岩玄武死亡
    }

    if (res.fishTypeId == CONST.BossLavaBasalt) {
      var fish = this.ui_physicalPool.getChildByName("" + res.fishId);

      if (fish) {
        this.creatRongYanBoomEffect(fish.position);
      }
    }
  },
  //创建一个炸弹动画效果，传入一个坐标
  creatBoomEffect: function creatBoomEffect(pos) {
    var _this4 = this;

    var missileEffect = cc.instantiate(this.node.getChildByName("missileEffect"));
    missileEffect.active = true;
    missileEffect.opacity = 0;
    missileEffect.zIndex = CONST.nodeZIndex.zIndexAni;

    if (this.logic.getIsRotation()) {
      missileEffect.angle = 180;
    }

    this.ui_physicalPool.addChild(missileEffect);
    missileEffect.position = pos;
    missileEffect.runAction(cc.sequence(cc.delayTime(Math.random()), cc.callFunc(function () {
      missileEffect.opacity = 255;

      _this4.logic.playSpine(missileEffect, false, false, CONST.SpineName.Normal, function () {
        missileEffect.destroy();
      });
    })));
  },
  //创建一个熔岩玄武炸弹
  creatRongYanBoomEffect: function creatRongYanBoomEffect(pos) {
    var specialBoomEffect = cc.instantiate(this.node.getChildByName("spine_RongYan"));
    specialBoomEffect.active = true;
    specialBoomEffect.position = pos;
    this.ui_physicalPool.addChild(specialBoomEffect);
    this.logic.playSpine(specialBoomEffect, false, false, CONST.SpineName.Normal, function () {
      specialBoomEffect.destroy();
      glGame.emitter.emit(CONST.clientEvent.checkBgMusic);
    });
  },
  //创建一个 炎爆炸弹动爆炸画效果 pos 爆炸中心点
  creatpartialBombEffect: function creatpartialBombEffect(pos) {
    var specialBoomEffect = cc.instantiate(this.partialBombEffect);
    specialBoomEffect.position = pos;
    this.ui_physicalPool.addChild(specialBoomEffect);
    this.logic.playSpine(specialBoomEffect, false, false, CONST.SpineName.Normal, function () {
      specialBoomEffect.destroy();
    });
  },
  //播放闪电效果
  runLightningEffect: function runLightningEffect(res, killFishArr) {
    var myid = glGame.user.userID;

    if (res.uid == myid) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "lightningHit"); //闪电击中鱼
    }

    var len = killFishArr.length;
    var nextFishPos = {};
    var Gap = 0.1;

    for (var i = 0; i < len; i++) {
      var fishID = killFishArr[i];
      var next_fishID = killFishArr[i + 1];
      var fishNode = this.ui_physicalPool.getChildByName("" + fishID);
      if (fishNode == null) continue;
      var next_fishNode = null;

      if (next_fishID != null) {
        next_fishNode = this.ui_physicalPool.getChildByName("" + next_fishID);
      }

      if (next_fishNode) {
        nextFishPos.pos = next_fishNode.position;
        nextFishPos.no = next_fishNode.no;
      }

      var mag = 0;

      if (next_fishNode) {
        var specialEffect = this.logic.creatorEffect();
        specialEffect.parent = null;
        specialEffect.active = true;
        specialEffect.name = "lightning_" + i;
        specialEffect.zIndex = CONST.nodeZIndex.zIndexAllBoom + i;
        this.ui_physicalPool.addChild(specialEffect);
        var temp = fishNode.position.sub(nextFishPos.pos);
        specialEffect.anchorX = 0;
        specialEffect.x = fishNode.x;
        specialEffect.y = fishNode.y;
        specialEffect.angle = this.logic.setAngle(nextFishPos.pos.x, nextFishPos.pos.y, fishNode.position.x, fishNode.position.y);
        mag = temp.mag(); //距离

        var scale = mag / CONST.LightningW;
        var h = scale * CONST.LightningH;
        specialEffect.width = mag;
        var endH = h > CONST.LightningH ? CONST.LightningH : h; // cc.error(">> 闪电宽度 ",w," 高度 ",endH)

        specialEffect.height = CONST.LightningH; // specialEffect.height = CONST.LightningH;

        var EffectImage = "img_shandian";
        var Begin = 1;
        var End = 8;
        var Loop = 1;
        var IsHaveZero = false;
        var Speed = 0.12;
        var PlayedRemove = true;
        specialEffect.getComponent("nfish_MovieClip").initEffect(this.explosionAndLightning_Atlas, EffectImage, Begin, End, Loop, IsHaveZero, Speed, PlayedRemove, null, 0, mag, h, i * Gap);
      }

      this.creatEffectBluePointLight(fishNode.x, fishNode.y, i, i * Gap, mag);
    }
  },
  //创建一个 蓝光闪现 动画
  creatEffectBluePointLight: function creatEffectBluePointLight(x, y, i, mag) {
    var specialEffect = this.logic.creatorEffect();
    specialEffect.parent = null;
    specialEffect.active = true;

    if (mag > cc.winSize.height / 3 && mag < cc.winSize.height / 2) {
      specialEffect.scale = 5.8;
    } else if (mag > cc.winSize.height / 2 && mag < cc.winSize.height) {
      specialEffect.scale = 6.8;
    } else {
      specialEffect.scale = 4.5;
    }

    specialEffect.zIndex = CONST.nodeZIndex.zIndexAni + i * 3;
    this.ui_physicalPool.addChild(specialEffect);
    specialEffect.x = x;
    specialEffect.y = y;
    var EffectImage = "img_shandian_ball";
    var Begin = 1;
    var End = 7;
    var Loop = 2;
    var IsHaveZero = false;
    var Speed = 0.072;
    var PlayedRemove = true;
    specialEffect.getComponent("nfish_MovieClip").initEffect(this.explosionAndLightning_Atlas, EffectImage, Begin, End, Loop, IsHaveZero, Speed, PlayedRemove);
  },
  //获取金币
  getCoin: function getCoin(res) {
    var rewardGold = Math.floor(res.rewardGold / res.killFishArr.length);
    var tmpList = [];

    for (var i = 0; i < res.killFishArr.length; i++) {
      var fishKey = res.killFishArr[i].fishLineID;
      var fishNode = this.ui_physicalPool.getChildByName("" + fishKey);

      if (fishNode) {
        var item = {};
        item.rewardGold = rewardGold;
        item.seatNum = res.seatNum;
        item.uid = res.uid;
        item.position = fishNode.position;
        item.multiple = this.logic.getRandomNum(0, 100);
        tmpList.push(item);
      }
    }

    var GetRunCoinTime = 1;
    this.scheduleOnce(function () {
      for (var _i2 = 0; _i2 < tmpList.length; _i2++) {
        glGame.emitter.emit(CONST.clientEvent.playCoinEffect, tmpList[_i2]);
      }
    }, GetRunCoinTime);
  },
  //获取id鱼的范围内的鱼
  getFishByRange: function getFishByRange(pos, cannonType) {
    if (!this.logic.isEnterRoom) {
      return;
    }

    var killFishList = [];
    var posList = [];
    var radius = 0;

    if (cannonType == CONST.CannonType.Lightning) {
      posList.push(pos);
      radius = Number(this.logic.roomRule.LightningRadius); // 闪电炮弹产生的连锁闪电的连锁目标半径范围（单位：像素）
    }

    if (cannonType == CONST.CannonType.PartialBomb) {
      posList.push(pos);
      radius = Number(this.logic.roomRule.ExplodeRadius); // 炎爆炮弹的爆炸效果半径范围（单位：像素）
    }

    if (cannonType == CONST.CannonType.Missile) {
      radius = Number(this.logic.roomRule.ExcaliburRadius); // 仙剑爆炸时的爆炸半径范围（单位：像素）
    }

    var All = 100;
    var Haf = 50;

    for (var id in this.fishNodeList) {
      var fish = this.ui_physicalPool.getChildByName("" + id);

      if (fish && Math.abs(fish.x) < cc.winSize.width / 2 && Math.abs(fish.y) < cc.winSize.height / 2) {
        var curr = Math.random() * All;
        var fishUnit = fish.getComponent("nfish_Unit");

        if (fishUnit) {
          var dis = this.getDistanceTwoPoint(pos, fish); //计算距离

          if (cannonType == CONST.CannonType.Lightning) {
            if (curr < Haf && posList.length <= Number(this.logic.roomRule.LightningMaxFish)) {
              killFishList.push(fishUnit.getFishID());
              posList.push(cc.v2(fish.x, fish.y));
            }
          } else {
            if (dis <= radius) {
              killFishList.push(fishUnit.getFishID());
              posList.push(cc.v2(fish.x, fish.y));
            }
          }
        }
      }
    }

    return {
      killFishList: killFishList,
      posList: posList
    };
  },
  //计算距离
  getDistanceTwoPoint: function getDistanceTwoPoint(node1, node2) {
    var OffsexY = 2;
    return Math.sqrt(Math.pow(node1.x - node2.x, OffsexY) + Math.pow(node1.y - node2.y, OffsexY));
  },
  //点击所有按钮
  onClick: function onClick(name, node) {
    switch (name) {
      case "ui_bg":
        return this.menuOptionViewHandler();

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //打开
  menuOptionViewHandler: function menuOptionViewHandler(res) {
    this.node.active = true;
  },
  //锁定
  useAutoSkillHandler: function useAutoSkillHandler() {
    var LockTime = 0.2;
    this.autoShootTime = LockTime;
  },
  //震动 - 通用震动库
  onShockHandler: function onShockHandler() {
    var _this5 = this;

    if (this.isSshockIng) return;
    var SshockTime = 0.8;
    this.isSshockIng = true;
    this.oldPos = this.node.position;
    this.node.getComponent(cc.Widget).enabled = false;
    this.node.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.02, cc.v2(this.oldPos.x + 5, this.oldPos.y + 7)), cc.moveTo(0.02, cc.v2(this.oldPos.x - 6, this.oldPos.y + 7)), cc.moveTo(0.02, cc.v2(this.oldPos.x - 13, this.oldPos.y + 3)), cc.moveTo(0.02, cc.v2(this.oldPos.x + 3, this.oldPos.y - 6)), cc.moveTo(0.02, cc.v2(this.oldPos.x - 5, this.oldPos.y + 5)), cc.moveTo(0.02, cc.v2(this.oldPos.x + 2, this.oldPos.y - 8)), cc.moveTo(0.02, cc.v2(this.oldPos.x - 8, this.oldPos.y - 10)), cc.moveTo(0.02, cc.v2(this.oldPos.x + 3, this.oldPos.y + 10)), cc.moveTo(0.02, cc.v2(this.oldPos.x + 0, this.oldPos.y + 0)))));
    this.scheduleOnce(function () {
      _this5.node.stopAllActions();

      _this5.node.setPosition(_this5.oldPos);

      _this5.node.getComponent(cc.Widget).enabled = true;
      _this5.isSshockIng = false;
    }, SshockTime);
  },
  //销毁
  OnDestroy: function OnDestroy() {
    this.unscheduleAllCallbacks();
    this.unregisterEvent();
    this.fishNodeList = null;
    this.fishNodeListLenght = 0;
    this.startRunFish = false;
    this.logic = null;
    this.ui_physicalPool = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfZGVza0NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJDT05TVCIsInJlcXVpcmUiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwidWlfcGh5c2ljYWxQb29sIiwiY2MiLCJOb2RlIiwiaGl0Tm9kZSIsInVpX0xvY2tDYW50YWluZXIiLCJwYXJ0aWFsQm9tYkVmZmVjdCIsImZpc2hfQnVsbGV0IiwiUHJlZmFiIiwiZmlzaF9Vbml0IiwiZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzIiwiZGlzcGxheU5hbWUiLCJ0b29sdGlwIiwidHlwZSIsIlNwcml0ZUF0bGFzIiwiYnVsbGV0X0F0bGFzIiwibWlzc2lsQnVsbGV0X0F0bGFzIiwiZmlzaF9BdGxhTGlzdHMiLCJvbkxvYWQiLCJsb2dpYyIsImdldEluc3RhbmNlIiwic3RhcnRSdW5GaXNoIiwiY3VyclRvdWNoRXZlbnQiLCJmaXJlVGltZSIsImZpcmVUaW1lRnJlcXVlbmN5IiwiaXNGaXJlIiwic2hvb3RUaW1lIiwiYXV0b1Nob290VGltZSIsImxvY2tCdWxsZXRMaXN0IiwiZmlzaE5vZGVMaXN0IiwiZmlzaE5vZGVMaXN0TGVuZ2h0Iiwib2xkUG9zIiwibm9kZSIsInBvc2l0aW9uIiwiYWRkQ29tcG9uZW50IiwiYWN0aXZlIiwiaXNTc2hvY2tJbmciLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJkZWJ1Z0RyYXdGbGFncyIsIlBoeXNpY3NNYW5hZ2VyIiwiRHJhd0JpdHMiLCJlX2FhYmJCaXQiLCJlX3BhaXJCaXQiLCJyZWdpc3RlckV2ZW50Iiwic3RhcnQiLCJlbWl0dGVyIiwib24iLCJjbGllbnRFdmVudCIsImFkanVzdEd1bkFuZ2xlIiwiYWRqdXN0R3VuQW5nbGVIYW5kbGVyIiwiaW5pdEZpc2hQb29sIiwiaW5pdEZpc2hQb29sSGFuZGxlciIsImFkZEZpc2hQb29sIiwiYWRkRmlzaFBvb2xIYW5kbGVyIiwiYWRkRmlzaFRpZGUiLCJhZGRGaXNoVGlkZUhhbmRsZXIiLCJwbGF5U2hvb3RCdWxsZXQiLCJwbGF5U2hvb3RCdWxsZXRIYW5kbGVyIiwicGxheUZpc2huZXRFZmZlY3QiLCJwbGF5RmlzaG5ldEVmZmVjdEhhbmRsZXIiLCJvbktpbGxGaXNoIiwib25LaWxsRmlzaEhhbmRsZXIiLCJvbkZyZWV6ZVN0YXJ0U3RvcCIsIm9uRnJlZXplU3RhcnRTdG9wSGFuZGxlciIsInVzZUF1dG9Ta2lsbCIsInVzZUF1dG9Ta2lsbEhhbmRsZXIiLCJsZWF2ZVJvb21VbkxvY2siLCJsZWF2ZVJvb21VbkxvY2tIYW5kbGVyIiwic2VhV2F2ZUZpc2hHcm91cCIsInNlYVdhdmVGaXNoR3JvdXBIYW5kbGVyIiwiZmlzaENhbmNlbFNob290Iiwib25DbGlja0hhbmRsZXIiLCJkaXNwb3NlRmlzaE5vZGUiLCJkaXNwb3NlRmlzaE5vZGVIYW5kbGVyIiwiaW5pdEJ1bGxldExpc3QiLCJpbml0QnVsbGV0TGlzdEhhbmRsZXIiLCJvblNzaG9jayIsIm9uU2hvY2tIYW5kbGVyIiwicGxheUxvY2tTcGluZSIsInBsYXlMb2NrU3BpbmVIYW5kbGVyIiwib25TcGVjaWFsQnVsbGV0RXhwIiwib25TcGVjaWFsQnVsbGV0RXhwSGFuZGxlciIsIm9uU3BlY2lhbEJvbWIiLCJvblNwZWNpYWxCb21iSGFuZGxlciIsImNoYW5nZUNhbnRhaW5lciIsImNoYW5nZUNhbnRhaW5lckhhbmRsZXIiLCJsb2NrU2VsZkZpc2giLCJsb2NrU2VsZkZpc2hIYW5kbGVyIiwiY2hlY2tCZ011c2ljIiwiY2hlY2tCZ011c2ljSGFuZGxlciIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uRmlyZUhvb0hhbmRsZXIiLCJUT1VDSF9TVEFSVCIsIlRPVUNIX0NBTkNFTCIsInVucmVnaXN0ZXJFdmVudCIsIm9mZiIsInJlcyIsImJ1bGxldEVmZmVjdCIsImd1bkxldmVsIiwiY2Fubm9uVHlwZSIsIkNhbm5vblR5cGUiLCJNaXNzaWxlIiwiYnVsbGV0Tm9kZSIsImdldENoaWxkQnlOYW1lIiwid2FybiIsImZpc2hOZXQiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInpJbmRleCIsIm1heFNjYWxlU2V0IiwibSIsImdldFJhbmRvbU51bSIsInNldFNjYWxlIiwiYW5nbGUiLCJhZGRDaGlsZCIsImdldENvbXBvbmVudCIsInNwIiwiU2tlbGV0b24iLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwidHJhY2tFbnRyeSIsImxvb3BDb3VudCIsIm5hbWUiLCJhbmltYXRpb24iLCJTcGluZU5hbWUiLCJBdHRhY2siLCJkZXN0cm95Iiwic2V0QW5pbWF0aW9uIiwiZXZ0IiwiZW1pdCIsImlzTG9jayIsInBvcyIsImdldExvY2F0aW9uIiwiZGlyZWN0aW9uIiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJzZXRDbGljayIsImNsaWNrRmlzaFBvb2wiLCJ5IiwiU2hvb3RCdXR0b21NaW4iLCJjaGVja1Nob290IiwiZHQiLCJTaG90SW50ZXJ2YWwiLCJTaG90SW50ZXJ2YWxUaW1lIiwiaXNBdXRvIiwibG9ja0Zpc2hJRCIsInVuZGVmaW5lZCIsIk5vcm1hbCIsInBsYXllckluZm8iLCJOdW1iZXIiLCJ1aWQiLCJlcnJvciIsInNlYXROdW0iLCJjYW5ub25BbW91bnQiLCJjaGVja1NwZWNpYWxDYW5ub24iLCJNb3ZpbmciLCJsb2ciLCJhaW1GaXNoSWQiLCJmaXNoIiwiZ2V0Q2xpY2tBcmVhIiwid2lkdGgiLCJoZWlnaHQiLCJsb2NrIiwibGFzdEFuZ2xlIiwidXBkYXRlR3VuUmVjb2lsIiwidXBkYXRlU2hvb3RHb2xkIiwib2ZmTGluZSIsIm15aWQiLCJ1c2VyIiwidXNlcklEIiwiaXNNZSIsImNhbm5vbkxldmVsIiwiZmlzaFNvdW5kIiwidWlfZ3VuIiwib2xkQW5nbGUiLCJmaXJlIiwid29ybGRQb2ludCIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImxvY2FsUG9pbnQiLCJndW5UeXBlIiwiZ2V0VGFyZ2V0RmlzaEFuZ2xlIiwiZmlzaFBvb2xEYXRhIiwicGxhY2VPZkJpcnRoIiwidjIiLCJ4IiwidHBtQW5nbGUiLCJTZWF0IiwiTGVmdFRvcCIsIlJpZ2h0VG9wIiwiTm9ybWFsQW5nZWwiLCJNYXRoIiwic2luIiwiUEkiLCJjb3MiLCJidWxsZXRJZCIsIkRhdGUiLCJub3ciLCJjdXJyZW50VWlkIiwiaXNIYXZlTGFzZXIiLCJMYXNlciIsImlzSGF2ZU1pc3NpbGUiLCJoaXRNYXgiLCJpc0hhdmVQYXJ0aWFsQm9tYiIsIlBhcnRpYWxCb21iIiwiaXNIYXZlTGlnaHRuaW5nIiwiTGlnaHRuaW5nIiwiY3VycmVudEJ1bGx0ZVR5cGUiLCJvcCIsIkNhbm5vbk9wZW50aW9uIiwiZGF0YUFuZ2xlIiwiTm90IiwiaXNGaXJlTGFzZXIiLCJDRCIsIk1heGltdW1CdWxsZXRDb2xsaXNpb25UaW1lIiwic2NoZWR1bGVPbmNlIiwiY2xlYXJTcGVjaWFsQnVsbGV0UG9vbCIsInNwZWNpYWxCdWxsZXRQb29sIiwib25MYXNlckRpc3BhdGgiLCJwbGF5RmlyaW5nRWZmZWN0IiwibGFzdENhbW1wbVR5cGUiLCJyZXN0b3JlQ2Fubm9uIiwiaXNOb3ciLCJ1cFNwZWNpYWxHdW5Db2luIiwiY3VyV2FpdFRpbWUiLCJmaXJlU2V0dGluZ1JlY29pbCIsImlzTmVlZFNlbmQiLCJidWxsZXQiLCJidWxsZXRQb29sIiwic2l6ZSIsImdldCIsInNjcmlwdCIsImJ1bGx0ZU51bSIsIlJlVGltZSIsImluaXRCdWxsZXRBdGxhcyIsImluaXRCdWxsZXQiLCJwdXNoIiwiaGlkZGVuTG9jYXRpb25UaXAiLCJkYXRhIiwiaXNFbnRlclJvb20iLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb29tIiwiZ2V0UGxheWVyT3AiLCJzY2VuZXRhZyIsIkZJU0gyIiwia2V5Iiwic3RhcnRQb3MiLCJnZXRQMVRvUDJBbmdsZSIsImZpc2hJZCIsImxhc3RMb2NrRmlzaElEIiwibG9ja0Zpc2hJbmRleCIsImlzTG9ja0F1dG9DaGFuZ2UiLCJfY29tcG9uZW50cyIsImZpc2hUeXBlSWQiLCJCb3NzR29kT2ZXZWFsdGgiLCJxdWlja0RpZSIsImtpbGxUeXBlIiwiZGllVHlwZTMiLCJkaWVUeXBlMSIsImRlYXRoIiwiZGVsYXlEaWVUaW1lIiwiY29uc29sZSIsImN1cnJCZ011c2ljSW5kZXgiLCJpdGVtIiwiQm9zc0xhdmFCYXNhbHQiLCJCb3NzTGF2YUJhc2FsdEJnTXVzaWMiLCJCb3NzU1lMVyIsIkJvc3NTWUxXQmdNdXNpYyIsImlzV2VsbERpZSIsIkJvc3NHb2RPZldlYWx0aEJnTXVzaWMiLCJmaXNoQmdTb3VuZCIsInF1aWNrTW92ZSIsImluaXRGaXNoRGF0YSIsInRtcEFycmF5IiwiaWQiLCJpIiwibGVuIiwibGVuZ3RoIiwic2NoZWR1bGUiLCJqIiwiZmlzaFNldHZlckRhdGEiLCJ1c2VkIiwiZmlzaERhdGEiLCJUb1Njb25kIiwic2VydmVyVGltZSIsInRpbWUiLCJjcmVhdGVUaW1lIiwicnVuVGltZSIsInNob3dUaW1lIiwiY3JlYXRlRmlzaCIsImZpc2hOb2RlIiwiZmlzaFBvb2wiLCJpc0Zpc2giLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJpbml0QXRsYXMiLCJpbml0RmlzaCIsInVwZGF0ZUljaW5nIiwic2V0dGluZ0ljaW5nIiwiX3RpbWUiLCJmaXJzdE5vZGUiLCJsb2NrU2VsZiIsIm1zZyIsInNob3dGaXNoVGlkZVRpdGxlIiwiTm90SGF2ZUZpc2giLCJuZXh0Iiwic2VhV2F2ZUNoYW5nZUJnIiwiYmdJbmRleCIsIm9uU3VyZlN0YXJ0Iiwic3RhcnRGaXJlIiwiZmlzaExlbnRoIiwiY2hpbGRyZW5Db3VudCIsImN1cnJOb2RlIiwiY2hpbGRyZW4iLCJnZXRGaXNoSUQiLCJib3NzSURMaXN0IiwiaW5kZXhPZiIsInJlbW92ZUNoaWxkIiwic3BlY2lhbEZpc2hMaXN0Qm9ybiIsImFkZFRpZGUiLCJncm91cElkIiwiaGlkZUJvc3NDb25pblVJIiwiTWF4VXNlck51bSIsInVpX2xvY2siLCJTZWFXYXZlUnVuVGltZSIsImZEYXRhIiwidG1wZmlzaCIsInB1dCIsImhhc093blByb3BlcnR5IiwiaXNJbkZyZWV6ZSIsInVwZGF0ZSIsIndpbmRvdyIsInMxIiwidW5Mb2NrRmlzaCIsImxvY2tGaXNoSWQiLCJmaW5kRmlzaCIsImlzUGxheVNwaW5lZCIsImxvY2tOb2RlIiwiY3VycmVudExvY2tVaSIsInBsYXlTcGluZSIsIkxvY2tTdGFydCIsIkxvY2tJbmciLCJwcmlvcml0eU1heCIsImlzTmV4dCIsInByaW9yaXR5IiwianNvbl9maXNoVGFibGUiLCJvZmZMaW5lTWlzc2lsZURhdGEiLCJQYXJ0aWFsQm9tYkhpdCIsIk1pc3NpbGVIaXQiLCJMaWdodG5pbmdIaXQiLCJraWxsRmlzaERhdGEiLCJnZXRGaXNoQnlSYW5nZSIsInJ1bkxpZ2h0bmluZ0VmZmVjdCIsImtpbGxGaXNoTGlzdCIsInBvc0xpc3QiLCJjcmVhdHBhcnRpYWxCb21iRWZmZWN0IiwiY3JlYXRvTWlzc2lsIiwic2VuZEhpdEZpc2hEYXRhIiwibnVtIiwiSGFyZiIsIkVmZmVjdE9mZnNleFgiLCJFZmZlY3RPZmZzZXhZIiwiRWZmZWN0UG9zT2Zmc2V4WCIsIkVmZmVjdFBvc09mZnNleFkiLCJYZGlyZWN0aW9uIiwicmFuZG9tIiwiWWRpcmVjdGlvbiIsImNyZWF0Qm9vbUVmZmVjdCIsImhpdEZpc2hEYXRhIiwiaXNOZWVkU2V0MTgwQW5nbGUiLCJjcmVhdFJvbmdZYW5Cb29tRWZmZWN0IiwibWlzc2lsZUVmZmVjdCIsIm9wYWNpdHkiLCJub2RlWkluZGV4IiwiekluZGV4QW5pIiwiZ2V0SXNSb3RhdGlvbiIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJzcGVjaWFsQm9vbUVmZmVjdCIsImtpbGxGaXNoQXJyIiwibmV4dEZpc2hQb3MiLCJHYXAiLCJmaXNoSUQiLCJuZXh0X2Zpc2hJRCIsIm5leHRfZmlzaE5vZGUiLCJubyIsIm1hZyIsInNwZWNpYWxFZmZlY3QiLCJjcmVhdG9yRWZmZWN0IiwiekluZGV4QWxsQm9vbSIsInRlbXAiLCJzdWIiLCJhbmNob3JYIiwic2V0QW5nbGUiLCJzY2FsZSIsIkxpZ2h0bmluZ1ciLCJoIiwiTGlnaHRuaW5nSCIsImVuZEgiLCJFZmZlY3RJbWFnZSIsIkJlZ2luIiwiRW5kIiwiTG9vcCIsIklzSGF2ZVplcm8iLCJTcGVlZCIsIlBsYXllZFJlbW92ZSIsImluaXRFZmZlY3QiLCJjcmVhdEVmZmVjdEJsdWVQb2ludExpZ2h0Iiwid2luU2l6ZSIsImdldENvaW4iLCJyZXdhcmRHb2xkIiwiZmxvb3IiLCJ0bXBMaXN0IiwiZmlzaEtleSIsImZpc2hMaW5lSUQiLCJtdWx0aXBsZSIsIkdldFJ1bkNvaW5UaW1lIiwicGxheUNvaW5FZmZlY3QiLCJyYWRpdXMiLCJyb29tUnVsZSIsIkxpZ2h0bmluZ1JhZGl1cyIsIkV4cGxvZGVSYWRpdXMiLCJFeGNhbGlidXJSYWRpdXMiLCJBbGwiLCJIYWYiLCJhYnMiLCJjdXJyIiwiZmlzaFVuaXQiLCJkaXMiLCJnZXREaXN0YW5jZVR3b1BvaW50IiwiTGlnaHRuaW5nTWF4RmlzaCIsIm5vZGUxIiwibm9kZTIiLCJPZmZzZXhZIiwic3FydCIsInBvdyIsIm9uQ2xpY2siLCJtZW51T3B0aW9uVmlld0hhbmRsZXIiLCJMb2NrVGltZSIsIlNzaG9ja1RpbWUiLCJXaWRnZXQiLCJyZXBlYXRGb3JldmVyIiwibW92ZVRvIiwic3RvcEFsbEFjdGlvbnMiLCJzZXRQb3NpdGlvbiIsIk9uRGVzdHJveSIsInVuc2NoZWR1bGVBbGxDYWxsYmFja3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBbkI7O0FBQ0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUNDLEVBQUUsQ0FBQ0MsSUFEWDtBQUNvQjtBQUM1QkMsSUFBQUEsT0FBTyxFQUFDRixFQUFFLENBQUNDLElBRkg7QUFFbUI7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QVk2RyxDQUFaLEdBQWMsRUFBckMsQ0FBaEIsQ0FBN2EsRUFBMmUxSSxFQUFFLENBQUM2YixNQUFILENBQVUsSUFBVixFQUFnQjdiLEVBQUUsQ0FBQ3VMLEVBQUgsQ0FBTSxLQUFLMUosTUFBTCxDQUFZMkosQ0FBWixHQUFjLENBQXBCLEVBQXVCLEtBQUszSixNQUFMLENBQVk2RyxDQUFaLEdBQWMsQ0FBckMsQ0FBaEIsQ0FBM2UsQ0FBakIsQ0FBcEI7QUFDQSxTQUFLNEUsWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDeEwsSUFBTCxDQUFVZ2EsY0FBVjs7QUFDQSxNQUFBLE1BQUksQ0FBQ2hhLElBQUwsQ0FBVWlhLFdBQVYsQ0FBc0IsTUFBSSxDQUFDbGEsTUFBM0I7O0FBQ0EsTUFBQSxNQUFJLENBQUNDLElBQUwsQ0FBVXVGLFlBQVYsQ0FBdUJySCxFQUFFLENBQUMyYixNQUExQixFQUFrQ3RaLE9BQWxDLEdBQTRDLElBQTVDO0FBQ0EsTUFBQSxNQUFJLENBQUNILFdBQUwsR0FBbUIsS0FBbkI7QUFDSCxLQUxELEVBS0d3WixVQUxIO0FBTUgsR0Fyd0NtQjtBQXN3Q3BCO0FBQ0FNLEVBQUFBLFNBdndDb0IsdUJBdXdDUjtBQUNSLFNBQUtDLHNCQUFMO0FBQ0EsU0FBS2pXLGVBQUw7QUFDQSxTQUFLckUsWUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsU0FBS1QsWUFBTCxHQUF1QixLQUF2QjtBQUNBLFNBQUtGLEtBQUwsR0FBdUIsSUFBdkI7QUFDQSxTQUFLbEIsZUFBTCxHQUF1QixJQUF2QjtBQUNIO0FBL3dDbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcclxuICogIOaNlemxvO+8muahjOWtkO+8mua4lOWcuiDjgIEg5a2Q5by55rGg44CB6YOo5YiGVUko6ZqQ5byP5aSn54Ku77yJLOmDqOWIhueJueaViFxyXG4gKiAqKi9cclxubGV0IENPTlNUID0gcmVxdWlyZShcIm5maXNoQ29uc3RcIik7XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB1aV9waHlzaWNhbFBvb2w6Y2MuTm9kZSwgICAgLy/niannkIbmsaDvvJog6bG8IOWtkOW8uSDlj4LkuI7norDmkp7mo4DmtYvnmoTlr7nosaFcclxuICAgICAgICBoaXROb2RlOmNjLk5vZGUsICAgICAgICAgICAvL+eCueWHu+Wxj+W5leeahOeisOaSnuW/q1xyXG4gICAgICAgIHVpX0xvY2tDYW50YWluZXI6Y2MuTm9kZSwgLy/ngrnlh7vlsY/luZXnmoTnorDmkp7lv6tcclxuICAgICAgICBwYXJ0aWFsQm9tYkVmZmVjdDpjYy5Ob2RlLCAvL+eCjueIhueIhueCuOaViOaenFxyXG4gICAgICAgIGZpc2hfQnVsbGV0OmNjLlByZWZhYiwgICAgLy/lrZDlvLnpooTliLbljZXkvY1cclxuICAgICAgICBmaXNoX1VuaXQ6Y2MuUHJlZmFiLCAgICAvL+mxvOmihOWItuWNleS9jVxyXG4gICAgICAgIC8v5a2Q5by5VUlcclxuICAgICAgICBleHBsb3Npb25BbmRMaWdodG5pbmdfQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwi54m55pWI5Zu+6ZuGXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi54iG54K477yM54Gw54Os77yM6Zeq55S1XCIsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+WtkOW8uVVJXHJcbiAgICAgICAgYnVsbGV0X0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIuWtkOW8uVVJXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5a2Q5by5VUkgMSAtIDEwXCIsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+S7meWJkeWtkOW8uVVJXHJcbiAgICAgICAgbWlzc2lsQnVsbGV0X0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIuS7meWJkeWtkOW8uVVJXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5LuZ5YmR5a2Q5by5VUlcIixcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vZmlzaFxyXG4gICAgICAgIGZpc2hfQXRsYUxpc3RzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCLmiYDmnInpsbxcIixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLpsbxcIixcclxuICAgICAgICAgICAgdHlwZTpbY2MuU3ByaXRlQXRsYXNdLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpYyAgICAgICAgICAgICAgPSByZXF1aXJlKFwibmZpc2hsb2dpY1wiKS5nZXRJbnN0YW5jZSgpOy8v5pWw5o2u5Lit5b+DXHJcbiAgICAgICAgdGhpcy5sb2dpYy51aV9waHlzaWNhbFBvb2wgPSB0aGlzLnVpX3BoeXNpY2FsUG9vbDtcclxuICAgICAgICB0aGlzLnN0YXJ0UnVuRmlzaCAgICAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyclRvdWNoRXZlbnQgICAgID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpcmVUaW1lICAgICAgICAgICA9IDA7ICAgIC8v5byA54Gr6K6h5pe25ZmoXHJcbiAgICAgICAgdGhpcy5maXJlVGltZUZyZXF1ZW5jeSAgPSAwLjE3OyAvL+W8gOeBq+mikeeOh1xyXG4gICAgICAgIHRoaXMuaXNGaXJlICAgICAgICAgICAgID0gdHJ1ZTsgLy/mmK/lkKblj6/ku6XlvIDngatcclxuICAgICAgICB0aGlzLnNob290VGltZSAgICAgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvU2hvb3RUaW1lICAgICAgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+makOiXj+eJueauiumxvCBub2RlXHJcbiAgICAgICAgdGhpcy5sb2NrQnVsbGV0TGlzdCAgICAgPSBbXTtcclxuICAgICAgICB0aGlzLmZpc2hOb2RlTGlzdCAgICAgICA9IHt9O1xyXG4gICAgICAgIHRoaXMuZmlzaE5vZGVMaXN0TGVuZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLm9sZFBvcyAgICAgICAgICAgICA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmhpdE5vZGUuYWRkQ29tcG9uZW50KFwibmZpc2hfaGl0Tm9kZVwiKTtcclxuICAgICAgICB0aGlzLmhpdE5vZGUuYWN0aXZlICAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTc2hvY2tJbmcgICAgICAgID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgIC8v5omT5byA56Kw5pKe5qOA5rWLXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5ZCv55So54mp55CG5byV5pOO55u45YWz5Yqf6IO9XHJcbiAgICAgICAgLy/osIPor5XmqKHlvI9cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID0gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9hYWJiQml0IHx8Y2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9wYWlyQml0O1xyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTsgICAgICAgICAvL+aYr+WQpue7mOWItueisOaSnue7hOS7tueahOWMheWbtOebklxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsgICAgICAgICAgICAgICAvL+aYr+WQpue7mOWItueisOaSnue7hOS7tueahOW9oueKtlxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0ICgpIHtcclxuICAgIH0sXHJcbiAgICAvL+azqOWGjOebkeWQrFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5hZGp1c3RHdW5BbmdsZSx0aGlzLmFkanVzdEd1bkFuZ2xlSGFuZGxlcix0aGlzKTsgICAgICAgIC8v6LCD5pW06auY5bCE54Ku6KeS5bqmXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuaW5pdEZpc2hQb29sLHRoaXMuaW5pdEZpc2hQb29sSGFuZGxlcix0aGlzKTsgICAgICAgICAgICAvL+WIneWni+WMlumxvOWhmFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmFkZEZpc2hQb29sLHRoaXMuYWRkRmlzaFBvb2xIYW5kbGVyLHRoaXMpOyAgICAgICAgICAgICAgLy/liqDpsbxcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5hZGRGaXNoVGlkZSx0aGlzLmFkZEZpc2hUaWRlSGFuZGxlcix0aGlzKTsgICAgICAgICAgICAgIC8v5Yqg6bG85r2uXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQucGxheVNob290QnVsbGV0LHRoaXMucGxheVNob290QnVsbGV0SGFuZGxlcix0aGlzKTsgICAgICAvL+eUqOaIt+WwhOWHu1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXNobmV0RWZmZWN0LHRoaXMucGxheUZpc2huZXRFZmZlY3RIYW5kbGVyLHRoaXMpOyAgLy/nlJ/miJDmuJTnvZFcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5vbktpbGxGaXNoLHRoaXMub25LaWxsRmlzaEhhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgIC8v6ZSA5q+B6bG8XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQub25GcmVlemVTdGFydFN0b3AsdGhpcy5vbkZyZWV6ZVN0YXJ0U3RvcEhhbmRsZXIsdGhpcyk7ICAvL+WGsOWGuyDlvIDlp4st57uT5p2fXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsLHRoaXMudXNlQXV0b1NraWxsSGFuZGxlcix0aGlzKTsgICAgICAgICAgICAvL+S9v+eUqOmUgeWumuaKgOiDvVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmxlYXZlUm9vbVVuTG9jayx0aGlzLmxlYXZlUm9vbVVuTG9ja0hhbmRsZXIsdGhpcyk7ICAgICAgLy/nlKjmiLfnprvlvIDop6PplIFcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5zZWFXYXZlRmlzaEdyb3VwLHRoaXMuc2VhV2F2ZUZpc2hHcm91cEhhbmRsZXIsdGhpcyk7ICAgIC8v5rW35rWq6bG8576kIC0g5b+r6YCf5ri46LWwXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuZmlzaENhbmNlbFNob290LHRoaXMub25DbGlja0hhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAvL+WBnOatouWwhOWHu1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmRpc3Bvc2VGaXNoTm9kZSx0aGlzLmRpc3Bvc2VGaXNoTm9kZUhhbmRsZXIsdGhpcyk7ICAgICAgLy/plIDmr4HpsbxcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5pbml0QnVsbGV0TGlzdCx0aGlzLmluaXRCdWxsZXRMaXN0SGFuZGxlcix0aGlzKTsgICAgICAgIC8v5Yid5aeL5YyW6bG85rGg5a2Q5by5LeaWrei/nlxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50Lm9uU3Nob2NrLHRoaXMub25TaG9ja0hhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgLy/pnIfliqjlsY/luZVcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5wbGF5TG9ja1NwaW5lLHRoaXMucGxheUxvY2tTcGluZUhhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v5pKt5pS+6ZSB5a6a5Yqo55S7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQub25TcGVjaWFsQnVsbGV0RXhwLHRoaXMub25TcGVjaWFsQnVsbGV0RXhwSGFuZGxlcix0aGlzKTsvL+eJueauiuWtkOW8ueeIhueCuFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50Lm9uU3BlY2lhbEJvbWIsdGhpcy5vblNwZWNpYWxCb21iSGFuZGxlcix0aGlzKTsgICAgICAgICAgLy/nhpTlsqnnjoTmraYg5YWo5bGP54iG54K4XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY2hhbmdlQ2FudGFpbmVyLHRoaXMuY2hhbmdlQ2FudGFpbmVySGFuZGxlcix0aGlzKTsgICAgICAvL+aUueWPmOeJqeeQhuWuueWZqCBzY2FsZVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmNoYW5nZUNhbnRhaW5lcix0aGlzLmNoYW5nZUNhbnRhaW5lckhhbmRsZXIsdGhpcyk7ICAgICAgLy/mlLnlj5jniannkIblrrnlmaggc2NhbGVcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5sb2NrU2VsZkZpc2gsdGhpcy5sb2NrU2VsZkZpc2hIYW5kbGVyLHRoaXMpOyAgICAgICAgICAgIC8v6ZSB5a6a6bG8XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tCZ011c2ljLHRoaXMuY2hlY2tCZ011c2ljSGFuZGxlcix0aGlzKTsgICAgICAgICAgICAvL+agueaNruaYr+WQpuaciWJvc3Mg5qOA5p+l5YiH5o2i6IOM5pmv6Z+z5LmQXHJcbiAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25GaXJlSG9vSGFuZGxlcix0aGlzKTsgICAgICAgICAgICAvL+e7k+adn+eCueWHuyDpsbzmsaBcclxuICAgICAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uRmlyZUhvb0hhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v5byA5aeL54K55Ye7IOmxvOaxoFxyXG4gICAgICAgIHRoaXMudWlfcGh5c2ljYWxQb29sLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uRmlyZUhvb0hhbmRsZXIsdGhpcyk7ICAgICAgICAgLy/lj5bmtojngrnlh7sg6bG85rGgXHJcbiAgICB9LFxyXG4gICAgLy/lj43ms6jlhoznm5HlkKxcclxuICAgIHVucmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuYWRqdXN0R3VuQW5nbGUsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmluaXRGaXNoUG9vbCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuYWRkRmlzaFBvb2wsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmFkZEZpc2hUaWRlLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5wbGF5U2hvb3RCdWxsZXQsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXNobmV0RWZmZWN0LHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5vbktpbGxGaXNoLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5vbkZyZWV6ZVN0YXJ0U3RvcCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5sZWF2ZVJvb21VbkxvY2ssdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LnNlYVdhdmVGaXNoR3JvdXAsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmZpc2hDYW5jZWxTaG9vdCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuZGlzcG9zZUZpc2hOb2RlLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5pbml0QnVsbGV0TGlzdCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQub25Tc2hvY2ssdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LnBsYXlMb2NrU3BpbmUsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50Lm9uU3BlY2lhbEJ1bGxldEV4cCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQub25TcGVjaWFsQm9tYix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuY2hhbmdlQ2FudGFpbmVyLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5sb2NrU2VsZkZpc2gsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmNoZWNrQmdNdXNpYyx0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvL+eUn+aIkOa4lOe9kVxyXG4gICAgcGxheUZpc2huZXRFZmZlY3RIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgbGV0IGJ1bGxldEVmZmVjdCAgPSBudWxsO1xyXG4gICAgICAgIGlmKHJlcy5ndW5MZXZlbCA+PSAxICYmIHJlcy5ndW5MZXZlbCA8PSAzKXtcclxuICAgICAgICAgICAgYnVsbGV0RWZmZWN0ID0gXCJidWxsZXRFZmZlY3QxXzNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzLmd1bkxldmVsID49IDQgJiYgcmVzLmd1bkxldmVsIDw9IDYpe1xyXG4gICAgICAgICAgICBidWxsZXRFZmZlY3QgPSBcImJ1bGxldEVmZmVjdDRfNlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMuZ3VuTGV2ZWwgPj0gNyAmJiByZXMuZ3VuTGV2ZWwgPD0gOSl7XHJcbiAgICAgICAgICAgIGJ1bGxldEVmZmVjdCA9IFwiYnVsbGV0RWZmZWN0N185XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJlcy5ndW5MZXZlbCA9PSAxMCl7XHJcbiAgICAgICAgICAgIGJ1bGxldEVmZmVjdCA9IFwiYnVsbGV0RWZmZWN0MTBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKXtcclxuICAgICAgICAgICAgYnVsbGV0RWZmZWN0ID0gXCJidWxsZXRFZmZlY3RNaXNzaWxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBidWxsZXROb2RlICAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYnVsbGV0RWZmZWN0KTtcclxuICAgICAgICBpZighYnVsbGV0Tm9kZSl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+5pegIOeUn+aIkOa4lOe9kVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5qC55o2u6L+Z5Lik5Liq5Y+C5pWwIOWunuS+i+WMluebuOWvueS6jiDlrZDlvLnnibnmlYhcclxuICAgICAgICBsZXQgZmlzaE5ldCAgICAgID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgZmlzaE5ldC5wYXJlbnQgICA9IG51bGw7XHJcbiAgICAgICAgZmlzaE5ldC5wb3NpdGlvbiA9IHJlcy5wb3NpdGlvbjtcclxuICAgICAgICBmaXNoTmV0LmFjdGl2ZSAgID0gdHJ1ZTtcclxuICAgICAgICBmaXNoTmV0LnpJbmRleCAgID0gcmVzLnpJbmRleDtcclxuICAgICAgICBjb25zdCBtYXhTY2FsZVNldD0gMS41O1xyXG4gICAgICAgIGxldCBtICAgICAgICAgICAgPSB0aGlzLmxvZ2ljLmdldFJhbmRvbU51bSgwLjYsMSk7XHJcbiAgICAgICAgaWYocmVzLmd1bkxldmVsID09IDkpe1xyXG4gICAgICAgICAgICBtICAgICAgICAgICAgPSB0aGlzLmxvZ2ljLmdldFJhbmRvbU51bSgwLjUsMC43KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzLmd1bkxldmVsID09IDEwKXtcclxuICAgICAgICAgICAgbSAgICAgICAgICAgID0gdGhpcy5sb2dpYy5nZXRSYW5kb21OdW0oMC41LDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpe1xyXG4gICAgICAgICAgICBtID0gbWF4U2NhbGVTZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpc2hOZXQuc2V0U2NhbGUobSk7XHJcbiAgICAgICAgZmlzaE5ldC5hbmdsZSA9IHRoaXMubG9naWMuZ2V0UmFuZG9tTnVtKDAsMzYwKTtcclxuICAgICAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbC5hZGRDaGlsZChmaXNoTmV0KTtcclxuICAgICAgICBmaXNoTmV0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT0gQ09OU1QuU3BpbmVOYW1lLkF0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgZmlzaE5ldC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmaXNoTmV0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsQ09OU1QuU3BpbmVOYW1lLkF0dGFjayxmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7sg6bG85rGgXHJcbiAgICBvbkZpcmVIb29IYW5kbGVyKGV2dCl7XHJcbiAgICAgICAgaWYoZXZ0ICE9IG51bGwgJiYgZXZ0LnR5cGUgPT0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzRmlyZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlyZSAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaENhbmNlbFNob290LGV2dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSAtMTAwMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyVG91Y2hFdmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaENhbmNlbFNob290LGV2dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v54K55Ye7IOmxvOaxoFxyXG4gICAgb25DbGlja0hhbmRsZXIoZXZ0KXtcclxuICAgICAgICBpZihldnQgIT0gbnVsbCAmJiBldnQudHlwZSA9PSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrKSB7Ly/plIHlrprpsbwg6YC76L6R6YeN5YaZXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gZXZ0LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gdGhpcy51aV9waHlzaWNhbFBvb2wuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGl0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXROb2RlLmdldENvbXBvbmVudChcIm5maXNoX2hpdE5vZGVcIikuc2V0Q2xpY2soZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNsaWNrRmlzaFBvb2wsZXZ0LmdldExvY2F0aW9uKCkueSA+IENPTlNULlNob290QnV0dG9tTWluID8gZXZ0IDogbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyVG91Y2hFdmVudCA9IGV2dDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSAtMTAwMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyVG91Y2hFdmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5qOA5rWL5bCE5Ye7XHJcbiAgICBjaGVja1Nob290KGR0KXtcclxuICAgICAgICBjb25zdCBTaG90SW50ZXJ2YWwgPSAwLjI7XHJcbiAgICAgICAgY29uc3QgU2hvdEludGVydmFsVGltZSA9IC0xMDAwO1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMuaXNBdXRvKXtcclxuICAgICAgICAgICAgLy/lpoLmnpzkvb/nlKjkuobplIHlrprmioDog73vvIzpgqPkuYjlv4XpobvmnInplIHlrprlr7nosaFcclxuICAgICAgICAgICAgaWYoIXRoaXMubG9naWMuaXNMb2NrIHx8ICh0aGlzLmxvZ2ljLmlzTG9jayAmJiB0aGlzLmxvZ2ljLmxvY2tGaXNoSUQgIT0gdW5kZWZpbmVkKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9TaG9vdFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9TaG9vdFRpbWUgPiBTaG90SW50ZXJ2YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1Nob290VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGlja0Zpc2hQb29sLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5jdXJyVG91Y2hFdmVudCAhPSBudWxsKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyVG91Y2hFdmVudC50eXBlID09IGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJUb3VjaEV2ZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gU2hvdEludGVydmFsVGltZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJUb3VjaEV2ZW50LnR5cGUgPT0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNob290VGltZSA+IFNob3RJbnRlcnZhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmN1cnJUb3VjaEV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGlja0Zpc2hQb29sLHBvcy55ID4gQ09OU1QuU2hvb3RCdXR0b21NaW4gPyB0aGlzLmN1cnJUb3VjaEV2ZW50IDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mnI3liqHlmajlub/mkq3lj5HlsITlrZDlvLlcclxuICAgIHBsYXlTaG9vdEJ1bGxldEhhbmRsZXIocmVzKXtcclxuICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXMuY2Fubm9uVHlwZSA9IENPTlNULkNhbm5vblR5cGUuTm9ybWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxheWVySW5mbyA9IHRoaXMubG9naWMucGxheWVySW5mb1tOdW1iZXIocmVzLnVpZCldO1xyXG4gICAgICAgIGlmKHJlcy5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsICYmIHBsYXllckluZm8uY2Fubm9uVHlwZSAhPSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPT09PeacjeWKoeWZqCBvblNob290IOaVsOaNruacieivryBcIixyZXMsXCIgIGluZm8gXCIscGxheWVySW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJlcy5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsICYmIHBsYXllckluZm8uY2Fubm9uVHlwZSAhPSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPj7mnI3liqHlmajlub/mkq3lj5HlsITlrZDlvLkgIOaVsOaNruacieivryDnuqDmraPmlbDmja4gXCIrcmVzLnNlYXROdW0pXHJcbiAgICAgICAgICAgIHRoaXMubG9naWMucGxheWVySW5mb1tOdW1iZXIocmVzLnVpZCldLmNhbm5vblR5cGUgPSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbDtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW051bWJlcihyZXMudWlkKV0uY2Fubm9uQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jaGVja1NwZWNpYWxDYW5ub24sdHJ1ZSk7Ly/mo4Dmn6Xngq7lj7BcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTnVtYmVyKHJlcy5zZWF0TnVtKSA9PSBOdW1iZXIodGhpcy5sb2dpYy5zZWF0TnVtKSl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwi5pyN5Yqh5Zmo5bm/5pKtIOWPkeWwhOWtkOW8uSDov4fmu6Toh6rlt7HnmoTvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgTW92aW5nID0gMTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljW1wiaXNHdW5Nb3ZpbmdcIityZXMuc2VhdE51bV0gPT0gTW92aW5nKXtcclxuICAgICAgICAgICAgY2MubG9nKFwiPuato+WcqOabtOaNoueCruWPsCDmkq3mlL7nibnmlYgg5peg5rOV5Y+R5bCE5a2Q5by5IVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJlcy5haW1GaXNoSWQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBmaXNoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIityZXMuYWltRmlzaElkKTtcclxuICAgICAgICAgICAgaWYoZmlzaCAhPSBudWxsKXsvL+espuWQiOimgeaxgueahOmxvOaJjeWPr+S7pemUgeWumu+8jOWQpuWImeino+mUgVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRDbGlja0FyZWEoZmlzaC5wb3NpdGlvbixmaXNoLndpZHRoLGZpc2guaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmxvY2sgPSBOdW1iZXIocmVzLmFpbUZpc2hJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmFuZ2xlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5sb2NrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuYW5nbGUgPT0gdW5kZWZpbmVkKXsvL+ino+mUgeaXtueahOinkuW6puWPr+iDveS4uuepulxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxhc3RBbmdsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuYW5nbGUgPSB0aGlzLmxhc3RBbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuYW5nbGUgPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3Jlcy5zZWF0TnVtKS5hbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIj4+IOacjeWKoeWZqOW5v+aSreWPkeWwhOWtkOW8uSA6ICDplIHlrprlpLHotKUgIGZpc2hJRCBcIityZXMuYWltRmlzaElkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0R3VuQW5nbGVIYW5kbGVyKHJlcyk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlR3VuUmVjb2lsLHJlcyk7XHJcbiAgICAgICAgICAgIC8vIGNjLndhcm4oXCI+PiDlub/mkq0g5bCE5Ye7IOabtOaWsOWFtuS7lueUqOaIt+eahOmSsSA1XCIpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlU2hvb3RHb2xkLHJlcyk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkanVzdEd1bkFuZ2xlSGFuZGxlcihyZXMpO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZUd1blJlY29pbCxyZXMpO1xyXG4gICAgICAgICAgICAvLyBjYy53YXJuKFwiPj4g5bm/5pKtIOWwhOWHuyDmm7TmlrDlhbbku5bnlKjmiLfnmoTpkrEgNVwiKVxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZVNob290R29sZCxyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aWree6v+mHjei/niDlj5HlsITlrZDlvLlcclxuICAgIGluaXRCdWxsZXRMaXN0SGFuZGxlcihyZXMpe1xyXG4gICAgICAgIHRoaXMuYWRqdXN0R3VuQW5nbGVIYW5kbGVyKHJlcyx0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvL+WPkeWwhOWtkOW8uSAtPiDngq7lj7Ag6L2s5ZCR77yM5Z2Q5qCH77yM5L2N572uICBvZmZMaW5lIOaYr+WQpuaYr+aWree6v+mHjei/nlxyXG4gICAgYWRqdXN0R3VuQW5nbGVIYW5kbGVyKHJlcyxvZmZMaW5lID0gZmFsc2Upe1xyXG4gICAgICAgIGxldCBteWlkID0gZ2xHYW1lLnVzZXIudXNlcklEO1xyXG4gICAgICAgIGlmKHJlcy51aWQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPj7ml6Dms5Xnoa7lrpog5a2Q5by5IOi6q+S7vSByZXNcIixyZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc01lID0gTnVtYmVyKHJlcy51aWQpID09IG15aWQ7XHJcbiAgICAgICAgaWYoaXNNZSAmJiAhb2ZmTGluZSl7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoTnVtYmVyKHRoaXMubG9naWMuY2Fubm9uTGV2ZWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJhdHRhY2sxXzNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJhdHRhY2s0XzZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJhdHRhY2s3XzlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiYXR0YWNrMTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ly/mma7pgJrmlLvlh7tcclxuICAgICAgICBsZXQgdWlfZ3VuICAgICAgICA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIrcmVzLnNlYXROdW0pO1xyXG4gICAgICAgIGlmKHVpX2d1biA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4+PiDmib7kuI3liLDngq7lj7AgXCIscmVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvbGRBbmdsZSAgICAgID0gTnVtYmVyKHVpX2d1bi5hbmdsZSArIFwiXCIpO1xyXG4gICAgICAgIGlmKHJlcy5hbmdsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB1aV9ndW4uYW5nbGUgICAgICA9IHJlcy5hbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpcmUgICAgICAgICAgPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJwb2ludF9idWxsZXRcIityZXMuc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IHdvcmxkUG9pbnQgICAgPSBmaXJlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihmaXJlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgbG9jYWxQb2ludCAgICA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9pbnQpO1xyXG4gICAgICAgIGlmKHJlcy5ndW5UeXBlID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXMuZ3VuVHlwZSA9PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMubG9jayAhPSB1bmRlZmluZWQgJiYgcmVzLmFuZ2xlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJlcy5hbmdsZSA9IHRoaXMuZ2V0VGFyZ2V0RmlzaEFuZ2xlKHJlcy5sb2NrLHJlcy5zZWF0TnVtKTtcclxuICAgICAgICAgICAgaWYocmVzLmFuZ2xlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IodGhpcy5sb2dpYy5sb2NrRmlzaElEK1wiICA+Pj4gZmlzaCAgZmlzaE5vZGVMaXN0IFwiLHRoaXMuZmlzaE5vZGVMaXN0LFwiIGZpc2hQb29sRGF0YSBcIix0aGlzLmxvZ2ljLmZpc2hQb29sRGF0YSlcclxuICAgICAgICAgICAgICAgIHJlcy5sb2NrID0gbnVsbDsvL+ino+mUgVxyXG4gICAgICAgICAgICAgICAgaWYoaXNNZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sb2NrRmlzaElEID0gbnVsbDsvL+aJvuS4jeWIsOmxvOino+mUgVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj4+55So5oi36Ieq5bexIOWPkeWwhOWtkOW8uSDmib7kuI3liLDpsbwgXCIrcmVzLmxvY2spXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIj4+PuWFtuS7luS6uiDlj5HlsITlrZDlvLkg5om+5LiN5Yiw6bG8IFwiK3Jlcy5sb2NrKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5wbGFjZU9mQmlydGggID0gY2MudjIobG9jYWxQb2ludC54LGxvY2FsUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IHRwbUFuZ2xlO1xyXG4gICAgICAgIGlmKHJlcy5zZWF0TnVtID09IENPTlNULlNlYXQuTGVmdFRvcCB8fCByZXMuc2VhdE51bSA9PSBDT05TVC5TZWF0LlJpZ2h0VG9wKXtcclxuICAgICAgICAgICAgdHBtQW5nbGUgPSByZXMuYW5nbGU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRwbUFuZ2xlID0gLXJlcy5hbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgTm9ybWFsQW5nZWwgPSAxODA7XHJcbiAgICAgICAgcmVzLnBsYWNlT2ZCaXJ0aC54ICs9IE1hdGguc2luKHRwbUFuZ2xlIC8gTm9ybWFsQW5nZWwgKiBNYXRoLlBJKTtcclxuICAgICAgICByZXMucGxhY2VPZkJpcnRoLnkgKz0gTWF0aC5jb3ModHBtQW5nbGUgLyBOb3JtYWxBbmdlbCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGlmKHJlcy5hbmdsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB1aV9ndW4uYW5nbGUgICAgICA9IHJlcy5hbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzLmJ1bGxldElkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJlcy5idWxsZXRJZCA9IE51bWJlcih0aGlzLmxvZ2ljLnNlYXROdW0rRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwbGF5ZXJJbmZvO1xyXG4gICAgICAgIGxldCBjdXJyZW50VWlkO1xyXG4gICAgICAgIGlmIChpc01lKXtcclxuICAgICAgICAgICAgY3VycmVudFVpZCA9IE51bWJlcihnbEdhbWUudXNlci51c2VySUQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJJbmZvID0gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW2N1cnJlbnRVaWRdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjdXJyZW50VWlkID0gTnVtYmVyKHJlcy51aWQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJJbmZvID0gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW2N1cnJlbnRVaWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNIYXZlTGFzZXIgICAgICAgPSBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsICYmIHBsYXllckluZm8uY2Fubm9uQW1vdW50ID4gMCAmJiBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MYXNlcjsgICAgICAvLyDpvpnmga9cclxuICAgICAgICBsZXQgaXNIYXZlTWlzc2lsZSAgICAgPSBwbGF5ZXJJbmZvLmhpdE1heCAhPSBudWxsICAgICAgICYmIHBsYXllckluZm8uY2Fubm9uQW1vdW50ID4gMCAmJiBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlOyAgICAvLyDku5nliZFcclxuICAgICAgICBsZXQgaXNIYXZlUGFydGlhbEJvbWIgPSBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsICYmIHBsYXllckluZm8uY2Fubm9uQW1vdW50ID4gMCAmJiBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYjsvLyDngo7niIZcclxuICAgICAgICBsZXQgaXNIYXZlTGlnaHRuaW5nICAgPSBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsICYmIHBsYXllckluZm8uY2Fubm9uQW1vdW50ID4gMCAmJiBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmc7ICAvLyDpl6rnlLVcclxuICAgICAgICBpZiAoIWlzTWUgfHwgb2ZmTGluZSl7Ly/lhbbku5bnjqnlrrYg5oiW6ICF5pat57q/6YeN6L+e55qE5pe25YCZXHJcbiAgICAgICAgICAgIGlzSGF2ZUxhc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlzSGF2ZU1pc3NpbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaXNIYXZlUGFydGlhbEJvbWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgaXNIYXZlTGlnaHRuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVzLmNhbm5vblR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MYXNlciA6XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZlTGFzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUgOlxyXG4gICAgICAgICAgICAgICAgICAgIGlzSGF2ZU1pc3NpbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLlBhcnRpYWxCb21iIDpcclxuICAgICAgICAgICAgICAgICAgICBpc0hhdmVQYXJ0aWFsQm9tYiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTGlnaHRuaW5nIDpcclxuICAgICAgICAgICAgICAgICAgICBpc0hhdmVMaWdodG5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9naWNbXCJsYXN0QnVsbHRlVHlwZVwiK3Jlcy5zZWF0TnVtXSA9IHJlcy5jYW5ub25UeXBlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpY1tcImxhc3RCdWxsdGVUeXBlXCIrcmVzLnNlYXROdW1dID0gcGxheWVySW5mby5jYW5ub25UeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMuaXNIYXZlTWlzc2lsZSAgICAgPSBmYWxzZTtcclxuICAgICAgICByZXMuaXNIYXZlUGFydGlhbEJvbWIgPSBmYWxzZTtcclxuICAgICAgICByZXMuaXNIYXZlTGlnaHRuaW5nICAgPSBmYWxzZTtcclxuICAgICAgICBpZighb2ZmTGluZSl7XHJcbiAgICAgICAgICAgIHJlcy5jYW5ub25UeXBlICAgID0gIENPTlNULkNhbm5vblR5cGUuTm9ybWFsOy8v5YWI57uZ5LiA5Liq5pmu6YCa55qE5qCH562+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9mZkxpbmUgJiYgcmVzLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKXsvL+S7meWJkeaWree6v+mHjei/nueJueauiuWkhOeQhlxyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4+IOS7meWJkeaWree6v+mHjei/nueJueauiuWkhOeQhiA9PT09PT09PT0gXCIscmVzKVxyXG4gICAgICAgICAgICBpc0hhdmVNaXNzaWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpY1tcImxhc3RCdWxsdGVUeXBlXCIrcmVzLnNlYXROdW1dID0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlO1xyXG4gICAgICAgICAgICBpZihpc01lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuY3VycmVudEJ1bGx0ZVR5cGUgPSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGU7Ly/liLfmlrDpmZDliLZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3AgICAgICAgID0gQ09OU1QuQ2Fubm9uT3BlbnRpb24uTm9ybWFsO1xyXG4gICAgICAgIGxldCBkYXRhQW5nbGUgPSByZXMuYW5nbGUgPyByZXMuYW5nbGUgOiB1aV9ndW4uYW5nbGU7XHJcbiAgICAgICAgaWYoZGF0YUFuZ2xlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGRhdGFBbmdsZSA9IG9sZEFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0+5Yik5pat5piv5ZCm5pyJIOeJueauiueCruW8uSDlpoLmnpzmnInlsLHkvJjlhYjlj5HlsIQg54m55q6K54Ku5by5XHJcbiAgICAgICAgaWYocGxheWVySW5mbyAhPSBudWxsKXsvL+aJvuS4jeWIsOeUqOaIt+S/oeaBryDlsLHml6Dms5Xlj5HlsITlrZDlvLlcclxuICAgICAgICAgICAgaWYoaXNIYXZlTGFzZXIpey8v6b6Z5rqq54Ku5by5IOWPkeWwhOmAu+i+kVxyXG4gICAgICAgICAgICAgICAgaWYoaXNNZSAmJiBvZmZMaW5lKXsvL+WmguaenOaYr+aIkeiHquW3se+8jOWmguaenOaYr+aWree6v+mHjei/nlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj7mlq3nur/ph43ov54g5LiN5Y+R5bCEIOm+mea6qiBcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpc01lICYmIHRoaXMubG9naWMuY3VycmVudEJ1bGx0ZVR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj7pnZ7ms5Xlj5HlsITpvpnmuqrlrZDlvLlcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpc01lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID0gcGxheWVySW5mby5jYW5ub25UeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNGaXJlTGFzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBDRCA9IENPTlNULk1heGltdW1CdWxsZXRDb2xsaXNpb25UaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckluZm8uY2Fubm9uQW1vdW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDRCs9MC40O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WPkeWHuuWOu+eahOWtkOW8ueS4jeS4gOWumuiDveaciemxvOeisOaSnu+8jOmcgOimgeaJi+WKqOaBouWkjVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNGaXJlTGFzZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSAhPSBDT05TVC5DYW5ub25UeXBlLk5vdCAmJiB0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID09IENPTlNULkNhbm5vblR5cGUuTGFzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSA9IENPTlNULkNhbm5vblR5cGUuTm90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI9PT09PT09PSBkZWxldGUgPT09PT09PT09IOeCruW8uSB1aWQgXCIrTnVtYmVyKHJlcy5zZWF0TnVtKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2xlYXJTcGVjaWFsQnVsbGV0UG9vbCxyZXMuc2VhdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LENEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuc3BlY2lhbEJ1bGxldFBvb2xbcmVzLnNlYXROdW1dID0gcmVzLmNhbm5vblR5cGU7Ly/moLnmja7op4TliJnvvJrmr4/kuKrnjqnlrrblkIzlsY/kuIvlj6rlhYHorrjmnInkuIDkuKrnibnmrorlrZDlvLlcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiTGFzZXJTZW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5vbkxhc2VyRGlzcGF0aCx7c2VhdE51bTpyZXMuc2VhdE51bSxhbmdsZTpkYXRhQW5nbGUsdWlkOmN1cnJlbnRVaWR9KTtcclxuICAgICAgICAgICAgICAgIC8v6b6Z5rqq5LiN5Y+R5bCE5a6e5L2T5a2Q5by577yM5pi+56S65r+A5YWJ5p+x5Y2z5Y+vXHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXJpbmdFZmZlY3Qse3NlYXROdW06cmVzLnNlYXROdW0sZ3VuTGV2ZWw6cmVzLmd1bkxldmVsLGd1blR5cGU6cGxheWVySW5mby5jYW5ub25UeXBlfSk7XHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdENhbW1wbVR5cGUgPSBOdW1iZXIoXCJcIiArIHRoaXMubG9naWMucGxheWVySW5mb1tjdXJyZW50VWlkXS5jYW5ub25UeXBlKTsvL+iusOW9leiAgeeahOeCruWPsOexu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMucGxheWVySW5mb1tjdXJyZW50VWlkXS5jYW5ub25UeXBlID0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5yZXN0b3JlQ2Fubm9uLHt1aWQ6Y3VycmVudFVpZCxpc05vdzp0cnVlLGxhc3RDYW1tcG1UeXBlOmxhc3RDYW1tcG1UeXBlfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwU3BlY2lhbEd1bkNvaW4sIHtzZWF0TnVtOnJlcy5zZWF0TnVtLGNhbm5vbkxldmVsOnBsYXllckluZm8uY2Fubm9uQW1vdW50fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpc01lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmN1cldhaXRUaW1lID0gRGF0ZS5ub3coKTsvL+mHjee9ruaXtumXtFxyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlyZVNldHRpbmdSZWNvaWwse2FuZ2xlOnJlcy5hbmdsZSxndW5UeXBlOnJlcy5ndW5UeXBlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGlzTmVlZFNlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYoaXNIYXZlTWlzc2lsZSl7Ly/ku5nliZEg5Y+R5bCE5YmN6LWL5YC8XHJcbiAgICAgICAgICAgICAgICBpZighb2ZmTGluZSl7Ly/lpoLmnpzmmK/miJHoh6rlt7HvvIzlpoLmnpzmmK/mlq3nur/ph43ov55cclxuICAgICAgICAgICAgICAgICAgICByZXMuY2Fubm9uVHlwZSAgPSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmhpdE1heCAgICAgID0gTnVtYmVyKHBsYXllckluZm8uaGl0TWF4ICsgXCJcIik7Ly8g5LuZ5YmR5pyA5aSn5Ye75Lit6bG85pWw6YePKOaVsOaNruaLt+i0nei1i+WAvClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wICAgICAgICAgPSBDT05TVC5DYW5ub25PcGVudGlvbi5NaXNzaWxlO1xyXG4gICAgICAgICAgICAgICAgaXNOZWVkU2VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNIYXZlTGlnaHRuaW5nKXsvL+mXqueUtSDlj5HlsITliY3otYvlgLxcclxuICAgICAgICAgICAgICAgIGlmKCFvZmZMaW5lKXsvL+WmguaenOaYr+aWree6v+mHjei/nlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5jYW5ub25UeXBlICA9ICBDT05TVC5DYW5ub25UeXBlLkxpZ2h0bmluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzTmVlZFNlbmQgICAgICA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvcCAgICAgICAgICAgICAgPSBDT05TVC5DYW5ub25PcGVudGlvbi5MaWdodG5pbmc7XHJcbiAgICAgICAgICAgICAgICBpZihpc01lKXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImxpZ2h0bmluZ0Rpc3BhdGhcIik7Ly/pl6rnlLXlj5HlsIRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0hhdmVQYXJ0aWFsQm9tYil7Ly/ngo7niIYg5Y+R5bCE5YmN6LWL5YC8XHJcbiAgICAgICAgICAgICAgICBpZighb2ZmTGluZSl7Ly/lpoLmnpzmmK/mlq3nur/ph43ov55cclxuICAgICAgICAgICAgICAgICAgICByZXMuY2Fubm9uVHlwZSAgPSAgQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzTmVlZFNlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3AgICAgICAgICAgICAgID0gQ09OU1QuQ2Fubm9uT3BlbnRpb24uUGFydGlhbEJvbWI7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcIlBhcnRpYWxTZW5kXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzTmVlZFNlbmQpe1xyXG4gICAgICAgICAgICAgICAgLy/nibnmrorngq7lvLkg5pWw6YeP5pu05pawXHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdENhbW1wbVR5cGUgPSBOdW1iZXIoXCJcIiArIHRoaXMubG9naWMucGxheWVySW5mb1tjdXJyZW50VWlkXS5jYW5ub25UeXBlKTsvL+iusOW9leiAgeeahOeCruWPsOexu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMucGxheWVySW5mb1tjdXJyZW50VWlkXS5jYW5ub25UeXBlID0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5yZXN0b3JlQ2Fubm9uLHt1aWQ6Y3VycmVudFVpZCxpc05vdzp0cnVlLGxhc3RDYW1tcG1UeXBlOmxhc3RDYW1tcG1UeXBlfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwU3BlY2lhbEd1bkNvaW4sIHtzZWF0TnVtOnJlcy5zZWF0TnVtLGNhbm5vbkxldmVsOnBsYXllckluZm8uY2Fubm9uQW1vdW50fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/ov5nmmK/kuIDkuKog5a2Q5by5IOWPr+iDveaYryDmma7pgJrnmoQg5Y+v6IO95pivIOeJueauiuWtkOW8ueeahOS4ieS4quS5i+S4gFxyXG4gICAgICAgICAgICBsZXQgYnVsbGV0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmJ1bGxldFBvb2wuc2l6ZSgpID4gMCl7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSB0aGlzLmxvZ2ljLmJ1bGxldFBvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5maXNoX0J1bGxldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVsbGV0Lm5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gYnVsbGV0LmdldENvbXBvbmVudChcIm5maXNoX0J1bGxldFwiKTtcclxuICAgICAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICAgICAgaWYoaXNIYXZlTWlzc2lsZSB8fCBpc0hhdmVQYXJ0aWFsQm9tYiB8fCBpc0hhdmVMaWdodG5pbmcpIHsvL+iHquW3seeahCDnibnmrorlrZDorqHmlbBcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuc3BlY2lhbEJ1bGxldFBvb2xbcmVzLnNlYXROdW1dID0gcmVzLmNhbm5vblR5cGU7Ly/moLnmja7op4TliJnvvJrmr4/kuKrnjqnlrrblkIzlsY/kuIvlj6rlhYHorrjmnInkuIDkuKrnibnmrorlrZDlvLlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc01lKXtcclxuICAgICAgICAgICAgICAgIHJlcy51aWQgPSBnbEdhbWUudXNlci51c2VySUQ7XHJcbiAgICAgICAgICAgICAgICBpZihpc0hhdmVNaXNzaWxlIHx8IGlzSGF2ZVBhcnRpYWxCb21iIHx8IGlzSGF2ZUxpZ2h0bmluZyl7Ly/oh6rlt7HnmoQg54m55q6K5a2Q6K6h5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSA9IHJlcy5jYW5ub25UeXBlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7Ly/oh6rlt7HnmoQg5pmu6YCa5a2Q5by56K6h5pWwXHJcbiAgICAgICAgICAgICAgICAgICBpZighb2ZmTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuYnVsbHRlTnVtICsrO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuY3VycmVudEJ1bGx0ZVR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYiB8fCB0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID09IENPTlNULkNhbm5vblR5cGUuTGlnaHRuaW5nKXsvL+WumuaXtiDop6PplIHlj5HlsITplIHlrpog54KO54iGIOOAgemXqueUtVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFJlVGltZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSA9IENPTlNULkNhbm5vblR5cGUuTm90O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sUmVUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXJpbmdFZmZlY3Qse3NlYXROdW06cmVzLnNlYXROdW0sZ3VuTGV2ZWw6cmVzLmd1bkxldmVsLGd1blR5cGU6cmVzLmNhbm5vblR5cGV9KTsvL+W8gOeCruaViOaenFxyXG4gICAgICAgICAgICBzY3JpcHQuaW5pdEJ1bGxldEF0bGFzKGlzSGF2ZU1pc3NpbGUgPyB0aGlzLm1pc3NpbEJ1bGxldF9BdGxhcyA6IHRoaXMuYnVsbGV0X0F0bGFzKTsvL+WIneWni+WMluWtkOW8ueWbvueJh+i1hOa6kFxyXG5cclxuICAgICAgICAgICAgaWYoaXNNZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmN1cldhaXRUaW1lID0gRGF0ZS5ub3coKTsvL+mHjee9ruaXtumXtFxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXJlU2V0dGluZ1JlY29pbCx7YW5nbGU6cmVzLmFuZ2xlLGd1blR5cGU6cmVzLmd1blR5cGV9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NyaXB0LmluaXRCdWxsZXQocmVzKTsvL+WtkOW8ueW8gOWni+i/kOWKqFxyXG4gICAgICAgICAgICBpZihidWxsZXQubG9jayAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja0J1bGxldExpc3QucHVzaChidWxsZXQpOy8v6L6F5YqpIOino+mUgSDlrZjlgqhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc01lICYmICFvZmZMaW5lKXsvL+WPqueuoeiHquW3seeahOato+W4uOWtkOW8ueWPkeWwhOWPkemAgeWNj+iuriDvvIzml6DmnYPmm7/liKvkurrnmoTlrZDlvLnlj5Hlj5HpgIHlj5HlsITljY/orq4g6LWw5pat6L+e5Y2P6K6u55qE5a2Q5by55LiN5YaN5Y+RIOWPkeWwhOWNj+iurlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5oaWRkZW5Mb2NhdGlvblRpcCk7XHJcbiAgICAgICAgICAgICAgICAvL+WPkemAgSDlsITlh7tcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwib3BcIjpvcCxcclxuICAgICAgICAgICAgICAgICAgICBcImFuZ2xlXCI6IGRhdGFBbmdsZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmKG9wID09IENPTlNULkNhbm5vbk9wZW50aW9uLk5vcm1hbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtcInNoZWxsSWRcIl0gPSByZXMuYnVsbGV0SWQ7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCI+PuWPkeWwhOeJueauiuWtkOW8uSDlj5HlsITljY/orq4gOlwiLGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihyZXMubG9jayAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW1wiZmlzaElkXCJdID0gcmVzLmxvY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmlzRW50ZXJSb29tKXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhnbEdhbWUucm9vbS5nZXRQbGF5ZXJPcChnbEdhbWUuc2NlbmV0YWcuRklTSDIpLGRhdGEpOy8v5piv6Ieq5bex5bCx5Y+R6YCBIOWwhOWHu1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W54Ku55qE5pyd5ZCR77ya54Ku5Y+j5Yiw55uu5qCH6bG855qE6KeS5bqmXHJcbiAgICBnZXRUYXJnZXRGaXNoQW5nbGUoa2V5LHNlYXROdW0pe1xyXG4gICAgICAgIGxldCBmaXNoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIitrZXkpO1xyXG4gICAgICAgIGlmKGZpc2gpe1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3NlYXROdW0pLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2dpYy5nZXRQMVRvUDJBbmdsZShzdGFydFBvcyxmaXNoLnBvc2l0aW9uKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6bG855qE5q275LqhXHJcbiAgICBvbktpbGxGaXNoSGFuZGxlcihyZXMpe1xyXG4gICAgICAgIGNvbnN0IE5vdCA9IC0xOy8v5peg5Lq65bqn5L2NXHJcbiAgICAgICAgbGV0IGZpc2ggPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK3Jlcy5maXNoSWQpO1xyXG4gICAgICAgIC8v6ZSA5q+B6ZSB5a6a55qE6bG8XHJcbiAgICAgICAgaWYoZmlzaCAhPSBudWxsKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5sb2NrRmlzaElEICE9IG51bGwgJiYgTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJRCkgPT0gTnVtYmVyKGZpc2gubmFtZSkpe1xyXG4gICAgICAgICAgICAgICAgLy9jYy5lcnJvcihcIj4+IOino+mUgSAxIFwiK3RoaXMubG9naWMubG9ja0Zpc2hJRClcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMubGFzdExvY2tGaXNoSUQgPSBOdW1iZXIodGhpcy5sb2dpYy5sb2NrRmlzaElEK1wiXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sb2NrRmlzaElEID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMubG9ja0Zpc2hJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmlzTG9ja0F1dG9DaGFuZ2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNBdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51c2VBdXRvU2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZpc2ggJiYgZmlzaC5fY29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgZmlzaC5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2ljLmxvY2tGaXNoSUQgIT0gbnVsbCAmJiBOdW1iZXIodGhpcy5sb2dpYy5sb2NrRmlzaElEKSA9PSBOdW1iZXIocmVzLmZpc2hJZCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudWlfTG9ja0NhbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcInVpX0xvY2tcIiArIHRoaXMubG9naWMuc2VhdE51bSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHJlcy5maXNoVHlwZUlkICE9IG51bGwgJiYgcmVzLmZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc0dvZE9mV2VhbHRoKXsvL+i0ouelnuatu+S6oeaWueW8j+aYr+W/q+mAn+enu+WKqOWHuuWxj+WkllxyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpLnF1aWNrRGllKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8v6Kej6ZSBXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2dpYy5sb2NrRmlzaElEICE9IG51bGwgJiYgTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJRCkgPT0gTnVtYmVyKHJlcy5maXNoSWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sYXN0TG9ja0Zpc2hJRCA9IE51bWJlcih0aGlzLmxvZ2ljLmxvY2tGaXNoSUQrXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sb2NrRmlzaElEID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmxvY2tGaXNoSW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZGlzcG9zZUZpc2hOb2RlLHJlcy5maXNoSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrQXV0b0NoYW5nZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNBdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudWlfTG9ja0NhbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcInVpX0xvY2tcIiArIHRoaXMubG9naWMuc2VhdE51bSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSByZXMua2lsbFR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcgPyBDT05TVC5kaWVUeXBlMyA6IENPTlNULmRpZVR5cGUxO1xyXG4gICAgICAgICAgICAgICAgZmlzaC5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpLmRlYXRoKHR5cGUscmVzLnNlYXROdW0gPyByZXMuc2VhdE51bSA6IE5vdCxyZXMuZGVsYXlEaWVUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5kaXNwb3NlRmlzaE5vZGUscmVzLmZpc2hJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIumxvOeahOatu+S6oT4+5om+5LiN5Yiw6bG8XCIscmVzLFwiICBmaXNoTm9kZUxpc3QgXCIsdGhpcy5maXNoTm9kZUxpc3QsXCIgZmlzaFBvb2xEYXRhIFwiLHRoaXMubG9naWMuZmlzaFBvb2xEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mo4Dmn6Xog4zmma/pn7PkuZDmkq3mlL5cclxuICAgIGNoZWNrQmdNdXNpY0hhbmRsZXIoKXtcclxuICAgICAgICBsZXQgY3VyckJnTXVzaWNJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGZpc2hJZCBpbiB0aGlzLmZpc2hOb2RlTGlzdCl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maXNoTm9kZUxpc3RbZmlzaElkXTtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK2Zpc2hJZCk7XHJcbiAgICAgICAgICAgIGlmKGZpc2ggIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlzaFR5cGVJZCA9IE51bWJlcihpdGVtLmZpc2hUeXBlSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZmlzaFR5cGVJZCA9PSBDT05TVC5Cb3NzTGF2YUJhc2FsdCl7Ly/ku43mnIkg54aU5bKp546E5q2mXHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckJnTXVzaWNJbmRleCA9IENPTlNULkJvc3NMYXZhQmFzYWx0QmdNdXNpYztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc1NZTFcpey8v5LuN5pyJIOa3sea4ium+meeOi1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJCZ011c2ljSW5kZXggPSBDT05TVC5Cb3NzU1lMV0JnTXVzaWM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihmaXNoVHlwZUlkID09IENPTlNULkJvc3NHb2RPZldlYWx0aCAmJiBmaXNoLl9jb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiBmaXNoLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikgIT0gdW5kZWZpbmVkICYmIGZpc2guZ2V0Q29tcG9uZW50KFwibmZpc2hfVW5pdFwiKS5pc1dlbGxEaWUoKSl7Ly/ku43mnIkg6LSi56WeXHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckJnTXVzaWNJbmRleCA9IENPTlNULkJvc3NHb2RPZldlYWx0aEJnTXVzaWM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChjdXJyQmdNdXNpY0luZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgLTEgOlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoQmdTb3VuZCk7Ly/mkq3mlL4g5pil5aSP56eL5YasXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05TVC5Cb3NzTGF2YUJhc2FsdEJnTXVzaWMgOlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoQmdTb3VuZCxDT05TVC5Cb3NzTGF2YUJhc2FsdEJnTXVzaWMpOy8v5pKt5pS+IOeGlOWyqeeOhOatpiDog4zmma/lo7Dpn7NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTlNULkJvc3NTWUxXQmdNdXNpYyA6XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hCZ1NvdW5kLENPTlNULkJvc3NTWUxXQmdNdXNpYyk7Ly/mkq3mlL4g5rex5riK6b6Z546LIOiDjOaZr+WjsOmfs1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ09OU1QuQm9zc0dvZE9mV2VhbHRoQmdNdXNpYyA6XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hCZ1NvdW5kLENPTlNULkJvc3NHb2RPZldlYWx0aEJnTXVzaWMpOy8v5pKt5pS+IOi0ouelniDog4zmma/lo7Dpn7NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WKoOmxvFxyXG4gICAgYWRkRmlzaFBvb2xIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5xdWlja01vdmUpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIuWKoOmxvOWksei0pe+8jOato+WcqOWIneWni+WMlumxvOa9rlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdEZpc2hEYXRhKHJlcyk7XHJcbiAgICB9LFxyXG4gICAgLy/liqDpsbzmva5cclxuICAgIGFkZEZpc2hUaWRlSGFuZGxlcihyZXMpe1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMucXVpY2tNb3ZlKXtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCLliqDpsbzmva7lpLHotKXvvIzpsbzmva7lpITnkIbkuK1cIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZCBpbiByZXMpIHtcclxuICAgICAgICAgICAgdG1wQXJyYXkucHVzaChyZXNbaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IE51bWJlcih0bXBBcnJheS5sZW5ndGgrXCJcIikgLSAxO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8MTA7aisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRtcEFycmF5W2ldICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZpc2hEYXRhKHRtcEFycmF5W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDAuMDEsbGVuKTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5riU5Zy6XHJcbiAgICBpbml0RmlzaFBvb2xIYW5kbGVyKCl7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5xdWlja01vdmUpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIuWIneWni+WMlua4lOWcuiDpgYfliLDpl67popgg77yaIOato+WcqOWIneWni+WMlumxvOa9ru+8jOaXoOazleWIneWni+WMllwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubG9naWMuZmlzaFBvb2xEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoU2V0dmVyRGF0YSA9IHRoaXMubG9naWMuZmlzaFBvb2xEYXRhW2lkXTtcclxuICAgICAgICAgICAgaWYoZmlzaFNldHZlckRhdGEudXNlZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZmlzaFNldHZlckRhdGEudXNlZCA9IE51bWJlcihpZCArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RmlzaERhdGEodGhpcy5sb2dpYy5maXNoUG9vbERhdGFbTnVtYmVyKGlkKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyWIOmxvCDmlbDmja5cclxuICAgIGluaXRGaXNoRGF0YShmaXNoRGF0YSl7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5xdWlja01vdmUpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIuato+WcqOWIneWni+WMlumxvOa9riDnqI3nrYlcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBUb1Njb25kID0gMTAwMDtcclxuICAgICAgICBsZXQgc2VydmVyVGltZSA9IGZpc2hEYXRhLnNlcnZlclRpbWUgPT0gdW5kZWZpbmVkID8gdGhpcy5sb2dpYy5zZXJ2ZXJUaW1lIDogZmlzaERhdGEuc2VydmVyVGltZTtcclxuICAgICAgICBsZXQgdGltZSA9IChzZXJ2ZXJUaW1lIC0gZmlzaERhdGEuY3JlYXRlVGltZSkvVG9TY29uZDsvL+WHuueUn+aXtumXtCDpu5jorqQgMCDmlq3nur/ph43ov54g5Y+v6IO95pivIDLmiJY15oiW5Yir55qEXHJcbiAgICAgICAgbGV0IHJ1blRpbWUgPSBmaXNoRGF0YS5ydW5UaW1lOy8v6bG855qE5oC76L+Q6KGM5pe26Ze0XHJcbiAgICAgICAgaWYodGltZSA8IChmaXNoRGF0YS5zaG93VGltZSArIHJ1blRpbWUpKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaXNoKGZpc2hEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gY2Mud2FybihcIuaXoOazleWHuueUnyBpZCBcIixmaXNoRGF0YS5pZCxcIiDlh7rnlJ/ml7bpl7QgXCIsdGltZSxcIiBzZXJ2ZXJUaW1lIFwiLGZpc2hEYXRhLnNlcnZlclRpbWUsXCIgY3JlYXRlVGltZSBcIixmaXNoRGF0YS5jcmVhdGVUaW1lLFwiIOi/kOihjOaXtumXtCBcIixydW5UaW1lLFwiIOaYvuekuuaXtumXtCBcIixmaXNoRGF0YS5zaG93VGltZSxcImRhdGE6XCIsZmlzaERhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6bG85bel5Y6C77ya5a6e5L6L5YyW5LiA5p2h6bG8XHJcbiAgICBjcmVhdGVGaXNoKGZpc2hEYXRhKXtcclxuICAgICAgICBsZXQgZmlzaE5vZGU7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5maXNoUG9vbC5zaXplKCkgPiAwKXtcclxuICAgICAgICAgICAgZmlzaE5vZGUgPSB0aGlzLmxvZ2ljLmZpc2hQb29sLmdldCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXNoTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmlzaF9Vbml0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlzaE5vZGUubmFtZSAgID0gXCJuZmlzaF9Vbml0XCI7XHJcbiAgICAgICAgZmlzaE5vZGUucGFyZW50ID0gbnVsbDtcclxuICAgICAgICBmaXNoTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZpc2hOb2RlLmlzRmlzaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maXNoTm9kZUxpc3RbTnVtYmVyKGZpc2hEYXRhLmlkICsgXCJcIildID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaXNoRGF0YSkpOy8v5pWw5o2u5ou36LSdXHJcbiAgICAgICAgdGhpcy5maXNoTm9kZUxpc3RMZW5naHQgKys7XHJcbiAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wuYWRkQ2hpbGQoZmlzaE5vZGUpO1xyXG4gICAgICAgIGZpc2hOb2RlLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikuaW5pdEF0bGFzKHRoaXMuZmlzaF9BdGxhTGlzdHMpO1xyXG4gICAgICAgIGZpc2hOb2RlLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikuaW5pdEZpc2goZmlzaERhdGEpO1xyXG4gICAgfSxcclxuICAgIC8v5Yi35paw5Yaw5Ya754q25oCBIOacieWwseWGu+e7kyDmsqHmnInlsLHop6PlhrtcclxuICAgIHVwZGF0ZUljaW5nKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5maXNoTm9kZUxpc3Qpe1xyXG4gICAgICAgICAgICBsZXQgZmlzaCA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwiXCIraWQpO1xyXG4gICAgICAgICAgICBpZihmaXNoKWZpc2guZ2V0Q29tcG9uZW50KFwibmZpc2hfVW5pdFwiKS5zZXR0aW5nSWNpbmcodGhpcy5zdGFydFJ1bkZpc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0YXJ0UnVuRmlzaCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+mUgeWumumxvFxyXG4gICAgbG9ja1NlbGZGaXNoSGFuZGxlcihmaXNoSWQpe1xyXG4gICAgICAgIGxldCBmaXJzdE5vZGUgPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShgJHtmaXNoSWR9YCk7XHJcbiAgICAgICAgaWYoZmlyc3ROb2RlICE9IG51bGwgJiYgZmlyc3ROb2RlLl9jb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiBmaXJzdE5vZGUuZ2V0Q29tcG9uZW50KFwibmZpc2hfVW5pdFwiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgZmlyc3ROb2RlLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikubG9ja1NlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mtarmva7psbznvqTmnaXkuobvvIzliqDpgJ/mrbvkuqFcclxuICAgIHNlYVdhdmVGaXNoR3JvdXBIYW5kbGVyKG1zZyl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5zaG93RmlzaFRpZGVUaXRsZSk7XHJcbiAgICAgICAgY29uc3QgTm90SGF2ZUZpc2ggPSAtMTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcInRpZGVDb21pblwiKTsvL+mxvOa9ruadpeiireS9v+eUqFxyXG4gICAgICAgIGxldCBuZXh0ID0gKCk9PntcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5zZWFXYXZlQ2hhbmdlQmcsdGhpcy5sb2dpYy5iZ0luZGV4KTtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5vblN1cmZTdGFydCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuc3RhcnRGaXJlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGZpc2hMZW50aCA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGZpc2hMZW50aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJOb2RlID0gdGhpcy51aV9waHlzaWNhbFBvb2wuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyTm9kZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaF9Vbml0ID0gY3Vyck5vZGUuZ2V0Q29tcG9uZW50KFwibmZpc2hfVW5pdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaXNoX1VuaXQgIT0gbnVsbCAmJiBmaXNoX1VuaXQuZ2V0RmlzaElEKCkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuYm9zc0lETGlzdC5pbmRleE9mKE51bWJlcihjdXJyTm9kZS5uYW1lKSkgPT0gTm90SGF2ZUZpc2gpLy8vL+mZpOS6hmJvc3PkuI3liKDpmaQg5YW25L2Z6YO95Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudWlfcGh5c2ljYWxQb29sLnJlbW92ZUNoaWxkKGN1cnJOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGN1cnJOb2RlLmlzRmlzaCAhPSBudWxsICYmIHRoaXMubG9naWMuYm9zc0lETGlzdC5pbmRleE9mKE51bWJlcihjdXJyTm9kZS5uYW1lKSkgPT0gTm90SGF2ZUZpc2gpey8vLy/pmaTkuoZib3Nz5LiN5Yig6ZmkIOWFtuS9memDveWIoOmZpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbC5yZW1vdmVDaGlsZChjdXJyTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuYWRkVGlkZShtc2csbXNnLmdyb3VwSWQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnF1aWNrTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmFkZEZpc2hUaWRlLHRoaXMubG9naWMuZmlzaFBvb2xEYXRhKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5oaWRlQm9zc0NvbmluVUkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgTWF4VXNlck51bSA9IDQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXhVc2VyTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHVpX2xvY2sgPSB0aGlzLnVpX0xvY2tDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9Mb2NrXCIgKyBpKTtcclxuICAgICAgICAgICAgdWlfbG9jay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgU2VhV2F2ZVJ1blRpbWUgPSA0LjU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UobmV4dCxTZWFXYXZlUnVuVGltZSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9naWMuc3RhcnRGaXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dpYy5xdWlja01vdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v6Zmk5LqGYm9zc+S4jeWIoOmZpCDlhbbkvZnpg73liKDpmaRcclxuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmZpc2hOb2RlTGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuYm9zc0lETGlzdC5pbmRleE9mKGlkKSA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5maXNoTm9kZUxpc3RbaWRdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXNoTm9kZUxpc3RMZW5naHQgLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dpYy5maXNoUG9vbERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgZmlzaExlbnRoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxmaXNoTGVudGg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IGZpc2hfVW5pdCA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIik7XHJcbiAgICAgICAgICAgIGlmKGZpc2hfVW5pdCAhPSBudWxsICYmIGZpc2hfVW5pdC5nZXRGaXNoSUQoKSAhPSBudWxsICYmIHRoaXMubG9naWMuYm9zc0lETGlzdC5pbmRleE9mKGZpc2hfVW5pdC5nZXRGaXNoSUQoKSkgPT0gTm90SGF2ZUZpc2gpey8vLy/pmaTkuoZib3Nz5LiN5Yig6ZmkIOWFtuS9memDveWIoOmZpFxyXG4gICAgICAgICAgICAgICAgZmlzaF9Vbml0LmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikucXVpY2tEaWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WIoOmZpOS4gOadoemxvCBpZCBOdW1iZXIg57G75Z6LXHJcbiAgICBkaXNwb3NlRmlzaE5vZGVIYW5kbGVyKGlkKXtcclxuICAgICAgICBsZXQgZkRhdGEgPSB0aGlzLmZpc2hOb2RlTGlzdFtOdW1iZXIoaWQpXTtcclxuICAgICAgICBpZihmRGF0YSAhPSBudWxsKXtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZmlzaE5vZGVMaXN0W051bWJlcihpZCldO1xyXG4gICAgICAgICAgICB0aGlzLmZpc2hOb2RlTGlzdExlbmdodCAtLTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHRtcGZpc2ggPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK2lkKTtcclxuICAgICAgICAgICAgaWYodG1wZmlzaCl7XHJcbiAgICAgICAgICAgICAgICAvLyB0bXBmaXNoLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuZmlzaFBvb2wucHV0KHRtcGZpc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9naWMgIT0gbnVsbCAmJiB0aGlzLmxvZ2ljLmZpc2hQb29sRGF0YSAhPSBudWxsICYmIHRoaXMubG9naWMuZmlzaFBvb2xEYXRhLmhhc093blByb3BlcnR5KE51bWJlcihpZCkpKXtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubG9naWMuZmlzaFBvb2xEYXRhW051bWJlcihpZCldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNoZWNrQmdNdXNpYyk7XHJcbiAgICB9LFxyXG4gICAgLy/lhrDlhrsgLSDlvIDlp4sgLSDnu5PmnZ9cclxuICAgIG9uRnJlZXplU3RhcnRTdG9wSGFuZGxlcigpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRSdW5GaXNoID0gIXRoaXMubG9naWMuaXNJbkZyZWV6ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUljaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgLy/muLjmiI/lvqrnjq/kvZNcclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgaWYod2luZG93LnMxICE9IG51bGwpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcImZpc2hOb2RlTGlzdCA6IFwiLHRoaXMuZmlzaE5vZGVMaXN0W051bWJlcih3aW5kb3cuczEgKyBcIlwiKV0pO1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcInVpX3BoeXNpY2FsUG9vbCA6IFwiLHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKHdpbmRvdy5zMSArIFwiXCIpKTtcclxuICAgICAgICAgICAgd2luZG93LnMxID0gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMubG9naWMuc3RhcnRGaXJlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrU2hvb3QoZHQpO1xyXG4gICAgICAgIHRoaXMudW5Mb2NrRmlzaChkdCk7XHJcbiAgICAgICAgaWYoIXRoaXMubG9naWMucXVpY2tNb3ZlICYmIHRoaXMubG9naWMuaXNMb2NrICYmIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9PSBudWxsICYmIHRoaXMubG9naWMuaXNMb2NrQXV0b0NoYW5nZSl7XHJcbiAgICAgICAgICAgIGxldCBsb2NrRmlzaElkID0gdGhpcy5maW5kRmlzaCgpO1xyXG4gICAgICAgICAgICBpZihsb2NrRmlzaElkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9IGxvY2tGaXNoSWQ7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIj4+LS0tLWZpbmRGaXNoLS0tLSDplIHlrpogXCIrdGhpcy5sb2dpYy5sb2NrRmlzaElEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNBdXRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmxvY2tGaXNoSUQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5xdWlja01vdmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sb2NrRmlzaElEID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZmlzaCA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwiXCIrdGhpcy5sb2dpYy5sb2NrRmlzaElEKTtcclxuICAgICAgICAgICAgaWYoZmlzaCA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRDbGlja0FyZWEoZmlzaC5wb3NpdGlvbixmaXNoLndpZHRoLGZpc2guaGVpZ2h0KSl7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sYXN0TG9ja0Zpc2hJRCA9IE51bWJlcih0aGlzLmxvZ2ljLmxvY2tGaXNoSUQrXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5sb2NrRmlzaElEID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmxvY2tGaXNoSW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrQXV0b0NoYW5nZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNBdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXNlQXV0b1NraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maXJlVGltZSArPSBkdDtcclxuICAgICAgICBpZih0aGlzLmZpcmVUaW1lID4gdGhpcy5maXJlVGltZUZyZXF1ZW5jeSl7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlyZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6Kej6ZSB5LiO5q275LqhXHJcbiAgICB1bkxvY2tGaXNoKGR0KXtcclxuICAgICAgICBjb25zdCBNYXhVc2VyTnVtID0gNDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1heFVzZXJOdW07IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZmlzaDtcclxuICAgICAgICAgICAgbGV0IHVpX2xvY2sgPSB0aGlzLnVpX0xvY2tDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9Mb2NrXCIraSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMubG9ja0Zpc2hJRCAhPSBudWxsICYmIHRoaXMubG9naWMuc3RhcnRGaXJlKXtcclxuICAgICAgICAgICAgICAgICAgICBmaXNoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIit0aGlzLmxvZ2ljLmxvY2tGaXNoSUQpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlfbG9jay5pc1BsYXlTcGluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB1aV9sb2NrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGZpc2ggPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB1aV9sb2NrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdWlfbG9jay5pc1BsYXlTcGluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB1aV9sb2NrLnggPSBmaXNoLng7XHJcbiAgICAgICAgICAgICAgICB1aV9sb2NrLnkgPSBmaXNoLnk7XHJcbiAgICAgICAgICAgICAgICBpZih1aV9sb2NrLmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlfbG9jay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVpX2xvY2suaXNQbGF5U3BpbmVkID09IG51bGwgfHwgIHVpX2xvY2suaXNQbGF5U3BpbmVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlfbG9jay5pc1BsYXlTcGluZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlMb2NrU3BpbmVIYW5kbGVyKHVpX2xvY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aSreaUvumUgeWumuWKqOeUu1xyXG4gICAgcGxheUxvY2tTcGluZUhhbmRsZXIobG9ja05vZGUpe1xyXG4gICAgICAgIGxldCB1aV9sb2NrO1xyXG4gICAgICAgIGlmKGxvY2tOb2RlID09IG51bGwpe1xyXG4gICAgICAgICAgICB1aV9sb2NrID0gdGhpcy5jdXJyZW50TG9ja1VpO1xyXG4gICAgICAgICAgICBpZih1aV9sb2NrKXVpX2xvY2suaXNQbGF5U3BpbmVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdWlfbG9jayA9IGxvY2tOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih1aV9sb2NrID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHVpX2xvY2sgPSB0aGlzLnVpX0xvY2tDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9Mb2NrXCIrdGhpcy5sb2dpYy5zZWF0TnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodWlfbG9jay5pc1BsYXlTcGluZWQgPT0gbnVsbCB8fCB1aV9sb2NrLmlzUGxheVNwaW5lZCA9PSBmYWxzZSlyZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9ja1VpID0gdWlfbG9jaztcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUodWlfbG9jay5nZXRDaGlsZEJ5TmFtZShcInNwaW5lXCIpLGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5Mb2NrU3RhcnQsbnVsbCxDT05TVC5TcGluZU5hbWUuTG9ja0luZyx0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvL+eUqOaIt+emu+W8gCDop6PplIFcclxuICAgIGxlYXZlUm9vbVVuTG9ja0hhbmRsZXIocmVzKXtcclxuICAgICAgICB0aGlzLnVpX0xvY2tDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9Mb2NrXCIrcmVzLnNlYXROdW0pO1xyXG4gICAgfSxcclxuICAgIC8v5a+75om+5LiA5p2h5aSn6bG8XHJcbiAgICBmaW5kRmlzaCgpe1xyXG4gICAgICAgIC8v56ym5ZCI5p2h5Lu255qE6bG8XHJcbiAgICAgICAgbGV0IGZpc2hJZCA9IDAsIHByaW9yaXR5TWF4ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmZpc2hOb2RlTGlzdCl7XHJcbiAgICAgICAgICAgIGxldCBmaXNoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIitpZCk7XHJcbiAgICAgICAgICAgIGlmKGZpc2ggIT0gbnVsbCAmJiBmaXNoLl9jb21wb25lbnRzICE9IG51bGwgJiYgZmlzaC5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBpc05leHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMubGFzdExvY2tGaXNoSUQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaXNoICE9IG51bGwgJiYgTnVtYmVyKHRoaXMubG9naWMubGFzdExvY2tGaXNoSUQpICE9IE51bWJlcihmaXNoLm5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNOZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihmaXNoICE9IG51bGwpIGlzTmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGlzTmV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRDbGlja0FyZWEoZmlzaC5wb3NpdGlvbixmaXNoLndpZHRoLGZpc2guaGVpZ2h0KSAmJiB0aGlzLmxvZ2ljLmZpc2hQb29sRGF0YVtOdW1iZXIoaWQpXSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpc2hUeXBlSWQgPSB0aGlzLmxvZ2ljLmZpc2hQb29sRGF0YVtOdW1iZXIoaWQpXS5maXNoVHlwZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJpb3JpdHkgPSB0aGlzLmxvZ2ljLmpzb25fZmlzaFRhYmxlW2Zpc2hUeXBlSWRdLnByaW9yaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpb3JpdHlNYXggPD0gcHJpb3JpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlNYXggPSBwcmlvcml0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpc2hJZCA9IE51bWJlcihmaXNoLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikuZ2V0RmlzaElEKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlzaElkID4gMCA/IGZpc2hJZCA6IG51bGw7XHJcbiAgICB9LFxyXG4gICAgLy/nibnmrorlrZDlvLnnmoTmnIDlkI7niIbngrhcclxuICAgIG9uU3BlY2lhbEJ1bGxldEV4cEhhbmRsZXIocmVzKXtcclxuICAgICAgICBpZighdGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgIGlmKHJlcy5vZmZMaW5lICE9IG51bGwpey8v5aaC5p6c5piv5pat57q/6YeNXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLm9mZkxpbmVNaXNzaWxlRGF0YSA9IHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcDtcclxuICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLlBhcnRpYWxCb21iKXtcclxuICAgICAgICAgICAgb3AgPSBDT05TVC5DYW5ub25PcGVudGlvbi5QYXJ0aWFsQm9tYkhpdDtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJQYXJ0aWFsQm9tYlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKXtcclxuICAgICAgICAgICAgb3AgPSBDT05TVC5DYW5ub25PcGVudGlvbi5NaXNzaWxlSGl0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxpZ2h0bmluZyl7XHJcbiAgICAgICAgICAgIG9wID0gQ09OU1QuQ2Fubm9uT3BlbnRpb24uTGlnaHRuaW5nSGl0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2lsbEZpc2hEYXRhID0gIHRoaXMuZ2V0RmlzaEJ5UmFuZ2UocmVzLnBvcyxyZXMuY2Fubm9uVHlwZSk7XHJcbiAgICAgICAgaWYocmVzLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcpe1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkxpZ2h0bmluZ0VmZmVjdChyZXMsa2lsbEZpc2hEYXRhLmtpbGxGaXNoTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBraWxsRmlzaExpc3QgPSAga2lsbEZpc2hEYXRhLmtpbGxGaXNoTGlzdDtcclxuICAgICAgICBsZXQgcG9zTGlzdCA9ICBraWxsRmlzaERhdGEucG9zTGlzdDtcclxuICAgICAgICBpZihraWxsRmlzaExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKHJlcy5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHBhcnRpYWxCb21iRWZmZWN0KHJlcy5wb3MpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpe1xyXG4gICAgICAgICAgICAgICAgLy/ku5nliZHniIbngrjmlYjmnpxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvTWlzc2lsKHJlcy5wb3Msa2lsbEZpc2hMaXN0Lmxlbmd0aCsxMCk7XHJcbiAgICAgICAgICAgICAgICAvL+WNj+iuruimgeaxgua3u+WKoOiHs+WwkTLkuKowXHJcbiAgICAgICAgICAgICAgICBraWxsRmlzaExpc3QucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIGtpbGxGaXNoTGlzdC5wdXNoKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBudWxsO1xyXG4gICAgICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpe1xyXG4gICAgICAgICAgICAgICAgcG9zID0gcmVzLnBvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbmRIaXRGaXNoRGF0YShvcCxraWxsRmlzaExpc3QscmVzLnVpZCxyZXMucG9zKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYocmVzLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKXtcclxuICAgICAgICAgICAgICAgIGtpbGxGaXNoTGlzdCA9IFswLDBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kSGl0RmlzaERhdGEob3Asa2lsbEZpc2hMaXN0LHJlcy51aWQscmVzLnBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/ku5nliZHnmoTmnIDlkI7niIbngrjmmK/kuIDkuKrnibnmlYgg54S25ZCOIOWNiuW+hOWImeaYryDnibnmlYjnmoTlrr3luqYg5bm25LiN5piv5aSa5Liqc3BpbmUg5pKt5pS+XHJcbiAgICAgICAgICAgIGlmKHJlcy5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHBhcnRpYWxCb21iRWZmZWN0KHJlcy5wb3MpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdG9NaXNzaWwocmVzLnBvcywxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rku5nliZFcclxuICAgIGNyZWF0b01pc3NpbChwb3MsbnVtKXtcclxuICAgICAgICBjb25zdCBIYXJmICAgICAgICAgICAgID0gNTA7XHJcbiAgICAgICAgY29uc3QgRWZmZWN0T2Zmc2V4WCAgICA9IDEwMDtcclxuICAgICAgICBjb25zdCBFZmZlY3RPZmZzZXhZICAgID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IEVmZmVjdFBvc09mZnNleFggPSAyMDA7XHJcbiAgICAgICAgY29uc3QgRWZmZWN0UG9zT2Zmc2V4WSA9IDIwMDtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxudW07aSsrKXtcclxuICAgICAgICAgICAgbGV0IFhkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogRWZmZWN0T2Zmc2V4WCA+IEhhcmYgPyAxOiAtMTtcclxuICAgICAgICAgICAgbGV0IFlkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogRWZmZWN0T2Zmc2V4WSA+IEhhcmYgPyAxOiAtMTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdEJvb21FZmZlY3QoY2MudjIocG9zLnggKyAoTWF0aC5yYW5kb20oKSAqIEVmZmVjdFBvc09mZnNleFggKiBYZGlyZWN0aW9uKSxwb3MueSArIChNYXRoLnJhbmRvbSgpICogRWZmZWN0UG9zT2Zmc2V4WSAqIFlkaXJlY3Rpb24pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v54m55q6K5a2Q5by5IOS7meWJkeeCuOW8ueOAgemXqueUteOAgeeCjueIhueCuOW8uSDnmoTnorDmkp4g5Y2P6K6uXHJcbiAgICBzZW5kSGl0RmlzaERhdGEob3Asa2lsbEZpc2hMaXN0LHVpZCxwb3Mpe1xyXG4gICAgICAgIGxldCBoaXRGaXNoRGF0YSA9IHtcclxuICAgICAgICAgICAgXCJvcFwiOm9wLFxyXG4gICAgICAgICAgICBcImZpc2hJZHNcIjoga2lsbEZpc2hMaXN0XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihOdW1iZXIodWlkKSAhPSBnbEdhbWUudXNlci51c2VySUQpe1xyXG4gICAgICAgICAgICBoaXRGaXNoRGF0YVtcInVpZFwiXSA9IHVpZDtcclxuICAgICAgICAgICAgY2MubG9nKFwiPj4g5YW25LuW5Lq6IOeJueauiuWtkOW8ueeahOeisOaSniA6IFwiLGhpdEZpc2hEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocG9zICE9IG51bGwpe1xyXG4gICAgICAgICAgICBoaXRGaXNoRGF0YVtcInBvc1wiXSA9IHt4OnBvcy54LHk6cG9zLnl9O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBoaXRGaXNoRGF0YVtcInBvc1wiXSA9IHt4OjAseTowfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIi0tPT0tLT7lj5HpgIEg54m55q6K5a2Q5by5IOS7meWJkeeCuOW8ueOAgemXqueUteOAgeeCjueIhueCuOW8uSDnmoTnorDmkp4gXCIsaGl0RmlzaERhdGEpO1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiPT09PT09PT0g5Y+R6YCB54m55q6K5a2Q5by555qE56Kw5pKeIFwiLGhpdEZpc2hEYXRhKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coZ2xHYW1lLnJvb20uZ2V0UGxheWVyT3AoZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKSxoaXRGaXNoRGF0YSk7Ly/lrZDlvLnnorDmkp5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7ml4vovaxcclxuICAgIGNoYW5nZUNhbnRhaW5lckhhbmRsZXIoKXtcclxuICAgICAgICBjYy53YXJuKFwiPj4g6KeS5bqm5peL6L2sMTgwICBjaGFuZ2VDYW50YWluZXJIYW5kbGVyXCIpXHJcbiAgICAgICAgdGhpcy5sb2dpYy5pc05lZWRTZXQxODBBbmdsZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8v54aU5bKp546E5q2mIOWFqOWxj+eIhueCuFxyXG4gICAgb25TcGVjaWFsQm9tYkhhbmRsZXIocmVzKXtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcInJvbmdZYW5Cb3NzQm9vbVwiKTsvL+eGlOWyqeeOhOatpueIhueCuFxyXG4gICAgICAgIH0sMC41KTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gTnVtYmVyKHJlcy5zZWF0TnVtKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCwgXCJyb25nWWFuQm9zc0RpZVwiKTsvL+eGlOWyqeeOhOatpuatu+S6oVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMuZmlzaFR5cGVJZCA9PSBDT05TVC5Cb3NzTGF2YUJhc2FsdCl7XHJcbiAgICAgICAgICAgIGxldCBmaXNoID0gdGhpcy51aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIityZXMuZmlzaElkKTtcclxuICAgICAgICAgICAgaWYgKGZpc2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRSb25nWWFuQm9vbUVmZmVjdChmaXNoLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuS4gOS4queCuOW8ueWKqOeUu+aViOaenO+8jOS8oOWFpeS4gOS4quWdkOagh1xyXG4gICAgY3JlYXRCb29tRWZmZWN0KHBvcyl7XHJcbiAgICAgICAgbGV0IG1pc3NpbGVFZmZlY3QgICAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtaXNzaWxlRWZmZWN0XCIpKTtcclxuICAgICAgICBtaXNzaWxlRWZmZWN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbWlzc2lsZUVmZmVjdC5vcGFjaXR5ID0gMDtcclxuICAgICAgICBtaXNzaWxlRWZmZWN0LnpJbmRleCA9IENPTlNULm5vZGVaSW5kZXguekluZGV4QW5pO1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgbWlzc2lsZUVmZmVjdC5hbmdsZSA9IDE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wuYWRkQ2hpbGQobWlzc2lsZUVmZmVjdCk7XHJcbiAgICAgICAgbWlzc2lsZUVmZmVjdC5wb3NpdGlvbiA9IHBvcztcclxuICAgICAgICBtaXNzaWxlRWZmZWN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoTWF0aC5yYW5kb20oKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgbWlzc2lsZUVmZmVjdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShtaXNzaWxlRWZmZWN0LGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5Ob3JtYWwsKCk9PntcclxuICAgICAgICAgICAgICAgIG1pc3NpbGVFZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65LiA5Liq54aU5bKp546E5q2m54K45by5XHJcbiAgICBjcmVhdFJvbmdZYW5Cb29tRWZmZWN0KHBvcyl7XHJcbiAgICAgICAgbGV0IHNwZWNpYWxCb29tRWZmZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BpbmVfUm9uZ1lhblwiKSk7XHJcbiAgICAgICAgc3BlY2lhbEJvb21FZmZlY3QuYWN0aXZlICAgPSB0cnVlO1xyXG4gICAgICAgIHNwZWNpYWxCb29tRWZmZWN0LnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgIHRoaXMudWlfcGh5c2ljYWxQb29sLmFkZENoaWxkKHNwZWNpYWxCb29tRWZmZWN0KTtcclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShzcGVjaWFsQm9vbUVmZmVjdCxmYWxzZSxmYWxzZSxDT05TVC5TcGluZU5hbWUuTm9ybWFsLCgpPT57XHJcbiAgICAgICAgICAgIHNwZWNpYWxCb29tRWZmZWN0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jaGVja0JnTXVzaWMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65LiA5LiqIOeCjueIhueCuOW8ueWKqOeIhueCuOeUu+aViOaenCBwb3Mg54iG54K45Lit5b+D54K5XHJcbiAgICBjcmVhdHBhcnRpYWxCb21iRWZmZWN0KHBvcyl7XHJcbiAgICAgICAgbGV0IHNwZWNpYWxCb29tRWZmZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYXJ0aWFsQm9tYkVmZmVjdCk7XHJcbiAgICAgICAgc3BlY2lhbEJvb21FZmZlY3QucG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wuYWRkQ2hpbGQoc3BlY2lhbEJvb21FZmZlY3QpO1xyXG4gICAgICAgIHRoaXMubG9naWMucGxheVNwaW5lKHNwZWNpYWxCb29tRWZmZWN0LGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5Ob3JtYWwsKCk9PntcclxuICAgICAgICAgICAgc3BlY2lhbEJvb21FZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5pKt5pS+6Zeq55S15pWI5p6cXHJcbiAgICBydW5MaWdodG5pbmdFZmZlY3QocmVzLGtpbGxGaXNoQXJyKXtcclxuICAgICAgICBsZXQgbXlpZCA9IGdsR2FtZS51c2VyLnVzZXJJRDtcclxuICAgICAgICBpZihyZXMudWlkID09IG15aWQpe1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImxpZ2h0bmluZ0hpdFwiKTsvL+mXqueUteWHu+S4remxvFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0ga2lsbEZpc2hBcnIubGVuZ3RoO1xyXG4gICAgICAgIGxldCBuZXh0RmlzaFBvcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IEdhcCA9IDAuMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoSUQgICAgICAgICA9IGtpbGxGaXNoQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbmV4dF9maXNoSUQgICAgPSBraWxsRmlzaEFycltpKzFdO1xyXG4gICAgICAgICAgICBsZXQgZmlzaE5vZGUgPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK2Zpc2hJRCk7XHJcbiAgICAgICAgICAgIGlmKGZpc2hOb2RlID09IG51bGwpY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCBuZXh0X2Zpc2hOb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYobmV4dF9maXNoSUQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dF9maXNoTm9kZSA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwiXCIrbmV4dF9maXNoSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXh0X2Zpc2hOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RmlzaFBvcy5wb3MgICAgICAgICA9IG5leHRfZmlzaE5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBuZXh0RmlzaFBvcy5ubyAgICAgICAgICA9IG5leHRfZmlzaE5vZGUubm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1hZyA9IDA7XHJcbiAgICAgICAgICAgIGlmKG5leHRfZmlzaE5vZGUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwZWNpYWxFZmZlY3QgICAgICAgPSB0aGlzLmxvZ2ljLmNyZWF0b3JFZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QucGFyZW50ICAgID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QuYWN0aXZlICAgID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QubmFtZSAgICAgID0gXCJsaWdodG5pbmdfXCIraTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QuekluZGV4ICAgID0gQ09OU1Qubm9kZVpJbmRleC56SW5kZXhBbGxCb29tICsgaTtcclxuICAgICAgICAgICAgICAgIHRoaXMudWlfcGh5c2ljYWxQb29sLmFkZENoaWxkKHNwZWNpYWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgICAgICAgICAgICAgICAgPSBmaXNoTm9kZS5wb3NpdGlvbi5zdWIobmV4dEZpc2hQb3MucG9zKTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QuYW5jaG9yWCAgID0gMDtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QueCAgICAgICAgID0gZmlzaE5vZGUueDtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QueSAgICAgICAgID0gZmlzaE5vZGUueTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QuYW5nbGUgICAgID0gdGhpcy5sb2dpYy5zZXRBbmdsZShuZXh0RmlzaFBvcy5wb3MueCxuZXh0RmlzaFBvcy5wb3MueSxmaXNoTm9kZS5wb3NpdGlvbi54LGZpc2hOb2RlLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgbWFnID0gdGVtcC5tYWcoKTsvL+i3neemu1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gbWFnL0NPTlNULkxpZ2h0bmluZ1c7XHJcbiAgICAgICAgICAgICAgICBsZXQgaCA9IHNjYWxlKkNPTlNULkxpZ2h0bmluZ0g7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsRWZmZWN0LndpZHRoID0gbWFnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZEggPSBoID4gQ09OU1QuTGlnaHRuaW5nSCA/IENPTlNULkxpZ2h0bmluZ0ggOiBoO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiDpl6rnlLXlrr3luqYgXCIsdyxcIiDpq5jluqYgXCIsZW5kSClcclxuICAgICAgICAgICAgICAgIHNwZWNpYWxFZmZlY3QuaGVpZ2h0ID0gQ09OU1QuTGlnaHRuaW5nSDtcclxuICAgICAgICAgICAgICAgIC8vIHNwZWNpYWxFZmZlY3QuaGVpZ2h0ID0gQ09OU1QuTGlnaHRuaW5nSDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEVmZmVjdEltYWdlICAgID0gXCJpbWdfc2hhbmRpYW5cIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEJlZ2luICAgICAgICAgID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEVuZCAgICAgICAgICAgID0gODtcclxuICAgICAgICAgICAgICAgIGNvbnN0IExvb3AgICAgICAgICAgID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IElzSGF2ZVplcm8gICAgID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBTcGVlZCAgICAgICAgICA9IDAuMTI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBQbGF5ZWRSZW1vdmUgICA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsRWZmZWN0LmdldENvbXBvbmVudChcIm5maXNoX01vdmllQ2xpcFwiKS5pbml0RWZmZWN0KHRoaXMuZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzLEVmZmVjdEltYWdlLEJlZ2luLEVuZCxMb29wLElzSGF2ZVplcm8sU3BlZWQsUGxheWVkUmVtb3ZlLG51bGwsMCxtYWcsaCxpKkdhcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdEVmZmVjdEJsdWVQb2ludExpZ2h0KGZpc2hOb2RlLngsZmlzaE5vZGUueSxpLGkqR2FwLG1hZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65LiA5LiqIOiTneWFiemXqueOsCDliqjnlLtcclxuICAgIGNyZWF0RWZmZWN0Qmx1ZVBvaW50TGlnaHQoeCx5LGksbWFnKXtcclxuICAgICAgICBsZXQgc3BlY2lhbEVmZmVjdCAgPSB0aGlzLmxvZ2ljLmNyZWF0b3JFZmZlY3QoKTtcclxuICAgICAgICBzcGVjaWFsRWZmZWN0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgc3BlY2lhbEVmZmVjdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmKG1hZyA+IGNjLndpblNpemUuaGVpZ2h0LzMgJiYgbWFnIDwgY2Mud2luU2l6ZS5oZWlnaHQvMil7XHJcbiAgICAgICAgICAgIHNwZWNpYWxFZmZlY3Quc2NhbGUgID0gNS44O1xyXG4gICAgICAgIH1lbHNlIGlmKG1hZyA+IGNjLndpblNpemUuaGVpZ2h0LzIgJiYgbWFnIDwgY2Mud2luU2l6ZS5oZWlnaHQpe1xyXG4gICAgICAgICAgICBzcGVjaWFsRWZmZWN0LnNjYWxlICA9IDYuODtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3BlY2lhbEVmZmVjdC5zY2FsZSAgPSA0LjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwZWNpYWxFZmZlY3QuekluZGV4ID0gQ09OU1Qubm9kZVpJbmRleC56SW5kZXhBbmkgKyBpKjM7XHJcbiAgICAgICAgdGhpcy51aV9waHlzaWNhbFBvb2wuYWRkQ2hpbGQoc3BlY2lhbEVmZmVjdCk7XHJcbiAgICAgICAgc3BlY2lhbEVmZmVjdC54ID0geDtcclxuICAgICAgICBzcGVjaWFsRWZmZWN0LnkgPSB5O1xyXG5cclxuICAgICAgICBjb25zdCBFZmZlY3RJbWFnZSAgPSBcImltZ19zaGFuZGlhbl9iYWxsXCI7XHJcbiAgICAgICAgY29uc3QgQmVnaW4gICAgICAgID0gMTtcclxuICAgICAgICBjb25zdCBFbmQgICAgICAgICAgPSA3O1xyXG4gICAgICAgIGNvbnN0IExvb3AgICAgICAgICA9IDI7XHJcbiAgICAgICAgY29uc3QgSXNIYXZlWmVybyAgID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgU3BlZWQgICAgICAgID0gMC4wNzI7XHJcbiAgICAgICAgY29uc3QgUGxheWVkUmVtb3ZlID0gdHJ1ZTtcclxuICAgICAgICBzcGVjaWFsRWZmZWN0LmdldENvbXBvbmVudChcIm5maXNoX01vdmllQ2xpcFwiKS5pbml0RWZmZWN0KHRoaXMuZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzLEVmZmVjdEltYWdlLEJlZ2luLEVuZCxMb29wLElzSGF2ZVplcm8sU3BlZWQsUGxheWVkUmVtb3ZlKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlumHkeW4gVxyXG4gICAgZ2V0Q29pbihyZXMpe1xyXG4gICAgICAgIGxldCByZXdhcmRHb2xkICA9IE1hdGguZmxvb3IocmVzLnJld2FyZEdvbGQgLyByZXMua2lsbEZpc2hBcnIubGVuZ3RoKTtcclxuICAgICAgICBsZXQgdG1wTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmtpbGxGaXNoQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXNoS2V5ID0gcmVzLmtpbGxGaXNoQXJyW2ldLmZpc2hMaW5lSUQ7XHJcbiAgICAgICAgICAgIGxldCBmaXNoTm9kZSA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwiXCIrZmlzaEtleSk7XHJcbiAgICAgICAgICAgIGlmKGZpc2hOb2RlKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtICAgICAgICAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmV3YXJkR29sZCAgPSByZXdhcmRHb2xkO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWF0TnVtICAgICA9IHJlcy5zZWF0TnVtO1xyXG4gICAgICAgICAgICAgICAgaXRlbS51aWQgICAgICAgICA9IHJlcy51aWQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnBvc2l0aW9uICAgID0gZmlzaE5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBpdGVtLm11bHRpcGxlICAgID0gdGhpcy5sb2dpYy5nZXRSYW5kb21OdW0oMCwxMDApO1xyXG4gICAgICAgICAgICAgICAgdG1wTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEdldFJ1bkNvaW5UaW1lID0gMTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRtcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQucGxheUNvaW5FZmZlY3QsdG1wTGlzdFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LEdldFJ1bkNvaW5UaW1lKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmlk6bG855qE6IyD5Zu05YaF55qE6bG8XHJcbiAgICBnZXRGaXNoQnlSYW5nZShwb3MsY2Fubm9uVHlwZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLmxvZ2ljLmlzRW50ZXJSb29tKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2lsbEZpc2hMaXN0ID0gW107XHJcbiAgICAgICAgbGV0IHBvc0xpc3QgPSBbXTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gMDtcclxuICAgICAgICBpZihjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTGlnaHRuaW5nKXtcclxuICAgICAgICAgICAgcG9zTGlzdC5wdXNoKHBvcyk7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9ICBOdW1iZXIodGhpcy5sb2dpYy5yb29tUnVsZS5MaWdodG5pbmdSYWRpdXMpOy8vIOmXqueUteeCruW8ueS6p+eUn+eahOi/numUgemXqueUteeahOi/numUgeebruagh+WNiuW+hOiMg+WbtO+8iOWNleS9je+8muWDj+e0oO+8iVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIpe1xyXG4gICAgICAgICAgICBwb3NMaXN0LnB1c2gocG9zKTtcclxuICAgICAgICAgICAgcmFkaXVzID0gIE51bWJlcih0aGlzLmxvZ2ljLnJvb21SdWxlLkV4cGxvZGVSYWRpdXMpOy8vIOeCjueIhueCruW8ueeahOeIhueCuOaViOaenOWNiuW+hOiMg+WbtO+8iOWNleS9je+8muWDj+e0oO+8iVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSl7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9ICBOdW1iZXIodGhpcy5sb2dpYy5yb29tUnVsZS5FeGNhbGlidXJSYWRpdXMpOy8vIOS7meWJkeeIhueCuOaXtueahOeIhueCuOWNiuW+hOiMg+WbtO+8iOWNleS9je+8muWDj+e0oO+8iVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBBbGwgPSAxMDA7XHJcbiAgICAgICAgY29uc3QgSGFmID0gNTA7XHJcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5maXNoTm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSB0aGlzLnVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK2lkKTtcclxuICAgICAgICAgICAgaWYgKGZpc2ggJiYgTWF0aC5hYnMoZmlzaC54KSA8IGNjLndpblNpemUud2lkdGgvMiAmJiBNYXRoLmFicyhmaXNoLnkpIDwgY2Mud2luU2l6ZS5oZWlnaHQvMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnIgPSBNYXRoLnJhbmRvbSgpICogQWxsO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpc2hVbml0ID0gZmlzaC5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoZmlzaFVuaXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXMgPSB0aGlzLmdldERpc3RhbmNlVHdvUG9pbnQocG9zLCBmaXNoKTsvL+iuoeeul+i3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyciA8IEhhZiAmJiBwb3NMaXN0Lmxlbmd0aCA8PSBOdW1iZXIodGhpcy5sb2dpYy5yb29tUnVsZS5MaWdodG5pbmdNYXhGaXNoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2lsbEZpc2hMaXN0LnB1c2goZmlzaFVuaXQuZ2V0RmlzaElEKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zTGlzdC5wdXNoKGNjLnYyKGZpc2gueCxmaXNoLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDw9IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2lsbEZpc2hMaXN0LnB1c2goZmlzaFVuaXQuZ2V0RmlzaElEKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zTGlzdC5wdXNoKGNjLnYyKGZpc2gueCxmaXNoLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2tpbGxGaXNoTGlzdDpraWxsRmlzaExpc3QscG9zTGlzdDpwb3NMaXN0fTtcclxuICAgIH0sXHJcbiAgICAvL+iuoeeul+i3neemu1xyXG4gICAgZ2V0RGlzdGFuY2VUd29Qb2ludChub2RlMSwgbm9kZTIpIHtcclxuICAgICAgICBjb25zdCBPZmZzZXhZID0gMjtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KG5vZGUxLnggLSBub2RlMi54LCBPZmZzZXhZKSArIE1hdGgucG93KG5vZGUxLnkgLSBub2RlMi55LCBPZmZzZXhZKSlcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+aJgOacieaMiemSrlxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKXtcclxuICAgICAgICBzd2l0Y2gobmFtZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aV9iZ1wiOnJldHVybiB0aGlzLm1lbnVPcHRpb25WaWV3SGFuZGxlcigpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/miZPlvIBcclxuICAgIG1lbnVPcHRpb25WaWV3SGFuZGxlcihyZXMpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v6ZSB5a6aXHJcbiAgICB1c2VBdXRvU2tpbGxIYW5kbGVyKCl7XHJcbiAgICAgICAgY29uc3QgTG9ja1RpbWUgPSAwLjI7XHJcbiAgICAgICAgdGhpcy5hdXRvU2hvb3RUaW1lID0gTG9ja1RpbWU7XHJcbiAgICB9LFxyXG4gICAgLy/pnIfliqggLSDpgJrnlKjpnIfliqjlupNcclxuICAgIG9uU2hvY2tIYW5kbGVyKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1NzaG9ja0luZylyZXR1cm47XHJcbiAgICAgICAgY29uc3QgU3Nob2NrVGltZSA9IDAuODtcclxuICAgICAgICB0aGlzLmlzU3Nob2NrSW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9sZFBvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4wMiwgY2MudjIodGhpcy5vbGRQb3MueCs1LCB0aGlzLm9sZFBvcy55KzcpKSwgY2MubW92ZVRvKDAuMDIsIGNjLnYyKHRoaXMub2xkUG9zLngtNiwgdGhpcy5vbGRQb3MueSs3KSksICAgIGNjLm1vdmVUbygwLjAyLCBjYy52Mih0aGlzLm9sZFBvcy54LTEzLCB0aGlzLm9sZFBvcy55KzMpKSwgY2MubW92ZVRvKDAuMDIsIGNjLnYyKHRoaXMub2xkUG9zLngrMywgdGhpcy5vbGRQb3MueS02KSksICAgIGNjLm1vdmVUbygwLjAyLCBjYy52Mih0aGlzLm9sZFBvcy54LTUsIHRoaXMub2xkUG9zLnkrNSkpLCBjYy5tb3ZlVG8oMC4wMiwgY2MudjIodGhpcy5vbGRQb3MueCsyLCB0aGlzLm9sZFBvcy55LTgpKSwgICAgY2MubW92ZVRvKDAuMDIsIGNjLnYyKHRoaXMub2xkUG9zLngtOCwgdGhpcy5vbGRQb3MueS0xMCkpLCBjYy5tb3ZlVG8oMC4wMiwgY2MudjIodGhpcy5vbGRQb3MueCszLCB0aGlzLm9sZFBvcy55KzEwKSksICAgIGNjLm1vdmVUbygwLjAyLCBjYy52Mih0aGlzLm9sZFBvcy54KzAsIHRoaXMub2xkUG9zLnkrMCkpKSkpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm9sZFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc1NzaG9ja0luZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIFNzaG9ja1RpbWUpO1xyXG4gICAgfSxcclxuICAgIC8v6ZSA5q+BXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmZpc2hOb2RlTGlzdCAgICA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maXNoTm9kZUxpc3RMZW5naHQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRSdW5GaXNoICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dpYyAgICAgICAgICAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudWlfcGh5c2ljYWxQb29sID0gbnVsbDtcclxuICAgIH0sXHJcbn0pOyJdfQ==
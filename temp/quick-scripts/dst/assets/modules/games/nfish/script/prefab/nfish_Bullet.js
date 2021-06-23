
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_Bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '981f2AFYLJCqLB2IXB4usze', 'nfish_Bullet');
// modules/games/nfish/script/prefab/nfish_Bullet.js

"use strict";

/***
 *  捕鱼：子弹
 * **/
var CONST = require("nfishConst");

glGame.baseclass.extend({
  onLoad: function onLoad() {},
  //初始化图集
  initBulletAtlas: function initBulletAtlas(f) {
    this.fish_Atlas = f; //子弹 图集

    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.data = null;
    this.isInit = false;
    this.speed = 1500; //子弹速度

    this.leftBorder = 0; //左边界

    this.rightBorder = 0; //右边界

    this.topBorder = 0; //上边界

    this.downBorder = 0; //下边界

    this.lockCollder = 1;
    this.unLockTime = 0;
    this.leftCollisionTimes = 0; //防止卡边计数器

    this.buttomeCollisionTimes = 0; //防止卡边计数器

    this.rightCollisionTimes = 0; //防止卡边计数器

    this.topCollisionTimes = 0; //防止卡边计数器

    this.moveEndTimeBoom = 0; //仙剑移动爆炸

    this.lockStatusTime = 0; //带锁定属性的存活时间

    this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;
    this.missile = false; //是否是仙剑，如果是那么播放帧动画

    this.missileFrequency = 0.009;
    this.missileTime = 0;
    this.missilePre = "missile_"; //仙剑 pre

    this.missileIndex = 0; //仙剑 开始点

    this.missileMaxIndex = 11; //仙剑 最大点

    this.node.color = cc.Color(255, 255, 255, 255);
  },
  //销毁子弹
  removeBullet: function removeBullet() {
    if (this.data.cannonType != CONST.CannonType.Normal) {
      if (this.data.cannonType == CONST.CannonType.Missile) {
        //解锁发射锁定   仙剑
        this.logic.currentBullteType = CONST.CannonType.Not;
      } else {
        // cc.error("========= delete ======== 销毁 cannonType "+this.data.cannonType)
        glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool, this.data.seatNum);
      }
    } //播放仙剑 爆炸


    if (this.data.cannonType == CONST.CannonType.Missile) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "MissileBoom"); // if(this.logic.specialBulletPool[this.data.seatNum] != null){
      //     cc.warn(">>>>>仙剑 爆炸 "+this.data.seatNum)
      // }

      glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp, {
        cannonType: Number(this.data.cannonType + ""),
        uid: Number(this.data.uid + ""),
        pos: cc.v2(this.node.position.x, this.node.position.y)
      });
    }

    this.data = null;
    this.isInit = false;
    this.speed = 0; //子弹速度

    this.leftBorder = 0; //左边界

    this.rightBorder = 0; //右边界

    this.topBorder = 0; //上边界

    this.downBorder = 0; //下边界

    this.data = null;
    this.node.getComponent(cc.BoxCollider).enabled = false;

    if (this.logic) {
      this.logic.bulletPool.put(this.node);
    }

    this.logic = null; //数据中心
    // this.node.destroy();
  },
  initBullet: function initBullet(res) {
    this.data = res;
    this.lockCollder = 1;
    var spr = this.node.getComponent(cc.Sprite);
    var collider = this.node.getComponent(cc.BoxCollider);
    collider.enabled = true;
    this.node.position = this.data.placeOfBirth;
    this.node.angle = this.data.angle; //初始化角速度

    var level = this.data.gunLevel == null ? this.data.cannonLevel : this.data.gunLevel;

    if (level == null || level == 0) {
      level = 1;
    }

    this.speed = 2500;

    if (this.data.cannonType == CONST.CannonType.PartialBomb) {
      spr.spriteFrame = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.PartialBomb); //炎爆专用
    } else if (this.data.cannonType == CONST.CannonType.Missile) {
      spr.spriteFrame = this.fish_Atlas.getSpriteFrame(this.missilePre + this.missileIndex); //仙剑专用

      this.missile = true;
      var MissileSpeed = 2750;
      this.speed = MissileSpeed;

      if (spr.spriteFrame == null) {
        cc.error(">>获取仙剑子弹图集失败 key: " + this.missilePre + this.missileIndex);
      }
    } else if (this.data.cannonType == CONST.CannonType.Lightning) {
      spr.spriteFrame = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.Lightning); //闪电专用
    } else {
      spr.spriteFrame = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.Normal + level);
    }

    if (spr.spriteFrame == null) {
      cc.error("该子弹无法获取到级别，可能 res 结构有误 : ", this.data);
    } else {
      collider.size = spr.spriteFrame.getOriginalSize();
    }

    collider.tag = "bullet_" + this.data.bulletId;
    this.node.name = this.data.lock ? this.data.lock + "" : CONST.SpecialBulletSkin.Normal + this.data.seatNum + "_" + collider.tag;
    this.rightBorder = cc.winSize.width / 2; //右边界

    this.leftBorder = -cc.winSize.width / 2; //左边界

    this.topBorder = cc.winSize.height / 2; //上边界

    this.downBorder = -cc.winSize.height / 2; //下边界

    var zIndex = CONST.nodeZIndex.zIndexBullet + this.node.zIndex;
    this.node.zIndex = zIndex > cc.macro.MAX_ZINDEX ? cc.macro.MAX_ZINDEX - 1 : zIndex;
    this.isInit = true; //状态同步

    if (res.serverTime != undefined && res.createTime != undefined) {
      var nmpos = cc.v2(cc.winSize.width / 2 * Math.random(), cc.winSize.height / 2 * Math.random());
      this.node.setPosition(nmpos);
    }
  },
  //解决卡边重置
  fixSideRunOver: function fixSideRunOver() {
    var Width = cc.winSize.width / 2;
    var Height = cc.winSize.height / 2;
    var MaxAngle = 180;
    var MaxDirectionHALFArg = 100;
    var HALF = 50;
    var DirectionX = Math.random() * MaxDirectionHALFArg > HALF ? -1 : 1;
    var DirectionY = Math.random() * MaxDirectionHALFArg > HALF ? -1 : 1;
    this.node.x = Math.ceil(Math.random() * Width * DirectionX);
    this.node.y = Math.ceil(Math.random() * Height * DirectionY);
    this.node.angle = Math.ceil(Math.random() * MaxAngle);
  },
  bulletMove: function bulletMove(dt) {
    //是否在屏幕
    if (this.node.x > this.rightBorder) {
      this.leftCollisionTimes = 0; //重置计数器

      this.buttomeCollisionTimes = 0; //重置计数器

      this.topCollisionTimes = 0; //重置计数器

      if (this.rightCollisionTimes > 1) {
        this.fixSideRunOver();
        this.rightCollisionTimes = 0;
      }

      this.rightCollisionTimes++;
      this.node.angle = -this.node.angle;
    } else if (this.node.x < this.leftBorder) {
      this.buttomeCollisionTimes = 0; //重置计数器

      this.rightCollisionTimes = 0; //重置计数器

      this.topCollisionTimes = 0; //重置计数器

      if (this.leftCollisionTimes > 1) {
        this.fixSideRunOver();
        this.leftCollisionTimes = 0;
      }

      this.leftCollisionTimes++;
      this.node.angle = -this.node.angle;
    }

    if (this.node.y > this.topBorder) {
      this.leftCollisionTimes = 0; //重置计数器

      this.buttomeCollisionTimes = 0; //重置计数器

      this.rightCollisionTimes = 0; //重置计数器

      if (this.topCollisionTimes > 1) {
        if (this.logic != null && this.logic.getIsRotation()) {
          this.fixSideRunOver(); //正上方不处理卡边问题
        }

        this.topCollisionTimes = 0;
      }

      this.topCollisionTimes++;
      this.node.angle = 180 - this.node.angle;
    } else if (this.node.y < this.downBorder) {
      this.leftCollisionTimes = 0; //重置计数器

      this.rightCollisionTimes = 0; //重置计数器

      this.topCollisionTimes = 0; //重置计数器

      if (this.buttomeCollisionTimes > 1) {
        if (this.logic != null && !this.logic.getIsRotation()) {
          this.fixSideRunOver(); //正下方不处理卡边问题
        }

        this.buttomeCollisionTimes = 0;
      }

      this.buttomeCollisionTimes++;
      this.node.angle = 180 - this.node.angle;
    }

    this.node.x += dt * this.speed * Math.sin(-this.node.angle / 180 * Math.PI);
    this.node.y += dt * this.speed * Math.cos(-this.node.angle / 180 * Math.PI);
  },
  update: function update(dt) {
    this.bulletOnCollisionEnterMaxTime -= dt;

    if (this.bulletOnCollisionEnterMaxTime < 0 && this.data.cannonType == CONST.CannonType.Normal) {
      //38秒 都没有碰撞
      this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;
      this.sendHitFish(CONST.NoonFish);
      this.removeBullet();
    }

    if (this.moveEndTimeBoom > 0) {
      this.moveEndTimeBoom -= dt;

      if (this.moveEndTimeBoom < CONST.MissileChangeRed) {
        if (this.node.c == undefined) this.node.c = CONST.MissileRedMaxValue;
        this.node.color = cc.color(CONST.MissileRedMaxValue, this.node.c, this.node.c, CONST.MissileRedMaxValue); //慢慢变红

        this.node.c -= dt * CONST.MissileRedSpeed;

        if (this.node.c <= CONST.MissileRedValue) {
          this.node.c = CONST.MissileRedValue;
        }
      }

      if (this.moveEndTimeBoom < 1) {
        //删除自己
        this.removeBullet();
        this.moveEndTimeBoom = 0;
      }
    }

    if (this.isInit) {
      this.bulletMove(dt);
    }

    if (this.unLockTime > 0 && this.data != null) {
      this.unLockTime += dt;

      if (this.unLockTime > 0.5) {
        this.data.lock = null;
      }
    }

    if (this.data && this.data.lock != null) {
      this.lockStatusTime += dt;
      var fish = this.node.parent.getChildByName(this.data.lock + "");

      if (!fish) {
        var seatNum = Number(this.data.seatNum);

        if (this.logic.seatNum == seatNum) {
          if (this.logic.ui_physicalPool != this.node.parent) {
            cc.error(">>>>> 物理池 变异 无法找到鱼 ");
          }

          cc.warn(">> ==锁定找不到鱼== >> " + this.data.lock);
        } //0.5-0.3    (0.2秒后 解锁)


        this.unLockTime = CONST.UnLockMaxTime;
      }

      if (this.lockStatusTime > 0.8) {
        //锁定状态下超过0.8秒解除锁定
        this.data.lock = null;
      }
    }

    if (this.missile) {
      this.missileTime += dt;

      if (this.missileTime > this.missileFrequency) {
        this.missileTime = 0;
        this.node.getComponent(cc.Sprite).spriteFrame = this.fish_Atlas.getSpriteFrame(this.missilePre + this.missileIndex);
        this.missileIndex++;

        if (this.missileIndex > this.missileMaxIndex) {
          this.missileIndex = 0;
        }
      }
    }
  },
  deathFish: function deathFish(tag) {
    if (this.data) {
      if (Number(this.data.lock) == Number(tag)) {
        this.data.lock = null;
      }
    }
  },
  //进入碰撞检测
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (this.isPool) {
      cc.error(">>>使用对象池的对象 进入碰撞");
    }

    if (this.data == undefined || this.lockCollder == 0) {
      //数据丢失不参与碰撞检测
      if (this.isPool) {
        cc.error(">>>使用对象池的对象出错了 。 1 ");
      }

      return;
    }

    var effectPosition;
    this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;

    if (this.data.cannonType == CONST.CannonType.Missile) {
      //仙剑子弹
      if (this.logic.seatNum == this.data.seatNum) {
        this.logic.curWaitTime = Date.now(); //重置时间
      }

      effectPosition = other.node.position;

      if (this.data.hitMax > 0) {
        glGame.emitter.emit(CONST.clientEvent.playFishnetEffect, {
          cannonType: Number("" + this.data.cannonType),
          position: effectPosition,
          gunLevel: this.data.gunLevel,
          gunType: this.data.gunType,
          zIndex: this.node.zIndex
        });
        var id = other.node.getComponent("nfish_Unit").getFishID();
        glGame.emitter.emit(CONST.clientEvent.fishSound, "MissileHit");
        this.userMissileHitFish(id, CONST.CannonOpention.MissileHit);
        this.data.hitMax--;
      }

      if (this.data.hitMax == 0) {
        this.data.hitMax = -1; //开始倒计时 结束后爆炸

        this.moveEndTimeBoom = 3;
      }
    } else {
      //普通子弹和三个特殊子弹的逻辑（不包括龙溪）
      var currFishId = Number(other.tag);

      if (this.data.lock != null) {
        //锁定
        if (currFishId == Number(this.data.lock)) {
          //碰撞到目标鱼
          this.lockCollder = 0;
        } else {
          // cc.error(">> currFishId ",currFishId," my lock ",this.data.lock)
          return;
        }
      } else {
        this.lockCollder = 0;
      }

      var _id = other.node.getComponent("nfish_Unit").getFishID();

      if (this.data.seatNum == this.logic.seatNum) {
        other.node.getComponent("nfish_Unit").hit();
      } //播放闪电、炎爆，播放完成解锁


      if (this.data.cannonType == CONST.CannonType.Lightning || this.data.cannonType == CONST.CannonType.PartialBomb) {
        glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp, {
          cannonType: this.data.cannonType,
          uid: this.data.uid,
          pos: cc.v2(other.node.position.x, other.node.position.y)
        });
      }

      if (this.data.cannonType == CONST.CannonType.Normal) {
        //普通子弹
        this.sendHitFish(_id);
      }

      if (this.data.lock != null) {
        //锁定使用中心点
        effectPosition = other.node.position;
      } else {
        //手动使用边缘 + 内 偏移量
        var dt = 0.028; // let ux = this.node.x + dt * this.speed * Math.sin(-this.node.angle / 180 * Math.PI);
        // let uy = this.node.y + dt * this.speed * Math.cos(-this.node.angle / 180 * Math.PI);
        // effectPosition = cc.v2(ux,uy);

        effectPosition = this.node.position;
      }

      if (this.data.cannonType == CONST.CannonType.Normal) {
        //普通子弹
        glGame.emitter.emit(CONST.clientEvent.playFishnetEffect, {
          cannonType: Number("" + this.data.cannonType),
          position: effectPosition,
          gunLevel: this.data.gunLevel,
          gunType: this.data.gunType,
          zIndex: this.node.zIndex
        });
      }

      this.removeBullet();
    }
  },
  //发送普通子弹的碰撞鱼
  sendHitFish: function sendHitFish(id) {
    if (this.data.cannonType == CONST.CannonType.Normal && Number(this.data.uid) == glGame.user.userID) {
      this.logic.bullteNum--;
    }

    var oprEvent = {
      "op": CONST.CannonOpention.NormalHit,
      "fishId": id,
      "shellId": this.data.bulletId
    };

    if (this.data.uid && this.data.uid != glGame.user.userID) {
      oprEvent["uid"] = Number(this.data.uid); // cc.log(">>　------ 机器人 的子弹碰撞  bulletId: ",this.data.bulletId)
    }

    if (this.logic.isEnterRoom) {
      // cc.log("--==-->发送普通子弹的碰撞鱼 ",oprEvent);
      glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), oprEvent); //子弹碰撞
    } else {
      cc.warn(">>游戏未初始化无法发射");
    }
  },
  //发送仙剑的子弹碰撞鱼 入口
  userMissileHitFish: function userMissileHitFish(id, op) {
    var oprEvent = {
      "op": op,
      "fishIds": [id],
      "uid": this.data.uid
    }; // cc.error("---仙剑撞击--- uid: "+this.data.uid+" fish id "+id+"  >> 剩余次数 "+this.data.hitMax);

    if (this.logic.isEnterRoom) {
      cc.log("--==-->发送仙剑的子弹碰撞 ", oprEvent);
      glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), oprEvent); //仙剑子弹碰撞
    }
  },
  OnDestroy: function OnDestroy() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfQnVsbGV0LmpzIl0sIm5hbWVzIjpbIkNPTlNUIiwicmVxdWlyZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsIm9uTG9hZCIsImluaXRCdWxsZXRBdGxhcyIsImYiLCJmaXNoX0F0bGFzIiwibG9naWMiLCJnZXRJbnN0YW5jZSIsImRhdGEiLCJpc0luaXQiLCJzcGVlZCIsImxlZnRCb3JkZXIiLCJyaWdodEJvcmRlciIsInRvcEJvcmRlciIsImRvd25Cb3JkZXIiLCJsb2NrQ29sbGRlciIsInVuTG9ja1RpbWUiLCJsZWZ0Q29sbGlzaW9uVGltZXMiLCJidXR0b21lQ29sbGlzaW9uVGltZXMiLCJyaWdodENvbGxpc2lvblRpbWVzIiwidG9wQ29sbGlzaW9uVGltZXMiLCJtb3ZlRW5kVGltZUJvb20iLCJsb2NrU3RhdHVzVGltZSIsImJ1bGxldE9uQ29sbGlzaW9uRW50ZXJNYXhUaW1lIiwiQnVsbGV0TWF4VGltZSIsIm1pc3NpbGUiLCJtaXNzaWxlRnJlcXVlbmN5IiwibWlzc2lsZVRpbWUiLCJtaXNzaWxlUHJlIiwibWlzc2lsZUluZGV4IiwibWlzc2lsZU1heEluZGV4Iiwibm9kZSIsImNvbG9yIiwiY2MiLCJDb2xvciIsInJlbW92ZUJ1bGxldCIsImNhbm5vblR5cGUiLCJDYW5ub25UeXBlIiwiTm9ybWFsIiwiTWlzc2lsZSIsImN1cnJlbnRCdWxsdGVUeXBlIiwiTm90IiwiZW1pdHRlciIsImVtaXQiLCJjbGllbnRFdmVudCIsImNsZWFyU3BlY2lhbEJ1bGxldFBvb2wiLCJzZWF0TnVtIiwiZmlzaFNvdW5kIiwib25TcGVjaWFsQnVsbGV0RXhwIiwiTnVtYmVyIiwidWlkIiwicG9zIiwidjIiLCJwb3NpdGlvbiIsIngiLCJ5IiwiZ2V0Q29tcG9uZW50IiwiQm94Q29sbGlkZXIiLCJlbmFibGVkIiwiYnVsbGV0UG9vbCIsInB1dCIsImluaXRCdWxsZXQiLCJyZXMiLCJzcHIiLCJTcHJpdGUiLCJjb2xsaWRlciIsInBsYWNlT2ZCaXJ0aCIsImFuZ2xlIiwibGV2ZWwiLCJndW5MZXZlbCIsImNhbm5vbkxldmVsIiwiUGFydGlhbEJvbWIiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwiU3BlY2lhbEJ1bGxldFNraW4iLCJNaXNzaWxlU3BlZWQiLCJlcnJvciIsIkxpZ2h0bmluZyIsInNpemUiLCJnZXRPcmlnaW5hbFNpemUiLCJ0YWciLCJidWxsZXRJZCIsIm5hbWUiLCJsb2NrIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiekluZGV4Iiwibm9kZVpJbmRleCIsInpJbmRleEJ1bGxldCIsIm1hY3JvIiwiTUFYX1pJTkRFWCIsInNlcnZlclRpbWUiLCJ1bmRlZmluZWQiLCJjcmVhdGVUaW1lIiwibm1wb3MiLCJNYXRoIiwicmFuZG9tIiwic2V0UG9zaXRpb24iLCJmaXhTaWRlUnVuT3ZlciIsIldpZHRoIiwiSGVpZ2h0IiwiTWF4QW5nbGUiLCJNYXhEaXJlY3Rpb25IQUxGQXJnIiwiSEFMRiIsIkRpcmVjdGlvblgiLCJEaXJlY3Rpb25ZIiwiY2VpbCIsImJ1bGxldE1vdmUiLCJkdCIsImdldElzUm90YXRpb24iLCJzaW4iLCJQSSIsImNvcyIsInVwZGF0ZSIsInNlbmRIaXRGaXNoIiwiTm9vbkZpc2giLCJNaXNzaWxlQ2hhbmdlUmVkIiwiYyIsIk1pc3NpbGVSZWRNYXhWYWx1ZSIsIk1pc3NpbGVSZWRTcGVlZCIsIk1pc3NpbGVSZWRWYWx1ZSIsImZpc2giLCJwYXJlbnQiLCJnZXRDaGlsZEJ5TmFtZSIsInVpX3BoeXNpY2FsUG9vbCIsIndhcm4iLCJVbkxvY2tNYXhUaW1lIiwiZGVhdGhGaXNoIiwib25Db2xsaXNpb25FbnRlciIsIm90aGVyIiwic2VsZiIsImlzUG9vbCIsImVmZmVjdFBvc2l0aW9uIiwiY3VyV2FpdFRpbWUiLCJEYXRlIiwibm93IiwiaGl0TWF4IiwicGxheUZpc2huZXRFZmZlY3QiLCJndW5UeXBlIiwiaWQiLCJnZXRGaXNoSUQiLCJ1c2VyTWlzc2lsZUhpdEZpc2giLCJDYW5ub25PcGVudGlvbiIsIk1pc3NpbGVIaXQiLCJjdXJyRmlzaElkIiwiaGl0IiwidXNlciIsInVzZXJJRCIsImJ1bGx0ZU51bSIsIm9wckV2ZW50IiwiTm9ybWFsSGl0IiwiaXNFbnRlclJvb20iLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb29tIiwiZ2V0UGxheWVyT3AiLCJzY2VuZXRhZyIsIkZJU0gyIiwib3AiLCJsb2ciLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBbkI7O0FBQ0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLE1BRG9CLG9CQUNWLENBQ1QsQ0FGbUI7QUFHcEI7QUFDQUMsRUFBQUEsZUFKb0IsMkJBSUpDLENBSkksRUFJRjtBQUNkLFNBQUtDLFVBQUwsR0FBbUJELENBQW5CLENBRGMsQ0FDTzs7QUFDckIsU0FBS0UsS0FBTCxHQUFtQlIsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQlMsV0FBdEIsRUFBbkIsQ0FGYyxDQUV5Qzs7QUFDdkQsU0FBS0MsSUFBTCxHQUFtQixJQUFuQjtBQUNBLFNBQUtDLE1BQUwsR0FBbUIsS0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQW1CLElBQW5CLENBTGMsQ0FLVzs7QUFDekIsU0FBS0MsVUFBTCxHQUFtQixDQUFuQixDQU5jLENBTVc7O0FBQ3pCLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkIsQ0FQYyxDQU9XOztBQUN6QixTQUFLQyxTQUFMLEdBQW1CLENBQW5CLENBUmMsQ0FRVzs7QUFDekIsU0FBS0MsVUFBTCxHQUFtQixDQUFuQixDQVRjLENBU1c7O0FBQ3pCLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxVQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0Msa0JBQUwsR0FBOEIsQ0FBOUIsQ0FaYyxDQVlrQjs7QUFD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QVgsQ0FBeEIsQ0FEb0QsQ0FFcEQ7QUFDSDs7QUFDRCxRQUFHLEtBQUs1QyxLQUFMLENBQVdrSixXQUFkLEVBQTBCO0FBQ3RCO0FBQ0F6SixNQUFBQSxNQUFNLENBQUMwSixPQUFQLENBQWVDLFFBQWYsQ0FBd0IzSixNQUFNLENBQUM0SixJQUFQLENBQVlDLFdBQVosQ0FBd0I3SixNQUFNLENBQUM4SixRQUFQLENBQWdCQyxLQUF4QyxDQUF4QixFQUF1RVIsUUFBdkUsRUFGc0IsQ0FFMkQ7QUFDcEYsS0FIRCxNQUdLO0FBQ0RySCxNQUFBQSxFQUFFLENBQUM2RixJQUFILENBQVEsY0FBUjtBQUNIO0FBQ0osR0ExVm1CO0FBMlZwQjtBQUNBZ0IsRUFBQUEsa0JBNVZvQiw4QkE0VkRGLEVBNVZDLEVBNFZFbUIsRUE1VkYsRUE0Vks7QUFDckIsUUFBSVQsUUFBUSxHQUFHO0FBQ1gsWUFBS1MsRUFETTtBQUVYLGlCQUFXLENBQUNuQixFQUFELENBRkE7QUFHWCxhQUFNLEtBQUtwSSxJQUFMLENBQVUwQztBQUhMLEtBQWYsQ0FEcUIsQ0FNckI7O0FBQ0EsUUFBRyxLQUFLNUMsS0FBTCxDQUFXa0osV0FBZCxFQUEwQjtBQUN0QnZILE1BQUFBLEVBQUUsQ0FBQytILEdBQUgsQ0FBTyxtQkFBUCxFQUEyQlYsUUFBM0I7QUFDQXZKLE1BQUFBLE1BQU0sQ0FBQzBKLE9BQVAsQ0FBZUMsUUFBZixDQUF3QjNKLE1BQU0sQ0FBQzRKLElBQVAsQ0FBWUMsV0FBWixDQUF3QjdKLE1BQU0sQ0FBQzhKLFFBQVAsQ0FBZ0JDLEtBQXhDLENBQXhCLEVBQXVFUixRQUF2RSxFQUZzQixDQUUyRDtBQUNwRjtBQUNKLEdBdldtQjtBQXdXcEJXLEVBQUFBLFNBeFdvQix1QkF3V1IsQ0FDWDtBQXpXbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcclxuICogIOaNlemxvO+8muWtkOW8uVxyXG4gKiAqKi9cclxubGV0IENPTlNUID0gcmVxdWlyZShcIm5maXNoQ29uc3RcIik7XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJblm77pm4ZcclxuICAgIGluaXRCdWxsZXRBdGxhcyhmKXtcclxuICAgICAgICB0aGlzLmZpc2hfQXRsYXMgID0gZjsvL+WtkOW8uSDlm77pm4ZcclxuICAgICAgICB0aGlzLmxvZ2ljICAgICAgID0gcmVxdWlyZShcIm5maXNobG9naWNcIikuZ2V0SW5zdGFuY2UoKTsvL+aVsOaNruS4reW/g1xyXG4gICAgICAgIHRoaXMuZGF0YSAgICAgICAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNJbml0ICAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkICAgICAgID0gMTUwMDsgLy/lrZDlvLnpgJ/luqZcclxuICAgICAgICB0aGlzLmxlZnRCb3JkZXIgID0gMDsgICAgLy/lt6bovrnnlYxcclxuICAgICAgICB0aGlzLnJpZ2h0Qm9yZGVyID0gMDsgICAgLy/lj7PovrnnlYxcclxuICAgICAgICB0aGlzLnRvcEJvcmRlciAgID0gMDsgICAgLy/kuIrovrnnlYxcclxuICAgICAgICB0aGlzLmRvd25Cb3JkZXIgID0gMDsgICAgLy/kuIvovrnnlYxcclxuICAgICAgICB0aGlzLmxvY2tDb2xsZGVyID0gMTtcclxuICAgICAgICB0aGlzLnVuTG9ja1RpbWUgID0gMDtcclxuICAgICAgICB0aGlzLmxlZnRDb2xsaXNpb25UaW1lcyAgICAgPSAwOy8v6Ziy5q2i5Y2h6L656K6h5pWw5ZmoXHJcbiAgICAgICAgdGhpcy5idXR0b21lQ29sbGlzaW9uVGltZXMgID0gMDsvL+mYsuatouWNoei+ueiuoeaVsOWZqFxyXG4gICAgICAgIHRoaXMucmlnaHRDb2xsaXNpb25UaW1lcyAgICA9IDA7Ly/pmLLmraLljaHovrnorqHmlbDlmahcclxuICAgICAgICB0aGlzLnRvcENvbGxpc2lvblRpbWVzICAgICAgPSAwOy8v6Ziy5q2i5Y2h6L656K6h5pWw5ZmoXHJcbiAgICAgICAgdGhpcy5tb3ZlRW5kVGltZUJvb20gICAgICAgID0gMDsvL+S7meWJkeenu+WKqOeIhueCuFxyXG4gICAgICAgIHRoaXMubG9ja1N0YXR1c1RpbWUgICAgICAgICA9IDA7Ly/luKbplIHlrprlsZ7mgKfnmoTlrZjmtLvml7bpl7RcclxuICAgICAgICB0aGlzLmJ1bGxldE9uQ29sbGlzaW9uRW50ZXJNYXhUaW1lID0gQ09OU1QuQnVsbGV0TWF4VGltZTtcclxuICAgICAgICB0aGlzLm1pc3NpbGUgICAgICAgICAgICAgICAgPSBmYWxzZTsvL+aYr+WQpuaYr+S7meWJke+8jOWmguaenOaYr+mCo+S5iOaSreaUvuW4p+WKqOeUu1xyXG4gICAgICAgIHRoaXMubWlzc2lsZUZyZXF1ZW5jeSAgICAgICA9IDAuMDA5O1xyXG4gICAgICAgIHRoaXMubWlzc2lsZVRpbWUgICAgICAgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5taXNzaWxlUHJlICAgICAgICAgICAgID0gXCJtaXNzaWxlX1wiOy8v5LuZ5YmRIHByZVxyXG4gICAgICAgIHRoaXMubWlzc2lsZUluZGV4ICAgICAgICAgICA9IDA7Ly/ku5nliZEg5byA5aeL54K5XHJcbiAgICAgICAgdGhpcy5taXNzaWxlTWF4SW5kZXggICAgICAgID0gMTE7Ly/ku5nliZEg5pyA5aSn54K5XHJcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yICAgICAgICAgICAgID0gY2MuQ29sb3IoMjU1LDI1NSwyNTUsMjU1KTtcclxuICAgIH0sXHJcbiAgICAvL+mUgOavgeWtkOW8uVxyXG4gICAgcmVtb3ZlQnVsbGV0KCl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmNhbm5vblR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpey8v6Kej6ZSB5Y+R5bCE6ZSB5a6aICAg5LuZ5YmRXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3Q7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI9PT09PT09PT0gZGVsZXRlID09PT09PT09IOmUgOavgSBjYW5ub25UeXBlIFwiK3RoaXMuZGF0YS5jYW5ub25UeXBlKVxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGVhclNwZWNpYWxCdWxsZXRQb29sLHRoaXMuZGF0YS5zZWF0TnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aSreaUvuS7meWJkSDniIbngrhcclxuICAgICAgICBpZih0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUpe1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcIk1pc3NpbGVCb29tXCIpO1xyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmxvZ2ljLnNwZWNpYWxCdWxsZXRQb29sW3RoaXMuZGF0YS5zZWF0TnVtXSAhPSBudWxsKXtcclxuICAgICAgICAgICAgLy8gICAgIGNjLndhcm4oXCI+Pj4+PuS7meWJkSDniIbngrggXCIrdGhpcy5kYXRhLnNlYXROdW0pXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5vblNwZWNpYWxCdWxsZXRFeHAse2Nhbm5vblR5cGU6TnVtYmVyKHRoaXMuZGF0YS5jYW5ub25UeXBlK1wiXCIpLHVpZDpOdW1iZXIodGhpcy5kYXRhLnVpZCtcIlwiKSxwb3M6Y2MudjIodGhpcy5ub2RlLnBvc2l0aW9uLngsdGhpcy5ub2RlLnBvc2l0aW9uLnkpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSAgICAgICAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNJbml0ICAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkICAgICAgID0gMDsgICAgLy/lrZDlvLnpgJ/luqZcclxuICAgICAgICB0aGlzLmxlZnRCb3JkZXIgID0gMDsgICAgLy/lt6bovrnnlYxcclxuICAgICAgICB0aGlzLnJpZ2h0Qm9yZGVyID0gMDsgICAgLy/lj7PovrnnlYxcclxuICAgICAgICB0aGlzLnRvcEJvcmRlciAgID0gMDsgICAgLy/kuIrovrnnlYxcclxuICAgICAgICB0aGlzLmRvd25Cb3JkZXIgID0gMDsgICAgLy/kuIvovrnnlYxcclxuICAgICAgICB0aGlzLmRhdGEgICAgICAgID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYyl7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuYnVsbGV0UG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dpYyAgICAgICA9IG51bGw7Ly/mlbDmja7kuK3lv4NcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIGluaXRCdWxsZXQocmVzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhICAgICAgICAgICA9IHJlcztcclxuICAgICAgICB0aGlzLmxvY2tDb2xsZGVyICAgID0gMTtcclxuICAgICAgICBsZXQgc3ByICAgICAgICAgICAgID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxldCBjb2xsaWRlciAgICAgICAgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICBjb2xsaWRlci5lbmFibGVkICAgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gID0gdGhpcy5kYXRhLnBsYWNlT2ZCaXJ0aDtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgICAgID0gdGhpcy5kYXRhLmFuZ2xlOyAvL+WIneWni+WMluinkumAn+W6plxyXG4gICAgICAgIGxldCBsZXZlbCAgICAgICAgICAgPSB0aGlzLmRhdGEuZ3VuTGV2ZWwgPT0gbnVsbCA/IHRoaXMuZGF0YS5jYW5ub25MZXZlbCA6IHRoaXMuZGF0YS5ndW5MZXZlbDtcclxuICAgICAgICBpZihsZXZlbCA9PSBudWxsIHx8IGxldmVsID09IDApe1xyXG4gICAgICAgICAgICBsZXZlbCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BlZWQgICAgICAgICAgPSAyNTAwO1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIpe1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgICAgID0gdGhpcy5maXNoX0F0bGFzLmdldFNwcml0ZUZyYW1lKENPTlNULlNwZWNpYWxCdWxsZXRTa2luLlBhcnRpYWxCb21iKTsvL+eCjueIhuS4k+eUqFxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuZGF0YS5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSkge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgICAgID0gdGhpcy5maXNoX0F0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMubWlzc2lsZVByZSt0aGlzLm1pc3NpbGVJbmRleCk7Ly/ku5nliZHkuJPnlKhcclxuICAgICAgICAgICAgdGhpcy5taXNzaWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgTWlzc2lsZVNwZWVkICA9IDI3NTA7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgICAgICAgICAgPSBNaXNzaWxlU3BlZWQ7XHJcbiAgICAgICAgICAgIGlmKHNwci5zcHJpdGVGcmFtZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj7ojrflj5bku5nliZHlrZDlvLnlm77pm4blpLHotKUga2V5OiBcIit0aGlzLm1pc3NpbGVQcmUrdGhpcy5taXNzaWxlSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5kYXRhLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcpIHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lICAgICA9IHRoaXMuZmlzaF9BdGxhcy5nZXRTcHJpdGVGcmFtZShDT05TVC5TcGVjaWFsQnVsbGV0U2tpbi5MaWdodG5pbmcpOy8v6Zeq55S15LiT55SoXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSAgICAgPSB0aGlzLmZpc2hfQXRsYXMuZ2V0U3ByaXRlRnJhbWUoQ09OU1QuU3BlY2lhbEJ1bGxldFNraW4uTm9ybWFsK2xldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3ByLnNwcml0ZUZyYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCLor6XlrZDlvLnml6Dms5Xojrflj5bliLDnuqfliKvvvIzlj6/og70gcmVzIOe7k+aehOacieivryA6IFwiLHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyLnNpemUgICAgICAgPSBzcHIuc3ByaXRlRnJhbWUuZ2V0T3JpZ2luYWxTaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbGxpZGVyLnRhZyAgICAgICAgPSAgXCJidWxsZXRfXCIrdGhpcy5kYXRhLmJ1bGxldElkO1xyXG4gICAgICAgIHRoaXMubm9kZS5uYW1lICAgICAgPSAgdGhpcy5kYXRhLmxvY2sgPyB0aGlzLmRhdGEubG9jaytcIlwiIDogQ09OU1QuU3BlY2lhbEJ1bGxldFNraW4uTm9ybWFsK3RoaXMuZGF0YS5zZWF0TnVtK1wiX1wiK2NvbGxpZGVyLnRhZztcclxuICAgICAgICB0aGlzLnJpZ2h0Qm9yZGVyICAgID0gY2Mud2luU2l6ZS53aWR0aC8yOyAgICAgICAgICAgICAgICAgICAgIC8v5Y+z6L6555WMXHJcbiAgICAgICAgdGhpcy5sZWZ0Qm9yZGVyICAgICA9IC1jYy53aW5TaXplLndpZHRoLzI7ICAgICAgICAgICAgICAgICAgICAvL+W3pui+ueeVjFxyXG4gICAgICAgIHRoaXMudG9wQm9yZGVyICAgICAgPSBjYy53aW5TaXplLmhlaWdodC8yOyAgICAgICAgICAgICAgICAgICAgLy/kuIrovrnnlYxcclxuICAgICAgICB0aGlzLmRvd25Cb3JkZXIgICAgID0gLWNjLndpblNpemUuaGVpZ2h0LzI7ICAgICAgICAgICAgICAgICAgIC8v5LiL6L6555WMXHJcbiAgICAgICAgbGV0IHpJbmRleCAgICAgICAgICA9IENPTlNULm5vZGVaSW5kZXguekluZGV4QnVsbGV0ICsgdGhpcy5ub2RlLnpJbmRleDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ICAgID0gekluZGV4ID4gY2MubWFjcm8uTUFYX1pJTkRFWCA/IGNjLm1hY3JvLk1BWF9aSU5ERVggLTEgOiB6SW5kZXg7XHJcbiAgICAgICAgdGhpcy5pc0luaXQgICAgICAgICA9IHRydWU7XHJcbiAgICAgICAgLy/nirbmgIHlkIzmraVcclxuICAgICAgICBpZihyZXMuc2VydmVyVGltZSAhPSB1bmRlZmluZWQgJiYgcmVzLmNyZWF0ZVRpbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG5tcG9zID0gY2MudjIoKGNjLndpblNpemUud2lkdGgvMikgKiBNYXRoLnJhbmRvbSgpLChjYy53aW5TaXplLmhlaWdodC8yKSAqIE1hdGgucmFuZG9tKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obm1wb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+ino+WGs+WNoei+uemHjee9rlxyXG4gICAgZml4U2lkZVJ1bk92ZXIoKXtcclxuICAgICAgICBjb25zdCBXaWR0aCA9IGNjLndpblNpemUud2lkdGgvMjtcclxuICAgICAgICBjb25zdCBIZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodC8yO1xyXG4gICAgICAgIGNvbnN0IE1heEFuZ2xlID0gMTgwO1xyXG4gICAgICAgIGNvbnN0IE1heERpcmVjdGlvbkhBTEZBcmcgPSAxMDA7XHJcbiAgICAgICAgY29uc3QgSEFMRiA9IDUwO1xyXG4gICAgICAgIGNvbnN0IERpcmVjdGlvblggPSAoTWF0aC5yYW5kb20oKSAqIE1heERpcmVjdGlvbkhBTEZBcmcpID4gSEFMRiA/IC0xIDogMTtcclxuICAgICAgICBjb25zdCBEaXJlY3Rpb25ZID0gKE1hdGgucmFuZG9tKCkgKiBNYXhEaXJlY3Rpb25IQUxGQXJnKSA+IEhBTEYgPyAtMSA6IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIFdpZHRoICogRGlyZWN0aW9uWCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIEhlaWdodCAqIERpcmVjdGlvblkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogTWF4QW5nbGUpO1xyXG4gICAgfSxcclxuICAgIGJ1bGxldE1vdmUoZHQpe1xyXG4gICAgICAgIC8v5piv5ZCm5Zyo5bGP5bmVXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnggPiB0aGlzLnJpZ2h0Qm9yZGVyKXtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGVmdENvbGxpc2lvblRpbWVzICAgICA9IDA7Ly/ph43nva7orqHmlbDlmahcclxuICAgICAgICAgICAgdGhpcy5idXR0b21lQ29sbGlzaW9uVGltZXMgID0gMDsvL+mHjee9ruiuoeaVsOWZqFxyXG4gICAgICAgICAgICB0aGlzLnRvcENvbGxpc2lvblRpbWVzICAgICAgPSAwOy8v6YeN572u6K6h5pWw5ZmoXHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnJpZ2h0Q29sbGlzaW9uVGltZXMgPiAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZml4U2lkZVJ1bk92ZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDb2xsaXNpb25UaW1lcz0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDb2xsaXNpb25UaW1lcysrO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gLXRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLm5vZGUueCA8IHRoaXMubGVmdEJvcmRlcil7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbWVDb2xsaXNpb25UaW1lcyAgPSAwOy8v6YeN572u6K6h5pWw5ZmoXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDb2xsaXNpb25UaW1lcyAgICA9IDA7Ly/ph43nva7orqHmlbDlmahcclxuICAgICAgICAgICAgdGhpcy50b3BDb2xsaXNpb25UaW1lcyAgICAgID0gMDsvL+mHjee9ruiuoeaVsOWZqFxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5sZWZ0Q29sbGlzaW9uVGltZXMgPiAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZml4U2lkZVJ1bk92ZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENvbGxpc2lvblRpbWVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxlZnRDb2xsaXNpb25UaW1lcysrO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gLXRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnkgPiB0aGlzLnRvcEJvcmRlcil7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxlZnRDb2xsaXNpb25UaW1lcyAgICAgPSAwOy8v6YeN572u6K6h5pWw5ZmoXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9tZUNvbGxpc2lvblRpbWVzICA9IDA7Ly/ph43nva7orqHmlbDlmahcclxuICAgICAgICAgICAgdGhpcy5yaWdodENvbGxpc2lvblRpbWVzICAgID0gMDsvL+mHjee9ruiuoeaVsOWZqFxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy50b3BDb2xsaXNpb25UaW1lcyA+IDEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYyAhPSBudWxsICYmIHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpeFNpZGVSdW5PdmVyKCk7Ly/mraPkuIrmlrnkuI3lpITnkIbljaHovrnpl67pophcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudG9wQ29sbGlzaW9uVGltZXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG9wQ29sbGlzaW9uVGltZXMrKztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDE4MC10aGlzLm5vZGUuYW5nbGU7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ub2RlLnkgPCB0aGlzLmRvd25Cb3JkZXIpe1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q29sbGlzaW9uVGltZXMgICAgID0gMDsvL+mHjee9ruiuoeaVsOWZqFxyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Q29sbGlzaW9uVGltZXMgICAgPSAwOy8v6YeN572u6K6h5pWw5ZmoXHJcbiAgICAgICAgICAgIHRoaXMudG9wQ29sbGlzaW9uVGltZXMgICAgICA9IDA7Ly/ph43nva7orqHmlbDlmahcclxuICAgICAgICAgICAgaWYodGhpcy5idXR0b21lQ29sbGlzaW9uVGltZXMgPiAxKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMgIT0gbnVsbCAmJiAhdGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZml4U2lkZVJ1bk92ZXIoKTsvL+ato+S4i+aWueS4jeWkhOeQhuWNoei+uemXrumimFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b21lQ29sbGlzaW9uVGltZXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9tZUNvbGxpc2lvblRpbWVzKys7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAxODAtdGhpcy5ub2RlLmFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueCArPSBkdCAqIHRoaXMuc3BlZWQgKiBNYXRoLnNpbigtdGhpcy5ub2RlLmFuZ2xlIC8gMTgwICogTWF0aC5QSSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gZHQgKiB0aGlzLnNwZWVkICogTWF0aC5jb3MoLXRoaXMubm9kZS5hbmdsZSAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgdGhpcy5idWxsZXRPbkNvbGxpc2lvbkVudGVyTWF4VGltZSAtPSBkdDtcclxuICAgICAgICBpZih0aGlzLmJ1bGxldE9uQ29sbGlzaW9uRW50ZXJNYXhUaW1lIDwgMCAmJiB0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCl7Ly8zOOenkiDpg73msqHmnInnorDmkp5cclxuICAgICAgICAgICAgdGhpcy5idWxsZXRPbkNvbGxpc2lvbkVudGVyTWF4VGltZSA9IENPTlNULkJ1bGxldE1heFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEhpdEZpc2goQ09OU1QuTm9vbkZpc2gpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJ1bGxldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1vdmVFbmRUaW1lQm9vbSA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVFbmRUaW1lQm9vbSAtPSBkdDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZUVuZFRpbWVCb29tIDwgQ09OU1QuTWlzc2lsZUNoYW5nZVJlZCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUuYyA9PSB1bmRlZmluZWQpdGhpcy5ub2RlLmMgPSBDT05TVC5NaXNzaWxlUmVkTWF4VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcihDT05TVC5NaXNzaWxlUmVkTWF4VmFsdWUsdGhpcy5ub2RlLmMsdGhpcy5ub2RlLmMsQ09OU1QuTWlzc2lsZVJlZE1heFZhbHVlKTsvL+aFouaFouWPmOe6olxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmMgLT0gZHQqQ09OU1QuTWlzc2lsZVJlZFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLmMgPD0gQ09OU1QuTWlzc2lsZVJlZFZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYyA9IENPTlNULk1pc3NpbGVSZWRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVFbmRUaW1lQm9vbSA8IDEpe1xyXG4gICAgICAgICAgICAgICAgLy/liKDpmaToh6rlt7FcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQnVsbGV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFbmRUaW1lQm9vbSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc0luaXQpe1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldE1vdmUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnVuTG9ja1RpbWUgPiAwICYmIHRoaXMuZGF0YSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy51bkxvY2tUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnVuTG9ja1RpbWUgPiAwLjUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmxvY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubG9jayAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5sb2NrU3RhdHVzVGltZSArPSBkdDtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKHRoaXMuZGF0YS5sb2NrK1wiXCIpO1xyXG4gICAgICAgICAgICBpZighZmlzaCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhdE51bSA9IE51bWJlcih0aGlzLmRhdGEuc2VhdE51bSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gc2VhdE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy51aV9waHlzaWNhbFBvb2wgIT0gdGhpcy5ub2RlLnBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj4+Pj4g54mp55CG5rGgIOWPmOW8giDml6Dms5Xmib7liLDpsbwgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCI+PiA9PemUgeWumuaJvuS4jeWIsOmxvD09ID4+IFwiK3RoaXMuZGF0YS5sb2NrKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8wLjUtMC4zICAgICgwLjLnp5LlkI4g6Kej6ZSBKVxyXG4gICAgICAgICAgICAgICAgdGhpcy51bkxvY2tUaW1lID0gQ09OU1QuVW5Mb2NrTWF4VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmxvY2tTdGF0dXNUaW1lID4gMC44KXsvL+mUgeWumueKtuaAgeS4i+i2hei/hzAuOOenkuino+mZpOmUgeWumlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmxvY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubWlzc2lsZSl7XHJcbiAgICAgICAgICAgIHRoaXMubWlzc2lsZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWlzc2lsZVRpbWUgPiB0aGlzLm1pc3NpbGVGcmVxdWVuY3kpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taXNzaWxlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZpc2hfQXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5taXNzaWxlUHJlK3RoaXMubWlzc2lsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWlzc2lsZUluZGV4ICAgKys7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1pc3NpbGVJbmRleCA+IHRoaXMubWlzc2lsZU1heEluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pc3NpbGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVhdGhGaXNoKHRhZyl7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhKXtcclxuICAgICAgICAgICAgaWYoTnVtYmVyKHRoaXMuZGF0YS5sb2NrKSA9PSBOdW1iZXIodGFnKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubG9jayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ov5vlhaXnorDmkp7mo4DmtYtcclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICBpZih0aGlzLmlzUG9vbCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPj4+5L2/55So5a+56LGh5rGg55qE5a+56LGhIOi/m+WFpeeisOaSnlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmRhdGEgPT0gdW5kZWZpbmVkIHx8IHRoaXMubG9ja0NvbGxkZXIgPT0gMCl7Ly/mlbDmja7kuKLlpLHkuI3lj4LkuI7norDmkp7mo4DmtYtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Bvb2wpe1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCI+Pj7kvb/nlKjlr7nosaHmsaDnmoTlr7nosaHlh7rplJnkuoYg44CCIDEgXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWZmZWN0UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5idWxsZXRPbkNvbGxpc2lvbkVudGVyTWF4VGltZSA9IENPTlNULkJ1bGxldE1heFRpbWU7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKXsgICAgICAgICAgICAgICAgLy/ku5nliZHlrZDlvLlcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHRoaXMuZGF0YS5zZWF0TnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuY3VyV2FpdFRpbWUgPSBEYXRlLm5vdygpOy8v6YeN572u5pe26Ze0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWZmZWN0UG9zaXRpb24gPSBvdGhlci5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuaGl0TWF4ID4gMCl7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXNobmV0RWZmZWN0LHtjYW5ub25UeXBlOk51bWJlcihcIlwiK3RoaXMuZGF0YS5jYW5ub25UeXBlKSxwb3NpdGlvbjplZmZlY3RQb3NpdGlvbixndW5MZXZlbDp0aGlzLmRhdGEuZ3VuTGV2ZWwsZ3VuVHlwZTp0aGlzLmRhdGEuZ3VuVHlwZSx6SW5kZXg6dGhpcy5ub2RlLnpJbmRleH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpLmdldEZpc2hJRCgpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJNaXNzaWxlSGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTWlzc2lsZUhpdEZpc2goaWQsQ09OU1QuQ2Fubm9uT3BlbnRpb24uTWlzc2lsZUhpdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaGl0TWF4IC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5oaXRNYXggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaGl0TWF4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAvL+W8gOWni+WAkuiuoeaXtiDnu5PmnZ/lkI7niIbngrhcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUVuZFRpbWVCb29tID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNleyAgLy/mma7pgJrlrZDlvLnlkozkuInkuKrnibnmrorlrZDlvLnnmoTpgLvovpHvvIjkuI3ljIXmi6zpvpnmuqrvvIlcclxuICAgICAgICAgICAgbGV0IGN1cnJGaXNoSWQgPSBOdW1iZXIob3RoZXIudGFnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sb2NrICE9IG51bGwpIHsvL+mUgeWumlxyXG4gICAgICAgICAgICAgICAgaWYoY3VyckZpc2hJZCA9PSBOdW1iZXIodGhpcy5kYXRhLmxvY2spKXsvL+eisOaSnuWIsOebruagh+mxvFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0NvbGxkZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiBjdXJyRmlzaElkIFwiLGN1cnJGaXNoSWQsXCIgbXkgbG9jayBcIix0aGlzLmRhdGEubG9jaylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrQ29sbGRlciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGlkID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpLmdldEZpc2hJRCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuc2VhdE51bSA9PSB0aGlzLmxvZ2ljLnNlYXROdW0pe1xyXG4gICAgICAgICAgICAgICAgb3RoZXIubm9kZS5nZXRDb21wb25lbnQoXCJuZmlzaF9Vbml0XCIpLmhpdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+aSreaUvumXqueUteOAgeeCjueIhu+8jOaSreaUvuWujOaIkOino+mUgVxyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxpZ2h0bmluZyB8fCB0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLlBhcnRpYWxCb21iKXtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25TcGVjaWFsQnVsbGV0RXhwLHtjYW5ub25UeXBlOnRoaXMuZGF0YS5jYW5ub25UeXBlLHVpZDp0aGlzLmRhdGEudWlkLHBvczpjYy52MihvdGhlci5ub2RlLnBvc2l0aW9uLngsb3RoZXIubm9kZS5wb3NpdGlvbi55KX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKXsvL+aZrumAmuWtkOW8uVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kSGl0RmlzaChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sb2NrICE9IG51bGwpIHsvL+mUgeWumuS9v+eUqOS4reW/g+eCuVxyXG4gICAgICAgICAgICAgICAgZWZmZWN0UG9zaXRpb24gPSBvdGhlci5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9ZWxzZXsgICAgICAgICAgICAgICAgICAgICAgIC8v5omL5Yqo5L2/55So6L6557yYICsg5YaFIOWBj+enu+mHj1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0ID0gMC4wMjhcclxuICAgICAgICAgICAgICAgIC8vIGxldCB1eCA9IHRoaXMubm9kZS54ICsgZHQgKiB0aGlzLnNwZWVkICogTWF0aC5zaW4oLXRoaXMubm9kZS5hbmdsZSAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHV5ID0gdGhpcy5ub2RlLnkgKyBkdCAqIHRoaXMuc3BlZWQgKiBNYXRoLmNvcygtdGhpcy5ub2RlLmFuZ2xlIC8gMTgwICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICAvLyBlZmZlY3RQb3NpdGlvbiA9IGNjLnYyKHV4LHV5KTtcclxuICAgICAgICAgICAgICAgIGVmZmVjdFBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKSB7Ly/mma7pgJrlrZDlvLlcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQucGxheUZpc2huZXRFZmZlY3Qse2Nhbm5vblR5cGU6TnVtYmVyKFwiXCIrdGhpcy5kYXRhLmNhbm5vblR5cGUpLHBvc2l0aW9uOmVmZmVjdFBvc2l0aW9uLGd1bkxldmVsOnRoaXMuZGF0YS5ndW5MZXZlbCxndW5UeXBlOnRoaXMuZGF0YS5ndW5UeXBlLHpJbmRleDp0aGlzLm5vZGUuekluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVCdWxsZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lj5HpgIHmma7pgJrlrZDlvLnnmoTnorDmkp7psbxcclxuICAgIHNlbmRIaXRGaXNoKGlkKXtcclxuICAgICAgICBpZih0aGlzLmRhdGEuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCAmJiBOdW1iZXIodGhpcy5kYXRhLnVpZCkgPT0gZ2xHYW1lLnVzZXIudXNlcklEKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5idWxsdGVOdW0gLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHJFdmVudCA9IHtcclxuICAgICAgICAgICAgXCJvcFwiOkNPTlNULkNhbm5vbk9wZW50aW9uLk5vcm1hbEhpdCxcclxuICAgICAgICAgICAgXCJmaXNoSWRcIjogaWQsXHJcbiAgICAgICAgICAgIFwic2hlbGxJZFwiOiB0aGlzLmRhdGEuYnVsbGV0SWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS51aWQgJiYgdGhpcy5kYXRhLnVpZCAhPSBnbEdhbWUudXNlci51c2VySUQpe1xyXG4gICAgICAgICAgICBvcHJFdmVudFtcInVpZFwiXSA9IE51bWJlcih0aGlzLmRhdGEudWlkKTtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwiPj7jgIAtLS0tLS0g5py65Zmo5Lq6IOeahOWtkOW8ueeisOaSniAgYnVsbGV0SWQ6IFwiLHRoaXMuZGF0YS5idWxsZXRJZClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIi0tPT0tLT7lj5HpgIHmma7pgJrlrZDlvLnnmoTnorDmkp7psbwgXCIsb3ByRXZlbnQpO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhnbEdhbWUucm9vbS5nZXRQbGF5ZXJPcChnbEdhbWUuc2NlbmV0YWcuRklTSDIpLG9wckV2ZW50KTsvL+WtkOW8ueeisOaSnlxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiPj7muLjmiI/mnKrliJ3lp4vljJbml6Dms5Xlj5HlsIRcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lj5HpgIHku5nliZHnmoTlrZDlvLnnorDmkp7psbwg5YWl5Y+jXHJcbiAgICB1c2VyTWlzc2lsZUhpdEZpc2goaWQsb3Ape1xyXG4gICAgICAgIGxldCBvcHJFdmVudCA9IHtcclxuICAgICAgICAgICAgXCJvcFwiOm9wLFxyXG4gICAgICAgICAgICBcImZpc2hJZHNcIjogW2lkXSxcclxuICAgICAgICAgICAgXCJ1aWRcIjp0aGlzLmRhdGEudWlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjYy5lcnJvcihcIi0tLeS7meWJkeaSnuWHuy0tLSB1aWQ6IFwiK3RoaXMuZGF0YS51aWQrXCIgZmlzaCBpZCBcIitpZCtcIiAgPj4g5Ymp5L2Z5qyh5pWwIFwiK3RoaXMuZGF0YS5oaXRNYXgpO1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMuaXNFbnRlclJvb20pe1xyXG4gICAgICAgICAgICBjYy5sb2coXCItLT09LS0+5Y+R6YCB5LuZ5YmR55qE5a2Q5by556Kw5pKeIFwiLG9wckV2ZW50KTtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coZ2xHYW1lLnJvb20uZ2V0UGxheWVyT3AoZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKSxvcHJFdmVudCk7Ly/ku5nliZHlrZDlvLnnorDmkp5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgfSxcclxufSk7Il19
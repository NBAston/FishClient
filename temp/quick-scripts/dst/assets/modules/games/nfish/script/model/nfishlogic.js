
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/model/nfishlogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cad5arApBFJYK5oy4BCeTIW', 'nfishlogic');
// modules/games/nfish/script/model/nfishlogic.js

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONST = require("nfishConst");

var fishlogic = function fishlogic() {
  console.warn("初始化捕鱼逻辑");
  this.initData();
  this.registerEvent();
},
    fish = fishlogic.prototype,
    g_instance = null; //初始化数据中心


fish.initData = function () {
  //动态配置 roomRule 字段说明：
  //         BaseConsume: 10,             // 每个炮弹的基础消耗
  //         EntranceRestrictions: 1000,  // 进入房间的最低限制金额
  //         Rank: 1,                     // 房间等级
  //         MaxShell: 20,                // 炮弹数量上限
  //         LightningMaxFish: 5,         // 闪电炮弹产生的连锁闪电最大的连锁目标数
  //         LightningRadius: 250,        // 闪电炮弹产生的连锁闪电的连锁目标半径范围（单位：像素）
  //         ExplodeRadius: 125,          // 炎爆炮弹的爆炸效果半径范围（单位：像素）
  //         FirepillarWidth: 100,        // 龙息的宽度（单位：像素）
  //         ExcaliburMaxFish: 20,        // 仙剑击中鱼的最大数量，即仙剑击中多少条鱼后，爆炸。
  //         ExcaliburRadius: 125,        // 仙剑爆炸时的爆炸半径范围（单位：像素）
  //         CornucopiaStopTime: 10,      // 聚宝盆捕获时，进行表现的时间，也就是暂停玩家发射炮弹的时间
  //         RuyiStopTime: 10,            // 玉如意捕获时，进行表现的时间，也就是暂停玩家发射炮弹的时间
  //         StandbyTime:
  //         下标0                         // 多长时间未发射炮弹，进行提示（单位：秒）
  //         下标1                         // 多长时间未发射炮弹，踢出房间（单位：秒）
  this.roomRule = null; //动态配置

  this.isSetAngle = true; //是否设置180°旋转

  this.isEnterRoom = false; //用于判断发包等操作前置条件

  this.dialogPanelIsShow = false; //金额不足不重复弹窗

  this.fishPoolData = null; //鱼池数据

  this.playerInfo = {}; //桌上用户信息

  this.gunType = CONST.CannonType.Normal; //正常 0 ， 1-4特殊

  this.isInFreeze = false; //是否冰冻

  this.lockFishID = null; //锁定对象

  this.lastLockFishID = null; //上一次锁定对象

  this.serverTime = 0; //服务器时间，用于状态同步

  this.gold = 0; //玩家进入该场携带的钱

  this.baseConsume = 0; //该房间的基础炮倍 用于提示余额不足 需要多少余额 才可以发射 当前炮倍的子弹

  this.isLock = false; //是否锁定

  this.isAuto = false; //是否自动

  this.isLockAutoChange = false; //是否自动 切换

  this.isRestoreIng = {}; //是否正在恢复炮台

  this.cannonLevel = 1; //自己炮台倍率

  this.seatNum = -1; //自己的信息

  this.roomId = 0; //当前房间id 用做储存本地数据 子弹自动射击和自动锁定/自动寻找下一条鱼 的键

  this.bullteNum = 0; //（自己的）子弹数量

  this.currentBullteType = CONST.CannonType.Not; //（自己的）当前已发射的特殊子弹类型

  this.isYuRuyiRuning = false; //玉如意是否在运行

  this.MaxBullte = 0; //子弹最大数量

  this.showTimeMsg = 0; //多长时间未发射炮弹，进行提示（单位：秒）

  this.exitTimeMsg = 0; //多长时间未发射炮弹，踢出房间（单位：秒）

  this.lastShootTime = 0; //最后一次发炮时间

  this.quickMove = false; //鱼潮来了

  this.isFishTideRuning = false; //鱼潮是否正在运行

  this.startFire = true; //鱼潮来了 停止自动射击

  this.json_fishResEdit = null; //资源描述表

  this.json_fishTable = null; //鱼表

  this.json_fishLineGroup = null; //鱼线组

  this.currPlayBgMusic = -1; //当前播放的

  this.bossIDList = []; //boss id 组

  this.specialFishListBorn = {}; //特殊鱼即将来临数据

  this.specialFishListBornLen = 0; //特殊鱼来临数据长度

  this.isGunMoving0 = -1; //0座位是否正在换特殊炮台 , 如果是 那么停止所有射击行为等待动画播放完毕后在继续

  this.isGunMoving1 = -1; //1座位是否正在换特殊炮台 , 如果是 那么停止所有射击行为等待动画播放完毕后在继续

  this.isGunMoving2 = -1; //2座位是否正在换特殊炮台 , 如果是 那么停止所有射击行为等待动画播放完毕后在继续

  this.isGunMoving3 = -1; //3座位是否正在换特殊炮台 , 如果是 那么停止所有射击行为等待动画播放完毕后在继续

  this.playSoundTime = 0; //记录播放 特殊音效时间 2个特殊鱼身上的音效时间间距为5秒

  this.curWaitTime = 0; //记录当前射击时间，如果超时则显示时间和退出场景

  this.tideRun = 0; //开始

  this.specialBulletPool = {}; //特殊子弹的生命

  this.tidePlayCorrect = {}; //动画播放器矫正器

  this.isFireLaser = false; //是否正在发射龙溪

  this.lastBullteType0 = undefined; //0号位置上一次使用的子弹类型

  this.lastBullteType1 = undefined; //1号位置上一次使用的子弹类型

  this.lastBullteType2 = undefined; //2号位置上一次使用的子弹类型

  this.lastBullteType3 = undefined; //3号位置上一次使用的子弹类型

  this.isUpdateMoney0 = true; //0位置是否立即更新余额 玉如意、聚宝盆 更新余额机制 用于 等待开奖之后更新

  this.isUpdateMoney1 = true; //1位置是否立即更新余额 玉如意、聚宝盆 更新余额机制 用于 等待开奖之后更新

  this.isUpdateMoney2 = true; //2位置是否立即更新余额 玉如意、聚宝盆 更新余额机制 用于 等待开奖之后更新

  this.isUpdateMoney3 = true; //3位置是否立即更新余额 玉如意、聚宝盆 更新余额机制 用于 等待开奖之后更新

  this.playBossBGM = -1; //是否是播放boss背景音乐
  // 对时间格式化的扩展

  this.fishPool = new cc.NodePool("fish"); //鱼对象池

  this.bulletPool = new cc.NodePool("bullet"); //子弹对象池

  this.currFishzIndex = {};
  this.ui_physicalPool; //物理池（鱼池、子弹池）

  Date.prototype.Format = function (fmt) {
    //author: meizz
    var o = {
      "M+": this.getMonth() + 1,
      //月份
      "d+": this.getDate(),
      //日
      "h+": this.getHours(),
      //小时
      "m+": this.getMinutes(),
      //分
      "s+": this.getSeconds(),
      //秒
      "q+": Math.floor((this.getMonth() + 3) / 3),
      //季度
      "S": this.getMilliseconds() //毫秒

    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }

    return fmt;
  };

  this.offLineMissileData = null; //断线重连临时仙剑数据

  this.gameZoomX = 1; //x轴的缩放值，用于针对设计尺寸做偏移量，确保所有手机屏幕都是同屏的

  this.gameZoomY = 1; //y轴的缩放值，用于针对设计尺寸做偏移量，确保所有手机屏幕都是同屏的

  this.bgIndex = -1; //最后一次播放背景声音的 下标
}; //网络事件监听


fish.registerEvent = function () {
  glGame.emitter.on(CONST.STCEvent.onSyncData, this.onSyncData, this);
  glGame.emitter.on(CONST.STCEvent.onTideScript, this.onTideScript, this);
  glGame.emitter.on(CONST.STCEvent.onFishGroupScript, this.onFishGroupScript, this);
  glGame.emitter.on(CONST.STCEvent.onAddFishLine, this.onAddFishLine, this);
  glGame.emitter.on(CONST.STCEvent.onShoot, this.onShoot, this);
  glGame.emitter.on(CONST.STCEvent.onUseSpecialCannon, this.onUseSpecialCannon, this);
  glGame.emitter.on(CONST.STCEvent.onKill, this.onKill, this);
  glGame.emitter.on(CONST.STCEvent.onEnterRoom, this.onEnterRoom, this);
  glGame.emitter.on(CONST.STCEvent.onLeaveRoom, this.onLeaveRoom, this);
  glGame.emitter.on(glGame.room.getPlayerOp(glGame.scenetag.FISH2), this.onPlayerOp, this);
  glGame.emitter.on(CONST.STCEvent.onCoinChanged, this.onCoinChanged, this);
  glGame.emitter.on(CONST.STCEvent.onChangeCannonLevel, this.onChangeCannonLevel, this);
  glGame.emitter.on(CONST.STCEvent.onMissileBomb, this.onMissileBomb, this);
  glGame.emitter.on(CONST.STCEvent.onOffline, this.onOffline, this);
  glGame.emitter.on(CONST.STCEvent.onOnline, this.onOnline, this);
  glGame.emitter.on(CONST.clientEvent.netDisconnect, this.netDisconnect, this);
  glGame.emitter.on(CONST.clientEvent.EnterForeground, this.onEnterForeground, this);
  glGame.emitter.on(CONST.clientEvent.EnterBackground, this.onEnterBackground, this);
  glGame.emitter.on(CONST.STCEvent.horseRaceLamp, this.horseRaceLamp, this);
}; //反注册事件


fish.unregisterEvent = function () {
  glGame.emitter.off(CONST.clientEvent.netDisconnect, this);
  glGame.emitter.off(CONST.clientEvent.EnterForeground, this);
  glGame.emitter.off(CONST.clientEvent.EnterBackground, this);
  glGame.emitter.off(CONST.STCEvent.onSyncData, this);
  glGame.emitter.off(CONST.STCEvent.onTideScript, this);
  glGame.emitter.off(CONST.STCEvent.onFishGroupScript, this);
  glGame.emitter.off(CONST.STCEvent.onAddFishLine, this);
  glGame.emitter.off(CONST.STCEvent.onShoot, this);
  glGame.emitter.off(CONST.STCEvent.onUseSpecialCannon, this);
  glGame.emitter.off(CONST.STCEvent.onKill, this);
  glGame.emitter.off(CONST.STCEvent.onEnterRoom, this);
  glGame.emitter.off(CONST.STCEvent.onLeaveRoom, this);
  glGame.emitter.off(glGame.room.getPlayerOp(glGame.scenetag.FISH2), this);
  glGame.emitter.off(CONST.STCEvent.onCoinChanged, this);
  glGame.emitter.off(CONST.STCEvent.onChangeCannonLevel, this);
  glGame.emitter.off(CONST.STCEvent.onMissileBomb, this);
  glGame.emitter.off(CONST.STCEvent.onOffline, this);
  glGame.emitter.off(CONST.STCEvent.onOnline, this);
  glGame.emitter.off(CONST.STCEvent.horseRaceLamp, this);
}; //断网操作


fish.offNetHadnler = function () {
  this.isEnterRoom = false;
  glGame.emitter.emit(CONST.clientEvent.clearbossComein);
  glGame.emitter.emit(CONST.clientEvent.showAlert, CONST.AlertType.NetOff);
}; //资讯通知


fish.horseRaceLamp = function (msg) {
  var gameLevel = glGame.room.getRoomType(glGame.scenetag.FISH2);
  var room = gameLevel[msg.betType];
  var horseLampLabel = "\u606D\u559C\u73A9\u5BB6 <color=#27d9ff>".concat(msg.nickname, "</c>\u5728").concat(room, "\u6355\u83B7<color=#ffdd20>").concat(msg.fishName, "</c>\u5171\u83B7\u5F97<color=#00ff42>").concat(this.getFloat(msg.winCoin), "</c>\u91D1\u5E01");
  glGame.notice.addContent(horseLampLabel);
}; //断网 - 可能无法恢复


fish.netDisconnect = function () {
  this.offNetHadnler();
}; //切后台


fish.onEnterBackground = function () {
  this.offNetHadnler();
}; //切前台


fish.onEnterForeground = function () {
  glGame.gameNet.disconnect(); //断网

  this.offNetHadnler();
}; //初始化子弹


fish.initBullet = function (msg) {
  for (var k in msg.userInfoMap) {
    var uid = Number(k);
    var playerInfo = msg.userInfoMap[uid]; //当前屏幕上的子弹

    if (playerInfo.shells && playerInfo.shells.length > 0) {
      for (var i = 0; i < playerInfo.shells.length; i++) {
        var bulletdata = playerInfo.shells[i];
        var bullet = {
          uid: uid,
          cannonType: CONST.CannonType.Normal,
          seatNum: Number(playerInfo.seatId),
          bulletId: bulletdata.id,
          gunLevel: bulletdata.level,
          gunType: bulletdata.type,
          createTime: bulletdata.createTime,
          serverTime: msg.serverTime
        };

        if (bulletdata.aimFishId != null) {
          if (this.fishPoolData[Number(bulletdata.aimFishId)] == null) {
            cc.error("找不到鱼，无法实例化锁定该鱼(id:" + bulletdata.aimFishId + ")的子弹");
          } else {
            bullet["lock"] = bulletdata.aimFishId;
          }
        }

        if (bulletdata.angle != null) {
          bullet["angle"] = bulletdata.angle;
        }

        var myid = glGame.user.userID;
        glGame.emitter.emit(CONST.clientEvent.initBulletList, bullet);
      }
    }

    if (playerInfo.cannonReward != null && Number(playerInfo.cannonReward) > 0) {
      //断线重连同步特殊炮台发射的子弹的特效
      var total = Number(this.formatMoney(Number(playerInfo.cannonReward + "")));
      cc.warn("0 =====> 计分 ： " + total, "  playerInfo ", playerInfo);
      glGame.emitter.emit(CONST.clientEvent.specialBulletStatistics, {
        isoffNet: 1,
        cannonType: playerInfo.cannonType,
        total: total,
        coin: this.playerInfo[uid].gold,
        uid: uid,
        seatNum: this.playerInfo[uid].seatNum
      });
    } //当前屏幕上特殊的子弹 - 仙剑子弹


    if (playerInfo.missileShell != null) {
      var _bullet = {
        uid: uid,
        seatNum: Number(playerInfo.seatId),
        cannonType: CONST.CannonType.Missile,
        createTime: playerInfo.missileShell.createTime,
        hitMax: playerInfo.missileShell.hitMax,
        serverTime: msg.serverTime,
        angle: playerInfo.missileShell.angle
      };

      if (Number(playerInfo.missileShell.hitMax) > 0) {
        if (_bullet.angle == undefined) {
          _bullet.angle = 0;
        }

        glGame.emitter.emit(CONST.clientEvent.initBulletList, _bullet);
      } else {
        glGame.emitter.emit(CONST.clientEvent.fishSound, "MissileBoom");
        var arg = {
          offLine: 1,
          //是否是断线重连
          cannonType: CONST.CannonType.Missile,
          uid: Number(uid + ""),
          pos: cc.v2(0, 0)
        };
        glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp, arg);
      }
    }
  }
}; //同步数据 剧本 鱼线 鱼


fish.onSyncData = function (res) {
  var msg = JSON.parse(JSON.stringify(res));
  this.playSoundTime = Date.now(); //重置时间

  this.curWaitTime = Date.now(); //重置时间

  console.warn("同步数据 剧本 鱼线 鱼 onSyncData >> ", msg);
  var myid = glGame.user.userID;
  this.roomRule = msg.roomRule;
  this.serverTime = msg.serverTime;
  this.baseConsume = this.roomRule.BaseConsume;
  this.MaxBullte = this.roomRule.MaxShell; //子弹上限数量

  this.roomId = msg.roomId; //房间号 或 断线重连 标识

  glGame.emitter.emit(CONST.clientEvent.checkAutoAndLock);

  if (this.playerInfo == null) {
    this.playerInfo = {};
  } //*****************************   鱼池 start   ***************************************


  this.fishPoolData = {};

  if (msg.randomFishMap != null) {
    //1: 随机鱼线 , 2: 随机鱼组（暂时没有） , 3 : 鱼潮
    for (var id in msg.randomFishMap) {
      msg.randomFishMap[id].serverTime = msg.serverTime;
      this.addLine(msg.randomFishMap[id], id, false);
    }
  } else if (msg.fishTide != null) {
    this.isFishTideRuning = true;
    this.addTide(msg, msg.fishTide.groupId);
  }

  cc.warn(">>> fishPoolData ", this.fishPoolData);
  glGame.emitter.emit(CONST.clientEvent.initFishPool); //*****************************   鱼池 end   *****************************************
  //桌上玩家

  for (var k in msg.userInfoMap) {
    var uid = Number(k);
    var playerInfo = msg.userInfoMap[uid];

    if (uid == Number(myid)) {
      this.lastShootTime = playerInfo.lastShootTime > 0 ? this.serverTime - playerInfo.lastShootTime : 0;

      if (this.lastShootTime > 0) {
        this.curWaitTime -= this.lastShootTime;
      }

      this.gold = playerInfo.coin;
      this.checkGold();
      this.seatNum = Number(playerInfo.seatId);

      if (playerInfo.shells && playerInfo.shells.length > 0) {
        this.bullteNum = playerInfo.shells.length;
      }

      this.cannonLevel = playerInfo.cannonLevel;
    }

    if (!this.playerInfo[uid]) this.playerInfo[uid] = {};
    var cannonLevel = playerInfo.cannonLevel != null ? playerInfo.cannonLevel : 1;
    this.playerInfo[uid].uid = uid;
    this.playerInfo[uid].cannonAmount = 0;
    this.playerInfo[uid].seatNum = Number(playerInfo.seatId);
    this.playerInfo[uid].gold = playerInfo.coin;
    this.playerInfo[uid].cannonLevel = cannonLevel == null || cannonLevel == 0 ? 1 : cannonLevel;
    this.playerInfo[uid].angle = playerInfo.angle;
    this.playerInfo[uid].aimedFishLineID = playerInfo.aimedFishLineID;
    this.playerInfo[uid].cannonType = CONST.CannonType.Normal;
    this.playerInfo[uid].hitMax = 0;
    this.playerInfo[uid].userStatus = CONST.UserStatus.OnLine; //特殊炮台以及 数量

    if (playerInfo.cannonType != null) {
      this.playerInfo[uid].cannonType = Number(playerInfo.cannonType);
    } else {
      this.playerInfo[uid].cannonType = CONST.CannonType.Normal;
    }

    if (playerInfo.cannonType != null && playerInfo.cannonAmount != null) {
      this.playerInfo[uid].cannonAmount = Number(playerInfo.cannonAmount);
    }

    if (playerInfo.cannonHitMax != null) {
      // 仙剑剩余的击中鱼数量  cannonType == CONST.CannonType.Missile
      this.playerInfo[uid].hitMax = Number(playerInfo.cannonHitMax);
    }

    glGame.emitter.emit(CONST.clientEvent.comeInPlayer, this.playerInfo[uid]);
  }

  this.showTimeMsg = this.roomRule.StandbyTime[0];
  this.exitTimeMsg = this.roomRule.StandbyTime[1];
  this.bgIndex = msg.bgIndex % 4;
  glGame.emitter.emit(CONST.clientEvent.changeBackGround, this.bgIndex);
  this.initBullet(msg);

  if (this.getIsRotation()) {
    glGame.emitter.emit(CONST.clientEvent.checkRotation);
    glGame.emitter.emit(CONST.clientEvent.changeCantainer);
  }

  glGame.emitter.emit(CONST.clientEvent.checkBgMusic);
  glGame.emitter.emit(CONST.clientEvent.closeLoading);
}; //添加线


fish.addLine = function (data, id, isSysAddPool) {
  if (this.json_fishLineGroup[data.groupId + ""] == null) {
    cc.error(">>鱼线不同步 找不到 鱼线组 groupId " + data.groupId);
    return;
  }

  if (this.json_fishLineGroup[data.groupId + ""].fishLine == null) {
    cc.error(">>鱼线不同步 找不到 鱼线组 groupId " + data.groupId);
    return;
  }

  if (this.json_fishLineGroup[data.groupId + ""].fishLine[data.pathId + ""] == null) {
    cc.error(">>鱼线不同步 找不到 鱼线组 groupId " + data.groupId + " pathId " + data.pathId);
    return;
  }

  var lineData = JSON.parse(JSON.stringify(this.json_fishLineGroup[data.groupId + ""].fishLine[data.pathId + ""]));

  if (lineData == null || this.json_fishLineGroup[data.groupId + ""].fishLine == undefined) {
    cc.error(">>1> 服务器客户端不同步鱼线配置 找不到 鱼组 groupId：", data.groupId, " pathId：", data.pathId);
  }

  if (lineData) {
    var fishData1 = this.json_fishTable[data.fishTypeId + ""];
    var fishData2 = this.json_fishTable[Number(data.fishTypeId)];
    var fishData = fishData1 == undefined ? fishData2 : fishData1;

    if (fishData) {
      lineData.fishTypeId = data.fishTypeId + "";
      lineData.serverTime = Number(data.serverTime + "");
      lineData.createTime = Number(data.createTime + "");
      lineData.id = Number(id); //用于 协议通讯使用

      if (data.isTide != null) {
        lineData.isTide = 1;
      }

      this.fishPoolData[Number(id)] = lineData;
      var specialIndex = CONST.SpecialFishTypeIds.indexOf(Number(data.fishTypeId));

      if (specialIndex != -1) {
        //有特殊鱼来啦
        glGame.emitter.emit(CONST.clientEvent.bossComein, {
          id: Number(id + ""),
          fishTypeId: Number(data.fishTypeId),
          showTime: lineData.showTime,
          serverTime: Number(data.serverTime + ""),
          createTime: Number(data.createTime + "")
        });
      }

      if (isSysAddPool) glGame.emitter.emit(CONST.clientEvent.addFishPool, lineData);
    } else {
      cc.error(">>2> 服务器客户端不同步鱼配置 找不到 鱼组  groupId：", data.groupId, " pathId ", data.pathId, "  fishTypeId：", data.fishTypeId);
    }
  }
}; //添加鱼潮


fish.addTide = function (msg, groupId) {
  if (this.json_fishLineGroup[groupId + ""] == null) {
    cc.error(">>鱼线不同步 找不到 鱼线组 groupId " + groupId);
    return;
  }

  if (this.json_fishLineGroup[groupId + ""].fishLine == null) {
    cc.error(">>鱼线不同步 找不到 鱼线组 groupId " + groupId);
    return;
  }

  var IsTide = 1;
  var localData = JSON.parse(JSON.stringify(this.json_fishLineGroup[groupId + ""].fishLine));

  if (this.json_fishLineGroup[groupId + ""].fishLine == undefined) {
    cc.error(">>3> 配置不同步 找不到 鱼组 ", groupId);
  }

  var killedFishIds = msg.killedFishIds;

  if (killedFishIds == undefined && msg.fishTide != undefined) {
    killedFishIds = msg.fishTide.killedFishIds;
  }

  var newFishPoolDataList = {};

  for (var id in localData) {
    var isAdd = true;

    if (killedFishIds != undefined) {
      if (killedFishIds.indexOf(id + "") != -1 || killedFishIds.indexOf(Number(id)) != -1) {
        //去除已经死掉的鱼
        isAdd = false;
      }
    }

    if (isAdd) {
      this.fishPoolData[Number(id)] = localData[Number(id)];
      this.fishPoolData[Number(id)].isTide = IsTide;
      this.fishPoolData[Number(id)].id = Number(id);
      this.fishPoolData[Number(id)].serverTime = Number(msg.serverTime + "");
      this.fishPoolData[Number(id)].createTime = msg.createTime != null ? Number(msg.createTime + "") : Number(msg.fishTide.createTime + "");
      newFishPoolDataList[Number(id)] = this.fishPoolData[Number(id)];
    }
  }

  return JSON.parse(JSON.stringify(newFishPoolDataList));
}; //添加鱼线（随机剧本时有）


fish.onAddFishLine = function (res) {
  var msg = JSON.parse(JSON.stringify(res));

  if (this.isFishTideRuning == true) {
    this.isFishTideRuning = false;
  }

  if (this.fishPoolData == null) {
    cc.error(">> 加鱼线失败 鱼池未初始化 ", this.fishPoolData);
    return;
  } // cc.log("> 添加鱼线  ",msg);


  this.serverTime = msg.serverTime;
  this.addLine(msg, msg.id, true);
}; //鱼潮来袭


fish.onTideScript = function (res) {
  if (!this.isEnterRoom) {
    return;
  }

  this.isFishTideRuning = true;
  var msg = JSON.parse(JSON.stringify(res));

  if (this.fishPoolData == null) {
    cc.error(">> 加鱼潮失败 鱼池未 初始化 ", this.fishPoolData);
    return;
  }

  this.tidePlayCorrect = {}; //重置播放矫正
  // cc.log("> 鱼潮来袭 ",msg);

  this.serverTime = msg.serverTime;
  this.bgIndex = msg.bgIndex % 4;
  glGame.emitter.emit(CONST.clientEvent.seaWaveFishGroup, msg);
}; //鱼组来袭


fish.onFishGroupScript = function (res) {
  if (!this.isEnterRoom) {
    return;
  }

  var msg = JSON.parse(JSON.stringify(res));

  if (this.isFishTideRuning == true) {
    this.isFishTideRuning = false;
  }

  glGame.emitter.emit(CONST.clientEvent.addFishTide, this.addTide(msg, msg.groupId));
}; //射击


fish.onShoot = function (res) {
  if (!this.isEnterRoom) {
    return;
  }

  if (this.fishPoolData == null) return;
  var msg = JSON.parse(JSON.stringify(res));
  var currTime = new Date().Format("mm:ss");
  cc.log(">>>　射击 ", msg, currTime);
  var myid = glGame.user.userID;
  msg.gunLevel = msg.cannonLevel;
  msg.gold = msg.coin;
  msg.bulletId = msg.id;

  if (this.playerInfo == null || this.playerInfo[Number(msg.uid)] == null) {
    cc.warn("座位无人，暂无法射击");
    return;
  }

  msg.seatNum = this.playerInfo[Number(msg.uid)].seatNum;

  if (Number(msg.uid) == Number(myid) && msg.coin != null) {
    this.gold = msg.coin;
    this.checkGold(); // cc.warn(">> 射击 更新我的钱 1")

    glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
    return;
  } else {
    glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet); // cc.warn(">> 射击 更新其他用户的钱 1")

    glGame.emitter.emit(CONST.clientEvent.updateShootGold, msg);
  }

  if (this.playerInfo[Number(msg.uid)] == undefined) {
    console.error("找不到服务器发过来的用户seatNum  ", msg.uid, " 座位 ", msg, " this.playerInfo ", this.playerInfo);
    cc.warn(">> this.playerInfo ", this.playerInfo);
  } else {
    if (msg.uid == undefined) {
      cc.error(">>>>> msg : ", msg);
      return;
    }

    msg.seatNum = this.playerInfo[Number(msg.uid)].seatNum;
    if (msg.coin != null) this.playerInfo[Number(msg.uid)].gold = msg.coin; // console.warn("> 17. 射击 ",msg);

    if (msg.cannonLevel == undefined) {
      this.playerInfo[Number(msg.uid)].cannonLevel;
    } else {
      this.playerInfo[Number(msg.uid)].cannonLevel = msg.cannonLevel;
    }

    glGame.emitter.emit(CONST.clientEvent.playShootBullet, msg);
  }

  glGame.emitter.emit(CONST.clientEvent.checkSpecialCannon, false);
}; //使用特殊炮台


fish.onUseSpecialCannon = function (res) {
  var msg = JSON.parse(JSON.stringify(res));
  var currTime = new Date().Format("mm:ss");

  if (this.playerInfo[Number(msg.uid)] == null || this.playerInfo[Number(msg.uid)].cannonAmount == null) {
    if (this.playerInfo[Number(msg.uid)] == null) {
      cc.warn("用户" + msg.uid + " 没有加入房间 就使用炮台 数据有误！！！playerInfo: ", this.playerInfo);
    } else {
      cc.error("还没得到过 特殊炮台 就使用炮台 数据有误！！！ ", msg);
    }
  } else {
    var seatNum = this.playerInfo[Number(msg.uid)].seatNum;
    msg.seatNum = seatNum;
    var lastCammpmType = Number("" + this.playerInfo[Number(msg.uid)].cannonType); //记录老的炮台类型

    this.playerInfo[Number(msg.uid)].cannonAmount = Number(msg.cannonAmount);
    this.playerInfo[Number(msg.uid)].cannonType = Number(msg.cannonType);
    cc.warn("==== 使用特殊炮台 seatNum :" + seatNum, " Info ", JSON.parse(JSON.stringify(this.playerInfo[Number(msg.uid)])));

    if (lastCammpmType == CONST.CannonType.Laser && this.seatNum != seatNum) {
      //维护其他人的子弹状态 - 仙剑
      glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool, seatNum);
    }

    if (this.seatNum == seatNum) {
      // cc.error(">使用特殊炮台 >> playerInfo ",this.playerInfo[Number(msg.uid)]," msg ",msg)
      glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
    }

    if (Number(msg.cannonAmount) == 0) {
      cc.log(">服务器广播 已经没有龙溪了 开始恢复 炮台 ", msg);

      if (this.currentBullteType == CONST.CannonType.Not) {
        glGame.emitter.emit(CONST.clientEvent.restoreCannon, {
          uid: Number(msg.uid),
          isNow: true,
          lastCammpmType: lastCammpmType
        });
      } else {
        glGame.emitter.emit(CONST.clientEvent.restoreCannon, {
          uid: Number(msg.uid),
          isNow: false,
          lastCammpmType: lastCammpmType
        });
      }
    } else {
      glGame.emitter.emit(CONST.clientEvent.accumulate, {
        seatNum: seatNum,
        cannonType: Number(msg.cannonType)
      });
      cc.log("> 特殊炮台的数量更新 ", this.playerInfo[Number(msg.uid)].cannonAmount, " msg ", msg, currTime);
      var specialCannonInfo = {
        uid: msg.uid,
        seatNum: msg.seatNum,
        isNew: false
      };
      glGame.emitter.emit(CONST.clientEvent.getSpecialCannon, specialCannonInfo);
    }
  }

  glGame.emitter.emit(CONST.clientEvent.checkSpecialCannon, false);
}; //鱼死亡


fish.onKill = function (res) {
  var msg = JSON.parse(JSON.stringify(res));
  var BossLavaBasaltfishTypeId = -1;
  var total = 0;
  var myid = Number(glGame.user.userID);
  if (this.fishPoolData == null) return;

  if (this.playerInfo[Number(msg.uid)] != null) {
    this.playerInfo[Number(msg.uid)].gold = msg.coin;
    msg.gold = msg.coin;
    msg.seatNum = this.playerInfo[Number(msg.uid)].seatNum;
  } else {
    cc.error("玩家未初始化");

    for (var k = 0; k < msg.rewardMap.length; k++) {
      var data = msg.rewardMap[k];
      var fishTypeId = this.fishPoolData[Number(data.fishId)] != null ? Number(this.fishPoolData[Number(data.fishId)].fishTypeId) : 0;

      if (isNaN(Number(data.fishId))) {
        cc.error(">1>数据错误 ", data, " msg : ", msg);
        continue;
      }

      var info = {
        fishId: Number(data.fishId),
        rewardGold: data.reward ? data.reward : 0,
        fishTypeId: fishTypeId,
        seatNum: msg.seatNum,
        killType: msg.cannonType
      };

      if (info.killType == CONST.CannonType.Bomb) {
        info.delayDieTime = k * CONST.DelayDieTime;
      }

      glGame.emitter.emit(CONST.clientEvent.onKillFish, info); //销毁鱼
    }

    if (myid == Number(msg.uid)) {
      this.gold = Number(msg.coin);
      this.checkGold(); // cc.error(">> 射击 更新我的钱 2")

      glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
    } else {
      // cc.error(">> 射击 更新其他用户的钱 2")
      glGame.emitter.emit(CONST.clientEvent.updateShootGold, msg);
    }

    return;
  }

  for (var _k = 0; _k < msg.rewardMap.length; _k++) {
    var _data = msg.rewardMap[_k];

    if (_data.reward != undefined) {
      total += Number(this.formatMoney(Number(_data.reward + "")));
    }

    if (isNaN(Number(_data.fishId))) {
      cc.error(">2>数据错误 ", _data, " msg : ", msg);
      continue;
    }

    var _fishTypeId = this.fishPoolData[Number(_data.fishId)] != null ? Number(this.fishPoolData[Number(_data.fishId)].fishTypeId) : 0;

    var localData = this.json_fishTable[this.fishPoolData[Number(_data.fishId)]];
    var _info = {
      fishId: Number(_data.fishId),
      rewardGold: _data.reward ? _data.reward : 0,
      seatNum: msg.seatNum,
      uid: msg.uid,
      fishTypeId: _fishTypeId,
      killType: msg.cannonType
    };

    if (_info.killType == CONST.CannonType.Bomb) {
      _info.delayDieTime = _k * CONST.DelayDieTime;
    }

    if (localData) {
      cc.warn("id:", Number(_data.fishId), ">死鱼fTId:", _fishTypeId, "n:", localData.fishName, "resGroupId:", localData.resGroupId);
    }

    if (_fishTypeId == CONST.BossGodOfWealth) {
      //boss1 财神特殊处理
      var sprinkInfo = _defineProperty({
        uid: msg.uid,
        fishId: Number(_data.fishId),
        seatNum: msg.seatNum,
        rewardGold: _data.reward ? _data.reward : 0,
        info: _info
      }, "uid", msg.uid);

      glGame.emitter.emit(CONST.clientEvent.onSshock);
      glGame.emitter.emit(CONST.clientEvent.sprinkleRedBag, sprinkInfo);
    }

    if (_fishTypeId == CONST.YuRuyi) {
      //玉如意 出转盘
      if (_data.rewardArray != null && _data.rewardMultiple != null) {
        // cc.error(">>=========== 停止 更新 余额 ============== 1 玉如意 >>");
        var turntableInfo = {
          uid: msg.uid,
          fishId: Number(_data.fishId),
          seatNum: msg.seatNum,
          rewardGold: _data.reward ? _data.reward : 0,
          rewardArray: _data.rewardArray,
          rewardMultiple: _data.rewardMultiple,
          msg: msg
        };

        if (myid == Number(msg.uid)) {
          this["isUpdateMoney" + msg.seatNum] = false;
          turntableInfo.type = CONST.AwardType.RUYI;
          glGame.emitter.emit(CONST.clientEvent.showTurntable, turntableInfo);
        } else {
          turntableInfo.type = CONST.AwardType.RUYI;
          glGame.emitter.emit(CONST.clientEvent.otherPlayerShowSpecialAward, turntableInfo);
        }
      } else {
        cc.warn("玉如意 缺少 rewardArray 或 rewardMultiple 数据 无法弹出转盘 data: ", _data);
      }
    }

    if (_fishTypeId == CONST.BossLavaBasalt) {
      //熔岩玄武 死亡
      BossLavaBasaltfishTypeId = _fishTypeId;
      glGame.emitter.emit(CONST.clientEvent.onSpecialBomb, _info);
    }

    if (_fishTypeId == CONST.TreasureBowl) {
      //聚宝盆 出拉霸
      // cc.error(">>=========== 停止 更新 余额 ============== 2 聚宝盆 >>");
      var _turntableInfo = {
        uid: msg.uid,
        fishId: Number(_data.fishId),
        seatNum: msg.seatNum,
        rewardGold: _data.reward ? _data.reward : 0,
        msg: msg
      };

      if (myid == Number(msg.uid)) {
        this["isUpdateMoney" + msg.seatNum] = false;
        cc.warn(">>>  聚宝盆 data.reward： " + _data.reward);
        _turntableInfo.type = CONST.AwardType.CORNUCOPIA;
        glGame.emitter.emit(CONST.clientEvent.showTurntable, _turntableInfo);
      } else {
        _turntableInfo.type = CONST.AwardType.CORNUCOPIA;
        glGame.emitter.emit(CONST.clientEvent.otherPlayerShowSpecialAward, _turntableInfo);
      }
    }

    var specialCannonInfo = {
      uid: msg.uid,
      fishId: Number(_data.fishId),
      seatNum: msg.seatNum
    };

    if (_data.newCannonType != null) {
      if (_data.newCannonType == CONST.CannonType.Bomb) {
        //熔岩玄武 全屏爆炸
        cc.error(">> XXX 熔岩玄武 全屏爆炸 newCannonType error  msg: ", msg);
      }

      if (this.playerInfo[Number(msg.uid)].cannonType != null && this.playerInfo[Number(msg.uid)].cannonType != Number(_data.newCannonType)) {
        specialCannonInfo.isNew = true;

        if (myid == Number(msg.uid)) {
          cc.warn("GETCANNON ===>>>  获得不同 炮台 ，改变炮台");
        }
      } else {
        specialCannonInfo.isNew = false;

        if (myid == Number(msg.uid)) {
          cc.warn("GETCANNON ===>>>  获得相同 炮台，覆盖之前的 ");
        }
      }

      this.playerInfo[Number(msg.uid)].cannonType = Number(_data.newCannonType);
      this.playerInfo[Number(msg.uid)].cannonAmount = Number(_data.newCannonAmount);

      if (_data.maxFish != null) {
        // 仙剑最大击中鱼数量
        this.playerInfo[Number(msg.uid)].hitMax = Number(_data.maxFish);
      } // if(myid == Number(msg.uid)) {
      //     glGame.emitter.emit(CONST.clientEvent.fishSound,"getSpcliaUser");//获得特殊炮台时播放
      // }


      glGame.emitter.emit(CONST.clientEvent.getSpecialCannon, specialCannonInfo);
      glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
    }

    if (_fishTypeId == CONST.BossGodOfWealth || _fishTypeId == CONST.YuRuyi || _fishTypeId == CONST.TreasureBowl) {//财神
      //玉如意
      //聚宝盆
      //这三个不出现飘分和金币。  财神特殊处理
    } else {
      glGame.emitter.emit(CONST.clientEvent.playCoinEffect, _info); //死鱼飘金币
    }

    if (_fishTypeId == CONST.BossGodOfWealth && _data.lives) {//财神还没死透，不能销毁
    } else {
      //财神死透或者其他的鱼死亡
      glGame.emitter.emit(CONST.clientEvent.onKillFish, _info); //销毁鱼
    }
  }

  if (msg.cannonType != null && msg.cannonType != CONST.CannonType.Normal && msg.cannonType != CONST.CannonType.Bomb) {
    //如果这一发子弹不是普通子弹那么统计数值显示特效
    var speciaInfo = {
      cannonType: msg.cannonType,
      total: total,
      coin: msg.coin,
      uid: msg.uid,
      seatNum: msg.seatNum,
      totalReward: this.formatMoney(msg.totalReward)
    };

    if (BossLavaBasaltfishTypeId == CONST.BossLavaBasalt) {
      //熔岩玄武 死亡
      cc.warn(">> 熔岩玄武 触发 特殊子弹统计 错误  msg: ", msg);
    }

    cc.warn("1 =====> 计分 ：  " + total, "  totalReward  " + speciaInfo.totalReward, " seatNum " + msg.seatNum + " msg.cannonType " + msg.cannonType);
    glGame.emitter.emit(CONST.clientEvent.specialBulletStatistics, speciaInfo);
  } //玉如意、聚宝盆 更新余额机制 用于 等待开奖之后更新


  if (this["isUpdateMoney" + msg.seatNum]) {
    if (myid == Number(msg.uid)) {
      this.gold = Number(msg.coin);
      this.checkGold(); // cc.error(">> 射击 更新我的钱 4")

      glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
    } else {
      // cc.error(">> 射击 更新其他用户的钱 4")
      glGame.emitter.emit(CONST.clientEvent.updateShootGold, msg);
    }
  }
}; //仙剑爆炸


fish.onMissileBomb = function (msg) {
  cc.warn(">onMissileBomb 仙剑爆炸 ", msg);
  if (this.fishPoolData == null) return;

  if (this.playerInfo == null || this.playerInfo[Number(msg.uid)] == null) {
    cc.warn("座位无人");
    return;
  }

  var seatNum = Number(this.playerInfo[Number(msg.uid)].seatNum);
  msg.seatNum = seatNum;
  cc.warn("======== delete ========= 仙剑爆炸 uid " + Number(msg.uid));
  glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool, seatNum);
}; //切换炮台


fish.onChangeCannonLevel = function (msg) {
  if (this.fishPoolData == null) return;

  if (this.playerInfo == null || this.playerInfo[Number(msg.uid)] == null) {
    cc.warn("座位无人，暂无法射击");
    return;
  }

  msg.seatNum = this.playerInfo[Number(msg.uid)].seatNum;
  msg.gunType = CONST.CannonType.Normal;
  glGame.emitter.emit(CONST.clientEvent.updateGunRate, msg);
}; //离开房间


fish.onLeaveRoom = function (msg) {
  if (this.playerInfo == null) {
    this.playerInfo = {};
  }

  if (this.playerInfo[Number(msg.uid)]) {
    msg.seatNum = this.playerInfo[Number(msg.uid)].seatNum;
    console.log("> 4. 离开房间 ", msg == undefined ? " nul " : msg, " this.playerInfo ", this.playerInfo);
    glGame.emitter.emit(CONST.clientEvent.leaveRoomPlayer, msg);
    glGame.emitter.emit(CONST.clientEvent.leaveRoomUnLock, msg);
    msg.remoeAll = 1;
    this.playerInfo[Number(msg.uid)] = null;
    glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
    cc.warn(">> playerInfo ", this.playerInfo);
  } else {
    cc.error(">>该用户 从未加入过房间 ", msg);
  }
}; //进入房间


fish.onEnterRoom = function (msg) {
  if (this.playerInfo == null) {
    this.playerInfo = {};
  }

  var cannonLevel = msg.cannonLevel != null ? msg.cannonLevel : 1;
  this.playerInfo[Number(msg.uid)] = msg;
  this.playerInfo[Number(msg.uid)].cannonAmount = 0;
  this.playerInfo[Number(msg.uid)].hitMax = 0;
  this.playerInfo[Number(msg.uid)].cannonType = CONST.CannonType.Normal;
  this.playerInfo[Number(msg.uid)].cannonLevel = cannonLevel == null || cannonLevel == 0 ? 1 : cannonLevel;
  this.playerInfo[Number(msg.uid)].seatNum = Number(msg.seatId);
  this.playerInfo[Number(msg.uid)].gold = msg.coin;
  this.playerInfo[Number(msg.uid)].userStatus = CONST.UserStatus.OnLine;
  console.log("> 5. 用户进入房间 ", msg == undefined ? " nul " : msg, " this.playerInfo ", this.playerInfo);
  cc.warn(">> 用户进入房间 this.playerInfo ", this.playerInfo);
  glGame.emitter.emit(CONST.clientEvent.comeInPlayer, this.playerInfo[Number(msg.uid)]);
}; //用户掉线显示连线中


fish.onOffline = function (msg) {
  if (this.playerInfo == null) {
    this.playerInfo = {};
  }

  if (this.playerInfo[Number(msg.uid)]) {
    this.playerInfo[Number(msg.uid)].userStatus = CONST.UserStatus.OffLine;
    glGame.emitter.emit(CONST.clientEvent.updateUserStatus, this.playerInfo[Number(msg.uid)]);
  }
}; //用户在线


fish.onOnline = function (msg) {
  if (this.playerInfo == null) {
    this.playerInfo = {};
  }

  if (this.playerInfo[Number(msg.uid)]) {
    this.playerInfo[Number(msg.uid)].userStatus = CONST.UserStatus.OnLine;
    glGame.emitter.emit(CONST.clientEvent.updateUserStatus, this.playerInfo[Number(msg.uid)]);
  }
}; //改变余额 - 后台充值


fish.onCoinChanged = function (msg) {
  console.log("onCoinChanged > 20. 改变余额 ", msg == undefined ? " nul " : msg);
  this.gold += msg.offset;
  this.dialogPanelIsShow = true;
  glGame.emitter.emit(CONST.clientEvent.onCoinChanged, msg); // cc.error(">> 射击 更新我的钱 5")

  glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
}; //操作回调


fish.onPlayerOp = function (msg) {
  if (msg.subGameCode != null && msg.subGameCode != 0) {
    cc.error(">>  onPlayerOp 操作 报错了 ", msg);
  }
}; //获取2个坐标的 夹角角度值，这个方法有点落后和一定的局限性，建议使用 setAngle 方法，效果差不多


fish.getP1ToP2Angle = function (startPos, endPos) {
  var comVec = new cc.Vec2(1, 0); //计算夹角的参考方向，这里选择x轴正方向,座位 2、3默认值180°旋转

  var dirVec = startPos.sub(endPos); //获得从startPos指向endPos的方向向量

  var radian = cc.v2(dirVec).signAngle(comVec); //获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)

  var ofxAng = 270; //偏移量

  var angle = -(Math.floor(cc.misc.radiansToDegrees(radian)) + ofxAng); //将弧度转换为角度

  return angle;
}; //格式化 金额 文本显示


fish.getFloat = function (value) {
  return Number(value).div(100).toString();
}; //返回保留两位小数的数值


fish.getFixNumber = function (value) {
  var facetionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var value1 = Number(value).div(10);
  value = Number(value).div(100);
  if (isNaN(value)) return;

  if (~~value === value) {
    return value.toString();
  } else if (~~value1 === value1) {
    return value.toFixed(facetionDigits - 1 < 0 ? 0 : facetionDigits - 1);
  } else {
    return value.toFixed(facetionDigits);
  }
}; //传入一个小数和一个大数获得之间的随机整数值


fish.getRandomNum = function (Min, Max) {
  var Range = Number(Max) - Number(Min);
  var Rand = Math.random();
  return Min + Math.round(Rand * Range);
}; //扩展 - 播放动画


fish.playSpine = function (spineNode, loop, playerdClose, spineName) {
  var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var nextPlyName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var nextLoop = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  spineNode.active = true;
  var spine = spineNode.getComponent(sp.Skeleton);
  spine.setCompleteListener(function (trackEntry, loopCount) {
    var name = trackEntry.animation ? trackEntry.animation.name : "";

    if (nextPlyName != null) {
      if (name == spineName) {
        spine.setAnimation(0, nextPlyName, nextLoop);

        if (playerdClose) {
          spineNode.active = false;
        }

        if (cb) {
          cb(name);
        }
      }
    } else {
      if (playerdClose) {
        spineNode.active = false;
      }

      if (cb) {
        cb(name);
      }
    }
  });
  spine.setAnimation(0, spineName, loop);
}; //检查余额恢复状态


fish.checkGold = function () {
  var coin = this.baseConsume * this.cannonLevel;

  if (this.gold >= coin) {
    this.dialogPanelIsShow = false;
  }
}; //创建特效


fish.creatorEffect = function () {
  var effect = new cc.Node();
  var spr = effect.addComponent(cc.Sprite);
  spr.type = cc.Sprite.Type.SIMPLE;
  spr.sizeMode = cc.Sprite.SizeMode.TRIMMED;
  var script = effect.addComponent("nfish_MovieClip");
  script.type = 2;
  return effect;
}; //角度旋转180 - 递归


fish.isNeedSet180Angle = function (node) {
  var isLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (this.getIsRotation()) {
    var len = node.childrenCount;
    this.onSet180Angle(node, isLog);

    for (var i = 0; i < len; i++) {
      this.onSet180Angle(node.children[i]);

      if (node.children[i].childrenCount > 0) {
        this.isNeedSet180Angle(node.children[i]);
      }
    }
  }
}; //开始设置


fish.onSet180Angle = function (node) {
  var isLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var name = node.name;
  var nodeDesc = CONST.IsNeedRotation[name];

  if (nodeDesc != null && node.isSetting == null) {
    if (nodeDesc.repeat == null) {
      node.isSetting = true;
    }

    node.angle = nodeDesc.angle;

    if (nodeDesc.scale != null) {
      //初始化 scaleX
      if (nodeDesc.scale.x != null) {
        node.scaleX = nodeDesc.scale.x;
      } //初始化 scaleY


      if (nodeDesc.scale.y != null) {
        node.scaleY = nodeDesc.scale.y;
      }
    }

    if (nodeDesc.offsex != null) {
      var widget = node.getComponent(cc.Widget);

      if (widget != null) {
        widget.enabled = false;
      } //初始化 x


      if (nodeDesc.offsex.x != null) {
        node.x = nodeDesc.offsex.x;
      } //初始化 y


      if (nodeDesc.offsex.y != null) {
        node.y = nodeDesc.offsex.y;
      }
    } // //初始化 widget


    if (nodeDesc.widget != null) {
      var _widget = node.getComponent(cc.Widget);

      if (_widget != null) {
        if (nodeDesc.widget.top != null) _widget.top = nodeDesc.widget.top;
        if (nodeDesc.widget.bottom != null) _widget.bottom = nodeDesc.widget.bottom;
        if (nodeDesc.widget.left != null) _widget.left = nodeDesc.widget.left;
        if (nodeDesc.widget.right != null) _widget.right = nodeDesc.widget.right;
        _widget.enabled = true;

        _widget.updateAlignment();
      }
    }

    if (isLog) {
      cc.error(">> name : " + name);
    }
  }
}; //是否有旋转


fish.getIsRotation = function () {
  return this.isSetAngle && (this.seatNum == CONST.Seat.RightTop || this.seatNum == CONST.Seat.LeftTop);
}; //角度计算器


fish.setAngle = function (x2, y2, x1, y1) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}; //格式化货币/100


fish.formatMoney = function (value) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (isNaN(value)) return;

  if (~~value === value) {
    return value.div(100).toString();
  } else {
    value = Number(value).div(100);
    return (Math.floor(value * 100) / 100).toFixed(num);
  }
}; //点击区域合法性


fish.getClickArea = function (fish, width, height) {
  var Harf = 2;
  var OffsexX = -50;
  var OffsexY = -50;

  if (cc.winSize.width / Harf - OffsexX - Math.abs(fish.x) > 0 && cc.winSize.height / Harf - OffsexY - Math.abs(fish.y) > 0) {
    return true;
  } else {
    return false;
  }
}; //销毁清理


fish.destroy = function () {
  this.ui_physicalPool = null;
  console.warn("destroy fishlogic");
  if (this.fishPool) this.fishPool.clear();
  if (this.bulletPool) this.bulletPool.clear();
  this.initData();
  this.unregisterEvent();
  g_instance = null;
  cc.log(">>销毁清理 fishlogic");
  delete this;
}; //数据中心 单例获取


module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new fishlogic();
  }

  return g_instance;
}; //销毁Fish数据层


module.exports.destroy = function () {
  if (g_instance) {
    console.warn('destroy fishlogic');
    g_instance.destroy();
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXG1vZGVsXFxuZmlzaGxvZ2ljLmpzIl0sIm5hbWVzIjpbIkNPTlNUIiwicmVxdWlyZSIsImZpc2hsb2dpYyIsImNvbnNvbGUiLCJ3YXJuIiwiaW5pdERhdGEiLCJyZWdpc3RlckV2ZW50IiwiZmlzaCIsInByb3RvdHlwZSIsImdfaW5zdGFuY2UiLCJyb29tUnVsZSIsImlzU2V0QW5nbGUiLCJpc0VudGVyUm9vbSIsImRpYWxvZ1BhbmVsSXNTaG93IiwiZmlzaFBvb2xEYXRhIiwicGxheWVySW5mbyIsImd1blR5cGUiLCJDYW5ub25UeXBlIiwiTm9ybWFsIiwiaXNJbkZyZWV6ZSIsImxvY2tGaXNoSUQiLCJsYXN0TG9ja0Zpc2hJRCIsInNlcnZlclRpbWUiLCJnb2xkIiwiYmFzZUNvbnN1bWUiLCJpc0xvY2siLCJpc0F1dG8iLCJpc0xvY2tBdXRvQ2hhbmdlIiwiaXNSZXN0b3JlSW5nIiwiY2Fubm9uTGV2ZWwiLCJzZWF0TnVtIiwicm9vbUlkIiwiYnVsbHRlTnVtIiwiY3VycmVudEJ1bGx0ZVR5cGUiLCJOb3QiLCJpc1l1UnV5aVJ1bmluZyIsIk1heEJ1bGx0ZSIsInNob3dUaW1lTXNnIiwiZXhpdFRpbWVNc2ciLCJsYXN0U2hvb3RUaW1lIiwicXVpY2tNb3ZlIiwiaXNGaXNoVGlkZVJ1bmluZyIsInN0YXJ0RmlyZSIsImpzb25fZmlzaFJlc0VkaXQiLCJqc29uX2Zpc2hUYWJsZSIsImpzb25fZmlzaExpbmVHcm91cCIsImN1cnJQbGF5QmdNdXNpYyIsImJvc3NJRExpc3QiLCJzcGVjaWFsRmlzaExpc3RCb3JuIiwic3BlY2lhbEZpc2hMaXN0Qm9ybkxlbiIsImlzR3VuTW92aW5nMCIsImlzR3VuTW92aW5nMSIsImlzR3VuTW92aW5nMiIsImlzR3VuTW92aW5nMyIsInBsYXlTb3VuZFRpbWUiLCJjdXJXYWl0VGltZSIsInRpZGVSdW4iLCJzcGVjaWFsQnVsbGV0UG9vbCIsInRpZGVQbGF5Q29ycmVjdCIsImlzRmlyZUxhc2VyIiwibGFzdEJ1bGx0ZVR5cGUwIiwidW5kZWZpbmVkIiwibGFzdEJ1bGx0ZVR5cGUxIiwibGFzdEJ1bGx0ZVR5cGUyIiwibGFzdEJ1bGx0ZVR5cGUzIiwiaXNVcGRhdGVNb25leTAiLCJpc1VwZGF0ZU1vbmV5MSIsImlzVXBkYXRlTW9uZXkyIiwiaXNVcGRhdGVNb25leTMiLCJwbGF5Qm9zc0JHTSIsImZpc2hQb29sIiwiY2MiLCJOb2RlUG9vbCIsImJ1bGxldFBvb2wiLCJjdXJyRmlzaHpJbmRleCIsInVpX3BoeXNpY2FsUG9vbCIsIkRhdGUiLCJGb3JtYXQiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiLCJvZmZMaW5lTWlzc2lsZURhdGEiLCJnYW1lWm9vbVgiLCJnYW1lWm9vbVkiLCJiZ0luZGV4IiwiZ2xHYW1lIiwiZW1pdHRlciIsIm9uIiwiU1RDRXZlbnQiLCJvblN5bmNEYXRhIiwib25UaWRlU2NyaXB0Iiwib25GaXNoR3JvdXBTY3JpcHQiLCJvbkFkZEZpc2hMaW5lIiwib25TaG9vdCIsIm9uVXNlU3BlY2lhbENhbm5vbiIsIm9uS2lsbCIsIm9uRW50ZXJSb29tIiwib25MZWF2ZVJvb20iLCJyb29tIiwiZ2V0UGxheWVyT3AiLCJzY2VuZXRhZyIsIkZJU0gyIiwib25QbGF5ZXJPcCIsIm9uQ29pbkNoYW5nZWQiLCJvbkNoYW5nZUNhbm5vbkxldmVsIiwib25NaXNzaWxlQm9tYiIsIm9uT2ZmbGluZSIsIm9uT25saW5lIiwiY2xpZW50RXZlbnQiLCJuZXREaXNjb25uZWN0IiwiRW50ZXJGb3JlZ3JvdW5kIiwib25FbnRlckZvcmVncm91bmQiLCJFbnRlckJhY2tncm91bmQiLCJvbkVudGVyQmFja2dyb3VuZCIsImhvcnNlUmFjZUxhbXAiLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJvZmZOZXRIYWRubGVyIiwiZW1pdCIsImNsZWFyYm9zc0NvbWVpbiIsInNob3dBbGVydCIsIkFsZXJ0VHlwZSIsIk5ldE9mZiIsIm1zZyIsImdhbWVMZXZlbCIsImdldFJvb21UeXBlIiwiYmV0VHlwZSIsImhvcnNlTGFtcExhYmVsIiwibmlja25hbWUiLCJmaXNoTmFtZSIsImdldEZsb2F0Iiwid2luQ29pbiIsIm5vdGljZSIsImFkZENvbnRlbnQiLCJnYW1lTmV0IiwiZGlzY29ubmVjdCIsImluaXRCdWxsZXQiLCJ1c2VySW5mb01hcCIsInVpZCIsIk51bWJlciIsInNoZWxscyIsImkiLCJidWxsZXRkYXRhIiwiYnVsbGV0IiwiY2Fubm9uVHlwZSIsInNlYXRJZCIsImJ1bGxldElkIiwiaWQiLCJndW5MZXZlbCIsImxldmVsIiwidHlwZSIsImNyZWF0ZVRpbWUiLCJhaW1GaXNoSWQiLCJlcnJvciIsImFuZ2xlIiwibXlpZCIsInVzZXIiLCJ1c2VySUQiLCJpbml0QnVsbGV0TGlzdCIsImNhbm5vblJld2FyZCIsInRvdGFsIiwiZm9ybWF0TW9uZXkiLCJzcGVjaWFsQnVsbGV0U3RhdGlzdGljcyIsImlzb2ZmTmV0IiwiY29pbiIsIm1pc3NpbGVTaGVsbCIsIk1pc3NpbGUiLCJoaXRNYXgiLCJmaXNoU291bmQiLCJhcmciLCJvZmZMaW5lIiwicG9zIiwidjIiLCJvblNwZWNpYWxCdWxsZXRFeHAiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJub3ciLCJCYXNlQ29uc3VtZSIsIk1heFNoZWxsIiwiY2hlY2tBdXRvQW5kTG9jayIsInJhbmRvbUZpc2hNYXAiLCJhZGRMaW5lIiwiZmlzaFRpZGUiLCJhZGRUaWRlIiwiZ3JvdXBJZCIsImluaXRGaXNoUG9vbCIsImNoZWNrR29sZCIsImNhbm5vbkFtb3VudCIsImFpbWVkRmlzaExpbmVJRCIsInVzZXJTdGF0dXMiLCJVc2VyU3RhdHVzIiwiT25MaW5lIiwiY2Fubm9uSGl0TWF4IiwiY29tZUluUGxheWVyIiwiU3RhbmRieVRpbWUiLCJjaGFuZ2VCYWNrR3JvdW5kIiwiZ2V0SXNSb3RhdGlvbiIsImNoZWNrUm90YXRpb24iLCJjaGFuZ2VDYW50YWluZXIiLCJjaGVja0JnTXVzaWMiLCJjbG9zZUxvYWRpbmciLCJkYXRhIiwiaXNTeXNBZGRQb29sIiwiZmlzaExpbmUiLCJwYXRoSWQiLCJsaW5lRGF0YSIsImZpc2hEYXRhMSIsImZpc2hUeXBlSWQiLCJmaXNoRGF0YTIiLCJmaXNoRGF0YSIsImlzVGlkZSIsInNwZWNpYWxJbmRleCIsIlNwZWNpYWxGaXNoVHlwZUlkcyIsImluZGV4T2YiLCJib3NzQ29tZWluIiwic2hvd1RpbWUiLCJhZGRGaXNoUG9vbCIsIklzVGlkZSIsImxvY2FsRGF0YSIsImtpbGxlZEZpc2hJZHMiLCJuZXdGaXNoUG9vbERhdGFMaXN0IiwiaXNBZGQiLCJzZWFXYXZlRmlzaEdyb3VwIiwiYWRkRmlzaFRpZGUiLCJjdXJyVGltZSIsImxvZyIsIm15VXBkYXRlTW9uZXkiLCJjaGVja1NwZWNpYWxCdWxsZXQiLCJ1cGRhdGVTaG9vdEdvbGQiLCJwbGF5U2hvb3RCdWxsZXQiLCJjaGVja1NwZWNpYWxDYW5ub24iLCJsYXN0Q2FtbXBtVHlwZSIsIkxhc2VyIiwiY2xlYXJTcGVjaWFsQnVsbGV0UG9vbCIsInJlc3RvcmVDYW5ub24iLCJpc05vdyIsImFjY3VtdWxhdGUiLCJzcGVjaWFsQ2Fubm9uSW5mbyIsImlzTmV3IiwiZ2V0U3BlY2lhbENhbm5vbiIsIkJvc3NMYXZhQmFzYWx0ZmlzaFR5cGVJZCIsInJld2FyZE1hcCIsImZpc2hJZCIsImlzTmFOIiwiaW5mbyIsInJld2FyZEdvbGQiLCJyZXdhcmQiLCJraWxsVHlwZSIsIkJvbWIiLCJkZWxheURpZVRpbWUiLCJEZWxheURpZVRpbWUiLCJvbktpbGxGaXNoIiwicmVzR3JvdXBJZCIsIkJvc3NHb2RPZldlYWx0aCIsInNwcmlua0luZm8iLCJvblNzaG9jayIsInNwcmlua2xlUmVkQmFnIiwiWXVSdXlpIiwicmV3YXJkQXJyYXkiLCJyZXdhcmRNdWx0aXBsZSIsInR1cm50YWJsZUluZm8iLCJBd2FyZFR5cGUiLCJSVVlJIiwic2hvd1R1cm50YWJsZSIsIm90aGVyUGxheWVyU2hvd1NwZWNpYWxBd2FyZCIsIkJvc3NMYXZhQmFzYWx0Iiwib25TcGVjaWFsQm9tYiIsIlRyZWFzdXJlQm93bCIsIkNPUk5VQ09QSUEiLCJuZXdDYW5ub25UeXBlIiwibmV3Q2Fubm9uQW1vdW50IiwibWF4RmlzaCIsInBsYXlDb2luRWZmZWN0IiwibGl2ZXMiLCJzcGVjaWFJbmZvIiwidG90YWxSZXdhcmQiLCJ1cGRhdGVHdW5SYXRlIiwibGVhdmVSb29tUGxheWVyIiwibGVhdmVSb29tVW5Mb2NrIiwicmVtb2VBbGwiLCJPZmZMaW5lIiwidXBkYXRlVXNlclN0YXR1cyIsIm9mZnNldCIsInN1YkdhbWVDb2RlIiwiZ2V0UDFUb1AyQW5nbGUiLCJzdGFydFBvcyIsImVuZFBvcyIsImNvbVZlYyIsIlZlYzIiLCJkaXJWZWMiLCJzdWIiLCJyYWRpYW4iLCJzaWduQW5nbGUiLCJvZnhBbmciLCJtaXNjIiwicmFkaWFuc1RvRGVncmVlcyIsInZhbHVlIiwiZGl2IiwidG9TdHJpbmciLCJnZXRGaXhOdW1iZXIiLCJmYWNldGlvbkRpZ2l0cyIsInZhbHVlMSIsInRvRml4ZWQiLCJnZXRSYW5kb21OdW0iLCJNaW4iLCJNYXgiLCJSYW5nZSIsIlJhbmQiLCJyYW5kb20iLCJyb3VuZCIsInBsYXlTcGluZSIsInNwaW5lTm9kZSIsImxvb3AiLCJwbGF5ZXJkQ2xvc2UiLCJzcGluZU5hbWUiLCJjYiIsIm5leHRQbHlOYW1lIiwibmV4dExvb3AiLCJhY3RpdmUiLCJzcGluZSIsImdldENvbXBvbmVudCIsInNwIiwiU2tlbGV0b24iLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwidHJhY2tFbnRyeSIsImxvb3BDb3VudCIsIm5hbWUiLCJhbmltYXRpb24iLCJzZXRBbmltYXRpb24iLCJjcmVhdG9yRWZmZWN0IiwiZWZmZWN0IiwiTm9kZSIsInNwciIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsIlR5cGUiLCJTSU1QTEUiLCJzaXplTW9kZSIsIlNpemVNb2RlIiwiVFJJTU1FRCIsInNjcmlwdCIsImlzTmVlZFNldDE4MEFuZ2xlIiwibm9kZSIsImlzTG9nIiwibGVuIiwiY2hpbGRyZW5Db3VudCIsIm9uU2V0MTgwQW5nbGUiLCJjaGlsZHJlbiIsIm5vZGVEZXNjIiwiSXNOZWVkUm90YXRpb24iLCJpc1NldHRpbmciLCJyZXBlYXQiLCJzY2FsZSIsIngiLCJzY2FsZVgiLCJ5Iiwic2NhbGVZIiwib2Zmc2V4Iiwid2lkZ2V0IiwiV2lkZ2V0IiwiZW5hYmxlZCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsInVwZGF0ZUFsaWdubWVudCIsIlNlYXQiLCJSaWdodFRvcCIsIkxlZnRUb3AiLCJzZXRBbmdsZSIsIngyIiwieTIiLCJ4MSIsInkxIiwiYXRhbjIiLCJQSSIsIm51bSIsImdldENsaWNrQXJlYSIsIndpZHRoIiwiaGVpZ2h0IiwiSGFyZiIsIk9mZnNleFgiLCJPZmZzZXhZIiwid2luU2l6ZSIsImFicyIsImRlc3Ryb3kiLCJjbGVhciIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBbkI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBVTtBQUNsQkMsRUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsU0FBYjtBQUNBLE9BQUtDLFFBQUw7QUFDQSxPQUFLQyxhQUFMO0FBQ0gsQ0FKTDtBQUFBLElBS0lDLElBQUksR0FBR0wsU0FBUyxDQUFDTSxTQUxyQjtBQUFBLElBTUlDLFVBQVUsR0FBRyxJQU5qQixFQU9BOzs7QUFDQUYsSUFBSSxDQUFDRixRQUFMLEdBQWdCLFlBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LEtBQWQ7QUFDakIsTUFBRyxLQUFLMVUsVUFBUixFQUFtQixLQUFLQSxVQUFMLENBQWdCMFUsS0FBaEI7QUFDbkIsT0FBSzlZLFFBQUw7QUFDQSxPQUFLNkgsZUFBTDtBQUNBekgsRUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQThELEVBQUFBLEVBQUUsQ0FBQzJLLEdBQUgsQ0FBTyxrQkFBUDtBQUNBLFNBQU8sSUFBUDtBQUNILENBVkQsRUFXQTs7O0FBQ0FrSyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsV0FBZixHQUE2QixZQUFXO0FBQ3BDLE1BQUksQ0FBQzdZLFVBQUwsRUFBaUI7QUFDYkEsSUFBQUEsVUFBVSxHQUFHLElBQUlQLFNBQUosRUFBYjtBQUNIOztBQUNELFNBQU9PLFVBQVA7QUFDSCxDQUxELEVBTUE7OztBQUNBMlksTUFBTSxDQUFDQyxPQUFQLENBQWVILE9BQWYsR0FBeUIsWUFBWTtBQUNqQyxNQUFJelksVUFBSixFQUFnQjtBQUNaTixJQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxtQkFBYjtBQUNBSyxJQUFBQSxVQUFVLENBQUN5WSxPQUFYO0FBQ0g7QUFDSixDQUxEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQ09OU1QgPSByZXF1aXJlKFwibmZpc2hDb25zdFwiKTtcclxubGV0IGZpc2hsb2dpYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwi5Yid5aeL5YyW5o2V6bG86YC76L6RXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICBmaXNoID0gZmlzaGxvZ2ljLnByb3RvdHlwZSxcclxuICAgIGdfaW5zdGFuY2UgPSBudWxsO1xyXG4vL+WIneWni+WMluaVsOaNruS4reW/g1xyXG5maXNoLmluaXREYXRhID0gZnVuY3Rpb24gKCl7XHJcbiAgICAvL+WKqOaAgemFjee9riByb29tUnVsZSDlrZfmrrXor7TmmI7vvJpcclxuICAgIC8vICAgICAgICAgQmFzZUNvbnN1bWU6IDEwLCAgICAgICAgICAgICAvLyDmr4/kuKrngq7lvLnnmoTln7rnoYDmtojogJdcclxuICAgIC8vICAgICAgICAgRW50cmFuY2VSZXN0cmljdGlvbnM6IDEwMDAsICAvLyDov5vlhaXmiL/pl7TnmoTmnIDkvY7pmZDliLbph5Hpop1cclxuICAgIC8vICAgICAgICAgUmFuazogMSwgICAgICAgICAgICAgICAgICAgICAvLyDmiL/pl7TnrYnnuqdcclxuICAgIC8vICAgICAgICAgTWF4U2hlbGw6IDIwLCAgICAgICAgICAgICAgICAvLyDngq7lvLnmlbDph4/kuIrpmZBcclxuICAgIC8vICAgICAgICAgTGlnaHRuaW5nTWF4RmlzaDogNSwgICAgICAgICAvLyDpl6rnlLXngq7lvLnkuqfnlJ/nmoTov57plIHpl6rnlLXmnIDlpKfnmoTov57plIHnm67moIfmlbBcclxuICAgIC8vICAgICAgICAgTGlnaHRuaW5nUmFkaXVzOiAyNTAsICAgICAgICAvLyDpl6rnlLXngq7lvLnkuqfnlJ/nmoTov57plIHpl6rnlLXnmoTov57plIHnm67moIfljYrlvoTojIPlm7TvvIjljZXkvY3vvJrlg4/ntKDvvIlcclxuICAgIC8vICAgICAgICAgRXhwbG9kZVJhZGl1czogMTI1LCAgICAgICAgICAvLyDngo7niIbngq7lvLnnmoTniIbngrjmlYjmnpzljYrlvoTojIPlm7TvvIjljZXkvY3vvJrlg4/ntKDvvIlcclxuICAgIC8vICAgICAgICAgRmlyZXBpbGxhcldpZHRoOiAxMDAsICAgICAgICAvLyDpvpnmga/nmoTlrr3luqbvvIjljZXkvY3vvJrlg4/ntKDvvIlcclxuICAgIC8vICAgICAgICAgRXhjYWxpYnVyTWF4RmlzaDogMjAsICAgICAgICAvLyDku5nliZHlh7vkuK3psbznmoTmnIDlpKfmlbDph4/vvIzljbPku5nliZHlh7vkuK3lpJrlsJHmnaHpsbzlkI7vvIzniIbngrjjgIJcclxuICAgIC8vICAgICAgICAgRXhjYWxpYnVyUmFkaXVzOiAxMjUsICAgICAgICAvLyDku5nliZHniIbngrjml7bnmoTniIbngrjljYrlvoTojIPlm7TvvIjljZXkvY3vvJrlg4/ntKDvvIlcclxuICAgIC8vICAgICAgICAgQ29ybnVjb3BpYVN0b3BUaW1lOiAxMCwgICAgICAvLyDogZrlrp3nm4bmjZXojrfml7bvvIzov5vooYzooajnjrDnmoTml7bpl7TvvIzkuZ/lsLHmmK/mmoLlgZznjqnlrrblj5HlsITngq7lvLnnmoTml7bpl7RcclxuICAgIC8vICAgICAgICAgUnV5aVN0b3BUaW1lOiAxMCwgICAgICAgICAgICAvLyDnjonlpoLmhI/mjZXojrfml7bvvIzov5vooYzooajnjrDnmoTml7bpl7TvvIzkuZ/lsLHmmK/mmoLlgZznjqnlrrblj5HlsITngq7lvLnnmoTml7bpl7RcclxuICAgIC8vICAgICAgICAgU3RhbmRieVRpbWU6XHJcbiAgICAvLyAgICAgICAgIOS4i+aghzAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSa6ZW/5pe26Ze05pyq5Y+R5bCE54Ku5by577yM6L+b6KGM5o+Q56S677yI5Y2V5L2N77ya56eS77yJXHJcbiAgICAvLyAgICAgICAgIOS4i+aghzEgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSa6ZW/5pe26Ze05pyq5Y+R5bCE54Ku5by577yM6Lii5Ye65oi/6Ze077yI5Y2V5L2N77ya56eS77yJXHJcbiAgICB0aGlzLnJvb21SdWxlICAgICAgICAgICAgICAgPSBudWxsOyAgICAgLy/liqjmgIHphY3nva5cclxuICAgIHRoaXMuaXNTZXRBbmdsZSAgICAgICAgICAgICA9IHRydWU7ICAgICAvL+aYr+WQpuiuvue9rjE4MMKw5peL6L2sXHJcbiAgICB0aGlzLmlzRW50ZXJSb29tICAgICAgICAgICAgPSBmYWxzZTsgICAgLy/nlKjkuo7liKTmlq3lj5HljIXnrYnmk43kvZzliY3nva7mnaHku7ZcclxuICAgIHRoaXMuZGlhbG9nUGFuZWxJc1Nob3cgICAgICA9IGZhbHNlOyAgICAvL+mHkemineS4jei2s+S4jemHjeWkjeW8ueeql1xyXG4gICAgdGhpcy5maXNoUG9vbERhdGEgICAgICAgICAgID0gbnVsbDsgICAgIC8v6bG85rGg5pWw5o2uXHJcbiAgICB0aGlzLnBsYXllckluZm8gICAgICAgICAgICAgPSB7fTsgICAgICAgLy/moYzkuIrnlKjmiLfkv6Hmga9cclxuICAgIHRoaXMuZ3VuVHlwZSAgICAgICAgICAgICAgICA9IENPTlNULkNhbm5vblR5cGUuTm9ybWFsOy8v5q2j5bi4IDAg77yMIDEtNOeJueauilxyXG4gICAgdGhpcy5pc0luRnJlZXplICAgICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm5Yaw5Ya7XHJcbiAgICB0aGlzLmxvY2tGaXNoSUQgICAgICAgICAgICAgPSBudWxsOyAgICAgLy/plIHlrprlr7nosaFcclxuICAgIHRoaXMubGFzdExvY2tGaXNoSUQgICAgICAgICA9IG51bGw7ICAgICAvL+S4iuS4gOasoemUgeWumuWvueixoVxyXG4gICAgdGhpcy5zZXJ2ZXJUaW1lICAgICAgICAgICAgID0gMDsgICAgICAgIC8v5pyN5Yqh5Zmo5pe26Ze077yM55So5LqO54q25oCB5ZCM5q2lXHJcbiAgICB0aGlzLmdvbGQgICAgICAgICAgICAgICAgICAgPSAwOyAgICAgICAgLy/njqnlrrbov5vlhaXor6XlnLrmkLrluKbnmoTpkrFcclxuICAgIHRoaXMuYmFzZUNvbnN1bWUgICAgICAgICAgICA9IDA7ICAgICAgICAvL+ivpeaIv+mXtOeahOWfuuehgOeCruWAjSDnlKjkuo7mj5DnpLrkvZnpop3kuI3otrMg6ZyA6KaB5aSa5bCR5L2Z6aKdIOaJjeWPr+S7peWPkeWwhCDlvZPliY3ngq7lgI3nmoTlrZDlvLlcclxuICAgIHRoaXMuaXNMb2NrICAgICAgICAgICAgICAgICA9IGZhbHNlOyAgICAvL+aYr+WQpumUgeWumlxyXG4gICAgdGhpcy5pc0F1dG8gICAgICAgICAgICAgICAgID0gZmFsc2U7ICAgIC8v5piv5ZCm6Ieq5YqoXHJcbiAgICB0aGlzLmlzTG9ja0F1dG9DaGFuZ2UgICAgICAgPSBmYWxzZTsgICAgLy/mmK/lkKboh6rliqgg5YiH5o2iXHJcbiAgICB0aGlzLmlzUmVzdG9yZUluZyAgICAgICAgICAgPSB7fTsgICAgICAgLy/mmK/lkKbmraPlnKjmgaLlpI3ngq7lj7BcclxuICAgIHRoaXMuY2Fubm9uTGV2ZWwgICAgICAgICAgICA9IDE7ICAgICAgICAvL+iHquW3seeCruWPsOWAjeeOh1xyXG4gICAgdGhpcy5zZWF0TnVtICAgICAgICAgICAgICAgID0gLTE7ICAgICAgIC8v6Ieq5bex55qE5L+h5oGvXHJcbiAgICB0aGlzLnJvb21JZCAgICAgICAgICAgICAgICAgPSAwOyAgICAgICAgLy/lvZPliY3miL/pl7RpZCDnlKjlgZrlgqjlrZjmnKzlnLDmlbDmja4g5a2Q5by56Ieq5Yqo5bCE5Ye75ZKM6Ieq5Yqo6ZSB5a6aL+iHquWKqOWvu+aJvuS4i+S4gOadoemxvCDnmoTplK5cclxuICAgIHRoaXMuYnVsbHRlTnVtICAgICAgICAgICAgICA9IDA7ICAgICAgICAvL++8iOiHquW3seeahO+8ieWtkOW8ueaVsOmHj1xyXG4gICAgdGhpcy5jdXJyZW50QnVsbHRlVHlwZSAgICAgID0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3Q7ICAgLy/vvIjoh6rlt7HnmoTvvInlvZPliY3lt7Llj5HlsITnmoTnibnmrorlrZDlvLnnsbvlnotcclxuICAgIHRoaXMuaXNZdVJ1eWlSdW5pbmcgICAgICAgICA9IGZhbHNlOyAgICAvL+eOieWmguaEj+aYr+WQpuWcqOi/kOihjFxyXG4gICAgdGhpcy5NYXhCdWxsdGUgICAgICAgICAgICAgID0gMDsgICAgICAgIC8v5a2Q5by55pyA5aSn5pWw6YePXHJcbiAgICB0aGlzLnNob3dUaW1lTXNnICAgICAgICAgICAgPSAwOyAgICAgICAgLy/lpJrplb/ml7bpl7TmnKrlj5HlsITngq7lvLnvvIzov5vooYzmj5DnpLrvvIjljZXkvY3vvJrnp5LvvIlcclxuICAgIHRoaXMuZXhpdFRpbWVNc2cgICAgICAgICAgICA9IDA7ICAgICAgICAvL+WkmumVv+aXtumXtOacquWPkeWwhOeCruW8ue+8jOi4ouWHuuaIv+mXtO+8iOWNleS9je+8muenku+8iVxyXG4gICAgdGhpcy5sYXN0U2hvb3RUaW1lICAgICAgICAgID0gMDsgICAgICAgIC8v5pyA5ZCO5LiA5qyh5Y+R54Ku5pe26Ze0XHJcbiAgICB0aGlzLnF1aWNrTW92ZSAgICAgICAgICAgICAgPSBmYWxzZTsgICAgLy/psbzmva7mnaXkuoZcclxuICAgIHRoaXMuaXNGaXNoVGlkZVJ1bmluZyAgICAgICA9IGZhbHNlOyAgICAvL+mxvOa9ruaYr+WQpuato+WcqOi/kOihjFxyXG4gICAgdGhpcy5zdGFydEZpcmUgICAgICAgICAgICAgID0gdHJ1ZTsgICAgIC8v6bG85r2u5p2l5LqGIOWBnOatouiHquWKqOWwhOWHu1xyXG4gICAgdGhpcy5qc29uX2Zpc2hSZXNFZGl0ICAgICAgID0gbnVsbDsgICAgIC8v6LWE5rqQ5o+P6L+w6KGoXHJcbiAgICB0aGlzLmpzb25fZmlzaFRhYmxlICAgICAgICAgPSBudWxsOyAgICAgLy/psbzooahcclxuICAgIHRoaXMuanNvbl9maXNoTGluZUdyb3VwICAgICA9IG51bGw7ICAgICAvL+mxvOe6v+e7hFxyXG4gICAgdGhpcy5jdXJyUGxheUJnTXVzaWMgICAgICAgID0gLTE7Ly/lvZPliY3mkq3mlL7nmoRcclxuICAgIHRoaXMuYm9zc0lETGlzdCAgICAgICAgICAgICA9IFtdOyAgICAgICAvL2Jvc3MgaWQg57uEXHJcbiAgICB0aGlzLnNwZWNpYWxGaXNoTGlzdEJvcm4gICAgPSB7fTsgICAgICAgLy/nibnmrorpsbzljbPlsIbmnaXkuLTmlbDmja5cclxuICAgIHRoaXMuc3BlY2lhbEZpc2hMaXN0Qm9ybkxlbiA9IDA7ICAgICAgICAvL+eJueauiumxvOadpeS4tOaVsOaNrumVv+W6plxyXG4gICAgdGhpcy5pc0d1bk1vdmluZzAgICAgICAgICAgID0gLTE7ICAgICAgIC8vMOW6p+S9jeaYr+WQpuato+WcqOaNoueJueauiueCruWPsCAsIOWmguaenOaYryDpgqPkuYjlgZzmraLmiYDmnInlsITlh7vooYzkuLrnrYnlvoXliqjnlLvmkq3mlL7lrozmr5XlkI7lnKjnu6fnu61cclxuICAgIHRoaXMuaXNHdW5Nb3ZpbmcxICAgICAgICAgICA9IC0xOyAgICAgICAvLzHluqfkvY3mmK/lkKbmraPlnKjmjaLnibnmrorngq7lj7AgLCDlpoLmnpzmmK8g6YKj5LmI5YGc5q2i5omA5pyJ5bCE5Ye76KGM5Li6562J5b6F5Yqo55S75pKt5pS+5a6M5q+V5ZCO5Zyo57un57utXHJcbiAgICB0aGlzLmlzR3VuTW92aW5nMiAgICAgICAgICAgPSAtMTsgICAgICAgLy8y5bqn5L2N5piv5ZCm5q2j5Zyo5o2i54m55q6K54Ku5Y+wICwg5aaC5p6c5pivIOmCo+S5iOWBnOatouaJgOacieWwhOWHu+ihjOS4uuetieW+heWKqOeUu+aSreaUvuWujOavleWQjuWcqOe7p+e7rVxyXG4gICAgdGhpcy5pc0d1bk1vdmluZzMgICAgICAgICAgID0gLTE7ICAgICAgIC8vM+W6p+S9jeaYr+WQpuato+WcqOaNoueJueauiueCruWPsCAsIOWmguaenOaYryDpgqPkuYjlgZzmraLmiYDmnInlsITlh7vooYzkuLrnrYnlvoXliqjnlLvmkq3mlL7lrozmr5XlkI7lnKjnu6fnu61cclxuICAgIHRoaXMucGxheVNvdW5kVGltZSAgICAgICAgICA9IDA7Ly/orrDlvZXmkq3mlL4g54m55q6K6Z+z5pWI5pe26Ze0IDLkuKrnibnmrorpsbzouqvkuIrnmoTpn7PmlYjml7bpl7Tpl7Tot53kuLo156eSXHJcbiAgICB0aGlzLmN1cldhaXRUaW1lICAgICAgICAgICAgPSAwOy8v6K6w5b2V5b2T5YmN5bCE5Ye75pe26Ze077yM5aaC5p6c6LaF5pe25YiZ5pi+56S65pe26Ze05ZKM6YCA5Ye65Zy65pmvXHJcbiAgICB0aGlzLnRpZGVSdW4gICAgICAgICAgICAgICAgPSAwOy8v5byA5aeLXHJcbiAgICB0aGlzLnNwZWNpYWxCdWxsZXRQb29sICAgICAgPSB7fTsgIC8v54m55q6K5a2Q5by555qE55Sf5ZG9XHJcbiAgICB0aGlzLnRpZGVQbGF5Q29ycmVjdCAgICAgICAgPSB7fTsgIC8v5Yqo55S75pKt5pS+5Zmo55+r5q2j5ZmoXHJcbiAgICB0aGlzLmlzRmlyZUxhc2VyICAgICAgICAgICAgPSBmYWxzZTsgIC8v5piv5ZCm5q2j5Zyo5Y+R5bCE6b6Z5rqqXHJcbiAgICB0aGlzLmxhc3RCdWxsdGVUeXBlMCAgICAgICAgPSB1bmRlZmluZWQ7Ly8w5Y+35L2N572u5LiK5LiA5qyh5L2/55So55qE5a2Q5by557G75Z6LXHJcbiAgICB0aGlzLmxhc3RCdWxsdGVUeXBlMSAgICAgICAgPSB1bmRlZmluZWQ7Ly8x5Y+35L2N572u5LiK5LiA5qyh5L2/55So55qE5a2Q5by557G75Z6LXHJcbiAgICB0aGlzLmxhc3RCdWxsdGVUeXBlMiAgICAgICAgPSB1bmRlZmluZWQ7Ly8y5Y+35L2N572u5LiK5LiA5qyh5L2/55So55qE5a2Q5by557G75Z6LXHJcbiAgICB0aGlzLmxhc3RCdWxsdGVUeXBlMyAgICAgICAgPSB1bmRlZmluZWQ7Ly8z5Y+35L2N572u5LiK5LiA5qyh5L2/55So55qE5a2Q5by557G75Z6LXHJcbiAgICB0aGlzLmlzVXBkYXRlTW9uZXkwICAgICAgICAgPSB0cnVlOyAgICAgLy8w5L2N572u5piv5ZCm56uL5Y2z5pu05paw5L2Z6aKdIOeOieWmguaEj+OAgeiBmuWuneebhiDmm7TmlrDkvZnpop3mnLrliLYg55So5LqOIOetieW+heW8gOWlluS5i+WQjuabtOaWsFxyXG4gICAgdGhpcy5pc1VwZGF0ZU1vbmV5MSAgICAgICAgID0gdHJ1ZTsgICAgIC8vMeS9jee9ruaYr+WQpueri+WNs+abtOaWsOS9meminSDnjonlpoLmhI/jgIHogZrlrp3nm4Yg5pu05paw5L2Z6aKd5py65Yi2IOeUqOS6jiDnrYnlvoXlvIDlpZbkuYvlkI7mm7TmlrBcclxuICAgIHRoaXMuaXNVcGRhdGVNb25leTIgICAgICAgICA9IHRydWU7ICAgICAvLzLkvY3nva7mmK/lkKbnq4vljbPmm7TmlrDkvZnpop0g546J5aaC5oSP44CB6IGa5a6d55uGIOabtOaWsOS9memineacuuWItiDnlKjkuo4g562J5b6F5byA5aWW5LmL5ZCO5pu05pawXHJcbiAgICB0aGlzLmlzVXBkYXRlTW9uZXkzICAgICAgICAgPSB0cnVlOyAgICAgLy8z5L2N572u5piv5ZCm56uL5Y2z5pu05paw5L2Z6aKdIOeOieWmguaEj+OAgeiBmuWuneebhiDmm7TmlrDkvZnpop3mnLrliLYg55So5LqOIOetieW+heW8gOWlluS5i+WQjuabtOaWsFxyXG4gICAgdGhpcy5wbGF5Qm9zc0JHTSAgICAgICAgICAgID0gLTE7Ly/mmK/lkKbmmK/mkq3mlL5ib3Nz6IOM5pmv6Z+z5LmQXHJcbiAgICAvLyDlr7nml7bpl7TmoLzlvI/ljJbnmoTmianlsZVcclxuICAgIHRoaXMuZmlzaFBvb2wgICAgICAgICAgICAgICA9IG5ldyBjYy5Ob2RlUG9vbChcImZpc2hcIik7Ly/psbzlr7nosaHmsaBcclxuICAgIHRoaXMuYnVsbGV0UG9vbCAgICAgICAgICAgICA9IG5ldyBjYy5Ob2RlUG9vbChcImJ1bGxldFwiKTsvL+WtkOW8ueWvueixoeaxoFxyXG4gICAgdGhpcy5jdXJyRmlzaHpJbmRleCAgICAgICAgID0ge307XHJcbiAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbDsvL+eJqeeQhuaxoO+8iOmxvOaxoOOAgeWtkOW8ueaxoO+8iVxyXG4gICAgRGF0ZS5wcm90b3R5cGUuRm9ybWF0ICAgICAgID0gZnVuY3Rpb24gKGZtdCkgeyAvL2F1dGhvcjogbWVpenpcclxuICAgICAgICB2YXIgbyA9IHtcclxuICAgICAgICAgICAgXCJNK1wiOiB0aGlzLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImQrXCI6IHRoaXMuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImgrXCI6IHRoaXMuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtK1wiOiB0aGlzLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzK1wiOiB0aGlzLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxK1wiOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArIFwiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbylcclxuICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xyXG4gICAgICAgIHJldHVybiBmbXQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9mZkxpbmVNaXNzaWxlRGF0YSAgICAgPSBudWxsOy8v5pat57q/6YeN6L+e5Li05pe25LuZ5YmR5pWw5o2uXHJcbiAgICB0aGlzLmdhbWVab29tWCAgICAgICAgICAgICAgPSAxOy8veOi9tOeahOe8qeaUvuWAvO+8jOeUqOS6jumSiOWvueiuvuiuoeWwuuWvuOWBmuWBj+enu+mHj++8jOehruS/neaJgOacieaJi+acuuWxj+W5lemDveaYr+WQjOWxj+eahFxyXG4gICAgdGhpcy5nYW1lWm9vbVkgICAgICAgICAgICAgID0gMTsvL3novbTnmoTnvKnmlL7lgLzvvIznlKjkuo7pkojlr7norr7orqHlsLrlr7jlgZrlgY/np7vph4/vvIznoa7kv53miYDmnInmiYvmnLrlsY/luZXpg73mmK/lkIzlsY/nmoRcclxuICAgIHRoaXMuYmdJbmRleCAgICAgICAgICAgICAgICA9IC0xOy8v5pyA5ZCO5LiA5qyh5pKt5pS+6IOM5pmv5aOw6Z+z55qEIOS4i+agh1xyXG59XHJcbi8v572R57uc5LqL5Lu255uR5ZCsXHJcbmZpc2gucmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vblN5bmNEYXRhLCB0aGlzLm9uU3luY0RhdGEsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25UaWRlU2NyaXB0LCB0aGlzLm9uVGlkZVNjcmlwdCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vbkZpc2hHcm91cFNjcmlwdCwgdGhpcy5vbkZpc2hHcm91cFNjcmlwdCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vbkFkZEZpc2hMaW5lLCB0aGlzLm9uQWRkRmlzaExpbmUsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25TaG9vdCwgdGhpcy5vblNob290LCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULlNUQ0V2ZW50Lm9uVXNlU3BlY2lhbENhbm5vbiwgdGhpcy5vblVzZVNwZWNpYWxDYW5ub24sIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25LaWxsLCB0aGlzLm9uS2lsbCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vbkVudGVyUm9vbSwgdGhpcy5vbkVudGVyUm9vbSwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vbkxlYXZlUm9vbSwgdGhpcy5vbkxlYXZlUm9vbSwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihnbEdhbWUucm9vbS5nZXRQbGF5ZXJPcChnbEdhbWUuc2NlbmV0YWcuRklTSDIpLCB0aGlzLm9uUGxheWVyT3AsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25Db2luQ2hhbmdlZCx0aGlzLm9uQ29pbkNoYW5nZWQsdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5TVENFdmVudC5vbkNoYW5nZUNhbm5vbkxldmVsLHRoaXMub25DaGFuZ2VDYW5ub25MZXZlbCx0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULlNUQ0V2ZW50Lm9uTWlzc2lsZUJvbWIsdGhpcy5vbk1pc3NpbGVCb21iLHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25PZmZsaW5lLHRoaXMub25PZmZsaW5lLHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuU1RDRXZlbnQub25PbmxpbmUsdGhpcy5vbk9ubGluZSx0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50Lm5ldERpc2Nvbm5lY3QsIHRoaXMubmV0RGlzY29ubmVjdCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5FbnRlckZvcmVncm91bmQsIHRoaXMub25FbnRlckZvcmVncm91bmQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuRW50ZXJCYWNrZ3JvdW5kLCB0aGlzLm9uRW50ZXJCYWNrZ3JvdW5kLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULlNUQ0V2ZW50LmhvcnNlUmFjZUxhbXAsIHRoaXMuaG9yc2VSYWNlTGFtcCwgdGhpcyk7XHJcbn1cclxuLy/lj43ms6jlhozkuovku7ZcclxuZmlzaC51bnJlZ2lzdGVyRXZlbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50Lm5ldERpc2Nvbm5lY3QsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LkVudGVyRm9yZWdyb3VuZCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuRW50ZXJCYWNrZ3JvdW5kLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vblN5bmNEYXRhLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vblRpZGVTY3JpcHQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULlNUQ0V2ZW50Lm9uRmlzaEdyb3VwU2NyaXB0LCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vbkFkZEZpc2hMaW5lLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vblNob290LCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vblVzZVNwZWNpYWxDYW5ub24sIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULlNUQ0V2ZW50Lm9uS2lsbCwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuU1RDRXZlbnQub25FbnRlclJvb20sIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULlNUQ0V2ZW50Lm9uTGVhdmVSb29tLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihnbEdhbWUucm9vbS5nZXRQbGF5ZXJPcChnbEdhbWUuc2NlbmV0YWcuRklTSDIpLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vbkNvaW5DaGFuZ2VkLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vbkNoYW5nZUNhbm5vbkxldmVsLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vbk1pc3NpbGVCb21iLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5vbk9mZmxpbmUsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULlNUQ0V2ZW50Lm9uT25saW5lLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5TVENFdmVudC5ob3JzZVJhY2VMYW1wLCB0aGlzKTtcclxufVxyXG4vL+aWree9keaTjeS9nFxyXG5maXNoLm9mZk5ldEhhZG5sZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5pc0VudGVyUm9vbSA9IGZhbHNlO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGVhcmJvc3NDb21laW4pO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5zaG93QWxlcnQsQ09OU1QuQWxlcnRUeXBlLk5ldE9mZik7XHJcbn1cclxuLy/otYTorq/pgJrnn6VcclxuZmlzaC5ob3JzZVJhY2VMYW1wID0gZnVuY3Rpb24obXNnKXtcclxuICAgIGxldCBnYW1lTGV2ZWwgID0gZ2xHYW1lLnJvb20uZ2V0Um9vbVR5cGUoZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKTtcclxuICAgIGxldCByb29tID0gZ2FtZUxldmVsW21zZy5iZXRUeXBlXTtcclxuICAgIGxldCBob3JzZUxhbXBMYWJlbCA9IGDmga3llpznjqnlrrYgPGNvbG9yPSMyN2Q5ZmY+JHttc2cubmlja25hbWV9PC9jPuWcqCR7cm9vbX3mjZXojrc8Y29sb3I9I2ZmZGQyMD4ke21zZy5maXNoTmFtZX08L2M+5YWx6I635b6XPGNvbG9yPSMwMGZmNDI+JHt0aGlzLmdldEZsb2F0KG1zZy53aW5Db2luKX08L2M+6YeR5biBYDtcclxuICAgIGdsR2FtZS5ub3RpY2UuYWRkQ29udGVudChob3JzZUxhbXBMYWJlbCk7XHJcbn1cclxuLy/mlq3nvZEgLSDlj6/og73ml6Dms5XmgaLlpI1cclxuZmlzaC5uZXREaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMub2ZmTmV0SGFkbmxlcigpO1xyXG59XHJcbi8v5YiH5ZCO5Y+wXHJcbmZpc2gub25FbnRlckJhY2tncm91bmQgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5vZmZOZXRIYWRubGVyKCk7XHJcbn1cclxuLy/liIfliY3lj7BcclxuZmlzaC5vbkVudGVyRm9yZWdyb3VuZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5kaXNjb25uZWN0KCk7Ly/mlq3nvZFcclxuICAgIHRoaXMub2ZmTmV0SGFkbmxlcigpO1xyXG59XHJcbi8v5Yid5aeL5YyW5a2Q5by5XHJcbmZpc2guaW5pdEJ1bGxldCA9IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICBmb3IobGV0IGsgaW4gbXNnLnVzZXJJbmZvTWFwKXtcclxuICAgICAgICBsZXQgdWlkID0gTnVtYmVyKGspO1xyXG4gICAgICAgIGxldCBwbGF5ZXJJbmZvID0gbXNnLnVzZXJJbmZvTWFwW3VpZF07XHJcbiAgICAgICAgLy/lvZPliY3lsY/luZXkuIrnmoTlrZDlvLlcclxuICAgICAgICBpZihwbGF5ZXJJbmZvLnNoZWxscyAmJiBwbGF5ZXJJbmZvLnNoZWxscy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8cGxheWVySW5mby5zaGVsbHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0ZGF0YSA9IHBsYXllckluZm8uc2hlbGxzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbm5vblR5cGU6Q09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdE51bTpOdW1iZXIocGxheWVySW5mby5zZWF0SWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldElkOmJ1bGxldGRhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3VuTGV2ZWw6YnVsbGV0ZGF0YS5sZXZlbCxcclxuICAgICAgICAgICAgICAgICAgICBndW5UeXBlOmJ1bGxldGRhdGEudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUaW1lOmJ1bGxldGRhdGEuY3JlYXRlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJUaW1lOm1zZy5zZXJ2ZXJUaW1lXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0ZGF0YS5haW1GaXNoSWQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5maXNoUG9vbERhdGFbTnVtYmVyKGJ1bGxldGRhdGEuYWltRmlzaElkKV0gPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5om+5LiN5Yiw6bG877yM5peg5rOV5a6e5L6L5YyW6ZSB5a6a6K+l6bG8KGlkOlwiK2J1bGxldGRhdGEuYWltRmlzaElkK1wiKeeahOWtkOW8uVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0W1wibG9ja1wiXSA9IGJ1bGxldGRhdGEuYWltRmlzaElkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGJ1bGxldGRhdGEuYW5nbGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0W1wiYW5nbGVcIl0gPSBidWxsZXRkYXRhLmFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG15aWQgPSBnbEdhbWUudXNlci51c2VySUQ7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmluaXRCdWxsZXRMaXN0LGJ1bGxldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGxheWVySW5mby5jYW5ub25SZXdhcmQgIT0gbnVsbCAmJiBOdW1iZXIocGxheWVySW5mby5jYW5ub25SZXdhcmQpID4gMCl7Ly/mlq3nur/ph43ov57lkIzmraXnibnmrorngq7lj7Dlj5HlsITnmoTlrZDlvLnnmoTnibnmlYhcclxuICAgICAgICAgICAgbGV0IHRvdGFsID0gTnVtYmVyKHRoaXMuZm9ybWF0TW9uZXkoTnVtYmVyKHBsYXllckluZm8uY2Fubm9uUmV3YXJkK1wiXCIpKSk7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCIwID09PT09PiDorqHliIYg77yaIFwiK3RvdGFsLFwiICBwbGF5ZXJJbmZvIFwiLHBsYXllckluZm8pO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzLCB7aXNvZmZOZXQ6MSxjYW5ub25UeXBlOnBsYXllckluZm8uY2Fubm9uVHlwZSx0b3RhbDp0b3RhbCxjb2luOiB0aGlzLnBsYXllckluZm9bdWlkXS5nb2xkLHVpZDp1aWQsc2VhdE51bTp0aGlzLnBsYXllckluZm9bdWlkXS5zZWF0TnVtfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5b2T5YmN5bGP5bmV5LiK54m55q6K55qE5a2Q5by5IC0g5LuZ5YmR5a2Q5by5XHJcbiAgICAgICAgaWYocGxheWVySW5mby5taXNzaWxlU2hlbGwgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBidWxsZXQgPSB7XHJcbiAgICAgICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICAgICAgc2VhdE51bTpOdW1iZXIocGxheWVySW5mby5zZWF0SWQpLFxyXG4gICAgICAgICAgICAgICAgY2Fubm9uVHlwZTpDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUaW1lOnBsYXllckluZm8ubWlzc2lsZVNoZWxsLmNyZWF0ZVRpbWUsXHJcbiAgICAgICAgICAgICAgICBoaXRNYXg6cGxheWVySW5mby5taXNzaWxlU2hlbGwuaGl0TWF4LFxyXG4gICAgICAgICAgICAgICAgc2VydmVyVGltZTptc2cuc2VydmVyVGltZSxcclxuICAgICAgICAgICAgICAgIGFuZ2xlOnBsYXllckluZm8ubWlzc2lsZVNoZWxsLmFuZ2xlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihOdW1iZXIocGxheWVySW5mby5taXNzaWxlU2hlbGwuaGl0TWF4KSA+IDApe1xyXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LmFuZ2xlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmFuZ2xlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuaW5pdEJ1bGxldExpc3QsYnVsbGV0KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcIk1pc3NpbGVCb29tXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZMaW5lOiAxLC8v5piv5ZCm5piv5pat57q/6YeN6L+eXHJcbiAgICAgICAgICAgICAgICAgICAgY2Fubm9uVHlwZTpDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdWlkOk51bWJlcih1aWQrXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOmNjLnYyKDAsMCl9XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50Lm9uU3BlY2lhbEJ1bGxldEV4cCxhcmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8v5ZCM5q2l5pWw5o2uIOWJp+acrCDpsbznur8g6bG8XHJcbmZpc2gub25TeW5jRGF0YSA9IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICBsZXQgbXNnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIHRoaXMucGxheVNvdW5kVGltZSA9IERhdGUubm93KCk7Ly/ph43nva7ml7bpl7RcclxuICAgIHRoaXMuY3VyV2FpdFRpbWUgPSBEYXRlLm5vdygpOy8v6YeN572u5pe26Ze0XHJcbiAgICBjb25zb2xlLndhcm4oXCLlkIzmraXmlbDmja4g5Ymn5pysIOmxvOe6vyDpsbwgb25TeW5jRGF0YSA+PiBcIixtc2cpO1xyXG4gICAgbGV0IG15aWQgPSBnbEdhbWUudXNlci51c2VySUQ7XHJcbiAgICB0aGlzLnJvb21SdWxlID0gbXNnLnJvb21SdWxlO1xyXG4gICAgdGhpcy5zZXJ2ZXJUaW1lID0gbXNnLnNlcnZlclRpbWU7XHJcbiAgICB0aGlzLmJhc2VDb25zdW1lID0gdGhpcy5yb29tUnVsZS5CYXNlQ29uc3VtZTtcclxuICAgIHRoaXMuTWF4QnVsbHRlID0gdGhpcy5yb29tUnVsZS5NYXhTaGVsbDsvL+WtkOW8ueS4iumZkOaVsOmHj1xyXG4gICAgdGhpcy5yb29tSWQgPSBtc2cucm9vbUlkOy8v5oi/6Ze05Y+3IOaIliDmlq3nur/ph43ov54g5qCH6K+GXHJcbiAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNoZWNrQXV0b0FuZExvY2spO1xyXG4gICAgaWYodGhpcy5wbGF5ZXJJbmZvID09IG51bGwpe1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHt9O1xyXG4gICAgfVxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgIOmxvOaxoCBzdGFydCAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgdGhpcy5maXNoUG9vbERhdGEgPSB7fTtcclxuICAgIGlmKG1zZy5yYW5kb21GaXNoTWFwICE9IG51bGwpey8vMTog6ZqP5py66bG857q/ICwgMjog6ZqP5py66bG857uE77yI5pqC5pe25rKh5pyJ77yJICwgMyA6IOmxvOa9rlxyXG4gICAgICAgIGZvciAobGV0IGlkIGluIG1zZy5yYW5kb21GaXNoTWFwKXtcclxuICAgICAgICAgICAgbXNnLnJhbmRvbUZpc2hNYXBbaWRdLnNlcnZlclRpbWUgPSBtc2cuc2VydmVyVGltZTtcclxuICAgICAgICAgICAgdGhpcy5hZGRMaW5lKG1zZy5yYW5kb21GaXNoTWFwW2lkXSxpZCxmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2UgaWYobXNnLmZpc2hUaWRlICE9IG51bGwpe1xyXG4gICAgICAgIHRoaXMuaXNGaXNoVGlkZVJ1bmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRUaWRlKG1zZyxtc2cuZmlzaFRpZGUuZ3JvdXBJZCk7XHJcbiAgICB9XHJcbiAgICBjYy53YXJuKFwiPj4+IGZpc2hQb29sRGF0YSBcIix0aGlzLmZpc2hQb29sRGF0YSlcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuaW5pdEZpc2hQb29sKTtcclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICDpsbzmsaAgZW5kICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8v5qGM5LiK546p5a62XHJcbiAgICBmb3IobGV0IGsgaW4gbXNnLnVzZXJJbmZvTWFwKXtcclxuICAgICAgICBsZXQgdWlkID0gTnVtYmVyKGspO1xyXG4gICAgICAgIGxldCBwbGF5ZXJJbmZvID0gbXNnLnVzZXJJbmZvTWFwW3VpZF07XHJcbiAgICAgICAgaWYodWlkID09IE51bWJlcihteWlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFNob290VGltZSA9IHBsYXllckluZm8ubGFzdFNob290VGltZSA+IDAgPyB0aGlzLnNlcnZlclRpbWUgLSBwbGF5ZXJJbmZvLmxhc3RTaG9vdFRpbWUgOiAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RTaG9vdFRpbWUgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2FpdFRpbWUgLT0gdGhpcy5sYXN0U2hvb3RUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZCA9IHBsYXllckluZm8uY29pbjtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0dvbGQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWF0TnVtID0gTnVtYmVyKHBsYXllckluZm8uc2VhdElkKTtcclxuICAgICAgICAgICAgaWYocGxheWVySW5mby5zaGVsbHMgJiYgcGxheWVySW5mby5zaGVsbHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGx0ZU51bSA9IHBsYXllckluZm8uc2hlbGxzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbm5vbkxldmVsID0gcGxheWVySW5mby5jYW5ub25MZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVySW5mb1t1aWRdKXRoaXMucGxheWVySW5mb1t1aWRdID0ge307XHJcbiAgICAgICAgbGV0IGNhbm5vbkxldmVsID0gcGxheWVySW5mby5jYW5ub25MZXZlbCAhPSBudWxsID8gcGxheWVySW5mby5jYW5ub25MZXZlbCA6IDE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0udWlkICAgICAgICAgICAgID0gdWlkO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb1t1aWRdLmNhbm5vbkFtb3VudCAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uc2VhdE51bSAgICAgICAgID0gTnVtYmVyKHBsYXllckluZm8uc2VhdElkKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9bdWlkXS5nb2xkICAgICAgICAgICAgPSBwbGF5ZXJJbmZvLmNvaW47XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uY2Fubm9uTGV2ZWwgICAgID0gY2Fubm9uTGV2ZWwgPT0gbnVsbCB8fCBjYW5ub25MZXZlbCA9PSAwID8gMSA6IGNhbm5vbkxldmVsO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb1t1aWRdLmFuZ2xlICAgICAgICAgICA9IHBsYXllckluZm8uYW5nbGU7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uYWltZWRGaXNoTGluZUlEID0gcGxheWVySW5mby5haW1lZEZpc2hMaW5lSUQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uY2Fubm9uVHlwZSAgICAgID0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uaGl0TWF4ICAgICAgICAgID0gMDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9bdWlkXS51c2VyU3RhdHVzICAgICAgPSBDT05TVC5Vc2VyU3RhdHVzLk9uTGluZTtcclxuICAgICAgICAvL+eJueauiueCruWPsOS7peWPiiDmlbDph49cclxuICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vblR5cGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mb1t1aWRdLmNhbm5vblR5cGUgPSBOdW1iZXIocGxheWVySW5mby5jYW5ub25UeXBlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uY2Fubm9uVHlwZSA9IENPTlNULkNhbm5vblR5cGUuTm9ybWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vblR5cGUgIT0gbnVsbCAmJiBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW3VpZF0uY2Fubm9uQW1vdW50ID0gTnVtYmVyKHBsYXllckluZm8uY2Fubm9uQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGxheWVySW5mby5jYW5ub25IaXRNYXggIT0gbnVsbCl7Ly8g5LuZ5YmR5Ymp5L2Z55qE5Ye75Lit6bG85pWw6YePICBjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTWlzc2lsZVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm9bdWlkXS5oaXRNYXggPSBOdW1iZXIocGxheWVySW5mby5jYW5ub25IaXRNYXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNvbWVJblBsYXllcix0aGlzLnBsYXllckluZm9bdWlkXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNob3dUaW1lTXNnID0gdGhpcy5yb29tUnVsZS5TdGFuZGJ5VGltZVswXTtcclxuICAgIHRoaXMuZXhpdFRpbWVNc2cgPSB0aGlzLnJvb21SdWxlLlN0YW5kYnlUaW1lWzFdO1xyXG4gICAgdGhpcy5iZ0luZGV4ICAgICA9IG1zZy5iZ0luZGV4ICUgNDtcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hhbmdlQmFja0dyb3VuZCx0aGlzLmJnSW5kZXgpO1xyXG4gICAgdGhpcy5pbml0QnVsbGV0KG1zZyk7XHJcbiAgICBpZih0aGlzLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jaGVja1JvdGF0aW9uKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNoYW5nZUNhbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNoZWNrQmdNdXNpYyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmNsb3NlTG9hZGluZyk7XHJcbn1cclxuLy/mt7vliqDnur9cclxuZmlzaC5hZGRMaW5lID0gZnVuY3Rpb24oZGF0YSxpZCxpc1N5c0FkZFBvb2wpe1xyXG4gICAgaWYodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZGF0YS5ncm91cElkK1wiXCJdID09IG51bGwpe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj7psbznur/kuI3lkIzmraUg5om+5LiN5YiwIOmxvOe6v+e7hCBncm91cElkIFwiK2RhdGEuZ3JvdXBJZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZGF0YS5ncm91cElkK1wiXCJdLmZpc2hMaW5lID09IG51bGwpe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj7psbznur/kuI3lkIzmraUg5om+5LiN5YiwIOmxvOe6v+e7hCBncm91cElkIFwiK2RhdGEuZ3JvdXBJZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZGF0YS5ncm91cElkK1wiXCJdLmZpc2hMaW5lW2RhdGEucGF0aElkK1wiXCJdID09IG51bGwpe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj7psbznur/kuI3lkIzmraUg5om+5LiN5YiwIOmxvOe6v+e7hCBncm91cElkIFwiK2RhdGEuZ3JvdXBJZCtcIiBwYXRoSWQgXCIrZGF0YS5wYXRoSWQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBsaW5lRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZGF0YS5ncm91cElkK1wiXCJdLmZpc2hMaW5lW2RhdGEucGF0aElkK1wiXCJdKSk7XHJcbiAgICBpZihsaW5lRGF0YSA9PSBudWxsIHx8IHRoaXMuanNvbl9maXNoTGluZUdyb3VwW2RhdGEuZ3JvdXBJZCtcIlwiXS5maXNoTGluZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj4xPiDmnI3liqHlmajlrqLmiLfnq6/kuI3lkIzmraXpsbznur/phY3nva4g5om+5LiN5YiwIOmxvOe7hCBncm91cElk77yaXCIsZGF0YS5ncm91cElkLFwiIHBhdGhJZO+8mlwiLGRhdGEucGF0aElkKVxyXG4gICAgfVxyXG4gICAgaWYobGluZURhdGEpe1xyXG4gICAgICAgIGxldCBmaXNoRGF0YTEgPSB0aGlzLmpzb25fZmlzaFRhYmxlW2RhdGEuZmlzaFR5cGVJZCtcIlwiXTtcclxuICAgICAgICBsZXQgZmlzaERhdGEyID0gdGhpcy5qc29uX2Zpc2hUYWJsZVtOdW1iZXIoZGF0YS5maXNoVHlwZUlkKV07XHJcbiAgICAgICAgbGV0IGZpc2hEYXRhID0gZmlzaERhdGExID09IHVuZGVmaW5lZCA/IGZpc2hEYXRhMiA6ZmlzaERhdGExO1xyXG4gICAgICAgIGlmKGZpc2hEYXRhKXtcclxuICAgICAgICAgICAgbGluZURhdGEuZmlzaFR5cGVJZCAgICAgICAgICAgPSBkYXRhLmZpc2hUeXBlSWQrXCJcIjtcclxuICAgICAgICAgICAgbGluZURhdGEuc2VydmVyVGltZSAgICAgICAgICAgPSBOdW1iZXIoZGF0YS5zZXJ2ZXJUaW1lK1wiXCIpO1xyXG4gICAgICAgICAgICBsaW5lRGF0YS5jcmVhdGVUaW1lICAgICAgICAgICA9IE51bWJlcihkYXRhLmNyZWF0ZVRpbWUrXCJcIik7XHJcbiAgICAgICAgICAgIGxpbmVEYXRhLmlkICAgICAgICAgICAgICAgICAgID0gTnVtYmVyKGlkKTsvL+eUqOS6jiDljY/orq7pgJrorq/kvb/nlKhcclxuICAgICAgICAgICAgaWYoZGF0YS5pc1RpZGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBsaW5lRGF0YS5pc1RpZGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaFBvb2xEYXRhW051bWJlcihpZCldID0gbGluZURhdGE7XHJcbiAgICAgICAgICAgIGxldCBzcGVjaWFsSW5kZXggPSBDT05TVC5TcGVjaWFsRmlzaFR5cGVJZHMuaW5kZXhPZihOdW1iZXIoZGF0YS5maXNoVHlwZUlkKSk7XHJcbiAgICAgICAgICAgIGlmKHNwZWNpYWxJbmRleCAhPSAtMSl7Ly/mnInnibnmrorpsbzmnaXllaZcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0NvbWVpbiwge2lkOk51bWJlcihpZCtcIlwiKSxmaXNoVHlwZUlkOk51bWJlcihkYXRhLmZpc2hUeXBlSWQpLHNob3dUaW1lOmxpbmVEYXRhLnNob3dUaW1lLHNlcnZlclRpbWU6TnVtYmVyKGRhdGEuc2VydmVyVGltZStcIlwiKSxjcmVhdGVUaW1lOk51bWJlcihkYXRhLmNyZWF0ZVRpbWUrXCJcIil9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc1N5c0FkZFBvb2wpZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5hZGRGaXNoUG9vbCxsaW5lRGF0YSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPj4yPiDmnI3liqHlmajlrqLmiLfnq6/kuI3lkIzmraXpsbzphY3nva4g5om+5LiN5YiwIOmxvOe7hCAgZ3JvdXBJZO+8mlwiLGRhdGEuZ3JvdXBJZCxcIiBwYXRoSWQgXCIsZGF0YS5wYXRoSWQsXCIgIGZpc2hUeXBlSWTvvJpcIixkYXRhLmZpc2hUeXBlSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8v5re75Yqg6bG85r2uXHJcbmZpc2guYWRkVGlkZSA9IGZ1bmN0aW9uKG1zZyxncm91cElkKXtcclxuICAgIGlmKHRoaXMuanNvbl9maXNoTGluZUdyb3VwW2dyb3VwSWQrXCJcIl0gPT0gbnVsbCl7XHJcbiAgICAgICAgY2MuZXJyb3IoXCI+PumxvOe6v+S4jeWQjOatpSDmib7kuI3liLAg6bG857q/57uEIGdyb3VwSWQgXCIrZ3JvdXBJZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZ3JvdXBJZCtcIlwiXS5maXNoTGluZSA9PSBudWxsKXtcclxuICAgICAgICBjYy5lcnJvcihcIj4+6bG857q/5LiN5ZCM5q2lIOaJvuS4jeWIsCDpsbznur/nu4QgZ3JvdXBJZCBcIitncm91cElkKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBJc1RpZGUgPSAxO1xyXG4gICAgbGV0IGxvY2FsRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZ3JvdXBJZCtcIlwiXS5maXNoTGluZSkpO1xyXG4gICAgaWYodGhpcy5qc29uX2Zpc2hMaW5lR3JvdXBbZ3JvdXBJZCtcIlwiXS5maXNoTGluZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj4zPiDphY3nva7kuI3lkIzmraUg5om+5LiN5YiwIOmxvOe7hCBcIixncm91cElkKVxyXG4gICAgfVxyXG4gICAgbGV0IGtpbGxlZEZpc2hJZHMgPSBtc2cua2lsbGVkRmlzaElkcztcclxuICAgIGlmKGtpbGxlZEZpc2hJZHMgPT0gdW5kZWZpbmVkICYmIG1zZy5maXNoVGlkZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGtpbGxlZEZpc2hJZHMgPSBtc2cuZmlzaFRpZGUua2lsbGVkRmlzaElkcztcclxuICAgIH1cclxuICAgIGxldCBuZXdGaXNoUG9vbERhdGFMaXN0ID0ge307XHJcbiAgICBmb3IgKGxldCBpZCBpbiBsb2NhbERhdGEpe1xyXG4gICAgICAgIGxldCBpc0FkZCA9IHRydWU7XHJcbiAgICAgICAgaWYoa2lsbGVkRmlzaElkcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihraWxsZWRGaXNoSWRzLmluZGV4T2YoKGlkK1wiXCIpKSAhPSAtMSB8fCBraWxsZWRGaXNoSWRzLmluZGV4T2YoTnVtYmVyKGlkKSkgIT0gLTEpey8v5Y676Zmk5bey57uP5q275o6J55qE6bG8XHJcbiAgICAgICAgICAgICAgICBpc0FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQWRkKXtcclxuICAgICAgICAgICAgdGhpcy5maXNoUG9vbERhdGFbTnVtYmVyKGlkKV0gICAgICAgICAgICAgPSBsb2NhbERhdGFbTnVtYmVyKGlkKV07XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaFBvb2xEYXRhW051bWJlcihpZCldLmlzVGlkZSAgICAgID0gSXNUaWRlO1xyXG4gICAgICAgICAgICB0aGlzLmZpc2hQb29sRGF0YVtOdW1iZXIoaWQpXS5pZCAgICAgICAgICA9IE51bWJlcihpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaFBvb2xEYXRhW051bWJlcihpZCldLnNlcnZlclRpbWUgID0gTnVtYmVyKG1zZy5zZXJ2ZXJUaW1lK1wiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpc2hQb29sRGF0YVtOdW1iZXIoaWQpXS5jcmVhdGVUaW1lICA9IG1zZy5jcmVhdGVUaW1lICE9IG51bGwgPyAgTnVtYmVyKG1zZy5jcmVhdGVUaW1lK1wiXCIpIDogTnVtYmVyKG1zZy5maXNoVGlkZS5jcmVhdGVUaW1lK1wiXCIpO1xyXG4gICAgICAgICAgICBuZXdGaXNoUG9vbERhdGFMaXN0W051bWJlcihpZCldICAgICAgICAgICA9IHRoaXMuZmlzaFBvb2xEYXRhW051bWJlcihpZCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG5ld0Zpc2hQb29sRGF0YUxpc3QpKTtcclxufVxyXG4vL+a3u+WKoOmxvOe6v++8iOmaj+acuuWJp+acrOaXtuacie+8iVxyXG5maXNoLm9uQWRkRmlzaExpbmUgPSBmdW5jdGlvbihyZXMpe1xyXG4gICAgbGV0IG1zZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICBpZih0aGlzLmlzRmlzaFRpZGVSdW5pbmcgPT0gdHJ1ZSl7XHJcbiAgICAgICAgdGhpcy5pc0Zpc2hUaWRlUnVuaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmZpc2hQb29sRGF0YSA9PSBudWxsKXtcclxuICAgICAgICBjYy5lcnJvcihcIj4+IOWKoOmxvOe6v+Wksei0pSDpsbzmsaDmnKrliJ3lp4vljJYgXCIsdGhpcy5maXNoUG9vbERhdGEpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gY2MubG9nKFwiPiDmt7vliqDpsbznur8gIFwiLG1zZyk7XHJcbiAgICB0aGlzLnNlcnZlclRpbWUgPSBtc2cuc2VydmVyVGltZTtcclxuICAgIHRoaXMuYWRkTGluZShtc2csbXNnLmlkLHRydWUpO1xyXG59XHJcbi8v6bG85r2u5p2l6KKtXHJcbmZpc2gub25UaWRlU2NyaXB0ID0gZnVuY3Rpb24ocmVzKXtcclxuICAgIGlmKCF0aGlzLmlzRW50ZXJSb29tKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzRmlzaFRpZGVSdW5pbmcgPSB0cnVlO1xyXG4gICAgbGV0IG1zZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICBpZih0aGlzLmZpc2hQb29sRGF0YSA9PSBudWxsKXtcclxuICAgICAgICBjYy5lcnJvcihcIj4+IOWKoOmxvOa9ruWksei0pSDpsbzmsaDmnKog5Yid5aeL5YyWIFwiLHRoaXMuZmlzaFBvb2xEYXRhKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudGlkZVBsYXlDb3JyZWN0ID0ge307Ly/ph43nva7mkq3mlL7nn6vmraNcclxuICAgIC8vIGNjLmxvZyhcIj4g6bG85r2u5p2l6KKtIFwiLG1zZyk7XHJcbiAgICB0aGlzLnNlcnZlclRpbWUgPSBtc2cuc2VydmVyVGltZTtcclxuICAgIHRoaXMuYmdJbmRleCA9IG1zZy5iZ0luZGV4ICUgNDtcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuc2VhV2F2ZUZpc2hHcm91cCxtc2cpO1xyXG59XHJcbi8v6bG857uE5p2l6KKtXHJcbmZpc2gub25GaXNoR3JvdXBTY3JpcHQgPSBmdW5jdGlvbihyZXMpe1xyXG4gICAgaWYoIXRoaXMuaXNFbnRlclJvb20pe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBtc2cgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgaWYodGhpcy5pc0Zpc2hUaWRlUnVuaW5nID09IHRydWUpe1xyXG4gICAgICAgIHRoaXMuaXNGaXNoVGlkZVJ1bmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5hZGRGaXNoVGlkZSx0aGlzLmFkZFRpZGUobXNnLG1zZy5ncm91cElkKSk7XHJcbn1cclxuLy/lsITlh7tcclxuZmlzaC5vblNob290ID0gZnVuY3Rpb24ocmVzKXtcclxuICAgIGlmKCF0aGlzLmlzRW50ZXJSb29tKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmZpc2hQb29sRGF0YSA9PSBudWxsKXJldHVybjtcclxuICAgIGxldCBtc2cgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgbGV0IGN1cnJUaW1lID0gbmV3IERhdGUoKS5Gb3JtYXQoXCJtbTpzc1wiKTtcclxuICAgIGNjLmxvZyhcIj4+PuOAgOWwhOWHuyBcIixtc2csY3VyclRpbWUpO1xyXG4gICAgbGV0IG15aWQgICAgICAgID0gZ2xHYW1lLnVzZXIudXNlcklEO1xyXG4gICAgbXNnLmd1bkxldmVsICAgID0gbXNnLmNhbm5vbkxldmVsO1xyXG4gICAgbXNnLmdvbGQgICAgICAgID0gbXNnLmNvaW47XHJcbiAgICBtc2cuYnVsbGV0SWQgICAgPSBtc2cuaWQ7XHJcbiAgICBpZih0aGlzLnBsYXllckluZm8gPT0gbnVsbCB8fCB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSA9PSBudWxsKXtcclxuICAgICAgICBjYy53YXJuKFwi5bqn5L2N5peg5Lq677yM5pqC5peg5rOV5bCE5Ye7XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbXNnLnNlYXROdW0gPSB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5zZWF0TnVtO1xyXG4gICAgaWYoTnVtYmVyKG1zZy51aWQpID09IE51bWJlcihteWlkKSAmJiBtc2cuY29pbiAhPSBudWxsKXtcclxuICAgICAgICB0aGlzLmdvbGQgICA9IG1zZy5jb2luO1xyXG4gICAgICAgIHRoaXMuY2hlY2tHb2xkKCk7XHJcbiAgICAgICAgLy8gY2Mud2FybihcIj4+IOWwhOWHuyDmm7TmlrDmiJHnmoTpkrEgMVwiKVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQubXlVcGRhdGVNb25leSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICAvLyBjYy53YXJuKFwiPj4g5bCE5Ye7IOabtOaWsOWFtuS7lueUqOaIt+eahOmSsSAxXCIpXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51cGRhdGVTaG9vdEdvbGQsbXNnKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOacjeWKoeWZqOWPkei/h+adpeeahOeUqOaIt3NlYXROdW0gIFwiLG1zZy51aWQsXCIg5bqn5L2NIFwiLG1zZyxcIiB0aGlzLnBsYXllckluZm8gXCIsdGhpcy5wbGF5ZXJJbmZvKVxyXG4gICAgICAgIGNjLndhcm4oXCI+PiB0aGlzLnBsYXllckluZm8gXCIsdGhpcy5wbGF5ZXJJbmZvKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgaWYobXNnLnVpZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4+Pj4+IG1zZyA6IFwiLG1zZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtc2cuc2VhdE51bSA9IHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLnNlYXROdW07XHJcbiAgICAgICAgaWYobXNnLmNvaW4gIT0gbnVsbCl0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5nb2xkID0gbXNnLmNvaW47XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKFwiPiAxNy4g5bCE5Ye7IFwiLG1zZyk7XHJcbiAgICAgICAgaWYobXNnLmNhbm5vbkxldmVsID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmNhbm5vbkxldmVsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25MZXZlbCA9IG1zZy5jYW5ub25MZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5wbGF5U2hvb3RCdWxsZXQsbXNnKTtcclxuICAgIH1cclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQ2Fubm9uLGZhbHNlKTtcclxufVxyXG4vL+S9v+eUqOeJueauiueCruWPsFxyXG5maXNoLm9uVXNlU3BlY2lhbENhbm5vbiA9IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICBsZXQgbXNnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIGxldCBjdXJyVGltZSA9IG5ldyBEYXRlKCkuRm9ybWF0KFwibW06c3NcIik7XHJcbiAgICBpZih0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSA9PSBudWxsIHx8IHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmNhbm5vbkFtb3VudCA9PSBudWxsKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSA9PSBudWxsKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIueUqOaIt1wiK21zZy51aWQrXCIg5rKh5pyJ5Yqg5YWl5oi/6Ze0IOWwseS9v+eUqOeCruWPsCDmlbDmja7mnInor6/vvIHvvIHvvIFwbGF5ZXJJbmZvOiBcIix0aGlzLnBsYXllckluZm8pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIui/mOayoeW+l+WIsOi/hyDnibnmrorngq7lj7Ag5bCx5L2/55So54Ku5Y+wIOaVsOaNruacieivr++8ge+8ge+8gSBcIixtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIGxldCBzZWF0TnVtID0gdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uc2VhdE51bTtcclxuICAgICAgICBtc2cuc2VhdE51bSA9IHNlYXROdW07XHJcbiAgICAgICAgbGV0IGxhc3RDYW1tcG1UeXBlID0gTnVtYmVyKFwiXCIgKyB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25UeXBlKTsvL+iusOW9leiAgeeahOeCruWPsOexu+Wei1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmNhbm5vbkFtb3VudCA9IE51bWJlcihtc2cuY2Fubm9uQW1vdW50KTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25UeXBlID0gTnVtYmVyKG1zZy5jYW5ub25UeXBlKTtcclxuICAgICAgICBjYy53YXJuKFwiPT09PSDkvb/nlKjnibnmrorngq7lj7Agc2VhdE51bSA6XCIrc2VhdE51bSxcIiBJbmZvIFwiLEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0pKSk7XHJcbiAgICAgICAgaWYobGFzdENhbW1wbVR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5MYXNlciAmJiB0aGlzLnNlYXROdW0gIT0gc2VhdE51bSl7Ly/nu7TmiqTlhbbku5bkurrnmoTlrZDlvLnnirbmgIEgLSDku5nliZFcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5jbGVhclNwZWNpYWxCdWxsZXRQb29sLHNlYXROdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNlYXROdW0gPT0gc2VhdE51bSl7XHJcbiAgICAgICAgICAgIC8vIGNjLmVycm9yKFwiPuS9v+eUqOeJueauiueCruWPsCA+PiBwbGF5ZXJJbmZvIFwiLHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLFwiIG1zZyBcIixtc2cpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTnVtYmVyKG1zZy5jYW5ub25BbW91bnQpID09IDApe1xyXG4gICAgICAgICAgICBjYy5sb2coXCI+5pyN5Yqh5Zmo5bm/5pKtIOW3sue7j+ayoeaciem+mea6quS6hiDlvIDlp4vmgaLlpI0g54Ku5Y+wIFwiLG1zZylcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50QnVsbHRlVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk5vdCl7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnJlc3RvcmVDYW5ub24se3VpZDpOdW1iZXIobXNnLnVpZCksaXNOb3c6dHJ1ZSxsYXN0Q2FtbXBtVHlwZTpsYXN0Q2FtbXBtVHlwZX0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQucmVzdG9yZUNhbm5vbix7dWlkOk51bWJlcihtc2cudWlkKSxpc05vdzpmYWxzZSxsYXN0Q2FtbXBtVHlwZTpsYXN0Q2FtbXBtVHlwZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuYWNjdW11bGF0ZSx7c2VhdE51bTpzZWF0TnVtLGNhbm5vblR5cGU6TnVtYmVyKG1zZy5jYW5ub25UeXBlKX0pO1xyXG4gICAgICAgICAgICBjYy5sb2coXCI+IOeJueauiueCruWPsOeahOaVsOmHj+abtOaWsCBcIix0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25BbW91bnQsXCIgbXNnIFwiLG1zZyxjdXJyVGltZSlcclxuICAgICAgICAgICAgbGV0IHNwZWNpYWxDYW5ub25JbmZvID0ge3VpZDptc2cudWlkLHNlYXROdW06bXNnLnNlYXROdW0saXNOZXc6ZmFsc2V9O1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmdldFNwZWNpYWxDYW5ub24sc3BlY2lhbENhbm5vbkluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQ2Fubm9uLGZhbHNlKTtcclxufVxyXG4vL+mxvOatu+S6oVxyXG5maXNoLm9uS2lsbCA9IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICBsZXQgbXNnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIGxldCBCb3NzTGF2YUJhc2FsdGZpc2hUeXBlSWQgPSAtMTtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgbXlpZCA9IE51bWJlcihnbEdhbWUudXNlci51c2VySUQpO1xyXG4gICAgaWYodGhpcy5maXNoUG9vbERhdGEgPT0gbnVsbClyZXR1cm47XHJcbiAgICBpZih0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSAhPSBudWxsKXtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5nb2xkID0gbXNnLmNvaW47XHJcbiAgICAgICAgbXNnLmdvbGQgICAgPSBtc2cuY29pbjtcclxuICAgICAgICBtc2cuc2VhdE51bSA9IHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLnNlYXROdW07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjYy5lcnJvcihcIueOqeWutuacquWIneWni+WMllwiKVxyXG4gICAgICAgIGZvciAobGV0IGs9MDtrPG1zZy5yZXdhcmRNYXAubGVuZ3RoO2srKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG1zZy5yZXdhcmRNYXBba107XHJcbiAgICAgICAgICAgIGxldCBmaXNoVHlwZUlkID0gdGhpcy5maXNoUG9vbERhdGFbTnVtYmVyKGRhdGEuZmlzaElkKV0gIT0gbnVsbCA/IE51bWJlcih0aGlzLmZpc2hQb29sRGF0YVtOdW1iZXIoZGF0YS5maXNoSWQpXS5maXNoVHlwZUlkKSA6IDA7XHJcbiAgICAgICAgICAgIGlmKGlzTmFOKE51bWJlcihkYXRhLmZpc2hJZCkpKXtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPjE+5pWw5o2u6ZSZ6K+vIFwiLGRhdGEsXCIgbXNnIDogXCIsbXNnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgZmlzaElkOiBOdW1iZXIoZGF0YS5maXNoSWQpLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkR29sZCA6IGRhdGEucmV3YXJkID8gZGF0YS5yZXdhcmQgOiAwLFxyXG4gICAgICAgICAgICAgICAgZmlzaFR5cGVJZDpmaXNoVHlwZUlkLFxyXG4gICAgICAgICAgICAgICAgc2VhdE51bTptc2cuc2VhdE51bSxcclxuICAgICAgICAgICAgICAgIGtpbGxUeXBlOm1zZy5jYW5ub25UeXBlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaW5mby5raWxsVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkJvbWIpe1xyXG4gICAgICAgICAgICAgICAgaW5mby5kZWxheURpZVRpbWUgPSBrICogQ09OU1QuRGVsYXlEaWVUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25LaWxsRmlzaCxpbmZvKTsvL+mUgOavgemxvFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihteWlkID09IE51bWJlcihtc2cudWlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZCA9IE51bWJlcihtc2cuY29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tHb2xkKCk7XHJcbiAgICAgICAgICAgIC8vIGNjLmVycm9yKFwiPj4g5bCE5Ye7IOabtOaWsOaIkeeahOmSsSAyXCIpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQubXlVcGRhdGVNb25leSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjYy5lcnJvcihcIj4+IOWwhOWHuyDmm7TmlrDlhbbku5bnlKjmiLfnmoTpkrEgMlwiKVxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZVNob290R29sZCxtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBrPTA7azxtc2cucmV3YXJkTWFwLmxlbmd0aDtrKyspe1xyXG4gICAgICAgIGxldCBkYXRhID0gbXNnLnJld2FyZE1hcFtrXTtcclxuICAgICAgICBpZihkYXRhLnJld2FyZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b3RhbCArPSBOdW1iZXIodGhpcy5mb3JtYXRNb25leShOdW1iZXIoZGF0YS5yZXdhcmQrXCJcIikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKGRhdGEuZmlzaElkKSkpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4yPuaVsOaNrumUmeivryBcIixkYXRhLFwiIG1zZyA6IFwiLG1zZyk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmlzaFR5cGVJZCA9IHRoaXMuZmlzaFBvb2xEYXRhW051bWJlcihkYXRhLmZpc2hJZCldICE9IG51bGwgPyBOdW1iZXIodGhpcy5maXNoUG9vbERhdGFbTnVtYmVyKGRhdGEuZmlzaElkKV0uZmlzaFR5cGVJZCkgOiAwO1xyXG4gICAgICAgIGxldCBsb2NhbERhdGEgID0gdGhpcy5qc29uX2Zpc2hUYWJsZVt0aGlzLmZpc2hQb29sRGF0YVtOdW1iZXIoZGF0YS5maXNoSWQpXV07XHJcbiAgICAgICAgbGV0IGluZm8gPSB7XHJcbiAgICAgICAgICAgIGZpc2hJZDogTnVtYmVyKGRhdGEuZmlzaElkKSxcclxuICAgICAgICAgICAgcmV3YXJkR29sZCA6IGRhdGEucmV3YXJkID8gZGF0YS5yZXdhcmQgOiAwLFxyXG4gICAgICAgICAgICBzZWF0TnVtOm1zZy5zZWF0TnVtLFxyXG4gICAgICAgICAgICB1aWQ6bXNnLnVpZCxcclxuICAgICAgICAgICAgZmlzaFR5cGVJZDpmaXNoVHlwZUlkLFxyXG4gICAgICAgICAgICBraWxsVHlwZTptc2cuY2Fubm9uVHlwZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmZvLmtpbGxUeXBlID09IENPTlNULkNhbm5vblR5cGUuQm9tYil7XHJcbiAgICAgICAgICAgIGluZm8uZGVsYXlEaWVUaW1lID0gayAqIENPTlNULkRlbGF5RGllVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobG9jYWxEYXRhKXtcclxuICAgICAgICAgICAgY2Mud2FybihcImlkOlwiLE51bWJlcihkYXRhLmZpc2hJZCksXCI+5q276bG8ZlRJZDpcIixmaXNoVHlwZUlkLFwibjpcIixsb2NhbERhdGEuZmlzaE5hbWUsXCJyZXNHcm91cElkOlwiLGxvY2FsRGF0YS5yZXNHcm91cElkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmaXNoVHlwZUlkID09IENPTlNULkJvc3NHb2RPZldlYWx0aCl7Ly9ib3NzMSDotKLnpZ7nibnmrorlpITnkIZcclxuICAgICAgICAgICAgbGV0IHNwcmlua0luZm8gPSB7dWlkOm1zZy51aWQsZmlzaElkOk51bWJlcihkYXRhLmZpc2hJZCksc2VhdE51bTptc2cuc2VhdE51bSwgcmV3YXJkR29sZCA6IGRhdGEucmV3YXJkID8gZGF0YS5yZXdhcmQgOiAwLGluZm86aW5mbyx1aWQ6bXNnLnVpZH07XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25Tc2hvY2spO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnNwcmlua2xlUmVkQmFnLHNwcmlua0luZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmaXNoVHlwZUlkID09IENPTlNULll1UnV5aSl7Ly/njonlpoLmhI8g5Ye66L2s55uYXHJcbiAgICAgICAgICAgIGlmKGRhdGEucmV3YXJkQXJyYXkgIT0gbnVsbCAmJiBkYXRhLnJld2FyZE11bHRpcGxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+Pj09PT09PT09PT09IOWBnOatoiDmm7TmlrAg5L2Z6aKdID09PT09PT09PT09PT09IDEg546J5aaC5oSPID4+XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR1cm50YWJsZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlkOm1zZy51aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlzaElkOk51bWJlcihkYXRhLmZpc2hJZCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdE51bTptc2cuc2VhdE51bSxcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRHb2xkIDogZGF0YS5yZXdhcmQgPyBkYXRhLnJld2FyZCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkQXJyYXk6ZGF0YS5yZXdhcmRBcnJheSxcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRNdWx0aXBsZTpkYXRhLnJld2FyZE11bHRpcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzptc2dcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZihteWlkID09IE51bWJlcihtc2cudWlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tcImlzVXBkYXRlTW9uZXlcIittc2cuc2VhdE51bV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0dXJudGFibGVJbmZvLnR5cGUgPSBDT05TVC5Bd2FyZFR5cGUuUlVZSTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnNob3dUdXJudGFibGUsdHVybnRhYmxlSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0dXJudGFibGVJbmZvLnR5cGUgPSBDT05TVC5Bd2FyZFR5cGUuUlVZSTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50Lm90aGVyUGxheWVyU2hvd1NwZWNpYWxBd2FyZCx0dXJudGFibGVJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwi546J5aaC5oSPIOe8uuWwkSByZXdhcmRBcnJheSDmiJYgcmV3YXJkTXVsdGlwbGUg5pWw5o2uIOaXoOazleW8ueWHuui9rOebmCBkYXRhOiBcIixkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmaXNoVHlwZUlkID09IENPTlNULkJvc3NMYXZhQmFzYWx0KSB7Ly/nhpTlsqnnjoTmraYg5q275LqhXHJcbiAgICAgICAgICAgIEJvc3NMYXZhQmFzYWx0ZmlzaFR5cGVJZCA9IGZpc2hUeXBlSWQ7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25TcGVjaWFsQm9tYixpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZmlzaFR5cGVJZCA9PSBDT05TVC5UcmVhc3VyZUJvd2wpey8v6IGa5a6d55uGIOWHuuaLiemcuFxyXG4gICAgICAgICAgICAvLyBjYy5lcnJvcihcIj4+PT09PT09PT09PT0g5YGc5q2iIOabtOaWsCDkvZnpop0gPT09PT09PT09PT09PT0gMiDogZrlrp3nm4YgPj5cIik7XHJcbiAgICAgICAgICAgIGxldCB0dXJudGFibGVJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgdWlkOm1zZy51aWQsXHJcbiAgICAgICAgICAgICAgICBmaXNoSWQ6TnVtYmVyKGRhdGEuZmlzaElkKSxcclxuICAgICAgICAgICAgICAgIHNlYXROdW06bXNnLnNlYXROdW0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRHb2xkIDogZGF0YS5yZXdhcmQgPyBkYXRhLnJld2FyZCA6IDAsXHJcbiAgICAgICAgICAgICAgICBtc2c6bXNnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmKG15aWQgPT0gTnVtYmVyKG1zZy51aWQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXNbXCJpc1VwZGF0ZU1vbmV5XCIrbXNnLnNlYXROdW1dID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiPj4+ICDogZrlrp3nm4YgZGF0YS5yZXdhcmTvvJogXCIrZGF0YS5yZXdhcmQpXHJcbiAgICAgICAgICAgICAgICB0dXJudGFibGVJbmZvLnR5cGUgPSBDT05TVC5Bd2FyZFR5cGUuQ09STlVDT1BJQTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuc2hvd1R1cm50YWJsZSx0dXJudGFibGVJbmZvKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0dXJudGFibGVJbmZvLnR5cGUgPSBDT05TVC5Bd2FyZFR5cGUuQ09STlVDT1BJQTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub3RoZXJQbGF5ZXJTaG93U3BlY2lhbEF3YXJkLHR1cm50YWJsZUluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcGVjaWFsQ2Fubm9uSW5mbyA9IHt1aWQ6bXNnLnVpZCxmaXNoSWQ6TnVtYmVyKGRhdGEuZmlzaElkKSxzZWF0TnVtOm1zZy5zZWF0TnVtfTtcclxuICAgICAgICBpZihkYXRhLm5ld0Nhbm5vblR5cGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEubmV3Q2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkJvbWIpIHsvL+eGlOWyqeeOhOatpiDlhajlsY/niIbngrhcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiPj4gWFhYIOeGlOWyqeeOhOatpiDlhajlsY/niIbngrggbmV3Q2Fubm9uVHlwZSBlcnJvciAgbXNnOiBcIiwgbXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25UeXBlICE9IG51bGwgJiYgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uY2Fubm9uVHlwZSAhPSBOdW1iZXIoZGF0YS5uZXdDYW5ub25UeXBlKSl7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsQ2Fubm9uSW5mby5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihteWlkID09IE51bWJlcihtc2cudWlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIkdFVENBTk5PTiA9PT0+Pj4gIOiOt+W+l+S4jeWQjCDngq7lj7Ag77yM5pS55Y+Y54Ku5Y+wXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3BlY2lhbENhbm5vbkluZm8uaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKG15aWQgPT0gTnVtYmVyKG1zZy51aWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIkdFVENBTk5PTiA9PT0+Pj4gIOiOt+W+l+ebuOWQjCDngq7lj7DvvIzopobnm5bkuYvliY3nmoQgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uY2Fubm9uVHlwZSAgICAgPSAgTnVtYmVyKGRhdGEubmV3Q2Fubm9uVHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmNhbm5vbkFtb3VudCAgID0gIE51bWJlcihkYXRhLm5ld0Nhbm5vbkFtb3VudCk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEubWF4RmlzaCAhPSBudWxsKXsvLyDku5nliZHmnIDlpKflh7vkuK3psbzmlbDph49cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmhpdE1heCAgICAgPSAgTnVtYmVyKGRhdGEubWF4RmlzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYobXlpZCA9PSBOdW1iZXIobXNnLnVpZCkpIHtcclxuICAgICAgICAgICAgLy8gICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiZ2V0U3BjbGlhVXNlclwiKTsvL+iOt+W+l+eJueauiueCruWPsOaXtuaSreaUvlxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZ2V0U3BlY2lhbENhbm5vbixzcGVjaWFsQ2Fubm9uSW5mbyk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZmlzaFR5cGVJZCA9PSBDT05TVC5Cb3NzR29kT2ZXZWFsdGggfHwgZmlzaFR5cGVJZCA9PSBDT05TVC5ZdVJ1eWkgfHwgZmlzaFR5cGVJZCA9PSBDT05TVC5UcmVhc3VyZUJvd2wpIHtcclxuICAgICAgICAgICAgLy/otKLnpZ5cclxuICAgICAgICAgICAgLy/njonlpoLmhI9cclxuICAgICAgICAgICAgLy/ogZrlrp3nm4ZcclxuICAgICAgICAgICAgLy/ov5nkuInkuKrkuI3lh7rnjrDpo5jliIblkozph5HluIHjgIIgIOi0ouelnueJueauiuWkhOeQhlxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnBsYXlDb2luRWZmZWN0LCBpbmZvKTsvL+atu+mxvOmjmOmHkeW4gVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmaXNoVHlwZUlkID09IENPTlNULkJvc3NHb2RPZldlYWx0aCAmJiBkYXRhLmxpdmVzKXtcclxuICAgICAgICAgICAgLy/otKLnpZ7ov5jmsqHmrbvpgI/vvIzkuI3og73plIDmr4FcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/otKLnpZ7mrbvpgI/miJbogIXlhbbku5bnmoTpsbzmrbvkuqFcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5vbktpbGxGaXNoLGluZm8pOy8v6ZSA5q+B6bG8XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGlmKG1zZy5jYW5ub25UeXBlICE9IG51bGwgJiYgbXNnLmNhbm5vblR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwgJiYgbXNnLmNhbm5vblR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Cb21iKXsvL+WmguaenOi/meS4gOWPkeWtkOW8ueS4jeaYr+aZrumAmuWtkOW8uemCo+S5iOe7n+iuoeaVsOWAvOaYvuekuueJueaViFxyXG4gICAgICAgIGxldCBzcGVjaWFJbmZvID0ge2Nhbm5vblR5cGU6bXNnLmNhbm5vblR5cGUsdG90YWw6dG90YWwsY29pbjptc2cuY29pbix1aWQ6bXNnLnVpZCxzZWF0TnVtOm1zZy5zZWF0TnVtLHRvdGFsUmV3YXJkOnRoaXMuZm9ybWF0TW9uZXkobXNnLnRvdGFsUmV3YXJkKX07XHJcblxyXG4gICAgICAgIGlmKEJvc3NMYXZhQmFzYWx0ZmlzaFR5cGVJZCA9PSBDT05TVC5Cb3NzTGF2YUJhc2FsdCkgey8v54aU5bKp546E5q2mIOatu+S6oVxyXG4gICAgICAgICAgICBjYy53YXJuKFwiPj4g54aU5bKp546E5q2mIOinpuWPkSDnibnmrorlrZDlvLnnu5/orqEg6ZSZ6K+vICBtc2c6IFwiLG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLndhcm4oXCIxID09PT09PiDorqHliIYg77yaICBcIit0b3RhbCAsIFwiICB0b3RhbFJld2FyZCAgXCIrc3BlY2lhSW5mby50b3RhbFJld2FyZCAsIFwiIHNlYXROdW0gXCIrbXNnLnNlYXROdW0rXCIgbXNnLmNhbm5vblR5cGUgXCIrbXNnLmNhbm5vblR5cGUpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuc3BlY2lhbEJ1bGxldFN0YXRpc3RpY3MsIHNwZWNpYUluZm8pO1xyXG4gICAgfVxyXG4gICAgLy/njonlpoLmhI/jgIHogZrlrp3nm4Yg5pu05paw5L2Z6aKd5py65Yi2IOeUqOS6jiDnrYnlvoXlvIDlpZbkuYvlkI7mm7TmlrBcclxuICAgIGlmKHRoaXNbXCJpc1VwZGF0ZU1vbmV5XCIrbXNnLnNlYXROdW1dKXtcclxuICAgICAgICBpZihteWlkID09IE51bWJlcihtc2cudWlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZCA9IE51bWJlcihtc2cuY29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tHb2xkKCk7XHJcbiAgICAgICAgICAgIC8vIGNjLmVycm9yKFwiPj4g5bCE5Ye7IOabtOaWsOaIkeeahOmSsSA0XCIpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQubXlVcGRhdGVNb25leSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjYy5lcnJvcihcIj4+IOWwhOWHuyDmm7TmlrDlhbbku5bnlKjmiLfnmoTpkrEgNFwiKVxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZVNob290R29sZCxtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vL+S7meWJkeeIhueCuFxyXG5maXNoLm9uTWlzc2lsZUJvbWIgPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgY2Mud2FybihcIj5vbk1pc3NpbGVCb21iIOS7meWJkeeIhueCuCBcIixtc2cpO1xyXG4gICAgaWYodGhpcy5maXNoUG9vbERhdGEgPT0gbnVsbClyZXR1cm47XHJcbiAgICBpZih0aGlzLnBsYXllckluZm8gPT0gbnVsbCB8fCB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSA9PSBudWxsKXtcclxuICAgICAgICBjYy53YXJuKFwi5bqn5L2N5peg5Lq6XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHNlYXROdW0gPSBOdW1iZXIodGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uc2VhdE51bSk7XHJcbiAgICBtc2cuc2VhdE51bSA9IHNlYXROdW07XHJcbiAgICBjYy53YXJuKFwiPT09PT09PT0gZGVsZXRlID09PT09PT09PSDku5nliZHniIbngrggdWlkIFwiK051bWJlcihtc2cudWlkKSlcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2xlYXJTcGVjaWFsQnVsbGV0UG9vbCxzZWF0TnVtKTtcclxufVxyXG4vL+WIh+aNoueCruWPsFxyXG5maXNoLm9uQ2hhbmdlQ2Fubm9uTGV2ZWwgPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgaWYodGhpcy5maXNoUG9vbERhdGEgPT0gbnVsbClyZXR1cm47XHJcbiAgICBpZih0aGlzLnBsYXllckluZm8gPT0gbnVsbCB8fCB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSA9PSBudWxsKXtcclxuICAgICAgICBjYy53YXJuKFwi5bqn5L2N5peg5Lq677yM5pqC5peg5rOV5bCE5Ye7XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbXNnLnNlYXROdW0gPSB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5zZWF0TnVtO1xyXG4gICAgbXNnLmd1blR5cGUgPSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbDtcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlR3VuUmF0ZSxtc2cpO1xyXG59XHJcbi8v56a75byA5oi/6Ze0XHJcbmZpc2gub25MZWF2ZVJvb20gPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgaWYodGhpcy5wbGF5ZXJJbmZvID09IG51bGwpe1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHt9O1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0pe1xyXG4gICAgICAgIG1zZy5zZWF0TnVtID0gdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uc2VhdE51bTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIj4gNC4g56a75byA5oi/6Ze0IFwiLG1zZyA9PSB1bmRlZmluZWQgPyBcIiBudWwgXCIgOiBtc2csXCIgdGhpcy5wbGF5ZXJJbmZvIFwiLHRoaXMucGxheWVySW5mbyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5sZWF2ZVJvb21QbGF5ZXIsbXNnKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmxlYXZlUm9vbVVuTG9jayxtc2cpO1xyXG4gICAgICAgIG1zZy5yZW1vZUFsbCA9IDE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0gPSBudWxsO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICBjYy53YXJuKFwiPj4gcGxheWVySW5mbyBcIix0aGlzLnBsYXllckluZm8pXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjYy5lcnJvcihcIj4+6K+l55So5oi3IOS7juacquWKoOWFpei/h+aIv+mXtCBcIixtc2cpO1xyXG4gICAgfVxyXG59XHJcbi8v6L+b5YWl5oi/6Ze0XHJcbmZpc2gub25FbnRlclJvb20gPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgaWYodGhpcy5wbGF5ZXJJbmZvID09IG51bGwpe1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHt9O1xyXG4gICAgfVxyXG4gICAgbGV0IGNhbm5vbkxldmVsID0gbXNnLmNhbm5vbkxldmVsICE9IG51bGwgPyBtc2cuY2Fubm9uTGV2ZWwgOiAxO1xyXG4gICAgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0gICAgICAgICAgICAgICAgPSBtc2c7XHJcbiAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25BbW91bnQgICA9IDA7XHJcbiAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5oaXRNYXggICAgICAgICA9IDA7XHJcbiAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5jYW5ub25UeXBlICAgICA9IENPTlNULkNhbm5vblR5cGUuTm9ybWFsO1xyXG4gICAgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0uY2Fubm9uTGV2ZWwgICAgPSBjYW5ub25MZXZlbCA9PSBudWxsIHx8IGNhbm5vbkxldmVsID09IDAgPyAxIDogY2Fubm9uTGV2ZWw7XHJcbiAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS5zZWF0TnVtICAgICAgICA9IE51bWJlcihtc2cuc2VhdElkKTtcclxuICAgIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldLmdvbGQgICAgICAgICAgID0gbXNnLmNvaW47XHJcbiAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS51c2VyU3RhdHVzICAgICA9IENPTlNULlVzZXJTdGF0dXMuT25MaW5lO1xyXG4gICAgY29uc29sZS5sb2coXCI+IDUuIOeUqOaIt+i/m+WFpeaIv+mXtCBcIixtc2cgPT0gdW5kZWZpbmVkID8gXCIgbnVsIFwiIDogbXNnLFwiIHRoaXMucGxheWVySW5mbyBcIix0aGlzLnBsYXllckluZm8pO1xyXG5cclxuICAgIGNjLndhcm4oXCI+PiDnlKjmiLfov5vlhaXmiL/pl7QgdGhpcy5wbGF5ZXJJbmZvIFwiLHRoaXMucGxheWVySW5mbylcclxuICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY29tZUluUGxheWVyLHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldKTtcclxufVxyXG4vL+eUqOaIt+aOiee6v+aYvuekuui/nue6v+S4rVxyXG5maXNoLm9uT2ZmbGluZSA9IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICBpZih0aGlzLnBsYXllckluZm8gPT0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0ge307XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvW051bWJlcihtc2cudWlkKV0udXNlclN0YXR1cyA9IENPTlNULlVzZXJTdGF0dXMuT2ZmTGluZTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZVVzZXJTdGF0dXMsIHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldKTtcclxuICAgIH1cclxufVxyXG4vL+eUqOaIt+WcqOe6v1xyXG5maXNoLm9uT25saW5lID0gZnVuY3Rpb24obXNnKXtcclxuICAgIGlmKHRoaXMucGxheWVySW5mbyA9PSBudWxsKXtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSB7fTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMucGxheWVySW5mb1tOdW1iZXIobXNnLnVpZCldKXtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXS51c2VyU3RhdHVzID0gQ09OU1QuVXNlclN0YXR1cy5PbkxpbmU7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51cGRhdGVVc2VyU3RhdHVzLCB0aGlzLnBsYXllckluZm9bTnVtYmVyKG1zZy51aWQpXSk7XHJcbiAgICB9XHJcbn1cclxuLy/mlLnlj5jkvZnpop0gLSDlkI7lj7DlhYXlgLxcclxuZmlzaC5vbkNvaW5DaGFuZ2VkID0gZnVuY3Rpb24obXNnKXtcclxuICAgIGNvbnNvbGUubG9nKFwib25Db2luQ2hhbmdlZCA+IDIwLiDmlLnlj5jkvZnpop0gXCIsbXNnID09IHVuZGVmaW5lZCA/IFwiIG51bCBcIiA6IG1zZyk7XHJcbiAgICB0aGlzLmdvbGQgICAgICAgICAgICAgICArPSBtc2cub2Zmc2V0O1xyXG4gICAgdGhpcy5kaWFsb2dQYW5lbElzU2hvdyAgPSB0cnVlO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5vbkNvaW5DaGFuZ2VkLG1zZyk7XHJcbiAgICAvLyBjYy5lcnJvcihcIj4+IOWwhOWHuyDmm7TmlrDmiJHnmoTpkrEgNVwiKVxyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5teVVwZGF0ZU1vbmV5KTtcclxufVxyXG4vL+aTjeS9nOWbnuiwg1xyXG5maXNoLm9uUGxheWVyT3AgPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgaWYobXNnLnN1YkdhbWVDb2RlICE9IG51bGwgJiYgbXNnLnN1YkdhbWVDb2RlICE9IDApe1xyXG4gICAgICAgIGNjLmVycm9yKFwiPj4gIG9uUGxheWVyT3Ag5pON5L2cIOaKpemUmeS6hiBcIixtc2cpXHJcbiAgICB9XHJcbn1cclxuLy/ojrflj5Yy5Liq5Z2Q5qCH55qEIOWkueinkuinkuW6puWAvO+8jOi/meS4quaWueazleacieeCueiQveWQjuWSjOS4gOWumueahOWxgOmZkOaAp++8jOW7uuiuruS9v+eUqCBzZXRBbmdsZSDmlrnms5XvvIzmlYjmnpzlt67kuI3lpJpcclxuZmlzaC5nZXRQMVRvUDJBbmdsZSA9IGZ1bmN0aW9uKHN0YXJ0UG9zLGVuZFBvcyl7XHJcbiAgICBsZXQgY29tVmVjID0gbmV3IGNjLlZlYzIoMSwgMCk7ICAgICAgICAgICAgICAgICAvL+iuoeeul+WkueinkueahOWPguiAg+aWueWQke+8jOi/memHjOmAieaLqXjovbTmraPmlrnlkJEs5bqn5L2NIDLjgIEz6buY6K6k5YC8MTgwwrDml4vovaxcclxuICAgIGxldCBkaXJWZWMgPSBzdGFydFBvcy5zdWIoZW5kUG9zKTsgICAgICAgICAgICAgIC8v6I635b6X5LuOc3RhcnRQb3PmjIflkJFlbmRQb3PnmoTmlrnlkJHlkJHph49cclxuICAgIGxldCByYWRpYW4gPSBjYy52MihkaXJWZWMpLnNpZ25BbmdsZShjb21WZWMpOyAgIC8v6I635b6X5bim5pa55ZCR55qE5aS56KeS5byn5bqm5YC8KOWPguiAg+aWueWQkemhuuaXtumSiOS4uuato+WAvO+8jOmAhuaXtumSiOS4uui0n+WAvClcclxuICAgIGxldCBvZnhBbmcgPSAyNzA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5YGP56e76YePXHJcbiAgICBsZXQgYW5nbGUgID0gLShNYXRoLmZsb29yKGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW4pKStvZnhBbmcpOy8v5bCG5byn5bqm6L2s5o2i5Li66KeS5bqmXHJcbiAgICByZXR1cm4gYW5nbGU7XHJcbn1cclxuLy/moLzlvI/ljJYg6YeR6aKdIOaWh+acrOaYvuekulxyXG5maXNoLmdldEZsb2F0ID0gZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG59XHJcbi8v6L+U5Zue5L+d55WZ5Lik5L2N5bCP5pWw55qE5pWw5YC8XHJcbmZpc2guZ2V0Rml4TnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlLGZhY2V0aW9uRGlnaXRzID0gMikge1xyXG4gICAgbGV0IHZhbHVlMSA9IE51bWJlcih2YWx1ZSkuZGl2KDEwKTtcclxuICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKS5kaXYoMTAwKTtcclxuICAgIGlmIChpc05hTih2YWx1ZSkpIHJldHVybjtcclxuICAgIGlmICh+fnZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIGlmICh+fnZhbHVlMSA9PT0gdmFsdWUxKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoZmFjZXRpb25EaWdpdHMtMSA8IDAgPyAwIDogZmFjZXRpb25EaWdpdHMtMSApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9GaXhlZChmYWNldGlvbkRpZ2l0cyk7XHJcbiAgICB9XHJcbn1cclxuLy/kvKDlhaXkuIDkuKrlsI/mlbDlkozkuIDkuKrlpKfmlbDojrflvpfkuYvpl7TnmoTpmo/mnLrmlbTmlbDlgLxcclxuZmlzaC5nZXRSYW5kb21OdW0gPSBmdW5jdGlvbihNaW4sTWF4KXtcclxuICAgIGxldCBSYW5nZSA9IE51bWJlcihNYXgpIC0gTnVtYmVyKE1pbik7XHJcbiAgICBsZXQgUmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICByZXR1cm4gKE1pbiArIE1hdGgucm91bmQoUmFuZCAqIFJhbmdlKSk7XHJcbn1cclxuLy/mianlsZUgLSDmkq3mlL7liqjnlLtcclxuZmlzaC5wbGF5U3BpbmUgPSBmdW5jdGlvbihzcGluZU5vZGUsbG9vcCxwbGF5ZXJkQ2xvc2Usc3BpbmVOYW1lLGNiID0gbnVsbCxuZXh0UGx5TmFtZSA9IG51bGwsbmV4dExvb3AgPSBmYWxzZSl7XHJcbiAgICBzcGluZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIGxldCBzcGluZSA9IHNwaW5lTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KT0+e1xyXG4gICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICBpZihuZXh0UGx5TmFtZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT0gc3BpbmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCxuZXh0UGx5TmFtZSxuZXh0TG9vcCk7XHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJkQ2xvc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgICAgICBjYihuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihwbGF5ZXJkQ2xvc2Upe1xyXG4gICAgICAgICAgICAgICAgc3BpbmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgIGNiKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHNwaW5lLnNldEFuaW1hdGlvbigwLHNwaW5lTmFtZSxsb29wKTtcclxufVxyXG4vL+ajgOafpeS9memineaBouWkjeeKtuaAgVxyXG5maXNoLmNoZWNrR29sZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgY29pbiA9IHRoaXMuYmFzZUNvbnN1bWUgKiB0aGlzLmNhbm5vbkxldmVsO1xyXG4gICAgaWYodGhpcy5nb2xkID49IGNvaW4pe1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUGFuZWxJc1Nob3cgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4vL+WIm+W7uueJueaViFxyXG5maXNoLmNyZWF0b3JFZmZlY3QgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGVmZmVjdCAgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgbGV0IHNwciAgICAgPSBlZmZlY3QuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICBzcHIudHlwZSAgICA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcclxuICAgIHNwci5zaXplTW9kZT0gY2MuU3ByaXRlLlNpemVNb2RlLlRSSU1NRUQ7XHJcbiAgICBsZXQgc2NyaXB0ICA9IGVmZmVjdC5hZGRDb21wb25lbnQoXCJuZmlzaF9Nb3ZpZUNsaXBcIik7XHJcbiAgICBzY3JpcHQudHlwZSA9IDI7XHJcbiAgICByZXR1cm4gZWZmZWN0O1xyXG59XHJcbi8v6KeS5bqm5peL6L2sMTgwIC0g6YCS5b2SXHJcbmZpc2guaXNOZWVkU2V0MTgwQW5nbGUgPSBmdW5jdGlvbihub2RlLGlzTG9nID0gZmFsc2Upe1xyXG4gICAgaWYodGhpcy5nZXRJc1JvdGF0aW9uKCkpe1xyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgdGhpcy5vblNldDE4MEFuZ2xlKG5vZGUsaXNMb2cpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLm9uU2V0MTgwQW5nbGUobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5Db3VudCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc05lZWRTZXQxODBBbmdsZShub2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vL+W8gOWni+iuvue9rlxyXG5maXNoLm9uU2V0MTgwQW5nbGUgPSBmdW5jdGlvbihub2RlLGlzTG9nID0gZmFsc2Upe1xyXG4gICAgbGV0IG5hbWUgPSBub2RlLm5hbWU7XHJcbiAgICBsZXQgbm9kZURlc2MgPSBDT05TVC5Jc05lZWRSb3RhdGlvbltuYW1lXTtcclxuICAgIGlmKG5vZGVEZXNjICE9IG51bGwgJiYgbm9kZS5pc1NldHRpbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIGlmKG5vZGVEZXNjLnJlcGVhdCA9PSBudWxsKXtcclxuICAgICAgICAgICAgbm9kZS5pc1NldHRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLmFuZ2xlID0gbm9kZURlc2MuYW5nbGU7XHJcbiAgICAgICAgaWYobm9kZURlc2Muc2NhbGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyWIHNjYWxlWFxyXG4gICAgICAgICAgICBpZihub2RlRGVzYy5zY2FsZS54ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZVggPSBub2RlRGVzYy5zY2FsZS54O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyWIHNjYWxlWVxyXG4gICAgICAgICAgICBpZihub2RlRGVzYy5zY2FsZS55ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZVkgPSBub2RlRGVzYy5zY2FsZS55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5vZGVEZXNjLm9mZnNleCAhPSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/liJ3lp4vljJYgeFxyXG4gICAgICAgICAgICBpZihub2RlRGVzYy5vZmZzZXgueCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGUueCA9IG5vZGVEZXNjLm9mZnNleC54O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyWIHlcclxuICAgICAgICAgICAgaWYobm9kZURlc2Mub2Zmc2V4LnkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBub2RlLnkgPSBub2RlRGVzYy5vZmZzZXgueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAvL+WIneWni+WMliB3aWRnZXRcclxuICAgICAgICBpZihub2RlRGVzYy53aWRnZXQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBpZihub2RlRGVzYy53aWRnZXQudG9wICE9IG51bGwpd2lkZ2V0LnRvcCAgICAgICA9IG5vZGVEZXNjLndpZGdldC50b3A7XHJcbiAgICAgICAgICAgICAgICBpZihub2RlRGVzYy53aWRnZXQuYm90dG9tICE9IG51bGwpd2lkZ2V0LmJvdHRvbSA9IG5vZGVEZXNjLndpZGdldC5ib3R0b207XHJcbiAgICAgICAgICAgICAgICBpZihub2RlRGVzYy53aWRnZXQubGVmdCAhPSBudWxsKXdpZGdldC5sZWZ0ICAgICA9IG5vZGVEZXNjLndpZGdldC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZURlc2Mud2lkZ2V0LnJpZ2h0ICE9IG51bGwpd2lkZ2V0LnJpZ2h0ICAgPSBub2RlRGVzYy53aWRnZXQucmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzTG9nKXtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCI+PiBuYW1lIDogXCIrbmFtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy/mmK/lkKbmnInml4vovaxcclxuZmlzaC5nZXRJc1JvdGF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc1NldEFuZ2xlICYmICh0aGlzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5SaWdodFRvcCB8fCB0aGlzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wKTtcclxufVxyXG4vL+inkuW6puiuoeeul+WZqFxyXG5maXNoLnNldEFuZ2xlID0gKHgyLHkyLHgxLHkxKT0+e1xyXG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSkgKiAxODAgLyBNYXRoLlBJO1xyXG59XHJcbi8v5qC85byP5YyW6LSn5biBLzEwMFxyXG5maXNoLmZvcm1hdE1vbmV5ID0gKHZhbHVlLCBudW0gPSAyKT0+e1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkgcmV0dXJuO1xyXG4gICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmRpdigxMDApLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKS5kaXYoMTAwKTtcclxuICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IodmFsdWUgKiAxMDApIC8gMTAwKS50b0ZpeGVkKG51bSk7XHJcbiAgICB9XHJcbn1cclxuLy/ngrnlh7vljLrln5/lkIjms5XmgKdcclxuZmlzaC5nZXRDbGlja0FyZWEgPSAoZmlzaCx3aWR0aCxoZWlnaHQpPT57XHJcbiAgICBjb25zdCBIYXJmID0gMjtcclxuICAgIGNvbnN0IE9mZnNleFggPSAtNTA7XHJcbiAgICBjb25zdCBPZmZzZXhZID0gLTUwO1xyXG4gICAgaWYoKChjYy53aW5TaXplLndpZHRoL0hhcmYgLSBPZmZzZXhYICkgLSBNYXRoLmFicyhmaXNoLngpKSA+IDAgJiYgKChjYy53aW5TaXplLmhlaWdodC9IYXJmIC0gT2Zmc2V4WSkgLSBNYXRoLmFicyhmaXNoLnkpKSA+IDApe1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbi8v6ZSA5q+B5riF55CGXHJcbmZpc2guZGVzdHJveSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbCA9IG51bGw7XHJcbiAgICBjb25zb2xlLndhcm4oXCJkZXN0cm95IGZpc2hsb2dpY1wiKVxyXG4gICAgaWYodGhpcy5maXNoUG9vbCl0aGlzLmZpc2hQb29sLmNsZWFyKCk7XHJcbiAgICBpZih0aGlzLmJ1bGxldFBvb2wpdGhpcy5idWxsZXRQb29sLmNsZWFyKCk7XHJcbiAgICB0aGlzLmluaXREYXRhKCk7XHJcbiAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgZ19pbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5sb2coXCI+PumUgOavgea4heeQhiBmaXNobG9naWNcIilcclxuICAgIGRlbGV0ZSB0aGlzO1xyXG59XHJcbi8v5pWw5o2u5Lit5b+DIOWNleS+i+iOt+WPllxyXG5tb2R1bGUuZXhwb3J0cy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyBmaXNobG9naWMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59XHJcbi8v6ZSA5q+BRmlzaOaVsOaNruWxglxyXG5tb2R1bGUuZXhwb3J0cy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGdfaW5zdGFuY2UpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ2Rlc3Ryb3kgZmlzaGxvZ2ljJyk7XHJcbiAgICAgICAgZ19pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn0iXX0=
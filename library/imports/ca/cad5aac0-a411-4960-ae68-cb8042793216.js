"use strict";
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
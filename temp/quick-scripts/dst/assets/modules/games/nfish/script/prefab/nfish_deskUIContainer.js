
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_deskUIContainer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58ee9MwTEZJq5OMYT10566p', 'nfish_deskUIContainer');
// modules/games/nfish/script/prefab/nfish_deskUIContainer.js

"use strict";

/***
 *  捕鱼：桌子UI 菜单、充值、炮台
 * **/
var CONST = require("nfishConst");

glGame.baseclass.extend({
  properties: {
    //金币银币漂移动画 图集
    moneyEffect_Atlas: {
      "default": null,
      displayName: "moneyEffect_Atlas",
      tooltip: "金币银币漂移动画 图集",
      type: cc.SpriteAtlas
    },
    //特殊炮台出生动画 图集
    laserBornEffect_Atlas: {
      "default": null,
      displayName: "laserBornEffect_Atlas",
      tooltip: "特殊炮台出生动画 图集",
      type: cc.SpriteAtlas
    },
    //鱼Icon 图集
    icon_Atlas: {
      "default": null,
      displayName: "icon_Atlas",
      tooltip: "鱼Icon 图集",
      type: cc.SpriteAtlas
    },
    //2 3 4 档鱼 捕获 Icon 图集
    icon_2_3_4_Atlas: {
      "default": null,
      displayName: "get_rawar_Atlas",
      tooltip: "2 3 4 档鱼 捕获 Icon 图集",
      type: cc.SpriteAtlas
    },
    //特殊鱼Tip Icon 图集
    speciaIcon_Atlas: {
      "default": null,
      displayName: "speciaIcon_Atlas",
      tooltip: "特殊鱼Tip Icon 图集",
      type: cc.SpriteAtlas
    },
    explosionAndLightning_Atlas: {
      "default": null,
      displayName: "特效图集",
      tooltip: "爆炸，灰烬，闪电",
      type: cc.SpriteAtlas
    },
    illustratedBook: cc.Prefab,
    //图鉴
    record_pre: cc.Prefab,
    //记录详情
    setting_pre: cc.Prefab,
    //设置界面
    turntable: cc.Prefab,
    //自己的 玉如意转盘
    cornucopia: cc.Prefab,
    //自己的 聚宝盆
    bulletEffect: cc.Prefab,
    //炮台子弹射出炮口时动画的 播放器
    fishTip: cc.Prefab,
    //鱼冒泡
    changeCannonEffectList: [sp.SkeletonData],
    //4个特殊炮台变身特效
    batteryList: [sp.SkeletonData],
    //注意了！！  下标0-9的炮台 是 对应 1-10号炮台 ，下标 10 - 13 是特殊炮台
    //ui容器
    ui_Actionable: cc.Node,
    bulletTips: cc.Node,
    //技能按钮
    ui_skillAuto: cc.Node,
    ui_skillLock: cc.Node,
    //特殊鱼即将出生 ui
    bossConeInTip: cc.Node,
    bossBornTip: cc.Node,
    bossNormalPos: cc.Node,
    //财神、熔岩玄武 入场效果
    spine_csrcdh: cc.Node,
    effect_csrcdh: cc.Node,
    spine_ryxwrcdh: cc.Node,
    effect_ryxwrcdh: cc.Node,
    //菜单
    ui_menu: cc.Node,
    ui_menuBtn: cc.Node,
    //粒子
    chick_act: cc.Node,
    chick_meihua: cc.Node,
    //弹出窗口
    alert_container: cc.Node,
    text_exitBossClearSocre: cc.Node,
    text_exitLosCannan: cc.Node,
    text_netOff: cc.Node,
    btn_quit: cc.Node,
    btn_queding: cc.Node,
    btn_queding_net: cc.Node
  },
  onLoad: function onLoad() {
    this.creatSmear = true;
    this.bossTipMoveToTime = 0.5;
    this.node.isInit = 1;
    this.bulletTipTime = 0;
    this.clickFishPoolEvent = null;
    this.clickFishPoolTime = 0;
    this.lastAngle = null;
    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.fireTime = 0; //开火计时器

    this.fireTimeFrequency = 0.17; //开火频率

    this.isFire = true; //是否可以开火

    this.logic.cannonLevel = cc.sys.localStorage.getItem("gunLevel_" + glGame.user.userID) ? Number(cc.sys.localStorage.getItem("gunLevel_" + glGame.user.userID)) : 1;
    this.isExit = true;
    this.turntableView = null;
    this.cornucopiaView = null;
    this.runSpecial0 = false;
    this.runSpecial1 = false;
    this.runSpecial2 = false;
    this.runSpecial3 = false;
    this.followFishTipList = [];
    this.logic.gameZoomX = cc.winSize.width / CONST.DesignSize.width;
    this.logic.gameZoomY = cc.winSize.height / CONST.DesignSize.height;
    this.registerEvent();
    this.initSpeciaNode();
  },
  start: function start() {
    //初始化界面隐藏ui，等待数据
    var Invisible = 0;
    var MaxUserNum = 4;
    var Normal = 255;
    var FadeToTime = 1.3;
    var DelayTime = 0.6;

    for (var i = 0; i < MaxUserNum; i++) {
      this.ui_Actionable.getChildByName("ui_bg" + i).active = false;
      this.ui_Actionable.getChildByName("tower_bg" + i).active = false;
      var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + i);
      var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + i);
      var ui_wait = ui_pos.getChildByName("ui_wait");
      ui_gun.getChildByName("batteryMask").addComponent("nfish_laserhitNode");
      ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).enabled = false;
      ui_gun.getChildByName("batteryMask").opacity = Invisible;
      ui_gun.active = false;
      ui_wait.stopAllActions();
      ui_wait.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(FadeToTime, Invisible), cc.delayTime(DelayTime), cc.fadeTo(FadeToTime, Normal))));
    }

    glGame.gameNet.send_msg('http.ReqNewFishConfig', {
      gameid: 49
    }, function (route, msg) {
      if (msg.result != null) {
        glGame.fishMutipleCfg = msg.result;
      }

      console.log("fish_books----------------", msg);
    });
  },
  //初始化特殊奖励（玉如意、聚宝盆）有关的
  initSpeciaNode: function initSpeciaNode() {
    var special_Cantainer = this.node.getChildByName("special_Cantainer");
    this.turntableView = cc.instantiate(this.turntable);
    special_Cantainer.addChild(this.turntableView);
    this.turntableView.opacity = 0;
    this.cornucopiaView = cc.instantiate(this.cornucopia);
    special_Cantainer.addChild(this.cornucopiaView);
    this.cornucopiaView.opacity = 0;
  },
  //初始化界面隐藏ui，等待数据
  hide: function hide() {
    var Normal = 255;
    var spine_csrcdh = this.node.getChildByName("spine_effect").getChildByName("spine_csrcdh");
    var spine_ryxwrcdh = this.node.getChildByName("spine_effect").getChildByName("spine_ryxwrcdh");
    spine_csrcdh.active = false;
    spine_csrcdh.opacity = Normal;
    spine_ryxwrcdh.active = false;
    spine_ryxwrcdh.opacity = Normal;
    this.ui_menu.active = false;
    this.node.getChildByName("ui_ExitTip").active = false;
    this.node.getChildByName("ui_fireEffect").active = false;
    var MaxUserNum = 4;
    var NormalOpacity = 255;

    for (var i = 0; i < MaxUserNum; i++) {
      if (!this.logic.isEnterRoom) {
        this.ui_Actionable.getChildByName("ui_bg" + i).active = false;
        this.ui_Actionable.getChildByName("tower_bg" + i).active = false;
        var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + i);
        ui_gun.getChildByName("batteryMask").opacity = NormalOpacity;
        ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).enabled = false;
        ui_gun.active = false;
      }
    }
  },
  //注册监听
  registerEvent: function registerEvent() {
    glGame.emitter.on(CONST.clientEvent.comeInPlayer, this.comeInPlayerHandler, this); //用户进入

    glGame.emitter.on(CONST.clientEvent.leaveRoomPlayer, this.leaveRoomPlayerHandler, this); //用户离开

    glGame.emitter.on(CONST.clientEvent.clickFishPool, this.clickFishPoolHandler, this); //点击鱼池子

    glGame.emitter.on(CONST.clientEvent.hiddenLocationTip, this.hiddenLocationTipHandler, this); //隐藏位置提示

    glGame.emitter.on(CONST.clientEvent.playFiringEffect, this.playFiringEffectHandler, this); //播放开炮效果

    glGame.emitter.on(CONST.clientEvent.updateShootGold, this.updateShootGoldHandler, this); //更新用户射击余额

    glGame.emitter.on(CONST.clientEvent.updateGunRate, this.updateGunRatedHandler, this); //更新炮台倍率

    glGame.emitter.on(CONST.clientEvent.updateGunRecoil, this.updateGunRecoilHandler, this); //为其他玩家设置后坐力

    glGame.emitter.on(CONST.clientEvent.onFreezeShowUI, this.onFreezeShowUIHandler, this); //冰冻显示UI

    glGame.emitter.on(CONST.clientEvent.fireSettingRecoil, this.fireSettingRecoilHandler, this); //为自己设置后坐力

    glGame.emitter.on(CONST.clientEvent.onCoinChanged, this.onCoinChangedHandler, this); //充值到账财神爷动画

    glGame.emitter.on(CONST.clientEvent.playCoinEffect, this.playCoinEffectHandler, this); //死鱼飘金币

    glGame.emitter.on(CONST.clientEvent.onSurfStart, this.onSurfStartHandler, this); //海浪鱼群 - 海浪UI

    glGame.emitter.on(CONST.clientEvent.showFishTideTitle, this.showFishTideTitleHandler, this); //显示浪潮来临

    glGame.emitter.on(CONST.clientEvent.myUpdateMoney, this.myUpdateMoneyHandler, this); //更新自己钱

    glGame.emitter.on(CONST.clientEvent.checkAutoAndLock, this.checkAutoAndLockHandler, this); //检查锁定和自动按钮

    glGame.emitter.on(CONST.clientEvent.upSpecialGunCoin, this.upSpecialGunCoinHandler, this); //更新特殊炮台子弹数量

    glGame.emitter.on(CONST.clientEvent.getSpecialCannon, this.getSpecialCannonHandler, this); //获取到一个特殊炮台

    glGame.emitter.on(CONST.clientEvent.restoreCannon, this.restoreCannonHandler, this); //特殊子弹用完，恢复炮台

    glGame.emitter.on(CONST.clientEvent.bossComein, this.bossComeinHandler, this); //boss出现

    glGame.emitter.on(CONST.clientEvent.sprinkleRedBag, this.sprinkleRedBagHandler, this); //财神出金币

    glGame.emitter.on(CONST.clientEvent.showTurntable, this.showTurntableHandler, this); //玉如意 出转盘 聚宝盆 出拉霸

    glGame.emitter.on(CONST.clientEvent.otherPlayerShowSpecialAward, this.oPSSAHandler, this); //其他人的 如意 聚宝鹏 展示

    glGame.emitter.on(CONST.clientEvent.specialBulletStatistics, this.specialBulletStatistics, this); //特殊子弹统计

    glGame.emitter.on(CONST.clientEvent.checkSpecialBullet, this.checkSpecialBulletHandler, this); //特殊子弹统计 - 检查器

    glGame.emitter.on(CONST.clientEvent.checkRotation, this.checkRotationHandler, this); //设置旋转

    glGame.emitter.on(CONST.clientEvent.hideBossConinUI, this.hideBossConinUIHandler, this); //隐藏boss来了

    glGame.emitter.on(CONST.clientEvent.updateUserStatus, this.updateUserStatusHandler, this); //隐藏boss来了

    glGame.emitter.on(CONST.clientEvent.addGoldEffect, this.addGoldEffectHandler, this); //飘分

    glGame.emitter.on(CONST.clientEvent.showAlert, this.showAlertHandler, this); //alert弹出框

    glGame.emitter.on(CONST.clientEvent.accumulate, this.accumulateHandler, this); //蓄力播放

    glGame.emitter.on(CONST.clientEvent.clearbossComein, this.clearbossComeinHandler, this); //清理boss进入

    glGame.emitter.on(CONST.clientEvent.clearSpecialBulletPool, this.clearSpecialHandler, this); //清理特殊子弹

    glGame.emitter.on(CONST.clientEvent.bossGodOfWealthCoin, this.bossGodOfWealthCoinHandler, this); //财神进入

    glGame.emitter.on(CONST.clientEvent.bossLavaBasaltComin, this.bossLavaBasaltCominHandler, this); //熔岩玄武进入

    glGame.emitter.on(CONST.clientEvent.checkSpecialCannon, this.checkSpecialCannonHandler, this); //检查特殊炮台

    glGame.emitter.on(CONST.clientEvent.followFishTip, this.followFishTipHandler, this); //显示鱼气泡

    glGame.emitter.on(CONST.clientEvent.clearFollowFishTip, this.clearFollowFishTipHandler, this); //显示鱼气泡

    this.node.on(cc.Node.EventType.TOUCH_START, this.onFireHooHandler, this); //开始 点击屏幕 开始 发射

    this.node.on(cc.Node.EventType.TOUCH_END, this.onFireHooHandler, this); //结束 点击屏幕 停止 发射

    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onFireHooHandler, this); //取消 点击屏幕 停止 发射

    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveHandler, this); //移动 点击还移动，自动射击的时候更新角度
  },
  //反注册监听
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off(CONST.clientEvent.comeInPlayer, this);
    glGame.emitter.off(CONST.clientEvent.leaveRoomPlayer, this);
    glGame.emitter.off(CONST.clientEvent.clickFishPool, this);
    glGame.emitter.off(CONST.clientEvent.hiddenLocationTip, this);
    glGame.emitter.off(CONST.clientEvent.playFiringEffect, this);
    glGame.emitter.off(CONST.clientEvent.updateShootGold, this);
    glGame.emitter.off(CONST.clientEvent.updateGunRate, this);
    glGame.emitter.off(CONST.clientEvent.updateGunRecoil, this);
    glGame.emitter.off(CONST.clientEvent.onFreezeShowUI, this);
    glGame.emitter.off(CONST.clientEvent.fireSettingRecoil, this);
    glGame.emitter.off(CONST.clientEvent.onCoinChanged, this);
    glGame.emitter.off(CONST.clientEvent.playCoinEffect, this);
    glGame.emitter.off(CONST.clientEvent.onSurfStart, this);
    glGame.emitter.off(CONST.clientEvent.showFishTideTitle, this);
    glGame.emitter.off(CONST.clientEvent.myUpdateMoney, this);
    glGame.emitter.off(CONST.clientEvent.checkAutoAndLock, this);
    glGame.emitter.off(CONST.clientEvent.getSpecialCannon, this);
    glGame.emitter.off(CONST.clientEvent.upSpecialGunCoin, this);
    glGame.emitter.off(CONST.clientEvent.restoreCannon, this);
    glGame.emitter.off(CONST.clientEvent.bossComein, this);
    glGame.emitter.off(CONST.clientEvent.sprinkleRedBag, this);
    glGame.emitter.off(CONST.clientEvent.showTurntable, this);
    glGame.emitter.off(CONST.clientEvent.otherPlayerShowSpecialAward, this);
    glGame.emitter.off(CONST.clientEvent.specialBulletStatistics, this);
    glGame.emitter.off(CONST.clientEvent.checkSpecialBullet, this);
    glGame.emitter.off(CONST.clientEvent.checkRotation, this);
    glGame.emitter.off(CONST.clientEvent.hideBossConinUI, this);
    glGame.emitter.off(CONST.clientEvent.updateUserStatus, this);
    glGame.emitter.off(CONST.clientEvent.addGoldEffect, this);
    glGame.emitter.off(CONST.clientEvent.showAlert, this);
    glGame.emitter.off(CONST.clientEvent.accumulate, this);
    glGame.emitter.off(CONST.clientEvent.clearbossComein, this);
    glGame.emitter.off(CONST.clientEvent.clearSpecialBulletPool, this);
    glGame.emitter.off(CONST.clientEvent.bossGodOfWealthCoin, this);
    glGame.emitter.off(CONST.clientEvent.bossLavaBasaltComin, this);
    glGame.emitter.off(CONST.clientEvent.checkSpecialCannon, this);
    glGame.emitter.off(CONST.clientEvent.followFishTip, this);
    glGame.emitter.off(CONST.clientEvent.clearFollowFishTip, this);
    this.node.off(cc.Node.EventType.TOUCH_START, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this);
  },
  //检查自动按钮
  checkAutoAndLockHandler: function checkAutoAndLockHandler() {
    var roomLockAutoData = glGame.storage.getItem(CONST.SkillisLockAutoChange);

    if (roomLockAutoData != null && roomLockAutoData[this.logic.roomId] == "o") {
      this.onSkillAutoHandler();
    }

    var roomSkillData = glGame.storage.getItem(CONST.SkillLock);

    if (roomSkillData != null && roomSkillData[this.logic.roomId] == "o") {
      this.onSkillLockHandler();
    }
  },
  //自动射击的时候获取角度
  onMoveHandler: function onMoveHandler(evt) {
    if (this.logic.isAuto) this.lastAngle = this.getAngle(evt.getLocation());
  },
  //点击屏幕 发射
  onFireHooHandler: function onFireHooHandler(evt) {
    glGame.emitter.emit(CONST.clientEvent.fishCancelShoot, evt);
  },
  //用户进入，显示炮台
  comeInPlayerHandler: function comeInPlayerHandler(res) {
    this.initPlayer(res, true);
  },
  //用户离开
  leaveRoomPlayerHandler: function leaveRoomPlayerHandler(res) {
    this.initPlayer(res, false);
  },
  //更新用户状态 seatNum 座位 isOnLine 是否在线
  updateUserStatusHandler: function updateUserStatusHandler(res) {
    var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + res.seatNum);
    var ui_other = ui_pos.getChildByName("ui_other");
    var netSt = ui_other.getChildByName("netStatusContainer");
    netSt.active = res.userStatus == CONST.UserStatus.OffLine;
  },
  //初始化用户
  initPlayer: function initPlayer(play, isInit) {
    if (!play) return;
    var myid = glGame.user.userID;
    var seatNum = play.seatNum;
    var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + seatNum);
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + seatNum);
    var tower_bg = this.ui_Actionable.getChildByName("tower_bg" + seatNum);
    var ui_bg = this.ui_Actionable.getChildByName("ui_bg" + seatNum);
    var ui_unWait = ui_bg.getChildByName("ui_unWait");
    var lab_coin = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");

    if (ui_pos == null) {
      cc.error(">> 出错了 ", play);
      return;
    }

    var ui_other = ui_pos.getChildByName("ui_other");
    var netSt = ui_other.getChildByName("netStatusContainer");
    ui_other.active = isInit;
    netSt.active = false;
    ui_pos.active = true;
    ui_gun.active = isInit;
    tower_bg.active = isInit;

    if (isInit) {
      lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(play.gold);
    }

    ui_pos.getChildByName("ui_wait").active = !isInit;
    ui_bg.active = isInit;
    ui_bg.getChildByName("ui_unWait").active = isInit;
    ui_bg.getChildByName("ui_unWait").getChildByName("img_zijipaotai").active = myid == play.uid;

    if (myid != play.uid) {
      var spine_restoreCannon = ui_gun.getChildByName("spine_restoreCannon");
      this.logic.playSpine(spine_restoreCannon, false, true, CONST.SpineName.Normal);
    }

    if (play.uid != undefined && myid == play.uid) {
      this.logic.isEnterRoom = true;
      this.logic.seatNum = seatNum;
      var ui_Tip = this.node.getChildByName("ui_Tip");
      ui_Tip.getChildByName("ui_" + seatNum).active = isInit;
      var spineName = play.seatNum == CONST.Seat.RightTop || play.seatNum == CONST.Seat.LeftTop ? CONST.SpineName.YouHereTop : CONST.SpineName.YouHereButtom;

      if (this.logic.getIsRotation()) {
        spineName = play.seatNum == CONST.Seat.RightTop || play.seatNum == CONST.Seat.LeftTop ? CONST.SpineName.YouHereButtom : CONST.SpineName.YouHereTop;
      }

      this.logic.playSpine(ui_Tip.getChildByName("ui_" + seatNum), true, false, spineName);
      ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonLevel;

      if (this.logic.offLineMissileData != null) {
        //人物进入初始化房间结束后继续初始化断线重连的数据
        cc.warn("> 人物进入初始化房间结束后继续初始化断线重连的数据 ");
        glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp, JSON.parse(JSON.stringify(this.logic.offLineMissileData)));
        this.logic.offLineMissileData = null;
      }
    } else {
      this.updateGunRecoilHandler(play);
    }

    if (play.cannonType == CONST.CannonType.Normal) {
      //普通炮台样式
      ui_other.getChildByName("img_paobeikuang1").active = true;
      ui_other.getChildByName("lab_gunLv").active = true;
      ui_other.getChildByName("img_paobeikuang2").active = false;
      ui_other.getChildByName("ui_gunLvBg").active = false;
      ui_other.getChildByName("lab_gunLv2").active = false;
    } else {
      //特殊炮台样式
      ui_other.getChildByName("img_paobeikuang1").active = false;
      ui_other.getChildByName("lab_gunLv").active = false;
      ui_other.getChildByName("img_paobeikuang2").active = true;
      ui_other.getChildByName("ui_gunLvBg").active = true;
      ui_other.getChildByName("lab_gunLv2").active = true;
    }

    if (isInit) {
      var battery = ui_gun.getChildByName("battery");
      var batterySkeletonData;

      switch (play.cannonType) {
        case CONST.CannonType.Lightning:
          // 闪电
          batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
          break;

        case CONST.CannonType.PartialBomb:
          // 炎爆
          batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
          break;

        case CONST.CannonType.Laser:
          // 龙息
          batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
          break;

        case CONST.CannonType.Missile:
          // 仙剑
          batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
          break;

        case CONST.CannonType.Normal:
          // 普通1-10级别
          break;

        default:
          cc.error("===================初始化 炮台有误 ！", play);
      }

      if (play.cannonType != CONST.CannonType.Normal) {
        //刚进来 如果数据有 龙溪炮台 那么现实龙溪炮台
        if (batterySkeletonData == null) {
          cc.warn(">>>> 无法实例化 炮台 ", play);
        }

        if (this.logic.seatNum == play.seatNum) cc.warn("7 ======更换炮台====== cannonType " + play.cannonType);
        battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
        ui_gun.cannonType = play.cannonType;
        this.logic.playSpine(battery, true, false, CONST.SpineName.Idle);
        ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonAmount + ""; //特殊炮台 现实 炮弹数量

        ui_other.getChildByName("lab_gunLv2").getComponent(cc.Label).string = play.cannonAmount + ""; //特殊炮炮台 不显示 加减号

        ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = false;
        ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = false;
      } else {
        ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = myid == play.uid;
        ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = myid == play.uid;
        ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonLevel + "";
        ui_other.getChildByName("lab_gunLv2").getComponent(cc.Label).string = play.cannonLevel + "";
        var NormalCannonOffsex = 1;
        var cannon = Number(play.cannonLevel) - NormalCannonOffsex;

        if (cannon < 0) {
          cannon = 0;
        }

        if (this.logic.seatNum == play.seatNum) cc.warn("6 ======更换炮台====== cannonType " + play.cannonType);
        battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
        ui_gun.cannonType = play.cannonType;
        this.logic.playSpine(battery, true, false, CONST.SpineName.Idle);
      }
    }
  },
  //播放开炮效果
  playFiringEffectHandler: function playFiringEffectHandler(res) {
    var gunType = res.gunType;
    var seatNum = res.seatNum;
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + seatNum);

    if (gunType == CONST.CannonType.Laser) {
      //这个是 龙溪的擎天柱 独有的 ，其余的 暂时没有开炮效果
      var Invisible = 0;
      var NormalOpacity = 255;
      var batteryMask = ui_gun.getChildByName("batteryMask");
      batteryMask.opacity = NormalOpacity;
      batteryMask.getComponent(cc.BoxCollider).enabled = true;
      var spineNode = cc.instantiate(batteryMask.getChildByName("spcGun"));
      spineNode.active = true;
      batteryMask.addChild(spineNode);
      this.logic.playSpine(spineNode, false, false, CONST.SpineName.Idle, function (spineName) {
        batteryMask.getComponent(cc.BoxCollider).enabled = false;
        batteryMask.opacity = Invisible;
        spineNode.destroy();
      });
    } else {//停用老的 开炮效果 等待替图资源到位
      // let ui_bulletEff = cc.instantiate(this.bulletEffect);
      // ui_bulletEff.active = true;
      // ui_bulletEff.position = ui_gun.getChildByName("ui_bulletEffect").position;
      // ui_gun.addChild(ui_bulletEff);
      // let fish_MovieClip = ui_bulletEff.getComponent("nfish_MovieClip");
      // fish_MovieClip.type = CONST.EffectType.Effect;
      // fish_MovieClip.initEffect(this.button_gun_help_nzzl_tower_Atlas,"bullet_2_",2,6,1,false,0.02,true);
      // let scale;
      // if(res.gunType == 2){//能量炮
      //     scale = 1;
      // }else{
      //     scale = 0.5;
      //     for (let i=0;i<gunRate;i++){
      //         if(i>4){
      //             scale+=0.07;
      //         }else{
      //             scale+=0.04;
      //         }
      //     }
      // }
      // ui_bulletEff.scale = scale;
    }
  },
  //更新自己的钱
  myUpdateMoneyHandler: function myUpdateMoneyHandler() {
    var ui_bg = this.ui_Actionable.getChildByName("ui_bg" + this.logic.seatNum);
    var ui_unWait = ui_bg.getChildByName("ui_unWait");
    var lab_coin = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");
    lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(Number(this.logic.gold + ""));
  },
  //其他玩家射击，更新余额
  updateShootGoldHandler: function updateShootGoldHandler(res) {
    if (this.logic.seatNum == res.seatNum) {
      return;
    }

    var ui_bg = this.ui_Actionable.getChildByName("ui_bg" + res.seatNum);
    var ui_unWait = ui_bg.getChildByName("ui_unWait");
    var lab_coin = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");
    lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(res.gold);
  },
  //其他玩家射击-设置 炮台角度-后坐力
  updateGunRecoilHandler: function updateGunRecoilHandler(res) {
    var isSetRecoil = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + res.seatNum);
    if (res.angle != undefined) ui_gun.angle = res.angle;

    if (isSetRecoil) {
      this.fireBulletSettingRecoil(res.seatNum); // cc.error(">>>>  炮台 后坐力 == 开始 播放 2 seatNum "+res.seatNum+" ui_gun angle "+ui_gun.angle);
    }
  },
  //点击鱼池,调整炮台角度，发射子弹，设置后坐力
  clickFishPoolHandler: function clickFishPoolHandler(evt) {
    if (evt != null) {
      //射击 范围判断
      var pos = evt.getLocation();

      if (this.logic.seatNum == CONST.Seat.LeftTop || this.logic.seatNum == CONST.Seat.RightTop) {
        var OffsexY = 1044;

        if (pos.y > OffsexY) {
          return;
        }
      } else {
        var _OffsexY = 60;

        if (pos.y < _OffsexY) {
          return;
        }
      }
    }

    if (this.logic.MaxBullte == 0) {
      cc.error("未初始化，无法发射");
      return;
    }

    if (this.logic.bullteNum >= this.logic.MaxBullte) {
      cc.warn(">> 子弹数量超过 " + this.logic.MaxBullte + " ，不予发射 ", this.logic.bullteNum);
      this.bulletTips.active = true;
      return;
    }

    if (!evt) {
      this.nextClickFishPoolHandler(null);
    } else {
      var ShootGapTime = -0.125;

      if (this.logic.isLock) {
        this.clickFishPoolTime = ShootGapTime;
      }

      this.clickFishPoolEvent = evt;
    }
  },
  //点击鱼池,调整炮台角度，发射子弹，设置后坐力
  nextClickFishPoolHandler: function nextClickFishPoolHandler(evt) {
    var _this = this;

    if (!this.logic.isEnterRoom) {
      return;
    }

    if (!glGame.gameNet.getState()) {
      this.logic.isEnterRoom = false;
      cc.error("当前是 断网状态 无法发射");
      return;
    }

    var coin = this.logic.baseConsume * this.logic.cannonLevel;

    if (this.logic.gold == undefined || this.logic.gold < coin) {
      //余额检查
      var NewGround = 99;

      if (this.logic.roomRule.Rank != NewGround) {
        this.showNotMoneyDialog();
      }

      return;
    } //控制频率


    if (!this.isFire) {
      cc.log(">> 控制频率 无法发射");
      return;
    }

    if (this.logic.isYuRuyiRuning) {
      cc.warn(">正在使用玉如意转盘，停火 ");
      return;
    }

    if (this.logic["isGunMoving" + this.logic.seatNum] == 1) {
      cc.warn(">正在更换炮台 播放特效 无法发射子弹 ", this.logic["isGunMoving" + this.logic.seatNum], " seatNum ", this.logic.seatNum);
      return;
    }

    var HaveSpecialCannon = 1;
    var playerInfo = this.logic.playerInfo[Number(glGame.user.userID)];

    if (playerInfo == null) {
      cc.error(">> 找不到用户 ", this.logic.playerInfo);
      return;
    }

    this.isFire = false;
    var angle = undefined;
    var myid = glGame.user.userID;
    var arg = {
      uid: myid,
      seatNum: this.logic.seatNum,
      gunType: this.logic.gunType,
      gunLevel: this.logic.cannonLevel
    };
    var currentIsMissile = this.logic.currentBullteType == CONST.CannonType.Missile; //true 当前是仙剑

    var nextIsHaveMissile = playerInfo.hitMax != null && playerInfo.cannonAmount > HaveSpecialCannon && playerInfo.cannonType == CONST.CannonType.Missile; //下一发子弹是不是 仙剑

    if (this.logic.specialBulletPool[Number(this.logic.seatNum)] != null) {
      cc.warn(">>>不能重复发送 屏幕已有特殊子弹  子弹类型 : " + this.logic.specialBulletPool[Number(this.logic.seatNum)]);
      return;
    }

    if (this.logic.currentBullteType == CONST.CannonType.Missile) {
      cc.warn(">>>不能重复发送仙剑子弹 2 ");
      return;
    }

    if (this.logic.currentBullteType == CONST.CannonType.Laser) {
      cc.warn(">>有 龙溪 子弹 正在屏幕内");
      return;
    }

    if (currentIsMissile && nextIsHaveMissile) {
      cc.warn("当前是仙剑子弹，下一发还是仙剑，无法射击");
      return;
    }

    if (this.logic.currentBullteType == CONST.CannonType.Lightning) {
      cc.warn(">>有 闪电 子弹 正在屏幕内");
      return;
    }

    if (this.logic.currentBullteType == CONST.CannonType.PartialBomb) {
      cc.warn(">>有 炎爆 子弹 正在屏幕内");
      return;
    }

    if (evt != null) {
      //正常点击
      if (!this.logic.startFire) {
        cc.warn(">鱼潮来临，发射停用");
        return;
      }

      if (this.logic.isLock == true) {
        if (this.logic.lockFishID != null) {
          arg.lock = Number(this.logic.lockFishID);
          arg.indexNum = Number(this.logic.lockFishIndex);
          arg.angle = null;
        } else {
          this.node.getChildByName("noClickFIsh_tips").active = true;
          this.node.getChildByName("noClickFIsh_tips").stopAllActions();
          this.node.getChildByName("noClickFIsh_tips").runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
            _this.node.getChildByName("noClickFIsh_tips").active = false;
          })));
          return;
        }
      }

      if (this.logic.lockFishID != null) {
        arg.lock = Number(this.logic.lockFishID);
        arg.indexNum = Number(this.logic.lockFishIndex);
        arg.angle = null;
      } else {
        var pos = evt.getLocation();
        angle = this.getAngle(pos);
        arg.angle = angle;
      }
    } else //自动射击
      {
        var ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
        var len = ui_physicalPool.childrenCount;
        var fishLen = 0;
        var MaxFish = 10;

        for (var i = 0; i < len; i++) {
          var n = ui_physicalPool.children[i];

          if (n != null) {
            var fish_Unit = n.getComponent("nfish_Unit");

            if (fish_Unit != null && fish_Unit.getFishID() != null) {
              fishLen++;

              if (fishLen > MaxFish) {
                break;
              }
            }
          }
        }

        if (!this.logic.startFire) {
          cc.warn(">鱼潮来临，自动发射停用");
          return;
        }

        if (this.logic.isLock == true && this.logic.lockFishID != null) {
          //锁定  有目标
          arg.lock = Number(this.logic.lockFishID);
          arg.angle = null;
        } else {
          var NormalAngle = 180;
          var ZeroAngle = 0; //未锁定

          if (this.logic.seatNum == 0 || this.logic.seatNum == 1) {
            angle = this.lastAngle == null ? ZeroAngle : this.lastAngle;
          } else {
            angle = this.lastAngle == null ? NormalAngle : this.lastAngle;
          }

          arg.angle = angle;
        }
      }

    glGame.emitter.emit(CONST.clientEvent.adjustGunAngle, arg);
  },
  //金额不足弹窗
  showNotMoneyDialog: function showNotMoneyDialog() {
    var _this2 = this;

    if (this.logic.dialogPanelIsShow) return;
    this.logic.dialogPanelIsShow = true;

    if (this.logic.isAuto || this.logic.isLockAutoChange) {
      //如果自动 那么解除
      this.onSkillAutoHandler();
    }

    if (this.logic.isLock) {
      //如果锁定 那么解除
      this.onSkillLockHandler();
    }

    var string = "<color=#CFECFC>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u70AE\u500D\u9700\u8981</c> <color=#FDC916> ".concat(this.logic.getFloat(this.logic.cannonLevel * this.logic.baseConsume), "  </c><color=#CFECFC>\u91D1\u5E01\u624D\u53EF\u5F00\u70AE\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
    glGame.panel.showDialog("", string, function () {
      _this2.logic.dialogPanelIsShow = false;
      glGame.panel.showShop(9999);
    }, function () {
      _this2.logic.dialogPanelIsShow = false;
    }, "取消", "充值", 9999);
  },
  //获取朝向
  getAngle: function getAngle(pos) {
    var direction = this.node.convertToNodeSpaceAR(pos);
    var startPos = this.ui_Actionable.getChildByName("ui_gun" + this.logic.seatNum).position;
    return this.logic.getP1ToP2Angle(startPos, direction);
  },
  //赋值后坐力
  fireSettingRecoilHandler: function fireSettingRecoilHandler(res) {
    var angle = res.angle;
    if (angle != undefined) this.ui_Actionable.getChildByName("ui_gun" + this.logic.seatNum).angle = angle;
    this.lastAngle = angle;
    this.fireBulletSettingRecoil(this.logic.seatNum);
  },
  //实现后坐力逻辑
  fireBulletSettingRecoil: function fireBulletSettingRecoil(seatNum) {
    var battery = this.ui_Actionable.getChildByName("ui_gun" + seatNum).getChildByName("battery");
    this.logic.playSpine(battery, false, false, CONST.SpineName.Attack, null, CONST.SpineName.Idle, true);
  },
  //隐藏位置提示
  hiddenLocationTipHandler: function hiddenLocationTipHandler() {
    var _this3 = this;

    this.scheduleOnce(function () {
      var ui_Tip = _this3.node.getChildByName("ui_Tip");

      if (ui_Tip.getChildByName("ui_" + _this3.logic.seatNum)) {
        ui_Tip.getChildByName("ui_" + _this3.logic.seatNum).active = false;
      }
    }, 3);
  },
  onClick: function onClick(name, node) {
    var NotExit = 4;
    var IstExit = 1;

    switch (name) {
      case "ui_mask":
        return this.closeViewHandler(NotExit);
      //退出

      case "ui_menuBtn":
        return this.menuViewHandler();
      //菜单

      case "ui_rechargeBtn":
        return this.rechargeClickHandler();
      //充值

      case "btn_chongzhi":
        return this.rechargeClickHandler();
      //充值

      case "btn_tuichu":
        return this.closeViewHandler(IstExit);
      //退出

      case "btn_yuzhong":
        return this.openFishGroupHandler();
      //打开图鉴

      case "btn_jilu":
        return this.historyClickHandler();
      //记录

      case "btn_shezhi":
        return this.settingClickHandler();
      //设置

      case "ui_BtnPlus":
        return this.plusClickHandler();
      //加号 + 炮台

      case "ui_BtnSub":
        return this.subClickHandler();
      //减号 - 炮台

      case "ui_skillLock":
        return this.onSkillLockHandler();
      //锁定

      case "ui_skillAuto":
        return this.onSkillAutoHandler();
      //自动

      case "btn_quit":
        return this.onQuitHandler();
      //alert-取消

      case "btn_queding":
        return this.onQuedingHandler();
      //alert-确认

      case "btn_queding_net":
        return this.onQuedingOffNetHandler();
      //alert-确认-断网

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //更新特殊炮台数量
  upSpecialGunCoinHandler: function upSpecialGunCoinHandler(res) {
    var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + res.seatNum);
    ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = res.cannonLevel + "";
    ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = res.cannonLevel + "";
  },
  //获取到一个特殊炮台
  getSpecialCannonHandler: function getSpecialCannonHandler(res) {
    var _this4 = this;

    var myid = Number(glGame.user.userID);
    var IsRestore = 0;
    var playerInfo = this.logic.playerInfo[Number(res.uid)];

    if (Number(res.uid) == myid) {
      cc.warn("====== 获取到一个特殊炮台 ====== ", playerInfo);
    }

    var ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool"); //根据实时配置设置龙溪碰撞宽度

    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + res.seatNum);
    var FixTime = 2; //纠正时间

    this.scheduleOnce(function () {
      ui_gun.cannonType = playerInfo.cannonType;

      if (ui_gun.cannonType != playerInfo.cannonType) {
        var batterySkeletonData;
        var cannonType = Number(playerInfo.cannonType);

        switch (cannonType) {
          case CONST.CannonType.Lightning:
            // 闪电
            batterySkeletonData = _this4.batteryList[CONST.CannonSkin.Lightning];
            break;

          case CONST.CannonType.PartialBomb:
            // 炎爆
            batterySkeletonData = _this4.batteryList[CONST.CannonSkin.PartialBomb];
            break;

          case CONST.CannonType.Laser:
            // 龙息
            batterySkeletonData = _this4.batteryList[CONST.CannonSkin.Laser];
            break;

          case CONST.CannonType.Missile:
            // 仙剑
            batterySkeletonData = _this4.batteryList[CONST.CannonSkin.Missile];
            break;
        }

        var battery = ui_gun.getChildByName("battery");

        if (CONST.CannonType.Normal == cannonType) {
          var cannon = Number(_this4.logic.cannonLevel) - 1;

          if (cannon < 0) {
            cannon = 0;
          }

          battery.getComponent(sp.Skeleton).skeletonData = _this4.batteryList[cannon];
        } else {
          battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
        }

        _this4.logic.playSpine(battery, false, false, CONST.SpineName.Idle2);

        if (_this4.logic.seatNum == res.seatNum) {
          _this4.logic["isGunMoving" + _this4.logic.seatNum] = -1;
        }

        cc.warn(">> 通过数据纠正UI：ui_gun.cannonType " + ui_gun.cannonType + "   data cannonType " + playerInfo.cannonType);
      }
    }, FixTime);

    if (playerInfo.cannonType == CONST.CannonType.Laser) {
      if (ui_gun == null) {
        cc.warn(">>> seatNum ", res.seatNum, "  res ", res);
      }

      var radius = Number(this.logic.roomRule.FirepillarWidth); // 龙息的宽度（单位：像素）

      var newSize = cc.size(radius, ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).size.height);
      ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).size = newSize;
    }

    if (myid == Number(res.uid)) {
      var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + res.seatNum);
      ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = playerInfo.cannonType == CONST.CannonType.Normal;
      ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = playerInfo.cannonType == CONST.CannonType.Normal;
    }

    if (ui_gun.cannonType != playerInfo.cannonType && !res.isNew) {
      res.isNew = true; //强行篡改

      cc.warn(">> 获得特殊炮台 仍然还使用 普通 炮台 正在 修正");
    }

    if (res.isNew) {
      var pos = null;
      var fish = ui_physicalPool.getChildByName("" + res.fishId);

      if (fish != null) {
        pos = cc.v2(fish.position.x, fish.position.y);
      } else {
        cc.warn("> 鱼池里 找不到鱼 id: " + res.fishId, " res ", res);
      }

      if (Number(res.uid) == myid) {
        cc.warn("====== 成功替换炮台 ====== cannonType " + playerInfo.cannonType);
      }

      this.setGunRate(res.seatNum, playerInfo.cannonAmount, playerInfo.cannonType, pos, IsRestore);
    } else {
      var _ui_pos = this.ui_Actionable.getChildByName("ui_pos" + res.seatNum);

      if (playerInfo.cannonType == CONST.CannonType.Normal) {
        _ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = playerInfo.cannonLevel + "";
        _ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = playerInfo.cannonLevel + "";
      } else {
        _ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = playerInfo.cannonAmount + "";
        _ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = playerInfo.cannonAmount + "";
      }
    }
  },
  //检查特殊炮台
  checkSpecialCannonHandler: function checkSpecialCannonHandler(isRefreshNow) {
    var _this5 = this;

    var isChange = false;

    for (var key in this.logic.playerInfo) {
      var playerInfo = this.logic.playerInfo[key];

      if (playerInfo != null && this.logic["isGunMoving" + playerInfo.seatNum] != 1) {
        var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + playerInfo.seatNum);

        if (ui_gun != null && ui_gun.cannonType != playerInfo.cannonType) {
          isChange = true;
        }
      }
    }

    var UserMax = 4;

    for (var i = 0; i < UserMax; i++) {
      var _ui_gun = this.ui_Actionable.getChildByName("ui_gun" + i);

      if (_ui_gun.cannonType != CONST.CannonType.Normal && !isChange) {
        isChange = true; // cc.error(">> 遍历 炮台 >> ui_gun . cannonType "+ui_gun.cannonType+"  seatNum "+i);
      }
    }

    if (isChange) {
      var DelayTime = 2.6;

      var callBack = function callBack() {
        for (var _key in _this5.logic.playerInfo) {
          var _playerInfo = _this5.logic.playerInfo[_key];

          if (_playerInfo != null && _this5.logic["isGunMoving" + _playerInfo.seatNum] != 1) {
            var _ui_gun2 = _this5.ui_Actionable.getChildByName("ui_gun" + _playerInfo.seatNum);

            if (_ui_gun2 != null && _ui_gun2.cannonType != _playerInfo.cannonType) {
              _ui_gun2.cannonType = _playerInfo.cannonType;
              var batterySkeletonData = void 0;
              var cannonType = Number(_playerInfo.cannonType);

              switch (cannonType) {
                case CONST.CannonType.Lightning:
                  // 闪电
                  batterySkeletonData = _this5.batteryList[CONST.CannonSkin.Lightning];
                  break;

                case CONST.CannonType.PartialBomb:
                  // 炎爆
                  batterySkeletonData = _this5.batteryList[CONST.CannonSkin.PartialBomb];
                  break;

                case CONST.CannonType.Laser:
                  // 龙息
                  batterySkeletonData = _this5.batteryList[CONST.CannonSkin.Laser];
                  break;

                case CONST.CannonType.Missile:
                  // 仙剑
                  batterySkeletonData = _this5.batteryList[CONST.CannonSkin.Missile];
                  break;
              }

              var battery = _ui_gun2.getChildByName("battery");

              if (CONST.CannonType.Normal == cannonType) {
                var cannon = Number(_playerInfo.cannonLevel) - 1;

                if (cannon < 0) {
                  cannon = 0;
                }

                battery.getComponent(sp.Skeleton).skeletonData = _this5.batteryList[cannon];
              } else {
                battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
              }

              _this5.logic.playSpine(battery, false, false, CONST.SpineName.Idle2);

              if (_this5.logic.seatNum == _playerInfo.seatNum) {
                _this5.logic["isGunMoving" + _this5.logic.seatNum] = -1;
              }

              var ui_pos = _this5.ui_Actionable.getChildByName("ui_pos" + _playerInfo.seatNum);

              var ui_other = ui_pos.getChildByName("ui_other");

              if (_playerInfo.cannonType == CONST.CannonType.Normal) {
                //普通炮台样式
                ui_other.getChildByName("img_paobeikuang1").active = true;
                ui_other.getChildByName("lab_gunLv").active = true;
                ui_other.getChildByName("img_paobeikuang2").active = false;
                ui_other.getChildByName("ui_gunLvBg").active = false;
                ui_other.getChildByName("lab_gunLv2").active = false;
              } else {
                //特殊炮台样式
                ui_other.getChildByName("img_paobeikuang1").active = false;
                ui_other.getChildByName("lab_gunLv").active = false;
                ui_other.getChildByName("img_paobeikuang2").active = true;
                ui_other.getChildByName("ui_gunLvBg").active = true;
                ui_other.getChildByName("lab_gunLv2").active = true;
              } // this.checkGunStyle(playerInfo.uid,false);

            }
          }
        }
      };

      if (isRefreshNow) {
        cc.error(">>>> 服务器数据错误 立即刷新 ！");
        callBack();
      } else {
        this.scheduleOnce(function () {
          callBack();
        }, DelayTime);
      }
    }
  },
  //恢复炮台
  restoreCannonHandler: function restoreCannonHandler(msg) {
    var _this6 = this;

    var uid = msg.uid;
    var myid = Number(glGame.user.userID);

    if (Number(uid) == myid) {
      cc.warn("==== 恢复炮台 ==== Time  " + Date.now() + "  Math.random " + Math.random());
    }

    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + this.logic.playerInfo[Number(uid)].seatNum);
    if (Number(uid) == myid) cc.warn("==========当前炮的类型： " + ui_gun.cannonType, " 当前的数据 " + this.logic.playerInfo[Number(uid)].cannonType);

    if (this.logic.playerInfo[Number(uid)].cannonType == ui_gun.cannonType) {
      if (Number(uid) == myid) cc.warn(">> ！！ 2 ===== 无需恢复炮台==== 因为又获得了 ");
      return;
    }

    var isNow = msg.isNow;
    var nextTime = isNow ? 0.1 : 1;

    if (this.logic.isRestoreIng[uid] != undefined) {
      cc.log(">>> 当前座位的炮台正在恢复 >>>");
      return;
    }

    var restoreCB = function restoreCB() {
      _this6.checkGunStyle(uid, true);
    };

    var IsRestore = 1;
    this.logic.isRestoreIng[uid] = IsRestore;
    this.scheduleOnce(restoreCB, nextTime);
  },
  //检查炮台类型
  checkGunStyle: function checkGunStyle(uid, isCheckGunSkin) {
    var IsRestore = 1;
    var res = this.logic.playerInfo[Number(uid)];

    if (res != null) {
      var myid = glGame.user.userID;
      var Not = 0;
      var isHaveSpcCannon = res.cannonAmount == Not ? false : true;

      if (myid == Number(uid)) {
        var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + res.seatNum); //-----------------------------------------加减号按钮-----------------------------------------------

        ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = !isHaveSpcCannon;
        ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = !isHaveSpcCannon; //-----------------------------------------加减号按钮-----------------------------------------------
        //----------------------------------------普通炮台样式-----------------------------------------------

        ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active = !isHaveSpcCannon;
        ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active = !isHaveSpcCannon; //----------------------------------------普通炮台样式-----------------------------------------------
        //----------------------------------------特殊炮台样式-----------------------------------------------

        ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = isHaveSpcCannon;
        ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active = isHaveSpcCannon;
        ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active = isHaveSpcCannon; //----------------------------------------特殊炮台样式-----------------------------------------------

        if (isCheckGunSkin) this.setGunRate(res.seatNum, this.logic.cannonLevel, CONST.CannonType.Normal, null, IsRestore, uid);
      } else {
        if (isCheckGunSkin) this.setGunRate(res.seatNum, res.cannonLevel, CONST.CannonType.Normal, null, IsRestore, uid);
      }
    } else {
      cc.error(">> 恢复炮台 出了问题 找不到数据 uid", uid, " list : ", this.logic.playerInfo);
    }
  },
  //炮台-切换 + ，仅限自己
  plusClickHandler: function plusClickHandler() {
    var myid = Number(glGame.user.userID);
    var myinfo = this.logic.playerInfo[myid];
    var NotHaveSpecialCanon = 0;

    if (myinfo.cannonAmount != null && myinfo.cannonAmount > NotHaveSpecialCanon) {
      cc.warn("当前是特殊炮台，无法切换炮倍");
      return;
    }

    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    this.logic.cannonLevel++;
    var NormalCannonMinLevel = 1;
    var NormalCannonMaxLevel = 10;

    if (this.logic.cannonLevel > NormalCannonMaxLevel) {
      this.logic.cannonLevel = NormalCannonMinLevel;
    }

    this.logic.playerInfo[glGame.user.userID].cannonLevel = this.logic.cannonLevel;
    this.setGunRate(this.logic.seatNum, this.logic.cannonLevel, this.logic.gunType, null, null, myid);

    if (this.logic.isEnterRoom) {
      var changeCannonData = {
        op: CONST.Opention.ChangeCannonLv,
        "level": this.logic.cannonLevel
      }; // cc.warn("--==-->发送 炮台切换 ",changeCannonData);

      glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), changeCannonData); //炮台切换
    }

    cc.sys.localStorage.setItem(CONST.GunLevel + glGame.user.userID, this.logic.cannonLevel);
  },
  //炮台-切换 - ， 仅限自己
  subClickHandler: function subClickHandler() {
    var myid = Number(glGame.user.userID);
    var myinfo = this.logic.playerInfo[myid];
    var NotHaveSpecialCanon = 0;

    if (myinfo.cannonAmount != null && myinfo.cannonAmount > NotHaveSpecialCanon) {
      cc.warn("当前是特殊炮台，无法切换炮倍");
      return;
    }

    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    var NormalCannonMaxLevel = 10;
    var NormalCannonMinLevel = 1;
    this.logic.cannonLevel--;

    if (this.logic.cannonLevel < NormalCannonMinLevel) {
      this.logic.cannonLevel = NormalCannonMaxLevel;
    }

    this.logic.playerInfo[glGame.user.userID].cannonLevel = this.logic.cannonLevel;
    this.setGunRate(this.logic.seatNum, this.logic.cannonLevel, this.logic.gunType, null, null, myid);

    if (this.logic.isEnterRoom) {
      var changeCannonData = {
        op: CONST.Opention.ChangeCannonLv,
        "level": this.logic.cannonLevel
      }; // cc.warn("--==-->发送 炮台切换 ",changeCannonData);

      glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), changeCannonData); //炮台切换
    }

    cc.sys.localStorage.setItem(CONST.GunLevel + glGame.user.userID, this.logic.cannonLevel);
  },
  //更新炮台 - 自己 或 其他人
  updateGunRatedHandler: function updateGunRatedHandler(res) {
    this.setGunRate(res.seatNum, res.cannonLevel, res.gunType, null, null, res.uid);
  },
  //蓄力播放
  accumulateHandler: function accumulateHandler(res) {
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + res.seatNum);

    if (res.cannonType == CONST.CannonType.Lightning) {
      //闪电专用蓄力，其他的是通用的
      var spine = ui_gun.getChildByName("spine_LightningAccumulate");
      this.logic.playSpine(spine, false, true, CONST.SpineName.Normal);
    } else {
      var otherAccumulate = ui_gun.getChildByName("spine_OtherAccumulate");
      var DelayTime = 1;
      var DelayTime2 = 1.1;
      ui_gun.stopAllActions();
      ui_gun.runAction(cc.sequence(cc.callFunc(function () {
        otherAccumulate.active = true;
      }), cc.delayTime(DelayTime), cc.callFunc(function () {
        otherAccumulate.active = false;
      })));
      this.scheduleOnce(function () {
        if (otherAccumulate.active) otherAccumulate.active = false;
      }, DelayTime2);
    }
  },
  //更新炮台-设置ui,如果是特殊炮台 那么 gunRate 就是用作显示 特殊炮台可发射的子弹数量
  setGunRate: function setGunRate(seatNum, gunRate, cannonType) {
    var _this7 = this;

    var specialCannonFishPos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var isRestore = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var uid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    this.changeGun(seatNum, gunRate, cannonType, specialCannonFishPos, isRestore, uid);
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + seatNum);
    var ani = ui_gun.getChildByName("ui_ToggleTurretAnimation");
    ani.active = true;
    var FiexUpdateCannonCoinTime = 0.1;
    var NowUpdateCannonCoinTime = 1.5;
    var time = cannonType == CONST.CannonType.Normal ? FiexUpdateCannonCoinTime : NowUpdateCannonCoinTime;
    this.scheduleOnce(function () {
      _this7.changeGunStyle(seatNum, cannonType, gunRate);
    }, time); //暂停老的 切换炮台 效果
    // ani.getComponent("nfish_MovieClip").initEffectScaleTo(this.button_gun_help_nzzl_tower_Atlas,"bomb_line_head",0.15,0.2,1,1,false);
  },
  //改变炮台类型
  changeGunStyle: function changeGunStyle(seatNum, cannonType, gunRate) {
    var NormalLevel = 1;
    var Not = 0;
    var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + seatNum);

    if (cannonType == CONST.CannonType.Normal) {
      //当目前是普通炮台
      //----------------------------------------普通炮台样式-----------------------------------------------
      ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active = true;
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active = true; //----------------------------------------普通炮台样式-----------------------------------------------
      //----------------------------------------特殊炮台样式-----------------------------------------------

      ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = false;
      ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active = false;
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active = false; //----------------------------------------特殊炮台样式-----------------------------------------------
    } else {
      //当目前是特殊炮台
      //----------------------------------------普通炮台样式-----------------------------------------------
      ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active = false;
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active = false; //----------------------------------------普通炮台样式-----------------------------------------------
      //----------------------------------------特殊炮台样式-----------------------------------------------

      ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = true;
      ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active = true;
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active = true; //----------------------------------------特殊炮台样式-----------------------------------------------
    }

    if (cannonType == CONST.CannonType.Normal && gunRate == Not) {
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = NormalLevel + "";
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = NormalLevel + "";
    } else {
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = gunRate;
      ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = gunRate;
    }
  },
  //换炮 gunType = cannonType
  changeGun: function changeGun(seatNum, gunRate, cannonType) {
    var _this8 = this;

    var specialCannonFishPos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var isRestore = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var uid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var ui_gun = this.ui_Actionable.getChildByName("ui_gun" + seatNum);

    if (ui_gun.isGunMoving != null) {
      ui_gun.stopAllActions();
      ui_gun.getChildByName("changeCannonEffect").active = false;
      var oldNode = this.ui_Actionable.getChildByName("spCannContainer" + seatNum);

      if (oldNode) {
        oldNode.stopAllActions();
        oldNode.destroy();
        var oldLastNode = oldNode.getChildByName("laserBornEffect");

        if (oldNode) {
          oldLastNode.stopAllActions();
          oldLastNode.destroy();
        }
      }

      ui_gun.isGunMoving = null;
    }

    ui_gun.isGunMoving = "isGunMoving" + seatNum;
    var battery = ui_gun.getChildByName("battery");

    if (cannonType != CONST.CannonType.Normal) {
      //特殊炮台做个获得表现
      if (specialCannonFishPos != null) {
        ui_gun.stopAllActions();
        var MoveStart = 1;
        this.logic["isGunMoving" + seatNum] = MoveStart; //播放移动球

        var laserBornEffect = this.logic.creatorEffect();
        laserBornEffect.isGunMoving = "isGunMoving" + seatNum;
        laserBornEffect.parent = null;
        laserBornEffect.active = true;
        laserBornEffect.name = "laserBornEffect";
        var spCannContainer = new cc.Node();
        spCannContainer.name = "spCannContainer" + seatNum;
        spCannContainer.position = specialCannonFishPos;
        spCannContainer.addChild(laserBornEffect);
        this.ui_Actionable.addChild(spCannContainer);
        var mcName;
        var batterySkeletonData;
        var changeCannonSkeletonData;
        var animationName;
        var isRotation = false;
        var Min = 1;
        var Max = 5;

        switch (cannonType) {
          case CONST.CannonType.Lightning:
            // 闪电
            mcName = CONST.CannonGetEddect.Lightning;
            batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
            changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Lightning];
            animationName = CONST.CannonGotEddect.Lightning;
            break;

          case CONST.CannonType.PartialBomb:
            // 炎爆
            Max = 8;
            mcName = CONST.CannonGetEddect.PartialBomb;
            batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
            changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.PartialBomb];
            animationName = CONST.CannonGotEddect.PartialBomb;
            break;

          case CONST.CannonType.Laser:
            // 龙息
            Max = 8;
            mcName = CONST.CannonGetEddect.Laser;
            batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
            changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Laser];
            animationName = CONST.CannonGotEddect.Laser;
            break;

          case CONST.CannonType.Missile:
            // 仙剑
            mcName = CONST.CannonGetEddect.Missile;
            batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
            changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Missile];
            animationName = CONST.CannonGotEddect.Missile;
            isRotation = true;
            break;
        }

        var LoopTime = 40;
        var IsHaveZero = false;
        var Speed = 0.12;
        var PayEdRemove = false; //播放变身动画

        var changeCannonEffect = ui_gun.getChildByName("changeCannonEffect");

        if (isRotation) {
          if (this.logic.seatNum == seatNum) cc.warn("1 ======更换炮台====== cannonType " + cannonType);
          changeCannonEffect.getComponent(sp.Skeleton).skeletonData = changeCannonSkeletonData;
          battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
          ui_gun.cannonType = cannonType;
          this.logic.playSpine(changeCannonEffect, false, false, animationName, function () {
            changeCannonEffect.active = false;
          });
          this.logic.playSpine(battery, false, false, CONST.SpineName.Idle2);
          laserBornEffect.runAction(cc.repeatForever(cc.rotateBy(0.8, 360)));
        }

        laserBornEffect.getComponent("nfish_MovieClip").initEffect(this.laserBornEffect_Atlas, mcName, Min, Max, LoopTime, IsHaveZero, Speed, PayEdRemove);
        spCannContainer.stopAllActions();
        var MoveTime;
        var act;

        if (isRotation) {
          MoveTime = 1.6;
          this.scheduleOnce(function () {
            spCannContainer.destroy();

            _this8.logic.playSpine(battery, false, false, CONST.SpineName.Get, function (spineName) {
              _this8.logic.playSpine(battery, false, false, CONST.SpineName.Idle, function (spineName) {
                //仙剑炮台 变身完成
                var MoveOver = -1;
                _this8.logic[ui_gun.isGunMoving] = MoveOver;
                _this8.logic["isGunMoving" + seatNum] = MoveOver;
                ui_gun.isGunMoving = null;
              });
            });
          }, 1);
          act = cc.moveTo(MoveTime, ui_gun.position);
        } else {
          MoveTime = 1.2;
          act = cc.sequence(cc.moveTo(MoveTime, ui_gun.position), cc.callFunc(function () {
            spCannContainer.destroy();
            if (_this8.logic.seatNum == seatNum) cc.warn("2 ======更换炮台====== cannonType " + cannonType);
            changeCannonEffect.getComponent(sp.Skeleton).skeletonData = changeCannonSkeletonData;

            _this8.logic.playSpine(changeCannonEffect, false, false, animationName, function (spineName) {
              if (spineName == animationName) {
                //其他炮台 变身完成
                if (_this8.logic.seatNum == seatNum) cc.warn("3 ======更换炮台====== cannonType " + cannonType);
                battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                ui_gun.cannonType = cannonType;

                _this8.logic.playSpine(battery, true, false, CONST.SpineName.Idle);

                var MoveOver = -1;
                _this8.logic[ui_gun.isGunMoving] = MoveOver;
                changeCannonEffect.active = false;
                _this8.logic["isGunMoving" + seatNum] = MoveOver;
                ui_gun.isGunMoving = null;
              }
            });
          }));
        }

        spCannContainer.runAction(act);
      }
    } else {
      var NormalCannonOffsex = 1;
      var cannon = Number(gunRate) - NormalCannonOffsex;

      if (cannon < 0) {
        cannon = 0;
      }

      var playerInfo = this.logic.playerInfo[Number(uid)];

      if (playerInfo != null) {
        var cannonTypeSc = Number(playerInfo.cannonType);

        var _batterySkeletonData;

        switch (cannonTypeSc) {
          case CONST.CannonType.Lightning:
            // 闪电
            _batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
            break;

          case CONST.CannonType.PartialBomb:
            // 炎爆
            _batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
            break;

          case CONST.CannonType.Laser:
            // 龙息
            _batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
            break;

          case CONST.CannonType.Missile:
            // 仙剑
            _batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
            break;
        }

        var _battery = ui_gun.getChildByName("battery");

        if (CONST.CannonType.Normal == cannonTypeSc) {
          _battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
          if (this.logic.seatNum == seatNum) cc.warn("4.0 ======更换炮台====== cannonType " + cannonType + " uid " + uid + " data cannonType " + cannonTypeSc);
        } else {
          _battery.getComponent(sp.Skeleton).skeletonData = _batterySkeletonData;
          if (this.logic.seatNum == seatNum) cc.warn("4.1 ======更换炮台====== cannonType " + cannonType + " uid " + uid + " data cannonType " + cannonTypeSc);
        }

        ui_gun.cannonType = cannonTypeSc;

        if (this.logic.seatNum == seatNum) {
          this.logic["isGunMoving" + this.logic.seatNum] = -1;
        }

        this.logic.playSpine(_battery, true, false, CONST.SpineName.Idle);
        if (this.logic.seatNum == seatNum) cc.warn("4.x ======play 炮台====== cannonType " + cannonType + " uid " + uid + " data cannonType " + cannonTypeSc);
        var ui_pos = this.ui_Actionable.getChildByName("ui_pos" + seatNum);
        var ui_other = ui_pos.getChildByName("ui_other");

        if (cannonTypeSc == CONST.CannonType.Normal) {
          //普通炮台样式
          ui_other.getChildByName("img_paobeikuang1").active = true;
          ui_other.getChildByName("lab_gunLv").active = true;
          ui_other.getChildByName("img_paobeikuang2").active = false;
          ui_other.getChildByName("ui_gunLvBg").active = false;
          ui_other.getChildByName("lab_gunLv2").active = false;
        } else {
          //特殊炮台样式
          ui_other.getChildByName("img_paobeikuang1").active = false;
          ui_other.getChildByName("lab_gunLv").active = false;
          ui_other.getChildByName("img_paobeikuang2").active = true;
          ui_other.getChildByName("ui_gunLvBg").active = true;
          ui_other.getChildByName("lab_gunLv2").active = true;
        }
      }
    }

    var Restore = 1; //恢复炮台播放一个恢复动画

    if (isRestore != null && isRestore == Restore) {
      var spine_restoreCannon = ui_gun.getChildByName("spine_restoreCannon");
      this.logic.playSpine(spine_restoreCannon, false, false, CONST.SpineName.Normal, function () {
        _this8.logic.isRestoreIng[uid] = null;
        spine_restoreCannon.active = false;
      });
    }
  },
  //冰冻 - 开始 - 结束
  onFreezeShowUIHandler: function onFreezeShowUIHandler() {
    if (this.logic.isInFreeze) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "effect_frozen");
    }
  },
  //记录
  historyClickHandler: function historyClickHandler() {
    var panel = glGame.panel.showPanel(this.record_pre);
    panel.zIndex = 30;
    this.menuViewHandler(false);
  },
  //技能 锁定/解锁
  onSkillLockHandler: function onSkillLockHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    this.logic.isLock = !this.logic.isLock;
    var lockLab = this.ui_skillLock.getChildByName("img_suoding");
    var img_offsuoding = this.ui_skillLock.getChildByName("img_offsuoding");
    var spine = this.ui_skillLock.getChildByName("spine");
    lockLab.active = !this.logic.isLock;
    img_offsuoding.active = !lockLab.active;
    spine.active = this.logic.isLock;
    glGame.emitter.emit(CONST.clientEvent.useLockSkill);
    var roomSkillLockData = {};
    roomSkillLockData[this.logic.roomId] = this.logic.isLock ? "o" : "c";
    glGame.storage.setItem(CONST.SkillLock, roomSkillLockData);
    var roomSkillAutoData = {};
    roomSkillAutoData[this.logic.roomId] = this.logic.isLock ? "o" : "c";
    glGame.storage.setItem(CONST.SkillLock, roomSkillAutoData);

    if (!this.logic.isLock) {
      this.logic.lastLockFishID = Number(this.logic.lockFishID + "");
      this.logic.lockFishID = null;

      if (this.logic.isLockAutoChange == false) {
        this.logic.isAuto = false;
        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
      }

      glGame.emitter.emit(CONST.clientEvent.leaveRoomUnLock, this.logic.seatNum);
    }
  },
  //是否自动 切换
  onSkillAutoHandler: function onSkillAutoHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    this.logic.isLockAutoChange = !this.logic.isLockAutoChange;

    if (this.logic.lockFishID == null) {
      this.logic.isAuto = this.logic.isLockAutoChange;
      var spine = this.ui_skillAuto.getChildByName("spine");
      spine.active = this.logic.isAuto;
    } else {
      var _spine = this.ui_skillAuto.getChildByName("spine");

      _spine.active = this.logic.isLockAutoChange;
    }

    var roomData = {};
    roomData[this.logic.roomId] = this.logic.isLockAutoChange ? "o" : "c";
    glGame.storage.setItem(CONST.SkillisLockAutoChange, roomData);
    var autoLab = this.ui_skillAuto.getChildByName("img_zidong");
    var img_offzidong = this.ui_skillAuto.getChildByName("img_offzidong");
    autoLab.active = !this.logic.isLockAutoChange;
    img_offzidong.active = !autoLab.active;
    glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
  },
  //菜单
  menuViewHandler: function menuViewHandler() {
    var isClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (isClose) {
      this.ui_menu.active = false;
    } else {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
      this.ui_menu.active = !this.ui_menu.active;
      var ui_upIcon = this.ui_menuBtn.getChildByName("ui_upIcon");
      var ui_leftIcon = this.ui_menuBtn.getChildByName("ui_leftIcon");
      ui_upIcon.active = !ui_upIcon.active;
      ui_leftIcon.active = !ui_upIcon.active;
    }
  },
  //打开鱼群鉴赏
  openFishGroupHandler: function openFishGroupHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    var panel = glGame.panel.showPanel(this.illustratedBook);
    panel.zIndex = 30;
    this.menuViewHandler(false);
  },
  //充值
  rechargeClickHandler: function rechargeClickHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");

    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("recharge")) {
      return;
    }

    glGame.panel.showShop();
    this.menuViewHandler(false);
  },
  //设置
  settingClickHandler: function settingClickHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
    var panel = glGame.panel.showPanel(this.setting_pre);
    panel.zIndex = 30;
    this.menuViewHandler(false);
  },
  //自己的 玉如意 出转盘 / 聚宝鹏 出拉霸
  showTurntableHandler: function showTurntableHandler(res) {
    var _this9 = this;

    this.logic.isYuRuyiRuning = true;

    if (res.type == CONST.AwardType.RUYI) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "getYuRu"); //捕获玉如意一瞬间播放

      this.turntableView.getComponent("nfish_turntable").initTurntableView(res);
    } else {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "getJuBao"); //捕获聚宝盆一瞬间播放

      this.cornucopiaView.getComponent("nfish_cornucopia").startRunCornucopia(res);
    }

    var EffectMaxRunTime = 10;
    this.scheduleOnce(function () {
      //玉如意运行时间最大10秒，10秒后强制结束 发射锁
      if (_this9.logic.isYuRuyiRuning) {
        _this9.logic.isYuRuyiRuning = false;
      }
    }, EffectMaxRunTime);
  },
  //退出菜单
  closeViewHandler: function closeViewHandler(arg) {
    var IsExit4 = 4;

    if (arg === IsExit4) {
      this.menuViewHandler(false);
      return;
    }

    var IsExit3 = 3;

    if (arg === IsExit3) {
      cc.sys.localStorage.setItem(CONST.SkillisLockAutoChange, "");
      cc.sys.localStorage.setItem(CONST.SkillLock, "");
      cc.sys.localStorage.setItem(CONST.SkillAuto, "");
      this.logic.isEnterRoom = false;
      glGame.room.exitRoom();
      return;
    }

    var IsExit = 1;

    if (arg === IsExit) {
      var currentUid = Number(glGame.user.userID);
      var playerInfo = this.logic.playerInfo[currentUid];

      if (playerInfo != null && playerInfo.cannonType != CONST.CannonType.Normal) {
        if (playerInfo.cannonAmount > 0) {
          glGame.emitter.emit(CONST.clientEvent.showAlert, CONST.AlertType.LosCannan);
          return;
        }
      }

      glGame.emitter.emit(CONST.clientEvent.fishSound, "button");
      this.menuViewHandler(false);
      cc.sys.localStorage.setItem(CONST.SkillisLockAutoChange, "");
      cc.sys.localStorage.setItem(CONST.SkillLock, "");
      cc.sys.localStorage.setItem(CONST.SkillAuto, "");
      this.logic.isEnterRoom = false;
      glGame.room.exitRoom();
    }
  },
  //alert - 取消
  showAlertHandler: function showAlertHandler(arg) {
    switch (arg) {
      case CONST.AlertType.BossClearSocre:
        this.text_exitBossClearSocre.active = true;
        this.btn_quit.active = true;
        this.btn_queding.active = true;
        this.btn_queding_net.active = false;
        break;

      case CONST.AlertType.LosCannan:
        this.text_exitLosCannan.active = true;
        this.btn_quit.active = true;
        this.btn_queding.active = true;
        this.btn_queding_net.active = false;
        break;

      case CONST.AlertType.NetOff:
        this.text_netOff.active = true;
        this.btn_quit.active = false;
        this.btn_queding.active = false;
        this.btn_queding_net.active = true;
        break;
    }

    this.alert_container.active = true;
  },
  //alert - 取消
  onQuitHandler: function onQuitHandler() {
    this.menuViewHandler(false);
    this.alert_container.active = false;
  },
  //alert - 确认
  onQuedingHandler: function onQuedingHandler() {
    var IsExit = 3;
    this.closeViewHandler(IsExit);
  },
  //断网确认
  onQuedingOffNetHandler: function onQuedingOffNetHandler() {
    cc.sys.localStorage.setItem(CONST.SkillisLockAutoChange, "");
    cc.sys.localStorage.setItem(CONST.SkillLock, "");
    cc.sys.localStorage.setItem(CONST.SkillAuto, "");
    this.logic.isEnterRoom = false;
    glGame.room.exitRoom();
  },
  //打财神boss 获得红包
  sprinkleRedBagHandler: function sprinkleRedBagHandler(res) {
    var _this10 = this;

    var ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
    var fish = ui_physicalPool.getChildByName("" + res.fishId);

    if (!fish) {
      cc.warn(">>找不到鱼 无法漂移红包 res ", res);
      return;
    }

    var fishPos = fish.position;
    var coinContainer = this.node.getChildByName("ui_coinEffectContainer");
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var pre = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
    var targetPosition = ui_coinEffectPos.getChildByName(pre + res.seatNum).position;
    var effectPosition = ui_coinEffectPos.getChildByName("redBag" + res.seatNum).position;
    var ui_CoinEffect = coinContainer.getChildByName("sprinkleRedBag" + res.seatNum);

    if (ui_CoinEffect) {
      ui_CoinEffect.isRemoveSelf = 1;
      ui_CoinEffect.stopAllActions();
      ui_CoinEffect.destroy();
    }

    ui_CoinEffect = cc.instantiate(this.node.getChildByName("spine_effect").getChildByName("spine_redEnvelopeStatistics"));
    ui_CoinEffect.position = effectPosition;
    ui_CoinEffect.name = "sprinkleRedBag" + res.seatNum;
    ui_CoinEffect.active = true;

    if (this.logic.getIsRotation()) {
      ui_CoinEffect.angle = 180;
    }

    glGame.emitter.emit(CONST.clientEvent.fishSound, "getCaiShenRew"); //捕获到财神出现小UI时，播放

    coinContainer.addChild(ui_CoinEffect);
    this.logic.playSpine(ui_CoinEffect.getChildByName("spine"), false, false, CONST.SpineName.Normal, function () {
      ui_CoinEffect.stopAllActions();
      ui_CoinEffect.destroy();
    });
    ui_CoinEffect.stopAllActions();
    ui_CoinEffect.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
      if (ui_CoinEffect != null) {
        var playName = _this10.logic.seatNum == res.seatNum ? "labG" : "labS";
        var lab_number = ui_CoinEffect.getChildByName("spine").getChildByName("ATTACHED_NODE_TREE").getChildByName("ATTACHED_NODE:root").getChildByName("ATTACHED_NODE:zong").getChildByName(playName);
        lab_number.active = true;
        lab_number.getComponent(cc.Label).string = "+" + _this10.logic.formatMoney(res.rewardGold);
      }
    })));
    var effectCoin = 10;
    var MaxCoin = 100; //最大数量

    var RandomoffSex = 60; //xy坐标偏移值

    var RandomMin = 15; //xy坐标偏移最小值

    var RandomOffsexX = 30;
    var RandomOffsexY = 50;
    var RandomMinY = 20;
    var StartName = 0;
    var endName = 9;
    var plyTime = 8;
    var isHaveZero = false;
    var speed = 0.035;
    var plyedDestroy = false;
    var isRandomPly = 1;
    var OneDelayTime = 0.1;
    var TwoDelayTime = 0.05;
    var ScaleToTime = 1;
    var BezierToTime = 0.7;
    var ScaleToArg = 0.8;
    var FadeToTime = 0.1;
    var MoveToTime = 0.15;
    var EndOpacity = 255;
    var Gold = "gold";
    var Silver = "silver";

    if (effectCoin > MaxCoin) {
      effectCoin = MaxCoin;
    }

    ui_CoinEffect.zIndex -= effectCoin;

    var _loop = function _loop(i) {
      var ui_CoinEffect = _this10.logic.creatorEffect();

      ui_CoinEffect.x = fishPos.x + Math.random() * RandomoffSex + RandomMin;
      ui_CoinEffect.y = fishPos.y + Math.random() * RandomoffSex + RandomMin;
      ui_CoinEffect.active = true;
      ui_CoinEffect.parent = null;
      ui_CoinEffect.opacity = 0;
      var playName = _this10.logic.seatNum == res.seatNum ? Gold : Silver;
      ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(_this10.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);

      if (_this10.logic.getIsRotation()) {
        ui_CoinEffect.angle = 180;
      }

      coinContainer.addChild(ui_CoinEffect);
      var upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

      if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
        upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
      }

      var bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
      var bounceAct2 = cc.moveTo(MoveToTime, upPos);
      var bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
      var act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));
      ui_CoinEffect.runAction(cc.sequence(cc.delayTime((i + 1) * OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(i * TwoDelayTime), cc.callFunc(function () {
        ui_CoinEffect.destroy();
      })));
    };

    for (var i = 0; i < effectCoin; i++) {
      _loop(i);
    }
  },
  //死鱼后：金币旋转、漂移 + 金币增长动画 获取鱼的坐标 转换坐标到本地坐标 播放金币旋转动画，2秒后 漂移+缩放 到炮台位置 ，流程结束 释放、隐藏
  playCoinEffectHandler: function playCoinEffectHandler(res) {
    var rewardGold = Number(res.rewardGold);

    if (rewardGold <= 0) {
      return;
    } //检查该鱼是否有转盘


    var effectRotateLevel = CONST.EffectRotateLevel.OneLevel; //0 一档 1 2 3

    var resGroupId;

    if (this.logic.fishPoolData[Number(res.fishId)] != null) {
      var fishTypeId = this.logic.fishPoolData[Number(res.fishId)].fishTypeId + "";

      if (this.logic.json_fishTable[fishTypeId] != null) {
        effectRotateLevel = this.logic.json_fishTable[fishTypeId].effectRotate;
        resGroupId = this.logic.json_fishTable[fishTypeId].resGroupId;
      }
    }

    if (res.killType == CONST.CannonType.Bomb) {
      //熔岩玄武炸死的一律飘1档次
      effectRotateLevel = CONST.EffectRotateLevel.OneLevel;
    }

    var ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
    var fish = ui_physicalPool.getChildByName("" + res.fishId);

    if (fish == null) {
      //找不到鱼
      cc.warn(">> 找不到鱼 id:", res.fishId);
      return;
    }

    if (this.logic.seatNum == res.seatNum) {
      switch (effectRotateLevel) {
        case CONST.EffectRotateLevel.OneLevel:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "getVoice1"); //1挡

          break;

        case CONST.EffectRotateLevel.TowLevel:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "getVoice2"); //2挡

          break;

        case CONST.EffectRotateLevel.ThreeLevel:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "getVoice3"); //3挡

          break;

        case CONST.EffectRotateLevel.FourLevel:
          glGame.emitter.emit(CONST.clientEvent.fishSound, "getVoice4"); //4挡

          break;
      }
    }

    switch (effectRotateLevel) {
      case CONST.EffectRotateLevel.OneLevel:
        this.flyGoldEffect(effectRotateLevel, res); //飞金币动画

        break;

      case CONST.EffectRotateLevel.TowLevel:
      case CONST.EffectRotateLevel.ThreeLevel:
      case CONST.EffectRotateLevel.FourLevel:
        this.flyRotateEffect(effectRotateLevel, fish.position, resGroupId, res);
        break;
    }
  },
  //捕获效果 - 展示转盘飞转盘动画 effectRotateLevel 档次  rewardGold 奖励数值  startShowPos 开始显示点 flySeatNum 需要飞到的座位 resGroupId 图片显示
  flyRotateEffect: function flyRotateEffect(effectRotateLevel, startShowPos, resGroupId, res) {
    var _this11 = this;

    var rewardGold = res.rewardGold;
    var flySeatNum = res.seatNum;
    var effectContainer = this.node.getChildByName("ui_coinEffectContainer");
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var pre = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
    var moveToPos = ui_coinEffectPos.getChildByName(pre + res.seatNum).position;
    var spine_effect = this.node.getChildByName("spine_effect");
    var spineCantainer = null;
    var bg;
    var fish;

    if (res.fishTypeId == CONST.BossLavaBasalt) {
      spineCantainer = cc.instantiate(spine_effect.getChildByName("spine_bossRongYan"));
      bg = spineCantainer.getChildByName("ATTACHED_NODE_TREE").getChildByName("img_bg");
    } else {
      if (this.logic.seatNum == flySeatNum && effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
        spineCantainer = cc.instantiate(spine_effect.getChildByName("spine_rewardANew4"));
        this.scheduleOnce(function () {
          //爆炸 出现时机
          spineCantainer.getChildByName("spine_boom_1").active = true;
        }, 0.1);
        this.scheduleOnce(function () {
          //爆炸 出现时机
          spineCantainer.getChildByName("spine_boom_2").active = true;
        }, 0.3);
        this.scheduleOnce(function () {
          //爆炸 出现时机
          spineCantainer.getChildByName("spine_boom_3").active = true;
        }, 0.6);
      } else {
        //捕获效果  have two spine style so need trinocular expression
        spineCantainer = cc.instantiate(spine_effect.getChildByName(this.logic.seatNum == flySeatNum ? "spine_rewardA" + effectRotateLevel : "spine_rewardB" + effectRotateLevel));
      }

      bg = spineCantainer.getChildByName("img_bg");
      fish = spineCantainer.getChildByName("fish");
    }

    if (bg != null) {
      var lab = bg.getChildByName(this.logic.seatNum == flySeatNum ? "gold_lab" : "silver_lab");
      lab.active = true;

      if (res.fishTypeId == CONST.BossLavaBasalt) {
        lab.getComponent(cc.Label).string = "";
        var RepeatTimes = 10;
        var coin = this.logic.formatMoney(rewardGold);
        var SubTimes = Math.ceil(Number(coin + "") / RepeatTimes);
        var currentCoin = 0;
        var i = 0; //读数消失

        this.schedule(function () {
          if (spineCantainer != null && spineCantainer.isDestroy == null && lab != null && lab._components != undefined) {
            currentCoin += SubTimes;

            if (currentCoin >= coin) {
              lab.getComponent(cc.Label).string = "+" + coin;
            } else {
              lab.getComponent(cc.Label).string = "+" + currentCoin;
            }

            i++;

            if (i == RepeatTimes) {}
          }
        }, 0.09, RepeatTimes - 1);
      } else {
        var currStartNum = this.logic.formatMoney(rewardGold) + "";

        if (currStartNum.indexOf(".") != -1) {
          lab.getComponent(cc.Label).string = Number(currStartNum).toFixed(1);
        } else {
          lab.getComponent(cc.Label).string = currStartNum;
        }
      }
    }

    if (fish) {
      var sprF = this.icon_Atlas.getSpriteFrame(resGroupId);
      var scale = spineCantainer.height / sprF.getOriginalSize().height;
      var TwoScale = 0.55;
      var ThreeScale = 0.75;
      var FourScale = 1;

      if (effectRotateLevel == CONST.EffectRotateLevel.TowLevel) {
        scale = TwoScale;
        sprF = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
      }

      if (effectRotateLevel == CONST.EffectRotateLevel.ThreeLevel) {
        scale = ThreeScale;
        sprF = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
      }

      if (effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
        scale = FourScale;
        sprF = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
      }

      fish.getComponent(cc.Sprite).spriteFrame = sprF;
      fish.oldScale = scale;
      fish.scale = 0;
      fish.stopAllActions();
      fish.runAction(cc.sequence(cc.scaleTo(0.2, fish.oldScale * 2), cc.scaleTo(0.2, fish.oldScale)));
    }

    var DelayTime = effectRotateLevel * 0.25; //停留时间 - 根据不同级别的动画表现的k的帧数多少 决定停留时间

    if (effectRotateLevel == CONST.EffectRotateLevel.TowLevel) {
      DelayTime += 0.45;
    }

    if (effectRotateLevel == CONST.EffectRotateLevel.ThreeLevel) {
      DelayTime += 1;
    }

    var Centont = 0;
    var HalfScale = 0.5;

    if (this.logic.seatNum != flySeatNum && effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
      spineCantainer.scale = HalfScale;

      var _ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");

      var posNodeName = this.logic.getIsRotation() ? "effectRotatePosR" + flySeatNum : "effectRotatePos" + flySeatNum;

      var pos = _ui_coinEffectPos.getChildByName(posNodeName).position;

      spineCantainer.x = pos.x;
      spineCantainer.y = pos.y;
    } else {
      spineCantainer.position = effectRotateLevel == CONST.EffectRotateLevel.FourLevel ? cc.v2(Centont, Centont) : startShowPos;
    }

    spineCantainer.active = true;
    var BasezIndex = 100 * effectRotateLevel;

    if (this.lastzIndex) {
      spineCantainer.zIndex = BasezIndex + this.lastzIndex;
    } else {
      spineCantainer.zIndex = BasezIndex;
      this.lastzIndex = spineCantainer.zIndex;
    }

    if (effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
      DelayTime += 1.1;
    }

    var callBalk = cc.callFunc(function () {
      //动画结束回调函数 - 加金币 读数动画
      _this11.addGoldEffect(effectRotateLevel, res); //飘分


      spineCantainer.isDestroy = 1;
      spineCantainer.destroy();
    });

    if (this.logic.getIsRotation()) {
      spineCantainer.angle = 180;
    }

    effectContainer.addChild(spineCantainer);
    spineCantainer.stopAllActions();
    var MoveToTime = 0.25;
    var ScaleToTime = 0.55;
    var ScaleToArg = 0;
    var EffScaleToArg = 1;
    var EffScaleToTime = 0.1;
    var EffDelayTime = 0.5;
    var EffectNum = Number(res.fishId) % 7 + 1;
    var EffectPre = "effectTitle_";

    if (res.fishTypeId != CONST.BossLavaBasalt && effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
      //第四档捕获效果不发生漂移效果，动画表现稍微有点不太一样
      spineCantainer.getChildByName("effectTitle").getComponent(cc.Sprite).spriteFrame = this.explosionAndLightning_Atlas.getSpriteFrame(EffectPre + EffectNum);
      var fourEffect = cc.sequence(cc.delayTime(DelayTime), cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), callBalk);
      spineCantainer.runAction(fourEffect);
      spineCantainer.getChildByName("effectTitle").scale = ScaleToArg;
      spineCantainer.getChildByName("effectTitle").stopAllActions();
      spineCantainer.getChildByName("effectTitle").runAction(cc.sequence(cc.delayTime(EffDelayTime), cc.scaleTo(EffScaleToTime, EffScaleToArg, EffScaleToArg)));
    } else if (res.fishTypeId != CONST.BossLavaBasalt) {
      var otherEffect = cc.sequence(cc.delayTime(DelayTime), cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.moveTo(MoveToTime, moveToPos)), callBalk);
      spineCantainer.runAction(otherEffect);
    } else {
      var _otherEffect = cc.sequence(cc.delayTime(DelayTime), callBalk);

      spineCantainer.runAction(_otherEffect);
    }
  },
  //漂移金币动画
  flyGoldEffect: function flyGoldEffect(effectRotateLevel, res) {
    var _this12 = this;

    var coinContainer = this.node.getChildByName("ui_coinEffectContainer");
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var pre = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
    var targetPosition = ui_coinEffectPos.getChildByName(pre + res.seatNum).position;
    var ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
    var fish = ui_physicalPool.getChildByName("" + res.fishId);
    var effectCoin = Math.ceil(Math.random() * 5 + 1);
    var MaxCoin = 100; //最大数量

    var RandomoffSex = 60; //xy坐标偏移值

    var RandomMin = 15; //xy坐标偏移最小值

    var RandomOffsexX = 30;
    var RandomOffsexY = 50;
    var RandomMinY = 20;
    var StartName = 0;
    var endName = 9;
    var plyTime = 8;
    var isHaveZero = false;
    var speed = 0.035;
    var plyedDestroy = false;
    var isRandomPly = 1;
    var OneDelayTime = 0.1;
    var TwoDelayTime = 0.05;
    var ScaleToTime = 1;
    var BezierToTime = 0.7;
    var ScaleToArg = 0.8;
    var FadeToTime = 0.1;
    var MoveToTime = 0.15;
    var EndOpacity = 255;
    var Gold = "gold";
    var Silver = "silver";

    if (effectCoin > MaxCoin) {
      effectCoin = MaxCoin;
    }

    var CoinLabOffsexY = 158;
    var coinlab = cc.instantiate(coinContainer.getChildByName(this.logic.seatNum == res.seatNum ? "flyGoldCoinLab" : "flySilverCoinLab"));
    coinlab.active = true;
    coinlab.getComponent(cc.Label).string = "+" + this.logic.formatMoney(res.rewardGold);
    var fishPos = fish.position;
    coinlab.x = fishPos.x + Math.random() * RandomoffSex + RandomMin;
    var moveToAct;

    if (this.logic.getIsRotation()) {
      coinlab.angle = 180;
      coinlab.y = fishPos.y;
      moveToAct = cc.moveTo(0.3, coinlab.x, coinlab.y - CoinLabOffsexY);
    } else {
      coinlab.y = fishPos.y;
      moveToAct = cc.moveTo(0.3, coinlab.x, coinlab.y + CoinLabOffsexY);
    }

    coinContainer.addChild(coinlab);
    coinlab.runAction(cc.sequence(cc.delayTime(0.3), moveToAct, cc.callFunc(function () {
      coinlab.destroy();
    })));

    var _loop2 = function _loop2(i) {
      var ui_CoinEffect = _this12.logic.creatorEffect();

      ui_CoinEffect.x = fishPos.x + Math.random() * RandomoffSex + RandomMin;
      ui_CoinEffect.y = fishPos.y + Math.random() * RandomoffSex + RandomMin;
      ui_CoinEffect.active = true;
      ui_CoinEffect.parent = null;
      ui_CoinEffect.opacity = 0;
      var playName = _this12.logic.seatNum == res.seatNum ? Gold : Silver;
      ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(_this12.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);

      if (_this12.logic.getIsRotation()) {
        ui_CoinEffect.angle = 180;
      }

      coinContainer.addChild(ui_CoinEffect);
      var upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

      if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
        upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
      }

      var bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
      var bounceAct2 = cc.moveTo(MoveToTime, upPos);
      var bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
      var act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));
      ui_CoinEffect.runAction(cc.sequence(cc.delayTime((i + 1) * OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(i * TwoDelayTime), cc.callFunc(function () {
        ui_CoinEffect.destroy();
      })));
    };

    for (var i = 0; i < effectCoin; i++) {
      _loop2(i);
    }

    if (this.logic.seatNum == res.seatNum && CONST.EffectRotateLevel.OneLevel == effectRotateLevel) {
      glGame.emitter.emit(CONST.clientEvent.fishSound, "flyGold"); //飞金币
    }

    if (CONST.EffectRotateLevel.OneLevel != effectRotateLevel) {
      this.scheduleOnce(function () {
        _this12.addGoldEffect(effectRotateLevel, res); //加金币 读数动画

      }, 1);
    }
  },
  //飘分
  addGoldEffect: function addGoldEffect(effectRotateLevel, res) {
    var _this13 = this;

    var pre = res.seatNum == this.logic.seatNum ? "lab_coinGlod" : "lab_coinSilver";
    var lab_coinMask = this.node.getChildByName("ui_coinEffectContainer").getChildByName("lab_coinMask" + res.seatNum);

    if (this.logic.getIsRotation()) {
      lab_coinMask = this.node.getChildByName("ui_coinEffectContainer").getChildByName("lab_coinMaskR" + res.seatNum);
    }

    var base_labNode = lab_coinMask.getChildByName(pre);
    var labNode = cc.instantiate(base_labNode);

    if (base_labNode.oldx == undefined) {
      base_labNode.oldx = Number(base_labNode.x + "");
      base_labNode.oldy = Number(base_labNode.y + "");
    }

    labNode.oldx = Number(base_labNode.oldx + "");
    labNode.oldy = Number(base_labNode.oldy + "");
    lab_coinMask.addChild(labNode);
    var MoveOffsex = Math.random() * 5 + 5;
    var MoveOffsex2 = MoveOffsex + 5;
    var endPos = cc.v2(labNode.oldx, labNode.oldy + MoveOffsex);

    if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
      endPos = cc.v2(labNode.oldx, labNode.oldy - MoveOffsex);
    }

    var endPos2 = cc.v2(labNode.oldx, endPos.y + MoveOffsex2);

    if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
      endPos2 = cc.v2(labNode.oldx, endPos.y - MoveOffsex2);
    }

    if (this.logic.getIsRotation()) {
      labNode.angle = 180;
      labNode.anchorX = 0;
    }

    var oldPos = cc.v2(labNode.oldx, labNode.oldy);
    labNode.currRewardGold = 0;
    labNode.startHide = 0;
    labNode.rewardGold = res.rewardGold;
    labNode.scale = 0;
    labNode.setPosition(lab_coinMask.getChildByName("lab_startPos").position);
    labNode.stopAllActions();
    labNode.getComponent(cc.Label).string = "+" + this.logic.formatMoney(res.rewardGold);
    labNode.active = true;
    var GoTime = 0.17;
    var endTime = 0.4;
    var DelayTime = 0.35;
    var DelayStateTime = 0.05;
    var Normal = 1.2;
    var ScaleToTime = 0.2;
    var ScaleToTime2 = 0.2;
    var FadeToTime = 0.3;
    var Hide = 0;
    var FadeTo = 0;
    labNode.runAction(cc.sequence(cc.delayTime(DelayTime), cc.spawn(cc.scaleTo(ScaleToTime, Normal), cc.moveTo(GoTime, oldPos)), cc.delayTime(DelayStateTime), cc.moveTo(endTime, endPos2), cc.sequence(cc.fadeTo(FadeToTime, Hide), cc.scaleTo(ScaleToTime2, FadeTo), cc.moveBy(endTime, endPos2)), cc.callFunc(function () {
      if (res.msg != null) {
        if (_this13.logic.seatNum == res.seatNum) {
          _this13.logic.gold = Number(res.msg.coin);

          _this13.logic.checkGold(); // cc.error(">> 更新我的钱  ok！")


          glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
        } else {
          // cc.error(">> 射击 更新其他用户的钱 ok!")
          glGame.emitter.emit(CONST.clientEvent.updateShootGold, res.msg);
        }

        _this13.logic["isUpdateMoney" + res.msg.seatNum] = true; //玉如意、聚宝盆 结束 恢复更新余额机制
      }

      labNode.destroy();
    })));
  },
  //特殊子弹统计
  specialBulletStatistics: function specialBulletStatistics(res) {
    var _this14 = this;

    if (res.total < 0.1) {
      //打死掉鱼没分就不播了
      return;
    } //仙剑比较特殊 生命周期较长


    var coinContainer = this.node.getChildByName("ui_coinEffectContainer");
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var spineCantainer = coinContainer.getChildByName("spineCantainer" + res.seatNum);

    if (spineCantainer != null) {
      if (spineCantainer.isDispose == null && spineCantainer.cannonType == res.cannonType) {
        //isDispose=1则为正在销毁的路上、同样类型
        if (res.total > 0) {
          spineCantainer.currCoin = null;
          this["runSpecial" + res.seatNum] = false;
          this.scheduleOnce(function () {
            if (spineCantainer == null) {
              spineCantainer = coinContainer.getChildByName("spineCantainer" + res.seatNum);
            }

            if (spineCantainer != null && spineCantainer._components != undefined) {
              var spinec = spineCantainer.getChildByName(res.seatNum == _this14.logic.seatNum ? "gold_lab" : "silver_lab");

              if (spinec != null) {
                if (spinec._components != undefined && spinec.getComponent(cc.Label)) {
                  var lab = spinec.getComponent(cc.Label);
                  var oldCoin = lab.string == undefined || lab.string == "" ? 0 : Number(lab.string);
                  spineCantainer.startRun = res.totalReward;

                  if (spineCantainer.currCoin == null) {
                    spineCantainer.currCoin = Number(oldCoin);
                  }

                  _this14["runSpecial" + res.seatNum] = true;
                }
              } else {
                cc.error(" 统计框已经不存在 统计错误！ res ", res);
              }
            }
          }, 0.2);
        }
      } else {
        //清理
        this["runSpecial" + res.seatNum] = false;
        spineCantainer.opacity = 0;
        spineCantainer.stopAllActions();
        coinContainer.removeChild(spineCantainer);
        spineCantainer.destroy();
        spineCantainer = null;
      }
    }

    if (spineCantainer == null) {
      this["runSpecial" + res.seatNum] = false;
      var spine_effect = this.node.getChildByName("spine_effect");
      spineCantainer = cc.instantiate(spine_effect.getChildByName("spine_speciaCoinNum"));
      spineCantainer.cannonType = res.cannonType;
      spineCantainer.oldScale = spineCantainer.scale;
      var NotOpacity = 0;
      var NotScale = 0;
      spineCantainer.active = true;
      spineCantainer.position = ui_coinEffectPos.getChildByName("statisticsPos" + res.seatNum).position;
      spineCantainer.name = "spineCantainer" + res.seatNum;
      spineCantainer.opacity = NotOpacity;
      spineCantainer.scale = NotScale;

      if (this.logic.getIsRotation()) {
        spineCantainer.angle = 180;
      }

      coinContainer.addChild(spineCantainer);
      var NormalOpacity = 255;
      var QScale = 2;
      var NormalScale = spineCantainer.oldScale;
      var FadeTime = 0.2;
      var ScalTTime = 0.2;
      spineCantainer.stopAllActions();
      var act = cc.sequence(cc.spawn(cc.fadeTo(FadeTime, NormalOpacity), cc.scaleTo(ScalTTime, QScale)), cc.scaleTo(ScalTTime, NormalScale), cc.callFunc(function () {
        //播放移动球
        var Scale = 1.33;

        var laserBornEffect = _this14.logic.creatorEffect();

        laserBornEffect.parent = null;
        laserBornEffect.active = true;
        laserBornEffect.setPosition(spineCantainer.getChildByName("effect").position);
        laserBornEffect.scale = Scale;
        spineCantainer.addChild(laserBornEffect);
        var mcName;
        var scale = 1;
        var isRo = false;

        switch (Number(res.cannonType)) {
          case CONST.CannonType.Lightning:
            // 闪电
            mcName = CONST.CannonGetEddect.Lightning;
            break;

          case CONST.CannonType.PartialBomb:
            // 炎爆
            mcName = CONST.CannonGetEddect.PartialBomb;
            break;

          case CONST.CannonType.Laser:
            // 龙息
            mcName = CONST.CannonGetEddect.Laser;
            break;

          case CONST.CannonType.Missile:
            // 仙剑
            mcName = CONST.CannonGetEddect.Missile;
            scale = 0.95;
            laserBornEffect.y = -3;
            isRo = true;
            break;
        }

        var Min = 1;
        var Max = 5;
        var LoopTime = 0;
        var IsHaveZero = false;
        var Speed = 0.12;
        var PayEdRemove = false;
        laserBornEffect.scale = scale;

        if (isRo) {
          laserBornEffect.stopAllActions();
          laserBornEffect.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.9, cc.v2(laserBornEffect.x, laserBornEffect.y + 6)), cc.moveTo(0.9, cc.v2(laserBornEffect.x, laserBornEffect.y - 6)))));
        }

        laserBornEffect.getComponent("nfish_MovieClip").initEffect(_this14.laserBornEffect_Atlas, mcName, Min, Max, LoopTime, IsHaveZero, Speed, PayEdRemove);
        var Frequency = 10; //设置频率 读数次数 10 次

        spineCantainer.frequency = res.total / Frequency;

        if (res.isoffNet == null) {
          //非断线重连
          //开始进行度数
          spineCantainer.startRun = Number(res.totalReward);
          spineCantainer.currCoin = 0; //读数当前指针值

          _this14["runSpecial" + res.seatNum] = true;
        } else {
          spineCantainer.startRun = Number(res.total);
          spineCantainer.currCoin = res.total; //读数当前指针值

          var labName = res.seatNum == _this14.logic.seatNum ? "gold_lab" : "silver_lab";
          spineCantainer.getChildByName(labName).getComponent(cc.Label).string = res.total + "";
        }
      }));
      spineCantainer.runAction(act);
    }
  },
  //开始读数
  runSpecialBulletStatistics: function runSpecialBulletStatistics(dt) {
    var UserMax = 4;

    for (var i = 0; i < UserMax; i++) {
      if (!this["runSpecial" + i]) {
        continue;
      }

      var spineCantainer = this.node.getChildByName("ui_coinEffectContainer").getChildByName("spineCantainer" + i);

      if (spineCantainer != null && spineCantainer.currCoin != null && spineCantainer.currCoin != undefined && spineCantainer.startRun != null) {
        spineCantainer.currCoin += Number(spineCantainer.frequency);
        var lab = spineCantainer.getChildByName(i == this.logic.seatNum ? "gold_lab" : "silver_lab").getComponent(cc.Label);
        var oldCoin = lab.string == undefined || lab.string == "" ? 0 : Number(lab.string);

        if (spineCantainer.currCoin >= spineCantainer.startRun) {
          //读数完成
          if (spineCantainer.startRun > oldCoin) {
            var currStartNum = spineCantainer.startRun + "";

            if (currStartNum.indexOf(".") != -1) {
              lab.string = Number(spineCantainer.startRun).toFixed(1);
            } else {
              lab.string = spineCantainer.startRun;
            }

            cc.warn(">>>>>2. 计分成功 =====> end startRun " + spineCantainer.startRun);
          } else {// cc.error(">>> 3. 计数失败 =====> : "+spineCantainer.currCoin+" 当前数: "+oldCoin)
          }

          spineCantainer.currCoin = null;
          glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
        } else {
          //正在读数
          if (spineCantainer.currCoin > oldCoin) {
            var _currStartNum = spineCantainer.currCoin + "";

            if (_currStartNum.indexOf(".") != -1) {
              lab.string = _currStartNum.split(".")[0];
            } else {
              lab.string = spineCantainer.currCoin;
            }
          } else {}
        }
      }
    }
  },
  //清除特殊子弹
  clearSpecialHandler: function clearSpecialHandler(seatNum) {
    var _this15 = this;

    var DeayTime = 1.5;
    this.scheduleOnce(function () {
      var lastCannType = Number(_this15.logic.specialBulletPool[seatNum] + "");
      delete _this15.logic.specialBulletPool[seatNum]; //根据规则：每个玩家同屏下只允许有一个特殊子弹

      if (_this15.logic.seatNum == seatNum) cc.warn("=== 删除特殊子弹状态 ============ seatNum " + seatNum + " lastCannType " + lastCannType);
      glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
    }, DeayTime);
  },
  //检查当前计数器计数完成之后是否需要销毁
  checkSpecialBulletHandler: function checkSpecialBulletHandler() {
    var isDisSpecial = null;
    var UserMax = 4;

    for (var i = 0; i < UserMax; i++) {
      var spineCantainer = this.node.getChildByName("ui_coinEffectContainer").getChildByName("spineCantainer" + i);

      if (spineCantainer != null && spineCantainer.currCoin == null) {
        //如果计数器存在,并且 读数完成
        var isLevel = true;

        for (var key in this.logic.playerInfo) {
          var playerInfo = this.logic.playerInfo[key];

          if (playerInfo != null && Number(playerInfo.seatNum) == i) {
            //按照座位找到当前用户身上的子弹信息
            isLevel = false;

            if (this.logic.specialBulletPool[i] == undefined && this.logic.specialBulletPool[i] == null) {
              if (spineCantainer.cannonType == CONST.CannonType.Missile) {
                //仙剑子弹 的销毁逻辑 要特殊处理
                if (playerInfo.cannonAmount != undefined && playerInfo.cannonAmount == 0) {
                  //如果当前没有仙剑子弹在飞、并且身上已经没有了子弹
                  isDisSpecial = "======= 1 结果 仙剑结束  seatNum " + i + " mySeatNum " + this.logic.seatNum; // if(this.logic.seatNum == i) cc.error(">>>>>>>>>>>>>>>>>>>>>  1111 ")

                  this.specialBulletStatisticsClear(playerInfo); //开始销毁
                }
              }

              if (playerInfo.cannonType == CONST.CannonType.Normal) {
                isDisSpecial = "======= 2 结果 当前是普通子弹 seatNum " + i + " mySeatNum " + this.logic.seatNum; // if(this.logic.seatNum == i)cc.error(">>>>  2222.1  当前是普通子弹 playerInfo "+playerInfo.cannonType," playerInfo ",playerInfo)

                this.specialBulletStatisticsClear(playerInfo); //开始销毁
              }

              if (spineCantainer.cannonType != playerInfo.cannonType) {
                //如果当前统计框的类型和身上子弹类型不一样
                isDisSpecial = "======== 3 结果 切换了 子弹 seatNum" + i + " mySeatNum " + this.logic.seatNum; // if(this.logic.seatNum == i)cc.error(">>>>  3333  当前是普通子弹 playerInfo "+playerInfo.cannonType," playerInfo ",playerInfo);

                this.specialBulletStatisticsClear(playerInfo); //开始销毁
              }
            }
          }
        }

        if (isLevel) {
          isDisSpecial = "====== 4 结果 用户离开 seatNum " + i + " mySeatNum " + this.logic.seatNum;
          this.specialBulletStatisticsClear({
            seatNum: i
          }); //开始销毁
        }
      }
    }
  },
  //销毁 - 计数器 取消计算数字 - 升级到所有子弹销毁
  specialBulletStatisticsClear: function specialBulletStatisticsClear(res) {
    this["runSpecial" + res.seatNum] = false;
    var ui_coinEffectContainer = this.node.getChildByName("ui_coinEffectContainer");
    var spineCantainer = ui_coinEffectContainer.getChildByName("spineCantainer" + res.seatNum);

    if (spineCantainer != null && spineCantainer.isDispose != null) {
      // if(this.logic.seatNum == res.seatNum)cc.error(">>> 正在销毁 ----seatNum "+res.seatNum);
      return;
    }

    if (spineCantainer != null) {
      spineCantainer.isDispose = 1; // if(this.logic.seatNum == res.seatNum)cc.error("===================销毁 cannonType : "+spineCantainer.cannonType+" seatNum "+res.seatNum)
      // if(this.logic.seatNum == res.seatNum)cc.error("");
      // if(this.logic.seatNum == res.seatNum)cc.error("");
      // if(this.logic.seatNum == res.seatNum)cc.error("");

      spineCantainer.currCoin = null;
      spineCantainer.lastcurrCoin = null;
      var DelayTime = 0.9;
      var FadeToTime = 0.2;
      var FadeToArg = 0;
      var DelayTime2 = 2;
      this.scheduleOnce(function () {
        spineCantainer = ui_coinEffectContainer.getChildByName("spineCantainer" + res.seatNum);

        if (spineCantainer != null) {
          spineCantainer.stopAllActions();
          ui_coinEffectContainer.removeChild(spineCantainer);
          spineCantainer.destroy();
        }
      }, DelayTime + FadeToTime * DelayTime2);
      spineCantainer.stopAllActions();
      spineCantainer.runAction(cc.sequence(cc.delayTime(DelayTime), cc.fadeTo(FadeToTime, FadeToArg)), cc.callFunc(function () {
        ui_coinEffectContainer.removeChild(spineCantainer);
        spineCantainer.opacity = 0;
        spineCantainer.destroy();
      }));
    } else {
      if (this.logic.seatNum == res.seatNum) {
        cc.error(">>销毁 失败 " + res.seatNum + "  spineCantainer is null  >> spineCantainer ", spineCantainer);
      }
    }
  },
  //其他人的 如意 聚宝鹏 展示
  oPSSAHandler: function oPSSAHandler(res) {
    var NormalOpacity = 255;
    var effectContainer = this.node.getChildByName("ui_coinEffectContainer");
    var spine_effect = this.node.getChildByName("spine_effect");
    var type = res.type;
    var typeName = type == CONST.AwardType.RUYI ? "YuRu" : "juBao";
    var seatNum = res.seatNum;
    var posPreName = type == CONST.AwardType.RUYI ? "yuRuPos" : "juBaoPos";
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var nodeName = typeName + seatNum;
    var posName = posPreName + seatNum;
    var targetPosition;

    if (this.logic.getIsRotation()) {
      posPreName = type == CONST.AwardType.RUYI ? "yuRuPos_R_" : "juBaoPos_R_";
      posName = posPreName + seatNum;
      targetPosition = ui_coinEffectPos.getChildByName(posName).position;
    } else {
      targetPosition = ui_coinEffectPos.getChildByName(posName).position;
    }

    var spineCantainer = effectContainer.getChildByName(nodeName);

    if (spineCantainer == null) {
      var spineName = type == CONST.AwardType.RUYI ? "spine_YuRu" : "spine_JuBao";
      spineCantainer = cc.instantiate(spine_effect.getChildByName(spineName));
      spineCantainer.name = nodeName;
      spineCantainer.active = true;
      spineCantainer.setPosition(targetPosition);
      effectContainer.addChild(spineCantainer);

      if (this.logic.getIsRotation()) {
        spineCantainer.angle = 180;
      }
    } else {
      spineCantainer.active = true;
      spineCantainer.opacity = NormalOpacity;
      spineCantainer.stopAllActions();
    }

    this.startShowSpacil(res, type, spineCantainer);
  },
  //开始显示 特殊
  startShowSpacil: function startShowSpacil(res, type, spineCantainer) {
    var _this16 = this;

    if (type == CONST.AwardType.RUYI) {
      spineCantainer.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1), cc.delayTime(6), cc.callFunc(function () {
        _this16.flyGoldEffectForSpacil(res);
      })));
    } else {
      spineCantainer.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1), cc.delayTime(6), cc.callFunc(function () {
        _this16.flyGoldEffectForSpacil(res);
      })));
    }
  },
  //飞金币
  flyGoldEffectForSpacil: function flyGoldEffectForSpacil(res) {
    var _this17 = this;

    var type = res.type;
    var seatNum = res.seatNum;
    var typeName = type == CONST.AwardType.RUYI ? "YuRu" : "juBao";
    var posPreName = type == CONST.AwardType.RUYI ? "yuRuPos" : "juBaoPos";
    var ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
    var startPos = ui_coinEffectPos.getChildByName(posPreName + seatNum).position;
    var effectContainer = this.node.getChildByName("ui_coinEffectContainer");
    var coinContainer = this.node.getChildByName("ui_coinEffectContainer");
    var pre = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
    var targetPosition = ui_coinEffectPos.getChildByName(pre + seatNum).position;
    var spineCantainer = effectContainer.getChildByName(typeName + seatNum);
    var Multiple = 100;
    var MaxCoin = 20; //最大数量

    var effectCoin = Math.ceil(res.rewardGold / Multiple);

    if (effectCoin > MaxCoin) {
      effectCoin = MaxCoin;
    }

    var StartName = 1;
    var endName = 16;
    var plyTime = 3;
    var isHaveZero = false;
    var speed = 0.035;
    var plyedDestroy = false;
    var isRandomPly = 1;
    var RandomOffsexX = 30;
    var RandomOffsexY = 50;
    var RandomMinY = 20;
    var OneDelayTime = 0.1;
    var TwoDelayTime = 0.05;
    var ScaleToTime = 1;
    var BezierToTime = 0.7;
    var ScaleToArg = 0.8;
    var FadeToTime = 0.1;
    var MoveToTime = 0.15;
    var EndOpacity = 255;

    var _loop3 = function _loop3(i) {
      var ui_CoinEffect = _this17.logic.creatorEffect();

      ui_CoinEffect.x = startPos.x;
      ui_CoinEffect.y = startPos.y;
      ui_CoinEffect.active = true;
      ui_CoinEffect.parent = null;
      ui_CoinEffect.opacity = 0;
      var playName = "silver";
      ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(_this17.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);
      coinContainer.addChild(ui_CoinEffect);
      var upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

      if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
        upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
      }

      var bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
      var bounceAct2 = cc.moveTo(MoveToTime, upPos);
      var bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
      var act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));
      ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i * OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(i * TwoDelayTime), cc.callFunc(function () {
        ui_CoinEffect.destroy();
      })));
    };

    for (var i = 0; i < effectCoin; i++) {
      _loop3(i);
    }

    var endGoldTime = effectCoin * OneDelayTime + effectCoin * TwoDelayTime; //最后一个金币漂移的时间

    var HideOpacity = 0;
    spineCantainer.stopAllActions();
    spineCantainer.runAction(cc.sequence(cc.delayTime(endGoldTime), cc.scaleTo(0.5, 0, 0), cc.callFunc(function () {
      spineCantainer.opacity = HideOpacity;
    })));
  },
  //飘分
  addGoldEffectHandler: function addGoldEffectHandler(res) {
    this.addGoldEffect(0, res);
  },
  //充值到账财神爷
  onCoinChangedHandler: function onCoinChangedHandler(res) {
    var myid = glGame.user.userID;

    if (res.uid == myid) {
      var arrvalCoin = this.logic.getFloat(Number(res.offset));
      glGame.emitter.emit(glGame.showGodOfWealth, {
        pos: 3,
        coin: arrvalCoin
      });
    }
  },
  //跟随鱼Tip 显示 队列处理
  followFishTipHandler: function followFishTipHandler(res) {
    this.followFishTipList.push(res);
  },
  //清理显示鱼气泡
  clearFollowFishTipHandler: function clearFollowFishTipHandler(res) {
    if (this.ui_tip == undefined) {
      return;
    }

    var tipName = "fish_tip_" + res.fishId;
    var tip = this.ui_tip.getChildByName(tipName);

    if (tip) {
      tip.destroy();

      if (this.followFishTipList.length > 0) {
        for (var i = 0; i < this.followFishTipList.length; i++) {
          if (this.followFishTipList[i] != null && this.followFishTipList[i].id == res.fishId) {
            this.followFishTipList[i] = null;
          }
        }
      }
    }
  },
  //跟随鱼气泡 循环跟随体
  followFishTip: function followFishTip(dt) {
    if (this.ui_physicalPool == undefined) {
      this.ui_physicalPool = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
    }

    if (this.ui_tip == undefined) {
      this.ui_tip = this.node.getChildByName("ui_fishTip");
    }

    if (this.followFishTipList.length > 0) {
      for (var i = 0; i < this.followFishTipList.length; i++) {
        if (this.followFishTipList[i]) {
          var fishId = this.followFishTipList[i].id;
          var fish = this.ui_physicalPool.getChildByName("" + fishId);
          var tipName = "fish_tip_" + fishId;

          if (fishId && fish) {
            var tip = void 0;

            if (this.ui_tip.getChildByName(tipName) == null) {
              tip = cc.instantiate(this.fishTip);
              tip.name = tipName;
              tip.active = true;
              this.ui_tip.addChild(tip);
              var lab = tip.getChildByName("bg").getChildByName("lab");

              if (tip.width == 0) {
                var size = this.followFishTipList[i].size;
                tip.width = size.width;
                tip.height = size.height;
                lab.getComponent(cc.Label).string = this.followFishTipList[i].text; // //test 代码
                // lab.getComponent(cc.Label).string = this.followFishTipList[i].data.fishName;
              }

              if (this.followFishTipList[i].direction) {
                tip.scaleX = -1;
                lab.scaleX = -1;
              }

              if (this.logic.getIsRotation()) {
                tip.angle = 180;
              }
            } else {
              tip = this.ui_tip.getChildByName(tipName);
            }

            tip.setPosition(fish.position);
            this.followFishTipList[i].time -= dt;

            if (this.followFishTipList[i].time <= 0) {
              tip.destroy();
              this.followFishTipList[i] = null;
            }
          }

          if (fish == undefined && this.ui_tip.getChildByName(tipName) != null) {
            this.ui_tip.getChildByName(tipName).destroy();
            this.followFishTipList[i] = null;
          }
        }
      }
    }
  },
  //判断退出 特殊鱼来了 显示倒计时，boss来了 播放特效
  update: function update(dt) {
    var _this18 = this;

    this.fireTime += dt;

    if (this.fireTime > this.fireTimeFrequency) {
      this.fireTime = 0;
      this.isFire = true;
    }

    if (this.bulletTips.active == true) {
      this.bulletTipTime += dt;
      var ShowMaxTime = 2;

      if (this.bulletTipTime >= ShowMaxTime) {
        this.bulletTips.active = false;
        this.bulletTipTime = 0;
      }
    }

    if (!this.logic.isEnterRoom) {
      return;
    }

    this.followFishTip(dt);
    this.runSpecialBulletStatistics(dt);

    if (this.clickFishPoolEvent != null) {
      this.clickFishPoolTime += dt;
      var MaxClickFishPoolTime = 0.053;

      if (this.clickFishPoolTime > MaxClickFishPoolTime) {
        this.nextClickFishPoolHandler(this.clickFishPoolEvent);
        this.clickFishPoolEvent = null;
        this.clickFishPoolTime = 0;
      }
    }

    var ChangeSecond = 1000;
    var time = this.logic.exitTimeMsg - Math.floor((Date.now() - this.logic.curWaitTime) / ChangeSecond);

    if (time < 0.9 && this.isExit) {
      this.isExit = false;
      this.logic.isEnterRoom = false;
      glGame.room.exitRoom();
    } else {
      if (time <= this.logic.exitTimeMsg - this.logic.showTimeMsg) {
        this.node.getChildByName("ui_ExitTip").active = true;
        this.node.getChildByName("ui_ExitTip").getChildByName("lab_tip2").getComponent(cc.Label).string = time > 0 ? time : 0;
      }
    }

    if (time <= this.logic.exitTimeMsg - this.logic.showTimeMsg) {} else {
      this.node.getChildByName("ui_ExitTip").active = false;
    }

    var HaveSpecialFish = 1;
    var ToSecond = 1000;
    var ThreeHideTime = ToSecond * 3;
    var ShowTime = ToSecond * 30;

    if (this.logic.specialFishListBornLen > HaveSpecialFish && this.logic.specialFishListBorn != null) {
      var _loop4 = function _loop4(id) {
        _this18.logic.specialFishListBorn[id].wellBornTime -= dt * ToSecond;

        if (_this18.logic.specialFishListBorn[id].wellBornTime < 0) {
          _this18.logic.specialFishListBorn[id].wellBornTime = 0;
        }

        var showTime = new Date(_this18.logic.specialFishListBorn[id].wellBornTime).Format("mm：ss");
        var tip = void 0;

        if (_this18.logic.specialFishListBorn[id].wellBornTime > HaveSpecialFish && _this18.logic.specialFishListBorn[id].wellBornTime < ThreeHideTime) {
          if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossGodOfWealth && _this18.logic.specialFishListBorn[id].isSetTime == null) {
            _this18.effect_csrcdh.settingActiveTime = 8;
            _this18.logic.specialFishListBorn[id].isSetTime = 1;
          }

          if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt && _this18.logic.specialFishListBorn[id].isSetTime == null) {
            _this18.effect_ryxwrcdh.settingActiveTime = 8;
            _this18.logic.specialFishListBorn[id].isSetTime = 1;
          }

          if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossSYLW && _this18.logic.specialFishListBorn[id].isSetTime == null) {
            _this18.logic.specialFishListBorn[id].isSetTime = 1;
          }
        }

        if (_this18.logic.specialFishListBorn[id].wellBornTime > HaveSpecialFish && _this18.logic.specialFishListBorn[id].wellBornTime < ShowTime) {
          tip = _this18.bossConeInTip.getChildByName(id + "");

          if (tip == null) {
            tip = cc.instantiate(_this18.bossBornTip);
            tip.name = id + "";
            tip.active = true;
            var icon = tip.getChildByName("cantainer").getChildByName("mask").getChildByName("img_icon");
            var fishData1 = _this18.logic.json_fishTable[_this18.logic.specialFishListBorn[id].fishTypeId + ""];

            var fishData2 = _this18.logic.json_fishTable[Number(_this18.logic.specialFishListBorn[id].fishTypeId)];

            var fishData = fishData1 == undefined ? fishData2 : fishData1;
            var resGroupId = fishData.resGroupId;
            icon.getComponent(cc.Sprite).spriteFrame = _this18.speciaIcon_Atlas.getSpriteFrame(CONST.SpeciaResPre + resGroupId);

            if (_this18.logic.getIsRotation()) {
              icon.angle = 180;
            }

            _this18.bossConeInTip.addChild(tip);

            tip.x = tip.width;
            tip.stopAllActions();
            tip.runAction(cc.moveTo(_this18.bossTipMoveToTime, _this18.bossNormalPos.position));
          }

          tip.getChildByName("lab_Time").getComponent(cc.Label).string = showTime + "";
          tip.active = !_this18.logic.isFishTideRuning;
        } else {
          tip = _this18.bossConeInTip.getChildByName(id + "");

          if (tip != null && tip.isRun == null) {
            var IsHave = 1;
            tip.active = !_this18.logic.isFishTideRuning;
            tip.isRun = IsHave;
            tip.getChildByName("lab_Time").getComponent(cc.Label).string = showTime + "";
            tip.stopAllActions();
            tip.runAction(cc.sequence(cc.moveTo(_this18.bossTipMoveToTime, cc.v2(tip.width, tip.y)), cc.callFunc(function () {
              _this18.bossConeInTip.removeChild(tip);

              tip.destroy();
            })));

            if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossGodOfWealth) {
              glGame.emitter.emit(CONST.clientEvent.bossGodOfWealthCoin); //BOSS警告财神

              _this18.effect_csrcdh.getComponent(cc.Widget).updateAlignment();

              var bet;

              if (glGame.fishMutipleCfg == null) {
                bet = "0"; //出现这个就是：拿不到数据或者配表出错
              } else {
                bet = (glGame.fishMutipleCfg[CONST.BossGodOfWealth] + "").replace("-", "~");
              }

              var desc_lab = _this18.spine_csrcdh.getChildByName("lab_betDesc");

              if (desc_lab.oldX == undefined) {
                desc_lab.oldX = desc_lab.x;
              } else {
                desc_lab.x = desc_lab.oldX;
              }

              desc_lab.stopAllActions();
              desc_lab.runAction(cc.sequence(cc.delayTime(2), cc.moveTo(0.25, cc.v2(cc.winSize.width, desc_lab.y))));
              desc_lab.getComponent(cc.Label).string = bet + "倍";

              _this18.logic.playSpine(_this18.spine_csrcdh, false, true, CONST.SpineName.Normal);
            }

            if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt) {
              glGame.emitter.emit(CONST.clientEvent.bossLavaBasaltComin); //BOSS警告财神

              _this18.effect_ryxwrcdh.getComponent(cc.Widget).updateAlignment();

              var _bet;

              if (glGame.fishMutipleCfg == null) {
                _bet = "0"; //出现这个就是：拿不到数据或者配表出错
              } else {
                _bet = (glGame.fishMutipleCfg[CONST.BossLavaBasalt] + "").replace("-", "~");
              }

              var _desc_lab = _this18.spine_ryxwrcdh.getChildByName("lab_betDesc");

              if (_desc_lab.oldX == undefined) {
                _desc_lab.oldX = _desc_lab.x;
              } else {
                _desc_lab.x = _desc_lab.oldX;
              }

              _desc_lab.stopAllActions();

              _desc_lab.runAction(cc.sequence(cc.delayTime(2), cc.moveTo(0.25, cc.v2(cc.winSize.width, _desc_lab.y))));

              _desc_lab.getComponent(cc.Label).string = _bet + "倍";

              _this18.logic.playSpine(_this18.spine_ryxwrcdh, false, true, CONST.SpineName.Normal);

              var warn = _this18.spine_ryxwrcdh.getChildByName("warn");

              warn.stopAllActions();
              warn.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.3, 0), cc.delayTime(0.3), cc.fadeTo(0.3, 255))));
            }

            var PlayBGMTime = 3;

            if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossSYLW) {
              _this18.scheduleOnce(function () {
                glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossSYLWBgMusic); //播放 深渊龙王 背景声音
              }, PlayBGMTime);
            }

            if (_this18.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt) {
              _this18.scheduleOnce(function () {
                glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossLavaBasaltBgMusic); //播放 熔岩玄武 背景声音
              }, PlayBGMTime);
            }

            delete _this18.logic.specialFishListBorn[id];
          }
        }
      };

      //有特属鱼即将出生，搞个计时器显示下
      for (var id in this.logic.specialFishListBorn) {
        _loop4(id);
      }
    }

    if (this.effect_csrcdh != null && this.effect_csrcdh.settingActiveTime != null && !this.logic.isFishTideRuning) {
      var Frequency = 500;
      var PositiveDirection = 1; //正方向

      var OppositeDirection = -1; //反方向

      var MaxLight = 254;
      var MinLight = 1;

      if (this.effect_csrcdh.settingActiveTime > 0) {
        if (this.effect_csrcdh.active == false) {
          this.effect_csrcdh.active = true;
          this.effect_csrcdh.getComponent(cc.Widget).updateAlignment();
        }

        if (this.effect_csrcdh.subD == null) {
          this.effect_csrcdh.subD = PositiveDirection;
        }

        if (this.effect_csrcdh.subD == PositiveDirection) {
          this.effect_csrcdh.opacity += Math.ceil(dt * Frequency);

          if (this.effect_csrcdh.opacity > MaxLight) {
            this.effect_csrcdh.subD = OppositeDirection;
          }
        } else {
          this.effect_csrcdh.opacity -= Math.ceil(dt * Frequency);

          if (this.effect_csrcdh.opacity < MinLight) {
            this.effect_csrcdh.subD = PositiveDirection;
          }
        }

        this.effect_csrcdh.settingActiveTime -= dt;
      } else {
        this.effect_csrcdh.settingActiveTime = null;
        this.effect_csrcdh.active = false;
      }
    }

    if (this.effect_ryxwrcdh != null && this.effect_ryxwrcdh.settingActiveTime != null && !this.logic.isFishTideRuning) {
      var _Frequency = 500;
      var _PositiveDirection = 1; //正方向

      var _OppositeDirection = -1; //反方向


      var _MaxLight = 254;
      var _MinLight = 1;

      if (this.effect_ryxwrcdh.settingActiveTime > 0) {
        if (this.effect_ryxwrcdh.active == false) {
          this.effect_ryxwrcdh.active = true;
          this.effect_ryxwrcdh.getComponent(cc.Widget).updateAlignment();
        }

        this.effect_ryxwrcdh.settingActiveTime -= dt;

        if (this.effect_ryxwrcdh.subD == null) {
          this.effect_ryxwrcdh.subD = _PositiveDirection;
        }

        if (this.effect_ryxwrcdh.subD == _PositiveDirection) {
          this.effect_ryxwrcdh.opacity += Math.ceil(dt * _Frequency);

          if (this.effect_ryxwrcdh.opacity > _MaxLight) {
            this.effect_ryxwrcdh.subD = _OppositeDirection;
          }
        } else {
          this.effect_ryxwrcdh.opacity -= Math.ceil(dt * _Frequency);

          if (this.effect_ryxwrcdh.opacity < _MinLight) {
            this.effect_ryxwrcdh.subD = _PositiveDirection;
          }
        }
      } else {
        this.effect_ryxwrcdh.settingActiveTime = null;
        this.effect_ryxwrcdh.active = false;
      }
    }
  },
  //鱼潮来了隐藏 boss来了
  hideBossConinUIHandler: function hideBossConinUIHandler() {
    this.effect_csrcdh.settingActiveTime = null;
    this.effect_ryxwrcdh.settingActiveTime = null;
    this.effect_csrcdh.active = false;
    this.effect_ryxwrcdh.active = false;
  },
  //boss 过来 开始倒计时
  bossComeinHandler: function bossComeinHandler(res) {
    var fishTypeId = res.fishTypeId;
    var liveTime = Number(res.serverTime - res.createTime); //出生时间

    var NotBorn = 0;
    var ToSecond = 1000;

    if (liveTime < NotBorn) {
      //大于0 就是已经出生了不必再出提示
      this.logic.specialFishListBornLen++;
      var wellBornTime = Math.abs(liveTime) + Number(res.showTime) * ToSecond; //还要多久才出生 - 从屏幕边缘开始游动起来 并不是进入屏幕

      this.logic.specialFishListBorn[res.id] = {
        fishTypeId: fishTypeId,
        wellBornTime: wellBornTime
      };
    }
  },
  //财神进入
  bossGodOfWealthCoinHandler: function bossGodOfWealthCoinHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "bossCominCaiShen"); //BOSS警告财神

    glGame.emitter.emit(CONST.clientEvent.fishSound, "bossCsComin"); //BOSS 财神降临
  },
  //熔岩玄武进入
  bossLavaBasaltCominHandler: function bossLavaBasaltCominHandler() {
    glGame.emitter.emit(CONST.clientEvent.fishSound, "bossCominXuanWu"); //BOSS警告玄武
  },
  //断线重连，清理数据
  clearbossComeinHandler: function clearbossComeinHandler() {
    for (var id in this.logic.specialFishListBorn) {
      var tip = this.bossConeInTip.getChildByName(id + "");

      if (tip) {
        this.bossConeInTip.removeChild(tip);
        tip.destroy();
        delete this.logic.specialFishListBorn[id];
      }
    }

    this.logic.specialFishListBornLen = 0;
    this.logic.specialFishListBorn = {};
  },
  //设置旋转
  checkRotationHandler: function checkRotationHandler() {
    cc.warn(">> 角度旋转180  checkRotationHandler");
    this.logic.isNeedSet180Angle(this.node);
  },
  //海浪鱼群-播放海浪
  onSurfStartHandler: function onSurfStartHandler(res) {
    var ui_surfCantainer = this.node.getChildByName("ui_surfCantainer");
    ui_surfCantainer.getChildByName("waves_texture1").active = true;
    ui_surfCantainer.getChildByName("waves_texture2").active = false;

    if (this.logic.bgIndex > 0) {
      //每个bg 偏移量不一样
      ui_surfCantainer.x = cc.winSize.width - 750; //偏移量气泡在2个背景中间 背景宽度 2411 背景不适配
    } else {
      ui_surfCantainer.x = cc.winSize.width - 100 + this.logic.bgIndex * 100; //偏移量气泡在2个背景中间 背景宽度 2411 背景不适配
    }

    var MoveToTime = 2;
    var OutWinSizeOffceX = 5;
    var OutWinSizeX = -cc.winSize.width;
    ui_surfCantainer.stopAllActions();
    ui_surfCantainer.runAction(cc.sequence(cc.moveTo(MoveToTime, cc.v2(OutWinSizeX, ui_surfCantainer.y)), cc.callFunc(function () {
      ui_surfCantainer.x = cc.winSize.width + OutWinSizeOffceX;
      ui_surfCantainer.getChildByName("waves_texture1").active = false;
      ui_surfCantainer.getChildByName("waves_texture2").active = false;
    })));
  },
  //显示浪潮来临
  showFishTideTitleHandler: function showFishTideTitleHandler() {
    var ui_fishTideTitle = this.node.getChildByName("ui_fishTideTitle");
    var HidOpacity = 255;
    ui_fishTideTitle.opacity = HidOpacity;
    ui_fishTideTitle.active = true;
    this.logic.playSpine(ui_fishTideTitle.getChildByName("spine"), false, true, CONST.SpineName.Normal);
  },
  //清理
  OnDestroy: function OnDestroy() {
    this.unscheduleAllCallbacks();
    this.logic = null;
    this.unregisterEvent();
    this.bossTipMoveToTime = 0.5;
    this.node.isInit = 1;
    this.bulletTipTime = 0;
    this.clickFishPoolEvent = null;
    this.clickFishPoolTime = 0;
    this.lastAngle = null;
    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.fireTime = 0; //开火计时器

    this.fireTimeFrequency = 0.17; //开火频率

    this.isFire = true; //是否可以开火

    this.logic.cannonLevel = null;
    this.isExit = true;
    if (this.turntableView) this.turntableView.destroy();
    this.turntableView = null;
    if (this.cornucopiaView) this.cornucopiaView.destroy();
    this.cornucopiaView = null;
  },

  /**
   * @param event
   * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
   * @Explain Button点击事件统一调用
   */
  OnClickButton: function OnClickButton(event, type) {
    var _this19 = this;

    var buttonName = event.target.name;
    var buttonNode = event.target;

    if (buttonName == "ui_menuBtn" || buttonName == "ui_BtnSub" || buttonName == "ui_BtnPlus" || buttonName == "ui_skillAuto" || buttonName == "ui_skillLock") {//这5个按钮就不限制
    } else {
      if (!type || type == "select") {
        if (this.curClickState) return;
        this.curClickState = true;
        this.allCurTimeout = this.allCurTimeout || [];
        this.allCurTimeout.push(setTimeout(function () {
          _this19.curClickState = false;
        }, 500));
      }
    }

    console.log("\u70B9\u51FB\u4E86button -> ".concat(buttonName));

    switch (buttonName) {
      case "close_eff":
        //当前界面有播放特长音效的关闭按钮
        glGame.audio.closeCurEffect();
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      case "close":
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      default:
        if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");else glGame.audio.playLoadSoundEffectByPath("click");
    }

    this.onClick(buttonName, buttonNode);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfZGVza1VJQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIkNPTlNUIiwicmVxdWlyZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJtb25leUVmZmVjdF9BdGxhcyIsImRpc3BsYXlOYW1lIiwidG9vbHRpcCIsInR5cGUiLCJjYyIsIlNwcml0ZUF0bGFzIiwibGFzZXJCb3JuRWZmZWN0X0F0bGFzIiwiaWNvbl9BdGxhcyIsImljb25fMl8zXzRfQXRsYXMiLCJzcGVjaWFJY29uX0F0bGFzIiwiZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzIiwiaWxsdXN0cmF0ZWRCb29rIiwiUHJlZmFiIiwicmVjb3JkX3ByZSIsInNldHRpbmdfcHJlIiwidHVybnRhYmxlIiwiY29ybnVjb3BpYSIsImJ1bGxldEVmZmVjdCIsImZpc2hUaXAiLCJjaGFuZ2VDYW5ub25FZmZlY3RMaXN0Iiwic3AiLCJTa2VsZXRvbkRhdGEiLCJiYXR0ZXJ5TGlzdCIsInVpX0FjdGlvbmFibGUiLCJOb2RlIiwiYnVsbGV0VGlwcyIsInVpX3NraWxsQXV0byIsInVpX3NraWxsTG9jayIsImJvc3NDb25lSW5UaXAiLCJib3NzQm9yblRpcCIsImJvc3NOb3JtYWxQb3MiLCJzcGluZV9jc3JjZGgiLCJlZmZlY3RfY3NyY2RoIiwic3BpbmVfcnl4d3JjZGgiLCJlZmZlY3Rfcnl4d3JjZGgiLCJ1aV9tZW51IiwidWlfbWVudUJ0biIsImNoaWNrX2FjdCIsImNoaWNrX21laWh1YSIsImFsZXJ0X2NvbnRhaW5lciIsInRleHRfZXhpdEJvc3NDbGVhclNvY3JlIiwidGV4dF9leGl0TG9zQ2FubmFuIiwidGV4dF9uZXRPZmYiLCJidG5fcXVpdCIsImJ0bl9xdWVkaW5nIiwiYnRuX3F1ZWRpbmdfbmV0Iiwib25Mb2FkIiwiY3JlYXRTbWVhciIsImJvc3NUaXBNb3ZlVG9UaW1lIiwibm9kZSIsImlzSW5pdCIsImJ1bGxldFRpcFRpbWUiLCJjbGlja0Zpc2hQb29sRXZlbnQiLCJjbGlja0Zpc2hQb29sVGltZSIsImxhc3RBbmdsZSIsImxvZ2ljIiwiZ2V0SW5zdGFuY2UiLCJmaXJlVGltZSIsImZpcmVUaW1lRnJlcXVlbmN5IiwiaXNGaXJlIiwiY2Fubm9uTGV2ZWwiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlciIsInVzZXJJRCIsIk51bWJlciIsImlzRXhpdCIsInR1cm50YWJsZVZpZXciLCJjb3JudWNvcGlhVmlldyIsInJ1blNwZWNpYWwwIiwicnVuU3BlY2lhbDEiLCJydW5TcGVjaWFsMiIsInJ1blNwZWNpYWwzIiwiZm9sbG93RmlzaFRpcExpc3QiLCJnYW1lWm9vbVgiLCJ3aW5TaXplIiwid2lkdGgiLCJEZXNpZ25TaXplIiwiZ2FtZVpvb21ZIiwiaGVpZ2h0IiwicmVnaXN0ZXJFdmVudCIsImluaXRTcGVjaWFOb2RlIiwic3RhcnQiLCJJbnZpc2libGUiLCJNYXhVc2VyTnVtIiwiTm9ybWFsIiwiRmFkZVRvVGltZSIsIkRlbGF5VGltZSIsImkiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsInVpX2d1biIsInVpX3BvcyIsInVpX3dhaXQiLCJhZGRDb21wb25lbnQiLCJnZXRDb21wb25lbnQiLCJCb3hDb2xsaWRlciIsImVuYWJsZWQiLCJvcGFjaXR5Iiwic3RvcEFsbEFjdGlvbnMiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJmYWRlVG8iLCJkZWxheVRpbWUiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJnYW1laWQiLCJyb3V0ZSIsIm1zZyIsInJlc3VsdCIsImZpc2hNdXRpcGxlQ2ZnIiwiY29uc29sZSIsImxvZyIsInNwZWNpYWxfQ2FudGFpbmVyIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsImhpZGUiLCJOb3JtYWxPcGFjaXR5IiwiaXNFbnRlclJvb20iLCJlbWl0dGVyIiwib24iLCJjbGllbnRFdmVudCIsImNvbWVJblBsYXllciIsImNvbWVJblBsYXllckhhbmRsZXIiLCJsZWF2ZVJvb21QbGF5ZXIiLCJsZWF2ZVJvb21QbGF5ZXJIYW5kbGVyIiwiY2xpY2tGaXNoUG9vbCIsImNsaWNrRmlzaFBvb2xIYW5kbGVyIiwiaGlkZGVuTG9jYXRpb25UaXAiLCJoaWRkZW5Mb2NhdGlvblRpcEhhbmRsZXIiLCJwbGF5RmlyaW5nRWZmZWN0IiwicGxheUZpcmluZ0VmZmVjdEhhbmRsZXIiLCJ1cGRhdGVTaG9vdEdvbGQiLCJ1cGRhdGVTaG9vdEdvbGRIYW5kbGVyIiwidXBkYXRlR3VuUmF0ZSIsInVwZGF0ZUd1blJhdGVkSGFuZGxlciIsInVwZGF0ZUd1blJlY29pbCIsInVwZGF0ZUd1blJlY29pbEhhbmRsZXIiLCJvbkZyZWV6ZVNob3dVSSIsIm9uRnJlZXplU2hvd1VJSGFuZGxlciIsImZpcmVTZXR0aW5nUmVjb2lsIiwiZmlyZVNldHRpbmdSZWNvaWxIYW5kbGVyIiwib25Db2luQ2hhbmdlZCIsIm9uQ29pbkNoYW5nZWRIYW5kbGVyIiwicGxheUNvaW5FZmZlY3QiLCJwbGF5Q29pbkVmZmVjdEhhbmRsZXIiLCJvblN1cmZTdGFydCIsIm9uU3VyZlN0YXJ0SGFuZGxlciIsInNob3dGaXNoVGlkZVRpdGxlIiwic2hvd0Zpc2hUaWRlVGl0bGVIYW5kbGVyIiwibXlVcGRhdGVNb25leSIsIm15VXBkYXRlTW9uZXlIYW5kbGVyIiwiY2hlY2tBdXRvQW5kTG9jayIsImNoZWNrQXV0b0FuZExvY2tIYW5kbGVyIiwidXBTcGVjaWFsR3VuQ29pbiIsInVwU3BlY2lhbEd1bkNvaW5IYW5kbGVyIiwiZ2V0U3BlY2lhbENhbm5vbiIsImdldFNwZWNpYWxDYW5ub25IYW5kbGVyIiwicmVzdG9yZUNhbm5vbiIsInJlc3RvcmVDYW5ub25IYW5kbGVyIiwiYm9zc0NvbWVpbiIsImJvc3NDb21laW5IYW5kbGVyIiwic3ByaW5rbGVSZWRCYWciLCJzcHJpbmtsZVJlZEJhZ0hhbmRsZXIiLCJzaG93VHVybnRhYmxlIiwic2hvd1R1cm50YWJsZUhhbmRsZXIiLCJvdGhlclBsYXllclNob3dTcGVjaWFsQXdhcmQiLCJvUFNTQUhhbmRsZXIiLCJzcGVjaWFsQnVsbGV0U3RhdGlzdGljcyIsImNoZWNrU3BlY2lhbEJ1bGxldCIsImNoZWNrU3BlY2lhbEJ1bGxldEhhbmRsZXIiLCJjaGVja1JvdGF0aW9uIiwiY2hlY2tSb3RhdGlvbkhhbmRsZXIiLCJoaWRlQm9zc0NvbmluVUkiLCJoaWRlQm9zc0NvbmluVUlIYW5kbGVyIiwidXBkYXRlVXNlclN0YXR1cyIsInVwZGF0ZVVzZXJTdGF0dXNIYW5kbGVyIiwiYWRkR29sZEVmZmVjdCIsImFkZEdvbGRFZmZlY3RIYW5kbGVyIiwic2hvd0FsZXJ0Iiwic2hvd0FsZXJ0SGFuZGxlciIsImFjY3VtdWxhdGUiLCJhY2N1bXVsYXRlSGFuZGxlciIsImNsZWFyYm9zc0NvbWVpbiIsImNsZWFyYm9zc0NvbWVpbkhhbmRsZXIiLCJjbGVhclNwZWNpYWxCdWxsZXRQb29sIiwiY2xlYXJTcGVjaWFsSGFuZGxlciIsImJvc3NHb2RPZldlYWx0aENvaW4iLCJib3NzR29kT2ZXZWFsdGhDb2luSGFuZGxlciIsImJvc3NMYXZhQmFzYWx0Q29taW4iLCJib3NzTGF2YUJhc2FsdENvbWluSGFuZGxlciIsImNoZWNrU3BlY2lhbENhbm5vbiIsImNoZWNrU3BlY2lhbENhbm5vbkhhbmRsZXIiLCJmb2xsb3dGaXNoVGlwIiwiZm9sbG93RmlzaFRpcEhhbmRsZXIiLCJjbGVhckZvbGxvd0Zpc2hUaXAiLCJjbGVhckZvbGxvd0Zpc2hUaXBIYW5kbGVyIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvbkZpcmVIb29IYW5kbGVyIiwiVE9VQ0hfRU5EIiwiVE9VQ0hfQ0FOQ0VMIiwiVE9VQ0hfTU9WRSIsIm9uTW92ZUhhbmRsZXIiLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJyb29tTG9ja0F1dG9EYXRhIiwic3RvcmFnZSIsIlNraWxsaXNMb2NrQXV0b0NoYW5nZSIsInJvb21JZCIsIm9uU2tpbGxBdXRvSGFuZGxlciIsInJvb21Ta2lsbERhdGEiLCJTa2lsbExvY2siLCJvblNraWxsTG9ja0hhbmRsZXIiLCJldnQiLCJpc0F1dG8iLCJnZXRBbmdsZSIsImdldExvY2F0aW9uIiwiZW1pdCIsImZpc2hDYW5jZWxTaG9vdCIsInJlcyIsImluaXRQbGF5ZXIiLCJzZWF0TnVtIiwidWlfb3RoZXIiLCJuZXRTdCIsInVzZXJTdGF0dXMiLCJVc2VyU3RhdHVzIiwiT2ZmTGluZSIsInBsYXkiLCJteWlkIiwidG93ZXJfYmciLCJ1aV9iZyIsInVpX3VuV2FpdCIsImxhYl9jb2luIiwiZXJyb3IiLCJMYWJlbCIsInN0cmluZyIsIkdvbGRUZW1wIiwiZ29sZCIsInVpZCIsInNwaW5lX3Jlc3RvcmVDYW5ub24iLCJwbGF5U3BpbmUiLCJTcGluZU5hbWUiLCJ1bmRlZmluZWQiLCJ1aV9UaXAiLCJzcGluZU5hbWUiLCJTZWF0IiwiUmlnaHRUb3AiLCJMZWZ0VG9wIiwiWW91SGVyZVRvcCIsIllvdUhlcmVCdXR0b20iLCJnZXRJc1JvdGF0aW9uIiwib2ZmTGluZU1pc3NpbGVEYXRhIiwid2FybiIsIm9uU3BlY2lhbEJ1bGxldEV4cCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImNhbm5vblR5cGUiLCJDYW5ub25UeXBlIiwiYmF0dGVyeSIsImJhdHRlcnlTa2VsZXRvbkRhdGEiLCJMaWdodG5pbmciLCJDYW5ub25Ta2luIiwiUGFydGlhbEJvbWIiLCJMYXNlciIsIk1pc3NpbGUiLCJTa2VsZXRvbiIsInNrZWxldG9uRGF0YSIsIklkbGUiLCJjYW5ub25BbW91bnQiLCJOb3JtYWxDYW5ub25PZmZzZXgiLCJjYW5ub24iLCJndW5UeXBlIiwiYmF0dGVyeU1hc2siLCJzcGluZU5vZGUiLCJkZXN0cm95IiwiaXNTZXRSZWNvaWwiLCJhbmdsZSIsImZpcmVCdWxsZXRTZXR0aW5nUmVjb2lsIiwicG9zIiwiT2Zmc2V4WSIsInkiLCJNYXhCdWxsdGUiLCJidWxsdGVOdW0iLCJuZXh0Q2xpY2tGaXNoUG9vbEhhbmRsZXIiLCJTaG9vdEdhcFRpbWUiLCJpc0xvY2siLCJnZXRTdGF0ZSIsImNvaW4iLCJiYXNlQ29uc3VtZSIsIk5ld0dyb3VuZCIsInJvb21SdWxlIiwiUmFuayIsInNob3dOb3RNb25leURpYWxvZyIsImlzWXVSdXlpUnVuaW5nIiwiSGF2ZVNwZWNpYWxDYW5ub24iLCJwbGF5ZXJJbmZvIiwiYXJnIiwiZ3VuTGV2ZWwiLCJjdXJyZW50SXNNaXNzaWxlIiwiY3VycmVudEJ1bGx0ZVR5cGUiLCJuZXh0SXNIYXZlTWlzc2lsZSIsImhpdE1heCIsInNwZWNpYWxCdWxsZXRQb29sIiwic3RhcnRGaXJlIiwibG9ja0Zpc2hJRCIsImxvY2siLCJpbmRleE51bSIsImxvY2tGaXNoSW5kZXgiLCJjYWxsRnVuYyIsInVpX3BoeXNpY2FsUG9vbCIsInBhcmVudCIsImxlbiIsImNoaWxkcmVuQ291bnQiLCJmaXNoTGVuIiwiTWF4RmlzaCIsIm4iLCJjaGlsZHJlbiIsImZpc2hfVW5pdCIsImdldEZpc2hJRCIsIk5vcm1hbEFuZ2xlIiwiWmVyb0FuZ2xlIiwiYWRqdXN0R3VuQW5nbGUiLCJkaWFsb2dQYW5lbElzU2hvdyIsImlzTG9ja0F1dG9DaGFuZ2UiLCJnZXRGbG9hdCIsInBhbmVsIiwic2hvd0RpYWxvZyIsInNob3dTaG9wIiwiZGlyZWN0aW9uIiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJzdGFydFBvcyIsInBvc2l0aW9uIiwiZ2V0UDFUb1AyQW5nbGUiLCJBdHRhY2siLCJzY2hlZHVsZU9uY2UiLCJvbkNsaWNrIiwibmFtZSIsIk5vdEV4aXQiLCJJc3RFeGl0IiwiY2xvc2VWaWV3SGFuZGxlciIsIm1lbnVWaWV3SGFuZGxlciIsInJlY2hhcmdlQ2xpY2tIYW5kbGVyIiwib3BlbkZpc2hHcm91cEhhbmRsZXIiLCJoaXN0b3J5Q2xpY2tIYW5kbGVyIiwic2V0dGluZ0NsaWNrSGFuZGxlciIsInBsdXNDbGlja0hhbmRsZXIiLCJzdWJDbGlja0hhbmRsZXIiLCJvblF1aXRIYW5kbGVyIiwib25RdWVkaW5nSGFuZGxlciIsIm9uUXVlZGluZ09mZk5ldEhhbmRsZXIiLCJJc1Jlc3RvcmUiLCJGaXhUaW1lIiwiSWRsZTIiLCJyYWRpdXMiLCJGaXJlcGlsbGFyV2lkdGgiLCJuZXdTaXplIiwic2l6ZSIsImlzTmV3IiwiZmlzaCIsImZpc2hJZCIsInYyIiwieCIsInNldEd1blJhdGUiLCJpc1JlZnJlc2hOb3ciLCJpc0NoYW5nZSIsImtleSIsIlVzZXJNYXgiLCJjYWxsQmFjayIsIkRhdGUiLCJub3ciLCJNYXRoIiwicmFuZG9tIiwiaXNOb3ciLCJuZXh0VGltZSIsImlzUmVzdG9yZUluZyIsInJlc3RvcmVDQiIsImNoZWNrR3VuU3R5bGUiLCJpc0NoZWNrR3VuU2tpbiIsIk5vdCIsImlzSGF2ZVNwY0Nhbm5vbiIsIm15aW5mbyIsIk5vdEhhdmVTcGVjaWFsQ2Fub24iLCJmaXNoU291bmQiLCJOb3JtYWxDYW5ub25NaW5MZXZlbCIsIk5vcm1hbENhbm5vbk1heExldmVsIiwiY2hhbmdlQ2Fubm9uRGF0YSIsIm9wIiwiT3BlbnRpb24iLCJDaGFuZ2VDYW5ub25MdiIsInJvb20iLCJnZXRQbGF5ZXJPcCIsInNjZW5ldGFnIiwiRklTSDIiLCJzZXRJdGVtIiwiR3VuTGV2ZWwiLCJzcGluZSIsIm90aGVyQWNjdW11bGF0ZSIsIkRlbGF5VGltZTIiLCJndW5SYXRlIiwic3BlY2lhbENhbm5vbkZpc2hQb3MiLCJpc1Jlc3RvcmUiLCJjaGFuZ2VHdW4iLCJhbmkiLCJGaWV4VXBkYXRlQ2Fubm9uQ29pblRpbWUiLCJOb3dVcGRhdGVDYW5ub25Db2luVGltZSIsInRpbWUiLCJjaGFuZ2VHdW5TdHlsZSIsIk5vcm1hbExldmVsIiwiaXNHdW5Nb3ZpbmciLCJvbGROb2RlIiwib2xkTGFzdE5vZGUiLCJNb3ZlU3RhcnQiLCJsYXNlckJvcm5FZmZlY3QiLCJjcmVhdG9yRWZmZWN0Iiwic3BDYW5uQ29udGFpbmVyIiwibWNOYW1lIiwiY2hhbmdlQ2Fubm9uU2tlbGV0b25EYXRhIiwiYW5pbWF0aW9uTmFtZSIsImlzUm90YXRpb24iLCJNaW4iLCJNYXgiLCJDYW5ub25HZXRFZGRlY3QiLCJDYW5ub25DaGFuZ2VFZmZlY3QiLCJDYW5ub25Hb3RFZGRlY3QiLCJMb29wVGltZSIsIklzSGF2ZVplcm8iLCJTcGVlZCIsIlBheUVkUmVtb3ZlIiwiY2hhbmdlQ2Fubm9uRWZmZWN0Iiwicm90YXRlQnkiLCJpbml0RWZmZWN0IiwiTW92ZVRpbWUiLCJhY3QiLCJHZXQiLCJNb3ZlT3ZlciIsIm1vdmVUbyIsImNhbm5vblR5cGVTYyIsIlJlc3RvcmUiLCJpc0luRnJlZXplIiwic2hvd1BhbmVsIiwiekluZGV4IiwibG9ja0xhYiIsImltZ19vZmZzdW9kaW5nIiwidXNlTG9ja1NraWxsIiwicm9vbVNraWxsTG9ja0RhdGEiLCJyb29tU2tpbGxBdXRvRGF0YSIsImxhc3RMb2NrRmlzaElEIiwidXNlQXV0b1NraWxsIiwibGVhdmVSb29tVW5Mb2NrIiwicm9vbURhdGEiLCJhdXRvTGFiIiwiaW1nX29mZnppZG9uZyIsImlzQ2xvc2UiLCJ1aV91cEljb24iLCJ1aV9sZWZ0SWNvbiIsImlzVG91cmlzdCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInNob3dTdXNwaWNpb3VzIiwiQXdhcmRUeXBlIiwiUlVZSSIsImluaXRUdXJudGFibGVWaWV3Iiwic3RhcnRSdW5Db3JudWNvcGlhIiwiRWZmZWN0TWF4UnVuVGltZSIsIklzRXhpdDQiLCJJc0V4aXQzIiwiU2tpbGxBdXRvIiwiZXhpdFJvb20iLCJJc0V4aXQiLCJjdXJyZW50VWlkIiwiQWxlcnRUeXBlIiwiTG9zQ2FubmFuIiwiQm9zc0NsZWFyU29jcmUiLCJOZXRPZmYiLCJmaXNoUG9zIiwiY29pbkNvbnRhaW5lciIsInVpX2NvaW5FZmZlY3RQb3MiLCJwcmUiLCJ0YXJnZXRQb3NpdGlvbiIsImVmZmVjdFBvc2l0aW9uIiwidWlfQ29pbkVmZmVjdCIsImlzUmVtb3ZlU2VsZiIsInBsYXlOYW1lIiwibGFiX251bWJlciIsImZvcm1hdE1vbmV5IiwicmV3YXJkR29sZCIsImVmZmVjdENvaW4iLCJNYXhDb2luIiwiUmFuZG9tb2ZmU2V4IiwiUmFuZG9tTWluIiwiUmFuZG9tT2Zmc2V4WCIsIlJhbmRvbU9mZnNleFkiLCJSYW5kb21NaW5ZIiwiU3RhcnROYW1lIiwiZW5kTmFtZSIsInBseVRpbWUiLCJpc0hhdmVaZXJvIiwic3BlZWQiLCJwbHllZERlc3Ryb3kiLCJpc1JhbmRvbVBseSIsIk9uZURlbGF5VGltZSIsIlR3b0RlbGF5VGltZSIsIlNjYWxlVG9UaW1lIiwiQmV6aWVyVG9UaW1lIiwiU2NhbGVUb0FyZyIsIk1vdmVUb1RpbWUiLCJFbmRPcGFjaXR5IiwiR29sZCIsIlNpbHZlciIsInVwUG9zIiwiYm91bmNlQWN0MSIsInNwYXduIiwiYm91bmNlQWN0MiIsImJlemllclBvaW50Iiwic2NhbGVUbyIsImJlemllclRvIiwiZWZmZWN0Um90YXRlTGV2ZWwiLCJFZmZlY3RSb3RhdGVMZXZlbCIsIk9uZUxldmVsIiwicmVzR3JvdXBJZCIsImZpc2hQb29sRGF0YSIsImZpc2hUeXBlSWQiLCJqc29uX2Zpc2hUYWJsZSIsImVmZmVjdFJvdGF0ZSIsImtpbGxUeXBlIiwiQm9tYiIsIlRvd0xldmVsIiwiVGhyZWVMZXZlbCIsIkZvdXJMZXZlbCIsImZseUdvbGRFZmZlY3QiLCJmbHlSb3RhdGVFZmZlY3QiLCJzdGFydFNob3dQb3MiLCJmbHlTZWF0TnVtIiwiZWZmZWN0Q29udGFpbmVyIiwibW92ZVRvUG9zIiwic3BpbmVfZWZmZWN0Iiwic3BpbmVDYW50YWluZXIiLCJiZyIsIkJvc3NMYXZhQmFzYWx0IiwibGFiIiwiUmVwZWF0VGltZXMiLCJTdWJUaW1lcyIsImNlaWwiLCJjdXJyZW50Q29pbiIsInNjaGVkdWxlIiwiaXNEZXN0cm95IiwiX2NvbXBvbmVudHMiLCJjdXJyU3RhcnROdW0iLCJpbmRleE9mIiwidG9GaXhlZCIsInNwckYiLCJnZXRTcHJpdGVGcmFtZSIsInNjYWxlIiwiZ2V0T3JpZ2luYWxTaXplIiwiVHdvU2NhbGUiLCJUaHJlZVNjYWxlIiwiRm91clNjYWxlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJvbGRTY2FsZSIsIkNlbnRvbnQiLCJIYWxmU2NhbGUiLCJwb3NOb2RlTmFtZSIsIkJhc2V6SW5kZXgiLCJsYXN0ekluZGV4IiwiY2FsbEJhbGsiLCJFZmZTY2FsZVRvQXJnIiwiRWZmU2NhbGVUb1RpbWUiLCJFZmZEZWxheVRpbWUiLCJFZmZlY3ROdW0iLCJFZmZlY3RQcmUiLCJmb3VyRWZmZWN0Iiwib3RoZXJFZmZlY3QiLCJDb2luTGFiT2Zmc2V4WSIsImNvaW5sYWIiLCJtb3ZlVG9BY3QiLCJsYWJfY29pbk1hc2siLCJiYXNlX2xhYk5vZGUiLCJsYWJOb2RlIiwib2xkeCIsIm9sZHkiLCJNb3ZlT2Zmc2V4IiwiTW92ZU9mZnNleDIiLCJlbmRQb3MiLCJlbmRQb3MyIiwiYW5jaG9yWCIsIm9sZFBvcyIsImN1cnJSZXdhcmRHb2xkIiwic3RhcnRIaWRlIiwic2V0UG9zaXRpb24iLCJHb1RpbWUiLCJlbmRUaW1lIiwiRGVsYXlTdGF0ZVRpbWUiLCJTY2FsZVRvVGltZTIiLCJIaWRlIiwiRmFkZVRvIiwibW92ZUJ5IiwiY2hlY2tHb2xkIiwidG90YWwiLCJpc0Rpc3Bvc2UiLCJjdXJyQ29pbiIsInNwaW5lYyIsIm9sZENvaW4iLCJzdGFydFJ1biIsInRvdGFsUmV3YXJkIiwicmVtb3ZlQ2hpbGQiLCJOb3RPcGFjaXR5IiwiTm90U2NhbGUiLCJRU2NhbGUiLCJOb3JtYWxTY2FsZSIsIkZhZGVUaW1lIiwiU2NhbFRUaW1lIiwiU2NhbGUiLCJpc1JvIiwiRnJlcXVlbmN5IiwiZnJlcXVlbmN5IiwiaXNvZmZOZXQiLCJsYWJOYW1lIiwicnVuU3BlY2lhbEJ1bGxldFN0YXRpc3RpY3MiLCJkdCIsInNwbGl0IiwiRGVheVRpbWUiLCJsYXN0Q2FublR5cGUiLCJpc0Rpc1NwZWNpYWwiLCJpc0xldmVsIiwic3BlY2lhbEJ1bGxldFN0YXRpc3RpY3NDbGVhciIsInVpX2NvaW5FZmZlY3RDb250YWluZXIiLCJsYXN0Y3VyckNvaW4iLCJGYWRlVG9BcmciLCJ0eXBlTmFtZSIsInBvc1ByZU5hbWUiLCJub2RlTmFtZSIsInBvc05hbWUiLCJzdGFydFNob3dTcGFjaWwiLCJmbHlHb2xkRWZmZWN0Rm9yU3BhY2lsIiwiTXVsdGlwbGUiLCJlbmRHb2xkVGltZSIsIkhpZGVPcGFjaXR5IiwiYXJydmFsQ29pbiIsIm9mZnNldCIsInNob3dHb2RPZldlYWx0aCIsInB1c2giLCJ1aV90aXAiLCJ0aXBOYW1lIiwidGlwIiwibGVuZ3RoIiwiaWQiLCJ0ZXh0Iiwic2NhbGVYIiwidXBkYXRlIiwiU2hvd01heFRpbWUiLCJNYXhDbGlja0Zpc2hQb29sVGltZSIsIkNoYW5nZVNlY29uZCIsImV4aXRUaW1lTXNnIiwiZmxvb3IiLCJjdXJXYWl0VGltZSIsInNob3dUaW1lTXNnIiwiSGF2ZVNwZWNpYWxGaXNoIiwiVG9TZWNvbmQiLCJUaHJlZUhpZGVUaW1lIiwiU2hvd1RpbWUiLCJzcGVjaWFsRmlzaExpc3RCb3JuTGVuIiwic3BlY2lhbEZpc2hMaXN0Qm9ybiIsIndlbGxCb3JuVGltZSIsInNob3dUaW1lIiwiRm9ybWF0IiwiQm9zc0dvZE9mV2VhbHRoIiwiaXNTZXRUaW1lIiwic2V0dGluZ0FjdGl2ZVRpbWUiLCJCb3NzU1lMVyIsImljb24iLCJmaXNoRGF0YTEiLCJmaXNoRGF0YTIiLCJmaXNoRGF0YSIsIlNwZWNpYVJlc1ByZSIsImlzRmlzaFRpZGVSdW5pbmciLCJpc1J1biIsIklzSGF2ZSIsIldpZGdldCIsInVwZGF0ZUFsaWdubWVudCIsImJldCIsInJlcGxhY2UiLCJkZXNjX2xhYiIsIm9sZFgiLCJQbGF5QkdNVGltZSIsImZpc2hCZ1NvdW5kIiwiQm9zc1NZTFdCZ011c2ljIiwiQm9zc0xhdmFCYXNhbHRCZ011c2ljIiwiUG9zaXRpdmVEaXJlY3Rpb24iLCJPcHBvc2l0ZURpcmVjdGlvbiIsIk1heExpZ2h0IiwiTWluTGlnaHQiLCJzdWJEIiwibGl2ZVRpbWUiLCJzZXJ2ZXJUaW1lIiwiY3JlYXRlVGltZSIsIk5vdEJvcm4iLCJhYnMiLCJpc05lZWRTZXQxODBBbmdsZSIsInVpX3N1cmZDYW50YWluZXIiLCJiZ0luZGV4IiwiT3V0V2luU2l6ZU9mZmNlWCIsIk91dFdpblNpemVYIiwidWlfZmlzaFRpZGVUaXRsZSIsIkhpZE9wYWNpdHkiLCJPbkRlc3Ryb3kiLCJ1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzIiwiT25DbGlja0J1dHRvbiIsImV2ZW50IiwiYnV0dG9uTmFtZSIsInRhcmdldCIsImJ1dHRvbk5vZGUiLCJjdXJDbGlja1N0YXRlIiwiYWxsQ3VyVGltZW91dCIsInNldFRpbWVvdXQiLCJhdWRpbyIsImNsb3NlQ3VyRWZmZWN0IiwicGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0EsSUFBSUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFuQjs7QUFFQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsaUJBQWlCLEVBQUU7QUFDZixpQkFBUyxJQURNO0FBRWZDLE1BQUFBLFdBQVcsRUFBRSxtQkFGRTtBQUdmQyxNQUFBQSxPQUFPLEVBQUUsYUFITTtBQUlmQyxNQUFBQSxJQUFJLEVBQUNDLEVBQUUsQ0FBQ0M7QUFKTyxLQUZYO0FBUVI7QUFDQUMsSUFBQUEscUJBQXFCLEVBQUU7QUFDbkIsaUJBQVMsSUFEVTtBQUVuQkwsTUFBQUEsV0FBVyxFQUFFLHVCQUZNO0FBR25CQyxNQUFBQSxPQUFPLEVBQUUsYUFIVTtBQUluQkMsTUFBQUEsSUFBSSxFQUFDQyxFQUFFLENBQUNDO0FBSlcsS0FUZjtBQWVSO0FBQ0FFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUk4sTUFBQUEsV0FBVyxFQUFFLFlBRkw7QUFHUkMsTUFBQUEsT0FBTyxFQUFFLFVBSEQ7QUFJUkMsTUFBQUEsSUFBSSxFQUFDQyxFQUFFLENBQUNDO0FBSkEsS0FoQko7QUFzQlI7QUFDQUcsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDZCxpQkFBUyxJQURLO0FBRWRQLE1BQUFBLFdBQVcsRUFBRSxpQkFGQztBQUdkQyxNQUFB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ICDmjZXpsbzvvJrmoYzlrZBVSSDoj5zljZXjgIHlhYXlgLzjgIHngq7lj7BcclxuICogKiovXHJcbmxldCBDT05TVCA9IHJlcXVpcmUoXCJuZmlzaENvbnN0XCIpO1xyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8v6YeR5biB6ZO25biB5ryC56e75Yqo55S7IOWbvumbhlxyXG4gICAgICAgIG1vbmV5RWZmZWN0X0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIm1vbmV5RWZmZWN0X0F0bGFzXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi6YeR5biB6ZO25biB5ryC56e75Yqo55S7IOWbvumbhlwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy/nibnmrorngq7lj7Dlh7rnlJ/liqjnlLsg5Zu+6ZuGXHJcbiAgICAgICAgbGFzZXJCb3JuRWZmZWN0X0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcImxhc2VyQm9ybkVmZmVjdF9BdGxhc1wiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIueJueauiueCruWPsOWHuueUn+WKqOeUuyDlm77pm4ZcIixcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v6bG8SWNvbiDlm77pm4ZcclxuICAgICAgICBpY29uX0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcImljb25fQXRsYXNcIixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLpsbxJY29uIOWbvumbhlwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8yIDMgNCDmoaPpsbwg5o2V6I63IEljb24g5Zu+6ZuGXHJcbiAgICAgICAgaWNvbl8yXzNfNF9BdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJnZXRfcmF3YXJfQXRsYXNcIixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCIyIDMgNCDmoaPpsbwg5o2V6I63IEljb24g5Zu+6ZuGXCIsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+eJueauiumxvFRpcCBJY29uIOWbvumbhlxyXG4gICAgICAgIHNwZWNpYUljb25fQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwic3BlY2lhSWNvbl9BdGxhc1wiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIueJueauiumxvFRpcCBJY29uIOWbvumbhlwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIueJueaViOWbvumbhlwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIueIhueCuO+8jOeBsOeDrO+8jOmXqueUtVwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWxsdXN0cmF0ZWRCb29rOiBjYy5QcmVmYWIsIC8v5Zu+6Ym0XHJcbiAgICAgICAgcmVjb3JkX3ByZTogY2MuUHJlZmFiLCAgICAgIC8v6K6w5b2V6K+m5oOFXHJcbiAgICAgICAgc2V0dGluZ19wcmU6IGNjLlByZWZhYiwgICAgIC8v6K6+572u55WM6Z2iXHJcblxyXG4gICAgICAgIHR1cm50YWJsZTogY2MuUHJlZmFiLCAgICAgICAvL+iHquW3seeahCDnjonlpoLmhI/ovaznm5hcclxuICAgICAgICBjb3JudWNvcGlhOiBjYy5QcmVmYWIsICAgICAgLy/oh6rlt7HnmoQg6IGa5a6d55uGXHJcblxyXG4gICAgICAgIGJ1bGxldEVmZmVjdDogY2MuUHJlZmFiLCAgICAvL+eCruWPsOWtkOW8ueWwhOWHuueCruWPo+aXtuWKqOeUu+eahCDmkq3mlL7lmahcclxuICAgICAgICBmaXNoVGlwOiBjYy5QcmVmYWIsICAgICAgICAgLy/psbzlhpLms6FcclxuXHJcbiAgICAgICAgY2hhbmdlQ2Fubm9uRWZmZWN0TGlzdDpbc3AuU2tlbGV0b25EYXRhXSwvLzTkuKrnibnmrorngq7lj7Dlj5jouqvnibnmlYhcclxuICAgICAgICBiYXR0ZXJ5TGlzdDpbc3AuU2tlbGV0b25EYXRhXSwvL+azqOaEj+S6hu+8ge+8gSAg5LiL5qCHMC0555qE54Ku5Y+wIOaYryDlr7nlupQgMS0xMOWPt+eCruWPsCDvvIzkuIvmoIcgMTAgLSAxMyDmmK/nibnmrorngq7lj7BcclxuXHJcbiAgICAgICAgLy91aeWuueWZqFxyXG4gICAgICAgIHVpX0FjdGlvbmFibGU6Y2MuTm9kZSxcclxuICAgICAgICBidWxsZXRUaXBzOmNjLk5vZGUsXHJcblxyXG4gICAgICAgIC8v5oqA6IO95oyJ6ZKuXHJcbiAgICAgICAgdWlfc2tpbGxBdXRvOmNjLk5vZGUsXHJcbiAgICAgICAgdWlfc2tpbGxMb2NrOmNjLk5vZGUsXHJcblxyXG4gICAgICAgIC8v54m55q6K6bG85Y2z5bCG5Ye655SfIHVpXHJcbiAgICAgICAgYm9zc0NvbmVJblRpcDpjYy5Ob2RlLFxyXG4gICAgICAgIGJvc3NCb3JuVGlwOmNjLk5vZGUsXHJcbiAgICAgICAgYm9zc05vcm1hbFBvczpjYy5Ob2RlLFxyXG5cclxuICAgICAgICAvL+i0ouelnuOAgeeGlOWyqeeOhOatpiDlhaXlnLrmlYjmnpxcclxuICAgICAgICBzcGluZV9jc3JjZGg6Y2MuTm9kZSxcclxuICAgICAgICBlZmZlY3RfY3NyY2RoOmNjLk5vZGUsXHJcbiAgICAgICAgc3BpbmVfcnl4d3JjZGg6Y2MuTm9kZSxcclxuICAgICAgICBlZmZlY3Rfcnl4d3JjZGg6Y2MuTm9kZSxcclxuXHJcbiAgICAgICAgLy/oj5zljZVcclxuICAgICAgICB1aV9tZW51OmNjLk5vZGUsXHJcbiAgICAgICAgdWlfbWVudUJ0bjpjYy5Ob2RlLFxyXG5cclxuICAgICAgICAvL+eykuWtkFxyXG4gICAgICAgIGNoaWNrX2FjdDogY2MuTm9kZSxcclxuICAgICAgICBjaGlja19tZWlodWE6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIC8v5by55Ye656qX5Y+jXHJcbiAgICAgICAgYWxlcnRfY29udGFpbmVyOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRleHRfZXhpdEJvc3NDbGVhclNvY3JlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRleHRfZXhpdExvc0Nhbm5hbjogY2MuTm9kZSxcclxuICAgICAgICB0ZXh0X25ldE9mZjogY2MuTm9kZSxcclxuICAgICAgICBidG5fcXVpdDogY2MuTm9kZSxcclxuICAgICAgICBidG5fcXVlZGluZzogY2MuTm9kZSxcclxuICAgICAgICBidG5fcXVlZGluZ19uZXQ6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0U21lYXIgICAgICAgICA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib3NzVGlwTW92ZVRvVGltZSAgPSAwLjVcclxuICAgICAgICB0aGlzLm5vZGUuaXNJbml0ICAgICAgICA9IDE7XHJcbiAgICAgICAgdGhpcy5idWxsZXRUaXBUaW1lICAgICAgPSAwO1xyXG4gICAgICAgIHRoaXMuY2xpY2tGaXNoUG9vbEV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNsaWNrRmlzaFBvb2xUaW1lICA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0QW5nbGUgICAgICAgICAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9naWMgICAgICAgICAgICAgID0gcmVxdWlyZShcIm5maXNobG9naWNcIikuZ2V0SW5zdGFuY2UoKTsvL+aVsOaNruS4reW/g1xyXG4gICAgICAgIHRoaXMuZmlyZVRpbWUgICAgICAgICAgID0gMDsgICAgLy/lvIDngavorqHml7blmahcclxuICAgICAgICB0aGlzLmZpcmVUaW1lRnJlcXVlbmN5ICA9IDAuMTc7IC8v5byA54Gr6aKR546HXHJcbiAgICAgICAgdGhpcy5pc0ZpcmUgICAgICAgICAgICAgPSB0cnVlOyAvL+aYr+WQpuWPr+S7peW8gOeBq1xyXG4gICAgICAgIHRoaXMubG9naWMuY2Fubm9uTGV2ZWwgID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZ3VuTGV2ZWxfXCIrZ2xHYW1lLnVzZXIudXNlcklEKSA/IE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJndW5MZXZlbF9cIitnbEdhbWUudXNlci51c2VySUQpKSA6IDE7XHJcbiAgICAgICAgdGhpcy5pc0V4aXQgICAgICAgICAgICAgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudHVybnRhYmxlVmlldyAgICAgID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvcm51Y29waWFWaWV3ICAgICA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ydW5TcGVjaWFsMCAgICAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1blNwZWNpYWwxICAgICAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucnVuU3BlY2lhbDIgICAgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ydW5TcGVjaWFsMyAgICAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0ICA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9naWMuZ2FtZVpvb21YICAgID0gY2Mud2luU2l6ZS53aWR0aC9DT05TVC5EZXNpZ25TaXplLndpZHRoO1xyXG4gICAgICAgIHRoaXMubG9naWMuZ2FtZVpvb21ZICAgID0gY2Mud2luU2l6ZS5oZWlnaHQvQ09OU1QuRGVzaWduU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0U3BlY2lhTm9kZSgpO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAvL+WIneWni+WMlueVjOmdoumakOiXj3Vp77yM562J5b6F5pWw5o2uXHJcbiAgICAgICAgY29uc3QgSW52aXNpYmxlID0gMDtcclxuICAgICAgICBjb25zdCBNYXhVc2VyTnVtID0gNDtcclxuXHJcbiAgICAgICAgY29uc3QgTm9ybWFsID0gMjU1O1xyXG4gICAgICAgIGNvbnN0IEZhZGVUb1RpbWUgPSAxLjM7XHJcbiAgICAgICAgY29uc3QgRGVsYXlUaW1lID0gMC42O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwO2k8TWF4VXNlck51bTtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9iZ1wiK2kpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3dlcl9iZ1wiK2kpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdWlfZ3VuICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK2kpO1xyXG4gICAgICAgICAgICBsZXQgdWlfcG9zICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX3Bvc1wiK2kpO1xyXG4gICAgICAgICAgICBsZXQgdWlfd2FpdCA9IHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX3dhaXRcIik7XHJcbiAgICAgICAgICAgIHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImJhdHRlcnlNYXNrXCIpLmFkZENvbXBvbmVudChcIm5maXNoX2xhc2VyaGl0Tm9kZVwiKTtcclxuICAgICAgICAgICAgdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeU1hc2tcIikuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImJhdHRlcnlNYXNrXCIpLm9wYWNpdHkgPSBJbnZpc2libGU7XHJcbiAgICAgICAgICAgIHVpX2d1bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdWlfd2FpdC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB1aV93YWl0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmZhZGVUbyhGYWRlVG9UaW1lLEludmlzaWJsZSksY2MuZGVsYXlUaW1lKERlbGF5VGltZSksY2MuZmFkZVRvKEZhZGVUb1RpbWUsTm9ybWFsKSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcU5ld0Zpc2hDb25maWcnLCB7IGdhbWVpZDogNDkgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYobXNnLnJlc3VsdCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5maXNoTXV0aXBsZUNmZyA9IG1zZy5yZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXNoX2Jvb2tzLS0tLS0tLS0tLS0tLS0tLVwiLCBtc2cpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJbnibnmrorlpZblirHvvIjnjonlpoLmhI/jgIHogZrlrp3nm4bvvInmnInlhbPnmoRcclxuICAgIGluaXRTcGVjaWFOb2RlKCl7XHJcbiAgICAgICAgbGV0IHNwZWNpYWxfQ2FudGFpbmVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BlY2lhbF9DYW50YWluZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMudHVybnRhYmxlVmlldyA9IGNjLmluc3RhbnRpYXRlKHRoaXMudHVybnRhYmxlKTtcclxuICAgICAgICBzcGVjaWFsX0NhbnRhaW5lci5hZGRDaGlsZCh0aGlzLnR1cm50YWJsZVZpZXcpO1xyXG4gICAgICAgIHRoaXMudHVybnRhYmxlVmlldy5vcGFjaXR5ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5jb3JudWNvcGlhVmlldyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29ybnVjb3BpYSk7XHJcbiAgICAgICAgc3BlY2lhbF9DYW50YWluZXIuYWRkQ2hpbGQodGhpcy5jb3JudWNvcGlhVmlldyk7XHJcbiAgICAgICAgdGhpcy5jb3JudWNvcGlhVmlldy5vcGFjaXR5ID0gMDtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMlueVjOmdoumakOiXj3Vp77yM562J5b6F5pWw5o2uXHJcbiAgICBoaWRlKCl7XHJcbiAgICAgICAgY29uc3QgTm9ybWFsID0gMjU1O1xyXG4gICAgICAgIGxldCBzcGluZV9jc3JjZGggPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9lZmZlY3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9jc3JjZGhcIik7XHJcbiAgICAgICAgbGV0IHNwaW5lX3J5eHdyY2RoID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BpbmVfZWZmZWN0XCIpLmdldENoaWxkQnlOYW1lKFwic3BpbmVfcnl4d3JjZGhcIik7XHJcbiAgICAgICAgc3BpbmVfY3NyY2RoLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNwaW5lX2NzcmNkaC5vcGFjaXR5ID0gTm9ybWFsO1xyXG4gICAgICAgIHNwaW5lX3J5eHdyY2RoLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNwaW5lX3J5eHdyY2RoLm9wYWNpdHkgPSBOb3JtYWw7XHJcbiAgICAgICAgdGhpcy51aV9tZW51LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX0V4aXRUaXBcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfZmlyZUVmZmVjdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBNYXhVc2VyTnVtID0gNDtcclxuICAgICAgICBjb25zdCBOb3JtYWxPcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwO2k8TWF4VXNlck51bTtpKyspe1xyXG4gICAgICAgICAgICBpZighdGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9iZ1wiK2kpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidG93ZXJfYmdcIitpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCB1aV9ndW4gPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5cIitpKTtcclxuICAgICAgICAgICAgICAgIHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImJhdHRlcnlNYXNrXCIpLm9wYWNpdHkgPSBOb3JtYWxPcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeU1hc2tcIikuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1aV9ndW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ms6jlhoznm5HlkKxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY29tZUluUGxheWVyLHRoaXMuY29tZUluUGxheWVySGFuZGxlcix0aGlzKTsgICAgICAgICAgICAvL+eUqOaIt+i/m+WFpVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmxlYXZlUm9vbVBsYXllcix0aGlzLmxlYXZlUm9vbVBsYXllckhhbmRsZXIsdGhpcyk7ICAgICAgLy/nlKjmiLfnprvlvIBcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5jbGlja0Zpc2hQb29sLHRoaXMuY2xpY2tGaXNoUG9vbEhhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v54K55Ye76bG85rGg5a2QXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuaGlkZGVuTG9jYXRpb25UaXAsdGhpcy5oaWRkZW5Mb2NhdGlvblRpcEhhbmRsZXIsdGhpcyk7ICAvL+makOiXj+S9jee9ruaPkOekulxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnBsYXlGaXJpbmdFZmZlY3QsdGhpcy5wbGF5RmlyaW5nRWZmZWN0SGFuZGxlcix0aGlzKTsgICAgLy/mkq3mlL7lvIDngq7mlYjmnpxcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC51cGRhdGVTaG9vdEdvbGQsdGhpcy51cGRhdGVTaG9vdEdvbGRIYW5kbGVyLHRoaXMpOyAgICAgIC8v5pu05paw55So5oi35bCE5Ye75L2Z6aKdXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlR3VuUmF0ZSx0aGlzLnVwZGF0ZUd1blJhdGVkSGFuZGxlcix0aGlzKTsgICAgICAgICAvL+abtOaWsOeCruWPsOWAjeeOh1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnVwZGF0ZUd1blJlY29pbCx0aGlzLnVwZGF0ZUd1blJlY29pbEhhbmRsZXIsdGhpcyk7ICAgICAgLy/kuLrlhbbku5bnjqnlrrborr7nva7lkI7lnZDliptcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5vbkZyZWV6ZVNob3dVSSx0aGlzLm9uRnJlZXplU2hvd1VJSGFuZGxlcix0aGlzKTsgICAgICAgIC8v5Yaw5Ya75pi+56S6VUlcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5maXJlU2V0dGluZ1JlY29pbCx0aGlzLmZpcmVTZXR0aW5nUmVjb2lsSGFuZGxlcix0aGlzKTsgIC8v5Li66Ieq5bex6K6+572u5ZCO5Z2Q5YqbXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQub25Db2luQ2hhbmdlZCx0aGlzLm9uQ29pbkNoYW5nZWRIYW5kbGVyLHRoaXMpOyAgICAgICAgICAvL+WFheWAvOWIsOi0pui0ouelnueIt+WKqOeUu1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnBsYXlDb2luRWZmZWN0LHRoaXMucGxheUNvaW5FZmZlY3RIYW5kbGVyLHRoaXMpOyAgICAgICAgLy/mrbvpsbzpo5jph5HluIFcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5vblN1cmZTdGFydCx0aGlzLm9uU3VyZlN0YXJ0SGFuZGxlcix0aGlzKTsgICAgICAgICAgICAgIC8v5rW35rWq6bG8576kIC0g5rW35rWqVUlcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5zaG93RmlzaFRpZGVUaXRsZSx0aGlzLnNob3dGaXNoVGlkZVRpdGxlSGFuZGxlcix0aGlzKTsgIC8v5pi+56S65rWq5r2u5p2l5Li0XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQubXlVcGRhdGVNb25leSx0aGlzLm15VXBkYXRlTW9uZXlIYW5kbGVyLHRoaXMpOyAgICAgICAgICAvL+abtOaWsOiHquW3semSsVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmNoZWNrQXV0b0FuZExvY2ssdGhpcy5jaGVja0F1dG9BbmRMb2NrSGFuZGxlcix0aGlzKTsgICAgLy/mo4Dmn6XplIHlrprlkozoh6rliqjmjInpkq5cclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC51cFNwZWNpYWxHdW5Db2luLHRoaXMudXBTcGVjaWFsR3VuQ29pbkhhbmRsZXIsdGhpcyk7ICAgIC8v5pu05paw54m55q6K54Ku5Y+w5a2Q5by55pWw6YePXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuZ2V0U3BlY2lhbENhbm5vbix0aGlzLmdldFNwZWNpYWxDYW5ub25IYW5kbGVyLHRoaXMpOyAgICAvL+iOt+WPluWIsOS4gOS4queJueauiueCruWPsFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnJlc3RvcmVDYW5ub24sdGhpcy5yZXN0b3JlQ2Fubm9uSGFuZGxlcix0aGlzKTsgICAgICAgICAgLy/nibnmrorlrZDlvLnnlKjlrozvvIzmgaLlpI3ngq7lj7BcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5ib3NzQ29tZWluLHRoaXMuYm9zc0NvbWVpbkhhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgIC8vYm9zc+WHuueOsFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnNwcmlua2xlUmVkQmFnLHRoaXMuc3ByaW5rbGVSZWRCYWdIYW5kbGVyLHRoaXMpOyAgICAgICAgLy/otKLnpZ7lh7rph5HluIFcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5zaG93VHVybnRhYmxlLHRoaXMuc2hvd1R1cm50YWJsZUhhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v546J5aaC5oSPIOWHuui9rOebmCDogZrlrp3nm4Yg5Ye65ouJ6Zy4XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQub3RoZXJQbGF5ZXJTaG93U3BlY2lhbEF3YXJkLHRoaXMub1BTU0FIYW5kbGVyLHRoaXMpOyAgICAvL+WFtuS7luS6uueahCDlpoLmhI8g6IGa5a6d6bmPIOWxleekulxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LnNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzLHRoaXMuc3BlY2lhbEJ1bGxldFN0YXRpc3RpY3MsdGhpcyk7ICAgIC8v54m55q6K5a2Q5by557uf6K6hXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0LHRoaXMuY2hlY2tTcGVjaWFsQnVsbGV0SGFuZGxlcix0aGlzKTsgICAgICAgLy/nibnmrorlrZDlvLnnu5/orqEgLSDmo4Dmn6XlmahcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5jaGVja1JvdGF0aW9uLHRoaXMuY2hlY2tSb3RhdGlvbkhhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v6K6+572u5peL6L2sXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuaGlkZUJvc3NDb25pblVJLHRoaXMuaGlkZUJvc3NDb25pblVJSGFuZGxlcix0aGlzKTsgICAgICAvL+makOiXj2Jvc3PmnaXkuoZcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC51cGRhdGVVc2VyU3RhdHVzLHRoaXMudXBkYXRlVXNlclN0YXR1c0hhbmRsZXIsdGhpcyk7ICAgIC8v6ZqQ6JePYm9zc+adpeS6hlxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmFkZEdvbGRFZmZlY3QsdGhpcy5hZGRHb2xkRWZmZWN0SGFuZGxlcix0aGlzKTsgICAgICAgICAgLy/po5jliIZcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5zaG93QWxlcnQsdGhpcy5zaG93QWxlcnRIYW5kbGVyLHRoaXMpOyAgICAgICAgICAgICAgICAgIC8vYWxlcnTlvLnlh7rmoYZcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5hY2N1bXVsYXRlLHRoaXMuYWNjdW11bGF0ZUhhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgIC8v6JOE5Yqb5pKt5pS+XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY2xlYXJib3NzQ29tZWluLHRoaXMuY2xlYXJib3NzQ29tZWluSGFuZGxlcix0aGlzKTsgICAgICAvL+a4heeQhmJvc3Pov5vlhaVcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5jbGVhclNwZWNpYWxCdWxsZXRQb29sLHRoaXMuY2xlYXJTcGVjaWFsSGFuZGxlcix0aGlzKTsgIC8v5riF55CG54m55q6K5a2Q5by5XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuYm9zc0dvZE9mV2VhbHRoQ29pbix0aGlzLmJvc3NHb2RPZldlYWx0aENvaW5IYW5kbGVyLHRoaXMpOyAgLy/otKLnpZ7ov5vlhaVcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5ib3NzTGF2YUJhc2FsdENvbWluLHRoaXMuYm9zc0xhdmFCYXNhbHRDb21pbkhhbmRsZXIsdGhpcyk7ICAvL+eGlOWyqeeOhOatpui/m+WFpVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKENPTlNULmNsaWVudEV2ZW50LmNoZWNrU3BlY2lhbENhbm5vbix0aGlzLmNoZWNrU3BlY2lhbENhbm5vbkhhbmRsZXIsdGhpcyk7ICAgLy/mo4Dmn6Xnibnmrorngq7lj7BcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihDT05TVC5jbGllbnRFdmVudC5mb2xsb3dGaXNoVGlwLHRoaXMuZm9sbG93RmlzaFRpcEhhbmRsZXIsdGhpcyk7ICAgICAgICAgIC8v5pi+56S66bG85rCU5rOhXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQuY2xlYXJGb2xsb3dGaXNoVGlwLHRoaXMuY2xlYXJGb2xsb3dGaXNoVGlwSGFuZGxlcix0aGlzKTsgICAgICAgICAgLy/mmL7npLrpsbzmsJTms6FcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vbkZpcmVIb29IYW5kbGVyLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgIC8v5byA5aeLIOeCueWHu+Wxj+W5lSDlvIDlp4sg5Y+R5bCEXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uRmlyZUhvb0hhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAvL+e7k+adnyDngrnlh7vlsY/luZUg5YGc5q2iIOWPkeWwhFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vbkZpcmVIb29IYW5kbGVyLHRoaXMpOyAgICAgICAgICAgICAgICAgICAgLy/lj5bmtogg54K55Ye75bGP5bmVIOWBnOatoiDlj5HlsIRcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uTW92ZUhhbmRsZXIsdGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAgIC8v56e75YqoIOeCueWHu+i/mOenu+WKqO+8jOiHquWKqOWwhOWHu+eahOaXtuWAmeabtOaWsOinkuW6plxyXG4gICAgfSxcclxuICAgIC8v5Y+N5rOo5YaM55uR5ZCsXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmNvbWVJblBsYXllcix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQubGVhdmVSb29tUGxheWVyLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5jbGlja0Zpc2hQb29sLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5oaWRkZW5Mb2NhdGlvblRpcCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQucGxheUZpcmluZ0VmZmVjdCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlU2hvb3RHb2xkLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC51cGRhdGVHdW5SYXRlLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC51cGRhdGVHdW5SZWNvaWwsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50Lm9uRnJlZXplU2hvd1VJLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5maXJlU2V0dGluZ1JlY29pbCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQub25Db2luQ2hhbmdlZCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQucGxheUNvaW5FZmZlY3QsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50Lm9uU3VyZlN0YXJ0LHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5zaG93RmlzaFRpZGVUaXRsZSx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQubXlVcGRhdGVNb25leSx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tBdXRvQW5kTG9jayx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuZ2V0U3BlY2lhbENhbm5vbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQudXBTcGVjaWFsR3VuQ29pbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQucmVzdG9yZUNhbm5vbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0NvbWVpbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuc3ByaW5rbGVSZWRCYWcsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LnNob3dUdXJudGFibGUsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50Lm90aGVyUGxheWVyU2hvd1NwZWNpYWxBd2FyZCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuc3BlY2lhbEJ1bGxldFN0YXRpc3RpY3MsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmNoZWNrU3BlY2lhbEJ1bGxldCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tSb3RhdGlvbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuaGlkZUJvc3NDb25pblVJLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC51cGRhdGVVc2VyU3RhdHVzLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5hZGRHb2xkRWZmZWN0LHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5zaG93QWxlcnQsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmFjY3VtdWxhdGUsdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKENPTlNULmNsaWVudEV2ZW50LmNsZWFyYm9zc0NvbWVpbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuY2xlYXJTcGVjaWFsQnVsbGV0UG9vbCx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0dvZE9mV2VhbHRoQ29pbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0xhdmFCYXNhbHRDb21pbix0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQ2Fubm9uLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5mb2xsb3dGaXNoVGlwLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihDT05TVC5jbGllbnRFdmVudC5jbGVhckZvbGxvd0Zpc2hUaXAsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy/mo4Dmn6Xoh6rliqjmjInpkq5cclxuICAgIGNoZWNrQXV0b0FuZExvY2tIYW5kbGVyKCl7XHJcbiAgICAgICAgbGV0IHJvb21Mb2NrQXV0b0RhdGEgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKENPTlNULlNraWxsaXNMb2NrQXV0b0NoYW5nZSk7XHJcbiAgICAgICAgaWYocm9vbUxvY2tBdXRvRGF0YSAhPSBudWxsICYmIHJvb21Mb2NrQXV0b0RhdGFbdGhpcy5sb2dpYy5yb29tSWRdID09IFwib1wiKXtcclxuICAgICAgICAgICAgdGhpcy5vblNraWxsQXV0b0hhbmRsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb29tU2tpbGxEYXRhID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShDT05TVC5Ta2lsbExvY2spO1xyXG4gICAgICAgIGlmKHJvb21Ta2lsbERhdGEgIT0gbnVsbCAmJiByb29tU2tpbGxEYXRhW3RoaXMubG9naWMucm9vbUlkXSA9PSBcIm9cIil7XHJcbiAgICAgICAgICAgIHRoaXMub25Ta2lsbExvY2tIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6Ieq5Yqo5bCE5Ye755qE5pe25YCZ6I635Y+W6KeS5bqmXHJcbiAgICBvbk1vdmVIYW5kbGVyKGV2dCl7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc0F1dG8pdGhpcy5sYXN0QW5nbGUgPSB0aGlzLmdldEFuZ2xlKGV2dC5nZXRMb2NhdGlvbigpKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+Wxj+W5lSDlj5HlsIRcclxuICAgIG9uRmlyZUhvb0hhbmRsZXIoZXZ0KXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hDYW5jZWxTaG9vdCxldnQpO1xyXG4gICAgfSxcclxuICAgIC8v55So5oi36L+b5YWl77yM5pi+56S654Ku5Y+wXHJcbiAgICBjb21lSW5QbGF5ZXJIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgdGhpcy5pbml0UGxheWVyKHJlcyx0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvL+eUqOaIt+emu+W8gFxyXG4gICAgbGVhdmVSb29tUGxheWVySGFuZGxlcihyZXMpe1xyXG4gICAgICAgIHRoaXMuaW5pdFBsYXllcihyZXMsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8v5pu05paw55So5oi354q25oCBIHNlYXROdW0g5bqn5L2NIGlzT25MaW5lIOaYr+WQpuWcqOe6v1xyXG4gICAgdXBkYXRlVXNlclN0YXR1c0hhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgdWlfcG9zICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX3Bvc1wiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICBsZXQgdWlfb3RoZXIgICAgICA9IHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpO1xyXG4gICAgICAgIGxldCBuZXRTdCAgICAgICAgID0gdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJuZXRTdGF0dXNDb250YWluZXJcIik7XHJcbiAgICAgICAgbmV0U3QuYWN0aXZlICAgICAgPSByZXMudXNlclN0YXR1cyA9PSBDT05TVC5Vc2VyU3RhdHVzLk9mZkxpbmU7XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJbnlKjmiLdcclxuICAgIGluaXRQbGF5ZXIocGxheSxpc0luaXQpe1xyXG4gICAgICAgIGlmKCFwbGF5KXJldHVybjtcclxuICAgICAgICBsZXQgbXlpZCAgICAgICAgICA9IGdsR2FtZS51c2VyLnVzZXJJRDtcclxuICAgICAgICBsZXQgc2VhdE51bSAgICAgICA9IHBsYXkuc2VhdE51bTtcclxuICAgICAgICBsZXQgdWlfcG9zICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX3Bvc1wiK3NlYXROdW0pO1xyXG4gICAgICAgIGxldCB1aV9ndW4gICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIrc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IHRvd2VyX2JnICAgICAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3dlcl9iZ1wiK3NlYXROdW0pO1xyXG4gICAgICAgIGxldCB1aV9iZyAgICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfYmdcIitzZWF0TnVtKTtcclxuICAgICAgICBsZXQgdWlfdW5XYWl0ICAgICA9IHVpX2JnLmdldENoaWxkQnlOYW1lKFwidWlfdW5XYWl0XCIpO1xyXG4gICAgICAgIGxldCBsYWJfY29pbiAgICAgID0gdWlfdW5XYWl0LmdldENoaWxkQnlOYW1lKFwiY29pbkJnX2NhbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9jb2luXCIpO1xyXG5cclxuICAgICAgICBpZih1aV9wb3MgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiPj4g5Ye66ZSZ5LqGIFwiLHBsYXkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVpX290aGVyICAgICAgPSB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKTtcclxuICAgICAgICBsZXQgbmV0U3QgICAgICAgICA9IHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibmV0U3RhdHVzQ29udGFpbmVyXCIpO1xyXG4gICAgICAgIHVpX290aGVyLmFjdGl2ZSAgID0gaXNJbml0O1xyXG4gICAgICAgIG5ldFN0LmFjdGl2ZSAgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdWlfcG9zLmFjdGl2ZSAgICAgPSB0cnVlO1xyXG4gICAgICAgIHVpX2d1bi5hY3RpdmUgICAgID0gaXNJbml0O1xyXG4gICAgICAgIHRvd2VyX2JnLmFjdGl2ZSAgID0gaXNJbml0O1xyXG4gICAgICAgIGlmKGlzSW5pdCl7XHJcbiAgICAgICAgICAgIGxhYl9jb2luLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZ2xHYW1lLnVzZXIuR29sZFRlbXAocGxheS5nb2xkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfd2FpdFwiKS5hY3RpdmUgPSAhaXNJbml0O1xyXG4gICAgICAgIHVpX2JnLmFjdGl2ZSA9IGlzSW5pdDtcclxuICAgICAgICB1aV9iZy5nZXRDaGlsZEJ5TmFtZShcInVpX3VuV2FpdFwiKS5hY3RpdmUgPSBpc0luaXQ7XHJcbiAgICAgICAgdWlfYmcuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV91bldhaXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemlqaXBhb3RhaVwiKS5hY3RpdmUgPSBteWlkID09IHBsYXkudWlkO1xyXG4gICAgICAgIGlmIChteWlkICE9IHBsYXkudWlkKXtcclxuICAgICAgICAgICAgbGV0IHNwaW5lX3Jlc3RvcmVDYW5ub24gPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9yZXN0b3JlQ2Fubm9uXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShzcGluZV9yZXN0b3JlQ2Fubm9uLGZhbHNlLHRydWUsQ09OU1QuU3BpbmVOYW1lLk5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBsYXkudWlkICE9IHVuZGVmaW5lZCAmJiBteWlkID09IHBsYXkudWlkKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5pc0VudGVyUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuc2VhdE51bSA9IHNlYXROdW07XHJcbiAgICAgICAgICAgIGxldCB1aV9UaXAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9UaXBcIik7XHJcbiAgICAgICAgICAgIHVpX1RpcC5nZXRDaGlsZEJ5TmFtZShcInVpX1wiK3NlYXROdW0pLmFjdGl2ZSA9IGlzSW5pdDtcclxuICAgICAgICAgICAgbGV0IHNwaW5lTmFtZSA9IHBsYXkuc2VhdE51bSA9PSBDT05TVC5TZWF0LlJpZ2h0VG9wIHx8IHBsYXkuc2VhdE51bSA9PSBDT05TVC5TZWF0LkxlZnRUb3AgPyBDT05TVC5TcGluZU5hbWUuWW91SGVyZVRvcCA6IENPTlNULlNwaW5lTmFtZS5Zb3VIZXJlQnV0dG9tO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgICAgICBzcGluZU5hbWUgPSBwbGF5LnNlYXROdW0gPT0gQ09OU1QuU2VhdC5SaWdodFRvcCB8fCBwbGF5LnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wID8gQ09OU1QuU3BpbmVOYW1lLllvdUhlcmVCdXR0b20gOiBDT05TVC5TcGluZU5hbWUuWW91SGVyZVRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZSh1aV9UaXAuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9cIitzZWF0TnVtKSx0cnVlLGZhbHNlLHNwaW5lTmFtZSk7XHJcbiAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGxheS5jYW5ub25MZXZlbDtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5vZmZMaW5lTWlzc2lsZURhdGEgIT0gbnVsbCl7Ly/kurrnianov5vlhaXliJ3lp4vljJbmiL/pl7Tnu5PmnZ/lkI7nu6fnu63liJ3lp4vljJbmlq3nur/ph43ov57nmoTmlbDmja5cclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCI+IOS6uueJqei/m+WFpeWIneWni+WMluaIv+mXtOe7k+adn+WQjue7p+e7reWIneWni+WMluaWree6v+mHjei/nueahOaVsOaNriBcIilcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQub25TcGVjaWFsQnVsbGV0RXhwLEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpYy5vZmZMaW5lTWlzc2lsZURhdGEpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLm9mZkxpbmVNaXNzaWxlRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3VuUmVjb2lsSGFuZGxlcihwbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGxheS5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKXsvL+aZrumAmueCruWPsOagt+W8j1xyXG4gICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImltZ19wYW9iZWlrdWFuZzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5MdkJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdjJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7Ly/nibnmrorngq7lj7DmoLflvI9cclxuICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcGFvYmVpa3VhbmcxXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcInVpX2d1bkx2QmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzSW5pdCl7XHJcbiAgICAgICAgICAgIGxldCBiYXR0ZXJ5ID0gdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeVwiKTtcclxuICAgICAgICAgICAgbGV0IGJhdHRlcnlTa2VsZXRvbkRhdGE7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGxheS5jYW5ub25UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTGlnaHRuaW5nIDogICAvLyDpl6rnlLVcclxuICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLkxpZ2h0bmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIgOiAvLyDngo7niIZcclxuICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLlBhcnRpYWxCb21iXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MYXNlciA6ICAgICAgIC8vIOm+meaBr1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uTGFzZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUgOiAgICAgLy8g5LuZ5YmRXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5NaXNzaWxlXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwgOiAgICAgLy8g5pmu6YCaMS0xMOe6p+WIq1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIj09PT09PT09PT09PT09PT09PT3liJ3lp4vljJYg54Ku5Y+w5pyJ6K+vIO+8gVwiLHBsYXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGxheS5jYW5ub25UeXBlICE9IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKSB7Ly/liJrov5vmnaUg5aaC5p6c5pWw5o2u5pyJIOm+mea6queCruWPsCDpgqPkuYjnjrDlrp7pvpnmuqrngq7lj7BcclxuICAgICAgICAgICAgICAgIGlmKGJhdHRlcnlTa2VsZXRvbkRhdGEgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIj4+Pj4g5peg5rOV5a6e5L6L5YyWIOeCruWPsCBcIixwbGF5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHBsYXkuc2VhdE51bSljYy53YXJuKFwiNyA9PT09PT3mm7TmjaLngq7lj7A9PT09PT0gY2Fubm9uVHlwZSBcIitwbGF5LmNhbm5vblR5cGUpXHJcbiAgICAgICAgICAgICAgICBiYXR0ZXJ5LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gYmF0dGVyeVNrZWxldG9uRGF0YTtcclxuICAgICAgICAgICAgICAgIHVpX2d1bi5jYW5ub25UeXBlID0gcGxheS5jYW5ub25UeXBlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSx0cnVlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5JZGxlKTtcclxuICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGxheS5jYW5ub25BbW91bnQrXCJcIjsgLy/nibnmrorngq7lj7Ag546w5a6eIOeCruW8ueaVsOmHj1xyXG4gICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGxheS5jYW5ub25BbW91bnQrXCJcIjtcclxuICAgICAgICAgICAgICAgIC8v54m55q6K54Ku54Ku5Y+wIOS4jeaYvuekuiDliqDlh4/lj7dcclxuICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiYnRuX3N1Yl9wbHVzX2NhbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInVpX0J0blBsdXNcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImJ0bl9zdWJfcGx1c19jYW50YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9CdG5TdWJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fc3ViX3BsdXNfY2FudGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfQnRuUGx1c1wiKS5hY3RpdmUgPSBteWlkID09IHBsYXkudWlkO1xyXG4gICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fc3ViX3BsdXNfY2FudGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfQnRuU3ViXCIpLmFjdGl2ZSA9IG15aWQgPT0gcGxheS51aWQ7XHJcbiAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBsYXkuY2Fubm9uTGV2ZWwrXCJcIjtcclxuICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2MlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBsYXkuY2Fubm9uTGV2ZWwrXCJcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE5vcm1hbENhbm5vbk9mZnNleCA9IDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2Fubm9uID0gTnVtYmVyKHBsYXkuY2Fubm9uTGV2ZWwpIC0gTm9ybWFsQ2Fubm9uT2Zmc2V4O1xyXG4gICAgICAgICAgICAgICAgaWYoY2Fubm9uIDwgMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Fubm9uID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSBwbGF5LnNlYXROdW0pY2Mud2FybihcIjYgPT09PT095pu05o2i54Ku5Y+wPT09PT09IGNhbm5vblR5cGUgXCIrcGxheS5jYW5ub25UeXBlKVxyXG4gICAgICAgICAgICAgICAgYmF0dGVyeS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbY2Fubm9uXTtcclxuICAgICAgICAgICAgICAgIHVpX2d1bi5jYW5ub25UeXBlID0gcGxheS5jYW5ub25UeXBlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSx0cnVlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5JZGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aSreaUvuW8gOeCruaViOaenFxyXG4gICAgcGxheUZpcmluZ0VmZmVjdEhhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgZ3VuVHlwZSA9IHJlcy5ndW5UeXBlO1xyXG4gICAgICAgIGxldCBzZWF0TnVtID0gcmVzLnNlYXROdW07XHJcbiAgICAgICAgbGV0IHVpX2d1biAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5cIitzZWF0TnVtKTtcclxuICAgICAgICBpZihndW5UeXBlID09IENPTlNULkNhbm5vblR5cGUuTGFzZXIpey8v6L+Z5Liq5pivIOm+mea6queahOaTjuWkqeafsSDni6zmnInnmoQg77yM5YW25L2Z55qEIOaaguaXtuayoeacieW8gOeCruaViOaenFxyXG4gICAgICAgICAgICBjb25zdCBJbnZpc2libGUgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBOb3JtYWxPcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBsZXQgYmF0dGVyeU1hc2sgPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJiYXR0ZXJ5TWFza1wiKTtcclxuICAgICAgICAgICAgYmF0dGVyeU1hc2sub3BhY2l0eSA9IE5vcm1hbE9wYWNpdHk7XHJcbiAgICAgICAgICAgIGJhdHRlcnlNYXNrLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzcGluZU5vZGUgPSBjYy5pbnN0YW50aWF0ZShiYXR0ZXJ5TWFzay5nZXRDaGlsZEJ5TmFtZShcInNwY0d1blwiKSk7XHJcbiAgICAgICAgICAgIHNwaW5lTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBiYXR0ZXJ5TWFzay5hZGRDaGlsZChzcGluZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShzcGluZU5vZGUsZmFsc2UsZmFsc2UsQ09OU1QuU3BpbmVOYW1lLklkbGUsKHNwaW5lTmFtZSk9PntcclxuICAgICAgICAgICAgICAgIGJhdHRlcnlNYXNrLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYmF0dGVyeU1hc2sub3BhY2l0eSA9IEludmlzaWJsZTtcclxuICAgICAgICAgICAgICAgIHNwaW5lTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+WBnOeUqOiAgeeahCDlvIDngq7mlYjmnpwg562J5b6F5pu/5Zu+6LWE5rqQ5Yiw5L2NXHJcbiAgICAgICAgICAgIC8vIGxldCB1aV9idWxsZXRFZmYgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vIHVpX2J1bGxldEVmZi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB1aV9idWxsZXRFZmYucG9zaXRpb24gPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9idWxsZXRFZmZlY3RcIikucG9zaXRpb247XHJcbiAgICAgICAgICAgIC8vIHVpX2d1bi5hZGRDaGlsZCh1aV9idWxsZXRFZmYpO1xyXG4gICAgICAgICAgICAvLyBsZXQgZmlzaF9Nb3ZpZUNsaXAgPSB1aV9idWxsZXRFZmYuZ2V0Q29tcG9uZW50KFwibmZpc2hfTW92aWVDbGlwXCIpO1xyXG4gICAgICAgICAgICAvLyBmaXNoX01vdmllQ2xpcC50eXBlID0gQ09OU1QuRWZmZWN0VHlwZS5FZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vIGZpc2hfTW92aWVDbGlwLmluaXRFZmZlY3QodGhpcy5idXR0b25fZ3VuX2hlbHBfbnp6bF90b3dlcl9BdGxhcyxcImJ1bGxldF8yX1wiLDIsNiwxLGZhbHNlLDAuMDIsdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgc2NhbGU7XHJcbiAgICAgICAgICAgIC8vIGlmKHJlcy5ndW5UeXBlID09IDIpey8v6IO96YeP54KuXHJcbiAgICAgICAgICAgIC8vICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgc2NhbGUgPSAwLjU7XHJcbiAgICAgICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTxndW5SYXRlO2krKyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoaT40KXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2NhbGUrPTAuMDc7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNjYWxlKz0wLjA0O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyB1aV9idWxsZXRFZmYuc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrDoh6rlt7HnmoTpkrFcclxuICAgIG15VXBkYXRlTW9uZXlIYW5kbGVyKCl7XHJcbiAgICAgICAgbGV0IHVpX2JnICAgICAgICAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9iZ1wiK3RoaXMubG9naWMuc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IHVpX3VuV2FpdCAgICAgPSB1aV9iZy5nZXRDaGlsZEJ5TmFtZShcInVpX3VuV2FpdFwiKTtcclxuICAgICAgICBsZXQgbGFiX2NvaW4gICAgICA9IHVpX3VuV2FpdC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ19jYW50YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfY29pblwiKTtcclxuICAgICAgICBsYWJfY29pbi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKE51bWJlcih0aGlzLmxvZ2ljLmdvbGQgKyBcIlwiKSk7XHJcbiAgICB9LFxyXG4gICAgLy/lhbbku5bnjqnlrrblsITlh7vvvIzmm7TmlrDkvZnpop1cclxuICAgIHVwZGF0ZVNob290R29sZEhhbmRsZXIocmVzKXtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gcmVzLnNlYXROdW0pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1aV9iZyAgICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfYmdcIityZXMuc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IHVpX3VuV2FpdCAgICAgPSB1aV9iZy5nZXRDaGlsZEJ5TmFtZShcInVpX3VuV2FpdFwiKTtcclxuICAgICAgICBsZXQgbGFiX2NvaW4gICAgICA9IHVpX3VuV2FpdC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ19jYW50YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfY29pblwiKTtcclxuICAgICAgICBsYWJfY29pbi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKHJlcy5nb2xkKTtcclxuICAgIH0sXHJcbiAgICAvL+WFtuS7lueOqeWutuWwhOWHuy3orr7nva4g54Ku5Y+w6KeS5bqmLeWQjuWdkOWKm1xyXG4gICAgdXBkYXRlR3VuUmVjb2lsSGFuZGxlcihyZXMsaXNTZXRSZWNvaWwgPSB0cnVlKXtcclxuICAgICAgICBsZXQgdWlfZ3VuICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICBpZihyZXMuYW5nbGUgIT0gdW5kZWZpbmVkKXVpX2d1bi5hbmdsZSAgICAgID0gcmVzLmFuZ2xlO1xyXG4gICAgICAgIGlmKGlzU2V0UmVjb2lsKXtcclxuICAgICAgICAgICAgdGhpcy5maXJlQnVsbGV0U2V0dGluZ1JlY29pbChyZXMuc2VhdE51bSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmVycm9yKFwiPj4+PiAg54Ku5Y+wIOWQjuWdkOWKmyA9PSDlvIDlp4sg5pKt5pS+IDIgc2VhdE51bSBcIityZXMuc2VhdE51bStcIiB1aV9ndW4gYW5nbGUgXCIrdWlfZ3VuLmFuZ2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vpsbzmsaAs6LCD5pW054Ku5Y+w6KeS5bqm77yM5Y+R5bCE5a2Q5by577yM6K6+572u5ZCO5Z2Q5YqbXHJcbiAgICBjbGlja0Zpc2hQb29sSGFuZGxlcihldnQpe1xyXG4gICAgICAgIGlmKGV2dCAhPSBudWxsKXsvL+WwhOWHuyDojIPlm7TliKTmlq1cclxuICAgICAgICAgICAgbGV0IHBvcyA9IGV2dC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wIHx8IHRoaXMubG9naWMuc2VhdE51bSA9PSBDT05TVC5TZWF0LlJpZ2h0VG9wKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE9mZnNleFkgPSAxMDQ0O1xyXG4gICAgICAgICAgICAgICAgaWYocG9zLnkgPiBPZmZzZXhZKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc3QgT2Zmc2V4WSA9IDYwO1xyXG4gICAgICAgICAgICAgICAgaWYocG9zLnkgPCBPZmZzZXhZKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5NYXhCdWxsdGUgPT0gMCl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwi5pyq5Yid5aeL5YyW77yM5peg5rOV5Y+R5bCEXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5idWxsdGVOdW0gPj0gdGhpcy5sb2dpYy5NYXhCdWxsdGUpe1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiPj4g5a2Q5by55pWw6YeP6LaF6L+HIFwiK3RoaXMubG9naWMuTWF4QnVsbHRlK1wiIO+8jOS4jeS6iOWPkeWwhCBcIix0aGlzLmxvZ2ljLmJ1bGx0ZU51bSlcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRUaXBzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWV2dCl7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dENsaWNrRmlzaFBvb2xIYW5kbGVyKG51bGwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zdCBTaG9vdEdhcFRpbWUgPSAtMC4xMjU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tGaXNoUG9vbFRpbWUgPSBTaG9vdEdhcFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbGlja0Zpc2hQb29sRXZlbnQgPSBldnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v54K55Ye76bG85rGgLOiwg+aVtOeCruWPsOinkuW6pu+8jOWPkeWwhOWtkOW8ue+8jOiuvue9ruWQjuWdkOWKm1xyXG4gICAgbmV4dENsaWNrRmlzaFBvb2xIYW5kbGVyKGV2dCl7XHJcbiAgICAgICAgaWYoIXRoaXMubG9naWMuaXNFbnRlclJvb20pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFnbEdhbWUuZ2FtZU5ldC5nZXRTdGF0ZSgpKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5pc0VudGVyUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIuW9k+WJjeaYryDmlq3nvZHnirbmgIEg5peg5rOV5Y+R5bCEXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2luID0gdGhpcy5sb2dpYy5iYXNlQ29uc3VtZSAqIHRoaXMubG9naWMuY2Fubm9uTGV2ZWw7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5nb2xkID09IHVuZGVmaW5lZCB8fCB0aGlzLmxvZ2ljLmdvbGQgPCBjb2luKXsvL+S9memineajgOafpVxyXG4gICAgICAgICAgICBjb25zdCBOZXdHcm91bmQgPSA5OTtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5yb29tUnVsZS5SYW5rICE9IE5ld0dyb3VuZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb3RNb25leURpYWxvZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mjqfliLbpopHnjodcclxuICAgICAgICBpZighdGhpcy5pc0ZpcmUpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCI+PiDmjqfliLbpopHnjocg5peg5rOV5Y+R5bCEXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc1l1UnV5aVJ1bmluZyl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+5q2j5Zyo5L2/55So546J5aaC5oSP6L2s55uY77yM5YGc54GrIFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9naWNbXCJpc0d1bk1vdmluZ1wiK3RoaXMubG9naWMuc2VhdE51bV0gPT0gMSl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+5q2j5Zyo5pu05o2i54Ku5Y+wIOaSreaUvueJueaViCDml6Dms5Xlj5HlsITlrZDlvLkgXCIsdGhpcy5sb2dpY1tcImlzR3VuTW92aW5nXCIrdGhpcy5sb2dpYy5zZWF0TnVtXSxcIiBzZWF0TnVtIFwiLHRoaXMubG9naWMuc2VhdE51bSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBIYXZlU3BlY2lhbENhbm5vbiA9IDE7XHJcbiAgICAgICAgbGV0IHBsYXllckluZm8gICAgICAgICAgPSB0aGlzLmxvZ2ljLnBsYXllckluZm9bTnVtYmVyKGdsR2FtZS51c2VyLnVzZXJJRCldO1xyXG5cclxuICAgICAgICBpZihwbGF5ZXJJbmZvID09IG51bGwpe1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4+IOaJvuS4jeWIsOeUqOaItyBcIix0aGlzLmxvZ2ljLnBsYXllckluZm8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0ZpcmUgICAgICAgICAgICAgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYW5nbGUgICAgICAgICAgICAgICA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgbXlpZCAgICAgICAgICAgICAgICA9IGdsR2FtZS51c2VyLnVzZXJJRDtcclxuICAgICAgICBsZXQgYXJnICAgICAgICAgICAgICAgICA9IHt1aWQ6bXlpZCxzZWF0TnVtOnRoaXMubG9naWMuc2VhdE51bSxndW5UeXBlOnRoaXMubG9naWMuZ3VuVHlwZSxndW5MZXZlbDp0aGlzLmxvZ2ljLmNhbm5vbkxldmVsfTtcclxuICAgICAgICBsZXQgY3VycmVudElzTWlzc2lsZSAgICA9IHRoaXMubG9naWMuY3VycmVudEJ1bGx0ZVR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlOyAgLy90cnVlIOW9k+WJjeaYr+S7meWJkVxyXG4gICAgICAgIGxldCBuZXh0SXNIYXZlTWlzc2lsZSAgID0gcGxheWVySW5mby5oaXRNYXggIT0gbnVsbCAgICAgICAmJiBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCA+IEhhdmVTcGVjaWFsQ2Fubm9uICYmIHBsYXllckluZm8uY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGU7IC8v5LiL5LiA5Y+R5a2Q5by55piv5LiN5pivIOS7meWJkVxyXG5cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNwZWNpYWxCdWxsZXRQb29sW051bWJlcih0aGlzLmxvZ2ljLnNlYXROdW0pXSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIj4+PuS4jeiDvemHjeWkjeWPkemAgSDlsY/luZXlt7LmnInnibnmrorlrZDlvLkgIOWtkOW8ueexu+WeiyA6IFwiK3RoaXMubG9naWMuc3BlY2lhbEJ1bGxldFBvb2xbTnVtYmVyKHRoaXMubG9naWMuc2VhdE51bSldKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID09IENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+Pj7kuI3og73ph43lpI3lj5HpgIHku5nliZHlrZDlvLkgMiBcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxhc2VyKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIj4+5pyJIOm+mea6qiDlrZDlvLkg5q2j5Zyo5bGP5bmV5YaFXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnJlbnRJc01pc3NpbGUgJiYgbmV4dElzSGF2ZU1pc3NpbGUpe1xyXG4gICAgICAgICAgICBjYy53YXJuKFwi5b2T5YmN5piv5LuZ5YmR5a2Q5by577yM5LiL5LiA5Y+R6L+Y5piv5LuZ5YmR77yM5peg5rOV5bCE5Ye7XCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5jdXJyZW50QnVsbHRlVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxpZ2h0bmluZyl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+PuaciSDpl6rnlLUg5a2Q5by5IOato+WcqOWxj+W5leWGhVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmN1cnJlbnRCdWxsdGVUeXBlID09IENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIpe1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiPj7mnIkg54KO54iGIOWtkOW8uSDmraPlnKjlsY/luZXlhoVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZXZ0ICE9IG51bGwpey8v5q2j5bi454K55Ye7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvZ2ljLnN0YXJ0RmlyZSl7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiPumxvOa9ruadpeS4tO+8jOWPkeWwhOWBnOeUqFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5sb2NrRmlzaElEICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZy5sb2NrID0gTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJnLmluZGV4TnVtID0gTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJnLmFuZ2xlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vQ2xpY2tGSXNoX3RpcHNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub0NsaWNrRklzaF90aXBzXCIpLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm9DbGlja0ZJc2hfdGlwc1wiKS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDEuNSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm9DbGlja0ZJc2hfdGlwc1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMubG9ja0Zpc2hJRCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGFyZy5sb2NrID0gTnVtYmVyKHRoaXMubG9naWMubG9ja0Zpc2hJRCk7XHJcbiAgICAgICAgICAgICAgICBhcmcuaW5kZXhOdW0gPSBOdW1iZXIodGhpcy5sb2dpYy5sb2NrRmlzaEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGFyZy5hbmdsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyAgID0gZXZ0LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBhbmdsZSAgICAgPSB0aGlzLmdldEFuZ2xlKHBvcyk7XHJcbiAgICAgICAgICAgICAgICBhcmcuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlLy/oh6rliqjlsITlh7tcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB1aV9waHlzaWNhbFBvb2wgID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIm5maXNoX2Rlc2tDb250YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9waHlzaWNhbFBvb2xcIik7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB1aV9waHlzaWNhbFBvb2wuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICAgICAgbGV0IGZpc2hMZW4gPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBNYXhGaXNoID0gMTA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSB1aV9waHlzaWNhbFBvb2wuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBpZihuICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXNoX1VuaXQgPSBuLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmlzaF9Vbml0ICE9IG51bGwgJiYgZmlzaF9Vbml0LmdldEZpc2hJRCgpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXNoTGVuKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpc2hMZW4gPiBNYXhGaXNoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvZ2ljLnN0YXJ0RmlyZSl7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiPumxvOa9ruadpeS4tO+8jOiHquWKqOWPkeWwhOWBnOeUqFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrID09IHRydWUgJiYgdGhpcy5sb2dpYy5sb2NrRmlzaElEICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgLy/plIHlrpogIOacieebruagh1xyXG4gICAgICAgICAgICAgICAgYXJnLmxvY2sgPSBOdW1iZXIodGhpcy5sb2dpYy5sb2NrRmlzaElEKTtcclxuICAgICAgICAgICAgICAgIGFyZy5hbmdsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTm9ybWFsQW5nbGUgPSAxODA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBaZXJvQW5nbGUgICA9IDA7XHJcbiAgICAgICAgICAgICAgICAvL+acqumUgeWumlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IDAgfHx0aGlzLmxvZ2ljLnNlYXROdW0gPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSB0aGlzLmxhc3RBbmdsZSA9PSBudWxsID8gWmVyb0FuZ2xlIDogdGhpcy5sYXN0QW5nbGU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IHRoaXMubGFzdEFuZ2xlID09IG51bGwgPyBOb3JtYWxBbmdsZSA6IHRoaXMubGFzdEFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJnLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5hZGp1c3RHdW5BbmdsZSxhcmcpO1xyXG4gICAgfSxcclxuICAgIC8v6YeR6aKd5LiN6Laz5by556qXXHJcbiAgICBzaG93Tm90TW9uZXlEaWFsb2coKXtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmRpYWxvZ1BhbmVsSXNTaG93KXJldHVybjtcclxuICAgICAgICB0aGlzLmxvZ2ljLmRpYWxvZ1BhbmVsSXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmlzQXV0byB8fCB0aGlzLmxvZ2ljLmlzTG9ja0F1dG9DaGFuZ2Upey8v5aaC5p6c6Ieq5YqoIOmCo+S5iOino+mZpFxyXG4gICAgICAgICAgICB0aGlzLm9uU2tpbGxBdXRvSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmlzTG9jayl7Ly/lpoLmnpzplIHlrpog6YKj5LmI6Kej6ZmkXHJcbiAgICAgICAgICAgIHRoaXMub25Ta2lsbExvY2tIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdHJpbmcgPSBgPGNvbG9yPSNDRkVDRkM+5oKo55qE6YeR5biB5LiN6Laz77yM6K+l54Ku5YCN6ZyA6KaBPC9jPiA8Y29sb3I9I0ZEQzkxNj4gJHt0aGlzLmxvZ2ljLmdldEZsb2F0KHRoaXMubG9naWMuY2Fubm9uTGV2ZWwgKiB0aGlzLmxvZ2ljLmJhc2VDb25zdW1lKX0gIDwvYz48Y29sb3I9I0NGRUNGQz7ph5HluIHmiY3lj6/lvIDngq7vvIzmmK/lkKbpqazkuIrliY3lvoDlhYXlgLzvvJ88L2M+YFxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIHN0cmluZywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLmRpYWxvZ1BhbmVsSXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCg5OTk5KTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuZGlhbG9nUGFuZWxJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB9LCBcIuWPlua2iFwiLCBcIuWFheWAvFwiLCA5OTk5KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluacneWQkVxyXG4gICAgZ2V0QW5nbGUocG9zKXtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3RoaXMubG9naWMuc2VhdE51bSkucG9zaXRpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWMuZ2V0UDFUb1AyQW5nbGUoc3RhcnRQb3MsZGlyZWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAvL+i1i+WAvOWQjuWdkOWKm1xyXG4gICAgZmlyZVNldHRpbmdSZWNvaWxIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgbGV0IGFuZ2xlICAgICAgICAgICA9IHJlcy5hbmdsZTtcclxuICAgICAgICBpZihhbmdsZSAhPSB1bmRlZmluZWQpdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIrdGhpcy5sb2dpYy5zZWF0TnVtKS5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIHRoaXMubGFzdEFuZ2xlICAgICAgPSBhbmdsZTtcclxuICAgICAgICB0aGlzLmZpcmVCdWxsZXRTZXR0aW5nUmVjb2lsKHRoaXMubG9naWMuc2VhdE51bSk7XHJcbiAgICB9LFxyXG4gICAgLy/lrp7njrDlkI7lnZDlipvpgLvovpFcclxuICAgIGZpcmVCdWxsZXRTZXR0aW5nUmVjb2lsKHNlYXROdW0pe1xyXG4gICAgICAgIGxldCBiYXR0ZXJ5ICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3NlYXROdW0pLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeVwiKTtcclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShiYXR0ZXJ5LGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5BdHRhY2ssbnVsbCxDT05TVC5TcGluZU5hbWUuSWRsZSx0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvL+makOiXj+S9jee9ruaPkOekulxyXG4gICAgaGlkZGVuTG9jYXRpb25UaXBIYW5kbGVyKCl7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgbGV0IHVpX1RpcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX1RpcFwiKTtcclxuICAgICAgICAgICAgaWYodWlfVGlwLmdldENoaWxkQnlOYW1lKFwidWlfXCIrdGhpcy5sb2dpYy5zZWF0TnVtKSl7XHJcbiAgICAgICAgICAgICAgICB1aV9UaXAuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9cIit0aGlzLmxvZ2ljLnNlYXROdW0pLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwzKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpe1xyXG4gICAgICAgIGNvbnN0IE5vdEV4aXQgPSA0O1xyXG4gICAgICAgIGNvbnN0IElzdEV4aXQgPSAxO1xyXG4gICAgICAgIHN3aXRjaChuYW1lKXtcclxuICAgICAgICAgICAgY2FzZSBcInVpX21hc2tcIjpyZXR1cm4gdGhpcy5jbG9zZVZpZXdIYW5kbGVyKE5vdEV4aXQpOyAgICAgICAvL+mAgOWHulxyXG4gICAgICAgICAgICBjYXNlIFwidWlfbWVudUJ0blwiOnJldHVybiB0aGlzLm1lbnVWaWV3SGFuZGxlcigpOyAgICAgICAgICAgIC8v6I+c5Y2VXHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aV9yZWNoYXJnZUJ0blwiOnJldHVybiB0aGlzLnJlY2hhcmdlQ2xpY2tIYW5kbGVyKCk7ICAgLy/lhYXlgLxcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jaG9uZ3poaVwiOnJldHVybiB0aGlzLnJlY2hhcmdlQ2xpY2tIYW5kbGVyKCk7ICAgICAvL+WFheWAvFxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3R1aWNodVwiOnJldHVybiB0aGlzLmNsb3NlVmlld0hhbmRsZXIoSXN0RXhpdCk7ICAgIC8v6YCA5Ye6XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5feXV6aG9uZ1wiOnJldHVybiB0aGlzLm9wZW5GaXNoR3JvdXBIYW5kbGVyKCk7ICAgICAgLy/miZPlvIDlm77pibRcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9qaWx1XCI6cmV0dXJuIHRoaXMuaGlzdG9yeUNsaWNrSGFuZGxlcigpOyAgICAgICAgICAvL+iusOW9lVxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3NoZXpoaVwiOnJldHVybiB0aGlzLnNldHRpbmdDbGlja0hhbmRsZXIoKTsgICAgICAgIC8v6K6+572uXHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aV9CdG5QbHVzXCI6cmV0dXJuIHRoaXMucGx1c0NsaWNrSGFuZGxlcigpOyAgICAgICAgICAgLy/liqDlj7cgKyDngq7lj7BcclxuICAgICAgICAgICAgY2FzZSBcInVpX0J0blN1YlwiOnJldHVybiB0aGlzLnN1YkNsaWNrSGFuZGxlcigpOyAgICAgICAgICAgICAvL+WHj+WPtyAtIOeCruWPsFxyXG4gICAgICAgICAgICBjYXNlIFwidWlfc2tpbGxMb2NrXCI6cmV0dXJuIHRoaXMub25Ta2lsbExvY2tIYW5kbGVyKCk7ICAgICAgIC8v6ZSB5a6aXHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aV9za2lsbEF1dG9cIjpyZXR1cm4gdGhpcy5vblNraWxsQXV0b0hhbmRsZXIoKTsgICAgICAgLy/oh6rliqhcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9xdWl0XCI6cmV0dXJuIHRoaXMub25RdWl0SGFuZGxlcigpOyAgICAgICAgICAgICAgICAvL2FsZXJ0LeWPlua2iFxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3F1ZWRpbmdcIjpyZXR1cm4gdGhpcy5vblF1ZWRpbmdIYW5kbGVyKCk7ICAgICAgICAgIC8vYWxlcnQt56Gu6K6kXHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcXVlZGluZ19uZXRcIjpyZXR1cm4gdGhpcy5vblF1ZWRpbmdPZmZOZXRIYW5kbGVyKCk7ICAgICAgLy9hbGVydC3noa7orqQt5pat572RXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+abtOaWsOeJueauiueCruWPsOaVsOmHj1xyXG4gICAgdXBTcGVjaWFsR3VuQ29pbkhhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgdWlfcG9zICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX3Bvc1wiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcy5jYW5ub25MZXZlbCArIFwiXCI7XHJcbiAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzLmNhbm5vbkxldmVsICsgXCJcIjtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluWIsOS4gOS4queJueauiueCruWPsFxyXG4gICAgZ2V0U3BlY2lhbENhbm5vbkhhbmRsZXIocmVzKSB7XHJcbiAgICAgICAgbGV0IG15aWQgPSBOdW1iZXIoZ2xHYW1lLnVzZXIudXNlcklEKTtcclxuICAgICAgICBjb25zdCBJc1Jlc3RvcmUgPSAwO1xyXG4gICAgICAgIGxldCBwbGF5ZXJJbmZvID0gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW051bWJlcihyZXMudWlkKV07XHJcbiAgICAgICAgaWYoTnVtYmVyKHJlcy51aWQpID09IG15aWQpe1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiPT09PT09IOiOt+WPluWIsOS4gOS4queJueauiueCruWPsCA9PT09PT0gXCIscGxheWVySW5mbylcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVpX3BoeXNpY2FsUG9vbCAgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwibmZpc2hfZGVza0NvbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInVpX3BoeXNpY2FsUG9vbFwiKTtcclxuICAgICAgICAvL+agueaNruWunuaXtumFjee9ruiuvue9rum+mea6queisOaSnuWuveW6plxyXG4gICAgICAgIGxldCB1aV9ndW4gICAgICAgICAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5cIityZXMuc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IEZpeFRpbWUgICAgICAgICA9IDI7Ly/nuqDmraPml7bpl7RcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB1aV9ndW4uY2Fubm9uVHlwZSA9IHBsYXllckluZm8uY2Fubm9uVHlwZTtcclxuICAgICAgICAgICAgaWYodWlfZ3VuLmNhbm5vblR5cGUgIT0gcGxheWVySW5mby5jYW5ub25UeXBlKXtcclxuICAgICAgICAgICAgICAgIGxldCBiYXR0ZXJ5U2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbm5vblR5cGUgPSBOdW1iZXIocGxheWVySW5mby5jYW5ub25UeXBlKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2Fubm9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcgOiAgIC8vIOmXqueUtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLkxpZ2h0bmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYiA6IC8vIOeCjueIhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLlBhcnRpYWxCb21iXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLkxhc2VyIDogICAgICAgLy8g6b6Z5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uTGFzZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSA6ICAgICAvLyDku5nliZFcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5NaXNzaWxlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgYmF0dGVyeSA9IHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImJhdHRlcnlcIik7XHJcbiAgICAgICAgICAgICAgICBpZihDT05TVC5DYW5ub25UeXBlLk5vcm1hbCA9PSBjYW5ub25UeXBlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2Fubm9uID0gTnVtYmVyKHRoaXMubG9naWMuY2Fubm9uTGV2ZWwpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjYW5ub24gPCAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Fubm9uID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGVyeS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbY2Fubm9uXTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRlcnkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGEgPSBiYXR0ZXJ5U2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSxmYWxzZSxmYWxzZSxDT05TVC5TcGluZU5hbWUuSWRsZTIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljW1wiaXNHdW5Nb3ZpbmdcIit0aGlzLmxvZ2ljLnNlYXROdW1dID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiPj4g6YCa6L+H5pWw5o2u57qg5q2jVUnvvJp1aV9ndW4uY2Fubm9uVHlwZSBcIit1aV9ndW4uY2Fubm9uVHlwZStcIiAgIGRhdGEgY2Fubm9uVHlwZSBcIitwbGF5ZXJJbmZvLmNhbm5vblR5cGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LEZpeFRpbWUpO1xyXG4gICAgICAgIGlmKHBsYXllckluZm8uY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxhc2VyKXtcclxuICAgICAgICAgICAgaWYodWlfZ3VuID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIj4+PiBzZWF0TnVtIFwiLHJlcy5zZWF0TnVtLFwiICByZXMgXCIscmVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgICAgICAgID0gIE51bWJlcih0aGlzLmxvZ2ljLnJvb21SdWxlLkZpcmVwaWxsYXJXaWR0aCk7Ly8g6b6Z5oGv55qE5a695bqm77yI5Y2V5L2N77ya5YOP57Sg77yJXHJcbiAgICAgICAgICAgIGxldCBuZXdTaXplICAgICAgID0gY2Muc2l6ZShyYWRpdXMsdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeU1hc2tcIikuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLmhlaWdodClcclxuICAgICAgICAgICAgdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwiYmF0dGVyeU1hc2tcIikuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplID0gbmV3U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobXlpZCA9PSBOdW1iZXIocmVzLnVpZCkpe1xyXG4gICAgICAgICAgICBsZXQgdWlfcG9zICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX3Bvc1wiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fc3ViX3BsdXNfY2FudGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfQnRuUGx1c1wiKS5hY3RpdmUgPSBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX3N1Yl9wbHVzX2NhbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInVpX0J0blN1YlwiKS5hY3RpdmUgPSBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1aV9ndW4uY2Fubm9uVHlwZSAhPSBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgJiYgIXJlcy5pc05ldyl7XHJcbiAgICAgICAgICAgIHJlcy5pc05ldyA9IHRydWU7Ly/lvLrooYznr6HmlLlcclxuICAgICAgICAgICAgY2Mud2FybihcIj4+IOiOt+W+l+eJueauiueCruWPsCDku43nhLbov5jkvb/nlKgg5pmu6YCaIOeCruWPsCDmraPlnKgg5L+u5q2jXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihyZXMuaXNOZXcpe1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGZpc2ggPSB1aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIityZXMuZmlzaElkKTtcclxuICAgICAgICAgICAgaWYoZmlzaCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHBvcyA9IGNjLnYyKGZpc2gucG9zaXRpb24ueCxmaXNoLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCI+IOmxvOaxoOmHjCDmib7kuI3liLDpsbwgaWQ6IFwiK3Jlcy5maXNoSWQsXCIgcmVzIFwiLHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoTnVtYmVyKHJlcy51aWQpID09IG15aWQpe1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIj09PT09PSDmiJDlip/mm7/mjaLngq7lj7AgPT09PT09IGNhbm5vblR5cGUgXCIrcGxheWVySW5mby5jYW5ub25UeXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0R3VuUmF0ZShyZXMuc2VhdE51bSxwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCxwbGF5ZXJJbmZvLmNhbm5vblR5cGUscG9zLElzUmVzdG9yZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCB1aV9wb3MgICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfcG9zXCIrcmVzLnNlYXROdW0pO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBwbGF5ZXJJbmZvLmNhbm5vbkxldmVsK1wiXCI7XHJcbiAgICAgICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdjJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBwbGF5ZXJJbmZvLmNhbm5vbkxldmVsK1wiXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCtcIlwiO1xyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGxheWVySW5mby5jYW5ub25BbW91bnQrXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+ajgOafpeeJueauiueCruWPsFxyXG4gICAgY2hlY2tTcGVjaWFsQ2Fubm9uSGFuZGxlcihpc1JlZnJlc2hOb3cpe1xyXG4gICAgICAgIGxldCBpc0NoYW5nZSA9ICBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJJbmZvID0gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW2tleV07XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbmZvICE9IG51bGwgJiYgdGhpcy5sb2dpY1tcImlzR3VuTW92aW5nXCIgKyBwbGF5ZXJJbmZvLnNlYXROdW1dICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1aV9ndW4gPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5cIiArIHBsYXllckluZm8uc2VhdE51bSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodWlfZ3VuICE9IG51bGwgJiYgdWlfZ3VuLmNhbm5vblR5cGUgIT0gcGxheWVySW5mby5jYW5ub25UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBVc2VyTWF4ID0gNDtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxVc2VyTWF4O2krKyl7XHJcbiAgICAgICAgICAgIGxldCB1aV9ndW4gPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9ndW5cIiArIGkpO1xyXG4gICAgICAgICAgICBpZih1aV9ndW4uY2Fubm9uVHlwZSAhPSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCAmJiAhaXNDaGFuZ2Upe1xyXG4gICAgICAgICAgICAgICAgaXNDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiDpgY3ljoYg54Ku5Y+wID4+IHVpX2d1biAuIGNhbm5vblR5cGUgXCIrdWlfZ3VuLmNhbm5vblR5cGUrXCIgIHNlYXROdW0gXCIraSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNDaGFuZ2Upe1xyXG4gICAgICAgICAgICBjb25zdCBEZWxheVRpbWUgPSAyLjY7XHJcbiAgICAgICAgICAgIGxldCBjYWxsQmFjayA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5sb2dpYy5wbGF5ZXJJbmZvKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVySW5mbyA9IHRoaXMubG9naWMucGxheWVySW5mb1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckluZm8gIT0gbnVsbCAmJiB0aGlzLmxvZ2ljW1wiaXNHdW5Nb3ZpbmdcIitwbGF5ZXJJbmZvLnNlYXROdW1dICE9IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdWlfZ3VuICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3BsYXllckluZm8uc2VhdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVpX2d1biAhPSBudWxsICYmIHVpX2d1bi5jYW5ub25UeXBlICE9IHBsYXllckluZm8uY2Fubm9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlfZ3VuLmNhbm5vblR5cGUgPSBwbGF5ZXJJbmZvLmNhbm5vblR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmF0dGVyeVNrZWxldG9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5ub25UeXBlID0gTnVtYmVyKHBsYXllckluZm8uY2Fubm9uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNhbm5vblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTGlnaHRuaW5nIDogICAvLyDpl6rnlLVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5MaWdodG5pbmddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIgOiAvLyDngo7niIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5QYXJ0aWFsQm9tYl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MYXNlciA6ICAgICAgIC8vIOm+meaBr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLkxhc2VyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLk1pc3NpbGUgOiAgICAgLy8g5LuZ5YmRXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uTWlzc2lsZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhdHRlcnkgPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJiYXR0ZXJ5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENPTlNULkNhbm5vblR5cGUuTm9ybWFsID09IGNhbm5vblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2Fubm9uID0gTnVtYmVyKHBsYXllckluZm8uY2Fubm9uTGV2ZWwpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Fubm9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5ub24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtjYW5ub25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gYmF0dGVyeVNrZWxldG9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMucGxheVNwaW5lKGJhdHRlcnksIGZhbHNlLCBmYWxzZSwgQ09OU1QuU3BpbmVOYW1lLklkbGUyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvZ2ljLnNlYXROdW0gPT0gcGxheWVySW5mby5zZWF0TnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpY1tcImlzR3VuTW92aW5nXCIgKyB0aGlzLmxvZ2ljLnNlYXROdW1dID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVpX3BvcyAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfcG9zXCIrcGxheWVySW5mby5zZWF0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1aV9vdGhlciA9IHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVySW5mby5jYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKXsvL+aZrumAmueCruWPsOagt+W8j1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2XCIpLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcInVpX2d1bkx2QmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7Ly/nibnmrorngq7lj7DmoLflvI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImltZ19wYW9iZWlrdWFuZzFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuTHZCZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2MlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jaGVja0d1blN0eWxlKHBsYXllckluZm8udWlkLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc1JlZnJlc2hOb3cpe1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCI+Pj4+IOacjeWKoeWZqOaVsOaNrumUmeivryDnq4vljbPliLfmlrAg77yBXCIpXHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9LERlbGF5VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mgaLlpI3ngq7lj7BcclxuICAgIHJlc3RvcmVDYW5ub25IYW5kbGVyKG1zZyl7XHJcbiAgICAgICAgbGV0IHVpZCA9IG1zZy51aWQ7XHJcbiAgICAgICAgbGV0IG15aWQgPSBOdW1iZXIoZ2xHYW1lLnVzZXIudXNlcklEKTtcclxuICAgICAgICBpZihOdW1iZXIodWlkKSA9PSBteWlkKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIj09PT0g5oGi5aSN54Ku5Y+wID09PT0gVGltZSAgXCIrRGF0ZS5ub3coKStcIiAgTWF0aC5yYW5kb20gXCIrTWF0aC5yYW5kb20oKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB1aV9ndW4gICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIrdGhpcy5sb2dpYy5wbGF5ZXJJbmZvW051bWJlcih1aWQpXS5zZWF0TnVtKTtcclxuICAgICAgICBpZihOdW1iZXIodWlkKSA9PSBteWlkKWNjLndhcm4oXCI9PT09PT09PT095b2T5YmN54Ku55qE57G75Z6L77yaIFwiK3VpX2d1bi5jYW5ub25UeXBlLFwiIOW9k+WJjeeahOaVsOaNriBcIit0aGlzLmxvZ2ljLnBsYXllckluZm9bTnVtYmVyKHVpZCldLmNhbm5vblR5cGUpXHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5wbGF5ZXJJbmZvW051bWJlcih1aWQpXS5jYW5ub25UeXBlID09ICB1aV9ndW4uY2Fubm9uVHlwZSl7XHJcbiAgICAgICAgICAgIGlmKE51bWJlcih1aWQpID09IG15aWQpY2Mud2FybihcIj4+IO+8ge+8gSAyID09PT09IOaXoOmcgOaBouWkjeeCruWPsD09PT0g5Zug5Li65Y+I6I635b6X5LqGIFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc05vdyA9IG1zZy5pc05vdztcclxuICAgICAgICBsZXQgbmV4dFRpbWUgPSBpc05vdyA/IDAuMSA6IDE7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc1Jlc3RvcmVJbmdbdWlkXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCI+Pj4g5b2T5YmN5bqn5L2N55qE54Ku5Y+w5q2j5Zyo5oGi5aSNID4+PlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN0b3JlQ0IgPSAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrR3VuU3R5bGUodWlkLHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBJc1Jlc3RvcmUgPSAxO1xyXG4gICAgICAgIHRoaXMubG9naWMuaXNSZXN0b3JlSW5nW3VpZF0gPSBJc1Jlc3RvcmU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UocmVzdG9yZUNCLG5leHRUaW1lKTtcclxuICAgIH0sXHJcbiAgICAvL+ajgOafpeeCruWPsOexu+Wei1xyXG4gICAgY2hlY2tHdW5TdHlsZSh1aWQsaXNDaGVja0d1blNraW4pe1xyXG4gICAgICAgIGNvbnN0IElzUmVzdG9yZSA9IDE7XHJcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMubG9naWMucGxheWVySW5mb1tOdW1iZXIodWlkKV07XHJcbiAgICAgICAgaWYocmVzICE9IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgbXlpZCA9IGdsR2FtZS51c2VyLnVzZXJJRDtcclxuICAgICAgICAgICAgY29uc3QgTm90ID0gMDtcclxuICAgICAgICAgICAgbGV0IGlzSGF2ZVNwY0Nhbm5vbiA9IHJlcy5jYW5ub25BbW91bnQgPT0gTm90ID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICBpZihteWlkID09IE51bWJlcih1aWQpKXtcclxuICAgICAgICAgICAgICAgIGxldCB1aV9wb3MgICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfcG9zXCIrcmVzLnNlYXROdW0pO1xyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWKoOWHj+WPt+aMiemSri0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9zdWJfcGx1c19jYW50YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9CdG5QbHVzXCIpLmFjdGl2ZSAgICAgICA9ICFpc0hhdmVTcGNDYW5ub247XHJcbiAgICAgICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9zdWJfcGx1c19jYW50YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9CdG5TdWJcIikuYWN0aXZlICAgICAgICA9ICFpc0hhdmVTcGNDYW5ub247XHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg5YeP5Y+35oyJ6ZKuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mma7pgJrngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcGFvYmVpa3VhbmcxXCIpLmFjdGl2ZSA9ICAhaXNIYXZlU3BjQ2Fubm9uO1xyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlICAgICAgICA9ICAhaXNIYXZlU3BjQ2Fubm9uO1xyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pmu6YCa54Ku5Y+w5qC35byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nibnmrorngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcGFvYmVpa3VhbmcyXCIpLmFjdGl2ZSA9IGlzSGF2ZVNwY0Nhbm5vbjtcclxuICAgICAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuTHZCZ1wiKS5hY3RpdmUgICAgICAgPSBpc0hhdmVTcGNDYW5ub247XHJcbiAgICAgICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdjJcIikuYWN0aXZlICAgICAgID0gaXNIYXZlU3BjQ2Fubm9uO1xyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t54m55q6K54Ku5Y+w5qC35byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc0NoZWNrR3VuU2tpbil0aGlzLnNldEd1blJhdGUocmVzLnNlYXROdW0sdGhpcy5sb2dpYy5jYW5ub25MZXZlbCxDT05TVC5DYW5ub25UeXBlLk5vcm1hbCxudWxsLElzUmVzdG9yZSx1aWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGlzQ2hlY2tHdW5Ta2luKXRoaXMuc2V0R3VuUmF0ZShyZXMuc2VhdE51bSxyZXMuY2Fubm9uTGV2ZWwsQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwsbnVsbCxJc1Jlc3RvcmUsdWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIj4+IOaBouWkjeeCruWPsCDlh7rkuobpl67popgg5om+5LiN5Yiw5pWw5o2uIHVpZFwiLHVpZCxcIiBsaXN0IDogXCIsdGhpcy5sb2dpYy5wbGF5ZXJJbmZvKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+eCruWPsC3liIfmjaIgKyDvvIzku4XpmZDoh6rlt7FcclxuICAgIHBsdXNDbGlja0hhbmRsZXIoKXtcclxuICAgICAgICBsZXQgbXlpZCA9IE51bWJlcihnbEdhbWUudXNlci51c2VySUQpO1xyXG4gICAgICAgIGxldCBteWluZm8gPSB0aGlzLmxvZ2ljLnBsYXllckluZm9bbXlpZF07XHJcbiAgICAgICAgY29uc3QgTm90SGF2ZVNwZWNpYWxDYW5vbiA9IDA7XHJcbiAgICAgICAgaWYobXlpbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsICYmIG15aW5mby5jYW5ub25BbW91bnQgPiBOb3RIYXZlU3BlY2lhbENhbm9uKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIuW9k+WJjeaYr+eJueauiueCruWPsO+8jOaXoOazleWIh+aNoueCruWAjVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHRoaXMubG9naWMuY2Fubm9uTGV2ZWwgKys7XHJcbiAgICAgICAgY29uc3QgTm9ybWFsQ2Fubm9uTWluTGV2ZWwgPSAxO1xyXG4gICAgICAgIGNvbnN0IE5vcm1hbENhbm5vbk1heExldmVsID0gMTA7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5jYW5ub25MZXZlbCA+IE5vcm1hbENhbm5vbk1heExldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5jYW5ub25MZXZlbCA9IE5vcm1hbENhbm5vbk1pbkxldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXllckluZm9bZ2xHYW1lLnVzZXIudXNlcklEXS5jYW5ub25MZXZlbCA9IHRoaXMubG9naWMuY2Fubm9uTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRHdW5SYXRlKHRoaXMubG9naWMuc2VhdE51bSx0aGlzLmxvZ2ljLmNhbm5vbkxldmVsLHRoaXMubG9naWMuZ3VuVHlwZSxudWxsLG51bGwsbXlpZCk7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VDYW5ub25EYXRhID0ge29wOkNPTlNULk9wZW50aW9uLkNoYW5nZUNhbm5vbkx2LFwibGV2ZWxcIjogdGhpcy5sb2dpYy5jYW5ub25MZXZlbH07XHJcbiAgICAgICAgICAgIC8vIGNjLndhcm4oXCItLT09LS0+5Y+R6YCBIOeCruWPsOWIh+aNoiBcIixjaGFuZ2VDYW5ub25EYXRhKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coZ2xHYW1lLnJvb20uZ2V0UGxheWVyT3AoZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKSxjaGFuZ2VDYW5ub25EYXRhKTsvL+eCruWPsOWIh+aNolxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09OU1QuR3VuTGV2ZWwrZ2xHYW1lLnVzZXIudXNlcklELCB0aGlzLmxvZ2ljLmNhbm5vbkxldmVsKTtcclxuICAgIH0sXHJcbiAgICAvL+eCruWPsC3liIfmjaIgLSDvvIwg5LuF6ZmQ6Ieq5bexXHJcbiAgICBzdWJDbGlja0hhbmRsZXIoKXtcclxuICAgICAgICBsZXQgbXlpZCA9IE51bWJlcihnbEdhbWUudXNlci51c2VySUQpO1xyXG4gICAgICAgIGxldCBteWluZm8gPSB0aGlzLmxvZ2ljLnBsYXllckluZm9bbXlpZF07XHJcbiAgICAgICAgY29uc3QgTm90SGF2ZVNwZWNpYWxDYW5vbiA9IDA7XHJcbiAgICAgICAgaWYobXlpbmZvLmNhbm5vbkFtb3VudCAhPSBudWxsICYmIG15aW5mby5jYW5ub25BbW91bnQgPiBOb3RIYXZlU3BlY2lhbENhbm9uKXtcclxuICAgICAgICAgICAgY2Mud2FybihcIuW9k+WJjeaYr+eJueauiueCruWPsO+8jOaXoOazleWIh+aNoueCruWAjVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGNvbnN0IE5vcm1hbENhbm5vbk1heExldmVsID0gMTA7XHJcbiAgICAgICAgY29uc3QgTm9ybWFsQ2Fubm9uTWluTGV2ZWwgPSAxO1xyXG4gICAgICAgIHRoaXMubG9naWMuY2Fubm9uTGV2ZWwgLS07XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5jYW5ub25MZXZlbCA8IE5vcm1hbENhbm5vbk1pbkxldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5jYW5ub25MZXZlbCA9IE5vcm1hbENhbm5vbk1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXllckluZm9bZ2xHYW1lLnVzZXIudXNlcklEXS5jYW5ub25MZXZlbCA9IHRoaXMubG9naWMuY2Fubm9uTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zZXRHdW5SYXRlKHRoaXMubG9naWMuc2VhdE51bSx0aGlzLmxvZ2ljLmNhbm5vbkxldmVsLHRoaXMubG9naWMuZ3VuVHlwZSxudWxsLG51bGwsbXlpZCk7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VDYW5ub25EYXRhID0ge29wOkNPTlNULk9wZW50aW9uLkNoYW5nZUNhbm5vbkx2LFwibGV2ZWxcIjogdGhpcy5sb2dpYy5jYW5ub25MZXZlbH07XHJcbiAgICAgICAgICAgIC8vIGNjLndhcm4oXCItLT09LS0+5Y+R6YCBIOeCruWPsOWIh+aNoiBcIixjaGFuZ2VDYW5ub25EYXRhKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coZ2xHYW1lLnJvb20uZ2V0UGxheWVyT3AoZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKSxjaGFuZ2VDYW5ub25EYXRhKTsvL+eCruWPsOWIh+aNolxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09OU1QuR3VuTGV2ZWwrZ2xHYW1lLnVzZXIudXNlcklELCB0aGlzLmxvZ2ljLmNhbm5vbkxldmVsKTtcclxuICAgIH0sXHJcbiAgICAvL+abtOaWsOeCruWPsCAtIOiHquW3sSDmiJYg5YW25LuW5Lq6XHJcbiAgICB1cGRhdGVHdW5SYXRlZEhhbmRsZXIocmVzKXtcclxuICAgICAgICB0aGlzLnNldEd1blJhdGUocmVzLnNlYXROdW0scmVzLmNhbm5vbkxldmVsLHJlcy5ndW5UeXBlLG51bGwsbnVsbCxyZXMudWlkKTtcclxuICAgIH0sXHJcbiAgICAvL+iThOWKm+aSreaUvlxyXG4gICAgYWNjdW11bGF0ZUhhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgdWlfZ3VuICAgICAgICA9IHRoaXMudWlfQWN0aW9uYWJsZS5nZXRDaGlsZEJ5TmFtZShcInVpX2d1blwiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICBpZihyZXMuY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLkxpZ2h0bmluZyl7Ly/pl6rnlLXkuJPnlKjok4TlipvvvIzlhbbku5bnmoTmmK/pgJrnlKjnmoRcclxuICAgICAgICAgICAgbGV0IHNwaW5lID0gdWlfZ3VuLmdldENoaWxkQnlOYW1lKFwic3BpbmVfTGlnaHRuaW5nQWNjdW11bGF0ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoc3BpbmUsZmFsc2UsdHJ1ZSxDT05TVC5TcGluZU5hbWUuTm9ybWFsKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG90aGVyQWNjdW11bGF0ZSA9IHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcInNwaW5lX090aGVyQWNjdW11bGF0ZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgRGVsYXlUaW1lID0gMTtcclxuICAgICAgICAgICAgY29uc3QgRGVsYXlUaW1lMiA9IDEuMTtcclxuICAgICAgICAgICAgdWlfZ3VuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHVpX2d1bi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIG90aGVyQWNjdW11bGF0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoRGVsYXlUaW1lKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgb3RoZXJBY2N1bXVsYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYob3RoZXJBY2N1bXVsYXRlLmFjdGl2ZSlvdGhlckFjY3VtdWxhdGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sRGVsYXlUaW1lMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5pu05paw54Ku5Y+wLeiuvue9rnVpLOWmguaenOaYr+eJueauiueCruWPsCDpgqPkuYggZ3VuUmF0ZSDlsLHmmK/nlKjkvZzmmL7npLog54m55q6K54Ku5Y+w5Y+v5Y+R5bCE55qE5a2Q5by55pWw6YePXHJcbiAgICBzZXRHdW5SYXRlKHNlYXROdW0sZ3VuUmF0ZSxjYW5ub25UeXBlLHNwZWNpYWxDYW5ub25GaXNoUG9zID0gbnVsbCxpc1Jlc3RvcmUgPSBudWxsLHVpZCA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMuY2hhbmdlR3VuKHNlYXROdW0sZ3VuUmF0ZSxjYW5ub25UeXBlLHNwZWNpYWxDYW5ub25GaXNoUG9zLGlzUmVzdG9yZSx1aWQpO1xyXG4gICAgICAgIGxldCB1aV9ndW4gICAgICAgID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIrc2VhdE51bSk7XHJcbiAgICAgICAgbGV0IGFuaSAgICAgICAgICAgPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9Ub2dnbGVUdXJyZXRBbmltYXRpb25cIik7XHJcbiAgICAgICAgYW5pLmFjdGl2ZSAgICAgICAgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IEZpZXhVcGRhdGVDYW5ub25Db2luVGltZSA9IDAuMTtcclxuICAgICAgICBjb25zdCBOb3dVcGRhdGVDYW5ub25Db2luVGltZSAgPSAxLjU7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsID8gRmlleFVwZGF0ZUNhbm5vbkNvaW5UaW1lIDogTm93VXBkYXRlQ2Fubm9uQ29pblRpbWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VHdW5TdHlsZShzZWF0TnVtLGNhbm5vblR5cGUsZ3VuUmF0ZSk7XHJcbiAgICAgICAgfSx0aW1lKTtcclxuICAgICAgICAvL+aaguWBnOiAgeeahCDliIfmjaLngq7lj7Ag5pWI5p6cXHJcbiAgICAgICAgLy8gYW5pLmdldENvbXBvbmVudChcIm5maXNoX01vdmllQ2xpcFwiKS5pbml0RWZmZWN0U2NhbGVUbyh0aGlzLmJ1dHRvbl9ndW5faGVscF9uenpsX3Rvd2VyX0F0bGFzLFwiYm9tYl9saW5lX2hlYWRcIiwwLjE1LDAuMiwxLDEsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8v5pS55Y+Y54Ku5Y+w57G75Z6LXHJcbiAgICBjaGFuZ2VHdW5TdHlsZShzZWF0TnVtLGNhbm5vblR5cGUsZ3VuUmF0ZSl7XHJcbiAgICAgICAgY29uc3QgTm9ybWFsTGV2ZWwgPSAxO1xyXG4gICAgICAgIGNvbnN0IE5vdCA9IDA7XHJcbiAgICAgICAgbGV0IHVpX3BvcyAgICAgICAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9wb3NcIitzZWF0TnVtKTtcclxuICAgICAgICBpZihjYW5ub25UeXBlID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKXsvL+W9k+ebruWJjeaYr+aZrumAmueCruWPsFxyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mma7pgJrngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImltZ19wYW9iZWlrdWFuZzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlICAgICAgICA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaZrumAmueCruWPsOagt+W8jy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nibnmrorngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImltZ19wYW9iZWlrdWFuZzJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuTHZCZ1wiKS5hY3RpdmUgICAgICAgPSBmYWxzZTtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmFjdGl2ZSAgICAgICA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nibnmrorngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIH1lbHNley8v5b2T55uu5YmN5piv54m55q6K54Ku5Y+wXHJcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaZrumAmueCruWPsOagt+W8jy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlICAgICAgICA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mma7pgJrngq7lj7DmoLflvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t54m55q6K54Ku5Y+w5qC35byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcGFvYmVpa3VhbmcyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuTHZCZ1wiKS5hY3RpdmUgICAgICAgPSB0cnVlO1xyXG4gICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdjJcIikuYWN0aXZlICAgICAgID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t54m55q6K54Ku5Y+w5qC35byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2Fubm9uVHlwZSA9PSBDT05TVC5DYW5ub25UeXBlLk5vcm1hbCAmJiBndW5SYXRlID09IE5vdCl7XHJcbiAgICAgICAgICAgIHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTm9ybWFsTGV2ZWwrXCJcIjtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTm9ybWFsTGV2ZWwrXCJcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdWlfcG9zLmdldENoaWxkQnlOYW1lKFwidWlfb3RoZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBndW5SYXRlO1xyXG4gICAgICAgICAgICB1aV9wb3MuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9vdGhlclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9ndW5MdjJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBndW5SYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aNoueCriBndW5UeXBlID0gY2Fubm9uVHlwZVxyXG4gICAgY2hhbmdlR3VuKHNlYXROdW0sZ3VuUmF0ZSxjYW5ub25UeXBlLHNwZWNpYWxDYW5ub25GaXNoUG9zID0gbnVsbCxpc1Jlc3RvcmUgPSBudWxsLHVpZCA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdWlfZ3VuID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuXCIgKyBzZWF0TnVtKTtcclxuICAgICAgICBpZih1aV9ndW4uaXNHdW5Nb3ZpbmcgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHVpX2d1bi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJjaGFuZ2VDYW5ub25FZmZlY3RcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBvbGROb2RlID0gdGhpcy51aV9BY3Rpb25hYmxlLmdldENoaWxkQnlOYW1lKFwic3BDYW5uQ29udGFpbmVyXCIrc2VhdE51bSk7XHJcbiAgICAgICAgICAgIGlmKG9sZE5vZGUpe1xyXG4gICAgICAgICAgICAgICAgb2xkTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgb2xkTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkTGFzdE5vZGUgPSBvbGROb2RlLmdldENoaWxkQnlOYW1lKFwibGFzZXJCb3JuRWZmZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYob2xkTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkTGFzdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBvbGRMYXN0Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdWlfZ3VuLmlzR3VuTW92aW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlfZ3VuLmlzR3VuTW92aW5nID0gXCJpc0d1bk1vdmluZ1wiK3NlYXROdW07XHJcbiAgICAgICAgbGV0IGJhdHRlcnkgPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJiYXR0ZXJ5XCIpO1xyXG4gICAgICAgIGlmKGNhbm5vblR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwpey8v54m55q6K54Ku5Y+w5YGa5Liq6I635b6X6KGo546wXHJcbiAgICAgICAgICAgIGlmKHNwZWNpYWxDYW5ub25GaXNoUG9zICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdWlfZ3VuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNb3ZlU3RhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpY1tcImlzR3VuTW92aW5nXCIrc2VhdE51bV0gPSBNb3ZlU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAvL+aSreaUvuenu+WKqOeQg1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc2VyQm9ybkVmZmVjdCAgPSB0aGlzLmxvZ2ljLmNyZWF0b3JFZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5pc0d1bk1vdmluZyA9IFwiaXNHdW5Nb3ZpbmdcIitzZWF0TnVtO1xyXG4gICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBsYXNlckJvcm5FZmZlY3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5uYW1lID0gXCJsYXNlckJvcm5FZmZlY3RcIjtcclxuICAgICAgICAgICAgICAgIGxldCBzcENhbm5Db250YWluZXIgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgc3BDYW5uQ29udGFpbmVyLm5hbWUgPSBcInNwQ2FubkNvbnRhaW5lclwiK3NlYXROdW07XHJcbiAgICAgICAgICAgICAgICBzcENhbm5Db250YWluZXIucG9zaXRpb24gPSBzcGVjaWFsQ2Fubm9uRmlzaFBvcztcclxuICAgICAgICAgICAgICAgIHNwQ2FubkNvbnRhaW5lci5hZGRDaGlsZChsYXNlckJvcm5FZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51aV9BY3Rpb25hYmxlLmFkZENoaWxkKHNwQ2FubkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWNOYW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhdHRlcnlTa2VsZXRvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlQ2Fubm9uU2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbk5hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNSb3RhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IE1pbiA9IDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgTWF4ID0gNTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2Fubm9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcgOiAgIC8vIOmXqueUtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtY05hbWUgPSBDT05TVC5DYW5ub25HZXRFZGRlY3QuTGlnaHRuaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLkxpZ2h0bmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhbm5vblNrZWxldG9uRGF0YSA9IHRoaXMuY2hhbmdlQ2Fubm9uRWZmZWN0TGlzdFtDT05TVC5DYW5ub25DaGFuZ2VFZmZlY3QuTGlnaHRuaW5nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IENPTlNULkNhbm5vbkdvdEVkZGVjdC5MaWdodG5pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYiA6IC8vIOeCjueIhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXggPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtY05hbWUgPSBDT05TVC5DYW5ub25HZXRFZGRlY3QuUGFydGlhbEJvbWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uUGFydGlhbEJvbWJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYW5ub25Ta2VsZXRvbkRhdGEgPSB0aGlzLmNoYW5nZUNhbm5vbkVmZmVjdExpc3RbQ09OU1QuQ2Fubm9uQ2hhbmdlRWZmZWN0LlBhcnRpYWxCb21iXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IENPTlNULkNhbm5vbkdvdEVkZGVjdC5QYXJ0aWFsQm9tYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLkxhc2VyIDogICAgICAgLy8g6b6Z5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1heCA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1jTmFtZSA9IENPTlNULkNhbm5vbkdldEVkZGVjdC5MYXNlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5MYXNlcl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhbm5vblNrZWxldG9uRGF0YSA9IHRoaXMuY2hhbmdlQ2Fubm9uRWZmZWN0TGlzdFtDT05TVC5DYW5ub25DaGFuZ2VFZmZlY3QuTGFzZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lID0gQ09OU1QuQ2Fubm9uR290RWRkZWN0Lkxhc2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSA6ICAgICAvLyDku5nliZFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNOYW1lID0gQ09OU1QuQ2Fubm9uR2V0RWRkZWN0Lk1pc3NpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uTWlzc2lsZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhbm5vblNrZWxldG9uRGF0YSA9IHRoaXMuY2hhbmdlQ2Fubm9uRWZmZWN0TGlzdFtDT05TVC5DYW5ub25DaGFuZ2VFZmZlY3QuTWlzc2lsZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbk5hbWUgPSBDT05TVC5DYW5ub25Hb3RFZGRlY3QuTWlzc2lsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgTG9vcFRpbWUgPSA0MDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IElzSGF2ZVplcm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFNwZWVkID0gMC4xMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFBheUVkUmVtb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+aSreaUvuWPmOi6q+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZUNhbm5vbkVmZmVjdCA9IHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImNoYW5nZUNhbm5vbkVmZmVjdFwiKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzUm90YXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSBzZWF0TnVtKWNjLndhcm4oXCIxID09PT09PeabtOaNoueCruWPsD09PT09PSBjYW5ub25UeXBlIFwiK2Nhbm5vblR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ2Fubm9uRWZmZWN0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gY2hhbmdlQ2Fubm9uU2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRlcnkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGEgPSBiYXR0ZXJ5U2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX2d1bi5jYW5ub25UeXBlID0gY2Fubm9uVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShjaGFuZ2VDYW5ub25FZmZlY3QsZmFsc2UsZmFsc2UsYW5pbWF0aW9uTmFtZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYW5ub25FZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSxmYWxzZSxmYWxzZSxDT05TVC5TcGluZU5hbWUuSWRsZTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgwLjgsMzYwKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LmdldENvbXBvbmVudChcIm5maXNoX01vdmllQ2xpcFwiKS5pbml0RWZmZWN0KHRoaXMubGFzZXJCb3JuRWZmZWN0X0F0bGFzLG1jTmFtZSxNaW4sTWF4LExvb3BUaW1lLElzSGF2ZVplcm8sU3BlZWQsUGF5RWRSZW1vdmUpO1xyXG4gICAgICAgICAgICAgICAgc3BDYW5uQ29udGFpbmVyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgTW92ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0O1xyXG4gICAgICAgICAgICAgICAgaWYoaXNSb3RhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVRpbWUgPSAxLjY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BDYW5uQ29udGFpbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSxmYWxzZSxmYWxzZSxDT05TVC5TcGluZU5hbWUuR2V0LChzcGluZU5hbWUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShiYXR0ZXJ5LGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5JZGxlLChzcGluZU5hbWUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ku5nliZHngq7lj7Ag5Y+Y6Lqr5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgTW92ZU92ZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljW3VpX2d1bi5pc0d1bk1vdmluZ10gPSBNb3ZlT3ZlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljW1wiaXNHdW5Nb3ZpbmdcIitzZWF0TnVtXSA9IE1vdmVPdmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX2d1bi5pc0d1bk1vdmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3QgPSBjYy5tb3ZlVG8oTW92ZVRpbWUsIHVpX2d1bi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVGltZSA9IDEuMjtcclxuICAgICAgICAgICAgICAgICAgICBhY3QgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oTW92ZVRpbWUsIHVpX2d1bi5wb3NpdGlvbiksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BDYW5uQ29udGFpbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHNlYXROdW0pY2Mud2FybihcIjIgPT09PT095pu05o2i54Ku5Y+wPT09PT09IGNhbm5vblR5cGUgXCIrY2Fubm9uVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ2Fubm9uRWZmZWN0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gY2hhbmdlQ2Fubm9uU2tlbGV0b25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShjaGFuZ2VDYW5ub25FZmZlY3QsZmFsc2UsZmFsc2UsYW5pbWF0aW9uTmFtZSwoc3BpbmVOYW1lKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwaW5lTmFtZSA9PSBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lhbbku5bngq7lj7Ag5Y+Y6Lqr5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHNlYXROdW0pY2Mud2FybihcIjMgPT09PT095pu05o2i54Ku5Y+wPT09PT09IGNhbm5vblR5cGUgXCIrY2Fubm9uVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gYmF0dGVyeVNrZWxldG9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aV9ndW4uY2Fubm9uVHlwZSA9IGNhbm5vblR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSx0cnVlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5JZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBNb3ZlT3ZlciA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWNbdWlfZ3VuLmlzR3VuTW92aW5nXSA9IE1vdmVPdmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhbm5vbkVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljW1wiaXNHdW5Nb3ZpbmdcIitzZWF0TnVtXSA9IE1vdmVPdmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpX2d1bi5pc0d1bk1vdmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNwQ2FubkNvbnRhaW5lci5ydW5BY3Rpb24oYWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zdCBOb3JtYWxDYW5ub25PZmZzZXggPSAxO1xyXG4gICAgICAgICAgICBsZXQgY2Fubm9uID0gTnVtYmVyKGd1blJhdGUpIC0gTm9ybWFsQ2Fubm9uT2Zmc2V4O1xyXG4gICAgICAgICAgICBpZihjYW5ub24gPCAwKXtcclxuICAgICAgICAgICAgICAgIGNhbm5vbiA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBsYXllckluZm8gPSB0aGlzLmxvZ2ljLnBsYXllckluZm9bTnVtYmVyKHVpZCldO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXJJbmZvICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbm5vblR5cGVTYyA9IE51bWJlcihwbGF5ZXJJbmZvLmNhbm5vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhdHRlcnlTa2VsZXRvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNhbm5vblR5cGVTYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcgOiAgIC8vIOmXqueUtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLkxpZ2h0bmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5QYXJ0aWFsQm9tYiA6IC8vIOeCjueIhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5U2tlbGV0b25EYXRhID0gdGhpcy5iYXR0ZXJ5TGlzdFtDT05TVC5DYW5ub25Ta2luLlBhcnRpYWxCb21iXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT05TVC5DYW5ub25UeXBlLkxhc2VyIDogICAgICAgLy8g6b6Z5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRlcnlTa2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W0NPTlNULkNhbm5vblNraW4uTGFzZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSA6ICAgICAvLyDku5nliZFcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeVNrZWxldG9uRGF0YSA9IHRoaXMuYmF0dGVyeUxpc3RbQ09OU1QuQ2Fubm9uU2tpbi5NaXNzaWxlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgYmF0dGVyeSA9IHVpX2d1bi5nZXRDaGlsZEJ5TmFtZShcImJhdHRlcnlcIik7XHJcbiAgICAgICAgICAgICAgICBpZihDT05TVC5DYW5ub25UeXBlLk5vcm1hbCA9PSBjYW5ub25UeXBlU2Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRlcnkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGEgPSB0aGlzLmJhdHRlcnlMaXN0W2Nhbm5vbl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHNlYXROdW0pIGNjLndhcm4oXCI0LjAgPT09PT095pu05o2i54Ku5Y+wPT09PT09IGNhbm5vblR5cGUgXCIrY2Fubm9uVHlwZStcIiB1aWQgXCIrdWlkICsgXCIgZGF0YSBjYW5ub25UeXBlIFwiK2Nhbm5vblR5cGVTYylcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0ZXJ5LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gYmF0dGVyeVNrZWxldG9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gc2VhdE51bSkgY2Mud2FybihcIjQuMSA9PT09PT3mm7TmjaLngq7lj7A9PT09PT0gY2Fubm9uVHlwZSBcIitjYW5ub25UeXBlK1wiIHVpZCBcIit1aWQgKyBcIiBkYXRhIGNhbm5vblR5cGUgXCIrY2Fubm9uVHlwZVNjKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdWlfZ3VuLmNhbm5vblR5cGUgPSBjYW5ub25UeXBlU2M7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gc2VhdE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpY1tcImlzR3VuTW92aW5nXCIrdGhpcy5sb2dpYy5zZWF0TnVtXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5wbGF5U3BpbmUoYmF0dGVyeSx0cnVlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5JZGxlKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSBzZWF0TnVtKSBjYy53YXJuKFwiNC54ID09PT09PXBsYXkg54Ku5Y+wPT09PT09IGNhbm5vblR5cGUgXCIrY2Fubm9uVHlwZStcIiB1aWQgXCIrdWlkICsgXCIgZGF0YSBjYW5ub25UeXBlIFwiK2Nhbm5vblR5cGVTYylcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdWlfcG9zICAgPSB0aGlzLnVpX0FjdGlvbmFibGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9wb3NcIitzZWF0TnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCB1aV9vdGhlciA9IHVpX3Bvcy5nZXRDaGlsZEJ5TmFtZShcInVpX290aGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoY2Fubm9uVHlwZVNjID09IENPTlNULkNhbm5vblR5cGUuTm9ybWFsKXsvL+aZrumAmueCruWPsOagt+W8j1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2XCIpLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcInVpX2d1bkx2QmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHYyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7Ly/nibnmrorngq7lj7DmoLflvI9cclxuICAgICAgICAgICAgICAgICAgICB1aV9vdGhlci5nZXRDaGlsZEJ5TmFtZShcImltZ19wYW9iZWlrdWFuZzFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlfb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZ3VuTHZcIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwiaW1nX3Bhb2JlaWt1YW5nMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwidWlfZ3VuTHZCZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX290aGVyLmdldENoaWxkQnlOYW1lKFwibGFiX2d1bkx2MlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBSZXN0b3JlID0gMTtcclxuICAgICAgICAvL+aBouWkjeeCruWPsOaSreaUvuS4gOS4quaBouWkjeWKqOeUu1xyXG4gICAgICAgIGlmKGlzUmVzdG9yZSAhPSBudWxsICYmIGlzUmVzdG9yZSA9PSBSZXN0b3JlKXtcclxuICAgICAgICAgICAgbGV0IHNwaW5lX3Jlc3RvcmVDYW5ub24gPSB1aV9ndW4uZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9yZXN0b3JlQ2Fubm9uXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZShzcGluZV9yZXN0b3JlQ2Fubm9uLGZhbHNlLGZhbHNlLENPTlNULlNwaW5lTmFtZS5Ob3JtYWwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMuaXNSZXN0b3JlSW5nW3VpZF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgc3BpbmVfcmVzdG9yZUNhbm5vbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5Yaw5Ya7IC0g5byA5aeLIC0g57uT5p2fXHJcbiAgICBvbkZyZWV6ZVNob3dVSUhhbmRsZXIoKXtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmlzSW5GcmVlemUpe1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImVmZmVjdF9mcm96ZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6K6w5b2VXHJcbiAgICBoaXN0b3J5Q2xpY2tIYW5kbGVyKCl7XHJcbiAgICAgICAgbGV0IHBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLnJlY29yZF9wcmUpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgICAgIHRoaXMubWVudVZpZXdIYW5kbGVyKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICAvL+aKgOiDvSDplIHlrpov6Kej6ZSBXHJcbiAgICBvblNraWxsTG9ja0hhbmRsZXIoKXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImJ1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmxvZ2ljLmlzTG9jayA9ICF0aGlzLmxvZ2ljLmlzTG9jaztcclxuICAgICAgICBsZXQgbG9ja0xhYiA9IHRoaXMudWlfc2tpbGxMb2NrLmdldENoaWxkQnlOYW1lKFwiaW1nX3N1b2RpbmdcIik7XHJcbiAgICAgICAgbGV0IGltZ19vZmZzdW9kaW5nID0gdGhpcy51aV9za2lsbExvY2suZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfb2Zmc3VvZGluZ1wiKTtcclxuICAgICAgICBsZXQgc3BpbmUgPSB0aGlzLnVpX3NraWxsTG9jay5nZXRDaGlsZEJ5TmFtZShcInNwaW5lXCIpO1xyXG4gICAgICAgIGxvY2tMYWIuYWN0aXZlID0gIXRoaXMubG9naWMuaXNMb2NrO1xyXG4gICAgICAgIGltZ19vZmZzdW9kaW5nLmFjdGl2ZSA9ICFsb2NrTGFiLmFjdGl2ZTtcclxuXHJcbiAgICAgICAgc3BpbmUuYWN0aXZlID0gdGhpcy5sb2dpYy5pc0xvY2s7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51c2VMb2NrU2tpbGwpO1xyXG5cclxuICAgICAgICBsZXQgcm9vbVNraWxsTG9ja0RhdGEgPSB7fTtcclxuICAgICAgICByb29tU2tpbGxMb2NrRGF0YVt0aGlzLmxvZ2ljLnJvb21JZF0gPSB0aGlzLmxvZ2ljLmlzTG9jayA/IFwib1wiOlwiY1wiO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oQ09OU1QuU2tpbGxMb2NrLCByb29tU2tpbGxMb2NrRGF0YSk7XHJcblxyXG4gICAgICAgIGxldCByb29tU2tpbGxBdXRvRGF0YSA9IHt9O1xyXG4gICAgICAgIHJvb21Ta2lsbEF1dG9EYXRhW3RoaXMubG9naWMucm9vbUlkXSA9IHRoaXMubG9naWMuaXNMb2NrID8gXCJvXCI6XCJjXCI7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbExvY2ssIHJvb21Ta2lsbEF1dG9EYXRhKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMubG9naWMuaXNMb2NrKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5sYXN0TG9ja0Zpc2hJRCA9IE51bWJlcih0aGlzLmxvZ2ljLmxvY2tGaXNoSUQrXCJcIik7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMubG9ja0Zpc2hJRCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuaXNMb2NrQXV0b0NoYW5nZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmlzQXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51c2VBdXRvU2tpbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQubGVhdmVSb29tVW5Mb2NrLHRoaXMubG9naWMuc2VhdE51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5piv5ZCm6Ieq5YqoIOWIh+aNolxyXG4gICAgb25Ta2lsbEF1dG9IYW5kbGVyKCl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJidXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5sb2dpYy5pc0xvY2tBdXRvQ2hhbmdlID0gIXRoaXMubG9naWMuaXNMb2NrQXV0b0NoYW5nZTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmxvY2tGaXNoSUQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuaXNBdXRvID0gdGhpcy5sb2dpYy5pc0xvY2tBdXRvQ2hhbmdlO1xyXG4gICAgICAgICAgICBsZXQgc3BpbmUgPSB0aGlzLnVpX3NraWxsQXV0by5nZXRDaGlsZEJ5TmFtZShcInNwaW5lXCIpO1xyXG4gICAgICAgICAgICBzcGluZS5hY3RpdmUgPSB0aGlzLmxvZ2ljLmlzQXV0bztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHNwaW5lID0gdGhpcy51aV9za2lsbEF1dG8uZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZVwiKTtcclxuICAgICAgICAgICAgc3BpbmUuYWN0aXZlID0gdGhpcy5sb2dpYy5pc0xvY2tBdXRvQ2hhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vbURhdGEgPSB7fTtcclxuICAgICAgICByb29tRGF0YVt0aGlzLmxvZ2ljLnJvb21JZF0gPSB0aGlzLmxvZ2ljLmlzTG9ja0F1dG9DaGFuZ2UgPyBcIm9cIjpcImNcIjtcclxuICAgICAgICBnbEdhbWUuc3RvcmFnZS5zZXRJdGVtKENPTlNULlNraWxsaXNMb2NrQXV0b0NoYW5nZSwgcm9vbURhdGEpO1xyXG5cclxuICAgICAgICBsZXQgYXV0b0xhYiA9IHRoaXMudWlfc2tpbGxBdXRvLmdldENoaWxkQnlOYW1lKFwiaW1nX3ppZG9uZ1wiKTtcclxuICAgICAgICBsZXQgaW1nX29mZnppZG9uZyA9IHRoaXMudWlfc2tpbGxBdXRvLmdldENoaWxkQnlOYW1lKFwiaW1nX29mZnppZG9uZ1wiKTtcclxuICAgICAgICBhdXRvTGFiLmFjdGl2ZSA9ICF0aGlzLmxvZ2ljLmlzTG9ja0F1dG9DaGFuZ2U7XHJcbiAgICAgICAgaW1nX29mZnppZG9uZy5hY3RpdmUgPSAhYXV0b0xhYi5hY3RpdmU7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC51c2VBdXRvU2tpbGwpO1xyXG4gICAgfSxcclxuICAgIC8v6I+c5Y2VXHJcbiAgICBtZW51Vmlld0hhbmRsZXIoaXNDbG9zZSA9IGZhbHNlKXtcclxuICAgICAgICBpZihpc0Nsb3NlKXtcclxuICAgICAgICAgICAgdGhpcy51aV9tZW51LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgdGhpcy51aV9tZW51LmFjdGl2ZSA9ICF0aGlzLnVpX21lbnUuYWN0aXZlO1xyXG4gICAgICAgICAgICBsZXQgdWlfdXBJY29uICAgICAgID0gdGhpcy51aV9tZW51QnRuLmdldENoaWxkQnlOYW1lKFwidWlfdXBJY29uXCIpO1xyXG4gICAgICAgICAgICBsZXQgdWlfbGVmdEljb24gICAgID0gdGhpcy51aV9tZW51QnRuLmdldENoaWxkQnlOYW1lKFwidWlfbGVmdEljb25cIik7XHJcbiAgICAgICAgICAgIHVpX3VwSWNvbi5hY3RpdmUgICAgPSAhdWlfdXBJY29uLmFjdGl2ZTtcclxuICAgICAgICAgICAgdWlfbGVmdEljb24uYWN0aXZlICA9ICF1aV91cEljb24uYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOmxvOe+pOmJtOi1j1xyXG4gICAgb3BlbkZpc2hHcm91cEhhbmRsZXIoKXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImJ1dHRvblwiKTtcclxuICAgICAgICBsZXQgcGFuZWwgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuaWxsdXN0cmF0ZWRCb29rKTtcclxuICAgICAgICBwYW5lbC56SW5kZXggPSAzMDtcclxuICAgICAgICB0aGlzLm1lbnVWaWV3SGFuZGxlcihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgLy/lhYXlgLxcclxuICAgIHJlY2hhcmdlQ2xpY2tIYW5kbGVyKCl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJidXR0b25cIik7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ2xHYW1lLnBhbmVsLnNob3dTdXNwaWNpb3VzKFwicmVjaGFyZ2VcIikpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgpO1xyXG4gICAgICAgIHRoaXMubWVudVZpZXdIYW5kbGVyKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICAvL+iuvue9rlxyXG4gICAgc2V0dGluZ0NsaWNrSGFuZGxlcigpe1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGxldCBwYW5lbCA9IGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy5zZXR0aW5nX3ByZSk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMzA7XHJcbiAgICAgICAgdGhpcy5tZW51Vmlld0hhbmRsZXIoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8v6Ieq5bex55qEIOeOieWmguaEjyDlh7rovaznm5ggLyDogZrlrp3puY8g5Ye65ouJ6Zy4XHJcbiAgICBzaG93VHVybnRhYmxlSGFuZGxlcihyZXMpe1xyXG4gICAgICAgIHRoaXMubG9naWMuaXNZdVJ1eWlSdW5pbmcgPSB0cnVlO1xyXG4gICAgICAgIGlmKHJlcy50eXBlID09IENPTlNULkF3YXJkVHlwZS5SVVlJKXtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJnZXRZdVJ1XCIpOy8v5o2V6I63546J5aaC5oSP5LiA556s6Ze05pKt5pS+XHJcbiAgICAgICAgICAgIHRoaXMudHVybnRhYmxlVmlldy5nZXRDb21wb25lbnQoXCJuZmlzaF90dXJudGFibGVcIikuaW5pdFR1cm50YWJsZVZpZXcocmVzKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJnZXRKdUJhb1wiKTsvL+aNleiOt+iBmuWuneebhuS4gOeerOmXtOaSreaUvlxyXG4gICAgICAgICAgICB0aGlzLmNvcm51Y29waWFWaWV3LmdldENvbXBvbmVudChcIm5maXNoX2Nvcm51Y29waWFcIikuc3RhcnRSdW5Db3JudWNvcGlhKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEVmZmVjdE1heFJ1blRpbWUgPSAxMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+ey8v546J5aaC5oSP6L+Q6KGM5pe26Ze05pyA5aSnMTDnp5LvvIwxMOenkuWQjuW8uuWItue7k+adnyDlj5HlsITplIFcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5pc1l1UnV5aVJ1bmluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmlzWXVSdXlpUnVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LEVmZmVjdE1heFJ1blRpbWUpO1xyXG4gICAgfSxcclxuICAgIC8v6YCA5Ye66I+c5Y2VXHJcbiAgICBjbG9zZVZpZXdIYW5kbGVyKGFyZyl7XHJcbiAgICAgICAgY29uc3QgSXNFeGl0NCA9IDQ7XHJcbiAgICAgICAgaWYoYXJnID09PSBJc0V4aXQ0KXtcclxuICAgICAgICAgICAgdGhpcy5tZW51Vmlld0hhbmRsZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IElzRXhpdDMgPSAzO1xyXG4gICAgICAgIGlmKGFyZyA9PT0gSXNFeGl0Myl7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbGlzTG9ja0F1dG9DaGFuZ2UsIFwiXCIpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09OU1QuU2tpbGxMb2NrLCBcIlwiKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKENPTlNULlNraWxsQXV0bywgXCJcIik7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuaXNFbnRlclJvb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgZ2xHYW1lLnJvb20uZXhpdFJvb20oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBJc0V4aXQgPSAxO1xyXG4gICAgICAgIGlmKGFyZyA9PT0gSXNFeGl0KXtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRVaWQgPSBOdW1iZXIoZ2xHYW1lLnVzZXIudXNlcklEKTtcclxuICAgICAgICAgICAgbGV0IHBsYXllckluZm8gPSB0aGlzLmxvZ2ljLnBsYXllckluZm9bY3VycmVudFVpZF07XHJcbiAgICAgICAgICAgIGlmKHBsYXllckluZm8gIT0gbnVsbCAmJiBwbGF5ZXJJbmZvLmNhbm5vblR5cGUgIT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVySW5mby5jYW5ub25BbW91bnQgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LnNob3dBbGVydCxDT05TVC5BbGVydFR5cGUuTG9zQ2FubmFuKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIHRoaXMubWVudVZpZXdIYW5kbGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKENPTlNULlNraWxsaXNMb2NrQXV0b0NoYW5nZSwgXCJcIik7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbExvY2ssIFwiXCIpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09OU1QuU2tpbGxBdXRvLCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5pc0VudGVyUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnbEdhbWUucm9vbS5leGl0Um9vbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL2FsZXJ0IC0g5Y+W5raIXHJcbiAgICBzaG93QWxlcnRIYW5kbGVyKGFyZyl7XHJcbiAgICAgICAgc3dpdGNoIChhcmcpIHtcclxuICAgICAgICAgICAgY2FzZSBDT05TVC5BbGVydFR5cGUuQm9zc0NsZWFyU29jcmUgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0X2V4aXRCb3NzQ2xlYXJTb2NyZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fcXVpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fcXVlZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fcXVlZGluZ19uZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05TVC5BbGVydFR5cGUuTG9zQ2FubmFuIDpcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dF9leGl0TG9zQ2FubmFuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9xdWl0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9xdWVkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9xdWVkaW5nX25ldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTlNULkFsZXJ0VHlwZS5OZXRPZmYgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0X25ldE9mZi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fcXVpdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX3F1ZWRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9xdWVkaW5nX25ldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnRfY29udGFpbmVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgLy9hbGVydCAtIOWPlua2iFxyXG4gICAgb25RdWl0SGFuZGxlcigpe1xyXG4gICAgICAgIHRoaXMubWVudVZpZXdIYW5kbGVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmFsZXJ0X2NvbnRhaW5lci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL2FsZXJ0IC0g56Gu6K6kXHJcbiAgICBvblF1ZWRpbmdIYW5kbGVyKCl7XHJcbiAgICAgICAgY29uc3QgSXNFeGl0ID0gMztcclxuICAgICAgICB0aGlzLmNsb3NlVmlld0hhbmRsZXIoSXNFeGl0KTtcclxuICAgIH0sXHJcbiAgICAvL+aWree9keehruiupFxyXG4gICAgb25RdWVkaW5nT2ZmTmV0SGFuZGxlcigpe1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbGlzTG9ja0F1dG9DaGFuZ2UsIFwiXCIpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbExvY2ssIFwiXCIpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05TVC5Ta2lsbEF1dG8sIFwiXCIpO1xyXG4gICAgICAgIHRoaXMubG9naWMuaXNFbnRlclJvb20gPSBmYWxzZTtcclxuICAgICAgICBnbEdhbWUucm9vbS5leGl0Um9vbSgpO1xyXG4gICAgfSxcclxuICAgIC8v5omT6LSi56WeYm9zcyDojrflvpfnuqLljIVcclxuICAgIHNwcmlua2xlUmVkQmFnSGFuZGxlcihyZXMpe1xyXG4gICAgICAgIGxldCB1aV9waHlzaWNhbFBvb2wgID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIm5maXNoX2Rlc2tDb250YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9waHlzaWNhbFBvb2xcIik7XHJcbiAgICAgICAgbGV0IGZpc2ggICAgICAgICAgICAgPSB1aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIityZXMuZmlzaElkKTtcclxuICAgICAgICBpZighZmlzaCl7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+PuaJvuS4jeWIsOmxvCDml6Dms5XmvILnp7vnuqLljIUgcmVzIFwiLHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpc2hQb3MgICAgICAgICAgPSBmaXNoLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBjb2luQ29udGFpbmVyICAgID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdENvbnRhaW5lclwiKTtcclxuICAgICAgICBsZXQgdWlfY29pbkVmZmVjdFBvcyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RQb3NcIik7XHJcbiAgICAgICAgbGV0IHByZSAgICAgICAgICAgICAgPSB0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSA/IFwiY29pbkZseVJcIiA6IFwiY29pbkZseVwiO1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3NpdGlvbiAgID0gdWlfY29pbkVmZmVjdFBvcy5nZXRDaGlsZEJ5TmFtZShwcmUrcmVzLnNlYXROdW0pLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBlZmZlY3RQb3NpdGlvbiAgID0gdWlfY29pbkVmZmVjdFBvcy5nZXRDaGlsZEJ5TmFtZShcInJlZEJhZ1wiK3Jlcy5zZWF0TnVtKS5wb3NpdGlvbjtcclxuICAgICAgICBsZXQgdWlfQ29pbkVmZmVjdCAgICA9IGNvaW5Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJzcHJpbmtsZVJlZEJhZ1wiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICBpZih1aV9Db2luRWZmZWN0KXtcclxuICAgICAgICAgICAgdWlfQ29pbkVmZmVjdC5pc1JlbW92ZVNlbGYgPSAxO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1aV9Db2luRWZmZWN0ICAgID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BpbmVfZWZmZWN0XCIpLmdldENoaWxkQnlOYW1lKFwic3BpbmVfcmVkRW52ZWxvcGVTdGF0aXN0aWNzXCIpKTtcclxuICAgICAgICB1aV9Db2luRWZmZWN0LnBvc2l0aW9uID0gZWZmZWN0UG9zaXRpb247XHJcbiAgICAgICAgdWlfQ29pbkVmZmVjdC5uYW1lID0gXCJzcHJpbmtsZVJlZEJhZ1wiK3Jlcy5zZWF0TnVtO1xyXG4gICAgICAgIHVpX0NvaW5FZmZlY3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuYW5nbGUgPSAxODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaFNvdW5kLFwiZ2V0Q2FpU2hlblJld1wiKTsvL+aNleiOt+WIsOi0ouelnuWHuueOsOWwj1VJ5pe277yM5pKt5pS+XHJcbiAgICAgICAgY29pbkNvbnRhaW5lci5hZGRDaGlsZCh1aV9Db2luRWZmZWN0KTtcclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZSh1aV9Db2luRWZmZWN0LmdldENoaWxkQnlOYW1lKFwic3BpbmVcIiksZmFsc2UsZmFsc2UsQ09OU1QuU3BpbmVOYW1lLk5vcm1hbCwoKT0+e1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpX0NvaW5FZmZlY3Quc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB1aV9Db2luRWZmZWN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4xKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBpZih1aV9Db2luRWZmZWN0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlOYW1lID0gdGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtID8gXCJsYWJHXCIgOiBcImxhYlNcIjtcclxuICAgICAgICAgICAgICAgIGxldCBsYWJfbnVtYmVyID0gdWlfQ29pbkVmZmVjdC5nZXRDaGlsZEJ5TmFtZShcInNwaW5lXCIpLmdldENoaWxkQnlOYW1lKFwiQVRUQUNIRURfTk9ERV9UUkVFXCIpLmdldENoaWxkQnlOYW1lKFwiQVRUQUNIRURfTk9ERTpyb290XCIpLmdldENoaWxkQnlOYW1lKFwiQVRUQUNIRURfTk9ERTp6b25nXCIpLmdldENoaWxkQnlOYW1lKHBsYXlOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxhYl9udW1iZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxhYl9udW1iZXIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIit0aGlzLmxvZ2ljLmZvcm1hdE1vbmV5KHJlcy5yZXdhcmRHb2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGxldCBlZmZlY3RDb2luICAgICAgID0gMTA7XHJcbiAgICAgICAgY29uc3QgTWF4Q29pbiAgICAgICAgPSAxMDA7Ly/mnIDlpKfmlbDph49cclxuICAgICAgICBjb25zdCBSYW5kb21vZmZTZXggICA9IDYwOy8veHnlnZDmoIflgY/np7vlgLxcclxuICAgICAgICBjb25zdCBSYW5kb21NaW4gICAgICA9IDE1Oy8veHnlnZDmoIflgY/np7vmnIDlsI/lgLxcclxuICAgICAgICBjb25zdCBSYW5kb21PZmZzZXhYICA9IDMwO1xyXG4gICAgICAgIGNvbnN0IFJhbmRvbU9mZnNleFkgID0gNTA7XHJcbiAgICAgICAgY29uc3QgUmFuZG9tTWluWSAgICAgPSAyMDtcclxuICAgICAgICBjb25zdCBTdGFydE5hbWUgICAgICA9IDA7XHJcbiAgICAgICAgY29uc3QgZW5kTmFtZSAgICAgICAgPSA5O1xyXG4gICAgICAgIGNvbnN0IHBseVRpbWUgICAgICAgID0gODtcclxuICAgICAgICBjb25zdCBpc0hhdmVaZXJvICAgICA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHNwZWVkICAgICAgICAgID0gMC4wMzU7XHJcbiAgICAgICAgY29uc3QgcGx5ZWREZXN0cm95ICAgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBpc1JhbmRvbVBseSAgICA9IDE7XHJcbiAgICAgICAgY29uc3QgT25lRGVsYXlUaW1lICAgPSAwLjE7XHJcbiAgICAgICAgY29uc3QgVHdvRGVsYXlUaW1lICAgPSAwLjA1O1xyXG4gICAgICAgIGNvbnN0IFNjYWxlVG9UaW1lICAgID0gMTtcclxuICAgICAgICBjb25zdCBCZXppZXJUb1RpbWUgICA9IDAuNztcclxuICAgICAgICBjb25zdCBTY2FsZVRvQXJnICAgICA9IDAuODtcclxuICAgICAgICBjb25zdCBGYWRlVG9UaW1lICAgICA9IDAuMTtcclxuICAgICAgICBjb25zdCBNb3ZlVG9UaW1lICAgICA9IDAuMTU7XHJcbiAgICAgICAgY29uc3QgRW5kT3BhY2l0eSAgICAgPSAyNTU7XHJcbiAgICAgICAgY29uc3QgR29sZCAgICAgICAgICAgPSBcImdvbGRcIjtcclxuICAgICAgICBjb25zdCBTaWx2ZXIgICAgICAgICA9IFwic2lsdmVyXCI7XHJcbiAgICAgICAgaWYoZWZmZWN0Q29pbiA+IE1heENvaW4pe1xyXG4gICAgICAgICAgICBlZmZlY3RDb2luID0gTWF4Q29pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlfQ29pbkVmZmVjdC56SW5kZXggLT0gZWZmZWN0Q29pbjtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxlZmZlY3RDb2luO2krKyl7XHJcbiAgICAgICAgICAgIGxldCB1aV9Db2luRWZmZWN0ICAgICA9IHRoaXMubG9naWMuY3JlYXRvckVmZmVjdCgpO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnggICAgICAgPSBmaXNoUG9zLnggKyBNYXRoLnJhbmRvbSgpICogUmFuZG9tb2ZmU2V4ICsgUmFuZG9tTWluO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnkgICAgICAgPSBmaXNoUG9zLnkgKyBNYXRoLnJhbmRvbSgpICogUmFuZG9tb2ZmU2V4ICsgUmFuZG9tTWluO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LmFjdGl2ZSAgPSB0cnVlO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnBhcmVudCAgPSBudWxsO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0Lm9wYWNpdHkgPSAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBsYXlOYW1lID0gdGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtID8gR29sZCA6IFNpbHZlcjtcclxuICAgICAgICAgICAgdWlfQ29pbkVmZmVjdC5nZXRDb21wb25lbnQoXCJuZmlzaF9Nb3ZpZUNsaXBcIikuaW5pdEVmZmVjdCh0aGlzLm1vbmV5RWZmZWN0X0F0bGFzLHBsYXlOYW1lLFN0YXJ0TmFtZSxlbmROYW1lLHBseVRpbWUsaXNIYXZlWmVybyxzcGVlZCxwbHllZERlc3Ryb3ksbnVsbCxpc1JhbmRvbVBseSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuYW5nbGUgPSAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29pbkNvbnRhaW5lci5hZGRDaGlsZCh1aV9Db2luRWZmZWN0KTtcclxuICAgICAgICAgICAgbGV0IHVwUG9zICAgICAgID0gY2MudjIodWlfQ29pbkVmZmVjdC5wb3NpdGlvbi54ICsgTWF0aC5yYW5kb20oKSAqIFJhbmRvbU9mZnNleFgsdWlfQ29pbkVmZmVjdC5wb3NpdGlvbi55ICsgTWF0aC5yYW5kb20oKSAqIFJhbmRvbU9mZnNleFkgKyBSYW5kb21NaW5ZKTtcclxuICAgICAgICAgICAgaWYocmVzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wIHx8IHJlcy5zZWF0TnVtID09IENPTlNULlNlYXQuUmlnaHRUb3Ape1xyXG4gICAgICAgICAgICAgICAgdXBQb3MgICAgICAgPSBjYy52Mih1aV9Db2luRWZmZWN0LnBvc2l0aW9uLnggKyBNYXRoLnJhbmRvbSgpICogUmFuZG9tT2Zmc2V4WCx1aV9Db2luRWZmZWN0LnBvc2l0aW9uLnkgLSAoIE1hdGgucmFuZG9tKCkgKiBSYW5kb21PZmZzZXhZICsgUmFuZG9tTWluWSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBib3VuY2VBY3QxICA9IGNjLnNwYXduKGNjLmZhZGVUbyhGYWRlVG9UaW1lLEVuZE9wYWNpdHkpLGNjLm1vdmVUbyhNb3ZlVG9UaW1lLHVpX0NvaW5FZmZlY3QucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgbGV0IGJvdW5jZUFjdDIgID0gY2MubW92ZVRvKE1vdmVUb1RpbWUsdXBQb3MpO1xyXG4gICAgICAgICAgICBsZXQgYmV6aWVyUG9pbnQgPSBjYy52Mih0YXJnZXRQb3NpdGlvbi54LHVpX0NvaW5FZmZlY3QucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGxldCBhY3QgICAgICAgICA9IGNjLnNwYXduKGNjLnNjYWxlVG8oU2NhbGVUb1RpbWUsU2NhbGVUb0FyZyxTY2FsZVRvQXJnKSxjYy5iZXppZXJUbyhCZXppZXJUb1RpbWUsW3VwUG9zLGJlemllclBvaW50LGNjLnYyKHRhcmdldFBvc2l0aW9uLngsdGFyZ2V0UG9zaXRpb24ueSldKSk7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgoaSsxKSpPbmVEZWxheVRpbWUpLGJvdW5jZUFjdDEsYm91bmNlQWN0MixhY3QsY2MuZGVsYXlUaW1lKGkqVHdvRGVsYXlUaW1lKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlfQ29pbkVmZmVjdC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5q276bG85ZCO77ya6YeR5biB5peL6L2s44CB5ryC56e7ICsg6YeR5biB5aKe6ZW/5Yqo55S7IOiOt+WPlumxvOeahOWdkOaghyDovazmjaLlnZDmoIfliLDmnKzlnLDlnZDmoIcg5pKt5pS+6YeR5biB5peL6L2s5Yqo55S777yMMuenkuWQjiDmvILnp7sr57yp5pS+IOWIsOeCruWPsOS9jee9riDvvIzmtYHnqIvnu5PmnZ8g6YeK5pS+44CB6ZqQ6JePXHJcbiAgICBwbGF5Q29pbkVmZmVjdEhhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgcmV3YXJkR29sZCA9IE51bWJlcihyZXMucmV3YXJkR29sZCk7XHJcbiAgICAgICAgaWYocmV3YXJkR29sZCA8PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ajgOafpeivpemxvOaYr+WQpuaciei9rOebmFxyXG4gICAgICAgIGxldCBlZmZlY3RSb3RhdGVMZXZlbCA9IENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLk9uZUxldmVsOy8vMCDkuIDmoaMgMSAyIDNcclxuICAgICAgICBsZXQgcmVzR3JvdXBJZDtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmZpc2hQb29sRGF0YVtOdW1iZXIocmVzLmZpc2hJZCldICE9IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgZmlzaFR5cGVJZCA9IHRoaXMubG9naWMuZmlzaFBvb2xEYXRhW051bWJlcihyZXMuZmlzaElkKV0uZmlzaFR5cGVJZCArIFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuanNvbl9maXNoVGFibGVbZmlzaFR5cGVJZF0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RSb3RhdGVMZXZlbCA9IHRoaXMubG9naWMuanNvbl9maXNoVGFibGVbZmlzaFR5cGVJZF0uZWZmZWN0Um90YXRlO1xyXG4gICAgICAgICAgICAgICAgcmVzR3JvdXBJZCA9IHRoaXMubG9naWMuanNvbl9maXNoVGFibGVbZmlzaFR5cGVJZF0ucmVzR3JvdXBJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXMua2lsbFR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5Cb21iKXsvL+eGlOWyqeeOhOatpueCuOatu+eahOS4gOW+i+mjmDHmoaPmrKFcclxuICAgICAgICAgICAgZWZmZWN0Um90YXRlTGV2ZWwgPSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5PbmVMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVpX3BoeXNpY2FsUG9vbCAgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwibmZpc2hfZGVza0NvbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInVpX3BoeXNpY2FsUG9vbFwiKTtcclxuICAgICAgICBsZXQgZmlzaCAgICAgICAgICAgICA9IHVpX3BoeXNpY2FsUG9vbC5nZXRDaGlsZEJ5TmFtZShcIlwiK3Jlcy5maXNoSWQpO1xyXG4gICAgICAgIGlmKGZpc2ggPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8v5om+5LiN5Yiw6bG8XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCI+PiDmib7kuI3liLDpsbwgaWQ6XCIscmVzLmZpc2hJZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gcmVzLnNlYXROdW0pe1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVmZmVjdFJvdGF0ZUxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLk9uZUxldmVsIDpcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImdldFZvaWNlMVwiKTsvLzHmjKFcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5Ub3dMZXZlbCAgIDpcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImdldFZvaWNlMlwiKTsvLzLmjKFcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5UaHJlZUxldmVsIDpcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImdldFZvaWNlM1wiKTsvLzPmjKFcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5Gb3VyTGV2ZWwgIDpcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImdldFZvaWNlNFwiKTsvLzTmjKFcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKGVmZmVjdFJvdGF0ZUxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuT25lTGV2ZWwgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbHlHb2xkRWZmZWN0KGVmZmVjdFJvdGF0ZUxldmVsLHJlcyk7Ly/po57ph5HluIHliqjnlLtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuVG93TGV2ZWwgICA6XHJcbiAgICAgICAgICAgIGNhc2UgQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuVGhyZWVMZXZlbCA6XHJcbiAgICAgICAgICAgIGNhc2UgQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuRm91ckxldmVsICA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZseVJvdGF0ZUVmZmVjdChlZmZlY3RSb3RhdGVMZXZlbCxmaXNoLnBvc2l0aW9uLHJlc0dyb3VwSWQscmVzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5o2V6I635pWI5p6cIC0g5bGV56S66L2s55uY6aOe6L2s55uY5Yqo55S7IGVmZmVjdFJvdGF0ZUxldmVsIOaho+asoSAgcmV3YXJkR29sZCDlpZblirHmlbDlgLwgIHN0YXJ0U2hvd1BvcyDlvIDlp4vmmL7npLrngrkgZmx5U2VhdE51bSDpnIDopoHpo57liLDnmoTluqfkvY0gcmVzR3JvdXBJZCDlm77niYfmmL7npLpcclxuICAgIGZseVJvdGF0ZUVmZmVjdChlZmZlY3RSb3RhdGVMZXZlbCxzdGFydFNob3dQb3MscmVzR3JvdXBJZCxyZXMpe1xyXG4gICAgICAgIGxldCByZXdhcmRHb2xkICAgICAgID0gcmVzLnJld2FyZEdvbGQ7XHJcbiAgICAgICAgbGV0IGZseVNlYXROdW0gICAgICAgPSByZXMuc2VhdE51bTtcclxuICAgICAgICBsZXQgZWZmZWN0Q29udGFpbmVyICA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHVpX2NvaW5FZmZlY3RQb3MgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0UG9zXCIpO1xyXG4gICAgICAgIGxldCBwcmUgICAgICAgICAgICAgID0gdGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkgPyBcImNvaW5GbHlSXCIgOiBcImNvaW5GbHlcIjtcclxuICAgICAgICBsZXQgbW92ZVRvUG9zICAgICAgICA9IHVpX2NvaW5FZmZlY3RQb3MuZ2V0Q2hpbGRCeU5hbWUocHJlK3Jlcy5zZWF0TnVtKS5wb3NpdGlvbjtcclxuICAgICAgICBsZXQgc3BpbmVfZWZmZWN0ICAgICA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNwaW5lX2VmZmVjdFwiKTtcclxuICAgICAgICBsZXQgc3BpbmVDYW50YWluZXIgICA9IG51bGw7XHJcbiAgICAgICAgbGV0IGJnO1xyXG4gICAgICAgIGxldCBmaXNoO1xyXG4gICAgICAgIGlmKHJlcy5maXNoVHlwZUlkID09IENPTlNULkJvc3NMYXZhQmFzYWx0KXtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIgICA9IGNjLmluc3RhbnRpYXRlKHNwaW5lX2VmZmVjdC5nZXRDaGlsZEJ5TmFtZShcInNwaW5lX2Jvc3NSb25nWWFuXCIpKTtcclxuICAgICAgICAgICAgYmcgICAgICAgICAgICAgICA9IHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwiQVRUQUNIRURfTk9ERV9UUkVFXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX2JnXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gZmx5U2VhdE51bSAmJiBlZmZlY3RSb3RhdGVMZXZlbCA9PSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5Gb3VyTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyICAgPSBjYy5pbnN0YW50aWF0ZShzcGluZV9lZmZlY3QuZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9yZXdhcmRBTmV3NFwiKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+ey8v54iG54K4IOWHuueOsOaXtuaculxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwic3BpbmVfYm9vbV8xXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LDAuMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+ey8v54iG54K4IOWHuueOsOaXtuaculxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwic3BpbmVfYm9vbV8yXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LDAuMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+ey8v54iG54K4IOWHuueOsOaXtuaculxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwic3BpbmVfYm9vbV8zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LDAuNik7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5o2V6I635pWI5p6cICBoYXZlIHR3byBzcGluZSBzdHlsZSBzbyBuZWVkIHRyaW5vY3VsYXIgZXhwcmVzc2lvblxyXG4gICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIgPSBjYy5pbnN0YW50aWF0ZShzcGluZV9lZmZlY3QuZ2V0Q2hpbGRCeU5hbWUodGhpcy5sb2dpYy5zZWF0TnVtID09IGZseVNlYXROdW0gPyBcInNwaW5lX3Jld2FyZEFcIitlZmZlY3RSb3RhdGVMZXZlbCA6ICBcInNwaW5lX3Jld2FyZEJcIitlZmZlY3RSb3RhdGVMZXZlbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJnICAgICAgICAgICAgICAgPSBzcGluZUNhbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcImltZ19iZ1wiKTtcclxuICAgICAgICAgICAgZmlzaCAgICAgICAgICAgICA9IHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwiZmlzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYmcgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBsYWIgPSBiZy5nZXRDaGlsZEJ5TmFtZSh0aGlzLmxvZ2ljLnNlYXROdW0gPT0gZmx5U2VhdE51bSA/IFwiZ29sZF9sYWJcIiA6IFwic2lsdmVyX2xhYlwiKTtcclxuICAgICAgICAgICAgbGFiLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKHJlcy5maXNoVHlwZUlkID09IENPTlNULkJvc3NMYXZhQmFzYWx0KXtcclxuICAgICAgICAgICAgICAgIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBSZXBlYXRUaW1lcyA9IDEwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29pbiA9IHRoaXMubG9naWMuZm9ybWF0TW9uZXkocmV3YXJkR29sZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBTdWJUaW1lcyA9IE1hdGguY2VpbChOdW1iZXIoY29pbitcIlwiKS9SZXBlYXRUaW1lcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvaW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy/or7vmlbDmtojlpLFcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lciAhPSBudWxsICYmIHNwaW5lQ2FudGFpbmVyLmlzRGVzdHJveSA9PSBudWxsICYmIGxhYiAhPSBudWxsICYmIGxhYi5fY29tcG9uZW50cyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29pbiArPSBTdWJUaW1lcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudENvaW4gPj0gY29pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIGNvaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBjdXJyZW50Q29pbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gUmVwZWF0VGltZXMpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sMC4wOSxSZXBlYXRUaW1lcy0xKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclN0YXJ0TnVtID0gdGhpcy5sb2dpYy5mb3JtYXRNb25leShyZXdhcmRHb2xkKStcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyclN0YXJ0TnVtLmluZGV4T2YoXCIuXCIpICE9IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICBsYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBOdW1iZXIoY3VyclN0YXJ0TnVtKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY3VyclN0YXJ0TnVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZpc2gpe1xyXG4gICAgICAgICAgICBsZXQgc3ByRiAgICAgICAgID0gdGhpcy5pY29uX0F0bGFzLmdldFNwcml0ZUZyYW1lKHJlc0dyb3VwSWQpO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGUgICAgICAgID0gc3BpbmVDYW50YWluZXIuaGVpZ2h0IC8gc3ByRi5nZXRPcmlnaW5hbFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IFR3b1NjYWxlICAgPSAwLjU1O1xyXG4gICAgICAgICAgICBjb25zdCBUaHJlZVNjYWxlID0gMC43NTtcclxuICAgICAgICAgICAgY29uc3QgRm91clNjYWxlICA9IDE7XHJcbiAgICAgICAgICAgIGlmKGVmZmVjdFJvdGF0ZUxldmVsID09IENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLlRvd0xldmVsKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gVHdvU2NhbGU7XHJcbiAgICAgICAgICAgICAgICBzcHJGICA9IHRoaXMuaWNvbl8yXzNfNF9BdGxhcy5nZXRTcHJpdGVGcmFtZShyZXNHcm91cElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihlZmZlY3RSb3RhdGVMZXZlbCA9PSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5UaHJlZUxldmVsKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gVGhyZWVTY2FsZTtcclxuICAgICAgICAgICAgICAgIHNwckYgID0gdGhpcy5pY29uXzJfM180X0F0bGFzLmdldFNwcml0ZUZyYW1lKHJlc0dyb3VwSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGVmZmVjdFJvdGF0ZUxldmVsID09IENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLkZvdXJMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IEZvdXJTY2FsZTtcclxuICAgICAgICAgICAgICAgIHNwckYgID0gdGhpcy5pY29uXzJfM180X0F0bGFzLmdldFNwcml0ZUZyYW1lKHJlc0dyb3VwSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpc2guZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJGO1xyXG4gICAgICAgICAgICBmaXNoLm9sZFNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgICAgIGZpc2guc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBmaXNoLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGZpc2gucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLGZpc2gub2xkU2NhbGUqMiksY2Muc2NhbGVUbygwLjIsZmlzaC5vbGRTY2FsZSkpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgRGVsYXlUaW1lICAgICAgID0gZWZmZWN0Um90YXRlTGV2ZWwgKiAwLjI1Oy8v5YGc55WZ5pe26Ze0IC0g5qC55o2u5LiN5ZCM57qn5Yir55qE5Yqo55S76KGo546w55qEa+eahOW4p+aVsOWkmuWwkSDlhrPlrprlgZznlZnml7bpl7RcclxuXHJcbiAgICAgICAgaWYoZWZmZWN0Um90YXRlTGV2ZWwgPT0gQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuVG93TGV2ZWwpe1xyXG4gICAgICAgICAgICBEZWxheVRpbWUgKz0gMC40NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWZmZWN0Um90YXRlTGV2ZWwgPT0gQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuVGhyZWVMZXZlbCl7XHJcbiAgICAgICAgICAgIERlbGF5VGltZSArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgQ2VudG9udCAgICAgPSAwO1xyXG4gICAgICAgIGNvbnN0IEhhbGZTY2FsZSAgID0gMC41O1xyXG5cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gIT0gZmx5U2VhdE51bSAmJiBlZmZlY3RSb3RhdGVMZXZlbCA9PSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5Gb3VyTGV2ZWwpe1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zY2FsZSA9IEhhbGZTY2FsZTtcclxuICAgICAgICAgICAgbGV0IHVpX2NvaW5FZmZlY3RQb3MgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0UG9zXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9zTm9kZU5hbWUgPSB0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSA/IFwiZWZmZWN0Um90YXRlUG9zUlwiK2ZseVNlYXROdW0gOiBcImVmZmVjdFJvdGF0ZVBvc1wiK2ZseVNlYXROdW07XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB1aV9jb2luRWZmZWN0UG9zLmdldENoaWxkQnlOYW1lKHBvc05vZGVOYW1lKS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIueCA9IHBvcy54O1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci55ID0gcG9zLnk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnBvc2l0aW9uID0gZWZmZWN0Um90YXRlTGV2ZWwgPT0gQ09OU1QuRWZmZWN0Um90YXRlTGV2ZWwuRm91ckxldmVsID8gIGNjLnYyKENlbnRvbnQsQ2VudG9udCkgOiBzdGFydFNob3dQb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwaW5lQ2FudGFpbmVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgQmFzZXpJbmRleCA9IDEwMCAqIGVmZmVjdFJvdGF0ZUxldmVsO1xyXG4gICAgICAgIGlmKHRoaXMubGFzdHpJbmRleCl7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnpJbmRleCA9IEJhc2V6SW5kZXggKyB0aGlzLmxhc3R6SW5kZXg7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnpJbmRleCA9IEJhc2V6SW5kZXhcclxuICAgICAgICAgICAgdGhpcy5sYXN0ekluZGV4ID0gc3BpbmVDYW50YWluZXIuekluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlZmZlY3RSb3RhdGVMZXZlbCA9PSBDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5Gb3VyTGV2ZWwpe1xyXG4gICAgICAgICAgICBEZWxheVRpbWUgKz0gMS4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FsbEJhbGsgPSBjYy5jYWxsRnVuYygoKT0+ey8v5Yqo55S757uT5p2f5Zue6LCD5Ye95pWwIC0g5Yqg6YeR5biBIOivu+aVsOWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmFkZEdvbGRFZmZlY3QoZWZmZWN0Um90YXRlTGV2ZWwscmVzKTsvL+mjmOWIhlxyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5pc0Rlc3Ryb3kgPSAxO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkpe1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5hbmdsZSA9IDE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWZmZWN0Q29udGFpbmVyLmFkZENoaWxkKHNwaW5lQ2FudGFpbmVyKTtcclxuICAgICAgICBzcGluZUNhbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG5cclxuICAgICAgICBjb25zdCBNb3ZlVG9UaW1lICAgID0gMC4yNTtcclxuICAgICAgICBjb25zdCBTY2FsZVRvVGltZSAgID0gMC41NTtcclxuICAgICAgICBjb25zdCBTY2FsZVRvQXJnICAgID0gMDtcclxuICAgICAgICBjb25zdCBFZmZTY2FsZVRvQXJnID0gMTtcclxuICAgICAgICBjb25zdCBFZmZTY2FsZVRvVGltZT0gMC4xO1xyXG4gICAgICAgIGNvbnN0IEVmZkRlbGF5VGltZSAgPSAwLjU7XHJcbiAgICAgICAgY29uc3QgRWZmZWN0TnVtICAgICA9IChOdW1iZXIocmVzLmZpc2hJZCkpJTcgKyAxO1xyXG4gICAgICAgIGNvbnN0IEVmZmVjdFByZSAgICAgPSBcImVmZmVjdFRpdGxlX1wiO1xyXG4gICAgICAgIGlmKHJlcy5maXNoVHlwZUlkICE9IENPTlNULkJvc3NMYXZhQmFzYWx0ICYmIGVmZmVjdFJvdGF0ZUxldmVsID09IENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLkZvdXJMZXZlbCl7Ly/nrKzlm5vmoaPmjZXojrfmlYjmnpzkuI3lj5HnlJ/mvILnp7vmlYjmnpzvvIzliqjnlLvooajnjrDnqI3lvq7mnInngrnkuI3lpKrkuIDmoLdcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3RUaXRsZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZXhwbG9zaW9uQW5kTGlnaHRuaW5nX0F0bGFzLmdldFNwcml0ZUZyYW1lKEVmZmVjdFByZStFZmZlY3ROdW0pO1xyXG4gICAgICAgICAgICBsZXQgZm91ckVmZmVjdCA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShEZWxheVRpbWUpLGNjLnNjYWxlVG8oU2NhbGVUb1RpbWUsU2NhbGVUb0FyZyxTY2FsZVRvQXJnKSxjYWxsQmFsayk7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnJ1bkFjdGlvbihmb3VyRWZmZWN0KTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3RUaXRsZVwiKS5zY2FsZSA9IFNjYWxlVG9Bcmc7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0VGl0bGVcIikuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3RUaXRsZVwiKS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKEVmZkRlbGF5VGltZSksY2Muc2NhbGVUbyhFZmZTY2FsZVRvVGltZSxFZmZTY2FsZVRvQXJnLEVmZlNjYWxlVG9BcmcpKSk7XHJcbiAgICAgICAgfWVsc2UgaWYocmVzLmZpc2hUeXBlSWQgIT0gQ09OU1QuQm9zc0xhdmFCYXNhbHQpe1xyXG4gICAgICAgICAgICBsZXQgb3RoZXJFZmZlY3QgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoRGVsYXlUaW1lKSxjYy5zcGF3bihjYy5zY2FsZVRvKFNjYWxlVG9UaW1lLFNjYWxlVG9BcmcsU2NhbGVUb0FyZyksY2MubW92ZVRvKE1vdmVUb1RpbWUsbW92ZVRvUG9zKSksY2FsbEJhbGspO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5ydW5BY3Rpb24ob3RoZXJFZmZlY3QpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb3RoZXJFZmZlY3QgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoRGVsYXlUaW1lKSxjYWxsQmFsayk7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnJ1bkFjdGlvbihvdGhlckVmZmVjdCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+a8guenu+mHkeW4geWKqOeUu1xyXG4gICAgZmx5R29sZEVmZmVjdChlZmZlY3RSb3RhdGVMZXZlbCxyZXMpe1xyXG4gICAgICAgIGxldCBjb2luQ29udGFpbmVyICAgID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdENvbnRhaW5lclwiKTtcclxuICAgICAgICBsZXQgdWlfY29pbkVmZmVjdFBvcyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RQb3NcIik7XHJcbiAgICAgICAgbGV0IHByZSAgICAgICAgICAgICAgPSB0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSA/IFwiY29pbkZseVJcIiA6IFwiY29pbkZseVwiO1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3NpdGlvbiAgID0gdWlfY29pbkVmZmVjdFBvcy5nZXRDaGlsZEJ5TmFtZShwcmUrcmVzLnNlYXROdW0pLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB1aV9waHlzaWNhbFBvb2wgID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIm5maXNoX2Rlc2tDb250YWluZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9waHlzaWNhbFBvb2xcIik7XHJcbiAgICAgICAgbGV0IGZpc2ggICAgICAgICAgICAgPSB1aV9waHlzaWNhbFBvb2wuZ2V0Q2hpbGRCeU5hbWUoXCJcIityZXMuZmlzaElkKTtcclxuICAgICAgICBsZXQgZWZmZWN0Q29pbiAgICAgICA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNSArIDEpO1xyXG4gICAgICAgIGNvbnN0IE1heENvaW4gICAgICAgID0gMTAwOy8v5pyA5aSn5pWw6YePXHJcbiAgICAgICAgY29uc3QgUmFuZG9tb2ZmU2V4ICAgPSA2MDsvL3h55Z2Q5qCH5YGP56e75YC8XHJcbiAgICAgICAgY29uc3QgUmFuZG9tTWluICAgICAgPSAxNTsvL3h55Z2Q5qCH5YGP56e75pyA5bCP5YC8XHJcbiAgICAgICAgY29uc3QgUmFuZG9tT2Zmc2V4WCAgPSAzMDtcclxuICAgICAgICBjb25zdCBSYW5kb21PZmZzZXhZICA9IDUwO1xyXG4gICAgICAgIGNvbnN0IFJhbmRvbU1pblkgICAgID0gMjA7XHJcbiAgICAgICAgY29uc3QgU3RhcnROYW1lICAgICAgPSAwO1xyXG4gICAgICAgIGNvbnN0IGVuZE5hbWUgICAgICAgID0gOTtcclxuICAgICAgICBjb25zdCBwbHlUaW1lICAgICAgICA9IDg7XHJcbiAgICAgICAgY29uc3QgaXNIYXZlWmVybyAgICAgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBzcGVlZCAgICAgICAgICA9IDAuMDM1O1xyXG4gICAgICAgIGNvbnN0IHBseWVkRGVzdHJveSAgID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgaXNSYW5kb21QbHkgICAgPSAxO1xyXG4gICAgICAgIGNvbnN0IE9uZURlbGF5VGltZSAgID0gMC4xO1xyXG4gICAgICAgIGNvbnN0IFR3b0RlbGF5VGltZSAgID0gMC4wNTtcclxuICAgICAgICBjb25zdCBTY2FsZVRvVGltZSAgICA9IDE7XHJcbiAgICAgICAgY29uc3QgQmV6aWVyVG9UaW1lICAgPSAwLjc7XHJcbiAgICAgICAgY29uc3QgU2NhbGVUb0FyZyAgICAgPSAwLjg7XHJcbiAgICAgICAgY29uc3QgRmFkZVRvVGltZSAgICAgPSAwLjE7XHJcbiAgICAgICAgY29uc3QgTW92ZVRvVGltZSAgICAgPSAwLjE1O1xyXG4gICAgICAgIGNvbnN0IEVuZE9wYWNpdHkgICAgID0gMjU1O1xyXG4gICAgICAgIGNvbnN0IEdvbGQgICAgICAgICAgID0gXCJnb2xkXCI7XHJcbiAgICAgICAgY29uc3QgU2lsdmVyICAgICAgICAgPSBcInNpbHZlclwiO1xyXG4gICAgICAgIGlmKGVmZmVjdENvaW4gPiBNYXhDb2luKXtcclxuICAgICAgICAgICAgZWZmZWN0Q29pbiA9IE1heENvaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBDb2luTGFiT2Zmc2V4WSA9IDE1ODtcclxuXHJcbiAgICAgICAgbGV0IGNvaW5sYWIgPSBjYy5pbnN0YW50aWF0ZShjb2luQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKHRoaXMubG9naWMuc2VhdE51bSA9PSByZXMuc2VhdE51bSA/IFwiZmx5R29sZENvaW5MYWJcIiA6IFwiZmx5U2lsdmVyQ29pbkxhYlwiKSk7XHJcbiAgICAgICAgY29pbmxhYi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvaW5sYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIit0aGlzLmxvZ2ljLmZvcm1hdE1vbmV5KHJlcy5yZXdhcmRHb2xkKTtcclxuICAgICAgICBsZXQgZmlzaFBvcyA9IGZpc2gucG9zaXRpb247XHJcbiAgICAgICAgY29pbmxhYi54ID0gZmlzaFBvcy54ICsgTWF0aC5yYW5kb20oKSAqIFJhbmRvbW9mZlNleCArIFJhbmRvbU1pbjtcclxuICAgICAgICBsZXQgbW92ZVRvQWN0O1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgY29pbmxhYi5hbmdsZSA9IDE4MDtcclxuICAgICAgICAgICAgY29pbmxhYi55ID0gZmlzaFBvcy55O1xyXG4gICAgICAgICAgICBtb3ZlVG9BY3QgPSBjYy5tb3ZlVG8oMC4zLGNvaW5sYWIueCxjb2lubGFiLnkgLSBDb2luTGFiT2Zmc2V4WSlcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGNvaW5sYWIueSA9IGZpc2hQb3MueTtcclxuICAgICAgICAgICAgbW92ZVRvQWN0ID0gY2MubW92ZVRvKDAuMyxjb2lubGFiLngsY29pbmxhYi55ICsgQ29pbkxhYk9mZnNleFkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvaW5Db250YWluZXIuYWRkQ2hpbGQoY29pbmxhYik7XHJcblxyXG4gICAgICAgIGNvaW5sYWIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjMpLG1vdmVUb0FjdCxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBjb2lubGFiLmRlc3Ryb3koKTtcclxuICAgICAgICB9KSkpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPGVmZmVjdENvaW47aSsrKXtcclxuICAgICAgICAgICAgbGV0IHVpX0NvaW5FZmZlY3QgICAgID0gdGhpcy5sb2dpYy5jcmVhdG9yRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QueCAgICAgICA9IGZpc2hQb3MueCArIE1hdGgucmFuZG9tKCkgKiBSYW5kb21vZmZTZXggKyBSYW5kb21NaW47XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QueSAgICAgICA9IGZpc2hQb3MueSArIE1hdGgucmFuZG9tKCkgKiBSYW5kb21vZmZTZXggKyBSYW5kb21NaW47XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuYWN0aXZlICA9IHRydWU7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QucGFyZW50ICA9IG51bGw7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3Qub3BhY2l0eSA9IDA7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHBsYXlOYW1lID0gdGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtID8gR29sZCA6IFNpbHZlcjtcclxuICAgICAgICAgICAgdWlfQ29pbkVmZmVjdC5nZXRDb21wb25lbnQoXCJuZmlzaF9Nb3ZpZUNsaXBcIikuaW5pdEVmZmVjdCh0aGlzLm1vbmV5RWZmZWN0X0F0bGFzLHBsYXlOYW1lLFN0YXJ0TmFtZSxlbmROYW1lLHBseVRpbWUsaXNIYXZlWmVybyxzcGVlZCxwbHllZERlc3Ryb3ksbnVsbCxpc1JhbmRvbVBseSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuYW5nbGUgPSAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29pbkNvbnRhaW5lci5hZGRDaGlsZCh1aV9Db2luRWZmZWN0KTtcclxuICAgICAgICAgICAgbGV0IHVwUG9zICAgICAgICAgPSBjYy52Mih1aV9Db2luRWZmZWN0LnBvc2l0aW9uLnggKyBNYXRoLnJhbmRvbSgpICogUmFuZG9tT2Zmc2V4WCx1aV9Db2luRWZmZWN0LnBvc2l0aW9uLnkgKyBNYXRoLnJhbmRvbSgpICogUmFuZG9tT2Zmc2V4WSArIFJhbmRvbU1pblkpO1xyXG5cclxuICAgICAgICAgICAgaWYocmVzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wIHx8IHJlcy5zZWF0TnVtID09IENPTlNULlNlYXQuUmlnaHRUb3Ape1xyXG4gICAgICAgICAgICAgICAgdXBQb3MgICAgICAgICA9IGNjLnYyKHVpX0NvaW5FZmZlY3QucG9zaXRpb24ueCArIE1hdGgucmFuZG9tKCkgKiBSYW5kb21PZmZzZXhYLHVpX0NvaW5FZmZlY3QucG9zaXRpb24ueSAtICggTWF0aC5yYW5kb20oKSAqIFJhbmRvbU9mZnNleFkgKyBSYW5kb21NaW5ZKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJvdW5jZUFjdDEgICAgPSBjYy5zcGF3bihjYy5mYWRlVG8oRmFkZVRvVGltZSxFbmRPcGFjaXR5KSxjYy5tb3ZlVG8oTW92ZVRvVGltZSx1aV9Db2luRWZmZWN0LnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgIGxldCBib3VuY2VBY3QyICAgID0gY2MubW92ZVRvKE1vdmVUb1RpbWUsdXBQb3MpO1xyXG4gICAgICAgICAgICBsZXQgYmV6aWVyUG9pbnQgICA9IGNjLnYyKHRhcmdldFBvc2l0aW9uLngsdWlfQ29pbkVmZmVjdC5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgbGV0IGFjdCAgICAgICAgICAgPSBjYy5zcGF3bihjYy5zY2FsZVRvKFNjYWxlVG9UaW1lLFNjYWxlVG9BcmcsU2NhbGVUb0FyZyksY2MuYmV6aWVyVG8oQmV6aWVyVG9UaW1lLFt1cFBvcyxiZXppZXJQb2ludCxjYy52Mih0YXJnZXRQb3NpdGlvbi54LHRhcmdldFBvc2l0aW9uLnkpXSkpO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoKGkrMSkqT25lRGVsYXlUaW1lKSxib3VuY2VBY3QxLGJvdW5jZUFjdDIsYWN0LGNjLmRlbGF5VGltZShpKlR3b0RlbGF5VGltZSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtICYmIENPTlNULkVmZmVjdFJvdGF0ZUxldmVsLk9uZUxldmVsID09IGVmZmVjdFJvdGF0ZUxldmVsKXtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJmbHlHb2xkXCIpOy8v6aOe6YeR5biBXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihDT05TVC5FZmZlY3RSb3RhdGVMZXZlbC5PbmVMZXZlbCAhPSBlZmZlY3RSb3RhdGVMZXZlbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEdvbGRFZmZlY3QoZWZmZWN0Um90YXRlTGV2ZWwscmVzKTsvL+WKoOmHkeW4gSDor7vmlbDliqjnlLtcclxuICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/po5jliIZcclxuICAgIGFkZEdvbGRFZmZlY3QoZWZmZWN0Um90YXRlTGV2ZWwscmVzKXtcclxuICAgICAgICBsZXQgcHJlID0gcmVzLnNlYXROdW0gPT0gdGhpcy5sb2dpYy5zZWF0TnVtID8gXCJsYWJfY29pbkdsb2RcIjpcImxhYl9jb2luU2lsdmVyXCI7XHJcblxyXG4gICAgICAgIGxldCBsYWJfY29pbk1hc2sgICAgICAgID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdENvbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl9jb2luTWFza1wiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgIGxhYl9jb2luTWFzayAgICAgICAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0Q29udGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwibGFiX2NvaW5NYXNrUlwiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJhc2VfbGFiTm9kZSAgICAgICAgPSBsYWJfY29pbk1hc2suZ2V0Q2hpbGRCeU5hbWUocHJlKTtcclxuICAgICAgICBsZXQgbGFiTm9kZSAgICAgICAgICAgICA9IGNjLmluc3RhbnRpYXRlKGJhc2VfbGFiTm9kZSk7XHJcbiAgICAgICAgaWYoYmFzZV9sYWJOb2RlLm9sZHggPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYmFzZV9sYWJOb2RlLm9sZHggICA9IE51bWJlcihiYXNlX2xhYk5vZGUueCArIFwiXCIpO1xyXG4gICAgICAgICAgICBiYXNlX2xhYk5vZGUub2xkeSAgID0gTnVtYmVyKGJhc2VfbGFiTm9kZS55ICsgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhYk5vZGUub2xkeCAgICAgICAgICAgID0gTnVtYmVyKGJhc2VfbGFiTm9kZS5vbGR4ICsgXCJcIik7XHJcbiAgICAgICAgbGFiTm9kZS5vbGR5ICAgICAgICAgICAgPSBOdW1iZXIoYmFzZV9sYWJOb2RlLm9sZHkgKyBcIlwiKTtcclxuICAgICAgICBsYWJfY29pbk1hc2suYWRkQ2hpbGQobGFiTm9kZSk7XHJcbiAgICAgICAgY29uc3QgTW92ZU9mZnNleCAgICAgICAgPSBNYXRoLnJhbmRvbSgpICogNSArIDU7XHJcbiAgICAgICAgY29uc3QgTW92ZU9mZnNleDIgICAgICAgPSBNb3ZlT2Zmc2V4ICsgNTtcclxuICAgICAgICBsZXQgZW5kUG9zICAgICAgICAgICAgICA9IGNjLnYyKGxhYk5vZGUub2xkeCxsYWJOb2RlLm9sZHkgKyBNb3ZlT2Zmc2V4KTtcclxuICAgICAgICBpZihyZXMuc2VhdE51bSA9PSBDT05TVC5TZWF0LkxlZnRUb3AgfHwgcmVzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5SaWdodFRvcCl7XHJcbiAgICAgICAgICAgIGVuZFBvcyAgICAgICAgICAgICAgPSBjYy52MihsYWJOb2RlLm9sZHgsbGFiTm9kZS5vbGR5IC0gTW92ZU9mZnNleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5kUG9zMiAgICAgICAgICAgICA9IGNjLnYyKGxhYk5vZGUub2xkeCxlbmRQb3MueSArIE1vdmVPZmZzZXgyKTtcclxuICAgICAgICBpZihyZXMuc2VhdE51bSA9PSBDT05TVC5TZWF0LkxlZnRUb3AgfHwgcmVzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5SaWdodFRvcCl7XHJcbiAgICAgICAgICAgIGVuZFBvczIgICAgICAgICAgICAgPSBjYy52MihsYWJOb2RlLm9sZHgsZW5kUG9zLnkgLSBNb3ZlT2Zmc2V4Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgIGxhYk5vZGUuYW5nbGUgPSAxODA7XHJcbiAgICAgICAgICAgIGxhYk5vZGUuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvbGRQb3MgICAgICAgICAgICA9IGNjLnYyKGxhYk5vZGUub2xkeCxsYWJOb2RlLm9sZHkpO1xyXG4gICAgICAgIGxhYk5vZGUuY3VyclJld2FyZEdvbGQgID0gMDtcclxuICAgICAgICBsYWJOb2RlLnN0YXJ0SGlkZSAgICAgICA9IDA7XHJcbiAgICAgICAgbGFiTm9kZS5yZXdhcmRHb2xkICAgICAgPSByZXMucmV3YXJkR29sZDtcclxuICAgICAgICBsYWJOb2RlLnNjYWxlICAgICAgICAgICA9IDA7XHJcbiAgICAgICAgbGFiTm9kZS5zZXRQb3NpdGlvbihsYWJfY29pbk1hc2suZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfc3RhcnRQb3NcIikucG9zaXRpb24pO1xyXG4gICAgICAgIGxhYk5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBsYWJOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIrdGhpcy5sb2dpYy5mb3JtYXRNb25leShyZXMucmV3YXJkR29sZCk7XHJcbiAgICAgICAgbGFiTm9kZS5hY3RpdmUgICAgICAgICAgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IEdvVGltZSAgICAgICAgICAgID0gMC4xNztcclxuICAgICAgICBjb25zdCBlbmRUaW1lICAgICAgICAgICA9IDAuNDtcclxuICAgICAgICBjb25zdCBEZWxheVRpbWUgICAgICAgICA9IDAuMzU7XHJcbiAgICAgICAgY29uc3QgRGVsYXlTdGF0ZVRpbWUgICAgPSAwLjA1O1xyXG4gICAgICAgIGNvbnN0IE5vcm1hbCAgICAgICAgICAgID0gMS4yO1xyXG4gICAgICAgIGNvbnN0IFNjYWxlVG9UaW1lICAgICAgID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IFNjYWxlVG9UaW1lMiAgICAgID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZhZGVUb1RpbWUgICAgICAgID0gMC4zO1xyXG4gICAgICAgIGNvbnN0IEhpZGUgICAgICAgICAgICAgID0gMDtcclxuICAgICAgICBjb25zdCBGYWRlVG8gICAgICAgICAgICA9IDA7XHJcbiAgICAgICAgbGFiTm9kZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKERlbGF5VGltZSksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5zY2FsZVRvKFNjYWxlVG9UaW1lLE5vcm1hbCksY2MubW92ZVRvKEdvVGltZSxvbGRQb3MpKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShEZWxheVN0YXRlVGltZSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZW5kVGltZSxlbmRQb3MyKSxcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbyhGYWRlVG9UaW1lLEhpZGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oU2NhbGVUb1RpbWUyLEZhZGVUbyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZUJ5KGVuZFRpbWUsZW5kUG9zMiksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMubXNnICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gcmVzLnNlYXROdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5nb2xkID0gTnVtYmVyKHJlcy5tc2cuY29pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLmNoZWNrR29sZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+PiDmm7TmlrDmiJHnmoTpkrEgIG9r77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50Lm15VXBkYXRlTW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwiPj4g5bCE5Ye7IOabtOaWsOWFtuS7lueUqOaIt+eahOmSsSBvayFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQudXBkYXRlU2hvb3RHb2xkLHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWNbXCJpc1VwZGF0ZU1vbmV5XCIrcmVzLm1zZy5zZWF0TnVtXSA9IHRydWU7Ly/njonlpoLmhI/jgIHogZrlrp3nm4Yg57uT5p2fIOaBouWkjeabtOaWsOS9memineacuuWItlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsYWJOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8v54m55q6K5a2Q5by557uf6K6hXHJcbiAgICBzcGVjaWFsQnVsbGV0U3RhdGlzdGljcyhyZXMpe1xyXG4gICAgICAgIGlmKHJlcy50b3RhbCA8IDAuMSl7Ly/miZPmrbvmjonpsbzmsqHliIblsLHkuI3mkq3kuoZcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S7meWJkeavlOi+g+eJueauiiDnlJ/lkb3lkajmnJ/ovoPplb9cclxuICAgICAgICBsZXQgY29pbkNvbnRhaW5lciAgICA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHVpX2NvaW5FZmZlY3RQb3MgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0UG9zXCIpO1xyXG4gICAgICAgIGxldCBzcGluZUNhbnRhaW5lciAgID0gY29pbkNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcInNwaW5lQ2FudGFpbmVyXCIrcmVzLnNlYXROdW0pO1xyXG4gICAgICAgIGlmKHNwaW5lQ2FudGFpbmVyICE9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lci5pc0Rpc3Bvc2UgPT0gbnVsbCAmJiBzcGluZUNhbnRhaW5lci5jYW5ub25UeXBlID09IHJlcy5jYW5ub25UeXBlKXsvL2lzRGlzcG9zZT0x5YiZ5Li65q2j5Zyo6ZSA5q+B55qE6Lev5LiK44CB5ZCM5qC357G75Z6LXHJcbiAgICAgICAgICAgICAgICBpZihyZXMudG90YWwgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5jdXJyQ29pbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tcInJ1blNwZWNpYWxcIityZXMuc2VhdE51bV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lciA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyICA9IGNvaW5Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZUNhbnRhaW5lclwiK3Jlcy5zZWF0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lciAhPSBudWxsICYmIHNwaW5lQ2FudGFpbmVyLl9jb21wb25lbnRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BpbmVjID0gc3BpbmVDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUocmVzLnNlYXROdW0gPT0gdGhpcy5sb2dpYy5zZWF0TnVtID8gXCJnb2xkX2xhYlwiIDogXCJzaWx2ZXJfbGFiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcGluZWMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BpbmVjLl9jb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiBzcGluZWMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiID0gc3BpbmVjLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRDb2luID0gbGFiLnN0cmluZyA9PSB1bmRlZmluZWQgfHwgbGFiLnN0cmluZyA9PSBcIlwiID8gMCA6IE51bWJlcihsYWIuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuc3RhcnRSdW4gPSByZXMudG90YWxSZXdhcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwaW5lQ2FudGFpbmVyLmN1cnJDb2luID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPSBOdW1iZXIob2xkQ29pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tcInJ1blNwZWNpYWxcIityZXMuc2VhdE51bV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiIOe7n+iuoeahhuW3sue7j+S4jeWtmOWcqCDnu5/orqHplJnor6/vvIEgcmVzIFwiLHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sMC4yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7Ly/muIXnkIZcclxuICAgICAgICAgICAgICAgIHRoaXNbXCJydW5TcGVjaWFsXCIrcmVzLnNlYXROdW1dID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjb2luQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNwaW5lQ2FudGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3BpbmVDYW50YWluZXIgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXNbXCJydW5TcGVjaWFsXCIrcmVzLnNlYXROdW1dID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzcGluZV9lZmZlY3QgICAgICAgID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BpbmVfZWZmZWN0XCIpO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lciAgICAgICAgICA9IGNjLmluc3RhbnRpYXRlKHNwaW5lX2VmZmVjdC5nZXRDaGlsZEJ5TmFtZShcInNwaW5lX3NwZWNpYUNvaW5OdW1cIikpO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5jYW5ub25UeXBlID0gcmVzLmNhbm5vblR5cGU7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLm9sZFNjYWxlID0gc3BpbmVDYW50YWluZXIuc2NhbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IE5vdE9wYWNpdHkgICAgICAgID0gMDtcclxuICAgICAgICAgICAgY29uc3QgTm90U2NhbGUgICAgICAgICAgPSAwO1xyXG5cclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuYWN0aXZlICAgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5wb3NpdGlvbiA9IHVpX2NvaW5FZmZlY3RQb3MuZ2V0Q2hpbGRCeU5hbWUoXCJzdGF0aXN0aWNzUG9zXCIrcmVzLnNlYXROdW0pLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5uYW1lICAgICA9IFwic3BpbmVDYW50YWluZXJcIityZXMuc2VhdE51bTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIub3BhY2l0eSAgPSBOb3RPcGFjaXR5O1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zY2FsZSAgICA9IE5vdFNjYWxlO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5hbmdsZSA9IDE4MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb2luQ29udGFpbmVyLmFkZENoaWxkKHNwaW5lQ2FudGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IE5vcm1hbE9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIGNvbnN0IFFTY2FsZSAgICAgICAgPSAyO1xyXG4gICAgICAgICAgICBjb25zdCBOb3JtYWxTY2FsZSAgID0gc3BpbmVDYW50YWluZXIub2xkU2NhbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IEZhZGVUaW1lICAgICAgPSAwLjI7XHJcbiAgICAgICAgICAgIGNvbnN0IFNjYWxUVGltZSAgICAgPSAwLjI7XHJcblxyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgYWN0ID0gY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2MuZmFkZVRvKEZhZGVUaW1lLE5vcm1hbE9wYWNpdHkpLGNjLnNjYWxlVG8oU2NhbFRUaW1lLFFTY2FsZSkpLGNjLnNjYWxlVG8oU2NhbFRUaW1lLE5vcm1hbFNjYWxlKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/mkq3mlL7np7vliqjnkINcclxuICAgICAgICAgICAgICAgIGNvbnN0IFNjYWxlID0gMS4zMztcclxuICAgICAgICAgICAgICAgIGxldCBsYXNlckJvcm5FZmZlY3QgID0gdGhpcy5sb2dpYy5jcmVhdG9yRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBsYXNlckJvcm5FZmZlY3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LnNldFBvc2l0aW9uKHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0XCIpLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5zY2FsZSA9IFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuYWRkQ2hpbGQobGFzZXJCb3JuRWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGxldCBtY05hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzUm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoTnVtYmVyKHJlcy5jYW5ub25UeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09OU1QuQ2Fubm9uVHlwZS5MaWdodG5pbmcgOiAgIC8vIOmXqueUtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtY05hbWUgPSBDT05TVC5DYW5ub25HZXRFZGRlY3QuTGlnaHRuaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuUGFydGlhbEJvbWIgOiAvLyDngo7niIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNOYW1lID0gQ09OU1QuQ2Fubm9uR2V0RWRkZWN0LlBhcnRpYWxCb21iO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTGFzZXIgOiAgICAgICAvLyDpvpnmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNOYW1lID0gQ09OU1QuQ2Fubm9uR2V0RWRkZWN0Lkxhc2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTlNULkNhbm5vblR5cGUuTWlzc2lsZSA6ICAgICAvLyDku5nliZFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNOYW1lID0gQ09OU1QuQ2Fubm9uR2V0RWRkZWN0Lk1pc3NpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gMC45NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LnkgPSAtMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgTWluID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1heCA9IDU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBMb29wVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBJc0hhdmVaZXJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBTcGVlZCA9IDAuMTI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBQYXlFZFJlbW92ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxhc2VyQm9ybkVmZmVjdC5zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNSbyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjksY2MudjIobGFzZXJCb3JuRWZmZWN0LngsbGFzZXJCb3JuRWZmZWN0LnkrNikpLGNjLm1vdmVUbygwLjksY2MudjIobGFzZXJCb3JuRWZmZWN0LngsbGFzZXJCb3JuRWZmZWN0LnktNikpKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzZXJCb3JuRWZmZWN0LmdldENvbXBvbmVudChcIm5maXNoX01vdmllQ2xpcFwiKS5pbml0RWZmZWN0KHRoaXMubGFzZXJCb3JuRWZmZWN0X0F0bGFzLG1jTmFtZSxNaW4sTWF4LExvb3BUaW1lLElzSGF2ZVplcm8sU3BlZWQsUGF5RWRSZW1vdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IEZyZXF1ZW5jeSA9IDEwOyAvL+iuvue9rumikeeOhyDor7vmlbDmrKHmlbAgMTAg5qyhXHJcbiAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5mcmVxdWVuY3kgPSByZXMudG90YWwvRnJlcXVlbmN5O1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmlzb2ZmTmV0ID09IG51bGwpey8v6Z2e5pat57q/6YeN6L+eXHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvIDlp4vov5vooYzluqbmlbBcclxuICAgICAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zdGFydFJ1biA9IE51bWJlcihyZXMudG90YWxSZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmN1cnJDb2luID0gMDsvL+ivu+aVsOW9k+WJjeaMh+mSiOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbXCJydW5TcGVjaWFsXCIrcmVzLnNlYXROdW1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLnN0YXJ0UnVuID0gTnVtYmVyKHJlcy50b3RhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPSByZXMudG90YWw7Ly/or7vmlbDlvZPliY3mjIfpkojlgLxcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiTmFtZSA9IHJlcy5zZWF0TnVtID09IHRoaXMubG9naWMuc2VhdE51bSA/IFwiZ29sZF9sYWJcIiA6IFwic2lsdmVyX2xhYlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKGxhYk5hbWUpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzLnRvdGFsK1wiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIucnVuQWN0aW9uKGFjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5byA5aeL6K+75pWwXHJcbiAgICBydW5TcGVjaWFsQnVsbGV0U3RhdGlzdGljcyhkdCl7XHJcbiAgICAgICAgY29uc3QgVXNlck1heCA9IDQ7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8VXNlck1heDtpKyspe1xyXG4gICAgICAgICAgICBpZighdGhpc1tcInJ1blNwZWNpYWxcIitpXSl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3BpbmVDYW50YWluZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0Q29udGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwic3BpbmVDYW50YWluZXJcIitpKTtcclxuICAgICAgICAgICAgaWYoc3BpbmVDYW50YWluZXIgIT0gbnVsbCAmJiBzcGluZUNhbnRhaW5lci5jdXJyQ29pbiAhPSBudWxsICYmIHNwaW5lQ2FudGFpbmVyLmN1cnJDb2luICE9IHVuZGVmaW5lZCAmJiBzcGluZUNhbnRhaW5lci5zdGFydFJ1biAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmN1cnJDb2luICs9ICBOdW1iZXIoc3BpbmVDYW50YWluZXIuZnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgIGxldCBsYWIgPSBzcGluZUNhbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShpID09IHRoaXMubG9naWMuc2VhdE51bSA/IFwiZ29sZF9sYWJcIiA6IFwic2lsdmVyX2xhYlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9sZENvaW4gPSBsYWIuc3RyaW5nID09IHVuZGVmaW5lZCB8fCBsYWIuc3RyaW5nID09IFwiXCIgPyAwIDogTnVtYmVyKGxhYi5zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPj0gc3BpbmVDYW50YWluZXIuc3RhcnRSdW4pey8v6K+75pWw5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BpbmVDYW50YWluZXIuc3RhcnRSdW4gPiBvbGRDb2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJTdGFydE51bSA9IHNwaW5lQ2FudGFpbmVyLnN0YXJ0UnVuK1wiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN1cnJTdGFydE51bS5pbmRleE9mKFwiLlwiKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWIuc3RyaW5nID0gTnVtYmVyKHNwaW5lQ2FudGFpbmVyLnN0YXJ0UnVuKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYi5zdHJpbmcgPSBzcGluZUNhbnRhaW5lci5zdGFydFJ1bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiPj4+Pj4yLiDorqHliIbmiJDlip8gPT09PT0+IGVuZCBzdGFydFJ1biBcIitzcGluZUNhbnRhaW5lci5zdGFydFJ1bilcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCI+Pj4gMy4g6K6h5pWw5aSx6LSlID09PT09PiA6IFwiK3NwaW5lQ2FudGFpbmVyLmN1cnJDb2luK1wiIOW9k+WJjeaVsDogXCIrb2xkQ29pbilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIH1lbHNley8v5q2j5Zyo6K+75pWwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPiBvbGRDb2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJTdGFydE51bSA9IHNwaW5lQ2FudGFpbmVyLmN1cnJDb2luK1wiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN1cnJTdGFydE51bS5pbmRleE9mKFwiLlwiKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWIuc3RyaW5nID0gY3VyclN0YXJ0TnVtLnNwbGl0KFwiLlwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWIuc3RyaW5nID0gc3BpbmVDYW50YWluZXIuY3VyckNvaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5riF6Zmk54m55q6K5a2Q5by5XHJcbiAgICBjbGVhclNwZWNpYWxIYW5kbGVyKHNlYXROdW0pe1xyXG4gICAgICAgIGNvbnN0IERlYXlUaW1lID0gMS41O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGxldCBsYXN0Q2FublR5cGUgPSBOdW1iZXIodGhpcy5sb2dpYy5zcGVjaWFsQnVsbGV0UG9vbFtzZWF0TnVtXSArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5sb2dpYy5zcGVjaWFsQnVsbGV0UG9vbFtzZWF0TnVtXTsvL+agueaNruinhOWIme+8muavj+S4queOqeWutuWQjOWxj+S4i+WPquWFgeiuuOacieS4gOS4queJueauiuWtkOW8uVxyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gc2VhdE51bSljYy53YXJuKFwiPT09IOWIoOmZpOeJueauiuWtkOW8ueeKtuaAgSA9PT09PT09PT09PT0gc2VhdE51bSBcIitzZWF0TnVtK1wiIGxhc3RDYW5uVHlwZSBcIitsYXN0Q2FublR5cGUpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuY2hlY2tTcGVjaWFsQnVsbGV0KTtcclxuICAgICAgICB9LERlYXlUaW1lKTtcclxuICAgIH0sXHJcbiAgICAvL+ajgOafpeW9k+WJjeiuoeaVsOWZqOiuoeaVsOWujOaIkOS5i+WQjuaYr+WQpumcgOimgemUgOavgVxyXG4gICAgY2hlY2tTcGVjaWFsQnVsbGV0SGFuZGxlcigpe1xyXG4gICAgICAgIGxldCBpc0Rpc1NwZWNpYWwgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IFVzZXJNYXggPSA0O1xyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPFVzZXJNYXg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IHNwaW5lQ2FudGFpbmVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdENvbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInNwaW5lQ2FudGFpbmVyXCIraSk7XHJcbiAgICAgICAgICAgIGlmKHNwaW5lQ2FudGFpbmVyICE9IG51bGwgJiYgc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPT0gbnVsbCl7IC8v5aaC5p6c6K6h5pWw5Zmo5a2Y5ZyoLOW5tuS4lCDor7vmlbDlrozmiJBcclxuICAgICAgICAgICAgICAgIGxldCBpc0xldmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubG9naWMucGxheWVySW5mbyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllckluZm8gPSB0aGlzLmxvZ2ljLnBsYXllckluZm9ba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJJbmZvICE9IG51bGwgJiYgTnVtYmVyKHBsYXllckluZm8uc2VhdE51bSkgPT0gaSkgey8v5oyJ54Wn5bqn5L2N5om+5Yiw5b2T5YmN55So5oi36Lqr5LiK55qE5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTGV2ZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsQnVsbGV0UG9vbFtpXSA9PSB1bmRlZmluZWQgJiYgdGhpcy5sb2dpYy5zcGVjaWFsQnVsbGV0UG9vbFtpXSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwaW5lQ2FudGFpbmVyLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5NaXNzaWxlKSB7Ly/ku5nliZHlrZDlvLkg55qE6ZSA5q+B6YC76L6RIOimgeeJueauiuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckluZm8uY2Fubm9uQW1vdW50ICE9IHVuZGVmaW5lZCAmJiBwbGF5ZXJJbmZvLmNhbm5vbkFtb3VudCA9PSAwKXsvL+WmguaenOW9k+WJjeayoeacieS7meWJkeWtkOW8ueWcqOmjnuOAgeW5tuS4lOi6q+S4iuW3sue7j+ayoeacieS6huWtkOW8uVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Rpc1NwZWNpYWwgPSBcIj09PT09PT0gMSDnu5Pmnpwg5LuZ5YmR57uT5p2fICBzZWF0TnVtIFwiK2krXCIgbXlTZWF0TnVtIFwiK3RoaXMubG9naWMuc2VhdE51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IGkpIGNjLmVycm9yKFwiPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+ICAxMTExIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzQ2xlYXIocGxheWVySW5mbyk7Ly/lvIDlp4vplIDmr4FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJJbmZvLmNhbm5vblR5cGUgPT0gQ09OU1QuQ2Fubm9uVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzU3BlY2lhbCA9IFwiPT09PT09PSAyIOe7k+aenCDlvZPliY3mmK/mma7pgJrlrZDlvLkgc2VhdE51bSBcIitpK1wiIG15U2VhdE51bSBcIit0aGlzLmxvZ2ljLnNlYXROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IGkpY2MuZXJyb3IoXCI+Pj4+ICAyMjIyLjEgIOW9k+WJjeaYr+aZrumAmuWtkOW8uSBwbGF5ZXJJbmZvIFwiK3BsYXllckluZm8uY2Fubm9uVHlwZSxcIiBwbGF5ZXJJbmZvIFwiLHBsYXllckluZm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsQnVsbGV0U3RhdGlzdGljc0NsZWFyKHBsYXllckluZm8pOy8v5byA5aeL6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lci5jYW5ub25UeXBlICE9IHBsYXllckluZm8uY2Fubm9uVHlwZSl7Ly/lpoLmnpzlvZPliY3nu5/orqHmoYbnmoTnsbvlnovlkozouqvkuIrlrZDlvLnnsbvlnovkuI3kuIDmoLdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Rpc1NwZWNpYWwgPSBcIj09PT09PT09IDMg57uT5p6cIOWIh+aNouS6hiDlrZDlvLkgc2VhdE51bVwiK2krXCIgbXlTZWF0TnVtIFwiK3RoaXMubG9naWMuc2VhdE51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gaSljYy5lcnJvcihcIj4+Pj4gIDMzMzMgIOW9k+WJjeaYr+aZrumAmuWtkOW8uSBwbGF5ZXJJbmZvIFwiK3BsYXllckluZm8uY2Fubm9uVHlwZSxcIiBwbGF5ZXJJbmZvIFwiLHBsYXllckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbEJ1bGxldFN0YXRpc3RpY3NDbGVhcihwbGF5ZXJJbmZvKTsvL+W8gOWni+mUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGlzTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzU3BlY2lhbCA9IFwiPT09PT09IDQg57uT5p6cIOeUqOaIt+emu+W8gCBzZWF0TnVtIFwiK2krXCIgbXlTZWF0TnVtIFwiK3RoaXMubG9naWMuc2VhdE51bTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzQ2xlYXIoe3NlYXROdW06aX0pOy8v5byA5aeL6ZSA5q+BXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/plIDmr4EgLSDorqHmlbDlmagg5Y+W5raI6K6h566X5pWw5a2XIC0g5Y2H57qn5Yiw5omA5pyJ5a2Q5by56ZSA5q+BXHJcbiAgICBzcGVjaWFsQnVsbGV0U3RhdGlzdGljc0NsZWFyKHJlcyl7XHJcbiAgICAgICAgdGhpc1tcInJ1blNwZWNpYWxcIityZXMuc2VhdE51bV0gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdWlfY29pbkVmZmVjdENvbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHNwaW5lQ2FudGFpbmVyID0gdWlfY29pbkVmZmVjdENvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcInNwaW5lQ2FudGFpbmVyXCIrcmVzLnNlYXROdW0pO1xyXG5cclxuICAgICAgICBpZihzcGluZUNhbnRhaW5lciAhPSBudWxsICYmIHNwaW5lQ2FudGFpbmVyLmlzRGlzcG9zZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtKWNjLmVycm9yKFwiPj4+IOato+WcqOmUgOavgSAtLS0tc2VhdE51bSBcIityZXMuc2VhdE51bSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3BpbmVDYW50YWluZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmlzRGlzcG9zZSA9IDE7XHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSByZXMuc2VhdE51bSljYy5lcnJvcihcIj09PT09PT09PT09PT09PT09PT3plIDmr4EgY2Fubm9uVHlwZSA6IFwiK3NwaW5lQ2FudGFpbmVyLmNhbm5vblR5cGUrXCIgc2VhdE51bSBcIityZXMuc2VhdE51bSlcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5sb2dpYy5zZWF0TnVtID09IHJlcy5zZWF0TnVtKWNjLmVycm9yKFwiXCIpO1xyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmxvZ2ljLnNlYXROdW0gPT0gcmVzLnNlYXROdW0pY2MuZXJyb3IoXCJcIik7XHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSByZXMuc2VhdE51bSljYy5lcnJvcihcIlwiKTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuY3VyckNvaW4gPSBudWxsO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5sYXN0Y3VyckNvaW4gPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBEZWxheVRpbWUgID0gMC45O1xyXG4gICAgICAgICAgICBjb25zdCBGYWRlVG9UaW1lID0gMC4yO1xyXG4gICAgICAgICAgICBjb25zdCBGYWRlVG9BcmcgID0gMDtcclxuICAgICAgICAgICAgY29uc3QgRGVsYXlUaW1lMiA9IDI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIgPSB1aV9jb2luRWZmZWN0Q29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwic3BpbmVDYW50YWluZXJcIityZXMuc2VhdE51bSk7XHJcbiAgICAgICAgICAgICAgICBpZihzcGluZUNhbnRhaW5lciAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpX2NvaW5FZmZlY3RDb250YWluZXIucmVtb3ZlQ2hpbGQoc3BpbmVDYW50YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxEZWxheVRpbWUrKEZhZGVUb1RpbWUqRGVsYXlUaW1lMikpO1xyXG5cclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgc3BpbmVDYW50YWluZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShEZWxheVRpbWUpLGNjLmZhZGVUbyhGYWRlVG9UaW1lLEZhZGVUb0FyZykpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICB1aV9jb2luRWZmZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkKHNwaW5lQ2FudGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgc3BpbmVDYW50YWluZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuc2VhdE51bSA9PSByZXMuc2VhdE51bSl7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIj4+6ZSA5q+BIOWksei0pSBcIityZXMuc2VhdE51bStcIiAgc3BpbmVDYW50YWluZXIgaXMgbnVsbCAgPj4gc3BpbmVDYW50YWluZXIgXCIsc3BpbmVDYW50YWluZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YW25LuW5Lq655qEIOWmguaEjyDogZrlrp3puY8g5bGV56S6XHJcbiAgICBvUFNTQUhhbmRsZXIocmVzKXtcclxuICAgICAgICBjb25zdCBOb3JtYWxPcGFjaXR5ICA9IDI1NTtcclxuICAgICAgICBsZXQgZWZmZWN0Q29udGFpbmVyICA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHNwaW5lX2VmZmVjdCAgICAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcGluZV9lZmZlY3RcIik7XHJcbiAgICAgICAgbGV0IHR5cGUgICAgICAgICAgICAgPSByZXMudHlwZTtcclxuICAgICAgICBsZXQgdHlwZU5hbWUgICAgICAgICA9IHR5cGUgPT0gQ09OU1QuQXdhcmRUeXBlLlJVWUkgPyBcIll1UnVcIiA6IFwianVCYW9cIjtcclxuICAgICAgICBsZXQgc2VhdE51bSAgICAgICAgICA9IHJlcy5zZWF0TnVtO1xyXG4gICAgICAgIGxldCBwb3NQcmVOYW1lICAgICAgID0gdHlwZSA9PSBDT05TVC5Bd2FyZFR5cGUuUlVZSSA/IFwieXVSdVBvc1wiIDogXCJqdUJhb1Bvc1wiO1xyXG4gICAgICAgIGxldCB1aV9jb2luRWZmZWN0UG9zID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdFBvc1wiKTtcclxuICAgICAgICBsZXQgbm9kZU5hbWUgICAgICAgICA9IHR5cGVOYW1lK3NlYXROdW07XHJcbiAgICAgICAgbGV0IHBvc05hbWUgICAgICAgICAgPSBwb3NQcmVOYW1lK3NlYXROdW07XHJcbiAgICAgICAgbGV0IHRhcmdldFBvc2l0aW9uO1xyXG4gICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgcG9zUHJlTmFtZSAgICAgICA9IHR5cGUgPT0gQ09OU1QuQXdhcmRUeXBlLlJVWUkgPyBcInl1UnVQb3NfUl9cIiA6IFwianVCYW9Qb3NfUl9cIjtcclxuICAgICAgICAgICAgcG9zTmFtZSAgICAgICAgICA9IHBvc1ByZU5hbWUrc2VhdE51bTtcclxuICAgICAgICAgICAgdGFyZ2V0UG9zaXRpb24gPSB1aV9jb2luRWZmZWN0UG9zLmdldENoaWxkQnlOYW1lKHBvc05hbWUpLnBvc2l0aW9uO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0YXJnZXRQb3NpdGlvbiA9IHVpX2NvaW5FZmZlY3RQb3MuZ2V0Q2hpbGRCeU5hbWUocG9zTmFtZSkucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcGluZUNhbnRhaW5lciAgID0gZWZmZWN0Q29udGFpbmVyLmdldENoaWxkQnlOYW1lKG5vZGVOYW1lKTtcclxuICAgICAgICBpZihzcGluZUNhbnRhaW5lciA9PSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IHNwaW5lTmFtZSAgICAgICAgID0gdHlwZSA9PSBDT05TVC5Bd2FyZFR5cGUuUlVZSSA/IFwic3BpbmVfWXVSdVwiIDogXCJzcGluZV9KdUJhb1wiO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lciAgICAgICAgPSBjYy5pbnN0YW50aWF0ZShzcGluZV9lZmZlY3QuZ2V0Q2hpbGRCeU5hbWUoc3BpbmVOYW1lKSk7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLm5hbWUgICA9IG5vZGVOYW1lO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zZXRQb3NpdGlvbih0YXJnZXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGVmZmVjdENvbnRhaW5lci5hZGRDaGlsZChzcGluZUNhbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmFuZ2xlID0gMTgwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLm9wYWNpdHkgPSBOb3JtYWxPcGFjaXR5O1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0U2hvd1NwYWNpbChyZXMsdHlwZSxzcGluZUNhbnRhaW5lcik7XHJcbiAgICB9LFxyXG4gICAgLy/lvIDlp4vmmL7npLog54m55q6KXHJcbiAgICBzdGFydFNob3dTcGFjaWwocmVzLHR5cGUsc3BpbmVDYW50YWluZXIpe1xyXG4gICAgICAgIGlmKHR5cGUgPT0gQ09OU1QuQXdhcmRUeXBlLlJVWUkpe1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMSwgMSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoNiksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHlHb2xkRWZmZWN0Rm9yU3BhY2lsKHJlcylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzcGluZUNhbnRhaW5lci5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwgMSwgMSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoNiksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHlHb2xkRWZmZWN0Rm9yU3BhY2lsKHJlcylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6aOe6YeR5biBXHJcbiAgICBmbHlHb2xkRWZmZWN0Rm9yU3BhY2lsKHJlcyl7XHJcbiAgICAgICAgbGV0IHR5cGUgICAgICAgICAgICAgPSByZXMudHlwZTtcclxuICAgICAgICBsZXQgc2VhdE51bSAgICAgICAgICA9IHJlcy5zZWF0TnVtO1xyXG4gICAgICAgIGxldCB0eXBlTmFtZSAgICAgICAgID0gdHlwZSA9PSBDT05TVC5Bd2FyZFR5cGUuUlVZSSA/IFwiWXVSdVwiIDogXCJqdUJhb1wiO1xyXG4gICAgICAgIGxldCBwb3NQcmVOYW1lICAgICAgID0gdHlwZSA9PSBDT05TVC5Bd2FyZFR5cGUuUlVZSSA/IFwieXVSdVBvc1wiIDogXCJqdUJhb1Bvc1wiO1xyXG4gICAgICAgIGxldCB1aV9jb2luRWZmZWN0UG9zID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfY29pbkVmZmVjdFBvc1wiKTtcclxuICAgICAgICBsZXQgc3RhcnRQb3MgICAgICAgICA9IHVpX2NvaW5FZmZlY3RQb3MuZ2V0Q2hpbGRCeU5hbWUocG9zUHJlTmFtZStzZWF0TnVtKS5wb3NpdGlvbjtcclxuICAgICAgICBsZXQgZWZmZWN0Q29udGFpbmVyICA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2NvaW5FZmZlY3RDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IGNvaW5Db250YWluZXIgICAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aV9jb2luRWZmZWN0Q29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCBwcmUgICAgICAgICAgICAgID0gdGhpcy5sb2dpYy5nZXRJc1JvdGF0aW9uKCkgPyBcImNvaW5GbHlSXCIgOiBcImNvaW5GbHlcIjtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zaXRpb24gICA9IHVpX2NvaW5FZmZlY3RQb3MuZ2V0Q2hpbGRCeU5hbWUocHJlK3NlYXROdW0pLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBzcGluZUNhbnRhaW5lciAgID0gZWZmZWN0Q29udGFpbmVyLmdldENoaWxkQnlOYW1lKHR5cGVOYW1lK3NlYXROdW0pO1xyXG4gICAgICAgIGNvbnN0IE11bHRpcGxlID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IE1heENvaW4gPSAyMDsvL+acgOWkp+aVsOmHj1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0Q29pbiA9IE1hdGguY2VpbChyZXMucmV3YXJkR29sZCAvIE11bHRpcGxlKTtcclxuICAgICAgICBpZiAoZWZmZWN0Q29pbiA+IE1heENvaW4pIHtcclxuICAgICAgICAgICAgZWZmZWN0Q29pbiA9IE1heENvaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBTdGFydE5hbWUgPSAxO1xyXG4gICAgICAgIGNvbnN0IGVuZE5hbWUgPSAxNjtcclxuICAgICAgICBjb25zdCBwbHlUaW1lID0gMztcclxuICAgICAgICBjb25zdCBpc0hhdmVaZXJvID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjAzNTtcclxuICAgICAgICBjb25zdCBwbHllZERlc3Ryb3kgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBpc1JhbmRvbVBseSA9IDE7XHJcblxyXG4gICAgICAgIGNvbnN0IFJhbmRvbU9mZnNleFggPSAzMDtcclxuICAgICAgICBjb25zdCBSYW5kb21PZmZzZXhZID0gNTA7XHJcbiAgICAgICAgY29uc3QgUmFuZG9tTWluWSA9IDIwO1xyXG5cclxuICAgICAgICBjb25zdCBPbmVEZWxheVRpbWUgPSAwLjE7XHJcbiAgICAgICAgY29uc3QgVHdvRGVsYXlUaW1lID0gMC4wNTtcclxuICAgICAgICBjb25zdCBTY2FsZVRvVGltZSA9IDE7XHJcbiAgICAgICAgY29uc3QgQmV6aWVyVG9UaW1lID0gMC43O1xyXG4gICAgICAgIGNvbnN0IFNjYWxlVG9BcmcgPSAwLjg7XHJcbiAgICAgICAgY29uc3QgRmFkZVRvVGltZSA9IDAuMTtcclxuICAgICAgICBjb25zdCBNb3ZlVG9UaW1lID0gMC4xNTtcclxuICAgICAgICBjb25zdCBFbmRPcGFjaXR5ID0gMjU1O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVmZmVjdENvaW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdWlfQ29pbkVmZmVjdCA9IHRoaXMubG9naWMuY3JlYXRvckVmZmVjdCgpO1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnggPSBzdGFydFBvcy54O1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnkgPSBzdGFydFBvcy55O1xyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdWlfQ29pbkVmZmVjdC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgbGV0IHBsYXlOYW1lID0gXCJzaWx2ZXJcIjtcclxuXHJcbiAgICAgICAgICAgIHVpX0NvaW5FZmZlY3QuZ2V0Q29tcG9uZW50KFwibmZpc2hfTW92aWVDbGlwXCIpLmluaXRFZmZlY3QodGhpcy5tb25leUVmZmVjdF9BdGxhcywgcGxheU5hbWUsIFN0YXJ0TmFtZSwgZW5kTmFtZSwgcGx5VGltZSwgaXNIYXZlWmVybywgc3BlZWQsIHBseWVkRGVzdHJveSwgbnVsbCwgaXNSYW5kb21QbHkpO1xyXG5cclxuICAgICAgICAgICAgY29pbkNvbnRhaW5lci5hZGRDaGlsZCh1aV9Db2luRWZmZWN0KTtcclxuICAgICAgICAgICAgbGV0IHVwUG9zID0gY2MudjIodWlfQ29pbkVmZmVjdC5wb3NpdGlvbi54ICsgTWF0aC5yYW5kb20oKSAqIFJhbmRvbU9mZnNleFgsIHVpX0NvaW5FZmZlY3QucG9zaXRpb24ueSArIE1hdGgucmFuZG9tKCkgKiBSYW5kb21PZmZzZXhZICsgUmFuZG9tTWluWSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzLnNlYXROdW0gPT0gQ09OU1QuU2VhdC5MZWZ0VG9wIHx8IHJlcy5zZWF0TnVtID09IENPTlNULlNlYXQuUmlnaHRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHVwUG9zID0gY2MudjIodWlfQ29pbkVmZmVjdC5wb3NpdGlvbi54ICsgTWF0aC5yYW5kb20oKSAqIFJhbmRvbU9mZnNleFgsIHVpX0NvaW5FZmZlY3QucG9zaXRpb24ueSAtIChNYXRoLnJhbmRvbSgpICogUmFuZG9tT2Zmc2V4WSArIFJhbmRvbU1pblkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYm91bmNlQWN0MSA9IGNjLnNwYXduKGNjLmZhZGVUbyhGYWRlVG9UaW1lLCBFbmRPcGFjaXR5KSwgY2MubW92ZVRvKE1vdmVUb1RpbWUsIHVpX0NvaW5FZmZlY3QucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgbGV0IGJvdW5jZUFjdDIgPSBjYy5tb3ZlVG8oTW92ZVRvVGltZSwgdXBQb3MpO1xyXG4gICAgICAgICAgICBsZXQgYmV6aWVyUG9pbnQgPSBjYy52Mih0YXJnZXRQb3NpdGlvbi54LCB1aV9Db2luRWZmZWN0LnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBsZXQgYWN0ID0gY2Muc3Bhd24oY2Muc2NhbGVUbyhTY2FsZVRvVGltZSwgU2NhbGVUb0FyZywgU2NhbGVUb0FyZyksIGNjLmJlemllclRvKEJlemllclRvVGltZSwgW3VwUG9zLCBiZXppZXJQb2ludCwgY2MudjIodGFyZ2V0UG9zaXRpb24ueCwgdGFyZ2V0UG9zaXRpb24ueSldKSk7XHJcblxyXG4gICAgICAgICAgICB1aV9Db2luRWZmZWN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoaSAqIE9uZURlbGF5VGltZSksIGJvdW5jZUFjdDEsIGJvdW5jZUFjdDIsIGFjdCwgY2MuZGVsYXlUaW1lKGkgKiBUd29EZWxheVRpbWUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1aV9Db2luRWZmZWN0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVuZEdvbGRUaW1lID0gZWZmZWN0Q29pbiAqIE9uZURlbGF5VGltZSArIGVmZmVjdENvaW4gKiBUd29EZWxheVRpbWU7Ly/mnIDlkI7kuIDkuKrph5HluIHmvILnp7vnmoTml7bpl7RcclxuICAgICAgICBjb25zdCBIaWRlT3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc3BpbmVDYW50YWluZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBzcGluZUNhbnRhaW5lci5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZShlbmRHb2xkVGltZSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC41LCAwLCAwKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHNwaW5lQ2FudGFpbmVyLm9wYWNpdHkgPSBIaWRlT3BhY2l0eTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKTtcclxuICAgIH0sXHJcbiAgICAvL+mjmOWIhlxyXG4gICAgYWRkR29sZEVmZmVjdEhhbmRsZXIocmVzKXtcclxuICAgICAgICB0aGlzLmFkZEdvbGRFZmZlY3QoMCxyZXMpXHJcbiAgICB9LFxyXG4gICAgLy/lhYXlgLzliLDotKbotKLnpZ7niLdcclxuICAgIG9uQ29pbkNoYW5nZWRIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgbGV0IG15aWQgPSBnbEdhbWUudXNlci51c2VySUQ7XHJcbiAgICAgICAgaWYocmVzLnVpZCA9PSBteWlkKXtcclxuICAgICAgICAgICAgbGV0IGFycnZhbENvaW4gPSB0aGlzLmxvZ2ljLmdldEZsb2F0KE51bWJlcihyZXMub2Zmc2V0KSk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoZ2xHYW1lLnNob3dHb2RPZldlYWx0aCx7cG9zOjMsY29pbjphcnJ2YWxDb2lufSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6Lef6ZqP6bG8VGlwIOaYvuekuiDpmJ/liJflpITnkIZcclxuICAgIGZvbGxvd0Zpc2hUaXBIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dGaXNoVGlwTGlzdC5wdXNoKHJlcyk7XHJcbiAgICB9LFxyXG4gICAgLy/muIXnkIbmmL7npLrpsbzmsJTms6FcclxuICAgIGNsZWFyRm9sbG93RmlzaFRpcEhhbmRsZXIocmVzKXtcclxuICAgICAgICBpZih0aGlzLnVpX3RpcCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aXBOYW1lID0gXCJmaXNoX3RpcF9cIityZXMuZmlzaElkO1xyXG4gICAgICAgIGxldCB0aXAgPSB0aGlzLnVpX3RpcC5nZXRDaGlsZEJ5TmFtZSh0aXBOYW1lKTtcclxuICAgICAgICBpZih0aXApe1xyXG4gICAgICAgICAgICB0aXAuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mb2xsb3dGaXNoVGlwTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93RmlzaFRpcExpc3RbaV0gIT0gbnVsbCAmJiB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldLmlkID09IHJlcy5maXNoSWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ot5/pmo/psbzmsJTms6Eg5b6q546v6Lef6ZqP5L2TXHJcbiAgICBmb2xsb3dGaXNoVGlwKGR0KXtcclxuICAgICAgICBpZih0aGlzLnVpX3BoeXNpY2FsUG9vbCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVpX3BoeXNpY2FsUG9vbCA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJuZmlzaF9kZXNrQ29udGFpbmVyXCIpLmdldENoaWxkQnlOYW1lKFwidWlfcGh5c2ljYWxQb29sXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnVpX3RpcCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVpX3RpcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2Zpc2hUaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93RmlzaFRpcExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuZm9sbG93RmlzaFRpcExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaElkID0gdGhpcy5mb2xsb3dGaXNoVGlwTGlzdFtpXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaCA9IHRoaXMudWlfcGh5c2ljYWxQb29sLmdldENoaWxkQnlOYW1lKFwiXCIrZmlzaElkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlwTmFtZSA9IFwiZmlzaF90aXBfXCIrZmlzaElkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpc2hJZCAmJiBmaXNoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy51aV90aXAuZ2V0Q2hpbGRCeU5hbWUodGlwTmFtZSkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpc2hUaXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLm5hbWUgPSB0aXBOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVpX3RpcC5hZGRDaGlsZCh0aXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYWIgPSB0aXAuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImxhYlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpcC53aWR0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuZm9sbG93RmlzaFRpcExpc3RbaV0uc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAud2lkdGggID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mb2xsb3dGaXNoVGlwTGlzdFtpXS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vdGVzdCDku6PnoIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldLmRhdGEuZmlzaE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldLmRpcmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYi5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9naWMuZ2V0SXNSb3RhdGlvbigpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuYW5nbGUgPSAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwID0gdGhpcy51aV90aXAuZ2V0Q2hpbGRCeU5hbWUodGlwTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLnNldFBvc2l0aW9uKGZpc2gucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldLnRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93RmlzaFRpcExpc3RbaV0udGltZSA8PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihmaXNoID09IHVuZGVmaW5lZCAmJiB0aGlzLnVpX3RpcC5nZXRDaGlsZEJ5TmFtZSh0aXBOYW1lKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51aV90aXAuZ2V0Q2hpbGRCeU5hbWUodGlwTmFtZSkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0Zpc2hUaXBMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liKTmlq3pgIDlh7og54m55q6K6bG85p2l5LqGIOaYvuekuuWAkuiuoeaXtu+8jGJvc3PmnaXkuoYg5pKt5pS+54m55pWIXHJcbiAgICB1cGRhdGUoZHQpe1xyXG4gICAgICAgIHRoaXMuZmlyZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYodGhpcy5maXJlVGltZSA+IHRoaXMuZmlyZVRpbWVGcmVxdWVuY3kpe1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpcmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJ1bGxldFRpcHMuYWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldFRpcFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IFNob3dNYXhUaW1lID0gMjtcclxuICAgICAgICAgICAgaWYodGhpcy5idWxsZXRUaXBUaW1lID49IFNob3dNYXhUaW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0VGlwcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0VGlwVGltZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMubG9naWMuaXNFbnRlclJvb20pe1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb2xsb3dGaXNoVGlwKGR0KTtcclxuICAgICAgICB0aGlzLnJ1blNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzKGR0KTtcclxuICAgICAgICBpZih0aGlzLmNsaWNrRmlzaFBvb2xFdmVudCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0Zpc2hQb29sVGltZSArPSBkdDtcclxuICAgICAgICAgICAgY29uc3QgTWF4Q2xpY2tGaXNoUG9vbFRpbWUgPSAwLjA1MztcclxuICAgICAgICAgICAgaWYodGhpcy5jbGlja0Zpc2hQb29sVGltZSA+IE1heENsaWNrRmlzaFBvb2xUaW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENsaWNrRmlzaFBvb2xIYW5kbGVyKHRoaXMuY2xpY2tGaXNoUG9vbEV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tGaXNoUG9vbEV2ZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tGaXNoUG9vbFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IENoYW5nZVNlY29uZCA9IDEwMDA7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLmxvZ2ljLmV4aXRUaW1lTXNnIC0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIHRoaXMubG9naWMuY3VyV2FpdFRpbWUpIC8gQ2hhbmdlU2Vjb25kKTtcclxuICAgICAgICBpZiAodGltZSA8IDAuOSAmJiB0aGlzLmlzRXhpdCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2ljLmlzRW50ZXJSb29tID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdsR2FtZS5yb29tLmV4aXRSb29tKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aW1lIDw9IHRoaXMubG9naWMuZXhpdFRpbWVNc2ctdGhpcy5sb2dpYy5zaG93VGltZU1zZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfRXhpdFRpcFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfRXhpdFRpcFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYl90aXAyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGltZSA+IDAgPyB0aW1lIDogMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRpbWUgPD0gdGhpcy5sb2dpYy5leGl0VGltZU1zZy10aGlzLmxvZ2ljLnNob3dUaW1lTXNnKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX0V4aXRUaXBcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEhhdmVTcGVjaWFsRmlzaCA9IDE7XHJcbiAgICAgICAgY29uc3QgVG9TZWNvbmQgICAgICAgID0gMTAwMDtcclxuICAgICAgICBjb25zdCBUaHJlZUhpZGVUaW1lICAgPSBUb1NlY29uZCAqIDM7XHJcbiAgICAgICAgY29uc3QgU2hvd1RpbWUgICAgICAgID0gVG9TZWNvbmQgKiAzMDtcclxuICAgICAgICBpZih0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5MZW4gPiBIYXZlU3BlY2lhbEZpc2ggJiYgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuICE9IG51bGwpey8v5pyJ54m55bGe6bG85Y2z5bCG5Ye655Sf77yM5pCe5Liq6K6h5pe25Zmo5pi+56S65LiLXHJcbiAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubG9naWMuc3BlY2lhbEZpc2hMaXN0Qm9ybil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLndlbGxCb3JuVGltZSAtPSBkdCAqIFRvU2Vjb25kO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUgPCAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLndlbGxCb3JuVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd1RpbWUgPSAgbmV3IERhdGUodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUpLkZvcm1hdChcIm1t77yac3NcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlwO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUgPiBIYXZlU3BlY2lhbEZpc2ggJiYgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUgPCBUaHJlZUhpZGVUaW1lKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5maXNoVHlwZUlkID09IENPTlNULkJvc3NHb2RPZldlYWx0aCAmJiB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmlzU2V0VGltZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfY3NyY2RoLnNldHRpbmdBY3RpdmVUaW1lID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5pc1NldFRpbWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc0xhdmFCYXNhbHQgJiYgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5pc1NldFRpbWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3J5eHdyY2RoLnNldHRpbmdBY3RpdmVUaW1lID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5pc1NldFRpbWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5maXNoVHlwZUlkID09IENPTlNULkJvc3NTWUxXICYmIHRoaXMubG9naWMuc3BlY2lhbEZpc2hMaXN0Qm9ybltpZF0uaXNTZXRUaW1lID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmlzU2V0VGltZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUgPiBIYXZlU3BlY2lhbEZpc2ggJiYgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS53ZWxsQm9yblRpbWUgPCBTaG93VGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwID0gdGhpcy5ib3NzQ29uZUluVGlwLmdldENoaWxkQnlOYW1lKGlkK1wiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRpcCA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwICAgICAgICAgICAgID0gY2MuaW5zdGFudGlhdGUodGhpcy5ib3NzQm9yblRpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5uYW1lICAgICAgICA9IGlkK1wiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5hY3RpdmUgICAgICA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpY29uICAgICAgICA9IHRpcC5nZXRDaGlsZEJ5TmFtZShcImNhbnRhaW5lclwiKS5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpc2hEYXRhMSAgID0gdGhpcy5sb2dpYy5qc29uX2Zpc2hUYWJsZVt0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmZpc2hUeXBlSWQrXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXNoRGF0YTIgICA9IHRoaXMubG9naWMuanNvbl9maXNoVGFibGVbTnVtYmVyKHRoaXMubG9naWMuc3BlY2lhbEZpc2hMaXN0Qm9ybltpZF0uZmlzaFR5cGVJZCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlzaERhdGEgICAgPSBmaXNoRGF0YTEgPT0gdW5kZWZpbmVkID8gZmlzaERhdGEyIDpmaXNoRGF0YTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNHcm91cElkICA9IGZpc2hEYXRhLnJlc0dyb3VwSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZWNpYUljb25fQXRsYXMuZ2V0U3ByaXRlRnJhbWUoQ09OU1QuU3BlY2lhUmVzUHJlK3Jlc0dyb3VwSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmdldElzUm90YXRpb24oKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uLmFuZ2xlID0gMTgwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9zc0NvbmVJblRpcC5hZGRDaGlsZCh0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAueCA9IHRpcC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5ydW5BY3Rpb24oY2MubW92ZVRvKHRoaXMuYm9zc1RpcE1vdmVUb1RpbWUsdGhpcy5ib3NzTm9ybWFsUG9zLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5nZXRDaGlsZEJ5TmFtZShcImxhYl9UaW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc2hvd1RpbWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5hY3RpdmUgPSAhdGhpcy5sb2dpYy5pc0Zpc2hUaWRlUnVuaW5nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwID0gdGhpcy5ib3NzQ29uZUluVGlwLmdldENoaWxkQnlOYW1lKGlkK1wiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRpcCAhPSBudWxsICYmIHRpcC5pc1J1biA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSXNIYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmFjdGl2ZSA9ICF0aGlzLmxvZ2ljLmlzRmlzaFRpZGVSdW5pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5pc1J1biA9IElzSGF2ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmdldENoaWxkQnlOYW1lKFwibGFiX1RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaG93VGltZSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyh0aGlzLmJvc3NUaXBNb3ZlVG9UaW1lLGNjLnYyKHRpcC53aWR0aCx0aXAueSkpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3NDb25lSW5UaXAucmVtb3ZlQ2hpbGQodGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc0dvZE9mV2VhbHRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0dvZE9mV2VhbHRoQ29pbik7Ly9CT1NT6K2m5ZGK6LSi56WeXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9jc3JjZGguZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ2xHYW1lLmZpc2hNdXRpcGxlQ2ZnID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IFwiMFwiOy8v5Ye6546w6L+Z5Liq5bCx5piv77ya5ou/5LiN5Yiw5pWw5o2u5oiW6ICF6YWN6KGo5Ye66ZSZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSAoZ2xHYW1lLmZpc2hNdXRpcGxlQ2ZnW0NPTlNULkJvc3NHb2RPZldlYWx0aF0rXCJcIikucmVwbGFjZShcIi1cIixcIn5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzY19sYWIgPSB0aGlzLnNwaW5lX2NzcmNkaC5nZXRDaGlsZEJ5TmFtZShcImxhYl9iZXREZXNjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGVzY19sYWIub2xkWCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NfbGFiLm9sZFggPSBkZXNjX2xhYi54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIueCA9IGRlc2NfbGFiLm9sZFg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjX2xhYi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSxjYy5tb3ZlVG8oMC4yNSxjYy52MihjYy53aW5TaXplLndpZHRoLGRlc2NfbGFiLnkpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBiZXQrXCLlgI1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMucGxheVNwaW5lKHRoaXMuc3BpbmVfY3NyY2RoLGZhbHNlLHRydWUsQ09OU1QuU3BpbmVOYW1lLk5vcm1hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW2lkXS5maXNoVHlwZUlkID09IENPTlNULkJvc3NMYXZhQmFzYWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuYm9zc0xhdmFCYXNhbHRDb21pbik7Ly9CT1NT6K2m5ZGK6LSi56WeXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9yeXh3cmNkaC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihnbEdhbWUuZmlzaE11dGlwbGVDZmcgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV0ID0gXCIwXCI7Ly/lh7rnjrDov5nkuKrlsLHmmK/vvJrmi7/kuI3liLDmlbDmja7miJbogIXphY3ooajlh7rplJlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IChnbEdhbWUuZmlzaE11dGlwbGVDZmdbQ09OU1QuQm9zc0xhdmFCYXNhbHRdK1wiXCIpLnJlcGxhY2UoXCItXCIsXCJ+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NfbGFiID0gdGhpcy5zcGluZV9yeXh3cmNkaC5nZXRDaGlsZEJ5TmFtZShcImxhYl9iZXREZXNjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGVzY19sYWIub2xkWCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NfbGFiLm9sZFggPSBkZXNjX2xhYi54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIueCA9IGRlc2NfbGFiLm9sZFg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjX2xhYi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSxjYy5tb3ZlVG8oMC4yNSxjYy52MihjYy53aW5TaXplLndpZHRoLGRlc2NfbGFiLnkpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY19sYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBiZXQrXCLlgI1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMucGxheVNwaW5lKHRoaXMuc3BpbmVfcnl4d3JjZGgsZmFsc2UsdHJ1ZSxDT05TVC5TcGluZU5hbWUuTm9ybWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3YXJuID0gdGhpcy5zcGluZV9yeXh3cmNkaC5nZXRDaGlsZEJ5TmFtZShcIndhcm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmZhZGVUbygwLjMsMCksY2MuZGVsYXlUaW1lKDAuMyksY2MuZmFkZVRvKDAuMywyNTUpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBQbGF5QkdNVGltZSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc1NZTFcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaEJnU291bmQsIENPTlNULkJvc3NTWUxXQmdNdXNpYyk7Ly/mkq3mlL4g5rex5riK6b6Z546LIOiDjOaZr+WjsOmfs1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxQbGF5QkdNVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdLmZpc2hUeXBlSWQgPT0gQ09OU1QuQm9zc0xhdmFCYXNhbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQuZmlzaEJnU291bmQsIENPTlNULkJvc3NMYXZhQmFzYWx0QmdNdXNpYyk7Ly/mkq3mlL4g54aU5bKp546E5q2mIOiDjOaZr+WjsOmfs1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxQbGF5QkdNVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm5baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmVmZmVjdF9jc3JjZGggIT0gbnVsbCAmJiB0aGlzLmVmZmVjdF9jc3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgIT0gbnVsbCAmJiAhdGhpcy5sb2dpYy5pc0Zpc2hUaWRlUnVuaW5nKXtcclxuICAgICAgICAgICAgY29uc3QgRnJlcXVlbmN5ID0gNTAwO1xyXG4gICAgICAgICAgICBjb25zdCBQb3NpdGl2ZURpcmVjdGlvbiA9IDE7Ly/mraPmlrnlkJFcclxuICAgICAgICAgICAgY29uc3QgT3Bwb3NpdGVEaXJlY3Rpb24gPSAtMTsvL+WPjeaWueWQkVxyXG4gICAgICAgICAgICBjb25zdCBNYXhMaWdodCA9IDI1NDtcclxuICAgICAgICAgICAgY29uc3QgTWluTGlnaHQgPSAxO1xyXG4gICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9jc3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9jc3JjZGguYWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9jc3JjZGguYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9jc3JjZGguZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9jc3JjZGguc3ViRCA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9jc3JjZGguc3ViRCA9IFBvc2l0aXZlRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5lZmZlY3RfY3NyY2RoLnN1YkQgPT0gUG9zaXRpdmVEaXJlY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X2NzcmNkaC5vcGFjaXR5ICs9IE1hdGguY2VpbChkdCAqIEZyZXF1ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5lZmZlY3RfY3NyY2RoLm9wYWNpdHkgPiBNYXhMaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X2NzcmNkaC5zdWJEID0gT3Bwb3NpdGVEaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfY3NyY2RoLm9wYWNpdHkgLT0gTWF0aC5jZWlsKGR0ICogRnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9jc3JjZGgub3BhY2l0eSA8IE1pbkxpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfY3NyY2RoLnN1YkQgPSBQb3NpdGl2ZURpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9jc3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RfY3NyY2RoLnNldHRpbmdBY3RpdmVUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X2NzcmNkaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmVmZmVjdF9yeXh3cmNkaCAhPSBudWxsICYmIHRoaXMuZWZmZWN0X3J5eHdyY2RoLnNldHRpbmdBY3RpdmVUaW1lICE9IG51bGwgJiYgIXRoaXMubG9naWMuaXNGaXNoVGlkZVJ1bmluZyl7XHJcbiAgICAgICAgICAgIGNvbnN0IEZyZXF1ZW5jeSA9IDUwMDtcclxuICAgICAgICAgICAgY29uc3QgUG9zaXRpdmVEaXJlY3Rpb24gPSAxOy8v5q2j5pa55ZCRXHJcbiAgICAgICAgICAgIGNvbnN0IE9wcG9zaXRlRGlyZWN0aW9uID0gLTE7Ly/lj43mlrnlkJFcclxuICAgICAgICAgICAgY29uc3QgTWF4TGlnaHQgPSAyNTQ7XHJcbiAgICAgICAgICAgIGNvbnN0IE1pbkxpZ2h0ID0gMTtcclxuICAgICAgICAgICAgaWYodGhpcy5lZmZlY3Rfcnl4d3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9yeXh3cmNkaC5hY3RpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3J5eHdyY2RoLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGguZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9yeXh3cmNkaC5zZXR0aW5nQWN0aXZlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZWZmZWN0X3J5eHdyY2RoLnN1YkQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGguc3ViRCA9IFBvc2l0aXZlRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5lZmZlY3Rfcnl4d3JjZGguc3ViRCA9PSBQb3NpdGl2ZURpcmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGgub3BhY2l0eSArPSBNYXRoLmNlaWwoZHQgKiBGcmVxdWVuY3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZWZmZWN0X3J5eHdyY2RoLm9wYWNpdHkgPiBNYXhMaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3J5eHdyY2RoLnN1YkQgPSBPcHBvc2l0ZURpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3J5eHdyY2RoLm9wYWNpdHkgLT0gTWF0aC5jZWlsKGR0ICogRnJlcXVlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdF9yeXh3cmNkaC5vcGFjaXR5IDwgTWluTGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdF9yeXh3cmNkaC5zdWJEID0gUG9zaXRpdmVEaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGguYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/psbzmva7mnaXkuobpmpDol48gYm9zc+adpeS6hlxyXG4gICAgaGlkZUJvc3NDb25pblVJSGFuZGxlcigpe1xyXG4gICAgICAgIHRoaXMuZWZmZWN0X2NzcmNkaC5zZXR0aW5nQWN0aXZlVGltZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lZmZlY3Rfcnl4d3JjZGguc2V0dGluZ0FjdGl2ZVRpbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0X2NzcmNkaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdF9yeXh3cmNkaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL2Jvc3Mg6L+H5p2lIOW8gOWni+WAkuiuoeaXtlxyXG4gICAgYm9zc0NvbWVpbkhhbmRsZXIocmVzKXtcclxuICAgICAgICBsZXQgZmlzaFR5cGVJZCA9IHJlcy5maXNoVHlwZUlkO1xyXG4gICAgICAgIGxldCBsaXZlVGltZSAgID0gTnVtYmVyKHJlcy5zZXJ2ZXJUaW1lIC0gcmVzLmNyZWF0ZVRpbWUpOyAvL+WHuueUn+aXtumXtFxyXG4gICAgICAgIGxldCBOb3RCb3JuICAgID0gMDtcclxuICAgICAgICBjb25zdCBUb1NlY29uZCA9IDEwMDA7XHJcbiAgICAgICAgaWYobGl2ZVRpbWUgPCBOb3RCb3JuKXsvL+Wkp+S6jjAg5bCx5piv5bey57uP5Ye655Sf5LqG5LiN5b+F5YaN5Ye65o+Q56S6XHJcbiAgICAgICAgICAgIHRoaXMubG9naWMuc3BlY2lhbEZpc2hMaXN0Qm9ybkxlbiArKztcclxuICAgICAgICAgICAgbGV0IHdlbGxCb3JuVGltZSA9IE1hdGguYWJzKGxpdmVUaW1lKSArIChOdW1iZXIocmVzLnNob3dUaW1lKSAqIFRvU2Vjb25kKTsvL+i/mOimgeWkmuS5heaJjeWHuueUnyAtIOS7juWxj+W5lei+uee8mOW8gOWni+a4uOWKqOi1t+adpSDlubbkuI3mmK/ov5vlhaXlsY/luZVcclxuICAgICAgICAgICAgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuW3Jlcy5pZF0gPSB7ZmlzaFR5cGVJZDpmaXNoVHlwZUlkLHdlbGxCb3JuVGltZTp3ZWxsQm9yblRpbWV9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+i0ouelnui/m+WFpVxyXG4gICAgYm9zc0dvZE9mV2VhbHRoQ29pbkhhbmRsZXIoKXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmZpc2hTb3VuZCxcImJvc3NDb21pbkNhaVNoZW5cIik7Ly9CT1NT6K2m5ZGK6LSi56WeXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJib3NzQ3NDb21pblwiKTsvL0JPU1Mg6LSi56We6ZmN5Li0XHJcbiAgICB9LFxyXG4gICAgLy/nhpTlsqnnjoTmrabov5vlhaVcclxuICAgIGJvc3NMYXZhQmFzYWx0Q29taW5IYW5kbGVyKCl7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChDT05TVC5jbGllbnRFdmVudC5maXNoU291bmQsXCJib3NzQ29taW5YdWFuV3VcIik7Ly9CT1NT6K2m5ZGK546E5q2mXHJcbiAgICB9LFxyXG4gICAgLy/mlq3nur/ph43ov57vvIzmuIXnkIbmlbDmja5cclxuICAgIGNsZWFyYm9zc0NvbWVpbkhhbmRsZXIoKXtcclxuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm4pe1xyXG4gICAgICAgICAgICBsZXQgdGlwID0gdGhpcy5ib3NzQ29uZUluVGlwLmdldENoaWxkQnlOYW1lKGlkK1wiXCIpO1xyXG4gICAgICAgICAgICBpZih0aXApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzQ29uZUluVGlwLnJlbW92ZUNoaWxkKHRpcCk7XHJcbiAgICAgICAgICAgICAgICB0aXAuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubG9naWMuc3BlY2lhbEZpc2hMaXN0Qm9ybltpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dpYy5zcGVjaWFsRmlzaExpc3RCb3JuTGVuID0gMDtcclxuICAgICAgICB0aGlzLmxvZ2ljLnNwZWNpYWxGaXNoTGlzdEJvcm4gPSB7fTtcclxuICAgIH0sXHJcbiAgICAvL+iuvue9ruaXi+i9rFxyXG4gICAgY2hlY2tSb3RhdGlvbkhhbmRsZXIoKXtcclxuICAgICAgICBjYy53YXJuKFwiPj4g6KeS5bqm5peL6L2sMTgwICBjaGVja1JvdGF0aW9uSGFuZGxlclwiKVxyXG4gICAgICAgIHRoaXMubG9naWMuaXNOZWVkU2V0MTgwQW5nbGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL+a1t+a1qumxvOe+pC3mkq3mlL7mtbfmtapcclxuICAgIG9uU3VyZlN0YXJ0SGFuZGxlcihyZXMpe1xyXG4gICAgICAgIGxldCB1aV9zdXJmQ2FudGFpbmVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlfc3VyZkNhbnRhaW5lclwiKTtcclxuICAgICAgICB1aV9zdXJmQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2F2ZXNfdGV4dHVyZTFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB1aV9zdXJmQ2FudGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2F2ZXNfdGV4dHVyZTJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5sb2dpYy5iZ0luZGV4ID4gMCl7Ly/mr4/kuKpiZyDlgY/np7vph4/kuI3kuIDmoLdcclxuICAgICAgICAgICAgdWlfc3VyZkNhbnRhaW5lci54ICAgICAgID0gY2Mud2luU2l6ZS53aWR0aCAtIDc1MDsvL+WBj+enu+mHj+awlOazoeWcqDLkuKrog4zmma/kuK3pl7Qg6IOM5pmv5a695bqmIDI0MTEg6IOM5pmv5LiN6YCC6YWNXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHVpX3N1cmZDYW50YWluZXIueCAgICAgICA9IGNjLndpblNpemUud2lkdGggLSAxMDAgKyAodGhpcy5sb2dpYy5iZ0luZGV4ICogMTAwKTsvL+WBj+enu+mHj+awlOazoeWcqDLkuKrog4zmma/kuK3pl7Qg6IOM5pmv5a695bqmIDI0MTEg6IOM5pmv5LiN6YCC6YWNXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBNb3ZlVG9UaW1lICAgICAgICAgPSAyO1xyXG4gICAgICAgIGNvbnN0IE91dFdpblNpemVPZmZjZVggICA9IDU7XHJcbiAgICAgICAgY29uc3QgT3V0V2luU2l6ZVggICAgICAgID0gLWNjLndpblNpemUud2lkdGg7XHJcblxyXG4gICAgICAgIHVpX3N1cmZDYW50YWluZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB1aV9zdXJmQ2FudGFpbmVyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oTW92ZVRvVGltZSxjYy52MihPdXRXaW5TaXplWCx1aV9zdXJmQ2FudGFpbmVyLnkpKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICB1aV9zdXJmQ2FudGFpbmVyLnggPSBjYy53aW5TaXplLndpZHRoK091dFdpblNpemVPZmZjZVg7XHJcbiAgICAgICAgICAgIHVpX3N1cmZDYW50YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXZlc190ZXh0dXJlMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdWlfc3VyZkNhbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndhdmVzX3RleHR1cmUyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9LFxyXG4gICAgLy/mmL7npLrmtarmva7mnaXkuLRcclxuICAgIHNob3dGaXNoVGlkZVRpdGxlSGFuZGxlcigpIHtcclxuICAgICAgICBsZXQgdWlfZmlzaFRpZGVUaXRsZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpX2Zpc2hUaWRlVGl0bGVcIik7XHJcbiAgICAgICAgY29uc3QgSGlkT3BhY2l0eSAgICAgICAgID0gMjU1O1xyXG4gICAgICAgIHVpX2Zpc2hUaWRlVGl0bGUub3BhY2l0eSA9IEhpZE9wYWNpdHk7XHJcbiAgICAgICAgdWlfZmlzaFRpZGVUaXRsZS5hY3RpdmUgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvZ2ljLnBsYXlTcGluZSh1aV9maXNoVGlkZVRpdGxlLmdldENoaWxkQnlOYW1lKFwic3BpbmVcIiksZmFsc2UsdHJ1ZSxDT05TVC5TcGluZU5hbWUuTm9ybWFsKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/muIXnkIZcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmxvZ2ljICAgICAgID0gbnVsbDtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJvc3NUaXBNb3ZlVG9UaW1lICA9IDAuNVxyXG4gICAgICAgIHRoaXMubm9kZS5pc0luaXQgICAgICAgID0gMTtcclxuICAgICAgICB0aGlzLmJ1bGxldFRpcFRpbWUgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5jbGlja0Zpc2hQb29sRXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2xpY2tGaXNoUG9vbFRpbWUgID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RBbmdsZSAgICAgICAgICA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2dpYyAgICAgICAgICAgICAgPSByZXF1aXJlKFwibmZpc2hsb2dpY1wiKS5nZXRJbnN0YW5jZSgpOy8v5pWw5o2u5Lit5b+DXHJcbiAgICAgICAgdGhpcy5maXJlVGltZSAgICAgICAgICAgPSAwOyAgICAvL+W8gOeBq+iuoeaXtuWZqFxyXG4gICAgICAgIHRoaXMuZmlyZVRpbWVGcmVxdWVuY3kgID0gMC4xNzsgLy/lvIDngavpopHnjodcclxuICAgICAgICB0aGlzLmlzRmlyZSAgICAgICAgICAgICA9IHRydWU7IC8v5piv5ZCm5Y+v5Lul5byA54GrXHJcbiAgICAgICAgdGhpcy5sb2dpYy5jYW5ub25MZXZlbCAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNFeGl0ICAgICAgICAgICAgID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLnR1cm50YWJsZVZpZXcpdGhpcy50dXJudGFibGVWaWV3LmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLnR1cm50YWJsZVZpZXcgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuY29ybnVjb3BpYVZpZXcpdGhpcy5jb3JudWNvcGlhVmlldy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5jb3JudWNvcGlhVmlldyA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSB0eXBlIFVJ57yW6L6R5Zmo5Lyg5Y+CIOacieWAvOWwseS4jeWBmuaMiemSrui/nueCuei/h+a7pCjkuJTkuI3nrYnkuo7nibnmrorpn7PmlYjlrZfmrrUpICDkvb/nlKhzZWxlY3TliIbpobXmjInpkq5cclxuICAgICAqIEBFeHBsYWluIEJ1dHRvbueCueWHu+S6i+S7tue7n+S4gOiwg+eUqFxyXG4gICAgICovXHJcbiAgICBPbkNsaWNrQnV0dG9uKGV2ZW50LCB0eXBlKSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcclxuICAgICAgICBsZXQgYnV0dG9uTm9kZSA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgaWYoYnV0dG9uTmFtZSA9PSBcInVpX21lbnVCdG5cIiB8fCBidXR0b25OYW1lID09IFwidWlfQnRuU3ViXCIgfHwgYnV0dG9uTmFtZSA9PSBcInVpX0J0blBsdXNcIiB8fCBidXR0b25OYW1lID09IFwidWlfc2tpbGxBdXRvXCIgfHwgYnV0dG9uTmFtZSA9PSBcInVpX3NraWxsTG9ja1wiKXtcclxuICAgICAgICAgICAgLy/ov5k15Liq5oyJ6ZKu5bCx5LiN6ZmQ5Yi2XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmICghdHlwZSB8fCB0eXBlID09IFwic2VsZWN0XCIpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2xpY2tTdGF0ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJDbGlja1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ3VyVGltZW91dCA9IHRoaXMuYWxsQ3VyVGltZW91dCB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ3VyVGltZW91dC5wdXNoKHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGDngrnlh7vkuoZidXR0b24gLT4gJHtidXR0b25OYW1lfWApO1xyXG4gICAgICAgIHN3aXRjaCAoYnV0dG9uTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VfZWZmXCI6ICAgICAgICAvL+W9k+WJjeeVjOmdouacieaSreaUvueJuemVv+mfs+aViOeahOWFs+mXreaMiemSrlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmF1ZGlvLmNsb3NlQ3VyRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuYXVkaW8ucGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJzZWxlY3RcIikgZ2xHYW1lLmF1ZGlvLnBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGdsR2FtZS5hdWRpby5wbGF5TG9hZFNvdW5kRWZmZWN0QnlQYXRoKFwiY2xpY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DbGljayhidXR0b25OYW1lLCBidXR0b25Ob2RlKTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
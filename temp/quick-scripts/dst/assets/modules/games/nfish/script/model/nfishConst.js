
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/model/nfishConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05cf6gdRJJCDYMKUAoj3YHE', 'nfishConst');
// modules/games/nfish/script/model/nfishConst.js

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  // s -> c 接收服务器
  STCEvent: {
    onSyncData: "onSyncData",
    onEnterRoom: "onEnterRoom",
    onTideScript: "onTideScript",
    onFishGroupScript: "onFishGroupScript",
    onAddFishLine: "onAddFish",
    onShoot: "onShoot",
    onUseSpecialCannon: "onUseSpecialCannon",
    onKill: "onKill",
    onLeaveRoom: "onLeaveRoom",
    onCoinChanged: "onCoinChanged",
    onChangeCannonLevel: "onChangeCannonLevel",
    onMissileBomb: "onMissileBomb",
    onOffline: "onOffline",
    onOnline: "onOnline",
    horseRaceLamp: "horseRaceLamp"
  },
  //客户端通知事件
  clientEvent: {
    netDisconnect: "net.disconnect",
    //断网
    EnterBackground: "EnterBackground",
    //切后台
    EnterForeground: "EnterForeground",
    //切前台
    //公共
    fishSound: "fish_fishSound",
    //播放声音
    fishBgSound: "fish_fishBgSound",
    //播放背景声音
    checkBgMusic: "fish_checkBgMusic",
    //检查背景音乐
    //背景
    changeBackGround: "fish_changeBackGround",
    //切换背景
    seaWaveChangeBg: "fish_seaWaveChangeBg",
    //海浪鱼群 - 切换背景
    //渔场
    adjustGunAngle: "fish_adjustGunAngle",
    //调整高射炮角度
    initFishPool: "fish_initFishPool",
    //初始化鱼塘
    addFishPool: "fish_addFishPool",
    //加鱼
    addFishTide: "fish_addFishTide",
    //加鱼潮
    playShootBullet: "fish_playShootBullet",
    //用户射击
    playFishnetEffect: "fish_playFishnetEffect",
    //生成渔网
    onKillFish: "fish_onKillFishCline",
    //销毁鱼
    onFreezeStartStop: "fish_onFreezeStartStop",
    //冰冻开始-结束
    leaveRoomUnLock: "fish_leaveRoomUnLock",
    //用户离开解锁
    seaWaveFishGroup: "fish_seaWaveFishGroup",
    //海浪鱼-快速游走
    fishCancelShoot: "fish_fishCancelShoot",
    //停止射击
    disposeFishNode: "fish_disposeFishNode",
    //销毁鱼
    initBulletList: "fish_initBulletList",
    //初始化鱼池子弹-断连
    onSshock: "fish_onSshock",
    //震动屏幕
    playLockSpine: "fish_playLockSpine",
    //播放锁定动画
    onSpecialBulletExp: "fish_SBE",
    //特殊子弹爆炸
    onSpecialBomb: "fish_onSpecialBomb",
    //熔岩玄武 全屏爆炸
    changeCantainer: "fish_changeCantainer",
    //改变容器 scale
    lockSelfFish: "fish_lockSelfFish",
    //锁定鱼
    checkRotationFishPool: "fish_checkRFP",
    //设置旋转
    //桌子可见UI
    comeInPlayer: "fish_comeInPlayer",
    //用户进入
    leaveRoomPlayer: "fish_leaveRoomPlayer",
    //用户离开
    updateShootGold: "fish_updateShootGold",
    //更新用户射击余额
    changeGunRate: "fish_changeGunRate",
    //改变炮台倍率
    updateGunRate: "fish_updateGunRate",
    //更新炮台倍率
    onFreezeShowUI: "fish_onFreezeShowUI",
    //冰冻显示UI
    fireSettingRecoil: "fish_fireSettingRecoil",
    //为自己设置后坐力
    updateGunRecoil: "fish_updateGunRecoil",
    //为其他玩家设置后坐力
    onCoinChanged: "fish_onCoinChanged",
    //充值到账财神爷动画
    playCoinEffect: "fish_playCoinEffect",
    //死鱼飘金币
    onSurfStart: "fish_onSurfStart",
    //海浪鱼群-海浪UI
    showFishTideTitle: "fish_showFishTideTitle",
    //显示浪潮来临
    myUpdateMoney: "fish_myUpdateMoney",
    //更新自己钱
    checkAutoAndLock: "fish_checkAutoAndLock",
    //检查锁定和自动按钮
    bossComein: "fish_bossComein",
    //boss出现
    useAutoSkill: "fish_useAutoSkill",
    //使用锁定技能
    clickFishPool: "fish_clickFishPool",
    //点击鱼池子
    hiddenLocationTip: "fish_hiddenLocationTip",
    //隐藏位置提示
    playFiringEffect: "fish_playFiringEffect",
    //播放开炮效果
    useLockSkill: "fish_useLockSkill",
    //使用锁定技能
    lightningSkills: "fish_lightningSkills",
    //闪电
    getSpecialCannon: "fish_getSpecialCannon",
    //获取到一个特殊炮台
    onLaserDispath: "fish_onLaserDispath",
    //龙溪炮台发射子弹
    upSpecialGunCoin: "fish_upGunCoin",
    //更新特殊炮台子弹数量
    restoreCannon: "fish_restoreCannon",
    //特殊子弹用完恢复炮台
    sprinkleRedBag: "fish_sprinkleRedBag",
    //财神出金币
    showTurntable: "fish_showTurntable",
    //玉如意 聚宝盆 出转盘
    otherPlayerShowSpecialAward: "fish_oPSSA",
    //其他人的 如意 聚宝鹏 展示
    specialBulletStatistics: "fish_sBS",
    //特殊子弹统计
    checkRotation: "fish_checkRotation",
    //设置旋转
    hideBossConinUI: "fish_hideBossConinUI",
    //隐藏boss来了
    updateUserStatus: "fish_updateUserStatus",
    //设置用户是否正在连线中
    addGoldEffect: "fish_addGoldEffect",
    //飘分
    showAlert: "fish_showAlert",
    //alert弹出框
    accumulate: "fish_Accumulate",
    //播放蓄力
    closeLoading: "fish_closeLoading",
    //关闭loading
    clearbossComein: "fish_clearbossComein",
    //清理boss进入
    checkSpecialBullet: "fish_checkSpecialBut",
    //特殊子弹统计检查器
    clearSpecialBulletPool: "fish_clearSpecial",
    //清理特殊子弹
    bossGodOfWealthCoin: "fish_bossGodOfWealthCoin",
    //财神进入
    bossLavaBasaltComin: "fish_bossLavaBasaltComin",
    //熔岩玄武进入
    checkSpecialCannon: "fish_checkSpecialCannon",
    //检查特殊炮台
    followFishTip: "fish_followFishTip",
    //显示鱼气泡
    clearFollowFishTip: "fish_clearFollowFishTip" //清理显示鱼气泡

  },
  nodeZIndex: {
    zIndexFish: 10,
    zIndexMaxFish: 4000,
    zIndexBullet: 5000,
    zIndexPartBoom: 6000,
    zIndexAllBoom: 7000,
    zIndexAni: 8000
  },
  SkillisLockAutoChange: "SkillisLockAutoChange",
  SkillLock: "SkillLock",
  SkillAuto: "SkillAuto",
  GunLevel: "gunLevel_",
  TipTime: 5,
  //气泡显示时间周期(单位：s)
  ShootButtomMin: 50,
  //射击最小角度距离底部距离
  DesignSize: cc.Size(1920, 1080),
  //设计尺寸
  DelayDieTime: 0.1,
  //熔岩玄武炸弹死亡 延迟时间
  dieType0: 0,
  //自然死亡
  dieType1: 1,
  //玩家攻击
  dieType2: 2,
  //全屏炸弹
  dieType3: 3,
  //闪电
  dieType4: 4,
  //旋涡
  BossSYLWBgMusic: 4,
  //深渊龙王 背景声音
  BossLavaBasaltBgMusic: 5,
  //熔岩玄武 背景声音
  BossGodOfWealthBgMusic: 6,
  //财神 背景声音
  fishSounds: _defineProperty({
    "man_die_01": 0,
    "man_die_02": 1,
    "man_die_03": 2,
    "man_die_04": 3,
    "man_die_05": 4,
    "man_die_06": 5,
    "man_die_07": 6,
    "man_die_08": 7,
    "woman_die_01": 8,
    "woman_die_02": 9,
    "woman_die_03": 10,
    "woman_die_04": 11,
    "woman_die_05": 12,
    "woman_die_06": 13,
    "woman_die_07": 14,
    "woman_die_08": 15,
    "bignumber": 16,
    "button": 17,
    "button-1": 18,
    "coin": 19,
    "coun-1": 20,
    "effect_blast": 21,
    "effect_chopping": 22,
    "effect_electric": 23,
    "effect_energy": 24,
    "effect_frozen": 25,
    "launch": 26,
    "launch-1": 27,
    "level_switch": 28,
    "PartialSend": 29,
    //炎爆发射
    "LaserSend": 30,
    //龙息发射
    "MissileBoom": 31,
    //仙剑爆炸
    "MissileHit": 32,
    //仙剑碰撞
    "PartialBomb": 33
  }, "bignumber", 34),
  fishSounds2: {
    "voiceFile1": 0,
    "voiceFile2": 1,
    "voiceFile3": 2,
    "voiceFile4": 3,
    "voiceFile5": 4,
    "voiceFile6": 5,
    "voiceFile7": 6,
    "voiceFile8": 7,
    "voiceFile9": 8,
    "voiceFile10": 9,
    "voiceFile11": 10,
    "voiceFile12": 11,
    "voiceFile13": 12,
    "voiceFile14": 13,
    "voiceFile15": 14,
    "voiceFile16": 15,
    "voiceFile17": 16,
    "voiceFile18": 17,
    "voiceFile19": 18,
    "voiceFile20": 19,
    "voiceFile21": 46,
    "voiceFile22": 47,
    "getVoice1": 20,
    //1挡
    "flyGold": 21,
    //飞金币
    "getVoice2": 22,
    //2挡
    "getVoice3": 23,
    //3挡
    "getVoice4": 24,
    //4挡
    "bossCominXuanWu": 25,
    //BOSS警告玄武
    "bossCominCaiShen": 26,
    //BOSS警告财神
    "getCaiShenRew": 27,
    //捕获到财神出现小UI时，播放
    "getYuRu": 28,
    //捕获玉如意一瞬间播放
    "getJuBao": 29,
    //捕获聚宝盆一瞬间播放
    "attack1_3": 30,
    //普通攻击 1-3
    "syBossDie": 31,
    //深渊龙王死亡播放
    "rongYanBossBoom": 32,
    //熔岩玄武爆炸
    "rongYanBossDie": 33,
    //熔岩玄武死亡，出现那个播报盘时播放这个
    "attack4_6": 34,
    //普通攻击 4-6
    "userYuRuYi": 35,
    //玉如意转盘使用
    "getSpcliaUser": 36,
    //获得特殊炮台时播放
    "lightningHit": 37,
    //闪电击中鱼
    "lightningDispath": 38,
    //闪电发射
    "tideComin": 39,
    //鱼潮来袭使用
    "attack7_9": 40,
    //普通攻击 7-9
    "attack10": 41,
    //普通攻击 10
    "juBaoGet": 42,
    //聚宝盆获得
    "juBaoShowNum": 43,
    //聚宝盆显示数字
    "yuRuGet": 44,
    //玉如意获得
    "bossCsComin": 45 //boss 财神降临

  },
  Runfrequency: 10,
  //帧图dt频率
  UnLockMaxTime: 0.3,
  //解锁时间
  NoonFish: -1,
  //无鱼
  MissileChangeRed: 2.5,
  //仙剑碰撞结束变红时间
  MissileRedValue: 0,
  //仙剑变红颜色值
  MissileRedMaxValue: 255,
  //仙剑变红前
  MissileRedSpeed: 100,
  //仙剑变红速度
  BulletMaxTime: 30,
  //子弹运动时最长存活时间
  LightningW: 481,
  //闪电宽度
  LightningH: 101,
  //闪电高度
  MaximumBulletCollisionTime: 1.15,
  //龙溪炮弹发射时间间隔
  Opention: {
    ChangeCannonLv: 3 //切换炮台倍率

  },
  EffectType: {
    //动画播放器播放的动画类型
    Fish: 1,
    //鱼
    Effect: 2 //特效

  },
  CannonType: {
    //普通炮台 0 特殊炮台 ，2,3，4，特殊效果 1
    Not: -1,
    // 都不是
    Normal: 0,
    // 普通炮台
    Bomb: 1,
    // 熔岩玄武 全屏爆炸
    Lightning: 2,
    // 闪电
    PartialBomb: 3,
    // 炎爆
    Laser: 4,
    // 龙息
    Missile: 5 // 仙剑

  },
  CannonGetEddect: {
    //特殊炮台获取进行时 特效图
    Laser: "tex_sdq2_",
    // 龙息
    Lightning: "tex_sdq1_",
    // 闪电
    PartialBomb: "tex_sdq3_",
    // 炎爆
    Missile: "tex_sdq4_" // 仙剑

  },
  CannonGotEddect: {
    //特殊炮台获取到 要播放 spine的 特效
    Laser: "animation",
    // 龙息
    Lightning: "animation",
    // 闪电
    PartialBomb: "animation",
    // 炎爆
    Missile: "animation" // 仙剑

  },
  CannonSkin: {
    //特殊炮台的 皮肤 保存 batteryList 的下标即可
    Laser: 12,
    // 龙息
    Lightning: 10,
    // 闪电
    PartialBomb: 11,
    // 炎爆
    Missile: 13 // 仙剑

  },
  CannonChangeEffect: {
    //特殊炮台的变身动画 保存 changeCannonEffectList 的下标即可
    Laser: 2,
    // 龙息
    Lightning: 0,
    // 闪电
    PartialBomb: 1,
    // 炎爆
    Missile: 3 // 仙剑

  },
  SpecialBulletSkin: {
    //特殊子弹皮肤
    Normal: "bullet_",
    // 普通
    Lightning: "bullet_11",
    // 闪电
    PartialBomb: "bullet_13",
    // 炎爆
    Missile: "bullet_12" // 仙剑

  },
  CannonOpention: {
    //操作类型
    Normal: 0x01,
    // 普通 射击
    NormalHit: 0x02,
    // 普通 击中
    Bomb: 4,
    // 熔岩玄武 全屏炸弹发射
    Lightning: 5,
    // 闪电 子弹发射
    PartialBomb: 6,
    // 炎爆 子弹发射
    Laser: 7,
    // 龙息 子弹发射
    Missile: 8,
    // 仙剑 子弹发射
    BombHit: 0x14,
    //熔岩玄武 全屏爆炸 碰撞
    LightningHit: 0x15,
    //闪电碰撞
    PartialBombHit: 0x16,
    //炎爆碰撞
    LaserHit: 0x17,
    //龙溪碰撞
    MissileHit: 0x18 //仙剑碰撞

  },
  CannonDesc: {
    //子弹名字
    0: "普通",
    2: "闪电",
    3: "炎爆",
    4: "龙息",
    5: "仙剑",
    //钻头 + 爆炸 效果
    1: "熔岩玄武" //全屏炸弹 效果

  },
  TreasureBowl: 801,
  //聚宝盆
  YuRuyi: 802,
  //玉如意
  BossGodOfWealth: 901,
  //财神
  BossLavaBasalt: 902,
  //熔岩玄武
  SHBF: 605,
  //深海蝙蝠
  BossSYLW: 903,
  //深渊龙王
  SpeciaResPre: "img_icon",
  //特殊鱼图集前缀
  //特殊鱼种提示 id列表
  SpecialFishTypeIds: [903, //深渊龙王
  902, //熔岩玄武
  901, //财神
  802, //玉如意
  801, //聚宝盆
  704, //负剑蟹
  703, //龙息蟹
  702, //炎爆蟹
  701 //闪电蟹
  ],
  SpineName: {
    //动画枚举
    Normal: "animation",
    //普通动画
    Idle: "idle",
    //其他炮台待机动画或仙剑已获得剑待机动画
    Idle2: "idle2",
    //仙剑未获得剑待机动画
    Get: "get",
    //仙剑获得剑动画
    Attack: "attack",
    //攻击动画，后坐力动画
    LockStart: "animation_01",
    //锁定开始
    LockIng: "animation_02",
    //锁定中
    GoldMin: "animation1",
    //金币爆炸多的
    GoldMax: "animation2",
    //金币爆炸少的
    SilverMin: "animation1",
    //银币爆炸多的
    SilverMax: "animation2",
    //银币爆炸少的
    YouHereTop: "animation2",
    //您在这里，上面
    YouHereButtom: "animation1",
    //您在这里，下面
    TurnTableIdle: "animation_2",
    //转盘idle状态
    TurnTableShowTime: "animation_1" //转盘出现的爆炸光效

  },
  //转盘档次
  EffectRotateLevel: {
    Normal: 0,
    OneLevel: 1,
    TowLevel: 2,
    ThreeLevel: 3,
    FourLevel: 4
  },
  //位置
  Seat: {
    LeftDowm: 0,
    //右下角
    RightDowm: 1,
    //左下角
    LeftTop: 2,
    //右上角
    RightTop: 3 //左上角

  },
  AwardType: {
    RUYI: 1,
    //如意
    CORNUCOPIA: 2 //聚宝鹏

  },
  HitColor: {
    Normal: cc.color(255, 255, 255, 255),
    //正常状态
    Attack: cc.color(234, 79, 79, 255),
    //攻击状态
    Deat: cc.color(255, 0, 0, 255) //死亡状态

  },
  //用户需要 翻转180° 所需设置的node的角度、偏移量等 数据
  IsNeedRotation: {
    "nfish_deskUIContainer": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_physicalPool": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "skillCantainer": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_menuCantainer": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "spine_effect": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "bossConinCantainer": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "alert_container": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_coinEffectPos": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_LockCantainer": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "flyGoldCoinLab": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "flySilverCoinLab": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "coinBg_cantainer": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "ui_wait": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "lab_gunLv": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "lab_gunLv2": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "btn_sub_plus_cantainer": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "ui_fireEffect": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_fishTideTitle": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "ui_0": {
      angle: 180,
      widget: null,
      offsex: null,
      scale: {
        x: 1,
        y: -1
      }
    },
    "ui_1": {
      angle: 180,
      widget: null,
      offsex: null,
      scale: {
        x: 1,
        y: -1
      }
    },
    "ui_2": {
      angle: 180,
      widget: null,
      offsex: null,
      scale: {
        x: 1,
        y: 1
      }
    },
    "ui_3": {
      angle: 180,
      widget: null,
      offsex: null,
      scale: {
        x: 1,
        y: 1
      }
    },
    "ui_ExitTip": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "img_tips": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "noClickFIsh_tips": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "publicTip": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "posList": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "mask": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "cornucopiaView": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "spine_show": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "nfish_turntable": {
      angle: 180,
      widget: null,
      offsex: null
    },
    "turntablePosList": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "netStatusContainer": {
      angle: 180,
      widget: null,
      offsex: null,
      repeat: true
    },
    "loadingView": {
      angle: 180,
      widget: null,
      offsex: null
    }
  },
  UserStatus: {
    //用户动作
    OnLine: 1,
    // 在线
    OffLine: 0 // 掉线

  },
  AlertType: {
    //Alert动作
    BossClearSocre: 1,
    // 清理boss积分
    LosCannan: 2,
    // 失去炮台
    NetOff: 3 // 断网

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXG1vZGVsXFxuZmlzaENvbnN0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJTVENFdmVudCIsIm9uU3luY0RhdGEiLCJvbkVudGVyUm9vbSIsIm9uVGlkZVNjcmlwdCIsIm9uRmlzaEdyb3VwU2NyaXB0Iiwib25BZGRGaXNoTGluZSIsIm9uU2hvb3QiLCJvblVzZVNwZWNpYWxDYW5ub24iLCJvbktpbGwiLCJvbkxlYXZlUm9vbSIsIm9uQ29pbkNoYW5nZWQiLCJvbkNoYW5nZUNhbm5vbkxldmVsIiwib25NaXNzaWxlQm9tYiIsIm9uT2ZmbGluZSIsIm9uT25saW5lIiwiaG9yc2VSYWNlTGFtcCIsImNsaWVudEV2ZW50IiwibmV0RGlzY29ubmVjdCIsIkVudGVyQmFja2dyb3VuZCIsIkVudGVyRm9yZWdyb3VuZCIsImZpc2hTb3VuZCIsImZpc2hCZ1NvdW5kIiwiY2hlY2tCZ011c2ljIiwiY2hhbmdlQmFja0dyb3VuZCIsInNlYVdhdmVDaGFuZ2VCZyIsImFkanVzdEd1bkFuZ2xlIiwiaW5pdEZpc2hQb29sIiwiYWRkRmlzaFBvb2wiLCJhZGRGaXNoVGlkZSIsInBsYXlTaG9vdEJ1bGxldCIsInBsYXlGaXNobmV0RWZmZWN0Iiwib25LaWxsRmlzaCIsIm9uRnJlZXplU3RhcnRTdG9wIiwibGVhdmVSb29tVW5Mb2NrIiwic2VhV2F2ZUZpc2hHcm91cCIsImZpc2hDYW5jZWxTaG9vdCIsImRpc3Bvc2VGaXNoTm9kZSIsImluaXRCdWxsZXRMaXN0Iiwib25Tc2hvY2siLCJwbGF5TG9ja1NwaW5lIiwib25TcGVjaWFsQnVsbGV0RXhwIiwib25TcGVjaWFsQm9tYiIsImNoYW5nZUNhbnRhaW5lciIsImxvY2tTZWxmRmlzaCIsImNoZWNrUm90YXRpb25GaXNoUG9vbCIsImNvbWVJblBsYXllciIsImxlYXZlUm9vbVBsYXllciIsInVwZGF0ZVNob290R29sZCIsImNoYW5nZUd1blJhdGUiLCJ1cGRhdGVHdW5SYXRlIiwib25GcmVlemVTaG93VUkiLCJmaXJlU2V0dGluZ1JlY29pbCIsInVwZGF0ZUd1blJlY29pbCIsInBsYXlDb2luRWZmZWN0Iiwib25TdXJmU3RhcnQiLCJzaG93RmlzaFRpZGVUaXRsZSIsIm15VXBkYXRlTW9uZXkiLCJjaGVja0F1dG9BbmRMb2NrIiwiYm9zc0NvbWVpbiIsInVzZUF1dG9Ta2lsbCIsImNsaWNrRmlzaFBvb2wiLCJoaWRkZW5Mb2NhdGlvblRpcCIsInBsYXlGaXJpbmdFZmZlY3QiLCJ1c2VMb2NrU2tpbGwiLCJsaWdodG5pbmdTa2lsbHMiLCJnZXRTcGVjaWFsQ2Fubm9uIiwib25MYXNlckRpc3BhdGgiLCJ1cFNwZWNpYWxHdW5Db2luIiwicmVzdG9yZUNhbm5vbiIsInNwcmlua2xlUmVkQmFnIiwic2hvd1R1cm50YWJsZSIsIm90aGVyUGxheWVyU2hvd1NwZWNpYWxBd2FyZCIsInNwZWNpYWxCdWxsZXRTdGF0aXN0aWNzIiwiY2hlY2tSb3RhdGlvbiIsImhpZGVCb3NzQ29uaW5VSSIsInVwZGF0ZVVzZXJTdGF0dXMiLCJhZGRHb2xkRWZmZWN0Iiwic2hvd0FsZXJ0IiwiYWNjdW11bGF0ZSIsImNsb3NlTG9hZGluZyIsImNsZWFyYm9zc0NvbWVpbiIsImNoZWNrU3BlY2lhbEJ1bGxldCIsImNsZWFyU3BlY2lhbEJ1bGxldFBvb2wiLCJib3NzR29kT2ZXZWFsdGhDb2luIiwiYm9zc0xhdmFCYXNhbHRDb21pbiIsImNoZWNrU3BlY2lhbENhbm5vbiIsImZvbGxvd0Zpc2hUaXAiLCJjbGVhckZvbGxvd0Zpc2hUaXAiLCJub2RlWkluZGV4IiwiekluZGV4RmlzaCIsInpJbmRleE1heEZpc2giLCJ6SW5kZXhCdWxsZXQiLCJ6SW5kZXhQYXJ0Qm9vbSIsInpJbmRleEFsbEJvb20iLCJ6SW5kZXhBbmkiLCJTa2lsbGlzTG9ja0F1dG9DaGFuZ2UiLCJTa2lsbExvY2siLCJTa2lsbEF1dG8iLCJHdW5MZXZlbCIsIlRpcFRpbWUiLCJTaG9vdEJ1dHRvbU1pbiIsIkRlc2lnblNpemUiLCJjYyIsIlNpemUiLCJEZWxheURpZVRpbWUiLCJkaWVUeXBlMCIsImRpZVR5cGUxIiwiZGllVHlwZTIiLCJkaWVUeXBlMyIsImRpZVR5cGU0IiwiQm9zc1NZTFdCZ011c2ljIiwiQm9zc0xhdmFCYXNhbHRCZ011c2ljIiwiQm9zc0dvZE9mV2VhbHRoQmdNdXNpYyIsImZpc2hTb3VuZHMiLCJmaXNoU291bmRzMiIsIlJ1bmZyZXF1ZW5jeSIsIlVuTG9ja01heFRpbWUiLCJOb29uRmlzaCIsIk1pc3NpbGVDaGFuZ2VSZWQiLCJNaXNzaWxlUmVkVmFsdWUiLCJNaXNzaWxlUmVkTWF4VmFsdWUiLCJNaXNzaWxlUmVkU3BlZWQiLCJCdWxsZXRNYXhUaW1lIiwiTGlnaHRuaW5nVyIsIkxpZ2h0bmluZ0giLCJNYXhpbXVtQnVsbGV0Q29sbGlzaW9uVGltZSIsIk9wZW50aW9uIiwiQ2hhbmdlQ2Fubm9uTHYiLCJFZmZlY3RUeXBlIiwiRmlzaCIsIkVmZmVjdCIsIkNhbm5vblR5cGUiLCJOb3QiLCJOb3JtYWwiLCJCb21iIiwiTGlnaHRuaW5nIiwiUGFydGlhbEJvbWIiLCJMYXNlciIsIk1pc3NpbGUiLCJDYW5ub25HZXRFZGRlY3QiLCJDYW5ub25Hb3RFZGRlY3QiLCJDYW5ub25Ta2luIiwiQ2Fubm9uQ2hhbmdlRWZmZWN0IiwiU3BlY2lhbEJ1bGxldFNraW4iLCJDYW5ub25PcGVudGlvbiIsIk5vcm1hbEhpdCIsIkJvbWJIaXQiLCJMaWdodG5pbmdIaXQiLCJQYXJ0aWFsQm9tYkhpdCIsIkxhc2VySGl0IiwiTWlzc2lsZUhpdCIsIkNhbm5vbkRlc2MiLCJUcmVhc3VyZUJvd2wiLCJZdVJ1eWkiLCJCb3NzR29kT2ZXZWFsdGgiLCJCb3NzTGF2YUJhc2FsdCIsIlNIQkYiLCJCb3NzU1lMVyIsIlNwZWNpYVJlc1ByZSIsIlNwZWNpYWxGaXNoVHlwZUlkcyIsIlNwaW5lTmFtZSIsIklkbGUiLCJJZGxlMiIsIkdldCIsIkF0dGFjayIsIkxvY2tTdGFydCIsIkxvY2tJbmciLCJHb2xkTWluIiwiR29sZE1heCIsIlNpbHZlck1pbiIsIlNpbHZlck1heCIsIllvdUhlcmVUb3AiLCJZb3VIZXJlQnV0dG9tIiwiVHVyblRhYmxlSWRsZSIsIlR1cm5UYWJsZVNob3dUaW1lIiwiRWZmZWN0Um90YXRlTGV2ZWwiLCJPbmVMZXZlbCIsIlRvd0xldmVsIiwiVGhyZWVMZXZlbCIsIkZvdXJMZXZlbCIsIlNlYXQiLCJMZWZ0RG93bSIsIlJpZ2h0RG93bSIsIkxlZnRUb3AiLCJSaWdodFRvcCIsIkF3YXJkVHlwZSIsIlJVWUkiLCJDT1JOVUNPUElBIiwiSGl0Q29sb3IiLCJjb2xvciIsIkRlYXQiLCJJc05lZWRSb3RhdGlvbiIsImFuZ2xlIiwid2lkZ2V0Iiwib2Zmc2V4IiwicmVwZWF0Iiwic2NhbGUiLCJ4IiwieSIsIlVzZXJTdGF0dXMiLCJPbkxpbmUiLCJPZmZMaW5lIiwiQWxlcnRUeXBlIiwiQm9zc0NsZWFyU29jcmUiLCJMb3NDYW5uYW4iLCJOZXRPZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsUUFBUSxFQUFDO0FBQ0xDLElBQUFBLFVBQVUsRUFBQyxZQUROO0FBRUxDLElBQUFBLFdBQVcsRUFBQyxhQUZQO0FBR0xDLElBQUFBLFlBQVksRUFBQyxjQUhSO0FBSUxDLElBQUFBLGlCQUFpQixFQUFDLG1CQUpiO0FBS0xDLElBQUFBLGFBQWEsRUFBQyxXQUxUO0FBTUxDLElBQUFBLE9BQU8sRUFBQyxTQU5IO0FBT0xDLElBQUFBLGtCQUFrQixFQUFDLG9CQVBkO0FBUUxDLElBQUFBLE1BQU0sRUFBQyxRQVJGO0FBU0xDLElBQUFBLFdBQVcsRUFBQyxhQVRQO0FBVUxDLElBQUFBLGFBQWEsRUFBQyxlQVZUO0FBV0xDLElBQUFBLG1CQUFtQixFQUFDLHFCQVhmO0FBWUxDLElBQUFBLGFBQWEsRUFBQyxlQVpUO0FBYUxDLElBQUFBLFNBQVMsRUFBQyxXQWJMO0FBY0xDLElBQUFBLFFBQVEsRUFBQyxVQWRKO0FB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QUFDVztBQUNsQkMsSUFBQUEsT0FBTyxFQUFTLENBRlQsQ0FFVzs7QUFGWCxHQXZhRTtBQTJhYkMsRUFBQUEsU0FBUyxFQUFDO0FBQW9CO0FBQzFCQyxJQUFBQSxjQUFjLEVBQVUsQ0FEbEI7QUFDb0I7QUFDMUJDLElBQUFBLFNBQVMsRUFBZSxDQUZsQjtBQUVvQjtBQUMxQkMsSUFBQUEsTUFBTSxFQUFrQixDQUhsQixDQUdvQjs7QUFIcEI7QUEzYUcsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gcyAtPiBjIOaOpeaUtuacjeWKoeWZqFxyXG4gICAgU1RDRXZlbnQ6e1xyXG4gICAgICAgIG9uU3luY0RhdGE6XCJvblN5bmNEYXRhXCIsXHJcbiAgICAgICAgb25FbnRlclJvb206XCJvbkVudGVyUm9vbVwiLFxyXG4gICAgICAgIG9uVGlkZVNjcmlwdDpcIm9uVGlkZVNjcmlwdFwiLFxyXG4gICAgICAgIG9uRmlzaEdyb3VwU2NyaXB0Olwib25GaXNoR3JvdXBTY3JpcHRcIixcclxuICAgICAgICBvbkFkZEZpc2hMaW5lOlwib25BZGRGaXNoXCIsXHJcbiAgICAgICAgb25TaG9vdDpcIm9uU2hvb3RcIixcclxuICAgICAgICBvblVzZVNwZWNpYWxDYW5ub246XCJvblVzZVNwZWNpYWxDYW5ub25cIixcclxuICAgICAgICBvbktpbGw6XCJvbktpbGxcIixcclxuICAgICAgICBvbkxlYXZlUm9vbTpcIm9uTGVhdmVSb29tXCIsXHJcbiAgICAgICAgb25Db2luQ2hhbmdlZDpcIm9uQ29pbkNoYW5nZWRcIixcclxuICAgICAgICBvbkNoYW5nZUNhbm5vbkxldmVsOlwib25DaGFuZ2VDYW5ub25MZXZlbFwiLFxyXG4gICAgICAgIG9uTWlzc2lsZUJvbWI6XCJvbk1pc3NpbGVCb21iXCIsXHJcbiAgICAgICAgb25PZmZsaW5lOlwib25PZmZsaW5lXCIsXHJcbiAgICAgICAgb25PbmxpbmU6XCJvbk9ubGluZVwiLFxyXG4gICAgICAgIGhvcnNlUmFjZUxhbXA6XCJob3JzZVJhY2VMYW1wXCIsXHJcbiAgICB9LFxyXG4gICAgLy/lrqLmiLfnq6/pgJrnn6Xkuovku7ZcclxuICAgIGNsaWVudEV2ZW50OntcclxuICAgICAgICBuZXREaXNjb25uZWN0OlwibmV0LmRpc2Nvbm5lY3RcIiwgICAgICAgICAgICAgLy/mlq3nvZFcclxuICAgICAgICBFbnRlckJhY2tncm91bmQ6XCJFbnRlckJhY2tncm91bmRcIiwgICAgICAgICAgLy/liIflkI7lj7BcclxuICAgICAgICBFbnRlckZvcmVncm91bmQ6XCJFbnRlckZvcmVncm91bmRcIiwgICAgICAgICAgLy/liIfliY3lj7BcclxuICAgICAgICAvL+WFrOWFsVxyXG4gICAgICAgIGZpc2hTb3VuZDpcImZpc2hfZmlzaFNvdW5kXCIsICAgICAgICAgICAgICAgICAvL+aSreaUvuWjsOmfs1xyXG4gICAgICAgIGZpc2hCZ1NvdW5kOlwiZmlzaF9maXNoQmdTb3VuZFwiLCAgICAgICAgICAgICAvL+aSreaUvuiDjOaZr+WjsOmfs1xyXG4gICAgICAgIGNoZWNrQmdNdXNpYzpcImZpc2hfY2hlY2tCZ011c2ljXCIsICAgICAgICAgICAvL+ajgOafpeiDjOaZr+mfs+S5kFxyXG5cclxuICAgICAgICAvL+iDjOaZr1xyXG4gICAgICAgIGNoYW5nZUJhY2tHcm91bmQ6XCJmaXNoX2NoYW5nZUJhY2tHcm91bmRcIiwgICAvL+WIh+aNouiDjOaZr1xyXG4gICAgICAgIHNlYVdhdmVDaGFuZ2VCZzpcImZpc2hfc2VhV2F2ZUNoYW5nZUJnXCIsICAgICAvL+a1t+a1qumxvOe+pCAtIOWIh+aNouiDjOaZr1xyXG5cclxuICAgICAgICAvL+a4lOWculxyXG4gICAgICAgIGFkanVzdEd1bkFuZ2xlOlwiZmlzaF9hZGp1c3RHdW5BbmdsZVwiLCAgICAgICAvL+iwg+aVtOmrmOWwhOeCruinkuW6plxyXG4gICAgICAgIGluaXRGaXNoUG9vbDpcImZpc2hfaW5pdEZpc2hQb29sXCIsICAgICAgICAgICAvL+WIneWni+WMlumxvOWhmFxyXG4gICAgICAgIGFkZEZpc2hQb29sOlwiZmlzaF9hZGRGaXNoUG9vbFwiLCAgICAgICAgICAgICAvL+WKoOmxvFxyXG4gICAgICAgIGFkZEZpc2hUaWRlOlwiZmlzaF9hZGRGaXNoVGlkZVwiLCAgICAgICAgICAgICAvL+WKoOmxvOa9rlxyXG4gICAgICAgIHBsYXlTaG9vdEJ1bGxldDpcImZpc2hfcGxheVNob290QnVsbGV0XCIsICAgICAvL+eUqOaIt+WwhOWHu1xyXG4gICAgICAgIHBsYXlGaXNobmV0RWZmZWN0OlwiZmlzaF9wbGF5RmlzaG5ldEVmZmVjdFwiLCAvL+eUn+aIkOa4lOe9kVxyXG4gICAgICAgIG9uS2lsbEZpc2g6XCJmaXNoX29uS2lsbEZpc2hDbGluZVwiLCAgICAgICAgICAvL+mUgOavgemxvFxyXG4gICAgICAgIG9uRnJlZXplU3RhcnRTdG9wOlwiZmlzaF9vbkZyZWV6ZVN0YXJ0U3RvcFwiLCAvL+WGsOWGu+W8gOWniy3nu5PmnZ9cclxuICAgICAgICBsZWF2ZVJvb21VbkxvY2s6XCJmaXNoX2xlYXZlUm9vbVVuTG9ja1wiLCAgICAgLy/nlKjmiLfnprvlvIDop6PplIFcclxuICAgICAgICBzZWFXYXZlRmlzaEdyb3VwOlwiZmlzaF9zZWFXYXZlRmlzaEdyb3VwXCIsICAgLy/mtbfmtarpsbwt5b+r6YCf5ri46LWwXHJcbiAgICAgICAgZmlzaENhbmNlbFNob290OlwiZmlzaF9maXNoQ2FuY2VsU2hvb3RcIiwgICAgIC8v5YGc5q2i5bCE5Ye7XHJcbiAgICAgICAgZGlzcG9zZUZpc2hOb2RlOlwiZmlzaF9kaXNwb3NlRmlzaE5vZGVcIiwgICAgIC8v6ZSA5q+B6bG8XHJcbiAgICAgICAgaW5pdEJ1bGxldExpc3Q6XCJmaXNoX2luaXRCdWxsZXRMaXN0XCIsICAgICAgIC8v5Yid5aeL5YyW6bG85rGg5a2Q5by5LeaWrei/nlxyXG4gICAgICAgIG9uU3Nob2NrOlwiZmlzaF9vblNzaG9ja1wiLCAgICAgICAgICAgICAgICAgICAvL+mch+WKqOWxj+W5lVxyXG4gICAgICAgIHBsYXlMb2NrU3BpbmU6XCJmaXNoX3BsYXlMb2NrU3BpbmVcIiwgICAgICAgICAvL+aSreaUvumUgeWumuWKqOeUu1xyXG4gICAgICAgIG9uU3BlY2lhbEJ1bGxldEV4cDpcImZpc2hfU0JFXCIsICAgICAgICAgICAgICAvL+eJueauiuWtkOW8ueeIhueCuFxyXG4gICAgICAgIG9uU3BlY2lhbEJvbWI6XCJmaXNoX29uU3BlY2lhbEJvbWJcIiwgICAgICAgICAvL+eGlOWyqeeOhOatpiDlhajlsY/niIbngrhcclxuICAgICAgICBjaGFuZ2VDYW50YWluZXI6XCJmaXNoX2NoYW5nZUNhbnRhaW5lclwiLCAgICAgLy/mlLnlj5jlrrnlmaggc2NhbGVcclxuICAgICAgICBsb2NrU2VsZkZpc2g6XCJmaXNoX2xvY2tTZWxmRmlzaFwiLCAgICAgICAgICAgLy/plIHlrprpsbxcclxuICAgICAgICBjaGVja1JvdGF0aW9uRmlzaFBvb2w6XCJmaXNoX2NoZWNrUkZQXCIsICAgICAgLy/orr7nva7ml4vovaxcclxuXHJcblxyXG4gICAgICAgIC8v5qGM5a2Q5Y+v6KeBVUlcclxuICAgICAgICBjb21lSW5QbGF5ZXI6XCJmaXNoX2NvbWVJblBsYXllclwiLCAgICAgICAgICAgLy/nlKjmiLfov5vlhaVcclxuICAgICAgICBsZWF2ZVJvb21QbGF5ZXI6XCJmaXNoX2xlYXZlUm9vbVBsYXllclwiLCAgICAgLy/nlKjmiLfnprvlvIBcclxuICAgICAgICB1cGRhdGVTaG9vdEdvbGQ6XCJmaXNoX3VwZGF0ZVNob290R29sZFwiLCAgICAgLy/mm7TmlrDnlKjmiLflsITlh7vkvZnpop1cclxuICAgICAgICBjaGFuZ2VHdW5SYXRlOlwiZmlzaF9jaGFuZ2VHdW5SYXRlXCIsICAgICAgICAgLy/mlLnlj5jngq7lj7DlgI3njodcclxuICAgICAgICB1cGRhdGVHdW5SYXRlOlwiZmlzaF91cGRhdGVHdW5SYXRlXCIsICAgICAgICAgLy/mm7TmlrDngq7lj7DlgI3njodcclxuICAgICAgICBvbkZyZWV6ZVNob3dVSTpcImZpc2hfb25GcmVlemVTaG93VUlcIiwgICAgICAgLy/lhrDlhrvmmL7npLpVSVxyXG4gICAgICAgIGZpcmVTZXR0aW5nUmVjb2lsOlwiZmlzaF9maXJlU2V0dGluZ1JlY29pbFwiLCAvL+S4uuiHquW3seiuvue9ruWQjuWdkOWKm1xyXG4gICAgICAgIHVwZGF0ZUd1blJlY29pbDpcImZpc2hfdXBkYXRlR3VuUmVjb2lsXCIsICAgICAvL+S4uuWFtuS7lueOqeWutuiuvue9ruWQjuWdkOWKm1xyXG4gICAgICAgIG9uQ29pbkNoYW5nZWQ6XCJmaXNoX29uQ29pbkNoYW5nZWRcIiwgICAgICAgICAvL+WFheWAvOWIsOi0pui0ouelnueIt+WKqOeUu1xyXG4gICAgICAgIHBsYXlDb2luRWZmZWN0OlwiZmlzaF9wbGF5Q29pbkVmZmVjdFwiLCAgICAgICAvL+atu+mxvOmjmOmHkeW4gVxyXG4gICAgICAgIG9uU3VyZlN0YXJ0OlwiZmlzaF9vblN1cmZTdGFydFwiLCAgICAgICAgICAgICAvL+a1t+a1qumxvOe+pC3mtbfmtapVSVxyXG4gICAgICAgIHNob3dGaXNoVGlkZVRpdGxlOlwiZmlzaF9zaG93RmlzaFRpZGVUaXRsZVwiLCAvL+aYvuekuua1qua9ruadpeS4tFxyXG4gICAgICAgIG15VXBkYXRlTW9uZXk6XCJmaXNoX215VXBkYXRlTW9uZXlcIiwgICAgICAgICAvL+abtOaWsOiHquW3semSsVxyXG4gICAgICAgIGNoZWNrQXV0b0FuZExvY2s6XCJmaXNoX2NoZWNrQXV0b0FuZExvY2tcIiwgICAvL+ajgOafpemUgeWumuWSjOiHquWKqOaMiemSrlxyXG4gICAgICAgIGJvc3NDb21laW46XCJmaXNoX2Jvc3NDb21laW5cIiwgICAgICAgICAgICAgICAvL2Jvc3Plh7rnjrBcclxuICAgICAgICB1c2VBdXRvU2tpbGw6XCJmaXNoX3VzZUF1dG9Ta2lsbFwiLCAgICAgICAgICAgLy/kvb/nlKjplIHlrprmioDog71cclxuICAgICAgICBjbGlja0Zpc2hQb29sOlwiZmlzaF9jbGlja0Zpc2hQb29sXCIsICAgICAgICAgLy/ngrnlh7vpsbzmsaDlrZBcclxuICAgICAgICBoaWRkZW5Mb2NhdGlvblRpcDpcImZpc2hfaGlkZGVuTG9jYXRpb25UaXBcIiwgLy/pmpDol4/kvY3nva7mj5DnpLpcclxuICAgICAgICBwbGF5RmlyaW5nRWZmZWN0OlwiZmlzaF9wbGF5RmlyaW5nRWZmZWN0XCIsICAgLy/mkq3mlL7lvIDngq7mlYjmnpxcclxuICAgICAgICB1c2VMb2NrU2tpbGw6XCJmaXNoX3VzZUxvY2tTa2lsbFwiLCAgICAgICAgICAgLy/kvb/nlKjplIHlrprmioDog71cclxuICAgICAgICBsaWdodG5pbmdTa2lsbHM6XCJmaXNoX2xpZ2h0bmluZ1NraWxsc1wiLCAgICAgLy/pl6rnlLVcclxuICAgICAgICBnZXRTcGVjaWFsQ2Fubm9uOlwiZmlzaF9nZXRTcGVjaWFsQ2Fubm9uXCIsICAgLy/ojrflj5bliLDkuIDkuKrnibnmrorngq7lj7BcclxuICAgICAgICBvbkxhc2VyRGlzcGF0aDpcImZpc2hfb25MYXNlckRpc3BhdGhcIiwgICAgICAgLy/pvpnmuqrngq7lj7Dlj5HlsITlrZDlvLlcclxuICAgICAgICB1cFNwZWNpYWxHdW5Db2luOlwiZmlzaF91cEd1bkNvaW5cIiwgICAgICAgICAgLy/mm7TmlrDnibnmrorngq7lj7DlrZDlvLnmlbDph49cclxuICAgICAgICByZXN0b3JlQ2Fubm9uOlwiZmlzaF9yZXN0b3JlQ2Fubm9uXCIsICAgICAgICAgLy/nibnmrorlrZDlvLnnlKjlrozmgaLlpI3ngq7lj7BcclxuICAgICAgICBzcHJpbmtsZVJlZEJhZzpcImZpc2hfc3ByaW5rbGVSZWRCYWdcIiwgICAgICAgLy/otKLnpZ7lh7rph5HluIFcclxuICAgICAgICBzaG93VHVybnRhYmxlOlwiZmlzaF9zaG93VHVybnRhYmxlXCIsICAgICAgICAgLy/njonlpoLmhI8g6IGa5a6d55uGIOWHuui9rOebmFxyXG4gICAgICAgIG90aGVyUGxheWVyU2hvd1NwZWNpYWxBd2FyZDpcImZpc2hfb1BTU0FcIiwgIC8v5YW25LuW5Lq655qEIOWmguaEjyDogZrlrp3puY8g5bGV56S6XHJcbiAgICAgICAgc3BlY2lhbEJ1bGxldFN0YXRpc3RpY3M6XCJmaXNoX3NCU1wiLCAgICAgICAgLy/nibnmrorlrZDlvLnnu5/orqFcclxuICAgICAgICBjaGVja1JvdGF0aW9uOlwiZmlzaF9jaGVja1JvdGF0aW9uXCIsICAgICAgICAvL+iuvue9ruaXi+i9rFxyXG4gICAgICAgIGhpZGVCb3NzQ29uaW5VSTpcImZpc2hfaGlkZUJvc3NDb25pblVJXCIsICAgIC8v6ZqQ6JePYm9zc+adpeS6hlxyXG4gICAgICAgIHVwZGF0ZVVzZXJTdGF0dXM6XCJmaXNoX3VwZGF0ZVVzZXJTdGF0dXNcIiwgIC8v6K6+572u55So5oi35piv5ZCm5q2j5Zyo6L+e57q/5LitXHJcbiAgICAgICAgYWRkR29sZEVmZmVjdDpcImZpc2hfYWRkR29sZEVmZmVjdFwiLCAgICAgICAgLy/po5jliIZcclxuICAgICAgICBzaG93QWxlcnQ6XCJmaXNoX3Nob3dBbGVydFwiLCAgICAgICAgICAgICAgICAvL2FsZXJ05by55Ye65qGGXHJcbiAgICAgICAgYWNjdW11bGF0ZTpcImZpc2hfQWNjdW11bGF0ZVwiLCAgICAgICAgICAgICAgLy/mkq3mlL7ok4TliptcclxuICAgICAgICBjbG9zZUxvYWRpbmc6XCJmaXNoX2Nsb3NlTG9hZGluZ1wiLCAgICAgICAgICAvL+WFs+mXrWxvYWRpbmdcclxuICAgICAgICBjbGVhcmJvc3NDb21laW46XCJmaXNoX2NsZWFyYm9zc0NvbWVpblwiLCAgICAvL+a4heeQhmJvc3Pov5vlhaVcclxuICAgICAgICBjaGVja1NwZWNpYWxCdWxsZXQ6XCJmaXNoX2NoZWNrU3BlY2lhbEJ1dFwiLCAvL+eJueauiuWtkOW8uee7n+iuoeajgOafpeWZqFxyXG4gICAgICAgIGNsZWFyU3BlY2lhbEJ1bGxldFBvb2w6XCJmaXNoX2NsZWFyU3BlY2lhbFwiLCAvL+a4heeQhueJueauiuWtkOW8uVxyXG4gICAgICAgIGJvc3NHb2RPZldlYWx0aENvaW46XCJmaXNoX2Jvc3NHb2RPZldlYWx0aENvaW5cIiwvL+i0ouelnui/m+WFpVxyXG4gICAgICAgIGJvc3NMYXZhQmFzYWx0Q29taW46XCJmaXNoX2Jvc3NMYXZhQmFzYWx0Q29taW5cIiwvL+eGlOWyqeeOhOatpui/m+WFpVxyXG4gICAgICAgIGNoZWNrU3BlY2lhbENhbm5vbjpcImZpc2hfY2hlY2tTcGVjaWFsQ2Fubm9uXCIsICAvL+ajgOafpeeJueauiueCruWPsFxyXG4gICAgICAgIGZvbGxvd0Zpc2hUaXA6XCJmaXNoX2ZvbGxvd0Zpc2hUaXBcIiwgICAgICAgICAgICAvL+aYvuekuumxvOawlOazoVxyXG4gICAgICAgIGNsZWFyRm9sbG93RmlzaFRpcDpcImZpc2hfY2xlYXJGb2xsb3dGaXNoVGlwXCIsICAvL+a4heeQhuaYvuekuumxvOawlOazoVxyXG4gICAgfSxcclxuICAgIG5vZGVaSW5kZXg6e1xyXG4gICAgICAgIHpJbmRleEZpc2g6MTAsXHJcbiAgICAgICAgekluZGV4TWF4RmlzaDo0MDAwLFxyXG4gICAgICAgIHpJbmRleEJ1bGxldDo1MDAwLFxyXG4gICAgICAgIHpJbmRleFBhcnRCb29tOjYwMDAsXHJcbiAgICAgICAgekluZGV4QWxsQm9vbTo3MDAwLFxyXG4gICAgICAgIHpJbmRleEFuaTo4MDAwLFxyXG4gICAgfSxcclxuXHJcbiAgICBTa2lsbGlzTG9ja0F1dG9DaGFuZ2U6XCJTa2lsbGlzTG9ja0F1dG9DaGFuZ2VcIixcclxuICAgIFNraWxsTG9jazpcIlNraWxsTG9ja1wiLFxyXG4gICAgU2tpbGxBdXRvOlwiU2tpbGxBdXRvXCIsXHJcbiAgICBHdW5MZXZlbDpcImd1bkxldmVsX1wiLFxyXG5cclxuICAgIFRpcFRpbWU6NSwgLy/msJTms6HmmL7npLrml7bpl7TlkajmnJ8o5Y2V5L2N77yacylcclxuXHJcbiAgICBTaG9vdEJ1dHRvbU1pbjo1MCwvL+WwhOWHu+acgOWwj+inkuW6pui3neemu+W6lemDqOi3neemu1xyXG4gICAgRGVzaWduU2l6ZSA6IGNjLlNpemUoMTkyMCwxMDgwKSwgLy/orr7orqHlsLrlr7hcclxuXHJcbiAgICBEZWxheURpZVRpbWU6MC4xLC8v54aU5bKp546E5q2m54K45by55q275LqhIOW7tui/n+aXtumXtFxyXG4gICAgZGllVHlwZTA6MCwgICAgIC8v6Ieq54S25q275LqhXHJcbiAgICBkaWVUeXBlMToxLCAgICAgLy/njqnlrrbmlLvlh7tcclxuICAgIGRpZVR5cGUyOjIsICAgICAvL+WFqOWxj+eCuOW8uVxyXG4gICAgZGllVHlwZTM6MywgICAgIC8v6Zeq55S1XHJcbiAgICBkaWVUeXBlNDo0LCAgICAgLy/ml4vmtqFcclxuXHJcbiAgICBCb3NzU1lMV0JnTXVzaWM6NCwgICAgICAgICAgIC8v5rex5riK6b6Z546LIOiDjOaZr+WjsOmfs1xyXG4gICAgQm9zc0xhdmFCYXNhbHRCZ011c2ljOjUsICAgICAvL+eGlOWyqeeOhOatpiDog4zmma/lo7Dpn7NcclxuICAgIEJvc3NHb2RPZldlYWx0aEJnTXVzaWM6NiwgICAgLy/otKLnpZ4g6IOM5pmv5aOw6Z+zXHJcbiAgICBmaXNoU291bmRzOiB7XHJcbiAgICAgICAgXCJtYW5fZGllXzAxXCI6IDAsXHJcbiAgICAgICAgXCJtYW5fZGllXzAyXCI6IDEsXHJcbiAgICAgICAgXCJtYW5fZGllXzAzXCI6IDIsXHJcbiAgICAgICAgXCJtYW5fZGllXzA0XCI6IDMsXHJcbiAgICAgICAgXCJtYW5fZGllXzA1XCI6IDQsXHJcbiAgICAgICAgXCJtYW5fZGllXzA2XCI6IDUsXHJcbiAgICAgICAgXCJtYW5fZGllXzA3XCI6IDYsXHJcbiAgICAgICAgXCJtYW5fZGllXzA4XCI6IDcsXHJcbiAgICAgICAgXCJ3b21hbl9kaWVfMDFcIjogOCxcclxuICAgICAgICBcIndvbWFuX2RpZV8wMlwiOiA5LFxyXG4gICAgICAgIFwid29tYW5fZGllXzAzXCI6IDEwLFxyXG4gICAgICAgIFwid29tYW5fZGllXzA0XCI6IDExLFxyXG4gICAgICAgIFwid29tYW5fZGllXzA1XCI6IDEyLFxyXG4gICAgICAgIFwid29tYW5fZGllXzA2XCI6IDEzLFxyXG4gICAgICAgIFwid29tYW5fZGllXzA3XCI6IDE0LFxyXG4gICAgICAgIFwid29tYW5fZGllXzA4XCI6IDE1LFxyXG4gICAgICAgIFwiYmlnbnVtYmVyXCI6IDE2LFxyXG4gICAgICAgIFwiYnV0dG9uXCI6IDE3LFxyXG4gICAgICAgIFwiYnV0dG9uLTFcIjogMTgsXHJcbiAgICAgICAgXCJjb2luXCI6IDE5LFxyXG4gICAgICAgIFwiY291bi0xXCI6IDIwLFxyXG4gICAgICAgIFwiZWZmZWN0X2JsYXN0XCI6IDIxLFxyXG4gICAgICAgIFwiZWZmZWN0X2Nob3BwaW5nXCI6IDIyLFxyXG4gICAgICAgIFwiZWZmZWN0X2VsZWN0cmljXCI6IDIzLFxyXG4gICAgICAgIFwiZWZmZWN0X2VuZXJneVwiOiAyNCxcclxuICAgICAgICBcImVmZmVjdF9mcm96ZW5cIjogMjUsXHJcbiAgICAgICAgXCJsYXVuY2hcIjogMjYsXHJcbiAgICAgICAgXCJsYXVuY2gtMVwiOiAyNyxcclxuICAgICAgICBcImxldmVsX3N3aXRjaFwiOiAyOCxcclxuXHJcbiAgICAgICAgXCJQYXJ0aWFsU2VuZFwiOiAyOSwvL+eCjueIhuWPkeWwhFxyXG4gICAgICAgIFwiTGFzZXJTZW5kXCI6IDMwLC8v6b6Z5oGv5Y+R5bCEXHJcbiAgICAgICAgXCJNaXNzaWxlQm9vbVwiOiAzMSwvL+S7meWJkeeIhueCuFxyXG4gICAgICAgIFwiTWlzc2lsZUhpdFwiOiAzMiwvL+S7meWJkeeisOaSnlxyXG4gICAgICAgIFwiUGFydGlhbEJvbWJcIjogMzMsLy/ngo7niIbniIbngrhcclxuICAgICAgICBcImJpZ251bWJlclwiOiAzNCwvL+WHuueOsDItNOaMoei9rOebmOaXtlxyXG4gICAgfSxcclxuXHJcbiAgICBmaXNoU291bmRzMjoge1xyXG4gICAgICAgIFwidm9pY2VGaWxlMVwiICAgICA6IDAsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUyXCIgICAgIDogMSxcclxuICAgICAgICBcInZvaWNlRmlsZTNcIiAgICAgOiAyLFxyXG4gICAgICAgIFwidm9pY2VGaWxlNFwiICAgICA6IDMsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGU1XCIgICAgIDogNCxcclxuICAgICAgICBcInZvaWNlRmlsZTZcIiAgICAgOiA1LFxyXG4gICAgICAgIFwidm9pY2VGaWxlN1wiICAgICA6IDYsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGU4XCIgICAgIDogNyxcclxuICAgICAgICBcInZvaWNlRmlsZTlcIiAgICAgOiA4LFxyXG4gICAgICAgIFwidm9pY2VGaWxlMTBcIiAgICA6IDksXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxMVwiICAgIDogMTAsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxMlwiICAgIDogMTEsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxM1wiICAgIDogMTIsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxNFwiICAgIDogMTMsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxNVwiICAgIDogMTQsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxNlwiICAgIDogMTUsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxN1wiICAgIDogMTYsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxOFwiICAgIDogMTcsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUxOVwiICAgIDogMTgsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUyMFwiICAgIDogMTksXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUyMVwiICAgIDogNDYsXHJcbiAgICAgICAgXCJ2b2ljZUZpbGUyMlwiICAgIDogNDcsXHJcblxyXG4gICAgICAgIFwiZ2V0Vm9pY2UxXCIgICAgICA6IDIwLC8vMeaMoVxyXG4gICAgICAgIFwiZmx5R29sZFwiICAgICAgICA6IDIxLC8v6aOe6YeR5biBXHJcbiAgICAgICAgXCJnZXRWb2ljZTJcIiAgICAgIDogMjIsLy8y5oyhXHJcbiAgICAgICAgXCJnZXRWb2ljZTNcIiAgICAgIDogMjMsLy8z5oyhXHJcbiAgICAgICAgXCJnZXRWb2ljZTRcIiAgICAgIDogMjQsLy805oyhXHJcblxyXG4gICAgICAgIFwiYm9zc0NvbWluWHVhbld1XCIgICA6IDI1LCAgLy9CT1NT6K2m5ZGK546E5q2mXHJcbiAgICAgICAgXCJib3NzQ29taW5DYWlTaGVuXCIgIDogMjYsICAvL0JPU1PorablkYrotKLnpZ5cclxuICAgICAgICBcImdldENhaVNoZW5SZXdcIiAgICAgOiAyNywgIC8v5o2V6I635Yiw6LSi56We5Ye6546w5bCPVUnml7bvvIzmkq3mlL5cclxuICAgICAgICBcImdldFl1UnVcIiAgICAgICAgICAgOiAyOCwgIC8v5o2V6I63546J5aaC5oSP5LiA556s6Ze05pKt5pS+XHJcbiAgICAgICAgXCJnZXRKdUJhb1wiICAgICAgICAgIDogMjksICAvL+aNleiOt+iBmuWuneebhuS4gOeerOmXtOaSreaUvlxyXG4gICAgICAgIFwiYXR0YWNrMV8zXCIgICAgICAgICA6IDMwLCAgLy/mma7pgJrmlLvlh7sgMS0zXHJcbiAgICAgICAgXCJzeUJvc3NEaWVcIiAgICAgICAgIDogMzEsICAvL+a3sea4ium+meeOi+atu+S6oeaSreaUvlxyXG4gICAgICAgIFwicm9uZ1lhbkJvc3NCb29tXCIgICA6IDMyLCAgLy/nhpTlsqnnjoTmrabniIbngrhcclxuICAgICAgICBcInJvbmdZYW5Cb3NzRGllXCIgICAgOiAzMywgIC8v54aU5bKp546E5q2m5q275Lqh77yM5Ye6546w6YKj5Liq5pKt5oql55uY5pe25pKt5pS+6L+Z5LiqXHJcbiAgICAgICAgXCJhdHRhY2s0XzZcIiAgICAgICAgIDogMzQsICAvL+aZrumAmuaUu+WHuyA0LTZcclxuICAgICAgICBcInVzZXJZdVJ1WWlcIiAgICAgICAgOiAzNSwgIC8v546J5aaC5oSP6L2s55uY5L2/55SoXHJcbiAgICAgICAgXCJnZXRTcGNsaWFVc2VyXCIgICAgIDogMzYsICAvL+iOt+W+l+eJueauiueCruWPsOaXtuaSreaUvlxyXG4gICAgICAgIFwibGlnaHRuaW5nSGl0XCIgICAgICA6IDM3LCAgLy/pl6rnlLXlh7vkuK3psbxcclxuICAgICAgICBcImxpZ2h0bmluZ0Rpc3BhdGhcIiAgOiAzOCwgIC8v6Zeq55S15Y+R5bCEXHJcbiAgICAgICAgXCJ0aWRlQ29taW5cIiAgICAgICAgIDogMzksICAvL+mxvOa9ruadpeiireS9v+eUqFxyXG4gICAgICAgIFwiYXR0YWNrN185XCIgICAgICAgICA6IDQwLCAgLy/mma7pgJrmlLvlh7sgNy05XHJcbiAgICAgICAgXCJhdHRhY2sxMFwiICAgICAgICAgIDogNDEsICAvL+aZrumAmuaUu+WHuyAxMFxyXG4gICAgICAgIFwianVCYW9HZXRcIiAgICAgICAgICA6IDQyLCAgLy/ogZrlrp3nm4bojrflvpdcclxuICAgICAgICBcImp1QmFvU2hvd051bVwiICAgICAgOiA0MywgIC8v6IGa5a6d55uG5pi+56S65pWw5a2XXHJcbiAgICAgICAgXCJ5dVJ1R2V0XCIgICAgICAgICAgIDogNDQsICAvL+eOieWmguaEj+iOt+W+l1xyXG4gICAgICAgIFwiYm9zc0NzQ29taW5cIiAgICAgICA6IDQ1LCAgLy9ib3NzIOi0ouelnumZjeS4tFxyXG4gICAgfSxcclxuXHJcbiAgICBSdW5mcmVxdWVuY3k6MTAgLCAgICAgICAvL+W4p+WbvmR06aKR546HXHJcbiAgICBVbkxvY2tNYXhUaW1lOjAuMywgICAgICAvL+ino+mUgeaXtumXtFxyXG4gICAgTm9vbkZpc2g6LTEsICAgICAgICAgICAgLy/ml6DpsbxcclxuICAgIE1pc3NpbGVDaGFuZ2VSZWQ6Mi41LCAgIC8v5LuZ5YmR56Kw5pKe57uT5p2f5Y+Y57qi5pe26Ze0XHJcbiAgICBNaXNzaWxlUmVkVmFsdWU6MCwgICAgICAvL+S7meWJkeWPmOe6ouminOiJsuWAvFxyXG4gICAgTWlzc2lsZVJlZE1heFZhbHVlOjI1NSwgLy/ku5nliZHlj5jnuqLliY1cclxuICAgIE1pc3NpbGVSZWRTcGVlZDoxMDAsICAgIC8v5LuZ5YmR5Y+Y57qi6YCf5bqmXHJcbiAgICBCdWxsZXRNYXhUaW1lOjMwLCAgICAgICAvL+WtkOW8uei/kOWKqOaXtuacgOmVv+WtmOa0u+aXtumXtFxyXG4gICAgTGlnaHRuaW5nVzo0ODEsICAgICAgICAgLy/pl6rnlLXlrr3luqZcclxuICAgIExpZ2h0bmluZ0g6MTAxLCAgICAgICAgIC8v6Zeq55S16auY5bqmXHJcbiAgICBNYXhpbXVtQnVsbGV0Q29sbGlzaW9uVGltZToxLjE1LCAvL+m+mea6queCruW8ueWPkeWwhOaXtumXtOmXtOmalFxyXG4gICAgT3BlbnRpb246e1xyXG4gICAgICBDaGFuZ2VDYW5ub25MdjozICAgICAgLy/liIfmjaLngq7lj7DlgI3njodcclxuICAgIH0sXHJcbiAgICBFZmZlY3RUeXBlOnsgICAgICAgICAgICAvL+WKqOeUu+aSreaUvuWZqOaSreaUvueahOWKqOeUu+exu+Wei1xyXG4gICAgICAgIEZpc2g6MSwgICAgICAgICAgICAgLy/psbxcclxuICAgICAgICBFZmZlY3Q6MiwgICAgICAgICAgIC8v54m55pWIXHJcbiAgICB9LFxyXG4gICAgQ2Fubm9uVHlwZTp7ICAgICAgICAgICAgLy/mma7pgJrngq7lj7AgMCDnibnmrorngq7lj7Ag77yMMiwz77yMNO+8jOeJueauiuaViOaenCAxXHJcbiAgICAgICAgTm90ICAgICAgICAgOiAtMSwgICAvLyDpg73kuI3mmK9cclxuICAgICAgICBOb3JtYWwgICAgICA6IDAsICAgIC8vIOaZrumAmueCruWPsFxyXG4gICAgICAgIEJvbWIgICAgICAgIDogMSwgICAgLy8g54aU5bKp546E5q2mIOWFqOWxj+eIhueCuFxyXG4gICAgICAgIExpZ2h0bmluZyAgIDogMiwgICAgLy8g6Zeq55S1XHJcbiAgICAgICAgUGFydGlhbEJvbWIgOiAzLCAgICAvLyDngo7niIZcclxuICAgICAgICBMYXNlciAgICAgICA6IDQsICAgIC8vIOm+meaBr1xyXG4gICAgICAgIE1pc3NpbGUgICAgIDogNSwgICAgLy8g5LuZ5YmRXHJcbiAgICB9LFxyXG4gICAgQ2Fubm9uR2V0RWRkZWN0OnsgICAvL+eJueauiueCruWPsOiOt+WPlui/m+ihjOaXtiDnibnmlYjlm75cclxuICAgICAgICBMYXNlciAgOiAgICAgICAgXCJ0ZXhfc2RxMl9cIiwvLyDpvpnmga9cclxuICAgICAgICBMaWdodG5pbmcgOiAgICAgXCJ0ZXhfc2RxMV9cIiwvLyDpl6rnlLVcclxuICAgICAgICBQYXJ0aWFsQm9tYiA6ICAgXCJ0ZXhfc2RxM19cIiwvLyDngo7niIZcclxuICAgICAgICBNaXNzaWxlIDogICAgICAgXCJ0ZXhfc2RxNF9cIiwvLyDku5nliZFcclxuICAgIH0sXHJcbiAgICBDYW5ub25Hb3RFZGRlY3Q6eyAgICAvL+eJueauiueCruWPsOiOt+WPluWIsCDopoHmkq3mlL4gc3BpbmXnmoQg54m55pWIXHJcbiAgICAgICAgTGFzZXIgIDogICAgICAgIFwiYW5pbWF0aW9uXCIsLy8g6b6Z5oGvXHJcbiAgICAgICAgTGlnaHRuaW5nIDogICAgIFwiYW5pbWF0aW9uXCIsLy8g6Zeq55S1XHJcbiAgICAgICAgUGFydGlhbEJvbWIgOiAgIFwiYW5pbWF0aW9uXCIsLy8g54KO54iGXHJcbiAgICAgICAgTWlzc2lsZSA6ICAgICAgIFwiYW5pbWF0aW9uXCIsLy8g5LuZ5YmRXHJcbiAgICB9LFxyXG4gICAgQ2Fubm9uU2tpbjp7ICAgICAgICAgICAvL+eJueauiueCruWPsOeahCDnmq7ogqQg5L+d5a2YIGJhdHRlcnlMaXN0IOeahOS4i+agh+WNs+WPr1xyXG4gICAgICAgIExhc2VyICA6ICAgICAgICAxMiwvLyDpvpnmga9cclxuICAgICAgICBMaWdodG5pbmcgOiAgICAgMTAsLy8g6Zeq55S1XHJcbiAgICAgICAgUGFydGlhbEJvbWIgOiAgIDExLC8vIOeCjueIhlxyXG4gICAgICAgIE1pc3NpbGUgOiAgICAgICAxMywvLyDku5nliZFcclxuICAgIH0sXHJcbiAgICBDYW5ub25DaGFuZ2VFZmZlY3Q6eyAgLy/nibnmrorngq7lj7DnmoTlj5jouqvliqjnlLsg5L+d5a2YIGNoYW5nZUNhbm5vbkVmZmVjdExpc3Qg55qE5LiL5qCH5Y2z5Y+vXHJcbiAgICAgICAgTGFzZXIgIDogICAgICAgIDIsLy8g6b6Z5oGvXHJcbiAgICAgICAgTGlnaHRuaW5nIDogICAgIDAsLy8g6Zeq55S1XHJcbiAgICAgICAgUGFydGlhbEJvbWIgOiAgIDEsLy8g54KO54iGXHJcbiAgICAgICAgTWlzc2lsZSA6ICAgICAgIDMsLy8g5LuZ5YmRXHJcbiAgICB9LFxyXG4gICAgU3BlY2lhbEJ1bGxldFNraW46eyAgICAgICAgICAgICAgLy/nibnmrorlrZDlvLnnmq7ogqRcclxuICAgICAgICBOb3JtYWwgOiAgICAgICAgXCJidWxsZXRfXCIsICAgLy8g5pmu6YCaXHJcbiAgICAgICAgTGlnaHRuaW5nIDogICAgIFwiYnVsbGV0XzExXCIsIC8vIOmXqueUtVxyXG4gICAgICAgIFBhcnRpYWxCb21iIDogICBcImJ1bGxldF8xM1wiLCAvLyDngo7niIZcclxuICAgICAgICBNaXNzaWxlIDogICAgICAgXCJidWxsZXRfMTJcIiwgLy8g5LuZ5YmRXHJcbiAgICB9LFxyXG4gICAgQ2Fubm9uT3BlbnRpb246eyAgICAvL+aTjeS9nOexu+Wei1xyXG4gICAgICAgIE5vcm1hbCA6ICAgICAgICAweDAxLC8vIOaZrumAmiDlsITlh7tcclxuICAgICAgICBOb3JtYWxIaXQgOiAgICAgMHgwMiwvLyDmma7pgJog5Ye75LitXHJcblxyXG4gICAgICAgIEJvbWIgOiAgICAgICAgICA0LC8vIOeGlOWyqeeOhOatpiDlhajlsY/ngrjlvLnlj5HlsIRcclxuICAgICAgICBMaWdodG5pbmcgOiAgICAgNSwvLyDpl6rnlLUg5a2Q5by55Y+R5bCEXHJcbiAgICAgICAgUGFydGlhbEJvbWIgOiAgIDYsLy8g54KO54iGIOWtkOW8ueWPkeWwhFxyXG4gICAgICAgIExhc2VyIDogICAgICAgICA3LC8vIOm+meaBryDlrZDlvLnlj5HlsIRcclxuICAgICAgICBNaXNzaWxlIDogICAgICAgOCwvLyDku5nliZEg5a2Q5by55Y+R5bCEXHJcblxyXG4gICAgICAgIEJvbWJIaXQgIDogICAgIDB4MTQsLy/nhpTlsqnnjoTmraYg5YWo5bGP54iG54K4IOeisOaSnlxyXG4gICAgICAgIExpZ2h0bmluZ0hpdDogIDB4MTUsLy/pl6rnlLXnorDmkp5cclxuICAgICAgICBQYXJ0aWFsQm9tYkhpdDoweDE2LC8v54KO54iG56Kw5pKeXHJcbiAgICAgICAgTGFzZXJIaXQgOiAgICAgMHgxNywvL+m+mea6queisOaSnlxyXG4gICAgICAgIE1pc3NpbGVIaXQgIDogIDB4MTgsLy/ku5nliZHnorDmkp5cclxuXHJcbiAgICB9LFxyXG4gICAgQ2Fubm9uRGVzYzp7ICAvL+WtkOW8ueWQjeWtl1xyXG4gICAgICAgIDAgOiAgXCLmma7pgJpcIixcclxuICAgICAgICAyIDogIFwi6Zeq55S1XCIsXHJcbiAgICAgICAgMyA6ICBcIueCjueIhlwiLFxyXG4gICAgICAgIDQgOiAgXCLpvpnmga9cIixcclxuICAgICAgICA1IDogIFwi5LuZ5YmRXCIsICAgICAgICAvL+mSu+WktCArIOeIhueCuCDmlYjmnpxcclxuICAgICAgICAxIDogIFwi54aU5bKp546E5q2mXCIsICAgICAvL+WFqOWxj+eCuOW8uSDmlYjmnpxcclxuICAgIH0sXHJcbiAgICBUcmVhc3VyZUJvd2w6ODAxLCAgICAgICAvL+iBmuWuneebhlxyXG4gICAgWXVSdXlpOjgwMiwgICAgICAgICAgICAgLy/njonlpoLmhI9cclxuICAgIEJvc3NHb2RPZldlYWx0aDo5MDEsICAgIC8v6LSi56WeXHJcbiAgICBCb3NzTGF2YUJhc2FsdDo5MDIsICAgICAvL+eGlOWyqeeOhOatplxyXG4gICAgU0hCRjo2MDUsICAgICAgICAgICAgICAgLy/mt7HmtbfonZnonaBcclxuICAgIEJvc3NTWUxXOjkwMywgICAgICAgICAgIC8v5rex5riK6b6Z546LXHJcbiAgICBTcGVjaWFSZXNQcmU6XCJpbWdfaWNvblwiLC8v54m55q6K6bG85Zu+6ZuG5YmN57yAXHJcbiAgICAvL+eJueauiumxvOenjeaPkOekuiBpZOWIl+ihqFxyXG4gICAgU3BlY2lhbEZpc2hUeXBlSWRzOltcclxuICAgICAgICA5MDMsICAgIC8v5rex5riK6b6Z546LXHJcbiAgICAgICAgOTAyLCAgICAvL+eGlOWyqeeOhOatplxyXG4gICAgICAgIDkwMSwgICAgLy/otKLnpZ5cclxuICAgICAgICA4MDIsICAgIC8v546J5aaC5oSPXHJcbiAgICAgICAgODAxLCAgICAvL+iBmuWuneebhlxyXG4gICAgICAgIDcwNCwgICAgLy/otJ/liZHon7lcclxuICAgICAgICA3MDMsICAgIC8v6b6Z5oGv6J+5XHJcbiAgICAgICAgNzAyLCAgICAvL+eCjueIhuifuVxyXG4gICAgICAgIDcwMSAgICAgLy/pl6rnlLXon7lcclxuICAgIF0sXHJcbiAgICBTcGluZU5hbWU6eyAgICAgICAgICAgICAgICAgIC8v5Yqo55S75p6a5Li+XHJcbiAgICAgICAgTm9ybWFsOlwiYW5pbWF0aW9uXCIsICAgICAgLy/mma7pgJrliqjnlLtcclxuICAgICAgICBJZGxlOlwiaWRsZVwiLCAgICAgICAgICAgICAvL+WFtuS7lueCruWPsOW+heacuuWKqOeUu+aIluS7meWJkeW3suiOt+W+l+WJkeW+heacuuWKqOeUu1xyXG4gICAgICAgIElkbGUyOlwiaWRsZTJcIiwgICAgICAgICAgIC8v5LuZ5YmR5pyq6I635b6X5YmR5b6F5py65Yqo55S7XHJcbiAgICAgICAgR2V0OlwiZ2V0XCIsICAgICAgICAgICAgICAgLy/ku5nliZHojrflvpfliZHliqjnlLtcclxuICAgICAgICBBdHRhY2s6XCJhdHRhY2tcIiwgICAgICAgICAvL+aUu+WHu+WKqOeUu++8jOWQjuWdkOWKm+WKqOeUu1xyXG4gICAgICAgIExvY2tTdGFydDpcImFuaW1hdGlvbl8wMVwiLC8v6ZSB5a6a5byA5aeLXHJcbiAgICAgICAgTG9ja0luZzpcImFuaW1hdGlvbl8wMlwiLCAgLy/plIHlrprkuK1cclxuICAgICAgICBHb2xkTWluOlwiYW5pbWF0aW9uMVwiLCAgICAvL+mHkeW4geeIhueCuOWkmueahFxyXG4gICAgICAgIEdvbGRNYXg6XCJhbmltYXRpb24yXCIsICAgIC8v6YeR5biB54iG54K45bCR55qEXHJcbiAgICAgICAgU2lsdmVyTWluOlwiYW5pbWF0aW9uMVwiLCAgLy/pk7bluIHniIbngrjlpJrnmoRcclxuICAgICAgICBTaWx2ZXJNYXg6XCJhbmltYXRpb24yXCIsICAvL+mTtuW4geeIhueCuOWwkeeahFxyXG5cclxuICAgICAgICBZb3VIZXJlVG9wOlwiYW5pbWF0aW9uMlwiLCAgIC8v5oKo5Zyo6L+Z6YeM77yM5LiK6Z2iXHJcbiAgICAgICAgWW91SGVyZUJ1dHRvbTpcImFuaW1hdGlvbjFcIiwvL+aCqOWcqOi/memHjO+8jOS4i+mdolxyXG5cclxuXHJcbiAgICAgICAgVHVyblRhYmxlSWRsZTpcImFuaW1hdGlvbl8yXCIsICAgICAgLy/ovaznm5hpZGxl54q25oCBXHJcbiAgICAgICAgVHVyblRhYmxlU2hvd1RpbWU6XCJhbmltYXRpb25fMVwiLCAgLy/ovaznm5jlh7rnjrDnmoTniIbngrjlhYnmlYhcclxuXHJcbiAgICB9LFxyXG4gICAgLy/ovaznm5jmoaPmrKFcclxuICAgIEVmZmVjdFJvdGF0ZUxldmVsOntcclxuICAgICAgICBOb3JtYWwgICAgICA6MCxcclxuICAgICAgICBPbmVMZXZlbCAgICA6MSxcclxuICAgICAgICBUb3dMZXZlbCAgICA6MixcclxuICAgICAgICBUaHJlZUxldmVsICA6MyxcclxuICAgICAgICBGb3VyTGV2ZWwgICA6NCxcclxuICAgIH0sXHJcbiAgICAvL+S9jee9rlxyXG4gICAgU2VhdDp7XHJcbiAgICAgICAgTGVmdERvd20gICAgOjAsIC8v5Y+z5LiL6KeSXHJcbiAgICAgICAgUmlnaHREb3dtICAgOjEsIC8v5bem5LiL6KeSXHJcbiAgICAgICAgTGVmdFRvcCAgICAgOjIsIC8v5Y+z5LiK6KeSXHJcbiAgICAgICAgUmlnaHRUb3AgICAgOjMsIC8v5bem5LiK6KeSXHJcbiAgICB9LFxyXG4gICAgQXdhcmRUeXBlIDoge1xyXG4gICAgICAgIFJVWUkgICAgICAgIDoxLCAgLy/lpoLmhI9cclxuICAgICAgICBDT1JOVUNPUElBICA6MiAgIC8v6IGa5a6d6bmPXHJcbiAgICB9LFxyXG4gICAgSGl0Q29sb3I6e1xyXG4gICAgICAgIE5vcm1hbDpjYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpLC8v5q2j5bi454q25oCBXHJcbiAgICAgICAgQXR0YWNrOmNjLmNvbG9yKDIzNCw3OSw3OSwyNTUpLCAgLy/mlLvlh7vnirbmgIFcclxuICAgICAgICBEZWF0OmNjLmNvbG9yKDI1NSwwLDAsMjU1KSAgICAgICAvL+atu+S6oeeKtuaAgVxyXG4gICAgfSxcclxuICAgIC8v55So5oi36ZyA6KaBIOe/u+i9rDE4MMKwIOaJgOmcgOiuvue9rueahG5vZGXnmoTop5LluqbjgIHlgY/np7vph4/nrYkg5pWw5o2uXHJcbiAgICBJc05lZWRSb3RhdGlvbjoge1xyXG4gICAgICAgIFwibmZpc2hfZGVza1VJQ29udGFpbmVyXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcbiAgICAgICAgXCJ1aV9waHlzaWNhbFBvb2xcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsfSxcclxuXHJcbiAgICAgICAgXCJza2lsbENhbnRhaW5lclwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG5cclxuICAgICAgICBcInVpX21lbnVDYW50YWluZXJcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsfSxcclxuICAgICAgICBcInNwaW5lX2VmZmVjdFwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG4gICAgICAgIFwiYm9zc0NvbmluQ2FudGFpbmVyXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcblxyXG4gICAgICAgIFwiYWxlcnRfY29udGFpbmVyXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcblxyXG4gICAgICAgIFwidWlfY29pbkVmZmVjdFBvc1wiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG4gICAgICAgIFwidWlfTG9ja0NhbnRhaW5lclwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG5cclxuICAgICAgICBcImZseUdvbGRDb2luTGFiXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcbiAgICAgICAgXCJmbHlTaWx2ZXJDb2luTGFiXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcblxyXG4gICAgICAgIFwiY29pbkJnX2NhbnRhaW5lclwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG5cclxuICAgICAgICBcInVpX3dhaXRcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsLHJlcGVhdDp0cnVlfSxcclxuICAgICAgICBcImxhYl9ndW5MdlwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG4gICAgICAgIFwibGFiX2d1bkx2MlwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG4gICAgICAgIFwiYnRuX3N1Yl9wbHVzX2NhbnRhaW5lclwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG5cclxuICAgICAgICBcInVpX2ZpcmVFZmZlY3RcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsfSxcclxuXHJcbiAgICAgICAgXCJ1aV9maXNoVGlkZVRpdGxlXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcblxyXG4gICAgICAgIFwidWlfMFwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwsc2NhbGU6e3g6MSx5Oi0xfX0sXHJcbiAgICAgICAgXCJ1aV8xXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbCxzY2FsZTp7eDoxLHk6LTF9fSxcclxuICAgICAgICBcInVpXzJcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsLHNjYWxlOnt4OjEseToxfX0sXHJcbiAgICAgICAgXCJ1aV8zXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbCxzY2FsZTp7eDoxLHk6MX19LFxyXG5cclxuICAgICAgICBcInVpX0V4aXRUaXBcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsfSxcclxuICAgICAgICBcImltZ190aXBzXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcbiAgICAgICAgXCJub0NsaWNrRklzaF90aXBzXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcbiAgICAgICAgXCJwdWJsaWNUaXBcIjp7YW5nbGU6MTgwLHdpZGdldDpudWxsLG9mZnNleDpudWxsfSxcclxuXHJcbiAgICAgICAgXCJwb3NMaXN0XCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbCxyZXBlYXQ6dHJ1ZX0sXHJcbiAgICAgICAgXCJtYXNrXCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbCxyZXBlYXQ6dHJ1ZX0sXHJcbiAgICAgICAgXCJjb3JudWNvcGlhVmlld1wiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG4gICAgICAgIFwic3BpbmVfc2hvd1wiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG5cclxuICAgICAgICBcIm5maXNoX3R1cm50YWJsZVwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGx9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwidHVybnRhYmxlUG9zTGlzdFwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG5cclxuICAgICAgICBcIm5ldFN0YXR1c0NvbnRhaW5lclwiOnthbmdsZToxODAsd2lkZ2V0Om51bGwsb2Zmc2V4Om51bGwscmVwZWF0OnRydWV9LFxyXG5cclxuICAgICAgICBcImxvYWRpbmdWaWV3XCI6e2FuZ2xlOjE4MCx3aWRnZXQ6bnVsbCxvZmZzZXg6bnVsbH0sXHJcblxyXG4gICAgfSxcclxuICAgIFVzZXJTdGF0dXM6eyAgICAgICAgICAvL+eUqOaIt+WKqOS9nFxyXG4gICAgICAgIE9uTGluZSA6ICAgICAgICAxLC8vIOWcqOe6v1xyXG4gICAgICAgIE9mZkxpbmUgOiAgICAgICAwIC8vIOaOiee6v1xyXG4gICAgfSxcclxuICAgIEFsZXJ0VHlwZTp7ICAgICAgICAgICAgICAgICAgIC8vQWxlcnTliqjkvZxcclxuICAgICAgICBCb3NzQ2xlYXJTb2NyZSA6ICAgICAgICAxLC8vIOa4heeQhmJvc3Pnp6/liIZcclxuICAgICAgICBMb3NDYW5uYW4gOiAgICAgICAgICAgICAyLC8vIOWkseWOu+eCruWPsFxyXG4gICAgICAgIE5ldE9mZiA6ICAgICAgICAgICAgICAgIDMsLy8g5pat572RXHJcbiAgICB9LFxyXG59Il19
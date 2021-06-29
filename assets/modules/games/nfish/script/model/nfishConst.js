module.exports = {
    // s -> c 接收服务器
    STCEvent:{
        onSyncData:"onSyncData",
        onEnterRoom:"onEnterRoom",
        onTideScript:"onTideScript",
        onFishGroupScript:"onFishGroupScript",
        onAddFishLine:"onAddFish",
        onShoot:"onShoot",
        onUseSpecialCannon:"onUseSpecialCannon",
        onKill:"onKill",
        onLeaveRoom:"onLeaveRoom",
        onCoinChanged:"onCoinChanged",
        onChangeCannonLevel:"onChangeCannonLevel",
        onMissileBomb:"onMissileBomb",
        onOffline:"onOffline",
        onOnline:"onOnline",
        horseRaceLamp:"horseRaceLamp",
    },
    //客户端通知事件
    clientEvent:{
        netDisconnect:"net.disconnect",             //断网
        EnterBackground:"EnterBackground",          //切后台
        EnterForeground:"EnterForeground",          //切前台
        //公共
        fishSound:"fish_fishSound",                 //播放声音
        fishBgSound:"fish_fishBgSound",             //播放背景声音
        checkBgMusic:"fish_checkBgMusic",           //检查背景音乐

        //背景
        changeBackGround:"fish_changeBackGround",   //切换背景
        seaWaveChangeBg:"fish_seaWaveChangeBg",     //海浪鱼群 - 切换背景

        //渔场
        adjustGunAngle:"fish_adjustGunAngle",       //调整高射炮角度
        initFishPool:"fish_initFishPool",           //初始化鱼塘
        addFishPool:"fish_addFishPool",             //加鱼
        addFishTide:"fish_addFishTide",             //加鱼潮
        playShootBullet:"fish_playShootBullet",     //用户射击
        playFishnetEffect:"fish_playFishnetEffect", //生成渔网
        onKillFish:"fish_onKillFishCline",          //销毁鱼
        onFreezeStartStop:"fish_onFreezeStartStop", //冰冻开始-结束
        leaveRoomUnLock:"fish_leaveRoomUnLock",     //用户离开解锁
        seaWaveFishGroup:"fish_seaWaveFishGroup",   //海浪鱼-快速游走
        fishCancelShoot:"fish_fishCancelShoot",     //停止射击
        disposeFishNode:"fish_disposeFishNode",     //销毁鱼
        initBulletList:"fish_initBulletList",       //初始化鱼池子弹-断连
        onSshock:"fish_onSshock",                   //震动屏幕
        playLockSpine:"fish_playLockSpine",         //播放锁定动画
        onSpecialBulletExp:"fish_SBE",              //特殊子弹爆炸
        onSpecialBomb:"fish_onSpecialBomb",         //熔岩玄武 全屏爆炸
        changeCantainer:"fish_changeCantainer",     //改变容器 scale
        lockSelfFish:"fish_lockSelfFish",           //锁定鱼
        checkRotationFishPool:"fish_checkRFP",      //设置旋转


        //桌子可见UI
        comeInPlayer:"fish_comeInPlayer",           //用户进入
        leaveRoomPlayer:"fish_leaveRoomPlayer",     //用户离开
        updateShootGold:"fish_updateShootGold",     //更新用户射击余额
        changeGunRate:"fish_changeGunRate",         //改变炮台倍率
        updateGunRate:"fish_updateGunRate",         //更新炮台倍率
        onFreezeShowUI:"fish_onFreezeShowUI",       //冰冻显示UI
        fireSettingRecoil:"fish_fireSettingRecoil", //为自己设置后坐力
        updateGunRecoil:"fish_updateGunRecoil",     //为其他玩家设置后坐力
        onCoinChanged:"fish_onCoinChanged",         //充值到账财神爷动画
        playCoinEffect:"fish_playCoinEffect",       //死鱼飘金币
        onSurfStart:"fish_onSurfStart",             //海浪鱼群-海浪UI
        showFishTideTitle:"fish_showFishTideTitle", //显示浪潮来临
        myUpdateMoney:"fish_myUpdateMoney",         //更新自己钱
        checkAutoAndLock:"fish_checkAutoAndLock",   //检查锁定和自动按钮
        bossComein:"fish_bossComein",               //boss出现
        useAutoSkill:"fish_useAutoSkill",           //使用锁定技能
        clickFishPool:"fish_clickFishPool",         //点击鱼池子
        hiddenLocationTip:"fish_hiddenLocationTip", //隐藏位置提示
        playFiringEffect:"fish_playFiringEffect",   //播放开炮效果
        useLockSkill:"fish_useLockSkill",           //使用锁定技能
        lightningSkills:"fish_lightningSkills",     //闪电
        getSpecialCannon:"fish_getSpecialCannon",   //获取到一个特殊炮台
        onLaserDispath:"fish_onLaserDispath",       //龙溪炮台发射子弹
        upSpecialGunCoin:"fish_upGunCoin",          //更新特殊炮台子弹数量
        restoreCannon:"fish_restoreCannon",         //特殊子弹用完恢复炮台
        sprinkleRedBag:"fish_sprinkleRedBag",       //财神出金币
        showTurntable:"fish_showTurntable",         //玉如意 聚宝盆 出转盘
        otherPlayerShowSpecialAward:"fish_oPSSA",  //其他人的 如意 聚宝鹏 展示
        specialBulletStatistics:"fish_sBS",        //特殊子弹统计
        checkRotation:"fish_checkRotation",        //设置旋转
        hideBossConinUI:"fish_hideBossConinUI",    //隐藏boss来了
        updateUserStatus:"fish_updateUserStatus",  //设置用户是否正在连线中
        addGoldEffect:"fish_addGoldEffect",        //飘分
        showAlert:"fish_showAlert",                //alert弹出框
        accumulate:"fish_Accumulate",              //播放蓄力
        closeLoading:"fish_closeLoading",          //关闭loading
        clearbossComein:"fish_clearbossComein",    //清理boss进入
        checkSpecialBullet:"fish_checkSpecialBut", //特殊子弹统计检查器
        clearSpecialBulletPool:"fish_clearSpecial", //清理特殊子弹
        bossGodOfWealthCoin:"fish_bossGodOfWealthCoin",//财神进入
        bossLavaBasaltComin:"fish_bossLavaBasaltComin",//熔岩玄武进入
        checkSpecialCannon:"fish_checkSpecialCannon",  //检查特殊炮台
    },
    nodeZIndex:{
        zIndexFish:100,
        zIndexBullet:200,
        zIndexFreeze:300,
        zIndexPartBoom:400,
        zIndexAllBoom:500,
        zIndexTowerNet:600,
        zIndexGoldColumn:700,
        zIndexGold:800,
        zIndexRotateEffect:900,
        zIndexAni:950,
        zIndexFunction:1000,
        zIndexTower:2100,
        zIndexTip:1200,
        zIndexAround:1300,
        zIndexTouch:2000,
    },

    DelayDieTime:0.1,//熔岩玄武炸弹死亡 延迟时间
    dieType0:0,     //自然死亡
    dieType1:1,     //玩家攻击
    dieType2:2,     //全屏炸弹
    dieType3:3,     //闪电
    dieType4:4,     //旋涡

    BossSYLWBgMusic:4,           //深渊龙王 背景声音
    BossLavaBasaltBgMusic:5,     //熔岩玄武 背景声音
    BossGodOfWealthBgMusic:6,    //财神 背景声音
    fishSounds: {
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

        "PartialSend": 29,//炎爆发射
        "LaserSend": 30,//龙息发射
        "MissileBoom": 31,//仙剑爆炸
        "MissileHit": 32,//仙剑碰撞
        "PartialBomb": 33,//炎爆爆炸
        "bignumber": 34,//出现2-4挡转盘时
    },

    fishSounds2: {
        "voiceFile1"     : 0,
        "voiceFile2"     : 1,
        "voiceFile3"     : 2,
        "voiceFile4"     : 3,
        "voiceFile5"     : 4,
        "voiceFile6"     : 5,
        "voiceFile7"     : 6,
        "voiceFile8"     : 7,
        "voiceFile9"     : 8,
        "voiceFile10"    : 9,
        "voiceFile11"    : 10,
        "voiceFile12"    : 11,
        "voiceFile13"    : 12,
        "voiceFile14"    : 13,
        "voiceFile15"    : 14,
        "voiceFile16"    : 15,
        "voiceFile17"    : 16,
        "voiceFile18"    : 17,
        "voiceFile19"    : 18,
        "voiceFile20"    : 19,
        "voiceFile21"    : 46,
        "voiceFile22"    : 47,

        "getVoice1"      : 20,//1挡
        "flyGold"        : 21,//飞金币
        "getVoice2"      : 22,//2挡
        "getVoice3"      : 23,//3挡
        "getVoice4"      : 24,//4挡

        "bossCominXuanWu"   : 25,  //BOSS警告玄武
        "bossCominCaiShen"  : 26,  //BOSS警告财神
        "getCaiShenRew"     : 27,  //捕获到财神出现小UI时，播放
        "getYuRu"           : 28,  //捕获玉如意一瞬间播放
        "getJuBao"          : 29,  //捕获聚宝盆一瞬间播放
        "attack1_3"         : 30,  //普通攻击 1-3
        "syBossDie"         : 31,  //深渊龙王死亡播放
        "rongYanBossBoom"   : 32,  //熔岩玄武爆炸
        "rongYanBossDie"    : 33,  //熔岩玄武死亡，出现那个播报盘时播放这个
        "attack4_6"         : 34,  //普通攻击 4-6
        "userYuRuYi"        : 35,  //玉如意转盘使用
        "getSpcliaUser"     : 36,  //获得特殊炮台时播放
        "lightningHit"      : 37,  //闪电击中鱼
        "lightningDispath"  : 38,  //闪电发射
        "tideComin"         : 39,  //鱼潮来袭使用
        "attack7_9"         : 40,  //普通攻击 7-9
        "attack10"          : 41,  //普通攻击 10
        "juBaoGet"          : 42,  //聚宝盆获得
        "juBaoShowNum"      : 43,  //聚宝盆显示数字
        "yuRuGet"           : 44,  //玉如意获得
        "bossCsComin"       : 45,  //boss 财神降临
    },

    Runfrequency:10 ,       //帧图dt频率
    UnLockMaxTime:0.3,      //解锁时间
    NoonFish:-1,            //无鱼
    MissileChangeRed:2.5,   //仙剑碰撞结束变红时间
    MissileRedValue:0,      //仙剑变红颜色值
    MissileRedMaxValue:255, //仙剑变红前
    MissileRedSpeed:100,    //仙剑变红速度
    BulletMaxTime:30,       //子弹运动时最长存活时间
    LightningW:481,         //闪电宽度
    LightningH:101,         //闪电高度
    MaximumBulletCollisionTime:1.15, //龙溪炮弹发射时间间隔
    Opention:{
      ChangeCannonLv:3      //切换炮台倍率
    },
    EffectType:{            //动画播放器播放的动画类型
        Fish:1,             //鱼
        Effect:2,           //特效
    },
    CannonType:{            //普通炮台 0 特殊炮台 ，2,3，4，特殊效果 1
        Not         : -1,   // 都不是
        Normal      : 0,    // 普通炮台
        Bomb        : 1,    // 熔岩玄武 全屏爆炸
        Lightning   : 2,    // 闪电
        PartialBomb : 3,    // 炎爆
        Laser       : 4,    // 龙息
        Missile     : 5,    // 仙剑
    },
    CannonGetEddect:{   //特殊炮台获取进行时 特效图
        Laser  :        "tex_sdq2_",// 龙息
        Lightning :     "tex_sdq1_",// 闪电
        PartialBomb :   "tex_sdq3_",// 炎爆
        Missile :       "tex_sdq4_",// 仙剑
    },
    CannonGotEddect:{    //特殊炮台获取到 要播放 spine的 特效
        Laser  :        "animation",// 龙息
        Lightning :     "animation",// 闪电
        PartialBomb :   "animation",// 炎爆
        Missile :       "animation",// 仙剑
    },
    CannonSkin:{           //特殊炮台的 皮肤 保存 batteryList 的下标即可
        Laser  :        12,// 龙息
        Lightning :     10,// 闪电
        PartialBomb :   11,// 炎爆
        Missile :       13,// 仙剑
    },
    CannonChangeEffect:{  //特殊炮台的变身动画 保存 changeCannonEffectList 的下标即可
        Laser  :        2,// 龙息
        Lightning :     0,// 闪电
        PartialBomb :   1,// 炎爆
        Missile :       3,// 仙剑
    },
    SpecialBulletSkin:{              //特殊子弹皮肤
        Normal :        "bullet_",   // 普通
        Lightning :     "bullet_11", // 闪电
        PartialBomb :   "bullet_13", // 炎爆
        Missile :       "bullet_12", // 仙剑
    },
    CannonOpention:{    //操作类型
        Normal :        0x01,// 普通 射击
        NormalHit :     0x02,// 普通 击中

        Bomb :          4,// 熔岩玄武 全屏炸弹发射
        Lightning :     5,// 闪电 子弹发射
        PartialBomb :   6,// 炎爆 子弹发射
        Laser :         7,// 龙息 子弹发射
        Missile :       8,// 仙剑 子弹发射

        BombHit  :     0x14,//熔岩玄武 全屏爆炸 碰撞
        LightningHit:  0x15,//闪电碰撞
        PartialBombHit:0x16,//炎爆碰撞
        LaserHit :     0x17,//龙溪碰撞
        MissileHit  :  0x18,//仙剑碰撞

    },
    CannonDesc:{  //子弹名字
        0 :  "普通",
        2 :  "闪电",
        3 :  "炎爆",
        4 :  "龙息",
        5 :  "仙剑",        //钻头 + 爆炸 效果
        1 :  "熔岩玄武",     //全屏炸弹 效果
    },
    TreasureBowl:801,       //聚宝盆
    YuRuyi:802,             //玉如意
    BossGodOfWealth:901,    //财神
    BossLavaBasalt:902,     //熔岩玄武
    SHBF:605,               //深海蝙蝠
    BossSYLW:903,           //深渊龙王
    SpeciaResPre:"img_icon",//特殊鱼图集前缀
    //特殊鱼种提示 id列表
    SpecialFishTypeIds:[
        903,    //深渊龙王
        902,    //熔岩玄武
        901,    //财神
        802,    //玉如意
        801,    //聚宝盆
        704,    //负剑蟹
        703,    //龙息蟹
        702,    //炎爆蟹
        701     //闪电蟹
    ],
    SpineName:{                  //动画枚举
        Normal:"animation",      //普通动画
        Idle:"idle",             //其他炮台待机动画或仙剑已获得剑待机动画
        Idle2:"idle2",           //仙剑未获得剑待机动画
        Get:"get",               //仙剑获得剑动画
        Attack:"attack",         //攻击动画，后坐力动画
        LockStart:"animation_01",//锁定开始
        LockIng:"animation_02",  //锁定中
        GoldMin:"animation1",    //金币爆炸多的
        GoldMax:"animation2",    //金币爆炸少的
        SilverMin:"animation1",  //银币爆炸多的
        SilverMax:"animation2",  //银币爆炸少的

        YouHereTop:"animation2",   //您在这里，上面
        YouHereButtom:"animation1",//您在这里，下面


        TurnTableIdle:"animation_2",      //转盘idle状态
        TurnTableShowTime:"animation_1",  //转盘出现的爆炸光效

    },
    //转盘档次
    EffectRotateLevel:{
        Normal      :0,
        OneLevel    :1,
        TowLevel    :2,
        ThreeLevel  :3,
        FourLevel   :4,
    },
    //位置
    Seat:{
        LeftDowm    :0, //右下角
        RightDowm   :1, //左下角
        LeftTop     :2, //右上角
        RightTop    :3, //左上角
    },
    AwardType : {
        RUYI        :1,  //如意
        CORNUCOPIA  :2   //聚宝鹏
    },
    HitColor:{
        Normal:cc.color(255,255,255,255),//正常状态
        Attack:cc.color(234,79,79,255),  //攻击状态
        Deat:cc.color(255,0,0,255)       //死亡状态
    },
    //用户需要 翻转180° 所需设置的node的角度、偏移量等 数据
    IsNeedRotation: {
        "nfish_deskUIContainer":{angle:180,widget:null,offsex:null},
        "ui_physicalPool":{angle:180,widget:null,offsex:null},

        "skillCantainer":{angle:180,widget:null,offsex:null},

        "ui_menuCantainer":{angle:180,widget:null,offsex:null},
        "spine_effect":{angle:180,widget:null,offsex:null},
        "bossConinCantainer":{angle:180,widget:null,offsex:null},

        "alert_container":{angle:180,widget:null,offsex:null},

        "ui_coinEffectPos":{angle:180,widget:null,offsex:null},
        "ui_LockCantainer":{angle:180,widget:null,offsex:null},

        "flyGoldCoinLab":{angle:180,widget:null,offsex:null},
        "flySilverCoinLab":{angle:180,widget:null,offsex:null},

        "coinBg_cantainer":{angle:180,widget:null,offsex:null,repeat:true},

        "ui_wait":{angle:180,widget:null,offsex:null,repeat:true},
        "lab_gunLv":{angle:180,widget:null,offsex:null,repeat:true},
        "lab_gunLv2":{angle:180,widget:null,offsex:null,repeat:true},
        "btn_sub_plus_cantainer":{angle:180,widget:null,offsex:null,repeat:true},

        "ui_fireEffect":{angle:180,widget:null,offsex:null},

        "ui_fishTideTitle":{angle:180,widget:null,offsex:null},

        "ui_0":{angle:180,widget:null,offsex:null,scale:{x:1,y:-1}},
        "ui_1":{angle:180,widget:null,offsex:null,scale:{x:1,y:-1}},
        "ui_2":{angle:180,widget:null,offsex:null,scale:{x:1,y:1}},
        "ui_3":{angle:180,widget:null,offsex:null,scale:{x:1,y:1}},

        "ui_ExitTip":{angle:180,widget:null,offsex:null},
        "img_tips":{angle:180,widget:null,offsex:null},
        "noClickFIsh_tips":{angle:180,widget:null,offsex:null},
        "publicTip":{angle:180,widget:null,offsex:null},

        "posList":{angle:180,widget:null,offsex:null,repeat:true},
        "mask":{angle:180,widget:null,offsex:null,repeat:true},
        "cornucopiaView":{angle:180,widget:null,offsex:null},
        "spine_show":{angle:180,widget:null,offsex:null},

        "nfish_turntable":{angle:180,widget:null,offsex:null},
        
        "turntablePosList":{angle:180,widget:null,offsex:null,repeat:true},

        "netStatusContainer":{angle:180,widget:null,offsex:null,repeat:true},

        "loadingView":{angle:180,widget:null,offsex:null},

    },
    UserStatus:{          //用户动作
        OnLine :        1,// 在线
        OffLine :       0 // 掉线
    },
    AlertType:{                   //Alert动作
        BossClearSocre :        1,// 清理boss积分
        LosCannan :             2,// 失去炮台
        NetOff :                3,// 断网
    },
}
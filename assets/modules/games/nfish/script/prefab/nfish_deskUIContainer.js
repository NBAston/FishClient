/***
 *  捕鱼：桌子UI 菜单、充值、炮台
 * **/
let CONST = require("nfishConst");

glGame.baseclass.extend({
    properties: {
        //金币银币漂移动画 图集
        moneyEffect_Atlas: {
            default: null,
            displayName: "moneyEffect_Atlas",
            tooltip: "金币银币漂移动画 图集",
            type:cc.SpriteAtlas,
        },
        //特殊炮台出生动画 图集
        laserBornEffect_Atlas: {
            default: null,
            displayName: "laserBornEffect_Atlas",
            tooltip: "特殊炮台出生动画 图集",
            type:cc.SpriteAtlas,
        },
        //鱼Icon 图集
        icon_Atlas: {
            default: null,
            displayName: "icon_Atlas",
            tooltip: "鱼Icon 图集",
            type:cc.SpriteAtlas,
        },
        //2 3 4 档鱼 捕获 Icon 图集
        icon_2_3_4_Atlas: {
            default: null,
            displayName: "get_rawar_Atlas",
            tooltip: "2 3 4 档鱼 捕获 Icon 图集",
            type:cc.SpriteAtlas,
        },
        //特殊鱼Tip Icon 图集
        speciaIcon_Atlas: {
            default: null,
            displayName: "speciaIcon_Atlas",
            tooltip: "特殊鱼Tip Icon 图集",
            type:cc.SpriteAtlas,
        },
        explosionAndLightning_Atlas: {
            default: null,
            displayName: "特效图集",
            tooltip: "爆炸，灰烬，闪电",
            type:cc.SpriteAtlas,
        },
        illustratedBook: cc.Prefab, //图鉴
        record_pre: cc.Prefab,      //记录详情
        setting_pre: cc.Prefab,     //设置界面

        turntable: cc.Prefab,       //自己的 玉如意转盘
        cornucopia: cc.Prefab,      //自己的 聚宝盆

        bulletEffect: cc.Prefab,    //炮台子弹射出炮口时动画的 播放器

        changeCannonEffectList:[sp.SkeletonData],//4个特殊炮台变身特效
        batteryList:[sp.SkeletonData],//注意了！！  下标0-9的炮台 是 对应 1-10号炮台 ，下标 10 - 13 是特殊炮台

        //ui容器
        ui_Actionable:cc.Node,
        bulletTips:cc.Node,

        //技能按钮
        ui_skillAuto:cc.Node,
        ui_skillLock:cc.Node,

        //特殊鱼即将出生 ui
        bossConeInTip:cc.Node,
        bossBornTip:cc.Node,
        bossNormalPos:cc.Node,

        //财神、熔岩玄武 入场效果
        spine_csrcdh:cc.Node,
        effect_csrcdh:cc.Node,
        spine_ryxwrcdh:cc.Node,
        effect_ryxwrcdh:cc.Node,

        //菜单
        ui_menu:cc.Node,
        ui_menuBtn:cc.Node,

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
        btn_queding_net: cc.Node,

        LOADING: cc.Prefab,

    },
    onLoad () {
        this.creatSmear         = true;
        this.bossTipMoveToTime  = 0.5
        this.node.isInit        = 1;
        this.bulletTipTime      = 0;
        this.clickFishPoolEvent = null;
        this.clickFishPoolTime  = 0;
        this.lastAngle          = null;
        this.logic              = require("nfishlogic").getInstance();//数据中心
        this.fireTime           = 0;    //开火计时器
        this.fireTimeFrequency  = 0.17; //开火频率
        this.isFire             = true; //是否可以开火
        this.logic.cannonLevel  = cc.sys.localStorage.getItem("gunLevel_"+glGame.user.userID) ? Number(cc.sys.localStorage.getItem("gunLevel_"+glGame.user.userID)) : 1;
        this.isExit             = true;
        this.turntableView      = null;
        this.cornucopiaView     = null;
        this.runSpecial0        = false;
        this.runSpecial1        = false;
        this.runSpecial2        = false;
        this.runSpecial3        = false;
        this.registerEvent();
        this.initSpeciaNode();
    },
    start () {
        //初始化界面隐藏ui，等待数据
        const Invisible = 0;
        const MaxUserNum = 4;

        const Normal = 255;
        const FadeToTime = 1.3;
        const DelayTime = 0.6;
        for (let i = 0;i<MaxUserNum;i++){
            this.ui_Actionable.getChildByName("ui_bg"+i).active = false;
            this.ui_Actionable.getChildByName("tower_bg"+i).active = false;
            let ui_gun  = this.ui_Actionable.getChildByName("ui_gun"+i);
            let ui_pos  = this.ui_Actionable.getChildByName("ui_pos"+i);
            let ui_wait = ui_pos.getChildByName("ui_wait");
            ui_gun.getChildByName("batteryMask").addComponent("nfish_laserhitNode");
            ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).enabled = false;
            ui_gun.getChildByName("batteryMask").opacity = Invisible;
            ui_gun.active = false;
            ui_wait.stopAllActions();
            ui_wait.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(FadeToTime,Invisible),cc.delayTime(DelayTime),cc.fadeTo(FadeToTime,Normal))));
        }

        glGame.gameNet.send_msg('http.ReqNewFishConfig', { gameid: 49 }, (route, msg) => {
            if(msg.result != null){
                glGame.fishMutipleCfg = msg.result;
            }
            console.log("fish_books----------------", msg)
        });

        let loading = cc.instantiate(this.LOADING);
        loading.name = "loading";
        loading.parent = this.node.getChildByName("loadingView");
        loading.getComponent("nfish_loading").setloadingTipsSprite();
        this.node.getChildByName("loadingView").active = !!this.blLoading;
    },

    //初始化遮罩对象开启
    initLoading(){
        this.node.getChildByName("loadingView").active = this.blLoading = true;
    },

    //初始化特殊奖励（玉如意、聚宝盆）有关的
    initSpeciaNode(){
        let special_Cantainer = this.node.getChildByName("special_Cantainer");

        this.turntableView = cc.instantiate(this.turntable);
        special_Cantainer.addChild(this.turntableView);
        this.turntableView.opacity = 0;

        this.cornucopiaView = cc.instantiate(this.cornucopia);
        special_Cantainer.addChild(this.cornucopiaView);
        this.cornucopiaView.opacity = 0;
    },
    //初始化界面隐藏ui，等待数据
    hide(){
        const Normal = 255;
        let spine_csrcdh = this.node.getChildByName("spine_effect").getChildByName("spine_csrcdh");
        let spine_ryxwrcdh = this.node.getChildByName("spine_effect").getChildByName("spine_ryxwrcdh");
        spine_csrcdh.active = false;
        spine_csrcdh.opacity = Normal;
        spine_ryxwrcdh.active = false;
        spine_ryxwrcdh.opacity = Normal;
        this.ui_menu.active = false;
        this.node.getChildByName("ui_ExitTip").active = false;
        this.node.getChildByName("ui_fireEffect").active = false;
        const MaxUserNum = 4;
        const NormalOpacity = 255;
        for (let i = 0;i<MaxUserNum;i++){
            if(!this.logic.isEnterRoom){
                this.ui_Actionable.getChildByName("ui_bg"+i).active = false;
                this.ui_Actionable.getChildByName("tower_bg"+i).active = false;
                let ui_gun = this.ui_Actionable.getChildByName("ui_gun"+i);
                ui_gun.getChildByName("batteryMask").opacity = NormalOpacity;
                ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).enabled = false;
                ui_gun.active = false;
            }
        }
    },
    //注册监听
    registerEvent() {
        glGame.emitter.on(CONST.clientEvent.comeInPlayer,this.comeInPlayerHandler,this);            //用户进入
        glGame.emitter.on(CONST.clientEvent.leaveRoomPlayer,this.leaveRoomPlayerHandler,this);      //用户离开
        glGame.emitter.on(CONST.clientEvent.clickFishPool,this.clickFishPoolHandler,this);          //点击鱼池子
        glGame.emitter.on(CONST.clientEvent.hiddenLocationTip,this.hiddenLocationTipHandler,this);  //隐藏位置提示
        glGame.emitter.on(CONST.clientEvent.playFiringEffect,this.playFiringEffectHandler,this);    //播放开炮效果
        glGame.emitter.on(CONST.clientEvent.updateShootGold,this.updateShootGoldHandler,this);      //更新用户射击余额
        glGame.emitter.on(CONST.clientEvent.updateGunRate,this.updateGunRatedHandler,this);         //更新炮台倍率
        glGame.emitter.on(CONST.clientEvent.updateGunRecoil,this.updateGunRecoilHandler,this);      //为其他玩家设置后坐力
        glGame.emitter.on(CONST.clientEvent.onFreezeShowUI,this.onFreezeShowUIHandler,this);        //冰冻显示UI
        glGame.emitter.on(CONST.clientEvent.fireSettingRecoil,this.fireSettingRecoilHandler,this);  //为自己设置后坐力
        glGame.emitter.on(CONST.clientEvent.onCoinChanged,this.onCoinChangedHandler,this);          //充值到账财神爷动画
        glGame.emitter.on(CONST.clientEvent.playCoinEffect,this.playCoinEffectHandler,this);        //死鱼飘金币
        glGame.emitter.on(CONST.clientEvent.onSurfStart,this.onSurfStartHandler,this);              //海浪鱼群 - 海浪UI
        glGame.emitter.on(CONST.clientEvent.showFishTideTitle,this.showFishTideTitleHandler,this);  //显示浪潮来临
        glGame.emitter.on(CONST.clientEvent.myUpdateMoney,this.myUpdateMoneyHandler,this);          //更新自己钱
        glGame.emitter.on(CONST.clientEvent.checkAutoAndLock,this.checkAutoAndLockHandler,this);    //检查锁定和自动按钮
        glGame.emitter.on(CONST.clientEvent.upSpecialGunCoin,this.upSpecialGunCoinHandler,this);    //更新特殊炮台子弹数量
        glGame.emitter.on(CONST.clientEvent.getSpecialCannon,this.getSpecialCannonHandler,this);    //获取到一个特殊炮台
        glGame.emitter.on(CONST.clientEvent.restoreCannon,this.restoreCannonHandler,this);          //特殊子弹用完，恢复炮台
        glGame.emitter.on(CONST.clientEvent.bossComein,this.bossComeinHandler,this);                //boss出现
        glGame.emitter.on(CONST.clientEvent.sprinkleRedBag,this.sprinkleRedBagHandler,this);        //财神出金币
        glGame.emitter.on(CONST.clientEvent.showTurntable,this.showTurntableHandler,this);          //玉如意 出转盘 聚宝盆 出拉霸
        glGame.emitter.on(CONST.clientEvent.otherPlayerShowSpecialAward,this.oPSSAHandler,this);    //其他人的 如意 聚宝鹏 展示
        glGame.emitter.on(CONST.clientEvent.specialBulletStatistics,this.specialBulletStatistics,this);    //特殊子弹统计
        glGame.emitter.on(CONST.clientEvent.checkSpecialBullet,this.checkSpecialBulletHandler,this);       //特殊子弹统计 - 检查器
        glGame.emitter.on(CONST.clientEvent.checkRotation,this.checkRotationHandler,this);          //设置旋转
        glGame.emitter.on(CONST.clientEvent.hideBossConinUI,this.hideBossConinUIHandler,this);      //隐藏boss来了
        glGame.emitter.on(CONST.clientEvent.updateUserStatus,this.updateUserStatusHandler,this);    //隐藏boss来了
        glGame.emitter.on(CONST.clientEvent.addGoldEffect,this.addGoldEffectHandler,this);          //飘分
        glGame.emitter.on(CONST.clientEvent.showAlert,this.showAlertHandler,this);                  //alert弹出框
        glGame.emitter.on(CONST.clientEvent.accumulate,this.accumulateHandler,this);                //蓄力播放
        glGame.emitter.on(CONST.clientEvent.closeLoading,this.clseLoadingViewHandler,this);         //关闭loading
        glGame.emitter.on(CONST.clientEvent.clearbossComein,this.clearbossComeinHandler,this);      //清理boss进入
        glGame.emitter.on(CONST.clientEvent.clearSpecialBulletPool,this.clearSpecialHandler,this);  //清理特殊子弹
        glGame.emitter.on(CONST.clientEvent.bossGodOfWealthCoin,this.bossGodOfWealthCoinHandler,this);  //财神进入
        glGame.emitter.on(CONST.clientEvent.bossLavaBasaltComin,this.bossLavaBasaltCominHandler,this);  //熔岩玄武进入
        glGame.emitter.on(CONST.clientEvent.checkSpecialCannon,this.checkSpecialCannonHandler,this);   //检查特殊炮台
        this.node.on(cc.Node.EventType.TOUCH_START,this.onFireHooHandler,this);                     //开始 点击屏幕 开始 发射
        this.node.on(cc.Node.EventType.TOUCH_END,this.onFireHooHandler,this);                       //结束 点击屏幕 停止 发射
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onFireHooHandler,this);                    //取消 点击屏幕 停止 发射
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onMoveHandler,this);                         //移动 点击还移动，自动射击的时候更新角度
        glGame.emitter.on(MESSAGE.GAME_LOADING, this.initLoading, this);
    },
    //反注册监听
    unregisterEvent() {
        glGame.emitter.off(CONST.clientEvent.comeInPlayer,this);
        glGame.emitter.off(CONST.clientEvent.leaveRoomPlayer,this);
        glGame.emitter.off(CONST.clientEvent.clickFishPool,this);
        glGame.emitter.off(CONST.clientEvent.hiddenLocationTip,this);
        glGame.emitter.off(CONST.clientEvent.playFiringEffect,this);
        glGame.emitter.off(CONST.clientEvent.updateShootGold,this);
        glGame.emitter.off(CONST.clientEvent.updateGunRate,this);
        glGame.emitter.off(CONST.clientEvent.updateGunRecoil,this);
        glGame.emitter.off(CONST.clientEvent.onFreezeShowUI,this);
        glGame.emitter.off(CONST.clientEvent.fireSettingRecoil,this);
        glGame.emitter.off(CONST.clientEvent.onCoinChanged,this);
        glGame.emitter.off(CONST.clientEvent.playCoinEffect,this);
        glGame.emitter.off(CONST.clientEvent.onSurfStart,this);
        glGame.emitter.off(CONST.clientEvent.showFishTideTitle,this);
        glGame.emitter.off(CONST.clientEvent.myUpdateMoney,this);
        glGame.emitter.off(CONST.clientEvent.checkAutoAndLock,this);
        glGame.emitter.off(CONST.clientEvent.getSpecialCannon,this);
        glGame.emitter.off(CONST.clientEvent.upSpecialGunCoin,this);
        glGame.emitter.off(CONST.clientEvent.restoreCannon,this);
        glGame.emitter.off(CONST.clientEvent.bossComein,this);
        glGame.emitter.off(CONST.clientEvent.sprinkleRedBag,this);
        glGame.emitter.off(CONST.clientEvent.showTurntable,this);
        glGame.emitter.off(CONST.clientEvent.otherPlayerShowSpecialAward,this);
        glGame.emitter.off(CONST.clientEvent.specialBulletStatistics,this);
        glGame.emitter.off(CONST.clientEvent.checkSpecialBullet,this);
        glGame.emitter.off(CONST.clientEvent.checkRotation,this);
        glGame.emitter.off(CONST.clientEvent.hideBossConinUI,this);
        glGame.emitter.off(CONST.clientEvent.updateUserStatus,this);
        glGame.emitter.off(CONST.clientEvent.addGoldEffect,this);
        glGame.emitter.off(CONST.clientEvent.showAlert,this);
        glGame.emitter.off(CONST.clientEvent.accumulate,this);
        glGame.emitter.off(CONST.clientEvent.closeLoading,this);
        glGame.emitter.off(CONST.clientEvent.clearbossComein,this);
        glGame.emitter.off(CONST.clientEvent.clearSpecialBulletPool,this);
        glGame.emitter.off(CONST.clientEvent.bossGodOfWealthCoin,this);
        glGame.emitter.off(CONST.clientEvent.bossLavaBasaltComin,this);
        glGame.emitter.off(CONST.clientEvent.checkSpecialCannon,this);
        this.node.off(cc.Node.EventType.TOUCH_START,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this);
        glGame.emitter.off(MESSAGE.GAME_LOADING, this);
    },
    //检查自动按钮
    checkAutoAndLockHandler(){
        // glGame.panel.closeLoading();
        if(cc.sys.localStorage.getItem("SkillisLockAutoChange_"+this.logic.roomId) == "open"){
            this.onSkillAutoHandler();
        }
        if(cc.sys.localStorage.getItem("SkillLock_"+this.logic.roomId) == "open"){
            this.onSkillLockHandler();
        }
    },
    //自动射击的时候获取角度
    onMoveHandler(evt){
        if(this.logic.isAuto)this.lastAngle = this.getAngle(evt.getLocation());
    },
    //点击屏幕 发射
    onFireHooHandler(evt){
        glGame.emitter.emit(CONST.clientEvent.fishCancelShoot,evt);
    },
    //用户进入，显示炮台
    comeInPlayerHandler(res){
        this.initPlayer(res,true);
    },
    //用户离开
    leaveRoomPlayerHandler(res){
        this.initPlayer(res,false);
    },
    //更新用户状态 seatNum 座位 isOnLine 是否在线
    updateUserStatusHandler(res){
        let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+res.seatNum);
        let ui_other      = ui_pos.getChildByName("ui_other");
        let netSt         = ui_other.getChildByName("netStatusContainer");
        netSt.active      = res.userStatus == CONST.UserStatus.OffLine;
    },
    //初始化用户
    initPlayer(play,isInit){
        if(!play)return;
        let myid          = glGame.user.userID;
        let seatNum       = play.seatNum;
        let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+seatNum);
        let ui_gun        = this.ui_Actionable.getChildByName("ui_gun"+seatNum);
        let tower_bg      = this.ui_Actionable.getChildByName("tower_bg"+seatNum);
        let ui_bg         = this.ui_Actionable.getChildByName("ui_bg"+seatNum);
        let ui_unWait     = ui_bg.getChildByName("ui_unWait");
        let lab_coin      = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");

        if(ui_pos == null){
            cc.error(">> 出错了 ",play)
            return;
        }
        let ui_other      = ui_pos.getChildByName("ui_other");
        let netSt         = ui_other.getChildByName("netStatusContainer");
        ui_other.active   = isInit;
        netSt.active      = false;
        ui_pos.active     = true;
        ui_gun.active     = isInit;
        tower_bg.active   = isInit;
        if(isInit){
            lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(play.gold);
        }
        ui_pos.getChildByName("ui_wait").active = !isInit;
        ui_bg.active = isInit;
        ui_bg.getChildByName("ui_unWait").active = isInit;
        ui_bg.getChildByName("ui_unWait").getChildByName("img_zijipaotai").active = myid == play.uid;
        if (myid != play.uid){
            let spine_restoreCannon = ui_gun.getChildByName("spine_restoreCannon");
            this.logic.playSpine(spine_restoreCannon,false,true,CONST.SpineName.Normal);
        }
        if(play.uid != undefined && myid == play.uid){
            this.logic.isEnterRoom = true;
            this.logic.seatNum = seatNum;
            let ui_Tip = this.node.getChildByName("ui_Tip");
            ui_Tip.getChildByName("ui_"+seatNum).active = isInit;
            let spineName = play.seatNum == CONST.Seat.RightTop || play.seatNum == CONST.Seat.LeftTop ? CONST.SpineName.YouHereTop : CONST.SpineName.YouHereButtom;
            if(this.logic.getIsRotation()){
                spineName = play.seatNum == CONST.Seat.RightTop || play.seatNum == CONST.Seat.LeftTop ? CONST.SpineName.YouHereButtom : CONST.SpineName.YouHereTop;
            }
            this.logic.playSpine(ui_Tip.getChildByName("ui_"+seatNum),true,false,spineName);
            ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonLevel;
            if(this.logic.offLineMissileData != null){//人物进入初始化房间结束后继续初始化断线重连的数据
                cc.warn("> 人物进入初始化房间结束后继续初始化断线重连的数据 ")
                glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp,JSON.parse(JSON.stringify(this.logic.offLineMissileData)));
                this.logic.offLineMissileData = null;
            }
        }else {
            this.updateGunRecoilHandler(play);
        }
        if(play.cannonType == CONST.CannonType.Normal){//普通炮台样式
            ui_other.getChildByName("img_paobeikuang1").active = true;
            ui_other.getChildByName("lab_gunLv").active = true;

            ui_other.getChildByName("img_paobeikuang2").active = false;
            ui_other.getChildByName("ui_gunLvBg").active = false;
            ui_other.getChildByName("lab_gunLv2").active = false;
        }else{//特殊炮台样式
            ui_other.getChildByName("img_paobeikuang1").active = false;
            ui_other.getChildByName("lab_gunLv").active = false;

            ui_other.getChildByName("img_paobeikuang2").active = true;
            ui_other.getChildByName("ui_gunLvBg").active = true;
            ui_other.getChildByName("lab_gunLv2").active = true;
        }
        if(isInit){
            let battery = ui_gun.getChildByName("battery");
            let batterySkeletonData;
            switch (play.cannonType) {
                case CONST.CannonType.Lightning :   // 闪电
                    batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
                    break;
                case CONST.CannonType.PartialBomb : // 炎爆
                    batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
                    break;
                case CONST.CannonType.Laser :       // 龙息
                    batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
                    break;
                case CONST.CannonType.Missile :     // 仙剑
                    batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
                    break;
                case CONST.CannonType.Normal :     // 普通1-10级别
                    break;
                default:
                    cc.error("===================初始化 炮台有误 ！",play)
            }
            if(play.cannonType != CONST.CannonType.Normal) {//刚进来 如果数据有 龙溪炮台 那么现实龙溪炮台
                if(batterySkeletonData == null){
                    cc.warn(">>>> 无法实例化 炮台 ",play)
                }
                if(this.logic.seatNum == play.seatNum)cc.warn("7 ======更换炮台====== cannonType "+play.cannonType)
                battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                ui_gun.cannonType = play.cannonType;
                this.logic.playSpine(battery,true,false,CONST.SpineName.Idle);
                ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonAmount+""; //特殊炮台 现实 炮弹数量
                ui_other.getChildByName("lab_gunLv2").getComponent(cc.Label).string = play.cannonAmount+"";
                //特殊炮炮台 不显示 加减号
                ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = false;
                ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = false;
            }else{
                ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = myid == play.uid;
                ui_other.getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = myid == play.uid;
                ui_other.getChildByName("lab_gunLv").getComponent(cc.Label).string = play.cannonLevel+"";
                ui_other.getChildByName("lab_gunLv2").getComponent(cc.Label).string = play.cannonLevel+"";
                const NormalCannonOffsex = 1;
                let cannon = Number(play.cannonLevel) - NormalCannonOffsex;
                if(cannon < 0){
                    cannon = 0;
                }
                if(this.logic.seatNum == play.seatNum)cc.warn("6 ======更换炮台====== cannonType "+play.cannonType)
                battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
                ui_gun.cannonType = play.cannonType;
                this.logic.playSpine(battery,true,false,CONST.SpineName.Idle);
            }
        }
    },
    //播放开炮效果
    playFiringEffectHandler(res){
        let gunType = res.gunType;
        let seatNum = res.seatNum;
        let ui_gun  = this.ui_Actionable.getChildByName("ui_gun"+seatNum);
        if(gunType == CONST.CannonType.Laser){//这个是 龙溪的擎天柱 独有的 ，其余的 暂时没有开炮效果
            const Invisible = 0;
            const NormalOpacity = 255;
            let batteryMask = ui_gun.getChildByName("batteryMask");
            batteryMask.opacity = NormalOpacity;
            batteryMask.getComponent(cc.BoxCollider).enabled = true;
            let spineNode = cc.instantiate(batteryMask.getChildByName("spcGun"));
            spineNode.active = true;
            batteryMask.addChild(spineNode);
            this.logic.playSpine(spineNode,false,false,CONST.SpineName.Idle,(spineName)=>{
                batteryMask.getComponent(cc.BoxCollider).enabled = false;
                batteryMask.opacity = Invisible;
                spineNode.destroy();
            });
        }else{
            //停用老的 开炮效果 等待替图资源到位
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
    myUpdateMoneyHandler(){
        let ui_bg         = this.ui_Actionable.getChildByName("ui_bg"+this.logic.seatNum);
        let ui_unWait     = ui_bg.getChildByName("ui_unWait");
        let lab_coin      = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");
        lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(Number(this.logic.gold + ""));
    },
    //其他玩家射击，更新余额
    updateShootGoldHandler(res){
        if(this.logic.seatNum == res.seatNum){
            return;
        }
        let ui_bg         = this.ui_Actionable.getChildByName("ui_bg"+res.seatNum);
        let ui_unWait     = ui_bg.getChildByName("ui_unWait");
        let lab_coin      = ui_unWait.getChildByName("coinBg_cantainer").getChildByName("lab_coin");
        lab_coin.getComponent(cc.Label).string = glGame.user.GoldTemp(res.gold);
    },
    //其他玩家射击-设置 炮台角度-后坐力
    updateGunRecoilHandler(res,isSetRecoil = true){
        let ui_gun        = this.ui_Actionable.getChildByName("ui_gun"+res.seatNum);
        if(res.angle != undefined)ui_gun.angle      = res.angle;
        if(isSetRecoil){
            this.fireBulletSettingRecoil(res.seatNum);
            // cc.error(">>>>  炮台 后坐力 == 开始 播放 2 seatNum "+res.seatNum+" ui_gun angle "+ui_gun.angle);
        }
    },
    //点击鱼池,调整炮台角度，发射子弹，设置后坐力
    clickFishPoolHandler(evt){
        if(evt != null){//射击 范围判断
            let pos = evt.getLocation();
            if(this.logic.seatNum == CONST.Seat.LeftTop || this.logic.seatNum == CONST.Seat.RightTop){
                const OffsexY = 1044;
                if(pos.y > OffsexY){
                    return;
                }
            }else{
                const OffsexY = 60;
                if(pos.y < OffsexY){
                    return;
                }
            }
        }
        if(this.logic.MaxBullte == 0){
            cc.error("未初始化，无法发射")
            return;
        }
        if(this.logic.bullteNum >= this.logic.MaxBullte){
            cc.error(">> 子弹数量超过 "+this.logic.MaxBullte+" ，不予发射 ",this.logic.bullteNum)
            this.bulletTips.active = true;
            return;
        }
        if(!evt){
            this.nextClickFishPoolHandler(null);
        }else{
            const ShootGapTime = -0.125;
            if(this.logic.isLock){
                this.clickFishPoolTime = ShootGapTime;
            }
            this.clickFishPoolEvent = evt;
        }
    },
    //点击鱼池,调整炮台角度，发射子弹，设置后坐力
    nextClickFishPoolHandler(evt){
        if(!this.logic.isEnterRoom){
            return;
        }
        if(!glGame.gameNet.getState()){
            this.logic.isEnterRoom = false;
            cc.error("当前是 断网状态 无法发射");
            return;
        }
        let coin = this.logic.baseConsume * this.logic.cannonLevel;
        if(this.logic.gold == undefined || this.logic.gold < coin){//余额检查
            const NewGround = 99;
            if(this.logic.roomRule.Rank != NewGround){
                this.showNotMoneyDialog();
            }
            return;
        }
        //控制频率
        if(!this.isFire){
            cc.log(">> 控制频率 无法发射")
            return;
        }
        if(this.logic.isYuRuyiRuning){
            cc.warn(">正在使用玉如意转盘，停火 ")
            return;
        }
        if(this.logic["isGunMoving"+this.logic.seatNum] == 1){
            cc.warn(">正在更换炮台 播放特效 无法发射子弹 ",this.logic["isGunMoving"+this.logic.seatNum]," seatNum ",this.logic.seatNum)
            return;
        }
        const HaveSpecialCannon = 1;
        let playerInfo          = this.logic.playerInfo[Number(glGame.user.userID)];

        if(playerInfo == null){
            cc.error(">> 找不到用户 ",this.logic.playerInfo)
            return;
        }
        this.isFire             = false;
        let angle               = undefined;
        let myid                = glGame.user.userID;
        let arg                 = {uid:myid,seatNum:this.logic.seatNum,gunType:this.logic.gunType,gunLevel:this.logic.cannonLevel};
        let currentIsMissile    = this.logic.currentBullteType == CONST.CannonType.Missile;  //true 当前是仙剑
        let nextIsHaveMissile   = playerInfo.hitMax != null       && playerInfo.cannonAmount > HaveSpecialCannon && playerInfo.cannonType == CONST.CannonType.Missile; //下一发子弹是不是 仙剑

        if(this.logic.specialBulletPool[Number(this.logic.seatNum)] != null){
            cc.warn(">>>不能重复发送 屏幕已有特殊子弹  子弹类型 : "+this.logic.specialBulletPool[Number(this.logic.seatNum)]);
            return;
        }
        if(this.logic.currentBullteType == CONST.CannonType.Missile){
            cc.warn(">>>不能重复发送仙剑子弹 2 ");
            return;
        }
        if(this.logic.currentBullteType == CONST.CannonType.Laser){
            cc.warn(">>有 龙溪 子弹 正在屏幕内");
            return;
        }
        if(currentIsMissile && nextIsHaveMissile){
            cc.warn("当前是仙剑子弹，下一发还是仙剑，无法射击")
            return;
        }
        if(this.logic.currentBullteType == CONST.CannonType.Lightning){
            cc.warn(">>有 闪电 子弹 正在屏幕内");
            return;
        }
        if(this.logic.currentBullteType == CONST.CannonType.PartialBomb){
            cc.warn(">>有 炎爆 子弹 正在屏幕内");
            return;
        }
        if(evt != null){//正常点击
            if(!this.logic.startFire){
                cc.warn(">鱼潮来临，发射停用")
                return;
            }
            if(this.logic.isLock == true){
                if(this.logic.lockFishID != null){
                    arg.lock = Number(this.logic.lockFishID);
                    arg.indexNum = Number(this.logic.lockFishIndex);
                    arg.angle = null;
                }else{
                    this.node.getChildByName("noClickFIsh_tips").active = true;
                    this.node.getChildByName("noClickFIsh_tips").stopAllActions();
                    this.node.getChildByName("noClickFIsh_tips").runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(()=>{
                        this.node.getChildByName("noClickFIsh_tips").active = false;
                    })))
                    return;
                }
            }
            if(this.logic.lockFishID != null){
                arg.lock = Number(this.logic.lockFishID);
                arg.indexNum = Number(this.logic.lockFishIndex);
                arg.angle = null;
            }else{
                let pos   = evt.getLocation();
                angle     = this.getAngle(pos);
                arg.angle = angle;
            }
        }else//自动射击
        {
            let ui_physicalPool  = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
            let len = ui_physicalPool.childrenCount;
            let fishLen = 0;
            const MaxFish = 10;
            for (let i=0;i<len;i++){
                let n = ui_physicalPool.children[i];
                if(n != null){
                    let fish_Unit = n.getComponent("nfish_Unit");
                    if(fish_Unit != null && fish_Unit.getFishID() != null){
                        fishLen++;
                        if(fishLen > MaxFish){
                            break;
                        }
                    }
                }
            }
            if(!this.logic.startFire){
                cc.warn(">鱼潮来临，自动发射停用")
                return;
            }
            if(this.logic.isLock == true && this.logic.lockFishID != null){
                //锁定  有目标
                arg.lock = Number(this.logic.lockFishID);
                arg.angle = null;
            }else{
                const NormalAngle = 180;
                const ZeroAngle   = 0;
                //未锁定
                if(this.logic.seatNum == 0 ||this.logic.seatNum == 1){
                    angle = this.lastAngle == null ? ZeroAngle : this.lastAngle;
                }else{
                    angle = this.lastAngle == null ? NormalAngle : this.lastAngle;
                }
                arg.angle = angle;
            }
        }
        glGame.emitter.emit(CONST.clientEvent.adjustGunAngle,arg);
    },
    //金额不足弹窗
    showNotMoneyDialog(){
        if(this.logic.dialogPanelIsShow)return;
        this.logic.dialogPanelIsShow = true;
        if(this.logic.isAuto || this.logic.isLockAutoChange){//如果自动 那么解除
            this.onSkillAutoHandler();
        }
        if(this.logic.isLock){//如果锁定 那么解除
            this.onSkillLockHandler();
        }
        let string = `<color=#CFECFC>您的金币不足，该炮倍需要</c> <color=#FDC916> ${this.logic.getFloat(this.logic.cannonLevel * this.logic.baseConsume)}  </c><color=#CFECFC>金币才可开炮，是否马上前往充值？</c>`
        glGame.panel.showDialog("", string, () => {
            this.logic.dialogPanelIsShow = false;
            glGame.panel.showShop(9999);
        }, () => {
            this.logic.dialogPanelIsShow = false;
        }, "取消", "充值", 9999);
    },
    //获取朝向
    getAngle(pos){
        let direction       = this.node.convertToNodeSpaceAR(pos);
        let startPos        = this.ui_Actionable.getChildByName("ui_gun"+this.logic.seatNum).position;
        return this.logic.getP1ToP2Angle(startPos,direction);
    },
    //赋值后坐力
    fireSettingRecoilHandler(res){
        let angle           = res.angle;
        if(angle != undefined)this.ui_Actionable.getChildByName("ui_gun"+this.logic.seatNum).angle = angle;
        this.lastAngle      = angle;
        this.fireBulletSettingRecoil(this.logic.seatNum);
    },
    //实现后坐力逻辑
    fireBulletSettingRecoil(seatNum){
        let battery        = this.ui_Actionable.getChildByName("ui_gun"+seatNum).getChildByName("battery");
        this.logic.playSpine(battery,false,false,CONST.SpineName.Attack,null,CONST.SpineName.Idle,true);
    },
    //隐藏位置提示
    hiddenLocationTipHandler(){
        this.scheduleOnce(()=>{
            let ui_Tip = this.node.getChildByName("ui_Tip");
            if(ui_Tip.getChildByName("ui_"+this.logic.seatNum)){
                ui_Tip.getChildByName("ui_"+this.logic.seatNum).active = false;
            }
        },3);
    },
    onClick(name, node){
        const NotExit = 4;
        const IstExit = 1;
        switch(name){
            case "ui_mask":return this.closeViewHandler(NotExit);       //退出
            case "ui_menuBtn":return this.menuViewHandler();            //菜单
            case "ui_rechargeBtn":return this.rechargeClickHandler();   //充值
            case "btn_chongzhi":return this.rechargeClickHandler();     //充值
            case "btn_tuichu":return this.closeViewHandler(IstExit);    //退出
            case "btn_yuzhong":return this.openFishGroupHandler();      //打开图鉴
            case "btn_jilu":return this.historyClickHandler();          //记录
            case "btn_shezhi":return this.settingClickHandler();        //设置
            case "ui_BtnPlus":return this.plusClickHandler();           //加号 + 炮台
            case "ui_BtnSub":return this.subClickHandler();             //减号 - 炮台
            case "ui_skillLock":return this.onSkillLockHandler();       //锁定
            case "ui_skillAuto":return this.onSkillAutoHandler();       //自动
            case "btn_quit":return this.onQuitHandler();                //alert-取消
            case "btn_queding":return this.onQuedingHandler();          //alert-确认
            case "btn_queding_net":return this.onQuedingOffNetHandler();      //alert-确认-断网
            default: console.error("no find button name -> %s", name);
        }
    },
    //更新特殊炮台数量
    upSpecialGunCoinHandler(res){
        let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+res.seatNum);
        ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = res.cannonLevel + "";
        ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = res.cannonLevel + "";
    },
    //获取到一个特殊炮台
    getSpecialCannonHandler(res) {
        let myid = Number(glGame.user.userID);
        const IsRestore = 0;
        let playerInfo = this.logic.playerInfo[Number(res.uid)];
        if(Number(res.uid) == myid){
            cc.warn("====== 获取到一个特殊炮台 ====== ",playerInfo)
        }
        let ui_physicalPool  = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
        //根据实时配置设置龙溪碰撞宽度
        let ui_gun          = this.ui_Actionable.getChildByName("ui_gun"+res.seatNum);
        let FixTime         = 2;//纠正时间
        this.scheduleOnce(()=>{
            ui_gun.cannonType = playerInfo.cannonType;
            if(ui_gun.cannonType != playerInfo.cannonType){
                let batterySkeletonData;
                let cannonType = Number(playerInfo.cannonType);
                switch (cannonType) {
                    case CONST.CannonType.Lightning :   // 闪电
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
                        break;
                    case CONST.CannonType.PartialBomb : // 炎爆
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
                        break;
                    case CONST.CannonType.Laser :       // 龙息
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
                        break;
                    case CONST.CannonType.Missile :     // 仙剑
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
                        break;
                }
                let battery = ui_gun.getChildByName("battery");
                if(CONST.CannonType.Normal == cannonType){
                    let cannon = Number(this.logic.cannonLevel) - 1;
                    if(cannon < 0){
                        cannon = 0;
                    }
                    battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
                }else{
                    battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                }
                this.logic.playSpine(battery,false,false,CONST.SpineName.Idle2);
                if(this.logic.seatNum == res.seatNum){
                    this.logic["isGunMoving"+this.logic.seatNum] = -1;
                }
                cc.warn(">> 通过数据纠正UI：ui_gun.cannonType "+ui_gun.cannonType+"   data cannonType "+playerInfo.cannonType)
            }
        },FixTime);
        if(playerInfo.cannonType == CONST.CannonType.Laser){
            if(ui_gun == null){
                cc.warn(">>> seatNum ",res.seatNum,"  res ",res)
            }
            let radius        =  Number(this.logic.roomRule.FirepillarWidth);// 龙息的宽度（单位：像素）
            let newSize       = cc.size(radius,ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).size.height)
            ui_gun.getChildByName("batteryMask").getComponent(cc.BoxCollider).size = newSize;
        }
        if(myid == Number(res.uid)){
            let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+res.seatNum);
            ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active = playerInfo.cannonType == CONST.CannonType.Normal;
            ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active = playerInfo.cannonType == CONST.CannonType.Normal;
        }

        if(ui_gun.cannonType != playerInfo.cannonType && !res.isNew){
            res.isNew = true;//强行篡改
            cc.warn(">> 获得特殊炮台 仍然还使用 普通 炮台 正在 修正")
        }

        if(res.isNew){
            let pos = null;
            let fish = ui_physicalPool.getChildByName(""+res.fishId);
            if(fish != null){
                pos = cc.v2(fish.position.x,fish.position.y);
            }else{
                cc.warn("> 鱼池里 找不到鱼 id: "+res.fishId," res ",res);
            }
            if(Number(res.uid) == myid){
                cc.warn("====== 成功替换炮台 ====== cannonType "+playerInfo.cannonType)
            }
            this.setGunRate(res.seatNum,playerInfo.cannonAmount,playerInfo.cannonType,pos,IsRestore);
        }else{
            let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+res.seatNum);
            if(playerInfo.cannonType == CONST.CannonType.Normal){
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = playerInfo.cannonLevel+"";
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = playerInfo.cannonLevel+"";
            }else{
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = playerInfo.cannonAmount+"";
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = playerInfo.cannonAmount+"";
            }
        }
    },
    //检查特殊炮台
    checkSpecialCannonHandler(){
        for (let key in this.logic.playerInfo){
            let playerInfo = this.logic.playerInfo[key];
            if(playerInfo != null && this.logic["isGunMoving"+playerInfo.seatNum] != 1){
                let ui_gun  = this.ui_Actionable.getChildByName("ui_gun"+playerInfo.seatNum);
                if(ui_gun != null && ui_gun.cannonType != playerInfo.cannonType) {
                    ui_gun.cannonType = playerInfo.cannonType;
                    let batterySkeletonData;
                    let cannonType = Number(playerInfo.cannonType);
                    switch (cannonType) {
                        case CONST.CannonType.Lightning :   // 闪电
                            batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
                            break;
                        case CONST.CannonType.PartialBomb : // 炎爆
                            batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
                            break;
                        case CONST.CannonType.Laser :       // 龙息
                            batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
                            break;
                        case CONST.CannonType.Missile :     // 仙剑
                            batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
                            break;
                    }
                    let battery = ui_gun.getChildByName("battery");
                    if (CONST.CannonType.Normal == cannonType) {
                        let cannon = Number(this.logic.cannonLevel) - 1;
                        if (cannon < 0) {
                            cannon = 0;
                        }
                        battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
                    } else {
                        battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                    }
                    this.logic.playSpine(battery, false, false, CONST.SpineName.Idle2);
                    if (this.logic.seatNum == playerInfo.seatNum) {
                        this.logic["isGunMoving" + this.logic.seatNum] = -1;
                    }
                }
            }
        }
    },
    //恢复炮台
    restoreCannonHandler(msg){
        let uid = msg.uid;
        let isLog = null;
        let myid = Number(glGame.user.userID);
        if(Number(uid) == myid){
            isLog = "=====next 恢复炮台========"
            cc.warn("==== 恢复炮台 ==== Time  "+Date.now()+"  Math.random "+Math.random())
        }

        let ui_gun        = this.ui_Actionable.getChildByName("ui_gun"+this.logic.playerInfo[Number(uid)].seatNum);
        if(Number(uid) == myid)cc.warn("==========当前炮的类型： "+ui_gun.cannonType," 当前的数据 "+this.logic.playerInfo[Number(uid)].cannonType)
        if(this.logic.playerInfo[Number(uid)].cannonType ==  ui_gun.cannonType){
            if(Number(uid) == myid)cc.warn(">> ！！ 2 ===== 无需恢复炮台==== 因为又获得了 ")
            return;
        }
        let isNow = msg.isNow;
        let nextTime = isNow ? 0.1 : 1;
        if(this.logic.isRestoreIng[uid] != undefined){
            cc.log(">>> 当前座位的炮台正在恢复 >>>")
            return;
        }
        const IsRestore = 1;
        let restoreCB = ()=>{
            let res = this.logic.playerInfo[Number(uid)];
            if(res != null){
                let myid = glGame.user.userID;
                const Not = 0;
                let isHaveSpcCannon = res.cannonAmount == Not ? false : true;
                if(myid == Number(uid)){
                    let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+res.seatNum);
                    //-----------------------------------------加减号按钮-----------------------------------------------
                    ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnPlus").active       = !isHaveSpcCannon;
                    ui_pos.getChildByName("ui_other").getChildByName("btn_sub_plus_cantainer").getChildByName("ui_BtnSub").active        = !isHaveSpcCannon;
                    //-----------------------------------------加减号按钮-----------------------------------------------

                    //----------------------------------------普通炮台样式-----------------------------------------------
                    ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active =  !isHaveSpcCannon;
                    ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active        =  !isHaveSpcCannon;
                    //----------------------------------------普通炮台样式-----------------------------------------------

                    //----------------------------------------特殊炮台样式-----------------------------------------------
                    ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = isHaveSpcCannon;
                    ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active       = isHaveSpcCannon;
                    ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active       = isHaveSpcCannon;
                    //----------------------------------------特殊炮台样式-----------------------------------------------

                    this.setGunRate(res.seatNum,this.logic.cannonLevel,CONST.CannonType.Normal,null,IsRestore,uid,isLog);
                }else{
                    this.setGunRate(res.seatNum,res.cannonLevel,CONST.CannonType.Normal,null,IsRestore,uid,isLog);
                }
            }else{
                cc.error(">> 恢复炮台 出了问题 找不到数据 uid",uid," list : ",this.logic.playerInfo)
            }
        }
        this.logic.isRestoreIng[uid] = IsRestore;
        this.scheduleOnce(restoreCB,nextTime);
    },
    //炮台-切换 + ，仅限自己
    plusClickHandler(){
        let myid = Number(glGame.user.userID);
        let myinfo = this.logic.playerInfo[myid];
        const NotHaveSpecialCanon = 0;
        if(myinfo.cannonAmount != null && myinfo.cannonAmount > NotHaveSpecialCanon){
            cc.warn("当前是特殊炮台，无法切换炮倍")
            return;
        }
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        this.logic.cannonLevel ++;
        const NormalCannonMinLevel = 1;
        const NormalCannonMaxLevel = 10;
        if(this.logic.cannonLevel > NormalCannonMaxLevel){
            this.logic.cannonLevel = NormalCannonMinLevel;
        }
        this.logic.playerInfo[glGame.user.userID].cannonLevel = this.logic.cannonLevel;
        this.setGunRate(this.logic.seatNum,this.logic.cannonLevel,this.logic.gunType,null,null,myid);
        if(this.logic.isEnterRoom){
            let changeCannonData = {op:CONST.Opention.ChangeCannonLv,"level": this.logic.cannonLevel};
            // cc.warn("--==-->发送 炮台切换 ",changeCannonData);
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),changeCannonData);//炮台切换
        }
        cc.sys.localStorage.setItem("gunLevel_"+glGame.user.userID, this.logic.cannonLevel);
    },
    //炮台-切换 - ， 仅限自己
    subClickHandler(){
        let myid = Number(glGame.user.userID);
        let myinfo = this.logic.playerInfo[myid];
        const NotHaveSpecialCanon = 0;
        if(myinfo.cannonAmount != null && myinfo.cannonAmount > NotHaveSpecialCanon){
            cc.warn("当前是特殊炮台，无法切换炮倍")
            return;
        }
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        const NormalCannonMaxLevel = 10;
        const NormalCannonMinLevel = 1;
        this.logic.cannonLevel --;
        if(this.logic.cannonLevel < NormalCannonMinLevel){
            this.logic.cannonLevel = NormalCannonMaxLevel;
        }
        this.logic.playerInfo[glGame.user.userID].cannonLevel = this.logic.cannonLevel;
        this.setGunRate(this.logic.seatNum,this.logic.cannonLevel,this.logic.gunType,null,null,myid);
        if(this.logic.isEnterRoom){
            let changeCannonData = {op:CONST.Opention.ChangeCannonLv,"level": this.logic.cannonLevel};
            // cc.warn("--==-->发送 炮台切换 ",changeCannonData);
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),changeCannonData);//炮台切换
        }
        cc.sys.localStorage.setItem("gunLevel_"+glGame.user.userID, this.logic.cannonLevel);
    },
    //更新炮台 - 自己 或 其他人
    updateGunRatedHandler(res){
        this.setGunRate(res.seatNum,res.cannonLevel,res.gunType,null,null,res.uid);
    },
    //蓄力播放
    accumulateHandler(res){
        let ui_gun        = this.ui_Actionable.getChildByName("ui_gun"+res.seatNum);
        if(res.cannonType == CONST.CannonType.Lightning){//闪电专用蓄力，其他的是通用的
            let spine = ui_gun.getChildByName("spine_LightningAccumulate");
            this.logic.playSpine(spine,false,true,CONST.SpineName.Normal);
        }else{
            let otherAccumulate = ui_gun.getChildByName("spine_OtherAccumulate");
            const DelayTime = 1;
            const DelayTime2 = 1.1;
            ui_gun.stopAllActions();
            ui_gun.runAction(cc.sequence(cc.callFunc(()=>{
                otherAccumulate.active = true;
            }),cc.delayTime(DelayTime),cc.callFunc(()=>{
                otherAccumulate.active = false;
            })));
            this.scheduleOnce(()=>{
                if(otherAccumulate.active)otherAccumulate.active = false;
            },DelayTime2);
        }
    },
    //更新炮台-设置ui,如果是特殊炮台 那么 gunRate 就是用作显示 特殊炮台可发射的子弹数量
    setGunRate(seatNum,gunRate,gunType,specialCannonFishPos = null,isRestore = null,uid = null,isLog = null){
        this.changeGun(seatNum,gunRate,gunType,specialCannonFishPos,isRestore,uid,isLog);
        let ui_pos        = this.ui_Actionable.getChildByName("ui_pos"+seatNum);
        let ui_gun        = this.ui_Actionable.getChildByName("ui_gun"+seatNum);
        let ani           = ui_gun.getChildByName("ui_ToggleTurretAnimation");
        ani.active        = true;

        const FiexUpdateCannonCoinTime = 0.1;
        const NowUpdateCannonCoinTime  = 1.5;
        const NormalLevel = 1;
        const Not = 0;
        let time = gunType == CONST.CannonType.Normal ? FiexUpdateCannonCoinTime : NowUpdateCannonCoinTime;
        this.scheduleOnce(()=>{
            if(gunType == CONST.CannonType.Normal){//当目前是普通炮台
                //----------------------------------------普通炮台样式-----------------------------------------------
                ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active = true;
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active        = true;
                //----------------------------------------普通炮台样式-----------------------------------------------

                //----------------------------------------特殊炮台样式-----------------------------------------------
                ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = false;
                ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active       = false;
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active       = false;
                //----------------------------------------特殊炮台样式-----------------------------------------------
            }else{//当目前是特殊炮台
                //----------------------------------------普通炮台样式-----------------------------------------------
                ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang1").active = false;
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").active        = false;
                //----------------------------------------普通炮台样式-----------------------------------------------

                //----------------------------------------特殊炮台样式-----------------------------------------------
                ui_pos.getChildByName("ui_other").getChildByName("img_paobeikuang2").active = true;
                ui_pos.getChildByName("ui_other").getChildByName("ui_gunLvBg").active       = true;
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").active       = true;
                //----------------------------------------特殊炮台样式-----------------------------------------------
            }

            if(gunType == CONST.CannonType.Normal && gunRate == Not){
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = NormalLevel+"";
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = NormalLevel+"";
            }else{
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv").getComponent(cc.Label).string = gunRate;
                ui_pos.getChildByName("ui_other").getChildByName("lab_gunLv2").getComponent(cc.Label).string = gunRate;
            }
        },time);
        //暂停老的 切换炮台 效果
        // ani.getComponent("nfish_MovieClip").initEffectScaleTo(this.button_gun_help_nzzl_tower_Atlas,"bomb_line_head",0.15,0.2,1,1,false);
    },
    //换炮 gunType = cannonType
    changeGun(seatNum,gunRate,cannonType,specialCannonFishPos = null,isRestore = null,uid = null,isLog = null) {
        let ui_gun = this.ui_Actionable.getChildByName("ui_gun" + seatNum);
        if(ui_gun.isGunMoving != null){
            ui_gun.stopAllActions();
            ui_gun.getChildByName("changeCannonEffect").active = false;
            let oldNode = this.ui_Actionable.getChildByName("spCannContainer"+seatNum);
            if(oldNode){
                oldNode.stopAllActions();
                oldNode.destroy();
                let oldLastNode = oldNode.getChildByName("laserBornEffect");
                if(oldNode){
                    oldLastNode.stopAllActions();
                    oldLastNode.destroy();
                }
            }
            ui_gun.isGunMoving = null;
        }
        ui_gun.isGunMoving = "isGunMoving"+seatNum;
        let battery = ui_gun.getChildByName("battery");
        if(cannonType != CONST.CannonType.Normal){//特殊炮台做个获得表现
            if(specialCannonFishPos != null){
                ui_gun.stopAllActions();
                const MoveStart = 1;
                this.logic["isGunMoving"+seatNum] = MoveStart;
                //播放移动球
                let laserBornEffect  = this.logic.creatorEffect();
                laserBornEffect.isGunMoving = "isGunMoving"+seatNum;
                laserBornEffect.parent = null;
                laserBornEffect.active = true;
                laserBornEffect.name = "laserBornEffect";
                let spCannContainer = new cc.Node();
                spCannContainer.name = "spCannContainer"+seatNum;
                spCannContainer.position = specialCannonFishPos
                spCannContainer.addChild(laserBornEffect);
                this.ui_Actionable.addChild(spCannContainer);
                let mcName;
                let batterySkeletonData;
                let changeCannonSkeletonData;
                let animationName;
                let isRotation = false;
                let Min = 1;
                let Max = 5;
                switch (cannonType) {
                    case CONST.CannonType.Lightning :   // 闪电
                        mcName = CONST.CannonGetEddect.Lightning;
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
                        changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Lightning];
                        animationName = CONST.CannonGotEddect.Lightning;
                        break;
                    case CONST.CannonType.PartialBomb : // 炎爆
                        Max = 8;
                        mcName = CONST.CannonGetEddect.PartialBomb;
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
                        changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.PartialBomb];
                        animationName = CONST.CannonGotEddect.PartialBomb;
                        break;
                    case CONST.CannonType.Laser :       // 龙息
                        Max = 8;
                        mcName = CONST.CannonGetEddect.Laser;
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
                        changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Laser];
                        animationName = CONST.CannonGotEddect.Laser;
                        break;
                    case CONST.CannonType.Missile :     // 仙剑
                        mcName = CONST.CannonGetEddect.Missile;
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
                        changeCannonSkeletonData = this.changeCannonEffectList[CONST.CannonChangeEffect.Missile];
                        animationName = CONST.CannonGotEddect.Missile;
                        isRotation = true;
                        break;
                }
                const LoopTime = 40;
                const IsHaveZero = false;
                const Speed = 0.12;
                const PayEdRemove = false;
                //播放变身动画
                let changeCannonEffect = ui_gun.getChildByName("changeCannonEffect");
                if(isRotation){
                    if(seatNum == this.logic.seatNum){
                        cc.warn(">>>>A 更换炮台成功！！==== cannonType "+cannonType)
                    }
                    if(isLog){
                        cc.warn(">>>>A 恢复炮台： 更换炮台成功 1 ==== cannonType "+cannonType)
                    }
                    if(this.logic.seatNum == seatNum)cc.warn("1 ======更换炮台====== cannonType "+cannonType)
                    changeCannonEffect.getComponent(sp.Skeleton).skeletonData = changeCannonSkeletonData;
                    battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                    ui_gun.cannonType = cannonType;
                    this.logic.playSpine(changeCannonEffect,false,false,animationName,()=>{
                        changeCannonEffect.active = false;
                    });
                    this.logic.playSpine(battery,false,false,CONST.SpineName.Idle2);
                    laserBornEffect.runAction(cc.repeatForever(cc.rotateBy(0.8,360)));
                }
                laserBornEffect.getComponent("nfish_MovieClip").initEffect(this.laserBornEffect_Atlas,mcName,Min,Max,LoopTime,IsHaveZero,Speed,PayEdRemove);
                spCannContainer.stopAllActions();
                let MoveTime;
                let act;
                if(isRotation){
                    MoveTime = 1.6;
                    this.scheduleOnce(()=>{
                        spCannContainer.destroy();
                        this.logic.playSpine(battery,false,false,CONST.SpineName.Get,(spineName)=>{
                            this.logic.playSpine(battery,false,false,CONST.SpineName.Idle,(spineName)=>{
                                //仙剑炮台 变身完成
                                const MoveOver = -1;
                                this.logic[ui_gun.isGunMoving] = MoveOver;
                                this.logic["isGunMoving"+seatNum] = MoveOver;
                                ui_gun.isGunMoving = null;
                            });
                        });
                    },1);
                    act = cc.moveTo(MoveTime, ui_gun.position);
                }else{
                    MoveTime = 1.2;
                    act = cc.sequence(cc.moveTo(MoveTime, ui_gun.position),cc.callFunc(()=>{
                        spCannContainer.destroy();
                        if(seatNum == this.logic.seatNum){
                            cc.warn(">>>>B 更换炮台成功！！==== cannonType "+cannonType)
                        }
                        if(isLog){
                            cc.warn(">>>>B 恢复炮台： 更换炮台成功 1 ==== cannonType "+cannonType)
                        }
                        if(this.logic.seatNum == seatNum)cc.warn("2 ======更换炮台====== cannonType "+cannonType)
                        changeCannonEffect.getComponent(sp.Skeleton).skeletonData = changeCannonSkeletonData;
                        this.logic.playSpine(changeCannonEffect,false,false,animationName,(spineName)=>{
                            if (spineName == animationName) {
                                //其他炮台 变身完成
                                if(seatNum == this.logic.seatNum){
                                    cc.warn(">>>>B 更换炮台 赋值ok ==== cannonType "+cannonType)
                                }
                                if(isLog){
                                    cc.warn(">>>>B 恢复炮台： 更换炮台成功 2 ==== cannonType "+cannonType)
                                }
                                if(this.logic.seatNum == seatNum)cc.warn("3 ======更换炮台====== cannonType "+cannonType)
                                battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                                ui_gun.cannonType = cannonType;
                                this.logic.playSpine(battery,true,false,CONST.SpineName.Idle);
                                const MoveOver = -1;
                                this.logic[ui_gun.isGunMoving] = MoveOver;
                                changeCannonEffect.active = false;
                                this.logic["isGunMoving"+seatNum] = MoveOver;
                                ui_gun.isGunMoving = null;
                            }
                        });
                    }));
                }
                spCannContainer.runAction(act);
            }
        }else{
            if(isLog){
                cc.warn(">>>>C 恢复炮台： 更换炮台成功 X ==== cannonType "+cannonType)
            }
            const NormalCannonOffsex = 1;
            let cannon = Number(gunRate) - NormalCannonOffsex;
            if(cannon < 0){
                cannon = 0;
            }
            let playerInfo = this.logic.playerInfo[Number(uid)];
            if(playerInfo != null){
                let cannonTypeSc = Number(playerInfo.cannonType);
                let batterySkeletonData;
                switch (cannonTypeSc) {
                    case CONST.CannonType.Lightning :   // 闪电
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Lightning];
                        break;
                    case CONST.CannonType.PartialBomb : // 炎爆
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.PartialBomb];
                        break;
                    case CONST.CannonType.Laser :       // 龙息
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Laser];
                        break;
                    case CONST.CannonType.Missile :     // 仙剑
                        batterySkeletonData = this.batteryList[CONST.CannonSkin.Missile];
                        break;
                }
                let battery = ui_gun.getChildByName("battery");
                if(CONST.CannonType.Normal == cannonTypeSc){
                    battery.getComponent(sp.Skeleton).skeletonData = this.batteryList[cannon];
                    if(this.logic.seatNum == seatNum) cc.warn("4.0 ======更换炮台====== cannonType "+cannonType+" uid "+uid + " data cannonType "+cannonTypeSc)

                }else{
                    battery.getComponent(sp.Skeleton).skeletonData = batterySkeletonData;
                    if(this.logic.seatNum == seatNum) cc.warn("4.1 ======更换炮台====== cannonType "+cannonType+" uid "+uid + " data cannonType "+cannonTypeSc)
                }
                ui_gun.cannonType = cannonTypeSc;
                if(this.logic.seatNum == seatNum){
                    this.logic["isGunMoving"+this.logic.seatNum] = -1;
                }
                this.logic.playSpine(battery,true,false,CONST.SpineName.Idle);
                if(this.logic.seatNum == seatNum) cc.warn("4.x ======play 炮台====== cannonType "+cannonType+" uid "+uid + " data cannonType "+cannonTypeSc)
            }
        }
        const Restore = 1;
        //恢复炮台播放一个恢复动画
        if(isRestore != null && isRestore == Restore){
            let spine_restoreCannon = ui_gun.getChildByName("spine_restoreCannon");
            this.logic.playSpine(spine_restoreCannon,false,false,CONST.SpineName.Normal,()=>{
                this.logic.isRestoreIng[uid] = null;
                spine_restoreCannon.active = false;
            });
        }
    },
    //冰冻 - 开始 - 结束
    onFreezeShowUIHandler(){
        if(this.logic.isInFreeze){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"effect_frozen");
        }
    },
    //记录
    historyClickHandler(){
        let panel = glGame.panel.showPanel(this.record_pre);
        panel.zIndex = 30;
        this.menuViewHandler(false);
    },
    //技能 锁定/解锁
    onSkillLockHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        this.logic.isLock = !this.logic.isLock;
        let lockLab = this.ui_skillLock.getChildByName("img_suoding");
        let img_offsuoding = this.ui_skillLock.getChildByName("img_offsuoding");
        let spine = this.ui_skillLock.getChildByName("spine");
        lockLab.active = !this.logic.isLock;
        img_offsuoding.active = !lockLab.active;

        spine.active = this.logic.isLock;
        glGame.emitter.emit(CONST.clientEvent.useLockSkill);
        cc.sys.localStorage.setItem("SkillLock_"+this.logic.roomId, this.logic.isLock ? "open":"close");
        cc.sys.localStorage.setItem("SkillAuto_"+this.logic.roomId, this.logic.isAuto ? "open":"close");
        if(!this.logic.isLock){
            this.logic.lastLockFishID = Number(this.logic.lockFishID+"");
            this.logic.lockFishID = null;
            if(this.logic.isLockAutoChange == false){
                this.logic.isAuto = false;
                glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
            }
            glGame.emitter.emit(CONST.clientEvent.leaveRoomUnLock,this.logic.seatNum);
        }
    },
    //是否自动 切换
    onSkillAutoHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        this.logic.isLockAutoChange = !this.logic.isLockAutoChange;
        if(this.logic.lockFishID == null){
            this.logic.isAuto = this.logic.isLockAutoChange;
            let spine = this.ui_skillAuto.getChildByName("spine");
            spine.active = this.logic.isAuto;
        }else{
            let spine = this.ui_skillAuto.getChildByName("spine");
            spine.active = this.logic.isLockAutoChange;
        }
        cc.sys.localStorage.setItem("SkillisLockAutoChange_"+this.logic.roomId, this.logic.isLockAutoChange ? "open":"close");
        let autoLab = this.ui_skillAuto.getChildByName("img_zidong");
        let img_offzidong = this.ui_skillAuto.getChildByName("img_offzidong");
        autoLab.active = !this.logic.isLockAutoChange;
        img_offzidong.active = !autoLab.active;
        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
    },
    //菜单
    menuViewHandler(isClose = false){
        if(isClose){
            this.ui_menu.active = false;
        }else{
            glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
            this.ui_menu.active = !this.ui_menu.active;
            let ui_upIcon       = this.ui_menuBtn.getChildByName("ui_upIcon");
            let ui_leftIcon     = this.ui_menuBtn.getChildByName("ui_leftIcon");
            ui_upIcon.active    = !ui_upIcon.active;
            ui_leftIcon.active  = !ui_upIcon.active;
        }
    },
    //打开鱼群鉴赏
    openFishGroupHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        let panel = glGame.panel.showPanel(this.illustratedBook);
        panel.zIndex = 30;
        this.menuViewHandler(false);
    },
    //充值
    rechargeClickHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        if(glGame.panel.showSuspicious("recharge")){
            return;
        }
        glGame.panel.showShop();
        this.menuViewHandler(false);
    },
    //设置
    settingClickHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
        let panel = glGame.panel.showPanel(this.setting_pre);
        panel.zIndex = 30;
        this.menuViewHandler(false);
    },
    //自己的 玉如意 出转盘 / 聚宝鹏 出拉霸
    showTurntableHandler(res){
        this.logic.isYuRuyiRuning = true;
        if(res.type == CONST.AwardType.RUYI){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"getYuRu");//捕获玉如意一瞬间播放
            this.turntableView.getComponent("nfish_turntable").initTurntableView(res);
        }else{
            glGame.emitter.emit(CONST.clientEvent.fishSound,"getJuBao");//捕获聚宝盆一瞬间播放
            this.cornucopiaView.getComponent("nfish_cornucopia").startRunCornucopia(res);
        }
        const EffectMaxRunTime = 10;
        this.scheduleOnce(()=>{//玉如意运行时间最大10秒，10秒后强制结束 发射锁
            if(this.logic.isYuRuyiRuning){
                this.logic.isYuRuyiRuning = false;
            }
        },EffectMaxRunTime);
    },
    //退出菜单
    closeViewHandler(arg){
        const IsExit4 = 4;
        if(arg === IsExit4){
            this.menuViewHandler(false);
            return;
        }
        const IsExit3 = 3;
        if(arg === IsExit3){
            cc.sys.localStorage.setItem("SkillisLockAutoChange_"+this.logic.roomId, "");
            cc.sys.localStorage.setItem("SkillLock_"+this.logic.roomId, "");
            this.logic.isEnterRoom = false;
            glGame.room.exitRoom();
            return;
        }
        const IsExit = 1;
        if(arg === IsExit){
            let currentUid = Number(glGame.user.userID);
            let playerInfo = this.logic.playerInfo[currentUid];
            if(playerInfo != null && playerInfo.cannonType != CONST.CannonType.Normal){
                if(playerInfo.cannonAmount > 0){
                    glGame.emitter.emit(CONST.clientEvent.showAlert,CONST.AlertType.LosCannan);
                    return;
                }
            }
            glGame.emitter.emit(CONST.clientEvent.fishSound,"button");
            this.menuViewHandler(false);
            cc.sys.localStorage.setItem("SkillisLockAutoChange_"+this.logic.roomId, "");
            cc.sys.localStorage.setItem("SkillLock_"+this.logic.roomId, "");
            this.logic.isEnterRoom = false;
            glGame.room.exitRoom();
        }
    },
    //alert - 取消
    showAlertHandler(arg){
        switch (arg) {
            case CONST.AlertType.BossClearSocre :
                this.text_exitBossClearSocre.active = true;
                this.btn_quit.active = true;
                this.btn_queding.active = true;
                this.btn_queding_net.active = false;
                break;
            case CONST.AlertType.LosCannan :
                this.text_exitLosCannan.active = true;
                this.btn_quit.active = true;
                this.btn_queding.active = true;
                this.btn_queding_net.active = false;
                break;
            case CONST.AlertType.NetOff :
                this.text_netOff.active = true;
                this.btn_quit.active = false;
                this.btn_queding.active = false;
                this.btn_queding_net.active = true;
                break;
        }
        this.alert_container.active = true;
    },
    //alert - 取消
    onQuitHandler(){
        this.menuViewHandler(false);
        this.alert_container.active = false;
    },
    //alert - 确认
    onQuedingHandler(){
        const IsExit = 3;
        this.closeViewHandler(IsExit);
    },
    //断网确认
    onQuedingOffNetHandler(){
        cc.sys.localStorage.setItem("SkillisLockAutoChange_"+this.logic.roomId, "");
        cc.sys.localStorage.setItem("SkillLock_"+this.logic.roomId, "");
        this.logic.isEnterRoom = false;
        glGame.room.exitRoom();
    },
    //打财神boss 获得红包
    sprinkleRedBagHandler(res){
        let ui_physicalPool  = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
        let fish             = ui_physicalPool.getChildByName(""+res.fishId);
        if(!fish){
            cc.warn(">>找不到鱼 无法漂移红包 res ",res);
            return;
        }
        let fishPos          = fish.position;
        let coinContainer    = this.node.getChildByName("ui_coinEffectContainer");
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let pre              = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
        let targetPosition   = ui_coinEffectPos.getChildByName(pre+res.seatNum).position;
        let effectPosition   = ui_coinEffectPos.getChildByName("redBag"+res.seatNum).position;
        let ui_CoinEffect    = coinContainer.getChildByName("sprinkleRedBag"+res.seatNum);
        if(ui_CoinEffect){
            ui_CoinEffect.isRemoveSelf = 1;
            ui_CoinEffect.stopAllActions();
            ui_CoinEffect.destroy();
        }
        ui_CoinEffect    = cc.instantiate(this.node.getChildByName("spine_effect").getChildByName("spine_redEnvelopeStatistics"));
        ui_CoinEffect.position = effectPosition;
        ui_CoinEffect.name = "sprinkleRedBag"+res.seatNum;
        ui_CoinEffect.active = true;
        if(this.logic.getIsRotation()){
            ui_CoinEffect.angle = 180;
        }
        glGame.emitter.emit(CONST.clientEvent.fishSound,"getCaiShenRew");//捕获到财神出现小UI时，播放
        coinContainer.addChild(ui_CoinEffect);
        this.logic.playSpine(ui_CoinEffect.getChildByName("spine"),false,false,CONST.SpineName.Normal,()=>{
            ui_CoinEffect.stopAllActions();
            ui_CoinEffect.destroy();
        });
        ui_CoinEffect.stopAllActions();
        ui_CoinEffect.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(()=>{
            if(ui_CoinEffect != null){
                let playName = this.logic.seatNum == res.seatNum ? "labG" : "labS";
                let lab_number = ui_CoinEffect.getChildByName("spine").getChildByName("ATTACHED_NODE_TREE").getChildByName("ATTACHED_NODE:root").getChildByName("ATTACHED_NODE:zong").getChildByName(playName);
                lab_number.active = true;
                lab_number.getComponent(cc.Label).string = "+"+this.logic.formatMoney(res.rewardGold);
            }
        })));

        let effectCoin       = 10;
        const MaxCoin        = 100;//最大数量
        const RandomoffSex   = 60;//xy坐标偏移值
        const RandomMin      = 15;//xy坐标偏移最小值
        const RandomOffsexX  = 30;
        const RandomOffsexY  = 50;
        const RandomMinY     = 20;
        const StartName      = 0;
        const endName        = 9;
        const plyTime        = 8;
        const isHaveZero     = false;
        const speed          = 0.035;
        const plyedDestroy   = false;
        const isRandomPly    = 1;
        const OneDelayTime   = 0.1;
        const TwoDelayTime   = 0.05;
        const ScaleToTime    = 1;
        const BezierToTime   = 0.7;
        const ScaleToArg     = 0.8;
        const FadeToTime     = 0.1;
        const MoveToTime     = 0.15;
        const EndOpacity     = 255;
        const Gold           = "gold";
        const Silver         = "silver";
        if(effectCoin > MaxCoin){
            effectCoin = MaxCoin;
        }
        ui_CoinEffect.zIndex -= effectCoin;
        for (let i=0;i<effectCoin;i++){
            let ui_CoinEffect     = this.logic.creatorEffect();
            ui_CoinEffect.x       = fishPos.x + Math.random() * RandomoffSex + RandomMin;
            ui_CoinEffect.y       = fishPos.y + Math.random() * RandomoffSex + RandomMin;
            ui_CoinEffect.active  = true;
            ui_CoinEffect.parent  = null;
            ui_CoinEffect.opacity = 0;

            let playName = this.logic.seatNum == res.seatNum ? Gold : Silver;
            ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas,playName,StartName,endName,plyTime,isHaveZero,speed,plyedDestroy,null,isRandomPly);
            if(this.logic.getIsRotation()){
                ui_CoinEffect.angle = 180;
            }
            coinContainer.addChild(ui_CoinEffect);
            let upPos       = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);
            if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
                upPos       = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y - ( Math.random() * RandomOffsexY + RandomMinY));
            }
            let bounceAct1  = cc.spawn(cc.fadeTo(FadeToTime,EndOpacity),cc.moveTo(MoveToTime,ui_CoinEffect.position));
            let bounceAct2  = cc.moveTo(MoveToTime,upPos);
            let bezierPoint = cc.v2(targetPosition.x,ui_CoinEffect.position.y);
            let act         = cc.spawn(cc.scaleTo(ScaleToTime,ScaleToArg,ScaleToArg),cc.bezierTo(BezierToTime,[upPos,bezierPoint,cc.v2(targetPosition.x,targetPosition.y)]));
            ui_CoinEffect.runAction(cc.sequence(cc.delayTime((i+1)*OneDelayTime),bounceAct1,bounceAct2,act,cc.delayTime(i*TwoDelayTime),cc.callFunc(()=>{
                ui_CoinEffect.destroy();
            })));
        }
    },
    //死鱼后：金币旋转、漂移 + 金币增长动画 获取鱼的坐标 转换坐标到本地坐标 播放金币旋转动画，2秒后 漂移+缩放 到炮台位置 ，流程结束 释放、隐藏
    playCoinEffectHandler(res){
        let rewardGold = Number(res.rewardGold);
        if(rewardGold <= 0){
            return;
        }
        //检查该鱼是否有转盘
        let effectRotateLevel = CONST.EffectRotateLevel.OneLevel;//0 一档 1 2 3
        let resGroupId;
        if(this.logic.fishPoolData[Number(res.fishId)] != null){
            let fishTypeId = this.logic.fishPoolData[Number(res.fishId)].fishTypeId + "";
            if(this.logic.json_fishTable[fishTypeId] != null){
                effectRotateLevel = this.logic.json_fishTable[fishTypeId].effectRotate;
                resGroupId = this.logic.json_fishTable[fishTypeId].resGroupId;
            }
        }
        if(res.killType == CONST.CannonType.Bomb){//熔岩玄武炸死的一律飘1档次
            effectRotateLevel = CONST.EffectRotateLevel.OneLevel;
        }
        let ui_physicalPool  = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
        let fish             = ui_physicalPool.getChildByName(""+res.fishId);
        if(fish == null){
            //找不到鱼
            cc.warn(">> 找不到鱼 id:",res.fishId)
            return;
        }
        if(this.logic.seatNum == res.seatNum){
            switch (effectRotateLevel) {
                case CONST.EffectRotateLevel.OneLevel :
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"getVoice1");//1挡
                    break
                case CONST.EffectRotateLevel.TowLevel   :
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"getVoice2");//2挡
                    break
                case CONST.EffectRotateLevel.ThreeLevel :
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"getVoice3");//3挡
                    break
                case CONST.EffectRotateLevel.FourLevel  :
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"getVoice4");//4挡
                    break
            }
        }

        switch (effectRotateLevel) {
            case CONST.EffectRotateLevel.OneLevel :
                this.flyGoldEffect(effectRotateLevel,res);//飞金币动画
                break
            case CONST.EffectRotateLevel.TowLevel   :
            case CONST.EffectRotateLevel.ThreeLevel :
            case CONST.EffectRotateLevel.FourLevel  :
                this.flyRotateEffect(effectRotateLevel,fish.position,resGroupId,res);
                break
        }
    },
    //捕获效果 - 展示转盘飞转盘动画 effectRotateLevel 档次  rewardGold 奖励数值  startShowPos 开始显示点 flySeatNum 需要飞到的座位 resGroupId 图片显示
    flyRotateEffect(effectRotateLevel,startShowPos,resGroupId,res){
        let rewardGold       = res.rewardGold;
        let flySeatNum       = res.seatNum;
        let effectContainer  = this.node.getChildByName("ui_coinEffectContainer");
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let pre              = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
        let moveToPos        = ui_coinEffectPos.getChildByName(pre+res.seatNum).position;
        let spine_effect     = this.node.getChildByName("spine_effect");
        let spineCantainer   = null;
        let bg;
        let fish;
        if(res.fishTypeId == CONST.BossLavaBasalt){
            spineCantainer   = cc.instantiate(spine_effect.getChildByName("spine_bossRongYan"));
            bg               = spineCantainer.getChildByName("ATTACHED_NODE_TREE").getChildByName("img_bg");
        }else{
            if(this.logic.seatNum == flySeatNum && effectRotateLevel == CONST.EffectRotateLevel.FourLevel) {
                spineCantainer   = cc.instantiate(spine_effect.getChildByName("spine_rewardANew4"));
                this.scheduleOnce(()=>{//爆炸 出现时机
                    spineCantainer.getChildByName("spine_boom_1").active = true;
                },0.1);
                this.scheduleOnce(()=>{//爆炸 出现时机
                    spineCantainer.getChildByName("spine_boom_2").active = true;
                },0.3);
                this.scheduleOnce(()=>{//爆炸 出现时机
                    spineCantainer.getChildByName("spine_boom_3").active = true;
                },0.6);
            }else {
                //捕获效果  have two spine style so need trinocular expression
                spineCantainer = cc.instantiate(spine_effect.getChildByName(this.logic.seatNum == flySeatNum ? "spine_rewardA"+effectRotateLevel :  "spine_rewardB"+effectRotateLevel));
            }
            bg               = spineCantainer.getChildByName("img_bg");
            fish             = spineCantainer.getChildByName("fish");
        }
        if(bg != null){
            let lab = bg.getChildByName(this.logic.seatNum == flySeatNum ? "gold_lab" : "silver_lab");
            lab.active = true;
            if(res.fishTypeId == CONST.BossLavaBasalt){
                lab.getComponent(cc.Label).string = "";
                const RepeatTimes = 10;
                const coin = this.logic.formatMoney(rewardGold);
                const SubTimes = Math.ceil(Number(coin+"")/RepeatTimes);
                let currentCoin = 0;
                let i = 0;
                //读数消失
                this.schedule(()=>{
                    if(spineCantainer != null && spineCantainer.isDestroy == null && lab != null && lab._components != undefined){
                        currentCoin += SubTimes;
                        if(currentCoin >= coin){
                            lab.getComponent(cc.Label).string = "+" + coin;
                        }else{
                            lab.getComponent(cc.Label).string = "+" + currentCoin;
                        }
                        i++;
                        if(i == RepeatTimes){

                        }
                    }
                },0.09,RepeatTimes-1);
            }else{
                let currStartNum = this.logic.formatMoney(rewardGold)+"";
                if(currStartNum.indexOf(".") != -1){
                    lab.getComponent(cc.Label).string = Number(currStartNum).toFixed(1);
                }else{
                    lab.getComponent(cc.Label).string = currStartNum;
                }
            }
        }
        if(fish){
            let sprF         = this.icon_Atlas.getSpriteFrame(resGroupId);
            let scale        = spineCantainer.height / sprF.getOriginalSize().height;
            // const TwoScale   = 1.3;
            // const ThreeScale = 1.75;
            // const FourScale  = 3;
            const TwoScale   = 0.55;
            const ThreeScale = 0.75;
            const FourScale  = 1;
            if(effectRotateLevel == CONST.EffectRotateLevel.TowLevel){
                scale = TwoScale;
                sprF  = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
            }
            if(effectRotateLevel == CONST.EffectRotateLevel.ThreeLevel){
                scale = ThreeScale;
                sprF  = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
            }
            if(effectRotateLevel == CONST.EffectRotateLevel.FourLevel){
                scale = FourScale;
                sprF  = this.icon_2_3_4_Atlas.getSpriteFrame(resGroupId);
            }
            fish.getComponent(cc.Sprite).spriteFrame = sprF;
            fish.oldScale = scale;
            fish.scale = 0;
            fish.stopAllActions();
            fish.runAction(cc.sequence(cc.scaleTo(0.2,fish.oldScale*2),cc.scaleTo(0.2,fish.oldScale)))
        }
        let DelayTime       = effectRotateLevel * 0.25;//停留时间 - 根据不同级别的动画表现的k的帧数多少 决定停留时间

        if(effectRotateLevel == CONST.EffectRotateLevel.TowLevel){
            DelayTime += 0.45;
        }
        if(effectRotateLevel == CONST.EffectRotateLevel.ThreeLevel){
            DelayTime += 1;
        }

        const Centont     = 0;
        const HalfScale   = 0.5;

        if(this.logic.seatNum != flySeatNum && effectRotateLevel == CONST.EffectRotateLevel.FourLevel){
            spineCantainer.scale = HalfScale;
            let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
            let posNodeName = this.logic.getIsRotation() ? "effectRotatePosR"+flySeatNum : "effectRotatePos"+flySeatNum;
            let pos = ui_coinEffectPos.getChildByName(posNodeName).position;
            spineCantainer.x = pos.x;
            spineCantainer.y = pos.y;
        }else{
            spineCantainer.position = effectRotateLevel == CONST.EffectRotateLevel.FourLevel ?  cc.v2(Centont,Centont) : startShowPos;
        }
        spineCantainer.active = true;
        const BasezIndex = 100 * effectRotateLevel;
        if(this.lastzIndex){
            spineCantainer.zIndex = BasezIndex + this.lastzIndex;
        }else{
            spineCantainer.zIndex = BasezIndex
            this.lastzIndex = spineCantainer.zIndex;
        }
        if(effectRotateLevel == CONST.EffectRotateLevel.FourLevel){
            DelayTime += 1.1;
        }
        let callBalk = cc.callFunc(()=>{//动画结束回调函数 - 加金币 读数动画
            this.addGoldEffect(effectRotateLevel,res);//飘分
            spineCantainer.isDestroy = 1;
            spineCantainer.destroy();
        });
        if(this.logic.getIsRotation()){
            spineCantainer.angle = 180;
        }
        effectContainer.addChild(spineCantainer);
        spineCantainer.stopAllActions();

        const MoveToTime    = 0.25;
        const ScaleToTime   = 0.55;
        const ScaleToArg    = 0;
        const EffScaleToArg = 1;
        const EffScaleToTime= 0.1;
        const EffDelayTime  = 0.5;
        const EffectNum     = (Number(res.fishId))%7 + 1;
        const EffectPre     = "effectTitle_";
        if(res.fishTypeId != CONST.BossLavaBasalt && effectRotateLevel == CONST.EffectRotateLevel.FourLevel){//第四档捕获效果不发生漂移效果，动画表现稍微有点不太一样
            spineCantainer.getChildByName("effectTitle").getComponent(cc.Sprite).spriteFrame = this.explosionAndLightning_Atlas.getSpriteFrame(EffectPre+EffectNum);
            let fourEffect = cc.sequence(cc.delayTime(DelayTime),cc.scaleTo(ScaleToTime,ScaleToArg,ScaleToArg),callBalk);
            spineCantainer.runAction(fourEffect);
            spineCantainer.getChildByName("effectTitle").scale = ScaleToArg;
            spineCantainer.getChildByName("effectTitle").stopAllActions();
            spineCantainer.getChildByName("effectTitle").runAction(cc.sequence(cc.delayTime(EffDelayTime),cc.scaleTo(EffScaleToTime,EffScaleToArg,EffScaleToArg)));
        }else if(res.fishTypeId != CONST.BossLavaBasalt){
            let otherEffect = cc.sequence(cc.delayTime(DelayTime),cc.spawn(cc.scaleTo(ScaleToTime,ScaleToArg,ScaleToArg),cc.moveTo(MoveToTime,moveToPos)),callBalk);
            spineCantainer.runAction(otherEffect);
        }else{
            let otherEffect = cc.sequence(cc.delayTime(DelayTime),callBalk);
            spineCantainer.runAction(otherEffect);

        }
    },
    //漂移金币动画
    flyGoldEffect(effectRotateLevel,res){
        let coinContainer    = this.node.getChildByName("ui_coinEffectContainer");
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let pre              = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
        let targetPosition   = ui_coinEffectPos.getChildByName(pre+res.seatNum).position;
        let ui_physicalPool  = this.node.parent.getChildByName("nfish_deskContainer").getChildByName("ui_physicalPool");
        let fish             = ui_physicalPool.getChildByName(""+res.fishId);
        let effectCoin       = Math.ceil(Math.random() * 5 + 1);
        const MaxCoin        = 100;//最大数量
        const RandomoffSex   = 60;//xy坐标偏移值
        const RandomMin      = 15;//xy坐标偏移最小值
        const RandomOffsexX  = 30;
        const RandomOffsexY  = 50;
        const RandomMinY     = 20;
        const StartName      = 0;
        const endName        = 9;
        const plyTime        = 8;
        const isHaveZero     = false;
        const speed          = 0.035;
        const plyedDestroy   = false;
        const isRandomPly    = 1;
        const OneDelayTime   = 0.1;
        const TwoDelayTime   = 0.05;
        const ScaleToTime    = 1;
        const BezierToTime   = 0.7;
        const ScaleToArg     = 0.8;
        const FadeToTime     = 0.1;
        const MoveToTime     = 0.15;
        const EndOpacity     = 255;
        const Gold           = "gold";
        const Silver         = "silver";
        if(effectCoin > MaxCoin){
            effectCoin = MaxCoin;
        }

        const CoinLabOffsexY = 158;

        let coinlab = cc.instantiate(coinContainer.getChildByName(this.logic.seatNum == res.seatNum ? "flyGoldCoinLab" : "flySilverCoinLab"));
        coinlab.active = true;
        coinlab.getComponent(cc.Label).string = "+"+this.logic.formatMoney(res.rewardGold);
        let fishPos = fish.position;
        coinlab.x = fishPos.x + Math.random() * RandomoffSex + RandomMin;
        let moveToAct;
        if(this.logic.getIsRotation()){
            coinlab.angle = 180;
            coinlab.y = fishPos.y;
            moveToAct = cc.moveTo(0.3,coinlab.x,coinlab.y - CoinLabOffsexY)
        }else {
            coinlab.y = fishPos.y;
            moveToAct = cc.moveTo(0.3,coinlab.x,coinlab.y + CoinLabOffsexY)
        }
        coinContainer.addChild(coinlab);

        coinlab.runAction(cc.sequence(cc.delayTime(0.3),moveToAct,cc.callFunc(()=>{
            coinlab.destroy();
        })))

        for (let i=0;i<effectCoin;i++){
            let ui_CoinEffect     = this.logic.creatorEffect();
            ui_CoinEffect.x       = fishPos.x + Math.random() * RandomoffSex + RandomMin;
            ui_CoinEffect.y       = fishPos.y + Math.random() * RandomoffSex + RandomMin;
            ui_CoinEffect.active  = true;
            ui_CoinEffect.parent  = null;
            ui_CoinEffect.opacity = 0;


            let playName = this.logic.seatNum == res.seatNum ? Gold : Silver;
            ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas,playName,StartName,endName,plyTime,isHaveZero,speed,plyedDestroy,null,isRandomPly);
            if(this.logic.getIsRotation()){
                ui_CoinEffect.angle = 180;
            }
            coinContainer.addChild(ui_CoinEffect);
            let upPos         = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

            if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
                upPos         = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y - ( Math.random() * RandomOffsexY + RandomMinY));
            }
            let bounceAct1    = cc.spawn(cc.fadeTo(FadeToTime,EndOpacity),cc.moveTo(MoveToTime,ui_CoinEffect.position));
            let bounceAct2    = cc.moveTo(MoveToTime,upPos);
            let bezierPoint   = cc.v2(targetPosition.x,ui_CoinEffect.position.y);
            let act           = cc.spawn(cc.scaleTo(ScaleToTime,ScaleToArg,ScaleToArg),cc.bezierTo(BezierToTime,[upPos,bezierPoint,cc.v2(targetPosition.x,targetPosition.y)]));
            ui_CoinEffect.runAction(cc.sequence(cc.delayTime((i+1)*OneDelayTime),bounceAct1,bounceAct2,act,cc.delayTime(i*TwoDelayTime),cc.callFunc(()=>{
                ui_CoinEffect.destroy();
            })));
        }

        if(this.logic.seatNum == res.seatNum && CONST.EffectRotateLevel.OneLevel == effectRotateLevel){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"flyGold");//飞金币
        }

        if(CONST.EffectRotateLevel.OneLevel != effectRotateLevel){
            this.scheduleOnce(()=>{
                this.addGoldEffect(effectRotateLevel,res);//加金币 读数动画
            },1);
        }
    },
    //飘分
    addGoldEffect(effectRotateLevel,res){
        let pre = res.seatNum == this.logic.seatNum ? "lab_coinGlod":"lab_coinSilver";

        let lab_coinMask        = this.node.getChildByName("ui_coinEffectContainer").getChildByName("lab_coinMask"+res.seatNum);
        if(this.logic.getIsRotation()){
            lab_coinMask        = this.node.getChildByName("ui_coinEffectContainer").getChildByName("lab_coinMaskR"+res.seatNum);
        }
        let base_labNode        = lab_coinMask.getChildByName(pre);
        let labNode             = cc.instantiate(base_labNode);
        if(base_labNode.oldx == undefined){
            base_labNode.oldx   = Number(base_labNode.x + "");
            base_labNode.oldy   = Number(base_labNode.y + "");
        }
        labNode.oldx            = Number(base_labNode.oldx + "");
        labNode.oldy            = Number(base_labNode.oldy + "");
        lab_coinMask.addChild(labNode);
        const MoveOffsex        = Math.random() * 5 + 5;
        const MoveOffsex2       = MoveOffsex + 5;
        let endPos              = cc.v2(labNode.oldx,labNode.oldy + MoveOffsex);
        if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
            endPos              = cc.v2(labNode.oldx,labNode.oldy - MoveOffsex);
        }

        let endPos2             = cc.v2(labNode.oldx,endPos.y + MoveOffsex2);
        if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
            endPos2             = cc.v2(labNode.oldx,endPos.y - MoveOffsex2);
        }

        if(this.logic.getIsRotation()){
            labNode.angle = 180;
            labNode.anchorX = 0;
        }

        const oldPos            = cc.v2(labNode.oldx,labNode.oldy);
        labNode.currRewardGold  = 0;
        labNode.startHide       = 0;
        labNode.rewardGold      = res.rewardGold;
        labNode.scale           = 0;
        labNode.setPosition(lab_coinMask.getChildByName("lab_startPos").position);
        labNode.stopAllActions();
        labNode.getComponent(cc.Label).string = "+"+this.logic.formatMoney(res.rewardGold);
        labNode.active          = true;
        const GoTime            = 0.17;
        const endTime           = 0.4;
        const DelayTime         = 0.35;
        const DelayStateTime    = 0.05;
        const Normal            = 1.2;
        const ScaleToTime       = 0.2;
        const ScaleToTime2      = 0.2;
        const FadeToTime        = 0.3;
        const Hide              = 0;
        const FadeTo            = 0;
        labNode.runAction(
            cc.sequence(
                cc.delayTime(DelayTime),
                cc.spawn(cc.scaleTo(ScaleToTime,Normal),cc.moveTo(GoTime,oldPos)),
                cc.delayTime(DelayStateTime),
                cc.moveTo(endTime,endPos2),
                cc.sequence(
                    cc.fadeTo(FadeToTime,Hide),
                    cc.scaleTo(ScaleToTime2,FadeTo),
                    cc.moveBy(endTime,endPos2),
                ),
                cc.callFunc(()=>{
                    if(res.msg != null){
                        if(this.logic.seatNum == res.seatNum){
                            this.logic.gold = Number(res.msg.coin);
                            this.logic.checkGold();
                            // cc.error(">> 更新我的钱  ok！")
                            glGame.emitter.emit(CONST.clientEvent.myUpdateMoney);
                        }else{
                            // cc.error(">> 射击 更新其他用户的钱 ok!")
                            glGame.emitter.emit(CONST.clientEvent.updateShootGold,res.msg);
                        }
                        this.logic["isUpdateMoney"+res.msg.seatNum] = true;//玉如意、聚宝盆 结束 恢复更新余额机制
                    }
                    labNode.destroy();
                })
            )
        );
    },
    //特殊子弹统计
    specialBulletStatistics(res){
        if(res.total < 0.1){//打死掉鱼没分就不播了
            return;
        }
        //仙剑比较特殊 生命周期较长
        let coinContainer    = this.node.getChildByName("ui_coinEffectContainer");
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let spineCantainer   = coinContainer.getChildByName("spineCantainer"+res.seatNum);
        if(spineCantainer != null){
            if(spineCantainer.isDispose == null && spineCantainer.cannonType == res.cannonType){//isDispose=1则为正在销毁的路上、同样类型
                if(res.total > 0){
                    spineCantainer.currCoin = null;
                    this["runSpecial"+res.seatNum] = false;
                    this.scheduleOnce(()=>{
                        if(spineCantainer == null){
                            spineCantainer  = coinContainer.getChildByName("spineCantainer"+res.seatNum);
                        }
                        if(spineCantainer != null && spineCantainer._components != undefined){
                            let spinec = spineCantainer.getChildByName(res.seatNum == this.logic.seatNum ? "gold_lab" : "silver_lab")
                            if(spinec != null){
                                if(spinec._components != undefined && spinec.getComponent(cc.Label)) {
                                    let lab = spinec.getComponent(cc.Label);
                                    let oldCoin = lab.string == undefined || lab.string == "" ? 0 : Number(lab.string);
                                    spineCantainer.startRun = res.totalReward;
                                    if(spineCantainer.currCoin == null){
                                        spineCantainer.currCoin = Number(oldCoin);
                                    }
                                    this["runSpecial"+res.seatNum] = true;
                                }
                            }else{
                                cc.error(" 统计框已经不存在 统计错误！ res ",res)
                            }
                        }
                    },0.2);
                }
            }else{//清理
                this["runSpecial"+res.seatNum] = false;
                spineCantainer.opacity = 0;
                spineCantainer.stopAllActions();
                coinContainer.removeChild(spineCantainer);
                spineCantainer.destroy();
                spineCantainer = null;
            }
        }

        if(spineCantainer == null){
            this["runSpecial"+res.seatNum] = false;
            let spine_effect        = this.node.getChildByName("spine_effect");
            spineCantainer          = cc.instantiate(spine_effect.getChildByName("spine_speciaCoinNum"));
            spineCantainer.cannonType = res.cannonType;
            spineCantainer.oldScale = spineCantainer.scale;
            const NotOpacity        = 0;
            const NotScale          = 0;

            spineCantainer.active   = true;
            spineCantainer.position = ui_coinEffectPos.getChildByName("statisticsPos"+res.seatNum).position;
            spineCantainer.name     = "spineCantainer"+res.seatNum;
            spineCantainer.opacity  = NotOpacity;
            spineCantainer.scale    = NotScale;
            if(this.logic.getIsRotation()){
                spineCantainer.angle = 180;
            }
            coinContainer.addChild(spineCantainer);

            const NormalOpacity = 255;
            const QScale        = 2;
            const NormalScale   = spineCantainer.oldScale;
            const FadeTime      = 0.2;
            const ScalTTime     = 0.2;

            spineCantainer.stopAllActions();
            let act = cc.sequence(cc.spawn(cc.fadeTo(FadeTime,NormalOpacity),cc.scaleTo(ScalTTime,QScale)),cc.scaleTo(ScalTTime,NormalScale),cc.callFunc(()=>{
                //播放移动球
                const Scale = 1.33;
                let laserBornEffect  = this.logic.creatorEffect();
                laserBornEffect.parent = null;
                laserBornEffect.active = true;
                laserBornEffect.setPosition(spineCantainer.getChildByName("effect").position);
                laserBornEffect.scale = Scale;
                spineCantainer.addChild(laserBornEffect);
                let mcName;
                let scale = 1;
                let isRo = false;
                switch (Number(res.cannonType)) {
                    case CONST.CannonType.Lightning :   // 闪电
                        mcName = CONST.CannonGetEddect.Lightning;
                        break;
                    case CONST.CannonType.PartialBomb : // 炎爆
                        mcName = CONST.CannonGetEddect.PartialBomb;
                        break;
                    case CONST.CannonType.Laser :       // 龙息
                        mcName = CONST.CannonGetEddect.Laser;
                        break;
                    case CONST.CannonType.Missile :     // 仙剑
                        mcName = CONST.CannonGetEddect.Missile;
                        scale = 0.95;
                        laserBornEffect.y = -3;
                        isRo = true;
                        break;
                }
                const Min = 1;
                const Max = 5;
                const LoopTime = 0;
                const IsHaveZero = false;
                const Speed = 0.12;
                const PayEdRemove = false;

                laserBornEffect.scale = scale;
                if(isRo){
                    laserBornEffect.stopAllActions();
                    laserBornEffect.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.9,cc.v2(laserBornEffect.x,laserBornEffect.y+6)),cc.moveTo(0.9,cc.v2(laserBornEffect.x,laserBornEffect.y-6)))));
                }
                laserBornEffect.getComponent("nfish_MovieClip").initEffect(this.laserBornEffect_Atlas,mcName,Min,Max,LoopTime,IsHaveZero,Speed,PayEdRemove);

                const Frequency = 10; //设置频率 读数次数 10 次
                spineCantainer.frequency = res.total/Frequency;
                if(res.isoffNet == null){//非断线重连
                    //开始进行度数
                    spineCantainer.startRun = Number(res.totalReward);
                    spineCantainer.currCoin = 0;//读数当前指针值
                    this["runSpecial"+res.seatNum] = true;
                }else{
                    spineCantainer.startRun = Number(res.total);
                    spineCantainer.currCoin = res.total;//读数当前指针值
                    let labName = res.seatNum == this.logic.seatNum ? "gold_lab" : "silver_lab";
                    spineCantainer.getChildByName(labName).getComponent(cc.Label).string = res.total+"";
                }
            }));
            spineCantainer.runAction(act);
        }
    },
    //开始读数
    runSpecialBulletStatistics(dt){
        const UserMax = 4;
        for (let i=0;i<UserMax;i++){
            if(!this["runSpecial"+i]){
                continue;
            }
            let spineCantainer = this.node.getChildByName("ui_coinEffectContainer").getChildByName("spineCantainer"+i);
            if(spineCantainer != null && spineCantainer.currCoin != null && spineCantainer.currCoin != undefined && spineCantainer.startRun != null){
                spineCantainer.currCoin +=  Number(spineCantainer.frequency);
                let lab = spineCantainer.getChildByName(i == this.logic.seatNum ? "gold_lab" : "silver_lab").getComponent(cc.Label);
                let oldCoin = lab.string == undefined || lab.string == "" ? 0 : Number(lab.string);
                if(spineCantainer.currCoin >= spineCantainer.startRun){//读数完成
                    if(spineCantainer.startRun > oldCoin){
                        let currStartNum = spineCantainer.startRun+"";
                        if(currStartNum.indexOf(".") != -1){
                            lab.string = Number(spineCantainer.startRun).toFixed(1);
                        }else{
                            lab.string = spineCantainer.startRun;
                        }
                        cc.warn(">>>>>2. 计分成功 =====> end startRun "+spineCantainer.startRun)
                    }else{
                        // cc.error(">>> 3. 计数失败 =====> : "+spineCantainer.currCoin+" 当前数: "+oldCoin)
                    }
                    spineCantainer.currCoin = null;
                    glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
                }else{//正在读数
                    if(spineCantainer.currCoin > oldCoin){
                        let currStartNum = spineCantainer.currCoin+"";
                        if(currStartNum.indexOf(".") != -1){
                            lab.string = currStartNum.split(".")[0];
                        }else{
                            lab.string = spineCantainer.currCoin;
                        }
                    }else{

                    }
                }
            }
        }
    },
    //清除特殊子弹
    clearSpecialHandler(seatNum){
        const DeayTime = 1.5;
        this.scheduleOnce(()=>{
            let lastCannType = Number(this.logic.specialBulletPool[seatNum] + "");
            delete this.logic.specialBulletPool[seatNum];//根据规则：每个玩家同屏下只允许有一个特殊子弹
            if(this.logic.seatNum == seatNum)cc.warn("=== 删除特殊子弹状态 ============ seatNum "+seatNum+" lastCannType "+lastCannType)
            glGame.emitter.emit(CONST.clientEvent.checkSpecialBullet);
        },DeayTime);
    },
    //检查当前计数器计数完成之后是否需要销毁
    checkSpecialBulletHandler(){
        let isDisSpecial = null;
        const UserMax = 4;
        for (let i=0;i<UserMax;i++){
            let spineCantainer = this.node.getChildByName("ui_coinEffectContainer").getChildByName("spineCantainer"+i);
            if(spineCantainer != null && spineCantainer.currCoin == null){ //如果计数器存在,并且 读数完成
                let isLevel = true;
                for(let key in this.logic.playerInfo){
                    let playerInfo = this.logic.playerInfo[key];
                    if(playerInfo != null && Number(playerInfo.seatNum) == i) {//按照座位找到当前用户身上的子弹信息
                        isLevel = false;
                        if(this.logic.specialBulletPool[i] == undefined && this.logic.specialBulletPool[i] == null){
                            if(spineCantainer.cannonType == CONST.CannonType.Missile) {//仙剑子弹 的销毁逻辑 要特殊处理
                                if(playerInfo.cannonAmount != undefined && playerInfo.cannonAmount == 0){//如果当前没有仙剑子弹在飞、并且身上已经没有了子弹
                                    isDisSpecial = "======= 1 结果 仙剑结束  seatNum "+i+" mySeatNum "+this.logic.seatNum;
                                    // if(this.logic.seatNum == i) cc.error(">>>>>>>>>>>>>>>>>>>>>  1111 ")
                                    this.specialBulletStatisticsClear(playerInfo);//开始销毁
                                }
                            }
                            if(playerInfo.cannonType == CONST.CannonType.Normal){
                                isDisSpecial = "======= 2 结果 当前是普通子弹 seatNum "+i+" mySeatNum "+this.logic.seatNum;
                                // if(this.logic.seatNum == i)cc.error(">>>>  2222.1  当前是普通子弹 playerInfo "+playerInfo.cannonType," playerInfo ",playerInfo)
                                this.specialBulletStatisticsClear(playerInfo);//开始销毁
                            }
                            if(spineCantainer.cannonType != playerInfo.cannonType){//如果当前统计框的类型和身上子弹类型不一样
                                isDisSpecial = "======== 3 结果 切换了 子弹 seatNum"+i+" mySeatNum "+this.logic.seatNum;
                                // if(this.logic.seatNum == i)cc.error(">>>>  3333  当前是普通子弹 playerInfo "+playerInfo.cannonType," playerInfo ",playerInfo);
                                this.specialBulletStatisticsClear(playerInfo);//开始销毁
                            }

                        }
                    }
                }
                if(isLevel){
                    isDisSpecial = "====== 4 结果 用户离开 seatNum "+i+" mySeatNum "+this.logic.seatNum;
                    this.specialBulletStatisticsClear({seatNum:i});//开始销毁
                }
            }
        }
    },
    //销毁 - 计数器 取消计算数字 - 升级到所有子弹销毁
    specialBulletStatisticsClear(res){
        this["runSpecial"+res.seatNum] = false;
        let ui_coinEffectContainer = this.node.getChildByName("ui_coinEffectContainer");
        let spineCantainer = ui_coinEffectContainer.getChildByName("spineCantainer"+res.seatNum);

        if(spineCantainer != null && spineCantainer.isDispose != null){
            // if(this.logic.seatNum == res.seatNum)cc.error(">>> 正在销毁 ----seatNum "+res.seatNum);
            return;
        }
        if(spineCantainer != null){
            spineCantainer.isDispose = 1;
            // if(this.logic.seatNum == res.seatNum)cc.error("===================销毁 cannonType : "+spineCantainer.cannonType+" seatNum "+res.seatNum)
            // if(this.logic.seatNum == res.seatNum)cc.error("");
            // if(this.logic.seatNum == res.seatNum)cc.error("");
            // if(this.logic.seatNum == res.seatNum)cc.error("");
            spineCantainer.currCoin = null;
            spineCantainer.lastcurrCoin = null;
            const DelayTime  = 0.9;
            const FadeToTime = 0.2;
            const FadeToArg  = 0;
            const DelayTime2 = 2;

            this.scheduleOnce(()=>{
                spineCantainer = ui_coinEffectContainer.getChildByName("spineCantainer"+res.seatNum);
                if(spineCantainer != null){
                    spineCantainer.stopAllActions();
                    ui_coinEffectContainer.removeChild(spineCantainer);
                    spineCantainer.destroy();
                }
            },DelayTime+(FadeToTime*DelayTime2));

            spineCantainer.stopAllActions();
            spineCantainer.runAction(cc.sequence(cc.delayTime(DelayTime),cc.fadeTo(FadeToTime,FadeToArg)),cc.callFunc(()=>{
                ui_coinEffectContainer.removeChild(spineCantainer);
                spineCantainer.opacity = 0;
                spineCantainer.destroy();
            }));
        }else{
            if(this.logic.seatNum == res.seatNum){
                cc.error(">>销毁 失败 "+res.seatNum+"  spineCantainer is null  >> spineCantainer ",spineCantainer);
            }
        }
    },
    //其他人的 如意 聚宝鹏 展示
    oPSSAHandler(res){
        const NormalOpacity  = 255;
        let effectContainer  = this.node.getChildByName("ui_coinEffectContainer");
        let spine_effect     = this.node.getChildByName("spine_effect");
        let type             = res.type;
        let typeName         = type == CONST.AwardType.RUYI ? "YuRu" : "juBao";
        let seatNum          = res.seatNum;
        let posPreName       = type == CONST.AwardType.RUYI ? "yuRuPos" : "juBaoPos";
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let nodeName         = typeName+seatNum;
        let posName          = posPreName+seatNum;
        let targetPosition;
        if(this.logic.getIsRotation()){
            posPreName       = type == CONST.AwardType.RUYI ? "yuRuPos_R_" : "juBaoPos_R_";
            posName          = posPreName+seatNum;
            targetPosition = ui_coinEffectPos.getChildByName(posName).position;
        }else{
            targetPosition = ui_coinEffectPos.getChildByName(posName).position;
        }
        let spineCantainer   = effectContainer.getChildByName(nodeName);
        if(spineCantainer == null){
            let spineName         = type == CONST.AwardType.RUYI ? "spine_YuRu" : "spine_JuBao";
            spineCantainer        = cc.instantiate(spine_effect.getChildByName(spineName));
            spineCantainer.name   = nodeName;
            spineCantainer.active = true;
            spineCantainer.setPosition(targetPosition);
            effectContainer.addChild(spineCantainer);
            if(this.logic.getIsRotation()){
                spineCantainer.angle = 180;
            }
        }else{
            spineCantainer.active = true;
            spineCantainer.opacity = NormalOpacity;
            spineCantainer.stopAllActions();
        }
        this.startShowSpacil(res,type,spineCantainer);
    },
    //开始显示 特殊
    startShowSpacil(res,type,spineCantainer){
        if(type == CONST.AwardType.RUYI){
            spineCantainer.runAction(cc.sequence(
                cc.scaleTo(0.5, 1, 1),
                cc.delayTime(6),
                cc.callFunc(() => {
                    this.flyGoldEffectForSpacil(res)
                })
            ))
        }else {
            spineCantainer.runAction(cc.sequence(
                cc.scaleTo(0.5, 1, 1),
                cc.delayTime(6),
                cc.callFunc(() => {
                    this.flyGoldEffectForSpacil(res)
                })
            ))
        }
    },
    //飞金币
    flyGoldEffectForSpacil(res){
        let type             = res.type;
        let seatNum          = res.seatNum;
        let typeName         = type == CONST.AwardType.RUYI ? "YuRu" : "juBao";
        let posPreName       = type == CONST.AwardType.RUYI ? "yuRuPos" : "juBaoPos";
        let ui_coinEffectPos = this.node.getChildByName("ui_coinEffectPos");
        let startPos         = ui_coinEffectPos.getChildByName(posPreName+seatNum).position;
        let effectContainer  = this.node.getChildByName("ui_coinEffectContainer");
        let coinContainer    = this.node.getChildByName("ui_coinEffectContainer");
        let pre              = this.logic.getIsRotation() ? "coinFlyR" : "coinFly";
        let targetPosition   = ui_coinEffectPos.getChildByName(pre+seatNum).position;
        let spineCantainer   = effectContainer.getChildByName(typeName+seatNum);
        const Multiple = 100;
        const MaxCoin = 20;//最大数量

        let effectCoin = Math.ceil(res.rewardGold / Multiple);
        if (effectCoin > MaxCoin) {
            effectCoin = MaxCoin;
        }

        const StartName = 1;
        const endName = 16;
        const plyTime = 3;
        const isHaveZero = false;
        const speed = 0.035;
        const plyedDestroy = false;
        const isRandomPly = 1;

        const RandomOffsexX = 30;
        const RandomOffsexY = 50;
        const RandomMinY = 20;

        const OneDelayTime = 0.1;
        const TwoDelayTime = 0.05;
        const ScaleToTime = 1;
        const BezierToTime = 0.7;
        const ScaleToArg = 0.8;
        const FadeToTime = 0.1;
        const MoveToTime = 0.15;
        const EndOpacity = 255;

        for (let i = 0; i < effectCoin; i++) {
            let ui_CoinEffect = this.logic.creatorEffect();
            ui_CoinEffect.x = startPos.x;
            ui_CoinEffect.y = startPos.y;
            ui_CoinEffect.active = true;
            ui_CoinEffect.parent = null;
            ui_CoinEffect.opacity = 0;
            let playName = "silver";

            ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);

            coinContainer.addChild(ui_CoinEffect);
            let upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

            if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
                upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
            }
            let bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
            let bounceAct2 = cc.moveTo(MoveToTime, upPos);
            let bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
            let act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));

            ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i * OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(i * TwoDelayTime), cc.callFunc(() => {
                ui_CoinEffect.destroy();
            })));
        }
        let endGoldTime = effectCoin * OneDelayTime + effectCoin * TwoDelayTime;//最后一个金币漂移的时间
        const HideOpacity = 0;
        spineCantainer.stopAllActions();
        spineCantainer.runAction(cc.sequence(
            cc.delayTime(endGoldTime),
            cc.scaleTo(0.5, 0, 0),
            cc.callFunc(()=>{
                spineCantainer.opacity = HideOpacity;
            })
        ));
    },
    //飘分
    addGoldEffectHandler(res){
        this.addGoldEffect(0,res)
    },
    //充值到账财神爷
    onCoinChangedHandler(res){
        let myid = glGame.user.userID;
        if(res.uid == myid){
            let arrvalCoin = this.logic.getFloat(Number(res.offset));
            glGame.emitter.emit(glGame.showGodOfWealth,{pos:3,coin:arrvalCoin});
        }
    },
    //判断退出 特殊鱼来了 显示倒计时，boss来了 播放特效
    update(dt){
        if(window.p){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"bossCominCaiShen");//BOSS警告财神
            glGame.emitter.emit(CONST.clientEvent.fishSound,"bossCsComin");//BOSS 财神降临
            window.p = null;
        }
        this.fireTime += dt;
        if(this.fireTime > this.fireTimeFrequency){
            this.fireTime = 0;
            this.isFire = true;
        }
        if(this.bulletTips.active == true){
            this.bulletTipTime += dt;
            const ShowMaxTime = 2;
            if(this.bulletTipTime >= ShowMaxTime){
                this.bulletTips.active = false;
                this.bulletTipTime = 0;
            }
        }
        if(!this.logic.isEnterRoom){
            return
        }
        this.runSpecialBulletStatistics(dt);
        if(this.clickFishPoolEvent != null){
            this.clickFishPoolTime += dt;
            const MaxClickFishPoolTime = 0.053;
            if(this.clickFishPoolTime > MaxClickFishPoolTime){
                this.nextClickFishPoolHandler(this.clickFishPoolEvent);
                this.clickFishPoolEvent = null;
                this.clickFishPoolTime = 0;
            }
        }
        const ChangeSecond = 1000;
        let time = this.logic.exitTimeMsg - Math.floor((Date.now() - this.logic.curWaitTime) / ChangeSecond);
        if (time < 0.9 && this.isExit) {
            this.isExit = false;
            this.logic.isEnterRoom = false;
            glGame.room.exitRoom();
        }else{
            if (time <= this.logic.exitTimeMsg-this.logic.showTimeMsg) {
                this.node.getChildByName("ui_ExitTip").active = true;
                this.node.getChildByName("ui_ExitTip").getChildByName("lab_tip2").getComponent(cc.Label).string = time > 0 ? time : 0;
            }
        }

        if (time <= this.logic.exitTimeMsg-this.logic.showTimeMsg) {

        } else {
            this.node.getChildByName("ui_ExitTip").active = false;
        }
        const HaveSpecialFish = 1;
        const ToSecond        = 1000;
        const ThreeHideTime   = ToSecond * 3;
        const ShowTime        = ToSecond * 30;
        if(this.logic.specialFishListBornLen > HaveSpecialFish && this.logic.specialFishListBorn != null){//有特属鱼即将出生，搞个计时器显示下
            for (let id in this.logic.specialFishListBorn){
                this.logic.specialFishListBorn[id].wellBornTime -= dt * ToSecond;
                if(this.logic.specialFishListBorn[id].wellBornTime < 0){
                    this.logic.specialFishListBorn[id].wellBornTime = 0;
                }
                let showTime =  new Date(this.logic.specialFishListBorn[id].wellBornTime).Format("mm：ss");
                let tip;
                if(this.logic.specialFishListBorn[id].wellBornTime > HaveSpecialFish && this.logic.specialFishListBorn[id].wellBornTime < ThreeHideTime){

                    if(this.logic.specialFishListBorn[id].fishTypeId == CONST.BossGodOfWealth && this.logic.specialFishListBorn[id].isSetTime == null){
                        this.effect_csrcdh.settingActiveTime = 8;
                        this.logic.specialFishListBorn[id].isSetTime = 1;
                    }
                    if(this.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt && this.logic.specialFishListBorn[id].isSetTime == null){
                        this.effect_ryxwrcdh.settingActiveTime = 8;
                        this.logic.specialFishListBorn[id].isSetTime = 1;
                    }

                    if(this.logic.specialFishListBorn[id].fishTypeId == CONST.BossSYLW && this.logic.specialFishListBorn[id].isSetTime == null){
                        this.logic.specialFishListBorn[id].isSetTime = 1;
                    }
                }
                if(this.logic.specialFishListBorn[id].wellBornTime > HaveSpecialFish && this.logic.specialFishListBorn[id].wellBornTime < ShowTime){
                    tip = this.bossConeInTip.getChildByName(id+"");
                    if(tip == null){
                        tip             = cc.instantiate(this.bossBornTip);
                        tip.name        = id+"";
                        tip.active      = true;
                        let icon        = tip.getChildByName("cantainer").getChildByName("mask").getChildByName("img_icon");
                        let fishData1   = this.logic.json_fishTable[this.logic.specialFishListBorn[id].fishTypeId+""];
                        let fishData2   = this.logic.json_fishTable[Number(this.logic.specialFishListBorn[id].fishTypeId)];
                        let fishData    = fishData1 == undefined ? fishData2 :fishData1;
                        let resGroupId  = fishData.resGroupId;
                        icon.getComponent(cc.Sprite).spriteFrame = this.speciaIcon_Atlas.getSpriteFrame(CONST.SpeciaResPre+resGroupId);
                        if(this.logic.getIsRotation()){
                            icon.angle = 180;
                        }
                        this.bossConeInTip.addChild(tip);
                        tip.x = tip.width;
                        tip.stopAllActions();
                        tip.runAction(cc.moveTo(this.bossTipMoveToTime,this.bossNormalPos.position));
                    }
                    tip.getChildByName("lab_Time").getComponent(cc.Label).string = showTime + "";
                    tip.active = !this.logic.isFishTideRuning;
                }else{
                    tip = this.bossConeInTip.getChildByName(id+"");
                    if(tip != null && tip.isRun == null){
                        const IsHave = 1;
                        tip.active = !this.logic.isFishTideRuning;
                        tip.isRun = IsHave;
                        tip.getChildByName("lab_Time").getComponent(cc.Label).string = showTime + "";
                        tip.stopAllActions();
                        tip.runAction(cc.sequence(cc.moveTo(this.bossTipMoveToTime,cc.v2(tip.width,tip.y)),cc.callFunc(()=>{
                            this.bossConeInTip.removeChild(tip);
                            tip.destroy();
                        })));

                        if(this.logic.specialFishListBorn[id].fishTypeId == CONST.BossGodOfWealth){
                            glGame.emitter.emit(CONST.clientEvent.bossGodOfWealthCoin);//BOSS警告财神
                            this.effect_csrcdh.getComponent(cc.Widget).updateAlignment();
                            let bet;
                            if(glGame.fishMutipleCfg == null){
                                bet = "0";//出现这个就是：拿不到数据或者配表出错
                            }else{
                                bet = (glGame.fishMutipleCfg[CONST.BossGodOfWealth]+"").replace("-","~");
                            }
                            let desc_lab = this.spine_csrcdh.getChildByName("lab_betDesc");
                            if(desc_lab.oldX == undefined){
                                desc_lab.oldX = desc_lab.x;
                            }else{
                                desc_lab.x = desc_lab.oldX;
                            }
                            desc_lab.stopAllActions();
                            desc_lab.runAction(cc.sequence(cc.delayTime(2),cc.moveTo(0.25,cc.v2(cc.winSize.width,desc_lab.y))));
                            desc_lab.getComponent(cc.Label).string = bet+"倍";
                            this.logic.playSpine(this.spine_csrcdh,false,true,CONST.SpineName.Normal);
                        }
                        if(this.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt){
                            glGame.emitter.emit(CONST.clientEvent.bossLavaBasaltComin);//BOSS警告财神
                            this.effect_ryxwrcdh.getComponent(cc.Widget).updateAlignment();
                            let bet;
                            if(glGame.fishMutipleCfg == null){
                                bet = "0";//出现这个就是：拿不到数据或者配表出错
                            }else{
                                bet = (glGame.fishMutipleCfg[CONST.BossLavaBasalt]+"").replace("-","~");
                            }
                            let desc_lab = this.spine_ryxwrcdh.getChildByName("lab_betDesc");
                            if(desc_lab.oldX == undefined){
                                desc_lab.oldX = desc_lab.x;
                            }else{
                                desc_lab.x = desc_lab.oldX;
                            }
                            desc_lab.stopAllActions();
                            desc_lab.runAction(cc.sequence(cc.delayTime(2),cc.moveTo(0.25,cc.v2(cc.winSize.width,desc_lab.y))));
                            desc_lab.getComponent(cc.Label).string = bet+"倍";
                            this.logic.playSpine(this.spine_ryxwrcdh,false,true,CONST.SpineName.Normal);
                        }

                        const PlayBGMTime = 3;
                        if (this.logic.specialFishListBorn[id].fishTypeId == CONST.BossSYLW) {
                            this.scheduleOnce(()=> {
                                glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossSYLWBgMusic);//播放 深渊龙王 背景声音
                            },PlayBGMTime);
                        }

                        if (this.logic.specialFishListBorn[id].fishTypeId == CONST.BossLavaBasalt) {
                            this.scheduleOnce(()=> {
                                glGame.emitter.emit(CONST.clientEvent.fishBgSound, CONST.BossLavaBasaltBgMusic);//播放 熔岩玄武 背景声音
                            },PlayBGMTime);
                        }

                        delete this.logic.specialFishListBorn[id];
                    }
                }
            }
        }
        if(this.effect_csrcdh != null && this.effect_csrcdh.settingActiveTime != null && !this.logic.isFishTideRuning){
            const Frequency = 500;
            const PositiveDirection = 1;//正方向
            const OppositeDirection = -1;//反方向
            const MaxLight = 254;
            const MinLight = 1;
            if(this.effect_csrcdh.settingActiveTime > 0)
            {
                if(this.effect_csrcdh.active == false){
                    this.effect_csrcdh.active = true;
                    this.effect_csrcdh.getComponent(cc.Widget).updateAlignment();
                }
                if(this.effect_csrcdh.subD == null){
                    this.effect_csrcdh.subD = PositiveDirection;
                }
                if(this.effect_csrcdh.subD == PositiveDirection){
                    this.effect_csrcdh.opacity += Math.ceil(dt * Frequency);
                    if(this.effect_csrcdh.opacity > MaxLight){
                        this.effect_csrcdh.subD = OppositeDirection;
                    }
                }else{
                    this.effect_csrcdh.opacity -= Math.ceil(dt * Frequency);
                    if(this.effect_csrcdh.opacity < MinLight){
                        this.effect_csrcdh.subD = PositiveDirection;
                    }
                }
                this.effect_csrcdh.settingActiveTime -= dt;
            }else{
                this.effect_csrcdh.settingActiveTime = null;
                this.effect_csrcdh.active = false;
            }
        }
        if(this.effect_ryxwrcdh != null && this.effect_ryxwrcdh.settingActiveTime != null && !this.logic.isFishTideRuning){
            const Frequency = 500;
            const PositiveDirection = 1;//正方向
            const OppositeDirection = -1;//反方向
            const MaxLight = 254;
            const MinLight = 1;
            if(this.effect_ryxwrcdh.settingActiveTime > 0)
            {
                if(this.effect_ryxwrcdh.active == false){
                    this.effect_ryxwrcdh.active = true;
                    this.effect_ryxwrcdh.getComponent(cc.Widget).updateAlignment();
                }
                this.effect_ryxwrcdh.settingActiveTime -= dt;
                if(this.effect_ryxwrcdh.subD == null){
                    this.effect_ryxwrcdh.subD = PositiveDirection;
                }
                if(this.effect_ryxwrcdh.subD == PositiveDirection){
                    this.effect_ryxwrcdh.opacity += Math.ceil(dt * Frequency);
                    if(this.effect_ryxwrcdh.opacity > MaxLight){
                        this.effect_ryxwrcdh.subD = OppositeDirection
                    }
                }else{
                    this.effect_ryxwrcdh.opacity -= Math.ceil(dt * Frequency);
                    if(this.effect_ryxwrcdh.opacity < MinLight){
                        this.effect_ryxwrcdh.subD = PositiveDirection
                    }
                }
            }else{
                this.effect_ryxwrcdh.settingActiveTime = null;
                this.effect_ryxwrcdh.active = false;
            }
        }
        //debug 代码
        if(window.test1 != null){
            let spCannContainer = this.node.getChildByName("spCannContainer");
            spCannContainer.active = true;

            let laserBornEffect  = this.logic.creatorEffect();
            laserBornEffect.parent = null;
            laserBornEffect.active = true;
            laserBornEffect.scale = 1;
            laserBornEffect.name = "changeCannonEffect";
            spCannContainer.addChild(laserBornEffect);

            laserBornEffect.runAction(cc.repeatForever(cc.rotateBy(0.8,360)));
            const Min = 1;
            const Max = 5;
            const LoopTime = 40;
            const IsHaveZero = false;
            const Speed = 0.02;
            const PayEdRemove = false;
            laserBornEffect.getComponent("nfish_MovieClip").initEffect(this.laserBornEffect_Atlas,CONST.CannonGetEddect.Missile,Min,Max,LoopTime,IsHaveZero,Speed,PayEdRemove);


            spCannContainer.stopAllActions();
            let act = cc.sequence(cc.moveTo(1,this.node.getChildByName("targetpos").position),cc.callFunc(()=>{

            }));

            spCannContainer.runAction(act);

            window.test1 = null;
        }
    },
    //鱼潮来了隐藏 boss来了
    hideBossConinUIHandler(){
        this.effect_csrcdh.settingActiveTime = null;
        this.effect_ryxwrcdh.settingActiveTime = null;
        this.effect_csrcdh.active = false;
        this.effect_ryxwrcdh.active = false;
    },
    //boss 过来 开始倒计时
    bossComeinHandler(res){
        let fishTypeId = res.fishTypeId;
        let liveTime   = Number(res.serverTime - res.createTime); //出生时间
        let NotBorn    = 0;
        const ToSecond = 1000;
        if(liveTime < NotBorn){//大于0 就是已经出生了不必再出提示
            this.logic.specialFishListBornLen ++;
            let wellBornTime = Math.abs(liveTime) + (Number(res.showTime) * ToSecond);//还要多久才出生 - 从屏幕边缘开始游动起来 并不是进入屏幕
            this.logic.specialFishListBorn[res.id] = {fishTypeId:fishTypeId,wellBornTime:wellBornTime};
        }
    },
    //财神进入
    bossGodOfWealthCoinHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"bossCominCaiShen");//BOSS警告财神
        glGame.emitter.emit(CONST.clientEvent.fishSound,"bossCsComin");//BOSS 财神降临
    },
    //熔岩玄武进入
    bossLavaBasaltCominHandler(){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"bossCominXuanWu");//BOSS警告玄武
    },
    //断线重连，清理数据
    clearbossComeinHandler(){
        for (let id in this.logic.specialFishListBorn){
            let tip = this.bossConeInTip.getChildByName(id+"");
            if(tip){
                this.bossConeInTip.removeChild(tip);
                tip.destroy();
                delete this.logic.specialFishListBorn[id];
            }
        }
        this.logic.specialFishListBornLen = 0;
        this.logic.specialFishListBorn = {};
    },
    //设置旋转
    checkRotationHandler(){
        cc.warn(">> 角度旋转180  checkRotationHandler")
        this.logic.isNeedSet180Angle(this.node);
    },
    //海浪鱼群-播放海浪
    onSurfStartHandler(res){
        let ui_surfCantainer = this.node.getChildByName("ui_surfCantainer");
        ui_surfCantainer.getChildByName("waves_texture1").active = true;
        ui_surfCantainer.getChildByName("waves_texture2").active = false;
        ui_surfCantainer.x       = cc.winSize.width-400;
        const MoveToTime         = 2;
        const OutWinSizeOffceX   = 5;
        const OutWinSizeX        = -cc.winSize.width;

        ui_surfCantainer.stopAllActions();
        ui_surfCantainer.runAction(cc.sequence(cc.moveTo(MoveToTime,cc.v2(OutWinSizeX,ui_surfCantainer.y)),cc.callFunc(()=>{
            ui_surfCantainer.x = cc.winSize.width+OutWinSizeOffceX;
            ui_surfCantainer.getChildByName("waves_texture1").active = false;
            ui_surfCantainer.getChildByName("waves_texture2").active = false;
        })));
    },
    //显示浪潮来临
    showFishTideTitleHandler() {
        let ui_fishTideTitle = this.node.getChildByName("ui_fishTideTitle");
        const HidOpacity         = 255;
        ui_fishTideTitle.opacity = HidOpacity;
        ui_fishTideTitle.active  = true;
        this.logic.playSpine(ui_fishTideTitle.getChildByName("spine"),false,true,CONST.SpineName.Normal);

    },
    //关闭loading
    clseLoadingViewHandler(){
        this.node.getChildByName("loadingView").active = false;
    },
    //清理
    OnDestroy() {
        this.unscheduleAllCallbacks();
        this.logic       = null;
        this.unregisterEvent();

        this.bossTipMoveToTime  = 0.5
        this.node.isInit        = 1;
        this.bulletTipTime      = 0;
        this.clickFishPoolEvent = null;
        this.clickFishPoolTime  = 0;
        this.lastAngle          = null;
        this.logic              = require("nfishlogic").getInstance();//数据中心
        this.fireTime           = 0;    //开火计时器
        this.fireTimeFrequency  = 0.17; //开火频率
        this.isFire             = true; //是否可以开火
        this.logic.cannonLevel  = null;
        this.isExit             = true;
        if(this.turntableView)this.turntableView.destroy();
        this.turntableView = null;
        if(this.cornucopiaView)this.cornucopiaView.destroy();
        this.cornucopiaView = null;
    },
    /**
     * @param event
     * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
     * @Explain Button点击事件统一调用
     */
    OnClickButton(event, type) {
        let buttonName = event.target.name;
        let buttonNode = event.target;

        if(buttonName == "ui_menuBtn" || buttonName == "ui_BtnSub" || buttonName == "ui_BtnPlus" || buttonName == "ui_skillAuto" || buttonName == "ui_skillLock"){
            //这5个按钮就不限制
        }else{
            if (!type || type == "select"){
                if (this.curClickState) return;
                this.curClickState = true;
                this.allCurTimeout = this.allCurTimeout || [];
                this.allCurTimeout.push(setTimeout(() => {
                    this.curClickState = false;
                }, 500));
            }
        }

        console.log(`点击了button -> ${buttonName}`);
        switch (buttonName) {
            case "close_eff":        //当前界面有播放特长音效的关闭按钮
                glGame.audio.closeCurEffect();
                glGame.audio.playLoadSoundEffectByPath("close");
                break;
            case "close":
                glGame.audio.playLoadSoundEffectByPath("close");
                break;
            default:
                if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");
                else glGame.audio.playLoadSoundEffectByPath("click");
        }
        this.onClick(buttonName, buttonNode);
    },
});
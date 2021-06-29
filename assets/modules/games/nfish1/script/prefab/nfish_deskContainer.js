/***
 *  捕鱼：桌子：渔场 、 子弹池、部分UI(隐式大炮）,部分特效
 * **/
let CONST = require("nfishConst");
glGame.baseclass.extend({
    properties: {
        ui_physicalPool:cc.Node,    //物理池： 鱼 子弹 参与碰撞检测的对象
        hitNode:cc.Node,           //点击屏幕的碰撞快
        ui_LockCantainer:cc.Node, //点击屏幕的碰撞快
        partialBombEffect:cc.Node, //炎爆爆炸效果
        fish_Bullet:cc.Prefab,    //子弹预制单位
        fish_Unit:cc.Prefab,    //鱼预制单位
        //子弹UI
        explosionAndLightning_Atlas: {
            default: null,
            displayName: "特效图集",
            tooltip: "爆炸，灰烬，闪电",
            type:cc.SpriteAtlas,
        },
        //子弹UI
        bullet_Atlas: {
            default: null,
            displayName: "子弹UI",
            tooltip: "子弹UI 1 - 10",
            type:cc.SpriteAtlas,
        },
        //仙剑子弹UI
        missilBullet_Atlas: {
            default: null,
            displayName: "仙剑子弹UI",
            tooltip: "仙剑子弹UI",
            type:cc.SpriteAtlas,
        },
        //fish
        fish_AtlaLists: {
            default: [],
            displayName: "所有鱼",
            tooltip: "鱼",
            type:[cc.SpriteAtlas],
        },

    },
    onLoad () {
        this.logic              = require("nfishlogic").getInstance();//数据中心
        this.startRunFish       = false;
        this.currTouchEvent     = null;
        this.fireTime           = 0;    //开火计时器
        this.fireTimeFrequency  = 0.17; //开火频率
        this.isFire             = true; //是否可以开火
        this.shootTime          = 0;
        this.hitNodeTime        = 0;
        this.autoShootTime      = 0;                                                             //隐藏特殊鱼 node
        this.lockBulletList     = [];
        this.fishNodeList       = {};
        this.fishNodeListLenght = 0;
        this.oldPos             = this.node.position;
        this.hitNode.addComponent("nfish_hitNode");
        this.hitNode.active     = false;
        this.isSshockIng        = false;
        cc.director.getCollisionManager().enabled = true;                        //打开碰撞检测
        cc.director.getPhysicsManager().enabled = true;                          //启用物理引擎相关功能
        //调试模式
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit ||cc.PhysicsManager.DrawBits.e_pairBit;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;         //是否绘制碰撞组件的包围盒
        // cc.director.getCollisionManager().enabledDebugDraw = true;               //是否绘制碰撞组件的形状
        this.registerEvent();
    },
    start () {
    },
    //注册监听
    registerEvent() {
        glGame.emitter.on(CONST.clientEvent.adjustGunAngle,this.adjustGunAngleHandler,this);        //调整高射炮角度
        glGame.emitter.on(CONST.clientEvent.initFishPool,this.initFishPoolHandler,this);            //初始化鱼塘
        glGame.emitter.on(CONST.clientEvent.addFishPool,this.addFishPoolHandler,this);              //加鱼
        glGame.emitter.on(CONST.clientEvent.addFishTide,this.addFishTideHandler,this);              //加鱼潮
        glGame.emitter.on(CONST.clientEvent.playShootBullet,this.playShootBulletHandler,this);      //用户射击
        glGame.emitter.on(CONST.clientEvent.playFishnetEffect,this.playFishnetEffectHandler,this);  //生成渔网
        glGame.emitter.on(CONST.clientEvent.onKillFish,this.onKillFishHandler,this);                //销毁鱼
        glGame.emitter.on(CONST.clientEvent.onFreezeStartStop,this.onFreezeStartStopHandler,this);  //冰冻 开始-结束
        glGame.emitter.on(CONST.clientEvent.useAutoSkill,this.useAutoSkillHandler,this);            //使用锁定技能
        glGame.emitter.on(CONST.clientEvent.leaveRoomUnLock,this.leaveRoomUnLockHandler,this);      //用户离开解锁
        glGame.emitter.on(CONST.clientEvent.seaWaveFishGroup,this.seaWaveFishGroupHandler,this);    //海浪鱼群 - 快速游走
        glGame.emitter.on(CONST.clientEvent.fishCancelShoot,this.onClickHandler,this);              //停止射击
        glGame.emitter.on(CONST.clientEvent.disposeFishNode,this.disposeFishNodeHandler,this);      //销毁鱼
        glGame.emitter.on(CONST.clientEvent.initBulletList,this.initBulletListHandler,this);        //初始化鱼池子弹-断连
        glGame.emitter.on(CONST.clientEvent.onSshock,this.onShockHandler,this);                     //震动屏幕
        glGame.emitter.on(CONST.clientEvent.playLockSpine,this.playLockSpineHandler,this);          //播放锁定动画
        glGame.emitter.on(CONST.clientEvent.onSpecialBulletExp,this.onSpecialBulletExpHandler,this);//特殊子弹爆炸
        glGame.emitter.on(CONST.clientEvent.onSpecialBomb,this.onSpecialBombHandler,this);          //熔岩玄武 全屏爆炸
        glGame.emitter.on(CONST.clientEvent.changeCantainer,this.changeCantainerHandler,this);      //改变物理容器 scale
        glGame.emitter.on(CONST.clientEvent.changeCantainer,this.changeCantainerHandler,this);      //改变物理容器 scale
        glGame.emitter.on(CONST.clientEvent.lockSelfFish,this.lockSelfFishHandler,this);            //锁定鱼
        glGame.emitter.on(CONST.clientEvent.checkBgMusic,this.checkBgMusicHandler,this);            //根据是否有boss 检查切换背景音乐
        this.ui_physicalPool.on(cc.Node.EventType.TOUCH_END,this.onFireHooHandler,this);            //结束点击 鱼池
        this.ui_physicalPool.on(cc.Node.EventType.TOUCH_START,this.onFireHooHandler,this);          //开始点击 鱼池
        this.ui_physicalPool.on(cc.Node.EventType.TOUCH_CANCEL,this.onFireHooHandler,this);         //取消点击 鱼池
    },
    //反注册监听
    unregisterEvent() {
        glGame.emitter.off(CONST.clientEvent.adjustGunAngle,this);
        glGame.emitter.off(CONST.clientEvent.initFishPool,this);
        glGame.emitter.off(CONST.clientEvent.addFishPool,this);
        glGame.emitter.off(CONST.clientEvent.addFishTide,this);
        glGame.emitter.off(CONST.clientEvent.playShootBullet,this);
        glGame.emitter.off(CONST.clientEvent.playFishnetEffect,this);
        glGame.emitter.off(CONST.clientEvent.onKillFish,this);
        glGame.emitter.off(CONST.clientEvent.onFreezeStartStop,this);
        glGame.emitter.off(CONST.clientEvent.useAutoSkill,this);
        glGame.emitter.off(CONST.clientEvent.leaveRoomUnLock,this);
        glGame.emitter.off(CONST.clientEvent.seaWaveFishGroup,this);
        glGame.emitter.off(CONST.clientEvent.fishCancelShoot,this);
        glGame.emitter.off(CONST.clientEvent.disposeFishNode,this);
        glGame.emitter.off(CONST.clientEvent.initBulletList,this);
        glGame.emitter.off(CONST.clientEvent.onSshock,this);
        glGame.emitter.off(CONST.clientEvent.playLockSpine,this);
        glGame.emitter.off(CONST.clientEvent.onSpecialBulletExp,this);
        glGame.emitter.off(CONST.clientEvent.onSpecialBomb,this);
        glGame.emitter.off(CONST.clientEvent.changeCantainer,this);
        glGame.emitter.off(CONST.clientEvent.lockSelfFish,this);
        glGame.emitter.off(CONST.clientEvent.checkBgMusic,this);
    },
    //生成渔网
    playFishnetEffectHandler(res){
        let bulletEffect  = null;
        if(res.gunLevel >= 1 && res.gunLevel <= 3){
            bulletEffect = "bulletEffect1_3";
        }
        if(res.gunLevel >= 4 && res.gunLevel <= 6){
            bulletEffect = "bulletEffect4_6";
        }
        if(res.gunLevel >= 7 && res.gunLevel <= 9){
            bulletEffect = "bulletEffect7_9";
        }
        if(res.gunLevel == 10){
            bulletEffect = "bulletEffect10";
        }
        if(res.cannonType == CONST.CannonType.Missile){
            bulletEffect = "bulletEffectMissile";
        }
        let bulletNode   = this.node.getChildByName(bulletEffect);
        if(!bulletNode){
            cc.warn(">无 生成渔网")
            return;
        }
        //根据这两个参数 实例化相对于 子弹特效
        let fishNet      = cc.instantiate(bulletNode);
        fishNet.parent   = null;
        fishNet.position = res.position;
        fishNet.active   = true;
        fishNet.zIndex   = res.zIndex;
        const maxScaleSet= 1.5;
        let m            = this.logic.getRandomNum(0.6,1);
        if(res.gunLevel == 9){
            m            = this.logic.getRandomNum(0.5,0.7);
        }
        if(res.gunLevel == 10){
            m            = this.logic.getRandomNum(0.5,1);
        }
        if(res.cannonType == CONST.CannonType.Missile){
            m = maxScaleSet;
        }
        fishNet.setScale(m);
        fishNet.angle = this.logic.getRandomNum(0,360);
        this.ui_physicalPool.addChild(fishNet);
        fishNet.getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
            let name = trackEntry.animation ? trackEntry.animation.name : "";
            if (name == CONST.SpineName.Attack) {
                fishNet.destroy();
            }
        });
        fishNet.getComponent(sp.Skeleton).setAnimation(0,CONST.SpineName.Attack,false);
    },
    //点击 鱼池
    onFireHooHandler(evt){
        if(evt != null && evt.type == cc.Node.EventType.TOUCH_START){
            if(this.isFire){
                this.isFire  = false;
                glGame.emitter.emit(CONST.clientEvent.fishCancelShoot,evt);
            }
        }else{
            this.shootTime = -1000;
            this.currTouchEvent = null;
            glGame.emitter.emit(CONST.clientEvent.fishCancelShoot,evt);
        }
    },
    //点击 鱼池
    onClickHandler(evt){
        if(evt != null && evt.type == cc.Node.EventType.TOUCH_START){
            if(this.logic.isLock) {//锁定鱼 逻辑重写
                let pos = evt.getLocation();
                let direction       = this.ui_physicalPool.convertToNodeSpaceAR(pos);
                this.hitNode.active = true;
                this.hitNode.getComponent("nfish_hitNode").setClick(direction);
            }
            glGame.emitter.emit(CONST.clientEvent.clickFishPool,evt);
            this.shootTime = 0;
            this.currTouchEvent = evt;
        }else{
            this.shootTime = -1000;
            this.currTouchEvent = null;
        }
    },
    //检测射击
    checkShoot(dt){
        const ShotInterval = 0.2;
        const ShotIntervalTime = -1000;
        if(this.logic.isAuto){
            //如果使用了锁定技能，那么必须有锁定对象
            if(!this.logic.isLock || (this.logic.isLock && this.logic.lockFishID != undefined)){
                this.autoShootTime += dt;
                if(this.autoShootTime > ShotInterval){
                    this.autoShootTime = 0;
                    glGame.emitter.emit(CONST.clientEvent.clickFishPool,null);
                }
            }
        }else if(this.currTouchEvent != null){
            if(this.currTouchEvent.type == cc.Node.EventType.TOUCH_END){
                this.currTouchEvent = null;
                this.shootTime = ShotIntervalTime;
                return;
            }
            if(this.currTouchEvent.type == cc.Node.EventType.TOUCH_START){
                this.shootTime += dt;
                if(this.shootTime > ShotInterval){
                    this.shootTime = 0;
                    glGame.emitter.emit(CONST.clientEvent.clickFishPool,this.currTouchEvent);
                }
            }
        }
    },
    //服务器广播发射子弹
    playShootBulletHandler(res){
        if(Number(res.seatNum) == Number(this.logic.seatNum)){
            cc.error("服务器广播 发射子弹 过滤自己的！");
            return;
        }
        const Moving = 1;
        if(this.logic["isGunMoving"+res.seatNum] == Moving){
            cc.log(">正在更换炮台 播放特效 无法发射子弹!")
            return;
        }
        if(res.aimFishId != null){
            let fish = this.ui_physicalPool.getChildByName(""+res.aimFishId);
            if(fish != null){
                res.lock = Number(res.aimFishId);
                res.angle = null;
            }
            this.adjustGunAngleHandler(res);
            glGame.emitter.emit(CONST.clientEvent.updateGunRecoil,res);
            // cc.warn(">> 广播 射击 更新其他用户的钱 5")
            glGame.emitter.emit(CONST.clientEvent.updateShootGold,res);
        }else {
            this.adjustGunAngleHandler(res);
            glGame.emitter.emit(CONST.clientEvent.updateGunRecoil,res);
            // cc.warn(">> 广播 射击 更新其他用户的钱 5")
            glGame.emitter.emit(CONST.clientEvent.updateShootGold,res);
        }
    },
    //断线重连 发射子弹
    initBulletListHandler(res){
        this.adjustGunAngleHandler(res,true);
    },
    //发射子弹 -> 炮台 转向，坐标，位置  offLine 是否是断线重连
    adjustGunAngleHandler(res,offLine = false){
        let myid = glGame.user.userID;
        if(res.uid == null){
            cc.error(">>无法确定 子弹 身份 res",res);
            return;
        }
        let isMe = Number(res.uid) == myid;
        if(isMe && !offLine){
            switch (Number(this.logic.cannonLevel)) {
                case 1:
                case 2:
                case 3:
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"attack1_3");
                    break;
                case 4:
                case 5:
                case 6:
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"attack4_6");
                    break;
                case 7:
                case 8:
                case 9:
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"attack7_9");
                    break;
                case 10:
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"attack10");
                    break;
            }
        }//普通攻击
        let ui_gun        = this.ui_physicalPool.getChildByName("ui_gun"+res.seatNum);
        if(ui_gun == undefined){
            cc.error(">>> 找不到炮台 ",res)
            return;
        }
        let oldAngle      = Number(ui_gun.angle + "");
        if(res.angle != undefined){
            ui_gun.angle      = res.angle;
        }
        let fire          = ui_gun.getChildByName("point_bullet"+res.seatNum);
        let worldPoint    = fire.convertToWorldSpaceAR(fire.position);
        let localPoint    = this.ui_physicalPool.convertToNodeSpaceAR(worldPoint);
        if(res.gunType == null){
            res.gunType == 1;
        }
        if(res.lock != undefined && res.angle == undefined){
            res.angle = this.getTargetFishAngle(res.lock,res.seatNum);
            if(res.angle == null){
                cc.error(this.logic.lockFishID+"  >>> fish  fishNodeList ",this.fishNodeList," fishPoolData ",this.logic.fishPoolData)
                res.lock = null;//解锁
                if(isMe){
                    this.logic.lockFishID = null;//找不到鱼解锁
                    cc.error(">>>用户自己 发射子弹 找不到鱼 "+res.lock)
                }else{
                    cc.error(">>>其他人 发射子弹 找不到鱼 "+res.lock)
                }
            }
        }
        res.placeOfBirth  = cc.v2(localPoint.x,localPoint.y);
        let tpmAngle;
        if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
            tpmAngle = res.angle;
        }else{
            tpmAngle = -res.angle;
        }
        const NormalAngel = 180;
        res.placeOfBirth.x += Math.sin(tpmAngle / NormalAngel * Math.PI);
        res.placeOfBirth.y += Math.cos(tpmAngle / NormalAngel * Math.PI);
        if(res.angle != undefined){
            ui_gun.angle      = res.angle;
        }
        if(res.bulletId == undefined){
            res.bulletId = Number(this.logic.seatNum+Date.now());
        }
        let playerInfo;
        let currentUid;
        if (isMe){
            currentUid = Number(glGame.user.userID);
            playerInfo = this.logic.playerInfo[currentUid];
        }else{
            currentUid = Number(res.uid);
            playerInfo = this.logic.playerInfo[currentUid];
        }
        let isHaveLaser       = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Laser;      // 龙息
        let isHaveMissile     = playerInfo.hitMax != null       && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Missile;    // 仙剑
        let isHavePartialBomb = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.PartialBomb;// 炎爆
        let isHaveLightning   = playerInfo.cannonAmount != null && playerInfo.cannonAmount > 0 && playerInfo.cannonType == CONST.CannonType.Lightning;  // 闪电
        if (!isMe){//其他玩家
            isHaveLaser = false;
            isHaveMissile = false;
            isHavePartialBomb = false;
            isHaveLightning = false;
            switch (res.cannonType) {
                case CONST.CannonType.Laser :
                    isHaveLaser = true;
                    break;
                case CONST.CannonType.Missile :
                    isHaveMissile = true;
                    break;
                case CONST.CannonType.PartialBomb :
                    isHavePartialBomb = true;
                    break;
                case CONST.CannonType.Lightning :
                    isHaveLightning = true;
                    break;
            }
            this.logic["lastBullteType"+res.seatNum] = res.cannonType;
        }else{
            this.logic["lastBullteType"+res.seatNum] = playerInfo.cannonType;
        }
        res.isHaveMissile     = false;
        res.isHavePartialBomb = false;
        res.isHaveLightning   = false;
        if(!offLine){
            res.cannonType    =  CONST.CannonType.Normal;//先给一个普通的标签
        }
        if(offLine && res.cannonType == CONST.CannonType.Missile){//仙剑断线重连特殊处理
            cc.error(">> 仙剑断线重连特殊处理 ========= ",res)
            isHaveMissile = true;
            this.logic["lastBullteType"+res.seatNum] = CONST.CannonType.Missile;
            if(isMe){
                this.logic.currentBullteType = CONST.CannonType.Missile;//刷新限制
            }
        }
        let op        =  CONST.CannonOpention.Normal;
        let dataAngle = res.angle ? res.angle : ui_gun.angle;
        if(dataAngle == undefined){
            dataAngle = oldAngle;
        }
        //->判断是否有 特殊炮弹 如果有就优先发射 特殊炮弹
        if(playerInfo != null){//找不到用户信息 就无法发射子弹
            if(isHaveLaser){//龙溪炮弹 发射逻辑
                if(isMe && offLine){//如果是我自己，如果是断线重连
                    cc.error(">>断线重连 不发射 龙溪 ")
                    return;
                }
                if(isMe && this.logic.currentBullteType != CONST.CannonType.Not){
                    cc.error(">>非法发射龙溪子弹")
                    return;
                }
                if(isMe){
                    this.logic.currentBullteType = playerInfo.cannonType;
                    this.logic.isFireLaser = true;
                    let CD = CONST.MaximumBulletCollisionTime;
                    if(playerInfo.cannonAmount == 1){
                        CD+=0.4;
                    }
                    //发出去的子弹不一定能有鱼碰撞，需要手动恢复
                    this.scheduleOnce(()=>{
                        this.logic.isFireLaser = false;
                        if(this.logic.currentBullteType != CONST.CannonType.Not && this.logic.currentBullteType == CONST.CannonType.Laser){
                            this.logic.currentBullteType = CONST.CannonType.Not;
                            // cc.error("======== delete ========= 炮弹 uid "+Number(res.seatNum))
                            glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool,res.seatNum);
                        }
                    },CD);
                }
                this.logic.specialBulletPool[res.seatNum] = res.cannonType;//根据规则：每个玩家同屏下只允许有一个特殊子弹
                glGame.emitter.emit(CONST.clientEvent.fishSound,"LaserSend");
                glGame.emitter.emit(CONST.clientEvent.onLaserDispath,{seatNum:res.seatNum,angle:dataAngle,uid:currentUid});
                //龙溪不发射实体子弹，显示激光柱即可
                glGame.emitter.emit(CONST.clientEvent.playFiringEffect,{seatNum:res.seatNum,gunLevel:res.gunLevel,gunType:playerInfo.cannonType});
                if(playerInfo.cannonAmount == 0){
                    let lastCammpmType = Number("" + this.logic.playerInfo[currentUid].cannonType);//记录老的炮台类型
                    this.logic.playerInfo[currentUid].cannonType = CONST.CannonType.Normal;
                    glGame.emitter.emit(CONST.clientEvent.restoreCannon,{uid:currentUid,isNow:true,lastCammpmType:lastCammpmType});
                }else{
                    glGame.emitter.emit(CONST.clientEvent.upSpecialGunCoin, {seatNum:res.seatNum,cannonLevel:playerInfo.cannonAmount});
                }
                if(playerInfo.cannonAmount > 0)glGame.emitter.emit(CONST.clientEvent.accumulate,{seatNum:res.seatNum,cannonType:res.cannonType});

                if(isMe){
                    this.logic.curWaitTime = Date.now();//重置时间
                    glGame.emitter.emit(CONST.clientEvent.fireSettingRecoil,{angle:res.angle,gunType:res.gunType});
                }
                return;
            }
            let isNeedSend = false;
            if(isHaveMissile){//仙剑 发射前赋值
                if(!offLine){//如果是我自己，如果是断线重连
                    res.cannonType  = CONST.CannonType.Missile;
                    res.hitMax      = Number(playerInfo.hitMax + "");// 仙剑最大击中鱼数量(数据拷贝赋值)
                }
                op         = CONST.CannonOpention.Missile;
                isNeedSend = true;
                if(playerInfo.cannonAmount > 0)glGame.emitter.emit(CONST.clientEvent.accumulate,{seatNum:res.seatNum,cannonType:res.cannonType});
            }
            if(isHaveLightning){//闪电 发射前赋值
                if(!offLine){//如果是断线重连
                    res.cannonType  =  CONST.CannonType.Lightning;
                }
                isNeedSend      = true;
                op              = CONST.CannonOpention.Lightning;
                if(playerInfo.cannonAmount > 0)glGame.emitter.emit(CONST.clientEvent.accumulate,{seatNum:res.seatNum,cannonType:res.cannonType});
                if(isMe){
                    glGame.emitter.emit(CONST.clientEvent.fishSound,"lightningDispath");//闪电发射
                }
            }
            if(isHavePartialBomb){//炎爆 发射前赋值
                if(!offLine){//如果是断线重连
                    res.cannonType  =  CONST.CannonType.PartialBomb;
                }
                isNeedSend = true;
                op              = CONST.CannonOpention.PartialBomb;
                glGame.emitter.emit(CONST.clientEvent.fishSound,"PartialSend");
                if(playerInfo.cannonAmount > 0)glGame.emitter.emit(CONST.clientEvent.accumulate,{seatNum:res.seatNum,cannonType:res.cannonType});
            }
            if(isNeedSend){
                //特殊炮弹 数量更新
                if(playerInfo.cannonAmount == 0){
                    let lastCammpmType = Number("" + this.logic.playerInfo[currentUid].cannonType);//记录老的炮台类型
                    this.logic.playerInfo[currentUid].cannonType = CONST.CannonType.Normal;
                    glGame.emitter.emit(CONST.clientEvent.restoreCannon,{uid:currentUid,isNow:true,lastCammpmType:lastCammpmType});
                }else{
                    glGame.emitter.emit(CONST.clientEvent.upSpecialGunCoin, {seatNum:res.seatNum,cannonLevel:playerInfo.cannonAmount});
                }
            }
            //这是一个 子弹 可能是 普通的 可能是 特殊子弹的三个之一
            let bullet = cc.instantiate(this.fish_Bullet);
            let script = bullet.getComponent("nfish_Bullet");
            this.ui_physicalPool.addChild(bullet);
            if(isHaveMissile || isHavePartialBomb || isHaveLightning) {//自己的 特殊子计数
                this.logic.specialBulletPool[res.seatNum] = res.cannonType;//根据规则：每个玩家同屏下只允许有一个特殊子弹
            }
            if(isMe){
                res.uid = glGame.user.userID;
                if(isHaveMissile || isHavePartialBomb || isHaveLightning){//自己的 特殊子计数
                    this.logic.currentBullteType = res.cannonType;
                }else{//自己的 普通子弹计数
                    this.logic.bullteNum ++;
                }

                if(this.logic.currentBullteType == CONST.CannonType.PartialBomb || this.logic.currentBullteType == CONST.CannonType.Lightning){//定时 解锁发射锁定 炎爆 、闪电
                    const ReTime = 1;
                    this.scheduleOnce(()=>{
                        this.logic.currentBullteType = CONST.CannonType.Not;
                    },ReTime);
                }
            }
            glGame.emitter.emit(CONST.clientEvent.playFiringEffect,{seatNum:res.seatNum,gunLevel:res.gunLevel,gunType:res.cannonType});//开炮效果
            script.initBulletAtlas(isHaveMissile ? this.missilBullet_Atlas : this.bullet_Atlas);//初始化子弹图片资源

            if(isMe){
                this.logic.curWaitTime = Date.now();//重置时间
                glGame.emitter.emit(CONST.clientEvent.fireSettingRecoil,{angle:res.angle,gunType:res.gunType});
            }

            script.initBullet(res,offLine);//子弹开始运动
            if(bullet.lock != null){
                this.lockBulletList.push(bullet);//辅助 解锁 存储
            }
            if(isMe && !offLine){//只管自己的正常子弹发射发送协议 ，无权替别人的子弹发发送发射协议 走断连协议的子弹不再发 发射协议
                glGame.emitter.emit(CONST.clientEvent.hiddenLocationTip);
                //发送 射击
                let data = {
                    "op":op,
                    "angle": dataAngle
                };
                if(op == CONST.CannonOpention.Normal){
                    data["shellId"] = res.bulletId;
                }else{
                    cc.log(">>发射特殊子弹 发射协议 :",data)
                }
                if(res.lock != null){
                    data["fishId"] = res.lock;
                }
                if(this.logic.isEnterRoom){
                    glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),data);//是自己就发送 射击
                }
            }
        }
    },
    //获取炮的朝向：炮口到目标鱼的角度
    getTargetFishAngle(key,seatNum){
        let fish = this.ui_physicalPool.getChildByName(""+key);
        if(fish){
            let startPos = this.ui_physicalPool.getChildByName("ui_gun"+seatNum).position;
            return this.logic.getP1ToP2Angle(startPos,fish.position);
        }else{
            return null;
        }
    },
    //鱼的死亡
    onKillFishHandler(res){
        const Not = -1;//无人座位
        let fish = this.ui_physicalPool.getChildByName(""+res.fishId);
        //销毁锁定的鱼
        if(fish != null){
            if(this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(fish.name)){
                //cc.error(">> 解锁 1 "+this.logic.lockFishID)
                this.logic.lastLockFishID = Number(this.logic.lockFishID+"");
                this.logic.lockFishID = null;
                this.logic.lockFishIndex = null;
                if(this.logic.isLockAutoChange == false){
                    this.logic.isAuto = false;
                    glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
                }
            }
        }
        if(fish && fish._components != undefined && fish.getComponent("nfish_Unit")) {
            if (this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(res.fishId)) {
                this.ui_LockCantainer.getChildByName("ui_Lock" + this.logic.seatNum).active = false;
            }

            if(res.fishTypeId != null && res.fishTypeId == CONST.BossGodOfWealth){//财神死亡方式是快速移动出屏外
                fish.getComponent("nfish_Unit").quickDie(false);
                //解锁
                if (this.logic.lockFishID != null && Number(this.logic.lockFishID) == Number(res.fishId)) {

                    this.logic.lastLockFishID = Number(this.logic.lockFishID+"");
                    this.logic.lockFishID = null;
                    this.logic.lockFishIndex = null;
                    glGame.emitter.emit(CONST.clientEvent.disposeFishNode,res.fishId);
                    if(this.logic.isLockAutoChange == false){
                        this.logic.isAuto = false;
                        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
                    }

                    this.ui_LockCantainer.getChildByName("ui_Lock" + this.logic.seatNum).active = false;
                }
            }else{
                let type = res.killType == CONST.CannonType.Lightning ? CONST.dieType3 : CONST.dieType1;
                fish.getComponent("nfish_Unit").death(type,res.seatNum ? res.seatNum : Not,res.delayDieTime);
            }
        }else {
            glGame.emitter.emit(CONST.clientEvent.disposeFishNode,res.fishId);
            console.warn("鱼的死亡>>找不到鱼",res,"  fishNodeList ",this.fishNodeList," fishPoolData ",this.logic.fishPoolData);
        }
    },
    //检查背景音乐播放
    checkBgMusicHandler(){
        let currBgMusicIndex = -1;
        for (let fishId in this.fishNodeList){
            let item = this.fishNodeList[fishId];
            let fish = this.ui_physicalPool.getChildByName(""+fishId);
            if(fish != null){
                let fishTypeId = Number(item.fishTypeId);
                if(fishTypeId == CONST.BossLavaBasalt){//仍有 熔岩玄武
                    currBgMusicIndex = CONST.BossLavaBasaltBgMusic;
                }
                if(fishTypeId == CONST.BossSYLW){//仍有 深渊龙王
                    currBgMusicIndex = CONST.BossSYLWBgMusic;
                }
                if(fishTypeId == CONST.BossGodOfWealth && fish._components != undefined && fish.getComponent("nfish_Unit") != undefined && fish.getComponent("nfish_Unit").isWellDie()){//仍有 财神
                    currBgMusicIndex = CONST.BossGodOfWealthBgMusic;
                }
            }
        }
        switch (currBgMusicIndex) {
            case -1 :
                glGame.emitter.emit(CONST.clientEvent.fishBgSound);//播放 春夏秋冬
                break;
            case CONST.BossLavaBasaltBgMusic :
                glGame.emitter.emit(CONST.clientEvent.fishBgSound,CONST.BossLavaBasaltBgMusic);//播放 熔岩玄武 背景声音
                break;
            case CONST.BossSYLWBgMusic :
                glGame.emitter.emit(CONST.clientEvent.fishBgSound,CONST.BossSYLWBgMusic);//播放 深渊龙王 背景声音
                break;
            case CONST.BossGodOfWealthBgMusic :
                glGame.emitter.emit(CONST.clientEvent.fishBgSound,CONST.BossGodOfWealthBgMusic);//播放 财神 背景声音
                break;
        }
    },
    //加鱼
    addFishPoolHandler(res){
        if(this.logic.quickMove){
            cc.error("加鱼失败，正在初始化鱼潮")
            return;
        }
        this.initFishData(res);
    },
    //加鱼潮
    addFishTideHandler(res){
        if(this.logic.quickMove){
            cc.error("加鱼潮失败，鱼潮处理中")
            return;
        }
        let tmpArray = [];
        for (let id in res) {
            tmpArray.push(res[id]);
        }
        let i = 0;
        const len = Number(tmpArray.length+"") - 1;
        this.schedule(()=>{
            for (let j=0;j<10;j++){
                if(tmpArray[i] != null){
                    this.initFishData(tmpArray[i]);
                    i++;
                }
            }
        },0.01,len);


    },
    //初始化渔场
    initFishPoolHandler(){
        if(this.logic.quickMove){
            cc.error("初始化渔场 遇到问题 ： 正在初始化鱼潮，无法初始化")
            return;
        }
        for (let id in this.logic.fishPoolData) {
            let fishSetverData = this.logic.fishPoolData[id];
            if(fishSetverData.used == undefined){
                fishSetverData.used = Number(id + "");
                this.initFishData(this.logic.fishPoolData[Number(id)]);
            }
        }
    },
    //初始化 鱼 数据
    initFishData(fishData){
        if(this.logic.quickMove){
            cc.error("正在初始化鱼潮 稍等")
            return;
        }
        const ToScond = 1000;
        let serverTime = fishData.serverTime == undefined ? this.logic.serverTime : fishData.serverTime;
        let time = (serverTime - fishData.createTime)/ToScond;//出生时间 默认 0 断线重连 可能是 2或5或别的
        let runTime = fishData.runTime;//鱼的总运行时间
        if(time < (fishData.showTime + runTime)){
            this.createFish(fishData);
        }else{
            // cc.warn("无法出生 id ",fishData.id," 出生时间 ",time," serverTime ",fishData.serverTime," createTime ",fishData.createTime," 运行时间 ",runTime," 显示时间 ",fishData.showTime,"data:",fishData)
        }
    },
    //鱼工厂：实例化一条鱼
    createFish(fishData){
        let fishNode = cc.instantiate(this.fish_Unit);
        fishNode.parent = null;
        fishNode.active = true;
        fishNode.isFish = true;
        this.fishNodeList[Number(fishData.id + "")] = JSON.parse(JSON.stringify(fishData));//数据拷贝
        this.fishNodeListLenght ++;
        this.ui_physicalPool.addChild(fishNode);
        fishNode.getComponent("nfish_Unit").initAtlas(this.fish_AtlaLists);
        fishNode.getComponent("nfish_Unit").initFish(fishData);
    },
    //刷新冰冻状态 有就冻结 没有就解冻
    updateIcing(){
        for (let id in this.fishNodeList){
            let fish = this.ui_physicalPool.getChildByName(""+id);
            if(fish)fish.getComponent("nfish_Unit").settingIcing(this.startRunFish);
        }
        if(this.startRunFish){
            this._time = Date.now();
        }
    },
    //锁定鱼
    lockSelfFishHandler(fishId){
        let firstNode = this.ui_physicalPool.getChildByName(`${fishId}`);
        if(firstNode != null && firstNode._components != undefined && firstNode.getComponent("nfish_Unit") != null){
            firstNode.getComponent("nfish_Unit").lockSelf();
        }
    },
    //浪潮鱼群来了，加速死亡
    seaWaveFishGroupHandler(msg){
        glGame.emitter.emit(CONST.clientEvent.showFishTideTitle);
        const NotHaveFish = -1;
        glGame.emitter.emit(CONST.clientEvent.fishSound,"tideComin");//鱼潮来袭使用
        let next = ()=>{
            glGame.emitter.emit(CONST.clientEvent.seaWaveChangeBg,this.logic.bgIndex);
            glGame.emitter.emit(CONST.clientEvent.onSurfStart);
            this.logic.startFire = true;
            let fishLenth = this.ui_physicalPool.childrenCount;
            for (let i=0;i<fishLenth;i++){
                let currNode = this.ui_physicalPool.children[i];
                if(currNode != null){
                    let fish_Unit = currNode.getComponent("nfish_Unit");
                    if(fish_Unit != null && fish_Unit.getFishID() != null){
                        if(this.logic.bossIDList.indexOf(Number(currNode.name)) == NotHaveFish)////除了boss不删除 其余都删除
                        {
                            this.ui_physicalPool.removeChild(currNode);
                            currNode.destroy();
                        }
                    }else if(currNode.isFish != null && this.logic.bossIDList.indexOf(Number(currNode.name)) == NotHaveFish){////除了boss不删除 其余都删除
                        this.ui_physicalPool.removeChild(currNode);
                        currNode.destroy();
                    }
                }
            }
            this.logic.specialFishListBorn = {};
            this.logic.addTide(msg,msg.groupId);
            this.logic.quickMove = false;
            glGame.emitter.emit(CONST.clientEvent.addFishTide,this.logic.fishPoolData);
            glGame.emitter.emit(CONST.clientEvent.hideBossConinUI);
        }

        const MaxUserNum = 4;
        for (let i = 0; i < MaxUserNum; i++) {
            let ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock" + i);
            ui_lock.active = false;
        }
        const SeaWaveRunTime = 3;
        this.scheduleOnce(next,SeaWaveRunTime);

        this.logic.startFire = false;
        this.logic.quickMove = true;
        //除了boss不删除 其余都删除
        for (let id in this.fishNodeList){
            if(this.logic.bossIDList.indexOf(id) == -1){
                delete this.fishNodeList[id];
                this.fishNodeListLenght --;
            }
        }
        this.logic.fishPoolData = {};
        let fishLenth = this.ui_physicalPool.childrenCount;
        for (let i=0;i<fishLenth;i++){
            let fish_Unit = this.ui_physicalPool.children[i].getComponent("nfish_Unit");
            if(fish_Unit != null && fish_Unit.getFishID() != null && this.logic.bossIDList.indexOf(fish_Unit.getFishID()) == NotHaveFish){////除了boss不删除 其余都删除
                fish_Unit.getComponent("nfish_Unit").quickDie();
            }
        }
    },
    //删除一条鱼 id Number 类型
    disposeFishNodeHandler(id){
        let fData = this.fishNodeList[Number(id)];
        if(fData != null){
            delete this.fishNodeList[Number(id)];
            this.fishNodeListLenght --;
        }else{
            let tmpfish = this.ui_physicalPool.getChildByName(""+id);
            if(tmpfish){
                tmpfish.destroy();
            }
        }
        if(this.logic != null && this.logic.fishPoolData != null && this.logic.fishPoolData.hasOwnProperty(Number(id))){
            delete this.logic.fishPoolData[Number(id)];
        }
        glGame.emitter.emit(CONST.clientEvent.checkBgMusic);
    },
    //冰冻 - 开始 - 结束
    onFreezeStartStopHandler(){
        this.startRunFish = !this.logic.isInFreeze;
        this.updateIcing();
    },
    //游戏循环体
    update(dt){
        if(!this.logic.startFire){
            return;
        }
        this.checkShoot(dt);
        this.unLockFish(dt);
        if(!this.logic.quickMove && this.logic.isLock && this.logic.lockFishID == null && this.logic.isLockAutoChange){
            let item = this.findFish();
            if(item){
                this.logic.lockFishID = Number(item.id);
                // cc.error(">> 锁定 2  ",this.logic.lockFishID)
                this.logic.isAuto = true;
                glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
            }
        }
        if(this.logic.lockFishID != undefined){
            if(this.logic.quickMove){
                this.logic.lockFishID = null;
            }
            let fish = this.ui_physicalPool.getChildByName(""+this.logic.lockFishID);
            if(fish == null){
                this.logic.lockFishID = null;
            }else{
                const Harf = 2;
                const OffsexX = 10;
                const OffsexY = 10;
                if(((cc.winSize.width/Harf - OffsexX ) - Math.abs(fish.x)) > 0 && ((cc.winSize.height/Harf - OffsexY) - Math.abs(fish.y)) > 0){

                }else{
                    this.logic.lastLockFishID = Number(this.logic.lockFishID+"");
                    this.logic.lockFishID = null;
                    this.logic.lockFishIndex = null;
                    if(this.logic.isLockAutoChange == false){
                        this.logic.isAuto = false;
                        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
                    }
                }
            }
        }
        this.fireTime += dt;
        if(this.fireTime > this.fireTimeFrequency){
            this.fireTime = 0;
            this.isFire = true;
        }
    },
    //解锁与死亡
    unLockFish(dt){
        const MaxUserNum = 4;
        for (let i = 0; i < MaxUserNum; i++) {
            let fish;
            let ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock"+i);
            if(this.logic.seatNum == i){
                if(this.logic.lockFishID != null && this.logic.startFire){
                    fish = this.ui_physicalPool.getChildByName(""+this.logic.lockFishID);
                }else{
                    ui_lock.isPlaySpined = false;
                    ui_lock.active = false;
                }
            }
            if(fish == null){
                ui_lock.active = false;
                ui_lock.isPlaySpined = false;
            }else{
                ui_lock.x = fish.x;
                ui_lock.y = fish.y;
                if(ui_lock.active == false){
                    ui_lock.active = true;
                    if(ui_lock.isPlaySpined == null ||  ui_lock.isPlaySpined == false){
                        ui_lock.isPlaySpined = true;
                        this.playLockSpineHandler(ui_lock);
                    }
                }
            }
        }
    },
    //播放锁定动画
    playLockSpineHandler(lockNode){
        let ui_lock;
        if(lockNode == null){
            ui_lock = this.currentLockUi;
            if(ui_lock)ui_lock.isPlaySpined = true;
        }else{
            ui_lock = lockNode;
        }
        if(ui_lock == undefined){
            ui_lock = this.ui_LockCantainer.getChildByName("ui_Lock"+this.logic.seatNum);
        }
        if(ui_lock.isPlaySpined == null || ui_lock.isPlaySpined == false)return;
        this.currentLockUi = ui_lock;

        this.logic.playSpine(ui_lock.getChildByName("spine"),false,false,CONST.SpineName.LockStart,null,CONST.SpineName.LockIng,true);
    },
    //用户离开 解锁
    leaveRoomUnLockHandler(res){
        this.ui_LockCantainer.getChildByName("ui_Lock"+res.seatNum);
    },
    //寻找一条大鱼
    findFish(){
        let okfishList = [];//符合条件的鱼
        for (let id in this.fishNodeList){
            let fish = this.ui_physicalPool.getChildByName(""+id);
            if(fish != null && fish._components != null && fish.getComponent("nfish_Unit")){
                let isNext = false;
                if(this.logic.lastLockFishID != undefined){
                    if(fish != null && Number(this.logic.lastLockFishID) != Number(fish.name)){
                        isNext = true;
                    }
                }else if(fish != null)
                {
                    isNext = true;
                }
                if(isNext){
                    const Harf = 2;
                    const OffsexX = 100;
                    const OffsexY = 100;
                    if(( (cc.winSize.width/Harf - OffsexX ) - Math.abs(fish.x)) > 0 && ((cc.winSize.height/Harf - OffsexY) - Math.abs(fish.y)) > 0){
                        let priority = 0;
                        if(this.logic.fishPoolData[Number(id)] != null){
                            let fishTypeId = this.logic.fishPoolData[Number(id)].fishTypeId;
                            priority = this.logic.json_fishTable[fishTypeId+""].priority;
                        }
                        okfishList.push({id:Number(fish.getComponent("nfish_Unit").getFishID()),priority:priority});
                    }
                }
            }
        }
        if(okfishList.length > 0){
            okfishList.sort(function(a, b){
                return b.priority - a.priority;
            })
            return okfishList[0];
        }
        return null;
    },
    //特殊子弹的最后爆炸
    onSpecialBulletExpHandler(res){
        if(!this.logic.isEnterRoom){
            if(res.offLine != null){//如果是断线重
                this.logic.offLineMissileData = res;
            }
            return;
        }
        let op;
        if(res.cannonType == CONST.CannonType.PartialBomb){
            op = CONST.CannonOpention.PartialBombHit;
            glGame.emitter.emit(CONST.clientEvent.fishSound,"PartialBomb");
        }
        if(res.cannonType == CONST.CannonType.Missile){
            op = CONST.CannonOpention.MissileHit;
        }
        if(res.cannonType == CONST.CannonType.Lightning){
            op = CONST.CannonOpention.LightningHit;
        }
        let killFishData =  this.getFishByRange(res.pos,res.cannonType);
        if(res.cannonType == CONST.CannonType.Lightning){
            this.runLightningEffect(res,killFishData.killFishList);
        }
        let killFishList =  killFishData.killFishList;
        let posList =  killFishData.posList;
        if(killFishList.length > 0){
            if(res.cannonType == CONST.CannonType.PartialBomb){
                this.creatpartialBombEffect(res.pos);
            }else if(res.cannonType == CONST.CannonType.Missile){
                //仙剑爆炸效果
                this.creatoMissil(res.pos,killFishList.length+10);
                //协议要求添加至少2个0
                killFishList.push(0);
                killFishList.push(0);
            }
            let pos = null;
            if(res.cannonType == CONST.CannonType.Missile){
                pos = res.pos;
            }
            this.sendHitFishData(op,killFishList,res.uid,res.pos);
        }else{
            if(res.cannonType == CONST.CannonType.Missile){
                killFishList = [0,0];
                this.sendHitFishData(op,killFishList,res.uid,res.pos);
            }
            //仙剑的最后爆炸是一个特效 然后 半径则是 特效的宽度 并不是多个spine 播放
            if(res.cannonType == CONST.CannonType.PartialBomb){
                this.creatpartialBombEffect(res.pos);
            }else if(res.cannonType == CONST.CannonType.Missile){
                this.creatoMissil(res.pos,10);
            }
        }
    },
    //创建仙剑
    creatoMissil(pos,num){
        const Harf             = 50;
        const EffectOffsexX    = 100;
        const EffectOffsexY    = 100;
        const EffectPosOffsexX = 200;
        const EffectPosOffsexY = 200;
        for (let i=0;i<num;i++){
            let Xdirection = Math.random() * EffectOffsexX > Harf ? 1: -1;
            let Ydirection = Math.random() * EffectOffsexY > Harf ? 1: -1;
            this.creatBoomEffect(cc.v2(pos.x + (Math.random() * EffectPosOffsexX * Xdirection),pos.y + (Math.random() * EffectPosOffsexY * Ydirection)));
        }
    },
    //特殊子弹 仙剑炸弹、闪电、炎爆炸弹 的碰撞 协议
    sendHitFishData(op,killFishList,uid,pos){
        let hitFishData = {
            "op":op,
            "fishIds": killFishList
        };
        if(Number(uid) != glGame.user.userID){
            hitFishData["uid"] = uid;
            cc.log(">> 其他人 特殊子弹的碰撞 : ",hitFishData);
        }
        if(pos != null){
            hitFishData["pos"] = {x:pos.x,y:pos.y};
        }else{
            hitFishData["pos"] = {x:0,y:0};
        }
        if(this.logic.isEnterRoom){
            cc.log("--==-->发送 特殊子弹 仙剑炸弹、闪电、炎爆炸弹 的碰撞 ",hitFishData);
            // cc.error("======== 发送特殊子弹的碰撞 ",hitFishData)
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),hitFishData);//子弹碰撞
        }
    },
    //设置旋转
    changeCantainerHandler(){
        cc.warn(">> 角度旋转180  changeCantainerHandler")
        this.logic.isNeedSet180Angle(this.node);
    },
    //熔岩玄武 全屏爆炸
    onSpecialBombHandler(res){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"rongYanBossBoom");//熔岩玄武爆炸
        if(this.logic.seatNum == Number(res.seatNum)) {
            glGame.emitter.emit(CONST.clientEvent.fishSound, "rongYanBossDie");//熔岩玄武死亡
        }
        if(res.fishTypeId == CONST.BossLavaBasalt){
            let fish = this.ui_physicalPool.getChildByName(""+res.fishId);
            if (fish) {
                this.creatRongYanBoomEffect(fish.position);
            }
        }
    },
    //创建一个炸弹动画效果，传入一个坐标
    creatBoomEffect(pos){
        let missileEffect    = cc.instantiate(this.node.getChildByName("missileEffect"));
        missileEffect.active = true;
        missileEffect.opacity = 0;
        missileEffect.zIndex = CONST.nodeZIndex.zIndexAni;
        if(this.logic.getIsRotation()){
            missileEffect.angle = 180;
        }
        this.ui_physicalPool.addChild(missileEffect);
        missileEffect.position = pos;
        missileEffect.runAction(cc.sequence(cc.delayTime(Math.random()),cc.callFunc(()=>{
            missileEffect.opacity = 255;
            this.logic.playSpine(missileEffect,false,false,CONST.SpineName.Normal,()=>{
                missileEffect.destroy();
            });
        })));
    },
    //创建一个熔岩玄武炸弹
    creatRongYanBoomEffect(pos){
        let specialBoomEffect = cc.instantiate(this.node.getChildByName("spine_RongYan"));
        specialBoomEffect.active   = true;
        specialBoomEffect.position = pos;
        this.ui_physicalPool.addChild(specialBoomEffect);
        this.logic.playSpine(specialBoomEffect,false,false,CONST.SpineName.Normal,()=>{
            specialBoomEffect.destroy();
            glGame.emitter.emit(CONST.clientEvent.checkBgMusic);
        });
    },
    //创建一个 炎爆炸弹动爆炸画效果 pos 爆炸中心点
    creatpartialBombEffect(pos){
        let specialBoomEffect = cc.instantiate(this.partialBombEffect);
        specialBoomEffect.position = pos;
        this.ui_physicalPool.addChild(specialBoomEffect);
        this.logic.playSpine(specialBoomEffect,false,false,CONST.SpineName.Normal,()=>{
            specialBoomEffect.destroy();
        });
    },
    //播放闪电效果
    runLightningEffect(res,killFishArr){
        let myid = glGame.user.userID;
        if(res.uid == myid){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"lightningHit");//闪电击中鱼
        }
        let len = killFishArr.length;
        let nextFishPos = {};
        const Gap = 0.1;
        for (let i = 0; i < len; i++) {
            let fishID         = killFishArr[i];
            let next_fishID    = killFishArr[i+1];
            let fishNode = this.ui_physicalPool.getChildByName(""+fishID);
            if(fishNode == null)continue;
            let next_fishNode = null;
            if(next_fishID != null) {
                next_fishNode = this.ui_physicalPool.getChildByName(""+next_fishID);
            }
            if (next_fishNode) {
                nextFishPos.pos         = next_fishNode.position;
                nextFishPos.no          = next_fishNode.no;
            }
            let mag = 0;
            if(next_fishNode){
                let specialEffect       = this.logic.creatorEffect();
                specialEffect.parent    = null;
                specialEffect.active    = true;
                specialEffect.name      = "lightning_"+i;
                specialEffect.zIndex    = CONST.nodeZIndex.zIndexAllBoom + i;
                this.ui_physicalPool.addChild(specialEffect);
                let temp                = fishNode.position.sub(nextFishPos.pos);
                specialEffect.anchorX   = 0;
                specialEffect.x         = fishNode.x;
                specialEffect.y         = fishNode.y;
                specialEffect.angle     = this.logic.setAngle(nextFishPos.pos.x,nextFishPos.pos.y,fishNode.position.x,fishNode.position.y);
                mag = temp.mag();//距离
                let scale = mag/CONST.LightningW;
                let h = scale*CONST.LightningH;
                specialEffect.width = mag;
                let endH = h > CONST.LightningH ? CONST.LightningH : h;
                // cc.error(">> 闪电宽度 ",w," 高度 ",endH)
                specialEffect.height = CONST.LightningH;
                // specialEffect.height = CONST.LightningH;
                const EffectImage    = "img_shandian";
                const Begin          = 1;
                const End            = 8;
                const Loop           = 1;
                const IsHaveZero     = false;
                const Speed          = 0.12;
                const PlayedRemove   = true;
                specialEffect.getComponent("nfish_MovieClip").initEffect(this.explosionAndLightning_Atlas,EffectImage,Begin,End,Loop,IsHaveZero,Speed,PlayedRemove,null,0,mag,h,i*Gap);
            }
            this.creatEffectBluePointLight(fishNode.x,fishNode.y,i,i*Gap,mag);
        }
    },
    //创建一个 蓝光闪现 动画
    creatEffectBluePointLight(x,y,i,mag){
        let specialEffect  = this.logic.creatorEffect();
        specialEffect.parent = null;
        specialEffect.active = true;
        if(mag > cc.winSize.height/3 && mag < cc.winSize.height/2){
            specialEffect.scale  = 5.8;
        }else if(mag > cc.winSize.height/2 && mag < cc.winSize.height){
            specialEffect.scale  = 6.8;
        }else{
            specialEffect.scale  = 4.5;
        }
        specialEffect.zIndex = CONST.nodeZIndex.zIndexAni + i*3;
        this.ui_physicalPool.addChild(specialEffect);
        specialEffect.x = x;
        specialEffect.y = y;

        const EffectImage  = "img_shandian_ball";
        const Begin        = 1;
        const End          = 7;
        const Loop         = 2;
        const IsHaveZero   = false;
        const Speed        = 0.072;
        const PlayedRemove = true;
        specialEffect.getComponent("nfish_MovieClip").initEffect(this.explosionAndLightning_Atlas,EffectImage,Begin,End,Loop,IsHaveZero,Speed,PlayedRemove);
    },
    //获取金币
    getCoin(res){
        let rewardGold  = Math.floor(res.rewardGold / res.killFishArr.length);
        let tmpList = [];
        for (let i = 0; i < res.killFishArr.length; i++) {
            let fishKey = res.killFishArr[i].fishLineID;
            let fishNode = this.ui_physicalPool.getChildByName(""+fishKey);
            if(fishNode){
                let item         = {};
                item.rewardGold  = rewardGold;
                item.seatNum     = res.seatNum;
                item.uid         = res.uid;
                item.position    = fishNode.position;
                item.multiple    = this.logic.getRandomNum(0,100);
                tmpList.push(item);
            }
        }
        const GetRunCoinTime = 1;
        this.scheduleOnce(()=>{
            for (let i = 0; i < tmpList.length; i++) {
                glGame.emitter.emit(CONST.clientEvent.playCoinEffect,tmpList[i]);
            }
        },GetRunCoinTime);
    },
    //获取id鱼的范围内的鱼
    getFishByRange(pos,cannonType) {
        if(!this.logic.isEnterRoom){
            return;
        }
        let killFishList = [];
        let posList = [];
        let radius = 0;
        if(cannonType == CONST.CannonType.Lightning){
            posList.push(pos);
            radius =  Number(this.logic.roomRule.LightningRadius);// 闪电炮弹产生的连锁闪电的连锁目标半径范围（单位：像素）
        }
        if(cannonType == CONST.CannonType.PartialBomb){
            posList.push(pos);
            radius =  Number(this.logic.roomRule.ExplodeRadius);// 炎爆炮弹的爆炸效果半径范围（单位：像素）
        }
        if(cannonType == CONST.CannonType.Missile){
            radius =  Number(this.logic.roomRule.ExcaliburRadius);// 仙剑爆炸时的爆炸半径范围（单位：像素）
        }
        const All = 100;
        const Haf = 50;
        for (let id in this.fishNodeList) {
            let fish = this.ui_physicalPool.getChildByName(""+id);
            if (fish && Math.abs(fish.x) < cc.winSize.width/2 && Math.abs(fish.y) < cc.winSize.height/2) {
                let curr = Math.random() * All;
                let fishUnit = fish.getComponent("nfish_Unit");
                if(fishUnit){
                    let dis = this.getDistanceTwoPoint(pos, fish);//计算距离
                    if(cannonType == CONST.CannonType.Lightning){
                        if (curr < Haf && posList.length <= Number(this.logic.roomRule.LightningMaxFish)) {
                            killFishList.push(fishUnit.getFishID());
                            posList.push(cc.v2(fish.x,fish.y));
                        }
                    }else{
                        if (dis <= radius) {
                            killFishList.push(fishUnit.getFishID());
                            posList.push(cc.v2(fish.x,fish.y));
                        }
                    }
                }
            }
        }
        return {killFishList:killFishList,posList:posList};
    },
    //计算距离
    getDistanceTwoPoint(node1, node2) {
        const OffsexY = 2;
        return Math.sqrt(Math.pow(node1.x - node2.x, OffsexY) + Math.pow(node1.y - node2.y, OffsexY))
    },
    //点击所有按钮
    onClick(name, node){
        switch(name){
            case "ui_bg":return this.menuOptionViewHandler();
            default: console.error("no find button name -> %s", name);
        }
    },
    //打开
    menuOptionViewHandler(res){
        this.node.active = true;
    },
    //锁定
    useAutoSkillHandler(){
        const LockTime = 0.2;
        this.autoShootTime = LockTime;
    },
    //震动 - 通用震动库
    onShockHandler(){
        if(this.isSshockIng)return;
        const SshockTime = 0.8;
        this.isSshockIng = true;
        this.oldPos = this.node.position;
        this.node.getComponent(cc.Widget).enabled = false;
        this.node.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.02, cc.v2(this.oldPos.x+5, this.oldPos.y+7)), cc.moveTo(0.02, cc.v2(this.oldPos.x-6, this.oldPos.y+7)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-13, this.oldPos.y+3)), cc.moveTo(0.02, cc.v2(this.oldPos.x+3, this.oldPos.y-6)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-5, this.oldPos.y+5)), cc.moveTo(0.02, cc.v2(this.oldPos.x+2, this.oldPos.y-8)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-8, this.oldPos.y-10)), cc.moveTo(0.02, cc.v2(this.oldPos.x+3, this.oldPos.y+10)),    cc.moveTo(0.02, cc.v2(this.oldPos.x+0, this.oldPos.y+0)))));
        this.scheduleOnce(() => {
            this.node.stopAllActions();
            this.node.setPosition(this.oldPos);
            this.node.getComponent(cc.Widget).enabled = true;
            this.isSshockIng = false;
        }, SshockTime);
    },
    //销毁
    OnDestroy() {
        this.unscheduleAllCallbacks();
        this.unregisterEvent();
        this.fishNodeList    = null;
        this.fishNodeListLenght = 0;
        this.startRunFish    = false;
        this.logic           = null;
        this.ui_physicalPool = null;
    },
});
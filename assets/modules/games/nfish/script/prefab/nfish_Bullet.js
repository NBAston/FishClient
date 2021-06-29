/***
 *  捕鱼：子弹
 * **/
let CONST = require("nfishConst");
glGame.baseclass.extend({
    onLoad () {
        this.logic       = require("nfishlogic").getInstance();//数据中心
        this.data        = null;
        this.isInit      = false;
        this.speed       = 1500; //子弹速度
        this.leftBorder  = 0;    //左边界
        this.rightBorder = 0;    //右边界
        this.topBorder   = 0;    //上边界
        this.downBorder  = 0;    //下边界
        this.lockCollder = 1;
        this.unLockTime  = 0;
        this.leftCollisionTimes     = 0;//防止卡边计数器
        this.buttomeCollisionTimes  = 0;//防止卡边计数器
        this.rightCollisionTimes    = 0;//防止卡边计数器
        this.topCollisionTimes      = 0;//防止卡边计数器
        this.moveEndTimeBoom        = 0;//仙剑移动爆炸
        this.fish_Atlas             = null;//子弹 图集
        this.lockStatusTime         = 0;//带锁定属性的存活时间
        this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;
        this.missile                = false;//是否是仙剑，如果是那么播放帧动画
        this.missileFrequency       = 0.009;
        this.missileTime            = 0;
        this.missilePre             = "missile_";//仙剑 pre
        this.missileIndex           = 0;//仙剑 开始点
        this.missileMaxIndex        = 11;//仙剑 最大点
    },
    //初始化图集
    initBulletAtlas(f){
        this.fish_Atlas             = f;//子弹 图集
    },
    //销毁子弹
    removeBullet(){
        if(this.data.cannonType != CONST.CannonType.Normal){
            if(this.data.cannonType == CONST.CannonType.Missile){//解锁发射锁定   仙剑
                this.logic.currentBullteType = CONST.CannonType.Not;
            }else{
                // cc.error("========= delete ======== 销毁 cannonType "+this.data.cannonType)
                glGame.emitter.emit(CONST.clientEvent.clearSpecialBulletPool,this.data.seatNum);
            }
        }
        //播放仙剑 爆炸
        if(this.data.cannonType == CONST.CannonType.Missile){
            glGame.emitter.emit(CONST.clientEvent.fishSound,"MissileBoom");
            // if(this.logic.specialBulletPool[this.data.seatNum] != null){
            //     cc.warn(">>>>>仙剑 爆炸 "+this.data.seatNum)
            // }
            glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp,{cannonType:Number(this.data.cannonType+""),uid:Number(this.data.uid+""),pos:cc.v2(this.node.position.x,this.node.position.y)});
        }
        this.logic       = null;//数据中心
        this.data        = null;
        this.isInit      = false;
        this.speed       = 0;    //子弹速度
        this.leftBorder  = 0;    //左边界
        this.rightBorder = 0;    //右边界
        this.topBorder   = 0;    //上边界
        this.downBorder  = 0;    //下边界
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.node.destroy();
    },
    initBullet(res,offLine) {
        this.data           = res;
        this.lockCollder    = 1;
        let spr             = this.node.getComponent(cc.Sprite);
        let collider        = this.node.getComponent(cc.BoxCollider);
        this.node.position  = this.data.placeOfBirth;
        this.node.angle     = this.data.angle; //初始化角速度
        let level           = this.data.gunLevel == null ? this.data.cannonLevel : this.data.gunLevel;
        if(level == null || level == 0){
            level = 1;
        }
        this.speed          = 2500;
        if(this.data.cannonType == CONST.CannonType.PartialBomb){
            spr.spriteFrame     = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.PartialBomb);//炎爆专用
        }else if(this.data.cannonType == CONST.CannonType.Missile) {
            spr.spriteFrame     = this.fish_Atlas.getSpriteFrame(this.missilePre+this.missileIndex);//仙剑专用
            this.missile = true;
            const MissileSpeed  = 2750;
            this.speed          = MissileSpeed;
            if(spr.spriteFrame == null){
                cc.error(">>获取仙剑子弹图集失败 key: "+this.missilePre+this.missileIndex);
            }
        }else if(this.data.cannonType == CONST.CannonType.Lightning) {
            spr.spriteFrame     = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.Lightning);//闪电专用
        }else{
            spr.spriteFrame     = this.fish_Atlas.getSpriteFrame(CONST.SpecialBulletSkin.Normal+level);
        }
        if(spr.spriteFrame == null) {
            cc.error("该子弹无法获取到级别，可能 res 结构有误 : ",this.data);
        }else{
            collider.size       = spr.spriteFrame.getOriginalSize();
        }
        collider.tag        =  "bullet_"+this.data.bulletId;
        this.node.name      =  this.data.lock ? this.data.lock+"" : CONST.SpecialBulletSkin.Normal+this.data.seatNum+"_"+collider.tag;
        this.rightBorder    = cc.winSize.width/2;                     //右边界
        this.leftBorder     = -cc.winSize.width/2;                    //左边界
        this.topBorder      = cc.winSize.height/2;                    //上边界
        this.downBorder     = -cc.winSize.height/2;                   //下边界
        let zIndex          = CONST.nodeZIndex.zIndexBullet + this.node.zIndex;
        this.node.zIndex    = zIndex > cc.macro.MAX_ZINDEX ? cc.macro.MAX_ZINDEX -1 : zIndex;
        this.isInit         = true;
        //状态同步
        if(res.serverTime != undefined && res.createTime != undefined){
            let nmpos = cc.v2((cc.winSize.width/2) * Math.random(),(cc.winSize.height/2) * Math.random());
            this.node.setPosition(nmpos);
        }
    },
    //解决卡边重置
    fixSideRunOver(){
        const Width = cc.winSize.width/2;
        const Height = cc.winSize.height/2;
        const MaxAngle = 180;
        const MaxDirectionHALFArg = 100;
        const HALF = 50;
        const DirectionX = (Math.random() * MaxDirectionHALFArg) > HALF ? -1 : 1;
        const DirectionY = (Math.random() * MaxDirectionHALFArg) > HALF ? -1 : 1;
        this.node.x = Math.ceil(Math.random() * Width * DirectionX);
        this.node.y = Math.ceil(Math.random() * Height * DirectionY);
        this.node.angle = Math.ceil(Math.random() * MaxAngle);
    },
    bulletMove(dt){
        //是否在屏幕
        if(this.node.x > this.rightBorder){

            this.leftCollisionTimes     = 0;//重置计数器
            this.buttomeCollisionTimes  = 0;//重置计数器
            this.topCollisionTimes      = 0;//重置计数器

            if(this.rightCollisionTimes > 1){
                this.fixSideRunOver();
                this.rightCollisionTimes=0;
            }
            this.rightCollisionTimes++;

            this.node.angle = -this.node.angle;
        }else if(this.node.x < this.leftBorder){

            this.buttomeCollisionTimes  = 0;//重置计数器
            this.rightCollisionTimes    = 0;//重置计数器
            this.topCollisionTimes      = 0;//重置计数器

            if(this.leftCollisionTimes > 1){
                this.fixSideRunOver();
                this.leftCollisionTimes = 0;
            }
            this.leftCollisionTimes++;

            this.node.angle = -this.node.angle;
        }
        if(this.node.y > this.topBorder){

            this.leftCollisionTimes     = 0;//重置计数器
            this.buttomeCollisionTimes  = 0;//重置计数器
            this.rightCollisionTimes    = 0;//重置计数器

            if(this.topCollisionTimes > 1){
                this.fixSideRunOver();
                this.topCollisionTimes = 0;
            }
            this.topCollisionTimes++;

            this.node.angle = 180-this.node.angle;
        }else if(this.node.y < this.downBorder){

            this.leftCollisionTimes     = 0;//重置计数器
            this.rightCollisionTimes    = 0;//重置计数器
            this.topCollisionTimes      = 0;//重置计数器
            if(this.buttomeCollisionTimes > 1){
                this.fixSideRunOver();
                this.buttomeCollisionTimes = 0;
            }
            this.buttomeCollisionTimes++;

            this.node.angle = 180-this.node.angle;
        }
        this.node.x += dt * this.speed * Math.sin(-this.node.angle / 180 * Math.PI);
        this.node.y += dt * this.speed * Math.cos(-this.node.angle / 180 * Math.PI);
    },
    update(dt){
        this.bulletOnCollisionEnterMaxTime -= dt;
        if(this.bulletOnCollisionEnterMaxTime < 0 && this.data.cannonType == CONST.CannonType.Normal){//38秒 都没有碰撞
            this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;
            if(Number(this.data.uid) == glGame.user.userID){
                this.logic.bullteNum --;
            }
            this.sendHitFish(CONST.NoonFish);
            this.removeBullet();
        }
        if(this.moveEndTimeBoom > 0){
            this.moveEndTimeBoom -= dt;

            if(this.moveEndTimeBoom < CONST.MissileChangeRed){
                if(this.node.c == undefined)this.node.c = CONST.MissileRedMaxValue;
                this.node.color = cc.color(CONST.MissileRedMaxValue,this.node.c,this.node.c,CONST.MissileRedMaxValue);//慢慢变红
                this.node.c -= dt*CONST.MissileRedSpeed;
                if(this.node.c <= CONST.MissileRedValue){
                    this.node.c = CONST.MissileRedValue;
                }
            }
            if(this.moveEndTimeBoom < 1){
                //删除自己
                this.removeBullet();
                this.moveEndTimeBoom = 0;
            }
        }
        if(this.isInit){
            this.bulletMove(dt);
        }
        if(this.unLockTime > 0 && this.data != null){
            this.unLockTime += dt;
            if(this.unLockTime > 0.5){
                this.data.lock = null;
            }
        }
        if(this.data && this.data.lock != null){
            this.lockStatusTime += dt;
            let fish = this.node.parent.getChildByName(this.data.lock);
            if(!fish){
                //0.5-0.3    (0.2秒后 解锁)
                this.unLockTime = CONST.UnLockMaxTime;
            }
            if(this.lockStatusTime > 0.8){//锁定状态下超过0.8秒解除锁定
                this.data.lock = null;
            }
        }
        if(this.missile){
            this.missileTime += dt;
            if(this.missileTime > this.missileFrequency){
                this.missileTime = 0;
                this.node.getComponent(cc.Sprite).spriteFrame = this.fish_Atlas.getSpriteFrame(this.missilePre+this.missileIndex);
                this.missileIndex   ++;
                if(this.missileIndex > this.missileMaxIndex){
                    this.missileIndex = 0;
                }
            }
        }
    },
    deathFish(tag){
        if(this.data){
            if(Number(this.data.lock) == Number(tag)){
                this.data.lock = null;
            }
        }
    },
    //进入碰撞检测
    onCollisionEnter(other, self) {
        if(this.data == undefined || this.lockCollder == 0){//数据丢失不参与碰撞检测
            return;
        }
        let effectPosition;
        this.bulletOnCollisionEnterMaxTime = CONST.BulletMaxTime;
        if(this.data.cannonType == CONST.CannonType.Missile){                //仙剑子弹
            if(this.logic.seatNum == this.data.seatNum){
                this.logic.curWaitTime = Date.now();//重置时间
            }
            effectPosition = other.node.position;
            glGame.emitter.emit(CONST.clientEvent.playFishnetEffect,{cannonType:Number(""+this.data.cannonType),position:effectPosition,gunLevel:this.data.gunLevel,gunType:this.data.gunType,zIndex:this.node.zIndex});
            if(this.data.hitMax > 0){
                let id = other.node.getComponent("nfish_Unit").getFishID();
                glGame.emitter.emit(CONST.clientEvent.fishSound,"MissileHit");
                this.userMissileHitFish(id,CONST.CannonOpention.MissileHit);
                this.data.hitMax --;
            }
            if(this.data.hitMax == 0){
                this.data.hitMax = -1;
                //开始倒计时 结束后爆炸
                this.moveEndTimeBoom = 3;
            }
        }else{  //普通子弹和三个特殊子弹的逻辑（不包括龙溪）
            let currFishId = Number(other.tag);
            if (this.data.lock != null) {//锁定
                if(currFishId == Number(this.data.lock)){//碰撞到目标鱼
                    this.lockCollder = 0;
                }else{
                    // cc.error(">> currFishId ",currFishId," my lock ",this.data.lock)
                    return;
                }
            }else{
                this.lockCollder = 0;
            }
            let id = other.node.getComponent("nfish_Unit").getFishID();
            if(this.data.seatNum == this.logic.seatNum){
                other.node.getComponent("nfish_Unit").hit();
            }

            //播放闪电、炎爆，播放完成解锁
            if(this.data.cannonType == CONST.CannonType.Lightning || this.data.cannonType == CONST.CannonType.PartialBomb){
                glGame.emitter.emit(CONST.clientEvent.onSpecialBulletExp,{cannonType:this.data.cannonType,uid:this.data.uid,pos:cc.v2(other.node.position.x,other.node.position.y)});
            }
            if(this.data.cannonType == CONST.CannonType.Normal){//普通子弹
                if(Number(this.data.uid) == glGame.user.userID){
                    this.logic.bullteNum --;
                }
                this.sendHitFish(id);
            }
            if (this.data.lock != null) {//锁定使用中心点
                effectPosition = other.node.position;
            }else{                       //手动使用边缘 + 内 偏移量
                let dt = 0.028
                // let ux = this.node.x + dt * this.speed * Math.sin(-this.node.angle / 180 * Math.PI);
                // let uy = this.node.y + dt * this.speed * Math.cos(-this.node.angle / 180 * Math.PI);
                // effectPosition = cc.v2(ux,uy);
                effectPosition = this.node.position;
            }
            if(this.data.cannonType == CONST.CannonType.Normal) {//普通子弹
                glGame.emitter.emit(CONST.clientEvent.playFishnetEffect,{cannonType:Number(""+this.data.cannonType),position:effectPosition,gunLevel:this.data.gunLevel,gunType:this.data.gunType,zIndex:this.node.zIndex});
            }
            this.removeBullet();
        }
    },
    //发送普通子弹的碰撞鱼
    sendHitFish(id){
        let oprEvent = {
            "op":CONST.CannonOpention.NormalHit,
            "fishId": id,
            "shellId": this.data.bulletId
        };
        if(this.data.uid && this.data.uid != glGame.user.userID){
            oprEvent["uid"] = Number(this.data.uid);
            // cc.log(">>　------ 机器人 的子弹碰撞  bulletId: ",this.data.bulletId)
        }
        if(this.logic.isEnterRoom){
            // cc.log("--==-->发送普通子弹的碰撞鱼 ",oprEvent);
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),oprEvent);//子弹碰撞
        }else{
            cc.warn(">>游戏未初始化无法发射")
        }
    },
    //发送仙剑的子弹碰撞鱼 入口
    userMissileHitFish(id,op){
        let oprEvent = {
            "op":op,
            "fishIds": [id],
            "uid":this.data.uid
        };
        // cc.error("---仙剑撞击--- uid: "+this.data.uid+" fish id "+id+"  >> 剩余次数 "+this.data.hitMax);
        if(this.logic.isEnterRoom){
            cc.log("--==-->发送仙剑的子弹碰撞 ",oprEvent);
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),oprEvent);//仙剑子弹碰撞
        }
    },
    OnDestroy() {
        this.logic = null;
        this.data = null;
        this.iSCalculate    = 0;
    },
});
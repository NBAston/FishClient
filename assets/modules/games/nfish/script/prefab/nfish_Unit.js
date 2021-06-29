/***
 *  捕鱼：鱼，初始化 播放图片、移动（同步状态）
 * **/
let CONST = require("nfishConst");
glGame.movieClip.extend({
    onLoad () {
        this.initFishMovieClip();//调用基类的初始化动画方法
        this.logic = require("nfishlogic").getInstance();//数据中心
        this.whirlpool= null;
        this.fishData = null;
        this._bUpdate = false;
        this.moveList = null;
        this.posArray = null;
        this.isHit    = false;
        this.hitTime  = 0;
        this.isPlayStartMc = false;
        this.addSpeed = 0;
        this.showBubblesTime = 1;
        this.closeBubblesTime = -1;
        this.isQuickDie = false;
        this.isPlayerSound = false;
    },
    //初始化鱼
    initFish(fishData){
        this.node.getChildByName("bg").active = false;
        this.fishData     = JSON.parse(JSON.stringify(fishData));
        this.moveList     = this.fishData.moveList;
        this.posArray     = this.fishData.posArray;
        this.showTime     = this.fishData.showTime;     //配置表默认 等待 时间
        this.localFishData= this.logic.json_fishTable[this.fishData.fishTypeId+""];
        this.resGroupId   = this.localFishData.resGroupId;
        this.fishResData  = this.logic.json_fishResEdit["fish"+this.resGroupId];
        this.runTime      = this.fishData.runTime;      //总时间
        this._time        = Date.now();
        this.node.x       = this.posArray[0].x;
        this.node.y       = this.posArray[0].y;
        let fishLocalData = this.logic.json_fishTable[this.fishData.fishTypeId+""];
        let zIndex        = CONST.nodeZIndex.zIndexFish + (Number(fishLocalData.priority) + Math.ceil(Math.random() * 30));
        this.node.zIndex  = zIndex > cc.macro.MAX_ZINDEX ? cc.macro.MAX_ZINDEX -1 : zIndex;

        if(this.fishData.frequency != undefined){
            this.runSpeed = this.localFishData.frameRate * this.fishData.frequency * CONST.Runfrequency;
        }

        let liveTime = (fishData.serverTime - fishData.createTime)/1000; //出生时间
        this._allTime = Number(this.runTime+this.showTime+"");     //最大寿命时间
        let newLiveTime = Math.abs(liveTime);                            //矫正 已经出生时间
        if(liveTime < 0){//没出生
            this.showTime += newLiveTime;
            this._startTime = 0;
        }else{
            let newLiveTime = Math.abs(liveTime);                            //矫正 已经出生时间
            if(newLiveTime >= this._allTime){
                this.death(CONST.dieType0);
                return;
            }

            if(newLiveTime > this.showTime){
                this._startTime = newLiveTime - this.showTime
            }else{
                this.showTime -= newLiveTime;
                this._startTime = 0;
            }
        }
        if(this._startTime > 0){
            this.startMove();//直接开始移动
        }else{
            this._bUpdate     = true;
        }
    },
    startMove(){
        this.setBoxColliderSizeOffsetAndAnchor();
        this.node.getComponent(cc.Sprite).enabled = true;
        this._time = Date.now();
        this.startFishRuning();
        this.isPlayStartMc  = true;
        this.showTime = -1;
        this._bUpdate  = true;
        const NotSay = 0;
        const ChatVoiceType2 = 2;
        const FishRunTime = this.runTime;

        // if(Number(this.localFishData.fishTypeId) == 304){
        //     cc.warn(" 1 > fishTypeId "+this.localFishData.fishTypeId + " name " + this.localFishData.fishName)
        //     this.showBubblesTime = -2//test 代码
        // }else{
        // }

        if(Number(this.localFishData.chatVoiceType) != NotSay || Number(this.localFishData.chatVoiceType) != ChatVoiceType2){
            const P20 = FishRunTime * 0.2;
            const P40 = FishRunTime * 0.35;
            //计算运行时间 根据规则需要运行到 20-40% 的区间才可以播放
            this.showBubblesTime = -Math.abs(this.logic.getRandomNum(P20,P40));
        }
        if(this.logic.getIsRotation()){
            this.node.oldScaleY = -this.node.scaleY;
            this.node.scaleY = this.node.oldScaleY;
        }
    },
    move(dt){
        //是否可以开始计时
        if (this.moveList && this.showTime > -1){
            this.showTime -= dt;
            if(this.showTime<=0){
                this.startMove();//开始移动
            }
        }
        //移动
        if (this._bUpdate && this.moveList && this.showTime <= 0) {
            let l_time = Date.now()
            this._startTime = (this._startTime + (l_time - this._time) / 1000) + (this._startTime * this.addSpeed);
            this._time = l_time
            //二阶贝塞尔曲线运动
            this.timeIndex = this.getIndexByTime(this._startTime);
            if (this.timeIndex == -1) {//到尽头了，销毁
                this.death(CONST.dieType0);
                return
            }
            let t;
            let currTime;
            let nextTime;
            if(this.lastIndex == null || this.timeIndex != this.lastIndex){
                currTime = this.getTimeByIndex(this.timeIndex);
                nextTime = this.getTimeByIndex(this.timeIndex + 1);
                this.currTime = currTime;
                this.nextTime = nextTime;
            }else
            {
                currTime = this.currTime;
                nextTime = this.nextTime;
            }
            let fz = this._startTime - currTime;
            let fm = nextTime - currTime;
            t  = fz/fm;
            const FIRST = 2;
            const SCENT = 3;
            const Bz_OnePos = 0;
            const Bz_TowPos = 1;
            const Bz_ThreePos = 2;
            let i = this.timeIndex > 0 ?  SCENT * this.timeIndex : FIRST * this.timeIndex;
            let a = this.posArray[i + Bz_OnePos];
            let b = this.posArray[i + Bz_TowPos];
            let c = this.posArray[i + Bz_ThreePos];
            if(!a){//拿不到数据，到尽头了，销毁
                this.death(CONST.dieType0);
                return
            }
            //轨迹运动
            let x = Math.pow(1 - t, 2) * a.x + 2 * t * (1 - t) * b.x + Math.pow(t, 2) * c.x;
            let y = Math.pow(1 - t, 2) * a.y + 2 * t * (1 - t) * b.y + Math.pow(t, 2) * c.y;
            //设置朝向
            let newAngle = this.setAngle(x,y,this.node.position);
            if(this.localFishData.fixedResource != 1){
                this.node.angle = newAngle;
            }
            this.node.x = x;
            this.node.y = y;
            this.lastIndex = this.timeIndex;
        }
    },
    //冰冻/解冻
    settingIcing(isInFreeze){
        if(isInFreeze){
            this._time = Date.now();
        }
        this._bUpdate = isInFreeze;
    },
    //快速移动
    quickDie(islow = true){
        if(this._bUpdate){
            this.isQuickDie = true;
            this.runSpeed = islow ? 0.0003 : 0.0004; //加快帧播放 原来 0.0166
            this.addSpeed = islow ? 0.02 : 0.003;
            let collider = this.node.getComponent(cc.BoxCollider);
            if(collider){
                collider.enabled = false;
            }

            this.node.stopAllActions();
            const OneTime = 2.7;
            this.node.runAction(cc.sequence(cc.delayTime(OneTime),cc.fadeTo(0.5,0),cc.callFunc(()=>{
                this.dispose();
            })));
        }
    },
    //是否正在快速移动死亡
    isWellDie(){
        return !this.isQuickDie;
    },
    //设定锁定鱼是自己
    lockSelf(){
        let nameID = Number(this.node.name);
        if(this.logic.lockFishID != nameID){
            glGame.emitter.emit(CONST.clientEvent.playLockSpine);
        }
        this.logic.lockFishID = nameID;
        // cc.error(">> 锁定 1  ",this.logic.lockFishID , " id ",this.getFishID());
        this.logic.isAuto = true;
        glGame.emitter.emit(CONST.clientEvent.useAutoSkill);
    },
    //获取鱼线id 锁定、碰撞、死亡 等使用
    getFishID(){
        if(this.fishData != null){
            return Number(this.fishData.id);
        }
        return null;
    },
    //循环体
    update(dt){
        //播放游的动画
        if(this.isPlayStartMc){
            this.playFishMovieClip(dt);
        }
        //移动
        this.move(dt);
        //子弹碰撞 变色 恢复颜色
        if(this.isHit){
            this.hitTime -= dt;
            if(this.hitTime < 0){
                this.isHit = false;
                this.node.color = CONST.HitColor.Normal;
            }
        }
        if(this.showBubblesTime != 1){
            this.showBubblesTime += dt;
            if(this.showBubblesTime >= 0){
                this.showBubblesTime = 1;
                this.startTalk(false,false);//鱼游到屏幕
                this.closeBubblesTime = 5;
            }
        }

        if(this.closeBubblesTime > -1){
            this.closeBubblesTime -= dt;
            if(this.closeBubblesTime <= 0){
                this.node.getChildByName("bg").active = false;
            }
            this.closeBubblesTime = -1;
        }
    },
    //获取时间
    getIndexByTime(existTime) {
        const HALF   = 2;
        const OFFSEX = 1;
        const Not    = -1;
        let time     = 0
        for (let i = 0; i < this.moveList.length / HALF; i++) {
            time = time + this.moveList[HALF * i] + this.moveList[HALF * i + OFFSEX]
            if (time >= existTime) {
                return i
            }
        }
        return Not
    },
    //获取时间
    getTimeByIndex(index) {
        const HALF   = 2;
        const OFFSEX = 1;
        let time     = 0
        for (let i = 0; i < this.moveList.length / HALF; i++) {
            if (i == index) {
                break
            }
            time = time + this.moveList[HALF * i] + this.moveList[HALF * i + OFFSEX]
        }
        return time
    },
    //设置碰撞胶囊大小
    setBoxColliderSizeOffsetAndAnchor(){
        let collider = this.node.getComponent(cc.BoxCollider);
        if(!collider){
            collider = this.node.addComponent(cc.BoxCollider);
        }
        collider.enabled = true;
        if(this.fishResData){
            this.node.anchorX = this.fishResData.anchorX;
            this.node.anchorY = this.fishResData.anchorY;
            collider.offset    = cc.v2(this.fishResData.offsetX,this.fishResData.offsetY);
            collider.size     = cc.size(this.fishResData.sizeW,this.fishResData.sizeH);
        }
        collider.tag = this.getFishID()+"";
        this.node.name = ""+this.getFishID();
    },
    //受击
    hit(){
        const HitLongTime = 0.08;
        this.node.color = CONST.HitColor.Attack;
        this.hitTime    = HitLongTime;
        this.isHit      = true;
        this.startTalk(true,false);//鱼被击中
    },
    setAngle(x2,y2,point){
        let x1 = point.x;
        let y1 = point.y;
        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        this.setscale(angle);
        return angle;
    },
    // 开始说话 isAttack = true 是被击中时候的时候  ，  death = true 死亡的时候
    // ChatVoiceType:
    // 0=不播放聊天及语音
    // 1=入场屏幕20%~40%，20%随机播放音效及聊天
    // 2=死亡仅播放音效
    // 3=入场屏幕20%~40%，必然播放聊天和音效
    // 4=入场屏幕20%~40%，50%概率播放聊天和音效
    // 5=入场屏幕20%~40%，25%概率播放聊天和音效
    // 6=入场屏幕20%~40%，被击中时，播放聊天和音效
    startTalk(isAttack = false,death = false){
        //test代码
        // if(this.localFishData == null || this.localFishData.chatBubble == -1){
        //     return;
        // }
        if(!this._bUpdate){
            return;
        }
        if(!this.isPlayStartMc){
            return;
        }
        if(this.logic == undefined || this.logic.playSoundTime == undefined){
            return;
        }
        const GAPTIME = 10;//上一次播放时间和当前时间的间隔
        let lastPlayTime = (Date.now() - this.logic.playSoundTime)/1000;
        if(this.localFishData == null || this.localFishData.chatBubble == -1 || this.isPlayerSound || lastPlayTime < GAPTIME){
            return;
        }
        this.isPlayerSound = true;
        const ChatVoiceType1 = 1;
        const ChatVoiceType2 = 2;
        const ChatVoiceType3 = 3;
        const ChatVoiceType4 = 4;
        const ChatVoiceType5 = 5;
        const ChatVoiceType6 = 6;
        const BasePercentageFactor = 100;
        const FishRunTime = this.runTime;

        let isPlay = false;
        if(death){
            if(Number(this.localFishData.chatVoiceType) != ChatVoiceType2){
                return;
            }else{
                isPlay = true;
            }
        }
        if(isAttack){
            const P20 = FishRunTime * (20/BasePercentageFactor);
            const P40 = FishRunTime * (40/BasePercentageFactor);
            if(Number(this.localFishData.chatVoiceType) == ChatVoiceType6 && this._startTime > P20 && this._startTime < P40){
                isPlay = true;
            }else{
                return;
            }
        }
        if(Number(this.localFishData.chatVoiceType) == ChatVoiceType3){
            isPlay = true;
        }

        let IsShow = Math.random() * BasePercentageFactor;
        const P1_20 = 20/BasePercentageFactor;
        const P4_20 = 50/BasePercentageFactor;
        const P5_20 = 25/BasePercentageFactor;
        switch (Number(this.localFishData.chatVoiceType)) {
            case ChatVoiceType1:
                if(IsShow > P1_20){
                    isPlay = true;
                }
                break;
            case ChatVoiceType4:
                if(IsShow > P4_20){
                    isPlay = true;
                }
                break;
            case ChatVoiceType5:
                if(IsShow > P5_20){
                    isPlay = true;
                }
                break;
        }

        // if(Number(this.localFishData.fishTypeId) == 304) {
        //     cc.warn(" 2 > fishTypeId " + this.localFishData.fishTypeId + " name " + this.localFishData.fishName)
        //     isPlay = true;//test 代码
        // }

        if(isPlay){
            let tip = this.node.getChildByName("bg");
            this.logic.playSoundTime = Date.now();
            const FishVoice = "voiceFile";
            const Offsex = 60;
            const SetActiveTime = 5;
            // const SetActiveTime = 50;//test代码
            let lab = tip.getChildByName("lab");
            tip.active = false;//暂时屏蔽
            if(this.localFishData.chatBubble.indexOf("&&") != -1){
                let str = (this.localFishData.chatBubble+"").split("&&");
                lab.getComponent(cc.Label).string = str[0] + "\n" + str[1];
            }else{
                lab.getComponent(cc.Label).string = this.localFishData.chatBubble;
            }
            tip.getChildByName("lab").active = false;//暂时屏蔽
            tip.width = lab.width + Offsex;
            glGame.emitter.emit(CONST.clientEvent.fishSound,FishVoice+this.localFishData.voiceFile);
            //暂时屏蔽
            // tip.stopAllActions();
            // tip.runAction(cc.sequence(cc.delayTime(SetActiveTime),cc.callFunc(()=>{
            //     tip.active = false;
            // })));

        }
    },
    setscale(angle){
        let tip = this.node.getChildByName("bg");
        const Normal = 1;
        const GoBack = -1;
        let  oneX = this.posArray[0].x;
        if(this.logic.getIsRotation()){
            if(this.localFishData.fixedResource == 1 && oneX > 0) {//悬浮鱼类特殊处理
                this.node.scaleY = GoBack;
                // if(Number(this.localFishData.resGroupId) == 29 || Number(this.localFishData.resGroupId) == 30){
                    this.node.scaleX = oneX > 0 ? GoBack : Normal;
                // }
            }else{
                this.node.scaleY = oneX > 0 ?  Normal : GoBack;
            }
            if(oneX > 0 && this.node.set180Rotation == null){
                this.node.set180Rotation = 1;
                tip.getChildByName("lab").scaleX = -1;
            }
        }else{
            if(this.localFishData.fixedResource == 1 && oneX > 0) {//悬浮鱼类特殊处理
                this.node.scaleY = Normal;
                // if(Number(this.localFishData.resGroupId) == 29){
                    this.node.scaleX = oneX > 0 ? GoBack : Normal;
                // }
                // if(Number(this.localFishData.resGroupId) == 30){//boss方向矫正
                //     this.node.scaleX = oneX > 0 ? GoBack : Normal;
                // }
            }else{
                this.node.scaleY = oneX > 0 ?  GoBack : Normal;
                // if(Number(this.localFishData.resGroupId) == 29){
                    this.node.scaleX = oneX > 0 ? GoBack : Normal;
                // }
            }
        }
        if(tip.active){
            if(this.logic.getIsRotation()){
                if(angle > 0){
                    if(oneX > 0){
                        if(this.localFishData.fixedResource == 1){
                            // if(Number(this.localFishData.resGroupId) == 29) {
                                tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            // if(Number(this.localFishData.resGroupId) == 30) {
                            //     tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                        }else {
                            tip.angle = -angle;
                            tip.scaleY = -this.node.scaleY;
                        }
                    }else{
                        if(this.localFishData.fixedResource == 1){
                            tip.scaleX = GoBack;
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = angle;
                            tip.scaleX = GoBack;
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }
                    }
                }else{
                    if(oneX > 0){
                        if(this.localFishData.fixedResource == 1){
                            // if(Number(this.localFishData.resGroupId) == 29) {
                                tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            // if(Number(this.localFishData.resGroupId) == 30) {
                            //     tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                        }else{
                            tip.angle = -angle;
                            tip.scaleY = -this.node.scaleY;
                        }
                    }else{
                        if(this.localFishData.fixedResource == 1){
                            tip.scaleX = GoBack;
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = angle;
                            tip.scaleX = GoBack;
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }
                    }
                }
                if(tip.scaleX == Normal && tip.scaleY == GoBack){
                    tip.x = 200;//镜像 偏移量
                }else{
                    tip.x = -135;//镜像 偏移量
                }
            }else{
                if(angle > 0){
                    if(oneX > 0){
                        if(this.localFishData.fixedResource == 1){
                            // if(Number(this.localFishData.resGroupId) == 29) {
                                tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            // if(Number(this.localFishData.resGroupId) == 30) {
                            //     tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = angle;
                            tip.scaleY = this.node.scaleY;
                        }
                    }else{
                        if(this.localFishData.fixedResource == 1){
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = -angle;
                            tip.scaleX = Normal;
                        }
                    }
                }else{
                    if(oneX > 0){
                        if(this.localFishData.fixedResource == 1){
                            // if(Number(this.localFishData.resGroupId) == 29) {
                                tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            // if(Number(this.localFishData.resGroupId) == 30) {
                            //     tip.scaleX = GoBack;//FIX：财神 气泡反了
                            // }
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = angle;
                            tip.scaleY = this.node.scaleY;
                        }
                    }else{
                        if(this.localFishData.fixedResource == 1){
                            tip.getChildByName("paoCantainer").scaleX = -1;
                        }else{
                            tip.angle = -angle;
                            tip.scaleX = Normal;
                        }
                    }
                }
                if(tip.scaleX == Normal && tip.scaleY == GoBack){
                    tip.x = 200;//镜像 偏移量
                }else{
                    tip.x = -135;//镜像 偏移量
                }
            }
        }
    },
    //死亡 - 开始 dieType: 0 自然死亡 1玩家攻击 2全屏炸弹 3闪电  4旋涡 delayDieTime 延迟死亡
    death(dieType,seatNum = -1,delayDieTime = -1){
        if(delayDieTime > 0){
            this.scheduleOnce(()=>{
                this.deathNext(dieType,seatNum);
            },delayDieTime);
        }else{
            this.deathNext(dieType,seatNum);
        }
    },
    //死亡 - 开始 dieType: 0 自然死亡 1玩家攻击 2全屏炸弹 3闪电  4旋涡
    deathNext(dieType,seatNum = -1){
        this.node.getChildByName("bg").active = false;
        this.node.getComponent(cc.BoxCollider).enabled = false;
        //播放死亡动画开始 结束后调用 dispose
        this.isStart  = false;
        this._bUpdate = false;
        if(this.lockBulletList && this.lockBulletList.length > 0){
            let len = this.lockBulletList.length;
            for (let i = 0;i<len;i++){
                this.lockBulletList[i].getComponent("nfish_Bullet").deathFish(this.getFishID());
            }
        }

        if(dieType != CONST.dieType0 && this.localFishData.shock == 1){
           glGame.emitter.emit(CONST.clientEvent.onSshock);
        }
        this.lockBulletList = null;
        if(dieType == CONST.dieType1){
            this.isHit = false;
            this.node.color = CONST.HitColor.Deat;
            const TIME = 0.8;
            let EndAngle;
            const SX = 0;
            let act;
            if(this.logic.getIsRotation()){
                EndAngle = -360 * 3;
                act = cc.spawn(
                    cc.scaleTo(TIME,SX),
                    cc.rotateTo(TIME,EndAngle)
                );
            }else{
                EndAngle = -360 * 3;
                act = cc.spawn(
                    cc.scaleTo(TIME,SX),
                    cc.rotateTo(TIME,EndAngle)
                );
            }
            this.startTalk(false,true);//鱼被玩家打死
            this.node.stopAllActions();
            this.node.runAction(cc.sequence(act,cc.callFunc(()=>{
                this.dispose();
            })));
        }else if(dieType == CONST.dieType3){
            let oldAngle = this.node.angle + "";
            let angle = this.node.angle >　0 ? this.node.angle - 20 : this.node.angle + 20;
            let act = cc.sequence(
                cc.rotateTo(0.1,angle),
                cc.rotateTo(0.1,Number(oldAngle))
            );
            this.node.stopAllActions();
            this.node.runAction(cc.sequence(cc.repeat(act,7),cc.scaleTo(1,0),cc.callFunc(()=>{
                this.dispose();
            })));
        }else if(dieType == CONST.dieType4){
            this.node.stopAllActions();
            let act = cc.spawn(
                cc.scaleTo(2,0.01,0.01),
                cc.repeat(cc.rotateBy(0.5,360),5),
                cc.sequence(
                    cc.moveTo(0.6,this.node.x + 9,this.node.y - 9),
                    cc.moveTo(0.6,this.node.x - 9,this.node.y + 9),
                )
            );
            this.node.runAction(cc.sequence(act,cc.callFunc(()=>{
                this.dispose();
            })));
        }else{
            this.dispose();
        }
    },
    //卸载自己
    dispose(){
        this.clearTideCorrect();
        let fishID = Number(this.getFishID()+"");
        if(this.logic){
            let ind = this.logic.bossIDList.indexOf(fishID);
            if(ind != -1){
                this.logic.bossIDList.splice(ind,1);//如有boss 死亡的时候就删除
            }
            this.node.off(cc.Node.EventType.TOUCH_START);
        }
        this.logic    = null;
        this.fishData = null;
        this._bUpdate = false;
        this.moveList = null;
        this.posArray = null;
        if(this.whirlpool)this.whirlpool.destroy();
        if(this.node.parent){
            this.node.parent.removeChild(this.node);
        }
        this.node.destroy();
        if(!this.isQuickDie){
            glGame.emitter.emit(CONST.clientEvent.disposeFishNode,fishID);
        }
    },
    //延迟销毁
    delayDestroy(i){
        let delayTime = 0.01 + 0.1*i;
        const MaxTime = 3;
        if(delayTime > MaxTime){
            delayTime = Math.random() * MaxTime;
        }
        this.scheduleOnce(()=>{
            if(this.node != null){
                this.node.destroy();
            }
        },delayTime);
    },
    OnDestroy() {
        this.moveList = [];
        this.logic = null;
        this.fishData = null;
        this.posArray = null;
        this.isHit    = false;
        this.hitTime  = 0;
    }
});
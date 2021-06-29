//玉如意转盘
let CONST = require("nfishConst");
glGame.baseclass.extend({
    properties: {
        turntablePosList: cc.Node,
        turntable: cc.Node,
        mask_turntable: cc.Node,
        turntableMask: cc.Node,
        turntableBg:cc.Node,
        turntableBg2:cc.Node,
        spine_IdleEffect:cc.Node,
        spine_showEffect:cc.Node,
        //金币银币漂移动画 图集
        moneyEffect_Atlas: {
            default: null,
            displayName: "moneyEffect_Atlas",
            tooltip: "金币银币漂移动画 图集",
            type:cc.SpriteAtlas,
        },
    },
    onLoad(){
        this.logic = require("nfishlogic").getInstance();//数据中心
        this.isInitIng = false;
    },
    //启动转盘
    initTurntableView(res){
        if(res == null || this.isInitIng){
            return;
        }
        const Normal = 255;
        this.node.opacity = Normal;
        this.node.active = true;

        for (let i = 0; i < this.turntable.childrenCount; i++) {
            let heightLine = this.turntable.children[i].getChildByName("heightLine");
            heightLine.active = false;
        }

        this.turntableMask.getComponent(cc.BlockInputEvents).enabled = true;
        this.isInitIng = true;
        this.node.active = true;
        this.data = res.rewardArray.sort(function(a,b){return a-b});//奖励列表（聚宝盆、玉如意）
        this.reward = res.rewardMultiple;//最总奖励倍数（聚宝盆、玉如意）
        cc.warn(">>>> 玉如意 转盘 data  ",this.data," reward ",this.reward);

        this.initTurntableData();

        this.logic.playSpine(this.spine_showEffect,false,true,CONST.SpineName.TurnTableShowTime);

        const BoomHighTime = 0.8;
        const ShowTimeOver = 0.8;

        const NotOpacity = 0;
        const NotScale = 0;
        const NormalOpacity = 255;

        this.turntableBg.scale = NotScale;
        this.turntableBg2.scale = NotScale;
        this.turntable.scale = NotScale;
        this.mask_turntable.scale = NotScale;
        this.turntableBg.opacity = NotOpacity;
        this.turntableBg2.opacity = NotOpacity;
        this.turntable.opacity = NotOpacity;
        this.mask_turntable.opacity = NotOpacity;

        this.spine_IdleEffect.stopAllActions();
        this.spine_IdleEffect.opacity = NotOpacity;

        this.scheduleOnce(()=>{
            this.spine_IdleEffect.opacity = NormalOpacity;
            this.logic.playSpine(this.spine_IdleEffect,true,false,CONST.SpineName.TurnTableIdle);
        },BoomHighTime);

        this.scheduleOnce(()=>{
            this.starTurn(res);
            this.isInitIng = false;
        },ShowTimeOver);
    },
    //初始化转盘上面的数字
    initTurntableData() {
        let MaxIcon = 8;
        for (let i = 0; i < MaxIcon; i++) {
            let lab_number = this.turntable.getChildByName(i+"").getComponent(cc.Label);
            lab_number.string = this.logic.getFloat(this.data[i]);
        }
    },
    //传入获奖结果获得转盘的index
    getIndex(reward) {
        let MaxIcon = 8;
        for (let i = 0; i < MaxIcon; i++) {
            let lab_number = this.turntable.getChildByName(i+"").getComponent(cc.Label);
            let rewardIndex = lab_number.string;
            if (rewardIndex == this.logic.getFloat(reward)) {
                switch (i) {//根据图片金币大小种类规则来
                    case 6 :
                        return 0;
                    case 1 :
                        return 1;
                    case 5 :
                        return 2;
                    case 3 :
                        return 3;
                    case 4 :
                        return 4;
                    case 0 :
                        return 5;
                    case 7 :
                        return 6;
                    case 2 :
                        return 7;

                }
            }
        }
    },
    //开始转动
    starTurn(res) {
        const NormalScale = 1;
        const NormalOpacity = 255;

        this.turntable.angle = 0;
        this.mask_turntable.angle = 0;
        let index = this.getIndex(this.reward);
        let times = 3;
        let angle = 360 - index * 45 + 360 * times;

        this.node.stopAllActions();
        this.turntableBg.opacity = NormalOpacity;
        this.turntableBg2.opacity = NormalOpacity;
        this.turntable.opacity = NormalOpacity;
        this.mask_turntable.opacity = NormalOpacity;

        this.turntableBg.scale = NormalScale;
        this.turntableBg2.scale = NormalScale;
        this.turntable.scale = NormalScale;
        this.mask_turntable.scale = NormalScale;

        this.turntableBg.stopAllActions();
        this.turntableBg2.stopAllActions();
        this.turntable.stopAllActions();

        const RunTime = 5;
        const WaitTime = 1;

        this.scheduleOnce(()=>{
            glGame.emitter.emit(CONST.clientEvent.fishSound,"userYuRuYi");//玉如意转盘使用
        },1);
        this.turntable.runAction(cc.sequence(
            cc.delayTime(WaitTime),
            cc.rotateBy(RunTime, angle).easing(this.easeExponentialOut()),
            cc.delayTime(0.6),
            cc.callFunc(() => {
                this.flyGoldEffect(res,index);
            })
        ))

        this.mask_turntable.stopAllActions();
        this.mask_turntable.runAction(
            cc.sequence(
                cc.delayTime(WaitTime),
                cc.rotateBy(RunTime, angle).easing(this.easeExponentialOut())
            )
        )
    },
    //漂移金币动画
    flyGoldEffect(res,index){
        glGame.emitter.emit(CONST.clientEvent.fishSound,"yuRuGet");//玉如意获得
        let glodEndPosPre  = this.logic.getIsRotation() ? "glodEndPosR" : "glodEndPos";
        let targetPosition = this.turntablePosList.getChildByName(glodEndPosPre + res.seatNum).position;
        const Multiple     = 100;
        const MaxCoin      = 70;//最大数量
        const CoinSaclc    = 3;
        let effectCoin     = Math.ceil(res.rewardGold/Multiple)*CoinSaclc;
        if(effectCoin > MaxCoin){
            effectCoin = MaxCoin;
        }
        const StartName = 0;
        const endName   = 9;
        const plyTime   = 8;
        const isHaveZero    = false;
        const speed         = 0.035;
        const plyedDestroy  = false;
        const isRandomPly   = 1;

        const RandomOffsexX  = 30;
        const RandomOffsexY  = 50;
        const RandomMinY     = 20;

        const OneDelayTime   = 0.01;
        const ScaleToTime    = 0.3;
        const BezierToTime   = 0.5;
        const ScaleToArg     = 0.8;
        const FadeToTime    = 0.1;
        const MoveToTime    = 0.15;
        const EndOpacity    = 255;

        let glodStartPosPre = this.logic.getIsRotation() ? "glodStartPosR" : "glodStartPos";
        for (let i=0;i<effectCoin;i++){
            let startPos          = this.turntablePosList.getChildByName(glodStartPosPre + parseInt(Math.random() * 5 +1)).position;
            let ui_CoinEffect     = this.logic.creatorEffect();
            ui_CoinEffect.x       = startPos.x;
            ui_CoinEffect.y       = startPos.y;
            ui_CoinEffect.active  = true;
            ui_CoinEffect.parent  = null;
            ui_CoinEffect.opacity = 0;
            let playName          = "gold";

            ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas,playName,StartName,endName,plyTime,isHaveZero,speed,plyedDestroy,null,isRandomPly);
            this.node.addChild(ui_CoinEffect);
            let upPos         = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY );

            if(res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop){
                upPos         = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX,ui_CoinEffect.position.y - ( Math.random() * RandomOffsexY + RandomMinY ));
            }
            let bounceAct1    = cc.spawn(cc.fadeTo(FadeToTime,EndOpacity),cc.moveTo(MoveToTime,ui_CoinEffect.position));
            let bounceAct2    = cc.moveTo(MoveToTime,upPos);
            let bezierPoint   = cc.v2(targetPosition.x,ui_CoinEffect.position.y);
            let act           = cc.spawn(cc.scaleTo(ScaleToTime,ScaleToArg,ScaleToArg),cc.bezierTo(BezierToTime,[upPos,bezierPoint,cc.v2(targetPosition.x,targetPosition.y)]));

            ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i*OneDelayTime),bounceAct1,bounceAct2,act));
        }

        let endGlodTime       = 2.7;//最后一个金币漂移的时间
        const TurntableFadeTo = 0.6;

        this.turntableBg.stopAllActions();
        this.turntableBg2.stopAllActions();
        this.turntable.stopAllActions();
        this.mask_turntable.stopAllActions();
        this.spine_IdleEffect.stopAllActions();

        let indexNode;
        switch (index) {//根据图片金币大小种类规则来
            case 0 :
                indexNode = 6;
                break;
            case 1 :
                indexNode = 1;
                break;
            case 2 :
                indexNode = 5;
                break;
            case 3 :
                indexNode = 3;
                break;
            case 4 :
                indexNode = 4;
                break;
            case 5 :
                indexNode = 0;
                break;
            case 6 :
                indexNode = 7;
                break;
            case 7 :
                indexNode = 2;
                break;
        }

        let lab_number = this.turntable.getChildByName(indexNode+"").getComponent(cc.Label);
        let heightLine = this.turntable.getChildByName(indexNode+"").getChildByName("heightLine");
        const RepeatTimes = 14;
        const SubTimes = Math.ceil(Number(lab_number.string)/RepeatTimes);
        let currentCoin = Number(lab_number.string);
        //读数消失
        this.schedule(()=>{
            currentCoin -= SubTimes;
            if(currentCoin <= 0){
                lab_number.string = "0";
            }else{
                lab_number.string = currentCoin + "";
            }
        },0.1,RepeatTimes-1);

        const RepeatBuiBuiBuiTimes = 4;
        this.schedule(()=>{
            heightLine.active = !heightLine.active;
        },0.3,RepeatBuiBuiBuiTimes-1);

        this.turntableBg.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.fadeTo(TurntableFadeTo,0),cc.callFunc(()=>{
            this.logic.isYuRuyiRuning = false;
            this.turntableMask.getComponent(cc.BlockInputEvents).enabled = false;
            const Not = 0;
            this.node.opacity = Not;
            this.node.active = false;
            glGame.emitter.emit(CONST.clientEvent.addGoldEffect,res);
        })));

        this.turntableBg2.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.fadeTo(TurntableFadeTo,0)));
        this.turntable.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.fadeTo(TurntableFadeTo,0)));
        this.mask_turntable.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.fadeTo(TurntableFadeTo,0)));
        this.spine_IdleEffect.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.fadeTo(TurntableFadeTo,0)));
    },

    easeExponentialOut() {
        let _easeExponentialOutObj = {
            easing: function (dt) {
                return (-(Math.pow(2, -10 * dt)) + 1);
            },
            reverse: function () {
                return _easeExponentialInObj;
            }
        }
        return _easeExponentialOutObj;
    },

    OnDestroy() {
        this.logic = null;
    }
});

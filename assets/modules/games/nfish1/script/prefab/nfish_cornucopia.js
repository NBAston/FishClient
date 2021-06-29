let CONST = require("nfishConst");
//拉霸
glGame.baseclass.extend({
    properties: {
        nodeNumber: cc.Node,
        nodeView: cc.Node,
        door: cc.Node,
        img_door_open: cc.Node,
        img_door_close: cc.Node,
        // litght: cc.Node,
        spine_boom: cc.Node,
        mask: cc.Node,
         //金币银币漂移动画 图集
         moneyEffect_Atlas: {
            default: null,
            displayName: "moneyEffect_Atlas",
            tooltip: "金币银币漂移动画 图集",
            type:cc.SpriteAtlas,
        },
    },
    onLoad() {
        this.logic = require("nfishlogic").getInstance();//数据中心
        this.stopTime = -1;
        this.runSpeed = 0;
        this.nodeView.scale = 0;
        this.node.stopAllActions();
        this.node.scale = 1;
        this.cuarr_gonudaner = 1;
        this.strobeFrequency = 0.1;
        this.strobeTime = 1;
        this.data = null;
    },
    //开始拉霸
    startRunCornucopia(res){
        let fontIndex = this.logic.getRandomNum(1,8);
        for(let i=1;i<9;i++){
            this.door.getChildByName("img_font"+i).active = i == fontIndex;
        }
        this.node.active = true;
        this.node.getChildByName("mask").getComponent(cc.BlockInputEvents).enabled = true;
        this.data = res;
        this.mask.active = true
        this.mask.getComponent(cc.Widget).updateAlignment();
        const Normal = 255;
        this.nodeView.scale = 0;
        this.node.opacity = Normal;
        this.spine_boom.active = false;
        this.logic.playSpine(this.node.getChildByName("spine_show"),false,true,CONST.SpineName.TurnTableShowTime);
        this.nodeView.stopAllActions();
        this.nodeView.runAction(cc.sequence(cc.delayTime(0.1),cc.scaleTo(0.15,1.2),cc.scaleTo(0.15,1)));
        this.door.active = true;
        this.door.stopAllActions();
        this.door.setPosition(this.img_door_close.position);
        const MaxNum = 6;
        for (let i=0;i<MaxNum;i++) {
            let num = this.nodeNumber.getChildByName("" + i);
            let top_num = this.nodeNumber.getChildByName("t_" + i);
            top_num.getComponent(cc.Label).string = this.logic.getRandomNum(1,9);
            num.getComponent(cc.Label).string = "0";
        }
        this.door.runAction(cc.sequence(cc.delayTime(0.7),cc.moveTo(0.3,this.img_door_open.position),cc.callFunc(()=>{
            const Count = 7;
            const Frequency = 0.65;
            const StartTimes = 1;

            let reward =  parseInt(this.logic.getFloat(res.rewardGold));
            let str_reward = reward.toString();
            let numCount = MaxNum - str_reward.length;
            for (let i = 0; i < numCount; i++) {
                str_reward = "0" + str_reward
            }
            for (let i=0;i<MaxNum;i++) {
                let num = this.nodeNumber.getChildByName("" + i);
                let top_num = this.nodeNumber.getChildByName("t_" + i);
                num.stopTime = top_num.stopTime = (Count-(StartTimes+i)) * Frequency;//单个停止时间
                num.num = top_num.num = str_reward.charAt(i);
            }

            this.stopTime = 4;//所有停止时间
            this.runSpeed = 1000;//运行速度
        })));
    },

    update(dt){
        const NumMax = 6;
        const Offsex = 160;
        const Speed = 260;
        if(this.stopTime > 0){
            const LightNum = 4;
            if(this.runSpeed < 2600){
                this.runSpeed += dt * Speed;
            }
            for (let i=0;i<NumMax;i++){
                let num = this.nodeNumber.getChildByName(""+i);
                let top_num = this.nodeNumber.getChildByName("t_"+i);

                if(num.stopTime != null){
                    if(num.stopTime > 0){
                        num.stopTime -= dt;
                        num.getComponent(cc.Label).string = this.logic.getRandomNum(i==0?1:0,9);
                        num.y -= dt * this.runSpeed;
                        if(num.y <= -Offsex){
                            num.y = Offsex;
                        }
                    }else{
                        num.stopTime = null;
                        num.y = 0;
                        num.getComponent(cc.Label).string = num.num;
                        glGame.emitter.emit(CONST.clientEvent.fishSound,"juBaoShowNum");//聚宝盆显示数字
                    }
                }

                if(top_num.stopTime != null){
                    if(top_num.stopTime > 0){
                        top_num.stopTime -= dt;
                        top_num.getComponent(cc.Label).string = this.logic.getRandomNum(i==0?1:0,9);
                        top_num.y -= dt * this.runSpeed;
                        if(top_num.y <= -Offsex){
                            top_num.y = Offsex;
                        }
                    }else{
                        top_num.y = Offsex;
                        top_num.getComponent(cc.Label).string = num.num;
                    }
                }
            }
            this.stopTime -= dt;
        }else{
            if(this.stopTime > -1){
                this.stopTime = -1;

                for (let i=0;i<NumMax;i++){
                    let num = this.nodeNumber.getChildByName(""+i);
                    let top_num = this.nodeNumber.getChildByName("t_"+i);
                    num.getComponent(cc.Label).string = num.num;
                    num.y = 0;
                    top_num.y = Offsex;
                }

                this.door.runAction(cc.sequence(cc.moveTo(0.7,this.img_door_open.position),cc.callFunc(()=>{
                    this.flyGoldEffect(this.data);
                })));

            }
        }
    },
    //漂移金币动画
    flyGoldEffect(res) {
        glGame.emitter.emit(CONST.clientEvent.fishSound,"juBaoGet");//聚宝盆获得
        this.logic.playSpine(this.spine_boom,false,false,CONST.SpineName.Normal);

        let glodEndPosPer = this.logic.getIsRotation() ? "glodEndPosR" : "glodEndPos";
        let targetPosition = this.node.getChildByName("posList").getChildByName(glodEndPosPer + res.seatNum).position;

        const Multiple = 100;
        const MaxCoin = 70;//最大数量
        const CoinSaclc      = 3;

        let effectCoin = Math.ceil(res.rewardGold / Multiple)*CoinSaclc;

        if (effectCoin > MaxCoin) {
            effectCoin = MaxCoin;
        }

        const StartName = 0;
        const endName = 9;
        const plyTime = 8;
        const isHaveZero = false;
        const speed = 0.035;
        const plyedDestroy = false;
        const isRandomPly = 1;


        const RandomOffsexX = 30;
        const RandomOffsexY = 50;
        const RandomMinY = 20;

        const OneDelayTime = 0.01;
        const TwoDelayTime = 0.05;
        const ScaleToTime = 0.3;
        const BezierToTime = 0.5;
        const ScaleToArg = 0.8;
        const FadeToTime = 0.1;
        const MoveToTime = 0.15;
        const EndOpacity = 255;

        let glodStartPer = this.logic.getIsRotation() ? "glodStartPosR" : "glodStartPos";
        for (let i = 0; i < effectCoin; i++) {
            let startPos = this.node.getChildByName("posList").getChildByName(glodStartPer + parseInt(Math.random() * 5 +1)).position;
            let ui_CoinEffect = this.logic.creatorEffect();
            ui_CoinEffect.x = startPos.x;
            ui_CoinEffect.y = startPos.y;
            ui_CoinEffect.active = true;
            ui_CoinEffect.parent = null;
            ui_CoinEffect.opacity = 0;
            let playName = "gold";

            ui_CoinEffect.getComponent("nfish_MovieClip").initEffect(this.moneyEffect_Atlas, playName, StartName, endName, plyTime, isHaveZero, speed, plyedDestroy, null, isRandomPly);
            this.node.addChild(ui_CoinEffect);
            let upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y + Math.random() * RandomOffsexY + RandomMinY);

            if (res.seatNum == CONST.Seat.LeftTop || res.seatNum == CONST.Seat.RightTop) {
                upPos = cc.v2(ui_CoinEffect.position.x + Math.random() * RandomOffsexX, ui_CoinEffect.position.y - (Math.random() * RandomOffsexY + RandomMinY));
            }
            let bounceAct1 = cc.spawn(cc.fadeTo(FadeToTime, EndOpacity), cc.moveTo(MoveToTime, ui_CoinEffect.position));
            let bounceAct2 = cc.moveTo(MoveToTime, upPos);
            let bezierPoint = cc.v2(targetPosition.x, ui_CoinEffect.position.y);
            let act = cc.spawn(cc.scaleTo(ScaleToTime, ScaleToArg, ScaleToArg), cc.bezierTo(BezierToTime, [upPos, bezierPoint, cc.v2(targetPosition.x, targetPosition.y)]));

            ui_CoinEffect.runAction(cc.sequence(cc.delayTime(i*OneDelayTime), bounceAct1, bounceAct2, act, cc.delayTime(TwoDelayTime), cc.callFunc(() => {
                ui_CoinEffect.destroy();
            })));
        }
        let endGlodTime = 1;//最后一个金币漂移的时间
        const CornucopiaScaleToArg = 0;
        const CornucopiaScaleToTime = 0.3;

        this.door.runAction(cc.sequence(cc.delayTime(endGlodTime),cc.moveTo(1,this.img_door_close.position),cc.callFunc(()=>{
            this.node.stopAllActions();
            this.node.runAction(cc.sequence(cc.delayTime(endGlodTime/2),cc.fadeTo(CornucopiaScaleToTime, CornucopiaScaleToArg),cc.callFunc(()=>{
                this.logic.isYuRuyiRuning = false;
                this.mask.active = false;
                glGame.emitter.emit(CONST.clientEvent.addGoldEffect,res);
            })));
        })));
    },
});

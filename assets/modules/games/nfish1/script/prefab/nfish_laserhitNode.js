//捕鱼 龙溪子弹 碰撞
let CONST = require("nfishConst");

glGame.baseclass.extend({
    extends: cc.Component,

    OnDestroy() {
        this.logic = null;
        this.unregisterEvent();
    },
    onLoad(){
        this.logic              = require("nfishlogic").getInstance();//数据中心
        this.hitNodeTime = -1;
        this.angle = -1;
        this.uid = -1;
        this.seatNum = -1;
        this.coolingTime = 0;
        this.hitList = [];
        this.registerEvent();
    },
    //注册监听
    registerEvent() {
        glGame.emitter.on(CONST.clientEvent.onLaserDispath,this.onLaserDispathHandler,this);
    },
    //反注册监听
    unregisterEvent() {
        glGame.emitter.off(CONST.clientEvent.onLaserDispath,this);
    },
    onLaserDispathHandler(res){
        this.coolingTime = 1;
        if(this.node.parent.name == ("ui_gun"+res.seatNum)){
            this.hitList = [];
            this.seatNum = res.seatNum;
            this.uid = res.uid;
            this.angle = res.angle;
            this.hitNodeTime  = 0;
        }
    },
    //进入碰撞检测
    onCollisionEnter(other, self) {
        if(this.coolingTime > 0 && other.node.group == "fish"){
            // glGame.emitter.emit(CONST.clientEvent.playFishnetEffect,{position:other.node.position,zIndex:CONST.nodeZIndex.zIndexPartBoom,gunLevel:-1});
            if(this.seatNum == this.logic.seatNum)other.node.getComponent("nfish_Unit").hit();

            if(this.hitList.indexOf(Number(other.node.name)) == -1){
                this.hitList.push(Number(other.node.name));
            }
        }
    },
    update(dt){
        if(this.coolingTime > 0){
            this.coolingTime -= dt;
        }
        if(this.hitNodeTime > -1){
            this.hitNodeTime += dt;
            if(this.hitNodeTime > 0.18){
                this.hitNodeTime = -1;
                this.coolingTime = 0;
                if(this.node.parent.name == ("ui_gun"+this.seatNum)){
                    //发送发射龙溪炮弹
                    let shootBulletData = {
                        "op":CONST.CannonOpention.Laser,
                        "angle":this.angle,
                        "uid":this.uid
                    };
                    cc.log("--==-->发送龙溪炮弹 A 发射 ",shootBulletData);

                    if(this.logic.isEnterRoom){
                        glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),shootBulletData);
                    }

                    //发送龙溪子弹碰撞
                    let hitFishData = {
                        "op":CONST.CannonOpention.LaserHit,
                        "fishIds": this.hitList,
                        "angle":this.angle,
                        "uid":this.uid
                    };
                    if(this.angle == undefined){
                        cc.warn("龙溪发射 失败 没有角度 ",hitFishData)
                    }
                    if(this.uid == undefined){
                        cc.warn("龙溪发射 失败 没有uid ",hitFishData)
                    }
                    if(this.logic.isEnterRoom){
                        cc.log("--==-->发送龙溪子弹 B 碰撞 ",hitFishData);
                        glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2),hitFishData);
                    }
                }else{
                    cc.warn(">龙溪发射失败...")
                }
            }
        }
    }
});
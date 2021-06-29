/***
 *  捕鱼：桌子BG
 * **/
let CONST = require("nfishConst");
glGame.baseclass.extend({
    properties: {

    },
    onLoad () {
        this.registerEvent();
        this.logic = require("nfishlogic").getInstance();//数据中心
        this.index = 0;
        this.isSshockIng = false;
        this.time = 0;//水波波动时间
        this.wateSpeed = 1.5;//水波波动参数
    },
    start () {
    },
    //注册监听
    registerEvent() {
        glGame.emitter.on(CONST.clientEvent.changeBackGround,this.changeBackGroundHandler,this);
        glGame.emitter.on(CONST.clientEvent.seaWaveChangeBg,this.seaWaveChangeBgHandler,this);
        glGame.emitter.on(CONST.clientEvent.onSshock,this.onShockHandler,this);                     //震动屏幕
    },
    //反注册监听
    unregisterEvent() {
        glGame.emitter.off(CONST.clientEvent.changeBackGround,this);
        glGame.emitter.off(CONST.clientEvent.seaWaveChangeBg,this);
        glGame.emitter.off(CONST.clientEvent.onSshock,this);
    },
    //水波赋值
    update(dt) {
        if(this.material){
            this.time += dt * this.wateSpeed;
            this.material.setProperty("time", this.time);
        }
    },
    //设置水波波及范围参数
    setResolution() {
        this.material.setProperty(
            "resolution",
            cc.v2(this.node.width, this.node.height)
        );
    },
    //震动 - 通用震动库
    onShockHandler(){
        if(this.isSshockIng)return;
        const SshockTime = 0.8;
        this.isSshockIng = true;
        this.oldPos = this.node.position;
        this.node.getComponent(cc.Widget).enabled = false;
        this.node.runAction(cc.repeatForever(cc.sequence(    cc.moveTo(0.02, cc.v2(this.oldPos.x+5, this.oldPos.y+7)), cc.moveTo(0.02, cc.v2(this.oldPos.x-6, this.oldPos.y+7)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-13, this.oldPos.y+3)), cc.moveTo(0.02, cc.v2(this.oldPos.x+3, this.oldPos.y-6)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-5, this.oldPos.y+5)), cc.moveTo(0.02, cc.v2(this.oldPos.x+2, this.oldPos.y-8)),    cc.moveTo(0.02, cc.v2(this.oldPos.x-8, this.oldPos.y-10)), cc.moveTo(0.02, cc.v2(this.oldPos.x+3, this.oldPos.y+10)),    cc.moveTo(0.02, cc.v2(this.oldPos.x+0, this.oldPos.y+0)))));
        this.scheduleOnce(() => {
            this.node.stopAllActions();
            this.node.setPosition(this.oldPos);
            this.node.getComponent(cc.Widget).enabled = true;
            this.isSshockIng = false;
        }, SshockTime);
    },
    //常规更换背景
    changeBackGroundHandler(bgIndex){
        const MaxBgNum = 4;
        for(let i=0;i<MaxBgNum;i++){
            this.node.getChildByName("ui_Bg"+i).active = bgIndex == i;
            if(bgIndex == i){
                this.material = this.node.getChildByName("ui_Bg"+i).getComponent(cc.Sprite).getMaterial(0);
                this.setResolution();
            }
        }
        this.index = bgIndex;
        glGame.emitter.emit(CONST.clientEvent.fishBgSound,this.index);
    },
    //海浪更换背景
    seaWaveChangeBgHandler(bgIndex){
        let old = Number(""+this.index);
        this.index  = bgIndex;
        glGame.emitter.emit(CONST.clientEvent.fishBgSound,this.index);
        let old_Bg = this.node.getChildByName("ui_Bg"+old);
        let new_Bg = this.node.getChildByName("ui_Bg"+this.index);
        this.material = new_Bg.getComponent(cc.Sprite).getMaterial(0);
        this.setResolution();
        old_Bg.getComponent(cc.Widget).enabled = false;
        new_Bg.getComponent(cc.Widget).enabled = false;
        old_Bg.stopAllActions();
        new_Bg.stopAllActions();
        const winSizeWidth  = this.logic.getIsRotation() ? cc.winSize.width : -cc.winSize.width;
        new_Bg.x = this.logic.getIsRotation() ? -winSizeWidth : cc.winSize.width;
        new_Bg.active = true;
        new_Bg.runAction(cc.moveTo(1.01,cc.v2(0,new_Bg.y)));
        old_Bg.runAction(cc.sequence(cc.moveTo(1.01,cc.v2(winSizeWidth,old_Bg.y)),cc.callFunc(()=>{
            old_Bg.active = false;
            old_Bg.x = 0;
            old_Bg.getComponent(cc.Widget).enabled = true;
            new_Bg.getComponent(cc.Widget).enabled = true;
        })));
    },
    OnDestroy() {
        this.unregisterEvent();
    },
});
//云
glGame.baseclass.extend({
    properties: {
        speed: {
            default: 5,
            displayName: "速度",
            tooltip: "云朵运动速度",
            type:cc.Integer,
        },
        way: {
            default: 1,
            displayName: "方向",
            tooltip: "1从左到右，-1从右到左",
            type:cc.Integer,
        },
    },
    extends: cc.Component,
    update(dt){
        if(this.way === 1){
            this.node.x += dt * this.speed;
            if(this.node.x > cc.winSize.width/2){
                this.node.x = -(cc.winSize.width/2 + 100);
            }
        }else{
            this.node.x -= dt * this.speed;
            if(this.node.x < -cc.winSize.width/2){
                this.node.x = cc.winSize.width/2 + 100;
            }
        }
    }
});

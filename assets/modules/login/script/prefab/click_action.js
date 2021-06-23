
glGame.baseclass.extend({
    properties: {
        click_node: cc.Node,
        chick_act: cc.Node,
        chick_meihua: cc.Node,

        base_sprite: cc.SpriteFrame,
    },
    onLoad() {
        this.registerEvent();
        cc.game.addPersistRootNode(this.node);
        this.creatSmear = true;
        this.itemScale = glGame.systemclass.convertInterface();
    },

    start() {

    },

    registerEvent() {
        glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_BEGIN, this.clickCallBack, this);
        glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_MOVE, this.moveCallBack, this);
        glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_STATE, this.stateCallBack, this);
    },
    unRegisterEvent() {
        glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_BEGIN, this);
        glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_MOVE, this);
        glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_STATE, this);
    },

    clickCallBack(pos) {
        this.action(pos);
    },

    moveCallBack(pos) {
        if (!this.creatSmear) return;
        this.node.runAction((cc.sequence(cc.delayTime(0.1), cc.callFunc(() => { this.creatSmear = true; }))));
        this.action(pos);

        this.creatSmear = false;
    },

    //设置点击特效的资源图片
    stateCallBack(picObj) {
        this.chick_meihua.getComponent(cc.Sprite).spriteFrame = picObj ? picObj : this.base_sprite;
        this.chick_act.getComponent(cc.ParticleSystem).spriteFrame = picObj ? picObj : this.base_sprite;
        //刷新图片，避免出现方块
    },

    action(Pos) {
        let clickItem = cc.instantiate(this.chick_act);
        clickItem.parent = this.node;
        clickItem.active = true;
        clickItem.position = Pos;
        clickItem.scale = glGame.systemclass.convertInterface();
        clickItem.runAction(cc.sequence(cc.delayTime(0.6), cc.removeSelf()));

        let meihua = cc.instantiate(this.chick_meihua);
        meihua.parent = clickItem;
        meihua.active = true;
        meihua.x = 0;
        meihua.y = 0;
        meihua.scale = 1;
        let delay = cc.delayTime(0.1);
        let fadeOut = cc.fadeOut(0.3);
        let scaleTo = cc.scaleTo(0.4, 2.25);
        meihua.runAction(cc.spawn(cc.sequence(delay, fadeOut), scaleTo));
    },

    update(dt) {
    },

    onDestroy() {
        this.unRegisterEvent();
    },
});

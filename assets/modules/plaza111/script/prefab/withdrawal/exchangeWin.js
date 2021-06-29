
glGame.baseclass.extend({
    properties: {
        duihuanSpine: sp.Skeleton,
        closeNode: cc.Node,
        content:cc.Node,
        audio_exchangeSucceed: {
            type: cc.AudioClip,
            default: null
        },
    },


    onLoad() {
       
    },

    start() {

    },
    playSucceed() {
        glGame.audio.playSoundEffect(this.audio_exchangeSucceed, true);
        this.duihuanSpine.setCompleteListener((trackEntry, loopCount) => {
            let name = trackEntry.animation ? trackEntry.animation.name : '';

            if (name === 'appears' || name === 'looping') {
                this.closeNode.active = true;
                this.content.active = true;
                this.duihuanSpine.setAnimation(0, "looping", true);
                // 动画结束后执行自己的逻辑
                this.node.getChildByName("content").getChildByName("img_qdd3fz").active = true;
                console.log('动画播放结束');
            }
        });
        this.duihuanSpine.setAnimation(0, "appears", false);
    },
    OnDestroy() {

    },
    duihuan_close() {
        this.remove();
    },

    // update (dt) {},
});

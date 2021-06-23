glGame.baseclass.extend({
    properties: {
        title: cc.Label,
        coin: cc.Label,
        score: cc.Label,
        activeLevel: cc.Label,
        diamond: cc.Label,
        node_coin: cc.Node,
        node_score: cc.Node,
        node_activeLevel: cc.Node,
        node_diamond: cc.Node,
        sp_frame: sp.Skeleton,
        audio_reward: {
            type: cc.AudioClip,
            default: null
        },
    },
    onLoad() {
        this.next = null;
        this.node_coin.active = false;
        this.node_score.active = false;
        this.node_activeLevel.active = false;
        this.registerEvent();
        glGame.audio.playSoundEffect(this.audio_reward, true);
        this.sp_frame.setCompleteListener(()=>{
            this.node.getChildByName("btn_confirm").getComponent(cc.Button).interactable = true;
        });
    },

    registerEvent() { },
    unRegisterEvent() { },


    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_confirm": this.confirm(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    /**
     * @param title         标题
     * @param awarddata     奖励类型列表（详见glGame.awardtype）金币，夺宝积分，任务活跃，钻石
     * @param next          回调函数
     */
    showMsg(title, awarddata, next) {
        this.title.string = title;

        for (let index in awarddata) {
            let award = awarddata[index];
            console.log("这是当前的显示消息",award,glGame.user.get("roomSwitch"))
            if (!award) continue;
            if (award.type == glGame.awardtype.COIN) {
                this.node_coin.active = true;
                this.coin.string = typeof award.value != "string" ? award.value.toString() : award.value;
            } else if (award.type == glGame.awardtype.SCORE) {
                this.node_score.active = true;
                this.score.string = typeof award.value != "string" ? award.value.toString() : award.value;
            } else if (award.type == glGame.awardtype.VITALITY) {
                this.node_activeLevel.active = true;
                this.activeLevel.string = typeof award.value != "string" ? award.value.toString() : award.value;
            } else if (award.type == glGame.awardtype.DIAMOND&&glGame.user.get("roomSwitch") == 1) {
                this.node_diamond.active = true;
                this.diamond.string = typeof award.value != "string" ? award.value.toString() : award.value;
            }
        }

        this.next = next;
    },

    //触发回调函数
    confirm() {
        if (this.next != null) this.next();
        this.remove();
    }
});

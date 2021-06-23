glGame.showGodOfWealth = "showGodOfWealth";
//财神到账 统一处理 入口
glGame.baseclass.extend({
    properties: {
        caishen_spine: sp.Skeleton,
        lab_money: cc.RichText,
        node_frame: cc.Node,
        node_alltip: cc.Node,
        node_tip2: cc.Node,
        audio_succeed: {
            type: cc.AudioClip,
            default: null,
        },
    },
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.node.on('touchstart', this.touchstart, this);
        this.node.on('touchend', this.touchend, this);
        glGame.emitter.on('onCoinChanged', this.onCoinChangedHandler, this);
        glGame.emitter.on(glGame.showGodOfWealth, this.settingPotionHandler, this);
        glGame.emitter.on(MESSAGE.UI.CHANGE_SCENE_COMPLE, this.onChangeSceneComple, this);
        this.data = null;
        glGame.coinArral = this;
    },
    start() {
        this.node.active = false;
    },
    onCoinChangedHandler(res) {
        let msg = res;
        if (this == undefined || this.node == undefined) {
            console.warn("可能会出现无法弹出 金币到账界面");
            return;
        }
        //抛弃保险柜的取和存的消息，已在原有回包中做自增自减
        if (msg.type == "bankSave" || msg.type == "bankOut") return;
        if (msg.type == 'bindPhoneReceive') {
            glGame.user.set('is_receive_register_phone_coin', 1);
            glGame.emitter.emit("updatePlazaSwitch");
        }
        glGame.user.reqGetCoin()
        let arrvalCoin = glGame.user.GoldTemp(msg.offset)
        if (msg.type == "recharge") {
            glGame.audio.playSoundEffect(this.audio_succeed);
            //充值之后将首冲设为状态取消设置为1；
            glGame.user.set("userRecharge", {
                discount: glGame.user.get("userRecharge").discount,
                discount_max: glGame.user.get("userRecharge").discount_max,
                exists: 1
            })

            if (this.node.active == true) {
                let changeCoin = Number(res.offset)
                let arrvalCoin = this.getFixNumber(changeCoin)
                this.settingPotionHandler({ pos: 3, coin: arrvalCoin });
            } else {
                this.scheduleOnce(() => {
                    if (!this.data) {//如果子游戏没有处理
                        let changeCoin = Number(res.offset)
                        let arrvalCoin = this.getFixNumber(changeCoin)
                        this.settingPotionHandler({ pos: 3, coin: arrvalCoin });
                    }
                }, 0.3);
            }
        }

    },
    settingPotionHandler(res) {
        this.data = res;
        this.showAniHandler();
        this.updatePostion();
    },
    //场景切换的时候
    onChangeSceneComple(sceneName) {
        if (this.node && this.node.active) {
            this.updatePostion();
        }
    },
    updatePostion() {
        if (!this.data) return;
        //红包红屏专用
        if (this.data.pos == 5) this.node_frame.angle = 90;
        else this.node_frame.angle = 0;

        let pos = this.node.getChildByName("pos" + this.data.pos);
        pos.getComponent(cc.Widget).updateAlignment();
        if (pos) {
            this.node_frame.position = pos;
        }
        this.node_frame.scale = glGame.systemclass.convertInterface();
        if (this.node_frame.scale < 1) {
            this.node_frame.x = this.node_frame.x;// * this.node_frame.scale;
            this.node_frame.y = this.node_frame.y;// * this.node_frame.scale;
        }
    },

    showAniHandler() {
        if (!this.data) {
            return;
        }
        this.actionEnd();
        let coin = this.data.coin + "";
        this.node.zIndex = cc.macro.MAX_ZINDEX;
        this.node.active = true;
        this.node.getComponent(cc.Widget).updateAlignment();
        this.node.stopAllActions();
        this.lab_money.active = true;
        this.node_alltip.active = true;
        this.lab_money.string = `<color=#ffffff>您充值的</color><color=#FFC200>${coin}</color><color=#ffffff>金币已到账!</color>`
        this.node.runAction(cc.sequence(cc.delayTime(30), cc.callFunc(() => {
            this.data = null;
            this.node.active = false;
            this.lab_money.active = false;
            this.node_alltip.active = false;
        })));
    },

    actionEnd() {
        this.caishen_spine.setAnimation(0, "looping", true);
        this.caishen_spine.setCompleteListener(() => { });
    },
    touchstart(event) {
    },
    touchend(event) {
        this.data = null;
        this.node.active = false;
        this.lab_money.active = false;
        this.node_alltip.active = false;
        this.node.active = false
    },
    //返回保留两位小数的数值
    getFixNumber(value) {
        return (Number(value).div(100)).toString();
    },
    OnDestroy() {
        glGame.emitter.off('onCoinChanged', this);
        glGame.emitter.off(glGame.showGodOfWealth, this);
        glGame.emitter.off(MESSAGE.UI.CHANGE_SCENE_COMPLE, this);
    }
});

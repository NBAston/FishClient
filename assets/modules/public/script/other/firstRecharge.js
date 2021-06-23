glGame.baseclass.extend({
    properties: {
        audio:{
            type:cc.AudioClip,
            default: null
        },
        lblRebate: cc.Label,
        lblCoin: cc.Label,
    },
    onLoad() {
        this.node.scale = glGame.systemclass.convertInterface();
        glGame.audio.closeCurEffect();
        glGame.audio.playSoundEffect(this.audio,true);
        let userRecharge = glGame.user.get("userRecharge");
        let discount_mode = userRecharge.discount_mode;
        if(discount_mode == 0) {
            discount_mode = 2;
        }

        this.node.getChildByName("btn_querenxiugai").active = true;
        this.node.getChildByName("btn_querenxiugai2").active = false;
        // 奖励模式 1:比例 2:固定
        if(discount_mode == 2) {
            this.lblRebate.string = (userRecharge.discount / 100);
            this.hideDiscountMax();
        } else {
            this.lblRebate.string = (userRecharge.discount / 100) + '%';
            this.lblCoin.string = (userRecharge.discount_max / 100);

            // 无上限
            if(userRecharge.discount_max == -1) {
                this.hideDiscountMax();
            }
        }
    },

    // 隐藏最高上限
    hideDiscountMax() {
        this.node.getChildByName("node2").active = false;
        this.node.getChildByName("btn_querenxiugai").active = false;
        this.node.getChildByName("btn_querenxiugai2").active = true;
    },

    onClick(name, node) {
        switch (name) {
            case "close_eff": this.click_close(); break;
            case "btn_querenxiugai": this.click_close(); break;
            case "btn_querenxiugai2": this.click_close(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_showShop() {
        glGame.panel.firstShowShop(this.node.zIndex);
        this.click_close();
    },
    click_close() {
        this.remove();
    },

});

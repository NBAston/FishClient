glGame.baseclass.extend({

    properties: {
        exchangeBox: cc.Prefab,
        labCoin: cc.Label,
        labDiamonds: cc.Label,
        content: cc.Node,
        item: cc.Node,
        iconList: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.diamondList = [];
        this.registerEvent();
        this.updataInfo();
        this.ReqDiamondShop();
    },
    start() {
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("updateUserData", this.updataInfo, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("updateUserData", this);
    },

    //刷新钻石数量
    updataInfo() {
        this.labCoin.string = this.getFixNumber(glGame.user.get("coin"));
        this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
    },


    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_shop": this.click_shop(); break;
            case "btn_record": this.click_record(); break;
            default:
                if (name.indexOf("item_") > -1) return this.click_item(name);
                break;
        }
    },

    click_shop() {
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        if (glGame.panel.showSuspicious("recharge")) {
            return;
        }
        glGame.panel.showShop();
    },

    click_record() {
        glGame.panel.showPanelByName("diamondRecord");
    },

    click_item(name) {
        let string = name.substring(5), index = Number(string);
        let data = this.diamondList[index];
        let panel = glGame.panel.showPanel(this.exchangeBox);
        let str = '';
        if (data.extraGift > 0) {
            str = `使用<color=#f4c404> ${this.getFixNumber(data.coin)} 金币</color>可兑换<color=#cf62fe> ${this.getFixNumber(data.diamond)} 钻石</color>,并且获得<color=#cf62fe> ${this.getFixNumber(data.extraGift)} 钻石</color>赠礼，总计<color=#cf62fe> ${this.getFixNumber(data.diamond + data.extraGift)} 钻石</color>，是否确定兑换？`;
        } else {
            str = `使用<color=#f4c404> ${this.getFixNumber(data.coin)} 金币</color>可兑换<color=#cf62fe> ${this.getFixNumber(data.diamond)} 钻石</color>，是否确定兑换？`;
        }
        panel.getComponent(panel.name).showMsg(str, () => {
            this.ReqBuyDiamond(data);
        })
    },

    refreshUi() {
        this.content.removeAllChildren();
        for (let index in this.diamondList) {
            let data = this.diamondList[index];
            if (!data) continue;
            let diamondItem = cc.instantiate(this.item);
            diamondItem.active = true;
            diamondItem.name = `item_${index}`;
            diamondItem.getChildByName("img_zuanshidaban").getChildByName("img_icon").getComponent(cc.Sprite).spriteFrame = this.iconList[Math.min(index, this.iconList.length - 1)]
            diamondItem.getChildByName("diamond").getComponent(cc.Label).string = this.getFixNumber(data.diamond)+"钻石";
            diamondItem.getChildByName("coinLayout").getChildByName("coin").getComponent(cc.Label).string = this.getFixNumber(data.coin);
            diamondItem.getChildByName("img_zuanshiredban").active = data.extraGift > 0;
            diamondItem.getChildByName("img_zuanshiredban").getChildByName("extraGift").getComponent(cc.Label).string = `额外赠送${this.getFixNumber(data.extraGift)}钻石`;
            this.content.addChild(diamondItem);
        }
    },

    ReqDiamondShop() {
        glGame.gameNet.send_msg("http.ReqDiamondShop", {}, (route, msg) => {
            this.diamondList = msg.result;
            this.refreshUi();
        })
    },

    ReqBuyDiamond(data) {
        if (data.coin > glGame.user.get("coin")) {
            glGame.panel.showTip(glGame.tips.ROOM.GOLDNOTENOUGH);
            return;
        }
       
        glGame.gameNet.send_msg("http.ReqBuyDiamond", { diamondId: data.id,diamond:data.diamond,coin:data.coin, extraGift:data.extraGift}, (route, msg) => {
            if (msg.result.diamond > 0) {
                let addDiamond = 0;
                addDiamond = msg.result.diamond - glGame.user.diamond
                glGame.user.diamond = msg.result.diamond;
                glGame.panel.showAwardBox("成功获得", [{ type: glGame.awardtype.DIAMOND, value: this.getFixNumber(addDiamond) }]);
                this.updataInfo();
            }else glGame.panel.showErrorTip(glGame.tips.ROOM.EXCHANGEFAIL);
        })
    },


    getFixNumber(value) {
        let value1 = Number(value).div(10);
        value = Number(value).div(100);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else if (~~value1 === value1) {
            return value.toFixed(1);
        } else {
            return value.toFixed(2);
        }
    },

    OnDestroy() {
        this.unRegisterEvent();
    },

})
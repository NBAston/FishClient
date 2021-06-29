
glGame.baseclass.extend({

    properties: {
        content: cc.Node,

        withdrawalPanel: cc.Node,
        withdrawalMyinfo: cc.Node,
        withdrawalItem: cc.Node,

        extensionPanel: cc.Node,
        extensionMyinfo: cc.Node,
        extensionItem: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.extensionpage = 1;
        this.withdrawalpage = 1;
        this.registerEvent();
        glGame.panel.showEffectPariticle(this.node);
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.ReqCashRanking, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    },

    onClick(name, node) {
        switch (name) {
            case "withdrawal":
            case "extension":
                this.switchPanel(name);
                break;
            case "btn_close":
                this.remove();
                break;
            default: console.error("no find button name -> %s", name);
        }
    },
    //请求推广增加(滚动监听)
    reqExtensionAdd(scrollview, eventType) {
        if (eventType == cc.ScrollView.EventType.SCROLL_TO_BOTTOM) {
            if (this.extensionupdateNow) return;
            this.extensionupdateNow = true;
            this.extensionpage++
            if (this.extensionpage > 5) return;
            this.ReqCommissionRanking();
            this.scheduleOnce(function () {
                this.extensionupdateNow = false;
            }, 1);
        }
    },
    //推广佣金榜
    ReqCommissionRanking() {
        let page = this.extensionpage;
        glGame.gameNet.send_msg('http.ReqCommissionRanking', { pageSize: 10, page: page }, (route, msg) => {
            this.updateExtension(msg.data);
        })
    },
    //刷新推广排行
    updateExtension(data) {
        let ranking = data.ranking
        for (let i = 0; i < ranking.length; i++) {
            let extensionItem = cc.instantiate(this.extensionItem);
            extensionItem.parent = this.extensionPanel;
            extensionItem.active = false;
            extensionItem.getChildByName("layout").getChildByName("vip_bg").getChildByName("vipLevel").getComponent(cc.Label).string = ranking[i].vipLevel;
            extensionItem.getChildByName("cashAmount").getComponent(cc.Label).string = this.getFloat(ranking[i].commission);
            extensionItem.getChildByName("layout").getChildByName("name").getComponent(cc.Label).string = ranking[i].nickname;
            extensionItem.getChildByName("logicid").getComponent(cc.Label).string = `ID:${ranking[i].logicId}`;
            extensionItem.getChildByName("teamNumber").getComponent(cc.Label).string = ranking[i].teamNumber;
            glGame.panel.showRemoteImage(extensionItem.getChildByName("mask").getChildByName("head"), ranking[i].headUrl)
            if (extensionItem.getChildByName(`rank_${ranking[i].rank}`)) {
                extensionItem.getChildByName(`rank_${ranking[i].rank}`).active = true;
            } else {
                extensionItem.getChildByName("rankLevel").active = true;
                extensionItem.getChildByName("rankLevel").getComponent(cc.Label).string = ranking[i].rank
            }

        }
        glGame.panel.showEffectNode(this,this.extensionPanel,0.02,true);
        //我的信息
        let myRanking = data.myRanking;
        this.extensionMyinfo.getChildByName("img_wsb").active = myRanking.rank == 0;
        this.extensionMyinfo.getChildByName("rankLevel").active = myRanking.rank != 0;
        this.extensionMyinfo.getChildByName("rankLevel").getComponent(cc.Label).string = myRanking.rank;
        this.extensionMyinfo.getChildByName("teamNumber").getComponent(cc.Label).string = myRanking.teamNumber;
        this.extensionMyinfo.getChildByName("layout").getChildByName("name").getComponent(cc.Label).string = myRanking.nickname;
        this.extensionMyinfo.getChildByName("logicid").getComponent(cc.Label).string = `ID:${myRanking.logicId}`;
        this.extensionMyinfo.getChildByName("cashAmount").getComponent(cc.Label).string = this.getFloat(myRanking.commission);
        this.extensionMyinfo.getChildByName("layout").getChildByName("vip_bg").getChildByName("vipLevel").getComponent(cc.Label).string = myRanking.vipLevel;
        glGame.panel.showRemoteImage(this.extensionMyinfo.getChildByName("mask").getChildByName("head"), myRanking.headUrl);
    },
    //请求提现增加(滚动监听)
    reqWithdrawalAdd(scrollview, eventType) {
        if (eventType == cc.ScrollView.EventType.SCROLL_TO_BOTTOM) {
            if (this.withdrawalupdateNow) return;
            this.withdrawalupdateNow = true;
            this.withdrawalpage++;
            if (this.withdrawalpage > 5) return;
            this.ReqCashRanking();
            this.scheduleOnce(function () {
                this.withdrawalupdateNow = false;
            }, 1);
        }
    },
    //提现金额排行
    ReqCashRanking() {
        let page = this.withdrawalpage;
        glGame.gameNet.send_msg('http.ReqCashRanking', { pageSize: 10, page: page }, (route, msg) => {
            this.updateWithdrawal(msg.data);
        })
    },
    //刷新提现排行
    updateWithdrawal(data) {
        let ranking = data.ranking
        for (let i = 0; i < ranking.length; i++) {
            let withdrawalItem = cc.instantiate(this.withdrawalItem);
            withdrawalItem.parent = this.withdrawalPanel;
            withdrawalItem.active = false;
            withdrawalItem.getChildByName("layout").getChildByName("vip_bg").getChildByName("vipLevel").getComponent(cc.Label).string = ranking[i].vipLevel;
            withdrawalItem.getChildByName("cashAmount").getComponent(cc.Label).string = this.getFloat(ranking[i].cashAmount);
            withdrawalItem.getChildByName("layout").getChildByName("name").getComponent(cc.Label).string = ranking[i].nickname;
            withdrawalItem.getChildByName("logicid").getComponent(cc.Label).string = `ID:${ranking[i].logicId}`;
            glGame.panel.showRemoteImage(withdrawalItem.getChildByName("mask").getChildByName("head"), ranking[i].headUrl)
            if (withdrawalItem.getChildByName(`rank_${ranking[i].rank}`)) {
                withdrawalItem.getChildByName(`rank_${ranking[i].rank}`).active = true;
            } else {
                withdrawalItem.getChildByName("rankLevel").active = true;
                withdrawalItem.getChildByName("rankLevel").getComponent(cc.Label).string = ranking[i].rank
            }

        }
        glGame.panel.showEffectNode(this,this.withdrawalPanel,0.02,true);
        //我的信息
        let myRanking = data.myRanking;
        this.withdrawalMyinfo.getChildByName("img_wsb").active = myRanking.rank == 0;
        this.withdrawalMyinfo.getChildByName("rankLevel").active = myRanking.rank != 0;
        this.withdrawalMyinfo.getChildByName("rankLevel").getComponent(cc.Label).string = myRanking.rank;
        this.withdrawalMyinfo.getChildByName("layout").getChildByName("name").getComponent(cc.Label).string = myRanking.nickname;
        this.withdrawalMyinfo.getChildByName("logicid").getComponent(cc.Label).string = `ID:${myRanking.logicId}`;
        this.withdrawalMyinfo.getChildByName("cashAmount").getComponent(cc.Label).string = this.getFloat(myRanking.cashAmount);
        this.withdrawalMyinfo.getChildByName("layout").getChildByName("vip_bg").getChildByName("vipLevel").getComponent(cc.Label).string = myRanking.vipLevel;
        glGame.panel.showRemoteImage(this.withdrawalMyinfo.getChildByName("mask").getChildByName("head"), myRanking.headUrl);
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    switchPanel(name) {
        this.withdrawalpage = 1;
        this.extensionpage = 1;
        for (let i = 0; i < this.content.childrenCount; i++) {
            this.content.children[i].getChildByName("view").getChildByName("content").removeAllChildren();
            if (this.content.children[i].name == name) {
                this.content.children[i].active = true;
                if (this.extensionPanel.childrenCount == 0 && this.content.children[i].name == name) this.ReqCommissionRanking();
                if (this.withdrawalPanel.childrenCount == 0 && this.content.children[i].name == name) this.ReqCashRanking();
            } else {
                this.content.children[i].active = false;
            }
        }
    },
    OnDestroy(){
        this.unRegisterEvent();
    },
});

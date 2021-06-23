glGame.baseclass.extend({
    properties: {
        audio: {
            type: cc.AudioClip,
            default: null
        },
        shopNomalPanel: cc.Prefab,
        shopFastPanel: cc.Prefab,
        shopAgencyPanel: cc.Prefab,
        shoprecord: cc.Prefab,
        content: cc.Node,
        selecttoggle: cc.Node,
        spineAnim: cc.Node,
        audio_recharge: {
            type: cc.AudioClip,
            default: null
        },
    },
    onLoad() {
        this.currBtn = null;
        this.publicList = {}
        this.publicList[glGame.pay.AGENCYPAY] = "agencypay";         // 1 '代理充值',
        this.publicList[glGame.pay.EXCLUSIVE] = "exclusivepay";      // 2 '专享闪付',
        this.publicList[glGame.pay.FASTPAY] = "fastpay";             // 3 '公司入款',
        this.publicList[glGame.pay.ALIPAY] = "alipay";               // 4 '支付宝充值',
        this.publicList[glGame.pay.WECHATPAY] = "wechatpay";         // 5 '微信充值',
        this.publicList[glGame.pay.BANKCARDPAY] = "bankcardpay";     // 6 '银行卡充值',
        this.publicList[glGame.pay.CLOUDPAY] = "cloudpay";           // 7 '云闪付充值',
        this.publicList[glGame.pay.JINGDONGPAY] = "jingdongpay";      // 8 '京东支付',
        this.publicList[glGame.pay.QQPAY] = "qqpay";                 // 9 'QQ支付',

        this.PrefabList = {
            "agencypay": this.shopAgencyPanel,
            "alipay": this.shopNomalPanel,
            "wechatpay": this.shopNomalPanel,
            "bankcardpay": this.shopNomalPanel,
            "fastpay": this.shopNomalPanel,
            "cloudpay": this.shopNomalPanel,
            "jingdongpay": this.shopNomalPanel,
            "qqpay": this.shopNomalPanel,
        }
        this.RecordData = {};
        glGame.audio.closeCurEffect();
        glGame.audio.playSoundEffect(this.audio, true);
        glGame.emitter.on("showShopUI", this.showUI, this)
        glGame.emitter.on("showSuccessAnim", this.showSuccessAnim, this);
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.shopActionEnd, this);
        glGame.emitter.on("saveCodeToLocalShop", this.saveCodeToLocalShop, this);
        glGame.emitter.on("showrechargeRecord", this.btn_recordCB, this);
        glGame.panel.showEffectPariticle(this.node);
    },
    showUI() {

    },
    showSuccessAnim(msg) {
        this.spineAnim.active = true;
        glGame.audio.playSoundEffect(this.audio_recharge);
        let skeleton = this.spineAnim.getChildByName("skeleton").getComponent(sp.Skeleton)
        skeleton.setAnimation(0, "appears", false);
        skeleton.setCompleteListener((trackEntry, loopCount) => {
            let name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name === 'appears' || name === 'looping') {
                skeleton.setAnimation(0, "looping", true);
            }
        });
    },

    shopActionEnd() {
        glGame.gameNet.send_msg('http.ReqPayClassList', {}, (route, msg) => {
            this.PayTypeList = msg.result.data;
            this.complaint = msg.result.complaint;
            this.setOrder();
        })
    },
    saveCodeToLocalShop() {

    },
    setOrder() {
        let iFirst = true;
        let btnList = this.node.getChildByName("btnList");
        for (let i = 0; i < this.PayTypeList.length; i++) {
            let object = cc.instantiate(btnList.getChildByName(this.publicList[this.PayTypeList[i].id]));
            if (!object) continue;
            object.parent = this.selecttoggle;
            object.x = 0;
            object.active = false;
            if(iFirst){
                this.currBtn = object;
                this.currBtn.getChildByName("checkmark").active = true;
                this.click_Type(this.publicList[this.PayTypeList[i].id]);
            }
            iFirst = false;
            object.setSiblingIndex(i);
            object.getChildByName("recommend").active = this.PayTypeList[i].recommend != 0
            object.getChildByName("freestaff").active = this.PayTypeList[i].giveProportion != 0
            object.getChildByName("freestaff").getChildByName("num").getComponent(cc.Label).string = Number(this.PayTypeList[i].giveProportion).div(100) + "%";
        }
        glGame.panel.showEffectNode(this,this.selecttoggle,0.02,true);

    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },

    onClick(name, node) {
        switch (name) {
            case "close_eff": this.click_close(); break;
            case "wechatpay": 
            case "alipay": 
            case "fastpay":
            case "exclusivepay":
            case "agencypay":
            case "bankcardpay":
            case "cloudpay":
            case "jingdongpay":
            case "qqpay":
                this.currBtn.getChildByName("checkmark").active = false;
                this.currBtn = node;
                this.currBtn.getChildByName("checkmark").active = true;
                this.click_Type(name);
                break;
            case "btn_fanhuishouye": this.btn_fanhuishouyeCB(); break;
            case "btn_zaichongyici": this.btn_zaichongyiciCB(); break;
            case "btn_record": this.btn_recordCB(); break;
            case "btn_closeAni": this.spineAnim.active = false; break;
            default: console.error("no find button name -> %s", name);
        }
    },
    ReqPayType(typeId, name) {
        let Prefab = this.PrefabList[name]
        if (this.RecordData[typeId]) {
            let panel = glGame.panel.showChildPanel(Prefab, this.content);
            let script = panel.getComponent(Prefab.name);
            script.initUI(this.RecordData[typeId].result)
            return
        }
        glGame.gameNet.send_msg('http.ReqPayClass', { typeId: typeId }, (route, msg) => {
            let panel = glGame.panel.showChildPanel(Prefab, this.content);
            let script = panel.getComponent(Prefab.name);
            if (typeId == 1) {
                msg.result.complaint = this.complaint;
            }
            script.initUI(msg.result)
            this.RecordData[typeId] = msg;
        })
    },
    btn_recordCB() {
        glGame.panel.showChildPanel(this.shoprecord, this.node);
    },
    btn_fanhuishouyeCB() {
        this.remove()
    },
    btn_zaichongyiciCB() {
        this.spineAnim.active = false
        this.spineAnim.getChildByName("img_czcg").active = false;
        this.spineAnim.getChildByName("img_rycp").active = false;
    },
    click_close() {
        this.remove()
    },
    click_Type(name) {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        let index = this.getIndex(name)
        let id = this.PayTypeList[index].id;
        this.ReqPayType(id, name)
    },
    getIndex(name) {
        let payid = 0;
        for (let id in this.publicList) {
            if (this.publicList[id] == name) {
                payid = id;
                break;
            }
        }
        for (let index in this.PayTypeList) {
            if (this.PayTypeList[index].id == payid) {
                return index;
            }
        }
    },
    OnDestroy() {
        glGame.emitter.off("showShopUI", this);
        glGame.emitter.off("showSuccessAnim", this);
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
        glGame.emitter.off("saveCodeToLocalShop", this);
        glGame.emitter.off("showrechargeRecord", this);
    }
});

glGame.baseclass.extend({
    properties: {
        achievementStr: cc.Label,
        nextStr: cc.Label,
        rebaterate: cc.Node,
        rebate_item: cc.Node,
    },
    onLoad() {
        this.ruleDetaildata = null;
        this.index = 0;
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
        }
    },
    initUI(data, achievement) {
        this.ruleDetaildata = data;
        this.achievementStr.string = this.getFloat(achievement);
        let count = this.ruleDetaildata.length;

        if (achievement >= this.ruleDetaildata[count - 1].exp) {
            this.nextStr.string = 0;
            this.index = count - 1;
        }else{
            for (let i = 0; i < count; i++) {
                if (this.ruleDetaildata[i].exp > achievement) {
                    this.nextStr.string = this.getFloat(this.ruleDetaildata[i].exp - achievement);
                    this.index = i - 1;
                    break;
                }
            }
        }


        for (let i = 0; i < this.ruleDetaildata.length; i++) {
            let rebateItem = cc.instantiate(this.rebate_item);
            rebateItem.parent = this.rebaterate;
            rebateItem.active = false;
            rebateItem.getChildByName("bg").active = i % 2 == 1;
            if (this.index == i) {
                rebateItem.getChildByName("bg").active = false;
                rebateItem.getChildByName("img_picxz").active = true;
            }
            rebateItem.getChildByName("level").getComponent(cc.Label).string = this.ruleDetaildata[i].level;
            let strText = "";
            if (this.ruleDetaildata[i + 1]) {
                strText = `<color=#f4c404>${this.getExpNumber(this.ruleDetaildata[i].exp)}</color>${this.getExpText(this.ruleDetaildata[i].exp)} - <color=#f4c404>${this.getExpNumber(this.ruleDetaildata[i + 1].exp)}</color>${this.getExpText(this.ruleDetaildata[i + 1].exp)}`;
            } else {
                strText = `<color=#f4c404>${this.getExpNumber(this.ruleDetaildata[i].exp)}</color>${this.getExpText(this.ruleDetaildata[i].exp)}以上`
            }
            rebateItem.getChildByName("money").getComponent(cc.RichText).string = strText;
            rebateItem.getChildByName("rete").getComponent(cc.RichText).string = `每万返佣<color=#f4c404>${this.getFloat(this.ruleDetaildata[i].reward)}</color>元`;
        }
        glGame.panel.showEffectNode(this,this.rebaterate,0.02,true);
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    getExpNumber(num) {
        return num >= 1000000 ? `${Number(num).div(1000000)}` : `${Number(num).div(100)}`;
    },
    getExpText(num) {
        return num >= 1000000 ? `万` : ``;
    },
    OnDestroy() {

    },
});

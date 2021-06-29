
const valueDirt = [
    { name: '今天', value: 0, type: "day" },
    { name: '昨天', value: 1 * 24 * 60 * 60 * 1000, type: "day" },
    { name: '前天', value: 2 * 24 * 60 * 60 * 1000, type: "day" },
    { name: '本周', value: 0, type: "week" },
    { name: '上周', value: 7 * 24 * 60 * 60 * 1000, type: "week" },
]

glGame.baseclass.extend({
    properties: {
        //
        
        //打码量
        bet_lab: cc.Label,
        betScroll: cc.Node,
        betContent: cc.Node,
        betItem: cc.Node,
        //奖励金额
        award_lab: cc.Label,
        awardScroll: cc.Node,
        awardContent: cc.Node,
        awardItem: cc.Node,

        //时间选项
        typeContent: cc.Node,
        typeItem: cc.Node,
        typeScr: cc.Node,
        mask: cc.Node,
        type_lab: cc.Label,

        safebox_lab: cc.Label,
        coin_lab: cc.Label,

        norecord: cc.Node,
    },
    onLoad() {
        this.timeIndex = 0;
        this.endTime = null;
        this.startTime = null;
        this.summary = {};
        this.statementList = [];
        this.bInit = false;

        this.registerEvent();
        this.initCoin();
        this.allbet_cb();
        this.initTypeUI();
    },

    start() {
        this.searchByTime();
    },

    initCoin() {
        this.safebox_lab.string = this.cutFloat(glGame.user.get("bank_coin"));
        this.coin_lab.string = this.cutFloat(glGame.user.get("coin"));
    },


    onClick(name, node) {
        switch (name) {
            case "btn_selectType": this.selectType_cb(); break;
            case "mask": this.mask_cb(); break;
            case "btn_allbet": this.allbet_cb(); break;
            case "btn_allaward": this.allaward_cb(); break;
            default:
                if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
                break;
        }
    },

    allbet_cb() {
        if (this.betScroll.active) return;
        this.awardScroll.active = false;
        this.betScroll.active = true;
        this.click_typeItem("typeItem0");
    },

    allaward_cb() {
        if (this.awardScroll.active) return;
        this.betScroll.active = false;
        this.awardScroll.active = true;
        this.click_typeItem("typeItem0");
    },

    click_typeItem(name) {
        let string = name.substring(8);
        this.type_lab.string = valueDirt[Number(string)].name;
        this.typeScr.active = this.mask.active = false;
        this.timeIndex = Number(string);      //全部游戏不传这个字段就OK
        this.searchByTime();
    },

    initTypeUI() {
        let typeItem = null;
        for (let key in valueDirt) {
            if (!valueDirt[key]) continue;
            typeItem = cc.instantiate(this.typeItem);
            typeItem.name = `typeItem${key}`
            typeItem.getChildByName("label").getComponent(cc.Label).string = valueDirt[key].name;
            typeItem.parent = this.typeContent;
            typeItem.active = true;
        }

        if(typeItem) {
            typeItem.getChildByName("img_xialafengexian").active = false;
        }

        this.typeScr.height = this.typeContent.childrenCount<=10?this.typeContent.childrenCount*this.typeItem.height:10*this.typeItem.height;
    },

    initUi() {
        let data = this.statementList[this.timeIndex];
        
        if(!this.bInit) {
            this.bet_lab.string = this.cutFloat(data.betTotalCoin);
            this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
            this.initBetScrollUI();
            this.initAwardScrollUI();
            this.bInit = true;
            return;
        }

        if(this.betScroll.active) {
            this.bet_lab.string = this.cutFloat(data.betTotalCoin);
            this.initBetScrollUI();    
        } else {
            this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
            this.initAwardScrollUI();    
        }
    },

    initBetScrollUI() {
        let list = this.statementList[this.timeIndex].betList;
        this.betContent.removeAllChildren();
        if (list.length == 0) {
            this.norecord.active = true;
            return;
        }

        this.norecord.active = false;

        let stripMax = 3;
        let count = Math.ceil(list.length / stripMax);
        let stripName = ['leftLabel', 'middleLabel', 'rightLabel'];
        for (let i = 0; i < count; i++) {
            let node = cc.instantiate(this.betItem);
            node.parent = this.betContent;
            node.active = false;
            node.getChildByName("bg").active = i % 2 != 0;

            let stripCount = Math.min((i + 1) * stripMax);
            for (let index = i * stripMax; index < stripCount; index++) {
                let nodeLabel = node.getChildByName(stripName[index % stripMax]);
                if (index >= list.length) nodeLabel.active = false;
                else {
                    nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
                    nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
                    glGame.panel.settingTableLabelColor(nodeLabel.getChildByName('coin'));
                }
            }
        }

        glGame.panel.showEffectNode(this,this.betContent,0.02,true);
    },

    initAwardScrollUI() {
        let list = this.statementList[this.timeIndex].rewardList;
        this.awardContent.removeAllChildren();
        if (list.length == 0) return;
        let stripMax = 2;
        let count = Math.ceil(list.length / stripMax);
        let stripName = ['leftLabel', 'rightLabel'];
        for (let i = 0; i < count; i++) {
            let node = cc.instantiate(this.awardItem);
            node.parent = this.awardContent;
            node.active = false;
            node.getChildByName("bg").active = i % 2 != 0;

            let stripCount = Math.min((i + 1) * stripMax);
            for (let index = i * stripMax; index < stripCount; index++) {
                let nodeLabel = node.getChildByName(stripName[index % stripMax]);
                if (index >= list.length) nodeLabel.active = false;
                else {
                    nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
                    nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
                }
            }
        }

        glGame.panel.showEffectNode(this,this.awardContent,0.02,true);
    },
    selectType_cb() {
        this.typeScr.active = !this.typeScr.active;
        if (this.typeScr.active) this.mask.active = true;
    },
    mask_cb() {
        this.typeScr.active = this.mask.active = false;
    },

    ReqReport() {
        if (this.statementList[this.timeIndex]) {
            this.initUi();
            return;
        }
        let msg = {};
        msg.type = this.timeIndex + 1;

        glGame.gameNet.send_msg('http.ReqReport', msg, (route, data) => {
            this.statementList[this.timeIndex] = data;

            this.initUi();
        })
    },

    cutTimeString(time) {
        let newTime = new Date(time);
        let y = newTime.getFullYear();
        let m = (newTime.getMonth() + 1) < 10 ? "0" + (newTime.getMonth() + 1) : (newTime.getMonth() + 1);
        let d = newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
        let strTime = y + "-" + m + "-" + d;
        return strTime;
    },



    searchByTime() {
        let index = this.timeIndex;
        if (valueDirt[index].type == "day") {
            let startTime = Date.now() - valueDirt[index].value;
            this.startTime = this.cutTimeString(startTime);
            this.endTime = this.cutTimeString(startTime);
        } else if (valueDirt[index].type == "week") {
            let startTime = Date.now() - valueDirt[index].value;
            let newTime = new Date(startTime);
            let y = newTime.getFullYear();
            let m = newTime.getMonth();
            let d = newTime.getDate();
            let wd = newTime.getDay() == 0 ? 7 : newTime.getDay();
            var weekStartDate = new Date(y, m, d - wd + 1);
            var weekEndDate = new Date(y, m, d + (6 - wd) + 1);

            this.startTime = this.cutTimeString(weekStartDate);
            this.endTime = this.cutTimeString(weekEndDate);
        } else {
            this.endTime = null;
            this.startTime = null;
        }
        this.ReqReport();
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("updateUserData", this.initCoin, this);
        glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("updateUserData", this);
        glGame.emitter.off("userinfo_switchFace",this);
    },
    closeDown(){
        this.typeScr.active = this.mask.active = false;
    },
    OnDestroy() {
        this.unRegisterEvent();
    },

    //浮点型运算取俩位
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
});

glGame.baseclass.extend({
    properties: {
        norecord: cc.Node,//noneLab
        infoItem: cc.Node,
        content: cc.Node,
        Lab_CurPage: cc.Label,
        Lab_totalPage: cc.Label,

        //up
        direct_achievement: cc.Label,
        achievement: cc.Label,
        commission: cc.Label,
    },
    onLoad() {
        this.page = 1;
        this.Lab_CurPage.string = this.page;
        this.recordReqData = { id: "", nickname: "" };
    },
    
    onClick(name, node) {
        switch (name) {
            case "btn_pageup": this.pageup_CB(); break;
            case "btn_pagedown": this.pagedown_CB(); break;
            //case "btn_detail": this.btn_detailCB(node); break;
            default: break;
        }
    },
    ReqPlayerExtensionCountlessDaily() {
        let id = this.recordData.id,
            nickname = this.recordData.nickname,
            page = this.page;
        this.Lab_CurPage.string = this.page;
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessDaily', { page: page, page_size: 8, id: id, nickname: nickname }, (route, msg) => {
            this.recordData = msg;
            this.Lab_totalPage.string = this.recordData.page_total == 0 ? 1 : this.recordData.page_total;
            this.setTable(this.recordData.list)
        })
    },
    initUI(data) {
        this.recordData = data
        this.direct_achievement.string = this.getFloat(this.recordData.direct_achievement);
        this.achievement.string = this.getFloat(this.recordData.achievement);
        this.commission.string = this.getFloat(this.recordData.commission);
        this.Lab_totalPage.string = this.recordData.page_total == 0 ? 1 : this.recordData.page_total;
        this.setTable(this.recordData.list)
        
    },
    setTable(data) {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();

        let count = data.length;
        if (count == 0) {
            this.norecord.active = true;
            return;
        }
        this.hiadShowNode(count > 0);
        for (let i = 0; i < count; i++) {
            let infoItem = cc.instantiate(this.infoItem);
            infoItem.parent = this.content;
            infoItem.active = false;
            infoItem.getChildByName("bg").active = i % 2 == 1;
            infoItem.getChildByName("member").getComponent(cc.Label).string = data[i].logicid;
            infoItem.getChildByName("name").getComponent(cc.Label).string = data[i].nickname;
            infoItem.getChildByName("achievement").getComponent(cc.Label).string = this.getFloat(data[i].bet);      //打码量
            let achievecontribu = infoItem.getChildByName("achievecontribu")
            achievecontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission);    //直推
            glGame.panel.settingTableLabelColor(achievecontribu);
            infoItem.getChildByName("teamcontribu").getComponent(cc.Label).string = this.getFloat(data[i].achievement);                     //团队业绩
            let rankcontribu = infoItem.getChildByName("rankcontribu")
            rankcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_sub_commission);       //级差佣金
            glGame.panel.settingTableLabelColor(rankcontribu);
            let totalcontribu = infoItem.getChildByName("totalcontribu")
            totalcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission + data[i].contribute_sub_commission);
            glGame.panel.settingTableLabelColor(totalcontribu);
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true);
    },
    hiadShowNode(isBool) {
        this.node.getChildByName("btn_pageup").active = isBool;
        this.node.getChildByName("pagelayout").active = isBool;
        this.node.getChildByName("btn_pagedown").active = isBool;
        this.node.getChildByName("explain").active = isBool;
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },

    pageup_CB() {
        this.page--
        if (this.page < 1) {
            this.page = 1
            return
        }
        this.ReqPlayerExtensionCountlessDaily()
    },
    pagedown_CB() {
        this.page++;
        if (this.page > Number(this.Lab_totalPage.string)) {
            this.page = Number(this.Lab_totalPage.string);
            return
        }
        this.ReqPlayerExtensionCountlessDaily()
    },
    set(key, value) {
        this[key] = value;
    },
    OnDestroy() {

    },
});

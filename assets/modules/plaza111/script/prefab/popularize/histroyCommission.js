glGame.baseclass.extend({
    properties: {
        Lab_time: cc.Label,
        infoItem: cc.Node,
        content: cc.Node,
        Lab_CurPage: cc.Label,
        Lab_totalPage: cc.Label,
    },
    onLoad() {
        this.CurPage = 1;
        this.Lab_CurPage.string = this.CurPage;
        this.recordData = {};
    },

    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_pageup": this.pageup_CB(); break;
            case "btn_pagedown": this.pagedown_CB(); break;
        }
    },
    ReqPlayerExtensionCountlessRecordDetail(page = 1) {
        let date = this.curdate;
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecordDetail', { page: page, date: date, page_size: 8 }, (route, msg) => {
            console.log("这是当前数据",msg)
            this.recordData[this.CurPage] = msg
            
            this.setTable(this.recordData[this.CurPage].list)
        })
    },
    initUI(data, date) {
        this.curdate = date;
        this.recordData[this.CurPage] = data;
        this.Lab_time.string = this.curdate;
        this.Lab_totalPage.string = data.page_total;
        this.setTable(data.list)
        console.log("这是历史佣金明细的消息", data)
    },
    setTable(data) {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let infoItem = cc.instantiate(this.infoItem);
            infoItem.parent = this.content;
            infoItem.active = true;
            infoItem.getChildByName("bg").active = i%2;
            infoItem.getChildByName("member").getComponent(cc.Label).string = data[i].logicid;
            infoItem.getChildByName("name").getComponent(cc.Label).string = data[i].nickname;
            infoItem.getChildByName("achievement").getComponent(cc.Label).string = this.getFloat(data[i].bet);  //打码量
            let achievecontribu = infoItem.getChildByName("achievecontribu")
            achievecontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission);    //直推佣金
            glGame.panel.settingTableLabelColor(achievecontribu);
            infoItem.getChildByName("teamcontribu").getComponent(cc.Label).string = this.getFloat(data[i].achievement);                     //团队业绩
            let rankcontribu = infoItem.getChildByName("rankcontribu")
            rankcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_sub_commission);       //级差佣金贡献
            glGame.panel.settingTableLabelColor(rankcontribu);
            let totalcontribu = infoItem.getChildByName("totalcontribu")
            totalcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission + data[i].contribute_sub_commission);//总贡献佣金
            glGame.panel.settingTableLabelColor(totalcontribu);
        }
    },
    pageup_CB() {
        this.CurPage--
        
        if (this.CurPage < 1) {
            this.CurPage = 1
            return
        }
        this.Lab_CurPage.string = this.CurPage;
        this.ReqPlayerExtensionCountlessRecordDetail(this.CurPage)
    },
    pagedown_CB() {
        this.CurPage++
        
        if (this.CurPage > Number(this.Lab_totalPage.string)) {
            this.CurPage = Number(this.Lab_totalPage.string)
            return
        }
        this.Lab_CurPage.string = this.CurPage;
        this.ReqPlayerExtensionCountlessRecordDetail(this.CurPage)
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    OnDestroy() {

    },
});

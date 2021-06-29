glGame.baseclass.extend({
    properties: {
        now_get_commission: cc.Label,
        yet_get_commission: cc.Label,
        history_commission: cc.Label,

        norecord: cc.Node,//noneLab
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
            case "btn_pageup": this.btn_pageupCB(); break;
            case "btn_pagedown": this.btn_pagedownCB(); break;
        }
    },
    initUI(pandectdata, data) {
        this.pandectdata = pandectdata;
        this.recordData[this.CurPage] = data;
        this.now_get_commission.string = this.getFloat(this.pandectdata.data.can_receive_extension);
        this.yet_get_commission.string = this.getFloat(this.pandectdata.data.received_profit);
        this.history_commission.string = this.getFloat(this.pandectdata.data.history_commission);

        this.Lab_totalPage.string = this.recordData[this.CurPage].page_total == 0 ? 1 : this.recordData[this.CurPage].page_total;
        this.setTable(this.recordData[this.CurPage].list);
    },
    ReqPlayerExtensionCountlessFlow(page = 1, page_size = 8) {
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessFlow', { page: page, page_size: page_size }, (route, msg) => {
            this.recordData[this.CurPage] = msg;
            this.Lab_CurPage.string = page;
            this.setTable(this.recordData[this.CurPage].list)
        })
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
            infoItem.getChildByName("time").getComponent(cc.Label).string = data[i].create_time;
            let teamMembler = infoItem.getChildByName("teamMembler")
            // teamMembler.color = data[i].number < 0 ? glGame.plazaColor.loss : glGame.plazaColor.gain
            teamMembler.getComponent(cc.Label).string = this.getFloat(data[i].number);
            glGame.panel.settingTableLabelColor(teamMembler);
            infoItem.getChildByName("state").getComponent(cc.Label).string = this.getStringState(data[i].state);
            infoItem.getChildByName("state").color = this.getColor(data[i].state);
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
    getColor(state) {
        let color = cc.color(0x00, 0xff, 0x36);
        switch (state) {
            case 0: case 1: case 4:
                color = cc.color(0x00, 0xff, 0x36);
                break;
            case 2: case 3:
                color = cc.color(0x66, 0xcc, 0xc8);
                break;
            case 5:
            case 6:
                color = cc.color(0x66, 0x90, 0xcc);
                break;
        }
        return color;
    },
    getStringState(state) {
        let color = "审核中"
        switch (state) {
            case 0: case 1: case 4:
                color = "已发放"
                break;
            case 2: case 3:
                color = "审核中"
                break;
            case 5:
                color = "取消退回"
                break
            case 6:
                color = "审核拒绝"
                break;
        }
        return color;
    },
    btn_pagedownCB() {
        this.CurPage++
        if (this.CurPage > this.Lab_totalPage.string) {
            this.CurPage = this.Lab_totalPage.string
            return
        }
        this.ReqPlayerExtensionCountlessFlow(this.CurPage)
    },
    btn_pageupCB() {
        this.CurPage--
        if (this.CurPage < 1) {
            this.CurPage = 1
            return
        }
        this.ReqPlayerExtensionCountlessFlow(this.CurPage)
    },
    OnDestroy() {

    },
});

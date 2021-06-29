//捕鱼：记录
glGame.baseclass.extend({
    properties: {
        recorditem: cc.Node,
        recordview: cc.Node,
        norecord: cc.Node,
        tip: cc.Node,
        title: cc.Node,
        lab_page: cc.Label,
        pre_detail:cc.Prefab,
    },
    onLoad() {
        this.node.scale = glGame.systemclass.convertInterface();
        this.node.x = this.node.x * glGame.systemclass.convertInterface();
        this.node.y = this.node.y * glGame.systemclass.convertInterface();
        glGame.panel.showRoomJuHua();
        this.pageIndex  = 1;
        this.pageSize   = 7;
        this.pageCount  = 0;
        this.gameID     = glGame.scenetag.FISH2;
        this.gameLevel  = glGame.room.getRoomType(this.gameID);
        this.gameRecord = null;
        this.isLoadingData = false;
        this.registerEvent();
    },
    recordActionEnd(){
        glGame.gameNet.send_msg('http.ReqUserFishingHandRecords', { gameid: this.gameID , page_size: this.pageSize , page:this.pageIndex}, this.resetPanelData.bind(this));
    },

    registerEvent() {
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.recordActionEnd, this);
    },
    unRegisterEvent() {
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    },
    //接收牌局详情数据
    resetPanelData(route, msg) {
        if(this.recordview == null)return;
        this.isLoadingData = false;
        this.recordview.destroyAllChildren();
        this.pageIndex = msg.current_page;
        this.pageCount = msg.total_page;
        this.lab_page.string = `第${msg.current_page}/${msg.total_page}页`;
        this.gameRecord = msg.list;
        glGame.panel.closeRoomJuHua();
        let count = this.gameRecord ? this.gameRecord.length : 0;
        for (let i = 0; i < count; i++) {
            let panel = cc.instantiate(this.recorditem);
            panel.name = `detail_${i}`;
            let recordData = this.gameRecord[i];
            cc.warn(">> recordData ",recordData)
            let hand_number = recordData["hand_number"];//牌局编号
            let profit = Number(recordData["number"]);//结算
            let gainFee = Number(this.cutDownNum(recordData["gainFee"]));//抽水
            let bet_coin = this.cutDownNum(Number(recordData["bet_coin"]));//炮弹金额
            let coin = Number(Number(this.cutDownNum(profit)) + gainFee + Number(bet_coin)).toFixed(2);//捕获金额
            let roomStr = this.gameLevel[recordData["bettype"]];//房间

            panel.getChildByName("img_tiao").active = i % 2 != 0;
            panel.getChildByName("lab_no").getComponent(cc.Label).string = hand_number + "";
            panel.getChildByName("lab_room").getComponent(cc.Label).string = roomStr + "";
            panel.getChildByName("lab_bullteCoin").getComponent(cc.Label).string = bet_coin + "";
            panel.getChildByName("lab_coin").getComponent(cc.Label).string = coin + "";
            let number = panel.getChildByName(profit > 0 ? "lab_win" : "lab_lost");
            number.getComponent(cc.Label).string = profit > 0 ? `+${this.cutDownNum(profit)}` : this.cutDownNum(profit);
            panel.getChildByName("lab_endTime").getComponent(cc.Label).string = recordData["end_time"];
            number.active = true;
            panel.active = false;
            panel.parent = this.recordview;
            panel.recordData = recordData;
            panel.getChildByName("btn_zidananniu").on(cc.Node.EventType.TOUCH_START,this.showBulletDetailHandler,this);
            panel.getChildByName("btn_fishanniu").on(cc.Node.EventType.TOUCH_START,this.showFishDetail2Handler,this);
        }
        glGame.panel.showEffectNode(this,this.recordview,0.02,true);
        this.norecord.active = count < 1;
        this.node.getChildByName("lab_tab").active = count > 0;
        this.node.getChildByName("btn_last").active = count > 0;
        this.node.getChildByName("btn_next").active = count > 0;
        this.node.getChildByName("ui_txt_line").getChildByName("lab_tip").active = count > 0;
    },
    showBulletDetailHandler(evt){
        this.viewtype = 1;
        this.showDetailHandler(evt);
    },
    showFishDetail2Handler(evt){
        this.viewtype = 2;
        this.showDetailHandler(evt);
    },
    showDetailHandler(evt){
        let hand_number = evt.currentTarget.parent.getChildByName("lab_no").getComponent(cc.Label).string;
        glGame.gameNet.send_msg('http.ReqUserFishingInfoHandRecords', { gameid: this.gameID , hand_number:hand_number}, (route, msg) => {
            if(msg.record == "" || msg.record == undefined){
                cc.error(">>msg is null > ",msg)
                return;
            }
            let list = JSON.parse(msg.record);
            cc.warn(">>list ",list)
            let detailsNode = cc.instantiate(this.pre_detail);
            detailsNode.getComponent("nfish_recordDetails").initDetView(evt.currentTarget.parent.recordData,list,this.viewtype);
            let recordDetails = this.node.getChildByName("recordDetails");
            recordDetails.active = true;
            detailsNode.parent = recordDetails;
        })
    },
    onClick(name, node) {
        switch (name) {
            case "ui_BtnClose": this.remove(); break;
            case 'btn_last':
                this.pageIndex--;
                this.submit();
                break;
            case 'btn_next':
                this.pageIndex++;
                this.submit();
                break;
            default:
                break;
        }
    },
    submit() {
        if(this.isLoadingData)return;
        this.isLoadingData = true;
        if (this.pageIndex < 1) {
            glGame.panel.showTip('当前已经是第一页！');
            this.pageIndex = 1;
            this.isLoadingData = false;
            return;
        }
        if (this.pageIndex > this.pageCount) {
            glGame.panel.showTip('当前已经是最后一页！');
            this.pageIndex = this.pageCount;
            this.isLoadingData = false;
            return;
        }
        glGame.panel.showRoomJuHua();
        //获取用户的牌局记录
        glGame.gameNet.send_msg('http.ReqUserFishingHandRecords', { gameid: this.gameID , page_size: this.pageSize , page:this.pageIndex}, this.resetPanelData.bind(this));
    },
    //截取小数点后两位
    cutDownNum(value, num = 2) {
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.div(100).toString();
        } else {
            value = Number(value).div(100);
            return (Math.floor(value * 100) / 100).toFixed(num);
        }
    },
    OnDestroy() {
        this.unRegisterEvent();
        this.gameRecord = null;
    },
});
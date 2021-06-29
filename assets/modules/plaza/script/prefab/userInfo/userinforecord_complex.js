glGame.baseclass.extend({
    properties: {
        gameView: cc.Node,
        lab_game: cc.Label,
        gameContent: cc.Node,

        typeView: cc.Node,
        lab_type: cc.Label,
        typeContent: cc.Node,

        platView: cc.Node,
        lab_plat: cc.Label,
        platContent: cc.Node,

        content: cc.Node,

        wordItem: cc.Node,
        infoItem: cc.Node,

        pageInfo: cc.Label,
        norecord: cc.Node,
        infonode: cc.Node,
    },
    onLoad() {
        this.pageIndex = 1;
        this.typeIndex = 0;
        this.platIndex = 0;
        this.gameIndex = 0;
        this.pageCount = 0;

        this.typeId = 0
        this.platId = 0
        this.gameId = 0;
        // this.ComplexTypesData = null // 类型数据
        // this.ComplexPlatsData = null // 平台数据
        // this.ComplexGamesData = null // 游戏数据
        this.registerEvent();
        this.recordPageData = {};//记录
        this.sendReqBetFlow();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_lastPage": this.lastPage_cb(); break;
            case "btn_nextPage": this.nextPage_cb(); break;
            case "btn_type": this.btn_type_cb(); break;
            case "btn_plat": this.btn_plat_cb(); break;
            case "btn_game": this.btn_game_cb(); break;
            case "gameView": this.gameView.active = false; break;
            case "typeView": this.typeView.active = false; break;
            case "platView": this.platView.active = false; break;
            default:
                if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
                if (name.indexOf("platItem") > -1) return this.click_platItem(name);
                if (name.indexOf("gameItem") > -1) return this.click_gameItem(name);
                break;
        }
    },
    closeDown(){
        this.gameView.active = false;
        this.typeView.active = false;
        this.platView.active = false;
    },
    btn_type_cb() {
        this.sendReqComplexTypes();
    },
    btn_plat_cb() {
        //this.initPlats();
        this.sendReqComplexPlats();
    },
    btn_game_cb() {
        this.sendReqComplexGames();
    },
    //获取综合版类型数据
    sendReqComplexTypes() {
        if (this.ComplexTypesData) return this.initComplexTypes();
        glGame.gameNet.send_msg('http.ReqComplexTypes', null, (route, data) => {
            this.ComplexTypesData = data;
            this.initComplexTypes();
        })
    },
    //获取综合版平台数据
    sendReqComplexPlats() {
        if(this.typeId == 0)return glGame.panel.showTip("请先选择类型")
        let id = this.ComplexTypesData[this.typeIndex].id;
        console.log("这是发送的id",this.ComplexTypesData,this.typeIndex,id)
        glGame.gameNet.send_msg('http.ReqComplexPlats', { type: id }, (route, data) => {
            this.ComplexPlatsData = data;
            this.initPlats();
        })
    },
    //获取综合版游戏数据
    sendReqComplexGames() {
        if(this.platId == 0)return glGame.panel.showTip("请先选择平台")
        let msg = {
            model: 2,
            typeId: this.typeId,
            platId: this.platId,
        }
        glGame.gameNet.send_msg('http.ReqComplexGames', msg, (route, data) => {
            this.ComplexGamesData = data
            this.initGames();
        })
    },

    sendReqBetFlow() {
        let msg = {
            model: 2,
            typeId: this.typeId,
            platId: this.platId,
            gameId: this.gameId,
            page: this.pageIndex,
            pageSize: 6
        }
        console.log("这是当前的消息",msg)
        if (this.recordPageData[msg.typeId] && this.recordPageData[msg.typeId][msg.platId] &&
            this.recordPageData[msg.typeId][msg.platId][msg.gameId] && this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex]) {
            this.BetFlowData = this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex];
            let total_page = this.BetFlowData.result.total_page == 0 ? 1 : this.BetFlowData.result.total_page;
            this.pageCount = total_page;
            this.pageInfo.string = `第${this.pageIndex}/${total_page}页`;
            this.initBetFlow();
            return
        }
        console.log("这是发送的详情信息", msg)
        glGame.gameNet.send_msg('http.reqBetFlow', msg, (route, data) => {
            this.BetFlowData = data;
            let total_page = this.BetFlowData.result.total_page == 0 ? 1 : this.BetFlowData.result.total_page;
            this.pageInfo.string = `第${this.pageIndex}/${total_page}页`;
            this.pageCount = total_page;
            this.recordPageData[msg.typeId] ? null : this.recordPageData[msg.typeId] = {};
            this.recordPageData[msg.typeId][msg.platId] ? null : this.recordPageData[msg.typeId][msg.platId] = {};
            this.recordPageData[msg.typeId][msg.platId][msg.gameId] ? null : this.recordPageData[msg.typeId][msg.platId][msg.gameId] = {};
            this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex] ? null : this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex] = {};
            this.recordPageData[msg.typeId][msg.platId][msg.gameId][this.pageIndex] = data;
            this.initBetFlow();
        })
    },
    //生成记录内容
    initBetFlow() {
        this.content.destroyAllChildren();
        let list = this.BetFlowData.result.list;

        if(list.length == 0) {
            this.norecord.active = true;
            this.infonode.active = false;
            return;
        }

        this.norecord.active = false;
        this.infonode.active = true;

        for (let i = 0; i < list.length; i++) {
            let infoItem = cc.instantiate(this.infoItem);
            infoItem.parent = this.content;
            infoItem.getChildByName("bg").active = i%2==0;
            let timeStamp = new Date(list[i].settlementTime);
            let strTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1)}/${timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate()}`
            strTime += `（${glGame.tips.WEEKNAME[timeStamp.getDay()]}）`
            strTime += `${timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours()}:`
            strTime += `${timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes()}:`
            strTime += `${timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds()}`
            infoItem.getChildByName("lab_time").getComponent(cc.Label).string = strTime
            infoItem.getChildByName("lab_type").getComponent(cc.Label).string = list[i].typeName
            infoItem.getChildByName("lab_plat").getComponent(cc.Label).string = list[i].platName
            infoItem.getChildByName("lab_gamename").getComponent(cc.Label).string = list[i].gameName;
            infoItem.getChildByName("lab_playNumber").getComponent(cc.Label).string = this.cutFloat(list[i].betAmount)
            infoItem.getChildByName("lab_rewarCoin").getComponent(cc.Label).string = this.cutFloat(list[i].netAmount)
            glGame.panel.settingTableLabelColor(infoItem.getChildByName("lab_rewarCoin"));
        }
        glGame.panel.showEffectNode(this, this.content, 0.02, true);
    },
    //生成游戏分类内容
    initComplexTypes() {
        this.typeContent.destroyAllChildren();
        let wordItem = cc.instantiate(this.wordItem);
        wordItem.name = `typeItemAll`
        wordItem.getChildByName("label").getComponent(cc.Label).string = '全部'
        wordItem.parent = this.typeContent;
        wordItem.active = true;
        for (let i = 0; i < this.ComplexTypesData.length; i++) {
            let wordItem = cc.instantiate(this.wordItem);
            wordItem.parent = this.typeContent;
            wordItem.active = true;
            wordItem.name = `typeItem${i}`
            wordItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexTypesData[i].name;
            if(i == this.ComplexTypesData.length - 1) {
                wordItem.getChildByName("img_xialafengexian").active = false;
            }
        }
        this.typeView.getChildByName("typeScrollView").height = (this.ComplexTypesData.length+1)*this.wordItem.height + 32;
        this.typeView.active = true;
    },
    //生成平台内容
    initPlats() {
        this.platContent.destroyAllChildren();
        let wordItem = cc.instantiate(this.wordItem);
        wordItem.name = `platItemAll`
        wordItem.getChildByName("label").getComponent(cc.Label).string = '全部'
        wordItem.parent = this.platContent;
        wordItem.active = true;
        for (let i = 0; i < this.ComplexPlatsData.length; i++) {
            let wordItem = cc.instantiate(this.wordItem);
            wordItem.parent = this.platContent;
            wordItem.active = true;
            wordItem.name = `platItem${i}`;
            wordItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexPlatsData[i].platName

            if(i == this.ComplexPlatsData.length - 1) {
                wordItem.getChildByName("img_xialafengexian").active = false;
            }
        }
        this.platView.getChildByName("platScrollView").height = (this.ComplexPlatsData.length+1)*this.wordItem.height + 32;
        this.platView.active = true;
    },
    //生成游戏内容
    initGames() {
        this.gameContent.destroyAllChildren();
        let wordItem = cc.instantiate(this.wordItem);
        wordItem.name = `gameItemAll`
        wordItem.getChildByName("label").getComponent(cc.Label).string = '全部'
        wordItem.parent = this.gameContent;
        wordItem.active = true;

        if(this.ComplexGamesData.length == 0) {
            wordItem.getChildByName("img_xialafengexian").active = false;
        }

        for (let i = 0; i < this.ComplexGamesData.length; i++) {
            let wordItem = cc.instantiate(this.wordItem);
            wordItem.parent = this.gameContent;
            wordItem.active = true;
            wordItem.name = `gameItem${i}`;
            wordItem.getChildByName("label").getComponent(cc.Label).string = this.ComplexGamesData[i].gameName

            if(i == this.ComplexGamesData.length - 1) {
                wordItem.getChildByName("img_xialafengexian").active = false;
            }
        }
        this.gameView.getChildByName("gameScrollView").height = this.ComplexGamesData.length+1<=10?(this.ComplexGamesData.length+1)*this.wordItem.height+ 32:10*this.wordItem.height + 32;
        this.gameView.active = true;
    },
    lastPage_cb() {
        if (this.pageIndex <= 1) return glGame.panel.showTip("已经是第一页了！")
        this.pageIndex--;
        this.sendReqBetFlow();   //请求协议
    },

    nextPage_cb() {
        if (this.pageIndex == this.pageCount || this.pageCount == 0) return glGame.panel.showTip("已经是最后一页了！")
        this.pageIndex++;
        this.sendReqBetFlow();   //请求协议
    },

    click_typeItem(name) {
        let string = name.substring(8);
        this.typeView.active = false;
        this.typeIndex = Number(string);
        this.typeId = this.ComplexTypesData[this.typeIndex]?this.ComplexTypesData[this.typeIndex].id:0
        this.lab_type.string = string == "All"?"全部":this.ComplexTypesData[this.typeIndex].name;
        this.lab_plat.string = "全部"
        this.lab_game.string = "全部"
        this.platId = 0;
        this.gameId = 0;
        this.platIndex = 0;
        this.pageIndex = 1
        this.sendReqBetFlow();
    },
    click_platItem(name) {
        let string = name.substring(8);
        this.platView.active = false;
        this.platIndex = Number(string);
        this.platId = this.ComplexPlatsData[this.platIndex]?this.ComplexPlatsData[this.platIndex].id:0
        this.lab_plat.string = string == "All"?"全部":this.ComplexPlatsData[this.platIndex].platName
        this.lab_game.string = "全部"
        this.pageIndex = 1
        this.gameId = 0;
        console.log("点击了列表click_platItem", string)
        this.sendReqBetFlow();
    },
    click_gameItem(name) {
        let string = name.substring(8);
        this.gameView.active = false;
        this.gameIndex = Number(string)
        this.lab_game.string = string == "All"?"全部":this.ComplexGamesData[this.gameIndex].gameName;
        this.gameId = this.ComplexGamesData[this.gameIndex]?this.ComplexGamesData[this.gameIndex].id:0
        console.log("点击了列表click_gameItem", string)
        this.pageIndex = 1
        this.sendReqBetFlow();
    },
    cutFloat(value) {
        return (Number(value).div(100)).toString();
    },
    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("userinfo_switchFace",this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
});

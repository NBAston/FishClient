/**
 * 返水比例
 */

// key 为控件名称， value 为与服务端约定好的数组名称
const GAME_VARIETY_TAB = {
    tabs_qipai: "pokerConfig",              //棋牌
    tabs_jieji: "arcadeConfig",             //街机
    tabs_buyu: "fishConfig",                //捕鱼
    tabs_shixun: "videoConfig",             //视讯
    tabs_tiyu: "sportsConfig",              //体育
    tabs_caipiao: "lotteryConfig",          //彩票
    tabs_dianjing: "electronicSportsConfig",//电竞
}

glGame.baseclass.extend({
    properties: {
        typeNodeList: cc.Node,
        //
        vip_page: cc.Node,
        vip_pageup: cc.Node,
        vip_rightnext: cc.Node,
        vip_level: cc.Label,

        bet_page: cc.Node,
        bet_pageup: cc.Node,
        bet_pagenext: cc.Node,
        bet_scope: cc.Label,

        ratecontent: cc.Node,
        rateitem: cc.Node,
    },

    onLoad() {
        this.registerEvent();
        glGame.user.ReqRebateConfigList({
            accountId: glGame.user.userID,
            type: -1,
        });
        this.vipLevel = 0;
        this.gradeId = 0;      // vip等级id或会员层级id
        this.vipMax = 0;
        this.pageIndex = 0;
        this.betNumMax = 0;
        this.config = null;
        this.gameOrPlatMap = null;
        this.type = -1;
    },

    registerEvent() {
        glGame.emitter.on("rebateConfigList", this.rebateConfigList, this);
    },
    unRegisterEvent() {
        glGame.emitter.off("rebateConfigList", this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },

    rebateConfigList() {
        this.rebateConfigList = glGame.user.get("rebateConfigList");
        this.gameOrPlatMap = this.rebateConfigList.gameOrPlatMap;
        this.gradeId = this.rebateConfigList.gradeId;
        let vipId = this.rebateConfigList.vipId;
        let data = this.rebateConfigList.data;
        for(let i = 0; i < data.length; i++) {
            if(data[i].groupId == vipId) {
                this.vipLevel = i;
                break;
            }
        }
        this.setConfig();
        this.initpageView();
        this.initMidUI();
        this.chengeBtnState();
    },

    initpageView() {
        if (Object.keys(this.config) == 0) {
            this.vip_page.active = false;
            this.bet_page.active = false;
            return;
        } else {
            this.vip_page.active = this.rebateConfigList.modeType == "vip";
            this.bet_page.active = true;
        }

        let keys = Object.keys(this.config)                 //子游戏ID数组
        let gameporpor = this.config[keys[0]];              //子游戏的数据
        let gameKeys = Object.keys(gameporpor);             //区间的keys

        if (this.vip_page.active) this.vip_level.string = this.rebateConfigList.data[this.vipLevel].name;

        if (this.pageIndex == gameKeys.length - 1) {
            this.bet_scope.string = `${this.cutFloat(gameKeys[this.pageIndex])}以上`
        } else {
            this.bet_scope.string = `${this.cutFloat(gameKeys[this.pageIndex])}~${this.cutFloat(gameKeys[this.pageIndex + 1])}`
        }
    },
    initMidUI() {
        let config = this.config;
        this.ratecontent.removeAllChildren();
        let gamekeys = Object.keys(config)
        let itemCount = 0;
        let item;               //一个item包含3个子游戏
        let index = 0;
        for (let i = 0; i < gamekeys.length; i++) {
            if(!this.gameOrPlatMap[Number(gamekeys[i])]) {
                continue;
            }

            if (index % 3 == 0) {
                item = cc.instantiate(this.rateitem);
                item.parent = this.ratecontent;
                item.active = false;
                item.getChildByName("bg").active = itemCount % 2 == 0
                itemCount += 1;
            }
            let childrenindex = (index % 3) + 1;    //节点里面有bg
            let gameitem = item.getChildByName(`gamename${childrenindex}`)
            gameitem.active = true;
            gameitem.getComponent(cc.Label).string = this.gameOrPlatMap[Number(gamekeys[i])]; //游戏名

            let gamedata = config[gamekeys[i]];
            let keys = Object.keys(gamedata);
            gameitem.getChildByName("porpor_lab").getComponent(cc.Label).string = `${Number(gamedata[keys[this.pageIndex]]).div(100).toFixed(2)}%`;

            index++;
        }
        glGame.panel.showEffectNode(this,this.ratecontent,0.02,true);
    },

    onClick(name, node) {
        switch (name) {
            case "vip_left": this.vipleft_cb(); break;
            case "vip_right": this.vipright_cb(); break;
            case "bet_left": this.betleft_cb(); break;
            case "bet_right": this.betright_cb(); break;
            default:
                if (name.indexOf("tabs_") > -1) this.selectClick(name);
                break;
        }
    },

    selectClick(name) {
        this.typeName = name;
        this.pageIndex = 0;
        this.chengeBtnState();
        this.setConfig();
        this.initpageView();
        this.initMidUI();
    },

    betleft_cb() {
        if (this.pageIndex == 0) return;
        this.pageIndex--;
        this.initpageView();
        this.initMidUI();
        this.chengeBtnState();
    },

    betright_cb() {
        if (this.pageIndex == this.betNumMax - 1) return;
        this.pageIndex++;
        this.initpageView();
        this.initMidUI();
        this.chengeBtnState();
    },

    vipleft_cb() {
        if (this.vipLevel <= 0) return;
        this.vipLevel--;
        this.pageIndex = 0;
        this.setConfig();
        this.initpageView();
        this.initMidUI();
        this.chengeBtnState();
    },

    vipright_cb() {
        if (this.vipLevel == this.vipMax) return;
        this.vipLevel++;
        this.pageIndex = 0;
        this.setConfig();
        this.initpageView();
        this.initMidUI();
        this.chengeBtnState();
    },

    chengeBtnState() {
        this.vip_pageup.active = this.vipLevel != 0;
        this.vip_rightnext.active = this.vipLevel != this.vipMax - 1;
        this.bet_pageup.active = this.pageIndex != 0;
        this.bet_pagenext.active = this.pageIndex != this.betNumMax - 1;
    },

    setConfig() {
        this.bet_page.active = true;
        if (this.rebateConfigList.modeType == "vip") {
            this.vipMax = Object.keys(this.rebateConfigList.data).length;
            this.config = this.rebateConfigList.data[this.vipLevel].config;
            let keys = Object.keys(this.config);                         //子游戏ID数组
            let gameporpor = this.config[keys[0]];                      //子游戏的数据
            let gameKeys = Object.keys(gameporpor);                     //区间的keys
            this.betNumMax = gameKeys.length;
            this.vip_page.active = true;
            this.bet_page.x = 226;
        } else {
            this.config = this.rebateConfigList.data.config;
            let keys = Object.keys(this.config)                         //子游戏ID数组
            let gameporpor = this.config[keys[0]];                      //子游戏的数据
            let gameKeys = Object.keys(gameporpor);                     //区间的keys
            this.betNumMax = gameKeys.length;
            this.vip_page.active = false;
            this.bet_page.x = 0;
        }
    },

    // 游戏是否开启
    isGameOpen(typeList, id) {
        let count = typeList.length;
        for(let i = 0; i < count; i++) {
            if(typeList[i].id == id) {
                return true;
            }
        }

        return false;
    },

    getFloat(value) {
        return (Number(value).div(100)).toFixed(4);
    },
    //浮点型运算取俩位
    cutFloat(value) {
        return Number(value).div(100).toString();
    },

});

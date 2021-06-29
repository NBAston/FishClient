/**
 * 返水信息面板
 * 有效投注*比例 = 返水金额
 * 今日有效投注 = 总的子游戏有效投注之和
 * 今日预计返水 = 总的子游戏返水金额之和
 */
const WATER_TIMING = 1;     //定时返水
const WATER_REALTIME = 2;   //实时返水


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
        today_bet: cc.Label,        //未返水有效投注
        today_back: cc.Label,       //今日预计返水
        curback: cc.Label,          //返水数额
        time: cc.Label,             //返水结算时间

        timestrip: cc.Node,        //非实时返水数据

        cfgContent: cc.Node,
        cfgItem: cc.Node,
        btn_applyback: cc.Button,
        btn_rtimeback: cc.Node,

        end_backtip: [cc.Node],
        wfsWenhao: cc.Node,         //未返水问号
        klqWenhao: cc.Node,         //可领取问号
        dmtips: cc.Node,            //打码提示
        fstips: cc.Node,            //返水提示
    },

    onLoad() {
        this.registerEvent()
        this.type = 0;    
        this.gameRecord = null;
        glGame.user.ReqRebateRecord({
            accountId: glGame.user.userID,
            type: 0,
        });

        let clickNode = this.node.getChildByName("clickmask");
        clickNode.on(cc.Node.EventType.TOUCH_START, ()=> {
            this.dmtips.active = false;
            this.fstips.active = false;
            this.clickMask.active = false;
        }, this);
        clickNode.active = false;
        this.clickMask = clickNode;
    },

    //设置对应关系处理
    setSelectToggle(name) {
    },

    //棋牌返水
    initContent(player_config) {
        this.cfgContent.removeAllChildren();

        let gameRebateDetail = this.gameRecord.gameRebateDetail;
        let gameOrPlatMap = this.gameRecord.gameOrPlatMap;

        if(!gameRebateDetail[this.type]) {
            this.node.getChildByName("img_wodefanshui").active = true;
            return;
        }
        
        let index = 0;
        if (Object.keys(gameRebateDetail[this.type]) == 0) {
            this.node.getChildByName("img_wodefanshui").active = true;
            return;
        }

        gameRebateDetail = gameRebateDetail[this.type];

        for (let key in gameRebateDetail) {
            let data = gameRebateDetail[key];
            let item = cc.instantiate(this.cfgItem);
            item.parent = this.cfgContent;
            this.cfgContent.height += item.height;
            item.active = false;
            item.getChildByName("game").getComponent(cc.Label).string = data.name;            //游戏ID
            item.getChildByName("bet").getComponent(cc.Label).string = `${this.cutFloat(data.betting)}`;            //有效投注
            item.getChildByName("porpor").getComponent(cc.Label).string = `${Number(data.proportion).mul(100).toFixed(2)}%`;
            item.getChildByName("coin").getComponent(cc.Label).string = `${this.cutFloat(data.number)}`;     //返水金额
            glGame.panel.settingTableLabelColor(item.getChildByName("coin"));
            item.getChildByName("bg").active = index % 2 == 0
            index++;
        }
        this.node.getChildByName("img_wodefanshui").active = index == 0;
        glGame.panel.showEffectNode(this,this.cfgContent,0.02,true);
    },

    //渲染上下部的其他UI
    initOtherUI() {
        this.today_bet.string = `${this.cutFloat(this.gameRecord.betCoin)}`;
        let allRebateCoin = Number(this.gameRecord.canReceive) + Number(this.gameRecord.rebateCoin);
        this.setEndbacktip();

        if (this.gameRecord.rebateType == WATER_REALTIME) {
            // 实时返水
            this.btn_applyback.node.active = false;
            this.btn_rtimeback.active = true;
            this.timestrip.active = false;

            this.today_back.string = `${this.cutFloat(allRebateCoin)}`;
            // this.btn_rtimeback.getComponent(cc.Button).interactable = allRebateCoin != 0;
            
        } else {
            // 定时返水
            this.btn_rtimeback.active = false;
            this.timestrip.active = true;

            this.today_back.string = `${this.cutFloat(this.gameRecord.rebateCoin)}`;
            this.curback.string = `${this.cutFloat(this.gameRecord.canReceive)}`;
            this.time.string = `${this.gameRecord.time}`;

            this.btn_applyback.node.active = true;
            this.btn_applyback.interactable = this.gameRecord.canReceive != 0;;
        }

        this.klqWenhao.active = this.gameRecord.rebateType == WATER_TIMING && this.gameRecord.rebateExpirationTime != 0;
        this.wfsWenhao.active = this.gameRecord.rebateType == WATER_REALTIME && this.gameRecord.rebateExpirationTime != 0;
    },

    setEndbacktip() {
        if (this.gameRecord.rebateType == WATER_REALTIME) {
            this.end_backtip[0].active = false;
            this.end_backtip[1].active = true;
        } else {
            this.end_backtip[0].active = true;
            this.end_backtip[1].active = false;
        }
    },

    registerEvent() {
        glGame.emitter.on("updateReqRebateRecord", this.updateReqRebateRecord, this);
        glGame.emitter.on("updateReqRebateApply", this.updateReqRebateApply, this);
    },

    unRegisterEvent() {
        glGame.emitter.off("updateReqRebateRecord", this);
        glGame.emitter.off("updateReqRebateApply", this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },

    updateReqRebateRecord() {
        this.gameRecord = glGame.user.get("userPumpRecord");
        if (!this.gameRecord) {
            return glGame.user.ReqRebateRecord();
        }

        this.initOtherUI();
        this.initContent();
    },

    //领取返水成功
    updateReqRebateApply(msg) {
        let coin = msg.coin || 0;        //暂时
        let strContent = "";
        if (msg.type == 1) {
            strContent = glGame.tips.BACKWATER.GIVENOTICE.format(`${this.cutFloat(coin)}`);
        } else if (msg.type == 3) {
            strContent = glGame.tips.BACKWATER.APPLYSUCCESS.format(`${this.cutFloat(coin)}`);
        }

        glGame.panel.showMsgBox("", strContent);
        glGame.user.ReqRebateRecord();
    },

    onClick(name, node) {
        if (glGame.user.isTourist()) {
            if (name != 'close' && name.indexOf("tabs_") == -1) {
                glGame.panel.showRegisteredGift(true);
                return;
            }
        }

        switch (name) {
            case "btn_applyback": this.applyback_cb(); break;
            case "btn_rtimeback": this.applyback_cb(); break;
            case "btn_dmwenhao": this.dmwenhao_cb(); break;
            case "btn_fswenhao": this.fswenhao_cb(); break;
            default:
                if (name.indexOf("tabs_") > -1) this.selectClick(name);
                break;
        }
    },

    selectClick(name) {
        this.switchPlatform(GAME_VARIETY_TAB[name]);
        this.initContent();
    },

    // 切换平台
    switchPlatform(type) {
        this.type = type;
        this.titleContent.getChildByName("img_yx").active = this.type == 2 || this.type == 0;
        this.titleContent.getChildByName("img_yxpt").active = this.type != 2 && this.type != 0;
    },

    ReqRebateRecord() {
        glGame.user.ReqRebateRecord({
            accountId: glGame.user.userID,
            type: 1,
        });
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

    //浮点型运算取俩位
    cutFloat(value) {
        return Number(value).div(100).toFixed(2).toString();
    },

    applyback_cb() {
        let allRebateCoin = Number(this.gameRecord.canReceive);
        if(this.gameRecord.rebateType == WATER_REALTIME) {
            allRebateCoin = Number(this.gameRecord.canReceive) + Number(this.gameRecord.rebateCoin);
        }
        
        if (allRebateCoin < this.gameRecord.minReceiveAmount * 100) {
            glGame.panel.showErrorTip(glGame.tips.BACKWATER.MINLIMIT.format(`${this.gameRecord.minReceiveAmount}`));
            return;
        }
        glGame.user.ReqRebateApply();
    },

    dmwenhao_cb() {
        this.clickMask.active = true;
        this.dmtips.stopAllActions();
        this.dmtips.active = true;
        this.dmtips.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=> {
            this.dmtips.active = false;
            this.clickMask.active = false;
        })));

        this.dmtips.getChildByName("label").getComponent(cc.Label).string = `每天0点清除${this.gameRecord.rebateExpirationTime}天前未返水的打码量`;
    },

    fswenhao_cb() {
        this.clickMask.active = true;
        this.fstips.stopAllActions();
        this.fstips.active = true;
        this.fstips.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=> {
            this.fstips.active = false;
            this.clickMask.active = false;
        })));

        this.fstips.getChildByName("label").getComponent(cc.Label).string = `每天0点清除${this.gameRecord.rebateExpirationTime}天前未领取的返水金额`;
    }
});

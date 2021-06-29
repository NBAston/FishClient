let CONST = require("nfishConst");
const CUT_TYPE = {
    BULLET: 1,
    FISH: 2,
}

//捕鱼：详情
glGame.baseclass.extend({
    properties: {
        //子弹列表
        bullet_scrollView: cc.ScrollView,
        bullet_content: cc.Node,
        bullet_item: cc.Node,
        //鱼列表
        fish_scrollView: cc.ScrollView,
        fish_content: cc.Node,
        fish_item: cc.Node,

        //按钮切换
        bullet_bottom: cc.Node,
        fish_bottom: cc.Node,
    },
    onLoad() {

    },
    initDetView(recordData, list, viewtype) {
        this.bullet_content.removeAllChildren();
        this.fish_content.removeAllChildren();

        //时间格式化
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        this.gameID = glGame.scenetag.FISH2;
        this.gameLevel = glGame.room.getRoomType(this.gameID);
        let hand_number = recordData["hand_number"];//牌局编号
        let profit = Number(recordData["number"]);//结算
        let gainFee = this.cutDownNum(Number(recordData["gainFee"]));//抽水
        let bet_coin = this.cutDownNum(Number(recordData["bet_coin"]));//炮弹金额
        let coin = Number(Number(this.cutDownNum(profit)) + Number(gainFee) + Number(bet_coin)).toFixed(2);//捕获金额
        let roomStr = this.gameLevel[recordData["bettype"]];//房间
        let panel = this.node.getChildByName("viewInfo");
        panel.getChildByName("lab_no").getComponent(cc.Label).string = hand_number + "";
        panel.getChildByName("lab_room").getComponent(cc.Label).string = roomStr + "";
        panel.getChildByName("lab_bullteCoin").getComponent(cc.Label).string = bet_coin + "";
        panel.getChildByName("lab_coin").getComponent(cc.Label).string = coin + "";
        let number = panel.getChildByName(profit > 0 ? "lab_win" : "lab_lost");
        number.getComponent(cc.Label).string = profit > 0 ? `+${this.cutDownNum(profit)}` : this.cutDownNum(profit);
        panel.getChildByName("lab_endTime").getComponent(cc.Label).string = recordData["end_time"];
        number.active = true;
        this.list = list;
        this.showView(viewtype);
    },
    //type = 1 是 子弹 其余的是 鱼
    showView(type) {
        if (type == this.currType) {
            return;
        }

        this.currType = type;
        this.bullet_bottom.active = type == CUT_TYPE.BULLET;
        this.fish_bottom.active = type == CUT_TYPE.FISH;
        //标题
        let titleFish = this.node.getChildByName("ui_txt_line").getChildByName("fishView");
        let titleBullet = this.node.getChildByName("ui_txt_line").getChildByName("bulletView");
        titleBullet.active = type == CUT_TYPE.BULLET;
        titleFish.active = !titleBullet.active;
        //列表 容器
        const Show = 255;
        const Close = 1;
        const ShowIndexZ = 10;
        const CloseIndexZ = 8;
        this.bullet_scrollView.node.opacity = type == CUT_TYPE.BULLET ? Show : Close;
        this.fish_scrollView.node.opacity = type == CUT_TYPE.FISH ? Show : Close;
        this.bullet_scrollView.node.zIndex = type == CUT_TYPE.BULLET ? ShowIndexZ : CloseIndexZ;
        this.fish_scrollView.node.zIndex = type == CUT_TYPE.FISH ? ShowIndexZ : CloseIndexZ;
        //容器content
        if (type == CUT_TYPE.BULLET && this.bullet_content.childrenCount > 0) {
            return;
        }
        if (type != CUT_TYPE.BULLET && this.fish_content.childrenCount > 0) {
            return;
        }
        if (type == CUT_TYPE.BULLET) {
            this.bullet_content.removeAllChildren();
        } else {
            this.fish_content.removeAllChildren();
        }

        if (type == CUT_TYPE.FISH) {//鱼
            let fishList = [];
            let fishListIndex = [];
            for (let i = 0; i < this.list.length; i++) {
                let fishId = Number(this.list[i].fishId);
                let fishName = this.list[i].fishName;
                let reward = 0;
                let pc = 0;
                let captureTime = null;
                let rewardTimeFormNumber = 0;
                let consume = 0;
                let profit = 0;
                let isKilled = false;
                if (fishListIndex.indexOf(fishId) == -1) {
                    for (let j = 0; j < this.list.length; j++) {
                        if (fishId == Number(this.list[j].fishId)) {
                            let d = this.list[j];
                            if (d.reward > 0) {
                                reward += Number(d.reward);
                                pc += Number(d.consume) + Number(d.profit);
                            }
                            rewardTimeFormNumber = d.date;
                            consume += Number(d.consume);
                            profit += Number(d.profit);
                            if (d.isKilled) {
                                isKilled = true;
                                captureTime = new Date(d.date).Format("yyyy-MM-dd hh:mm:ss");
                            }
                        }
                    }
                    fishListIndex.push(fishId);
                    fishList.push({ fishId: fishId, fishName: fishName, pc: pc, reward: reward, consume: consume, profit: profit, captureTime: captureTime, time: rewardTimeFormNumber, isKilled: isKilled });
                }
            }
            fishList.sort(function (a, b) {
                return b.time - a.time;
            })
            for (let i = 0; i < fishList.length; i++) {
                let d = fishList[i];
                let itemNode = cc.instantiate(this.fish_item);
                itemNode.active = false;
                itemNode.getChildByName("lab_no").getComponent(cc.Label).string = d.fishId + "";//鱼编号
                itemNode.getChildByName("lab_fishName").getComponent(cc.Label).string = d.fishName + "";//鱼 名字
                itemNode.getChildByName("lab_getTime").getComponent(cc.Label).string = "未捕获";
                if (d.isKilled) {
                    itemNode.getChildByName("lab_getTime").getComponent(cc.Label).string = d.captureTime;
                }
                itemNode.getChildByName("lab_consume").getComponent(cc.Label).string = this.cutDownNum(d.consume) + "";//总消耗
                itemNode.getChildByName("lab_distribute").getComponent(cc.Label).string = this.cutDownNum(d.reward) + "";//派彩
                itemNode.getChildByName("lab_win").getComponent(cc.Label).string = "+" + this.cutDownNum(d.profit);//损益 正
                itemNode.getChildByName("lab_lost").getComponent(cc.Label).string = this.cutDownNum(d.profit) + "";//损益 负
                itemNode.getChildByName("lab_win").active = d.profit >= 0;
                itemNode.getChildByName("lab_lost").active = d.profit < 0;
                itemNode.parent = this.fish_content;
                itemNode.getChildByName("img_tiao").active = i % 2 != 0;
            }
            glGame.panel.showEffectNode(this, this.fish_content, 0.02, true);
        } else if (type == CUT_TYPE.BULLET) {//子弹
            for (let i = 0; i < this.list.length; i++) {
                let bulletData = this.list[i];
                let itemNode;
                let currTime = new Date(bulletData.date).Format("yyyy-MM-dd hh:mm:ss");
                itemNode = cc.instantiate(this.bullet_item);
                itemNode.active = false;
                itemNode.getChildByName("lab_no").getComponent(cc.Label).string = bulletData.id + "";//子弹编号
                itemNode.getChildByName("lab_time").getComponent(cc.Label).string = currTime + "";//时间
                itemNode.getChildByName("lab_type").getComponent(cc.Label).string = CONST.CannonDesc[Number(bulletData.cannonType)];//类型
                itemNode.getChildByName("lab_consume").getComponent(cc.Label).string = this.cutDownNum(bulletData.consume) + "";//消耗
                itemNode.getChildByName("lab_fiashName").getComponent(cc.Label).string = bulletData.fishName + "";//鱼
                itemNode.getChildByName("lab_win_capture").active = bulletData.isKilled;//是否 捕获
                itemNode.getChildByName("lab_lost_capture").active = !itemNode.getChildByName("lab_win_capture").active;//是否 捕获
                itemNode.getChildByName("lab_distribute").getComponent(cc.Label).string = this.cutDownNum(Number(bulletData.consume) + Number(bulletData.profit)) + "";//派彩
                itemNode.parent = this.bullet_content;
                itemNode.getChildByName("img_tiao").active = i % 2 != 0;
            }
            glGame.panel.showEffectNode(this, this.bullet_content, 0.02, true);
        }
    },
    onClick(name, node) {
        switch (name) {
            case "ui_BtnClose":
                this.node.parent.parent.destroy();
                this.remove();
                break;
            case "img_back": this.remove(); break;
            case "btn_zidananniu": this.showView(CUT_TYPE.BULLET); break;
            case "btn_fishanniu": this.showView(CUT_TYPE.FISH); break;
            default:
                break;
        }
    },
    OnDestroy() {
        this.gameRecord = null;
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
    /**
     * @param event
     * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
     * @Explain Button点击事件统一调用
     */
    OnClickButton(event, type) {
        let buttonName = event.target.name;
        let buttonNode = event.target;
        console.log(`点击了button -> ${buttonName}`);
        switch (buttonName) {
            case "close_eff":        //当前界面有播放特长音效的关闭按钮
                glGame.audio.closeCurEffect();
                glGame.audio.playLoadSoundEffectByPath("close");
                break;
            case "close":
                glGame.audio.playLoadSoundEffectByPath("close");
                break;
            default:
                if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");
                else glGame.audio.playLoadSoundEffectByPath("click");
        }
        this.onClick(buttonName, buttonNode);
    },
});
/**
 * 礼物label：当天未签到显示白色，其他显示黄色
 * 礼物labelbg:当前未签到显示深色底，其他显示浅色底。
 */
glGame.baseclass.extend({

    properties: {
        everyday: cc.Node,
        receiveed: cc.Node,
        interface: cc.Node,
        close: cc.Node,
        lab_hint: cc.Label,
        lab_prompt: cc.Label,
        normalMaterial: cc.Material,
        grayMaterial: cc.Material,
    },

    onLoad() {
        glGame.emitter.on(MESSAGE.UI.FORBIDDEN_SIGN, this.onForbbidden, this);
        this.initData();
        this.reqannounceInfo();
        this.designSize = cc.size(1920, 1080);
        this.signMax = 7;
    },

    start() {
        if (this.node.getComponent(cc.Widget)) this.node.getComponent(cc.Widget).updateAlignment();
    },

    initData() {
        this.rewardInfo = null;
        this.todayIsSign = false;
        this.signTimes = 0;
    },

    //适配
    fitFunc() {
        let designRate = this.designSize.height / this.designSize.width;
        let winSize = cc.view.getVisibleSize();
        let curRate = winSize.height / winSize.width;
        let scaleRate = curRate < designRate ? winSize.height / this.designSize.height : winSize.width / this.designSize.width;
        this.interface.setScale(scaleRate);
    },

    //请求签到的信息
    reqannounceInfo() {
        //拉取七天信息
        glGame.gameNet.send_msg("http.reqSigninWeekInfo", {}, (route, msg) => {
            this.rewardInfo = msg.signinfo;//今日是否领取奖励
            this.todayIsSign = msg.today_is_sign;
            this.todayBet = msg.today_bet;
            this.todayRecharge = msg.today_recharge;
            this.todayTotalBet = msg.todayTotalBet;
            this.todayTotalRecharge = msg.todayTotalRecharge;
            this.updateUi();
            console.log('signinfo', msg)
        })

    },

    initUI() {
        for (let i = 0; i < this.signMax; i++) {
            this.everyday.children[i].getChildByName('receive').active = false;
            this.everyday.children[i].getChildByName('getReceive').active = false;
            this.everyday.children[i].getChildByName('today').active = false;
        }
    },
    updateUi() {
        this.initUI();
        this.signTimes = 0;
        let tiplayout;

        for (let i = 0; i < this.rewardInfo.length; i++) {
            tiplayout = this.everyday.children[i].getChildByName("tiplayout")

            //是否已签到
            if (this.rewardInfo[i].is_sign) {
                this.everyday.children[this.signTimes].getChildByName('receive').active = true;
                this.everyday.children[this.signTimes].getChildByName('today').active = false;
                this.everyday.children[this.signTimes].getChildByName('getReceive').active = true;
                this.signTimes++;
            }
            tiplayout.active = true;
            //渲染金币
            let coinframe = tiplayout.getChildByName("coinframe");
            if (this.rewardInfo[i].coin) {
                coinframe.active = true;
                let strCoin = "";
                if (this.rewardInfo[i].coin_range.length == 1) {
                    strCoin = this.getFixNumber(this.rewardInfo[i].coin_range[0]);
                } else if (this.rewardInfo[i].coin_range.length == 2) {
                    strCoin = this.getFixNumber(this.rewardInfo[i].coin_range[0]) + "~" + this.getFixNumber(this.rewardInfo[i].coin_range[1]);
                }
                coinframe.getChildByName("cointip").getComponent(cc.Label).string = strCoin;
            } else coinframe.active = false;
            //渲染转盘积分
            let turnframe = tiplayout.getChildByName("turnframe");
            if (this.rewardInfo[i].integral) {
                turnframe.active = true;
                let strTurn = "";
                if (this.rewardInfo[i].integral_range.length == 1) {
                    strTurn = this.getFixNumber(this.rewardInfo[i].integral_range[0]);
                } else if (this.rewardInfo[i].integral_range.length == 2) {
                    strTurn = this.getFixNumber(this.rewardInfo[i].integral_range[0]) + "~" + this.getFixNumber(this.rewardInfo[i].integral_range[1]);
                }
                turnframe.getChildByName("turntip").getComponent(cc.Label).string = strTurn;
            } else turnframe.active = false;
        }
        if (this.signTimes > 6) this.signTimes = 6;
        //今日还没签到
        if (!this.todayIsSign) {
            let today = this.everyday.children[this.signTimes].getChildByName('today');
            today.active = true;

            let fadeOut = cc.fadeTo(0.75, 50);
            let fadeIn = cc.fadeTo(0.75, 255);
            let delay = cc.delayTime(0.15);
            let seq = cc.sequence(fadeOut, fadeIn, delay);
            today.runAction(cc.repeatForever(seq));

            this.setButton(this.receiveed, true);
        } else {
            this.setButton(this.receiveed, false);
        }

        this.lab_hint.node.active = true;
        this.lab_prompt.node.active = true;
        if (this.todayBet && this.todayRecharge) {
            this.lab_hint.string = `今日签到条件：充值金额达到 ${this.getFixNumber(this.todayRecharge)} 元，并且打码量达到 ${this.getFixNumber(this.todayBet)} `;
            this.lab_prompt.string = `今日已充值:${this.getFixNumber(this.todayTotalRecharge)}元   今日打码量:${this.getFixNumber(this.todayTotalBet)}`;
        } else if (this.todayBet || this.todayRecharge) {
            this.lab_hint.string = "今日签到条件："
            this.todayRecharge ? this.lab_hint.string += `充值金额达到 ${this.getFixNumber(this.todayRecharge)}元 ` : "";
            this.todayBet ? this.lab_hint.string += `打码量达到 ${this.getFixNumber(this.todayBet)} ` : "";
            this.todayRecharge ? this.lab_prompt.string = `今日已充值:${this.getFixNumber(this.todayTotalRecharge)}元` : "";
            this.todayBet ? this.lab_prompt.string = `今日打码量:${this.getFixNumber(this.todayTotalBet)}` : "";
        } else {
            this.lab_hint.string = "连续签到天数越多,奖励越丰富哟!";
            this.lab_prompt.node.active = false;
        }

        if(this.todayTotalBet >= this.todayBet && this.todayTotalRecharge >= this.todayRecharge) {
            this.lab_hint.string = "签到条件已达成，可领取签到奖励！";
            this.lab_prompt.node.active = false;
        }

        if(this.todayIsSign) {
            this.lab_hint.string = "连续签到天数越多，奖励越丰富呦！";
            this.lab_prompt.node.active = false;
        }
    },

    setButton(btnNode, bState) {
        btnNode.getComponent(cc.Button).interactable = bState;
        if(bState) {
            btnNode.getChildByName("img_lingqu").getComponent(cc.RenderComponent).setMaterial(0, this.normalMaterial);
        } else {
            btnNode.getChildByName("img_lingqu").getComponent(cc.RenderComponent).setMaterial(0, this.grayMaterial);
        }
    },

    //金币数量或积分
    sevenInfo() {
        glGame.gameNet.send_msg("http.reqSignin", {}, (route, msg) => {
            this.reqannounceInfo();
            let awardlist = [];
            msg.coin != 0 ? awardlist.push({ type: glGame.awardtype.COIN, value: this.getFixNumber(msg.coin) }) : null;
            msg.integral != 0 ? awardlist.push({ type: glGame.awardtype.SCORE, value: this.getFixNumber(msg.integral) }) : null
            glGame.panel.showAwardBox(glGame.tips.SIGNIN.CONGRATULATE, awardlist);
            glGame.user.reqGetCoin();
            glGame.user.ReqRedDot();
        })

    },

    // 重写父类按钮点击事件
    onClick(name, node) {
        switch (name) {
            case "one": case "two": case "three": case "four": case "five":
            case "six": case "seven":
            case "receiveed": this.click_receive(name); break; //领取
            case "close": this.click_close(); break;   //关闭
            default: console.error("no find button name -> %s", name);
        }
    },

    click_close() {
        glGame.panel.showFirstEnterPanel();
        this.remove();
    },

    onForbbidden() {
        glGame.user.signinSwitch = 0;
        // glGame.panel.showMsgBox("该功能暂未开放", "该功能暂未开放",
        //     () => { this.remove(); });

        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=> {
            this.remove();
        })));
    },

    getFixNumber(value) {
        return (Number(value).div(100)).toString();
    },

    //判断今天星期几，领取后显示相关的奖励
    click_receive(name) {
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return
        }
        let draw = false;
        let upDraw = false;
        for (let i = 0; i < this.everyday.childrenCount; i++) {
            if (this.everyday.children[i].name == name) {
                upDraw = this.signTimes > i;
                if ((this.todayIsSign && i == this.signTimes - 1) || (!this.todayIsSign && i == this.signTimes)) {
                    draw = true;
                    break;
                }
            }
        }
        if (!draw && name != "receiveed") {
            let str = upDraw ? glGame.tips.SIGNIN.HASCHECKED : glGame.tips.SIGNIN.UNREADY;
            glGame.panel.showErrorTip(str);
            return
        }
        if (!this.todayIsSign) {
            this.sevenInfo();
            this.setButton(this.receiveed, false);
        } else {
            glGame.panel.showErrorTip(glGame.tips.SIGNIN.COMETOMORROW);
        }
    },

    //点击任意位置，关闭界面
    position_recelive() {
        this.node.destroy();
    },
    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.FORBIDDEN_SIGN, this);
    },

});

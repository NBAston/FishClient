const EXTRACT_TYPE = { //当前提现类型
    NONE: 0,
    ALIPAY: 1,
    BANK: 2
}
glGame.baseclass.extend({

    properties: {
        extractBank: cc.Node,//银行卡取现
        extractAlipay: cc.Node,//支付宝取现
        lab_cashCoin: cc.Label, //可提现金额
        lab_extractRule: cc.Label,//提现手续以及规则
        lab_ask: cc.RichText,

        selectCash: cc.Node,
        bankCash: cc.Toggle,
        alipayCash: cc.Toggle,
        edbNumBank: cc.EditBox,
        editbox: cc.EditBox,
        edbNumNode: cc.Node,

        cashRecord: cc.Node,
        cashItem: cc.Node,
        integer: cc.Node,
        decimal: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.index = 1
        this.registerEvent();
    },


    ActionEndData() {
        this.reqDrawCoin();
        this.ReqCashBroadcastList();
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.ActionEndData, this);
        glGame.emitter.on("updateUserData", this.updateUserData, this);
        glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
        this.editbox.node.on("text-changed", this.onTextChanged, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
        glGame.emitter.off("updateUserData", this);
        glGame.emitter.off("withdrawSuccess", this);
    },
    onTextChanged(editbox) {
        if (editbox.string == "") {
            return;
        }

        let vau = Number(editbox.string);
        if (isNaN(vau)) {
            editbox.string = "";
            return;
        }

        let edbStr = editbox.string;
        if (edbStr.indexOf(".") != -1 && edbStr.length - edbStr.indexOf(".") > 2) {
            edbStr = edbStr.substr(0, edbStr.indexOf(".") + 3);
        }

        vau = Number(edbStr);
        editbox.string = Math.abs(vau).toString();
    },

    ReqCashBroadcastList() {
        glGame.gameNet.send_msg("http.ReqCashBroadcastList", { pageSize: 30 }, (route, data) => {
            this.defData = data.list.defData;
            this.rollingData = data.list.rollingData;
            this.serverTimeoff = data.serverTime * 1000 - Date.now();
            this.initCashRecord();
            this.totalAmount = data.totalAmount;
            //this.setintegerLabel(Number(Math.floor(Number(this.totalAmount).div(100))));
        })
    },

    getcurTime(cur_waitTime) {
        let countDown = Math.floor((cur_waitTime - (Date.now() + this.serverTimeoff)) / 1000);
        return countDown;
    },

    withdrawSuccess(amount) {
        this.coin -= amount;
        this.coin = Math.max(0, this.coin);
        this.lab_cashCoin.string = this.getFloat(this.coin);

        glGame.panel.showPanelByName("exchangeWin").then(prefab => {
            prefab.getComponent("exchangeWin").playSucceed();
        });

    },
    initCashRecord() {
        this.recordIndex = 0;
        let Count = this.defData.length > 6 ? 6 : this.defData.length;
        for (let i = 0; i < Count; i++) {
            let cashItem = cc.instantiate(this.cashItem);
            cashItem.parent = this.cashRecord;
            cashItem.active = false;
            let timeStamp = new Date(this.defData[i].updateTime * 1000);
            let strTime = `${timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1)}/`
            strTime += `${timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate()}`
            strTime += ` ${timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours()}:`
            strTime += `${timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes()}`
            cashItem.getChildByName("notice").getComponent(cc.RichText).string =
                `${strTime} - 恭贺<color=#7de2ff>${this.defData[i].logicId}</c><size=26>成功提现<color=#f4c404>${this.getFloat(this.defData[i].cashAmount)}</c>元。</size>`

        }
        glGame.panel.showEffectNode(this, this.cashRecord, 0.02, true);
    },
    //数字跳动
    myCoinshow(nowNumber) {
        this.cishu = 50;    //变化的次数
        this.time = 2;      //变化的时间
        let Number1 = Number(this.totalAmount).div(100);
        let Number2 = Number(nowNumber).div(100);
        let Number3 = Number1.sub(Number2);
        let dty, cb, action = [];
        let szNum;
        for (let i = 0; i < this.cishu; i++) {
            dty = cc.delayTime(this.time / this.cishu);
            cb = cc.callFunc(() => {
                if (Number2 < Number1) {
                    Number2 = Math.floor((Number(Number2).add(Number3.div(this.cishu))));
                    this.setintegerLabel(Number2);
                } else {
                    Number1 = Math.floor((Number(Number1).sub(Number3.div(this.cishu))));
                    szNum = Number1 + "";
                    this.setintegerLabel(Number1);
                }
            })
            action.push(dty, cb);
        }
        this.integer.stopAllActions();
        this.integer.runAction(cc.sequence(action));
    },
    //设置提现榜数值
    setintegerLabel(value) {
        if (!this.spriteFrameList) {
            this.spriteFrameList = [];
            for (let i = 0; i < this.integer.getChildByName("numLabel").childrenCount; i++) {
                this.spriteFrameList.push(cc.instantiate(this.integer.getChildByName("numLabel").getChildByName("img_num" + i)));
                this.integer.getChildByName("numLabel").getChildByName("img_num" + i).active = false;
            }
        }
        for (let i = 0; i < this.integer.getChildByName("numLabel").childrenCount; i++) {
            this.integer.getChildByName("numLabel").getChildByName("img_num" + i).active = false;
        }
        let numString = value + "";
        let len = numString.length > 9 ? 9 : numString.length;
        for (let i = 0; i < len; i++) {
            this.integer.getChildByName("numLabel").getChildByName("img_num" + (9 - i)).getComponent(cc.Sprite).spriteFrame = cc.instantiate(this.spriteFrameList[Number(numString.charAt(i))]).getComponent(cc.Sprite).spriteFrame;
            this.integer.getChildByName("numLabel").getChildByName("img_num" + (9 - i)).active = true;
        }
    },
    update(dt) {
        if (!this.rollingData) return
        for (let i = 0; i < this.rollingData.length; i++) {
            let cutTime = this.getcurTime(this.rollingData[i].updateTime * 1000);
            if (cutTime <= 0 && !this.rollingData[i].played) {
                this.rollingData[i].played = true;
                this.addItem(this.rollingData[i]);
                let nowNumber = this.totalAmount;
                this.totalAmount += this.rollingData[i].cashAmount
                console.log("这是开始变化之前", nowNumber, this.totalAmount, this.totalAmount - nowNumber, this.rollingData[i].cashAmount);
                this.myCoinshow(nowNumber);
                break;
            }
        }

        let countDown = new Date(Date.now() + this.serverTimeoff).getSeconds();
        if (countDown <= 0 && !this.boolreqData) {
            this.boolreqData = true;
            glGame.gameNet.send_msg("http.ReqCashBroadcastList", {}, (route, data) => {
                this.defData = data.list.defData;
                this.rollingData = data.list.rollingData;
                this.serverTimeoff = data.serverTime * 1000 - Date.now();
                let totalAmount = data.totalAmount;
                this.myCoinshow(totalAmount);
                this.totalAmount = totalAmount
            })
        } else if (countDown > 0 && this.boolreqData) {
            this.boolreqData = false;
        }
    },
    //刷新记录
    addItem(data) {
        if (!data) return
        if (this.cashRecord.childrenCount >= 6) {
            this.cashRecord.children[0].destroy();
            this.cashRecord.children[0].removeFromParent();
        }
        let cashItem = cc.instantiate(this.cashItem);
        cashItem.parent = this.cashRecord;
        cashItem.active = false;
        let timeStamp = new Date(data.updateTime * 1000);
        let strTime = `${timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1)}/`
        strTime += `${timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate()}`
        strTime += ` ${timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours()}:`
        strTime += `${timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes()}`
        let logicId = data.logicId, cashAmount = data.cashAmount;
        cashItem.getChildByName("notice").getComponent(cc.RichText).string =
            `${strTime} - 恭贺<color=#7de2ff>${logicId}</c><size=26>成功提现<color=#f4c404>${this.getFloat(cashAmount)}元。</c></size>`


        glGame.panel.showEffectNode(this, this.cashRecord, 0.02, true);
    },
    reqDrawCoin() {
        glGame.gameNet.send_msg("http.ReqWithdrawCoin", null, (route, data) => {
            this.unit = data.unit; // 取现倍数
            this.type = data.type  // 1. 固定手续费 2 按比例收费
            this.fee = data.fee  //手续费金额或比例
            this.start = data.withdraw_deposit_start // 单次提现限额区间设定初
            this.end = data.withdraw_deposit_end //线上支付限额区间设定末
            this.isNoUpperLimit = data.isNoUpperLimit // 是否为无上限 1代表无上限，0代表有上限值
            this.coin = data.coin //可提现金额
            this.mode = data.mode // bank  alipay   是否允许支付宝或者银行提现
            this.cashPwdMode = data.cashPwdMode //取现密码找回配置，1为通过手机验证码 2 联系客服
            this.unsatisfiedCoin = data.unsatisfiedCoin;//还有多少金币满足打码量要求
            this.showMode();
            this.setExtractRule();
            this.initViewData();
        })
    },
    reqWithdrawConfig() {
        glGame.gameNet.send_msg("http.reqWithdrawConfig", null, (route, data) => {
            this.phoneCode = data.phone;
            this.checkType = data.phone_check;
            this.drawPwdState = data.cash_password;

            if (this.checkType == 0) {
                glGame.user.reqWithdraw(Number(this.edbNumBank.string), this.index);
            } else if (this.checkType == 2 && this.drawPwdState == 0) {
                this.showSetDrawPassword();
            } else if (this.checkType == 1 && !this.checkPhone(this.phoneCode)) {
                this.showSetPhoneCode();
            } else if (this.checkType == 2 && this.drawPwdState != 0) {
                this.showPassword();
            } else if (this.checkType == 1 && this.checkPhone(this.phoneCode)) {
                this.showPhoneCode();
            }
        })
    },

    checkPhone(phone) {
        if (typeof phone == "sting" && phone == "") return false;
        else if (typeof phone == "number" && phone == 0) return false;
        else if (phone == null) return false;
        return true;
    },

    showSetDrawPassword() {
        glGame.panel.showPanelByName("setExtractpass").then(prefab => {
            let script = prefab.getComponent("setExtractpass");
            script.setTips(this.cashPwdMode);
            script.set("type", this.index);
            script.set("coin", this.edbNumBank.string);
        });

    },
    showSetPhoneCode() {
        glGame.panel.showPanelByName("bindPhone");       //绑定
    },
    showPassword() {
        glGame.panel.showPanelByName("extractpass").then(prefab => {
            prefab.getComponent("extractpass").initView(this.index, this.edbNumBank.string, this.cashPwdMode);
        });

    },
    showPhoneCode() {
        let phone = glGame.user.get("phone").toString();
        if (!phone || phone == "" || phone == "0") {
            glGame.panel.showPanelByName("bindPhone");       //绑定
            return;
        }

        glGame.panel.showPanelByName("extractVerifica").then(prefab => {
            let script = prefab.getComponent("extractVerifica");
            script.initData(glGame.user.get("phone"), this.edbNumBank.string)
            script.set("type", this.index)
        });
    },
    //设置手续费提示
    setExtractRule() {
        this.lab_extractRule.string = "";
        //免手续费
        let content1 = this.unit <= 1 ? "免手续费" : `只支持${this.getFloat(this.unit)}的倍数,免手续费`;
        //收手续费
        let str;
        str = this.type == 1 ? `${this.getFloat(this.fee)}` : `${this.getFloat(this.fee)}%`
        let content2 = ''
        if (this.fee == 0) {
            content2 = this.unit <= 1 ? "" : `只支持${this.getFloat(this.unit)}的倍数`;
        } else {
            if (this.type == 2) {
                content2 = this.unit <= 1 ? `收取${str}手续费` : `只支持${this.getFloat(this.unit)}的倍数,且收取${str}手续费`;
            } else {
                content2 = this.unit <= 1 ? `收取${str}元手续费` : `只支持${this.getFloat(this.unit)}的倍数,且收取${str}元手续费`;
            }
        }
        this.lab_extractRule.string = this.type == 3 ? content1 : content2;
        if (this.unsatisfiedCoin == 0) {
            this.lab_ask.string = `<color=#48d4a8>您身上所有金币都已满足打码量要求，无提现限制</c>`
        } else {
            this.lab_ask.string = `<color=#cee0fe>当前还有</c><color=#f44d4d>${this.getFloat(this.unsatisfiedCoin)}</c><color=#cee0fe>金币未满足打码量要求</c>`
        }

    },
    //提现渠道初始化
    showMode() {
        this.bankCash.node.active = this.mode.bank == 1;
        this.alipayCash.node.active = this.mode.alipay == 1;
        if (this.mode.bank != 1 && this.mode.alipay == 1) {
            this.index = EXTRACT_TYPE.ALIPAY;
            this.alipayCash.isChecked = true;
        } else if (this.mode.bank != 1 && this.mode.alipay != 1) {
            this.selectCash.active = false;
            this.index = EXTRACT_TYPE.NONE
        } else {
            this.index = EXTRACT_TYPE.BANK;
            this.bankCash.isChecked = true;
        }
    },
    updateUserData() {
        this.extractBank.getChildByName("bankNumber").active = false;
        this.extractBank.getChildByName("bindbank").active = false;
        this.extractAlipay.getChildByName("aliNumber").active = false;
        this.extractAlipay.getChildByName("bindAlipay").active = false;
        this.initViewData();
        console.log("刷新主页面信息")
    },
    //初始化页面的数据
    initViewData() {
        let bank_card = glGame.user.get("bankCardNum"),
            alipay = glGame.user.get("alipayAcc");
        if (bank_card && bank_card != "") {
            this.extractBank.getChildByName("bankNumber").active = true
            this.extractBank.getChildByName("bindbank").active = false;
            this.extractBank.getChildByName("bankNumber").getComponent(cc.Label).string = bank_card.replace(bank_card.substring(4, 13), "*********");
        } else {
            this.extractBank.getChildByName("bindbank").active = true
            this.extractBank.getChildByName("bankNumber").active = false
        }
        if (alipay && alipay != "") {
            this.extractAlipay.getChildByName("aliNumber").active = true;
            this.extractAlipay.getChildByName("bindAlipay").active = false;
            this.extractAlipay.getChildByName("aliNumber").getComponent(cc.Label).string = alipay.replace(alipay.substring(3, 7), "****");;
        } else {
            this.extractAlipay.getChildByName("bindAlipay").active = true;
            this.extractAlipay.getChildByName("aliNumber").active = false
        }
        if (this.index == EXTRACT_TYPE.ALIPAY) this.extractAlipay.active = true;
        else if (this.index == EXTRACT_TYPE.BANK) this.extractBank.active = true;

        this.edbNumNode.getSelfFunc().setString("");

        let X = Math.max((this.start).div(100), Number(this.unit).div(100));
        let Z = parseInt(Number(this.coin).div(100) / Number(this.unit).div(100)) * Number(this.unit).div(100)
        let Y = null;
        if (Z) {
            if (this.isNoUpperLimit == 0) {
                let endValue = parseInt(Number(this.end).div(100) / Number(this.unit).div(100)) * Number(this.unit).div(100)
                Y = Math.min(endValue, Z);
            } else {
                Y = Z;
            }
        } else {
            Y = Number(this.coin).div(100)
        }

        // if (this.coin >= this.unit) {
        //     if (this.coin == 0) {
        //         this.edbNumNode.getSelfFunc().setPlaceholder("当前无法提现");
        //     } else {
        //         // let start = this.unit > this.start ? this.unit : this.start;
        //         // // let end = this.coin <= this.end ? Number(this.coin).sub(this.coin % this.unit) : Number(this.end).sub(this.end % this.unit);
        //         // let end = this.end;
        //         // this.edbNumNode.getSelfFunc().setPlaceholder(`${this.getFloat(start)}~${this.getFloat(end)}`);

        //         this.edbNumNode.getSelfFunc().setPlaceholder(`${X}~${Y}`);
        //     }
        // } else {
        //     this.edbNumNode.getSelfFunc().setPlaceholder("当前无法提现");
        // }
        if (X > Y) {
            this.edbNumNode.getSelfFunc().setPlaceholder("可提现金额不足，无法提现");
        } else {
            if (this.coin == 0) {
                this.edbNumNode.getSelfFunc().setPlaceholder("可提现金额不足，无法提现");
            } else {
                this.edbNumNode.getSelfFunc().setPlaceholder(`${X}~${Y}`);
            }
        }

        this.lab_cashCoin.string = this.getFloat(this.coin);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "alipayCash": this.click_alipayCash(); break;
            case "bankCash": this.click_bankCash(); break;
            case "btn_waterRule": this.click_waterRule(); break;
            case "btn_extractMgr": this.click_extractMgr(); break;
            case "btn_extractRecord": this.click_extractRecord(); break;
            case "btn_bindbank": this.click_bindbank(); break;
            case "btn_bindalipay": this.click_bindalipay(); break;
            case "btn_sure": this.sureExtract(); break;
            case "btn_extractRecord": this.extractRecord(); break;

        }
    },
    //取现记录
    extractRecord() {

    },
    //支付宝提现
    reqextractAlipay() {
        let amount = this.extractAlipay.getChildByName("extractNum").getChildByName("EditBox").getComponent(cc.EditBox).string;
        glGame.panel.showPanelByName("extractpass").then(prefab => {
            prefab.getComponent("extractpass").set("amount", amount);
        });
    },
    //确认提现
    sureExtract() {
        console.log("confirmDraw confirmDraw confirmDraw")
        if (this.coin == 0 && glGame.user.get("coin") != 0) {                       //判断是否开启稽核，目前先这么判断
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.LOCK);
        }
        let edbStr = this.edbNumBank.string;
        // if (edbStr.indexOf(".") > 0 && edbStr.length - edbStr.indexOf(".") > 2) {
        //     this.edbNumNode.getSelfFunc().setString(edbStr.substr(0, edbStr.indexOf(".")+3));
        // }

        if (edbStr.length == 0) {
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.EMPTY_INPUT);
        }

        if (Number(edbStr) < this.getFloat(Number(this.start))) {
            console.log('输入金额与最低金额', Number(edbStr), Number(this.start))
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.OUT_OF_RANGE);
        }
        if (this.isNoUpperLimit == 0 && Number(edbStr) > this.getFloat(Number(this.end))) {
            console.log('输入金额与最大金额', Number(edbStr), Number(this.end))
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.OUT_OF_RANGE);
        }
        console.log("confirmDraw confirmDraw confirmDraw1")
        if (!/^\d+(\.\d{0,2})?$/.test(this.edbNumBank.string)) {
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.NONUMBER);
        }
        console.log("confirmDraw confirmDraw confirmDraw2", this.edbNumBank.string)
        let amount = Number(this.edbNumBank.string);
        if (!amount || amount < 0) {
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.EXCLITTLE);
        }
        console.log("confirmDraw confirmDraw confirmDraw3")
        let num = amount / this.getFloat(this.unit);// 判断领取倍数
        if (num.toString().indexOf(".") > -1) {
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.MUST_INTEGER.format(this.getFloat(this.unit)));
        }
        console.log("confirmDraw confirmDraw confirmDraw4")
        let userCoin = this.coin;
        if (userCoin - amount < this.getFloat(this.unit)) {
            return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.MINGOLD.format(this.getFloat(this.unit)));
        }
        console.log("confirmDraw confirmDraw confirmDraw5")
        let type = this.drawtype;

        if (this.isNoUpperLimit == 0) {
            let end = this.coin <= this.end ? Number(this.coin).sub(this.coin % this.unit) : this.end;
            if (amount > this.getFloat(end)) return glGame.panel.showTip(glGame.tips.EXCHANGE.OUT_OF_LIMIT);
        }

        //if (isShowNext) return;
        let accountStr = this.index == 1 ? glGame.user.get("alipayAcc") : glGame.user.get("bankCardNum");
        console.log("账号账号账号", accountStr);
        if (!accountStr) {
            let tipstr = this.index == 1 ? glGame.tips.EXCHANGE.BIND_ZFB : glGame.tips.EXCHANGE.BIND_BANK;
            return glGame.panel.showErrorTip(tipstr);
        }
        if (amount > glGame.user.get("coin")) return glGame.panel.showTip(glGame.tips.EXCHANGE.MONEY_NOT_ENOUGH);


        this.reqWithdrawConfig();
    },

    //桌面数据的显示
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    //提现在支付宝
    click_alipayCash() {
        this.index = EXTRACT_TYPE.ALIPAY;
        this.extractAlipay.active = true;
        this.extractBank.active = false;
    },
    //提现到银行
    click_bankCash() {
        this.index = EXTRACT_TYPE.BANK;
        this.extractAlipay.active = false;
        this.extractBank.active = true;
    },
    //提现管理
    click_extractMgr() {
        glGame.panel.showPanelByName("extractMgr").then(prefab => {
            prefab.getComponent("extractMgr").initViewData(2);
        });

    },
    //打码量要求
    click_waterRule() {
        glGame.panel.showPanelByName("backWaterRule");
    },
    //提现记录
    click_extractRecord() {
        glGame.panel.showPanelByName("exchangerecord");
    },
    //绑定银行卡
    click_bindbank() {
        glGame.panel.showPanelByName("extractMgr").then(prefab => {
            prefab.getComponent("extractMgr").initViewData(2);
        });
    },
    //绑定支付宝
    click_bindalipay() {
        glGame.panel.showPanelByName("extractMgr").then(prefab => {
            prefab.getComponent("extractMgr").initViewData(1);
        });
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    // update (dt) {},
});

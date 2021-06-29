
glGame.baseclass.extend({

    properties: {
        bindbank: cc.Node,
        bindbankSucced: cc.Node,
        bindAlipay: cc.Node,
        bindAlipaySucceed: cc.Node,
        toggle_bankCash: cc.Toggle,
        toggle_alipayCash: cc.Toggle,

        binkContent: cc.Node,
        bankItem: cc.Node,
        scrollView: cc.Node,
        bank_catdType: cc.EditBox,
        btn_openList:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        glGame.emitter.on("updateUserData", this.updateUserData, this);
        this.fetchJSON();
        this.btn_openList.active = glGame.gamecfg.bankModel == 1
    },
    updateUserData() {
        this.initViewData(this.index);
    },
    initViewData(index) {
        this.bindbank.active = true;
        this.bindbankSucced.active = true;
        this.bindAlipay.active = true;
        this.bindAlipaySucceed.active = true;
        let bank_card = glGame.user.get("bankCardNum"),
            alipay = glGame.user.get("alipayAcc"),
            alipayName = glGame.user.get("alipayName"),
            bankCardName = glGame.user.get("bankCardName"),
            bankCardType = glGame.user.get("bankCardType");
        if (bank_card && bank_card != "") {
            this.bankShow = this.bindbankSucced;
            this.bankShow.getChildByName("lab_bankNumber").getComponent(cc.Label).string = bank_card.replace(bank_card.substring(4, 13), "*********");
            this.bankShow.getChildByName("lab_bankName").getComponent(cc.Label).string = bankCardType
            this.bankShow.getChildByName("lab_userName").getComponent(cc.Label).string = bankCardName
        } else {
            this.bankShow = this.bindbank;
            let name = bankCardName;
            if(bankCardName==null || bankCardName=="") {
                name = glGame.user.get("name");
            }

            if (name && name != "") {
                let userName = this.bankShow.getChildByName("userName");
                userName.getChildByName("bankMask").active = true;
                userName.getSelfFunc().setString(`${name}`);
            } else {
                let userName = this.bankShow.getChildByName("userName");
                userName.getSelfFunc().setString("");
            }
        }
        if (alipay && alipay != "") {
            this.alipayShow = this.bindAlipaySucceed;
            this.alipayShow.getChildByName("lab_alipayNum").getComponent(cc.Label).string = alipay.replace(alipay.substring(3, 7), "****");
            this.alipayShow.getChildByName("lab_username").getComponent(cc.Label).string = alipayName
        } else {
            this.alipayShow = this.bindAlipay;
            let name = alipayName;
            if(alipayName==null || alipayName=="") {
                name = glGame.user.get("name");
            }
            
            if(name && name != ""){
                let userName = this.alipayShow.getChildByName("userName");
                userName.getChildByName("alipayMask").active = true;
                userName.getSelfFunc().setString(`${name}`);
            } else {
                let userName = this.alipayShow.getChildByName("userName");
                userName.getSelfFunc().setString("");
            }
        }
        this.bindbank.active = false;
        this.bindbankSucced.active = false;
        this.bindAlipay.active = false;
        this.bindAlipaySucceed.active = false;
        this.index = index;
        index == 1 ? this.toggle_alipayCash.check() : this.toggle_bankCash.check();
        index == 1 ? this.alipayShow.active = true : this.bankShow.active = true;
    },
    reqBindBank() {
        let bank_id = this.bankShow.getChildByName("bankName").getChildByName("EditBox").getComponent(cc.EditBox).string,
            bank_card = this.bankShow.getChildByName("bankNumber").getChildByName("EditBox").getComponent(cc.EditBox).string,
            userName = this.bankShow.getChildByName("userName").getChildByName("EditBox").getComponent(cc.EditBox).string;
        console.log("这是绑定银行卡的信息", bank_id, bank_card, userName);

        let bankCheck = /[1-9]\d{12,20}/
        if(bank_card == ""){
            return glGame.panel.showErrorTip(glGame.tips.BIND.NOINVALIDCARD);
        }else if(!bankCheck.test(bank_card)){
            return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARD);
        }
        if(bank_id == ""){
            return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARDBANKNAME);
        }
        if(userName == ""){
            return glGame.panel.showErrorTip(glGame.tips.BIND.NOINVALIDCARDNAME);
        }else if(!this.checkUserName(userName)){
            return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARDNAME);
        }
        
        
        glGame.user.reqBindBank(bank_id, bank_card, userName);
    },
    reqBindAlipay() {
        let alipayID = this.alipayShow.getChildByName("alipayNumber").getChildByName("EditBox").getComponent(cc.EditBox).string,
            alipayName = this.alipayShow.getChildByName("userName").getChildByName("EditBox").getComponent(cc.EditBox).string;
        console.log("这是绑定支付宝的信息", alipayID, alipayName);
        if(alipayName.length == 0) {
            return glGame.panel.showErrorTip(glGame.tips.BIND.EMPTYZFBNAME);
        }

        if(!this.checkUserName(alipayName)){
            return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDZFBNAME);
        }

        if(alipayID.length == 0) {
            return glGame.panel.showErrorTip(glGame.tips.BIND.EMPTYZFB);
        }

        if(!this.checkAlipay(alipayID)){
            return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDZFB);
        }
        glGame.user.reqBindAlipay(alipayID, alipayName);
    },
    fetchJSON() {
        glGame.fileutil.fetchJSON("bankList").then(data => {
            this.bankList = data.json
            console.log("这是银行的列表", this.bankList)
        })
    },
    //字体变化的时候检索银行
    inputChange() {
        console.log("当前文字变化")
        this.binkContent.destroyAllChildren();
        this.scrollView.active = true;
        for (let i = 0; i < this.bankList.length; i++) {
            let str = this.bankList[i].indexOf(this.bank_catdType.string);
            if (str != -1) {
                let Item = cc.instantiate(this.bankItem);
                Item.getChildByName("bankname").getComponent(cc.Label).string = this.bankList[i];
                Item.parent = this.binkContent;
                Item.active = true;
            }
        }
    },
    //显示全部银行
    showAllBank(){
        this.binkContent.destroyAllChildren();
        this.scrollView.active = true;
        for (let i = 0; i < this.bankList.length; i++) {
                let Item = cc.instantiate(this.bankItem);
                Item.getChildByName("bankname").getComponent(cc.Label).string = this.bankList[i];
                Item.parent = this.binkContent;
                Item.active = true;
        }
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "toggle_bankCash": this.bankCash(); break;
            case "toggle_alipayCash": this.alipayCash(); break;
            case "btn_sure": this.sureBind(); break;
            case "btn_service": this.btn_service(); break;
            case "btn_openList": this.showAllBank();break;
            case "bankItem":
                this.bank_catdType.node.parent.getSelfFunc().setString(node.getChildByName("bankname").getComponent(cc.Label).string);
                this.scrollView.active = false;
                break;
            case "ScrollViewBg":
                this.scrollView.active = false;
                break;
            case "alipayMask":
                glGame.panel.showErrorTip(glGame.tips.BIND.LOCKZFBNAME);
                break;
            case "bankMask":
                glGame.panel.showErrorTip(glGame.tips.BIND.LOCKCARDNAME);
                break;
        }
    },
    //检测玩家名字是否合法
    checkUserName(name){
        let checkName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        if(!checkName.test(name)){
            return false
        }
        return true
    },
    //检测支付宝账户
    checkAlipay(account){
        let checkAliAccount = /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/;
        if(!checkAliAccount.test(account)){
            return false
        }
        return true
    },
    //检测银行卡号
    checkBankNumber(number){
        let checkBankNumber = /^[0-9]*$/
        if(!checkBankNumber.test(number)){
            return false
        }
        return true
    },
    //确认绑定银行卡
    sureBind() {
        this.index == 2 ? this.reqBindBank() : this.reqBindAlipay();
    },

    //联系客服
    btn_service() {
        glGame.panel.showService();
    },

    //银行卡管理
    bankCash() {
        this.index = 2
        this.bankShow.active = true;
        this.alipayShow.active = false;
    },
    //支付宝管理
    alipayCash() {
        this.index = 1
        this.bankShow.active = false;
        this.alipayShow.active = true;
    },
    OnDestroy() {
        glGame.emitter.off("updateUserData", this);
    },
    // update (dt) {},
});

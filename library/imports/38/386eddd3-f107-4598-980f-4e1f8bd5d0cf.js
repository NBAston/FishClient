"use strict";
cc._RF.push(module, '386ed3T8QdFmJgPTh+L1dDP', 'extractMgr');
// modules/plaza/script/prefab/withdrawal/popup/extractMgr.js

"use strict";

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
    btn_openList: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    glGame.emitter.on("updateUserData", this.updateUserData, this);
    this.fetchJSON();
    this.btn_openList.active = glGame.gamecfg.bankModel == 1;
  },
  updateUserData: function updateUserData() {
    this.initViewData(this.index);
  },
  initViewData: function initViewData(index) {
    this.bindbank.active = true;
    this.bindbankSucced.active = true;
    this.bindAlipay.active = true;
    this.bindAlipaySucceed.active = true;
    var bank_card = glGame.user.get("bankCardNum"),
        alipay = glGame.user.get("alipayAcc"),
        alipayName = glGame.user.get("alipayName"),
        bankCardName = glGame.user.get("bankCardName"),
        bankCardType = glGame.user.get("bankCardType");

    if (bank_card && bank_card != "") {
      this.bankShow = this.bindbankSucced;
      this.bankShow.getChildByName("lab_bankNumber").getComponent(cc.Label).string = bank_card.replace(bank_card.substring(4, 13), "*********");
      this.bankShow.getChildByName("lab_bankName").getComponent(cc.Label).string = bankCardType;
      this.bankShow.getChildByName("lab_userName").getComponent(cc.Label).string = bankCardName;
    } else {
      this.bankShow = this.bindbank;
      var name = bankCardName;

      if (bankCardName == null || bankCardName == "") {
        name = glGame.user.get("name");
      }

      if (name && name != "") {
        var userName = this.bankShow.getChildByName("userName");
        userName.getChildByName("bankMask").active = true;
        userName.getSelfFunc().setString("".concat(name));
      } else {
        var _userName = this.bankShow.getChildByName("userName");

        _userName.getSelfFunc().setString("");
      }
    }

    if (alipay && alipay != "") {
      this.alipayShow = this.bindAlipaySucceed;
      this.alipayShow.getChildByName("lab_alipayNum").getComponent(cc.Label).string = alipay.replace(alipay.substring(3, 7), "****");
      this.alipayShow.getChildByName("lab_username").getComponent(cc.Label).string = alipayName;
    } else {
      this.alipayShow = this.bindAlipay;
      var _name = alipayName;

      if (alipayName == null || alipayName == "") {
        _name = glGame.user.get("name");
      }

      if (_name && _name != "") {
        var _userName2 = this.alipayShow.getChildByName("userName");

        _userName2.getChildByName("alipayMask").active = true;

        _userName2.getSelfFunc().setString("".concat(_name));
      } else {
        var _userName3 = this.alipayShow.getChildByName("userName");

        _userName3.getSelfFunc().setString("");
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
  reqBindBank: function reqBindBank() {
    var bank_id = this.bankShow.getChildByName("bankName").getChildByName("EditBox").getComponent(cc.EditBox).string,
        bank_card = this.bankShow.getChildByName("bankNumber").getChildByName("EditBox").getComponent(cc.EditBox).string,
        userName = this.bankShow.getChildByName("userName").getChildByName("EditBox").getComponent(cc.EditBox).string;
    console.log("这是绑定银行卡的信息", bank_id, bank_card, userName);
    var bankCheck = /[1-9]\d{12,20}/;

    if (bank_card == "") {
      return glGame.panel.showErrorTip(glGame.tips.BIND.NOINVALIDCARD);
    } else if (!bankCheck.test(bank_card)) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARD);
    }

    if (bank_id == "") {
      return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARDBANKNAME);
    }

    if (userName == "") {
      return glGame.panel.showErrorTip(glGame.tips.BIND.NOINVALIDCARDNAME);
    } else if (!this.checkUserName(userName)) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDCARDNAME);
    }

    glGame.user.reqBindBank(bank_id, bank_card, userName);
  },
  reqBindAlipay: function reqBindAlipay() {
    var alipayID = this.alipayShow.getChildByName("alipayNumber").getChildByName("EditBox").getComponent(cc.EditBox).string,
        alipayName = this.alipayShow.getChildByName("userName").getChildByName("EditBox").getComponent(cc.EditBox).string;
    console.log("这是绑定支付宝的信息", alipayID, alipayName);

    if (alipayName.length == 0) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.EMPTYZFBNAME);
    }

    if (!this.checkUserName(alipayName)) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDZFBNAME);
    }

    if (alipayID.length == 0) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.EMPTYZFB);
    }

    if (!this.checkAlipay(alipayID)) {
      return glGame.panel.showErrorTip(glGame.tips.BIND.INVALIDZFB);
    }

    glGame.user.reqBindAlipay(alipayID, alipayName);
  },
  fetchJSON: function fetchJSON() {
    var _this = this;

    glGame.fileutil.fetchJSON("bankList").then(function (data) {
      _this.bankList = data.json;
      console.log("这是银行的列表", _this.bankList);
    });
  },
  //字体变化的时候检索银行
  inputChange: function inputChange() {
    console.log("当前文字变化");
    this.binkContent.destroyAllChildren();
    this.scrollView.active = true;

    for (var i = 0; i < this.bankList.length; i++) {
      var str = this.bankList[i].indexOf(this.bank_catdType.string);

      if (str != -1) {
        var Item = cc.instantiate(this.bankItem);
        Item.getChildByName("bankname").getComponent(cc.Label).string = this.bankList[i];
        Item.parent = this.binkContent;
        Item.active = true;
      }
    }
  },
  //显示全部银行
  showAllBank: function showAllBank() {
    this.binkContent.destroyAllChildren();
    this.scrollView.active = true;

    for (var i = 0; i < this.bankList.length; i++) {
      var Item = cc.instantiate(this.bankItem);
      Item.getChildByName("bankname").getComponent(cc.Label).string = this.bankList[i];
      Item.parent = this.binkContent;
      Item.active = true;
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "toggle_bankCash":
        this.bankCash();
        break;

      case "toggle_alipayCash":
        this.alipayCash();
        break;

      case "btn_sure":
        this.sureBind();
        break;

      case "btn_service":
        this.btn_service();
        break;

      case "btn_openList":
        this.showAllBank();
        break;

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
  checkUserName: function checkUserName(name) {
    var checkName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;

    if (!checkName.test(name)) {
      return false;
    }

    return true;
  },
  //检测支付宝账户
  checkAlipay: function checkAlipay(account) {
    var checkAliAccount = /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/;

    if (!checkAliAccount.test(account)) {
      return false;
    }

    return true;
  },
  //检测银行卡号
  checkBankNumber: function checkBankNumber(number) {
    var checkBankNumber = /^[0-9]*$/;

    if (!checkBankNumber.test(number)) {
      return false;
    }

    return true;
  },
  //确认绑定银行卡
  sureBind: function sureBind() {
    this.index == 2 ? this.reqBindBank() : this.reqBindAlipay();
  },
  //联系客服
  btn_service: function btn_service() {
    glGame.panel.showService();
  },
  //银行卡管理
  bankCash: function bankCash() {
    this.index = 2;
    this.bankShow.active = true;
    this.alipayShow.active = false;
  },
  //支付宝管理
  alipayCash: function alipayCash() {
    this.index = 1;
    this.bankShow.active = false;
    this.alipayShow.active = true;
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("updateUserData", this);
  } // update (dt) {},

});

cc._RF.pop();
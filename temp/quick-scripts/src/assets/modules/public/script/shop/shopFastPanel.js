"use strict";
cc._RF.push(module, '069f2IIsuZJ85kXaa2rWCsy', 'shopFastPanel');
// modules/public/script/shop/shopFastPanel.js

"use strict";

var payType = {
  1: "bankcardpay",
  2: "alipay",
  3: "wechatpay"
};
glGame.baseclass.extend({
  properties: {
    btn_pay: cc.Button
  },
  onLoad: function onLoad() {
    glGame.emitter.on("payCreateOrdererror", this.payCreateOrder, this);
  },
  payCreateOrder: function payCreateOrder() {
    this.btn_pay.interactable = true;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.btn_closeCb();
        break;

      case "btn_save":
        this.btn_saveCb();
        break;

      case "btn_open":
        this.btn_openCb();
        break;

      case "btn_paynormal":
        this.btn_paynormalCb();
        break;

      case "banker":
      case "copy_banker":
        glGame.platform.copyToClip(this.ShopData.currentRotationAccount.bankName);
        break;

      case "bankerNumber":
      case "copy_number":
        glGame.platform.copyToClip(this.ShopData.currentRotationAccount.accountName);
        break;

      case "name":
      case "copy_name":
        glGame.platform.copyToClip(this.ShopData.currentRotationAccount.name);
        break;

      case "bankarea":
      case "copy_bankarea":
        glGame.platform.copyToClip(this.ShopData.currentRotationAccount.bankBranches);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  initUI: function initUI(data, rechargecoin, giveProportion, type) {
    console.log("这是当前的数据", data);
    this.ShopData = data;
    this.giveProportion = giveProportion;
    this.rechargecoin = rechargecoin;
    this.depositType = type;
    this.CurTypeNode = this.node.getChildByName(payType[data.currentRotationAccount.type]);
    this.curType = data.currentRotationAccount.type;
    this.CurTypeNode.active = true;

    if (data.currentRotationAccount.type == 2 || data.currentRotationAccount.type == 3) {
      this.qrcode = data.currentRotationAccount.qrCode;
      var qrCode111 = glGame.user.get('url').resource_url + data.currentRotationAccount.qrCode;
      glGame.panel.showRemoteImage(this.CurTypeNode.getChildByName("QRcode"), qrCode111);
      this.CurTypeNode.getChildByName("name").getChildByName("acceptname").getComponent(cc.Label).string = data.currentRotationAccount.name;
    }

    if (data.currentRotationAccount.type == 1) {
      var bankerNode = this.CurTypeNode.getChildByName("acceptName");
      bankerNode.getChildByName('banker').getComponent(cc.Label).string = data.currentRotationAccount.bankName;
      bankerNode.getChildByName('bankerNumber').getComponent(cc.Label).string = data.currentRotationAccount.accountName;

      if (data.currentRotationAccount.name.length > 10) {
        bankerNode.getChildByName('name').getComponent(cc.Label).overflow = cc.Label.Overflow.SHRINK;
        bankerNode.getChildByName('name').width = 250;
      }

      console.log("这是当前的overflow", bankerNode.getChildByName('name').getComponent(cc.Label));
      bankerNode.getChildByName('name').getComponent(cc.Label).string = data.currentRotationAccount.name;
    }

    this.CurTypeNode.getChildByName("bg").getChildByName("tip").getChildByName("New Label").getComponent(cc.Label).string = "*\u6E29\u99A8\u63D0\u793A\uFF1A\u5355\u7B14\u91D1\u989D\u5145\u503C".concat(this.getFloat(data.currentRotationAccount.config.rechargeMin), "\u5143\u8D77");
    this.CurTypeNode.getChildByName("pay").getChildByName("rechargecoin").getSelfFunc().setString("".concat(rechargecoin, "\u5143"));
  },
  onTextChanged: function onTextChanged(text, editbox, customEventData) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    var isChinese = reg.test(editbox.string);
    console.log('是否为中文字符', isChinese);

    if (isChinese) {
      editbox.string = '';
      editbox.node.getChildByName('TEXT_LABEL').getComponent(cc.Label).string = '';
      glGame.panel.showErrorTip(glGame.tips.SHOP.INVALIDCONTENT);
      return;
    }
  },
  // 手机输入框改变
  onCardEditChanged: function onCardEditChanged(text, editbox, customEventData) {
    if (text.length > 5) {
      text = text.substring(0, 5);
    }

    var cardTail = parseInt(text);

    if (isNaN(cardTail)) {
      cardTail = 0;
    }

    cardTail = Math.abs(cardTail);
    editbox.string = cardTail;
    editbox.node.getChildByName('TEXT_LABEL').getComponent(cc.Label).string = cardTail;
  },
  btn_paynormalCb: function btn_paynormalCb() {
    var _this = this;

    if (this.isSend) return glGame.panel.showErrorTip(glGame.tips.SHOP.TOOBUSY);
    var orderName = this.CurTypeNode.getChildByName("pay").getChildByName("rechargename").getChildByName("EditBox").getComponent(cc.EditBox).string;
    var orderNum = this.CurTypeNode.getChildByName("pay").getChildByName("rechargeNumber").getChildByName("EditBox").getComponent(cc.EditBox).string;

    if (orderName == '') {
      glGame.panel.showErrorTip(glGame.tips.SHOP.USERNAMENULL);
      return;
    }

    if (orderNum == "") {
      glGame.panel.showErrorTip(this.curType == 1 ? glGame.tips.SHOP.CARDTAILNULL : glGame.tips.SHOP.ORDERTAILNULL);
      return;
    }

    if (orderNum.length != 5) {
      glGame.panel.showErrorTip(this.curType == 1 ? glGame.tips.SHOP.INVALIDCARDTAIL : glGame.tips.SHOP.INVALIDORDERTAIL);
      return;
    }

    if (orderName != '' && (this.type == 1 || this.type == 2)) {
      var _reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;

      if (!_reg.test(orderName)) {
        glGame.panel.showErrorTip(glGame.tips.SHOP.INVALIDUSERNAME);
        return;
      }
    }

    var reg = /^\w{2,15}$/;
    var isCoinNum_matcher = reg.test(orderNum);

    if (!isCoinNum_matcher) {
      glGame.panel.showErrorTip(this.curType == 1 ? glGame.tips.SHOP.INVALIDCARDTAIL : glGame.tips.SHOP.INVALIDORDERTAIL);
      return;
    }

    var msg = {};
    msg.type = this.depositType;
    msg.orderMoney = Number(this.rechargecoin) * 100;
    msg.giveProportion = this.giveProportion;
    msg.companyAccountId = this.ShopData.currentRotationAccount.accountId;
    msg.companyAccountName = this.ShopData.currentRotationAccount.name;
    msg.companyAccountNo = this.ShopData.currentRotationAccount.accountName;

    if (this.ShopData.currentRotationAccount.bankName) {
      msg.companyAccountBankName = this.ShopData.currentRotationAccount.bankName;
    }

    msg.companyDepositName = this.CurTypeNode.getChildByName("pay").getChildByName("rechargename").getChildByName("EditBox").getComponent(cc.EditBox).string.trim();
    msg.externalOrderSn = this.CurTypeNode.getChildByName("pay").getChildByName("rechargeNumber").getChildByName("EditBox").getComponent(cc.EditBox).string;
    msg.pageId = this.ShopData.id;
    console.log("这是当前的提交信息", msg);
    this.isSend = true;
    this.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
      _this.isSend = false;
    })));
    glGame.gameNet.send_msg('http.ReqPayCreateOrder', msg, function (route, data) {
      if (data.state) {
        glGame.emitter.emit("showSuccessAnim", true);
      } else {
        glGame.emitter.emit("showSuccessAnim", false);
      }

      _this.node.destroy();

      console.log("这是创建订单的回包", data);
    });
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  btn_closeCb: function btn_closeCb() {
    this.remove();
  },
  btn_saveCb: function btn_saveCb() {
    if (cc.sys.isNative) {
      glGame.platform.saveToLocal(glGame.user.get("url").resource_url + this.qrcode);
    }
  },
  btn_openCb: function btn_openCb() {
    var type = 1;

    if (this.ShopData.currentRotationAccount.type == 2) {
      type = 5;
    } else if (this.ShopData.currentRotationAccount.type == 3) {
      type = 2;
    }

    var jump = glGame.user.get('url').service_url_jump;
    var url = jump + '?' + "jump_type=".concat(type);
    cc.sys.openURL(url);
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("payCreateOrdererror", this);
  }
});

cc._RF.pop();
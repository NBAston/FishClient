"use strict";
cc._RF.push(module, 'b13b4P0d89MAICksU5jaR59', 'shopNomalPanel');
// modules/public/script/shop/shopNomalPanel.js

"use strict";

var SHOPTYPE = {
  BANK: 1,
  ALIPAY: 2,
  WECHAT: 3
}; //公司入款的支付类型

glGame.baseclass.extend({
  properties: {
    RowItem: cc.Node,
    Rowcontent: cc.Node,
    RechargeItem: cc.Node,
    Rechargecontent: cc.Node,
    RowselectScroll: cc.ScrollView,
    Lab_coin: cc.Node,
    edit_coin: cc.EditBox,
    inputshield: cc.Node,
    //限制是否可以输入充值金额
    shopFastPanel: cc.Prefab,
    type_pic: [cc.SpriteFrame],
    spritePic: cc.Sprite,
    des_recharge: cc.RichText,
    bankInfo: cc.Node,
    lab_describe: cc.Label,
    towLine: cc.Node,
    edit_mask: cc.Node
  },
  onLoad: function onLoad() {
    this.persent = 0;
    this.isFree = 0; //是否允许任意金额 0 不允许 1允许

    this.nowTime = Date.now();
    this.cacheData = {}; // this.touchEvent()
  },
  ReqPayType: function ReqPayType(pageId) {
    var _this = this;

    var typeId = this.typeId;
    this.pageID = pageId;
    glGame.gameNet.send_msg('http.ReqPayPage', {
      pageId: pageId,
      typeId: typeId
    }, function (route, msg) {
      _this.Curpageinfo = msg.result;

      _this.setType(_this.typeId);

      _this.setContent(msg.result);
    });
  },
  initUI: function initUI(data) {
    this.nowTime = Date.now();
    this.giveProportion = data.giveProportion;
    this.payPageList = data.payPageList;
    this.typeId = data.id;
    var min = this.payPageList[0].currentRotationAccount.config.rechargeMin;
    var max = this.payPageList[0].currentRotationAccount.config.rechargeMax;
    if (min < 0) min = 0;

    for (var i = 0; i < data.payPageList.length; i++) {
      var RowItem = cc.instantiate(this.RowItem);
      RowItem.parent = this.Rowcontent;
      RowItem.active = true;
      RowItem.getChildByName("Background").getChildByName("Label").getComponent(cc.RichText).string = data.payPageList[i].name;
      RowItem.height = RowItem.getChildByName("Background").getChildByName("Label").height + 26; //外框要比里面的字体高26；

      RowItem.getChildByName("checkmark").getChildByName("Label").getComponent(cc.RichText).string = data.payPageList[i].name;
      RowItem.getChildByName("Background").name = "".concat(i);
    } // this.btn_nextlistchecked.active = this.Rowcontent.childrenCount > 3;   
    // this.btn_leftchecked.active = this.Rowcontent.childrenCount > 3;   


    this.Curpageinfo = this.payPageList[0];
    this.setType(this.typeId);
    this.setContent(this.Curpageinfo);
  },
  setType: function setType(id) {
    if (id == glGame.pay.BANKCARDPAY || id == glGame.pay.CLOUDPAY) {
      this.spritePic.spriteFrame = this.type_pic[0];
    } else if (id == glGame.pay.ALIPAY) {
      this.spritePic.spriteFrame = this.type_pic[1];
    } else if (id == glGame.pay.WECHATPAY) {
      this.spritePic.spriteFrame = this.type_pic[2];
    } else if (id == glGame.pay.JINGDONGPAY) {
      this.spritePic.spriteFrame = this.type_pic[3];
    } else if (id == glGame.pay.QQPAY) {
      this.spritePic.spriteFrame = this.type_pic[4];
    } else if (id == glGame.pay.FASTPAY) {
      this.spritePic.spriteFrame = this.type_pic[this.Curpageinfo.currentRotationAccount.type - 1];
    }
  },
  setContent: function setContent(data) {
    this.Rechargecontent.destroyAllChildren();
    this.Rechargecontent.removeAllChildren();
    if (!data) return; //if (data.currentRotationAccount.type == SHOPTYPE.BANK)this.setBankInfo(data.currentRotationAccount); 
    //else this.setDescribe(data.describe);

    this.setDescribe(data.describe);
    var min = glGame.user.GoldTemp(data.currentRotationAccount.config.rechargeMin);
    var max = glGame.user.GoldTemp(data.currentRotationAccount.config.rechargeMax);
    if (min < 0) min = 0; // this.Lab_coin.getSelfFunc().setPlaceholder(data.currentRotationAccount.config.rechargeMax == -1 ? `请输入金额(${min}~无上限)` : `请输入金额(${min}~${max})`)

    if (data.currentRotationAccount.config.rechargeMax == -1 && Number(min) == 0) {
      this.Lab_coin.getSelfFunc().setPlaceholder("");
    } else if (data.currentRotationAccount.config.rechargeMax == -1) {
      this.Lab_coin.getSelfFunc().setPlaceholder("\u8BF7\u8F93\u5165\u91D1\u989D(".concat(min, "~\u65E0\u4E0A\u9650)"));
    } else {
      this.Lab_coin.getSelfFunc().setPlaceholder("\u8BF7\u8F93\u5165\u91D1\u989D(".concat(min, "~").concat(max, ")"));
    }

    this.Lab_coin.getSelfFunc().onEndedCall(this.setLabCoin.bind(this));
    this.inputshield.active = true;

    if (data.currentRotationAccount.config) {
      var quickMode = data.currentRotationAccount.config.quickMode;
      this.isFree = data.currentRotationAccount.config.isFree;
      this.inputshield.active = data.currentRotationAccount.config.isFree == 0;

      if (data.currentRotationAccount.config.isFree == 1) {
        //是否允许任意金额 0 不允许 1允许
        this.edit_mask.active = false;
      } else {
        this.edit_mask.active = true;
        this.Lab_coin.getSelfFunc().setPlaceholder("\u8BF7\u9009\u62E9\u5145\u503C\u91D1\u989D");
      }

      this.towLine.active = quickMode.length > 0;

      for (var i = 0; i < quickMode.length; i++) {
        var RechargeItem = cc.instantiate(this.RechargeItem);
        RechargeItem.parent = this.Rechargecontent;
        RechargeItem.active = true;
        RechargeItem.name = "".concat(i);
        RechargeItem.getChildByName("red_bg").active = this.giveProportion != 0;
        RechargeItem.getChildByName("number").getComponent(cc.Label).string = this.getFloat(quickMode[i]);

        if (this.giveProportion != 0) {
          RechargeItem.getChildByName("number").y += 10;
          RechargeItem.getChildByName("discount").active = true;
          var tempNum = quickMode[i] * this.giveProportion;
          RechargeItem.getChildByName("discount").getComponent(cc.Label).string = "\u8D60\u9001".concat(Math.floor(Number(tempNum.div(100 * 10000)) * 100) / 100, "\u91D1\u5E01");
        }
      }
    }
  },
  setDescribe: function setDescribe(data) {
    var _this2 = this;

    this.lab_describe.node.active = true;
    this.bankInfo.active = false;
    this.lab_describe.string = data;
    this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function () {
      //this.lab_describe.node.position = cc.v2(-209,326)
      if (_this2.lab_describe.node.height > 149.96) {
        _this2.lab_describe.overflow = 1; //this.lab_describe.node.height = 120

        _this2.lab_describe.verticalAlign = 0;
      }
    })));
  },
  //设置描述或者银行卡信息
  setBankInfo: function setBankInfo(data) {
    this.bankInfo.active = true;
    this.lab_describe.node.active = false;
    this.bankInfo.getChildByName("lab_bankNum").getComponent(cc.Label).string = data.accountName;
    this.bankInfo.getChildByName("lab_userName").getComponent(cc.Label).string = data.name;
    this.bankInfo.getChildByName("lab_bankName").getComponent(cc.Label).string = data.bankName;
  },
  onClick: function onClick(name, node) {
    for (var i = 0; i < this.Rechargecontent.childrenCount; i++) {
      if (name == this.Rechargecontent.children[i].name) {
        return this.RechargeItemCB(name);
      }
    }

    switch (name) {
      case "RowItem":
        this.pageinfo_CB(node);
        break;

      case "btn_nextlistchecked":
        this.next_CB();
        break;

      case "btn_leftchecked":
        this.left_CB();
        break;

      case "btn_submission":
        this.btn_submissionCB();
        break;

      case "btn_record":
        glGame.emitter.emit("showrechargeRecord");
        break;

      case "btn_copyBankNum":
        glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_bankNum").getComponent(cc.Label).string, glGame.tips.SHOP.COPYBANKCARD);
        break;

      case "btn_copyUserName":
        glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_userName").getComponent(cc.Label).string, glGame.tips.SHOP.COPYUSERNAME);
        break;

      case "btn_copyBankName":
        glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_bankName").getComponent(cc.Label).string, glGame.tips.SHOP.COPYBANKNAME);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  pageinfo_CB: function pageinfo_CB(node) {
    this.page = node.children[0].name;
    this.ReqPayType(this.payPageList[this.page].id);
    this.nowTime = Date.now();
    this.Lab_coin.getSelfFunc().setString("");
    this.des_recharge.string = "";
  },
  next_CB: function next_CB() {
    var pos = this.RowselectScroll.getContentPosition();
    this.startPos = pos.x;
    var offset = cc.v2(this.startPos - 3 * 250, pos.y);
    var count = this.Rowcontent.childrenCount;
    var index = count - 3;

    if (index * 250 + offset.x <= -370) {
      this.RowselectScroll.scrollToRight(0.01);
    } else {
      this.RowselectScroll.setContentPosition(offset);
    }
  },
  left_CB: function left_CB() {
    var pos = this.RowselectScroll.getContentPosition();
    this.startPos = pos.x;
    var offset = cc.v2(this.startPos + 3 * 250, pos.y);
    var count = this.Rowcontent.childrenCount;

    if (offset.x + 250 >= -370) {
      this.RowselectScroll.scrollToLeft(0.01);
    } else {
      this.RowselectScroll.setContentPosition(offset);
    }
  },
  btn_submissionCB: function btn_submissionCB() {
    if (this.edit_coin.string == "" || this.edit_coin.string == 0) {
      if (this.isFree == 0) {
        glGame.panel.showErrorTip(glGame.tips.SHOP.COINNULL2);
      } else {
        glGame.panel.showErrorTip(glGame.tips.SHOP.COINNULL);
      }

      return;
    }

    var regA = /^[0-9]+\.[0-9]{0,2}$/; //验证规则

    var regB = /^[1-9][0-9]{0,9}$/gim;
    var isCoinNum_matcherA = regA.test(Number(this.edit_coin.string));
    var isCoinNum_matcherB = regB.test(Number(this.edit_coin.string));

    if (isCoinNum_matcherA || isCoinNum_matcherB) {} else {
      glGame.panel.showErrorTip(glGame.tips.SHOP.SELECTCOIN);
      return;
    }

    if (this.Curpageinfo.currentRotationAccount.config.rechargeMax != -1) {
      if (parseFloat(this.edit_coin.string) * 100 > this.Curpageinfo.currentRotationAccount.config.rechargeMax || parseFloat(this.edit_coin.string) * 100 < this.Curpageinfo.currentRotationAccount.config.rechargeMin) {
        var min = this.Curpageinfo.currentRotationAccount.config.rechargeMin;
        var max = this.Curpageinfo.currentRotationAccount.config.rechargeMax;
        var str = glGame.tips.SHOP.LIMIT.format("".concat(glGame.user.GoldTemp(min)), "".concat(glGame.user.GoldTemp(max)));
        glGame.panel.showErrorTip(str);
        return;
      }
    } else {
      if (parseFloat(this.edit_coin.string) * 100 < this.Curpageinfo.currentRotationAccount.config.rechargeMin) {
        var _min = this.Curpageinfo.currentRotationAccount.config.rechargeMin; //let max = this.Curpageinfo.currentRotationAccount.config.rechargeMax

        var _str = glGame.tips.SHOP.MINLIMIT.format("".concat(glGame.user.GoldTemp(_min)));

        glGame.panel.showErrorTip(_str);
        return;
      }
    }

    if (this.Curpageinfo.currentType) {
      var rechargeKey = glGame.user.get('url').recharge_key;
      var accountId = this.Curpageinfo.currentRotationAccount.accountId;
      var myID = glGame.user.get('logicID');
      var chooseMoney = parseFloat(this.edit_coin.string) * 100;
      var payJump = glGame.user.get('url').pay_jump;
      var trilateralIden = this.Curpageinfo.currentRotationAccount.trilateralIdent,
          id = this.Curpageinfo.id,
          nowTime = this.nowTime;

      var _str2 = "userId=".concat(myID, "&money=").concat(chooseMoney, "&trilateralIdent=").concat(trilateralIden, "&id=").concat(id, "&currentType=").concat(this.Curpageinfo.currentType, "&time=").concat(nowTime, "&accountId=").concat(accountId, "&typeId=").concat(this.typeId, "&pageId=").concat(this.Curpageinfo.id);

      var sign = md5(_str2 + rechargeKey);
      _str2 = _str2 + "&sign=".concat(sign);
      var url = payJump + '?' + _str2;
      cc.sys.openURL(url);
    } else {
      var shopFastPanel = glGame.panel.showChildPanel(this.shopFastPanel, this.node.parent.parent);
      var script = shopFastPanel.getComponent("shopFastPanel");
      script.initUI(this.Curpageinfo, parseFloat(this.edit_coin.string), this.giveProportion, this.typeId);
    }
  },
  compareMoney: function compareMoney() {
    var chooseMoney = parseFloat(this.edit_coin.string);

    for (var i = 0; i < this.Rechargecontent.childrenCount; i++) {
      var name = Number(this.Rechargecontent.children[i].name);

      if (chooseMoney == this.getData(name)) {
        return true;
      }
    }

    return false;
  },
  RechargeItemCB: function RechargeItemCB(name) {
    for (var i = 0; i < this.Rechargecontent.childrenCount; i++) {
      if (name == this.Rechargecontent.children[i].name) {
        this.Rechargecontent.children[i].setScale(1.2);
        this.Lab_coin.getSelfFunc().setString(this.getData(name));

        if (this.giveProportion != 0) {
          this.des_recharge.node.active = true;
          var rechargeReward = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).toString(),
              total = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).add(Number(this.edit_coin.string)).toString();
          this.des_recharge.string = "\u672C\u6B21\u5145\u503C\u989D\u5916\u8D60\u9001<color=#f4c404>".concat(rechargeReward, "\u91D1\u5E01</c>\uFF0C\u603B\u5171\u53EF\u83B7\u5F97<color=#f4c404>").concat(total, "\u91D1\u5E01\u3002</c>");
        } else {
          this.des_recharge.node.active = false;
        }
      } else {
        this.Rechargecontent.children[i].setScale(1);
      }
    }
  },
  getData: function getData(index) {
    var quickMode = this.Curpageinfo.currentRotationAccount.config.quickMode;
    return this.getFloat(quickMode[index]);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  setLabCoin: function setLabCoin() {
    if (Number(this.edit_coin.string) > 0) {
      this.des_recharge.node.active = this.giveProportion != 0;
      var rechargeReward = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).toString(),
          total = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).add(Number(this.edit_coin.string)).toString();
      var strReward = glGame.user.stringVipFix(rechargeReward, 2),
          strTotal = glGame.user.stringVipFix(total, 2);
      this.des_recharge.string = "<color=#abcaff>\u672C\u6B21\u5145\u503C\u989D\u5916\u8D60\u9001</c><color=#f68e1e>".concat(strReward ? strReward : 0, "\u91D1\u5E01</c>\uFF0C<color=#abcaff>\u603B\u5171\u53EF\u83B7\u5F97</c><color=#f68e1e>").concat(strTotal ? strTotal : 0, "\u91D1\u5E01\u3002</c>");
      if (this.edit_coin.string.substr(0, 1) === '0') this.Lab_coin.getSelfFunc().setString(Number(this.edit_coin.string).toString());
    } else {
      //this.Lab_coin.getSelfFunc().setString("0");
      this.des_recharge.node.active = false;
    }

    for (var i = 0; i < this.Rechargecontent.childrenCount; i++) {
      var numTo = this.Rechargecontent.children[i].getChildByName("number").getComponent(cc.Label).string;

      if (this.edit_coin.string === numTo) {
        this.Rechargecontent.children[i].setScale(1.2);
      } else {
        this.Rechargecontent.children[i].setScale(1);
      }
    }
  },
  // //筹码滑动条触摸事件监听
  // touchEvent() {
  //   this._startPos = null;
  //   this._movePos = null;
  //   this.Rowcontent.on('touchstart', (event) => {
  //     console.log('eeeeee',event)
  //       this._startPos = event.getLocation();
  //   });
  //   this.Rowcontent.on('touchmove', (event) => {
  //       this._movePos = event.getLocation();
  //       let _offX = this._movePos.x - this._startPos.x;
  //       this.Rowcontent.x -= _offX;
  //       this._startPos = this._movePos;
  //       //位置限制
  //       let _width = (this.Rowcontent.children.length - 1) * 5 - 245;
  //       // if (this.Rowcontent.x < -_width) {
  //       //     this.Rowcontent.x = -_width;
  //       // } else if (this.Rowcontent.x > _width) {
  //       //     this.Rowcontent.x = _width;
  //       // }
  //   }); 
  // },
  OnDestroy: function OnDestroy() {
    this.Rowcontent.off('touchstar');
  }
});

cc._RF.pop();
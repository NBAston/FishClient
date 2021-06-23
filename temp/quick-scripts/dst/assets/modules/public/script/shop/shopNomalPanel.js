
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/shop/shopNomalPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNob3BcXHNob3BOb21hbFBhbmVsLmpzIl0sIm5hbWVzIjpbIlNIT1BUWVBFIiwiQkFOSyIsIkFMSVBBWSIsIldFQ0hBVCIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJSb3dJdGVtIiwiY2MiLCJOb2RlIiwiUm93Y29udGVudCIsIlJlY2hhcmdlSXRlbSIsIlJlY2hhcmdlY29udGVudCIsIlJvd3NlbGVjdFNjcm9sbCIsIlNjcm9sbFZpZXciLCJMYWJfY29pbiIsImVkaXRfY29pbiIsIkVkaXRCb3giLCJpbnB1dHNoaWVsZCIsInNob3BGYXN0UGFuZWwiLCJQcmVmYWIiLCJ0eXBlX3BpYyIsIlNwcml0ZUZyYW1lIiwic3ByaXRlUGljIiwiU3ByaXRlIiwiZGVzX3JlY2hhcmdlIiwiUmljaFRleHQiLCJiYW5rSW5mbyIsImxhYl9kZXNjcmliZSIsIkxhYmVsIiwidG93TGluZSIsImVkaXRfbWFzayIsIm9uTG9hZCIsInBlcnNlbnQiLCJpc0ZyZWUiLCJub3dUaW1lIiwiRGF0ZSIsIm5vdyIsImNhY2hlRGF0YSIsIlJlcVBheVR5cGUiLCJwYWdlSWQiLCJ0eXBlSWQiLCJwYWdlSUQiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb3V0ZSIsIm1zZyIsIkN1cnBhZ2VpbmZvIiwicmVzdWx0Iiwic2V0VHlwZSIsInNldENvbnRlbnQiLCJpbml0VUkiLCJkYXRhIiwiZ2l2ZVByb3BvcnRpb24iLCJwYXlQYWdlTGlzdCIsImlkIiwibWluIiwiY3VycmVudFJvdGF0aW9uQWNjb3VudCIsImNvbmZpZyIsInJlY2hhcmdlTWluIiwibWF4IiwicmVjaGFyZ2VNYXgiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJhY3RpdmUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsInN0cmluZyIsIm5hbWUiLCJoZWlnaHQiLCJwYXkiLCJCQU5LQ0FSRFBBWSIsIkNMT1VEUEFZIiwic3ByaXRlRnJhbWUiLCJXRUNIQVRQQVkiLCJKSU5HRE9OR1BBWSIsIlFRUEFZIiwiRkFTVFBBWSIsInR5cGUiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInNldERlc2NyaWJlIiwiZGVzY3JpYmUiLCJ1c2VyIiwiR29sZFRlbXAiLCJOdW1iZXIiLCJnZXRTZWxmRnVuYyIsInNldFBsYWNlaG9sZGVyIiwib25FbmRlZENhbGwiLCJzZXRMYWJDb2luIiwiYmluZCIsInF1aWNrTW9kZSIsImdldEZsb2F0IiwieSIsInRlbXBOdW0iLCJNYXRoIiwiZmxvb3IiLCJkaXYiLCJub2RlIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsIm92ZXJmbG93IiwidmVydGljYWxBbGlnbiIsInNldEJhbmtJbmZvIiwiYWNjb3VudE5hbWUiLCJiYW5rTmFtZSIsIm9uQ2xpY2siLCJjaGlsZHJlbkNvdW50IiwiY2hpbGRyZW4iLCJSZWNoYXJnZUl0ZW1DQiIsInBhZ2VpbmZvX0NCIiwibmV4dF9DQiIsImxlZnRfQ0IiLCJidG5fc3VibWlzc2lvbkNCIiwiZW1pdHRlciIsImVtaXQiLCJwbGF0Zm9ybSIsImNvcHlUb0NsaXAiLCJ0aXBzIiwiU0hPUCIsIkNPUFlCQU5LQ0FSRCIsIkNPUFlVU0VSTkFNRSIsIkNPUFlCQU5LTkFNRSIsImNvbnNvbGUiLCJlcnJvciIsInBhZ2UiLCJzZXRTdHJpbmciLCJwb3MiLCJnZXRDb250ZW50UG9zaXRpb24iLCJzdGFydFBvcyIsIngiLCJvZmZzZXQiLCJ2MiIsImNvdW50IiwiaW5kZXgiLCJzY3JvbGxUb1JpZ2h0Iiwic2V0Q29udGVudFBvc2l0aW9uIiwic2Nyb2xsVG9MZWZ0IiwicGFuZWwiLCJzaG93RXJyb3JUaXAiLCJDT0lOTlVMTDIiLCJDT0lOTlVMTCIsInJlZ0EiLCJyZWdCIiwiaXNDb2luTnVtX21hdGNoZXJBIiwidGVzdCIsImlzQ29pbk51bV9tYXRjaGVyQiIsIlNFTEVDVENPSU4iLCJwYXJzZUZsb2F0Iiwic3RyIiwiTElNSVQiLCJmb3JtYXQiLCJNSU5MSU1JVCIsImN1cnJlbnRUeXBlIiwicmVjaGFyZ2VLZXkiLCJnZXQiLCJyZWNoYXJnZV9rZXkiLCJhY2NvdW50SWQiLCJteUlEIiwiY2hvb3NlTW9uZXkiLCJwYXlKdW1wIiwicGF5X2p1bXAiLCJ0cmlsYXRlcmFsSWRlbiIsInRyaWxhdGVyYWxJZGVudCIsInNpZ24iLCJtZDUiLCJ1cmwiLCJzeXMiLCJvcGVuVVJMIiwic2hvd0NoaWxkUGFuZWwiLCJzY3JpcHQiLCJjb21wYXJlTW9uZXkiLCJnZXREYXRhIiwic2V0U2NhbGUiLCJyZWNoYXJnZVJld2FyZCIsInRvU3RyaW5nIiwidG90YWwiLCJhZGQiLCJ2YWx1ZSIsInN0clJld2FyZCIsInN0cmluZ1ZpcEZpeCIsInN0clRvdGFsIiwic3Vic3RyIiwibnVtVG8iLCJPbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHO0FBQUVDLEVBQUFBLElBQUksRUFBRSxDQUFSO0FBQVdDLEVBQUFBLE1BQU0sRUFBRSxDQUFuQjtBQUFzQkMsRUFBQUEsTUFBTSxFQUFFO0FBQTlCLENBQWpCLEVBQWtEOztBQUNsREMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUN2QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1hDLElBQUFBLE9BQU8sRUFBRUMsRUFBRSxDQUFDQyxJQUREO0FBRVhDLElBQUFBLFVBQVUsRUFBRUYsRUFBRSxDQUFDQyxJQUZKO0FBR1hFLElBQUFBLFlBQVksRUFBRUgsRUFBRSxDQUFDQyxJQUhOO0FBSVhHLElBQUFBLGVBQWUsRUFBRUosRUFBRSxDQUFDQyxJQUpUO0FBS1hJLElBQUFBLGVBQWUsRUFBRUwsRUFBRSxDQUFDTSxVQUxUO0FBTVhDLElBQUFBLFFBQVEsRUFBRVAsRUFBRSxDQUFDQyxJQU5GO0FBT1hPLElBQUFBLFNBQVMsRUFBRVIsRUFBRSxDQUFDUyxPQVBIO0FBUVhD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQVcsRUFBQUEsU0FoVnVCLHVCQWdWWDtBQUNYLFNBQUtsTCxVQUFMLENBQWdCbUwsR0FBaEIsQ0FBb0IsV0FBcEI7QUFDQTtBQWxWc0IsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNIT1BUWVBFID0geyBCQU5LOiAxLCBBTElQQVk6IDIsIFdFQ0hBVDogMyB9Ly/lhazlj7jlhaXmrL7nmoTmlK/ku5jnsbvlnotcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cdHByb3BlcnRpZXM6IHtcclxuXHRcdFJvd0l0ZW06IGNjLk5vZGUsXHJcblx0XHRSb3djb250ZW50OiBjYy5Ob2RlLFxyXG5cdFx0UmVjaGFyZ2VJdGVtOiBjYy5Ob2RlLFxyXG5cdFx0UmVjaGFyZ2Vjb250ZW50OiBjYy5Ob2RlLFxyXG5cdFx0Um93c2VsZWN0U2Nyb2xsOiBjYy5TY3JvbGxWaWV3LFxyXG5cdFx0TGFiX2NvaW46IGNjLk5vZGUsXHJcblx0XHRlZGl0X2NvaW46IGNjLkVkaXRCb3gsXHJcblx0XHRpbnB1dHNoaWVsZDogY2MuTm9kZSwvL+mZkOWItuaYr+WQpuWPr+S7pei+k+WFpeWFheWAvOmHkeminVxyXG5cdFx0c2hvcEZhc3RQYW5lbDogY2MuUHJlZmFiLFxyXG5cdFx0dHlwZV9waWM6IFtjYy5TcHJpdGVGcmFtZV0sXHJcblx0XHRzcHJpdGVQaWM6IGNjLlNwcml0ZSxcclxuXHRcdGRlc19yZWNoYXJnZTogY2MuUmljaFRleHQsXHJcblx0XHRiYW5rSW5mbzogY2MuTm9kZSxcclxuXHRcdGxhYl9kZXNjcmliZTogY2MuTGFiZWwsXHJcblx0XHR0b3dMaW5lOiBjYy5Ob2RlLFxyXG5cdFx0ZWRpdF9tYXNrOiBjYy5Ob2RlLFxyXG5cdH0sXHJcblx0b25Mb2FkKCkge1xyXG5cdFx0dGhpcy5wZXJzZW50ID0gMDtcclxuXHRcdHRoaXMuaXNGcmVlID0gMDsvL+aYr+WQpuWFgeiuuOS7u+aEj+mHkeminSAwIOS4jeWFgeiuuCAx5YWB6K64XHJcblx0XHR0aGlzLm5vd1RpbWUgPSBEYXRlLm5vdygpXHJcblx0XHR0aGlzLmNhY2hlRGF0YSA9IHt9O1xyXG5cdFx0Ly8gdGhpcy50b3VjaEV2ZW50KClcclxuXHR9LFxyXG5cdFJlcVBheVR5cGUocGFnZUlkKSB7XHJcblx0XHRsZXQgdHlwZUlkID0gdGhpcy50eXBlSWQ7XHJcblx0XHR0aGlzLnBhZ2VJRCA9IHBhZ2VJZFxyXG5cdFx0Z2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUGF5UGFnZScsIHsgcGFnZUlkOiBwYWdlSWQsIHR5cGVJZDogdHlwZUlkIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcblx0XHRcdHRoaXMuQ3VycGFnZWluZm8gPSBtc2cucmVzdWx0XHJcblx0XHRcdHRoaXMuc2V0VHlwZSh0aGlzLnR5cGVJZClcclxuXHRcdFx0dGhpcy5zZXRDb250ZW50KG1zZy5yZXN1bHQpO1xyXG5cdFx0fSlcclxuXHR9LFxyXG5cdGluaXRVSShkYXRhKSB7XHJcblx0XHR0aGlzLm5vd1RpbWUgPSBEYXRlLm5vdygpXHJcblx0XHR0aGlzLmdpdmVQcm9wb3J0aW9uID0gZGF0YS5naXZlUHJvcG9ydGlvbjtcclxuXHRcdHRoaXMucGF5UGFnZUxpc3QgPSBkYXRhLnBheVBhZ2VMaXN0O1xyXG5cdFx0dGhpcy50eXBlSWQgPSBkYXRhLmlkO1xyXG5cdFx0bGV0IG1pbiA9IHRoaXMucGF5UGFnZUxpc3RbMF0uY3VycmVudFJvdGF0aW9uQWNjb3VudC5jb25maWcucmVjaGFyZ2VNaW47XHJcblx0XHRsZXQgbWF4ID0gdGhpcy5wYXlQYWdlTGlzdFswXS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heDtcclxuXHRcdGlmIChtaW4gPCAwKSBtaW4gPSAwO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnBheVBhZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCBSb3dJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5Sb3dJdGVtKTtcclxuXHRcdFx0Um93SXRlbS5wYXJlbnQgPSB0aGlzLlJvd2NvbnRlbnQ7XHJcblx0XHRcdFJvd0l0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0Um93SXRlbS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGRhdGEucGF5UGFnZUxpc3RbaV0ubmFtZTtcclxuXHRcdFx0Um93SXRlbS5oZWlnaHQgPSBSb3dJdGVtLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmhlaWdodCArIDI2Oy8v5aSW5qGG6KaB5q+U6YeM6Z2i55qE5a2X5L2T6auYMjbvvJtcclxuXHRcdFx0Um93SXRlbS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gZGF0YS5wYXlQYWdlTGlzdFtpXS5uYW1lO1xyXG5cdFx0XHRSb3dJdGVtLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5uYW1lID0gYCR7aX1gXHJcblx0XHR9XHJcblx0XHQvLyB0aGlzLmJ0bl9uZXh0bGlzdGNoZWNrZWQuYWN0aXZlID0gdGhpcy5Sb3djb250ZW50LmNoaWxkcmVuQ291bnQgPiAzOyAgIFxyXG5cdFx0Ly8gdGhpcy5idG5fbGVmdGNoZWNrZWQuYWN0aXZlID0gdGhpcy5Sb3djb250ZW50LmNoaWxkcmVuQ291bnQgPiAzOyAgIFxyXG5cdFx0dGhpcy5DdXJwYWdlaW5mbyA9IHRoaXMucGF5UGFnZUxpc3RbMF1cclxuXHRcdHRoaXMuc2V0VHlwZSh0aGlzLnR5cGVJZClcclxuXHRcdHRoaXMuc2V0Q29udGVudCh0aGlzLkN1cnBhZ2VpbmZvKVxyXG5cdH0sXHJcblx0c2V0VHlwZShpZCkge1xyXG5cdFx0aWYgKGlkID09IGdsR2FtZS5wYXkuQkFOS0NBUkRQQVkgfHwgaWQgPT0gZ2xHYW1lLnBheS5DTE9VRFBBWSkge1xyXG5cdFx0XHR0aGlzLnNwcml0ZVBpYy5zcHJpdGVGcmFtZSA9IHRoaXMudHlwZV9waWNbMF1cclxuXHRcdH0gZWxzZSBpZiAoaWQgPT0gZ2xHYW1lLnBheS5BTElQQVkpIHtcclxuXHRcdFx0dGhpcy5zcHJpdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnR5cGVfcGljWzFdXHJcblx0XHR9IGVsc2UgaWYgKGlkID09IGdsR2FtZS5wYXkuV0VDSEFUUEFZKSB7XHJcblx0XHRcdHRoaXMuc3ByaXRlUGljLnNwcml0ZUZyYW1lID0gdGhpcy50eXBlX3BpY1syXVxyXG5cdFx0fSBlbHNlIGlmIChpZCA9PSBnbEdhbWUucGF5LkpJTkdET05HUEFZKSB7XHJcblx0XHRcdHRoaXMuc3ByaXRlUGljLnNwcml0ZUZyYW1lID0gdGhpcy50eXBlX3BpY1szXVxyXG5cdFx0fSBlbHNlIGlmIChpZCA9PSBnbEdhbWUucGF5LlFRUEFZKSB7XHJcblx0XHRcdHRoaXMuc3ByaXRlUGljLnNwcml0ZUZyYW1lID0gdGhpcy50eXBlX3BpY1s0XVxyXG5cdFx0fSBlbHNlIGlmIChpZCA9PSBnbEdhbWUucGF5LkZBU1RQQVkpIHtcclxuXHRcdFx0dGhpcy5zcHJpdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnR5cGVfcGljW3RoaXMuQ3VycGFnZWluZm8uY3VycmVudFJvdGF0aW9uQWNjb3VudC50eXBlIC0gMV1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHNldENvbnRlbnQoZGF0YSkge1xyXG5cdFx0dGhpcy5SZWNoYXJnZWNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcblxyXG5cdFx0dGhpcy5SZWNoYXJnZWNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHRcdGlmICghZGF0YSkgcmV0dXJuO1xyXG5cdFx0Ly9pZiAoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LnR5cGUgPT0gU0hPUFRZUEUuQkFOSyl0aGlzLnNldEJhbmtJbmZvKGRhdGEuY3VycmVudFJvdGF0aW9uQWNjb3VudCk7IFxyXG5cdFx0Ly9lbHNlIHRoaXMuc2V0RGVzY3JpYmUoZGF0YS5kZXNjcmliZSk7XHJcblx0XHR0aGlzLnNldERlc2NyaWJlKGRhdGEuZGVzY3JpYmUpO1xyXG5cdFx0bGV0IG1pbiA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKGRhdGEuY3VycmVudFJvdGF0aW9uQWNjb3VudC5jb25maWcucmVjaGFyZ2VNaW4pO1xyXG5cdFx0bGV0IG1heCA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKGRhdGEuY3VycmVudFJvdGF0aW9uQWNjb3VudC5jb25maWcucmVjaGFyZ2VNYXgpO1xyXG5cdFx0aWYgKG1pbiA8IDApIG1pbiA9IDA7XHJcblx0XHQvLyB0aGlzLkxhYl9jb2luLmdldFNlbGZGdW5jKCkuc2V0UGxhY2Vob2xkZXIoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heCA9PSAtMSA/IGDor7fovpPlhaXph5Hpop0oJHttaW59fuaXoOS4iumZkClgIDogYOivt+i+k+WFpemHkeminSgke21pbn1+JHttYXh9KWApXHJcblx0XHRpZiAoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heCA9PSAtMSAmJiBOdW1iZXIobWluKSA9PSAwKSB7XHJcblx0XHRcdHRoaXMuTGFiX2NvaW4uZ2V0U2VsZkZ1bmMoKS5zZXRQbGFjZWhvbGRlcihcIlwiKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heCA9PSAtMSkge1xyXG5cdFx0XHR0aGlzLkxhYl9jb2luLmdldFNlbGZGdW5jKCkuc2V0UGxhY2Vob2xkZXIoYOivt+i+k+WFpemHkeminSgke21pbn1+5peg5LiK6ZmQKWApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5MYWJfY29pbi5nZXRTZWxmRnVuYygpLnNldFBsYWNlaG9sZGVyKGDor7fovpPlhaXph5Hpop0oJHttaW59fiR7bWF4fSlgKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuTGFiX2NvaW4uZ2V0U2VsZkZ1bmMoKS5vbkVuZGVkQ2FsbCh0aGlzLnNldExhYkNvaW4uYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmlucHV0c2hpZWxkLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRpZiAoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZykge1xyXG5cdFx0XHRsZXQgcXVpY2tNb2RlID0gZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5xdWlja01vZGU7XHJcblx0XHRcdHRoaXMuaXNGcmVlID0gZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5pc0ZyZWU7XHJcblx0XHRcdHRoaXMuaW5wdXRzaGllbGQuYWN0aXZlID0gZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5pc0ZyZWUgPT0gMFxyXG5cdFx0XHRpZiAoZGF0YS5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5pc0ZyZWUgPT0gMSkgey8v5piv5ZCm5YWB6K645Lu75oSP6YeR6aKdIDAg5LiN5YWB6K64IDHlhYHorrhcclxuXHRcdFx0XHR0aGlzLmVkaXRfbWFzay5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy5lZGl0X21hc2suYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLkxhYl9jb2luLmdldFNlbGZGdW5jKCkuc2V0UGxhY2Vob2xkZXIoYOivt+mAieaLqeWFheWAvOmHkeminWApO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudG93TGluZS5hY3RpdmUgPSBxdWlja01vZGUubGVuZ3RoID4gMDtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBxdWlja01vZGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgUmVjaGFyZ2VJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5SZWNoYXJnZUl0ZW0pO1xyXG5cdFx0XHRcdFJlY2hhcmdlSXRlbS5wYXJlbnQgPSB0aGlzLlJlY2hhcmdlY29udGVudDtcclxuXHRcdFx0XHRSZWNoYXJnZUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRSZWNoYXJnZUl0ZW0ubmFtZSA9IGAke2l9YDtcclxuXHRcdFx0XHRSZWNoYXJnZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRfYmdcIikuYWN0aXZlID0gdGhpcy5naXZlUHJvcG9ydGlvbiAhPSAwXHJcblx0XHRcdFx0UmVjaGFyZ2VJdGVtLmdldENoaWxkQnlOYW1lKFwibnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChxdWlja01vZGVbaV0pO1xyXG5cdFx0XHRcdGlmICh0aGlzLmdpdmVQcm9wb3J0aW9uICE9IDApIHtcclxuXHRcdFx0XHRcdFJlY2hhcmdlSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bWJlclwiKS55ICs9IDEwO1xyXG5cdFx0XHRcdFx0UmVjaGFyZ2VJdGVtLmdldENoaWxkQnlOYW1lKFwiZGlzY291bnRcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGxldCB0ZW1wTnVtID0gcXVpY2tNb2RlW2ldICogdGhpcy5naXZlUHJvcG9ydGlvbjtcclxuXHRcdFx0XHRcdFJlY2hhcmdlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImRpc2NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOi1oOmAgSR7TWF0aC5mbG9vcihOdW1iZXIodGVtcE51bS5kaXYoMTAwICogMTAwMDApKSAqIDEwMCkgLyAxMDB96YeR5biBYFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cdHNldERlc2NyaWJlKGRhdGEpIHtcclxuXHRcdHRoaXMubGFiX2Rlc2NyaWJlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYmFua0luZm8uYWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLmxhYl9kZXNjcmliZS5zdHJpbmcgPSBkYXRhO1xyXG5cdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuXHRcdFx0Y2MuZGVsYXlUaW1lKDAuMDEpLFxyXG5cdFx0XHRjYy5jYWxsRnVuYygoKSA9PiB7XHJcblx0XHRcdFx0Ly90aGlzLmxhYl9kZXNjcmliZS5ub2RlLnBvc2l0aW9uID0gY2MudjIoLTIwOSwzMjYpXHJcblx0XHRcdFx0aWYgKHRoaXMubGFiX2Rlc2NyaWJlLm5vZGUuaGVpZ2h0ID4gMTQ5Ljk2KSB7XHJcblx0XHRcdFx0XHR0aGlzLmxhYl9kZXNjcmliZS5vdmVyZmxvdyA9IDE7XHJcblx0XHRcdFx0XHQvL3RoaXMubGFiX2Rlc2NyaWJlLm5vZGUuaGVpZ2h0ID0gMTIwXHJcblx0XHRcdFx0XHR0aGlzLmxhYl9kZXNjcmliZS52ZXJ0aWNhbEFsaWduID0gMFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdCkpXHJcblx0fSxcclxuXHQvL+iuvue9ruaPj+i/sOaIluiAhemTtuihjOWNoeS/oeaBr1xyXG5cdHNldEJhbmtJbmZvKGRhdGEpIHtcclxuXHRcdHRoaXMuYmFua0luZm8uYWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMubGFiX2Rlc2NyaWJlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLmJhbmtJbmZvLmdldENoaWxkQnlOYW1lKFwibGFiX2JhbmtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmFjY291bnROYW1lO1xyXG5cdFx0dGhpcy5iYW5rSW5mby5nZXRDaGlsZEJ5TmFtZShcImxhYl91c2VyTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEubmFtZTtcclxuXHRcdHRoaXMuYmFua0luZm8uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfYmFua05hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmJhbmtOYW1lO1xyXG5cclxuXHR9LFxyXG5cdG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJlY2hhcmdlY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuXHRcdFx0aWYgKG5hbWUgPT0gdGhpcy5SZWNoYXJnZWNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLlJlY2hhcmdlSXRlbUNCKG5hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSBcIlJvd0l0ZW1cIjogdGhpcy5wYWdlaW5mb19DQihub2RlKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgXCJidG5fbmV4dGxpc3RjaGVja2VkXCI6IHRoaXMubmV4dF9DQigpOyBicmVhaztcclxuXHRcdFx0Y2FzZSBcImJ0bl9sZWZ0Y2hlY2tlZFwiOiB0aGlzLmxlZnRfQ0IoKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgXCJidG5fc3VibWlzc2lvblwiOiB0aGlzLmJ0bl9zdWJtaXNzaW9uQ0IoKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgXCJidG5fcmVjb3JkXCI6IGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJzaG93cmVjaGFyZ2VSZWNvcmRcIik7IGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiYnRuX2NvcHlCYW5rTnVtXCI6Z2xHYW1lLnBsYXRmb3JtLmNvcHlUb0NsaXAodGhpcy5iYW5rSW5mby5nZXRDaGlsZEJ5TmFtZShcImxhYl9iYW5rTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nLCBnbEdhbWUudGlwcy5TSE9QLkNPUFlCQU5LQ0FSRCk7YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJidG5fY29weVVzZXJOYW1lXCI6Z2xHYW1lLnBsYXRmb3JtLmNvcHlUb0NsaXAodGhpcy5iYW5rSW5mby5nZXRDaGlsZEJ5TmFtZShcImxhYl91c2VyTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZywgZ2xHYW1lLnRpcHMuU0hPUC5DT1BZVVNFUk5BTUUpO2JyZWFrO1xyXG5cdFx0XHRjYXNlIFwiYnRuX2NvcHlCYW5rTmFtZVwiOmdsR2FtZS5wbGF0Zm9ybS5jb3B5VG9DbGlwKHRoaXMuYmFua0luZm8uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfYmFua05hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcsIGdsR2FtZS50aXBzLlNIT1AuQ09QWUJBTktOQU1FKTticmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRwYWdlaW5mb19DQihub2RlKSB7XHJcblx0XHR0aGlzLnBhZ2UgPSBub2RlLmNoaWxkcmVuWzBdLm5hbWVcclxuXHRcdHRoaXMuUmVxUGF5VHlwZSh0aGlzLnBheVBhZ2VMaXN0W3RoaXMucGFnZV0uaWQpXHJcblx0XHR0aGlzLm5vd1RpbWUgPSBEYXRlLm5vdygpO1xyXG5cdFx0dGhpcy5MYWJfY29pbi5nZXRTZWxmRnVuYygpLnNldFN0cmluZyhcIlwiKVxyXG5cdFx0dGhpcy5kZXNfcmVjaGFyZ2Uuc3RyaW5nID0gXCJcIjtcclxuXHR9LFxyXG5cdG5leHRfQ0IoKSB7XHJcblx0XHRsZXQgcG9zID0gdGhpcy5Sb3dzZWxlY3RTY3JvbGwuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcblx0XHR0aGlzLnN0YXJ0UG9zID0gcG9zLng7XHJcblx0XHRsZXQgb2Zmc2V0ID0gY2MudjIoKHRoaXMuc3RhcnRQb3MgLSAzICogMjUwKSwgcG9zLnkpO1xyXG5cdFx0bGV0IGNvdW50ID0gdGhpcy5Sb3djb250ZW50LmNoaWxkcmVuQ291bnQ7XHJcblx0XHRsZXQgaW5kZXggPSBjb3VudCAtIDNcclxuXHRcdGlmICgoaW5kZXggKiAyNTAgKyBvZmZzZXQueCkgPD0gLTM3MCkge1xyXG5cdFx0XHR0aGlzLlJvd3NlbGVjdFNjcm9sbC5zY3JvbGxUb1JpZ2h0KDAuMDEpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLlJvd3NlbGVjdFNjcm9sbC5zZXRDb250ZW50UG9zaXRpb24ob2Zmc2V0KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGxlZnRfQ0IoKSB7XHJcblx0XHRsZXQgcG9zID0gdGhpcy5Sb3dzZWxlY3RTY3JvbGwuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcblx0XHR0aGlzLnN0YXJ0UG9zID0gcG9zLng7XHJcblx0XHRsZXQgb2Zmc2V0ID0gY2MudjIoKHRoaXMuc3RhcnRQb3MgKyAzICogMjUwKSwgcG9zLnkpO1xyXG5cdFx0bGV0IGNvdW50ID0gdGhpcy5Sb3djb250ZW50LmNoaWxkcmVuQ291bnQ7XHJcblx0XHRpZiAoKG9mZnNldC54ICsgMjUwKSA+PSAtMzcwKSB7XHJcblx0XHRcdHRoaXMuUm93c2VsZWN0U2Nyb2xsLnNjcm9sbFRvTGVmdCgwLjAxKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5Sb3dzZWxlY3RTY3JvbGwuc2V0Q29udGVudFBvc2l0aW9uKG9mZnNldCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRidG5fc3VibWlzc2lvbkNCKCkge1xyXG5cdFx0aWYgKHRoaXMuZWRpdF9jb2luLnN0cmluZyA9PSBcIlwiIHx8IHRoaXMuZWRpdF9jb2luLnN0cmluZyA9PSAwKSB7XHJcblx0XHRcdGlmKHRoaXMuaXNGcmVlID09IDApe1xyXG5cdFx0XHRcdGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuU0hPUC5DT0lOTlVMTDIpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlNIT1AuQ09JTk5VTEwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGxldCByZWdBID0gL15bMC05XStcXC5bMC05XXswLDJ9JC87Ly/pqozor4Hop4TliJlcclxuXHRcdGxldCByZWdCID0gL15bMS05XVswLTldezAsOX0kL2dpbTtcclxuXHRcdGxldCBpc0NvaW5OdW1fbWF0Y2hlckEgPSByZWdBLnRlc3QoTnVtYmVyKHRoaXMuZWRpdF9jb2luLnN0cmluZykpO1xyXG5cdFx0bGV0IGlzQ29pbk51bV9tYXRjaGVyQiA9IHJlZ0IudGVzdChOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSk7XHJcblx0XHRpZiAoaXNDb2luTnVtX21hdGNoZXJBIHx8IGlzQ29pbk51bV9tYXRjaGVyQikge1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5TSE9QLlNFTEVDVENPSU4pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heCAhPSAtMSkge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdCh0aGlzLmVkaXRfY29pbi5zdHJpbmcpICogMTAwID4gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heFxyXG5cdFx0XHRcdHx8IHBhcnNlRmxvYXQodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSAqIDEwMCA8IHRoaXMuQ3VycGFnZWluZm8uY3VycmVudFJvdGF0aW9uQWNjb3VudC5jb25maWcucmVjaGFyZ2VNaW4pIHtcclxuXHRcdFx0XHRsZXQgbWluID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1pbjtcclxuXHRcdFx0XHRsZXQgbWF4ID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heFxyXG5cdFx0XHRcdGxldCBzdHIgPSBnbEdhbWUudGlwcy5TSE9QLkxJTUlULmZvcm1hdChgJHtnbEdhbWUudXNlci5Hb2xkVGVtcChtaW4pfWAsIGAke2dsR2FtZS51c2VyLkdvbGRUZW1wKG1heCl9YClcclxuXHRcdFx0XHRnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKHN0cilcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KHRoaXMuZWRpdF9jb2luLnN0cmluZykgKiAxMDAgPCB0aGlzLkN1cnBhZ2VpbmZvLmN1cnJlbnRSb3RhdGlvbkFjY291bnQuY29uZmlnLnJlY2hhcmdlTWluKSB7XHJcblx0XHRcdFx0bGV0IG1pbiA9IHRoaXMuQ3VycGFnZWluZm8uY3VycmVudFJvdGF0aW9uQWNjb3VudC5jb25maWcucmVjaGFyZ2VNaW47XHJcblx0XHRcdFx0Ly9sZXQgbWF4ID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5yZWNoYXJnZU1heFxyXG5cdFx0XHRcdGxldCBzdHIgPSBnbEdhbWUudGlwcy5TSE9QLk1JTkxJTUlULmZvcm1hdChgJHtnbEdhbWUudXNlci5Hb2xkVGVtcChtaW4pfWApO1xyXG5cdFx0XHRcdGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoc3RyKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLkN1cnBhZ2VpbmZvLmN1cnJlbnRUeXBlKSB7XHJcblx0XHRcdGxldCByZWNoYXJnZUtleSA9IGdsR2FtZS51c2VyLmdldCgndXJsJykucmVjaGFyZ2Vfa2V5O1xyXG5cdFx0XHRsZXQgYWNjb3VudElkID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmFjY291bnRJZFxyXG5cdFx0XHRsZXQgbXlJRCA9IGdsR2FtZS51c2VyLmdldCgnbG9naWNJRCcpO1xyXG5cdFx0XHRsZXQgY2hvb3NlTW9uZXkgPSBwYXJzZUZsb2F0KHRoaXMuZWRpdF9jb2luLnN0cmluZykgKiAxMDA7XHJcblx0XHRcdGxldCBwYXlKdW1wID0gZ2xHYW1lLnVzZXIuZ2V0KCd1cmwnKS5wYXlfanVtcDtcclxuXHRcdFx0bGV0IHRyaWxhdGVyYWxJZGVuID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LnRyaWxhdGVyYWxJZGVudCwgaWQgPSB0aGlzLkN1cnBhZ2VpbmZvLmlkLCBub3dUaW1lID0gdGhpcy5ub3dUaW1lXHJcblx0XHRcdGxldCBzdHIgPSBgdXNlcklkPSR7bXlJRH0mbW9uZXk9JHtjaG9vc2VNb25leX0mdHJpbGF0ZXJhbElkZW50PSR7dHJpbGF0ZXJhbElkZW59JmlkPSR7aWR9JmN1cnJlbnRUeXBlPSR7dGhpcy5DdXJwYWdlaW5mby5jdXJyZW50VHlwZX0mdGltZT0ke25vd1RpbWV9JmFjY291bnRJZD0ke2FjY291bnRJZH0mdHlwZUlkPSR7dGhpcy50eXBlSWR9JnBhZ2VJZD0ke3RoaXMuQ3VycGFnZWluZm8uaWR9YDtcclxuXHRcdFx0bGV0IHNpZ24gPSBtZDUoc3RyICsgcmVjaGFyZ2VLZXkpXHJcblx0XHRcdHN0ciA9IHN0ciArIGAmc2lnbj0ke3NpZ259YDtcclxuXHRcdFx0bGV0IHVybCA9IHBheUp1bXAgKyAnPycgKyBzdHI7XHJcblx0XHRcdGNjLnN5cy5vcGVuVVJMKHVybClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzaG9wRmFzdFBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXMuc2hvcEZhc3RQYW5lbCwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xyXG5cdFx0XHRsZXQgc2NyaXB0ID0gc2hvcEZhc3RQYW5lbC5nZXRDb21wb25lbnQoXCJzaG9wRmFzdFBhbmVsXCIpO1xyXG5cdFx0XHRzY3JpcHQuaW5pdFVJKHRoaXMuQ3VycGFnZWluZm8sIHBhcnNlRmxvYXQodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSwgdGhpcy5naXZlUHJvcG9ydGlvbiwgdGhpcy50eXBlSWQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcGFyZU1vbmV5KCkge1xyXG5cdFx0bGV0IGNob29zZU1vbmV5ID0gcGFyc2VGbG9hdCh0aGlzLmVkaXRfY29pbi5zdHJpbmcpXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUmVjaGFyZ2Vjb250ZW50LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG5cdFx0XHRsZXQgbmFtZSA9IE51bWJlcih0aGlzLlJlY2hhcmdlY29udGVudC5jaGlsZHJlbltpXS5uYW1lKVxyXG5cdFx0XHRpZiAoY2hvb3NlTW9uZXkgPT0gdGhpcy5nZXREYXRhKG5hbWUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblx0UmVjaGFyZ2VJdGVtQ0IobmFtZSkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJlY2hhcmdlY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuXHRcdFx0aWYgKG5hbWUgPT0gdGhpcy5SZWNoYXJnZWNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSkge1xyXG5cdFx0XHRcdHRoaXMuUmVjaGFyZ2Vjb250ZW50LmNoaWxkcmVuW2ldLnNldFNjYWxlKDEuMilcclxuXHRcdFx0XHR0aGlzLkxhYl9jb2luLmdldFNlbGZGdW5jKCkuc2V0U3RyaW5nKHRoaXMuZ2V0RGF0YShuYW1lKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2l2ZVByb3BvcnRpb24gIT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy5kZXNfcmVjaGFyZ2Uubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bGV0IHJlY2hhcmdlUmV3YXJkID0gTnVtYmVyKE51bWJlcih0aGlzLmVkaXRfY29pbi5zdHJpbmcpICogTnVtYmVyKHRoaXMuZ2l2ZVByb3BvcnRpb24pKS5kaXYoMTAwMDApLnRvU3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdHRvdGFsID0gTnVtYmVyKE51bWJlcih0aGlzLmVkaXRfY29pbi5zdHJpbmcpICogTnVtYmVyKHRoaXMuZ2l2ZVByb3BvcnRpb24pKS5kaXYoMTAwMDApLmFkZChOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSkudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdHRoaXMuZGVzX3JlY2hhcmdlLnN0cmluZyA9IGDmnKzmrKHlhYXlgLzpop3lpJbotaDpgIE8Y29sb3I9I2Y0YzQwND4ke3JlY2hhcmdlUmV3YXJkfemHkeW4gTwvYz7vvIzmgLvlhbHlj6/ojrflvpc8Y29sb3I9I2Y0YzQwND4ke3RvdGFsfemHkeW4geOAgjwvYz5gXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZGVzX3JlY2hhcmdlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuUmVjaGFyZ2Vjb250ZW50LmNoaWxkcmVuW2ldLnNldFNjYWxlKDEpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHRnZXREYXRhKGluZGV4KSB7XHJcblx0XHRsZXQgcXVpY2tNb2RlID0gdGhpcy5DdXJwYWdlaW5mby5jdXJyZW50Um90YXRpb25BY2NvdW50LmNvbmZpZy5xdWlja01vZGU7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRGbG9hdChxdWlja01vZGVbaW5kZXhdKTtcclxuXHR9LFxyXG5cdGdldEZsb2F0KHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcblx0fSxcclxuXHJcblx0c2V0TGFiQ29pbigpIHtcclxuXHRcdGlmIChOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSA+IDApIHtcclxuXHRcdFx0dGhpcy5kZXNfcmVjaGFyZ2Uubm9kZS5hY3RpdmUgPSB0aGlzLmdpdmVQcm9wb3J0aW9uICE9IDA7XHJcblx0XHRcdGxldCByZWNoYXJnZVJld2FyZCA9IE51bWJlcihOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSAqIE51bWJlcih0aGlzLmdpdmVQcm9wb3J0aW9uKSkuZGl2KDEwMDAwKS50b1N0cmluZygpLFxyXG5cdFx0XHRcdHRvdGFsID0gTnVtYmVyKE51bWJlcih0aGlzLmVkaXRfY29pbi5zdHJpbmcpICogTnVtYmVyKHRoaXMuZ2l2ZVByb3BvcnRpb24pKS5kaXYoMTAwMDApLmFkZChOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKSkudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IHN0clJld2FyZCA9IGdsR2FtZS51c2VyLnN0cmluZ1ZpcEZpeChyZWNoYXJnZVJld2FyZCwgMiksXHJcblx0XHRcdFx0c3RyVG90YWwgPSBnbEdhbWUudXNlci5zdHJpbmdWaXBGaXgodG90YWwsIDIpO1xyXG5cdFx0XHR0aGlzLmRlc19yZWNoYXJnZS5zdHJpbmcgPSBgPGNvbG9yPSNhYmNhZmY+5pys5qyh5YWF5YC86aKd5aSW6LWg6YCBPC9jPjxjb2xvcj0jZjY4ZTFlPiR7c3RyUmV3YXJkID8gc3RyUmV3YXJkIDogMH3ph5HluIE8L2M+77yMPGNvbG9yPSNhYmNhZmY+5oC75YWx5Y+v6I635b6XPC9jPjxjb2xvcj0jZjY4ZTFlPiR7c3RyVG90YWwgPyBzdHJUb3RhbCA6IDB96YeR5biB44CCPC9jPmBcclxuXHJcblx0XHRcdGlmICh0aGlzLmVkaXRfY29pbi5zdHJpbmcuc3Vic3RyKDAsIDEpID09PSAnMCcpXHJcblx0XHRcdFx0dGhpcy5MYWJfY29pbi5nZXRTZWxmRnVuYygpLnNldFN0cmluZyhOdW1iZXIodGhpcy5lZGl0X2NvaW4uc3RyaW5nKS50b1N0cmluZygpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vdGhpcy5MYWJfY29pbi5nZXRTZWxmRnVuYygpLnNldFN0cmluZyhcIjBcIik7XHJcblx0XHRcdHRoaXMuZGVzX3JlY2hhcmdlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJlY2hhcmdlY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuXHRcdFx0bGV0IG51bVRvID0gdGhpcy5SZWNoYXJnZWNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJudW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc7XHJcblx0XHRcdGlmICh0aGlzLmVkaXRfY29pbi5zdHJpbmcgPT09IG51bVRvKSB7XHJcblx0XHRcdFx0dGhpcy5SZWNoYXJnZWNvbnRlbnQuY2hpbGRyZW5baV0uc2V0U2NhbGUoMS4yKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLlJlY2hhcmdlY29udGVudC5jaGlsZHJlbltpXS5zZXRTY2FsZSgxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyAvL+etueeggea7keWKqOadoeinpuaRuOS6i+S7tuebkeWQrFxyXG5cdC8vIHRvdWNoRXZlbnQoKSB7XHJcblx0Ly8gICB0aGlzLl9zdGFydFBvcyA9IG51bGw7XHJcblx0Ly8gICB0aGlzLl9tb3ZlUG9zID0gbnVsbDtcclxuXHQvLyAgIHRoaXMuUm93Y29udGVudC5vbigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xyXG5cdC8vICAgICBjb25zb2xlLmxvZygnZWVlZWVlJyxldmVudClcclxuXHQvLyAgICAgICB0aGlzLl9zdGFydFBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcblx0Ly8gICB9KTtcclxuXHQvLyAgIHRoaXMuUm93Y29udGVudC5vbigndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XHJcblx0Ly8gICAgICAgdGhpcy5fbW92ZVBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcblx0Ly8gICAgICAgbGV0IF9vZmZYID0gdGhpcy5fbW92ZVBvcy54IC0gdGhpcy5fc3RhcnRQb3MueDtcclxuXHQvLyAgICAgICB0aGlzLlJvd2NvbnRlbnQueCAtPSBfb2ZmWDtcclxuXHQvLyAgICAgICB0aGlzLl9zdGFydFBvcyA9IHRoaXMuX21vdmVQb3M7XHJcblx0Ly8gICAgICAgLy/kvY3nva7pmZDliLZcclxuXHQvLyAgICAgICBsZXQgX3dpZHRoID0gKHRoaXMuUm93Y29udGVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIDUgLSAyNDU7XHJcblx0Ly8gICAgICAgLy8gaWYgKHRoaXMuUm93Y29udGVudC54IDwgLV93aWR0aCkge1xyXG5cdC8vICAgICAgIC8vICAgICB0aGlzLlJvd2NvbnRlbnQueCA9IC1fd2lkdGg7XHJcblx0Ly8gICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLlJvd2NvbnRlbnQueCA+IF93aWR0aCkge1xyXG5cdC8vICAgICAgIC8vICAgICB0aGlzLlJvd2NvbnRlbnQueCA9IF93aWR0aDtcclxuXHQvLyAgICAgICAvLyB9XHJcblx0Ly8gICB9KTsgXHJcblx0Ly8gfSxcclxuXHRPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLlJvd2NvbnRlbnQub2ZmKCd0b3VjaHN0YXInKVxyXG5cdH1cclxufSk7XHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/withdrawal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01888rqHTtPao8QqPt6HqKO', 'withdrawal');
// modules/plaza/script/prefab/withdrawal/withdrawal.js

"use strict";

var EXTRACT_TYPE = {
  //当前提现类型
  NONE: 0,
  ALIPAY: 1,
  BANK: 2
};
glGame.baseclass.extend({
  properties: {
    extractBank: cc.Node,
    //银行卡取现
    extractAlipay: cc.Node,
    //支付宝取现
    lab_cashCoin: cc.Label,
    //可提现金额
    lab_extractRule: cc.Label,
    //提现手续以及规则
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
  onLoad: function onLoad() {
    this.index = 1;
    this.registerEvent();
  },
  ActionEndData: function ActionEndData() {
    this.reqDrawCoin();
    this.ReqCashBroadcastList();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.ActionEndData, this);
    glGame.emitter.on("updateUserData", this.updateUserData, this);
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
    this.editbox.node.on("text-changed", this.onTextChanged, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("withdrawSuccess", this);
  },
  onTextChanged: function onTextChanged(editbox) {
    if (editbox.string == "") {
      return;
    }

    var vau = Number(editbox.string);

    if (isNaN(vau)) {
      editbox.string = "";
      return;
    }

    var edbStr = editbox.string;

    if (edbStr.indexOf(".") != -1 && edbStr.length - edbStr.indexOf(".") > 2) {
      edbStr = edbStr.substr(0, edbStr.indexOf(".") + 3);
    }

    vau = Number(edbStr);
    editbox.string = Math.abs(vau).toString();
  },
  ReqCashBroadcastList: function ReqCashBroadcastList() {
    var _this = this;

    glGame.gameNet.send_msg("http.ReqCashBroadcastList", {
      pageSize: 30
    }, function (route, data) {
      _this.defData = data.list.defData;
      _this.rollingData = data.list.rollingData;
      _this.serverTimeoff = data.serverTime * 1000 - Date.now();

      _this.initCashRecord();

      _this.totalAmount = data.totalAmount; //this.setintegerLabel(Number(Math.floor(Number(this.totalAmount).div(100))));
    });
  },
  getcurTime: function getcurTime(cur_waitTime) {
    var countDown = Math.floor((cur_waitTime - (Date.now() + this.serverTimeoff)) / 1000);
    return countDown;
  },
  withdrawSuccess: function withdrawSuccess(amount) {
    this.coin -= amount;
    this.coin = Math.max(0, this.coin);
    this.lab_cashCoin.string = this.getFloat(this.coin);
    glGame.panel.showPanelByName("exchangeWin").then(function (prefab) {
      prefab.getComponent("exchangeWin").playSucceed();
    });
  },
  initCashRecord: function initCashRecord() {
    this.recordIndex = 0;
    var Count = this.defData.length > 6 ? 6 : this.defData.length;

    for (var i = 0; i < Count; i++) {
      var cashItem = cc.instantiate(this.cashItem);
      cashItem.parent = this.cashRecord;
      cashItem.active = false;
      var timeStamp = new Date(this.defData[i].updateTime * 1000);
      var strTime = "".concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/");
      strTime += "".concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += " ".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes());
      cashItem.getChildByName("notice").getComponent(cc.RichText).string = "".concat(strTime, " - \u606D\u8D3A<color=#7de2ff>").concat(this.defData[i].logicId, "</c><size=26>\u6210\u529F\u63D0\u73B0<color=#f4c404>").concat(this.getFloat(this.defData[i].cashAmount), "</c>\u5143\u3002</size>");
    }

    glGame.panel.showEffectNode(this, this.cashRecord, 0.02, true);
  },
  //数字跳动
  myCoinshow: function myCoinshow(nowNumber) {
    var _this2 = this;

    this.cishu = 50; //变化的次数

    this.time = 2; //变化的时间

    var Number1 = Number(this.totalAmount).div(100);
    var Number2 = Number(nowNumber).div(100);
    var Number3 = Number1.sub(Number2);
    var dty,
        cb,
        action = [];
    var szNum;

    for (var i = 0; i < this.cishu; i++) {
      dty = cc.delayTime(this.time / this.cishu);
      cb = cc.callFunc(function () {
        if (Number2 < Number1) {
          Number2 = Math.floor(Number(Number2).add(Number3.div(_this2.cishu)));

          _this2.setintegerLabel(Number2);
        } else {
          Number1 = Math.floor(Number(Number1).sub(Number3.div(_this2.cishu)));
          szNum = Number1 + "";

          _this2.setintegerLabel(Number1);
        }
      });
      action.push(dty, cb);
    }

    this.integer.stopAllActions();
    this.integer.runAction(cc.sequence(action));
  },
  //设置提现榜数值
  setintegerLabel: function setintegerLabel(value) {
    if (!this.spriteFrameList) {
      this.spriteFrameList = [];

      for (var i = 0; i < this.integer.getChildByName("numLabel").childrenCount; i++) {
        this.spriteFrameList.push(cc.instantiate(this.integer.getChildByName("numLabel").getChildByName("img_num" + i)));
        this.integer.getChildByName("numLabel").getChildByName("img_num" + i).active = false;
      }
    }

    for (var _i = 0; _i < this.integer.getChildByName("numLabel").childrenCount; _i++) {
      this.integer.getChildByName("numLabel").getChildByName("img_num" + _i).active = false;
    }

    var numString = value + "";
    var len = numString.length > 9 ? 9 : numString.length;

    for (var _i2 = 0; _i2 < len; _i2++) {
      this.integer.getChildByName("numLabel").getChildByName("img_num" + (9 - _i2)).getComponent(cc.Sprite).spriteFrame = cc.instantiate(this.spriteFrameList[Number(numString.charAt(_i2))]).getComponent(cc.Sprite).spriteFrame;
      this.integer.getChildByName("numLabel").getChildByName("img_num" + (9 - _i2)).active = true;
    }
  },
  update: function update(dt) {
    var _this3 = this;

    if (!this.rollingData) return;

    for (var i = 0; i < this.rollingData.length; i++) {
      var cutTime = this.getcurTime(this.rollingData[i].updateTime * 1000);

      if (cutTime <= 0 && !this.rollingData[i].played) {
        this.rollingData[i].played = true;
        this.addItem(this.rollingData[i]);
        var nowNumber = this.totalAmount;
        this.totalAmount += this.rollingData[i].cashAmount;
        console.log("这是开始变化之前", nowNumber, this.totalAmount, this.totalAmount - nowNumber, this.rollingData[i].cashAmount);
        this.myCoinshow(nowNumber);
        break;
      }
    }

    var countDown = new Date(Date.now() + this.serverTimeoff).getSeconds();

    if (countDown <= 0 && !this.boolreqData) {
      this.boolreqData = true;
      glGame.gameNet.send_msg("http.ReqCashBroadcastList", {}, function (route, data) {
        _this3.defData = data.list.defData;
        _this3.rollingData = data.list.rollingData;
        _this3.serverTimeoff = data.serverTime * 1000 - Date.now();
        var totalAmount = data.totalAmount;

        _this3.myCoinshow(totalAmount);

        _this3.totalAmount = totalAmount;
      });
    } else if (countDown > 0 && this.boolreqData) {
      this.boolreqData = false;
    }
  },
  //刷新记录
  addItem: function addItem(data) {
    if (!data) return;

    if (this.cashRecord.childrenCount >= 6) {
      this.cashRecord.children[0].destroy();
      this.cashRecord.children[0].removeFromParent();
    }

    var cashItem = cc.instantiate(this.cashItem);
    cashItem.parent = this.cashRecord;
    cashItem.active = false;
    var timeStamp = new Date(data.updateTime * 1000);
    var strTime = "".concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/");
    strTime += "".concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
    strTime += " ".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
    strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes());
    var logicId = data.logicId,
        cashAmount = data.cashAmount;
    cashItem.getChildByName("notice").getComponent(cc.RichText).string = "".concat(strTime, " - \u606D\u8D3A<color=#7de2ff>").concat(logicId, "</c><size=26>\u6210\u529F\u63D0\u73B0<color=#f4c404>").concat(this.getFloat(cashAmount), "\u5143\u3002</c></size>");
    glGame.panel.showEffectNode(this, this.cashRecord, 0.02, true);
  },
  reqDrawCoin: function reqDrawCoin() {
    var _this4 = this;

    glGame.gameNet.send_msg("http.ReqWithdrawCoin", null, function (route, data) {
      _this4.unit = data.unit; // 取现倍数

      _this4.type = data.type; // 1. 固定手续费 2 按比例收费

      _this4.fee = data.fee; //手续费金额或比例

      _this4.start = data.withdraw_deposit_start; // 单次提现限额区间设定初

      _this4.end = data.withdraw_deposit_end; //线上支付限额区间设定末

      _this4.isNoUpperLimit = data.isNoUpperLimit; // 是否为无上限 1代表无上限，0代表有上限值

      _this4.coin = data.coin; //可提现金额

      _this4.mode = data.mode; // bank  alipay   是否允许支付宝或者银行提现

      _this4.cashPwdMode = data.cashPwdMode; //取现密码找回配置，1为通过手机验证码 2 联系客服

      _this4.unsatisfiedCoin = data.unsatisfiedCoin; //还有多少金币满足打码量要求

      _this4.showMode();

      _this4.setExtractRule();

      _this4.initViewData();
    });
  },
  reqWithdrawConfig: function reqWithdrawConfig() {
    var _this5 = this;

    glGame.gameNet.send_msg("http.reqWithdrawConfig", null, function (route, data) {
      _this5.phoneCode = data.phone;
      _this5.checkType = data.phone_check;
      _this5.drawPwdState = data.cash_password;

      if (_this5.checkType == 0) {
        glGame.user.reqWithdraw(Number(_this5.edbNumBank.string), _this5.index);
      } else if (_this5.checkType == 2 && _this5.drawPwdState == 0) {
        _this5.showSetDrawPassword();
      } else if (_this5.checkType == 1 && !_this5.checkPhone(_this5.phoneCode)) {
        _this5.showSetPhoneCode();
      } else if (_this5.checkType == 2 && _this5.drawPwdState != 0) {
        _this5.showPassword();
      } else if (_this5.checkType == 1 && _this5.checkPhone(_this5.phoneCode)) {
        _this5.showPhoneCode();
      }
    });
  },
  checkPhone: function checkPhone(phone) {
    if (typeof phone == "sting" && phone == "") return false;else if (typeof phone == "number" && phone == 0) return false;else if (phone == null) return false;
    return true;
  },
  showSetDrawPassword: function showSetDrawPassword() {
    var _this6 = this;

    glGame.panel.showPanelByName("setExtractpass").then(function (prefab) {
      var script = prefab.getComponent("setExtractpass");
      script.setTips(_this6.cashPwdMode);
      script.set("type", _this6.index);
      script.set("coin", _this6.edbNumBank.string);
    });
  },
  showSetPhoneCode: function showSetPhoneCode() {
    glGame.panel.showPanelByName("bindPhone"); //绑定
  },
  showPassword: function showPassword() {
    var _this7 = this;

    glGame.panel.showPanelByName("extractpass").then(function (prefab) {
      prefab.getComponent("extractpass").initView(_this7.index, _this7.edbNumBank.string, _this7.cashPwdMode);
    });
  },
  showPhoneCode: function showPhoneCode() {
    var _this8 = this;

    var phone = glGame.user.get("phone").toString();

    if (!phone || phone == "" || phone == "0") {
      glGame.panel.showPanelByName("bindPhone"); //绑定

      return;
    }

    glGame.panel.showPanelByName("extractVerifica").then(function (prefab) {
      var script = prefab.getComponent("extractVerifica");
      script.initData(glGame.user.get("phone"), _this8.edbNumBank.string);
      script.set("type", _this8.index);
    });
  },
  //设置手续费提示
  setExtractRule: function setExtractRule() {
    this.lab_extractRule.string = ""; //免手续费

    var content1 = this.unit <= 1 ? "免手续费" : "\u53EA\u652F\u6301".concat(this.getFloat(this.unit), "\u7684\u500D\u6570,\u514D\u624B\u7EED\u8D39"); //收手续费

    var str;
    str = this.type == 1 ? "".concat(this.getFloat(this.fee)) : "".concat(this.getFloat(this.fee), "%");
    var content2 = '';

    if (this.fee == 0) {
      content2 = this.unit <= 1 ? "" : "\u53EA\u652F\u6301".concat(this.getFloat(this.unit), "\u7684\u500D\u6570");
    } else {
      if (this.type == 2) {
        content2 = this.unit <= 1 ? "\u6536\u53D6".concat(str, "\u624B\u7EED\u8D39") : "\u53EA\u652F\u6301".concat(this.getFloat(this.unit), "\u7684\u500D\u6570,\u4E14\u6536\u53D6").concat(str, "\u624B\u7EED\u8D39");
      } else {
        content2 = this.unit <= 1 ? "\u6536\u53D6".concat(str, "\u5143\u624B\u7EED\u8D39") : "\u53EA\u652F\u6301".concat(this.getFloat(this.unit), "\u7684\u500D\u6570,\u4E14\u6536\u53D6").concat(str, "\u5143\u624B\u7EED\u8D39");
      }
    }

    this.lab_extractRule.string = this.type == 3 ? content1 : content2;

    if (this.unsatisfiedCoin == 0) {
      this.lab_ask.string = "<color=#48d4a8>\u60A8\u8EAB\u4E0A\u6240\u6709\u91D1\u5E01\u90FD\u5DF2\u6EE1\u8DB3\u6253\u7801\u91CF\u8981\u6C42\uFF0C\u65E0\u63D0\u73B0\u9650\u5236</c>";
    } else {
      this.lab_ask.string = "<color=#cee0fe>\u5F53\u524D\u8FD8\u6709</c><color=#f44d4d>".concat(this.getFloat(this.unsatisfiedCoin), "</c><color=#cee0fe>\u91D1\u5E01\u672A\u6EE1\u8DB3\u6253\u7801\u91CF\u8981\u6C42</c>");
    }
  },
  //提现渠道初始化
  showMode: function showMode() {
    this.bankCash.node.active = this.mode.bank == 1;
    this.alipayCash.node.active = this.mode.alipay == 1;

    if (this.mode.bank != 1 && this.mode.alipay == 1) {
      this.index = EXTRACT_TYPE.ALIPAY;
      this.alipayCash.isChecked = true;
    } else if (this.mode.bank != 1 && this.mode.alipay != 1) {
      this.selectCash.active = false;
      this.index = EXTRACT_TYPE.NONE;
    } else {
      this.index = EXTRACT_TYPE.BANK;
      this.bankCash.isChecked = true;
    }
  },
  updateUserData: function updateUserData() {
    this.extractBank.getChildByName("bankNumber").active = false;
    this.extractBank.getChildByName("bindbank").active = false;
    this.extractAlipay.getChildByName("aliNumber").active = false;
    this.extractAlipay.getChildByName("bindAlipay").active = false;
    this.initViewData();
    console.log("刷新主页面信息");
  },
  //初始化页面的数据
  initViewData: function initViewData() {
    var bank_card = glGame.user.get("bankCardNum"),
        alipay = glGame.user.get("alipayAcc");

    if (bank_card && bank_card != "") {
      this.extractBank.getChildByName("bankNumber").active = true;
      this.extractBank.getChildByName("bindbank").active = false;
      this.extractBank.getChildByName("bankNumber").getComponent(cc.Label).string = bank_card.replace(bank_card.substring(4, 13), "*********");
    } else {
      this.extractBank.getChildByName("bindbank").active = true;
      this.extractBank.getChildByName("bankNumber").active = false;
    }

    if (alipay && alipay != "") {
      this.extractAlipay.getChildByName("aliNumber").active = true;
      this.extractAlipay.getChildByName("bindAlipay").active = false;
      this.extractAlipay.getChildByName("aliNumber").getComponent(cc.Label).string = alipay.replace(alipay.substring(3, 7), "****");
      ;
    } else {
      this.extractAlipay.getChildByName("bindAlipay").active = true;
      this.extractAlipay.getChildByName("aliNumber").active = false;
    }

    if (this.index == EXTRACT_TYPE.ALIPAY) this.extractAlipay.active = true;else if (this.index == EXTRACT_TYPE.BANK) this.extractBank.active = true;
    this.edbNumNode.getSelfFunc().setString("");
    var X = Math.max(this.start.div(100), Number(this.unit).div(100));
    var Z = parseInt(Number(this.coin).div(100) / Number(this.unit).div(100)) * Number(this.unit).div(100);
    var Y = null;

    if (Z) {
      if (this.isNoUpperLimit == 0) {
        var endValue = parseInt(Number(this.end).div(100) / Number(this.unit).div(100)) * Number(this.unit).div(100);
        Y = Math.min(endValue, Z);
      } else {
        Y = Z;
      }
    } else {
      Y = Number(this.coin).div(100);
    } // if (this.coin >= this.unit) {
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
        this.edbNumNode.getSelfFunc().setPlaceholder("".concat(X, "~").concat(Y));
      }
    }

    this.lab_cashCoin.string = this.getFloat(this.coin);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "alipayCash":
        this.click_alipayCash();
        break;

      case "bankCash":
        this.click_bankCash();
        break;

      case "btn_waterRule":
        this.click_waterRule();
        break;

      case "btn_extractMgr":
        this.click_extractMgr();
        break;

      case "btn_extractRecord":
        this.click_extractRecord();
        break;

      case "btn_bindbank":
        this.click_bindbank();
        break;

      case "btn_bindalipay":
        this.click_bindalipay();
        break;

      case "btn_sure":
        this.sureExtract();
        break;

      case "btn_extractRecord":
        this.extractRecord();
        break;
    }
  },
  //取现记录
  extractRecord: function extractRecord() {},
  //支付宝提现
  reqextractAlipay: function reqextractAlipay() {
    var amount = this.extractAlipay.getChildByName("extractNum").getChildByName("EditBox").getComponent(cc.EditBox).string;
    glGame.panel.showPanelByName("extractpass").then(function (prefab) {
      prefab.getComponent("extractpass").set("amount", amount);
    });
  },
  //确认提现
  sureExtract: function sureExtract() {
    console.log("confirmDraw confirmDraw confirmDraw");

    if (this.coin == 0 && glGame.user.get("coin") != 0) {
      //判断是否开启稽核，目前先这么判断
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.LOCK);
    }

    var edbStr = this.edbNumBank.string; // if (edbStr.indexOf(".") > 0 && edbStr.length - edbStr.indexOf(".") > 2) {
    //     this.edbNumNode.getSelfFunc().setString(edbStr.substr(0, edbStr.indexOf(".")+3));
    // }

    if (edbStr.length == 0) {
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.EMPTY_INPUT);
    }

    if (Number(edbStr) < this.getFloat(Number(this.start))) {
      console.log('输入金额与最低金额', Number(edbStr), Number(this.start));
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.OUT_OF_RANGE);
    }

    if (this.isNoUpperLimit == 0 && Number(edbStr) > this.getFloat(Number(this.end))) {
      console.log('输入金额与最大金额', Number(edbStr), Number(this.end));
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.OUT_OF_RANGE);
    }

    console.log("confirmDraw confirmDraw confirmDraw1");

    if (!/^\d+(\.\d{0,2})?$/.test(this.edbNumBank.string)) {
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.NONUMBER);
    }

    console.log("confirmDraw confirmDraw confirmDraw2", this.edbNumBank.string);
    var amount = Number(this.edbNumBank.string);

    if (!amount || amount < 0) {
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.EXCLITTLE);
    }

    console.log("confirmDraw confirmDraw confirmDraw3");
    var num = amount / this.getFloat(this.unit); // 判断领取倍数

    if (num.toString().indexOf(".") > -1) {
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.MUST_INTEGER.format(this.getFloat(this.unit)));
    }

    console.log("confirmDraw confirmDraw confirmDraw4");
    var userCoin = this.coin;

    if (userCoin - amount < this.getFloat(this.unit)) {
      return glGame.panel.showErrorTip(glGame.tips.EXCHANGE.MINGOLD.format(this.getFloat(this.unit)));
    }

    console.log("confirmDraw confirmDraw confirmDraw5");
    var type = this.drawtype;

    if (this.isNoUpperLimit == 0) {
      var end = this.coin <= this.end ? Number(this.coin).sub(this.coin % this.unit) : this.end;
      if (amount > this.getFloat(end)) return glGame.panel.showTip(glGame.tips.EXCHANGE.OUT_OF_LIMIT);
    } //if (isShowNext) return;


    var accountStr = this.index == 1 ? glGame.user.get("alipayAcc") : glGame.user.get("bankCardNum");
    console.log("账号账号账号", accountStr);

    if (!accountStr) {
      var tipstr = this.index == 1 ? glGame.tips.EXCHANGE.BIND_ZFB : glGame.tips.EXCHANGE.BIND_BANK;
      return glGame.panel.showErrorTip(tipstr);
    }

    if (amount > glGame.user.get("coin")) return glGame.panel.showTip(glGame.tips.EXCHANGE.MONEY_NOT_ENOUGH);
    this.reqWithdrawConfig();
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  //提现在支付宝
  click_alipayCash: function click_alipayCash() {
    this.index = EXTRACT_TYPE.ALIPAY;
    this.extractAlipay.active = true;
    this.extractBank.active = false;
  },
  //提现到银行
  click_bankCash: function click_bankCash() {
    this.index = EXTRACT_TYPE.BANK;
    this.extractAlipay.active = false;
    this.extractBank.active = true;
  },
  //提现管理
  click_extractMgr: function click_extractMgr() {
    glGame.panel.showPanelByName("extractMgr").then(function (prefab) {
      prefab.getComponent("extractMgr").initViewData(2);
    });
  },
  //打码量要求
  click_waterRule: function click_waterRule() {
    glGame.panel.showPanelByName("backWaterRule");
  },
  //提现记录
  click_extractRecord: function click_extractRecord() {
    glGame.panel.showPanelByName("exchangerecord");
  },
  //绑定银行卡
  click_bindbank: function click_bindbank() {
    glGame.panel.showPanelByName("extractMgr").then(function (prefab) {
      prefab.getComponent("extractMgr").initViewData(2);
    });
  },
  //绑定支付宝
  click_bindalipay: function click_bindalipay() {
    glGame.panel.showPanelByName("extractMgr").then(function (prefab) {
      prefab.getComponent("extractMgr").initViewData(1);
    });
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFx3aXRoZHJhd2FsLmpzIl0sIm5hbWVzIjpbIkVYVFJBQ1RfVFlQRSIsIk5PTkUiLCJBTElQQVkiLCJCQU5LIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImV4dHJhY3RCYW5rIiwiY2MiLCJOb2RlIiwiZXh0cmFjdEFsaXBheSIsImxhYl9jYXNoQ29pbiIsIkxhYmVsIiwibGFiX2V4dHJhY3RSdWxlIiwibGFiX2FzayIsIlJpY2hUZXh0Iiwic2VsZWN0Q2FzaCIsImJhbmtDYXNoIiwiVG9nZ2xlIiwiYWxpcGF5Q2FzaCIsImVkYk51bUJhbmsiLCJFZGl0Qm94IiwiZWRpdGJveCIsImVkYk51bU5vZGUiLCJjYXNoUmVjb3JkIiwiY2FzaEl0ZW0iLCJpbnRlZ2VyIiwiZGVjaW1hbCIsIm9uTG9hZCIsImluZGV4IiwicmVnaXN0ZXJFdmVudCIsIkFjdGlvbkVuZERhdGEiLCJyZXFEcmF3Q29pbiIsIlJlcUNhc2hCcm9hZGNhc3RMaXN0IiwiZW1pdHRlciIsIm9uIiwibm9kZSIsIm5hbWUiLCJNRVNTQUdFIiwiVUkiLCJBQ1RJT05fRU5EIiwidXBkYXRlVXNlckRhdGEiLCJ3aXRoZHJhd1N1Y2Nlc3MiLCJvblRleHRDaGFuZ2VkIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwic3RyaW5nIiwidmF1IiwiTnVtYmVyIiwiaXNOYU4iLCJlZGJTdHIiLCJpbmRleE9mIiwibGVuZ3RoIiwic3Vic3RyIiwiTWF0aCIsImFicyIsInRvU3RyaW5nIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicGFnZVNpemUiLCJyb3V0ZSIsImRhdGEiLCJkZWZEYXRhIiwibGlzdCIsInJvbGxpbmdEYXRhIiwic2VydmVyVGltZW9mZiIsInNlcnZlclRpbWUiLCJEYXRlIiwibm93IiwiaW5pdENhc2hSZWNvcmQiLCJ0b3RhbEFtb3VudCIsImdldGN1clRpbWUiLCJjdXJfd2FpdFRpbWUiLCJjb3VudERvd24iLCJmbG9vciIsImFtb3VudCIsImNvaW4iLCJtYXgiLCJnZXRGbG9hdCIsInBhbmVsIiwic2hvd1BhbmVsQnlOYW1lIiwidGhlbiIsInByZWZhYiIsImdldENvbXBvbmVudCIsInBsYXlTdWNjZWVkIiwicmVjb3JkSW5kZXgiLCJDb3VudCIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImFjdGl2ZSIsInRpbWVTdGFtcCIsInVwZGF0ZVRpbWUiLCJzdHJUaW1lIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJsb2dpY0lkIiwiY2FzaEFtb3VudCIsInNob3dFZmZlY3ROb2RlIiwibXlDb2luc2hvdyIsIm5vd051bWJlciIsImNpc2h1IiwidGltZSIsIk51bWJlcjEiLCJkaXYiLCJOdW1iZXIyIiwiTnVtYmVyMyIsInN1YiIsImR0eSIsImNiIiwiYWN0aW9uIiwic3pOdW0iLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsImFkZCIsInNldGludGVnZXJMYWJlbCIsInB1c2giLCJzdG9wQWxsQWN0aW9ucyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwidmFsdWUiLCJzcHJpdGVGcmFtZUxpc3QiLCJjaGlsZHJlbkNvdW50IiwibnVtU3RyaW5nIiwibGVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJjaGFyQXQiLCJ1cGRhdGUiLCJkdCIsImN1dFRpbWUiLCJwbGF5ZWQiLCJhZGRJdGVtIiwiY29uc29sZSIsImxvZyIsImdldFNlY29uZHMiLCJib29scmVxRGF0YSIsImNoaWxkcmVuIiwiZGVzdHJveSIsInJlbW92ZUZyb21QYXJlbnQiLCJ1bml0IiwidHlwZSIsImZlZSIsInN0YXJ0Iiwid2l0aGRyYXdfZGVwb3NpdF9zdGFydCIsImVuZCIsIndpdGhkcmF3X2RlcG9zaXRfZW5kIiwiaXNOb1VwcGVyTGltaXQiLCJtb2RlIiwiY2FzaFB3ZE1vZGUiLCJ1bnNhdGlzZmllZENvaW4iLCJzaG93TW9kZSIsInNldEV4dHJhY3RSdWxlIiwiaW5pdFZpZXdEYXRhIiwicmVxV2l0aGRyYXdDb25maWciLCJwaG9uZUNvZGUiLCJwaG9uZSIsImNoZWNrVHlwZSIsInBob25lX2NoZWNrIiwiZHJhd1B3ZFN0YXRlIiwiY2FzaF9wYXNzd29yZCIsInVzZXIiLCJyZXFXaXRoZHJhdyIsInNob3dTZXREcmF3UGFzc3dvcmQiLCJjaGVja1Bob25lIiwic2hvd1NldFBob25lQ29kZSIsInNob3dQYXNzd29yZCIsInNob3dQaG9uZUNvZGUiLCJzY3JpcHQiLCJzZXRUaXBzIiwic2V0IiwiaW5pdFZpZXciLCJnZXQiLCJpbml0RGF0YSIsImNvbnRlbnQxIiwic3RyIiwiY29udGVudDIiLCJiYW5rIiwiYWxpcGF5IiwiaXNDaGVja2VkIiwiYmFua19jYXJkIiwicmVwbGFjZSIsInN1YnN0cmluZyIsImdldFNlbGZGdW5jIiwic2V0U3RyaW5nIiwiWCIsIloiLCJwYXJzZUludCIsIlkiLCJlbmRWYWx1ZSIsIm1pbiIsInNldFBsYWNlaG9sZGVyIiwib25DbGljayIsInJlbW92ZSIsImNsaWNrX2FsaXBheUNhc2giLCJjbGlja19iYW5rQ2FzaCIsImNsaWNrX3dhdGVyUnVsZSIsImNsaWNrX2V4dHJhY3RNZ3IiLCJjbGlja19leHRyYWN0UmVjb3JkIiwiY2xpY2tfYmluZGJhbmsiLCJjbGlja19iaW5kYWxpcGF5Iiwic3VyZUV4dHJhY3QiLCJleHRyYWN0UmVjb3JkIiwicmVxZXh0cmFjdEFsaXBheSIsInNob3dFcnJvclRpcCIsInRpcHMiLCJFWENIQU5HRSIsIkxPQ0siLCJFTVBUWV9JTlBVVCIsIk9VVF9PRl9SQU5HRSIsInRlc3QiLCJOT05VTUJFUiIsIkVYQ0xJVFRMRSIsIm51bSIsIk1VU1RfSU5URUdFUiIsImZvcm1hdCIsInVzZXJDb2luIiwiTUlOR09MRCIsImRyYXd0eXBlIiwic2hvd1RpcCIsIk9VVF9PRl9MSU1JVCIsImFjY291bnRTdHIiLCJ0aXBzdHIiLCJCSU5EX1pGQiIsIkJJTkRfQkFOSyIsIk1PTkVZ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S0FBUCxDQUFhQyxlQUFiLENBQTZCLFlBQTdCLEVBQTJDQyxJQUEzQyxDQUFnRCxVQUFBQyxNQUFNLEVBQUk7QUFDdERBLE1BQUFBLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQixZQUFwQixFQUFrQ3lFLFlBQWxDLENBQStDLENBQS9DO0FBQ0gsS0FGRDtBQUdILEdBamhCbUI7QUFraEJwQnlFLEVBQUFBLFNBbGhCb0IsdUJBa2hCUjtBQUNSLFNBQUt6TCxlQUFMO0FBQ0gsR0FwaEJtQixDQXFoQnBCOztBQXJoQm9CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFWFRSQUNUX1RZUEUgPSB7IC8v5b2T5YmN5o+Q546w57G75Z6LXHJcbiAgICBOT05FOiAwLFxyXG4gICAgQUxJUEFZOiAxLFxyXG4gICAgQkFOSzogMlxyXG59XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZXh0cmFjdEJhbms6IGNjLk5vZGUsLy/pk7booYzljaHlj5bnjrBcclxuICAgICAgICBleHRyYWN0QWxpcGF5OiBjYy5Ob2RlLC8v5pSv5LuY5a6d5Y+W546wXHJcbiAgICAgICAgbGFiX2Nhc2hDb2luOiBjYy5MYWJlbCwgLy/lj6/mj5DnjrDph5Hpop1cclxuICAgICAgICBsYWJfZXh0cmFjdFJ1bGU6IGNjLkxhYmVsLC8v5o+Q546w5omL57ut5Lul5Y+K6KeE5YiZXHJcbiAgICAgICAgbGFiX2FzazogY2MuUmljaFRleHQsXHJcblxyXG4gICAgICAgIHNlbGVjdENhc2g6IGNjLk5vZGUsXHJcbiAgICAgICAgYmFua0Nhc2g6IGNjLlRvZ2dsZSxcclxuICAgICAgICBhbGlwYXlDYXNoOiBjYy5Ub2dnbGUsXHJcbiAgICAgICAgZWRiTnVtQmFuazogY2MuRWRpdEJveCxcclxuICAgICAgICBlZGl0Ym94OiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIGVkYk51bU5vZGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIGNhc2hSZWNvcmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgY2FzaEl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgaW50ZWdlcjogY2MuTm9kZSxcclxuICAgICAgICBkZWNpbWFsOiBjYy5MYWJlbFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDFcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIEFjdGlvbkVuZERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5yZXFEcmF3Q29pbigpO1xyXG4gICAgICAgIHRoaXMuUmVxQ2FzaEJyb2FkY2FzdExpc3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5rOo5YaM55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKGAke3RoaXMubm9kZS5uYW1lfSR7TUVTU0FHRS5VSS5BQ1RJT05fRU5EfWAsIHRoaXMuQWN0aW9uRW5kRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzLnVwZGF0ZVVzZXJEYXRhLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIndpdGhkcmF3U3VjY2Vzc1wiLCB0aGlzLndpdGhkcmF3U3VjY2VzcywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5lZGl0Ym94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vblRleHRDaGFuZ2VkLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwid2l0aGRyYXdTdWNjZXNzXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIG9uVGV4dENoYW5nZWQoZWRpdGJveCkge1xyXG4gICAgICAgIGlmIChlZGl0Ym94LnN0cmluZyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2YXUgPSBOdW1iZXIoZWRpdGJveC5zdHJpbmcpO1xyXG4gICAgICAgIGlmIChpc05hTih2YXUpKSB7XHJcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVkYlN0ciA9IGVkaXRib3guc3RyaW5nO1xyXG4gICAgICAgIGlmIChlZGJTdHIuaW5kZXhPZihcIi5cIikgIT0gLTEgJiYgZWRiU3RyLmxlbmd0aCAtIGVkYlN0ci5pbmRleE9mKFwiLlwiKSA+IDIpIHtcclxuICAgICAgICAgICAgZWRiU3RyID0gZWRiU3RyLnN1YnN0cigwLCBlZGJTdHIuaW5kZXhPZihcIi5cIikgKyAzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhdSA9IE51bWJlcihlZGJTdHIpO1xyXG4gICAgICAgIGVkaXRib3guc3RyaW5nID0gTWF0aC5hYnModmF1KS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXFDYXNoQnJvYWRjYXN0TGlzdCgpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxQ2FzaEJyb2FkY2FzdExpc3RcIiwgeyBwYWdlU2l6ZTogMzAgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmRGF0YSA9IGRhdGEubGlzdC5kZWZEYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGxpbmdEYXRhID0gZGF0YS5saXN0LnJvbGxpbmdEYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclRpbWVvZmYgPSBkYXRhLnNlcnZlclRpbWUgKiAxMDAwIC0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0Q2FzaFJlY29yZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQW1vdW50ID0gZGF0YS50b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgLy90aGlzLnNldGludGVnZXJMYWJlbChOdW1iZXIoTWF0aC5mbG9vcihOdW1iZXIodGhpcy50b3RhbEFtb3VudCkuZGl2KDEwMCkpKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Y3VyVGltZShjdXJfd2FpdFRpbWUpIHtcclxuICAgICAgICBsZXQgY291bnREb3duID0gTWF0aC5mbG9vcigoY3VyX3dhaXRUaW1lIC0gKERhdGUubm93KCkgKyB0aGlzLnNlcnZlclRpbWVvZmYpKSAvIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBjb3VudERvd247XHJcbiAgICB9LFxyXG5cclxuICAgIHdpdGhkcmF3U3VjY2VzcyhhbW91bnQpIHtcclxuICAgICAgICB0aGlzLmNvaW4gLT0gYW1vdW50O1xyXG4gICAgICAgIHRoaXMuY29pbiA9IE1hdGgubWF4KDAsIHRoaXMuY29pbik7XHJcbiAgICAgICAgdGhpcy5sYWJfY2FzaENvaW4uc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLmNvaW4pO1xyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwiZXhjaGFuZ2VXaW5cIikudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBwcmVmYWIuZ2V0Q29tcG9uZW50KFwiZXhjaGFuZ2VXaW5cIikucGxheVN1Y2NlZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdENhc2hSZWNvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRJbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IENvdW50ID0gdGhpcy5kZWZEYXRhLmxlbmd0aCA+IDYgPyA2IDogdGhpcy5kZWZEYXRhLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhc2hJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXNoSXRlbSk7XHJcbiAgICAgICAgICAgIGNhc2hJdGVtLnBhcmVudCA9IHRoaXMuY2FzaFJlY29yZDtcclxuICAgICAgICAgICAgY2FzaEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0aW1lU3RhbXAgPSBuZXcgRGF0ZSh0aGlzLmRlZkRhdGFbaV0udXBkYXRlVGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICBsZXQgc3RyVGltZSA9IGAke3RpbWVTdGFtcC5nZXRNb250aCgpICsgMSA+PSAxMCA/IHRpbWVTdGFtcC5nZXRNb250aCgpICsgMSA6IFwiMFwiICsgKHRpbWVTdGFtcC5nZXRNb250aCgpICsgMSl9L2BcclxuICAgICAgICAgICAgc3RyVGltZSArPSBgJHt0aW1lU3RhbXAuZ2V0RGF0ZSgpID49IDEwID8gdGltZVN0YW1wLmdldERhdGUoKSA6ICcwJyArIHRpbWVTdGFtcC5nZXREYXRlKCl9YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAgJHt0aW1lU3RhbXAuZ2V0SG91cnMoKSA+PSAxMCA/IHRpbWVTdGFtcC5nZXRIb3VycygpIDogXCIwXCIgKyB0aW1lU3RhbXAuZ2V0SG91cnMoKX06YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRNaW51dGVzKCkgPj0gMTAgPyB0aW1lU3RhbXAuZ2V0TWludXRlcygpIDogXCIwXCIgKyB0aW1lU3RhbXAuZ2V0TWludXRlcygpfWBcclxuICAgICAgICAgICAgY2FzaEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpY2VcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgYCR7c3RyVGltZX0gLSDmga3otLo8Y29sb3I9IzdkZTJmZj4ke3RoaXMuZGVmRGF0YVtpXS5sb2dpY0lkfTwvYz48c2l6ZT0yNj7miJDlip/mj5DnjrA8Y29sb3I9I2Y0YzQwND4ke3RoaXMuZ2V0RmxvYXQodGhpcy5kZWZEYXRhW2ldLmNhc2hBbW91bnQpfTwvYz7lhYPjgII8L3NpemU+YFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsIHRoaXMuY2FzaFJlY29yZCwgMC4wMiwgdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgLy/mlbDlrZfot7PliqhcclxuICAgIG15Q29pbnNob3cobm93TnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jaXNodSA9IDUwOyAgICAvL+WPmOWMlueahOasoeaVsFxyXG4gICAgICAgIHRoaXMudGltZSA9IDI7ICAgICAgLy/lj5jljJbnmoTml7bpl7RcclxuICAgICAgICBsZXQgTnVtYmVyMSA9IE51bWJlcih0aGlzLnRvdGFsQW1vdW50KS5kaXYoMTAwKTtcclxuICAgICAgICBsZXQgTnVtYmVyMiA9IE51bWJlcihub3dOdW1iZXIpLmRpdigxMDApO1xyXG4gICAgICAgIGxldCBOdW1iZXIzID0gTnVtYmVyMS5zdWIoTnVtYmVyMik7XHJcbiAgICAgICAgbGV0IGR0eSwgY2IsIGFjdGlvbiA9IFtdO1xyXG4gICAgICAgIGxldCBzek51bTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2lzaHU7IGkrKykge1xyXG4gICAgICAgICAgICBkdHkgPSBjYy5kZWxheVRpbWUodGhpcy50aW1lIC8gdGhpcy5jaXNodSk7XHJcbiAgICAgICAgICAgIGNiID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcjIgPCBOdW1iZXIxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyMiA9IE1hdGguZmxvb3IoKE51bWJlcihOdW1iZXIyKS5hZGQoTnVtYmVyMy5kaXYodGhpcy5jaXNodSkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRpbnRlZ2VyTGFiZWwoTnVtYmVyMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIE51bWJlcjEgPSBNYXRoLmZsb29yKChOdW1iZXIoTnVtYmVyMSkuc3ViKE51bWJlcjMuZGl2KHRoaXMuY2lzaHUpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN6TnVtID0gTnVtYmVyMSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRpbnRlZ2VyTGFiZWwoTnVtYmVyMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGFjdGlvbi5wdXNoKGR0eSwgY2IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludGVnZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmludGVnZXIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbikpO1xyXG4gICAgfSxcclxuICAgIC8v6K6+572u5o+Q546w5qac5pWw5YC8XHJcbiAgICBzZXRpbnRlZ2VyTGFiZWwodmFsdWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3ByaXRlRnJhbWVMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWVMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnRlZ2VyLmdldENoaWxkQnlOYW1lKFwibnVtTGFiZWxcIikuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUZyYW1lTGlzdC5wdXNoKGNjLmluc3RhbnRpYXRlKHRoaXMuaW50ZWdlci5nZXRDaGlsZEJ5TmFtZShcIm51bUxhYmVsXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX251bVwiICsgaSkpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZWdlci5nZXRDaGlsZEJ5TmFtZShcIm51bUxhYmVsXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX251bVwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmludGVnZXIuZ2V0Q2hpbGRCeU5hbWUoXCJudW1MYWJlbFwiKS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlZ2VyLmdldENoaWxkQnlOYW1lKFwibnVtTGFiZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbnVtXCIgKyBpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVN0cmluZyA9IHZhbHVlICsgXCJcIjtcclxuICAgICAgICBsZXQgbGVuID0gbnVtU3RyaW5nLmxlbmd0aCA+IDkgPyA5IDogbnVtU3RyaW5nLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZWdlci5nZXRDaGlsZEJ5TmFtZShcIm51bUxhYmVsXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX251bVwiICsgKDkgLSBpKSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNwcml0ZUZyYW1lTGlzdFtOdW1iZXIobnVtU3RyaW5nLmNoYXJBdChpKSldKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlZ2VyLmdldENoaWxkQnlOYW1lKFwibnVtTGFiZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbnVtXCIgKyAoOSAtIGkpKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMucm9sbGluZ0RhdGEpIHJldHVyblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb2xsaW5nRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3V0VGltZSA9IHRoaXMuZ2V0Y3VyVGltZSh0aGlzLnJvbGxpbmdEYXRhW2ldLnVwZGF0ZVRpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgaWYgKGN1dFRpbWUgPD0gMCAmJiAhdGhpcy5yb2xsaW5nRGF0YVtpXS5wbGF5ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sbGluZ0RhdGFbaV0ucGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbSh0aGlzLnJvbGxpbmdEYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgIGxldCBub3dOdW1iZXIgPSB0aGlzLnRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEFtb3VudCArPSB0aGlzLnJvbGxpbmdEYXRhW2ldLmNhc2hBbW91bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5byA5aeL5Y+Y5YyW5LmL5YmNXCIsIG5vd051bWJlciwgdGhpcy50b3RhbEFtb3VudCwgdGhpcy50b3RhbEFtb3VudCAtIG5vd051bWJlciwgdGhpcy5yb2xsaW5nRGF0YVtpXS5jYXNoQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlDb2luc2hvdyhub3dOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudERvd24gPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5zZXJ2ZXJUaW1lb2ZmKS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgaWYgKGNvdW50RG93biA8PSAwICYmICF0aGlzLmJvb2xyZXFEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9vbHJlcURhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxQ2FzaEJyb2FkY2FzdExpc3RcIiwge30sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZEYXRhID0gZGF0YS5saXN0LmRlZkRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGxpbmdEYXRhID0gZGF0YS5saXN0LnJvbGxpbmdEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJUaW1lb2ZmID0gZGF0YS5zZXJ2ZXJUaW1lICogMTAwMCAtIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxBbW91bnQgPSBkYXRhLnRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teUNvaW5zaG93KHRvdGFsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxBbW91bnQgPSB0b3RhbEFtb3VudFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY291bnREb3duID4gMCAmJiB0aGlzLmJvb2xyZXFEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9vbHJlcURhdGEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDorrDlvZVcclxuICAgIGFkZEl0ZW0oZGF0YSkge1xyXG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FzaFJlY29yZC5jaGlsZHJlbkNvdW50ID49IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXNoUmVjb3JkLmNoaWxkcmVuWzBdLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5jYXNoUmVjb3JkLmNoaWxkcmVuWzBdLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNhc2hJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXNoSXRlbSk7XHJcbiAgICAgICAgY2FzaEl0ZW0ucGFyZW50ID0gdGhpcy5jYXNoUmVjb3JkO1xyXG4gICAgICAgIGNhc2hJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aW1lU3RhbXAgPSBuZXcgRGF0ZShkYXRhLnVwZGF0ZVRpbWUgKiAxMDAwKTtcclxuICAgICAgICBsZXQgc3RyVGltZSA9IGAke3RpbWVTdGFtcC5nZXRNb250aCgpICsgMSA+PSAxMCA/IHRpbWVTdGFtcC5nZXRNb250aCgpICsgMSA6IFwiMFwiICsgKHRpbWVTdGFtcC5nZXRNb250aCgpICsgMSl9L2BcclxuICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXREYXRlKCkgPj0gMTAgPyB0aW1lU3RhbXAuZ2V0RGF0ZSgpIDogJzAnICsgdGltZVN0YW1wLmdldERhdGUoKX1gXHJcbiAgICAgICAgc3RyVGltZSArPSBgICR7dGltZVN0YW1wLmdldEhvdXJzKCkgPj0gMTAgPyB0aW1lU3RhbXAuZ2V0SG91cnMoKSA6IFwiMFwiICsgdGltZVN0YW1wLmdldEhvdXJzKCl9OmBcclxuICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRNaW51dGVzKCkgPj0gMTAgPyB0aW1lU3RhbXAuZ2V0TWludXRlcygpIDogXCIwXCIgKyB0aW1lU3RhbXAuZ2V0TWludXRlcygpfWBcclxuICAgICAgICBsZXQgbG9naWNJZCA9IGRhdGEubG9naWNJZCwgY2FzaEFtb3VudCA9IGRhdGEuY2FzaEFtb3VudDtcclxuICAgICAgICBjYXNoSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5vdGljZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9XHJcbiAgICAgICAgICAgIGAke3N0clRpbWV9IC0g5oGt6LS6PGNvbG9yPSM3ZGUyZmY+JHtsb2dpY0lkfTwvYz48c2l6ZT0yNj7miJDlip/mj5DnjrA8Y29sb3I9I2Y0YzQwND4ke3RoaXMuZ2V0RmxvYXQoY2FzaEFtb3VudCl95YWD44CCPC9jPjwvc2l6ZT5gXHJcblxyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcywgdGhpcy5jYXNoUmVjb3JkLCAwLjAyLCB0cnVlKTtcclxuICAgIH0sXHJcbiAgICByZXFEcmF3Q29pbigpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxV2l0aGRyYXdDb2luXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVuaXQgPSBkYXRhLnVuaXQ7IC8vIOWPlueOsOWAjeaVsFxyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGUgIC8vIDEuIOWbuuWumuaJi+e7rei0uSAyIOaMieavlOS+i+aUtui0uVxyXG4gICAgICAgICAgICB0aGlzLmZlZSA9IGRhdGEuZmVlICAvL+aJi+e7rei0uemHkemineaIluavlOS+i1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gZGF0YS53aXRoZHJhd19kZXBvc2l0X3N0YXJ0IC8vIOWNleasoeaPkOeOsOmZkOmineWMuumXtOiuvuWumuWInVxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IGRhdGEud2l0aGRyYXdfZGVwb3NpdF9lbmQgLy/nur/kuIrmlK/ku5jpmZDpop3ljLrpl7Torr7lrprmnKtcclxuICAgICAgICAgICAgdGhpcy5pc05vVXBwZXJMaW1pdCA9IGRhdGEuaXNOb1VwcGVyTGltaXQgLy8g5piv5ZCm5Li65peg5LiK6ZmQIDHku6Pooajml6DkuIrpmZDvvIww5Luj6KGo5pyJ5LiK6ZmQ5YC8XHJcbiAgICAgICAgICAgIHRoaXMuY29pbiA9IGRhdGEuY29pbiAvL+WPr+aPkOeOsOmHkeminVxyXG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBkYXRhLm1vZGUgLy8gYmFuayAgYWxpcGF5ICAg5piv5ZCm5YWB6K645pSv5LuY5a6d5oiW6ICF6ZO26KGM5o+Q546wXHJcbiAgICAgICAgICAgIHRoaXMuY2FzaFB3ZE1vZGUgPSBkYXRhLmNhc2hQd2RNb2RlIC8v5Y+W546w5a+G56CB5om+5Zue6YWN572u77yMMeS4uumAmui/h+aJi+acuumqjOivgeeggSAyIOiBlOezu+WuouacjVxyXG4gICAgICAgICAgICB0aGlzLnVuc2F0aXNmaWVkQ29pbiA9IGRhdGEudW5zYXRpc2ZpZWRDb2luOy8v6L+Y5pyJ5aSa5bCR6YeR5biB5ruh6Laz5omT56CB6YeP6KaB5rGCXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFeHRyYWN0UnVsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRWaWV3RGF0YSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVxV2l0aGRyYXdDb25maWcoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcVdpdGhkcmF3Q29uZmlnXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSA9IGRhdGEucGhvbmU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUeXBlID0gZGF0YS5waG9uZV9jaGVjaztcclxuICAgICAgICAgICAgdGhpcy5kcmF3UHdkU3RhdGUgPSBkYXRhLmNhc2hfcGFzc3dvcmQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxV2l0aGRyYXcoTnVtYmVyKHRoaXMuZWRiTnVtQmFuay5zdHJpbmcpLCB0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrVHlwZSA9PSAyICYmIHRoaXMuZHJhd1B3ZFN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NldERyYXdQYXNzd29yZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tUeXBlID09IDEgJiYgIXRoaXMuY2hlY2tQaG9uZSh0aGlzLnBob25lQ29kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NldFBob25lQ29kZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tUeXBlID09IDIgJiYgdGhpcy5kcmF3UHdkU3RhdGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrVHlwZSA9PSAxICYmIHRoaXMuY2hlY2tQaG9uZSh0aGlzLnBob25lQ29kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bob25lQ29kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tQaG9uZShwaG9uZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGhvbmUgPT0gXCJzdGluZ1wiICYmIHBob25lID09IFwiXCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcGhvbmUgPT0gXCJudW1iZXJcIiAmJiBwaG9uZSA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZWxzZSBpZiAocGhvbmUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93U2V0RHJhd1Bhc3N3b3JkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJzZXRFeHRyYWN0cGFzc1wiKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBwcmVmYWIuZ2V0Q29tcG9uZW50KFwic2V0RXh0cmFjdHBhc3NcIik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5zZXRUaXBzKHRoaXMuY2FzaFB3ZE1vZGUpO1xyXG4gICAgICAgICAgICBzY3JpcHQuc2V0KFwidHlwZVwiLCB0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgc2NyaXB0LnNldChcImNvaW5cIiwgdGhpcy5lZGJOdW1CYW5rLnN0cmluZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIHNob3dTZXRQaG9uZUNvZGUoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImJpbmRQaG9uZVwiKTsgICAgICAgLy/nu5HlrppcclxuICAgIH0sXHJcbiAgICBzaG93UGFzc3dvcmQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImV4dHJhY3RwYXNzXCIpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgcHJlZmFiLmdldENvbXBvbmVudChcImV4dHJhY3RwYXNzXCIpLmluaXRWaWV3KHRoaXMuaW5kZXgsIHRoaXMuZWRiTnVtQmFuay5zdHJpbmcsIHRoaXMuY2FzaFB3ZE1vZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBzaG93UGhvbmVDb2RlKCkge1xyXG4gICAgICAgIGxldCBwaG9uZSA9IGdsR2FtZS51c2VyLmdldChcInBob25lXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKCFwaG9uZSB8fCBwaG9uZSA9PSBcIlwiIHx8IHBob25lID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJiaW5kUGhvbmVcIik7ICAgICAgIC8v57uR5a6aXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleHRyYWN0VmVyaWZpY2FcIikudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gcHJlZmFiLmdldENvbXBvbmVudChcImV4dHJhY3RWZXJpZmljYVwiKTtcclxuICAgICAgICAgICAgc2NyaXB0LmluaXREYXRhKGdsR2FtZS51c2VyLmdldChcInBob25lXCIpLCB0aGlzLmVkYk51bUJhbmsuc3RyaW5nKVxyXG4gICAgICAgICAgICBzY3JpcHQuc2V0KFwidHlwZVwiLCB0aGlzLmluZGV4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6K6+572u5omL57ut6LS55o+Q56S6XHJcbiAgICBzZXRFeHRyYWN0UnVsZSgpIHtcclxuICAgICAgICB0aGlzLmxhYl9leHRyYWN0UnVsZS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIC8v5YWN5omL57ut6LS5XHJcbiAgICAgICAgbGV0IGNvbnRlbnQxID0gdGhpcy51bml0IDw9IDEgPyBcIuWFjeaJi+e7rei0uVwiIDogYOWPquaUr+aMgSR7dGhpcy5nZXRGbG9hdCh0aGlzLnVuaXQpfeeahOWAjeaVsCzlhY3miYvnu63otLlgO1xyXG4gICAgICAgIC8v5pS25omL57ut6LS5XHJcbiAgICAgICAgbGV0IHN0cjtcclxuICAgICAgICBzdHIgPSB0aGlzLnR5cGUgPT0gMSA/IGAke3RoaXMuZ2V0RmxvYXQodGhpcy5mZWUpfWAgOiBgJHt0aGlzLmdldEZsb2F0KHRoaXMuZmVlKX0lYFxyXG4gICAgICAgIGxldCBjb250ZW50MiA9ICcnXHJcbiAgICAgICAgaWYgKHRoaXMuZmVlID09IDApIHtcclxuICAgICAgICAgICAgY29udGVudDIgPSB0aGlzLnVuaXQgPD0gMSA/IFwiXCIgOiBg5Y+q5pSv5oyBJHt0aGlzLmdldEZsb2F0KHRoaXMudW5pdCl955qE5YCN5pWwYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQyID0gdGhpcy51bml0IDw9IDEgPyBg5pS25Y+WJHtzdHJ95omL57ut6LS5YCA6IGDlj6rmlK/mjIEke3RoaXMuZ2V0RmxvYXQodGhpcy51bml0KX3nmoTlgI3mlbAs5LiU5pS25Y+WJHtzdHJ95omL57ut6LS5YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQyID0gdGhpcy51bml0IDw9IDEgPyBg5pS25Y+WJHtzdHJ95YWD5omL57ut6LS5YCA6IGDlj6rmlK/mjIEke3RoaXMuZ2V0RmxvYXQodGhpcy51bml0KX3nmoTlgI3mlbAs5LiU5pS25Y+WJHtzdHJ95YWD5omL57ut6LS5YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYl9leHRyYWN0UnVsZS5zdHJpbmcgPSB0aGlzLnR5cGUgPT0gMyA/IGNvbnRlbnQxIDogY29udGVudDI7XHJcbiAgICAgICAgaWYgKHRoaXMudW5zYXRpc2ZpZWRDb2luID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJfYXNrLnN0cmluZyA9IGA8Y29sb3I9IzQ4ZDRhOD7mgqjouqvkuIrmiYDmnInph5HluIHpg73lt7Lmu6HotrPmiZPnoIHph4/opoHmsYLvvIzml6Dmj5DnjrDpmZDliLY8L2M+YFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2Fzay5zdHJpbmcgPSBgPGNvbG9yPSNjZWUwZmU+5b2T5YmN6L+Y5pyJPC9jPjxjb2xvcj0jZjQ0ZDRkPiR7dGhpcy5nZXRGbG9hdCh0aGlzLnVuc2F0aXNmaWVkQ29pbil9PC9jPjxjb2xvcj0jY2VlMGZlPumHkeW4geacqua7oei2s+aJk+eggemHj+imgeaxgjwvYz5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aPkOeOsOa4oOmBk+WIneWni+WMllxyXG4gICAgc2hvd01vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5iYW5rQ2FzaC5ub2RlLmFjdGl2ZSA9IHRoaXMubW9kZS5iYW5rID09IDE7XHJcbiAgICAgICAgdGhpcy5hbGlwYXlDYXNoLm5vZGUuYWN0aXZlID0gdGhpcy5tb2RlLmFsaXBheSA9PSAxO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGUuYmFuayAhPSAxICYmIHRoaXMubW9kZS5hbGlwYXkgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gRVhUUkFDVF9UWVBFLkFMSVBBWTtcclxuICAgICAgICAgICAgdGhpcy5hbGlwYXlDYXNoLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUuYmFuayAhPSAxICYmIHRoaXMubW9kZS5hbGlwYXkgIT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENhc2guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBFWFRSQUNUX1RZUEUuTk9ORVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBFWFRSQUNUX1RZUEUuQkFOSztcclxuICAgICAgICAgICAgdGhpcy5iYW5rQ2FzaC5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGVVc2VyRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmV4dHJhY3RCYW5rLmdldENoaWxkQnlOYW1lKFwiYmFua051bWJlclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmV4dHJhY3RCYW5rLmdldENoaWxkQnlOYW1lKFwiYmluZGJhbmtcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5leHRyYWN0QWxpcGF5LmdldENoaWxkQnlOYW1lKFwiYWxpTnVtYmVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdEFsaXBheS5nZXRDaGlsZEJ5TmFtZShcImJpbmRBbGlwYXlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0Vmlld0RhdGEoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIt+aWsOS4u+mhtemdouS/oeaBr1wiKVxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6aG16Z2i55qE5pWw5o2uXHJcbiAgICBpbml0Vmlld0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGJhbmtfY2FyZCA9IGdsR2FtZS51c2VyLmdldChcImJhbmtDYXJkTnVtXCIpLFxyXG4gICAgICAgICAgICBhbGlwYXkgPSBnbEdhbWUudXNlci5nZXQoXCJhbGlwYXlBY2NcIik7XHJcbiAgICAgICAgaWYgKGJhbmtfY2FyZCAmJiBiYW5rX2NhcmQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmV4dHJhY3RCYW5rLmdldENoaWxkQnlOYW1lKFwiYmFua051bWJlclwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdEJhbmsuZ2V0Q2hpbGRCeU5hbWUoXCJiaW5kYmFua1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5leHRyYWN0QmFuay5nZXRDaGlsZEJ5TmFtZShcImJhbmtOdW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBiYW5rX2NhcmQucmVwbGFjZShiYW5rX2NhcmQuc3Vic3RyaW5nKDQsIDEzKSwgXCIqKioqKioqKipcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5leHRyYWN0QmFuay5nZXRDaGlsZEJ5TmFtZShcImJpbmRiYW5rXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5leHRyYWN0QmFuay5nZXRDaGlsZEJ5TmFtZShcImJhbmtOdW1iZXJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFsaXBheSAmJiBhbGlwYXkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmV4dHJhY3RBbGlwYXkuZ2V0Q2hpbGRCeU5hbWUoXCJhbGlOdW1iZXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5leHRyYWN0QWxpcGF5LmdldENoaWxkQnlOYW1lKFwiYmluZEFsaXBheVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5leHRyYWN0QWxpcGF5LmdldENoaWxkQnlOYW1lKFwiYWxpTnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYWxpcGF5LnJlcGxhY2UoYWxpcGF5LnN1YnN0cmluZygzLCA3KSwgXCIqKioqXCIpOztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV4dHJhY3RBbGlwYXkuZ2V0Q2hpbGRCeU5hbWUoXCJiaW5kQWxpcGF5XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdEFsaXBheS5nZXRDaGlsZEJ5TmFtZShcImFsaU51bWJlclwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pbmRleCA9PSBFWFRSQUNUX1RZUEUuQUxJUEFZKSB0aGlzLmV4dHJhY3RBbGlwYXkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmluZGV4ID09IEVYVFJBQ1RfVFlQRS5CQU5LKSB0aGlzLmV4dHJhY3RCYW5rLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuZWRiTnVtTm9kZS5nZXRTZWxmRnVuYygpLnNldFN0cmluZyhcIlwiKTtcclxuXHJcbiAgICAgICAgbGV0IFggPSBNYXRoLm1heCgodGhpcy5zdGFydCkuZGl2KDEwMCksIE51bWJlcih0aGlzLnVuaXQpLmRpdigxMDApKTtcclxuICAgICAgICBsZXQgWiA9IHBhcnNlSW50KE51bWJlcih0aGlzLmNvaW4pLmRpdigxMDApIC8gTnVtYmVyKHRoaXMudW5pdCkuZGl2KDEwMCkpICogTnVtYmVyKHRoaXMudW5pdCkuZGl2KDEwMClcclxuICAgICAgICBsZXQgWSA9IG51bGw7XHJcbiAgICAgICAgaWYgKFopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb1VwcGVyTGltaXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFZhbHVlID0gcGFyc2VJbnQoTnVtYmVyKHRoaXMuZW5kKS5kaXYoMTAwKSAvIE51bWJlcih0aGlzLnVuaXQpLmRpdigxMDApKSAqIE51bWJlcih0aGlzLnVuaXQpLmRpdigxMDApXHJcbiAgICAgICAgICAgICAgICBZID0gTWF0aC5taW4oZW5kVmFsdWUsIFopO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgWSA9IFo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBZID0gTnVtYmVyKHRoaXMuY29pbikuZGl2KDEwMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLmNvaW4gPj0gdGhpcy51bml0KSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmNvaW4gPT0gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5lZGJOdW1Ob2RlLmdldFNlbGZGdW5jKCkuc2V0UGxhY2Vob2xkZXIoXCLlvZPliY3ml6Dms5Xmj5DnjrBcIik7XHJcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBsZXQgc3RhcnQgPSB0aGlzLnVuaXQgPiB0aGlzLnN0YXJ0ID8gdGhpcy51bml0IDogdGhpcy5zdGFydDtcclxuICAgICAgICAvLyAgICAgICAgIC8vIC8vIGxldCBlbmQgPSB0aGlzLmNvaW4gPD0gdGhpcy5lbmQgPyBOdW1iZXIodGhpcy5jb2luKS5zdWIodGhpcy5jb2luICUgdGhpcy51bml0KSA6IE51bWJlcih0aGlzLmVuZCkuc3ViKHRoaXMuZW5kICUgdGhpcy51bml0KTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGxldCBlbmQgPSB0aGlzLmVuZDtcclxuICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMuZWRiTnVtTm9kZS5nZXRTZWxmRnVuYygpLnNldFBsYWNlaG9sZGVyKGAke3RoaXMuZ2V0RmxvYXQoc3RhcnQpfX4ke3RoaXMuZ2V0RmxvYXQoZW5kKX1gKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmVkYk51bU5vZGUuZ2V0U2VsZkZ1bmMoKS5zZXRQbGFjZWhvbGRlcihgJHtYfX4ke1l9YCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmVkYk51bU5vZGUuZ2V0U2VsZkZ1bmMoKS5zZXRQbGFjZWhvbGRlcihcIuW9k+WJjeaXoOazleaPkOeOsFwiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKFggPiBZKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRiTnVtTm9kZS5nZXRTZWxmRnVuYygpLnNldFBsYWNlaG9sZGVyKFwi5Y+v5o+Q546w6YeR6aKd5LiN6Laz77yM5peg5rOV5o+Q546wXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvaW4gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZGJOdW1Ob2RlLmdldFNlbGZGdW5jKCkuc2V0UGxhY2Vob2xkZXIoXCLlj6/mj5DnjrDph5Hpop3kuI3otrPvvIzml6Dms5Xmj5DnjrBcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkYk51bU5vZGUuZ2V0U2VsZkZ1bmMoKS5zZXRQbGFjZWhvbGRlcihgJHtYfX4ke1l9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiX2Nhc2hDb2luLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5jb2luKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLnJlbW92ZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFsaXBheUNhc2hcIjogdGhpcy5jbGlja19hbGlwYXlDYXNoKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYmFua0Nhc2hcIjogdGhpcy5jbGlja19iYW5rQ2FzaCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl93YXRlclJ1bGVcIjogdGhpcy5jbGlja193YXRlclJ1bGUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZXh0cmFjdE1nclwiOiB0aGlzLmNsaWNrX2V4dHJhY3RNZ3IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZXh0cmFjdFJlY29yZFwiOiB0aGlzLmNsaWNrX2V4dHJhY3RSZWNvcmQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYmluZGJhbmtcIjogdGhpcy5jbGlja19iaW5kYmFuaygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9iaW5kYWxpcGF5XCI6IHRoaXMuY2xpY2tfYmluZGFsaXBheSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zdXJlXCI6IHRoaXMuc3VyZUV4dHJhY3QoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZXh0cmFjdFJlY29yZFwiOiB0aGlzLmV4dHJhY3RSZWNvcmQoKTsgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WPlueOsOiusOW9lVxyXG4gICAgZXh0cmFjdFJlY29yZCgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/mlK/ku5jlrp3mj5DnjrBcclxuICAgIHJlcWV4dHJhY3RBbGlwYXkoKSB7XHJcbiAgICAgICAgbGV0IGFtb3VudCA9IHRoaXMuZXh0cmFjdEFsaXBheS5nZXRDaGlsZEJ5TmFtZShcImV4dHJhY3ROdW1cIikuZ2V0Q2hpbGRCeU5hbWUoXCJFZGl0Qm94XCIpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImV4dHJhY3RwYXNzXCIpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgcHJlZmFiLmdldENvbXBvbmVudChcImV4dHJhY3RwYXNzXCIpLnNldChcImFtb3VudFwiLCBhbW91bnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v56Gu6K6k5o+Q546wXHJcbiAgICBzdXJlRXh0cmFjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNvbmZpcm1EcmF3IGNvbmZpcm1EcmF3IGNvbmZpcm1EcmF3XCIpXHJcbiAgICAgICAgaWYgKHRoaXMuY29pbiA9PSAwICYmIGdsR2FtZS51c2VyLmdldChcImNvaW5cIikgIT0gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblvIDlkK/nqL3moLjvvIznm67liY3lhYjov5nkuYjliKTmlq1cclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRVhDSEFOR0UuTE9DSyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlZGJTdHIgPSB0aGlzLmVkYk51bUJhbmsuc3RyaW5nO1xyXG4gICAgICAgIC8vIGlmIChlZGJTdHIuaW5kZXhPZihcIi5cIikgPiAwICYmIGVkYlN0ci5sZW5ndGggLSBlZGJTdHIuaW5kZXhPZihcIi5cIikgPiAyKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZWRiTnVtTm9kZS5nZXRTZWxmRnVuYygpLnNldFN0cmluZyhlZGJTdHIuc3Vic3RyKDAsIGVkYlN0ci5pbmRleE9mKFwiLlwiKSszKSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoZWRiU3RyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVYQ0hBTkdFLkVNUFRZX0lOUFVUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChOdW1iZXIoZWRiU3RyKSA8IHRoaXMuZ2V0RmxvYXQoTnVtYmVyKHRoaXMuc3RhcnQpKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6L6T5YWl6YeR6aKd5LiO5pyA5L2O6YeR6aKdJywgTnVtYmVyKGVkYlN0ciksIE51bWJlcih0aGlzLnN0YXJ0KSlcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRVhDSEFOR0UuT1VUX09GX1JBTkdFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNOb1VwcGVyTGltaXQgPT0gMCAmJiBOdW1iZXIoZWRiU3RyKSA+IHRoaXMuZ2V0RmxvYXQoTnVtYmVyKHRoaXMuZW5kKSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i+k+WFpemHkemineS4juacgOWkp+mHkeminScsIE51bWJlcihlZGJTdHIpLCBOdW1iZXIodGhpcy5lbmQpKVxyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FWENIQU5HRS5PVVRfT0ZfUkFOR0UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImNvbmZpcm1EcmF3IGNvbmZpcm1EcmF3IGNvbmZpcm1EcmF3MVwiKVxyXG4gICAgICAgIGlmICghL15cXGQrKFxcLlxcZHswLDJ9KT8kLy50ZXN0KHRoaXMuZWRiTnVtQmFuay5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVYQ0hBTkdFLk5PTlVNQkVSKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25maXJtRHJhdyBjb25maXJtRHJhdyBjb25maXJtRHJhdzJcIiwgdGhpcy5lZGJOdW1CYW5rLnN0cmluZylcclxuICAgICAgICBsZXQgYW1vdW50ID0gTnVtYmVyKHRoaXMuZWRiTnVtQmFuay5zdHJpbmcpO1xyXG4gICAgICAgIGlmICghYW1vdW50IHx8IGFtb3VudCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRVhDSEFOR0UuRVhDTElUVExFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25maXJtRHJhdyBjb25maXJtRHJhdyBjb25maXJtRHJhdzNcIilcclxuICAgICAgICBsZXQgbnVtID0gYW1vdW50IC8gdGhpcy5nZXRGbG9hdCh0aGlzLnVuaXQpOy8vIOWIpOaWremihuWPluWAjeaVsFxyXG4gICAgICAgIGlmIChudW0udG9TdHJpbmcoKS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVYQ0hBTkdFLk1VU1RfSU5URUdFUi5mb3JtYXQodGhpcy5nZXRGbG9hdCh0aGlzLnVuaXQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uZmlybURyYXcgY29uZmlybURyYXcgY29uZmlybURyYXc0XCIpXHJcbiAgICAgICAgbGV0IHVzZXJDb2luID0gdGhpcy5jb2luO1xyXG4gICAgICAgIGlmICh1c2VyQ29pbiAtIGFtb3VudCA8IHRoaXMuZ2V0RmxvYXQodGhpcy51bml0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FWENIQU5HRS5NSU5HT0xELmZvcm1hdCh0aGlzLmdldEZsb2F0KHRoaXMudW5pdCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25maXJtRHJhdyBjb25maXJtRHJhdyBjb25maXJtRHJhdzVcIilcclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZHJhd3R5cGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzTm9VcHBlckxpbWl0ID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMuY29pbiA8PSB0aGlzLmVuZCA/IE51bWJlcih0aGlzLmNvaW4pLnN1Yih0aGlzLmNvaW4gJSB0aGlzLnVuaXQpIDogdGhpcy5lbmQ7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnQgPiB0aGlzLmdldEZsb2F0KGVuZCkpIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd1RpcChnbEdhbWUudGlwcy5FWENIQU5HRS5PVVRfT0ZfTElNSVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiAoaXNTaG93TmV4dCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhY2NvdW50U3RyID0gdGhpcy5pbmRleCA9PSAxID8gZ2xHYW1lLnVzZXIuZ2V0KFwiYWxpcGF5QWNjXCIpIDogZ2xHYW1lLnVzZXIuZ2V0KFwiYmFua0NhcmROdW1cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLotKblj7fotKblj7fotKblj7dcIiwgYWNjb3VudFN0cik7XHJcbiAgICAgICAgaWYgKCFhY2NvdW50U3RyKSB7XHJcbiAgICAgICAgICAgIGxldCB0aXBzdHIgPSB0aGlzLmluZGV4ID09IDEgPyBnbEdhbWUudGlwcy5FWENIQU5HRS5CSU5EX1pGQiA6IGdsR2FtZS50aXBzLkVYQ0hBTkdFLkJJTkRfQkFOSztcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAodGlwc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFtb3VudCA+IGdsR2FtZS51c2VyLmdldChcImNvaW5cIikpIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd1RpcChnbEdhbWUudGlwcy5FWENIQU5HRS5NT05FWV9OT1RfRU5PVUdIKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMucmVxV2l0aGRyYXdDb25maWcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/moYzpnaLmlbDmja7nmoTmmL7npLpcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIC8v5o+Q546w5Zyo5pSv5LuY5a6dXHJcbiAgICBjbGlja19hbGlwYXlDYXNoKCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBFWFRSQUNUX1RZUEUuQUxJUEFZO1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdEFsaXBheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdEJhbmsuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/mj5DnjrDliLDpk7booYxcclxuICAgIGNsaWNrX2JhbmtDYXNoKCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBFWFRSQUNUX1RZUEUuQkFOSztcclxuICAgICAgICB0aGlzLmV4dHJhY3RBbGlwYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5leHRyYWN0QmFuay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v5o+Q546w566h55CGXHJcbiAgICBjbGlja19leHRyYWN0TWdyKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleHRyYWN0TWdyXCIpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgcHJlZmFiLmdldENvbXBvbmVudChcImV4dHJhY3RNZ3JcIikuaW5pdFZpZXdEYXRhKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+aJk+eggemHj+imgeaxglxyXG4gICAgY2xpY2tfd2F0ZXJSdWxlKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJiYWNrV2F0ZXJSdWxlXCIpO1xyXG4gICAgfSxcclxuICAgIC8v5o+Q546w6K6w5b2VXHJcbiAgICBjbGlja19leHRyYWN0UmVjb3JkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleGNoYW5nZXJlY29yZFwiKTtcclxuICAgIH0sXHJcbiAgICAvL+e7keWumumTtuihjOWNoVxyXG4gICAgY2xpY2tfYmluZGJhbmsoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImV4dHJhY3RNZ3JcIikudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBwcmVmYWIuZ2V0Q29tcG9uZW50KFwiZXh0cmFjdE1nclwiKS5pbml0Vmlld0RhdGEoMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/nu5HlrprmlK/ku5jlrp1cclxuICAgIGNsaWNrX2JpbmRhbGlwYXkoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImV4dHJhY3RNZ3JcIikudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBwcmVmYWIuZ2V0Q29tcG9uZW50KFwiZXh0cmFjdE1nclwiKS5pbml0Vmlld0RhdGEoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
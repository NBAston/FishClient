"use strict";
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
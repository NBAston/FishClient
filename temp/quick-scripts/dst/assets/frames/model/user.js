
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/user.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '781070sU5NDwa1J55krJg9a', 'user');
// frames/model/user.js

"use strict";

/**
 * 玩家模型
 * @constructor
 */
var User = function User() {
  this.resetData();
  this.registerEvent();
},
    user = User.prototype,
    g_instance = null;

var DRAW_TYPE = {
  //取现类型
  BANK: 1,
  ALIPAY: 2
};
/**
 * 重置玩家属性
 */

user.resetData = function () {
  this.edit_username = null; //1.可以修改账号

  this.qq = null; //qq

  this.wechat = null; //微信

  this.email = null; //邮箱

  this.phone = null; //手机

  this.brithday = null; //生日

  this.name = null; //姓名

  this.birthday_month = null;
  this.userName = null; // 玩家昵称

  this.userID = null; // 玩家ID

  this.coin = 0; // 金币

  this.vip_name = 0; //玩家的vip等级

  this.bank_coin = null; // 金库里的金币

  this.guarantee_income = null; // 保底收益

  this.real_income = null; // 实际收益

  this.recessive_coin = null; // 隐性财富

  this.accType = null; // 账号类型

  this.alipayAcc = null; // 支付宝账号

  this.alipayName = null; // 支付宝名字

  this.bankCardNum = null; // 银行卡号

  this.bankCardName = null; // 银行名字

  this.bankCardType = null; // 银行类型

  this.headURL = null; // 头像地址

  this.headList = {}; // 玩家头像列表

  this.pay_password = null; // 银行密码

  this.allEmailMsg = {}; // 玩家邮件

  this.EmailData = {}; // 邮件状态

  this.mailInfoDict = {}; // 已经获取的邮件详情

  this.verifiState = false; // 验证码获取状态

  this.userGameRecord = {}; // 玩家游戏记录

  this.dialPrizeList = []; // 抽奖的奖项

  this.dialHorseData = []; // 抽奖跑马灯数据

  this.myDialResult = null; // 抽奖结果

  this.dialTopPrize = []; // 大奖记录

  this.dialScore = null; // 抽奖积分

  this.scoreBet = null; // 抽奖积分下注兑换比例

  this.betDialScore = null; // 明日抽奖积分

  this.myDialRecord = null; // 玩家个人抽奖记录

  this.userPumpRecord = {}; // 玩家返水记录

  this.userPumpMoney = {}; // 玩家返水等待发放时间和返水金额

  this.userSignin = {}; // 获取玩家是否签到数据

  this.userRecharge = {}; // 获取玩家是否首冲

  this.url = null; // 获取远程的配置链接

  this.tips = false; //进入大厅是否弹出注册弹窗

  this.signinSwitch = 0; //签到的开关

  this.rebateSwitch = 0; //返水的开关

  this.missionSwitch = 0; //任务的开关

  this.dialSwitch = 0; //幸运夺宝的开关

  this.plazaShowPanel = []; //大厅弹窗数据

  this.gameException = false; // PHP及时通知状态   账号异常

  this.KickOutGame = false; //PHP及时通知状态   封停 、踢下线
  //验证码倒计时

  this.retrieveVerifiCD = 60; //注册验证码倒计时

  this.phoneLoginVerifiCD = 60; //手机登录验证码倒计时

  this.phoneRegistVerifiCD = 60; //注册界面手机验证码倒计时

  this.bindPhoneVerifiCD = 60; //绑定手机验证码倒计时

  this.untiedVerifiCD = 60; //解绑手机验证码倒计时

  this.curContinue = []; // 当前的自动

  this.registerGetCoin = 0; //注册礼金

  this.registerGetDiamond = 0; //注册钻石

  this.thirdCoinLimit = 0; //第三方准入金额
};
/**
 * 注册事件监听
 * 数据模型的事件无需销毁
 * 理论上重启游戏后就不存在了
 */


user.registerEvent = function () {
  glGame.emitter.on("loginSuccess", this.loginSuccess, this);
  glGame.emitter.on(MESSAGE.USER.PHONE_VERIFICATION, this.clearAllPhoneInterval, this);
  glGame.emitter.on(MESSAGE.LOGIN.TOURIST_SUCCESS, this.loginTouristSuccess, this);
  glGame.emitter.on(MESSAGE.LOGIN.ACCOUNT_SUCCESS, this.loginAccountSuccess, this);
  glGame.emitter.on("onPhpMessage", this.onPhpMessage, this);
};

user.loginTouristSuccess = function (data) {
  // this.reqUrl();
  // this.reqTouristMyInfo();
  // this.reqReqCheckOrder();
  this.touristMyInfoData(data);
};

user.loginAccountSuccess = function (data) {
  // this.reqUrl();
  // this.reqAccountMyInfo(data);
  this.playerLoginData(data);
};
/**
 * Php通过pomelo向客户端推送消息
 * type
 * 1:刷新红点 2：新跑马 3:新公告
 * 4：封停账号 5：禁止游戏 6：禁止取现 7：踢出游戏 8:禁止领取返水 9：禁止积分夺宝
 * 10：禁止充值 11：禁止领取优惠活动 12：禁止领取推广奖励   13：禁止领取签到奖励
 * 16:解除封停游戏 17：解除禁止游戏 18：解除禁止取现,19:刷新myinfo(刷新禁止),20刷新HomeView 21:vip变化刷新相关信息
 * 22:刷新余额宝红点
 * 7：踢出游戏 直接让他重登
 */


user.onPhpMessage = function (msg) {
  switch (msg.type) {
    case 1:
      this.ReqRedDot(); //刷新红点状态

      break;

    case 2:
      if (cc.director.getScene().name == "plaza") glGame.notice.reqGetHorseRaceLamp(); //获取跑马数据

      break;

    case 3:
      glGame.emitter.emit("newrotice"); //在紧急公告脚本监听

      break;

    case 4:
    case 7:
      if (cc.director.getScene().name == "plaza" || cc.director.getScene().name == "login") {
        this.KickOutGame = false;
        glGame.logon.offWebView();
        glGame.panel.showMsgBox("", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
          glGame.logon.reLogon();
        });
        break;
      } else {
        this.KickOutGame = true;
      }

      break;

    case 5:
      // if (cc.director.getScene().name == "plaza" || cc.director.getScene().name == "login") {
      //     this.limitGame = false;
      // } else {
      //     this.limitGame = true;
      // }
      glGame.logon.offWebView();
      this.ReqRedDot();
      this.ReqDoubtfulMemberInfo();
      break;

    case 6:
      this.is_withdraw = 2;
      break;

    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      this.ReqRedDot();
      this.ReqDoubtfulMemberInfo();
      break;

    case 16:
    case 17:
      this.ReqRedDot();
      this.ReqDoubtfulMemberInfo();
      this.limitGame = false;
      this.KickOutGame = false;
      this.gameException = false;
      break;

    case 18:
      this.is_withdraw = 1;
      this.ReqRedDot();
      this.ReqDoubtfulMemberInfo();
      break;

    case 19:
      this.reqMyInfo(); //刷新玩家所有可禁止的选项

      break;

    case 20:
      this.reqHomeView();
      break;

    case 21:
      this.reqHomeView();
      this.reqMyInfo();
      break;

    case 22:
      this.redDotData.payingReq = 1;
      glGame.emitter.emit("ReqRedDot", this.redDotData);
      break;

    case 23:
      this.redDotData.playerRebatReq = 1;
      glGame.emitter.emit("ReqRedDot", this.redDotData);
      break;

    case 24:
      this.redDotData.missionReq = 1;
      glGame.emitter.emit("ReqRedDot", this.redDotData);
      break;

    default:
      console.log("未定义类型......", msg.type);
      break;
  }
};

user.reqHomeView = function (msg) {
  var _this = this;

  glGame.gameNet.send_msg("http.reqHomeView", {}, function (route, msg) {
    _this.signinSwitch = msg.signin;
    _this.rebateSwitch = msg.rebate;
    _this.missionSwitch = msg.missionSwitch;
    _this.dialSwitch = msg.dial;
    _this.sign_state = msg.sign_state;
    _this.loginSwitch = msg.loginSwitch;
    glGame.emitter.emit("updatePlazaSwitch");
  });
};
/**
 * 获取商城数据
 */


user.reqPayGoodsList = function () {
  var _this2 = this;

  glGame.gameNet.send_msg('http.ReqPayGoodsList', null, function (route, msg) {
    _this2.ShopData = _this2.sortShopData(msg.result);
    glGame.emitter.emit("showShopUI");
  });
};

user.sortShopData = function (shopData) {
  var shopDataArr = [];

  for (var key in shopData) {
    if (shopData[key].sub_type == 99) {
      shopDataArr.unshift(shopData[key]);
    } else {
      shopDataArr.push(shopData[key]);
    }
  }

  return shopDataArr;
};
/**
* 获取URL
* help 客服帮助文档地址
* recharge h5版充值页面
* pay_jump 充值打开应用页面
* dowmload_jump 下载地址
*/


user.reqUrl = function () {
  var _this3 = this;

  if (this.url) glGame.emitter.emit("userurldata");else {
    glGame.gameNet.send_msg('http.reqUrl', {}, function (route, data) {
      _this3.url = data; // console.log("这是requrl的数据",JSON.stringify(data,null,2))

      glGame.emitter.emit("userurldata");
    });
  }
};

user.reqDownLoadJump = function () {
  var _this4 = this;

  if (this.url) glGame.emitter.emit(MESSAGE.DOWNLOAD.OPEN_PATH);else {
    glGame.gameNet.send_msg('http.reqUrl', {}, function (route, data) {
      _this4.url = data;
      glGame.emitter.emit(MESSAGE.DOWNLOAD.OPEN_PATH);
    });
  }
};

user.setUrl = function (data) {
  this.url = data;
};
/**
 * 获取第三方游戏地址组装
 * @param {number or string} gameid //第三方游戏id
 */


user.getWebGameUrl = function (gameid) {
  //（临时使用平台字段，后续还是使用捆绑新增字段）
  var gameweburl = "".concat(this.url.platSvrHost).concat(this.url.platSvrPort ? ":" + this.url.platSvrPort : "", "/index/into?g=").concat(gameid);
  return gameweburl;
};
/**
 * 获取第三方h5游戏组装
 * @param {number or string} url //服务器返回的url
 */


user.getWebGameUrlH5 = function (url) {
  //（临时使用平台字段，后续还是使用捆绑新增字段）
  var gameweburl = "".concat(glGame.gameNet.getWebHost(), "/index/Intoh5?postUrl=").concat(url);
  return gameweburl;
}; //第三方准入金额


user.getEnterWebGameCoin = function () {
  return this.GoldTemp(this.thirdCoinLimit);
}; //第三方准入金额校验


user.checkEnterWebGame = function () {
  return this.thirdCoinLimit <= this.coin;
};
/**
 * 获取玩家信息
 */


user.reqMyInfo = function () {
  var _this5 = this;

  glGame.gameNet.send_msg('http.reqMyInfo', null, function (route, data) {
    _this5.updateUserData(data);

    glGame.emitter.emit("updateUserData");
  });
}; //获取玩家金币


user.reqGetCoin = function () {
  var _this6 = this;

  glGame.gameNet.send_msg('http.reqGetCoin', null, function (route, data) {
    _this6.coin = Number(data.coin);
    glGame.emitter.emit("updateUserData");
    console.log("这是当前玩家的金币", data);
  });
}; //刷新玩家钻石


user.reqGetDiamond = function () {
  var _this7 = this;

  glGame.gameNet.send_msg('http.ReqGetDiamond', null, function (route, data) {
    _this7.diamond = Number(data.diamond);
    glGame.emitter.emit("updateUserData");
  });
};

user.reqTouristMyInfo = function () {
  var _this8 = this;

  glGame.gameNet.send_msg('http.ReqAccountBase', null, function (route, data) {
    _this8.touristMyInfoData(data);

    glGame.emitter.emit("updateUserData");
  });
};

user.reqAccountMyInfo = function () {
  var _this9 = this;

  glGame.gameNet.send_msg('http.reqAccountMyInfo', null, function (route, data) {
    _this9.playerLoginData(data);

    glGame.emitter.emit("updateUserData");
  });
};
/**
 * 获取可替换头像列表
 */


user.reqGetHeadList = function (sex, number) {
  var _this10 = this;

  var msg = {
    "sex": sex,
    "number": number
  };
  glGame.gameNet.send_msg("http.reqGetHeadList", msg, function (route, data) {
    for (var key in data.result) {
      data.result[key] = "".concat(data.result[key]);
    }

    _this10.headList[sex] = data.result;
    glGame.emitter.emit("upheadlist", sex);
  });
};
/**
 * 获取奖项
 */


user.reqDialPrize = function () {
  var _this11 = this;

  glGame.gameNet.send_msg("http.reqDialPrize", null, function (route, data) {
    _this11.dialPrizeList = data.type;
    glGame.emitter.emit("updateDialPrizeList");
  });
};
/**
 * 获取抽奖结果
 */


user.reqDial = function (type) {
  var _this12 = this;

  this.myDialResult = null;
  glGame.gameNet.send_msg("http.reqDial", {
    type: type
  }, function (route, data) {
    glGame.user.ReqRedDot();
    glGame.user.reqGetCoin();
    _this12.dialScore = data.treasure;
    _this12.myDialResult = data;
    glGame.emitter.emit("getDialResult");
  });
};
/**
 * 获取抽奖跑马灯数据
 */


user.reqDialHorseLantern = function () {
  var _this13 = this;

  this.dialHorseData = [];
  glGame.gameNet.send_msg("http.reqDialHorseLantern", null, function (route, data) {
    _this13.dialHorseData = data.data;
  });
};
/**
 * 获取大奖记录
 */


user.reqDialTopPrizeLog = function (time) {
  var _this14 = this;

  this.dialTopPrize = [];
  glGame.gameNet.send_msg("http.reqDialTopPrizeLog", {
    time: time
  }, function (route, data) {
    _this14.dialTopPrize = data.data;
    glGame.emitter.emit("updateTopPrize");
  });
};

user.reqDialIntegral = function () {
  var _this15 = this;

  glGame.gameNet.send_msg("http.reqDialIntegral", null, function (route, data) {
    _this15.dialScore = data.treasure;
    _this15.betDialScore = data.chip_in;
    _this15.scoreBet = data.score_bet;
    _this15.dialRefreshTime = data.time;
    _this15.dialRefreshType = data.type;
    glGame.emitter.emit("updateDialScore");
  });
};
/**
 * 获取大奖记录
 */


user.reqDialPersonal = function () {
  var _this16 = this;

  this.myDialRecord = null;
  glGame.gameNet.send_msg("http.reqDialPersonal", null, function (route, data) {
    _this16.myDialRecord = data.data;
    glGame.emitter.emit("updateMyRecord");
  });
};
/**
 * 查看玩家是否有新邮件
 */


user.reqUnread = function () {
  var _this17 = this;

  glGame.gameNet.send_msg("http.reqUnread", null, function (route, data) {
    if (data.result === 1) {
      _this17.ReqRedDot();
    }
  });
};
/**
 * 获取广告
 */


user.reqBillboards = function () {
  var _this18 = this;

  glGame.gameNet.send_msg("http.reqBillboards", null, function (route, data) {
    _this18.reqBillboardsData = data;
    glGame.emitter.emit("initBillBoradsUI");
  });
};
/**
 * 请求玩家银行记录
 */


user.reqBankCoinList = function (page, pagesize) {
  var _this19 = this;

  glGame.gameNet.send_msg("http.reqBankCoinList", {
    page: page,
    pagesize: pagesize
  }, function (route, data) {
    _this19.bankrecord = data;
    glGame.emitter.emit("updateBankRecord");
  });
};
/**
 * 获取玩家邮件列表
 */


user.reqMailList = function (page, page_size, type) {
  var _this20 = this;

  var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  glGame.gameNet.send_msg("http.ReqMailList", {
    page: page,
    page_size: page_size,
    type: type,
    time: time
  }, function (route, data) {
    if (!_this20.allEmailMsg[type]) {
      _this20.allEmailMsg[type] = data;
      _this20.EmailData.moneyUnreadCount = data.moneyUnreadCount;
      _this20.EmailData.systemUnreadCount = data.systemUnreadCount;
      glGame.emitter.emit("updateEmail", data);
    } else {
      for (var i in data) {
        if (i == "maillist" || data[i] == null) continue;
        _this20.allEmailMsg[type][i] = data[i];
      }

      if (data.maillist.length != 0) {
        _this20.allEmailMsg[type].maillist = _this20.allEmailMsg[type].maillist.concat(data.maillist);
        glGame.emitter.emit("updateEmail", data);
      }
    }

    ;
  });
}; //删除指定邮件


user.ReqDeleOneMail = function (mailID) {
  glGame.gameNet.send_msg("http.ReqMailDel", {
    id: mailID
  }, function (route, data) {
    glGame.emitter.emit("updateDeleOneMail");
  });
}; //删除全部邮件


user.ReqDeleMail = function (type) {
  glGame.gameNet.send_msg("http.ReqMailAllDel", {
    type: type
  }, function (route, data) {
    glGame.emitter.emit("updateDeleMail");
  });
}; //读取全部邮件


user.ReqAllReadMail = function (type) {
  glGame.gameNet.send_msg("http.ReqMailAlreadyRead", {
    type: type
  }, function (route, data) {
    glGame.emitter.emit("updateReadAllMail");
  });
}; //领取指定邮件附件


user.ReqMailGet = function (mailID) {
  var _this21 = this;

  glGame.gameNet.send_msg("http.ReqMailGet", {
    id: mailID
  }, function (route, data) {
    glGame.emitter.emit("updateGetAttach");

    _this21.reqGetCoin();
  });
}; //领取全部邮件附件


user.ReqMailAllGet = function () {
  var _this22 = this;

  glGame.gameNet.send_msg("http.reqMailAllGet", {}, function (route, data) {
    glGame.emitter.emit("updateGetAllAttach");

    _this22.reqGetCoin();
  });
}; //获取所有邮箱公告信息


user.ReqNotice = function (page, page_size) {
  var _this23 = this;

  glGame.gameNet.send_msg("http.reqNotice", {
    page: page,
    page_size: page_size
  }, function (route, data) {
    _this23.announceMent = data;
    glGame.emitter.emit("updateAnnounceMent");
  });
}; //清理邮件缓存文件


user.clearMail = function (type) {
  type ? this.allEmailMsg[type] = null : this.allEmailMsg = {};
  this.EmailData = {};
};
/**
 * 获取指定ID的邮件信息
 * @param {number} mailID
 * @param {number} type
 */


user.reqMailInfo = function (mailID, type) {
  var _this24 = this;

  if (!this.allEmailMsg[type]) return;
  var emails = this.allEmailMsg[type]["maillist"];

  for (var i = 0; i < emails.length; i++) {
    if (emails[i].id == Number(mailID) && emails[i].mail_content) {
      glGame.emitter.emit("updateEmailContent", emails[i]);
      return;
    }
  }

  glGame.gameNet.send_msg("http.reqMailInfo", {
    id: mailID
  }, function (route, data) {
    for (var _i = 0; _i < emails.length; _i++) {
      if (emails[_i].id == data.id) {
        emails[_i].mail_content = data.mail_content;
        glGame.emitter.emit("updateEmailContent", emails[_i]);
        if (emails[_i].status != 1) emails[_i].status = 1;

        _this24.ReqRedDot();

        return;
      }
    }

    emails.push(data);
    glGame.emitter.emit("updateEmailContent", data);
  });
};
/**
 * 获取客服消息
 */


user.reqCustomServer = function (page, size, bool) {
  var _this25 = this;

  glGame.gameNet.send_msg("http.ReqCustomServer", {
    page: page,
    size: size,
    bool: bool
  }, function (route, msg) {
    //this.customSever = msg;
    _this25.customSever = msg;
    glGame.emitter.emit("updateCustomServer", true);
  }, "v2");
};

user.ReqCustomHelpList = function (page, size) {
  glGame.gameNet.send_msg("http.ReqCustomHelpList", {
    page: page,
    size: size
  }, function (route, msg) {
    glGame.emitter.emit("updateReqCustomHelpList", msg);
  }, "v2");
};

user.ReqCustomServerConfig = function () {
  var _this26 = this;

  glGame.gameNet.send_msg("http.ReqCustomServerConfig", {}, function (route, msg) {
    _this26.CustomServerConfig = msg;
    glGame.emitter.emit("updateCustomServerConfig");
  });
};

user.ReqCustomServerPhone = function () {
  glGame.gameNet.send_msg("http.ReqCustomServerPhone", {}, function (route, msg) {
    glGame.emitter.emit("updateCustomServerPhone", msg.result);
  });
};
/**
* 获取余额宝概览接口
*/


user.reqDiscountCoinBalanceSummary = function () {
  var _this27 = this;

  glGame.gameNet.send_msg("http.ReqDiscountCoinBalanceSummary", {}, function (route, msg) {
    _this27.yubaoOverView = msg;
    glGame.emitter.emit("updateYuBaoServer");
  });
};
/**
 * 获取余额宝申请列表接口
 */


user.reqDiscountCoinBalance = function (page, size) {
  var _this28 = this;

  glGame.gameNet.send_msg('http.reqDiscountCoinBalance', {
    page: page,
    size: size
  }, function (route, msg) {
    _this28.yubaoRecord = msg;
    glGame.emitter.emit("updateYuBaoRecord");
  });
};
/**
 * 获取余额宝申领
 */


user.reqDiscountCoinBalanceApply = function () {
  var _this29 = this;

  glGame.gameNet.send_msg('http.reqDiscountCoinBalanceApply', {}, function (route, msg) {
    _this29.yubaoApply = msg;

    _this29.reqGetCoin();

    glGame.emitter.emit("updateYuBaoApply");
  });
};
/**
 * 金币存入银行
 * @param {number} gold
 */


user.reqBankSave = function (gold) {
  var _this30 = this;

  glGame.gameNet.send_msg("http.reqBankSave", {
    coin: gold
  }, function (route, data) {
    glGame.panel.showTip(glGame.tips.BANK.SAVE.format(_this30.cutFloat(gold)));
    _this30.coin -= gold;
    _this30.bank_coin += gold;
    glGame.emitter.emit("updateUserData");
    glGame.emitter.emit("updateBankSuccess");
  });
};
/**
 * 银行取出金币
 * @param {number} gold
 * @param {string} psw
 */


user.reqBankTakeOut = function (gold, psw) {
  var _this31 = this;

  glGame.gameNet.send_msg("http.reqBankTakeOut", {
    coin: gold,
    pay_password: psw
  }, function (route, data) {
    glGame.panel.showTip(glGame.tips.BANK.TAKE.format(_this31.cutFloat(gold)));
    _this31.coin += gold;
    _this31.bank_coin -= gold;
    glGame.emitter.emit("updateUserData");
    glGame.emitter.emit("updateBankSuccess");
  });
}; //浮点型运算取俩位


user.cutFloat = function (num) {
  return this.getFloat(Number(num).div(100)).toString();
}; //浮点型运算取俩位


user.getFloat = function (value) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  value = Number(value);
  if (isNaN(value)) return;

  if (~~value === value) {
    return value.toString();
  } else {
    return value.toFixed(num);
  }
};
/**
 *  重置用户密码
 * @param msg
 * @param next
 */


user.reqResetPwd = function (msg, next) {
  glGame.gameNet.send_msg("http.reqResetPwd", msg, function (route, data) {
    glGame.panel.showTip(msg.type === 1 ? glGame.tips.USER.PASSWORD.ACC : glGame.tips.USER.PASSWORD.ALP);
    next();
  });
};
/**
 * 更新玩家数据
 */


user.updateUserData = function (data) {
  console.log('reqmyInfo数据', data);
  this.edit_username = data.edit_username;
  this.qq = data.qq;
  this.wechat = data.wechat;
  this.email = data.email;
  this.name = data.name;
  this.birthday_month = data.birthday_month;
  this.grade_id = data.grade_id;
  this.grade_name = data.grade_name;
  this.nickname = data.nickname;
  this.userName = data.username;
  this.userID = data.id;
  this.logicID = data.logicid;
  this.coin = data.coin;
  this.diamond = data.diamond;
  this.bank_coin = data.bank_coin;
  this.guarantee_income = data.guarantee_income;
  this.real_income = data.real_income;
  this.recessive_coin = data.recessive_coin;
  this.accType = data.plat;
  this.phone = data.phone;
  this.alipayAcc = data.alipay;
  this.alipayName = data.alipay_name;
  this.bankCardNum = data.bank_card;
  this.bankCardName = data.bank_name;
  this.bankCardType = data.bank_type;
  this.headURL = data.headurl;
  this.userSex = data.sex;
  this.pay_password = data.pay_password;
  this.daily_win = data.daily_win;
  this.all_win = data.all_win;
  this.vip_name = data.vipLevel;
  this.roomSwitch = data.roomSwitch; //是否存在房间场
  //是否可以会员，以及可以会员操作限制

  this.suspicious = data.suspicious; // 可疑会员 1可疑 2 非可疑

  this.is_receive_register_phone_coin = data.is_receive_register_phone_coin; //是否领取绑定手机的注册彩金 0：否 1： 是

  this.demo_player = data.demo_player;
  this.game = data.game; // 是否可以游戏

  this.point_treasure = data.point_treasure; //积分夺宝

  this.balance = data.balance; //余额宝

  this.mission = data.mission; //任务

  this.receive_discount = data.receive_discount; // 领取优惠活动

  this.receive_promotion_award = data.receive_promotion_award; // 领取推广奖励

  this.receive_rebate = data.receive_rebate; //领取返水

  this.receive_Signin_award = data.receive_Signin_award; // 领取签到奖励

  this.withdraw = data.withdraw; // 提现

  this.recharge = data.recharge; // 充值

  this.is_game = data.is_game; //针对玩家游戏

  this.is_demo_player = data.is_demo_player; // 是否为试玩会员 1是 2 不是

  this.is_withdraw = data.is_withdraw; // 针对玩家取现

  this.thirdCoinLimit = data.thirdCoinLimit; //第三方准入金额

  this.judgeForbidGame();
  glGame.emitter.emit('updatePlazaSwitch');
};

user.judgeForbidGame = function () {
  this.limitGame = false;
  this.KickOutGame = false;
  this.gameException = false; // 6：禁止取现 8:禁止领取返水 9：禁止积分夺宝 10：禁止充值 11：禁止领取优惠活动 12：禁止领取推广奖励   13：禁止领取签到奖励

  if (this.suspicious == 1 && this.game == 2 || this.is_game == 2 || this.demo_player.game == 2 && this.is_demo_player == 1) {
    this.limitGame = true; // this.KickOutGame = true;
  } else {
    this.limitGame = false;
  }
}; // 当前可疑会员


user.DoubtfulMemberData = function (data) {
  this.suspicious = data.suspicious; // 可疑会员 1可疑 2 非可疑
  //以下参数基于可疑会员 1可以 2 禁止

  this.withdraw = data.withdraw; // 提现

  this.recharge = data.recharge; // 充值

  this.game = data.game; // 是否可以游戏

  this.receive_rebate = data.receive_rebate; //领取返水

  this.point_treasure = data.point_treasure; //积分夺宝

  this.receive_discount = data.receive_discount; // 领取优惠活动

  this.balance = data.balance; //余额宝

  this.mission = data.mission; //任务

  this.receive_promotion_award = data.receive_promotion_award; // 领取推广奖励

  this.receive_Signin_award = data.receive_Signin_award; // 领取签到奖励

  this.is_game = data.is_game; //针对玩家游戏

  this.is_withdraw = data.is_withdraw; // 针对玩家取现
  // 新的

  this.register_gold_type = data.registerGoldType; //货币单位  1元  2金币

  this.register_gold = data.registerGiveGold; //注册赠送金币

  this.bind_phone_gold = data.bindPhoneGiveGold; //绑定手机赠送金币

  this.register_diamond = data.registerGiveDiamond; //注册赠送钻石

  this.bind_phone_diamond = data.bindPhoneGiveDiamond; //绑定手机赠送钻石

  this.tips = data.tips;
  this.is_demo_player = data.is_demo_player; // 是否为试玩会员 1是 2 不是

  this.demo_player = data.demo_player; //1可以 2 禁止
}; //正常玩家登录


user.playerLoginData = function (data) {
  console.log('正式玩家数据', data);
  this.alipayAcc = data.alipay;
  this.alipayName = data.alipay_name;
  this.bankCardNum = data.bank_card;
  this.bankCardName = data.bank_name;
  this.bank_coin = data.bank_coin;
  this.bankCardType = data.bank_type;
  this.birthday_month = data.birthday_month;
  this.bindPhoneFirst = data.bind_phone_first;
  this.coin = data.coin;
  this.diamond = data.diamond;
  this.demo_player = data.demo_player; //1可以 2 禁止（试玩会员）

  this.edit_username = data.edit_username;
  this.email = data.email;
  this.game = data.game; // 是否可以游戏

  this.grade_id = data.grade_id;
  this.grade_name = data.grade_name;
  this.headURL = data.headurl;
  this.userID = data.id;
  this.is_demo_player = data.is_demo_player; // 是否为试玩会员 1是 2 不是

  this.is_game = data.is_game; //针对玩家游戏

  this.is_withdraw = data.is_withdraw; // 针对玩家取现

  this.is_receive_register_phone_coin = data.is_receive_register_phone_coin; //是否领取绑定手机的注册彩金 0：否 1： 是

  this.logicID = data.logicid;
  this.name = data.name;
  this.nickname = data.nickname;
  this.phone = data.phone;
  this.point_treasure = data.point_treasure; //积分夺宝

  this.qq = data.qq;
  this.roomSwitch = data.roomSwitch; //是否存在房间场 0关闭 1开启

  this.recharge = data.recharge; // 充值

  this.receive_rebate = data.receive_rebate; //领取返水

  this.receive_discount = data.receive_discount; // 领取优惠活动

  this.balance = data.balance; //余额宝

  this.mission = data.mission; //任务

  this.receive_promotion_award = data.receive_promotion_award; // 领取推广奖励

  this.receive_Signin_award = data.receive_Signin_award; // 领取签到奖励
  // 新的

  this.register_gold_type = data.registerGoldType; //货币单位  1元  2金币

  this.register_gold = data.registerGiveGold; //注册赠送金币

  this.bind_phone_gold = data.bindPhoneGiveGold; //绑定手机赠送金币

  this.register_diamond = data.registerGiveDiamond; //注册赠送钻石

  this.bind_phone_diamond = data.bindPhoneGiveDiamond; //绑定手机赠送钻石

  this.userSex = data.sex;
  this.suspicious = data.suspicious; // 可疑会员 1可疑 2 非可疑

  this.tips = data.tips;
  this.userName = data.username;
  this.vip_name = data.vipLevel;
  this.wechat = data.wechat;
  this.withdraw = data.withdraw; // 提现

  this.redDotData = data.redDot;
  this.userRecharge = data.firstPay;
  this.prohibitBindPhone = data.prohibitBindPhone; // this.redDotData = data.result;
  // this.userRecharge = msg;
  // 
  //homeView

  this.signinSwitch = data.homeView.signin;
  this.rebateSwitch = data.homeView.rebate; // 控制返水按钮是否显示

  this.rebateSwitchEx = data.rebateSwitch; // 控制返水是否禁用

  this.missionSwitch = data.homeView.missionSwitch;
  this.dialSwitch = data.homeView.dial;
  this.sign_state = data.homeView.sign_state;
  this.loginSwitch = data.homeView.loginSwitch; //轮播图

  this.reqBillboardsData = data.billboards; //新分类数据

  this.gameDisplayType = data.gameGroup.type;
  this.gameDisplayToken = data.gameGroup.token;
  this.gameDisplayTypeList = data.gameGroup.typeList;
  this.interFaceMode = data.gameGroup.mode; // 老分类数据

  this.gametypeList = data.gameGroup.game;
  this.webGameUrl = data.gameGroup.url; //gameGameList

  this.gameList = data.gameList; //跑马灯

  glGame.notice.addHorseRaceLamp(data.horseRaceLamp); // 公告

  this.emergentNotice = data.emergentNotice; //第三方准入金额

  this.thirdCoinLimit = data.thirdCoinLimit;
  this.guarantee_income = data.guarantee_income;
  this.real_income = data.real_income;
  this.recessive_coin = data.recessive_coin;
  this.accType = data.plat;
  this.pay_password = data.pay_password;
  this.daily_win = data.daily_win;
  this.all_win = data.all_win;
}; // 游客登录数据


user.touristMyInfoData = function (data) {
  console.log('游客登录数据······', data);
  this.edit_username = 2; //1.可以修改账号

  this.qq = ""; //qq

  this.wechat = ""; //微信

  this.email = ""; //邮箱

  this.phone = ""; //手机

  this.brithday = ""; //生日

  this.bank_coin = 0;
  this.phone = ""; // 充值有关信息

  this.alipayAcc = "";
  this.alipayName = "";
  this.bankCardNum = "";
  this.bankCardName = "";
  this.bankCardType = "";
  this.userSex = 1; //性别

  this.grade_name = '游客';
  this.suspicious = 2; // 可疑会员 1可疑 2 非可疑

  this.vip_name = 0; //  VIP等级
  //以下参数基于可疑会员 1可以 2 禁止

  this.withdraw = 2; // 提现

  this.recharge = 2; // 充值

  this.is_withdraw = 1; // 针对玩家取现

  this.is_receive_register_phone_coin = 0; //是否领取绑定手机的注册彩金 0：否 1： 是

  this.tips = data.tips;
  this.grade_id = data.grade_id;
  this.userName = data.username; // 玩家昵称

  this.coin = data.coin;
  this.diamond = data.diamond;
  this.userID = Number(data.id); // 新的

  this.register_gold_type = data.registerGoldType; //货币单位  1元  2金币

  this.register_gold = data.registerGiveGold; //注册赠送金币

  this.bind_phone_gold = data.bindPhoneGiveGold; //绑定手机赠送金币

  this.register_diamond = data.registerGiveDiamond; //注册赠送钻石

  this.bind_phone_diamond = data.bindPhoneGiveDiamond; //绑定手机赠送钻石

  this.logicID = data.logicid; //游客logicId

  this.nickname = data.nickname; //游客昵称

  this.headURL = data.headurl;
  this.game = data.game; // 是否可以游戏  

  this.receive_rebate = data.receive_rebate; //领取返水

  this.point_treasure = data.point_treasure; //积分夺宝

  this.receive_discount = data.receive_discount; // 领取优惠活动

  this.balance = data.balance; //余额宝

  this.mission = data.mission; //任务

  this.receive_promotion_award = data.receive_promotion_award; // 领取推广奖励

  this.receive_Signin_award = data.receive_Signin_award; // 领取签到奖励

  this.is_game = Number(data.is_game); //针对玩家进入游戏

  this.is_demo_player = Number(data.is_demo_player); // 是否为试玩会员 1是 2 不是

  this.demo_player = {}; //账号是否异常  1可以 2 禁止

  this.bindPhoneFirst = 0;
  this.userRecharge = {}; // 获取玩家是否首冲

  this.userRecharge.exists = 0;
  this.userRecharge.discount = 0;
  this.userRecharge.discount_max = 0;
  this.redDotData = {};
  this.roomSwitch = data.roomSwitch; //是否存在房间场

  this.prohibitBindPhone = data.prohibitBindPhone; //homeView

  this.signinSwitch = data.homeView.signin;
  this.rebateSwitch = data.homeView.rebate;
  this.missionSwitch = data.homeView.missionSwitch;
  this.dialSwitch = data.homeView.dial;
  this.sign_state = data.homeView.sign_state;
  this.loginSwitch = data.homeView.loginSwitch; //轮播图

  this.reqBillboardsData = data.billboards; //新分类数据

  this.gameDisplayType = data.gameGroup.type;
  this.gameDisplayToken = data.gameGroup.token;
  this.gameDisplayTypeList = data.gameGroup.typeList;
  this.interFaceMode = data.gameGroup.mode; // 老分类数据

  this.gametypeList = data.gameGroup.game;
  this.webGameUrl = data.gameGroup.url; //gameGameList

  this.gameList = data.gameList; //跑马灯

  glGame.notice.addHorseRaceLamp(data.horseRaceLamp); // 公告

  this.emergentNotice = data.emergentNotice;
  this.registerGetCoin = 0; //注册礼金

  this.registerGetDiamond = 0; //注册钻石
  //第三方准入金额

  this.thirdCoinLimit = data.thirdCoinLimit; // glGame.emitter.emit("initBillBoradsUI")
  // glGame.emitter.emit("userurldata")
  // glGame.emitter.emit("updatePlazaSwitch")
  // if(this.grade_id != 1){
  //     this.reqAccountMyInfo();
  //     // this.reqMyInfo();
  // }
};

user.resetAward = function () {
  this.registerGetCoin = 0; //注册礼金

  this.registerGetDiamond = 0; //注册钻石
}; //检查手机是否在禁止列表之内


user.checkPhone = function (phoneNumber) {
  var String_number = phoneNumber.toString();

  for (var i = 0; i < this.prohibitBindPhone.length; i++) {
    var draw = false;

    for (var j = 0; j < this.prohibitBindPhone[i].length; j++) {
      if (this.prohibitBindPhone[i][j] != String_number[j]) {
        draw = true;
      }
    }

    if (!draw) {
      return false;
    }
  }

  return true;
};
/**
 * 是否游客
 */


user.isTourist = function () {
  // PHP 说根据 reqMyInfo 协议数据的 username 判断是否了绑定手机
  // 没有绑定手机就是游客
  return this.grade_id == 1;
};
/**
 * 是否绑定支付宝
 */


user.isBindAlipay = function () {
  return this.alipayAcc !== "";
};
/**
 * 是否绑定银行卡
 */


user.isBindBankCard = function () {
  return this.bankCardNum !== "";
};

user.ReqDoubtfulMemberInfo = function () {
  var _this32 = this;

  glGame.gameNet.send_msg('http.ReqDoubtfulMemberInfo', {}, function (route, msg) {
    _this32.DoubtfulMemberData(msg);

    console.log("这是当前可疑会员", msg);
  });
};
/**
 * 推广分享开关
 * @param {Object} msg
 */


user.reqUserExtensionSwitch = function (msg) {
  glGame.gameNet.send_msg('http.ReqUserExtensionSwitch', msg, function (route, msg) {
    glGame.emitter.emit("checkExtensionSwitch", msg["switch"]);
  });
};
/**
 * 绑定支付宝
 * @param {string} alipayID
 * @param {string} alipayName
 */


user.reqBindAlipay = function (alipayID, alipayName) {
  var _this33 = this;

  glGame.gameNet.send_msg('http.reqBindAlipay', {
    alipay: alipayID,
    alipay_name: alipayName
  }, function (route, msg) {
    _this33.ReqGetCashOutBindInfo(DRAW_TYPE.ALIPAY);

    glGame.emitter.emit("bindPaySuccess");
    glGame.panel.showTip(glGame.tips.USER.BIND.ALP);
  });
};
/**
 * 绑定银行卡
 * @param {number} bank_id 银行id
 * @param {string} bank_card 银行卡号
 * @param {string} name 银行卡所有人签名
 */


user.reqBindBank = function (bank_id, bank_card, name) {
  var _this34 = this;

  glGame.gameNet.send_msg('http.reqBindBank', {
    bank_id: bank_id,
    bank_card: bank_card,
    name: name
  }, function (route, msg) {
    _this34.ReqGetCashOutBindInfo(DRAW_TYPE.BANK);

    glGame.emitter.emit("bindPaySuccess");
    glGame.panel.showTip(glGame.tips.USER.BIND.BANK);
  });
}; //获取当前绑定的银行卡以及支付宝信息1.银行卡2.支付宝


user.ReqGetCashOutBindInfo = function (typeId) {
  var _this35 = this;

  glGame.gameNet.send_msg('http.ReqGetCashOutBindInfo', {
    type: typeId
  }, function (route, data) {
    if (typeId == DRAW_TYPE.BANK) {
      _this35.bankCardType = data.bank_type;
      _this35.bankCardNum = data.bank_card;
      _this35.bankCardName = data.bank_name;
      _this35.alipayName = data.bank_name;
      _this35.name = data.bank_name;
    } else if (typeId == DRAW_TYPE.ALIPAY) {
      _this35.alipayAcc = data.alipay;
      _this35.alipayName = data.alipay_name;
      _this35.bankCardName = data.alipay_name;
      _this35.name = data.alipay_name;
    } else {
      console.error("不存在的类型");
    }

    glGame.emitter.emit("updateUserData");
  });
};
/**
 * 玩家提现
 * @param {number} amount 提现数额
 * @param {number} type 提现方式: 2: 银行卡 1: 支付宝
 */


user.reqWithdraw = function (amount, type, pwd) {
  var _this36 = this;

  glGame.gameNet.send_msg('http.reqWithdraw', {
    amount: amount.mul(100),
    type: type,
    code: pwd
  }, function (route, msg) {
    _this36.reqGetCoin();

    glGame.emitter.emit("withdrawSuccess", amount.mul(100));
  });
};
/**
 * 找回密码发送验证码
 * @param {Object} msg  type 8为找回密码
 */


user.ReqPostPhoneCode = function (msg) {
  var _this37 = this;

  if (!this.checkPhone(msg.phone)) {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDFAILED);
  }

  if (!this.postPhoneState) {
    this.postPhoneState = true;
    this.posyPhoneTimeout = this.posyPhoneTimeout || [];
    this.posyPhoneTimeout.push(setTimeout(function () {
      _this37.postPhoneState = false;
    }, 1500));
  } else {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDTOOBUSY);
  }

  if (this.retrievePswState) return;
  this.retrievePswState = true;
  this.retrieveUpdateVerifiCD = setInterval(function () {
    if (_this37.retrieveVerifiCD < 0) {
      clearInterval(_this37.retrieveUpdateVerifiCD);
      _this37.retrieveUpdateVerifiCD = null;
      _this37.retrieveVerifiCD = 60;
      _this37.retrievePswState = false;
    } else {
      glGame.emitter.emit("retrievePswCD", _this37.retrieveVerifiCD);
      _this37.retrieveVerifiCD--;
    }
  }, 1000);
  glGame.gameNet.send_msg('http.ReqPostPhoneCode', msg, function (route, msg) {});
};
/**
 * 清除找回密码定时器
 */


user.clearPostPhoneInterval = function () {
  if (this.retrieveUpdateVerifiCD) {
    clearInterval(this.retrieveUpdateVerifiCD);
    this.retrieveUpdateVerifiCD = null;
    this.retrieveVerifiCD = 60;
    this.retrievePswState = false;
  }
};
/**
 * 手机登录发送验证码
 * @param {Object} msg  type 9 手机登录
 */


user.reqPhoneCode = function (msg) {
  var _this38 = this;

  if (!this.checkPhone(msg.phone)) {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDFAILED);
  }

  if (!this.loginPhoneState) {
    this.loginPhoneState = true;
    this.loginPhoneTimeout = this.loginPhoneTimeout || [];
    this.loginPhoneTimeout.push(setTimeout(function () {
      _this38.loginPhoneState = false;
    }, 1500));
  } else {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDTOOBUSY);
  }

  if (this.phoneCodeState) return;
  this.phoneCodeState = true;
  this.phoneUpdateVerifiCD = setInterval(function () {
    _this38.verifiType = msg.type;

    if (_this38.phoneLoginVerifiCD < 0) {
      clearInterval(_this38.phoneUpdateVerifiCD);
      _this38.phoneUpdateVerifiCD = null;
      _this38.phoneLoginVerifiCD = 60;
      _this38.phoneCodeState = false;
    } else {
      glGame.emitter.emit("phoneCodeCD", _this38.phoneLoginVerifiCD);
      _this38.phoneLoginVerifiCD--;
    }
  }, 1000);
  glGame.gameNet.send_msg('http.ReqPostPhoneCode', msg, function (route, msg) {});
};
/**
 * 注册账号手机发送验证码
 * @param {Object} msg  type 9 手机登录
 */


user.reqRegistPhoneCode = function (msg) {
  var _this39 = this;

  if (!this.checkPhone(msg.phone)) {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDFAILED);
  }

  if (!this.registPhoneState) {
    this.registPhoneState = true;
    this.registPhoneTimeout = this.registPhoneTimeout || [];
    this.registPhoneTimeout.push(setTimeout(function () {
      _this39.registPhoneState = false;
    }, 1500));
  } else {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDTOOBUSY);
  }

  if (this.registCodeState) return;
  this.registCodeState = true;
  this.registUpdateVerifiCD = setInterval(function () {
    _this39.verifiType = msg.type;

    if (_this39.phoneRegistVerifiCD < 0) {
      clearInterval(_this39.registUpdateVerifiCD);
      _this39.registUpdateVerifiCD = null;
      _this39.phoneRegistVerifiCD = 60;
      _this39.registCodeState = false;
    } else {
      glGame.emitter.emit("phoneRegistCodeCD", _this39.phoneRegistVerifiCD);
      _this39.phoneRegistVerifiCD--;
    }
  }, 1000);
  glGame.gameNet.send_msg('http.ReqPostPhoneCode', msg, function (route, msg) {});
};
/**
 * 清除注册发送手机验证码定时器
 */


user.clearRegistPhoneInterval = function () {
  clearInterval(this.registUpdateVerifiCD);
  this.registUpdateVerifiCD = null;
  this.phoneRegistVerifiCD = 60;
  this.registCodeState = false;
};
/**
 * 清除手机登录定时器
 */


user.clearPhoneInterval = function () {
  clearInterval(this.phoneUpdateVerifiCD);
  this.phoneUpdateVerifiCD = null;
  this.phoneLoginVerifiCD = 60;
  this.phoneCodeState = false;
};
/**
 * 绑定手机发送验证码
 * @param {Object} msg  type 1 绑定手机
 */


user.reqBindPhoneCode = function (msg) {
  var _this40 = this;

  if (!this.checkPhone(msg.phone)) {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDFAILED);
  }

  if (!this.bindPhoneState) {
    this.bindPhoneState = true;
    this.bindPhoneTimeout = this.bindPhoneTimeout || [];
    this.bindPhoneTimeout.push(setTimeout(function () {
      _this40.bindPhoneState = false;
    }, 1500));
  } else {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDTOOBUSY);
  }

  if (this.bindPhoneCodeState) return;
  this.bindPhoneCodeState = true;
  this.bindPhoneCD = setInterval(function () {
    if (_this40.bindPhoneVerifiCD < 0) {
      clearInterval(_this40.bindPhoneCD);
      _this40.bindPhoneCD = null;
      _this40.bindPhoneVerifiCD = 60;
      _this40.bindPhoneCodeState = false;
    } else {
      glGame.emitter.emit("bindPhoneCodeCD", _this40.bindPhoneVerifiCD);
      _this40.bindPhoneVerifiCD--;
    }
  }, 1000);
  glGame.gameNet.send_msg('http.ReqPostPhoneCode', msg, function (route, msg) {});
}; //清除绑定手机连续点击定时器


user.clearBindPhoneTime = function () {
  if (!this.bindPhoneTimeout) return;
  var count = this.bindPhoneTimeout.length;

  for (var i = 0; i < count; i++) {
    clearTimeout(this.bindPhoneTimeout[i]);
  }
}; //清除手机登录连续点击定时器


user.clearLoginPhoneTime = function () {
  if (!this.loginPhoneTimeout) return;
  var count = this.loginPhoneTimeout.length;

  for (var i = 0; i < count; i++) {
    clearTimeout(this.loginPhoneTimeout[i]);
  }
}; //清除找回密码连续点击定时器


user.clearPostPhoneTime = function () {
  if (!this.postPhoneState) return;
  var count = this.postPhoneState.length;

  for (var i = 0; i < count; i++) {
    clearTimeout(this.postPhoneState[i]);
  }
}; //清除解绑手机连续点击定时器


user.clearUntiedPhoneTime = function () {
  if (!this.untiedPhoneState) return;
  var count = this.untiedPhoneState.length;

  for (var i = 0; i < count; i++) {
    clearTimeout(this.untiedPhoneState[i]);
  }
};
/**
 * 清除绑定手机定时器
 */


user.clearBindPhoneInterval = function () {
  clearInterval(this.bindPhoneCD);
  this.bindPhoneCD = null;
  this.bindPhoneVerifiCD = 60;
  this.bindPhoneCodeState = false;
};

user.clearAllPhoneInterval = function () {
  this.clearUntiedInterval();
  this.clearBindPhoneInterval();
  this.clearPostPhoneInterval();
  this.clearPhoneInterval();
  this.clearRegistPhoneInterval();
};
/**
 * 解绑手机发送验证码
 * @param {Object} msg  type 10 解绑手机
 */


user.reqUntiedCode = function (msg) {
  var _this41 = this;

  if (!this.checkPhone(msg.phone)) {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDFAILED);
  }

  if (!this.untiedPhoneState) {
    this.untiedPhoneState = true;
    this.untiedPhoneTimeout = this.untiedPhoneTimeout || [];
    this.untiedPhoneTimeout.push(setTimeout(function () {
      _this41.untiedPhoneState = false;
    }, 1500));
  } else {
    return glGame.panel.showErrorTip(glGame.tips.USER.VERIFYCODE.SENDTOOBUSY);
  }

  if (this.untiedCodeState) return;
  this.untiedCodeState = true;
  this.UpdateCD = setInterval(function () {
    if (_this41.untiedVerifiCD < 0) {
      clearInterval(_this41.UpdateCD);
      _this41.UpdateCD = null;
      _this41.untiedVerifiCD = 60;
      _this41.untiedCodeState = false;
    } else {
      glGame.emitter.emit("UntiedCode", _this41.untiedVerifiCD);
      _this41.untiedVerifiCD--;
    }
  }, 1000);
  glGame.gameNet.send_msg('http.ReqPostPhoneCode', msg, function (route, msg) {});
};
/**
 * 清除解绑手机定时器
 */


user.clearUntiedInterval = function () {
  clearInterval(this.UpdateCD);
  this.UpdateCD = null;
  this.untiedVerifiCD = 60;
  this.untiedCodeState = false;
};
/**
 * 找回密码
 * @param {Object} msg
 * @param msg.phone 手机号码
 * @param msg.pwd 新密码
 * @param msg.code 验证码
 */


user.ReqRetrievePwd = function (msg) {
  glGame.gameNet.send_msg('http.ReqRetrievePwd', msg, function (route, msg) {
    glGame.panel.showMsgBox("", glGame.tips.USER.PASSWORD.ACC, function () {
      glGame.emitter.emit("loginclostFindPsw");
    });
    glGame.emitter.emit("changePswSuccess");
  });
};
/**
 * 玩家头像更换
 * @param headID
 * @param next
 */


user.reqEditHead = function (headID, next) {
  glGame.gameNet.send_msg('http.reqEditHead', {
    head_id: headID
  }, function (route, msg) {
    if (msg.result) {
      glGame.panel.showTip(glGame.tips.USER.CHANGEHEAD.SUCCESS);
      next();
    }
  });
};
/**
 * 登录后修改密码
 * @param {Object} msg
 */


user.reqEditPwd = function (msg) {
  glGame.gameNet.send_msg('http.reqEditPwd', msg, function (route, msg) {
    if (msg.result) {
      //this.reqMyInfo();
      glGame.panel.showTip(glGame.tips.USER.PASSWORD.ACC);
      glGame.emitter.emit("editpswsuccess");
    }
  });
};
/**
 * 获取玩家指定游戏的最近十条牌局记录
 * @param gameID
 */


user.reqUserHandRecords = function (gameID) {
  var _this42 = this;

  var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var pageIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  glGame.gameNet.send_msg('http.reqUserHandRecords', {
    gameid: gameID,
    page: pageIndex,
    page_size: pageSize
  }, function (route, msg) {
    _this42.userGameRecord[gameID] ? null : _this42.userGameRecord[gameID] = {};
    _this42.userGameRecord[gameID][pageIndex] = msg;
    glGame.emitter.emit("updateGameRecord", msg);
  });
},
/**
 * 设置玩家属性
 * @param {String} key
 * @param {Object} value
 */
user.set = function (key, value) {
  this[key] = value;
};
/**
 * 获取玩家属性
 * @param {String} key
 * @returns {Object}
 */

user.get = function (key) {
  return this[key];
};
/**
 * 清空玩家信息
 */


user.destroy = function () {
  this.resetData();
};
/**
 * 打开银行请求
 */


user.reqGetBankCoin = function () {
  var _this43 = this;

  glGame.gameNet.send_msg('http.ReqGetBankCoin', {}, function (route, msg) {
    _this43.bank_coin = msg.bank_coin;
    glGame.emitter.emit("updateBankCoin");
  });
};
/**
 * 获取玩家返水最近50条牌局记录 和 获取是否开启返水按钮信息
 * 描述: userPumpRecord { 0: 保存返水记录 ,  1: 保存返水提取记录 }
 */


user.ReqRebateRecord = function (param) {
  var _this44 = this;

  glGame.gameNet.send_msg('http.ReqRebateRecord', param, function (route, msg) {
    _this44.userPumpRecord = msg.result;
    _this44.mode_type = msg.result.modeType;
    if (_this44.userPumpRecord != null) glGame.emitter.emit("updateReqRebateRecord");
  }, "v2");
};
/**
 * 获取玩家返水提取最近20条牌局记录
 * 描述: userPumpRecord { 0: 保存返水记录 ,  1: 保存返水提取记录 }
 */


user.ReqRebateRecordList = function (page) {
  var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  glGame.gameNet.send_msg('http.ReqRebateRecordList', {
    page: page,
    pageSize: pageSize
  }, function (route, msg) {
    glGame.emitter.emit("updateReqRebateRecordList", msg.result);
  }, "v2");
};
/**
 * 获取用户返水申请
 * @param money
 */


user.ReqRebateApply = function () {
  var _this45 = this;

  glGame.gameNet.send_msg('http.ReqRebateApply', {
    accountId: glGame.user.userID
  }, function (route, msg) {
    _this45.reqGetCoin(); //更新金额


    _this45.reqUnread(); //更新邮箱


    _this45.redDotData.playerRebatReq = 2;
    glGame.emitter.emit("ReqRedDot", _this45.redDotData);
    glGame.emitter.emit("updateReqRebateApply", msg);
  });
};
/**
 * 获取用户返水领取
 */


user.ReqRebateReceive = function () {
  var _this46 = this;

  glGame.gameNet.send_msg('http.ReqRebateReceive', {}, function (route, msg) {
    _this46.userPumpMoney = msg;
    glGame.emitter.emit("updateReqRebateReceive ", msg);
  });
};
/**
* 获取返水比例
*/


user.ReqRebateConfigList = function (param) {
  var _this47 = this;

  glGame.gameNet.send_msg('http.ReqRebateConfigList', param, function (route, msg) {
    _this47.rebateConfigList = msg.result;
    glGame.emitter.emit("rebateConfigList");
  }, "v2");
};
/**
* 获取签到是否领取
*/


user.reqSigninWeekInfo = function () {
  var _this48 = this;

  glGame.gameNet.send_msg('http.reqSigninWeekInfo', {}, function (route, msg) {
    _this48.userSignin = msg;
  });
};
/**
 * 获取红点
 * mailReq 系统邮件
 * mailcapitalreq 资金邮件
 * discountReq 活动
 * playerRebatReq 返水
 * dialRed 积分夺宝
 * signinReq 签到
 * extensionReq 推广
 * payingReq 余额宝
 * vipReq 个人中心
 */


user.ReqRedDot = function () {
  var _this49 = this;

  glGame.gameNet.send_msg('http.ReqRedDot', {}, function (route, msg) {
    _this49.redDotData = msg.result;
    glGame.emitter.emit("ReqRedDot", msg.result);
  });
};
/**
* 获取玩家是否首冲
*/


user.reqReqCheckOrder = function () {
  var _this50 = this;

  glGame.gameNet.send_msg('http.ReqCheckOrder', {}, function (route, msg) {
    _this50.userRecharge = msg;
    glGame.emitter.emit(MESSAGE.UI.SCENE);
  });
};

user.getRankListData = function () {
  return this.rankData;
};
/**
* 金币显示缩进中文描述
* @param {number}  gold
* @return {String}
*/


user.GoldTemp = function (gold) {
  var strGold = "";

  if (typeof gold == 'number') {
    gold = gold.div(100);

    if (gold >= 10000000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 0), "\u4EBF");
    } else if (gold >= 1000000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 1), "\u4EBF");
    } else if (gold >= 100000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 10000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 1000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 100000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 10000000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), 2), "\u4E07");
    } else if (gold >= 1000000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), 2), "\u4E07");
    } else if (gold >= 100000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), 2), "\u4E07");
    } else {
      strGold = this.stringFix(gold.toString(), 2) + "";
      var old = "" + strGold;

      if (old.length > 1 && (strGold.indexOf(".0") != -1 || strGold.indexOf(".00") != -1)) {
        if (old.slice(-1) == "0") {
          strGold = old.slice(0, -1);
        }

        if (old.slice(-2) == ".0") {
          strGold = old.slice(0, -2);
        }

        if (old.slice(-3) == ".00") {
          strGold = old.slice(0, -3);
        }
      }
    }
  }

  return strGold;
};

user.VipGoldTemp = function (gold) {
  var strGold = "";

  if (typeof gold == 'number') {
    gold = gold.div(100);

    if (gold >= 10000000000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 0), "\u4EBF");
    } else if (gold >= 1000000000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 1), "\u4EBF");
    } else if (gold >= 100000000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 10000000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 1000000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 100000000) {
      strGold = "".concat(this.stringVipFix(gold.div(100000000).toString(), 2), "\u4EBF");
    } else if (gold >= 10000000) {
      strGold = "".concat(this.stringVipFix(gold.div(10000).toString(), 2), "\u4E07");
    } else if (gold >= 1000000) {
      strGold = "".concat(this.stringVipFix(gold.div(10000).toString(), 2), "\u4E07");
    } else if (gold >= 100000) {
      strGold = "".concat(this.stringVipFix(gold.div(10000).toString(), 2), "\u4E07");
    } else {
      strGold = this.stringVipFix(gold.toString(), 2);
    }
  }

  return strGold;
};

user.EnterRoomGoldTemp = function (gold) {
  var strGold = "";

  if (typeof gold == 'number') {
    gold = gold.div(100);

    if (gold >= 10000000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), 0), "\u4EBF");
    } else if (gold >= 1000000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), gold % 100000000 >= 10000000 ? 2 : 0), "\u4EBF");
    } else if (gold >= 100000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), gold % 100000000 >= 1000000 ? 2 : 0), "\u4EBF");
    } else if (gold >= 10000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), gold % 100000000 >= 100000 ? 2 : 0), "\u4EBF");
    } else if (gold >= 1000000000) {
      strGold = "".concat(this.stringFix(gold.div(100000000).toString(), gold % 100000000 >= 10000 ? 2 : 0), "\u4EBF");
    } else if (gold >= 100000000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), gold % 10000 >= 1000 ? 2 : 0), "\u4E07");
    } else if (gold >= 10000000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), gold % 10000 >= 100 ? 2 : 0), "\u4E07");
    } else if (gold >= 1000000) {
      strGold = "".concat(this.stringFix(gold.div(10000).toString(), gold % 10000 >= 10 ? 2 : 0), "\u4E07");
    } else {
      strGold = this.stringFix(gold.toString(), gold % 1 > 0 ? 2 : 0);
    }
  }

  return strGold;
};

user.deletZeroString = function (str) {};

user.stringFix = function (str, num) {
  if (str.indexOf('.') == -1) {
    str = str + '.';

    for (var i = 0; i < num; i++) {
      str = str + '0';
    }
  } else {
    if (str.slice(str.indexOf('.') + 1).length < num) {
      for (var _i2 = 0; _i2 < num - str.slice(str.indexOf('.') + 1).length; _i2++) {
        str = str + '0';
      }
    } else {
      for (var _i3 = 0; _i3 < str.slice(str.indexOf('.') + 1).length - num; _i3++) {
        str = str.substr(0, str.length - (str.slice(str.indexOf('.') + 1).length - num));
      }
    }
  }

  if (!num && str.indexOf('.') != -1) {
    str = str.substr(0, str.length - 1);
  }

  var pointIndex = str.indexOf('.');

  if (str[str.length - 1] == 0 && str[str.length - 2] == 0 && str.length > 4 && str.length - pointIndex == 3 && str.indexOf('.') != -1) {
    str = str.substr(0, str.length - 3);
  }

  return str;
};

user.stringVipFix = function (str, num) {
  if (str.indexOf('.') == -1) {
    str = str + '.';

    for (var i = 0; i < num; i++) {
      str = str + '0';
    }
  } else {
    if (str.slice(str.indexOf('.') + 1).length < num) {
      for (var _i4 = 0; _i4 < num - str.slice(str.indexOf('.') + 1).length; _i4++) {
        str = str + '0';
      }
    } else {
      for (var _i5 = 0; _i5 < str.slice(str.indexOf('.') + 1).length - num; _i5++) {
        str = str.substr(0, str.length - (str.slice(str.indexOf('.') + 1).length - num));
      }
    }
  }

  if (!num && str.indexOf('.') != -1) {
    str = str.substr(0, str.length - 1);
  }

  var pointIndex = str.indexOf('.');

  if (str[str.length - 1] == 0 && str[str.length - 2] == 0 && str.length >= 3 && str.length - pointIndex == 3 && str.indexOf('.') != -1) {
    str = str.substr(0, str.length - 3);
  }

  return str;
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new User();
  }

  return g_instance;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxcdXNlci5qcyJdLCJuYW1lcyI6WyJVc2VyIiwicmVzZXREYXRhIiwicmVnaXN0ZXJFdmVudCIsInVzZXIiLCJwcm90b3R5cGUiLCJnX2luc3RhbmNlIiwiRFJBV19UWVBFIiwiQkFOSyIsIkFMSVBBWSIsImVkaXRfdXNlcm5hbWUiLCJxcSIsIndlY2hhdCIsImVtYWlsIiwicGhvbmUiLCJicml0aGRheSIsIm5hbWUiLCJiaXJ0aGRheV9tb250aCIsInVzZXJOYW1lIiwidXNlcklEIiwiY29pbiIsInZpcF9uYW1lIiwiYmFua19jb2luIiwiZ3VhcmFudGVlX2luY29tZSIsInJlYWxfaW5jb21lIiwicmVjZXNzaXZlX2NvaW4iLCJhY2NUeXBlIiwiYWxpcGF5QWNjIiwiYWxpcGF5TmFtZSIsImJhbmtDYXJkTnVtIiwiYmFua0NhcmROYW1lIiwiYmFua0NhcmRUeXBlIiwiaGVhZFVSTCIsImhlYWRMaXN0IiwicGF5X3Bhc3N3b3JkIiwiYWxsRW1haWxNc2ciLCJFbWFpbERhdGEiLCJtYWlsSW5mb0RpY3QiLCJ2ZXJpZmlTdGF0ZSIsInVzZXJHYW1lUmVjb3JkIiwiZGlhbFByaXplTGlzdCIsImRpYWxIb3JzZURhdGEiLCJteURpYWxSZXN1bHQiLCJkaWFsVG9wUHJpemUiLCJkaWFsU2NvcmUiLCJzY29yZUJldCIsImJldERpYWxTY29yZSIsIm15RGlhbFJlY29yZCIsInVzZXJQdW1wUmVjb3JkIiwidXNlclB1bXBNb25leSIsInVzZXJTaWduaW4iLCJ1c2VyUmVjaGFyZ2UiLCJ1cmwiLCJ0aXBzIiwic2lnbmluU3dpdGNoIiwicmViYXRlU3dpdGNoIiwibWlzc2lvblN3aXRjaCIsImRpYWxTd2l0Y2giLCJwbGF6YVNob3dQYW5lbCIsImdhbWVFeGNlcHRpb24iLCJLaWNrT3V0R2FtZSIsInJldHJpZXZlVmVyaWZpQ0QiLCJwaG9uZUxvZ2luVmVyaWZpQ0QiLCJwaG9uZVJlZ2lzdFZlcmlmaUNEIiwiYmluZFBob25lVmVyaWZpQ0QiLCJ1bnRpZWRWZXJpZmlDRCIsImN1ckNvbnRpbnVlIiwicmVnaXN0ZXJHZXRDb2luIiwicmVnaXN0ZXJHZXREaWFtb25kIiwidGhpcmRDb2luTGltaXQiLCJnbEdhbWUiLCJlbWl0dGVyIiwib24iLCJsb2dpblN1Y2Nlc3MiLCJNRVNTQUdFIiwiVVNFUiIsIlBIT05FX1ZFUklGSUNBVElPTiIsImNsZWFyQWxsUGhvbmVJbnRlcnZhbCIsIkxPR0lOIiwiVE9VUklTVF9TVUNDRVNTIiwibG9naW5Ub3VyaXN0U3VjY2VzcyIsIkFDQ09VTlRfU1VDQ0VTUyIsImxvZ2luQWNjb3VudFN1Y2Nlc3MiLCJvblBocE1lc3NhZ2UiLCJkYXRhIiwidG91cmlzdE15SW5mb0RhdGEiLCJwbGF5ZXJMb2dpbkRhdGEiLCJtc2ciLCJ0eXBlIiwiUmVxUmVkRG90IiwiY2MiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibm90aWNlIiwicmVxR2V0SG9yc2VSYWNlTGFtcCIsImVtaXQiLCJsb2dvbiIsIm9mZldlYlZpZXciLCJwYW5lbCIsInNob3dNc2dCb3giLCJDT01NT04iLCJBQ0NPVU5URVhDRVBUSU9OIiwicmVMb2dvbiIsIlJlcURvdWJ0ZnVsTWVtYmVySW5mbyIsImlzX3dpdGhkcmF3IiwibGltaXRHYW1lIiwicmVxTXlJbmZvIiwicmVxSG9tZVZpZXciLCJyZWREb3REYXRhIiwicGF5aW5nUmVxIiwicGxheWVyUmViYXRSZXEiLCJtaXNzaW9uUmVxIiwiY29uc29sZSIsImxvZyIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJvdXRlIiwic2lnbmluIiwicmViYXRlIiwiZGlhbCIsInNpZ25fc3RhdGUiLCJsb2dpblN3aXRjaCIsInJlcVBheUdvb2RzTGlzdCIsIlNob3BEYXRhIiwic29ydFNob3BEYXRhIiwicmVzdWx0Iiwic2hvcERhdGEiLCJzaG9wRGF0YUFyciIsImtleSIsInN1Yl90eXBlIiwidW5zaGlmdCIsInB1c2giLCJyZXFVcmwiLCJyZXFEb3duTG9hZEp1bXAiLCJET1dOTE9BRCIsIk9QRU5fUEFUSCIsInNldFVybCIsImdldFdlYkdhbWVVcmwiLCJnYW1laWQiLCJnYW1ld2VidXJsIiwicGxhdFN2ckhvc3QiLCJwbGF0U3ZyUG9ydCIsImdldFdlYkdhbWVVcmxINSIsImdldFdlYkhvc3QiLCJnZXRFbnRlcldlYkdhbWVDb2luIiwiR29sZFRlbXAiLCJjaGVja0VudGVyV2ViR2FtZSIsInVwZGF0ZVVzZXJEYXRhIiwicmVxR2V0Q29pbiIsIk51bWJlciIsInJlcUdldERpYW1vbmQiLCJkaWFtb25kIiwicmVxVG91cmlzdE15SW5mbyIsInJlcUFjY291bnRNeUluZm8iLCJyZXFHZXRIZWFkTGlzdCIsInNleCIsIm51bWJlciIsInJlcURpYWxQcml6ZSIsInJlcURpYWwiLCJ0cmVhc3VyZSIsInJlcURpYWxIb3JzZUxhbnRlcm4iLCJyZXFEaWFsVG9wUHJpemVMb2ciLCJ0aW1lIiwicmVxRGlhbEludGVncmFsIiwiY2hpcF9pbiIsInNjb3JlX2JldCIsImRpYWxSZWZyZXNoVGltZSIsImRpYWxSZWZyZXNoVHlwZSIsInJlcURpYWxQZXJzb25hbCIsInJlcVVucmVhZCIsInJlcUJpbGxib2FyZHMiLCJyZXFCaWxsYm9hcmRzRGF0YSIsInJlcUJhbmtDb2luTGlzdCIsInBhZ2UiLCJwYWdlc2l6ZSIsImJhbmtyZWNvcmQiLCJyZXFNYWlsTGlzdCIsInBhZ2Vfc2l6ZSIsIm1vbmV5VW5yZWFkQ291bnQiLCJzeXN0ZW1VbnJlYWRDb3VudCIsImkiLCJtYWlsbGlzdCIsImxlbmd0aCIsImNvbmNhdCIsIlJlcURlbGVPbmVNYWlsIiwibWFpbElEIiwiaWQiLCJSZXFEZWxlTWFpbCIsIlJlcUFsbFJlYWRNYWlsIiwiUmVxTWFpbEdldCIsIlJlcU1haWxBbGxHZXQiLCJSZXFOb3RpY2UiLCJhbm5vdW5jZU1lbnQiLCJjbGVhck1haWwiLCJyZXFNYWlsSW5mbyIsImVtYWlscyIsIm1haWxfY29udGVudCIsInN0YXR1cyIsInJlcUN1c3RvbVNlcnZlciIsInNpemUiLCJib29sIiwiY3VzdG9tU2V2ZXIiLCJSZXFDdXN0b21IZWxwTGlzdCIsIlJlcUN1c3RvbVNlcnZlckNvbmZpZyIsIkN1c3RvbVNlcnZlckNvbmZpZyIsIlJlcUN1c3RvbVNlcnZlclBob25lIiwicmVxRGlzY291bnRDb2luQmFsYW5jZVN1bW1hcnkiLCJ5dWJhb092ZXJWaWV3IiwicmVxRGlzY291bnRDb2luQmFsYW5jZSIsInl1YmFvUmVjb3JkIiwicmVxRGlzY291bnRDb2luQmFsYW5jZUFwcGx5IiwieXViYW9BcHBseSIsInJlcUJhbmtTYXZlIiwiZ29sZCIsInNob3dUaXAiLCJTQVZFIiwiZm9ybWF0IiwiY3V0RmxvYXQiLCJyZXFCYW5rVGFrZU91dCIsInBzdyIsIlRBS0UiLCJudW0iLCJnZXRGbG9hdCIsImRpdiIsInRvU3RyaW5nIiwidmFsdWUiLCJpc05hTiIsInRvRml4ZWQiLCJyZXFSZXNldFB3ZCIsIm5leHQiLCJQQVNTV09SRCIsIkFDQyIsIkFMUCIsImdyYWRlX2lkIiwiZ3JhZGVfbmFtZSIsIm5pY2tuYW1lIiwidXNlcm5hbWUiLCJsb2dpY0lEIiwibG9naWNpZCIsInBsYXQiLCJhbGlwYXkiLCJhbGlwYXlfbmFtZSIsImJhbmtfY2FyZCIsImJhbmtfbmFtZSIsImJhbmtfdHlwZSIsImhlYWR1cmwiLCJ1c2VyU2V4IiwiZGFpbHlfd2luIiwiYWxsX3dpbiIsInZpcExldmVsIiwicm9vbVN3aXRjaCIsInN1c3BpY2lvdXMiLCJpc19yZWNlaXZlX3JlZ2lzdGVyX3Bob25lX2NvaW4iLCJkZW1vX3BsYXllciIsImdhbWUiLCJwb2ludF90cmVhc3VyZSIsImJhbGFuY2UiLCJtaXNzaW9uIiwicmVjZWl2ZV9kaXNjb3VudCIsInJlY2VpdmVfcHJvbW90aW9uX2F3YXJkIiwicmVjZWl2ZV9yZWJhdGUiLCJyZWNlaXZlX1NpZ25pbl9hd2FyZCIsIndpdGhkcmF3IiwicmVjaGFyZ2UiLCJpc19nYW1lIiwiaXNfZGVtb19wbGF5ZXIiLCJqdWRnZUZvcmJpZEdhbWUiLCJEb3VidGZ1bE1lbWJlckRhdGEiLCJyZWdpc3Rlcl9nb2xkX3R5cGUiLCJyZWdpc3RlckdvbGRUeXBlIiwicmVnaXN0ZXJfZ29sZCIsInJlZ2lzdGVyR2l2ZUdvbGQiLCJiaW5kX3Bob25lX2dvbGQiLCJiaW5kUGhvbmVHaXZlR29sZCIsInJlZ2lzdGVyX2RpYW1vbmQiLCJyZWdpc3RlckdpdmVEaWFtb25kIiwiYmluZF9waG9uZV9kaWFtb25kIiwiYmluZFBob25lR2l2ZURpYW1vbmQiLCJiaW5kUGhvbmVGaXJzdCIsImJpbmRfcGhvbmVfZmlyc3QiLCJyZWREb3QiLCJmaXJzdFBheSIsInByb2hpYml0QmluZFBob25lIiwiaG9tZVZpZXciLCJyZWJhdGVTd2l0Y2hFeCIsImJpbGxib2FyZHMiLCJnYW1lRGlzcGxheVR5cGUiLCJnYW1lR3JvdXAiLCJnYW1lRGlzcGxheVRva2VuIiwidG9rZW4iLCJnYW1lRGlzcGxheVR5cGVMaXN0IiwidHlwZUxpc3QiLCJpbnRlckZhY2VNb2RlIiwibW9kZSIsImdhbWV0eXBlTGlzdCIsIndlYkdhbWVVcmwiLCJnYW1lTGlzdCIsImFkZEhvcnNlUmFjZUxhbXAiLCJob3JzZVJhY2VMYW1wIiwiZW1lcmdlbnROb3RpY2UiLCJleGlzdHMiLCJkaXNjb3VudCIsImRpc2NvdW50X21heCIsInJlc2V0QXdhcmQiLCJjaGVja1Bob25lIiwicGhvbmVOdW1iZXIiLCJTdHJpbmdfbnVtYmVyIiwiZHJhdyIsImoiLCJpc1RvdXJpc3QiLCJpc0JpbmRBbGlwYXkiLCJpc0JpbmRCYW5rQ2FyZCIsInJlcVVzZXJFeHRlbnNpb25Td2l0Y2giLCJyZXFCaW5kQWxpcGF5IiwiYWxpcGF5SUQiLCJSZXFHZXRDYXNoT3V0QmluZEluZm8iLCJCSU5EIiwicmVxQmluZEJhbmsiLCJiYW5rX2lkIiwidHlwZUlkIiwiZXJyb3IiLCJyZXFXaXRoZHJhdyIsImFtb3VudCIsInB3ZCIsIm11bCIsImNvZGUiLCJSZXFQb3N0UGhvbmVDb2RlIiwic2hvd0Vycm9yVGlwIiwiVkVSSUZZQ09ERSIsIlNFTkRGQUlMRUQiLCJwb3N0UGhvbmVTdGF0ZSIsInBvc3lQaG9uZVRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiU0VORFRPT0JVU1kiLCJyZXRyaWV2ZVBzd1N0YXRlIiwicmV0cmlldmVVcGRhdGVWZXJpZmlDRCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImNsZWFyUG9zdFBob25lSW50ZXJ2YWwiLCJyZXFQaG9uZUNvZGUiLCJsb2dpblBob25lU3RhdGUiLCJsb2dpblBob25lVGltZW91dCIsInBob25lQ29kZVN0YXRlIiwicGhvbmVVcGRhdGVWZXJpZmlDRCIsInZlcmlmaVR5cGUiLCJyZXFSZWdpc3RQaG9uZUNvZGUiLCJyZWdpc3RQaG9uZVN0YXRlIiwicmVnaXN0UGhvbmVUaW1lb3V0IiwicmVnaXN0Q29kZVN0YXRlIiwicmVnaXN0VXBkYXRlVmVyaWZpQ0QiLCJjbGVhclJlZ2lzdFBob25lSW50ZXJ2YWwiLCJjbGVhclBob25lSW50ZXJ2YWwiLCJyZXFCaW5kUGhvbmVDb2RlIiwiYmluZFBob25lU3RhdGUiLCJiaW5kUGhvbmVUaW1lb3V0IiwiYmluZFBob25lQ29kZVN0YXRlIiwiYmluZFBob25lQ0QiLCJjbGVhckJpbmRQaG9uZVRpbWUiLCJjb3VudCIsImNsZWFyVGltZW91dCIsImNsZWFyTG9naW5QaG9uZVRpbWUiLCJjbGVhclBvc3RQaG9uZVRpbWUiLCJjbGVhclVudGllZFBob25lVGltZSIsInVudGllZFBob25lU3RhdGUiLCJjbGVhckJpbmRQaG9uZUludGVydmFsIiwiY2xlYXJVbnRpZWRJbnRlcnZhbCIsInJlcVVudGllZENvZGUiLCJ1bnRpZWRQaG9uZVRpbWVvdXQiLCJ1bnRpZWRDb2RlU3RhdGUiLCJVcGRhdGVDRCIsIlJlcVJldHJpZXZlUHdkIiwicmVxRWRpdEhlYWQiLCJoZWFkSUQiLCJoZWFkX2lkIiwiQ0hBTkdFSEVBRCIsIlNVQ0NFU1MiLCJyZXFFZGl0UHdkIiwicmVxVXNlckhhbmRSZWNvcmRzIiwiZ2FtZUlEIiwicGFnZVNpemUiLCJwYWdlSW5kZXgiLCJzZXQiLCJnZXQiLCJkZXN0cm95IiwicmVxR2V0QmFua0NvaW4iLCJSZXFSZWJhdGVSZWNvcmQiLCJwYXJhbSIsIm1vZGVfdHlwZSIsIm1vZGVUeXBlIiwiUmVxUmViYXRlUmVjb3JkTGlzdCIsIlJlcVJlYmF0ZUFwcGx5IiwiYWNjb3VudElkIiwiUmVxUmViYXRlUmVjZWl2ZSIsIlJlcVJlYmF0ZUNvbmZpZ0xpc3QiLCJyZWJhdGVDb25maWdMaXN0IiwicmVxU2lnbmluV2Vla0luZm8iLCJyZXFSZXFDaGVja09yZGVyIiwiVUkiLCJTQ0VORSIsImdldFJhbmtMaXN0RGF0YSIsInJhbmtEYXRhIiwic3RyR29sZCIsInN0cmluZ0ZpeCIsIm9sZCIsImluZGV4T2YiLCJzbGljZSIsIlZpcEdvbGRUZW1wIiwic3RyaW5nVmlwRml4IiwiRW50ZXJSb29tR29sZFRlbXAiLCJkZWxldFplcm9TdHJpbmciLCJzdHIiLCJzdWJzdHIiLCJwb2ludEluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQ0lBLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQVk7QUFDZixPQUFLQyxTQUFMO0FBQ0EsT0FBS0MsYUFBTDtBQUNILENBSkw7QUFBQSxJQUtJQyxJQUFJLEdBQUdILElBQUksQ0FBQ0ksU0FMaEI7QUFBQSxJQU1JQyxVQUFVLEdBQUcsSUFOakI7O0FBT0EsSUFBTUMsU0FBUyxHQUFHO0FBQU87QUFDckJDLEVBQUFBLElBQUksRUFBRSxDQURRO0FBRWRDLEVBQUFBLE1BQU0sRUFBRTtBQUZNLENBQWxCO0FBSUE7Ozs7QUFHQUwsSUFBSSxDQUFDRixTQUFMLEdBQWlCLFlBQVk7QUFDekIsT0FBS1EsYUFBTCxHQUFxQixJQUFyQixDQUR5QixDQUNHOztBQUM1QixPQUFLQyxFQUFMLEdBQVUsSUFBVixDQUZ5QixDQUVHOztBQUM1QixPQUFLQyxNQUFMLEdBQWMsSUFBZCxDQUh5QixDQUdHOztBQUM1QixPQUFLQyxLQUFMLEdBQWEsSUFBYixDQUp5QixDQUlHOztBQUM1QixPQUFLQyxLQUFMLEdBQWEsSUFBYixDQUx5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QUF0SSxFQUF5STtBQUNySU0sSUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxDQUFYLEVBQWNELEdBQUcsQ0FBQ3BPLE1BQUosR0FBYSxDQUEzQixDQUFOO0FBQ0g7O0FBQ0QsU0FBT29PLEdBQVA7QUFDSCxDQXpCRDs7QUEwQkFHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixZQUFZO0FBQ3pCLE1BQUksQ0FBQ3haLFVBQUwsRUFBaUI7QUFDYkEsSUFBQUEsVUFBVSxHQUFHLElBQUlMLElBQUosRUFBYjtBQUNIOztBQUNELFNBQU9LLFVBQVA7QUFDSCxDQUxEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog546p5a625qih5Z6LXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxubGV0XHJcbiAgICBVc2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgdXNlciA9IFVzZXIucHJvdG90eXBlLFxyXG4gICAgZ19pbnN0YW5jZSA9IG51bGw7XHJcbmNvbnN0IERSQVdfVFlQRSA9IHsgICAgICAvL+WPlueOsOexu+Wei1xyXG4gICAgQkFOSzogMSxcclxuICAgIEFMSVBBWTogMixcclxufVxyXG4vKipcclxuICog6YeN572u546p5a625bGe5oCnXHJcbiAqL1xyXG51c2VyLnJlc2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZWRpdF91c2VybmFtZSA9IG51bGw7ICAvLzEu5Y+v5Lul5L+u5pS56LSm5Y+3XHJcbiAgICB0aGlzLnFxID0gbnVsbDsgICAgICAgICAgICAgLy9xcVxyXG4gICAgdGhpcy53ZWNoYXQgPSBudWxsOyAgICAgICAgIC8v5b6u5L+hXHJcbiAgICB0aGlzLmVtYWlsID0gbnVsbDsgICAgICAgICAgLy/pgq7nrrFcclxuICAgIHRoaXMucGhvbmUgPSBudWxsOyAgICAgICAgICAvL+aJi+aculxyXG4gICAgdGhpcy5icml0aGRheSA9IG51bGw7ICAgICAgIC8v55Sf5pelXHJcbiAgICB0aGlzLm5hbWUgPSBudWxsOyAgICAgICAgICAgLy/lp5PlkI1cclxuICAgIHRoaXMuYmlydGhkYXlfbW9udGggPSBudWxsO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IG51bGw7ICAgICAgIC8vIOeOqeWutuaYteensFxyXG4gICAgdGhpcy51c2VySUQgPSBudWxsOyAgICAgICAgIC8vIOeOqeWutklEXHJcbiAgICB0aGlzLmNvaW4gPSAwOyAgICAgICAgICAgLy8g6YeR5biBXHJcbiAgICB0aGlzLnZpcF9uYW1lID0gMDsgICAgICAgICAgLy/njqnlrrbnmoR2aXDnrYnnuqdcclxuICAgIHRoaXMuYmFua19jb2luID0gbnVsbDsgICAgICAvLyDph5HlupPph4znmoTph5HluIFcclxuICAgIHRoaXMuZ3VhcmFudGVlX2luY29tZSA9IG51bGw7IC8vIOS/neW6leaUtuebilxyXG4gICAgdGhpcy5yZWFsX2luY29tZSA9IG51bGw7ICAgICAgLy8g5a6e6ZmF5pS255uKXHJcbiAgICB0aGlzLnJlY2Vzc2l2ZV9jb2luID0gbnVsbDsgICAvLyDpmpDmgKfotKLlr4xcclxuICAgIHRoaXMuYWNjVHlwZSA9IG51bGw7ICAgICAgICAvLyDotKblj7fnsbvlnotcclxuICAgIHRoaXMuYWxpcGF5QWNjID0gbnVsbDsgICAgICAvLyDmlK/ku5jlrp3otKblj7dcclxuICAgIHRoaXMuYWxpcGF5TmFtZSA9IG51bGw7ICAgICAvLyDmlK/ku5jlrp3lkI3lrZdcclxuICAgIHRoaXMuYmFua0NhcmROdW0gPSBudWxsOyAgICAvLyDpk7booYzljaHlj7dcclxuICAgIHRoaXMuYmFua0NhcmROYW1lID0gbnVsbDsgICAvLyDpk7booYzlkI3lrZdcclxuICAgIHRoaXMuYmFua0NhcmRUeXBlID0gbnVsbDsgICAvLyDpk7booYznsbvlnotcclxuICAgIHRoaXMuaGVhZFVSTCA9IG51bGw7ICAgICAgICAvLyDlpLTlg4/lnLDlnYBcclxuICAgIHRoaXMuaGVhZExpc3QgPSB7fTsgICAgICAgLy8g546p5a625aS05YOP5YiX6KGoXHJcbiAgICB0aGlzLnBheV9wYXNzd29yZCA9IG51bGw7ICAgLy8g6ZO26KGM5a+G56CBXHJcbiAgICB0aGlzLmFsbEVtYWlsTXNnID0ge307ICAgICAgICAgICAvLyDnjqnlrrbpgq7ku7ZcclxuICAgIHRoaXMuRW1haWxEYXRhID0ge307ICAgICAgICAvLyDpgq7ku7bnirbmgIFcclxuICAgIHRoaXMubWFpbEluZm9EaWN0ID0ge307ICAgICAvLyDlt7Lnu4/ojrflj5bnmoTpgq7ku7bor6bmg4VcclxuICAgIHRoaXMudmVyaWZpU3RhdGUgPSBmYWxzZTsgICAvLyDpqozor4HnoIHojrflj5bnirbmgIFcclxuICAgIHRoaXMudXNlckdhbWVSZWNvcmQgPSB7fTsgICAvLyDnjqnlrrbmuLjmiI/orrDlvZVcclxuICAgIHRoaXMuZGlhbFByaXplTGlzdCA9IFtdOyAgICAvLyDmir3lpZbnmoTlpZbpoblcclxuICAgIHRoaXMuZGlhbEhvcnNlRGF0YSA9IFtdOyAgICAvLyDmir3lpZbot5Hpqaznga/mlbDmja5cclxuICAgIHRoaXMubXlEaWFsUmVzdWx0ID0gbnVsbDsgICAvLyDmir3lpZbnu5PmnpxcclxuICAgIHRoaXMuZGlhbFRvcFByaXplID0gW107ICAgICAvLyDlpKflpZborrDlvZVcclxuICAgIHRoaXMuZGlhbFNjb3JlID0gbnVsbDsgICAgICAvLyDmir3lpZbnp6/liIZcclxuICAgIHRoaXMuc2NvcmVCZXQgPSBudWxsOyAgICAgICAvLyDmir3lpZbnp6/liIbkuIvms6jlhZHmjaLmr5TkvotcclxuICAgIHRoaXMuYmV0RGlhbFNjb3JlID0gbnVsbDsgICAvLyDmmI7ml6Xmir3lpZbnp6/liIZcclxuICAgIHRoaXMubXlEaWFsUmVjb3JkID0gbnVsbDsgICAvLyDnjqnlrrbkuKrkurrmir3lpZborrDlvZVcclxuICAgIHRoaXMudXNlclB1bXBSZWNvcmQgPSB7fTsgICAvLyDnjqnlrrbov5TmsLTorrDlvZVcclxuICAgIHRoaXMudXNlclB1bXBNb25leSA9IHt9OyAgICAgLy8g546p5a626L+U5rC0562J5b6F5Y+R5pS+5pe26Ze05ZKM6L+U5rC06YeR6aKdXHJcbiAgICB0aGlzLnVzZXJTaWduaW4gPSB7fTsgICAgICAgLy8g6I635Y+W546p5a625piv5ZCm562+5Yiw5pWw5o2uXHJcbiAgICB0aGlzLnVzZXJSZWNoYXJnZSA9IHt9OyAgICAgLy8g6I635Y+W546p5a625piv5ZCm6aaW5YayXHJcbiAgICB0aGlzLnVybCA9IG51bGw7ICAgICAgICAgICAgICAvLyDojrflj5bov5znqIvnmoTphY3nva7pk77mjqVcclxuICAgIHRoaXMudGlwcyA9IGZhbHNlOyAgICAgICAgICAvL+i/m+WFpeWkp+WOheaYr+WQpuW8ueWHuuazqOWGjOW8ueeql1xyXG4gICAgdGhpcy5zaWduaW5Td2l0Y2ggPSAwOyAgICAgIC8v562+5Yiw55qE5byA5YWzXHJcbiAgICB0aGlzLnJlYmF0ZVN3aXRjaCA9IDA7ICAgICAgLy/ov5TmsLTnmoTlvIDlhbNcclxuICAgIHRoaXMubWlzc2lvblN3aXRjaCA9IDA7ICAgICAvL+S7u+WKoeeahOW8gOWFs1xyXG4gICAgdGhpcy5kaWFsU3dpdGNoID0gMDsgICAgICAgIC8v5bm46L+Q5aS65a6d55qE5byA5YWzXHJcblxyXG4gICAgdGhpcy5wbGF6YVNob3dQYW5lbCA9IFtdOyAgIC8v5aSn5Y6F5by556qX5pWw5o2uXHJcblxyXG4gICAgdGhpcy5nYW1lRXhjZXB0aW9uID0gZmFsc2U7IC8vIFBIUOWPiuaXtumAmuefpeeKtuaAgSAgIOi0puWPt+W8guW4uFxyXG4gICAgdGhpcy5LaWNrT3V0R2FtZSA9IGZhbHNlOyAgIC8vUEhQ5Y+K5pe26YCa55+l54q25oCBICAg5bCB5YGcIOOAgei4ouS4i+e6v1xyXG5cclxuICAgIC8v6aqM6K+B56CB5YCS6K6h5pe2XHJcbiAgICB0aGlzLnJldHJpZXZlVmVyaWZpQ0QgPSA2MDsgICAgIC8v5rOo5YaM6aqM6K+B56CB5YCS6K6h5pe2XHJcbiAgICB0aGlzLnBob25lTG9naW5WZXJpZmlDRCA9IDYwOyAgIC8v5omL5py655m75b2V6aqM6K+B56CB5YCS6K6h5pe2XHJcbiAgICB0aGlzLnBob25lUmVnaXN0VmVyaWZpQ0QgPSA2MDsgICAvL+azqOWGjOeVjOmdouaJi+acuumqjOivgeeggeWAkuiuoeaXtlxyXG4gICAgdGhpcy5iaW5kUGhvbmVWZXJpZmlDRCA9IDYwOyAgICAvL+e7keWumuaJi+acuumqjOivgeeggeWAkuiuoeaXtlxyXG4gICAgdGhpcy51bnRpZWRWZXJpZmlDRCA9IDYwOyAgICAgICAvL+ino+e7keaJi+acuumqjOivgeeggeWAkuiuoeaXtlxyXG5cclxuICAgIHRoaXMuY3VyQ29udGludWUgPSBbXTsgICAgICAgICAgLy8g5b2T5YmN55qE6Ieq5YqoXHJcblxyXG4gICAgdGhpcy5yZWdpc3RlckdldENvaW4gPSAwOyAgICAgICAvL+azqOWGjOekvOmHkVxyXG4gICAgdGhpcy5yZWdpc3RlckdldERpYW1vbmQgPSAwICAgICAgICAvL+azqOWGjOmSu+efs1xyXG5cclxuICAgIHRoaXMudGhpcmRDb2luTGltaXQgPSAwOyAgICAgLy/nrKzkuInmlrnlh4blhaXph5Hpop1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDms6jlhozkuovku7bnm5HlkKxcclxuICog5pWw5o2u5qih5Z6L55qE5LqL5Lu25peg6ZyA6ZSA5q+BXHJcbiAqIOeQhuiuuuS4iumHjeWQr+a4uOaIj+WQjuWwseS4jeWtmOWcqOS6hlxyXG4gKi9cclxudXNlci5yZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJsb2dpblN1Y2Nlc3NcIiwgdGhpcy5sb2dpblN1Y2Nlc3MsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VU0VSLlBIT05FX1ZFUklGSUNBVElPTiwgdGhpcy5jbGVhckFsbFBob25lSW50ZXJ2YWwsIHRoaXMpXHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLkxPR0lOLlRPVVJJU1RfU1VDQ0VTUywgdGhpcy5sb2dpblRvdXJpc3RTdWNjZXNzLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuTE9HSU4uQUNDT1VOVF9TVUNDRVNTLCB0aGlzLmxvZ2luQWNjb3VudFN1Y2Nlc3MsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblBocE1lc3NhZ2VcIiwgdGhpcy5vblBocE1lc3NhZ2UsIHRoaXMpO1xyXG59O1xyXG5cclxudXNlci5sb2dpblRvdXJpc3RTdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIC8vIHRoaXMucmVxVXJsKCk7XHJcbiAgICAvLyB0aGlzLnJlcVRvdXJpc3RNeUluZm8oKTtcclxuICAgIC8vIHRoaXMucmVxUmVxQ2hlY2tPcmRlcigpO1xyXG4gICAgdGhpcy50b3VyaXN0TXlJbmZvRGF0YShkYXRhKVxyXG59O1xyXG51c2VyLmxvZ2luQWNjb3VudFN1Y2Nlc3MgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgLy8gdGhpcy5yZXFVcmwoKTtcclxuICAgIC8vIHRoaXMucmVxQWNjb3VudE15SW5mbyhkYXRhKTtcclxuICAgIHRoaXMucGxheWVyTG9naW5EYXRhKGRhdGEpXHJcbn07XHJcbi8qKlxyXG4gKiBQaHDpgJrov4dwb21lbG/lkJHlrqLmiLfnq6/mjqjpgIHmtojmga9cclxuICogdHlwZVxyXG4gKiAxOuWIt+aWsOe6oueCuSAy77ya5paw6LeR6amsIDM65paw5YWs5ZGKXHJcbiAqIDTvvJrlsIHlgZzotKblj7cgNe+8muemgeatoua4uOaIjyA277ya56aB5q2i5Y+W546wIDfvvJrouKLlh7rmuLjmiI8gODrnpoHmraLpooblj5bov5TmsLQgOe+8muemgeatouenr+WIhuWkuuWunVxyXG4gKiAxMO+8muemgeatouWFheWAvCAxMe+8muemgeatoumihuWPluS8mOaDoOa0u+WKqCAxMu+8muemgeatoumihuWPluaOqOW5v+WlluWKsSAgIDEz77ya56aB5q2i6aKG5Y+W562+5Yiw5aWW5YqxXHJcbiAqIDE2Ouino+mZpOWwgeWBnOa4uOaIjyAxN++8muino+mZpOemgeatoua4uOaIjyAxOO+8muino+mZpOemgeatouWPlueOsCwxOTrliLfmlrBteWluZm8o5Yi35paw56aB5q2iKSwyMOWIt+aWsEhvbWVWaWV3IDIxOnZpcOWPmOWMluWIt+aWsOebuOWFs+S/oeaBr1xyXG4gKiAyMjrliLfmlrDkvZnpop3lrp3nuqLngrlcclxuICogN++8mui4ouWHuua4uOaIjyDnm7TmjqXorqnku5bph43nmbtcclxuICovXHJcbnVzZXIub25QaHBNZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5SZXFSZWREb3QoKTsgICAgICAgICAgICAgICAgICAgICAgIC8v5Yi35paw57qi54K554q25oCBXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSBcInBsYXphXCIpIGdsR2FtZS5ub3RpY2UucmVxR2V0SG9yc2VSYWNlTGFtcCgpOyAgICAgLy/ojrflj5bot5HpqazmlbDmja5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwibmV3cm90aWNlXCIpOyAgICAgICAvL+WcqOe0p+aApeWFrOWRiuiEmuacrOebkeWQrFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICBpZiAoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lID09IFwicGxhemFcIiB8fCBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgPT0gXCJsb2dpblwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLktpY2tPdXRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUubG9nb24ub2ZmV2ViVmlldygpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCJcIiwgZ2xHYW1lLnRpcHMuQ09NTU9OLkFDQ09VTlRFWENFUFRJT04sICgpID0+IHsgZ2xHYW1lLmxvZ29uLnJlTG9nb24oKSB9KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLktpY2tPdXRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIC8vIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgPT0gXCJwbGF6YVwiIHx8IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSBcImxvZ2luXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubGltaXRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmxpbWl0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgZ2xHYW1lLmxvZ29uLm9mZldlYlZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5SZXFEb3VidGZ1bE1lbWJlckluZm8oKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICB0aGlzLmlzX3dpdGhkcmF3ID0gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgIGNhc2UgOTpcclxuICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgIGNhc2UgMTQ6XHJcbiAgICAgICAgY2FzZSAxNTpcclxuICAgICAgICAgICAgdGhpcy5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5SZXFEb3VidGZ1bE1lbWJlckluZm8oKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNjpcclxuICAgICAgICBjYXNlIDE3OlxyXG4gICAgICAgICAgICB0aGlzLlJlcVJlZERvdCgpO1xyXG4gICAgICAgICAgICB0aGlzLlJlcURvdWJ0ZnVsTWVtYmVySW5mbygpO1xyXG4gICAgICAgICAgICB0aGlzLmxpbWl0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLktpY2tPdXRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUV4Y2VwdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICB0aGlzLmlzX3dpdGhkcmF3ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5SZXFEb3VidGZ1bE1lbWJlckluZm8oKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgICAgdGhpcy5yZXFNeUluZm8oKTsgICAgICAgICAgICAgICAgICAgLy/liLfmlrDnjqnlrrbmiYDmnInlj6/npoHmraLnmoTpgInpoblcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgdGhpcy5yZXFIb21lVmlldygpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIxOlxyXG4gICAgICAgICAgICB0aGlzLnJlcUhvbWVWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVxTXlJbmZvKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjI6XHJcbiAgICAgICAgICAgIHRoaXMucmVkRG90RGF0YS5wYXlpbmdSZXEgPSAxO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiUmVxUmVkRG90XCIsIHRoaXMucmVkRG90RGF0YSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjM6XHJcbiAgICAgICAgICAgIHRoaXMucmVkRG90RGF0YS5wbGF5ZXJSZWJhdFJlcSA9IDE7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJSZXFSZWREb3RcIiwgdGhpcy5yZWREb3REYXRhKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNDpcclxuICAgICAgICAgICAgdGhpcy5yZWREb3REYXRhLm1pc3Npb25SZXEgPSAxO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiUmVxUmVkRG90XCIsIHRoaXMucmVkRG90RGF0YSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyq5a6a5LmJ57G75Z6LLi4uLi4uXCIsIG1zZy50eXBlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufTtcclxudXNlci5yZXFIb21lVmlldyA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFIb21lVmlld1wiLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLnNpZ25pblN3aXRjaCA9IG1zZy5zaWduaW47XHJcbiAgICAgICAgdGhpcy5yZWJhdGVTd2l0Y2ggPSBtc2cucmViYXRlO1xyXG4gICAgICAgIHRoaXMubWlzc2lvblN3aXRjaCA9IG1zZy5taXNzaW9uU3dpdGNoO1xyXG4gICAgICAgIHRoaXMuZGlhbFN3aXRjaCA9IG1zZy5kaWFsO1xyXG4gICAgICAgIHRoaXMuc2lnbl9zdGF0ZSA9IG1zZy5zaWduX3N0YXRlO1xyXG4gICAgICAgIHRoaXMubG9naW5Td2l0Y2ggPSBtc2cubG9naW5Td2l0Y2g7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVBsYXphU3dpdGNoXCIpXHJcbiAgICB9KVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWVhuWfjuaVsOaNrlxyXG4gKi9cclxudXNlci5yZXFQYXlHb29kc0xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQYXlHb29kc0xpc3QnLCBudWxsLCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMuU2hvcERhdGEgPSB0aGlzLnNvcnRTaG9wRGF0YShtc2cucmVzdWx0KTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwic2hvd1Nob3BVSVwiKVxyXG4gICAgfSlcclxufTtcclxudXNlci5zb3J0U2hvcERhdGEgPSBmdW5jdGlvbiAoc2hvcERhdGEpIHtcclxuICAgIGxldCBzaG9wRGF0YUFyciA9IFtdO1xyXG4gICAgZm9yIChsZXQga2V5IGluIHNob3BEYXRhKSB7XHJcbiAgICAgICAgaWYgKHNob3BEYXRhW2tleV0uc3ViX3R5cGUgPT0gOTkpIHtcclxuICAgICAgICAgICAgc2hvcERhdGFBcnIudW5zaGlmdChzaG9wRGF0YVtrZXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaG9wRGF0YUFyci5wdXNoKHNob3BEYXRhW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzaG9wRGF0YUFycjtcclxufTtcclxuLyoqXHJcbiog6I635Y+WVVJMXHJcbiogaGVscCDlrqLmnI3luK7liqnmlofmoaPlnLDlnYBcclxuKiByZWNoYXJnZSBoNeeJiOWFheWAvOmhtemdolxyXG4qIHBheV9qdW1wIOWFheWAvOaJk+W8gOW6lOeUqOmhtemdolxyXG4qIGRvd21sb2FkX2p1bXAg5LiL6L295Zyw5Z2AXHJcbiovXHJcbnVzZXIucmVxVXJsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMudXJsKSBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXNlcnVybGRhdGFcIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFVcmwnLCB7fSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXJsID0gZGF0YTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5nmmK9yZXF1cmznmoTmlbDmja5cIixKU09OLnN0cmluZ2lmeShkYXRhLG51bGwsMikpXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1c2VydXJsZGF0YVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxudXNlci5yZXFEb3duTG9hZEp1bXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy51cmwpIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5ET1dOTE9BRC5PUEVOX1BBVEgpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxVXJsJywge30sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVybCA9IGRhdGE7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5ET1dOTE9BRC5PUEVOX1BBVEgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxudXNlci5zZXRVcmwgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgdGhpcy51cmwgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluesrOS4ieaWuea4uOaIj+WcsOWdgOe7hOijhVxyXG4gKiBAcGFyYW0ge251bWJlciBvciBzdHJpbmd9IGdhbWVpZCAvL+esrOS4ieaWuea4uOaIj2lkXHJcbiAqL1xyXG51c2VyLmdldFdlYkdhbWVVcmwgPSBmdW5jdGlvbiAoZ2FtZWlkKSB7XHJcbiAgICAvL++8iOS4tOaXtuS9v+eUqOW5s+WPsOWtl+aute+8jOWQjue7rei/mOaYr+S9v+eUqOaNhue7keaWsOWinuWtl+aute+8iVxyXG4gICAgdmFyIGdhbWV3ZWJ1cmwgPSBgJHt0aGlzLnVybC5wbGF0U3ZySG9zdH0ke3RoaXMudXJsLnBsYXRTdnJQb3J0ID8gXCI6XCIgKyB0aGlzLnVybC5wbGF0U3ZyUG9ydCA6IFwiXCJ9L2luZGV4L2ludG8/Zz0ke2dhbWVpZH1gO1xyXG4gICAgcmV0dXJuIGdhbWV3ZWJ1cmw7XHJcbn07XHJcblxyXG4vKipcclxuICog6I635Y+W56ys5LiJ5pa5aDXmuLjmiI/nu4Too4VcclxuICogQHBhcmFtIHtudW1iZXIgb3Igc3RyaW5nfSB1cmwgLy/mnI3liqHlmajov5Tlm57nmoR1cmxcclxuICovXHJcbnVzZXIuZ2V0V2ViR2FtZVVybEg1ID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgLy/vvIjkuLTml7bkvb/nlKjlubPlj7DlrZfmrrXvvIzlkI7nu63ov5jmmK/kvb/nlKjmjYbnu5HmlrDlop7lrZfmrrXvvIlcclxuICAgIHZhciBnYW1ld2VidXJsID0gYCR7Z2xHYW1lLmdhbWVOZXQuZ2V0V2ViSG9zdCgpfS9pbmRleC9JbnRvaDU/cG9zdFVybD0ke3VybH1gO1xyXG4gICAgcmV0dXJuIGdhbWV3ZWJ1cmw7XHJcbn07XHJcblxyXG4vL+esrOS4ieaWueWHhuWFpemHkeminVxyXG51c2VyLmdldEVudGVyV2ViR2FtZUNvaW4gPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXMuR29sZFRlbXAodGhpcy50aGlyZENvaW5MaW1pdCk7XHJcbn1cclxuXHJcbi8v56ys5LiJ5pa55YeG5YWl6YeR6aKd5qCh6aqMXHJcbnVzZXIuY2hlY2tFbnRlcldlYkdhbWUgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXMudGhpcmRDb2luTGltaXQgPD0gdGhpcy5jb2luO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W546p5a625L+h5oGvXHJcbiAqL1xyXG51c2VyLnJlcU15SW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcU15SW5mbycsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVXNlckRhdGEoZGF0YSk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVVzZXJEYXRhXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8v6I635Y+W546p5a626YeR5biBXHJcbnVzZXIucmVxR2V0Q29pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcUdldENvaW4nLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLmNvaW4gPSBOdW1iZXIoZGF0YS5jb2luKVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVVc2VyRGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeOqeWutueahOmHkeW4gVwiLCBkYXRhKVxyXG4gICAgfSk7XHJcbn1cclxuLy/liLfmlrDnjqnlrrbpkrvnn7NcclxudXNlci5yZXFHZXREaWFtb25kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxR2V0RGlhbW9uZCcsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlhbW9uZCA9IE51bWJlcihkYXRhLmRpYW1vbmQpXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVVzZXJEYXRhXCIpO1xyXG4gICAgfSk7XHJcbn1cclxudXNlci5yZXFUb3VyaXN0TXlJbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxQWNjb3VudEJhc2UnLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLnRvdXJpc3RNeUluZm9EYXRhKGRhdGEpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVVc2VyRGF0YVwiKTtcclxuICAgIH0pXHJcbn07XHJcbnVzZXIucmVxQWNjb3VudE15SW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcUFjY291bnRNeUluZm8nLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLnBsYXllckxvZ2luRGF0YShkYXRhKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlVXNlckRhdGFcIik7XHJcbiAgICB9KVxyXG59O1xyXG4vKipcclxuICog6I635Y+W5Y+v5pu/5o2i5aS05YOP5YiX6KGoXHJcbiAqL1xyXG51c2VyLnJlcUdldEhlYWRMaXN0ID0gZnVuY3Rpb24gKHNleCwgbnVtYmVyKSB7XHJcbiAgICBsZXQgbXNnID0geyBcInNleFwiOiBzZXgsIFwibnVtYmVyXCI6IG51bWJlciB9XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxR2V0SGVhZExpc3RcIiwgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YS5yZXN1bHQpIGRhdGEucmVzdWx0W2tleV0gPSBgJHtkYXRhLnJlc3VsdFtrZXldfWA7XHJcbiAgICAgICAgdGhpcy5oZWFkTGlzdFtzZXhdID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwaGVhZGxpc3RcIiwgc2V4KTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog6I635Y+W5aWW6aG5XHJcbiAqL1xyXG51c2VyLnJlcURpYWxQcml6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFEaWFsUHJpemVcIiwgbnVsbCwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaWFsUHJpemVMaXN0ID0gZGF0YS50eXBlO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVEaWFsUHJpemVMaXN0XCIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICog6I635Y+W5oq95aWW57uT5p6cXHJcbiAqL1xyXG51c2VyLnJlcURpYWwgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgdGhpcy5teURpYWxSZXN1bHQgPSBudWxsO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcURpYWxcIiwgeyB0eXBlOiB0eXBlIH0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS51c2VyLlJlcVJlZERvdCgpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcUdldENvaW4oKTtcclxuICAgICAgICB0aGlzLmRpYWxTY29yZSA9IGRhdGEudHJlYXN1cmU7XHJcbiAgICAgICAgdGhpcy5teURpYWxSZXN1bHQgPSBkYXRhO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJnZXREaWFsUmVzdWx0XCIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICog6I635Y+W5oq95aWW6LeR6ams54Gv5pWw5o2uXHJcbiAqL1xyXG51c2VyLnJlcURpYWxIb3JzZUxhbnRlcm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmRpYWxIb3JzZURhdGEgPSBbXTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFEaWFsSG9yc2VMYW50ZXJuXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlhbEhvcnNlRGF0YSA9IGRhdGEuZGF0YTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWkp+WlluiusOW9lVxyXG4gKi9cclxudXNlci5yZXFEaWFsVG9wUHJpemVMb2cgPSBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgdGhpcy5kaWFsVG9wUHJpemUgPSBbXTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFEaWFsVG9wUHJpemVMb2dcIiwge3RpbWU6dGltZX0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlhbFRvcFByaXplID0gZGF0YS5kYXRhO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVUb3BQcml6ZVwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudXNlci5yZXFEaWFsSW50ZWdyYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxRGlhbEludGVncmFsXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlhbFNjb3JlID0gZGF0YS50cmVhc3VyZTtcclxuICAgICAgICB0aGlzLmJldERpYWxTY29yZSA9IGRhdGEuY2hpcF9pbjtcclxuICAgICAgICB0aGlzLnNjb3JlQmV0ID0gZGF0YS5zY29yZV9iZXQ7XHJcbiAgICAgICAgdGhpcy5kaWFsUmVmcmVzaFRpbWUgPSBkYXRhLnRpbWU7XHJcbiAgICAgICAgdGhpcy5kaWFsUmVmcmVzaFR5cGUgPSBkYXRhLnR5cGU7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZURpYWxTY29yZVwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluWkp+WlluiusOW9lVxyXG4gKi9cclxudXNlci5yZXFEaWFsUGVyc29uYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm15RGlhbFJlY29yZCA9IG51bGw7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxRGlhbFBlcnNvbmFsXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMubXlEaWFsUmVjb3JkID0gZGF0YS5kYXRhO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVNeVJlY29yZFwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmn6XnnIvnjqnlrrbmmK/lkKbmnInmlrDpgq7ku7ZcclxuICovXHJcbnVzZXIucmVxVW5yZWFkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcVVucmVhZFwiLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5yZXN1bHQgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5SZXFSZWREb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIOiOt+WPluW5v+WRilxyXG4gKi9cclxudXNlci5yZXFCaWxsYm9hcmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcUJpbGxib2FyZHNcIiwgbnVsbCwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXFCaWxsYm9hcmRzRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcImluaXRCaWxsQm9yYWRzVUlcIilcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog6K+35rGC546p5a626ZO26KGM6K6w5b2VXHJcbiAqL1xyXG51c2VyLnJlcUJhbmtDb2luTGlzdCA9IGZ1bmN0aW9uIChwYWdlLCBwYWdlc2l6ZSkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcUJhbmtDb2luTGlzdFwiLCB7IHBhZ2U6IHBhZ2UsIHBhZ2VzaXplOiBwYWdlc2l6ZSB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLmJhbmtyZWNvcmQgPSBkYXRhO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVCYW5rUmVjb3JkXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiDojrflj5bnjqnlrrbpgq7ku7bliJfooahcclxuICovXHJcbnVzZXIucmVxTWFpbExpc3QgPSBmdW5jdGlvbiAocGFnZSwgcGFnZV9zaXplLCB0eXBlLHRpbWUgPSBudWxsKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxTWFpbExpc3RcIiwgeyBwYWdlOiBwYWdlLCBwYWdlX3NpemU6IHBhZ2Vfc2l6ZSwgdHlwZTogdHlwZSx0aW1lOnRpbWUgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbEVtYWlsTXNnW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsRW1haWxNc2dbdHlwZV0gPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLkVtYWlsRGF0YS5tb25leVVucmVhZENvdW50ID0gZGF0YS5tb25leVVucmVhZENvdW50O1xyXG4gICAgICAgICAgICB0aGlzLkVtYWlsRGF0YS5zeXN0ZW1VbnJlYWRDb3VudCA9IGRhdGEuc3lzdGVtVW5yZWFkQ291bnQ7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVFbWFpbFwiLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IFwibWFpbGxpc3RcIiB8fCBkYXRhW2ldID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxFbWFpbE1zZ1t0eXBlXVtpXSA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEubWFpbGxpc3QubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsRW1haWxNc2dbdHlwZV0ubWFpbGxpc3QgPSB0aGlzLmFsbEVtYWlsTXNnW3R5cGVdLm1haWxsaXN0LmNvbmNhdChkYXRhLm1haWxsaXN0KTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVFbWFpbFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxuLy/liKDpmaTmjIflrprpgq7ku7ZcclxudXNlci5SZXFEZWxlT25lTWFpbCA9IGZ1bmN0aW9uIChtYWlsSUQpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5SZXFNYWlsRGVsXCIsIHsgaWQ6IG1haWxJRCB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlRGVsZU9uZU1haWxcIik7XHJcbiAgICB9KTtcclxufTtcclxuLy/liKDpmaTlhajpg6jpgq7ku7ZcclxudXNlci5SZXFEZWxlTWFpbCA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxTWFpbEFsbERlbFwiLCB7IHR5cGU6IHR5cGUgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZURlbGVNYWlsXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8v6K+75Y+W5YWo6YOo6YKu5Lu2XHJcbnVzZXIuUmVxQWxsUmVhZE1haWwgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcU1haWxBbHJlYWR5UmVhZFwiLCB7IHR5cGU6IHR5cGUgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVJlYWRBbGxNYWlsXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuLy/pooblj5bmjIflrprpgq7ku7bpmYTku7ZcclxudXNlci5SZXFNYWlsR2V0ID0gZnVuY3Rpb24gKG1haWxJRCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcU1haWxHZXRcIiwgeyBpZDogbWFpbElEIH0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVHZXRBdHRhY2hcIik7XHJcbiAgICAgICAgdGhpcy5yZXFHZXRDb2luKCk7XHJcbiAgICB9KTtcclxufTtcclxuLy/pooblj5blhajpg6jpgq7ku7bpmYTku7ZcclxudXNlci5SZXFNYWlsQWxsR2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcU1haWxBbGxHZXRcIiwge30sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVHZXRBbGxBdHRhY2hcIik7XHJcbiAgICAgICAgdGhpcy5yZXFHZXRDb2luKCk7XHJcbiAgICB9KTtcclxufTtcclxuLy/ojrflj5bmiYDmnInpgq7nrrHlhazlkYrkv6Hmga9cclxudXNlci5SZXFOb3RpY2UgPSBmdW5jdGlvbiAocGFnZSwgcGFnZV9zaXplKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxTm90aWNlXCIsIHsgcGFnZTogcGFnZSwgcGFnZV9zaXplOiBwYWdlX3NpemUgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbm5vdW5jZU1lbnQgPSBkYXRhO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVBbm5vdW5jZU1lbnRcIik7XHJcbiAgICB9KVxyXG59O1xyXG5cclxuLy/muIXnkIbpgq7ku7bnvJPlrZjmlofku7ZcclxudXNlci5jbGVhck1haWwgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgdHlwZSA/IHRoaXMuYWxsRW1haWxNc2dbdHlwZV0gPSBudWxsIDogdGhpcy5hbGxFbWFpbE1zZyA9IHt9O1xyXG4gICAgdGhpcy5FbWFpbERhdGEgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaMh+WumklE55qE6YKu5Lu25L+h5oGvXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYWlsSURcclxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcclxuICovXHJcbnVzZXIucmVxTWFpbEluZm8gPSBmdW5jdGlvbiAobWFpbElELCB0eXBlKSB7XHJcbiAgICBpZiAoIXRoaXMuYWxsRW1haWxNc2dbdHlwZV0pIHJldHVybjtcclxuICAgIGxldCBlbWFpbHMgPSB0aGlzLmFsbEVtYWlsTXNnW3R5cGVdW1wibWFpbGxpc3RcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVtYWlscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlbWFpbHNbaV0uaWQgPT0gTnVtYmVyKG1haWxJRCkgJiYgZW1haWxzW2ldLm1haWxfY29udGVudCkge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlRW1haWxDb250ZW50XCIsIGVtYWlsc1tpXSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxTWFpbEluZm9cIiwgeyBpZDogbWFpbElEIH0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW1haWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlbWFpbHNbaV0uaWQgPT0gZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgZW1haWxzW2ldLm1haWxfY29udGVudCA9IGRhdGEubWFpbF9jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZUVtYWlsQ29udGVudFwiLCBlbWFpbHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVtYWlsc1tpXS5zdGF0dXMgIT0gMSkgZW1haWxzW2ldLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcVJlZERvdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVtYWlscy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVFbWFpbENvbnRlbnRcIiwgZGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIOiOt+WPluWuouacjea2iOaBr1xyXG4gKi9cclxudXNlci5yZXFDdXN0b21TZXJ2ZXIgPSBmdW5jdGlvbiAocGFnZSwgc2l6ZSwgYm9vbCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcUN1c3RvbVNlcnZlclwiLCB7IHBhZ2U6IHBhZ2UsIHNpemU6IHNpemUsIGJvb2w6IGJvb2wgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAvL3RoaXMuY3VzdG9tU2V2ZXIgPSBtc2c7XHJcbiAgICAgICAgdGhpcy5jdXN0b21TZXZlciA9IG1zZztcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlQ3VzdG9tU2VydmVyXCIsIHRydWUpO1xyXG4gICAgfSwgXCJ2MlwiKVxyXG59O1xyXG5cclxudXNlci5SZXFDdXN0b21IZWxwTGlzdCA9IGZ1bmN0aW9uIChwYWdlLCBzaXplKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxQ3VzdG9tSGVscExpc3RcIiwgeyBwYWdlOiBwYWdlLCBzaXplOiBzaXplIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVJlcUN1c3RvbUhlbHBMaXN0XCIsIG1zZyk7XHJcbiAgICB9LCBcInYyXCIpXHJcbn1cclxuXHJcbnVzZXIuUmVxQ3VzdG9tU2VydmVyQ29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcUN1c3RvbVNlcnZlckNvbmZpZ1wiLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLkN1c3RvbVNlcnZlckNvbmZpZyA9IG1zZztcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlQ3VzdG9tU2VydmVyQ29uZmlnXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnVzZXIuUmVxQ3VzdG9tU2VydmVyUGhvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxQ3VzdG9tU2VydmVyUGhvbmVcIiwge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZUN1c3RvbVNlcnZlclBob25lXCIsIG1zZy5yZXN1bHQpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuKiDojrflj5bkvZnpop3lrp3mpoLop4jmjqXlj6NcclxuKi9cclxudXNlci5yZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5SZXFEaXNjb3VudENvaW5CYWxhbmNlU3VtbWFyeVwiLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLnl1YmFvT3ZlclZpZXcgPSBtc2c7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVl1QmFvU2VydmVyXCIpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog6I635Y+W5L2Z6aKd5a6d55Sz6K+35YiX6KGo5o6l5Y+jXHJcbiAqL1xyXG51c2VyLnJlcURpc2NvdW50Q29pbkJhbGFuY2UgPSBmdW5jdGlvbiAocGFnZSwgc2l6ZSkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxRGlzY291bnRDb2luQmFsYW5jZScsIHsgcGFnZTogcGFnZSwgc2l6ZTogc2l6ZSB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMueXViYW9SZWNvcmQgPSBtc2c7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVl1QmFvUmVjb3JkXCIpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog6I635Y+W5L2Z6aKd5a6d55Sz6aKGXHJcbiAqL1xyXG51c2VyLnJlcURpc2NvdW50Q29pbkJhbGFuY2VBcHBseSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcURpc2NvdW50Q29pbkJhbGFuY2VBcHBseScsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMueXViYW9BcHBseSA9IG1zZztcclxuICAgICAgICB0aGlzLnJlcUdldENvaW4oKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlWXVCYW9BcHBseVwiKTtcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOmHkeW4geWtmOWFpemTtuihjFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZ29sZFxyXG4gKi9cclxudXNlci5yZXFCYW5rU2F2ZSA9IGZ1bmN0aW9uIChnb2xkKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxQmFua1NhdmVcIiwgeyBjb2luOiBnb2xkIH0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLkJBTksuU0FWRS5mb3JtYXQodGhpcy5jdXRGbG9hdChnb2xkKSkpO1xyXG4gICAgICAgIHRoaXMuY29pbiAtPSBnb2xkO1xyXG4gICAgICAgIHRoaXMuYmFua19jb2luICs9IGdvbGQ7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVVzZXJEYXRhXCIpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVCYW5rU3VjY2Vzc1wiKTtcclxuICAgIH0pXHJcbn07XHJcbi8qKlxyXG4gKiDpk7booYzlj5blh7rph5HluIFcclxuICogQHBhcmFtIHtudW1iZXJ9IGdvbGRcclxuICogQHBhcmFtIHtzdHJpbmd9IHBzd1xyXG4gKi9cclxudXNlci5yZXFCYW5rVGFrZU91dCA9IGZ1bmN0aW9uIChnb2xkLCBwc3cpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFCYW5rVGFrZU91dFwiLCB7IGNvaW46IGdvbGQsIHBheV9wYXNzd29yZDogcHN3IH0sIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLkJBTksuVEFLRS5mb3JtYXQodGhpcy5jdXRGbG9hdChnb2xkKSkpO1xyXG4gICAgICAgIHRoaXMuY29pbiArPSBnb2xkO1xyXG4gICAgICAgIHRoaXMuYmFua19jb2luIC09IGdvbGQ7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVVzZXJEYXRhXCIpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVCYW5rU3VjY2Vzc1wiKTtcclxuICAgIH0pXHJcbn07XHJcbi8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbnVzZXIuY3V0RmxvYXQgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ2V0RmxvYXQoTnVtYmVyKG51bSkuZGl2KDEwMCkpKS50b1N0cmluZygpO1xyXG59O1xyXG4vL+a1rueCueWei+i/kOeul+WPluS/qeS9jVxyXG51c2VyLmdldEZsb2F0ID0gZnVuY3Rpb24gKHZhbHVlLCBudW0gPSAyKSB7XHJcbiAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICBpZiAofn52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQobnVtKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAg6YeN572u55So5oi35a+G56CBXHJcbiAqIEBwYXJhbSBtc2dcclxuICogQHBhcmFtIG5leHRcclxuICovXHJcbnVzZXIucmVxUmVzZXRQd2QgPSBmdW5jdGlvbiAobXNnLCBuZXh0KSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxUmVzZXRQd2RcIiwgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1RpcChtc2cudHlwZSA9PT0gMSA/IGdsR2FtZS50aXBzLlVTRVIuUEFTU1dPUkQuQUNDIDogZ2xHYW1lLnRpcHMuVVNFUi5QQVNTV09SRC5BTFApO1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog5pu05paw546p5a625pWw5o2uXHJcbiAqL1xyXG51c2VyLnVwZGF0ZVVzZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKCdyZXFteUluZm/mlbDmja4nLCBkYXRhKVxyXG4gICAgdGhpcy5lZGl0X3VzZXJuYW1lID0gZGF0YS5lZGl0X3VzZXJuYW1lO1xyXG4gICAgdGhpcy5xcSA9IGRhdGEucXE7XHJcbiAgICB0aGlzLndlY2hhdCA9IGRhdGEud2VjaGF0O1xyXG4gICAgdGhpcy5lbWFpbCA9IGRhdGEuZW1haWw7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmJpcnRoZGF5X21vbnRoID0gZGF0YS5iaXJ0aGRheV9tb250aDtcclxuICAgIHRoaXMuZ3JhZGVfaWQgPSBkYXRhLmdyYWRlX2lkO1xyXG4gICAgdGhpcy5ncmFkZV9uYW1lID0gZGF0YS5ncmFkZV9uYW1lO1xyXG4gICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja25hbWU7XHJcbiAgICB0aGlzLnVzZXJOYW1lID0gZGF0YS51c2VybmFtZTtcclxuICAgIHRoaXMudXNlcklEID0gZGF0YS5pZDtcclxuICAgIHRoaXMubG9naWNJRCA9IGRhdGEubG9naWNpZDtcclxuICAgIHRoaXMuY29pbiA9IGRhdGEuY29pbjtcclxuICAgIHRoaXMuZGlhbW9uZCA9IGRhdGEuZGlhbW9uZDtcclxuICAgIHRoaXMuYmFua19jb2luID0gZGF0YS5iYW5rX2NvaW47XHJcbiAgICB0aGlzLmd1YXJhbnRlZV9pbmNvbWUgPSBkYXRhLmd1YXJhbnRlZV9pbmNvbWU7XHJcbiAgICB0aGlzLnJlYWxfaW5jb21lID0gZGF0YS5yZWFsX2luY29tZTtcclxuICAgIHRoaXMucmVjZXNzaXZlX2NvaW4gPSBkYXRhLnJlY2Vzc2l2ZV9jb2luO1xyXG4gICAgdGhpcy5hY2NUeXBlID0gZGF0YS5wbGF0O1xyXG4gICAgdGhpcy5waG9uZSA9IGRhdGEucGhvbmU7XHJcbiAgICB0aGlzLmFsaXBheUFjYyA9IGRhdGEuYWxpcGF5O1xyXG4gICAgdGhpcy5hbGlwYXlOYW1lID0gZGF0YS5hbGlwYXlfbmFtZTtcclxuICAgIHRoaXMuYmFua0NhcmROdW0gPSBkYXRhLmJhbmtfY2FyZDtcclxuICAgIHRoaXMuYmFua0NhcmROYW1lID0gZGF0YS5iYW5rX25hbWU7XHJcbiAgICB0aGlzLmJhbmtDYXJkVHlwZSA9IGRhdGEuYmFua190eXBlO1xyXG4gICAgdGhpcy5oZWFkVVJMID0gZGF0YS5oZWFkdXJsO1xyXG4gICAgdGhpcy51c2VyU2V4ID0gZGF0YS5zZXg7XHJcbiAgICB0aGlzLnBheV9wYXNzd29yZCA9IGRhdGEucGF5X3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5kYWlseV93aW4gPSBkYXRhLmRhaWx5X3dpbjtcclxuICAgIHRoaXMuYWxsX3dpbiA9IGRhdGEuYWxsX3dpbjtcclxuICAgIHRoaXMudmlwX25hbWUgPSBkYXRhLnZpcExldmVsO1xyXG4gICAgdGhpcy5yb29tU3dpdGNoID0gZGF0YS5yb29tU3dpdGNoOy8v5piv5ZCm5a2Y5Zyo5oi/6Ze05Zy6XHJcbiAgICAvL+aYr+WQpuWPr+S7peS8muWRmO+8jOS7peWPiuWPr+S7peS8muWRmOaTjeS9nOmZkOWItlxyXG4gICAgdGhpcy5zdXNwaWNpb3VzID0gZGF0YS5zdXNwaWNpb3VzIC8vIOWPr+eWkeS8muWRmCAx5Y+v55aRIDIg6Z2e5Y+v55aRXHJcbiAgICB0aGlzLmlzX3JlY2VpdmVfcmVnaXN0ZXJfcGhvbmVfY29pbiA9IGRhdGEuaXNfcmVjZWl2ZV9yZWdpc3Rlcl9waG9uZV9jb2luLy/mmK/lkKbpooblj5bnu5HlrprmiYvmnLrnmoTms6jlhozlvanph5EgMO+8muWQpiAx77yaIOaYr1xyXG4gICAgdGhpcy5kZW1vX3BsYXllciA9IGRhdGEuZGVtb19wbGF5ZXI7XHJcbiAgICB0aGlzLmdhbWUgPSBkYXRhLmdhbWUgLy8g5piv5ZCm5Y+v5Lul5ri45oiPXHJcbiAgICB0aGlzLnBvaW50X3RyZWFzdXJlID0gZGF0YS5wb2ludF90cmVhc3VyZSAvL+enr+WIhuWkuuWunVxyXG4gICAgdGhpcy5iYWxhbmNlID0gZGF0YS5iYWxhbmNlIC8v5L2Z6aKd5a6dXHJcbiAgICB0aGlzLm1pc3Npb24gPSBkYXRhLm1pc3Npb24gLy/ku7vliqFcclxuICAgIHRoaXMucmVjZWl2ZV9kaXNjb3VudCA9IGRhdGEucmVjZWl2ZV9kaXNjb3VudCAvLyDpooblj5bkvJjmg6DmtLvliqhcclxuICAgIHRoaXMucmVjZWl2ZV9wcm9tb3Rpb25fYXdhcmQgPSBkYXRhLnJlY2VpdmVfcHJvbW90aW9uX2F3YXJkIC8vIOmihuWPluaOqOW5v+WlluWKsVxyXG4gICAgdGhpcy5yZWNlaXZlX3JlYmF0ZSA9IGRhdGEucmVjZWl2ZV9yZWJhdGUgLy/pooblj5bov5TmsLRcclxuICAgIHRoaXMucmVjZWl2ZV9TaWduaW5fYXdhcmQgPSBkYXRhLnJlY2VpdmVfU2lnbmluX2F3YXJkIC8vIOmihuWPluetvuWIsOWlluWKsVxyXG4gICAgdGhpcy53aXRoZHJhdyA9IGRhdGEud2l0aGRyYXcgLy8g5o+Q546wXHJcbiAgICB0aGlzLnJlY2hhcmdlID0gZGF0YS5yZWNoYXJnZSAvLyDlhYXlgLxcclxuICAgIHRoaXMuaXNfZ2FtZSA9IGRhdGEuaXNfZ2FtZSAvL+mSiOWvueeOqeWutua4uOaIj1xyXG4gICAgdGhpcy5pc19kZW1vX3BsYXllciA9IGRhdGEuaXNfZGVtb19wbGF5ZXI7IC8vIOaYr+WQpuS4uuivleeOqeS8muWRmCAx5pivIDIg5LiN5pivXHJcbiAgICB0aGlzLmlzX3dpdGhkcmF3ID0gZGF0YS5pc193aXRoZHJhdyAvLyDpkojlr7nnjqnlrrblj5bnjrBcclxuICAgIHRoaXMudGhpcmRDb2luTGltaXQgPSBkYXRhLnRoaXJkQ29pbkxpbWl0Oy8v56ys5LiJ5pa55YeG5YWl6YeR6aKdXHJcbiAgICB0aGlzLmp1ZGdlRm9yYmlkR2FtZSgpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdCgndXBkYXRlUGxhemFTd2l0Y2gnKVxyXG59O1xyXG51c2VyLmp1ZGdlRm9yYmlkR2FtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubGltaXRHYW1lID0gZmFsc2U7XHJcbiAgICB0aGlzLktpY2tPdXRHYW1lID0gZmFsc2U7XHJcbiAgICB0aGlzLmdhbWVFeGNlcHRpb24gPSBmYWxzZTtcclxuICAgIC8vIDbvvJrnpoHmraLlj5bnjrAgODrnpoHmraLpooblj5bov5TmsLQgOe+8muemgeatouenr+WIhuWkuuWunSAxMO+8muemgeatouWFheWAvCAxMe+8muemgeatoumihuWPluS8mOaDoOa0u+WKqCAxMu+8muemgeatoumihuWPluaOqOW5v+WlluWKsSAgIDEz77ya56aB5q2i6aKG5Y+W562+5Yiw5aWW5YqxXHJcbiAgICBpZiAoKHRoaXMuc3VzcGljaW91cyA9PSAxICYmIHRoaXMuZ2FtZSA9PSAyKSB8fCB0aGlzLmlzX2dhbWUgPT0gMiB8fCAodGhpcy5kZW1vX3BsYXllci5nYW1lID09IDIgJiYgdGhpcy5pc19kZW1vX3BsYXllciA9PSAxKSkge1xyXG4gICAgICAgIHRoaXMubGltaXRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLktpY2tPdXRHYW1lID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5saW1pdEdhbWUgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuLy8g5b2T5YmN5Y+v55aR5Lya5ZGYXHJcbnVzZXIuRG91YnRmdWxNZW1iZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHRoaXMuc3VzcGljaW91cyA9IGRhdGEuc3VzcGljaW91cyAvLyDlj6/nlpHkvJrlkZggMeWPr+eWkSAyIOmdnuWPr+eWkVxyXG4gICAgLy/ku6XkuIvlj4LmlbDln7rkuo7lj6/nlpHkvJrlkZggMeWPr+S7pSAyIOemgeatolxyXG4gICAgdGhpcy53aXRoZHJhdyA9IGRhdGEud2l0aGRyYXcgLy8g5o+Q546wXHJcbiAgICB0aGlzLnJlY2hhcmdlID0gZGF0YS5yZWNoYXJnZSAvLyDlhYXlgLxcclxuICAgIHRoaXMuZ2FtZSA9IGRhdGEuZ2FtZSAvLyDmmK/lkKblj6/ku6XmuLjmiI9cclxuICAgIHRoaXMucmVjZWl2ZV9yZWJhdGUgPSBkYXRhLnJlY2VpdmVfcmViYXRlIC8v6aKG5Y+W6L+U5rC0XHJcbiAgICB0aGlzLnBvaW50X3RyZWFzdXJlID0gZGF0YS5wb2ludF90cmVhc3VyZSAvL+enr+WIhuWkuuWunVxyXG4gICAgdGhpcy5yZWNlaXZlX2Rpc2NvdW50ID0gZGF0YS5yZWNlaXZlX2Rpc2NvdW50IC8vIOmihuWPluS8mOaDoOa0u+WKqFxyXG4gICAgdGhpcy5iYWxhbmNlID0gZGF0YS5iYWxhbmNlIC8v5L2Z6aKd5a6dXHJcbiAgICB0aGlzLm1pc3Npb24gPSBkYXRhLm1pc3Npb24gLy/ku7vliqFcclxuICAgIHRoaXMucmVjZWl2ZV9wcm9tb3Rpb25fYXdhcmQgPSBkYXRhLnJlY2VpdmVfcHJvbW90aW9uX2F3YXJkIC8vIOmihuWPluaOqOW5v+WlluWKsVxyXG4gICAgdGhpcy5yZWNlaXZlX1NpZ25pbl9hd2FyZCA9IGRhdGEucmVjZWl2ZV9TaWduaW5fYXdhcmQgLy8g6aKG5Y+W562+5Yiw5aWW5YqxXHJcbiAgICB0aGlzLmlzX2dhbWUgPSBkYXRhLmlzX2dhbWUgLy/pkojlr7nnjqnlrrbmuLjmiI9cclxuICAgIHRoaXMuaXNfd2l0aGRyYXcgPSBkYXRhLmlzX3dpdGhkcmF3IC8vIOmSiOWvueeOqeWutuWPlueOsFxyXG5cclxuICAgIC8vIOaWsOeahFxyXG4gICAgdGhpcy5yZWdpc3Rlcl9nb2xkX3R5cGUgPSBkYXRhLnJlZ2lzdGVyR29sZFR5cGU7Ly/otKfluIHljZXkvY0gIDHlhYMgIDLph5HluIFcclxuICAgIHRoaXMucmVnaXN0ZXJfZ29sZCA9IGRhdGEucmVnaXN0ZXJHaXZlR29sZDsvL+azqOWGjOi1oOmAgemHkeW4gVxyXG4gICAgdGhpcy5iaW5kX3Bob25lX2dvbGQgPSBkYXRhLmJpbmRQaG9uZUdpdmVHb2xkOy8v57uR5a6a5omL5py66LWg6YCB6YeR5biBXHJcbiAgICB0aGlzLnJlZ2lzdGVyX2RpYW1vbmQgPSBkYXRhLnJlZ2lzdGVyR2l2ZURpYW1vbmQ7Ly/ms6jlhozotaDpgIHpkrvnn7NcclxuICAgIHRoaXMuYmluZF9waG9uZV9kaWFtb25kID0gZGF0YS5iaW5kUGhvbmVHaXZlRGlhbW9uZDsvL+e7keWumuaJi+acuui1oOmAgemSu+efs1xyXG5cclxuICAgIHRoaXMudGlwcyA9IGRhdGEudGlwcztcclxuICAgIHRoaXMuaXNfZGVtb19wbGF5ZXIgPSBkYXRhLmlzX2RlbW9fcGxheWVyOyAvLyDmmK/lkKbkuLror5XnjqnkvJrlkZggMeaYryAyIOS4jeaYr1xyXG4gICAgdGhpcy5kZW1vX3BsYXllciA9IGRhdGEuZGVtb19wbGF5ZXI7IC8vMeWPr+S7pSAyIOemgeatolxyXG59XHJcbi8v5q2j5bi4546p5a6255m75b2VXHJcbnVzZXIucGxheWVyTG9naW5EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKCfmraPlvI/njqnlrrbmlbDmja4nLCBkYXRhKVxyXG4gICAgdGhpcy5hbGlwYXlBY2MgPSBkYXRhLmFsaXBheTtcclxuICAgIHRoaXMuYWxpcGF5TmFtZSA9IGRhdGEuYWxpcGF5X25hbWU7XHJcbiAgICB0aGlzLmJhbmtDYXJkTnVtID0gZGF0YS5iYW5rX2NhcmQ7XHJcbiAgICB0aGlzLmJhbmtDYXJkTmFtZSA9IGRhdGEuYmFua19uYW1lO1xyXG4gICAgdGhpcy5iYW5rX2NvaW4gPSBkYXRhLmJhbmtfY29pbjtcclxuICAgIHRoaXMuYmFua0NhcmRUeXBlID0gZGF0YS5iYW5rX3R5cGU7XHJcbiAgICB0aGlzLmJpcnRoZGF5X21vbnRoID0gZGF0YS5iaXJ0aGRheV9tb250aDtcclxuICAgIHRoaXMuYmluZFBob25lRmlyc3QgPSBkYXRhLmJpbmRfcGhvbmVfZmlyc3Q7XHJcbiAgICB0aGlzLmNvaW4gPSBkYXRhLmNvaW47XHJcbiAgICB0aGlzLmRpYW1vbmQgPSBkYXRhLmRpYW1vbmQ7XHJcbiAgICB0aGlzLmRlbW9fcGxheWVyID0gZGF0YS5kZW1vX3BsYXllcjsgLy8x5Y+v5LulIDIg56aB5q2i77yI6K+V546p5Lya5ZGY77yJXHJcbiAgICB0aGlzLmVkaXRfdXNlcm5hbWUgPSBkYXRhLmVkaXRfdXNlcm5hbWU7XHJcbiAgICB0aGlzLmVtYWlsID0gZGF0YS5lbWFpbDtcclxuICAgIHRoaXMuZ2FtZSA9IGRhdGEuZ2FtZSAvLyDmmK/lkKblj6/ku6XmuLjmiI9cclxuICAgIHRoaXMuZ3JhZGVfaWQgPSBkYXRhLmdyYWRlX2lkO1xyXG4gICAgdGhpcy5ncmFkZV9uYW1lID0gZGF0YS5ncmFkZV9uYW1lO1xyXG4gICAgdGhpcy5oZWFkVVJMID0gZGF0YS5oZWFkdXJsO1xyXG4gICAgdGhpcy51c2VySUQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5pc19kZW1vX3BsYXllciA9IGRhdGEuaXNfZGVtb19wbGF5ZXI7IC8vIOaYr+WQpuS4uuivleeOqeS8muWRmCAx5pivIDIg5LiN5pivXHJcbiAgICB0aGlzLmlzX2dhbWUgPSBkYXRhLmlzX2dhbWUgLy/pkojlr7nnjqnlrrbmuLjmiI9cclxuICAgIHRoaXMuaXNfd2l0aGRyYXcgPSBkYXRhLmlzX3dpdGhkcmF3IC8vIOmSiOWvueeOqeWutuWPlueOsFxyXG4gICAgdGhpcy5pc19yZWNlaXZlX3JlZ2lzdGVyX3Bob25lX2NvaW4gPSBkYXRhLmlzX3JlY2VpdmVfcmVnaXN0ZXJfcGhvbmVfY29pbi8v5piv5ZCm6aKG5Y+W57uR5a6a5omL5py655qE5rOo5YaM5b2p6YeRIDDvvJrlkKYgMe+8miDmmK9cclxuICAgIHRoaXMubG9naWNJRCA9IGRhdGEubG9naWNpZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMubmlja25hbWUgPSBkYXRhLm5pY2tuYW1lO1xyXG4gICAgdGhpcy5waG9uZSA9IGRhdGEucGhvbmU7XHJcbiAgICB0aGlzLnBvaW50X3RyZWFzdXJlID0gZGF0YS5wb2ludF90cmVhc3VyZSAvL+enr+WIhuWkuuWunVxyXG4gICAgdGhpcy5xcSA9IGRhdGEucXE7XHJcbiAgICB0aGlzLnJvb21Td2l0Y2ggPSBkYXRhLnJvb21Td2l0Y2g7Ly/mmK/lkKblrZjlnKjmiL/pl7TlnLogMOWFs+mXrSAx5byA5ZCvXHJcbiAgICB0aGlzLnJlY2hhcmdlID0gZGF0YS5yZWNoYXJnZSAvLyDlhYXlgLxcclxuICAgIHRoaXMucmVjZWl2ZV9yZWJhdGUgPSBkYXRhLnJlY2VpdmVfcmViYXRlIC8v6aKG5Y+W6L+U5rC0XHJcbiAgICB0aGlzLnJlY2VpdmVfZGlzY291bnQgPSBkYXRhLnJlY2VpdmVfZGlzY291bnQgLy8g6aKG5Y+W5LyY5oOg5rS75YqoXHJcbiAgICB0aGlzLmJhbGFuY2UgPSBkYXRhLmJhbGFuY2UgLy/kvZnpop3lrp1cclxuICAgIHRoaXMubWlzc2lvbiA9IGRhdGEubWlzc2lvbiAvL+S7u+WKoVxyXG4gICAgdGhpcy5yZWNlaXZlX3Byb21vdGlvbl9hd2FyZCA9IGRhdGEucmVjZWl2ZV9wcm9tb3Rpb25fYXdhcmQgLy8g6aKG5Y+W5o6o5bm/5aWW5YqxXHJcbiAgICB0aGlzLnJlY2VpdmVfU2lnbmluX2F3YXJkID0gZGF0YS5yZWNlaXZlX1NpZ25pbl9hd2FyZCAvLyDpooblj5bnrb7liLDlpZblirFcclxuXHJcbiAgICAvLyDmlrDnmoRcclxuICAgIHRoaXMucmVnaXN0ZXJfZ29sZF90eXBlID0gZGF0YS5yZWdpc3RlckdvbGRUeXBlOy8v6LSn5biB5Y2V5L2NICAx5YWDICAy6YeR5biBXHJcbiAgICB0aGlzLnJlZ2lzdGVyX2dvbGQgPSBkYXRhLnJlZ2lzdGVyR2l2ZUdvbGQ7Ly/ms6jlhozotaDpgIHph5HluIFcclxuICAgIHRoaXMuYmluZF9waG9uZV9nb2xkID0gZGF0YS5iaW5kUGhvbmVHaXZlR29sZDsvL+e7keWumuaJi+acuui1oOmAgemHkeW4gVxyXG4gICAgdGhpcy5yZWdpc3Rlcl9kaWFtb25kID0gZGF0YS5yZWdpc3RlckdpdmVEaWFtb25kOy8v5rOo5YaM6LWg6YCB6ZK755+zXHJcbiAgICB0aGlzLmJpbmRfcGhvbmVfZGlhbW9uZCA9IGRhdGEuYmluZFBob25lR2l2ZURpYW1vbmQ7Ly/nu5HlrprmiYvmnLrotaDpgIHpkrvnn7NcclxuXHJcbiAgICB0aGlzLnVzZXJTZXggPSBkYXRhLnNleDtcclxuICAgIHRoaXMuc3VzcGljaW91cyA9IGRhdGEuc3VzcGljaW91cyAvLyDlj6/nlpHkvJrlkZggMeWPr+eWkSAyIOmdnuWPr+eWkVxyXG4gICAgdGhpcy50aXBzID0gZGF0YS50aXBzO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlcm5hbWU7XHJcbiAgICB0aGlzLnZpcF9uYW1lID0gZGF0YS52aXBMZXZlbDtcclxuICAgIHRoaXMud2VjaGF0ID0gZGF0YS53ZWNoYXQ7XHJcbiAgICB0aGlzLndpdGhkcmF3ID0gZGF0YS53aXRoZHJhdyAvLyDmj5DnjrBcclxuXHJcbiAgICB0aGlzLnJlZERvdERhdGEgPSBkYXRhLnJlZERvdFxyXG4gICAgdGhpcy51c2VyUmVjaGFyZ2UgPSBkYXRhLmZpcnN0UGF5XHJcblxyXG4gICAgdGhpcy5wcm9oaWJpdEJpbmRQaG9uZSA9IGRhdGEucHJvaGliaXRCaW5kUGhvbmVcclxuICAgIC8vIHRoaXMucmVkRG90RGF0YSA9IGRhdGEucmVzdWx0O1xyXG4gICAgLy8gdGhpcy51c2VyUmVjaGFyZ2UgPSBtc2c7XHJcbiAgICAvLyBcclxuICAgIC8vaG9tZVZpZXdcclxuICAgIHRoaXMuc2lnbmluU3dpdGNoID0gZGF0YS5ob21lVmlldy5zaWduaW47XHJcbiAgICB0aGlzLnJlYmF0ZVN3aXRjaCA9IGRhdGEuaG9tZVZpZXcucmViYXRlOyAvLyDmjqfliLbov5TmsLTmjInpkq7mmK/lkKbmmL7npLpcclxuICAgIHRoaXMucmViYXRlU3dpdGNoRXggPSBkYXRhLnJlYmF0ZVN3aXRjaDsgLy8g5o6n5Yi26L+U5rC05piv5ZCm56aB55SoXHJcbiAgICB0aGlzLm1pc3Npb25Td2l0Y2ggPSBkYXRhLmhvbWVWaWV3Lm1pc3Npb25Td2l0Y2g7XHJcbiAgICB0aGlzLmRpYWxTd2l0Y2ggPSBkYXRhLmhvbWVWaWV3LmRpYWw7XHJcbiAgICB0aGlzLnNpZ25fc3RhdGUgPSBkYXRhLmhvbWVWaWV3LnNpZ25fc3RhdGU7XHJcbiAgICB0aGlzLmxvZ2luU3dpdGNoID0gZGF0YS5ob21lVmlldy5sb2dpblN3aXRjaDtcclxuXHJcblxyXG4gICAgLy/ova7mkq3lm75cclxuICAgIHRoaXMucmVxQmlsbGJvYXJkc0RhdGEgPSBkYXRhLmJpbGxib2FyZHM7XHJcblxyXG4gICAgLy/mlrDliIbnsbvmlbDmja5cclxuICAgIHRoaXMuZ2FtZURpc3BsYXlUeXBlID0gZGF0YS5nYW1lR3JvdXAudHlwZTtcclxuICAgIHRoaXMuZ2FtZURpc3BsYXlUb2tlbiA9IGRhdGEuZ2FtZUdyb3VwLnRva2VuO1xyXG4gICAgdGhpcy5nYW1lRGlzcGxheVR5cGVMaXN0ID0gZGF0YS5nYW1lR3JvdXAudHlwZUxpc3Q7XHJcbiAgICB0aGlzLmludGVyRmFjZU1vZGUgPSBkYXRhLmdhbWVHcm91cC5tb2RlO1xyXG5cclxuICAgIC8vIOiAgeWIhuexu+aVsOaNrlxyXG4gICAgdGhpcy5nYW1ldHlwZUxpc3QgPSBkYXRhLmdhbWVHcm91cC5nYW1lO1xyXG4gICAgdGhpcy53ZWJHYW1lVXJsID0gZGF0YS5nYW1lR3JvdXAudXJsO1xyXG4gICAgLy9nYW1lR2FtZUxpc3RcclxuICAgIHRoaXMuZ2FtZUxpc3QgPSBkYXRhLmdhbWVMaXN0O1xyXG5cclxuICAgIC8v6LeR6ams54GvXHJcbiAgICBnbEdhbWUubm90aWNlLmFkZEhvcnNlUmFjZUxhbXAoZGF0YS5ob3JzZVJhY2VMYW1wKTtcclxuICAgIC8vIOWFrOWRilxyXG4gICAgdGhpcy5lbWVyZ2VudE5vdGljZSA9IGRhdGEuZW1lcmdlbnROb3RpY2U7XHJcbiAgICAvL+esrOS4ieaWueWHhuWFpemHkeminVxyXG4gICAgdGhpcy50aGlyZENvaW5MaW1pdCA9IGRhdGEudGhpcmRDb2luTGltaXQ7XHJcblxyXG5cclxuXHJcbiAgICB0aGlzLmd1YXJhbnRlZV9pbmNvbWUgPSBkYXRhLmd1YXJhbnRlZV9pbmNvbWU7XHJcbiAgICB0aGlzLnJlYWxfaW5jb21lID0gZGF0YS5yZWFsX2luY29tZTtcclxuICAgIHRoaXMucmVjZXNzaXZlX2NvaW4gPSBkYXRhLnJlY2Vzc2l2ZV9jb2luO1xyXG4gICAgdGhpcy5hY2NUeXBlID0gZGF0YS5wbGF0O1xyXG4gICAgdGhpcy5wYXlfcGFzc3dvcmQgPSBkYXRhLnBheV9wYXNzd29yZDtcclxuICAgIHRoaXMuZGFpbHlfd2luID0gZGF0YS5kYWlseV93aW47XHJcbiAgICB0aGlzLmFsbF93aW4gPSBkYXRhLmFsbF93aW47XHJcblxyXG59O1xyXG5cclxuLy8g5ri45a6i55m75b2V5pWw5o2uXHJcbnVzZXIudG91cmlzdE15SW5mb0RhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coJ+a4uOWuoueZu+W9leaVsOaNrsK3wrfCt8K3wrfCtycsIGRhdGEpXHJcbiAgICB0aGlzLmVkaXRfdXNlcm5hbWUgPSAyOyAgLy8xLuWPr+S7peS/ruaUuei0puWPt1xyXG4gICAgdGhpcy5xcSA9IFwiXCI7ICAgICAgICAgICAgIC8vcXFcclxuICAgIHRoaXMud2VjaGF0ID0gXCJcIjsgICAgICAgICAvL+W+ruS/oVxyXG4gICAgdGhpcy5lbWFpbCA9IFwiXCI7ICAgICAgICAgIC8v6YKu566xXHJcbiAgICB0aGlzLnBob25lID0gXCJcIjsgICAgICAgICAgLy/miYvmnLpcclxuICAgIHRoaXMuYnJpdGhkYXkgPSBcIlwiOyAgICAgICAvL+eUn+aXpVxyXG5cclxuICAgIHRoaXMuYmFua19jb2luID0gMDtcclxuICAgIHRoaXMucGhvbmUgPSBcIlwiO1xyXG4gICAgLy8g5YWF5YC85pyJ5YWz5L+h5oGvXHJcbiAgICB0aGlzLmFsaXBheUFjYyA9IFwiXCI7XHJcbiAgICB0aGlzLmFsaXBheU5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5iYW5rQ2FyZE51bSA9IFwiXCI7XHJcbiAgICB0aGlzLmJhbmtDYXJkTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLmJhbmtDYXJkVHlwZSA9IFwiXCI7XHJcbiAgICB0aGlzLnVzZXJTZXggPSAxOyAgICAgICAgLy/mgKfliKtcclxuXHJcbiAgICB0aGlzLmdyYWRlX25hbWUgPSAn5ri45a6iJztcclxuICAgIHRoaXMuc3VzcGljaW91cyA9IDIgLy8g5Y+v55aR5Lya5ZGYIDHlj6/nlpEgMiDpnZ7lj6/nlpFcclxuICAgIHRoaXMudmlwX25hbWUgPSAwOyAgLy8gIFZJUOetiee6p1xyXG4gICAgLy/ku6XkuIvlj4LmlbDln7rkuo7lj6/nlpHkvJrlkZggMeWPr+S7pSAyIOemgeatolxyXG4gICAgdGhpcy53aXRoZHJhdyA9IDIgLy8g5o+Q546wXHJcbiAgICB0aGlzLnJlY2hhcmdlID0gMiAvLyDlhYXlgLxcclxuICAgIHRoaXMuaXNfd2l0aGRyYXcgPSAxLy8g6ZKI5a+5546p5a625Y+W546wXHJcbiAgICB0aGlzLmlzX3JlY2VpdmVfcmVnaXN0ZXJfcGhvbmVfY29pbiA9IDAvL+aYr+WQpumihuWPlue7keWumuaJi+acuueahOazqOWGjOW9qemHkSAw77ya5ZCmIDHvvJog5pivXHJcbiAgICB0aGlzLnRpcHMgPSBkYXRhLnRpcHNcclxuICAgIHRoaXMuZ3JhZGVfaWQgPSBkYXRhLmdyYWRlX2lkO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlcm5hbWU7ICAgICAgIC8vIOeOqeWutuaYteensFxyXG4gICAgdGhpcy5jb2luID0gZGF0YS5jb2luO1xyXG4gICAgdGhpcy5kaWFtb25kID0gZGF0YS5kaWFtb25kO1xyXG4gICAgdGhpcy51c2VySUQgPSBOdW1iZXIoZGF0YS5pZCk7XHJcblxyXG4gICAgLy8g5paw55qEXHJcbiAgICB0aGlzLnJlZ2lzdGVyX2dvbGRfdHlwZSA9IGRhdGEucmVnaXN0ZXJHb2xkVHlwZTsvL+i0p+W4geWNleS9jSAgMeWFgyAgMumHkeW4gVxyXG4gICAgdGhpcy5yZWdpc3Rlcl9nb2xkID0gZGF0YS5yZWdpc3RlckdpdmVHb2xkOy8v5rOo5YaM6LWg6YCB6YeR5biBXHJcbiAgICB0aGlzLmJpbmRfcGhvbmVfZ29sZCA9IGRhdGEuYmluZFBob25lR2l2ZUdvbGQ7Ly/nu5HlrprmiYvmnLrotaDpgIHph5HluIFcclxuICAgIHRoaXMucmVnaXN0ZXJfZGlhbW9uZCA9IGRhdGEucmVnaXN0ZXJHaXZlRGlhbW9uZDsvL+azqOWGjOi1oOmAgemSu+efs1xyXG4gICAgdGhpcy5iaW5kX3Bob25lX2RpYW1vbmQgPSBkYXRhLmJpbmRQaG9uZUdpdmVEaWFtb25kOy8v57uR5a6a5omL5py66LWg6YCB6ZK755+zXHJcblxyXG4gICAgdGhpcy5sb2dpY0lEID0gZGF0YS5sb2dpY2lkOyAgICAgICAgICAgIC8v5ri45a6ibG9naWNJZFxyXG4gICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja25hbWU7ICAgICAgICAgLy/muLjlrqLmmLXnp7BcclxuICAgIHRoaXMuaGVhZFVSTCA9IGRhdGEuaGVhZHVybDtcclxuICAgIHRoaXMuZ2FtZSA9IGRhdGEuZ2FtZSAvLyDmmK/lkKblj6/ku6XmuLjmiI8gIFxyXG4gICAgdGhpcy5yZWNlaXZlX3JlYmF0ZSA9IGRhdGEucmVjZWl2ZV9yZWJhdGUgLy/pooblj5bov5TmsLRcclxuICAgIHRoaXMucG9pbnRfdHJlYXN1cmUgPSBkYXRhLnBvaW50X3RyZWFzdXJlIC8v56ev5YiG5aS65a6dXHJcbiAgICB0aGlzLnJlY2VpdmVfZGlzY291bnQgPSBkYXRhLnJlY2VpdmVfZGlzY291bnQgLy8g6aKG5Y+W5LyY5oOg5rS75YqoXHJcbiAgICB0aGlzLmJhbGFuY2UgPSBkYXRhLmJhbGFuY2UgLy/kvZnpop3lrp1cclxuICAgIHRoaXMubWlzc2lvbiA9IGRhdGEubWlzc2lvbiAvL+S7u+WKoVxyXG4gICAgdGhpcy5yZWNlaXZlX3Byb21vdGlvbl9hd2FyZCA9IGRhdGEucmVjZWl2ZV9wcm9tb3Rpb25fYXdhcmQgLy8g6aKG5Y+W5o6o5bm/5aWW5YqxXHJcbiAgICB0aGlzLnJlY2VpdmVfU2lnbmluX2F3YXJkID0gZGF0YS5yZWNlaXZlX1NpZ25pbl9hd2FyZCAvLyDpooblj5bnrb7liLDlpZblirFcclxuICAgIHRoaXMuaXNfZ2FtZSA9IE51bWJlcihkYXRhLmlzX2dhbWUpIC8v6ZKI5a+5546p5a626L+b5YWl5ri45oiPXHJcbiAgICB0aGlzLmlzX2RlbW9fcGxheWVyID0gTnVtYmVyKGRhdGEuaXNfZGVtb19wbGF5ZXIpOyAvLyDmmK/lkKbkuLror5XnjqnkvJrlkZggMeaYryAyIOS4jeaYr1xyXG4gICAgdGhpcy5kZW1vX3BsYXllciA9IHt9OyAvL+i0puWPt+aYr+WQpuW8guW4uCAgMeWPr+S7pSAyIOemgeatolxyXG4gICAgdGhpcy5iaW5kUGhvbmVGaXJzdCA9IDA7XHJcbiAgICB0aGlzLnVzZXJSZWNoYXJnZSA9IHt9OyAgICAgLy8g6I635Y+W546p5a625piv5ZCm6aaW5YayXHJcbiAgICB0aGlzLnVzZXJSZWNoYXJnZS5leGlzdHMgPSAwO1xyXG4gICAgdGhpcy51c2VyUmVjaGFyZ2UuZGlzY291bnQgPSAwO1xyXG4gICAgdGhpcy51c2VyUmVjaGFyZ2UuZGlzY291bnRfbWF4ID0gMDtcclxuICAgIHRoaXMucmVkRG90RGF0YSA9IHt9O1xyXG4gICAgdGhpcy5yb29tU3dpdGNoID0gZGF0YS5yb29tU3dpdGNoOy8v5piv5ZCm5a2Y5Zyo5oi/6Ze05Zy6XHJcbiAgICB0aGlzLnByb2hpYml0QmluZFBob25lID0gZGF0YS5wcm9oaWJpdEJpbmRQaG9uZVxyXG4gICAgLy9ob21lVmlld1xyXG4gICAgdGhpcy5zaWduaW5Td2l0Y2ggPSBkYXRhLmhvbWVWaWV3LnNpZ25pbjtcclxuICAgIHRoaXMucmViYXRlU3dpdGNoID0gZGF0YS5ob21lVmlldy5yZWJhdGU7XHJcbiAgICB0aGlzLm1pc3Npb25Td2l0Y2ggPSBkYXRhLmhvbWVWaWV3Lm1pc3Npb25Td2l0Y2g7XHJcbiAgICB0aGlzLmRpYWxTd2l0Y2ggPSBkYXRhLmhvbWVWaWV3LmRpYWw7XHJcbiAgICB0aGlzLnNpZ25fc3RhdGUgPSBkYXRhLmhvbWVWaWV3LnNpZ25fc3RhdGU7XHJcbiAgICB0aGlzLmxvZ2luU3dpdGNoID0gZGF0YS5ob21lVmlldy5sb2dpblN3aXRjaDtcclxuICAgIC8v6L2u5pKt5Zu+XHJcbiAgICB0aGlzLnJlcUJpbGxib2FyZHNEYXRhID0gZGF0YS5iaWxsYm9hcmRzO1xyXG5cclxuICAgIC8v5paw5YiG57G75pWw5o2uXHJcbiAgICB0aGlzLmdhbWVEaXNwbGF5VHlwZSA9IGRhdGEuZ2FtZUdyb3VwLnR5cGU7XHJcbiAgICB0aGlzLmdhbWVEaXNwbGF5VG9rZW4gPSBkYXRhLmdhbWVHcm91cC50b2tlbjtcclxuICAgIHRoaXMuZ2FtZURpc3BsYXlUeXBlTGlzdCA9IGRhdGEuZ2FtZUdyb3VwLnR5cGVMaXN0O1xyXG4gICAgdGhpcy5pbnRlckZhY2VNb2RlID0gZGF0YS5nYW1lR3JvdXAubW9kZTtcclxuXHJcbiAgICAvLyDogIHliIbnsbvmlbDmja5cclxuICAgIHRoaXMuZ2FtZXR5cGVMaXN0ID0gZGF0YS5nYW1lR3JvdXAuZ2FtZTtcclxuICAgIHRoaXMud2ViR2FtZVVybCA9IGRhdGEuZ2FtZUdyb3VwLnVybDtcclxuICAgIC8vZ2FtZUdhbWVMaXN0XHJcbiAgICB0aGlzLmdhbWVMaXN0ID0gZGF0YS5nYW1lTGlzdDtcclxuXHJcbiAgICAvL+i3kemprOeBr1xyXG4gICAgZ2xHYW1lLm5vdGljZS5hZGRIb3JzZVJhY2VMYW1wKGRhdGEuaG9yc2VSYWNlTGFtcCk7XHJcbiAgICAvLyDlhazlkYpcclxuICAgIHRoaXMuZW1lcmdlbnROb3RpY2UgPSBkYXRhLmVtZXJnZW50Tm90aWNlO1xyXG4gICAgdGhpcy5yZWdpc3RlckdldENvaW4gPSAwOyAgICAgICAvL+azqOWGjOekvOmHkVxyXG4gICAgdGhpcy5yZWdpc3RlckdldERpYW1vbmQgPSAwOyAgICAgICAvL+azqOWGjOmSu+efs1xyXG5cclxuICAgIC8v56ys5LiJ5pa55YeG5YWl6YeR6aKdXHJcbiAgICB0aGlzLnRoaXJkQ29pbkxpbWl0ID0gZGF0YS50aGlyZENvaW5MaW1pdDtcclxuICAgIC8vIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJpbml0QmlsbEJvcmFkc1VJXCIpXHJcbiAgICAvLyBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXNlcnVybGRhdGFcIilcclxuICAgIC8vIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVQbGF6YVN3aXRjaFwiKVxyXG4gICAgLy8gaWYodGhpcy5ncmFkZV9pZCAhPSAxKXtcclxuICAgIC8vICAgICB0aGlzLnJlcUFjY291bnRNeUluZm8oKTtcclxuICAgIC8vICAgICAvLyB0aGlzLnJlcU15SW5mbygpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG51c2VyLnJlc2V0QXdhcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdGVyR2V0Q29pbiA9IDA7ICAgICAgIC8v5rOo5YaM56S86YeRXHJcbiAgICB0aGlzLnJlZ2lzdGVyR2V0RGlhbW9uZCA9IDA7ICAgICAgIC8v5rOo5YaM6ZK755+zXHJcbn1cclxuXHJcbi8v5qOA5p+l5omL5py65piv5ZCm5Zyo56aB5q2i5YiX6KGo5LmL5YaFXHJcbnVzZXIuY2hlY2tQaG9uZSA9IGZ1bmN0aW9uIChwaG9uZU51bWJlcikge1xyXG4gICAgbGV0IFN0cmluZ19udW1iZXIgPSBwaG9uZU51bWJlci50b1N0cmluZygpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2hpYml0QmluZFBob25lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGRyYXcgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucHJvaGliaXRCaW5kUGhvbmVbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvaGliaXRCaW5kUGhvbmVbaV1bal0gIT0gU3RyaW5nX251bWJlcltqXSkge1xyXG4gICAgICAgICAgICAgICAgZHJhdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkcmF3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbi8qKlxyXG4gKiDmmK/lkKbmuLjlrqJcclxuICovXHJcbnVzZXIuaXNUb3VyaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUEhQIOivtOagueaNriByZXFNeUluZm8g5Y2P6K6u5pWw5o2u55qEIHVzZXJuYW1lIOWIpOaWreaYr+WQpuS6hue7keWumuaJi+aculxyXG4gICAgLy8g5rKh5pyJ57uR5a6a5omL5py65bCx5piv5ri45a6iXHJcbiAgICByZXR1cm4gdGhpcy5ncmFkZV9pZCA9PSAxO1xyXG59O1xyXG4vKipcclxuICog5piv5ZCm57uR5a6a5pSv5LuY5a6dXHJcbiAqL1xyXG51c2VyLmlzQmluZEFsaXBheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmFsaXBheUFjYyAhPT0gXCJcIjtcclxufTtcclxuLyoqXHJcbiAqIOaYr+WQpue7keWumumTtuihjOWNoVxyXG4gKi9cclxudXNlci5pc0JpbmRCYW5rQ2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhbmtDYXJkTnVtICE9PSBcIlwiO1xyXG59O1xyXG5cclxudXNlci5SZXFEb3VidGZ1bE1lbWJlckluZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFEb3VidGZ1bE1lbWJlckluZm8nLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLkRvdWJ0ZnVsTWVtYmVyRGF0YShtc2cpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3lj6/nlpHkvJrlkZhcIiwgbXNnKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmjqjlub/liIbkuqvlvIDlhbNcclxuICogQHBhcmFtIHtPYmplY3R9IG1zZ1xyXG4gKi9cclxudXNlci5yZXFVc2VyRXh0ZW5zaW9uU3dpdGNoID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxVXNlckV4dGVuc2lvblN3aXRjaCcsIG1zZywgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiY2hlY2tFeHRlbnNpb25Td2l0Y2hcIiwgbXNnLnN3aXRjaCk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIOe7keWumuaUr+S7mOWunVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxpcGF5SURcclxuICogQHBhcmFtIHtzdHJpbmd9IGFsaXBheU5hbWVcclxuICovXHJcbnVzZXIucmVxQmluZEFsaXBheSA9IGZ1bmN0aW9uIChhbGlwYXlJRCwgYWxpcGF5TmFtZSkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxQmluZEFsaXBheScsIHsgYWxpcGF5OiBhbGlwYXlJRCwgYWxpcGF5X25hbWU6IGFsaXBheU5hbWUgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLlJlcUdldENhc2hPdXRCaW5kSW5mbyhEUkFXX1RZUEUuQUxJUEFZKVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJiaW5kUGF5U3VjY2Vzc1wiKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1RpcChnbEdhbWUudGlwcy5VU0VSLkJJTkQuQUxQKTtcclxuICAgIH0pXHJcbn07XHJcbi8qKlxyXG4gKiDnu5Hlrprpk7booYzljaFcclxuICogQHBhcmFtIHtudW1iZXJ9IGJhbmtfaWQg6ZO26KGMaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGJhbmtfY2FyZCDpk7booYzljaHlj7dcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg6ZO26KGM5Y2h5omA5pyJ5Lq6562+5ZCNXHJcbiAqL1xyXG51c2VyLnJlcUJpbmRCYW5rID0gZnVuY3Rpb24gKGJhbmtfaWQsIGJhbmtfY2FyZCwgbmFtZSkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxQmluZEJhbmsnLCB7IGJhbmtfaWQ6IGJhbmtfaWQsIGJhbmtfY2FyZDogYmFua19jYXJkLCBuYW1lOiBuYW1lIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5SZXFHZXRDYXNoT3V0QmluZEluZm8oRFJBV19UWVBFLkJBTkspXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcImJpbmRQYXlTdWNjZXNzXCIpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLlVTRVIuQklORC5CQU5LKTtcclxuICAgIH0pXHJcbn07XHJcblxyXG4vL+iOt+WPluW9k+WJjee7keWumueahOmTtuihjOWNoeS7peWPiuaUr+S7mOWuneS/oeaBrzEu6ZO26KGM5Y2hMi7mlK/ku5jlrp1cclxudXNlci5SZXFHZXRDYXNoT3V0QmluZEluZm8gPSBmdW5jdGlvbiAodHlwZUlkKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFHZXRDYXNoT3V0QmluZEluZm8nLCB7IHR5cGU6IHR5cGVJZCB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBpZiAodHlwZUlkID09IERSQVdfVFlQRS5CQU5LKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFua0NhcmRUeXBlID0gZGF0YS5iYW5rX3R5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYmFua0NhcmROdW0gPSBkYXRhLmJhbmtfY2FyZDtcclxuICAgICAgICAgICAgdGhpcy5iYW5rQ2FyZE5hbWUgPSBkYXRhLmJhbmtfbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5hbGlwYXlOYW1lID0gZGF0YS5iYW5rX25hbWVcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5iYW5rX25hbWVcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVJZCA9PSBEUkFXX1RZUEUuQUxJUEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpcGF5QWNjID0gZGF0YS5hbGlwYXk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpcGF5TmFtZSA9IGRhdGEuYWxpcGF5X25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmFua0NhcmROYW1lID0gZGF0YS5hbGlwYXlfbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5hbGlwYXlfbmFtZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5LiN5a2Y5Zyo55qE57G75Z6LXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVVc2VyRGF0YVwiKTtcclxuXHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDnjqnlrrbmj5DnjrBcclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCDmj5DnjrDmlbDpop1cclxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGUg5o+Q546w5pa55byPOiAyOiDpk7booYzljaEgMTog5pSv5LuY5a6dXHJcbiAqL1xyXG51c2VyLnJlcVdpdGhkcmF3ID0gZnVuY3Rpb24gKGFtb3VudCwgdHlwZSwgcHdkKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFXaXRoZHJhdycsIHsgYW1vdW50OiBhbW91bnQubXVsKDEwMCksIHR5cGU6IHR5cGUsIGNvZGU6IHB3ZCB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMucmVxR2V0Q29pbigpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ3aXRoZHJhd1N1Y2Nlc3NcIiwgYW1vdW50Lm11bCgxMDApKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog5om+5Zue5a+G56CB5Y+R6YCB6aqM6K+B56CBXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2cgIHR5cGUgOOS4uuaJvuWbnuWvhueggVxyXG4gKi9cclxudXNlci5SZXFQb3N0UGhvbmVDb2RlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgaWYgKCF0aGlzLmNoZWNrUGhvbmUobXNnLnBob25lKSkge1xyXG4gICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuVkVSSUZZQ09ERS5TRU5ERkFJTEVEKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5wb3N0UGhvbmVTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucG9zdFBob25lU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucG9zeVBob25lVGltZW91dCA9IHRoaXMucG9zeVBob25lVGltZW91dCB8fCBbXTtcclxuICAgICAgICB0aGlzLnBvc3lQaG9uZVRpbWVvdXQucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0UGhvbmVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDE1MDApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuVVNFUi5WRVJJRllDT0RFLlNFTkRUT09CVVNZKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJldHJpZXZlUHN3U3RhdGUpIHJldHVybjtcclxuICAgIHRoaXMucmV0cmlldmVQc3dTdGF0ZSA9IHRydWU7XHJcbiAgICB0aGlzLnJldHJpZXZlVXBkYXRlVmVyaWZpQ0QgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucmV0cmlldmVWZXJpZmlDRCA8IDApIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJldHJpZXZlVXBkYXRlVmVyaWZpQ0QpO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlVXBkYXRlVmVyaWZpQ0QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlVmVyaWZpQ0QgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVBzd1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInJldHJpZXZlUHN3Q0RcIiwgdGhpcy5yZXRyaWV2ZVZlcmlmaUNEKTtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVZlcmlmaUNELS07XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMClcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBvc3RQaG9uZUNvZGUnLCBtc2csIChyb3V0ZSwgbXNnKSA9PiB7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiDmuIXpmaTmib7lm57lr4bnoIHlrprml7blmahcclxuICovXHJcbnVzZXIuY2xlYXJQb3N0UGhvbmVJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnJldHJpZXZlVXBkYXRlVmVyaWZpQ0QpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMucmV0cmlldmVVcGRhdGVWZXJpZmlDRCk7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVVwZGF0ZVZlcmlmaUNEID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJldHJpZXZlVmVyaWZpQ0QgPSA2MDtcclxuICAgICAgICB0aGlzLnJldHJpZXZlUHN3U3RhdGUgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOaJi+acuueZu+W9leWPkemAgemqjOivgeeggVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnICB0eXBlIDkg5omL5py655m75b2VXHJcbiAqL1xyXG51c2VyLnJlcVBob25lQ29kZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGlmICghdGhpcy5jaGVja1Bob25lKG1zZy5waG9uZSkpIHtcclxuICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5VU0VSLlZFUklGWUNPREUuU0VOREZBSUxFRCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMubG9naW5QaG9uZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblBob25lU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9naW5QaG9uZVRpbWVvdXQgPSB0aGlzLmxvZ2luUGhvbmVUaW1lb3V0IHx8IFtdO1xyXG4gICAgICAgIHRoaXMubG9naW5QaG9uZVRpbWVvdXQucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblBob25lU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9LCAxNTAwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuVkVSSUZZQ09ERS5TRU5EVE9PQlVTWSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5waG9uZUNvZGVTdGF0ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5waG9uZUNvZGVTdGF0ZSA9IHRydWU7XHJcbiAgICB0aGlzLnBob25lVXBkYXRlVmVyaWZpQ0QgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy52ZXJpZmlUeXBlID0gbXNnLnR5cGVcclxuICAgICAgICBpZiAodGhpcy5waG9uZUxvZ2luVmVyaWZpQ0QgPCAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5waG9uZVVwZGF0ZVZlcmlmaUNEKTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZVVwZGF0ZVZlcmlmaUNEID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUxvZ2luVmVyaWZpQ0QgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJwaG9uZUNvZGVDRFwiLCB0aGlzLnBob25lTG9naW5WZXJpZmlDRCk7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVMb2dpblZlcmlmaUNELS07XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMClcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBvc3RQaG9uZUNvZGUnLCBtc2csIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIOazqOWGjOi0puWPt+aJi+acuuWPkemAgemqjOivgeeggVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnICB0eXBlIDkg5omL5py655m75b2VXHJcbiAqL1xyXG51c2VyLnJlcVJlZ2lzdFBob25lQ29kZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGlmICghdGhpcy5jaGVja1Bob25lKG1zZy5waG9uZSkpIHtcclxuICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5VU0VSLlZFUklGWUNPREUuU0VOREZBSUxFRCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnaXN0UGhvbmVTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0UGhvbmVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RQaG9uZVRpbWVvdXQgPSB0aGlzLnJlZ2lzdFBob25lVGltZW91dCB8fCBbXTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFBob25lVGltZW91dC5wdXNoKHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdFBob25lU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9LCAxNTAwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuVkVSSUZZQ09ERS5TRU5EVE9PQlVTWSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdpc3RDb2RlU3RhdGUpIHJldHVybjtcclxuICAgIHRoaXMucmVnaXN0Q29kZVN0YXRlID0gdHJ1ZTtcclxuICAgIHRoaXMucmVnaXN0VXBkYXRlVmVyaWZpQ0QgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy52ZXJpZmlUeXBlID0gbXNnLnR5cGVcclxuICAgICAgICBpZiAodGhpcy5waG9uZVJlZ2lzdFZlcmlmaUNEIDwgMCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucmVnaXN0VXBkYXRlVmVyaWZpQ0QpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdFVwZGF0ZVZlcmlmaUNEID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5waG9uZVJlZ2lzdFZlcmlmaUNEID0gNjA7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0Q29kZVN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInBob25lUmVnaXN0Q29kZUNEXCIsIHRoaXMucGhvbmVSZWdpc3RWZXJpZmlDRCk7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVSZWdpc3RWZXJpZmlDRC0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApXHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQb3N0UGhvbmVDb2RlJywgbXNnLCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiDmuIXpmaTms6jlhozlj5HpgIHmiYvmnLrpqozor4HnoIHlrprml7blmahcclxuICovXHJcbnVzZXIuY2xlYXJSZWdpc3RQaG9uZUludGVydmFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZ2lzdFVwZGF0ZVZlcmlmaUNEKTtcclxuICAgIHRoaXMucmVnaXN0VXBkYXRlVmVyaWZpQ0QgPSBudWxsO1xyXG4gICAgdGhpcy5waG9uZVJlZ2lzdFZlcmlmaUNEID0gNjA7XHJcbiAgICB0aGlzLnJlZ2lzdENvZGVTdGF0ZSA9IGZhbHNlO1xyXG59O1xyXG4vKipcclxuICog5riF6Zmk5omL5py655m75b2V5a6a5pe25ZmoXHJcbiAqL1xyXG51c2VyLmNsZWFyUGhvbmVJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5waG9uZVVwZGF0ZVZlcmlmaUNEKTtcclxuICAgIHRoaXMucGhvbmVVcGRhdGVWZXJpZmlDRCA9IG51bGw7XHJcbiAgICB0aGlzLnBob25lTG9naW5WZXJpZmlDRCA9IDYwO1xyXG4gICAgdGhpcy5waG9uZUNvZGVTdGF0ZSA9IGZhbHNlO1xyXG59O1xyXG4vKipcclxuICog57uR5a6a5omL5py65Y+R6YCB6aqM6K+B56CBXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2cgIHR5cGUgMSDnu5HlrprmiYvmnLpcclxuICovXHJcbnVzZXIucmVxQmluZFBob25lQ29kZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGlmICghdGhpcy5jaGVja1Bob25lKG1zZy5waG9uZSkpIHtcclxuICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5VU0VSLlZFUklGWUNPREUuU0VOREZBSUxFRCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuYmluZFBob25lU3RhdGUpIHtcclxuICAgICAgICB0aGlzLmJpbmRQaG9uZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJpbmRQaG9uZVRpbWVvdXQgPSB0aGlzLmJpbmRQaG9uZVRpbWVvdXQgfHwgW107XHJcbiAgICAgICAgdGhpcy5iaW5kUGhvbmVUaW1lb3V0LnB1c2goc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZFBob25lU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9LCAxNTAwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuVkVSSUZZQ09ERS5TRU5EVE9PQlVTWSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmJpbmRQaG9uZUNvZGVTdGF0ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5iaW5kUGhvbmVDb2RlU3RhdGUgPSB0cnVlO1xyXG4gICAgdGhpcy5iaW5kUGhvbmVDRCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5iaW5kUGhvbmVWZXJpZmlDRCA8IDApIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmJpbmRQaG9uZUNEKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kUGhvbmVDRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZFBob25lVmVyaWZpQ0QgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy5iaW5kUGhvbmVDb2RlU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiYmluZFBob25lQ29kZUNEXCIsIHRoaXMuYmluZFBob25lVmVyaWZpQ0QpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRQaG9uZVZlcmlmaUNELS07XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMClcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBvc3RQaG9uZUNvZGUnLCBtc2csIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICB9KTtcclxufTtcclxuLy/muIXpmaTnu5HlrprmiYvmnLrov57nu63ngrnlh7vlrprml7blmahcclxudXNlci5jbGVhckJpbmRQaG9uZVRpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuYmluZFBob25lVGltZW91dCkgcmV0dXJuO1xyXG4gICAgbGV0IGNvdW50ID0gdGhpcy5iaW5kUGhvbmVUaW1lb3V0Lmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmJpbmRQaG9uZVRpbWVvdXRbaV0pO1xyXG4gICAgfVxyXG59XHJcbi8v5riF6Zmk5omL5py655m75b2V6L+e57ut54K55Ye75a6a5pe25ZmoXHJcbnVzZXIuY2xlYXJMb2dpblBob25lVGltZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5sb2dpblBob25lVGltZW91dCkgcmV0dXJuO1xyXG4gICAgbGV0IGNvdW50ID0gdGhpcy5sb2dpblBob25lVGltZW91dC5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5sb2dpblBob25lVGltZW91dFtpXSk7XHJcbiAgICB9XHJcbn1cclxuLy/muIXpmaTmib7lm57lr4bnoIHov57nu63ngrnlh7vlrprml7blmahcclxudXNlci5jbGVhclBvc3RQaG9uZVRpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMucG9zdFBob25lU3RhdGUpIHJldHVybjtcclxuICAgIGxldCBjb3VudCA9IHRoaXMucG9zdFBob25lU3RhdGUubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucG9zdFBob25lU3RhdGVbaV0pO1xyXG4gICAgfVxyXG59XHJcbi8v5riF6Zmk6Kej57uR5omL5py66L+e57ut54K55Ye75a6a5pe25ZmoXHJcbnVzZXIuY2xlYXJVbnRpZWRQaG9uZVRpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudW50aWVkUGhvbmVTdGF0ZSkgcmV0dXJuO1xyXG4gICAgbGV0IGNvdW50ID0gdGhpcy51bnRpZWRQaG9uZVN0YXRlLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnVudGllZFBob25lU3RhdGVbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5riF6Zmk57uR5a6a5omL5py65a6a5pe25ZmoXHJcbiAqL1xyXG51c2VyLmNsZWFyQmluZFBob25lSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuYmluZFBob25lQ0QpO1xyXG4gICAgdGhpcy5iaW5kUGhvbmVDRCA9IG51bGw7XHJcbiAgICB0aGlzLmJpbmRQaG9uZVZlcmlmaUNEID0gNjA7XHJcbiAgICB0aGlzLmJpbmRQaG9uZUNvZGVTdGF0ZSA9IGZhbHNlO1xyXG59O1xyXG5cclxudXNlci5jbGVhckFsbFBob25lSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNsZWFyVW50aWVkSW50ZXJ2YWwoKTtcclxuICAgIHRoaXMuY2xlYXJCaW5kUGhvbmVJbnRlcnZhbCgpO1xyXG4gICAgdGhpcy5jbGVhclBvc3RQaG9uZUludGVydmFsKCk7XHJcbiAgICB0aGlzLmNsZWFyUGhvbmVJbnRlcnZhbCgpO1xyXG4gICAgdGhpcy5jbGVhclJlZ2lzdFBob25lSW50ZXJ2YWwoKTtcclxufTtcclxuLyoqXHJcbiAqIOino+e7keaJi+acuuWPkemAgemqjOivgeeggVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnICB0eXBlIDEwIOino+e7keaJi+aculxyXG4gKi9cclxudXNlci5yZXFVbnRpZWRDb2RlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgaWYgKCF0aGlzLmNoZWNrUGhvbmUobXNnLnBob25lKSkge1xyXG4gICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuVkVSSUZZQ09ERS5TRU5ERkFJTEVEKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy51bnRpZWRQaG9uZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy51bnRpZWRQaG9uZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVudGllZFBob25lVGltZW91dCA9IHRoaXMudW50aWVkUGhvbmVUaW1lb3V0IHx8IFtdO1xyXG4gICAgICAgIHRoaXMudW50aWVkUGhvbmVUaW1lb3V0LnB1c2goc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW50aWVkUGhvbmVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDE1MDApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuVVNFUi5WRVJJRllDT0RFLlNFTkRUT09CVVNZKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnVudGllZENvZGVTdGF0ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy51bnRpZWRDb2RlU3RhdGUgPSB0cnVlO1xyXG4gICAgdGhpcy5VcGRhdGVDRCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy51bnRpZWRWZXJpZmlDRCA8IDApIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLlVwZGF0ZUNEKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVDRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMudW50aWVkVmVyaWZpQ0QgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy51bnRpZWRDb2RlU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiVW50aWVkQ29kZVwiLCB0aGlzLnVudGllZFZlcmlmaUNEKTtcclxuICAgICAgICAgICAgdGhpcy51bnRpZWRWZXJpZmlDRC0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApXHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQb3N0UGhvbmVDb2RlJywgbXNnLCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiDmuIXpmaTop6Pnu5HmiYvmnLrlrprml7blmahcclxuICovXHJcbnVzZXIuY2xlYXJVbnRpZWRJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5VcGRhdGVDRCk7XHJcbiAgICB0aGlzLlVwZGF0ZUNEID0gbnVsbDtcclxuICAgIHRoaXMudW50aWVkVmVyaWZpQ0QgPSA2MDtcclxuICAgIHRoaXMudW50aWVkQ29kZVN0YXRlID0gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICog5om+5Zue5a+G56CBXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcclxuICogQHBhcmFtIG1zZy5waG9uZSDmiYvmnLrlj7fnoIFcclxuICogQHBhcmFtIG1zZy5wd2Qg5paw5a+G56CBXHJcbiAqIEBwYXJhbSBtc2cuY29kZSDpqozor4HnoIFcclxuICovXHJcbnVzZXIuUmVxUmV0cmlldmVQd2QgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFSZXRyaWV2ZVB3ZCcsIG1zZywgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIlwiLCBnbEdhbWUudGlwcy5VU0VSLlBBU1NXT1JELkFDQywgKCkgPT4geyBnbEdhbWUuZW1pdHRlci5lbWl0KFwibG9naW5jbG9zdEZpbmRQc3dcIikgfSk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcImNoYW5nZVBzd1N1Y2Nlc3NcIik7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICog546p5a625aS05YOP5pu05o2iXHJcbiAqIEBwYXJhbSBoZWFkSURcclxuICogQHBhcmFtIG5leHRcclxuICovXHJcbnVzZXIucmVxRWRpdEhlYWQgPSBmdW5jdGlvbiAoaGVhZElELCBuZXh0KSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFFZGl0SGVhZCcsIHsgaGVhZF9pZDogaGVhZElEIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgaWYgKG1zZy5yZXN1bHQpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dUaXAoZ2xHYW1lLnRpcHMuVVNFUi5DSEFOR0VIRUFELlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiDnmbvlvZXlkI7kv67mlLnlr4bnoIFcclxuICogQHBhcmFtIHtPYmplY3R9IG1zZ1xyXG4gKi9cclxudXNlci5yZXFFZGl0UHdkID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxRWRpdFB3ZCcsIG1zZywgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICBpZiAobXNnLnJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL3RoaXMucmVxTXlJbmZvKCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLlVTRVIuUEFTU1dPUkQuQUNDKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcImVkaXRwc3dzdWNjZXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueOqeWutuaMh+Wumua4uOaIj+eahOacgOi/keWNgeadoeeJjOWxgOiusOW9lVxyXG4gKiBAcGFyYW0gZ2FtZUlEXHJcbiAqL1xyXG51c2VyLnJlcVVzZXJIYW5kUmVjb3JkcyA9IGZ1bmN0aW9uIChnYW1lSUQsIHBhZ2VTaXplID0gMTAsIHBhZ2VJbmRleCA9IDEpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcVVzZXJIYW5kUmVjb3JkcycsIHsgZ2FtZWlkOiBnYW1lSUQsIHBhZ2U6IHBhZ2VJbmRleCwgcGFnZV9zaXplOiBwYWdlU2l6ZSB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlckdhbWVSZWNvcmRbZ2FtZUlEXSA/IG51bGwgOiB0aGlzLnVzZXJHYW1lUmVjb3JkW2dhbWVJRF0gPSB7fTtcclxuICAgICAgICB0aGlzLnVzZXJHYW1lUmVjb3JkW2dhbWVJRF1bcGFnZUluZGV4XSA9IG1zZztcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlR2FtZVJlY29yZFwiLCBtc2cpO1xyXG4gICAgfSlcclxufSxcclxuICAgIC8qKlxyXG4gICAgICog6K6+572u546p5a625bGe5oCnXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgdXNlci5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfTtcclxuLyoqXHJcbiAqIOiOt+WPlueOqeWutuWxnuaAp1xyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG51c2VyLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIHJldHVybiB0aGlzW2tleV07XHJcbn07XHJcbi8qKlxyXG4gKiDmuIXnqbrnjqnlrrbkv6Hmga9cclxuICovXHJcbnVzZXIuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbn07XHJcbi8qKlxyXG4gKiDmiZPlvIDpk7booYzor7fmsYJcclxuICovXHJcbnVzZXIucmVxR2V0QmFua0NvaW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFHZXRCYW5rQ29pbicsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMuYmFua19jb2luID0gbXNnLmJhbmtfY29pbjtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwidXBkYXRlQmFua0NvaW5cIik7XHJcbiAgICB9KVxyXG59XHJcbi8qKlxyXG4gKiDojrflj5bnjqnlrrbov5TmsLTmnIDov5E1MOadoeeJjOWxgOiusOW9lSDlkowg6I635Y+W5piv5ZCm5byA5ZCv6L+U5rC05oyJ6ZKu5L+h5oGvXHJcbiAqIOaPj+i/sDogdXNlclB1bXBSZWNvcmQgeyAwOiDkv53lrZjov5TmsLTorrDlvZUgLCAgMTog5L+d5a2Y6L+U5rC05o+Q5Y+W6K6w5b2VIH1cclxuICovXHJcbnVzZXIuUmVxUmViYXRlUmVjb3JkID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFSZWJhdGVSZWNvcmQnLCBwYXJhbSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLnVzZXJQdW1wUmVjb3JkID0gbXNnLnJlc3VsdDtcclxuICAgICAgICB0aGlzLm1vZGVfdHlwZSA9IG1zZy5yZXN1bHQubW9kZVR5cGU7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclB1bXBSZWNvcmQgIT0gbnVsbCkgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVJlcVJlYmF0ZVJlY29yZFwiKTtcclxuICAgIH0sIFwidjJcIilcclxufVxyXG4vKipcclxuICog6I635Y+W546p5a626L+U5rC05o+Q5Y+W5pyA6L+RMjDmnaHniYzlsYDorrDlvZVcclxuICog5o+P6L+wOiB1c2VyUHVtcFJlY29yZCB7IDA6IOS/neWtmOi/lOawtOiusOW9lSAsICAxOiDkv53lrZjov5TmsLTmj5Dlj5borrDlvZUgfVxyXG4gKi9cclxudXNlci5SZXFSZWJhdGVSZWNvcmRMaXN0ID0gZnVuY3Rpb24gKHBhZ2UsIHBhZ2VTaXplID0gMTApIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVJlYmF0ZVJlY29yZExpc3QnLCB7IHBhZ2UsIHBhZ2VTaXplIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVJlcVJlYmF0ZVJlY29yZExpc3RcIiwgbXNnLnJlc3VsdCk7XHJcbiAgICB9LCBcInYyXCIpO1xyXG59XHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfov5TmsLTnlLPor7dcclxuICogQHBhcmFtIG1vbmV5XHJcbiAqL1xyXG51c2VyLlJlcVJlYmF0ZUFwcGx5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUmViYXRlQXBwbHknLCB7YWNjb3VudElkOiBnbEdhbWUudXNlci51c2VySUR9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMucmVxR2V0Q29pbigpOy8v5pu05paw6YeR6aKdXHJcbiAgICAgICAgdGhpcy5yZXFVbnJlYWQoKTsvL+abtOaWsOmCrueusVxyXG4gICAgICAgIHRoaXMucmVkRG90RGF0YS5wbGF5ZXJSZWJhdFJlcSA9IDI7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcIlJlcVJlZERvdFwiLCB0aGlzLnJlZERvdERhdGEpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVSZXFSZWJhdGVBcHBseVwiLCBtc2cpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog6I635Y+W55So5oi36L+U5rC06aKG5Y+WXHJcbiAqL1xyXG51c2VyLlJlcVJlYmF0ZVJlY2VpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFSZWJhdGVSZWNlaXZlJywge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgdGhpcy51c2VyUHVtcE1vbmV5ID0gbXNnO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVSZXFSZWJhdGVSZWNlaXZlIFwiLCBtc2cpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuKiDojrflj5bov5TmsLTmr5TkvotcclxuKi9cclxudXNlci5SZXFSZWJhdGVDb25maWdMaXN0ID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFSZWJhdGVDb25maWdMaXN0JywgcGFyYW0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWJhdGVDb25maWdMaXN0ID0gbXNnLnJlc3VsdDtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwicmViYXRlQ29uZmlnTGlzdFwiKTtcclxuICAgIH0sIFwidjJcIik7XHJcbn1cclxuLyoqXHJcbiog6I635Y+W562+5Yiw5piv5ZCm6aKG5Y+WXHJcbiovXHJcbnVzZXIucmVxU2lnbmluV2Vla0luZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFTaWduaW5XZWVrSW5mbycsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlclNpZ25pbiA9IG1zZztcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPlue6oueCuVxyXG4gKiBtYWlsUmVxIOezu+e7n+mCruS7tlxyXG4gKiBtYWlsY2FwaXRhbHJlcSDotYTph5Hpgq7ku7ZcclxuICogZGlzY291bnRSZXEg5rS75YqoXHJcbiAqIHBsYXllclJlYmF0UmVxIOi/lOawtFxyXG4gKiBkaWFsUmVkIOenr+WIhuWkuuWunVxyXG4gKiBzaWduaW5SZXEg562+5YiwXHJcbiAqIGV4dGVuc2lvblJlcSDmjqjlub9cclxuICogcGF5aW5nUmVxIOS9memineWunVxyXG4gKiB2aXBSZXEg5Liq5Lq65Lit5b+DXHJcbiAqL1xyXG51c2VyLlJlcVJlZERvdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVJlZERvdCcsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIHRoaXMucmVkRG90RGF0YSA9IG1zZy5yZXN1bHQ7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcIlJlcVJlZERvdFwiLCBtc2cucmVzdWx0KTtcclxuICAgIH0pXHJcbn1cclxuLyoqXHJcbiog6I635Y+W546p5a625piv5ZCm6aaW5YayXHJcbiovXHJcbnVzZXIucmVxUmVxQ2hlY2tPcmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcUNoZWNrT3JkZXInLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICB0aGlzLnVzZXJSZWNoYXJnZSA9IG1zZztcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuVUkuU0NFTkUpO1xyXG4gICAgfSlcclxufVxyXG51c2VyLmdldFJhbmtMaXN0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnJhbmtEYXRhO1xyXG59XHJcbi8qKlxyXG4qIOmHkeW4geaYvuekuue8qei/m+S4reaWh+aPj+i/sFxyXG4qIEBwYXJhbSB7bnVtYmVyfSAgZ29sZFxyXG4qIEByZXR1cm4ge1N0cmluZ31cclxuKi9cclxudXNlci5Hb2xkVGVtcCA9IGZ1bmN0aW9uIChnb2xkKSB7XHJcbiAgICBsZXQgc3RyR29sZCA9IFwiXCJcclxuICAgIGlmICh0eXBlb2YgZ29sZCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGdvbGQgPSBnb2xkLmRpdigxMDApO1xyXG4gICAgICAgIGlmIChnb2xkID49IDEwMDAwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDApfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgMSl95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgMil95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMCkudG9TdHJpbmcoKSwgMil95LiHYDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDApLnRvU3RyaW5nKCksIDIpfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDApLnRvU3RyaW5nKCksIDIpfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IHRoaXMuc3RyaW5nRml4KGdvbGQudG9TdHJpbmcoKSwgMikgKyBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgb2xkID0gXCJcIiArIHN0ckdvbGQ7XHJcbiAgICAgICAgICAgIGlmIChvbGQubGVuZ3RoID4gMSAmJiAoc3RyR29sZC5pbmRleE9mKFwiLjBcIikgIT0gLTEgfHwgc3RyR29sZC5pbmRleE9mKFwiLjAwXCIpICE9IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZC5zbGljZSgtMSkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJHb2xkID0gb2xkLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvbGQuc2xpY2UoLTIpID09IFwiLjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ckdvbGQgPSBvbGQuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZC5zbGljZSgtMykgPT0gXCIuMDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ckdvbGQgPSBvbGQuc2xpY2UoMCwgLTMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ckdvbGQ7XHJcbn1cclxudXNlci5WaXBHb2xkVGVtcCA9IGZ1bmN0aW9uIChnb2xkKSB7XHJcbiAgICBsZXQgc3RyR29sZCA9IFwiXCJcclxuICAgIGlmICh0eXBlb2YgZ29sZCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGdvbGQgPSBnb2xkLmRpdigxMDApO1xyXG4gICAgICAgIGlmIChnb2xkID49IDEwMDAwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ1ZpcEZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDApfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nVmlwRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgMSl95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ1ZpcEZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ1ZpcEZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nVmlwRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgMil95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ1ZpcEZpeChnb2xkLmRpdigxMDAwMDAwMDApLnRvU3RyaW5nKCksIDIpfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ1ZpcEZpeChnb2xkLmRpdigxMDAwMCkudG9TdHJpbmcoKSwgMil95LiHYDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdWaXBGaXgoZ29sZC5kaXYoMTAwMDApLnRvU3RyaW5nKCksIDIpfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdWaXBGaXgoZ29sZC5kaXYoMTAwMDApLnRvU3RyaW5nKCksIDIpfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IHRoaXMuc3RyaW5nVmlwRml4KGdvbGQudG9TdHJpbmcoKSwgMilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyR29sZDtcclxufVxyXG51c2VyLkVudGVyUm9vbUdvbGRUZW1wID0gZnVuY3Rpb24gKGdvbGQpIHtcclxuICAgIGxldCBzdHJHb2xkID0gXCJcIlxyXG4gICAgaWYgKHR5cGVvZiBnb2xkID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgZ29sZCA9IGdvbGQuZGl2KDEwMCk7XHJcbiAgICAgICAgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgMCl95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDAwMDAwKS50b1N0cmluZygpLCBnb2xkICUgMTAwMDAwMDAwID49IDEwMDAwMDAwID8gMiA6IDApfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDAwMDAwKS50b1N0cmluZygpLCBnb2xkICUgMTAwMDAwMDAwID49IDEwMDAwMDAgPyAyIDogMCl95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IGAke3RoaXMuc3RyaW5nRml4KGdvbGQuZGl2KDEwMDAwMDAwMCkudG9TdHJpbmcoKSwgZ29sZCAlIDEwMDAwMDAwMCA+PSAxMDAwMDAgPyAyIDogMCl95Lq/YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGdvbGQgPj0gMTAwMDAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDAwMDAwKS50b1N0cmluZygpLCBnb2xkICUgMTAwMDAwMDAwID49IDEwMDAwID8gMiA6IDApfeS6v2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwMCkge1xyXG4gICAgICAgICAgICBzdHJHb2xkID0gYCR7dGhpcy5zdHJpbmdGaXgoZ29sZC5kaXYoMTAwMDApLnRvU3RyaW5nKCksIGdvbGQgJSAxMDAwMCA+PSAxMDAwID8gMiA6IDApfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnb2xkID49IDEwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMCkudG9TdHJpbmcoKSwgZ29sZCAlIDEwMDAwID49IDEwMCA/IDIgOiAwKX3kuIdgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ29sZCA+PSAxMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHN0ckdvbGQgPSBgJHt0aGlzLnN0cmluZ0ZpeChnb2xkLmRpdigxMDAwMCkudG9TdHJpbmcoKSwgZ29sZCAlIDEwMDAwID49IDEwID8gMiA6IDApfeS4h2A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyR29sZCA9IHRoaXMuc3RyaW5nRml4KGdvbGQudG9TdHJpbmcoKSwgZ29sZCAlIDEgPiAwID8gMiA6IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ckdvbGQ7XHJcbn1cclxudXNlci5kZWxldFplcm9TdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblxyXG5cclxufVxyXG51c2VyLnN0cmluZ0ZpeCA9IGZ1bmN0aW9uIChzdHIsIG51bSkge1xyXG4gICAgaWYgKHN0ci5pbmRleE9mKCcuJykgPT0gLTEpIHtcclxuICAgICAgICBzdHIgPSBzdHIgKyAnLic7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIgKyAnMCc7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc3RyLnNsaWNlKHN0ci5pbmRleE9mKCcuJykgKyAxKS5sZW5ndGggPCBudW0pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW0gLSBzdHIuc2xpY2Uoc3RyLmluZGV4T2YoJy4nKSArIDEpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5zbGljZShzdHIuaW5kZXhPZignLicpICsgMSkubGVuZ3RoIC0gbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgc3RyLmxlbmd0aCAtIChzdHIuc2xpY2Uoc3RyLmluZGV4T2YoJy4nKSArIDEpLmxlbmd0aCAtIG51bSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFudW0gJiYgc3RyLmluZGV4T2YoJy4nKSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgc3RyLmxlbmd0aCAtIDEpO1xyXG4gICAgfVxyXG4gICAgbGV0IHBvaW50SW5kZXggPSBzdHIuaW5kZXhPZignLicpXHJcbiAgICBpZiAoc3RyW3N0ci5sZW5ndGggLSAxXSA9PSAwICYmIHN0cltzdHIubGVuZ3RoIC0gMl0gPT0gMCAmJiBzdHIubGVuZ3RoID4gNCAmJiAoc3RyLmxlbmd0aCAtIHBvaW50SW5kZXggPT0gMykgJiYgc3RyLmluZGV4T2YoJy4nKSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgc3RyLmxlbmd0aCAtIDMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxudXNlci5zdHJpbmdWaXBGaXggPSBmdW5jdGlvbiAoc3RyLCBudW0pIHtcclxuICAgIGlmIChzdHIuaW5kZXhPZignLicpID09IC0xKSB7XHJcbiAgICAgICAgc3RyID0gc3RyICsgJy4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgc3RyID0gc3RyICsgJzAnO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHN0ci5zbGljZShzdHIuaW5kZXhPZignLicpICsgMSkubGVuZ3RoIDwgbnVtKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtIC0gc3RyLnNsaWNlKHN0ci5pbmRleE9mKCcuJykgKyAxKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJzAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIuc2xpY2Uoc3RyLmluZGV4T2YoJy4nKSArIDEpLmxlbmd0aCAtIG51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSAoc3RyLnNsaWNlKHN0ci5pbmRleE9mKCcuJykgKyAxKS5sZW5ndGggLSBudW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghbnVtICYmIHN0ci5pbmRleE9mKCcuJykgIT0gLTEpIHtcclxuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSAxKTtcclxuICAgIH1cclxuICAgIGxldCBwb2ludEluZGV4ID0gc3RyLmluZGV4T2YoJy4nKVxyXG4gICAgaWYgKHN0cltzdHIubGVuZ3RoIC0gMV0gPT0gMCAmJiBzdHJbc3RyLmxlbmd0aCAtIDJdID09IDAgJiYgc3RyLmxlbmd0aCA+PSAzICYmIChzdHIubGVuZ3RoIC0gcG9pbnRJbmRleCA9PSAzKSAmJiBzdHIuaW5kZXhPZignLicpICE9IC0xKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyBVc2VyKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ19pbnN0YW5jZTtcclxufTtcclxuIl19
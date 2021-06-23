"use strict";
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
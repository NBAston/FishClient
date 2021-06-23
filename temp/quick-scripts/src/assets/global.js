"use strict";
cc._RF.push(module, 'f6eb4qd5d5BpK3o3MlEU5np', 'global');
// global.js

"use strict";

var crypto = require("crypto");

window.md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

window.glGame = window.glGame || {}; // 重启游戏接口

window.reStartGame = function () {
  cc.sys.localStorage.setItem("isAudioPlay", true);
  glGame.isAndroidExit = false;
  glGame.isReStartgame = true;
  glGame.logon.resetData();
  glGame.room.resetData();
  pomelo.clearListener();
  pomelo.disconnect();
  glGame.panel.resetData();
  cc.audioEngine.stopAll();
  cc.game.restart();
}; // 清理缓存数据并进行重启


window.clearGame = function () {
  if (!cc.sys.isNative) return;
  glGame.emitter.emit(MESSAGE.DOWNLOAD.STOP);
  cc.sys.localStorage.removeItem("HotUpdateSearchPaths");
  cc.sys.localStorage.removeItem("update_data");
  var masterfile = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "master_temp";
  jsb.fileUtils.removeDirectory(masterfile);
  masterfile = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "master";
  jsb.fileUtils.removeDirectory(masterfile);
  reStartGame();
};

window.glGame = window.glGame || {};

window.startGame = function () {
  // 开发版本号-仅提供给 禅道 对应修复bug 点击开心棋牌 显示
  glGame.devVersion = "2020-12-19 19:01:51"; // 进入房间是否请求验证的测试开关

  glGame.enterRoomVerification = false; // 是否开发模式

  glGame.isDevelop = true; //是否是第一次进入大厅

  glGame.isfirstEnterPlaza = false; //是否开启选择登录方式

  glGame.isLoginSelect = true; //是否进入大厅开启预加载

  glGame.isbeforehand = false; //多点触控的开关

  glGame.isMuchEventTouch = false; //金币场30秒开关(ture 是开启30秒，false是关闭30秒)

  glGame.isThirtySecond = false; //系统旋转校验布尔值

  glGame.isSystemRota = true; //按钮粒子发射器 启动/关闭 全局开关, 需求：对于性能较低的手机可能需要关掉粒子效果

  glGame.isPariticle = true; // 记录进入游戏的分类

  glGame.isCategoryData = {
    typeIndex: null,
    platIndex: null
  };

  if (!glGame.isDevelop) {
    console.log = function () {};

    console.error = function () {};

    cc.log = function () {};

    cc.error = function () {};
  }

  cc.WebView.Impl.prototype.evaluateJS = function (str) {
    var iframe = this._iframe;

    if (iframe) {
      return iframe.evaluateJS(str);
    }
  };

  window.isAndroid = cc.sys.os === cc.sys.OS_ANDROID;
  window.isIos = cc.sys.os === cc.sys.OS_IOS;
  window.isBrowser = cc.sys.isBrowser;
  window.isEnableHotUpdate = cc.sys.isNative; //&&cc.sys.isMobile;
  //当前屏幕是适配尺寸

  glGame.designSize = cc.size(1920, 1080);
  cc.view.enableAntiAlias(true);
  if (isBrowser) glGame.platform = require("web").getInstance();else if (isAndroid) glGame.platform = require("android").getInstance();else if (isIos) glGame.platform = require("ios").getInstance();else glGame.platform = require("default").getInstance();
  window.isiPhoneX = false;

  if (cc.sys.platform == cc.sys.IPHONE) {
    var phoneName = glGame.platform.getPhoneModel();
    window.isiPhoneX = phoneName === "iPhone X" || phoneName === "iPhone XR" || phoneName === "iPhone XS" || phoneName === "iPhone XS Max" || phoneName === "iPhone 11" || phoneName === "iPhone 11 Pro" || phoneName === "iPhone 11 Pro Max" || phoneName === "iPhone 12 mini" || phoneName === "iPhone 12" || phoneName === "iPhone 12 Pro" || phoneName === "iPhone 12 Pro Max";
  }

  if (cc.sys.isNative) cc.game.setFrameRate(30); // 场景标记

  glGame.scenetag = glGame.scenetag || {};
  glGame.scenetag.NEXTSCENETAG = "nextSceneTag";
  glGame.scenetag.LOGIN = 1; // 登陆

  glGame.scenetag.PLAZA = 2; // 大厅

  glGame.scenetag.ZHAJINHUA = 15; // 炸金花

  glGame.scenetag.QZNN = 18; // 抢庄牛牛

  glGame.scenetag.BRNN = 22; // 百人牛牛

  glGame.scenetag.SANGONG = 27; // 三公

  glGame.scenetag.HONGHEI = 28; // 红黑

  glGame.scenetag.SHUIGUOJI = 29; // 水果机

  glGame.scenetag.LONGHUDOU = 30; // 龙虎斗

  glGame.scenetag.LABA = 31; // 拉霸

  glGame.scenetag.BAIJIALE = 32; // 百家乐

  glGame.scenetag.PAIJIU = 33; // 牌九

  glGame.scenetag.LUCKTURNTABLE = 34; // 幸运大转盘

  glGame.scenetag.DZPK = 35; // 德州扑克

  glGame.scenetag.DDZ = 36; // 斗地主

  glGame.scenetag.JSZJH = 37; // 极速炸金花

  glGame.scenetag.ESYD = 38; // 二十一点

  glGame.scenetag.EBG = 39; // 二八杠

  glGame.scenetag.FISH = 40; // 捕鱼

  glGame.scenetag.QHBJL = 41; // 抢红包接龙

  glGame.scenetag.SSS = 42; // 十三水

  glGame.scenetag.HCPY = 43; // 豪车飘逸

  glGame.scenetag.SLWH = 44; // 森林舞会

  glGame.scenetag.RQZNN = 45; // 房间场抢庄牛牛

  glGame.scenetag.WQZNN = 46; //五人抢庄

  glGame.scenetag.HBSL = 48; //红包扫雷

  glGame.scenetag.FISH2 = 49; // 新捕鱼

  glGame.scenetag.FISH3 = 50; // 新捕鱼2
  // 银行

  glGame.bank = glGame.bank || {};
  glGame.bank.DEPOSIT = 0; // 银行存入模式

  glGame.bank.WITHDRAW = 1; // 银行取出模式
  // 支付提现

  glGame.withdraw = glGame.withdraw || {};
  glGame.withdraw.ALIPAY = 1; // 支付宝

  glGame.withdraw.BANKCARD = 2; // 银行卡

  glGame.pay = glGame.pay || {};
  glGame.pay.AGENCYPAY = 1; // 1 '代理充值',

  glGame.pay.EXCLUSIVE = 2; // 2 '专享闪付',

  glGame.pay.FASTPAY = 3; // 3 '公司入款',

  glGame.pay.ALIPAY = 4; // 4 '支付宝充值',

  glGame.pay.WECHATPAY = 5; // 5 '微信充值',

  glGame.pay.BANKCARDPAY = 6; // 6 '银行卡充值',

  glGame.pay.CLOUDPAY = 7; // 7 '云闪付充值',

  glGame.pay.JINGDONGPAY = 8; // 8 '京东支付',

  glGame.pay.QQPAY = 9; // 9 'QQ支付',
  // 游戏分类标签类型

  glGame.gamevariety = glGame.gamevariety || {};
  glGame.gamevariety.RMYX = 1; //热门游戏

  glGame.gamevariety.QIPAI = 2; //棋牌

  glGame.gamevariety.JIEJI = 3; //街机

  glGame.gamevariety.FISH = 4; //捕鱼

  glGame.gamevariety.SHIXUN = 5; //视讯

  glGame.gamevariety.TIYU = 6; //体育

  glGame.gamevariety.CAIPIAO = 7; //彩票

  glGame.gamevariety.DIANJING = 8; //电竞

  glGame.gamevariety.ROOM = 9; //房间
  // 奖励类型（包括金币，夺宝积分，任务活跃，钻石等）

  glGame.awardtype = glGame.awardtype || {};
  glGame.awardtype.COIN = 1; //金币

  glGame.awardtype.SCORE = 2; //夺宝积分

  glGame.awardtype.VITALITY = 3; //任务活跃

  glGame.awardtype.DIAMOND = 4; //钻石
  // 游戏下载数量

  glGame.UPDATE_GAME_MAX = 2;
  glGame.update_list = []; // 前后台切换保留联网时间差

  glGame.ground = glGame.ground || {};
  glGame.ground.cutgametime = 60 * 1000;
  glGame.ground.newenter = true; // 第一次进入大厅

  glGame.gamecfg = require("gamecfg").paths; //功能版本控制
  //初始化相关脚本

  glGame.systemclass = require("systemclass")(); // 修改适配游戏的机制

  glGame.fileutil = require("fileutil")(); // 文件操作管理

  glGame.resloader = require("resloader")();
  glGame.encrypt = require("encryptInit")();
  glGame.emitter = require("emitter")(); // 事件管理

  glGame.storage = require("storage")(); // 缓存管理

  glGame.gameNet = require("GameNet")(); // 网络管理

  glGame.loader = require("loader")(); // 资源加载管理

  glGame.scene = require("scene")(); // 场景管理

  glGame.panel = require("panel")(); // 界面管理

  glGame.assets = require("assets"); // 热跟新管理

  glGame.assetsManager = require("assetsmanager")(); // 热跟新管理

  glGame.audio = require("audio")(); // 声音管理

  glGame.audioloader = require("audioloader")(); // 声音加载

  glGame.animation = require("animation")(); // 动画管理

  glGame.gamelistcfg = require("gamelistcfg")(); // 游戏列表

  glGame.servercfg = require("servercfg")(); // 服务器配置模块

  glGame.logon = require("logon")(); // 登陆数据模块

  glGame.user = require("user")(); // 玩家信息模块

  glGame.room = require("room")(); // 房间数据模块（金币场与百人场）

  glGame.readyroom = require("readyroom")(); // 房间数据模块（金币场与百人场）

  glGame.notice = require("noticelogic")(); // 跑马灯数据模块

  glGame.oiSdk = require("OICallFunc").getInstance();
  glGame.tips = require("tips");
  glGame.screenshot = require('ScreenShot'); //消息管理

  require("messages"); //本地消息配置
  //服务端消息


  require("networks"); //网络消息配置
  //第三方错误码


  require("ThirdCode"); //
  //继承类


  require("scenes")(); //使用scene配置文件数据


  require("panels")(); //使用panel详细调用界面
  // 注册前后台切换事件


  window.isShow = true;
  glGame.systemclass.enterFrontandback();
  glGame.plazaColor = {}; //正数统一颜色值f4c404 >=0

  glGame.plazaColor.gain = new cc.Color(0xf4, 0xc4, 0x04); //正
  //负数统一颜色值f41424  <0

  glGame.plazaColor.loss = new cc.Color(0xf4, 0x14, 0x24); //负
  //大厅牌局记录详情使用

  glGame.recordColor = {};
  glGame.recordColor.red = new cc.Color(0xef, 0x41, 0x41); //负

  glGame.recordColor.green = new cc.Color(0x00, 0xff, 0x36); //胜

  glGame.recordColor.blue = new cc.Color(0x46, 0xbf, 0xff); //十三水胜水

  glGame.recordColor.yellow = new cc.Color(0xf8, 0x75, 0x1e); //玩家

  glGame.recordColor.yellow2 = new cc.Color(0xf4, 0xc4, 0x04); //抢庄下注
  //web旋转适配
  //if (!cc.sys.isNative) glGame.systemclass.webChange();
  //web子游戏旋转适配

  if (!cc.sys.isNative) glGame.systemclass.webGameChange();
  cc.sys.localStorage.setItem('isAutomaticGrabTag', false); //强制热更判定

  glGame.version = "";
  if (cc.sys.isNative) glGame.systemclass.updateBag(); //底包版本号（用于强制更新）
  //适配iphonex

  if (isIos) glGame.systemclass.iphonex();
  glGame.isAndroidExit = false; // android: 返回键监听注册到全局

  if (isAndroid) glGame.systemclass.androidOn();

  if (!glGame.isReStartgame) {
    if (!glGame.isMuchEventTouch) glGame.systemclass.nodeRewrite();
  }
};

cc._RF.pop();
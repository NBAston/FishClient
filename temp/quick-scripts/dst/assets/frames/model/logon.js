
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/logon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5aa55KnUCVOroBBBl+d8CaN', 'logon');
// frames/model/logon.js

"use strict";

var PROCESS_STATE = {
  normal: 1,
  maintain: 2,
  close: 3
};
var STATE = {
  open: 1,
  close: 2
};
var CHECK_TYPE = {
  game: 1,
  platform: 2
};
/**
 * 登陆数据模块
 */

var NetCode = {
  LoginFromOtherDevice: 20100014,
  // 在别的设备登入
  KickPlayer: 20100015,
  // 踢下线
  EmergencyMaintenance: 20100016 // 紧急维护

},
    Logon = function Logon() {
  this.registerEvent();
  this.resetData();
},
    logon = Logon.prototype,
    g_instance = null;
/**
 * 数据重置
 */


logon.resetData = function () {
  this.serverCfg = null;
  this._webRootUrl = null;
  this._uid = null;
  this.connector_host = null;
  this.connector_port = null;
  this.b_switchAccount = null;
  this.verifiCD = 60;
  this.logondata = null;
  this.loginupdata = false;
  this.isUpdatePlaza = false;
  this.pomeloConnect = false;
};
/**
 * 注册事件监听
 * 数据模型的事件无需销毁
 * 理论上重启游戏后自动就不存在了
 */


logon.registerEvent = function () {
  glGame.emitter.on(MESSAGE.UPDATE_SERVER_CFG, this.onUpdateServerCfg, this);
  glGame.emitter.on(NETWORK.POMELO.ENTER_PLAT, this.connector_entryHandler_enterPlat, this);
};
/**
 * 判定是否为ip
 * @param {String} obj
 */


logon.checkIP = function (obj) {
  var ip = obj;

  if (ip.indexOf(" ") >= 0) {
    ip = ip.replace(/ /g, "");
  }

  if (ip.toLowerCase().indexOf("http://") == 0) {
    ip = ip.slice(7);
  }

  if (ip.toLowerCase().indexOf("https://") == 0) {
    ip = ip.slice(8);
  }

  if (ip.slice(ip.length - 1) == "/") {
    ip = ip.slice(0, ip.length - 1);
  }

  var exp = null;
  var num = 0; // ipv4  ipv6

  for (var index in ip) {
    ip[index] === "." ? num++ : 0;
  }

  if (num <= 4) exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;else exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  var reg = ip.match(exp);
  if (reg == null) return false; //不合法
  else return true; //合法
};
/**
 * 更新连接服务器配置
 */


logon.onUpdateServerCfg = function () {
  this.serverCfg = glGame.servercfg.getServerCfg();
  var host = this.serverCfg["platSvrHost"],
      port = this.serverCfg["platSvrPort"];
  if (host.toLowerCase().indexOf("https://") >= 0 || host.toLowerCase().indexOf("http://") >= 0) this._webRootUrl = host;else this._webRootUrl = "http://".concat(host);
  if (port > 0) this._webRootUrl = "".concat(this._webRootUrl, ":").concat(port);
  glGame.gameNet.setWebHost(this._webRootUrl);
};
/**
 * 微信号登陆
 * @param {Object} msg
 */


logon.reqWxLogin = function (msg) {
  msg.gameSvrTag = this.serverCfg.gameSvrTag;
  msg.plat = 4;
  msg.imei = this.getMachineCode();
  msg.phone_version = this.getPhoneVersion();
  msg.phone_model = this.getPhoneModel();
  msg.phone_type = this.getPhoneType();
  msg.password = md5("123456");

  if (cc.sys.isNative) {
    msg.registration_id = glGame.platform.getRegisID();
  }

  this.isAutoLogin = false;
  this.isUpdatePlaza = true;
  glGame.storage.setItem("loginCache", {
    plat: 4,
    pd: msg.username + msg.username,
    le: String(msg.username).length
  });
  var RegisterFirst = glGame.storage.getItem("RegisterFirst");
  glGame.user.reqUrl();

  if (!RegisterFirst && cc.sys.isNative) {
    this.getOpenInstall(msg, 'http.reqLogin');
    glGame.storage.setItem("RegisterFirst", {});
    return;
  }

  glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
};
/**
 * 账号登陆
 * @param {Object} msg
 */


logon.reqAccLogin = function (msg) {
  this.firstlogin = false; //是否为第一次注册登录

  msg.gameSvrTag = this.serverCfg.gameSvrTag;
  msg.plat = 1;
  msg.imei = this.getMachineCode();
  msg.phone_version = this.getPhoneVersion();
  msg.phone_model = this.getPhoneModel();
  msg.phone_type = this.getPhoneType();
  this.logondata = {
    plat: msg.plat,
    password: msg.password,
    username: msg.username
  };
  this.isAutoLogin = false;
  this.isUpdatePlaza = true;
  msg.phone_type = this.getPhoneType();
  glGame.panel.showlimitJuhua();
  glGame.user.reqUrl();
  glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
};
/**
 * 手机号登陆
 * @param {Object} msg
 */


logon.reqPhoneLogin = function (msg) {
  this.firstlogin = false; //是否为第一次注册登录

  msg.gameSvrTag = this.serverCfg.gameSvrTag;
  msg.plat = 5;
  msg.imei = this.getMachineCode();
  msg.phone_version = this.getPhoneVersion();
  msg.phone_model = this.getPhoneModel();
  msg.phone_type = this.getPhoneType();
  this.logondata = {
    plat: msg.plat,
    code: msg.code,
    username: msg.username
  };
  this.isAutoLogin = false;
  this.isUpdatePlaza = true;
  msg.phone_type = this.getPhoneType();
  glGame.user.reqUrl();
  glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
};
/**
 * 游客数据获取
 */


logon.getVisitorData = function () {
  var msg = {
    gameSvrTag: this.serverCfg.gameSvrTag,
    plat: 2,
    username: "" + Date.now() + Math.random(),
    password: md5(Date.now().toString()),
    imei: this.getMachineCode(),
    phone_version: this.getPhoneVersion(),
    phone_model: this.getPhoneModel(),
    phone_type: this.getPhoneType()
  };
  var visitorCache = glGame.storage.getItem("visitorCache");

  if (visitorCache) {
    // 判断登录缓存中的参数是否合法
    var necessary = ["plat", "pd", "le"];
    var isLegal = necessary.every(function (prop) {
      return typeof visitorCache[prop] !== "undefined" && visitorCache[prop] !== null;
    });

    if (isLegal) {
      msg.username = visitorCache.pd.substr(-visitorCache.le);
      msg.password = visitorCache.pd.substr(0, visitorCache.pd.length - visitorCache.le);
      msg.plat = visitorCache.plat;
    } else {
      glGame.storage.removeItemByKey("visitorCache");
      glGame.storage.setItem("visitorCache", {
        plat: msg.plat,
        pd: msg.password + msg.username,
        le: String(msg.username).length
      });
    }
  } else {
    glGame.storage.setItem("visitorCache", {
      plat: msg.plat,
      pd: msg.password + msg.username,
      le: String(msg.username).length
    });
  }

  return msg;
};
/**
 * 游客登陆
 */


logon.reqTouLogin = function () {
  var msg = this.getVisitorData();

  if (cc.sys.isNative) {
    msg.registration_id = glGame.platform.getRegisID();
  }

  this.logondata = {
    plat: msg.plat,
    password: msg.password,
    username: msg.username
  };
  this.isAutoLogin = false;
  this.isUpdatePlaza = true;
  var VisitorFirst = glGame.storage.getItem("VisitorFirst"); //第一次游客登录要发openstall信息

  glGame.user.reqUrl();

  if (!VisitorFirst && cc.sys.isNative) {
    this.getOpenInstall(msg, 'http.reqLogin');
    glGame.storage.setItem("VisitorFirst", {});
    return;
  }

  glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
};
/**
 * 开发模式的账号登录
 */


logon.reqDevelopTouLogin = function (msg) {
  msg.password = md5("123456");
  msg.gameSvrTag = this.serverCfg.gameSvrTag;
  msg.plat = 3;
  msg.imei = this.getMachineCode();
  this.logondata = {
    plat: msg.plat,
    password: msg.password,
    username: msg.username
  };
  this.isAutoLogin = false;
  msg.phone_type = this.getPhoneType();
  glGame.user.reqUrl();
  glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
};
/**
 * 自动登陆
 */


logon.autoLogin = function () {
  var loginCache = glGame.storage.getItem("loginCache");

  if (loginCache) {
    // 判断登录缓存中的参数是否合法
    var necessary = ["plat", "pd", "le"];
    var isLegal = necessary.every(function (prop) {
      return typeof loginCache[prop] !== "undefined" && loginCache[prop] !== null;
    });

    if (isLegal) {
      var msg = {};
      msg.gameSvrTag = this.serverCfg.gameSvrTag;
      msg.username = loginCache.pd.substr(-loginCache.le);
      msg.password = loginCache.pd.substr(0, loginCache.pd.length - loginCache.le);
      msg.plat = loginCache.plat;
      msg.imei = this.getMachineCode();
      msg.phone_version = this.getPhoneVersion(), msg.phone_model = this.getPhoneModel(), msg.phone_type = this.getPhoneType(), this.isAutoLogin = true;
      glGame.user.reqUrl();
      glGame.gameNet.send_msg('http.reqLogin', msg, this.loginNext.bind(this));
      return true;
    } else {
      glGame.storage.removeItemByKey("loginCache");
    }
  }

  return false;
};

logon.getMachineCode = function () {
  var machineCode = cc.sys.isNative ? glGame.platform.getMachineCode() : 0;
  return machineCode;
};

logon.getPhoneModel = function () {
  var phoneType = cc.sys.isNative ? glGame.platform.getPhoneModel() : null;
  return phoneType;
};

logon.getPhoneVersion = function () {
  var phoneVersion = cc.sys.isNative ? glGame.platform.getSystemVersion() : 0;
  return phoneVersion;
};

logon.getPhoneType = function () {
  var phone_type;

  if (cc.sys.os === cc.sys.OS_ANDROID) {
    phone_type = 1;
  } else if (cc.sys.os === cc.sys.OS_IOS) {
    phone_type = 2;
  } else {
    phone_type = 0;
  }

  return phone_type;
};

logon.getChannelData = function () {
  var text = glGame.platform.getClipText();

  if (typeof text == "string" && text != "") {
    var list = text.split("&");

    if (list.length > 1) {
      var datalist = {};

      for (var key in list) {
        var data = list[key].split("=");
        datalist[data[0]] = data[1];
      }

      return datalist;
    }
  }

  return false;
};

logon.getOpenInstall = function (msg, routeadress) {
  if (cc.sys.isNative) {
    var promote = {
      id: "0",
      channel: "0",
      type: "0"
    };
    if (isAndroid && glGame.channelData) promote = glGame.channelData;

    if (isIos) {
      var channel = this.getChannelData();
      promote = channel || promote;
    }

    var getinstallCB = function getinstallCB(appData) {
      msg.player_id = promote.id;
      msg.channel = promote.channel;
      msg.channel_type = promote.type;
      glGame.user.reqUrl();

      if (appData.bindData == "") {
        glGame.gameNet.send_msg(routeadress, msg, function (route, data) {
          routeadress == "http.reqLogin" ? glGame.logon.loginNext(route, data) : glGame.logon.reqRegisterNext(route, data);
        });
        return;
      }

      var bindData = JSON.parse(appData.bindData);
      msg.player_id = bindData.id ? bindData.id : promote.id;
      msg.channel = bindData.channel ? bindData.channel : promote.channel;
      msg.channel_type = bindData.type ? bindData.type : promote.type;
      glGame.gameNet.send_msg(routeadress, msg, function (route, data) {
        routeadress == "http.reqLogin" ? glGame.logon.loginNext(route, data) : glGame.logon.reqRegisterNext(route, data);
      });
    };

    glGame.oiSdk.getInstall(0, getinstallCB);
  } else {
    msg.player_id = "0";
    msg.channel = "0";
    msg.channel_type = "1";
    glGame.user.reqUrl();
    glGame.gameNet.send_msg(routeadress, msg, function (route, data) {
      routeadress == "http.reqLogin" ? glGame.logon.loginNext(route, data) : glGame.logon.reqRegisterNext(route, data);
    });
  }
};
/**
 * 账号注册
 * @param {Object} msg
 */


logon.reqRegister = function (msg) {
  this.firstlogin = true; //是否为第一次注册登录

  msg.gameSvrTag = this.serverCfg.gameSvrTag;
  msg.imei = this.getMachineCode();
  msg.phone_version = this.getPhoneVersion();
  msg.phone_model = this.getPhoneModel();
  msg.phone_type = this.getPhoneType();

  if (cc.sys.isNative) {
    msg.registration_id = glGame.platform.getRegisID();
  }

  this.logondata = {
    plat: 1,
    password: msg.psw,
    username: msg.acc
  };
  glGame.panel.showlimitJuhua();
  this.isUpdatePlaza = true;
  var RegisterFirst = glGame.storage.getItem("RegisterFirst");

  if (!RegisterFirst && cc.sys.isNative) {
    this.getOpenInstall(msg, 'http.reqRegister');
    glGame.storage.setItem("RegisterFirst", {});
    return;
  }

  glGame.gameNet.send_msg('http.reqRegister', msg, this.reqRegisterNext.bind(this));
};
/**
 * 手机注册
 * @param {Object} msg
 */


logon.reqPhoneRegister = function (msg) {
  this.firstlogin = true; //是否为第一次注册登录

  msg.imei = this.getMachineCode();
  msg.phone_version = this.getPhoneVersion();
  msg.phone_model = this.getPhoneModel();
  msg.phone_type = this.getPhoneType();

  if (cc.sys.isNative) {
    msg.registration_id = glGame.platform.getRegisID();
  }

  this.logondata = {
    plat: 1,
    password: msg.password,
    username: msg.phone
  };
  var RegisterFirst = glGame.storage.getItem("RegisterFirst");
  glGame.panel.showlimitJuhua();
  this.isUpdatePlaza = true;

  if (!RegisterFirst && cc.sys.isNative) {
    this.getOpenInstall(msg, 'http.reqPhoneRegister');
    glGame.storage.setItem("RegisterFirst", {});
    return;
  }

  glGame.gameNet.send_msg('http.reqPhoneRegister', msg, this.reqRegisterNext.bind(this));
};
/**
 * 注册接口回调
 * @param {String} route
 * @param {Object} data
 */


logon.reqRegisterNext = function (route, data) {
  this.recordLoinData();
  this.bindAgent = true;
  this.myInfoData = data.myInfo.data;
  this.isTourist = data.myInfo.data.grade_id == 1 ? true : false;
  if (data.registerGetCoin && data.registerGetCoin > 0) glGame.user.registerGetCoin = data.registerGetCoin;
  if (data.registerDiamond && data.registerDiamond > 0) glGame.user.registerGetDiamond = data.registerDiamond;

  if (glGame.user.get("userID")) {
    // glGame.gameNet.disconnect();
    this.loginPomelo(data);
  } else this.loginPomelo(data);
};
/**
 * 账号登入数据记录
 */


logon.recordLoinData = function () {
  if (!this.logondata) return;
  var msg = this.logondata;
  glGame.storage.setItem("loginCache", {
    plat: msg.plat,
    pd: msg.password + msg.username,
    le: String(msg.username).length
  }); //手机不让它自动登录

  if (msg.plat == 5) {
    glGame.storage.removeItemByKey("loginCache");
  }

  this.logondata = null;
}; //获取游戏当前状态


logon.ReqGameState = function (gameid, next) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var model = glGame.user.get("gameDisplayType");
  glGame.gameNet.send_msg('http.ReqGameState', {
    id: gameid,
    checkType: type,
    model: model
  }, function (route, data) {
    var tip_txt = null;

    if (data.state == STATE.open && data.processState == PROCESS_STATE.normal) {
      next(data.id);
    } else {
      if (data.state == STATE.close || data.processState == PROCESS_STATE.close) {
        tip_txt = '本游戏已经关闭！';

        if (data.checkType == CHECK_TYPE.platform) {
          tip_txt = '本平台已经关闭！';
        }
      } else {
        tip_txt = '该游戏正在维护升级中，请稍后重试！';

        if (data.checkType == CHECK_TYPE.platform) {
          tip_txt = '该平台正在维护升级中，请稍后重试！';
        }
      }
    }

    if (tip_txt) {
      glGame.panel.showMsgBox('', tip_txt, function () {
        if (cc.director.getScene().name != 'plaza') {
          reStartGame();
        }
      });
    }
  });
};
/**
 * 获取注册配表
 */


logon.reqRegisterConfig = function () {
  var _this = this;

  cc.log("获取注册配表");
  glGame.panel.showJuHua();
  glGame.gameNet.send_msg('http.ReqRegisterConfig', null, function (route, data) {
    glGame.panel.hidejuhua();
    _this.RegisterConfig = data;
    glGame.emitter.emit(MESSAGE.USER.REGISTER_CFG, data);
  });
};
/**
 * 登陆接口回调
 * @param {String} route
 * @param {Object} data
 */


logon.loginNext = function (route, data) {
  this.recordLoinData();
  this.bindAgent = data.isRegister != 0;
  glGame.isfirstEnterPlaza = true;
  this.myInfoData = data.myInfo.data;
  this.isTourist = data.myInfo.data.grade_id == 1 ? true : false;
  this.loginPomelo(data);
};
/**
 * 链接 pomelo
 * @param {Object} msg
 */


logon.loginPomelo = function (msg) {
  this._uid = msg.uid; //在网络管理中记录下登录信息

  glGame.gameNet.getNetMgr().setLoginInfo(this._uid); //登录成功后连接gate

  var servercfg = glGame.servercfg.getServerCfg();
  this.connector_host = servercfg["gameSvrHost"];
  this.connector_port = servercfg["gameSvrPort"];
  glGame.emitter.emit(MESSAGE.NETWORK.PODOT_ON, true);

  if (!this.pomeloConnect) {
    this.pomeloConnect = true;
    glGame.gameNet.connect(this.connector_host, this.connector_port, this.connectConnector.bind(this));
  } else {
    this.enterPlat();
  } //推广绑定


  if (this.bindAgent) {
    if (cc.sys.isNative) {
      var getinstallCB = function getinstallCB(appData) {
        var promote = {
          id: "0",
          channel: "0",
          type: "1"
        };
        var defaultBindData = {
          "player_id": "0",
          "channel": "0",
          "type": "1"
        };
        if (isAndroid && glGame.channelData) promote = glGame.channelData;

        if (isIos) {
          var channel = glGame.logon.getChannelData();
          promote = channel || promote;
        }

        if (appData.bindData == "") {
          defaultBindData.player_id = promote.id;
          defaultBindData.channel = promote.channel;
          defaultBindData.type = promote.type;
          glGame.gameNet.send_msg("http.ReqBindAgent", defaultBindData, function (route, data) {});
          return;
        }

        var bindData = JSON.parse(appData.bindData);
        defaultBindData.player_id = bindData.id ? bindData.id : promote.id;
        defaultBindData.channel = bindData.channel ? bindData.channel : promote.channel;
        defaultBindData.type = bindData.type ? bindData.type : promote.type;
        glGame.gameNet.send_msg("http.ReqBindAgent", defaultBindData, function (route, data) {});
      };

      glGame.oiSdk.getInstall(10, getinstallCB);
    } else {
      var bindData = {
        "player_id": "0",
        "channel": "0",
        "type": "1"
      };
      glGame.gameNet.send_msg("http.ReqBindAgent", bindData, function (route, data) {});
    }

    this.bindAgent = false;
  }
};
/**
 * pomelo connect 服链接回调
 * @param event_type
 * @param event
 */


logon.connectConnector = function (event_type, event) {
  switch (event_type) {
    case 'connect':
      glGame.gameNet.getNetMgr().pomeloConnected(); // 就清除pomelo的发送记录,那么房间那里会自己恢复房间

      glGame.gameNet.getNetMgr().clearPomeloReqs(); // 设置记录房间id

      glGame.room.setServerGameId(); // 进入平台服务

      this.enterPlat();
      break;

    case 'disconnect':
      //告诉网络管理pomelo断开了
      glGame.gameNet.getNetMgr().pomeloDisconnected(); // 关闭连接平台服链接

      glGame.gameNet.getNetMgr().platDisconnect(); // 重新捆绑回调

      glGame.gameNet.connect(this.connector_host, this.connector_port, this.connectConnector.bind(this));
      break;

    case 'onKick':
      // 关闭连接平台服链接
      glGame.gameNet.getNetMgr().platDisconnect();
      this.kicked(event);
      break;
  }
}; //进入平台服


logon.enterPlat = function () {
  if (this.myInfoData) {
    if (this.isTourist) {
      glGame.emitter.emit(MESSAGE.LOGIN.TOURIST_SUCCESS, this.myInfoData);
    } else {
      glGame.emitter.emit(MESSAGE.LOGIN.ACCOUNT_SUCCESS, this.myInfoData);
    }

    this.myInfoData = null;
  }

  var msg = {
    token: glGame.gameNet.getNetMgr().getLoginToken(),
    loginPlat: 1
  };
  glGame.gameNet.send_msg(NETWORK.POMELO.ENTER_PLAT, msg);
};
/**
 * 进入平台
 */


logon.connector_entryHandler_enterPlat = function (msg) {
  glGame.gameNet.getNetMgr().platSucceed();
  glGame.emitter.emit(MESSAGE.NETWORK.PODOT_ON, false);
  glGame.room.reqMyRoomState();
};

logon.kicked = function (event) {
  if (event.reason == NetCode.KickPlayer) {
    this.logOutTo();

    if (this.b_switchAccount) {
      this.b_switchAccount = false;
      reStartGame();
    } else {
      this.offWebView();
      glGame.panel.showMsgBox("", glGame.tips.LOGON.NETERROR, reStartGame);
    }
  } else if (event.reason == NetCode.LoginFromOtherDevice) {
    this.logOutTo();

    if (this.b_switchAccount) {
      this.b_switchAccount = false;
      reStartGame();
    } else {
      this.offWebView();
      glGame.panel.showMsgBox("", glGame.tips.LOGON.LOGINREPEAT, reStartGame);
    }
  } else if (event.reason == NetCode.EmergencyMaintenance) {
    if (this.b_switchAccount) {
      this.b_switchAccount = false;
      reStartGame();
    } else {
      this.offWebView();
      glGame.panel.showMsgBox("", glGame.tips.LOGON.NETERROR, reStartGame);
    }
  }
};

logon.reLogon = function () {
  var loginCache = glGame.storage.getItem("loginCache");

  if (loginCache) {
    var username = loginCache.pd.substr(-loginCache.le);
    glGame.storage.setItem("number", {
      data: username
    });
  } //清除登录缓存


  glGame.storage.removeItemByKey("loginCache"); // 重启游戏

  reStartGame();
};
/**
 * 退出登陆
 */


logon.logout = function () {
  this.b_switchAccount = true;
  glGame.gameNet.send_msg('connector.entryHandler.logout');
};
/**
 * 注销登陆
 */


logon.logOutTo = function () {
  glGame.storage.removeItemByKey("loginCache"); // this.destroy();

  glGame.gameNet.destroy();
};

logon.offWebView = function () {
  glGame.emitter.emit(MESSAGE.UI.WEBVIEW_OFF);
  glGame.platform.changeOrientation(true);
  glGame.systemclass.changeOrientation(true);
  glGame.platform.offSuspension();
  glGame.gameNet.send_msg("http.reqBack", {}, function (route, msg) {});
};

logon.destroy = function () {
  this.resetData();
};

logon.set = function (key, value) {
  this[key] = value;
};

logon.get = function (key) {
  return this[key];
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new Logon();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxcbG9nb24uanMiXSwibmFtZXMiOlsiUFJPQ0VTU19TVEFURSIsIm5vcm1hbCIsIm1haW50YWluIiwiY2xvc2UiLCJTVEFURSIsIm9wZW4iLCJDSEVDS19UWVBFIiwiZ2FtZSIsInBsYXRmb3JtIiwiTmV0Q29kZSIsIkxvZ2luRnJvbU90aGVyRGV2aWNlIiwiS2lja1BsYXllciIsIkVtZXJnZW5jeU1haW50ZW5hbmNlIiwiTG9nb24iLCJyZWdpc3RlckV2ZW50IiwicmVzZXREYXRhIiwibG9nb24iLCJwcm90b3R5cGUiLCJnX2luc3RhbmNlIiwic2VydmVyQ2ZnIiwiX3dlYlJvb3RVcmwiLCJfdWlkIiwiY29ubmVjdG9yX2hvc3QiLCJjb25uZWN0b3JfcG9ydCIsImJfc3dpdGNoQWNjb3VudCIsInZlcmlmaUNEIiwibG9nb25kYXRhIiwibG9naW51cGRhdGEiLCJpc1VwZGF0ZVBsYXphIiwicG9tZWxvQ29ubmVjdCIsImdsR2FtZSIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVUERBVEVfU0VSVkVSX0NGRyIsIm9uVXBkYXRlU2VydmVyQ2ZnIiwiTkVUV09SSyIsIlBPTUVMTyIsIkVOVEVSX1BMQVQiLCJjb25uZWN0b3JfZW50cnlIYW5kbGVyX2VudGVyUGxhdCIsImNoZWNrSVAiLCJvYmoiLCJpcCIsImluZGV4T2YiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJzbGljZSIsImxlbmd0aCIsImV4cCIsIm51bSIsImluZGV4IiwicmVnIiwibWF0Y2giLCJzZXJ2ZXJjZmciLCJnZXRTZXJ2ZXJDZmciLCJob3N0IiwicG9ydCIsImdhbWVOZXQiLCJzZXRXZWJIb3N0IiwicmVxV3hMb2dpbiIsIm1zZyIsImdhbWVTdnJUYWciLCJwbGF0IiwiaW1laSIsImdldE1hY2hpbmVDb2RlIiwicGhvbmVfdmVyc2lvbiIsImdldFBob25lVmVyc2lvbiIsInBob25lX21vZGVsIiwiZ2V0UGhvbmVNb2RlbCIsInBob25lX3R5cGUiLCJnZXRQaG9uZVR5cGUiLCJwYXNzd29yZCIsIm1kNSIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJyZWdpc3RyYXRpb25faWQiLCJnZXRSZWdpc0lEIiwiaXNBdXRvTG9naW4iLCJzdG9yYWdlIiwic2V0SXRlbSIsInBkIiwidXNlcm5hbWUiLCJsZSIsIlN0cmluZyIsIlJlZ2lzdGVyRmlyc3QiLCJnZXRJdGVtIiwidXNlciIsInJlcVVybCIsImdldE9wZW5JbnN0YWxsIiwic2VuZF9tc2ciLCJsb2dpbk5leHQiLCJiaW5kIiwicmVxQWNjTG9naW4iLCJmaXJzdGxvZ2luIiwicGFuZWwiLCJzaG93bGltaXRKdWh1YSIsInJlcVBob25lTG9naW4iLCJjb2RlIiwiZ2V0VmlzaXRvckRhdGEiLCJEYXRlIiwibm93IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwidmlzaXRvckNhY2hlIiwibmVjZXNzYXJ5IiwiaXNMZWdhbCIsImV2ZXJ5IiwicHJvcCIsInN1YnN0ciIsInJlbW92ZUl0ZW1CeUtleSIsInJlcVRvdUxvZ2luIiwiVmlzaXRvckZpcnN0IiwicmVxRGV2ZWxvcFRvdUxvZ2luIiwiYXV0b0xvZ2luIiwibG9naW5DYWNoZSIsIm1hY2hpbmVDb2RlIiwicGhvbmVUeXBlIiwicGhvbmVWZXJzaW9uIiwiZ2V0U3lzdGVtVmVyc2lvbiIsIm9zIiwiT1NfQU5EUk9JRCIsIk9TX0lPUyIsImdldENoYW5uZWxEYXRhIiwidGV4dCIsImdldENsaXBUZXh0IiwibGlzdCIsInNwbGl0IiwiZGF0YWxpc3QiLCJrZXkiLCJkYXRhIiwicm91dGVhZHJlc3MiLCJwcm9tb3RlIiwiaWQiLCJjaGFubmVsIiwidHlwZSIsImlzQW5kcm9pZCIsImNoYW5uZWxEYXRhIiwiaXNJb3MiLCJnZXRpbnN0YWxsQ0IiLCJhcHBEYXRhIiwicGxheWVyX2lkIiwiY2hhbm5lbF90eXBlIiwiYmluZERhdGEiLCJyb3V0ZSIsInJlcVJlZ2lzdGVyTmV4dCIsIkpTT04iLCJwYXJzZSIsIm9pU2RrIiwiZ2V0SW5zdGFsbCIsInJlcVJlZ2lzdGVyIiwicHN3IiwiYWNjIiwicmVxUGhvbmVSZWdpc3RlciIsInBob25lIiwicmVjb3JkTG9pbkRhdGEiLCJiaW5kQWdlbnQiLCJteUluZm9EYXRhIiwibXlJbmZvIiwiaXNUb3VyaXN0IiwiZ3JhZGVfaWQiLCJyZWdpc3RlckdldENvaW4iLCJyZWdpc3RlckRpYW1vbmQiLCJyZWdpc3RlckdldERpYW1vbmQiLCJnZXQiLCJsb2dpblBvbWVsbyIsIlJlcUdhbWVTdGF0ZSIsImdhbWVpZCIsIm5leHQiLCJtb2RlbCIsImNoZWNrVHlwZSIsInRpcF90eHQiLCJzdGF0ZSIsInByb2Nlc3NTdGF0ZSIsInNob3dNc2dCb3giLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsInJlU3RhcnRHYW1lIiwicmVxUmVnaXN0ZXJDb25maWciLCJsb2ciLCJzaG93SnVIdWEiLCJoaWRlanVodWEiLCJSZWdpc3RlckNvbmZpZyIsImVtaXQiLCJVU0VSIiwiUkVHSVNURVJfQ0ZHIiwiaXNSZWdpc3RlciIsImlzZmlyc3RFbnRlclBsYXphIiwidWlkIiwiZ2V0TmV0TWdyIiwic2V0TG9naW5JbmZvIiwiUE9ET1RfT04iLCJjb25uZWN0IiwiY29ubmVjdENvbm5lY3RvciIsImVudGVyUGxhdCIsImRlZmF1bHRCaW5kRGF0YSIsImV2ZW50X3R5cGUiLCJldmVudCIsInBvbWVsb0Nvbm5lY3RlZCIsImNsZWFyUG9tZWxvUmVxcyIsInJvb20iLCJzZXRTZXJ2ZXJHYW1lSWQiLCJwb21lbG9EaXNjb25uZWN0ZWQiLCJwbGF0RGlzY29ubmVjdCIsImtpY2tlZCIsIkxPR0lOIiwiVE9VUklTVF9TVUNDRVNTIiwiQUNDT1VOVF9TVUNDRVNTIiwidG9rZW4iLCJnZXRMb2dpblRva2VuIiwibG9naW5QbGF0IiwicGxhdFN1Y2NlZWQiLCJyZXFNeVJvb21TdGF0ZSIsInJlYXNvbiIsImxvZ091dFRvIiwib2ZmV2ViVmlldyIsInRpcHMiLCJMT0dPTiIsIk5FVEVSUk9SIiwiTE9HSU5SRVBFQVQiLCJyZUxvZ29uIiwibG9nb3V0IiwiZGVzdHJveSIsIlVJIiwiV0VCVklFV19PRkYiLCJjaGFuZ2VPcmllbnRhdGlvbiIsInN5c3RlbWNsYXNzIiwib2ZmU3VzcGVuc2lvbiIsInNldCIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhLEdBQUc7QUFDaEJDLEVBQUFBLE1BQU0sRUFBRSxDQURRO0FBRWhCQyxFQUFBQSxRQUFRLEVBQUUsQ0FGTTtBQUdoQkMsRUFBQUEsS0FBSyxFQUFFO0FBSFMsQ0FBcEI7QUFLQSxJQUFJQyxLQUFLLEdBQUc7QUFDUkMsRUFBQUEsSUFBSSxFQUFFLENBREU7QUFFUkYsRUFBQUEsS0FBSyxFQUFFO0FBRkMsQ0FBWjtBQUlBLElBQUlHLFVBQVUsR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsQ0FETztBQUViQyxFQUFBQSxRQUFRLEVBQUU7QUFGRyxDQUFqQjtBQUtBOzs7O0FBR0EsSUFBSUMsT0FBTyxHQUFHO0FBQ1ZDLEVBQUFBLG9CQUFvQixFQUFFLFFBRFo7QUFDc0I7QUFDaENDLEVBQUFBLFVBQVUsRUFBRSxRQUZGO0FBRVk7QUFDdEJDLEVBQUFBLG9CQUFvQixFQUFFLFFBSFosQ0FHc0I7O0FBSHRCLENBQWQ7QUFBQSxJQUtJQyxLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFZO0FBQ2hCLE9BQUtDLGFBQUw7QUFDQSxPQUFLQyxTQUFMO0FBQ0gsQ0FSTDtBQUFBLElBU0lDLEtBQUssR0FBR0gsS0FBSyxDQUFDSSxTQVRsQjtBQUFBLElBVUlDLFVBQVUsR0FBRyxJQVZqQjtBQVlBOzs7OztBQUdBRixLQUFLLENBQUNELFNBQU4sR0FBa0IsWUFBWTtBQUMxQixPQUFLSSxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLE9BQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLE9BQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxPQUFLQyxl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dk0sRUFBQUEsTUFBTSxDQUFDMkIsT0FBUCxDQUFlaUMsUUFBZixDQUF3QixjQUF4QixFQUF3QyxFQUF4QyxFQUE0QyxVQUFDdUQsS0FBRCxFQUFRckYsR0FBUixFQUFnQixDQUFHLENBQS9EO0FBQ0gsQ0FORDs7QUFRQTVDLEtBQUssQ0FBQ2dOLE9BQU4sR0FBZ0IsWUFBWTtBQUN4QixPQUFLak4sU0FBTDtBQUNILENBRkQ7O0FBR0FDLEtBQUssQ0FBQ3NOLEdBQU4sR0FBWSxVQUFVcEcsR0FBVixFQUFlcUcsS0FBZixFQUFzQjtBQUM5QixPQUFLckcsR0FBTCxJQUFZcUcsS0FBWjtBQUNILENBRkQ7O0FBR0F2TixLQUFLLENBQUNxSixHQUFOLEdBQVksVUFBVW5DLEdBQVYsRUFBZTtBQUN2QixTQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNILENBRkQ7O0FBSUFzRyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsWUFBWTtBQUN6QixNQUFJLENBQUN2TixVQUFMLEVBQWlCO0FBQ2JBLElBQUFBLFVBQVUsR0FBRyxJQUFJTCxLQUFKLEVBQWI7QUFDSDs7QUFDRCxTQUFPSyxVQUFQO0FBQ0gsQ0FMRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFBST0NFU1NfU1RBVEUgPSB7XHJcbiAgICBub3JtYWw6IDEsXHJcbiAgICBtYWludGFpbjogMixcclxuICAgIGNsb3NlOiAzLFxyXG59XHJcbmxldCBTVEFURSA9IHtcclxuICAgIG9wZW46IDEsXHJcbiAgICBjbG9zZTogMixcclxufVxyXG5sZXQgQ0hFQ0tfVFlQRSA9IHtcclxuICAgIGdhbWU6IDEsXHJcbiAgICBwbGF0Zm9ybTogMixcclxufVxyXG5cclxuLyoqXHJcbiAqIOeZu+mZhuaVsOaNruaooeWdl1xyXG4gKi9cclxubGV0IE5ldENvZGUgPSB7XHJcbiAgICBMb2dpbkZyb21PdGhlckRldmljZTogMjAxMDAwMTQsIC8vIOWcqOWIq+eahOiuvuWkh+eZu+WFpVxyXG4gICAgS2lja1BsYXllcjogMjAxMDAwMTUsIC8vIOi4ouS4i+e6v1xyXG4gICAgRW1lcmdlbmN5TWFpbnRlbmFuY2U6IDIwMTAwMDE2LCAvLyDntKfmgKXnu7TmiqRcclxufSxcclxuICAgIExvZ29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICB9LFxyXG4gICAgbG9nb24gPSBMb2dvbi5wcm90b3R5cGUsXHJcbiAgICBnX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiDmlbDmja7ph43nva5cclxuICovXHJcbmxvZ29uLnJlc2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VydmVyQ2ZnID0gbnVsbDtcclxuICAgIHRoaXMuX3dlYlJvb3RVcmwgPSBudWxsO1xyXG4gICAgdGhpcy5fdWlkID0gbnVsbDtcclxuICAgIHRoaXMuY29ubmVjdG9yX2hvc3QgPSBudWxsO1xyXG4gICAgdGhpcy5jb25uZWN0b3JfcG9ydCA9IG51bGw7XHJcbiAgICB0aGlzLmJfc3dpdGNoQWNjb3VudCA9IG51bGw7XHJcbiAgICB0aGlzLnZlcmlmaUNEID0gNjA7XHJcbiAgICB0aGlzLmxvZ29uZGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLmxvZ2ludXBkYXRhID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzVXBkYXRlUGxhemEgPSBmYWxzZTtcclxuICAgIHRoaXMucG9tZWxvQ29ubmVjdCA9IGZhbHNlO1xyXG59XHJcbi8qKlxyXG4gKiDms6jlhozkuovku7bnm5HlkKxcclxuICog5pWw5o2u5qih5Z6L55qE5LqL5Lu25peg6ZyA6ZSA5q+BXHJcbiAqIOeQhuiuuuS4iumHjeWQr+a4uOaIj+WQjuiHquWKqOWwseS4jeWtmOWcqOS6hlxyXG4gKi9cclxubG9nb24ucmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVVBEQVRFX1NFUlZFUl9DRkcsIHRoaXMub25VcGRhdGVTZXJ2ZXJDZmcsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oTkVUV09SSy5QT01FTE8uRU5URVJfUExBVCwgdGhpcy5jb25uZWN0b3JfZW50cnlIYW5kbGVyX2VudGVyUGxhdCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKTlrprmmK/lkKbkuLppcFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqXHJcbiAqL1xyXG5sb2dvbi5jaGVja0lQID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGlwID0gb2JqO1xyXG4gICAgaWYgKGlwLmluZGV4T2YoXCIgXCIpID49IDApIHtcclxuICAgICAgICBpcCA9IGlwLnJlcGxhY2UoLyAvZywgXCJcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoaXAudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiaHR0cDovL1wiKSA9PSAwKSB7XHJcbiAgICAgICAgaXAgPSBpcC5zbGljZSg3KTtcclxuICAgIH1cclxuICAgIGlmIChpcC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJodHRwczovL1wiKSA9PSAwKSB7XHJcbiAgICAgICAgaXAgPSBpcC5zbGljZSg4KTtcclxuICAgIH1cclxuICAgIGlmIChpcC5zbGljZShpcC5sZW5ndGggLSAxKSA9PSBcIi9cIikge1xyXG4gICAgICAgIGlwID0gaXAuc2xpY2UoMCwgaXAubGVuZ3RoIC0gMSk7XHJcbiAgICB9XHJcbiAgICB2YXIgZXhwID0gbnVsbDtcclxuICAgIGxldCBudW0gPSAwO1xyXG4gICAgLy8gaXB2NCAgaXB2NlxyXG4gICAgZm9yIChsZXQgaW5kZXggaW4gaXApIHsgaXBbaW5kZXhdID09PSBcIi5cIiA/IG51bSsrIDogMDsgfVxyXG4gICAgaWYgKG51bSA8PSA0KVxyXG4gICAgICAgIGV4cCA9IC9eKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pJC87XHJcbiAgICBlbHNlXHJcbiAgICAgICAgZXhwID0gL14oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkezEsMn18MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSkkLztcclxuICAgIHZhciByZWcgPSBpcC5tYXRjaChleHApO1xyXG4gICAgaWYgKHJlZyA9PSBudWxsKSByZXR1cm4gZmFsc2U7Ly/kuI3lkIjms5VcclxuICAgIGVsc2UgcmV0dXJuIHRydWU7IC8v5ZCI5rOVXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmm7TmlrDov57mjqXmnI3liqHlmajphY3nva5cclxuICovXHJcbmxvZ29uLm9uVXBkYXRlU2VydmVyQ2ZnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJDZmcgPSBnbEdhbWUuc2VydmVyY2ZnLmdldFNlcnZlckNmZygpO1xyXG4gICAgbGV0IGhvc3QgPSB0aGlzLnNlcnZlckNmZ1tcInBsYXRTdnJIb3N0XCJdLFxyXG4gICAgICAgIHBvcnQgPSB0aGlzLnNlcnZlckNmZ1tcInBsYXRTdnJQb3J0XCJdO1xyXG5cclxuICAgIGlmIChob3N0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImh0dHBzOi8vXCIpID49IDAgfHwgaG9zdC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJodHRwOi8vXCIpID49IDApIHRoaXMuX3dlYlJvb3RVcmwgPSBob3N0O1xyXG4gICAgZWxzZSB0aGlzLl93ZWJSb290VXJsID0gYGh0dHA6Ly8ke2hvc3R9YDtcclxuXHJcbiAgICBpZiAocG9ydCA+IDApIHRoaXMuX3dlYlJvb3RVcmwgPSBgJHt0aGlzLl93ZWJSb290VXJsfToke3BvcnR9YDtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNldFdlYkhvc3QodGhpcy5fd2ViUm9vdFVybCk7XHJcbn1cclxuLyoqXHJcbiAqIOW+ruS/oeWPt+eZu+mZhlxyXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnXHJcbiAqL1xyXG5sb2dvbi5yZXFXeExvZ2luID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgbXNnLmdhbWVTdnJUYWcgPSB0aGlzLnNlcnZlckNmZy5nYW1lU3ZyVGFnO1xyXG4gICAgbXNnLnBsYXQgPSA0O1xyXG4gICAgbXNnLmltZWkgPSB0aGlzLmdldE1hY2hpbmVDb2RlKCk7XHJcbiAgICBtc2cucGhvbmVfdmVyc2lvbiA9IHRoaXMuZ2V0UGhvbmVWZXJzaW9uKCk7XHJcbiAgICBtc2cucGhvbmVfbW9kZWwgPSB0aGlzLmdldFBob25lTW9kZWwoKTtcclxuICAgIG1zZy5waG9uZV90eXBlID0gdGhpcy5nZXRQaG9uZVR5cGUoKTtcclxuICAgIG1zZy5wYXNzd29yZCA9IG1kNShcIjEyMzQ1NlwiKVxyXG4gICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIG1zZy5yZWdpc3RyYXRpb25faWQgPSBnbEdhbWUucGxhdGZvcm0uZ2V0UmVnaXNJRCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0F1dG9Mb2dpbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1VwZGF0ZVBsYXphID0gdHJ1ZTtcclxuICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJsb2dpbkNhY2hlXCIsIHsgcGxhdDogNCwgcGQ6IG1zZy51c2VybmFtZSArIG1zZy51c2VybmFtZSwgbGU6IFN0cmluZyhtc2cudXNlcm5hbWUpLmxlbmd0aCB9KTtcclxuICAgIGxldCBSZWdpc3RlckZpcnN0ID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShcIlJlZ2lzdGVyRmlyc3RcIilcclxuICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgaWYgKCFSZWdpc3RlckZpcnN0ICYmIGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3Blbkluc3RhbGwobXNnLCAnaHR0cC5yZXFMb2dpbicpO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJSZWdpc3RlckZpcnN0XCIsIHt9KVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcUxvZ2luJywgbXNnLCB0aGlzLmxvZ2luTmV4dC5iaW5kKHRoaXMpKTtcclxufVxyXG4vKipcclxuICog6LSm5Y+355m76ZmGXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcclxuICovXHJcbmxvZ29uLnJlcUFjY0xvZ2luID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5maXJzdGxvZ2luID0gZmFsc2U7Ly/mmK/lkKbkuLrnrKzkuIDmrKHms6jlhoznmbvlvZVcclxuICAgIG1zZy5nYW1lU3ZyVGFnID0gdGhpcy5zZXJ2ZXJDZmcuZ2FtZVN2clRhZztcclxuICAgIG1zZy5wbGF0ID0gMTtcclxuICAgIG1zZy5pbWVpID0gdGhpcy5nZXRNYWNoaW5lQ29kZSgpO1xyXG4gICAgbXNnLnBob25lX3ZlcnNpb24gPSB0aGlzLmdldFBob25lVmVyc2lvbigpO1xyXG4gICAgbXNnLnBob25lX21vZGVsID0gdGhpcy5nZXRQaG9uZU1vZGVsKCk7XHJcbiAgICBtc2cucGhvbmVfdHlwZSA9IHRoaXMuZ2V0UGhvbmVUeXBlKCk7XHJcbiAgICB0aGlzLmxvZ29uZGF0YSA9IHsgcGxhdDogbXNnLnBsYXQsIHBhc3N3b3JkOiBtc2cucGFzc3dvcmQsIHVzZXJuYW1lOiBtc2cudXNlcm5hbWUgfTtcclxuICAgIHRoaXMuaXNBdXRvTG9naW4gPSBmYWxzZTtcclxuICAgIHRoaXMuaXNVcGRhdGVQbGF6YSA9IHRydWU7XHJcbiAgICBtc2cucGhvbmVfdHlwZSA9IHRoaXMuZ2V0UGhvbmVUeXBlKCk7XHJcbiAgICBnbEdhbWUucGFuZWwuc2hvd2xpbWl0SnVodWEoKTtcclxuICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxTG9naW4nLCBtc2csIHRoaXMubG9naW5OZXh0LmJpbmQodGhpcykpO1xyXG59XHJcbi8qKlxyXG4gKiDmiYvmnLrlj7fnmbvpmYZcclxuICogQHBhcmFtIHtPYmplY3R9IG1zZ1xyXG4gKi9cclxubG9nb24ucmVxUGhvbmVMb2dpbiA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIHRoaXMuZmlyc3Rsb2dpbiA9IGZhbHNlOy8v5piv5ZCm5Li656ys5LiA5qyh5rOo5YaM55m75b2VXHJcbiAgICBtc2cuZ2FtZVN2clRhZyA9IHRoaXMuc2VydmVyQ2ZnLmdhbWVTdnJUYWc7XHJcbiAgICBtc2cucGxhdCA9IDU7XHJcbiAgICBtc2cuaW1laSA9IHRoaXMuZ2V0TWFjaGluZUNvZGUoKTtcclxuICAgIG1zZy5waG9uZV92ZXJzaW9uID0gdGhpcy5nZXRQaG9uZVZlcnNpb24oKTtcclxuICAgIG1zZy5waG9uZV9tb2RlbCA9IHRoaXMuZ2V0UGhvbmVNb2RlbCgpO1xyXG4gICAgbXNnLnBob25lX3R5cGUgPSB0aGlzLmdldFBob25lVHlwZSgpO1xyXG4gICAgdGhpcy5sb2dvbmRhdGEgPSB7IHBsYXQ6IG1zZy5wbGF0LCBjb2RlOiBtc2cuY29kZSwgdXNlcm5hbWU6IG1zZy51c2VybmFtZSB9O1xyXG4gICAgdGhpcy5pc0F1dG9Mb2dpbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1VwZGF0ZVBsYXphID0gdHJ1ZTtcclxuICAgIG1zZy5waG9uZV90eXBlID0gdGhpcy5nZXRQaG9uZVR5cGUoKTtcclxuICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxTG9naW4nLCBtc2csIHRoaXMubG9naW5OZXh0LmJpbmQodGhpcykpO1xyXG59XHJcbi8qKlxyXG4gKiDmuLjlrqLmlbDmja7ojrflj5ZcclxuICovXHJcbmxvZ29uLmdldFZpc2l0b3JEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG1zZyA9IHtcclxuICAgICAgICBnYW1lU3ZyVGFnOiB0aGlzLnNlcnZlckNmZy5nYW1lU3ZyVGFnLFxyXG4gICAgICAgIHBsYXQ6IDIsXHJcbiAgICAgICAgdXNlcm5hbWU6IFwiXCIgKyBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSxcclxuICAgICAgICBwYXNzd29yZDogbWQ1KERhdGUubm93KCkudG9TdHJpbmcoKSksXHJcbiAgICAgICAgaW1laTogdGhpcy5nZXRNYWNoaW5lQ29kZSgpLFxyXG4gICAgICAgIHBob25lX3ZlcnNpb246IHRoaXMuZ2V0UGhvbmVWZXJzaW9uKCksXHJcbiAgICAgICAgcGhvbmVfbW9kZWw6IHRoaXMuZ2V0UGhvbmVNb2RlbCgpLFxyXG4gICAgICAgIHBob25lX3R5cGU6IHRoaXMuZ2V0UGhvbmVUeXBlKCksXHJcbiAgICB9O1xyXG4gICAgbGV0IHZpc2l0b3JDYWNoZSA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oXCJ2aXNpdG9yQ2FjaGVcIik7XHJcbiAgICBpZiAodmlzaXRvckNhY2hlKSB7XHJcbiAgICAgICAgLy8g5Yik5pat55m75b2V57yT5a2Y5Lit55qE5Y+C5pWw5piv5ZCm5ZCI5rOVXHJcbiAgICAgICAgbGV0IG5lY2Vzc2FyeSA9IFtcInBsYXRcIiwgXCJwZFwiLCBcImxlXCJdO1xyXG4gICAgICAgIGxldCBpc0xlZ2FsID0gbmVjZXNzYXJ5LmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZpc2l0b3JDYWNoZVtwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2aXNpdG9yQ2FjaGVbcHJvcF0gIT09IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzTGVnYWwpIHtcclxuICAgICAgICAgICAgbXNnLnVzZXJuYW1lID0gdmlzaXRvckNhY2hlLnBkLnN1YnN0cigtdmlzaXRvckNhY2hlLmxlKTtcclxuICAgICAgICAgICAgbXNnLnBhc3N3b3JkID0gdmlzaXRvckNhY2hlLnBkLnN1YnN0cigwLCB2aXNpdG9yQ2FjaGUucGQubGVuZ3RoIC0gdmlzaXRvckNhY2hlLmxlKTtcclxuICAgICAgICAgICAgbXNnLnBsYXQgPSB2aXNpdG9yQ2FjaGUucGxhdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuc3RvcmFnZS5yZW1vdmVJdGVtQnlLZXkoXCJ2aXNpdG9yQ2FjaGVcIik7XHJcbiAgICAgICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJ2aXNpdG9yQ2FjaGVcIiwgeyBwbGF0OiBtc2cucGxhdCwgcGQ6IG1zZy5wYXNzd29yZCArIG1zZy51c2VybmFtZSwgbGU6IFN0cmluZyhtc2cudXNlcm5hbWUpLmxlbmd0aCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJ2aXNpdG9yQ2FjaGVcIiwgeyBwbGF0OiBtc2cucGxhdCwgcGQ6IG1zZy5wYXNzd29yZCArIG1zZy51c2VybmFtZSwgbGU6IFN0cmluZyhtc2cudXNlcm5hbWUpLmxlbmd0aCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtc2c7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmuLjlrqLnmbvpmYZcclxuICovXHJcbmxvZ29uLnJlcVRvdUxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG1zZyA9IHRoaXMuZ2V0VmlzaXRvckRhdGEoKTtcclxuICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICBtc2cucmVnaXN0cmF0aW9uX2lkID0gZ2xHYW1lLnBsYXRmb3JtLmdldFJlZ2lzSUQoKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9nb25kYXRhID0geyBwbGF0OiBtc2cucGxhdCwgcGFzc3dvcmQ6IG1zZy5wYXNzd29yZCwgdXNlcm5hbWU6IG1zZy51c2VybmFtZSB9O1xyXG4gICAgdGhpcy5pc0F1dG9Mb2dpbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1VwZGF0ZVBsYXphID0gdHJ1ZTtcclxuICAgIGxldCBWaXNpdG9yRmlyc3QgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKFwiVmlzaXRvckZpcnN0XCIpLy/nrKzkuIDmrKHmuLjlrqLnmbvlvZXopoHlj5FvcGVuc3RhbGzkv6Hmga9cclxuICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgaWYgKCFWaXNpdG9yRmlyc3QgJiYgY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRPcGVuSW5zdGFsbChtc2csICdodHRwLnJlcUxvZ2luJyk7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbShcIlZpc2l0b3JGaXJzdFwiLCB7fSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxTG9naW4nLCBtc2csIHRoaXMubG9naW5OZXh0LmJpbmQodGhpcykpO1xyXG59XHJcbi8qKlxyXG4gKiDlvIDlj5HmqKHlvI/nmoTotKblj7fnmbvlvZVcclxuICovXHJcbmxvZ29uLnJlcURldmVsb3BUb3VMb2dpbiA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIG1zZy5wYXNzd29yZCA9IG1kNShcIjEyMzQ1NlwiKTtcclxuICAgIG1zZy5nYW1lU3ZyVGFnID0gdGhpcy5zZXJ2ZXJDZmcuZ2FtZVN2clRhZztcclxuICAgIG1zZy5wbGF0ID0gMztcclxuICAgIG1zZy5pbWVpID0gdGhpcy5nZXRNYWNoaW5lQ29kZSgpO1xyXG4gICAgdGhpcy5sb2dvbmRhdGEgPSB7IHBsYXQ6IG1zZy5wbGF0LCBwYXNzd29yZDogbXNnLnBhc3N3b3JkLCB1c2VybmFtZTogbXNnLnVzZXJuYW1lIH07XHJcbiAgICB0aGlzLmlzQXV0b0xvZ2luID0gZmFsc2U7XHJcbiAgICBtc2cucGhvbmVfdHlwZSA9IHRoaXMuZ2V0UGhvbmVUeXBlKCk7XHJcbiAgICBnbEdhbWUudXNlci5yZXFVcmwoKTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcUxvZ2luJywgbXNnLCB0aGlzLmxvZ2luTmV4dC5iaW5kKHRoaXMpKTtcclxuXHJcbn1cclxuLyoqXHJcbiAqIOiHquWKqOeZu+mZhlxyXG4gKi9cclxubG9nb24uYXV0b0xvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGxvZ2luQ2FjaGUgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKFwibG9naW5DYWNoZVwiKTtcclxuICAgIGlmIChsb2dpbkNhY2hlKSB7XHJcbiAgICAgICAgLy8g5Yik5pat55m75b2V57yT5a2Y5Lit55qE5Y+C5pWw5piv5ZCm5ZCI5rOVXHJcbiAgICAgICAgbGV0IG5lY2Vzc2FyeSA9IFtcInBsYXRcIiwgXCJwZFwiLCBcImxlXCJdO1xyXG4gICAgICAgIGxldCBpc0xlZ2FsID0gbmVjZXNzYXJ5LmV2ZXJ5KHByb3AgPT4geyByZXR1cm4gdHlwZW9mIGxvZ2luQ2FjaGVbcHJvcF0gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9naW5DYWNoZVtwcm9wXSAhPT0gbnVsbDsgfSk7XHJcbiAgICAgICAgaWYgKGlzTGVnYWwpIHtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IHt9XHJcbiAgICAgICAgICAgIG1zZy5nYW1lU3ZyVGFnID0gdGhpcy5zZXJ2ZXJDZmcuZ2FtZVN2clRhZztcclxuICAgICAgICAgICAgbXNnLnVzZXJuYW1lID0gbG9naW5DYWNoZS5wZC5zdWJzdHIoLWxvZ2luQ2FjaGUubGUpO1xyXG4gICAgICAgICAgICBtc2cucGFzc3dvcmQgPSBsb2dpbkNhY2hlLnBkLnN1YnN0cigwLCBsb2dpbkNhY2hlLnBkLmxlbmd0aCAtIGxvZ2luQ2FjaGUubGUpO1xyXG4gICAgICAgICAgICBtc2cucGxhdCA9IGxvZ2luQ2FjaGUucGxhdDtcclxuICAgICAgICAgICAgbXNnLmltZWkgPSB0aGlzLmdldE1hY2hpbmVDb2RlKCk7XHJcbiAgICAgICAgICAgIG1zZy5waG9uZV92ZXJzaW9uID0gdGhpcy5nZXRQaG9uZVZlcnNpb24oKSxcclxuICAgICAgICAgICAgICAgIG1zZy5waG9uZV9tb2RlbCA9IHRoaXMuZ2V0UGhvbmVNb2RlbCgpLFxyXG4gICAgICAgICAgICAgICAgbXNnLnBob25lX3R5cGUgPSB0aGlzLmdldFBob25lVHlwZSgpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0F1dG9Mb2dpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5yZXFMb2dpbicsIG1zZywgdGhpcy5sb2dpbk5leHQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5zdG9yYWdlLnJlbW92ZUl0ZW1CeUtleShcImxvZ2luQ2FjaGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5sb2dvbi5nZXRNYWNoaW5lQ29kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBtYWNoaW5lQ29kZSA9IGNjLnN5cy5pc05hdGl2ZSA/IGdsR2FtZS5wbGF0Zm9ybS5nZXRNYWNoaW5lQ29kZSgpIDogMDtcclxuICAgIHJldHVybiBtYWNoaW5lQ29kZTtcclxufVxyXG5cclxubG9nb24uZ2V0UGhvbmVNb2RlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBwaG9uZVR5cGUgPSBjYy5zeXMuaXNOYXRpdmUgPyBnbEdhbWUucGxhdGZvcm0uZ2V0UGhvbmVNb2RlbCgpIDogbnVsbDtcclxuICAgIHJldHVybiBwaG9uZVR5cGU7XHJcbn1cclxubG9nb24uZ2V0UGhvbmVWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHBob25lVmVyc2lvbiA9IGNjLnN5cy5pc05hdGl2ZSA/IGdsR2FtZS5wbGF0Zm9ybS5nZXRTeXN0ZW1WZXJzaW9uKCkgOiAwO1xyXG4gICAgcmV0dXJuIHBob25lVmVyc2lvblxyXG59XHJcbmxvZ29uLmdldFBob25lVHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBwaG9uZV90eXBlO1xyXG4gICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICBwaG9uZV90eXBlID0gMTtcclxuICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgcGhvbmVfdHlwZSA9IDI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBob25lX3R5cGUgPSAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBob25lX3R5cGU7XHJcbn1cclxuXHJcbmxvZ29uLmdldENoYW5uZWxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRleHQgPSBnbEdhbWUucGxhdGZvcm0uZ2V0Q2xpcFRleHQoKTtcclxuICAgIGlmICh0eXBlb2YgdGV4dCA9PSBcInN0cmluZ1wiICYmIHRleHQgIT0gXCJcIikge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGV4dC5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YWxpc3QgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbGlzdFtrZXldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIGRhdGFsaXN0W2RhdGFbMF1dID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YWxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5sb2dvbi5nZXRPcGVuSW5zdGFsbCA9IGZ1bmN0aW9uIChtc2csIHJvdXRlYWRyZXNzKSB7XHJcbiAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgbGV0IHByb21vdGUgPSB7IGlkOiBcIjBcIiwgY2hhbm5lbDogXCIwXCIsIHR5cGU6IFwiMFwiIH1cclxuICAgICAgICBpZiAoaXNBbmRyb2lkICYmIGdsR2FtZS5jaGFubmVsRGF0YSkgcHJvbW90ZSA9IGdsR2FtZS5jaGFubmVsRGF0YTtcclxuICAgICAgICBpZiAoaXNJb3MpIHtcclxuICAgICAgICAgICAgbGV0IGNoYW5uZWwgPSB0aGlzLmdldENoYW5uZWxEYXRhKCk7XHJcbiAgICAgICAgICAgIHByb21vdGUgPSBjaGFubmVsIHx8IHByb21vdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBnZXRpbnN0YWxsQ0IgPSBmdW5jdGlvbiAoYXBwRGF0YSkge1xyXG4gICAgICAgICAgICBtc2cucGxheWVyX2lkID0gcHJvbW90ZS5pZDtcclxuICAgICAgICAgICAgbXNnLmNoYW5uZWwgPSBwcm9tb3RlLmNoYW5uZWw7XHJcbiAgICAgICAgICAgIG1zZy5jaGFubmVsX3R5cGUgPSBwcm9tb3RlLnR5cGU7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgICAgICAgICBpZiAoYXBwRGF0YS5iaW5kRGF0YSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhyb3V0ZWFkcmVzcywgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZWFkcmVzcyA9PSBcImh0dHAucmVxTG9naW5cIiA/IGdsR2FtZS5sb2dvbi5sb2dpbk5leHQocm91dGUsIGRhdGEpIDogZ2xHYW1lLmxvZ29uLnJlcVJlZ2lzdGVyTmV4dChyb3V0ZSwgZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBiaW5kRGF0YSA9IEpTT04ucGFyc2UoYXBwRGF0YS5iaW5kRGF0YSk7XHJcbiAgICAgICAgICAgIG1zZy5wbGF5ZXJfaWQgPSBiaW5kRGF0YS5pZCA/IGJpbmREYXRhLmlkIDogcHJvbW90ZS5pZDtcclxuICAgICAgICAgICAgbXNnLmNoYW5uZWwgPSBiaW5kRGF0YS5jaGFubmVsID8gYmluZERhdGEuY2hhbm5lbCA6IHByb21vdGUuY2hhbm5lbDtcclxuICAgICAgICAgICAgbXNnLmNoYW5uZWxfdHlwZSA9IGJpbmREYXRhLnR5cGUgPyBiaW5kRGF0YS50eXBlIDogcHJvbW90ZS50eXBlO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhyb3V0ZWFkcmVzcywgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJvdXRlYWRyZXNzID09IFwiaHR0cC5yZXFMb2dpblwiID8gZ2xHYW1lLmxvZ29uLmxvZ2luTmV4dChyb3V0ZSwgZGF0YSkgOiBnbEdhbWUubG9nb24ucmVxUmVnaXN0ZXJOZXh0KHJvdXRlLCBkYXRhKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLm9pU2RrLmdldEluc3RhbGwoMCwgZ2V0aW5zdGFsbENCKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbXNnLnBsYXllcl9pZCA9IFwiMFwiO1xyXG4gICAgICAgIG1zZy5jaGFubmVsID0gXCIwXCI7XHJcbiAgICAgICAgbXNnLmNoYW5uZWxfdHlwZSA9IFwiMVwiO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKHJvdXRlYWRyZXNzLCBtc2csIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICByb3V0ZWFkcmVzcyA9PSBcImh0dHAucmVxTG9naW5cIiA/IGdsR2FtZS5sb2dvbi5sb2dpbk5leHQocm91dGUsIGRhdGEpIDogZ2xHYW1lLmxvZ29uLnJlcVJlZ2lzdGVyTmV4dChyb3V0ZSwgZGF0YSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICog6LSm5Y+35rOo5YaMXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcclxuICovXHJcbmxvZ29uLnJlcVJlZ2lzdGVyID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5maXJzdGxvZ2luID0gdHJ1ZTsvL+aYr+WQpuS4uuesrOS4gOasoeazqOWGjOeZu+W9lVxyXG4gICAgbXNnLmdhbWVTdnJUYWcgPSB0aGlzLnNlcnZlckNmZy5nYW1lU3ZyVGFnO1xyXG4gICAgbXNnLmltZWkgPSB0aGlzLmdldE1hY2hpbmVDb2RlKCk7XHJcbiAgICBtc2cucGhvbmVfdmVyc2lvbiA9IHRoaXMuZ2V0UGhvbmVWZXJzaW9uKCk7XHJcbiAgICBtc2cucGhvbmVfbW9kZWwgPSB0aGlzLmdldFBob25lTW9kZWwoKTtcclxuICAgIG1zZy5waG9uZV90eXBlID0gdGhpcy5nZXRQaG9uZVR5cGUoKTtcclxuICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICBtc2cucmVnaXN0cmF0aW9uX2lkID0gZ2xHYW1lLnBsYXRmb3JtLmdldFJlZ2lzSUQoKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9nb25kYXRhID0geyBwbGF0OiAxLCBwYXNzd29yZDogbXNnLnBzdywgdXNlcm5hbWU6IG1zZy5hY2MgfTtcclxuICAgIGdsR2FtZS5wYW5lbC5zaG93bGltaXRKdWh1YSgpO1xyXG4gICAgdGhpcy5pc1VwZGF0ZVBsYXphID0gdHJ1ZVxyXG4gICAgbGV0IFJlZ2lzdGVyRmlyc3QgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKFwiUmVnaXN0ZXJGaXJzdFwiKVxyXG4gICAgaWYgKCFSZWdpc3RlckZpcnN0ICYmIGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3Blbkluc3RhbGwobXNnLCAnaHR0cC5yZXFSZWdpc3RlcicpO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJSZWdpc3RlckZpcnN0XCIsIHt9KVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcVJlZ2lzdGVyJywgbXNnLCB0aGlzLnJlcVJlZ2lzdGVyTmV4dC5iaW5kKHRoaXMpKTtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICog5omL5py65rOo5YaMXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcclxuICovXHJcbmxvZ29uLnJlcVBob25lUmVnaXN0ZXIgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICB0aGlzLmZpcnN0bG9naW4gPSB0cnVlOy8v5piv5ZCm5Li656ys5LiA5qyh5rOo5YaM55m75b2VXHJcbiAgICBtc2cuaW1laSA9IHRoaXMuZ2V0TWFjaGluZUNvZGUoKTtcclxuICAgIG1zZy5waG9uZV92ZXJzaW9uID0gdGhpcy5nZXRQaG9uZVZlcnNpb24oKTtcclxuICAgIG1zZy5waG9uZV9tb2RlbCA9IHRoaXMuZ2V0UGhvbmVNb2RlbCgpO1xyXG4gICAgbXNnLnBob25lX3R5cGUgPSB0aGlzLmdldFBob25lVHlwZSgpO1xyXG4gICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIG1zZy5yZWdpc3RyYXRpb25faWQgPSBnbEdhbWUucGxhdGZvcm0uZ2V0UmVnaXNJRCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2dvbmRhdGEgPSB7IHBsYXQ6IDEsIHBhc3N3b3JkOiBtc2cucGFzc3dvcmQsIHVzZXJuYW1lOiBtc2cucGhvbmUgfTtcclxuICAgIGxldCBSZWdpc3RlckZpcnN0ID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShcIlJlZ2lzdGVyRmlyc3RcIilcclxuICAgIGdsR2FtZS5wYW5lbC5zaG93bGltaXRKdWh1YSgpO1xyXG4gICAgdGhpcy5pc1VwZGF0ZVBsYXphID0gdHJ1ZVxyXG4gICAgaWYgKCFSZWdpc3RlckZpcnN0ICYmIGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3Blbkluc3RhbGwobXNnLCAnaHR0cC5yZXFQaG9uZVJlZ2lzdGVyJyk7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbShcIlJlZ2lzdGVyRmlyc3RcIiwge30pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAucmVxUGhvbmVSZWdpc3RlcicsIG1zZywgdGhpcy5yZXFSZWdpc3Rlck5leHQuYmluZCh0aGlzKSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICog5rOo5YaM5o6l5Y+j5Zue6LCDXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSByb3V0ZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gKi9cclxubG9nb24ucmVxUmVnaXN0ZXJOZXh0ID0gZnVuY3Rpb24gKHJvdXRlLCBkYXRhKSB7XHJcbiAgICB0aGlzLnJlY29yZExvaW5EYXRhKCk7XHJcbiAgICB0aGlzLmJpbmRBZ2VudCA9IHRydWU7XHJcbiAgICB0aGlzLm15SW5mb0RhdGEgPSBkYXRhLm15SW5mby5kYXRhXHJcbiAgICB0aGlzLmlzVG91cmlzdCA9IGRhdGEubXlJbmZvLmRhdGEuZ3JhZGVfaWQgPT0gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICBpZiAoZGF0YS5yZWdpc3RlckdldENvaW4gJiYgZGF0YS5yZWdpc3RlckdldENvaW4gPiAwKSBnbEdhbWUudXNlci5yZWdpc3RlckdldENvaW4gPSBkYXRhLnJlZ2lzdGVyR2V0Q29pbjtcclxuICAgIGlmIChkYXRhLnJlZ2lzdGVyRGlhbW9uZCAmJiBkYXRhLnJlZ2lzdGVyRGlhbW9uZCA+IDApIGdsR2FtZS51c2VyLnJlZ2lzdGVyR2V0RGlhbW9uZCA9IGRhdGEucmVnaXN0ZXJEaWFtb25kO1xyXG4gICAgaWYgKGdsR2FtZS51c2VyLmdldChcInVzZXJJRFwiKSkge1xyXG4gICAgICAgIC8vIGdsR2FtZS5nYW1lTmV0LmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpblBvbWVsbyhkYXRhKTtcclxuICAgIH0gZWxzZSB0aGlzLmxvZ2luUG9tZWxvKGRhdGEpO1xyXG59O1xyXG4vKipcclxuICog6LSm5Y+355m75YWl5pWw5o2u6K6w5b2VXHJcbiAqL1xyXG5sb2dvbi5yZWNvcmRMb2luRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5sb2dvbmRhdGEpIHJldHVybjtcclxuICAgIGxldCBtc2cgPSB0aGlzLmxvZ29uZGF0YTtcclxuICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJsb2dpbkNhY2hlXCIsIHsgcGxhdDogbXNnLnBsYXQsIHBkOiBtc2cucGFzc3dvcmQgKyBtc2cudXNlcm5hbWUsIGxlOiBTdHJpbmcobXNnLnVzZXJuYW1lKS5sZW5ndGggfSk7XHJcbiAgICAvL+aJi+acuuS4jeiuqeWug+iHquWKqOeZu+W9lVxyXG4gICAgaWYgKG1zZy5wbGF0ID09IDUpIHtcclxuICAgICAgICBnbEdhbWUuc3RvcmFnZS5yZW1vdmVJdGVtQnlLZXkoXCJsb2dpbkNhY2hlXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2dvbmRhdGEgPSBudWxsO1xyXG59XHJcblxyXG4vL+iOt+WPlua4uOaIj+W9k+WJjeeKtuaAgVxyXG5sb2dvbi5SZXFHYW1lU3RhdGUgPSBmdW5jdGlvbiAoZ2FtZWlkLCBuZXh0LCB0eXBlID0gMSkge1xyXG4gICAgbGV0IG1vZGVsID0gZ2xHYW1lLnVzZXIuZ2V0KFwiZ2FtZURpc3BsYXlUeXBlXCIpO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxR2FtZVN0YXRlJywgeyBpZDogZ2FtZWlkLCBjaGVja1R5cGU6IHR5cGUsIG1vZGVsOiBtb2RlbCB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBsZXQgdGlwX3R4dCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdGUgPT0gU1RBVEUub3BlbiAmJiBkYXRhLnByb2Nlc3NTdGF0ZSA9PSBQUk9DRVNTX1NUQVRFLm5vcm1hbCkge1xyXG4gICAgICAgICAgICBuZXh0KGRhdGEuaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXRlID09IFNUQVRFLmNsb3NlIHx8IGRhdGEucHJvY2Vzc1N0YXRlID09IFBST0NFU1NfU1RBVEUuY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRpcF90eHQgPSAn5pys5ri45oiP5bey57uP5YWz6Zet77yBJ1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2hlY2tUeXBlID09IENIRUNLX1RZUEUucGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXBfdHh0ID0gJ+acrOW5s+WPsOW3sue7j+WFs+mXre+8gSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpcF90eHQgPSAn6K+l5ri45oiP5q2j5Zyo57u05oqk5Y2H57qn5Lit77yM6K+356iN5ZCO6YeN6K+V77yBJ1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2hlY2tUeXBlID09IENIRUNLX1RZUEUucGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXBfdHh0ID0gJ+ivpeW5s+WPsOato+WcqOe7tOaKpOWNh+e6p+S4re+8jOivt+eojeWQjumHjeivle+8gSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRpcF90eHQpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goJycsIHRpcF90eHQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgIT0gJ3BsYXphJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICog6I635Y+W5rOo5YaM6YWN6KGoXHJcbiAqL1xyXG5sb2dvbi5yZXFSZWdpc3RlckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLmxvZyhcIuiOt+WPluazqOWGjOmFjeihqFwiKVxyXG4gICAgZ2xHYW1lLnBhbmVsLnNob3dKdUh1YSgpO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUmVnaXN0ZXJDb25maWcnLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuaGlkZWp1aHVhKCk7XHJcbiAgICAgICAgdGhpcy5SZWdpc3RlckNvbmZpZyA9IGRhdGE7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLlVTRVIuUkVHSVNURVJfQ0ZHLCBkYXRhKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOeZu+mZhuaOpeWPo+Wbnuiwg1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gcm91dGVcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICovXHJcbmxvZ29uLmxvZ2luTmV4dCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xyXG4gICAgdGhpcy5yZWNvcmRMb2luRGF0YSgpO1xyXG4gICAgdGhpcy5iaW5kQWdlbnQgPSBkYXRhLmlzUmVnaXN0ZXIgIT0gMDtcclxuICAgIGdsR2FtZS5pc2ZpcnN0RW50ZXJQbGF6YSA9IHRydWU7XHJcbiAgICB0aGlzLm15SW5mb0RhdGEgPSBkYXRhLm15SW5mby5kYXRhXHJcbiAgICB0aGlzLmlzVG91cmlzdCA9IGRhdGEubXlJbmZvLmRhdGEuZ3JhZGVfaWQgPT0gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmxvZ2luUG9tZWxvKGRhdGEpO1xyXG59O1xyXG4vKipcclxuICog6ZO+5o6lIHBvbWVsb1xyXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnXHJcbiAqL1xyXG5sb2dvbi5sb2dpblBvbWVsbyA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIHRoaXMuX3VpZCA9IG1zZy51aWQ7XHJcbiAgICAvL+WcqOe9kee7nOeuoeeQhuS4reiusOW9leS4i+eZu+W9leS/oeaBr1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuZ2V0TmV0TWdyKCkuc2V0TG9naW5JbmZvKHRoaXMuX3VpZCk7XHJcbiAgICAvL+eZu+W9leaIkOWKn+WQjui/nuaOpWdhdGVcclxuICAgIGxldCBzZXJ2ZXJjZmcgPSBnbEdhbWUuc2VydmVyY2ZnLmdldFNlcnZlckNmZygpO1xyXG4gICAgdGhpcy5jb25uZWN0b3JfaG9zdCA9IHNlcnZlcmNmZ1tcImdhbWVTdnJIb3N0XCJdO1xyXG4gICAgdGhpcy5jb25uZWN0b3JfcG9ydCA9IHNlcnZlcmNmZ1tcImdhbWVTdnJQb3J0XCJdO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLk5FVFdPUksuUE9ET1RfT04sIHRydWUpO1xyXG5cclxuICAgIGlmICghdGhpcy5wb21lbG9Db25uZWN0KSB7XHJcbiAgICAgICAgdGhpcy5wb21lbG9Db25uZWN0ID0gdHJ1ZTtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5jb25uZWN0KHRoaXMuY29ubmVjdG9yX2hvc3QsIHRoaXMuY29ubmVjdG9yX3BvcnQsIHRoaXMuY29ubmVjdENvbm5lY3Rvci5iaW5kKHRoaXMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbnRlclBsYXQoKTtcclxuICAgIH1cclxuICAgIC8v5o6o5bm/57uR5a6aXHJcbiAgICBpZiAodGhpcy5iaW5kQWdlbnQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBnZXRpbnN0YWxsQ0IgPSBmdW5jdGlvbiAoYXBwRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb21vdGUgPSB7IGlkOiBcIjBcIiwgY2hhbm5lbDogXCIwXCIsIHR5cGU6IFwiMVwiIH1cclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0QmluZERhdGEgPSB7IFwicGxheWVyX2lkXCI6IFwiMFwiLCBcImNoYW5uZWxcIjogXCIwXCIsIFwidHlwZVwiOiBcIjFcIiB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQW5kcm9pZCAmJiBnbEdhbWUuY2hhbm5lbERhdGEpIHByb21vdGUgPSBnbEdhbWUuY2hhbm5lbERhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbCA9IGdsR2FtZS5sb2dvbi5nZXRDaGFubmVsRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21vdGUgPSBjaGFubmVsIHx8IHByb21vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXBwRGF0YS5iaW5kRGF0YSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEJpbmREYXRhLnBsYXllcl9pZCA9IHByb21vdGUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEJpbmREYXRhLmNoYW5uZWwgPSBwcm9tb3RlLmNoYW5uZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEJpbmREYXRhLnR5cGUgPSBwcm9tb3RlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcUJpbmRBZ2VudFwiLCBkZWZhdWx0QmluZERhdGEsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmREYXRhID0gSlNPTi5wYXJzZShhcHBEYXRhLmJpbmREYXRhKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCaW5kRGF0YS5wbGF5ZXJfaWQgPSBiaW5kRGF0YS5pZCA/IGJpbmREYXRhLmlkIDogcHJvbW90ZS5pZDtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCaW5kRGF0YS5jaGFubmVsID0gYmluZERhdGEuY2hhbm5lbCA/IGJpbmREYXRhLmNoYW5uZWwgOiBwcm9tb3RlLmNoYW5uZWw7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QmluZERhdGEudHlwZSA9IGJpbmREYXRhLnR5cGUgPyBiaW5kRGF0YS50eXBlIDogcHJvbW90ZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcUJpbmRBZ2VudFwiLCBkZWZhdWx0QmluZERhdGEsIChyb3V0ZSwgZGF0YSkgPT4geyB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5vaVNkay5nZXRJbnN0YWxsKDEwLCBnZXRpbnN0YWxsQ0IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBiaW5kRGF0YSA9IHsgXCJwbGF5ZXJfaWRcIjogXCIwXCIsIFwiY2hhbm5lbFwiOiBcIjBcIiwgXCJ0eXBlXCI6IFwiMVwiIH07XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5SZXFCaW5kQWdlbnRcIiwgYmluZERhdGEsIChyb3V0ZSwgZGF0YSkgPT4geyB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJpbmRBZ2VudCA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogcG9tZWxvIGNvbm5lY3Qg5pyN6ZO+5o6l5Zue6LCDXHJcbiAqIEBwYXJhbSBldmVudF90eXBlXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxubG9nb24uY29ubmVjdENvbm5lY3RvciA9IGZ1bmN0aW9uIChldmVudF90eXBlLCBldmVudCkge1xyXG4gICAgc3dpdGNoIChldmVudF90eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnY29ubmVjdCc6XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LmdldE5ldE1ncigpLnBvbWVsb0Nvbm5lY3RlZCgpO1xyXG4gICAgICAgICAgICAvLyDlsLHmuIXpmaRwb21lbG/nmoTlj5HpgIHorrDlvZUs6YKj5LmI5oi/6Ze06YKj6YeM5Lya6Ieq5bex5oGi5aSN5oi/6Ze0XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LmdldE5ldE1ncigpLmNsZWFyUG9tZWxvUmVxcygpO1xyXG4gICAgICAgICAgICAvLyDorr7nva7orrDlvZXmiL/pl7RpZFxyXG4gICAgICAgICAgICBnbEdhbWUucm9vbS5zZXRTZXJ2ZXJHYW1lSWQoKTtcclxuICAgICAgICAgICAgLy8g6L+b5YWl5bmz5Y+w5pyN5YqhXHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJQbGF0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3QnOlxyXG4gICAgICAgICAgICAvL+WRiuiviee9kee7nOeuoeeQhnBvbWVsb+aWreW8gOS6hlxyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5nZXROZXRNZ3IoKS5wb21lbG9EaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgLy8g5YWz6Zet6L+e5o6l5bmz5Y+w5pyN6ZO+5o6lXHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LmdldE5ldE1ncigpLnBsYXREaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIC8vIOmHjeaWsOaNhue7keWbnuiwg1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5jb25uZWN0KHRoaXMuY29ubmVjdG9yX2hvc3QsIHRoaXMuY29ubmVjdG9yX3BvcnQsIHRoaXMuY29ubmVjdENvbm5lY3Rvci5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnb25LaWNrJzpcclxuICAgICAgICAgICAgLy8g5YWz6Zet6L+e5o6l5bmz5Y+w5pyN6ZO+5o6lXHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LmdldE5ldE1ncigpLnBsYXREaXNjb25uZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmtpY2tlZChldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy/ov5vlhaXlubPlj7DmnI1cclxubG9nb24uZW50ZXJQbGF0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMubXlJbmZvRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG91cmlzdCkge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuTE9HSU4uVE9VUklTVF9TVUNDRVNTLCB0aGlzLm15SW5mb0RhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5MT0dJTi5BQ0NPVU5UX1NVQ0NFU1MsIHRoaXMubXlJbmZvRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXlJbmZvRGF0YSA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbXNnID0ge1xyXG4gICAgICAgIHRva2VuOiBnbEdhbWUuZ2FtZU5ldC5nZXROZXRNZ3IoKS5nZXRMb2dpblRva2VuKCksXHJcbiAgICAgICAgbG9naW5QbGF0OiAxLFxyXG4gICAgfTtcclxuXHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhORVRXT1JLLlBPTUVMTy5FTlRFUl9QTEFULCBtc2cpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOi/m+WFpeW5s+WPsFxyXG4gKi9cclxubG9nb24uY29ubmVjdG9yX2VudHJ5SGFuZGxlcl9lbnRlclBsYXQgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5nZXROZXRNZ3IoKS5wbGF0U3VjY2VlZCgpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLk5FVFdPUksuUE9ET1RfT04sIGZhbHNlKTtcclxuICAgIGdsR2FtZS5yb29tLnJlcU15Um9vbVN0YXRlKCk7XHJcbn07XHJcblxyXG5sb2dvbi5raWNrZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5yZWFzb24gPT0gTmV0Q29kZS5LaWNrUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2dPdXRUbygpO1xyXG4gICAgICAgIGlmICh0aGlzLmJfc3dpdGNoQWNjb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmJfc3dpdGNoQWNjb3VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZVN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub2ZmV2ViVmlldygpO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIlwiLCBnbEdhbWUudGlwcy5MT0dPTi5ORVRFUlJPUiwgcmVTdGFydEdhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQucmVhc29uID09IE5ldENvZGUuTG9naW5Gcm9tT3RoZXJEZXZpY2UpIHtcclxuICAgICAgICB0aGlzLmxvZ091dFRvKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYl9zd2l0Y2hBY2NvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYl9zd2l0Y2hBY2NvdW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZXZWJWaWV3KCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93TXNnQm94KFwiXCIsIGdsR2FtZS50aXBzLkxPR09OLkxPR0lOUkVQRUFULCByZVN0YXJ0R2FtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldmVudC5yZWFzb24gPT0gTmV0Q29kZS5FbWVyZ2VuY3lNYWludGVuYW5jZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmJfc3dpdGNoQWNjb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmJfc3dpdGNoQWNjb3VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZVN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub2ZmV2ViVmlldygpO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIlwiLCBnbEdhbWUudGlwcy5MT0dPTi5ORVRFUlJPUiwgcmVTdGFydEdhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5sb2dvbi5yZUxvZ29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGxvZ2luQ2FjaGUgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKFwibG9naW5DYWNoZVwiKTtcclxuICAgIGlmIChsb2dpbkNhY2hlKSB7XHJcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gbG9naW5DYWNoZS5wZC5zdWJzdHIoLWxvZ2luQ2FjaGUubGUpO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJudW1iZXJcIiwgeyBkYXRhOiB1c2VybmFtZSB9KVxyXG4gICAgfVxyXG4gICAgLy/muIXpmaTnmbvlvZXnvJPlrZhcclxuICAgIGdsR2FtZS5zdG9yYWdlLnJlbW92ZUl0ZW1CeUtleShcImxvZ2luQ2FjaGVcIik7XHJcbiAgICAvLyDph43lkK/muLjmiI9cclxuICAgIHJlU3RhcnRHYW1lKCk7XHJcbn07XHJcbi8qKlxyXG4gKiDpgIDlh7rnmbvpmYZcclxuICovXHJcbmxvZ29uLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYl9zd2l0Y2hBY2NvdW50ID0gdHJ1ZTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdjb25uZWN0b3IuZW50cnlIYW5kbGVyLmxvZ291dCcpO1xyXG59O1xyXG4vKipcclxuICog5rOo6ZSA55m76ZmGXHJcbiAqL1xyXG5sb2dvbi5sb2dPdXRUbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5zdG9yYWdlLnJlbW92ZUl0ZW1CeUtleShcImxvZ2luQ2FjaGVcIik7XHJcbiAgICAvLyB0aGlzLmRlc3Ryb3koKTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LmRlc3Ryb3koKTtcclxufTtcclxuXHJcbmxvZ29uLm9mZldlYlZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuVUkuV0VCVklFV19PRkYpO1xyXG4gICAgZ2xHYW1lLnBsYXRmb3JtLmNoYW5nZU9yaWVudGF0aW9uKHRydWUpO1xyXG4gICAgZ2xHYW1lLnN5c3RlbWNsYXNzLmNoYW5nZU9yaWVudGF0aW9uKHRydWUpO1xyXG4gICAgZ2xHYW1lLnBsYXRmb3JtLm9mZlN1c3BlbnNpb24oKTtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFCYWNrXCIsIHt9LCAocm91dGUsIG1zZykgPT4geyB9KTtcclxufVxyXG5cclxubG9nb24uZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbn07XHJcbmxvZ29uLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxufTtcclxubG9nb24uZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXNba2V5XTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyBMb2dvbigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdfaW5zdGFuY2U7XHJcbn07XHJcbiJdfQ==
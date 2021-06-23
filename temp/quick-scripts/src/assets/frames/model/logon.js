"use strict";
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
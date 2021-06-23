"use strict";
cc._RF.push(module, '2e10c0at6hImbapndxqVrrL', 'servercfg');
// frames/model/servercfg.js

"use strict";

/**
 * 连接服务器数据模块
 */
var Server = function Server() {
  this.localTag = null;
  this.servercfg = null;
  this.b_enableHotUpdate = cc.sys.isNative && cc.sys.isMobile;
},
    server = Server.prototype,
    g_instance = null;

server.loadSetting = function () {
  var _this = this;

  if (glGame.gamecfg.gameProxy == 0) {
    glGame.fileutil.readJSON("config/localsetting").then(function (data) {
      if (data.logenable) {
        _this.loadSettingCB(data);
      } else {
        _this.loadServer(data);
      }
    });
  } else this.getProxyUrl();
};

server.ProxySucceed = function (data) {
  ProxyO.stop();
  this.loadServer({
    cfgurl: data.url
  });
};

server.getProxyUrl = function () {
  ProxyO.on('succeed', this.ProxySucceed, this);
  ProxyO.start();
};

server.repetitionSend = function () {
  if (this.localTag) this.loadServer(this.localTag);else this.loadSetting();
};

server.loadServer = function (data) {
  var _this2 = this;

  this.localTag = data;
  var xhr = cc.loader.getXMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var respone = xhr.responseText;
      var resp = JSON.parse(respone);
      var head = resp.head;
      var body = resp.body;
      if (head.key) body = glGame.encrypt.getDecodeUrl(body, head.key);
      if (head.code != null && typeof code == "string") head.code = parseInt(head.code);else head.code = 0;

      if (head && head.code == 0) {
        _this2.servercfg = body;
        glGame.user.setUrl(body);
        glGame.emitter.emit(MESSAGE.UPDATE_SERVER_CFG);
      }
    } else if (xhr.readyState === 4) {
      xhr.onreadystatechange = function () {};

      setTimeout(function () {
        glGame.servercfg.repetitionSend();
      }, 5000);
    }
  };

  xhr.timeout = 15000;

  xhr.onerror = function (error) {
    setTimeout(function () {
      glGame.servercfg.repetitionSend();
    }, 5000);
  };

  var wholeurl = "".concat(data.cfgurl);
  var route = "http.reqUrl";
  var msg = {
    head: {
      route: route,
      msgindex: 0,
      firstReq: 1
    },
    body: {}
  };

  if (msg.body && !msg.head.key) {
    var _data = {};
    _data = glGame.encrypt.getEncodeUrl(msg.body);
    msg.body = _data["data"];
    msg.head.key = _data["dataKey"];
  }

  xhr.open("POST", wholeurl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(msg));
};

server.loadSettingCB = function (data) {
  var _this3 = this;

  this.localTag = data;
  var xhr = cc.loader.getXMLHttpRequest();

  xhr.onreadystatechange = function () {
    cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);

    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var respone = xhr.responseText;
      _this3.servercfg = JSON.parse(respone); // this.servercfg.platSvrPort = 8081;
      // this.servercfg.platSvrHost = 'http://192.168.2.15';

      console.log("获取的servercfg  loadSettingCB", _this3.servercfg);
      glGame.emitter.emit(MESSAGE.UPDATE_SERVER_CFG);
    }
  };

  xhr.timeout = 5000;

  xhr.onerror = function (error) {
    setTimeout(function () {
      if (_this3.localTag) glGame.servercfg.loadSettingCB(glGame.servercfg.localTag);else glGame.servercfg.loadSetting();
    }, 5000);
  };

  var URLProducttag = data.producttag;

  if (!cc.sys.isNative && window && window.location && window.location.href) {
    URLProducttag = this.analysisURLParameter(window.location.href).args.producttag;
  }

  var wholeurl = "".concat(data.cfgurl, "/products/").concat(URLProducttag || data.producttag, ".json");
  console.log("wholeurl=", wholeurl);
  xhr.open("GET", wholeurl, true);
  xhr.send();
}; //跳转到QQ对话框/社交软件界面


server.turnOtherApp = function (type) {
  var QQNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var host = this.servercfg["platSvrHost"];
  var port = this.servercfg["platSvrPort"];

  if (QQNumber) {
    cc.sys.openURL("http://".concat(host, ":").concat(port, "/openApp.html?type=").concat(type, "&url=").concat(QQNumber));
  } else {
    cc.sys.openURL("http://".concat(host, ":").concat(port, "/openApp.html?type=").concat(type));
  }
}; // 解析URL是否带调试参数


server.analysisURLParameter = function (URL) {
  var arr = URL.split("?");
  var obj = {
    url: null,
    args: {}
  };
  obj.url = arr[0]; // 拆分后如果长度小于2说明URL是不带参数的

  if (arr.length < 2) return obj;
  var mapArr = arr[1].split("&");

  for (var i = 0; i < mapArr.length; i++) {
    var parameter = mapArr[i].split("=");
    obj.args[parameter[0]] = parameter[1];
  }

  return obj;
};

server.getLocalTag = function () {
  return this.localTag;
};

server.isEnableHotUpdate = function () {
  return this.b_enableHotUpdate;
};

server.getServerCfg = function () {
  return this.servercfg;
};
/**
 * 获取分享二维码图片地址
 */


server.getQRCodeURL = function () {
  var host = this.servercfg["platSvrHost"];
  var port = this.servercfg["platSvrPort"];
  return "".concat(host, ":").concat(port, "/shareimg/code.png");
};
/**
 * 获取当前游戏规则
 * @param tag 标签页编号
 * @param gameName 指定游戏名字
 */


server.getGameRuleURL = function (tag, gameName) {
  var host = this.servercfg["platSvrHost"];
  var port = this.servercfg["platSvrPort"];
  var curGameID = glGame.room.get("curEnterGameID");
  if (!gameName) gameName = glGame.scene.getSceneNameByID(curGameID);
  return "http://".concat(host, ":").concat(port, "/gamerule/").concat(gameName, "/").concat(tag, ".html");
};
/**
 * 获取当前游戏热更地址
 */


server.getHotupdateVersionUrl = function () {
  var hotUpdateURL = this.servercfg["hotUrl"];
  var strdiagonal = hotUpdateURL[hotUpdateURL.length - 1] === "/" ? "" : "/";
  return hotUpdateURL + strdiagonal;
};
/**
 * 开启下载地址
 */


server.openDownLoad = function () {
  cc.sys.openURL(this.servercfg["downLoadPage"]);
};
/**
 * 获取当前游戏热更地址
 */


server.getHotDownVersion = function () {
  return this.servercfg["downVersion"];
};
/**
 * 获取紧急公告开关
 */


server.getBolMaintaining = function () {
  return this.servercfg["emergencyMaintenanceSwitch"];
};
/**
 * 获取紧急公告内容
 */


server.getMaintainingContent = function () {
  return this.servercfg["emergencyMaintenanceContent"];
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new Server();
  }

  return g_instance;
};

cc._RF.pop();
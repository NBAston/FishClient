"use strict";
cc._RF.push(module, '23987HgebFAh4JJVPYVtJIC', 'NetMgr');
// frames/net/NetMgr.js

"use strict";

var G_NETTYPE = {
  httpPost: 1,
  httpGet: 3,
  pomelo: 4
},
    netdef_reqmaxtime = 5000,
    netdef_reqPhoneCodeTime = 30000,
    NetMgr = function NetMgr() {
  this.resetNetMgrData();
},
    netMgr = NetMgr.prototype,
    g_instance = null;

window['G_NETTYPE'] = G_NETTYPE;

netMgr.resetNetMgrData = function () {
  this.msgindex = 0; //消息索引

  this.msgrecords = {};
  this._uid = null;
  this._token = null;
  this.timer_req = null; //请求的事件检测定时器

  this.pomelo_plat = false;
  this.timer_req = setInterval(this.checkReq.bind(this), 1);
}; //设置登录信息


netMgr.setLoginInfo = function (uid) {
  this._uid = uid;
}; //设置Token数据


netMgr.setLoginToken = function (token) {
  if (token) this._token = token;
}; //设置Token数据


netMgr.getLoginToken = function (token) {
  return this._token;
}; //高数网络管理pomelo断开了


netMgr.pomeloDisconnected = function () {}; //告诉网络管理pomelo正在连接中


netMgr.pomeloConnecting = function () {};

netMgr.pomeloConnected = function () {}; //在LoginMgr重连后清空pomelo的请求


netMgr.clearPomeloReqs = function () {}; //重发pomelo的消息


netMgr.resendPomeloReqs = function () {}; //当前连接状态


netMgr.getConnectionStatus = function () {
  return this.pomelo_plat;
}; //成功连接平台服


netMgr.platSucceed = function () {
  this.pomelo_plat = true;
}; //无连接平台服


netMgr.platDisconnect = function () {
  glGame.emitter.emit("net.disconnect");
  this.pomelo_plat = false;
}; //检测发送队列


netMgr.checkReq = function () {
  var _this = this;

  //超时的服务器类型
  //记录需要重新投递的http消息队列
  var httpReSendMsgs = []; //记录需要重连的网络
  //let webNeedReconnect = {};

  var _loop = function _loop(route) {
    var record = _this.msgrecords[route];
    var date = new Date();
    var time = Date.parse(date);

    var http_push = function http_push() {
      //如果是当前类型服务器已经停止了则直接不考虑其超时问题,直接加入到重连成功后的重发队列并移除
      //在重连前都要记录重发时间
      var date = new Date();
      var time = Date.parse(date);
      record.time = time; //重置发送时间

      switch (record.serverType) {
        case G_NETTYPE.pomelo:
          //表示长连接的服务器
          //说明需要重新连接
          break;

        case G_NETTYPE.httpPost:
        case G_NETTYPE.httpGet:
          //短连接部分直接插入重新投递
          httpReSendMsgs.push(record);
          break;
      }
    }; //绑定手机重连时间与其他协议时间不同


    if (record.route == "http.ReqPostPhoneCode") {
      if (time - record.time > netdef_reqPhoneCodeTime) http_push();
    } else {
      if (time - record.time > netdef_reqmaxtime) http_push();
    } //console.log("需要显示菊花route=",route)

  };

  for (var route in this.msgrecords) {
    _loop(route);
  } //重发http的消息


  if (httpReSendMsgs.length > 0) {
    glGame.gameNet.reSendMsgs(httpReSendMsgs);
  }
}; //清除定时器


netMgr.clearTimer = function () {
  if (this.timer_req != null) {
    clearTimeout(this.timer_req);
    this.timer_req = null;
  }
};

netMgr.destroy = function () {
  this.clearTimer();
  this.resetNetMgrData();
}; //转换消息成带msgindex的格式


netMgr.convertMsg = function (route, msg, next) {
  var version = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "v1";
  var words = route.split('.');
  var wordslen = words.length;
  var serverType = -1;
  var ret = {};
  var newmsg = null;

  if (wordslen <= 0) {
    return null;
  }

  var server = words[0];

  switch (route) {
    case 'http.reqLogin':
    case 'http.reqRegister':
    case 'http.reqGameSwitch':
    case 'http.reqPoint':
    case 'http.reqPostPhoneCode':
    case 'http.reqResetPwd':
    case 'http.reqGameList':
    case 'http.ReqRegisterConfig':
    case 'http.reqUrl':
      break;

    default:
      if (this._uid == null || this._token == null) {
        return -1;
      }

      break;
  }

  switch (server) {
    case 'http':
      serverType = G_NETTYPE.httpPost; //判断http投递情况

      newmsg = {
        head: {
          msgindex: this.msgindex,
          token: this._token,
          route: route,
          version: version
        },
        body: msg
      };
      break;

    case 'hget':
      serverType = G_NETTYPE.httpGet; //判断hget投递情况

      break;

    default:
      serverType = G_NETTYPE.pomelo;
      msg.msgindex = this.msgindex; //判断pomelo投递情况

      break;
  }

  if (serverType == G_NETTYPE.pomelo && !this.pomelo_plat && route !== NETWORK.POMELO.ENTER_PLAT) {
    return null;
  } //将消息保存下来


  var date = new Date();
  var time = Date.parse(date);
  var newRecord = {};
  newRecord['time'] = time;
  newRecord['serverType'] = serverType;
  newRecord['route'] = route;
  newRecord['next'] = next;
  newRecord['sendNum'] = 0;

  if (newmsg) {
    newRecord['msg'] = newmsg;
  } else {
    newRecord['msg'] = msg;
  }

  if (serverType != G_NETTYPE.pomelo) {
    //已在重发列表中，需要禁止重复发包的几个协议
    if (this.msgrecords[route]) {
      switch (route) {
        case 'http.reqLogin':
          return null;

        default:
          break;
      }
    } //校验是否添加入重发列表中


    switch (route) {
      //指定发包协议，不加入重复发包且发包延迟改为15000毫秒（15秒）
      case 'http.reqBack':
        ret.serverTimeout = 15000;
        break;

      default:
        this.msgrecords[route] = newRecord;
        break;
    }
  }

  ret.serverType = serverType;
  ret.msg = newRecord['msg'];
  this.msgindex++;
  return ret;
}; //消息回复后的处理


netMgr.doneWithRoute = function (route, code) {
  if (this.msgrecords[route]) {
    delete this.msgrecords[route];
  } // console.log("当前消息队列的消息 this.msgrecords:", Object.keys(this.msgrecords));


  if (Object.keys(this.msgrecords).length == 0) {
    glGame.panel.closeJuHua();
  }

  glGame.panel.closeRoomJuHua();
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new NetMgr();
  }

  return g_instance;
}();

cc._RF.pop();
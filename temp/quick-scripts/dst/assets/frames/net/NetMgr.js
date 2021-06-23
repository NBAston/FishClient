
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/net/NetMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxuZXRcXE5ldE1nci5qcyJdLCJuYW1lcyI6WyJHX05FVFRZUEUiLCJodHRwUG9zdCIsImh0dHBHZXQiLCJwb21lbG8iLCJuZXRkZWZfcmVxbWF4dGltZSIsIm5ldGRlZl9yZXFQaG9uZUNvZGVUaW1lIiwiTmV0TWdyIiwicmVzZXROZXRNZ3JEYXRhIiwibmV0TWdyIiwicHJvdG90eXBlIiwiZ19pbnN0YW5jZSIsIndpbmRvdyIsIm1zZ2luZGV4IiwibXNncmVjb3JkcyIsIl91aWQiLCJfdG9rZW4iLCJ0aW1lcl9yZXEiLCJwb21lbG9fcGxhdCIsInNldEludGVydmFsIiwiY2hlY2tSZXEiLCJiaW5kIiwic2V0TG9naW5JbmZvIiwidWlkIiwic2V0TG9naW5Ub2tlbiIsInRva2VuIiwiZ2V0TG9naW5Ub2tlbiIsInBvbWVsb0Rpc2Nvbm5lY3RlZCIsInBvbWVsb0Nvbm5lY3RpbmciLCJwb21lbG9Db25uZWN0ZWQiLCJjbGVhclBvbWVsb1JlcXMiLCJyZXNlbmRQb21lbG9SZXFzIiwiZ2V0Q29ubmVjdGlvblN0YXR1cyIsInBsYXRTdWNjZWVkIiwicGxhdERpc2Nvbm5lY3QiLCJnbEdhbWUiLCJlbWl0dGVyIiwiZW1pdCIsImh0dHBSZVNlbmRNc2dzIiwicm91dGUiLCJyZWNvcmQiLCJkYXRlIiwiRGF0ZSIsInRpbWUiLCJwYXJzZSIsImh0dHBfcHVzaCIsInNlcnZlclR5cGUiLCJwdXNoIiwibGVuZ3RoIiwiZ2FtZU5ldCIsInJlU2VuZE1zZ3MiLCJjbGVhclRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiZGVzdHJveSIsImNvbnZlcnRNc2ciLCJtc2ciLCJuZXh0IiwidmVyc2lvbiIsIndvcmRzIiwic3BsaXQiLCJ3b3Jkc2xlbiIsInJldCIsIm5ld21zZyIsInNlcnZlciIsImhlYWQiLCJib2R5IiwiTkVUV09SSyIsIlBPTUVMTyIsIkVOVEVSX1BMQVQiLCJuZXdSZWNvcmQiLCJzZXJ2ZXJUaW1lb3V0IiwiZG9uZVdpdGhSb3V0ZSIsImNvZGUiLCJPYmplY3QiLCJrZXlzIiwicGFuZWwiLCJjbG9zZUp1SHVhIiwiY2xvc2VSb29tSnVIdWEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLElBQ0FBLFNBQVMsR0FBRztBQUNYQyxFQUFBQSxRQUFRLEVBQUUsQ0FEQztBQUVYQyxFQUFBQSxPQUFPLEVBQUUsQ0FGRTtBQUdYQyxFQUFBQSxNQUFNLEVBQUU7QUFIRyxDQURaO0FBQUEsSUFNQUMsaUJBQWlCLEdBQUcsSUFOcEI7QUFBQSxJQU9BQyx1QkFBdUIsR0FBRyxLQVAxQjtBQUFBLElBUUFDLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVk7QUFDcEIsT0FBS0MsZUFBTDtBQUNBLENBVkQ7QUFBQSxJQVdBQyxNQUFNLEdBQUdGLE1BQU0sQ0FBQ0csU0FYaEI7QUFBQSxJQVlBQyxVQUFVLEdBQUcsSUFaYjs7QUFhREMsTUFBTSxDQUFDLFdBQUQsQ0FBTixHQUFzQlgsU0FBdEI7O0FBQ0FRLE1BQU0sQ0FBQ0QsZUFBUCxHQUF5QixZQUFZO0FBQ3BDLE9BQUtLLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FEb0MsQ0FDbEI7O0FBQ2xCLE9BQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxPQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixJQUFqQixDQUxvQyxDQUtkOztBQUN0QixPQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsT0FBS0QsU0FBTCxHQUFpQkUsV0FBVyxDQUFDLEtBQUtDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUFELEVBQTJCLENBQTNCLENBQTVCO0FBQ0EsQ0FSRCxFQVNBOzs7QUFDQVosTUFBTSxDQUFDYSxZQUFQLEdBQXNCLFVBQVVDLEdBQVYsRUFBZTtBQUNwQyxPQUFLUixJQUFMLEdBQVlRLEdBQVo7QUFDQSxDQUZELEVBSUE7OztBQUNBZCxNQUFNLENBQUNlLGFBQVAsR0FBdUIsVUFBVUMs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a0MsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBSzVELFVBQWpCLEVBQTZCa0MsTUFBN0IsSUFBdUMsQ0FBM0MsRUFBOEM7QUFDN0NiLElBQUFBLE1BQU0sQ0FBQ3dDLEtBQVAsQ0FBYUMsVUFBYjtBQUNBOztBQUNEekMsRUFBQUEsTUFBTSxDQUFDd0MsS0FBUCxDQUFhRSxjQUFiO0FBQ0EsQ0FURDs7QUFXQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDNUIsTUFBSSxDQUFDcEUsVUFBTCxFQUFpQjtBQUNoQkEsSUFBQUEsVUFBVSxHQUFHLElBQUlKLE1BQUosRUFBYjtBQUNBOztBQUNELFNBQU9JLFVBQVA7QUFDQSxDQUxnQixFQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsi77u/bGV0XHJcblx0R19ORVRUWVBFID0ge1xyXG5cdFx0aHR0cFBvc3Q6IDEsXHJcblx0XHRodHRwR2V0OiAzLFxyXG5cdFx0cG9tZWxvOiA0XHJcblx0fSxcclxuXHRuZXRkZWZfcmVxbWF4dGltZSA9IDUwMDAsXHJcblx0bmV0ZGVmX3JlcVBob25lQ29kZVRpbWUgPSAzMDAwMCxcclxuXHROZXRNZ3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnJlc2V0TmV0TWdyRGF0YSgpO1xyXG5cdH0sXHJcblx0bmV0TWdyID0gTmV0TWdyLnByb3RvdHlwZSxcclxuXHRnX2luc3RhbmNlID0gbnVsbDtcclxud2luZG93WydHX05FVFRZUEUnXSA9IEdfTkVUVFlQRTtcclxubmV0TWdyLnJlc2V0TmV0TWdyRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLm1zZ2luZGV4ID0gMDsvL+a2iOaBr+e0ouW8lVxyXG5cdHRoaXMubXNncmVjb3JkcyA9IHt9O1xyXG5cdHRoaXMuX3VpZCA9IG51bGw7XHJcblx0dGhpcy5fdG9rZW4gPSBudWxsO1xyXG5cdHRoaXMudGltZXJfcmVxID0gbnVsbDsvL+ivt+axgueahOS6i+S7tuajgOa1i+WumuaXtuWZqFxyXG5cdHRoaXMucG9tZWxvX3BsYXQgPSBmYWxzZTtcclxuXHR0aGlzLnRpbWVyX3JlcSA9IHNldEludGVydmFsKHRoaXMuY2hlY2tSZXEuYmluZCh0aGlzKSwgMSlcclxufVxyXG4vL+iuvue9rueZu+W9leS/oeaBr1xyXG5uZXRNZ3Iuc2V0TG9naW5JbmZvID0gZnVuY3Rpb24gKHVpZCkge1xyXG5cdHRoaXMuX3VpZCA9IHVpZDtcclxufVxyXG5cclxuLy/orr7nva5Ub2tlbuaVsOaNrlxyXG5uZXRNZ3Iuc2V0TG9naW5Ub2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xyXG5cdGlmICh0b2tlbikgdGhpcy5fdG9rZW4gPSB0b2tlbjtcclxufVxyXG5cclxuLy/orr7nva5Ub2tlbuaVsOaNrlxyXG5uZXRNZ3IuZ2V0TG9naW5Ub2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xyXG5cdHJldHVybiB0aGlzLl90b2tlbjtcclxufVxyXG5cclxuLy/pq5jmlbDnvZHnu5znrqHnkIZwb21lbG/mlq3lvIDkuoZcclxubmV0TWdyLnBvbWVsb0Rpc2Nvbm5lY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn1cclxuLy/lkYror4nnvZHnu5znrqHnkIZwb21lbG/mraPlnKjov57mjqXkuK1cclxubmV0TWdyLnBvbWVsb0Nvbm5lY3RpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59XHJcbm5ldE1nci5wb21lbG9Db25uZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59XHJcbi8v5ZyoTG9naW5NZ3Lph43ov57lkI7muIXnqbpwb21lbG/nmoTor7fmsYJcclxubmV0TWdyLmNsZWFyUG9tZWxvUmVxcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn1cclxuLy/ph43lj5Fwb21lbG/nmoTmtojmga9cclxubmV0TWdyLnJlc2VuZFBvbWVsb1JlcXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59XHJcblxyXG4vL+W9k+WJjei/nuaOpeeKtuaAgVxyXG5uZXRNZ3IuZ2V0Q29ubmVjdGlvblN0YXR1cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gdGhpcy5wb21lbG9fcGxhdDtcclxufVxyXG5cclxuLy/miJDlip/ov57mjqXlubPlj7DmnI1cclxubmV0TWdyLnBsYXRTdWNjZWVkID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucG9tZWxvX3BsYXQgPSB0cnVlO1xyXG59XHJcblxyXG4vL+aXoOi/nuaOpeW5s+WPsOacjVxyXG5uZXRNZ3IucGxhdERpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0Z2xHYW1lLmVtaXR0ZXIuZW1pdChcIm5ldC5kaXNjb25uZWN0XCIpO1xyXG5cdHRoaXMucG9tZWxvX3BsYXQgPSBmYWxzZTtcclxufVxyXG5cclxuLy/mo4DmtYvlj5HpgIHpmJ/liJdcclxubmV0TWdyLmNoZWNrUmVxID0gZnVuY3Rpb24gKCkge1xyXG5cdC8v6LaF5pe255qE5pyN5Yqh5Zmo57G75Z6LXHJcblx0Ly/orrDlvZXpnIDopoHph43mlrDmipXpgJLnmoRodHRw5raI5oGv6Zif5YiXXHJcblx0bGV0IGh0dHBSZVNlbmRNc2dzID0gW107XHJcblx0Ly/orrDlvZXpnIDopoHph43ov57nmoTnvZHnu5xcclxuXHQvL2xldCB3ZWJOZWVkUmVjb25uZWN0ID0ge307XHJcblx0Zm9yIChsZXQgcm91dGUgaW4gdGhpcy5tc2dyZWNvcmRzKSB7XHJcblx0XHRsZXQgcmVjb3JkID0gdGhpcy5tc2dyZWNvcmRzW3JvdXRlXTtcclxuXHRcdGxldCBkYXRlID0gbmV3IERhdGUoKVxyXG5cdFx0bGV0IHRpbWUgPSBEYXRlLnBhcnNlKGRhdGUpO1xyXG5cdFx0bGV0IGh0dHBfcHVzaCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly/lpoLmnpzmmK/lvZPliY3nsbvlnovmnI3liqHlmajlt7Lnu4/lgZzmraLkuobliJnnm7TmjqXkuI3ogIPomZHlhbbotoXml7bpl67popgs55u05o6l5Yqg5YWl5Yiw6YeN6L+e5oiQ5Yqf5ZCO55qE6YeN5Y+R6Zif5YiX5bm256e76ZmkXHJcblx0XHRcdC8v5Zyo6YeN6L+e5YmN6YO96KaB6K6w5b2V6YeN5Y+R5pe26Ze0XHJcblx0XHRcdGxldCBkYXRlID0gbmV3IERhdGUoKVxyXG5cdFx0XHRsZXQgdGltZSA9IERhdGUucGFyc2UoZGF0ZSk7XHJcblx0XHRcdHJlY29yZC50aW1lID0gdGltZTsvL+mHjee9ruWPkemAgeaXtumXtFxyXG5cdFx0XHRzd2l0Y2ggKHJlY29yZC5zZXJ2ZXJUeXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBHX05FVFRZUEUucG9tZWxvOiAvL+ihqOekuumVv+i/nuaOpeeahOacjeWKoeWZqFxyXG5cdFx0XHRcdFx0Ly/or7TmmI7pnIDopoHph43mlrDov57mjqVcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgR19ORVRUWVBFLmh0dHBQb3N0OlxyXG5cdFx0XHRcdGNhc2UgR19ORVRUWVBFLmh0dHBHZXQ6XHJcblx0XHRcdFx0XHQvL+efrei/nuaOpemDqOWIhuebtOaOpeaPkuWFpemHjeaWsOaKlemAklxyXG5cdFx0XHRcdFx0aHR0cFJlU2VuZE1zZ3MucHVzaChyZWNvcmQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8v57uR5a6a5omL5py66YeN6L+e5pe26Ze05LiO5YW25LuW5Y2P6K6u5pe26Ze05LiN5ZCMXHJcblx0XHRpZiAocmVjb3JkLnJvdXRlID09IFwiaHR0cC5SZXFQb3N0UGhvbmVDb2RlXCIpIHtcclxuXHRcdFx0aWYgKHRpbWUgLSByZWNvcmQudGltZSA+IG5ldGRlZl9yZXFQaG9uZUNvZGVUaW1lKSBodHRwX3B1c2goKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aW1lIC0gcmVjb3JkLnRpbWUgPiBuZXRkZWZfcmVxbWF4dGltZSkgaHR0cF9wdXNoKCk7XHJcblx0XHR9XHJcblx0XHQvL2NvbnNvbGUubG9nKFwi6ZyA6KaB5pi+56S66I+K6Iqxcm91dGU9XCIscm91dGUpXHJcblxyXG5cdH1cclxuXHQvL+mHjeWPkWh0dHDnmoTmtojmga9cclxuXHRpZiAoaHR0cFJlU2VuZE1zZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0Z2xHYW1lLmdhbWVOZXQucmVTZW5kTXNncyhodHRwUmVTZW5kTXNncyk7XHJcblx0fVxyXG59XHJcbi8v5riF6Zmk5a6a5pe25ZmoXHJcbm5ldE1nci5jbGVhclRpbWVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmICh0aGlzLnRpbWVyX3JlcSAhPSBudWxsKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lcl9yZXEpO1xyXG5cdFx0dGhpcy50aW1lcl9yZXEgPSBudWxsO1xyXG5cdH1cclxufVxyXG5uZXRNZ3IuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLmNsZWFyVGltZXIoKTtcclxuXHR0aGlzLnJlc2V0TmV0TWdyRGF0YSgpO1xyXG59XHJcbi8v6L2s5o2i5raI5oGv5oiQ5bimbXNnaW5kZXjnmoTmoLzlvI9cclxubmV0TWdyLmNvbnZlcnRNc2cgPSBmdW5jdGlvbiAocm91dGUsIG1zZywgbmV4dCwgdmVyc2lvbiA9IFwidjFcIikge1xyXG5cdGxldCB3b3JkcyA9IHJvdXRlLnNwbGl0KCcuJyk7XHJcblx0bGV0IHdvcmRzbGVuID0gd29yZHMubGVuZ3RoXHJcblx0bGV0IHNlcnZlclR5cGUgPSAtMTtcclxuXHRsZXQgcmV0ID0ge307XHJcblx0bGV0IG5ld21zZyA9IG51bGw7XHJcblx0aWYgKHdvcmRzbGVuIDw9IDApIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRsZXQgc2VydmVyID0gd29yZHNbMF07XHJcblx0c3dpdGNoIChyb3V0ZSkge1xyXG5cdFx0Y2FzZSAnaHR0cC5yZXFMb2dpbic6XHJcblx0XHRjYXNlICdodHRwLnJlcVJlZ2lzdGVyJzpcclxuXHRcdGNhc2UgJ2h0dHAucmVxR2FtZVN3aXRjaCc6XHJcblx0XHRjYXNlICdodHRwLnJlcVBvaW50JzpcclxuXHRcdGNhc2UgJ2h0dHAucmVxUG9zdFBob25lQ29kZSc6XHJcblx0XHRjYXNlICdodHRwLnJlcVJlc2V0UHdkJzpcclxuXHRcdGNhc2UgJ2h0dHAucmVxR2FtZUxpc3QnOlxyXG5cdFx0Y2FzZSAnaHR0cC5SZXFSZWdpc3RlckNvbmZpZyc6XHJcblx0XHRjYXNlICdodHRwLnJlcVVybCc6XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0aWYgKHRoaXMuX3VpZCA9PSBudWxsIHx8IHRoaXMuX3Rva2VuID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdH1cclxuXHRzd2l0Y2ggKHNlcnZlcikge1xyXG5cdFx0Y2FzZSAnaHR0cCc6XHJcblx0XHRcdHNlcnZlclR5cGUgPSBHX05FVFRZUEUuaHR0cFBvc3Q7XHJcblx0XHRcdC8v5Yik5pataHR0cOaKlemAkuaDheWGtVxyXG5cdFx0XHRuZXdtc2cgPSB7XHJcblx0XHRcdFx0aGVhZDoge1xyXG5cdFx0XHRcdFx0bXNnaW5kZXg6IHRoaXMubXNnaW5kZXgsXHJcblx0XHRcdFx0XHR0b2tlbjogdGhpcy5fdG9rZW4sXHJcblx0XHRcdFx0XHRyb3V0ZTogcm91dGUsXHJcblx0XHRcdFx0XHR2ZXJzaW9uOiB2ZXJzaW9uLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ym9keTogbXNnXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnaGdldCc6XHJcblx0XHRcdHNlcnZlclR5cGUgPSBHX05FVFRZUEUuaHR0cEdldDtcclxuXHRcdFx0Ly/liKTmlq1oZ2V05oqV6YCS5oOF5Ya1XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c2VydmVyVHlwZSA9IEdfTkVUVFlQRS5wb21lbG87XHJcblx0XHRcdG1zZy5tc2dpbmRleCA9IHRoaXMubXNnaW5kZXg7XHJcblx0XHRcdC8v5Yik5patcG9tZWxv5oqV6YCS5oOF5Ya1XHJcblx0XHRcdGJyZWFrO1xyXG5cdH1cclxuXHRpZiAoc2VydmVyVHlwZSA9PSBHX05FVFRZUEUucG9tZWxvICYmICF0aGlzLnBvbWVsb19wbGF0ICYmIHJvdXRlICE9PSBORVRXT1JLLlBPTUVMTy5FTlRFUl9QTEFUKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8v5bCG5raI5oGv5L+d5a2Y5LiL5p2lXHJcblx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpXHJcblx0bGV0IHRpbWUgPSBEYXRlLnBhcnNlKGRhdGUpO1xyXG5cdGxldCBuZXdSZWNvcmQgPSB7fTtcclxuXHRuZXdSZWNvcmRbJ3RpbWUnXSA9IHRpbWU7XHJcblx0bmV3UmVjb3JkWydzZXJ2ZXJUeXBlJ10gPSBzZXJ2ZXJUeXBlO1xyXG5cdG5ld1JlY29yZFsncm91dGUnXSA9IHJvdXRlO1xyXG5cdG5ld1JlY29yZFsnbmV4dCddID0gbmV4dDtcclxuXHRuZXdSZWNvcmRbJ3NlbmROdW0nXSA9IDA7XHJcblx0aWYgKG5ld21zZykge1xyXG5cdFx0bmV3UmVjb3JkWydtc2cnXSA9IG5ld21zZztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRuZXdSZWNvcmRbJ21zZyddID0gbXNnO1xyXG5cdH1cclxuXHJcblx0aWYgKHNlcnZlclR5cGUgIT0gR19ORVRUWVBFLnBvbWVsbykge1xyXG5cdFx0Ly/lt7LlnKjph43lj5HliJfooajkuK3vvIzpnIDopoHnpoHmraLph43lpI3lj5HljIXnmoTlh6DkuKrljY/orq5cclxuXHRcdGlmICh0aGlzLm1zZ3JlY29yZHNbcm91dGVdKSB7XHJcblx0XHRcdHN3aXRjaCAocm91dGUpIHtcclxuXHRcdFx0XHRjYXNlICdodHRwLnJlcUxvZ2luJzpcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdGRlZmF1bHQ6IGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvL+agoemqjOaYr+WQpua3u+WKoOWFpemHjeWPkeWIl+ihqOS4rVxyXG5cdFx0c3dpdGNoIChyb3V0ZSkge1xyXG5cdFx0XHQvL+aMh+WumuWPkeWMheWNj+iuru+8jOS4jeWKoOWFpemHjeWkjeWPkeWMheS4lOWPkeWMheW7tui/n+aUueS4ujE1MDAw5q+r56eS77yIMTXnp5LvvIlcclxuXHRcdFx0Y2FzZSAnaHR0cC5yZXFCYWNrJzogcmV0LnNlcnZlclRpbWVvdXQgPSAxNTAwMCA7YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5tc2dyZWNvcmRzW3JvdXRlXSA9IG5ld1JlY29yZDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldC5zZXJ2ZXJUeXBlID0gc2VydmVyVHlwZTtcclxuXHRyZXQubXNnID0gbmV3UmVjb3JkWydtc2cnXTtcclxuXHJcblx0dGhpcy5tc2dpbmRleCsrO1xyXG5cclxuXHRyZXR1cm4gcmV0O1xyXG59XHJcbi8v5raI5oGv5Zue5aSN5ZCO55qE5aSE55CGXHJcbm5ldE1nci5kb25lV2l0aFJvdXRlID0gZnVuY3Rpb24gKHJvdXRlLCBjb2RlKSB7XHJcblx0aWYgKHRoaXMubXNncmVjb3Jkc1tyb3V0ZV0pIHtcclxuXHRcdGRlbGV0ZSB0aGlzLm1zZ3JlY29yZHNbcm91dGVdO1xyXG5cdH1cclxuXHQvLyBjb25zb2xlLmxvZyhcIuW9k+WJjea2iOaBr+mYn+WIl+eahOa2iOaBryB0aGlzLm1zZ3JlY29yZHM6XCIsIE9iamVjdC5rZXlzKHRoaXMubXNncmVjb3JkcykpO1xyXG5cdGlmIChPYmplY3Qua2V5cyh0aGlzLm1zZ3JlY29yZHMpLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRnbEdhbWUucGFuZWwuY2xvc2VKdUh1YSgpO1xyXG5cdH1cclxuXHRnbEdhbWUucGFuZWwuY2xvc2VSb29tSnVIdWEoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCFnX2luc3RhbmNlKSB7XHJcblx0XHRnX2luc3RhbmNlID0gbmV3IE5ldE1ncigpO1xyXG5cdH1cclxuXHRyZXR1cm4gZ19pbnN0YW5jZTtcclxufSgpOyJdfQ==
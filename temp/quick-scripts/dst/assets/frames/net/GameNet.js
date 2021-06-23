
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/net/GameNet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '77f7cQ/l0tOFqr5AlORji4Q', 'GameNet');
// frames/net/GameNet.js

"use strict";

var http = require("http"),
    NetMgr = require("NetMgr"),
    errCheck = require("errckect"),
    GameNet = function GameNet() {
  this.webhost = null;
  this.timeout = 5000; //正常发包延迟5000毫秒
},
    gameNet = GameNet.prototype,
    g_instance = null;

gameNet.getNetMgr = function () {
  return NetMgr;
};

gameNet.setWebHost = function (webhost) {
  this.webhost = webhost;
};

gameNet.getWebHost = function () {
  return this.webhost;
}; //拼装数据


gameNet.send_msg = function (route, msg, next, version) {
  glGame.panel.showJuHua(); //如果没有消息就构造一个

  if (msg == null || msg == 'undefined') msg = {}; //绑定一个消息id

  var info = NetMgr.convertMsg(route, msg, next, version);
  if (!info) return 0;
  var serverType = info.serverType;
  var serverTimeout = info.serverTimeout || this.timeout;
  var newmsg = info.msg;

  switch (serverType) {
    case G_NETTYPE.httpPost:
      //http post
      http.POST(route, newmsg, next, false, serverTimeout);
      break;

    case G_NETTYPE.httpGet:
      //http get
      http.GET(route, newmsg, next);
      break;

    case G_NETTYPE.pomelo:
      //pomelo
      this.pomeloReq(route, newmsg);
      break;

    default:
      return console.error("gameNet.send_msg: no find serverType ->", serverType);
  }

  return serverType;
}; //重发消息


gameNet.reSendMsgs = function (records) {
  for (var i = 0; i < records.length; ++i) {
    var record = records[i];
    var serverType = record.serverType;
    var route = record.route;
    var msg = record.msg;
    var next = record.next;
    record.sendNum += 1;
    console.log("[reSendMsgs] route:", route, "sendNum:", record.sendNum);

    if (errCheck.checkSendLimit(record.sendNum)) {
      return;
    }

    switch (serverType) {
      case G_NETTYPE.httpPost:
        //http post
        http.POST(route, msg, next, true);
        break;

      case G_NETTYPE.httpGet:
        //http get
        http.GET(route, msg, next);
        break;

      case G_NETTYPE.pomelo:
        //pomelo
        this.pomeloReq(route, msg);
        break;

      default:
        console.error("gameNet.reSendMsgs: no find serverType ->", serverType);
    }
  }
}; //tcp请求


gameNet.pomeloReq = function (route, msg) {
  pomelo.request(route, msg);
};

gameNet.connect = function (host, port, connectcb) {
  //广播连接事件
  var cfg = {
    host: host,
    port: port,
    debug: true,
    msgcb: function msgcb(route, code, data) {
      console.log(route);

      if (errCheck.CheckError(route, code, data)) {
        // console.log("非错误消息,准备广播", route);
        glGame.emitter.emit(route, data);
      }
    },
    connectcb: connectcb
  };
  console.log("连接配置=", JSON.stringify(cfg));
  pomelo.init(cfg); //告诉网络管理pomelo开始连接

  NetMgr.pomeloConnecting();
};

gameNet.disconnect = function () {
  pomelo.disconnect();
};

gameNet.getState = function () {
  return pomelo.getState();
};

gameNet.destroy = function () {
  NetMgr.destroy();
  pomelo.clearListener();
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new GameNet();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxuZXRcXEdhbWVOZXQuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJOZXRNZ3IiLCJlcnJDaGVjayIsIkdhbWVOZXQiLCJ3ZWJob3N0IiwidGltZW91dCIsImdhbWVOZXQiLCJwcm90b3R5cGUiLCJnX2luc3RhbmNlIiwiZ2V0TmV0TWdyIiwic2V0V2ViSG9zdCIsImdldFdlYkhvc3QiLCJzZW5kX21zZyIsInJvdXRlIiwibXNnIiwibmV4dCIsInZlcnNpb24iLCJnbEdhbWUiLCJwYW5lbCIsInNob3dKdUh1YSIsImluZm8iLCJjb252ZXJ0TXNnIiwic2VydmVyVHlwZSIsInNlcnZlclRpbWVvdXQiLCJuZXdtc2ciLCJHX05FVFRZUEUiLCJodHRwUG9zdCIsIlBPU1QiLCJodHRwR2V0IiwiR0VUIiwicG9tZWxvIiwicG9tZWxvUmVxIiwiY29uc29sZSIsImVycm9yIiwicmVTZW5kTXNncyIsInJlY29yZHMiLCJpIiwibGVuZ3RoIiwicmVjb3JkIiwic2VuZE51bSIsImxvZyIsImNoZWNrU2VuZExpbWl0IiwicmVxdWVzdCIsImNvbm5lY3QiLCJob3N0IiwicG9ydCIsImNvbm5lY3RjYiIsImNmZyIsImRlYnVnIiwibXNnY2IiLCJjb2RlIiwiZGF0YSIsIkNoZWNrRXJyb3IiLCJlbWl0dGVyIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbml0IiwicG9tZWxvQ29ubmVjdGluZyIsImRpc2Nvbm5lY3QiLCJnZXRTdGF0ZSIsImRlc3Ryb3kiLCJjbGVhckxpc3RlbmVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxJQUNBQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBRGQ7QUFBQSxJQUVBQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBRmhCO0FBQUEsSUFHQUUsUUFBUSxHQUFHRixPQUFPLENBQUMsVUFBRCxDQUhsQjtBQUFBLElBSUFHLE9BQU8s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QUFJWCxRQUFRLENBQUNrRCxVQUFULENBQW9CdkMsS0FBcEIsRUFBMkJxQyxJQUEzQixFQUFpQ0MsSUFBakMsQ0FBSixFQUE0QztBQUMzQztBQUNBbEMsUUFBQUEsTUFBTSxDQUFDb0MsT0FBUCxDQUFlQyxJQUFmLENBQW9CekMsS0FBcEIsRUFBMkJzQyxJQUEzQjtBQUNBO0FBQ0QsS0FWUTtBQVdUTCxJQUFBQSxTQUFTLEVBQUVBO0FBWEYsR0FBVjtBQWFBZCxFQUFBQSxPQUFPLENBQUNRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCZSxJQUFJLENBQUNDLFNBQUwsQ0FBZVQsR0FBZixDQUFyQjtBQUNBakIsRUFBQUEsTUFBTSxDQUFDMkIsSUFBUCxDQUFZVixHQUFaLEVBaEJrRCxDQWlCbEQ7O0FBQ0E5QyxFQUFBQSxNQUFNLENBQUN5RCxnQkFBUDtBQUNBLENBbkJEOztBQW9CQXBELE9BQU8sQ0FBQ3FELFVBQVIsR0FBcUIsWUFBWTtBQUNoQzdCLEVBQUFBLE1BQU0sQ0FBQzZCLFVBQVA7QUFDQSxDQUZEOztBQUdBckQsT0FBTyxDQUFDc0QsUUFBUixHQUFtQixZQUFZO0FBQzlCLFNBQU85QixNQUFNLENBQUM4QixRQUFQLEVBQVA7QUFDQSxDQUZEOztBQUdBdEQsT0FBTyxDQUFDdUQsT0FBUixHQUFrQixZQUFZO0FBQzdCNUQsRUFBQUEsTUFBTSxDQUFDNEQsT0FBUDtBQUNBL0IsRUFBQUEsTUFBTSxDQUFDZ0MsYUFBUDtBQUNBLENBSEQ7O0FBS0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixZQUFZO0FBQzVCLE1BQUksQ0FBQ3hELFVBQUwsRUFBaUI7QUFDaEJBLElBQUFBLFVBQVUsR0FBRyxJQUFJTCxPQUFKLEVBQWI7QUFDQTs7QUFDRCxTQUFPSyxVQUFQO0FBQ0EsQ0FMRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsi77u/bGV0XHJcblx0aHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpLFxyXG5cdE5ldE1nciA9IHJlcXVpcmUoXCJOZXRNZ3JcIiksXHJcblx0ZXJyQ2hlY2sgPSByZXF1aXJlKFwiZXJyY2tlY3RcIiksXHJcblx0R2FtZU5ldCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMud2ViaG9zdCA9IG51bGw7XHJcblx0XHR0aGlzLnRpbWVvdXQgPSA1MDAwO1x0Ly/mraPluLjlj5HljIXlu7bov581MDAw5q+r56eSXHJcblx0fSxcclxuXHRnYW1lTmV0ID0gR2FtZU5ldC5wcm90b3R5cGUsXHJcblx0Z19pbnN0YW5jZSA9IG51bGw7XHJcblxyXG5cclxuXHJcbmdhbWVOZXQuZ2V0TmV0TWdyID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBOZXRNZ3I7XHJcbn1cclxuZ2FtZU5ldC5zZXRXZWJIb3N0ID0gZnVuY3Rpb24gKHdlYmhvc3QpIHtcclxuXHR0aGlzLndlYmhvc3QgPSB3ZWJob3N0XHJcbn1cclxuZ2FtZU5ldC5nZXRXZWJIb3N0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiB0aGlzLndlYmhvc3Q7XHJcbn1cclxuLy/mi7zoo4XmlbDmja5cclxuZ2FtZU5ldC5zZW5kX21zZyA9IGZ1bmN0aW9uIChyb3V0ZSwgbXNnLCBuZXh0LCB2ZXJzaW9uKSB7XHJcblx0Z2xHYW1lLnBhbmVsLnNob3dKdUh1YSgpO1xyXG5cdC8v5aaC5p6c5rKh5pyJ5raI5oGv5bCx5p6E6YCg5LiA5LiqXHJcblx0aWYgKG1zZyA9PSBudWxsIHx8IG1zZyA9PSAndW5kZWZpbmVkJykgbXNnID0ge307XHJcblx0Ly/nu5HlrprkuIDkuKrmtojmga9pZFxyXG5cdGxldCBpbmZvID0gTmV0TWdyLmNvbnZlcnRNc2cocm91dGUsIG1zZywgbmV4dCwgdmVyc2lvbik7XHJcblx0aWYgKCFpbmZvKSByZXR1cm4gMDtcclxuXHRsZXQgc2VydmVyVHlwZSA9IGluZm8uc2VydmVyVHlwZTtcclxuXHRsZXQgc2VydmVyVGltZW91dCA9IGluZm8uc2VydmVyVGltZW91dCB8fCB0aGlzLnRpbWVvdXQ7XHJcblx0bGV0IG5ld21zZyA9IGluZm8ubXNnO1xyXG5cdHN3aXRjaCAoc2VydmVyVHlwZSkge1xyXG5cdFx0Y2FzZSBHX05FVFRZUEUuaHR0cFBvc3Q6Ly9odHRwIHBvc3RcclxuXHRcdFx0aHR0cC5QT1NUKHJvdXRlLCBuZXdtc2csIG5leHQsIGZhbHNlLCBzZXJ2ZXJUaW1lb3V0KTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIEdfTkVUVFlQRS5odHRwR2V0Oi8vaHR0cCBnZXRcclxuXHRcdFx0aHR0cC5HRVQocm91dGUsIG5ld21zZywgbmV4dCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBHX05FVFRZUEUucG9tZWxvOi8vcG9tZWxvXHJcblx0XHRcdHRoaXMucG9tZWxvUmVxKHJvdXRlLCBuZXdtc2cpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBjb25zb2xlLmVycm9yKFwiZ2FtZU5ldC5zZW5kX21zZzogbm8gZmluZCBzZXJ2ZXJUeXBlIC0+XCIsIHNlcnZlclR5cGUpXHJcblx0fVxyXG5cdHJldHVybiBzZXJ2ZXJUeXBlO1xyXG59XHJcblxyXG4vL+mHjeWPkea2iOaBr1xyXG5nYW1lTmV0LnJlU2VuZE1zZ3MgPSBmdW5jdGlvbiAocmVjb3Jkcykge1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7ICsraSkge1xyXG5cdFx0bGV0IHJlY29yZCA9IHJlY29yZHNbaV07XHJcblx0XHRsZXQgc2VydmVyVHlwZSA9IHJlY29yZC5zZXJ2ZXJUeXBlO1xyXG5cdFx0bGV0IHJvdXRlID0gcmVjb3JkLnJvdXRlO1xyXG5cdFx0bGV0IG1zZyA9IHJlY29yZC5tc2c7XHJcblx0XHRsZXQgbmV4dCA9IHJlY29yZC5uZXh0O1xyXG5cclxuXHRcdHJlY29yZC5zZW5kTnVtICs9IDE7XHJcblx0XHRjb25zb2xlLmxvZyhcIltyZVNlbmRNc2dzXSByb3V0ZTpcIiwgcm91dGUsIFwic2VuZE51bTpcIiwgcmVjb3JkLnNlbmROdW0pO1xyXG5cdFx0aWYgKGVyckNoZWNrLmNoZWNrU2VuZExpbWl0KHJlY29yZC5zZW5kTnVtKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoIChzZXJ2ZXJUeXBlKSB7XHJcblx0XHRcdGNhc2UgR19ORVRUWVBFLmh0dHBQb3N0Oi8vaHR0cCBwb3N0XHJcblx0XHRcdFx0aHR0cC5QT1NUKHJvdXRlLCBtc2csIG5leHQsIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEdfTkVUVFlQRS5odHRwR2V0Oi8vaHR0cCBnZXRcclxuXHRcdFx0XHRodHRwLkdFVChyb3V0ZSwgbXNnLCBuZXh0KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBHX05FVFRZUEUucG9tZWxvOi8vcG9tZWxvXHJcblx0XHRcdFx0dGhpcy5wb21lbG9SZXEocm91dGUsIG1zZyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcImdhbWVOZXQucmVTZW5kTXNnczogbm8gZmluZCBzZXJ2ZXJUeXBlIC0+XCIsIHNlcnZlclR5cGUpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vL3RjcOivt+axglxyXG5nYW1lTmV0LnBvbWVsb1JlcSA9IGZ1bmN0aW9uIChyb3V0ZSwgbXNnKSB7XHJcblx0cG9tZWxvLnJlcXVlc3Qocm91dGUsIG1zZylcclxufVxyXG5cclxuZ2FtZU5ldC5jb25uZWN0ID0gZnVuY3Rpb24gKGhvc3QsIHBvcnQsIGNvbm5lY3RjYikge1xyXG5cdC8v5bm/5pKt6L+e5o6l5LqL5Lu2XHJcblx0bGV0IGNmZyA9IHtcclxuXHRcdGhvc3Q6IGhvc3QsXHJcblx0XHRwb3J0OiBwb3J0LFxyXG5cdFx0ZGVidWc6IHRydWUsXHJcblx0XHRtc2djYjogZnVuY3Rpb24gKHJvdXRlLCBjb2RlLCBkYXRhKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJvdXRlKTtcclxuXHRcdFx0aWYgKGVyckNoZWNrLkNoZWNrRXJyb3Iocm91dGUsIGNvZGUsIGRhdGEpKSB7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCLpnZ7plJnor6/mtojmga8s5YeG5aSH5bm/5pKtXCIsIHJvdXRlKTtcclxuXHRcdFx0XHRnbEdhbWUuZW1pdHRlci5lbWl0KHJvdXRlLCBkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGNvbm5lY3RjYjogY29ubmVjdGNiLFxyXG5cdH07XHJcblx0Y29uc29sZS5sb2coXCLov57mjqXphY3nva49XCIsIEpTT04uc3RyaW5naWZ5KGNmZykpO1xyXG5cdHBvbWVsby5pbml0KGNmZylcclxuXHQvL+WRiuiviee9kee7nOeuoeeQhnBvbWVsb+W8gOWni+i/nuaOpVxyXG5cdE5ldE1nci5wb21lbG9Db25uZWN0aW5nKCk7XHJcbn1cclxuZ2FtZU5ldC5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHBvbWVsby5kaXNjb25uZWN0KClcclxufVxyXG5nYW1lTmV0LmdldFN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBwb21lbG8uZ2V0U3RhdGUoKTtcclxufVxyXG5nYW1lTmV0LmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblx0TmV0TWdyLmRlc3Ryb3koKTtcclxuXHRwb21lbG8uY2xlYXJMaXN0ZW5lcigpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoIWdfaW5zdGFuY2UpIHtcclxuXHRcdGdfaW5zdGFuY2UgPSBuZXcgR2FtZU5ldCgpO1xyXG5cdH1cclxuXHRyZXR1cm4gZ19pbnN0YW5jZTtcclxufTsiXX0=
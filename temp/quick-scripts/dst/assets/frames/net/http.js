
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/net/http.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33caewdU/FJ5KxRVp1oI1CY', 'http');
// frames/net/http.js

"use strict";

var errCheck = require("errckect"),
    HTTP = function HTTP() {},
    http = HTTP.prototype,
    g_instance = null;

http.POST = function (route, msg, next) {
  var resend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5000;
  var xhr = cc.loader.getXMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      console.log("Status: Got GET response! " + xhr.statusText);
      var respone = xhr.responseText;
      var resp = JSON.parse(respone);
      var head = resp.head;
      var body = resp.body;
      glGame.gameNet.getNetMgr().setLoginToken(head.token);
      if (head.key) body = glGame.encrypt.getDecodeData(body, head.key);

      if (errCheck.CheckError(head.route, head.code, body)) {
        next(head.route, body);
      }
    }
  }; // note: In Internet Explorer, the timeout property may be set only after calling the open()
  // method and before calling the send() method.


  xhr.timeout = timeout;

  xhr.onerror = function (error) {
    console.log("出错啦 http.POST ...");
  };

  xhr.open("POST", glGame.gameNet.getWebHost(), true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  var tempData = msg.body;
  console.log("http.POST 发送数据", glGame.gameNet.getWebHost(), route, tempData);

  if (msg.body && !msg.head.key && !resend) {
    var data = {};
    data = glGame.encrypt.getEncodeData(msg.body);
    msg.body = data["data"];
    msg.head.key = data["dataKey"];
  }

  xhr.send(JSON.stringify(msg));
};

http.GET = function (route, msg) {
  var xhr = cc.loader.getXMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      console.log("Status: Got GET response! " + xhr.statusText);
    } else {
      console.log("Status: fail GET response! " + xhr.statusText);
    }
  }; // note: In Internet Explorer, the timeout property may be set only after calling the open()
  // method and before calling the send() method.


  xhr.timeout = 5000;

  xhr.onerror = function (error) {
    console.log("客户端出错啦webGetReq");
  };

  xhr.open("POST", glGame.gameNet.getWebHost(), msg);
  xhr.send();
  console.log("发送=", route, msg);
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new HTTP();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxuZXRcXGh0dHAuanMiXSwibmFtZXMiOlsiZXJyQ2hlY2siLCJyZXF1aXJlIiwiSFRUUCIsImh0dHAiLCJwcm90b3R5cGUiLCJnX2luc3RhbmNlIiwiUE9TVCIsInJvdXRlIiwibXNnIiwibmV4dCIsInJlc2VuZCIsInRpbWVvdXQiLCJ4aHIiLCJjYyIsImxvYWRlciIsImdldFhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNUZXh0IiwicmVzcG9uZSIsInJlc3BvbnNlVGV4dCIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJoZWFkIiwiYm9keSIsImdsR2FtZSIsImdhbWVOZXQiLCJnZXROZXRNZ3IiLCJzZXRMb2dpblRva2VuIiwidG9rZW4iLCJrZXkiLCJlbmNyeXB0IiwiZ2V0RGVjb2RlRGF0YSIsIkNoZWNrRXJyb3IiLCJjb2RlIiwib25lcnJvciIsImVycm9yIiwib3BlbiIsImdldFdlYkhvc3QiLCJzZXRSZXF1ZXN0SGVhZGVyIiwidGVtcERhdGEiLCJkYXRhIiwiZ2V0RW5jb2RlRGF0YSIsInNlbmQiLCJzdHJpbmdpZnkiLCJHRVQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQ0lBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FEdEI7QUFBQSxJQUVJQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFZLENBQUcsQ0FGMUI7QUFBQSxJQUdJQyxJQUFJLEdBQUdELElBQUksQ0FBQ0UsU0FIaEI7QUFBQSxJQUlJQyxVQUFVLEdBQUcsSUFKakI7O0FBTUFGLElBQUksQ0FBQ0csSUFBTCxHQUFZLFVBQVVDLEtBQVYsRUFBaUJDLEdBQWpCLEVBQXNCQyxJQUF0QixFQUE0RDtBQUFBLE1BQWhDQyxNQUFnQyx1RUFBdkIsS0FBdUI7QUFBQSxNQUFoQkMsT0FBZ0IsdUVBQU4s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LGlCQUFWLEVBQVY7O0FBQ0FILEVBQUFBLEdBQUcsQ0FBQ0ksa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxRQUFJSixHQUFHLENBQUNLLFVBQUosS0FBbUIsQ0FBbkIsSUFBeUJMLEdBQUcsQ0FBQ00sTUFBSixJQUFjLEdBQWQsSUFBcUJOLEdBQUcsQ0FBQ00sTUFBSixHQUFhLEdBQS9ELEVBQXFFO0FBQ2pFQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBK0JSLEdBQUcsQ0FBQ1MsVUFBL0M7QUFDSCxLQUZELE1BRU87QUFDSEYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0NBQWdDUixHQUFHLENBQUNTLFVBQWhEO0FBQ0g7QUFDSixHQU5ELENBRjZCLENBUzdCO0FBQ0E7OztBQUNBVCxFQUFBQSxHQUFHLENBQUNELE9BQUosR0FBYyxJQUFkOztBQUNBQyxFQUFBQSxHQUFHLENBQUMyQixPQUFKLEdBQWMsVUFBQ0MsS0FBRCxFQUFXO0FBQ3JCckIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFDSCxHQUZEOztBQUdBUixFQUFBQSxHQUFHLENBQUM2QixJQUFKLENBQVMsTUFBVCxFQUFpQlosTUFBTSxDQUFDQyxPQUFQLENBQWVZLFVBQWYsRUFBakIsRUFBOENsQyxHQUE5QztBQUNBSSxFQUFBQSxHQUFHLENBQUNtQyxJQUFKO0FBQ0E1QixFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CYixLQUFuQixFQUEwQkMsR0FBMUI7QUFDSCxDQWxCRDs7QUFvQkEwQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsWUFBWTtBQUN6QixNQUFJLENBQUM5QyxVQUFMLEVBQWlCO0FBQ2JBLElBQUFBLFVBQVUsR0FBRyxJQUFJSCxJQUFKLEVBQWI7QUFDSDs7QUFDRCxTQUFPRyxVQUFQO0FBQ0gsQ0FMZ0IsRUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldFxyXG4gICAgZXJyQ2hlY2sgPSByZXF1aXJlKFwiZXJyY2tlY3RcIiksXHJcbiAgICBIVFRQID0gZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgaHR0cCA9IEhUVFAucHJvdG90eXBlLFxyXG4gICAgZ19pbnN0YW5jZSA9IG51bGw7XHJcblxyXG5odHRwLlBPU1QgPSBmdW5jdGlvbiAocm91dGUsIG1zZywgbmV4dCwgcmVzZW5kID0gZmFsc2UsIHRpbWVvdXQgPSA1MDAwKSB7XHJcbiAgICBsZXQgeGhyID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGF0dXM6IEdvdCBHRVQgcmVzcG9uc2UhIFwiICsgeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgIGxldCByZXNwID0gSlNPTi5wYXJzZShyZXNwb25lKTtcclxuICAgICAgICAgICAgbGV0IGhlYWQgPSByZXNwLmhlYWQ7XHJcbiAgICAgICAgICAgIGxldCBib2R5ID0gcmVzcC5ib2R5O1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5nZXROZXRNZ3IoKS5zZXRMb2dpblRva2VuKGhlYWQudG9rZW4pO1xyXG4gICAgICAgICAgICBpZiAoaGVhZC5rZXkpIGJvZHkgPSBnbEdhbWUuZW5jcnlwdC5nZXREZWNvZGVEYXRhKGJvZHksIGhlYWQua2V5KTtcclxuICAgICAgICAgICAgaWYgKGVyckNoZWNrLkNoZWNrRXJyb3IoaGVhZC5yb3V0ZSwgaGVhZC5jb2RlLCBib2R5KSkge1xyXG4gICAgICAgICAgICAgICAgbmV4dChoZWFkLnJvdXRlLCBib2R5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIG5vdGU6IEluIEludGVybmV0IEV4cGxvcmVyLCB0aGUgdGltZW91dCBwcm9wZXJ0eSBtYXkgYmUgc2V0IG9ubHkgYWZ0ZXIgY2FsbGluZyB0aGUgb3BlbigpXHJcbiAgICAvLyBtZXRob2QgYW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBzZW5kKCkgbWV0aG9kLlxyXG4gICAgeGhyLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG4gICAgeGhyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWHuumUmeWVpiBodHRwLlBPU1QgLi4uXCIpXHJcbiAgICB9XHJcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgZ2xHYW1lLmdhbWVOZXQuZ2V0V2ViSG9zdCgpLCB0cnVlKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCIpO1xyXG5cclxuICAgIGxldCB0ZW1wRGF0YSA9IG1zZy5ib2R5O1xyXG4gICAgY29uc29sZS5sb2coXCJodHRwLlBPU1Qg5Y+R6YCB5pWw5o2uXCIsIGdsR2FtZS5nYW1lTmV0LmdldFdlYkhvc3QoKSwgcm91dGUsIHRlbXBEYXRhKVxyXG4gICAgXHJcbiAgICBpZiAobXNnLmJvZHkgJiYgIW1zZy5oZWFkLmtleSAmJiAhcmVzZW5kKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhID0gZ2xHYW1lLmVuY3J5cHQuZ2V0RW5jb2RlRGF0YShtc2cuYm9keSk7XHJcbiAgICAgICAgbXNnLmJvZHkgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICBtc2cuaGVhZC5rZXkgPSBkYXRhW1wiZGF0YUtleVwiXTtcclxuICAgIH1cclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KG1zZykpO1xyXG59XHJcblxyXG5odHRwLkdFVCA9IGZ1bmN0aW9uIChyb3V0ZSwgbXNnKSB7XHJcbiAgICBsZXQgeGhyID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGF0dXM6IEdvdCBHRVQgcmVzcG9uc2UhIFwiICsgeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdHVzOiBmYWlsIEdFVCByZXNwb25zZSEgXCIgKyB4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIG5vdGU6IEluIEludGVybmV0IEV4cGxvcmVyLCB0aGUgdGltZW91dCBwcm9wZXJ0eSBtYXkgYmUgc2V0IG9ubHkgYWZ0ZXIgY2FsbGluZyB0aGUgb3BlbigpXHJcbiAgICAvLyBtZXRob2QgYW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBzZW5kKCkgbWV0aG9kLlxyXG4gICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xyXG4gICAgeGhyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWuouaIt+err+WHuumUmeWVpndlYkdldFJlcVwiKVxyXG4gICAgfVxyXG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIGdsR2FtZS5nYW1lTmV0LmdldFdlYkhvc3QoKSwgbXNnKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIuWPkemAgT1cIiwgcm91dGUsIG1zZylcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWdfaW5zdGFuY2UpIHtcclxuICAgICAgICBnX2luc3RhbmNlID0gbmV3IEhUVFAoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59KCk7Il19
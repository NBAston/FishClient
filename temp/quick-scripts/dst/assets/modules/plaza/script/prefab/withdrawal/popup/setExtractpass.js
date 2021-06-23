
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/popup/setExtractpass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8ee3ARw0dEe59l/niHmEtU', 'setExtractpass');
// modules/plaza/script/prefab/withdrawal/popup/setExtractpass.js

"use strict";

glGame.baseclass.extend({
  properties: {
    pwd: cc.EditBox,
    pwdCheck: cc.EditBox,
    tips: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sure":
        this.reqSetDrawPassword();
        break;
    }
  },
  setTips: function setTips(mode) {
    this.tips.active = mode == 2;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    if (!psw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    }

    if (psw.length < 4 || psw.length > 12) {
      glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
      return false;
    }

    if (!/^[A-Za-z0-9]{4,12}$/.test(psw)) {
      glGame.panel.showErrorTip(glGame.tips.EXCHANGE.PSWLENGTH);
      return null;
    }

    if (confimpsw == null) return psw;

    if (!confimpsw || psw !== confimpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
      return null;
    }

    return psw;
  },
  reqSetDrawPassword: function reqSetDrawPassword() {
    var _this = this;

    var psw = this.checkPassword(this.pwd.string);
    var confirm = this.checkPassword(this.pwd.string, this.pwdCheck.string);
    if (!psw) return;
    if (!confirm) return;
    var newPwd = md5(this.pwd.string);
    var msg = {
      cpwd: md5(this.pwdCheck.string),
      pwd: md5(this.pwd.string)
    };
    glGame.gameNet.send_msg("http.reqSetWithdrawPwd", msg, function (route, data) {
      //刷新当前界面为输入密码界面
      glGame.user.reqWithdraw(Number(_this.coin), _this.type, newPwd); // this.initData();
    });
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("withdrawSuccess", this);
  } // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFxwb3B1cFxcc2V0RXh0cmFjdHBhc3MuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInB3ZCIsImNjIiwiRWRpdEJveCIsInB3ZENoZWNrIiwidGlwcyIsIk5vZGUiLCJvbkxvYWQiLCJlbWl0dGVyIiwib24iLCJ3aXRoZHJhd1N1Y2Nlc3MiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJyZW1vdmUiLCJyZXFTZXREcmF3UGFzc3dvcmQiLCJzZXRUaXBzIiwibW9kZSIsImFjdGl2ZSIsInNldCIsImtleSIsInZhbHVlIiwiY2hlY2tQYXNzd29yZCIsInBzdyIsImNvbmZpbXBzdyIsInBhbmVsIiwic2hvd0Vycm9yVGlwIiwiUkVHSVNUUkFUSU9OIiwiTE9HUFNXTlVMTCIsImxlbmd0aCIsIkVYQ0hBTkdFIiwiUFNXTEVOR1RIIiwidGVzdCIsIlBTV0NPRkFJTCIsInN0cmluZyIsImNvbmZpcm0iLCJuZXdQd2QiLCJtZDUiLCJtc2ciLCJjcHdkIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJkYXRhIiwidXNlciIsInJlcVdpdGhkcmF3IiwiTnVtYmVyIiwiY29pbiIsInR5cGUiLCJPbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFFcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUVDLEVBQUUsQ0FBQ0MsT0FEQTtBQUVSQyxJQUFBQSxRQUFRLEVBQUVGLEVBQUUsQ0FBQ0MsT0FGTDtBQUdSRSxJQUFBQSxJQUFJLEVBQUNILEVBQUUsQ0FBQ0k7QUFIQSxHQUZRO0FBUXBCO0FBRUFDLEVBQUFBLE1BVm9CLG9CQVVYO0FBQ0xWLElBQUFBLE1BQU0sQ0FBQ1csT0FBUCxD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TSxDQUFDK0MsSUFBUCxDQUFZQyxXQUFaLENBQXdCQyxNQUFNLENBQUMsS0FBSSxDQUFDQyxJQUFOLENBQTlCLEVBQTJDLEtBQUksQ0FBQ0MsSUFBaEQsRUFBc0RaLE1BQXRELEVBRm9FLENBR3BFO0FBRUgsS0FMRDtBQU1ILEdBOURtQjtBQStEcEIxQixFQUFBQSxlQS9Eb0IsNkJBK0RIO0FBQ2IsU0FBS0ksTUFBTDtBQUNILEdBakVtQjtBQWtFcEJtQyxFQUFBQSxTQWxFb0IsdUJBa0VSO0FBQ1JwRCxJQUFBQSxNQUFNLENBQUNXLE9BQVAsQ0FBZTBDLEdBQWYsQ0FBbUIsaUJBQW5CLEVBQXFDLElBQXJDO0FBQ0gsR0FwRW1CLENBcUVwQjs7QUFyRW9CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwd2Q6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgcHdkQ2hlY2s6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgdGlwczpjYy5Ob2RlXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIndpdGhkcmF3U3VjY2Vzc1wiLCB0aGlzLndpdGhkcmF3U3VjY2VzcywgdGhpcyk7XHJcbiAgICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMucmVtb3ZlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3N1cmVcIjogdGhpcy5yZXFTZXREcmF3UGFzc3dvcmQoKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldFRpcHMobW9kZSl7XHJcbiAgICAgICAgdGhpcy50aXBzLmFjdGl2ZSA9IG1vZGUgPT0gMjtcclxuICAgIH0sXHJcbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSxcclxuICAgIC8vIOWvhueggeajgOafpVxyXG4gICAgY2hlY2tQYXNzd29yZChwc3csIGNvbmZpbXBzdykge1xyXG4gICAgICAgIGlmICghcHN3KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLkxPR1BTV05VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBzdy5sZW5ndGggPCA0IHx8IHBzdy5sZW5ndGggPiAxMikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVYQ0hBTkdFLlBTV0xFTkdUSCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEvXltBLVphLXowLTldezQsMTJ9JC8udGVzdChwc3cpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRVhDSEFOR0UuUFNXTEVOR1RIKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maW1wc3cgPT0gbnVsbCkgcmV0dXJuIHBzdztcclxuICAgICAgICBpZiAoIWNvbmZpbXBzdyB8fCBwc3cgIT09IGNvbmZpbXBzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QU1dDT0ZBSUwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBzdztcclxuICAgIH0sXHJcbiAgICByZXFTZXREcmF3UGFzc3dvcmQoKSB7XHJcbiAgICAgICAgbGV0IHBzdyA9IHRoaXMuY2hlY2tQYXNzd29yZCh0aGlzLnB3ZC5zdHJpbmcpXHJcbiAgICAgICAgbGV0IGNvbmZpcm0gPSB0aGlzLmNoZWNrUGFzc3dvcmQodGhpcy5wd2Quc3RyaW5nLCB0aGlzLnB3ZENoZWNrLnN0cmluZylcclxuICAgICAgICBpZiAoIXBzdykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghY29uZmlybSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBuZXdQd2QgPSBtZDUodGhpcy5wd2Quc3RyaW5nKVxyXG4gICAgICAgIGxldCBtc2cgPSB7XHJcbiAgICAgICAgICAgIGNwd2Q6IG1kNSh0aGlzLnB3ZENoZWNrLnN0cmluZyksXHJcbiAgICAgICAgICAgIHB3ZDogbWQ1KHRoaXMucHdkLnN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcVNldFdpdGhkcmF3UHdkXCIsIG1zZywgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5Yi35paw5b2T5YmN55WM6Z2i5Li66L6T5YWl5a+G56CB55WM6Z2iXHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcVdpdGhkcmF3KE51bWJlcih0aGlzLmNvaW4pLCB0aGlzLnR5cGUsIG5ld1B3ZCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdERhdGEoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICB3aXRoZHJhd1N1Y2Nlc3MoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ3aXRoZHJhd1N1Y2Nlc3NcIix0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
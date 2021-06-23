
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/account/retrievepsw.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd43e7t2TJ1CQovnp5NoxL34', 'retrievepsw');
// modules/public/script/account/retrievepsw.js

"use strict";

glGame.baseclass.extend({
  properties: {
    retrieve_phone: cc.EditBox,
    retrieve_verifica: cc.EditBox,
    retrieve_psw: cc.EditBox,
    retrieve_cpsw: cc.EditBox,
    retrieve_sendVerifica: [cc.Node],
    label_retrivevcode: cc.Label,
    btn_retrievePswSend: cc.Button
  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("retrievePswCD", this.retrievePswCD, this);
    glGame.emitter.on("changePswSuccess", this.changePswSuccess, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("retrievePswCD", this);
    glGame.emitter.off("changePswSuccess", this);
  },
  changePswSuccess: function changePswSuccess() {
    this.remove();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_retrievePsw":
        this.retrievePsw_cb();
        break;

      case "btn_retrievePswSend":
        this.retrievePswSend_cb();
        break;

      case "btn_close":
        this.remove();
        break;

      default:
        break;
    }
  },
  //找回密码
  retrievePsw_cb: function retrievePsw_cb() {
    var msg = {};
    var phone = this.checkPhone(this.retrieve_phone.string);
    if (!phone) return;
    var psw = this.checkPassword(this.retrieve_psw.string, this.retrieve_cpsw.string);
    if (!psw) return;
    var code = this.retrieve_verifica.string;
    msg.phone = phone;
    msg.pwd = psw;
    msg.code = code;
    glGame.user.ReqRetrievePwd(msg);
  },
  //找回密码发送验证码
  retrievePswSend_cb: function retrievePswSend_cb() {
    var phone = this.checkPhone(this.retrieve_phone.string);
    if (!phone) return;
    glGame.user.ReqPostPhoneCode({
      phone: phone,
      type: 8
    });
  },
  //找回密码验证码
  retrievePswCD: function retrievePswCD(msg) {
    if (glGame.user.get("retrievePswState") && msg > 0) {
      this.btn_retrievePswSend.node.getChildByName("img_liang").active = false;
      this.btn_retrievePswSend.node.getChildByName("img_an").active = true;
      this.btn_retrievePswSend.interactable = false;
      this.retrieve_sendVerifica[0].active = false;
      this.retrieve_sendVerifica[1].active = true;
      this.label_retrivevcode.string = "".concat(msg, "\u79D2");
    } else {
      this.btn_retrievePswSend.node.getChildByName("img_liang").active = true;
      this.btn_retrievePswSend.node.getChildByName("img_an").active = false;
      this.btn_retrievePswSend.interactable = true;
      this.retrieve_sendVerifica[0].active = true;
      this.retrieve_sendVerifica[1].active = false;
    }
  },
  // 手机号码检查
  checkPhone: function checkPhone(acc) {
    if (!acc) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
      return null;
    } //放开限定
    //var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    //使用服务端限定正则方式


    var reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[0-9]\d{8}$/; // let reg = /^\d{11}$/; //验证规则

    var isacc_matcher = reg.test(acc);

    if (!isacc_matcher) {
      glGame.panel.showErrorTip('请输入正确的手机号');
      return false;
    }

    return acc;
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    if (!psw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    }

    if (psw.length < 6) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
      return false;
    }

    if (!/\w$/.test(psw)) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWWRONGFUL);
      return null;
    }

    if (confimpsw == null) return psw;

    if (!confimpsw || psw !== confimpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
      return null;
    }

    return psw;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGFjY291bnRcXHJldHJpZXZlcHN3LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJyZXRyaWV2ZV9waG9uZSIsImNjIiwiRWRpdEJveCIsInJldHJpZXZlX3ZlcmlmaWNhIiwicmV0cmlldmVfcHN3IiwicmV0cmlldmVfY3BzdyIsInJldHJpZXZlX3NlbmRWZXJpZmljYSIsIk5vZGUiLCJsYWJlbF9yZXRyaXZldmNvZGUiLCJMYWJlbCIsImJ0bl9yZXRyaWV2ZVBzd1NlbmQiLCJCdXR0b24iLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50Iiwic3RhcnQiLCJlbWl0dGVyIiwib24iLCJyZXRyaWV2ZVBzd0NEIiwiY2hhbmdlUHN3U3VjY2VzcyIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsInJlbW92ZSIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsInJldHJpZXZlUHN3X2NiIiwicmV0cmlldmVQc3dTZW5kX2NiIiwibXNnIiwicGhvbmUiLCJjaGVja1Bob25lIiwic3RyaW5nIiwicHN3IiwiY2hlY2tQYXNzd29yZCIsImNvZGUiLCJwd2QiLCJ1c2VyIiwiUmVxUmV0cmlldmVQd2QiLCJSZXFQb3N0UGhvbmVDb2RlIiwidHlwZSIsImdldCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwiaW50ZXJhY3RhYmxlIiwiYWNjIiwicGFuZWwiLCJzaG93RXJyb3JUaXAiLCJ0aXBzIiwiUkVHSVNUUkFUSU9OIiwiUEhPTkVOVUxMIiwicmVnIiwiaXNhY2NfbWF0Y2hlciIsInRlc3QiLCJjb25maW1wc3ciLCJMT0dQU1dOVUxMIiwibGVuZ3RoIiwiUFNXTEVOR1RIIiwiUFNXV1JPTkdGVUwiLCJQU1dDT0ZBSUwiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FB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QUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUlKLFNBQVMsSUFBSSxJQUFqQixFQUF1QixPQUFPckIsR0FBUDs7QUFDdkIsUUFBSSxDQUFDcUIsU0FBRCxJQUFjckIsR0FBRyxLQUFLcUIsU0FBMUIsRUFBcUM7QUFDakN4RCxNQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFDLFlBQWIsQ0FBMEJqRCxNQUFNLENBQUNrRCxJQUFQLENBQVlDLFlBQVosQ0FBeUJVLFNBQW5EO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsV0FBTzFCLEdBQVA7QUFDSCxHQXRIbUI7QUF5SHBCMkIsRUFBQUEsU0F6SG9CLHVCQXlIUjtBQUNSLFNBQUt2QyxlQUFMO0FBQ0gsR0EzSG1CLENBNEhwQjs7QUE1SG9CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICByZXRyaWV2ZV9waG9uZTogY2MuRWRpdEJveCxcclxuICAgICAgICByZXRyaWV2ZV92ZXJpZmljYTogY2MuRWRpdEJveCxcclxuICAgICAgICByZXRyaWV2ZV9wc3c6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgcmV0cmlldmVfY3BzdzogY2MuRWRpdEJveCxcclxuICAgICAgICByZXRyaWV2ZV9zZW5kVmVyaWZpY2E6IFtjYy5Ob2RlXSxcclxuICAgICAgICBsYWJlbF9yZXRyaXZldmNvZGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ0bl9yZXRyaWV2ZVBzd1NlbmQ6IGNjLkJ1dHRvbixcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwicmV0cmlldmVQc3dDRFwiLCB0aGlzLnJldHJpZXZlUHN3Q0QsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiY2hhbmdlUHN3U3VjY2Vzc1wiLCB0aGlzLmNoYW5nZVBzd1N1Y2Nlc3MsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJyZXRyaWV2ZVBzd0NEXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcImNoYW5nZVBzd1N1Y2Nlc3NcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVBzd1N1Y2Nlc3MoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yZXRyaWV2ZVBzd1wiOiB0aGlzLnJldHJpZXZlUHN3X2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JldHJpZXZlUHN3U2VuZFwiOiB0aGlzLnJldHJpZXZlUHN3U2VuZF9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLnJlbW92ZSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aJvuWbnuWvhueggVxyXG4gICAgcmV0cmlldmVQc3dfY2IoKSB7XHJcbiAgICAgICAgbGV0IG1zZyA9IHt9O1xyXG4gICAgICAgIGxldCBwaG9uZSA9IHRoaXMuY2hlY2tQaG9uZSh0aGlzLnJldHJpZXZlX3Bob25lLnN0cmluZylcclxuICAgICAgICBpZiAoIXBob25lKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBzdyA9IHRoaXMuY2hlY2tQYXNzd29yZCh0aGlzLnJldHJpZXZlX3Bzdy5zdHJpbmcsIHRoaXMucmV0cmlldmVfY3Bzdy5zdHJpbmcpO1xyXG4gICAgICAgIGlmICghcHN3KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5yZXRyaWV2ZV92ZXJpZmljYS5zdHJpbmc7XHJcbiAgICAgICAgbXNnLnBob25lID0gcGhvbmU7XHJcbiAgICAgICAgbXNnLnB3ZCA9IHBzdztcclxuICAgICAgICBtc2cuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuUmVxUmV0cmlldmVQd2QobXNnKTtcclxuICAgIH0sXHJcbiAgICAvL+aJvuWbnuWvhueggeWPkemAgemqjOivgeeggVxyXG4gICAgcmV0cmlldmVQc3dTZW5kX2NiKCkge1xyXG4gICAgICAgIGxldCBwaG9uZSA9IHRoaXMuY2hlY2tQaG9uZSh0aGlzLnJldHJpZXZlX3Bob25lLnN0cmluZylcclxuICAgICAgICBpZiAoIXBob25lKSByZXR1cm47XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuUmVxUG9zdFBob25lQ29kZSh7IHBob25lOiBwaG9uZSwgdHlwZTogOCB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mib7lm57lr4bnoIHpqozor4HnoIFcclxuICAgIHJldHJpZXZlUHN3Q0QobXNnKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmdldChcInJldHJpZXZlUHN3U3RhdGVcIikgJiYgbXNnID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9yZXRyaWV2ZVBzd1NlbmQubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19saWFuZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fcmV0cmlldmVQc3dTZW5kLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfYW5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fcmV0cmlldmVQc3dTZW5kLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlX3NlbmRWZXJpZmljYVswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZV9zZW5kVmVyaWZpY2FbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9yZXRyaXZldmNvZGUuc3RyaW5nID0gYCR7bXNnfeenkmA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idG5fcmV0cmlldmVQc3dTZW5kLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbGlhbmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fcmV0cmlldmVQc3dTZW5kLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfYW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3JldHJpZXZlUHN3U2VuZC5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlX3NlbmRWZXJpZmljYVswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlX3NlbmRWZXJpZmljYVsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJi+acuuWPt+eggeajgOafpVxyXG4gICAgY2hlY2tQaG9uZShhY2MpIHtcclxuICAgICAgICBpZiAoIWFjYykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QSE9ORU5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlL7lvIDpmZDlrppcclxuICAgICAgICAvL3ZhciByZWcgPSAvXjFbM3w0fDV8Nnw3fDh8OV1bMC05XXs5fSQvO1xyXG4gICAgICAgIC8v5L2/55So5pyN5Yqh56uv6ZmQ5a6a5q2j5YiZ5pa55byPXHJcbiAgICAgICAgdmFyIHJlZyA9IC9eMTM0WzAtOF1cXGR7N30kfF4xM1teNF1cXGR7OH0kfF4xNFs1LTldXFxkezh9JHxeMTVbXjRdXFxkezh9JHxeMTZbNl1cXGR7OH0kfF4xN1swLThdXFxkezh9JHxeMThbXFxkXXs5fSR8XjE5WzAtOV1cXGR7OH0kLztcclxuICAgICAgICAvLyBsZXQgcmVnID0gL15cXGR7MTF9JC87IC8v6aqM6K+B6KeE5YiZXHJcbiAgICAgICAgbGV0IGlzYWNjX21hdGNoZXIgPSByZWcudGVzdChhY2MpO1xyXG4gICAgICAgIGlmICghaXNhY2NfbWF0Y2hlcikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKCfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWvhueggeajgOafpVxyXG4gICAgY2hlY2tQYXNzd29yZChwc3csIGNvbmZpbXBzdykge1xyXG4gICAgICAgIGlmICghcHN3KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLkxPR1BTV05VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBzdy5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlBTV0xFTkdUSCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEvXFx3JC8udGVzdChwc3cpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlBTV1dST05HRlVMKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maW1wc3cgPT0gbnVsbCkgcmV0dXJuIHBzdztcclxuICAgICAgICBpZiAoIWNvbmZpbXBzdyB8fCBwc3cgIT09IGNvbmZpbXBzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QU1dDT0ZBSUwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBzdztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
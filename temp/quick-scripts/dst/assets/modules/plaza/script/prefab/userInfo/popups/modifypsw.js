
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/popups/modifypsw.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e3142A+6NCsq9PtEEokgNh', 'modifypsw');
// modules/plaza/script/prefab/userInfo/popups/modifypsw.js

"use strict";

/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
  properties: {
    psw: cc.EditBox,
    // 旧密码
    newpsw: cc.EditBox,
    // 新密码
    confirmpsw: cc.EditBox // 确认新密码

  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("editpswsuccess", this);
  },
  editpswsuccess: function editpswsuccess() {
    this.remove();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "confirm":
        this.click_confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  // 确认更改密码
  click_confirm: function click_confirm() {
    var psw = this.checkPassword(this.psw.string, this.newpsw.string, this.confirmpsw.string);

    if (psw) {
      glGame.user.reqEditPwd({
        old_pwd: md5(this.psw.string),
        pwd: md5(this.newpsw.string),
        type: 1
      });
    }
  },
  // 密码检查
  checkPassword: function checkPassword(psw, newpsw, confirmpsw) {
    if (!psw) return this.showErrorTip(glGame.tips.EDITBOX.PSWNULL);
    if (psw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(psw)) return this.showErrorTip(glGame.tips.EDITBOX.PSWWRONGFUL);
    if (!newpsw) return this.showErrorTip(glGame.tips.EDITBOX.NEWPSWNULL);
    if (newpsw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(newpsw)) return this.showErrorTip(glGame.tips.EDITBOX.NEWPSWWRONGFUL);
    if (!confirmpsw) return this.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWNULL);
    if (confirmpsw.length < 6) return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
    if (!/\w$/.test(confirmpsw)) return this.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWWRONGFUL);
    if (psw === newpsw) return this.showErrorTip(glGame.tips.EDITBOX.OLDNEWPSWEQUALS);
    if (newpsw !== confirmpsw) return this.showErrorTip(glGame.tips.EDITBOX.PSWCOFAIL);
    return psw;
  },
  showErrorTip: function showErrorTip(msg) {
    glGame.panel.showTip(msg);
    this.clearUIData();
    return null;
  },
  clearUIData: function clearUIData() {// this.psw.string = "";
    // this.newpsw.string = "";
    // this.confirmpsw.string = "";
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xccG9wdXBzXFxtb2RpZnlwc3cuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInBzdyIsImNjIiwiRWRpdEJveCIsIm5ld3BzdyIsImNvbmZpcm1wc3ciLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50IiwiZW1pdHRlciIsIm9uIiwiZWRpdHBzd3N1Y2Nlc3MiLCJPbkRlc3Ryb3kiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJyZW1vdmUiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJjbGlja19jbG9zZSIsImNsaWNrX2NvbmZpcm0iLCJjb25zb2xlIiwiZXJyb3IiLCJjaGVja1Bhc3N3b3JkIiwic3RyaW5nIiwidXNlciIsInJlcUVkaXRQd2QiLCJvbGRfcHdkIiwibWQ1IiwicHdkIiwidHlwZSIsInNob3dFcnJvclRpcCIsInRpcHMiLCJFRElUQk9YIiwiUFNXTlVMTCIsImxlbmd0aCIsInBhbmVsIiwiUkVHSVNUUkFUSU9OIiwiUFNXTEVOR1RIIiwidGVzdCIsIlBTV1dST05HRlVMIiwiTkVXUFNXTlVMTCIsIk5FV1BTV1dST05HRlVMIiwiQ09ORklSTVBTV05VTEwiLCJDT05GSVJNUFNXV1JPTkdGVUwiLCJPTERORVdQU1dFUVVBTFMiLCJQU1dDT0ZBSUwiLCJtc2ciLCJzaG93VGlwIiwiY2xlYXJVSURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsR0FBRyxFQUFFQyxFQUFFLENBQUNDLE9BREE7QUFDZ0I7QUFDeEJDLElBQUFBLE1BQU0sRUFBRUYsRUFBRSxDQUFDQyxPQUZIO0FBRWdCO0FBQ3hCRSxJQUFBQSxVQUFVLEVBQUVILEVBQUUsQ0FB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Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOS/ruaUuei0puWPt+eZu+mZhuWvhueggemdouadv1xyXG4gKi9cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBzdzogY2MuRWRpdEJveCwgICAgICAgIC8vIOaXp+WvhueggVxyXG4gICAgICAgIG5ld3BzdzogY2MuRWRpdEJveCwgICAgIC8vIOaWsOWvhueggVxyXG4gICAgICAgIGNvbmZpcm1wc3c6IGNjLkVkaXRCb3ggIC8vIOehruiupOaWsOWvhueggVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJFdmVudCAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJlZGl0cHN3c3VjY2Vzc1wiLCB0aGlzLmVkaXRwc3dzdWNjZXNzLCB0aGlzKVxyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiZWRpdHBzd3N1Y2Nlc3NcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgZWRpdHBzd3N1Y2Nlc3MgKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayAobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbmZpcm1cIjogdGhpcy5jbGlja19jb25maXJtKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfY2xvc2UgKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLy8g56Gu6K6k5pu05pS55a+G56CBXHJcbiAgICBjbGlja19jb25maXJtICgpIHtcclxuICAgICAgICBsZXQgcHN3ID0gdGhpcy5jaGVja1Bhc3N3b3JkKHRoaXMucHN3LnN0cmluZywgdGhpcy5uZXdwc3cuc3RyaW5nLCB0aGlzLmNvbmZpcm1wc3cuc3RyaW5nKTtcclxuICAgICAgICBpZiAocHN3KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUVkaXRQd2Qoe29sZF9wd2Q6IG1kNSh0aGlzLnBzdy5zdHJpbmcpLCBwd2Q6IG1kNSh0aGlzLm5ld3Bzdy5zdHJpbmcpLCB0eXBlOiAxfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWvhueggeajgOafpVxyXG4gICAgY2hlY2tQYXNzd29yZCAocHN3LCBuZXdwc3csIGNvbmZpcm1wc3cpIHtcclxuICAgICAgICBpZiAoIXBzdykgcmV0dXJuIHRoaXMuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guUFNXTlVMTCk7XHJcbiAgICAgICAgaWYgKHBzdy5sZW5ndGggPCA2KSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uUFNXTEVOR1RIKTtcclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KHBzdykpIHJldHVybiB0aGlzLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLlBTV1dST05HRlVMKTtcclxuICAgICAgICBpZiAoIW5ld3BzdykgcmV0dXJuIHRoaXMuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guTkVXUFNXTlVMTCk7XHJcbiAgICAgICAgaWYgKG5ld3Bzdy5sZW5ndGggPCA2KSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uUFNXTEVOR1RIKTtcclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KG5ld3BzdykpIHJldHVybiB0aGlzLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLk5FV1BTV1dST05HRlVMKTtcclxuICAgICAgICBpZiAoIWNvbmZpcm1wc3cpIHJldHVybiB0aGlzLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLkNPTkZJUk1QU1dOVUxMKTtcclxuICAgICAgICBpZiAoY29uZmlybXBzdy5sZW5ndGggPCA2KSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uUFNXTEVOR1RIKTtcclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KGNvbmZpcm1wc3cpKSByZXR1cm4gdGhpcy5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRURJVEJPWC5DT05GSVJNUFNXV1JPTkdGVUwpO1xyXG4gICAgICAgIGlmIChwc3cgPT09IG5ld3BzdykgcmV0dXJuIHRoaXMuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guT0xETkVXUFNXRVFVQUxTKTtcclxuICAgICAgICBpZiAobmV3cHN3ICE9PSBjb25maXJtcHN3KSByZXR1cm4gdGhpcy5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRURJVEJPWC5QU1dDT0ZBSUwpO1xyXG4gICAgICAgIHJldHVybiBwc3c7XHJcbiAgICB9LFxyXG4gICAgc2hvd0Vycm9yVGlwIChtc2cpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1RpcChtc2cpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJVSURhdGEoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBjbGVhclVJRGF0YSAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5wc3cuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLm5ld3Bzdy5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIC8vIHRoaXMuY29uZmlybXBzdy5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG59KTsiXX0=
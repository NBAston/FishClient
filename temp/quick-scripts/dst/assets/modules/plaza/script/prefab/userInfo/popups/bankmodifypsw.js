
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/popups/bankmodifypsw.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71488IJ5XNEB412UIo6nLFl', 'bankmodifypsw');
// modules/plaza/script/prefab/userInfo/popups/bankmodifypsw.js

"use strict";

/**
 * 修改银行密码
 */
glGame.baseclass.extend({
  properties: {
    usedpsw: cc.EditBox,
    // 旧密码
    newpsw: cc.EditBox,
    // 新密码
    confirmpsw: cc.EditBox // 确认新密码

  },
  onLoad: function onLoad() {
    glGame.emitter.on("editpswsuccess", this.editpswsuccess, this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "btn_close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_confirm: function click_confirm() {
    var psw = this.checkPassword(this.usedpsw.string, this.newpsw.string, this.confirmpsw.string);

    if (psw) {
      glGame.user.reqEditPwd(psw);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  editpswsuccess: function editpswsuccess() {
    this.usedpsw.string = "";
    this.newpsw.string = "";
    this.confirmpsw.string = "";
    this.remove();
  },
  // 密码检查
  checkPassword: function checkPassword(usedpsw, newpsw, confirmpsw) {
    if (!usedpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.OLDPSW);
      return null;
    }

    if (!/\w$/.test(usedpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.PSWWRONGFUL);
      return null;
    }

    if (!newpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NEWPSWNULL);
      return null;
    }

    if (!/\w$/.test(newpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NEWPSWWRONGFUL);
      return null;
    }

    if (!confirmpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.CONFIRMNEWPSW);
      return null;
    }

    if (!/\w$/.test(confirmpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.CONFIRMPSWWRONGFUL);
      return null;
    }

    if (usedpsw === newpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.OLDNEWPSWEQUALS);
      return null;
    }

    if (newpsw !== confirmpsw) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.PSWCOFAIL);
      return null;
    }

    if (!/^[0-9]{6,6}$/.test(newpsw)) {
      glGame.panel.showErrorTip(glGame.tips.EDITBOX.NUMBERIC6);
      return null;
    }

    return {
      old_pwd: md5(usedpsw),
      pwd: md5(newpsw),
      type: 2
    };
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("editpswsuccess", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xccG9wdXBzXFxiYW5rbW9kaWZ5cHN3LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJ1c2VkcHN3IiwiY2MiLCJFZGl0Qm94IiwibmV3cHN3IiwiY29uZmlybXBzdyIsIm9uTG9hZCIsImVtaXR0ZXIiLCJvbiIsImVkaXRwc3dzdWNjZXNzIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xpY2tfY29uZmlybSIsImNsaWNrX2Nsb3NlIiwiY29uc29sZSIsImVycm9yIiwicHN3IiwiY2hlY2tQYXNzd29yZCIsInN0cmluZyIsInVzZXIiLCJyZXFFZGl0UHdkIiwicmVtb3ZlIiwicGFuZWwiLCJzaG93RXJyb3JUaXAiLCJ0aXBzIiwiRURJVEJPWCIsIk9MRFBTVyIsInRlc3QiLCJQU1dXUk9OR0ZVTCIsIk5FV1BTV05VTEwiLCJORVdQU1dXUk9OR0ZVTCIsIkNPTkZJUk1ORVdQU1ciLCJDT05GSVJNUFNXV1JPTkdGVUwiLCJPTERORVdQU1dFUVVBTFMiLCJQU1dDT0ZBSUwiLCJOVU1CRVJJQzYiLCJvbGRfcHdkIiwibWQ1IiwicHdkIiwidHlwZSIsInNldCIsImtleSIsInZhbHVlIiwiZ2V0IiwiT25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUMsRUFBRSxDQUFDQyxPQURKO0FBQ2dCO0FBQ3hCQyxJQUFBQSxNQUFNLEVBQUVGLEVBQUUsQ0FBQ0MsT0FGSDtBQUVnQjtBQUN4QkUsSUFBQUEsVUFBVSxFQUFFSCxFQUFFLENBQUNDLE9BSFAsQ0FHZ0I7O0FBSGhCLEdBRFE7QUFNcEJHLEVBQUFBLE1BTm9CLG9CQU1Y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6ZO26KGM5a+G56CBXHJcbiAqL1xyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdXNlZHBzdzogY2MuRWRpdEJveCwgICAgLy8g5pen5a+G56CBXHJcbiAgICAgICAgbmV3cHN3OiBjYy5FZGl0Qm94LCAgICAgLy8g5paw5a+G56CBXHJcbiAgICAgICAgY29uZmlybXBzdzogY2MuRWRpdEJveCAgLy8g56Gu6K6k5paw5a+G56CBXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiZWRpdHBzd3N1Y2Nlc3NcIiwgdGhpcy5lZGl0cHN3c3VjY2VzcywgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMuY2xpY2tfY29uZmlybSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLmNsaWNrX2Nsb3NlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfY29uZmlybSgpIHtcclxuICAgICAgICBsZXQgcHN3ID0gdGhpcy5jaGVja1Bhc3N3b3JkKHRoaXMudXNlZHBzdy5zdHJpbmcsIHRoaXMubmV3cHN3LnN0cmluZywgdGhpcy5jb25maXJtcHN3LnN0cmluZyk7XHJcbiAgICAgICAgaWYgKHBzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZXFFZGl0UHdkKHBzdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgZWRpdHBzd3N1Y2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy51c2VkcHN3LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5uZXdwc3cuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNvbmZpcm1wc3cuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIC8vIOWvhueggeajgOafpVxyXG4gICAgY2hlY2tQYXNzd29yZCh1c2VkcHN3LCBuZXdwc3csIGNvbmZpcm1wc3cpIHtcclxuICAgICAgICBpZiAoIXVzZWRwc3cpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLk9MRFBTVyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KHVzZWRwc3cpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRURJVEJPWC5QU1dXUk9OR0ZVTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW5ld3Bzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guTkVXUFNXTlVMTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KG5ld3BzdykpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLk5FV1BTV1dST05HRlVMKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29uZmlybXBzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guQ09ORklSTU5FV1BTVyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9cXHckLy50ZXN0KGNvbmZpcm1wc3cpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuRURJVEJPWC5DT05GSVJNUFNXV1JPTkdGVUwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZWRwc3cgPT09IG5ld3Bzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkVESVRCT1guT0xETkVXUFNXRVFVQUxTKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdwc3cgIT09IGNvbmZpcm1wc3cpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLlBTV0NPRkFJTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighL15bMC05XXs2LDZ9JC8udGVzdChuZXdwc3cpKXtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLk5VTUJFUklDNik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IG9sZF9wd2Q6IG1kNSh1c2VkcHN3KSwgcHdkOiBtZDUobmV3cHN3KSwgdHlwZTogMiB9O1xyXG4gICAgfSxcclxuICAgIHNldChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcImVkaXRwc3dzdWNjZXNzXCIsIHRoaXMpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/popups/bankpassword.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce155EqfilDIpLF3Mase+KH', 'bankpassword');
// modules/plaza/script/prefab/userInfo/popups/bankpassword.js

"use strict";

glGame.baseclass.extend({
  properties: {
    pswedit: cc.EditBox // 银行密码输入框

  },
  onLoad: function onLoad() {
    this.resetData();
  },
  resetData: function resetData() {
    this.pay_password = glGame.user.get("pay_password");
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "btn_close":
        this.close_cb();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  close_cb: function close_cb() {
    this.node.destroy();
  },
  click_confirm: function click_confirm() {
    var psw = this.checkPassword(this.pswedit.string);

    if (psw) {
      this.confirmNext(psw);
      this.remove();
    }
  },
  // 密码检查
  checkPassword: function checkPassword(editpsw) {
    this.resetData();

    if (!editpsw) {
      return this.showErrorTip(glGame.tips.EDITBOX.BANKPSWNULL);
    }

    editpsw = md5(editpsw);
    return editpsw;
  },
  click_began: function click_began() {
    this.pswedit.placeholder = "";
  },
  click_end: function click_end() {
    if (this.pswedit.string == "") {
      this.pswedit.placeholder = "      请输入您设置的银行密码";
    }
  },
  showErrorTip: function showErrorTip(msg) {
    glGame.panel.showErrorTip(msg);
    return null;
  },
  setConfirmNext: function setConfirmNext(func) {
    this.confirmNext = func;
  },
  set: function set(key, value) {
    this[key] = value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xccG9wdXBzXFxiYW5rcGFzc3dvcmQuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInBzd2VkaXQiLCJjYyIsIkVkaXRCb3giLCJvbkxvYWQiLCJyZXNldERhdGEiLCJwYXlfcGFzc3dvcmQiLCJ1c2VyIiwiZ2V0Iiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xpY2tfY29uZmlybSIsImNsb3NlX2NiIiwiY29uc29sZSIsImVycm9yIiwiZGVzdHJveSIsInBzdyIsImNoZWNrUGFzc3dvcmQiLCJzdHJpbmciLCJjb25maXJtTmV4dCIsInJlbW92ZSIsImVkaXRwc3ciLCJzaG93RXJyb3JUaXAiLCJ0aXBzIiwiRURJVEJPWCIsIkJBTktQU1dOVUxMIiwibWQ1IiwiY2xpY2tfYmVnYW4iLCJwbGFjZWhvbGRlciIsImNsaWNrX2VuZCIsIm1zZyIsInBhbmVsIiwic2V0Q29uZmlybU5leHQiLCJmdW5jIiwic2V0Iiwia2V5IiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVDLEVBQUUsQ0FBQ0MsT0FESixDQUNnQjs7QUFEaEIsR0FEUTtBQUlwQkMsRUFBQUEsTUFKb0Isb0JBSVY7QUFDTixTQUFLQyxTQUFMO0FBQ0gsR0FObUI7QUFPcEJBLEVBQUFBLFNBUG9CLHVCQU9QO0FBQ1QsU0FBS0MsWUFBTCxHQUFvQlQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBcEI7QUFDSCxHQVRtQjtBQVVwQkMsRUFBQUEsT0FWb0IsbUJBVVhDLElBVlcsRUFVTEMsSUFWSyxFQVVDO0FBQ2pCLFlBQVFELElBQVI7QUFDSSxXQUFLLFNBQUw7QUFBZ0IsYUFBS0UsYUFBTDtBQUFzQjs7QUFDdEMsV0FBSyxXQUFMO0FBQWtCLGFBQUtDLFFBQUw7QUFBaUI7O0FBQ25DO0FBQVNDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDTCxJQUEzQztBQUhiO0FBS0gsR0FoQm1CO0FBaUJwQkcsRUFBQUEsUUFqQm9CLHNCQWlCVjtBQUNOLFNBQUtGLElBQUwsQ0FBVUssT0FBVjtBQUNILEdBbkJtQjtBQW9CcEJKLEVBQUFBLGFBcEJvQiwyQkFvQkg7QUFDYixRQUFJSyxHQUFHLEdBQUcsS0FBS0MsYUFBTCxDQUFtQixLQUFLakIsT0FBTCxDQUFha0IsTUFBaEMsQ0FBVjs7QUFDQSxRQUFJRixHQUFKLEVBQVM7QUFDTCxXQUFLRyxXQUFMLENBQWlCSCxHQUFqQjtBQUNBLFdBQUtJLE1BQUw7QUFDSDtBQUNKLEdBMUJtQjtBQTJCcEI7QUFDQUgsRUFBQUEsYUE1Qm9CLHlCQTRCTEksT0E1QkssRUE0Qkk7QUFDcEIsU0FBS2pCLFNBQUw7O0FBQ0EsUUFBSSxDQUFDaUIsT0FBTCxFQUFjO0FBQ1YsYUFBTyxLQUFLQyxZQUFMLENBQWtCMUIsTUFBTSxDQUFDMkIsSUFBUCxDQUFZQyxPQUFaLENBQW9CQyxXQUF0QyxDQUFQO0FBQ0g7O0FBQ0RKLElBQUFBLE9BQU8sR0FBR0ssR0FBRyxDQUFDTCxPQUFELENBQWI7QUFDQSxXQUFPQSxPQUFQO0FBQ0gsR0FuQ21CO0FBb0NwQk0sRUFBQUEsV0FwQ29CLHlCQW9DUDtBQUNWLFNBQUszQixPQUFMLENBQWE0QixXQUFiLEdBQTBCLEVBQTFCO0FBQ0YsR0F0Q21CO0FBdUNwQkMsRUFBQUEsU0F2Q29CLHVCQXVDVDtBQUNSLFFBQUcsS0FBSzdCLE9BQUwsQ0FBYWtCLE1BQWIsSUFBcUIsRUFBeEIsRUFBMkI7QUFDMUIsV0FBS2xCLE9BQUwsQ0FBYTRCLFdBQWIsR0FBMkIsbUJBQTNCO0FBQ0E7QUFDSCxHQTNDbUI7QUE0Q3BCTixFQUFBQSxZQTVDb0Isd0JBNENOUSxHQTVDTSxFQTRDRDtBQUNmbEMsSUFBQUEsTUFBTSxDQUFDbUMsS0FBUCxDQUFhVCxZQUFiLENBQTBCUSxHQUExQjtBQUNBLFdBQU8sSUFBUDtBQUNILEdBL0NtQjtBQWdEcEJFLEVBQUFBLGNBaERvQiwwQkFnREpDLElBaERJLEVBZ0RFO0FBQ2xCLFNBQUtkLFdBQUwsR0FBbUJjLElBQW5CO0FBQ0gsR0FsRG1CO0FBbURwQkMsRUFBQUEsR0FuRG9CLGVBbURmQyxHQW5EZSxFQW1EVkMsS0FuRFUsRUFtREg7QUFDYixTQUFLRCxHQUFMLElBQVlDLEtBQVo7QUFDSDtBQXJEbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwc3dlZGl0OiBjYy5FZGl0Qm94LCAgICAvLyDpk7booYzlr4bnoIHovpPlhaXmoYZcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICB9LFxyXG4gICAgcmVzZXREYXRhICgpIHtcclxuICAgICAgICB0aGlzLnBheV9wYXNzd29yZCA9IGdsR2FtZS51c2VyLmdldChcInBheV9wYXNzd29yZFwiKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrIChuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMuY2xpY2tfY29uZmlybSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLmNsb3NlX2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xvc2VfY2IoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2NvbmZpcm0gKCkge1xyXG4gICAgICAgIGxldCBwc3cgPSB0aGlzLmNoZWNrUGFzc3dvcmQodGhpcy5wc3dlZGl0LnN0cmluZyk7XHJcbiAgICAgICAgaWYgKHBzdykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1OZXh0KHBzdyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWvhueggeajgOafpVxyXG4gICAgY2hlY2tQYXNzd29yZCAoZWRpdHBzdykge1xyXG4gICAgICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICAgICAgaWYgKCFlZGl0cHN3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5FRElUQk9YLkJBTktQU1dOVUxMKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWRpdHBzdyA9IG1kNShlZGl0cHN3KTtcclxuICAgICAgICByZXR1cm4gZWRpdHBzdztcclxuICAgIH0sXHJcbiAgICBjbGlja19iZWdhbigpe1xyXG4gICAgICAgdGhpcy5wc3dlZGl0LnBsYWNlaG9sZGVyPSBcIlwiO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2VuZCgpe1xyXG4gICAgICAgaWYodGhpcy5wc3dlZGl0LnN0cmluZz09XCJcIil7XHJcbiAgICAgICAgdGhpcy5wc3dlZGl0LnBsYWNlaG9sZGVyID0gXCIgICAgICDor7fovpPlhaXmgqjorr7nva7nmoTpk7booYzlr4bnoIFcIlxyXG4gICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3dFcnJvclRpcCAobXNnKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChtc2cpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHNldENvbmZpcm1OZXh0IChmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtTmV4dCA9IGZ1bmM7XHJcbiAgICB9LFxyXG4gICAgc2V0IChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pOyJdfQ==
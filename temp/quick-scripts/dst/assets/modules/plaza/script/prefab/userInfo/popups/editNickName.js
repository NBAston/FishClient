
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/popups/editNickName.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11cf0gOr2FMMrauGDPEdJ6A', 'editNickName');
// modules/plaza/script/prefab/userInfo/popups/editNickName.js

"use strict";

/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
  properties: {
    //修改昵称
    edit_nickname: cc.EditBox
  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  unRegisterEvent: function unRegisterEvent() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_editNickCancel":
        this.click_close();
        break;

      case "btn_editNickSure":
        this.editNickSure_cb();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  // 昵称检查
  checkNickName: function checkNickName(nameNum) {
    if (this.checkStrLength(nameNum, 2, 6)) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.LENTHLIMIT);
      return false;
    }

    return true;
  },
  // emoji屏蔽昵称
  checkEmoji: function checkEmoji(nameNum) {
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    if (regStr.test(nameNum)) return true;
    return false;
  },
  editNickSure_cb: function editNickSure_cb() {
    var _this = this;

    var nickname = this.edit_nickname.string;

    if (nickname.length == 0) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.EMPTYNICK);
      return;
    }

    if (this.checkEmoji(nickname)) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.NICKNAMEERROR);
      return;
    } //if(this.checkNickName(nickname)){


    glGame.gameNet.send_msg('http.reqEditMyInfo', {
      nickname: nickname
    }, function (route, data) {
      if (data.result) {
        glGame.panel.showTip(glGame.tips.USER.EDITINFO.NICKNAME);
        glGame.user.nickname = nickname;
        glGame.emitter.emit("updateUserData");
      } else {
        glGame.panel.showTip("".concat(data));
      }

      _this.remove();
    }); //}
  },
  onEditChanged: function onEditChanged() {
    var nTextLength = 0;
    var nickName = this.edit_nickname.string;

    for (var i = 0; i < nickName.length; i++) {
      var charAt = nickName[i].charCodeAt();

      if (charAt >= 32 && charAt <= 122) {
        nTextLength++;
      } else {
        nTextLength += 2;
      }

      if (nTextLength > 12) {
        this.edit_nickname.string = nickName.substr(0, i);
        return;
      }
    }
  },
  //检查中文和英文混合的字符长度
  checkStrLength: function checkStrLength(str, min, max) {
    var mTextMaxlenght = 0;
    var arr = str.split("");

    for (var i = 0; i < arr.length; i++) {
      var charAt = arr[i].charCodeAt(); //32-122包含了空格，大小写字母，数字和一些常用的符号，
      //如果在这个范围内则算一个字符，
      //如果不在这个范围比如是汉字的话就是两个字符

      if (charAt >= 32 && charAt <= 122) {
        mTextMaxlenght++;
      } else {
        mTextMaxlenght += 2;
      }
    }

    return mTextMaxlenght < min || mTextMaxlenght > max;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xccG9wdXBzXFxlZGl0Tmlja05hbWUuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImVkaXRfbmlja25hbWUiLCJjYyIsIkVkaXRCb3giLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50IiwiT25EZXN0cm95IiwidW5SZWdpc3RlckV2ZW50Iiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xpY2tfY2xvc2UiLCJlZGl0Tmlja1N1cmVfY2IiLCJjb25zb2xlIiwiZXJyb3IiLCJyZW1vdmUiLCJjaGVja05pY2tOYW1lIiwibmFtZU51bSIsImNoZWNrU3RyTGVuZ3RoIiwicGFuZWwiLCJzaG93RXJyb3JUaXAiLCJ0aXBzIiwiVVNFUiIsIkVESVRJTkZPIiwiTEVOVEhMSU1JVCIsImNoZWNrRW1vamkiLCJyZWdTdHIiLCJ0ZXN0Iiwibmlja25hbWUiLCJzdHJpbmciLCJsZW5ndGgiLCJFTVBUWU5JQ0siLCJOSUNLTkFNRUVSUk9SIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJkYXRhIiwicmVzdWx0Iiwic2hvd1RpcCIsIk5JQ0tOQU1FIiwidXNlciIsImVtaXR0ZXIiLCJlbWl0Iiwib25FZGl0Q2hhbmdlZCIsIm5UZXh0TGVuZ3RoIiwibmlja05hbWUiLCJpIiwiY2hhckF0IiwiY2hhckNvZGVBdCIsInN1YnN0ciIsInN0ciIsIm1pbiIsIm1heCIsIm1UZXh0TWF4bGVuZ2h0IiwiYXJyIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUdBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxhQUFhLEVBQUVDLEVBQUUsQ0FBQ0M7QUFGVixHQURRO0FBS3BCQyxFQUFBQSxNQUxvQixvQkFL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LFFBQUFBLGNBQWM7QUFDakIsT0FGRCxNQUVPO0FBQ0hBLFFBQUFBLGNBQWMsSUFBSSxDQUFsQjtBQUNIO0FBQ0o7O0FBQ0QsV0FBT0EsY0FBYyxHQUFHRixHQUFqQixJQUF3QkUsY0FBYyxHQUFHRCxHQUFoRDtBQUNIO0FBbkdtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiDkv67mlLnotKblj7fnmbvpmYblr4bnoIHpnaLmnb9cclxuICovXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvL+S/ruaUueaYteensFxyXG4gICAgICAgIGVkaXRfbmlja25hbWU6IGNjLkVkaXRCb3gsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50ICgpIHtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sgKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9lZGl0Tmlja0NhbmNlbFwiOiB0aGlzLmNsaWNrX2Nsb3NlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2VkaXROaWNrU3VyZVwiOiB0aGlzLmVkaXROaWNrU3VyZV9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIC8vIOaYteensOajgOafpVxyXG4gICAgY2hlY2tOaWNrTmFtZShuYW1lTnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tTdHJMZW5ndGgobmFtZU51bSwgMiwgNikpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5VU0VSLkVESVRJTkZPLkxFTlRITElNSVQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGVtb2pp5bGP6JS95pi156ewXHJcbiAgICBjaGVja0Vtb2ppKG5hbWVOdW0pe1xyXG4gICAgICAgIHZhciByZWdTdHIgPSAvW1xcdUQ4M0N8XFx1RDgzRHxcXHVEODNFXVtcXHVEQzAwLVxcdURGRkZdW1xcdTIwMER8XFx1RkUwRl18W1xcdUQ4M0N8XFx1RDgzRHxcXHVEODNFXVtcXHVEQzAwLVxcdURGRkZdfFswLTl8KnwjXVxcdUZFMEZcXHUyMEUzfFswLTl8I11cXHUyMEUzfFtcXHUyMDNDLVxcdTMyOTldXFx1RkUwRlxcdTIwMER8W1xcdTIwM0MtXFx1MzI5OV1cXHVGRTBGfFtcXHUyMTIyLVxcdTJCNTVdfFxcdTMwM0R8W1xcQTl8XFxBRV1cXHUzMDMwfFxcdUE5fFxcdUFFfFxcdTMwMzAvZ2k7XHJcbiAgICAgICAgaWYgKHJlZ1N0ci50ZXN0KG5hbWVOdW0pKXJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdE5pY2tTdXJlX2NiKCkge1xyXG4gICAgICAgIGxldCBuaWNrbmFtZSA9IHRoaXMuZWRpdF9uaWNrbmFtZS5zdHJpbmc7XHJcbiAgICAgICAgaWYobmlja25hbWUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5VU0VSLkVESVRJTkZPLkVNUFRZTklDSyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tFbW9qaShuaWNrbmFtZSkpe1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlVTRVIuRURJVElORk8uTklDS05BTUVFUlJPUik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYodGhpcy5jaGVja05pY2tOYW1lKG5pY2tuYW1lKSl7XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLnJlcUVkaXRNeUluZm8nLCB7IG5pY2tuYW1lOiBuaWNrbmFtZSB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLlVTRVIuRURJVElORk8uTklDS05BTUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLm5pY2tuYW1lID0gbmlja25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVVzZXJEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1RpcChgJHtkYXRhfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAvL31cclxuICAgIH0sXHJcbiAgICBvbkVkaXRDaGFuZ2VkKCkge1xyXG4gICAgICAgIGxldCBuVGV4dExlbmd0aCA9IDA7XHJcbiAgICAgICAgbGV0IG5pY2tOYW1lID0gdGhpcy5lZGl0X25pY2tuYW1lLnN0cmluZztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmlja05hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJBdCA9IG5pY2tOYW1lW2ldLmNoYXJDb2RlQXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFyQXQgPj0gMzIgJiYgY2hhckF0IDw9IDEyMikge1xyXG4gICAgICAgICAgICAgICAgblRleHRMZW5ndGgrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5UZXh0TGVuZ3RoICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG5UZXh0TGVuZ3RoID4gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdF9uaWNrbmFtZS5zdHJpbmcgPSBuaWNrTmFtZS5zdWJzdHIoMCwgaSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/mo4Dmn6XkuK3mloflkozoi7Hmlofmt7flkIjnmoTlrZfnrKbplb/luqZcclxuICAgIGNoZWNrU3RyTGVuZ3RoKHN0ciwgbWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgbVRleHRNYXhsZW5naHQgPSAwO1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJBdCA9IGFycltpXS5jaGFyQ29kZUF0KCk7XHJcbiAgICAgICAgICAgIC8vMzItMTIy5YyF5ZCr5LqG56m65qC877yM5aSn5bCP5YaZ5a2X5q+N77yM5pWw5a2X5ZKM5LiA5Lqb5bi455So55qE56ym5Y+377yMXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5Zyo6L+Z5Liq6IyD5Zu05YaF5YiZ566X5LiA5Liq5a2X56ym77yMXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5LiN5Zyo6L+Z5Liq6IyD5Zu05q+U5aaC5piv5rGJ5a2X55qE6K+d5bCx5piv5Lik5Liq5a2X56ymXHJcbiAgICAgICAgICAgIGlmIChjaGFyQXQgPj0gMzIgJiYgY2hhckF0IDw9IDEyMikge1xyXG4gICAgICAgICAgICAgICAgbVRleHRNYXhsZW5naHQrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1UZXh0TWF4bGVuZ2h0ICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1UZXh0TWF4bGVuZ2h0IDwgbWluIHx8IG1UZXh0TWF4bGVuZ2h0ID4gbWF4XHJcbiAgICB9LFxyXG59KTsiXX0=
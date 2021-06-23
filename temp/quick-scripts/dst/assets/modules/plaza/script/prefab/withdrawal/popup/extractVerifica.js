
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/popup/extractVerifica.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3117G6pIlIQ5ceUvcxvQCX', 'extractVerifica');
// modules/plaza/script/prefab/withdrawal/popup/extractVerifica.js

"use strict";

glGame.baseclass.extend({
  properties: {
    phoneNumber: cc.Label,
    extracttip: cc.RichText,
    btn_sendCode: cc.Node,
    verificaCode: cc.EditBox
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.VerificaCD = 60;
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
  },
  initData: function initData(phoneNumber, coin) {
    var Number_str = phoneNumber.toString();
    this.phoneNumber.string = Number_str.replace(Number_str.substring(3, 7), "****");
    this.coin = coin;
    this.extracttip.string = "\u662F\u5426\u786E\u5B9A\u7ACB\u5373\u63D0\u73B0".concat(coin, "\u91D1\u5E01\uFF1F");
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sendCode":
        this.sendCode();
        break;

      case "btn_sure":
        this.sure();
        break;
    }
  },
  //设置60秒倒计时
  setCutDown: function setCutDown() {
    var _this = this;

    this.btn_sendCode.getComponent(cc.Button).interactable = false;
    this.btn_sendCode.getChildByName("time").active = true;
    this.btn_sendCode.getChildByName("tip").active = false;
    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      _this.VerificaCD--;
      _this.btn_sendCode.getChildByName("time").getComponent(cc.Label).string = "".concat(_this.VerificaCD, "\u79D2");

      if (_this.VerificaCD == 0) {
        _this.node.stopAllActions();

        _this.VerificaCD = 60;
        _this.btn_sendCode.getChildByName("time").active = false;
        _this.btn_sendCode.getChildByName("tip").active = true;
        _this.btn_sendCode.getComponent(cc.Button).interactable = true;
      }
    }))));
  },
  sendCode: function sendCode() {
    var _this2 = this;

    if (this.VerificaCD != 60) return;
    glGame.gameNet.send_msg("http.reqWithdrawPhone", null, function (route, data) {
      if (!data.result) {
        glGame.panel.showTip("验证码发送失败");
        return;
      }

      glGame.panel.showTip("验证码发送成功");

      _this2.setCutDown();

      if (data && data.code) {
        console.log("是否有验证码", data.code);
      }
    });
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  sure: function sure() {
    if (this.verificaCode.string == "") return glGame.panel.showErrorTip(glGame.tips.COMMON.CODE_NULL);
    glGame.user.reqWithdraw(Number(this.coin), this.type, this.verificaCode.string);
  },
  set: function set(key, value) {
    this[key] = value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFxwb3B1cFxcZXh0cmFjdFZlcmlmaWNhLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJwaG9uZU51bWJlciIsImNjIiwiTGFiZWwiLCJleHRyYWN0dGlwIiwiUmljaFRleHQiLCJidG5fc2VuZENvZGUiLCJOb2RlIiwidmVyaWZpY2FDb2RlIiwiRWRpdEJveCIsIm9uTG9hZCIsIlZlcmlmaWNhQ0QiLCJlbWl0dGVyIiwib24iLCJ3aXRoZHJhd1N1Y2Nlc3MiLCJpbml0RGF0YSIsImNvaW4iLCJOdW1iZXJfc3RyIiwidG9TdHJpbmciLCJzdHJpbmciLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwicmVtb3ZlIiwic2VuZENvZGUiLCJzdXJlIiwic2V0Q3V0RG93biIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwicnVuQWN0aW9uIiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJzdG9wQWxsQWN0aW9ucyIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJvdXRlIiwiZGF0YSIsInJlc3VsdCIsInBhbmVsIiwic2hvd1RpcCIsImNvZGUiLCJjb25zb2xlIiwibG9nIiwic2hvd0Vycm9yVGlwIiwidGlwcyIsIkNPTU1PTiIsIkNPREVfTlVMTCIsInVzZXIiLCJyZXFXaXRoZHJhdyIsIk51bWJlciIsInR5cGUiLCJzZXQiLCJrZXkiLCJ2YWx1ZSIsIk9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFB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VyxFQXdFSjtBQUNaLFNBQUtELEdBQUwsSUFBWUMsS0FBWjtBQUNILEdBMUVtQjtBQTJFcEJDLEVBQUFBLFNBM0VvQix1QkEyRVQ7QUFDUGhFLElBQUFBLE1BQU0sQ0FBQ2UsT0FBUCxDQUFla0QsR0FBZixDQUFtQixpQkFBbkIsRUFBcUMsSUFBckM7QUFDSCxHQTdFbUIsQ0E4RXBCOztBQTlFb0IsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBob25lTnVtYmVyOiBjYy5MYWJlbCxcclxuICAgICAgICBleHRyYWN0dGlwOiBjYy5SaWNoVGV4dCxcclxuICAgICAgICBidG5fc2VuZENvZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgdmVyaWZpY2FDb2RlOmNjLkVkaXRCb3gsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHsgXHJcbiAgICAgICAgdGhpcy5WZXJpZmljYUNEID0gNjA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ3aXRoZHJhd1N1Y2Nlc3NcIiwgdGhpcy53aXRoZHJhd1N1Y2Nlc3MsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGluaXREYXRhKHBob25lTnVtYmVyLCBjb2luKSB7XHJcbiAgICAgICAgbGV0IE51bWJlcl9zdHIgPSBwaG9uZU51bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIuc3RyaW5nID0gTnVtYmVyX3N0ci5yZXBsYWNlKE51bWJlcl9zdHIuc3Vic3RyaW5nKDMsIDcpLCBcIioqKipcIik7XHJcbiAgICAgICAgdGhpcy5jb2luID0gY29pblxyXG4gICAgICAgIHRoaXMuZXh0cmFjdHRpcC5zdHJpbmcgPSBg5piv5ZCm56Gu5a6a56uL5Y2z5o+Q546wJHtjb2lufemHkeW4ge+8n2BcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLnJlbW92ZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zZW5kQ29kZVwiOiB0aGlzLnNlbmRDb2RlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3N1cmVcIjogdGhpcy5zdXJlKCk7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iuvue9rjYw56eS5YCS6K6h5pe2XHJcbiAgICBzZXRDdXREb3duKCkge1xyXG4gICAgICAgIHRoaXMuYnRuX3NlbmRDb2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYnRuX3NlbmRDb2RlLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuX3NlbmRDb2RlLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlZlcmlmaWNhQ0QtLVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5fc2VuZENvZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGhpcy5WZXJpZmljYUNEfeenkmA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5WZXJpZmljYUNEID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlZlcmlmaWNhQ0QgPSA2MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9zZW5kQ29kZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fc2VuZENvZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9zZW5kQ29kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuICAgIHNlbmRDb2RlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuVmVyaWZpY2FDRCE9NjApcmV0dXJuXHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcVdpdGhkcmF3UGhvbmVcIiwgbnVsbCwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi6aqM6K+B56CB5Y+R6YCB5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi6aqM6K+B56CB5Y+R6YCB5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1dERvd24oKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaYr+WQpuaciemqjOivgeeggVwiLCBkYXRhLmNvZGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICB3aXRoZHJhd1N1Y2Nlc3MoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIHN1cmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmVyaWZpY2FDb2RlLnN0cmluZyA9PSBcIlwiKXJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLkNPTU1PTi5DT0RFX05VTEwpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcVdpdGhkcmF3KE51bWJlcih0aGlzLmNvaW4pLCB0aGlzLnR5cGUsIHRoaXMudmVyaWZpY2FDb2RlLnN0cmluZyk7XHJcbiAgICB9LFxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKXtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ3aXRoZHJhd1N1Y2Nlc3NcIix0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
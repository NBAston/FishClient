
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/popup/extractpass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b6313Vr+LdAIYdlHJGtU/AP', 'extractpass');
// modules/plaza/script/prefab/withdrawal/popup/extractpass.js

"use strict";

glGame.baseclass.extend({
  properties: {
    password: cc.EditBox,
    tips: cc.Node
  },
  onLoad: function onLoad() {
    glGame.emitter.on("withdrawSuccess", this.withdrawSuccess, this);
    this.type = 0;
    this.coin = 0;
    this.cashPwdMode = 0;
  },
  initView: function initView(t, m, c) {
    this.type = t;
    this.coin = m;
    this.cashPwdMode = c;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_sure":
        this.sure();
        break;

      case "forgetpass":
        this.forgetpass();
        break;

      case "btn_callSevice":
        this.callSevice();
        break;
    }
  },
  withdrawSuccess: function withdrawSuccess() {
    this.remove();
  },
  sure: function sure() {
    if (this.password.string == "") {
      return glGame.panel.showTip('请填写取现密码');
    }

    glGame.user.reqWithdraw(Number(this.coin), this.type, this.password.string);
  },
  forgetpass: function forgetpass() {
    if (this.cashPwdMode == 1) {
      return glGame.user.get("phone") == 0 ? glGame.panel.showPanelByName("bindPhone") : glGame.panel.showPanelByName("modifyPass");
    } else {
      this.tips.active = true;
    }
  },
  callSevice: function callSevice() {
    this.remove();
    glGame.panel.showService();
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("withdrawSuccess", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFxwb3B1cFxcZXh0cmFjdHBhc3MuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInBhc3N3b3JkIiwiY2MiLCJFZGl0Qm94IiwidGlwcyIsIk5vZGUiLCJvbkxvYWQiLCJlbWl0dGVyIiwib24iLCJ3aXRoZHJhd1N1Y2Nlc3MiLCJ0eXBlIiwiY29pbiIsImNhc2hQd2RNb2RlIiwiaW5pdFZpZXciLCJ0IiwibSIsImMiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJyZW1vdmUiLCJzdXJlIiwiZm9yZ2V0cGFzcyIsImNhbGxTZXZpY2UiLCJzdHJpbmciLCJwYW5lbCIsInNob3dUaXAiLCJ1c2VyIiwicmVxV2l0aGRyYXciLCJOdW1iZXIiLCJnZXQiLCJzaG93UGFuZWxCeU5hbWUiLCJhY3RpdmUiLCJzaG93U2VydmljZSIsIk9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUMsRUFBRSxDQUFDQyxPQURMO0FBRVJDLElBQUFBLElBQUksRUFBRUYsRUFBRSxDQUFDRztBQUZELEdBRlE7QUFNcEJDLEVBQUFBLE1BTm9CLG9CQU1YO0FBQ0xULElBQUFBLE1BQU0sQ0FBQ1UsT0FBUCxDQUFlQyxFQUFmLENBQWtCLGlCQUFsQixFQUFxQyxLQUFLQyxlQUExQyxFQUEyRCxJQUEzRDtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0gsR0FYbUI7QUFZcEJDLEVBQUFBLFFBWm9CLG9CQVlYQyxDQVpXLEVBWVJDLENBWlEsRUFZTEMsQ0FaSyxFQVlGO0FBQ2QsU0FBS04sSUFBTCxHQUFZSSxDQUFaO0FBQ0EsU0FBS0gsSUFBTCxHQUFZSSxDQUFaO0FBQ0EsU0FBS0gsV0FBTCxHQUFtQkksQ0FBbkI7QUFDSCxHQWhCbUI7QUFpQnBCQyxFQUFBQSxPQWpCb0IsbUJBaUJaQyxJQWpCWSxFQWlCTkMsSUFqQk0sRUFpQkE7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssV0FBTDtBQUFrQixhQUFLRSxNQUFMO0FBQWU7O0FBQ2pDLFdBQUssVUFBTDtBQUFpQixhQUFLQyxJQUFMO0FBQWE7O0FBQzlCLFdBQUssWUFBTDtBQUFtQixhQUFLQyxVQUFMO0FBQW1COztBQUN0QyxXQUFLLGdCQUFMO0FBQXVCLGFBQUtDLFVBQUw7QUFBbUI7QUFKOUM7QUFNSCxHQXhCbUI7QUF5QnBCZCxFQUFBQSxlQXpCb0IsNkJBeUJGO0FBQ2QsU0FBS1csTUFBTDtBQUNILEdBM0JtQjtBQTRCcEJDLEVBQUFBLElBNUJvQixrQkE0QmI7QUFDSCxRQUFJLEtBQUtwQixRQUFMLENBQWN1QixNQUFkLElBQXdCLEVBQTVCLEVBQWdDO0FBQzVCLGFBQU8zQixNQUFNLENBQUM0QixLQUFQLENBQWFDLE9BQWIsQ0FBcUIsU0FBckIsQ0FBUDtBQUNIOztBQUNEN0IsSUFBQUEsTUFBTSxDQUFDOEIsSUFBUCxDQUFZQyxXQUFaLENBQXdCQyxNQUFNLENBQUMsS0FBS2xCLElBQU4sQ0FBOUIsRUFBMkMsS0FBS0QsSUFBaEQsRUFBc0QsS0FBS1QsUUFBTCxDQUFjdUIsTUFBcEU7QUFDSCxHQWpDbUI7QUFrQ3BCRixFQUFBQSxVQWxDb0Isd0JBa0NQO0FBQ1QsUUFBSSxLQUFLVixXQUFMLElBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLGFBQU9mLE1BQU0sQ0FBQzhCLElBQVAsQ0FBWUcsR0FBWixDQUFnQixPQUFoQixLQUE0QixDQUE1QixHQUFnQ2pDLE1BQU0sQ0FBQzRCLEtBQVAsQ0FBYU0sZUFBYixDQUE2QixXQUE3QixDQUFoQyxHQUE0RWxDLE1BQU0sQ0FBQzRCLEtBQVAsQ0FBYU0sZUFBYixDQUE2QixZQUE3QixDQUFuRjtBQUNILEtBRkQsTUFFTztBQUNILFdBQUszQixJQUFMLENBQVU0QixNQUFWLEdBQW1CLElBQW5CO0FBQ0g7QUFDSixHQXhDbUI7QUF5Q3BCVCxFQUFBQSxVQXpDb0Isd0JBeUNQO0FBQ1QsU0FBS0gsTUFBTDtBQUNBdkIsSUFBQUEsTUFBTSxDQUFDNEIsS0FBUCxDQUFhUSxXQUFiO0FBQ0gsR0E1Q21CO0FBNkNwQkMsRUFBQUEsU0E3Q29CLHVCQTZDUjtBQUNSckMsSUFBQUEsTUFBTSxDQUFDVSxPQUFQLENBQWU0QixHQUFmLENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QztBQUNIO0FBL0NtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGFzc3dvcmQ6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgdGlwczogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ3aXRoZHJhd1N1Y2Nlc3NcIiwgdGhpcy53aXRoZHJhd1N1Y2Nlc3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jb2luID0gMDtcclxuICAgICAgICB0aGlzLmNhc2hQd2RNb2RlID0gMDtcclxuICAgIH0sXHJcbiAgICBpbml0Vmlldyh0LCBtLCBjKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdDtcclxuICAgICAgICB0aGlzLmNvaW4gPSBtO1xyXG4gICAgICAgIHRoaXMuY2FzaFB3ZE1vZGUgPSBjO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMucmVtb3ZlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3N1cmVcIjogdGhpcy5zdXJlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZm9yZ2V0cGFzc1wiOiB0aGlzLmZvcmdldHBhc3MoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2FsbFNldmljZVwiOiB0aGlzLmNhbGxTZXZpY2UoKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdpdGhkcmF3U3VjY2VzcygpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIHN1cmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmQuc3RyaW5nID09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93VGlwKCfor7floavlhpnlj5bnjrDlr4bnoIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIucmVxV2l0aGRyYXcoTnVtYmVyKHRoaXMuY29pbiksIHRoaXMudHlwZSwgdGhpcy5wYXNzd29yZC5zdHJpbmcpO1xyXG4gICAgfSxcclxuICAgIGZvcmdldHBhc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FzaFB3ZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnVzZXIuZ2V0KFwicGhvbmVcIikgPT0gMCA/IGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJiaW5kUGhvbmVcIikgOiBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwibW9kaWZ5UGFzc1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRpcHMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FsbFNldmljZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ3aXRoZHJhd1N1Y2Nlc3NcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==
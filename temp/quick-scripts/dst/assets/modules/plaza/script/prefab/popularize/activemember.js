
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/activemember.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51aaf4pFbNJNaPN2weMwSpH', 'activemember');
// modules/plaza/script/prefab/popularize/activemember.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    effectiveItem: cc.Node,
    Lab_condition: cc.RichText,
    effectivemember: cc.Label,
    achiveData: cc.Label
  },
  onLoad: function onLoad() {
    this.ReqPlayerExtensionCountlessReward();
  },
  ReqPlayerExtensionCountlessReward: function ReqPlayerExtensionCountlessReward() {
    var _this = this;

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessReward', {}, function (route, msg) {
      _this.TaskData = msg;
      var str = _this.TaskData.recharge == 0 ? "\u60A8\u7684\u4E0B\u7EA7\u65E0\u6761\u4EF6\u6210\u4E3A\u56E2\u961F\u6709\u6548\u6210\u5458" : "\u5B58\u6B3E\u91D1\u989D\u8FBE\u5230 <color=#f4c404>".concat(_this.getFloat(_this.TaskData.recharge), "</color> \u5143\uFF0C\u6253\u7801\u91CF\u8FBE\u5230 <color=#f4c404>").concat(_this.getFloat(_this.TaskData.bet), "</color> \u5143");
      _this.Lab_condition.string = str;
      _this.effectivemember.string = _this.TaskData.effective_number;
      _this.achiveData.string = "\u4EE5\u4E0A\u5956\u52B1\uFF0C\u53EA\u9700\u8981\u6253\u7801\u91CF\u8FBE\u5230".concat(_this.TaskData.audit, "\u500D\u5373\u53EF\u63D0\u73B0");

      _this.setTable(msg.list);

      console.log("这是任务列表的消息", msg);
    });
  },
  ReqPlayerExtensionCountlessRewardApply: function ReqPlayerExtensionCountlessRewardApply(id) {},
  setTable: function setTable(data) {
    for (var i = 0; i < data.length; i++) {
      var effectiveItem = cc.instantiate(this.effectiveItem);
      effectiveItem.parent = this.content;
      effectiveItem.active = false;
      var strTip = "\u76F4\u5C5E\u4E0B\u7EA7\u6709\u6548\u6210\u5458\u8FBE <color=#f4c404>".concat(data[i].number, "</color> \u4EBA");
      effectiveItem.getChildByName("Lab_condition").getComponent(cc.RichText).string = strTip;
      var Count = 0;

      for (var j = i; j >= 0; j--) {
        Count += data[j].reward;
      }

      var strReward = "\u989D\u5916\u5956\u52B1 <color=#f4c404>".concat(this.getFloat(data[i].reward), "</color> \u5143(\u7D2F\u79EF <color=#f4c404>").concat(this.getFloat(Count), "</color> \u5143)");
      effectiveItem.getChildByName("Lab_reward").getComponent(cc.RichText).string = strReward;
      effectiveItem.getChildByName("Havereceived").active = data[i].state == 0;

      if (data[i].state == 2) {
        effectiveItem.getChildByName("needpeople").active = true;
        effectiveItem.getChildByName("needpeople").getComponent(cc.Label).string = "\u5DEE".concat(data[i].number - this.TaskData.effective_number, "\u4EBA");
      }

      effectiveItem.getChildByName("btn_received").active = data[i].state == 1;
      effectiveItem.getChildByName("bg").active = i % 2 == 1;
      effectiveItem.name = "".concat(i);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_received":
        this.btn_receivedCB(node);
        break;

      default:
        break;
    }
  },
  btn_receivedCB: function btn_receivedCB(node) {
    var _this2 = this;

    var id = this.TaskData.list[node.parent.name].id;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRewardApply', {
      id: id
    }, function (route, msg) {
      node.parent.getChildByName("Havereceived").active = true;
      node.active = false;
      var strTitle = glGame.tips.POPULARIZE.GETMEMBERPRIZE;
      glGame.panel.showAwardBox(strTitle, [{
        type: glGame.awardtype.COIN,
        value: _this2.getFloat(_this2.TaskData.list[node.parent.name].reward)
      }]);
      _this2.TaskData.list[node.parent.name].state = 3;

      _this2.isCloseRed();

      glGame.user.ReqRedDot();
      glGame.user.reqGetCoin();
    });
  },
  isCloseRed: function isCloseRed() {
    var data = this.TaskData.list;

    for (var i = 0; i < data.length; i++) {
      if (data[i].state == 1) {
        return;
      }
    }

    glGame.emitter.emit("activeRedclose");
  },
  initUI: function initUI(data) {
    console.log("这是本条数据的显示", data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxhY3RpdmVtZW1iZXIuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJjYyIsIk5vZGUiLCJlZmZlY3RpdmVJdGVtIiwiTGFiX2NvbmRpdGlvbiIsIlJpY2hUZXh0IiwiZWZmZWN0aXZlbWVtYmVyIiwiTGFiZWwiLCJhY2hpdmVEYXRhIiwib25Mb2FkIiwiUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmV3YXJkIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJtc2ciLCJUYXNrRGF0YSIsInN0ciIsInJlY2hhcmdlIiwiZ2V0RmxvYXQiLCJiZXQiLCJzdHJpbmciLCJlZmZlY3RpdmVfbnVtYmVyIiwiYXVkaXQiLCJzZXRUYWJsZSIsImxpc3QiLCJjb25zb2xlIiwibG9nIiwiUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmV3YXJkQXBwbHkiLCJpZCIsImRhdGEiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJhY3RpdmUiLCJzdHJUaXAiLCJudW1iZXIiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkNvdW50IiwiaiIsInJld2FyZCIsInN0clJld2FyZCIsInN0YXRlIiwibmFtZSIsInBhbmVsIiwic2hvd0VmZmVjdE5vZGUiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwib25DbGljayIsIm5vZGUiLCJyZW1vdmUiLCJidG5fcmVjZWl2ZWRDQiIsInN0clRpdGxlIiwidGlwcyIsIlBPUFVMQVJJWkUiLCJHRVRNRU1CRVJQUklaRSIsInNob3dBd2FyZEJveCIsInR5cGUiLCJhd2FyZHR5cGUiLCJDT0lOIiwiaXNDbG9zZVJlZCIsInVzZXIiLCJSZXFSZWREb3QiLCJyZXFHZXRDb2luIiwiZW1pdHRlciIsImVtaXQiLCJpbml0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ekI7QUFBK0JmLFFBQUFBLEtBQUssRUFBRSxNQUFJLENBQUM3QixRQUFMLENBQWMsTUFBSSxDQUFDSCxRQUFMLENBQWNTLElBQWQsQ0FBbUI0QixJQUFJLENBQUNuQixNQUFMLENBQVlXLElBQS9CLEVBQXFDSCxNQUFuRDtBQUF0QyxPQUFELENBQXBDO0FBQ0EsTUFBQSxNQUFJLENBQUMxQixRQUFMLENBQWNTLElBQWQsQ0FBbUI0QixJQUFJLENBQUNuQixNQUFMLENBQVlXLElBQS9CLEVBQXFDRCxLQUFyQyxHQUE2QyxDQUE3Qzs7QUFDQSxNQUFBLE1BQUksQ0FBQ29CLFVBQUw7O0FBQ0FuRSxNQUFBQSxNQUFNLENBQUNvRSxJQUFQLENBQVlDLFNBQVo7QUFDQXJFLE1BQUFBLE1BQU0sQ0FBQ29FLElBQVAsQ0FBWUUsVUFBWjtBQUNILEtBVEQ7QUFVSCxHQTNFbUI7QUE0RXBCSCxFQUFBQSxVQTVFb0Isd0JBNEVQO0FBQ1QsUUFBSWxDLElBQUksR0FBRyxLQUFLZCxRQUFMLENBQWNTLElBQXpCOztBQUNBLFNBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsSUFBSSxDQUFDRSxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxVQUFHRCxJQUFJLENBQUNDLENBQUQsQ0FBSixDQUFRYSxLQUFSLElBQWlCLENBQXBCLEVBQXNCO0FBQ2xCO0FBQ0g7QUFDSjs7QUFDRC9DLElBQUFBLE1BQU0sQ0FBQ3VFLE9BQVAsQ0FBZUMsSUFBZixDQUFvQixnQkFBcEI7QUFDSCxHQXBGbUI7QUFxRnBCQyxFQUFBQSxNQXJGb0Isa0JBcUZieEMsSUFyRmEsRUFxRlA7QUFDVEosSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkcsSUFBekI7QUFDSDtBQXZGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBlZmZlY3RpdmVJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIExhYl9jb25kaXRpb246IGNjLlJpY2hUZXh0LFxyXG4gICAgICAgIGVmZmVjdGl2ZW1lbWJlcjogY2MuTGFiZWwsXHJcbiAgICAgICAgYWNoaXZlRGF0YTogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc1Jld2FyZCgpO1xyXG4gICAgfSxcclxuICAgIFJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc1Jld2FyZCgpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZXdhcmQnLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5UYXNrRGF0YSA9IG1zZztcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHRoaXMuVGFza0RhdGEucmVjaGFyZ2UgPT0gMCA/IGDmgqjnmoTkuIvnuqfml6DmnaHku7bmiJDkuLrlm6LpmJ/mnInmlYjmiJDlkZhgIDogYOWtmOasvumHkeminei+vuWIsCA8Y29sb3I9I2Y0YzQwND4ke3RoaXMuZ2V0RmxvYXQodGhpcy5UYXNrRGF0YS5yZWNoYXJnZSl9PC9jb2xvcj4g5YWD77yM5omT56CB6YeP6L6+5YiwIDxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXRGbG9hdCh0aGlzLlRhc2tEYXRhLmJldCl9PC9jb2xvcj4g5YWDYFxyXG4gICAgICAgICAgICB0aGlzLkxhYl9jb25kaXRpb24uc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdGl2ZW1lbWJlci5zdHJpbmcgPSB0aGlzLlRhc2tEYXRhLmVmZmVjdGl2ZV9udW1iZXI7XHJcbiAgICAgICAgICAgIHRoaXMuYWNoaXZlRGF0YS5zdHJpbmcgPSBg5Lul5LiK5aWW5Yqx77yM5Y+q6ZyA6KaB5omT56CB6YeP6L6+5YiwJHt0aGlzLlRhc2tEYXRhLmF1ZGl0feWAjeWNs+WPr+aPkOeOsGBcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZShtc2cubGlzdClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/ku7vliqHliJfooajnmoTmtojmga9cIiwgbXNnKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmV3YXJkQXBwbHkoaWQpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgc2V0VGFibGUoZGF0YSkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVmZmVjdGl2ZUl0ZW0pO1xyXG4gICAgICAgICAgICBlZmZlY3RpdmVJdGVtLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgZWZmZWN0aXZlSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHN0clRpcCA9IGDnm7TlsZ7kuIvnuqfmnInmlYjmiJDlkZjovr4gPGNvbG9yPSNmNGM0MDQ+JHtkYXRhW2ldLm51bWJlcn08L2NvbG9yPiDkurpgXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJMYWJfY29uZGl0aW9uXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gc3RyVGlwO1xyXG4gICAgICAgICAgICBsZXQgQ291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgIENvdW50ICs9IGRhdGFbal0ucmV3YXJkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0clJld2FyZCA9IGDpop3lpJblpZblirEgPGNvbG9yPSNmNGM0MDQ+JHt0aGlzLmdldEZsb2F0KGRhdGFbaV0ucmV3YXJkKX08L2NvbG9yPiDlhYMo57Sv56evIDxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXRGbG9hdChDb3VudCl9PC9jb2xvcj4g5YWDKWBcclxuICAgICAgICAgICAgZWZmZWN0aXZlSXRlbS5nZXRDaGlsZEJ5TmFtZShcIkxhYl9yZXdhcmRcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBzdHJSZXdhcmQ7XHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJIYXZlcmVjZWl2ZWRcIikuYWN0aXZlID0gZGF0YVtpXS5zdGF0ZSA9PSAwO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RpdmVJdGVtLmdldENoaWxkQnlOYW1lKFwibmVlZHBlb3BsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0aXZlSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5lZWRwZW9wbGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5beuJHtkYXRhW2ldLm51bWJlciAtIHRoaXMuVGFza0RhdGEuZWZmZWN0aXZlX251bWJlcn3kurpgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWZmZWN0aXZlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9yZWNlaXZlZFwiKS5hY3RpdmUgPSBkYXRhW2ldLnN0YXRlID09IDE7XHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBpICUgMiA9PSAxO1xyXG4gICAgICAgICAgICBlZmZlY3RpdmVJdGVtLm5hbWUgPSBgJHtpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuY29udGVudCwwLjAyLHRydWUpO1xyXG4gICAgfSxcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMucmVtb3ZlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY2VpdmVkXCI6IHRoaXMuYnRuX3JlY2VpdmVkQ0Iobm9kZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJ0bl9yZWNlaXZlZENCKG5vZGUpIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLlRhc2tEYXRhLmxpc3Rbbm9kZS5wYXJlbnQubmFtZV0uaWRcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZXdhcmRBcHBseScsIHsgaWQ6IGlkIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiSGF2ZXJlY2VpdmVkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzdHJUaXRsZSA9IGdsR2FtZS50aXBzLlBPUFVMQVJJWkUuR0VUTUVNQkVSUFJJWkU7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93QXdhcmRCb3goc3RyVGl0bGUsIFt7IHR5cGU6IGdsR2FtZS5hd2FyZHR5cGUuQ09JTiwgdmFsdWU6IHRoaXMuZ2V0RmxvYXQodGhpcy5UYXNrRGF0YS5saXN0W25vZGUucGFyZW50Lm5hbWVdLnJld2FyZCl9XSk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFza0RhdGEubGlzdFtub2RlLnBhcmVudC5uYW1lXS5zdGF0ZSA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDbG9zZVJlZCgpO1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxR2V0Q29pbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaXNDbG9zZVJlZCgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuVGFza0RhdGEubGlzdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoZGF0YVtpXS5zdGF0ZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJhY3RpdmVSZWRjbG9zZVwiKTtcclxuICAgIH0sXHJcbiAgICBpbml0VUkoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5pys5p2h5pWw5o2u55qE5pi+56S6XCIsIGRhdGEpXHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
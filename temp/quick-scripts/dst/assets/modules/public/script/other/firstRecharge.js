
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/other/firstRecharge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dadc8QlhQxG/KKVMgDwmxqO', 'firstRecharge');
// modules/public/script/other/firstRecharge.js

"use strict";

glGame.baseclass.extend({
  properties: {
    audio: {
      type: cc.AudioClip,
      "default": null
    },
    lblRebate: cc.Label,
    lblCoin: cc.Label
  },
  onLoad: function onLoad() {
    this.node.scale = glGame.systemclass.convertInterface();
    glGame.audio.closeCurEffect();
    glGame.audio.playSoundEffect(this.audio, true);
    var userRecharge = glGame.user.get("userRecharge");
    var discount_mode = userRecharge.discount_mode;

    if (discount_mode == 0) {
      discount_mode = 2;
    }

    this.node.getChildByName("btn_querenxiugai").active = true;
    this.node.getChildByName("btn_querenxiugai2").active = false; // 奖励模式 1:比例 2:固定

    if (discount_mode == 2) {
      this.lblRebate.string = userRecharge.discount / 100;
      this.hideDiscountMax();
    } else {
      this.lblRebate.string = userRecharge.discount / 100 + '%';
      this.lblCoin.string = userRecharge.discount_max / 100; // 无上限

      if (userRecharge.discount_max == -1) {
        this.hideDiscountMax();
      }
    }
  },
  // 隐藏最高上限
  hideDiscountMax: function hideDiscountMax() {
    this.node.getChildByName("node2").active = false;
    this.node.getChildByName("btn_querenxiugai").active = false;
    this.node.getChildByName("btn_querenxiugai2").active = true;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close_eff":
        this.click_close();
        break;

      case "btn_querenxiugai":
        this.click_close();
        break;

      case "btn_querenxiugai2":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_showShop: function click_showShop() {
    glGame.panel.firstShowShop(this.node.zIndex);
    this.click_close();
  },
  click_close: function click_close() {
    this.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG90aGVyXFxmaXJzdFJlY2hhcmdlLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJhdWRpbyIsInR5cGUiLCJjYyIsIkF1ZGlvQ2xpcCIsImxibFJlYmF0ZSIsIkxhYmVsIiwibGJsQ29pbiIsIm9uTG9hZCIsIm5vZGUiLCJzY2FsZSIsInN5c3RlbWNsYXNzIiwiY29udmVydEludGVyZmFjZSIsImNsb3NlQ3VyRWZmZWN0IiwicGxheVNvdW5kRWZmZWN0IiwidXNlclJlY2hhcmdlIiwidXNlciIsImdldCIsImRpc2NvdW50X21vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsInN0cmluZyIsImRpc2NvdW50IiwiaGlkZURpc2NvdW50TWF4IiwiZGlzY291bnRfbWF4Iiwib25DbGljayIsIm5hbWUiLCJjbGlja19jbG9zZSIsImNvbnNvbGUiLCJlcnJvciIsImNsaWNrX3Nob3dTaG9wIiwicGFuZWwiLCJmaXJzdFNob3dTaG9wIiwiekluZGV4IiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDO0FBQ0ZDLE1BQUFBLElBQUksRUFBQ0MsRUFBRSxDQUFDQyxTQUROO0FBRUYsaUJBQVM7QUFGUCxLQURFO0FBS1JDLElBQUFBLFNBQVMsRUFBRUYsRUFBRSxDQUFDRyxLQUxOO0FBTVJDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDRztBQU5KLEdBRFE7QUFTcEJFLEVBQUFBLE1BVG9CLG9CQVNYO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxLQUFWLEdBQWtCYixNQUFNLENBQUNjLFdBQVAsQ0FBbUJDLGdCQUFuQixFQUFsQjtBQUNBZixJQUFBQSxNQUFNLENBQUNJLEtBQVAsQ0FBYVksY0FBYjtBQUNBaEIsSUFBQUEsTUFBTSxDQUFDSSxLQUFQLENBQWFhLGVBQWIsQ0FBNkIsS0FBS2IsS0FBbEMsRUFBd0MsSUFBeEM7QUFDQSxRQUFJYyxZQUFZLEdBQUdsQixNQUFNLENBQUNtQixJQUFQLENBQVlDLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBbkI7QUFDQSxRQUFJQyxhQUFhLEdBQUdILFlBQVksQ0FBQ0csYUFBakM7O0FBQ0EsUUFBR0EsYUFBYSxJQUFJLENBQXBCLEVBQXVCO0FBQ25CQSxNQUFBQSxhQUFhLEdBQUcsQ0FBaEI7QUFDSDs7QUFFRCxTQUFLVCxJQUFMLENBQVVVLGNBQVYsQ0FBeUIsa0JBQXpCLEVBQTZDQyxNQUE3QyxHQUFzRCxJQUF0RDtBQUNBLFNBQUtYLElBQUwsQ0FBVVUsY0FBVixDQUF5QixtQkFBekIsRUFBOENDLE1BQTlDLEdBQXVELEtBQXZELENBWEssQ0FZTDs7QUFDQSxRQUFHRixhQUFhLElBQUksQ0FBcEIsRUFBdUI7QUFDbkIsV0FBS2IsU0FBTCxDQUFlZ0IsTUFBZixHQUF5Qk4sWUFBWSxDQUFDTyxRQUFiLEdBQXdCLEdBQWpEO0FBQ0EsV0FBS0MsZUFBTDtBQUNILEtBSEQsTUFHTztBQUNILFdBQUtsQixTQUFMLENBQWVnQixNQUFmLEdBQXlCTixZQUFZLENBQUNPLFFBQWIsR0FBd0IsR0FBekIsR0FBZ0MsR0FBeEQ7QUFDQSxXQUFLZixPQUFMLENBQWFjLE1BQWIsR0FBdUJOLFlBQVksQ0FBQ1MsWUFBYixHQUE0QixHQUFuRCxDQUZHLENBSUg7O0FBQ0EsVUFBR1QsWUFBWSxDQUFDUyxZQUFiLElBQTZCLENBQUMsQ0FBakMsRUFBb0M7QUFDaEMsYUFBS0QsZUFBTDtBQUNIO0FBQ0o7QUFDSixHQWxDbUI7QUFvQ3BCO0FBQ0FBLEVBQUFBLGVBckNvQiw2QkFxQ0Y7QUFDZCxTQUFLZCxJQUFMLENBQVVVLGNBQVYsQ0FBeUIsT0FBekIsRUFBa0NDLE1BQWxDLEdBQTJDLEtBQTNDO0FBQ0EsU0FBS1gsSUFBTCxDQUFVVSxjQUFWLENBQXlCLGtCQUF6QixFQUE2Q0MsTUFBN0MsR0FBc0QsS0FBdEQ7QUFDQSxTQUFLWCxJQUFMLENBQVVVLGNBQVYsQ0FBeUIsbUJBQXpCLEVBQThDQyxNQUE5QyxHQUF1RCxJQUF2RDtBQUNILEdBekNtQjtBQTJDcEJLLEVBQUFBLE9BM0NvQixtQkEyQ1pDLElBM0NZLEVBMkNOakIsSUEzQ00sRUEyQ0E7QUFDaEIsWUFBUWlCLElBQVI7QUFDSSxXQUFLLFdBQUw7QUFBa0IsYUFBS0MsV0FBTDtBQUFvQjs7QUFDdEMsV0FBSyxrQkFBTDtBQUF5QixhQUFLQSxXQUFMO0FBQW9COztBQUM3QyxXQUFLLG1CQUFMO0FBQTBCLGFBQUtBLFdBQUw7QUFBb0I7O0FBQzlDO0FBQVNDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDSCxJQUEzQztBQUpiO0FBTUgsR0FsRG1CO0FBbURwQkksRUFBQUEsY0FuRG9CLDRCQW1ESDtBQUNiakMsSUFBQUEsTUFBTSxDQUFDa0MsS0FBUCxDQUFhQyxhQUFiLENBQTJCLEtBQUt2QixJQUFMLENBQVV3QixNQUFyQztBQUNBLFNBQUtOLFdBQUw7QUFDSCxHQXREbUI7QUF1RHBCQSxFQUFBQSxXQXZEb0IseUJBdUROO0FBQ1YsU0FBS08sTUFBTDtBQUNIO0FBekRtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvOntcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFJlYmF0ZTogY2MuTGFiZWwsXHJcbiAgICAgICAgbGJsQ29pbjogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IGdsR2FtZS5zeXN0ZW1jbGFzcy5jb252ZXJ0SW50ZXJmYWNlKCk7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLmNsb3NlQ3VyRWZmZWN0KCk7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlTb3VuZEVmZmVjdCh0aGlzLmF1ZGlvLHRydWUpO1xyXG4gICAgICAgIGxldCB1c2VyUmVjaGFyZ2UgPSBnbEdhbWUudXNlci5nZXQoXCJ1c2VyUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgbGV0IGRpc2NvdW50X21vZGUgPSB1c2VyUmVjaGFyZ2UuZGlzY291bnRfbW9kZTtcclxuICAgICAgICBpZihkaXNjb3VudF9tb2RlID09IDApIHtcclxuICAgICAgICAgICAgZGlzY291bnRfbW9kZSA9IDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcXVlcmVueGl1Z2FpXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3F1ZXJlbnhpdWdhaTJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5aWW5Yqx5qih5byPIDE65q+U5L6LIDI65Zu65a6aXHJcbiAgICAgICAgaWYoZGlzY291bnRfbW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsUmViYXRlLnN0cmluZyA9ICh1c2VyUmVjaGFyZ2UuZGlzY291bnQgLyAxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVEaXNjb3VudE1heCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsUmViYXRlLnN0cmluZyA9ICh1c2VyUmVjaGFyZ2UuZGlzY291bnQgLyAxMDApICsgJyUnO1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW4uc3RyaW5nID0gKHVzZXJSZWNoYXJnZS5kaXNjb3VudF9tYXggLyAxMDApO1xyXG5cclxuICAgICAgICAgICAgLy8g5peg5LiK6ZmQXHJcbiAgICAgICAgICAgIGlmKHVzZXJSZWNoYXJnZS5kaXNjb3VudF9tYXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURpc2NvdW50TWF4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmakOiXj+acgOmrmOS4iumZkFxyXG4gICAgaGlkZURpc2NvdW50TWF4KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vZGUyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9xdWVyZW54aXVnYWlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3F1ZXJlbnhpdWdhaTJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZV9lZmZcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9xdWVyZW54aXVnYWlcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9xdWVyZW54aXVnYWkyXCI6IHRoaXMuY2xpY2tfY2xvc2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbGlja19zaG93U2hvcCgpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuZmlyc3RTaG93U2hvcCh0aGlzLm5vZGUuekluZGV4KTtcclxuICAgICAgICB0aGlzLmNsaWNrX2Nsb3NlKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19
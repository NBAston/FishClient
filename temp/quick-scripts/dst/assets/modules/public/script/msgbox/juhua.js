
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/juhua.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58429PuezNNUKAS8nlSnqLh', 'juhua');
// modules/public/script/msgbox/juhua.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_juhua: cc.Node
  },
  onLoad: function onLoad() {
    this.CountTime();
  },
  CountTime: function CountTime() {
    var _this = this;

    this.beginTime = new Date().getTime();
    this.node.zIndex = 1000;
    this.node_juhua.runAction(cc.repeatForever(cc.rotateBy(1.5, 360)));
    this.node.children[0].active = false;
    this.node.children[1].active = false; //菊花必须在网络访问后 一定时间后才开启

    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
      _this.node.children[0].active = true;
      _this.node.children[1].active = true;
    })));
    this.time_max = 40;
    this.scheduleOnce(this.timeSchedule.bind(this), this.time_max);
  },
  setdisplay: function setdisplay() {
    this.node.children[0].active = true;
    this.node.children[1].active = true;
  },
  //默认关闭所有的菊花事件
  hidepic: function hidepic() {
    this.node.stopAllActions();
    this.node.children[0].active = false;
    this.node.children[1].active = false;
    this.unschedule(this.timeSchedule.bind(this));
  },
  timeSchedule: function timeSchedule() {
    if (this.node == null || this.node.runAction == null) return;
    glGame.panel.showErrorTip("网络断开连接，请重新登录！");
    this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      //清除登录缓存
      // glGame.storage.removeItemByKey("loginCache");
      // 重启游戏
      reStartGame();
    })));
  },
  OnDestroy: function OnDestroy() {
    this.unschedule(this.timeSchedule.bind(this));
  },
  set: function set() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcanVodWEuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsIm5vZGVfanVodWEiLCJjYyIsIk5vZGUiLCJvbkxvYWQiLCJDb3VudFRpbWUiLCJiZWdpblRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm5vZGUiLCJ6SW5kZXgiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwicm90YXRlQnkiLCJjaGlsZHJlbiIsImFjdGl2ZSIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJ0aW1lX21heCIsInNjaGVkdWxlT25jZSIsInRpbWVTY2hlZHVsZSIsImJpbmQiLCJzZXRkaXNwbGF5IiwiaGlkZXBpYyIsInN0b3BBbGxBY3Rpb25zIiwidW5zY2hlZHVsZSIsInBhbmVsIiwic2hvd0Vycm9yVGlwIiwicmVTdGFydEdhbWUiLCJPbkRlc3Ryb3kiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVDLEVBQUUsQ0FBQ0M7QUFEUCxHQURRO0FBSXBCQyxFQUFBQSxNQUpvQixvQkFJWDtBQUNMLFNBQUtDLFNBQUw7QUFDSCxHQU5tQjtBQU9wQkEsRUFBQUEsU0FQb0IsdUJBT1I7QUFBQTs7QUFDUixTQUFLQyxTQUFMLEdBQWtCLElBQUlDLElBQUosRUFBRCxDQUFhQyxPQUFiLEVBQWpCO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsU0FBaEIsQ0FBMEJULEVBQUUsQ0FBQ1UsYUFBSCxDQUFpQlYsRUFBRSxDQUFDVyxRQUFILENBQVksR0FBWixFQUFpQixHQUFqQixDQUFqQixDQUExQjtBQUVBLFNBQUtKLElBQUwsQ0FBVUssUUFBVixDQUFtQixDQUFuQixFQUFzQkMsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxTQUFLTixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JDLE1BQXRCLEdBQStCLEtBQS9CLENBTlEsQ0FRUjs7QUFDQSxTQUFLTixJQUFMLENBQVVFLFNBQVYsQ0FBb0JULEVBQUUsQ0FBQ2MsUUFBSCxDQUNoQmQsRUFBRSxDQUFDZSxTQUFILENBQWEsQ0FBYixDQURnQixFQUVoQmYsRUFBRSxDQUFDZ0IsUUFBSCxDQUFZLFlBQU07QUFDZCxNQUFBLEtBQUksQ0FBQ1QsSUFBTCxDQUFVSyxRQUFWLENBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixHQUErQixJQUEvQjtBQUNBLE1BQUEsS0FBSSxDQUFDTixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JDLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsS0FIRCxDQUZnQixDQUFwQjtBQU9BLFNBQUtJLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxZQUFMLENBQWtCLEtBQUtDLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCLENBQWxCLEVBQWdELEtBQUtILFFBQXJEO0FBQ0gsR0F6Qm1CO0FBMEJwQkksRUFBQUEsVUExQm9CLHdCQTBCUjtBQUNSLFNBQUtkLElBQUwsQ0FBVUssUUFBVixDQUFtQixDQUFuQixFQUFzQkMsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxTQUFLTixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JDLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsR0E3Qm1CO0FBOEJwQjtBQUNBUyxFQUFBQSxPQS9Cb0IscUJBK0JWO0FBQ04sU0FBS2YsSUFBTCxDQUFVZ0IsY0FBVjtBQUNBLFNBQUtoQixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JDLE1BQXRCLEdBQStCLEtBQS9CO0FBQ0EsU0FBS04sSUFBTCxDQUFVSyxRQUFWLENBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixHQUErQixLQUEvQjtBQUNBLFNBQUtXLFVBQUwsQ0FBZ0IsS0FBS0wsWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDSCxHQXBDbUI7QUFxQ3BCRCxFQUFBQSxZQXJDb0IsMEJBcUNMO0FBQ1gsUUFBSSxLQUFLWixJQUFMLElBQWEsSUFBYixJQUFxQixLQUFLQSxJQUFMLENBQVVFLFNBQVYsSUFBdUIsSUFBaEQsRUFBc0Q7QUFDdERkLElBQUFBLE1BQU0sQ0FBQzhCLEtBQVAsQ0FBYUMsWUFBYixDQUEwQixlQUExQjtBQUNBLFNBQUtuQixJQUFMLENBQVVFLFNBQVYsQ0FBb0JULEVBQUUsQ0FBQ2MsUUFBSCxDQUNoQmQsRUFBRSxDQUFDZSxTQUFILENBQWEsQ0FBYixDQURnQixFQUVoQmYsRUFBRSxDQUFDZ0IsUUFBSCxDQUFZLFlBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQVcsTUFBQUEsV0FBVztBQUNkLEtBTEQsQ0FGZ0IsQ0FBcEI7QUFTSCxHQWpEbUI7QUFrRHBCQyxFQUFBQSxTQWxEb0IsdUJBa0RSO0FBQ1IsU0FBS0osVUFBTCxDQUFnQixLQUFLTCxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFoQjtBQUNILEdBcERtQjtBQXFEcEJTLEVBQUFBLEdBckRvQixpQkFxRGQsQ0FBRztBQXJEVyxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vZGVfanVodWE6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuQ291bnRUaW1lKCk7XHJcbiAgICB9LFxyXG4gICAgQ291bnRUaW1lKCkge1xyXG4gICAgICAgIHRoaXMuYmVnaW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMDtcclxuICAgICAgICB0aGlzLm5vZGVfanVodWEucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS41LCAzNjApKSlcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy/oj4roirHlv4XpobvlnKjnvZHnu5zorr/pl67lkI4g5LiA5a6a5pe26Ze05ZCO5omN5byA5ZCvXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDIpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICAgICAgdGhpcy50aW1lX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMudGltZVNjaGVkdWxlLmJpbmQodGhpcyksIHRoaXMudGltZV9tYXgpO1xyXG4gICAgfSxcclxuICAgIHNldGRpc3BsYXkoKXtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvL+m7mOiupOWFs+mXreaJgOacieeahOiPiuiKseS6i+S7tlxyXG4gICAgaGlkZXBpYygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVTY2hlZHVsZS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICB0aW1lU2NoZWR1bGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSA9PSBudWxsIHx8IHRoaXMubm9kZS5ydW5BY3Rpb24gPT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChcIue9kee7nOaWreW8gOi/nuaOpe+8jOivt+mHjeaWsOeZu+W9le+8gVwiKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5riF6Zmk55m75b2V57yT5a2YXHJcbiAgICAgICAgICAgICAgICAvLyBnbEdhbWUuc3RvcmFnZS5yZW1vdmVJdGVtQnlLZXkoXCJsb2dpbkNhY2hlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN5ZCv5ri45oiPXHJcbiAgICAgICAgICAgICAgICByZVN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVTY2hlZHVsZS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICBzZXQoKSB7IH0sXHJcbn0pOyJdfQ==
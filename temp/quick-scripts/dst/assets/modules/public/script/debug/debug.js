
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/debug/debug.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3682fnhIThBvI4AEBLORSZq', 'debug');
// modules/public/script/debug/debug.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    var _this = this;

    this.node.zIndex = 1000; // 设置为常驻节点

    cc.game.addPersistRootNode(this.node);
    this.node.on("touchmove", function (event) {
      var pos = cc.director.getScene().convertToWorldSpace(event.getLocation());

      _this.node.setPosition(pos);
    }, this);
  },
  onClick: function onClick() {
    var scene = cc.director.getScene();
    if (scene.name === "start" || scene.name === "login") return;
    if (scene.name === "plaza") return glGame.panel.showDebugPanel();
    console.log("这是debug的信息", glGame.room.get("curEnterGameID"), glGame.room.get("curEnterGameRank"));

    if (scene.name === "laba") {
      glGame.gameNet.send_msg("http.ReqGetGameProfit", {
        game_id: 31,
        rank: 1
      }, function (route, data) {
        var debugPanel = glGame.panel.showDebugPanel();
        debugPanel.getComponent("debugpanel").init(data);
      });
      return;
    }

    glGame.gameNet.send_msg("http.ReqGetGameProfit", {
      game_id: glGame.room.get("curEnterGameID"),
      rank: glGame.room.get("curEnterGameRank")
    }, function (route, data) {
      var debugPanel = glGame.panel.showDebugPanel();
      debugPanel.getComponent("debugpanel").init(data);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGRlYnVnXFxkZWJ1Zy5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInpJbmRleCIsImNjIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm9uIiwiZXZlbnQiLCJwb3MiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiY29udmVydFRvV29ybGRTcGFjZSIsImdldExvY2F0aW9uIiwic2V0UG9zaXRpb24iLCJvbkNsaWNrIiwic2NlbmUiLCJuYW1lIiwicGFuZWwiLCJzaG93RGVidWdQYW5lbCIsImNvbnNvbGUiLCJsb2ciLCJyb29tIiwiZ2V0IiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwiZ2FtZV9pZCIsInJhbmsiLCJyb3V0ZSIsImRhdGEiLCJkZWJ1Z1BhbmVsIiwiZ2V0Q29tcG9uZW50IiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFLEVBRFE7QUFHcEJDLEVBQUFBLE1BSG9CLG9CQUdYO0FBQUE7O0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CLENBREssQ0FFTDs7QUFDQUMsSUFBQUEsRUFBRSxDQUFDQyxJQUFILENBQVFDLGtCQUFSLENBQTJCLEtBQUtKLElBQWhDO0FBQ0EsU0FBS0EsSUFBTCxDQUFVSyxFQUFWLENBQWEsV0FBYixFQUEwQixVQUFDQyxLQUFELEVBQVc7QUFDakMsVUFBSUMsR0FBRyxHQUFHTCxFQUFFLENBQUNNLFFBQUgsQ0FBWUMsUUFBWixHQUF1QkMsbUJBQXZCLENBQTJDSixLQUFLLENBQUNLLFdBQU4sRUFBM0MsQ0FBVjs7QUFDQSxNQUFBLEtBQUksQ0FBQ1gsSUFBTCxDQUFVWSxXQUFWLENBQXNCTCxHQUF0QjtBQUNILEtBSEQsRUFHRyxJQUhIO0FBSUgsR0FYbUI7QUFZcEJNLEVBQUFBLE9BWm9CLHFCQVlWO0FBQ04sUUFBSUMsS0FBSyxHQUFHWixFQUFFLENBQUNNLFFBQUgsQ0FBWUMsUUFBWixFQUFaO0FBQ0EsUUFBSUssS0FBSyxDQUFDQyxJQUFOLEtBQWUsT0FBZixJQUEwQkQsS0FBSyxDQUFDQyxJQUFOLEtBQWUsT0FBN0MsRUFBc0Q7QUFDdEQsUUFBSUQsS0FBSyxDQUFDQyxJQUFOLEtBQWUsT0FBbkIsRUFBNEIsT0FBT3BCLE1BQU0sQ0FBQ3FCLEtBQVAsQ0FBYUMsY0FBYixFQUFQO0FBQzVCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCeEIsTUFBTSxDQUFDeUIsSUFBUCxDQUFZQyxHQUFaLENBQWdCLGdCQUFoQixDQUExQixFQUE2RDFCLE1BQU0sQ0FBQ3lCLElBQVAsQ0FBWUMsR0FBWixDQUFnQixrQkFBaEIsQ0FBN0Q7O0FBQ0EsUUFBSVAsS0FBSyxDQUFDQyxJQUFOLEtBQWUsTUFBbkIsRUFBMkI7QUFDdkJwQixNQUFBQSxNQUFNLENBQUMyQixPQUFQLENBQWVDLFFBQWYsQ0FBd0IsdUJBQXhCLEVBQWlEO0FBQUVDLFFBQUFBLE9BQU8sRUFBRSxFQUFYO0FBQWVDLFFBQUFBLElBQUksRUFBRTtBQUFyQixPQUFqRCxFQUEyRSxVQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBaUI7QUFDeEYsWUFBSUMsVUFBVSxHQUFHakMsTUFBTSxDQUFDcUIsS0FBUCxDQUFhQyxjQUFiLEVBQWpCO0FBQ0FXLFFBQUFBLFVBQVUsQ0FBQ0MsWUFBWCxDQUF3QixZQUF4QixFQUFzQ0MsSUFBdEMsQ0FBMkNILElBQTNDO0FBQ0gsT0FIRDtBQUlBO0FBQ0g7O0FBQ0RoQyxJQUFBQSxNQUFNLENBQUMyQixPQUFQLENBQWVDLFFBQWYsQ0FBd0IsdUJBQXhCLEVBQWlEO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTdCLE1BQU0sQ0FBQ3lCLElBQVAsQ0FBWUMsR0FBWixDQUFnQixnQkFBaEIsQ0FBWDtBQUE4Q0ksTUFBQUEsSUFBSSxFQUFFOUIsTUFBTSxDQUFDeUIsSUFBUCxDQUFZQyxHQUFaLENBQWdCLGtCQUFoQjtBQUFwRCxLQUFqRCxFQUE0SSxVQUFDSyxLQUFELEVBQVFDLElBQVIsRUFBaUI7QUFDekosVUFBSUMsVUFBVSxHQUFHakMsTUFBTSxDQUFDcUIsS0FBUCxDQUFhQyxjQUFiLEVBQWpCO0FBQ0FXLE1BQUFBLFVBQVUsQ0FBQ0MsWUFBWCxDQUF3QixZQUF4QixFQUFzQ0MsSUFBdEMsQ0FBMkNILElBQTNDO0FBQ0gsS0FIRDtBQUlIO0FBNUJtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMDtcclxuICAgICAgICAvLyDorr7nva7kuLrluLjpqbvoioLngrlcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNobW92ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuY29udmVydFRvV29ybGRTcGFjZShldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmIChzY2VuZS5uYW1lID09PSBcInN0YXJ0XCIgfHwgc2NlbmUubmFtZSA9PT0gXCJsb2dpblwiKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgPT09IFwicGxhemFcIikgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RGVidWdQYW5lbCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5pivZGVidWfnmoTkv6Hmga9cIiwgZ2xHYW1lLnJvb20uZ2V0KFwiY3VyRW50ZXJHYW1lSURcIiksIGdsR2FtZS5yb29tLmdldChcImN1ckVudGVyR2FtZVJhbmtcIikpXHJcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgPT09IFwibGFiYVwiKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5SZXFHZXRHYW1lUHJvZml0XCIsIHsgZ2FtZV9pZDogMzEsIHJhbms6IDEgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVidWdQYW5lbCA9IGdsR2FtZS5wYW5lbC5zaG93RGVidWdQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdQYW5lbC5nZXRDb21wb25lbnQoXCJkZWJ1Z3BhbmVsXCIpLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcUdldEdhbWVQcm9maXRcIiwgeyBnYW1lX2lkOiBnbEdhbWUucm9vbS5nZXQoXCJjdXJFbnRlckdhbWVJRFwiKSwgcmFuazogZ2xHYW1lLnJvb20uZ2V0KFwiY3VyRW50ZXJHYW1lUmFua1wiKSB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlYnVnUGFuZWwgPSBnbEdhbWUucGFuZWwuc2hvd0RlYnVnUGFuZWwoKTtcclxuICAgICAgICAgICAgZGVidWdQYW5lbC5nZXRDb21wb25lbnQoXCJkZWJ1Z3BhbmVsXCIpLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
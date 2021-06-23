
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/exchangeWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3643sJTWVGYrlICcduWdxK', 'exchangeWin');
// modules/plaza/script/prefab/withdrawal/exchangeWin.js

"use strict";

glGame.baseclass.extend({
  properties: {
    duihuanSpine: sp.Skeleton,
    closeNode: cc.Node,
    content: cc.Node,
    audio_exchangeSucceed: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {},
  start: function start() {},
  playSucceed: function playSucceed() {
    var _this = this;

    glGame.audio.playSoundEffect(this.audio_exchangeSucceed, true);
    this.duihuanSpine.setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : '';

      if (name === 'appears' || name === 'looping') {
        _this.closeNode.active = true;
        _this.content.active = true;

        _this.duihuanSpine.setAnimation(0, "looping", true); // 动画结束后执行自己的逻辑


        _this.node.getChildByName("content").getChildByName("img_qdd3fz").active = true;
        console.log('动画播放结束');
      }
    });
    this.duihuanSpine.setAnimation(0, "appears", false);
  },
  OnDestroy: function OnDestroy() {},
  duihuan_close: function duihuan_close() {
    this.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFxleGNoYW5nZVdpbi5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZHVpaHVhblNwaW5lIiwic3AiLCJTa2VsZXRvbiIsImNsb3NlTm9kZSIsImNjIiwiTm9kZSIsImNvbnRlbnQiLCJhdWRpb19leGNoYW5nZVN1Y2NlZWQiLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwic3RhcnQiLCJwbGF5U3VjY2VlZCIsImF1ZGlvIiwicGxheVNvdW5kRWZmZWN0Iiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJsb29wQ291bnQiLCJuYW1lIiwiYW5pbWF0aW9uIiwiYWN0aXZlIiwic2V0QW5pbWF0aW9uIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiY29uc29sZSIsImxvZyIsIk9uRGVzdHJveSIsImR1aWh1YW5fY2xvc2UiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVDLEVBQUUsQ0FBQ0MsUUFEVDtBQUVSQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsSUFGTjtBQUdSQyxJQUFBQSxPQUFPLEVBQUNGLEVBQUUsQ0FBQ0MsSUFISDtBQUlSRSxJQUFBQSxxQkFBcUIsRUFBRTtBQUNuQkMsTUFBQUEsSUFBSSxFQUFFSixFQUFFLENBQUNLLFNBRFU7QUFFbkIsaUJBQVM7QUFGVTtBQUpmLEdBRFE7QUFZcEJDLEVBQUFBLE1BWm9CLG9CQVlYLENBRVIsQ0FkbUI7QUFnQnBCQyxFQUFBQSxLQWhCb0IsbUJBZ0JaLENBRVAsQ0FsQm1CO0FBbUJwQkMsRUFBQUEsV0FuQm9CLHlCQW1CTjtBQUFBOztBQUNWaEIsSUFBQUEsTUFBTSxDQUFDaUIsS0FBUCxDQUFhQyxlQUFiLENBQTZCLEtBQUtQLHFCQUFsQyxFQUF5RCxJQUF6RDtBQUNBLFNBQUtQLFlBQUwsQ0FBa0JlLG1CQUFsQixDQUFzQyxVQUFDQyxVQUFELEVBQWFDLFNBQWIsRUFBMkI7QUFDN0QsVUFBSUMsSUFBSSxHQUFHRixVQUFVLENBQUNHLFNBQVgsR0FBdUJILFVBQVUsQ0FBQ0csU0FBWCxDQUFxQkQsSUFBNUMsR0FBbUQsRUFBOUQ7O0FBRUEsVUFBSUEsSUFBSSxLQUFLLFNBQVQsSUFBc0JBLElBQUksS0FBSyxTQUFuQyxFQUE4QztBQUMxQyxRQUFBLEtBQUksQ0FBQ2YsU0FBTCxDQUFlaUIsTUFBZixHQUF3QixJQUF4QjtBQUNBLFFBQUEsS0FBSSxDQUFDZCxPQUFMLENBQWFjLE1BQWIsR0FBc0IsSUFBdEI7O0FBQ0EsUUFBQSxLQUFJLENBQUNwQixZQUFMLENBQWtCcUIsWUFBbEIsQ0FBK0IsQ0FBL0IsRUFBa0MsU0FBbEMsRUFBNkMsSUFBN0MsRUFIMEMsQ0FJMUM7OztBQUNBLFFBQUEsS0FBSSxDQUFDQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsU0FBekIsRUFBb0NBLGNBQXBDLENBQW1ELFlBQW5ELEVBQWlFSCxNQUFqRSxHQUEwRSxJQUExRTtBQUNBSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0g7QUFDSixLQVhEO0FBWUEsU0FBS3pCLFlBQUwsQ0FBa0JxQixZQUFsQixDQUErQixDQUEvQixFQUFrQyxTQUFsQyxFQUE2QyxLQUE3QztBQUNILEdBbENtQjtBQW1DcEJLLEVBQUFBLFNBbkNvQix1QkFtQ1IsQ0FFWCxDQXJDbUI7QUFzQ3BCQyxFQUFBQSxhQXRDb0IsMkJBc0NKO0FBQ1osU0FBS0MsTUFBTDtBQUNILEdBeENtQixDQTBDcEI7O0FBMUNvQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBkdWlodWFuU3BpbmU6IHNwLlNrZWxldG9uLFxyXG4gICAgICAgIGNsb3NlTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBjb250ZW50OmNjLk5vZGUsXHJcbiAgICAgICAgYXVkaW9fZXhjaGFuZ2VTdWNjZWVkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHBsYXlTdWNjZWVkKCkge1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5U291bmRFZmZlY3QodGhpcy5hdWRpb19leGNoYW5nZVN1Y2NlZWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZHVpaHVhblNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKHRyYWNrRW50cnksIGxvb3BDb3VudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdhcHBlYXJzJyB8fCBuYW1lID09PSAnbG9vcGluZycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHVpaHVhblNwaW5lLnNldEFuaW1hdGlvbigwLCBcImxvb3BpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyDliqjnlLvnu5PmnZ/lkI7miafooYzoh6rlt7HnmoTpgLvovpFcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcWRkM2Z6XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqo55S75pKt5pS+57uT5p2fJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmR1aWh1YW5TcGluZS5zZXRBbmltYXRpb24oMCwgXCJhcHBlYXJzXCIsIGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGR1aWh1YW5fY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
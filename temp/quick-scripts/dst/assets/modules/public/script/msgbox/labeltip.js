
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/labeltip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba5f4aVzxZMKIt3wnG8SrRL', 'labeltip');
// modules/public/script/msgbox/labeltip.js

"use strict";

var ACTTYPE = {
  STILL: 1,
  FLUTTER: 2
}; //1飘动2静止

glGame.baseclass.extend({
  properties: {
    content: cc.Label,
    bg_node: cc.Node
  },
  onLoad: function onLoad() {
    this.node.scale = glGame.systemclass.convertInterface();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "mask":
        this.remove();
        break;

      default:
        break;
    }
  },
  showTip: function showTip(content, showtype, _time) {
    var time = _time;
    this.content.string = content;
    this.content.node.color = new cc.Color(0xdd, 0xf5, 0xff);
    this.node.getChildByName("tip").active = true;

    if (showtype == ACTTYPE.STILL) {
      this.node.runAction(cc.sequence(cc.delayTime(time), cc.removeSelf()));
    } else {
      this.content.node.y = this.bg_node.y = this.node.height / 4;
      console.log("这是当前的高度", this.node.height);
      this.node.getChildByName("mask").active = false;
      this.node.opacity = 0;
      this.node.runAction(cc.sequence(cc.fadeTo(0.2, 255), cc.delayTime(time), cc.spawn(cc.moveBy(0.2, 0, 80), cc.fadeTo(0.2, 0)), cc.removeSelf()));
    } // this.content._forceUpdateRenderData();
    // this.setWidth();

  },
  changeBgWidth: function changeBgWidth() {
    this.scheduleOnce(this.setWidth.bind(this), 0);
  },
  setWidth: function setWidth() {
    if (this.bg_node.width < this.content.node.width + 320) this.bg_node.width = this.content.node.width + 320;
  },
  showErrorTip: function showErrorTip(content, next) {
    this.content.string = content;

    this.content._forceUpdateRenderData();

    this.setWidth();
    this.content.node.color = new cc.Color(0xf4, 0x4d, 0x4d);
    this.node.getChildByName("tip").active = true;
    this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      if (next) next();
    }), cc.removeSelf()));
  },
  OnDestroy: function OnDestroy() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcbGFiZWx0aXAuanMiXSwibmFtZXMiOlsiQUNUVFlQRSIsIlNUSUxMIiwiRkxVVFRFUiIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJjb250ZW50IiwiY2MiLCJMYWJlbCIsImJnX25vZGUiLCJOb2RlIiwib25Mb2FkIiwibm9kZSIsInNjYWxlIiwic3lzdGVtY2xhc3MiLCJjb252ZXJ0SW50ZXJmYWNlIiwib25DbGljayIsIm5hbWUiLCJyZW1vdmUiLCJzaG93VGlwIiwic2hvd3R5cGUiLCJfdGltZSIsInRpbWUiLCJzdHJpbmciLCJjb2xvciIsIkNvbG9yIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsInJlbW92ZVNlbGYiLCJ5IiwiaGVpZ2h0IiwiY29uc29sZSIsImxvZyIsIm9wYWNpdHkiLCJmYWRlVG8iLCJzcGF3biIsIm1vdmVCeSIsImNoYW5nZUJnV2lkdGgiLCJzY2hlZHVsZU9uY2UiLCJzZXRXaWR0aCIsImJpbmQiLCJ3aWR0aCIsInNob3dFcnJvclRpcCIsIm5leHQiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwiY2FsbEZ1bmMiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHO0FBQUVDLEVBQUFBLEtBQUssRUFBRSxDQUFUO0FBQVlDLEVBQUFBLE9BQU8sRUFBRTtBQUFyQixDQUFoQixFQUF5Qzs7QUFDekNDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVDLEVBQUUsQ0FBQ0MsS0FESjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVGLEVBQUUsQ0FBQ0c7QUFGSixHQURRO0FBS3BCQyxFQUFBQSxNQUxvQixvQkFL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LE9BQUwsQ0FBYXlDLHNCQUFiOztBQUNBLFNBQUtMLFFBQUw7QUFDQSxTQUFLcEMsT0FBTCxDQUFhTSxJQUFiLENBQWtCWSxLQUFsQixHQUEwQixJQUFJakIsRUFBRSxDQUFDa0IsS0FBUCxDQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBMUI7QUFDQSxTQUFLYixJQUFMLENBQVVjLGNBQVYsQ0FBeUIsS0FBekIsRUFBZ0NDLE1BQWhDLEdBQXlDLElBQXpDO0FBQ0EsU0FBS2YsSUFBTCxDQUFVZ0IsU0FBVixDQUFvQnJCLEVBQUUsQ0FBQ3NCLFFBQUgsQ0FBWXRCLEVBQUUsQ0FBQ3VCLFNBQUgsQ0FBYSxDQUFiLENBQVosRUFBNkJ2QixFQUFFLENBQUN5QyxRQUFILENBQVksWUFBTTtBQUFFLFVBQUlGLElBQUosRUFBVUEsSUFBSTtBQUFLLEtBQXZDLENBQTdCLEVBQXVFdkMsRUFBRSxDQUFDd0IsVUFBSCxFQUF2RSxDQUFwQjtBQUNILEdBdERtQjtBQXdEcEJrQixFQUFBQSxTQXhEb0IsdUJBd0RSLENBRVg7QUExRG1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBQ1RUWVBFID0geyBTVElMTDogMSwgRkxVVFRFUjogMiB9IC8vMemjmOWKqDLpnZnmraJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNvbnRlbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJnX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IGdsR2FtZS5zeXN0ZW1jbGFzcy5jb252ZXJ0SW50ZXJmYWNlKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIm1hc2tcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dUaXAoY29udGVudCwgc2hvd3R5cGUsIF90aW1lKSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBfdGltZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigweGRkLCAweGY1LCAweGZmKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoc2hvd3R5cGUgPT0gQUNUVFlQRS5TVElMTCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSh0aW1lKSwgY2MucmVtb3ZlU2VsZigpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Lm5vZGUueSA9IHRoaXMuYmdfbm9kZS55ID0gdGhpcy5ub2RlLmhlaWdodC80O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOmrmOW6plwiLCB0aGlzLm5vZGUuaGVpZ2h0KVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMiwgMjU1KSxjYy5kZWxheVRpbWUodGltZSksIGNjLnNwYXduKGNjLm1vdmVCeSgwLjIsIDAsIDgwKSwgY2MuZmFkZVRvKDAuMiwgMCkpLCBjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50Ll9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgICAgICAvLyB0aGlzLnNldFdpZHRoKCk7XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlQmdXaWR0aCgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnNldFdpZHRoLmJpbmQodGhpcyksIDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXaWR0aCgpIHtcclxuICAgICAgICBpZiAodGhpcy5iZ19ub2RlLndpZHRoIDwgdGhpcy5jb250ZW50Lm5vZGUud2lkdGggKyAzMjApXHJcbiAgICAgICAgICAgIHRoaXMuYmdfbm9kZS53aWR0aCA9IHRoaXMuY29udGVudC5ub2RlLndpZHRoICsgMzIwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93RXJyb3JUaXAoY29udGVudCwgbmV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuY29udGVudC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDB4ZjQsIDB4NGQsIDB4NGQpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7IGlmIChuZXh0KSBuZXh0KCk7IH0pLCBjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
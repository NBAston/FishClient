
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/effect/edgeFlow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0229X7c9hGVpJDrfvibxD8', 'edgeFlow');
// modules/public/script/effect/edgeFlow.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    startdelay: 0,
    // 开始延迟
    interval: 3.5,
    // 时间间隔
    duration: 1.25,
    // 流光移动时间
    lightwidth: 0.25,
    // 流光宽度(百分比)
    direction: 1,
    // 方向  1： 从左到右 2: 从右到左
    brightness: 1.1 // 亮度

  },
  onLoad: function onLoad() {
    this.delta = 0;
    this.material = this.node.getComponent(cc.RenderComponent).getMaterial(0);
    this.material.setProperty("duration", this.duration);
    this.material.setProperty("lightwidth", this.lightwidth);
    this.material.setProperty("brightness", this.brightness);
    this.halfTime = (this.duration + this.interval) * 0.5;
    if (this.direction != 1) this.delta = this.duration;
  },
  update: function update(dt) {
    if (this.startdelay >= 0) {
      this.startdelay -= dt;
      return;
    }

    if (this.direction == 1) {
      this.delta += dt;

      if (this.delta >= this.halfTime) {
        this.delta = -this.halfTime;
      }
    } else {
      this.delta -= dt;

      if (this.delta <= -this.halfTime) {
        this.delta = this.halfTime;
      }
    }

    this.material.setProperty("time", this.delta);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGVmZmVjdFxcZWRnZUZsb3cuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydGRlbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImxpZ2h0d2lkdGgiLCJkaXJlY3Rpb24iLCJicmlnaHRuZXNzIiwib25Mb2FkIiwiZGVsdGEiLCJtYXRlcmlhbCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJSZW5kZXJDb21wb25lbnQiLCJnZXRNYXRlcmlhbCIsInNldFByb3BlcnR5IiwiaGFsZlRpbWUiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRSxDQURKO0FBQ1k7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxHQUZGO0FBRVk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxJQUhGO0FBR2E7QUFDckJDLElBQUFBLFVBQVUsRUFBRSxJQUpKO0FBSVk7QUFDcEJDLElBQUFBLFNBQVMsRUFBRSxDQUxIO0FBS1k7QUFDcEJDLElBQUFBLFVBQVUsRUFBRSxHQU5KLENBTVk7O0FBTlosR0FIUDtBQVlMQyxFQUFBQSxNQVpLLG9CQVlJO0FBQ0wsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QmQsRUFBRSxDQUFDZSxlQUExQixFQUEyQ0MsV0FBM0MsQ0FBdUQsQ0FBdkQsQ0FBaEI7QUFDQSxTQUFLSixRQUFMLENBQWNLLFdBQWQsQ0FBMEIsVUFBMUIsRUFBc0MsS0FBS1gsUUFBM0M7QUFDQSxTQUFLTSxRQUFMLENBQWNLLFdBQWQsQ0FBMEIsWUFBMUIsRUFBd0MsS0FBS1YsVUFBN0M7QUFDQSxTQUFLSyxRQUFMLENBQWNLLFdBQWQsQ0FBMEIsWUFBMUIsRUFBd0MsS0FBS1IsVUFBN0M7QUFDQSxTQUFLUyxRQUFMLEdBQWdCLENBQUMsS0FBS1osUUFBTCxHQUFnQixLQUFLRCxRQUF0QixJQUFrQyxHQUFsRDtBQUNBLFFBQUcsS0FBS0csU0FBTCxJQUFrQixDQUFyQixFQUF5QixLQUFLRyxLQUFMLEdBQWEsS0FBS0wsUUFBbEI7QUFDNUIsR0FwQkk7QUFzQkxhLEVBQUFBLE1BdEJLLGtCQXNCR0MsRUF0QkgsRUFzQk87QUFDUixRQUFHLEtBQUtoQixVQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQ3JCLFdBQUtBLFVBQUwsSUFBbUJnQixFQUFuQjtBQUNBO0FBQ0g7O0FBRUQsUUFBRyxLQUFLWixTQUFMLElBQWtCLENBQXJCLEVBQXdCO0FBQ3BCLFdBQUtHLEtBQUwsSUFBY1MsRUFBZDs7QUFDQSxVQUFHLEtBQUtULEtBQUwsSUFBYyxLQUFLTyxRQUF0QixFQUFnQztBQUM1QixhQUFLUCxLQUFMLEdBQWEsQ0FBQyxLQUFLTyxRQUFuQjtBQUNIO0FBQ0osS0FMRCxNQUtPO0FBQ0gsV0FBS1AsS0FBTCxJQUFjUyxFQUFkOztBQUNBLFVBQUcsS0FBS1QsS0FBTCxJQUFjLENBQUMsS0FBS08sUUFBdkIsRUFBaUM7QUFDN0IsYUFBS1AsS0FBTCxHQUFhLEtBQUtPLFFBQWxCO0FBQ0g7QUFDSjs7QUFFRCxTQUFLTixRQUFMLENBQWNLLFdBQWQsQ0FBMEIsTUFBMUIsRUFBa0MsS0FBS04sS0FBdkM7QUFDSDtBQXpDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhcnRkZWxheTogMCwgICAgICAvLyDlvIDlp4vlu7bov59cclxuICAgICAgICBpbnRlcnZhbDogMy41LCAgICAgIC8vIOaXtumXtOmXtOmalFxyXG4gICAgICAgIGR1cmF0aW9uOiAxLjI1LCAgICAgIC8vIOa1geWFieenu+WKqOaXtumXtFxyXG4gICAgICAgIGxpZ2h0d2lkdGg6IDAuMjUsICAgLy8g5rWB5YWJ5a695bqmKOeZvuWIhuavlClcclxuICAgICAgICBkaXJlY3Rpb246IDEsICAgICAgIC8vIOaWueWQkSAgMe+8miDku47lt6bliLDlj7MgMjog5LuO5Y+z5Yiw5bemXHJcbiAgICAgICAgYnJpZ2h0bmVzczogMS4xLCAgICAvLyDkuq7luqZcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJlbmRlckNvbXBvbmVudCkuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5zZXRQcm9wZXJ0eShcImR1cmF0aW9uXCIsIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJsaWdodHdpZHRoXCIsIHRoaXMubGlnaHR3aWR0aCk7IFxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJicmlnaHRuZXNzXCIsIHRoaXMuYnJpZ2h0bmVzcyk7XHJcbiAgICAgICAgdGhpcy5oYWxmVGltZSA9ICh0aGlzLmR1cmF0aW9uICsgdGhpcy5pbnRlcnZhbCkgKiAwLjU7IFxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uICE9IDEpICB0aGlzLmRlbHRhID0gdGhpcy5kdXJhdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKHRoaXMuc3RhcnRkZWxheSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRkZWxheSAtPSBkdDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbHRhICs9IGR0OyAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5kZWx0YSA+PSB0aGlzLmhhbGZUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuaGFsZlRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRlbHRhIC09IGR0OyAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5kZWx0YSA8PSAtdGhpcy5oYWxmVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMuaGFsZlRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJ0aW1lXCIsIHRoaXMuZGVsdGEpO1xyXG4gICAgfSxcclxufSk7XHJcbiAiXX0=
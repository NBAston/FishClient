
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_cloud.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '728d6bl9R5JQYAZpBQ8UoMJ', 'nfish_cloud');
// modules/games/nfish/script/prefab/nfish_cloud.js

"use strict";

//云
glGame.baseclass.extend({
  properties: {
    speed: {
      "default": 5,
      displayName: "速度",
      tooltip: "云朵运动速度",
      type: cc.Integer
    },
    way: {
      "default": 1,
      displayName: "方向",
      tooltip: "1从左到右，-1从右到左",
      type: cc.Integer
    }
  },
  "extends": cc.Component,
  update: function update(dt) {
    if (this.way === 1) {
      this.node.x += dt * this.speed;

      if (this.node.x > cc.winSize.width / 2) {
        this.node.x = -(cc.winSize.width / 2 + 100);
      }
    } else {
      this.node.x -= dt * this.speed;

      if (this.node.x < -cc.winSize.width / 2) {
        this.node.x = cc.winSize.width / 2 + 100;
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfY2xvdWQuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInNwZWVkIiwiZGlzcGxheU5hbWUiLCJ0b29sdGlwIiwidHlwZSIsImNjIiwiSW50ZWdlciIsIndheSIsIkNvbXBvbmVudCIsInVwZGF0ZSIsImR0Iiwibm9kZSIsIngiLCJ3aW5TaXplIiwid2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBRTtBQUNILGlCQUFTLENBRE47QUFFSEMsTUFBQUEsV0FBVyxFQUFFLElBRlY7QUFHSEMsTUFBQUEsT0FBTyxFQUFFLFFBSE47QUFJSEMsTUFBQUEsSUFBSSxFQUFDQyxFQUFFLENBQUNDO0FBSkwsS0FEQztBQU9SQyxJQUFBQSxHQUFHLEVBQUU7QUFDRCxpQkFBUyxDQURSO0FBRURMLE1BQUFBLFdBQVcsRUFBRSxJQUZaO0FBR0RDLE1BQUFBLE9BQU8sRUFBRSxjQUhSO0FBSURDLE1BQUFBLElBQUksRUFBQ0MsRUFBRSxDQUFDQztBQUpQO0FBUEcsR0FEUTtBQWVwQixhQUFTRCxFQUFFLENBQUNHLFNBZlE7QUFnQnBCQyxFQUFBQSxNQWhCb0Isa0JBZ0JiQyxFQWhCYSxFQWdCVjtBQUNOLFFBQUcsS0FBS0gsR0FBTCxLQUFhLENBQWhCLEVBQWtCO0FBQ2QsV0FBS0ksSUFBTCxDQUFVQyxDQUFWLElBQWVGLEVBQUUsR0FBRyxLQUFLVCxLQUF6Qjs7QUFDQSxVQUFHLEtBQUtVLElBQUwsQ0FBVUMsQ0FBVixHQUFjUCxFQUFFLENBQUNRLE9BQUgsQ0FBV0MsS0FBWCxHQUFpQixDQUFsQyxFQUFvQztBQUNoQyxhQUFLSCxJQUFMLENBQVVDLENBQVYsR0FBYyxFQUFFUCxFQUFFLENBQUNRLE9BQUgsQ0FBV0MsS0FBWCxHQUFpQixDQUFqQixHQUFxQixHQUF2QixDQUFkO0FBQ0g7QUFDSixLQUxELE1BS0s7QUFDRCxXQUFLSCxJQUFMLENBQVVDLENBQVYsSUFBZUYsRUFBRSxHQUFHLEtBQUtULEtBQXpCOztBQUNBLFVBQUcsS0FBS1UsSUFBTCxDQUFVQyxDQUFWLEdBQWMsQ0FBQ1AsRUFBRSxDQUFDUSxPQUFILENBQVdDLEtBQVosR0FBa0IsQ0FBbkMsRUFBcUM7QUFDakMsYUFBS0gsSUFBTCxDQUFVQyxDQUFWLEdBQWNQLEVBQUUsQ0FBQ1EsT0FBSCxDQUFXQyxLQUFYLEdBQWlCLENBQWpCLEdBQXFCLEdBQW5DO0FBQ0g7QUFDSjtBQUNKO0FBNUJtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/kupFcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwZWVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIumAn+W6plwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuS6keactei/kOWKqOmAn+W6plwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3YXk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwi5pa55ZCRXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiMeS7juW3puWIsOWPs++8jC0x5LuO5Y+z5Yiw5bemXCIsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgaWYodGhpcy53YXkgPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBkdCAqIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54ID4gY2Mud2luU2l6ZS53aWR0aC8yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gLShjYy53aW5TaXplLndpZHRoLzIgKyAxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54IC09IGR0ICogdGhpcy5zcGVlZDtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnggPCAtY2Mud2luU2l6ZS53aWR0aC8yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gY2Mud2luU2l6ZS53aWR0aC8yICsgMTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19
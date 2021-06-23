
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/Task/awardTips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9cfdabdajtBp4PrNzvGYewh', 'awardTips');
// modules/plaza/script/prefab/Task/awardTips.js

"use strict";

glGame.baseclass.extend({
  properties: {
    title: cc.Label,
    coin: cc.Label,
    score: cc.Label,
    diamond: cc.Label,
    node_coin: cc.Node,
    node_score: cc.Node,
    node_diamond: cc.Node
  },
  onLoad: function onLoad() {
    this.next = null;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * @param title 标题
   * @param coin  金币数值
   * @param score  积分数值
   * @param activeLevel  活跃数值
   * @param next  回调函数
   */
  showMsg: function showMsg(title, coin, score, diamond, next) {
    this.title.string = title;
    if (coin == null) this.node_coin.active = false;else {
      this.node_coin.active = true;
      this.coin.string = typeof coin != "string" ? coin.toString() : coin;
    }
    if (score == null) this.node_score.active = false;else {
      this.node_score.active = true;
      this.score.string = typeof score != "string" ? score.toString() : score;
    }
    if (diamond == null) this.node_diamond.active = false;else {
      this.node_diamond.active = true;
      this.diamond.string = typeof diamond != "string" ? diamond.toString() : diamond;
    }
    this.next = next;
  },
  //触发回调函数
  confirm: function confirm() {
    if (this.next != null) this.next();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxUYXNrXFxhd2FyZFRpcHMuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInRpdGxlIiwiY2MiLCJMYWJlbCIsImNvaW4iLCJzY29yZSIsImRpYW1vbmQiLCJub2RlX2NvaW4iLCJOb2RlIiwibm9kZV9zY29yZSIsIm5vZGVfZGlhbW9uZCIsIm9uTG9hZCIsIm5leHQiLCJyZWdpc3RlckV2ZW50IiwidW5SZWdpc3RlckV2ZW50IiwiT25EZXN0cm95Iiwib25DbGljayIsIm5hbWUiLCJub2RlIiwicmVtb3ZlIiwiY29uZmlybSIsImNvbnNvbGUiLCJlcnJvciIsInNob3dNc2ciLCJzdHJpbmciLCJhY3RpdmUiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBRUMsRUFBRSxDQUFDQyxLQURGO0FBRVJDLElBQUFBLElBQUksRUFBRUYsRUFBRSxDQUFDQyxLQUZEO0FBR1JFLElBQUFBLEtBQUssRUFBRUgsRUFBRSxDQUFDQyxLQUhGO0FBSVJHLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDQyxLQUpKO0FBS1JJLElBQUFBLFNBQVMsRUFBRUwsRUFBRSxDQUFDTSxJQUxOO0FBTVJDLElBQUFBLFVBQVUsRUFBRVAsRUFBRSxDQUFDTSxJQU5QO0FBT1JFLElBQUFBLFlBQVksRUFBRVIsRUFBRSxDQUFDTTtBQVBULEdBRFE7QUFVcEJHLEVBQUFBLE1BVm9CLG9CQVVYO0FBQ0wsU0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLQyxhQUFMO0FBQ0gsR0FibUI7QUFlcEJBLEVBQUFBLGFBZm9CLDJCQWVKLENBQUcsQ0FmQztBQWdCcEJDLEVBQUFBLGVBaEJvQiw2QkFnQkYsQ0FBRyxDQWhCRDtBQW1CcEJDLEVBQUFBLFNBbkJvQix1QkFtQlI7QUFDUixTQUFLRCxlQUFMO0FBQ0gsR0FyQm1CO0FBdUJwQkUsRUFBQUEsT0F2Qm9CLG1CQXVCWkMsSUF2QlksRUF1Qk5DLElBdkJNLEVBdUJBO0FBQ2hCLFlBQVFELElBQVI7QUFDSSxXQUFLLFdBQUw7QUFBa0IsYUFBS0UsTUFBTDtBQUFlOztBQUNqQyxXQUFLLGFBQUw7QUFBb0IsYUFBS0MsT0FBTDtBQUFnQjs7QUFDcEM7QUFBU0MsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNMLElBQTNDO0FBSGI7QUFLSCxHQTdCbUI7O0FBOEJwQjs7Ozs7OztBQU9BTSxFQUFBQSxPQXJDb0IsbUJBcUNadEIsS0FyQ1ksRUFxQ0xHLElBckNLLEVBcUNDQyxLQXJDRCxFQXFDUUMsT0FyQ1IsRUFxQ2lCTSxJQXJDakIsRUFxQ3VCO0FBQ3ZDLFNBQUtYLEtBQUwsQ0FBV3VCLE1BQVgsR0FBb0J2QixLQUFwQjtBQUVBLFFBQUlHLElBQUksSUFBSSxJQUFaLEVBQWtCLEtBQUtHLFNBQUwsQ0FBZWtCLE1BQWYsR0FBd0IsS0FBeEIsQ0FBbEIsS0FDSztBQUNELFdBQUtsQixTQUFMLENBQWVrQixNQUFmLEdBQXdCLElBQXhCO0FBQ0EsV0FBS3JCLElBQUwsQ0FBVW9CLE1BQVYsR0FBbUIsT0FBT3BCLElBQVAsSUFBZSxRQUFmLEdBQTBCQSxJQUFJLENBQUNzQixRQUFMLEVBQTFCLEdBQTRDdEIsSUFBL0Q7QUFDSDtBQUNELFFBQUlDLEtBQUssSUFBSSxJQUFiLEVBQW1CLEtBQUtJLFVBQUwsQ0FBZ0JnQixNQUFoQixHQUF5QixLQUF6QixDQUFuQixLQUNLO0FBQ0QsV0FBS2hCLFVBQUwsQ0FBZ0JnQixNQUFoQixHQUF5QixJQUF6QjtBQUNBLFdBQUtwQixLQUFMLENBQVdtQixNQUFYLEdBQW9CLE9BQU9uQixLQUFQLElBQWdCLFFBQWhCLEdBQTJCQSxLQUFLLENBQUNxQixRQUFOLEVBQTNCLEdBQThDckIsS0FBbEU7QUFDSDtBQUNELFFBQUlDLE9BQU8sSUFBSSxJQUFmLEVBQXFCLEtBQUtJLFlBQUwsQ0FBa0JlLE1BQWxCLEdBQTJCLEtBQTNCLENBQXJCLEtBQ0s7QUFDRCxXQUFLZixZQUFMLENBQWtCZSxNQUFsQixHQUEyQixJQUEzQjtBQUNBLFdBQUtuQixPQUFMLENBQWFrQixNQUFiLEdBQXNCLE9BQU9sQixPQUFQLElBQWtCLFFBQWxCLEdBQTZCQSxPQUFPLENBQUNvQixRQUFSLEVBQTdCLEdBQWtEcEIsT0FBeEU7QUFDSDtBQUVELFNBQUtNLElBQUwsR0FBWUEsSUFBWjtBQUNILEdBekRtQjtBQTJEcEI7QUFDQVEsRUFBQUEsT0E1RG9CLHFCQTREVjtBQUNOLFFBQUksS0FBS1IsSUFBTCxJQUFhLElBQWpCLEVBQXVCLEtBQUtBLElBQUw7QUFDdkIsU0FBS08sTUFBTDtBQUNIO0FBL0RtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRpdGxlOiBjYy5MYWJlbCxcclxuICAgICAgICBjb2luOiBjYy5MYWJlbCxcclxuICAgICAgICBzY29yZTogY2MuTGFiZWwsXHJcbiAgICAgICAgZGlhbW9uZDogY2MuTGFiZWwsXHJcbiAgICAgICAgbm9kZV9jb2luOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfc2NvcmU6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9kaWFtb25kOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkgeyB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkgeyB9LFxyXG5cclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY29uZmlybVwiOiB0aGlzLmNvbmZpcm0oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0aXRsZSDmoIfpophcclxuICAgICAqIEBwYXJhbSBjb2luICDph5HluIHmlbDlgLxcclxuICAgICAqIEBwYXJhbSBzY29yZSAg56ev5YiG5pWw5YC8XHJcbiAgICAgKiBAcGFyYW0gYWN0aXZlTGV2ZWwgIOa0u+i3g+aVsOWAvFxyXG4gICAgICogQHBhcmFtIG5leHQgIOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICBzaG93TXNnKHRpdGxlLCBjb2luLCBzY29yZSwgZGlhbW9uZCwgbmV4dCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUuc3RyaW5nID0gdGl0bGU7XHJcblxyXG4gICAgICAgIGlmIChjb2luID09IG51bGwpIHRoaXMubm9kZV9jb2luLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfY29pbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvaW4uc3RyaW5nID0gdHlwZW9mIGNvaW4gIT0gXCJzdHJpbmdcIiA/IGNvaW4udG9TdHJpbmcoKSA6IGNvaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY29yZSA9PSBudWxsKSB0aGlzLm5vZGVfc2NvcmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zY29yZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlLnN0cmluZyA9IHR5cGVvZiBzY29yZSAhPSBcInN0cmluZ1wiID8gc2NvcmUudG9TdHJpbmcoKSA6IHNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlhbW9uZCA9PSBudWxsKSB0aGlzLm5vZGVfZGlhbW9uZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2RpYW1vbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kaWFtb25kLnN0cmluZyA9IHR5cGVvZiBkaWFtb25kICE9IFwic3RyaW5nXCIgPyBkaWFtb25kLnRvU3RyaW5nKCkgOiBkaWFtb25kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgLy/op6blj5Hlm57osIPlh73mlbBcclxuICAgIGNvbmZpcm0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dCAhPSBudWxsKSB0aGlzLm5leHQoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59KTtcclxuIl19
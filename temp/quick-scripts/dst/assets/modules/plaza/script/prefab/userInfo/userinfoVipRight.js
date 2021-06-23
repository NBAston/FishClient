
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfoVipRight.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80a38PLLzFH7JBOgTj47Bin', 'userinfoVipRight');
// modules/plaza/script/prefab/userInfo/userinfoVipRight.js

"use strict";

/**
 * 玩家个人信息界面
 */
glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    item: cc.Node
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;
    }
  },
  // 显示vip权益
  showVipRight: function showVipRight(vipList, type) {
    var grid = this.node.getChildByName("grid");

    if (type == 1) {
      grid.getChildByName("img_title_ljcz").active = true;
    } else {
      grid.getChildByName("img_title_ljdml").active = true;
    }

    this.refreshList(vipList, type);
  },
  // 刷新列表
  refreshList: function refreshList(vipList, type) {
    this.content.destroyAllChildren();

    for (var i = 0; i < vipList.length; i++) {
      var cloneItem = cc.instantiate(this.item);
      cloneItem.getChildByName("bg").active = i % 2 == 0;
      cloneItem.active = false;
      cloneItem.parent = this.content;
      var vipInfo = vipList[i];
      cloneItem.getChildByName("vip").getComponent(cc.Label).string = "VIP".concat(vipInfo.vipName); // vip等级

      cloneItem.getChildByName("all_charge").getComponent(cc.Label).string = type == 1 ? vipInfo.recharge / 100 : vipInfo.betting / 100; // 累计充值/ 打码量

      cloneItem.getChildByName("promo_award").getComponent(cc.Label).string = vipInfo.bonusUpgrade / 100; // 晋级彩金

      cloneItem.getChildByName("week_award").getComponent(cc.Label).string = vipInfo.bonusWeek / 100; // 周礼金

      cloneItem.getChildByName("month_award").getComponent(cc.Label).string = vipInfo.bonusMonth / 100; // 月礼金

      var temp = (Number(vipInfo.balance) / 100 * 365).toFixed(2).toString();
      cloneItem.getChildByName("yuebao").getComponent(cc.Label).string = "".concat(temp, "%"); // 余额宝年化收益率

      cloneItem.getChildByName("return_ratio").getComponent(cc.Label).string = "".concat(this.cutFloat(vipInfo.returnRatio), "%"); // 游戏返水利率

      if (i == vipList.length - 1) {
        cloneItem.getChildByName("frame_horizontal").active = false;
      }
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  //截取小数点后2位
  cutFloat: function cutFloat(value) {
    if (typeof value !== 'string' && typeof value !== 'number') return;
    return (Math.floor(parseFloat(value)) / 100).toFixed(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9WaXBSaWdodC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiY29udGVudCIsImNjIiwiTm9kZSIsIml0ZW0iLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJyZW1vdmUiLCJzaG93VmlwUmlnaHQiLCJ2aXBMaXN0IiwidHlwZSIsImdyaWQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsInJlZnJlc2hMaXN0IiwiZGVzdHJveUFsbENoaWxkcmVuIiwiaSIsImxlbmd0aCIsImNsb25lSXRlbSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwidmlwSW5mbyIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwidmlwTmFtZSIsInJlY2hhcmdlIiwiYmV0dGluZyIsImJvbnVzVXBncmFkZSIsImJvbnVzV2VlayIsImJvbnVzTW9udGgiLCJ0ZW1wIiwiTnVtYmVyIiwiYmFsYW5jZSIsInRvRml4ZWQiLCJ0b1N0cmluZyIsImN1dEZsb2F0IiwicmV0dXJuUmF0aW8iLCJwYW5lbCIsInNob3dFZmZlY3ROb2RlIiwidmFsdWUiLCJNYXRoIiwiZmxvb3IiLCJwYXJzZUZsb2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFHQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUMsRUFBRSxDQUFDQyxJQURKO0FBRVJDLElBQUFBLElBQUksRUFBRUYsRUFBRSxDQUFDQztBQUZELEdBRFE7QUFNcEJFLEVBQUFBLE9BTm9CLG1CQU1aQyxJQU5ZLEVBTU5DLElBTk0sRUFNQTtBQUNoQixZQUFRRCxJQUFSO0FBQ0ksV0FBSyxPQUFMO0FBQ0ksYUFBS0UsTUFBTDtBQUNBO0FBSFI7QUFLSCxH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LE9BYm9DLENBYWtGOztBQUN0SGIsTUFBQUEsU0FBUyxDQUFDTixjQUFWLENBQXlCLGNBQXpCLEVBQXlDVSxZQUF6QyxDQUFzRHJCLEVBQUUsQ0FBQ3NCLEtBQXpELEVBQWdFQyxNQUFoRSxhQUE0RSxLQUFLWSxRQUFMLENBQWNmLE9BQU8sQ0FBQ2dCLFdBQXRCLENBQTVFLE9BZG9DLENBY2tGOztBQUV0SCxVQUFHckIsQ0FBQyxJQUFJUCxPQUFPLENBQUNRLE1BQVIsR0FBZ0IsQ0FBeEIsRUFBMkI7QUFDdkJDLFFBQUFBLFNBQVMsQ0FBQ04sY0FBVixDQUF5QixrQkFBekIsRUFBNkNDLE1BQTdDLEdBQXNELEtBQXREO0FBQ0g7QUFDSjs7QUFFRGpCLElBQUFBLE1BQU0sQ0FBQzBDLEtBQVAsQ0FBYUMsY0FBYixDQUE0QixJQUE1QixFQUFpQyxLQUFLdkMsT0FBdEMsRUFBOEMsSUFBOUMsRUFBbUQsSUFBbkQ7QUFDSCxHQWxEbUI7QUFvRHBCO0FBQ0FvQyxFQUFBQSxRQXJEb0Isb0JBcURYSSxLQXJEVyxFQXFESjtBQUNaLFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QixPQUFPQSxLQUFQLEtBQWlCLFFBQWxELEVBQTREO0FBQzVELFdBQU8sQ0FBQ0MsSUFBSSxDQUFDQyxLQUFMLENBQVdDLFVBQVUsQ0FBQ0gsS0FBRCxDQUFyQixJQUFnQyxHQUFqQyxFQUFzQ04sT0FBdEMsQ0FBOEMsQ0FBOUMsQ0FBUDtBQUNIO0FBeERtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiDnjqnlrrbkuKrkurrkv6Hmga/nlYzpnaJcclxuICovXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIGl0ZW06IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pi+56S6dmlw5p2D55uKXHJcbiAgICBzaG93VmlwUmlnaHQodmlwTGlzdCwgdHlwZSkge1xyXG4gICAgICAgIGxldCBncmlkID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JpZFwiKTtcclxuICAgICAgICBpZih0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgZ3JpZC5nZXRDaGlsZEJ5TmFtZShcImltZ190aXRsZV9samN6XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZC5nZXRDaGlsZEJ5TmFtZShcImltZ190aXRsZV9samRtbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZnJlc2hMaXN0KHZpcExpc3QsIHR5cGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDliLfmlrDliJfooahcclxuICAgIHJlZnJlc2hMaXN0KHZpcExpc3QsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHZpcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNsb25lSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSk7XHJcbiAgICAgICAgICAgIGNsb25lSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyID09IDA7XHJcbiAgICAgICAgICAgIGNsb25lSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2xvbmVJdGVtLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aXBJbmZvID0gdmlwTGlzdFtpXTtcclxuICAgICAgICAgICAgY2xvbmVJdGVtLmdldENoaWxkQnlOYW1lKFwidmlwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYFZJUCR7dmlwSW5mby52aXBOYW1lfWA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmlw562J57qnXHJcbiAgICAgICAgICAgIGNsb25lSXRlbS5nZXRDaGlsZEJ5TmFtZShcImFsbF9jaGFyZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0eXBlPT0xID8gdmlwSW5mby5yZWNoYXJnZS8xMDAgOiB2aXBJbmZvLmJldHRpbmcvMTAwOyAvLyDntK/orqHlhYXlgLwvIOaJk+eggemHj1xyXG4gICAgICAgICAgICBjbG9uZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJwcm9tb19hd2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZpcEluZm8uYm9udXNVcGdyYWRlLzEwMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmmYvnuqflvanph5FcclxuICAgICAgICAgICAgY2xvbmVJdGVtLmdldENoaWxkQnlOYW1lKFwid2Vla19hd2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZpcEluZm8uYm9udXNXZWVrLzEwMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlkajnpLzph5FcclxuICAgICAgICAgICAgY2xvbmVJdGVtLmdldENoaWxkQnlOYW1lKFwibW9udGhfYXdhcmRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2aXBJbmZvLmJvbnVzTW9udGgvMTAwOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmnIjnpLzph5FcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSAoTnVtYmVyKHZpcEluZm8uYmFsYW5jZSkgLyAxMDAgKiAzNjUpLnRvRml4ZWQoMikudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY2xvbmVJdGVtLmdldENoaWxkQnlOYW1lKFwieXVlYmFvXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGVtcH0lYDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2Z6aKd5a6d5bm05YyW5pS255uK546HXHJcbiAgICAgICAgICAgIGNsb25lSXRlbS5nZXRDaGlsZEJ5TmFtZShcInJldHVybl9yYXRpb1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke3RoaXMuY3V0RmxvYXQodmlwSW5mby5yZXR1cm5SYXRpbyl9JWA7ICAgIC8vIOa4uOaIj+i/lOawtOWIqeeOh1xyXG5cclxuICAgICAgICAgICAgaWYoaSA9PSB2aXBMaXN0Lmxlbmd0aCAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2xvbmVJdGVtLmdldENoaWxkQnlOYW1lKFwiZnJhbWVfaG9yaXpvbnRhbFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsdGhpcy5jb250ZW50LDAuMDIsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5oiq5Y+W5bCP5pWw54K55ZCOMuS9jVxyXG4gICAgY3V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHBhcnNlRmxvYXQodmFsdWUpKSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/birthday/birthday.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff095G9PHRJrpUfq02YmPYo', 'birthday');
// modules/public/script/birthday/birthday.js

"use strict";

/**
 * 玩家个人信息界面
 */
glGame.baseclass.extend({
  properties: {
    monthitem: cc.Node,
    monthcontent: cc.Node,
    mothScrollView: cc.Node,
    dayitem: cc.Node,
    daycontent: cc.Node,
    dayScrollView: cc.Node
  },
  onLoad: function onLoad() {
    this.birthMonth = 1;
    this.birthDay = 1;
    this.registerEvent();
    this.mothScrollView.on(cc.Node.EventType.TOUCH_END, this.mothtouchend, this);
    this.mothScrollView.on(cc.Node.EventType.TOUCH_CANCEL, this.mothtouchend, this);
    this.dayScrollView.on(cc.Node.EventType.TOUCH_END, this.daytouchend, this);
    this.dayScrollView.on(cc.Node.EventType.TOUCH_CANCEL, this.daytouchend, this);
    this.showBirthday();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;

      case "btn_birthday":
        this.birthday_cb();
        break;

      case "birthday_mask":
        this.birthdaymask_cb();
        break;
    }
  },
  birthdaymask_cb: function birthdaymask_cb() {
    this.remove();
  },
  //=======生日
  showBirthday: function showBirthday() {
    for (var i = 1; i < 13; i++) {
      var monthitem = cc.instantiate(this.monthitem);
      monthitem.parent = this.monthcontent;
      monthitem.active = true;
      monthitem.children[0].getComponent(cc.Label).string = i >= 10 ? "".concat(i, "\u6708") : "0".concat(i, "\u6708");
    }

    for (var _i = 1; _i < 32; _i++) {
      var dayitem = cc.instantiate(this.dayitem);
      dayitem.parent = this.daycontent;
      dayitem.active = true;
      dayitem.children[0].getComponent(cc.Label).string = _i >= 10 ? "".concat(_i, "\u65E5") : "0".concat(_i, "\u65E5");
    }
  },
  //月份滑动停止回调
  mothtouchend: function mothtouchend() {
    var top = this.monthcontent.getComponent(cc.Layout).paddingTop;
    var itemH = this.monthitem.height;
    var midPos = top + itemH / 2; //view中心点的位置

    var pos = this.mothScrollView.getComponent(cc.ScrollView).getContentPosition(); //当前content的位置

    var y = pos.y;

    if ((y - midPos) % itemH < itemH / 2) {
      y = midPos + Math.floor((y - midPos) / itemH) * itemH;
    } else {
      y = midPos + (Math.floor((y - midPos) / itemH) + 1) * itemH;
    }

    if (Math.floor((y - top) / itemH) + 1 < 1) {
      this.birthMonth = 1;
    } else if (Math.floor((y - top) / itemH) + 1 > 12) {
      this.birthMonth = 12;
    } else {
      this.birthMonth = Math.floor((y - top) / itemH) + 1;
    }

    this.mothScrollView.getComponent(cc.ScrollView).setContentPosition(cc.v2(0, y));
    this.initDayUI(this.birthMonth);
  },
  //渲染生日scrollView
  initDayUI: function initDayUI(index) {
    var daycount;

    if (index == 1 || index == 3 || index == 5 || index == 7 || index == 8 || index == 10 || index == 12) {
      daycount = 31;
    } else if (index == 4 || index == 6 || index == 9 || index == 11) {
      daycount = 30;
    } else {
      daycount = 29;
    }

    var childrenCount = this.daycontent.childrenCount;

    if (childrenCount > 29) {
      for (var i = 29; i < childrenCount;) {
        if (!this.daycontent.children[i]) break;
        this.daycontent.removeChild(this.daycontent.children[i]);
      }
    }

    for (var _i2 = 29; _i2 < daycount; _i2++) {
      var dayitem = cc.instantiate(this.dayitem);
      dayitem.parent = this.daycontent;
      dayitem.active = true;
      dayitem.children[0].getComponent(cc.Label).string = "".concat(_i2 + 1, " \u65E5");
    }

    this.daytouchend();
  },
  //日滑动停止回调
  daytouchend: function daytouchend() {
    var top = this.daycontent.getComponent(cc.Layout).paddingTop;
    var itemH = this.dayitem.height;
    var midPos = top + itemH / 2;
    var pos = this.dayScrollView.getComponent(cc.ScrollView).getContentPosition();
    var y = pos.y;

    if (y - midPos < 0) {
      y = midPos + (Math.floor((y - midPos) / itemH) + 1) * itemH;
    } else if ((y - midPos) % itemH < itemH / 2) {
      y = midPos + Math.floor((y - midPos) / itemH) * itemH;
    } else {
      y = midPos + (Math.floor((y - midPos) / itemH) + 1) * itemH;
    }

    if (Math.floor((y - top) / itemH) + 1 < 1) {
      this.birthDay = 1;
    } else if (Math.floor((y - top) / itemH) + 1 > this.daycontent.childrenCount) {
      this.birthDay = this.daycontent.childrenCount;
    } else {
      this.birthDay = Math.floor((y - top) / itemH) + 1;
    }

    this.dayScrollView.getComponent(cc.ScrollView).setContentPosition(cc.v2(0, y));
  },
  //点击生日确定
  birthday_cb: function birthday_cb() {
    if (this.birthMonth == 1 || this.birthMonth == 3 || this.birthMonth == 5 || this.birthMonth == 7 || this.birthMonth == 8 || this.birthMonth == 10 || this.birthMonth == 12) {
      if (this.birthDay > 31) return glGame.panel.showErrorTip("日期格式错误！");
    } else if (this.birthMonth == 4 || this.birthMonth == 6 || this.birthMonth == 9 || this.birthMonth == 11) {
      if (this.birthDay > 30) return glGame.panel.showErrorTip("日期格式错误！");
    } else {
      if (this.birthDay > 29) return glGame.panel.showErrorTip("日期格式错误！");
    }

    var str = "".concat(this.birthMonth, "_").concat(this.birthDay);
    glGame.emitter.emit("editBirthDay", str);
    this.remove();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {},
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGJpcnRoZGF5XFxiaXJ0aGRheS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibW9udGhpdGVtIiwiY2MiLCJOb2RlIiwibW9udGhjb250ZW50IiwibW90aFNjcm9sbFZpZXciLCJkYXlpdGVtIiwiZGF5Y29udGVudCIsImRheVNjcm9sbFZpZXciLCJvbkxvYWQiLCJiaXJ0aE1vbnRoIiwiYmlydGhEYXkiLCJyZWdpc3RlckV2ZW50Iiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJtb3RodG91Y2hlbmQiLCJUT1VDSF9DQU5DRUwiLCJkYXl0b3VjaGVuZCIsInNob3dCaXJ0aGRheSIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsInJlbW92ZSIsImJpcnRoZGF5X2NiIiwiYmlydGhkYXltYXNrX2NiIiwiaSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiYWN0aXZlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInRvcCIsIkxheW91dCIsInBhZGRpbmdUb3AiLCJpdGVtSCIsImhlaWdodCIsIm1pZFBvcyIsInBvcyIsIlNjcm9sbFZpZXciLCJnZXRDb250ZW50UG9zaXRpb24iLCJ5IiwiTWF0aCIsImZsb29yIiwic2V0Q29udGVudFBvc2l0aW9uIiwidjIiLCJpbml0RGF5VUkiLCJpbmRleCIsImRheWNvdW50IiwiY2hpbGRyZW5Db3VudCIsInJlbW92ZUNoaWxkIiwicGFuZWwiLCJzaG93RXJyb3JUaXAiLCJzdHIiLCJlbWl0dGVyIiwiZW1pdCIsInVuUmVnaXN0ZXJFdmVudCIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxT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QUFJQyxHQUFHLGFBQU0sS0FBSzdDLFVBQVgsY0FBeUIsS0FBS0MsUUFBOUIsQ0FBUDtBQUNBZCxJQUFBQSxNQUFNLENBQUMyRCxPQUFQLENBQWVDLElBQWYsQ0FBb0IsY0FBcEIsRUFBb0NGLEdBQXBDO0FBQ0EsU0FBS2hDLE1BQUw7QUFDSCxHQXpJbUI7QUEySXBCO0FBQ0FYLEVBQUFBLGFBNUlvQiwyQkE0SUosQ0FDZixDQTdJbUI7QUE4SXBCO0FBQ0E4QyxFQUFBQSxlQS9Jb0IsNkJBK0lGLENBQ2pCLENBaEptQjtBQWlKcEJDLEVBQUFBLFNBakpvQix1QkFpSlI7QUFDUixTQUFLRCxlQUFMO0FBQ0g7QUFuSm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog546p5a625Liq5Lq65L+h5oGv55WM6Z2iXHJcbiAqL1xyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbW9udGhpdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIG1vbnRoY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBtb3RoU2Nyb2xsVmlldzogY2MuTm9kZSxcclxuICAgICAgICBkYXlpdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGRheWNvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgZGF5U2Nyb2xsVmlldzogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5iaXJ0aE1vbnRoID0gMTtcclxuICAgICAgICB0aGlzLmJpcnRoRGF5ID0gMTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3RoU2Nyb2xsVmlldy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMubW90aHRvdWNoZW5kLCB0aGlzKVxyXG4gICAgICAgIHRoaXMubW90aFNjcm9sbFZpZXcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLm1vdGh0b3VjaGVuZCwgdGhpcylcclxuICAgICAgICB0aGlzLmRheVNjcm9sbFZpZXcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmRheXRvdWNoZW5kLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuZGF5U2Nyb2xsVmlldy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuZGF5dG91Y2hlbmQsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5zaG93QmlydGhkYXkoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYmlydGhkYXlcIjogdGhpcy5iaXJ0aGRheV9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJpcnRoZGF5X21hc2tcIjogdGhpcy5iaXJ0aGRheW1hc2tfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiaXJ0aGRheW1hc2tfY2IoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICAvLz09PT09PT3nlJ/ml6VcclxuICAgIHNob3dCaXJ0aGRheSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnRoaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW9udGhpdGVtKTtcclxuICAgICAgICAgICAgbW9udGhpdGVtLnBhcmVudCA9IHRoaXMubW9udGhjb250ZW50O1xyXG4gICAgICAgICAgICBtb250aGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbW9udGhpdGVtLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaSA+PSAxMCA/IGAke2l95pyIYCA6IGAwJHtpfeaciGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDMyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRheWl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmRheWl0ZW0pO1xyXG4gICAgICAgICAgICBkYXlpdGVtLnBhcmVudCA9IHRoaXMuZGF5Y29udGVudDtcclxuICAgICAgICAgICAgZGF5aXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXlpdGVtLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaSA+PSAxMCA/IGAke2l95pelYCA6IGAwJHtpfeaXpWA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5pyI5Lu95ruR5Yqo5YGc5q2i5Zue6LCDXHJcbiAgICBtb3RodG91Y2hlbmQoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubW9udGhjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnBhZGRpbmdUb3A7XHJcbiAgICAgICAgbGV0IGl0ZW1IID0gdGhpcy5tb250aGl0ZW0uaGVpZ2h0O1xyXG4gICAgICAgIGxldCBtaWRQb3MgPSB0b3AgKyBpdGVtSCAvIDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmlld+S4reW/g+eCueeahOS9jee9rlxyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm1vdGhTY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5nZXRDb250ZW50UG9zaXRpb24oKTsgICAgIC8v5b2T5YmNY29udGVudOeahOS9jee9rlxyXG4gICAgICAgIGxldCB5ID0gcG9zLnk7XHJcblxyXG4gICAgICAgIGlmICgoKHkgLSBtaWRQb3MpICUgaXRlbUgpIDwgaXRlbUggLyAyKSB7XHJcbiAgICAgICAgICAgIHkgPSBtaWRQb3MgKyAoKE1hdGguZmxvb3IoKHkgLSBtaWRQb3MpIC8gaXRlbUgpKSAqIGl0ZW1IKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5ID0gbWlkUG9zICsgKE1hdGguZmxvb3IoKHkgLSBtaWRQb3MpIC8gaXRlbUgpICsgMSkgKiBpdGVtSDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoTWF0aC5mbG9vcigoeSAtIHRvcCkgLyBpdGVtSCkgKyAxKSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5iaXJ0aE1vbnRoID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKChNYXRoLmZsb29yKCh5IC0gdG9wKSAvIGl0ZW1IKSArIDEpID4gMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5iaXJ0aE1vbnRoID0gMTI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5iaXJ0aE1vbnRoID0gTWF0aC5mbG9vcigoeSAtIHRvcCkgLyBpdGVtSCkgKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3RoU2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2V0Q29udGVudFBvc2l0aW9uKGNjLnYyKDAsIHkpKTtcclxuICAgICAgICB0aGlzLmluaXREYXlVSSh0aGlzLmJpcnRoTW9udGgpO1xyXG4gICAgfSxcclxuICAgIC8v5riy5p+T55Sf5pelc2Nyb2xsVmlld1xyXG4gICAgaW5pdERheVVJKGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGRheWNvdW50O1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAxIHx8IGluZGV4ID09IDMgfHwgaW5kZXggPT0gNSB8fCBpbmRleCA9PSA3IHx8IGluZGV4ID09IDggfHwgaW5kZXggPT0gMTAgfHwgaW5kZXggPT0gMTIpIHtcclxuICAgICAgICAgICAgZGF5Y291bnQgPSAzMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09IDQgfHwgaW5kZXggPT0gNiB8fCBpbmRleCA9PSA5IHx8IGluZGV4ID09IDExKSB7XHJcbiAgICAgICAgICAgIGRheWNvdW50ID0gMzA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGF5Y291bnQgPSAyOVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2hpbGRyZW5Db3VudCA9IHRoaXMuZGF5Y29udGVudC5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmIChjaGlsZHJlbkNvdW50ID4gMjkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI5OyBpIDwgY2hpbGRyZW5Db3VudDspIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXljb250ZW50LmNoaWxkcmVuW2ldKSBicmVhaztcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF5Y29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmRheWNvbnRlbnQuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAyOTsgaSA8IGRheWNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRheWl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmRheWl0ZW0pO1xyXG4gICAgICAgICAgICBkYXlpdGVtLnBhcmVudCA9IHRoaXMuZGF5Y29udGVudDtcclxuICAgICAgICAgICAgZGF5aXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXlpdGVtLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aSArIDF9IOaXpWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF5dG91Y2hlbmQoKTtcclxuICAgIH0sXHJcbiAgICAvL+aXpea7keWKqOWBnOatouWbnuiwg1xyXG4gICAgZGF5dG91Y2hlbmQoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuZGF5Y29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5wYWRkaW5nVG9wO1xyXG4gICAgICAgIGxldCBpdGVtSCA9IHRoaXMuZGF5aXRlbS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IG1pZFBvcyA9IHRvcCArIGl0ZW1IIC8gMjsgXHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZGF5U2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHkgPSBwb3MueTtcclxuICAgICAgICBpZiAoKHkgLSBtaWRQb3MpIDwgMCkge1xyXG4gICAgICAgICAgICB5ID0gbWlkUG9zICsgKChNYXRoLmZsb29yKCh5IC0gbWlkUG9zKSAvIGl0ZW1IKSArIDEpICogaXRlbUgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKCh5IC0gbWlkUG9zKSAlIGl0ZW1IKSA8IGl0ZW1IIC8gMikge1xyXG4gICAgICAgICAgICB5ID0gbWlkUG9zICsgKChNYXRoLmZsb29yKCh5IC0gbWlkUG9zKSAvIGl0ZW1IKSkgKiBpdGVtSCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeSA9IG1pZFBvcyArIChNYXRoLmZsb29yKCh5IC0gbWlkUG9zKSAvIGl0ZW1IKSArIDEpICogaXRlbUg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKE1hdGguZmxvb3IoKHkgLSB0b3ApIC8gaXRlbUgpICsgMSkgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlydGhEYXkgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKE1hdGguZmxvb3IoKHkgLSB0b3ApIC8gaXRlbUgpICsgMSkgPiB0aGlzLmRheWNvbnRlbnQuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmJpcnRoRGF5ID0gdGhpcy5kYXljb250ZW50LmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5iaXJ0aERheSA9IE1hdGguZmxvb3IoKHkgLSB0b3ApIC8gaXRlbUgpICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXlTY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zZXRDb250ZW50UG9zaXRpb24oY2MudjIoMCwgeSkpO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye755Sf5pel56Gu5a6aXHJcbiAgICBiaXJ0aGRheV9jYigpIHtcclxuICAgICAgICBpZiAodGhpcy5iaXJ0aE1vbnRoID09IDEgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDMgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDUgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDdcclxuICAgICAgICAgICAgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDggfHwgdGhpcy5iaXJ0aE1vbnRoID09IDEwIHx8IHRoaXMuYmlydGhNb250aCA9PSAxMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iaXJ0aERheSA+IDMxKSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChcIuaXpeacn+agvOW8j+mUmeivr++8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5iaXJ0aE1vbnRoID09IDQgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDYgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDkgfHwgdGhpcy5iaXJ0aE1vbnRoID09IDExKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpcnRoRGF5ID4gMzApIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKFwi5pel5pyf5qC85byP6ZSZ6K+v77yBXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpcnRoRGF5ID4gMjkpIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKFwi5pel5pyf5qC85byP6ZSZ6K+v77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RyID0gYCR7dGhpcy5iaXJ0aE1vbnRofV8ke3RoaXMuYmlydGhEYXl9YFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJlZGl0QmlydGhEYXlcIiwgc3RyKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDms6jlhoznlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICB9LFxyXG4gICAgLy8g6ZSA5q+B55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
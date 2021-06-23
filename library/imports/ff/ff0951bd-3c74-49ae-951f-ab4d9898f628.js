"use strict";
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
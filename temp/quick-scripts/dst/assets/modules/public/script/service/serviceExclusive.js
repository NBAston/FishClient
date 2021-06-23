
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/service/serviceExclusive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1705dDvbrRKS6iidgaYoRtF', 'serviceExclusive');
// modules/public/script/service/serviceExclusive.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_item: cc.Node,
    node_content: cc.Node,
    node_copyid: cc.Node,
    label_copyid: cc.Label,
    scrollView: cc.ScrollView
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.isShop = false;
    this.node.active = false; // this.node_copyid.active = !glGame.user.isTourist();
    // if (this.node_copyid.active) this.label_copyid.string = "" + glGame.user.get("logicID");

    this.label_copyid.string = "" + glGame.user.get("logicID");
  },
  refPayData: function refPayData() {
    this.node.active = true;
    glGame.user.reqCustomServer(1, 1, true);
  },
  registerEvent: function registerEvent() {
    // 监听scrollView的滚动事件
    this.scrollView.node.on("scroll-to-left", this.scrollLeftCb, this);
    this.scrollView.node.on("scroll-to-right", this.scrollRigthCb, this);
    glGame.emitter.on("updateCustomServer", this.customData, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateCustomServer", this);
  },
  scrollLeftCb: function scrollLeftCb(scrollView) {
    // cc.log("**********************************触摸到Left，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_r").active = true;
  },
  scrollRigthCb: function scrollRigthCb(scrollView) {
    // 回调的参数是 ScrollView 组件
    // do whatever you want with scrollview
    // cc.log("**********************************触摸到Rigth，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_l").active = true;
  },
  onClick: function onClick(name, node) {
    for (var i = 0; i < this.ExclusiveInfoList.length; i++) {
      if (name == "jump".concat(i)) {
        var Url = this.ExclusiveInfoList[i].url;
        glGame.platform.openURL(Url); //cc.sys.openURL(Url)
      }

      if (name == "copy".concat(i)) {
        var enumber = this.ExclusiveInfoList[i].contact;
        glGame.platform.copyToClip(enumber, '');
      }
    }

    switch (name) {
      case "btn_cpid":
        glGame.platform.copyToClip("" + glGame.user.get("logicID"), "");
        break;

      case "jiantou_l":
      case "jiantou_r":
        console.log("点击了按钮");
        this.executionScrollTo(name);
        break;

      default:
        break;
    }
  },
  executionScrollTo: function executionScrollTo(name) {
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;

    if (name == "jiantou_l") {
      this.node.getChildByName("jiantou_r").active = true;
      this.scrollView.scrollToLeft(0.1);
    } else {
      this.node.getChildByName("jiantou_l").active = true;
      this.scrollView.scrollToRight(0.1);
    }
  },
  customData: function customData() {
    this.severice = glGame.user.get("customSever");
    this.initExclusiveInfo();
  },
  initExclusiveInfo: function initExclusiveInfo() {
    if (this.severice.page > 1) return;
    this.ExclusiveInfoList = this.isShop ? this.serviceData : this.severice.exclusive;
    if (!this.ExclusiveInfoList) return;
    var m_width = this.ExclusiveInfoList.length * this.node_item.width + (this.ExclusiveInfoList.length - 1) * 97 + 180 > this.scrollView.node.width;

    if (this.ExclusiveInfoList.length > 0 && m_width) {
      this.node.getChildByName("jiantou_r").active = true;
    }

    for (var i = 0; i < this.ExclusiveInfoList.length; i++) {
      var item = cc.instantiate(this.node_item);
      item.parent = this.node_content;
      if (this.ExclusiveInfoList[i].avatar) glGame.panel.showRemoteImage(item.getChildByName('mask').getChildByName('head'), this.ExclusiveInfoList[i].avatar); //if (this.ExclusiveInfoList[i].avatar) glGame.panel.showRemoteImage(item.getChildByName('img_qrcode'), this.ExclusiveInfoList[i].qrCodeUrl);

      item.getChildByName('img_qqkefutubiao').active = this.ExclusiveInfoList[i].contactType == 2;
      item.getChildByName('img_wechatkefutubiao').active = this.ExclusiveInfoList[i].contactType == 1;
      item.getChildByName('name').getComponent(cc.Label).string = this.ExclusiveInfoList[i].name;
      var haoma = this.ExclusiveInfoList[i].contact.length > 11 ? this.ExclusiveInfoList[i].contact.substring(this.ExclusiveInfoList[i].contact.length - 9) : this.ExclusiveInfoList[i].contact;
      item.getChildByName('haoma').getComponent(cc.Label).string = haoma;
      item.getChildByName('jumpto').name = "jump".concat(i);
      item.getChildByName('copy').name = "copy".concat(i);
      item.active = true;
    }
  },
  start: function start() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNlcnZpY2VcXHNlcnZpY2VFeGNsdXNpdmUuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsIm5vZGVfaXRlbSIsImNjIiwiTm9kZSIsIm5vZGVfY29udGVudCIsIm5vZGVfY29weWlkIiwibGFiZWxfY29weWlkIiwiTGFiZWwiLCJzY3JvbGxWaWV3IiwiU2Nyb2xsVmlldyIsIm9uTG9hZCIsInJlZ2lzdGVyRXZlbnQiLCJpc1Nob3AiLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwidXNlciIsImdldCIsInJlZlBheURhdGEiLCJyZXFDdXN0b21TZXJ2ZXIiLCJvbiIsInNjcm9sbExlZnRDYiIsInNjcm9sbFJpZ3RoQ2IiLCJlbWl0dGVyIiwiY3VzdG9tRGF0YSIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsImdldENoaWxkQnlOYW1lIiwib25DbGljayIsIm5hbWUiLCJpIiwiRXhjbHVzaXZlSW5mb0xpc3QiLCJsZW5ndGgiLCJVcmwiLCJ1cmwiLCJwbGF0Zm9ybSIsIm9wZW5VUkwiLCJlbnVtYmVyIiwiY29udGFjdCIsImNvcHlUb0NsaXAiLCJjb25zb2xlIiwibG9nIiwiZXhlY3V0aW9uU2Nyb2xsVG8iLCJzY3JvbGxUb0xlZnQiLCJzY3JvbGxUb1JpZ2h0Iiwic2V2ZXJpY2UiLCJpbml0RXhjbHVzaXZlSW5mbyIsInBhZ2UiLCJzZXJ2aWNlRGF0YSIsImV4Y2x1c2l2ZSIsIm1fd2lkdGgiLCJ3aWR0aCIsIml0ZW0iLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImF2YXRhciIsInBhbmVsIiwic2hvd1JlbW90ZUltYWdlIiwiY29udGFjdFR5cGUiLCJnZXRDb21wb25lbnQiLCJoYW9tYSIsInN1YnN0cmluZyIsInN0YXJ0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxNQUFNLENBQUNDLFNBQVAsQ0FB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QUFBQSxJQUFJLENBQUN6QixjQUFMLENBQW9CLE9BQXBCLEVBQTZCZ0MsWUFBN0IsQ0FBMEN6RCxFQUFFLENBQUNLLEtBQTdDLEVBQW9EUSxNQUFwRCxHQUE2RDZDLEtBQTdEO0FBQ0FSLE1BQUFBLElBQUksQ0FBQ3pCLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEJFLElBQTlCLGlCQUE0Q0MsQ0FBNUM7QUFDQXNCLE1BQUFBLElBQUksQ0FBQ3pCLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEJFLElBQTVCLGlCQUEwQ0MsQ0FBMUM7QUFDQXNCLE1BQUFBLElBQUksQ0FBQ3RDLE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUFDSixHQS9HbUI7QUFpSHBCZ0QsRUFBQUEsS0FqSG9CLG1CQWlIWixDQUVQLENBbkhtQjtBQXFIcEJDLEVBQUFBLFNBckhvQix1QkFxSFI7QUFDUixTQUFLdEMsZUFBTDtBQUNILEdBdkhtQixDQXdIcEI7O0FBeEhvQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbm9kZV9pdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBub2RlX2NvcHlpZDogY2MuTm9kZSxcclxuICAgICAgICBsYWJlbF9jb3B5aWQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmlzU2hvcCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlX2NvcHlpZC5hY3RpdmUgPSAhZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMubm9kZV9jb3B5aWQuYWN0aXZlKSB0aGlzLmxhYmVsX2NvcHlpZC5zdHJpbmcgPSBcIlwiICsgZ2xHYW1lLnVzZXIuZ2V0KFwibG9naWNJRFwiKTtcclxuICAgICAgICB0aGlzLmxhYmVsX2NvcHlpZC5zdHJpbmcgPSBcIlwiICsgZ2xHYW1lLnVzZXIuZ2V0KFwibG9naWNJRFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVmUGF5RGF0YSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBnbEdhbWUudXNlci5yZXFDdXN0b21TZXJ2ZXIoMSwgMSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgLy8g55uR5ZCsc2Nyb2xsVmlld+eahOa7muWKqOS6i+S7tlxyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLm9uKFwic2Nyb2xsLXRvLWxlZnRcIiwgdGhpcy5zY3JvbGxMZWZ0Q2IsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLm9uKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMuc2Nyb2xsUmlndGhDYiwgdGhpcyk7XHJcblxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlQ3VzdG9tU2VydmVyXCIsIHRoaXMuY3VzdG9tRGF0YSwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZUN1c3RvbVNlcnZlclwiLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICBzY3JvbGxMZWZ0Q2Ioc2Nyb2xsVmlldyl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuinpuaRuOWIsExlZnTvvIzlj43lvLnlh73mlbBcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdV9sXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImppYW50b3VfclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJqaWFudG91X3JcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBzY3JvbGxSaWd0aENiKHNjcm9sbFZpZXcpIHtcclxuICAgICAgICAvLyDlm57osIPnmoTlj4LmlbDmmK8gU2Nyb2xsVmlldyDnu4Tku7ZcclxuICAgICAgICAvLyBkbyB3aGF0ZXZlciB5b3Ugd2FudCB3aXRoIHNjcm9sbHZpZXdcclxuICAgICAgICAvLyBjYy5sb2coXCIqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6Kem5pG45YiwUmlndGjvvIzlj43lvLnlh73mlbBcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdV9sXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImppYW50b3VfclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJqaWFudG91X2xcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IGBqdW1wJHtpfWApIHtcclxuICAgICAgICAgICAgICAgIGxldCBVcmwgPSAgdGhpcy5FeGNsdXNpdmVJbmZvTGlzdFtpXS51cmw7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGxhdGZvcm0ub3BlblVSTChVcmwpXHJcbiAgICAgICAgICAgICAgICAvL2NjLnN5cy5vcGVuVVJMKFVybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSBgY29weSR7aX1gKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW51bWJlciA9IHRoaXMuRXhjbHVzaXZlSW5mb0xpc3RbaV0uY29udGFjdFxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBsYXRmb3JtLmNvcHlUb0NsaXAoZW51bWJlciwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2NwaWRcIjogZ2xHYW1lLnBsYXRmb3JtLmNvcHlUb0NsaXAoXCJcIiArIGdsR2FtZS51c2VyLmdldChcImxvZ2ljSURcIiksIFwiXCIpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImppYW50b3VfbFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiamlhbnRvdV9yXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+S6huaMiemSrlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0aW9uU2Nyb2xsVG8obmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBleGVjdXRpb25TY3JvbGxUbyhuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiamlhbnRvdV9sXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImppYW50b3VfclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJqaWFudG91X2xcIikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJqaWFudG91X3JcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgwLjEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImppYW50b3VfbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9SaWdodCgwLjEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3VzdG9tRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNldmVyaWNlID0gZ2xHYW1lLnVzZXIuZ2V0KFwiY3VzdG9tU2V2ZXJcIik7XHJcbiAgICAgICAgdGhpcy5pbml0RXhjbHVzaXZlSW5mbygpXHJcbiAgICB9LFxyXG4gICAgaW5pdEV4Y2x1c2l2ZUluZm8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V2ZXJpY2UucGFnZSA+IDEpIHJldHVybjtcclxuICAgICAgICB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0ID0gdGhpcy5pc1Nob3AgPyB0aGlzLnNlcnZpY2VEYXRhIDogdGhpcy5zZXZlcmljZS5leGNsdXNpdmU7XHJcbiAgICAgICAgaWYgKCF0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0KSByZXR1cm47XHJcbiAgICAgICAgbGV0IG1fd2lkdGggPSB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0Lmxlbmd0aCAqIHRoaXMubm9kZV9pdGVtLndpZHRoICsgKHRoaXMuRXhjbHVzaXZlSW5mb0xpc3QubGVuZ3RoLTEpICogOTcgKyAxODAgPiB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aFxyXG4gICAgICAgIGlmICh0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0Lmxlbmd0aCA+IDAgJiYgbV93aWR0aCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJqaWFudG91X3JcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX2l0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMubm9kZV9jb250ZW50O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5FeGNsdXNpdmVJbmZvTGlzdFtpXS5hdmF0YXIpIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UoaXRlbS5nZXRDaGlsZEJ5TmFtZSgnbWFzaycpLmdldENoaWxkQnlOYW1lKCdoZWFkJyksIHRoaXMuRXhjbHVzaXZlSW5mb0xpc3RbaV0uYXZhdGFyKTtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5FeGNsdXNpdmVJbmZvTGlzdFtpXS5hdmF0YXIpIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UoaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaW1nX3FyY29kZScpLCB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0W2ldLnFyQ29kZVVybCk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2ltZ19xcWtlZnV0dWJpYW8nKS5hY3RpdmUgPSB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0W2ldLmNvbnRhY3RUeXBlID09IDI7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2ltZ193ZWNoYXRrZWZ1dHViaWFvJykuYWN0aXZlID0gdGhpcy5FeGNsdXNpdmVJbmZvTGlzdFtpXS5jb250YWN0VHlwZSA9PSAxO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCduYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIGxldCBoYW9tYSA9IHRoaXMuRXhjbHVzaXZlSW5mb0xpc3RbaV0uY29udGFjdC5sZW5ndGg+MTE/dGhpcy5FeGNsdXNpdmVJbmZvTGlzdFtpXS5jb250YWN0LnN1YnN0cmluZyh0aGlzLkV4Y2x1c2l2ZUluZm9MaXN0W2ldLmNvbnRhY3QubGVuZ3RoLTkpOnRoaXMuRXhjbHVzaXZlSW5mb0xpc3RbaV0uY29udGFjdFxyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdoYW9tYScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaGFvbWE7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2p1bXB0bycpLm5hbWUgPSBganVtcCR7aX1gXHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvcHknKS5uYW1lID0gYGNvcHkke2l9YFxyXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
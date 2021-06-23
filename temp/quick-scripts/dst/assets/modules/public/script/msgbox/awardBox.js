
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/awardBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f7fbUOldJOy5MdmGOVDUT6', 'awardBox');
// modules/public/script/msgbox/awardBox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    title: cc.Label,
    coin: cc.Label,
    score: cc.Label,
    activeLevel: cc.Label,
    diamond: cc.Label,
    node_coin: cc.Node,
    node_score: cc.Node,
    node_activeLevel: cc.Node,
    node_diamond: cc.Node,
    sp_frame: sp.Skeleton,
    audio_reward: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    this.next = null;
    this.node_coin.active = false;
    this.node_score.active = false;
    this.node_activeLevel.active = false;
    this.registerEvent();
    glGame.audio.playSoundEffect(this.audio_reward, true);
    this.sp_frame.setCompleteListener(function () {
      _this.node.getChildByName("btn_confirm").getComponent(cc.Button).interactable = true;
    });
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * @param title         标题
   * @param awarddata     奖励类型列表（详见glGame.awardtype）金币，夺宝积分，任务活跃，钻石
   * @param next          回调函数
   */
  showMsg: function showMsg(title, awarddata, next) {
    this.title.string = title;

    for (var index in awarddata) {
      var award = awarddata[index];
      console.log("这是当前的显示消息", award, glGame.user.get("roomSwitch"));
      if (!award) continue;

      if (award.type == glGame.awardtype.COIN) {
        this.node_coin.active = true;
        this.coin.string = typeof award.value != "string" ? award.value.toString() : award.value;
      } else if (award.type == glGame.awardtype.SCORE) {
        this.node_score.active = true;
        this.score.string = typeof award.value != "string" ? award.value.toString() : award.value;
      } else if (award.type == glGame.awardtype.VITALITY) {
        this.node_activeLevel.active = true;
        this.activeLevel.string = typeof award.value != "string" ? award.value.toString() : award.value;
      } else if (award.type == glGame.awardtype.DIAMOND && glGame.user.get("roomSwitch") == 1) {
        this.node_diamond.active = true;
        this.diamond.string = typeof award.value != "string" ? award.value.toString() : award.value;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcYXdhcmRCb3guanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsInRpdGxlIiwiY2MiLCJMYWJlbCIsImNvaW4iLCJzY29yZSIsImFjdGl2ZUxldmVsIiwiZGlhbW9uZCIsIm5vZGVfY29pbiIsIk5vZGUiLCJub2RlX3Njb3JlIiwibm9kZV9hY3RpdmVMZXZlbCIsIm5vZGVfZGlhbW9uZCIsInNwX2ZyYW1lIiwic3AiLCJTa2VsZXRvbiIsImF1ZGlvX3Jld2FyZCIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJuZXh0IiwiYWN0aXZlIiwicmVnaXN0ZXJFdmVudCIsImF1ZGlvIiwicGxheVNvdW5kRWZmZWN0Iiwic2V0Q29tcGxldGVMaXN0ZW5lciIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInVuUmVnaXN0ZXJFdmVudCIsIk9uRGVzdHJveSIsIm9uQ2xpY2siLCJuYW1lIiwiY29uZmlybSIsImNvbnNvbGUiLCJlcnJvciIsInNob3dNc2ciLCJhd2FyZGRhdGEiLCJzdHJpbmciLCJpbmRleCIsImF3YXJkIiwibG9nIiwidXNlciIsImdldCIsImF3YXJkdHlwZSIsIkNPSU4iLCJ2YWx1ZSIsInRvU3RyaW5nIiwiU0NPUkUiLCJWSVRBTElUWSIsIkRJQU1PTkQiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUVDLEVBQUUsQ0FBQ0MsS0FERjtBQUVSQyxJQUFBQSxJQUFJLEVBQUVGLEVBQUUsQ0FBQ0MsS0FGRDtBQUdSRSxJQUFBQSxLQUFLLEVBQUVILEVBQUUsQ0FBQ0MsS0FIRjtB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O0FBN0VtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRpdGxlOiBjYy5MYWJlbCxcclxuICAgICAgICBjb2luOiBjYy5MYWJlbCxcclxuICAgICAgICBzY29yZTogY2MuTGFiZWwsXHJcbiAgICAgICAgYWN0aXZlTGV2ZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGRpYW1vbmQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIG5vZGVfY29pbjogY2MuTm9kZSxcclxuICAgICAgICBub2RlX3Njb3JlOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfYWN0aXZlTGV2ZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9kaWFtb25kOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNwX2ZyYW1lOiBzcC5Ta2VsZXRvbixcclxuICAgICAgICBhdWRpb19yZXdhcmQ6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vZGVfY29pbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGVfc2NvcmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlX2FjdGl2ZUxldmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5U291bmRFZmZlY3QodGhpcy5hdWRpb19yZXdhcmQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc3BfZnJhbWUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fY29uZmlybVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkgeyB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkgeyB9LFxyXG5cclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY29uZmlybVwiOiB0aGlzLmNvbmZpcm0oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0aXRsZSAgICAgICAgIOagh+mimFxyXG4gICAgICogQHBhcmFtIGF3YXJkZGF0YSAgICAg5aWW5Yqx57G75Z6L5YiX6KGo77yI6K+m6KeBZ2xHYW1lLmF3YXJkdHlwZe+8iemHkeW4ge+8jOWkuuWuneenr+WIhu+8jOS7u+WKoea0u+i3g++8jOmSu+efs1xyXG4gICAgICogQHBhcmFtIG5leHQgICAgICAgICAg5Zue6LCD5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHNob3dNc2codGl0bGUsIGF3YXJkZGF0YSwgbmV4dCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUuc3RyaW5nID0gdGl0bGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIGF3YXJkZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgYXdhcmQgPSBhd2FyZGRhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOaYvuekuua2iOaBr1wiLGF3YXJkLGdsR2FtZS51c2VyLmdldChcInJvb21Td2l0Y2hcIikpXHJcbiAgICAgICAgICAgIGlmICghYXdhcmQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoYXdhcmQudHlwZSA9PSBnbEdhbWUuYXdhcmR0eXBlLkNPSU4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZV9jb2luLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4uc3RyaW5nID0gdHlwZW9mIGF3YXJkLnZhbHVlICE9IFwic3RyaW5nXCIgPyBhd2FyZC52YWx1ZS50b1N0cmluZygpIDogYXdhcmQudmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXdhcmQudHlwZSA9PSBnbEdhbWUuYXdhcmR0eXBlLlNDT1JFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVfc2NvcmUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gdHlwZW9mIGF3YXJkLnZhbHVlICE9IFwic3RyaW5nXCIgPyBhd2FyZC52YWx1ZS50b1N0cmluZygpIDogYXdhcmQudmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXdhcmQudHlwZSA9PSBnbEdhbWUuYXdhcmR0eXBlLlZJVEFMSVRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVfYWN0aXZlTGV2ZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTGV2ZWwuc3RyaW5nID0gdHlwZW9mIGF3YXJkLnZhbHVlICE9IFwic3RyaW5nXCIgPyBhd2FyZC52YWx1ZS50b1N0cmluZygpIDogYXdhcmQudmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXdhcmQudHlwZSA9PSBnbEdhbWUuYXdhcmR0eXBlLkRJQU1PTkQmJmdsR2FtZS51c2VyLmdldChcInJvb21Td2l0Y2hcIikgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlX2RpYW1vbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbW9uZC5zdHJpbmcgPSB0eXBlb2YgYXdhcmQudmFsdWUgIT0gXCJzdHJpbmdcIiA/IGF3YXJkLnZhbHVlLnRvU3RyaW5nKCkgOiBhd2FyZC52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgLy/op6blj5Hlm57osIPlh73mlbBcclxuICAgIGNvbmZpcm0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dCAhPSBudWxsKSB0aGlzLm5leHQoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59KTtcclxuIl19

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/plaza_hall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfebbxm3CdCULfG91WAEnKc', 'plaza_hall');
// modules/plaza/script/prefab/plaza_hall.js

"use strict";

// 设置背景图对应关系
var bgImg = ["chessCard", "fishing", "arcade", "realPerson", "lottery", "sports", "compete", "room", "hot"];
glGame.baseclass.extend({
  properties: {
    audio_welcome: {
      type: cc.AudioClip,
      "default": null
    },
    prefab_up: cc.Prefab,
    prefab_center: cc.Prefab,
    prefab_comprehensive: cc.Prefab,
    prefab_down: cc.Prefab,
    prefab_arrvalTip: cc.Prefab,
    sprite_bg: cc.Sprite,
    bg_list: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    if (!glGame.user.get("url")) {
      glGame.user.reqUrl();
    }

    this.bgIndex = 0;
    glGame.panel.closeLoading();

    if (glGame.isfirstEnterPlaza) {
      glGame.audio.playSoundEffect(this.audio_welcome, true);
    }

    glGame.emitter.on(MESSAGE.UI.PLAZA_OPEN, this.plazaOpen, this);
    glGame.emitter.on("setplazabg", this.setPlazaBg, this);
    glGame.emitter.emit(MESSAGE.UI.SCENE); //大厅主要预支初始化

    var gameDisplayType = glGame.user.get("gameDisplayType");

    if (gameDisplayType == 2) {
      // 综合版
      glGame.panel.showChildPanel(this.prefab_comprehensive, this.node); // glGame.panel.showPanelByName("comprehensive");
    } else {
      // 棋牌版
      glGame.panel.showChildPanel(this.prefab_center, this.node); // glGame.panel.showPanelByName("center");
    }

    glGame.panel.showChildPanel(this.prefab_up, this.node);
    glGame.panel.showChildPanel(this.prefab_down, this.node);
    var arrvalTip = glGame.panel.showPanel(this.prefab_arrvalTip);
    arrvalTip.zIndex = 99;
    cc.sys.localStorage.removeItem("isAudioPlay");
  },
  plazaOpen: function plazaOpen(nodeName) {
    if (nodeName) {
      this.node.active = true;
      return;
    }
  },
  setPlazaBg: function setPlazaBg(data) {
    if (data && data.name != null) {
      for (var i = 0; i < bgImg.length; i++) {
        if (data.name == bgImg[i]) {
          this.sprite_bg.spriteFrame = this.bg_list[i]; // let gamegroup = this.node//.getChildByName("").getChildByName("gamegroup").width;

          var width = cc.winSize.width - data.width - 15;
          this.sprite_bg.node.getComponent(cc.Widget).left = data.width - 19;
          this.sprite_bg.node.getComponent(cc.Widget).updateAlignment();
          var bg_width = this.sprite_bg.node.width;

          if (width >= bg_width) {
            this.sprite_bg.node.width = width;
          }
        }
      } // let bgIndex = data.index >= this.bg_list.lenght ? 0 : data.index;
      // if (this.bgIndex != bgIndex) {
      //     this.sprite_bg.spriteFrame = this.bg_list[this.bgIndex];
      // }

    } else {
      this.sprite_bg.node.active = false;
    }
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.PLAZA_OPEN, this);
    glGame.emitter.off("setplazabg", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwbGF6YV9oYWxsLmpzIl0sIm5hbWVzIjpbImJnSW1nIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImF1ZGlvX3dlbGNvbWUiLCJ0eXBlIiwiY2MiLCJBdWRpb0NsaXAiLCJwcmVmYWJfdXAiLCJQcmVmYWIiLCJwcmVmYWJfY2VudGVyIiwicHJlZmFiX2NvbXByZWhlbnNpdmUiLCJwcmVmYWJfZG93biIsInByZWZhYl9hcnJ2YWxUaXAiLCJzcHJpdGVfYmciLCJTcHJpdGUiLCJiZ19saXN0IiwiU3ByaXRlRnJhbWUiLCJvbkxvYWQiLCJ1c2VyIiwiZ2V0IiwicmVxVXJsIiwiYmdJbmRleCIsInBhbmVsIiwiY2xvc2VMb2FkaW5nIiwiaXNmaXJzdEVudGVyUGxhemEiLCJhdWRpbyIsInBsYXlTb3VuZEVmZmVjdCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlBMQVpBX09QRU4iLCJwbGF6YU9wZW4iLCJzZXRQbGF6YUJnIiwiZW1pdCIsIlNDRU5FIiwiZ2FtZURpc3BsYXlUeXBlIiwic2hvd0NoaWxkUGFuZWwiLCJub2RlIiwiYXJydmFsVGlwIiwic2hvd1BhbmVsIiwiekluZGV4Iiwic3lzIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsIm5vZGVOYW1lIiwiYWN0aXZlIiwiZGF0YSIsIm5hbWUiLCJpIiwibGVuZ3RoIiwic3ByaXRlRnJhbWUiLCJ3aWR0aCIsIndpblNpemUiLCJnZXRDb21wb25lbnQiLCJXaWRnZXQiLCJsZWZ0IiwidXBkYXRlQWxpZ25tZW50IiwiYmdfd2lkdGgiLCJPbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFNQSxLQUFLLEdBQUcsQ0FBQyxXQUFELEVBQWEsU0FBYixFQUF1QixRQUF2QixFQUFnQyxZQUFoQyxFQUE2QyxTQUE3QyxFQUF1RCxRQUF2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QW1CTztBQUNILFdBQUt2QyxTQUFMLENBQWV5QixJQUFmLENBQW9CUSxNQUFwQixHQUE2QixLQUE3QjtBQUNIO0FBQ0osR0FsRm1CO0FBb0ZwQmEsRUFBQUEsU0FwRm9CLHVCQW9GUjtBQUNSNUQsSUFBQUEsTUFBTSxDQUFDNEIsT0FBUCxDQUFlaUMsR0FBZixDQUFtQi9CLE9BQU8sQ0FBQ0MsRUFBUixDQUFXQyxVQUE5QixFQUEwQyxJQUExQztBQUNBaEMsSUFBQUEsTUFBTSxDQUFDNEIsT0FBUCxDQUFlaUMsR0FBZixDQUFtQixZQUFuQixFQUFpQyxJQUFqQztBQUNIO0FBdkZtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6K6+572u6IOM5pmv5Zu+5a+55bqU5YWz57O7XHJcbmNvbnN0IGJnSW1nID0gW1wiY2hlc3NDYXJkXCIsXCJmaXNoaW5nXCIsXCJhcmNhZGVcIixcInJlYWxQZXJzb25cIixcImxvdHRlcnlcIixcInNwb3J0c1wiLFwiY29tcGV0ZVwiLFwicm9vbVwiLFwiaG90XCIsXVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvX3dlbGNvbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmVmYWJfdXA6IGNjLlByZWZhYixcclxuICAgICAgICBwcmVmYWJfY2VudGVyOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcHJlZmFiX2NvbXByZWhlbnNpdmU6IGNjLlByZWZhYixcclxuICAgICAgICBwcmVmYWJfZG93bjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHByZWZhYl9hcnJ2YWxUaXA6IGNjLlByZWZhYixcclxuICAgICAgICBzcHJpdGVfYmc6IGNjLlNwcml0ZSxcclxuICAgICAgICBiZ19saXN0OiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAgIGlmICghZ2xHYW1lLnVzZXIuZ2V0KFwidXJsXCIpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcVVybCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJnSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuY2xvc2VMb2FkaW5nKCk7XHJcbiAgICAgICAgaWYgKGdsR2FtZS5pc2ZpcnN0RW50ZXJQbGF6YSkge1xyXG4gICAgICAgICAgICBnbEdhbWUuYXVkaW8ucGxheVNvdW5kRWZmZWN0KHRoaXMuYXVkaW9fd2VsY29tZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUExBWkFfT1BFTiwgdGhpcy5wbGF6YU9wZW4sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwic2V0cGxhemFiZ1wiLCB0aGlzLnNldFBsYXphQmcsIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLlVJLlNDRU5FKTtcclxuXHJcbiAgICAgICAgLy/lpKfljoXkuLvopoHpooTmlK/liJ3lp4vljJZcclxuICAgICAgICBsZXQgZ2FtZURpc3BsYXlUeXBlID0gZ2xHYW1lLnVzZXIuZ2V0KFwiZ2FtZURpc3BsYXlUeXBlXCIpO1xyXG4gICAgICAgIGlmIChnYW1lRGlzcGxheVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAvLyDnu7zlkIjniYhcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXMucHJlZmFiX2NvbXByZWhlbnNpdmUsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIC8vIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJjb21wcmVoZW5zaXZlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOaji+eJjOeJiFxyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy5wcmVmYWJfY2VudGVyLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAvLyBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwiY2VudGVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXMucHJlZmFiX3VwLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93Q2hpbGRQYW5lbCh0aGlzLnByZWZhYl9kb3duLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCBhcnJ2YWxUaXAgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMucHJlZmFiX2FycnZhbFRpcCk7XHJcbiAgICAgICAgYXJydmFsVGlwLnpJbmRleCA9IDk5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImlzQXVkaW9QbGF5XCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF6YU9wZW4obm9kZU5hbWUpIHtcclxuICAgICAgICBpZiAobm9kZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBsYXphQmcoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmdJbWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm5hbWUgPT0gYmdJbWdbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZV9iZy5zcHJpdGVGcmFtZSA9IHRoaXMuYmdfbGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGdhbWVncm91cCA9IHRoaXMubm9kZS8vLmdldENoaWxkQnlOYW1lKFwiXCIpLmdldENoaWxkQnlOYW1lKFwiZ2FtZWdyb3VwXCIpLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGNjLndpblNpemUud2lkdGggLSBkYXRhLndpZHRoIC0gMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVfYmcubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5sZWZ0ID0gZGF0YS53aWR0aCAtIDE5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlX2JnLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJnX3dpZHRoID0gdGhpcy5zcHJpdGVfYmcubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGggPj0gYmdfd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVfYmcubm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsZXQgYmdJbmRleCA9IGRhdGEuaW5kZXggPj0gdGhpcy5iZ19saXN0LmxlbmdodCA/IDAgOiBkYXRhLmluZGV4O1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5iZ0luZGV4ICE9IGJnSW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc3ByaXRlX2JnLnNwcml0ZUZyYW1lID0gdGhpcy5iZ19saXN0W3RoaXMuYmdJbmRleF07XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZV9iZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlBMQVpBX09QRU4sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInNldHBsYXphYmdcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
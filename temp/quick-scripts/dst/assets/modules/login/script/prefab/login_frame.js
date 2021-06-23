
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/login/script/prefab/login_frame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0ac4FoNJJMIJBacpBzS1R9', 'login_frame');
// modules/login/script/prefab/login_frame.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.bolLogin = false;
  },
  OnDestroy: function OnDestroy() {},
  // 按钮点击事件
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_acc":
        return glGame.panel.showRegistration();

      case "btn_tourist":
        return this.touristLogin();

      default:
        console.error("no find button name -> %s", name);
    }
  },
  // 游客登陆
  touristLogin: function touristLogin() {
    if (this.bolLogin) return;
    this.bolLogin = true; // glGame.logon.reqTouLogin();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcbG9naW5cXHNjcmlwdFxccHJlZmFiXFxsb2dpbl9mcmFtZS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiYm9sTG9naW4iLCJPbkRlc3Ryb3kiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJwYW5lbCIsInNob3dSZWdpc3RyYXRpb24iLCJ0b3VyaXN0TG9naW4iLCJjb25zb2xlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRSxFQURRO0FBSXBCQyxFQUFBQSxNQUpvQixvQkFJWDtBQUNMLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSCxHQU5tQjtBQVFwQkMsRUFBQUEsU0FSb0IsdUJBUVIsQ0FFWCxDQVZtQjtBQVdwQjtBQUNBQyxFQUFBQSxPQVpvQixtQkFZWkMsSUFaWSxFQVlOQyxJQVpNLEVBWUE7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssU0FBTDtBQUFnQixlQUFPUixNQUFNLENBQUNVLEtBQVAsQ0FBYUMsZ0JBQWIsRUFBUDs7QUFDaEIsV0FBSyxhQUFMO0FBQW9CLGVBQU8sS0FBS0MsWUFBTCxFQUFQOztBQUNwQjtBQUFTQyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywyQkFBZCxFQUEyQ04sSUFBM0M7QUFIYjtBQUtILEdBbEJtQjtBQW1CcEI7QUFDQUksRUFBQUEsWUFwQm9CLDBCQW9CTDtBQUNYLFFBQUksS0FBS1AsUUFBVCxFQUFtQjtBQUNuQixTQUFLQSxRQUFMLEdBQWdCLElBQWhCLENBRlcsQ0FHWDtBQUNIO0FBeEJtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ib2xMb2dpbiA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgfSxcclxuICAgIC8vIOaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWNjXCI6IHJldHVybiBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdHJhdGlvbigpO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3RvdXJpc3RcIjogcmV0dXJuIHRoaXMudG91cmlzdExvZ2luKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDmuLjlrqLnmbvpmYZcclxuICAgIHRvdXJpc3RMb2dpbigpIHtcclxuICAgICAgICBpZiAodGhpcy5ib2xMb2dpbikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYm9sTG9naW4gPSB0cnVlO1xyXG4gICAgICAgIC8vIGdsR2FtZS5sb2dvbi5yZXFUb3VMb2dpbigpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
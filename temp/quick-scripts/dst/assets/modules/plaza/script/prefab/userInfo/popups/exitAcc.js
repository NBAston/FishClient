
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/popups/exitAcc.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cb469rMs7dPQo3mEbR6WknH', 'exitAcc');
// modules/plaza/script/prefab/userInfo/popups/exitAcc.js

"use strict";

/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  unRegisterEvent: function unRegisterEvent() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_exitAccSure":
        this.exitAccSure_cb();
        break;

      case "btn_exitAccCancel":
        this.exitAccCancel_cb();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  exitAccSure_cb: function exitAccSure_cb() {
    var loginCache = glGame.storage.getItem("loginCache");

    if (loginCache) {
      var username = loginCache.pd.substr(-loginCache.le);
      glGame.storage.setItem("number", {
        data: username
      });
    }

    glGame.storage.removeItemByKey("loginCache");
    glGame.logon.reqTouLogin();
    this.remove();
    glGame.emitter.emit("unRegisterEventMyinfo");
  },
  exitAccCancel_cb: function exitAccCancel_cb() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xccG9wdXBzXFxleGl0QWNjLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50IiwiT25EZXN0cm95IiwidW5SZWdpc3RlckV2ZW50Iiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiZXhpdEFjY1N1cmVfY2IiLCJleGl0QWNjQ2FuY2VsX2NiIiwiY29uc29sZSIsImVycm9yIiwiY2xpY2tfY2xvc2UiLCJyZW1vdmUiLCJsb2dpbkNhY2hlIiwic3RvcmFnZSIsImdldEl0ZW0iLCJ1c2VybmFtZSIsInBkIiwic3Vic3RyIiwibGUiLCJzZXRJdGVtIiwiZGF0YSIsInJlbW92ZUl0ZW1CeUtleSIsImxvZ29uIiwicmVxVG91TG9naW4iLCJlbWl0dGVyIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRSxFQURRO0FBR3BCQyxFQUFBQSxNQUhvQixvQkFHVjtBQUNOLFNBQUtDLGFBQUw7QUFDSCxHQUxtQjtBQU1wQkEsRUFBQUEsYUFOb0IsMkJBTUgsQ0FDaEIsQ0FQbUI7QUFRcEJDLEVBQUFBLFNBUm9CLHVCQVFSO0FBQ1IsU0FBS0MsZUFBTDtBQUNILEdBVm1CO0FBV3BCQSxFQUFBQSxlQVhvQiw2QkFXRCxDQUNsQixDQVptQjtBQWFwQkMsRUFBQUEsT0Fib0IsbUJBYVhDLElBYlcsRUFhTEMsSUFiSyxFQWFDO0FBQ2pCLFlBQVFELElBQVI7QUFDSSxXQUFLLGlCQUFMO0FBQXdCLGFBQUtFLGNBQUw7QUFBdUI7O0FBQy9DLFdBQUssbUJBQUw7QUFBMEIsYUFBS0MsZ0JBQUw7QUFBeUI7O0FBQ25EO0FBQVNDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDTCxJQUEzQztBQUhiO0FBS0gsR0FuQm1CO0FBb0JwQk0sRUFBQUEsV0FwQm9CLHlCQW9CTDtBQUNYLFNBQUtDLE1BQUw7QUFDSCxHQXRCbUI7QUF1QnBCTCxFQUFBQSxjQXZCb0IsNEJBdUJIO0FBQ2IsUUFBSU0sVUFBVSxHQUFHakIsTUFBTSxDQUFDa0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCLFlBQXZCLENBQWpCOztBQUNBLFFBQUlGLFVBQUosRUFBZ0I7QUFDWixVQUFJRyxRQUFRLEdBQUdILFVBQVUsQ0FBQ0ksRUFBWCxDQUFjQyxNQUFkLENBQXFCLENBQUNMLFVBQVUsQ0FBQ00sRUFBakMsQ0FBZjtBQUNBdkIsTUFBQUEsTUFBTSxDQUFDa0IsT0FBUCxDQUFlTSxPQUFmLENBQXVCLFFBQXZCLEVBQWlDO0FBQUVDLFFBQUFBLElBQUksRUFBRUw7QUFBUixPQUFqQztBQUNIOztBQUNEcEIsSUFBQUEsTUFBTSxDQUFDa0IsT0FBUCxDQUFlUSxlQUFmLENBQStCLFlBQS9CO0FBQ0ExQixJQUFBQSxNQUFNLENBQUMyQixLQUFQLENBQWFDLFdBQWI7QUFDQSxTQUFLWixNQUFMO0FBQ0FoQixJQUFBQSxNQUFNLENBQUM2QixPQUFQLENBQWVDLElBQWYsQ0FBb0IsdUJBQXBCO0FBQ0gsR0FqQ21CO0FBa0NwQmxCLEVBQUFBLGdCQWxDb0IsOEJBa0NGO0FBQ2QsU0FBS0ksTUFBTDtBQUNIO0FBcENtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOS/ruaUuei0puWPt+eZu+mZhuWvhueggemdouadv1xyXG4gKi9cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJFdmVudCAoKSB7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50ICgpIHtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrIChuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZXhpdEFjY1N1cmVcIjogdGhpcy5leGl0QWNjU3VyZV9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9leGl0QWNjQ2FuY2VsXCI6IHRoaXMuZXhpdEFjY0NhbmNlbF9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIGV4aXRBY2NTdXJlX2NiKCkge1xyXG4gICAgICAgIGxldCBsb2dpbkNhY2hlID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShcImxvZ2luQ2FjaGVcIik7XHJcbiAgICAgICAgaWYgKGxvZ2luQ2FjaGUpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJuYW1lID0gbG9naW5DYWNoZS5wZC5zdWJzdHIoLWxvZ2luQ2FjaGUubGUpO1xyXG4gICAgICAgICAgICBnbEdhbWUuc3RvcmFnZS5zZXRJdGVtKFwibnVtYmVyXCIsIHsgZGF0YTogdXNlcm5hbWUgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2UucmVtb3ZlSXRlbUJ5S2V5KFwibG9naW5DYWNoZVwiKTtcclxuICAgICAgICBnbEdhbWUubG9nb24ucmVxVG91TG9naW4oKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1blJlZ2lzdGVyRXZlbnRNeWluZm9cIilcclxuICAgIH0sXHJcbiAgICBleGl0QWNjQ2FuY2VsX2NiKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxufSk7Il19

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/bindPhone/unbind.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47695rj25FGXKtHeivZBhVO', 'unbind');
// modules/plaza/script/prefab/bindPhone/unbind.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.registerEvent();
  },
  start: function start() {},
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.close();
        break;

      case "btn_unbindSure":
        this.unbindSure_cb();
        break;

      default:
        break;
    }
  },
  //无法更改手机
  unbindSure_cb: function unbindSure_cb() {
    this.close();
    glGame.panel.showService();
  },
  close: function close() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxiaW5kUGhvbmVcXHVuYmluZC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwicmVnaXN0ZXJFdmVudCIsInN0YXJ0IiwidW5SZWdpc3RlckV2ZW50IiwiT25EZXN0cm95Iiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xvc2UiLCJ1bmJpbmRTdXJlX2NiIiwicGFuZWwiLCJzaG93U2VydmljZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFLEVBRFE7QUFHcEJDLEVBQUFBLE1BSG9CLG9CQUdYO0FBQ0wsU0FBS0MsYUFBTDtBQUNILEdBTG1CO0FBT3BCQyxFQUFBQSxLQVBvQixtQkFPWixDQUNQLENBUm1CO0FBU3BCRCxFQUFBQSxhQVRvQiwyQkFTSixDQUNmLENBVm1CO0FBV3BCRSxFQUFBQSxlQVhvQiw2QkFXRixDQUNqQixDQVptQjtBQWNwQkMsRUFBQUEsU0Fkb0IsdUJBY1I7QUFDUixTQUFLRCxlQUFMO0FBQ0gsR0FoQm1CO0FBa0JwQkUsRUFBQUEsT0FsQm9CLG1CQWtCWkMsSUFsQlksRUFrQk5DLElBbEJNLEVBa0JBO0FBQ2hCLFlBQVFELElBQVI7QUFDSSxXQUFLLE9BQUw7QUFBYyxhQUFLRSxLQUFMO0FBQWM7O0FBQzVCLFdBQUssZ0JBQUw7QUFBdUIsYUFBS0MsYUFBTDtBQUFzQjs7QUFDN0M7QUFDSTtBQUpSO0FBTUgsR0F6Qm1CO0FBMkJwQjtBQUNBQSxFQUFBQSxhQTVCb0IsMkJBNEJKO0FBQ1osU0FBS0QsS0FBTDtBQUNBWixJQUFBQSxNQUFNLENBQUNjLEtBQVAsQ0FBYUMsV0FBYjtBQUNILEdBL0JtQjtBQWlDcEJILEVBQUFBLEtBakNvQixtQkFpQ1o7QUFDSixTQUFLSSxNQUFMO0FBQ0g7QUFuQ21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl91bmJpbmRTdXJlXCI6IHRoaXMudW5iaW5kU3VyZV9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/ml6Dms5Xmm7TmlLnmiYvmnLpcclxuICAgIHVuYmluZFN1cmVfY2IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICB9LFxyXG59KTtcclxuIl19
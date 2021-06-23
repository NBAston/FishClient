
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/smallComp/share.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d301Xxtj5I1YE8kWVjNJaS', 'share');
// modules/plaza/script/prefab/smallComp/share.js

"use strict";

/**
 * 分享面板, 目前还差复制功能未做
 */
glGame.baseclass.extend({
  properties: {
    ewm: cc.node // 二维码

  },
  onLoad: function onLoad() {
    var _this = this;

    glGame.loader.remoteLoad(glGame.servercfg.getQRCodeURL()).then(function (data) {
      _this.ewm.getComponent(cc.Sprite).spriteFrame = data;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "copy":
        this.click_copy();
        break;

      case "close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_copy: function click_copy() {
    glGame.platform.copyToClip("https://fir.im/wve6");
  },
  click_close: function click_close() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzbWFsbENvbXBcXHNoYXJlLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJld20iLCJjYyIsIm5vZGUiLCJvbkxvYWQiLCJsb2FkZXIiLCJyZW1vdGVMb2FkIiwic2VydmVyY2ZnIiwiZ2V0UVJDb2RlVVJMIiwidGhlbiIsImRhdGEiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfY29weSIsImNsaWNrX2Nsb3NlIiwiY29uc29sZSIsImVycm9yIiwicGxhdGZvcm0iLCJjb3B5VG9DbGlwIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEdBQUcsRUFBRUMsRUFBRSxDQUFDQyxJQURBLENBQ1E7O0FBRFIsR0FEUTtBQUlwQkMsRUFBQUEsTUFKb0Isb0JBSVY7QUFBQTs7QUFDTlAsSUFBQUEsTUFBTSxDQUFDUSxNQUFQLENBQWNDLFVBQWQsQ0FBeUJULE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQkMsWUFBakIsRUFBekIsRUFBMERDLElBQTFELENBQStELFVBQUFDLElBQUksRUFBSTtBQUNuRSxNQUFBLEtBQUksQ0FBQ1QsR0FBTCxDQUFTVSxZQUFULENBQXNCVCxFQUFFLENBQUNVLE1BQXpCLEVBQWlDQyxXQUFqQyxHQUErQ0gsSUFBL0M7QUFDSCxLQUZEO0FBR0gsR0FSbUI7QUFTcEJJLEVBQUFBLE9BVG9CLG1CQVNYQyxJQVRXLEVBU0xaLElBVEssRUFTQztBQUNqQixZQUFRWSxJQUFSO0FBQ0ksV0FBSyxNQUFMO0FBQWEsYUFBS0MsVUFBTDtBQUFtQjs7QUFDaEMsV0FBSyxPQUFMO0FBQWMsYUFBS0MsV0FBTDtBQUFvQjs7QUFDbEM7QUFBU0MsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNKLElBQTNDO0FBSGI7QUFLSCxHQWZtQjtBQWdCcEJDLEVBQUFBLFVBaEJvQix3QkFnQk47QUFDVm5CLElBQUFBLE1BQU0sQ0FBQ3VCLFFBQVAsQ0FBZ0JDLFVBQWhCLENBQTJCLHFCQUEzQjtBQUNILEdBbEJtQjtBQW1CcEJKLEVBQUFBLFdBbkJvQix5QkFtQkw7QUFDWCxTQUFLSyxNQUFMO0FBQ0g7QUFyQm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YiG5Lqr6Z2i5p2/LCDnm67liY3ov5jlt67lpI3liLblip/og73mnKrlgZpcclxuICovXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBld206IGNjLm5vZGUgICAgLy8g5LqM57u056CBXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBnbEdhbWUubG9hZGVyLnJlbW90ZUxvYWQoZ2xHYW1lLnNlcnZlcmNmZy5nZXRRUkNvZGVVUkwoKSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ld20uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sgKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNvcHlcIjogdGhpcy5jbGlja19jb3B5KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2NvcHkgKCkge1xyXG4gICAgICAgIGdsR2FtZS5wbGF0Zm9ybS5jb3B5VG9DbGlwKFwiaHR0cHM6Ly9maXIuaW0vd3ZlNlwiKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19jbG9zZSAoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
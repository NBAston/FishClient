
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/baseclass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8ba0sTFKNI8ajSuzwSeC6G', 'baseclass');
// frames/base/baseclass.js

"use strict";

window.glGame = window.glGame || {};
glGame.baseclass = cc.Component.extend({
  /**
   * @param event
   * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
   * @Explain Button点击事件统一调用
   */
  OnClickButton: function OnClickButton(event, type) {
    var _this = this;

    var buttonName = event.target.name;
    var buttonNode = event.target;

    if (!type || type == "select") {
      if (this.curClickState) return;
      this.curClickState = true;
      this.allCurTimeout = this.allCurTimeout || [];
      this.allCurTimeout.push(setTimeout(function () {
        _this.curClickState = false;
      }, 500));
    }

    console.log("\u70B9\u51FB\u4E86button -> ".concat(buttonName));

    switch (buttonName) {
      case "close_eff":
        //当前界面有播放特长音效的关闭按钮
        glGame.audio.closeCurEffect();
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      case "close":
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      default:
        if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");else glGame.audio.playLoadSoundEffectByPath("click");
    }

    this.onClick(buttonName, buttonNode);
  },

  /**
   * @param event
   * @Explain Toggle点击事件统一调用
   */
  OnClickToggle: function OnClickToggle(event) {
    var buttonName = event.node.name;
    var buttonNode = event.node;
    console.log("\u70B9\u51FB\u4E86toggle -> ".concat(buttonName));
    glGame.audio.playLoadSoundEffectByPath("select");
    this.onClick(buttonName, buttonNode);
  },

  /**
   * @param ButtonName
   * @param ButtonNode
   * @Explain 子类需要重写这个接口来触发点击事件
   */
  onClick: function onClick(ButtonName, ButtonNode) {},
  OnSlider: function OnSlider(event) {
    var node = event.node;
    var process = event.progress;
    this.onSliderProcess(node, process);
  },
  onSliderProcess: function onSliderProcess(node, process) {},
  // 组件启用时,每帧调用
  update: function update() {},
  // 同update一样
  lateUpdate: function lateUpdate() {},
  // 当附加到一个激活的节点上或者其节点第一次激活时候调用。因此只会在刚创建的时候被调用一次后面都不在调用
  onLoad: function onLoad() {},
  // 如果该组件第一次启用，则在所有组件的 update 之前调用。
  start: function start() {},
  // 当该组件被启用，并且它的节点也激活时。
  onEnable: function onEnable() {},
  // 当该组件被禁用或节点变为无效时调用。
  onDisable: function onDisable() {},
  // 当该组件被销毁时调用
  onDestroy: function onDestroy() {
    this.OnDestroy();
    this.clearCurTimeout();
    if (this.node.name.indexOf("entry") != -1) glGame.audio.goBackPlazaAudio(this.node.name); //if (!cc.isValid(this.node)) this.node.removeFromParent();
  },
  // 子类重写此销毁函数
  OnDestroy: function OnDestroy() {},

  /**
   * 销毁自己
   */
  remove: function remove() {
    var blRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (glGame.panel.isHaveEntry()) glGame.emitter.emit(MESSAGE.UI.PLAZA_OPEN, this.node.name);
    this.node.destroy(); // TODO 羞耻修改，必须要改

    if (isEnableHotUpdate && blRemove) glGame.panel.PrefabRelease(this.node.name);
  },
  clearCurTimeout: function clearCurTimeout() {
    if (!this.allCurTimeout) return;
    var count = this.allCurTimeout.length;

    for (var i = 0; i < count; i++) {
      clearTimeout(this.allCurTimeout[i]);
    }
  },

  /**
   * 给予适配比例
   */
  fitScreen: function fitScreen() {
    var nowSize = cc.winSize,
        cutSize = cc.view.getDesignResolutionSize(),
        nowRatio = nowSize.width / nowSize.height,
        cutRatio = cutSize.width / cutSize.height;

    if (nowRatio < cutRatio) {
      cc.view.setDesignResolutionSize(cutSize.width, cutSize.height, cc.ResolutionPolicy.FIXED_WIDTH);
    } else {
      cc.view.setDesignResolutionSize(cutSize.width, nowSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxiYXNlY2xhc3MuanMiXSwibmFtZXMiOlsid2luZG93IiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiY2MiLCJDb21wb25lbnQiLCJleHRlbmQiLCJPbkNsaWNrQnV0dG9uIiwiZXZlbnQiLCJ0eXBlIiwiYnV0dG9uTmFtZSIsInRhcmdldCIsIm5hbWUiLCJidXR0b25Ob2RlIiwiY3VyQ2xpY2tTdGF0ZSIsImFsbEN1clRpbWVvdXQiLCJwdXNoIiwic2V0VGltZW91dCIsImNvbnNvbGUiLCJsb2ciLCJhdWRpbyIsImNsb3NlQ3VyRWZmZWN0IiwicGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aCIsIm9uQ2xpY2siLCJPbkNsaWNrVG9nZ2xlIiwibm9kZSIsIkJ1dHRvbk5hbWUiLCJCdXR0b25Ob2RlIiwiT25TbGlkZXIiLCJwcm9jZXNzIiwicHJvZ3Jlc3MiLCJvblNsaWRlclByb2Nlc3MiLCJ1cGRhdGUiLCJsYXRlVXBkYXRlIiwib25Mb2FkIiwic3RhcnQiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIm9uRGVzdHJveSIsIk9uRGVzdHJveSIsImNsZWFyQ3VyVGltZW91dCIsImluZGV4T2YiLCJnb0JhY2tQbGF6YUF1ZGlvIiwicmVtb3ZlIiwiYmxSZW1vdmUiLCJwYW5lbCIsImlzSGF2ZUVudHJ5IiwiZW1pdHRlciIsImVtaXQiLCJNRVNTQUdFIiwiVUkiLCJQTEFaQV9PUEVOIiwiZGVzdHJveSIsImlzRW5hYmxlSG90VXBkYXRlIiwiUHJlZmFiUmVsZWFzZSIsImNvdW50IiwibGVuZ3RoIiwiaSIsImNsZWFyVGltZW91dCIsImZpdFNjcmVlbiIsIm5vd1NpemUiLCJ3aW5TaXplIiwiY3V0U2l6ZSIsInZpZXciLCJnZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSIsIm5vd1JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjdXRSYXRpbyIsInNldERlc2lnblJlc29sdXRpb25TaXplIiwiUmVzb2x1dGlvblBvbGljeSIsIkZJWEVEX1dJ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QUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEtBQXBCLEVBQTJCRSxDQUFDLEVBQTVCLEVBQWdDO0FBQzVCQyxNQUFBQSxZQUFZLENBQUMsS0FBSzNDLGFBQUwsQ0FBbUIwQyxDQUFuQixDQUFELENBQVo7QUFDSDtBQUNKLEdBL0ZrQzs7QUFpR25DOzs7QUFHQUUsRUFBQUEsU0FwR21DLHVCQW9HdkI7QUFDUixRQUFJQyxPQUFPLEdBQUd4RCxFQUFFLENBQUN5RCxPQUFqQjtBQUFBLFFBQ0lDLE9BQU8sR0FBRzFELEVBQUUsQ0FBQzJELElBQUgsQ0FBUUMsdUJBQVIsRUFEZDtBQUFBLFFBRUlDLFFBQVEsR0FBR0wsT0FBTyxDQUFDTSxLQUFSLEdBQWdCTixPQUFPLENBQUNPLE1BRnZDO0FBQUEsUUFHSUMsUUFBUSxHQUFHTixPQUFPLENBQUNJLEtBQVIsR0FBZ0JKLE9BQU8sQ0FBQ0ssTUFIdkM7O0FBS0EsUUFBSUYsUUFBUSxHQUFHRyxRQUFmLEVBQXlCO0FBQ3JCaEUsTUFBQUEsRUFBRSxDQUFDMkQsSUFBSCxDQUFRTSx1QkFBUixDQUFnQ1AsT0FBTyxDQUFDSSxLQUF4QyxFQUErQ0osT0FBTyxDQUFDSyxNQUF2RCxFQUErRC9ELEVBQUUsQ0FBQ2tFLGdCQUFILENBQW9CQyxXQUFuRjtBQUNILEtBRkQsTUFFTztBQUNIbkUsTUFBQUEsRUFBRSxDQUFDMkQsSUFBSCxDQUFRTSx1QkFBUixDQUFnQ1AsT0FBTyxDQUFDSSxLQUF4QyxFQUErQ04sT0FBTyxDQUFDTyxNQUF2RCxFQUErRC9ELEVBQUUsQ0FBQ2tFLGdCQUFILENBQW9CRSxZQUFuRjtBQUNIO0FBQ0o7QUEvR2tDLENBQXBCLENBQW5CIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ2xHYW1lID0gd2luZG93LmdsR2FtZSB8fCB7fTtcclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MgPSBjYy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gdHlwZSBVSee8lui+keWZqOS8oOWPgiDmnInlgLzlsLHkuI3lgZrmjInpkq7ov57ngrnov4fmu6Qo5LiU5LiN562J5LqO54m55q6K6Z+z5pWI5a2X5q61KSAg5L2/55Soc2VsZWN05YiG6aG15oyJ6ZKuXHJcbiAgICAgKiBARXhwbGFpbiBCdXR0b27ngrnlh7vkuovku7bnu5/kuIDosIPnlKhcclxuICAgICAqL1xyXG4gICAgT25DbGlja0J1dHRvbihldmVudCwgdHlwZSkge1xyXG4gICAgICAgIGxldCBidXR0b25OYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgbGV0IGJ1dHRvbk5vZGUgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICghdHlwZSB8fCB0eXBlID09IFwic2VsZWN0XCIpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJDbGlja1N0YXRlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQ3VyVGltZW91dCA9IHRoaXMuYWxsQ3VyVGltZW91dCB8fCBbXTtcclxuICAgICAgICAgICAgdGhpcy5hbGxDdXJUaW1lb3V0LnB1c2goc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNsaWNrU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgNTAwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhg54K55Ye75LqGYnV0dG9uIC0+ICR7YnV0dG9uTmFtZX1gKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1dHRvbk5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlX2VmZlwiOiAgICAgICAgLy/lvZPliY3nlYzpnaLmnInmkq3mlL7nibnplb/pn7PmlYjnmoTlhbPpl63mjInpkq5cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5hdWRpby5jbG9zZUN1ckVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5hdWRpby5wbGF5TG9hZFNvdW5kRWZmZWN0QnlQYXRoKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwic2VsZWN0XCIpIGdsR2FtZS5hdWRpby5wbGF5TG9hZFNvdW5kRWZmZWN0QnlQYXRoKFwic2VsZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBnbEdhbWUuYXVkaW8ucGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aChcImNsaWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQ2xpY2soYnV0dG9uTmFtZSwgYnV0dG9uTm9kZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBFeHBsYWluIFRvZ2dsZeeCueWHu+S6i+S7tue7n+S4gOiwg+eUqFxyXG4gICAgICovXHJcbiAgICBPbkNsaWNrVG9nZ2xlKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBldmVudC5ub2RlLm5hbWU7XHJcbiAgICAgICAgbGV0IGJ1dHRvbk5vZGUgPSBldmVudC5ub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGDngrnlh7vkuoZ0b2dnbGUgLT4gJHtidXR0b25OYW1lfWApO1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5TG9hZFNvdW5kRWZmZWN0QnlQYXRoKFwic2VsZWN0XCIpO1xyXG4gICAgICAgIHRoaXMub25DbGljayhidXR0b25OYW1lLCBidXR0b25Ob2RlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBCdXR0b25OYW1lXHJcbiAgICAgKiBAcGFyYW0gQnV0dG9uTm9kZVxyXG4gICAgICogQEV4cGxhaW4g5a2Q57G76ZyA6KaB6YeN5YaZ6L+Z5Liq5o6l5Y+j5p2l6Kem5Y+R54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soQnV0dG9uTmFtZSwgQnV0dG9uTm9kZSkgeyB9LFxyXG5cclxuICAgIE9uU2xpZGVyKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBldmVudC5ub2RlO1xyXG4gICAgICAgIGxldCBwcm9jZXNzID0gZXZlbnQucHJvZ3Jlc3M7XHJcbiAgICAgICAgdGhpcy5vblNsaWRlclByb2Nlc3Mobm9kZSwgcHJvY2Vzcyk7XHJcbiAgICB9LFxyXG4gICAgb25TbGlkZXJQcm9jZXNzKG5vZGUsIHByb2Nlc3MpIHsgfSxcclxuXHJcbiAgICAvLyDnu4Tku7blkK/nlKjml7Ys5q+P5bin6LCD55SoXHJcbiAgICB1cGRhdGUoKSB7IH0sXHJcbiAgICAvLyDlkIx1cGRhdGXkuIDmoLdcclxuICAgIGxhdGVVcGRhdGUoKSB7IH0sXHJcbiAgICAvLyDlvZPpmYTliqDliLDkuIDkuKrmv4DmtLvnmoToioLngrnkuIrmiJbogIXlhbboioLngrnnrKzkuIDmrKHmv4DmtLvml7blgJnosIPnlKjjgILlm6DmraTlj6rkvJrlnKjliJrliJvlu7rnmoTml7blgJnooqvosIPnlKjkuIDmrKHlkI7pnaLpg73kuI3lnKjosIPnlKhcclxuICAgIG9uTG9hZCgpIHsgfSxcclxuICAgIC8vIOWmguaenOivpee7hOS7tuesrOS4gOasoeWQr+eUqO+8jOWImeWcqOaJgOaciee7hOS7tueahCB1cGRhdGUg5LmL5YmN6LCD55So44CCXHJcbiAgICBzdGFydCgpIHsgfSxcclxuICAgIC8vIOW9k+ivpee7hOS7tuiiq+WQr+eUqO+8jOW5tuS4lOWug+eahOiKgueCueS5n+a/gOa0u+aXtuOAglxyXG4gICAgb25FbmFibGUoKSB7IH0sXHJcbiAgICAvLyDlvZPor6Xnu4Tku7booqvnpoHnlKjmiJboioLngrnlj5jkuLrml6DmlYjml7bosIPnlKjjgIJcclxuICAgIG9uRGlzYWJsZSgpIHsgfSxcclxuICAgIC8vIOW9k+ivpee7hOS7tuiiq+mUgOavgeaXtuiwg+eUqFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuT25EZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckN1clRpbWVvdXQoKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcImVudHJ5XCIpICE9IC0xKSBnbEdhbWUuYXVkaW8uZ29CYWNrUGxhemFBdWRpbyh0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgLy9pZiAoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSkgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyDlrZDnsbvph43lhpnmraTplIDmr4Hlh73mlbBcclxuICAgIE9uRGVzdHJveSgpIHsgfSxcclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B6Ieq5bexXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShibFJlbW92ZSA9IHRydWUpIHtcclxuICAgICAgICBpZiAoZ2xHYW1lLnBhbmVsLmlzSGF2ZUVudHJ5KCkpIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5VSS5QTEFaQV9PUEVOLCB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyBUT0RPIOe+nuiAu+S/ruaUue+8jOW/hemhu+imgeaUuVxyXG4gICAgICAgIGlmIChpc0VuYWJsZUhvdFVwZGF0ZSAmJiBibFJlbW92ZSkgZ2xHYW1lLnBhbmVsLlByZWZhYlJlbGVhc2UodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfSxcclxuICAgIGNsZWFyQ3VyVGltZW91dCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsQ3VyVGltZW91dCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuYWxsQ3VyVGltZW91dC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFsbEN1clRpbWVvdXRbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5nkuojpgILphY3mr5TkvotcclxuICAgICAqL1xyXG4gICAgZml0U2NyZWVuKCkge1xyXG4gICAgICAgIGxldCBub3dTaXplID0gY2Mud2luU2l6ZSxcclxuICAgICAgICAgICAgY3V0U2l6ZSA9IGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKSxcclxuICAgICAgICAgICAgbm93UmF0aW8gPSBub3dTaXplLndpZHRoIC8gbm93U2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGN1dFJhdGlvID0gY3V0U2l6ZS53aWR0aCAvIGN1dFNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAobm93UmF0aW8gPCBjdXRSYXRpbykge1xyXG4gICAgICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKGN1dFNpemUud2lkdGgsIGN1dFNpemUuaGVpZ2h0LCBjYy5SZXNvbHV0aW9uUG9saWN5LkZJWEVEX1dJRFRIKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKGN1dFNpemUud2lkdGgsIG5vd1NpemUuaGVpZ2h0LCBjYy5SZXNvbHV0aW9uUG9saWN5LkZJWEVEX0hFSUdIVCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/setting/setting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '763ffxY1IJMTJ8h5Bx9cwIg', 'setting');
// modules/public/script/setting/setting.js

"use strict";

/**
 * 设置面板
 */
glGame.baseclass.extend({
  properties: {
    BGM: cc.Toggle,
    SE: cc.Toggle,
    GS: cc.Node,
    MSS: cc.Slider,
    ESS: cc.Slider,
    MSB: cc.Node,
    ESB: cc.Node
  },
  onLoad: function onLoad() {
    this.showPanelInfo();
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    this.MSB.on("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.on("touchend", this.MSBTouchCancelNext, this);
    this.ESB.on("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.on("touchend", this.ESBTouchCancelNext, this);
    this.BGM.node.on("toggle", this.click_music, this);
    this.SE.node.on("toggle", this.click_effect, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    this.MSB.off("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.off("touchend", this.MSBTouchCancelNext, this);
    this.ESB.off("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.off("touchend", this.ESBTouchCancelNext, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  showPanelInfo: function showPanelInfo() {
    // 根据本地缓存的声音数据来更新按钮状态
    var BGMSE = glGame.audio.get("BGMSE");
    this.BGM.isChecked = BGMSE["BGMPlayState"];
    this.BGM.node.getChildByName("music").active = !BGMSE["BGMPlayState"];
    this.SE.isChecked = BGMSE["SoundEffectPlayState"];
    this.SE.node.getChildByName("effect").active = !BGMSE["SoundEffectPlayState"];
    this.MSS.progress = this.MSS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
    this.ESS.progress = this.ESS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];
  },
  MSBTouchCancelNext: function MSBTouchCancelNext() {
    glGame.audio.saveVolume();
  },
  ESBTouchCancelNext: function ESBTouchCancelNext() {
    glGame.audio.saveVolume();
  },
  onSliderProcess: function onSliderProcess(node, process) {
    var name = node.name;

    switch (name) {
      case "musicslider":
        node.parent.getComponent(cc.ProgressBar).progress = process;
        glGame.audio.setBGMVolume(process);
        break;

      case "effectslider":
        node.parent.getComponent(cc.ProgressBar).progress = process;
        glGame.audio.setSoundEffectVolume(process);
        break;
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "switchacc":
        this.click_switchacc();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  click_music: function click_music(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openBGM();else glGame.audio.closeBGM();
  },
  click_effect: function click_effect(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openSE();else glGame.audio.closeSE();
  },
  click_switchacc: function click_switchacc() {
    glGame.logon.logout();
    glGame.storage.removeItemByKey("loginCache");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNldHRpbmdcXHNldHRpbmcuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsIkJHTSIsImNjIiwiVG9nZ2xlIiwiU0UiLCJHUyIsIk5vZGUiLCJNU1MiLCJTbGlkZXIiLCJFU1MiLCJNU0IiLCJFU0IiLCJvbkxvYWQiLCJzaG93UGFuZWxJbmZvIiwicmVnaXN0ZXJFdmVudCIsIm9uIiwiTVNCVG91Y2hDYW5jZWxOZXh0IiwiRVNCVG91Y2hDYW5jZWxOZXh0Iiwibm9kZSIsImNsaWNrX211c2ljIiwiY2xpY2tfZWZmZWN0IiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwiT25EZXN0cm95IiwiQkdNU0UiLCJhdWRpbyIsImdldCIsImlzQ2hlY2tlZCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwicHJvZ3Jlc3MiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJQcm9ncmVzc0JhciIsInNhdmVWb2x1bWUiLCJvblNsaWRlclByb2Nlc3MiLCJwcm9jZXNzIiwibmFtZSIsInNldEJHTVZvbHVtZSIsInNldFNvdW5kRWZmZWN0Vm9sdW1lIiwib25DbGljayIsImNsaWNrX2Nsb3NlIiwiY2xpY2tfc3dpdGNoYWNjIiwiY29uc29sZSIsImVycm9yIiwicmVtb3ZlIiwiZXZlbnQiLCJ0YXJnZXQiLCJvcGVuQkdNIiwiY2xvc2VCR00iLCJvcGVuU0UiLCJjbG9zZVNFIiwibG9nb24iLCJsb2dvdXQiLCJzdG9yYWdlIiwicmVtb3ZlSXRlbUJ5S2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEdBQUcsRUFBRUMsRUFBRSxDQUFDQyxNQURBO0FBRVJDLElBQUFBLEVBQUUsRUFBRUYsRUFBRSxDQUFD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QkksRUFBQUEsV0FuRW9CLHlCQW1FTDtBQUNYLFNBQUtJLE1BQUw7QUFDSCxHQXJFbUI7QUFzRXBCMUIsRUFBQUEsV0F0RW9CLHVCQXNFUDJCLEtBdEVPLEVBc0VBO0FBQ2hCLFFBQUk1QixJQUFJLEdBQUc0QixLQUFLLENBQUNDLE1BQWpCO0FBQ0EsUUFBSXBCLFNBQVMsR0FBR21CLEtBQUssQ0FBQ25CLFNBQXRCO0FBQ0FULElBQUFBLElBQUksQ0FBQ1csTUFBTCxHQUFjLENBQUNGLFNBQWY7QUFDQSxRQUFJQSxTQUFKLEVBQWU5QixNQUFNLENBQUM0QixLQUFQLENBQWF1QixPQUFiLEdBQWYsS0FDS25ELE1BQU0sQ0FBQzRCLEtBQVAsQ0FBYXdCLFFBQWI7QUFDUixHQTVFbUI7QUE2RXBCN0IsRUFBQUEsWUE3RW9CLHdCQTZFTjBCLEtBN0VNLEVBNkVDO0FBQ2pCLFFBQUk1QixJQUFJLEdBQUc0QixLQUFLLENBQUNDLE1BQWpCO0FBQ0EsUUFBSXBCLFNBQVMsR0FBR21CLEtBQUssQ0FBQ25CLFNBQXRCO0FBQ0FULElBQUFBLElBQUksQ0FBQ1csTUFBTCxHQUFjLENBQUNGLFNBQWY7QUFDQSxRQUFJQSxTQUFKLEVBQWU5QixNQUFNLENBQUM0QixLQUFQLENBQWF5QixNQUFiLEdBQWYsS0FDS3JELE1BQU0sQ0FBQzRCLEtBQVAsQ0FBYTBCLE9BQWI7QUFDUixHQW5GbUI7QUFvRnBCVCxFQUFBQSxlQXBGb0IsNkJBb0ZEO0FBQ2Y3QyxJQUFBQSxNQUFNLENBQUN1RCxLQUFQLENBQWFDLE1BQWI7QUFDQXhELElBQUFBLE1BQU0sQ0FBQ3lELE9BQVAsQ0FBZUMsZUFBZixDQUErQixZQUEvQjtBQUNIO0FBdkZtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOiuvue9rumdouadv1xyXG4gKi9cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJHTTogY2MuVG9nZ2xlLFxyXG4gICAgICAgIFNFOiBjYy5Ub2dnbGUsXHJcbiAgICAgICAgR1M6IGNjLk5vZGUsXHJcbiAgICAgICAgTVNTOiBjYy5TbGlkZXIsXHJcbiAgICAgICAgRVNTOiBjYy5TbGlkZXIsXHJcbiAgICAgICAgTVNCOiBjYy5Ob2RlLFxyXG4gICAgICAgIEVTQjogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhbmVsSW5mbygpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMuTVNCLm9uKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5NU0JUb3VjaENhbmNlbE5leHQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuTVNCLm9uKFwidG91Y2hlbmRcIiwgdGhpcy5NU0JUb3VjaENhbmNlbE5leHQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRVNCLm9uKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5FU0JUb3VjaENhbmNlbE5leHQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRVNCLm9uKFwidG91Y2hlbmRcIiwgdGhpcy5FU0JUb3VjaENhbmNlbE5leHQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuQkdNLm5vZGUub24oXCJ0b2dnbGVcIiwgdGhpcy5jbGlja19tdXNpYywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TRS5ub2RlLm9uKFwidG9nZ2xlXCIsIHRoaXMuY2xpY2tfZWZmZWN0LCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMuTVNCLm9mZihcInRvdWNoY2FuY2VsXCIsIHRoaXMuTVNCVG91Y2hDYW5jZWxOZXh0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLk1TQi5vZmYoXCJ0b3VjaGVuZFwiLCB0aGlzLk1TQlRvdWNoQ2FuY2VsTmV4dCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5FU0Iub2ZmKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5FU0JUb3VjaENhbmNlbE5leHQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRVNCLm9mZihcInRvdWNoZW5kXCIsIHRoaXMuRVNCVG91Y2hDYW5jZWxOZXh0LCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICBzaG93UGFuZWxJbmZvICgpIHtcclxuICAgICAgICAvLyDmoLnmja7mnKzlnLDnvJPlrZjnmoTlo7Dpn7PmlbDmja7mnaXmm7TmlrDmjInpkq7nirbmgIFcclxuICAgICAgICBsZXQgQkdNU0UgPSBnbEdhbWUuYXVkaW8uZ2V0KFwiQkdNU0VcIik7XHJcbiAgICAgICAgdGhpcy5CR00uaXNDaGVja2VkID0gQkdNU0VbXCJCR01QbGF5U3RhdGVcIl07XHJcbiAgICAgICAgdGhpcy5CR00ubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm11c2ljXCIpLmFjdGl2ZSA9ICFCR01TRVtcIkJHTVBsYXlTdGF0ZVwiXTtcclxuICAgICAgICB0aGlzLlNFLmlzQ2hlY2tlZCA9IEJHTVNFW1wiU291bmRFZmZlY3RQbGF5U3RhdGVcIl07XHJcbiAgICAgICAgdGhpcy5TRS5ub2RlLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0XCIpLmFjdGl2ZSA9ICFCR01TRVtcIlNvdW5kRWZmZWN0UGxheVN0YXRlXCJdO1xyXG4gICAgICAgIHRoaXMuTVNTLnByb2dyZXNzID0gdGhpcy5NU1Mubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IEJHTVNFW1wiQkdNVm9sdW1lXCJdO1xyXG4gICAgICAgIHRoaXMuRVNTLnByb2dyZXNzID0gdGhpcy5FU1Mubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IEJHTVNFW1wiU291bmRFZmZlY3RWb2x1bWVcIl07XHJcbiAgICB9LFxyXG4gICAgTVNCVG91Y2hDYW5jZWxOZXh0ICgpIHtcclxuICAgICAgICBnbEdhbWUuYXVkaW8uc2F2ZVZvbHVtZSgpO1xyXG4gICAgfSxcclxuICAgIEVTQlRvdWNoQ2FuY2VsTmV4dCAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnNhdmVWb2x1bWUoKTtcclxuICAgIH0sXHJcbiAgICBvblNsaWRlclByb2Nlc3MgKG5vZGUsIHByb2Nlc3MpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IG5vZGUubmFtZTtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIm11c2ljc2xpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudC5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gcHJvY2VzcztcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5hdWRpby5zZXRCR01Wb2x1bWUocHJvY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVmZmVjdHNsaWRlclwiOlxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuYXVkaW8uc2V0U291bmRFZmZlY3RWb2x1bWUocHJvY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DbGljayAobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN3aXRjaGFjY1wiOiB0aGlzLmNsaWNrX3N3aXRjaGFjYygpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX211c2ljIChldmVudCkge1xyXG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0XHJcbiAgICAgICAgbGV0IGlzQ2hlY2tlZCA9IGV2ZW50LmlzQ2hlY2tlZDtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9ICFpc0NoZWNrZWQ7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkgZ2xHYW1lLmF1ZGlvLm9wZW5CR00oKTtcclxuICAgICAgICBlbHNlIGdsR2FtZS5hdWRpby5jbG9zZUJHTSgpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2VmZmVjdCAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldFxyXG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSBldmVudC5pc0NoZWNrZWQ7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSAhaXNDaGVja2VkO1xyXG4gICAgICAgIGlmIChpc0NoZWNrZWQpIGdsR2FtZS5hdWRpby5vcGVuU0UoKTtcclxuICAgICAgICBlbHNlIGdsR2FtZS5hdWRpby5jbG9zZVNFKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfc3dpdGNoYWNjICgpIHtcclxuICAgICAgICBnbEdhbWUubG9nb24ubG9nb3V0KCk7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2UucmVtb3ZlSXRlbUJ5S2V5KFwibG9naW5DYWNoZVwiKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
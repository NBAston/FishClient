
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/confirmbox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bb1e7x88CZGWpoS0eXLIh+i', 'confirmbox');
// modules/public/script/msgbox/confirmbox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_cancel: cc.Node,
    cancel_label: cc.Label,
    node_confirm: cc.Node,
    confirm_label: cc.Label,
    lab_content: cc.Label,
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.node.scale = glGame.systemclass.convertInterface();
    this.confirm = null;
    this.cancel = null;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("onStartGame", this.onStartGame, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("onStartGame", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.cancel();
        break;

      case "confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },

  /**
   * @param content 提示内容
   * @param isSingle 是否显示单个确定按钮
   * @param next 确定回调
   * @param cancel 取消回调
   * @param cancel_label 取消按钮文本
   * @param confirm_label 确定按钮文本
   */
  showMsg: function showMsg(content, isSingle, next, cancel, cancel_label, confirm_label) {
    var center = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    this.confirm = next || function () {};

    this.cancel = cancel || function () {
      this.node.destroy();
    };

    this.setType(isSingle);

    if (~content.indexOf("<color=")) {
      this.lab_content.node.active = false;
      this.richText_content.node.active = true;
      this.richText_content.string = content;
    } else {
      this.lab_content.string = content;
    }

    this.lab_content._forceUpdateRenderData();

    if (this.lab_content.node.height > 100) {
      this.lab_content.horizontalAlign = 0;
      this.setNewlineContent(this.lab_content);
    }

    if (this.richText_content.node.height > 100) {
      this.richText_content.horizontalAlign = 0;
      this.setNewlineContent(this.richText_content);
    }

    if (center) {
      this.lab_content.horizontalAlign = 1;
    }

    if (confirm_label) this.confirm_label.string = confirm_label;
  },
  onStartGame: function onStartGame() {
    this.remove();
  },
  //显示类型
  setType: function setType(isSingle) {
    if (isSingle) {
      this.node_cancel.active = false;
      this.node_confirm['_firstX'] = this.node_confirm.x;
      this.node_confirm.x = 0;
    } else {
      this.node_cancel.active = true;
      if (this.node_confirm['_firstX']) this.node_confirm.x = this.node_confirm['_firstX'];
    }
  },
  //有换行添加新的空格内容
  setNewlineContent: function setNewlineContent(lab_content) {
    var vacancy = "      ";
    lab_content.string = vacancy + lab_content.string;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcY29uZmlybWJveC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibm9kZV9jYW5jZWwiLCJjYyIsIk5vZGUiLCJjYW5jZWxfbGFiZWwiLCJMYWJlbCIsIm5vZGVfY29uZmlybSIsImNvbmZpcm1fbGFiZWwiLCJsYWJfY29udGVudCIsInJpY2hUZXh0X2NvbnRlbnQiLCJSaWNoVGV4dCIsIm9uTG9hZCIsIm5vZGUiLCJ6SW5kZXgiLCJzY2FsZSIsInN5c3RlbWNsYXNzIiwiY29udmVydEludGVyZmFjZSIsImNvbmZpcm0iLCJjYW5jZWwiLCJyZWdpc3RlckV2ZW50IiwiZW1pdHRlciIsIm9uIiwib25TdGFydEdhbWUiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiLCJvbkNsaWNrIiwibmFtZSIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZSIsInNob3dNc2ciLCJjb250ZW50IiwiaXNTaW5nbGUiLCJuZXh0IiwiY2VudGVyIiwiZGVzdHJveSIsInNldFR5cGUiLCJpbmRleE9mIiwiYWN0aXZlIiwic3RyaW5nIiwiX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSIsImhlaWdodCIsImhvcml6b250YWxBbGlnbiIsInNldE5ld2xpbmVDb250ZW50IiwieCIsInZhY2FuY3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVDLEVBQUUsQ0FBQ0MsSUFEUjtBQUVSQyxJQUFBQSxZQUFZLEVBQUVGLEVBQUUsQ0FBQ0csS0FGVDtBQUdSQyxJQUFBQSxZQUFZLEVBQUVKLEVBQUUsQ0FBQ0MsSUFIVDtBQUlSSSxJQUFBQSxhQUFhLEVBQUVMLEVBQUUsQ0FBQ0csS0FKVjtB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aUJtQyxlQUFqQixHQUFtQyxDQUFuQztBQUNIOztBQUNELFFBQUlwQyxhQUFKLEVBQW1CLEtBQUtBLGFBQUwsQ0FBbUJpQyxNQUFuQixHQUE0QmpDLGFBQTVCO0FBQ3RCLEdBbEVtQjtBQW9FcEJlLEVBQUFBLFdBcEVvQix5QkFvRU47QUFDVixTQUFLUSxNQUFMO0FBQ0gsR0F0RW1CO0FBdUVwQjtBQUNBTyxFQUFBQSxPQXhFb0IsbUJBd0VaSixRQXhFWSxFQXdFRjtBQUNkLFFBQUlBLFFBQUosRUFBYztBQUNWLFdBQUtoQyxXQUFMLENBQWlCc0MsTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxXQUFLakMsWUFBTCxDQUFrQixTQUFsQixJQUErQixLQUFLQSxZQUFMLENBQWtCdUMsQ0FBakQ7QUFDQSxXQUFLdkMsWUFBTCxDQUFrQnVDLENBQWxCLEdBQXNCLENBQXRCO0FBQ0gsS0FKRCxNQUlPO0FBQ0gsV0FBSzVDLFdBQUwsQ0FBaUJzQyxNQUFqQixHQUEwQixJQUExQjtBQUNBLFVBQUksS0FBS2pDLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBSixFQUFrQyxLQUFLQSxZQUFMLENBQWtCdUMsQ0FBbEIsR0FBc0IsS0FBS3ZDLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBdEI7QUFDckM7QUFDSixHQWpGbUI7QUFtRnBCO0FBQ0FzQyxFQUFBQSxpQkFwRm9CLDZCQW9GRnBDLFdBcEZFLEVBb0ZXO0FBQzNCLFFBQUlzQyxPQUFPLEdBQUcsUUFBZDtBQUNBdEMsSUFBQUEsV0FBVyxDQUFDZ0MsTUFBWixHQUFxQk0sT0FBTyxHQUFHdEMsV0FBVyxDQUFDZ0MsTUFBM0M7QUFDSDtBQXZGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBub2RlX2NhbmNlbDogY2MuTm9kZSxcclxuICAgICAgICBjYW5jZWxfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIG5vZGVfY29uZmlybTogY2MuTm9kZSxcclxuICAgICAgICBjb25maXJtX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfY29udGVudDogY2MuTGFiZWwsXHJcbiAgICAgICAgcmljaFRleHRfY29udGVudDogY2MuUmljaFRleHQsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IGdsR2FtZS5zeXN0ZW1jbGFzcy5jb252ZXJ0SW50ZXJmYWNlKCk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbmNlbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uU3RhcnRHYW1lXCIsIHRoaXMub25TdGFydEdhbWUsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblN0YXJ0R2FtZVwiLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNhbmNlbCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbmZpcm1cIjogdGhpcy5jb25maXJtKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaPkOekuuWGheWuuVxyXG4gICAgICogQHBhcmFtIGlzU2luZ2xlIOaYr+WQpuaYvuekuuWNleS4quehruWumuaMiemSrlxyXG4gICAgICogQHBhcmFtIG5leHQg56Gu5a6a5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gY2FuY2VsIOWPlua2iOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNhbmNlbF9sYWJlbCDlj5bmtojmjInpkq7mlofmnKxcclxuICAgICAqIEBwYXJhbSBjb25maXJtX2xhYmVsIOehruWumuaMiemSruaWh+acrFxyXG4gICAgICovXHJcbiAgICBzaG93TXNnKGNvbnRlbnQsIGlzU2luZ2xlLCBuZXh0LCBjYW5jZWwsIGNhbmNlbF9sYWJlbCwgY29uZmlybV9sYWJlbCwgY2VudGVyID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm0gPSBuZXh0IHx8IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICB0aGlzLmNhbmNlbCA9IGNhbmNlbCB8fCBmdW5jdGlvbiAoKSB7IHRoaXMubm9kZS5kZXN0cm95KCkgfTtcclxuICAgICAgICB0aGlzLnNldFR5cGUoaXNTaW5nbGUpO1xyXG4gICAgICAgIGlmICh+Y29udGVudC5pbmRleE9mKFwiPGNvbG9yPVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9jb250ZW50Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHRfY29udGVudC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHRfY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2NvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYWJfY29udGVudC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFiX2NvbnRlbnQubm9kZS5oZWlnaHQgPiAxMDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJfY29udGVudC5ob3Jpem9udGFsQWxpZ24gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldE5ld2xpbmVDb250ZW50KHRoaXMubGFiX2NvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yaWNoVGV4dF9jb250ZW50Lm5vZGUuaGVpZ2h0ID4gMTAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHRfY29udGVudC5ob3Jpem9udGFsQWxpZ24gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldE5ld2xpbmVDb250ZW50KHRoaXMucmljaFRleHRfY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZW50ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJfY29udGVudC5ob3Jpem9udGFsQWxpZ24gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlybV9sYWJlbCkgdGhpcy5jb25maXJtX2xhYmVsLnN0cmluZyA9IGNvbmZpcm1fbGFiZWw7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mmL7npLrnsbvlnotcclxuICAgIHNldFR5cGUoaXNTaW5nbGUpIHtcclxuICAgICAgICBpZiAoaXNTaW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2NhbmNlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2NvbmZpcm1bJ19maXJzdFgnXSA9IHRoaXMubm9kZV9jb25maXJtLng7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9jb25maXJtLnggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9jYW5jZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZV9jb25maXJtWydfZmlyc3RYJ10pIHRoaXMubm9kZV9jb25maXJtLnggPSB0aGlzLm5vZGVfY29uZmlybVsnX2ZpcnN0WCddO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mnInmjaLooYzmt7vliqDmlrDnmoTnqbrmoLzlhoXlrrlcclxuICAgIHNldE5ld2xpbmVDb250ZW50KGxhYl9jb250ZW50KSB7XHJcbiAgICAgICAgbGV0IHZhY2FuY3kgPSBcIiAgICAgIFwiO1xyXG4gICAgICAgIGxhYl9jb250ZW50LnN0cmluZyA9IHZhY2FuY3kgKyBsYWJfY29udGVudC5zdHJpbmc7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
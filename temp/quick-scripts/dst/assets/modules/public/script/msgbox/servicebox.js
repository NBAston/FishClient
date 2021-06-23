
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/servicebox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a743VN0axGj6cvBzc+Ir2I', 'servicebox');
// modules/public/script/msgbox/servicebox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_content: cc.Label,
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.confirm = null;
    this.cancel = null;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
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
   * @param content   提示内容
   * @param next      确定回调
   * @param center    水平对齐
   */
  showMsg: function showMsg(content, next) {
    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    this.confirm = next || function () {
      glGame.panel.showService(true);
    };

    if (~content.indexOf("<color=")) {
      this.lab_content.node.active = false;
      this.richText_content.node.active = true;
      this.richText_content.string = content;
    } else {
      this.lab_content.string = content;
    }

    this.lab_content._forceUpdateRenderData();

    if (this.lab_content.node.height > 120) {
      this.lab_content.horizontalAlign = 0;
    }

    if (center) {
      this.lab_content.horizontalAlign = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcc2VydmljZWJveC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibGFiX2NvbnRlbnQiLCJjYyIsIkxhYmVsIiwicmljaFRleHRfY29udGVudCIsIlJpY2hUZXh0Iiwib25Mb2FkIiwibm9kZSIsInpJbmRleCIsImNvbmZpcm0iLCJjYW5jZWwiLCJyZWdpc3RlckV2ZW50IiwidW5SZWdpc3RlckV2ZW50IiwiT25EZXN0cm95Iiwib25DbGljayIsIm5hbWUiLCJjb25zb2xlIiwiZXJyb3IiLCJyZW1vdmUiLCJzaG93TXNnIiwiY29udGVudCIsIm5leHQiLCJjZW50ZXIiLCJwYW5lbCIsInNob3dTZXJ2aWNlIiwiaW5kZXhPZiIsImFjdGl2ZSIsInN0cmluZyIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJoZWlnaHQiLCJob3Jpem9udGFsQWxpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVDLEVBQUUsQ0FBQ0MsS0FEUjtBQUVSQyxJQUFBQSxnQkFBZ0IsRUFBRUYsRUFBRSxDQUFDRztBQUZiLEdBRFE7QUFLcEJDLEVBQUFBLE1BTG9CLG9CQUtYO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLGFBQUw7QUFDSCxHQVZtQjtBQVlwQkEsRUFBQUEsYUFab0IsMkJBWUosQ0FBRyxDQVpDO0FBY3BCQyxFQUFBQSxlQWRvQiw2QkFjRixDQUFHLENBZEQ7QUFnQnBCQyxFQUFBQSxTQWhCb0IsdUJBZ0JSO0FBQ1IsU0FBS0QsZUFBTDtBQUNILEdBbEJtQjtBQW9CcEJFLEVBQUFBLE9BcEJvQixtQkFvQlpDLElBcEJZLEVBb0JOUixJQXBCTSxFQW9CQTtBQUNoQixZQUFRUSxJQUFSO0FBQ0ksV0FBSyxPQUFMO0FBQWM7O0FBQ2QsV0FBSyxTQUFMO0FBQWdCLGFBQUtOLE9BQUw7QUFBZ0I7O0FBQ2hDO0FBQVNPLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDRixJQUEzQztBQUhiOztBQUtBLFNBQUtHLE1BQUw7QUFDSCxHQTNCbUI7O0FBNEJwQjs7Ozs7QUFLQUMsRUFBQUEsT0FqQ29CLG1CQWlDWkMsT0FqQ1ksRUFpQ0hDLElBakNHLEVBaUNtQjtBQUFBLFFBQWhCQyxNQUFnQix1RUFBUCxLQUFPOztBQUNuQyxTQUFLYixPQUFMLEdBQWVZLElBQUksSUFBSSxZQUFZO0FBQUV4QixNQUFBQSxNQUFNLENBQUMwQixLQUFQLENBQWFDLFdBQWIsQ0FBeUIsSUFBekI7QUFBaUMsS0FBdEU7O0FBQ0EsUUFBSSxDQUFDSixPQUFPLENBQUNLLE9BQVIsQ0FBZ0IsU0FBaEIsQ0FBTCxFQUFpQztBQUM3QixXQUFLeEIsV0FBTCxDQUFpQk0sSUFBakIsQ0FBc0JtQixNQUF0QixHQUErQixLQUEvQjtBQUNBLFdBQUt0QixnQkFBTCxDQUFzQkcsSUFBdEIsQ0FBMkJtQixNQUEzQixHQUFvQyxJQUFwQztBQUNBLFdBQUt0QixnQkFBTCxDQUFzQnVCLE1BQXRCLEdBQStCUCxPQUEvQjtBQUNILEtBSkQsTUFJTztBQUNILFdBQUtuQixXQUFMLENBQWlCMEIsTUFBakIsR0FBMEJQLE9BQTFCO0FBQ0g7O0FBQ0QsU0FBS25CLFdBQUwsQ0FBaUIyQixzQkFBakI7O0FBQ0EsUUFBSSxLQUFLM0IsV0FBTCxDQUFpQk0sSUFBakIsQ0FBc0JzQixNQUF0QixHQUErQixHQUFuQyxFQUF3QztBQUNwQyxXQUFLNUIsV0FBTCxDQUFpQjZCLGVBQWpCLEdBQW1DLENBQW5DO0FBQ0g7O0FBQ0QsUUFBSVIsTUFBSixFQUFZO0FBQ1IsV0FBS3JCLFdBQUwsQ0FBaUI2QixlQUFqQixHQUFtQyxDQUFuQztBQUNIO0FBQ0o7QUFqRG1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGFiX2NvbnRlbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJpY2hUZXh0X2NvbnRlbnQ6IGNjLlJpY2hUZXh0LFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMDtcclxuICAgICAgICB0aGlzLmNvbmZpcm0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHsgfSxcclxuXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7IH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMuY29uZmlybSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCAgIOaPkOekuuWGheWuuVxyXG4gICAgICogQHBhcmFtIG5leHQgICAgICDnoa7lrprlm57osINcclxuICAgICAqIEBwYXJhbSBjZW50ZXIgICAg5rC05bmz5a+56b2QXHJcbiAgICAgKi9cclxuICAgIHNob3dNc2coY29udGVudCwgbmV4dCwgY2VudGVyID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm0gPSBuZXh0IHx8IGZ1bmN0aW9uICgpIHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKHRydWUpOyB9O1xyXG4gICAgICAgIGlmICh+Y29udGVudC5pbmRleE9mKFwiPGNvbG9yPVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9jb250ZW50Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHRfY29udGVudC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHRfY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2NvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYWJfY29udGVudC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFiX2NvbnRlbnQubm9kZS5oZWlnaHQgPiAxMjApIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJfY29udGVudC5ob3Jpem9udGFsQWxpZ24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2NvbnRlbnQuaG9yaXpvbnRhbEFsaWduID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==
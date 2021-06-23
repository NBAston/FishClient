
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/room/exchangeBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1694bkqjB1ANpvAh9dLfXcr', 'exchangeBox');
// modules/plaza/script/prefab/room/exchangeBox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        break;

      case "btn_confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },

  /**
   * @param content 提示内容
   * @param next 确定回调
   */
  showMsg: function showMsg(content, next) {
    this.confirm = next || function () {};

    this.richText_content.string = content;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxyb29tXFxleGNoYW5nZUJveC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwicmljaFRleHRfY29udGVudCIsImNjIiwiUmljaFRleHQiLCJvbkxvYWQiLCJub2RlIiwiekluZGV4IiwicmVnaXN0ZXJFdmVudCIsInVuUmVnaXN0ZXJFdmVudCIsIk9uRGVzdHJveSIsIm9uQ2xpY2siLCJuYW1lIiwiY29uZmlybSIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZSIsInNob3dNc2ciLCJjb250ZW50IiwibmV4dCIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFQyxFQUFFLENBQUNDO0FBRGIsR0FEUTtBQUlwQkMsRUFBQUEsTUFKb0Isb0JBSVg7QUFDTCxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxTQUFLQyxhQUFMO0FBQ0gsR0FQbUI7QUFRcEJBLEVBQUFBLGFBUm9CLDJCQVFKLENBQ2YsQ0FUbUI7QUFVcEJDLEVBQUFBLGVBVm9CLDZCQVVGLENBQ2pCLENBWG1CO0FBWXBCQyxFQUFBQSxTQVpvQix1QkFZUjtBQUNSLFNBQUtELGVBQUw7QUFDSCxHQWRtQjtBQWdCcEJFLEVBQUFBLE9BaEJvQixtQkFnQlpDLElBaEJZLEVBZ0JOTixJQWhCTSxFQWdCQTtBQUNoQixZQUFRTSxJQUFSO0FBQ0ksV0FBSyxXQUFMO0FBQWtCOztBQUNsQixXQUFLLGFBQUw7QUFBb0IsYUFBS0MsT0FBTDtBQUFnQjs7QUFDcEM7QUFBU0MsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNILElBQTNDO0FBSGI7O0FBS0EsU0FBS0ksTUFBTDtBQUNILEdBdkJtQjs7QUF3QnBCOzs7O0FBSUFDLEVBQUFBLE9BNUJvQixtQkE0QlpDLE9BNUJZLEVBNEJIQyxJQTVCRyxFQTRCRztBQUNuQixTQUFLTixPQUFMLEdBQWVNLElBQUksSUFBSSxZQUFZLENBQUcsQ0FBdEM7O0FBRUEsU0FBS2pCLGdCQUFMLENBQXNCa0IsTUFBdEIsR0FBK0JGLE9BQS9CO0FBQ0g7QUFoQ21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcmljaFRleHRfY29udGVudDogY2MuUmljaFRleHQsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jb25maXJtXCI6IHRoaXMuY29uZmlybSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmj5DnpLrlhoXlrrlcclxuICAgICAqIEBwYXJhbSBuZXh0IOehruWumuWbnuiwg1xyXG4gICAgICovXHJcbiAgICBzaG93TXNnKGNvbnRlbnQsIG5leHQpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm0gPSBuZXh0IHx8IGZ1bmN0aW9uICgpIHsgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dF9jb250ZW50LnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
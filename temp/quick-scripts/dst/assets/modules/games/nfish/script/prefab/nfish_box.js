
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_box.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a54dVt89BOfZLJeSXBMpzX', 'nfish_box');
// modules/games/nfish/script/prefab/nfish_box.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_cancel: cc.Node,
    node_confirm: cc.Node,
    lab_content: cc.Label,
    richText_content: cc.RichText,
    node_exitRoomTip: cc.Node
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
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
   */
  showMsg: function showMsg(content, isSingle, next, cancel) {
    var center = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

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

    if (this.lab_content.node.height > 60) {
      this.lab_content.horizontalAlign = 0;
    }

    if (center) {
      this.lab_content.horizontalAlign = 1;
    }
  },

  /**
   * @param next 确定回调
   */
  showMsgExit: function showMsgExit() {
    this.confirm = function () {
      glGame.room.exitRoom();
    };

    this.cancel = function () {
      this.remove();
    };

    this.node_exitRoomTip.active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfYm94LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJub2RlX2NhbmNlbCIsImNjIiwiTm9kZSIsIm5vZGVfY29uZmlybSIsImxhYl9jb250ZW50IiwiTGFiZWwiLCJyaWNoVGV4dF9jb250ZW50IiwiUmljaFRleHQiLCJub2RlX2V4aXRSb29tVGlwIiwib25Mb2FkIiwibm9kZSIsInpJbmRleCIsImNvbmZpcm0iLCJjYW5jZWwiLCJyZWdpc3RlckV2ZW50IiwiZW1pdHRlciIsIm9uIiwib25TdGFydEdhbWUiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiLCJvbkNsaWNrIiwibmFtZSIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZSIsInNob3dNc2ciLCJjb250ZW50IiwiaXNTaW5nbGUiLCJuZXh0IiwiY2VudGVyIiwiZGVzdHJveSIsInNldFR5cGUiLCJpbmRleE9mIiwiYWN0aXZlIiwic3RyaW5nIiwiX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSIsImhlaWdodCIsImhvcml6b250YWxBbGlnbiIsInNob3dNc2dFeGl0Iiwicm9vbSIsImV4aXRSb29tIiwieCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUMsRUFBRSxDQUFDQyxJQURSO0FBRVJDLElBQUFBLFlBQVksRUFBRUYsRUFBRSxDQUFDQyxJQUZUO0FBR1JFLElBQUFBLFdBQVcsRUFBRUgsRUFBRSxDQUFDSSxLQUhSO0FBSVJDLElBQUFBLGdCQUFnQixFQUFFTCxFQUFFLENBQUNNLFFBSmI7QUFLUkMsSUFBQUEsZ0JBQWdCLEVBQUVQLEVBQUUsQ0FBQ0M7QUFMYixHQURR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LFFBQUosRUFBYztBQUNWLFdBQUs1QixXQUFMLENBQWlCa0MsTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxXQUFLL0IsWUFBTCxDQUFrQixTQUFsQixJQUErQixLQUFLQSxZQUFMLENBQWtCdUMsQ0FBakQ7QUFDQSxXQUFLdkMsWUFBTCxDQUFrQnVDLENBQWxCLEdBQXNCLENBQXRCO0FBQ0gsS0FKRCxNQUlPO0FBQ0gsV0FBSzFDLFdBQUwsQ0FBaUJrQyxNQUFqQixHQUEwQixJQUExQjtBQUNBLFVBQUksS0FBSy9CLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBSixFQUFrQyxLQUFLQSxZQUFMLENBQWtCdUMsQ0FBbEIsR0FBc0IsS0FBS3ZDLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBdEI7QUFDckM7QUFDSjtBQWhGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBub2RlX2NhbmNlbDogY2MuTm9kZSxcclxuICAgICAgICBub2RlX2NvbmZpcm06IGNjLk5vZGUsXHJcbiAgICAgICAgbGFiX2NvbnRlbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJpY2hUZXh0X2NvbnRlbnQ6IGNjLlJpY2hUZXh0LFxyXG4gICAgICAgIG5vZGVfZXhpdFJvb21UaXA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuY29uZmlybSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblN0YXJ0R2FtZVwiLCB0aGlzLm9uU3RhcnRHYW1lLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25TdGFydEdhbWVcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jYW5jZWwoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMuY29uZmlybSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmj5DnpLrlhoXlrrlcclxuICAgICAqIEBwYXJhbSBpc1NpbmdsZSDmmK/lkKbmmL7npLrljZXkuKrnoa7lrprmjInpkq5cclxuICAgICAqIEBwYXJhbSBuZXh0IOehruWumuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNhbmNlbCDlj5bmtojlm57osINcclxuICAgICAqL1xyXG4gICAgc2hvd01zZyhjb250ZW50LCBpc1NpbmdsZSwgbmV4dCwgY2FuY2VsLCBjZW50ZXIgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybSA9IG5leHQgfHwgZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgIHRoaXMuY2FuY2VsID0gY2FuY2VsIHx8IGZ1bmN0aW9uICgpIHsgdGhpcy5ub2RlLmRlc3Ryb3koKSB9O1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZShpc1NpbmdsZSk7XHJcbiAgICAgICAgaWYgKH5jb250ZW50LmluZGV4T2YoXCI8Y29sb3I9XCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2NvbnRlbnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dF9jb250ZW50Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dF9jb250ZW50LnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJfY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYl9jb250ZW50Ll9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgICAgICBpZiAodGhpcy5sYWJfY29udGVudC5ub2RlLmhlaWdodCA+IDYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2NvbnRlbnQuaG9yaXpvbnRhbEFsaWduID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbnRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9jb250ZW50Lmhvcml6b250YWxBbGlnbiA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBuZXh0IOehruWumuWbnuiwg1xyXG4gICAgICovXHJcbiAgICBzaG93TXNnRXhpdCgpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm0gPSBmdW5jdGlvbiAoKSB7IGdsR2FtZS5yb29tLmV4aXRSb29tKCk7IH07XHJcbiAgICAgICAgdGhpcy5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7IHRoaXMucmVtb3ZlKCk7IH07XHJcbiAgICAgICAgdGhpcy5ub2RlX2V4aXRSb29tVGlwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mmL7npLrnsbvlnotcclxuICAgIHNldFR5cGUoaXNTaW5nbGUpIHtcclxuICAgICAgICBpZiAoaXNTaW5nbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2NhbmNlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2NvbmZpcm1bJ19maXJzdFgnXSA9IHRoaXMubm9kZV9jb25maXJtLng7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9jb25maXJtLnggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9jYW5jZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZV9jb25maXJtWydfZmlyc3RYJ10pIHRoaXMubm9kZV9jb25maXJtLnggPSB0aGlzLm5vZGVfY29uZmlybVsnX2ZpcnN0WCddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==
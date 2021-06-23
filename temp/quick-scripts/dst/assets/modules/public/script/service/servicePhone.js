
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/service/servicePhone.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0879BQkMdJw6uHBxXlBzCD', 'servicePhone');
// modules/public/script/service/servicePhone.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_bg: cc.Node,
    phoneItem: cc.Node,
    phoneParent: cc.Node
  },
  onLoad: function onLoad() {
    this.CustomServerPhone = null;
    this.registerEvent();
    glGame.user.ReqCustomServerPhone();
  },
  refPayData: function refPayData() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateCustomServerPhone", this.updateCustomServerPhone, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateCustomServerPhone", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_nowCall":
        this.callPhoneNum();
        break;
    }
  },
  callPhoneNum: function callPhoneNum() {
    if (!this.CustomServerPhone) return;

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.phone));
    } else if (cc.sys.os === cc.sys.OS_IOS) {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.dialCode + this.CustomServerPhone.phone));
    } else {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.phone));
    }
  },
  customData: function customData() {},
  updateCustomServerPhone: function updateCustomServerPhone(data) {
    this.CustomServerPhone = data;
    glGame.panel.showRemoteImage(this.node_bg, this.CustomServerPhone.imgUrl); // this.node_bg.position = cc.v2(0,0); 

    var phoneNumber = this.CustomServerPhone.phone;
    this.phoneParent.getComponent(cc.Label).string = phoneNumber;
    console.log("这是获取客服电话", this.CustomServerPhone);
  },
  start: function start() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNlcnZpY2VcXHNlcnZpY2VQaG9uZS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibm9kZV9iZyIsImNjIiwiTm9kZSIsInBob25lSXRlbSIsInBob25lUGFyZW50Iiwib25Mb2FkIiwiQ3VzdG9tU2VydmVyUGhvbmUiLCJyZWdpc3RlckV2ZW50IiwidXNlciIsIlJlcUN1c3RvbVNlcnZlclBob25lIiwicmVmUGF5RGF0YSIsImVtaXR0ZXIiLCJvbiIsInVwZGF0ZUN1c3RvbVNlcnZlclBob25lIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2FsbFBob25lTnVtIiwic3lzIiwib3MiLCJPU19BTkRST0lEIiwib3BlblVSTCIsInBob25lIiwiT1NfSU9TIiwiZGlhbENvZGUiLCJjdXN0b21EYXRhIiwiZGF0YSIsInBhbmVsIiwic2hvd1JlbW90ZUltYWdlIiwiaW1nVXJsIiwicGhvbmVOdW1iZXIiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUMsRUFBRSxDQUFDQyxJQURKO0FBRVJDLElBQUFBLFNBQVMsRUFBRUYsRUFBRSxDQUFDQyxJQUZOO0FBR1JFLElBQUFBLFdBQVcsRUFBRUgsRUFBRSxDQUFDQztBQUhSLEdBRlE7QUFRcEJHLEVBQUFBLE1BUm9CLG9CQVFYO0FBQ0wsU0FBS0MsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxTQUFLQyxhQUFMO0FBQ0FYLElBQUFBLE1BQU0sQ0FBQ1ksSUFBUCxDQUFZQyxvQkFBWjtBQUNILEdBWm1CO0FBY3BCQyxFQUFBQSxVQWRvQix3QkFjUCxDQUNaLENBZm1CO0FBbUJwQkgsRUFBQUEsYUFuQm9CLDJCQW1CSjtBQUNaWCxJQUFBQSxNQUFNLENBQUNlLE9BQVAsQ0FBZUMsRUFBZixDQUFrQix5QkFBbEIsRUFBNkMsS0FBS0MsdUJBQWxELEVBQTJFLElBQTNFO0FBQ0gsR0FyQm1CO0FBc0JwQkMsRUFBQUEsZUF0Qm9CLDZCQXNCRjtBQUNkbEIsSUFBQUEsTUFBTSxDQUFDZSxPQUFQLENBQWVJLEdBQWYsQ0FBbUIseUJBQW5CLEVBQThDLElBQTlDO0FBQ0gsR0F4Qm1CO0FBeUJwQkMsRUFBQUEsT0F6Qm9CLG1CQXlCWkMsSUF6QlksRUF5Qk5DLElBekJNLEVBeUJBO0FBQ2hCLFlBQVFELElBQVI7QUFDSSxXQUFLLGFBQUw7QUFBb0IsYUFBS0UsWUFBTDtBQUFxQjtBQUQ3QztBQUdILEdBN0JtQjtBQThCcEJBLEVBQUFBLFlBOUJvQiwwQkE4Qkw7QUFDWCxRQUFJLENBQUMsS0FBS2IsaUJBQVYsRUFBNkI7O0FBQzdCLFFBQUlMLEVBQUUsQ0FBQ21CLEdBQUgsQ0FBT0MsRUFBUCxLQUFjcEIsRUFBRSxDQUFDbUIsR0FBSCxDQUFPRSxVQUF6QixFQUFxQztBQUNqQ3JCLE1BQUFBLEVBQUUsQ0FBQ21CLEdBQUgsQ0FBT0csT0FBUCxpQkFBd0IsS0FBS2pCLGlCQUFMLENBQXVCa0IsS0FBL0M7QUFDSCxLQUZELE1BRU8sSUFBSXZCLEVBQUUsQ0FBQ21CLEdBQUgsQ0FBT0MsRUFBUCxLQUFjcEIsRUFBRSxDQUFDbUIsR0FBSCxDQUFPSyxNQUF6QixFQUFpQztBQUNwQ3hCLE1BQUFBLEVBQUUsQ0FBQ21CLEdBQUgsQ0FBT0csT0FBUCxpQkFBd0IsS0FBS2pCLGlCQUFMLENBQXVCb0IsUUFBdkIsR0FBa0MsS0FBS3BCLGlCQUFMLENBQXVCa0IsS0FBakY7QUFDSCxLQUZNLE1BRUE7QUFDSHZCLE1BQUFBLEVBQUUsQ0FBQ21CLEdBQUgsQ0FBT0csT0FBUCxpQkFBd0IsS0FBS2pCLGlCQUFMLENBQXVCa0IsS0FBL0M7QUFDSDtBQUVKLEdBeENtQjtBQXlDcEJHLEVBQUFBLFVBekNvQix3QkF5Q1AsQ0FDWixDQTFDbUI7QUE0Q3BCZCxFQUFBQSx1QkE1Q29CLG1DQTRDSWUsSUE1Q0osRUE0Q1U7QUFDMUIsU0FBS3RCLGlCQUFMLEdBQXlCc0IsSUFBekI7QUFDQWhDLElBQUFBLE1BQU0sQ0FBQ2lDLEtBQVAsQ0FBYUMsZUFBYixDQUE2QixLQUFLOUIsT0FBbEMsRUFBMkMsS0FBS00saUJBQUwsQ0FBdUJ5QixNQUFsRSxFQUYwQixDQUcxQjs7QUFDQSxRQUFJQyxXQUFXLEdBQUcsS0FBSzFCLGlCQUFMLENBQXVCa0IsS0FBekM7QUFDQSxTQUFLcEIsV0FBTCxDQUFpQjZCLFlBQWpCLENBQThCaEMsRUFBRSxDQUFDaUMsS0FBakMsRUFBd0NDLE1BQXhDLEdBQWlESCxXQUFqRDtBQUNBSSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLEtBQUsvQixpQkFBN0I7QUFDSCxHQW5EbUI7QUFzRHBCZ0MsRUFBQUEsS0F0RG9CLG1CQXNEWixDQUVQLENBeERtQjtBQTBEcEJDLEVBQUFBLFNBMURvQix1QkEwRFI7QUFDUixTQUFLekIsZUFBTDtBQUNILEdBNURtQixDQTZEcEI7O0FBN0RvQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbm9kZV9iZzogY2MuTm9kZSxcclxuICAgICAgICBwaG9uZUl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgcGhvbmVQYXJlbnQ6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVNlcnZlclBob25lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICBnbEdhbWUudXNlci5SZXFDdXN0b21TZXJ2ZXJQaG9uZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZQYXlEYXRhKCkge1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVDdXN0b21TZXJ2ZXJQaG9uZVwiLCB0aGlzLnVwZGF0ZUN1c3RvbVNlcnZlclBob25lLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlQ3VzdG9tU2VydmVyUGhvbmVcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbm93Q2FsbFwiOiB0aGlzLmNhbGxQaG9uZU51bSgpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FsbFBob25lTnVtKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5DdXN0b21TZXJ2ZXJQaG9uZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKGB0ZWw6Ly8ke3RoaXMuQ3VzdG9tU2VydmVyUGhvbmUucGhvbmV9YClcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTChgdGVsOi8vJHt0aGlzLkN1c3RvbVNlcnZlclBob25lLmRpYWxDb2RlICsgdGhpcy5DdXN0b21TZXJ2ZXJQaG9uZS5waG9uZX1gKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKGB0ZWw6Ly8ke3RoaXMuQ3VzdG9tU2VydmVyUGhvbmUucGhvbmV9YClcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGN1c3RvbURhdGEoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUN1c3RvbVNlcnZlclBob25lKGRhdGEpIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVNlcnZlclBob25lID0gZGF0YTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKHRoaXMubm9kZV9iZywgdGhpcy5DdXN0b21TZXJ2ZXJQaG9uZS5pbWdVcmwpXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlX2JnLnBvc2l0aW9uID0gY2MudjIoMCwwKTsgXHJcbiAgICAgICAgbGV0IHBob25lTnVtYmVyID0gdGhpcy5DdXN0b21TZXJ2ZXJQaG9uZS5waG9uZTtcclxuICAgICAgICB0aGlzLnBob25lUGFyZW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGhvbmVOdW1iZXI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/ojrflj5blrqLmnI3nlLXor51cIiwgdGhpcy5DdXN0b21TZXJ2ZXJQaG9uZSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
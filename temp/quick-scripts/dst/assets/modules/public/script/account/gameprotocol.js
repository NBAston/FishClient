
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/account/gameprotocol.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7dabdbRp9hGQ67ll8pL5mV4', 'gameprotocol');
// modules/public/script/account/gameprotocol.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content_str: cc.RichText
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.initUI();
  },
  start: function start() {},
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  initUI: function initUI() {
    this.content_str.string = glGame.gamecfg.TERMSOFSERVICES;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      default:
        break;
    }
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGFjY291bnRcXGdhbWVwcm90b2NvbC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiY29udGVudF9zdHIiLCJjYyIsIlJpY2hUZXh0Iiwib25Mb2FkIiwicmVnaXN0ZXJFdmVudCIsImluaXRVSSIsInN0YXJ0IiwidW5SZWdpc3RlckV2ZW50Iiwic3RyaW5nIiwiZ2FtZWNmZyIsIlRFUk1TT0ZTRVJWSUNFUyIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsInJlbW92ZSIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUMsRUFBRSxDQUFDQztBQURSLEdBRlE7QUFNcEJDLEVBQUFBLE1BTm9CLG9CQU1YO0FBQ0wsU0FBS0MsYUFBTDtBQUNBLFNBQUtDLE1BQUw7QUFDSCxHQVRtQjtBQVVwQkMsRUFBQUEsS0FWb0IsbUJBVVosQ0FFUCxDQVptQjtBQWFwQkYsRUFBQUEsYUFib0IsMkJBYUosQ0FDZixDQWRtQjtBQWVwQkcsRUFBQUEsZUFmb0IsNkJBZUYsQ0FDakIsQ0FoQm1CO0FBa0JwQkYsRUFBQUEsTUFsQm9CLG9CQWtCWDtBQUNMLFNBQUtMLFdBQUwsQ0FBaUJRLE1BQWpCLEdBQXlCWixNQUFNLENBQUNhLE9BQVAsQ0FBZUMsZUFBeEM7QUFDSCxHQXBCbUI7QUF1QnBCQyxFQUFBQSxPQXZCb0IsbUJBdUJaQyxJQXZCWSxFQXVCTkMsSUF2Qk0sRUF1QkE7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssV0FBTDtBQUFrQixhQUFLRSxNQUFMO0FBQWU7O0FBQ2pDO0FBQVM7QUFGYjtBQUlILEdBNUJtQjtBQStCcEJDLEVBQUFBLFNBL0JvQix1QkErQlI7QUFDUixTQUFLUixlQUFMO0FBQ0gsR0FqQ21CLENBa0NwQjs7QUFsQ29CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb250ZW50X3N0cjogY2MuUmljaFRleHQsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudF9zdHIuc3RyaW5nID1nbEdhbWUuZ2FtZWNmZy5URVJNU09GU0VSVklDRVM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLnJlbW92ZSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
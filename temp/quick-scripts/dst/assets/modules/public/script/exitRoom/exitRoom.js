
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/exitRoom/exitRoom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47272yUq4tKmJzP7sUf3NHi', 'exitRoom');
// modules/public/script/exitRoom/exitRoom.js

"use strict";

glGame.baseclass.extend({
  properties: {
    hundred: cc.Node,
    coin: cc.Node
  },
  onLoad: function onLoad() {
    this.node.scale = glGame.systemclass.convertInterface();
  },
  showType: function showType(_type) {
    this[_type].active = true;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case 'btn_confirm':
        glGame.room.exitRoom();
        break;

      case 'btn_cancle':
        this.node.destroy();
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGV4aXRSb29tXFxleGl0Um9vbS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiaHVuZHJlZCIsImNjIiwiTm9kZSIsImNvaW4iLCJvbkxvYWQiLCJub2RlIiwic2NhbGUiLCJzeXN0ZW1jbGFzcyIsImNvbnZlcnRJbnRlcmZhY2UiLCJzaG93VHlwZSIsIl90eXBlIiwiYWN0aXZlIiwib25DbGljayIsIm5hbWUiLCJyb29tIiwiZXhpdFJvb20iLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFQyxFQUFFLENBQUNDLElBREo7QUFFUkMsSUFBQUEsSUFBSSxFQUFFRixFQUFFLENBQUNDO0FBRkQsR0FEUTtBQUtwQkUsRUFBQUEsTUFMb0Isb0JBS1g7QUFDTCxTQUFLQyxJQUFMLENBQVVDLEtBQVYsR0FBa0JWLE1BQU0sQ0FBQ1csV0FBUCxDQUFtQkMsZ0JBQW5CLEVBQWxCO0FBQ0gsR0FQbUI7QUFTcEJDLEVBQUFBLFFBVG9CLG9CQVNYQyxLQVRXLEVBU0o7QUFDWixTQUFLQSxLQUFMLEVBQVlDLE1BQVosR0FBcUIsSUFBckI7QUFDSCxHQVhtQjtBQWFwQkMsRUFBQUEsT0Fib0IsbUJBYVpDLElBYlksRUFhTlIsSUFiTSxFQWFBO0FBQ2hCLFlBQVFRLElBQVI7QUFDSSxXQUFLLGFBQUw7QUFDSWpCLFFBQUFBLE1BQU0sQ0FBQ2tCLElBQVAsQ0FBWUMsUUFBWjtBQUNBOztBQUNKLFdBQUssWUFBTDtBQUNJLGFBQUtWLElBQUwsQ0FBVVcsT0FBVjtBQUNBO0FBTlI7QUFRSDtBQXRCbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBodW5kcmVkOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvaW46IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IGdsR2FtZS5zeXN0ZW1jbGFzcy5jb252ZXJ0SW50ZXJmYWNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dUeXBlKF90eXBlKSB7XHJcbiAgICAgICAgdGhpc1tfdHlwZV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9jb25maXJtJzpcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5yb29tLmV4aXRSb29tKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnRuX2NhbmNsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19
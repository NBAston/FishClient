
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/maintainnotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'afe6flvN1NBY5dOW9ji23jb', 'maintainnotice');
// modules/public/script/msgbox/maintainnotice.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  onClick: function onClick(name, node) {
    console.log("这是当前按键的按钮名字", name);

    switch (name) {
      case "btn_exit":
        cc.game.end();
        break;

      case "btn_sever":
        this.serviceUrl = glGame.user.get('url').serviceOuter;
        cc.sys.openURL(this.serviceUrl);
        break;
    }
  },
  setContent: function setContent(content) {
    this.content.string = content;
  },
  OnDestroy: function OnDestroy() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcbWFpbnRhaW5ub3RpY2UuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJjYyIsIkxhYmVsIiwib25Mb2FkIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJlbmQiLCJzZXJ2aWNlVXJsIiwidXNlciIsImdldCIsInNlcnZpY2VPdXRlciIsInN5cyIsIm9wZW5VUkwiLCJzZXRDb250ZW50Iiwic3RyaW5nIiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBRXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFQyxFQUFFLENBQUNDO0FBREosR0FGUTtBQU1wQjtBQUVBQyxFQUFBQSxNQVJvQixvQkFRWCxDQUVSLENBVm1CO0FBV3BCQyxFQUFBQSxPQVhvQixtQkFXWkMsSUFYWSxFQVdOQyxJQVhNLEVBV0E7QUFDaEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkJILElBQTNCOztBQUNBLFlBQVFBLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFDSUosUUFBQUEsRUFBRSxDQUFDUSxJQUFILENBQVFDLEdBQVI7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSSxhQUFLQyxVQUFMLEdBQWtCZixNQUFNLENBQUNnQixJQUFQLENBQVlDLEdBQVosQ0FBZ0IsS0FBaEIsRUFBdUJDLFlBQXpDO0FBQ0FiLFFBQUFBLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxPQUFQLENBQWUsS0FBS0wsVUFBcEI7QUFDQTtBQVBSO0FBU0gsR0F0Qm1CO0FBdUJwQk0sRUFBQUEsVUF2Qm9CLHNCQXVCVGpCLE9BdkJTLEVBdUJEO0FBQ2YsU0FBS0EsT0FBTCxDQUFha0IsTUFBYixHQUFzQmxCLE9BQXRCO0FBQ0gsR0F6Qm1CO0FBMkJwQm1CLEVBQUFBLFNBM0JvQix1QkEyQlIsQ0FDWDtBQTVCbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY29udGVudDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeaMiemUrueahOaMiemSruWQjeWtl1wiLCBuYW1lKVxyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2V4aXRcIjpcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zZXZlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlVXJsID0gZ2xHYW1lLnVzZXIuZ2V0KCd1cmwnKS5zZXJ2aWNlT3V0ZXI7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTCh0aGlzLnNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldENvbnRlbnQoY29udGVudCl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
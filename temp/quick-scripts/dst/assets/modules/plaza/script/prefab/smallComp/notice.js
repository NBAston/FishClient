
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/smallComp/notice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89ba5AavA9JSqVxx0PI/DRM', 'notice');
// modules/plaza/script/prefab/smallComp/notice.js

"use strict";

/**
 * 公告面板
 */
glGame.baseclass.extend({
  properties: {
    noticecontent: cc.Label // 公告内容

  },
  onLoad: function onLoad() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqHorseRaceLamp", null, function (route, data) {
      _this.noticecontent.string = data.result.horse_race_lamp;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    glGame.panel.showInterface(); //判断是否要开启下一个界面

    this.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzbWFsbENvbXBcXG5vdGljZS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibm90aWNlY29udGVudCIsImNjIiwiTGFiZWwiLCJvbkxvYWQiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb3V0ZSIsImRhdGEiLCJzdHJpbmciLCJyZXN1bHQiLCJob3JzZV9yYWNlX2xhbXAiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJjbGlja19jbG9zZSIsImNvbnNvbGUiLCJlcnJvciIsInBhbmVsIiwic2hvd0ludGVyZmFjZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUVDLEVBQUUsQ0FBQ0MsS0FEVixDQUNvQjs7QUFEcEIsR0FEUTtBQUlwQkMsRUFBQUEsTUFKb0Isb0JBSVY7QUFBQTs7QUFDTlAsSUFBQUEsTUFBTSxDQUFDUSxPQUFQLENBQWVDLFFBQWYsQ0FBd0IsdUJBQXhCLEVBQWlELElBQWpELEVBQXVELFVBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFlO0FBQ2xFLE1BQUEsS0FBSSxDQUFDUCxhQUFMLENBQW1CUSxNQUFuQixHQUE0QkQsSUFBSSxDQUFDRSxNQUFMLENBQVlDLGVBQXhDO0FBQ0gsS0FGRDtBQUdILEdBUm1CO0FBU3BCQyxFQUFBQSxPQVRvQixtQkFTWEMsSUFUVyxFQVNMQyxJQVRLLEVBU0M7QUFDakIsWUFBUUQsSUFBUjtBQUNJLFdBQUssT0FBTDtBQUFjLGFBQUtFLFdBQUw7QUFBb0I7O0FBQ2xDO0FBQVNDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkLEVBQTJDSixJQUEzQztBQUZiO0FBSUgsR0FkbUI7QUFlcEJFLEVBQUFBLFdBZm9CLHlCQWVMO0FBQ1hsQixJQUFBQSxNQUFNLENBQUNxQixLQUFQLENBQWFDLGFBQWIsR0FEVyxDQUNrQjs7QUFDN0IsU0FBS0MsTUFBTDtBQUNIO0FBbEJtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWFrOWRiumdouadv1xyXG4gKi9cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vdGljZWNvbnRlbnQ6IGNjLkxhYmVsICAgICAvLyDlhazlkYrlhoXlrrlcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFIb3JzZVJhY2VMYW1wXCIsIG51bGwsIChyb3V0ZSwgZGF0YSk9PntcclxuICAgICAgICAgICAgdGhpcy5ub3RpY2Vjb250ZW50LnN0cmluZyA9IGRhdGEucmVzdWx0LmhvcnNlX3JhY2VfbGFtcDtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sgKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xpY2tfY2xvc2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbGlja19jbG9zZSAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dJbnRlcmZhY2UoKTsvL+WIpOaWreaYr+WQpuimgeW8gOWQr+S4i+S4gOS4queVjOmdolxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7IFxyXG4gICAgfVxyXG59KTtcclxuIl19
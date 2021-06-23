
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/shop/complainPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ed34zVubdBmbi0F5lvqV1Z', 'complainPanel');
// modules/public/script/shop/complainPanel.js

"use strict";

glGame.baseclass.extend({
  properties: {
    labReward: cc.Label //buttonLab: cc.Label,

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false;
    this.reqComplaintConfig();
  },
  reqComplaintConfig: function reqComplaintConfig() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqComplaintContact", null, function (route, data) {
      _this.Type = data.type; ///this.buttonLab.string = data.type == "qq" ? "复制并打开QQ" : "复制并打开微信";

      _this.labReward.string = _this.cutFloat(data.reward) + "元";
      _this.openUrl = data.url;
      console.log("链接地址", _this.openUrl);
      _this.node.active = true;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        console.log("close-------");
        this.remove();
        break;

      case "copy_open":
        this.copy_open();
        break;
    }
  },
  cutFloat: function cutFloat(num) {
    return this.getFloat(Number(num).div(100)).toString();
  },
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return value.toFixed(num);
    }
  },
  copy_open: function copy_open() {
    console.log("copy_open", this.openUrl);

    if (this.Type == "qq") {
      console.log("copy_open", this.openUrl); //cc.sys.openURL(this.openUrl)

      glGame.platform.openURL(this.openUrl);
    } else {
      glGame.platform.openURL("weixin://");
    }
  },
  OnDestroy: function OnDestroy() {},
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNob3BcXGNvbXBsYWluUGFuZWwuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImxhYlJld2FyZCIsImNjIiwiTGFiZWwiLCJvbkxvYWQiLCJub2RlIiwiYWN0aXZlIiwicmVxQ29tcGxhaW50Q29uZmlnIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJkYXRhIiwiVHlwZSIsInR5cGUiLCJzdHJpbmciLCJjdXRGbG9hdCIsInJld2FyZCIsIm9wZW5VcmwiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwib25DbGljayIsIm5hbWUiLCJyZW1vdmUiLCJjb3B5X29wZW4iLCJudW0iLCJnZXRGbG9hdCIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwidmFsdWUiLCJpc05hTiIsInRvRml4ZWQiLCJwbGF0Zm9ybSIsIm9wZW5VUkwiLCJPbkRlc3Ryb3kiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxLQUROLENBRVI7O0FBRlEsR0FGUTtBQU9wQjtBQUVBQyxFQUFBQSxNQVRvQixvQkFTWDtBQUNMLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNBLFNBQUtDLGtCQUFMO0FBQ0gsR0FabUI7QUFjcEJBLEVBQUFBLGtCQWRvQixnQ0FjQztBQUFBOztBQUNqQlYsSUFBQUEsTUFBTSxDQUFDVyxPQUFQLENBQWVDLFFBQWYsQ0FBd0IsMEJBQXhCLEVBQW9ELElBQXBELEVBQTBELFVBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFpQjtBQUN2RSxNQUFBLEtBQUksQ0FBQ0MsSUFBTCxHQUFZRCxJQUFJLENBQUNFLElBQWpCLENBRHVFLENBRXZFOztBQUNBLE1BQUEsS0FBSSxDQUFDWixTQUFMLENBQWVhLE1BQWYsR0FBd0IsS0FBSSxDQUFDQyxRQUFMLENBQWNKLElBQUksQ0FBQ0ssTUFBbkIsSUFBMkIsR0FBbkQ7QUFDQSxNQUFBLEtBQUksQ0FBQ0MsT0FBTCxHQUFlTixJQUFJLENBQUNPLEdBQXBCO0FBQ0FDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBSSxDQUFDSCxPQUF6QjtBQUNBLE1BQUEsS0FBSSxDQUFDWixJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxLQVBEO0FBUUgsR0F2Qm1CO0FBeUJwQmUsRUFBQUEsT0F6Qm9CLG1CQXlCWkMsSUF6QlksRUF5Qk5qQixJQXpCTSxFQXlCQTtBQUNoQixZQUFRaUIsSUFBUjtBQUNJLFdBQUssT0FBTDtBQUNJSCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsYUFBS0csTUFBTDtBQUNBOztBQUNKLFdBQUssV0FBTDtBQUNJLGFBQUtDLFNBQUw7QUFDQTtBQVBSO0FBU0gsR0FuQ21CO0FBcUNwQlQsRUFBQUEsUUFyQ29CLG9CQXFDWFUsR0FyQ1csRUFxQ047QUFDVixXQUFRLEtBQUtDLFFBQUwsQ0FBY0MsTUFBTSxDQUFDRixHQUFELENBQU4sQ0FBWUcsR0FBWixDQUFnQixHQUFoQixDQUFkLENBQUQsQ0FBc0NDLFFBQXRDLEVBQVA7QUFDSCxHQXZDbUI7QUF5Q3BCSCxFQUFBQSxRQXpDb0Isb0JBeUNYSSxLQXpDVyxFQXlDSztBQUFBLFFBQVRMLEdBQVMsdUVBQUgsQ0FBRztBQUNyQkssSUFBQUEsS0FBSyxHQUFHSCxNQUFNLENBQUNHLEtBQUQsQ0FBZDtBQUNBLFFBQUlDLEtBQUssQ0FBQ0QsS0FBRCxDQUFULEVBQWtCOztBQUNsQixRQUFJLENBQUMsQ0FBQ0EsS0FBRixLQUFZQSxLQUFoQixFQUF1QjtBQUNuQixhQUFPQSxLQUFLLENBQUNELFFBQU4sRUFBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU9DLEtBQUssQ0FBQ0UsT0FBTixDQUFjUCxHQUFkLENBQVA7QUFDSDtBQUNKLEdBakRtQjtBQW1EcEJELEVBQUFBLFNBbkRvQix1QkFtRFI7QUFDUkwsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QixLQUFLSCxPQUE5Qjs7QUFDQSxRQUFJLEtBQUtMLElBQUwsSUFBYSxJQUFqQixFQUF1QjtBQUNuQk8sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QixLQUFLSCxPQUE5QixFQURtQixDQUVuQjs7QUFDQXBCLE1BQUFBLE1BQU0sQ0FBQ29DLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLEtBQUtqQixPQUE3QjtBQUNILEtBSkQsTUFJTztBQUNIcEIsTUFBQUEsTUFBTSxDQUFDb0MsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0IsV0FBeEI7QUFDSDtBQUNKLEdBNURtQjtBQThEcEJDLEVBQUFBLFNBOURvQix1QkE4RFIsQ0FBRyxDQTlESztBQWdFcEJDLEVBQUFBLEtBaEVvQixtQkFnRVosQ0FFUCxDQWxFbUIsQ0FvRXBCOztBQXBFb0IsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYlJld2FyZDogY2MuTGFiZWwsXHJcbiAgICAgICAgLy9idXR0b25MYWI6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVxQ29tcGxhaW50Q29uZmlnKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcUNvbXBsYWludENvbmZpZygpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxQ29tcGxhaW50Q29udGFjdFwiLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICAvLy90aGlzLmJ1dHRvbkxhYi5zdHJpbmcgPSBkYXRhLnR5cGUgPT0gXCJxcVwiID8gXCLlpI3liLblubbmiZPlvIBRUVwiIDogXCLlpI3liLblubbmiZPlvIDlvq7kv6FcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJSZXdhcmQuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChkYXRhLnJld2FyZCkrXCLlhYNcIlxyXG4gICAgICAgICAgICB0aGlzLm9wZW5VcmwgPSBkYXRhLnVybDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLpk77mjqXlnLDlnYBcIiwgdGhpcy5vcGVuVXJsKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlLS0tLS0tLVwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY29weV9vcGVuXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlfb3BlbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjdXRGbG9hdChudW0pIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0RmxvYXQoTnVtYmVyKG51bSkuZGl2KDEwMCkpKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSwgbnVtID0gMikge1xyXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5X29wZW4oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb3B5X29wZW5cIiwgdGhpcy5vcGVuVXJsKVxyXG4gICAgICAgIGlmICh0aGlzLlR5cGUgPT0gXCJxcVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29weV9vcGVuXCIsIHRoaXMub3BlblVybClcclxuICAgICAgICAgICAgLy9jYy5zeXMub3BlblVSTCh0aGlzLm9wZW5VcmwpXHJcbiAgICAgICAgICAgIGdsR2FtZS5wbGF0Zm9ybS5vcGVuVVJMKHRoaXMub3BlblVybClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUucGxhdGZvcm0ub3BlblVSTChcIndlaXhpbjovL1wiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkgeyB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
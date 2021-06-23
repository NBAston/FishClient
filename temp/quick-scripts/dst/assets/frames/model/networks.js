
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/networks.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8964blCSK9NJqZNp15kZPwS', 'networks');
// frames/model/networks.js

"use strict";

//通用消息归类
window.NETWORK = {
  //php 协议包整理
  HTTP: {},
  //pomelo 消息监听
  POMELO: {
    ENTER_PLAT: "connector.entryHandler.enterPlat",
    //平台服务
    NOTICE_ENTER_HANDLER: "plaza.handler.enter",
    NOTICE_EXIT_HANDLER: "plaza.handler.exit",
    NOTICE_MARQUEE: "onMarquee"
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxcbmV0d29ya3MuanMiXSwibmFtZXMiOlsid2luZG93IiwiTkVUV09SSyIsIkhUVFAiLCJQT01FTE8iLCJFTlRFUl9QTEFUIiwiTk9USUNFX0VOVEVSX0hBTkRMRVIiLCJOT1RJQ0VfRVhJVF9IQU5ETEVSIiwiTk9USUNFX01BUlFVRUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLEVBRk87QUFNYjtBQUNBQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsVUFBVSxFQUFFLGtDQURSO0FBQ3VEO0FBQzNEQyxJQUFBQSxvQkFBb0IsRUFBRSxxQkFGbEI7QUFHSkMsSUFBQUEsbUJBQW1CLEVBQUUsb0JBSGpCO0FBSUpDLElBQUFBLGNBQWMsRUFBRTtBQUpaO0FBUEssQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vL+mAmueUqOa2iOaBr+W9kuexu1xyXG53aW5kb3cuTkVUV09SSyA9IHtcclxuICAgIC8vcGhwIOWNj+iuruWMheaVtOeQhlxyXG4gICAgSFRUUDoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9wb21lbG8g5raI5oGv55uR5ZCsXHJcbiAgICBQT01FTE86IHtcclxuICAgICAgICBFTlRFUl9QTEFUOiBcImNvbm5lY3Rvci5lbnRyeUhhbmRsZXIuZW50ZXJQbGF0XCIsICAgICAgICAgICAgLy/lubPlj7DmnI3liqFcclxuICAgICAgICBOT1RJQ0VfRU5URVJfSEFORExFUjogXCJwbGF6YS5oYW5kbGVyLmVudGVyXCIsXHJcbiAgICAgICAgTk9USUNFX0VYSVRfSEFORExFUjogXCJwbGF6YS5oYW5kbGVyLmV4aXRcIixcclxuICAgICAgICBOT1RJQ0VfTUFSUVVFRTogXCJvbk1hcnF1ZWVcIixcclxuICAgIH1cclxufSJdfQ==
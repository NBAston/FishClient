
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/gamecfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2a407uK+vpORItc/OX91+yJ', 'gamecfg');
// frames/base/gamecfg.js

"use strict";

var BANK_MODEL = {
  CLICK_SELECT: 1,
  //点击选择
  INPUT_SELECT: 2 //关键字选择

};
var GAME_NAME = "某某棋牌";
var PROXY_OFF = 0;
var PROXY_ON = 1;
var LOGIN_SWITCH_1 = 0;
exports.paths = {
  bankModel: BANK_MODEL.INPUT_SELECT,
  //银行名字选择模式
  gameProxy: PROXY_OFF,
  //入口是否使用加密方式处理
  loginSwitch: LOGIN_SWITCH_1,
  //login界面分类选取
  serviceUrl: "https://dictum.tucocoon.com/chat/chatClient/chatbox.jsp?companyID=80001056&configID=57",
  //这个参数为默认的客服地址
  TERMSOFSERVICES: "1\u3001\u5728\u6CE8\u518C\u540E\u8FDB\u884C\u4E00\u6B21\u6709\u6548\u5145\u503C\uFF0C\u606D\u559C\u60A8\u6210\u4E3A\u3010".concat(GAME_NAME, "\u3011\u6709\u6548\u4F1A\u5458\uFF01\n\n2\u3001\u3010").concat(GAME_NAME, "\u3011\u4E25\u7981\u4F1A\u5458\u6709\u91CD\u590D\u7533\u8BF7\u8D26\u53F7\u884C\u4E3A\uFF0C\u6BCF\u4F4D\u73A9\u5BB6\u3001\u6BCF\u4E00\u624B\u673A\u53F7\u7801\u3001\u6BCF\u4E00\u5FAE\u4FE1\u53F7\u3001\u6BCF\u4E00QQ\u53F7\u3001\u6BCF\u4E00\u90AE\u7BB1\uFF0C\u53CA\u624B\u673A\u6216\u5176\u4ED6\u767B\u9646\u8BBE\u5907\u53EA\u80FD\u62E5\u6709\u4E00\u4E2A\u5E10\u6237\u6570\u636E\u3002\n\n3\u3001\u3010").concat(GAME_NAME, "\u3011\u662F\u63D0\u4F9B\u4E92\u8054\u7F51\u6295\u6CE8\u670D\u52A1\u7684\u673A\u6784\u3002\u8BF7\u4F1A\u5458\u5728\u6CE8\u518C\u524D\u53C2\u8003\u5F53\u5730\u653F\u5E9C\u7684\u6CD5\u5F8B\uFF0C\u5728\u535A\u5F69\u4E0D\u88AB\u5141\u8BB8\u7684\u5730\u533A\uFF0C\u5982\u6709\u4F1A\u5458\u5728\u3010").concat(GAME_NAME, "\u3011\u6CE8\u518C\u3001\u4E0B\u6CE8\uFF0C\u4E3A\u4F1A\u5458\u4E2A\u4EBA\u884C\u4E3A\uFF0C\u3010").concat(GAME_NAME, "\u3011\u4E0D\u8D1F\u8D23\u3001\u627F\u62C5\u4EFB\u4F55\u76F8\u5173\u8D23\u4EFB\u3002\n\n4\u3001\u65E0\u8BBA\u662F\u4E2A\u4EBA\u6216\u662F\u56E2\u4F53\uFF0C\u5982\u6709\u4EFB\u4F55\u5A01\u80C1\u3001\u6EE5\u7528\u3010").concat(GAME_NAME, "\u3011\u540D\u4E49\u7684\u884C\u4E3A\uFF0C\u3010").concat(GAME_NAME, "\u3011\u4FDD\u7559\u6743\u5229\u53D6\u6D88\u3001\u6536\u56DE\u73A9\u5BB6\u8D26\u53F7\u3002\n\n5\u3001\u73A9\u5BB6\u6CE8\u518C\u4FE1\u606F\u6709\u4E89\u8BAE\u65F6\uFF0C\u4E3A\u786E\u4FDD\u53CC\u65B9\u5229\u76CA\u3001\u675C\u7EDD\u8EAB\u4EFD\u76D7\u7528\u884C\u4E3A\uFF0C\u3010").concat(GAME_NAME, "\u3011\u4FDD\u7559\u6743\u5229\u8981\u6C42\u5BA2\u6237\u5411\u6211\u4EEC\u63D0\u4F9B\u5145\u8DB3\u6709\u6548\u7684\u6863\u6848\uFF0C\u5E76\u4EE5\u5404\u79CD\u65B9\u5F0F\u8FA8\u522B\u5BA2\u6237\u662F\u5426\u7B26\u5408\u8D44\u683C\u4EAB\u6709\u6211\u4EEC\u7684\u4EFB\u4F55\u4F18\u60E0\u3002")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxnYW1lY2ZnLmpzIl0sIm5hbWVzIjpbIkJBTktfTU9ERUwiLCJDTElDS19TRUxFQ1QiLCJJTlBVVF9TRUxFQ1QiLCJHQU1FX05BTUUiLCJQUk9YWV9PRkYiLCJQUk9YWV9PTiIsIkxPR0lOX1NXSVRDSF8xIiwiZXhwb3J0cyIsInBhdGhzIiwiYmFua01vZGVsIiwiZ2FtZVByb3h5IiwibG9naW5Td2l0Y2giLCJzZXJ2aWNlVXJsIiwiVEVSTVNPRlNFUlZJQ0VTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFVBQVUsR0FBRztBQUNmQyxFQUFBQSxZQUFZLEVBQUUsQ0FEQztBQUNDO0FBQ2hCQyxFQUFBQSxZQUFZLEVBQUUsQ0FGQyxDQUVDOztBQUZELENBQW5CO0FBSUEsSUFBTUMsU0FBUyxHQUFHLE1BQWxCO0FBRUEsSUFBTUMsU0FBUyxHQUFHLENBQWxCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLENBQWpCO0FBRUEsSUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBRUFDLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQjtBQUNaQyxFQUFBQSxTQUFTLEVBQUVULFVBQVUsQ0FBQ0UsWUFEVjtBQUM0QjtBQUN4Q1EsRUFBQUEsU0FBUyxFQUFFTixTQUZDO0FBRTRCO0FBQ3hDTyxFQUFBQSxXQUFXLEVBQUVMLGNBSEQ7QUFHNEI7QUFDeENNLEVBQUFBLFVBQVUsRUFBRSx3RkFKQTtBQUkwRjtBQUN0R0MsRUFBQUEsZUFBZSxxSUFBeUJWLFNBQXpCLGtFQUFrREEsU0FBbEQsMFpBQXNJQSxTQUF0SSxtVEFBbU1BLFNBQW5NLDZHQUErTkEsU0FBL04sb09BQW1SQSxTQUFuUiw2REFBdVNBLFNBQXZTLGdTQUFxV0EsU0FBclc7QUFMSCxDQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IEJBTktfTU9ERUwgPSB7XHJcbiAgICBDTElDS19TRUxFQ1Q6IDEsLy/ngrnlh7vpgInmi6lcclxuICAgIElOUFVUX1NFTEVDVDogMiAvL+WFs+mUruWtl+mAieaLqVxyXG59XHJcbmNvbnN0IEdBTUVfTkFNRSA9IFwi5p+Q5p+Q5qOL54mMXCJcclxuXHJcbmNvbnN0IFBST1hZX09GRiA9IDA7XHJcbmNvbnN0IFBST1hZX09OID0gMTtcclxuXHJcbmNvbnN0IExPR0lOX1NXSVRDSF8xID0gMDtcclxuXHJcbmV4cG9ydHMucGF0aHMgPSB7XHJcbiAgICBiYW5rTW9kZWw6IEJBTktfTU9ERUwuSU5QVVRfU0VMRUNULCAgICAgLy/pk7booYzlkI3lrZfpgInmi6nmqKHlvI9cclxuICAgIGdhbWVQcm94eTogUFJPWFlfT0ZGLCAgICAgICAgICAgICAgICAgICAvL+WFpeWPo+aYr+WQpuS9v+eUqOWKoOWvhuaWueW8j+WkhOeQhlxyXG4gICAgbG9naW5Td2l0Y2g6IExPR0lOX1NXSVRDSF8xLCAgICAgICAgICAgIC8vbG9naW7nlYzpnaLliIbnsbvpgInlj5ZcclxuICAgIHNlcnZpY2VVcmw6IFwiaHR0cHM6Ly9kaWN0dW0udHVjb2Nvb24uY29tL2NoYXQvY2hhdENsaWVudC9jaGF0Ym94LmpzcD9jb21wYW55SUQ9ODAwMDEwNTYmY29uZmlnSUQ9NTdcIiwgLy/ov5nkuKrlj4LmlbDkuLrpu5jorqTnmoTlrqLmnI3lnLDlnYBcclxuICAgIFRFUk1TT0ZTRVJWSUNFUzpgMeOAgeWcqOazqOWGjOWQjui/m+ihjOS4gOasoeacieaViOWFheWAvO+8jOaBreWWnOaCqOaIkOS4uuOAkCR7R0FNRV9OQU1FfeOAkeacieaViOS8muWRmO+8gVxcblxcbjLjgIHjgJAke0dBTUVfTkFNRX3jgJHkuKXnpoHkvJrlkZjmnInph43lpI3nlLPor7fotKblj7fooYzkuLrvvIzmr4/kvY3njqnlrrbjgIHmr4/kuIDmiYvmnLrlj7fnoIHjgIHmr4/kuIDlvq7kv6Hlj7fjgIHmr4/kuIBRUeWPt+OAgeavj+S4gOmCrueuse+8jOWPiuaJi+acuuaIluWFtuS7lueZu+mZhuiuvuWkh+WPquiDveaLpeacieS4gOS4quW4kOaIt+aVsOaNruOAglxcblxcbjPjgIHjgJAke0dBTUVfTkFNRX3jgJHmmK/mj5DkvpvkupLogZTnvZHmipXms6jmnI3liqHnmoTmnLrmnoTjgILor7fkvJrlkZjlnKjms6jlhozliY3lj4LogIPlvZPlnLDmlL/lupznmoTms5XlvovvvIzlnKjljZrlvankuI3ooqvlhYHorrjnmoTlnLDljLrvvIzlpoLmnInkvJrlkZjlnKjjgJAke0dBTUVfTkFNRX3jgJHms6jlhozjgIHkuIvms6jvvIzkuLrkvJrlkZjkuKrkurrooYzkuLrvvIzjgJAke0dBTUVfTkFNRX3jgJHkuI3otJ/otKPjgIHmib/mi4Xku7vkvZXnm7jlhbPotKPku7vjgIJcXG5cXG4044CB5peg6K665piv5Liq5Lq65oiW5piv5Zui5L2T77yM5aaC5pyJ5Lu75L2V5aiB6IOB44CB5rul55So44CQJHtHQU1FX05BTUV944CR5ZCN5LmJ55qE6KGM5Li677yM44CQJHtHQU1FX05BTUV944CR5L+d55WZ5p2D5Yip5Y+W5raI44CB5pS25Zue546p5a626LSm5Y+344CCXFxuXFxuNeOAgeeOqeWutuazqOWGjOS/oeaBr+acieS6ieiuruaXtu+8jOS4uuehruS/neWPjOaWueWIqeebiuOAgeadnOe7nei6q+S7veebl+eUqOihjOS4uu+8jOOAkCR7R0FNRV9OQU1FfeOAkeS/neeVmeadg+WIqeimgeaxguWuouaIt+WQkeaIkeS7rOaPkOS+m+WFhei2s+acieaViOeahOaho+ahiO+8jOW5tuS7peWQhOenjeaWueW8j+i+qOWIq+WuouaIt+aYr+WQpuespuWQiOi1hOagvOS6q+acieaIkeS7rOeahOS7u+S9leS8mOaDoOOAgmBcclxufTsiXX0=
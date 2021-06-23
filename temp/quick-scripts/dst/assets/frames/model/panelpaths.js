
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/panelpaths.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99986D5tb1DfYPXw77mT5u+', 'panelpaths');
// frames/model/panelpaths.js

"use strict";

var _plazaprefab;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//预加载目录
exports.paths = {
  //通用登入后的预加载目录
  prefab: {
    debug: "prefab/public/debug/debug",
    debugpanel: "prefab/public/debug/debugpanel",
    labeltip: "prefab/public/msgbox/labeltip",
    maintainnotice: "prefab/public/msgbox/maintainnotice",
    awardBox: "prefab/public/msgbox/awardBox",
    setting: "prefab/public/setting/setting",
    exitRoom: "prefab/public/exitRoom/exitRoom",
    rollnotice: "prefab/public/notice/rollnotice",
    shop: "prefab/public/shop/shop",
    registration: "prefab/public/account/registration",
    register: "prefab/public/account/register",
    service: "prefab/public/service/service",
    firstRecharge: "prefab/public/other/firstRecharge",
    editBirthday: "prefab/public/birthday/editBirthday",
    coinArrvalTip: "prefab/public/coinArrvalTip/coinArrvalTip",
    servicebox: "prefab/public/msgbox/servicebox"
  },
  //登入前预加载目录
  loinprefab: {
    confirmbox: "prefab/public/msgbox/confirmbox",
    installTipBox: "prefab/public/msgbox/installTipBox",
    juhua: "prefab/public/msgbox/juhua",
    loading: "prefab/public/loading/loading",
    gameMask: "prefab/public/msgbox/gameMask",
    changetable: "prefab/public/changetable/changetable"
  },
  //进入大厅的预加载目录
  plazaprefab: (_plazaprefab = {
    base: "prefab/plaza/",
    //根目录索引，禁止随意修改以及变换顺序
    // 大厅
    // center: "hall/center",
    // comprehensive: "hall/comprehensive",
    //userInfo
    bindpay: "exchange/bindpay",
    backWaterRule: "exchange/backWaterRule",
    userinfo: "userInfo/userinfo",
    userinfoVip: "userInfo/userinfoVip",
    userinfoVipGet: "userInfo/userinfoVipGet",
    userinfoVipRight: "userInfo/userinfoVipRight",
    userinfostatement: "userInfo/userinfostatement",
    userinfostatement_complex: "userInfo/userinfostatement_complex",
    userinfoaccount: "userInfo/userinfoaccount",
    userinforecord: "userInfo/userinforecord",
    userinforecord_complex: "userInfo/userinforecord_complex",
    userinfoBank: "userInfo/userinfoBank",
    userinfoSeting: "userInfo/userinfoSeting",
    changehead: "userInfo/popups/changehead",
    modifypsw: "userInfo/popups/modifypsw",
    changeInfo: "userInfo/popups/changeInfo",
    bankpassword: "userInfo/popups/bankpassword",
    bankmodifypsw: "userInfo/popups/bankmodifypsw",
    editNickName: "userInfo/popups/editNickName",
    exitAcc: "userInfo/popups/exitAcc",
    settings: "setting/settings",
    settingVolume: "setting/settingVolume",
    settingSelectMusic: "setting/settingSelectMusic",
    settingRepair: "setting/settingRepair",
    settingAbout: "setting/settingAbout",
    settingModifypsd: "setting/settingModifypsd",
    //幸运夺宝
    luckDraw: "luckDraw/luckDraw",
    //返水
    backWater: "backWater/backWater",
    mybackWater: "backWater/mybackWater",
    mybackWater_complex: "backWater/mybackWater_complex",
    porpor: "backWater/porpor",
    porpor_complex: "backWater/porpor_complex",
    waterrecord: "backWater/waterrecord",
    //绑定手机号
    bindPhone: "bindPhone/bindPhone",
    untiedPhone: "bindPhone/untiedPhone",
    unbind: "bindPhone/unbind",
    //签到
    signin: "signin/signin",
    //排行榜
    rank: "rank/rank",
    //余额宝
    yubao: "yubao/yubao",
    //center
    gameitem: "center/gameitem",
    baijialeentry: "center/baijialeentry",
    brnnentry: "center/brnnentry",
    luckturntableentry: "center/luckturntableentry",
    hongheientry: "center/hongheientry",
    qhbjlentry: "center/qhbjlentry",
    slwhentry: "center/slwhentry",
    hcpyentry: "center/hcpyentry",
    sssentry: "center/sssentry",
    ddzentry: "center/ddzentry",
    fishentry: "center/fishentry",
    nfishentry: "center/nfishentry",
    nfish2entry: "center/nfish2entry",
    lfishentry: "center/lfishentry",
    zhajinhuaentry: "center/zhajinhuaentry",
    dzpkentry: "center/dzpkentry",
    esydentry: "center/esydentry",
    ebgentry: "center/ebgentry",
    shuiguojientry: "center/shuiguojientry",
    qznnentry: "center/qznnentry",
    sangongentry: "center/sangongentry",
    paijiuentry: "center/paijiuentry",
    jszjhentry: "center/jszjhentry",
    longhudouentry: "center/longhudouentry",
    wqznnentry: "center/wqznnentry",
    hbslentry: "center/hbslentry",
    //邮件
    email: "email/email",
    //任务
    Task: "Task/Task",
    //兑换
    exchangeWin: "exchange/exchangeWin"
  }, _defineProperty(_plazaprefab, "backWaterRule", "exchange/backWaterRule"), _defineProperty(_plazaprefab, "exchangerecord", "exchange/exchangerecord"), _defineProperty(_plazaprefab, "setExtractpass", "exchange/popup/setExtractpass"), _defineProperty(_plazaprefab, "modifyPass", "exchange/popup/modifyPass"), _defineProperty(_plazaprefab, "extractVerifica", "exchange/popup/extractVerifica"), _defineProperty(_plazaprefab, "extractpass", "exchange/popup/extractpass"), _defineProperty(_plazaprefab, "extractMgr", "exchange/popup/extractMgr"), _defineProperty(_plazaprefab, "withdrawal", "exchange/withdrawal"), _defineProperty(_plazaprefab, "popularize", "popularize/popularize"), _defineProperty(_plazaprefab, "getrecord", "popularize/getrecord"), _defineProperty(_plazaprefab, "historybrokerage", "popularize/historybrokerage"), _defineProperty(_plazaprefab, "pandect", "popularize/pandect"), _defineProperty(_plazaprefab, "ruleDetail", "popularize/ruleDetail"), _defineProperty(_plazaprefab, "subordinate", "popularize/subordinate"), _defineProperty(_plazaprefab, "todaybrokerage", "popularize/todaybrokerage"), _defineProperty(_plazaprefab, "announcement", "other/announce"), _defineProperty(_plazaprefab, "urgentnotice", "other/urgentnotice"), _defineProperty(_plazaprefab, "touristtip", "touristtip"), _defineProperty(_plazaprefab, "createRoom", "room/createRoom"), _defineProperty(_plazaprefab, "joinRoom", "room/joinRoom"), _defineProperty(_plazaprefab, "rqznnCreate", "room/sonGame/rqznnCreate"), _defineProperty(_plazaprefab, "exchangeDiamond", "room/exchangeDiamond"), _defineProperty(_plazaprefab, "diamondRecord", "room/diamondRecord"), _defineProperty(_plazaprefab, "roomRecord", "room/record/roomRecord"), _defineProperty(_plazaprefab, "rqznnGameRecord", "room/record/rqznn/rqznnGameRecord"), _defineProperty(_plazaprefab, "rqznnRoomRound", "room/record/rqznn/rqznnRoomRound"), _plazaprefab),
  recordprefab: {
    baijiale_recordDetails: "prefab/public/record/baijiale_recordDetails",
    brnn_recordDetails: "prefab/public/record/brnn_recordDetails",
    dzpk_recordDetails: "prefab/public/record/dzpk_recordDetails",
    honghei_recordDetails: "prefab/public/record/honghei_recordDetails",
    longhudou_recordDetails: "prefab/public/record/longhudou_recordDetails",
    luckturntable_recordDetails: "prefab/public/record/luckturntable_recordDetails",
    paijiu_recordDetails: "prefab/public/record/paijiu_recordDetails",
    qznn_recordDetails: "prefab/public/record/qznn_recordDetails",
    sangong_recordDetails: "prefab/public/record/sangong_recordDetails",
    shuiguoji_recordDetails: "prefab/public/record/shuiguoji_recordDetails",
    zhajinhua_recordDetails: "prefab/public/record/zhajinhua_recordDetails",
    jszjh_recordDetails: "prefab/public/record/jszjh_recordDetails",
    esyd_recordDetails: "prefab/public/record/esyd_recordDetails",
    ebg_recordDetails: "prefab/public/record/ebg_recordDetails",
    ddz_recordDetails: "prefab/public/record/ddz_recordDetails",
    qhbjl_recordDetails: "prefab/public/record/qhbjl_recordDetails",
    sss_recordDetails: "prefab/public/record/sss_recordDetails",
    hcpy_recordDetails: "prefab/public/record/hcpy_recordDetails",
    slwh_recordDetails: "prefab/public/record/slwh_recordDetails",
    wqznn_recordDetails: "prefab/public/record/wqznn_recordDetails"
  },
  //强制预加载的模块
  compelprefab: [//"userinfo", "popularize", "luckDraw", "shop", "changetable"
  ]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxccGFuZWxwYXRocy5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwicGF0aHMiLCJwcmVmYWIiLCJkZWJ1ZyIsImRlYnVncGFuZWwiLCJsYWJlbHRpcCIsIm1haW50YWlubm90aWNlIiwiYXdhcmRCb3giLCJzZXR0aW5nIiwiZXhpdFJvb20iLCJyb2xsbm90aWNlIiwic2hvcCIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdGVyIiwic2VydmljZSIsImZpcnN0UmVjaGFyZ2UiLCJlZGl0QmlydGhkYXkiLCJjb2luQXJydmFsVGlwIiwic2VydmljZWJveCIsImxvaW5wcmVmYWIiLCJjb25maXJtYm94IiwiaW5zdGFsbFRpcEJveCIsImp1aHVhIiwibG9hZGluZyIsImdhbWVNYXNrIiwiY2hhbmdldGFibGUiLCJwbGF6YXByZWZhYiIsImJhc2UiLCJiaW5kcGF5IiwiYmFja1dhdGVyUnVsZSIsInVzZXJpbmZvIiwidXNlcmluZm9WaXAiLCJ1c2VyaW5mb1ZpcEdldCIsInVzZXJpbmZvVmlwUmlnaHQiLCJ1c2VyaW5mb3N0YXRlbWVudCIsInVzZXJpbmZvc3RhdGVtZW50X2NvbXBsZXgiLCJ1c2VyaW5mb2FjY291bnQiLCJ1c2VyaW5mb3JlY29yZCIsInVzZXJpbmZvcmVjb3JkX2NvbXBsZXgiLCJ1c2VyaW5mb0JhbmsiLCJ1c2VyaW5mb1NldGluZyIsImNoYW5nZWhlYWQiLCJtb2RpZnlwc3ciLCJjaGFuZ2VJbmZvIiwiYmFua3Bhc3N3b3JkIiwiYmFua21vZGlmeXBzdyIsImVkaXROaWNrTmFtZSIsImV4aXRBY2MiLCJzZXR0aW5ncyIsInNldHRpbmdWb2x1bWUiLCJzZXR0aW5nU2VsZWN0TXVzaWMiLCJzZXR0aW5nUmVwYWlyIiwic2V0dGluZ0Fib3V0Iiwic2V0dGluZ01vZGlmeXBzZCIsImx1Y2tEcmF3IiwiYmFja1dhdGVyIiwibXliYWNrV2F0ZXIiLCJteWJhY2tXYXRlcl9jb21wbGV4IiwicG9ycG9yIiwicG9ycG9yX2NvbXBsZXgiLCJ3YXRlcnJlY29yZCIsImJpbmRQaG9uZSIsInVudGllZFBob25lIiwidW5iaW5kIiwic2lnbmluIiwicmFuayIsInl1YmFvIiwiZ2FtZWl0ZW0iLCJiYWlqaWFsZWVudHJ5IiwiYnJubmVudHJ5IiwibHVja3R1cm50YWJsZWVudHJ5IiwiaG9uZ2hlaWVudHJ5IiwicWhiamxlbnRyeSIsInNsd2hlbnRyeSIsImhjcHllbnRyeSIsInNzc2VudHJ5IiwiZGR6ZW50cnkiLCJmaXNoZW50cnkiLCJuZmlzaGVudHJ5IiwibmZpc2gyZW50cnkiLCJsZmlzaGVudHJ5IiwiemhhamluaHVhZW50cnkiLCJkenBrZW50cnkiLCJlc3lkZW50cnkiLCJlYmdlbnRyeSIsInNodWlndW9qaWVudHJ5IiwicXpubmVudHJ5Iiwic2FuZ29uZ2VudHJ5IiwicGFpaml1ZW50cnkiLCJqc3pqaGVudHJ5IiwibG9uZ2h1ZG91ZW50cnkiLCJ3cXpubmVudHJ5IiwiaGJzbGVudHJ5IiwiZW1haWwiLCJUYXNrIiwiZXhjaGFuZ2VXaW4iLCJyZWNvcmRwcmVmYWIiLCJiYWlqaWFsZV9yZWNvcmREZXRhaWxzIiwiYnJubl9yZWNvcmREZXRhaWxzIiwiZHpwa19yZWNvcmREZXRhaWxzIiwiaG9uZ2hlaV9yZWNvcmREZXRhaWxzIiwibG9uZ2h1ZG91X3JlY29yZERldGFpbHMiLCJsdWNrdHVybnRhYmxlX3JlY29yZERldGFpbHMiLCJwYWlqaXVfcmVjb3JkRGV0YWlscyIsInF6bm5fcmVjb3JkRGV0YWlscyIsInNhbmdvbmdfcmVjb3JkRGV0YWlscyIsInNodWlndW9qaV9yZWNvcmREZXRhaWxzIiwiemhhamluaHVhX3JlY29yZERldGFpbHMiLCJqc3pqaF9yZWNvcmREZXRhaWxzIiwiZXN5ZF9yZWNvcmREZXRhaWxzIiwiZWJnX3JlY29yZERldGFpbHMiLCJkZHpfcmVjb3JkRGV0YWlscyIsInFoYmpsX3JlY29yZERldGFpbHMiLCJzc3NfcmVjb3JkRGV0YWlscyIsImhjcHlfcmVjb3JkRGV0YWlscyIsInNsd2hfcmVjb3Jk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VkMsSUFBQUEscUJBQXFCLEVBQUUsNENBVGI7QUFVVkMsSUFBQUEsdUJBQXVCLEVBQUUsOENBVmY7QUFXVkMsSUFBQUEsdUJBQXVCLEVBQUUsOENBWGY7QUFZVkMsSUFBQUEsbUJBQW1CLEVBQUUsMENBWlg7QUFhVkMsSUFBQUEsa0JBQWtCLEVBQUUseUNBYlY7QUFjVkMsSUFBQUEsaUJBQWlCLEVBQUUsd0NBZFQ7QUFlVkMsSUFBQUEsaUJBQWlCLEVBQUUsd0NBZlQ7QUFnQlZDLElBQUFBLG1CQUFtQixFQUFFLDBDQWhCWDtBQWlCVkMsSUFBQUEsaUJBQWlCLEVBQUUsd0NBakJUO0FBa0JWQyxJQUFBQSxrQkFBa0IsRUFBRSx5Q0FsQlY7QUFtQlZDLElBQUFBLGtCQUFrQixFQUFFLHlDQW5CVjtBQW9CVkMsSUFBQUEsbUJBQW1CLEVBQUU7QUFwQlgsR0EzS0Y7QUFrTVo7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLENBQ1Y7QUFEVTtBQW5NRixDQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/pooTliqDovb3nm67lvZVcclxuZXhwb3J0cy5wYXRocyA9IHtcclxuICAgIC8v6YCa55So55m75YWl5ZCO55qE6aKE5Yqg6L2955uu5b2VXHJcbiAgICBwcmVmYWI6IHtcclxuICAgICAgICBkZWJ1ZzogXCJwcmVmYWIvcHVibGljL2RlYnVnL2RlYnVnXCIsXHJcbiAgICAgICAgZGVidWdwYW5lbDogXCJwcmVmYWIvcHVibGljL2RlYnVnL2RlYnVncGFuZWxcIixcclxuICAgICAgICBsYWJlbHRpcDogXCJwcmVmYWIvcHVibGljL21zZ2JveC9sYWJlbHRpcFwiLFxyXG4gICAgICAgIG1haW50YWlubm90aWNlOiBcInByZWZhYi9wdWJsaWMvbXNnYm94L21haW50YWlubm90aWNlXCIsXHJcbiAgICAgICAgYXdhcmRCb3g6IFwicHJlZmFiL3B1YmxpYy9tc2dib3gvYXdhcmRCb3hcIixcclxuICAgICAgICBzZXR0aW5nOiBcInByZWZhYi9wdWJsaWMvc2V0dGluZy9zZXR0aW5nXCIsXHJcbiAgICAgICAgZXhpdFJvb206IFwicHJlZmFiL3B1YmxpYy9leGl0Um9vbS9leGl0Um9vbVwiLFxyXG4gICAgICAgIHJvbGxub3RpY2U6IFwicHJlZmFiL3B1YmxpYy9ub3RpY2Uvcm9sbG5vdGljZVwiLFxyXG4gICAgICAgIHNob3A6IFwicHJlZmFiL3B1YmxpYy9zaG9wL3Nob3BcIixcclxuXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uOiBcInByZWZhYi9wdWJsaWMvYWNjb3VudC9yZWdpc3RyYXRpb25cIixcclxuICAgICAgICByZWdpc3RlcjogXCJwcmVmYWIvcHVibGljL2FjY291bnQvcmVnaXN0ZXJcIixcclxuXHJcbiAgICAgICAgc2VydmljZTogXCJwcmVmYWIvcHVibGljL3NlcnZpY2Uvc2VydmljZVwiLFxyXG4gICAgICAgIGZpcnN0UmVjaGFyZ2U6IFwicHJlZmFiL3B1YmxpYy9vdGhlci9maXJzdFJlY2hhcmdlXCIsXHJcbiAgICAgICAgZWRpdEJpcnRoZGF5OiBcInByZWZhYi9wdWJsaWMvYmlydGhkYXkvZWRpdEJpcnRoZGF5XCIsXHJcbiAgICAgICAgY29pbkFycnZhbFRpcDogXCJwcmVmYWIvcHVibGljL2NvaW5BcnJ2YWxUaXAvY29pbkFycnZhbFRpcFwiLFxyXG4gICAgICAgIHNlcnZpY2Vib3g6IFwicHJlZmFiL3B1YmxpYy9tc2dib3gvc2VydmljZWJveFwiLFxyXG4gICAgfSxcclxuICAgIC8v55m75YWl5YmN6aKE5Yqg6L2955uu5b2VXHJcbiAgICBsb2lucHJlZmFiOiB7XHJcbiAgICAgICAgY29uZmlybWJveDogXCJwcmVmYWIvcHVibGljL21zZ2JveC9jb25maXJtYm94XCIsXHJcbiAgICAgICAgaW5zdGFsbFRpcEJveDogXCJwcmVmYWIvcHVibGljL21zZ2JveC9pbnN0YWxsVGlwQm94XCIsXHJcbiAgICAgICAganVodWE6IFwicHJlZmFiL3B1YmxpYy9tc2dib3gvanVodWFcIixcclxuICAgICAgICBsb2FkaW5nOiBcInByZWZhYi9wdWJsaWMvbG9hZGluZy9sb2FkaW5nXCIsXHJcbiAgICAgICAgZ2FtZU1hc2s6IFwicHJlZmFiL3B1YmxpYy9tc2dib3gvZ2FtZU1hc2tcIixcclxuICAgICAgICBjaGFuZ2V0YWJsZTogXCJwcmVmYWIvcHVibGljL2NoYW5nZXRhYmxlL2NoYW5nZXRhYmxlXCIsXHJcbiAgICB9LFxyXG4gICAgLy/ov5vlhaXlpKfljoXnmoTpooTliqDovb3nm67lvZVcclxuICAgIHBsYXphcHJlZmFiOiB7XHJcbiAgICAgICAgYmFzZTogXCJwcmVmYWIvcGxhemEvXCIsICAgICAgLy/moLnnm67lvZXntKLlvJXvvIznpoHmraLpmo/mhI/kv67mlLnku6Xlj4rlj5jmjaLpobrluo9cclxuXHJcbiAgICAgICAgLy8g5aSn5Y6FXHJcbiAgICAgICAgLy8gY2VudGVyOiBcImhhbGwvY2VudGVyXCIsXHJcbiAgICAgICAgLy8gY29tcHJlaGVuc2l2ZTogXCJoYWxsL2NvbXByZWhlbnNpdmVcIixcclxuXHJcbiAgICAgICAgLy91c2VySW5mb1xyXG4gICAgICAgIGJpbmRwYXk6IFwiZXhjaGFuZ2UvYmluZHBheVwiLFxyXG4gICAgICAgIGJhY2tXYXRlclJ1bGU6IFwiZXhjaGFuZ2UvYmFja1dhdGVyUnVsZVwiLFxyXG5cclxuICAgICAgICB1c2VyaW5mbzogXCJ1c2VySW5mby91c2VyaW5mb1wiLFxyXG4gICAgICAgIHVzZXJpbmZvVmlwOiBcInVzZXJJbmZvL3VzZXJpbmZvVmlwXCIsXHJcbiAgICAgICAgdXNlcmluZm9WaXBHZXQ6IFwidXNlckluZm8vdXNlcmluZm9WaXBHZXRcIixcclxuICAgICAgICB1c2VyaW5mb1ZpcFJpZ2h0OiBcInVzZXJJbmZvL3VzZXJpbmZvVmlwUmlnaHRcIixcclxuICAgICAgICB1c2VyaW5mb3N0YXRlbWVudDogXCJ1c2VySW5mby91c2VyaW5mb3N0YXRlbWVudFwiLFxyXG4gICAgICAgIHVzZXJpbmZvc3RhdGVtZW50X2NvbXBsZXg6IFwidXNlckluZm8vdXNlcmluZm9zdGF0ZW1lbnRfY29tcGxleFwiLFxyXG4gICAgICAgIHVzZXJpbmZvYWNjb3VudDogXCJ1c2VySW5mby91c2VyaW5mb2FjY291bnRcIixcclxuICAgICAgICB1c2VyaW5mb3JlY29yZDogXCJ1c2VySW5mby91c2VyaW5mb3JlY29yZFwiLFxyXG4gICAgICAgIHVzZXJpbmZvcmVjb3JkX2NvbXBsZXg6XCJ1c2VySW5mby91c2VyaW5mb3JlY29yZF9jb21wbGV4XCIsXHJcbiAgICAgICAgdXNlcmluZm9CYW5rOiBcInVzZXJJbmZvL3VzZXJpbmZvQmFua1wiLFxyXG4gICAgICAgIHVzZXJpbmZvU2V0aW5nOiBcInVzZXJJbmZvL3VzZXJpbmZvU2V0aW5nXCIsXHJcblxyXG4gICAgICAgIGNoYW5nZWhlYWQ6IFwidXNlckluZm8vcG9wdXBzL2NoYW5nZWhlYWRcIixcclxuICAgICAgICBtb2RpZnlwc3c6IFwidXNlckluZm8vcG9wdXBzL21vZGlmeXBzd1wiLFxyXG4gICAgICAgIGNoYW5nZUluZm86IFwidXNlckluZm8vcG9wdXBzL2NoYW5nZUluZm9cIixcclxuICAgICAgICBiYW5rcGFzc3dvcmQ6IFwidXNlckluZm8vcG9wdXBzL2JhbmtwYXNzd29yZFwiLFxyXG4gICAgICAgIGJhbmttb2RpZnlwc3c6IFwidXNlckluZm8vcG9wdXBzL2Jhbmttb2RpZnlwc3dcIixcclxuICAgICAgICBlZGl0Tmlja05hbWU6IFwidXNlckluZm8vcG9wdXBzL2VkaXROaWNrTmFtZVwiLFxyXG4gICAgICAgIGV4aXRBY2M6IFwidXNlckluZm8vcG9wdXBzL2V4aXRBY2NcIixcclxuXHJcbiAgICAgICAgc2V0dGluZ3M6IFwic2V0dGluZy9zZXR0aW5nc1wiLFxyXG4gICAgICAgIHNldHRpbmdWb2x1bWU6IFwic2V0dGluZy9zZXR0aW5nVm9sdW1lXCIsXHJcbiAgICAgICAgc2V0dGluZ1NlbGVjdE11c2ljOiBcInNldHRpbmcvc2V0dGluZ1NlbGVjdE11c2ljXCIsXHJcbiAgICAgICAgc2V0dGluZ1JlcGFpcjogXCJzZXR0aW5nL3NldHRpbmdSZXBhaXJcIixcclxuICAgICAgICBzZXR0aW5nQWJvdXQ6IFwic2V0dGluZy9zZXR0aW5nQWJvdXRcIixcclxuICAgICAgICBzZXR0aW5nTW9kaWZ5cHNkOiBcInNldHRpbmcvc2V0dGluZ01vZGlmeXBzZFwiLFxyXG5cclxuICAgICAgICAvL+W5uOi/kOWkuuWunVxyXG4gICAgICAgIGx1Y2tEcmF3OiBcImx1Y2tEcmF3L2x1Y2tEcmF3XCIsXHJcblxyXG4gICAgICAgIC8v6L+U5rC0XHJcbiAgICAgICAgYmFja1dhdGVyOiBcImJhY2tXYXRlci9iYWNrV2F0ZXJcIixcclxuICAgICAgICBteWJhY2tXYXRlcjogXCJiYWNrV2F0ZXIvbXliYWNrV2F0ZXJcIixcclxuICAgICAgICBteWJhY2tXYXRlcl9jb21wbGV4OiBcImJhY2tXYXRlci9teWJhY2tXYXRlcl9jb21wbGV4XCIsXHJcbiAgICAgICAgcG9ycG9yOiBcImJhY2tXYXRlci9wb3Jwb3JcIixcclxuICAgICAgICBwb3Jwb3JfY29tcGxleDogXCJiYWNrV2F0ZXIvcG9ycG9yX2NvbXBsZXhcIixcclxuICAgICAgICB3YXRlcnJlY29yZDogXCJiYWNrV2F0ZXIvd2F0ZXJyZWNvcmRcIixcclxuXHJcbiAgICAgICAgLy/nu5HlrprmiYvmnLrlj7dcclxuICAgICAgICBiaW5kUGhvbmU6IFwiYmluZFBob25lL2JpbmRQaG9uZVwiLFxyXG4gICAgICAgIHVudGllZFBob25lOiBcImJpbmRQaG9uZS91bnRpZWRQaG9uZVwiLFxyXG4gICAgICAgIHVuYmluZDogXCJiaW5kUGhvbmUvdW5iaW5kXCIsXHJcblxyXG4gICAgICAgIC8v562+5YiwXHJcbiAgICAgICAgc2lnbmluOiBcInNpZ25pbi9zaWduaW5cIixcclxuXHJcbiAgICAgICAgLy/mjpLooYzmppxcclxuICAgICAgICByYW5rOiBcInJhbmsvcmFua1wiLFxyXG5cclxuICAgICAgICAvL+S9memineWunVxyXG4gICAgICAgIHl1YmFvOiBcInl1YmFvL3l1YmFvXCIsXHJcbiAgICAgICAgLy9jZW50ZXJcclxuICAgICAgICBnYW1laXRlbTogXCJjZW50ZXIvZ2FtZWl0ZW1cIixcclxuICAgICAgICBiYWlqaWFsZWVudHJ5OiBcImNlbnRlci9iYWlqaWFsZWVudHJ5XCIsXHJcbiAgICAgICAgYnJubmVudHJ5OiBcImNlbnRlci9icm5uZW50cnlcIixcclxuICAgICAgICBsdWNrdHVybnRhYmxlZW50cnk6IFwiY2VudGVyL2x1Y2t0dXJudGFibGVlbnRyeVwiLFxyXG4gICAgICAgIGhvbmdoZWllbnRyeTogXCJjZW50ZXIvaG9uZ2hlaWVudHJ5XCIsXHJcbiAgICAgICAgcWhiamxlbnRyeTogXCJjZW50ZXIvcWhiamxlbnRyeVwiLFxyXG4gICAgICAgIHNsd2hlbnRyeTogXCJjZW50ZXIvc2x3aGVudHJ5XCIsXHJcbiAgICAgICAgaGNweWVudHJ5OiBcImNlbnRlci9oY3B5ZW50cnlcIixcclxuICAgICAgICBzc3NlbnRyeTogXCJjZW50ZXIvc3NzZW50cnlcIixcclxuICAgICAgICBkZHplbnRyeTogXCJjZW50ZXIvZGR6ZW50cnlcIixcclxuICAgICAgICBmaXNoZW50cnk6IFwiY2VudGVyL2Zpc2hlbnRyeVwiLFxyXG4gICAgICAgIG5maXNoZW50cnk6IFwiY2VudGVyL25maXNoZW50cnlcIixcclxuICAgICAgICBuZmlzaDJlbnRyeTogXCJjZW50ZXIvbmZpc2gyZW50cnlcIixcclxuICAgICAgICBsZmlzaGVudHJ5OiBcImNlbnRlci9sZmlzaGVudHJ5XCIsXHJcbiAgICAgICAgemhhamluaHVhZW50cnk6IFwiY2VudGVyL3poYWppbmh1YWVudHJ5XCIsXHJcbiAgICAgICAgZHpwa2VudHJ5OiBcImNlbnRlci9kenBrZW50cnlcIixcclxuICAgICAgICBlc3lkZW50cnk6IFwiY2VudGVyL2VzeWRlbnRyeVwiLFxyXG4gICAgICAgIGViZ2VudHJ5OiBcImNlbnRlci9lYmdlbnRyeVwiLFxyXG4gICAgICAgIHNodWlndW9qaWVudHJ5OiBcImNlbnRlci9zaHVpZ3VvamllbnRyeVwiLFxyXG4gICAgICAgIHF6bm5lbnRyeTogXCJjZW50ZXIvcXpubmVudHJ5XCIsXHJcbiAgICAgICAgc2FuZ29uZ2VudHJ5OiBcImNlbnRlci9zYW5nb25nZW50cnlcIixcclxuICAgICAgICBwYWlqaXVlbnRyeTogXCJjZW50ZXIvcGFpaml1ZW50cnlcIixcclxuICAgICAgICBqc3pqaGVudHJ5OiBcImNlbnRlci9qc3pqaGVudHJ5XCIsXHJcbiAgICAgICAgbG9uZ2h1ZG91ZW50cnk6IFwiY2VudGVyL2xvbmdodWRvdWVudHJ5XCIsXHJcbiAgICAgICAgd3F6bm5lbnRyeTpcImNlbnRlci93cXpubmVudHJ5XCIsXHJcbiAgICAgICAgaGJzbGVudHJ5OlwiY2VudGVyL2hic2xlbnRyeVwiLFxyXG4gICAgICAgIC8v6YKu5Lu2XHJcbiAgICAgICAgZW1haWw6IFwiZW1haWwvZW1haWxcIixcclxuXHJcbiAgICAgICAgLy/ku7vliqFcclxuICAgICAgICBUYXNrOiBcIlRhc2svVGFza1wiLFxyXG5cclxuICAgICAgICAvL+WFkeaNolxyXG4gICAgICAgIGV4Y2hhbmdlV2luOiBcImV4Y2hhbmdlL2V4Y2hhbmdlV2luXCIsXHJcbiAgICAgICAgYmFja1dhdGVyUnVsZTogXCJleGNoYW5nZS9iYWNrV2F0ZXJSdWxlXCIsXHJcbiAgICAgICAgZXhjaGFuZ2VyZWNvcmQ6IFwiZXhjaGFuZ2UvZXhjaGFuZ2VyZWNvcmRcIixcclxuICAgICAgICBzZXRFeHRyYWN0cGFzczpcImV4Y2hhbmdlL3BvcHVwL3NldEV4dHJhY3RwYXNzXCIsXHJcbiAgICAgICAgbW9kaWZ5UGFzczpcImV4Y2hhbmdlL3BvcHVwL21vZGlmeVBhc3NcIixcclxuICAgICAgICBleHRyYWN0VmVyaWZpY2E6XCJleGNoYW5nZS9wb3B1cC9leHRyYWN0VmVyaWZpY2FcIixcclxuICAgICAgICBleHRyYWN0cGFzczpcImV4Y2hhbmdlL3BvcHVwL2V4dHJhY3RwYXNzXCIsXHJcbiAgICAgICAgZXh0cmFjdE1ncjpcImV4Y2hhbmdlL3BvcHVwL2V4dHJhY3RNZ3JcIixcclxuICAgICAgICB3aXRoZHJhd2FsOiBcImV4Y2hhbmdlL3dpdGhkcmF3YWxcIixcclxuXHJcbiAgICAgICAgLy/liIbkuqvotZrpkrFcclxuICAgICAgICBwb3B1bGFyaXplOiBcInBvcHVsYXJpemUvcG9wdWxhcml6ZVwiLFxyXG4gICAgICAgIGdldHJlY29yZDogXCJwb3B1bGFyaXplL2dldHJlY29yZFwiLFxyXG4gICAgICAgIGhpc3Rvcnlicm9rZXJhZ2U6IFwicG9wdWxhcml6ZS9oaXN0b3J5YnJva2VyYWdlXCIsXHJcbiAgICAgICAgcGFuZGVjdDogXCJwb3B1bGFyaXplL3BhbmRlY3RcIixcclxuICAgICAgICBydWxlRGV0YWlsOiBcInBvcHVsYXJpemUvcnVsZURldGFpbFwiLFxyXG4gICAgICAgIHN1Ym9yZGluYXRlOiBcInBvcHVsYXJpemUvc3Vib3JkaW5hdGVcIixcclxuICAgICAgICB0b2RheWJyb2tlcmFnZTogXCJwb3B1bGFyaXplL3RvZGF5YnJva2VyYWdlXCIsXHJcblxyXG4gICAgICAgIC8v5rS75YqoXHJcbiAgICAgICAgYW5ub3VuY2VtZW50OiBcIm90aGVyL2Fubm91bmNlXCIsXHJcbiAgICAgICAgdXJnZW50bm90aWNlOiBcIm90aGVyL3VyZ2VudG5vdGljZVwiLFxyXG5cclxuICAgICAgICB0b3VyaXN0dGlwOiBcInRvdXJpc3R0aXBcIixcclxuXHJcbiAgICAgICAgLy/miL/pl7TlnLrlhaXlj6PpooTliLZcclxuICAgICAgICBjcmVhdGVSb29tOiBcInJvb20vY3JlYXRlUm9vbVwiLFxyXG4gICAgICAgIGpvaW5Sb29tOiBcInJvb20vam9pblJvb21cIixcclxuXHJcbiAgICAgICAgLy8g5oi/6Ze05Zy66aKE5Yi2XHJcbiAgICAgICAgcnF6bm5DcmVhdGU6IFwicm9vbS9zb25HYW1lL3Jxem5uQ3JlYXRlXCIsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g6ZK755+zXHJcbiAgICAgICAgZXhjaGFuZ2VEaWFtb25kOiBcInJvb20vZXhjaGFuZ2VEaWFtb25kXCIsXHJcbiAgICAgICAgZGlhbW9uZFJlY29yZDogXCJyb29tL2RpYW1vbmRSZWNvcmRcIixcclxuXHJcbiAgICAgICAgLy8g6K6w5b2VXHJcbiAgICAgICAgcm9vbVJlY29yZDogXCJyb29tL3JlY29yZC9yb29tUmVjb3JkXCIsXHJcbiAgICAgICAgLy8g5a2Q5ri45oiP6K6w5b2VXHJcbiAgICAgICAgcnF6bm5HYW1lUmVjb3JkOiBcInJvb20vcmVjb3JkL3Jxem5uL3Jxem5uR2FtZVJlY29yZFwiLFxyXG4gICAgICAgIHJxem5uUm9vbVJvdW5kOiBcInJvb20vcmVjb3JkL3Jxem5uL3Jxem5uUm9vbVJvdW5kXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIHJlY29yZHByZWZhYjoge1xyXG4gICAgICAgIGJhaWppYWxlX3JlY29yZERldGFpbHM6IFwicHJlZmFiL3B1YmxpYy9yZWNvcmQvYmFpamlhbGVfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIGJybm5fcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9icm5uX3JlY29yZERldGFpbHNcIixcclxuICAgICAgICBkenBrX3JlY29yZERldGFpbHM6IFwicHJlZmFiL3B1YmxpYy9yZWNvcmQvZHpwa19yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgaG9uZ2hlaV9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL2hvbmdoZWlfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIGxvbmdodWRvdV9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL2xvbmdodWRvdV9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgbHVja3R1cm50YWJsZV9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL2x1Y2t0dXJudGFibGVfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIHBhaWppdV9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL3BhaWppdV9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgcXpubl9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL3F6bm5fcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIHNhbmdvbmdfcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9zYW5nb25nX3JlY29yZERldGFpbHNcIixcclxuICAgICAgICBzaHVpZ3VvamlfcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9zaHVpZ3VvamlfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIHpoYWppbmh1YV9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL3poYWppbmh1YV9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAganN6amhfcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9qc3pqaF9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgZXN5ZF9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL2VzeWRfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIGViZ19yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL2ViZ19yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgZGR6X3JlY29yZERldGFpbHM6IFwicHJlZmFiL3B1YmxpYy9yZWNvcmQvZGR6X3JlY29yZERldGFpbHNcIixcclxuICAgICAgICBxaGJqbF9yZWNvcmREZXRhaWxzOiBcInByZWZhYi9wdWJsaWMvcmVjb3JkL3FoYmpsX3JlY29yZERldGFpbHNcIixcclxuICAgICAgICBzc3NfcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9zc3NfcmVjb3JkRGV0YWlsc1wiLFxyXG4gICAgICAgIGhjcHlfcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC9oY3B5X3JlY29yZERldGFpbHNcIixcclxuICAgICAgICBzbHdoX3JlY29yZERldGFpbHM6IFwicHJlZmFiL3B1YmxpYy9yZWNvcmQvc2x3aF9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICAgICAgd3F6bm5fcmVjb3JkRGV0YWlsczogXCJwcmVmYWIvcHVibGljL3JlY29yZC93cXpubl9yZWNvcmREZXRhaWxzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5by65Yi26aKE5Yqg6L2955qE5qih5Z2XXHJcbiAgICBjb21wZWxwcmVmYWI6IFtcclxuICAgICAgICAvL1widXNlcmluZm9cIiwgXCJwb3B1bGFyaXplXCIsIFwibHVja0RyYXdcIiwgXCJzaG9wXCIsIFwiY2hhbmdldGFibGVcIlxyXG4gICAgXSxcclxufTtcclxuIl19
"use strict";
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
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
        servicebox: "prefab/public/msgbox/servicebox",
    },
    //登入前预加载目录
    loinprefab: {
        confirmbox: "prefab/public/msgbox/confirmbox",
        installTipBox: "prefab/public/msgbox/installTipBox",
        juhua: "prefab/public/msgbox/juhua",
        loading: "prefab/public/loading/loading",
        gameMask: "prefab/public/msgbox/gameMask",
        changetable: "prefab/public/changetable/changetable",
    },
    //进入大厅的预加载目录
    plazaprefab: {
        base: "prefab/plaza/",      //根目录索引，禁止随意修改以及变换顺序

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
        userinforecord_complex:"userInfo/userinforecord_complex",
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
        wqznnentry:"center/wqznnentry",
        hbslentry:"center/hbslentry",
        //邮件
        email: "email/email",

        //任务
        Task: "Task/Task",

        //兑换
        exchangeWin: "exchange/exchangeWin",
        backWaterRule: "exchange/backWaterRule",
        exchangerecord: "exchange/exchangerecord",
        setExtractpass:"exchange/popup/setExtractpass",
        modifyPass:"exchange/popup/modifyPass",
        extractVerifica:"exchange/popup/extractVerifica",
        extractpass:"exchange/popup/extractpass",
        extractMgr:"exchange/popup/extractMgr",
        withdrawal: "exchange/withdrawal",

        //分享赚钱
        popularize: "popularize/popularize",
        getrecord: "popularize/getrecord",
        historybrokerage: "popularize/historybrokerage",
        pandect: "popularize/pandect",
        ruleDetail: "popularize/ruleDetail",
        subordinate: "popularize/subordinate",
        todaybrokerage: "popularize/todaybrokerage",

        //活动
        announcement: "other/announce",
        urgentnotice: "other/urgentnotice",

        touristtip: "touristtip",

        //房间场入口预制
        createRoom: "room/createRoom",
        joinRoom: "room/joinRoom",

        // 房间场预制
        rqznnCreate: "room/sonGame/rqznnCreate",
        
        // 钻石
        exchangeDiamond: "room/exchangeDiamond",
        diamondRecord: "room/diamondRecord",

        // 记录
        roomRecord: "room/record/roomRecord",
        // 子游戏记录
        rqznnGameRecord: "room/record/rqznn/rqznnGameRecord",
        rqznnRoomRound: "room/record/rqznn/rqznnRoomRound",
    },

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
        wqznn_recordDetails: "prefab/public/record/wqznn_recordDetails",
    },

    //强制预加载的模块
    compelprefab: [
        //"userinfo", "popularize", "luckDraw", "shop", "changetable"
    ],
};

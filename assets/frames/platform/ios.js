let
    Default = require("default"),
    AppClassName = "AppController",
    wechatClassName = "WXController",

    IOS = Default.extend({
        copyToClip: function (text, tipStr) {
            let methodName = "copyToClip:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, text.toString());
            glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
        },
        getClipText: function () {
            let methodName = "getClipText";
            let clipText = jsb.reflection.callStaticMethod(AppClassName, methodName);
            return clipText;
        },
        DownloadApk: function (strUrl) {
        },

        UpdateProgress: function () {
            return null;
        },

        getMachineCode: function () {
            let methodName = "getMachineCode";
            let imeiCode = jsb.reflection.callStaticMethod(AppClassName, methodName);
            console.log("ios imeiCode", imeiCode);
            return imeiCode;
        },
        getPhoneModel: function () {
            let methodName = "getPhoneModel";
            let PhoneModel = jsb.reflection.callStaticMethod(AppClassName, methodName);
            console.log("ios getPhoneModel", PhoneModel);
            return PhoneModel;
        },
        getSystemVersion: function () {
            let methodName = "getSystemVersion";
            let version = jsb.reflection.callStaticMethod(AppClassName, methodName);
            console.log("ios systemVersion", version);
            return version;
        },
        saveToLocal: function (filePath) {
            let methodName = "saveToLocal:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, filePath);
            glGame.panel.showTip(glGame.tips.COMMON.SAVESUCCESS);
        },
        getRegisID: function () {
            let methodName = "getRegisID";
            let registerID = jsb.reflection.callStaticMethod(AppClassName, methodName);
            console.log("ios jpush registerID", registerID)
            return registerID;
        },
        openURL: function (url) {
            let methodName = "openURL:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, url);
        },
        /**
        * 分享链接给好友
        * @param {*} title 分享标题
        * @param {*} content 分享内容
        * @param {*} url 分享链接
        * @param {*} scene 分享场景 0 好友 1 朋友圈/空间 2收藏
        * @param {*} image 分享图片url
        */
        shareTotWX(title, content, url, scene, image) {
            let methodName = "share:Content:Url:ShareImg:Scene:";
            return jsb.reflection.callStaticMethod(wechatClassName, methodName, title, content, url, image, scene);
        },

        /**
        * 分享图片给好友
        * @param {*} image 分享图片url
        * @param {*} scene 分享场景 1 好友 2 朋友圈/空间
        */
        shareImage(image, scene) {
            let methodName = "shareImage:Scene:";
            return jsb.reflection.callStaticMethod(wechatClassName, methodName, image, scene);
        },

        /**
         * 判定是否安装微信
         */
        isWxAppInstalled() {
            let methodName = "isWxAppInstalled";
            return jsb.reflection.callStaticMethod(wechatClassName, methodName);
        },

        loginWX: function () {
            let methodName = "login";
            jsb.reflection.callStaticMethod(wechatClassName, methodName);
        },
        jumpToApp: function (url) {
            let methodName = "jumpToApp:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, url.toString());
        },
        loginCallBack(data) {
            console.log('loginCallBack' + JSON.stringify(data))
            let msg = {
                username: data.openid,
                wx_headurl: data.headimgurl,
                wx_nickname: data.nickname,
                wx_sex: data.sex,
            }
            glGame.logon.reqWxLogin(msg);
        },

        changeOrientation(isRota) {
            glGame.isSystemRota = isRota;
            let methodName = "changeOrientation:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, glGame.isSystemRota);
        },

        offSuspension() {
            let methodName = "offSuspension";
            jsb.reflection.callStaticMethod(AppClassName, methodName);
        },

        // 用于红包扫雷锁定屏幕
        setHBSLLockingOrientation(isRota) {
            let methodName = "setHBSLLockingOrientation:";
            jsb.reflection.callStaticMethod(AppClassName, methodName, isRota);
        },
    }),
    g_instance = null;

module.exports.getInstance = function () {
    if (!g_instance) {
        g_instance = new IOS();
    }
    return g_instance;
}

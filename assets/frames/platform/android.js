let
    Default = require("default"),
    AppClassName = "org/cocos2dx/javascript/AppActivity",
    paramInt = "I",
    paramFloat = "F",
    paramBoolean = "Z",
    paramString = "Ljava/lang/String;",
    packageString = "com/wxapi/WXEntryActivity",
    Android = Default.extend({
        copyToClip: function (text, tipStr) {
            let methodName = "copyToClip";
            let methodSignature = `(${paramString})V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, text);
            glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
        },

        DownloadApk: function (strUrl) {
            let methodName = "DownloadApk";
            let methodSignature = `(${paramString})V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, strUrl);
        },

        UpdateProgress: function () {
            let methodName = "updateProgress";
            let methodSignature = `()${paramString}`;
            let progress = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            let progressData = progress != "" ? JSON.parse(progress) : null;
            return progressData;
        },


        getMachineCode: function () {
            let methodName = "getMacFromHardware";
            let methodSignature = `()${paramString}`;
            let MacID = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            return MacID;
        },

        saveToLocal(filePath) {
            //JS调用JAVA saveTextureToLocal 方法 参数为 filePath 也就是路径
            jsb.reflection.callStaticMethod(AppClassName, "saveTextureToLocal", `(${paramString})${paramBoolean}`, filePath);
            glGame.panel.showTip(glGame.tips.COMMON.SAVETOPHOTO);
        },
        
        openURL(url) {
            let methodName = "openURL";
            let methodSignature = `(${paramString})V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, url);
        },
        getRegisID() {
            let methodName = "getRegisID";
            let methodSignature = `()${paramString}`;
            let regisID = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            return regisID;
        },

        getClipText: function () {
            let methodName = "getClipText";
            let methodSignature = `()${paramString}`;
            let clipText = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            return clipText;
        },

        getPhoneModel() {
            let methodName = "getPhoneModel";
            let methodSignature = `()${paramString}`;
            let PhoneModel = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            return PhoneModel;
        },
        getSystemVersion() {
            let methodName = "getSystemVersion";
            let methodSignature = `()${paramString}`;
            let Version = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
            return Version;
        },
        /**
        * 分享链接给好友
        * @param {*} title 分享标题
        * @param {*} content 分享内容
        * @param {*} url 分享链接
        * @param {*} scene 分享场景 1 好友 2 朋友圈/空间
        * @param {*} image 分享图片url
        */
        shareTotWX(title, content, url, scene, image) {
            return jsb.reflection.callStaticMethod(
                `${packageString}`, "share",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)Z",
                title, content, url, image, scene
            );
        },

        /**
        * 分享图片给好友
        * @param {*} image 分享图片url
        * @param {*} scene 分享场景 0 好友 1 朋友圈/空间 2收藏
        */
        shareImage(image, scene) {
            return jsb.reflection.callStaticMethod(
                `${packageString}`, "shareImage",
                "(Ljava/lang/String;I)Z",
                image, scene
            );
        },

        /**
         * 判定是否安装微信
         */
        isWxAppInstalled() {
            return jsb.reflection.callStaticMethod(`${packageString}`, "isWxAppInstalled", `()${paramBoolean}`);
        },

        openWX() {
            jsb.reflection.callStaticMethod(
                `${packageString}`, "openWeiXin",
                "()V",
            );
        },

        loginWX() {
            jsb.reflection.callStaticMethod(
                `${packageString}`, "login",
                "()V",
            );
        },

        loginCallBack(data) {
            let msg = {
                username: data.openid,
                wx_headurl: data.headimgurl,
                wx_nickname: data.nickname,
                wx_sex: data.sex,
            }
            glGame.logon.reqWxLogin(msg);
        },

        jumpToApp(url) {
            cc.sys.openURL(url.toString());
        },

        changeOrientation(isRota) {
            glGame.isSystemRota = isRota;
            let methodName = "changeOrientation";
            let methodSignature = `(${paramBoolean})V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, glGame.isSystemRota);
        },

        offSuspension(){
            let methodName = "offSuspension";
            let methodSignature = `()V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
        },

        // 用于红包扫雷锁定屏幕
        setHBSLLockingOrientation(isRota) {
            let methodName = "setHBSLLockingOrientation";
            let methodSignature = `(${paramBoolean})V`;
            jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, isRota);
        },
    }),
    g_instance = null;

module.exports.getInstance = function () {
    if (!g_instance) {
        g_instance = new Android();
    }
    return g_instance;
}

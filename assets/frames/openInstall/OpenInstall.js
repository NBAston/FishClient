
var openinstall= {

    installCallback(appData){
    },

    wakeupCallback(appData){
    },
    // 初始化
    getInstall: function (s, callback) {
        this.installCallback = callback;
        this.fun_error = null;
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            console.log("调用java getInstall============================")
            this.fun_error = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                "getInstall", "(I)Z", s);
        } else if(cc.sys.OS_IOS == cc.sys.os){
            this.fun_error = jsb.reflection.callStaticMethod("IOSOpenInstallBridge","getInstall:",s);
        }

        console.log("js to openinstall this.fun_error", this.fun_error)
        if (!this.fun_error) {
            console.log("js to openinstall 方法不存或者调用出错")
            this._installCallback({"channelCode":"","bindData":""})
        }
    },
    // 唤醒
    registerWakeUpHandler: function (callback) {
        this.wakeupCallback = callback;
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            console.log("调用java registerWakeUpHandler============================")
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                "registerWakeup", "()V");
        } else if(cc.sys.OS_IOS == cc.sys.os){
            jsb.reflection.callStaticMethod("IOSOpenInstallBridge","registerWakeUpHandler");
        }
    },

    reportRegister: function () {
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            jsb.reflection.callStaticMethod("com/fm/openinstall/OpenInstall",
                "reportRegister", "()V");
        } else if(cc.sys.OS_IOS == cc.sys.os){
            jsb.reflection.callStaticMethod("IOSOpenInstallBridge","reportRegister");
        }
    },

    reportEffectPoint: function (pointId, pointValue) {
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            jsb.reflection.callStaticMethod("com/fm/openinstall/OpenInstall",
                "reportEffectPoint", "(Ljava/lang/String;J)V", pointId, pointValue);
        } else if(cc.sys.OS_IOS == cc.sys.os){
            jsb.reflection.callStaticMethod("IOSOpenInstallBridge","reportEffectPoint:Value:",pointId,pointValue);
        }
    },

    _installCallback: function (appData) {
        console.log("安装参数：", appData.channelCode, appData.bindData);
        for (let key in appData.bindData) {
            console.log("installCallback", key, appData.bindData[key]);
        }
        this.installCallback(appData);
    },

    _wakeupCallback: function (appData) {
        console.log("唤醒参数:", appData.channelCode, appData.bindData);
        for (let key in appData.bindData) {
            console.log("wakeupCallback", key, appData.bindData[key]);
        }
        this.wakeupCallback(appData);
    },

};
module.exports = openinstall;

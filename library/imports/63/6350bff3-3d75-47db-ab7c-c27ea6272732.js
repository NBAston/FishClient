"use strict";
cc._RF.push(module, '6350b/zPXVH26t8wn6mJycy', 'android');
// frames/platform/android.js

"use strict";

var Default = require("default"),
    AppClassName = "org/cocos2dx/javascript/AppActivity",
    paramInt = "I",
    paramFloat = "F",
    paramBoolean = "Z",
    paramString = "Ljava/lang/String;",
    packageString = "com/wxapi/WXEntryActivity",
    Android = Default.extend({
  copyToClip: function copyToClip(text, tipStr) {
    var methodName = "copyToClip";
    var methodSignature = "(".concat(paramString, ")V");
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, text);
    glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
  },
  DownloadApk: function DownloadApk(strUrl) {
    var methodName = "DownloadApk";
    var methodSignature = "(".concat(paramString, ")V");
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, strUrl);
  },
  UpdateProgress: function UpdateProgress() {
    var methodName = "updateProgress";
    var methodSignature = "()".concat(paramString);
    var progress = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
    var progressData = progress != "" ? JSON.parse(progress) : null;
    return progressData;
  },
  getMachineCode: function getMachineCode() {
    var methodName = "getMacFromHardware";
    var methodSignature = "()".concat(paramString);
    var MacID = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
    return MacID;
  },
  saveToLocal: function saveToLocal(filePath) {
    //JS调用JAVA saveTextureToLocal 方法 参数为 filePath 也就是路径
    jsb.reflection.callStaticMethod(AppClassName, "saveTextureToLocal", "(".concat(paramString, ")").concat(paramBoolean), filePath);
    glGame.panel.showTip(glGame.tips.COMMON.SAVETOPHOTO);
  },
  openURL: function openURL(url) {
    var methodName = "openURL";
    var methodSignature = "(".concat(paramString, ")V");
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, url);
  },
  getRegisID: function getRegisID() {
    var methodName = "getRegisID";
    var methodSignature = "()".concat(paramString);
    var regisID = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
    return regisID;
  },
  getClipText: function getClipText() {
    var methodName = "getClipText";
    var methodSignature = "()".concat(paramString);
    var clipText = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
    return clipText;
  },
  getPhoneModel: function getPhoneModel() {
    var methodName = "getPhoneModel";
    var methodSignature = "()".concat(paramString);
    var PhoneModel = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
    return PhoneModel;
  },
  getSystemVersion: function getSystemVersion() {
    var methodName = "getSystemVersion";
    var methodSignature = "()".concat(paramString);
    var Version = jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
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
  shareTotWX: function shareTotWX(title, content, url, scene, image) {
    return jsb.reflection.callStaticMethod("".concat(packageString), "share", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)Z", title, content, url, image, scene);
  },

  /**
  * 分享图片给好友
  * @param {*} image 分享图片url
  * @param {*} scene 分享场景 0 好友 1 朋友圈/空间 2收藏
  */
  shareImage: function shareImage(image, scene) {
    return jsb.reflection.callStaticMethod("".concat(packageString), "shareImage", "(Ljava/lang/String;I)Z", image, scene);
  },

  /**
   * 判定是否安装微信
   */
  isWxAppInstalled: function isWxAppInstalled() {
    return jsb.reflection.callStaticMethod("".concat(packageString), "isWxAppInstalled", "()".concat(paramBoolean));
  },
  openWX: function openWX() {
    jsb.reflection.callStaticMethod("".concat(packageString), "openWeiXin", "()V");
  },
  loginWX: function loginWX() {
    jsb.reflection.callStaticMethod("".concat(packageString), "login", "()V");
  },
  loginCallBack: function loginCallBack(data) {
    var msg = {
      username: data.openid,
      wx_headurl: data.headimgurl,
      wx_nickname: data.nickname,
      wx_sex: data.sex
    };
    glGame.logon.reqWxLogin(msg);
  },
  jumpToApp: function jumpToApp(url) {
    cc.sys.openURL(url.toString());
  },
  changeOrientation: function changeOrientation(isRota) {
    glGame.isSystemRota = isRota;
    var methodName = "changeOrientation";
    var methodSignature = "(".concat(paramBoolean, ")V");
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, glGame.isSystemRota);
  },
  offSuspension: function offSuspension() {
    var methodName = "offSuspension";
    var methodSignature = "()V";
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature);
  },
  // 用于红包扫雷锁定屏幕
  setHBSLLockingOrientation: function setHBSLLockingOrientation(isRota) {
    var methodName = "setHBSLLockingOrientation";
    var methodSignature = "(".concat(paramBoolean, ")V");
    jsb.reflection.callStaticMethod(AppClassName, methodName, methodSignature, isRota);
  }
}),
    g_instance = null;

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new Android();
  }

  return g_instance;
};

cc._RF.pop();
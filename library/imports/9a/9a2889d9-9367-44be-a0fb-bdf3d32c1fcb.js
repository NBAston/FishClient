"use strict";
cc._RF.push(module, '9a288nZk2dEvqD7vfPTLB/L', 'ios');
// frames/platform/ios.js

"use strict";

var Default = require("default"),
    AppClassName = "AppController",
    wechatClassName = "WXController",
    IOS = Default.extend({
  copyToClip: function copyToClip(text, tipStr) {
    var methodName = "copyToClip:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, text.toString());
    glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
  },
  getClipText: function getClipText() {
    var methodName = "getClipText";
    var clipText = jsb.reflection.callStaticMethod(AppClassName, methodName);
    return clipText;
  },
  DownloadApk: function DownloadApk(strUrl) {},
  UpdateProgress: function UpdateProgress() {
    return null;
  },
  getMachineCode: function getMachineCode() {
    var methodName = "getMachineCode";
    var imeiCode = jsb.reflection.callStaticMethod(AppClassName, methodName);
    console.log("ios imeiCode", imeiCode);
    return imeiCode;
  },
  getPhoneModel: function getPhoneModel() {
    var methodName = "getPhoneModel";
    var PhoneModel = jsb.reflection.callStaticMethod(AppClassName, methodName);
    console.log("ios getPhoneModel", PhoneModel);
    return PhoneModel;
  },
  getSystemVersion: function getSystemVersion() {
    var methodName = "getSystemVersion";
    var version = jsb.reflection.callStaticMethod(AppClassName, methodName);
    console.log("ios systemVersion", version);
    return version;
  },
  saveToLocal: function saveToLocal(filePath) {
    var methodName = "saveToLocal:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, filePath);
    glGame.panel.showTip(glGame.tips.COMMON.SAVESUCCESS);
  },
  getRegisID: function getRegisID() {
    var methodName = "getRegisID";
    var registerID = jsb.reflection.callStaticMethod(AppClassName, methodName);
    console.log("ios jpush registerID", registerID);
    return registerID;
  },
  openURL: function openURL(url) {
    var methodName = "openURL:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, url);
  },

  /**
  * ?????????????????????
  * @param {*} title ????????????
  * @param {*} content ????????????
  * @param {*} url ????????????
  * @param {*} scene ???????????? 0 ?????? 1 ?????????/?????? 2??????
  * @param {*} image ????????????url
  */
  shareTotWX: function shareTotWX(title, content, url, scene, image) {
    var methodName = "share:Content:Url:ShareImg:Scene:";
    return jsb.reflection.callStaticMethod(wechatClassName, methodName, title, content, url, image, scene);
  },

  /**
  * ?????????????????????
  * @param {*} image ????????????url
  * @param {*} scene ???????????? 1 ?????? 2 ?????????/??????
  */
  shareImage: function shareImage(image, scene) {
    var methodName = "shareImage:Scene:";
    return jsb.reflection.callStaticMethod(wechatClassName, methodName, image, scene);
  },

  /**
   * ????????????????????????
   */
  isWxAppInstalled: function isWxAppInstalled() {
    var methodName = "isWxAppInstalled";
    return jsb.reflection.callStaticMethod(wechatClassName, methodName);
  },
  loginWX: function loginWX() {
    var methodName = "login";
    jsb.reflection.callStaticMethod(wechatClassName, methodName);
  },
  jumpToApp: function jumpToApp(url) {
    var methodName = "jumpToApp:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, url.toString());
  },
  loginCallBack: function loginCallBack(data) {
    console.log('loginCallBack' + JSON.stringify(data));
    var msg = {
      username: data.openid,
      wx_headurl: data.headimgurl,
      wx_nickname: data.nickname,
      wx_sex: data.sex
    };
    glGame.logon.reqWxLogin(msg);
  },
  changeOrientation: function changeOrientation(isRota) {
    glGame.isSystemRota = isRota;
    var methodName = "changeOrientation:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, glGame.isSystemRota);
  },
  offSuspension: function offSuspension() {
    var methodName = "offSuspension";
    jsb.reflection.callStaticMethod(AppClassName, methodName);
  },
  // ??????????????????????????????
  setHBSLLockingOrientation: function setHBSLLockingOrientation(isRota) {
    var methodName = "setHBSLLockingOrientation:";
    jsb.reflection.callStaticMethod(AppClassName, methodName, isRota);
  }
}),
    g_instance = null;

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new IOS();
  }

  return g_instance;
};

cc._RF.pop();
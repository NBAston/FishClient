"use strict";
cc._RF.push(module, '1ec1ad9I4VMsaAIuyaAGWso', 'default');
// frames/platform/default.js

"use strict";

var Default = function Default() {},
    Def = Default.prototype,
    g_instance = null;
/**
 * 复制到剪切板
 */


Def.copyToClip = function () {
  glGame.panel.showMsgBox("", "Default copyToClip, 平台脚本重写改拷贝函数...");
};

Def.getMachineCode = function () {
  return "";
};

Def.setHBSLLockingOrientation = function (isRota) {};

Def.getClipText = function () {
  return "";
};

Def.getSystemVersion = function () {
  return 0;
};

Def.getPhoneModel = function () {
  return null;
};

Def.getRegisID = function () {
  return "win32";
};

Def.DownloadApk = function (strUrl) {};

Def.UpdateProgress = function () {
  return null;
};

Def.changeOrientation = function (isRota) {};

Def.offSuspension = function () {};

Default.getInstance = function () {
  if (!g_instance) {
    g_instance = new Default();
  }

  return g_instance;
};
/**
 * 简单的写个原型继承
 */


Default.extend = function (o) {
  function Class() {}

  ;

  for (var key in Default) {
    Class.prototype[key] = Default.prototype[key];
  }

  for (var _key in o) {
    Class.prototype[_key] = o[_key];
  }

  return Class;
};

module.exports = Default;

cc._RF.pop();
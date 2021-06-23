"use strict";
cc._RF.push(module, '70bb5Y3yFRG8ryzRvlV2H5F', 'web');
// frames/platform/web.js

"use strict";

var Def = require("default"),
    Web = Def.extend({
  copyToClip: function copyToClip(str, tipStr) {
    var textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
    } catch (err) {}

    document.body.removeChild(textArea);
  },
  openURL: function openURL(url) {
    cc.sys.openURL(url);
  },
  changeOrientation: function changeOrientation(isRota) {},
  offSuspension: function offSuspension() {},
  setHBSLLockingOrientation: function setHBSLLockingOrientation(isRota) {},
  isWxAppInstalled: function isWxAppInstalled() {
    return false;
  }
}),
    g_instance = null;

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new Web();
  }

  return g_instance;
};

cc._RF.pop();
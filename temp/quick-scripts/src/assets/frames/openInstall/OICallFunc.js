"use strict";
cc._RF.push(module, 'dfd05G5Tv5AQqDZipXh4/6S', 'OICallFunc');
// frames/openInstall/OICallFunc.js

"use strict";

var openinstall = require("OpenInstall");

var OICallFunc = function OICallFunc() {};

var oiCallFunc = OICallFunc.prototype;
var g_instance = null;

oiCallFunc.registerWakeUpHandler = function (callback) {
  openinstall.registerWakeUpHandler(callback);
};

oiCallFunc.getInstall = function (delaytime, callback) {
  openinstall.getInstall(delaytime, callback);
};

module.exports.getInstance = function () {
  if (!g_instance) {
    g_instance = new OICallFunc();
  }

  return g_instance;
};

cc._RF.pop();
let openinstall = require("OpenInstall");
let OICallFunc = function(){

};
let oiCallFunc = OICallFunc.prototype;
let g_instance = null;

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
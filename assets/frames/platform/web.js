let
    Def = require("default"),
    Web = Def.extend({
        copyToClip: function (str, tipStr) {
            let textArea = document.createElement("textarea");
            textArea.style.background = 'transparent';
            textArea.value = str;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                let successful = document.execCommand('copy');
                glGame.panel.showTip(tipStr ? tipStr : glGame.tips.COMMON.COPYSUCCESS);
            } catch (err) {
            }
            document.body.removeChild(textArea);
        },
        openURL: function (url) {
            cc.sys.openURL(url)
        },
        changeOrientation: function (isRota) { },
        offSuspension: function () { },
        setHBSLLockingOrientation: function (isRota) { },
        isWxAppInstalled: function () { return false }
    }),
    g_instance = null;
module.exports.getInstance = function () {
    if (!g_instance) {
        g_instance = new Web();
    }
    return g_instance;
};


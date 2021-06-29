/**
 * 分享面板, 目前还差复制功能未做
 */
glGame.baseclass.extend({
    properties: {
        ewm: cc.node    // 二维码
    },
    onLoad () {
        glGame.loader.remoteLoad(glGame.servercfg.getQRCodeURL()).then(data => {
            this.ewm.getComponent(cc.Sprite).spriteFrame = data;
        });
    },
    onClick (name, node) {
        switch (name) {
            case "copy": this.click_copy(); break;
            case "close": this.click_close(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_copy () {
        glGame.platform.copyToClip("https://fir.im/wve6");
    },
    click_close () {
        this.remove();
    }
});

/**
 * 设置面板
 */
glGame.baseclass.extend({
    properties: {
        BGM: cc.Toggle,
        SE: cc.Toggle,
        GS: cc.Node,
        MSS: cc.Slider,
        ESS: cc.Slider,
        MSB: cc.Node,
        ESB: cc.Node,
    },
    onLoad () {
        this.showPanelInfo();
        this.registerEvent();
    },
    registerEvent () {
        this.MSB.on("touchcancel", this.MSBTouchCancelNext, this);
        this.MSB.on("touchend", this.MSBTouchCancelNext, this);
        this.ESB.on("touchcancel", this.ESBTouchCancelNext, this);
        this.ESB.on("touchend", this.ESBTouchCancelNext, this);
        this.BGM.node.on("toggle", this.click_music, this);
        this.SE.node.on("toggle", this.click_effect, this);
    },
    unRegisterEvent () {
        this.MSB.off("touchcancel", this.MSBTouchCancelNext, this);
        this.MSB.off("touchend", this.MSBTouchCancelNext, this);
        this.ESB.off("touchcancel", this.ESBTouchCancelNext, this);
        this.ESB.off("touchend", this.ESBTouchCancelNext, this);
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    showPanelInfo () {
        // 根据本地缓存的声音数据来更新按钮状态
        let BGMSE = glGame.audio.get("BGMSE");
        this.BGM.isChecked = BGMSE["BGMPlayState"];
        this.BGM.node.getChildByName("music").active = !BGMSE["BGMPlayState"];
        this.SE.isChecked = BGMSE["SoundEffectPlayState"];
        this.SE.node.getChildByName("effect").active = !BGMSE["SoundEffectPlayState"];
        this.MSS.progress = this.MSS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
        this.ESS.progress = this.ESS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];
    },
    MSBTouchCancelNext () {
        glGame.audio.saveVolume();
    },
    ESBTouchCancelNext () {
        glGame.audio.saveVolume();
    },
    onSliderProcess (node, process) {
        let name = node.name;
        switch (name) {
            case "musicslider":
                node.parent.getComponent(cc.ProgressBar).progress = process;
                glGame.audio.setBGMVolume(process);
                break;
            case "effectslider":
                node.parent.getComponent(cc.ProgressBar).progress = process;
                glGame.audio.setSoundEffectVolume(process);
                break;
        }
    },
    onClick (name, node) {
        switch (name) {
            case "close": this.click_close(); break;
            case "switchacc": this.click_switchacc(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_close () {
        this.remove();
    },
    click_music (event) {
        let node = event.target
        let isChecked = event.isChecked;
        node.active = !isChecked;
        if (isChecked) glGame.audio.openBGM();
        else glGame.audio.closeBGM();
    },
    click_effect (event) {
        let node = event.target
        let isChecked = event.isChecked;
        node.active = !isChecked;
        if (isChecked) glGame.audio.openSE();
        else glGame.audio.closeSE();
    },
    click_switchacc () {
        glGame.logon.logout();
        glGame.storage.removeItemByKey("loginCache");
    }
});

"use strict";
cc._RF.push(module, '763ffxY1IJMTJ8h5Bx9cwIg', 'setting');
// modules/public/script/setting/setting.js

"use strict";

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
    ESB: cc.Node
  },
  onLoad: function onLoad() {
    this.showPanelInfo();
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    this.MSB.on("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.on("touchend", this.MSBTouchCancelNext, this);
    this.ESB.on("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.on("touchend", this.ESBTouchCancelNext, this);
    this.BGM.node.on("toggle", this.click_music, this);
    this.SE.node.on("toggle", this.click_effect, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    this.MSB.off("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.off("touchend", this.MSBTouchCancelNext, this);
    this.ESB.off("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.off("touchend", this.ESBTouchCancelNext, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  showPanelInfo: function showPanelInfo() {
    // 根据本地缓存的声音数据来更新按钮状态
    var BGMSE = glGame.audio.get("BGMSE");
    this.BGM.isChecked = BGMSE["BGMPlayState"];
    this.BGM.node.getChildByName("music").active = !BGMSE["BGMPlayState"];
    this.SE.isChecked = BGMSE["SoundEffectPlayState"];
    this.SE.node.getChildByName("effect").active = !BGMSE["SoundEffectPlayState"];
    this.MSS.progress = this.MSS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
    this.ESS.progress = this.ESS.node.parent.getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];
  },
  MSBTouchCancelNext: function MSBTouchCancelNext() {
    glGame.audio.saveVolume();
  },
  ESBTouchCancelNext: function ESBTouchCancelNext() {
    glGame.audio.saveVolume();
  },
  onSliderProcess: function onSliderProcess(node, process) {
    var name = node.name;

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
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "switchacc":
        this.click_switchacc();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  click_music: function click_music(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openBGM();else glGame.audio.closeBGM();
  },
  click_effect: function click_effect(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openSE();else glGame.audio.closeSE();
  },
  click_switchacc: function click_switchacc() {
    glGame.logon.logout();
    glGame.storage.removeItemByKey("loginCache");
  }
});

cc._RF.pop();
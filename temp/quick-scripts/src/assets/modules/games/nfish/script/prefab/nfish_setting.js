"use strict";
cc._RF.push(module, '22dc14edDRHU6APCCIQx7DB', 'nfish_setting');
// modules/games/nfish/script/prefab/nfish_setting.js

"use strict";

/***
 *  捕鱼：设置 - 音效
 * **/
var CONST = require("nfishConst");

glGame.baseclass.extend({
  properties: {
    BGM: cc.Toggle,
    SE: cc.Toggle,
    MSS: cc.Slider,
    ESS: cc.Slider,
    MSB: cc.Node,
    ESB: cc.Node,
    musicProgressBar: cc.Node,
    soundProgressBar: cc.Node,
    musicToggle: cc.Node,
    soundToggle: cc.Node
  },
  onLoad: function onLoad() {
    this.showPanelInfo();
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    this.musicToggle.on("toggle", this.click_music, this);
    this.soundToggle.on("toggle", this.click_effect, this);
    this.MSB.on("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.on("touchend", this.MSBTouchCancelNext, this);
    this.ESB.on("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.on("touchend", this.ESBTouchCancelNext, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    this.MSB.off("touchcancel", this.MSBTouchCancelNext, this);
    this.MSB.off("touchend", this.MSBTouchCancelNext, this);
    this.ESB.off("touchcancel", this.ESBTouchCancelNext, this);
    this.ESB.off("touchend", this.ESBTouchCancelNext, this);
  },
  click_music: function click_music(event) {
    if (!this.musicToggle.getComponent(cc.Toggle).isChecked) {
      glGame.audio.openBGM();
    } else {
      glGame.audio.closeBGM();
    }

    var BGMSE = glGame.audio.get("BGMSE");
    this.musicToggle.getChildByName("Background").active = BGMSE["BGMPlayState"];
    this.soundToggle.getChildByName("Background").active = BGMSE["SoundEffectPlayState"];
  },
  click_effect: function click_effect(event) {
    if (!this.soundToggle.getComponent(cc.Toggle).isChecked) {
      glGame.audio.openSE();
    } else {
      glGame.audio.closeSE();
    }

    var BGMSE = glGame.audio.get("BGMSE");
    this.musicToggle.getChildByName("Background").active = BGMSE["BGMPlayState"];
    this.soundToggle.getChildByName("Background").active = BGMSE["SoundEffectPlayState"];
  },
  showPanelInfo: function showPanelInfo() {
    // 根据本地缓存的声音数据来更新按钮状态
    var BGMSE = glGame.audio.get("BGMSE");
    this.musicToggle.getComponent(cc.Toggle).isChecked = !BGMSE["BGMPlayState"];
    this.soundToggle.getComponent(cc.Toggle).isChecked = !BGMSE["SoundEffectPlayState"];
    this.musicToggle.getChildByName("Background").active = BGMSE["BGMPlayState"];
    this.soundToggle.getChildByName("Background").active = BGMSE["SoundEffectPlayState"];
    this.MSS.progress = BGMSE["BGMVolume"];
    this.ESS.progress = BGMSE["SoundEffectVolume"];
    this.musicProgressBar.getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
    this.soundProgressBar.getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];
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
      case "music":
        glGame.audio.setBGMVolume(process);
        this.musicProgressBar.getComponent(cc.ProgressBar).progress = process;
        break;

      case "sound":
        glGame.audio.setSoundEffectVolume(process);
        this.soundProgressBar.getComponent(cc.ProgressBar).progress = process;
        break;
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  //水波赋值
  update: function update(dt) {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
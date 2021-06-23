"use strict";
cc._RF.push(module, 'a8ba0sTFKNI8ajSuzwSeC6G', 'baseclass');
// frames/base/baseclass.js

"use strict";

window.glGame = window.glGame || {};
glGame.baseclass = cc.Component.extend({
  /**
   * @param event
   * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
   * @Explain Button点击事件统一调用
   */
  OnClickButton: function OnClickButton(event, type) {
    var _this = this;

    var buttonName = event.target.name;
    var buttonNode = event.target;

    if (!type || type == "select") {
      if (this.curClickState) return;
      this.curClickState = true;
      this.allCurTimeout = this.allCurTimeout || [];
      this.allCurTimeout.push(setTimeout(function () {
        _this.curClickState = false;
      }, 500));
    }

    console.log("\u70B9\u51FB\u4E86button -> ".concat(buttonName));

    switch (buttonName) {
      case "close_eff":
        //当前界面有播放特长音效的关闭按钮
        glGame.audio.closeCurEffect();
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      case "close":
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      default:
        if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");else glGame.audio.playLoadSoundEffectByPath("click");
    }

    this.onClick(buttonName, buttonNode);
  },

  /**
   * @param event
   * @Explain Toggle点击事件统一调用
   */
  OnClickToggle: function OnClickToggle(event) {
    var buttonName = event.node.name;
    var buttonNode = event.node;
    console.log("\u70B9\u51FB\u4E86toggle -> ".concat(buttonName));
    glGame.audio.playLoadSoundEffectByPath("select");
    this.onClick(buttonName, buttonNode);
  },

  /**
   * @param ButtonName
   * @param ButtonNode
   * @Explain 子类需要重写这个接口来触发点击事件
   */
  onClick: function onClick(ButtonName, ButtonNode) {},
  OnSlider: function OnSlider(event) {
    var node = event.node;
    var process = event.progress;
    this.onSliderProcess(node, process);
  },
  onSliderProcess: function onSliderProcess(node, process) {},
  // 组件启用时,每帧调用
  update: function update() {},
  // 同update一样
  lateUpdate: function lateUpdate() {},
  // 当附加到一个激活的节点上或者其节点第一次激活时候调用。因此只会在刚创建的时候被调用一次后面都不在调用
  onLoad: function onLoad() {},
  // 如果该组件第一次启用，则在所有组件的 update 之前调用。
  start: function start() {},
  // 当该组件被启用，并且它的节点也激活时。
  onEnable: function onEnable() {},
  // 当该组件被禁用或节点变为无效时调用。
  onDisable: function onDisable() {},
  // 当该组件被销毁时调用
  onDestroy: function onDestroy() {
    this.OnDestroy();
    this.clearCurTimeout();
    if (this.node.name.indexOf("entry") != -1) glGame.audio.goBackPlazaAudio(this.node.name); //if (!cc.isValid(this.node)) this.node.removeFromParent();
  },
  // 子类重写此销毁函数
  OnDestroy: function OnDestroy() {},

  /**
   * 销毁自己
   */
  remove: function remove() {
    var blRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (glGame.panel.isHaveEntry()) glGame.emitter.emit(MESSAGE.UI.PLAZA_OPEN, this.node.name);
    this.node.destroy(); // TODO 羞耻修改，必须要改

    if (isEnableHotUpdate && blRemove) glGame.panel.PrefabRelease(this.node.name);
  },
  clearCurTimeout: function clearCurTimeout() {
    if (!this.allCurTimeout) return;
    var count = this.allCurTimeout.length;

    for (var i = 0; i < count; i++) {
      clearTimeout(this.allCurTimeout[i]);
    }
  },

  /**
   * 给予适配比例
   */
  fitScreen: function fitScreen() {
    var nowSize = cc.winSize,
        cutSize = cc.view.getDesignResolutionSize(),
        nowRatio = nowSize.width / nowSize.height,
        cutRatio = cutSize.width / cutSize.height;

    if (nowRatio < cutRatio) {
      cc.view.setDesignResolutionSize(cutSize.width, cutSize.height, cc.ResolutionPolicy.FIXED_WIDTH);
    } else {
      cc.view.setDesignResolutionSize(cutSize.width, nowSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    }
  }
});

cc._RF.pop();
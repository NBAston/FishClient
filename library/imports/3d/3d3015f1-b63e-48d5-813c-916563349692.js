"use strict";
cc._RF.push(module, '3d301Xxtj5I1YE8kWVjNJaS', 'share');
// modules/plaza/script/prefab/smallComp/share.js

"use strict";

/**
 * 分享面板, 目前还差复制功能未做
 */
glGame.baseclass.extend({
  properties: {
    ewm: cc.node // 二维码

  },
  onLoad: function onLoad() {
    var _this = this;

    glGame.loader.remoteLoad(glGame.servercfg.getQRCodeURL()).then(function (data) {
      _this.ewm.getComponent(cc.Sprite).spriteFrame = data;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "copy":
        this.click_copy();
        break;

      case "close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_copy: function click_copy() {
    glGame.platform.copyToClip("https://fir.im/wve6");
  },
  click_close: function click_close() {
    this.remove();
  }
});

cc._RF.pop();
"use strict";
cc._RF.push(module, '47fd97iTYhJGpoVuHgV/vD3', 'settingRepair');
// modules/plaza/script/prefab/setting/settingRepair.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.initUI();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_ok":
        this.onOkClick();
        break;

      case "btn_repair":
        this.onRepairClick();
        break;

      case "btn_install":
        this.onInstallClick();
        break;
    }
  },
  initUI: function initUI() {
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      this.node.getChildByName("android").active = true;
    } else if (cc.sys.os === cc.sys.OS_IOS) {
      this.node.getChildByName("ios").active = true;
    }
  },
  onOkClick: function onOkClick() {
    glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', function () {
      clearGame();
      console.log("清空游戏缓存");
    }, function () {}, "取消", "确定");
  },
  onRepairClick: function onRepairClick() {
    glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', function () {
      clearGame();
      console.log("清空游戏缓存");
    }, function () {}, "取消", "确定");
  },
  onInstallClick: function onInstallClick() {
    cc.sys.openURL(glGame.user.get("url").repair);
    var isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
    isShowSetupPanel.isSetup = true;
    glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {},
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
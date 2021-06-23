"use strict";
cc._RF.push(module, '60173DWEhlPJJbKT6VRuVAQ', 'settings');
// modules/plaza/script/prefab/setting/settings.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {
    mainPanel: cc.Node,
    toggleRepair: cc.Node,
    toggleModify: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();

    if (!cc.sys.isNative) {
      this.toggleRepair.active = false;
    }

    if (glGame.user.isTourist()) {
      this.toggleModify.active = false;
    }

    if (cc.sys.isNative) {
      var frame = this.node.getChildByName("bg");
      frame.getChildByName("version").getComponent(cc.Label).string = "\u5F53\u524D\u7248\u672C: ".concat(glGame.version);
    }

    this.showPanel("volume");
    glGame.panel.showEffectPariticle(this.node);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "volume":
      case "sound":
      case "repair":
      case "about":
      case "modifypsd":
        this.showPanel(name);
        break;

      case "head":
        this.changeHead_cb();
        break;

      case 'btn_grzl':
        this.userEdit_cb();
        break;

      case 'btn_phoneEdit':
        this.phoneEdit_cb();
        break;

      case 'btn_nicknameEdit':
        this.nicknameEdit_cb();
        break;

      case "close":
        this.remove();
        break;
    }
  },
  //显示某个界面。按名字来显示
  showPanel: function showPanel(panelName) {
    var _this = this;

    this.hideAllPanel();
    var panellist = {};
    panellist["volume"] = "settingVolume";
    panellist["sound"] = "settingSelectMusic";
    panellist["repair"] = "settingRepair";
    panellist["about"] = "settingAbout";
    panellist["modifypsd"] = "settingModifypsd";

    for (var name in panellist) {
      var index = 0;
      if (panelName == name) index = 1;
    }

    if (this.mainPanel.getChildByName(panellist[panelName])) {
      this.mainPanel.getChildByName(panellist[panelName]).active = true;
      return;
    }

    glGame.panel.getPanelByName(panellist[panelName]).then(function (panelData) {
      panelData.setPosition(cc.v2(0, 0));
      panelData.parent = _this.mainPanel;
    });
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.mainPanel.childrenCount) return;

    for (var i = 0; i < this.mainPanel.childrenCount; i++) {
      this.mainPanel.children[i].active = false;
    }
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
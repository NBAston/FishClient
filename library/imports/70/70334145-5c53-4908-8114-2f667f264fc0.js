"use strict";
cc._RF.push(module, '70334FFXFNJCIEUL2Z/Jk/A', 'service');
// modules/public/script/service/service.js

"use strict";

/**
 * 客服面板, 直接webView连接到 php 指定网址, 具体功能由 php 完成
 */
glGame.baseclass.extend({
  properties: {
    audio: {
      type: cc.AudioClip,
      "default": null
    },
    leftContent: cc.Node,
    node_detail: cc.Node,
    prefab_Question: cc.Prefab,
    prefab_phone: cc.Prefab,
    prefab_exclusive: cc.Prefab,
    node_QRcode: cc.Node,
    code_bg: cc.Node,
    node_webOnline: cc.Node,
    node_head: cc.Node,
    node_copyid: cc.Node,
    label_copyid: cc.Label
  },
  start: function start() {
    this.registerEvent();
    glGame.audio.playSoundEffect(this.audio); // this.node_copyid.active = !glGame.user.isTourist();
    // if (this.node_copyid.active) this.label_copyid.string = "" + glGame.user.get("logicID");

    glGame.user.ReqCustomServerConfig();
  },
  setShowKefu: function setShowKefu(bFirstShowKefu) {
    this.bFirstShowKefu = bFirstShowKefu;
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("showWechatCode", this.initCode, this);
    glGame.emitter.on("updateCustomServer", this.customServer, this);
    glGame.emitter.on("updateCustomServerConfig", this.updateCustomServerConfig, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("showWechatCode", this);
    glGame.emitter.off("updateCustomServer", this);
    glGame.emitter.off("updateCustomServerConfig", this);
  },
  updateCustomServerConfig: function updateCustomServerConfig() {
    glGame.user.reqCustomServer(1, 1, true);
  },
  userUrlData: function userUrlData() {},
  showUI: function showUI() {
    var CustomServerConfig = glGame.user.get("CustomServerConfig").result;
    var count = 1;

    for (var i = 0; i < CustomServerConfig.length; i++) {
      console.log("这是当前的code", CustomServerConfig[i].code);
      if (!this.leftContent.getChildByName("".concat(CustomServerConfig[i].code))) continue;
      this.leftContent.getChildByName("".concat(CustomServerConfig[i].code)).active = true;
      this.leftContent.getChildByName("".concat(CustomServerConfig[i].code)).setSiblingIndex(count);
      count++;
    }

    if (this.bFirstShowKefu && CustomServerConfig.length >= 4) {
      this.leftContent.getChildByName("".concat(CustomServerConfig[3].code)).getComponent(cc.Toggle).check();
      this.onClick("".concat(CustomServerConfig[3].code));
    } else {
      this.leftContent.getChildByName("".concat(CustomServerConfig[0].code)).getComponent(cc.Toggle).check();
      this.onClick("".concat(CustomServerConfig[0].code));
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.click_close();
        break;

      case "question":
        this.click_question();
        break;

      case "exclusive":
        this.click_exclusiveService();
        break;

      case "third":
        this.click_onLineSevrice();
        break;

      case "btn_saveCode":
        this.saveBigQRcodeSprite();
        break;

      case "phone":
        this.click_phone();
        break;

      case "code_bg":
        this.code_bg.active = false;
        break;

      case "btn_cpid":
        glGame.platform.copyToClip("" + glGame.user.get("logicID"), "");
        break;
      //default: console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  click_phone: function click_phone() {
    this.showPanel('phone');
  },
  click_question: function click_question() {
    this.showPanel('Question');
  },
  // 专享客服
  click_exclusiveService: function click_exclusiveService() {
    this.showPanel('exclusive');
  },
  click_onLineSevrice: function click_onLineSevrice() {
    this.showPanel('web');
  },
  hideOtherPanel: function hideOtherPanel() {
    if (this.QuestionPanel) {
      this.QuestionPanel.active = false;
    }

    if (this.webPanel) {
      this.webPanel.active = false;
    }

    if (this.phonePanel) {
      this.phonePanel.active = false;
    }

    if (this.exclusivePanel) {
      this.exclusivePanel.active = false;
    }
  },
  showPanel: function showPanel(panelName) {
    this.hideOtherPanel();

    if (this[panelName + "Panel"]) {
      this[panelName + "Panel"].active = true;
      return;
    }

    if (panelName == 'web') {
      this.webPanel = cc.instantiate(this.node_webOnline);
      this.webPanel.active = true;
      this.webPanel.parent = this.node_detail;
      this.webPanel.getComponent("cc.WebView").url = this.thirdUrl;
      console.log(this.webPanel);
    } else {
      this[panelName + "Panel"] = glGame.panel.showChildPanel(this["prefab_".concat(panelName)], this.node_detail);
      this[panelName + "Panel"].active = true;
      var script = this[panelName + "Panel"].getComponent(this[panelName + "Panel"].name);
      script.customData();
    }
  },
  customServer: function customServer(bRefresh) {
    this.severice = glGame.user.get("customSever");
    if (this.severice.third) this.thirdUrl = this.severice.third.url;
    if (bRefresh) this.showUI();
  },
  //保持二维码
  saveBigQRcodeSprite: function saveBigQRcodeSprite() {
    glGame.screenshot.captureScreenshot('shareCode', this.node_QRcode);
  },
  initCode: function initCode(msg) {
    this.code_bg.active = true;
    this.node_head.active = true;
    console.log('dddddd', msg);
    glGame.panel.showRemoteImage(this.node_head, msg.url);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
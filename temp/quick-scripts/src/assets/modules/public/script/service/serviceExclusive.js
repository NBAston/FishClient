"use strict";
cc._RF.push(module, '1705dDvbrRKS6iidgaYoRtF', 'serviceExclusive');
// modules/public/script/service/serviceExclusive.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_item: cc.Node,
    node_content: cc.Node,
    node_copyid: cc.Node,
    label_copyid: cc.Label,
    scrollView: cc.ScrollView
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.isShop = false;
    this.node.active = false; // this.node_copyid.active = !glGame.user.isTourist();
    // if (this.node_copyid.active) this.label_copyid.string = "" + glGame.user.get("logicID");

    this.label_copyid.string = "" + glGame.user.get("logicID");
  },
  refPayData: function refPayData() {
    this.node.active = true;
    glGame.user.reqCustomServer(1, 1, true);
  },
  registerEvent: function registerEvent() {
    // 监听scrollView的滚动事件
    this.scrollView.node.on("scroll-to-left", this.scrollLeftCb, this);
    this.scrollView.node.on("scroll-to-right", this.scrollRigthCb, this);
    glGame.emitter.on("updateCustomServer", this.customData, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateCustomServer", this);
  },
  scrollLeftCb: function scrollLeftCb(scrollView) {
    // cc.log("**********************************触摸到Left，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_r").active = true;
  },
  scrollRigthCb: function scrollRigthCb(scrollView) {
    // 回调的参数是 ScrollView 组件
    // do whatever you want with scrollview
    // cc.log("**********************************触摸到Rigth，反弹函数");
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;
    this.node.getChildByName("jiantou_l").active = true;
  },
  onClick: function onClick(name, node) {
    for (var i = 0; i < this.ExclusiveInfoList.length; i++) {
      if (name == "jump".concat(i)) {
        var Url = this.ExclusiveInfoList[i].url;
        glGame.platform.openURL(Url); //cc.sys.openURL(Url)
      }

      if (name == "copy".concat(i)) {
        var enumber = this.ExclusiveInfoList[i].contact;
        glGame.platform.copyToClip(enumber, '');
      }
    }

    switch (name) {
      case "btn_cpid":
        glGame.platform.copyToClip("" + glGame.user.get("logicID"), "");
        break;

      case "jiantou_l":
      case "jiantou_r":
        console.log("点击了按钮");
        this.executionScrollTo(name);
        break;

      default:
        break;
    }
  },
  executionScrollTo: function executionScrollTo(name) {
    this.node.getChildByName("jiantou_l").active = false;
    this.node.getChildByName("jiantou_r").active = false;

    if (name == "jiantou_l") {
      this.node.getChildByName("jiantou_r").active = true;
      this.scrollView.scrollToLeft(0.1);
    } else {
      this.node.getChildByName("jiantou_l").active = true;
      this.scrollView.scrollToRight(0.1);
    }
  },
  customData: function customData() {
    this.severice = glGame.user.get("customSever");
    this.initExclusiveInfo();
  },
  initExclusiveInfo: function initExclusiveInfo() {
    if (this.severice.page > 1) return;
    this.ExclusiveInfoList = this.isShop ? this.serviceData : this.severice.exclusive;
    if (!this.ExclusiveInfoList) return;
    var m_width = this.ExclusiveInfoList.length * this.node_item.width + (this.ExclusiveInfoList.length - 1) * 97 + 180 > this.scrollView.node.width;

    if (this.ExclusiveInfoList.length > 0 && m_width) {
      this.node.getChildByName("jiantou_r").active = true;
    }

    for (var i = 0; i < this.ExclusiveInfoList.length; i++) {
      var item = cc.instantiate(this.node_item);
      item.parent = this.node_content;
      if (this.ExclusiveInfoList[i].avatar) glGame.panel.showRemoteImage(item.getChildByName('mask').getChildByName('head'), this.ExclusiveInfoList[i].avatar); //if (this.ExclusiveInfoList[i].avatar) glGame.panel.showRemoteImage(item.getChildByName('img_qrcode'), this.ExclusiveInfoList[i].qrCodeUrl);

      item.getChildByName('img_qqkefutubiao').active = this.ExclusiveInfoList[i].contactType == 2;
      item.getChildByName('img_wechatkefutubiao').active = this.ExclusiveInfoList[i].contactType == 1;
      item.getChildByName('name').getComponent(cc.Label).string = this.ExclusiveInfoList[i].name;
      var haoma = this.ExclusiveInfoList[i].contact.length > 11 ? this.ExclusiveInfoList[i].contact.substring(this.ExclusiveInfoList[i].contact.length - 9) : this.ExclusiveInfoList[i].contact;
      item.getChildByName('haoma').getComponent(cc.Label).string = haoma;
      item.getChildByName('jumpto').name = "jump".concat(i);
      item.getChildByName('copy').name = "copy".concat(i);
      item.active = true;
    }
  },
  start: function start() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
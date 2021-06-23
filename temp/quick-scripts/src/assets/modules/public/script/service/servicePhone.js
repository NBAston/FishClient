"use strict";
cc._RF.push(module, 'a0879BQkMdJw6uHBxXlBzCD', 'servicePhone');
// modules/public/script/service/servicePhone.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_bg: cc.Node,
    phoneItem: cc.Node,
    phoneParent: cc.Node
  },
  onLoad: function onLoad() {
    this.CustomServerPhone = null;
    this.registerEvent();
    glGame.user.ReqCustomServerPhone();
  },
  refPayData: function refPayData() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateCustomServerPhone", this.updateCustomServerPhone, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateCustomServerPhone", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_nowCall":
        this.callPhoneNum();
        break;
    }
  },
  callPhoneNum: function callPhoneNum() {
    if (!this.CustomServerPhone) return;

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.phone));
    } else if (cc.sys.os === cc.sys.OS_IOS) {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.dialCode + this.CustomServerPhone.phone));
    } else {
      cc.sys.openURL("tel://".concat(this.CustomServerPhone.phone));
    }
  },
  customData: function customData() {},
  updateCustomServerPhone: function updateCustomServerPhone(data) {
    this.CustomServerPhone = data;
    glGame.panel.showRemoteImage(this.node_bg, this.CustomServerPhone.imgUrl); // this.node_bg.position = cc.v2(0,0); 

    var phoneNumber = this.CustomServerPhone.phone;
    this.phoneParent.getComponent(cc.Label).string = phoneNumber;
    console.log("这是获取客服电话", this.CustomServerPhone);
  },
  start: function start() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
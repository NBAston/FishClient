"use strict";
cc._RF.push(module, '7dabdbRp9hGQ67ll8pL5mV4', 'gameprotocol');
// modules/public/script/account/gameprotocol.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content_str: cc.RichText
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.initUI();
  },
  start: function start() {},
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  initUI: function initUI() {
    this.content_str.string = glGame.gamecfg.TERMSOFSERVICES;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      default:
        break;
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

});

cc._RF.pop();
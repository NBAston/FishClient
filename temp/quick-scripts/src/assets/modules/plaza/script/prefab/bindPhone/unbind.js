"use strict";
cc._RF.push(module, '47695rj25FGXKtHeivZBhVO', 'unbind');
// modules/plaza/script/prefab/bindPhone/unbind.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.registerEvent();
  },
  start: function start() {},
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.close();
        break;

      case "btn_unbindSure":
        this.unbindSure_cb();
        break;

      default:
        break;
    }
  },
  //无法更改手机
  unbindSure_cb: function unbindSure_cb() {
    this.close();
    glGame.panel.showService();
  },
  close: function close() {
    this.remove();
  }
});

cc._RF.pop();
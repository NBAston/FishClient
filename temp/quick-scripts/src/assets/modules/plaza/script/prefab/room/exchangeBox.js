"use strict";
cc._RF.push(module, '1694bkqjB1ANpvAh9dLfXcr', 'exchangeBox');
// modules/plaza/script/prefab/room/exchangeBox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        break;

      case "btn_confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },

  /**
   * @param content 提示内容
   * @param next 确定回调
   */
  showMsg: function showMsg(content, next) {
    this.confirm = next || function () {};

    this.richText_content.string = content;
  }
});

cc._RF.pop();
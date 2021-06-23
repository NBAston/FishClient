"use strict";
cc._RF.push(module, '8a743VN0axGj6cvBzc+Ir2I', 'servicebox');
// modules/public/script/msgbox/servicebox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_content: cc.Label,
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.confirm = null;
    this.cancel = null;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        break;

      case "confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },

  /**
   * @param content   提示内容
   * @param next      确定回调
   * @param center    水平对齐
   */
  showMsg: function showMsg(content, next) {
    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    this.confirm = next || function () {
      glGame.panel.showService(true);
    };

    if (~content.indexOf("<color=")) {
      this.lab_content.node.active = false;
      this.richText_content.node.active = true;
      this.richText_content.string = content;
    } else {
      this.lab_content.string = content;
    }

    this.lab_content._forceUpdateRenderData();

    if (this.lab_content.node.height > 120) {
      this.lab_content.horizontalAlign = 0;
    }

    if (center) {
      this.lab_content.horizontalAlign = 1;
    }
  }
});

cc._RF.pop();
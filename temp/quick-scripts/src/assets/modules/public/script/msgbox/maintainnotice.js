"use strict";
cc._RF.push(module, 'afe6flvN1NBY5dOW9ji23jb', 'maintainnotice');
// modules/public/script/msgbox/maintainnotice.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  onClick: function onClick(name, node) {
    console.log("这是当前按键的按钮名字", name);

    switch (name) {
      case "btn_exit":
        cc.game.end();
        break;

      case "btn_sever":
        this.serviceUrl = glGame.user.get('url').serviceOuter;
        cc.sys.openURL(this.serviceUrl);
        break;
    }
  },
  setContent: function setContent(content) {
    this.content.string = content;
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
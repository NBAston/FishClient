"use strict";
cc._RF.push(module, 'ba5f4aVzxZMKIt3wnG8SrRL', 'labeltip');
// modules/public/script/msgbox/labeltip.js

"use strict";

var ACTTYPE = {
  STILL: 1,
  FLUTTER: 2
}; //1飘动2静止

glGame.baseclass.extend({
  properties: {
    content: cc.Label,
    bg_node: cc.Node
  },
  onLoad: function onLoad() {
    this.node.scale = glGame.systemclass.convertInterface();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "mask":
        this.remove();
        break;

      default:
        break;
    }
  },
  showTip: function showTip(content, showtype, _time) {
    var time = _time;
    this.content.string = content;
    this.content.node.color = new cc.Color(0xdd, 0xf5, 0xff);
    this.node.getChildByName("tip").active = true;

    if (showtype == ACTTYPE.STILL) {
      this.node.runAction(cc.sequence(cc.delayTime(time), cc.removeSelf()));
    } else {
      this.content.node.y = this.bg_node.y = this.node.height / 4;
      console.log("这是当前的高度", this.node.height);
      this.node.getChildByName("mask").active = false;
      this.node.opacity = 0;
      this.node.runAction(cc.sequence(cc.fadeTo(0.2, 255), cc.delayTime(time), cc.spawn(cc.moveBy(0.2, 0, 80), cc.fadeTo(0.2, 0)), cc.removeSelf()));
    } // this.content._forceUpdateRenderData();
    // this.setWidth();

  },
  changeBgWidth: function changeBgWidth() {
    this.scheduleOnce(this.setWidth.bind(this), 0);
  },
  setWidth: function setWidth() {
    if (this.bg_node.width < this.content.node.width + 320) this.bg_node.width = this.content.node.width + 320;
  },
  showErrorTip: function showErrorTip(content, next) {
    this.content.string = content;

    this.content._forceUpdateRenderData();

    this.setWidth();
    this.content.node.color = new cc.Color(0xf4, 0x4d, 0x4d);
    this.node.getChildByName("tip").active = true;
    this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      if (next) next();
    }), cc.removeSelf()));
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
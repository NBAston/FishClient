"use strict";
cc._RF.push(module, '46bc2EXSHFHp6ovDq96wS0o', 'scalecommission');
// modules/plaza/script/prefab/popularize/scalecommission.js

"use strict";

glGame.baseclass.extend({
  properties: {
    achievementStr: cc.Label,
    nextStr: cc.Label,
    rebaterate: cc.Node,
    rebate_item: cc.Node
  },
  onLoad: function onLoad() {
    this.ruleDetaildata = null;
    this.index = 0;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;
    }
  },
  initUI: function initUI(data, achievement) {
    this.ruleDetaildata = data;
    this.achievementStr.string = this.getFloat(achievement);
    var count = this.ruleDetaildata.length;

    if (achievement >= this.ruleDetaildata[count - 1].exp) {
      this.nextStr.string = 0;
      this.index = count - 1;
    } else {
      for (var i = 0; i < count; i++) {
        if (this.ruleDetaildata[i].exp > achievement) {
          this.nextStr.string = this.getFloat(this.ruleDetaildata[i].exp - achievement);
          this.index = i - 1;
          break;
        }
      }
    }

    for (var _i = 0; _i < this.ruleDetaildata.length; _i++) {
      var rebateItem = cc.instantiate(this.rebate_item);
      rebateItem.parent = this.rebaterate;
      rebateItem.active = false;
      rebateItem.getChildByName("bg").active = _i % 2 == 1;

      if (this.index == _i) {
        rebateItem.getChildByName("bg").active = false;
        rebateItem.getChildByName("img_picxz").active = true;
      }

      rebateItem.getChildByName("level").getComponent(cc.Label).string = this.ruleDetaildata[_i].level;
      var strText = "";

      if (this.ruleDetaildata[_i + 1]) {
        strText = "<color=#f4c404>".concat(this.getExpNumber(this.ruleDetaildata[_i].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i].exp), " - <color=#f4c404>").concat(this.getExpNumber(this.ruleDetaildata[_i + 1].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i + 1].exp));
      } else {
        strText = "<color=#f4c404>".concat(this.getExpNumber(this.ruleDetaildata[_i].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i].exp), "\u4EE5\u4E0A");
      }

      rebateItem.getChildByName("money").getComponent(cc.RichText).string = strText;
      rebateItem.getChildByName("rete").getComponent(cc.RichText).string = "\u6BCF\u4E07\u8FD4\u4F63<color=#f4c404>".concat(this.getFloat(this.ruleDetaildata[_i].reward), "</color>\u5143");
    }

    glGame.panel.showEffectNode(this, this.rebaterate, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  getExpNumber: function getExpNumber(num) {
    return num >= 1000000 ? "".concat(Number(num).div(1000000)) : "".concat(Number(num).div(100));
  },
  getExpText: function getExpText(num) {
    return num >= 1000000 ? "\u4E07" : "";
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
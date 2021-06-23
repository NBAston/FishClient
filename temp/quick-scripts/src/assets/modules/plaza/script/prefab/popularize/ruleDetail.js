"use strict";
cc._RF.push(module, 'e7fb92VBt5EBpy/07lrH3I3', 'ruleDetail');
// modules/plaza/script/prefab/popularize/ruleDetail.js

"use strict";

glGame.baseclass.extend({
  properties: {
    scalecommission: cc.Prefab
  },
  onLoad: function onLoad() {
    this.pandectdata = null;
    this.ruleDetaildata = null;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_brokerage":
        this.brokerage();
        break;

      default:
        break;
    }
  },
  initUI: function initUI(pandectdata, ruleDetaildata) {
    this.pandectdata = pandectdata;
    this.ruleDetaildata = ruleDetaildata;
  },
  brokerage: function brokerage() {
    var scalecommission = glGame.panel.showChildPanel(this.scalecommission, this.node.parent.parent);
    var script = scalecommission.getComponent("scalecommission");
    script.initUI(this.ruleDetaildata, this.pandectdata.data.achievement);
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
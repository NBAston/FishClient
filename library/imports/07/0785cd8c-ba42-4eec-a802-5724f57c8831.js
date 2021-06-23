"use strict";
cc._RF.push(module, '0785c2MukJO7KgCVyT1fIgx', 'backWater');
// modules/plaza/script/prefab/backWater/backWater.js

"use strict";

/**
 * 返水信息面板
 * 有效投注*比例 = 返水金额
 * 今日有效投注 = 总的子游戏有效投注之和
 * 今日预计返水 = 总的子游戏返水金额之和
 */
var GAMETYPE = {
  CHESS: 1,
  //棋牌版
  COMPLEX: 2 //综合版

};
glGame.baseclass.extend({
  properties: {
    sonPanel: cc.Node
  },
  onLoad: function onLoad() {
    this.gameDisplayType = glGame.user.get("gameDisplayType");
    this.registerEvent();
    this.showPanel("mywater");
    glGame.panel.showEffectPariticle(this.node);
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UI.FORBIDDEN_BACKWATER, this.onForbbidden, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UI.FORBIDDEN_BACKWATER, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;

      case "mywater":
      case "rateexplain":
      case "record":
        this.showPanel(name);
        break;

      default:
        break;
    }
  },
  onForbbidden: function onForbbidden() {
    var _this = this;

    glGame.user.rebateSwitchEx = 0;
    glGame.panel.showMsgBox("该功能暂未开放", "该功能暂未开放", function () {
      _this.remove();
    });
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.sonPanel.childrenCount) return;

    for (var i = 0; i < this.sonPanel.childrenCount; i++) {
      this.sonPanel.children[i].active = false;
    }
  },
  //显示某个界面。按名字来显示
  showPanel: function showPanel(panelName) {
    var _this2 = this;

    // this.gameDisplayType = GAMETYPE.CHESS;
    this.hideAllPanel();
    var panellist = {};
    panellist["mywater"] = this.gameDisplayType == GAMETYPE.CHESS ? "mybackWater" : "mybackWater_complex";
    panellist["rateexplain"] = this.gameDisplayType == GAMETYPE.CHESS ? "porpor" : "porpor_complex";
    ;
    panellist["record"] = "waterrecord";

    if (this.sonPanel.getChildByName(panellist[panelName])) {
      this.sonPanel.getChildByName(panellist[panelName]).active = true;
      return;
    }

    glGame.panel.getPanelByName(panellist[panelName]).then(function (panelData) {
      panelData.parent = _this2.sonPanel;
    });
  }
});

cc._RF.pop();
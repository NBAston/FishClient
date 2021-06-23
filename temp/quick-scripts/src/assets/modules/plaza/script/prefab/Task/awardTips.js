"use strict";
cc._RF.push(module, '9cfdabdajtBp4PrNzvGYewh', 'awardTips');
// modules/plaza/script/prefab/Task/awardTips.js

"use strict";

glGame.baseclass.extend({
  properties: {
    title: cc.Label,
    coin: cc.Label,
    score: cc.Label,
    diamond: cc.Label,
    node_coin: cc.Node,
    node_score: cc.Node,
    node_diamond: cc.Node
  },
  onLoad: function onLoad() {
    this.next = null;
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
        this.remove();
        break;

      case "btn_confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },

  /**
   * @param title 标题
   * @param coin  金币数值
   * @param score  积分数值
   * @param activeLevel  活跃数值
   * @param next  回调函数
   */
  showMsg: function showMsg(title, coin, score, diamond, next) {
    this.title.string = title;
    if (coin == null) this.node_coin.active = false;else {
      this.node_coin.active = true;
      this.coin.string = typeof coin != "string" ? coin.toString() : coin;
    }
    if (score == null) this.node_score.active = false;else {
      this.node_score.active = true;
      this.score.string = typeof score != "string" ? score.toString() : score;
    }
    if (diamond == null) this.node_diamond.active = false;else {
      this.node_diamond.active = true;
      this.diamond.string = typeof diamond != "string" ? diamond.toString() : diamond;
    }
    this.next = next;
  },
  //触发回调函数
  confirm: function confirm() {
    if (this.next != null) this.next();
    this.remove();
  }
});

cc._RF.pop();
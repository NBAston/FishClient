"use strict";
cc._RF.push(module, '80a38PLLzFH7JBOgTj47Bin', 'userinfoVipRight');
// modules/plaza/script/prefab/userInfo/userinfoVipRight.js

"use strict";

/**
 * 玩家个人信息界面
 */
glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    item: cc.Node
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;
    }
  },
  // 显示vip权益
  showVipRight: function showVipRight(vipList, type) {
    var grid = this.node.getChildByName("grid");

    if (type == 1) {
      grid.getChildByName("img_title_ljcz").active = true;
    } else {
      grid.getChildByName("img_title_ljdml").active = true;
    }

    this.refreshList(vipList, type);
  },
  // 刷新列表
  refreshList: function refreshList(vipList, type) {
    this.content.destroyAllChildren();

    for (var i = 0; i < vipList.length; i++) {
      var cloneItem = cc.instantiate(this.item);
      cloneItem.getChildByName("bg").active = i % 2 == 0;
      cloneItem.active = false;
      cloneItem.parent = this.content;
      var vipInfo = vipList[i];
      cloneItem.getChildByName("vip").getComponent(cc.Label).string = "VIP".concat(vipInfo.vipName); // vip等级

      cloneItem.getChildByName("all_charge").getComponent(cc.Label).string = type == 1 ? vipInfo.recharge / 100 : vipInfo.betting / 100; // 累计充值/ 打码量

      cloneItem.getChildByName("promo_award").getComponent(cc.Label).string = vipInfo.bonusUpgrade / 100; // 晋级彩金

      cloneItem.getChildByName("week_award").getComponent(cc.Label).string = vipInfo.bonusWeek / 100; // 周礼金

      cloneItem.getChildByName("month_award").getComponent(cc.Label).string = vipInfo.bonusMonth / 100; // 月礼金

      var temp = (Number(vipInfo.balance) / 100 * 365).toFixed(2).toString();
      cloneItem.getChildByName("yuebao").getComponent(cc.Label).string = "".concat(temp, "%"); // 余额宝年化收益率

      cloneItem.getChildByName("return_ratio").getComponent(cc.Label).string = "".concat(this.cutFloat(vipInfo.returnRatio), "%"); // 游戏返水利率

      if (i == vipList.length - 1) {
        cloneItem.getChildByName("frame_horizontal").active = false;
      }
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  //截取小数点后2位
  cutFloat: function cutFloat(value) {
    if (typeof value !== 'string' && typeof value !== 'number') return;
    return (Math.floor(parseFloat(value)) / 100).toFixed(2);
  }
});

cc._RF.pop();
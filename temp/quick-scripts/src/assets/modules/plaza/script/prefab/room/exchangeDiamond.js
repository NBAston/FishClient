"use strict";
cc._RF.push(module, 'ef7ffifK0FCVqGfQoP1Rdan', 'exchangeDiamond');
// modules/plaza/script/prefab/room/exchangeDiamond.js

"use strict";

glGame.baseclass.extend({
  properties: {
    exchangeBox: cc.Prefab,
    labCoin: cc.Label,
    labDiamonds: cc.Label,
    content: cc.Node,
    item: cc.Node,
    iconList: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.diamondList = [];
    this.registerEvent();
    this.updataInfo();
    this.ReqDiamondShop();
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updataInfo, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
  },
  //刷新钻石数量
  updataInfo: function updataInfo() {
    this.labCoin.string = this.getFixNumber(glGame.user.get("coin"));
    this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_shop":
        this.click_shop();
        break;

      case "btn_record":
        this.click_record();
        break;

      default:
        if (name.indexOf("item_") > -1) return this.click_item(name);
        break;
    }
  },
  click_shop: function click_shop() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("recharge")) {
      return;
    }

    glGame.panel.showShop();
  },
  click_record: function click_record() {
    glGame.panel.showPanelByName("diamondRecord");
  },
  click_item: function click_item(name) {
    var _this = this;

    var string = name.substring(5),
        index = Number(string);
    var data = this.diamondList[index];
    var panel = glGame.panel.showPanel(this.exchangeBox);
    var str = '';

    if (data.extraGift > 0) {
      str = "\u4F7F\u7528<color=#f4c404> ".concat(this.getFixNumber(data.coin), " \u91D1\u5E01</color>\u53EF\u5151\u6362<color=#cf62fe> ").concat(this.getFixNumber(data.diamond), " \u94BB\u77F3</color>,\u5E76\u4E14\u83B7\u5F97<color=#cf62fe> ").concat(this.getFixNumber(data.extraGift), " \u94BB\u77F3</color>\u8D60\u793C\uFF0C\u603B\u8BA1<color=#cf62fe> ").concat(this.getFixNumber(data.diamond + data.extraGift), " \u94BB\u77F3</color>\uFF0C\u662F\u5426\u786E\u5B9A\u5151\u6362\uFF1F");
    } else {
      str = "\u4F7F\u7528<color=#f4c404> ".concat(this.getFixNumber(data.coin), " \u91D1\u5E01</color>\u53EF\u5151\u6362<color=#cf62fe> ").concat(this.getFixNumber(data.diamond), " \u94BB\u77F3</color>\uFF0C\u662F\u5426\u786E\u5B9A\u5151\u6362\uFF1F");
    }

    panel.getComponent(panel.name).showMsg(str, function () {
      _this.ReqBuyDiamond(data);
    });
  },
  refreshUi: function refreshUi() {
    this.content.removeAllChildren();

    for (var index in this.diamondList) {
      var data = this.diamondList[index];
      if (!data) continue;
      var diamondItem = cc.instantiate(this.item);
      diamondItem.active = true;
      diamondItem.name = "item_".concat(index);
      diamondItem.getChildByName("img_zuanshidaban").getChildByName("img_icon").getComponent(cc.Sprite).spriteFrame = this.iconList[Math.min(index, this.iconList.length - 1)];
      diamondItem.getChildByName("diamond").getComponent(cc.Label).string = this.getFixNumber(data.diamond) + "钻石";
      diamondItem.getChildByName("coinLayout").getChildByName("coin").getComponent(cc.Label).string = this.getFixNumber(data.coin);
      diamondItem.getChildByName("img_zuanshiredban").active = data.extraGift > 0;
      diamondItem.getChildByName("img_zuanshiredban").getChildByName("extraGift").getComponent(cc.Label).string = "\u989D\u5916\u8D60\u9001".concat(this.getFixNumber(data.extraGift), "\u94BB\u77F3");
      this.content.addChild(diamondItem);
    }
  },
  ReqDiamondShop: function ReqDiamondShop() {
    var _this2 = this;

    glGame.gameNet.send_msg("http.ReqDiamondShop", {}, function (route, msg) {
      _this2.diamondList = msg.result;

      _this2.refreshUi();
    });
  },
  ReqBuyDiamond: function ReqBuyDiamond(data) {
    var _this3 = this;

    if (data.coin > glGame.user.get("coin")) {
      glGame.panel.showTip(glGame.tips.ROOM.GOLDNOTENOUGH);
      return;
    }

    glGame.gameNet.send_msg("http.ReqBuyDiamond", {
      diamondId: data.id,
      diamond: data.diamond,
      coin: data.coin,
      extraGift: data.extraGift
    }, function (route, msg) {
      if (msg.result.diamond > 0) {
        var addDiamond = 0;
        addDiamond = msg.result.diamond - glGame.user.diamond;
        glGame.user.diamond = msg.result.diamond;
        glGame.panel.showAwardBox("成功获得", [{
          type: glGame.awardtype.DIAMOND,
          value: _this3.getFixNumber(addDiamond)
        }]);

        _this3.updataInfo();
      } else glGame.panel.showErrorTip(glGame.tips.ROOM.EXCHANGEFAIL);
    });
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
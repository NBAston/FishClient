"use strict";
cc._RF.push(module, '0f8b5EiG41O15Tg5n9CHDuX', 'rqznnRoomRound');
// modules/plaza/script/prefab/room/record/rqznn/rqznnRoomRound.js

"use strict";

//根据原本的播放的帧动画来设定
var resultCardType = {
  0: {
    //1，没牛
    name: "无牛"
  },
  1: {
    name: "牛丁"
  },
  2: {
    name: "牛二"
  },
  3: {
    name: "牛三"
  },
  4: {
    name: "牛四"
  },
  5: {
    name: "牛五"
  },
  6: {
    name: "牛六"
  },
  7: {
    name: "牛七"
  },
  8: {
    name: "牛八"
  },
  9: {
    name: "牛九"
  },
  10: {
    name: "牛牛"
  },
  //顺子牛
  12: {
    name: "顺子牛"
  },
  //同花牛
  13: {
    name: "同花牛"
  },
  //葫芦牛
  14: {
    name: "葫芦牛"
  },
  //炸弹牛
  15: {
    name: "炸弹牛"
  },
  //五花牛
  17: {
    name: "五花牛"
  },
  //五小牛
  18: {
    name: "五小牛"
  }
};
glGame.baseclass.extend({
  properties: {
    gameData: cc.Node,
    gameContent: cc.Node,
    gameItem: cc.Node,
    atlas_poker: cc.SpriteAtlas //卡牌图集

  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  registerEvent: function registerEvent() {},
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_return":
        glGame.emitter.emit("openGameRecord");
        break;

      default:
        break;
    }
  },
  initData: function initData(data, list) {
    this.initRoomData(data, list);
    this.initRecordUI(data, list);
  },
  initRoomData: function initRoomData(data, list) {
    this.gameData.getChildByName("number").getComponent(cc.Label).string = data.summaryId;
    this.gameData.getChildByName("roundnum").getComponent(cc.Label).string = list.handNumber;
    this.gameData.getChildByName("game").getComponent(cc.Label).string = data.gameName;
    this.gameData.getChildByName("round").getComponent(cc.Label).string = data.totalRound;
    this.gameData.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.score);
    this.gameData.getChildByName("score").color = data.score > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
  },
  //渲染牌局记录
  initRecordUI: function initRecordUI(rdata, list) {
    this.gameContent.removeAllChildren();
    var userData = list.detail;

    if (userData.length == 0) {
      return;
    }

    for (var i = 0; i < userData.length; i++) {
      var node = cc.instantiate(this.gameItem); // node.getChildByName("bg").active = i % 2 != 0;

      node.parent = this.gameContent;
      node.active = true;
      var data = userData[i];
      node.getChildByName("name").getComponent(cc.Label).string = data.nickname;
      node.getChildByName("img_fangzhu").active = rdata.masterUid == data.uid;
      node.getChildByName("id").getComponent(cc.Label).string = data.logicId;
      node.getChildByName("img_wu").active = Number(data.uid) == glGame.user.get("userID");
      var node_card = node.getChildByName("poker");

      for (var j = 0; j < data.cards.length; j++) {
        var cardName = "bull1_".concat(this.getSixValue(data.cards[j]));
        node_card.getChildByName(String(j)).getComponent(cc.Sprite).spriteFrame = this.atlas_poker._spriteFrames[cardName];
      }

      node.getChildByName("type").getComponent(cc.Label).string = "".concat(resultCardType[data.cardType].name, "-").concat(data.cardRate, "\u500D");
      node.getChildByName("bet").getComponent(cc.Label).string = data.isBanker ? "\u62A2".concat(data.dealerTimes, "\u500D") : "\u4E0B".concat(data.multiple, "\u500D");
      node.getChildByName("bet").color = data.isBanker ? cc.color(0xf6, 0xd0, 0x1e) : cc.color(0x46, 0xbf, 0xff);
      node.getChildByName("win").getComponent(cc.Label).string = data.scoreOffset > 0 ? '赢' : '输';
      node.getChildByName("win").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
      node.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.scoreOffset);
      node.getChildByName("score").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
    }
  },
  //获取牌的16进制值
  getSixValue: function getSixValue(logicNum) {
    logicNum = parseInt(logicNum);
    var str = logicNum < 14 ? "0x0" : "0x";
    return str + logicNum.toString(16);
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
  }
});

cc._RF.pop();
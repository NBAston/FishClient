
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/room/record/rqznn/rqznnRoomRound.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxyb29tXFxyZWNvcmRcXHJxem5uXFxycXpublJvb21Sb3VuZC5qcyJdLCJuYW1lcyI6WyJyZXN1bHRDYXJkVHlwZSIsIm5hbWUiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZ2FtZURhdGEiLCJjYyIsIk5vZGUiLCJnYW1lQ29udGVudCIsImdhbWVJdGVtIiwiYXRsYXNfcG9rZXIiLCJTcHJpdGVBdGxhcyIsIm9uTG9hZCIsInJlZ2lzdGVyRXZlbnQiLCJ1blJlZ2lzdGVyRXZlbnQiLCJPbkRlc3Ryb3kiLCJvbkNsaWNrIiwibm9kZSIsImVtaXR0ZXIiLCJlbWl0IiwiaW5pdERhdGEiLCJkYXRhIiwibGlzdCIsImluaXRSb29tRGF0YSIsImluaXRSZWNvcmRVSSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJzdW1tYXJ5SWQiLCJoYW5kTnVtYmVyIiwiZ2FtZU5hbWUiLCJ0b3RhbFJvdW5kIiwiZ2V0Rml4TnVtYmVyIiwic2NvcmUiLCJjb2xvciIsInJkYXRhIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJ1c2VyRGF0YSIsImRldGFpbCIsImxlbmd0aCIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImFjdGl2ZSIsIm5pY2tuYW1lIiwibWFzdGVyVWlkIiwidWlkIiwibG9naWNJZCIsIk51bWJlciIsInVzZXIiLCJnZXQiLCJub2RlX2NhcmQiLCJqIiwiY2FyZHMiLCJjYXJkTmFtZSIsImdldFNpeFZhbHVlIiwiU3RyaW5nIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJfc3ByaXRlRnJhbWVzIiwiY2FyZFR5cGUiLCJjYXJkUmF0ZSIsImlzQmFua2VyIiwiZGVhbGVyVGltZXMiLCJtdWx0aXBsZSIsInNjb3JlT2Zmc2V0IiwibG9naWNOdW0iLCJwYXJzZUludCIsInN0ciIsInRvU3RyaW5nIiwidmFsdWUi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QUdGLFFBQVEsQ0FBQ0csUUFBVCxDQUFrQixFQUFsQixDQUFiO0FBQ0gsR0FuRm1CO0FBc0ZwQnJDLEVBQUFBLFlBdEZvQix3QkFzRlBzQyxLQXRGTyxFQXNGQTtBQUNoQixRQUFJQyxNQUFNLEdBQUd2QixNQUFNLENBQUNzQixLQUFELENBQU4sQ0FBY0UsR0FBZCxDQUFrQixFQUFsQixDQUFiO0FBQ0FGLElBQUFBLEtBQUssR0FBR3RCLE1BQU0sQ0FBQ3NCLEtBQUQsQ0FBTixDQUFjRSxHQUFkLENBQWtCLEdBQWxCLENBQVI7QUFDQSxRQUFJQyxLQUFLLENBQUNILEtBQUQsQ0FBVCxFQUFrQjs7QUFDbEIsUUFBSSxDQUFDLENBQUNBLEtBQUYsS0FBWUEsS0FBaEIsRUFBdUI7QUFDbkIsYUFBT0EsS0FBSyxDQUFDRCxRQUFOLEVBQVA7QUFDSCxLQUZELE1BRU8sSUFBSSxDQUFDLENBQUNFLE1BQUYsS0FBYUEsTUFBakIsRUFBeUI7QUFDNUIsYUFBT0QsS0FBSyxDQUFDSSxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0gsS0FGTSxNQUVBO0FBQ0gsYUFBT0osS0FBSyxDQUFDSSxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0g7QUFDSjtBQWpHbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5qC55o2u5Y6f5pys55qE5pKt5pS+55qE5bin5Yqo55S75p2l6K6+5a6aXHJcbmNvbnN0IHJlc3VsdENhcmRUeXBlID0ge1xyXG4gICAgMDoge1xyXG4gICAgICAgIC8vMe+8jOayoeeJm1xyXG4gICAgICAgIG5hbWU6IFwi5peg54mbXCIsXHJcbiAgICB9LFxyXG4gICAgMToge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LiBXCIsXHJcbiAgICB9LFxyXG4gICAgMjoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LqMXCIsXHJcbiAgICB9LFxyXG4gICAgMzoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LiJXCIsXHJcbiAgICB9LFxyXG4gICAgNDoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5ZubXCIsXHJcbiAgICB9LFxyXG4gICAgNToge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LqUXCIsXHJcbiAgICB9LFxyXG4gICAgNjoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5YWtXCIsXHJcbiAgICB9LFxyXG4gICAgNzoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LiDXCIsXHJcbiAgICB9LFxyXG4gICAgODoge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5YWrXCIsXHJcbiAgICB9LFxyXG4gICAgOToge1xyXG4gICAgICAgIG5hbWU6IFwi54mb5LmdXCIsXHJcbiAgICB9LFxyXG4gICAgMTA6IHtcclxuICAgICAgICBuYW1lOiBcIueJm+eJm1wiLFxyXG4gICAgfSxcclxuICAgIC8v6aG65a2Q54mbXHJcbiAgICAxMjoge1xyXG4gICAgICAgIG5hbWU6IFwi6aG65a2Q54mbXCIsXHJcbiAgICB9LFxyXG4gICAgLy/lkIzoirHniZtcclxuICAgIDEzOiB7XHJcbiAgICAgICAgbmFtZTogXCLlkIzoirHniZtcIixcclxuICAgIH0sXHJcbiAgICAvL+iRq+iKpueJm1xyXG4gICAgMTQ6IHtcclxuICAgICAgICBuYW1lOiBcIuiRq+iKpueJm1wiLFxyXG4gICAgfSxcclxuICAgIC8v54K45by554mbXHJcbiAgICAxNToge1xyXG4gICAgICAgIG5hbWU6IFwi54K45by554mbXCIsXHJcbiAgICB9LFxyXG4gICAgLy/kupToirHniZtcclxuICAgIDE3OiB7XHJcbiAgICAgICAgbmFtZTogXCLkupToirHniZtcIixcclxuICAgIH0sXHJcbiAgICAvL+S6lOWwj+eJm1xyXG4gICAgMTg6IHtcclxuICAgICAgICBuYW1lOiBcIuS6lOWwj+eJm1wiLFxyXG4gICAgfSxcclxufVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWVEYXRhOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdhbWVDb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIGdhbWVJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGF0bGFzX3Bva2VyOiBjYy5TcHJpdGVBdGxhcywgICAgLy/ljaHniYzlm77pm4ZcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICB9LFxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmV0dXJuXCI6IGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJvcGVuR2FtZVJlY29yZFwiKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdERhdGEoZGF0YSwgbGlzdCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFJvb21EYXRhKGRhdGEsIGxpc3QpO1xyXG4gICAgICAgIHRoaXMuaW5pdFJlY29yZFVJKGRhdGEsIGxpc3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0Um9vbURhdGEoZGF0YSwgbGlzdCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEuZ2V0Q2hpbGRCeU5hbWUoXCJudW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLnN1bW1hcnlJZDtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhLmdldENoaWxkQnlOYW1lKFwicm91bmRudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsaXN0LmhhbmROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YS5nZXRDaGlsZEJ5TmFtZShcImdhbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmdhbWVOYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEuZ2V0Q2hpbGRCeU5hbWUoXCJyb3VuZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEudG90YWxSb3VuZDtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhLmdldENoaWxkQnlOYW1lKFwic2NvcmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZpeE51bWJlcihkYXRhLnNjb3JlKTtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhLmdldENoaWxkQnlOYW1lKFwic2NvcmVcIikuY29sb3IgPSBkYXRhLnNjb3JlID4gMCA/IGNjLmNvbG9yKDB4NDgsIDB4ZDQsIDB4YTgpIDogY2MuY29sb3IoMHhmNiwgMHg4ZSwgMHgxZSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+a4suafk+eJjOWxgOiusOW9lVxyXG4gICAgaW5pdFJlY29yZFVJKHJkYXRhLCBsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IGxpc3QuZGV0YWlsO1xyXG4gICAgICAgIGlmICh1c2VyRGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXNlckRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdhbWVJdGVtKTtcclxuICAgICAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyICE9IDA7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5nYW1lQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVzZXJEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2Zhbmd6aHVcIikuYWN0aXZlID0gcmRhdGEubWFzdGVyVWlkID09IGRhdGEudWlkO1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwiaWRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmxvZ2ljSWQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3VcIikuYWN0aXZlID0gTnVtYmVyKGRhdGEudWlkKSA9PSBnbEdhbWUudXNlci5nZXQoXCJ1c2VySURcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbm9kZV9jYXJkID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcInBva2VyXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEuY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXJkTmFtZSA9IGBidWxsMV8ke3RoaXMuZ2V0U2l4VmFsdWUoZGF0YS5jYXJkc1tqXSl9YDtcclxuICAgICAgICAgICAgICAgIG5vZGVfY2FyZC5nZXRDaGlsZEJ5TmFtZShTdHJpbmcoaikpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc19wb2tlci5fc3ByaXRlRnJhbWVzW2NhcmROYW1lXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcInR5cGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHtyZXN1bHRDYXJkVHlwZVtkYXRhLmNhcmRUeXBlXS5uYW1lfS0ke2RhdGEuY2FyZFJhdGV95YCNYDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEuaXNCYW5rZXIgPyBg5oqiJHtkYXRhLmRlYWxlclRpbWVzfeWAjWAgOiBg5LiLJHtkYXRhLm11bHRpcGxlfeWAjWA7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuY29sb3IgPSBkYXRhLmlzQmFua2VyID8gY2MuY29sb3IoMHhmNiwgMHhkMCwgMHgxZSkgOiBjYy5jb2xvcigweDQ2LCAweGJmLCAweGZmKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEuc2NvcmVPZmZzZXQgPiAwID8gJ+i1oicgOiAn6L6TJztcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpblwiKS5jb2xvciA9IGRhdGEuc2NvcmVPZmZzZXQgPiAwID8gY2MuY29sb3IoMHg0OCwgMHhkNCwgMHhhOCkgOiBjYy5jb2xvcigweGY2LCAweDhlLCAweDFlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjb3JlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGaXhOdW1iZXIoZGF0YS5zY29yZU9mZnNldCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY29yZVwiKS5jb2xvciA9IGRhdGEuc2NvcmVPZmZzZXQgPiAwID8gY2MuY29sb3IoMHg0OCwgMHhkNCwgMHhhOCkgOiBjYy5jb2xvcigweGY2LCAweDhlLCAweDFlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W54mM55qEMTbov5vliLblgLxcclxuICAgIGdldFNpeFZhbHVlKGxvZ2ljTnVtKSB7XHJcbiAgICAgICAgbG9naWNOdW0gPSBwYXJzZUludChsb2dpY051bSk7XHJcbiAgICAgICAgbGV0IHN0ciA9IGxvZ2ljTnVtIDwgMTQgPyBcIjB4MFwiIDogXCIweFwiO1xyXG4gICAgICAgIHJldHVybiBzdHIgKyBsb2dpY051bS50b1N0cmluZygxNik7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG4gICAgZ2V0Rml4TnVtYmVyKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlMSA9IE51bWJlcih2YWx1ZSkuZGl2KDEwKTtcclxuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSkuZGl2KDEwMCk7XHJcbiAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh+fnZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKH5+dmFsdWUxID09PSB2YWx1ZTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=
"use strict";
cc._RF.push(module, 'f60b4rexn1JL6xcGWeaXeKC', 'taskcfg');
// modules/plaza/script/prefab/Task/taskcfg.js

"use strict";

module.exports = {
  MISSION_TYPE_GAME: {
    LOGIN: 1,
    //'登录游戏'
    SHARE: 2,
    //'分享游戏'
    RECHARGE_SINGLE: 3,
    //'单笔充值',
    RECHARGE_TOTAL: 4,
    //'累计充值',
    PARTICIPATE_GAME_NUM: 5,
    //'参与游戏局数',
    TOTAL_WIN_NUM: 6,
    //'累计胜利局数',
    BET_SINGLE: 7,
    //'单局打码量',
    BET_TOTAL: 8,
    //'累计打码量',
    STREAK_NUM: 9,
    //'连胜局数',
    WIN_MONEY_SINGLE: 10,
    //'单局赢钱',
    WIN_MONEY_TOTAL: 11,
    //'累计赢钱',
    BANKER_SIT_NUM: 12 //'坐庄',

  },
  MISSION_GAME_LIST_TWO: {
    0: '任意游戏',
    15: '炸金花',
    18: '抢庄牛牛',
    22: '百人牛牛',
    27: '三公',
    28: '红黑',
    29: '水果机',
    30: '龙虎斗',
    31: '拉霸777',
    32: '百家乐',
    33: '牌九',
    34: '轮盘',
    35: '德州扑克',
    36: '斗地主',
    37: '极速炸金花',
    38: '21点',
    39: '二八杠',
    40: '捕鱼',
    41: '抢红包接龙',
    42: '十三水',
    43: '豪车漂移',
    44: '森林舞会',
    46: '看牌抢庄',
    47: '骰宝',
    48: '红包扫雷'
  },
  MISSION_GAME_LIST_ONE: {
    0: '任意游戏(除捕鱼外)',
    15: '炸金花',
    18: '抢庄牛牛',
    22: '百人牛牛',
    27: '三公',
    28: '红黑',
    29: '水果机',
    30: '龙虎斗',
    31: '拉霸777',
    32: '百家乐',
    33: '牌九',
    34: '轮盘',
    35: '德州扑克',
    36: '斗地主',
    37: '极速炸金花',
    38: '21点',
    39: '二八杠',
    40: '捕鱼',
    41: '抢红包接龙',
    42: '十三水',
    43: '豪车漂移',
    44: '森林舞会',
    46: '看牌抢庄',
    47: '骰宝',
    48: '红包扫雷'
  },
  GAME_ROOMS_TYPE_DESC: {
    1: "初级房",
    2: "中级房",
    3: "高级房",
    4: "贵宾房",
    5: "富豪房"
  },
  //设置任务描述
  getDescribe: function getDescribe(data) {
    var desc = data.desc;

    if (data.missionType < 5) {
      switch (data.missionType) {
        case this.MISSION_TYPE_GAME.LOGIN:
          return desc.replace(/startTime/, "".concat(data.descSource.startTime)).replace(/endTime/, "".concat(data.descSource.endTime));

        case this.MISSION_TYPE_GAME.SHARE:
          return desc;

        case this.MISSION_TYPE_GAME.RECHARGE_SINGLE:
          return desc.replace(/number/, "".concat(data.descSource.number)).replace(/rechargeAmount/, "".concat(this.getFloat(Number(data.descSource.rechargeAmount))));

        case this.MISSION_TYPE_GAME.RECHARGE_TOTAL:
          return desc.replace(/rechargeAmount/, "".concat(this.getFloat(Number(data.descSource.rechargeAmount))));
      }
    } else {
      var gameName, number, otherConditionValue, bet, winMoney;

      switch (data.missionType) {
        case this.MISSION_TYPE_GAME.PARTICIPATE_GAME_NUM:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          number = gameName.replace(/number/, "".concat(data.descSource.number));
          otherConditionValue = number.replace(/otherConditionValue/, "".concat(this.getGameConditionDesc(data.descSource.otherConditions, data.descSource.otherConditionValue, data.descSource.gameId)));
          return otherConditionValue;

        case this.MISSION_TYPE_GAME.TOTAL_WIN_NUM:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          number = gameName.replace(/number/, "".concat(data.descSource.number));
          otherConditionValue = number.replace(/otherConditionValue/, "".concat(this.getGameConditionDesc(data.descSource.otherConditions, data.descSource.otherConditionValue, data.descSource.gameId)));
          return otherConditionValue;

        case this.MISSION_TYPE_GAME.BET_SINGLE:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          bet = gameName.replace(/bet/, "".concat(this.getFloat(Number(data.descSource.bet))));
          number = bet.replace(/number/, "".concat(data.descSource.number));
          return number;

        case this.MISSION_TYPE_GAME.BET_TOTAL:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_TWO[data.descSource.gameId]));
          bet = gameName.replace(/bet/, "".concat(this.getFloat(Number(data.descSource.bet))));
          return bet;

        case this.MISSION_TYPE_GAME.STREAK_NUM:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          number = gameName.replace(/number/, "".concat(data.descSource.number));
          otherConditionValue = number.replace(/otherConditionValue/, "".concat(this.getGameConditionDesc(data.descSource.otherConditions, data.descSource.otherConditionValue, data.descSource.gameId)));
          return otherConditionValue;

        case this.MISSION_TYPE_GAME.WIN_MONEY_SINGLE:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          winMoney = gameName.replace(/winMoney/, "".concat(this.getFloat(Number(data.descSource.winMoney))));
          number = winMoney.replace(/number/, "".concat(data.descSource.number));
          return number;

        case this.MISSION_TYPE_GAME.WIN_MONEY_TOTAL:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_TWO[data.descSource.gameId]));
          winMoney = gameName.replace(/winMoney/, "".concat(this.getFloat(Number(data.descSource.winMoney))));
          return winMoney;

        case this.MISSION_TYPE_GAME.BANKER_SIT_NUM:
          gameName = desc.replace(/gameName/, "".concat(this.MISSION_GAME_LIST_ONE[data.descSource.gameId]));
          number = gameName.replace(/number/, "".concat(data.descSource.number));
          otherConditionValue = number.replace(/otherConditionValue/, "".concat(this.getGameConditionDesc(data.descSource.otherConditions, data.descSource.otherConditionValue, data.descSource.gameId)));
          return otherConditionValue;
      }
    }
  },
  getGameConditionDesc: function getGameConditionDesc(condition, otherConditionValue, gameId) {
    switch (condition) {
      case 1:
        return this.getFloat(otherConditionValue);

      case 2:
        return glGame.room.getRoomType(gameId, otherConditionValue) || "";
    }
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  }
};

cc._RF.pop();
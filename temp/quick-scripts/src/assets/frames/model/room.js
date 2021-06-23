"use strict";
cc._RF.push(module, '1e183DmROFF6Y/k5DXrGnfv', 'room');
// frames/model/room.js

"use strict";

//与服务端对应路由
var ServerGameName = {
  15: "zjh",
  18: "qznn",
  22: "brnn",
  27: "sg",
  28: "hh",
  29: "sgj",
  30: "lhd",
  31: "lb777",
  32: "bjl",
  33: "pj",
  34: "xydzp",
  35: "dzpk",
  36: "ddz",
  37: "jszjh",
  39: "ebg",
  38: "esyd",
  40: "fish",
  41: "qhbjl",
  42: "sss",
  43: "hcpy",
  44: "slwh",
  46: "qznn2",
  47: "tb",
  48: "hbsl",
  45: "qznnc",
  49: "fish2",
  50: "fish3"
}; // 游戏名称，用于程序打字

var ServerGameDict = {
  15: "炸金花",
  18: "抢庄牛牛",
  22: "百人牛牛",
  27: "三公",
  28: "红黑大战",
  29: "水果机",
  30: "龙虎斗",
  31: "拉霸",
  32: "百家乐",
  33: "抢庄牌九",
  34: "轮盘",
  35: "德州扑克",
  36: "斗地主",
  37: "极速炸金花",
  38: "二十一点",
  39: "二八杠",
  40: "捕鱼",
  41: "红包接龙",
  42: "十三水",
  43: "豪车漂移",
  44: "森林舞会",
  46: "看牌抢庄",
  47: "骰宝",
  48: "红包扫雷",
  45: "看牌抢庄",
  49: "财神捕鱼",
  50: "财神捕鱼"
};
var BET_TYPE_LIST = {
  15: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  18: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  22: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  27: {
    1: "普通场",
    2: "贵宾场",
    3: "富豪场",
    4: "至尊场",
    5: "英雄场",
    99: "体验场"
  },
  28: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  29: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  30: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  32: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  33: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  34: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  35: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  36: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  37: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  38: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  39: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  40: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  41: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  42: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  43: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  44: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  46: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  48: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房"
  },
  49: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  },
  50: {
    1: "普通房",
    2: "贵宾房",
    3: "富豪房",
    4: "至尊房",
    5: "英雄房",
    99: "体验房"
  }
}; // 房间档次

var BET_TYPE = {
  1: '初级房',
  2: '中级房',
  3: '高级房',
  4: '贵宾房',
  5: '富豪房',
  99: '体验房'
}; // 百人场游戏

var HUNDRE_GAME = {
  22: "brnn",
  28: "hh",
  29: "sgj",
  30: "lhd",
  32: "bjl",
  43: "hcpy",
  34: "xydzp",
  41: "qhbjl",
  44: "slwh",
  48: "hbsl"
}; //百人场走房间场模式

var HUNDREDS_ROOM_GAME = {
  44: "slwh",
  41: "qhbjl",
  43: "hcpy",
  48: "hbsl"
}; //捕鱼房间场模式

var FISH_ROOM_GAME = {
  40: "fish",
  49: "nfish",
  50: "lfish"
}; // 房间场游戏

var ROOM_GAME = {
  45: "qznnc"
}; // 房间类型

var ROOM_TYPE = {
  GOLD: 1,
  //金币场类型
  CARD: 2,
  //房间场（钻石版房卡）
  CLUB: 3,
  //俱乐部
  MATCH: 4,
  //比赛房间
  HUNDREDS: 5,
  //百人场类型
  FISH: 99 //捕鱼场类型

}; // 游戏结算后游戏状态

var ROOM_EXIT = {
  BASE: 0,
  //正常离开房间
  CHANGE_TABLE: 1,
  //换桌
  RECUR_ROUND: 2,
  //再来一场创建
  INVITE_ANOTHER_ROUND: 3 //再来一场发起创建

}; // 游戏退出状态特殊状态

var ROOM_EXIT_STATE = {
  STOP: 0,
  //关闭
  BASE: 1,
  //正常
  MAINTENANCE: 2,
  //维护
  FORBID: 4 //禁止

};

var Room = function Room() {
  this.upGameType = 0;
  this.resetData();
  this.registerEvent();
},
    room = Room.prototype,
    g_instance = null;

room.resetData = function () {
  this.roominfo = null;
  this.curEnterGameID = 0;
  this.curEnterRoomID = 0;
  this.curEnterRoomServer = "";
  this.curEnterRoomType = 0;
  this.curEnterBetType = 0;
  this.curEnterGameRank = null;
  this.curEnterRoomNum = 0;
  this.curEnterGameData = null;
  this.exitState = ROOM_EXIT.BASE;
  this.users = {};
  this.cutGameTime = 0;
  this.openNetCut = true; //作用服务器，分服入口

  this.gameId = null;
  this.betType = null;
  this.exitRoomState = 1; //切换出房间后，判定是否有一些异常状态，做记录 0:关闭，1：正常，2：维护

  this.serverGameid = 0; //是否已在房间中（必须enterRoom后记录，当断线后该值将付空）
};
/**
 * 进入房间的网络参数
 */


room.getEnterRoom = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut && this.checkHundredsRoom(gameid)) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.enterRoom2");else if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.enterRoom");else netTt = "connector.entryHandler.enterRoom";
  return netTt;
}; //检查是否为走房间场模式的百人场


room.checkHundredsRoom = function (gameId) {
  for (var key in HUNDREDS_ROOM_GAME) {
    if (key == gameId) {
      return true;
    }
  }

  return false;
}; //传入游戏id和房间等级获取当前的房间等级


room.getRoomType = function (gameId) {
  var betType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  // console.log(ServerGameDict[gameId], betType, BET_TYPE_LIST[gameId])
  if (!BET_TYPE_LIST[gameId]) {
    console.error("gameid:".concat(gameId, ", betType:").concat(betType, ",gameName:").concat(ServerGameDict[gameId]));
    return "";
  }

  return betType == -1 ? BET_TYPE_LIST[gameId] : BET_TYPE_LIST[gameId][betType];
};
/**
 * 进入房间的参数配置
 */


room.getInitRoom = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.initRoomData");else netTt = "connector.entryHandler.initRoomData";
  return netTt;
};
/**
 * 退出房间的网络参数
 */


room.getExitRoom = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.exitRoom");else netTt = "room.roomHandler.exitRoom";
  return netTt;
};
/**
 * 发包的网络参数
 */


room.getPrepare = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.prepare");else netTt = "room.roomHandler.prepare";
  return netTt;
};
/**
 * 发包的网络参数
 */


room.getPlayerOp = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.playerOp");else netTt = "room.roomHandler.playerOp";
  return netTt;
};
/**
 * 房主踢人出房间(只有init阶段可以)
 */


room.getRoomOut = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.getOut");else netTt = "room.roomHandler.getOut";
  return netTt;
};
/**
 * 发送退出房间投票
 */


room.getVoteDisbandRoom = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.voteDisbandRoom");else netTt = "room.roomHandler.voteDisbandRoom";
  return netTt;
};
/**
 * 发送进入房间检测
 */


room.getEnterRoomCheck = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.enterRoomCheck");else netTt = "connector.entryHandler.enterRoomCheck";
  return netTt;
};
/**
 * 创建房间场
 */


room.getCreateRoom = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.createRoom");else netTt = "connector.entryHandler.createRoom";
  return netTt;
};
/**
 * 发送获取牌局记录
 */


room.getInviteAnotherRound = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.inviteAnotherRound");else netTt = "room.roomHandler.inviteAnotherRound";
  return netTt;
};
/**
 * 发送获取牌局记录
 */


room.getRecordIds = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.getRecordIds");else netTt = "room.roomHandler.getRecordIds";
  return netTt;
};
/**
 * 发送GM的网络参数
 */


room.getPlayerGmOp = function (gameId) {
  var gameid = gameId ? gameId : this.curEnterGameID;
  var gameName = ServerGameName[gameid];
  if (!gameid || !gameName) return;
  var netTt = "";
  if (this.openNetCut) netTt = "".concat(gameName, "Room.").concat(gameName, "RoomHandler.playerGmOp");else netTt = "room.roomHandler.playerGmOp";
  return netTt;
};
/**
 * 网络数据监听
 */


room.registerEvent = function () {
  glGame.emitter.on("EnterBackground", this.EnterBackground, this);
  glGame.emitter.on("EnterForeground", this.EnterForeground, this);
  glGame.emitter.on("onDisbandRoom", this.onDisbandRoom, this);
  glGame.emitter.on("onGameFinished", this.onGameFinished, this);
  glGame.emitter.on("onInvitedAnotherRound", this.onInvitedAnotherRound, this);
  glGame.emitter.on("query.handler.getGameIdByRoomNum", this.query_handler_getGameIdByRoomNum, this);
  glGame.emitter.on("onInitRoom", this.room_roomHandler_onInitRoomData, this);
  glGame.emitter.on("onKickOutOfRoom", this.onKickOutOfRoom, this); //玩家被踢回大厅

  for (var key in ServerGameName) {
    if (!ServerGameName.hasOwnProperty(key)) continue;
    var name = ServerGameName[key];
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.vaildateRoomCondition"), this.vaildateRoomCondition, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.enterRoom"), this.connector_entryHandler_enterRoom, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.exitRoom"), this.room_roomHandler_exitRoom, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.initRoomData"), this.room_roomHandler_initRoomData, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.createRoom"), this.room_roomHandler_createRoom, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.enterRoomCheck"), this.room_roomHandler_enterRoomCheck, this);
    if (this.checkHundredsRoom(key)) glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.enterRoom2"), this.connector_entryHandler_enterRoom, this);
  }
};
/**
 * 网络数据监听销毁
 */


room.unRegisterEvent = function () {
  glGame.emitter.off("EnterBackground", this);
  glGame.emitter.off("EnterForeground", this);
  glGame.emitter.off("onDisbandRoom", this);
  glGame.emitter.off("onGameFinished", this);
  glGame.emitter.off("onInvitedAnotherRound", this);
  glGame.emitter.off("query.handler.getGameIdByRoomNum", this);
  glGame.emitter.off("onInitRoom", this);

  for (var key in ServerGameName) {
    if (!ServerGameName.hasOwnProperty(key)) continue;
    var name = ServerGameName[key];
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.vaildateRoomCondition"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.enterRoom"), this);
    if (this.checkHundredsRoom(key)) glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.enterRoom2"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.exitRoom"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.initRoomData"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.createRoom"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.enterRoomCheck"), this);
  }
}; //抛弃不在房间内的发包


room.room_send = function (send_name, send_data) {
  if (this.serverGameid != 0) glGame.gameNet.send_msg(send_name, send_data);
};
/**
 * 加入金币场
 * @param {number} gameid   游戏id
 * @param {number} bettype  游戏场次
 */


room.reqGoldRoomVerify = function (gameid, bettype) {
  this.gameId = gameid;
  this.betType = bettype;
  var name = ServerGameName[gameid];
  glGame.gameNet.send_msg("".concat(name, "Room.").concat(name, "RoomHandler.vaildateRoomCondition"), {
    "gameId": gameid,
    "betType": bettype
  });
};

room.vaildateRoomCondition = function (msg) {
  console.log("加入金币场房间 ...", msg);
  glGame.room.logicDestroy();
  this.curEnterGameID = this.gameId;
  this.curEnterRoomType = ROOM_TYPE.GOLD;
  this.curEnterBetType = this.betType;
  this.enterGameRoom();
};
/**
 * 新
 * 加入金币场
 * @param {number} gameid   游戏id
 * @param {number} bettype  游戏场次
 */


room.setGoldRoomInfo = function (gameId, type) {
  glGame.room.logicDestroy();
  this.curEnterGameID = gameId;
  this.curEnterBetType = type;
  this.curEnterRoomType = ROOM_TYPE.GOLD;
  this.curEnterRoomServer = "";
  this.enterGameRoom();
};
/**
 * 加入百人场
 * @param {number} gameid 游戏id
 */


room.reqHundredsRoom = function (gameid, roomid, roomserver, bettype) {
  glGame.room.logicDestroy();
  this.curEnterGameID = gameid;
  this.curEnterRoomID = roomid;
  this.curEnterRoomServer = roomserver;
  this.curEnterRoomType = ROOM_TYPE.HUNDREDS;
  this.curEnterBetType = bettype;
  this.enterGameRoom();
};
/**
 * 百人场房间模式
 * @param {number} gameid 游戏id
 */


room.reqHundredsRoomOther = function (gameid, bettype) {
  glGame.room.logicDestroy();
  this.curEnterGameID = gameid;
  this.curEnterRoomType = ROOM_TYPE.HUNDREDS;
  this.curEnterBetType = bettype;
  this.enterGameRoom();
};
/**
 * 加入捕鱼场
 * @param {number} roomType 房间类型
 */


room.sendEnterRoom = function (roomType, gameId) {
  var _this = this;

  this.curEnterBetType = roomType;
  this.logicDestroy();
  this.curEnterGameID = gameId || this.curEnterGameID;
  this.curEnterRoomType = ROOM_TYPE.FISH;
  this.logicCreate();

  if (!cc.sys.isNative) {
    this.enterFishGameRoom();
  } else {
    var _gameId = this.curEnterGameID;
    var gameName = glGame.scene.getSceneNameByID(_gameId);
    var update_data = glGame.storage.getItem('update_data');

    if (update_data && update_data[gameName]) {
      this.enterFishGameRoom();
    } else {
      this.downloadGame(_gameId, null, function () {
        _this.enterFishGameRoom();
      });
    }
  }
};
/**
 * 设置进入房间参数
 * @param data
 */


room.setEnterGameInfo = function (data) {
  glGame.room.logicDestroy();
  this.curEnterGameID = data.gameid;
  this.curEnterRoomID = data.roomid;
  this.curEnterRoomType = data.roomtype;
  this.curEnterBetType = data.bettype;
  this.curEnterRoomServer = data.serviceid;
};
/**
 * 获取我的房间状态
 */


room.reqMyRoomState = function () {
  var _this2 = this;

  glGame.gameNet.send_msg("http.reqMyRoomState", null, function (route, data) {
    _this2.roomUserInfo = data.roomUserInfo; // 在房间内

    if (_this2.roomUserInfo && _this2.roomUserInfo.rid > 0) {
      glGame.room.logicDestroy();
      _this2.curEnterGameID = _this2.roomUserInfo.gameid;
      _this2.curEnterRoomType = _this2.roomUserInfo.roomtype;
      _this2.curEnterBetType = _this2.roomUserInfo.bettype;
      _this2.curEnterRoomID = _this2.roomUserInfo.rid;
      _this2.curEnterRoomServer = _this2.roomUserInfo.serviceid;
      if (FISH_ROOM_GAME[_this2.curEnterGameID] != null) _this2.sendEnterRoom(_this2.curEnterBetType);else _this2.enterGameRoom();
    } else {
      if (cc.director.getScene().name != 'plaza' && cc.director.getScene().name != 'login' && cc.director.getScene().name != '') {
        glGame.room.logicDestroy();
        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
        glGame.scene.enterNextScene();
      } else if (cc.director.getScene().name == 'plaza' && !glGame.logon.get("isUpdatePlaza")) {
        if (glGame.readyroom.get("gameid") != 0) {
          glGame.readyroom.reqEnterArea(glGame.readyroom.get("gameid"));
        }
      } else {
        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
        glGame.scene.enterNextScene();
        glGame.logon.set("isUpdatePlaza", false);
      }
    }
  });
}; //进入房间前先确认一下是否还有其他游戏正在进行


room.reqMyGameState = function (_gameID, _roomType, _roomID) {
  return new Promise(function (resolve, reject) {
    glGame.gameNet.send_msg("http.reqMyRoomState", null, function (route, data) {
      glGame.panel.hideFieldSelectionJuHua();

      if (data.roomUserInfo && data.roomUserInfo.rid > 0) {
        if (glGame.room.checkHundredsRoom(_gameID) && _gameID == data.roomUserInfo.gameid && _roomType == data.roomUserInfo.bettype) {
          return resolve();
        } else if (_gameID == data.roomUserInfo.gameid && _roomType == data.roomUserInfo.bettype && (!_roomID || _roomID == data.roomUserInfo.rid)) {
          return resolve();
        }

        if (HUNDRE_GAME[data.roomUserInfo.gameid]) {
          glGame.panel.showDialog('提示', glGame.tips.ROOM.STILLINGAME.format("".concat(ServerGameDict[data.roomUserInfo.gameid], "\uFF08").concat(glGame.room.getRoomType(data.roomUserInfo.gameid, data.roomUserInfo.bettype), "-").concat(data.roomUserInfo.rid, "\uFF09")), function () {
            glGame.room.reqHundredsRoom(data.roomUserInfo.gameid, data.roomUserInfo.rid, data.roomUserInfo.serviceid, data.roomUserInfo.bettype);
          }, false, false, '回到游戏', false, true);
        } else {
          var content = "";
          if (data.roomUserInfo.bettype) content = glGame.tips.ROOM.STILLINGAME.format("".concat(ServerGameDict[data.roomUserInfo.gameid], "\uFF08").concat(glGame.room.getRoomType(data.roomUserInfo.gameid, data.roomUserInfo.bettype), "\uFF09"));else content = glGame.tips.ROOM.STILLINGAME.format("".concat(ServerGameDict[data.roomUserInfo.gameid]));
          glGame.panel.showDialog('提示', content, function () {
            glGame.room.setGoldRoomInfo(data.roomUserInfo.gameid, data.roomUserInfo.bettype);
          }, false, false, '回到游戏', false, true);
        }

        glGame.panel.closeFieldSelectionJuHua();
        return reject();
      }

      resolve();
    });
  });
};
/**
 * 进入房间
 */


room.enterFishGameRoom = function () {
  var _this3 = this;

  glGame.scene.setNextSceneTag(this.curEnterGameID);
  glGame.scene.enterNextScene().then(function () {
    var gunRate = cc.sys.localStorage.getItem("".concat(_this3.curEnterBetType, "gunRate")) ? Number(cc.sys.localStorage.getItem("".concat(_this3.curEnterBetType, "gunRate"))) : 1;
    var msg = {
      bettype: _this3.curEnterBetType,
      serverId: _this3.curEnterRoomServer,
      roomId: _this3.curEnterRoomID,
      gunRate: gunRate
    };

    var _route = _this3.getEnterRoom();

    if (_route) {
      glGame.gameNet.send_msg(_route, msg);
    }
  });
};
/**
 * 进入房间
 */


room.enterGameRoom = function () {
  var _this4 = this;

  if (!cc.sys.isNative) {
    this.enterRoom();
  } else {
    var gameId = this.curEnterGameID;
    var gameName = glGame.scene.getSceneNameByID(gameId);
    var update_data = glGame.storage.getItem('update_data');

    if (update_data && update_data[gameName]) {
      this.enterRoom();
    } else {
      this.downloadGame(gameId, null, function () {
        _this4.enterRoom();
      });
    }
  }
};
/**
 * 退出房间
 */


room.exitGameRoom = function () {
  var _this5 = this;

  glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
  glGame.scene.enterNextScene().then(function () {
    _this5.logicDestroy();

    if (_this5.exitRoomState != ROOM_EXIT_STATE.BASE && _this5.exitRoomState != ROOM_EXIT_STATE.FORBID) {
      var strTip = _this5.exitRoomState == ROOM_EXIT_STATE.MAINTENANCE ? glGame.tips.ROOM.SERVICESTOP : glGame.tips.ROOM.GAMECLOSE;
      glGame.panel.showMsgBox('提示', strTip);
      _this5.exitRoomState = ROOM_EXIT_STATE.BASE;
    } else if (_this5.exitRoomState == ROOM_EXIT_STATE.FORBID) {
      glGame.panel.showDialog("", glGame.tips.ROOM.ACCOUNTEXCEPTION, function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      _this5.exitRoomState = ROOM_EXIT_STATE.BASE;
    }

    _this5.resetData();
  });
}; //临时清理下载


room.downloadGame = function (gameid, manifestUrl, call) {
  var assetsManager = new glGame.assets(glGame.scene.getSceneNameByID(gameid), manifestUrl, function (process) {}, function () {
    // 成功回调
    call(gameid);
    assetsManager.destroy();
    assetsManager = null;
    var gameName = glGame.scene.getSceneNameByID(gameid);
    var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
    var url = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest");
    glGame.gamelistcfg.getGameVersion(url).then(function (verdata) {
      var data = glGame.storage.getItem('update_data');

      if (data) {
        data[gameName] = verdata.version;
      } else {
        data = {};
        data[gameName] = verdata.version;
      }

      glGame.storage.setItem('update_data', data);
    });
  }, function () {
    // 失败回调
    assetsManager.destroy();
    assetsManager = null;
  });
};
/**
 * 游戏结束的游戏状态
 * matchid
 * gameStatus 1 正常 2维护 3关闭 4 踢出游戏
 */


room.onGameFinished = function (msg) {
  if (msg.gameStatus != 1) {
    this.exitRoomState = msg.gameStatus;
    this.exitRoom();
  } //异常情况
  else if (glGame.user.get("gameException")) {
      this.exitRoomState = ROOM_EXIT_STATE.FORBID;
      glGame.emitter.emit('nodeRemove');
      this.exitRoom();
    } //踢下线
    else if (glGame.user.get("KickOutGame")) {
        glGame.panel.showMsgBox("", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
          glGame.logon.reLogon();
        });
      } //禁止游戏
      else if (glGame.user.get("limitGame")) {
          this.exitRoomState = ROOM_EXIT_STATE.FORBID;
          glGame.emitter.emit('nodeRemove');
          this.exitRoom();
        }
};
/**
 * 进入房间
 */


room.enterRoom = function () {
  var _this6 = this;

  this.logicDestroy();
  this.logicCreate();
  var msg = {
    bettype: this.curEnterBetType,
    serverId: this.curEnterRoomServer,
    roomId: this.curEnterRoomID
  }; //判断是否为走房间类型的百人场

  if (this.checkHundredsRoom(this.curEnterRoomID)) {
    msg = {
      bettype: this.curEnterBetType
    };
  } else {
    msg = {
      bettype: this.curEnterBetType,
      serverId: this.curEnterRoomServer,
      roomId: this.curEnterRoomID
    };
  }

  if (this.curEnterRoomType == ROOM_TYPE.HUNDREDS) {
    //百人场类型
    var _route = this.getEnterRoom();

    if (_route) glGame.gameNet.send_msg(_route, msg);
  } else if (this.curEnterRoomType == ROOM_TYPE.CARD) {
    //房间场（钻石版房卡）
    glGame.scene.setNextSceneTag(this.curEnterGameID);
    glGame.scene.enterNextScene().then(function () {
      var _route = _this6.getEnterRoom();

      if (_route) glGame.gameNet.send_msg(_route, msg);
    });
  } else {
    glGame.scene.setNextSceneTag(this.curEnterGameID);
    glGame.scene.enterNextScene().then(function () {
      var _route = _this6.getEnterRoom();

      if (_route) glGame.gameNet.send_msg(_route, msg);
    });
  }
};
/**
 * 进入房间
 * @param {object} data
 */


room.connector_entryHandler_enterRoom = function (data) {
  var _this7 = this;

  if (glGame.readyroom.get("gameid")) glGame.readyroom.reqExitArea(); //加入游戏id

  this.serverGameid = this.curEnterGameID;
  this.upGameType = this.curEnterRoomType; //标记为上次进入的游戏,不做清理

  if (this.curEnterRoomType == ROOM_TYPE.HUNDREDS) {
    glGame.scene.setNextSceneTag(this.curEnterGameID);
    glGame.scene.enterNextScene().then(function () {
      var _route = _this7.getInitRoom();

      if (_route) glGame.gameNet.send_msg(_route, null);
    });
  } else {
    // 关闭选场菊花
    glGame.panel.closeFieldSelectionJuHua();
  }
};
/**
 * 房间配置
 * @param {object} data
 */


room.room_roomHandler_initRoomData = function (data) {
  // this.curEnterRoomID = data.roomId ? data.roomId : this.curEnterRoomID;
  console.log('room_roomHandler_initRoomData');
};
/**
 * 房间配置
 * @param {object} data
 */


room.room_roomHandler_onInitRoomData = function (data) {
  // 配合服务端初始化房间号
  this.curEnterRoomID = data.roomId ? data.roomId : this.curEnterRoomID;
};

room.onKickOutOfRoom = function () {
  glGame.emitter.emit('nodeRemove');
  this.exitRoomState = ROOM_EXIT_STATE.FORBID; //设置退出房间状态

  this.exitRoom(); // glGame.panel.showMsgBox('提示', '        网络连接异常，请重新进入房间！',
  //     () => {
  //         glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
  //         glGame.scene.enterNextScene();
  //     });
};
/**
 * 创建房间
 */


room.room_roomHandler_createRoom = function (roomNum) {
  var _this8 = this;

  this.curEnterGameID = this.gameId;
  this.curEnterRoomType = ROOM_TYPE.CARD;
  this.curEnterGameData = null;
  glGame.scene.setNextSceneTag(this.curEnterGameID);
  glGame.scene.enterNextScene().then(function () {
    var _route = _this8.getEnterRoom();

    if (_route) glGame.gameNet.send_msg(_route, {
      roomNum: roomNum
    });
  });
};
/**
 * 换桌
 */


room.changeTable = function () {
  this.blChangeTable = true;
  this.exitState = ROOM_EXIT.CHANGE_TABLE;
  glGame.panel.showRoomJuHua();

  var _route = this.getExitRoom();

  if (_route) {
    glGame.gameNet.send_msg(_route, {
      exitType: 1
    });
  }
};
/**
 * 房间场再来一局
 */


room.inviteAnotherRound = function (gamid, msg) {
  this.exitState = ROOM_EXIT.RECUR_ROUND;
  this.curEnterGameID = gamid;
  this.curEnterGameData = msg;
  glGame.panel.showRoomJuHua();

  var _route = this.getExitRoom();

  if (_route) {
    glGame.gameNet.send_msg(_route, {
      exitType: 1
    });
  }
};
/**
 * 退出房间
 * @param {number} exitType
 */


room.exitRoom = function () {
  var exitType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.exitState = ROOM_EXIT.BASE;

  var _route = this.getExitRoom();

  if (_route) {
    glGame.panel.showRoomJuHua();
    glGame.gameNet.send_msg(_route, {
      exitType: exitType
    });
  }
};
/**
 * 退出房间结果
 */


room.room_roomHandler_exitRoom = function () {
  glGame.panel.closeRoomJuHua();
  this.setServerGameId();

  if (this.exitState === ROOM_EXIT.CHANGE_TABLE) {
    var gameId = this.curEnterGameID,
        betType = this.curEnterBetType;
    this.logicDestroy();
    this.resetData();
    glGame.panel.showChangeTablePanel();

    if (glGame.enterRoomVerification) {
      glGame.room.reqGoldRoomVerify(gameId, betType);
    } else {
      glGame.room.setGoldRoomInfo(gameId, betType);
    }
  } else if (this.exitState === ROOM_EXIT.RECUR_ROUND) {
    if (this.curEnterGameData != null) {
      this.CreateRoom(this.curEnterGameID, this.curEnterGameData);
    }
  } else if (this.exitState === ROOM_EXIT.INVITE_ANOTHER_ROUND) {
    this.EnterRoomCheck(this.curEnterGameID);
  } else {
    this.exitGameRoom();
  }
};
/**
 * 金币场房间解散
 */


room.onDisbandRoom = function () {
  var _this9 = this;

  glGame.panel.showMsgBox("", "该房间已经解散", function () {
    glGame.panel.closeRoomJuHua();
    if (!ROOM_GAME[_this9.curEnterGameID]) _this9.exitGameRoom();else glGame.emitter.emit("".concat(ServerGameName[_this9.curEnterGameID], "_onDisbandRoom_opEvent"));
  });
};
/**
 * 邀请再来一局监听
 */


room.onInvitedAnotherRound = function (msg) {
  var _this10 = this;

  if ((this.curEnterRoomID == msg.preRoomId || this.curEnterRoomID == 0) && this.curEnterRoomType != ROOM_TYPE.FISH) {
    glGame.panel.showDialog("", glGame.tips.ROOM.ASKFORJOIN.format(msg.nickname), function () {
      if (_this10.curEnterRoomID == msg.preRoomId) {
        _this10.exitState = ROOM_EXIT.INVITE_ANOTHER_ROUND;
        _this10.curEnterGameID = msg.gameId;
        _this10.curEnterRoomNum = msg.roomNum;
        glGame.panel.showRoomJuHua();

        var _route = _this10.getExitRoom();

        if (_route) glGame.gameNet.send_msg(_route, {
          exitType: 1
        });
      } else if (_this10.curEnterRoomID == 0) {
        _this10.curEnterGameID = msg.gameId;
        _this10.curEnterRoomNum = msg.roomNum;

        _this10.EnterRoomCheck(_this10.curEnterGameID);
      } else {
        glGame.panel.showErrorTip(glGame.tips.ROOM.PLAYING);
      }
    });
  }
};
/**
 * 游戏数据层初始化
 */


room.logicCreate = function () {
  var gameName = glGame.scene.getSceneNameByID(this.curEnterGameID);
  if (!gameName) return;

  try {
    require("".concat(gameName, "logic")).getInstance();
  } catch (e) {
    console.warn(e);
  }
};
/**
 * 游戏数据层销毁
 */


room.logicDestroy = function () {
  var gameName = glGame.scene.getSceneNameByID(this.curEnterGameID);
  if (!gameName) return;
  console.log("-------------这是子游戏的数据层销毁--------------");

  try {
    require("".concat(gameName, "logic")).destroy();
  } catch (e) {
    console.warn(e);
  }
};

room.enterRoomFailure = function () {
  this.logicDestroy();
  glGame.notice.resetData();
};
/**
 * 创建房间
 */


room.CreateRoom = function (gameId, msg) {
  var _route = this.getCreateRoom(gameId);

  this.gameId = gameId;
  if (_route) glGame.gameNet.send_msg(_route, msg);
};
/**
 * 进入房间
 */


room.JoinRoom = function () {
  var _this11 = this;

  glGame.scene.setNextSceneTag(this.curEnterGameID);
  glGame.scene.enterNextScene().then(function () {
    var _route = _this11.getEnterRoom();

    if (_route) glGame.gameNet.send_msg(_route, {
      roomNum: _this11.curEnterRoomNum
    });
  });
};
/**
 * 获取游戏类型进入房间
 */


room.getGameIdByRoomNum = function (msg) {
  this.curEnterRoomNum = msg.roomNum;
  glGame.gameNet.send_msg("query.handler.getGameIdByRoomNum", msg);
};
/**
 * 监听房间游戏id
 */


room.query_handler_getGameIdByRoomNum = function (msg) {
  if (typeof msg !== "number") return console.error("query.handler.getGameIdByRoomNum: ".concat(msg));
  this.curEnterGameID = msg;
  this.curEnterRoomType = ROOM_TYPE.CARD;
  glGame.emitter.emit("getGameIdByRoomNum", {
    gameId: msg
  });
};
/**
 * 进入房间内检测
 */


room.EnterRoomCheck = function (gameId) {
  var _this12 = this;

  this.reqMyGameState(gameId).then(function () {
    if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
      glGame.panel.showDialog("", glGame.tips.ROOM.ACCOUNTEXCEPTION, function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return;
    } // if (this.gameConfig.EntranceRestrictions > glGame.user.get("coin")) {
    //     console.log("这是当前的房间限制", this.gameConfig)
    //     let string = ` <color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig.EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
    //     glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "取消", "充值");
    //     return
    // }


    var _route = _this12.getEnterRoomCheck(gameId);

    if (_route) glGame.gameNet.send_msg(_route, {
      roomNum: _this12.curEnterRoomNum
    });
  })["catch"](function () {});
};
/**
 * 进入房间内检测
 */


room.room_roomHandler_enterRoomCheck = function (msg) {
  this.logicDestroy();
  this.JoinRoom();
};
/**
 * http 换房接口
 * @param gameID 游戏ID
 * @param betType 场次类型
 * @param next
 */


room.reqChangeRoom = function (gameID, betType, next) {
  glGame.gameNet.send_msg("http.reqChangeRoom", {
    gameid: gameID,
    bettype: betType
  }, function (route, msg) {
    next();
  });
};
/**
 * 前后台切换断线一下
 */


room.EnterForeground = function () {
  var cutGameTime = Date.now().toString().substring(5);

  if (cutGameTime - this.cutGameTime >= glGame.ground.cutgametime) {
    glGame.gameNet.disconnect();
  }
};

room.EnterBackground = function () {
  this.cutGameTime = Date.now().toString().substring(5);
};
/**
 * 获取用户信息（废弃接口）
 * @param {Array} uids
 */


room.reqUsers = function (uids) {
  var _this13 = this;

  glGame.gameNet.send_msg("http.reqUsers", {
    "uids": uids
  }, function (route, msg) {
    var data = msg.users;
    var count = data.length;

    for (var i = 0; i < count; i++) {
      var user = data[i];
      _this13.users[user["id"]] = user;
    }

    glGame.emitter.emit("updateUsers");
  });
};
/**
 * 设置房间指定属性
 * @param {string} key      房间属性字段
 * @param {object} value    房间属性字段值
 */


room.set = function (key, value) {
  this[key] = value;
};
/**
 * 获取房间指定属性
 * @param {string} key
 * @returns {object}
 */


room.get = function (key) {
  return this[key];
};

room.getGameNameById = function (gameid) {
  var name = ServerGameName[gameid];
  return name;
};

room.getServerGameName = function () {
  return ServerGameName;
};

room.getGameDictById = function (gameid) {
  var name = ServerGameDict[gameid];
  return name;
};

room.getGameBetType = function (bettype) {
  return BET_TYPE[bettype];
};

room.setServerGameId = function () {
  this.serverGameid = 0;
};

room.getUpGameType = function () {
  return this.upGameType;
};

room.getUpGameTypeRoom = function () {
  return this.upGameType === ROOM_TYPE.CARD;
}; //检查游戏是否属于断线重连


room.checkGameState = function () {
  return glGame.scene.getUpScene() == glGame.scene.getNowScene();
}; //针对有特殊属性游戏的弹窗做处理(换肤完后可以处理关闭处理)


room.getGameShowMsgBox = function () {
  var gamelist = [];
  gamelist.push(glGame.scenetag.RQZNN); //抢庄牛牛      （房间场）

  gamelist.push(glGame.scenetag.WQZNN); //看牌抢庄牛牛  （金币场）

  gamelist.push(glGame.scenetag.HONGHEI); //红黑  （房间场）

  gamelist.push(glGame.scenetag.FISH2); //捕鱼

  gamelist.push(glGame.scenetag.FISH3); //捕鱼

  return gamelist.indexOf(glGame.scene.getNowScene()) > -1; //校验是否有该游戏
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new Room();
  }

  return g_instance;
};

cc._RF.pop();
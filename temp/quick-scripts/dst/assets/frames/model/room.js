
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/room.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxccm9vbS5qcyJdLCJuYW1lcyI6WyJTZXJ2ZXJHYW1lTmFtZSIsIlNlcnZlckdhbWVEaWN0IiwiQkVUX1RZUEVfTElTVCIsIkJFVF9UWVBFIiwiSFVORFJFX0dBTUUiLCJIVU5EUkVEU19ST09NX0dBTUUiLCJGSVNIX1JPT01fR0FNRSIsIlJPT01fR0FNRSIsIlJPT01fVFlQRSIsIkdPTEQiLCJDQVJEIiwiQ0xVQiIsIk1BVENIIiwiSFVORFJFRFMiLCJGSVNIIiwiUk9PTV9FWElUIiwiQkFTRSIsIkNIQU5HRV9UQUJMRSIsIlJFQ1VSX1JPVU5EIiwiSU5WSVRFX0FOT1RIRVJfUk9VTkQiLCJST09NX0VYSVRfU1RBVEUiLCJTVE9QIiwiTUFJTlRFTkFOQ0UiLCJGT1JCSUQiLCJSb29tIiwidXBHYW1lVHlwZSIsInJlc2V0RGF0YSIsInJlZ2lzdGVyRXZlbnQiLCJyb29tIiwicHJvdG90eXBlIiwiZ19pbnN0YW5jZSIsInJvb21pbmZvIiwiY3VyRW50ZXJHYW1lSUQiLCJjdXJFbnRlclJvb21JRCIsImN1ckVudGVyUm9vbVNlcnZlciIsImN1ckVudGVyUm9vbVR5cGUiLCJjdXJFbnRlckJldFR5cGUiLCJjdXJFbnRlckdhbWVSYW5rIiwiY3VyRW50ZXJSb29tTnVtIiwiY3VyRW50ZXJHYW1lRGF0YSIsImV4aXRTdGF0ZSIsInVzZXJzIiwiY3V0R2FtZVRpbWUiLCJvcGVuTmV0Q3V0IiwiZ2FtZUlkIiwiYmV0VHlwZSIsImV4aXRSb29tU3RhdGUiLCJzZXJ2ZXJHYW1laWQiLCJnZXRFbnRlclJvb20iLCJnYW1laWQiLCJnYW1lTmFtZSIsIm5ldFR0IiwiY2hlY2tIdW5kcmVkc1Jvb20iLCJrZXkiLCJnZXRSb29tVHlwZSIsImNvbnNvbGUiLCJlcnJvciIsImdldEluaXRSb29tIiwiZ2V0RXhpdFJvb20iLCJnZXRQcmVwYXJlIiwiZ2V0UGxheWVyT3AiLCJnZXRSb29tT3V0IiwiZ2V0Vm90ZURpc2JhbmRSb29tIiwiZ2V0RW50ZXJSb29tQ2hlY2siLCJnZXRDcmVhdGVSb29tIiwiZ2V0SW52aXRlQW5vdGhlclJvdW5kIiwiZ2V0UmVjb3JkSWRzIiwiZ2V0UGxheWVyR21PcCIsImdsR2FtZSIsImVtaXR0ZXIiLCJvbiIsIkVudGVyQmFja2dyb3VuZCIsIkVudGVyRm9yZWdyb3VuZCIsIm9uRGlzYmFuZFJvb20iLCJvbkdhbWVGaW5pc2hlZCIsIm9uSW52aXRlZEFub3RoZXJSb3VuZCIsInF1ZXJ5X2hhbmRsZXJfZ2V0R2FtZUlkQnlSb29tTnVtIiwicm9vbV9yb29tSGFuZGxlcl9vbkluaXRSb29tRGF0YSIsIm9uS2lja091dE9mUm9vbSIsImhhc093blByb3BlcnR5IiwibmFtZSIsInZhaWxkYXRlUm9vbUNvbmRpdGlvbiIsImNvbm5lY3Rvcl9lbnRyeUhhbmRsZXJfZW50ZXJSb29tIiwicm9vbV9yb29tSGFuZGxlcl9leGl0Um9vbSIsInJvb21fcm9vbUhhbmRsZXJfaW5pdFJvb21EYXRhIiwicm9vbV9yb29tSGFuZGxlcl9jcmVhdGVSb29tIiwicm9vbV9yb29tSGFuZGxlcl9lbnRlclJvb21DaGVjayIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsInJvb21fc2VuZCIsInNlbmRfbmFtZSIsInNlbmRfZGF0YSIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJlcUdvbGRSb29tVmVyaWZ5IiwiYmV0dHlwZSIsIm1zZyIsImxvZyIsImxvZ2ljRGVzdHJveSIsImVudGVyR2FtZVJvb20iLCJzZXRHb2xkUm9vbUluZm8iLCJ0eXBlIiwicmVxSHVuZHJlZHNSb29tIiwicm9vbWlkIiwicm9vbXNlcnZlciIsInJlcUh1bmRyZWRzUm9vbU90aGVyIiwic2VuZEVudGVyUm9vbSIsInJvb21UeXBlIiwibG9naWNDcmVhdGUiLCJjYyIsInN5cyIsImlzTmF0aXZlIiwiZW50ZXJGaXNoR2FtZVJvb20iLCJzY2VuZSIsImdldFNjZW5lTmFtZUJ5SUQiLCJ1cGRhdGVfZGF0YSIsInN0b3JhZ2UiLCJnZXRJdGVtIiwiZG93bmxvYWRHYW1lIiwic2V0RW50ZXJHYW1lSW5mbyIsImRhdGEiLCJyb29tdHlwZSIsInNlcnZpY2VpZCIsInJlcU15Um9vbVN0YXRlIiwicm91dGUiLCJyb29tVXNlckluZm8iLCJyaWQiLCJkaXJlY3RvciIsImdldFNjZW5lIiwic2V0TmV4dFNjZW5lVGFnIiwic2NlbmV0YWciLCJQTEFaQSIsImVudGVyTmV4dFNjZW5lIiwibG9nb24iLCJnZXQiLCJyZWFkeXJvb20iLCJyZXFFbnRlckFyZWEiLCJzZXQiLCJyZXFNeUdhbWVTdGF0ZSIsIl9nYW1lSUQiLCJfcm9vbVR5cGUiLCJfcm9vbUlEIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYW5lbCIsImhpZGVGaWVsZFNlbGVjdGlvbkp1SHVhIiwic2hvd0RpYWxvZyIsInRpcHMiLCJST09NIiwiU1RJTExJTkdBTUUiLCJmb3JtYXQiLCJjb250ZW50IiwiY2xvc2VGaWVsZFNlbGVjdGlvbkp1SHVhIiwidGhlbiIsImd1blJhdGUiLCJsb2NhbFN0b3JhZ2UiLCJOdW1iZXIiLCJzZXJ2ZXJJZCIsInJvb21JZCIsIl9yb3V0ZSIsImVudGVyUm9vbSIsImV4aXRHYW1lUm9vbSIsInN0clRpcCIsIlNFUlZJQ0VTVE9QIiwiR0FNRUNMT1NFIiwic2hvd01zZ0JveCIsIkFDQ09VTlRFWENFUFRJT04iLCJzaG93U2VydmljZSIsIm1hbmlmZXN0VXJsIiwiY2FsbCIsImFzc2V0c01hbmFnZXIiLCJhc3NldHMiLCJwcm9jZXNzIiwiZGVzdHJveSIsImhvdFVwZGF0ZVVSTCIsInNlcnZlcmNmZyIsImdldEhvdHVwZGF0ZVZlcnNpb25VcmwiLCJ1cmwiLCJnYW1lbGlzdGNmZyIsImdldEdhbWVWZXJzaW9uIiwidmVyZGF0YSIsInZlcnNpb24iLCJzZXRJdGVtIiwiZ2FtZVN0YXR1cyIsImV4aXRSb29tIiwidXNlciIsImVtaXQiLCJDT01NT04iLCJyZUxvZ29uIiwicmVxRXhpdEFyZWEiLCJyb29tTnVtIiwiY2hhbmdlVGFibGUiLCJibENoYW5nZVRhYmxlIiwic2hvd1Jvb21KdUh1YSIsImV4aXRUeXBlIiwiaW52aXRlQW5vdGhlclJvdW5kIiwiZ2FtaWQiLCJjbG9zZVJvb21KdUh1YSIsInNldFNlcnZlckdhbWVJZCIsInNob3dDaGFuZ2VUYWJsZVBhbmVsIiwiZW50ZXJSb29tVmVyaWZpY2F0aW9uIiwiQ3JlYXRlUm9vbSIsIkVudGVyUm9vbUNoZWNrIiwicHJlUm9vbUlkIiwiQVNLRk9SSk9JTiIsIm5pY2tuYW1lIiwic2hvd0Vycm9yVGlwIiwiUExBWUlORyIsInJlcXVpcmUiLCJnZXRJbnN0YW5jZSIsImUiLCJ3YXJuIiwiZW50ZXJSb29tRmFpbHVyZSIsIm5vdGljZSIsIkpvaW5Sb29tIiwiZ2V0R2FtZUlkQnlSb29tTnVtIiwic3VzcGljaW91cyIsImdhbWUiLCJpc19nYW1lIiwicmVxQ2hhbmdlUm9vbSIsImdhbWVJRCIsIm5leHQiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJncm91bmQiLCJjdXRnYW1ldGltZSIsImRpc2Nvbm5lY3QiLCJyZXFVc2VycyIsInVpZHMiLCJjb3VudCIsImxlbmd0aCIsImkiLCJ2YWx1ZSIsImdldEdhbWVOYW1lQnlJZCIsImdldFNlcnZlckdhbWVOYW1lIiwiZ2V0R2FtZURpY3RCeUlkIiwiZ2V0R2FtZUJldFR5cGUiLCJnZXRVcEdhbWVUeXBlIiwiZ2V0VXBHYW1lVHlwZVJvb20iLCJjaGVja0dhbWVTdGF0ZSIsImdldFVwU2NlbmUiLCJnZXROb3dTY2VuZSIsImdldEdhbWVTaG93TXNnQm94IiwiZ2FtZWxpc3QiLCJwdXNoIiwiUlFaTk4iLCJXUVpOTiIsIkhPTkdIRUkiLCJGSVNIMiIsIkZJU0gzIiwiaW5kZXhPZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQSxJQUFNQSxjQUFjLEdBQUc7QUFDbkIsTUFBSSxLQURlO0FBQ1IsTUFBSSxNQURJO0FBQ0ksTUFBSSxNQURSO0FBQ2dCLE1BQUksSUFEcEI7QUFDMEIsTUFBSSxJQUQ5QjtBQUNvQyxNQUFJLEtBRHhDO0FBQytDLE1BQUksS0FEbkQ7QUFDMEQsTUFBSSxPQUQ5RDtBQUN1RSxNQUFJLEtBRDNFO0FBRW5CLE1BQUksSUFGZTtBQUVULE1BQUksT0FGSztBQUVJLE1BQUksTUFGUjtBQUVnQixNQUFJLEtBRnBCO0FBRTJCLE1BQUksT0FGL0I7QUFFd0MsTUFBSSxLQUY1QztBQUVtRCxNQUFJLE1BRnZEO0FBRStELE1BQUksTUFGbkU7QUFFMkUsTUFBSSxPQUYvRTtBQUduQixNQUFJLEtBSGU7QUFHUixNQUFJLE1BSEk7QUFHSSxNQUFJLE1BSFI7QUFHZ0IsTUFBSSxPQUhwQjtBQUc2QixNQUFJLElBSGpDO0FBR3VDLE1BQUksTUFIM0M7QUFJbkIsTUFBSSxPQUplO0FBSU4sTUFBSSxPQUpFO0FBSU8sTUFBSTtBQUpYLENBQXZCLEVBTUE7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHO0FBQ25CLE1BQUksS0FEZTtBQUNSLE1BQUksTUFESTtBQUNJLE1BQUksTUFEUjtBQUNnQixNQUFJLElBRHBCO0FBQzBCLE1BQUksTUFEOUI7QUFDc0MsTUFBSSxLQUQxQztBQUVuQixNQUFJLEtBRmU7QUFFUixNQUFJLElBRkk7QUFFRSxNQUFJLEtBRk47QUFFYSxNQUFJLE1BRmpCO0FBRXlCLE1BQUksSUFGN0I7QUFFbUMsTUFBSSxNQUZ2QztBQUduQixNQUFJLEtBSGU7QUFHUixNQUFJLE9BSEk7QUFHSyxNQUFJLE1BSFQ7QUFHaUIsTUFBSSxLQUhyQjtBQUc0QixNQUFJLElBSGhDO0FBR3NDLE1BQUksTUFIMUM7QUFJbkIsTUFBSSxLQUplO0FBSVIsTUFBSSxNQUpJO0FBSUksTUFBSSxNQUpSO0FBSWdCLE1BQUksTUFKcEI7QUFJNEIsTUFBSSxJQUpoQztBQUlzQyxNQUFJLE1BSjFDO0FBS25CLE1BQUksTUFMZTtBQUtQLE1BQUksTUFMRztBQUtLLE1BQUk7QUFMVCxDQUF2QjtBQU9BLElBQU1DLGFBQWEsR0FBRztBQUNsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FEYztBQUVsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FGYztBQUdsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHO0FBQTdDLEdBSGM7QUFJbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRyxLQUE3QztBQUFvRCxRQUFJO0FBQXhELEdBSmM7QUFLbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRztBQUE3QyxHQUxjO0FBTWxCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUc7QUFBN0MsR0FOYztBQU9sQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHO0FBQTdDLEdBUGM7QUFRbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRztBQUE3QyxHQVJjO0FBU2xCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUcsS0FBN0M7QUFBb0QsUUFBSTtBQUF4RCxHQVRjO0FBVWxCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUc7QUFBN0MsR0FWYztBQVdsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FYYztBQVlsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FaYztBQWFsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FiYztBQWNsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FkYztBQWVsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FmYztBQWdCbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRyxLQUE3QztBQUFvRCxRQUFJO0FBQXhELEdBaEJjO0FBaUJsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHO0FBQTdDLEdBakJjO0FBa0JsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQsR0FsQmM7QUFtQmxCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUc7QUFBN0MsR0FuQmM7QUFvQmxCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUc7QUFBN0MsR0FwQmM7QUFxQmxCLE1BQUk7QUFBRSxPQUFHLEtBQUw7QUFBWSxPQUFHLEtBQWY7QUFBc0IsT0FBRyxLQUF6QjtBQUFnQyxPQUFHLEtBQW5DO0FBQTBDLE9BQUcsS0FBN0M7QUFBb0QsUUFBSTtBQUF4RCxHQXJCYztBQXNCbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRztBQUE3QyxHQXRCYztBQXVCbEIsTUFBSTtBQUFFLE9BQUcsS0FBTDtBQUFZLE9BQUcsS0FBZjtBQUFzQixPQUFHLEtBQXpCO0FBQWdDLE9BQUcsS0FBbkM7QUFBMEMsT0FBRyxLQUE3QztBQUFvRCxRQUFJO0FBQXhELEdBdkJjO0FBd0JsQixNQUFJO0FBQUUsT0FBRyxLQUFMO0FBQVksT0FBRyxLQUFmO0FBQXNCLE9BQUcsS0FBekI7QUFBZ0MsT0FBRyxLQUFuQztBQUEwQyxPQUFHLEtBQTdDO0FBQW9ELFFBQUk7QUFBeEQ7QUF4QmMsQ0FBdEIsRUEwQkE7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHO0FBQ2IsS0FBRyxLQURVO0FBRWIsS0FBRyxLQUZVO0FBR2IsS0FBRyxLQUhVO0FBSWIsS0FBRyxLQUpVO0FBS2IsS0FBRyxLQUxVO0FBTWIsTUFBSTtBQU5TLENBQWpCLEVBUUE7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHO0FBQ2hCLE1BQUksTUFEWTtBQUNKLE1BQUksSUFEQTtBQUNNLE1BQUksS0FEVjtBQUNpQixNQUFJLEtBRHJCO0FBQzRCLE1BQUksS0FEaEM7QUFDdUMsTUFBSSxNQUQzQztBQUNtRCxNQUFJLE9BRHZEO0FBQ2dFLE1BQUksT0FEcEU7QUFDNkUsTUFBSSxNQURqRjtBQUN5RixNQUFJO0FBRDdGLENBQXBCLEVBR0E7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUc7QUFDdkIsTUFBSSxNQURtQjtBQUNYLE1BQUksT0FETztBQUNFLE1BQUksTUFETjtBQUNjLE1BQUk7QUFEbEIsQ0FBM0IsRUFJQTs7QUFDQSxJQUFNQyxjQUFjLEdBQUc7QUFDbkIsTUFBSSxNQURlO0FBQ1AsTUFBSSxPQURHO0FBQ00sTUFBSTtBQURWLENBQXZCLEVBR0E7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHO0FBQ2QsTUFBSTtBQURVLENBQWxCLEVBR0E7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHO0FBQ2RDLEVBQUFBLElBQUksRUFBRSxDQURRO0FBQ007QUFDcEJDLEVBQUFBLElBQUksRUFBRSxDQUZRO0FBRU07QUFDcEJDLEVBQUFBLElBQUksRUFBRSxDQUhRO0FBR007QUFDcEJDLEVBQUFBLEtBQUssRUFBRSxDQUpPO0FBSU07QUFDcEJDLEVBQUFBLFFBQVEsRUFBRSxDQUxJO0FBS007QUFDcEJDLEVBQUFBLElBQUksRUFBRSxFQU5RLENBTU07O0FBTk4sQ0FBbEIsRUFRQTs7QUFDQSxJQUFNQyxTQUFTLEdBQUc7QUFDZEMsRUFBQUEsSUFBSSxFQUFFLENBRFE7QUFDYztBQUM1QkMsRUFBQUEsWUFBWSxFQUFFLENBRkE7QUFFYztBQUM1QkMsRUFBQUEsV0FBVyxFQUFFLENBSEM7QUFHYztBQUM1QkMsRUFBQUEsb0JBQW9CLEVBQUUsQ0FKUixDQUljOztBQUpkLENBQWxCLEVBTUE7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHO0FBQ3BCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEYztBQUNBO0FBQ3BCTCxFQUFBQSxJQUFJLEVBQUUsQ0FGYztBQUVBO0FBQ3BCTSxFQUFBQSxXQUFXLEVBQUUsQ0FITztBQUdBO0FBQ3BCQyxFQUFBQSxNQUFNLEVBQUUsQ0FKWSxDQUlBOztBQUpBLENBQXhCOztBQU9BLElBQUlDLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQVk7QUFDbkIsT0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLE9BQUtDLFNBQUw7QUFDQSxPQUFLQyxhQUFMO0FBQ0gsQ0FKRDtBQUFBLElBS0lDLElBQUksR0FBR0osSUFBSSxDQUFDSyxTQUxoQjtBQUFBLElBTUlDLFVBQVUsR0FBRyxJQU5qQjs7QUFRQUYsSUFBSSxDQUFDRixTQUFMLEdBQWlCLFlBQVk7QUFDekIsT0FBS0ssUUFBTCxHQUFnQixJQUFoQjtBQUNBLE9BQUtDLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxPQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsT0FBS0Msa0JBQUwsR0FBMEIsRUFBMUI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLE9BQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLE9BQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLE9BQUtDLFNBQUwsR0FBaUJ6QixTQUFTLENBQUNDLElBQTNCO0FBQ0EsT0FBS3lCLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsSUFBbEIsQ0FieUIsQ0FhSTs7QUFDN0IsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxPQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLE9BQUtDLGFBQUwsR0FBcUIsQ0FBckIsQ0FoQnlCLENBZ0JPOztBQUNoQyxPQUFLQyxZQUFMLEdBQW9CLENBQXBCLENBakJ5QixDQWlCTztBQUNuQyxDQWxCRDtBQW9CQTs7Ozs7QUFHQW5CLElBQUksQ0FBQ29CLFlBQUwsR0FBb0IsVUFBVUosTUFBVixFQUFrQjtBQUNsQyxNQUFJSyxNQUFNLEdBQUdMLE1BQU0sR0FBR0EsTUFBSCxHQUFZLEtBQUtaLGNBQXBDO0FBQ0EsTUFBSWtCLFFBQVEsR0FBR2xELGNBQWMsQ0FBQ2lELE1BQUQsQ0FBN0I7QUFDQSxNQUFJLENBQUNBLE1BQUQsSUFBVyxDQUFDQyxRQUFoQixFQUEwQjtBQUMxQixNQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUksS0FBS1IsVUFBTCxJQUFtQixLQUFLUyxpQkFBTCxDQUF1QkgsTUFBdkIsQ0FBdkIsRUFBdURFLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLDJCQUFMLENBQXZELEtBQ0ssSUFBSSxLQUFLUCxVQUFULEVBQXFCUSxLQUFLLGFBQU1ELFFBQU4sa0JBQXNCQSxRQUF0QiwwQkFBTCxDQUFyQixLQUNBQyxLQUFLLEdBQUcsa0NBQVI7QUFDTCxTQUFPQSxLQUFQO0FBQ0gsQ0FURCxFQVVBOzs7QUFDQXZCLElBQUksQ0FBQ3dCLGlCQUFMLEdBQXlCLFVBQVVSLE1BQVYsRUFBa0I7QUFDdkMsT0FBSyxJQUFJUyxHQUFULElBQWdCaEQsa0JBQWhCLEVBQW9DO0FBQ2hDLFFBQUlnRCxHQUFHLElBQUlULE1BQVgsRUFBbUI7QUFDZixhQUFPLElBQVA7QUFDSDtBQUNKOztBQUNELFNBQU8sS0FBUDtBQUNILENBUEQsRUFRQTs7O0FBQ0FoQixJQUFJLENBQUMwQixXQUFMLEdBQW1CLFVBQVVWLE1BQVYsRUFBZ0M7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLENBQUMsQ0FBRzs7QUFDL0M7QUFDQSxNQUFJLENBQUMzQyxhQUFhLENBQUMwQyxNQUFELENBQWxCLEVBQTRCO0FBQ3hCVyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsa0JBQXdCWixNQUF4Qix1QkFBMkNDLE9BQTNDLHVCQUErRDVDLGNBQWMsQ0FBQzJDLE1BQUQsQ0FBN0U7QUFDQSxXQUFPLEVBQVA7QUFDSDs7QUFDRCxTQUFPQyxPQUFPLElBQUksQ0FBQyxDQUFaLEdBQWdCM0MsYUFBYSxDQUFDMEMsTUFBRCxDQUE3QixHQUF3QzFDLGFBQWEsQ0FBQzBDLE1BQUQsQ0FBYixDQUFzQkMsT0FBdEIsQ0FBL0M7QUFDSCxDQVBEO0FBUUE7Ozs7O0FBR0FqQixJQUFJLENBQUM2QixXQUFMLEdBQW1CLFVBQVViLE1BQVYsRUFBa0I7QUFDakMsTUFBSUssTUFBTSxHQUFHTCxNQUFNLEdBQUdBLE1BQUgsR0FBWSxLQUFLWixjQUFwQztBQUNBLE1BQUlrQixRQUFRLEdBQUdsRCxjQUFjLENBQUNpRCxNQUFELENBQTdCO0FBQ0EsTUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0MsUUFBaEIsRUFBMEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxNQUFJLEtBQUtSLFVBQVQsRUFBcUJRLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLDZCQUFMLENBQXJCLEtBQ0tDLEtBQUssR0FBRyxxQ0FBUjtBQUNMLFNBQU9BLEtBQVA7QUFDSCxDQVJEO0FBU0E7Ozs7O0FBR0F2QixJQUFJLENBQUM4QixXQUFMLEdBQW1CLFVBQVVkLE1BQVYsRUFBa0I7QUFDakMsTUFBSUssTUFBTSxHQUFHTCxNQUFNLEdBQUdBLE1BQUgsR0FBWSxLQUFLWixjQUFwQztBQUNBLE1BQUlrQixRQUFRLEdBQUdsRCxjQUFjLENBQUNpRCxNQUFELENBQTdCO0FBQ0EsTUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0MsUUFBaEIsRUFBMEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxNQUFJLEtBQUtSLFVBQVQsRUFBcUJRLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLHlCQUFMLENBQXJCLEtBQ0tDLEtBQUssR0FBRywyQkFBUjtBQUNMLFNBQU9BLEtBQVA7QUFDSCxDQVJEO0FBVUE7Ozs7O0FBR0F2QixJQUFJLENBQUMrQixVQUFMLEdBQWtCLFVBQVVmLE1BQVYsRUFBa0I7QUFDaEMsTUFBSUssTUFBTSxHQUFHTCxNQUFNLEdBQUdBLE1BQUgsR0FBWSxLQUFLWixjQUFwQztBQUNBLE1BQUlrQixRQUFRLEdBQUdsRCxjQUFjLENBQUNpRCxNQUFELENBQTdCO0FBQ0EsTUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0MsUUFBaEIsRUFBMEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxNQUFJLEtBQUtSLFVBQVQsRUFBcUJRLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLHdCQUFMLENBQXJCLEtBQ0tDLEtBQUssR0FBRywwQkFBUjtBQUNMLFNBQU9BLEtBQVA7QUFDSCxDQVJEO0FBVUE7Ozs7O0FBR0F2QixJQUFJLENBQUNnQyxXQUFMLEdBQW1CLFVBQVVoQixNQUFWLEVBQWtCO0FBQ2pDLE1BQUlLLE1BQU0sR0FBR0wsTUFBTSxHQUFHQSxNQUFILEdBQVksS0FBS1osY0FBcEM7QUFDQSxNQUFJa0IsUUFBUSxHQUFHbEQsY0FBYyxDQUFDaUQsTUFBRCxDQUE3QjtBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNDLFFBQWhCLEVBQTBCO0FBQzFCLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSSxLQUFLUixVQUFULEVBQXFCUSxLQUFLLGFBQU1ELFFBQU4sa0JBQXNCQSxRQUF0Qix5QkFBTCxDQUFyQixLQUNLQyxLQUFLLEdBQUcsMkJBQVI7QUFDTCxTQUFPQSxLQUFQO0FBQ0gsQ0FSRDtBQVVBOzs7OztBQUdBdkIsSUFBSSxDQUFDaUMsVUFBTCxHQUFrQixVQUFVakIsTUFBVixFQUFrQjtBQUNoQyxNQUFJSyxNQUFNLEdBQUdMLE1BQU0sR0FBR0EsTUFBSCxHQUFZLEtBQUtaLGNBQXBDO0FBQ0EsTUFBSWtCLFFBQVEsR0FBR2xELGNBQWMsQ0FBQ2lELE1BQUQsQ0FBN0I7QUFDQSxNQUFJLENBQUNBLE1BQUQsSUFBVyxDQUFDQyxRQUFoQixFQUEwQjtBQUMxQixNQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUksS0FBS1IsVUFBVCxFQUFxQlEsS0FBSyxhQUFNRCxRQUFOLGtCQUFzQkEsUUFBdEIsdUJBQUwsQ0FBckIsS0FDS0MsS0FBSyxHQUFHLHlCQUFSO0FBQ0wsU0FBT0EsS0FBUDtBQUNILENBUkQ7QUFVQTs7Ozs7QUFHQXZCLElBQUksQ0FBQ2tDLGtCQUFMLEdBQTBCLFVBQVVsQixNQUFWLEVBQWtCO0FBQ3hDLE1BQUlLLE1BQU0sR0FBR0wsTUFBTSxHQUFHQSxNQUFILEdBQVksS0FBS1osY0FBcEM7QUFDQSxNQUFJa0IsUUFBUSxHQUFHbEQsY0FBYyxDQUFDaUQsTUFBRCxDQUE3QjtBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNDLFFBQWhCLEVBQTBCO0FBQzFCLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSSxLQUFLUixVQUFULEVBQXFCUSxLQUFLLGFBQU1ELFFBQU4sa0JBQXNCQSxRQUF0QixnQ0FBTCxDQUFyQixLQUNLQyxLQUFLLEdBQUcsa0NBQVI7QUFDTCxTQUFPQSxLQUFQO0FBQ0gsQ0FSRDtBQVVBOzs7OztBQUdBdkIsSUFBSSxDQUFDbUMsaUJBQUwsR0FBeUIsVUFBVW5CLE1BQVYsRUFBa0I7QUFDdkMsTUFBSUssTUFBTSxHQUFHTCxNQUFNLEdBQUdBLE1BQUgsR0FBWSxLQUFLWixjQUFwQztBQUNBLE1BQUlrQixRQUFRLEdBQUdsRCxjQUFjLENBQUNpRCxNQUFELENBQTdCO0FBQ0EsTUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0MsUUFBaEIsRUFBMEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxNQUFJLEtBQUtSLFVBQVQsRUFBcUJRLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLCtCQUFMLENBQXJCLEtBQ0tDLEtBQUssR0FBRyx1Q0FBUjtBQUNMLFNBQU9BLEtBQVA7QUFDSCxDQVJEO0FBVUE7Ozs7O0FBR0F2QixJQUFJLENBQUNvQyxhQUFMLEdBQXFCLFVBQVVwQixNQUFWLEVBQWtCO0FBQ25DLE1BQUlLLE1BQU0sR0FBR0wsTUFBTSxHQUFHQSxNQUFILEdBQVksS0FBS1osY0FBcEM7QUFDQSxNQUFJa0IsUUFBUSxHQUFHbEQsY0FBYyxDQUFDaUQsTUFBRCxDQUE3QjtBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNDLFFBQWhCLEVBQTBCO0FBQzFCLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSSxLQUFLUixVQUFULEVBQXFCUSxLQUFLLGFBQU1ELFFBQU4sa0JBQXNCQSxRQUF0QiwyQkFBTCxDQUFyQixLQUNLQyxLQUFLLEdBQUcsbUNBQVI7QUFDTCxTQUFPQSxLQUFQO0FBQ0gsQ0FSRDtBQVVBOzs7OztBQUdBdkIsSUFBSSxDQUFDcUMscUJBQUwsR0FBNkIsVUFBVXJCLE1BQVYsRUFBa0I7QUFDM0MsTUFBSUssTUFBTSxHQUFHTCxNQUFNLEdBQUdBLE1BQUgsR0FBWSxLQUFLWixjQUFwQztBQUNBLE1BQUlrQixRQUFRLEdBQUdsRCxjQUFjLENBQUNpRCxNQUFELENBQTdCO0FBQ0EsTUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0MsUUFBaEIsRUFBMEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxNQUFJLEtBQUtSLFVBQVQsRUFBcUJRLEtBQUssYUFBTUQsUUFBTixrQkFBc0JBLFFBQXRCLG1DQUFMLENBQXJCLEtBQ0tDLEtBQUssR0FBRyxxQ0FBUjtBQUNMLFNBQU9BLEtBQVA7QUFDSCxDQVJEO0FBVUE7Ozs7O0FBR0F2QixJQUFJLENBQUNzQyxZQUFMLEdBQW9CLFVBQVV0QixNQUFWLEVBQWtCO0FBQ2xDLE1BQUlLLE1BQU0sR0FBR0wsTUFBTSxHQUFHQSxNQUFILEdBQVksS0FBS1osY0FBcEM7QUFDQSxNQUFJa0IsUUFBUSxHQUFHbEQsY0FBYyxDQUFDaUQsTUFBRCxDQUE3QjtBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNDLFFBQWhCLEVBQTBCO0FBQzFCLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSSxLQUFLUixVQUFULEVBQXFCUSxLQUFLLGFBQU1ELFFBQU4sa0JBQXNCQSxRQUF0Qiw2QkFBTCxDQUFyQixLQUNLQyxLQUFLLEdBQUcsK0JBQVI7QUFDTCxTQUFPQSxLQUFQO0FBQ0gsQ0FSRDtBQVVBOzs7OztBQUdBdkIsSUFBSSxDQUFDdUMsYUFBTCxHQUFxQixVQUFVdkIsTUFBVixFQUFrQjtBQUNuQyxNQUFJSyxNQUFNLEdBQUdMLE1BQU0sR0FBR0EsTUFBSCxHQUFZLEtBQUtaLGNBQXBDO0FBQ0EsTUFBSWtCLFFBQVEsR0FBR2xELGNBQWMsQ0FBQ2lELE1BQUQsQ0FBN0I7QUFDQSxNQUFJLENBQUNBLE1BQUQsSUFBVyxDQUFDQyxRQUFoQixFQUEwQjtBQUMxQixNQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUksS0FBS1IsVUFBVCxFQUFxQlEsS0FBSyxhQUFNRCxRQUFOLGtCQUFzQkEsUUFBdEIsMkJBQUwsQ0FBckIsS0FDS0MsS0FBSyxHQUFHLDZCQUFSO0FBQ0wsU0FBT0EsS0FBUDtBQUNILENBUkQ7QUFVQTs7Ozs7QUFHQXZCLElBQUksQ0FBQ0QsYUFBTCxHQUFxQixZQUFZO0FBQzdCeUMsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsaUJBQWxCLEVBQXFDLEtBQUtDLGVBQTFDLEVBQTJELElBQTNEO0FBQ0FILEVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLENBQWtCLGlCQUFsQixFQUFxQyxLQUFLRSxlQUExQyxFQUEyRCxJQUEzRDtBQUNBSixFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixlQUFsQixFQUFtQyxLQUFLRyxhQUF4QyxFQUF1RCxJQUF2RDtBQUNBTCxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixnQkFBbEIsRUFBb0MsS0FBS0ksY0FBekMsRUFBeUQsSUFBekQ7QUFDQU4sRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsdUJBQWxCLEVBQTJDLEtBQUtLLHFCQUFoRCxFQUF1RSxJQUF2RTtBQUNBUCxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixrQ0FBbEIsRUFBc0QsS0FBS00sZ0NBQTNELEVBQTZGLElBQTdGO0FBQ0FSLEVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLENBQWtCLFlBQWxCLEVBQWdDLEtBQUtPLCtCQUFyQyxFQUFzRSxJQUF0RTtBQUNBVCxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixpQkFBbEIsRUFBcUMsS0FBS1EsZUFBMUMsRUFBMkQsSUFBM0QsRUFSNkIsQ0FRdUQ7O0FBRXBGLE9BQUssSUFBSXpCLEdBQVQsSUFBZ0JyRCxjQUFoQixFQUFnQztBQUM1QixRQUFJLENBQUNBLGNBQWMsQ0FBQytFLGNBQWYsQ0FBOEIxQixHQUE5QixDQUFMLEVBQXlDO0FBQ3pDLFFBQUkyQixJQUFJLEdBQUdoRixjQUFjLENBQUNxRCxHQUFELENBQXpCO0FBQ0FlLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLFdBQXFCVSxJQUFyQixrQkFBaUNBLElBQWpDLHdDQUEwRSxLQUFLQyxxQkFBL0UsRUFBc0csSUFBdEc7QUFDQWIsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVDLEVBQWYsV0FBcUJVLElBQXJCLGtCQUFpQ0EsSUFBakMsNEJBQThELEtBQUtFLGdDQUFuRSxFQUFxRyxJQUFyRztBQUNBZCxJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBZixXQUFxQlUsSUFBckIsa0JBQWlDQSxJQUFqQywyQkFBNkQsS0FBS0cseUJBQWxFLEVBQTZGLElBQTdGO0FBQ0FmLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLFdBQXFCVSxJQUFyQixrQkFBaUNBLElBQWpDLCtCQUFpRSxLQUFLSSw2QkFBdEUsRUFBcUcsSUFBckc7QUFDQWhCLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLFdBQXFCVSxJQUFyQixrQkFBaUNBLElBQWpDLDZCQUErRCxLQUFLSywyQkFBcEUsRUFBaUcsSUFBakc7QUFDQWpCLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxFQUFmLFdBQXFCVSxJQUFyQixrQkFBaUNBLElBQWpDLGlDQUFtRSxLQUFLTSwrQkFBeEUsRUFBeUcsSUFBekc7QUFDQSxRQUFJLEtBQUtsQyxpQkFBTCxDQUF1QkMsR0FBdkIsQ0FBSixFQUFpQ2UsTUFBTSxDQUFDQyxPQUFQLENBQWVDLEVBQWYsV0FBcUJVLElBQXJCLGtCQUFpQ0EsSUFBakMsNkJBQStELEtBQUtFLGdDQUFwRSxFQUFzRyxJQUF0RztBQUNwQztBQUNKLENBckJEO0FBc0JBOzs7OztBQUdBdEQsSUFBSSxDQUFDMkQsZUFBTCxHQUF1QixZQUFZO0FBQy9CbkIsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVtQixHQUFmLENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QztBQUNBcEIsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVtQixHQUFmLENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QztBQUNBcEIsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVtQixHQUFmLENBQW1CLGVBQW5CLEVBQW9DLElBQXBDO0FBQ0FwQixFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsQ0FBbUIsZ0JBQW5CLEVBQXFDLElBQXJDO0FBQ0FwQixFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsQ0FBbUIsdUJBQW5CLEVBQTRDLElBQTVDO0FBQ0FwQixFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsQ0FBbUIsa0NBQW5CLEVBQXVELElBQXZEO0FBQ0FwQixFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakM7O0FBRUEsT0FBSyxJQUFJbkMsR0FBVCxJQUFnQnJELGNBQWhCLEVBQWdDO0FBQzVCLFFBQUksQ0FBQ0EsY0FBYyxDQUFDK0UsY0FBZixDQUE4QjFCLEdBQTlCLENBQUwsRUFBeUM7QUFDekMsUUFBSTJCLElBQUksR0FBR2hGLGNBQWMsQ0FBQ3FELEdBQUQsQ0FBekI7QUFDQWUsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVtQixHQUFmLFdBQXNCUixJQUF0QixrQkFBa0NBLElBQWxDLHdDQUEyRSxJQUEzRTtBQUNBWixJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsV0FBc0JSLElBQXRCLGtCQUFrQ0EsSUFBbEMsNEJBQStELElBQS9EO0FBQ0EsUUFBSSxLQUFLNUIsaUJBQUwsQ0FBdUJDLEdBQXZCLENBQUosRUFBaUNlLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbUIsR0FBZixXQUFzQlIsSUFBdEIsa0JBQWtDQSxJQUFsQyw2QkFBZ0UsSUFBaEU7QUFDakNaLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbUIsR0FBZixXQUFzQlIsSUFBdEIsa0JBQWtDQSxJQUFsQywyQkFBOEQsSUFBOUQ7QUFDQVosSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVtQixHQUFmLFdBQXNCUixJQUF0QixrQkFBa0NBLElBQWxDLCtCQUFrRSxJQUFsRTtBQUNBWixJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLEdBQWYsV0FBc0JSLElBQXRCLGtCQUFrQ0EsSUFBbEMsNkJBQWdFLElBQWhFO0FBQ0FaLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbUIsR0FBZixXQUFzQlIsSUFBdEIsa0JBQWtDQSxJQUFsQyxpQ0FBb0UsSUFBcEU7QUFDSDtBQUNKLENBcEJELEVBc0JBOzs7QUFDQXBELElBQUksQ0FBQzZELFNBQUwsR0FBaUIsVUFBVUMsU0FBVixFQUFxQkMsU0FBckIsRUFBZ0M7QUFDN0MsTUFBSSxLQUFLNUMsWUFBTCxJQUFxQixDQUF6QixFQUE0QnFCLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3QkgsU0FBeEIsRUFBbUNDLFNBQW5DO0FBQy9CLENBRkQ7QUFJQTs7Ozs7OztBQUtBL0QsSUFBSSxDQUFDa0UsaUJBQUwsR0FBeUIsVUFBVTdDLE1BQVYsRUFBa0I4QyxPQUFsQixFQUEyQjtBQUNoRCxPQUFLbkQsTUFBTCxHQUFjSyxNQUFkO0FBQ0EsT0FBS0osT0FBTCxHQUFla0QsT0FBZjtBQUNBLE1BQUlmLElBQUksR0FBR2hGLGNBQWMsQ0FBQ2lELE1BQUQsQ0FBekI7QUFDQW1CLEVBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixXQUEyQmIsSUFBM0Isa0JBQXVDQSxJQUF2Qyx3Q0FBZ0Y7QUFDNUUsY0FBVS9CLE1BRGtFO0FBRTVFLGVBQVc4QztBQUZpRSxHQUFoRjtBQUlILENBUkQ7O0FBVUFuRSxJQUFJLENBQUNxRCxxQkFBTCxHQUE2QixVQUFVZSxHQUFWLEVBQWU7QUFDeEN6QyxFQUFBQSxPQUFPLENBQUMwQyxHQUFSLENBQVksYUFBWixFQUEyQkQsR0FBM0I7QUFDQTVCLEVBQUFBLE1BQU0sQ0FBQ3hDLElBQVAsQ0FBWXNFLFlBQVo7QUFDQSxPQUFLbEUsY0FBTCxHQUFzQixLQUFLWSxNQUEzQjtBQUNBLE9BQUtULGdCQUFMLEdBQXdCM0IsU0FBUyxDQUFDQyxJQUFsQztBQUNBLE9BQUsyQixlQUFMLEdBQXVCLEtBQUtTLE9BQTVCO0FBQ0EsT0FBS3NELGFBQUw7QUFDSCxDQVBEO0FBUUE7Ozs7Ozs7O0FBTUF2RSxJQUFJLENBQUN3RSxlQUFMLEdBQXVCLFVBQVV4RCxNQUFWLEVBQWtCeUQsSUFBbEIsRUFBd0I7QUFDM0NqQyxFQUFBQSxNQUFNLENBQUN4QyxJQUFQLENBQVlzRSxZQUFaO0FBQ0EsT0FBS2xFLGNBQUwsR0FBc0JZLE1BQXRCO0FBQ0EsT0FBS1IsZUFBTCxHQUF1QmlFLElBQXZCO0FBQ0EsT0FBS2xFLGdCQUFMLEdBQXdCM0IsU0FBUyxDQUFDQyxJQUFsQztBQUNBLE9BQUt5QixrQkFBTCxHQUEwQixFQUExQjtBQUNBLE9BQUtpRSxhQUFMO0FBQ0gsQ0FQRDtBQVNBOzs7Ozs7QUFJQXZFLElBQUksQ0FBQzBFLGVBQUwsR0FBdUIsVUFBVXJELE1BQVYsRUFBa0JzRCxNQUFsQixFQUEwQkMsVUFBMUIsRUFBc0NULE9BQXRDLEVBQStDO0FBQ2xFM0IsRUFBQUEsTUFBTSxDQUFDeEMsSUFBUCxDQUFZc0UsWUFBWjtBQUNBLE9BQUtsRSxjQUFMLEdBQXNCaUIsTUFBdEI7QUFDQSxPQUFLaEIsY0FBTCxHQUFzQnNFLE1BQXRCO0FBQ0EsT0FBS3JFLGtCQUFMLEdBQTBCc0UsVUFBMUI7QUFDQSxPQUFLckUsZ0JBQUwsR0FBd0IzQixTQUFTLENBQUNLLFFBQWxDO0FBQ0EsT0FBS3VCLGVBQUwsR0FBdUIyRCxPQUF2QjtBQUNBLE9BQUtJLGFBQUw7QUFDSCxDQVJEO0FBU0E7Ozs7OztBQUlBdkUsSUFBSSxDQUFDNkUsb0JBQUwsR0FBNEIsVUFBVXhELE1BQVYsRUFBa0I4QyxPQUFsQixFQUEyQjtBQUNuRDNCLEVBQUFBLE1BQU0sQ0FBQ3hDLElBQVAsQ0FBWXNFLFlBQVo7QUFDQSxPQUFLbEUsY0FBTCxHQUFzQmlCLE1BQXRCO0FBQ0EsT0FBS2QsZ0JBQUwsR0FBd0IzQixTQUFTLENBQUNLLFFBQWxDO0FBQ0EsT0FBS3VCLGVBQUwsR0FBdUIyRCxPQUF2QjtBQUNBLE9BQUtJLGFBQUw7QUFDSCxDQU5EO0FBT0E7Ozs7OztBQUlBdkUsSUFBSSxDQUFDOEUsYUFBTCxHQUFxQixVQUFVQyxRQUFWLEVBQW9CL0QsTUFBcEIsRUFBNEI7QUFBQTs7QUFDN0MsT0FBS1IsZUFBTCxHQUF1QnVFLFFBQXZCO0FBQ0EsT0FBS1QsWUFBTDtBQUNBLE9BQUtsRSxjQUFMLEdBQXNCWSxNQUFNLElBQUksS0FBS1osY0FBckM7QUFDQSxPQUFLRyxnQkFBTCxHQUF3QjNCLFNBQVMsQ0FBQ00sSUFBbEM7QUFDQSxPQUFLOEYsV0FBTDs7QUFFQSxNQUFJLENBQUNDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxRQUFaLEVBQXNCO0FBQ2xCLFNBQUtDLGlCQUFMO0FBQ0gsR0FGRCxNQUVPO0FBQ0gsUUFBSXBFLE9BQU0sR0FBRyxLQUFLWixjQUFsQjtBQUNBLFFBQUlrQixRQUFRLEdBQUdrQixNQUFNLENBQUM2QyxLQUFQLENBQWFDLGdCQUFiLENBQThCdEUsT0FBOUIsQ0FBZjtBQUNBLFFBQUl1RSxXQUFXLEdBQUcvQyxNQUFNLENBQUNnRCxPQUFQLENBQWVDLE9BQWYsQ0FBdUIsYUFBdkIsQ0FBbEI7O0FBQ0EsUUFBSUYsV0FBVyxJQUFJQSxXQUFXLENBQUNqRSxRQUFELENBQTlCLEVBQTBDO0FBQ3RDLFdBQUs4RCxpQkFBTDtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtNLFlBQUwsQ0FBa0IxRSxPQUFsQixFQUEwQixJQUExQixFQUFnQyxZQUFNO0FBQUUsUUFBQSxLQUFJLENBQUNvRSxpQkFBTDtBQUEyQixPQUFuRTtBQUNIO0FBQ0o7QUFDSixDQW5CRDtBQW9CQTs7Ozs7O0FBSUFwRixJQUFJLENBQUMyRixnQkFBTCxHQUF3QixVQUFVQyxJQUFWLEVBQWdCO0FBQ3BDcEQsRUFBQUEsTUFBTSxDQUFDeEMsSUFBUCxDQUFZc0UsWUFBWjtBQUNBLE9BQUtsRSxjQUFMLEdBQXNCd0YsSUFBSSxDQUFDdkUsTUFBM0I7QUFDQSxPQUFLaEIsY0FBTCxHQUFzQnVGLElBQUksQ0FBQ2pCLE1BQTNCO0FBQ0EsT0FBS3BFLGdCQUFMLEdBQXdCcUYsSUFBSSxDQUFDQyxRQUE3QjtBQUNBLE9BQUtyRixlQUFMLEdBQXVCb0YsSUFBSSxDQUFDekIsT0FBNUI7QUFDQSxPQUFLN0Qsa0JBQUwsR0FBMEJzRixJQUFJLENBQUNFLFNBQS9CO0FBQ0gsQ0FQRDtBQVFBOzs7OztBQUdBOUYsSUFBSSxDQUFDK0YsY0FBTCxHQUFzQixZQUFZO0FBQUE7O0FBQzlCdkQsRUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCLHFCQUF4QixFQUErQyxJQUEvQyxFQUFxRCxVQUFDK0IsS0FBRCxFQUFRSixJQUFSLEVBQWlCO0FBQ2xFLElBQUEsTUFBSSxDQUFDSyxZQUFMLEdBQW9CTCxJQUFJLENBQUNLLFlBQXpCLENBRGtFLENBRWxFOztBQUNBLFFBQUksTUFBSSxDQUFDQSxZQUFMLElBQXFCLE1BQUksQ0FBQ0EsWUFBTCxDQUFrQkMsR0FBbEIsR0FBd0IsQ0FBakQsRUFBb0Q7QUFDaEQxRCxNQUFBQSxNQUFNLENBQUN4QyxJQUFQLENBQVlzRSxZQUFaO0FBQ0EsTUFBQSxNQUFJLENBQUNsRSxjQUFMLEdBQXNCLE1BQUksQ0FBQzZGLFlBQUwsQ0FBa0I1RSxNQUF4QztBQUNBLE1BQUEsTUFBSSxDQUFDZCxnQkFBTCxHQUF3QixNQUFJLENBQUMwRixZQUFMLENBQWtCSixRQUExQztBQUNBLE1BQUEsTUFBSSxDQUFDckYsZUFBTCxHQUF1QixNQUFJLENBQUN5RixZQUFMLENBQWtCOUIsT0FBekM7QUFDQSxNQUFBLE1BQUksQ0FBQzlELGNBQUwsR0FBc0IsTUFBSSxDQUFDNEYsWUFBTCxDQUFrQkMsR0FBeEM7QUFDQSxNQUFBLE1BQUksQ0FBQzVGLGtCQUFMLEdBQTBCLE1BQUksQ0FBQzJGLFlBQUwsQ0FBa0JILFNBQTVDO0FBQ0EsVUFBSXBILGNBQWMsQ0FBQyxNQUFJLENBQUMwQixjQUFOLENBQWQsSUFBdUMsSUFBM0MsRUFBaUQsTUFBSSxDQUFDMEUsYUFBTCxDQUFtQixNQUFJLENBQUN0RSxlQUF4QixFQUFqRCxLQUNLLE1BQUksQ0FBQytELGFBQUw7QUFDUixLQVRELE1BU087QUFDSCxVQUFJVSxFQUFFLENBQUNrQixRQUFILENBQVlDLFFBQVosR0FBdUJoRCxJQUF2QixJQUErQixPQUEvQixJQUEwQzZCLEVBQUUsQ0FBQ2tCLFFBQUgsQ0FBWUMsUUFBWixHQUF1QmhELElBQXZCLElBQStCLE9BQXpFLElBQW9GNkIsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxRQUFaLEdBQXVCaEQsSUFBdkIsSUFBK0IsRUFBdkgsRUFBMkg7QUFDdkhaLFFBQUFBLE1BQU0sQ0FBQ3hDLElBQVAsQ0FBWXNFLFlBQVo7QUFDQTlCLFFBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYWdCLGVBQWIsQ0FBNkI3RCxNQUFNLENBQUM4RCxRQUFQLENBQWdCQyxLQUE3QztBQUNBL0QsUUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhbUIsY0FBYjtBQUNILE9BSkQsTUFJTyxJQUFJdkIsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxRQUFaLEdBQXVCaEQsSUFBdkIsSUFBK0IsT0FBL0IsSUFBMEMsQ0FBQ1osTUFBTSxDQUFDaUUsS0FBUCxDQUFhQyxHQUFiLENBQWlCLGVBQWpCLENBQS9DLEVBQWtGO0FBQ3JGLFlBQUlsRSxNQUFNLENBQUNtRSxTQUFQLENBQWlCRCxHQUFqQixDQUFxQixRQUFyQixLQUFrQyxDQUF0QyxFQUF5QztBQUNyQ2xFLFVBQUFBLE1BQU0sQ0FBQ21FLFNBQVAsQ0FBaUJDLFlBQWpCLENBQThCcEUsTUFBTSxDQUFDbUUsU0FBUCxDQUFpQkQsR0FBakIsQ0FBcUIsUUFBckIsQ0FBOUI7QUFDSDtBQUNKLE9BSk0sTUFJQTtBQUNIbEUsUUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhZ0IsZUFBYixDQUE2QjdELE1BQU0sQ0FBQzhELFFBQVAsQ0FBZ0JDLEtBQTdDO0FBQ0EvRCxRQUFBQSxNQUFNLENBQUM2QyxLQUFQLENBQWFtQixjQUFiO0FBQ0FoRSxRQUFBQSxNQUFNLENBQUNpRSxLQUFQLENBQWFJLEdBQWIsQ0FBaUIsZUFBakIsRUFBa0MsS0FBbEM7QUFDSDtBQUNKO0FBRUosR0E1QkQ7QUE2QkgsQ0E5QkQsRUErQkE7OztBQUNBN0csSUFBSSxDQUFDOEcsY0FBTCxHQUFzQixVQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QkMsT0FBOUIsRUFBdUM7QUFDekQsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDMUM1RSxJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYsQ0FBd0IscUJBQXhCLEVBQStDLElBQS9DLEVBQXFELFVBQUMrQixLQUFELEVBQVFKLElBQVIsRUFBaUI7QUFDbEVwRCxNQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWFDLHVCQUFiOztBQUNBLFVBQUkxQixJQUFJLENBQUNLLFlBQUwsSUFBcUJMLElBQUksQ0FBQ0ssWUFBTCxDQUFrQkMsR0FBbEIsR0FBd0IsQ0FBakQsRUFBb0Q7QUFDaEQsWUFBSTFELE1BQU0sQ0FBQ3hDLElBQVAsQ0FBWXdCLGlCQUFaLENBQThCdUYsT0FBOUIsS0FBMENBLE9BQU8sSUFBSW5CLElBQUksQ0FBQ0ssWUFBTCxDQUFrQjVFLE1BQXZFLElBQWlGMkYsU0FBUyxJQUFJcEIsSUFBSSxDQUFDSyxZQUFMLENBQWtCOUIsT0FBcEgsRUFBNkg7QUFDekgsaUJBQU9nRCxPQUFPLEVBQWQ7QUFDSCxTQUZELE1BRU8sSUFBSUosT0FBTyxJQUFJbkIsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBN0IsSUFBdUMyRixTQUFTLElBQUlwQixJQUFJLENBQUNLLFlBQUwsQ0FBa0I5QixPQUF0RSxLQUFrRixDQUFDOEMsT0FBRCxJQUFZQSxPQUFPLElBQUlyQixJQUFJLENBQUNLLFlBQUwsQ0FBa0JDLEdBQTNILENBQUosRUFBcUk7QUFDeEksaUJBQU9pQixPQUFPLEVBQWQ7QUFDSDs7QUFDRCxZQUFJM0ksV0FBVyxDQUFDb0gsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBbkIsQ0FBZixFQUEyQztBQUN2Q21CLFVBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYUUsVUFBYixDQUF3QixJQUF4QixFQUE4Qi9FLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWUMsSUFBWixDQUFpQkMsV0FBakIsQ0FBNkJDLE1BQTdCLFdBQXVDdEosY0FBYyxDQUFDdUgsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBbkIsQ0FBckQsbUJBQW1GbUIsTUFBTSxDQUFDeEMsSUFBUCxDQUFZMEIsV0FBWixDQUF3QmtFLElBQUksQ0FBQ0ssWUFBTCxDQUFrQjVFLE1BQTFDLEVBQWtEdUUsSUFBSSxDQUFDSyxZQUFMLENBQWtCOUIsT0FBcEUsQ0FBbkYsY0FBbUt5QixJQUFJLENBQUNLLFlBQUwsQ0FBa0JDLEdBQXJMLFlBQTlCLEVBQTROLFlBQU07QUFDOU4xRCxZQUFBQSxNQUFNLENBQUN4QyxJQUFQLENBQVkwRSxlQUFaLENBQTRCa0IsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBOUMsRUFBc0R1RSxJQUFJLENBQUNLLFlBQUwsQ0FBa0JDLEdBQXhFLEVBQTZFTixJQUFJLENBQUNLLFlBQUwsQ0FBa0JILFNBQS9GLEVBQTBHRixJQUFJLENBQUNLLFlBQUwsQ0FBa0I5QixPQUE1SDtBQUNILFdBRkQsRUFFRyxLQUZILEVBRVUsS0FGVixFQUVpQixNQUZqQixFQUV5QixLQUZ6QixFQUVnQyxJQUZoQztBQUdILFNBSkQsTUFJTztBQUNILGNBQUl5RCxPQUFPLEdBQUcsRUFBZDtBQUNBLGNBQUloQyxJQUFJLENBQUNLLFlBQUwsQ0FBa0I5QixPQUF0QixFQUNJeUQsT0FBTyxHQUFHcEYsTUFBTSxDQUFDZ0YsSUFBUCxDQUFZQyxJQUFaLENBQWlCQyxXQUFqQixDQUE2QkMsTUFBN0IsV0FBdUN0SixjQUFjLENBQUN1SCxJQUFJLENBQUNLLFlBQUwsQ0FBa0I1RSxNQUFuQixDQUFyRCxtQkFBbUZtQixNQUFNLENBQUN4QyxJQUFQLENBQVkwQixXQUFaLENBQXdCa0UsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBMUMsRUFBa0R1RSxJQUFJLENBQUNLLFlBQUwsQ0FBa0I5QixPQUFwRSxDQUFuRixZQUFWLENBREosS0FHSXlELE9BQU8sR0FBR3BGLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWUMsSUFBWixDQUFpQkMsV0FBakIsQ0FBNkJDLE1BQTdCLFdBQXVDdEosY0FBYyxDQUFDdUgsSUFBSSxDQUFDSyxZQUFMLENBQWtCNUUsTUFBbkIsQ0FBckQsRUFBVjtBQUVKbUIsVUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhRSxVQUFiLENBQXdCLElBQXhCLEVBQThCSyxPQUE5QixFQUF1QyxZQUFNO0FBQ3pDcEYsWUFBQUEsTUFBTSxDQUFDeEMsSUFBUCxDQUFZd0UsZUFBWixDQUE0Qm9CLElBQUksQ0FBQ0ssWUFBTCxDQUFrQjVFLE1BQTlDLEVBQXNEdUUsSUFBSSxDQUFDSyxZQUFMLENBQWtCOUIsT0FBeEU7QUFDSCxXQUZELEVBRUcsS0FGSCxFQUVVLEtBRlYsRUFFaUIsTUFGakIsRUFFeUIsS0FGekIsRUFFZ0MsSUFGaEM7QUFHSDs7QUFDRDNCLFFBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYVEsd0JBQWI7QUFDQSxlQUFPVCxNQUFNLEVBQWI7QUFDSDs7QUFDREQsTUFBQUEsT0FBTztBQUNWLEtBM0JEO0FBNEJILEdBN0JNLENBQVA7QUE4QkgsQ0EvQkQ7QUFnQ0E7Ozs7O0FBR0FuSCxJQUFJLENBQUNvRixpQkFBTCxHQUF5QixZQUFZO0FBQUE7O0FBQ2pDNUMsRUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhZ0IsZUFBYixDQUE2QixLQUFLakcsY0FBbEM7QUFDQW9DLEVBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYW1CLGNBQWIsR0FBOEJzQixJQUE5QixDQUFtQyxZQUFNO0FBQ3JDLFFBQUlDLE9BQU8sR0FBRzlDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPOEMsWUFBUCxDQUFvQnZDLE9BQXBCLFdBQStCLE1BQUksQ0FBQ2pGLGVBQXBDLGdCQUFnRXlILE1BQU0sQ0FBQ2hELEVBQUUsQ0FBQ0MsR0FBSCxDQUFPOEMsWUFBUCxDQUFvQnZDLE9BQXBCLFdBQStCLE1BQUksQ0FBQ2pGLGVBQXBDLGFBQUQsQ0FBdEUsR0FBd0ksQ0FBdEo7QUFDQSxRQUFJNEQsR0FBRyxHQUFHO0FBQ05ELE1BQUFBLE9BQU8sRUFBRSxNQUFJLENBQUMzRCxlQURSO0FBRU4wSCxNQUFBQSxRQUFRLEVBQUUsTUFBSSxDQUFDNUgsa0JBRlQ7QUFHTjZILE1BQUFBLE1BQU0sRUFBRSxNQUFJLENBQUM5SCxjQUhQO0FBSU4wSCxNQUFBQSxPQUFPLEVBQUVBO0FBSkgsS0FBVjs7QUFNQSxRQUFJSyxNQUFNLEdBQUcsTUFBSSxDQUFDaEgsWUFBTCxFQUFiOztBQUNBLFFBQUlnSCxNQUFKLEVBQVk7QUFDUjVGLE1BQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDaEUsR0FBaEM7QUFDSDtBQUNKLEdBWkQ7QUFhSCxDQWZEO0FBZ0JBOzs7OztBQUdBcEUsSUFBSSxDQUFDdUUsYUFBTCxHQUFxQixZQUFZO0FBQUE7O0FBQzdCLE1BQUksQ0FBQ1UsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVosRUFBc0I7QUFDbEIsU0FBS2tELFNBQUw7QUFDSCxHQUZELE1BRU87QUFDSCxRQUFJckgsTUFBTSxHQUFHLEtBQUtaLGNBQWxCO0FBQ0EsUUFBSWtCLFFBQVEsR0FBR2tCLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYUMsZ0JBQWIsQ0FBOEJ0RSxNQUE5QixDQUFmO0FBQ0EsUUFBSXVFLFdBQVcsR0FBRy9DLE1BQU0sQ0FBQ2dELE9BQVAsQ0FBZUMsT0FBZixDQUF1QixhQUF2QixDQUFsQjs7QUFDQSxRQUFJRixXQUFXLElBQUlBLFdBQVcsQ0FBQ2pFLFFBQUQsQ0FBOUIsRUFBMEM7QUFDdEMsV0FBSytHLFNBQUw7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLM0MsWUFBTCxDQUFrQjFFLE1BQWxCLEVBQTBCLElBQTFCLEVBQWdDLFlBQU07QUFBRSxRQUFBLE1BQUksQ0FBQ3FILFNBQUw7QUFBbUIsT0FBM0Q7QUFDSDtBQUNKO0FBQ0osQ0FiRDtBQWNBOzs7OztBQUlBckksSUFBSSxDQUFDc0ksWUFBTCxHQUFvQixZQUFZO0FBQUE7O0FBQzVCOUYsRUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhZ0IsZUFBYixDQUE2QjdELE1BQU0sQ0FBQzhELFFBQVAsQ0FBZ0JDLEtBQTdDO0FBQ0EvRCxFQUFBQSxNQUFNLENBQUM2QyxLQUFQLENBQWFtQixjQUFiLEdBQThCc0IsSUFBOUIsQ0FBbUMsWUFBTTtBQUNyQyxJQUFBLE1BQUksQ0FBQ3hELFlBQUw7O0FBQ0EsUUFBSSxNQUFJLENBQUNwRCxhQUFMLElBQXNCMUIsZUFBZSxDQUFDSixJQUF0QyxJQUE4QyxNQUFJLENBQUM4QixhQUFMLElBQXNCMUIsZUFBZSxDQUFDRyxNQUF4RixFQUFnRztBQUM1RixVQUFJNEksTUFBTSxHQUFHLE1BQUksQ0FBQ3JILGFBQUwsSUFBc0IxQixlQUFlLENBQUNFLFdBQXRDLEdBQW9EOEMsTUFBTSxDQUFDZ0YsSUFBUCxDQUFZQyxJQUFaLENBQWlCZSxXQUFyRSxHQUFtRmhHLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWUMsSUFBWixDQUFpQmdCLFNBQWpIO0FBQ0FqRyxNQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWFxQixVQUFiLENBQXdCLElBQXhCLEVBQThCSCxNQUE5QjtBQUNBLE1BQUEsTUFBSSxDQUFDckgsYUFBTCxHQUFxQjFCLGVBQWUsQ0FBQ0osSUFBckM7QUFDSCxLQUpELE1BSU8sSUFBSSxNQUFJLENBQUM4QixhQUFMLElBQXNCMUIsZUFBZSxDQUFDRyxNQUExQyxFQUFrRDtBQUNyRDZDLE1BQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYUUsVUFBYixDQUF3QixFQUF4QixFQUE0Qi9FLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWUMsSUFBWixDQUFpQmtCLGdCQUE3QyxFQUErRCxZQUFNO0FBQUVuRyxRQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWF1QixXQUFiO0FBQTRCLE9BQW5HLEVBQXFHLFlBQU0sQ0FBRyxDQUE5RyxFQUFnSCxNQUFoSCxFQUF3SCxNQUF4SDtBQUNBLE1BQUEsTUFBSSxDQUFDMUgsYUFBTCxHQUFxQjFCLGVBQWUsQ0FBQ0osSUFBckM7QUFDSDs7QUFDRCxJQUFBLE1BQUksQ0FBQ1UsU0FBTDtBQUNILEdBWEQ7QUFZSCxDQWRELEVBZUE7OztBQUNBRSxJQUFJLENBQUMwRixZQUFMLEdBQW9CLFVBQVVyRSxNQUFWLEVBQWtCd0gsV0FBbEIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQ3JELE1BQUlDLGFBQWEsR0FBRyxJQUFJdkcsTUFBTSxDQUFDd0csTUFBWCxDQUFrQnhHLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYUMsZ0JBQWIsQ0FBOEJqRSxNQUE5QixDQUFsQixFQUF5RHdILFdBQXpELEVBQXNFLFVBQUNJLE9BQUQsRUFBYSxDQUN0RyxDQURtQixFQUNqQixZQUFNO0FBQUs7QUFDVkgsSUFBQUEsSUFBSSxDQUFDekgsTUFBRCxDQUFKO0FBQ0EwSCxJQUFBQSxhQUFhLENBQUNHLE9BQWQ7QUFDQUgsSUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0EsUUFBSXpILFFBQVEsR0FBR2tCLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYUMsZ0JBQWIsQ0FBOEJqRSxNQUE5QixDQUFmO0FBQ0EsUUFBSThILFlBQVksR0FBRzNHLE1BQU0sQ0FBQzRHLFNBQVAsQ0FBaUJDLHNCQUFqQixFQUFuQjtBQUNBLFFBQUlDLEdBQUcsYUFBTUgsWUFBTixTQUFxQjdILFFBQXJCLGNBQWlDQSxRQUFqQyxxQkFBUDtBQUNBa0IsSUFBQUEsTUFBTSxDQUFDK0csV0FBUCxDQUFtQkMsY0FBbkIsQ0FBa0NGLEdBQWxDLEVBQXVDeEIsSUFBdkMsQ0FBNEMsVUFBQTJCLE9BQU8sRUFBSTtBQUNuRCxVQUFJN0QsSUFBSSxHQUFHcEQsTUFBTSxDQUFDZ0QsT0FBUCxDQUFlQyxPQUFmLENBQXVCLGFBQXZCLENBQVg7O0FBQ0EsVUFBSUcsSUFBSixFQUFVO0FBQ05BLFFBQUFBLElBQUksQ0FBQ3RFLFFBQUQsQ0FBSixHQUFpQm1JLE9BQU8sQ0FBQ0MsT0FBekI7QUFDSCxPQUZELE1BRU87QUFDSDlELFFBQUFBLElBQUksR0FBRyxFQUFQO0FBQ0FBLFFBQUFBLElBQUksQ0FBQ3RFLFFBQUQsQ0FBSixHQUFpQm1JLE9BQU8sQ0FBQ0MsT0FBekI7QUFDSDs7QUFDRGxILE1BQUFBLE1BQU0sQ0FBQ2dELE9BQVAsQ0FBZW1FLE9BQWYsQ0FBdUIsYUFBdkIsRUFBc0MvRCxJQUF0QztBQUNILEtBVEQ7QUFVSCxHQWxCbUIsRUFrQmpCLFlBQU07QUFBSztBQUNWbUQsSUFBQUEsYUFBYSxDQUFDRyxPQUFkO0FBQ0FILElBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNILEdBckJtQixDQUFwQjtBQXNCSCxDQXZCRDtBQXdCQTs7Ozs7OztBQUtBL0ksSUFBSSxDQUFDOEMsY0FBTCxHQUFzQixVQUFVc0IsR0FBVixFQUFlO0FBQ2pDLE1BQUlBLEdBQUcsQ0FBQ3dGLFVBQUosSUFBa0IsQ0FBdEIsRUFBeUI7QUFDckIsU0FBSzFJLGFBQUwsR0FBcUJrRCxHQUFHLENBQUN3RixVQUF6QjtBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQUhELENBSUE7QUFKQSxPQUtLLElBQUlySCxNQUFNLENBQUNzSCxJQUFQLENBQVlwRCxHQUFaLENBQWdCLGVBQWhCLENBQUosRUFBc0M7QUFDdkMsV0FBS3hGLGFBQUwsR0FBcUIxQixlQUFlLENBQUNHLE1BQXJDO0FBQ0E2QyxNQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZXNILElBQWYsQ0FBb0IsWUFBcEI7QUFDQSxXQUFLRixRQUFMO0FBQ0gsS0FKSSxDQUtMO0FBTEssU0FNQSxJQUFJckgsTUFBTSxDQUFDc0gsSUFBUCxDQUFZcEQsR0FBWixDQUFnQixhQUFoQixDQUFKLEVBQW9DO0FBQ3JDbEUsUUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhcUIsVUFBYixDQUF3QixFQUF4QixFQUE0QmxHLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWXdDLE1BQVosQ0FBbUJyQixnQkFBL0MsRUFBaUUsWUFBTTtBQUFFbkcsVUFBQUEsTUFBTSxDQUFDaUUsS0FBUCxDQUFhd0QsT0FBYjtBQUF3QixTQUFqRztBQUNILE9BRkksQ0FHTDtBQUhLLFdBSUEsSUFBSXpILE1BQU0sQ0FBQ3NILElBQVAsQ0FBWXBELEdBQVosQ0FBZ0IsV0FBaEIsQ0FBSixFQUFrQztBQUNuQyxlQUFLeEYsYUFBTCxHQUFxQjFCLGVBQWUsQ0FBQ0csTUFBckM7QUFDQTZDLFVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlc0gsSUFBZixDQUFvQixZQUFwQjtBQUNBLGVBQUtGLFFBQUw7QUFDSDtBQUNKLENBckJEO0FBc0JBOzs7OztBQUdBN0osSUFBSSxDQUFDcUksU0FBTCxHQUFpQixZQUFZO0FBQUE7O0FBQ3pCLE9BQUsvRCxZQUFMO0FBQ0EsT0FBS1UsV0FBTDtBQUNBLE1BQUlaLEdBQUcsR0FBRztBQUNORCxJQUFBQSxPQUFPLEVBQUUsS0FBSzNELGVBRFI7QUFFTjBILElBQUFBLFFBQVEsRUFBRSxLQUFLNUgsa0JBRlQ7QUFHTjZILElBQUFBLE1BQU0sRUFBRSxLQUFLOUg7QUFIUCxHQUFWLENBSHlCLENBUXpCOztBQUNBLE1BQUksS0FBS21CLGlCQUFMLENBQXVCLEtBQUtuQixjQUE1QixDQUFKLEVBQWlEO0FBQzdDK0QsSUFBQUEsR0FBRyxHQUFHO0FBQUVELE1BQUFBLE9BQU8sRUFBRSxLQUFLM0Q7QUFBaEIsS0FBTjtBQUNILEdBRkQsTUFFTztBQUNINEQsSUFBQUEsR0FBRyxHQUFHO0FBQ0ZELE1BQUFBLE9BQU8sRUFBRSxLQUFLM0QsZUFEWjtBQUVGMEgsTUFBQUEsUUFBUSxFQUFFLEtBQUs1SCxrQkFGYjtBQUdGNkgsTUFBQUEsTUFBTSxFQUFFLEtBQUs5SDtBQUhYLEtBQU47QUFLSDs7QUFDRCxNQUFJLEtBQUtFLGdCQUFMLElBQXlCM0IsU0FBUyxDQUFDSyxRQUF2QyxFQUFpRDtBQUFXO0FBQ3hELFFBQUltSixNQUFNLEdBQUcsS0FBS2hILFlBQUwsRUFBYjs7QUFDQSxRQUFJZ0gsTUFBSixFQUFZNUYsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCbUUsTUFBeEIsRUFBZ0NoRSxHQUFoQztBQUNmLEdBSEQsTUFHTyxJQUFJLEtBQUs3RCxnQkFBTCxJQUF5QjNCLFNBQVMsQ0FBQ0UsSUFBdkMsRUFBNkM7QUFBUTtBQUN4RDBELElBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYWdCLGVBQWIsQ0FBNkIsS0FBS2pHLGNBQWxDO0FBQ0FvQyxJQUFBQSxNQUFNLENBQUM2QyxLQUFQLENBQWFtQixjQUFiLEdBQThCc0IsSUFBOUIsQ0FBbUMsWUFBTTtBQUNyQyxVQUFJTSxNQUFNLEdBQUcsTUFBSSxDQUFDaEgsWUFBTCxFQUFiOztBQUNBLFVBQUlnSCxNQUFKLEVBQVk1RixNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYsQ0FBd0JtRSxNQUF4QixFQUFnQ2hFLEdBQWhDO0FBQ2YsS0FIRDtBQUlILEdBTk0sTUFNQTtBQUNINUIsSUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhZ0IsZUFBYixDQUE2QixLQUFLakcsY0FBbEM7QUFDQW9DLElBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYW1CLGNBQWIsR0FBOEJzQixJQUE5QixDQUFtQyxZQUFNO0FBQ3JDLFVBQUlNLE1BQU0sR0FBRyxNQUFJLENBQUNoSCxZQUFMLEVBQWI7O0FBQ0EsVUFBSWdILE1BQUosRUFBWTVGLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDaEUsR0FBaEM7QUFDZixLQUhEO0FBSUg7QUFDSixDQWxDRDtBQW1DQTs7Ozs7O0FBSUFwRSxJQUFJLENBQUNzRCxnQ0FBTCxHQUF3QyxVQUFVc0MsSUFBVixFQUFnQjtBQUFBOztBQUNwRCxNQUFJcEQsTUFBTSxDQUFDbUUsU0FBUCxDQUFpQkQsR0FBakIsQ0FBcUIsUUFBckIsQ0FBSixFQUFvQ2xFLE1BQU0sQ0FBQ21FLFNBQVAsQ0FBaUJ1RCxXQUFqQixHQURnQixDQUVwRDs7QUFDQSxPQUFLL0ksWUFBTCxHQUFvQixLQUFLZixjQUF6QjtBQUNBLE9BQUtQLFVBQUwsR0FBa0IsS0FBS1UsZ0JBQXZCLENBSm9ELENBSVI7O0FBQzVDLE1BQUksS0FBS0EsZ0JBQUwsSUFBeUIzQixTQUFTLENBQUNLLFFBQXZDLEVBQWlEO0FBQzdDdUQsSUFBQUEsTUFBTSxDQUFDNkMsS0FBUCxDQUFhZ0IsZUFBYixDQUE2QixLQUFLakcsY0FBbEM7QUFDQW9DLElBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYW1CLGNBQWIsR0FBOEJzQixJQUE5QixDQUFtQyxZQUFNO0FBQ3JDLFVBQUlNLE1BQU0sR0FBRyxNQUFJLENBQUN2RyxXQUFMLEVBQWI7O0FBQ0EsVUFBSXVHLE1BQUosRUFBWTVGLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDLElBQWhDO0FBQ2YsS0FIRDtBQUlILEdBTkQsTUFNTztBQUNIO0FBQ0E1RixJQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWFRLHdCQUFiO0FBQ0g7QUFDSixDQWZEO0FBaUJBOzs7Ozs7QUFJQTdILElBQUksQ0FBQ3dELDZCQUFMLEdBQXFDLFVBQVVvQyxJQUFWLEVBQWdCO0FBQ2pEO0FBQ0FqRSxFQUFBQSxPQUFPLENBQUMwQyxHQUFSLENBQVksK0JBQVo7QUFDSCxDQUhEO0FBS0E7Ozs7OztBQUlBckUsSUFBSSxDQUFDaUQsK0JBQUwsR0FBdUMsVUFBVTJDLElBQVYsRUFBZ0I7QUFDbkQ7QUFDQSxPQUFLdkYsY0FBTCxHQUFzQnVGLElBQUksQ0FBQ3VDLE1BQUwsR0FBY3ZDLElBQUksQ0FBQ3VDLE1BQW5CLEdBQTRCLEtBQUs5SCxjQUF2RDtBQUNILENBSEQ7O0FBTUFMLElBQUksQ0FBQ2tELGVBQUwsR0FBdUIsWUFBWTtBQUMvQlYsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVzSCxJQUFmLENBQW9CLFlBQXBCO0FBQ0EsT0FBSzdJLGFBQUwsR0FBcUIxQixlQUFlLENBQUNHLE1BQXJDLENBRitCLENBRXFCOztBQUNwRCxPQUFLa0ssUUFBTCxHQUgrQixDQUkvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsQ0FURDtBQVdBOzs7OztBQUdBN0osSUFBSSxDQUFDeUQsMkJBQUwsR0FBbUMsVUFBVTBHLE9BQVYsRUFBbUI7QUFBQTs7QUFDbEQsT0FBSy9KLGNBQUwsR0FBc0IsS0FBS1ksTUFBM0I7QUFDQSxPQUFLVCxnQkFBTCxHQUF3QjNCLFNBQVMsQ0FBQ0UsSUFBbEM7QUFDQSxPQUFLNkIsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQTZCLEVBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYWdCLGVBQWIsQ0FBNkIsS0FBS2pHLGNBQWxDO0FBQ0FvQyxFQUFBQSxNQUFNLENBQUM2QyxLQUFQLENBQWFtQixjQUFiLEdBQThCc0IsSUFBOUIsQ0FBbUMsWUFBTTtBQUNyQyxRQUFJTSxNQUFNLEdBQUcsTUFBSSxDQUFDaEgsWUFBTCxFQUFiOztBQUNBLFFBQUlnSCxNQUFKLEVBQVk1RixNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYsQ0FBd0JtRSxNQUF4QixFQUFnQztBQUFFK0IsTUFBQUEsT0FBTyxFQUFFQTtBQUFYLEtBQWhDO0FBQ2YsR0FIRDtBQUlILENBVEQ7QUFZQTs7Ozs7QUFHQW5LLElBQUksQ0FBQ29LLFdBQUwsR0FBbUIsWUFBWTtBQUMzQixPQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsT0FBS3pKLFNBQUwsR0FBaUJ6QixTQUFTLENBQUNFLFlBQTNCO0FBQ0FtRCxFQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWFpRCxhQUFiOztBQUNBLE1BQUlsQyxNQUFNLEdBQUcsS0FBS3RHLFdBQUwsRUFBYjs7QUFDQSxNQUFJc0csTUFBSixFQUFZO0FBQ1I1RixJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYsQ0FBd0JtRSxNQUF4QixFQUFnQztBQUFFbUMsTUFBQUEsUUFBUSxFQUFFO0FBQVosS0FBaEM7QUFDSDtBQUNKLENBUkQ7QUFTQTs7Ozs7QUFHQXZLLElBQUksQ0FBQ3dLLGtCQUFMLEdBQTBCLFVBQVVDLEtBQVYsRUFBaUJyRyxHQUFqQixFQUFzQjtBQUM1QyxPQUFLeEQsU0FBTCxHQUFpQnpCLFNBQVMsQ0FBQ0csV0FBM0I7QUFDQSxPQUFLYyxjQUFMLEdBQXNCcUssS0FBdEI7QUFDQSxPQUFLOUosZ0JBQUwsR0FBd0J5RCxHQUF4QjtBQUNBNUIsRUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhaUQsYUFBYjs7QUFDQSxNQUFJbEMsTUFBTSxHQUFHLEtBQUt0RyxXQUFMLEVBQWI7O0FBQ0EsTUFBSXNHLE1BQUosRUFBWTtBQUNSNUYsSUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCbUUsTUFBeEIsRUFBZ0M7QUFBRW1DLE1BQUFBLFFBQVEsRUFBRTtBQUFaLEtBQWhDO0FBQ0g7QUFDSixDQVREO0FBVUE7Ozs7OztBQUlBdkssSUFBSSxDQUFDNkosUUFBTCxHQUFnQixZQUF3QjtBQUFBLE1BQWRVLFFBQWMsdUVBQUgsQ0FBRztBQUNwQyxPQUFLM0osU0FBTCxHQUFpQnpCLFNBQVMsQ0FBQ0MsSUFBM0I7O0FBQ0EsTUFBSWdKLE1BQU0sR0FBRyxLQUFLdEcsV0FBTCxFQUFiOztBQUNBLE1BQUlzRyxNQUFKLEVBQVk7QUFDUjVGLElBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYWlELGFBQWI7QUFDQTlILElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDO0FBQUVtQyxNQUFBQSxRQUFRLEVBQUVBO0FBQVosS0FBaEM7QUFDSDtBQUNKLENBUEQ7QUFRQTs7Ozs7QUFHQXZLLElBQUksQ0FBQ3VELHlCQUFMLEdBQWlDLFlBQVk7QUFDekNmLEVBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYXFELGNBQWI7QUFDQSxPQUFLQyxlQUFMOztBQUVBLE1BQUksS0FBSy9KLFNBQUwsS0FBbUJ6QixTQUFTLENBQUNFLFlBQWpDLEVBQStDO0FBQzNDLFFBQUkyQixNQUFNLEdBQUcsS0FBS1osY0FBbEI7QUFBQSxRQUNJYSxPQUFPLEdBQUcsS0FBS1QsZUFEbkI7QUFFQSxTQUFLOEQsWUFBTDtBQUNBLFNBQUt4RSxTQUFMO0FBQ0EwQyxJQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWF1RCxvQkFBYjs7QUFFQSxRQUFJcEksTUFBTSxDQUFDcUkscUJBQVgsRUFBa0M7QUFDOUJySSxNQUFBQSxNQUFNLENBQUN4QyxJQUFQLENBQVlrRSxpQkFBWixDQUE4QmxELE1BQTlCLEVBQXNDQyxPQUF0QztBQUNILEtBRkQsTUFFTztBQUNIdUIsTUFBQUEsTUFBTSxDQUFDeEMsSUFBUCxDQUFZd0UsZUFBWixDQUE0QnhELE1BQTVCLEVBQW9DQyxPQUFwQztBQUNIO0FBQ0osR0FaRCxNQVlPLElBQUksS0FBS0wsU0FBTCxLQUFtQnpCLFNBQVMsQ0FBQ0csV0FBakMsRUFBOEM7QUFDakQsUUFBSSxLQUFLcUIsZ0JBQUwsSUFBeUIsSUFBN0IsRUFBbUM7QUFFL0IsV0FBS21LLFVBQUwsQ0FBZ0IsS0FBSzFLLGNBQXJCLEVBQXFDLEtBQUtPLGdCQUExQztBQUNIO0FBQ0osR0FMTSxNQUtBLElBQUksS0FBS0MsU0FBTCxLQUFtQnpCLFNBQVMsQ0FBQ0ksb0JBQWpDLEVBQXVEO0FBRTFELFNBQUt3TCxjQUFMLENBQW9CLEtBQUszSyxjQUF6QjtBQUNILEdBSE0sTUFHQTtBQUNILFNBQUtrSSxZQUFMO0FBQ0g7QUFDSixDQTNCRDtBQTRCQTs7Ozs7QUFHQXRJLElBQUksQ0FBQzZDLGFBQUwsR0FBcUIsWUFBWTtBQUFBOztBQUM3QkwsRUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhcUIsVUFBYixDQUF3QixFQUF4QixFQUE0QixTQUE1QixFQUF1QyxZQUFNO0FBQ3pDbEcsSUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhcUQsY0FBYjtBQUNBLFFBQUksQ0FBQy9MLFNBQVMsQ0FBQyxNQUFJLENBQUN5QixjQUFOLENBQWQsRUFBcUMsTUFBSSxDQUFDa0ksWUFBTCxHQUFyQyxLQUNLOUYsTUFBTSxDQUFDQyxPQUFQLENBQWVzSCxJQUFmLFdBQXVCM0wsY0FBYyxDQUFDLE1BQUksQ0FBQ2dDLGNBQU4sQ0FBckM7QUFDUixHQUpEO0FBS0gsQ0FORDtBQVFBOzs7OztBQUdBSixJQUFJLENBQUMrQyxxQkFBTCxHQUE2QixVQUFVcUIsR0FBVixFQUFlO0FBQUE7O0FBQ3hDLE1BQUksQ0FBQyxLQUFLL0QsY0FBTCxJQUF1QitELEdBQUcsQ0FBQzRHLFNBQTNCLElBQXdDLEtBQUszSyxjQUFMLElBQXVCLENBQWhFLEtBQXNFLEtBQUtFLGdCQUFMLElBQXlCM0IsU0FBUyxDQUFDTSxJQUE3RyxFQUFtSDtBQUMvR3NELElBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYUUsVUFBYixDQUF3QixFQUF4QixFQUE0Qi9FLE1BQU0sQ0FBQ2dGLElBQVAsQ0FBWUMsSUFBWixDQUFpQndELFVBQWpCLENBQTRCdEQsTUFBNUIsQ0FBbUN2RCxHQUFHLENBQUM4RyxRQUF2QyxDQUE1QixFQUE4RSxZQUFNO0FBQ2hGLFVBQUksT0FBSSxDQUFDN0ssY0FBTCxJQUF1QitELEdBQUcsQ0FBQzRHLFNBQS9CLEVBQTBDO0FBQ3RDLFFBQUEsT0FBSSxDQUFDcEssU0FBTCxHQUFpQnpCLFNBQVMsQ0FBQ0ksb0JBQTNCO0FBQ0EsUUFBQSxPQUFJLENBQUNhLGNBQUwsR0FBc0JnRSxHQUFHLENBQUNwRCxNQUExQjtBQUNBLFFBQUEsT0FBSSxDQUFDTixlQUFMLEdBQXVCMEQsR0FBRyxDQUFDK0YsT0FBM0I7QUFDQTNILFFBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYWlELGFBQWI7O0FBQ0EsWUFBSWxDLE1BQU0sR0FBRyxPQUFJLENBQUN0RyxXQUFMLEVBQWI7O0FBQ0EsWUFBSXNHLE1BQUosRUFBWTVGLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDO0FBQUVtQyxVQUFBQSxRQUFRLEVBQUU7QUFBWixTQUFoQztBQUNmLE9BUEQsTUFPTyxJQUFJLE9BQUksQ0FBQ2xLLGNBQUwsSUFBdUIsQ0FBM0IsRUFBOEI7QUFDakMsUUFBQSxPQUFJLENBQUNELGNBQUwsR0FBc0JnRSxHQUFHLENBQUNwRCxNQUExQjtBQUNBLFFBQUEsT0FBSSxDQUFDTixlQUFMLEdBQXVCMEQsR0FBRyxDQUFDK0YsT0FBM0I7O0FBQ0EsUUFBQSxPQUFJLENBQUNZLGNBQUwsQ0FBb0IsT0FBSSxDQUFDM0ssY0FBekI7QUFDSCxPQUpNLE1BSUE7QUFDSG9DLFFBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYThELFlBQWIsQ0FBMEIzSSxNQUFNLENBQUNnRixJQUFQLENBQVlDLElBQVosQ0FBaUIyRCxPQUEzQztBQUNIO0FBQ0osS0FmRDtBQWdCSDtBQUNKLENBbkJEO0FBcUJBOzs7OztBQUdBcEwsSUFBSSxDQUFDZ0YsV0FBTCxHQUFtQixZQUFZO0FBQzNCLE1BQUkxRCxRQUFRLEdBQUdrQixNQUFNLENBQUM2QyxLQUFQLENBQWFDLGdCQUFiLENBQThCLEtBQUtsRixjQUFuQyxDQUFmO0FBQ0EsTUFBSSxDQUFDa0IsUUFBTCxFQUFlOztBQUNmLE1BQUk7QUFDQStKLElBQUFBLE9BQU8sV0FBSS9KLFFBQUosV0FBUCxDQUE0QmdLLFdBQTVCO0FBQ0gsR0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSNUosSUFBQUEsT0FBTyxDQUFDNkosSUFBUixDQUFhRCxDQUFiO0FBQ0g7QUFDSixDQVJEO0FBU0E7Ozs7O0FBR0F2TCxJQUFJLENBQUNzRSxZQUFMLEdBQW9CLFlBQVk7QUFDNUIsTUFBSWhELFFBQVEsR0FBR2tCLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYUMsZ0JBQWIsQ0FBOEIsS0FBS2xGLGNBQW5DLENBQWY7QUFDQSxNQUFJLENBQUNrQixRQUFMLEVBQWU7QUFDZkssRUFBQUEsT0FBTyxDQUFDMEMsR0FBUixDQUFZLHdDQUFaOztBQUNBLE1BQUk7QUFDQWdILElBQUFBLE9BQU8sV0FBSS9KLFFBQUosV0FBUCxDQUE0QjRILE9BQTVCO0FBQ0gsR0FGRCxDQUVFLE9BQU9xQyxDQUFQLEVBQVU7QUFDUjVKLElBQUFBLE9BQU8sQ0FBQzZKLElBQVIsQ0FBYUQsQ0FBYjtBQUNIO0FBQ0osQ0FURDs7QUFZQXZMLElBQUksQ0FBQ3lMLGdCQUFMLEdBQXdCLFlBQVk7QUFDaEMsT0FBS25ILFlBQUw7QUFDQTlCLEVBQUFBLE1BQU0sQ0FBQ2tKLE1BQVAsQ0FBYzVMLFNBQWQ7QUFDSCxDQUhEO0FBTUE7Ozs7O0FBR0FFLElBQUksQ0FBQzhLLFVBQUwsR0FBa0IsVUFBVTlKLE1BQVYsRUFBa0JvRCxHQUFsQixFQUF1QjtBQUNyQyxNQUFJZ0UsTUFBTSxHQUFHLEtBQUtoRyxhQUFMLENBQW1CcEIsTUFBbkIsQ0FBYjs7QUFDQSxPQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxNQUFJb0gsTUFBSixFQUFZNUYsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCbUUsTUFBeEIsRUFBZ0NoRSxHQUFoQztBQUNmLENBSkQ7QUFNQTs7Ozs7QUFHQXBFLElBQUksQ0FBQzJMLFFBQUwsR0FBZ0IsWUFBWTtBQUFBOztBQUN4Qm5KLEVBQUFBLE1BQU0sQ0FBQzZDLEtBQVAsQ0FBYWdCLGVBQWIsQ0FBNkIsS0FBS2pHLGNBQWxDO0FBQ0FvQyxFQUFBQSxNQUFNLENBQUM2QyxLQUFQLENBQWFtQixjQUFiLEdBQThCc0IsSUFBOUIsQ0FBbUMsWUFBTTtBQUNyQyxRQUFJTSxNQUFNLEdBQUcsT0FBSSxDQUFDaEgsWUFBTCxFQUFiOztBQUNBLFFBQUlnSCxNQUFKLEVBQVk1RixNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYsQ0FBd0JtRSxNQUF4QixFQUFnQztBQUFFK0IsTUFBQUEsT0FBTyxFQUFFLE9BQUksQ0FBQ3pKO0FBQWhCLEtBQWhDO0FBQ2YsR0FIRDtBQUlILENBTkQ7QUFRQTs7Ozs7QUFHQVYsSUFBSSxDQUFDNEwsa0JBQUwsR0FBMEIsVUFBVXhILEdBQVYsRUFBZTtBQUNyQyxPQUFLMUQsZUFBTCxHQUF1QjBELEdBQUcsQ0FBQytGLE9BQTNCO0FBQ0EzSCxFQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWVDLFFBQWYscUNBQTRERyxHQUE1RDtBQUNILENBSEQ7QUFLQTs7Ozs7QUFHQXBFLElBQUksQ0FBQ2dELGdDQUFMLEdBQXdDLFVBQVVvQixHQUFWLEVBQWU7QUFDbkQsTUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkIsT0FBT3pDLE9BQU8sQ0FBQ0MsS0FBUiw2Q0FBbUR3QyxHQUFuRCxFQUFQO0FBQzdCLE9BQUtoRSxjQUFMLEdBQXNCZ0UsR0FBdEI7QUFDQSxPQUFLN0QsZ0JBQUwsR0FBd0IzQixTQUFTLENBQUNFLElBQWxDO0FBRUEwRCxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZXNILElBQWYsQ0FBb0Isb0JBQXBCLEVBQTBDO0FBQUUvSSxJQUFBQSxNQUFNLEVBQUVvRDtBQUFWLEdBQTFDO0FBQ0gsQ0FORDtBQVFBOzs7OztBQUdBcEUsSUFBSSxDQUFDK0ssY0FBTCxHQUFzQixVQUFVL0osTUFBVixFQUFrQjtBQUFBOztBQUNwQyxPQUFLOEYsY0FBTCxDQUFvQjlGLE1BQXBCLEVBQTRCOEcsSUFBNUIsQ0FBaUMsWUFBTTtBQUNuQyxRQUFLdEYsTUFBTSxDQUFDc0gsSUFBUCxDQUFZK0IsVUFBWixJQUEwQixDQUExQixJQUErQnJKLE1BQU0sQ0FBQ3NILElBQVAsQ0FBWWdDLElBQVosSUFBb0IsQ0FBcEQsSUFBMER0SixNQUFNLENBQUNzSCxJQUFQLENBQVlpQyxPQUFaLElBQXVCLENBQXJGLEVBQXdGO0FBQ3BGdkosTUFBQUEsTUFBTSxDQUFDNkUsS0FBUCxDQUFhRSxVQUFiLENBQXdCLEVBQXhCLEVBQTRCL0UsTUFBTSxDQUFDZ0YsSUFBUCxDQUFZQyxJQUFaLENBQWlCa0IsZ0JBQTdDLEVBQStELFlBQU07QUFBRW5HLFFBQUFBLE1BQU0sQ0FBQzZFLEtBQVAsQ0FBYXVCLFdBQWI7QUFBNEIsT0FBbkcsRUFBcUcsWUFBTSxDQUFHLENBQTlHLEVBQWdILE1BQWhILEVBQXdILE1BQXhIO0FBQ0E7QUFDSCxLQUprQyxDQUtuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFFBQUlSLE1BQU0sR0FBRyxPQUFJLENBQUNqRyxpQkFBTCxDQUF1Qm5CLE1BQXZCLENBQWI7O0FBQ0EsUUFBSW9ILE1BQUosRUFBWTVGLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qm1FLE1BQXhCLEVBQWdDO0FBQUUrQixNQUFBQSxPQUFPLEVBQUUsT0FBSSxDQUFDeko7QUFBaEIsS0FBaEM7QUFDZixHQWRELFdBY1MsWUFBTSxDQUFHLENBZGxCO0FBZUgsQ0FoQkQ7QUFtQkE7Ozs7O0FBR0FWLElBQUksQ0FBQzBELCtCQUFMLEdBQXVDLFVBQVVVLEdBQVYsRUFBZTtBQUNsRCxPQUFLRSxZQUFMO0FBQ0EsT0FBS3FILFFBQUw7QUFDSCxDQUhEO0FBS0E7Ozs7Ozs7O0FBTUEzTCxJQUFJLENBQUNnTSxhQUFMLEdBQXFCLFVBQVVDLE1BQVYsRUFBa0JoTCxPQUFsQixFQUEyQmlMLElBQTNCLEVBQWlDO0FBQ2xEMUosRUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCLG9CQUF4QixFQUE4QztBQUFFNUMsSUFBQUEsTUFBTSxFQUFFNEssTUFBVjtBQUFrQjlILElBQUFBLE9BQU8sRUFBRWxEO0FBQTNCLEdBQTlDLEVBQW9GLFVBQUMrRSxLQUFELEVBQVE1QixHQUFSLEVBQWdCO0FBQ2hHOEgsSUFBQUEsSUFBSTtBQUNQLEdBRkQ7QUFHSCxDQUpEO0FBS0E7Ozs7O0FBR0FsTSxJQUFJLENBQUM0QyxlQUFMLEdBQXVCLFlBQVk7QUFDL0IsTUFBSTlCLFdBQVcsR0FBR3FMLElBQUksQ0FBQ0MsR0FBTCxHQUFXQyxRQUFYLEdBQXNCQyxTQUF0QixDQUFnQyxDQUFoQyxDQUFsQjs7QUFDQSxNQUFJeEwsV0FBVyxHQUFHLEtBQUtBLFdBQW5CLElBQWtDMEIsTUFBTSxDQUFDK0osTUFBUCxDQUFjQyxXQUFwRCxFQUFpRTtBQUM3RGhLLElBQUFBLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZXlJLFVBQWY7QUFDSDtBQUNKLENBTEQ7O0FBTUF6TSxJQUFJLENBQUMyQyxlQUFMLEdBQXVCLFlBQVk7QUFDL0IsT0FBSzdCLFdBQUwsR0FBbUJxTCxJQUFJLENBQUNDLEdBQUwsR0FBV0MsUUFBWCxHQUFzQkMsU0FBdEIsQ0FBZ0MsQ0FBaEMsQ0FBbkI7QUFDSCxDQUZEO0FBR0E7Ozs7OztBQUlBdE0sSUFBSSxDQUFDME0sUUFBTCxHQUFnQixVQUFVQyxJQUFWLEVBQWdCO0FBQUE7O0FBQzVCbkssRUFBQUEsTUFBTSxDQUFDd0IsT0FBUCxDQUFlQyxRQUFmLENBQXdCLGVBQXhCLEVBQXlDO0FBQUUsWUFBUTBJO0FBQVYsR0FBekMsRUFBMkQsVUFBQzNHLEtBQUQsRUFBUTVCLEdBQVIsRUFBZ0I7QUFDdkUsUUFBSXdCLElBQUksR0FBR3hCLEdBQUcsQ0FBQ3ZELEtBQWY7QUFDQSxRQUFJK0wsS0FBSyxHQUFHaEgsSUFBSSxDQUFDaUgsTUFBakI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixLQUFwQixFQUEyQkUsQ0FBQyxFQUE1QixFQUFnQztBQUM1QixVQUFJaEQsSUFBSSxHQUFHbEUsSUFBSSxDQUFDa0gsQ0FBRCxDQUFmO0FBQ0EsTUFBQSxPQUFJLENBQUNqTSxLQUFMLENBQVdpSixJQUFJLENBQUMsSUFBRCxDQUFmLElBQXlCQSxJQUF6QjtBQUNIOztBQUNEdEgsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVzSCxJQUFmLENBQW9CLGFBQXBCO0FBQ0gsR0FSRDtBQVNILENBVkQ7QUFXQTs7Ozs7OztBQUtBL0osSUFBSSxDQUFDNkcsR0FBTCxHQUFXLFVBQVVwRixHQUFWLEVBQWVzTCxLQUFmLEVBQXNCO0FBQzdCLE9BQUt0TCxHQUFMLElBQVlzTCxLQUFaO0FBQ0gsQ0FGRDtBQUdBOzs7Ozs7O0FBS0EvTSxJQUFJLENBQUMwRyxHQUFMLEdBQVcsVUFBVWpGLEdBQVYsRUFBZTtBQUN0QixTQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNILENBRkQ7O0FBR0F6QixJQUFJLENBQUNnTixlQUFMLEdBQXVCLFVBQVUzTCxNQUFWLEVBQWtCO0FBQ3JDLE1BQUkrQixJQUFJLEdBQUdoRixjQUFjLENBQUNpRCxNQUFELENBQXpCO0FBQ0EsU0FBTytCLElBQVA7QUFDSCxDQUhEOztBQUlBcEQsSUFBSSxDQUFDaU4saUJBQUwsR0FBeUIsWUFBWTtBQUNqQyxTQUFPN08sY0FBUDtBQUNILENBRkQ7O0FBR0E0QixJQUFJLENBQUNrTixlQUFMLEdBQXVCLFVBQVU3TCxNQUFWLEVBQWtCO0FBQ3JDLE1BQUkrQixJQUFJLEdBQUcvRSxjQUFjLENBQUNnRCxNQUFELENBQXpCO0FBQ0EsU0FBTytCLElBQVA7QUFDSCxDQUhEOztBQUtBcEQsSUFBSSxDQUFDbU4sY0FBTCxHQUFzQixVQUFVaEosT0FBVixFQUFtQjtBQUNyQyxTQUFPNUYsUUFBUSxDQUFDNEYsT0FBRCxDQUFmO0FBQ0gsQ0FGRDs7QUFJQW5FLElBQUksQ0FBQzJLLGVBQUwsR0FBdUIsWUFBWTtBQUMvQixPQUFLeEosWUFBTCxHQUFvQixDQUFwQjtBQUNILENBRkQ7O0FBSUFuQixJQUFJLENBQUNvTixhQUFMLEdBQXFCLFlBQVk7QUFDN0IsU0FBTyxLQUFLdk4sVUFBWjtBQUNILENBRkQ7O0FBSUFHLElBQUksQ0FBQ3FOLGlCQUFMLEdBQXlCLFlBQVk7QUFDakMsU0FBTyxLQUFLeE4sVUFBTCxLQUFvQmpCLFNBQVMsQ0FBQ0UsSUFBckM7QUFDSCxDQUZELEVBR0E7OztBQUNBa0IsSUFBSSxDQUFDc04sY0FBTCxHQUFzQixZQUFVO0FBQzVCLFNBQU85SyxNQUFNLENBQUM2QyxLQUFQLENBQWFrSSxVQUFiLE1BQTZCL0ssTUFBTSxDQUFDNkMsS0FBUCxDQUFhbUksV0FBYixFQUFwQztBQUNILENBRkQsRUFLQTs7O0FBQ0F4TixJQUFJLENBQUN5TixpQkFBTCxHQUF5QixZQUFZO0FBRWpDLE1BQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjbkwsTUFBTSxDQUFDOEQsUUFBUCxDQUFnQnNILEtBQTlCLEVBSGlDLENBR2U7O0FBQ2hERixFQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBY25MLE1BQU0sQ0FBQzhELFFBQVAsQ0FBZ0J1SCxLQUE5QixFQUppQyxDQUllOztBQUNoREgsRUFBQUEsUUFBUSxDQUFDQyxJQUFULENBQWNuTCxNQUFNLENBQUM4RCxRQUFQLENBQWdCd0gsT0FBOUIsRUFMaUMsQ0FLZTs7QUFDaERKLEVBQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjbkwsTUFBTSxDQUFDOEQsUUFBUCxDQUFnQnlILEtBQTlCLEVBTmlDLENBTWU7O0FBQ2hETCxFQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FBY25MLE1BQU0sQ0FBQzhELFFBQVAsQ0FBZ0IwSCxLQUE5QixFQVBpQyxDQU9lOztBQUVoRCxTQUFPTixRQUFRLENBQUNPLE9BQVQsQ0FBaUJ6TCxNQUFNLENBQUM2QyxLQUFQLENBQWFtSSxXQUFiLEVBQWpCLElBQStDLENBQUMsQ0FBdkQsQ0FUaUMsQ0FTbUM7QUFDdkUsQ0FWRDs7QUFZQVUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDekIsTUFBSSxDQUFDak8sVUFBTCxFQUFpQjtBQUNiQSxJQUFBQSxVQUFVLEdBQUcsSUFBSU4sSUFBSixFQUFiO0FBQ0g7O0FBQ0QsU0FBT00sVUFBUDtBQUNILENBTEQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vL+S4juacjeWKoeerr+WvueW6lOi3r+eUsVxyXG5jb25zdCBTZXJ2ZXJHYW1lTmFtZSA9IHtcclxuICAgIDE1OiBcInpqaFwiLCAxODogXCJxem5uXCIsIDIyOiBcImJybm5cIiwgMjc6IFwic2dcIiwgMjg6IFwiaGhcIiwgMjk6IFwic2dqXCIsIDMwOiBcImxoZFwiLCAzMTogXCJsYjc3N1wiLCAzMjogXCJiamxcIixcclxuICAgIDMzOiBcInBqXCIsIDM0OiBcInh5ZHpwXCIsIDM1OiBcImR6cGtcIiwgMzY6IFwiZGR6XCIsIDM3OiBcImpzempoXCIsIDM5OiBcImViZ1wiLCAzODogXCJlc3lkXCIsIDQwOiBcImZpc2hcIiwgNDE6IFwicWhiamxcIixcclxuICAgIDQyOiBcInNzc1wiLCA0MzogXCJoY3B5XCIsIDQ0OiBcInNsd2hcIiwgNDY6IFwicXpubjJcIiwgNDc6IFwidGJcIiwgNDg6IFwiaGJzbFwiLFxyXG4gICAgNDU6IFwicXpubmNcIiwgNDk6IFwiZmlzaDJcIiwgNTA6IFwiZmlzaDNcIlxyXG59XHJcbi8vIOa4uOaIj+WQjeensO+8jOeUqOS6jueoi+W6j+aJk+Wtl1xyXG5jb25zdCBTZXJ2ZXJHYW1lRGljdCA9IHtcclxuICAgIDE1OiBcIueCuOmHkeiKsVwiLCAxODogXCLmiqLluoTniZvniZtcIiwgMjI6IFwi55m+5Lq654mb54mbXCIsIDI3OiBcIuS4ieWFrFwiLCAyODogXCLnuqLpu5HlpKfmiJhcIiwgMjk6IFwi5rC05p6c5py6XCIsXHJcbiAgICAzMDogXCLpvpnomY7mlpdcIiwgMzE6IFwi5ouJ6Zy4XCIsIDMyOiBcIueZvuWutuS5kFwiLCAzMzogXCLmiqLluoTniYzkuZ1cIiwgMzQ6IFwi6L2u55uYXCIsIDM1OiBcIuW+t+W3nuaJkeWFi1wiLFxyXG4gICAgMzY6IFwi5paX5Zyw5Li7XCIsIDM3OiBcIuaegemAn+eCuOmHkeiKsVwiLCAzODogXCLkuozljYHkuIDngrlcIiwgMzk6IFwi5LqM5YWr5p2gXCIsIDQwOiBcIuaNlemxvFwiLCA0MTogXCLnuqLljIXmjqXpvplcIixcclxuICAgIDQyOiBcIuWNgeS4ieawtFwiLCA0MzogXCLosarovabmvILnp7tcIiwgNDQ6IFwi5qOu5p6X6Iie5LyaXCIsIDQ2OiBcIueci+eJjOaKouW6hFwiLCA0NzogXCLpqrDlrp1cIiwgNDg6IFwi57qi5YyF5omr6Zu3XCIsXHJcbiAgICA0NTogXCLnnIvniYzmiqLluoRcIiwgNDk6IFwi6LSi56We5o2V6bG8XCIsIDUwOiBcIui0ouelnuaNlemxvFwiXHJcbn1cclxuY29uc3QgQkVUX1RZUEVfTElTVCA9IHtcclxuICAgIDE1OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIsIDk5OiBcIuS9k+mqjOaIv1wiIH0sXHJcbiAgICAxODogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiLCA5OTogXCLkvZPpqozmiL9cIiB9LFxyXG4gICAgMjI6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiB9LFxyXG4gICAgMjc6IHsgMTogXCLmma7pgJrlnLpcIiwgMjogXCLotLXlrr7lnLpcIiwgMzogXCLlr4zosarlnLpcIiwgNDogXCLoh7PlsIrlnLpcIiwgNTogXCLoi7Hpm4TlnLpcIiwgOTk6IFwi5L2T6aqM5Zy6XCIgfSxcclxuICAgIDI4OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIgfSxcclxuICAgIDI5OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIgfSxcclxuICAgIDMwOiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIgfSxcclxuICAgIDMyOiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIgfSxcclxuICAgIDMzOiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIsIDk5OiBcIuS9k+mqjOaIv1wiIH0sXHJcbiAgICAzNDogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiIH0sXHJcbiAgICAzNTogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiLCA5OTogXCLkvZPpqozmiL9cIiB9LFxyXG4gICAgMzY6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiwgOTk6IFwi5L2T6aqM5oi/XCIgfSxcclxuICAgIDM3OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIsIDk5OiBcIuS9k+mqjOaIv1wiIH0sXHJcbiAgICAzODogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiLCA5OTogXCLkvZPpqozmiL9cIiB9LFxyXG4gICAgMzk6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiwgOTk6IFwi5L2T6aqM5oi/XCIgfSxcclxuICAgIDQwOiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIsIDk5OiBcIuS9k+mqjOaIv1wiIH0sXHJcbiAgICA0MTogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiIH0sXHJcbiAgICA0MjogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiLCA5OTogXCLkvZPpqozmiL9cIiB9LFxyXG4gICAgNDM6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiB9LFxyXG4gICAgNDQ6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiB9LFxyXG4gICAgNDY6IHsgMTogXCLmma7pgJrmiL9cIiwgMjogXCLotLXlrr7miL9cIiwgMzogXCLlr4zosarmiL9cIiwgNDogXCLoh7PlsIrmiL9cIiwgNTogXCLoi7Hpm4TmiL9cIiwgOTk6IFwi5L2T6aqM5oi/XCIgfSxcclxuICAgIDQ4OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIgfSxcclxuICAgIDQ5OiB7IDE6IFwi5pmu6YCa5oi/XCIsIDI6IFwi6LS15a6+5oi/XCIsIDM6IFwi5a+M6LGq5oi/XCIsIDQ6IFwi6Iez5bCK5oi/XCIsIDU6IFwi6Iux6ZuE5oi/XCIsIDk5OiBcIuS9k+mqjOaIv1wiIH0sXHJcbiAgICA1MDogeyAxOiBcIuaZrumAmuaIv1wiLCAyOiBcIui0teWuvuaIv1wiLCAzOiBcIuWvjOixquaIv1wiLCA0OiBcIuiHs+WwiuaIv1wiLCA1OiBcIuiLsembhOaIv1wiLCA5OTogXCLkvZPpqozmiL9cIiB9LFxyXG59XHJcbi8vIOaIv+mXtOaho+asoVxyXG5jb25zdCBCRVRfVFlQRSA9IHtcclxuICAgIDE6ICfliJ3nuqfmiL8nLFxyXG4gICAgMjogJ+S4ree6p+aIvycsXHJcbiAgICAzOiAn6auY57qn5oi/JyxcclxuICAgIDQ6ICfotLXlrr7miL8nLFxyXG4gICAgNTogJ+WvjOixquaIvycsXHJcbiAgICA5OTogJ+S9k+mqjOaIvydcclxufVxyXG4vLyDnmb7kurrlnLrmuLjmiI9cclxuY29uc3QgSFVORFJFX0dBTUUgPSB7XHJcbiAgICAyMjogXCJicm5uXCIsIDI4OiBcImhoXCIsIDI5OiBcInNnalwiLCAzMDogXCJsaGRcIiwgMzI6IFwiYmpsXCIsIDQzOiBcImhjcHlcIiwgMzQ6IFwieHlkenBcIiwgNDE6IFwicWhiamxcIiwgNDQ6IFwic2x3aFwiLCA0ODogXCJoYnNsXCJcclxufVxyXG4vL+eZvuS6uuWcuui1sOaIv+mXtOWcuuaooeW8j1xyXG5jb25zdCBIVU5EUkVEU19ST09NX0dBTUUgPSB7XHJcbiAgICA0NDogXCJzbHdoXCIsIDQxOiBcInFoYmpsXCIsIDQzOiBcImhjcHlcIiwgNDg6IFwiaGJzbFwiXHJcbn1cclxuXHJcbi8v5o2V6bG85oi/6Ze05Zy65qih5byPXHJcbmNvbnN0IEZJU0hfUk9PTV9HQU1FID0ge1xyXG4gICAgNDA6IFwiZmlzaFwiLCA0OTogXCJuZmlzaFwiLCA1MDogXCJsZmlzaFwiXHJcbn1cclxuLy8g5oi/6Ze05Zy65ri45oiPXHJcbmNvbnN0IFJPT01fR0FNRSA9IHtcclxuICAgIDQ1OiBcInF6bm5jXCJcclxufVxyXG4vLyDmiL/pl7TnsbvlnotcclxuY29uc3QgUk9PTV9UWVBFID0ge1xyXG4gICAgR09MRDogMSwgICAgICAgICAgICAvL+mHkeW4geWcuuexu+Wei1xyXG4gICAgQ0FSRDogMiwgICAgICAgICAgICAvL+aIv+mXtOWcuu+8iOmSu+efs+eJiOaIv+WNoe+8iVxyXG4gICAgQ0xVQjogMywgICAgICAgICAgICAvL+S/seS5kOmDqFxyXG4gICAgTUFUQ0g6IDQsICAgICAgICAgICAvL+avlOi1m+aIv+mXtFxyXG4gICAgSFVORFJFRFM6IDUsICAgICAgICAvL+eZvuS6uuWcuuexu+Wei1xyXG4gICAgRklTSDogOTksICAgICAgICAgICAvL+aNlemxvOWcuuexu+Wei1xyXG59XHJcbi8vIOa4uOaIj+e7k+eul+WQjua4uOaIj+eKtuaAgVxyXG5jb25zdCBST09NX0VYSVQgPSB7XHJcbiAgICBCQVNFOiAwLCAgICAgICAgICAgICAgICAgICAgLy/mraPluLjnprvlvIDmiL/pl7RcclxuICAgIENIQU5HRV9UQUJMRTogMSwgICAgICAgICAgICAvL+aNouahjFxyXG4gICAgUkVDVVJfUk9VTkQ6IDIsICAgICAgICAgICAgIC8v5YaN5p2l5LiA5Zy65Yib5bu6XHJcbiAgICBJTlZJVEVfQU5PVEhFUl9ST1VORDogMywgICAgLy/lho3mnaXkuIDlnLrlj5HotbfliJvlu7pcclxufVxyXG4vLyDmuLjmiI/pgIDlh7rnirbmgIHnibnmrornirbmgIFcclxuY29uc3QgUk9PTV9FWElUX1NUQVRFID0ge1xyXG4gICAgU1RPUDogMCwgICAgICAgICAgICAvL+WFs+mXrVxyXG4gICAgQkFTRTogMSwgICAgICAgICAgICAvL+ato+W4uFxyXG4gICAgTUFJTlRFTkFOQ0U6IDIsICAgICAvL+e7tOaKpFxyXG4gICAgRk9SQklEOiA0LCAgICAgICAgICAvL+emgeatolxyXG59XHJcblxyXG5sZXQgUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudXBHYW1lVHlwZSA9IDA7XHJcbiAgICB0aGlzLnJlc2V0RGF0YSgpO1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbn0sXHJcbiAgICByb29tID0gUm9vbS5wcm90b3R5cGUsXHJcbiAgICBnX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbnJvb20ucmVzZXREYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5yb29taW5mbyA9IG51bGw7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gMDtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tSUQgPSAwO1xyXG4gICAgdGhpcy5jdXJFbnRlclJvb21TZXJ2ZXIgPSBcIlwiO1xyXG4gICAgdGhpcy5jdXJFbnRlclJvb21UeXBlID0gMDtcclxuICAgIHRoaXMuY3VyRW50ZXJCZXRUeXBlID0gMDtcclxuICAgIHRoaXMuY3VyRW50ZXJHYW1lUmFuayA9IG51bGw7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbU51bSA9IDA7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZURhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5leGl0U3RhdGUgPSBST09NX0VYSVQuQkFTRTtcclxuICAgIHRoaXMudXNlcnMgPSB7fTtcclxuICAgIHRoaXMuY3V0R2FtZVRpbWUgPSAwO1xyXG4gICAgdGhpcy5vcGVuTmV0Q3V0ID0gdHJ1ZTsgICAgICAvL+S9nOeUqOacjeWKoeWZqO+8jOWIhuacjeWFpeWPo1xyXG4gICAgdGhpcy5nYW1lSWQgPSBudWxsO1xyXG4gICAgdGhpcy5iZXRUeXBlID0gbnVsbDtcclxuICAgIHRoaXMuZXhpdFJvb21TdGF0ZSA9IDE7ICAgICAgICAgLy/liIfmjaLlh7rmiL/pl7TlkI7vvIzliKTlrprmmK/lkKbmnInkuIDkupvlvILluLjnirbmgIHvvIzlgZrorrDlvZUgMDrlhbPpl63vvIwx77ya5q2j5bi477yMMu+8mue7tOaKpFxyXG4gICAgdGhpcy5zZXJ2ZXJHYW1laWQgPSAwOyAgICAgICAgICAvL+aYr+WQpuW3suWcqOaIv+mXtOS4re+8iOW/hemhu2VudGVyUm9vbeWQjuiusOW9le+8jOW9k+aWree6v+WQjuivpeWAvOWwhuS7mOepuu+8iVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOi/m+WFpeaIv+mXtOeahOe9kee7nOWPguaVsFxyXG4gKi9cclxucm9vbS5nZXRFbnRlclJvb20gPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICBsZXQgZ2FtZWlkID0gZ2FtZUlkID8gZ2FtZUlkIDogdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIGxldCBnYW1lTmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBpZiAoIWdhbWVpZCB8fCAhZ2FtZU5hbWUpIHJldHVybjtcclxuICAgIGxldCBuZXRUdCA9IFwiXCJcclxuICAgIGlmICh0aGlzLm9wZW5OZXRDdXQgJiYgdGhpcy5jaGVja0h1bmRyZWRzUm9vbShnYW1laWQpKSBuZXRUdCA9IGAke2dhbWVOYW1lfVJvb20uJHtnYW1lTmFtZX1Sb29tSGFuZGxlci5lbnRlclJvb20yYDtcclxuICAgIGVsc2UgaWYgKHRoaXMub3Blbk5ldEN1dCkgbmV0VHQgPSBgJHtnYW1lTmFtZX1Sb29tLiR7Z2FtZU5hbWV9Um9vbUhhbmRsZXIuZW50ZXJSb29tYDtcclxuICAgIGVsc2UgbmV0VHQgPSBcImNvbm5lY3Rvci5lbnRyeUhhbmRsZXIuZW50ZXJSb29tXCI7XHJcbiAgICByZXR1cm4gbmV0VHQ7XHJcbn1cclxuLy/mo4Dmn6XmmK/lkKbkuLrotbDmiL/pl7TlnLrmqKHlvI/nmoTnmb7kurrlnLpcclxucm9vbS5jaGVja0h1bmRyZWRzUm9vbSA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcclxuICAgIGZvciAobGV0IGtleSBpbiBIVU5EUkVEU19ST09NX0dBTUUpIHtcclxuICAgICAgICBpZiAoa2V5ID09IGdhbWVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuLy/kvKDlhaXmuLjmiI9pZOWSjOaIv+mXtOetiee6p+iOt+WPluW9k+WJjeeahOaIv+mXtOetiee6p1xyXG5yb29tLmdldFJvb21UeXBlID0gZnVuY3Rpb24gKGdhbWVJZCwgYmV0VHlwZSA9IC0xKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhTZXJ2ZXJHYW1lRGljdFtnYW1lSWRdLCBiZXRUeXBlLCBCRVRfVFlQRV9MSVNUW2dhbWVJZF0pXHJcbiAgICBpZiAoIUJFVF9UWVBFX0xJU1RbZ2FtZUlkXSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGdhbWVpZDoke2dhbWVJZH0sIGJldFR5cGU6JHtiZXRUeXBlfSxnYW1lTmFtZToke1NlcnZlckdhbWVEaWN0W2dhbWVJZF19YClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBiZXRUeXBlID09IC0xID8gQkVUX1RZUEVfTElTVFtnYW1lSWRdIDogQkVUX1RZUEVfTElTVFtnYW1lSWRdW2JldFR5cGVdO1xyXG59XHJcbi8qKlxyXG4gKiDov5vlhaXmiL/pl7TnmoTlj4LmlbDphY3nva5cclxuICovXHJcbnJvb20uZ2V0SW5pdFJvb20gPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICBsZXQgZ2FtZWlkID0gZ2FtZUlkID8gZ2FtZUlkIDogdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIGxldCBnYW1lTmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBpZiAoIWdhbWVpZCB8fCAhZ2FtZU5hbWUpIHJldHVybjtcclxuICAgIGxldCBuZXRUdCA9IFwiXCJcclxuICAgIGlmICh0aGlzLm9wZW5OZXRDdXQpIG5ldFR0ID0gYCR7Z2FtZU5hbWV9Um9vbS4ke2dhbWVOYW1lfVJvb21IYW5kbGVyLmluaXRSb29tRGF0YWA7XHJcbiAgICBlbHNlIG5ldFR0ID0gXCJjb25uZWN0b3IuZW50cnlIYW5kbGVyLmluaXRSb29tRGF0YVwiO1xyXG4gICAgcmV0dXJuIG5ldFR0O1xyXG59XHJcbi8qKlxyXG4gKiDpgIDlh7rmiL/pl7TnmoTnvZHnu5zlj4LmlbBcclxuICovXHJcbnJvb20uZ2V0RXhpdFJvb20gPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICBsZXQgZ2FtZWlkID0gZ2FtZUlkID8gZ2FtZUlkIDogdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIGxldCBnYW1lTmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBpZiAoIWdhbWVpZCB8fCAhZ2FtZU5hbWUpIHJldHVybjtcclxuICAgIGxldCBuZXRUdCA9IFwiXCJcclxuICAgIGlmICh0aGlzLm9wZW5OZXRDdXQpIG5ldFR0ID0gYCR7Z2FtZU5hbWV9Um9vbS4ke2dhbWVOYW1lfVJvb21IYW5kbGVyLmV4aXRSb29tYDtcclxuICAgIGVsc2UgbmV0VHQgPSBcInJvb20ucm9vbUhhbmRsZXIuZXhpdFJvb21cIjtcclxuICAgIHJldHVybiBuZXRUdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWPkeWMheeahOe9kee7nOWPguaVsFxyXG4gKi9cclxucm9vbS5nZXRQcmVwYXJlID0gZnVuY3Rpb24gKGdhbWVJZCkge1xyXG4gICAgbGV0IGdhbWVpZCA9IGdhbWVJZCA/IGdhbWVJZCA6IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICBsZXQgZ2FtZU5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtnYW1laWRdO1xyXG4gICAgaWYgKCFnYW1laWQgfHwgIWdhbWVOYW1lKSByZXR1cm47XHJcbiAgICBsZXQgbmV0VHQgPSBcIlwiXHJcbiAgICBpZiAodGhpcy5vcGVuTmV0Q3V0KSBuZXRUdCA9IGAke2dhbWVOYW1lfVJvb20uJHtnYW1lTmFtZX1Sb29tSGFuZGxlci5wcmVwYXJlYDtcclxuICAgIGVsc2UgbmV0VHQgPSBcInJvb20ucm9vbUhhbmRsZXIucHJlcGFyZVwiO1xyXG4gICAgcmV0dXJuIG5ldFR0O1xyXG59XHJcblxyXG4vKipcclxuICog5Y+R5YyF55qE572R57uc5Y+C5pWwXHJcbiAqL1xyXG5yb29tLmdldFBsYXllck9wID0gZnVuY3Rpb24gKGdhbWVJZCkge1xyXG4gICAgbGV0IGdhbWVpZCA9IGdhbWVJZCA/IGdhbWVJZCA6IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICBsZXQgZ2FtZU5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtnYW1laWRdO1xyXG4gICAgaWYgKCFnYW1laWQgfHwgIWdhbWVOYW1lKSByZXR1cm47XHJcbiAgICBsZXQgbmV0VHQgPSBcIlwiXHJcbiAgICBpZiAodGhpcy5vcGVuTmV0Q3V0KSBuZXRUdCA9IGAke2dhbWVOYW1lfVJvb20uJHtnYW1lTmFtZX1Sb29tSGFuZGxlci5wbGF5ZXJPcGA7XHJcbiAgICBlbHNlIG5ldFR0ID0gXCJyb29tLnJvb21IYW5kbGVyLnBsYXllck9wXCI7XHJcbiAgICByZXR1cm4gbmV0VHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmiL/kuLvouKLkurrlh7rmiL/pl7Qo5Y+q5pyJaW5pdOmYtuauteWPr+S7pSlcclxuICovXHJcbnJvb20uZ2V0Um9vbU91dCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcclxuICAgIGxldCBnYW1laWQgPSBnYW1lSWQgPyBnYW1lSWQgOiB0aGlzLmN1ckVudGVyR2FtZUlEO1xyXG4gICAgbGV0IGdhbWVOYW1lID0gU2VydmVyR2FtZU5hbWVbZ2FtZWlkXTtcclxuICAgIGlmICghZ2FtZWlkIHx8ICFnYW1lTmFtZSkgcmV0dXJuO1xyXG4gICAgbGV0IG5ldFR0ID0gXCJcIlxyXG4gICAgaWYgKHRoaXMub3Blbk5ldEN1dCkgbmV0VHQgPSBgJHtnYW1lTmFtZX1Sb29tLiR7Z2FtZU5hbWV9Um9vbUhhbmRsZXIuZ2V0T3V0YDtcclxuICAgIGVsc2UgbmV0VHQgPSBcInJvb20ucm9vbUhhbmRsZXIuZ2V0T3V0XCI7XHJcbiAgICByZXR1cm4gbmV0VHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlj5HpgIHpgIDlh7rmiL/pl7TmipXnpahcclxuICovXHJcbnJvb20uZ2V0Vm90ZURpc2JhbmRSb29tID0gZnVuY3Rpb24gKGdhbWVJZCkge1xyXG4gICAgbGV0IGdhbWVpZCA9IGdhbWVJZCA/IGdhbWVJZCA6IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICBsZXQgZ2FtZU5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtnYW1laWRdO1xyXG4gICAgaWYgKCFnYW1laWQgfHwgIWdhbWVOYW1lKSByZXR1cm47XHJcbiAgICBsZXQgbmV0VHQgPSBcIlwiXHJcbiAgICBpZiAodGhpcy5vcGVuTmV0Q3V0KSBuZXRUdCA9IGAke2dhbWVOYW1lfVJvb20uJHtnYW1lTmFtZX1Sb29tSGFuZGxlci52b3RlRGlzYmFuZFJvb21gO1xyXG4gICAgZWxzZSBuZXRUdCA9IFwicm9vbS5yb29tSGFuZGxlci52b3RlRGlzYmFuZFJvb21cIjtcclxuICAgIHJldHVybiBuZXRUdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWPkemAgei/m+WFpeaIv+mXtOajgOa1i1xyXG4gKi9cclxucm9vbS5nZXRFbnRlclJvb21DaGVjayA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcclxuICAgIGxldCBnYW1laWQgPSBnYW1lSWQgPyBnYW1lSWQgOiB0aGlzLmN1ckVudGVyR2FtZUlEO1xyXG4gICAgbGV0IGdhbWVOYW1lID0gU2VydmVyR2FtZU5hbWVbZ2FtZWlkXTtcclxuICAgIGlmICghZ2FtZWlkIHx8ICFnYW1lTmFtZSkgcmV0dXJuO1xyXG4gICAgbGV0IG5ldFR0ID0gXCJcIlxyXG4gICAgaWYgKHRoaXMub3Blbk5ldEN1dCkgbmV0VHQgPSBgJHtnYW1lTmFtZX1Sb29tLiR7Z2FtZU5hbWV9Um9vbUhhbmRsZXIuZW50ZXJSb29tQ2hlY2tgO1xyXG4gICAgZWxzZSBuZXRUdCA9IFwiY29ubmVjdG9yLmVudHJ5SGFuZGxlci5lbnRlclJvb21DaGVja1wiO1xyXG4gICAgcmV0dXJuIG5ldFR0O1xyXG59XHJcblxyXG4vKipcclxuICog5Yib5bu65oi/6Ze05Zy6XHJcbiAqL1xyXG5yb29tLmdldENyZWF0ZVJvb20gPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICBsZXQgZ2FtZWlkID0gZ2FtZUlkID8gZ2FtZUlkIDogdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIGxldCBnYW1lTmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBpZiAoIWdhbWVpZCB8fCAhZ2FtZU5hbWUpIHJldHVybjtcclxuICAgIGxldCBuZXRUdCA9IFwiXCJcclxuICAgIGlmICh0aGlzLm9wZW5OZXRDdXQpIG5ldFR0ID0gYCR7Z2FtZU5hbWV9Um9vbS4ke2dhbWVOYW1lfVJvb21IYW5kbGVyLmNyZWF0ZVJvb21gO1xyXG4gICAgZWxzZSBuZXRUdCA9IFwiY29ubmVjdG9yLmVudHJ5SGFuZGxlci5jcmVhdGVSb29tXCI7XHJcbiAgICByZXR1cm4gbmV0VHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlj5HpgIHojrflj5bniYzlsYDorrDlvZVcclxuICovXHJcbnJvb20uZ2V0SW52aXRlQW5vdGhlclJvdW5kID0gZnVuY3Rpb24gKGdhbWVJZCkge1xyXG4gICAgbGV0IGdhbWVpZCA9IGdhbWVJZCA/IGdhbWVJZCA6IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICBsZXQgZ2FtZU5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtnYW1laWRdO1xyXG4gICAgaWYgKCFnYW1laWQgfHwgIWdhbWVOYW1lKSByZXR1cm47XHJcbiAgICBsZXQgbmV0VHQgPSBcIlwiXHJcbiAgICBpZiAodGhpcy5vcGVuTmV0Q3V0KSBuZXRUdCA9IGAke2dhbWVOYW1lfVJvb20uJHtnYW1lTmFtZX1Sb29tSGFuZGxlci5pbnZpdGVBbm90aGVyUm91bmRgO1xyXG4gICAgZWxzZSBuZXRUdCA9IFwicm9vbS5yb29tSGFuZGxlci5pbnZpdGVBbm90aGVyUm91bmRcIjtcclxuICAgIHJldHVybiBuZXRUdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWPkemAgeiOt+WPlueJjOWxgOiusOW9lVxyXG4gKi9cclxucm9vbS5nZXRSZWNvcmRJZHMgPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICBsZXQgZ2FtZWlkID0gZ2FtZUlkID8gZ2FtZUlkIDogdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIGxldCBnYW1lTmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBpZiAoIWdhbWVpZCB8fCAhZ2FtZU5hbWUpIHJldHVybjtcclxuICAgIGxldCBuZXRUdCA9IFwiXCJcclxuICAgIGlmICh0aGlzLm9wZW5OZXRDdXQpIG5ldFR0ID0gYCR7Z2FtZU5hbWV9Um9vbS4ke2dhbWVOYW1lfVJvb21IYW5kbGVyLmdldFJlY29yZElkc2A7XHJcbiAgICBlbHNlIG5ldFR0ID0gXCJyb29tLnJvb21IYW5kbGVyLmdldFJlY29yZElkc1wiO1xyXG4gICAgcmV0dXJuIG5ldFR0O1xyXG59XHJcblxyXG4vKipcclxuICog5Y+R6YCBR03nmoTnvZHnu5zlj4LmlbBcclxuICovXHJcbnJvb20uZ2V0UGxheWVyR21PcCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcclxuICAgIGxldCBnYW1laWQgPSBnYW1lSWQgPyBnYW1lSWQgOiB0aGlzLmN1ckVudGVyR2FtZUlEO1xyXG4gICAgbGV0IGdhbWVOYW1lID0gU2VydmVyR2FtZU5hbWVbZ2FtZWlkXTtcclxuICAgIGlmICghZ2FtZWlkIHx8ICFnYW1lTmFtZSkgcmV0dXJuO1xyXG4gICAgbGV0IG5ldFR0ID0gXCJcIlxyXG4gICAgaWYgKHRoaXMub3Blbk5ldEN1dCkgbmV0VHQgPSBgJHtnYW1lTmFtZX1Sb29tLiR7Z2FtZU5hbWV9Um9vbUhhbmRsZXIucGxheWVyR21PcGA7XHJcbiAgICBlbHNlIG5ldFR0ID0gXCJyb29tLnJvb21IYW5kbGVyLnBsYXllckdtT3BcIjtcclxuICAgIHJldHVybiBuZXRUdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOe9kee7nOaVsOaNruebkeWQrFxyXG4gKi9cclxucm9vbS5yZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJFbnRlckJhY2tncm91bmRcIiwgdGhpcy5FbnRlckJhY2tncm91bmQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJFbnRlckZvcmVncm91bmRcIiwgdGhpcy5FbnRlckZvcmVncm91bmQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkRpc2JhbmRSb29tXCIsIHRoaXMub25EaXNiYW5kUm9vbSwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uR2FtZUZpbmlzaGVkXCIsIHRoaXMub25HYW1lRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkludml0ZWRBbm90aGVyUm91bmRcIiwgdGhpcy5vbkludml0ZWRBbm90aGVyUm91bmQsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJxdWVyeS5oYW5kbGVyLmdldEdhbWVJZEJ5Um9vbU51bVwiLCB0aGlzLnF1ZXJ5X2hhbmRsZXJfZ2V0R2FtZUlkQnlSb29tTnVtLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25Jbml0Um9vbVwiLCB0aGlzLnJvb21fcm9vbUhhbmRsZXJfb25Jbml0Um9vbURhdGEsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbktpY2tPdXRPZlJvb21cIiwgdGhpcy5vbktpY2tPdXRPZlJvb20sIHRoaXMpOyAgICAgICAgICAgICAgICAgICAvL+eOqeWutuiiq+i4ouWbnuWkp+WOhVxyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBTZXJ2ZXJHYW1lTmFtZSkge1xyXG4gICAgICAgIGlmICghU2VydmVyR2FtZU5hbWUuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtrZXldO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKGAke25hbWV9Um9vbS4ke25hbWV9Um9vbUhhbmRsZXIudmFpbGRhdGVSb29tQ29uZGl0aW9uYCwgdGhpcy52YWlsZGF0ZVJvb21Db25kaXRpb24sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKGAke25hbWV9Um9vbS4ke25hbWV9Um9vbUhhbmRsZXIuZW50ZXJSb29tYCwgdGhpcy5jb25uZWN0b3JfZW50cnlIYW5kbGVyX2VudGVyUm9vbSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5leGl0Um9vbWAsIHRoaXMucm9vbV9yb29tSGFuZGxlcl9leGl0Um9vbSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5pbml0Um9vbURhdGFgLCB0aGlzLnJvb21fcm9vbUhhbmRsZXJfaW5pdFJvb21EYXRhLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmNyZWF0ZVJvb21gLCB0aGlzLnJvb21fcm9vbUhhbmRsZXJfY3JlYXRlUm9vbSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlclJvb21DaGVja2AsIHRoaXMucm9vbV9yb29tSGFuZGxlcl9lbnRlclJvb21DaGVjaywgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIdW5kcmVkc1Jvb20oa2V5KSkgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlclJvb20yYCwgdGhpcy5jb25uZWN0b3JfZW50cnlIYW5kbGVyX2VudGVyUm9vbSwgdGhpcyk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiDnvZHnu5zmlbDmja7nm5HlkKzplIDmr4FcclxuICovXHJcbnJvb20udW5SZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiRW50ZXJCYWNrZ3JvdW5kXCIsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiRW50ZXJGb3JlZ3JvdW5kXCIsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25EaXNiYW5kUm9vbVwiLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUZpbmlzaGVkXCIsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25JbnZpdGVkQW5vdGhlclJvdW5kXCIsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwicXVlcnkuaGFuZGxlci5nZXRHYW1lSWRCeVJvb21OdW1cIiwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkluaXRSb29tXCIsIHRoaXMpO1xyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBTZXJ2ZXJHYW1lTmFtZSkge1xyXG4gICAgICAgIGlmICghU2VydmVyR2FtZU5hbWUuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBTZXJ2ZXJHYW1lTmFtZVtrZXldO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLnZhaWxkYXRlUm9vbUNvbmRpdGlvbmAsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmVudGVyUm9vbWAsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSHVuZHJlZHNSb29tKGtleSkpIGdsR2FtZS5lbWl0dGVyLm9mZihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmVudGVyUm9vbTJgLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5leGl0Um9vbWAsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmluaXRSb29tRGF0YWAsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmNyZWF0ZVJvb21gLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlclJvb21DaGVja2AsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy/mipvlvIPkuI3lnKjmiL/pl7TlhoXnmoTlj5HljIVcclxucm9vbS5yb29tX3NlbmQgPSBmdW5jdGlvbiAoc2VuZF9uYW1lLCBzZW5kX2RhdGEpIHtcclxuICAgIGlmICh0aGlzLnNlcnZlckdhbWVpZCAhPSAwKSBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhzZW5kX25hbWUsIHNlbmRfZGF0YSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliqDlhaXph5HluIHlnLpcclxuICogQHBhcmFtIHtudW1iZXJ9IGdhbWVpZCAgIOa4uOaIj2lkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiZXR0eXBlICDmuLjmiI/lnLrmrKFcclxuICovXHJcbnJvb20ucmVxR29sZFJvb21WZXJpZnkgPSBmdW5jdGlvbiAoZ2FtZWlkLCBiZXR0eXBlKSB7XHJcbiAgICB0aGlzLmdhbWVJZCA9IGdhbWVpZDtcclxuICAgIHRoaXMuYmV0VHlwZSA9IGJldHR5cGU7XHJcbiAgICBsZXQgbmFtZSA9IFNlcnZlckdhbWVOYW1lW2dhbWVpZF07XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLnZhaWxkYXRlUm9vbUNvbmRpdGlvbmAsIHtcclxuICAgICAgICBcImdhbWVJZFwiOiBnYW1laWQsXHJcbiAgICAgICAgXCJiZXRUeXBlXCI6IGJldHR5cGUsXHJcbiAgICB9KTtcclxufTtcclxuXHJcbnJvb20udmFpbGRhdGVSb29tQ29uZGl0aW9uID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgY29uc29sZS5sb2coXCLliqDlhaXph5HluIHlnLrmiL/pl7QgLi4uXCIsIG1zZyk7XHJcbiAgICBnbEdhbWUucm9vbS5sb2dpY0Rlc3Ryb3koKTtcclxuICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSB0aGlzLmdhbWVJZDtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tVHlwZSA9IFJPT01fVFlQRS5HT0xEO1xyXG4gICAgdGhpcy5jdXJFbnRlckJldFR5cGUgPSB0aGlzLmJldFR5cGU7XHJcbiAgICB0aGlzLmVudGVyR2FtZVJvb20oKTtcclxufVxyXG4vKipcclxuICog5pawXHJcbiAqIOWKoOWFpemHkeW4geWculxyXG4gKiBAcGFyYW0ge251bWJlcn0gZ2FtZWlkICAg5ri45oiPaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IGJldHR5cGUgIOa4uOaIj+WcuuasoVxyXG4gKi9cclxucm9vbS5zZXRHb2xkUm9vbUluZm8gPSBmdW5jdGlvbiAoZ2FtZUlkLCB0eXBlKSB7XHJcbiAgICBnbEdhbWUucm9vbS5sb2dpY0Rlc3Ryb3koKTtcclxuICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSBnYW1lSWQ7XHJcbiAgICB0aGlzLmN1ckVudGVyQmV0VHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVR5cGUgPSBST09NX1RZUEUuR09MRDtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tU2VydmVyID0gXCJcIjtcclxuICAgIHRoaXMuZW50ZXJHYW1lUm9vbSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOWKoOWFpeeZvuS6uuWculxyXG4gKiBAcGFyYW0ge251bWJlcn0gZ2FtZWlkIOa4uOaIj2lkXHJcbiAqL1xyXG5yb29tLnJlcUh1bmRyZWRzUm9vbSA9IGZ1bmN0aW9uIChnYW1laWQsIHJvb21pZCwgcm9vbXNlcnZlciwgYmV0dHlwZSkge1xyXG4gICAgZ2xHYW1lLnJvb20ubG9naWNEZXN0cm95KCk7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gZ2FtZWlkO1xyXG4gICAgdGhpcy5jdXJFbnRlclJvb21JRCA9IHJvb21pZDtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tU2VydmVyID0gcm9vbXNlcnZlcjtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tVHlwZSA9IFJPT01fVFlQRS5IVU5EUkVEUztcclxuICAgIHRoaXMuY3VyRW50ZXJCZXRUeXBlID0gYmV0dHlwZTtcclxuICAgIHRoaXMuZW50ZXJHYW1lUm9vbSgpO1xyXG59O1xyXG4vKipcclxuICog55m+5Lq65Zy65oi/6Ze05qih5byPXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBnYW1laWQg5ri45oiPaWRcclxuICovXHJcbnJvb20ucmVxSHVuZHJlZHNSb29tT3RoZXIgPSBmdW5jdGlvbiAoZ2FtZWlkLCBiZXR0eXBlKSB7XHJcbiAgICBnbEdhbWUucm9vbS5sb2dpY0Rlc3Ryb3koKTtcclxuICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSBnYW1laWQ7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVR5cGUgPSBST09NX1RZUEUuSFVORFJFRFM7XHJcbiAgICB0aGlzLmN1ckVudGVyQmV0VHlwZSA9IGJldHR5cGU7XHJcbiAgICB0aGlzLmVudGVyR2FtZVJvb20oKTtcclxufTtcclxuLyoqXHJcbiAqIOWKoOWFpeaNlemxvOWculxyXG4gKiBAcGFyYW0ge251bWJlcn0gcm9vbVR5cGUg5oi/6Ze057G75Z6LXHJcbiAqL1xyXG5yb29tLnNlbmRFbnRlclJvb20gPSBmdW5jdGlvbiAocm9vbVR5cGUsIGdhbWVJZCkge1xyXG4gICAgdGhpcy5jdXJFbnRlckJldFR5cGUgPSByb29tVHlwZTtcclxuICAgIHRoaXMubG9naWNEZXN0cm95KCk7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gZ2FtZUlkIHx8IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVR5cGUgPSBST09NX1RZUEUuRklTSDtcclxuICAgIHRoaXMubG9naWNDcmVhdGUoKTtcclxuXHJcbiAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuZW50ZXJGaXNoR2FtZVJvb20oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGdhbWVJZCA9IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICAgICAgbGV0IGdhbWVOYW1lID0gZ2xHYW1lLnNjZW5lLmdldFNjZW5lTmFtZUJ5SUQoZ2FtZUlkKVxyXG4gICAgICAgIGxldCB1cGRhdGVfZGF0YSA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oJ3VwZGF0ZV9kYXRhJyk7XHJcbiAgICAgICAgaWYgKHVwZGF0ZV9kYXRhICYmIHVwZGF0ZV9kYXRhW2dhbWVOYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRmlzaEdhbWVSb29tKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kb3dubG9hZEdhbWUoZ2FtZUlkLCBudWxsLCAoKSA9PiB7IHRoaXMuZW50ZXJGaXNoR2FtZVJvb20oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICog6K6+572u6L+b5YWl5oi/6Ze05Y+C5pWwXHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqL1xyXG5yb29tLnNldEVudGVyR2FtZUluZm8gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgZ2xHYW1lLnJvb20ubG9naWNEZXN0cm95KCk7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gZGF0YS5nYW1laWQ7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbUlEID0gZGF0YS5yb29taWQ7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVR5cGUgPSBkYXRhLnJvb210eXBlO1xyXG4gICAgdGhpcy5jdXJFbnRlckJldFR5cGUgPSBkYXRhLmJldHR5cGU7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVNlcnZlciA9IGRhdGEuc2VydmljZWlkO1xyXG59O1xyXG4vKipcclxuICog6I635Y+W5oiR55qE5oi/6Ze054q25oCBXHJcbiAqL1xyXG5yb29tLnJlcU15Um9vbVN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcU15Um9vbVN0YXRlXCIsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMucm9vbVVzZXJJbmZvID0gZGF0YS5yb29tVXNlckluZm87XHJcbiAgICAgICAgLy8g5Zyo5oi/6Ze05YaFXHJcbiAgICAgICAgaWYgKHRoaXMucm9vbVVzZXJJbmZvICYmIHRoaXMucm9vbVVzZXJJbmZvLnJpZCA+IDApIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnJvb20ubG9naWNEZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSB0aGlzLnJvb21Vc2VySW5mby5nYW1laWQ7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJSb29tVHlwZSA9IHRoaXMucm9vbVVzZXJJbmZvLnJvb210eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmN1ckVudGVyQmV0VHlwZSA9IHRoaXMucm9vbVVzZXJJbmZvLmJldHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJSb29tSUQgPSB0aGlzLnJvb21Vc2VySW5mby5yaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJSb29tU2VydmVyID0gdGhpcy5yb29tVXNlckluZm8uc2VydmljZWlkO1xyXG4gICAgICAgICAgICBpZiAoRklTSF9ST09NX0dBTUVbdGhpcy5jdXJFbnRlckdhbWVJRF0gIT0gbnVsbCkgdGhpcy5zZW5kRW50ZXJSb29tKHRoaXMuY3VyRW50ZXJCZXRUeXBlKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLmVudGVyR2FtZVJvb20oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lICE9ICdwbGF6YScgJiYgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lICE9ICdsb2dpbicgJiYgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucm9vbS5sb2dpY0Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5zY2VuZS5zZXROZXh0U2NlbmVUYWcoZ2xHYW1lLnNjZW5ldGFnLlBMQVpBKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5zY2VuZS5lbnRlck5leHRTY2VuZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSAncGxhemEnICYmICFnbEdhbWUubG9nb24uZ2V0KFwiaXNVcGRhdGVQbGF6YVwiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS5yZWFkeXJvb20uZ2V0KFwiZ2FtZWlkXCIpICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUVudGVyQXJlYShnbEdhbWUucmVhZHlyb29tLmdldChcImdhbWVpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuc2NlbmUuc2V0TmV4dFNjZW5lVGFnKGdsR2FtZS5zY2VuZXRhZy5QTEFaQSk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuc2NlbmUuZW50ZXJOZXh0U2NlbmUoKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5sb2dvbi5zZXQoXCJpc1VwZGF0ZVBsYXphXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG4vL+i/m+WFpeaIv+mXtOWJjeWFiOehruiupOS4gOS4i+aYr+WQpui/mOacieWFtuS7lua4uOaIj+ato+WcqOi/m+ihjFxyXG5yb29tLnJlcU15R2FtZVN0YXRlID0gZnVuY3Rpb24gKF9nYW1lSUQsIF9yb29tVHlwZSwgX3Jvb21JRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxTXlSb29tU3RhdGVcIiwgbnVsbCwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5oaWRlRmllbGRTZWxlY3Rpb25KdUh1YSgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yb29tVXNlckluZm8gJiYgZGF0YS5yb29tVXNlckluZm8ucmlkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS5yb29tLmNoZWNrSHVuZHJlZHNSb29tKF9nYW1lSUQpICYmIF9nYW1lSUQgPT0gZGF0YS5yb29tVXNlckluZm8uZ2FtZWlkICYmIF9yb29tVHlwZSA9PSBkYXRhLnJvb21Vc2VySW5mby5iZXR0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2dhbWVJRCA9PSBkYXRhLnJvb21Vc2VySW5mby5nYW1laWQgJiYgX3Jvb21UeXBlID09IGRhdGEucm9vbVVzZXJJbmZvLmJldHR5cGUgJiYgKCFfcm9vbUlEIHx8IF9yb29tSUQgPT0gZGF0YS5yb29tVXNlckluZm8ucmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoSFVORFJFX0dBTUVbZGF0YS5yb29tVXNlckluZm8uZ2FtZWlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKCfmj5DnpLonLCBnbEdhbWUudGlwcy5ST09NLlNUSUxMSU5HQU1FLmZvcm1hdChgJHtTZXJ2ZXJHYW1lRGljdFtkYXRhLnJvb21Vc2VySW5mby5nYW1laWRdfe+8iCR7Z2xHYW1lLnJvb20uZ2V0Um9vbVR5cGUoZGF0YS5yb29tVXNlckluZm8uZ2FtZWlkLCBkYXRhLnJvb21Vc2VySW5mby5iZXR0eXBlKX0tJHtkYXRhLnJvb21Vc2VySW5mby5yaWR977yJYCksICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnJvb20ucmVxSHVuZHJlZHNSb29tKGRhdGEucm9vbVVzZXJJbmZvLmdhbWVpZCwgZGF0YS5yb29tVXNlckluZm8ucmlkLCBkYXRhLnJvb21Vc2VySW5mby5zZXJ2aWNlaWQsIGRhdGEucm9vbVVzZXJJbmZvLmJldHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlLCBmYWxzZSwgJ+WbnuWIsOa4uOaIjycsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJvb21Vc2VySW5mby5iZXR0eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gZ2xHYW1lLnRpcHMuUk9PTS5TVElMTElOR0FNRS5mb3JtYXQoYCR7U2VydmVyR2FtZURpY3RbZGF0YS5yb29tVXNlckluZm8uZ2FtZWlkXX3vvIgke2dsR2FtZS5yb29tLmdldFJvb21UeXBlKGRhdGEucm9vbVVzZXJJbmZvLmdhbWVpZCwgZGF0YS5yb29tVXNlckluZm8uYmV0dHlwZSl977yJYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gZ2xHYW1lLnRpcHMuUk9PTS5TVElMTElOR0FNRS5mb3JtYXQoYCR7U2VydmVyR2FtZURpY3RbZGF0YS5yb29tVXNlckluZm8uZ2FtZWlkXX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coJ+aPkOekuicsIGNvbnRlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnJvb20uc2V0R29sZFJvb21JbmZvKGRhdGEucm9vbVVzZXJJbmZvLmdhbWVpZCwgZGF0YS5yb29tVXNlckluZm8uYmV0dHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UsIGZhbHNlLCAn5Zue5Yiw5ri45oiPJywgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLmNsb3NlRmllbGRTZWxlY3Rpb25KdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn07XHJcbi8qKlxyXG4gKiDov5vlhaXmiL/pl7RcclxuICovXHJcbnJvb20uZW50ZXJGaXNoR2FtZVJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuc2NlbmUuc2V0TmV4dFNjZW5lVGFnKHRoaXMuY3VyRW50ZXJHYW1lSUQpO1xyXG4gICAgZ2xHYW1lLnNjZW5lLmVudGVyTmV4dFNjZW5lKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgbGV0IGd1blJhdGUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jdXJFbnRlckJldFR5cGV9Z3VuUmF0ZWApID8gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmN1ckVudGVyQmV0VHlwZX1ndW5SYXRlYCkpIDogMTtcclxuICAgICAgICBsZXQgbXNnID0ge1xyXG4gICAgICAgICAgICBiZXR0eXBlOiB0aGlzLmN1ckVudGVyQmV0VHlwZSxcclxuICAgICAgICAgICAgc2VydmVySWQ6IHRoaXMuY3VyRW50ZXJSb29tU2VydmVyLFxyXG4gICAgICAgICAgICByb29tSWQ6IHRoaXMuY3VyRW50ZXJSb29tSUQsXHJcbiAgICAgICAgICAgIGd1blJhdGU6IGd1blJhdGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEVudGVyUm9vbSgpO1xyXG4gICAgICAgIGlmIChfcm91dGUpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coX3JvdXRlLCBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiDov5vlhaXmiL/pl7RcclxuICovXHJcbnJvb20uZW50ZXJHYW1lUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5lbnRlclJvb20oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGdhbWVJZCA9IHRoaXMuY3VyRW50ZXJHYW1lSUQ7XHJcbiAgICAgICAgbGV0IGdhbWVOYW1lID0gZ2xHYW1lLnNjZW5lLmdldFNjZW5lTmFtZUJ5SUQoZ2FtZUlkKVxyXG4gICAgICAgIGxldCB1cGRhdGVfZGF0YSA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oJ3VwZGF0ZV9kYXRhJyk7XHJcbiAgICAgICAgaWYgKHVwZGF0ZV9kYXRhICYmIHVwZGF0ZV9kYXRhW2dhbWVOYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyUm9vbSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRHYW1lKGdhbWVJZCwgbnVsbCwgKCkgPT4geyB0aGlzLmVudGVyUm9vbSgpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOmAgOWHuuaIv+mXtFxyXG4gKi9cclxuXHJcbnJvb20uZXhpdEdhbWVSb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyhnbEdhbWUuc2NlbmV0YWcuUExBWkEpO1xyXG4gICAgZ2xHYW1lLnNjZW5lLmVudGVyTmV4dFNjZW5lKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2dpY0Rlc3Ryb3koKTtcclxuICAgICAgICBpZiAodGhpcy5leGl0Um9vbVN0YXRlICE9IFJPT01fRVhJVF9TVEFURS5CQVNFICYmIHRoaXMuZXhpdFJvb21TdGF0ZSAhPSBST09NX0VYSVRfU1RBVEUuRk9SQklEKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHJUaXAgPSB0aGlzLmV4aXRSb29tU3RhdGUgPT0gUk9PTV9FWElUX1NUQVRFLk1BSU5URU5BTkNFID8gZ2xHYW1lLnRpcHMuUk9PTS5TRVJWSUNFU1RPUCA6IGdsR2FtZS50aXBzLlJPT00uR0FNRUNMT1NFO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveCgn5o+Q56S6Jywgc3RyVGlwKTtcclxuICAgICAgICAgICAgdGhpcy5leGl0Um9vbVN0YXRlID0gUk9PTV9FWElUX1NUQVRFLkJBU0U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV4aXRSb29tU3RhdGUgPT0gUk9PTV9FWElUX1NUQVRFLkZPUkJJRCkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBnbEdhbWUudGlwcy5ST09NLkFDQ09VTlRFWENFUFRJT04sICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4geyB9LCBcIuaIkeefpemBk+S6hlwiLCBcIuiBlOezu+WuouacjVwiKVxyXG4gICAgICAgICAgICB0aGlzLmV4aXRSb29tU3RhdGUgPSBST09NX0VYSVRfU1RBVEUuQkFTRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKTtcclxuICAgIH0pO1xyXG59XHJcbi8v5Li05pe25riF55CG5LiL6L29XHJcbnJvb20uZG93bmxvYWRHYW1lID0gZnVuY3Rpb24gKGdhbWVpZCwgbWFuaWZlc3RVcmwsIGNhbGwpIHtcclxuICAgIGxldCBhc3NldHNNYW5hZ2VyID0gbmV3IGdsR2FtZS5hc3NldHMoZ2xHYW1lLnNjZW5lLmdldFNjZW5lTmFtZUJ5SUQoZ2FtZWlkKSwgbWFuaWZlc3RVcmwsIChwcm9jZXNzKSA9PiB7XHJcbiAgICB9LCAoKSA9PiB7ICAgIC8vIOaIkOWKn+Wbnuiwg1xyXG4gICAgICAgIGNhbGwoZ2FtZWlkKTtcclxuICAgICAgICBhc3NldHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBhc3NldHNNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBsZXQgZ2FtZU5hbWUgPSBnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lQnlJRChnYW1laWQpXHJcbiAgICAgICAgbGV0IGhvdFVwZGF0ZVVSTCA9IGdsR2FtZS5zZXJ2ZXJjZmcuZ2V0SG90dXBkYXRlVmVyc2lvblVybCgpO1xyXG4gICAgICAgIGxldCB1cmwgPSBgJHtob3RVcGRhdGVVUkx9JHtnYW1lTmFtZX0vJHtnYW1lTmFtZX12ZXJzaW9uLm1hbmlmZXN0YFxyXG4gICAgICAgIGdsR2FtZS5nYW1lbGlzdGNmZy5nZXRHYW1lVmVyc2lvbih1cmwpLnRoZW4odmVyZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbSgndXBkYXRlX2RhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbZ2FtZU5hbWVdID0gdmVyZGF0YS52ZXJzaW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YVtnYW1lTmFtZV0gPSB2ZXJkYXRhLnZlcnNpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbSgndXBkYXRlX2RhdGEnLCBkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfSwgKCkgPT4geyAgICAvLyDlpLHotKXlm57osINcclxuICAgICAgICBhc3NldHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBhc3NldHNNYW5hZ2VyID0gbnVsbDtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog5ri45oiP57uT5p2f55qE5ri45oiP54q25oCBXHJcbiAqIG1hdGNoaWRcclxuICogZ2FtZVN0YXR1cyAxIOato+W4uCAy57u05oqkIDPlhbPpl60gNCDouKLlh7rmuLjmiI9cclxuICovXHJcbnJvb20ub25HYW1lRmluaXNoZWQgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBpZiAobXNnLmdhbWVTdGF0dXMgIT0gMSkge1xyXG4gICAgICAgIHRoaXMuZXhpdFJvb21TdGF0ZSA9IG1zZy5nYW1lU3RhdHVzO1xyXG4gICAgICAgIHRoaXMuZXhpdFJvb20oKTtcclxuICAgIH1cclxuICAgIC8v5byC5bi45oOF5Ya1XHJcbiAgICBlbHNlIGlmIChnbEdhbWUudXNlci5nZXQoXCJnYW1lRXhjZXB0aW9uXCIpKSB7XHJcbiAgICAgICAgdGhpcy5leGl0Um9vbVN0YXRlID0gUk9PTV9FWElUX1NUQVRFLkZPUkJJRDtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KCdub2RlUmVtb3ZlJylcclxuICAgICAgICB0aGlzLmV4aXRSb29tKCk7XHJcbiAgICB9XHJcbiAgICAvL+i4ouS4i+e6v1xyXG4gICAgZWxzZSBpZiAoZ2xHYW1lLnVzZXIuZ2V0KFwiS2lja091dEdhbWVcIikpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIlwiLCBnbEdhbWUudGlwcy5DT01NT04uQUNDT1VOVEVYQ0VQVElPTiwgKCkgPT4geyBnbEdhbWUubG9nb24ucmVMb2dvbigpIH0pO1xyXG4gICAgfVxyXG4gICAgLy/npoHmraLmuLjmiI9cclxuICAgIGVsc2UgaWYgKGdsR2FtZS51c2VyLmdldChcImxpbWl0R2FtZVwiKSkge1xyXG4gICAgICAgIHRoaXMuZXhpdFJvb21TdGF0ZSA9IFJPT01fRVhJVF9TVEFURS5GT1JCSUQ7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdCgnbm9kZVJlbW92ZScpXHJcbiAgICAgICAgdGhpcy5leGl0Um9vbSgpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICog6L+b5YWl5oi/6Ze0XHJcbiAqL1xyXG5yb29tLmVudGVyUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubG9naWNEZXN0cm95KCk7XHJcbiAgICB0aGlzLmxvZ2ljQ3JlYXRlKCk7XHJcbiAgICBsZXQgbXNnID0ge1xyXG4gICAgICAgIGJldHR5cGU6IHRoaXMuY3VyRW50ZXJCZXRUeXBlLFxyXG4gICAgICAgIHNlcnZlcklkOiB0aGlzLmN1ckVudGVyUm9vbVNlcnZlcixcclxuICAgICAgICByb29tSWQ6IHRoaXMuY3VyRW50ZXJSb29tSUQsXHJcbiAgICB9O1xyXG4gICAgLy/liKTmlq3mmK/lkKbkuLrotbDmiL/pl7TnsbvlnovnmoTnmb7kurrlnLpcclxuICAgIGlmICh0aGlzLmNoZWNrSHVuZHJlZHNSb29tKHRoaXMuY3VyRW50ZXJSb29tSUQpKSB7XHJcbiAgICAgICAgbXNnID0geyBiZXR0eXBlOiB0aGlzLmN1ckVudGVyQmV0VHlwZSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtc2cgPSB7XHJcbiAgICAgICAgICAgIGJldHR5cGU6IHRoaXMuY3VyRW50ZXJCZXRUeXBlLFxyXG4gICAgICAgICAgICBzZXJ2ZXJJZDogdGhpcy5jdXJFbnRlclJvb21TZXJ2ZXIsXHJcbiAgICAgICAgICAgIHJvb21JZDogdGhpcy5jdXJFbnRlclJvb21JRCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXJFbnRlclJvb21UeXBlID09IFJPT01fVFlQRS5IVU5EUkVEUykgeyAgICAgICAgICAvL+eZvuS6uuWcuuexu+Wei1xyXG4gICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEVudGVyUm9vbSgpO1xyXG4gICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgbXNnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJFbnRlclJvb21UeXBlID09IFJPT01fVFlQRS5DQVJEKSB7ICAgICAgIC8v5oi/6Ze05Zy677yI6ZK755+z54mI5oi/5Y2h77yJXHJcbiAgICAgICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyh0aGlzLmN1ckVudGVyR2FtZUlEKTtcclxuICAgICAgICBnbEdhbWUuc2NlbmUuZW50ZXJOZXh0U2NlbmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IF9yb3V0ZSA9IHRoaXMuZ2V0RW50ZXJSb29tKCk7XHJcbiAgICAgICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgbXNnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyh0aGlzLmN1ckVudGVyR2FtZUlEKTtcclxuICAgICAgICBnbEdhbWUuc2NlbmUuZW50ZXJOZXh0U2NlbmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IF9yb3V0ZSA9IHRoaXMuZ2V0RW50ZXJSb29tKCk7XHJcbiAgICAgICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgbXNnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOi/m+WFpeaIv+mXtFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG4gKi9cclxucm9vbS5jb25uZWN0b3JfZW50cnlIYW5kbGVyX2VudGVyUm9vbSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICBpZiAoZ2xHYW1lLnJlYWR5cm9vbS5nZXQoXCJnYW1laWRcIikpIGdsR2FtZS5yZWFkeXJvb20ucmVxRXhpdEFyZWEoKTtcclxuICAgIC8v5Yqg5YWl5ri45oiPaWRcclxuICAgIHRoaXMuc2VydmVyR2FtZWlkID0gdGhpcy5jdXJFbnRlckdhbWVJRDtcclxuICAgIHRoaXMudXBHYW1lVHlwZSA9IHRoaXMuY3VyRW50ZXJSb29tVHlwZTsgICAgLy/moIforrDkuLrkuIrmrKHov5vlhaXnmoTmuLjmiI8s5LiN5YGa5riF55CGXHJcbiAgICBpZiAodGhpcy5jdXJFbnRlclJvb21UeXBlID09IFJPT01fVFlQRS5IVU5EUkVEUykge1xyXG4gICAgICAgIGdsR2FtZS5zY2VuZS5zZXROZXh0U2NlbmVUYWcodGhpcy5jdXJFbnRlckdhbWVJRCk7XHJcbiAgICAgICAgZ2xHYW1lLnNjZW5lLmVudGVyTmV4dFNjZW5lKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEluaXRSb29tKCk7XHJcbiAgICAgICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOWFs+mXremAieWcuuiPiuiKsVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5jbG9zZUZpZWxkU2VsZWN0aW9uSnVIdWEoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDmiL/pl7TphY3nva5cclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcclxuICovXHJcbnJvb20ucm9vbV9yb29tSGFuZGxlcl9pbml0Um9vbURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgLy8gdGhpcy5jdXJFbnRlclJvb21JRCA9IGRhdGEucm9vbUlkID8gZGF0YS5yb29tSWQgOiB0aGlzLmN1ckVudGVyUm9vbUlEO1xyXG4gICAgY29uc29sZS5sb2coJ3Jvb21fcm9vbUhhbmRsZXJfaW5pdFJvb21EYXRhJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmiL/pl7TphY3nva5cclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcclxuICovXHJcbnJvb20ucm9vbV9yb29tSGFuZGxlcl9vbkluaXRSb29tRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAvLyDphY3lkIjmnI3liqHnq6/liJ3lp4vljJbmiL/pl7Tlj7dcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tSUQgPSBkYXRhLnJvb21JZCA/IGRhdGEucm9vbUlkIDogdGhpcy5jdXJFbnRlclJvb21JRDtcclxufVxyXG5cclxuXHJcbnJvb20ub25LaWNrT3V0T2ZSb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdCgnbm9kZVJlbW92ZScpXHJcbiAgICB0aGlzLmV4aXRSb29tU3RhdGUgPSBST09NX0VYSVRfU1RBVEUuRk9SQklEOyAgICAgICAgLy/orr7nva7pgIDlh7rmiL/pl7TnirbmgIFcclxuICAgIHRoaXMuZXhpdFJvb20oKTtcclxuICAgIC8vIGdsR2FtZS5wYW5lbC5zaG93TXNnQm94KCfmj5DnpLonLCAnICAgICAgICDnvZHnu5zov57mjqXlvILluLjvvIzor7fph43mlrDov5vlhaXmiL/pl7TvvIEnLFxyXG4gICAgLy8gICAgICgpID0+IHtcclxuICAgIC8vICAgICAgICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyhnbEdhbWUuc2NlbmV0YWcuUExBWkEpO1xyXG4gICAgLy8gICAgICAgICBnbEdhbWUuc2NlbmUuZW50ZXJOZXh0U2NlbmUoKTtcclxuICAgIC8vICAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuaIv+mXtFxyXG4gKi9cclxucm9vbS5yb29tX3Jvb21IYW5kbGVyX2NyZWF0ZVJvb20gPSBmdW5jdGlvbiAocm9vbU51bSkge1xyXG4gICAgdGhpcy5jdXJFbnRlckdhbWVJRCA9IHRoaXMuZ2FtZUlkO1xyXG4gICAgdGhpcy5jdXJFbnRlclJvb21UeXBlID0gUk9PTV9UWVBFLkNBUkQ7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZURhdGEgPSBudWxsO1xyXG4gICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyh0aGlzLmN1ckVudGVyR2FtZUlEKTtcclxuICAgIGdsR2FtZS5zY2VuZS5lbnRlck5leHRTY2VuZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEVudGVyUm9vbSgpO1xyXG4gICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgeyByb29tTnVtOiByb29tTnVtIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5o2i5qGMXHJcbiAqL1xyXG5yb29tLmNoYW5nZVRhYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5ibENoYW5nZVRhYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuZXhpdFN0YXRlID0gUk9PTV9FWElULkNIQU5HRV9UQUJMRTtcclxuICAgIGdsR2FtZS5wYW5lbC5zaG93Um9vbUp1SHVhKCk7XHJcbiAgICBsZXQgX3JvdXRlID0gdGhpcy5nZXRFeGl0Um9vbSgpO1xyXG4gICAgaWYgKF9yb3V0ZSkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgeyBleGl0VHlwZTogMSB9KTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOaIv+mXtOWcuuWGjeadpeS4gOWxgFxyXG4gKi9cclxucm9vbS5pbnZpdGVBbm90aGVyUm91bmQgPSBmdW5jdGlvbiAoZ2FtaWQsIG1zZykge1xyXG4gICAgdGhpcy5leGl0U3RhdGUgPSBST09NX0VYSVQuUkVDVVJfUk9VTkQ7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gZ2FtaWQ7XHJcbiAgICB0aGlzLmN1ckVudGVyR2FtZURhdGEgPSBtc2c7XHJcbiAgICBnbEdhbWUucGFuZWwuc2hvd1Jvb21KdUh1YSgpO1xyXG4gICAgbGV0IF9yb3V0ZSA9IHRoaXMuZ2V0RXhpdFJvb20oKTtcclxuICAgIGlmIChfcm91dGUpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhfcm91dGUsIHsgZXhpdFR5cGU6IDEgfSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiDpgIDlh7rmiL/pl7RcclxuICogQHBhcmFtIHtudW1iZXJ9IGV4aXRUeXBlXHJcbiAqL1xyXG5yb29tLmV4aXRSb29tID0gZnVuY3Rpb24gKGV4aXRUeXBlID0gMCkge1xyXG4gICAgdGhpcy5leGl0U3RhdGUgPSBST09NX0VYSVQuQkFTRTtcclxuICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEV4aXRSb29tKCk7XHJcbiAgICBpZiAoX3JvdXRlKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSb29tSnVIdWEoKTtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhfcm91dGUsIHsgZXhpdFR5cGU6IGV4aXRUeXBlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICog6YCA5Ye65oi/6Ze057uT5p6cXHJcbiAqL1xyXG5yb29tLnJvb21fcm9vbUhhbmRsZXJfZXhpdFJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUucGFuZWwuY2xvc2VSb29tSnVIdWEoKTtcclxuICAgIHRoaXMuc2V0U2VydmVyR2FtZUlkKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZXhpdFN0YXRlID09PSBST09NX0VYSVQuQ0hBTkdFX1RBQkxFKSB7XHJcbiAgICAgICAgbGV0IGdhbWVJZCA9IHRoaXMuY3VyRW50ZXJHYW1lSUQsXHJcbiAgICAgICAgICAgIGJldFR5cGUgPSB0aGlzLmN1ckVudGVyQmV0VHlwZTtcclxuICAgICAgICB0aGlzLmxvZ2ljRGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dDaGFuZ2VUYWJsZVBhbmVsKCk7XHJcblxyXG4gICAgICAgIGlmIChnbEdhbWUuZW50ZXJSb29tVmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5yb29tLnJlcUdvbGRSb29tVmVyaWZ5KGdhbWVJZCwgYmV0VHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnJvb20uc2V0R29sZFJvb21JbmZvKGdhbWVJZCwgYmV0VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmV4aXRTdGF0ZSA9PT0gUk9PTV9FWElULlJFQ1VSX1JPVU5EKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyRW50ZXJHYW1lRGF0YSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZVJvb20odGhpcy5jdXJFbnRlckdhbWVJRCwgdGhpcy5jdXJFbnRlckdhbWVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZXhpdFN0YXRlID09PSBST09NX0VYSVQuSU5WSVRFX0FOT1RIRVJfUk9VTkQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5FbnRlclJvb21DaGVjayh0aGlzLmN1ckVudGVyR2FtZUlEKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5leGl0R2FtZVJvb20oKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOmHkeW4geWcuuaIv+mXtOino+aVo1xyXG4gKi9cclxucm9vbS5vbkRpc2JhbmRSb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCJcIiwgXCLor6XmiL/pl7Tlt7Lnu4/op6PmlaNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5jbG9zZVJvb21KdUh1YSgpO1xyXG4gICAgICAgIGlmICghUk9PTV9HQU1FW3RoaXMuY3VyRW50ZXJHYW1lSURdKSB0aGlzLmV4aXRHYW1lUm9vbSgpO1xyXG4gICAgICAgIGVsc2UgZ2xHYW1lLmVtaXR0ZXIuZW1pdChgJHtTZXJ2ZXJHYW1lTmFtZVt0aGlzLmN1ckVudGVyR2FtZUlEXX1fb25EaXNiYW5kUm9vbV9vcEV2ZW50YCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDpgoDor7flho3mnaXkuIDlsYDnm5HlkKxcclxuICovXHJcbnJvb20ub25JbnZpdGVkQW5vdGhlclJvdW5kID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgaWYgKCh0aGlzLmN1ckVudGVyUm9vbUlEID09IG1zZy5wcmVSb29tSWQgfHwgdGhpcy5jdXJFbnRlclJvb21JRCA9PSAwKSAmJiB0aGlzLmN1ckVudGVyUm9vbVR5cGUgIT0gUk9PTV9UWVBFLkZJU0gpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBnbEdhbWUudGlwcy5ST09NLkFTS0ZPUkpPSU4uZm9ybWF0KG1zZy5uaWNrbmFtZSksICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyRW50ZXJSb29tSUQgPT0gbXNnLnByZVJvb21JZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leGl0U3RhdGUgPSBST09NX0VYSVQuSU5WSVRFX0FOT1RIRVJfUk9VTkQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckVudGVyR2FtZUlEID0gbXNnLmdhbWVJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJSb29tTnVtID0gbXNnLnJvb21OdW07XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Jvb21KdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9yb3V0ZSA9IHRoaXMuZ2V0RXhpdFJvb20oKTtcclxuICAgICAgICAgICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgeyBleGl0VHlwZTogMSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1ckVudGVyUm9vbUlEID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSBtc2cuZ2FtZUlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJFbnRlclJvb21OdW0gPSBtc2cucm9vbU51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRW50ZXJSb29tQ2hlY2sodGhpcy5jdXJFbnRlckdhbWVJRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJPT00uUExBWUlORyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+aVsOaNruWxguWIneWni+WMllxyXG4gKi9cclxucm9vbS5sb2dpY0NyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBnYW1lTmFtZSA9IGdsR2FtZS5zY2VuZS5nZXRTY2VuZU5hbWVCeUlEKHRoaXMuY3VyRW50ZXJHYW1lSUQpO1xyXG4gICAgaWYgKCFnYW1lTmFtZSkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXF1aXJlKGAke2dhbWVOYW1lfWxvZ2ljYCkuZ2V0SW5zdGFuY2UoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiDmuLjmiI/mlbDmja7lsYLplIDmr4FcclxuICovXHJcbnJvb20ubG9naWNEZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGdhbWVOYW1lID0gZ2xHYW1lLnNjZW5lLmdldFNjZW5lTmFtZUJ5SUQodGhpcy5jdXJFbnRlckdhbWVJRCk7XHJcbiAgICBpZiAoIWdhbWVOYW1lKSByZXR1cm47XHJcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS3ov5nmmK/lrZDmuLjmiI/nmoTmlbDmja7lsYLplIDmr4EtLS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXF1aXJlKGAke2dhbWVOYW1lfWxvZ2ljYCkuZGVzdHJveSgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihlKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5yb29tLmVudGVyUm9vbUZhaWx1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmxvZ2ljRGVzdHJveSgpO1xyXG4gICAgZ2xHYW1lLm5vdGljZS5yZXNldERhdGEoKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICog5Yib5bu65oi/6Ze0XHJcbiAqL1xyXG5yb29tLkNyZWF0ZVJvb20gPSBmdW5jdGlvbiAoZ2FtZUlkLCBtc2cpIHtcclxuICAgIGxldCBfcm91dGUgPSB0aGlzLmdldENyZWF0ZVJvb20oZ2FtZUlkKTtcclxuICAgIHRoaXMuZ2FtZUlkID0gZ2FtZUlkO1xyXG4gICAgaWYgKF9yb3V0ZSkgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coX3JvdXRlLCBtc2cpO1xyXG59XHJcblxyXG4vKipcclxuICog6L+b5YWl5oi/6Ze0XHJcbiAqL1xyXG5yb29tLkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLnNjZW5lLnNldE5leHRTY2VuZVRhZyh0aGlzLmN1ckVudGVyR2FtZUlEKTtcclxuICAgIGdsR2FtZS5zY2VuZS5lbnRlck5leHRTY2VuZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEVudGVyUm9vbSgpO1xyXG4gICAgICAgIGlmIChfcm91dGUpIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKF9yb3V0ZSwgeyByb29tTnVtOiB0aGlzLmN1ckVudGVyUm9vbU51bSB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5ri45oiP57G75Z6L6L+b5YWl5oi/6Ze0XHJcbiAqL1xyXG5yb29tLmdldEdhbWVJZEJ5Um9vbU51bSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIHRoaXMuY3VyRW50ZXJSb29tTnVtID0gbXNnLnJvb21OdW07XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhgcXVlcnkuaGFuZGxlci5nZXRHYW1lSWRCeVJvb21OdW1gLCBtc2cpO1xyXG59XHJcblxyXG4vKipcclxuICog55uR5ZCs5oi/6Ze05ri45oiPaWRcclxuICovXHJcbnJvb20ucXVlcnlfaGFuZGxlcl9nZXRHYW1lSWRCeVJvb21OdW0gPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gXCJudW1iZXJcIikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoYHF1ZXJ5LmhhbmRsZXIuZ2V0R2FtZUlkQnlSb29tTnVtOiAke21zZ31gKTtcclxuICAgIHRoaXMuY3VyRW50ZXJHYW1lSUQgPSBtc2c7XHJcbiAgICB0aGlzLmN1ckVudGVyUm9vbVR5cGUgPSBST09NX1RZUEUuQ0FSRDtcclxuXHJcbiAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwiZ2V0R2FtZUlkQnlSb29tTnVtXCIsIHsgZ2FtZUlkOiBtc2cgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDov5vlhaXmiL/pl7TlhoXmo4DmtYtcclxuICovXHJcbnJvb20uRW50ZXJSb29tQ2hlY2sgPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XHJcbiAgICB0aGlzLnJlcU15R2FtZVN0YXRlKGdhbWVJZCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiYgZ2xHYW1lLnVzZXIuZ2FtZSA9PSAyKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCJcIiwgZ2xHYW1lLnRpcHMuUk9PTS5BQ0NPVU5URVhDRVBUSU9OLCAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5nYW1lQ29uZmlnLkVudHJhbmNlUmVzdHJpY3Rpb25zID4gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSkge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOaIv+mXtOmZkOWItlwiLCB0aGlzLmdhbWVDb25maWcpXHJcbiAgICAgICAgLy8gICAgIGxldCBzdHJpbmcgPSBgIDxjb2xvcj0jOTlDN0ZGPuaCqOeahOmHkeW4geS4jei2s++8jOivpeaIv+mXtOmcgOimgTwvYz4gPGNvbG9yPSNmZjAwMDA+ICR7dGhpcy5nZXRGbG9hdCh0aGlzLmdhbWVDb25maWcuRW50cmFuY2VSZXN0cmljdGlvbnMpfSAgPC9jPjxjb2xvcj0jOTlDN0ZGPumHkeW4geaJjeWPr+S4i+azqO+8jOaYr+WQpumprOS4iuWJjeW+gOWFheWAvO+8nzwvYz5gXHJcbiAgICAgICAgLy8gICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIHN0cmluZywgKCkgPT4geyBnbEdhbWUucGFuZWwuc2hvd1Nob3AoMTAwKSB9LCAoKSA9PiB7IH0sIFwi5Y+W5raIXCIsIFwi5YWF5YC8XCIpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGxldCBfcm91dGUgPSB0aGlzLmdldEVudGVyUm9vbUNoZWNrKGdhbWVJZCk7XHJcbiAgICAgICAgaWYgKF9yb3V0ZSkgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coX3JvdXRlLCB7IHJvb21OdW06IHRoaXMuY3VyRW50ZXJSb29tTnVtIH0pO1xyXG4gICAgfSkuY2F0Y2goKCkgPT4geyB9KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDov5vlhaXmiL/pl7TlhoXmo4DmtYtcclxuICovXHJcbnJvb20ucm9vbV9yb29tSGFuZGxlcl9lbnRlclJvb21DaGVjayA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIHRoaXMubG9naWNEZXN0cm95KCk7XHJcbiAgICB0aGlzLkpvaW5Sb29tKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBodHRwIOaNouaIv+aOpeWPo1xyXG4gKiBAcGFyYW0gZ2FtZUlEIOa4uOaIj0lEXHJcbiAqIEBwYXJhbSBiZXRUeXBlIOWcuuasoeexu+Wei1xyXG4gKiBAcGFyYW0gbmV4dFxyXG4gKi9cclxucm9vbS5yZXFDaGFuZ2VSb29tID0gZnVuY3Rpb24gKGdhbWVJRCwgYmV0VHlwZSwgbmV4dCkge1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcUNoYW5nZVJvb21cIiwgeyBnYW1laWQ6IGdhbWVJRCwgYmV0dHlwZTogYmV0VHlwZSB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog5YmN5ZCO5Y+w5YiH5o2i5pat57q/5LiA5LiLXHJcbiAqL1xyXG5yb29tLkVudGVyRm9yZWdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjdXRHYW1lVGltZSA9IERhdGUubm93KCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoNSk7XHJcbiAgICBpZiAoY3V0R2FtZVRpbWUgLSB0aGlzLmN1dEdhbWVUaW1lID49IGdsR2FtZS5ncm91bmQuY3V0Z2FtZXRpbWUpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbn07XHJcbnJvb20uRW50ZXJCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jdXRHYW1lVGltZSA9IERhdGUubm93KCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoNSk7XHJcbn07XHJcbi8qKlxyXG4gKiDojrflj5bnlKjmiLfkv6Hmga/vvIjlup/lvIPmjqXlj6PvvIlcclxuICogQHBhcmFtIHtBcnJheX0gdWlkc1xyXG4gKi9cclxucm9vbS5yZXFVc2VycyA9IGZ1bmN0aW9uICh1aWRzKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxVXNlcnNcIiwgeyBcInVpZHNcIjogdWlkcyB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gbXNnLnVzZXJzO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdXNlciA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgIHRoaXMudXNlcnNbdXNlcltcImlkXCJdXSA9IHVzZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJ1cGRhdGVVc2Vyc1wiKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICog6K6+572u5oi/6Ze05oyH5a6a5bGe5oCnXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgICAgICDmiL/pl7TlsZ7mgKflrZfmrrVcclxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlICAgIOaIv+mXtOWxnuaAp+Wtl+auteWAvFxyXG4gKi9cclxucm9vbS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgdGhpc1trZXldID0gdmFsdWU7XHJcbn07XHJcbi8qKlxyXG4gKiDojrflj5bmiL/pl7TmjIflrprlsZ7mgKdcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKi9cclxucm9vbS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICByZXR1cm4gdGhpc1trZXldO1xyXG59O1xyXG5yb29tLmdldEdhbWVOYW1lQnlJZCA9IGZ1bmN0aW9uIChnYW1laWQpIHtcclxuICAgIGxldCBuYW1lID0gU2VydmVyR2FtZU5hbWVbZ2FtZWlkXTtcclxuICAgIHJldHVybiBuYW1lO1xyXG59O1xyXG5yb29tLmdldFNlcnZlckdhbWVOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFNlcnZlckdhbWVOYW1lO1xyXG59XHJcbnJvb20uZ2V0R2FtZURpY3RCeUlkID0gZnVuY3Rpb24gKGdhbWVpZCkge1xyXG4gICAgbGV0IG5hbWUgPSBTZXJ2ZXJHYW1lRGljdFtnYW1laWRdO1xyXG4gICAgcmV0dXJuIG5hbWU7XHJcbn07XHJcblxyXG5yb29tLmdldEdhbWVCZXRUeXBlID0gZnVuY3Rpb24gKGJldHR5cGUpIHtcclxuICAgIHJldHVybiBCRVRfVFlQRVtiZXR0eXBlXVxyXG59XHJcblxyXG5yb29tLnNldFNlcnZlckdhbWVJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VydmVyR2FtZWlkID0gMDtcclxufTtcclxuXHJcbnJvb20uZ2V0VXBHYW1lVHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnVwR2FtZVR5cGU7XHJcbn1cclxuXHJcbnJvb20uZ2V0VXBHYW1lVHlwZVJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51cEdhbWVUeXBlID09PSBST09NX1RZUEUuQ0FSRDtcclxufVxyXG4vL+ajgOafpea4uOaIj+aYr+WQpuWxnuS6juaWree6v+mHjei/nlxyXG5yb29tLmNoZWNrR2FtZVN0YXRlID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBnbEdhbWUuc2NlbmUuZ2V0VXBTY2VuZSgpID09IGdsR2FtZS5zY2VuZS5nZXROb3dTY2VuZSgpO1xyXG59XHJcblxyXG5cclxuLy/pkojlr7nmnInnibnmrorlsZ7mgKfmuLjmiI/nmoTlvLnnqpflgZrlpITnkIYo5o2i6IKk5a6M5ZCO5Y+v5Lul5aSE55CG5YWz6Zet5aSE55CGKVxyXG5yb29tLmdldEdhbWVTaG93TXNnQm94ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBnYW1lbGlzdCA9IFtdO1xyXG4gICAgZ2FtZWxpc3QucHVzaChnbEdhbWUuc2NlbmV0YWcuUlFaTk4pOyAgICAgICAgICAgLy/miqLluoTniZvniZsgICAgICDvvIjmiL/pl7TlnLrvvIlcclxuICAgIGdhbWVsaXN0LnB1c2goZ2xHYW1lLnNjZW5ldGFnLldRWk5OKTsgICAgICAgICAgIC8v55yL54mM5oqi5bqE54mb54mbICDvvIjph5HluIHlnLrvvIlcclxuICAgIGdhbWVsaXN0LnB1c2goZ2xHYW1lLnNjZW5ldGFnLkhPTkdIRUkpOyAgICAgICAgIC8v57qi6buRICDvvIjmiL/pl7TlnLrvvIlcclxuICAgIGdhbWVsaXN0LnB1c2goZ2xHYW1lLnNjZW5ldGFnLkZJU0gyKTsgICAgICAgICAgIC8v5o2V6bG8XHJcbiAgICBnYW1lbGlzdC5wdXNoKGdsR2FtZS5zY2VuZXRhZy5GSVNIMyk7ICAgICAgICAgICAvL+aNlemxvFxyXG5cclxuICAgIHJldHVybiBnYW1lbGlzdC5pbmRleE9mKGdsR2FtZS5zY2VuZS5nZXROb3dTY2VuZSgpKSA+IC0xOyAgICAgICAgICAgLy/moKHpqozmmK/lkKbmnInor6XmuLjmiI9cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWdfaW5zdGFuY2UpIHtcclxuICAgICAgICBnX2luc3RhbmNlID0gbmV3IFJvb20oKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59O1xyXG4iXX0=
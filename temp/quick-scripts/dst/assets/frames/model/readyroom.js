
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/readyroom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8814fQRIvdMpJ9oRBw/xWSy', 'readyroom');
// frames/model/readyroom.js

"use strict";

var ReadyRoom = function ReadyRoom() {
  this.resetData();
  this.registerEvent(); //测试数据

  this.roomserver = "";
  this.roomid = 0;
},
    readyroom = ReadyRoom.prototype,
    g_instance = null;

var ROOM_RECORD = 100;

module.exports = function () {
  if (!g_instance) {
    g_instance = new ReadyRoom();
  }

  return g_instance;
};

readyroom.resetData = function () {
  this.gameid = 0;
  this.server_time = 0;
  this.roomlist = {};
  this.roomrecord = {};
  this.doublerecord = {};
  this.hhTypeRecord = {};
};
/**
 * 设置房间指定属性
 * @param {string} key      房间属性字段
 * @param {object} value    房间属性字段值
 */


readyroom.set = function (key, value) {
  this[key] = value;
};
/**
 * 获取房间指定属性
 * @param {string} key
 * @returns {object}
 */


readyroom.get = function (key) {
  return this[key];
};
/**
 * 网络数据监听
 */


readyroom.registerEvent = function () {
  for (var key in glGame.room.getServerGameName()) {
    if (!glGame.room.getServerGameName().hasOwnProperty(key)) continue;
    var name = glGame.room.getServerGameName()[key];
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.enterArea"), this.onHandlerEnterArea, this);
    glGame.emitter.on("".concat(name, "Room.").concat(name, "RoomHandler.exitArea"), this.onHandlerExitArea, this);
  }

  glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
  glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
  glGame.emitter.on("onHandInfo_area", this.onHandInfo, this);
  glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
  glGame.emitter.on("onGameConfig", this.onGameConfig, this);
};
/**
 * 网络数据监听销毁
 */


readyroom.unRegisterEvent = function () {
  glGame.emitter.off("onGameInfolist_area", this);
  glGame.emitter.off("onRoomInfo_area", this);
  glGame.emitter.off("onHandInfo_area", this);
  glGame.emitter.off("onDeleteRoom_area", this);
  glGame.emitter.off("onGameConfig", this);

  for (var key in glGame.room.getServerGameName()) {
    if (!glGame.room.getServerGameName().hasOwnProperty(key)) continue;
    var name = glGame.room.getServerGameName()[key];
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.enterArea"), this);
    glGame.emitter.off("".concat(name, "Room.").concat(name, "RoomHandler.exitArea"), this);
  }
};
/**
 * 服务端发送数据
 */


readyroom.onGameConfig = function (msg) {
  this.gameInfo = msg;
};
/**
 * 获取房间准备函数
 * @param {number} game_id 游戏id
 */


readyroom.reqEnterArea = function (game_id) {
  if (!game_id) return console.error("area.areaHandler.enterArea gameid null");
  var msg = {
    gameid: game_id
  };
  this.gameid = game_id;
  var name = glGame.room.getGameNameById(this.gameid);
  glGame.gameNet.send_msg("".concat(name, "Room.").concat(name, "RoomHandler.enterArea"), msg);
  glGame.panel.showRoomJuHua();
};
/**
 * 退出准备房间函数
 */


readyroom.reqExitArea = function () {
  var name = glGame.room.getGameNameById(this.gameid);

  if (name) {
    glGame.panel.showRoomJuHua();
    glGame.gameNet.send_msg("".concat(name, "Room.").concat(name, "RoomHandler.exitArea"));
  }
};
/**
 * 退出准备房间回包函数
 */


readyroom.onHandlerExitArea = function () {
  glGame.panel.closeRoomJuHua();
  this.resetData();
};
/**
 * 进入准备房间函数
 */


readyroom.onHandlerEnterArea = function () {
  glGame.panel.closeRoomJuHua();
};
/**
 * 删除房间函数
 */


readyroom.onDeleteRoom = function (msg) {
  console.log("删除房间的数据结构", msg);
  var deleteInfo = msg;

  for (var id in this.roomlist[deleteInfo.roomtype]) {
    if (id == deleteInfo.roomid) {
      delete this.roomlist[deleteInfo.roomtype][id];
    }
  }
};
/**
 * 获取房间准备函数
 * @param {object} msg 获取游戏中所有房间数据
 */


readyroom.onGameInfolist = function (msg) {
  console.log("这是入口的消息", msg);
  if (!msg) return console.error("onGameInfolist_area msg null"); //清理战绩数据

  this.roomrecord = {};
  this.gameid = msg.gameid;
  this.server_time = msg.servertime;

  for (var roomarea in msg.roomdata) {
    var area_data = msg.roomdata[roomarea];
    if (!area_data) continue;

    for (var roomid in area_data) {
      var room_data = area_data[roomid];
      if (!room_data.roomid) continue;
      this.roomserver = room_data.roomserverid;
      this.roomid = room_data.roomid;
      var roomrecord = [];
      roomrecord[roomid] = room_data.record;
      this.setGameRecord(roomrecord);
      delete room_data.record;
    }
  }

  this.roomlist = msg.roomdata;
}; //测试函数--------------------------


readyroom.getRoomServer = function () {
  return this.roomserver;
};

readyroom.getRoomId = function () {
  return this.roomid;
}; //----------------------------------

/**
 * 设置水果机的战绩数据
 * @param {number} roomid       服务端roomid
 * @param {string} roomserver   服务端roomserver
 */


readyroom.enterHundredsRoom = function (roomid, roomserver) {
  if (roomserver == "") return; // glGame.readyroom.reqExitArea();

  glGame.room.reqHundredsRoom(this.gameid, roomid, roomserver);
}; //百人场走房间模式的入口调用


readyroom.enterHundredsRoomOther = function (gameid, bettype) {
  if (bettype == "") return;
  glGame.room.reqHundredsRoomOther(gameid, bettype);
};
/**
 * 获取推送的单条数据
 * @param {object} msg 单条刷新的游戏数据
 */


readyroom.onRoomInfo = function (msg) {
  if (!msg) return console.error("onRoomInfo_area msg null");
  if (this.gameid != msg.gameid) return console.log("onRoomInfo_area gameid error!", this.gameid, msg.game_id);
  this.server_time = msg.servertime;
  if (!this.roomlist) return console.error("onRoomInfo_area roomlist null");
  this.setRoomData(msg.roomdata);
};
/**
 * 获取推送的战绩数据
 * @param {object} msg 单条刷新的游戏数据
 */


readyroom.onHandInfo = function (msg) {
  if (msg.isclear) {
    this.roomrecord[msg.roomid] = [];
    this.doublerecord[msg.roomid] = [];
    return;
  }

  var roomrecord = [];
  roomrecord[msg.roomid] = [];
  roomrecord[msg.roomid].push(msg.record);
  this.setGameRecord(roomrecord);
};
/**
 * 设置相关房间数据
 * @param {object} roomdata
 */


readyroom.setRoomData = function (roomdata) {
  console.log("roomdata", roomdata);
  var count = 0;

  for (var id in this.roomlist[roomdata.bettype]) {
    if (id == roomdata.roomid) {
      count++;
    }
  }

  if (count == 0) {
    console.log("这是增加的房间信息");
    if (!this.roomlist[roomdata.bettype]) this.roomlist[roomdata.bettype] = {};
    this.roomlist[roomdata.bettype][roomdata.roomid] = roomdata;
  }

  for (var bigRoom in this.roomlist) {
    var room_data = this.roomlist[bigRoom][roomdata.roomid];
    if (!room_data) continue;
    room_data.roomserverid = roomdata.roomserverid;
    room_data.online = roomdata.online;
    room_data.limit = roomdata.limit;
    room_data.process = roomdata.process;
    room_data.curwaittime = roomdata.curwaittime;
    room_data.bettype = roomdata.bettype;
    room_data.roomid = roomdata.roomid;

    if (roomdata.record.length) {
      var roomrecord = [];
      roomrecord[roomdata.roomid] = [];
      roomrecord[roomdata.roomid].push(roomdata.record);
      this.setGameRecord(roomrecord);
    }

    break;
  }
};
/**
 * 根据不同游戏进行战绩显示
 * @param {object} record 服务端的数据串
 */


readyroom.setGameRecord = function (record) {
  switch (this.gameid) {
    case glGame.scenetag.ZHAJINHUA:
      // 炸金花
      this.setGameZjhRecord(record);
      break;

    case glGame.scenetag.QZNN:
      // 抢庄牛牛
      this.setGameQznnRecord(record);
      break;

    case glGame.scenetag.BRNN:
      // 百人牛牛
      this.setGameBrnnRecord(record);
      break;

    case glGame.scenetag.SANGONG:
      // 三公
      this.setGameSgRecord(record);
      break;

    case glGame.scenetag.HONGHEI:
      // 红黑
      this.setGameHhRecord(record);
      break;

    case glGame.scenetag.SHUIGUOJI:
      // 水果机
      this.setGameSgjRecord(record);
      break;

    case glGame.scenetag.LONGHUDOU:
      // 龙虎斗
      this.setGameLhdRecord(record);
      break;

    case glGame.scenetag.LABA:
      // 拉霸
      this.setGameLbRecord(record);
      break;

    case glGame.scenetag.BAIJIALE:
      // 百家乐
      this.setGameBjlRecord(record);
      break;

    case glGame.scenetag.PAIJIU:
      // 牌九
      this.setGamePjRecord(record);
      break;

    case glGame.scenetag.LUCKTURNTABLE:
      // 幸运大转盘
      this.setGameXydzpRecord(record);
      break;

    case glGame.scenetag.DZPK:
      // 德州扑克
      this.setGameDzpkRecord(record);
      break;

    case glGame.scenetag.DDZ:
      // 斗地主
      this.setGameDdzRecord(record);
      break;

    case glGame.scenetag.QHBJL:
      // 抢红包接龙
      this.setGameQhbjlRecord(record);
      break;

    case glGame.scenetag.HCPY:
      this.setGameQhbjlRecord(record);
      break;

    case glGame.scenetag.SLWH:
      this.setGameQhbjlRecord(record);
      break;

    case glGame.scenetag.HBSL:
      // 红包扫雷
      this.setGameQhbjlRecord(record);
      break;

    default:
      console.error("setGameRecord this.gameid :", this.gameid);
      break;
  }

  this.LengthControlled(ROOM_RECORD, record);
};
/**
 * 设置炸金花的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameZjhRecord = function (record) {};
/**
 * 设置抢庄牛牛的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameQznnRecord = function (record) {};
/**
 * 设置抢红包接龙的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameQhbjlRecord = function (record) {};
/**
 * 设置百人牛牛的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameBrnnRecord = function (record) {
  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var roomrecord = record[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;
    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = record[roomid];else if (roomrecord.length == 1 && this.roomrecord[roomid].length) this.roomrecord[roomid].push(record[roomid][0]);
  }
};
/**
 * 设置三公的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameSgRecord = function (record) {};
/**
 * 设置红黑的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameHhRecord = function (record) {
  var TYPE_HONG = 1;
  var TYPE_HEI = 2;

  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var line = [];
    var roomrecord = record[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;
    var count = roomrecord.length;
    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];
    if (!this.hhTypeRecord[roomid] || this.hhTypeRecord[roomid].length == 0) this.hhTypeRecord[roomid] = [];else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
      var room_count = this.roomrecord[roomid].length;
      line = this.roomrecord[roomid][room_count - 1];
      this.roomrecord[roomid].splice(room_count - 1, 1);
    }

    for (var i = 0; i < count; i++) {
      this.hhTypeRecord[roomid].push({
        curType: roomrecord[i].curType,
        areaIndex: roomrecord[i].areaIndex
      });

      if (roomrecord[i].areaIndex == 1) {
        if (line.result != TYPE_HONG) {
          if (line.result != 0 && line.result != null) this.roomrecord[roomid].push(line);
          line = [];
          line.result = TYPE_HONG;
        }

        line.count = line.count ? line.count + 1 : 1;
      } else if (roomrecord[i].areaIndex == 2) {
        if (line.result != TYPE_HEI) {
          if (line.result != 0 && line.result != null) {
            this.roomrecord[roomid].push(line);
          }

          line = [];
          line.result = TYPE_HEI;
        }

        line.count = line.count ? line.count + 1 : 1;
      }
    }

    if (line) this.roomrecord[roomid].push(line);
  }

  console.log("这是当前的红黑记录1111", this.hhTypeRecord);
};
/**
 * 设置水果机的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameSgjRecord = function (record) {
  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var roomrecord = record[roomid];
    var arr = this.roomrecord[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;

    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) {
      this.roomrecord[roomid] = record[roomid];
    } else if (roomrecord.length == 1 && arr && arr.length) {
      arr.push(record[roomid][0]);
    }
  }
};
/**
 * 设置龙虎斗的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameLhdRecord = function (record) {
  var TYPE_ZUO = 1;
  var TYPE_YOU = 2;

  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var line = [];
    var roomrecord = record[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;
    var count = roomrecord.length;
    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
      var room_count = this.roomrecord[roomid].length;
      line = this.roomrecord[roomid][room_count - 1];
      this.roomrecord[roomid].splice(room_count - 1, 1);
    }

    for (var i = 0; i < count; i++) {
      if (roomrecord[i].winAreaIndex == 1) {
        if (line.result != TYPE_ZUO) {
          if (line.result != 0 && line.result != null) this.roomrecord[roomid].push(line);
          line = [];
          line.result = TYPE_ZUO;
        }

        line.count = line.count ? line.count + 1 : 1;
      } else if (roomrecord[i].winAreaIndex == 2) {
        if (line.result != TYPE_YOU) {
          if (line.result != 0 && line.result != null) {
            this.roomrecord[roomid].push(line);
          }

          line = [];
          line.result = TYPE_YOU;
        }

        line.count = line.count ? line.count + 1 : 1;
      } else {
        if (line.result != TYPE_YOU && line.result != TYPE_ZUO) continue;

        if (!line.he) {
          line.he = [];
          line.he.push({
            index: line.count,
            num: 1
          });
        } else {
          var he_count = line.he.length,
              bolAdd = false;

          for (var odd = 0; odd < he_count; odd++) {
            var he_data = line.he[odd];

            if (he_data.index == line.count) {
              he_data.num++;
              bolAdd = true;
              break;
            }
          }

          if (!bolAdd) line.he.push({
            index: line.count,
            num: 1
          });
        }
      }
    }

    if (line) this.roomrecord[roomid].push(line);
  }
};
/**
 * 设置拉霸的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameLbRecord = function (record) {};
/**
 * 设置牌九的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGamePjRecord = function (record) {};
/**
 * 设置百家乐的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameBjlRecord = function (record) {
  var TYPE_ZUO = 1;
  var TYPE_YOU = 2;

  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var line = [];
    var roomrecord = record[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;
    var count = roomrecord.length;
    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
      var room_count = this.roomrecord[roomid].length;
      line = this.roomrecord[roomid][room_count - 1];
      this.roomrecord[roomid].splice(room_count - 1, 1);
    }
    if (!this.doublerecord[roomid] || this.doublerecord[roomid].length == 0) this.doublerecord[roomid] = [];

    for (var i = 0; i < count; i++) {
      var data = roomrecord[i];

      if (data[3] == 1 && data[4] == 1) {
        this.doublerecord[roomid].push(3);
      } else if (data[3] != 1 && data[4] == 1) {
        this.doublerecord[roomid].push(2);
      } else if (data[3] == 1 && data[4] != 1) {
        this.doublerecord[roomid].push(1);
      } else {
        this.doublerecord[roomid].push(0);
      }

      if (data[0] > data[1]) {
        if (line.result != TYPE_ZUO) {
          if (line.result != 0 && line.result != null) this.roomrecord[roomid].push(line);
          line = [];
          line.result = TYPE_ZUO;
        }

        line.count = line.count ? line.count + 1 : 1;
      } else if (data[0] < data[1]) {
        if (line.result != TYPE_YOU) {
          if (line.result != 0 && line.result != null) {
            this.roomrecord[roomid].push(line);
          }

          line = [];
          line.result = TYPE_YOU;
        }

        line.count = line.count ? line.count + 1 : 1;
      } else {
        if (line.result != TYPE_YOU && line.result != TYPE_ZUO) continue;

        if (!line.he) {
          line.he = [];
          line.he.push({
            index: line.count,
            num: 1
          });
        } else {
          var he_count = line.he.length,
              bolAdd = false;

          for (var odd = 0; odd < he_count; odd++) {
            var he_data = line.he[odd];

            if (he_data.index == line.count) {
              he_data.num++;
              bolAdd = true;
              break;
            }
          }

          if (!bolAdd) line.he.push({
            index: line.count,
            num: 1
          });
        }
      }
    }

    if (line) this.roomrecord[roomid].push(line);
  }
};
/**
 * 设置幸运大转盘的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameXydzpRecord = function (record) {
  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    var roomrecord = record[roomid];
    if (roomrecord.length == null || roomrecord.length == 0) continue;
    if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = record[roomid];else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
      this.roomrecord[roomid].push(record[roomid][0]);
    }
  }
};
/**
 * 设置德州扑克的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameDzpkRecord = function (record) {};
/**
 * 设置斗地主的战绩数据
 * @param {object} record 服务端的数据串
 */


readyroom.setGameDdzRecord = function (record) {};
/**
 * 长度控制
 * @param {number} length 限制其数组长度
 * @param {Any} record 需要受限的长度设置
 */


readyroom.LengthControlled = function (length, record) {
  for (var roomid in record) {
    if (roomid == "hasValue" || roomid == "resize") {
      continue;
    }

    if (this.roomrecord[roomid] && this.roomrecord[roomid].length > length) this.roomrecord[roomid].splice(0, this.roomrecord[roomid].length - length);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxccmVhZHlyb29tLmpzIl0sIm5hbWVzIjpbIlJlYWR5Um9vbSIsInJlc2V0RGF0YSIsInJlZ2lzdGVyRXZlbnQiLCJyb29tc2VydmVyIiwicm9vbWlkIiwicmVhZHlyb29tIiwicHJvdG90eXBlIiwiZ19pbnN0YW5jZSIsIlJPT01fUkVDT1JEIiwibW9kdWxlIiwiZXhwb3J0cyIsImdhbWVpZCIsInNlcnZlcl90aW1lIiwicm9vbWxpc3QiLCJyb29tcmVjb3JkIiwiZG91YmxlcmVjb3JkIiwiaGhUeXBlUmVjb3JkIiwic2V0Iiwia2V5IiwidmFsdWUiLCJnZXQiLCJnbEdhbWUiLCJyb29tIiwiZ2V0U2VydmVyR2FtZU5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWUiLCJlbWl0dGVyIiwib24iLCJvbkhhbmRsZXJFbnRlckFyZWEiLCJvbkhhbmRsZXJFeGl0QXJlYSIsIm9uR2FtZUluZm9saXN0Iiwib25Sb29tSW5mbyIsIm9uSGFuZEluZm8iLCJvbkRlbGV0ZVJvb20iLCJvbkdhbWVDb25maWciLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJtc2ciLCJnYW1lSW5mbyIsInJlcUVudGVyQXJlYSIsImdhbWVfaWQiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRHYW1lTmFtZUJ5SWQiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJwYW5lbCIsInNob3dSb29tSnVIdWEiLCJyZXFFeGl0QXJlYSIsImNsb3NlUm9vbUp1SHVhIiwibG9nIiwiZGVsZXRlSW5mbyIsImlkIiwicm9vbXR5cGUiLCJzZXJ2ZXJ0aW1lIiwicm9vbWFyZWEiLCJyb29tZGF0YSIsImFyZWFfZGF0YSIsInJvb21fZGF0YSIsInJvb21zZXJ2ZXJpZCIsInJlY29yZCIsInNldEdhbWVSZWNvcmQiLCJnZXRSb29tU2VydmVyIiwiZ2V0Um9vbUlkIiwiZW50ZXJIdW5kcmVkc1Jvb20iLCJyZXFIdW5kcmVkc1Jvb20iLCJlbnRlckh1bmRyZWRzUm9vbU90aGVyIiwiYmV0dHlwZSIsInJlcUh1bmRyZWRzUm9vbU90aGVyIiwic2V0Um9vbURhdGEiLCJpc2NsZWFyIiwicHVzaCIsImNvdW50IiwiYmlnUm9vbSIsIm9ubGluZSIsImxpbWl0IiwicHJvY2VzcyIsImN1cndhaXR0aW1lIiwibGVuZ3RoIiwic2NlbmV0YWciLCJaSEFKSU5IVUEiLCJzZXRHYW1lWmpoUmVjb3JkIiwiUVpOTiIsInNldEdhbWVRem5uUmVjb3JkIiwiQlJOTiIsInNldEdhbWVCcm5uUmVjb3JkIiwiU0FOR09ORyIsInNldEdhbWVTZ1JlY29yZCIsIkhPTkdIRUkiLCJzZXRHYW1lSGhSZWNvcmQiLCJTSFVJR1VPSkkiLCJzZXRHYW1lU2dqUmVjb3JkIiwiTE9OR0hVRE9VIiwic2V0R2FtZUxoZFJlY29yZCIsIkxBQkEiLCJzZXRHYW1lTGJSZWNvcmQiLCJCQUlKSUFMRSIsInNldEdhbWVCamxSZWNvcmQiLCJQQUlKSVUiLCJzZXRHYW1lUGpSZWNvcmQiLCJMVUNLVFVSTlRBQkxFIiwic2V0R2FtZVh5ZHpwUmVjb3JkIiwiRFpQSyIsInNldEdhbWVEenBrUmVjb3JkIiwiRERaIiwic2V0R2FtZURkelJlY29yZCIsIlFIQkpMIiwic2V0R2FtZVFoYmpsUmVjb3JkIiwiSENQWSIsIlNMV0giLCJIQlNMIiwiTGVuZ3RoQ29udHJvbGxlZCIsIlRZUEVfSE9ORyIsIlRZUEVfSEVJIiwibGluZSIsInJvb21fY291bnQiLCJzcGxpY2UiLCJpIiwiY3VyVHlwZSIsImFyZWFJbmRleCIsInJlc3VsdCIsImFyciIsIlRZUEVfWlVPIiwiVFlQRV9ZT1UiLCJ3aW5BcmVhSW5kZXgiLCJoZSIsImluZGV4IiwibnVtIiwiaGVfY291bnQiLCJib2xBZGQiLCJvZGQiLCJoZV9kYXRhIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFZO0FBQ3hCLE9BQUtDLFNBQUw7QUFDQSxPQUFLQyxhQUFMLEdBRndCLENBSXhCOztBQUNBLE9BQUtD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LENBQTZCWCxNQUFNLENBQUN4RCxNQUFELENBQU4sQ0FBZSxDQUFmLENBQTdCO0FBQ0g7QUFDSjtBQUNKLENBWkQ7QUFjQTs7Ozs7O0FBSUFDLFNBQVMsQ0FBQ2tHLGlCQUFWLEdBQThCLFVBQVUzQyxNQUFWLEVBQWtCLENBRS9DLENBRkQ7QUFJQTs7Ozs7O0FBSUF2RCxTQUFTLENBQUNvRyxnQkFBVixHQUE2QixVQUFVN0MsTUFBVixFQUFrQixDQUU5QyxDQUZEO0FBSUE7Ozs7Ozs7QUFLQXZELFNBQVMsQ0FBQzBHLGdCQUFWLEdBQTZCLFVBQVVqQyxNQUFWLEVBQWtCbEIsTUFBbEIsRUFBMEI7QUFDbkQsT0FBSyxJQUFJeEQsTUFBVCxJQUFtQndELE1BQW5CLEVBQTJCO0FBQ3ZCLFFBQUd4RCxNQUFNLElBQUksVUFBVixJQUF3QkEsTUFBTSxJQUFJLFFBQXJDLEVBQThDO0FBQzFDO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLVSxVQUFMLENBQWdCVixNQUFoQixLQUF5QixLQUFLVSxVQUFMLENBQWdCVixNQUFoQixFQUF3QjBFLE1BQXhCLEdBQWlDQSxNQUE5RCxFQUNJLEtBQUtoRSxVQUFMLENBQWdCVixNQUFoQixFQUF3QmdILE1BQXhCLENBQStCLENBQS9CLEVBQWtDLEtBQUt0RyxVQUFMLENBQWdCVixNQUFoQixFQUF3QjBFLE1BQXhCLEdBQWlDQSxNQUFuRTtBQUNQO0FBQ0osQ0FSRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFJlYWR5Um9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuXHJcbiAgICAvL+a1i+ivleaVsOaNrlxyXG4gICAgdGhpcy5yb29tc2VydmVyID0gXCJcIjtcclxuICAgIHRoaXMucm9vbWlkID0gMDtcclxufSxcclxuICAgIHJlYWR5cm9vbSA9IFJlYWR5Um9vbS5wcm90b3R5cGUsXHJcbiAgICBnX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbmxldCBST09NX1JFQ09SRCA9IDEwMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyBSZWFkeVJvb20oKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbnJlYWR5cm9vbS5yZXNldERhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICB0aGlzLnNlcnZlcl90aW1lID0gMDtcclxuICAgIHRoaXMucm9vbWxpc3QgPSB7fTtcclxuICAgIHRoaXMucm9vbXJlY29yZCA9IHt9O1xyXG4gICAgdGhpcy5kb3VibGVyZWNvcmQgPSB7fTtcclxuICAgIHRoaXMuaGhUeXBlUmVjb3JkID0ge307XHJcbn07XHJcblxyXG4vKipcclxuICog6K6+572u5oi/6Ze05oyH5a6a5bGe5oCnXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgICAgICDmiL/pl7TlsZ7mgKflrZfmrrVcclxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlICAgIOaIv+mXtOWxnuaAp+Wtl+auteWAvFxyXG4gKi9cclxucmVhZHlyb29tLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxufTtcclxuLyoqXHJcbiAqIOiOt+WPluaIv+mXtOaMh+WumuWxnuaAp1xyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqL1xyXG5yZWFkeXJvb20uZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXNba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDnvZHnu5zmlbDmja7nm5HlkKxcclxuICovXHJcbnJlYWR5cm9vbS5yZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQga2V5IGluIGdsR2FtZS5yb29tLmdldFNlcnZlckdhbWVOYW1lKCkpIHtcclxuICAgICAgICBpZiAoIWdsR2FtZS5yb29tLmdldFNlcnZlckdhbWVOYW1lKCkuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBnbEdhbWUucm9vbS5nZXRTZXJ2ZXJHYW1lTmFtZSgpW2tleV07XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlckFyZWFgLCB0aGlzLm9uSGFuZGxlckVudGVyQXJlYSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5leGl0QXJlYWAsIHRoaXMub25IYW5kbGVyRXhpdEFyZWEsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkdhbWVJbmZvbGlzdF9hcmVhXCIsIHRoaXMub25HYW1lSW5mb2xpc3QsIHRoaXMpO1xyXG4gICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcy5vblJvb21JbmZvLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25IYW5kSW5mb19hcmVhXCIsIHRoaXMub25IYW5kSW5mbywgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMub25EZWxldGVSb29tLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25HYW1lQ29uZmlnXCIsIHRoaXMub25HYW1lQ29uZmlnLCB0aGlzKTtcclxufTtcclxuLyoqXHJcbiAqIOe9kee7nOaVsOaNruebkeWQrOmUgOavgVxyXG4gKi9cclxucmVhZHlyb29tLnVuUmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkhhbmRJbmZvX2FyZWFcIiwgdGhpcyk7XHJcbiAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkRlbGV0ZVJvb21fYXJlYVwiLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUNvbmZpZ1wiLCB0aGlzKTtcclxuXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZ2xHYW1lLnJvb20uZ2V0U2VydmVyR2FtZU5hbWUoKSkge1xyXG4gICAgICAgIGlmICghZ2xHYW1lLnJvb20uZ2V0U2VydmVyR2FtZU5hbWUoKS5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuICAgICAgICBsZXQgbmFtZSA9IGdsR2FtZS5yb29tLmdldFNlcnZlckdhbWVOYW1lKClba2V5XTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlckFyZWFgLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5leGl0QXJlYWAsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICog5pyN5Yqh56uv5Y+R6YCB5pWw5o2uXHJcbiAqL1xyXG5yZWFkeXJvb20ub25HYW1lQ29uZmlnID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5nYW1lSW5mbyA9IG1zZztcclxufTtcclxuXHJcblxyXG4vKipcclxuICog6I635Y+W5oi/6Ze05YeG5aSH5Ye95pWwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBnYW1lX2lkIOa4uOaIj2lkXHJcbiAqL1xyXG5yZWFkeXJvb20ucmVxRW50ZXJBcmVhID0gZnVuY3Rpb24gKGdhbWVfaWQpIHtcclxuICAgIGlmICghZ2FtZV9pZCkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJhcmVhLmFyZWFIYW5kbGVyLmVudGVyQXJlYSBnYW1laWQgbnVsbFwiKTtcclxuICAgIGxldCBtc2cgPSB7XHJcbiAgICAgICAgZ2FtZWlkOiBnYW1lX2lkLFxyXG4gICAgfVxyXG4gICAgdGhpcy5nYW1laWQgPSBnYW1lX2lkO1xyXG4gICAgbGV0IG5hbWUgPSBnbEdhbWUucm9vbS5nZXRHYW1lTmFtZUJ5SWQodGhpcy5nYW1laWQpO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coYCR7bmFtZX1Sb29tLiR7bmFtZX1Sb29tSGFuZGxlci5lbnRlckFyZWFgLCBtc2cpO1xyXG4gICAgZ2xHYW1lLnBhbmVsLnNob3dSb29tSnVIdWEoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDpgIDlh7rlh4blpIfmiL/pl7Tlh73mlbBcclxuICovXHJcbnJlYWR5cm9vbS5yZXFFeGl0QXJlYSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBuYW1lID0gZ2xHYW1lLnJvb20uZ2V0R2FtZU5hbWVCeUlkKHRoaXMuZ2FtZWlkKTtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSb29tSnVIdWEoKTtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhgJHtuYW1lfVJvb20uJHtuYW1lfVJvb21IYW5kbGVyLmV4aXRBcmVhYCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICog6YCA5Ye65YeG5aSH5oi/6Ze05Zue5YyF5Ye95pWwXHJcbiAqL1xyXG5yZWFkeXJvb20ub25IYW5kbGVyRXhpdEFyZWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUucGFuZWwuY2xvc2VSb29tSnVIdWEoKTtcclxuICAgIHRoaXMucmVzZXREYXRhKCk7XHJcbn07XHJcblxyXG4vKipcclxuICog6L+b5YWl5YeG5aSH5oi/6Ze05Ye95pWwXHJcbiAqL1xyXG5yZWFkeXJvb20ub25IYW5kbGVyRW50ZXJBcmVhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2xHYW1lLnBhbmVsLmNsb3NlUm9vbUp1SHVhKCk7XHJcbn07XHJcbi8qKlxyXG4gKiDliKDpmaTmiL/pl7Tlh73mlbBcclxuICovXHJcbnJlYWR5cm9vbS5vbkRlbGV0ZVJvb20gPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIuWIoOmZpOaIv+mXtOeahOaVsOaNrue7k+aehFwiLCBtc2cpXHJcbiAgICBsZXQgZGVsZXRlSW5mbyA9IG1zZ1xyXG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5yb29tbGlzdFtkZWxldGVJbmZvLnJvb210eXBlXSkge1xyXG4gICAgICAgIGlmIChpZCA9PSBkZWxldGVJbmZvLnJvb21pZCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yb29tbGlzdFtkZWxldGVJbmZvLnJvb210eXBlXVtpZF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluaIv+mXtOWHhuWkh+WHveaVsFxyXG4gKiBAcGFyYW0ge29iamVjdH0gbXNnIOiOt+WPlua4uOaIj+S4reaJgOacieaIv+mXtOaVsOaNrlxyXG4gKi9cclxucmVhZHlyb29tLm9uR2FtZUluZm9saXN0ID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgY29uc29sZS5sb2coXCLov5nmmK/lhaXlj6PnmoTmtojmga9cIiwgbXNnKVxyXG4gICAgaWYgKCFtc2cpIHJldHVybiBjb25zb2xlLmVycm9yKFwib25HYW1lSW5mb2xpc3RfYXJlYSBtc2cgbnVsbFwiKTtcclxuICAgIC8v5riF55CG5oiY57up5pWw5o2uXHJcbiAgICB0aGlzLnJvb21yZWNvcmQgPSB7fTtcclxuICAgIHRoaXMuZ2FtZWlkID0gbXNnLmdhbWVpZDtcclxuICAgIHRoaXMuc2VydmVyX3RpbWUgPSBtc2cuc2VydmVydGltZTtcclxuICAgIGZvciAobGV0IHJvb21hcmVhIGluIG1zZy5yb29tZGF0YSkge1xyXG4gICAgICAgIGxldCBhcmVhX2RhdGEgPSBtc2cucm9vbWRhdGFbcm9vbWFyZWFdO1xyXG4gICAgICAgIGlmICghYXJlYV9kYXRhKSBjb250aW51ZTtcclxuICAgICAgICBmb3IgKGxldCByb29taWQgaW4gYXJlYV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCByb29tX2RhdGEgPSBhcmVhX2RhdGFbcm9vbWlkXTtcclxuICAgICAgICAgICAgaWYgKCFyb29tX2RhdGEucm9vbWlkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNlcnZlciA9IHJvb21fZGF0YS5yb29tc2VydmVyaWQ7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbWlkID0gcm9vbV9kYXRhLnJvb21pZDtcclxuXHJcbiAgICAgICAgICAgIGxldCByb29tcmVjb3JkID0gW107XHJcbiAgICAgICAgICAgIHJvb21yZWNvcmRbcm9vbWlkXSA9IHJvb21fZGF0YS5yZWNvcmQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0R2FtZVJlY29yZChyb29tcmVjb3JkKTtcclxuICAgICAgICAgICAgZGVsZXRlIHJvb21fZGF0YS5yZWNvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yb29tbGlzdCA9IG1zZy5yb29tZGF0YTtcclxufTtcclxuXHJcbi8v5rWL6K+V5Ye95pWwLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxucmVhZHlyb29tLmdldFJvb21TZXJ2ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb29tc2VydmVyO1xyXG59XHJcbnJlYWR5cm9vbS5nZXRSb29tSWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb29taWQ7XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuLyoqXHJcbiAqIOiuvue9ruawtOaenOacuueahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge251bWJlcn0gcm9vbWlkICAgICAgIOacjeWKoeerr3Jvb21pZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcm9vbXNlcnZlciAgIOacjeWKoeerr3Jvb21zZXJ2ZXJcclxuICovXHJcbnJlYWR5cm9vbS5lbnRlckh1bmRyZWRzUm9vbSA9IGZ1bmN0aW9uIChyb29taWQsIHJvb21zZXJ2ZXIpIHtcclxuICAgIGlmIChyb29tc2VydmVyID09IFwiXCIpIHJldHVybjtcclxuICAgIC8vIGdsR2FtZS5yZWFkeXJvb20ucmVxRXhpdEFyZWEoKTtcclxuICAgIGdsR2FtZS5yb29tLnJlcUh1bmRyZWRzUm9vbSh0aGlzLmdhbWVpZCwgcm9vbWlkLCByb29tc2VydmVyKTtcclxufTtcclxuXHJcbi8v55m+5Lq65Zy66LWw5oi/6Ze05qih5byP55qE5YWl5Y+j6LCD55SoXHJcbnJlYWR5cm9vbS5lbnRlckh1bmRyZWRzUm9vbU90aGVyID0gZnVuY3Rpb24gKGdhbWVpZCxiZXR0eXBlKSB7XHJcbiAgICBpZiAoYmV0dHlwZSA9PSBcIlwiKSByZXR1cm47XHJcbiAgICBnbEdhbWUucm9vbS5yZXFIdW5kcmVkc1Jvb21PdGhlcihnYW1laWQsYmV0dHlwZSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaOqOmAgeeahOWNleadoeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gbXNnIOWNleadoeWIt+aWsOeahOa4uOaIj+aVsOaNrlxyXG4gKi9cclxucmVhZHlyb29tLm9uUm9vbUluZm8gPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJvblJvb21JbmZvX2FyZWEgbXNnIG51bGxcIik7XHJcbiAgICBpZiAodGhpcy5nYW1laWQgIT0gbXNnLmdhbWVpZCkgcmV0dXJuIGNvbnNvbGUubG9nKFwib25Sb29tSW5mb19hcmVhIGdhbWVpZCBlcnJvciFcIiwgdGhpcy5nYW1laWQsIG1zZy5nYW1lX2lkKTtcclxuICAgIHRoaXMuc2VydmVyX3RpbWUgPSBtc2cuc2VydmVydGltZTtcclxuICAgIGlmICghdGhpcy5yb29tbGlzdCkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJvblJvb21JbmZvX2FyZWEgcm9vbWxpc3QgbnVsbFwiKTtcclxuICAgIHRoaXMuc2V0Um9vbURhdGEobXNnLnJvb21kYXRhKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICog6I635Y+W5o6o6YCB55qE5oiY57up5pWw5o2uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBtc2cg5Y2V5p2h5Yi35paw55qE5ri45oiP5pWw5o2uXHJcbiAqL1xyXG5yZWFkeXJvb20ub25IYW5kSW5mbyA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGlmIChtc2cuaXNjbGVhcikge1xyXG4gICAgICAgIHRoaXMucm9vbXJlY29yZFttc2cucm9vbWlkXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZG91YmxlcmVjb3JkW21zZy5yb29taWRdID0gW107XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvb21yZWNvcmQgPSBbXTtcclxuICAgIHJvb21yZWNvcmRbbXNnLnJvb21pZF0gPSBbXTtcclxuICAgIHJvb21yZWNvcmRbbXNnLnJvb21pZF0ucHVzaChtc2cucmVjb3JkKTtcclxuICAgIHRoaXMuc2V0R2FtZVJlY29yZChyb29tcmVjb3JkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDorr7nva7nm7jlhbPmiL/pl7TmlbDmja5cclxuICogQHBhcmFtIHtvYmplY3R9IHJvb21kYXRhXHJcbiAqL1xyXG5yZWFkeXJvb20uc2V0Um9vbURhdGEgPSBmdW5jdGlvbiAocm9vbWRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9vbWRhdGFcIiwgcm9vbWRhdGEpXHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5yb29tbGlzdFtyb29tZGF0YS5iZXR0eXBlXSkge1xyXG4gICAgICAgIGlmIChpZCA9PSByb29tZGF0YS5yb29taWQpIHtcclxuICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3VudCA9PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lop7liqDnmoTmiL/pl7Tkv6Hmga9cIilcclxuICAgICAgICBpZiAoIXRoaXMucm9vbWxpc3Rbcm9vbWRhdGEuYmV0dHlwZV0pIHRoaXMucm9vbWxpc3Rbcm9vbWRhdGEuYmV0dHlwZV0gPSB7fTtcclxuICAgICAgICB0aGlzLnJvb21saXN0W3Jvb21kYXRhLmJldHR5cGVdW3Jvb21kYXRhLnJvb21pZF0gPSByb29tZGF0YVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgYmlnUm9vbSBpbiB0aGlzLnJvb21saXN0KSB7XHJcbiAgICAgICAgbGV0IHJvb21fZGF0YSA9IHRoaXMucm9vbWxpc3RbYmlnUm9vbV1bcm9vbWRhdGEucm9vbWlkXTtcclxuICAgICAgICBpZiAoIXJvb21fZGF0YSkgY29udGludWU7XHJcbiAgICAgICAgcm9vbV9kYXRhLnJvb21zZXJ2ZXJpZCA9IHJvb21kYXRhLnJvb21zZXJ2ZXJpZDtcclxuICAgICAgICByb29tX2RhdGEub25saW5lID0gcm9vbWRhdGEub25saW5lO1xyXG4gICAgICAgIHJvb21fZGF0YS5saW1pdCA9IHJvb21kYXRhLmxpbWl0O1xyXG4gICAgICAgIHJvb21fZGF0YS5wcm9jZXNzID0gcm9vbWRhdGEucHJvY2VzcztcclxuICAgICAgICByb29tX2RhdGEuY3Vyd2FpdHRpbWUgPSByb29tZGF0YS5jdXJ3YWl0dGltZTtcclxuICAgICAgICByb29tX2RhdGEuYmV0dHlwZSA9IHJvb21kYXRhLmJldHR5cGU7XHJcbiAgICAgICAgcm9vbV9kYXRhLnJvb21pZCA9IHJvb21kYXRhLnJvb21pZDtcclxuICAgICAgICBpZiAocm9vbWRhdGEucmVjb3JkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcm9vbXJlY29yZCA9IFtdO1xyXG4gICAgICAgICAgICByb29tcmVjb3JkW3Jvb21kYXRhLnJvb21pZF0gPSBbXTtcclxuICAgICAgICAgICAgcm9vbXJlY29yZFtyb29tZGF0YS5yb29taWRdLnB1c2gocm9vbWRhdGEucmVjb3JkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmVjb3JkKHJvb21yZWNvcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDmoLnmja7kuI3lkIzmuLjmiI/ov5vooYzmiJjnu6nmmL7npLpcclxuICogQHBhcmFtIHtvYmplY3R9IHJlY29yZCDmnI3liqHnq6/nmoTmlbDmja7kuLJcclxuICovXHJcbnJlYWR5cm9vbS5zZXRHYW1lUmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgc3dpdGNoICh0aGlzLmdhbWVpZCkge1xyXG4gICAgICAgIGNhc2UgZ2xHYW1lLnNjZW5ldGFnLlpIQUpJTkhVQTogICAgICAgLy8g54K46YeR6IqxXHJcbiAgICAgICAgICAgIHRoaXMuc2V0R2FtZVpqaFJlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGdsR2FtZS5zY2VuZXRhZy5RWk5OOiAgICAgICAgICAgIC8vIOaKouW6hOeJm+eJm1xyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVRem5uUmVjb3JkKHJlY29yZCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgZ2xHYW1lLnNjZW5ldGFnLkJSTk46ICAgICAgICAgICAgLy8g55m+5Lq654mb54mbXHJcbiAgICAgICAgICAgIHRoaXMuc2V0R2FtZUJybm5SZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuU0FOR09ORzogICAgICAgICAvLyDkuInlhaxcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lU2dSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuSE9OR0hFSTogICAgICAgICAvLyDnuqLpu5FcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lSGhSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuU0hVSUdVT0pJOiAgICAgICAvLyDmsLTmnpzmnLpcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lU2dqUmVjb3JkKHJlY29yZCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgZ2xHYW1lLnNjZW5ldGFnLkxPTkdIVURPVTogICAgICAgLy8g6b6Z6JmO5paXXHJcbiAgICAgICAgICAgIHRoaXMuc2V0R2FtZUxoZFJlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGdsR2FtZS5zY2VuZXRhZy5MQUJBOiAgICAgICAgICAgIC8vIOaLiemcuFxyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVMYlJlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGdsR2FtZS5zY2VuZXRhZy5CQUlKSUFMRTogICAgICAgIC8vIOeZvuWutuS5kFxyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVCamxSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuUEFJSklVOiAgICAgICAgICAvLyDniYzkuZ1cclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lUGpSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuTFVDS1RVUk5UQUJMRTogICAvLyDlubjov5DlpKfovaznm5hcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lWHlkenBSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuRFpQSzogICAgICAgICAgICAvLyDlvrflt57miZHlhYtcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lRHpwa1JlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGdsR2FtZS5zY2VuZXRhZy5ERFo6ICAgICAgICAgICAgIC8vIOaWl+WcsOS4u1xyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVEZHpSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuUUhCSkw6ICAgICAgICAgICAvLyDmiqLnuqLljIXmjqXpvplcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lUWhiamxSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBnbEdhbWUuc2NlbmV0YWcuSENQWTpcclxuICAgICAgICAgICAgdGhpcy5zZXRHYW1lUWhiamxSZWNvcmQocmVjb3JkKTtcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIGdsR2FtZS5zY2VuZXRhZy5TTFdIOlxyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVRaGJqbFJlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgZ2xHYW1lLnNjZW5ldGFnLkhCU0w6ICAgICAgICAgIC8vIOe6ouWMheaJq+mbt1xyXG4gICAgICAgICAgICB0aGlzLnNldEdhbWVRaGJqbFJlY29yZChyZWNvcmQpO1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZXRHYW1lUmVjb3JkIHRoaXMuZ2FtZWlkIDpcIiwgdGhpcy5nYW1laWQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuTGVuZ3RoQ29udHJvbGxlZChST09NX1JFQ09SRCwgcmVjb3JkKTtcclxufTtcclxuLyoqXHJcbiAqIOiuvue9rueCuOmHkeiKseeahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVaamhSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuvue9ruaKouW6hOeJm+eJm+eahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVRem5uUmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiDorr7nva7miqLnuqLljIXmjqXpvpnnmoTmiJjnu6nmlbDmja5cclxuICogQHBhcmFtIHtvYmplY3R9IHJlY29yZCDmnI3liqHnq6/nmoTmlbDmja7kuLJcclxuICovXHJcbnJlYWR5cm9vbS5zZXRHYW1lUWhiamxSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcblxyXG59O1xyXG4vKipcclxuICog6K6+572u55m+5Lq654mb54mb55qE5oiY57up5pWw5o2uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmQg5pyN5Yqh56uv55qE5pWw5o2u5LiyXHJcbiAqL1xyXG5yZWFkeXJvb20uc2V0R2FtZUJybm5SZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICBmb3IgKGxldCByb29taWQgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vbXJlY29yZCA9IHJlY29yZFtyb29taWRdO1xyXG4gICAgICAgIGlmIChyb29tcmVjb3JkLmxlbmd0aCA9PSBudWxsIHx8IHJvb21yZWNvcmQubGVuZ3RoID09IDApIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0gfHwgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ubGVuZ3RoID09IDApIHRoaXMucm9vbXJlY29yZFtyb29taWRdID0gcmVjb3JkW3Jvb21pZF07XHJcbiAgICAgICAgZWxzZSBpZiAocm9vbXJlY29yZC5sZW5ndGggPT0gMSAmJiB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXS5sZW5ndGgpIHRoaXMucm9vbXJlY29yZFtyb29taWRdLnB1c2gocmVjb3JkW3Jvb21pZF1bMF0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuvue9ruS4ieWFrOeahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVTZ1JlY29yZCA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICog6K6+572u57qi6buR55qE5oiY57up5pWw5o2uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmQg5pyN5Yqh56uv55qE5pWw5o2u5LiyXHJcbiAqL1xyXG5yZWFkeXJvb20uc2V0R2FtZUhoUmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgY29uc3QgVFlQRV9IT05HID0gMTtcclxuICAgIGNvbnN0IFRZUEVfSEVJID0gMjtcclxuICAgIGZvciAobGV0IHJvb21pZCBpbiByZWNvcmQpIHtcclxuICAgICAgICBpZihyb29taWQgPT0gXCJoYXNWYWx1ZVwiIHx8IHJvb21pZCA9PSBcInJlc2l6ZVwiKXtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgbGV0IHJvb21yZWNvcmQgPSByZWNvcmRbcm9vbWlkXTtcclxuICAgICAgICBpZiAocm9vbXJlY29yZC5sZW5ndGggPT0gbnVsbCB8fCByb29tcmVjb3JkLmxlbmd0aCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICBsZXQgY291bnQgPSByb29tcmVjb3JkLmxlbmd0aDtcclxuICAgICAgICBpZiAoIXRoaXMucm9vbXJlY29yZFtyb29taWRdIHx8IHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCA9PSAwKSB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXSA9IFtdO1xyXG4gICAgICAgIGlmICghdGhpcy5oaFR5cGVSZWNvcmRbcm9vbWlkXXx8IHRoaXMuaGhUeXBlUmVjb3JkW3Jvb21pZF0ubGVuZ3RoID09IDApIHRoaXMuaGhUeXBlUmVjb3JkW3Jvb21pZF0gPSBbXTtcclxuICAgICAgICBlbHNlIGlmIChyb29tcmVjb3JkLmxlbmd0aCA9PSAxICYmIHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcm9vbV9jb3VudCA9IHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgbGluZSA9IHRoaXMucm9vbXJlY29yZFtyb29taWRdW3Jvb21fY291bnQgLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0uc3BsaWNlKHJvb21fY291bnQgLSAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGhUeXBlUmVjb3JkW3Jvb21pZF0ucHVzaCh7Y3VyVHlwZTpyb29tcmVjb3JkW2ldLmN1clR5cGUsYXJlYUluZGV4OnJvb21yZWNvcmRbaV0uYXJlYUluZGV4fSk7XHJcbiAgICAgICAgICAgIGlmIChyb29tcmVjb3JkW2ldLmFyZWFJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZS5yZXN1bHQgIT0gVFlQRV9IT05HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUucmVzdWx0ICE9IDAgJiYgbGluZS5yZXN1bHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ucHVzaChsaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLnJlc3VsdCA9IFRZUEVfSE9ORztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmUuY291bnQgPSBsaW5lLmNvdW50ID8gbGluZS5jb3VudCArIDEgOiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvb21yZWNvcmRbaV0uYXJlYUluZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSBUWVBFX0hFSSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSAwICYmIGxpbmUucmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUucmVzdWx0ID0gVFlQRV9IRUk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaW5lLmNvdW50ID0gbGluZS5jb3VudCA/IGxpbmUuY291bnQgKyAxIDogMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGluZSkgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ucHVzaChsaW5lKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE57qi6buR6K6w5b2VMTExMVwiLHRoaXMuaGhUeXBlUmVjb3JkKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuvue9ruawtOaenOacuueahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVTZ2pSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICBmb3IgKGxldCByb29taWQgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vbXJlY29yZCA9IHJlY29yZFtyb29taWRdO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXTtcclxuICAgICAgICBpZiAocm9vbXJlY29yZC5sZW5ndGggPT0gbnVsbCB8fCByb29tcmVjb3JkLmxlbmd0aCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICBpZiAoIXRoaXMucm9vbXJlY29yZFtyb29taWRdIHx8IHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXJlY29yZFtyb29taWRdID0gcmVjb3JkW3Jvb21pZF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChyb29tcmVjb3JkLmxlbmd0aCA9PSAxICYmIGFyciAmJiBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHJlY29yZFtyb29taWRdWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICog6K6+572u6b6Z6JmO5paX55qE5oiY57up5pWw5o2uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmQg5pyN5Yqh56uv55qE5pWw5o2u5LiyXHJcbiAqL1xyXG5yZWFkeXJvb20uc2V0R2FtZUxoZFJlY29yZCA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgIGNvbnN0IFRZUEVfWlVPID0gMTtcclxuICAgIGNvbnN0IFRZUEVfWU9VID0gMjtcclxuICAgIGZvciAobGV0IHJvb21pZCBpbiByZWNvcmQpIHtcclxuICAgICAgICBpZihyb29taWQgPT0gXCJoYXNWYWx1ZVwiIHx8IHJvb21pZCA9PSBcInJlc2l6ZVwiKXtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgbGV0IHJvb21yZWNvcmQgPSByZWNvcmRbcm9vbWlkXTtcclxuICAgICAgICBpZiAocm9vbXJlY29yZC5sZW5ndGggPT0gbnVsbCB8fCByb29tcmVjb3JkLmxlbmd0aCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICBsZXQgY291bnQgPSByb29tcmVjb3JkLmxlbmd0aDtcclxuICAgICAgICBpZiAoIXRoaXMucm9vbXJlY29yZFtyb29taWRdIHx8IHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCA9PSAwKSB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXSA9IFtdO1xyXG4gICAgICAgIGVsc2UgaWYgKHJvb21yZWNvcmQubGVuZ3RoID09IDEgJiYgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCByb29tX2NvdW50ID0gdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBsaW5lID0gdGhpcy5yb29tcmVjb3JkW3Jvb21pZF1bcm9vbV9jb3VudCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXS5zcGxpY2Uocm9vbV9jb3VudCAtIDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHJvb21yZWNvcmRbaV0ud2luQXJlYUluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSBUWVBFX1pVTykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSAwICYmIGxpbmUucmVzdWx0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbXJlY29yZFtyb29taWRdLnB1c2gobGluZSlcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5yZXN1bHQgPSBUWVBFX1pVTztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmUuY291bnQgPSBsaW5lLmNvdW50ID8gbGluZS5jb3VudCArIDEgOiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvb21yZWNvcmRbaV0ud2luQXJlYUluZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSBUWVBFX1lPVSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSAwICYmIGxpbmUucmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUucmVzdWx0ID0gVFlQRV9ZT1U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaW5lLmNvdW50ID0gbGluZS5jb3VudCA/IGxpbmUuY291bnQgKyAxIDogMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSBUWVBFX1lPVSAmJiBsaW5lLnJlc3VsdCAhPSBUWVBFX1pVTykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpbmUuaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLmhlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5oZS5wdXNoKHsgaW5kZXg6IGxpbmUuY291bnQsIG51bTogMSB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVfY291bnQgPSBsaW5lLmhlLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9sQWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb2RkID0gMDsgb2RkIDwgaGVfY291bnQ7IG9kZCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZV9kYXRhID0gbGluZS5oZVtvZGRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVfZGF0YS5pbmRleCA9PSBsaW5lLmNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZV9kYXRhLm51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9sQWRkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFib2xBZGQpIGxpbmUuaGUucHVzaCh7IGluZGV4OiBsaW5lLmNvdW50LCBudW06IDEgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpbmUpIHRoaXMucm9vbXJlY29yZFtyb29taWRdLnB1c2gobGluZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICog6K6+572u5ouJ6Zy455qE5oiY57up5pWw5o2uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZWNvcmQg5pyN5Yqh56uv55qE5pWw5o2u5LiyXHJcbiAqL1xyXG5yZWFkeXJvb20uc2V0R2FtZUxiUmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiDorr7nva7niYzkuZ3nmoTmiJjnu6nmlbDmja5cclxuICogQHBhcmFtIHtvYmplY3R9IHJlY29yZCDmnI3liqHnq6/nmoTmlbDmja7kuLJcclxuICovXHJcbnJlYWR5cm9vbS5zZXRHYW1lUGpSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuvue9rueZvuWutuS5kOeahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVCamxSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICBjb25zdCBUWVBFX1pVTyA9IDE7XHJcbiAgICBjb25zdCBUWVBFX1lPVSA9IDI7XHJcbiAgICBmb3IgKGxldCByb29taWQgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGxldCByb29tcmVjb3JkID0gcmVjb3JkW3Jvb21pZF07XHJcbiAgICAgICAgaWYgKHJvb21yZWNvcmQubGVuZ3RoID09IG51bGwgfHwgcm9vbXJlY29yZC5sZW5ndGggPT0gMCkgY29udGludWU7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gcm9vbXJlY29yZC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21yZWNvcmRbcm9vbWlkXSB8fCB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXS5sZW5ndGggPT0gMCkgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0gPSBbXTtcclxuICAgICAgICBlbHNlIGlmIChyb29tcmVjb3JkLmxlbmd0aCA9PSAxICYmIHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcm9vbV9jb3VudCA9IHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgbGluZSA9IHRoaXMucm9vbXJlY29yZFtyb29taWRdW3Jvb21fY291bnQgLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0uc3BsaWNlKHJvb21fY291bnQgLSAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvdWJsZXJlY29yZFtyb29taWRdIHx8IHRoaXMuZG91YmxlcmVjb3JkW3Jvb21pZF0ubGVuZ3RoID09IDApIHRoaXMuZG91YmxlcmVjb3JkW3Jvb21pZF0gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByb29tcmVjb3JkW2ldO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVszXSA9PSAxICYmIGRhdGFbNF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVyZWNvcmRbcm9vbWlkXS5wdXNoKDMpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVszXSAhPSAxICYmIGRhdGFbNF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVyZWNvcmRbcm9vbWlkXS5wdXNoKDIpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVszXSA9PSAxICYmIGRhdGFbNF0gIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVyZWNvcmRbcm9vbWlkXS5wdXNoKDEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZXJlY29yZFtyb29taWRdLnB1c2goMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YVswXSA+IGRhdGFbMV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSBUWVBFX1pVTykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlc3VsdCAhPSAwICYmIGxpbmUucmVzdWx0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbXJlY29yZFtyb29taWRdLnB1c2gobGluZSlcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5yZXN1bHQgPSBUWVBFX1pVTztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmUuY291bnQgPSBsaW5lLmNvdW50ID8gbGluZS5jb3VudCArIDEgOiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFbMF0gPCBkYXRhWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZS5yZXN1bHQgIT0gVFlQRV9ZT1UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5yZXN1bHQgIT0gMCAmJiBsaW5lLnJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbXJlY29yZFtyb29taWRdLnB1c2gobGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLnJlc3VsdCA9IFRZUEVfWU9VO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZS5jb3VudCA9IGxpbmUuY291bnQgPyBsaW5lLmNvdW50ICsgMSA6IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZS5yZXN1bHQgIT0gVFlQRV9ZT1UgJiYgbGluZS5yZXN1bHQgIT0gVFlQRV9aVU8pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsaW5lLmhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5oZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaGUucHVzaCh7IGluZGV4OiBsaW5lLmNvdW50LCBudW06IDEgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlX2NvdW50ID0gbGluZS5oZS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbEFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG9kZCA9IDA7IG9kZCA8IGhlX2NvdW50OyBvZGQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVfZGF0YSA9IGxpbmUuaGVbb2RkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlX2RhdGEuaW5kZXggPT0gbGluZS5jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVfZGF0YS5udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvbEFkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYm9sQWRkKSBsaW5lLmhlLnB1c2goeyBpbmRleDogbGluZS5jb3VudCwgbnVtOiAxIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaW5lKSB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXS5wdXNoKGxpbmUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiDorr7nva7lubjov5DlpKfovaznm5jnmoTmiJjnu6nmlbDmja5cclxuICogQHBhcmFtIHtvYmplY3R9IHJlY29yZCDmnI3liqHnq6/nmoTmlbDmja7kuLJcclxuICovXHJcbnJlYWR5cm9vbS5zZXRHYW1lWHlkenBSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICBmb3IgKGxldCByb29taWQgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm9vbXJlY29yZCA9IHJlY29yZFtyb29taWRdO1xyXG4gICAgICAgIGlmIChyb29tcmVjb3JkLmxlbmd0aCA9PSBudWxsIHx8IHJvb21yZWNvcmQubGVuZ3RoID09IDApIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0gfHwgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ubGVuZ3RoID09IDApIHRoaXMucm9vbXJlY29yZFtyb29taWRdID0gcmVjb3JkW3Jvb21pZF07XHJcbiAgICAgICAgZWxzZSBpZiAocm9vbXJlY29yZC5sZW5ndGggPT0gMSAmJiB0aGlzLnJvb21yZWNvcmRbcm9vbWlkXS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0ucHVzaChyZWNvcmRbcm9vbWlkXVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuvue9ruW+t+W3nuaJkeWFi+eahOaImOe7qeaVsOaNrlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVjb3JkIOacjeWKoeerr+eahOaVsOaNruS4slxyXG4gKi9cclxucmVhZHlyb29tLnNldEdhbWVEenBrUmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiDorr7nva7mlpflnLDkuLvnmoTmiJjnu6nmlbDmja5cclxuICogQHBhcmFtIHtvYmplY3R9IHJlY29yZCDmnI3liqHnq6/nmoTmlbDmja7kuLJcclxuICovXHJcbnJlYWR5cm9vbS5zZXRHYW1lRGR6UmVjb3JkID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiDplb/luqbmjqfliLZcclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCDpmZDliLblhbbmlbDnu4Tplb/luqZcclxuICogQHBhcmFtIHtBbnl9IHJlY29yZCDpnIDopoHlj5fpmZDnmoTplb/luqborr7nva5cclxuICovXHJcbnJlYWR5cm9vbS5MZW5ndGhDb250cm9sbGVkID0gZnVuY3Rpb24gKGxlbmd0aCwgcmVjb3JkKSB7XHJcbiAgICBmb3IgKGxldCByb29taWQgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgaWYocm9vbWlkID09IFwiaGFzVmFsdWVcIiB8fCByb29taWQgPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yb29tcmVjb3JkW3Jvb21pZF0mJnRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCA+IGxlbmd0aClcclxuICAgICAgICAgICAgdGhpcy5yb29tcmVjb3JkW3Jvb21pZF0uc3BsaWNlKDAsIHRoaXMucm9vbXJlY29yZFtyb29taWRdLmxlbmd0aCAtIGxlbmd0aCk7XHJcbiAgICB9XHJcbn07Il19
let ReadyRoom = function () {
    this.resetData();
    this.registerEvent();

    //测试数据
    this.roomserver = "";
    this.roomid = 0;
},
    readyroom = ReadyRoom.prototype,
    g_instance = null;

let ROOM_RECORD = 100;

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
    for (let key in glGame.room.getServerGameName()) {
        if (!glGame.room.getServerGameName().hasOwnProperty(key)) continue;
        let name = glGame.room.getServerGameName()[key];
        glGame.emitter.on(`${name}Room.${name}RoomHandler.enterArea`, this.onHandlerEnterArea, this);
        glGame.emitter.on(`${name}Room.${name}RoomHandler.exitArea`, this.onHandlerExitArea, this);
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

    for (let key in glGame.room.getServerGameName()) {
        if (!glGame.room.getServerGameName().hasOwnProperty(key)) continue;
        let name = glGame.room.getServerGameName()[key];
        glGame.emitter.off(`${name}Room.${name}RoomHandler.enterArea`, this);
        glGame.emitter.off(`${name}Room.${name}RoomHandler.exitArea`, this);
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
    let msg = {
        gameid: game_id,
    }
    this.gameid = game_id;
    let name = glGame.room.getGameNameById(this.gameid);
    glGame.gameNet.send_msg(`${name}Room.${name}RoomHandler.enterArea`, msg);
    glGame.panel.showRoomJuHua();
};

/**
 * 退出准备房间函数
 */
readyroom.reqExitArea = function () {
    let name = glGame.room.getGameNameById(this.gameid);
    if (name) {
        glGame.panel.showRoomJuHua();
        glGame.gameNet.send_msg(`${name}Room.${name}RoomHandler.exitArea`);
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
    console.log("删除房间的数据结构", msg)
    let deleteInfo = msg
    for (let id in this.roomlist[deleteInfo.roomtype]) {
        if (id == deleteInfo.roomid) {
            delete this.roomlist[deleteInfo.roomtype][id]
        }
    }
}
/**
 * 获取房间准备函数
 * @param {object} msg 获取游戏中所有房间数据
 */
readyroom.onGameInfolist = function (msg) {
    console.log("这是入口的消息", msg)
    if (!msg) return console.error("onGameInfolist_area msg null");
    //清理战绩数据
    this.roomrecord = {};
    this.gameid = msg.gameid;
    this.server_time = msg.servertime;
    for (let roomarea in msg.roomdata) {
        let area_data = msg.roomdata[roomarea];
        if (!area_data) continue;
        for (let roomid in area_data) {
            let room_data = area_data[roomid];
            if (!room_data.roomid) continue;

            this.roomserver = room_data.roomserverid;
            this.roomid = room_data.roomid;

            let roomrecord = [];
            roomrecord[roomid] = room_data.record;
            this.setGameRecord(roomrecord);
            delete room_data.record;
        }
    }
    this.roomlist = msg.roomdata;
};

//测试函数--------------------------
readyroom.getRoomServer = function () {
    return this.roomserver;
}
readyroom.getRoomId = function () {
    return this.roomid;
}
//----------------------------------


/**
 * 设置水果机的战绩数据
 * @param {number} roomid       服务端roomid
 * @param {string} roomserver   服务端roomserver
 */
readyroom.enterHundredsRoom = function (roomid, roomserver) {
    if (roomserver == "") return;
    // glGame.readyroom.reqExitArea();
    glGame.room.reqHundredsRoom(this.gameid, roomid, roomserver);
};

//百人场走房间模式的入口调用
readyroom.enterHundredsRoomOther = function (gameid,bettype) {
    if (bettype == "") return;
    glGame.room.reqHundredsRoomOther(gameid,bettype);
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
    let roomrecord = [];
    roomrecord[msg.roomid] = [];
    roomrecord[msg.roomid].push(msg.record);
    this.setGameRecord(roomrecord);
};

/**
 * 设置相关房间数据
 * @param {object} roomdata
 */
readyroom.setRoomData = function (roomdata) {
    console.log("roomdata", roomdata)
    let count = 0;
    for (let id in this.roomlist[roomdata.bettype]) {
        if (id == roomdata.roomid) {
            count++
        }
    }
    if (count == 0) {
        console.log("这是增加的房间信息")
        if (!this.roomlist[roomdata.bettype]) this.roomlist[roomdata.bettype] = {};
        this.roomlist[roomdata.bettype][roomdata.roomid] = roomdata
    }
    for (let bigRoom in this.roomlist) {
        let room_data = this.roomlist[bigRoom][roomdata.roomid];
        if (!room_data) continue;
        room_data.roomserverid = roomdata.roomserverid;
        room_data.online = roomdata.online;
        room_data.limit = roomdata.limit;
        room_data.process = roomdata.process;
        room_data.curwaittime = roomdata.curwaittime;
        room_data.bettype = roomdata.bettype;
        room_data.roomid = roomdata.roomid;
        if (roomdata.record.length) {
            let roomrecord = [];
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
        case glGame.scenetag.ZHAJINHUA:       // 炸金花
            this.setGameZjhRecord(record);
            break;
        case glGame.scenetag.QZNN:            // 抢庄牛牛
            this.setGameQznnRecord(record);
            break;
        case glGame.scenetag.BRNN:            // 百人牛牛
            this.setGameBrnnRecord(record);
            break;
        case glGame.scenetag.SANGONG:         // 三公
            this.setGameSgRecord(record);
            break;
        case glGame.scenetag.HONGHEI:         // 红黑
            this.setGameHhRecord(record);
            break;
        case glGame.scenetag.SHUIGUOJI:       // 水果机
            this.setGameSgjRecord(record);
            break;
        case glGame.scenetag.LONGHUDOU:       // 龙虎斗
            this.setGameLhdRecord(record);
            break;
        case glGame.scenetag.LABA:            // 拉霸
            this.setGameLbRecord(record);
            break;
        case glGame.scenetag.BAIJIALE:        // 百家乐
            this.setGameBjlRecord(record);
            break;
        case glGame.scenetag.PAIJIU:          // 牌九
            this.setGamePjRecord(record);
            break;
        case glGame.scenetag.LUCKTURNTABLE:   // 幸运大转盘
            this.setGameXydzpRecord(record);
            break;
        case glGame.scenetag.DZPK:            // 德州扑克
            this.setGameDzpkRecord(record);
            break;
        case glGame.scenetag.DDZ:             // 斗地主
            this.setGameDdzRecord(record);
            break;
        case glGame.scenetag.QHBJL:           // 抢红包接龙
            this.setGameQhbjlRecord(record);
            break;
        case glGame.scenetag.HCPY:
            this.setGameQhbjlRecord(record);
            break
        case glGame.scenetag.SLWH:
            this.setGameQhbjlRecord(record);
            break
        case glGame.scenetag.HBSL:          // 红包扫雷
            this.setGameQhbjlRecord(record);
            break
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
readyroom.setGameZjhRecord = function (record) {

};

/**
 * 设置抢庄牛牛的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameQznnRecord = function (record) {

};

/**
 * 设置抢红包接龙的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameQhbjlRecord = function (record) {

};
/**
 * 设置百人牛牛的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameBrnnRecord = function (record) {
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let roomrecord = record[roomid];
        if (roomrecord.length == null || roomrecord.length == 0) continue;
        if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = record[roomid];
        else if (roomrecord.length == 1 && this.roomrecord[roomid].length) this.roomrecord[roomid].push(record[roomid][0]);
    }
};

/**
 * 设置三公的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameSgRecord = function (record) {

};

/**
 * 设置红黑的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameHhRecord = function (record) {
    const TYPE_HONG = 1;
    const TYPE_HEI = 2;
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let line = [];
        let roomrecord = record[roomid];
        if (roomrecord.length == null || roomrecord.length == 0) continue;
        let count = roomrecord.length;
        if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];
        if (!this.hhTypeRecord[roomid]|| this.hhTypeRecord[roomid].length == 0) this.hhTypeRecord[roomid] = [];
        else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
            let room_count = this.roomrecord[roomid].length;
            line = this.roomrecord[roomid][room_count - 1];
            this.roomrecord[roomid].splice(room_count - 1, 1);
        }
        for (let i = 0; i < count; i++) {
            this.hhTypeRecord[roomid].push({curType:roomrecord[i].curType,areaIndex:roomrecord[i].areaIndex});
            if (roomrecord[i].areaIndex == 1) {
                if (line.result != TYPE_HONG) {
                    if (line.result != 0 && line.result != null)
                        this.roomrecord[roomid].push(line)
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
    console.log("这是当前的红黑记录1111",this.hhTypeRecord)
};

/**
 * 设置水果机的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameSgjRecord = function (record) {
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let roomrecord = record[roomid];
        let arr = this.roomrecord[roomid];
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
    const TYPE_ZUO = 1;
    const TYPE_YOU = 2;
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let line = [];
        let roomrecord = record[roomid];
        if (roomrecord.length == null || roomrecord.length == 0) continue;
        let count = roomrecord.length;
        if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];
        else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
            let room_count = this.roomrecord[roomid].length;
            line = this.roomrecord[roomid][room_count - 1];
            this.roomrecord[roomid].splice(room_count - 1, 1);
        }
        for (let i = 0; i < count; i++) {
            if (roomrecord[i].winAreaIndex == 1) {
                if (line.result != TYPE_ZUO) {
                    if (line.result != 0 && line.result != null)
                        this.roomrecord[roomid].push(line)
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
                    line.he.push({ index: line.count, num: 1 })
                } else {
                    let he_count = line.he.length,
                        bolAdd = false;
                    for (let odd = 0; odd < he_count; odd++) {
                        let he_data = line.he[odd];
                        if (he_data.index == line.count) {
                            he_data.num++;
                            bolAdd = true;
                            break
                        }
                    }
                    if (!bolAdd) line.he.push({ index: line.count, num: 1 });
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
readyroom.setGameLbRecord = function (record) {

};

/**
 * 设置牌九的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGamePjRecord = function (record) {

};

/**
 * 设置百家乐的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameBjlRecord = function (record) {
    const TYPE_ZUO = 1;
    const TYPE_YOU = 2;
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let line = [];
        let roomrecord = record[roomid];
        if (roomrecord.length == null || roomrecord.length == 0) continue;
        let count = roomrecord.length;
        if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = [];
        else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
            let room_count = this.roomrecord[roomid].length;
            line = this.roomrecord[roomid][room_count - 1];
            this.roomrecord[roomid].splice(room_count - 1, 1);
        }
        if (!this.doublerecord[roomid] || this.doublerecord[roomid].length == 0) this.doublerecord[roomid] = [];
        for (let i = 0; i < count; i++) {
            let data = roomrecord[i];
            if (data[3] == 1 && data[4] == 1) {
                this.doublerecord[roomid].push(3)
            } else if (data[3] != 1 && data[4] == 1) {
                this.doublerecord[roomid].push(2)
            } else if (data[3] == 1 && data[4] != 1) {
                this.doublerecord[roomid].push(1)
            } else {
                this.doublerecord[roomid].push(0)
            }
            if (data[0] > data[1]) {
                if (line.result != TYPE_ZUO) {
                    if (line.result != 0 && line.result != null)
                        this.roomrecord[roomid].push(line)
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
                    line.he.push({ index: line.count, num: 1 })
                } else {
                    let he_count = line.he.length,
                        bolAdd = false;
                    for (let odd = 0; odd < he_count; odd++) {
                        let he_data = line.he[odd];
                        if (he_data.index == line.count) {
                            he_data.num++;
                            bolAdd = true;
                            break
                        }
                    }
                    if (!bolAdd) line.he.push({ index: line.count, num: 1 });
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
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        let roomrecord = record[roomid];
        if (roomrecord.length == null || roomrecord.length == 0) continue;
        if (!this.roomrecord[roomid] || this.roomrecord[roomid].length == 0) this.roomrecord[roomid] = record[roomid];
        else if (roomrecord.length == 1 && this.roomrecord[roomid].length) {
            this.roomrecord[roomid].push(record[roomid][0]);
        }
    }
};

/**
 * 设置德州扑克的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameDzpkRecord = function (record) {

};

/**
 * 设置斗地主的战绩数据
 * @param {object} record 服务端的数据串
 */
readyroom.setGameDdzRecord = function (record) {

};

/**
 * 长度控制
 * @param {number} length 限制其数组长度
 * @param {Any} record 需要受限的长度设置
 */
readyroom.LengthControlled = function (length, record) {
    for (let roomid in record) {
        if(roomid == "hasValue" || roomid == "resize"){
            continue;
        }
        if (this.roomrecord[roomid]&&this.roomrecord[roomid].length > length)
            this.roomrecord[roomid].splice(0, this.roomrecord[roomid].length - length);
    }
};
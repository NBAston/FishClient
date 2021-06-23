"use strict";
cc._RF.push(module, '86f8af6p01D8bJLUYdWz38h', 'noticelogic');
// frames/model/noticelogic.js

"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NOTICE_SYSTEM = 0;
var NOTICE_GAME_UERS = 1;
var NOTICE_GAME_ROBOT = 2;

var NoticeLogic = function NoticeLogic() {
  this.resetData();
  this.initData();
},
    noticelogic = NoticeLogic.prototype,
    g_instance = null;
/**
 * 初始化数据
 */


noticelogic.initData = function () {
  this.bNetwork = false;
  this.bEnterPlaza = false;
  this.special_end = 0;
  this.list_min = 20; //最小启动进入大厅协议包

  this.list_max = 100;
  this.delayTime = 60 * 1000;
  this.registerGlobalEvent();
  this.EnterForeground();
};
/**
 * 重置数据
 */


noticelogic.resetData = function () {
  this.content_list = []; //游戏内播报 内部

  this.plaza_list = []; //大厅播报列表 正在播报

  this.task_list = []; //任务列表      ,php服务端任务跑马
};
/**
 * 进入大厅，游戏跑马监测
 */


noticelogic.enterPlaza = function () {
  this.bEnterPlaza = true;

  this._connectPlazaNotice();

  if (this.interval == null) {
    this.interval = setInterval(function () {
      glGame.notice.checkTackList();
    }, 1000);
  }
};

noticelogic.exitPlaza = function () {
  this.bEnterPlaza = false;

  this._disconnectPlazaNotice();

  if (this.interval != null) {
    clearInterval(this.interval);
    this.interval = null;
  }
};

noticelogic._connectPlazaNotice = function () {
  if (this.bNetwork || !this.bEnterPlaza) return;
  glGame.gameNet.send_msg(NETWORK.POMELO.NOTICE_ENTER_HANDLER);
  this.bNetwork = true;
};

noticelogic._disconnectPlazaNotice = function () {
  if (!this.bNetwork) return;
  glGame.gameNet.send_msg(NETWORK.POMELO.NOTICE_EXIT_HANDLER);
  this.bNetwork = false;
};
/**
 * 注册监听
 */


noticelogic.registerGlobalEvent = function () {
  glGame.emitter.on("EnterBackground", this.EnterBackground, this);
  glGame.emitter.on("EnterForeground", this.EnterForeground, this);
  glGame.emitter.on(NETWORK.POMELO.NOTICE_MARQUEE, this.onMarquee, this);
};
/**
 * 取消监听
 */


noticelogic.unRegisterGlobalEvent = function () {
  glGame.emitter.off("EnterBackground", this);
  glGame.emitter.off("EnterForeground", this);
  glGame.emitter.off(NETWORK.POMELO.NOTICE_MARQUEE, this);
};
/**
 * 后台切换回调
 */


noticelogic.EnterBackground = function () {
  if (this.interval != null) {
    clearInterval(this.interval);
    this.interval = null;
  }
};
/**
 * 前台切换回调(开启公共列表设计)
 */


noticelogic.EnterForeground = function () {
  if (this.interval == null) {
    this.interval = setInterval(function () {
      glGame.notice.checkTackList();
    }, 1000);
  }
};
/**
 * 监测大厅播放任务列表
 */


noticelogic.checkTackList = function () {
  var _this = this;

  if (this.task_list.length == 0) return;
  var now_time = Date.now();

  var _loop = function _loop(index) {
    var data = _this.task_list[index];
    if (!data) return "continue";
    var endtime = data.endtime + data.delay,
        starttime = data.starttime + data.delay; //判定是否符合跑马开启时间

    if (data.endtime != 0 && data.starttime != 0) {
      //data.endtime和data.starttime都等于0，为不限时间；
      if (now_time < starttime || now_time > endtime) return "continue";
    } //判定是否符合添加进入播放列表


    if (now_time - data.intervalstart >= data.intervaltime) {
      if (_this.plaza_list.every(function (value) {
        return value.id != data.id;
      })) {
        _this.addPlazaNotice(data);

        data.intervalstart = 0;
        if (_this.plaza_list.length === 1) glGame.emitter.emit(MESSAGE.NOTICE.PLAZA);
      }
    }
  };

  for (var index in this.task_list) {
    var _ret = _loop(index);

    if (_ret === "continue") continue;
  }

  if (this.plaza_list.length <= this.list_min && !this.bNetwork) {
    this._connectPlazaNotice();
  } else if (this.plaza_list.length >= this.list_max) {
    this.removeRedundance();

    this._disconnectPlazaNotice();
  }
};
/**
 * 超过上限，后将对过早的跑马进行清理  系统跑马 > 真人跑马 > 机器跑马
 * @param {number} count  需要删除的数量
 */


noticelogic.removeRedundance = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (this.plaza_list.length < this.list_max) return;
  if (this.removeList(NOTICE_GAME_ROBOT, count)) return;else if (this.removeList(NOTICE_GAME_UERS, count)) return;else if (this.removeList(NOTICE_SYSTEM, count)) return;
};
/**
 * 清理相关类型的上限后的最远跑马
 * @param {number} type   需要删除的类型
 * @param {number} count  需要删除的数量
 */


noticelogic.removeList = function (type, count) {
  var removelist = [];
  var num = this.plaza_list.length - this.list_max;
  num > 0 ? num : count;

  for (var index in this.plaza_list) {
    var notice = this.plaza_list[index];

    if (notice.type == type) {
      removelist.push(index);
    }

    if (removelist.length >= num) break;
  }

  if (removelist.length == 0) return false;
  removelist.sort(function (a, b) {
    return b - a;
  });

  for (var i in removelist) {
    var _index = removelist[i];
    this.plaza_list.splice(_index, 1);
  }

  if (removelist.length < num) return false;
  return true;
};
/**
 * 监听pomelo 的通知消息
 * @param {any} data 游戏内数据类型
 */


noticelogic.onMarquee = function (data) {
  if (!glGame.room.getGameDictById(data.gameId)) return;
  if (this.plaza_list.length >= this.list_max) this.removeRedundance();
  var task_notice = {
    //
    starttime: 0,
    //开启时间段
    endtime: 0,
    //关闭时间段
    intervaltime: 0,
    //时间间隔
    speed: 3,
    //播放速率
    delay: 0,
    //服务端与客户端的时间差
    content: this.getPlazaGameContent(Math.ceil(Math.random() * 100), data),
    //播放内容
    mode: 1,
    //播放方式，1为左右滚动，2为上下滚动
    level: data.level,
    //档次 1 普通 2 高档
    type: Number(data.logicId) > 0 ? NOTICE_GAME_UERS : NOTICE_GAME_ROBOT
  };
  this.addPlazaNotice(task_notice);
  if (this.plaza_list.length === 1) glGame.emitter.emit(MESSAGE.NOTICE.PLAZA);
};
/**
 * 获取跑马说明文字
 * @param {number} index    公告描述类型
 * @param {any} data        游戏内数据类型
 */


noticelogic.getPlazaGameContent = function (index, data) {
  var gameName = "";

  if (data.gameId == glGame.scenetag.LABA) {
    gameName = "<color=#ffdd20>".concat(glGame.room.getGameDictById(data.gameId), "</color>");
  } else {
    gameName = "<color=#ffdd20>".concat(glGame.room.getGameDictById(data.gameId), "-").concat(glGame.room.getRoomType(data.gameId, data.betType), "</color>");
  }

  var strList = [],
      name = "<color=#27d9ff>".concat(data.nickname, "</color>"),
      winCoin = "<color=#f4c404>".concat(this.getNumber(data.winCoin), "</color>");
  strList.push("\u606D\u559C\u73A9\u5BB6".concat(name, "\u5728").concat(gameName, "\u5927\u8D62\u7279\u8D62\uFF0C\u8D62\u5F97\u4E86").concat(winCoin, "\u91D1\u5E01\uFF01"));
  strList.push("\u73A9\u5BB6".concat(name, "\u9E3F\u8FD0\u5F53\u5934\uFF0C\u5728").concat(gameName, "\u8D62\u5F97\u4E86").concat(winCoin, "\u91D1\u5E01\uFF01"));
  strList.push("\u5409\u661F\u9AD8\u7167\uFF0C\u73A9\u5BB6".concat(name, "\u5728").concat(gameName, "\u8D62\u5F97\u4E86").concat(winCoin, "\u91D1\u5E01\uFF01"));
  strList.push("\u798F\u5230\u8FD0\u5230\u8D22\u6C14\u5230\uFF0C\u5728".concat(gameName, "\u4E2D\u73A9\u5BB6").concat(name, "\u8D62\u5F97\u4E86").concat(winCoin, "\u91D1\u5E01\uFF01"));
  var strText = strList[index % strList.length];
  return strText;
};
/**
 * 获取大厅公告的内容
 */


noticelogic.getPlazaContent = function () {
  if (!this.plaza_list[0]) {
    return "";
  }

  return this.plaza_list[0];
};
/**
 * 获取普通公告列表
 */


noticelogic.getContentList = function () {
  return this.content_list;
};
/**
 * 获取普通公告第一条
 */


noticelogic.getContent = function () {
  if (!this.content_list[0]) {
    return "";
  }

  return this.content_list[0];
};
/**
 * 大厅推送的任务公告
 * @param {any}   taskData   公告内容
 * @param {number} time      结束时间戳
 */


noticelogic.addTaskContent = function (taskData, time) {
  //判定是否有重复添加
  if (this.task_list[0]) {
    for (var index in this.task_list) {
      var data = this.task_list[index];
      if (!data) continue;

      if (data.id == taskData.id) {
        data.starttime = taskData.startTime; //开启时间段

        data.endtime = taskData.endTime; //关闭时间段

        data.intervaltime = taskData.intervalTime; //时间间隔

        data.speed = taskData.playSpeed; //播放速率

        data.delay = time; //服务端与客户端的时间差

        data.content = taskData.content; //播放内容

        data.mode = taskData.type; //播放方式，1为左右滚动，2为上下滚动

        data.level = taskData.showLevel; //档次 1 普通 2 高档

        this.removePlazaContentId(data.id);
        return;
      }
    }
  } //添加到任务列表


  var now_time = Date.now();
  var task_notice = {
    id: taskData.id,
    starttime: taskData.startTime,
    //开启时间段
    endtime: taskData.endTime,
    //关闭时间段
    intervaltime: taskData.intervalTime,
    //时间间隔
    speed: taskData.playSpeed,
    //播放速率
    delay: time,
    //服务端与客户端的时间差
    content: taskData.content,
    //播放内容
    mode: taskData.type,
    //播放方式，1为左右滚动，2为上下滚动
    level: taskData.showLevel,
    //档次 1 普通 2 高档
    type: NOTICE_SYSTEM //系统任务标记

  };
  var endtime = taskData.endTime + time,
      starttime = taskData.startTime + time;
  task_notice.intervalstart = now_time < starttime || now_time > endtime || taskData.startTime == 0 ? 0 : now_time - taskData.intervalTime;
  this.task_list.push(task_notice);
};
/**
 * 次序添加大厅跑马
 */


noticelogic.addPlazaNotice = function (data) {
  if (this.plaza_list.length == 0) this.plaza_list.push(data);else if (data.type == this.plaza_list[this.plaza_list.length - 1].type) this.plaza_list.push(data);else {
    var bAdd = false;

    for (var index in this.plaza_list) {
      if (this.plaza_list[index].type > data.type) {
        if (index == 0) index = 1; //防止添加完后背第一条跑马踢出

        this.plaza_list.splice(index, 0, data);
        bAdd = true;
        break;
      }
    }

    if (!bAdd) this.plaza_list.push(data);
  }

  if (this.plaza_list.length <= this.list_min && !this.bNetwork) {
    this._connectPlazaNotice();
  } else if (this.plaza_list.length >= this.list_max) {
    this.removeRedundance();

    this._disconnectPlazaNotice();
  }
};
/**
 * 非单局内出现的公告往后排
 * @param strContent string 公告内容 
 */


noticelogic.addContent = function (strContent) {
  this.content_list.push(strContent);
  if (this.content_list.length === 1) glGame.emitter.emit(MESSAGE.NOTICE.BASE);
};
/**
 * 非单局内出现的公告往后排(列表)
 * @param contentList string[] 公告列表
 */


noticelogic.addContentList = function (contentList) {
  var _this$content_list;

  var bStart = !this.content_list[0];

  (_this$content_list = this.content_list).push.apply(_this$content_list, _toConsumableArray(contentList));

  if (bStart) glGame.emitter.emit(MESSAGE.NOTICE.BASE);
};
/**
 * 对播放结束的通用列表进行清理
 */


noticelogic.removeContent = function () {
  if (this.content_list[0]) this.content_list.splice(0, 1);
};
/**
 * 对播放结束的大厅列表进行清理
 */


noticelogic.removePlazaContent = function () {
  if (!this.plaza_list[0]) return;

  if (this.plaza_list[0].type == NOTICE_SYSTEM && this.task_list[0]) {
    var now_time = Date.now();

    for (var index in this.task_list) {
      var data = this.task_list[index];
      if (!data) continue;

      if (data.id == this.plaza_list[0].id) {
        data.intervalstart = now_time;
        break;
      }
    }

    this.plaza_list.splice(0, 1);
    if (this.plaza_list.length === 1) glGame.emitter.emit(MESSAGE.NOTICE.PLAZA);
  } else this.plaza_list.splice(0, 1);
};
/**
 * 清理相关类型的跑马
 * @param {number} type   需要删除的类型
 */


noticelogic.removePlazaContentType = function (type) {
  var removelist = [];

  for (var index in this.plaza_list) {
    var notice = this.plaza_list[index];

    if (notice.type == type) {
      removelist.push(index);
    }
  }

  if (removelist.length == 0) return false;
  removelist.sort(function (a, b) {
    return b - a;
  });

  for (var i in removelist) {
    var _index2 = removelist[i];
    this.plaza_list.splice(_index2, 1);
  }

  return true;
};
/**
 * 对播放结束的大厅列表进行清理
 * @param {number} id     任务ID
 */


noticelogic.removePlazaContentId = function (id) {
  var removelist = [];

  for (var index in this.plaza_list) {
    var notice = this.plaza_list[index];
    if (notice.id == id) removelist.push(index);
  }

  if (removelist.length == 0) return;
  removelist.sort(function (a, b) {
    return b - a;
  });

  for (var i in removelist) {
    var _index3 = removelist[i];
    this.plaza_list.splice(_index3, 1);
  }
};
/**
 * 作用单局内需要提前公告
 * @param strContent string 公告内容
 */


noticelogic.insertContent = function (strContent) {
  this.content_list.unshift(strContent);
  if (this.special_end === 0 && this.content_list.length === 1) glGame.emitter.emit(MESSAGE.NOTICE.BASE);
};
/**
 * 发送获取http的跑马
 */


noticelogic.reqGetHorseRaceLamp = function () {
  glGame.gameNet.send_msg("http.reqGetHorseRaceLamp", {}, this.http_reqGetHorseRaceLamp.bind(this));
};
/**
 * 解析并对现有跑马进行赋值 等pomelo通知在请求
 * @param route string  访问地址
 * @param data  Array[] 获取公告列表
 */


noticelogic.http_reqGetHorseRaceLamp = function (route, data) {
  this.removePlazaContentType(NOTICE_SYSTEM);
  this.task_list = [];

  if (data.data) {
    var delay = data.serverTime - Date.now();

    for (var i in data.data) {
      var notice = data.data[i];
      this.addTaskContent(notice, delay);
    }

    this.checkTackList();
  }
};
/**
 * 登录时刷新跑马
 * @param data  Array[] 获取公告列表
 */


noticelogic.addHorseRaceLamp = function (data) {
  this.resetData();

  if (data.data) {
    var delay = data.serverTime - Date.now();

    for (var i in data.data) {
      var notice = data.data[i];
      this.addTaskContent(notice, delay);
    }

    this.checkTackList();
  }
};
/**
 * 获取跑马说明文字
 * @param {number} value 修改金币为浮点型保留两位
 */


noticelogic.getNumber = function (value) {
  return Number(value).div(100).toString();
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new NoticeLogic();
  }

  return g_instance;
};

cc._RF.pop();
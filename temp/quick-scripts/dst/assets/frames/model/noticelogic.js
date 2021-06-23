
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/model/noticelogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxtb2RlbFxcbm90aWNlbG9naWMuanMiXSwibmFtZXMiOlsiTk9USUNFX1NZU1RFTSIsIk5PVElDRV9HQU1FX1VFUlMiLCJOT1RJQ0VfR0FNRV9ST0JPVCIsIk5vdGljZUxvZ2ljIiwicmVzZXREYXRhIiwiaW5pdERhdGEiLCJub3RpY2Vsb2dpYyIsInByb3RvdHlwZSIsImdfaW5zdGFuY2UiLCJiTmV0d29yayIsImJFbnRlclBsYXphIiwic3BlY2lhbF9lbmQiLCJsaXN0X21pbiIsImxpc3RfbWF4IiwiZGVsYXlUaW1lIiwicmVnaXN0ZXJHbG9iYWxFdmVudCIsIkVudGVyRm9yZWdyb3VuZCIsImNvbnRlbnRfbGlzdCIsInBsYXphX2xpc3QiLCJ0YXNrX2xpc3QiLCJlbnRlclBsYXphIiwiX2Nvbm5lY3RQbGF6YU5vdGljZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJnbEdhbWUiLCJub3RpY2UiLCJjaGVja1RhY2tMaXN0IiwiZXhpdFBsYXphIiwiX2Rpc2Nvbm5lY3RQbGF6YU5vdGljZSIsImNsZWFySW50ZXJ2YWwiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJORVRXT1JLIiwiUE9NRUxPIiwiTk9USUNFX0VOVEVSX0hBTkRMRVIiLCJOT1RJQ0VfRVhJVF9IQU5ETEVSIiwiZW1pdHRlciIsIm9uIiwiRW50ZXJCYWNrZ3JvdW5kIiwiTk9USUNFX01BUlFVRUUiLCJvbk1hcnF1ZWUiLCJ1blJlZ2lzdGVyR2xvYmFsRXZlbnQiLCJvZmYiLCJsZW5ndGgiLCJub3dfdGltZSIsIkRhdGUiLCJub3ciLCJpbmRleCIsImRhdGEiLCJlbmR0aW1lIiwiZGVsYXkiLCJzdGFydHRpbWUiLCJpbnRlcnZhbHN0YXJ0IiwiaW50ZXJ2YWx0aW1lIiwiZXZlcnkiLCJ2YWx1ZSIsImlkIiwiYWRkUGxhemFOb3RpY2UiLCJlbWl0IiwiTUVTU0FHRSIsIk5PVElDRSIsIlBMQVpBIiwicmVtb3ZlUmVkdW5kYW5jZSIsImNvdW50IiwicmVtb3ZlTGlzdCIsInR5cGUiLCJyZW1vdmVsaXN0IiwibnVtIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsImkiLCJzcGxpY2UiLCJyb29tIiwiZ2V0R2FtZURpY3RCeUlkIiwiZ2FtZUlkIiwidGFza19ub3RpY2UiLCJzcGVlZCIsImNvbnRlbnQiLCJnZXRQbGF6YUdhbWVDb250ZW50IiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJtb2RlIiwibGV2ZWwiLCJOdW1iZXIiLCJsb2dpY0lkIiwiZ2FtZU5hbWUiLCJzY2VuZXRhZyIsIkxBQkEiLCJnZXRSb29tVHlwZSIsImJldFR5cGUiLCJzdHJMaXN0IiwibmFtZSIsIm5pY2tuYW1lIiwid2luQ29pbiIsImdldE51bWJlciIsInN0clRleHQiLCJnZXRQbGF6YUNvbnRlbnQiLCJnZXRDb250ZW50TGlzdCIsImdldENvbnRlbnQiLCJhZGRUYXNrQ29udGVudCIsInRhc2tEYXRhIiwidGltZSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJpbnRlcnZhbFRpbWUiLCJwbGF5U3BlZWQiLCJzaG93TGV2ZWwiLCJyZW1vdmVQbGF6YUNvbnRlbnRJZCIsImJBZGQiLCJhZGRDb250ZW50Iiwic3RyQ29udGVudCIsIkJBU0UiLCJhZGRDb250ZW50TGlzdCIsImNvbnRlbnRMaXN0IiwiYlN0YXJ0IiwicmVtb3ZlQ29udGVudCIsInJlbW92ZVBsYXphQ29udGVudCIsInJlbW92ZVBsYXphQ29udGVudFR5cGUiLCJpbnNlcnRDb250ZW50IiwidW5zaGlmdCIsInJlcUdldEhvcnNlUmFjZUxhbXAiLCJodHRwX3JlcUdldEhvcnNlUmFjZUxhbXAiLCJiaW5kIiwicm91dGUiLCJzZXJ2ZXJUaW1lIiwiYWRkSG9yc2VSYWNlTGFtcCIsImRpdiIsInRvU3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxhQUFhLEdBQUcsQ0FBdEI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxDQUF6QjtBQUNBLElBQU1DLGlC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QUFLLEdBQUdGLElBQUksQ0FBQytFLFVBQUwsR0FBa0JsRixJQUFJLENBQUNDLEdBQUwsRUFBOUI7O0FBQ0EsU0FBSyxJQUFJMEIsQ0FBVCxJQUFjeEIsSUFBSSxDQUFDQSxJQUFuQixFQUF5QjtBQUNyQixVQUFJdkIsTUFBTSxHQUFHdUIsSUFBSSxDQUFDQSxJQUFMLENBQVV3QixDQUFWLENBQWI7QUFDQSxXQUFLOEIsY0FBTCxDQUFvQjdFLE1BQXBCLEVBQTRCeUIsS0FBNUI7QUFDSDs7QUFDRCxTQUFLeEIsYUFBTDtBQUNIO0FBQ0osQ0FWRDtBQWFBOzs7Ozs7QUFJQXBCLFdBQVcsQ0FBQzJGLFNBQVosR0FBd0IsVUFBVTFDLEtBQVYsRUFBaUI7QUFDckMsU0FBUStCLE1BQU0sQ0FBQy9CLEtBQUQsQ0FBTixDQUFjMEUsR0FBZCxDQUFrQixHQUFsQixDQUFELENBQXlCQyxRQUF6QixFQUFQO0FBQ0gsQ0FGRDs7QUFLQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDekIsTUFBSSxDQUFDNUgsVUFBTCxFQUFpQjtBQUNiQSxJQUFBQSxVQUFVLEdBQUcsSUFBSUwsV0FBSixFQUFiO0FBQ0g7O0FBQ0QsU0FBT0ssVUFBUDtBQUNILENBTEQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE5PVElDRV9TWVNURU0gPSAwO1xyXG5jb25zdCBOT1RJQ0VfR0FNRV9VRVJTID0gMTtcclxuY29uc3QgTk9USUNFX0dBTUVfUk9CT1QgPSAyO1xyXG5cclxuXHJcblxyXG5sZXQgTm90aWNlTG9naWMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnJlc2V0RGF0YSgpO1xyXG4gICAgdGhpcy5pbml0RGF0YSgpO1xyXG59LFxyXG4gICAgbm90aWNlbG9naWMgPSBOb3RpY2VMb2dpYy5wcm90b3R5cGUsXHJcbiAgICBnX2luc3RhbmNlID0gbnVsbDtcclxuLyoqXHJcbiAqIOWIneWni+WMluaVsOaNrlxyXG4gKi9cclxubm90aWNlbG9naWMuaW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmJOZXR3b3JrID0gZmFsc2U7XHJcbiAgICB0aGlzLmJFbnRlclBsYXphID0gZmFsc2U7XHJcbiAgICB0aGlzLnNwZWNpYWxfZW5kID0gMDtcclxuICAgIHRoaXMubGlzdF9taW4gPSAyMDsgICAgIC8v5pyA5bCP5ZCv5Yqo6L+b5YWl5aSn5Y6F5Y2P6K6u5YyFXHJcbiAgICB0aGlzLmxpc3RfbWF4ID0gMTAwO1xyXG4gICAgdGhpcy5kZWxheVRpbWUgPSA2MCAqIDEwMDA7XHJcbiAgICB0aGlzLnJlZ2lzdGVyR2xvYmFsRXZlbnQoKTtcclxuICAgIHRoaXMuRW50ZXJGb3JlZ3JvdW5kKCk7XHJcbn07XHJcbi8qKlxyXG4gKiDph43nva7mlbDmja5cclxuICovXHJcbm5vdGljZWxvZ2ljLnJlc2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29udGVudF9saXN0ID0gW107ICAgICAgICAgLy/muLjmiI/lhoXmkq3miqUg5YaF6YOoXHJcbiAgICB0aGlzLnBsYXphX2xpc3QgPSBbXTsgICAgICAgICAgIC8v5aSn5Y6F5pKt5oql5YiX6KGoIOato+WcqOaSreaKpVxyXG4gICAgdGhpcy50YXNrX2xpc3QgPSBbXTsgICAgICAgICAgICAvL+S7u+WKoeWIl+ihqCAgICAgICxwaHDmnI3liqHnq6/ku7vliqHot5HpqaxcclxufTtcclxuLyoqXHJcbiAqIOi/m+WFpeWkp+WOhe+8jOa4uOaIj+i3kemprOebkea1i1xyXG4gKi9cclxubm90aWNlbG9naWMuZW50ZXJQbGF6YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYkVudGVyUGxhemEgPSB0cnVlO1xyXG4gICAgdGhpcy5fY29ubmVjdFBsYXphTm90aWNlKCk7XHJcbiAgICBpZiAodGhpcy5pbnRlcnZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xHYW1lLm5vdGljZS5jaGVja1RhY2tMaXN0KCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5vdGljZWxvZ2ljLmV4aXRQbGF6YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYkVudGVyUGxhemEgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rpc2Nvbm5lY3RQbGF6YU5vdGljZSgpO1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5vdGljZWxvZ2ljLl9jb25uZWN0UGxhemFOb3RpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5iTmV0d29yayB8fCAhdGhpcy5iRW50ZXJQbGF6YSkgcmV0dXJuO1xyXG4gICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coTkVUV09SSy5QT01FTE8uTk9USUNFX0VOVEVSX0hBTkRMRVIpO1xyXG4gICAgdGhpcy5iTmV0d29yayA9IHRydWU7XHJcbn1cclxuXHJcbm5vdGljZWxvZ2ljLl9kaXNjb25uZWN0UGxhemFOb3RpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuYk5ldHdvcmspIHJldHVybjtcclxuICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKE5FVFdPUksuUE9NRUxPLk5PVElDRV9FWElUX0hBTkRMRVIpO1xyXG4gICAgdGhpcy5iTmV0d29yayA9IGZhbHNlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOazqOWGjOebkeWQrFxyXG4gKi9cclxubm90aWNlbG9naWMucmVnaXN0ZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiRW50ZXJCYWNrZ3JvdW5kXCIsIHRoaXMuRW50ZXJCYWNrZ3JvdW5kLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiRW50ZXJGb3JlZ3JvdW5kXCIsIHRoaXMuRW50ZXJGb3JlZ3JvdW5kLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9uKE5FVFdPUksuUE9NRUxPLk5PVElDRV9NQVJRVUVFLCB0aGlzLm9uTWFycXVlZSwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlj5bmtojnm5HlkKxcclxuICovXHJcbm5vdGljZWxvZ2ljLnVuUmVnaXN0ZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIkVudGVyQmFja2dyb3VuZFwiLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIkVudGVyRm9yZWdyb3VuZFwiLCB0aGlzKTtcclxuICAgIGdsR2FtZS5lbWl0dGVyLm9mZihORVRXT1JLLlBPTUVMTy5OT1RJQ0VfTUFSUVVFRSwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlkI7lj7DliIfmjaLlm57osINcclxuICovXHJcbm5vdGljZWxvZ2ljLkVudGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsICE9IG51bGwpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5YmN5Y+w5YiH5o2i5Zue6LCDKOW8gOWQr+WFrOWFseWIl+ihqOiuvuiuoSlcclxuICovXHJcbm5vdGljZWxvZ2ljLkVudGVyRm9yZWdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbEdhbWUubm90aWNlLmNoZWNrVGFja0xpc3QoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOebkea1i+Wkp+WOheaSreaUvuS7u+WKoeWIl+ihqFxyXG4gKi9cclxubm90aWNlbG9naWMuY2hlY2tUYWNrTGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnRhc2tfbGlzdC5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgbGV0IG5vd190aW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGZvciAobGV0IGluZGV4IGluIHRoaXMudGFza19saXN0KSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnRhc2tfbGlzdFtpbmRleF07XHJcbiAgICAgICAgaWYgKCFkYXRhKSBjb250aW51ZTtcclxuICAgICAgICBsZXQgZW5kdGltZSA9IGRhdGEuZW5kdGltZSArIGRhdGEuZGVsYXksXHJcbiAgICAgICAgICAgIHN0YXJ0dGltZSA9IGRhdGEuc3RhcnR0aW1lICsgZGF0YS5kZWxheTtcclxuICAgICAgICAvL+WIpOWumuaYr+WQpuespuWQiOi3kemprOW8gOWQr+aXtumXtFxyXG4gICAgICAgIGlmIChkYXRhLmVuZHRpbWUgIT0gMCAmJiBkYXRhLnN0YXJ0dGltZSAhPSAwKSB7ICAvL2RhdGEuZW5kdGltZeWSjGRhdGEuc3RhcnR0aW1l6YO9562J5LqOMO+8jOS4uuS4jemZkOaXtumXtO+8m1xyXG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPCBzdGFydHRpbWUgfHwgbm93X3RpbWUgPiBlbmR0aW1lKSBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5a6a5piv5ZCm56ym5ZCI5re75Yqg6L+b5YWl5pKt5pS+5YiX6KGoXHJcbiAgICAgICAgaWYgKG5vd190aW1lIC0gZGF0YS5pbnRlcnZhbHN0YXJ0ID49IGRhdGEuaW50ZXJ2YWx0aW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXphX2xpc3QuZXZlcnkoKHZhbHVlKSA9PiB2YWx1ZS5pZCAhPSBkYXRhLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQbGF6YU5vdGljZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGRhdGEuaW50ZXJ2YWxzdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA9PT0gMSkgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLk5PVElDRS5QTEFaQSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA8PSB0aGlzLmxpc3RfbWluICYmICF0aGlzLmJOZXR3b3JrKSB7XHJcbiAgICAgICAgdGhpcy5fY29ubmVjdFBsYXphTm90aWNlKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxhemFfbGlzdC5sZW5ndGggPj0gdGhpcy5saXN0X21heCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUmVkdW5kYW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2Rpc2Nvbm5lY3RQbGF6YU5vdGljZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6LaF6L+H5LiK6ZmQ77yM5ZCO5bCG5a+56L+H5pep55qE6LeR6ams6L+b6KGM5riF55CGICDns7vnu5/ot5HpqawgPiDnnJ/kurrot5HpqawgPiDmnLrlmajot5HpqaxcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50ICDpnIDopoHliKDpmaTnmoTmlbDph49cclxuICovXHJcbm5vdGljZWxvZ2ljLnJlbW92ZVJlZHVuZGFuY2UgPSBmdW5jdGlvbiAoY291bnQgPSAxKSB7XHJcbiAgICBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA8IHRoaXMubGlzdF9tYXgpIHJldHVybjtcclxuICAgIGlmICh0aGlzLnJlbW92ZUxpc3QoTk9USUNFX0dBTUVfUk9CT1QsIGNvdW50KSkgcmV0dXJuO1xyXG4gICAgZWxzZSBpZiAodGhpcy5yZW1vdmVMaXN0KE5PVElDRV9HQU1FX1VFUlMsIGNvdW50KSkgcmV0dXJuO1xyXG4gICAgZWxzZSBpZiAodGhpcy5yZW1vdmVMaXN0KE5PVElDRV9TWVNURU0sIGNvdW50KSkgcmV0dXJuO1xyXG59XHJcblxyXG4vKipcclxuICog5riF55CG55u45YWz57G75Z6L55qE5LiK6ZmQ5ZCO55qE5pyA6L+c6LeR6amsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlICAg6ZyA6KaB5Yig6Zmk55qE57G75Z6LXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCAg6ZyA6KaB5Yig6Zmk55qE5pWw6YePXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5yZW1vdmVMaXN0ID0gZnVuY3Rpb24gKHR5cGUsIGNvdW50KSB7XHJcbiAgICBsZXQgcmVtb3ZlbGlzdCA9IFtdO1xyXG4gICAgbGV0IG51bSA9IHRoaXMucGxhemFfbGlzdC5sZW5ndGggLSB0aGlzLmxpc3RfbWF4O1xyXG4gICAgbnVtID4gMCA/IG51bSA6IGNvdW50O1xyXG4gICAgZm9yIChsZXQgaW5kZXggaW4gdGhpcy5wbGF6YV9saXN0KSB7XHJcbiAgICAgICAgbGV0IG5vdGljZSA9IHRoaXMucGxhemFfbGlzdFtpbmRleF07XHJcbiAgICAgICAgaWYgKG5vdGljZS50eXBlID09IHR5cGUpIHtcclxuICAgICAgICAgICAgcmVtb3ZlbGlzdC5wdXNoKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbW92ZWxpc3QubGVuZ3RoID49IG51bSkgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBpZiAocmVtb3ZlbGlzdC5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmVtb3ZlbGlzdC5zb3J0KChhLCBiKSA9PiBiIC0gYSk7XHJcbiAgICBmb3IgKGxldCBpIGluIHJlbW92ZWxpc3QpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSByZW1vdmVsaXN0W2ldO1xyXG4gICAgICAgIHRoaXMucGxhemFfbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlbW92ZWxpc3QubGVuZ3RoIDwgbnVtKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG4vKipcclxuICog55uR5ZCscG9tZWxvIOeahOmAmuefpea2iOaBr1xyXG4gKiBAcGFyYW0ge2FueX0gZGF0YSDmuLjmiI/lhoXmlbDmja7nsbvlnotcclxuICovXHJcbm5vdGljZWxvZ2ljLm9uTWFycXVlZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICBpZiAoIWdsR2FtZS5yb29tLmdldEdhbWVEaWN0QnlJZChkYXRhLmdhbWVJZCkpIHJldHVybjtcclxuICAgIGlmICh0aGlzLnBsYXphX2xpc3QubGVuZ3RoID49IHRoaXMubGlzdF9tYXgpIHRoaXMucmVtb3ZlUmVkdW5kYW5jZSgpO1xyXG4gICAgbGV0IHRhc2tfbm90aWNlID0geyAgICAgICAgICAgLy9cclxuICAgICAgICBzdGFydHRpbWU6IDAsICAgICAgICAgICAgICAgLy/lvIDlkK/ml7bpl7TmrrVcclxuICAgICAgICBlbmR0aW1lOiAwLCAgICAgICAgICAgICAgICAgLy/lhbPpl63ml7bpl7TmrrVcclxuICAgICAgICBpbnRlcnZhbHRpbWU6IDAsICAgICAgICAgICAgLy/ml7bpl7Tpl7TpmpRcclxuICAgICAgICBzcGVlZDogMywgICAgICAgICAgICAgICAgICAgLy/mkq3mlL7pgJ/njodcclxuICAgICAgICBkZWxheTogMCwgICAgICAgICAgICAgICAgICAgLy/mnI3liqHnq6/kuI7lrqLmiLfnq6/nmoTml7bpl7Tlt65cclxuICAgICAgICBjb250ZW50OiB0aGlzLmdldFBsYXphR2FtZUNvbnRlbnQoTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDApLCBkYXRhKSwgICAgICAgICAgICAgICAgICAvL+aSreaUvuWGheWuuVxyXG4gICAgICAgIG1vZGU6IDEsICAgICAgICAgICAgICAgICAgICAvL+aSreaUvuaWueW8j++8jDHkuLrlt6blj7Pmu5rliqjvvIwy5Li65LiK5LiL5rua5YqoXHJcbiAgICAgICAgbGV2ZWw6IGRhdGEubGV2ZWwsICAgICAgICAgIC8v5qGj5qyhIDEg5pmu6YCaIDIg6auY5qGjXHJcbiAgICAgICAgdHlwZTogTnVtYmVyKGRhdGEubG9naWNJZCkgPiAwID8gTk9USUNFX0dBTUVfVUVSUyA6IE5PVElDRV9HQU1FX1JPQk9ULFxyXG4gICAgfVxyXG4gICAgdGhpcy5hZGRQbGF6YU5vdGljZSh0YXNrX25vdGljZSk7XHJcbiAgICBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA9PT0gMSkgZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLk5PVElDRS5QTEFaQSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5bot5Hpqazor7TmmI7mloflrZdcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4ICAgIOWFrOWRiuaPj+i/sOexu+Wei1xyXG4gKiBAcGFyYW0ge2FueX0gZGF0YSAgICAgICAg5ri45oiP5YaF5pWw5o2u57G75Z6LXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5nZXRQbGF6YUdhbWVDb250ZW50ID0gZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICBsZXQgZ2FtZU5hbWUgPSBcIlwiO1xyXG4gICAgaWYoZGF0YS5nYW1lSWQgPT0gZ2xHYW1lLnNjZW5ldGFnLkxBQkEpIHtcclxuICAgICAgICBnYW1lTmFtZSA9IGA8Y29sb3I9I2ZmZGQyMD4ke2dsR2FtZS5yb29tLmdldEdhbWVEaWN0QnlJZChkYXRhLmdhbWVJZCl9PC9jb2xvcj5gXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdhbWVOYW1lID0gYDxjb2xvcj0jZmZkZDIwPiR7Z2xHYW1lLnJvb20uZ2V0R2FtZURpY3RCeUlkKGRhdGEuZ2FtZUlkKX0tJHtnbEdhbWUucm9vbS5nZXRSb29tVHlwZShkYXRhLmdhbWVJZCwgZGF0YS5iZXRUeXBlKX08L2NvbG9yPmBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3RyTGlzdCA9IFtdLFxyXG4gICAgICAgIG5hbWUgPSBgPGNvbG9yPSMyN2Q5ZmY+JHtkYXRhLm5pY2tuYW1lfTwvY29sb3I+YCxcclxuICAgICAgICB3aW5Db2luID0gYDxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXROdW1iZXIoZGF0YS53aW5Db2luKX08L2NvbG9yPmA7XHJcbiAgICBzdHJMaXN0LnB1c2goYOaBreWWnOeOqeWutiR7bmFtZX3lnKgke2dhbWVOYW1lfeWkp+i1oueJuei1ou+8jOi1ouW+l+S6hiR7d2luQ29pbn3ph5HluIHvvIFgKTtcclxuICAgIHN0ckxpc3QucHVzaChg546p5a62JHtuYW1lfem4v+i/kOW9k+WktO+8jOWcqCR7Z2FtZU5hbWV96LWi5b6X5LqGJHt3aW5Db2lufemHkeW4ge+8gWApO1xyXG4gICAgc3RyTGlzdC5wdXNoKGDlkInmmJ/pq5jnhafvvIznjqnlrrYke25hbWV95ZyoJHtnYW1lTmFtZX3otaLlvpfkuoYke3dpbkNvaW596YeR5biB77yBYCk7XHJcbiAgICBzdHJMaXN0LnB1c2goYOemj+WIsOi/kOWIsOi0ouawlOWIsO+8jOWcqCR7Z2FtZU5hbWV95Lit546p5a62JHtuYW1lfei1ouW+l+S6hiR7d2luQ29pbn3ph5HluIHvvIFgKTtcclxuICAgIGxldCBzdHJUZXh0ID0gc3RyTGlzdFtpbmRleCAlIHN0ckxpc3QubGVuZ3RoXTtcclxuXHJcblxyXG4gICAgcmV0dXJuIHN0clRleHQ7XHJcbn1cclxuLyoqXHJcbiAqIOiOt+WPluWkp+WOheWFrOWRiueahOWGheWuuVxyXG4gKi9cclxubm90aWNlbG9naWMuZ2V0UGxhemFDb250ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnBsYXphX2xpc3RbMF0pIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBsYXphX2xpc3RbMF07XHJcbn07XHJcblxyXG4vKipcclxuICog6I635Y+W5pmu6YCa5YWs5ZGK5YiX6KGoXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5nZXRDb250ZW50TGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRfbGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDojrflj5bmma7pgJrlhazlkYrnrKzkuIDmnaFcclxuICovXHJcbm5vdGljZWxvZ2ljLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuY29udGVudF9saXN0WzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50X2xpc3RbMF07XHJcbn07XHJcblxyXG4vKipcclxuICog5aSn5Y6F5o6o6YCB55qE5Lu75Yqh5YWs5ZGKXHJcbiAqIEBwYXJhbSB7YW55fSAgIHRhc2tEYXRhICAg5YWs5ZGK5YaF5a65XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lICAgICAg57uT5p2f5pe26Ze05oizXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5hZGRUYXNrQ29udGVudCA9IGZ1bmN0aW9uICh0YXNrRGF0YSwgdGltZSkge1xyXG4gICAgLy/liKTlrprmmK/lkKbmnInph43lpI3mt7vliqBcclxuICAgIGlmICh0aGlzLnRhc2tfbGlzdFswXSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIHRoaXMudGFza19saXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy50YXNrX2xpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pZCA9PSB0YXNrRGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydHRpbWUgPSB0YXNrRGF0YS5zdGFydFRpbWU7ICAgICAgICAgICAgICAvL+W8gOWQr+aXtumXtOautVxyXG4gICAgICAgICAgICAgICAgZGF0YS5lbmR0aW1lID0gdGFza0RhdGEuZW5kVGltZTsgICAgICAgICAgICAgICAgICAvL+WFs+mXreaXtumXtOautVxyXG4gICAgICAgICAgICAgICAgZGF0YS5pbnRlcnZhbHRpbWUgPSB0YXNrRGF0YS5pbnRlcnZhbFRpbWU7ICAgICAgICAvL+aXtumXtOmXtOmalFxyXG4gICAgICAgICAgICAgICAgZGF0YS5zcGVlZCA9IHRhc2tEYXRhLnBsYXlTcGVlZDsgICAgICAgICAgICAgICAgICAgLy/mkq3mlL7pgJ/njodcclxuICAgICAgICAgICAgICAgIGRhdGEuZGVsYXkgPSB0aW1lOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mnI3liqHnq6/kuI7lrqLmiLfnq6/nmoTml7bpl7Tlt65cclxuICAgICAgICAgICAgICAgIGRhdGEuY29udGVudCA9IHRhc2tEYXRhLmNvbnRlbnQ7ICAgICAgICAgICAgICAgICAgLy/mkq3mlL7lhoXlrrlcclxuICAgICAgICAgICAgICAgIGRhdGEubW9kZSA9IHRhc2tEYXRhLnR5cGU7ICAgICAgICAgICAgICAgICAgICAgICAgLy/mkq3mlL7mlrnlvI/vvIwx5Li65bem5Y+z5rua5Yqo77yMMuS4uuS4iuS4i+a7muWKqFxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZXZlbCA9IHRhc2tEYXRhLnNob3dMZXZlbDsgICAgICAgICAgICAgICAgICAvL+aho+asoSAxIOaZrumAmiAyIOmrmOaho1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQbGF6YUNvbnRlbnRJZChkYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5re75Yqg5Yiw5Lu75Yqh5YiX6KGoXHJcbiAgICBsZXQgbm93X3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgbGV0IHRhc2tfbm90aWNlID0ge1xyXG4gICAgICAgIGlkOiB0YXNrRGF0YS5pZCxcclxuICAgICAgICBzdGFydHRpbWU6IHRhc2tEYXRhLnN0YXJ0VGltZSwgICAgICAgICAgICAgIC8v5byA5ZCv5pe26Ze05q61XHJcbiAgICAgICAgZW5kdGltZTogdGFza0RhdGEuZW5kVGltZSwgICAgICAgICAgICAgICAgICAvL+WFs+mXreaXtumXtOautVxyXG4gICAgICAgIGludGVydmFsdGltZTogdGFza0RhdGEuaW50ZXJ2YWxUaW1lLCAgICAgICAgLy/ml7bpl7Tpl7TpmpRcclxuICAgICAgICBzcGVlZDogdGFza0RhdGEucGxheVNwZWVkLCAgICAgICAgICAgICAgICAgIC8v5pKt5pS+6YCf546HXHJcbiAgICAgICAgZGVsYXk6IHRpbWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+acjeWKoeerr+S4juWuouaIt+err+eahOaXtumXtOW3rlxyXG4gICAgICAgIGNvbnRlbnQ6IHRhc2tEYXRhLmNvbnRlbnQsICAgICAgICAgICAgICAgICAgLy/mkq3mlL7lhoXlrrlcclxuICAgICAgICBtb2RlOiB0YXNrRGF0YS50eXBlLCAgICAgICAgICAgICAgICAgICAgICAgIC8v5pKt5pS+5pa55byP77yMMeS4uuW3puWPs+a7muWKqO+8jDLkuLrkuIrkuIvmu5rliqhcclxuICAgICAgICBsZXZlbDogdGFza0RhdGEuc2hvd0xldmVsLCAgICAgICAgICAgICAgICAgIC8v5qGj5qyhIDEg5pmu6YCaIDIg6auY5qGjXHJcbiAgICAgICAgdHlwZTogTk9USUNFX1NZU1RFTSwgICAgICAgICAgICAgICAgICAgICAgICAgLy/ns7vnu5/ku7vliqHmoIforrBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZW5kdGltZSA9IHRhc2tEYXRhLmVuZFRpbWUgKyB0aW1lLFxyXG4gICAgICAgIHN0YXJ0dGltZSA9IHRhc2tEYXRhLnN0YXJ0VGltZSArIHRpbWU7XHJcbiAgICB0YXNrX25vdGljZS5pbnRlcnZhbHN0YXJ0ID0gKG5vd190aW1lIDwgc3RhcnR0aW1lIHx8IG5vd190aW1lID4gZW5kdGltZSkgfHwgdGFza0RhdGEuc3RhcnRUaW1lID09IDAgPyAwIDogbm93X3RpbWUgLSB0YXNrRGF0YS5pbnRlcnZhbFRpbWU7XHJcbiAgICB0aGlzLnRhc2tfbGlzdC5wdXNoKHRhc2tfbm90aWNlKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICog5qyh5bqP5re75Yqg5aSn5Y6F6LeR6amsXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5hZGRQbGF6YU5vdGljZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA9PSAwKSB0aGlzLnBsYXphX2xpc3QucHVzaChkYXRhKTtcclxuICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PSB0aGlzLnBsYXphX2xpc3RbdGhpcy5wbGF6YV9saXN0Lmxlbmd0aCAtIDFdLnR5cGUpIHRoaXMucGxhemFfbGlzdC5wdXNoKGRhdGEpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGV0IGJBZGQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiB0aGlzLnBsYXphX2xpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxhemFfbGlzdFtpbmRleF0udHlwZSA+IGRhdGEudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIGluZGV4ID0gMTsgIC8v6Ziy5q2i5re75Yqg5a6M5ZCO6IOM56ys5LiA5p2h6LeR6ams6Lii5Ye6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXphX2xpc3Quc3BsaWNlKGluZGV4LCAwLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGJBZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFiQWRkKSB0aGlzLnBsYXphX2xpc3QucHVzaChkYXRhKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBsYXphX2xpc3QubGVuZ3RoIDw9IHRoaXMubGlzdF9taW4gJiYgIXRoaXMuYk5ldHdvcmspIHtcclxuICAgICAgICB0aGlzLl9jb25uZWN0UGxhemFOb3RpY2UoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF6YV9saXN0Lmxlbmd0aCA+PSB0aGlzLmxpc3RfbWF4KSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVSZWR1bmRhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5fZGlzY29ubmVjdFBsYXphTm90aWNlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDpnZ7ljZXlsYDlhoXlh7rnjrDnmoTlhazlkYrlvoDlkI7mjpJcclxuICogQHBhcmFtIHN0ckNvbnRlbnQgc3RyaW5nIOWFrOWRiuWGheWuuSBcclxuICovXHJcbm5vdGljZWxvZ2ljLmFkZENvbnRlbnQgPSBmdW5jdGlvbiAoc3RyQ29udGVudCkge1xyXG4gICAgdGhpcy5jb250ZW50X2xpc3QucHVzaChzdHJDb250ZW50KTtcclxuICAgIGlmICh0aGlzLmNvbnRlbnRfbGlzdC5sZW5ndGggPT09IDEpIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5OT1RJQ0UuQkFTRSk7XHJcbn07XHJcblxyXG4vKipcclxuICog6Z2e5Y2V5bGA5YaF5Ye6546w55qE5YWs5ZGK5b6A5ZCO5o6SKOWIl+ihqClcclxuICogQHBhcmFtIGNvbnRlbnRMaXN0IHN0cmluZ1tdIOWFrOWRiuWIl+ihqFxyXG4gKi9cclxubm90aWNlbG9naWMuYWRkQ29udGVudExpc3QgPSBmdW5jdGlvbiAoY29udGVudExpc3QpIHtcclxuICAgIGxldCBiU3RhcnQgPSAhdGhpcy5jb250ZW50X2xpc3RbMF07XHJcbiAgICB0aGlzLmNvbnRlbnRfbGlzdC5wdXNoKC4uLmNvbnRlbnRMaXN0KTtcclxuICAgIGlmIChiU3RhcnQpIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5OT1RJQ0UuQkFTRSk7XHJcbn07XHJcblxyXG4vKipcclxuICog5a+55pKt5pS+57uT5p2f55qE6YCa55So5YiX6KGo6L+b6KGM5riF55CGXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5yZW1vdmVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuY29udGVudF9saXN0WzBdKSB0aGlzLmNvbnRlbnRfbGlzdC5zcGxpY2UoMCwgMSk7XHJcbn07XHJcblxyXG4vKipcclxuICog5a+55pKt5pS+57uT5p2f55qE5aSn5Y6F5YiX6KGo6L+b6KGM5riF55CGXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5yZW1vdmVQbGF6YUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMucGxhemFfbGlzdFswXSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLnBsYXphX2xpc3RbMF0udHlwZSA9PSBOT1RJQ0VfU1lTVEVNICYmIHRoaXMudGFza19saXN0WzBdKSB7XHJcbiAgICAgICAgbGV0IG5vd190aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiB0aGlzLnRhc2tfbGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMudGFza19saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gdGhpcy5wbGF6YV9saXN0WzBdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmludGVydmFsc3RhcnQgPSBub3dfdGltZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxhemFfbGlzdC5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGxhemFfbGlzdC5sZW5ndGggPT09IDEpIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5OT1RJQ0UuUExBWkEpO1xyXG4gICAgfSBlbHNlIHRoaXMucGxhemFfbGlzdC5zcGxpY2UoMCwgMSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIOa4heeQhuebuOWFs+exu+Wei+eahOi3kemprFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZSAgIOmcgOimgeWIoOmZpOeahOexu+Wei1xyXG4gKi9cclxubm90aWNlbG9naWMucmVtb3ZlUGxhemFDb250ZW50VHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICBsZXQgcmVtb3ZlbGlzdCA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXggaW4gdGhpcy5wbGF6YV9saXN0KSB7XHJcbiAgICAgICAgbGV0IG5vdGljZSA9IHRoaXMucGxhemFfbGlzdFtpbmRleF07XHJcbiAgICAgICAgaWYgKG5vdGljZS50eXBlID09IHR5cGUpIHtcclxuICAgICAgICAgICAgcmVtb3ZlbGlzdC5wdXNoKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocmVtb3ZlbGlzdC5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmVtb3ZlbGlzdC5zb3J0KChhLCBiKSA9PiBiIC0gYSk7XHJcbiAgICBmb3IgKGxldCBpIGluIHJlbW92ZWxpc3QpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSByZW1vdmVsaXN0W2ldO1xyXG4gICAgICAgIHRoaXMucGxhemFfbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDlr7nmkq3mlL7nu5PmnZ/nmoTlpKfljoXliJfooajov5vooYzmuIXnkIZcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkICAgICDku7vliqFJRFxyXG4gKi9cclxubm90aWNlbG9naWMucmVtb3ZlUGxhemFDb250ZW50SWQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGxldCByZW1vdmVsaXN0ID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCBpbiB0aGlzLnBsYXphX2xpc3QpIHtcclxuICAgICAgICBsZXQgbm90aWNlID0gdGhpcy5wbGF6YV9saXN0W2luZGV4XTtcclxuICAgICAgICBpZiAobm90aWNlLmlkID09IGlkKSByZW1vdmVsaXN0LnB1c2goaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlbW92ZWxpc3QubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgIHJlbW92ZWxpc3Quc29ydCgoYSwgYikgPT4gYiAtIGEpO1xyXG4gICAgZm9yIChsZXQgaSBpbiByZW1vdmVsaXN0KSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gcmVtb3ZlbGlzdFtpXTtcclxuICAgICAgICB0aGlzLnBsYXphX2xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDkvZznlKjljZXlsYDlhoXpnIDopoHmj5DliY3lhazlkYpcclxuICogQHBhcmFtIHN0ckNvbnRlbnQgc3RyaW5nIOWFrOWRiuWGheWuuVxyXG4gKi9cclxubm90aWNlbG9naWMuaW5zZXJ0Q29udGVudCA9IGZ1bmN0aW9uIChzdHJDb250ZW50KSB7XHJcbiAgICB0aGlzLmNvbnRlbnRfbGlzdC51bnNoaWZ0KHN0ckNvbnRlbnQpO1xyXG4gICAgaWYgKHRoaXMuc3BlY2lhbF9lbmQgPT09IDAgJiYgdGhpcy5jb250ZW50X2xpc3QubGVuZ3RoID09PSAxKSBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuTk9USUNFLkJBU0UpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOWPkemAgeiOt+WPlmh0dHDnmoTot5HpqaxcclxuICovXHJcbm5vdGljZWxvZ2ljLnJlcUdldEhvcnNlUmFjZUxhbXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxR2V0SG9yc2VSYWNlTGFtcFwiLCB7fSwgdGhpcy5odHRwX3JlcUdldEhvcnNlUmFjZUxhbXAuYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICog6Kej5p6Q5bm25a+5546w5pyJ6LeR6ams6L+b6KGM6LWL5YC8IOetiXBvbWVsb+mAmuefpeWcqOivt+axglxyXG4gKiBAcGFyYW0gcm91dGUgc3RyaW5nICDorr/pl67lnLDlnYBcclxuICogQHBhcmFtIGRhdGEgIEFycmF5W10g6I635Y+W5YWs5ZGK5YiX6KGoXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5odHRwX3JlcUdldEhvcnNlUmFjZUxhbXAgPSBmdW5jdGlvbiAocm91dGUsIGRhdGEpIHtcclxuICAgIHRoaXMucmVtb3ZlUGxhemFDb250ZW50VHlwZShOT1RJQ0VfU1lTVEVNKTtcclxuICAgIHRoaXMudGFza19saXN0ID0gW107XHJcbiAgICBpZiAoZGF0YS5kYXRhKSB7XHJcbiAgICAgICAgbGV0IGRlbGF5ID0gZGF0YS5zZXJ2ZXJUaW1lIC0gRGF0ZS5ub3coKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbm90aWNlID0gZGF0YS5kYXRhW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRhc2tDb250ZW50KG5vdGljZSwgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrVGFja0xpc3QoKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICog55m75b2V5pe25Yi35paw6LeR6amsXHJcbiAqIEBwYXJhbSBkYXRhICBBcnJheVtdIOiOt+WPluWFrOWRiuWIl+ihqFxyXG4gKi9cclxubm90aWNlbG9naWMuYWRkSG9yc2VSYWNlTGFtcCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB0aGlzLnJlc2V0RGF0YSgpO1xyXG4gICAgaWYgKGRhdGEuZGF0YSkge1xyXG4gICAgICAgIGxldCBkZWxheSA9IGRhdGEuc2VydmVyVGltZSAtIERhdGUubm93KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBkYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGljZSA9IGRhdGEuZGF0YVtpXTtcclxuICAgICAgICAgICAgdGhpcy5hZGRUYXNrQ29udGVudChub3RpY2UsIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja1RhY2tMaXN0KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlui3kemprOivtOaYjuaWh+Wtl1xyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUg5L+u5pS56YeR5biB5Li65rWu54K55Z6L5L+d55WZ5Lik5L2NXHJcbiAqL1xyXG5ub3RpY2Vsb2dpYy5nZXROdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghZ19pbnN0YW5jZSkge1xyXG4gICAgICAgIGdfaW5zdGFuY2UgPSBuZXcgTm90aWNlTG9naWMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59O1xyXG4iXX0=
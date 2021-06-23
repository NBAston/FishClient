"use strict";
cc._RF.push(module, 'e445cKk3hBLbKDcYKgsPeUp', 'assetsmanager');
// frames/model/assetsmanager.js

"use strict";

/**
 * 玩家模型
 * @constructor
 */
var AssetsManager = function AssetsManager() {
  this.resetData();
  this.registerEvent();
},
    assetsManager = AssetsManager.prototype,
    g_instance = null;

assetsManager.resetData = function () {
  this.updateGameMax = 2;
  this.assets_manager = {};
  this.update_list = {};
};
/**
 * 注册事件监听
 * 数据模型的事件无需销毁
 * 理论上重启游戏后就不存在了
 */


assetsManager.registerEvent = function () {// glGame.emitter.on("loginSuccess", this.loginSuccess, this);
  // glGame.emitter.on(MESSAGE.USER.PHONE_VERIFICATION, this.clearAllPhoneInterval, this);
}; // 查找是否需要更新


assetsManager.isNeedUpdate = function (gameName) {
  if (!cc.sys.isNative) return; //真机才做校验

  var update_data = glGame.storage.getItem('update_data');

  if (update_data && update_data[gameName]) {
    //本地缓存有游戏在做校验
    var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
    var url = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest");
    glGame.gamelistcfg.getGameVersion(url).then(function (data) {
      if (data.version === update_data[gameName]) {
        // 不需要更新
        glGame.gamelistcfg.setGameUpdate(gameName);
      } else {
        // 需要更新
        glGame.gamelistcfg.setGameUpdate(gameName, false);
      }
    });
  }
}, // 热更开启
assetsManager.gameUpdata = function (data) {
  if (!cc.sys.isNative) return;
  var gameName = glGame.scene.getSceneNameByID(data.gameID);
  if (!gameName || this.update_list[gameName]) return;
  var update_list_data = {};
  update_list_data.gameID = data.gameID;
  update_list_data.manifestUrl = data.manifestUrl;
  update_list_data.gameName = gameName;
  update_list_data.isUpdating = true;
  update_list_data.isUpdate = true;
  this.update_list[gameName] = update_list_data;
  var update_list_length = Object.keys(this.update_list).length;

  if (update_list_length && update_list_length > this.updateGameMax) {
    // 下载列表大于最大同时下载量的时候显示等待中
    this.update_list[gameName].isUpdate = false;
    glGame.emitter.emit("hotUIRefresh", {
      gameName: gameName,
      isActive: true
    });
    return;
  }

  this.downloadGame(update_list_data);
}; // 开始下载游戏

assetsManager.downloadGame = function (data) {
  var _this = this;

  // 切换到可以跟新的页面
  glGame.emitter.emit("hotUIRefresh", {
    gameName: data.gameName,
    isStatus: 0,
    isActive: true
  });
  var m_assets = new glGame.assets(glGame.scene.getSceneNameByID(data.gameID), data.manifestUrl, function (process) {
    // 更新下载进度条
    process = process ? process : 0;
    console.log("需要发送事件，更新下载进度", process);
    glGame.emitter.emit("hotUIRefresh", {
      gameName: data.gameName,
      isStatus: 1,
      isActive: true,
      process: process
    });
  }, function () {
    // 成功回调
    console.log("assetsManager==============下载完成 ===>", data.gameName);
    var m_gameName = data.gameName;
    var str = glGame.tips.UPDATE.COMPLETED.format("".concat(glGame.room.getGameDictById(data.gameID)));
    glGame.panel.showTip(str, 2);
    glGame.emitter.emit("hotUIRefresh", {
      gameName: m_gameName,
      isActive: false,
      process: 100
    }); // 设置已更新的游戏

    glGame.gamelistcfg.setGameUpdate(m_gameName);

    _this.gameUpdateEnd(data.gameName);

    var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
    var url = "".concat(hotUpdateURL).concat(m_gameName, "/").concat(m_gameName, "version.manifest");
    glGame.gamelistcfg.getGameVersion(url).then(function (verdata) {
      var data = glGame.storage.getItem('update_data');

      if (data) {
        data[m_gameName] = verdata.version;
      } else {
        data = {};
        data[m_gameName] = verdata.version;
      }

      glGame.storage.setItem('update_data', data);
    });
  }, function () {
    // 失败回调
    console.log("assetsManager==============下载失败 ===>", data.gameName);
    glGame.emitter.emit("hotUIRefresh", {
      gameName: data.gameName,
      isActive: false
    });

    _this.gameUpdateEnd(data.gameName);
  });
  this.assets_manager[data.gameName] = m_assets;
}; // 热更结束


assetsManager.gameUpdateEnd = function (gameName) {
  this.assets_manager[gameName].destroy();
  var update_list_keys = Object.keys(this.update_list);
  var update_list_length = update_list_keys.length;
  console.log("热更结束, gameUpdateEnd ===> update_list_length:", update_list_length);
  if (!update_list_length || update_list_length == 0) return; // 热更新下一个

  if (update_list_length > this.updateGameMax) {
    var data = this.update_list[update_list_keys[this.updateGameMax]];
    data.isUpdate = true;
    this.downloadGame(data);
  } // 删除已经跟新完成的数据


  delete this.update_list[gameName];
}; // 检查当前是否有游戏正在跟新


assetsManager.isBeingUpdate = function (gameName) {
  var isUpdate = null;

  for (var key in this.update_list) {
    if (key == gameName) {
      var data = this.update_list[key];

      if (data.isUpdating && data.isUpdate) {
        isUpdate = true;
      } else {
        isUpdate = false;
      }
    }
  }

  return isUpdate;
}; // 检查当前游戏是否已经在更新队列


assetsManager.isUpdateQueue = function (gameId) {
  var isUpdate = false;
  var gameName = glGame.scene.getSceneNameByID(gameId); // 查找更新列表里是否有游戏正在更新

  for (var key in this.update_list) {
    if (key == gameName) {
      var data = this.update_list[key];

      if (data.isUpdating) {
        // 【%s(游戏名称)】正在更新中，请耐心等待...
        glGame.panel.showTip(glGame.tips.UPDATE.UPDATING.format("".concat(glGame.room.getGameDictById(gameId))));
      } else {
        glGame.panel.showTip(glGame.tips.UPDATE.INUPDATEQUEUE.format("".concat(glGame.room.getGameDictById(gameId))));
      }

      isUpdate = true;
    }
  }

  return isUpdate;
}; // 获取热更属性


assetsManager.get = function (key) {
  return this[key];
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new AssetsManager();
  }

  return g_instance;
};

cc._RF.pop();
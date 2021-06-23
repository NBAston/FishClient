"use strict";
cc._RF.push(module, 'a745fYVms9DYa9YjPywmHHg', 'assets');
// frames/base/assets.js

"use strict";

var AssetsManager = function AssetsManager(gameName, manifestUrl, processCB, successCB, failCB) {
  this.resetData(gameName, manifestUrl, processCB, successCB, failCB);
  this.init(gameName);
},
    assetsManager = AssetsManager.prototype;

module.exports = AssetsManager;
var base_path = "master/subpackages/"; //"master/res/raw-assets/modules/games/";

/**
 * 参数初始化
 * @param gameName      游戏code
 * @param manifestUrl   本地清单地址
 * @param processCB     过程回调
 * @param successCB     成功回调
 * @param failCB        失败回调
 */

assetsManager.resetData = function (gameName, manifestUrl, processCB, successCB, failCB) {
  var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
  this.customManifestStr = JSON.stringify({
    "packageUrl": "".concat(hotUpdateURL).concat(gameName, "/"),
    "remoteManifestUrl": "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "project.manifest"),
    "remoteVersionUrl": "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest"),
    "version": "0.0.0",
    "assets": {},
    "searchPaths": []
  });
  this.manifestUrl = manifestUrl;
  this.processCB = processCB;
  this.successCB = successCB;
  this.failCB = failCB;
  this.update_error = 0;
  this.fileError = false;
  this.gameName = gameName;
};
/**
 * 热更下载管理器初始化
 * @param gameName
 */


assetsManager.init = function (gameName) {
  var temp_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "".concat(base_path + gameName, "_temp");

  if (jsb.fileUtils.isDirectoryExist(temp_path)) {
    jsb.fileUtils.removeDirectory(temp_path);
  }

  this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "".concat(base_path + gameName);
  console.log('本地路径 : ' + this._storagePath);

  this.versionCompareHandle = function (versionA, versionB) {
    console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
    return versionA === versionB ? 0 : -1;
  };

  this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);

  this._am.setVerifyCallback(function (path, asset) {
    return true;
  });

  if (cc.sys.os === cc.sys.OS_ANDROID) {
    this._am.setMaxConcurrentTask(10);

    console.log("Android平台最大并发任务计数限制于2");
  }

  this.processCB(0); // 检测更新

  this.checkUpdate();
};
/**
 * 销毁热更下载管理器
 */


assetsManager.destroy = function () {
  this._am.setEventCallback(null);

  this._updating = false;
};
/**
 * 检测更新
 */


assetsManager.checkUpdate = function () {
  if (this._updating) {
    return console.log("正在检查或更新, 请稍等 ...");
  }

  if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
    console.log("正在检查是否需要更新中, 请稍等 ...");

    this._am.loadLocalManifest(this.manifestUrl);
  }

  if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
    if (this._am.getState() !== jsb.AssetsManager.State.UNINITED) return;
    console.log("无法加载本地清单, 使用默认更新清单 ...");
    var manifest = new jsb.Manifest(this.customManifestStr, this._storagePath);

    this._am.loadLocalManifest(manifest, this._storagePath);
  } // this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
  // cc.eventManager.addListener(this._checkListener, 1);


  this._am.setEventCallback(this.checkCb.bind(this));

  this._am.checkUpdate();

  this._updating = true;
};
/**
 * 重试更新
 */


assetsManager.retry = function () {
  var _this = this;

  if (this.update_error <= 2) {
    this.update_error++;

    this._am.downloadFailedAssets();

    this.fileError = false;
  } else {
    glGame.panel.showDialog("提示", "游戏更新出现小意外，请重新下载", function () {
      if (!_this._updating && _this._canRetry) {
        _this._am.downloadFailedAssets();

        _this._canRetry = false;
        _this.fileError = false;
      }
    }, function () {
      _this.failCB();
    });
    this._updating = false;
    this._canRetry = true;
  }
};
/**
 * 开始更新
 */


assetsManager.hotUpdate = function () {
  if (this._am && !this._updating) {
    this._am.setEventCallback(this.updateCb.bind(this));

    if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
      this._am.loadLocalManifest(this.manifestUrl);
    }

    this._failCount = 0;

    this._am.update();

    this._updating = true;
  }
};
/**
 * 检测更新事件回掉
 */


assetsManager.checkCb = function (event) {
  var _this2 = this;

  var isUpdate = false;

  switch (event.getEventCode()) {
    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
      console.log("找不到本地清单文件或则无法下载清单文件, 跳过热更新.");

      if (glGame.scene.getSceneName() != "plaza") {
        this.failCB();
      } else {
        glGame.panel.showMsgBox("提示", glGame.tips.UPDATE.CHECKFAILED, function () {
          // TODO 这里可能要直接退出游戏
          if (_this2._am.getState() !== jsb.AssetsManager.State.UNINITED) {
            _this2.failCB();

            return;
          }

          var manifest = new jsb.Manifest(_this2.customManifestStr, _this2._storagePath);

          _this2._am.loadLocalManifest(manifest, _this2._storagePath);

          _this2.checkUpdate();
        });
      }

      break;

    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
      console.log("已经更新了最新的远程版本.");
      isUpdate = true;
      this.successCB();
      break;

    case jsb.EventAssetsManager.NEW_VERSION_FOUND:
      console.log("'找到新版本, 请尝试更新.");
      isUpdate = true;
      break;

    default:
      return;
  } // cc.eventManager.removeListener(this._checkListener);


  this._am.setEventCallback(null);

  this._checkListener = null;
  this._updating = false;
  if (isUpdate) this.hotUpdate();
};
/**
 * 热更新事件回掉
 */


assetsManager.updateCb = function (event) {
  // let needRestart = false;
  var failed = false;

  switch (event.getEventCode()) {
    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
      console.log("找不到本地清单文件，跳过热更新.");
      failed = true;
      break;

    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
      // this.byteProgress.progress = event.getPercent();
      // this.fileProgress.progress = event.getPercentByFile();
      // this.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
      // this.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
      this.processCB(event.getPercentByFile());
      var msg = event.getMessage();
      if (msg) console.log("更新后的文件", msg);
      break;

    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
      console.log("无法下载清单文件，跳过热更新.");
      failed = true;
      break;

    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
      console.log("已经更新了最新的远程版本.");
      failed = true;
      break;

    case jsb.EventAssetsManager.UPDATE_FINISHED:
      console.log("\u66F4\u65B0\u5B8C\u6210. ".concat(event.getMessage()), this.fileError); // needRestart = true;

      if (this.fileError) {
        this.retry();
      } else {
        //处理热更缓存记录
        this.successCB();
      }

      break;

    case jsb.EventAssetsManager.UPDATE_FAILED:
      this.retry();
      break;

    case jsb.EventAssetsManager.ERROR_UPDATING:
      var errorfile = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + this.gameName + "_temp/" + event.getAssetId() + ".tmp";
      jsb.fileUtils.removeFile(errorfile);
      this.fileError = true;
      break;

    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
      console.log("jsb.EventAssetsManager.ERROR_DECOMPRESS ".concat(event.getMessage()));
      break;

    default:
      break;
  }

  if (failed) {
    this._am.setEventCallback(null);

    this._updating = false;
  }
};

cc._RF.pop();
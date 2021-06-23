
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/assets.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxhc3NldHMuanMiXSwibmFtZXMiOlsiQXNzZXRzTWFuYWdlciIsImdhbWVOYW1lIiwibWFuaWZlc3RVcmwiLCJwcm9jZXNzQ0IiLCJzdWNjZXNzQ0IiLCJmYWlsQ0IiLCJyZXNldERhdGEiLCJpbml0IiwiYXNzZXRzTWFuYWdlciIsInByb3RvdHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJiYXNlX3BhdGgiLCJob3RVcGRhdGVVUkwiLCJnbEdhbWUiLCJzZXJ2ZXJjZmciLCJnZXRIb3R1cGRhdGVWZXJzaW9uVXJsIiwiY3VzdG9tTWFuaWZlc3RTdHIiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlX2Vycm9yIiwiZmlsZUVycm9yIiwidGVtcF9wYXRoIiwianNiIiwiZmlsZVV0aWxzIiwiZ2V0V3JpdGFibGVQYXRoIiwiaXNEaXJlY3RvcnlFeGlzdCIsInJlbW92ZURpcmVjdG9yeSIsIl9zdG9yYWdlUGF0aCIsImNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uQ29tcGFyZUhhbmRsZSIsInZlcnNpb25BIiwidmVyc2lvbkIiLCJfYW0iLCJzZXRWZXJpZnlDYWxsYmFjayIsInBhdGgiLCJhc3NldCIsImNjIiwic3lzIiwib3MiLCJPU19BTkRST0lEIiwic2V0TWF4Q29uY3VycmVudFRhc2siLCJjaGVja1VwZGF0ZSIsImRlc3Ryb3kiLCJzZXRFdmVudENhbGxiYWNrIiwiX3VwZGF0aW5nIiwiZ2V0U3RhdGUiLCJTdGF0ZSIsIlVOSU5JVEVEIiwibG9hZExvY2FsTWFuaWZlc3QiLCJnZXRMb2NhbE1hbmlmZXN0IiwiaXNMb2FkZWQiLCJtYW5pZmVzdCIsIk1hbmlmZXN0IiwiY2hlY2tDYiIsImJpbmQiLCJyZXRyeSIsImRvd25sb2FkRmFpbGVkQXNzZXRzIiwicGFuZWwiLCJzaG93RGlhbG9nIiwiX2NhblJldHJ5IiwiaG90VXBkYXRlIiwidXBkYXRlQ2IiLCJfZmFpbENvdW50IiwidXBkYXRlIiwiZXZlbnQiLCJpc1VwZGF0ZSIsImdldEV2ZW50Q29kZSIsIkV2ZW50QXNzZXRzTWFuYWdlciIsIkVSUk9SX05PX0xPQ0FMX01BTklGRVNUIiwiRVJST1JfRE9XTkxPQURfTUFOSUZFU1QiLCJFUlJPUl9QQVJTRV9NQU5JRkVTVCIsInNjZW5lIiwiZ2V0U2NlbmVOYW1lIiwic2hvd01zZ0JveCIsInRpcHMiLCJVUERBVEUiLCJDSEVDS0ZBSUxFRCIsIkFMUkVBRFlfVVBfVE9fREFURSIsIk5FV19WRVJTSU9OX0ZPVU5EIiwiX2NoZWNrTGlzdGVuZXIiLCJmYWlsZWQiLCJVUERBVEVfUFJPR1JFU1NJT04iLCJnZXRQZXJjZW50QnlGaWxlIiwibXNnIiwiZ2V0TWVzc2FnZSIsIlVQREFURV9GSU5JU0hFRCIsIlVQREFURV9GQUlMRUQiLCJFUlJPUl9VUERBVElORyIsImVycm9yZmlsZSIsImdldEFzc2V0SWQiLCJyZW1vdmVGaWxlIiwiRVJST1JfREVDT01QUkVTUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQVVDLFFBQVYsRUFBb0JDLFdBQXBCLEVBQWlDQyxTQUFqQyxFQUE0Q0MsU0FBNUMsRUFBdURDLE1BQXZELEVBQStEO0FBQy9FLE9BQUtDLFNBQUwsQ0FBZUwsUUFBZixFQUF5QkMsV0FBekIsRUFBc0NDLFNBQXRDLEVBQWlEQyxTQUFqRCxFQUE0REMsTUFBNUQ7QUFDQSxPQUFLRSxJQUFMLENBQVVOLFFBQVY7QUFDSCxDQUhEO0FBQUEsSUFJSU8sYUFBYSxHQUFHUixhQUFhLENBQUNTLFNBSmxDOztBQU1BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLGFBQWpCO0FBQ0EsSUFBSVksU0FBUyxHQUFHLHFCQUFoQixFQUFzQzs7QUFDdEM7Ozs7Ozs7OztBQVFBSixhQUFhLENBQUNGLFNBQWQsR0FBMEIsVUFBVUwsUUFBVixFQUFvQkMsV0FBcEIsRUFBaUNDLFNBQWpDLEVBQTRDQyxTQUE1QyxFQUF1REMsTUFBdkQsRUFBK0Q7QUFDckYsTUFBSVEsWUFB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QU8sQ0FBQ0MsR0FBUixtREFBdURvQyxLQUFLLENBQUNvQixVQUFOLEVBQXZEO0FBQ0E7O0FBQ0o7QUFDSTtBQTdDUjs7QUFnREEsTUFBSUosTUFBSixFQUFZO0FBQ1IsU0FBS2hELEdBQUwsQ0FBU1csZ0JBQVQsQ0FBMEIsSUFBMUI7O0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNIO0FBQ0osQ0F2REQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBBc3NldHNNYW5hZ2VyID0gZnVuY3Rpb24gKGdhbWVOYW1lLCBtYW5pZmVzdFVybCwgcHJvY2Vzc0NCLCBzdWNjZXNzQ0IsIGZhaWxDQikge1xyXG4gICAgdGhpcy5yZXNldERhdGEoZ2FtZU5hbWUsIG1hbmlmZXN0VXJsLCBwcm9jZXNzQ0IsIHN1Y2Nlc3NDQiwgZmFpbENCKTtcclxuICAgIHRoaXMuaW5pdChnYW1lTmFtZSk7XHJcbn0sXHJcbiAgICBhc3NldHNNYW5hZ2VyID0gQXNzZXRzTWFuYWdlci5wcm90b3R5cGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0c01hbmFnZXI7XHJcbmxldCBiYXNlX3BhdGggPSBcIm1hc3Rlci9zdWJwYWNrYWdlcy9cIjsvL1wibWFzdGVyL3Jlcy9yYXctYXNzZXRzL21vZHVsZXMvZ2FtZXMvXCI7XHJcbi8qKlxyXG4gKiDlj4LmlbDliJ3lp4vljJZcclxuICogQHBhcmFtIGdhbWVOYW1lICAgICAg5ri45oiPY29kZVxyXG4gKiBAcGFyYW0gbWFuaWZlc3RVcmwgICDmnKzlnLDmuIXljZXlnLDlnYBcclxuICogQHBhcmFtIHByb2Nlc3NDQiAgICAg6L+H56iL5Zue6LCDXHJcbiAqIEBwYXJhbSBzdWNjZXNzQ0IgICAgIOaIkOWKn+Wbnuiwg1xyXG4gKiBAcGFyYW0gZmFpbENCICAgICAgICDlpLHotKXlm57osINcclxuICovXHJcbmFzc2V0c01hbmFnZXIucmVzZXREYXRhID0gZnVuY3Rpb24gKGdhbWVOYW1lLCBtYW5pZmVzdFVybCwgcHJvY2Vzc0NCLCBzdWNjZXNzQ0IsIGZhaWxDQikge1xyXG4gICAgbGV0IGhvdFVwZGF0ZVVSTCA9IGdsR2FtZS5zZXJ2ZXJjZmcuZ2V0SG90dXBkYXRlVmVyc2lvblVybCgpO1xyXG4gICAgdGhpcy5jdXN0b21NYW5pZmVzdFN0ciA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBcInBhY2thZ2VVcmxcIjogYCR7aG90VXBkYXRlVVJMfSR7Z2FtZU5hbWV9L2AsXHJcbiAgICAgICAgXCJyZW1vdGVNYW5pZmVzdFVybFwiOiBgJHtob3RVcGRhdGVVUkx9JHtnYW1lTmFtZX0vJHtnYW1lTmFtZX1wcm9qZWN0Lm1hbmlmZXN0YCxcclxuICAgICAgICBcInJlbW90ZVZlcnNpb25VcmxcIjogYCR7aG90VXBkYXRlVVJMfSR7Z2FtZU5hbWV9LyR7Z2FtZU5hbWV9dmVyc2lvbi5tYW5pZmVzdGAsXHJcbiAgICAgICAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjBcIixcclxuICAgICAgICBcImFzc2V0c1wiOiB7fSxcclxuICAgICAgICBcInNlYXJjaFBhdGhzXCI6IFtdXHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFuaWZlc3RVcmwgPSBtYW5pZmVzdFVybDtcclxuICAgIHRoaXMucHJvY2Vzc0NCID0gcHJvY2Vzc0NCO1xyXG4gICAgdGhpcy5zdWNjZXNzQ0IgPSBzdWNjZXNzQ0I7XHJcbiAgICB0aGlzLmZhaWxDQiA9IGZhaWxDQjtcclxuICAgIHRoaXMudXBkYXRlX2Vycm9yID0gMDtcclxuICAgIHRoaXMuZmlsZUVycm9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmdhbWVOYW1lID0gZ2FtZU5hbWU7XHJcbn07XHJcbi8qKlxyXG4gKiDng63mm7TkuIvovb3nrqHnkIblmajliJ3lp4vljJZcclxuICogQHBhcmFtIGdhbWVOYW1lXHJcbiAqL1xyXG5hc3NldHNNYW5hZ2VyLmluaXQgPSBmdW5jdGlvbiAoZ2FtZU5hbWUpIHtcclxuICAgIGxldCB0ZW1wX3BhdGggPSAoKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogJy8nKSArIGAke2Jhc2VfcGF0aCArIGdhbWVOYW1lfV90ZW1wYCk7XHJcbiAgICBpZiAoanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KHRlbXBfcGF0aCkpIHtcclxuICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZURpcmVjdG9yeSh0ZW1wX3BhdGgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3RvcmFnZVBhdGggPSAoKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogJy8nKSArIGAke2Jhc2VfcGF0aCArIGdhbWVOYW1lfWApO1xyXG4gICAgY29uc29sZS5sb2coJ+acrOWcsOi3r+W+hCA6ICcgKyB0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICB0aGlzLnZlcnNpb25Db21wYXJlSGFuZGxlID0gZnVuY3Rpb24gKHZlcnNpb25BLCB2ZXJzaW9uQikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSlMg6Ieq5a6a5LmJ54mI5pys5q+U6L6DOiB2ZXJzaW9uIEEgOiBcIiArIHZlcnNpb25BICsgJywgdmVyc2lvbiBCIDogJyArIHZlcnNpb25CKTtcclxuICAgICAgICByZXR1cm4gdmVyc2lvbkEgPT09IHZlcnNpb25CID8gMCA6IC0xO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX2FtID0gbmV3IGpzYi5Bc3NldHNNYW5hZ2VyKCcnLCB0aGlzLl9zdG9yYWdlUGF0aCwgdGhpcy52ZXJzaW9uQ29tcGFyZUhhbmRsZSk7XHJcblxyXG4gICAgdGhpcy5fYW0uc2V0VmVyaWZ5Q2FsbGJhY2soZnVuY3Rpb24gKHBhdGgsIGFzc2V0KSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgIHRoaXMuX2FtLnNldE1heENvbmN1cnJlbnRUYXNrKDEwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFuZHJvaWTlubPlj7DmnIDlpKflubblj5Hku7vliqHorqHmlbDpmZDliLbkuo4yXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9jZXNzQ0IoMCk7XHJcbiAgICAvLyDmo4DmtYvmm7TmlrBcclxuICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcclxufTtcclxuLyoqXHJcbiAqIOmUgOavgeeDreabtOS4i+i9veeuoeeQhuWZqFxyXG4gKi9cclxuYXNzZXRzTWFuYWdlci5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fYW0uc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcclxuICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICog5qOA5rWL5pu05pawXHJcbiAqL1xyXG5hc3NldHNNYW5hZ2VyLmNoZWNrVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwi5q2j5Zyo5qOA5p+l5oiW5pu05pawLCDor7fnqI3nrYkgLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2FtLmdldFN0YXRlKCkgPT09IGpzYi5Bc3NldHNNYW5hZ2VyLlN0YXRlLlVOSU5JVEVEKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmraPlnKjmo4Dmn6XmmK/lkKbpnIDopoHmm7TmlrDkuK0sIOivt+eojeetiSAuLi5cIik7XHJcbiAgICAgICAgdGhpcy5fYW0ubG9hZExvY2FsTWFuaWZlc3QodGhpcy5tYW5pZmVzdFVybCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2FtLmdldExvY2FsTWFuaWZlc3QoKSB8fCAhdGhpcy5fYW0uZ2V0TG9jYWxNYW5pZmVzdCgpLmlzTG9hZGVkKCkpIHtcclxuICAgICAgICBpZiAodGhpcy5fYW0uZ2V0U3RhdGUoKSAhPT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHJldHVybjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaXoOazleWKoOi9veacrOWcsOa4heWNlSwg5L2/55So6buY6K6k5pu05paw5riF5Y2VIC4uLlwiKTtcclxuICAgICAgICBsZXQgbWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KHRoaXMuY3VzdG9tTWFuaWZlc3RTdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdChtYW5pZmVzdCwgdGhpcy5fc3RvcmFnZVBhdGgpO1xyXG4gICAgfVxyXG4gICAgLy8gdGhpcy5fY2hlY2tMaXN0ZW5lciA9IG5ldyBqc2IuRXZlbnRMaXN0ZW5lckFzc2V0c01hbmFnZXIodGhpcy5fYW0sIHRoaXMuY2hlY2tDYi5iaW5kKHRoaXMpKTtcclxuICAgIC8vIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih0aGlzLl9jaGVja0xpc3RlbmVyLCAxKTtcclxuICAgIHRoaXMuX2FtLnNldEV2ZW50Q2FsbGJhY2sodGhpcy5jaGVja0NiLmJpbmQodGhpcykpXHJcbiAgICB0aGlzLl9hbS5jaGVja1VwZGF0ZSgpO1xyXG4gICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG59O1xyXG4vKipcclxuICog6YeN6K+V5pu05pawXHJcbiAqL1xyXG5hc3NldHNNYW5hZ2VyLnJldHJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMudXBkYXRlX2Vycm9yIDw9IDIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9lcnJvcisrO1xyXG4gICAgICAgIHRoaXMuX2FtLmRvd25sb2FkRmFpbGVkQXNzZXRzKCk7XHJcbiAgICAgICAgdGhpcy5maWxlRXJyb3IgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCLmj5DnpLpcIiwgXCLmuLjmiI/mm7TmlrDlh7rnjrDlsI/mhI/lpJbvvIzor7fph43mlrDkuIvovb1cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3VwZGF0aW5nICYmIHRoaXMuX2NhblJldHJ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbS5kb3dubG9hZEZhaWxlZEFzc2V0cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuUmV0cnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbENCKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NhblJldHJ5ID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOW8gOWni+abtOaWsFxyXG4gKi9cclxuYXNzZXRzTWFuYWdlci5ob3RVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5fYW0gJiYgIXRoaXMuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYW0uc2V0RXZlbnRDYWxsYmFjayh0aGlzLnVwZGF0ZUNiLmJpbmQodGhpcykpXHJcbiAgICAgICAgaWYgKHRoaXMuX2FtLmdldFN0YXRlKCkgPT09IGpzYi5Bc3NldHNNYW5hZ2VyLlN0YXRlLlVOSU5JVEVEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FtLmxvYWRMb2NhbE1hbmlmZXN0KHRoaXMubWFuaWZlc3RVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mYWlsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2FtLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIOajgOa1i+abtOaWsOS6i+S7tuWbnuaOiVxyXG4gKi9cclxuYXNzZXRzTWFuYWdlci5jaGVja0NiID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBsZXQgaXNVcGRhdGUgPSBmYWxzZTtcclxuICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcclxuICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RPV05MT0FEX01BTklGRVNUOlxyXG4gICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9QQVJTRV9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmib7kuI3liLDmnKzlnLDmuIXljZXmlofku7bmiJbliJnml6Dms5XkuIvovb3muIXljZXmlofku7YsIOi3s+i/h+eDreabtOaWsC5cIik7XHJcbiAgICAgICAgICAgIGlmIChnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lKCkgIT0gXCJwbGF6YVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxDQigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCLmj5DnpLpcIiwgZ2xHYW1lLnRpcHMuVVBEQVRFLkNIRUNLRkFJTEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyDov5nph4zlj6/og73opoHnm7TmjqXpgIDlh7rmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW0uZ2V0U3RhdGUoKSAhPT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsQ0IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KHRoaXMuY3VzdG9tTWFuaWZlc3RTdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdChtYW5pZmVzdCwgdGhpcy5fc3RvcmFnZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bey57uP5pu05paw5LqG5pyA5paw55qE6L+c56iL54mI5pysLlwiKTtcclxuICAgICAgICAgICAgaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NDQigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuTkVXX1ZFUlNJT05fRk9VTkQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJ+aJvuWIsOaWsOeJiOacrCwg6K+35bCd6K+V5pu05pawLlwiKTtcclxuICAgICAgICAgICAgaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lcik7XHJcbiAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgdGhpcy5fY2hlY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKGlzVXBkYXRlKSB0aGlzLmhvdFVwZGF0ZSgpO1xyXG59O1xyXG4vKipcclxuICog54Ot5pu05paw5LqL5Lu25Zue5o6JXHJcbiAqL1xyXG5hc3NldHNNYW5hZ2VyLnVwZGF0ZUNiID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAvLyBsZXQgbmVlZFJlc3RhcnQgPSBmYWxzZTtcclxuICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcclxuICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcclxuICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5om+5LiN5Yiw5pys5Zyw5riF5Y2V5paH5Lu277yM6Lez6L+H54Ot5pu05pawLlwiKTtcclxuICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9QUk9HUkVTU0lPTjpcclxuICAgICAgICAgICAgLy8gdGhpcy5ieXRlUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBldmVudC5nZXRQZXJjZW50KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsZVByb2dyZXNzLnByb2dyZXNzID0gZXZlbnQuZ2V0UGVyY2VudEJ5RmlsZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmZpbGVMYWJlbC5zdHJpbmcgPSBldmVudC5nZXREb3dubG9hZGVkRmlsZXMoKSArICcgLyAnICsgZXZlbnQuZ2V0VG90YWxGaWxlcygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJ5dGVMYWJlbC5zdHJpbmcgPSBldmVudC5nZXREb3dubG9hZGVkQnl0ZXMoKSArICcgLyAnICsgZXZlbnQuZ2V0VG90YWxCeXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NDQihldmVudC5nZXRQZXJjZW50QnlGaWxlKCkpO1xyXG4gICAgICAgICAgICBsZXQgbXNnID0gZXZlbnQuZ2V0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICBpZiAobXNnKSBjb25zb2xlLmxvZyhcIuabtOaWsOWQjueahOaWh+S7tlwiLCBtc2cpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfRE9XTkxPQURfTUFOSUZFU1Q6XHJcbiAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaXoOazleS4i+i9vea4heWNleaWh+S7tu+8jOi3s+i/h+eDreabtOaWsC5cIik7XHJcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bey57uP5pu05paw5LqG5pyA5paw55qE6L+c56iL54mI5pysLlwiKTtcclxuICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GSU5JU0hFRDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYOabtOaWsOWujOaIkC4gJHtldmVudC5nZXRNZXNzYWdlKCl9YCwgdGhpcy5maWxlRXJyb3IpO1xyXG4gICAgICAgICAgICAvLyBuZWVkUmVzdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXRyeSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+WkhOeQhueDreabtOe8k+WtmOiusOW9lVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzQ0IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZBSUxFRDpcclxuICAgICAgICAgICAgdGhpcy5yZXRyeSgpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9VUERBVElORzpcclxuICAgICAgICAgICAgbGV0IGVycm9yZmlsZSA9IChqc2IuZmlsZVV0aWxzID8ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSA6IFwiL1wiKSArIHRoaXMuZ2FtZU5hbWUgKyBcIl90ZW1wL1wiICsgZXZlbnQuZ2V0QXNzZXRJZCgpICsgXCIudG1wXCI7XHJcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRmlsZShlcnJvcmZpbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ERUNPTVBSRVNTOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ERUNPTVBSRVNTICR7ZXZlbnQuZ2V0TWVzc2FnZSgpfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgdGhpcy5fYW0uc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuIl19
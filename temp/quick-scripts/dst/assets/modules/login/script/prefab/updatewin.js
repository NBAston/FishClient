
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/login/script/prefab/updatewin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd32a6+CPuZC4KNq3n1EYPsf', 'updatewin');
// modules/login/script/prefab/updatewin.js

"use strict";

glGame.baseclass.extend({
  properties: {
    fileProgress: cc.ProgressBar,
    fileLabel: cc.Label,
    lab_percent: cc.Label,
    lab_tipcenter: cc.Label,
    lab_center: cc.Label,
    lab_po: cc.Node // byteProgress: cc.ProgressBar,
    // byteLabel: cc.Label,

  },
  onLoad: function onLoad() {
    var _this = this;

    this._updating = false;
    this._canRetry = false;
    this._storagePath = '';
    this.start_update = 0;
    this.start_flow = 2; //目前倆個流程 1 预加载提示框  2 获取热更数据

    this.tipdelay = 3;
    this.update_error = 0;
    this.fileProgress.node.active = false;
    glGame.panel.preloadLoinMode().then(function () {
      _this.updateServerCfg();
    });
    this.registerEvent();
    glGame.servercfg.loadSetting();
    this.fileLabel.node.active = true;
    this.fileLabel.string = '';
    this.lab_tip = "正在连接服务器";
    this.actState();
    this.setState("正在连接服务器", true);
    this.lab_percent.node.active = false;
    this.version = "";
    this.fetchJSON();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UPDATE_SERVER_CFG, this.updateServerCfg, this);
    glGame.emitter.on(MESSAGE.DOWNLOAD.OPEN_PATH, this.downLoadGame, this);
    glGame.emitter.on(MESSAGE.DOWNLOAD.STOP, this.updateStop, this);
    glGame.emitter.on(MESSAGE.NETWORK.PODOT_ON, this.pomelo_dot_on, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UPDATE_SERVER_CFG, this);
    glGame.emitter.off(MESSAGE.DOWNLOAD.OPEN_PATH, this);
    glGame.emitter.off(MESSAGE.DOWNLOAD.STOP, this);
    glGame.emitter.off(MESSAGE.NETWORK.PODOT_ON, this);
  },
  pomelo_dot_on: function pomelo_dot_on(onoff) {
    this.lab_po.active = onoff;
  },
  updateStop: function updateStop() {
    if (this._am) {
      this._am.setEventCallback(null);

      this._am.clear();
    }
  },

  /**
  * 热更前的准备
  */
  updateServerCfg: function updateServerCfg() {
    this.start_update++;
    this.stateUpdate();
  },

  /**
   * 开始热更游戏
   */
  stateUpdate: function stateUpdate() {
    if (this.start_update >= this.start_flow) {
      if (glGame.servercfg.getBolMaintaining() == 1) {
        glGame.panel.showMaintainNotice(glGame.servercfg.getMaintainingContent());
      } else if (!isEnableHotUpdate) {
        this.enterLoginScene();
      } else {
        if (glGame.systemclass.comparisonVersion(glGame.servercfg.getHotDownVersion())) {
          this.initProject();
        } else {
          glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", function () {
            // glGame.servercfg.openDownLoad();
            glGame.user.reqDownLoadJump();
          }, function () {
            cc.game.end();
          });
        }
      }
    }
  },
  downLoadGame: function downLoadGame() {
    if (!isEnableHotUpdate) return;

    if (isAndroid) {
      var strUrl = glGame.user.get("url").downloadAndroidUrl;

      if (typeof strUrl === "string" && strUrl.substr(-4) === ".apk") {
        glGame.platform.DownloadApk(strUrl);
        glGame.emitter.emit(MESSAGE.DOWNLOAD.BAG);
      } else {
        //glGame.panel.showTip("热更地址有误，请联系客服人员。");
        cc.sys.openURL(glGame.user.get("url").download_jump);
        glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", function () {
          // glGame.servercfg.openDownLoad();
          glGame.user.reqDownLoadJump();
        }, function () {
          cc.game.end();
        });
      }
    } else {
      cc.sys.openURL(glGame.user.get("url").download_jump);
      glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", function () {
        // glGame.servercfg.openDownLoad();
        glGame.user.reqDownLoadJump();
      }, function () {
        cc.game.end();
      });
    }
  },
  //根据缓存的热更ver 进行对比，减少不必要的热更加载，并对版本进行一定的热更维护
  checkVersion: function checkVersion() {
    var _this2 = this;

    var gameName = "master";
    var update_data = glGame.storage.getItem('update_data');
    var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
    var url = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest");
    glGame.gamelistcfg.getGameVersion(url).then(function (data) {
      _this2.version = data.version;

      if (update_data && update_data[gameName]) {
        if (data.version === update_data[gameName]) {
          console.log("跳过热更，目前版本是最新的！");

          _this2.enterLoginScene();
        } else _this2.createUpdate();
      } else _this2.createUpdate();
    }, function () {
      _this2.createUpdate();
    });
  },
  //检验本地文件
  initProject: function initProject() {
    var _this3 = this;

    var gameName = "master";
    this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameName + "/";
    this.ver_txt = jsb.fileUtils.isFileExist("".concat(this._storagePath, "project.manifest"));
    this.manifestUrl = "project.manifest";
    console.log('本地路径 : ' + this._storagePath, this.manifestUrl);
    var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl(); //是否获取本地的热更地址

    glGame.fileutil.readManifest("config/masterproject").then(function (data) {
      //本地校验文件
      var manifestjson = JSON.parse(data);
      manifestjson.packageUrl = "".concat(hotUpdateURL).concat(gameName, "/");
      manifestjson.remoteManifestUrl = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "project.manifest");
      manifestjson.remoteVersionUrl = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest");
      _this3.customManifestStr = JSON.stringify(manifestjson);
      if (_this3.ver_txt) _this3.checkUpProject("".concat(_this3._storagePath, "project.manifest"));

      _this3.checkVersion();
    })["catch"](function () {
      //未找到本地校验文件
      _this3.customManifestStr = JSON.stringify({
        "packageUrl": "".concat(hotUpdateURL).concat(gameName, "/"),
        "remoteManifestUrl": "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "project.manifest"),
        "remoteVersionUrl": "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest"),
        "version": "0.0.0",
        "assets": {},
        "searchPaths": []
      });
      if (_this3.ver_txt) _this3.checkUpProject("".concat(_this3._storagePath, "project.manifest"));

      _this3.checkVersion();
    });
  },

  /**
   * 检查热更文件并替换其热更地址
   * @param {string} path
   */
  checkUpProject: function checkUpProject(path) {
    var data = jsb.fileUtils.getStringFromFile(path);
    var ProjectData = JSON.parse(data),
        customManifest = JSON.parse(this.customManifestStr);

    if (customManifest.packageUrl != ProjectData.packageUrl || customManifest.remoteManifestUrl != ProjectData.remoteManifestUrl || customManifest.remoteVersionUrl != ProjectData.remoteVersionUrl) {
      ProjectData.packageUrl = customManifest.packageUrl;
      ProjectData.remoteManifestUrl = customManifest.remoteManifestUrl;
      ProjectData.remoteVersionUrl = customManifest.remoteVersionUrl;
      jsb.fileUtils.writeStringToFile(JSON.stringify(ProjectData), path);
    }
  },
  createUpdate: function createUpdate() {
    // Setup your own version compare handler, versionA and B is versions in string
    // if the return value greater than 0, versionA is greater than B,
    // if the return value equals 0, versionA equals to B,
    // if the return value smaller than 0, versionA is smaller than B.
    this.versionCompareHandle = function (versionA, versionB) {
      console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
      return versionA === versionB ? 0 : -1;
    }; // Init with empty manifest url for testing custom manifest


    this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle); // if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
    //     this._am.retain();
    // }
    // Setup the verification callback, but we don't have md5 check function yet, so only print some message
    // Return true if the verification passed, otherwise return false

    this._am.setVerifyCallback(function (path, asset) {
      // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
      var compressed = asset.compressed; // Retrieve the correct md5 value.

      var expectedMD5 = asset.md5; // asset.path is relative path and path is absolute.

      var relativePath = asset.path; //console.log("验证通过 : " + relativePath + ' (' + expectedMD5 + ')');
      // The size of asset file, but this value could be absent.

      var size = asset.size;

      if (compressed) {
        // info.string = "验证通过 : " + relativePath;
        return true;
      } else {
        // info.string = "验证通过 : " + relativePath + ' (' + expectedMD5 + ')';
        return true;
      }
    });

    console.log('热更新已就绪,请检查或直接更新.');

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      // Some Android device may slow down the download process when concurrent tasks is too much.
      // The value may not be accurate, please do more test and find what's most suitable for your game.
      this._am.setMaxConcurrentTask(10);
    } // 检测更新


    this.checkUpdate();
  },
  //预加载通用模块
  preloadedPrefab: function preloadedPrefab() {
    this.setState("正在加载游戏配置", true);
    this.lab_percent.node.active = false;
    return glGame.panel.preloadPublicMode();
  },
  enterLoginScene: function enterLoginScene() {
    //this.preloadedPrefab().then(() => {
    glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
    this.setState("正在进入游戏", true); //判定是否属于自动登入

    var blAuto = glGame.logon.autoLogin();

    if (blAuto) {
      return;
    }

    glGame.logon.reqTouLogin(); //glGame.emitter.emit(MESSAGE.DOWNLOAD.END);

    this.remove(); //})
  },
  checkUpdate: function checkUpdate() {
    if (this._updating) {
      console.log('正在检查或更新, 请稍等 ...');
      return;
    }

    if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
      console.log('正在检查是否需要更新中, 请稍等 ...', this.manifestUrl);

      this._am.loadLocalManifest(this.manifestUrl);
    }

    if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
      if (this._am.getState() !== jsb.AssetsManager.State.UNINITED) return;
      console.log("无法加载本地清单, 使用默认更新清单 ...", this.customManifestStr, this._storagePath);
      var manifest = new jsb.Manifest(this.customManifestStr, this._storagePath);

      this._am.loadLocalManifest(manifest, this._storagePath);
    }

    this._am.setEventCallback(this.checkCb.bind(this));

    this._am.checkUpdate();

    this._updating = true;
  },
  hotUpdate: function hotUpdate() {
    if (this._am && !this._updating) {
      this._am.setEventCallback(this.updateCb.bind(this));

      if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
        this._am.loadLocalManifest(this.manifestUrl);
      }

      this._failCount = 0;

      this._am.update();

      this._updating = true;
    }
  },
  // ----------------> 检测事件回掉函数
  checkCb: function checkCb(event) {
    var _this4 = this;

    var needUpdate = false;
    var reCheckState = false;

    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        var isRemove = null;

        if (this._am.getState() !== jsb.AssetsManager.State.UNINITED) {
          glGame.panel.showDialog("错误", "游戏更新失败, 点击确定重启...", function () {
            isRemove = jsb.fileUtils.removeDirectory(_this4._storagePath);
            reStartGame();
          }, function () {
            isRemove = jsb.fileUtils.removeDirectory(_this4._storagePath);
            cc.game.end();
          });
          return;
        }

        var manifest = new jsb.Manifest(this.customManifestStr, this._storagePath);

        this._am.loadLocalManifest(manifest, this._storagePath);

        reCheckState = true;
        break;

      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        console.log("已经更新了最新的远程版本.");
        this.enterLoginScene();
        break;

      case jsb.EventAssetsManager.NEW_VERSION_FOUND:
        console.log('找到新版本, 请尝试更新.');
        needUpdate = true;
        this.fileProgress.progress = 0;
        this.lab_percent.node.active = true;
        this.lab_percent.string = '0%';
        this.setState("", false);
        this.fileLabel.string = "\u6B63\u5728\u66F4\u65B0\u4E2D......."; // this.byteProgress.progress = 0;

        this.fileProgress.node.active = true;
        break;

      default:
        return;
    } // cc.eventManager.removeListener(this._checkListener);


    this._am.setEventCallback(null);

    this._checkListener = null;
    this._updating = false;
    if (reCheckState) this.checkUpdate();else if (needUpdate) this.hotUpdate();
  },
  //浮点型运算取俩位
  getFloat: function getFloat(value) {
    value = Math.ceil(value / 10 / 1024);
    return Number(value).div(100).toString();
  },
  // ----------------> 热更新事件回掉函数
  updateCb: function updateCb(event) {
    var _this5 = this;

    var needRestart = false;
    var failed = false;

    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        console.log('找不到本地清单文件，跳过热更新.');
        failed = true;
        break;

      case jsb.EventAssetsManager.UPDATE_PROGRESSION:
        // this.byteProgress.progress = event.getPercent();
        // this.fileProgress.progress = event.getPercentByFile();
        // this.byteProgress.progress = event.getDownloadedBytes()/event.getTotalBytes();
        // this.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
        if (this.lab_percent.string >= "100%" && event.getPercent() >= 1) {
          this.fileLabel.node.active = false;
          this.fileLabel.string = "";
          this.setState("正在为您校验热更文件", true); //this.fileLabel.node.x = -this.fileLabel.node.width / 2;
          // console.log('打出来提示字的位置',this.fileLabel.node.x)

          this.lab_percent.node.active = false;
          return;
        }

        this.setState("", false);
        var progress = event.getDownloadedBytes() >= event.getTotalBytes() ? event.getTotalBytes() : event.getDownloadedBytes();
        var upsize = event.getDownloadedBytes() ? "".concat(this.getFloat(progress), "Mb/").concat(this.getFloat(event.getTotalBytes()), "Mb") : "";
        this.fileLabel.string = "\u6B63\u5728\u66F4\u65B0\u4E2D......".concat(upsize);
        this.fileProgress.node.active = true;
        this.fileProgress.progress = Math.max(this.fileProgress.progress, event.getPercent() || 0);
        this.lab_percent.node.active = true;
        this.lab_percent.string = "".concat(parseInt(event.getPercent() * 100) || 0, "%"); // var msg = event.getMessage();
        // if (msg) {
        //     console.log('更新后的文件: ' + msg);
        //     // console.log(event.getPercent()/100 + '% : ' + msg);
        // }

        break;

      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        console.log('无法下载清单文件，跳过热更新.');
        failed = true;
        break;

      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        console.log('已经更新了最新的远程版本.');
        failed = true;
        break;

      case jsb.EventAssetsManager.UPDATE_FINISHED:
        if (this.fileError) {
          this._am.downloadFailedAssets();

          this.fileError = false;
        } else {
          console.log('更新完成. ' + event.getMessage());
          needRestart = true;
        }

        break;

      case jsb.EventAssetsManager.UPDATE_FAILED:
        console.log('更新失败. ' + event.getMessage());

        if (this.update_error <= 2) {
          this.update_error++;

          this._am.downloadFailedAssets();

          this.fileError = false;
        } else {
          glGame.panel.showDialog("错误", "游戏更新失败, 点击确定重试...", function () {
            if (!_this5._updating && _this5._canRetry) {
              _this5._canRetry = false;

              _this5._am.downloadFailedAssets();
            }
          }, function () {
            cc.game.end();
          });
          this._updating = false;
          this._canRetry = true;
        }

        break;

      case jsb.EventAssetsManager.ERROR_UPDATING:
        var errorfile = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "master_temp/" + event.getAssetId() + ".tmp";
        console.log("删除无法转换文件：", errorfile);
        jsb.fileUtils.removeFile(errorfile);
        console.log('资源更新错误: ' + event.getAssetId() + ', ' + event.getMessage());
        this.fileError = true;
        break;

      case jsb.EventAssetsManager.ERROR_DECOMPRESS:
        console.log(event.getMessage());
        break;

      default:
        break;
    }

    if (failed) {
      // cc.eventManager.removeListener(this._updateListener);
      this._am.setEventCallback(null);

      this._updateListener = null;
      this._updating = false;
    }

    if (needRestart) {
      // cc.eventManager.removeListener(this._updateListener);
      this._am.setEventCallback(null);

      this._updateListener = null; // 本次设计搜索路径为单一的不并存
      //处理热更缓存记录

      if (this.version) {
        var data = glGame.storage.getItem('update_data');

        if (data) {
          data["master"] = this.version;
        } else {
          data = {};
          data["master"] = this.version;
        }

        glGame.storage.setItem('update_data', data);
      }

      var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');

      if (hotUpdateSearchPaths) {
        jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        console.log("\u627E\u5230\u70ED\u66F4\u65B0\u8DEF\u5F84: ".concat(hotUpdateSearchPaths));
      } else {
        var searchPaths = jsb.fileUtils.getSearchPaths();
        searchPaths.unshift(jsb.fileUtils.getWritablePath() + 'master/');
        jsb.fileUtils.setSearchPaths(searchPaths);
        localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
      }

      reStartGame();
    }
  },

  /**
   * 文字波动
   */
  actState: function actState() {
    var _this6 = this;

    var dot = 0;
    var dot_max = 5;
    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
      if (!_this6.lab_center.node.active) return;
      dot >= dot_max ? dot = 0 : dot++;
      var str_dot = "";

      for (var i = 0; i < dot; i++) {
        str_dot = str_dot + ".";
      }

      _this6.lab_center.string = _this6.lab_tip + str_dot;
    }))));
  },

  /**
   * 设置当前流程状态
   * @param {*} string 
   * @param {*} bol 
   */
  setState: function setState(string, bol) {
    this.lab_center.node.active = bol;
    this.lab_center.string = string;
    this.lab_tip = string;
  },
  fetchJSON: function fetchJSON() {
    var _this7 = this;

    glGame.fileutil.fetchJSON("TipsList").then(function (data) {
      _this7.TipsList = data.json;

      _this7.playTips();
    });
  },
  playTips: function playTips() {
    var _this8 = this;

    this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
      var index = Math.floor(Math.random() * 100) % _this8.TipsList.length;

      _this8.lab_tipcenter.string = _this8.TipsList[index];
    }), cc.delayTime(this.tipdelay))));
  },
  onDestroy: function onDestroy() {
    this.unRegisterEvent();

    if (this._updateListener) {
      this._am.setEventCallback(null);

      this._updateListener = null;
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcbG9naW5cXHNjcmlwdFxccHJlZmFiXFx1cGRhdGV3aW4uanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImZpbGVQcm9ncmVzcyIsImNjIiwiUHJvZ3Jlc3NCYXIiLCJmaWxlTGFiZWwiLCJMYWJlbCIsImxhYl9wZXJjZW50IiwibGFiX3RpcGNlbnRlciIsImxhYl9jZW50ZXIiLCJsYWJfcG8iLCJOb2RlIiwib25Mb2FkIiwiX3VwZGF0aW5nIiwiX2NhblJldHJ5IiwiX3N0b3JhZ2VQYXRoIiwic3RhcnRfdXBkYXRlIiwic3RhcnRfZmxvdyIsInRpcGRlbGF5IiwidXBkYXRlX2Vycm9yIiwibm9kZSIsImFjdGl2ZSIsInBhbmVsIiwicHJlbG9hZExvaW5Nb2RlIiwidGhlbiIsInVwZGF0ZVNlcnZlckNmZyIsInJlZ2lzdGVyRXZlbnQiLCJzZXJ2ZXJjZmciLCJsb2FkU2V0dGluZyIsInN0cmluZyIsImxhYl90aXAiLCJhY3RTdGF0ZSIsInNldFN0YXRlIiwidmVyc2lvbiIsImZldGNoSlNPTiIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVUERBVEVfU0VSVkVSX0NGRyIsIkRPV05MT0FEIiwiT1BFTl9QQVRIIiwiZG93bkxvYWRHYW1lIiwiU1RPUCIsInVwZGF0ZVN0b3AiLCJORVRXT1JLIiwiUE9ET1RfT04iLCJwb21lbG9fZG90X29uIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwib25vZmYiLCJfYW0iLCJzZXRFdmVudENhbGxiYWNrIiwiY2xlYXIiLCJzdGF0ZVVwZGF0ZSIsImdldEJvbE1haW50YWluaW5nIiwic2hvd01haW50YWluTm90aWNlIiwiZ2V0TWFpbnRhaW5pbmdDb250ZW50IiwiaXNFbmFibGVIb3RVcGRhdGUiLCJlbnRlckxvZ2luU2NlbmUiLCJzeXN0ZW1jbGFzcyIsImNvbXBhcmlzb25WZXJzaW9uIiwiZ2V0SG90RG93blZlcnNpb24iLCJpbml0UHJvamVjdCIsInNob3dEaWFsb2ciLCJ1c2VyIiwicmVxRG93bkxvYWRKdW1wIiwiZ2FtZSIsImVuZCIsImlzQW5kcm9pZCIsInN0clVybCIsImdldCIsImRvd25sb2FkQW5kcm9pZFVybCIsInN1YnN0ciIsInBsYXRmb3JtIiwiRG93bmxvYWRBcGsiLCJlbWl0IiwiQkFHIiwic3lzIiwib3BlblVSTCIsImRvd25sb2FkX2p1bXAiLCJjaGVja1ZlcnNpb24iLCJnYW1lTmFtZSIsInVwZGF0ZV9kYXRhIiwic3RvcmFnZSIsImdldEl0ZW0iLCJob3RVcGRhdGVVUkwiLCJnZXRIb3R1cGRhdGVWZXJzaW9uVXJsIiwidXJsIiwiZ2FtZWxpc3RjZmciLCJnZXRHYW1lVmVyc2lvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlVXBkYXRlIiwianNiIiwiZmlsZVV0aWxzIiwiZ2V0V3JpdGFibGVQYXRoIiwidmVyX3R4dCIsImlzRmlsZUV4aXN0IiwibWFuaWZlc3RVcmwiLCJmaWxldXRpbCIsInJlYWRNYW5pZmVzdCIsIm1hbmlmZXN0anNvbiIsIkpTT04iLCJwYXJzZSIsInBhY2thZ2VVcmwiLCJyZW1vdGVNYW5pZmVzdFVybCIsInJlbW90ZVZlcnNpb25VcmwiLCJjdXN0b21NYW5pZmVzdFN0ciIsInN0cmluZ2lmeSIsImNoZWNrVXBQcm9qZWN0IiwicGF0aCIsImdldFN0cmluZ0Zyb21GaWxlIiwiUHJvamVjdERhdGEiLCJjdXN0b21NYW5pZmVzdCIsIndyaXRlU3RyaW5nVG9GaWxlIiwidmVyc2lvbkNvbXBhcmVIYW5kbGUiLCJ2ZXJzaW9uQSIsInZlcnNpb25CIiwiQXNzZXRzTWFuYWdlciIsInNldFZlcmlmeUNhbGxiYWNrIiwiYXNzZXQiLCJjb21wcmVzc2VkIiwiZXhwZWN0ZWRNRDUiLCJtZDUiLCJyZWxhdGl2ZVBhdGgiLCJzaXplIiwib3MiLCJPU19BTkRST0lEIiwic2V0TWF4Q29uY3VycmVudFRhc2siLCJjaGVja1VwZGF0ZSIsInByZWxvYWRlZFByZWZhYiIsInByZWxvYWRQdWJsaWNNb2RlIiwic2NlbmUiLCJzZXROZXh0U2NlbmVUYWciLCJzY2VuZXRhZyIsIlBMQVpBIiwiYmxBdXRvIiwibG9nb24iLCJhdXRvTG9naW4iLCJyZXFUb3VMb2dpbiIsInJlbW92ZSIsImdldFN0YXRlIiwiU3RhdGUiLCJVTklOSVRFRCIsImxvYWRMb2NhbE1hbmlmZXN0IiwiZ2V0TG9jYWxNYW5pZmVzdCIsImlzTG9hZGVkIiwibWFuaWZlc3QiLCJNYW5pZmVzdCIsImNoZWNrQ2IiLCJiaW5kIiwiaG90VXBkYXRlIiwidXBkYXRlQ2IiLCJfZmFpbENvdW50IiwidXBkYXRlIiwiZXZlbnQiLCJuZWVkVXBkYXRlIiwicmVDaGVja1N0YXRlIiwiZ2V0RXZlbnRDb2RlIiwiRXZlbnRBc3NldHNNYW5hZ2VyIiwiRVJST1JfTk9fTE9DQUxfTUFOSUZFU1QiLCJFUlJPUl9ET1dOTE9BRF9NQU5JRkVTVCIsIkVSUk9SX1BBUlNFX01BTklGRVNUIiwiaXNSZW1vdmUiLCJyZW1vdmVEaXJlY3RvcnkiLCJyZVN0YXJ0R2FtZSIsIkFMUkVBRFlfVVBfVE9fREFURSIsIk5FV19WRVJTSU9OX0ZPVU5EIiwicHJvZ3Jlc3MiLCJfY2hlY2tMaXN0ZW5lciIsImdldEZsb2F0IiwidmFsdWUiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwibmVlZFJlc3RhcnQiLCJmYWlsZWQiLCJVUERBVEVfUFJPR1JFU1NJT04iLCJnZXRQZXJjZW50IiwiZ2V0RG93bmxvYWRlZEJ5dGVzIiwiZ2V0VG90YWxCeXRlcyIsInVwc2l6ZSIsIm1heCIsInBhcnNlSW50IiwiVVBEQVRFX0ZJTklTSEVEIiwiZmlsZUVycm9yIiwiZG93bmxvYWRGYWlsZWRBc3NldHMiLCJnZXRNZXNzYWdlIiwiVVBEQVRFX0ZBSUxFRCIsIkVSUk9SX1VQREFUSU5HIiwiZXJyb3JmaWxlIiwiZ2V0QXNzZXRJZCIsInJlbW92ZUZpbGUiLCJFUlJPUl9ERUNPTVBSRVNTIiwiX3VwZGF0ZUxpc3RlbmVyIiwic2V0SXRlbSIsImhvdFVwZGF0ZVNlYXJjaFBhdGhzIiwibG9jYWxTdG9yYWdlIiwic2V0U2VhcmNoUGF0aHMiLCJzZWFyY2hQYXRocyIsImdldFNlYXJjaFBhdGhzIiwidW5zaGlmdCIsImRvdCIsImRvdF9tYXgiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInN0cl9kb3QiLCJpIiwiYm9sIiwiVGlwc0xpc3QiLCJqc29uIiwicGxheVRpcHMiLCJpbmRleCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFQyxFQUFFLENBQUNDLFdBRFQ7QUFFUkMsSUFBQUEsU0FBUyxFQUFFRixFQUFFLENBQUNHLEtBRk47QUFHUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNHLEtBSFI7QUFJUkUsSUFBQUEsYUFBYSxFQUFFTCxFQUFFLENBQUNHLEtBSlY7QUFLUkcsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNHLEtBTFA7QUFNUkksSUFBQUEsTUFBTSxFQUFFUCxFQUFFLENBQUNRLElBTkgsQ0FPUjtBQUNBOztBQVJRLEdBRFE7QUFZcEJDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUFBOztBQUVoQixTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQixDQU5nQixDQU1ZOztBQUM1QixTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUVBLFNBQUtqQixZQUFMLENBQWtCa0IsSUFBbEIsQ0FBdUJDLE1BQXZCLEdB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SUFBSSxDQUFDOEMsS0FBTCxDQUFXOUMsSUFBSSxDQUFDK0MsTUFBTCxLQUFnQixHQUEzQixJQUFrQyxNQUFJLENBQUNMLFFBQUwsQ0FBY00sTUFBNUQ7O0FBQ0EsTUFBQSxNQUFJLENBQUNyTixhQUFMLENBQW1CcUIsTUFBbkIsR0FBNEIsTUFBSSxDQUFDMEwsUUFBTCxDQUFjRyxLQUFkLENBQTVCO0FBQ0gsS0FIRCxDQURpQyxFQUtqQ3ZOLEVBQUUsQ0FBQytNLFNBQUgsQ0FBYSxLQUFLaE0sUUFBbEIsQ0FMaUMsQ0FBakIsQ0FBcEI7QUFPSCxHQTFnQm1CO0FBNGdCcEI0TSxFQUFBQSxTQTVnQm9CLHVCQTRnQlI7QUFDUixTQUFLL0ssZUFBTDs7QUFDQSxRQUFJLEtBQUtzSixlQUFULEVBQTBCO0FBQ3RCLFdBQUtuSixHQUFMLENBQVNDLGdCQUFULENBQTBCLElBQTFCOztBQUNBLFdBQUtrSixlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjtBQWxoQm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZmlsZVByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBmaWxlTGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9wZXJjZW50OiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfdGlwY2VudGVyOiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfY2VudGVyOiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfcG86IGNjLk5vZGUsXHJcbiAgICAgICAgLy8gYnl0ZVByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICAvLyBieXRlTGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jYW5SZXRyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2VQYXRoID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGFydF91cGRhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRfZmxvdyA9IDI7ICAgICAgICAvL+ebruWJjeWAhuWAi+a1geeoiyAxIOmihOWKoOi9veaPkOekuuahhiAgMiDojrflj5bng63mm7TmlbDmja5cclxuICAgICAgICB0aGlzLnRpcGRlbGF5ID0gMztcclxuICAgICAgICB0aGlzLnVwZGF0ZV9lcnJvciA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsZVByb2dyZXNzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5wcmVsb2FkTG9pbk1vZGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJ2ZXJDZmcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICBnbEdhbWUuc2VydmVyY2ZnLmxvYWRTZXR0aW5nKCk7XHJcbiAgICAgICAgdGhpcy5maWxlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmlsZUxhYmVsLnN0cmluZyA9ICcnO1xyXG4gICAgICAgIHRoaXMubGFiX3RpcCA9IFwi5q2j5Zyo6L+e5o6l5pyN5Yqh5ZmoXCI7XHJcbiAgICAgICAgdGhpcy5hY3RTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXCLmraPlnKjov57mjqXmnI3liqHlmahcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5sYWJfcGVyY2VudC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5mZXRjaEpTT04oKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVQREFURV9TRVJWRVJfQ0ZHLCB0aGlzLnVwZGF0ZVNlcnZlckNmZywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5ET1dOTE9BRC5PUEVOX1BBVEgsIHRoaXMuZG93bkxvYWRHYW1lLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLkRPV05MT0FELlNUT1AsIHRoaXMudXBkYXRlU3RvcCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5ORVRXT1JLLlBPRE9UX09OLCB0aGlzLnBvbWVsb19kb3Rfb24sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VUERBVEVfU0VSVkVSX0NGRywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuRE9XTkxPQUQuT1BFTl9QQVRILCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5ET1dOTE9BRC5TVE9QLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5ORVRXT1JLLlBPRE9UX09OLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgcG9tZWxvX2RvdF9vbihvbm9mZikge1xyXG4gICAgICAgIHRoaXMubGFiX3BvLmFjdGl2ZSA9IG9ub2ZmO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVTdG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICog54Ot5pu05YmN55qE5YeG5aSHXHJcbiAgICAqL1xyXG4gICAgdXBkYXRlU2VydmVyQ2ZnOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydF91cGRhdGUrKztcclxuICAgICAgICB0aGlzLnN0YXRlVXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vng63mm7TmuLjmiI9cclxuICAgICAqL1xyXG4gICAgc3RhdGVVcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRfdXBkYXRlID49IHRoaXMuc3RhcnRfZmxvdykge1xyXG4gICAgICAgICAgICBpZiAoZ2xHYW1lLnNlcnZlcmNmZy5nZXRCb2xNYWludGFpbmluZygpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93TWFpbnRhaW5Ob3RpY2UoZ2xHYW1lLnNlcnZlcmNmZy5nZXRNYWludGFpbmluZ0NvbnRlbnQoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzRW5hYmxlSG90VXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyTG9naW5TY2VuZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS5zeXN0ZW1jbGFzcy5jb21wYXJpc29uVmVyc2lvbihnbEdhbWUuc2VydmVyY2ZnLmdldEhvdERvd25WZXJzaW9uKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UHJvamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIua4qemmqOaPkOekulwiLCBcIuW9k+WJjeeJiOacrOS4jeWMuemFjemcgOimgemHjeaWsOS4i+i9vea4uOaIj+WMhe+8jOaYr+WQpuWJjeW+gOS4i+i9ve+8n1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdsR2FtZS5zZXJ2ZXJjZmcub3BlbkRvd25Mb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcURvd25Mb2FkSnVtcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkb3duTG9hZEdhbWUoKSB7XHJcbiAgICAgICAgaWYgKCFpc0VuYWJsZUhvdFVwZGF0ZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgbGV0IHN0clVybCA9IGdsR2FtZS51c2VyLmdldChcInVybFwiKS5kb3dubG9hZEFuZHJvaWRVcmw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyVXJsID09PSBcInN0cmluZ1wiICYmIHN0clVybC5zdWJzdHIoLTQpID09PSBcIi5hcGtcIikge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBsYXRmb3JtLkRvd25sb2FkQXBrKHN0clVybCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuRE9XTkxPQUQuQkFHKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vZ2xHYW1lLnBhbmVsLnNob3dUaXAoXCLng63mm7TlnLDlnYDmnInor6/vvIzor7fogZTns7vlrqLmnI3kurrlkZjjgIJcIik7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChnbEdhbWUudXNlci5nZXQoXCJ1cmxcIikuZG93bmxvYWRfanVtcCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIua4qemmqOaPkOekulwiLCBcIuW9k+WJjeeJiOacrOS4jeWMuemFjemcgOimgemHjeaWsOS4i+i9vea4uOaIj+WMhe+8jOaYr+WQpuWJjeW+gOS4i+i9ve+8n1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2xHYW1lLnNlcnZlcmNmZy5vcGVuRG93bkxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUudXNlci5yZXFEb3duTG9hZEp1bXAoKTtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTChnbEdhbWUudXNlci5nZXQoXCJ1cmxcIikuZG93bmxvYWRfanVtcCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwi5rip6aao5o+Q56S6XCIsIFwi5b2T5YmN54mI5pys5LiN5Yy56YWN6ZyA6KaB6YeN5paw5LiL6L295ri45oiP5YyF77yM5piv5ZCm5YmN5b6A5LiL6L2977yfXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGdsR2FtZS5zZXJ2ZXJjZmcub3BlbkRvd25Mb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUudXNlci5yZXFEb3duTG9hZEp1bXAoKTtcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+agueaNrue8k+WtmOeahOeDreabtHZlciDov5vooYzlr7nmr5TvvIzlh4/lsJHkuI3lv4XopoHnmoTng63mm7TliqDovb3vvIzlubblr7nniYjmnKzov5vooYzkuIDlrprnmoTng63mm7Tnu7TmiqRcclxuICAgIGNoZWNrVmVyc2lvbigpIHtcclxuICAgICAgICBsZXQgZ2FtZU5hbWUgPSBcIm1hc3RlclwiO1xyXG4gICAgICAgIGxldCB1cGRhdGVfZGF0YSA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oJ3VwZGF0ZV9kYXRhJyk7XHJcbiAgICAgICAgbGV0IGhvdFVwZGF0ZVVSTCA9IGdsR2FtZS5zZXJ2ZXJjZmcuZ2V0SG90dXBkYXRlVmVyc2lvblVybCgpO1xyXG4gICAgICAgIGxldCB1cmwgPSBgJHtob3RVcGRhdGVVUkx9JHtnYW1lTmFtZX0vJHtnYW1lTmFtZX12ZXJzaW9uLm1hbmlmZXN0YFxyXG5cclxuICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0R2FtZVZlcnNpb24odXJsKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVfZGF0YSAmJiB1cGRhdGVfZGF0YVtnYW1lTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnZlcnNpb24gPT09IHVwZGF0ZV9kYXRhW2dhbWVOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L+H54Ot5pu077yM55uu5YmN54mI5pys5piv5pyA5paw55qE77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckxvZ2luU2NlbmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLmNyZWF0ZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5jcmVhdGVVcGRhdGUoKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVXBkYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/mo4DpqozmnKzlnLDmlofku7ZcclxuICAgIGluaXRQcm9qZWN0KCkge1xyXG4gICAgICAgIGxldCBnYW1lTmFtZSA9IFwibWFzdGVyXCI7XHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZVBhdGggPSAoanNiLmZpbGVVdGlscyA/IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgOiBcIi9cIikgKyBnYW1lTmFtZSArIFwiL1wiO1xyXG5cclxuICAgICAgICB0aGlzLnZlcl90eHQgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGAke3RoaXMuX3N0b3JhZ2VQYXRofXByb2plY3QubWFuaWZlc3RgKTtcclxuICAgICAgICB0aGlzLm1hbmlmZXN0VXJsID0gYHByb2plY3QubWFuaWZlc3RgO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmnKzlnLDot6/lvoQgOiAnICsgdGhpcy5fc3RvcmFnZVBhdGgsIHRoaXMubWFuaWZlc3RVcmwpO1xyXG5cclxuICAgICAgICBsZXQgaG90VXBkYXRlVVJMID0gZ2xHYW1lLnNlcnZlcmNmZy5nZXRIb3R1cGRhdGVWZXJzaW9uVXJsKCk7XHJcbiAgICAgICAgLy/mmK/lkKbojrflj5bmnKzlnLDnmoTng63mm7TlnLDlnYBcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZE1hbmlmZXN0KFwiY29uZmlnL21hc3RlcnByb2plY3RcIikudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgLy/mnKzlnLDmoKHpqozmlofku7ZcclxuICAgICAgICAgICAgbGV0IG1hbmlmZXN0anNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIG1hbmlmZXN0anNvbi5wYWNrYWdlVXJsID0gYCR7aG90VXBkYXRlVVJMfSR7Z2FtZU5hbWV9L2A7XHJcbiAgICAgICAgICAgIG1hbmlmZXN0anNvbi5yZW1vdGVNYW5pZmVzdFVybCA9IGAke2hvdFVwZGF0ZVVSTH0ke2dhbWVOYW1lfS8ke2dhbWVOYW1lfXByb2plY3QubWFuaWZlc3RgO1xyXG4gICAgICAgICAgICBtYW5pZmVzdGpzb24ucmVtb3RlVmVyc2lvblVybCA9IGAke2hvdFVwZGF0ZVVSTH0ke2dhbWVOYW1lfS8ke2dhbWVOYW1lfXZlcnNpb24ubWFuaWZlc3RgO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbU1hbmlmZXN0U3RyID0gSlNPTi5zdHJpbmdpZnkobWFuaWZlc3Rqc29uKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcl90eHQpIHRoaXMuY2hlY2tVcFByb2plY3QoYCR7dGhpcy5fc3RvcmFnZVBhdGh9cHJvamVjdC5tYW5pZmVzdGApO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmVyc2lvbigpO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgLy/mnKrmib7liLDmnKzlnLDmoKHpqozmlofku7ZcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21NYW5pZmVzdFN0ciA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIFwicGFja2FnZVVybFwiOiBgJHtob3RVcGRhdGVVUkx9JHtnYW1lTmFtZX0vYCxcclxuICAgICAgICAgICAgICAgIFwicmVtb3RlTWFuaWZlc3RVcmxcIjogYCR7aG90VXBkYXRlVVJMfSR7Z2FtZU5hbWV9LyR7Z2FtZU5hbWV9cHJvamVjdC5tYW5pZmVzdGAsXHJcbiAgICAgICAgICAgICAgICBcInJlbW90ZVZlcnNpb25VcmxcIjogYCR7aG90VXBkYXRlVVJMfSR7Z2FtZU5hbWV9LyR7Z2FtZU5hbWV9dmVyc2lvbi5tYW5pZmVzdGAsXHJcbiAgICAgICAgICAgICAgICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhc3NldHNcIjoge30sXHJcbiAgICAgICAgICAgICAgICBcInNlYXJjaFBhdGhzXCI6IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52ZXJfdHh0KSB0aGlzLmNoZWNrVXBQcm9qZWN0KGAke3RoaXMuX3N0b3JhZ2VQYXRofXByb2plY3QubWFuaWZlc3RgKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1ZlcnNpb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6Xng63mm7Tmlofku7blubbmm7/mjaLlhbbng63mm7TlnLDlnYBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXHJcbiAgICAgKi9cclxuICAgIGNoZWNrVXBQcm9qZWN0KHBhdGgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgbGV0IFByb2plY3REYXRhID0gSlNPTi5wYXJzZShkYXRhKSxcclxuICAgICAgICAgICAgY3VzdG9tTWFuaWZlc3QgPSBKU09OLnBhcnNlKHRoaXMuY3VzdG9tTWFuaWZlc3RTdHIpXHJcbiAgICAgICAgaWYgKGN1c3RvbU1hbmlmZXN0LnBhY2thZ2VVcmwgIT0gUHJvamVjdERhdGEucGFja2FnZVVybCB8fFxyXG4gICAgICAgICAgICBjdXN0b21NYW5pZmVzdC5yZW1vdGVNYW5pZmVzdFVybCAhPSBQcm9qZWN0RGF0YS5yZW1vdGVNYW5pZmVzdFVybCB8fFxyXG4gICAgICAgICAgICBjdXN0b21NYW5pZmVzdC5yZW1vdGVWZXJzaW9uVXJsICE9IFByb2plY3REYXRhLnJlbW90ZVZlcnNpb25VcmwpIHtcclxuICAgICAgICAgICAgUHJvamVjdERhdGEucGFja2FnZVVybCA9IGN1c3RvbU1hbmlmZXN0LnBhY2thZ2VVcmw7XHJcbiAgICAgICAgICAgIFByb2plY3REYXRhLnJlbW90ZU1hbmlmZXN0VXJsID0gY3VzdG9tTWFuaWZlc3QucmVtb3RlTWFuaWZlc3RVcmw7XHJcbiAgICAgICAgICAgIFByb2plY3REYXRhLnJlbW90ZVZlcnNpb25VcmwgPSBjdXN0b21NYW5pZmVzdC5yZW1vdGVWZXJzaW9uVXJsO1xyXG4gICAgICAgICAgICBqc2IuZmlsZVV0aWxzLndyaXRlU3RyaW5nVG9GaWxlKEpTT04uc3RyaW5naWZ5KFByb2plY3REYXRhKSwgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVVcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gU2V0dXAgeW91ciBvd24gdmVyc2lvbiBjb21wYXJlIGhhbmRsZXIsIHZlcnNpb25BIGFuZCBCIGlzIHZlcnNpb25zIGluIHN0cmluZ1xyXG4gICAgICAgIC8vIGlmIHRoZSByZXR1cm4gdmFsdWUgZ3JlYXRlciB0aGFuIDAsIHZlcnNpb25BIGlzIGdyZWF0ZXIgdGhhbiBCLFxyXG4gICAgICAgIC8vIGlmIHRoZSByZXR1cm4gdmFsdWUgZXF1YWxzIDAsIHZlcnNpb25BIGVxdWFscyB0byBCLFxyXG4gICAgICAgIC8vIGlmIHRoZSByZXR1cm4gdmFsdWUgc21hbGxlciB0aGFuIDAsIHZlcnNpb25BIGlzIHNtYWxsZXIgdGhhbiBCLlxyXG4gICAgICAgIHRoaXMudmVyc2lvbkNvbXBhcmVIYW5kbGUgPSBmdW5jdGlvbiAodmVyc2lvbkEsIHZlcnNpb25CKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSlMg6Ieq5a6a5LmJ54mI5pys5q+U6L6DOiB2ZXJzaW9uIEEgOiBcIiArIHZlcnNpb25BICsgJywgdmVyc2lvbiBCIDogJyArIHZlcnNpb25CKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb25BID09PSB2ZXJzaW9uQiA/IDAgOiAtMTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBJbml0IHdpdGggZW1wdHkgbWFuaWZlc3QgdXJsIGZvciB0ZXN0aW5nIGN1c3RvbSBtYW5pZmVzdFxyXG4gICAgICAgIHRoaXMuX2FtID0gbmV3IGpzYi5Bc3NldHNNYW5hZ2VyKFwiXCIsIHRoaXMuX3N0b3JhZ2VQYXRoLCB0aGlzLnZlcnNpb25Db21wYXJlSGFuZGxlKTtcclxuICAgICAgICAvLyBpZiAoIWNjLnN5cy5FTkFCTEVfR0NfRk9SX05BVElWRV9PQkpFQ1RTKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2FtLnJldGFpbigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBTZXR1cCB0aGUgdmVyaWZpY2F0aW9uIGNhbGxiYWNrLCBidXQgd2UgZG9uJ3QgaGF2ZSBtZDUgY2hlY2sgZnVuY3Rpb24geWV0LCBzbyBvbmx5IHByaW50IHNvbWUgbWVzc2FnZVxyXG4gICAgICAgIC8vIFJldHVybiB0cnVlIGlmIHRoZSB2ZXJpZmljYXRpb24gcGFzc2VkLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgdGhpcy5fYW0uc2V0VmVyaWZ5Q2FsbGJhY2soZnVuY3Rpb24gKHBhdGgsIGFzc2V0KSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gYXNzZXQgaXMgY29tcHJlc3NlZCwgd2UgZG9uJ3QgbmVlZCB0byBjaGVjayBpdHMgbWQ1LCBiZWNhdXNlIHppcCBmaWxlIGhhdmUgYmVlbiBkZWxldGVkLlxyXG4gICAgICAgICAgICB2YXIgY29tcHJlc3NlZCA9IGFzc2V0LmNvbXByZXNzZWQ7XHJcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIHRoZSBjb3JyZWN0IG1kNSB2YWx1ZS5cclxuICAgICAgICAgICAgdmFyIGV4cGVjdGVkTUQ1ID0gYXNzZXQubWQ1O1xyXG4gICAgICAgICAgICAvLyBhc3NldC5wYXRoIGlzIHJlbGF0aXZlIHBhdGggYW5kIHBhdGggaXMgYWJzb2x1dGUuXHJcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVBhdGggPSBhc3NldC5wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi6aqM6K+B6YCa6L+HIDogXCIgKyByZWxhdGl2ZVBhdGggKyAnICgnICsgZXhwZWN0ZWRNRDUgKyAnKScpO1xyXG4gICAgICAgICAgICAvLyBUaGUgc2l6ZSBvZiBhc3NldCBmaWxlLCBidXQgdGhpcyB2YWx1ZSBjb3VsZCBiZSBhYnNlbnQuXHJcbiAgICAgICAgICAgIHZhciBzaXplID0gYXNzZXQuc2l6ZTtcclxuICAgICAgICAgICAgaWYgKGNvbXByZXNzZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGluZm8uc3RyaW5nID0gXCLpqozor4HpgJrov4cgOiBcIiArIHJlbGF0aXZlUGF0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaW5mby5zdHJpbmcgPSBcIumqjOivgemAmui/hyA6IFwiICsgcmVsYXRpdmVQYXRoICsgJyAoJyArIGV4cGVjdGVkTUQ1ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+eDreabtOaWsOW3suWwsee7qizor7fmo4Dmn6XmiJbnm7TmjqXmm7TmlrAuJyk7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIC8vIFNvbWUgQW5kcm9pZCBkZXZpY2UgbWF5IHNsb3cgZG93biB0aGUgZG93bmxvYWQgcHJvY2VzcyB3aGVuIGNvbmN1cnJlbnQgdGFza3MgaXMgdG9vIG11Y2guXHJcbiAgICAgICAgICAgIC8vIFRoZSB2YWx1ZSBtYXkgbm90IGJlIGFjY3VyYXRlLCBwbGVhc2UgZG8gbW9yZSB0ZXN0IGFuZCBmaW5kIHdoYXQncyBtb3N0IHN1aXRhYmxlIGZvciB5b3VyIGdhbWUuXHJcbiAgICAgICAgICAgIHRoaXMuX2FtLnNldE1heENvbmN1cnJlbnRUYXNrKDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5qOA5rWL5pu05pawXHJcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpO1xyXG4gICAgfSxcclxuICAgIC8v6aKE5Yqg6L296YCa55So5qih5Z2XXHJcbiAgICBwcmVsb2FkZWRQcmVmYWI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFwi5q2j5Zyo5Yqg6L295ri45oiP6YWN572uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubGFiX3BlcmNlbnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnByZWxvYWRQdWJsaWNNb2RlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVudGVyTG9naW5TY2VuZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdGhpcy5wcmVsb2FkZWRQcmVmYWIoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBnbEdhbWUuc2NlbmUuc2V0TmV4dFNjZW5lVGFnKGdsR2FtZS5zY2VuZXRhZy5QTEFaQSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcIuato+WcqOi/m+WFpea4uOaIj1wiLCB0cnVlKTtcclxuICAgICAgICAvL+WIpOWumuaYr+WQpuWxnuS6juiHquWKqOeZu+WFpVxyXG4gICAgICAgIGxldCBibEF1dG8gPSBnbEdhbWUubG9nb24uYXV0b0xvZ2luKCk7XHJcbiAgICAgICAgaWYgKGJsQXV0bykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5sb2dvbi5yZXFUb3VMb2dpbigpO1xyXG4gICAgICAgIC8vZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLkRPV05MT0FELkVORCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAvL30pXHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrVXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjmo4Dmn6XmiJbmm7TmlrAsIOivt+eojeetiSAuLi4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYW0uZ2V0U3RhdGUoKSA9PT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ato+WcqOajgOafpeaYr+WQpumcgOimgeabtOaWsOS4rSwg6K+356iN562JIC4uLicsIHRoaXMubWFuaWZlc3RVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdCh0aGlzLm1hbmlmZXN0VXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hbS5nZXRMb2NhbE1hbmlmZXN0KCkgfHwgIXRoaXMuX2FtLmdldExvY2FsTWFuaWZlc3QoKS5pc0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbS5nZXRTdGF0ZSgpICE9PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaXoOazleWKoOi9veacrOWcsOa4heWNlSwg5L2/55So6buY6K6k5pu05paw5riF5Y2VIC4uLlwiLCB0aGlzLmN1c3RvbU1hbmlmZXN0U3RyLCB0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIGxldCBtYW5pZmVzdCA9IG5ldyBqc2IuTWFuaWZlc3QodGhpcy5jdXN0b21NYW5pZmVzdFN0ciwgdGhpcy5fc3RvcmFnZVBhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdChtYW5pZmVzdCwgdGhpcy5fc3RvcmFnZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKHRoaXMuY2hlY2tDYi5iaW5kKHRoaXMpKVxyXG5cclxuICAgICAgICB0aGlzLl9hbS5jaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaG90VXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FtICYmICF0aGlzLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKHRoaXMudXBkYXRlQ2IuYmluZCh0aGlzKSlcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbS5nZXRTdGF0ZSgpID09PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYW0ubG9hZExvY2FsTWFuaWZlc3QodGhpcy5tYW5pZmVzdFVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZhaWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2FtLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tPiDmo4DmtYvkuovku7blm57mjonlh73mlbBcclxuICAgIGNoZWNrQ2I6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGxldCBuZWVkVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlQ2hlY2tTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX05PX0xPQ0FMX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfRE9XTkxPQURfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9QQVJTRV9NQU5JRkVTVDpcclxuICAgICAgICAgICAgICAgIGxldCBpc1JlbW92ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW0uZ2V0U3RhdGUoKSAhPT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIumUmeivr1wiLCBcIua4uOaIj+abtOaWsOWksei0pSwg54K55Ye756Gu5a6a6YeN5ZCvLi4uXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSZW1vdmUgPSBqc2IuZmlsZVV0aWxzLnJlbW92ZURpcmVjdG9yeSh0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JlbW92ZSA9IGpzYi5maWxlVXRpbHMucmVtb3ZlRGlyZWN0b3J5KHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KHRoaXMuY3VzdG9tTWFuaWZlc3RTdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FtLmxvYWRMb2NhbE1hbmlmZXN0KG1hbmlmZXN0LCB0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZUNoZWNrU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW3sue7j+abtOaWsOS6huacgOaWsOeahOi/nOeoi+eJiOacrC5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyTG9naW5TY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5ORVdfVkVSU0lPTl9GT1VORDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmib7liLDmlrDniYjmnKwsIOivt+WwneivleabtOaWsC4nKTtcclxuICAgICAgICAgICAgICAgIG5lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlUHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJfcGVyY2VudC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiX3BlcmNlbnQuc3RyaW5nID0gJzAlJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTGFiZWwuc3RyaW5nID0gYOato+WcqOabtOaWsOS4rS4uLi4uLi5gO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ieXRlUHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlUHJvZ3Jlc3Mubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5fYW0uc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcclxuICAgICAgICB0aGlzLl9jaGVja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChyZUNoZWNrU3RhdGUpIHRoaXMuY2hlY2tVcGRhdGUoKTtcclxuICAgICAgICBlbHNlIGlmIChuZWVkVXBkYXRlKSB0aGlzLmhvdFVwZGF0ZSgpO1xyXG4gICAgfSxcclxuICAgIC8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbiAgICBnZXRGbG9hdDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLmNlaWwodmFsdWUgLyAxMCAvIDEwMjQpO1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLT4g54Ot5pu05paw5LqL5Lu25Zue5o6J5Ye95pWwXHJcbiAgICB1cGRhdGVDYjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIG5lZWRSZXN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZhaWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX05PX0xPQ0FMX01BTklGRVNUOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aJvuS4jeWIsOacrOWcsOa4heWNleaWh+S7tu+8jOi3s+i/h+eDreabtOaWsC4nKTtcclxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9QUk9HUkVTU0lPTjpcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYnl0ZVByb2dyZXNzLnByb2dyZXNzID0gZXZlbnQuZ2V0UGVyY2VudCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWxlUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBldmVudC5nZXRQZXJjZW50QnlGaWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ieXRlUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBldmVudC5nZXREb3dubG9hZGVkQnl0ZXMoKS9ldmVudC5nZXRUb3RhbEJ5dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJ5dGVMYWJlbC5zdHJpbmcgPSBldmVudC5nZXREb3dubG9hZGVkQnl0ZXMoKSArICcgLyAnICsgZXZlbnQuZ2V0VG90YWxCeXRlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhYl9wZXJjZW50LnN0cmluZyA+PSBcIjEwMCVcIiAmJiBldmVudC5nZXRQZXJjZW50KCkgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlTGFiZWwuc3RyaW5nID0gYGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcIuato+WcqOS4uuaCqOagoemqjOeDreabtOaWh+S7tlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZmlsZUxhYmVsLm5vZGUueCA9IC10aGlzLmZpbGVMYWJlbC5ub2RlLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5omT5Ye65p2l5o+Q56S65a2X55qE5L2N572uJyx0aGlzLmZpbGVMYWJlbC5ub2RlLngpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJfcGVyY2VudC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gZXZlbnQuZ2V0RG93bmxvYWRlZEJ5dGVzKCkgPj0gZXZlbnQuZ2V0VG90YWxCeXRlcygpID8gZXZlbnQuZ2V0VG90YWxCeXRlcygpIDogZXZlbnQuZ2V0RG93bmxvYWRlZEJ5dGVzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXBzaXplID0gZXZlbnQuZ2V0RG93bmxvYWRlZEJ5dGVzKCkgPyBgJHt0aGlzLmdldEZsb2F0KHByb2dyZXNzKX1NYi8ke3RoaXMuZ2V0RmxvYXQoZXZlbnQuZ2V0VG90YWxCeXRlcygpKX1NYmAgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVMYWJlbC5zdHJpbmcgPSBg5q2j5Zyo5pu05paw5LitLi4uLi4uJHt1cHNpemV9YDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVByb2dyZXNzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVByb2dyZXNzLnByb2dyZXNzID0gTWF0aC5tYXgodGhpcy5maWxlUHJvZ3Jlc3MucHJvZ3Jlc3MsIGV2ZW50LmdldFBlcmNlbnQoKSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiX3BlcmNlbnQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJfcGVyY2VudC5zdHJpbmcgPSBgJHtwYXJzZUludChldmVudC5nZXRQZXJjZW50KCkgKiAxMDApIHx8IDB9JWBcclxuICAgICAgICAgICAgICAgIC8vIHZhciBtc2cgPSBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ+abtOaWsOWQjueahOaWh+S7tjogJyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZ2V0UGVyY2VudCgpLzEwMCArICclIDogJyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RPV05MT0FEX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfUEFSU0VfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5peg5rOV5LiL6L295riF5Y2V5paH5Lu277yM6Lez6L+H54Ot5pu05pawLicpO1xyXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuQUxSRUFEWV9VUF9UT19EQVRFOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W3sue7j+abtOaWsOS6huacgOaWsOeahOi/nOeoi+eJiOacrC4nKTtcclxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FtLmRvd25sb2FkRmFpbGVkQXNzZXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+abtOaWsOWujOaIkC4gJyArIGV2ZW50LmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZFJlc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfRkFJTEVEOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+abtOaWsOWksei0pS4gJyArIGV2ZW50LmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51cGRhdGVfZXJyb3IgPD0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX2Vycm9yKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW0uZG93bmxvYWRGYWlsZWRBc3NldHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIumUmeivr1wiLCBcIua4uOaIj+abtOaWsOWksei0pSwg54K55Ye756Gu5a6a6YeN6K+VLi4uXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl91cGRhdGluZyAmJiB0aGlzLl9jYW5SZXRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuUmV0cnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FtLmRvd25sb2FkRmFpbGVkQXNzZXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5SZXRyeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1VQREFUSU5HOlxyXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yZmlsZSA9IChqc2IuZmlsZVV0aWxzID8ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSA6IFwiL1wiKSArIFwibWFzdGVyX3RlbXAvXCIgKyBldmVudC5nZXRBc3NldElkKCkgKyBcIi50bXBcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yig6Zmk5peg5rOV6L2s5o2i5paH5Lu277yaXCIsIGVycm9yZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZUZpbGUoZXJyb3JmaWxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfotYTmupDmm7TmlrDplJnor686ICcgKyBldmVudC5nZXRBc3NldElkKCkgKyAnLCAnICsgZXZlbnQuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfREVDT01QUkVTUzpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZhaWxlZCkge1xyXG4gICAgICAgICAgICAvLyBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZWVkUmVzdGFydCkge1xyXG4gICAgICAgICAgICAvLyBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIOacrOasoeiuvuiuoeaQnOe0oui3r+W+hOS4uuWNleS4gOeahOS4jeW5tuWtmFxyXG5cclxuICAgICAgICAgICAgLy/lpITnkIbng63mm7TnvJPlrZjorrDlvZVcclxuICAgICAgICAgICAgaWYgKHRoaXMudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKCd1cGRhdGVfZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW1wibWFzdGVyXCJdID0gdGhpcy52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtcIm1hc3RlclwiXSA9IHRoaXMudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oJ3VwZGF0ZV9kYXRhJywgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGhvdFVwZGF0ZVNlYXJjaFBhdGhzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0hvdFVwZGF0ZVNlYXJjaFBhdGhzJyk7XHJcbiAgICAgICAgICAgIGlmIChob3RVcGRhdGVTZWFyY2hQYXRocykge1xyXG4gICAgICAgICAgICAgICAganNiLmZpbGVVdGlscy5zZXRTZWFyY2hQYXRocyhKU09OLnBhcnNlKGhvdFVwZGF0ZVNlYXJjaFBhdGhzKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg5om+5Yiw54Ot5pu05paw6Lev5b6EOiAke2hvdFVwZGF0ZVNlYXJjaFBhdGhzfWApXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoUGF0aHMgPSBqc2IuZmlsZVV0aWxzLmdldFNlYXJjaFBhdGhzKCk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXRocy51bnNoaWZ0KGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyAnbWFzdGVyLycpO1xyXG4gICAgICAgICAgICAgICAganNiLmZpbGVVdGlscy5zZXRTZWFyY2hQYXRocyhzZWFyY2hQYXRocylcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIb3RVcGRhdGVTZWFyY2hQYXRocycsIEpTT04uc3RyaW5naWZ5KHNlYXJjaFBhdGhzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVTdGFydEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDmloflrZfms6LliqhcclxuICAgICAqL1xyXG4gICAgYWN0U3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZG90ID0gMDtcclxuICAgICAgICB2YXIgZG90X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGFiX2NlbnRlci5ub2RlLmFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZG90ID49IGRvdF9tYXggPyBkb3QgPSAwIDogZG90Kys7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyX2RvdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvdDsgaSsrKXN0cl9kb3QgPSBzdHJfZG90ICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9jZW50ZXIuc3RyaW5nID0gdGhpcy5sYWJfdGlwICsgc3RyX2RvdDtcclxuICAgICAgICAgICAgfSkpKSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lvZPliY3mtYHnqIvnirbmgIFcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RyaW5nIFxyXG4gICAgICogQHBhcmFtIHsqfSBib2wgXHJcbiAgICAgKi9cclxuICAgIHNldFN0YXRlOiBmdW5jdGlvbiAoc3RyaW5nLCBib2wpIHtcclxuICAgICAgICB0aGlzLmxhYl9jZW50ZXIubm9kZS5hY3RpdmUgPSBib2w7XHJcbiAgICAgICAgdGhpcy5sYWJfY2VudGVyLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICB0aGlzLmxhYl90aXAgPSBzdHJpbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIGZldGNoSlNPTigpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwuZmV0Y2hKU09OKFwiVGlwc0xpc3RcIikudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5UaXBzTGlzdCA9IGRhdGEuanNvbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5VGlwcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlUaXBzKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIHRoaXMuVGlwc0xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJfdGlwY2VudGVyLnN0cmluZyA9IHRoaXMuVGlwc0xpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRoaXMudGlwZGVsYXkpXHJcbiAgICAgICAgKSkpXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=
glGame.baseclass.extend({
    properties: {
        fileProgress: cc.ProgressBar,
        fileLabel: cc.Label,
        lab_percent: cc.Label,
        lab_tipcenter: cc.Label,
        lab_center: cc.Label,
        lab_po: cc.Node,
        // byteProgress: cc.ProgressBar,
        // byteLabel: cc.Label,
    },

    onLoad: function () {

        this._updating = false;
        this._canRetry = false;
        this._storagePath = '';
        this.start_update = 0;
        this.start_flow = 2;        //目前倆個流程 1 预加载提示框  2 获取热更数据
        this.tipdelay = 3;
        this.update_error = 0;

        this.fileProgress.node.active = false;

        glGame.panel.preloadLoinMode().then(() => {
            this.updateServerCfg();
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

    registerEvent() {
        glGame.emitter.on(MESSAGE.UPDATE_SERVER_CFG, this.updateServerCfg, this);
        glGame.emitter.on(MESSAGE.DOWNLOAD.OPEN_PATH, this.downLoadGame, this);
        glGame.emitter.on(MESSAGE.DOWNLOAD.STOP, this.updateStop, this);
        glGame.emitter.on(MESSAGE.NETWORK.PODOT_ON, this.pomelo_dot_on, this);
    },
    unRegisterEvent() {
        glGame.emitter.off(MESSAGE.UPDATE_SERVER_CFG, this);
        glGame.emitter.off(MESSAGE.DOWNLOAD.OPEN_PATH, this);
        glGame.emitter.off(MESSAGE.DOWNLOAD.STOP, this);
        glGame.emitter.off(MESSAGE.NETWORK.PODOT_ON, this);
    },

    pomelo_dot_on(onoff) {
        this.lab_po.active = onoff;
    },

    updateStop() {
        if (this._am) {
            this._am.setEventCallback(null);
            this._am.clear();
        }
    },
    /**
    * 热更前的准备
    */
    updateServerCfg: function () {
        this.start_update++;
        this.stateUpdate();
    },
    /**
     * 开始热更游戏
     */
    stateUpdate() {
        if (this.start_update >= this.start_flow) {
            if (glGame.servercfg.getBolMaintaining() == 1) {
                glGame.panel.showMaintainNotice(glGame.servercfg.getMaintainingContent());
            } else if (!isEnableHotUpdate) {
                this.enterLoginScene();
            } else {
                if (glGame.systemclass.comparisonVersion(glGame.servercfg.getHotDownVersion())) {
                    this.initProject();
                } else {
                    glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", () => {
                        // glGame.servercfg.openDownLoad();
                        glGame.user.reqDownLoadJump();
                    }, () => {
                        cc.game.end();
                    });
                }
            }
        }
    },
    downLoadGame() {
        if (!isEnableHotUpdate) return;
        if (isAndroid) {
            let strUrl = glGame.user.get("url").downloadAndroidUrl;
            if (typeof strUrl === "string" && strUrl.substr(-4) === ".apk") {
                glGame.platform.DownloadApk(strUrl);
                glGame.emitter.emit(MESSAGE.DOWNLOAD.BAG);
            } else {
                //glGame.panel.showTip("热更地址有误，请联系客服人员。");
                cc.sys.openURL(glGame.user.get("url").download_jump);
                glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", () => {
                    // glGame.servercfg.openDownLoad();
                    glGame.user.reqDownLoadJump();
                }, () => {
                    cc.game.end();
                });
            }
        } else {
            cc.sys.openURL(glGame.user.get("url").download_jump);
            glGame.panel.showDialog("温馨提示", "当前版本不匹配需要重新下载游戏包，是否前往下载？", () => {
                // glGame.servercfg.openDownLoad();
                glGame.user.reqDownLoadJump();
            }, () => {
                cc.game.end();
            });
        }
    },

    //根据缓存的热更ver 进行对比，减少不必要的热更加载，并对版本进行一定的热更维护
    checkVersion() {
        let gameName = "master";
        let update_data = glGame.storage.getItem('update_data');
        let hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
        let url = `${hotUpdateURL}${gameName}/${gameName}version.manifest`

        glGame.gamelistcfg.getGameVersion(url).then(data => {
            this.version = data.version;
            if (update_data && update_data[gameName]) {
                if (data.version === update_data[gameName]) {
                    console.log("跳过热更，目前版本是最新的！")
                    this.enterLoginScene();
                } else this.createUpdate();
            } else this.createUpdate();
        }, () => {
            this.createUpdate();
        });
    },
    //检验本地文件
    initProject() {
        let gameName = "master";
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameName + "/";

        this.ver_txt = jsb.fileUtils.isFileExist(`${this._storagePath}project.manifest`);
        this.manifestUrl = `project.manifest`;
        console.log('本地路径 : ' + this._storagePath, this.manifestUrl);

        let hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
        //是否获取本地的热更地址
        glGame.fileutil.readManifest("config/masterproject").then(data => {
            //本地校验文件
            let manifestjson = JSON.parse(data);
            manifestjson.packageUrl = `${hotUpdateURL}${gameName}/`;
            manifestjson.remoteManifestUrl = `${hotUpdateURL}${gameName}/${gameName}project.manifest`;
            manifestjson.remoteVersionUrl = `${hotUpdateURL}${gameName}/${gameName}version.manifest`;
            this.customManifestStr = JSON.stringify(manifestjson);

            if (this.ver_txt) this.checkUpProject(`${this._storagePath}project.manifest`);
            this.checkVersion();
        }).catch(() => {
            //未找到本地校验文件
            this.customManifestStr = JSON.stringify({
                "packageUrl": `${hotUpdateURL}${gameName}/`,
                "remoteManifestUrl": `${hotUpdateURL}${gameName}/${gameName}project.manifest`,
                "remoteVersionUrl": `${hotUpdateURL}${gameName}/${gameName}version.manifest`,
                "version": "0.0.0",
                "assets": {},
                "searchPaths": []
            });
            if (this.ver_txt) this.checkUpProject(`${this._storagePath}project.manifest`);
            this.checkVersion();
        })
    },


    /**
     * 检查热更文件并替换其热更地址
     * @param {string} path
     */
    checkUpProject(path) {
        let data = jsb.fileUtils.getStringFromFile(path);
        let ProjectData = JSON.parse(data),
            customManifest = JSON.parse(this.customManifestStr)
        if (customManifest.packageUrl != ProjectData.packageUrl ||
            customManifest.remoteManifestUrl != ProjectData.remoteManifestUrl ||
            customManifest.remoteVersionUrl != ProjectData.remoteVersionUrl) {
            ProjectData.packageUrl = customManifest.packageUrl;
            ProjectData.remoteManifestUrl = customManifest.remoteManifestUrl;
            ProjectData.remoteVersionUrl = customManifest.remoteVersionUrl;
            jsb.fileUtils.writeStringToFile(JSON.stringify(ProjectData), path);
        }
    },

    createUpdate() {
        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
            return versionA === versionB ? 0 : -1;
        };

        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
        // if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        //     this._am.retain();
        // }
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            //console.log("验证通过 : " + relativePath + ' (' + expectedMD5 + ')');
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                // info.string = "验证通过 : " + relativePath;
                return true;
            }
            else {
                // info.string = "验证通过 : " + relativePath + ' (' + expectedMD5 + ')';
                return true;
            }
        });

        console.log('热更新已就绪,请检查或直接更新.');

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(10);
        }
        // 检测更新
        this.checkUpdate();
    },
    //预加载通用模块
    preloadedPrefab: function () {
        this.setState("正在加载游戏配置", true);
        this.lab_percent.node.active = false;
        return glGame.panel.preloadPublicMode();
    },

    enterLoginScene: function () {
        //this.preloadedPrefab().then(() => {
        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
        this.setState("正在进入游戏", true);
        //判定是否属于自动登入
        let blAuto = glGame.logon.autoLogin();
        if (blAuto) {
            return;
        }
        glGame.logon.reqTouLogin();
        //glGame.emitter.emit(MESSAGE.DOWNLOAD.END);
        this.remove();
        //})
    },

    checkUpdate: function () {
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
            let manifest = new jsb.Manifest(this.customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
        }
        this._am.setEventCallback(this.checkCb.bind(this))

        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function () {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this))

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl);
            }

            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    },

    // ----------------> 检测事件回掉函数
    checkCb: function (event) {
        let needUpdate = false;
        let reCheckState = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                let isRemove = null;
                if (this._am.getState() !== jsb.AssetsManager.State.UNINITED) {
                    glGame.panel.showDialog("错误", "游戏更新失败, 点击确定重启...", () => {
                        isRemove = jsb.fileUtils.removeDirectory(this._storagePath);
                        reStartGame();
                    }, () => {
                        isRemove = jsb.fileUtils.removeDirectory(this._storagePath);
                        cc.game.end();
                    });
                    return;
                }
                let manifest = new jsb.Manifest(this.customManifestStr, this._storagePath);
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
                this.lab_percent.node.active = true
                this.lab_percent.string = '0%';
                this.setState("", false);
                this.fileLabel.string = `正在更新中.......`;
                // this.byteProgress.progress = 0;
                this.fileProgress.node.active = true;
                break;
            default:
                return;
        }

        // cc.eventManager.removeListener(this._checkListener);
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        if (reCheckState) this.checkUpdate();
        else if (needUpdate) this.hotUpdate();
    },
    //浮点型运算取俩位
    getFloat: function (value) {
        value = Math.ceil(value / 10 / 1024);
        return (Number(value).div(100)).toString();
    },

    // ----------------> 热更新事件回掉函数
    updateCb: function (event) {
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
                    this.fileLabel.string = ``;
                    this.setState("正在为您校验热更文件", true);
                    //this.fileLabel.node.x = -this.fileLabel.node.width / 2;
                    // console.log('打出来提示字的位置',this.fileLabel.node.x)
                    this.lab_percent.node.active = false;
                    return;
                }
                this.setState("", false);
                let progress = event.getDownloadedBytes() >= event.getTotalBytes() ? event.getTotalBytes() : event.getDownloadedBytes();
                let upsize = event.getDownloadedBytes() ? `${this.getFloat(progress)}Mb/${this.getFloat(event.getTotalBytes())}Mb` : ""
                this.fileLabel.string = `正在更新中......${upsize}`;
                this.fileProgress.node.active = true;
                this.fileProgress.progress = Math.max(this.fileProgress.progress, event.getPercent() || 0);
                this.lab_percent.node.active = true;
                this.lab_percent.string = `${parseInt(event.getPercent() * 100) || 0}%`
                // var msg = event.getMessage();
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
                    glGame.panel.showDialog("错误", "游戏更新失败, 点击确定重试...", () => {
                        if (!this._updating && this._canRetry) {
                            this._canRetry = false;
                            this._am.downloadFailedAssets();
                        }
                    }, () => {
                        cc.game.end();
                    });
                    this._updating = false;
                    this._canRetry = true;
                }
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                let errorfile = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "master_temp/" + event.getAssetId() + ".tmp";
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
            this._am.setEventCallback(null)
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            // cc.eventManager.removeListener(this._updateListener);
            this._am.setEventCallback(null);
            this._updateListener = null;
            // 本次设计搜索路径为单一的不并存

            //处理热更缓存记录
            if (this.version) {
                let data = glGame.storage.getItem('update_data');
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
                console.log(`找到热更新路径: ${hotUpdateSearchPaths}`)
            } else {
                let searchPaths = jsb.fileUtils.getSearchPaths();
                searchPaths.unshift(jsb.fileUtils.getWritablePath() + 'master/');
                jsb.fileUtils.setSearchPaths(searchPaths)
                localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            }
            reStartGame();
        }
    },
    /**
     * 文字波动
     */
    actState: function () {
        var dot = 0;
        var dot_max = 5;
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.3),
            cc.callFunc(() => {
                if (!this.lab_center.node.active) return;
                dot >= dot_max ? dot = 0 : dot++;
                let str_dot = "";
                for (let i = 0; i < dot; i++)str_dot = str_dot + ".";
                this.lab_center.string = this.lab_tip + str_dot;
            }))))
    },

    /**
     * 设置当前流程状态
     * @param {*} string 
     * @param {*} bol 
     */
    setState: function (string, bol) {
        this.lab_center.node.active = bol;
        this.lab_center.string = string;
        this.lab_tip = string;
    },

    fetchJSON() {
        glGame.fileutil.fetchJSON("TipsList").then(data => {
            this.TipsList = data.json;
            this.playTips();
        })
    },

    playTips() {
        this.node.runAction(cc.repeatForever(cc.sequence(
            cc.callFunc(() => {
                let index = Math.floor(Math.random() * 100) % this.TipsList.length;
                this.lab_tipcenter.string = this.TipsList[index];
            }),
            cc.delayTime(this.tipdelay)
        )))
    },

    onDestroy() {
        this.unRegisterEvent();
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    },

});

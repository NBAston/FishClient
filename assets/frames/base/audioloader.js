let
    AudioLoader = function () {
        this.resetData();
    },
    audioloader = AudioLoader.prototype,
    g_instance = null;

/**
 * 初始化音量参数
 */
audioloader.resetData = function () {
    this.caches = {};
    this.loadings = {};
    this.progress = {};
    this.callbacks = {};
};

audioloader.clearCallback = function() {
    this.callbacks = {};
}

// 是否加载完成
audioloader.isLoaded = function(url) {
    if(this.caches[url]) {
        return true;
    }

    if(cc.sys.isNative) {
        const rootPath = jsb.fileUtils.getWritablePath();
        let filePath = rootPath + "bgmusic/" + md5(url) + ".mp3";
        if(jsb.fileUtils.isFileExist(filePath)) {
            return true;
        }
    }

    return false;
}

// 是否正在加载
audioloader.isLoading = function(url) {
    return this.loadings[url];
}

// 获取下载进度
audioloader.getPercent = function(url) {
    let percent = this.progress[url];
    if(percent) {
        return Math.ceil(percent);
    }

    return 0;
}

// 加载音频
audioloader.loadAudio = function(url, callback) {
    let audioClip = this.caches[url];
    if(audioClip) {
        return new Promise(function(resolve, reject) {
            resolve(audioClip);
        });
    }

    if(callback == null) callback = ()=> {};
    this.callbacks[url] = callback;

    if(this.loadings[url]) {
        return;
    }

    this.loadings[url] = true;
    this.progress[url] = 0;
    
    if(cc.sys.isNative) {
        return this.loadNative(url);
    } else {
        return this.loadWeb(url);
    }
}

// web平台加载
audioloader.loadWeb = function(url) {
    let self = this;
    return new Promise(function(resolve, reject) {
        cc.loader.load(url, (err, audioClip)=> {
            if(err) {
                reject(err);
                return;
            }

            self.caches[url] = audioClip;
            self.loadings[url] = false;
            self.progress[url] = 100;

            let callback = self.callbacks[url];
            if(callback) {
                callback(url, 100);
            }

            resolve(audioClip);
        });
    });
}

// 原生平台加载
audioloader.loadNative = function(url) {
    let self = this;

    return new Promise(function(resolve, reject) {
        const rootPath = jsb.fileUtils.getWritablePath();
        const basePath = rootPath + "bgmusic/";
        if (!jsb.fileUtils.isDirectoryExist(basePath)) {
            jsb.fileUtils.createDirectory(basePath);
        }

        const filePath = basePath + md5(url) + ".mp3";

        if(jsb.fileUtils.isFileExist(filePath)) {
            cc.loader.load(filePath, (err, audioClip)=> {
                self.loadings[url] = false;
                self.progress[url] = 100;
                self.caches[url] = audioClip;
                resolve(audioClip);
            });

            return;
        }

        let downloader = new jsb.Downloader();
        downloader.createDownloadFileTask(url, filePath);
        downloader.setOnTaskError((sender, errorCode, errorCodeInternal, errorStr)=> {

        });

        downloader.setOnTaskProgress((sender, bytesReceived, totalBytesReceived, totalBytesExpected)=> {
            let percent = Math.ceil(totalBytesReceived / totalBytesExpected * 100);
            self.progress[url] = percent;
            let callback = self.callbacks[url];
            if(callback) {
                callback(url, percent);
            }
        });

        downloader.setOnFileTaskSuccess((sender)=> {
            cc.loader.load(filePath, (err, audioClip)=> {
                self.caches[url] = audioClip;
                self.loadings[url] = false;
                self.progress[url] = 100;

                let callback = self.callbacks[url];
                if(callback) {
                    callback(url, 100);
                }

                resolve(audioClip);
            });
        });
    });
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new AudioLoader();
    }
    return g_instance;
};

"use strict";
cc._RF.push(module, '75e65sW00tKXKf9zYUI89i3', 'audioloader');
// frames/base/audioloader.js

"use strict";

var AudioLoader = function AudioLoader() {
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

audioloader.clearCallback = function () {
  this.callbacks = {};
}; // 是否加载完成


audioloader.isLoaded = function (url) {
  if (this.caches[url]) {
    return true;
  }

  if (cc.sys.isNative) {
    var rootPath = jsb.fileUtils.getWritablePath();
    var filePath = rootPath + "bgmusic/" + md5(url) + ".mp3";

    if (jsb.fileUtils.isFileExist(filePath)) {
      return true;
    }
  }

  return false;
}; // 是否正在加载


audioloader.isLoading = function (url) {
  return this.loadings[url];
}; // 获取下载进度


audioloader.getPercent = function (url) {
  var percent = this.progress[url];

  if (percent) {
    return Math.ceil(percent);
  }

  return 0;
}; // 加载音频


audioloader.loadAudio = function (url, callback) {
  var audioClip = this.caches[url];

  if (audioClip) {
    return new Promise(function (resolve, reject) {
      resolve(audioClip);
    });
  }

  if (callback == null) callback = function callback() {};
  this.callbacks[url] = callback;

  if (this.loadings[url]) {
    return;
  }

  this.loadings[url] = true;
  this.progress[url] = 0;

  if (cc.sys.isNative) {
    return this.loadNative(url);
  } else {
    return this.loadWeb(url);
  }
}; // web平台加载


audioloader.loadWeb = function (url) {
  var self = this;
  return new Promise(function (resolve, reject) {
    cc.loader.load(url, function (err, audioClip) {
      if (err) {
        reject(err);
        return;
      }

      self.caches[url] = audioClip;
      self.loadings[url] = false;
      self.progress[url] = 100;
      var callback = self.callbacks[url];

      if (callback) {
        callback(url, 100);
      }

      resolve(audioClip);
    });
  });
}; // 原生平台加载


audioloader.loadNative = function (url) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var rootPath = jsb.fileUtils.getWritablePath();
    var basePath = rootPath + "bgmusic/";

    if (!jsb.fileUtils.isDirectoryExist(basePath)) {
      jsb.fileUtils.createDirectory(basePath);
    }

    var filePath = basePath + md5(url) + ".mp3";

    if (jsb.fileUtils.isFileExist(filePath)) {
      cc.loader.load(filePath, function (err, audioClip) {
        self.loadings[url] = false;
        self.progress[url] = 100;
        self.caches[url] = audioClip;
        resolve(audioClip);
      });
      return;
    }

    var downloader = new jsb.Downloader();
    downloader.createDownloadFileTask(url, filePath);
    downloader.setOnTaskError(function (sender, errorCode, errorCodeInternal, errorStr) {});
    downloader.setOnTaskProgress(function (sender, bytesReceived, totalBytesReceived, totalBytesExpected) {
      var percent = Math.ceil(totalBytesReceived / totalBytesExpected * 100);
      self.progress[url] = percent;
      var callback = self.callbacks[url];

      if (callback) {
        callback(url, percent);
      }
    });
    downloader.setOnFileTaskSuccess(function (sender) {
      cc.loader.load(filePath, function (err, audioClip) {
        self.caches[url] = audioClip;
        self.loadings[url] = false;
        self.progress[url] = 100;
        var callback = self.callbacks[url];

        if (callback) {
          callback(url, 100);
        }

        resolve(audioClip);
      });
    });
  });
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new AudioLoader();
  }

  return g_instance;
};

cc._RF.pop();
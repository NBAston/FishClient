"use strict";
cc._RF.push(module, '7f630Nmh49C2ZgqKHn+pLMy', 'loader');
// frames/base/loader.js

"use strict";

/**
 * resources 目录资源加载管理
 */
var Loader = function Loader() {},
    loader = Loader.prototype,
    g_instance = null;
/**
 * 资源释放
 * @param {String} path
 * @param {String} type
 */


loader.releaseRes = function (path, type) {
  cc.loader.releaseRes(path, type);
};
/**
 * 资源释放
 * @param {Object} obj
 */


loader.releaseAsset = function (obj) {
  cc.loader.releaseAsset(obj);
};

loader.remoteLoad = function (url) {
  return new Promise(function (resolve, reject) {
    cc.loader.load(url, function (err, data) {
      if (err) {
        reject("加载远程资源失败");
        return console.error(err);
      }

      resolve(new cc.SpriteFrame(data));
    });
  });
};
/**
 * 单一资源加载
 * @param path
 * @returns {Promise<any>}
 */


loader.loadRes = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes(path, function (err, res) {
      if (err) {
        reject("单一资源加载失败");
        return console.error(err);
      }

      resolve(res);
    });
  });
};
/**
 * 加载 SpriteAtlas 图集
 * @param {String} AtlasPath
 * @returns {Promise}
 */


loader.loadSpriteAtlas = function (AtlasPath) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes(AtlasPath, cc.SpriteAtlas, function (err, atlas) {
      if (err) {
        reject("加载 SpriteAtlas 图集失败");
        return cc.error(err);
      } // resolve(atlas.getSpriteFrame(ImageName));


      resolve(atlas);
    });
  });
};
/**
 * 加载独立的 SpriteFrame
 * @param {String} ImagePath
 * @returns {Promise}
 */


loader.loadSpriteFrame = function (ImagePath) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes(ImagePath, cc.SpriteFrame, function (err, spriteFrame) {
      if (err) {
        reject("加载独立的 SpriteFrame 失败");
        return cc.error(err);
      }

      resolve(spriteFrame);
    });
  });
};
/**
 * 资源批量加载
 * @param {String} loadPath
 * @returns {Promise}
 */


loader.loadResDir = function (loadPath) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadResDir(loadPath, function (err, data) {
      if (err) {
        reject("资源批量加载失败");
        return console.error(err);
      }

      resolve(data);
    });
  });
};
/**
 * 获取图标本地地址
 * @param {String} loadPath
 */


loader.iconFile = function (loadPath) {
  var filepath = "";
  var loadList = loadPath.split('/'),
      pngName = loadList[loadList.length - 1],
      base_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "master/res/raw-assets/icon";

  if (!jsb.fileUtils.isDirectoryExist(base_path)) {
    jsb.fileUtils.createDirectory(base_path);
  }

  filepath = "".concat(base_path, "/").concat(pngName);
  if (jsb.fileUtils.isFileExist(filepath)) return filepath;
  return "";
};
/**
 * 添加远程端的图片地址
 * @param {String} loadPath
 */


loader.iconPush = function (loadPath, arraybuffer) {
  var filepath = "";
  var loadList = loadPath.split('/'),
      pngName = loadList[loadList.length - 1],
      base_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "master/res/raw-assets/icon";

  if (!jsb.fileUtils.isDirectoryExist(base_path)) {
    jsb.fileUtils.createDirectory(base_path);
  }

  filepath = "".concat(base_path, "/").concat(pngName);

  if (typeof arraybuffer !== 'undefined') {
    if (!jsb.fileUtils.isDirectoryExist(base_path)) {
      jsb.fileUtils.createDirectory(base_path);
    }

    if (jsb.fileUtils.writeDataToFile(new Uint8Array(arraybuffer), filepath)) {
      return filepath;
    } else {
      console.error('Remote write file failed.');
    }
  } else {
    console.error('Remote download file failed.');
  }

  return "";
};
/**
 * 下载远程端的文件保存在本地并返回相关地址（已有文件直接返回地址）
 * @param {String} loadPath
 * @returns {Promise}
 */


loader.loadUrlpic = function (loadPath) {
  return new Promise(function (resolve, reject) {
    var filepath = glGame.loader.iconFile(loadPath);
    if (filepath !== "") resolve(filepath);else {
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.responseType = "arraybuffer";

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          var arraybuffer = xhr.response;
          filepath = glGame.loader.iconPush(loadPath, arraybuffer);
          if (filepath !== "") resolve(filepath);else reject();
        }
      };

      xhr.timeout = 20000;
      xhr.open("GET", loadPath, true);

      xhr.onerror = function (error) {
        console.error("icon url error fail!");
        reject();
      };

      xhr.ontimeout = function (self) {
        self.send();
      };

      xhr.send();
    }
  });
};
/**
 * 添加远程端的图片地址
 * @param {String} loadPath
 */


loader.audioPush = function (loadPath, arraybuffer) {
  var filepath = "";
  var loadList = loadPath.split('/'),
      pngName = loadList[loadList.length - 1],
      base_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "master/res/raw-assets/audio";

  if (!jsb.fileUtils.isDirectoryExist(base_path)) {
    jsb.fileUtils.createDirectory(base_path);
  }

  filepath = "".concat(base_path, "/").concat(pngName);

  if (typeof arraybuffer !== 'undefined') {
    if (!jsb.fileUtils.isDirectoryExist(base_path)) {
      jsb.fileUtils.createDirectory(base_path);
    }

    if (jsb.fileUtils.writeDataToFile(new Uint8Array(arraybuffer), filepath)) {
      return filepath;
    } else {
      console.error('Remote write file failed.');
    }
  } else {
    console.error('Remote download file failed.');
  }

  return "";
};
/**
 * 下载远程端的文件保存在本地并返回相关地址（已有文件直接返回地址）
 * @param {String} loadPath
 * @returns {Promise}
 */


loader.loadUrlaudio = function (loadPath) {
  return new Promise(function (resolve, reject) {
    var filepath = glGame.loader.iconFile(loadPath);
    if (filepath !== "") resolve(filepath);else {
      var xhr = cc.loader.downloader();
      xhr.responseType = "arraybuffer";

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          var arraybuffer = xhr.response;
          filepath = glGame.loader.audioPush(loadPath, arraybuffer);
          if (filepath !== "") resolve(filepath);else reject();
        }
      };

      xhr.timeout = 20000;
      xhr.open("GET", loadPath, true);

      xhr.onerror = function (error) {
        console.error("icon url error fail!");
        reject();
      };

      xhr.ontimeout = function (self) {
        self.send();
      };

      xhr.send();
    }
  });
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new Loader();
  }

  return g_instance;
};

cc._RF.pop();
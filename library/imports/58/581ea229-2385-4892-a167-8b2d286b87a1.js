"use strict";
cc._RF.push(module, '581eaIpI4VIkqFniy0oa4eh', 'fileutil');
// frames/base/fileutil.js

"use strict";

var FileUtil = function FileUtil() {},
    fileUtil = FileUtil.prototype,
    g_instance = null;
/**
 * manifest 文件读取
 * @param {String} path: gamesSearchPath--glGame.gamelistcfg.getGameSearchPaths(this.gameID)
 * @returns {Promise}
 */


fileUtil.readManifest = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.load("res/raw-assets/".concat(path, ".manifest"), function (err, data) {
      if (err) {
        console.error("".concat(path, ".manifest \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(err);
      }

      console.log("\u8BFB\u53D6manifest\u6587\u4EF6 ".concat(path, ".manifest"));
      resolve(data);
    });
  });
};
/**
 * JSON 文件读取
 * @param {String} path: config/serverCfg
 * @returns {Promise}
 */


fileUtil.readJSON = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.load("res/raw-assets/".concat(path, ".json"), function (err, data) {
      if (err) {
        console.error("".concat(path, ".json \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(err);
      }

      console.log("\u8BFB\u53D6json\u6587\u4EF6 ".concat(path, ".json: "), data);
      resolve(data);
    });
  });
};

fileUtil.fetchJSON = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes("text/".concat(path, ".json"), function (err, data) {
      if (err) {
        console.error("".concat(path, ".json \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(err);
      }

      console.log("\u8BFB\u53D6json\u6587\u4EF6 ".concat(path, ".json: "), data);
      resolve(data);
    });
  });
};
/**
 * 预制资源文件读取
 * @param {String} path
 * @returns {Promise}
 */


fileUtil.readPrefab = function (path) {
  // 加载单个资源的时候暂时屏蔽掉界面上所有操作
  var scene = cc.director.getScene();

  var showMask = function showMask() {
    var visibleSize = cc.view.getVisibleSize();
    var node = new cc.Node();
    node.name = "loadmask";
    node.setContentSize(visibleSize);
    node.setPosition(new cc.Vec2(visibleSize.width / 2, visibleSize.height / 2));
    node.addComponent(cc.Button);
    scene.addChild(node, 1000);
  };

  if (!scene.getChildByName("loadmask")) showMask();
  return new Promise(function (resolve, reject) {
    // 已加载的预支不在做动态加载，直接又相关接口获取
    var obj = cc.loader.getRes(path);

    if (obj != null) {
      if (scene && scene.getChildByName("loadmask")) scene.getChildByName("loadmask").destroy();
      resolve(obj);
      return;
    }

    console.log("loadRes getRes == :", obj, path);

    var call = function call(err, data) {
      var scene_call = cc.director.getScene();
      if (scene_call && scene_call.getChildByName("loadmask")) scene_call.getChildByName("loadmask").destroy();

      if (err) {
        console.error("".concat(path, ".prefab \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(err);
      }

      resolve(data);
    };

    if (isEnableHotUpdate) glGame.resloader.loadRes(path, cc.Prefab, call);else cc.loader.loadRes(path, cc.Prefab, call);
  });
};
/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */


fileUtil.readAnimation = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes(path, cc.AnimationClip, function (err, data) {
      if (err) {
        console.error("".concat(path, ".anim \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(data);
      }

      resolve(data);
    });
  });
};
/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */


fileUtil.readAudio = function (path) {
  return new Promise(function (resolve, reject) {
    cc.loader.loadRes(path, cc.AudioClip, function (err, data) {
      if (err) {
        console.error("".concat(path, ".mp3 \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
        return reject(data);
      }

      resolve(data);
    });
  });
};
/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */


fileUtil.releasePrefab = function (path) {
  var _this = this;

  if (isEnableHotUpdate) {
    if (this.gctimeout) clearTimeout(this.gctimeout);
    glGame.resloader.releaseRes(path);
    this.gctimeout = setTimeout(function () {
      cc.sys.garbageCollect();
      _this.gctimeout = null;
    }, 1000);
  } // let data = cc.loader.getRes(path);
  // if (data == null) return;
  // cc.loader.setAutoReleaseRecursively(data, true);
  // var deps = cc.loader.getDependsRecursively(data);
  // cc.loader.release(deps);
  // cc.sys.garbageCollect();
  // cc.loader.releaseRes(path, cc.Prefab);
  // console.log("releasePrefab", path);

};
/**
 * 关闭延迟GC
 */


fileUtil.clearGCTimeOut = function () {
  if (this.gctimeout) {
    clearTimeout(this.gctimeout);
    this.gctimeout = null;
  }
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new FileUtil();
    g_instance.gctimeout = null;
  }

  return g_instance;
};

cc._RF.pop();
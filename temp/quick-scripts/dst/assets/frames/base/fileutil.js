
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/fileutil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxmaWxldXRpbC5qcyJdLCJuYW1lcyI6WyJGaWxlVXRpbCIsImZpbGVVdGlsIiwicHJvdG90eXBlIiwiZ19pbnN0YW5jZSIsInJlYWRNYW5pZmVzdCIsInBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNjIiwibG9hZGVyIiwibG9hZCIsImVyciIsImRhdGEiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2ciLCJyZWFkSlNPTiIsImZldGNoSlNPTiIsImxvYWRSZXMiLCJyZWFkUHJlZmFiIiwic2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwic2hvd01hc2siLCJ2aXNpYmxlU2l6ZSIsInZpZXciLCJnZXRWaXNpYmxlU2l6ZSIsIm5vZGUiLCJOb2RlIiwibmFtZSIsInNldENvbnRlbnRTaXplIiwic2V0UG9zaXRpb24iLCJWZWMyIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRDb21wb25lbnQiLCJCdXR0b24iLCJhZGRDaGlsZCIsImdldENoaWxkQnlOYW1lIiwib2JqIiwiZ2V0UmVzIiwiZGVzdHJveSIsImNhbGwiLCJzY2VuZV9jYWxsIiwiaXNFbmFibGVIb3RVcGRhdGUiLCJnbEdhbWUiLCJyZXNsb2FkZXIiLCJQcmVmYWIiLCJyZWFkQW5pbWF0aW9uIiwiQW5pbWF0aW9uQ2xpcCIsInJlYWRBdWRpbyIsIkF1ZGlvQ2xpcCIsInJlbGVhc2VQcmVmYWIiLCJnY3RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJyZWxlYXNlUmVzIiwic2V0VGltZW91dCIsInN5cyIsImdhcmJhZ2VDb2xsZWN0IiwiY2xlYXJHQ1RpbWVPdXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQ0lBLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVksQ0FBRyxDQUQ5QjtBQUFBLElBRUlDLFFBQVEsR0FBR0QsUUFBUSxDQUFDRSxTQUZ4QjtBQUFBLElBR0lDLFVBQVUsR0FBRyxJQUhq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biAoKSB7IH0sXHJcbiAgICBmaWxlVXRpbCA9IEZpbGVVdGlsLnByb3RvdHlwZSxcclxuICAgIGdfaW5zdGFuY2UgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIG1hbmlmZXN0IOaWh+S7tuivu+WPllxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aDogZ2FtZXNTZWFyY2hQYXRoLS1nbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0R2FtZVNlYXJjaFBhdGhzKHRoaXMuZ2FtZUlEKVxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICovXHJcbmZpbGVVdGlsLnJlYWRNYW5pZmVzdCA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKGByZXMvcmF3LWFzc2V0cy8ke3BhdGh9Lm1hbmlmZXN0YCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke3BhdGh9Lm1hbmlmZXN0IOaWh+S7tuivu+WPluWksei0pWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDor7vlj5ZtYW5pZmVzdOaWh+S7tiAke3BhdGh9Lm1hbmlmZXN0YCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICogSlNPTiDmlofku7bor7vlj5ZcclxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGg6IGNvbmZpZy9zZXJ2ZXJDZmdcclxuICogQHJldHVybnMge1Byb21pc2V9XHJcbiAqL1xyXG5maWxlVXRpbC5yZWFkSlNPTiA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKGByZXMvcmF3LWFzc2V0cy8ke3BhdGh9Lmpzb25gLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7cGF0aH0uanNvbiDmlofku7bor7vlj5blpLHotKVgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg6K+75Y+WanNvbuaWh+S7tiAke3BhdGh9Lmpzb246IGAsIGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59O1xyXG5maWxlVXRpbC5mZXRjaEpTT04gPSBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhgdGV4dC8ke3BhdGh9Lmpzb25gLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7cGF0aH0uanNvbiDmlofku7bor7vlj5blpLHotKVgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg6K+75Y+WanNvbuaWh+S7tiAke3BhdGh9Lmpzb246IGAsIGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59O1xyXG4vKipcclxuICog6aKE5Yi26LWE5rqQ5paH5Lu26K+75Y+WXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gKi9cclxuZmlsZVV0aWwucmVhZFByZWZhYiA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAvLyDliqDovb3ljZXkuKrotYTmupDnmoTml7blgJnmmoLml7blsY/olL3mjonnlYzpnaLkuIrmiYDmnInmk43kvZxcclxuICAgIGxldCBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICBsZXQgc2hvd01hc2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHZpc2libGVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBub2RlLm5hbWUgPSBcImxvYWRtYXNrXCI7XHJcbiAgICAgICAgbm9kZS5zZXRDb250ZW50U2l6ZSh2aXNpYmxlU2l6ZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMih2aXNpYmxlU2l6ZS53aWR0aCAvIDIsIHZpc2libGVTaXplLmhlaWdodCAvIDIpKTtcclxuICAgICAgICBub2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIHNjZW5lLmFkZENoaWxkKG5vZGUsIDEwMDApO1xyXG4gICAgfTtcclxuICAgIGlmICghc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkbWFza1wiKSkgc2hvd01hc2soKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8vIOW3suWKoOi9veeahOmihOaUr+S4jeWcqOWBmuWKqOaAgeWKoOi9ve+8jOebtOaOpeWPiOebuOWFs+aOpeWPo+iOt+WPllxyXG4gICAgICAgIGxldCBvYmogPSBjYy5sb2FkZXIuZ2V0UmVzKHBhdGgpO1xyXG4gICAgICAgIGlmIChvYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoc2NlbmUgJiYgc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkbWFza1wiKSkgc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkbWFza1wiKS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUob2JqKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRSZXMgZ2V0UmVzID09IDpcIiwgb2JqLCBwYXRoKTtcclxuICAgICAgICBsZXQgY2FsbCA9IGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNjZW5lX2NhbGwgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2NlbmVfY2FsbCAmJiBzY2VuZV9jYWxsLmdldENoaWxkQnlOYW1lKFwibG9hZG1hc2tcIikpIHNjZW5lX2NhbGwuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkbWFza1wiKS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7cGF0aH0ucHJlZmFiIOaWh+S7tuivu+WPluWksei0pWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0VuYWJsZUhvdFVwZGF0ZSkgZ2xHYW1lLnJlc2xvYWRlci5sb2FkUmVzKHBhdGgsIGNjLlByZWZhYiwgY2FsbCk7XHJcbiAgICAgICAgZWxzZSBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBjYy5QcmVmYWIsIGNhbGwpXHJcbiAgICB9KVxyXG59O1xyXG4vKipcclxuICog5Yqo55S76LWE5rqQ5paH5Lu26K+75Y+WXHJcbiAqIEBwYXJhbSBwYXRoXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gKi9cclxuZmlsZVV0aWwucmVhZEFuaW1hdGlvbiA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGgsIGNjLkFuaW1hdGlvbkNsaXAsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtwYXRofS5hbmltIOaWh+S7tuivu+WPluWksei0pWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiDliqjnlLvotYTmupDmlofku7bor7vlj5ZcclxuICogQHBhcmFtIHBhdGhcclxuICogQHJldHVybnMge1Byb21pc2V9XHJcbiAqL1xyXG5maWxlVXRpbC5yZWFkQXVkaW8gPSBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBjYy5BdWRpb0NsaXAsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtwYXRofS5tcDMg5paH5Lu26K+75Y+W5aSx6LSlYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICog5Yqo55S76LWE5rqQ5paH5Lu26K+75Y+WXHJcbiAqIEBwYXJhbSBwYXRoXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gKi9cclxuZmlsZVV0aWwucmVsZWFzZVByZWZhYiA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcblxyXG4gICAgaWYgKGlzRW5hYmxlSG90VXBkYXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2N0aW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5nY3RpbWVvdXQpO1xyXG4gICAgICAgIGdsR2FtZS5yZXNsb2FkZXIucmVsZWFzZVJlcyhwYXRoKTtcclxuICAgICAgICB0aGlzLmdjdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5zeXMuZ2FyYmFnZUNvbGxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5nY3RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCBkYXRhID0gY2MubG9hZGVyLmdldFJlcyhwYXRoKTtcclxuICAgIC8vIGlmIChkYXRhID09IG51bGwpIHJldHVybjtcclxuICAgIC8vIGNjLmxvYWRlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KGRhdGEsIHRydWUpO1xyXG4gICAgLy8gdmFyIGRlcHMgPSBjYy5sb2FkZXIuZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5KGRhdGEpO1xyXG4gICAgLy8gY2MubG9hZGVyLnJlbGVhc2UoZGVwcyk7XHJcbiAgICAvLyBjYy5zeXMuZ2FyYmFnZUNvbGxlY3QoKTtcclxuICAgIC8vIGNjLmxvYWRlci5yZWxlYXNlUmVzKHBhdGgsIGNjLlByZWZhYik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInJlbGVhc2VQcmVmYWJcIiwgcGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICog5YWz6Zet5bu26L+fR0NcclxuICovXHJcbmZpbGVVdGlsLmNsZWFyR0NUaW1lT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIGlmICh0aGlzLmdjdGltZW91dCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdjdGltZW91dCk7XHJcbiAgICAgICAgdGhpcy5nY3RpbWVvdXQgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghZ19pbnN0YW5jZSkge1xyXG4gICAgICAgIGdfaW5zdGFuY2UgPSBuZXcgRmlsZVV0aWwoKTtcclxuICAgICAgICBnX2luc3RhbmNlLmdjdGltZW91dCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ19pbnN0YW5jZTtcclxufTsiXX0=
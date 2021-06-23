"use strict";
cc._RF.push(module, 'acf5723e59EWYPS4VBYbQsl', 'resloader');
// frames/base/resloader.js

"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g_instance = null;
var ccloader = cc.loader; // 兼容性处理

var isChildClassOf = cc.js["isChildClassOf"];

if (!isChildClassOf) {
  isChildClassOf = cc["isChildClassOf"];
}

function parseDepends(key, parsed) {
  var loader = cc.loader;
  var item = loader.getItem(key);

  if (item) {
    var depends = item.dependKeys;

    if (depends) {
      for (var i = 0; i < depends.length; i++) {
        var depend = depends[i];

        if (!parsed.has(depend)) {
          parsed.add(depend);
          parseDepends(depend, parsed);
        }
      }
    }
  }
}

function getNodesDepends(nodes) {
  var ret = new Set();

  for (var i = 0; i < nodes.length; i++) {
    visitNode(nodes[i], ret);
  }

  return ret;
}

function visitNode(node, excludeMap) {
  for (var i = 0; i < node._components.length; i++) {
    visitComponent(node._components[i], excludeMap);
  }

  for (var _i = 0; _i < node._children.length; _i++) {
    visitNode(node._children[_i], excludeMap);
  }
}

function visitComponent(comp, excludeMap) {
  var props = Object.getOwnPropertyNames(comp);

  for (var i = 0; i < props.length; i++) {
    var value = comp[props[i]];

    if (_typeof(value) === 'object' && value) {
      if (Array.isArray(value)) {
        for (var j = 0; j < value.length; j++) {
          var val = value[j];

          if (val instanceof cc.RawAsset) {
            visitAsset(val, excludeMap);
          }
        }
      } else if (!value.constructor || value.constructor === Object) {
        var keys = Object.getOwnPropertyNames(value);

        for (var _j = 0; _j < keys.length; _j++) {
          var _val = value[keys[_j]];

          if (_val instanceof cc.RawAsset) {
            visitAsset(_val, excludeMap);
          }
        }
      } else if (value instanceof cc.RawAsset) {
        visitAsset(value, excludeMap);
      }
    }
  }
}

function visitAsset(asset, excludeMap) {
  if (!asset._uuid) {
    return;
  }

  var loader = cc.loader;

  var key = loader._getReferenceKey(asset);

  if (!excludeMap.has(key)) {
    excludeMap.add(key);
    parseDepends(key, excludeMap);
  }
}

var CacheInfo = function CacheInfo() {
  _classCallCheck(this, CacheInfo);

  this.refs = new Set();
  this.uses = new Set();
};

var resloader = /*#__PURE__*/function () {
  function resloader() {
    var _this = this;

    _classCallCheck(this, resloader);

    this._resMap = new Map();
    this._sceneDepends = null;
    this._lastScene = null;
    if (!cc.sys.isNative) return;
    var scene = cc.director.getScene();

    if (scene) {
      this._cacheScene(scene);
    }

    cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, function (scene) {
      _this._cacheScene(scene);
    });
  } // 预加载资源


  _createClass(resloader, [{
    key: "loadRes",
    value: function loadRes() {
      var _this2 = this;

      var resArgs = this._makeLoadResArgs.apply(this, arguments);

      var finishCallback = function finishCallback(error, resource) {
        if (!error) {
          console.log("打开前：" + _this2._resMap.size);

          _this2._finishItem(resArgs.url, resArgs.type, resArgs.use);

          console.log("打开后：" + _this2._resMap.size);
        }

        if (resArgs.onCompleted) {
          resArgs.onCompleted(error, resource);
        }
      }; // 预判是否资源已加载


      var res = cc.loader.getRes(resArgs.url, resArgs.type);

      if (res) {
        finishCallback(null, res);
      } else {
        var _ccloader = cc.loader;

        var uuid = _ccloader._getResUuid(resArgs.url, resArgs.type, false);

        if (uuid) {
          cc.loader.loadRes(resArgs.url, resArgs.type, resArgs.onProgess, finishCallback);
        } else {
          cc.loader.load(resArgs.url, resArgs.onProgess, finishCallback);
        }
      }
    }
  }, {
    key: "releaseRes",
    value: function releaseRes() {
      console.log("释放前：" + this._resMap.size, cc.loader.getResCount());

      var resArgs = this._makeReleaseResArgs.apply(this, arguments);

      var item = this._getResItem(resArgs.url, resArgs.type);

      if (!item) {
        console.warn("releaseRes item is null ".concat(resArgs.url, " ").concat(resArgs.type));
        return;
      }

      var cacheInfo = this._getCacheInfo(item.id);

      if (resArgs.use) {
        cacheInfo.uses["delete"](resArgs.use);
      }

      if (cacheInfo.uses.size == 0) {
        this._release(item, item.id);
      }

      console.log("释放后：" + this._resMap.size, cc.loader.getResCount());
    } // 释放一个资源

  }, {
    key: "_release",
    value: function _release(item, itemUrl) {
      var cacheInfo = this._getCacheInfo(item.id);

      if (!item || !cacheInfo.refs.has(itemUrl)) {
        return;
      } // 解除自身对自己的引用


      cacheInfo.refs["delete"](itemUrl);
      var ccloader = cc.loader;

      if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
        if (item.dependKeys && Array.isArray(item.dependKeys)) {
          var _iterator = _createForOfIteratorHelper(item.dependKeys),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var depKey = _step.value;
              var depItem = ccloader._cache[depKey];

              if (depItem) {
                this._release(depItem, item.id);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } //如果没有uuid,就直接释放url


        if (item.uuid) {
          cc.loader.release(item.uuid);
          console.log("resloader release item by uuid :" + item.id);
        } else {
          cc.loader.release(item.id);
          console.log("resloader release item by url:" + item.id);
        }

        this._resMap["delete"](item.id);
      }
    }
  }, {
    key: "_getResItem",
    value: function _getResItem(url, type) {
      var item = cc.loader._cache[url];

      if (!item) {
        var uuid = cc.loader._getResUuid(url, type, false);

        if (uuid) {
          var ref = cc.loader._getReferenceKey(uuid);

          item = cc.loader._cache[ref];
        }
      }

      return item;
    }
  }, {
    key: "_getCacheInfo",
    value: function _getCacheInfo(key) {
      if (!this._resMap.has(key)) {
        this._resMap.set(key, new CacheInfo());
      }

      return this._resMap.get(key);
    }
  }, {
    key: "_buildDepend",
    value: function _buildDepend(item, refKey) {
      if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
        var _iterator2 = _createForOfIteratorHelper(item.dependKeys),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var depKey = _step2.value;

            var cacheInfo = this._getCacheInfo(depKey);

            if (!cacheInfo.refs.has(refKey)) {
              cacheInfo.refs.add(refKey);
              var depItem = cc.loader._cache[depKey];

              if (depItem) {
                this._buildDepend(depItem, depItem.id);
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "_cacheItem",
    value: function _cacheItem(item, use) {
      if (item && item.id) {
        var cacheInfo = this._getCacheInfo(item.id);

        if (use) {
          cacheInfo.uses.add(use);
        }

        if (!cacheInfo.refs.has(item.id)) {
          cacheInfo.refs.add(item.id);

          this._buildDepend(item, item.id);
        }

        return true;
      }

      return false;
    }
  }, {
    key: "_finishItem",
    value: function _finishItem(url, assetType, use) {
      var item = this._getResItem(url, assetType);

      if (!this._cacheItem(item, use)) {
        cc.warn("addDependKey item error! for ".concat(url));
      }
    } // 生成加载参数

  }, {
    key: "_makeLoadResArgs",
    value: function _makeLoadResArgs() {
      if (arguments.length < 1) {
        console.error("_makeLoadResArgs error ".concat(arguments));
        return null;
      }

      if (arguments.length == 1 && _typeof(arguments[0]) == "object") {
        return arguments[0];
      }

      var ret = {};

      if (typeof arguments[0] == "string") {
        ret.url = arguments[0];
      } else if (arguments[0] instanceof Array) {
        ret.urls = arguments[0];
      } else {
        console.error("_makeLoadResArgs error ".concat(arguments));
        return null;
      }

      for (var i = 1; i < arguments.length; ++i) {
        if (i == 1 && isChildClassOf(arguments[i], cc.RawAsset)) {
          // 判断是不是第一个参数type
          ret.type = arguments[i];
        } else if (i == arguments.length - 1 && typeof arguments[i] == "string") {
          // 判断是不是最后一个参数use
          ret.use = arguments[i];
        } else if (typeof arguments[i] == "function") {
          // 其他情况为函数
          if (arguments.length > i + 1 && typeof arguments[i + 1] == "function") {
            ret.onProgess = arguments[i];
          } else {
            ret.onCompleted = arguments[i];
          }
        }
      }

      return ret;
    }
  }, {
    key: "_releaseSceneDepend",
    value: function _releaseSceneDepend() {
      if (this._sceneDepends) {
        var persistDepends = getNodesDepends(this._getPersistNodeList());

        for (var i = 0; i < this._sceneDepends.length; ++i) {
          // 判断是不是已经被场景切换自动释放的资源，是则直接移除缓存Item（失效项）
          var item = this._getResItem(this._sceneDepends[i], undefined);

          if (!item) {
            this._resMap["delete"](this._sceneDepends[i]);

            console.log("delete untrack res ".concat(this._sceneDepends[i]));
          } // 判断是不是持久节点依赖的资源
          else if (!persistDepends.has(this._sceneDepends[i])) {//this.releaseRes(this._sceneDepends[i], this._sceneUseKey);
            }
        }

        this._sceneDepends = null;
      }
    } // 生成释放参数

  }, {
    key: "_makeReleaseResArgs",
    value: function _makeReleaseResArgs() {
      if (arguments.length < 1) {
        console.error("_makeReleaseResArgs error ".concat(arguments));
        return null;
      }

      var ret = {};

      if (typeof arguments[0] == "string") {
        ret.url = arguments[0];
      } else if (arguments[0] instanceof Array) {
        ret.urls = arguments[0];
      } else {
        console.error("_makeReleaseResArgs error ".concat(arguments));
        return null;
      }

      for (var i = 1; i < arguments.length; ++i) {
        if (typeof arguments[i] == "string") {
          ret.use = arguments[i];
        } else {
          ret.type = arguments[i];
        }
      }

      return ret;
    }
  }, {
    key: "_cacheSceneDepend",
    value: function _cacheSceneDepend(depends, useKey) {
      for (var i = 0; i < depends.length; ++i) {
        var item = ccloader._cache[depends[i]];

        this._cacheItem(item, useKey);
      }

      return depends;
    }
  }, {
    key: "_cacheScene",
    value: function _cacheScene(scene) {
      if (scene.name == this._lastScene) {
        return;
      }

      var refKey = ccloader._getReferenceKey(scene.uuid);

      var item = ccloader._cache[refKey];
      var newUseKey = scene.uuid;
      var depends = null;

      if (item) {
        depends = this._cacheSceneDepend(item.dependKeys, newUseKey);
      } else if (scene["dependAssets"]) {
        depends = this._cacheSceneDepend(scene["dependAssets"], newUseKey);
      } else {
        console.error("cache scene faile ".concat(scene));
        return;
      }

      if (cc.sys.isNative) this._releaseSceneDepend();
      this._lastScene = scene.name;
      this._sceneUseKey = newUseKey;
      this._sceneDepends = depends;
    }
  }, {
    key: "_getPersistNodeList",
    value: function _getPersistNodeList() {
      var game = cc.game;
      var persistNodeList = Object.keys(game._persistRootNodes).map(function (x) {
        return game._persistRootNodes[x];
      });
      return persistNodeList;
    }
  }]);

  return resloader;
}();

;

module.exports = function () {
  if (!g_instance) {
    g_instance = new resloader();
  }

  return g_instance;
};

cc._RF.pop();
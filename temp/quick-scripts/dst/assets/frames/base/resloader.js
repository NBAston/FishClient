
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/resloader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxyZXNsb2FkZXIuanMiXSwibmFtZXMiOlsiZ19pbnN0YW5jZSIsImNjbG9hZGVyIiwiY2MiLCJsb2FkZXIiLCJpc0NoaWxkQ2xhc3NPZiIsImpzIiwicGFyc2VEZXBlbmRzIiwia2V5IiwicGFyc2VkIiwiaXRlbSIsImdldEl0ZW0iLCJkZXBlbmRzIiwiZGVwZW5kS2V5cyIsImkiLCJsZW5ndGgiLCJkZXBlbmQiLCJoYXMiLCJhZGQiLCJnZXROb2Rlc0RlcGVuZHMiLCJub2RlcyIsInJldCIsIlNldCIsInZpc2l0Tm9kZSIsIm5vZGUiLCJleGNsdWRlTWFwIiwiX2NvbXBvbmVudHMiLCJ2aXNpdENvbXBvbmVudCIsIl9jaGlsZHJlbiIsImNvbXAiLCJwcm9wcyIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImoiLCJ2YWwiLCJSYXdBc3NldCIsInZpc2l0QXNzZXQiLCJjb25zdHJ1Y3RvciIsImtleXMiLCJhc3NldCIsIl91dWlkIiwiX2dldFJlZmVyZW5jZUtleSIsIkNhY2hlSW5mbyIsInJlZnMiLCJ1c2VzIiwicmVzbG9hZGVyIiwiX3Jlc01hcCIsIk1hcCIsIl9zY2VuZURlcGVuZHMiLCJfbGFzdFNjZW5lIiwic3lzIiwiaXNOYXRpdmUiLCJzY2VuZSIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJfY2FjaGVTY2VuZSIsIm9uIiwiRGlyZWN0b3IiLCJFVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNIIiwicmVzQXJncyIsIl9tYWtlTG9hZFJlc0FyZ3MiLCJhcHBseSIsImFyZ3VtZW50cyIsImZpbmlzaENhbGxiYWNrIiwiZXJyb3IiLCJyZXNvdXJjZSIsImNvbnNvbGUiLCJsb2ciLCJzaXplIiwiX2ZpbmlzaEl0ZW0iLCJ1cmwiLCJ0eXBlIiwidXNlIiwib25Db21wbGV0ZWQiLCJyZXMiLCJnZXRSZXMiLCJ1dWlkIiwiX2dldFJlc1V1aWQiLCJsb2FkUmVzIiwib25Qcm9nZXNzIiwibG9hZCIsImdldFJlc0NvdW50IiwiX21ha2VSZWxlYXNlUmVzQXJncyIsIl9nZXRSZXNJdGVtIiwid2FybiIsImNhY2hlSW5mbyIsIl9nZXRDYWNoZUluZm8iLCJpZCIsIl9yZWxlYXNlIiwiaXRlbVVybCIsImRlcEtleSIsImRlcEl0ZW0iLCJfY2FjaGUiLCJyZWxlYXNlIiwicmVmIiwic2V0IiwiZ2V0IiwicmVmS2V5IiwiX2J1aWxkRGVwZW5kIiwiYXNzZXRUeXBlIiwiX2NhY2hlSXRlbSIsInVybHMiLCJwZXJzaXN0RGVwZW5kcyIsIl9nZXRQZXJzaXN0Tm9kZUxpc3QiLCJ1bmRlZmluZWQiLCJ1c2VLZXkiLCJuYW1lIiwibmV3VXNlS2V5IiwiX2NhY2hlU2NlbmVEZXBlbmQiLCJfcmVsZWFzZVNjZW5lRGVwZW5kIiwiX3NjZW5lVXNlS2V5IiwiZ2FtZSIsInBlcnNpc3ROb2RlTGlzdCIsIl9wZXJzaXN0Um9vdE5vZGVzIiwibWFwIiwieCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsTUFBbEIsRUFFQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdGLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLGdCQUFOLENBQXJCOztBQUNBLElBQUksQ0FBQ0QsY0FBTCxFQUFxQjtBQUNqQkEsRUFBQUEsY0FBYyxHQUFHRixFQUFFLENBQUMsZ0JBQUQsQ0FBbkI7QUFDSDs7QUFFRCxTQUFTSSxZQUFULENBQXNCQyxHQUF0QixFQUEyQkMsTUFBM0IsRUFBbUM7QUFDL0IsTUFBSUwsTUFBTSxHQUFHRCxFQUFFLENBQUNDLE1BQWhCO0FBQ0EsTUFBSU0sSUFBSSxHQUFHTixNQUFNLENBQUNPLE9BQVAsQ0FBZUgsR0FBZixDQUFYOztBQUNBLE1BQUlFLElBQUosRUFBVTtBQUNOLFFBQUlFLE9BQU8sR0FBR0YsSUFBSSxDQUFDRyxV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QUwsR0FBcUJ2QyxPQUFyQjtBQUNIOzs7MENBRXFCO0FBQ2xCLFVBQUlzRyxJQUFJLEdBQUcvRyxFQUFFLENBQUMrRyxJQUFkO0FBQ0EsVUFBSUMsZUFBZSxHQUFHcEYsTUFBTSxDQUFDVSxJQUFQLENBQVl5RSxJQUFJLENBQUNFLGlCQUFqQixFQUFvQ0MsR0FBcEMsQ0FBd0MsVUFBVUMsQ0FBVixFQUFhO0FBQ3ZFLGVBQU9KLElBQUksQ0FBQ0UsaUJBQUwsQ0FBdUJFLENBQXZCLENBQVA7QUFDSCxPQUZxQixDQUF0QjtBQUdBLGFBQU9ILGVBQVA7QUFDSDs7Ozs7O0FBQ0o7O0FBRURJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixZQUFZO0FBQ3pCLE1BQUksQ0FBQ3ZILFVBQUwsRUFBaUI7QUFDYkEsSUFBQUEsVUFBVSxHQUFHLElBQUkrQyxTQUFKLEVBQWI7QUFDSDs7QUFDRCxTQUFPL0MsVUFBUDtBQUNILENBTEQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBnX2luc3RhbmNlID0gbnVsbDtcclxubGV0IGNjbG9hZGVyID0gY2MubG9hZGVyO1xyXG5cclxuLy8g5YW85a655oCn5aSE55CGXHJcbmxldCBpc0NoaWxkQ2xhc3NPZiA9IGNjLmpzW1wiaXNDaGlsZENsYXNzT2ZcIl1cclxuaWYgKCFpc0NoaWxkQ2xhc3NPZikge1xyXG4gICAgaXNDaGlsZENsYXNzT2YgPSBjY1tcImlzQ2hpbGRDbGFzc09mXCJdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZURlcGVuZHMoa2V5LCBwYXJzZWQpIHtcclxuICAgIGxldCBsb2FkZXIgPSBjYy5sb2FkZXI7XHJcbiAgICB2YXIgaXRlbSA9IGxvYWRlci5nZXRJdGVtKGtleSk7XHJcbiAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBkZXBlbmRzID0gaXRlbS5kZXBlbmRLZXlzO1xyXG4gICAgICAgIGlmIChkZXBlbmRzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwZW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlcGVuZCA9IGRlcGVuZHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZC5oYXMoZGVwZW5kKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5hZGQoZGVwZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZURlcGVuZHMoZGVwZW5kLCBwYXJzZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROb2Rlc0RlcGVuZHMobm9kZXMpIHtcclxuICAgIGxldCByZXQgPSBuZXcgU2V0KCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmlzaXROb2RlKG5vZGVzW2ldLCByZXQpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB2aXNpdE5vZGUobm9kZSwgZXhjbHVkZU1hcCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLl9jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmlzaXRDb21wb25lbnQobm9kZS5fY29tcG9uZW50c1tpXSwgZXhjbHVkZU1hcCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmlzaXROb2RlKG5vZGUuX2NoaWxkcmVuW2ldLCBleGNsdWRlTWFwKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmlzaXRDb21wb25lbnQoY29tcCwgZXhjbHVkZU1hcCkge1xyXG4gICAgdmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY29tcCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gY29tcFtwcm9wc1tpXV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHZhbHVlW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBjYy5SYXdBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdEFzc2V0KHZhbCwgZXhjbHVkZU1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWx1ZS5jb25zdHJ1Y3RvciB8fCB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2YWx1ZVtrZXlzW2pdXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgY2MuUmF3QXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRBc3NldCh2YWwsIGV4Y2x1ZGVNYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIGNjLlJhd0Fzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpdEFzc2V0KHZhbHVlLCBleGNsdWRlTWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmlzaXRBc3NldChhc3NldCwgZXhjbHVkZU1hcCkge1xyXG4gICAgaWYgKCFhc3NldC5fdXVpZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBsb2FkZXIgPSBjYy5sb2FkZXI7XHJcbiAgICB2YXIga2V5ID0gbG9hZGVyLl9nZXRSZWZlcmVuY2VLZXkoYXNzZXQpO1xyXG4gICAgaWYgKCFleGNsdWRlTWFwLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgZXhjbHVkZU1hcC5hZGQoa2V5KTtcclxuICAgICAgICBwYXJzZURlcGVuZHMoa2V5LCBleGNsdWRlTWFwKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIENhY2hlSW5mbyB7XHJcbiAgICByZWZzID0gbmV3IFNldCgpO1xyXG4gICAgdXNlcyA9IG5ldyBTZXQoKTtcclxufVxyXG5cclxuY2xhc3MgcmVzbG9hZGVyIHtcclxuXHJcbiAgICBfcmVzTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgX3NjZW5lRGVwZW5kcyA9IG51bGw7XHJcbiAgICBfbGFzdFNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKHNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlU2NlbmUoc2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSCwgKHNjZW5lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlU2NlbmUoc2NlbmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmihOWKoOi9vei1hOa6kFxyXG4gICAgbG9hZFJlcygpIHtcclxuICAgICAgICBsZXQgcmVzQXJncyA9IHRoaXMuX21ha2VMb2FkUmVzQXJncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICBsZXQgZmluaXNoQ2FsbGJhY2sgPSAoZXJyb3IsIHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omT5byA5YmN77yaXCIgKyB0aGlzLl9yZXNNYXAuc2l6ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmlzaEl0ZW0ocmVzQXJncy51cmwsIHJlc0FyZ3MudHlwZSwgcmVzQXJncy51c2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPlvIDlkI7vvJpcIiArIHRoaXMuX3Jlc01hcC5zaXplKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXNBcmdzLm9uQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXNBcmdzLm9uQ29tcGxldGVkKGVycm9yLCByZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDpooTliKTmmK/lkKbotYTmupDlt7LliqDovb1cclxuICAgICAgICBsZXQgcmVzID0gY2MubG9hZGVyLmdldFJlcyhyZXNBcmdzLnVybCwgcmVzQXJncy50eXBlKTtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIGZpbmlzaENhbGxiYWNrKG51bGwsIHJlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNjbG9hZGVyID0gY2MubG9hZGVyO1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9IGNjbG9hZGVyLl9nZXRSZXNVdWlkKHJlc0FyZ3MudXJsLCByZXNBcmdzLnR5cGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHV1aWQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHJlc0FyZ3MudXJsLCByZXNBcmdzLnR5cGUsIHJlc0FyZ3Mub25Qcm9nZXNzLCBmaW5pc2hDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChyZXNBcmdzLnVybCwgcmVzQXJncy5vblByb2dlc3MsIGZpbmlzaENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWxlYXNlUmVzKCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIumHiuaUvuWJje+8mlwiICsgdGhpcy5fcmVzTWFwLnNpemUsIGNjLmxvYWRlci5nZXRSZXNDb3VudCgpKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc0FyZ3MgPSB0aGlzLl9tYWtlUmVsZWFzZVJlc0FyZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2dldFJlc0l0ZW0ocmVzQXJncy51cmwsIHJlc0FyZ3MudHlwZSk7XHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgcmVsZWFzZVJlcyBpdGVtIGlzIG51bGwgJHtyZXNBcmdzLnVybH0gJHtyZXNBcmdzLnR5cGV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYWNoZUluZm8gPSB0aGlzLl9nZXRDYWNoZUluZm8oaXRlbS5pZCk7XHJcbiAgICAgICAgaWYgKHJlc0FyZ3MudXNlKSB7XHJcbiAgICAgICAgICAgIGNhY2hlSW5mby51c2VzLmRlbGV0ZShyZXNBcmdzLnVzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWNoZUluZm8udXNlcy5zaXplID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVsZWFzZShpdGVtLCBpdGVtLmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6YeK5pS+5ZCO77yaXCIgKyB0aGlzLl9yZXNNYXAuc2l6ZSwgY2MubG9hZGVyLmdldFJlc0NvdW50KCkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YeK5pS+5LiA5Liq6LWE5rqQXHJcbiAgICBfcmVsZWFzZShpdGVtLCBpdGVtVXJsKSB7XHJcbiAgICAgICAgbGV0IGNhY2hlSW5mbyA9IHRoaXMuX2dldENhY2hlSW5mbyhpdGVtLmlkKTtcclxuICAgICAgICBpZiAoIWl0ZW0gfHwgIWNhY2hlSW5mby5yZWZzLmhhcyhpdGVtVXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDop6PpmaToh6rouqvlr7noh6rlt7HnmoTlvJXnlKhcclxuICAgICAgICBjYWNoZUluZm8ucmVmcy5kZWxldGUoaXRlbVVybCk7XHJcbiAgICAgICAgbGV0IGNjbG9hZGVyID0gY2MubG9hZGVyO1xyXG4gICAgICAgIGlmIChjYWNoZUluZm8udXNlcy5zaXplID09IDAgJiYgY2FjaGVJbmZvLnJlZnMuc2l6ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRlcGVuZEtleXMgJiYgQXJyYXkuaXNBcnJheShpdGVtLmRlcGVuZEtleXMpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkZXBLZXkgb2YgaXRlbS5kZXBlbmRLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcEl0ZW0gPSBjY2xvYWRlci5fY2FjaGVbZGVwS2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbGVhc2UoZGVwSXRlbSwgaXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+WmguaenOayoeaciXV1aWQs5bCx55u05o6l6YeK5pS+dXJsXHJcbiAgICAgICAgICAgIGlmIChpdGVtLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5yZWxlYXNlKGl0ZW0udXVpZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc2xvYWRlciByZWxlYXNlIGl0ZW0gYnkgdXVpZCA6XCIgKyBpdGVtLmlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5yZWxlYXNlKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNsb2FkZXIgcmVsZWFzZSBpdGVtIGJ5IHVybDpcIiArIGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc01hcC5kZWxldGUoaXRlbS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSZXNJdGVtKHVybCwgdHlwZSkge1xyXG4gICAgICAgIGxldCBpdGVtID0gY2MubG9hZGVyLl9jYWNoZVt1cmxdO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9IGNjLmxvYWRlci5fZ2V0UmVzVXVpZCh1cmwsIHR5cGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHV1aWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWYgPSBjYy5sb2FkZXIuX2dldFJlZmVyZW5jZUtleSh1dWlkKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBjYy5sb2FkZXIuX2NhY2hlW3JlZl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDYWNoZUluZm8oa2V5KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yZXNNYXAuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzTWFwLnNldChrZXksIG5ldyBDYWNoZUluZm8oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9idWlsZERlcGVuZChpdGVtLCByZWZLZXkpIHtcclxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmRlcGVuZEtleXMgJiYgQXJyYXkuaXNBcnJheShpdGVtLmRlcGVuZEtleXMpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRlcEtleSBvZiBpdGVtLmRlcGVuZEtleXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYWNoZUluZm8gPSB0aGlzLl9nZXRDYWNoZUluZm8oZGVwS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICghY2FjaGVJbmZvLnJlZnMuaGFzKHJlZktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZUluZm8ucmVmcy5hZGQocmVmS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcEl0ZW0gPSBjYy5sb2FkZXIuX2NhY2hlW2RlcEtleV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGREZXBlbmQoZGVwSXRlbSwgZGVwSXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jYWNoZUl0ZW0oaXRlbSwgdXNlKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICAgICAgICBsZXQgY2FjaGVJbmZvID0gdGhpcy5fZ2V0Q2FjaGVJbmZvKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICBpZiAodXNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZUluZm8udXNlcy5hZGQodXNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjYWNoZUluZm8ucmVmcy5oYXMoaXRlbS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlSW5mby5yZWZzLmFkZChpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkRGVwZW5kKGl0ZW0sIGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfZmluaXNoSXRlbSh1cmwsIGFzc2V0VHlwZSwgdXNlKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9nZXRSZXNJdGVtKHVybCwgYXNzZXRUeXBlKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlSXRlbShpdGVtLCB1c2UpKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oYGFkZERlcGVuZEtleSBpdGVtIGVycm9yISBmb3IgJHt1cmx9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUn+aIkOWKoOi9veWPguaVsFxyXG4gICAgX21ha2VMb2FkUmVzQXJncygpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgX21ha2VMb2FkUmVzQXJncyBlcnJvciAke2FyZ3VtZW50c31gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmICh0eXBlb2YgYXJndW1lbnRzWzBdID09IFwib2JqZWN0XCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmV0ID0ge307XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0LnVybCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldC51cmxzID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYF9tYWtlTG9hZFJlc0FyZ3MgZXJyb3IgJHthcmd1bWVudHN9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMSAmJiBpc0NoaWxkQ2xhc3NPZihhcmd1bWVudHNbaV0sIGNjLlJhd0Fzc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5piv5LiN5piv56ys5LiA5Liq5Y+C5pWwdHlwZVxyXG4gICAgICAgICAgICAgICAgcmV0LnR5cGUgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSBhcmd1bWVudHMubGVuZ3RoIC0gMSAmJiB0eXBlb2YgYXJndW1lbnRzW2ldID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWIpOaWreaYr+S4jeaYr+acgOWQjuS4gOS4quWPguaVsHVzZVxyXG4gICAgICAgICAgICAgICAgcmV0LnVzZSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgLy8g5YW25LuW5oOF5Ya15Li65Ye95pWwXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IGkgKyAxICYmIHR5cGVvZiBhcmd1bWVudHNbaSArIDFdID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5vblByb2dlc3MgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5vbkNvbXBsZXRlZCA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWxlYXNlU2NlbmVEZXBlbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NjZW5lRGVwZW5kcykge1xyXG4gICAgICAgICAgICBsZXQgcGVyc2lzdERlcGVuZHMgPSBnZXROb2Rlc0RlcGVuZHModGhpcy5fZ2V0UGVyc2lzdE5vZGVMaXN0KCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NjZW5lRGVwZW5kcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5piv5LiN5piv5bey57uP6KKr5Zy65pmv5YiH5o2i6Ieq5Yqo6YeK5pS+55qE6LWE5rqQ77yM5piv5YiZ55u05o6l56e76Zmk57yT5a2YSXRlbe+8iOWkseaViOmhue+8iVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9nZXRSZXNJdGVtKHRoaXMuX3NjZW5lRGVwZW5kc1tpXSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc01hcC5kZWxldGUodGhpcy5fc2NlbmVEZXBlbmRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRlIHVudHJhY2sgcmVzICR7dGhpcy5fc2NlbmVEZXBlbmRzW2ldfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5piv5LiN5piv5oyB5LmF6IqC54K55L6d6LWW55qE6LWE5rqQXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghcGVyc2lzdERlcGVuZHMuaGFzKHRoaXMuX3NjZW5lRGVwZW5kc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucmVsZWFzZVJlcyh0aGlzLl9zY2VuZURlcGVuZHNbaV0sIHRoaXMuX3NjZW5lVXNlS2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zY2VuZURlcGVuZHMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/miJDph4rmlL7lj4LmlbBcclxuICAgIF9tYWtlUmVsZWFzZVJlc0FyZ3MoKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYF9tYWtlUmVsZWFzZVJlc0FyZ3MgZXJyb3IgJHthcmd1bWVudHN9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV0ID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXQudXJsID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0LnVybHMgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgX21ha2VSZWxlYXNlUmVzQXJncyBlcnJvciAke2FyZ3VtZW50c31gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1tpXSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXQudXNlID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0LnR5cGUgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBfY2FjaGVTY2VuZURlcGVuZChkZXBlbmRzLCB1c2VLZXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcGVuZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjY2xvYWRlci5fY2FjaGVbZGVwZW5kc1tpXV07XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlSXRlbShpdGVtLCB1c2VLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVwZW5kcztcclxuICAgIH1cclxuXHJcbiAgICBfY2FjaGVTY2VuZShzY2VuZSkge1xyXG4gICAgICAgIGlmIChzY2VuZS5uYW1lID09IHRoaXMuX2xhc3RTY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVmS2V5ID0gY2Nsb2FkZXIuX2dldFJlZmVyZW5jZUtleShzY2VuZS51dWlkKTtcclxuICAgICAgICBsZXQgaXRlbSA9IGNjbG9hZGVyLl9jYWNoZVtyZWZLZXldO1xyXG4gICAgICAgIGxldCBuZXdVc2VLZXkgPSBzY2VuZS51dWlkO1xyXG4gICAgICAgIGxldCBkZXBlbmRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGVwZW5kcyA9IHRoaXMuX2NhY2hlU2NlbmVEZXBlbmQoaXRlbS5kZXBlbmRLZXlzLCBuZXdVc2VLZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2NlbmVbXCJkZXBlbmRBc3NldHNcIl0pIHtcclxuICAgICAgICAgICAgZGVwZW5kcyA9IHRoaXMuX2NhY2hlU2NlbmVEZXBlbmQoc2NlbmVbXCJkZXBlbmRBc3NldHNcIl0sIG5ld1VzZUtleSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgY2FjaGUgc2NlbmUgZmFpbGUgJHtzY2VuZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkgdGhpcy5fcmVsZWFzZVNjZW5lRGVwZW5kKCk7XHJcbiAgICAgICAgdGhpcy5fbGFzdFNjZW5lID0gc2NlbmUubmFtZTtcclxuICAgICAgICB0aGlzLl9zY2VuZVVzZUtleSA9IG5ld1VzZUtleTtcclxuICAgICAgICB0aGlzLl9zY2VuZURlcGVuZHMgPSBkZXBlbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRQZXJzaXN0Tm9kZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IGdhbWUgPSBjYy5nYW1lO1xyXG4gICAgICAgIHZhciBwZXJzaXN0Tm9kZUxpc3QgPSBPYmplY3Qua2V5cyhnYW1lLl9wZXJzaXN0Um9vdE5vZGVzKS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWUuX3BlcnNpc3RSb290Tm9kZXNbeF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBlcnNpc3ROb2RlTGlzdDtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFnX2luc3RhbmNlKSB7XHJcbiAgICAgICAgZ19pbnN0YW5jZSA9IG5ldyByZXNsb2FkZXIoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnX2luc3RhbmNlO1xyXG59OyJdfQ==
let g_instance = null;
let ccloader = cc.loader;

// 兼容性处理
let isChildClassOf = cc.js["isChildClassOf"]
if (!isChildClassOf) {
    isChildClassOf = cc["isChildClassOf"];
}

function parseDepends(key, parsed) {
    let loader = cc.loader;
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
    let ret = new Set();
    for (let i = 0; i < nodes.length; i++) {
        visitNode(nodes[i], ret)
    }
    return ret;
}

function visitNode(node, excludeMap) {
    for (let i = 0; i < node._components.length; i++) {
        visitComponent(node._components[i], excludeMap);
    }
    for (let i = 0; i < node._children.length; i++) {
        visitNode(node._children[i], excludeMap);
    }
}

function visitComponent(comp, excludeMap) {
    var props = Object.getOwnPropertyNames(comp);
    for (var i = 0; i < props.length; i++) {
        var value = comp[props[i]];
        if (typeof value === 'object' && value) {
            if (Array.isArray(value)) {
                for (let j = 0; j < value.length; j++) {
                    let val = value[j];
                    if (val instanceof cc.RawAsset) {
                        visitAsset(val, excludeMap);
                    }
                }
            }
            else if (!value.constructor || value.constructor === Object) {
                let keys = Object.getOwnPropertyNames(value);
                for (let j = 0; j < keys.length; j++) {
                    let val = value[keys[j]];
                    if (val instanceof cc.RawAsset) {
                        visitAsset(val, excludeMap);
                    }
                }
            }
            else if (value instanceof cc.RawAsset) {
                visitAsset(value, excludeMap);
            }
        }
    }
}

function visitAsset(asset, excludeMap) {
    if (!asset._uuid) {
        return;
    }
    let loader = cc.loader;
    var key = loader._getReferenceKey(asset);
    if (!excludeMap.has(key)) {
        excludeMap.add(key);
        parseDepends(key, excludeMap);
    }
}


class CacheInfo {
    refs = new Set();
    uses = new Set();
}

class resloader {

    _resMap = new Map();
    _sceneDepends = null;
    _lastScene = null;

    constructor() {
        if (!cc.sys.isNative) return;
        let scene = cc.director.getScene();
        if (scene) {
            this._cacheScene(scene);
        }

        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, (scene) => {
            this._cacheScene(scene);
        });
    }

    // 预加载资源
    loadRes() {
        let resArgs = this._makeLoadResArgs.apply(this, arguments);

        let finishCallback = (error, resource) => {
            if (!error) {
                console.log("打开前：" + this._resMap.size)
                this._finishItem(resArgs.url, resArgs.type, resArgs.use);
                console.log("打开后：" + this._resMap.size)
            }
            if (resArgs.onCompleted) {
                resArgs.onCompleted(error, resource);
            }
        };

        // 预判是否资源已加载
        let res = cc.loader.getRes(resArgs.url, resArgs.type);
        if (res) {
            finishCallback(null, res);
        } else {
            let ccloader = cc.loader;
            let uuid = ccloader._getResUuid(resArgs.url, resArgs.type, false);
            if (uuid) {
                cc.loader.loadRes(resArgs.url, resArgs.type, resArgs.onProgess, finishCallback);
            } else {
                cc.loader.load(resArgs.url, resArgs.onProgess, finishCallback);
            }
        }
    }

    releaseRes() {

        console.log("释放前：" + this._resMap.size, cc.loader.getResCount());

        let resArgs = this._makeReleaseResArgs.apply(this, arguments);
        let item = this._getResItem(resArgs.url, resArgs.type);
        if (!item) {
            console.warn(`releaseRes item is null ${resArgs.url} ${resArgs.type}`);
            return;
        }

        let cacheInfo = this._getCacheInfo(item.id);
        if (resArgs.use) {
            cacheInfo.uses.delete(resArgs.use)
        }

        if (cacheInfo.uses.size == 0) {
            this._release(item, item.id);
        }

        console.log("释放后：" + this._resMap.size, cc.loader.getResCount())
    }

    // 释放一个资源
    _release(item, itemUrl) {
        let cacheInfo = this._getCacheInfo(item.id);
        if (!item || !cacheInfo.refs.has(itemUrl)) {
            return;
        }

        // 解除自身对自己的引用
        cacheInfo.refs.delete(itemUrl);
        let ccloader = cc.loader;
        if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
            if (item.dependKeys && Array.isArray(item.dependKeys)) {
                for (let depKey of item.dependKeys) {
                    let depItem = ccloader._cache[depKey]
                    if (depItem) {
                        this._release(depItem, item.id);
                    }
                }
            }

            //如果没有uuid,就直接释放url
            if (item.uuid) {
                cc.loader.release(item.uuid);
                console.log("resloader release item by uuid :" + item.id);
            } else {
                cc.loader.release(item.id);
                console.log("resloader release item by url:" + item.id);
            }
            this._resMap.delete(item.id);
        }
    }

    _getResItem(url, type) {
        let item = cc.loader._cache[url];
        if (!item) {
            let uuid = cc.loader._getResUuid(url, type, false);
            if (uuid) {
                let ref = cc.loader._getReferenceKey(uuid);
                item = cc.loader._cache[ref];
            }
        }

        return item;
    }

    _getCacheInfo(key) {
        if (!this._resMap.has(key)) {
            this._resMap.set(key, new CacheInfo());
        }

        return this._resMap.get(key);
    }

    _buildDepend(item, refKey) {
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (let depKey of item.dependKeys) {
                let cacheInfo = this._getCacheInfo(depKey);
                if (!cacheInfo.refs.has(refKey)) {
                    cacheInfo.refs.add(refKey);

                    let depItem = cc.loader._cache[depKey];
                    if (depItem) {
                        this._buildDepend(depItem, depItem.id);
                    }
                }
            }
        }
    }

    _cacheItem(item, use) {
        if (item && item.id) {
            let cacheInfo = this._getCacheInfo(item.id);
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

    _finishItem(url, assetType, use) {
        let item = this._getResItem(url, assetType);
        if (!this._cacheItem(item, use)) {
            cc.warn(`addDependKey item error! for ${url}`);
        }
    }

    // 生成加载参数
    _makeLoadResArgs() {
        if (arguments.length < 1) {
            console.error(`_makeLoadResArgs error ${arguments}`);
            return null;
        }

        if (arguments.length == 1 && (typeof arguments[0] == "object")) {
            return arguments[0];
        }

        let ret = {};

        if (typeof arguments[0] == "string") {
            ret.url = arguments[0];
        } else if (arguments[0] instanceof Array) {
            ret.urls = arguments[0];
        } else {
            console.error(`_makeLoadResArgs error ${arguments}`);
            return null;
        }

        for (let i = 1; i < arguments.length; ++i) {
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

    _releaseSceneDepend() {
        if (this._sceneDepends) {
            let persistDepends = getNodesDepends(this._getPersistNodeList());
            for (let i = 0; i < this._sceneDepends.length; ++i) {
                // 判断是不是已经被场景切换自动释放的资源，是则直接移除缓存Item（失效项）
                let item = this._getResItem(this._sceneDepends[i], undefined);
                if (!item) {
                    this._resMap.delete(this._sceneDepends[i]);
                    console.log(`delete untrack res ${this._sceneDepends[i]}`);
                }
                // 判断是不是持久节点依赖的资源
                else if (!persistDepends.has(this._sceneDepends[i])) {
                    //this.releaseRes(this._sceneDepends[i], this._sceneUseKey);
                }
            }
            this._sceneDepends = null;
        }
    }

    // 生成释放参数
    _makeReleaseResArgs() {
        if (arguments.length < 1) {
            console.error(`_makeReleaseResArgs error ${arguments}`);
            return null;
        }
        let ret = {};
        if (typeof arguments[0] == "string") {
            ret.url = arguments[0];
        } else if (arguments[0] instanceof Array) {
            ret.urls = arguments[0];
        } else {
            console.error(`_makeReleaseResArgs error ${arguments}`);
            return null;
        }

        for (let i = 1; i < arguments.length; ++i) {
            if (typeof arguments[i] == "string") {
                ret.use = arguments[i];
            } else {
                ret.type = arguments[i];
            }
        }
        return ret;
    }

    _cacheSceneDepend(depends, useKey) {
        for (let i = 0; i < depends.length; ++i) {
            let item = ccloader._cache[depends[i]];
            this._cacheItem(item, useKey);
        }
        return depends;
    }

    _cacheScene(scene) {
        if (scene.name == this._lastScene) {
            return;
        }

        let refKey = ccloader._getReferenceKey(scene.uuid);
        let item = ccloader._cache[refKey];
        let newUseKey = scene.uuid;
        let depends = null;

        if (item) {
            depends = this._cacheSceneDepend(item.dependKeys, newUseKey);
        } else if (scene["dependAssets"]) {
            depends = this._cacheSceneDepend(scene["dependAssets"], newUseKey);
        } else {
            console.error(`cache scene faile ${scene}`);
            return;
        }

        if (cc.sys.isNative) this._releaseSceneDepend();
        this._lastScene = scene.name;
        this._sceneUseKey = newUseKey;
        this._sceneDepends = depends;
    }

    _getPersistNodeList() {
        let game = cc.game;
        var persistNodeList = Object.keys(game._persistRootNodes).map(function (x) {
            return game._persistRootNodes[x];
        });
        return persistNodeList;
    }
};

module.exports = function () {
    if (!g_instance) {
        g_instance = new resloader();
    }
    return g_instance;
};
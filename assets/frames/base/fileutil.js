let
    FileUtil = function () { },
    fileUtil = FileUtil.prototype,
    g_instance = null;

/**
 * manifest 文件读取
 * @param {String} path: gamesSearchPath--glGame.gamelistcfg.getGameSearchPaths(this.gameID)
 * @returns {Promise}
 */
fileUtil.readManifest = function (path) {
    return new Promise(function (resolve, reject) {
        cc.loader.load(`res/raw-assets/${path}.manifest`, function (err, data) {
            if (err) {
                console.error(`${path}.manifest 文件读取失败`);
                return reject(err);
            }
            console.log(`读取manifest文件 ${path}.manifest`);
            resolve(data);
        })
    })
};

/**
 * JSON 文件读取
 * @param {String} path: config/serverCfg
 * @returns {Promise}
 */
fileUtil.readJSON = function (path) {
    return new Promise(function (resolve, reject) {
        cc.loader.load(`res/raw-assets/${path}.json`, function (err, data) {
            if (err) {
                console.error(`${path}.json 文件读取失败`);
                return reject(err);
            }
            console.log(`读取json文件 ${path}.json: `, data);
            resolve(data);
        })
    })
};
fileUtil.fetchJSON = function (path) {
    return new Promise(function (resolve, reject) {
        cc.loader.loadRes(`text/${path}.json`, function (err, data) {
            if (err) {
                console.error(`${path}.json 文件读取失败`);
                return reject(err);
            }
            console.log(`读取json文件 ${path}.json: `, data);
            resolve(data);
        })
    })
};
/**
 * 预制资源文件读取
 * @param {String} path
 * @returns {Promise}
 */
fileUtil.readPrefab = function (path) {
    // 加载单个资源的时候暂时屏蔽掉界面上所有操作
    let scene = cc.director.getScene();
    let showMask = () => {
        let visibleSize = cc.view.getVisibleSize();
        let node = new cc.Node();
        node.name = "loadmask";
        node.setContentSize(visibleSize);
        node.setPosition(new cc.Vec2(visibleSize.width / 2, visibleSize.height / 2));
        node.addComponent(cc.Button);
        scene.addChild(node, 1000);
    };
    if (!scene.getChildByName("loadmask")) showMask();

    return new Promise(function (resolve, reject) {
        // 已加载的预支不在做动态加载，直接又相关接口获取
        let obj = cc.loader.getRes(path);
        if (obj != null) {
            if (scene && scene.getChildByName("loadmask")) scene.getChildByName("loadmask").destroy();
            resolve(obj);
            return;
        }
        console.log("loadRes getRes == :", obj, path);
        let call = function (err, data) {
            let scene_call = cc.director.getScene();
            if (scene_call && scene_call.getChildByName("loadmask")) scene_call.getChildByName("loadmask").destroy();
            if (err) {
                console.error(`${path}.prefab 文件读取失败`);
                return reject(err);
            }
            resolve(data);
        }
        if (isEnableHotUpdate) glGame.resloader.loadRes(path, cc.Prefab, call);
        else cc.loader.loadRes(path, cc.Prefab, call)
    })
};
/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */
fileUtil.readAnimation = function (path) {
    return new Promise((resolve, reject) => {
        cc.loader.loadRes(path, cc.AnimationClip, (err, data) => {
            if (err) {
                console.error(`${path}.anim 文件读取失败`);
                return reject(data);
            }
            resolve(data);
        })
    })
};


/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */
fileUtil.readAudio = function (path) {
    return new Promise((resolve, reject) => {
        cc.loader.loadRes(path, cc.AudioClip, (err, data) => {
            if (err) {
                console.error(`${path}.mp3 文件读取失败`);
                return reject(data);
            }
            resolve(data);
        })
    })
};

/**
 * 动画资源文件读取
 * @param path
 * @returns {Promise}
 */
fileUtil.releasePrefab = function (path) {

    if (isEnableHotUpdate) {
        if (this.gctimeout) clearTimeout(this.gctimeout);
        glGame.resloader.releaseRes(path);
        this.gctimeout = setTimeout(() => {
            cc.sys.garbageCollect();
            this.gctimeout = null;
        }, 1000);
    }

    // let data = cc.loader.getRes(path);
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
fileUtil.clearGCTimeOut = function(){
    if (this.gctimeout) {
        clearTimeout(this.gctimeout);
        this.gctimeout = null;
    }
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new FileUtil();
        g_instance.gctimeout = null;
    }
    return g_instance;
};
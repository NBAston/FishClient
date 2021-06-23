let
    panelPaths = require('panelpaths'),
    actionDir = { up: 0, down: 1, left: 2, right: 3, close: 4, none: 5 },
    Panel = function () {
        this.resetData();
        this.juhuaoff = false;
    },
    panel = Panel.prototype,
    g_instance = null;

panel.resetData = function () {
    this.preload_plaza = 0;
    this.curPrefabSearchPaths = null;
    this.compelprefab = null;
    this.curScenePrefabDict = {};
    this.publicPanelDict = {};
    this.plazaPanelDict = {};
    this.iconList = {};
    this.juhuaPanel = null;
    this.rollnoticePanel = null;
    this.gameMaskPanel = null;
    this.newenter = true;// 保存公告是否显示
    //二维码数据
    this.nodeQRCode = null;
    this.urlQRCode = "";
    this.plazaShowPanel = [];
};


/**
 * @param prefab 界面预制
 * @Explain 打开一个界面
 */
panel.showPanel = function (prefab) {
    // 为做动画效果前做遮罩
    let downMask = null;
    if (glGame.animation.checkInterface(prefab)) {
        downMask = cc.instantiate(this.gameMaskPanel);
        downMask.parent = cc.director.getScene();
        downMask.zIndex = 100;
    }
    //避免GC清理冗余资源（仅在真机包生效）
    glGame.fileutil.clearGCTimeOut();
    // 开始将节点挂到scene
    let newPrefab = cc.instantiate(prefab);
    newPrefab.parent = cc.director.getScene();
    let closeNode = null;
    if ("plaza" == cc.director.getScene().name) {
        closeNode = cc.director.getScene().getChildByName("plaza_hall");
        if (this.isHaveEntry()) {
            closeNode.active = false;
        }
    } else newPrefab.zIndex = cc.director.getScene().childrenCount;
    //添加部分界面特效
    glGame.animation.openInterface(newPrefab, downMask);

    return newPrefab;
};

/**
 * @param prefab 界面预制
 * @param {object} moveType 界面出现方向
 * @Explain 打开一个界面，并根据方向播放动画
 */
panel.showPanelAction = function (prefab, moveType) {
    // 为做动画效果前做遮罩
    let downMask = null;
    if (glGame.animation.checkInterface(prefab)) {
        downMask = cc.instantiate(this.gameMaskPanel);
        downMask.parent = cc.director.getScene();
        downMask.zIndex = 100;
    }
    //避免GC清理冗余资源（仅在真机包生效）
    glGame.fileutil.clearGCTimeOut();
    // 开始将节点挂到scene
    let newPrefab = cc.instantiate(prefab);
    newPrefab.parent = cc.director.getScene();
    let closeNode = null;
    if ("plaza" == cc.director.getScene().name) {
        closeNode = cc.director.getScene().getChildByName("plaza_hall");
        if (this.isHaveEntry()) {
            closeNode.active = false;
        }
    } else newPrefab.zIndex = cc.director.getScene().childrenCount;
    //添加部分界面特效
    glGame.animation.moveInterface(newPrefab, downMask, moveType);

    return newPrefab;
};

// 获取入口面板
panel.getEntryPanel = function () {
    let scene = cc.director.getScene();
    for (let i = 0; i < scene.childrenCount; i++) {
        let str = scene.children[i].name.indexOf("entry");
        if (str != -1) {
            return scene.children[i];
        }
    }
};

//是否有入口
panel.isHaveEntry = function () {
    let scene = cc.director.getScene();
    for (let i = 0; i < scene.childrenCount; i++) {
        let str = scene.children[i].name.indexOf("entry");
        if (str != -1) {
            return true;
        }
    }
    return false;
}

// 关闭选场
panel.closeEntry = function () {
    let scene = cc.director.getScene();
    for (let i = 0; i < scene.childrenCount; i++) {
        let str = scene.children[i].name.indexOf("entry");
        if (str != -1) {
            let entryNode = scene.children[i];
            let entryScript = entryNode.getComponent(entryNode.name);
            glGame.readyroom.reqExitArea();
            if (entryScript)
                entryScript.remove();

            return;
            // return scene.children[i];
        }
    }
}

/**
 * @param panelName 界面预制名称
 * @Explain 打开一个界面
 */
panel.showPanelByName = function (panelName) {
    return new Promise((resolve, reject) => {
        if (this.plazaPanelDict.hasOwnProperty(panelName)) {
            glGame.fileutil.readPrefab(this.plazaPanelDict[panelName]).then(prefab => {
                if (panelName == "longhudouentry") {
                    resolve(this.showPanel(prefab, false, actionDir.close));
                } else {
                    resolve(this.showPanel(prefab));
                }
            });
        }
    });
};


/**
 * @param panelName 界面预制名称
 * @Explain 获取一个界面实例化对象（未做节点捆绑）
 */
panel.getPanelByName = function (panelName) {
    return new Promise((resolve, reject) => {
        if (this.plazaPanelDict.hasOwnProperty(panelName)) {
            glGame.fileutil.readPrefab(this.plazaPanelDict[panelName]).then(prefab => {
                resolve(cc.instantiate(prefab));
            });
        }
    });
};

/**
 * @param panelName 界面预制名称
 * @Explain 打开一个界面
 */
panel.showRecordPanelByName = function (panelName) {
    return new Promise((resolve, reject) => {
        if (panelPaths["paths"]["recordprefab"].hasOwnProperty(panelName)) {
            glGame.fileutil.readPrefab(panelPaths["paths"]["recordprefab"][panelName]).then(prefab => {
                resolve(this.showPanel(prefab));
            });
        }
    });
};
/**
 * @param prafab 界面预制
 * @Explain 关闭一个界面
 */
panel.closePanel = function (prafab) {
    let curScene = cc.director.getScene();
    let prefabLayer = curScene.getChildByName(prafab.name);
    if (!prefabLayer) return console.error("无法关闭没有打开的界面");
    if (!cc.isValid(prefabLayer)) prefabLayer.destroy();
};

/**
 * @param prefab 预制对象
 * @param parent 父节点
 * @Explain 创建一个子节点
 */
panel.showChildPanel = function (prefab, parent) {
    let newPrefabLayer = cc.instantiate(prefab);
    newPrefabLayer.parent = parent;
    return newPrefabLayer;
};
/**
 * @param panelName 预制对象名字
 * @param parent 父节点
 * @Explain 创建一个子节点
 * @returns {Promise<any>}
 */
panel.showChildPanelByName = function (panelName, parent) {
    return new Promise((resolve, reject) => {
        if (this.plazaPanelDict.hasOwnProperty(panelName)) {
            glGame.fileutil.readPrefab(this.plazaPanelDict[panelName]).then(prefab => {
                resolve(this.showChildPanel(prefab, parent));
            });
        }
    });
};

//强制预加载的文件
panel.compelPreload = function (name) {
    if (this.compelprefab == null) {
        if (!panelPaths) return console.log(`public还没有配置动态加载资源的文件`);
        if (!panelPaths["paths"]) return false;
        if (!panelPaths["paths"]["compelprefab"]) return false;
        this.compelprefab = panelPaths["paths"]["compelprefab"];
    }
    for (let key in this.compelprefab) {
        if (!this.compelprefab[key]) continue
        if (name == this.compelprefab[key]) return true;
    }
    return false;
}

//判定当前大厅需要预加载的预支是否加载完毕
panel.preloadPlazaState = function () {
    let count = Object.keys(this.plazaPanelDict).length;
    return count > 0;
};

//判定当前大厅需要预加载的预支是否加载完毕
panel.preloadPlazaCount = function () {
    return this.preload_plaza;
};

//合并预加载通用和大厅资源模块
panel.preloadplazaPublicMode = function () {
    if (!panelPaths) return console.log(`public还没有配置动态加载资源的文件`);
    if (!panelPaths["paths"]) return;
    if (!panelPaths["paths"]["plazaprefab"]) return;
    let publicPaths = panelPaths["paths"]["prefab"];
    let plazaPaths = panelPaths["paths"]["plazaprefab"];

    //预加载基数
    var preload_count = this.preload_plaza = Object.keys(plazaPaths).length - 1 + Object.keys(publicPaths).length;;

    let basepaths = plazaPaths['base'];

    //预加载回调
    let ofend = (resolve) => {
        preload_count--;
        glGame.emitter.emit(MESSAGE.UI.PLAZA_LOADING, { count: preload_count });
        if (preload_count <= 0) resolve();
    };
    //Object.keys
    return new Promise((resolve, reject) => {

        glGame.emitter.emit(MESSAGE.UI.PLAZA_LOADING, { count: preload_count });
        //提示内容 弹窗形式
        for (let key in publicPaths) {
            this.publicPanelDict[key] = publicPaths[key];
            if (glGame.isbeforehand || this.compelPreload(key)) {
                glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(() => {
                    ofend(resolve);
                });
            } else ofend(resolve);
        }
        //提示内容 弹窗形式
        for (let key in plazaPaths) {
            if (key === 'base') continue;
            this.plazaPanelDict[key] = basepaths + plazaPaths[key];
            if (glGame.isbeforehand || this.compelPreload(key)) {
                glGame.fileutil.readPrefab(this.plazaPanelDict[key]).then(() => {
                    ofend(resolve);
                });
            } else ofend(resolve);
        }
    });
}


//预加载大厅资源模块
panel.preloadplazaMode = function () {
    if (!panelPaths) return console.log(`public还没有配置动态加载资源的文件`);
    if (!panelPaths["paths"]) return;
    if (!panelPaths["paths"]["plazaprefab"]) return;
    let plazaPaths = panelPaths["paths"]["plazaprefab"];

    //预加载基数
    var preload_count = this.preload_plaza = Object.keys(plazaPaths).length - 1;

    let basepaths = plazaPaths['base'];

    //预加载回调
    let ofend = (resolve) => {
        preload_count--;
        glGame.emitter.emit(MESSAGE.UI.PLAZA_LOADING, { count: preload_count });
        if (preload_count <= 0) resolve();
    };
    //Object.keys
    return new Promise((resolve, reject) => {

        glGame.emitter.emit(MESSAGE.UI.PLAZA_LOADING, { count: preload_count });
        //提示内容 弹窗形式
        for (let key in plazaPaths) {
            if (key === 'base') continue;
            this.plazaPanelDict[key] = basepaths + plazaPaths[key]
            if (glGame.isbeforehand || this.compelPreload(key)) {
                glGame.fileutil.readPrefab(this.plazaPanelDict[key]).then(() => {
                    ofend(resolve);
                });
            } else ofend(resolve);
        }
    });
}

//预加载公共模块
panel.preloadPublicMode = function () {
    if (!panelPaths) return console.log(`public还没有配置动态加载资源的文件`);
    if (!panelPaths["paths"]) return;
    if (!panelPaths["paths"]["prefab"]) return;
    let publicPaths = panelPaths["paths"]["prefab"];

    //预加载基数
    var preload_count = Object.keys(publicPaths).length;

    //预加载回调
    let ofend = (resolve) => {
        preload_count--;
        if (preload_count <= 0) resolve();
    };
    //Object.keys
    return new Promise((resolve, reject) => {
        //提示内容 弹窗形式
        for (let key in publicPaths) {
            this.publicPanelDict[key] = publicPaths[key];

            if (glGame.isbeforehand || this.compelPreload(key)) {
                glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(() => {
                    ofend(resolve);
                });
            } else ofend(resolve);
        }
    });
};

/**
 * 进入前需要预加载的优先模块
 */
panel.preloadLoinMode = function () {
    if (!panelPaths) return console.log(`public 还没有配置动态加载资源的文件`);
    if (!panelPaths["paths"]) return;
    if (!panelPaths["paths"]["loinprefab"]) return;
    let publicPaths = panelPaths["paths"]["loinprefab"];

    //预加载基数
    var preload_count = Object.keys(publicPaths).length;

    //预加载回调
    let ofend = (resolve) => {
        preload_count--;
        if (preload_count <= 0) resolve();
    };
    //Object.keys
    return new Promise((resolve, reject) => {
        //提示内容 弹窗形式
        for (let key in publicPaths) {
            this.publicPanelDict[key] = publicPaths[key];
            if (key == "juhua") {
                glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(prefab => {
                    this.juhuaPanel = prefab;
                    ofend(resolve);
                });
                continue;
            }
            if (key == "rollnotice") {
                glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(prefab => {
                    this.rollnoticePanel = prefab;
                    ofend(resolve);
                });
                continue;
            }
            if (key == "gameMask") {
                glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(prefab => {
                    this.gameMaskPanel = prefab;
                    ofend(resolve);
                });
            }
            glGame.fileutil.readPrefab(this.publicPanelDict[key]).then(() => {
                ofend(resolve);
            });
        }

    });
};

/**
 * @param {string} name 预加载资源名称
 * @Explain 获取public里面的不需要提前预加载资源
 */
panel.getCommonPrefab = function (_name) {
    if (this.publicPanelDict[_name]) return this.publicPanelDict[_name];
    return panelPaths["paths"]["prefab"][_name];
};

/**
 * @param {string} name 预加载资源名称
 * @Explain 获取public里面的需要游戏启动后提前预加载资源
 */
panel.getLoinPrefab = function (_name) {
    if (this.publicPanelDict[_name]) return this.publicPanelDict[_name];
    return panelPaths["paths"]["loinprefab"][_name];
};

/**
 * @param {string} name 预加载资源名称
 * @Explain 获取plaza里面的预加载资源
 */
panel.getPlazaPrefab = function (_name) {
    if (this.plazaPanelDict[_name]) return this.plazaPanelDict[_name];
    return panelPaths["paths"]["plazaprefab"]["base"] + panelPaths["paths"]["plazaprefab"][_name];
};


/**
 * @param {string} name 预加载资源名称
 * @Explain 常驻不清理的预支模块
 */
panel.PrefabRelease = function (_name) {
    let prefab = "";
    switch (_name) {
        case "installTipBox":
        //常用不做清理
        case "juhua":
        case "room_juhua":
        case "rollnotice":
        case "labeltip":
        case "gameMask":
        case "confirmbox":
        //游戏内子界面不做清理
        case "setting":
            return;
    }
    if (this.compelPreload(_name) || !cc.sys.isNative) return;
    if (this.plazaPanelDict[_name]) prefab = this.plazaPanelDict[_name];
    else if (this.publicPanelDict[_name]) prefab = this.publicPanelDict[_name];
    if (prefab != "") glGame.fileutil.releasePrefab(prefab);
}

/**
 * 获取界面时间
 * @param {String} key
 * @returns {Object}
 */
panel.get = function (key) {
    return this[key];
};
panel.set = function (key, value) {
    this[key] = value;
};
module.exports = function () {
    if (!g_instance) {
        g_instance = new Panel();
    }
    return g_instance;
};

let
    GameListCfg = function () {
        this.resetData();
    },
    gameListCfg = GameListCfg.prototype,
    g_instance = null;

gameListCfg.resetData = function () {
    this.gameList = null;
    this.loadedGame = {};
    this.gameupdate = [];
    if (cc.sys.isNative) {

        let base_path = "master/subpackages/";//"master/res/raw-assets/modules/games/";
        let rootPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + base_path;
        this.gamesSearchPaths = {
            2: rootPath + "plaza", 15: rootPath + "zhajinhua", 18: rootPath + "qznn",
            22: rootPath + "brnn", 27: rootPath + "sangong", 28: rootPath + "honghei",
            29: rootPath + "shuiguoji", 30: rootPath + "longhudou", 31: rootPath + "laba",
            32: rootPath + "baijiale", 33: rootPath + "paijiu", 34: rootPath + "luckturntable",
            35: rootPath + "dzpk", 36: rootPath + "ddz",
            37: rootPath + "jszjh", 38: rootPath + "esyd", 39: rootPath + "ebg", 40: rootPath + "fish",
            41: rootPath + "qhbjl", 42: rootPath + "sss", 43: rootPath + 'hcpy', 44: rootPath + 'slwh',
            48: rootPath + 'hbsl'
        }
    }
};
gameListCfg.initGameList = function (next) {
    // glGame.gameNet.send_msg("http.reqGameList", null, (route, data) => {
        this.gameList = glGame.user.get('gameList')//data.result;
        next();
    // })
};

gameListCfg.reqGameGroup = function (next) {
    // glGame.gameNet.send_msg("http.ReqGameGroup", null, (route, data) => {
        this.gameList = glGame.user.get('gameList');
        this.webGameUrl = glGame.user.get('webGameUrl');// data.url;
        this.reqPlayerExtensionPromoUrl()

        // 新分类数据
        this.interFaceMode =  glGame.user.get('interFaceMode');
        this.gameDisplayType = glGame.user.get("gameDisplayType");
        this.gameDisplayToken = glGame.user.get("gameDisplayToken");
        this.gameDisplayTypeList = glGame.user.get("gameDisplayTypeList");

        // cc.log(data);
        next();
    // })
};

// 获取推广链接地址
gameListCfg.reqPlayerExtensionPromoUrl = function (trye, next) {
    glGame.gameNet.send_msg("http.ReqPlayerExtensionPromoUrl", null, (route, data) => {
        console.log("返回的游戏列表数据：", data);
        glGame.user.get("url").promote_url = data.result.promoUrl;
    })
}

// 获取大厅游戏列表
gameListCfg.reqGamesList = function (trye, next) {
    glGame.gameNet.send_msg("http.ReqGames", trye, (route, data) => {
        console.log("返回的游戏列表数据：", data);
        this.gamesList = data;
        this.selfGameList(data);
        next();
    })
}

// 获取自己的游戏列表
gameListCfg.selfGameList = function (gamesList) {
    let gameListArray= Object.values(gamesList)
    .map(item=>{
        if(item.platList){
            return [].concat(...Object.values(item.platList).map(item=> Object.values(item.gameList)))
        }
        return Object.values(item.gameList)
    })
    
    this.gameTypeList = [];
    let usedIdMap={}
    gameListArray.forEach(item=>{
        item.forEach(item=>{
            if (item.id < 10000 && item.id != 45) {
                if(usedIdMap[item.id]){
                    return
                }
                usedIdMap[item.id] = item
                this.gameTypeList.push(item)
            }
        })
    })
    console.log("抽取自己游戏id", this.gameTypeList);
}

//通过对比，拿到有用的游戏数据
gameListCfg.getGameGroup = function () {
    this.GameGroup = [];
    let gametypeList = this.gametypeList[0].gameList;
    for (let j = 0; j < gametypeList.length; j++) {
        for (let i = 0; i < this.gameList.length; i++) {
            if (gametypeList[j] == this.gameList[i].id) {
                this.GameGroup.push(gametypeList[j])
                break;
            }
        }
    }
    return this.GameGroup;
};

// 没有使用
gameListCfg.getGamelistType = function (type) {
    for (let i = 0; i < this.gametypeList.length; i++) {
        if (this.gametypeList[i].id == type) {
            return this.gametypeList[i].game;
        }
    }
};

// 没有使用
gameListCfg.getWebGamelistType = function () {
    for (let i = 0; i < this.gametypeList.length; i++) {
        if (this.gametypeList[i].id == 1) {
            return this.gametypeList[i].external_game;
        }
    }
};

gameListCfg.getWebGameUrl = function () {
    return this.webGameUrl;
};

gameListCfg.setGameUpdate = function (gameName, isUpdate = true) {
    this.gameupdate[gameName] = isUpdate;
};

gameListCfg.getGameUpdate = function (gameName) {
    return this.gameupdate[gameName];
};

gameListCfg.closeGameUpdate = function () {
    this.gameupdate = [];
};

gameListCfg.enterSubGame = function (gameid) {
    if (!cc.sys.isNative) return;
    if (this.loadedGame[gameid]) return;
    //window.require(`${this.gamesSearchPaths[gameid]}`+"/game.js")
    this.loadedGame[gameid] = true;
};


/**
 * 获取已经下载的游戏列表
 */
gameListCfg.checkDownloadGames = function () {
    let keys = Object.keys(this.gamesSearchPaths);
    let count = keys.length;
    let downloadGameIDArr = [];
    for (let i = 0; i < count; i++) {
        let key = keys[i];
        let gamesSearchPath = this.gamesSearchPaths[key];
        if (jsb.fileUtils.isDirectoryExist(gamesSearchPath) && key !== "2")
            downloadGameIDArr.push(key);
    }
    return downloadGameIDArr.sort(function (a, b) {
        return a > b;
    });
};
/**
 * 获取游戏列表, 将已经下载的游戏排列到前面
 */
gameListCfg.getGameList = function () {
    if (!cc.sys.isNative) return this.gameList;
    let downloadGameIDArr = this.checkDownloadGames();
    let count = downloadGameIDArr.length - 1;
    for (let i = count; i >= 0; i--) {
        let gameID = Number(downloadGameIDArr[i]);
        let num = this.gameList.length;
        for (let c = 0; c < num; c++) {
            if (this.gameList[c]["id"] === gameID) {
                this.gameList.unshift(this.gameList.splice(c, 1)[0]);
                break;
            }
        }
    }
    return this.gameList;
};
gameListCfg.getGameSearchPaths = function (gameID) {
    return this.gamesSearchPaths[gameID];
};


gameListCfg.getGameVersion = function (wholeurl) {
    console.log("getGameVersion");
    return new Promise(function (resolve, reject) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                let respone = xhr.responseText;
                let data = JSON.parse(respone);
                console.log("version=", data, data.version);
                resolve(data);
            }
        };
        xhr.timeout = 5000;
        console.log("getGameVersion wholeurl=", wholeurl);
        xhr.open("GET", wholeurl, true);
        xhr.send();
    })
};

// 打开三方游戏
gameListCfg.openTripartiteGame = function (data) {
    // 判断是否是真机打开
    // if (!isEnableHotUpdate) { return; }
    // 判断是否是游客
    if (glGame.user.isTourist()) {
        glGame.panel.showRegisteredGift(true);
        return;
    }

    // 可疑账号判断
    if (glGame.panel.showSuspicious("game")) return;


    if (!glGame.user.checkEnterWebGame()) {
        glGame.panel.showTip(glGame.tips.WEBGAME.ENTER_ERROR.format(`${glGame.user.getEnterWebGameCoin()}`));
        return;
    }

    glGame.logon.ReqGameState(data.gamesList.id, gameid => {
        if (data.nature == 2) {
            gameid = data.gamesList.defaultGameId
        }
        glGame.emitter.emit(MESSAGE.UI.WEBVIEW_ON, { gameid: gameid });

    }, data.type)
}


// 检查游戏是否需要热更
gameListCfg.isNeedUpdate = function (gameId) {
    return new Promise((resolve, reject) => {
        if (!cc.sys.isNative) return resolve(false);
        var gameName = glGame.scene.getSceneNameByID(gameId);
        console.log("gameName=====>", gameName);
        let update_data = glGame.storage.getItem('update_data');
        if (update_data && update_data[gameName]) {
            let hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
            let url = `${hotUpdateURL}${gameName}/${gameName}version.manifest`
            console.log(url);
            glGame.gamelistcfg.getGameVersion(url).then(data => {
                console.log(data.version);
                if (data.version === update_data[gameName]) resolve(false);
                else resolve(true);
            }, () => { resolve(true) });
        } else resolve(true);
    })
};

// 进入游戏
gameListCfg.onEnterGame = function (gameId, isShow) {
    console.log("进入游戏====》onEnterGame")
    
    // 原生平台游戏下载判定
    if (cc.sys.isNative) {
        // 检查当前游戏是否已经在更新队列
        if (glGame.assetsManager.isUpdateQueue(gameId)) return;

        let gameName = glGame.scene.getSceneNameByID(gameId);

        // 如果没有这个游戏的路径则说明游戏未下载
        let update_data = glGame.storage.getItem('update_data');
        if (!update_data || !update_data[gameName]) {
            if (isShow) {
                glGame.panel.showTip(glGame.tips.UPDATE.STARTUPATE.format(`${glGame.room.getGameDictById(gameId)}`));
            }
            glGame.assetsManager.gameUpdata({gameID: gameId, manifestUrl: null});
            return;
        }
        // 游戏已下载需要更新
        if (!glGame.gamelistcfg.getGameUpdate(gameName)) {
            if (isShow) {
                glGame.panel.showTip(glGame.tips.UPDATE.STARTUPATE.format(`${glGame.room.getGameDictById(gameId)}`));
            }
            glGame.assetsManager.gameUpdata({gameID: gameId, manifestUrl: null});
            return;
        }
    }
    // 可疑账号判断
    if (glGame.panel.showSuspicious("game")) return;
    // 记录打开的游戏
    glGame.gamelistcfg.enterSubGame(gameId);
    // 单机游戏进入逻辑
    if (gameId === glGame.scenetag.LABA) {
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        glGame.room.reqMyGameState(gameId).then(() => {
            glGame.logon.ReqGameState(gameId, () => {
                // TODO 修改进入房间的方式
                if (glGame.enterRoomVerification) {
                    glGame.room.reqGoldRoomVerify(glGame.scenetag.LABA, 1);
                } else {
                    glGame.room.setGoldRoomInfo(glGame.scenetag.LABA, 1);
                }
            })
        });
        return;
    }
    // 正常游戏进入
    glGame.logon.ReqGameState(gameId, gameid => {
        glGame.panel.showPanelByName(`${glGame.scene.entryGame[gameId]}entry`).then(panel => {
            cc.game.addPersistRootNode(panel);
            let script = panel.getComponent(`${glGame.scene.entryGame[gameId]}entry`);
            script.setGameId(gameid);
            script.updateBgInfo();
            //播放选场音乐
            if(script.BGM)glGame.audio.playBGM(script.BGM);
        });
    })
}

gameListCfg.get = function (key) {
    return this[key];
};
gameListCfg.setGamesUpdateData = function (gameid, key, value) {
    this.gamesUpdateData[gameid][key] = value;
}
module.exports = function () {
    if (!g_instance) {
        g_instance = new GameListCfg();
    }
    return g_instance;
};

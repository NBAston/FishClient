/**
 * 场景管理器
 */
let Scene = function () {
    this.upScene = "";
    this.nowScene = "";
    this.registerEvent();
},
    scene = Scene.prototype,
    g_instance = null;

scene.registerEvent = function () {
};
scene.unRegisterEvent = function () {
};
scene.setNextSceneTag = function (tag) {
    glGame.storage.setItem(glGame.scenetag.NEXTSCENETAG, { nextSceneTag: tag });
};
scene.getSceneNameByID = function (ID) {
    return this.sceneDict[ID];
};
scene.getSceneIDByName = function (gameName) {
    for (const key in this.sceneDict) {
        if (this.sceneDict[key] == gameName) {
            return key;
        }
    }
    return null;
};
/**
 * 切换到下一个场景
 */
scene.enterNextScene = function () {
    return new Promise((resolve, reject) => {
        this.upScene = cc.director.getScene().name;
        let nextSceneTag = glGame.storage.getItem(glGame.scenetag.NEXTSCENETAG) || glGame.scenetag.PLAZA,
            nextSceneName = this.nowScene = glGame.scene.getSceneNameByID(nextSceneTag.nextSceneTag),
            publicPreload = ((nextSceneName !== "plaza" && nextSceneName !== "login" && !glGame.panel.preloadPlazaState())),
            plazaPreload = (nextSceneName === "plaza" && !glGame.panel.preloadPlazaState());

        if (this.upScene != "" && this.upScene != "login" && nextSceneName == "plaza") glGame.user.curContinue = [];

        if (nextSceneName === "plaza") glGame.panel.changeRollNoticeState(false);

        if (nextSceneName !== "plaza" && (this.upScene == "plaza" || this.upScene == "login")/*|| plazaPreload*/)
            glGame.panel.showLoading()

        if (nextSceneName !== "plaza" && nextSceneName !== "login" && this.upScene === "plaza") glGame.notice.exitPlaza();

        if (this.upScene == "login" && nextSceneName == "plaza") glGame.emitter.emit(MESSAGE.UI.HIDE_CLEANUP);

        if (plazaPreload) {
            //预加载大厅资源
            glGame.panel.preloadplazaPublicMode().then(() => {
                this.switchScene(resolve, nextSceneName);
            })
        } else if (publicPreload) {
            glGame.panel.preloadPublicMode().then(() => {
                this.switchScene(resolve, nextSceneName);
            })
        } else {
            this.switchScene(resolve, nextSceneName);
        }
    })
};


/**
 * 切换游戏
 * @param gameID
 */
scene.switchGame = function (gameID) {
    glGame.room.reqMyRoomState();
};

scene.customLoadScene = function(sceneName, onProgress, onComplete) {
    var info = cc.director._getSceneUuid(sceneName);
    var self = this;
    if (info) {
        cc.loader.load({ uuid: info.uuid, type: 'uuid' }, function(completedCount, totalCount, item){
            onProgress(completedCount, totalCount, item)
        }, function(error, asset){
            if (error) {
                cc.errorID(1210, this.sceneName, error.message);
            } else {
                onComplete(error, asset);
　　　　　　　}
         })
     }
}


scene.switchScene = function (resolve, nextSceneName) {
    //只在游戏内显示debug
    this.customLoadScene(nextSceneName,(completedCount, totalCount, item)=> {
        glGame.emitter.emit(MESSAGE.UI.PLAZA_LOADING, { completedCount, totalCount });
    },
     () => {
        if ("plaza" !== nextSceneName) {
            glGame.update_list = [];
            if (cc.sys.isNative && isIos) cc.game.setFrameRate(30);
        } else {
            if (cc.sys.isNative && isIos) cc.game.setFrameRate(30);
            else if (cc.sys.isNative) cc.game.setFrameRate(30);
        }
        console.log("loadScene", nextSceneName);
        cc.director.loadScene(nextSceneName, () => {
            if (this.upScene != "login" && this.upScene != "plaza" && nextSceneName == "plaza") {
                glGame.user.reqMyInfo();
                glGame.user.ReqRedDot();
                glGame.audio.initPlazaAodio();
            }
            glGame.systemclass.iphonex();
            cc.sys.garbageCollect();
            if (nextSceneName == "plaza" && this.upScene != "login" && !this.checkRoomEnter()) glGame.emitter.emit(MESSAGE.UI.ROOM_ENTER_SHOW);
            else if (nextSceneName != "plaza" && nextSceneName != "login") glGame.emitter.emit(MESSAGE.UI.ROOM_ENTER_HIDE);
            resolve()
            console.log("loadScene win", nextSceneName);
            glGame.emitter.emit(MESSAGE.UI.CHANGE_SCENE_COMPLE, nextSceneName);
            glGame.audio.onChangeScene();
        });
    });
}

scene.getUpScene = function () {
    for (let key in this.sceneDict) {
        if (this.upScene == this.sceneDict[key]) return parseInt(key);
    }
    return 0;
}

scene.getSceneName = function () {
    return this.nowScene;
}

scene.getNowScene = function () {
    for (let key in this.sceneDict) {
        if (this.nowScene == this.sceneDict[key]) return parseInt(key);
    }
    return 0;
}

/**
 * 重新加载场景
 */
scene.enterNowScene = function () {
    cc.director.loadScene(cc.director.getScene().name, () => { }, () => {
        setTimeout(() => {
            glGame.systemclass.iphonex();
        }, 1000)
        glGame.emitter.emit(MESSAGE.UI.SCENE);
    });
};

/**
 * 校验是否有房间入口界面，且处于开启状态
 */
scene.checkRoomEnter = function () {
    let gameNameList = Object.values(this.sceneDict);
    for (let gameName of gameNameList) {
        let nodeEntry = cc.director.getScene().getChildByName(`${gameName}entry`)
        if (nodeEntry && nodeEntry.active) return true;
    }
    return false;
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new Scene();
    }
    return g_instance;
};

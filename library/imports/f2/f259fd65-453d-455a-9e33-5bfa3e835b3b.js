"use strict";
cc._RF.push(module, 'f259f1lRT1FWp4zW/o+g1s7', 'gamelistcfg');
// frames/model/gamelistcfg.js

"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var GameListCfg = function GameListCfg() {
  this.resetData();
},
    gameListCfg = GameListCfg.prototype,
    g_instance = null;

gameListCfg.resetData = function () {
  this.gameList = null;
  this.loadedGame = {};
  this.gameupdate = [];

  if (cc.sys.isNative) {
    var base_path = "master/subpackages/"; //"master/res/raw-assets/modules/games/";

    var rootPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + base_path;
    this.gamesSearchPaths = {
      2: rootPath + "plaza",
      15: rootPath + "zhajinhua",
      18: rootPath + "qznn",
      22: rootPath + "brnn",
      27: rootPath + "sangong",
      28: rootPath + "honghei",
      29: rootPath + "shuiguoji",
      30: rootPath + "longhudou",
      31: rootPath + "laba",
      32: rootPath + "baijiale",
      33: rootPath + "paijiu",
      34: rootPath + "luckturntable",
      35: rootPath + "dzpk",
      36: rootPath + "ddz",
      37: rootPath + "jszjh",
      38: rootPath + "esyd",
      39: rootPath + "ebg",
      40: rootPath + "fish",
      41: rootPath + "qhbjl",
      42: rootPath + "sss",
      43: rootPath + 'hcpy',
      44: rootPath + 'slwh',
      48: rootPath + 'hbsl'
    };
  }
};

gameListCfg.initGameList = function (next) {
  // glGame.gameNet.send_msg("http.reqGameList", null, (route, data) => {
  this.gameList = glGame.user.get('gameList'); //data.result;

  next(); // })
};

gameListCfg.reqGameGroup = function (next) {
  // glGame.gameNet.send_msg("http.ReqGameGroup", null, (route, data) => {
  this.gameList = glGame.user.get('gameList');
  this.webGameUrl = glGame.user.get('webGameUrl'); // data.url;

  this.reqPlayerExtensionPromoUrl(); // ???????????????

  this.interFaceMode = glGame.user.get('interFaceMode');
  this.gameDisplayType = glGame.user.get("gameDisplayType");
  this.gameDisplayToken = glGame.user.get("gameDisplayToken");
  this.gameDisplayTypeList = glGame.user.get("gameDisplayTypeList"); // cc.log(data);

  next(); // })
}; // ????????????????????????


gameListCfg.reqPlayerExtensionPromoUrl = function (trye, next) {
  glGame.gameNet.send_msg("http.ReqPlayerExtensionPromoUrl", null, function (route, data) {
    console.log("??????????????????????????????", data);
    glGame.user.get("url").promote_url = data.result.promoUrl;
  });
}; // ????????????????????????


gameListCfg.reqGamesList = function (trye, next) {
  var _this = this;

  glGame.gameNet.send_msg("http.ReqGames", trye, function (route, data) {
    console.log("??????????????????????????????", data);
    _this.gamesList = data;

    _this.selfGameList(data);

    next();
  });
}; // ???????????????????????????


gameListCfg.selfGameList = function (gamesList) {
  var _this2 = this;

  var gameListArray = Object.values(gamesList).map(function (item) {
    if (item.platList) {
      var _ref;

      return (_ref = []).concat.apply(_ref, _toConsumableArray(Object.values(item.platList).map(function (item) {
        return Object.values(item.gameList);
      })));
    }

    return Object.values(item.gameList);
  });
  this.gameTypeList = [];
  var usedIdMap = {};
  gameListArray.forEach(function (item) {
    item.forEach(function (item) {
      if (item.id < 10000 && item.id != 45) {
        if (usedIdMap[item.id]) {
          return;
        }

        usedIdMap[item.id] = item;

        _this2.gameTypeList.push(item);
      }
    });
  });
  console.log("??????????????????id", this.gameTypeList);
}; //??????????????????????????????????????????


gameListCfg.getGameGroup = function () {
  this.GameGroup = [];
  var gametypeList = this.gametypeList[0].gameList;

  for (var j = 0; j < gametypeList.length; j++) {
    for (var i = 0; i < this.gameList.length; i++) {
      if (gametypeList[j] == this.gameList[i].id) {
        this.GameGroup.push(gametypeList[j]);
        break;
      }
    }
  }

  return this.GameGroup;
}; // ????????????


gameListCfg.getGamelistType = function (type) {
  for (var i = 0; i < this.gametypeList.length; i++) {
    if (this.gametypeList[i].id == type) {
      return this.gametypeList[i].game;
    }
  }
}; // ????????????


gameListCfg.getWebGamelistType = function () {
  for (var i = 0; i < this.gametypeList.length; i++) {
    if (this.gametypeList[i].id == 1) {
      return this.gametypeList[i].external_game;
    }
  }
};

gameListCfg.getWebGameUrl = function () {
  return this.webGameUrl;
};

gameListCfg.setGameUpdate = function (gameName) {
  var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
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
  if (this.loadedGame[gameid]) return; //window.require(`${this.gamesSearchPaths[gameid]}`+"/game.js")

  this.loadedGame[gameid] = true;
};
/**
 * ?????????????????????????????????
 */


gameListCfg.checkDownloadGames = function () {
  var keys = Object.keys(this.gamesSearchPaths);
  var count = keys.length;
  var downloadGameIDArr = [];

  for (var i = 0; i < count; i++) {
    var key = keys[i];
    var gamesSearchPath = this.gamesSearchPaths[key];
    if (jsb.fileUtils.isDirectoryExist(gamesSearchPath) && key !== "2") downloadGameIDArr.push(key);
  }

  return downloadGameIDArr.sort(function (a, b) {
    return a > b;
  });
};
/**
 * ??????????????????, ???????????????????????????????????????
 */


gameListCfg.getGameList = function () {
  if (!cc.sys.isNative) return this.gameList;
  var downloadGameIDArr = this.checkDownloadGames();
  var count = downloadGameIDArr.length - 1;

  for (var i = count; i >= 0; i--) {
    var gameID = Number(downloadGameIDArr[i]);
    var num = this.gameList.length;

    for (var c = 0; c < num; c++) {
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
    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        var respone = xhr.responseText;
        var data = JSON.parse(respone);
        console.log("version=", data, data.version);
        resolve(data);
      }
    };

    xhr.timeout = 5000;
    console.log("getGameVersion wholeurl=", wholeurl);
    xhr.open("GET", wholeurl, true);
    xhr.send();
  });
}; // ??????????????????


gameListCfg.openTripartiteGame = function (data) {
  // ???????????????????????????
  // if (!isEnableHotUpdate) { return; }
  // ?????????????????????
  if (glGame.user.isTourist()) {
    glGame.panel.showRegisteredGift(true);
    return;
  } // ??????????????????


  if (glGame.panel.showSuspicious("game")) return;

  if (!glGame.user.checkEnterWebGame()) {
    glGame.panel.showTip(glGame.tips.WEBGAME.ENTER_ERROR.format("".concat(glGame.user.getEnterWebGameCoin())));
    return;
  }

  glGame.logon.ReqGameState(data.gamesList.id, function (gameid) {
    if (data.nature == 2) {
      gameid = data.gamesList.defaultGameId;
    }

    glGame.emitter.emit(MESSAGE.UI.WEBVIEW_ON, {
      gameid: gameid
    });
  }, data.type);
}; // ??????????????????????????????


gameListCfg.isNeedUpdate = function (gameId) {
  return new Promise(function (resolve, reject) {
    if (!cc.sys.isNative) return resolve(false);
    var gameName = glGame.scene.getSceneNameByID(gameId);
    console.log("gameName=====>", gameName);
    var update_data = glGame.storage.getItem('update_data');

    if (update_data && update_data[gameName]) {
      var hotUpdateURL = glGame.servercfg.getHotupdateVersionUrl();
      var url = "".concat(hotUpdateURL).concat(gameName, "/").concat(gameName, "version.manifest");
      console.log(url);
      glGame.gamelistcfg.getGameVersion(url).then(function (data) {
        console.log(data.version);
        if (data.version === update_data[gameName]) resolve(false);else resolve(true);
      }, function () {
        resolve(true);
      });
    } else resolve(true);
  });
}; // ????????????


gameListCfg.onEnterGame = function (gameId, isShow) {
  console.log("????????????====???onEnterGame"); // ??????????????????????????????

  if (cc.sys.isNative) {
    // ?????????????????????????????????????????????
    if (glGame.assetsManager.isUpdateQueue(gameId)) return;
    var gameName = glGame.scene.getSceneNameByID(gameId); // ?????????????????????????????????????????????????????????

    var update_data = glGame.storage.getItem('update_data');

    if (!update_data || !update_data[gameName]) {
      if (isShow) {
        glGame.panel.showTip(glGame.tips.UPDATE.STARTUPATE.format("".concat(glGame.room.getGameDictById(gameId))));
      }

      glGame.assetsManager.gameUpdata({
        gameID: gameId,
        manifestUrl: null
      });
      return;
    } // ???????????????????????????


    if (!glGame.gamelistcfg.getGameUpdate(gameName)) {
      if (isShow) {
        glGame.panel.showTip(glGame.tips.UPDATE.STARTUPATE.format("".concat(glGame.room.getGameDictById(gameId))));
      }

      glGame.assetsManager.gameUpdata({
        gameID: gameId,
        manifestUrl: null
      });
      return;
    }
  } // ??????????????????


  if (glGame.panel.showSuspicious("game")) return; // ?????????????????????

  glGame.gamelistcfg.enterSubGame(gameId); // ????????????????????????

  if (gameId === glGame.scenetag.LABA) {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.room.reqMyGameState(gameId).then(function () {
      glGame.logon.ReqGameState(gameId, function () {
        // TODO ???????????????????????????
        if (glGame.enterRoomVerification) {
          glGame.room.reqGoldRoomVerify(glGame.scenetag.LABA, 1);
        } else {
          glGame.room.setGoldRoomInfo(glGame.scenetag.LABA, 1);
        }
      });
    });
    return;
  } // ??????????????????


  glGame.logon.ReqGameState(gameId, function (gameid) {
    glGame.panel.showPanelByName("".concat(glGame.scene.entryGame[gameId], "entry")).then(function (panel) {
      cc.game.addPersistRootNode(panel);
      var script = panel.getComponent("".concat(glGame.scene.entryGame[gameId], "entry"));
      script.setGameId(gameid);
      script.updateBgInfo(); //??????????????????

      if (script.BGM) glGame.audio.playBGM(script.BGM);
    });
  });
};

gameListCfg.get = function (key) {
  return this[key];
};

gameListCfg.setGamesUpdateData = function (gameid, key, value) {
  this.gamesUpdateData[gameid][key] = value;
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new GameListCfg();
  }

  return g_instance;
};

cc._RF.pop();
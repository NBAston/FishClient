/**
 * 连接服务器数据模块
 */
let
    Server = function () {
        this.localTag = null;
        this.servercfg = null;
        this.b_enableHotUpdate = cc.sys.isNative && cc.sys.isMobile;
    },
    server = Server.prototype,
    g_instance = null;
server.loadSetting = function () {
    if (glGame.gamecfg.gameProxy == 0) {
        glGame.fileutil.readJSON("config/localsetting").then(data => {
            if (data.logenable) {
                this.loadSettingCB(data);
            } else {
                this.loadServer(data);
            }
        });
    } else this.getProxyUrl();
}

server.ProxySucceed = function (data) {
    ProxyO.stop();
    this.loadServer({ cfgurl: data.url });
}

server.getProxyUrl = function () {
    ProxyO.on('succeed', this.ProxySucceed, this);
    ProxyO.start();
}

server.repetitionSend = function () {
    if (this.localTag) this.loadServer(this.localTag);
    else this.loadSetting();
}

server.loadServer = function (data) {
    this.localTag = data;
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            let respone = xhr.responseText;
            let resp = JSON.parse(respone);
            let head = resp.head;
            let body = resp.body;
            if (head.key) body = glGame.encrypt.getDecodeUrl(body, head.key);
            if (head.code != null && typeof code == "string") head.code = parseInt(head.code);
            else head.code = 0;
            if (head && head.code == 0) {
                this.servercfg = body;
                glGame.user.setUrl(body);
                glGame.emitter.emit(MESSAGE.UPDATE_SERVER_CFG);
            }
        } else if (xhr.readyState === 4) {
            xhr.onreadystatechange = () => { };
            setTimeout(() => {
                glGame.servercfg.repetitionSend();
            }, 5000)
        }
    };
    xhr.timeout = 15000;
    xhr.onerror = (error) => {
        setTimeout(() => {
            glGame.servercfg.repetitionSend();
        }, 5000)
    }
    let wholeurl = `${data.cfgurl}`;
    let route = "http.reqUrl";
    let msg = {
        head: {
            route: route,
            msgindex: 0,
            firstReq: 1
        },
        body: {}
    };
    if (msg.body && !msg.head.key) {
        let data = {};
        data = glGame.encrypt.getEncodeUrl(msg.body);
        msg.body = data["data"];
        msg.head.key = data["dataKey"];
    }
    xhr.open("POST", wholeurl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(msg));
};

server.loadSettingCB = function (data) {
    this.localTag = data;
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = () => {
        cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            let respone = xhr.responseText;
            this.servercfg = JSON.parse(respone);
            // this.servercfg.platSvrPort = 8081;
            // this.servercfg.platSvrHost = 'http://192.168.2.15';
            console.log("获取的servercfg  loadSettingCB", this.servercfg);
            glGame.emitter.emit(MESSAGE.UPDATE_SERVER_CFG);
        }
    };
    xhr.timeout = 5000;
    xhr.onerror = (error) => {
        setTimeout(() => {
            if (this.localTag) glGame.servercfg.loadSettingCB(glGame.servercfg.localTag);
            else glGame.servercfg.loadSetting();
        }, 5000)
    }
    let URLProducttag = data.producttag;
    if (!cc.sys.isNative && window && window.location && window.location.href) {
        URLProducttag = this.analysisURLParameter(window.location.href).args.producttag;
    }
    let wholeurl = `${data.cfgurl}/products/${URLProducttag || data.producttag}.json`;
    console.log("wholeurl=", wholeurl);
    xhr.open("GET", wholeurl, true);
    xhr.send();
};

//跳转到QQ对话框/社交软件界面
server.turnOtherApp = function (type, QQNumber = null) {
    let host = this.servercfg["platSvrHost"];
    let port = this.servercfg["platSvrPort"];
    if (QQNumber) {
        cc.sys.openURL(`http://${host}:${port}/openApp.html?type=${type}&url=${QQNumber}`);
    } else {
        cc.sys.openURL(`http://${host}:${port}/openApp.html?type=${type}`);
    }
}
// 解析URL是否带调试参数
server.analysisURLParameter = function (URL) {
    let arr = URL.split("?");
    let obj = {
        url: null,
        args: {}
    };
    obj.url = arr[0];
    // 拆分后如果长度小于2说明URL是不带参数的
    if (arr.length < 2) return obj;
    let mapArr = arr[1].split("&");
    for (let i = 0; i < mapArr.length; i++) {
        let parameter = mapArr[i].split("=");
        obj.args[parameter[0]] = parameter[1];
    }
    return obj
};
server.getLocalTag = function () {
    return this.localTag;
};
server.isEnableHotUpdate = function () {
    return this.b_enableHotUpdate;
};
server.getServerCfg = function () {
    return this.servercfg;
};
/**
 * 获取分享二维码图片地址
 */
server.getQRCodeURL = function () {
    let host = this.servercfg["platSvrHost"];
    let port = this.servercfg["platSvrPort"];
    return `${host}:${port}/shareimg/code.png`
};
/**
 * 获取当前游戏规则
 * @param tag 标签页编号
 * @param gameName 指定游戏名字
 */
server.getGameRuleURL = function (tag, gameName) {
    let host = this.servercfg["platSvrHost"];
    let port = this.servercfg["platSvrPort"];
    let curGameID = glGame.room.get("curEnterGameID");
    if (!gameName) gameName = glGame.scene.getSceneNameByID(curGameID);
    return `http://${host}:${port}/gamerule/${gameName}/${tag}.html`
};

/**
 * 获取当前游戏热更地址
 */
server.getHotupdateVersionUrl = function () {
    let hotUpdateURL = this.servercfg["hotUrl"];
    let strdiagonal = hotUpdateURL[hotUpdateURL.length - 1] === "/" ? "" : "/";
    return hotUpdateURL + strdiagonal;
}

/**
 * 开启下载地址
 */
server.openDownLoad = function () {
    cc.sys.openURL(this.servercfg["downLoadPage"]);
}

/**
 * 获取当前游戏热更地址
 */
server.getHotDownVersion = function () {
    return this.servercfg["downVersion"];
}

/**
 * 获取紧急公告开关
 */
server.getBolMaintaining = function () {
    return this.servercfg["emergencyMaintenanceSwitch"];
}

/**
 * 获取紧急公告内容
 */
server.getMaintainingContent = function () {
    return this.servercfg["emergencyMaintenanceContent"];
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new Server();
    }
    return g_instance;
};
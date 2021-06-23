let
    errCheck = require("errckect"),
    HTTP = function () { },
    http = HTTP.prototype,
    g_instance = null;

http.POST = function (route, msg, next, resend = false, timeout = 5000) {
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            console.log("Status: Got GET response! " + xhr.statusText);
            let respone = xhr.responseText;
            let resp = JSON.parse(respone);
            let head = resp.head;
            let body = resp.body;
            glGame.gameNet.getNetMgr().setLoginToken(head.token);
            if (head.key) body = glGame.encrypt.getDecodeData(body, head.key);
            if (errCheck.CheckError(head.route, head.code, body)) {
                next(head.route, body)
            }
        }
    };
    // note: In Internet Explorer, the timeout property may be set only after calling the open()
    // method and before calling the send() method.
    xhr.timeout = timeout;
    xhr.onerror = (error) => {
        console.log("出错啦 http.POST ...")
    }
    xhr.open("POST", glGame.gameNet.getWebHost(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

    let tempData = msg.body;
    console.log("http.POST 发送数据", glGame.gameNet.getWebHost(), route, tempData)
    
    if (msg.body && !msg.head.key && !resend) {
        let data = {};
        data = glGame.encrypt.getEncodeData(msg.body);
        msg.body = data["data"];
        msg.head.key = data["dataKey"];
    }
    xhr.send(JSON.stringify(msg));
}

http.GET = function (route, msg) {
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            console.log("Status: Got GET response! " + xhr.statusText);
        } else {
            console.log("Status: fail GET response! " + xhr.statusText);
        }
    };
    // note: In Internet Explorer, the timeout property may be set only after calling the open()
    // method and before calling the send() method.
    xhr.timeout = 5000;
    xhr.onerror = (error) => {
        console.log("客户端出错啦webGetReq")
    }
    xhr.open("POST", glGame.gameNet.getWebHost(), msg);
    xhr.send();
    console.log("发送=", route, msg)
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new HTTP();
    }
    return g_instance;
}();
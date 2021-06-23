var JSEncrypt = require("jsencrypt");
var Base64 = Base64 || require('base64').Base64;
var Cryptor = require('cryptor');

let ProxyData = function () {
    this.init();
},
    proxy = ProxyData.prototype,
    _special = "",
    _img_list = {},
    g_instance = null;

let DELAY_TYPE = {
    DELAY_ON: 0,
    DELAY_OFF: 1,
    DELAY_ERROR: 2,
}

let CODE = {
    BEGIN_LINK_ERROR: 0,
    LINK_ERROR: 1,
    DELAY_ERROR: 2,
}


let begin_start = {
    1: { data: "aHR0cDovLzE5Mi4xNjguMy4xMDE6MTAwMTA=" },

}

let standby_start = {
    1: { data: "aHR0cDovLzE5Mi4xNjguMy4xMDE6MTAwMTA=" },
}

proxy.init = function () {
    this._http_list = [];
    this._begin = null;
    this._begincount = 0;
    this._begindelay = 3000;
    this._standby = null;
    this._standbycount = 0;
    this._standbydelay = 10000;
    this._event_list = {};
    this._begin_end_for = false;
    this._standby_end_for = false;
    this._end_for = false;
    this._delay = 3000;
    this._linkmax = 5;
    this._delayof = 0;
    this._linkcount = 0;

    let enkey = [];
    enkey.push("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZU1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTUFEQ0JpQUtCZ0ZXdUFvSUhncXduZks1MUlFamJhMG4wZzV3eApZL04wb3kzSV");
    enkey.push("Qyakp1NWEwcUkwZXlGRmNUME5FV2ViUTR3S0NnS1M1MTNGN3FZM2c0MTdNWGlpaEZnWXZWczQ0CmloZFVieDFPbnZmZWl4UTI1aHJzNDZESG45aUxxWTFxNExhOXh6ZFg4Q1BOR");
    enkey.push("jdLRDF6UVQvZzdVcWd4dVBrZDEKOExmN2MvaWNUQnd2bFdkWkFnTUJBQUU9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==");
    let dekey = [];
    dekey.push("LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDV3dJQkFBS0JnR0JDYk5YQ0hRL0ZCOG11R0NVMyt4SmhNb3lnTm5DNXBtZFhIdXlhZGx1ZndiYWZ");
    dekey.push("Hd1ZrCjM0dTh0anlod3RYZVFidWZXbTJOTDV1Z3JjeENyWUgwUHNIcjFwTitMUG9yUkFqS01lNys5NlRhblpZOWdmdUsKSTBnNlJtelMzOXB4UHdoSFlBVTJNMy");
    dekey.push("9IUGpON2ZFQUhDMFNFU0d4cEVJcnFyNHdMTVpzTGJoVlpBZ01CQUFFQwpnWUFCRGZrL1JrY25PeE5neEVXRGN0K1BUZjFOeVJ1UGxKa2NITG84QVYwMmw4TjVpc");
    dekey.push("ml6RUczYWpCQzdEVktqCklUSTdLZjNGb1h4YUNpS2RVRVd5WE1pck44ZWtnZUxnUERRN0Jyb3h6M3JTazNOWXhFR0tIS2VnbVAxVjFQL20KM2JwTC8rMjNHUHJI");
    dekey.push("bkpDSEJ2aW9RSlVPQWVXb0F6b2xibGROSFlQN1FLU1IrUUpCQUo1dlI3RjU1eGtXazFVegpvSXNqaFNHeVRKYlJTYzQyK0RsaW1BM25GWVQ4T0JwUFd5YnFHQWJJ");
    dekey.push("WkdFS1RBZ0w5c0ZjL1lyNTEwZy9VeVpiCkZBS21xMXNDUVFDYmlXd09oaHMrT1NTSlBOM21hU1BuVEREVnBTZFRNUWt2K2x0c3BLd1l4V2Y3OXFDS3NnVGQKcGJ0");
    dekey.push("UXdLdUlLSFB0MHpoYmlVWmJsTWlsc2VMTThVUmJBa0VBaUNoV1VyM1N6NHJKUDVYSXlRclRwU3ZZQ2x6Kwpzc3dtOHhvNlZ1aGJaQmhtRnFaUVRkY3NvdGVnL0l5");
    dekey.push("ZTN1TjVRcUFwL1QvTnRmZEYvRmFWa2RtdXRRSkFPaW45CjJzQ1QxNFVQQUxOZVdCZmhjVkd3d1hSdGJGTGVHSzhMR1duTFljZ1F4c3pINUpZRjg4MVNhelJoOFIw");
    dekey.push("UG5WUnIKc3U5Mi9EQjdpRnNwY1hLWUdRSkFZdnd4T3lmSmhjVHRSOVZtQmsrVEJ4MnY1T0NQVmZMZHA3N1NkbWJVN3NpRAovc0ZFb0hJUk1OQkh6MForN0dNckhX");
    dekey.push("UzZlMldKdzVlc2VjSTB2T3g3SGc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==");
    this.encrypt = new JSEncrypt.JSEncrypt();
    this.decrypt = new JSEncrypt.JSEncrypt();
    this.encrypt.setPublicKey(Base64.decode(enkey[0] + enkey[1] + enkey[2]));
    this.decrypt.setPrivateKey(Base64.decode(dekey[0] + dekey[1] + dekey[2] + dekey[3] + dekey[4] + dekey[5] + dekey[6] + dekey[7] + dekey[8] + dekey[9]));
    this.cryptor = null;
}

/**
 * 
 */
proxy.start = function () {
    this._linkcount = 0;
    this._begincount = 0;
    this._standbycount = 0;
    this.getBeginServer();
}

proxy.stop = function () {
    this.clear();
    this.init();
}

/**
 * 获取服务器地址列表
 */
proxy.getBeginServer = function () {
    this._begin = begin_start;//JSON.parse(this.jsdecrypt(begin_start));
    for (let key in this._begin) {
        if (this._begin_end_for) break;
        if (!this._begin[key].data) continue;
        this.ping(Base64.decode(this._begin[key].data)).then(this.pingBegin.bind(this)).catch(data => { console.error(`Address to repeat:${data}`); })
    }
}

/**
 * 开始链接地址ping测试
 */
proxy.pingBegin = function (data) {
    if (this._begin_end_for) return;
    if (data.times <= this._begindelay) {
        _special = Base64.encode(data.url);
        this._begin_end_for = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.clearList();

        this._begin = null;
        this.getServer();

        //启用备用地址
    } else {
        this.clearList();

        this.getStandbyServer();
    }
    //else this.emit('failed', CODE.BEGIN_LINK_ERROR);
}


/**
 * 启用备用地址服务器地址列表
 */
proxy.getStandbyServer = function () {
    this._standby = standby_start;//JSON.parse(this.jsdecrypt(begin_start));
    for (let key in this._standby) {
        if (this._standby_end_for) break;
        if (!this._standby[key].data) continue;
        this.ping(Base64.decode(this._standby[key].data)).then(this.pingStandb.bind(this)).catch(data => { console.error(`Address to repeat:${data}`); })
    }
}

/**
 * 开始链接备用地址ping测试
 */
proxy.pingStandb = function (data) {
    if (this._standby_end_for) return;
    if (data.times <= this._standbydelay) {
        _special = Base64.encode(data.url);
        this._standby_end_for = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }


        for (let key in _img_list) {
            if (!_img_list[key].onload) continue;
            _img_list[key].src = "";
            _img_list[key] = null;
        }
        _img_list = {};
        this._standby = null;
        this.getServer();
        //启用备用地址
    } else this.emit('failed', CODE.BEGIN_LINK_ERROR);
}

/**
 * 添加服务列表
 * @param {Object} data
 */
proxy.addHttpList = function (data) {
    if (this._http_list.length) {
        for (let key in this._http_list) {
            if (this._http_list[key] == data) return;
        }
    }
    this._http_list.push(data);
}

/**
 * 返回http列表给与服务端
 */
proxy.getHttpList = function () {
    let http_list = "";
    let https = {};
    https.ids = [];
    for (let i = 0; i < this._http_list.length; i++) {
        let head = this._http_list[i].head;
        //let cryptor = new Cryptor(this.jsdecrypt(head.key));
        let cryptor = new Cryptor(String(Cryptor.hash(head.key, 'md5')).slice(0, 6));
        let list = cryptor.decode(Base64.decode(this._http_list[i].body))
        for (let key in list) {
            if (!list[key] || !list[key].id) continue;
            if (https.ids.includes(list[key].id)) continue;
            https.ids = https.ids.concat(list[key].id)
        }
    }

    let key = String(Cryptor.hash("" + parseInt(Math.random() * 100), 'md5')).slice(0, 6)
    //let enkey = this.jsencrypt(key);
    let enkey = String(Cryptor.hash(key, 'md5')).slice(-6);
    let cryptor = new Cryptor(enkey)
    let path = Base64.encode(cryptor.encode(JSON.stringify(https)))
    http_list = JSON.stringify({ head: { route: "http.reqDomainList", key: key }, body: path });
    return http_list;
}

/**
 * 获取服务器地址列表
 */
proxy.getServer = function () {
    if (this._linkcount > this._linkmax) {
        this.emit('failed', CODE.LINK_ERROR);
        this.getStandbyServer();
    } else {
        this._linkcount++;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Base64.decode(_special), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.timeout = 10000;
        xhr.onerror = (error) => { ProxyO.getServer() };

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                let respone = xhr.responseText;
                let resp = JSON.parse(respone);
                let head = resp.head;
                //表示服务端已无可用高效的链接地址
                if (head.code != 0) {
                    ProxyO.emit('failed', CODE.LINK_ERROR);
                    return;
                }
                console.log("getServer:", Base64.decode(_special));
                //记录所有ping低的网络环境
                ProxyO.addHttpList(resp);
                //解密ping值
                let cryptor = new Cryptor(String(Cryptor.hash(head.key, 'md5')).slice(0, 6));
                ProxyO.checkServer(cryptor.decode(Base64.decode(resp.body)));
            }
        };
        xhr.send(ProxyO.getHttpList());
    }
}

/**
 * rsa 加密
 * @param {any} data
 */
proxy.jsencrypt = function (data) {
    return this.encrypt.encrypt(data);
}

/**
 * rsa 解密
 * @param {Sting} data
 */
proxy.jsdecrypt = function (data) {
    return this.decrypt.decrypt(data);
}

// /**
//  * ping 函数 
//  * @param {String} ip 
//  * @returns {Promise<any>}
//  */
// proxy.ping = function (domain) {
//     return new Promise((resolve, reject) => {
//         if (_img_list[domain] != null) return reject(domain);
//         _img_list[domain] = new Image();
//         var start = Date.now()
//         _img_list[domain].onload = function () {
//             resolve({ url: domain, times: Date.now() - start });
//         }
//         //TODO IE8无法监听到该消息
//         _img_list[domain].onerror = function (data, event) {
//             resolve({ url: domain, times: Date.now() - start })
//         }
//         console.log("ping:", domain);
//         _img_list[domain].src = /^(http|https)/.test(domain) ? domain : "https://" + domain;
//     })
// }

/**
 * ping 函数 
 * @param {String} ip 
 * @returns {Promise<any>}
 */
proxy.ping = function (domain) {
    return new Promise((resolve, reject) => {
        if (_img_list[domain] != null) return reject(domain);

        let xhr = new XMLHttpRequest();
        _img_list[domain] = xhr;
        let start = Date.now();
        let url = /^(http|https)/.test(domain) ? domain : "https://" + domain;
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.open("GET", url, true);

        xhr.onreadystatechange = ()=> {
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                resolve({ url: domain, times: Date.now() - start});
            }
        };

        xhr.onerror = () => { 
            reject(domain);
        };
        xhr.ontimeout = ()=> {
            resolve({ url:domain, times: Date.now() - start });
        };

        xhr.send();
    });
}

/**
 * 清理已发包的域名
 */
proxy.clearList = function () {
    for (let key in _img_list) {
        if (!_img_list[key].onreadystatechange) continue;
        _img_list[key].onreadystatechange = null;
        _img_list[key].onerror = null;
        _img_list[key].ontimeout = null;
        _img_list[key] = null;
    }
    _img_list = {};
}


/**
 * 链接地址ping通过
 */
proxy.pingSucceed = function (data) {
    if (this._end_for) return;
    if (data.times <= this._delay || this._delayof == DELAY_TYPE.DELAY_OFF) {
        this.emit('succeed', data);
        this._end_for = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.clearList();
        _special = "";
    }
}

/**
 * 检查服务器的链接时长
 */
proxy.checkServer = function (http_list) {
    if (http_list) {
        this.emit('check');
        this._end_for = false;
        for (let key in http_list) {
            if (this._end_for) break;
            if (!http_list[key]) continue;
            this.ping(http_list[key].domain).then(this.pingSucceed.bind(this)).catch(data => { console.error(`Address to repeat:${data}`); })
        }
        this.timeout = setTimeout(() => {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.clearList();
            // TODO 所有链接延迟超过设定标准 重新获取新的链接服务器。
            if (DELAY_TYPE.DELAY_ERROR === this._delayof) this.emit('failed', CODE.LINK_ERROR);
            else this.getServer();
        }, this._delay)
    }
}

/**
 * 发送消息通知事件
 * @param {String} name
 * @param {Any} data
 */
proxy.emit = function (name, data) {
    let item = this._event_list[name];
    if (this._event_list[name] != null) {
        var args = [].slice.call(arguments, 1);
        item.call.apply(item.obj, args);
    }
}

/**
 * 注册监听
 * @param {String} name
 * @param {func} callfunc
 * @param {Object} self
 */
proxy.on = function (name, callfunc, self) {
    switch (name) {
        case 'begin':
        case 'check':
        case 'succeed':
        case 'failed':
            if (this._event_list[name] == null) this._event_list[name] = { call: callfunc, obj: self };
            else console.error(`event name ${name} is registered!`);
            break
        default: console.error(`event name ${name} registration failed!`);
    }
}

/**
 * 取消监听
 * @param {String} name
 */
proxy.off = function (name) {
    for (let key in this._event_list) {
        if (key === name) {
            delete this._event_list[key];
            this._event_list = null;
        }
    }
}

/**
 * 关闭所有监听
 */
proxy.clear = function () {
    this._event_list = null;
    this._event_list = {};
}



window.ProxyO = function () {
    if (!g_instance) g_instance = new ProxyData();
    return g_instance;
}();
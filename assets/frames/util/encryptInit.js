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


proxy.init = function () {
    let enkey = [];
    enkey.push("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZU1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTUFEQ0JpQUtCZ0hKQzBObGR0bGE1THZjWGpr");
    enkey.push("aW9vRFRWRklFRwpmTGtDL2d6d3UxNjNFWmtFd3NRMHkrcFFCT3FaL0xUNEdGVnZQb2xtbVhuSTMzd1FzQXNnTUpsZjEwMndjN1FaCmV0ckJJ");
    enkey.push("NHNpWFZVZnVvdEhjR0Q2NitUUExxNWpRQ0h0eDZQN3RTK2FjM0NlQTVvdzFoOWNsQmJ3REF3MWhaT0YKdmk2a2dmRDMvMzl0TEFhSEFnTUJB");
    enkey.push("QUU9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ")
    let dekey = [];
    dekey.push("LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWFFJQkFBS0JnUURPeS9lVE9teXlMWXJKWWRROTVHcS9ySmZ6cExGTjcvU1RVSER2a01oZC9");
    dekey.push("VQ3o0eUhrCkVsRVF3Z1paemtkTkdFbW9FcG9QOFQzVEhqV1JKRzZxWFJKc21ab2xyU3RITkVxRE5FVGo0M3dQWHFvek5MTXgKL2JwZ2NrTTRZbGdzWEpSdj");
    dekey.push("hDSGJFSFF1SjdBejNOb1BpM1dCbEt4UXJRZ0pjSG51M2tPcWJ3TXovd0lEQVFBQgpBb0dCQUs0MUkxM3k1T2lBOXg3SS9Bd2JwVlhOSnNESVo5a1pJTGNOR");
    dekey.push("ithbzJESmRpeWsvV1NpUnlack5hSjQwCjZObm9jUHhXbDFTQXpLMVNFSnd4emN4VTFaUUZXOHFTQVVlRWlOWldSdzJScjd4bDgwV3hqcXBYclZjek1oRzkK");
    dekey.push("b1NwaWNUaXRKUmNXcDVSanUzdjROVlRHWjIxMWdPcXAxRjFHMGVJbmN3ZnhwVmN4QWtFQTYwek81TjVoUk51UApxRUI4aW1QUXVUdnB1d3FLODM4VUZ1QjV");
    dekey.push("XMENadjB5VlBLdGdnb3lyT1RGS2ticU4xdzNjelJyVTVvZkticXE1Ckc5bW4rUDdUU1FKQkFPRDlQSWR5OUtUOFpZOGkwOGlpY0VnRVQ4NHdNeFpod0x0bX");
    dekey.push("VzZ2I4ZjBNaGpnY3hyMTgKUVNqM3pCMWRUL09rYmdTT1YvRkNCd0dOdTJyUkxMdVRCUWNDUUdBdWZGL1hld0V2a3JCZTg4bUo5WmJTSTc5KwpGc0JqMEsxd");
    dekey.push("FFvNEhnUkZPVjY1K0N5d3lIZ2Q1MjVab0lIU295UG5hSHU3QTBRR2RyWjd4d0pTcWJXa0NRSEYxCklzWUhZWG1sMGkwNVdlVnVqUUswTWU1L2ZmUEdmZVBE");
    dekey.push("TFdQbU84VHBRUEloQ05QYlNoeTN3Vlg1alcwSE9YZlEKdEdaMGJvWUpERDhVbHVOTWc1Y0NRUURPMFdVekJhTitmNkxTbEdIcTB1Z3k4YWhaQjI5Q1Qwai8");
    dekey.push("2Tk9OaW1oMgprNW5UeElKVWQvR2R6OFBRU21BOGs5aGhUNjRBeGNCTWpXRGt0N2JENGtxbwotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==");
    this.encrypt = new JSEncrypt.JSEncrypt();
    this.decrypt = new JSEncrypt.JSEncrypt();
    this.encrypt.setPublicKey(Base64.decode(enkey[0] + enkey[1] + enkey[2] + enkey[3]));
    this.decrypt.setPrivateKey(Base64.decode(dekey[0] + dekey[1] + dekey[2] + dekey[3] + dekey[4] + dekey[5] + dekey[6] + dekey[7] + dekey[8] + dekey[9]));
    this.cryptor = null;
}


/**
 * 返回http列表给与服务端
 */
proxy.getHttpList = function () {
    let http_list = "";
    if (this._http_list.length) {
        let http = [];
        for (let i = 0; i < this._http_list.length; i++) {
            let head = this._http_list[i].head;
            let cryptor = new Cryptor(this.jsdecrypt(head.key));
            http = http.concat(cryptor.decode(Base64.decode(this._http_list[i].body)))
        }
        let key = String(Cryptor.hash("" + parseInt(Math.random() * 100), 'md5')).slice(0, 6)
        let enkey = this.jsencrypt(key);
        console.log(http);
        let cryptor = new Cryptor(key)
        let path = Base64.encode(cryptor.encode(JSON.stringify(http)))
        http_list = JSON.stringify({ head: { route: "http.getDomain", key: enkey }, body: path });
    }
    return http_list;
}

proxy.getEncodeUrl = function (body) {
    if (!body || body == "") return console.error("body异常");
    let curkey = String(Cryptor.hash("" + parseInt(Math.random() * 100), 'md5')).slice(0, 6);
    let enkey = this.jsencrypt(curkey);
    let cryptor = new Cryptor(curkey);
    body = Base64.encode(cryptor.encode(JSON.stringify(body)));
    return {"data":body,"dataKey":enkey};
}

proxy.getDecodeUrl = function (body, key) {
    if (!body || !key || body == "" || key == "") return console.error("body 或 key 异常");
    console.log("reqUrl decode", typeof this.jsdecrypt(key), this.jsdecrypt(key))
    let cryptor = new Cryptor(this.jsdecrypt(key));
    body = cryptor.decode(Base64.decode(body))
    return body;
}

proxy.getEncodeData = function (body) {
    if (!body || body == "") return console.error("body异常");
    let transmitKey = String(Cryptor.hash("" + parseInt(Math.random() * 100), 'md5')).slice(2,8);
    let enkey = String(Cryptor.hash(transmitKey, "md5")).slice(-6);
    let cryptor = new Cryptor(enkey);
    body = Base64.encode(cryptor.encode(JSON.stringify(body)));
    return {"data":body,"dataKey":transmitKey};
}

proxy.getDecodeData = function (body, key) {
    if (!body || !key || body == "" || key == "") return console.error("body 或 key 异常");
    let encodeKey = String(Cryptor.hash(key, "md5")).slice(-6);
    let cryptor = new Cryptor(encodeKey);
    body = cryptor.decode(Base64.decode(body));
    return body;
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

module.exports = function () {
    if (!g_instance) g_instance = new ProxyData();
    return g_instance;
};
(function () {
    var JS_WS_CLIENT_TYPE = 'js-websocket';
    var JS_WS_CLIENT_VERSION = '0.0.1';

    var Proctocol = require("protocol");
    var Package = Protocol.Package;
    var Message = Protocol.Message;

    if (typeof (window) != "undefined" && typeof (sys) != 'undefined' && sys.localStorage) {
        window.localStorage = sys.localStorage;
    }

    var RES_OK = 200;
    var RES_FAIL = 500;
    var RES_OLD_CLIENT = 501;

    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            function F() { }
            F.prototype = o;
            return new F();
        };
    }

    var root = window;
    var pomelo = {};
    root.pomelo = pomelo;
    var socket = null;
    var reqId = 0;
    var handlers = {};
    //Map from request id to route
    var routeMap = {};

    var heartbeatInterval = 0;
    var heartbeatTimeout = 0;
    var nextHeartbeatTimeout = 0;
    var gapThreshold = 100;   // heartbeat gap threashold
    var heartbeatId = null;
    var heartbeatTimeoutId = null;

    var handshakeCallback = null;

    var decode = null;
    var encode = null;

    var useCrypto;

    var handshakeBuffer = {
        'sys': {
            type: JS_WS_CLIENT_TYPE,
            version: JS_WS_CLIENT_VERSION
        },
        'user': {
        }
    };


    var connectcb = null;
    var debug = false;
    var msgcb = null;


    pomelo.init = function (params) {

        var host = params.host;
        var port = params.port;
        connectcb = params.connectcb;
        debug = params.debug;
        msgcb = params.msgcb;
        var url = "";
        if (host.toLowerCase().indexOf("ws://") >= 0 || host.toLowerCase().indexOf("wss://") >= 0) url = host;
        else url = 'ws://' + host;

        if (port) {
            url += ':' + port;
        }

        handshakeBuffer.user = params.user;
        handshakeCallback = params.handshakeCallback;
        initWebSocket(url);
    };

    var initWebSocket = function (url) {
        var onopen = function (event) {
            var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(handshakeBuffer)));
            send(obj);
        };
        var onmessage = function (event) {
            processPackage(Package.decode(event.data));
            // new package arrived, update the heartbeat timeout
            if (heartbeatTimeout) {
                nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
            }
        };
        var onerror = function (event) {
            if (connectcb) {
                connectcb('io-error', event);
            }
            cc.error('socket error: ', JSON.stringify(arguments, null, 2));
        };
        var onclose = function (event) {
            if (connectcb) {
                connectcb('close', event);
                connectcb('disconnect', event);
            }
            cc.error('socket close: ', JSON.stringify(arguments, null, 2));
        };
        // socket = new WebSocket(url);
        //采用論壇中的方法支持 wss  by root 20190921
        let pemUrl = cc.url.raw("resources/cacert.pem");
        console.log("pemUrl:" + pemUrl);
        if (cc.loader.md5Pipe) {
            pemUrl = cc.loader.md5Pipe.transformURL(pemUrl);
        }
        console.log("transformURL(pemUrl):" + pemUrl);
        socket = new WebSocket(url, null, pemUrl);

        socket.binaryType = 'arraybuffer';
        socket.onopen = onopen;
        socket.onmessage = onmessage;
        socket.onerror = onerror;
        socket.onclose = onclose;
    };
    pomelo.clearListener = function () {
        connectcb = function () { };
        msgcb = function () { };
    }
    pomelo.disconnect = function () {
        if (socket) {
            if (socket.disconnect) socket.disconnect();
            if (socket.close) socket.close();
            socket = null;
        }

        if (heartbeatId) {
            clearTimeout(heartbeatId);
            heartbeatId = null;
        }
        if (heartbeatTimeoutId) {
            clearTimeout(heartbeatTimeoutId);
            heartbeatTimeoutId = null;
        }
    };

    pomelo.request = function (route, msg) {

        if (!route) {
            return;
        }

        reqId++;
        sendMessage(reqId, route, msg);
        routeMap[reqId] = route;
        console.log("routeMap=", routeMap)
    };

    pomelo.notify = function (route, msg) {
        msg = msg || {};
        sendMessage(0, route, msg);
    };

    pomelo.getState = function () {
        return (!socket || socket.readyState != 1) ? false : true;
    }

    var sendMessage = function (reqId, route, msg) {
        var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;

        //compress message by protobuf
        var protos = !!pomelo.data.protos ? pomelo.data.protos.client : {};
        if (!!protos[route]) {
            msg = protobuf.encode(route, msg);
        } else {
            msg = Protocol.strencode(JSON.stringify(msg));
        }


        var compressRoute = 0;
        if (pomelo.dict && pomelo.dict[route]) {
            route = pomelo.dict[route];
            compressRoute = 1;
        }

        msg = Message.encode(reqId, type, compressRoute, route, msg);
        var packet = Package.encode(Package.TYPE_DATA, msg);
        send(packet);
    };

    var send = function (packet) {
        if (!socket || !socket.send) return console.error("pomelo socket fractured!!");
        socket.send(packet.buffer);
    };


    var handler = {};

    var heartbeat = function (data) {
        if (!heartbeatInterval) {
            // no heartbeat
            return;
        }

        var obj = Package.encode(Package.TYPE_HEARTBEAT);
        if (heartbeatTimeoutId) {
            clearTimeout(heartbeatTimeoutId);
            heartbeatTimeoutId = null;
        }

        if (heartbeatId) {
            // already in a heartbeat interval
            return;
        }

        heartbeatId = setTimeout(function () {
            heartbeatId = null;
            send(obj);

            nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
            heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, heartbeatTimeout);
        }, heartbeatInterval);
    };

    var heartbeatTimeoutCb = function () {
        var gap = nextHeartbeatTimeout - Date.now();
        if (gap > gapThreshold) {
            heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, gap);
        } else {
            cc.error('server heartbeat timeout');
            connectcb('heartbeat timeout');
            pomelo.disconnect();
        }
    };

    var handshake = function (data) {
        data = JSON.parse(Protocol.strdecode(data));
        if (data.code === RES_OLD_CLIENT) {
            connectcb('error', 'client version not fullfill');
            return;
        }

        if (data.code !== RES_OK) {
            connectcb('error', 'handshake fail');
            return;
        }

        handshakeInit(data);

        var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
        send(obj);

        connectcb("connect")
    };

    var onData = function (data) {
        //probuff decode
        var msg = Message.decode(data);

        if (msg.id > 0) {
            msg.route = routeMap[msg.id];
            delete routeMap[msg.id];
            if (!msg.route) {
                return;
            }
        }

        msg.body = deCompose(msg);

        processMessage(pomelo, msg);
    };

    var onKick = function (data) {
        data = JSON.parse(Protocol.strdecode(data));
        connectcb('onKick', data);
    };

    handlers[Package.TYPE_HANDSHAKE] = handshake;
    handlers[Package.TYPE_HEARTBEAT] = heartbeat;
    handlers[Package.TYPE_DATA] = onData;
    handlers[Package.TYPE_KICK] = onKick;

    var processPackage = function (msgs) {
        if (Array.isArray(msgs)) {
            for (var i = 0; i < msgs.length; i++) {
                var msg = msgs[i];
                handlers[msg.type](msg.body);
            }
        } else {
            handlers[msgs.type](msgs.body);
        }
    };

    var processMessage = function (pomelo, msg) {
        let code = null;
        if (msg.body) {
            code = msg.body.code;
        }
        msgcb(msg.route, code, msg.body);
        return;
    };

    var processMessageBatch = function (pomelo, msgs) {
        for (var i = 0, l = msgs.length; i < l; i++) {
            processMessage(pomelo, msgs[i]);
        }
    };

    var deCompose = function (msg) {
        var protos = !!pomelo.data.protos ? pomelo.data.protos.server : {};
        var abbrs = pomelo.data.abbrs;
        var route = msg.route;

        //Decompose route from dict
        if (msg.compressRoute) {
            if (!abbrs[route]) {
                return {};
            }

            route = msg.route = abbrs[route];
        }
        if (!!protos[route]) {
            return protobuf.decode(route, msg.body);
        } else {
            return JSON.parse(Protocol.strdecode(msg.body));
        }

        return msg;
    };

    var handshakeInit = function (data) {
        if (data.sys && data.sys.heartbeat) {
            heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
            heartbeatTimeout = heartbeatInterval * 2;        // max heartbeat timeout
        } else {
            heartbeatInterval = 0;
            heartbeatTimeout = 0;
        }

        initData(data);

        if (typeof handshakeCallback === 'function') {
            handshakeCallback(data.user);
        }
    };

    //Initilize data used in pomelo client
    var initData = function (data) {
        if (!data || !data.sys) {
            return;
        }
        pomelo.data = pomelo.data || {};
        var dict = data.sys.dict;
        var protos = data.sys.protos;

        //Init compress dict
        if (dict) {
            pomelo.data.dict = dict;
            pomelo.data.abbrs = {};

            for (var route in dict) {
                pomelo.data.abbrs[dict[route]] = route;
            }
        }

        //Init protobuf protos
        if (protos) {
            pomelo.data.protos = {
                server: protos.server || {},
                client: protos.client || {}
            };
            if (!!protobuf) {
                protobuf.init({ encoderProtos: protos.client, decoderProtos: protos.server });
            }
        }
    };

    module.exports = pomelo;
})();

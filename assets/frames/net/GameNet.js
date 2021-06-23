let
	http = require("http"),
	NetMgr = require("NetMgr"),
	errCheck = require("errckect"),
	GameNet = function () {
		this.webhost = null;
		this.timeout = 5000;	//正常发包延迟5000毫秒
	},
	gameNet = GameNet.prototype,
	g_instance = null;



gameNet.getNetMgr = function () {
	return NetMgr;
}
gameNet.setWebHost = function (webhost) {
	this.webhost = webhost
}
gameNet.getWebHost = function () {
	return this.webhost;
}
//拼装数据
gameNet.send_msg = function (route, msg, next, version) {
	glGame.panel.showJuHua();
	//如果没有消息就构造一个
	if (msg == null || msg == 'undefined') msg = {};
	//绑定一个消息id
	let info = NetMgr.convertMsg(route, msg, next, version);
	if (!info) return 0;
	let serverType = info.serverType;
	let serverTimeout = info.serverTimeout || this.timeout;
	let newmsg = info.msg;
	switch (serverType) {
		case G_NETTYPE.httpPost://http post
			http.POST(route, newmsg, next, false, serverTimeout);
			break;
		case G_NETTYPE.httpGet://http get
			http.GET(route, newmsg, next);
			break;
		case G_NETTYPE.pomelo://pomelo
			this.pomeloReq(route, newmsg);
			break;
		default:
			return console.error("gameNet.send_msg: no find serverType ->", serverType)
	}
	return serverType;
}

//重发消息
gameNet.reSendMsgs = function (records) {
	for (let i = 0; i < records.length; ++i) {
		let record = records[i];
		let serverType = record.serverType;
		let route = record.route;
		let msg = record.msg;
		let next = record.next;

		record.sendNum += 1;
		console.log("[reSendMsgs] route:", route, "sendNum:", record.sendNum);
		if (errCheck.checkSendLimit(record.sendNum)) {
			return;
		}

		switch (serverType) {
			case G_NETTYPE.httpPost://http post
				http.POST(route, msg, next, true);
				break;
			case G_NETTYPE.httpGet://http get
				http.GET(route, msg, next);
				break;
			case G_NETTYPE.pomelo://pomelo
				this.pomeloReq(route, msg);
				break;
			default:
				console.error("gameNet.reSendMsgs: no find serverType ->", serverType)
		}
	}
}

//tcp请求
gameNet.pomeloReq = function (route, msg) {
	pomelo.request(route, msg)
}

gameNet.connect = function (host, port, connectcb) {
	//广播连接事件
	let cfg = {
		host: host,
		port: port,
		debug: true,
		msgcb: function (route, code, data) {
			console.log(route);
			if (errCheck.CheckError(route, code, data)) {
				// console.log("非错误消息,准备广播", route);
				glGame.emitter.emit(route, data);
			}
		},
		connectcb: connectcb,
	};
	console.log("连接配置=", JSON.stringify(cfg));
	pomelo.init(cfg)
	//告诉网络管理pomelo开始连接
	NetMgr.pomeloConnecting();
}
gameNet.disconnect = function () {
	pomelo.disconnect()
}
gameNet.getState = function () {
	return pomelo.getState();
}
gameNet.destroy = function () {
	NetMgr.destroy();
	pomelo.clearListener();
}

module.exports = function () {
	if (!g_instance) {
		g_instance = new GameNet();
	}
	return g_instance;
};
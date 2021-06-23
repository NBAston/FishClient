require('shelljs/global');
var fs = require('fs');

//开始制作web-desktop包
build_web = function () {
	let buildcfg = require("./web-desktop-config.json");
	// 本地 Cocos Creator 安装路径
	let CCCInstallRoute = "F:\\cocos\\CocosCreator2.8\\CocosCreator.exe";
	if (!CCCInstallRoute || CCCInstallRoute === "") {
		console.error("没有配置 Cocos Creator 的安装路径 ...");
		return;
	};
	exec("rm -rf ../build/web-desktop");
	let buildShellDict = [];
	for (let key in buildcfg) {
		buildShellDict.push(`${key}=${buildcfg[key].value}`);
	};
	exec([
		`${CCCInstallRoute} --path ../ --build \"${buildShellDict.join(";")}\"`,
		"rm -rf ../build/web-desktop/splash.*",
		"cp -r ../assets/config ../build/web-desktop/res/raw-assets/config",
		"rm ../build/web-desktop/res/raw-assets/config/*.meta",
	].join(" && "));
}

//修改子包配置文件，便于打包
setGameSonPack = function () {
	let gameDict = [
		"zhajinhua", "qznn",
		"brnn", "sangong", "honghei", "shuiguoji",
		"longhudou", "laba", "baijiale", "paijiu", "luckturntable",
		"dzpk", "ddz", "jszjh", "ebg", "esyd", "fish"
	];
	let count = gameDict.length;
	let progress = function () {
		count--;
		if (count == 0) build_web();
	}
	for (let key in gameDict) {
		let dict = gameDict[key];
		if (!dict) continue;
		let path = `../assets/modules/games/${dict}/res.meta`;
		fs.readFile(path, (err, data) => {
			if (!err) {
				let gamemeta = JSON.parse(String(data));
				gamemeta.isSubpackage = false;
				fs.writeFile(path, JSON.stringify(gamemeta), (err) => {
					if (err) console.error("writeFile", dict, err);
					else progress();
				});
			} else {
				console.error("readFile", dict, err);
			}
		});
	}
}

setGameSonPack();

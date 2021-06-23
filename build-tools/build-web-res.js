require('shelljs/global');
var fs = require('fs');

build_web = function () {
    let buildcfg = require("./build-web-config.json");
    // 本地 Cocos Creator 安装路径
    let CCCInstallRoute = "F:\\cocos\\CocosCreator2.8\\CocosCreator.exe";
    if (!CCCInstallRoute || CCCInstallRoute === "") {
        console.error("没有配置 Cocos Creator 的安装路径 ...");
        return;
    };
    exec("rm -rf ../build/web-mobile");
    let buildShellDict = [];
    for (let key in buildcfg) {
        buildShellDict.push(`${key}=${buildcfg[key].value}`);
    };
    exec([
        `${CCCInstallRoute} --path ../ --build \"${buildShellDict.join(";")}\"`,
        "rm -rf ../build/web-mobile/splash.*",
        "cp -r ../assets/config ../build/web-mobile/res/raw-assets/config",
        "rm ../build/web-mobile/res/raw-assets/config/*.meta",
    ].join(" && "));
}


setGameSonPack = function () {
    let gameDict = [
        "zhajinhua", "honghei", "ddz", "shuiguoji","qznn",
        "brnn", "sangong", "longhudou", "laba", "baijiale", "paijiu", "luckturntable",
        "dzpk", "jszjh", "ebg", "esyd", "fish"
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
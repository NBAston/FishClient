require('shelljs/global');
let fs = require("fs");
let buildcfg = require("./build-native-config.json");
let getBuildCfgValueByKey = function (key) {
	return buildcfg[key].value;
};


build_native = function () {
    // 本地 Cocos Creator 安装路径
    let CCCInstallRoute = "C:\\CocosCreator\\CocosCreator.exe";
    // 本地项目绝对路径
    let projectPath = "E:\\p3\\build\\dianwan-client-master";
    // 本地 android 项目路径
    let androidProPath = `../build/jsb-${getBuildCfgValueByKey("template")}/frameworks/runtime-src/proj.android-studio`;

    if (!CCCInstallRoute || CCCInstallRoute === "") {
        console.error("没有配置 Cocos Creator 的安装路径 ...");
        return;
    };
    if (!projectPath || projectPath === "") {
        console.error("没有配置当前项目路径 ...");
        return;
    };
    // 移除打包缓存文件
    exec(`rm -rf ../build/jsb-${getBuildCfgValueByKey("template")}/'js backups (useful for debugging)'`);
    exec(`rm -rf ../build/jsb-${getBuildCfgValueByKey("template")}/res`);
    exec(`rm -rf ../build/jsb-${getBuildCfgValueByKey("template")}/src`);
    exec(`rm ../build/jsb-${getBuildCfgValueByKey("template")}/main.js`);
    exec(`rm ../build/jsb-${getBuildCfgValueByKey("template")}/project.json`);
    exec(`cp ${androidProPath}/local.properties ./`);

    let buildShellDict = [];
    for (let key in buildcfg) {
        buildShellDict.push(`${key}=${buildcfg[key].value}`);
    };




    // 资源构建
    exec(`${CCCInstallRoute} --path ../ --build \"${buildShellDict.join(";")}\"`);
    exec(`cp ./local.properties ${androidProPath}/local.properties`);

    // 拷贝配置文件, 删除无用meta文件
    exec("cp -r ../assets/config ../build/jsb-link/res/raw-assets/ && cd ../build/jsb-link/res/raw-assets/config && rm *.meta");
    // 执行热更包   （如需要出底包，请注释下面一行代码，进行编译）
    exec(`node version_generator.js  -s ../build/jsb-link -d ../assets/`);


    // 打包命令
    //exec(`cd ${androidProPath} && gradle assemblerelease`)
    //exec(`cp ${androidProPath}/app/build/outputs/apk/release/dzwp-release.apk ./`)
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
        if (count == 0) build_native();
    }
    for (let key in gameDict) {
        let dict = gameDict[key];
        if (!dict) continue;
        let path = `../assets/modules/games/${dict}/res.meta`;
        fs.readFile(path, (err, data) => {
            if (!err) {
                let gamemeta = JSON.parse(String(data));
                gamemeta.isSubpackage = true;
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

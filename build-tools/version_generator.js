require('shelljs/global');
let adm_zip = require('adm-zip');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var archiver = require('archiver');
var localsetting = require('../assets/config/localsetting.json')
var hot_name = require('./hotupdateFileName.json')

let getHotUrl = function () {
    return localsetting['cfgurl'];
}

let gameDict = [
    "zhajinhua", "honghei", "ddz", "shuiguoji", "qznn",
    "brnn", "sangong", "longhudou", "laba", "baijiale", "paijiu", "luckturntable",
    "dzpk", "jszjh", "ebg", "esyd", "fish"
],
    modulesUrl = "../build/jsb-link/res/raw-assets/modules/",
    gameUrl = "../build/jsb-link/subpackages/",//"../build/jsb-link/res/raw-assets/modules/games/",
    copyPath = "../../gameupdate/",
    subPath = "/res/raw-assets",
    hot_url = getHotUrl() + hot_name['hot_name'];

let zipFolder = function (folder) {
    let obj = new adm_zip();
    obj.addLocalFolder(folder);
    obj.writeZip(`${folder}.zip`);
    delete obj;
};
let zipFile = function (file, callback) {
    var output = fs.createWriteStream(`${file}.zip`);
    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.on('error', function (err) {
        throw err;
    });
    output.on('close', function () {
        console.log("压缩成功")
        callback();
    });

    archive.pipe(output);
    // archive.bulk([
    //     { src: [`${file}/**`] }
    // ]);
    archive.directory(`${file}/`, false);
    archive.finalize();
}

function readDir(src, dir, obj) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(src, subpath, obj);
        }
        else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath, 'binary')).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';


            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}


let writeFile = function (destManifest, manifest) {
    fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
    });
}

/**
 *  copy资源
 */
let initCopy = function () {
    exec(`cd ../../ && rm -rf gameupdate && mkdir gameupdate`);

    // 拷贝配置文件 (资源 res)
    for (let key in gameDict) {
        let dict = gameDict[key];
        if (!dict) continue;
        let path_name = "";
        if (dict == "plaza") path_name = modulesUrl + dict;
        else path_name = gameUrl + dict;

        exec(`rm -rf ${copyPath + dict}`);

        exec(`cd ${copyPath} && mkdir ${dict} && cd ${dict} `);

        exec(`cp -r ${path_name + "/raw-assets"} ${copyPath + dict}`);

        // TODO 预留给子游戏逻辑封包
        //exec(`cp -r ${path_name + "/game.js"} ${copyPath}/${dict}`);

        //预留后续支持子游戏在线更新作用
        //exec(`cp -r ../build/jsb-link/res/import ${copyPath + dict}/res/import`);

        console.log("copy game:", dict, "success");
    }
}

/**
 * 底包资源
 */
let initMode = function () {
    let mode_name = "master"
    //资源构建
    exec(`rm -rf ${copyPath + mode_name}`);
    exec(`cd ${copyPath} && mkdir ${mode_name} && cd ${mode_name} && mkdir res && mkdir src`);

    exec(`cp -r ../build/jsb-link/res/import  ${copyPath + mode_name}/res`);
    exec(`cp -r ../build/jsb-link/res/raw-assets ${copyPath + mode_name}/res`);
    //代码构建
    exec(`rm -rf ${copyPath + mode_name}/src`);
    exec(`cp -r ../build/jsb-link/src  ${copyPath + mode_name}`);

    //生成配置文件
    initGameManifest();
    console.log("所有子游戏的包完成");
}
/**
 * 生成配置文件
 */
let initGameManifest = function () {
    //生成游戏配置文件
    for (let key in gameDict) {
        let dict = gameDict[key];
        if (!dict) continue;
        let manifest = {
            packageUrl: `${hot_url}${dict}/`,
            remoteManifestUrl: `${hot_url}${dict}/${dict}project.manifest`,
            remoteVersionUrl: `${hot_url}${dict}/${dict}version.manifest`,
            version: '',
            assets: {},
            searchPaths: []
        };
        console.log("manifest:", path.join(copyPath + dict, "./"), copyPath + dict);
        readDir(copyPath + dict, path.join(copyPath + dict, "./"), manifest.assets);
        //设置版本
        manifest.version = crypto.createHash('md5').update(JSON.stringify(manifest)).digest('hex');

        let project_name = path.join(copyPath + dict, `${dict}project.manifest`);
        let version_name = path.join(copyPath + dict, `${dict}version.manifest`);
        mkdirSync(copyPath + dict);

        writeFile(project_name, manifest);
        delete manifest.assets;
        delete manifest.searchPaths;
        writeFile(version_name, manifest);
        console.log("writeFile success!", dict)
    }
    //生成底包的配置文件
    let dict = "master"
    let manifest = {
        packageUrl: `${hot_url}${dict}/`,
        remoteManifestUrl: `${hot_url}${dict}/${dict}project.manifest`,
        remoteVersionUrl: `${hot_url}${dict}/${dict}version.manifest`,
        version: "",
        assets: {},
        searchPaths: []
    };

    console.log("manifest:", path.join(copyPath + dict));
    readDir(copyPath + dict + "/", path.join(copyPath + dict, "src"), manifest.assets);
    readDir(copyPath + dict + "/", path.join(copyPath + dict, "res"), manifest.assets);
    //设置版本
    manifest.version = crypto.createHash('md5').update(JSON.stringify(manifest)).digest('hex');

    let project_name = path.join(copyPath + dict, `${dict}project.manifest`);
    let version_name = path.join(copyPath + dict, `${dict}version.manifest`);
    mkdirSync(copyPath + dict);

    writeFile(project_name, manifest);
    delete manifest.assets;
    delete manifest.searchPaths;
    writeFile(version_name, manifest);
    console.log("writeFile success!", dict)
}

let initData = function () {
    //拷贝底包环境
    initCopy();
    //初始化底包的文件包
    initMode();
    console.log("基础底包完成");
}

initData();

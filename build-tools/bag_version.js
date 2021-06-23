require('shelljs/global');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var localsetting = require('../assets/config/localsetting.json')
var hot_name = require('./hotupdateFileName.json')

let getHotUrl = function () {
    return localsetting['cfgurl'];
}

let modulesUrl = "../build/jsb-link/",
    hot_url = getHotUrl() + hot_name['hot_name'];

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


let writeFile = function (destManifest, manifest, call) {
    fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        call ? call():null;
    });
}

/**
 * 生成配置文件
 */
let initGameManifest = function () {
    
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

    console.log("manifest:", path.join(modulesUrl));
    readDir(modulesUrl, path.join(modulesUrl, "src"), manifest.assets);
    readDir(modulesUrl, path.join(modulesUrl, "res"), manifest.assets);
    //设置版本
    manifest.version = crypto.createHash('md5').update(JSON.stringify(manifest)).digest('hex');

    let project_name = path.join(modulesUrl, `${dict}project.manifest`);
    mkdirSync(modulesUrl);

    writeFile(project_name, manifest, ()=>{
        exec(`mv -f ${modulesUrl}${dict}project.manifest  ${modulesUrl}/res/raw-assets/config`);
    });

    console.log("writeFile success!", dict)
}

let initData = function () {

    console.log("基础底包完成");
    //生成配置文件
    initGameManifest();
}

initData();

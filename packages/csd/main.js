'use strict';

const fs = require("fs");
const path = require("path");
let fileList = [];

function listFile(dir) {
  let arr = fs.readdirSync(dir);
  arr.forEach(function(item) {
    let fullpath = path.join(dir, item);
    let stats = fs.statSync(fullpath);
    if(stats.isDirectory()) {
      listFile(fullpath);
    } else {
      if(path.extname(fullpath) == ".csd") {
        fileList.push(fullpath);
      }
    }
  });

  return fileList;
}

// 读取csd文件
function readcsd(csdPath) {
  let csdContent = fs.readFileSync(csdPath, 'utf8');
  let szArr = csdContent.split("\n");
  for(let i = 0; i < szArr.length; i++) {
    let str = szArr[i];
    let posSkewX = str.indexOf("RotationSkewX=");
    let posSkewY = str.indexOf("\" RotationSkewY=");
    if(posSkewX != -1 && posSkewY != -1) {
      let subNum = Number(str.substring(posSkewX + 15, posSkewY));
      let leftStr = str.substring(0, posSkewX);
      let firstSpace = str.indexOf(" ", posSkewY+13);
      let rightStr = str.substring(firstSpace);
      let newStr = `${leftStr} RotationSkewX="${-subNum}" RotationSkewY="${-subNum}" ${rightStr}`;
      szArr[i] = newStr;
    }
  }

  let newContent = szArr.join("");
  fs.writeFileSync(csdPath, newContent);
  Editor.log(`${csdPath}处理成功`);
}

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'handlecsd' () {
        let ret = Editor.Dialog.openFile({properties: ['openDirectory']});
        fileList = [];
        listFile(ret[0]);

        for(let i = 0; i < fileList.length; i++) {
          readcsd(fileList[i]);
        }
    }
  },
};
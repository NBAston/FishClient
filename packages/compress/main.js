'use strict';

const fs = require("fs");
const path = require("path");

function changeFormat(q) {
  let retArr = Editor.Selection.curSelection("asset");
    for(let i = 0; i < retArr.length; i++) {
        let fsPath = Editor.assetdb.uuidToFspath(retArr[i]);
        let ext = path.extname(fsPath);
        if(ext != ".png" && ext != ".pac") {
          Editor.log(`${fsPath} is not png or pac`);
          continue;
        }

        let plistMetaPath = fsPath+".meta"
        let plistMetaStrings = fs.readFileSync(plistMetaPath,'utf8');
        let plistMetaData = JSON.parse(plistMetaStrings); 

        if(q == 0) {
          plistMetaData.platformSettings = {};
        } else {
          plistMetaData.platformSettings.web = {
            formats: [ 
              {
                name: "webp",
                quality: q
              },
              {
                name: "png",
                quality: q
              }
            ]
          };
        }

        let plistMetaDataStrings = JSON.stringify(plistMetaData, null, "\t");
        Editor.assetdb.saveMeta(plistMetaData.uuid, plistMetaDataStrings, (err,meta)=>{});   
        Editor.log(`${fsPath}转换成功 ${q}%`);
    } 
}

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'quality90' () {
      changeFormat(90);
    },

    'quality80' () {
      changeFormat(80);
    },

    'quality70' () {
      changeFormat(70);
    },

    'clear' () {
      changeFormat(0);
    }
  },
};
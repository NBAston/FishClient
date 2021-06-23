"use strict";
cc._RF.push(module, 'f2331KxWidN1KlYL/zYFV79', 'ScreenShot');
// frames/util/ScreenShot.js

"use strict";

//1.web为将图片转换成base64并下载到本地；2.截取节点的图片保存到本地
//filename: string;
//accountCode: string;
//node: cc.Node; 二维码的渲染节点
module.exports.captureScreenshot = function (filename, node) {
  if (isBrowser) {
    var callback = function callback() {
      var base64 = cc.game.canvas.toDataURL("imagea/png"); //getBase64Image(img);//canvas.toDataURL("imagea/png")//;

      cc.director.off(cc.Director.EVENT_AFTER_DRAW);
      var href = base64.replace(/^data:image[^;]*/, "data:image/octet-stream");
      var alink = document.createElement("a");
      alink.href = href;
      alink.download = "".concat(filename, ".png");
      alink.click();
      node.active = false;
      glGame.panel.showTip(glGame.tips.COMMON.SAVEQRCODE);
    };

    cc.director.on(cc.Director.EVENT_AFTER_DRAW, callback);
  } else {
    var size = cc.director.getWinSize();
    var fullPath = jsb.fileUtils.getWritablePath() + filename;

    if (jsb.fileUtils.isFileExist(fullPath)) {
      jsb.fileUtils.removeFile(fullPath);
    }

    var renderTexture = cc.RenderTexture.create(size.width, size.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES); //renderTexture.setPosition(cc.v2(size.width/2, size.height/2));

    renderTexture.begin();

    cc.director.getScene()._sgNode.visit();

    renderTexture.end();
    renderTexture.saveToFile(filename, cc.ImageFormat.PNG, true, function () {
      glGame.panel.showTip(glGame.tips.COMMON.SAVEQRCODE);
    });
  }
};

cc._RF.pop();
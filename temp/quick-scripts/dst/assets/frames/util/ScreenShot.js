
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/ScreenShot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxTY3JlZW5TaG90LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjYXB0dXJlU2NyZWVuc2hvdCIsImZpbGVuYW1lIiwibm9kZSIsImlzQnJvd3NlciIsImNhbGxiYWNrIiwiYmFzZTY0IiwiY2MiLCJnYW1lIiwiY2FudmFzIiwidG9EYXRhVVJMIiwiZGlyZWN0b3IiLCJvZmYiLCJEaXJlY3RvciIsIkVWRU5UX0FGVEVSX0RSQVciLCJocmVmIiwicmVwbGFjZSIsImFsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZG93bmxvYWQiLCJjbGljayIsImFjdGl2ZSIsImdsR2FtZSIsInBhbmVsIiwic2hvd1RpcCIsInRpcHMiLCJDT01NT04iLCJTQVZFUVJDT0RFIiwib24iLCJzaXplIiwiZ2V0V2luU2l6ZSIsImZ1bGxQYXRoIiwianNiIiwiZmlsZVV0aWxzIiwiZ2V0V3JpdGFibGVQYXRoIiwiaXNGaWxlRXhpc3QiLCJyZW1vdmVGaWxlIiwicmVuZGVyVGV4dHVyZSIsIlJlbmRlclRleHR1cmUiLCJjcmVhdGUiLCJ3aWR0aCIsImhlaWdodCIsIlRleHR1cmUyRCIsIlBJWEVMX0ZPUk1BVF9SR0JBODg4OCIsImdsIiwiREVQVEgyNF9TVEVOQ0lMOF9PRVMiLCJiZWdpbiIsImdldFNjZW5lIiwiX3NnTm9kZSIsInZpc2l0IiwiZW5kIiwic2F2ZVRvRmlsZSIsIkltYWdlRm9ybWF0IiwiUE5HIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxpQkFBZixHQUFtQyxVQUFTQyxRQUFULEVBQW1CQyxJQUFuQixFQUF3QjtBQUN2RCxNQUFJQyxTQUFKLEVBQWU7QUFDWCxRQUFJQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFJO0FBQ2YsVUFBSUMsTUFBTSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUUMsTUFBUixDQUFlQyxTQUFmLENBQXlCLFlBQXpCLENBQWIsQ0FEZSxDQUNxQzs7QUFDcERILE1BQUFBLEVBQUUsQ0FBQ0ksUUFBSCxDQUFZQyxHQUFaLENBQWdCTCxFQUFFLENBQUNNLFFBQUgsQ0FBWUMsZ0JBQTVCO0FBQ0EsVUFBSUMsSUFBSSxHQUFHVCxNQUFNLENBQUNVLE9BQVAsQ0FBZSxrQkFBZixFQUFtQyx5QkFBbkMsQ0FBWDtBQUNBLFVBQUlDLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEdBQXZCLENBQVo7QUFDQUYsTUFBQUEsS0FBSyxDQUFDRixJQUFOLEdBQWFBLElBQWI7QUFDQUUsTUFBQUEsS0FBSyxDQUFDRyxRQUFOLGFBQW9CbEIsUUFBcEI7QUFDQWUsTUFBQUEsS0FBSyxDQUFDSSxLQUFOO0FBQ0FsQixNQUFBQSxJQUFJLENBQUNtQixNQUFMLEdBQWMsS0FBZDtBQUNBQyxNQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYUMsT0FBYixDQUFxQkYsTUFBTSxDQUFDRyxJQUFQLENBQVlDLE1BQVosQ0FBbUJDLFVBQXhDO0FBQ0gsS0FWRDs7QUFXQXJCLElBQUFBLEVBQUUsQ0FBQ0ksUUFBSCxDQUFZa0IsRUFBWixDQUFldEIsRUFBRSxDQUFDTSxRQUFILENBQVlDLGdCQUEzQixFQUE2Q1QsUUFBN0M7QUFDSCxHQWJELE1BYU87QUFDSCxRQUFJeUIsSUFBSSxHQUFHdkIsRUFBRSxDQUFDSSxRQUFILENBQVlvQixVQUFaLEVBQVg7QUFDQSxRQUFJQyxRQUFRLEdBQUdDLEdBQUcsQ0FBQ0MsU0FBSixDQUFjQyxlQUFkLEtBQWtDakMsUUFBakQ7O0FBQ0EsUUFBRytCLEdBQUcsQ0FBQ0MsU0FBSixDQUFjRSxXQUFkLENBQTBCSixRQUExQixDQUFILEVBQXVDO0FBQ25DQyxNQUFBQSxHQUFHLENBQUNDLFNBQUosQ0FBY0csVUFBZCxDQUF5QkwsUUFBekI7QUFDSDs7QUFDRCxRQUFJTSxhQUFhLEdBQUcvQixFQUFFLENBQUNnQyxhQUFILENBQWlCQyxNQUFqQixDQUNoQlYsSUFBSSxDQUFDVyxLQURXLEVBRWhCWCxJQUFJLENBQUNZLE1BRlcsRUFHaEJuQyxFQUFFLENBQUNvQyxTQUFILENBQWFDLHFCQUhHLEVBSWhCQyxFQUFFLENBQUNDLG9CQUphLENBQXBCLENBTkcsQ0FZSDs7QUFDQVIsSUFBQUEsYUFBYSxDQUFDUyxLQUFkOztBQUNBeEMsSUFBQUEsRUFBRSxDQUFDSSxRQUFILENBQVlxQyxRQUFaLEdBQXVCQyxPQUF2QixDQUErQkMsS0FBL0I7O0FBQ0FaLElBQUFBLGFBQWEsQ0FBQ2EsR0FBZDtBQUNBYixJQUFBQSxhQUFhLENBQUNjLFVBQWQsQ0FBeUJsRCxRQUF6QixFQUFtQ0ssRUFBRSxDQUFDOEMsV0FBSCxDQUFlQyxHQUFsRCxFQUF1RCxJQUF2RCxFQUE2RCxZQUFZO0FBQ3JFL0IsTUFBQUEsTUFBTSxDQUFDQyxLQUFQLENBQWFDLE9BQWIsQ0FBcUJGLE1BQU0sQ0FBQ0csSUFBUCxDQUFZQyxNQUFaLENBQW1CQyxVQUF4QztBQUNILEtBRkQ7QUFHSDtBQUNKLENBbENEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLzEud2Vi5Li65bCG5Zu+54mH6L2s5o2i5oiQYmFzZTY05bm25LiL6L295Yiw5pys5Zyw77ybMi7miKrlj5boioLngrnnmoTlm77niYfkv53lrZjliLDmnKzlnLBcclxuLy9maWxlbmFtZTogc3RyaW5nO1xyXG4vL2FjY291bnRDb2RlOiBzdHJpbmc7XHJcbi8vbm9kZTogY2MuTm9kZTsg5LqM57u056CB55qE5riy5p+T6IqC54K5XHJcbm1vZHVsZS5leHBvcnRzLmNhcHR1cmVTY3JlZW5zaG90ID0gZnVuY3Rpb24oZmlsZW5hbWUsIG5vZGUpe1xyXG4gICAgaWYgKGlzQnJvd3Nlcikge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9ICgpPT57XHJcbiAgICAgICAgICAgIHZhciBiYXNlNjQgPSBjYy5nYW1lLmNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZWEvcG5nXCIpOy8vZ2V0QmFzZTY0SW1hZ2UoaW1nKTsvL2NhbnZhcy50b0RhdGFVUkwoXCJpbWFnZWEvcG5nXCIpLy87XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9mZihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXKTtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSBiYXNlNjQucmVwbGFjZSgvXmRhdGE6aW1hZ2VbXjtdKi8sIFwiZGF0YTppbWFnZS9vY3RldC1zdHJlYW1cIik7XHJcbiAgICAgICAgICAgIHZhciBhbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcbiAgICAgICAgICAgIGFsaW5rLmhyZWYgPSBocmVmO1xyXG4gICAgICAgICAgICBhbGluay5kb3dubG9hZCA9IGAke2ZpbGVuYW1lfS5wbmdgO1xyXG4gICAgICAgICAgICBhbGluay5jbGljaygpXHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKGdsR2FtZS50aXBzLkNPTU1PTi5TQVZFUVJDT0RFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVywgY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLmRpcmVjdG9yLmdldFdpblNpemUoKTtcclxuICAgICAgICB2YXIgZnVsbFBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgZmlsZW5hbWU7XHJcbiAgICAgICAgaWYoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChmdWxsUGF0aCkpe1xyXG4gICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZUZpbGUoZnVsbFBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVuZGVyVGV4dHVyZSA9IGNjLlJlbmRlclRleHR1cmUuY3JlYXRlKFxyXG4gICAgICAgICAgICBzaXplLndpZHRoLFxyXG4gICAgICAgICAgICBzaXplLmhlaWdodCxcclxuICAgICAgICAgICAgY2MuVGV4dHVyZTJELlBJWEVMX0ZPUk1BVF9SR0JBODg4OCxcclxuICAgICAgICAgICAgZ2wuREVQVEgyNF9TVEVOQ0lMOF9PRVNcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vcmVuZGVyVGV4dHVyZS5zZXRQb3NpdGlvbihjYy52MihzaXplLndpZHRoLzIsIHNpemUuaGVpZ2h0LzIpKTtcclxuICAgICAgICByZW5kZXJUZXh0dXJlLmJlZ2luKCk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5fc2dOb2RlLnZpc2l0KCk7XHJcbiAgICAgICAgcmVuZGVyVGV4dHVyZS5lbmQoKTtcclxuICAgICAgICByZW5kZXJUZXh0dXJlLnNhdmVUb0ZpbGUoZmlsZW5hbWUsIGNjLkltYWdlRm9ybWF0LlBORywgdHJ1ZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1RpcChnbEdhbWUudGlwcy5DT01NT04uU0FWRVFSQ09ERSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
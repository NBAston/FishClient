
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8270elSWaBFMK7AJXeK3oV8', 'nfish_loading');
// modules/games/nfish/script/prefab/nfish_loading.js

"use strict";

glGame.baseclass.extend({
  properties: {
    progress: cc.ProgressBar,
    lab_percent: cc.Label,
    lab_loading: cc.Label
  },
  onLoad: function onLoad() {
    this.scene = cc.director.getScene();
    this.setloadingSprite();
    this.node.active = true;
    this.progress.progress = 0;
    this.lab_percent.string = '0%';
    this.node.zIndex = 1000;
    glGame.emitter.on(MESSAGE.UI.PLAZA_LOADING, this.plazaloading, this);
  },
  setProgress: function setProgress(progress) {
    this.progress.progress = progress;
    this.lab_percent.string = "".concat(Math.floor(progress * 100), "%");
  },
  //加载界面设置不同的图片
  setloadingSprite: function setloadingSprite() {
    this.lab_loading.string = '正在加载中';
  },
  setloadingTipsSprite: function setloadingTipsSprite() {
    this.node.active = true;
    this.progress.progress = 1;
    this.lab_percent.string = '100%';
  },
  //加载界面读条设置
  plazaloading: function plazaloading(data) {
    var progress = data.completedCount / data.totalCount;

    if (progress < this.progress.progress) {
      progress = this.progress.progress + 0.0001;
    }

    if (progress > 1) {
      progress = 1;
    }

    this.progress.progress = progress;
    this.lab_percent.string = "".concat(Math.floor(progress * 100), "%");
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.PLAZA_LOADING, this);

    cc.loader.onProgress = function () {};

    cc.loader.onComplete = function () {};
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfbG9hZGluZy5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwicHJvZ3Jlc3MiLCJjYyIsIlByb2dyZXNzQmFyIiwibGFiX3BlcmNlbnQiLCJMYWJlbCIsImxhYl9sb2FkaW5nIiwib25Mb2FkIiwic2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwic2V0bG9hZGluZ1Nwcml0ZSIsIm5vZGUiLCJhY3RpdmUiLCJzdHJpbmciLCJ6SW5kZXgiLCJlbWl0dGVyIiwib24iLCJNRVNTQUdFIiwiVUkiLCJQTEFaQV9MT0FESU5HIiwicGxhemFsb2FkaW5nIiwic2V0UHJvZ3Jlc3MiLCJNYXRoIiwiZmxvb3IiLCJzZXRsb2FkaW5nVGlwc1Nwcml0ZSIsImRhdGEiLCJjb21wbGV0ZWRDb3VudCIsInRvdGFsQ291bnQiLCJPbkRlc3Ryb3kiLCJvZmYiLCJsb2FkZXIiLCJvblByb2dyZXNzIiwib25Db21wbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUMsRUFBRSxDQUFDQyxXQURMO0FBRVJDLElBQUFBLFdBQVcsRUFBRUYsRUFBRSxDQUFDRyxLQUZSO0FBR1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDRztBQUhSLEdBRFE7QUFNcEJFLEVBQUFBLE1BTm9CLG9CQU1YO0FBQ0wsU0FBS0MsS0FBTCxHQUFhTixFQUFFLENBQUNPLFFBQUgsQ0FBWUMsUUFBWixFQUFiO0FBQ0EsU0FBS0MsZ0JBQUw7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxTQUFLWixRQUFMLENBQWNBLFFBQWQsR0FBeUIsQ0FBekI7QUFDQSxTQUFLRyxXQUFMLENBQWlCVSxNQUFqQixHQUEwQixJQUExQjtBQUNBLFNBQUtGLElBQUwsQ0FBVUcsTUFBVixHQUFtQixJQUFuQjtBQUNBbEIsSUFBQUEsTUFBTSxDQUFDbUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCQyxPQUFPLENBQUNDLEVBQVIsQ0FBV0MsYUFBN0IsRUFBNEMsS0FBS0MsWUFBakQsRUFBK0QsSUFBL0Q7QUFDSCxHQWRtQjtBQWdCcEJDLEVBQUFBLFdBaEJvQix1QkFnQlJyQixRQWhCUSxFQWdCRTtBQUNsQixTQUFLQSxRQUFMLENBQWNBLFFBQWQsR0FBeUJBLFFBQXpCO0FBQ0EsU0FBS0csV0FBTCxDQUFpQlUsTUFBakIsYUFBNkJTLElBQUksQ0FBQ0MsS0FBTCxDQUFXdkIsUUFBUSxHQUFHLEdBQXRCLENBQTdCO0FBQ0gsR0FuQm1CO0FBcUJwQjtBQUNBVSxFQUFBQSxnQkF0Qm9CLDhCQXNCRDtBQUNmLFNBQUtMLFdBQUwsQ0FBaUJRLE1BQWpCLEdBQTBCLE9BQTFCO0FBQ0gsR0F4Qm1CO0FBMEJwQlcsRUFBQUEsb0JBMUJvQixrQ0EwQkc7QUFDbkIsU0FBS2IsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsU0FBS1osUUFBTCxDQUFjQSxRQUFkLEdBQXlCLENBQXpCO0FBQ0EsU0FBS0csV0FBTCxDQUFpQlUsTUFBakIsR0FBMEIsTUFBMUI7QUFDSCxHQTlCbUI7QUFnQ3BCO0FBQ0FPLEVBQUFBLFlBakNvQix3QkFpQ1BLLElBakNPLEVBaUNEO0FBQ2YsUUFBSXpCLFFBQVEsR0FBR3lCLElBQUksQ0FBQ0MsY0FBTCxHQUFzQkQsSUFBSSxDQUFDRSxVQUExQzs7QUFDQSxRQUFHM0IsUUFBUSxHQUFHLEtBQUtBLFFBQUwsQ0FBY0EsUUFBNUIsRUFBc0M7QUFDbENBLE1BQUFBLFFBQVEsR0FBRyxLQUFLQSxRQUFMLENBQWNBLFFBQWQsR0FBeUIsTUFBcEM7QUFDSDs7QUFFRCxRQUFHQSxRQUFRLEdBQUcsQ0FBZCxFQUFpQjtBQUNiQSxNQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNIOztBQUVELFNBQUtBLFFBQUwsQ0FBY0EsUUFBZCxHQUF5QkEsUUFBekI7QUFDQSxTQUFLRyxXQUFMLENBQWlCVSxNQUFqQixhQUE2QlMsSUFBSSxDQUFDQyxLQUFMLENBQVd2QixRQUFRLEdBQUcsR0FBdEIsQ0FBN0I7QUFDSCxHQTdDbUI7QUErQ3BCNEIsRUFBQUEsU0EvQ29CLHVCQStDUjtBQUNSaEMsSUFBQUEsTUFBTSxDQUFDbUIsT0FBUCxDQUFlYyxHQUFmLENBQW1CWixPQUFPLENBQUNDLEVBQVIsQ0FBV0MsYUFBOUIsRUFBNkMsSUFBN0M7O0FBQ0FsQixJQUFBQSxFQUFFLENBQUM2QixNQUFILENBQVVDLFVBQVYsR0FBdUIsWUFBTSxDQUFHLENBQWhDOztBQUNBOUIsSUFBQUEsRUFBRSxDQUFDNkIsTUFBSCxDQUFVRSxVQUFWLEdBQXVCLFlBQU0sQ0FBRyxDQUFoQztBQUNIO0FBbkRtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBsYWJfcGVyY2VudDogY2MuTGFiZWwsXHJcbiAgICAgICAgbGFiX2xvYWRpbmc6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLnNldGxvYWRpbmdTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmxhYl9wZXJjZW50LnN0cmluZyA9ICcwJSc7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDEwMDA7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5QTEFaQV9MT0FESU5HLCB0aGlzLnBsYXphbG9hZGluZywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFByb2dyZXNzKHByb2dyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgIHRoaXMubGFiX3BlcmNlbnQuc3RyaW5nID0gYCR7TWF0aC5mbG9vcihwcm9ncmVzcyAqIDEwMCl9JWA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yqg6L2955WM6Z2i6K6+572u5LiN5ZCM55qE5Zu+54mHXHJcbiAgICBzZXRsb2FkaW5nU3ByaXRlKCkge1xyXG4gICAgICAgIHRoaXMubGFiX2xvYWRpbmcuc3RyaW5nID0gJ+ato+WcqOWKoOi9veS4rSc7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldGxvYWRpbmdUaXBzU3ByaXRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIHRoaXMubGFiX3BlcmNlbnQuc3RyaW5nID0gJzEwMCUnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WKoOi9veeVjOmdouivu+adoeiuvue9rlxyXG4gICAgcGxhemFsb2FkaW5nKGRhdGEpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBkYXRhLmNvbXBsZXRlZENvdW50IC8gZGF0YS50b3RhbENvdW50O1xyXG4gICAgICAgIGlmKHByb2dyZXNzIDwgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcykge1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgKyAwLjAwMDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihwcm9ncmVzcyA+IDEpIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgIHRoaXMubGFiX3BlcmNlbnQuc3RyaW5nID0gYCR7TWF0aC5mbG9vcihwcm9ncmVzcyAqIDEwMCl9JWA7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5QTEFaQV9MT0FESU5HLCB0aGlzKTtcclxuICAgICAgICBjYy5sb2FkZXIub25Qcm9ncmVzcyA9ICgpID0+IHsgfTtcclxuICAgICAgICBjYy5sb2FkZXIub25Db21wbGV0ZSA9ICgpID0+IHsgfVxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
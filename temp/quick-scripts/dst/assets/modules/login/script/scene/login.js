
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/login/script/scene/login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0fd4eKm+QdB6L/mqgHCYtTl', 'login');
// modules/login/script/scene/login.js

"use strict";

var _properties, _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cc.Class((_cc$Class = {
  "extends": cc.Component,
  properties: (_properties = {
    login_frame: cc.Prefab,
    //登入界面
    update_frame: cc.Prefab,
    //热更界面
    update_bag: cc.Prefab,
    //热更底包
    login_logo: cc.Prefab,
    //添加logo
    click_action: cc.Prefab,
    btn_cleanupCache: cc.Node,
    //修复按钮
    btn_serive: cc.Node,
    //客服按钮
    btn_website: cc.Node
  }, _defineProperty(_properties, "btn_website", cc.Node), _defineProperty(_properties, "login_switch", [cc.Node]), _defineProperty(_properties, "videoMask", cc.Node), _defineProperty(_properties, "videoPlayer", cc.VideoPlayer), _defineProperty(_properties, "coinArrvalTip", cc.Prefab), _properties),
  onLoad: function onLoad() {
    this.btn_cleanupCache.active = cc.sys.isNative;
    startGame();
    this.serviceUrl = cc.sys.localStorage.getItem('serviceUrl') || glGame.gamecfg.serviceUrl;
    glGame.emitter.on("userurldata", this.updateService, this);
    glGame.emitter.on(MESSAGE.UI.HIDE_CLEANUP, this.hideCleanupCache, this);
    glGame.emitter.on(MESSAGE.DOWNLOAD.BAG, this.updatebag, this);
    this.setLoginFrame();
    glGame.emitter.on(MESSAGE.DOWNLOAD.END, this.openLogin, this);
    if (!cc.director.getScene().getChildByName("click_action")) glGame.panel.showPanel(this.click_action).zIndex = 999999;
    var isAudioPlay = cc.sys.localStorage.getItem("isAudioPlay");
    console.log("是否播放视频 isAudioPlay ===>", isAudioPlay);

    if (isAudioPlay || cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.isBrowser) {
      this.videoPlayer.node.active = false;
      this.videoPlayerEnd();
    } else {
      this.videoPlayer.node.active = true;
    }
  },
  playCallFunc: function playCallFunc(videoplayer, eventType, customEventData) {
    var _this = this;

    if (!this.videoPlayer.node.active) return;

    switch (eventType) {
      case cc.VideoPlayer.EventType.PLAYING:
        // console.log("videoplayer ===> 表示视频正在播放中。");
        this.scheduleOnce(function () {
          _this.videoMask.opacity = 1;
        }, 0.1);
        break;

      case cc.VideoPlayer.EventType.PAUSED:
        // console.log("videoplayer ===> 表示视频暂停播放。");
        break;

      case cc.VideoPlayer.EventType.STOPPED:
        // console.log("videoplayer ===> 表示视频已经停止播放。");
        break;

      case cc.VideoPlayer.EventType.COMPLETED:
        // console.log("videoplayer ===> 表示视频播放完成。");
        this.videoPlayerEnd();
        break;

      case cc.VideoPlayer.EventType.CLICKED:
        // console.log("videoplayer ===> 表示视频被用户点击了。（只支持 Web 平台）");
        break;

      case cc.VideoPlayer.EventType.READY_TO_PLAY:
        // console.log("videoplayer ===> 表示视频准备好了，可以开始播放了。");
        break;

      case cc.VideoPlayer.EventType.META_LOADED:
        // console.log("videoplayer ===> 表示视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长。");
        if (cc.sys.isNative) {
          this.videoPlayer.currentTime = 0;
          this.videoPlayer.play();
        } else this.videoPlayerEnd();

        break;
    }
  },
  start: function start() {
    if (glGame.coinArral == null) {
      glGame.panel.showPanel(this.coinArrvalTip);
    }
  },
  videoPlayerEnd: function videoPlayerEnd() {
    this.videoMask.active = false;
    this.videoPlayer.node.destroy();
    glGame.panel.showChildPanel(this.update_frame, this.node);
    glGame.audio.playPathBGM();
  },
  hideCleanupCache: function hideCleanupCache() {
    if (this.btn_cleanupCache) this.btn_cleanupCache.active = false;
    if (this.btn_serive) this.btn_serive.active = false;
    if (this.btn_website) this.btn_website.active = false;
  },
  updateService: function updateService() {
    if (glGame.user.get('url').serviceOuter) this.serviceUrl = glGame.user.get('url').serviceOuter;
  },
  cleanupCache_cb: function cleanupCache_cb() {
    clearGame();
    this.btn_cleanupCache.active = false;
  },
  servier_cb: function servier_cb() {
    cc.sys.openURL(this.serviceUrl);
  }
}, _defineProperty(_cc$Class, "servier_cb", function servier_cb() {
  cc.sys.openURL(this.serviceUrl);
}), _defineProperty(_cc$Class, "openLogin", function openLogin() {
  this.node.getChildByName('loading_logo').active = false; //glGame.panel.showPanel(this.login_frame);
}), _defineProperty(_cc$Class, "updatebag", function updatebag() {
  glGame.panel.showPanel(this.update_bag);
}), _defineProperty(_cc$Class, "setLoginFrame", function setLoginFrame() {
  for (var index in this.login_switch) {
    this.login_switch[index].active = false;
  }

  var login_node = this.login_switch[glGame.gamecfg.loginSwitch];
  login_node.active = true;
  glGame.panel.showChildPanel(this.login_logo, login_node.getChildByName("loading_logo"));
}), _defineProperty(_cc$Class, "onDestroy", function onDestroy() {
  glGame.emitter.off(MESSAGE.UI.HIDE_CLEANUP, this);
  glGame.emitter.off(MESSAGE.DOWNLOAD.END, this);
  glGame.emitter.off(MESSAGE.DOWNLOAD.BAG, this);
}), _cc$Class));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcbG9naW5cXHNjcmlwdFxcc2NlbmVcXGxvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9naW5fZnJhbWUiLCJQcmVmYWIiLCJ1cGRhdGVfZnJhbWUiLCJ1cGRhdGVfYmFnIiwibG9naW5fbG9nbyIsImNsaWNrX2FjdGlvbiIsImJ0bl9jbGVhbnVwQ2FjaGUiLCJOb2RlIiwiYnRuX3Nlcml2ZSIsImJ0bl93ZWJzaXRlIiwiVmlkZW9QbGF5ZXIiLCJvbkxvYWQiLCJhY3RpdmUiLCJzeXMiLCJpc05hdGl2ZSIsInN0YXJ0R2FtZSIsInNlcnZpY2VVcmwiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2xHYW1lIiwiZ2FtZWNmZyIsImVtaXR0ZXIiLCJvbiIsInVwZGF0ZVNlcnZpY2UiLCJNRVNTQUdFIiwiVUkiLCJISURFX0NMRUFOVVAiLCJoaWRlQ2xlYW51cENhY2hlIiwiRE9XTkxPQUQiLCJCQUciLCJ1cGRhdGViYWciLCJzZXRMb2dpbkZyYW1lIiwiRU5EIiwib3BlbkxvZ2luIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsImdldENoaWxkQnlOYW1lIiwicGFuZWwiLCJzaG93UGFuZWwiLCJ6SW5kZXgiLCJpc0F1ZGlvUGxheSIsImNvbnNvbGUiLCJsb2ciLCJvcyIsIk9TX1dJTkRPV1MiLCJpc0Jyb3dzZXIiLCJ2aWRlb1BsYXllciIsIm5vZGUiLCJ2aWRlb1BsYXllckVuZCIsInBsYXlDYWxsRnVuYyIsInZpZGVvcGxheWVyIiwiZXZlbnRUeXBlIiwiY3VzdG9tRXZlbnREYXRhIiwiRXZlbnRUeXBlIiwiUExBWUlORyIsInNjaGVkdWxlT25jZSIsInZpZGVvTWFzayIsIm9wYWNpdHkiLCJQQVVTRUQiLCJTVE9QUEVEIiwiQ09NUExFVEVEIiwiQ0xJQ0tFRCIsIlJFQURZX1RPX1BMQVkiLCJNRVRBX0xPQURFRCIsImN1cnJlbnRUaW1lIiwicGxheSIsInN0YXJ0IiwiY29pbkFycmFsIiwiY29pbkFycnZhbFRpcCIsImRlc3Ryb3kiLCJzaG93Q2hpbGRQYW5lbCIsImF1ZGlvIiwicGxheVBhdGhCR00iLCJ1c2VyIiwiZ2V0Iiwic2VydmljZU91dGVyIiwiY2xlYW51cENhY2hlX2NiIiwiY2xlYXJHYW1lIiwic2Vydmllcl9jYiIsIm9wZW5VUkwiLCJpbmRleCIsImxvZ2luX3N3aXRjaCIsImxvZ2luX25vZGUiLCJsb2dpblN3aXRjaCIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSDtBQUNJLGFBQVNELEVBQUUsQ0FBQ0UsU0FEaEI7QUFHSUMsRUFBQUEsVUFBVTtBQUNOQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEVjtBQUMwQjtBQUNoQ0MsSUFBQUEsWUFBWSxFQUFFTixFQUFFLENBQUNLLE1BRlg7QUFFMEI7QUFDaENFLElBQUFBLFVBQVUsRUFBRVAsRUFBRSxDQUFDSyxNQUhUO0FBRzBCO0FBQ2hDRyxJQUFBQSxVQUFVLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKVDtBQUkwQjtBQUNoQ0ksSUFBQUEsWUFBWSxFQUFFVCxFQUFFLENBQUNLLE1BTFg7QUFNTkssSUFBQUEsZ0JBQWdCLEVBQUVWLEVBQUUsQ0FBQ1csSUFOZjtBQU0wQjtBQUNoQ0MsSUFBQUEsVUFBVSxFQUFFWixFQUFFLENBQUNXLElBUFQ7QUFPMEI7QUFDaENFLElBQUFBLFdBQVcsRUFBRWIsRUFBRSxDQUFDVztBQVJWLGlEQVNPWCxFQUFFLENBQUNXLElBVFYsZ0RBVVEsQ0FBQ1gsRUFBRSxDQUFDVyxJQUFKLENBVlIsNkNBV0tYLEVBQUUsQ0FBQ1csSUFYUiwrQ0FZT1gsRUFBRSxDQUFDYyxXQVpWLGlEQWFTZCxFQUFFLENBQUNLLE1BYlosZUFIZDtBQWtCSVUsRUFBQUEsTUFsQkosb0JBa0JhO0FBQ0wsU0FBS0wsZ0JBQUwsQ0FBc0JNLE1BQXRCLEdBQStCaEIsRUFBRSxDQUFDaUIsR0FBSCxDQUFPQyxRQUF0QztBQUNBQyxJ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Q0E5SEwsZ0VBZ0lnQjtBQUNSakIsRUFBQUEsTUFBTSxDQUFDRSxPQUFQLENBQWUrRCxHQUFmLENBQW1CNUQsT0FBTyxDQUFDQyxFQUFSLENBQVdDLFlBQTlCLEVBQTRDLElBQTVDO0FBQ0FQLEVBQUFBLE1BQU0sQ0FBQ0UsT0FBUCxDQUFlK0QsR0FBZixDQUFtQjVELE9BQU8sQ0FBQ0ksUUFBUixDQUFpQkksR0FBcEMsRUFBeUMsSUFBekM7QUFDQWIsRUFBQUEsTUFBTSxDQUFDRSxPQUFQLENBQWUrRCxHQUFmLENBQW1CNUQsT0FBTyxDQUFDSSxRQUFSLENBQWlCQyxHQUFwQyxFQUF5QyxJQUF6QztBQUNILENBcElMIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxvZ2luX2ZyYW1lOiBjYy5QcmVmYWIsICAgICAgICAgLy/nmbvlhaXnlYzpnaJcclxuICAgICAgICB1cGRhdGVfZnJhbWU6IGNjLlByZWZhYiwgICAgICAgIC8v54Ot5pu055WM6Z2iXHJcbiAgICAgICAgdXBkYXRlX2JhZzogY2MuUHJlZmFiLCAgICAgICAgICAvL+eDreabtOW6leWMhVxyXG4gICAgICAgIGxvZ2luX2xvZ286IGNjLlByZWZhYiwgICAgICAgICAgLy/mt7vliqBsb2dvXHJcbiAgICAgICAgY2xpY2tfYWN0aW9uOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgYnRuX2NsZWFudXBDYWNoZTogY2MuTm9kZSwgICAgICAvL+S/ruWkjeaMiemSrlxyXG4gICAgICAgIGJ0bl9zZXJpdmU6IGNjLk5vZGUsICAgICAgICAgICAgLy/lrqLmnI3mjInpkq5cclxuICAgICAgICBidG5fd2Vic2l0ZTogY2MuTm9kZSwgICAgICAgICAgIC8v5a6i5pyN5oyJ6ZKuXHJcbiAgICAgICAgYnRuX3dlYnNpdGU6IGNjLk5vZGUsICAgICAgICAgICAvL+WuouacjeaMiemSrlxyXG4gICAgICAgIGxvZ2luX3N3aXRjaDogW2NjLk5vZGVdLCAgICAgICAgLy/nmbvlvZXpobXpnaLljLrliIZcclxuICAgICAgICB2aWRlb01hc2s6IGNjLk5vZGUsXHJcbiAgICAgICAgdmlkZW9QbGF5ZXI6IGNjLlZpZGVvUGxheWVyLFxyXG4gICAgICAgIGNvaW5BcnJ2YWxUaXA6IGNjLlByZWZhYixcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5idG5fY2xlYW51cENhY2hlLmFjdGl2ZSA9IGNjLnN5cy5pc05hdGl2ZTtcclxuICAgICAgICBzdGFydEdhbWUoKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VVcmwgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlcnZpY2VVcmwnKSB8fCBnbEdhbWUuZ2FtZWNmZy5zZXJ2aWNlVXJsO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXNlcnVybGRhdGFcIiwgdGhpcy51cGRhdGVTZXJ2aWNlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLkhJREVfQ0xFQU5VUCwgdGhpcy5oaWRlQ2xlYW51cENhY2hlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLkRPV05MT0FELkJBRywgdGhpcy51cGRhdGViYWcsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldExvZ2luRnJhbWUoKTtcclxuXHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5ET1dOTE9BRC5FTkQsIHRoaXMub3BlbkxvZ2luLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCFjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiY2xpY2tfYWN0aW9uXCIpKSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuY2xpY2tfYWN0aW9uKS56SW5kZXggPSA5OTk5OTk7XHJcblxyXG4gICAgICAgIGxldCBpc0F1ZGlvUGxheSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzQXVkaW9QbGF5XCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5piv5ZCm5pKt5pS+6KeG6aKRIGlzQXVkaW9QbGF5ID09PT5cIiwgaXNBdWRpb1BsYXkpO1xyXG5cclxuICAgICAgICBpZiAoaXNBdWRpb1BsYXkgfHwgY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfV0lORE9XUyB8fCBjYy5zeXMuaXNCcm93c2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9QbGF5ZXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllckVuZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9QbGF5ZXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheUNhbGxGdW5jKHZpZGVvcGxheWVyLCBldmVudFR5cGUsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy52aWRlb1BsYXllci5ub2RlLmFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuVmlkZW9QbGF5ZXIuRXZlbnRUeXBlLlBMQVlJTkc6XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZpZGVvcGxheWVyID09PT4g6KGo56S66KeG6aKR5q2j5Zyo5pKt5pS+5Lit44CCXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9NYXNrLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSwgMC4xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLlZpZGVvUGxheWVyLkV2ZW50VHlwZS5QQVVTRUQ6XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZpZGVvcGxheWVyID09PT4g6KGo56S66KeG6aKR5pqC5YGc5pKt5pS+44CCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuVmlkZW9QbGF5ZXIuRXZlbnRUeXBlLlNUT1BQRUQ6XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZpZGVvcGxheWVyID09PT4g6KGo56S66KeG6aKR5bey57uP5YGc5q2i5pKt5pS+44CCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuVmlkZW9QbGF5ZXIuRXZlbnRUeXBlLkNPTVBMRVRFRDpcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmlkZW9wbGF5ZXIgPT09PiDooajnpLrop4bpopHmkq3mlL7lrozmiJDjgIJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvUGxheWVyRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5WaWRlb1BsYXllci5FdmVudFR5cGUuQ0xJQ0tFRDpcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmlkZW9wbGF5ZXIgPT09PiDooajnpLrop4bpopHooqvnlKjmiLfngrnlh7vkuobjgILvvIjlj6rmlK/mjIEgV2ViIOW5s+WPsO+8iVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLlZpZGVvUGxheWVyLkV2ZW50VHlwZS5SRUFEWV9UT19QTEFZOlxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2aWRlb3BsYXllciA9PT0+IOihqOekuuinhumikeWHhuWkh+WlveS6hu+8jOWPr+S7peW8gOWni+aSreaUvuS6huOAglwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLlZpZGVvUGxheWVyLkV2ZW50VHlwZS5NRVRBX0xPQURFRDpcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmlkZW9wbGF5ZXIgPT09PiDooajnpLrop4bpopHnmoTlhYPkv6Hmga/lt7LliqDovb3lrozmiJDvvIzkvaDlj6/ku6XosIPnlKggZ2V0RHVyYXRpb24g5p2l6I635Y+W6KeG6aKR5oC75pe26ZW/44CCXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9QbGF5ZXIuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9QbGF5ZXIucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMudmlkZW9QbGF5ZXJFbmQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYoZ2xHYW1lLmNvaW5BcnJhbCA9PSBudWxsKXtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmNvaW5BcnJ2YWxUaXApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdmlkZW9QbGF5ZXJFbmQoKXtcclxuICAgICAgICB0aGlzLnZpZGVvTWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZpZGVvUGxheWVyLm5vZGUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy51cGRhdGVfZnJhbWUsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlQYXRoQkdNKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGVDbGVhbnVwQ2FjaGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnRuX2NsZWFudXBDYWNoZSkgdGhpcy5idG5fY2xlYW51cENhY2hlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmJ0bl9zZXJpdmUpIHRoaXMuYnRuX3Nlcml2ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5idG5fd2Vic2l0ZSkgdGhpcy5idG5fd2Vic2l0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVTZXJ2aWNlKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5nZXQoJ3VybCcpLnNlcnZpY2VPdXRlcikgdGhpcy5zZXJ2aWNlVXJsID0gZ2xHYW1lLnVzZXIuZ2V0KCd1cmwnKS5zZXJ2aWNlT3V0ZXI7XHJcbiAgICB9LFxyXG4gICAgY2xlYW51cENhY2hlX2NiKCkge1xyXG4gICAgICAgIGNsZWFyR2FtZSgpO1xyXG4gICAgICAgIHRoaXMuYnRuX2NsZWFudXBDYWNoZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzZXJ2aWVyX2NiKCkge1xyXG4gICAgICAgIGNjLnN5cy5vcGVuVVJMKHRoaXMuc2VydmljZVVybCk7XHJcbiAgICB9LFxyXG4gICAgc2Vydmllcl9jYigpIHtcclxuICAgICAgICBjYy5zeXMub3BlblVSTCh0aGlzLnNlcnZpY2VVcmwpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Mb2dpbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRpbmdfbG9nbycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmxvZ2luX2ZyYW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlYmFnKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy51cGRhdGVfYmFnKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0TG9naW5GcmFtZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiB0aGlzLmxvZ2luX3N3aXRjaCkgdGhpcy5sb2dpbl9zd2l0Y2hbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBsb2dpbl9ub2RlID0gdGhpcy5sb2dpbl9zd2l0Y2hbZ2xHYW1lLmdhbWVjZmcubG9naW5Td2l0Y2hdO1xyXG4gICAgICAgIGxvZ2luX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXMubG9naW5fbG9nbywgbG9naW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvYWRpbmdfbG9nb1wiKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ISURFX0NMRUFOVVAsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLkRPV05MT0FELkVORCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuRE9XTkxPQUQuQkFHLCB0aGlzKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
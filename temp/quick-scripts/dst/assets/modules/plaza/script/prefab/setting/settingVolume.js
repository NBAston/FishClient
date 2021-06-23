
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/setting/settingVolume.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c7617BjBlHqbFj+Nf252Il', 'settingVolume');
// modules/plaza/script/prefab/setting/settingVolume.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {
    spBar: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    this.initUI();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "musicswitch":
        this.onMusicToggle();
        break;

      case "effectswitch":
        this.onEffectToggle();
        break;

      case "btn_change":
        glGame.panel.showPanelByName("exitAcc");
        break;

      case "btn_login":
        glGame.panel.showRegister();
        break;
    }
  },
  onMusicProcess: function onMusicProcess() {
    var process = this.musicSlider.getComponent(cc.Slider).progress;
    this.musicSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = process;
    glGame.audio.setBGMVolume(process);

    if (!this.musicToggle.isChecked) {
      this.setToggle(this.musicToggle, true);
      glGame.audio.openBGM();
      this.setSliderState(this.musicSlider, 0);
    }
  },
  onEffectProcess: function onEffectProcess() {
    var process = this.effectSlider.getComponent(cc.Slider).progress;
    this.effectSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = process;
    glGame.audio.setSoundEffectVolume(process);

    if (!this.effectToggle.isChecked) {
      this.setToggle(this.effectToggle, true);
      glGame.audio.openSE();
      this.setSliderState(this.effectSlider, 0);
    }
  },
  initUI: function initUI() {
    this.bInit = false; // 如果是游客 隐藏切换账号按钮

    if (glGame.user.isTourist()) {
      this.node.getChildByName("btn_login").active = true;
    } else {
      this.node.getChildByName("btn_change").active = true;
    } // 玩家信息


    var userinfo = this.node.getChildByName("userinfo"); // 设置头像

    var headImage = userinfo.getChildByName("img_head");
    glGame.panel.showHeadImage(headImage, glGame.user.get("headURL")); // 设置账号

    userinfo.getChildByName("account").getComponent(cc.Label).string = glGame.user.get("userName") || ""; // 设置昵称

    userinfo.getChildByName("nickbg").getChildByName("nick").getComponent(cc.Label).string = glGame.user.get("nickname") || ""; // vip等级

    var lab_userVip = userinfo.getChildByName("vip_bg").getChildByName("lab_userVip");
    lab_userVip.getComponent(cc.Label).string = glGame.user.get("vip_name");

    if (glGame.user.isTourist()) {
      userinfo.getChildByName("vip_bg").active = false;
      userinfo.getChildByName("nickbg").active = false;
      userinfo.getChildByName("account").getComponent(cc.Label).string = "未登录";
    } // 音量信息


    var volume = this.node.getChildByName("volume");
    this.musicToggle = volume.getChildByName("musicswitch").getComponent(cc.Toggle);
    this.effectToggle = volume.getChildByName("effectswitch").getComponent(cc.Toggle);
    this.musicSlider = volume.getChildByName("musicslider");
    this.effectSlider = volume.getChildByName("effectslider");
    var BGMSE = glGame.audio.get("BGMSE");
    this.setToggle(this.musicToggle, BGMSE["BGMPlayState"]);
    this.setToggle(this.effectToggle, BGMSE["SoundEffectPlayState"]);

    if (BGMSE["BGMPlayState"]) {
      this.setSliderState(this.musicSlider, 0);
    } else {
      this.setSliderState(this.musicSlider, 1);
    }

    if (BGMSE["SoundEffectPlayState"]) {
      this.setSliderState(this.effectSlider, 0);
    } else {
      this.setSliderState(this.effectSlider, 1);
    }

    this.musicSlider.getComponent(cc.Slider).progress = BGMSE["BGMVolume"];
    this.effectSlider.getComponent(cc.Slider).progress = BGMSE["SoundEffectVolume"];
    this.musicSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
    this.effectSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];
    this.bInit = true;
  },
  OnClickToggle: function OnClickToggle(event) {
    if (!this.bInit) {
      return;
    }

    var buttonName = event.node.name;
    var buttonNode = event.node;
    console.log("\u70B9\u51FB\u4E86toggle -> ".concat(buttonName));
    glGame.audio.playLoadSoundEffectByPath("select");
    this.onClick(buttonName, buttonNode);
  },
  onMusicToggle: function onMusicToggle() {
    if (!this.bInit) {
      return;
    }

    var isChecked = this.musicToggle.isChecked;
    this.setToggle(this.musicToggle, isChecked);
    if (isChecked) glGame.audio.openBGM();else glGame.audio.closeBGM();

    if (isChecked) {
      this.setSliderState(this.musicSlider, 0);
    } else {
      this.setSliderState(this.musicSlider, 1);
    }
  },
  onEffectToggle: function onEffectToggle() {
    if (!this.bInit) {
      return;
    }

    var isChecked = this.effectToggle.isChecked;
    this.setToggle(this.effectToggle, isChecked);
    if (isChecked) glGame.audio.openSE();else glGame.audio.closeSE();

    if (isChecked) {
      this.setSliderState(this.effectSlider, 0);
    } else {
      this.setSliderState(this.effectSlider, 1);
    }
  },
  setToggle: function setToggle(toggle, isOn) {
    toggle.isChecked = isOn;
    var iconChouma = toggle.node.getChildByName("Background").getChildByName("img_chouma");
    iconChouma.active = !isOn;
  },
  setSliderState: function setSliderState(node, state) {
    var bar = node.getChildByName("progressBar").getChildByName("bar");
    bar.getComponent(cc.Sprite).spriteFrame = this.spBar[state];
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.showInfo, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzZXR0aW5nXFxzZXR0aW5nVm9sdW1lLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzcEJhciIsImNjIiwiU3ByaXRlRnJhbWUiLCJvbkxvYWQiLCJpbml0VUkiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJvbk11c2ljVG9nZ2xlIiwib25FZmZlY3RUb2dnbGUiLCJwYW5lbCIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dSZWdpc3RlciIsIm9uTXVzaWNQcm9jZXNzIiwicHJvY2VzcyIsIm11c2ljU2xpZGVyIiwiZ2V0Q29tcG9uZW50IiwiU2xpZGVyIiwicHJvZ3Jlc3MiLCJnZXRDaGlsZEJ5TmFtZSIsIlByb2dyZXNzQmFyIiwiYXVkaW8iLCJzZXRCR01Wb2x1bWUiLCJtdXNpY1RvZ2dsZSIsImlzQ2hlY2tlZCIsInNldFRvZ2dsZSIsIm9wZW5CR00iLCJzZXRTbGlkZXJTdGF0ZSIsIm9uRWZmZWN0UHJvY2VzcyIsImVmZmVjdFNsaWRlciIsInNldFNvdW5kRWZmZWN0Vm9sdW1lIiwiZWZmZWN0VG9nZ2xlIiwib3BlblNFIiwiYkluaXQiLCJ1c2VyIiwiaXNUb3VyaXN0IiwiYWN0aXZlIiwidXNlcmluZm8iLCJoZWFkSW1hZ2UiLCJzaG93SGVhZEltYWdlIiwiZ2V0IiwiTGFiZWwiLCJzdHJpbmciLCJsYWJfdXNlclZpcCIsInZvbHVtZSIsIlRvZ2dsZSIsIkJHTVNFIiwiT25DbGlja1RvZ2dsZSIsImV2ZW50IiwiYnV0dG9uTmFtZSIsImJ1dHRvbk5vZGUiLCJjb25zb2xlIiwibG9nIiwicGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aCIsImNsb3NlQkdNIiwiY2xvc2VTRSIsInRvZ2dsZSIsImlzT24iLCJpY29uQ2hvdW1hIiwic3RhdGUiLCJiYXIiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInJlZ2lzdGVyRXZlbnQiLCJlbWl0dGVyIiwib24iLCJNRVNTQUdFIiwiVUkiLCJBQ1RJT05fRU5EIiwic2hvd0luZm8iLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUlBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFLENBQUNDLEVBQUUsQ0FBQ0MsV0FBSjtBQURDLEdBRFE7QUFLcEJDLEVBQUFBLE1BTG9CLG9CQUtYO0FBQ0wsU0FBS0MsTUFBTDtBQUNILEdBUG1CO0FBU3BCQyxFQUFBQSxPQVRvQixtQkFTWkMsSUFUWSxFQVNOQyxJQVRNLEVBU0E7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssYUFBTDtBQUNJLGFBQUtFLGFBQUw7QUFDQTs7QUFDSixXQUFLLGNBQUw7QUFDSSxhQUFLQyxjQUFMO0FBQ0E7O0FBQ0osV0FBSyxZQUFMO0FBQ0liLFFBQUFBLE1BQU0sQ0FBQ2MsS0FBUCxDQUFhQyxlQUFiLENBQTZCLFNBQTdCO0FBQ0E7O0FBQ0osV0FBSyxXQUFMO0FBQ0lmLFFBQUFBLE1BQU0sQ0FBQ2MsS0FBUCxDQUFhRSxZQUFiO0FBQ0E7QUFaUjtBQWNILEdBeEJtQjtBQTBCcEJDLEVBQUFBLGNBMUJvQiw0QkEwQkY7QUFDZCxRQUFJQyxPQUFPLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsWUFBakIsQ0FBOEJmLEVBQUUsQ0FBQ2dCLE1BQWpDLEVBQXlDQyxRQUF2RDtBQUNBLFNBQUtILFdBQUwsQ0FBaUJJLGNBQWpCLENBQWdDLGFBQWhDLEVBQStDSCxZQUEvQyxDQUE0RGYsRUFBRSxDQUFDbUIsV0FBL0QsRUFBNEVGLFFBQTVFLEdBQXVGSixPQUF2RjtBQUNBbEIsSUFBQUEsTUFBTSxDQUFDeUIsS0FBUCxDQUFhQyxZQUFiLENBQTBCUixPQUExQjs7QUFFQSxRQUFHLENBQUMsS0FBS1MsV0FBTCxDQUFpQkMsU0FBckIsRUFBZ0M7QUFD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QUw7QUFDSDtBQTNMbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDorr7nva5cclxuICovXHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BCYXI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIm11c2ljc3dpdGNoXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTXVzaWNUb2dnbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZWZmZWN0c3dpdGNoXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRWZmZWN0VG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jaGFuZ2VcIjpcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleGl0QWNjXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbG9naW5cIjpcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25NdXNpY1Byb2Nlc3MgKCkge1xyXG4gICAgICAgIGxldCBwcm9jZXNzID0gdGhpcy5tdXNpY1NsaWRlci5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcztcclxuICAgICAgICB0aGlzLm11c2ljU2xpZGVyLmdldENoaWxkQnlOYW1lKFwicHJvZ3Jlc3NCYXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHByb2Nlc3M7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnNldEJHTVZvbHVtZShwcm9jZXNzKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMubXVzaWNUb2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlKHRoaXMubXVzaWNUb2dnbGUsIHRydWUpO1xyXG4gICAgICAgICAgICBnbEdhbWUuYXVkaW8ub3BlbkJHTSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNsaWRlclN0YXRlKHRoaXMubXVzaWNTbGlkZXIsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FZmZlY3RQcm9jZXNzKCkge1xyXG4gICAgICAgIGxldCBwcm9jZXNzID0gdGhpcy5lZmZlY3RTbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3M7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTbGlkZXIuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc0JhclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gcHJvY2VzcztcclxuICAgICAgICBnbEdhbWUuYXVkaW8uc2V0U291bmRFZmZlY3RWb2x1bWUocHJvY2Vzcyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmVmZmVjdFRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICB0aGlzLnNldFRvZ2dsZSh0aGlzLmVmZmVjdFRvZ2dsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGdsR2FtZS5hdWRpby5vcGVuU0UoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJTdGF0ZSh0aGlzLmVmZmVjdFNsaWRlciwgMCk7IFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFVJKCkge1xyXG5cclxuICAgICAgICB0aGlzLmJJbml0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIOWmguaenOaYr+a4uOWuoiDpmpDol4/liIfmjaLotKblj7fmjInpkq5cclxuICAgICAgICBpZihnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fbG9naW5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fY2hhbmdlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDnjqnlrrbkv6Hmga9cclxuICAgICAgICBsZXQgdXNlcmluZm8gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VyaW5mb1wiKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u5aS05YOPXHJcbiAgICAgICAgbGV0IGhlYWRJbWFnZSA9IHVzZXJpbmZvLmdldENoaWxkQnlOYW1lKFwiaW1nX2hlYWRcIik7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dIZWFkSW1hZ2UoaGVhZEltYWdlLCBnbEdhbWUudXNlci5nZXQoXCJoZWFkVVJMXCIpKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u6LSm5Y+3XHJcbiAgICAgICAgdXNlcmluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJhY2NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZ2xHYW1lLnVzZXIuZ2V0KFwidXNlck5hbWVcIikgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgLy8g6K6+572u5pi156ewXHJcbiAgICAgICAgdXNlcmluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZ2xHYW1lLnVzZXIuZ2V0KFwibmlja25hbWVcIikgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgLy8gdmlw562J57qnXHJcbiAgICAgICAgbGV0IGxhYl91c2VyVmlwID0gdXNlcmluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJ2aXBfYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdXNlclZpcFwiKTtcclxuICAgICAgICBsYWJfdXNlclZpcC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdsR2FtZS51c2VyLmdldChcInZpcF9uYW1lXCIpO1xyXG5cclxuICAgICAgICBpZihnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICB1c2VyaW5mby5nZXRDaGlsZEJ5TmFtZShcInZpcF9iZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdXNlcmluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrYmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVzZXJpbmZvLmdldENoaWxkQnlOYW1lKFwiYWNjb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5pyq55m75b2VXCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8g6Z+z6YeP5L+h5oGvXHJcbiAgICAgICAgbGV0IHZvbHVtZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZvbHVtZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tdXNpY1RvZ2dsZSA9IHZvbHVtZS5nZXRDaGlsZEJ5TmFtZShcIm11c2ljc3dpdGNoXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0VG9nZ2xlID0gdm9sdW1lLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0c3dpdGNoXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNTbGlkZXIgPSB2b2x1bWUuZ2V0Q2hpbGRCeU5hbWUoXCJtdXNpY3NsaWRlclwiKTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNsaWRlciA9IHZvbHVtZS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdHNsaWRlclwiKTtcclxuXHJcbiAgICAgICAgbGV0IEJHTVNFID0gZ2xHYW1lLmF1ZGlvLmdldChcIkJHTVNFXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0VG9nZ2xlKHRoaXMubXVzaWNUb2dnbGUsIEJHTVNFW1wiQkdNUGxheVN0YXRlXCJdKTtcclxuICAgICAgICB0aGlzLnNldFRvZ2dsZSh0aGlzLmVmZmVjdFRvZ2dsZSwgQkdNU0VbXCJTb3VuZEVmZmVjdFBsYXlTdGF0ZVwiXSk7XHJcblxyXG4gICAgICAgIGlmKEJHTVNFW1wiQkdNUGxheVN0YXRlXCJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyU3RhdGUodGhpcy5tdXNpY1NsaWRlciwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJTdGF0ZSh0aGlzLm11c2ljU2xpZGVyLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKEJHTVNFW1wiU291bmRFZmZlY3RQbGF5U3RhdGVcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJTdGF0ZSh0aGlzLmVmZmVjdFNsaWRlciwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJTdGF0ZSh0aGlzLmVmZmVjdFNsaWRlciwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm11c2ljU2xpZGVyLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzID0gQkdNU0VbXCJCR01Wb2x1bWVcIl07XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSBCR01TRVtcIlNvdW5kRWZmZWN0Vm9sdW1lXCJdO1xyXG4gICAgICAgIHRoaXMubXVzaWNTbGlkZXIuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc0JhclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gQkdNU0VbXCJCR01Wb2x1bWVcIl07XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTbGlkZXIuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc0JhclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gQkdNU0VbXCJTb3VuZEVmZmVjdFZvbHVtZVwiXTtcclxuXHJcbiAgICAgICAgdGhpcy5iSW5pdCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uQ2xpY2tUb2dnbGUoZXZlbnQpIHtcclxuICAgICAgICBpZighdGhpcy5iSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnV0dG9uTmFtZSA9IGV2ZW50Lm5vZGUubmFtZTtcclxuICAgICAgICBsZXQgYnV0dG9uTm9kZSA9IGV2ZW50Lm5vZGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYOeCueWHu+S6hnRvZ2dsZSAtPiAke2J1dHRvbk5hbWV9YCk7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrKGJ1dHRvbk5hbWUsIGJ1dHRvbk5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbk11c2ljVG9nZ2xlKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmJJbml0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSB0aGlzLm11c2ljVG9nZ2xlLmlzQ2hlY2tlZDtcclxuICAgICAgICB0aGlzLnNldFRvZ2dsZSh0aGlzLm11c2ljVG9nZ2xlLCBpc0NoZWNrZWQpO1xyXG4gICAgICAgIGlmIChpc0NoZWNrZWQpIGdsR2FtZS5hdWRpby5vcGVuQkdNKCk7XHJcbiAgICAgICAgZWxzZSBnbEdhbWUuYXVkaW8uY2xvc2VCR00oKTtcclxuXHJcbiAgICAgICAgaWYoaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyU3RhdGUodGhpcy5tdXNpY1NsaWRlciwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJTdGF0ZSh0aGlzLm11c2ljU2xpZGVyLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRWZmZWN0VG9nZ2xlKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmJJbml0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSB0aGlzLmVmZmVjdFRvZ2dsZS5pc0NoZWNrZWQ7XHJcbiAgICAgICAgdGhpcy5zZXRUb2dnbGUodGhpcy5lZmZlY3RUb2dnbGUsIGlzQ2hlY2tlZCk7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkgZ2xHYW1lLmF1ZGlvLm9wZW5TRSgpO1xyXG4gICAgICAgIGVsc2UgZ2xHYW1lLmF1ZGlvLmNsb3NlU0UoKTtcclxuXHJcbiAgICAgICAgaWYoaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyU3RhdGUodGhpcy5lZmZlY3RTbGlkZXIsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyU3RhdGUodGhpcy5lZmZlY3RTbGlkZXIsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG9nZ2xlKHRvZ2dsZSwgaXNPbikge1xyXG4gICAgICAgIHRvZ2dsZS5pc0NoZWNrZWQgPSBpc09uO1xyXG5cclxuICAgICAgICBsZXQgaWNvbkNob3VtYSA9IHRvZ2dsZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcImltZ19jaG91bWFcIik7XHJcbiAgICAgICAgaWNvbkNob3VtYS5hY3RpdmUgPSAhaXNPbjtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0U2xpZGVyU3RhdGUobm9kZSwgc3RhdGUpIHtcclxuICAgICAgICBsZXQgYmFyID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzQmFyXCIpLmdldENoaWxkQnlOYW1lKFwiYmFyXCIpO1xyXG4gICAgICAgIGJhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BCYXJbc3RhdGVdO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDms6jlhoznlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcy5zaG93SW5mbywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmUgOavgeeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihgJHt0aGlzLm5vZGUubmFtZX0ke01FU1NBR0UuVUkuQUNUSU9OX0VORH1gLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
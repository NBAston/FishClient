
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/moreButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8b736ddRZIoJbhwx5rWdu9', 'moreButton');
// modules/plaza/script/prefab/moreButton.js

"use strict";

glGame.baseclass.extend({
  properties: {
    btn_bind: cc.Node,
    btn_lucky: cc.Node,
    btn_yuebao: cc.Node,
    btn_sign: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    glGame.emitter.on("updatePlazaSwitch", this.updatePlazaSwitch, this);
    this.btn_lucky.active = glGame.user.dialSwitch == 1;
    this.btn_bind.active = glGame.user.bindPhoneFirst == 0;

    if (glGame.user.isTourist()) {
      this.btn_bind.active = glGame.user.bind_phone_gold == 0 ? false : true;
    } else {
      if (glGame.user.phone != 0 || glGame.user.is_receive_register_phone_coin == 1 || glGame.user.bind_phone_gold == 0) {
        this.btn_bind.active = false;
      } else {
        this.btn_bind.active = true;
      }
    }

    this.reqRedDot();
    this.updatePlazaSwitch();
  },
  updatePlazaSwitch: function updatePlazaSwitch() {
    this.btn_sign.active = glGame.user.signinSwitch == 1;
  },
  reqRedDot: function reqRedDot(data) {
    if (!data) data = glGame.user.get('redDotData');
    var count = 0;

    for (var i in data) {
      count++;
    }

    ;
    if (count == 0) return;
    this.btn_lucky.getChildByName("redMark").active = data['dialRed'] == 1;
    this.btn_yuebao.getChildByName("redMark").active = data['payingReq'] == 1;
    this.btn_sign.getChildByName("redMark").active = data['signinReq'] == 1;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_lucky":
        this.click_lucky();
        break;

      case "btn_bind":
        this.click_bindPhone();
        break;

      case "btn_sign":
        this.click_sign();
        break;

      case "btn_yuebao":
        this.click_yuebao();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },
  click_lucky: function click_lucky() {
    if (glGame.panel.showSuspicious("point_treasure")) {
      return;
    }

    glGame.panel.showPanelByName("luckDraw");
  },
  click_bindPhone: function click_bindPhone() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.panel.showPanelByName("bindPhone");
  },
  click_sign: function click_sign() {
    if (glGame.panel.showSuspicious("receive_Signin_award")) {
      return;
    }

    glGame.panel.showPanelByName('signin');
  },
  click_yuebao: function click_yuebao() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("balance")) {
      return;
    }

    glGame.panel.showPanelByName('yubao');
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("updatePlazaSwitch", this);
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxtb3JlQnV0dG9uLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJidG5fYmluZCIsImNjIiwiTm9kZSIsImJ0bl9sdWNreSIsImJ0bl95dWViYW8iLCJidG5fc2lnbiIsIm9uTG9hZCIsImVtaXR0ZXIiLCJvbiIsInVwZGF0ZVBsYXphU3dpdGNoIiwiYWN0aXZlIiwidXNlciIsImRpYWxTd2l0Y2giLCJiaW5kUGhvbmVGaXJzdCIsImlzVG91cmlzdCIsImJpbmRfcGhvbmVfZ29sZCIsInBob25lIiwiaXNfcmVjZWl2ZV9yZWdpc3Rlcl9waG9uZV9jb2luIiwicmVxUmVkRG90Iiwic2lnbmluU3dpdGNoIiwiZGF0YSIsImdldCIsImNvdW50IiwiaSIsImdldENoaWxkQnlOYW1lIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xpY2tfbHVja3kiLCJjbGlja19iaW5kUGhvbmUiLCJjbGlja19zaWduIiwiY2xpY2tfeXVlYmFvIiwiY29uc29sZSIsImVycm9yIiwicmVtb3ZlIiwicGFuZWwiLCJzaG93U3VzcGljaW91cyIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dSZWdpc3RlcmVkR2lmdCIsIk9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUMsRUFBRSxDQUFDQyxJQURMO0FBRVJDLElBQUFBLFNBQVMsRUFBRUYsRUFBRSxDQUFDQyxJQUZOO0FBR1JFLElBQUFBLFVBQVUsRUFBRUgsRUFBRSxDQUFDQyxJQUhQO0FBSVJHLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDQztBQUpMLEdBRlE7QUFTcEI7QUFFQUksRUFBQUEsTUFYb0Isb0JBV1Y7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clxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnRuX2JpbmQ6IGNjLk5vZGUsXHJcbiAgICAgICAgYnRuX2x1Y2t5OiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ0bl95dWViYW86IGNjLk5vZGUsXHJcbiAgICAgICAgYnRuX3NpZ246IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVQbGF6YVN3aXRjaFwiLCB0aGlzLnVwZGF0ZVBsYXphU3dpdGNoLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bl9sdWNreS5hY3RpdmUgPSBnbEdhbWUudXNlci5kaWFsU3dpdGNoID09IDE7XHJcbiAgICAgICAgdGhpcy5idG5fYmluZC5hY3RpdmUgPSBnbEdhbWUudXNlci5iaW5kUGhvbmVGaXJzdCA9PSAwO1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9iaW5kLmFjdGl2ZSA9IGdsR2FtZS51c2VyLmJpbmRfcGhvbmVfZ29sZCA9PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChnbEdhbWUudXNlci5waG9uZSAhPSAwIHx8IGdsR2FtZS51c2VyLmlzX3JlY2VpdmVfcmVnaXN0ZXJfcGhvbmVfY29pbiA9PSAxIHx8IGdsR2FtZS51c2VyLmJpbmRfcGhvbmVfZ29sZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9iaW5kLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9iaW5kLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcVJlZERvdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxhemFTd2l0Y2goKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUGxhemFTd2l0Y2goKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc2lnbi5hY3RpdmUgPSBnbEdhbWUudXNlci5zaWduaW5Td2l0Y2ggPT0gMTtcclxuICAgIH0sXHJcbiAgICByZXFSZWREb3QoZGF0YSkge1xyXG4gICAgICAgIGlmICghZGF0YSkgZGF0YSA9IGdsR2FtZS51c2VyLmdldCgncmVkRG90RGF0YScpO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBkYXRhKSB7IGNvdW50KysgfTtcclxuICAgICAgICBpZiAoY291bnQgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYnRuX2x1Y2t5LmdldENoaWxkQnlOYW1lKFwicmVkTWFya1wiKS5hY3RpdmUgPSBkYXRhWydkaWFsUmVkJ10gPT0gMTtcclxuICAgICAgICB0aGlzLmJ0bl95dWViYW8uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRNYXJrXCIpLmFjdGl2ZSA9IGRhdGFbJ3BheWluZ1JlcSddID09IDE7XHJcbiAgICAgICAgdGhpcy5idG5fc2lnbi5nZXRDaGlsZEJ5TmFtZShcInJlZE1hcmtcIikuYWN0aXZlID0gZGF0YVsnc2lnbmluUmVxJ10gPT0gMTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9sdWNreVwiOiB0aGlzLmNsaWNrX2x1Y2t5KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JpbmRcIjogdGhpcy5jbGlja19iaW5kUGhvbmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc2lnblwiOiB0aGlzLmNsaWNrX3NpZ24oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5feXVlYmFvXCI6IHRoaXMuY2xpY2tfeXVlYmFvKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19sdWNreSgpe1xyXG4gICAgICAgIGlmIChnbEdhbWUucGFuZWwuc2hvd1N1c3BpY2lvdXMoXCJwb2ludF90cmVhc3VyZVwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJsdWNrRHJhd1wiKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19iaW5kUGhvbmUoKXtcclxuICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwiYmluZFBob25lXCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX3NpZ24oKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS5wYW5lbC5zaG93U3VzcGljaW91cyhcInJlY2VpdmVfU2lnbmluX2F3YXJkXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZSgnc2lnbmluJyk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfeXVlYmFvKCl7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdsR2FtZS5wYW5lbC5zaG93U3VzcGljaW91cyhcImJhbGFuY2VcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKCd5dWJhbycpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVQbGF6YVN3aXRjaFwiLCB0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
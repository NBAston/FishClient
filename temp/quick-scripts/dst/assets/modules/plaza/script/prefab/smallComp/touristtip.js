
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/smallComp/touristtip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fabd19jIlC16vLNnXtC7XY', 'touristtip');
// modules/plaza/script/prefab/smallComp/touristtip.js

"use strict";

glGame.baseclass.extend({
  properties: {
    audio: {
      type: cc.AudioClip,
      "default": null
    },
    node_confirm: cc.Node,
    sp_apear: sp.Skeleton
  },
  onLoad: function onLoad() {
    var _this = this;

    this.node.zIndex = 1000;
    this.sp_apear.setAnimation(0, "animation1", false);
    this.sp_apear.setCompleteListener(function (trackEntry, loopCount) {
      _this.sp_apear.setAnimation(0, "animation2", true);
    });
    var register_gold = glGame.user.get('register_gold') == undefined ? 0 : glGame.user.get('register_gold'); //注册 赠送 金币数.

    var bind_phone_gold = glGame.user.get('bind_phone_gold') == undefined ? 0 : glGame.user.get('bind_phone_gold'); //绑定 手机 赠送金币数.

    var register_gold_type = glGame.user.get('register_gold_type') == undefined ? 2 : glGame.user.get('register_gold_type'); // 1元  2金币

    var coinType = register_gold_type == 2 ? "img_jb" : "img_yuan";

    if (bind_phone_gold > 0) {
      //  1.当后台有配置绑定手机礼金时，无论是否有配置注册礼金，文字显示：
      //      注册并且绑定手机后
      //         总共可获赠XXXX金币
      //         其中XXXX=注册礼金+绑定手机礼金
      this.node.getChildByName("oneView").active = true;
      this.node.getChildByName("oneView").getChildByName("layout").getChildByName(coinType).active = true;
      this.node.getChildByName("oneView").getChildByName("layout").getChildByName("label").getComponent(cc.Label).string = this.cutFloat(register_gold + bind_phone_gold);
    } else if (register_gold > 0 && bind_phone_gold == 0) {
      //   2.当后台只有配置注册礼金，没有配置绑定手机礼金时，文字显示：
      //      注册成为正式账号后
      //         立即赠送您XXXX金币
      //         其中XXXX=注册礼金
      this.node.getChildByName("twoView").active = true;
      this.node.getChildByName("twoView").getChildByName("layout").getChildByName(coinType).active = true;
      this.node.getChildByName("twoView").getChildByName("layout").getChildByName("label").getComponent(cc.Label).string = this.cutFloat(register_gold);
    } else if (register_gold == 0 && bind_phone_gold == 0) {
      //         3.当后台没有配置注册礼金和绑定礼金，文字显示：
      //      注册成为正式账号后
      //         可获得大量优惠奖励
      this.node.getChildByName("threeView").active = true;
    }

    this.node_confirm.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 0.95), cc.delayTime(0.2), cc.scaleTo(0.2, 1), cc.scaleTo(0.2, 1.05), cc.scaleTo(0.2, 1))));
  },
  start: function start() {
    if (this.node.getComponent(cc.Widget)) this.node.getComponent(cc.Widget).updateAlignment();

    if (this.isPlay) {
      glGame.audio.closeCurEffect();
      glGame.audio.playSoundEffect(this.audio, true);
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_cancel();
        break;

      case "confirm":
        this.click_confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_confirm: function click_confirm() {
    glGame.panel.showRegistration(true);
    this.remove();
  },
  click_cancel: function click_cancel() {
    glGame.panel.showFirstEnterPanel();
    if (this.isPlay) glGame.audio.closeCurEffect();
    this.remove();
  },
  cutFloat: function cutFloat(num) {
    return Number(num).div(100).toString();
  },
  OnDestroy: function OnDestroy() {
    this.node_confirm.stopAllActions();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzbWFsbENvbXBcXHRvdXJpc3R0aXAuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImF1ZGlvIiwidHlwZSIsImNjIiwiQXVkaW9DbGlwIiwibm9kZV9jb25maXJtIiwiTm9kZSIsInNwX2FwZWFyIiwic3AiLCJTa2VsZXRvbiIsIm9uTG9hZCIsIm5vZGUiLCJ6SW5kZXgiLCJzZXRBbmltYXRpb24iLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwidHJhY2tFbnRyeSIsImxvb3BDb3VudCIsInJlZ2lzdGVyX2dvbGQiLCJ1c2VyIiwiZ2V0IiwidW5kZWZpbmVkIiwiYmluZF9waG9uZV9nb2xkIiwicmVnaXN0ZXJfZ29sZF90eXBlIiwiY29pblR5cGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiY3V0RmxvYXQiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJzY2FsZVRvIiwiZGVsYXlUaW1lIiwic3RhcnQiLCJXaWRnZXQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJpc1BsYXkiLCJjbG9zZUN1ckVmZmVjdCIsInBsYXlTb3VuZEVmZmVjdCIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfY2FuY2VsIiwiY2xpY2tfY29uZmlybSIsImNvbnNvbGUiLCJlcnJvciIsInBhbmVsIiwic2hvd1JlZ2lzdHJhdGlvbiIsInJlbW92ZSIsInNob3dGaXJzdEVudGVyUGFuZWwiLCJudW0iLCJOdW1iZXIiLCJkaXYiLCJ0b1N0cmluZyIsIk9uRGVzdHJveSIsInN0b3BBbGxBY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFB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MEROL0IsSUExRE0sRUEwREE7QUFDaEIsWUFBUStCLElBQVI7QUFDSSxXQUFLLE9BQUw7QUFBYyxhQUFLQyxZQUFMO0FBQXFCOztBQUNuQyxXQUFLLFNBQUw7QUFBZ0IsYUFBS0MsYUFBTDtBQUFzQjs7QUFDdEM7QUFBU0MsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNKLElBQTNDO0FBSGI7QUFLSCxHQWhFbUI7QUFpRXBCRSxFQUFBQSxhQWpFb0IsMkJBaUVKO0FBQ1ovQyxJQUFBQSxNQUFNLENBQUNrRCxLQUFQLENBQWFDLGdCQUFiLENBQThCLElBQTlCO0FBQ0EsU0FBS0MsTUFBTDtBQUNILEdBcEVtQjtBQXFFcEJOLEVBQUFBLFlBckVvQiwwQkFxRUw7QUFDWDlDLElBQUFBLE1BQU0sQ0FBQ2tELEtBQVAsQ0FBYUcsbUJBQWI7QUFDQSxRQUFJLEtBQUtaLE1BQVQsRUFBaUJ6QyxNQUFNLENBQUNJLEtBQVAsQ0FBYXNDLGNBQWI7QUFDakIsU0FBS1UsTUFBTDtBQUNILEdBekVtQjtBQTBFcEJwQixFQUFBQSxRQTFFb0Isb0JBMEVYc0IsR0ExRVcsRUEwRU47QUFDVixXQUFRQyxNQUFNLENBQUNELEdBQUQsQ0FBTixDQUFZRSxHQUFaLENBQWdCLEdBQWhCLENBQUQsQ0FBdUJDLFFBQXZCLEVBQVA7QUFDSCxHQTVFbUI7QUE2RXBCQyxFQUFBQSxTQTdFb0IsdUJBNkVSO0FBQ1IsU0FBS2xELFlBQUwsQ0FBa0JtRCxjQUFsQjtBQUNIO0FBL0VtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9kZV9jb25maXJtOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNwX2FwZWFyOnNwLlNrZWxldG9uXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuc3BfYXBlYXIuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb24xXCIsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3BfYXBlYXIuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7dGhpcy5zcF9hcGVhci5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvbjJcIix0cnVlKTt9KVxyXG4gICAgICAgIGxldCByZWdpc3Rlcl9nb2xkID0gZ2xHYW1lLnVzZXIuZ2V0KCdyZWdpc3Rlcl9nb2xkJykgPT0gdW5kZWZpbmVkID8gMCA6IGdsR2FtZS51c2VyLmdldCgncmVnaXN0ZXJfZ29sZCcpOyAgLy/ms6jlhowg6LWg6YCBIOmHkeW4geaVsC5cclxuICAgICAgICBsZXQgYmluZF9waG9uZV9nb2xkID0gZ2xHYW1lLnVzZXIuZ2V0KCdiaW5kX3Bob25lX2dvbGQnKSA9PSB1bmRlZmluZWQgPyAwIDogZ2xHYW1lLnVzZXIuZ2V0KCdiaW5kX3Bob25lX2dvbGQnKTsgIC8v57uR5a6aIOaJi+acuiDotaDpgIHph5HluIHmlbAuXHJcbiAgICAgICAgbGV0IHJlZ2lzdGVyX2dvbGRfdHlwZSA9IGdsR2FtZS51c2VyLmdldCgncmVnaXN0ZXJfZ29sZF90eXBlJykgPT0gdW5kZWZpbmVkID8gMiA6IGdsR2FtZS51c2VyLmdldCgncmVnaXN0ZXJfZ29sZF90eXBlJyk7IC8vIDHlhYMgIDLph5HluIFcclxuXHJcbiAgICAgICAgbGV0IGNvaW5UeXBlID0gcmVnaXN0ZXJfZ29sZF90eXBlID09IDIgPyBcImltZ19qYlwiOlwiaW1nX3l1YW5cIjtcclxuICAgICAgICBpZihiaW5kX3Bob25lX2dvbGQgPiAwKXtcclxuICAgICAgICAgICAgLy8gIDEu5b2T5ZCO5Y+w5pyJ6YWN572u57uR5a6a5omL5py656S86YeR5pe277yM5peg6K665piv5ZCm5pyJ6YWN572u5rOo5YaM56S86YeR77yM5paH5a2X5pi+56S677yaXHJcbiAgICAgICAgICAgIC8vICAgICAg5rOo5YaM5bm25LiU57uR5a6a5omL5py65ZCOXHJcbiAgICAgICAgICAgIC8vICAgICAgICAg5oC75YWx5Y+v6I636LWgWFhYWOmHkeW4gVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIOWFtuS4rVhYWFg95rOo5YaM56S86YeRK+e7keWumuaJi+acuuekvOmHkVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbmVWaWV3XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9uZVZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoY29pblR5cGUpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9uZVZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuY3V0RmxvYXQocmVnaXN0ZXJfZ29sZCArIGJpbmRfcGhvbmVfZ29sZCk7XHJcbiAgICAgICAgfWVsc2UgaWYocmVnaXN0ZXJfZ29sZCA+IDAgJiYgYmluZF9waG9uZV9nb2xkID09IDApe1xyXG4gICAgICAgICAgICAvLyAgIDIu5b2T5ZCO5Y+w5Y+q5pyJ6YWN572u5rOo5YaM56S86YeR77yM5rKh5pyJ6YWN572u57uR5a6a5omL5py656S86YeR5pe277yM5paH5a2X5pi+56S677yaXHJcbiAgICAgICAgICAgIC8vICAgICAg5rOo5YaM5oiQ5Li65q2j5byP6LSm5Y+35ZCOXHJcbiAgICAgICAgICAgIC8vICAgICAgICAg56uL5Y2z6LWg6YCB5oKoWFhYWOmHkeW4gVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIOWFtuS4rVhYWFg95rOo5YaM56S86YeRXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR3b1ZpZXdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHdvVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShjb2luVHlwZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHdvVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChyZWdpc3Rlcl9nb2xkKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYoIHJlZ2lzdGVyX2dvbGQgPT0gMCAmJiBiaW5kX3Bob25lX2dvbGQgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgMy7lvZPlkI7lj7DmsqHmnInphY3nva7ms6jlhoznpLzph5Hlkoznu5HlrprnpLzph5HvvIzmloflrZfmmL7npLrvvJpcclxuICAgICAgICAgICAgLy8gICAgICDms6jlhozmiJDkuLrmraPlvI/otKblj7flkI5cclxuICAgICAgICAgICAgLy8gICAgICAgICDlj6/ojrflvpflpKfph4/kvJjmg6DlpZblirFcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGhyZWVWaWV3XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGVfY29uZmlybS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDAuOTUpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4yKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIDEpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwgMS4wNSksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLCAxKSxcclxuICAgICAgICApKSlcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KSkgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheSkge1xyXG4gICAgICAgICAgICBnbEdhbWUuYXVkaW8uY2xvc2VDdXJFZmZlY3QoKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlTb3VuZEVmZmVjdCh0aGlzLmF1ZGlvLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xpY2tfY2FuY2VsKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY29uZmlybVwiOiB0aGlzLmNsaWNrX2NvbmZpcm0oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbGlja19jb25maXJtKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0cmF0aW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfY2FuY2VsKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93Rmlyc3RFbnRlclBhbmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5KSBnbEdhbWUuYXVkaW8uY2xvc2VDdXJFZmZlY3QoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIGN1dEZsb2F0KG51bSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKG51bSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMubm9kZV9jb25maXJtLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
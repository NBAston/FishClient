"use strict";
cc._RF.push(module, 'b3643sJTWVGYrlICcduWdxK', 'exchangeWin');
// modules/plaza/script/prefab/withdrawal/exchangeWin.js

"use strict";

glGame.baseclass.extend({
  properties: {
    duihuanSpine: sp.Skeleton,
    closeNode: cc.Node,
    content: cc.Node,
    audio_exchangeSucceed: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {},
  start: function start() {},
  playSucceed: function playSucceed() {
    var _this = this;

    glGame.audio.playSoundEffect(this.audio_exchangeSucceed, true);
    this.duihuanSpine.setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : '';

      if (name === 'appears' || name === 'looping') {
        _this.closeNode.active = true;
        _this.content.active = true;

        _this.duihuanSpine.setAnimation(0, "looping", true); // 动画结束后执行自己的逻辑


        _this.node.getChildByName("content").getChildByName("img_qdd3fz").active = true;
        console.log('动画播放结束');
      }
    });
    this.duihuanSpine.setAnimation(0, "appears", false);
  },
  OnDestroy: function OnDestroy() {},
  duihuan_close: function duihuan_close() {
    this.remove();
  } // update (dt) {},

});

cc._RF.pop();
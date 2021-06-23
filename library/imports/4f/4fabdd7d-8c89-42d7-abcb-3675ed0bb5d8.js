"use strict";
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
"use strict";
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
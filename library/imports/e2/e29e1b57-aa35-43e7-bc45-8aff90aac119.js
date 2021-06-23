"use strict";
cc._RF.push(module, 'e29e1tXqjVD57xFiv+QqsEZ', 'bindPhone');
// modules/plaza/script/prefab/bindPhone/bindPhone.js

"use strict";

glGame.baseclass.extend({
  properties: {
    //绑定手机
    edit_bindPhoneNumber: cc.EditBox,
    edit_bindPhoneCode: cc.EditBox,
    btn_send: cc.Button,
    pic_send: cc.Node,
    lab_phoneCd: cc.Label,
    audio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.registerEvent();
    glGame.audio.playSoundEffect(this.audio);
    if (glGame.user.bindPhoneCodeState && glGame.user.bindPhoneVerifiCD > 0) this.bindPhoneCodeCD(glGame.user.bindPhoneVerifiCD);
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("bindPhoneCodeCD", this.bindPhoneCodeCD, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("bindPhoneCodeCD", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_bindPhoneSend":
        this.click_sendVerfic();
        break;

      case "btn_bindPhoneSure":
        this.bindPhoneSure_cb();
        break;

      case "close":
        this.remove();
        break;

      default:
        break;
    }
  },
  click_sendVerfic: function click_sendVerfic() {
    var phone = this.checkPhone(this.edit_bindPhoneNumber.string);
    if (!phone) return;
    glGame.user.reqBindPhoneCode({
      phone: phone,
      type: 1
    });
  },
  bindPhoneCodeCD: function bindPhoneCodeCD(msg) {
    if (glGame.user.get("bindPhoneCodeState") && msg > 0) {
      //绑定手机验证码倒计时
      this.btn_send.interactable = false;
      this.btn_send.node.getChildByName("img_liang").active = false;
      this.btn_send.node.getChildByName("img_an").active = true;
      this.pic_send.active = false;
      this.lab_phoneCd.node.active = true;
      this.lab_phoneCd.string = "".concat(msg, "\u79D2");
    } else {
      this.btn_send.node.getChildByName("img_liang").active = true;
      this.btn_send.node.getChildByName("img_an").active = false;
      this.btn_send.interactable = true;
      this.pic_send.active = true;
      this.lab_phoneCd.node.active = false;
    }
  },
  bindPhoneSure_cb: function bindPhoneSure_cb() {
    var _this = this;

    var phone = this.checkPhone(this.edit_bindPhoneNumber.string); //绑定手机确定

    if (!phone) return;
    if (this.edit_bindPhoneCode.string == "") return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICAEMPTY);
    var code = this.edit_bindPhoneCode.string;
    var reg = /^[0-9]{0,6}$/; //验证规则

    var verif = reg.test(Number(this.edit_bindPhoneCode.string));

    if (!verif) {
      return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
    } // this.edit_untiedCode.string='';


    glGame.gameNet.send_msg('http.reqBindPhone', {
      phone: phone,
      code: code
    }, function (route, msg) {
      if (msg.result) {
        glGame.user.phone = phone;

        if (msg.isReceive == true && glGame.user.is_receive_register_phone_coin == 0 && Number(glGame.user.get('bind_phone_gold')) > 0) {
          glGame.user.is_receive_register_phone_coin = 1;
          glGame.panel.showAwardBox(glGame.tips.USER.BIND.CONGRATULATE, [{
            type: glGame.awardtype.COIN,
            value: _this.cutFloat(Number(glGame.user.get('bind_phone_gold')))
          }]);
        }

        glGame.user.bindPhoneFirst = 1;
        glGame.emitter.emit("updateUserData");
        glGame.emitter.emit('updatePlazaSwitch');

        _this.bindPhoneCodeCD(0);

        glGame.panel.showTip(glGame.tips.USER.BIND.PHONE);

        _this.remove();
      }
    });
  },
  // 手机号码检查
  checkPhone: function checkPhone(acc) {
    if (!acc) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
      return null;
    }

    if (acc.length != 11) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONETYPE);
      return false;
    } //let reg = /^\d{11}$/; //验证规则


    var reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[0-9]\d{8}$/;
    var isacc_matcher = reg.test(acc);

    if (!isacc_matcher) {
      glGame.panel.showErrorTip(glGame.tips.USER.BIND.INVALIDPHONE);
      return false;
    }

    return acc;
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(num) {
    return Number(num).div(100).toString();
  }
});

cc._RF.pop();
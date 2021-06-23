"use strict";
cc._RF.push(module, '5b3b8tsl9tGoK/ZiaKJsH9+', 'shop');
// modules/public/script/shop/shop.js

"use strict";

glGame.baseclass.extend({
  properties: {
    audio: {
      type: cc.AudioClip,
      "default": null
    },
    shopNomalPanel: cc.Prefab,
    shopFastPanel: cc.Prefab,
    shopAgencyPanel: cc.Prefab,
    shoprecord: cc.Prefab,
    content: cc.Node,
    selecttoggle: cc.Node,
    spineAnim: cc.Node,
    audio_recharge: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.currBtn = null;
    this.publicList = {};
    this.publicList[glGame.pay.AGENCYPAY] = "agencypay"; // 1 '代理充值',

    this.publicList[glGame.pay.EXCLUSIVE] = "exclusivepay"; // 2 '专享闪付',

    this.publicList[glGame.pay.FASTPAY] = "fastpay"; // 3 '公司入款',

    this.publicList[glGame.pay.ALIPAY] = "alipay"; // 4 '支付宝充值',

    this.publicList[glGame.pay.WECHATPAY] = "wechatpay"; // 5 '微信充值',

    this.publicList[glGame.pay.BANKCARDPAY] = "bankcardpay"; // 6 '银行卡充值',

    this.publicList[glGame.pay.CLOUDPAY] = "cloudpay"; // 7 '云闪付充值',

    this.publicList[glGame.pay.JINGDONGPAY] = "jingdongpay"; // 8 '京东支付',

    this.publicList[glGame.pay.QQPAY] = "qqpay"; // 9 'QQ支付',

    this.PrefabList = {
      "agencypay": this.shopAgencyPanel,
      "alipay": this.shopNomalPanel,
      "wechatpay": this.shopNomalPanel,
      "bankcardpay": this.shopNomalPanel,
      "fastpay": this.shopNomalPanel,
      "cloudpay": this.shopNomalPanel,
      "jingdongpay": this.shopNomalPanel,
      "qqpay": this.shopNomalPanel
    };
    this.RecordData = {};
    glGame.audio.closeCurEffect();
    glGame.audio.playSoundEffect(this.audio, true);
    glGame.emitter.on("showShopUI", this.showUI, this);
    glGame.emitter.on("showSuccessAnim", this.showSuccessAnim, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.shopActionEnd, this);
    glGame.emitter.on("saveCodeToLocalShop", this.saveCodeToLocalShop, this);
    glGame.emitter.on("showrechargeRecord", this.btn_recordCB, this);
    glGame.panel.showEffectPariticle(this.node);
  },
  showUI: function showUI() {},
  showSuccessAnim: function showSuccessAnim(msg) {
    this.spineAnim.active = true;
    glGame.audio.playSoundEffect(this.audio_recharge);
    var skeleton = this.spineAnim.getChildByName("skeleton").getComponent(sp.Skeleton);
    skeleton.setAnimation(0, "appears", false);
    skeleton.setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : '';

      if (name === 'appears' || name === 'looping') {
        skeleton.setAnimation(0, "looping", true);
      }
    });
  },
  shopActionEnd: function shopActionEnd() {
    var _this = this;

    glGame.gameNet.send_msg('http.ReqPayClassList', {}, function (route, msg) {
      _this.PayTypeList = msg.result.data;
      _this.complaint = msg.result.complaint;

      _this.setOrder();
    });
  },
  saveCodeToLocalShop: function saveCodeToLocalShop() {},
  setOrder: function setOrder() {
    var iFirst = true;
    var btnList = this.node.getChildByName("btnList");

    for (var i = 0; i < this.PayTypeList.length; i++) {
      var object = cc.instantiate(btnList.getChildByName(this.publicList[this.PayTypeList[i].id]));
      if (!object) continue;
      object.parent = this.selecttoggle;
      object.x = 0;
      object.active = false;

      if (iFirst) {
        this.currBtn = object;
        this.currBtn.getChildByName("checkmark").active = true;
        this.click_Type(this.publicList[this.PayTypeList[i].id]);
      }

      iFirst = false;
      object.setSiblingIndex(i);
      object.getChildByName("recommend").active = this.PayTypeList[i].recommend != 0;
      object.getChildByName("freestaff").active = this.PayTypeList[i].giveProportion != 0;
      object.getChildByName("freestaff").getChildByName("num").getComponent(cc.Label).string = Number(this.PayTypeList[i].giveProportion).div(100) + "%";
    }

    glGame.panel.showEffectNode(this, this.selecttoggle, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close_eff":
        this.click_close();
        break;

      case "wechatpay":
      case "alipay":
      case "fastpay":
      case "exclusivepay":
      case "agencypay":
      case "bankcardpay":
      case "cloudpay":
      case "jingdongpay":
      case "qqpay":
        this.currBtn.getChildByName("checkmark").active = false;
        this.currBtn = node;
        this.currBtn.getChildByName("checkmark").active = true;
        this.click_Type(name);
        break;

      case "btn_fanhuishouye":
        this.btn_fanhuishouyeCB();
        break;

      case "btn_zaichongyici":
        this.btn_zaichongyiciCB();
        break;

      case "btn_record":
        this.btn_recordCB();
        break;

      case "btn_closeAni":
        this.spineAnim.active = false;
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  ReqPayType: function ReqPayType(typeId, name) {
    var _this2 = this;

    var Prefab = this.PrefabList[name];

    if (this.RecordData[typeId]) {
      var panel = glGame.panel.showChildPanel(Prefab, this.content);
      var script = panel.getComponent(Prefab.name);
      script.initUI(this.RecordData[typeId].result);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPayClass', {
      typeId: typeId
    }, function (route, msg) {
      var panel = glGame.panel.showChildPanel(Prefab, _this2.content);
      var script = panel.getComponent(Prefab.name);

      if (typeId == 1) {
        msg.result.complaint = _this2.complaint;
      }

      script.initUI(msg.result);
      _this2.RecordData[typeId] = msg;
    });
  },
  btn_recordCB: function btn_recordCB() {
    glGame.panel.showChildPanel(this.shoprecord, this.node);
  },
  btn_fanhuishouyeCB: function btn_fanhuishouyeCB() {
    this.remove();
  },
  btn_zaichongyiciCB: function btn_zaichongyiciCB() {
    this.spineAnim.active = false;
    this.spineAnim.getChildByName("img_czcg").active = false;
    this.spineAnim.getChildByName("img_rycp").active = false;
  },
  click_close: function click_close() {
    this.remove();
  },
  click_Type: function click_Type(name) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var index = this.getIndex(name);
    var id = this.PayTypeList[index].id;
    this.ReqPayType(id, name);
  },
  getIndex: function getIndex(name) {
    var payid = 0;

    for (var id in this.publicList) {
      if (this.publicList[id] == name) {
        payid = id;
        break;
      }
    }

    for (var index in this.PayTypeList) {
      if (this.PayTypeList[index].id == payid) {
        return index;
      }
    }
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("showShopUI", this);
    glGame.emitter.off("showSuccessAnim", this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
    glGame.emitter.off("saveCodeToLocalShop", this);
    glGame.emitter.off("showrechargeRecord", this);
  }
});

cc._RF.pop();
"use strict";
cc._RF.push(module, '869583tJERK55AK/Rtlf8hC', 'arrvalTip');
// modules/plaza/script/prefab/arrvalTip.js

"use strict";

//暂时-留存 -- 即将移除该类与相关预制
glGame.baseclass.extend({
  properties: {
    node_god: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //glGame.emitter.on(MESSAGE.UI.SCENE, this.refreshUi, this);
    // glGame.emitter.on("onCoinChanged", this.showArrvalTip, this);
    this.node.active = false;
  },
  start: function start() {},
  showArrvalTip: function showArrvalTip(msg) {// //抛弃保险柜的取和存的消息，已在原有回包中做自增自减
    // if (msg.type == "bankSave" || msg.type == "bankOut") return;
    // if (msg.type == 'bindPhoneReceive'){
    //     glGame.user.set('is_receive_register_phone_coin',1);
    //     glGame.emitter.emit("updatePlazaSwitch");
    // }
    // glGame.user.reqGetCoin()
    // let arrvalCoin = glGame.user.GoldTemp(msg.offset)
    // if (msg.type == "recharge") {
    //     //充值之后将首冲设为状态取消设置为1；
    //     glGame.user.set("userRecharge", {
    //         discount: glGame.user.get("userRecharge").discount,
    //         discount_max: glGame.user.get("userRecharge").discount_max,
    //         exists: 1
    //     })
    //     // glGame.panel.showGodOfWealth(this.node_god, arrvalCoin)
    //     glGame.emitter.emit(glGame.showGodOfWealth,{pos:3,coin:arrvalCoin});
    // }
  },
  OnDestroy: function OnDestroy() {// glGame.emitter.off("onCoinChanged", this);
  }
});

cc._RF.pop();
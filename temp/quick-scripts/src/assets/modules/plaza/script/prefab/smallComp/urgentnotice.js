"use strict";
cc._RF.push(module, '92db5EpweRL3rWECEeL7aWh', 'urgentnotice');
// modules/plaza/script/prefab/smallComp/urgentnotice.js

"use strict";

glGame.baseclass.extend({
  properties: {
    urgentnotice: cc.Node,
    content: cc.Label,
    tip_ctr: cc.Toggle,
    close_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // this.reqEmergentNotice();
    this.initEmergent();
    glGame.emitter.on("newrotice", this.newrotice, this);
  },
  onClick: function onClick(name, node) {
    console.log("这是当前按键的按钮名字", name);

    switch (name) {
      case "Background":
        // this.reqIgnoreEmergentNotice();
        break;

      case "close":
        if (this.tip_ctr.isChecked) {
          this.reqIgnoreEmergentNotice();
        }

        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
        this.urgentnotice.active = false;
        break;

      case "Tip_ctr":
        this.tip_ctr.node.getChildByName("Background").active = !this.tip_ctr.isChecked;
        break;
    }
  },
  newrotice: function newrotice() {
    this.reqEmergentNotice();
  },
  initEmergent: function initEmergent() {
    if (glGame.user.get('emergentNotice')) {
      if (glGame.user.get('emergentNotice').content) {
        this.urgentnotice.active = true;
        this.content.string = "".concat(glGame.user.get('emergentNotice').content);
      } else {
        this.urgentnotice.active = false;
        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
      }
    }
  },
  //紧急公告请求
  reqEmergentNotice: function reqEmergentNotice() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqEmergentNotice", {}, function (route, msg) {
      console.log("这是当前紧急公告的消息", msg);

      if (msg.result.content) {
        _this.urgentnotice.active = true;
        _this.content.string = "".concat(msg.result.content);
      } else {
        _this.urgentnotice.active = false;
        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
      }
    });
  },
  setTipCtr: function setTipCtr(bol) {
    this.tip_ctr.node.active = bol;
  },
  setClose: function setClose(bol) {
    this.close_node.active = bol;
  },
  //不显示紧急公告
  reqIgnoreEmergentNotice: function reqIgnoreEmergentNotice() {
    glGame.gameNet.send_msg("http.reqIgnoreEmergentNotice", {}, function (route, msg) {
      console.log("不再显示紧急公告请求成功");
    });
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("newrotice", this);
  }
});

cc._RF.pop();
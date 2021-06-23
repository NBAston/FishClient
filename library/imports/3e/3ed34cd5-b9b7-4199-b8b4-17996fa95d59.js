"use strict";
cc._RF.push(module, '3ed34zVubdBmbi0F5lvqV1Z', 'complainPanel');
// modules/public/script/shop/complainPanel.js

"use strict";

glGame.baseclass.extend({
  properties: {
    labReward: cc.Label //buttonLab: cc.Label,

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false;
    this.reqComplaintConfig();
  },
  reqComplaintConfig: function reqComplaintConfig() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqComplaintContact", null, function (route, data) {
      _this.Type = data.type; ///this.buttonLab.string = data.type == "qq" ? "复制并打开QQ" : "复制并打开微信";

      _this.labReward.string = _this.cutFloat(data.reward) + "元";
      _this.openUrl = data.url;
      console.log("链接地址", _this.openUrl);
      _this.node.active = true;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        console.log("close-------");
        this.remove();
        break;

      case "copy_open":
        this.copy_open();
        break;
    }
  },
  cutFloat: function cutFloat(num) {
    return this.getFloat(Number(num).div(100)).toString();
  },
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return value.toFixed(num);
    }
  },
  copy_open: function copy_open() {
    console.log("copy_open", this.openUrl);

    if (this.Type == "qq") {
      console.log("copy_open", this.openUrl); //cc.sys.openURL(this.openUrl)

      glGame.platform.openURL(this.openUrl);
    } else {
      glGame.platform.openURL("weixin://");
    }
  },
  OnDestroy: function OnDestroy() {},
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
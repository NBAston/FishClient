"use strict";
cc._RF.push(module, '89ba5AavA9JSqVxx0PI/DRM', 'notice');
// modules/plaza/script/prefab/smallComp/notice.js

"use strict";

/**
 * 公告面板
 */
glGame.baseclass.extend({
  properties: {
    noticecontent: cc.Label // 公告内容

  },
  onLoad: function onLoad() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqHorseRaceLamp", null, function (route, data) {
      _this.noticecontent.string = data.result.horse_race_lamp;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    glGame.panel.showInterface(); //判断是否要开启下一个界面

    this.remove();
  }
});

cc._RF.pop();
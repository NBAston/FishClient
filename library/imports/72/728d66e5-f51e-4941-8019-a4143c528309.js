"use strict";
cc._RF.push(module, '728d6bl9R5JQYAZpBQ8UoMJ', 'nfish_cloud');
// modules/games/nfish/script/prefab/nfish_cloud.js

"use strict";

//云
glGame.baseclass.extend({
  properties: {
    speed: {
      "default": 5,
      displayName: "速度",
      tooltip: "云朵运动速度",
      type: cc.Integer
    },
    way: {
      "default": 1,
      displayName: "方向",
      tooltip: "1从左到右，-1从右到左",
      type: cc.Integer
    }
  },
  "extends": cc.Component,
  update: function update(dt) {
    if (this.way === 1) {
      this.node.x += dt * this.speed;

      if (this.node.x > cc.winSize.width / 2) {
        this.node.x = -(cc.winSize.width / 2 + 100);
      }
    } else {
      this.node.x -= dt * this.speed;

      if (this.node.x < -cc.winSize.width / 2) {
        this.node.x = cc.winSize.width / 2 + 100;
      }
    }
  }
});

cc._RF.pop();
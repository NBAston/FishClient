"use strict";
cc._RF.push(module, 'e0229X7c9hGVpJDrfvibxD8', 'edgeFlow');
// modules/public/script/effect/edgeFlow.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    startdelay: 0,
    // 开始延迟
    interval: 3.5,
    // 时间间隔
    duration: 1.25,
    // 流光移动时间
    lightwidth: 0.25,
    // 流光宽度(百分比)
    direction: 1,
    // 方向  1： 从左到右 2: 从右到左
    brightness: 1.1 // 亮度

  },
  onLoad: function onLoad() {
    this.delta = 0;
    this.material = this.node.getComponent(cc.RenderComponent).getMaterial(0);
    this.material.setProperty("duration", this.duration);
    this.material.setProperty("lightwidth", this.lightwidth);
    this.material.setProperty("brightness", this.brightness);
    this.halfTime = (this.duration + this.interval) * 0.5;
    if (this.direction != 1) this.delta = this.duration;
  },
  update: function update(dt) {
    if (this.startdelay >= 0) {
      this.startdelay -= dt;
      return;
    }

    if (this.direction == 1) {
      this.delta += dt;

      if (this.delta >= this.halfTime) {
        this.delta = -this.halfTime;
      }
    } else {
      this.delta -= dt;

      if (this.delta <= -this.halfTime) {
        this.delta = this.halfTime;
      }
    }

    this.material.setProperty("time", this.delta);
  }
});

cc._RF.pop();
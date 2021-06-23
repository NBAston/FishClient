"use strict";
cc._RF.push(module, '93eaarIyEFKGLqefg0HlS9a', 'nfish_hitNode');
// modules/games/nfish/script/prefab/nfish_hitNode.js

"use strict";

//捕鱼 点击 碰撞 获取
var CONST = require("nfishConst");

glGame.baseclass.extend({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.idelStatus = -1; //正常状态

    this.lockStatus = 0; //开始检索锁定状态

    this.lockFrequency = 0.15; //锁定使用时长频率

    this.hitNodeTime = this.idelStatus; //当前状态、时长

    this.logic = require("nfishlogic").getInstance(); //数据中心
  },
  setClick: function setClick(pos) {
    this.node.setPosition(pos);
    this.hitList = [];
    this.hitNodeTime = this.lockStatus;
  },
  //进入碰撞检测
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (other.node.group == "fish") {
      //只与鱼产生碰撞
      var tagerFishLineID = Number(other.node.name);

      if (this.logic.lockFishID == tagerFishLineID) {
        //重复锁定不处理
        return;
      }

      this.hitList.push(tagerFishLineID);
    }
  },
  update: function update(dt) {
    if (this.hitNodeTime > this.idelStatus) {
      this.hitNodeTime += dt;

      if (this.hitNodeTime > this.lockFrequency) {
        this.hitNodeTime = this.idelStatus;

        if (this.hitList) {
          this.hitList.sort(function (a, b) {
            return b.zIndex - a.zIndex;
          });

          if (this.hitList.length > 0) {
            glGame.emitter.emit(CONST.clientEvent.lockSelfFish, this.hitList[0]);
            this.hitList = [];
          }
        }

        this.node.active = false;
      }
    }
  }
});

cc._RF.pop();
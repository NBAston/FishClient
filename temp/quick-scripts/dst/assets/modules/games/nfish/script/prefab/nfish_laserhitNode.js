
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_laserhitNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '788edjR1DBBZ70LfpmGrt9d', 'nfish_laserhitNode');
// modules/games/nfish/script/prefab/nfish_laserhitNode.js

"use strict";

//捕鱼 龙溪子弹 碰撞
var CONST = require("nfishConst");

glGame.baseclass.extend({
  "extends": cc.Component,
  OnDestroy: function OnDestroy() {
    this.logic = null;
    this.unregisterEvent();
  },
  onLoad: function onLoad() {
    this.logic = require("nfishlogic").getInstance(); //数据中心

    this.hitNodeTime = -1;
    this.angle = -1;
    this.uid = -1;
    this.seatNum = -1;
    this.coolingTime = 0;
    this.hitList = [];
    this.registerEvent();
  },
  //注册监听
  registerEvent: function registerEvent() {
    glGame.emitter.on(CONST.clientEvent.onLaserDispath, this.onLaserDispathHandler, this);
  },
  //反注册监听
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off(CONST.clientEvent.onLaserDispath, this);
  },
  onLaserDispathHandler: function onLaserDispathHandler(res) {
    this.coolingTime = 1;

    if (this.node.parent.name == "ui_gun" + res.seatNum) {
      this.hitList = [];
      this.seatNum = res.seatNum;
      this.uid = res.uid;
      this.angle = res.angle;
      this.hitNodeTime = 0;
    }
  },
  //进入碰撞检测
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (this.coolingTime > 0 && other.node.group == "fish") {
      // glGame.emitter.emit(CONST.clientEvent.playFishnetEffect,{position:other.node.position,zIndex:CONST.nodeZIndex.zIndexPartBoom,gunLevel:-1});
      if (this.seatNum == this.logic.seatNum) other.node.getComponent("nfish_Unit").hit();

      if (this.hitList.indexOf(Number(other.node.name)) == -1) {
        this.hitList.push(Number(other.node.name));
      }
    }
  },
  update: function update(dt) {
    if (this.coolingTime > 0) {
      this.coolingTime -= dt;
    }

    if (this.hitNodeTime > -1) {
      this.hitNodeTime += dt;

      if (this.hitNodeTime > 0.18) {
        this.hitNodeTime = -1;
        this.coolingTime = 0;

        if (this.node.parent.name == "ui_gun" + this.seatNum) {
          //发送发射龙溪炮弹
          var shootBulletData = {
            "op": CONST.CannonOpention.Laser,
            "angle": this.angle,
            "uid": this.uid
          };
          cc.log("--==-->发送龙溪炮弹 A 发射 ", shootBulletData);

          if (this.logic.isEnterRoom) {
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), shootBulletData);
          } //发送龙溪子弹碰撞


          var hitFishData = {
            "op": CONST.CannonOpention.LaserHit,
            "fishIds": this.hitList,
            "angle": this.angle,
            "uid": this.uid
          };

          if (this.angle == undefined) {
            cc.warn("龙溪发射 失败 没有角度 ", hitFishData);
          }

          if (this.uid == undefined) {
            cc.warn("龙溪发射 失败 没有uid ", hitFishData);
          }

          if (this.logic.isEnterRoom) {
            cc.log("--==-->发送龙溪子弹 B 碰撞 ", hitFishData);
            glGame.gameNet.send_msg(glGame.room.getPlayerOp(glGame.scenetag.FISH2), hitFishData);
          }
        } else {
          cc.warn(">龙溪发射失败...");
        }
      }
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfbGFzZXJoaXROb2RlLmpzIl0sIm5hbWVzIjpbIkNPTlNUIiwicmVxdWlyZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsImNjIiwiQ29tcG9uZW50IiwiT25EZXN0cm95IiwibG9naWMiLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvbkxvYWQiLCJnZXRJbnN0YW5jZSIsImhpdE5vZGVUaW1lIiwiYW5nbGUiLCJ1aWQiLCJzZWF0TnVtIiwiY29vbGluZ1RpbWUiLCJoaXRMaXN0IiwicmVnaXN0ZXJFdmVudCIsImVtaXR0ZXIiLCJvbiIsImNsaWVudEV2ZW50Iiwib25MYXNlckRpc3BhdGgiLCJvbkxhc2VyRGlzcGF0aEhhbmRsZXIiLCJvZmYiLCJyZXMiLCJub2RlIiwicGFyZW50IiwibmFtZSIsIm9uQ29sbGlzaW9uRW50ZXIiLCJvdGhlciIsInNlbGYiLCJncm91cCIsImdldENvbXBvbmVudCIsImhpdCIsImluZGV4T2YiLCJOdW1iZXIiLCJwdXNoIiwidXBkYXRlIiwiZHQiLCJzaG9vdEJ1bGxldERhdGEiLCJDYW5ub25PcGVudGlvbiIsIkxhc2VyIiwibG9nIiwiaXNFbnRlclJvb20iLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb29tIiwiZ2V0UGxheWVyT3AiLCJzY2VuZXRhZyIsIkZJU0gyIiwiaGl0RmlzaERhdGEiLCJMYXNlckhpdCIsInVuZGVmaW5lZCIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQW5COztBQUVBQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCLGFBQVNDLEVBQUUsQ0FBQ0MsU0FEUTtBQUdwQkMsRUFBQUEsU0FIb0IsdUJBR1I7QUFDUixTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUtDLGVBQUw7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QUFQLENBQWdCQyxLQUF4QyxDQUF4QixFQUF1RUMsV0FBdkU7QUFDSDtBQUNKLFNBOUJELE1BOEJLO0FBQ0Q5QyxVQUFBQSxFQUFFLENBQUNpRCxJQUFILENBQVEsWUFBUjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBMUZtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mjZXpsbwg6b6Z5rqq5a2Q5by5IOeisOaSnlxyXG5sZXQgQ09OU1QgPSByZXF1aXJlKFwibmZpc2hDb25zdFwiKTtcclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmxvZ2ljICAgICAgICAgICAgICA9IHJlcXVpcmUoXCJuZmlzaGxvZ2ljXCIpLmdldEluc3RhbmNlKCk7Ly/mlbDmja7kuK3lv4NcclxuICAgICAgICB0aGlzLmhpdE5vZGVUaW1lID0gLTE7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IC0xO1xyXG4gICAgICAgIHRoaXMudWlkID0gLTE7XHJcbiAgICAgICAgdGhpcy5zZWF0TnVtID0gLTE7XHJcbiAgICAgICAgdGhpcy5jb29saW5nVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5oaXRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy/ms6jlhoznm5HlkKxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oQ09OU1QuY2xpZW50RXZlbnQub25MYXNlckRpc3BhdGgsdGhpcy5vbkxhc2VyRGlzcGF0aEhhbmRsZXIsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy/lj43ms6jlhoznm5HlkKxcclxuICAgIHVucmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoQ09OU1QuY2xpZW50RXZlbnQub25MYXNlckRpc3BhdGgsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25MYXNlckRpc3BhdGhIYW5kbGVyKHJlcyl7XHJcbiAgICAgICAgdGhpcy5jb29saW5nVGltZSA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnBhcmVudC5uYW1lID09IChcInVpX2d1blwiK3Jlcy5zZWF0TnVtKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaGl0TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXROdW0gPSByZXMuc2VhdE51bTtcclxuICAgICAgICAgICAgdGhpcy51aWQgPSByZXMudWlkO1xyXG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gcmVzLmFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLmhpdE5vZGVUaW1lICA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6L+b5YWl56Kw5pKe5qOA5rWLXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb29saW5nVGltZSA+IDAgJiYgb3RoZXIubm9kZS5ncm91cCA9PSBcImZpc2hcIil7XHJcbiAgICAgICAgICAgIC8vIGdsR2FtZS5lbWl0dGVyLmVtaXQoQ09OU1QuY2xpZW50RXZlbnQucGxheUZpc2huZXRFZmZlY3Qse3Bvc2l0aW9uOm90aGVyLm5vZGUucG9zaXRpb24sekluZGV4OkNPTlNULm5vZGVaSW5kZXguekluZGV4UGFydEJvb20sZ3VuTGV2ZWw6LTF9KTtcclxuICAgICAgICAgICAgaWYodGhpcy5zZWF0TnVtID09IHRoaXMubG9naWMuc2VhdE51bSlvdGhlci5ub2RlLmdldENvbXBvbmVudChcIm5maXNoX1VuaXRcIikuaGl0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmhpdExpc3QuaW5kZXhPZihOdW1iZXIob3RoZXIubm9kZS5uYW1lKSkgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXRMaXN0LnB1c2goTnVtYmVyKG90aGVyLm5vZGUubmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgaWYodGhpcy5jb29saW5nVGltZSA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmNvb2xpbmdUaW1lIC09IGR0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmhpdE5vZGVUaW1lID4gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLmhpdE5vZGVUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmhpdE5vZGVUaW1lID4gMC4xOCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpdE5vZGVUaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb2xpbmdUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQubmFtZSA9PSAoXCJ1aV9ndW5cIit0aGlzLnNlYXROdW0pKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WPkemAgeWPkeWwhOm+mea6queCruW8uVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaG9vdEJ1bGxldERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib3BcIjpDT05TVC5DYW5ub25PcGVudGlvbi5MYXNlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmdsZVwiOnRoaXMuYW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidWlkXCI6dGhpcy51aWRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIi0tPT0tLT7lj5HpgIHpvpnmuqrngq7lvLkgQSDlj5HlsIQgXCIsc2hvb3RCdWxsZXREYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5pc0VudGVyUm9vbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKGdsR2FtZS5yb29tLmdldFBsYXllck9wKGdsR2FtZS5zY2VuZXRhZy5GSVNIMiksc2hvb3RCdWxsZXREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+R6YCB6b6Z5rqq5a2Q5by556Kw5pKeXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpdEZpc2hEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9wXCI6Q09OU1QuQ2Fubm9uT3BlbnRpb24uTGFzZXJIaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlzaElkc1wiOiB0aGlzLmhpdExpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5nbGVcIjp0aGlzLmFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVpZFwiOnRoaXMudWlkXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmFuZ2xlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLpvpnmuqrlj5HlsIQg5aSx6LSlIOayoeacieinkuW6piBcIixoaXRGaXNoRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy51aWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIum+mea6quWPkeWwhCDlpLHotKUg5rKh5pyJdWlkIFwiLGhpdEZpc2hEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvZ2ljLmlzRW50ZXJSb29tKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiLS09PS0tPuWPkemAgem+mea6quWtkOW8uSBCIOeisOaSniBcIixoaXRGaXNoRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKGdsR2FtZS5yb29tLmdldFBsYXllck9wKGdsR2FtZS5zY2VuZXRhZy5GSVNIMiksaGl0RmlzaERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCI+6b6Z5rqq5Y+R5bCE5aSx6LSlLi4uXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyJdfQ==
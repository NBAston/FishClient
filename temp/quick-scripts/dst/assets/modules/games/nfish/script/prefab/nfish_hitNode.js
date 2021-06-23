
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_hitNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfaGl0Tm9kZS5qcyJdLCJuYW1lcyI6WyJDT05TVCIsInJlcXVpcmUiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJjYyIsIkNvbXBvbmVudCIsIm9uTG9hZCIsImlkZWxTdGF0dXMiLCJsb2NrU3RhdHVzIiwibG9ja0ZyZXF1ZW5jeSIsImhpdE5vZGVUaW1lIiwibG9naWMiLCJnZXRJbnN0YW5jZSIsInNldENsaWNrIiwicG9zIiwibm9kZSIsInNldFBvc2l0aW9uIiwiaGl0TGlzdCIsIm9uQ29sbGlzaW9uRW50ZXIiLCJvdGhlciIsInNlbGYiLCJncm91cCIsInRhZ2VyRmlzaExpbmVJRCIsIk51bWJlciIsIm5hbWUiLCJsb2NrRmlzaElEIiwicHVzaCIsInVwZGF0ZSIsImR0Iiwic29ydCIsImEiLCJiIiwiekluZGV4IiwibGVuZ3RoIiwiZW1pdHRlciIsImVtaXQiLCJjbGllbnRFdmVudCIsImxvY2tTZWxmRmlzaCIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBbkI7O0FBQ0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEIsYUFBU0MsRUFBRSxDQUFDQyxTQURRO0FBR3BCQyxFQUFBQSxNQUhvQixvQkFHWjtBQUNKLFNBQUtDLFVBQUwsR0FBc0IsQ0FBQyxDQUF2QixDQURJLENBQzBCOztBQUM5QixTQUFLQyxVQUFMLEdBQXNCLENBQXRCLENBRkksQ0FFMEI7O0FBQzlCLFNBQUtDLGFBQUwsR0FBc0IsSUFBdEIsQ0FISSxDQUcwQjs7QUFDOUIsU0FBS0MsV0FBTCxHQUFzQixLQUFLSCxVQUEzQixDQUpJLENBSWtDOztBQUN0QyxTQUFLSSxLQUFMLEdBQXNCWCxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCWSxXQUF0QixFQUF0QixDQUxJLENBS3NEO0FBQzdELEdBVG1CO0FBV3BCQyxFQUFBQSxRQVhvQixvQkFXWEMsR0FYVyxFQVdQO0FBQ1QsU0FBS0MsSUFBTCxDQUFVQyxXQUFWLENBQXNCRixHQUF0QjtBQUNBLFNBQUtHLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS1AsV0FBTCxHQUFvQixLQUFLRixVQUF6QjtBQUNILEdBZm1CO0FBZ0JwQjtBQUNBVSxFQUFBQSxnQkFqQm9CLDRCQWlCSEMsS0FqQkcsRUFpQklDLElBakJKLEVBaUJVO0FBQzFCLFFBQUdELEtBQUssQ0FBQ0osSUFBTixDQUFXTSxLQUFYLElBQW9CLE1BQXZCLEVBQThCO0FBQUM7QUFDM0IsVUFBSUMsZUFBZSxHQUFHQyxNQUFNLENBQUNKLEtBQUssQ0FBQ0osSUFBTixDQUFXUyxJQUFaLENBQTVCOztBQUNBLFVBQUcsS0FBS2IsS0FBTCxDQUFXYyxVQUFYLElBQXlCSCxlQUE1QixFQUE0QztBQUN4QztBQUNBO0FBQ0g7O0FBQ0QsV0FBS0wsT0FBTCxDQUFhUyxJQUFiLENBQWtCSixlQUFsQjtBQUNIO0FBQ0osR0ExQm1CO0FBNEJwQkssRUFBQUEsTUE1Qm9CLGtCQTRCYkMsRUE1QmEsRUE0QlY7QUFDTixRQUFHLEtBQUtsQixXQUFMLEdBQW1CLEtBQUtILFVBQTNCLEVBQXNDO0FBQ2xDLFdBQUtHLFdBQUwsSUFBb0JrQixFQUFwQjs7QUFDQSxVQUFHLEtBQUtsQixXQUFMLEdBQW1CLEtBQUtELGFBQTNCLEVBQXlDO0FBQ3JDLGFBQUtDLFdBQUwsR0FBbUIsS0FBS0gsVUFBeEI7O0FBRUEsWUFBRyxLQUFLVSxPQUFSLEVBQWdCO0FBQ1osZUFBS0EsT0FBTCxDQUFhWSxJQUFiLENBQWtCLFVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFlO0FBQzdCLG1CQUFPQSxDQUFDLENBQUNDLE1BQUYsR0FBV0YsQ0FBQyxDQUFDRSxNQUFwQjtBQUNILFdBRkQ7O0FBR0EsY0FBRyxLQUFLZixPQUFMLENBQWFnQixNQUFiLEdBQXNCLENBQXpCLEVBQTJCO0FBQ3ZCaEMsWUFBQUEsTUFBTSxDQUFDaUMsT0FBUCxDQUFlQyxJQUFmLENBQW9CcEMsS0FBSyxDQUFDcUMsV0FBTixDQUFrQkMsWUFBdEMsRUFBbUQsS0FBS3BCLE9BQUwsQ0FBYSxDQUFiLENBQW5EO0FBQ0EsaUJBQUtBLE9BQUwsR0FBZSxFQUFmO0FBQ0g7QUFDSjs7QUFDRCxhQUFLRixJQUFMLENBQVV1QixNQUFWLEdBQW1CLEtBQW5CO0FBQ0g7QUFDSjtBQUNKO0FBOUNtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mjZXpsbwg54K55Ye7IOeisOaSniDojrflj5ZcclxubGV0IENPTlNUID0gcmVxdWlyZShcIm5maXNoQ29uc3RcIik7XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmlkZWxTdGF0dXMgICAgID0gLTE7ICAgICAvL+ato+W4uOeKtuaAgVxyXG4gICAgICAgIHRoaXMubG9ja1N0YXR1cyAgICAgPSAwOyAgICAgIC8v5byA5aeL5qOA57Si6ZSB5a6a54q25oCBXHJcbiAgICAgICAgdGhpcy5sb2NrRnJlcXVlbmN5ICA9IDAuMTU7ICAgLy/plIHlrprkvb/nlKjml7bplb/popHnjodcclxuICAgICAgICB0aGlzLmhpdE5vZGVUaW1lICAgID0gdGhpcy5pZGVsU3RhdHVzOy8v5b2T5YmN54q25oCB44CB5pe26ZW/XHJcbiAgICAgICAgdGhpcy5sb2dpYyAgICAgICAgICA9IHJlcXVpcmUoXCJuZmlzaGxvZ2ljXCIpLmdldEluc3RhbmNlKCk7Ly/mlbDmja7kuK3lv4NcclxuICAgIH0sXHJcblxyXG4gICAgc2V0Q2xpY2socG9zKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB0aGlzLmhpdExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmhpdE5vZGVUaW1lICA9IHRoaXMubG9ja1N0YXR1cztcclxuICAgIH0sXHJcbiAgICAvL+i/m+WFpeeisOaSnuajgOa1i1xyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gXCJmaXNoXCIpey8v5Y+q5LiO6bG85Lqn55Sf56Kw5pKeXHJcbiAgICAgICAgICAgIGxldCB0YWdlckZpc2hMaW5lSUQgPSBOdW1iZXIob3RoZXIubm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy5sb2NrRmlzaElEID09IHRhZ2VyRmlzaExpbmVJRCl7XHJcbiAgICAgICAgICAgICAgICAvL+mHjeWkjemUgeWumuS4jeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGl0TGlzdC5wdXNoKHRhZ2VyRmlzaExpbmVJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpe1xyXG4gICAgICAgIGlmKHRoaXMuaGl0Tm9kZVRpbWUgPiB0aGlzLmlkZWxTdGF0dXMpe1xyXG4gICAgICAgICAgICB0aGlzLmhpdE5vZGVUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmhpdE5vZGVUaW1lID4gdGhpcy5sb2NrRnJlcXVlbmN5KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGl0Tm9kZVRpbWUgPSB0aGlzLmlkZWxTdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5oaXRMaXN0KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdExpc3Quc29ydChmdW5jdGlvbiAoYSxiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiLnpJbmRleCAtIGEuekluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oaXRMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KENPTlNULmNsaWVudEV2ZW50LmxvY2tTZWxmRmlzaCx0aGlzLmhpdExpc3RbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/slwhentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad000y8nyxPm43avH3x/Qlj', 'slwhentry');
// modules/plaza/script/prefab/enterRoom/slwhentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    prefab_record: cc.Prefab,
    prefab_gameRule: cc.Prefab,
    slwhselect: cc.Node,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.updateuserInfo();
    this.registerEvent();
    this.reqEnterArea();
    this.nodeInfo = {};
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.unregisterEvent();
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.SLWH;
    glGame.readyroom.reqEnterArea(glGame.scenetag.SLWH);
  },
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("onGameInfolist_area", this.onGameInfolist, this);
    glGame.emitter.on("onRoomInfo_area", this.onRoomInfo, this);
    glGame.emitter.on("onDeleteRoom_area", this.onDeleteRoom, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("onGameInfolist_area", this);
    glGame.emitter.off("onRoomInfo_area", this);
    glGame.emitter.off("onDeleteRoom_area", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_back":
        this.click_back();
        break;

      case "btn_help":
        this.click_help();
        break;

      case "btn_record":
        this.click_record();
        break;

      case "mycoinInfo":
        this.click_addgold();
        break;

      case "headbg":
        this.click_userinfo();
        break;

      case "btn_chongzhi":
        this.click_addgold();
        break;

      case "btn_start":
        this.enterroom(name, node);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  enterroom: function enterroom(name, node) {
    var _this = this;

    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
      glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return;
    }

    glGame.panel.showFieldSelectionJuHua();
    glGame.room.reqMyGameState(this.gameID, node.parent.name).then(function () {
      glGame.readyroom.enterHundredsRoomOther(_this.gameID, node.parent.name);
    });
  },
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
  },
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = glGame.user.GoldTemp(coin);
  },
  setGameId: function setGameId(gameid) {
    this.gameid = gameid;
  },
  updateBgInfo: function updateBgInfo() {},
  click_userinfo: function click_userinfo() {
    glGame.panel.showPanelByName("userinfo");
  },
  click_addgold: function click_addgold() {
    glGame.panel.showShop(30);
  },
  click_back: function click_back() {
    glGame.readyroom.reqExitArea();
    this.remove();
  },
  click_help: function click_help() {
    var prefab_gameRule = glGame.panel.showPanel(this.prefab_gameRule);
    prefab_gameRule.zIndex = 30;
  },
  click_record: function click_record() {
    var prefab_record = glGame.panel.showPanel(this.prefab_record);
    prefab_record.zIndex = 30;
  },
  onGameInfolist: function onGameInfolist(msg) {
    this.gameInfoTest = glGame.readyroom.get("gameInfo");

    for (var key in this.gameInfoTest) {
      if (this.slwhselect.getChildByName("".concat(key))) {
        var content = this.slwhselect.getChildByName("".concat(key)).getChildByName("content");
        var lab_zhunru = content.getChildByName('lab_zhunru').getComponent(cc.Label);
        lab_zhunru.string = " " + this.cutFloat(this.gameInfoTest[key].Chips[0]);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {},
  onDeleteRoom: function onDeleteRoom(msg) {},
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.unregisterEvent();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXHNsd2hlbnRyeS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZ29sZENvdW50IiwiY2MiLCJMYWJlbCIsInByZWZhYl9yZWNvcmQiLCJQcmVmYWIiLCJwcmVmYWJfZ2FtZVJ1bGUiLCJzbHdoc2VsZWN0IiwiTm9kZSIsIkJHTSIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJnYW1laWQiLCJub2RlIiwiekluZGV4IiwiZW1pdHRlciIsIm9uIiwiTUVTU0FHRSIsIlVJIiwiUk9PTV9FTlRFUl9TSE9XIiwiUm9vdE5vZGVTaG93IiwiUk9PTV9FTlRFUl9ISURFIiwiUm9vdE5vZGVIaWRlIiwiY2xpY2tfYmFjayIsInVwZGF0ZXVzZXJJbmZvIiwicmVnaXN0ZXJFdmVudCIsInJlcUVudGVyQXJlYSIsIm5vZGVJbmZvIiwiYWN0aXZlIiwidW5yZWdpc3RlckV2ZW50IiwiZ2FtZUlEIiwic2NlbmV0YWciLCJTTFdIIiwicmVhZHlyb29tIiwib25HYW1lSW5mb2xpc3QiLCJvblJvb21JbmZvIiwib25EZWxldGVSb29tIiwib2ZmIiwib25DbGljayIsIm5hbWUiLCJjbGlja19oZWxwIiwiY2xpY2tfcmVjb3JkIiwiY2xpY2tfYWRkZ29sZCIsImNsaWNrX3VzZXJpbmZvIiwiZW50ZXJyb29tIiwiY29uc29sZSIsImVycm9yIiwidXNlciIsImlzVG91cmlzdCIsInBhbmVsIiwic2hvd1JlZ2lzdGVyZWRHaWZ0Iiwic3VzcGljaW91cyIsImdhbWUiLCJpc19nYW1lIiwic2hvd0RpYWxvZyIsInNob3dTZXJ2aWNlIiwic2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEiLCJyb29tIiwicmVxTXlHYW1lU3RhdGUiLCJwYXJlbnQiLCJ0aGVuIiwiZW50ZXJIdW5kcmVkc1Jvb21PdGhlciIsImN1dEZsb2F0IiwidmFsdWUiLCJOdW1iZXIiLCJkaXYiLCJ0b1N0cmluZyIsInNob3dVc2VySW5mbyIsInNob3dSZW1vdGVJbWFnZSIsIlBsYXllcmhlYWQiLCJnZXQiLCJjb2luIiwic3RyaW5nIiwiR29sZFRlbXAiLCJzZXRHYW1lSWQiLCJ1cGRhdGVCZ0luZm8iLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2hvcCIsInJlcUV4aXRBcmVhIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwibXNnIiwiZ2FtZUluZm9UZXN0Iiwia2V5IiwiZ2V0Q2hpbGRCeU5hbWUiLCJjb250ZW50IiwibGFiX3podW5ydSIsImdldENvbXBvbmVudCIsIkNoaXBzIiwic2V0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBRXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFQyxFQUFFLENBQUNDLEtBRE47QUFFUkMsSUFBQUEsYUFBYSxFQUFDRixFQUFFLENBQUNHLE1BRlQ7QUFHUkMsSUFBQUEsZUFBZSxFQUFDSixFQUFFLENBQUNHLE1BSFg7QUFJUkUsSUFBQUEsVUFBVSxFQUFFTCxFQUFFLENBQUNNLElBSlA7QUFLUkMsSUFBQUEsR0FBRyxFQUFFO0FBQ0RDLE1BQUFBLElBQUksRUFBRVIsRUFBRSxDQUFDUyxTQURSO0FBRUQsaUJBQVM7QUFGUjtBQUxHLEdBRlE7QUFhcEI7QUFFQUMsRUFBQUEsTUFmb0Isb0JBZVg7QUFDTCxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixFQUFuQjtBQUNBbEIsSUFBQUEsTUFBTSxDQUFDbUIsT0FBUCxDQUFlQyxFQUFmLENBQWtCQyxPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBN0IsRUFBOEMsS0FBS0MsWUFBbkQsRUFBaUUsSUFBakU7QUFDQXhCLElBQUFBLE1BQU0sQ0FBQ21CLE9BQVAsQ0FBZUMsRUFBZixDQUFrQkMsT0FBTyxDQUFDQyxF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QXZJZ0IsRUF1SVg7QUFDTCxXQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNILEdBekltQjtBQTBJcEJPLEVBQUFBLFNBMUlvQix1QkEwSVI7QUFDUjlGLElBQUFBLE1BQU0sQ0FBQ21CLE9BQVAsQ0FBZXNCLEdBQWYsQ0FBbUJwQixPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBOUIsRUFBK0MsSUFBL0M7QUFDQXZCLElBQUFBLE1BQU0sQ0FBQ21CLE9BQVAsQ0FBZXNCLEdBQWYsQ0FBbUJwQixPQUFPLENBQUNDLEVBQVIsQ0FBV0csZUFBOUIsRUFBK0MsSUFBL0M7QUFDQXpCLElBQUFBLE1BQU0sQ0FBQ21CLE9BQVAsQ0FBZXNCLEdBQWYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakM7QUFDQXpDLElBQUFBLE1BQU0sQ0FBQ21CLE9BQVAsQ0FBZXNCLEdBQWYsQ0FBbUIsZ0JBQW5CLEVBQXFDLElBQXJDO0FBQ0EsU0FBS1IsZUFBTDtBQUNILEdBaEptQixDQWlKcEI7O0FBakpvQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnb2xkQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHByZWZhYl9yZWNvcmQ6Y2MuUHJlZmFiLFxyXG4gICAgICAgIHByZWZhYl9nYW1lUnVsZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgc2x3aHNlbGVjdDogY2MuTm9kZSxcclxuICAgICAgICBCR006IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDIwO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzLlJvb3ROb2RlU2hvdywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMuUm9vdE5vZGVIaWRlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRldXNlckluZm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZVNob3coKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy/lj5HljIVcclxuICAgIHJlcUVudGVyQXJlYSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdsR2FtZS5zY2VuZXRhZy5TTFdIO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5TTFdIKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tuebkeWQrFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcy5vbkdhbWVJbmZvbGlzdCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvblJvb21JbmZvX2FyZWFcIiwgdGhpcy5vblJvb21JbmZvLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMub25EZWxldGVSb29tLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tumUgOavgVxyXG4gICAgdW5yZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25Sb29tSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tcIjogdGhpcy5jbGlja19iYWNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlbHBcIjogdGhpcy5jbGlja19oZWxwKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY29yZFwiOiB0aGlzLmNsaWNrX3JlY29yZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm15Y29pbkluZm9cIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZGJnXCI6IHRoaXMuY2xpY2tfdXNlcmluZm8oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2hvbmd6aGlcIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3N0YXJ0XCI6IHRoaXMuZW50ZXJyb29tKG5hbWUsIG5vZGUpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVudGVycm9vbShuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigoZ2xHYW1lLnVzZXIuc3VzcGljaW91cyA9PSAxICYmZ2xHYW1lLnVzZXIuZ2FtZSA9PSAyICkgfHwgZ2xHYW1lLnVzZXIuaXNfZ2FtZSA9PSAyICl7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIFwi5oKo55qE6LSm5Y+35pWw5o2u5byC5bi477yM5pqC5pe256aB5q2i6L+b5YWl5ri45oiP77yM5aaC5pyJ55aR6Zeu77yM6K+36IGU57O75a6i5pyN77yBXCIsICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4ge30sIFwi5oiR55+l6YGT5LqGXCIsIFwi6IGU57O75a6i5pyNXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RmllbGRTZWxlY3Rpb25KdUh1YSgpO1xyXG4gICAgICAgIGdsR2FtZS5yb29tLnJlcU15R2FtZVN0YXRlKHRoaXMuZ2FtZUlELG5vZGUucGFyZW50Lm5hbWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBnbEdhbWUucmVhZHlyb29tLmVudGVySHVuZHJlZHNSb29tT3RoZXIodGhpcy5nYW1lSUQsbm9kZS5wYXJlbnQubmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjdXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICBzaG93VXNlckluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZW1vdGVJbWFnZSh0aGlzLlBsYXllcmhlYWQsIGdsR2FtZS51c2VyLmdldChcImhlYWRVUkxcIikpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZXVzZXJJbmZvKCkge1xyXG4gICAgICAgIGxldCBjb2luID0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKVxyXG4gICAgICAgIHRoaXMuZ29sZENvdW50LnN0cmluZyA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKGNvaW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRHYW1lSWQoZ2FtZWlkKSB7XHJcbiAgICAgICAgdGhpcy5nYW1laWQgPSBnYW1laWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJnSW5mbygpIHtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIGNsaWNrX3VzZXJpbmZvKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJ1c2VyaW5mb1wiKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19hZGRnb2xkKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgzMCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYmFjaygpIHtcclxuICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUV4aXRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19oZWxwKCkge1xyXG4gICAgICAgIGxldCBwcmVmYWJfZ2FtZVJ1bGUgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMucHJlZmFiX2dhbWVSdWxlKTtcclxuICAgICAgICBwcmVmYWJfZ2FtZVJ1bGUuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIGxldCBwcmVmYWJfcmVjb3JkID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLnByZWZhYl9yZWNvcmQpO1xyXG4gICAgICAgIHByZWZhYl9yZWNvcmQuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgb25HYW1lSW5mb2xpc3QobXNnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lSW5mb1Rlc3QgPSBnbEdhbWUucmVhZHlyb29tLmdldChcImdhbWVJbmZvXCIpO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuZ2FtZUluZm9UZXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5zbHdoc2VsZWN0LmdldENoaWxkQnlOYW1lKGAke2tleX1gKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuc2x3aHNlbGVjdC5nZXRDaGlsZEJ5TmFtZShgJHtrZXl9YCkuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYl96aHVucnUgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKCdsYWJfemh1bnJ1JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxhYl96aHVucnUuc3RyaW5nID0gXCIgXCIgKyB0aGlzLmN1dEZsb2F0KHRoaXMuZ2FtZUluZm9UZXN0W2tleV0uQ2hpcHNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uUm9vbUluZm8obXNnKSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uRGVsZXRlUm9vbShtc2cpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm5vZGVSZW1vdmVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
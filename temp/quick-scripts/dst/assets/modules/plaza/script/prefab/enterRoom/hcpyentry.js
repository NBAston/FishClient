
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/hcpyentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da06dssZ6hNXLPeirKOC6SF', 'hcpyentry');
// modules/plaza/script/prefab/enterRoom/hcpyentry.js

"use strict";

var _glGame$baseclass$ext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

glGame.baseclass.extend((_glGame$baseclass$ext = {
  properties: {
    hcpyRecord: cc.Prefab,
    hcpyRule: cc.Prefab,
    goldCount: cc.Label,
    hcpySelect: cc.Node,
    girl: cc.Node,
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.roomType = 1;
    this.nodeInfo = {};
    this.updateuserInfo();
    this.playEnterAnimation();
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
    this.nodeInfo = {};
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.unregisterEvent();
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
  // 播放入场动画
  playEnterAnimation: function playEnterAnimation() {
    this.girl.getComponent(cc.Widget).updateAlignment();
    this.girl.x -= 200;
    this.girl.opacity = 0;
    var moveBy = cc.moveBy(0.2, cc.v2(200, 0));
    var fadeIn = cc.fadeIn(0.2);
    this.girl.runAction(cc.spawn(moveBy, fadeIn));
    this.girl.getComponent(cc.Widget).enabled = false;
  },
  onClick: function onClick(name, node) {
    var _this = this;

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

      case 'btn_enter':
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
        console.log("这是当前传送", this.gameID, node.parent.name);
        glGame.room.reqMyGameState(this.gameID, node.parent.name).then(function () {
          glGame.readyroom.enterHundredsRoomOther(_this.gameID, node.parent.name);
        });
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //发包
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.HCPY;
    glGame.readyroom.reqEnterArea(glGame.scenetag.HCPY);
  },
  onGameInfolist: function onGameInfolist(msg) {
    this.gameInfoTest = glGame.readyroom.get("gameInfo");
    console.log("这是当前房间配置", this.gameInfoTest);

    for (var key in this.gameInfoTest) {
      if (this.hcpySelect.getChildByName("".concat(key))) {
        var lab_basescore = this.hcpySelect.getChildByName("".concat(key)).getChildByName('basescore').getComponent(cc.Label);
        var lab_chiplimit = this.hcpySelect.getChildByName("".concat(key)).getChildByName('chiplimit').getComponent(cc.Label);
        lab_basescore.string = "底注:   " + this.getFloat(this.gameInfoTest[key].Chips[0]);
        lab_chiplimit.string = "准入:   " + this.getFloat(this.gameInfoTest[key].EntranceRestrictions);
      }
    }
  },
  onRoomInfo: function onRoomInfo(msg) {},
  onDeleteRoom: function onDeleteRoom(msg) {},
  //桌面数据的显示
  getFloat: function getFloat(value) {
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
  updateBgInfo: function updateBgInfo() {
    this.goldCount.node.color = new cc.Color(229, 248, 255);
  },
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
    var panel = glGame.panel.showPanel(this.hcpyRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.hcpyRecord);
    panel.zIndex = 30;
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
  }
}, _defineProperty(_glGame$baseclass$ext, "getFloat", function getFloat(value) {
  return Number(value).div(100).toString();
}), _defineProperty(_glGame$baseclass$ext, "OnDestroy", function OnDestroy() {
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
  glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
  glGame.emitter.off("nodeRemove", this);
  glGame.emitter.off("updateUserData", this);
  this.unregisterEvent();
}), _glGame$baseclass$ext));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGhjcHllbnRyeS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiaGNweVJlY29yZCIsImNjIiwiUHJlZmFiIiwiaGNweVJ1bGUiLCJnb2xkQ291bnQiLCJMYWJlbCIsImhjcHlTZWxlY3QiLCJOb2RlIiwiZ2lybCIsIkJHTSIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJnYW1laWQiLCJub2RlIiwiekluZGV4IiwiZW1pdHRlciIsIm9uIiwiTUVTU0FHRSIsIlVJIiwiUk9PTV9FTlRFUl9TSE9XIiwiUm9vdE5vZGVTaG93IiwiUk9PTV9FTlRFUl9ISURFIiwiUm9vdE5vZGVIaWRlIiwiY2xpY2tfYmFjayIsInVwZGF0ZXVzZXJJbmZvIiwicmVnaXN0ZXJFdmVudCIsInJlcUVudGVyQXJlYSIsInJvb21UeXBlIiwibm9kZUluZm8iLCJwbGF5RW50ZXJBbmltYXRpb24iLCJhY3RpdmUiLCJ1bnJlZ2lzdGVyRXZlbnQiLCJvbkdhbWVJbmZvbGlzdCIsIm9uUm9vbUluZm8iLCJvbkRlbGV0ZVJvb20iLCJvZmYiLCJnZXRDb21wb25lbnQiLCJXaWRnZXQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJ4Iiwib3BhY2l0eSIsIm1vdmVCeSIsInYyIiwiZmFkZUluIiwicnVuQWN0aW9uIiwic3Bhd24iLCJlbmFibGVkIiwib25DbGljayIsIm5hbWUiLCJjbGlja19oZWxwIiwiY2xpY2tfcmVjb3JkIiwiY2xpY2tfYWRkZ29sZCIsImNsaWNrX3VzZXJpbmZvIiwidXNlciIsImlzVG91cmlzdCIsInBhbmVsIiwic2hvd1JlZ2lzdGVyZWRHaWZ0Iiwic3VzcGljaW91cyIsImdhbWUiLCJpc19nYW1lIiwic2hvd0RpYWxvZyIsInNob3dTZXJ2aWNlIiwic2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUlEIiwicGFyZW50Iiwicm9vbSIsInJlcU15R2FtZVN0YXRlIiwidGhlbiIsInJlYWR5cm9vbSIsImVudGVySHVuZHJlZHNSb29tT3RoZXIiLCJlcnJvciIsInNjZW5ldGFnIiwiSENQWSIsIm1zZyIsImdhbWVJbmZvVGVzdCIsImdldCIsImtleSIsImdldENoaWxkQnlOYW1lIiwibGFiX2Jhc2VzY29yZSIsImxhYl9jaGlwbGltaXQiLCJzdHJpbmciLCJnZXRGbG9hdCIsIkNoaXBzIiwiRW50cmFuY2VSZXN0cmljdGlvbnMiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwic2hvd1VzZXJJbmZvIiwic2hvd1JlbW90ZUltYWdlIiwiUGxheWVyaGVhZCIsImNvaW4iLCJHb2xkVGVtcCIsInNldEdhbWVJZCIsInVwZGF0ZUJnSW5mbyIsImNvbG9yIiwiQ29sb3IiLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2hvcCIsInJlcUV4aXRBcmVhIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQjtBQUVJQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFQyxFQUFFLENBQUNDLE1BRFA7QUFFUkMsSUFBQUEsUUFBUSxFQUFFRixFQUFFLENBQUNDLE1BRkw7QUFHUkUsSUFBQUEsU0FBUyxFQUFFSCxFQUFFLENBQUNJLEtBSE47QUFJUkMsSUFBQUEsVUFBVSxFQUFDTCxFQUFFLENBQUNNLElBSk47QUFLUkMsSUFBQUEsSUFBSSxFQUFFUCxFQUFFLENBQUNNLElBTEQ7QUFNUkUsSUFBQUEsR0FBRyxFQUFFO0FBQ0RDLE1BQUFBLElBQUksRUFBRVQsRUFBRSxDQUFDVSxTQURSO0FBRUQsaUJBQVM7QUFGUjtBQU5HLEdBRmhCO0FBY0lDLEVBQUFBLE1BZEosb0JBY2E7QUFDTCxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLElBQUwsQ0FBVUMs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QUEsS0FBSyxDQUFDekMsTUFBTixHQUFlLEVBQWY7QUFDSCxHQW5LTDtBQXFLSTBGLEVBQUFBLEdBcktKLGVBcUtRMUIsR0FyS1IsRUFxS2FRLEtBcktiLEVBcUtvQjtBQUNaLFNBQUtSLEdBQUwsSUFBWVEsS0FBWjtBQUNILEdBdktMO0FBeUtJVCxFQUFBQSxHQXpLSixlQXlLUUMsR0F6S1IsRUF5S2E7QUFDTCxXQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNIO0FBM0tMLHdFQTZLYVEsS0E3S2IsRUE2S29CO0FBQ1osU0FBUUMsTUFBTSxDQUFDRCxLQUFELENBQU4sQ0FBY0UsR0FBZCxDQUFrQixHQUFsQixDQUFELENBQXlCQyxRQUF6QixFQUFQO0FBQ0gsQ0EvS0wsNEVBaUxnQjtBQUNSOUYsRUFBQUEsTUFBTSxDQUFDb0IsT0FBUCxDQUFlb0IsR0FBZixDQUFtQmxCLE9BQU8sQ0FBQ0MsRUFBUixDQUFXQyxlQUE5QixFQUE4QyxJQUE5QztBQUNBeEIsRUFBQUEsTUFBTSxDQUFDb0IsT0FBUCxDQUFlb0IsR0FBZixDQUFtQmxCLE9BQU8sQ0FBQ0MsRUFBUixDQUFXRyxlQUE5QixFQUE4QyxJQUE5QztBQUNBMUIsRUFBQUEsTUFBTSxDQUFDb0IsT0FBUCxDQUFlb0IsR0FBZixDQUFtQixZQUFuQixFQUFpQyxJQUFqQztBQUNBeEMsRUFBQUEsTUFBTSxDQUFDb0IsT0FBUCxDQUFlb0IsR0FBZixDQUFtQixnQkFBbkIsRUFBb0MsSUFBcEM7QUFDQSxPQUFLSixlQUFMO0FBQ0gsQ0F2TEwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaGNweVJlY29yZDogY2MuUHJlZmFiLFxyXG4gICAgICAgIGhjcHlSdWxlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgZ29sZENvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBoY3B5U2VsZWN0OmNjLk5vZGUsXHJcbiAgICAgICAgZ2lybDogY2MuTm9kZSxcclxuICAgICAgICBCR006IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDIwO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzLlJvb3ROb2RlU2hvdywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMuUm9vdE5vZGVIaWRlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRldXNlckluZm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMucmVxRW50ZXJBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yb29tVHlwZSA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlSW5mbyA9IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLnBsYXlFbnRlckFuaW1hdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb290Tm9kZVNob3coKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgICAgIHRoaXMubm9kZUluZm8gPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgUm9vdE5vZGVIaWRlKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25HYW1lSW5mb2xpc3RfYXJlYVwiLCB0aGlzLm9uR2FtZUluZm9saXN0LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm9uUm9vbUluZm9fYXJlYVwiLCB0aGlzLm9uUm9vbUluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25EZWxldGVSb29tX2FyZWFcIiwgdGhpcy5vbkRlbGV0ZVJvb20sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+S6i+S7tumUgOavgVxyXG4gICAgdW5yZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uR2FtZUluZm9saXN0X2FyZWFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25Sb29tSW5mb19hcmVhXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uRGVsZXRlUm9vbV9hcmVhXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmkq3mlL7lhaXlnLrliqjnlLtcclxuICAgIHBsYXlFbnRlckFuaW1hdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdpcmwuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2lybC54IC09IDIwMDtcclxuICAgICAgICB0aGlzLmdpcmwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbGV0IG1vdmVCeSA9IGNjLm1vdmVCeSgwLjIsIGNjLnYyKDIwMCwgMCkpXHJcbiAgICAgICAgbGV0IGZhZGVJbiA9IGNjLmZhZGVJbigwLjIpXHJcbiAgICAgICAgdGhpcy5naXJsLnJ1bkFjdGlvbihjYy5zcGF3bihtb3ZlQnksIGZhZGVJbikpO1xyXG4gICAgICAgIHRoaXMuZ2lybC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tcIjogdGhpcy5jbGlja19iYWNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlbHBcIjogdGhpcy5jbGlja19oZWxwKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlY29yZFwiOiB0aGlzLmNsaWNrX3JlY29yZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm15Y29pbkluZm9cIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZGJnXCI6IHRoaXMuY2xpY2tfdXNlcmluZm8oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2hvbmd6aGlcIjogdGhpcy5jbGlja19hZGRnb2xkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdidG5fZW50ZXInOlxyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiZnbEdhbWUudXNlci5nYW1lID09IDIgKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIgKXtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBcIuaCqOeahOi0puWPt+aVsOaNruW8guW4uO+8jOaaguaXtuemgeatoui/m+WFpea4uOaIj++8jOWmguacieeWkemXru+8jOivt+iBlOezu+Wuouacje+8gVwiLCAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHt9LCBcIuaIkeefpemBk+S6hlwiLCBcIuiBlOezu+WuouacjVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0ZpZWxkU2VsZWN0aW9uSnVIdWEoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5Lyg6YCBXCIsdGhpcy5nYW1lSUQsbm9kZS5wYXJlbnQubmFtZSlcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5yb29tLnJlcU15R2FtZVN0YXRlKHRoaXMuZ2FtZUlELG5vZGUucGFyZW50Lm5hbWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5yZWFkeXJvb20uZW50ZXJIdW5kcmVkc1Jvb21PdGhlcih0aGlzLmdhbWVJRCxub2RlLnBhcmVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPkeWMhVxyXG4gICAgcmVxRW50ZXJBcmVhKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUlEID0gZ2xHYW1lLnNjZW5ldGFnLkhDUFk7XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFbnRlckFyZWEoZ2xHYW1lLnNjZW5ldGFnLkhDUFkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkdhbWVJbmZvbGlzdChtc2cpIHtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvVGVzdCA9IGdsR2FtZS5yZWFkeXJvb20uZ2V0KFwiZ2FtZUluZm9cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3miL/pl7TphY3nva5cIix0aGlzLmdhbWVJbmZvVGVzdClcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmdhbWVJbmZvVGVzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaGNweVNlbGVjdC5nZXRDaGlsZEJ5TmFtZShgJHtrZXl9YCkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYl9iYXNlc2NvcmUgPSB0aGlzLmhjcHlTZWxlY3QuZ2V0Q2hpbGRCeU5hbWUoYCR7a2V5fWApLmdldENoaWxkQnlOYW1lKCdiYXNlc2NvcmUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYl9jaGlwbGltaXQgPSB0aGlzLmhjcHlTZWxlY3QuZ2V0Q2hpbGRCeU5hbWUoYCR7a2V5fWApLmdldENoaWxkQnlOYW1lKCdjaGlwbGltaXQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbGFiX2Jhc2VzY29yZS5zdHJpbmcgPSBcIuW6leazqDogICBcIit0aGlzLmdldEZsb2F0KHRoaXMuZ2FtZUluZm9UZXN0W2tleV0uQ2hpcHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGFiX2NoaXBsaW1pdC5zdHJpbmcgPSBcIuWHhuWFpTogICBcIit0aGlzLmdldEZsb2F0KHRoaXMuZ2FtZUluZm9UZXN0W2tleV0uRW50cmFuY2VSZXN0cmljdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblJvb21JbmZvKG1zZykge1xyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25EZWxldGVSb29tKG1zZykge1xyXG4gICAgICAgXHJcbiAgICB9LFxyXG4gICAgLy/moYzpnaLmlbDmja7nmoTmmL7npLpcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93VXNlckluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZW1vdGVJbWFnZSh0aGlzLlBsYXllcmhlYWQsIGdsR2FtZS51c2VyLmdldChcImhlYWRVUkxcIikpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGV1c2VySW5mbygpIHtcclxuICAgICAgICBsZXQgY29pbiA9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIilcclxuICAgICAgICB0aGlzLmdvbGRDb3VudC5zdHJpbmcgPSBnbEdhbWUudXNlci5Hb2xkVGVtcChjb2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0R2FtZUlkKGdhbWVpZCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gZ2FtZWlkO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCZ0luZm8oKSB7XHJcbiAgICAgICAgdGhpcy5nb2xkQ291bnQubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyMjksIDI0OCwgMjU1KTtcclxuICAgIH0sXHJcbiAgXHJcbiAgICBjbGlja191c2VyaW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwidXNlcmluZm9cIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX2FkZGdvbGQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dTaG9wKDMwKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfYmFjaygpIHtcclxuICAgICAgICBnbEdhbWUucmVhZHlyb29tLnJlcUV4aXRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfaGVscCgpIHtcclxuICAgICAgICBsZXQgcGFuZWwgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuaGNweVJ1bGUpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19yZWNvcmQoKSB7XHJcbiAgICAgICAgbGV0IHBhbmVsID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmhjcHlSZWNvcmQpO1xyXG4gICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9ISURFLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm5vZGVSZW1vdmVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIix0aGlzKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
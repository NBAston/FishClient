
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/qznnentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0cd5jSFBBA7oZKlKMEcQc+', 'qznnentry');
// modules/plaza/script/prefab/enterRoom/qznnentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    game_Logo: sp.Skeleton,
    qznn_record: cc.Prefab,
    qznn_gamerule: cc.Prefab,
    level: {
      type: cc.Node,
      "default": []
    },
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
  },
  RootNodeShow: function RootNodeShow() {
    this.node.active = true;
    this.registerEvent();
    this.reqEnterArea();
  },
  RootNodeHide: function RootNodeHide() {
    this.node.active = false;
    this.resetView();
    this.unregisterEvent();
  },
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.QZNN;
    glGame.readyroom.reqEnterArea(glGame.scenetag.QZNN);
  },
  //事件监听
  registerEvent: function registerEvent() {
    glGame.emitter.on("goldOnlineNum", this.goldOnlineNum, this);
    glGame.emitter.on("onGameConfig", this.onGameConfig, this);
  },
  //事件销毁
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("goldOnlineNum", this);
    glGame.emitter.off("onGameConfig", this);
  },
  onGameConfig: function onGameConfig(msg) {
    this.gameConfig = msg;
    this.initUI();
  },
  goldOnlineNum: function goldOnlineNum(msg) {
    console.log("这是在线人数的消息", msg);
    var count = this.level.length;

    for (var i = 0; i < count; i++) {
      if (msg[i + 1]) {
        this.level[i].getChildByName("people_num").getComponent(cc.Label).string = msg[i + 1];
      }
    }
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

      case "primary":
        this.enterGame(99);
        break;

      case "intermediate":
        this.enterGame(1);
        break;

      case "senior":
        this.enterGame(2);
        break;

      case "tuhao":
        this.enterGame(3);
        break;

      case "supremacy":
        this.enterGame(4);
        break;

      case "volvo":
        this.enterGame(5);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  initUI: function initUI() {
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < 4; i++) {
      this.level[i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.cutFloat(configure[i].BaseChips);
      this.level[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.cutFloat(configure[i].EntranceRestrictions);
    }

    this.playMove();
    this.game_Logo.setAnimation(0, "animation", false);
  },
  //打开界面的图标移动动作
  playMove: function playMove() {
    var roomSelect = this.node.getChildByName("qznnselect");
    var posList = [];

    for (var i = 0; i < roomSelect.childrenCount; i++) {
      posList.push(cc.v2(roomSelect.children[i].position.x, roomSelect.children[i].position.y));
    }

    for (var _i = 0; _i < roomSelect.childrenCount; _i++) {
      roomSelect.children[_i].position.x += 1300;
    }

    for (var _i2 = 0; _i2 < roomSelect.childrenCount; _i2++) {
      roomSelect.children[_i2].x = this.node.width / 2 + this.level[_i2].width / 2;
      roomSelect.children[_i2].active = true;

      roomSelect.children[_i2].runAction(cc.sequence(cc.delayTime(_i2 * 0.05), cc.moveTo(0.2, cc.v2(posList[_i2].x - 40, posList[_i2].y)), cc.moveTo(0.1, posList[_i2])));
    }
  },
  resetView: function resetView() {
    for (var i = 0; i < 4; i++) {
      this.level[i].active = false;
    }
  },

  /**
  * 进入金币场房间
  * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
  */
  enterGame: function enterGame(level) {
    var _this = this;

    glGame.room.reqMyGameState(this.gameID, level).then(function () {
      var gameID = _this.gameID;

      if (_this.gameConfig[level] == null) {
        glGame.panel.showMsgBox('提示', '该房间尚未开放，请尝试其他房间。');
        return;
      }

      if (glGame.user.isTourist()) {
        if (level != 99) {
          glGame.panel.showRegisteredGift(true);
          return;
        }
      }

      if (_this.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        console.log("这是当前的房间限制", _this.gameConfig);
        var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this.cutFloat(_this.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
        glGame.panel.showDialog("", string, function () {
          glGame.panel.showShop(100);
        }, function () {}, "取消", "充值");
        return;
      }

      if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
        glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
          glGame.panel.showService();
        }, function () {}, "我知道了", "联系客服");
        return;
      }

      glGame.panel.showJuHua(); // glGame.readyroom.reqExitArea();

      _this.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      }))); // TODO
      // reqGoldRoomVerify为旧的进入房间方法，需要先请求验证，再进入房间
      // setGoldRoomInfo 新的进入房间方法，无需验证，设置游戏类型以及房间信息后，直接进入房间
      // if (glGame.enterRoomVerification) {
      //     glGame.room.reqGoldRoomVerify(gameID, level);
      // } else {
      //     glGame.room.setGoldRoomInfo(gameID, level);
      // }


      glGame.room.setGoldRoomInfo(gameID, level);
    });
  },

  /**
   * 检查玩家金币是否足够
   * @returns {boolean}
   */
  checkGold: function checkGold(coin, minCion) {
    console.log("金币检测", coin, minCion);

    if (parseInt(coin) < parseInt(minCion)) {
      glGame.panel.showDialog(glGame.i18n.t("USER.GOLDLACK.TITLE"), glGame.i18n.t("USER.GOLDLACK.CONTENT"), function () {
        glGame.panel.showPanelByName("shop");
      }, null);
      return false;
    }

    return true;
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
    var qznn_gamerule = glGame.panel.showPanel(this.qznn_gamerule);
    qznn_gamerule.zIndex = 30;
  },
  click_record: function click_record() {
    var qznn_record = glGame.panel.showPanel(this.qznn_record);
    qznn_record.zIndex = 30;
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXHF6bm5lbnRyeS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZ29sZENvdW50IiwiY2MiLCJMYWJlbCIsImdhbWVfTG9nbyIsInNwIiwiU2tlbGV0b24iLCJxem5uX3JlY29yZCIsIlByZWZhYiIsInF6bm5fZ2FtZXJ1bGUiLCJsZXZlbCIsInR5cGUiLCJOb2RlIiwiQkdNIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlJPT01fRU5URVJfU0hPVyIsIlJvb3ROb2RlU2hvdyIsIlJPT01fRU5URVJfSElERSIsIlJvb3ROb2RlSGlkZSIsImNsaWNrX2JhY2siLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJhY3RpdmUiLCJyZXNldFZpZXciLCJ1bnJlZ2lzdGVyRXZlbnQiLCJnYW1lSUQiLCJzY2VuZXRhZyIsIlFaTk4iLCJyZWFkeXJvb20iLCJnb2xkT25saW5lTnVtIiwib25HYW1lQ29uZmlnIiwib2ZmIiwibXNnIiwiZ2FtZUNvbmZpZyIsImluaXRVSSIsImNvbnNvbGUiLCJsb2ciLCJjb3VudCIsImxlbmd0aCIsImkiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsInN0cmluZyIsIm9uQ2xpY2siLCJuYW1lIiwiY2xpY2tfaGVscCIsImNsaWNrX3JlY29yZCIsImNsaWNrX2FkZGdvbGQiLCJjbGlja191c2VyaW5mbyIsImVudGVyR2FtZSIsImVycm9yIiwiY29uZmlndXJlIiwiY3V0RmxvYXQiLCJCYXNlQ2hpcHMiLCJFbnRyYW5jZVJlc3RyaWN0aW9ucyIsInBsYXlNb3ZlIiwic2V0QW5pbWF0aW9uIiwicm9vbVNlbGVjdCIsInBvc0xpc3QiLCJjaGlsZHJlbkNvdW50IiwicHVzaCIsInYyIiwiY2hpbGRyZW4iLCJwb3NpdGlvbiIsIngiLCJ5Iiwid2lkdGgiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsIm1vdmVUbyIsInJvb20iLCJyZXFNeUdhbWVTdGF0ZSIsInRoZW4iLCJwYW5lbCIsInNob3dNc2dCb3giLCJ1c2VyIiwiaXNUb3VyaXN0Iiwic2hvd1JlZ2lzdGVyZWRHaWZ0IiwiZ2V0Iiwic2hvd0RpYWxvZyIsInNob3dTaG9wIiwic3VzcGljaW91cyIsImdhbWUiLCJpc19nYW1lIiwic2hvd1NlcnZpY2UiLCJzaG93SnVIdWEiLCJjYWxsRnVuYyIsImNsb3NlSnVIdWEiLCJzZXRHb2xkUm9vbUluZm8iLCJjaGVja0dvbGQiLCJjb2luIiwibWluQ2lvbiIsInBhcnNlSW50IiwiaTE4biIsInQiLCJzaG93UGFuZWxCeU5hbWUiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwic2hvd1VzZXJJbmZvIiwic2hvd1JlbW90ZUltYWdlIiwiUGxheWVyaGVhZCIsIkdvbGRUZW1wIiwic2V0R2FtZUlkIiwidXBkYXRlQmdJbmZvIiwicmVxRXhpdEFyZWEiLCJyZW1vdmUiLCJzaG93UGFuZWwiLCJzZXQiLCJrZXkiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFFcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsS0FETjtBQUVSQyxJQUFBQSxTQUFTLEVBQUNDLEVBQUUsQ0FBQ0MsUUFGTDtBQUdSQyxJQUFBQSxXQUFXLEVBQUNMLEVBQUUsQ0FBQ00sTUFIUDtBQUlSQyxJQUFBQSxhQUFhLEVBQUNQLEVBQUUsQ0FBQ00sTUFKVDtBQUtSRSxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsSUFBSSxFQUFFVCxFQUFFLENBQUNVLElBRE47QUFFSCxpQkFBUztBQUZOLEtBTEM7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V0FBVyxHQUFHVixNQUFNLENBQUNzRixLQUFQLENBQWFtQyxTQUFiLENBQXVCLEtBQUsvRyxXQUE1QixDQUFsQjtBQUNBQSxJQUFBQSxXQUFXLENBQUNXLE1BQVosR0FBcUIsRUFBckI7QUFDSCxHQTNObUI7QUE2TnBCcUcsRUFBQUEsR0E3Tm9CLGVBNk5oQkMsR0E3TmdCLEVBNk5YZCxLQTdOVyxFQTZOSjtBQUNaLFNBQUtjLEdBQUwsSUFBWWQsS0FBWjtBQUNILEdBL05tQjtBQWdPcEJsQixFQUFBQSxHQWhPb0IsZUFnT2hCZ0MsR0FoT2dCLEVBZ09YO0FBQ0wsV0FBTyxLQUFLQSxHQUFMLENBQVA7QUFDSCxHQWxPbUI7QUFtT3BCQyxFQUFBQSxTQW5Pb0IsdUJBbU9SO0FBQ1I1SCxJQUFBQSxNQUFNLENBQUNzQixPQUFQLENBQWVxQixHQUFmLENBQW1CbkIsT0FBTyxDQUFDQyxFQUFSLENBQVdDLGVBQTlCLEVBQStDLElBQS9DO0FBQ0ExQixJQUFBQSxNQUFNLENBQUNzQixPQUFQLENBQWVxQixHQUFmLENBQW1CbkIsT0FBTyxDQUFDQyxFQUFSLENBQVdHLGVBQTlCLEVBQStDLElBQS9DO0FBQ0E1QixJQUFBQSxNQUFNLENBQUNzQixPQUFQLENBQWVxQixHQUFmLENBQW1CLFlBQW5CLEVBQWlDLElBQWpDO0FBQ0EzQyxJQUFBQSxNQUFNLENBQUNzQixPQUFQLENBQWVxQixHQUFmLENBQW1CLGdCQUFuQixFQUFxQyxJQUFyQztBQUNBLFNBQUtQLGVBQUw7QUFDSCxHQXpPbUIsQ0EwT3BCOztBQTFPb0IsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZENvdW50OiBjYy5MYWJlbCxcclxuICAgICAgICBnYW1lX0xvZ286c3AuU2tlbGV0b24sXHJcbiAgICAgICAgcXpubl9yZWNvcmQ6Y2MuUHJlZmFiLFxyXG4gICAgICAgIHF6bm5fZ2FtZXJ1bGU6Y2MuUHJlZmFiLFxyXG4gICAgICAgIGxldmVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCR006IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDIwO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzLlJvb3ROb2RlU2hvdywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMuUm9vdE5vZGVIaWRlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5vZGVSZW1vdmVcIiwgdGhpcy5jbGlja19iYWNrLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRldXNlckluZm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRldXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgfSxcclxuICAgIFJvb3ROb2RlU2hvdygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyQXJlYSgpO1xyXG4gICAgfSxcclxuICAgIFJvb3ROb2RlSGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICB0aGlzLnVucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHJlcUVudGVyQXJlYSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdsR2FtZS5zY2VuZXRhZy5RWk5OO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5RWk5OKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/kuovku7bnm5HlkKxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJnb2xkT25saW5lTnVtXCIsIHRoaXMuZ29sZE9ubGluZU51bSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJvbkdhbWVDb25maWdcIiwgdGhpcy5vbkdhbWVDb25maWcsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8v5LqL5Lu26ZSA5q+BXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiZ29sZE9ubGluZU51bVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJvbkdhbWVDb25maWdcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25HYW1lQ29uZmlnKG1zZykge1xyXG4gICAgICAgIHRoaXMuZ2FtZUNvbmZpZyA9IG1zZztcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfSxcclxuICAgIGdvbGRPbmxpbmVOdW0obXNnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lnKjnur/kurrmlbDnmoTmtojmga9cIiwgbXNnKVxyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMubGV2ZWwubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobXNnW2kgKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtpXS5nZXRDaGlsZEJ5TmFtZShcInBlb3BsZV9udW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2dbaSArIDFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYmFja1wiOiB0aGlzLmNsaWNrX2JhY2soKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5faGVscFwiOiB0aGlzLmNsaWNrX2hlbHAoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVjb3JkXCI6IHRoaXMuY2xpY2tfcmVjb3JkKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibXljb2luSW5mb1wiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkYmdcIjogdGhpcy5jbGlja191c2VyaW5mbygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jaG9uZ3poaVwiOiB0aGlzLmNsaWNrX2FkZGdvbGQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwcmltYXJ5XCI6IHRoaXMuZW50ZXJHYW1lKDk5KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnRlcm1lZGlhdGVcIjogdGhpcy5lbnRlckdhbWUoMSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2VuaW9yXCI6IHRoaXMuZW50ZXJHYW1lKDIpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInR1aGFvXCI6IHRoaXMuZW50ZXJHYW1lKDMpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1cHJlbWFjeVwiOiB0aGlzLmVudGVyR2FtZSg0KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2b2x2b1wiOiB0aGlzLmVudGVyR2FtZSg1KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyZSA9IHRoaXMuZ2FtZUNvbmZpZztcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5sZXZlbC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFtpXS5nZXRDaGlsZEJ5TmFtZShcImRpemh1bGFvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXpodV9udW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGNvbmZpZ3VyZVtpXS5CYXNlQ2hpcHMpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2ldLmdldENoaWxkQnlOYW1lKFwiemh1bnJ1bGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwiemh1bnJ1X251bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuY3V0RmxvYXQoY29uZmlndXJlW2ldLkVudHJhbmNlUmVzdHJpY3Rpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5TW92ZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9Mb2dvLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uXCIsZmFsc2UpXHJcbiAgICB9LFxyXG4gICAgLy/miZPlvIDnlYzpnaLnmoTlm77moIfnp7vliqjliqjkvZxcclxuICAgIHBsYXlNb3ZlKCkge1xyXG4gICAgICAgIGxldCByb29tU2VsZWN0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicXpubnNlbGVjdFwiKTtcclxuICAgICAgICBsZXQgcG9zTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbVNlbGVjdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcG9zTGlzdC5wdXNoKGNjLnYyKHJvb21TZWxlY3QuY2hpbGRyZW5baV0ucG9zaXRpb24ueCxyb29tU2VsZWN0LmNoaWxkcmVuW2ldLnBvc2l0aW9uLnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tU2VsZWN0LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICByb29tU2VsZWN0LmNoaWxkcmVuW2ldLnBvc2l0aW9uLnggKz0gMTMwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbVNlbGVjdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcm9vbVNlbGVjdC5jaGlsZHJlbltpXS54ID0gdGhpcy5ub2RlLndpZHRoLzIrdGhpcy5sZXZlbFtpXS53aWR0aC8yO1xyXG4gICAgICAgICAgICByb29tU2VsZWN0LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJvb21TZWxlY3QuY2hpbGRyZW5baV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGkqMC4wNSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC4yLGNjLnYyKHBvc0xpc3RbaV0ueCAtIDQwLHBvc0xpc3RbaV0ueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMSxwb3NMaXN0W2ldKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICByZXNldFZpZXcoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICog6L+b5YWl6YeR5biB5Zy65oi/6Ze0XHJcbiAgICAqIEBwYXJhbSBsZXZlbCDlnLrmrKHnsbvlnosgMTrliJ3nuqflnLogMjrkuK3nuqflnLogMzrpq5jnuqflnLogNDrlnJ/osarlnLogNTroh7PlsIrlnLpcclxuICAgICovXHJcbiAgICBlbnRlckdhbWUobGV2ZWwpIHtcclxuICAgICAgICBnbEdhbWUucm9vbS5yZXFNeUdhbWVTdGF0ZSh0aGlzLmdhbWVJRCwgbGV2ZWwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ2FtZUlEID0gdGhpcy5nYW1lSUQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVDb25maWdbbGV2ZWxdID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93TXNnQm94KCfmj5DnpLonLCAn6K+l5oi/6Ze05bCa5pyq5byA5pS+77yM6K+35bCd6K+V5YW25LuW5oi/6Ze044CCJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgIT0gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVDb25maWdbbGV2ZWxdLkVudHJhbmNlUmVzdHJpY3Rpb25zID4gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3nmoTmiL/pl7TpmZDliLZcIiwgdGhpcy5nYW1lQ29uZmlnKVxyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IGA8Y29sb3I9Izk5QzdGRj7mgqjnmoTph5HluIHkuI3otrPvvIzor6XmiL/pl7TpnIDopoE8L2M+IDxjb2xvcj0jZmYwMDAwPiAke3RoaXMuY3V0RmxvYXQodGhpcy5nYW1lQ29uZmlnW2xldmVsXS5FbnRyYW5jZVJlc3RyaWN0aW9ucyl9ICA8L2M+PGNvbG9yPSM5OUM3RkY+6YeR5biB5omN5Y+v5LiL5rOo77yM5piv5ZCm6ams5LiK5YmN5b6A5YWF5YC877yfPC9jPmBcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIHN0cmluZywgKCkgPT4geyBnbEdhbWUucGFuZWwuc2hvd1Nob3AoMTAwKSB9LCAoKSA9PiB7IH0sIFwi5Y+W5raIXCIsIFwi5YWF5YC8XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiYgZ2xHYW1lLnVzZXIuZ2FtZSA9PSAyKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIFwi5oKo55qE6LSm5Y+35pWw5o2u5byC5bi477yM5pqC5pe256aB5q2i6L+b5YWl5ri45oiP77yM5aaC5pyJ55aR6Zeu77yM6K+36IGU57O75a6i5pyN77yBXCIsICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4geyB9LCBcIuaIkeefpemBk+S6hlwiLCBcIuiBlOezu+WuouacjVwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93SnVIdWEoKTtcclxuICAgICAgICAgICAgLy8gZ2xHYW1lLnJlYWR5cm9vbS5yZXFFeGl0QXJlYSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDE1KSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuY2xvc2VKdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAvLyByZXFHb2xkUm9vbVZlcmlmeeS4uuaXp+eahOi/m+WFpeaIv+mXtOaWueazle+8jOmcgOimgeWFiOivt+axgumqjOivge+8jOWGjei/m+WFpeaIv+mXtFxyXG4gICAgICAgICAgICAvLyBzZXRHb2xkUm9vbUluZm8g5paw55qE6L+b5YWl5oi/6Ze05pa55rOV77yM5peg6ZyA6aqM6K+B77yM6K6+572u5ri45oiP57G75Z6L5Lul5Y+K5oi/6Ze05L+h5oGv5ZCO77yM55u05o6l6L+b5YWl5oi/6Ze0XHJcbiAgICAgICAgICAgIC8vIGlmIChnbEdhbWUuZW50ZXJSb29tVmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBnbEdhbWUucm9vbS5yZXFHb2xkUm9vbVZlcmlmeShnYW1lSUQsIGxldmVsKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIGdsR2FtZS5yb29tLnNldEdvbGRSb29tSW5mbyhnYW1lSUQsIGxldmVsKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBnbEdhbWUucm9vbS5zZXRHb2xkUm9vbUluZm8oZ2FtZUlELCBsZXZlbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeeOqeWutumHkeW4geaYr+WQpui2s+Wkn1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGNoZWNrR29sZChjb2luLCBtaW5DaW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLph5HluIHmo4DmtYtcIiwgY29pbiwgbWluQ2lvbik7XHJcbiAgICAgICAgaWYgKHBhcnNlSW50KGNvaW4pIDwgcGFyc2VJbnQobWluQ2lvbikpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coZ2xHYW1lLmkxOG4udChcIlVTRVIuR09MRExBQ0suVElUTEVcIiksIGdsR2FtZS5pMThuLnQoXCJVU0VSLkdPTERMQUNLLkNPTlRFTlRcIiksICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJzaG9wXCIpO1xyXG4gICAgICAgICAgICB9LCBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjdXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICBzaG93VXNlckluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZW1vdGVJbWFnZSh0aGlzLlBsYXllcmhlYWQsIGdsR2FtZS51c2VyLmdldChcImhlYWRVUkxcIikpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZXVzZXJJbmZvKCkge1xyXG4gICAgICAgIGxldCBjb2luID0gZ2xHYW1lLnVzZXIuZ2V0KFwiY29pblwiKVxyXG4gICAgICAgIHRoaXMuZ29sZENvdW50LnN0cmluZyA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKGNvaW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRHYW1lSWQoZ2FtZWlkKSB7XHJcbiAgICAgICAgdGhpcy5nYW1laWQgPSBnYW1laWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJnSW5mbygpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgY2xpY2tfdXNlcmluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInVzZXJpbmZvXCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2FkZGdvbGQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dTaG9wKDMwKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19iYWNrKCkge1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRXhpdEFyZWEoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2hlbHAoKSB7XHJcbiAgICAgICAgbGV0IHF6bm5fZ2FtZXJ1bGUgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMucXpubl9nYW1lcnVsZSk7XHJcbiAgICAgICAgcXpubl9nYW1lcnVsZS56SW5kZXggPSAzMDtcclxuICAgIH0sXHJcbiAgICBjbGlja19yZWNvcmQoKSB7XHJcbiAgICAgICAgbGV0IHF6bm5fcmVjb3JkID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLnF6bm5fcmVjb3JkKTtcclxuICAgICAgICBxem5uX3JlY29yZC56SW5kZXggPSAzMDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5ST09NX0VOVEVSX0hJREUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIm5vZGVSZW1vdmVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
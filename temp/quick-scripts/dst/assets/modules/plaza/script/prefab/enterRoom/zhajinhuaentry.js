
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/zhajinhuaentry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6cfedRLc9KOoxqyukNgPBL', 'zhajinhuaentry');
// modules/plaza/script/prefab/enterRoom/zhajinhuaentry.js

"use strict";

glGame.baseclass.extend({
  properties: {
    goldCount: cc.Label,
    zjhRule: cc.Prefab,
    zjhRecod: cc.Prefab,
    level: {
      type: cc.Node,
      "default": []
    },
    infoNode: [cc.Node],
    BGM: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var _this = this;

    this.gameid = 0;
    this.node.zIndex = 20;
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_SHOW, this.RootNodeShow, this);
    glGame.emitter.on(MESSAGE.UI.ROOM_ENTER_HIDE, this.RootNodeHide, this);
    glGame.emitter.on("nodeRemove", this.click_back, this);
    glGame.emitter.on("updateUserData", this.updateuserInfo, this);
    this.registerEvent();
    this.reqEnterArea();
    this.updateuserInfo();

    var _loop = function _loop(i) {
      var spineNode = _this.level[i].getChildByName("spine");

      spineNode.active = false;
      var skeleton = spineNode.getComponent(sp.Skeleton);
      var delayTime = cc.delayTime(0.06 * i);
      var callFunc = cc.callFunc(function () {
        skeleton.setAnimation(0, "animation", false);
        spineNode.active = true;
      });
      skeleton.setCompleteListener(function () {
        skeleton.setAnimation(0, "animation2", true);
      });

      _this.node.runAction(cc.sequence(delayTime, callFunc));
    };

    for (var i = 0; i < this.level.length; i++) {
      _loop(i);
    }
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
  reqEnterArea: function reqEnterArea() {
    this.gameID = glGame.scenetag.ZHAJINHUA;
    glGame.readyroom.reqEnterArea(glGame.scenetag.ZHAJINHUA);
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
  initUI: function initUI() {
    this.node.active = true;
    var configure = this.gameConfig;
    var count = this.level.length;

    for (var i = 1; i < count; i++) {
      this.infoNode[i].getChildByName("dizhulaout").getChildByName("dizhu_num").getComponent(cc.Label).string = this.getFloat(configure[i].BaseChips);
      this.infoNode[i].getChildByName("zhunrulayout").getChildByName("zhunru_num").getComponent(cc.Label).string = this.getFloat(configure[i].EntranceRestrictions);
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
  showUserInfo: function showUserInfo() {
    glGame.panel.showRemoteImage(this.Playerhead, glGame.user.get("headURL"));
  },
  updateuserInfo: function updateuserInfo() {
    var coin = glGame.user.get("coin");
    this.goldCount.string = this.getFloat(coin);
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
    var panel = glGame.panel.showPanel(this.zjhRule);
    panel.zIndex = 30;
  },
  click_record: function click_record() {
    var panel = glGame.panel.showPanel(this.zjhRecod);
    panel.zIndex = 30;
  },

  /**
   * 进入金币场房间
   * @param level 场次类型 1:初级场 2:中级场 3:高级场 4:土豪场 5:至尊场
   */
  enterGame: function enterGame(level) {
    var _this2 = this;

    glGame.room.reqMyGameState(this.gameID, level).then(function () {
      var gameID = _this2.gameID;

      if (_this2.gameConfig[level] == null) {
        glGame.panel.showMsgBox('提示', '该房间尚未开放，请尝试其他房间。');
        return;
      }

      if (glGame.user.isTourist()) {
        if (level != 99) {
          glGame.panel.showRegisteredGift(true);
          return;
        }
      }

      if (_this2.gameConfig[level].EntranceRestrictions > glGame.user.get("coin")) {
        console.log("这是当前的房间限制", _this2.gameConfig);
        var string = "<color=#99C7FF>\u60A8\u7684\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BE5\u623F\u95F4\u9700\u8981</c> <color=#ff0000> ".concat(_this2.getFloat(_this2.gameConfig[level].EntranceRestrictions), "  </c><color=#99C7FF>\u91D1\u5E01\u624D\u53EF\u4E0B\u6CE8\uFF0C\u662F\u5426\u9A6C\u4E0A\u524D\u5F80\u5145\u503C\uFF1F</c>");
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

      glGame.panel.showJuHua();

      _this2.node.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function () {
        glGame.panel.closeJuHua();
      })));

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
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_SHOW, this);
    glGame.emitter.off(MESSAGE.UI.ROOM_ENTER_HIDE, this);
    glGame.emitter.off("nodeRemove", this);
    glGame.emitter.off("updateUserData", this);
    this.unregisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXHpoYWppbmh1YWVudHJ5LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJnb2xkQ291bnQiLCJjYyIsIkxhYmVsIiwiempoUnVsZSIsIlByZWZhYiIsInpqaFJlY29kIiwibGV2ZWwiLCJ0eXBlIiwiTm9kZSIsImluZm9Ob2RlIiwiQkdNIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZ2FtZWlkIiwibm9kZSIsInpJbmRleCIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJVSSIsIlJPT01fRU5URVJfU0hPVyIsIlJvb3ROb2RlU2hvdyIsIlJPT01fRU5URVJfSElERSIsIlJvb3ROb2RlSGlkZSIsImNsaWNrX2JhY2siLCJ1cGRhdGV1c2VySW5mbyIsInJlZ2lzdGVyRXZlbnQiLCJyZXFFbnRlckFyZWEiLCJpIiwic3BpbmVOb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJza2VsZXRvbiIsImdldENvbXBvbmVudCIsInNwIiwiU2tlbGV0b24iLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInNldEFuaW1hdGlvbiIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImxlbmd0aCIsInVucmVnaXN0ZXJFdmVudCIsImdvbGRPbmxpbmVOdW0iLCJvbkdhbWVDb25maWciLCJvZmYiLCJtc2ciLCJnYW1lQ29uZmlnIiwiaW5pdFVJIiwiZ2FtZUlEIiwic2NlbmV0YWciLCJaSEFKSU5IVUEiLCJyZWFkeXJvb20iLCJjb25zb2xlIiwibG9nIiwiY291bnQiLCJzdHJpbmciLCJjb25maWd1cmUiLCJnZXRGbG9hdCIsIkJhc2VDaGlwcyIsIkVudHJhbmNlUmVzdHJpY3Rpb25zIiwib25DbGljayIsIm5hbWUiLCJjbGlja19oZWxwIiwiY2xpY2tfcmVjb3JkIiwiY2xpY2tfYWRkZ29sZCIsImNsaWNrX3VzZXJpbmZvIiwiZW50ZXJHYW1lIiwiZXJyb3IiLCJzaG93VXNlckluZm8iLCJwYW5lbCIsInNob3dSZW1vdGVJbWFnZSIsIlBsYXllcmhlYWQiLCJ1c2VyIiwiZ2V0IiwiY29pbiIsInNldEdhbWVJZCIsInVwZGF0ZUJnSW5mbyIsInNob3dQYW5lbEJ5TmFtZSIsInNob3dTaG9wIiwicmVxRXhpdEFyZWEiLCJyZW1vdmUiLCJzaG93UGFuZWwiLCJyb29tIiwicmVxTXlHYW1lU3RhdGUiLCJ0aGVuIiwic2hvd01zZ0JveCIsImlzVG91cmlzdCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInNob3dEaWFsb2ciLCJzdXNwaWNpb3VzIiwiZ2FtZSIsImlzX2dhbWUiLCJzaG93U2VydmljZSIsInNob3dKdUh1YSIsImNsb3NlSnVIdWEiLCJzZXRHb2xkUm9vbUluZm8iLCJjaGVja0dvbGQiLCJtaW5DaW9uIiwicGFyc2VJbnQiLCJpMThuIiwidCIsInZhbHVlIiwiTnVtYmVyIiwiZGl2IiwidG9TdHJpbmciLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFFcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsS0FETjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVGLEVBQUUsQ0FBQ0csTUFGSjtBQUdSQyxJQUFBQSxRQUFRLEVBQUVKLEVBQUUsQ0FBQ0csTUFITDtBQUlSRSxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLElBRE47QUFFSCxpQkFBUztBQUZOLEtBSkM7QUFRUkMsSUFBQUEsUUFBUSxFQUFFLENBQUNSLEVBQUUsQ0FBQ08sSUFBSixDQVJGO0FBU1JFLElBQUFBLEdBQUcsRUFBRTtBQUNESCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ1UsU0FEUjtBQUVELGlCQUFTO0FBRlI7QUFURyxHQUZRO0FB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QU0sQ0FBQ0QsS0FBRCxDQUFOLENBQWNFLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBRCxDQUF5QkMsUUFBekIsRUFBUDtBQUNILEdBcE1tQjtBQXFNcEJDLEVBQUFBLFNBck1vQix1QkFxTVI7QUFDUi9HLElBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZThCLEdBQWYsQ0FBbUI1QixPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBOUIsRUFBOEMsSUFBOUM7QUFDQXhCLElBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZThCLEdBQWYsQ0FBbUI1QixPQUFPLENBQUNDLEVBQVIsQ0FBV0csZUFBOUIsRUFBOEMsSUFBOUM7QUFDQTFCLElBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZThCLEdBQWYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakM7QUFDQWxELElBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZThCLEdBQWYsQ0FBbUIsZ0JBQW5CLEVBQW9DLElBQXBDO0FBQ0EsU0FBS0gsZUFBTDtBQUNIO0FBM01tQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnb2xkQ291bnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHpqaFJ1bGU6IGNjLlByZWZhYixcclxuICAgICAgICB6amhSZWNvZDogY2MuUHJlZmFiLFxyXG4gICAgICAgIGxldmVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmZvTm9kZTogW2NjLk5vZGVdLFxyXG4gICAgICAgIEJHTToge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMjA7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5ST09NX0VOVEVSX1NIT1csIHRoaXMuUm9vdE5vZGVTaG93LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSwgdGhpcy5Sb290Tm9kZUhpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwibm9kZVJlbW92ZVwiLCB0aGlzLmNsaWNrX2JhY2ssIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcy51cGRhdGV1c2VySW5mbywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZXVzZXJJbmZvKCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGluZU5vZGUgPSB0aGlzLmxldmVsW2ldLmdldENoaWxkQnlOYW1lKFwic3BpbmVcIik7XHJcbiAgICAgICAgICAgIHNwaW5lTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHNrZWxldG9uID0gc3BpbmVOb2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIGxldCBkZWxheVRpbWUgPSBjYy5kZWxheVRpbWUoMC4wNiAqIGkpO1xyXG4gICAgICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYygoKT0+IHtcclxuICAgICAgICAgICAgICAgIHNrZWxldG9uLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCBmYWxzZSk7IFxyXG4gICAgICAgICAgICAgICAgc3BpbmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uMlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZGVsYXlUaW1lLCBjYWxsRnVuYykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgUm9vdE5vZGVTaG93KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZXFFbnRlckFyZWEoKTtcclxuICAgIH0sXHJcbiAgICBSb290Tm9kZUhpZGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAgLy/kuovku7bnm5HlkKxcclxuICAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiZ29sZE9ubGluZU51bVwiLCB0aGlzLmdvbGRPbmxpbmVOdW0sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwib25HYW1lQ29uZmlnXCIsIHRoaXMub25HYW1lQ29uZmlnLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvL+S6i+S7tumUgOavgVxyXG4gICAgdW5yZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcImdvbGRPbmxpbmVOdW1cIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwib25HYW1lQ29uZmlnXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIG9uR2FtZUNvbmZpZyhtc2cpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBtc2c7XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgIH0sXHJcbiAgICByZXFFbnRlckFyZWEoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lSUQgPSBnbEdhbWUuc2NlbmV0YWcuWkhBSklOSFVBO1xyXG4gICAgICAgIGdsR2FtZS5yZWFkeXJvb20ucmVxRW50ZXJBcmVhKGdsR2FtZS5zY2VuZXRhZy5aSEFKSU5IVUEpO1xyXG4gICAgfSxcclxuICAgIGdvbGRPbmxpbmVOdW0obXNnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lnKjnur/kurrmlbDnmoTmtojmga9cIiwgbXNnKVxyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMubGV2ZWwubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobXNnW2kgKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtpXS5nZXRDaGlsZEJ5TmFtZShcInBlb3BsZV9udW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2dbaSArIDFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBjb25maWd1cmUgPSB0aGlzLmdhbWVDb25maWc7XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMubGV2ZWwubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmluZm9Ob2RlW2ldLmdldENoaWxkQnlOYW1lKFwiZGl6aHVsYW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImRpemh1X251bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoY29uZmlndXJlW2ldLkJhc2VDaGlwcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb05vZGVbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVucnVsYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVucnVfbnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChjb25maWd1cmVbaV0uRW50cmFuY2VSZXN0cmljdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9iYWNrXCI6IHRoaXMuY2xpY2tfYmFjaygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9oZWxwXCI6IHRoaXMuY2xpY2tfaGVscCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yZWNvcmRcIjogdGhpcy5jbGlja19yZWNvcmQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJteWNvaW5JbmZvXCI6IHRoaXMuY2xpY2tfYWRkZ29sZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImhlYWRiZ1wiOiB0aGlzLmNsaWNrX3VzZXJpbmZvKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nob25nemhpXCI6IHRoaXMuY2xpY2tfYWRkZ29sZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInByaW1hcnlcIjogdGhpcy5lbnRlckdhbWUoOTkpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImludGVybWVkaWF0ZVwiOiB0aGlzLmVudGVyR2FtZSgxKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZW5pb3JcIjogdGhpcy5lbnRlckdhbWUoMik7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidHVoYW9cIjogdGhpcy5lbnRlckdhbWUoMyk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3VwcmVtYWN5XCI6IHRoaXMuZW50ZXJHYW1lKDQpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInZvbHZvXCI6IHRoaXMuZW50ZXJHYW1lKDUpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob3dVc2VySW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKHRoaXMuUGxheWVyaGVhZCwgZ2xHYW1lLnVzZXIuZ2V0KFwiaGVhZFVSTFwiKSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRldXNlckluZm8oKSB7XHJcbiAgICAgICAgbGV0IGNvaW4gPSBnbEdhbWUudXNlci5nZXQoXCJjb2luXCIpXHJcbiAgICAgICAgdGhpcy5nb2xkQ291bnQuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChjb2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0R2FtZUlkKGdhbWVpZCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZWlkID0gZ2FtZWlkO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCZ0luZm8oKSB7XHJcbiAgICAgICBcclxuICAgIH0sXHJcbiAgICBjbGlja191c2VyaW5mbygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwidXNlcmluZm9cIik7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYWRkZ29sZCgpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Nob3AoMzApO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2JhY2soKSB7XHJcbiAgICAgICAgZ2xHYW1lLnJlYWR5cm9vbS5yZXFFeGl0QXJlYSgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfaGVscCgpIHtcclxuICAgICAgICBsZXQgcGFuZWwgPSBnbEdhbWUucGFuZWwuc2hvd1BhbmVsKHRoaXMuempoUnVsZSk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfcmVjb3JkKCkge1xyXG4gICAgICAgIGxldCBwYW5lbCA9IGdsR2FtZS5wYW5lbC5zaG93UGFuZWwodGhpcy56amhSZWNvZCk7XHJcbiAgICAgICAgcGFuZWwuekluZGV4ID0gMzA7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vlhaXph5HluIHlnLrmiL/pl7RcclxuICAgICAqIEBwYXJhbSBsZXZlbCDlnLrmrKHnsbvlnosgMTrliJ3nuqflnLogMjrkuK3nuqflnLogMzrpq5jnuqflnLogNDrlnJ/osarlnLogNTroh7PlsIrlnLpcclxuICAgICAqL1xyXG4gICAgZW50ZXJHYW1lKGxldmVsKSB7XHJcbiAgICAgICAgZ2xHYW1lLnJvb20ucmVxTXlHYW1lU3RhdGUodGhpcy5nYW1lSUQsIGxldmVsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdhbWVJRCA9IHRoaXMuZ2FtZUlEO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lQ29uZmlnW2xldmVsXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveCgn5o+Q56S6JywgJ+ivpeaIv+mXtOWwmuacquW8gOaUvu+8jOivt+WwneivleWFtuS7luaIv+mXtOOAgicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsICE9IDk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RlcmVkR2lmdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lQ29uZmlnW2xldmVsXS5FbnRyYW5jZVJlc3RyaWN0aW9ucyA+IGdsR2FtZS51c2VyLmdldChcImNvaW5cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE5oi/6Ze06ZmQ5Yi2XCIsIHRoaXMuZ2FtZUNvbmZpZylcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBgPGNvbG9yPSM5OUM3RkY+5oKo55qE6YeR5biB5LiN6Laz77yM6K+l5oi/6Ze06ZyA6KaBPC9jPiA8Y29sb3I9I2ZmMDAwMD4gJHt0aGlzLmdldEZsb2F0KHRoaXMuZ2FtZUNvbmZpZ1tsZXZlbF0uRW50cmFuY2VSZXN0cmljdGlvbnMpfSAgPC9jPjxjb2xvcj0jOTlDN0ZGPumHkeW4geaJjeWPr+S4i+azqO+8jOaYr+WQpumprOS4iuWJjeW+gOWFheWAvO+8nzwvYz5gXHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBzdHJpbmcsICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTaG9wKDEwMCkgfSwgKCkgPT4geyB9LCBcIuWPlua2iFwiLCBcIuWFheWAvFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKChnbEdhbWUudXNlci5zdXNwaWNpb3VzID09IDEgJiZnbEdhbWUudXNlci5nYW1lID09IDIgKSB8fCBnbEdhbWUudXNlci5pc19nYW1lID09IDIgKXtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwiXCIsIFwi5oKo55qE6LSm5Y+35pWw5o2u5byC5bi477yM5pqC5pe256aB5q2i6L+b5YWl5ri45oiP77yM5aaC5pyJ55aR6Zeu77yM6K+36IGU57O75a6i5pyN77yBXCIsICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4ge30sIFwi5oiR55+l6YGT5LqGXCIsIFwi6IGU57O75a6i5pyNXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dKdUh1YSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDE1KSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuY2xvc2VKdUh1YSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSlcclxuICAgIFxyXG4gICAgICAgICAgICBnbEdhbWUucm9vbS5zZXRHb2xkUm9vbUluZm8oZ2FtZUlELCBsZXZlbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeeOqeWutumHkeW4geaYr+WQpui2s+Wkn1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGNoZWNrR29sZChjb2luLCBtaW5DaW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLph5HluIHmo4DmtYtcIiwgY29pbiwgbWluQ2lvbik7XHJcbiAgICAgICAgaWYgKHBhcnNlSW50KGNvaW4pIDwgcGFyc2VJbnQobWluQ2lvbikpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coZ2xHYW1lLmkxOG4udChcIlVTRVIuR09MRExBQ0suVElUTEVcIiksIGdsR2FtZS5pMThuLnQoXCJVU0VSLkdPTERMQUNLLkNPTlRFTlRcIiksICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJzaG9wXCIpO1xyXG4gICAgICAgICAgICB9LCBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUk9PTV9FTlRFUl9TSE9XLHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLlVJLlJPT01fRU5URVJfSElERSx0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJub2RlUmVtb3ZlXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZVVzZXJEYXRhXCIsdGhpcyk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
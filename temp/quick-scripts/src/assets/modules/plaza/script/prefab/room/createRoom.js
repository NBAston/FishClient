"use strict";
cc._RF.push(module, '729ecRhKS5HUYANEaxMbTbt', 'createRoom');
// modules/plaza/script/prefab/room/createRoom.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    labDiamonds: cc.Label,
    btnContent: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.registerEvent();
    this.updataInfo();
  },
  start: function start() {},
  setGameButton: function setGameButton(gameId) {
    this.gameId = gameId;
    var gameName = glGame.scene.getSceneNameByID(gameId);
    this.selectGame(gameName);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updataInfo, this);
    glGame.emitter.on(MESSAGE.UI.EXIT_CREATE_ROOM, this.remove, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off(MESSAGE.UI.EXIT_CREATE_ROOM, this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "rqznn":
      case "rzjh":
      case "rsss":
      case "rddz":
      case "rbjl":
      case "resyd":
      case "rxzdd":
        this.selectGame(name);
        break;

      case "btn_close":
        this.remove();
        break;

      case "btn_add":
        glGame.panel.showPanelByName("exchangeDiamond");
        break;

      default:
        break;
    }
  },
  //刷新钻石数量
  updataInfo: function updataInfo() {
    this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.content.childrenCount) return;

    for (var i = 0; i < this.content.childrenCount; i++) {
      this.content.children[i].active = false;
    }
  },
  setButton: function setButton(name) {
    for (var i = 0; i < this.btnContent.childrenCount; i++) {
      var btn = this.btnContent.children[i];

      if (btn.name === name) {
        btn.getComponent(cc.Toggle).isChecked = true;
      }
    }
  },
  selectGame: function selectGame(name) {
    this.hideAllPanel();
    this.setButton(name);
    this.getGameIdByRoomNum(name); // if (name == "rqznn") {
    //     this.getGameIdByRoomNum(name);
    // } else {
    //     if (this.content.getChildByName(`${name}Create`)) {
    //         this.content.getChildByName(`${name}Create`).active = true;
    //         return;
    //     }
    //     glGame.panel.getPanelByName(`${name}Create`).then(panelData => {
    //         if (!panelData) return;
    //         panelData.parent = this.content;
    //     })
    // }
  },
  getGameIdByRoomNum: function getGameIdByRoomNum(gameName) {
    var _this = this;

    // 检查当前游戏是否已经在更新队列
    if (glGame.assetsManager.isUpdateQueue(this.gameId)) return; // 检查游戏是否需要更新

    glGame.gamelistcfg.isNeedUpdate(this.gameId).then(function (bol) {
      if (bol) {
        // 开始更新【%s(游戏名称)】，请耐心等待...
        glGame.panel.showTip("\u5F00\u59CB\u66F4\u65B0\u3010".concat(glGame.room.getGameDictById(_this.gameId), "\u3011\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85..."));

        var _gameName = glGame.scene.getSceneNameByID(_this.gameId);

        glGame.gamelistcfg.setGameUpdate(_gameName, false);
        glGame.assetsManager.gameUpdata({
          gameID: _this.gameId,
          manifestUrl: null
        });

        _this.remove();
      } else {
        if (_this.content.getChildByName("".concat(gameName, "Create"))) {
          _this.content.getChildByName("".concat(gameName, "Create")).active = true;
          return;
        }

        glGame.panel.getPanelByName("".concat(gameName, "Create")).then(function (panelData) {
          if (!panelData) return;
          panelData.parent = _this.content;
        });
      }
    });
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.div(100).toString();
    } else {
      value = Number(value).div(100);
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
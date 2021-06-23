"use strict";
cc._RF.push(module, '5adbddIEMhDIKxwyTLKJXTG', 'center');
// modules/plaza/script/prefab/center.js

"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var groupId = {
  1: "hot",
  2: "arcade",
  3: "chessCard",
  4: "fishing",
  5: "room"
};
var CORNER_MARK = {
  0: "无",
  1: "推荐",
  2: "火爆",
  3: "最新"
};
var BANNER_START = {
  ON: 1,
  //开启
  OFF: 0 //关闭

};
glGame.baseclass.extend({
  properties: {
    btnWebGame: cc.Node,
    allInterface: cc.Node,
    gamegroupView: cc.Node,
    gamegroup: cc.Node,
    prefab_banner: cc.Prefab,
    //轮播图预制
    prefab_room_field: cc.Prefab,
    //房间场预制
    atlas_corner_mark: cc.SpriteAtlas
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.typeIndex = glGame.isCategoryData.typeIndex;
    this.firstTimeTag = false;
    this.banner = null;
    if (isiPhoneX) this.AdaptiveIphonex();
    this.gamegroupView.getComponent(cc.Widget).updateAlignment();
    this.AdaptiveInterface();
  },
  AdaptiveIphonex: function AdaptiveIphonex() {
    this.iphonexWidth = 80; //适配iphone的宽度偏移

    this.gamegroupView.width += this.iphonexWidth;

    var _iterator = _createForOfIteratorHelper(this.gamegroup.children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var toggleNode = _step.value;
        toggleNode.x = this.iphonexWidth / 2;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  AdaptiveInterface: function AdaptiveInterface() {
    var _this = this;

    this.interval = 20;
    this.leftInterval = 30; // 向 php 获取到当前游戏配置数量后进行UI展现

    glGame.gamelistcfg.reqGameGroup(function () {
      _this.interFaceMode = glGame.gamelistcfg.get("interFaceMode");
      _this.gameDisplayTypeList = glGame.gamelistcfg.get("gameDisplayTypeList"); // 获取分类的宽度

      var gamegroupWidth = 0;

      if (_this.interFaceMode == 1) {
        _this.gamegroupView.active = true;
        _this.gamegroupView.zIndex = 30;
        gamegroupWidth = _this.gamegroupView.width + _this.gamegroupView.getComponent(cc.Widget).left + _this.leftInterval;
      } else {
        _this.typeIndex = "_0";
        _this.gamegroupView.active = false;
        gamegroupWidth = _this.interval * 2;
        glGame.emitter.emit("setplazabg", {
          width: _this.gamegroupView.width
        }); //更换大厅背景图
      } // 获取banner的宽度


      var billboardsData = glGame.user.reqBillboardsData;
      var bannerWidth = 0; // 校验方式为服务端如无数据则默认为开启

      if (billboardsData["switch"] != BANNER_START.OFF) {
        // scrollview的监听相互影响，所以根据坐标属性放入父节点避免监听相互干扰
        _this.banner = glGame.panel.showChildPanel(_this.prefab_banner, _this.node.parent);
        _this.banner.x = -_this.node.width / 2 + gamegroupWidth + _this.banner.width / 2;
        bannerWidth = _this.banner.width;
      } // 设置游戏列表的宽度


      _this.allInterface.width = _this.node.width - gamegroupWidth - bannerWidth - _this.interval - _this.leftInterval;

      _this.allInterface.getComponent(cc.Widget).updateAlignment();

      _this.allInterface.getChildByName("view").getComponent(cc.Widget).updateAlignment(); // 初始化游戏数据


      _this.getGamesList();
    });
  },
  // 获取游戏数据
  getGamesList: function getGamesList() {
    var _this2 = this;

    var gameDisplayType = glGame.gamelistcfg.get("gameDisplayType");
    var gameDisplayToken = glGame.gamelistcfg.get("gameDisplayToken"); // 获取对应的数据列表

    var token = cc.sys.localStorage.getItem("gametoken");

    if (gameDisplayToken != token && gameDisplayType == 1) {
      console.log("center_sort ===> 从网络获取");
      var msg = {
        "type": gameDisplayType
      };
      glGame.gamelistcfg.reqGamesList(msg, function () {
        _this2.gamesList = glGame.gamelistcfg.get("gamesList");
        cc.sys.localStorage.setItem("gametoken", gameDisplayToken);
        glGame.storage.setItem("gamedata", _this2.gamesList);

        if (_this2.interFaceMode == 1) {
          console.log("center_sort ===> 有分类展示");

          _this2.setGamegRoup();
        } else {
          console.log("center_sort ===> 无分类展示");

          _this2.initData();
        }
      });
    } else {
      console.log("center_sort ===> 从本地获取");
      this.gamesList = glGame.storage.getItem("gamedata");
      glGame.gamelistcfg.selfGameList(this.gamesList);

      if (this.interFaceMode == 1) {
        console.log("center_sort ===> 有分类展示");
        this.setGamegRoup();
      } else {
        console.log("center_sort ===> 无分类展示");
        this.initData();
      }
    }
  },
  // 初始无分类数据
  initData: function initData() {
    if (this.interFaceMode == 2) {
      var gameListArray = Object.values(this.gamesList).filter(function (item) {
        return item.id !== 5;
      }).map(function (item) {
        return Object.values(item.gameList);
      });
      var result = {};
      gameListArray.forEach(function (item) {
        item.forEach(function (item) {
          result[item.id] = item;
        });
      });
      this.gamesList["_0"] = {};
      this.gamesList["_0"].id = 0;
      this.gamesList["_0"].name = "全部游戏";
      this.gamesList["_0"].gameList = result;
      this.typeIndex == "_5" ? this.initRoomList() : this.initList();
    }
  },
  //设置显示的分组
  setGamegRoup: function setGamegRoup() {
    for (var i = 0; i < this.gameDisplayTypeList.length; i++) {
      var id = this.gameDisplayTypeList[i].id;
      var platform_node = this.gamegroup.getChildByName(groupId[id]);
      platform_node.zIndex = i;
      platform_node.typeIndex = "_".concat(id);

      if (this.typeIndex == null) {
        this.typeIndex = "_".concat(id);
        this.firstTimeTag = true;
        var m_toggle = platform_node.getComponent(cc.Toggle);

        if (m_toggle.isChecked) {
          console.log("center_sort ===> this.typeIndex为空");
          this.typeIndex == "_5" ? this.initRoomList() : this.initList();
        }

        m_toggle.check();
        glGame.emitter.emit("setplazabg", {
          name: groupId[id],
          width: this.gamegroupView.width
        }); //更换大厅背景图
      } else {
        if (this.typeIndex == "_".concat(id)) {
          var _m_toggle = platform_node.getComponent(cc.Toggle);

          if (_m_toggle.isChecked) {
            console.log("center_sort ===> this.typeIndex不为空");
            this.typeIndex == "_5" ? this.initRoomList() : this.initList();
          }

          _m_toggle.check();

          glGame.emitter.emit("setplazabg", {
            name: groupId[id],
            width: this.gamegroupView.width
          }); //更换大厅背景图
        }
      }

      platform_node.active = true;
    }
  },
  onClick: function onClick(name, node) {
    console.log("center_sort ===> 点击按钮", name, node);

    switch (name) {
      case "hot":
      case "chessCard":
      case "arcade":
      case "fishing":
      case "realPerson":
      case "sports":
      case "lottery":
      case "compete":
        this.switchInterface(name, node);
        break;

      case "room":
        this.switchRoom(name, node);
        break;

      default:
        if (!isEnableHotUpdate) break;

        if (name.indexOf("_") !== -1) {
          // 进入三方游戏
          var sf_game_list = this.gamesList[this.typeIndex].gameList; // glGame.emitter.emit(MESSAGE.UI.WEBVIEW_ON, { gamesList: sf_game_list[name], type: 1 });

          glGame.gamelistcfg.openTripartiteGame({
            gamesList: sf_game_list[name],
            type: 1
          });
        }

        break;
    }
  },
  // 游戏分类切换
  switchInterface: function switchInterface(name, node) {
    if (this.banner) this.banner.active = true;
    if (this.roomInterface) this.roomInterface.active = false;
    this.allInterface.active = true; // 设置分页id

    this.typeIndex = node.typeIndex;
    glGame.emitter.emit("setplazabg", {
      name: name,
      width: this.gamegroupView.width
    }); //更换大厅背景图

    this.initList();
  },
  // 进入创建房间切换
  switchRoom: function switchRoom(name, node) {
    if (this.banner) this.banner.active = false;
    this.allInterface.active = false; // 设置分页id

    this.typeIndex = node.typeIndex;
    glGame.emitter.emit("setplazabg", {
      name: name,
      width: this.gamegroupView.width
    }); //更换大厅背景图

    this.initRoomList();
  },
  //根据index生成相应游戏列表
  initList: function initList() {
    var _this3 = this;

    var scrollTime = 0.25,
        //图标移动时间
    everyTime = 0.05,
        //图标移动间隔时间
    distance = 30,
        //图标弹动距离
    distanceTime = 0.1; //图标弹动时间

    var tempX = 9,
        //图标之间的间隔
    gameitemWidth = 327; //item大小

    var gameGroup = this.gamesList[this.typeIndex].gameList; // 屏蔽web版网页游戏

    var game_list = [];
    Object.values(gameGroup).forEach(function (item) {
      if (!isEnableHotUpdate && item.id > 9999) return;
      game_list.push(item);
    }); // 获取需要展示节点的位置

    var posArr = this.getPosArr(game_list);
    this.allInterface.getComponent(cc.ScrollView).stopAutoScroll();
    var view = this.allInterface.getChildByName("view");
    view.getComponent(cc.Widget).updateAlignment();
    var viewWidth = view.width;
    var content = view.getChildByName("content");
    content.destroyAllChildren();
    content.removeAllChildren();
    content.x = 0;
    glGame.fileutil.readPrefab(glGame.panel.plazaPanelDict["gameitem"]).then(function (prefab) {
      var game_length = 0; //统计展示游戏的数量

      for (var i = 0; i < game_list.length; i++) {
        var id = game_list[i].id; // 三方游戏的处理

        if (id > 9999) {
          var newPrefab = cc.instantiate(_this3.btnWebGame);
          newPrefab.parent = content;
          newPrefab.name = "_" + id;
          newPrefab.active = true; // 设置游戏名称

          newPrefab.getChildByName("game_name").getComponent(cc.Label).string = game_list[i].gameName; // 设置角标

          if (game_list[i].tag > 0) {
            var cornerMark = newPrefab.getChildByName("cornerMark");

            var corner_mark = _this3.atlas_corner_mark.getSpriteFrame("img_corner_mark".concat(game_list[i].tag));

            cornerMark.getComponent(cc.Sprite).spriteFrame = corner_mark;
            cornerMark.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[game_list[i].tag];
            cornerMark.active = true;
          } // 设置游戏图标


          if (game_list[i].icon) {
            var url = glGame.user.get('url').resource_url;
            glGame.panel.showRemoteImage(newPrefab.getChildByName("game_icon"), url + game_list[i].icon);
          }

          game_length++;
        } else {
          // 添加自己的游戏
          var panel = cc.instantiate(prefab);
          panel.parent = content;
          panel.position = cc.v2(0, cc.winSize.height + panel.height);
          panel.getComponent(panel.name).resetData();
          panel.getComponent(panel.name).initUI(game_list[i]);
          panel.name = "".concat(id);
          game_length++;
        }
      } //设置scrollview.width


      var width = Math.ceil(game_length / 2) * (gameitemWidth + tempX);
      content.width = width < viewWidth ? viewWidth : width;

      if (_this3.firstTimeTag) {
        // 判断第一次不执行
        _this3.firstTimeTag = false;

        for (var _i = 0; _i < game_length; _i++) {
          content.children[_i].position = posArr[_i];
        }
      } else {
        // 执行动画
        for (var _i2 = 0; _i2 < game_length; _i2++) {
          var item = content.children[_i2];
          item.position = cc.v2(posArr[_i2].x + viewWidth, posArr[_i2].y);
          item.runAction(cc.sequence(cc.moveTo(scrollTime + everyTime * _i2, posArr[_i2].x - distance, posArr[_i2].y), cc.moveTo(distanceTime, posArr[_i2])));
        }
      }
    });
    this.setCategoryData();
  },
  //获得展示节点的位置
  getPosArr: function getPosArr(list) {
    var posX = 164,
        posY = [130, -180],
        posArr = [];

    for (var i = 0; i < list.length; i++) {
      var index = i % 2;
      posArr.push(cc.v2(index == 0 && i != 0 ? posX += 336 : posX, posY[index]));
    }

    console.log("这是当前所需要的位置列表", posArr);
    return posArr;
  },
  initRoomList: function initRoomList() {
    if (!this.gamesList) return;
    var room_gameGroup = this.gamesList[this.typeIndex];
    this.roomInterface = this.node.getChildByName("room_field");

    if (!this.roomInterface) {
      this.roomInterface = cc.instantiate(this.prefab_room_field);
      this.roomInterface.parent = this.node;
      this.roomInterface.position = cc.v2(cc.winSize.width / 2, 0);
      this.roomInterface.zIndex = 10;
    }

    this.roomInterface.active = true;
    this.roomInterface.getComponent(this.roomInterface.name).initData(room_gameGroup);
    this.setCategoryData();
    this.firstTimeTag = false;
  },
  // 设置现在在那个分类
  setCategoryData: function setCategoryData() {
    console.log("center_sort ===> 设置现在在那个分类", this.typeIndex);
    glGame.isCategoryData.typeIndex = this.typeIndex;
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
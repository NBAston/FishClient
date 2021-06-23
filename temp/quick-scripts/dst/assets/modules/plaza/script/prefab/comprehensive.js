
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/comprehensive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3913d/Vzw1CoocQD4E/TCsU', 'comprehensive');
// modules/plaza/script/prefab/comprehensive.js

"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// isEnableHotUpdate
var groupId = {
  1: "chessCard",
  //棋牌
  2: "fishing",
  //捕鱼
  3: "arcade",
  //电子
  4: "realPerson",
  //视讯
  5: "lottery",
  //彩票
  6: "sports",
  //体育
  7: "compete",
  //电竞
  8: "room",
  //房间
  9: "hot" //热门

};
var BANNER_START = {
  ON: 1,
  //开启
  OFF: 0 //关闭

};
var CORNER_MARK = {
  0: "无",
  1: "推荐",
  2: "火爆",
  3: "最新"
};
var QP_BG_IMH = [1, 12, 16, 29];
var TY_BG_IMH = [7, 21, 22, 25];
glGame.baseclass.extend({
  properties: {
    btnWebGame: cc.Node,
    btnPlatform: cc.Node,
    btnPlatformBig: cc.Node,
    electronicNode: cc.Node,
    sportsNode: cc.Node,
    // 分类列表
    gamegroupView: cc.Node,
    gamegroup: cc.Node,
    // 游戏分类展示
    gameInterface: cc.Node,
    dzPlatType: cc.Node,
    qpPlatType: cc.Node,
    // 棋牌分类展示
    platInterface: cc.Node,
    tipNode: cc.Node,
    // 视讯分类展示
    videoInterface: cc.Node,
    videoNode: cc.Node,
    // 电竞分类展示
    electronicInterface: cc.Node,
    prefab_banner: cc.Prefab,
    // 轮播图预制
    prefab_room_field: cc.Prefab,
    //房间场预制
    atlas_qp_plat: cc.SpriteAtlas,
    atlas_dz_plat: cc.SpriteAtlas,
    atlas_video_plat: cc.SpriteAtlas,
    atlas_ty_plat: cc.SpriteAtlas,
    atlas_corner_mark: cc.SpriteAtlas,
    big_qp_plat: [cc.SpriteFrame],
    big_ty_plat: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    this.game_item_szie = this.btnWebGame.width + 15; //item大小 + 间隔   350

    this.isScroll = false;
    this.pageSize = 16;
    this.pageIndex = 1;
    this.pageCount = 0;
    this.gameInterface.on("scroll-to-right", this.onGameInterfaceRigthCb, this);
    this.platInterface.on("scroll-to-right", this.onPlatInterfaceRigthCb, this);
    glGame.emitter.on("resize", this.onOrientationchange, this); // this.gameInterface.on("bounce-right", this.onGameInterfaceRigthCb, this);
    // this.platInterface.on("bounce-right", this.onPlatInterfaceRigthCb, this);
  },
  onEnable: function onEnable() {
    this.refreshGameList();
  },
  onGameInterfaceRigthCb: function onGameInterfaceRigthCb(scrollView) {
    if (this.pageIndex >= this.pageCount) {
      console.log("comprehensive ===> 游戏已经加载完成", this.pageIndex);
    } else {
      this.pageIndex++;
      this.isGameNature(true);
    }
  },
  onPlatInterfaceRigthCb: function onPlatInterfaceRigthCb(scrollView) {
    if (this.typeIndex == "_1" && this.qpPlatIndex != null) {
      if (this.pageIndex >= this.pageCount) {} else {
        this.pageIndex++;
        this.isGameNature(true);
      }
    }
  },
  start: function start() {
    this.typeIndex = glGame.isCategoryData.typeIndex;
    var platIndex = glGame.isCategoryData.platIndex;
    this.qpPlatIndex = this.typeIndex == "_1" ? platIndex : null;
    this.dzPlatIndex = this.typeIndex == "_3" ? platIndex : null;
    this.videoPlatIndex = this.typeIndex == "_4" ? platIndex : null;
    this.firstTimeTag = false;
    this.banner = null;
    if (isiPhoneX) this.AdaptiveIphonex();
    this.gamegroupView.getComponent(cc.Widget).updateAlignment();
    this.AdaptiveInterface();
  },
  // 适配iPhoneX手机
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
  // 初始化界面
  AdaptiveInterface: function AdaptiveInterface() {
    var _this = this;

    var width = this.node.width * 0.65 + 20;
    this.offsetLeft = (this.node.width - width - this.gamegroupView.width) / 4;
    this.interval = (this.node.width - width - this.gamegroupView.width) / 4;
    this.leftInterval = 15; // 向 php 获取到当前游戏配置数量后进行UI展现

    glGame.gamelistcfg.reqGameGroup(function () {
      _this.refreshGameList(); // 初始化游戏数据


      _this.getGamesList();
    });
  },
  onOrientationchange: function onOrientationchange() {
    var _this2 = this;

    this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function () {
      _this2.refreshGameList();
    })));
  },
  refreshGameList: function refreshGameList() {
    this.interFaceMode = glGame.gamelistcfg.get("interFaceMode");
    this.gameDisplayTypeList = glGame.gamelistcfg.get("gameDisplayTypeList");

    if (this.interFaceMode == null || this.gameDisplayTypeList == null) {
      return;
    } // 获取分类的宽度


    var gamegroupWidth = 0;

    if (this.interFaceMode == 1) {
      this.gamegroupView.active = true;
      this.gamegroupView.zIndex = 30;
      gamegroupWidth = this.gamegroupView.width + this.gamegroupView.getComponent(cc.Widget).left;
    } else {
      this.interval = 14;
      this.typeIndex = "_0";
      this.gamegroupView.active = false;
      gamegroupWidth = this.interval * 2;
    } // 获取banner的宽度


    var billboardsData = glGame.user.reqBillboardsData;
    var bannerWidth = 0; // 校验方式为服务端如无数据则默认为开启

    if (billboardsData["switch"] != BANNER_START.OFF) {
      this.interval = 50; // scrollview的监听相互影响，所以根据坐标属性放入父节点避免监听相互干扰

      this.banner = glGame.panel.showChildPanel(this.prefab_banner, this.node.parent);
      this.banner.x = -this.node.width / 2 + gamegroupWidth + this.leftInterval + this.banner.width / 2;
      this.banner.y = -40;
      bannerWidth = this.banner.width;
    } // 设置游戏列表的宽度


    this.gameInterface.width = this.node.width - gamegroupWidth - bannerWidth - this.interval - this.leftInterval;
    this.gameInterface.getComponent(cc.Widget).updateAlignment();
    this.gameInterface.getChildByName("view").getComponent(cc.Widget).updateAlignment(); // 设置平台列表的宽度

    this.platInterface.width = this.node.width - gamegroupWidth - bannerWidth - this.interval - this.leftInterval;
    this.platInterface.getComponent(cc.Widget).updateAlignment();
    this.platInterface.getChildByName("view").getComponent(cc.Widget).updateAlignment();

    if (this.videoInterface.active) {
      this.videoInterface.width = this.node.width - this.getGameGroupWidth();
      this.videoInterface.getComponent(cc.Widget).updateAlignment();
    }

    if (this.electronicInterface) {
      this.electronicInterface.width = this.node.width - this.getGameGroupWidth();
      this.electronicInterface.getComponent(cc.Widget).updateAlignment();
    }
  },
  // 获取游戏数据
  getGamesList: function getGamesList() {
    var _this3 = this;

    var gameDisplayType = glGame.gamelistcfg.get("gameDisplayType");
    var gameDisplayToken = glGame.gamelistcfg.get("gameDisplayToken"); // 获取对应的数据列表

    var token = cc.sys.localStorage.getItem("gametoken");

    if (gameDisplayToken != token && gameDisplayType == 2) {
      console.log("comprehensive ===> 从网络获取");
      var msg = {
        "type": gameDisplayType
      };
      glGame.gamelistcfg.reqGamesList(msg, function () {
        _this3.gamesList = glGame.gamelistcfg.get("gamesList");
        cc.sys.localStorage.setItem("gametoken", gameDisplayToken);
        glGame.storage.setItem("gamedata", _this3.gamesList);

        if (_this3.interFaceMode == 1) {
          console.log("comprehensive ===> 有分类展示");

          _this3.setGamegroup();
        } else {
          console.log("comprehensive ===> 无分类展示");

          _this3.isGameNature();
        }
      });
    } else {
      console.log("comprehensive ===> 从本地获取");
      this.gamesList = glGame.storage.getItem("gamedata");
      glGame.gamelistcfg.selfGameList(this.gamesList);

      if (this.interFaceMode == 1) {
        console.log("comprehensive ===> 有分类展示");
        this.setGamegroup();
      } else {
        console.log("comprehensive ===> 无分类展示");
        this.isGameNature();
      }
    }
  },
  //设置游戏分类
  setGamegroup: function setGamegroup() {
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
          this.isGameNature();
        }

        m_toggle.check();
        glGame.emitter.emit("setplazabg", {
          name: groupId[id],
          width: this.gamegroupView.width
        }); //更换大厅背景图
      } else {
        if (this.typeIndex == "_".concat(id)) {
          console.log("comprehensive ===> 已经有分类");

          var _m_toggle = platform_node.getComponent(cc.Toggle);

          if (_m_toggle.isChecked) {
            this.isGameNature();
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
  //获得当前所有节点的位置
  getPosArr: function getPosArr(list) {
    var posX = 120,
        posY = [100, -183],
        posArr = [];

    for (var i = 0; i < list.length; i++) {
      var index = i % 2;
      posArr.push(cc.v2(index == 0 && i != 0 ? posX += 240 : posX, posY[index]));
    }

    console.log("comprehensive ===> 这是当前所需要的位置列表", posArr);
    return posArr;
  },
  onClick: function onClick(name, node) {
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

      case "btn_back":
        this.qpPlatIndex = null;
        this.isGameNature();
        break;

      case "btn_start_video":
        //开始视讯游戏
        this.openTripartiteGame(this.videoPlatIndex);
        break;

      default:
        if (name) {
          if (name.indexOf("electronic") !== -1 || name.indexOf("sports") !== -1) {
            //电竞/体育
            this.openTripartiteGame(node.id);
          } else {
            if (name.indexOf("arcade") !== -1) {
              // 电子点击事件
              this.isScroll = false;
              this.dzPlatIndex = node.id;
              this.labelPlatGame();
            } else if (name.indexOf("chessCard") !== -1) {
              // 棋牌点击事件
              this.qpPlatIndex = node.id;

              if (this.gamesList[this.typeIndex].displayMode == 1) {
                this.isGameNature();
              } else {
                this.isScroll = false;
                this.labelPlatGame();
              }
            } else if (name.indexOf("video") !== -1) {
              // 视讯
              this.videoPlatIndex = node.id;
              this.isGameNature();
            }
          }
        }

        break;
    }
  },
  // 打开三方游戏
  openTripartiteGame: function openTripartiteGame(id) {
    console.log("comprehensive ===> 打开三方游戏");
    if (!isEnableHotUpdate) return;
    var nature = this.gamesList[this.typeIndex].nature;
    var gamesList = this.gamesList[this.typeIndex].platList; // glGame.emitter.emit(MESSAGE.UI.WEBVIEW_ON, { gamesList: gamesList[id], nature: nature, type: 2 });

    glGame.gamelistcfg.openTripartiteGame({
      gamesList: gamesList[id],
      nature: nature,
      type: 2
    });
  },
  // 分类切换
  switchInterface: function switchInterface(name, node) {
    console.log("comprehensive ===> 分类切换");
    if (this.banner) this.banner.active = true;
    if (this.roomInterface) this.roomInterface.active = false;
    this.dzPlatType.active = false;
    this.qpPlatType.active = false;
    this.gameInterface.active = false;
    this.platInterface.active = false;
    this.videoInterface.active = false;
    this.electronicInterface.active = false; // 设置分页id

    this.typeIndex = node.typeIndex;
    glGame.emitter.emit("setplazabg", {
      name: name,
      width: this.gamegroupView.width
    }); //更换大厅背景图

    this.isGameNature();
  },
  // 打开房间场
  switchRoom: function switchRoom(name, node) {
    console.log("comprehensive ===> 切换房间场显示");
    if (this.banner) this.banner.active = false;
    this.dzPlatType.active = false;
    this.qpPlatType.active = false;
    this.gameInterface.active = false;
    this.platInterface.active = false;
    this.videoInterface.active = false;
    this.electronicInterface.active = false; // 设置分页id

    this.typeIndex = node.typeIndex;
    glGame.emitter.emit("setplazabg", {
      name: name,
      width: this.gamegroupView.width
    }); //更换大厅背景图

    this.initRoomList();
    this.setCategoryData();
  },
  isGameNature: function isGameNature() {
    var isScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.isScroll = isScroll;
    if (!this.gamesList) return;
    var nature = this.gamesList[this.typeIndex].nature;

    switch (nature) {
      case 1:
        // 既有平台又有游戏
        if (this.gamesList[this.typeIndex].displayMode == 1) {
          // 大图标展示
          this.bigIconPlat();
        } else {
          // 标签展示游戏
          this.labelPlat();
        }

        break;

      case 2:
        // 只有平台
        switch (this.typeIndex) {
          case "_4":
            // 视讯
            this.videoPlat();
            break;

          case "_5":
            // 彩票
            break;

          case "_6":
            // 体育
            this.sportsPlat();
            break;

          case "_7":
            // 电竞
            this.electronicPlat();
            break;
        }

        break;

      case 3:
        // 只有游戏
        this.initList();
        break;
    }

    this.setCategoryData();
  },
  // 展示游戏列表
  onShowGame: function onShowGame(content, game_list) {
    for (var i = (this.pageIndex - 1) * this.pageSize; i < game_list.length; i++) {
      if (i < this.pageIndex * this.pageSize) {
        var game_panel = cc.instantiate(this.btnWebGame);
        game_panel.parent = content;
        game_panel.active = true;
        game_panel.position = cc.v2(0, cc.winSize.height + game_panel.height);
        game_panel.getComponent("gameitem_com").initUI(game_list[i]);
      }
    }
  },
  //根据index生成相应游戏列表
  initList: function initList(gameListData) {
    var gameitemWidth = this.game_item_szie; //item大小 + 间隔   350

    var gameGroup = this.gamesList[this.typeIndex].gameList;

    if (gameListData) {
      gameGroup = gameListData;
    } // 屏蔽web版网页游戏


    var game_list = [];
    Object.values(gameGroup).forEach(function (item) {
      // if (!isEnableHotUpdate && item.id > 9999) return;
      game_list.push(item);
    });
    var posArr = this.getPosArr(game_list);
    this.gameInterface.active = true;
    this.gameInterface.getComponent(cc.ScrollView).stopAutoScroll();
    var content = this.gameInterface.getChildByName("view").getChildByName("content"),
        viewwidth = this.gameInterface.getChildByName("view").width;

    if (!this.isScroll) {
      this.pageIndex = 1;
      this.gameInterface.getComponent(cc.ScrollView).enabled = false;
      this.pageCount = Math.ceil(game_list.length / this.pageSize);
      content.destroyAllChildren();
      content.removeAllChildren();
      content.x = 0;
    }

    var game_length = this.pageIndex * this.pageSize;

    if (game_length >= game_list.length) {
      game_length = game_list.length;
    }

    this.onShowGame(content, game_list); //设置scrollview.width

    var width = Math.ceil(game_length / 2) * gameitemWidth;
    content.width = width < viewwidth ? viewwidth : width; // 判断第一次不执行动画

    if (this.firstTimeTag || this.isScroll) {
      this.firstTimeTag = false;

      for (var i = 0; i < game_length; i++) {
        content.children[i].position = posArr[i];
      }

      this.gameInterface.getComponent(cc.ScrollView).enabled = true;
    } else {
      // 执行动画
      this.executionAni(content, game_length, posArr, viewwidth);
    }
  },
  // 标签展示
  labelPlat: function labelPlat() {
    var _gamesList = this.gamesList[this.typeIndex].platList;
    var content = null;
    var platList = Object.values(_gamesList);
    if (platList.length <= 0) return;

    if (this.typeIndex == "_3") {
      content = this.dzPlatType.getChildByName("view").getChildByName("content");
      this.dzPlatType.active = true;
    } else {
      content = this.qpPlatType.getChildByName("view").getChildByName("content");
      this.qpPlatType.active = true;
    }

    if (content && content.childrenCount == 0) {
      for (var i = 0; i < platList.length; i++) {
        var label_panel = cc.instantiate(this.btnPlatform);
        label_panel.parent = content;
        label_panel.name = "chessCard".concat(platList[i].id);
        label_panel.id = "_" + platList[i].id;
        label_panel.y = 0;

        if (this.dzPlatIndex == "_" + platList[i].id || this.qpPlatIndex == "_" + platList[i].id) {
          label_panel.getComponent(cc.Toggle).check();
        }

        label_panel.active = true;
        var img_name = "img_qp_".concat(platList[i].id);

        if (this.typeIndex == "_3") {
          img_name = "img_dz_".concat(platList[i].id);
          label_panel.name = "arcade".concat(platList[i].id);
        }

        label_panel.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.atlas_dz_plat.getSpriteFrame(img_name);
      }

      if (this.typeIndex == "_3") {
        if (this.dzPlatIndex == null) {
          this.dzPlatIndex = "_" + platList[0].id;
          this.labelPlatGame();
        }
      } else {
        if (this.qpPlatIndex == null) {
          this.qpPlatIndex = "_" + platList[0].id;
          this.labelPlatGame();
        }
      }
    } else {
      this.labelPlatGame();
    }
  },
  // 展示小图标游戏列表
  labelPlatGame: function labelPlatGame() {
    this.setCategoryData();
    var _gamesList = this.gamesList[this.typeIndex].platList;
    var platIndex = this.typeIndex == "_3" ? this.dzPlatIndex : this.qpPlatIndex;
    this.initList(_gamesList[platIndex].gameList);
  },
  // 大图标展示
  bigIconPlat: function bigIconPlat() {
    var gameListData = this.gamesList[this.typeIndex].platList;
    this.platInterface.active = true;
    var tempX = 65,
        //图标之间的间隔
    gameitemWidth = 404; //item大小

    var posArr = [],
        plat_length = 0;
    this.platInterface.getComponent(cc.ScrollView).stopAutoScroll();
    var view = this.platInterface.getChildByName("view");
    view.getComponent(cc.Widget).updateAlignment();
    var content = view.getChildByName("content"),
        viewWidth = view.width;
    this.gameInterface.getComponent(cc.ScrollView).stopAutoScroll();

    if (this.qpPlatIndex != null) {
      var id = gameListData[this.qpPlatIndex].id; // 屏蔽web版网页游戏

      var plat_gameList = [];
      Object.values(gameListData[this.qpPlatIndex].gameList).forEach(function (item) {
        // if (!isEnableHotUpdate && item.id > 9999) return;
        plat_gameList.push(item);
      }); // 设置是不是分页加载

      if (!this.isScroll) {
        this.pageIndex = 1;
        this.pageCount = Math.ceil(plat_gameList.length / this.pageSize);
        content.destroyAllChildren();
        content.removeAllChildren();
        content.x = 0;
      } // 获取设置的位置


      posArr = this.getPosArr(plat_gameList);
      plat_length = this.pageIndex * this.pageSize;

      if (plat_length >= plat_gameList.length) {
        plat_length = plat_gameList.length;
      }

      this.onShowGame(content, plat_gameList);
      var tip_node = this.platInterface.getChildByName("tip_node");
      tip_node.active = true;
      tip_node.getChildByName("node").getChildByName("logo").getComponent(cc.Sprite).spriteFrame = this.atlas_qp_plat.getSpriteFrame("img_game_list_".concat(id));
      tip_node.getChildByName("node").getChildByName("tip").getComponent(cc.Label).string = "\u603B\u5171".concat(plat_gameList.length, "\u6B3E\u5C0F\u6E38\u620F"); //设置scrollview.width

      gameitemWidth = this.game_item_szie; //item大小 + 间隔   350

      var width = Math.ceil(plat_length / 2) * gameitemWidth;
      content.width = width < viewWidth ? viewWidth : width;
    } else {
      this.platInterface.getChildByName("tip_node").active = false;
      content.destroyAllChildren();
      content.removeAllChildren();
      content.x = 0;
      var plat_gameList_big = Object.values(gameListData);
      plat_length = plat_gameList_big.length; // 设置入口位置

      posArr = [];
      var posX = gameitemWidth / 2 + 20;

      for (var i = 0; i < plat_length; i++) {
        posArr.push(cc.v2(i != 0 ? posX += tempX + gameitemWidth : posX, 0));
      } //设置scrollview.width


      var _width = plat_length * (gameitemWidth + tempX) - tempX + 40;

      content.width = _width < viewWidth ? viewWidth : _width; // 初始化大图标展示

      if (content.childrenCount == 0) {
        for (var _i = 0; _i < plat_length; _i++) {
          var big_id = plat_gameList_big[_i].id;
          var plat_panel_big = cc.instantiate(this.btnPlatformBig);
          plat_panel_big.y = 0;
          plat_panel_big.parent = content;
          plat_panel_big.active = true;
          plat_panel_big.name = "chessCard".concat(big_id);
          plat_panel_big.id = "_" + big_id;
          plat_panel_big.position = cc.v2(0, cc.winSize.height + plat_panel_big.height);

          for (var j = 0; j < QP_BG_IMH.length; j++) {
            if (QP_BG_IMH[j] == big_id) {
              plat_panel_big.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.big_qp_plat[j];
            }
          }

          plat_panel_big.getChildByName("logo").getComponent(cc.Sprite).spriteFrame = this.atlas_qp_plat.getSpriteFrame("img_logo_".concat(big_id));
          plat_panel_big.getChildByName("title").getComponent(cc.Sprite).spriteFrame = this.atlas_qp_plat.getSpriteFrame("img_title_".concat(big_id));

          if (plat_gameList_big[_i].tag > 0) {
            //设置角标
            var cornerMark = plat_panel_big.getChildByName("cornerMark");
            cornerMark.getComponent(cc.Sprite).spriteFrame = this.atlas_corner_mark.getSpriteFrame("img_corner_mark".concat(plat_gameList_big[_i].tag));
            cornerMark.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[plat_gameList_big[_i].tag];
            cornerMark.active = true;
          }
        }
      }
    } // 执行动作


    if (this.firstTimeTag || this.isScroll) {
      this.firstTimeTag = false;

      for (var _i2 = 0; _i2 < plat_length; _i2++) {
        content.children[_i2].position = posArr[_i2];
      }
    } else {
      this.executionAni(content, plat_length, posArr, viewWidth);
    }
  },
  // 视讯界面
  videoPlat: function videoPlat() {
    this.videoInterface.width = this.node.width - this.getGameGroupWidth();
    this.videoInterface.getComponent(cc.Widget).updateAlignment();
    if (this.banner) this.banner.active = false;
    var video_gamesList = this.gamesList[this.typeIndex].platList;
    var platList = Object.values(video_gamesList);
    if (platList.length <= 0) return;
    this.videoInterface.active = true;
    var content = this.videoNode.getChildByName("view").getChildByName("content");

    if (content.childrenCount == 0) {
      for (var i = 0; i < platList.length; i++) {
        var video_id = platList[i].id;
        var label_panel = cc.instantiate(this.btnPlatform);
        label_panel.y = 0;
        label_panel.parent = content;
        label_panel.active = true;
        label_panel.name = "video".concat(video_id);
        label_panel.id = "_" + video_id;
        label_panel.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.atlas_video_plat.getSpriteFrame("img_video_title".concat(video_id));
      }

      if (this.videoPlatIndex == null) {
        this.videoPlatIndex = "_" + platList[0].id;
      }
    }

    var btn_start_video = this.videoInterface.getChildByName("btn_start_video");
    var str = this.videoPlatIndex.split("_");
    btn_start_video.getChildByName("img_video").getComponent(cc.Sprite).spriteFrame = this.atlas_video_plat.getSpriteFrame("img_video".concat(str[str.length - 1]));
  },
  // 体育界面
  sportsPlat: function sportsPlat() {
    var gameListData = this.gamesList[this.typeIndex].platList;
    this.platInterface.active = true;
    var tempX = 65,
        //图标之间的间隔
    gameitemWidth = 361; //item大小

    var posArr = [],
        ports_length = 0;
    this.platInterface.getChildByName("tip_node").active = false;
    this.platInterface.getComponent(cc.ScrollView).stopAutoScroll();
    var view = this.platInterface.getChildByName("view");
    view.getComponent(cc.Widget).updateAlignment();
    var content = view.getChildByName("content"),
        viewWidth = view.width;
    content.destroyAllChildren();
    content.removeAllChildren();
    content.x = 0;
    var sports_gameList = Object.values(gameListData);
    ports_length = sports_gameList.length; // 设置入口位置

    posArr = [];
    var posX = gameitemWidth / 2;

    for (var i = 0; i < ports_length; i++) {
      posArr.push(cc.v2(i != 0 ? posX += tempX + gameitemWidth : posX, 0));
    } //设置scrollview.width


    var width = ports_length * (gameitemWidth + tempX) - tempX;
    content.width = width < viewWidth ? viewWidth : width; // 初始化大图标展示

    if (content.childrenCount == 0) {
      for (var _i3 = 0; _i3 < ports_length; _i3++) {
        var big_id = sports_gameList[_i3].id;
        var plat_panel_big = cc.instantiate(this.sportsNode);
        plat_panel_big.y = 0;
        plat_panel_big.parent = content;
        plat_panel_big.active = true;
        plat_panel_big.name = "sports".concat(big_id);
        plat_panel_big.id = "_" + big_id;
        plat_panel_big.position = cc.v2(0, cc.winSize.height + plat_panel_big.height);

        for (var j = 0; j < TY_BG_IMH.length; j++) {
          if (TY_BG_IMH[j] == big_id) {
            plat_panel_big.getChildByName("img_rw").getComponent(cc.Sprite).spriteFrame = this.big_ty_plat[j];
          }
        }

        var logo = plat_panel_big.getChildByName("logo_l");
        if (big_id == 22) logo = plat_panel_big.getChildByName("logo_r");
        logo.getComponent(cc.Sprite).spriteFrame = this.atlas_ty_plat.getSpriteFrame("img_logo_".concat(big_id));
        logo.active = true;
        plat_panel_big.getChildByName("title").getComponent(cc.Sprite).spriteFrame = this.atlas_ty_plat.getSpriteFrame("img_title_".concat(big_id));
      }
    } // 执行动作


    this.executionAni(content, ports_length, posArr, viewWidth);
  },
  // 电竞界面
  electronicPlat: function electronicPlat() {
    this.electronicInterface.width = this.node.width - this.getGameGroupWidth();
    this.electronicInterface.getComponent(cc.Widget).updateAlignment();
    if (this.banner) this.banner.active = false; // this.electronicInterface.getComponent(cc.Widget).left = this.offsetLeft;
    // this.electronicInterface.getComponent(cc.Widget).updateAlignment();

    var electronic_gamesList = this.gamesList[this.typeIndex].platList;
    var platList = Object.values(electronic_gamesList);
    if (platList.length <= 0) return;
    this.electronicInterface.active = true;
    var content = this.electronicInterface.getChildByName("view").getChildByName("content");

    if (content.childrenCount == 0) {
      for (var i = 0; i < platList.length; i++) {
        var electronic_id = platList[i].id;
        var label_panel = cc.instantiate(this.electronicNode);
        label_panel.parent = content;
        label_panel.active = true;
        label_panel.name = "electronic".concat(electronic_id);
        label_panel.id = "_" + electronic_id;
      }

      if (this.videoPlatIndex == null) {
        this.videoPlatIndex = "_" + platList[0].id;
      }
    }
  },
  // 房间场界面布局
  initRoomList: function initRoomList() {
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
    this.firstTimeTag = false;
  },
  // 执行动画
  executionAni: function executionAni(content, length, posArr, viewWidth) {
    var _this4 = this;

    var scrollTime = 0.25,
        //图标移动时间
    everyTime = 0.05,
        //图标移动间隔时间
    distance = 30,
        //图标弹动距离
    distanceTime = 0.1; //图标弹动时间
    // 执行动作

    var _loop = function _loop(i) {
      var item = content.children[i];

      if (item) {
        item.position = cc.v2(posArr[i].x + viewWidth, posArr[i].y);
        item.runAction(cc.sequence(cc.moveTo(scrollTime + everyTime * i, posArr[i].x - distance, posArr[i].y), cc.moveTo(distanceTime, posArr[i]), cc.callFunc(function () {
          if (i === length - 1 && _this4.gameInterface.active) {
            console.log("大厅执行动画 = ", i);
            _this4.gameInterface.getComponent(cc.ScrollView).enabled = true;
          }
        })));
      }
    };

    for (var i = 0; i < length; i++) {
      _loop(i);
    }
  },
  // 获取gamegroupWidth
  getGameGroupWidth: function getGameGroupWidth() {
    var gamegroupWidth = this.gamegroupView.width + this.gamegroupView.getComponent(cc.Widget).left;
    return gamegroupWidth + this.offsetLeft + this.leftInterval;
  },
  // 设置现在在那个分类
  setCategoryData: function setCategoryData() {
    glGame.isCategoryData.typeIndex = this.typeIndex;

    switch (this.typeIndex) {
      case "_1":
        glGame.isCategoryData.platIndex = this.qpPlatIndex;
        break;

      case "_3":
        glGame.isCategoryData.platIndex = this.dzPlatIndex;
        break;

      case "_4":
        glGame.isCategoryData.platIndex = this.videoPlatIndex;
        break;

      default:
        glGame.isCategoryData.platIndex = null;
        break;
    }
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("resize", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxjb21wcmVoZW5zaXZlLmpzIl0sIm5hbWVzIjpbImdyb3VwSWQiLCJCQU5ORVJfU1RBUlQiLCJPTiIsIk9GRiIsIkNPUk5FUl9NQVJLIiwiUVBfQkdfSU1IIiwiVFlfQkdfSU1IIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImJ0bldlYkdhbWUiLCJjYyIsIk5vZGUiLCJidG5QbGF0Zm9ybSIsImJ0blBsYXRmb3JtQmlnIiwiZWxlY3Ryb25pY05vZGUiLCJzcG9ydHNOb2RlIiwiZ2FtZWdyb3VwVmlldyIsImdhbWVncm91cCIsImdhbWVJbnRlcmZhY2UiLCJkelBsYXRUeXBlIiwicXBQbGF0VHlwZSIsInBsYXRJbnRlcmZhY2UiLCJ0aXBOb2RlIiwidmlkZW9JbnRlcmZhY2UiLCJ2aWRlb05vZGUiLCJlbGVjdHJvbmljSW50ZXJmYWNlIiwicHJlZmFiX2Jhbm5lciIsIlByZWZhYiIsInByZWZhYl9yb29tX2ZpZWxkIiwiYXRsYXNfcXBfcGxhdCIsIlNwcml0ZUF0bGFzIiwiYXRsYXNfZHpfcGxhdCIsImF0bGFzX3ZpZGVvX3BsYXQiLCJhdGxhc190eV9wbGF0IiwiYXRsYXNfY29ybmVyX21hcmsiLCJiaWdfcXBfcGxhdCIsIlNwcml0ZUZyYW1lIiwiYmlnX3R5X3BsYXQiLCJvbkxvYWQiLCJnYW1lX2l0ZW1fc3ppZSIsIndpZHRoIiwiaXNTY3JvbGwiLCJwYWdlU2l6ZSIsInBhZ2VJbmRleCIsInBhZ2VDb3VudCIsIm9uIiwib25HYW1lSW50ZXJmYWNlUmlndGhDYiIsIm9uUGxhdEludGVyZmFjZVJpZ3RoQ2IiLCJlbWl0dGVyIiwib25PcmllbnRhdGlvbmNoYW5nZSIsIm9uRW5hYmxlIiwicmVmcmVzaEdhbWVMaXN0Iiwic2Nyb2xsVmlldyIsImNvbnNvbGUiLCJsb2ciLCJpc0dhbWVOYXR1cmUiLCJ0eXBlSW5kZXgiLCJxcFBsYXRJbmRleCIsInN0YXJ0IiwiaXNDYXRlZ29yeURhdGEiLCJwbGF0SW5kZXgiLCJkelBsYXRJbmRleCIsInZpZGVvUGxhdEluZGV4IiwiZmlyc3RUaW1lVGFnIiwiYmFubmVyIiwiaXNpUGhvbmVYIiwiQWRhcHRpdmVJcGhvbmV4IiwiZ2V0Q29tcG9uZW50IiwiV2lkZ2V0IiwidXBkYXRlQWxpZ25tZW50IiwiQWRhcHRpdmVJbnRlcmZhY2UiLCJpcGhvbmV4V2lkdGgiLCJjaGlsZHJlbiIsInRvZ2dsZU5vZGUiLCJ4Iiwibm9kZSIsIm9mZnNldExlZnQiLCJpbnRlcnZhbCIsImxlZnRJbnRlcnZhbCIsImdhbWVsaXN0Y2ZnIiwicmVxR2FtZUdyb3VwIiwiZ2V0R2FtZXNMaXN0IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsImludGVyRmFjZU1vZGUiLCJnZXQiLCJnYW1lRGlzcGxheVR5cGVMaXN0IiwiZ2FtZWdyb3VwV2lkdGgiLCJhY3RpdmUiLCJ6SW5kZXgiLCJsZWZ0IiwiYmlsbGJvYXJkc0RhdGEiLCJ1c2VyIiwicmVxQmlsbGJvYXJkc0RhdGEiLCJiYW5uZXJXaWR0aCIsInBhbmVsIiwic2hvd0NoaWxkUGFuZWwiLCJwYXJlbnQiLCJ5IiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRHYW1lR3JvdXBXaWR0aCIsImdhbWVEaXNwbGF5VHlwZSIsImdhbWVEaXNwbGF5VG9rZW4iLCJ0b2tlbiIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJtc2ciLCJyZXFHYW1lc0xpc3QiLCJnYW1lc0xpc3QiLCJzZXRJdGVtIiwic3RvcmFnZSIsInNldEdhbWVncm91cCIsInNlbGZHYW1lTGlzdCIsImkiLCJsZW5ndGgiLCJpZCIsInBsYXRmb3JtX25vZGUiLCJtX3RvZ2dsZSIsIlRvZ2dsZSIsImlzQ2hlY2tlZCIsImNoZWNrIiwiZW1pdCIsIm5hbWUiLCJnZXRQb3NBcnIiLCJsaXN0IiwicG9zWCIsInBvc1kiLCJwb3NBcnIiLCJpbmRleCIsInB1c2giLCJ2MiIsIm9uQ2xpY2siLCJzd2l0Y2hJbnRlcmZhY2UiLCJzd2l0Y2hSb29tIiwib3BlblRyaXBhcnRpdGVHYW1lIiwiaW5kZXhPZiIsImxhYmVsUGxhdEdhbWUiLCJkaXNwbGF5TW9kZSIsImlzRW5hYmxlSG90VXBkYXRlIiwibmF0dXJlIiwicGxhdExpc3QiLCJ0eXBlIiwicm9vbUludGVyZmFjZSIsImluaXRSb29tTGlzdCIsInNldENhdGVnb3J5RGF0YSIsImJpZ0ljb25QbGF0IiwibGFiZWxQbGF0IiwidmlkZW9QbGF0Iiwic3BvcnRzUGxhdCIsImVsZWN0cm9uaWNQbGF0IiwiaW5pdExpc3QiLCJvblNob3dHYW1lIiwiY29udGVudCIsImdhbWVfbGlzdCIsImdhbWVfcGFuZWwiLCJpbnN0YW50aWF0ZSIsInBvc2l0aW9uIiwid2luU2l6ZSIsImhlaWdodCIsImluaXRVSSIsImdhbWVMaXN0RGF0YSIsImdhbWVpdGVtV2lkdGgiLCJnYW1lR3JvdXAiLCJnYW1lTGlzdCIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJpdGVtIiwiU2Nyb2xsVmlldyIsInN0b3BBdXRvU2Nyb2xsIiwidmlld3dpZHRoIiwiZW5hYmxlZCIsIk1hdGgiLCJjZWlsIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJnYW1lX2xlbmd0aCIsImV4ZWN1dGlvbkFuaSIsIl9nYW1lc0xpc3QiLCJjaGlsZHJlbkNvdW50IiwibGFiZWxfcGFuZWwiLCJpbWdfbmFtZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZ2V0U3ByaXRlRnJhbWUiLCJ0ZW1wWCIsInBsYXRfbGVuZ3RoIiwidmlldyIsInZpZXdXaWR0aCIsInBsYXRfZ2FtZUxpc3QiLCJ0aXBfbm9kZSIsIkxhYmVsIiwic3RyaW5nIiwicGxhdF9nYW1lTGlzdF9iaWciLCJiaWdfaWQiLCJwbGF0X3BhbmVsX2JpZyIsImoiLCJ0YWciLCJjb3JuZXJNYXJrIiwidmlkZW9fZ2FtZXNMaXN0IiwidmlkZW9faWQiLCJidG5fc3RhcnRfdmlkZW8iLCJzdHIiLCJzcGxpdCIsInBvcnRzX2xlbmd0aCIsInNwb3J0c19nYW1lTGlzdCIsImxvZ28iLCJlbGVjdHJvbmljX2dhbWVzTGlzdCIsImVsZWN0cm9uaWNfaWQiLCJyb29tX2dhbWVHcm91cCIsImluaXREYXRhIiwic2Nyb2xsVGltZSIsImV2ZXJ5VGltZSIsImRpc3RhbmNlIiwiZGlzdGFuY2VUaW1lIiwibW92ZVRvIiwiT25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsT0FBTyxHQUFHO0FBQ1osS0FBRyxXQURTO0FBQ1E7QUFDcEIsS0FBRyxTQUZTO0FBRVE7QUFDcEIsS0FBRyxRQUhTO0FBR1E7QUFDcEIsS0FBRyxZQUpTO0FBSVE7QUFDcEIsS0FBRyxTQUxTO0FBS1E7QUFDcEIsS0FBRyxRQU5TO0FBTVE7QUFDcEIsS0FBRyxTQVBTO0FBT1E7QUFDcEIsS0FBRyxNQVJTO0FBUVE7QUFDcEIsS0FBRyxLQVRTLENBU1E7O0FBVFIsQ0FBaEI7QUFXQSxJQUFNQyxZQUFZLEdBQUc7QUFDakJDLEVBQUFBLEVBQUUsRUFBRSxDQURhO0FBQ1Q7QUFDUkMsRUFBQUEsR0FBRyxFQUFFLENBRlksQ0FFVDs7QUFGUyxDQUFyQjtBQUlBLElBQU1DLFdBQVcsR0FBRztBQUNoQixLQUFHLEdBRGE7QUFFaEIsS0FBRyxJQUZhO0FBR2hCLEtBQUcsSUFIYTtBQUloQixLQUFHO0FBSmEsQ0FBcEI7QUFNQSxJQUFNQyxTQUFTLEdBQUcsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLENBQWxCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixDQUFsQjtBQUVBQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFQyxFQUFFLENBQUNDLElBRFA7QUFFUkMsSUFBQUEsV0FBVyxFQUFFRixFQUFF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O0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l4RCxRQUFBQSxNQUFNLENBQUNzRCxjQUFQLENBQXNCQyxTQUF0QixHQUFrQyxLQUFLRSxjQUF2QztBQUNBOztBQUNKO0FBQ0l6RCxRQUFBQSxNQUFNLENBQUNzRCxjQUFQLENBQXNCQyxTQUF0QixHQUFrQyxJQUFsQztBQUNBO0FBWlI7QUFjSCxHQXZ6Qm1CO0FBeXpCcEIrSixFQUFBQSxTQXp6Qm9CLHVCQXl6QlI7QUFDUnROLElBQUFBLE1BQU0sQ0FBQzJDLE9BQVAsQ0FBZTRLLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsSUFBN0I7QUFDSDtBQTN6Qm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpc0VuYWJsZUhvdFVwZGF0ZVxyXG5cclxuY29uc3QgZ3JvdXBJZCA9IHtcclxuICAgIDE6IFwiY2hlc3NDYXJkXCIsICAgICAvL+aji+eJjFxyXG4gICAgMjogXCJmaXNoaW5nXCIsICAgICAgIC8v5o2V6bG8XHJcbiAgICAzOiBcImFyY2FkZVwiLCAgICAgICAgLy/nlLXlrZBcclxuICAgIDQ6IFwicmVhbFBlcnNvblwiLCAgICAvL+inhuiur1xyXG4gICAgNTogXCJsb3R0ZXJ5XCIsICAgICAgIC8v5b2p56WoXHJcbiAgICA2OiBcInNwb3J0c1wiLCAgICAgICAgLy/kvZPogrJcclxuICAgIDc6IFwiY29tcGV0ZVwiLCAgICAgICAvL+eUteernlxyXG4gICAgODogXCJyb29tXCIsICAgICAgICAgIC8v5oi/6Ze0XHJcbiAgICA5OiBcImhvdFwiLCAgICAgICAgICAgLy/ng63pl6hcclxufVxyXG5jb25zdCBCQU5ORVJfU1RBUlQgPSB7XHJcbiAgICBPTjogMSwgIC8v5byA5ZCvXHJcbiAgICBPRkY6IDAgIC8v5YWz6ZetXHJcbn1cclxuY29uc3QgQ09STkVSX01BUksgPSB7XHJcbiAgICAwOiBcIuaXoFwiLFxyXG4gICAgMTogXCLmjqjojZBcIixcclxuICAgIDI6IFwi54Gr54iGXCIsXHJcbiAgICAzOiBcIuacgOaWsFwiLFxyXG59XHJcbmNvbnN0IFFQX0JHX0lNSCA9IFsxLCAxMiwgMTYsIDI5XVxyXG5jb25zdCBUWV9CR19JTUggPSBbNywgMjEsIDIyLCAyNV1cclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBidG5XZWJHYW1lOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ0blBsYXRmb3JtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ0blBsYXRmb3JtQmlnOiBjYy5Ob2RlLFxyXG4gICAgICAgIGVsZWN0cm9uaWNOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNwb3J0c05vZGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIC8vIOWIhuexu+WIl+ihqFxyXG4gICAgICAgIGdhbWVncm91cFZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2FtZWdyb3VwOiBjYy5Ob2RlLFxyXG4gICAgICAgIC8vIOa4uOaIj+WIhuexu+WxleekulxyXG4gICAgICAgIGdhbWVJbnRlcmZhY2U6IGNjLk5vZGUsXHJcbiAgICAgICAgZHpQbGF0VHlwZTogY2MuTm9kZSxcclxuICAgICAgICBxcFBsYXRUeXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIC8vIOaji+eJjOWIhuexu+WxleekulxyXG4gICAgICAgIHBsYXRJbnRlcmZhY2U6IGNjLk5vZGUsXHJcbiAgICAgICAgdGlwTm9kZTogY2MuTm9kZSxcclxuICAgICAgICAvLyDop4borq/liIbnsbvlsZXnpLpcclxuICAgICAgICB2aWRlb0ludGVyZmFjZTogY2MuTm9kZSxcclxuICAgICAgICB2aWRlb05vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgLy8g55S156ue5YiG57G75bGV56S6XHJcbiAgICAgICAgZWxlY3Ryb25pY0ludGVyZmFjZTogY2MuTm9kZSxcclxuXHJcbiAgICAgICAgcHJlZmFiX2Jhbm5lcjogY2MuUHJlZmFiLCAgICAgICAvLyDova7mkq3lm77pooTliLZcclxuICAgICAgICBwcmVmYWJfcm9vbV9maWVsZDogY2MuUHJlZmFiLCAgIC8v5oi/6Ze05Zy66aKE5Yi2XHJcblxyXG4gICAgICAgIGF0bGFzX3FwX3BsYXQ6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGF0bGFzX2R6X3BsYXQ6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGF0bGFzX3ZpZGVvX3BsYXQ6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGF0bGFzX3R5X3BsYXQ6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGF0bGFzX2Nvcm5lcl9tYXJrOiBjYy5TcHJpdGVBdGxhcyxcclxuXHJcbiAgICAgICAgYmlnX3FwX3BsYXQ6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYmlnX3R5X3BsYXQ6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9pdGVtX3N6aWUgPSB0aGlzLmJ0bldlYkdhbWUud2lkdGggKyAxNTsgLy9pdGVt5aSn5bCPICsg6Ze06ZqUICAgMzUwXHJcbiAgICAgICAgdGhpcy5pc1Njcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSAxNjtcclxuICAgICAgICB0aGlzLnBhZ2VJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uR2FtZUludGVyZmFjZVJpZ3RoQ2IsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGxhdEludGVyZmFjZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uUGxhdEludGVyZmFjZVJpZ3RoQ2IsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwicmVzaXplXCIsIHRoaXMub25PcmllbnRhdGlvbmNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5nYW1lSW50ZXJmYWNlLm9uKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25HYW1lSW50ZXJmYWNlUmlndGhDYiwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5wbGF0SW50ZXJmYWNlLm9uKFwiYm91bmNlLXJpZ2h0XCIsIHRoaXMub25QbGF0SW50ZXJmYWNlUmlndGhDYiwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoR2FtZUxpc3QoKTtcclxuICAgIH0sXHJcbiAgICBvbkdhbWVJbnRlcmZhY2VSaWd0aENiKHNjcm9sbFZpZXcpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPj0gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5ri45oiP5bey57uP5Yqg6L295a6M5oiQXCIsIHRoaXMucGFnZUluZGV4KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZUluZGV4Kys7XHJcbiAgICAgICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25QbGF0SW50ZXJmYWNlUmlndGhDYihzY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZUluZGV4ID09IFwiXzFcIiAmJiB0aGlzLnFwUGxhdEluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4ID49IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0dhbWVOYXR1cmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudHlwZUluZGV4ID0gZ2xHYW1lLmlzQ2F0ZWdvcnlEYXRhLnR5cGVJbmRleDtcclxuICAgICAgICBsZXQgcGxhdEluZGV4ID0gZ2xHYW1lLmlzQ2F0ZWdvcnlEYXRhLnBsYXRJbmRleDtcclxuICAgICAgICB0aGlzLnFwUGxhdEluZGV4ID0gdGhpcy50eXBlSW5kZXggPT0gXCJfMVwiID8gcGxhdEluZGV4IDogbnVsbDtcclxuICAgICAgICB0aGlzLmR6UGxhdEluZGV4ID0gdGhpcy50eXBlSW5kZXggPT0gXCJfM1wiID8gcGxhdEluZGV4IDogbnVsbDtcclxuICAgICAgICB0aGlzLnZpZGVvUGxhdEluZGV4ID0gdGhpcy50eXBlSW5kZXggPT0gXCJfNFwiID8gcGxhdEluZGV4IDogbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdFRpbWVUYWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhbm5lciA9IG51bGw7XHJcbiAgICAgICAgaWYgKGlzaVBob25lWCkgdGhpcy5BZGFwdGl2ZUlwaG9uZXgoKTtcclxuICAgICAgICB0aGlzLmdhbWVncm91cFZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgdGhpcy5BZGFwdGl2ZUludGVyZmFjZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDpgILphY1pUGhvbmVY5omL5py6XHJcbiAgICBBZGFwdGl2ZUlwaG9uZXgoKSB7XHJcbiAgICAgICAgdGhpcy5pcGhvbmV4V2lkdGggPSA4MDsgICAgICAgICAvL+mAgumFjWlwaG9uZeeahOWuveW6puWBj+enu1xyXG4gICAgICAgIHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCArPSB0aGlzLmlwaG9uZXhXaWR0aDtcclxuICAgICAgICBmb3IgKGxldCB0b2dnbGVOb2RlIG9mIHRoaXMuZ2FtZWdyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZU5vZGUueCA9IHRoaXMuaXBob25leFdpZHRoIC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIneWni+WMlueVjOmdolxyXG4gICAgQWRhcHRpdmVJbnRlcmZhY2UoKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5ub2RlLndpZHRoICogMC42NSArIDIwO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0TGVmdCA9ICh0aGlzLm5vZGUud2lkdGggLSB3aWR0aCAtIHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCkgLyA0O1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAodGhpcy5ub2RlLndpZHRoIC0gd2lkdGggLSB0aGlzLmdhbWVncm91cFZpZXcud2lkdGgpIC8gNDtcclxuICAgICAgICB0aGlzLmxlZnRJbnRlcnZhbCA9IDE1O1xyXG5cclxuICAgICAgICAvLyDlkJEgcGhwIOiOt+WPluWIsOW9k+WJjea4uOaIj+mFjee9ruaVsOmHj+WQjui/m+ihjFVJ5bGV546wXHJcbiAgICAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLnJlcUdhbWVHcm91cCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEdhbWVMaXN0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyDliJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgICAgICAgICAgdGhpcy5nZXRHYW1lc0xpc3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBvbk9yaWVudGF0aW9uY2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMDEpLCBjYy5jYWxsRnVuYygoKT0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoR2FtZUxpc3QoKTtcclxuICAgICAgICB9KSkpXHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hHYW1lTGlzdCgpIHtcclxuICAgICAgICB0aGlzLmludGVyRmFjZU1vZGUgPSBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0KFwiaW50ZXJGYWNlTW9kZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVEaXNwbGF5VHlwZUxpc3QgPSBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0KFwiZ2FtZURpc3BsYXlUeXBlTGlzdFwiKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pbnRlckZhY2VNb2RlID09IG51bGwgfHwgdGhpcy5nYW1lRGlzcGxheVR5cGVMaXN0PT1udWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluWIhuexu+eahOWuveW6plxyXG4gICAgICAgIGxldCBnYW1lZ3JvdXBXaWR0aCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJGYWNlTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZWdyb3VwVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVncm91cFZpZXcuekluZGV4ID0gMzA7XHJcbiAgICAgICAgICAgIGdhbWVncm91cFdpZHRoID0gdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoICsgdGhpcy5nYW1lZ3JvdXBWaWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpLmxlZnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDE0O1xyXG4gICAgICAgICAgICB0aGlzLnR5cGVJbmRleCA9IFwiXzBcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lZ3JvdXBWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnYW1lZ3JvdXBXaWR0aCA9IHRoaXMuaW50ZXJ2YWwgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6I635Y+WYmFubmVy55qE5a695bqmXHJcbiAgICAgICAgbGV0IGJpbGxib2FyZHNEYXRhID0gZ2xHYW1lLnVzZXIucmVxQmlsbGJvYXJkc0RhdGE7XHJcbiAgICAgICAgbGV0IGJhbm5lcldpZHRoID0gMDtcclxuICAgICAgICAvLyDmoKHpqozmlrnlvI/kuLrmnI3liqHnq6/lpoLml6DmlbDmja7liJnpu5jorqTkuLrlvIDlkK9cclxuICAgICAgICBpZiAoYmlsbGJvYXJkc0RhdGEuc3dpdGNoICE9IEJBTk5FUl9TVEFSVC5PRkYpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDUwO1xyXG4gICAgICAgICAgICAvLyBzY3JvbGx2aWV355qE55uR5ZCs55u45LqS5b2x5ZON77yM5omA5Lul5qC55o2u5Z2Q5qCH5bGe5oCn5pS+5YWl54i26IqC54K56YG/5YWN55uR5ZCs55u45LqS5bmy5omwXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyID0gZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXMucHJlZmFiX2Jhbm5lciwgdGhpcy5ub2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyLnggPSAtdGhpcy5ub2RlLndpZHRoIC8gMiArIGdhbWVncm91cFdpZHRoICsgdGhpcy5sZWZ0SW50ZXJ2YWwgKyB0aGlzLmJhbm5lci53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyLnkgPSAtNDA7XHJcbiAgICAgICAgICAgIGJhbm5lcldpZHRoID0gdGhpcy5iYW5uZXIud2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDorr7nva7muLjmiI/liJfooajnmoTlrr3luqZcclxuICAgICAgICB0aGlzLmdhbWVJbnRlcmZhY2Uud2lkdGggPSB0aGlzLm5vZGUud2lkdGggLSBnYW1lZ3JvdXBXaWR0aCAtIGJhbm5lcldpZHRoIC0gdGhpcy5pbnRlcnZhbCAtIHRoaXMubGVmdEludGVydmFsO1xyXG4gICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB0aGlzLmdhbWVJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG5cclxuICAgICAgICAvLyDorr7nva7lubPlj7DliJfooajnmoTlrr3luqZcclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2Uud2lkdGggPSB0aGlzLm5vZGUud2lkdGggLSBnYW1lZ3JvdXBXaWR0aCAtIGJhbm5lcldpZHRoIC0gdGhpcy5pbnRlcnZhbCAtIHRoaXMubGVmdEludGVydmFsO1xyXG4gICAgICAgIHRoaXMucGxhdEludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnZpZGVvSW50ZXJmYWNlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvSW50ZXJmYWNlLndpZHRoID0gdGhpcy5ub2RlLndpZHRoIC0gdGhpcy5nZXRHYW1lR3JvdXBXaWR0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvSW50ZXJmYWNlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlY3Ryb25pY0ludGVyZmFjZS53aWR0aCA9IHRoaXMubm9kZS53aWR0aCAtIHRoaXMuZ2V0R2FtZUdyb3VwV2lkdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5ri45oiP5pWw5o2uXHJcbiAgICBnZXRHYW1lc0xpc3QoKXtcclxuICAgICAgICBsZXQgZ2FtZURpc3BsYXlUeXBlID0gZ2xHYW1lLmdhbWVsaXN0Y2ZnLmdldChcImdhbWVEaXNwbGF5VHlwZVwiKTtcclxuICAgICAgICBsZXQgZ2FtZURpc3BsYXlUb2tlbiA9IGdsR2FtZS5nYW1lbGlzdGNmZy5nZXQoXCJnYW1lRGlzcGxheVRva2VuXCIpO1xyXG5cclxuICAgICAgICAvLyDojrflj5blr7nlupTnmoTmlbDmja7liJfooahcclxuICAgICAgICBsZXQgdG9rZW4gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJnYW1ldG9rZW5cIik7XHJcbiAgICAgICAgaWYgKGdhbWVEaXNwbGF5VG9rZW4gIT0gdG9rZW4gJiYgZ2FtZURpc3BsYXlUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5LuO572R57uc6I635Y+WXCIpO1xyXG4gICAgICAgICAgICBsZXQgbXNnID0geyBcInR5cGVcIjogZ2FtZURpc3BsYXlUeXBlIH1cclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLnJlcUdhbWVzTGlzdChtc2csICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNMaXN0ID0gZ2xHYW1lLmdhbWVsaXN0Y2ZnLmdldChcImdhbWVzTGlzdFwiKTtcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImdhbWV0b2tlblwiLCBnYW1lRGlzcGxheVRva2VuKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJnYW1lZGF0YVwiLCB0aGlzLmdhbWVzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlckZhY2VNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXByZWhlbnNpdmUgPT09PiDmnInliIbnsbvlsZXnpLpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lZ3JvdXAoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5peg5YiG57G75bGV56S6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5LuO5pys5Zyw6I635Y+WXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVzTGlzdCA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oXCJnYW1lZGF0YVwiKTtcclxuICAgICAgICAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLnNlbGZHYW1lTGlzdCh0aGlzLmdhbWVzTGlzdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyRmFjZU1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5pyJ5YiG57G75bGV56S6XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lZ3JvdXAoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHJlaGVuc2l2ZSA9PT0+IOaXoOWIhuexu+WxleekulwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6K6+572u5ri45oiP5YiG57G7XHJcbiAgICBzZXRHYW1lZ3JvdXAoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVEaXNwbGF5VHlwZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5nYW1lRGlzcGxheVR5cGVMaXN0W2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBsYXRmb3JtX25vZGUgPSB0aGlzLmdhbWVncm91cC5nZXRDaGlsZEJ5TmFtZShncm91cElkW2lkXSk7XHJcbiAgICAgICAgICAgIHBsYXRmb3JtX25vZGUuekluZGV4ID0gaTtcclxuICAgICAgICAgICAgcGxhdGZvcm1fbm9kZS50eXBlSW5kZXggPSBgXyR7aWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVJbmRleCA9IGBfJHtpZH1gO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFRpbWVUYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1fdG9nZ2xlID0gcGxhdGZvcm1fbm9kZS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKTtcclxuICAgICAgICAgICAgICAgIGlmIChtX3RvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzR2FtZU5hdHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbV90b2dnbGUuY2hlY2soKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJzZXRwbGF6YWJnXCIsIHsgbmFtZTogZ3JvdXBJZFtpZF0sIHdpZHRoOiB0aGlzLmdhbWVncm91cFZpZXcud2lkdGggfSk7Ly/mm7TmjaLlpKfljoXog4zmma/lm75cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVJbmRleCA9PSBgXyR7aWR9YCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHJlaGVuc2l2ZSA9PT0+IOW3sue7j+acieWIhuexu1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbV90b2dnbGUgPSBwbGF0Zm9ybV9ub2RlLmdldENvbXBvbmVudChjYy5Ub2dnbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtX3RvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0dhbWVOYXR1cmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbV90b2dnbGUuY2hlY2soKTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwic2V0cGxhemFiZ1wiLCB7IG5hbWU6IGdyb3VwSWRbaWRdLCB3aWR0aDogdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoIH0pOy8v5pu05o2i5aSn5Y6F6IOM5pmv5Zu+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXRmb3JtX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635b6X5b2T5YmN5omA5pyJ6IqC54K555qE5L2N572uXHJcbiAgICBnZXRQb3NBcnIobGlzdCkge1xyXG4gICAgICAgIGxldCBwb3NYID0gMTIwLCBwb3NZID0gWzEwMCwgLTE4M10sIHBvc0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBpICUgMjtcclxuICAgICAgICAgICAgcG9zQXJyLnB1c2goY2MudjIoaW5kZXggPT0gMCAmJiBpICE9IDAgPyBwb3NYICs9IDI0MCA6IHBvc1gsIHBvc1lbaW5kZXhdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHJlaGVuc2l2ZSA9PT0+IOi/meaYr+W9k+WJjeaJgOmcgOimgeeahOS9jee9ruWIl+ihqFwiLCBwb3NBcnIpXHJcbiAgICAgICAgcmV0dXJuIHBvc0FycjtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJob3RcIjogY2FzZSBcImNoZXNzQ2FyZFwiOiBjYXNlIFwiYXJjYWRlXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXNoaW5nXCI6IGNhc2UgXCJyZWFsUGVyc29uXCI6IGNhc2UgXCJzcG9ydHNcIjpcclxuICAgICAgICAgICAgY2FzZSBcImxvdHRlcnlcIjogY2FzZSBcImNvbXBldGVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoSW50ZXJmYWNlKG5hbWUsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyb29tXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaFJvb20obmFtZSwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9iYWNrXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnFwUGxhdEluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zdGFydF92aWRlb1wiOiAgICAgLy/lvIDlp4vop4borq/muLjmiI9cclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblRyaXBhcnRpdGVHYW1lKHRoaXMudmlkZW9QbGF0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoXCJlbGVjdHJvbmljXCIpICE9PSAtMSB8fCBuYW1lLmluZGV4T2YoXCJzcG9ydHNcIikgIT09IC0xKSB7ICAgICAgICAgLy/nlLXnq54v5L2T6IKyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRyaXBhcnRpdGVHYW1lKG5vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoXCJhcmNhZGVcIikgIT09IC0xKSB7ICAgICAgICAvLyDnlLXlrZDngrnlh7vkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHpQbGF0SW5kZXggPSBub2RlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbFBsYXRHYW1lKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJjaGVzc0NhcmRcIikgIT09IC0xKSB7ICAgICAvLyDmo4vniYzngrnlh7vkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXBQbGF0SW5kZXggPSBub2RlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZXNMaXN0W3RoaXMudHlwZUluZGV4XS5kaXNwbGF5TW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0dhbWVOYXR1cmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Njcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxQbGF0R2FtZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwidmlkZW9cIikgIT09IC0xKSB7ICAgICAgICAgLy8g6KeG6K6vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvUGxhdEluZGV4ID0gbm9kZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJk+W8gOS4ieaWuea4uOaIj1xyXG4gICAgb3BlblRyaXBhcnRpdGVHYW1lKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5omT5byA5LiJ5pa55ri45oiPXCIpXHJcbiAgICAgICAgaWYgKCFpc0VuYWJsZUhvdFVwZGF0ZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBuYXR1cmUgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0ubmF0dXJlO1xyXG4gICAgICAgIGxldCBnYW1lc0xpc3QgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0ucGxhdExpc3Q7XHJcbiAgICAgICAgLy8gZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLlVJLldFQlZJRVdfT04sIHsgZ2FtZXNMaXN0OiBnYW1lc0xpc3RbaWRdLCBuYXR1cmU6IG5hdHVyZSwgdHlwZTogMiB9KTtcclxuICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcub3BlblRyaXBhcnRpdGVHYW1lKHsgZ2FtZXNMaXN0OiBnYW1lc0xpc3RbaWRdLCBuYXR1cmU6IG5hdHVyZSwgdHlwZTogMiB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5YiG57G75YiH5o2iXHJcbiAgICBzd2l0Y2hJbnRlcmZhY2UobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHJlaGVuc2l2ZSA9PT0+IOWIhuexu+WIh+aNolwiKVxyXG4gICAgICAgIGlmICh0aGlzLmJhbm5lcikgdGhpcy5iYW5uZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5yb29tSW50ZXJmYWNlKSB0aGlzLnJvb21JbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kelBsYXRUeXBlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucXBQbGF0VHlwZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVJbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF0SW50ZXJmYWNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmlkZW9JbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOiuvue9ruWIhumhtWlkXHJcbiAgICAgICAgdGhpcy50eXBlSW5kZXggPSBub2RlLnR5cGVJbmRleFxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJzZXRwbGF6YWJnXCIsIHsgbmFtZTogbmFtZSwgd2lkdGg6IHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCB9KTsvL+abtOaNouWkp+WOheiDjOaZr+WbvlxyXG4gICAgICAgIHRoaXMuaXNHYW1lTmF0dXJlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJk+W8gOaIv+mXtOWculxyXG4gICAgc3dpdGNoUm9vbShuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb21wcmVoZW5zaXZlID09PT4g5YiH5o2i5oi/6Ze05Zy65pi+56S6XCIpXHJcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyKSB0aGlzLmJhbm5lci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmR6UGxhdFR5cGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5xcFBsYXRUeXBlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy52aWRlb0ludGVyZmFjZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVsZWN0cm9uaWNJbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g6K6+572u5YiG6aG1aWRcclxuICAgICAgICB0aGlzLnR5cGVJbmRleCA9IG5vZGUudHlwZUluZGV4O1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJzZXRwbGF6YWJnXCIsIHsgbmFtZTogbmFtZSwgd2lkdGg6IHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCB9KTsvL+abtOaNouWkp+WOheiDjOaZr+WbvlxyXG4gICAgICAgIHRoaXMuaW5pdFJvb21MaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYXRlZ29yeURhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaXNHYW1lTmF0dXJlKGlzU2Nyb2xsID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmlzU2Nyb2xsID0gaXNTY3JvbGw7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVzTGlzdCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBuYXR1cmUgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0ubmF0dXJlO1xyXG4gICAgICAgIHN3aXRjaCAobmF0dXJlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIOaXouacieW5s+WPsOWPiOaciea4uOaIj1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZXNMaXN0W3RoaXMudHlwZUluZGV4XS5kaXNwbGF5TW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSn5Zu+5qCH5bGV56S6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdJY29uUGxhdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmoIfnrb7lsZXnpLrmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsUGxhdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIOWPquacieW5s+WPsFxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJfNFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDop4borq9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb1BsYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIl81XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW9qeelqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiXzZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2T6IKyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BvcnRzUGxhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiXzdcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55S156ueXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlY3Ryb25pY1BsYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8g5Y+q5pyJ5ri45oiPXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRDYXRlZ29yeURhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5bGV56S65ri45oiP5YiX6KGoXHJcbiAgICBvblNob3dHYW1lKGNvbnRlbnQsIGdhbWVfbGlzdCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAodGhpcy5wYWdlSW5kZXggLSAxKSAqIHRoaXMucGFnZVNpemU7IGkgPCBnYW1lX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lX3BhbmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5idG5XZWJHYW1lKTtcclxuICAgICAgICAgICAgICAgIGdhbWVfcGFuZWwucGFyZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgIGdhbWVfcGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdhbWVfcGFuZWwucG9zaXRpb24gPSBjYy52MigwLCBjYy53aW5TaXplLmhlaWdodCArIGdhbWVfcGFuZWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGdhbWVfcGFuZWwuZ2V0Q29tcG9uZW50KFwiZ2FtZWl0ZW1fY29tXCIpLmluaXRVSShnYW1lX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+agueaNrmluZGV455Sf5oiQ55u45bqU5ri45oiP5YiX6KGoXHJcbiAgICBpbml0TGlzdChnYW1lTGlzdERhdGEpIHtcclxuICAgICAgICBsZXQgZ2FtZWl0ZW1XaWR0aCA9IHRoaXMuZ2FtZV9pdGVtX3N6aWU7IC8vaXRlbeWkp+WwjyArIOmXtOmalCAgIDM1MFxyXG5cclxuICAgICAgICBsZXQgZ2FtZUdyb3VwID0gdGhpcy5nYW1lc0xpc3RbdGhpcy50eXBlSW5kZXhdLmdhbWVMaXN0O1xyXG4gICAgICAgIGlmIChnYW1lTGlzdERhdGEpIHtcclxuICAgICAgICAgICAgZ2FtZUdyb3VwID0gZ2FtZUxpc3REYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5bGP6JS9d2Vi54mI572R6aG15ri45oiPXHJcbiAgICAgICAgbGV0IGdhbWVfbGlzdCA9IFtdO1xyXG4gICAgICAgIE9iamVjdC52YWx1ZXMoZ2FtZUdyb3VwKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAvLyBpZiAoIWlzRW5hYmxlSG90VXBkYXRlICYmIGl0ZW0uaWQgPiA5OTk5KSByZXR1cm47XHJcbiAgICAgICAgICAgIGdhbWVfbGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IHBvc0FyciA9IHRoaXMuZ2V0UG9zQXJyKGdhbWVfbGlzdCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc3RvcEF1dG9TY3JvbGwoKTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZ2FtZUludGVyZmFjZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLFxyXG4gICAgICAgICAgICB2aWV3d2lkdGggPSB0aGlzLmdhbWVJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwoZ2FtZV9saXN0Lmxlbmd0aCAvIHRoaXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICBjb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQueCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ2FtZV9sZW5ndGggPSB0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemU7XHJcbiAgICAgICAgaWYgKGdhbWVfbGVuZ3RoID49IGdhbWVfbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ2FtZV9sZW5ndGggPSBnYW1lX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblNob3dHYW1lKGNvbnRlbnQsIGdhbWVfbGlzdCk7XHJcblxyXG4gICAgICAgIC8v6K6+572uc2Nyb2xsdmlldy53aWR0aFxyXG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguY2VpbChnYW1lX2xlbmd0aCAvIDIpICogZ2FtZWl0ZW1XaWR0aDtcclxuICAgICAgICBjb250ZW50LndpZHRoID0gd2lkdGggPCB2aWV3d2lkdGggPyB2aWV3d2lkdGggOiB3aWR0aDtcclxuXHJcbiAgICAgICAgLy8g5Yik5pat56ys5LiA5qyh5LiN5omn6KGM5Yqo55S7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RUaW1lVGFnIHx8IHRoaXMuaXNTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWVUYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNoaWxkcmVuW2ldLnBvc2l0aW9uID0gcG9zQXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5omn6KGM5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0aW9uQW5pKGNvbnRlbnQsIGdhbWVfbGVuZ3RoLCBwb3NBcnIsIHZpZXd3aWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmoIfnrb7lsZXnpLpcclxuICAgIGxhYmVsUGxhdCgpIHtcclxuICAgICAgICBsZXQgX2dhbWVzTGlzdCA9IHRoaXMuZ2FtZXNMaXN0W3RoaXMudHlwZUluZGV4XS5wbGF0TGlzdDtcclxuICAgICAgICBsZXQgY29udGVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBwbGF0TGlzdCA9IE9iamVjdC52YWx1ZXMoX2dhbWVzTGlzdCk7XHJcbiAgICAgICAgaWYgKHBsYXRMaXN0Lmxlbmd0aCA8PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVJbmRleCA9PSBcIl8zXCIpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IHRoaXMuZHpQbGF0VHlwZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmR6UGxhdFR5cGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5xcFBsYXRUeXBlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucXBQbGF0VHlwZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsX3BhbmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5idG5QbGF0Zm9ybSk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5wYXJlbnQgPSBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbGFiZWxfcGFuZWwubmFtZSA9IGBjaGVzc0NhcmQke3BsYXRMaXN0W2ldLmlkfWA7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5pZCA9IFwiX1wiICsgcGxhdExpc3RbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC55ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR6UGxhdEluZGV4ID09IFwiX1wiICsgcGxhdExpc3RbaV0uaWQgfHwgdGhpcy5xcFBsYXRJbmRleCA9PSBcIl9cIiArIHBsYXRMaXN0W2ldLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxfcGFuZWwuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuY2hlY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGltZ19uYW1lID0gYGltZ19xcF8ke3BsYXRMaXN0W2ldLmlkfWA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlSW5kZXggPT0gXCJfM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nX25hbWUgPSBgaW1nX2R6XyR7cGxhdExpc3RbaV0uaWR9YDtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5uYW1lID0gYGFyY2FkZSR7cGxhdExpc3RbaV0uaWR9YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc19kel9wbGF0LmdldFNwcml0ZUZyYW1lKGltZ19uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZGV4ID09IFwiXzNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHpQbGF0SW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHpQbGF0SW5kZXggPSBcIl9cIiArIHBsYXRMaXN0WzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxQbGF0R2FtZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5xcFBsYXRJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xcFBsYXRJbmRleCA9IFwiX1wiICsgcGxhdExpc3RbMF0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbFBsYXRHYW1lKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxQbGF0R2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlsZXnpLrlsI/lm77moIfmuLjmiI/liJfooahcclxuICAgIGxhYmVsUGxhdEdhbWUgKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q2F0ZWdvcnlEYXRhKCk7XHJcbiAgICAgICAgbGV0IF9nYW1lc0xpc3QgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0ucGxhdExpc3Q7XHJcbiAgICAgICAgbGV0IHBsYXRJbmRleCA9IHRoaXMudHlwZUluZGV4ID09IFwiXzNcIiA/IHRoaXMuZHpQbGF0SW5kZXggOiB0aGlzLnFwUGxhdEluZGV4O1xyXG4gICAgICAgIHRoaXMuaW5pdExpc3QoX2dhbWVzTGlzdFtwbGF0SW5kZXhdLmdhbWVMaXN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5aSn5Zu+5qCH5bGV56S6XHJcbiAgICBiaWdJY29uUGxhdCgpIHtcclxuICAgICAgICBsZXQgZ2FtZUxpc3REYXRhID0gdGhpcy5nYW1lc0xpc3RbdGhpcy50eXBlSW5kZXhdLnBsYXRMaXN0O1xyXG5cclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IHRlbXBYID0gNjUsIC8v5Zu+5qCH5LmL6Ze055qE6Ze06ZqUXHJcbiAgICAgICAgICAgIGdhbWVpdGVtV2lkdGggPSA0MDQ7Ly9pdGVt5aSn5bCPXHJcblxyXG4gICAgICAgIGxldCBwb3NBcnIgPSBbXSwgcGxhdF9sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpO1xyXG4gICAgICAgIHZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdmlldy5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIiksXHJcbiAgICAgICAgICAgIHZpZXdXaWR0aCA9IHZpZXcud2lkdGg7XHJcbiAgICAgICAgdGhpcy5nYW1lSW50ZXJmYWNlLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zdG9wQXV0b1Njcm9sbCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5xcFBsYXRJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGdhbWVMaXN0RGF0YVt0aGlzLnFwUGxhdEluZGV4XS5pZFxyXG4gICAgICAgICAgICAvLyDlsY/olL13ZWLniYjnvZHpobXmuLjmiI9cclxuICAgICAgICAgICAgbGV0IHBsYXRfZ2FtZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhnYW1lTGlzdERhdGFbdGhpcy5xcFBsYXRJbmRleF0uZ2FtZUxpc3QpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWlzRW5hYmxlSG90VXBkYXRlICYmIGl0ZW0uaWQgPiA5OTk5KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBwbGF0X2dhbWVMaXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIOiuvue9ruaYr+S4jeaYr+WIhumhteWKoOi9vVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHBsYXRfZ2FtZUxpc3QubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC54ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g6I635Y+W6K6+572u55qE5L2N572uXHJcbiAgICAgICAgICAgIHBvc0FyciA9IHRoaXMuZ2V0UG9zQXJyKHBsYXRfZ2FtZUxpc3QpO1xyXG5cclxuICAgICAgICAgICAgcGxhdF9sZW5ndGggPSB0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgIGlmIChwbGF0X2xlbmd0aCA+PSBwbGF0X2dhbWVMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcGxhdF9sZW5ndGggPSBwbGF0X2dhbWVMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vblNob3dHYW1lKGNvbnRlbnQsIHBsYXRfZ2FtZUxpc3QpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpcF9ub2RlID0gdGhpcy5wbGF0SW50ZXJmYWNlLmdldENoaWxkQnlOYW1lKFwidGlwX25vZGVcIilcclxuICAgICAgICAgICAgdGlwX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGlwX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub2RlXCIpLmdldENoaWxkQnlOYW1lKFwibG9nb1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXNfcXBfcGxhdC5nZXRTcHJpdGVGcmFtZShgaW1nX2dhbWVfbGlzdF8ke2lkfWApO1xyXG4gICAgICAgICAgICB0aXBfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5oC75YWxJHtwbGF0X2dhbWVMaXN0Lmxlbmd0aH3mrL7lsI/muLjmiI9gO1xyXG5cclxuICAgICAgICAgICAgLy/orr7nva5zY3JvbGx2aWV3LndpZHRoXHJcbiAgICAgICAgICAgIGdhbWVpdGVtV2lkdGggPSB0aGlzLmdhbWVfaXRlbV9zemllOyAvL2l0ZW3lpKflsI8gKyDpl7TpmpQgICAzNTBcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5jZWlsKHBsYXRfbGVuZ3RoIC8gMikgKiBnYW1laXRlbVdpZHRoO1xyXG4gICAgICAgICAgICBjb250ZW50LndpZHRoID0gd2lkdGggPCB2aWV3V2lkdGggPyB2aWV3V2lkdGggOiB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBfbm9kZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBjb250ZW50LnggPSAwO1xyXG4gICAgICAgICAgICBsZXQgcGxhdF9nYW1lTGlzdF9iaWcgPSBPYmplY3QudmFsdWVzKGdhbWVMaXN0RGF0YSk7XHJcbiAgICAgICAgICAgIHBsYXRfbGVuZ3RoID0gcGxhdF9nYW1lTGlzdF9iaWcubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgLy8g6K6+572u5YWl5Y+j5L2N572uXHJcbiAgICAgICAgICAgIHBvc0FyciA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcG9zWCA9IGdhbWVpdGVtV2lkdGggLyAyICsgMjA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdF9sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcG9zQXJyLnB1c2goY2MudjIoaSAhPSAwID8gcG9zWCArPSB0ZW1wWCArIGdhbWVpdGVtV2lkdGggOiBwb3NYLCAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v6K6+572uc2Nyb2xsdmlldy53aWR0aFxyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBwbGF0X2xlbmd0aCAqIChnYW1laXRlbVdpZHRoICsgdGVtcFgpIC0gdGVtcFggKyA0MDtcclxuICAgICAgICAgICAgY29udGVudC53aWR0aCA9IHdpZHRoIDwgdmlld1dpZHRoID8gdmlld1dpZHRoIDogd2lkdGg7XHJcblxyXG4gICAgICAgICAgICAvLyDliJ3lp4vljJblpKflm77moIflsZXnpLpcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmlnX2lkID0gcGxhdF9nYW1lTGlzdF9iaWdbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXRfcGFuZWxfYmlnID0gY2MuaW5zdGFudGlhdGUodGhpcy5idG5QbGF0Zm9ybUJpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdF9wYW5lbF9iaWcueSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdF9wYW5lbF9iaWcucGFyZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLm5hbWUgPSBgY2hlc3NDYXJkJHtiaWdfaWR9YDtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5pZCA9IFwiX1wiICsgYmlnX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLnBvc2l0aW9uID0gY2MudjIoMCwgY2Mud2luU2l6ZS5oZWlnaHQgKyBwbGF0X3BhbmVsX2JpZy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgUVBfQkdfSU1ILmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChRUF9CR19JTUhbal0gPT0gYmlnX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5iaWdfcXBfcGxhdFtqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5nZXRDaGlsZEJ5TmFtZShcImxvZ29cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzX3FwX3BsYXQuZ2V0U3ByaXRlRnJhbWUoYGltZ19sb2dvXyR7YmlnX2lkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzX3FwX3BsYXQuZ2V0U3ByaXRlRnJhbWUoYGltZ190aXRsZV8ke2JpZ19pZH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXRfZ2FtZUxpc3RfYmlnW2ldLnRhZyA+IDApIHsgICAgLy/orr7nva7op5LmoIdcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lck1hcmsgPSBwbGF0X3BhbmVsX2JpZy5nZXRDaGlsZEJ5TmFtZShcImNvcm5lck1hcmtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyTWFyay5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXNfY29ybmVyX21hcmsuZ2V0U3ByaXRlRnJhbWUoYGltZ19jb3JuZXJfbWFyayR7cGxhdF9nYW1lTGlzdF9iaWdbaV0udGFnfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJNYXJrLmdldENoaWxkQnlOYW1lKFwidHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ09STkVSX01BUktbcGxhdF9nYW1lTGlzdF9iaWdbaV0udGFnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyTWFyay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5omn6KGM5Yqo5L2cXHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RUaW1lVGFnIHx8IHRoaXMuaXNTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWVUYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0X2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNoaWxkcmVuW2ldLnBvc2l0aW9uID0gcG9zQXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5leGVjdXRpb25BbmkoY29udGVudCwgcGxhdF9sZW5ndGgsIHBvc0Fyciwgdmlld1dpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOinhuiur+eVjOmdolxyXG4gICAgdmlkZW9QbGF0KCkge1xyXG4gICAgICAgIHRoaXMudmlkZW9JbnRlcmZhY2Uud2lkdGggPSB0aGlzLm5vZGUud2lkdGggLSB0aGlzLmdldEdhbWVHcm91cFdpZHRoKCk7XHJcbiAgICAgICAgdGhpcy52aWRlb0ludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICBpZiAodGhpcy5iYW5uZXIpIHRoaXMuYmFubmVyLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdmlkZW9fZ2FtZXNMaXN0ID0gdGhpcy5nYW1lc0xpc3RbdGhpcy50eXBlSW5kZXhdLnBsYXRMaXN0O1xyXG4gICAgICAgIGxldCBwbGF0TGlzdCA9IE9iamVjdC52YWx1ZXModmlkZW9fZ2FtZXNMaXN0KTtcclxuICAgICAgICBpZiAocGxhdExpc3QubGVuZ3RoIDw9IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpZGVvSW50ZXJmYWNlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy52aWRlb05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICBpZiAoY29udGVudC5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB2aWRlb19pZCA9IHBsYXRMaXN0W2ldLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsX3BhbmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5idG5QbGF0Zm9ybSk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC55ID0gMDtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLnBhcmVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxfcGFuZWwubmFtZSA9IGB2aWRlbyR7dmlkZW9faWR9YDtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLmlkID0gXCJfXCIgKyB2aWRlb19pZDtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc192aWRlb19wbGF0LmdldFNwcml0ZUZyYW1lKGBpbWdfdmlkZW9fdGl0bGUke3ZpZGVvX2lkfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52aWRlb1BsYXRJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvUGxhdEluZGV4ID0gXCJfXCIgKyBwbGF0TGlzdFswXS5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0bl9zdGFydF92aWRlbyA9IHRoaXMudmlkZW9JbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fc3RhcnRfdmlkZW9cIilcclxuICAgICAgICBsZXQgc3RyID0gdGhpcy52aWRlb1BsYXRJbmRleC5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgYnRuX3N0YXJ0X3ZpZGVvLmdldENoaWxkQnlOYW1lKFwiaW1nX3ZpZGVvXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc192aWRlb19wbGF0LmdldFNwcml0ZUZyYW1lKGBpbWdfdmlkZW8ke3N0cltzdHIubGVuZ3RoIC0gMV19YCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOS9k+iCsueVjOmdolxyXG4gICAgc3BvcnRzUGxhdCgpIHtcclxuICAgICAgICBsZXQgZ2FtZUxpc3REYXRhID0gdGhpcy5nYW1lc0xpc3RbdGhpcy50eXBlSW5kZXhdLnBsYXRMaXN0O1xyXG4gICAgICAgIHRoaXMucGxhdEludGVyZmFjZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgdGVtcFggPSA2NSwgLy/lm77moIfkuYvpl7TnmoTpl7TpmpRcclxuICAgICAgICAgICAgZ2FtZWl0ZW1XaWR0aCA9IDM2MTsvL2l0ZW3lpKflsI9cclxuXHJcbiAgICAgICAgbGV0IHBvc0FyciA9IFtdLCBwb3J0c19sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBfbm9kZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnBsYXRJbnRlcmZhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpO1xyXG4gICAgICAgIHZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdmlldy5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIiksXHJcbiAgICAgICAgICAgIHZpZXdXaWR0aCA9IHZpZXcud2lkdGg7XHJcbiAgICAgICAgY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgY29udGVudC54ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IHNwb3J0c19nYW1lTGlzdCA9IE9iamVjdC52YWx1ZXMoZ2FtZUxpc3REYXRhKTtcclxuICAgICAgICBwb3J0c19sZW5ndGggPSBzcG9ydHNfZ2FtZUxpc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyDorr7nva7lhaXlj6PkvY3nva5cclxuICAgICAgICBwb3NBcnIgPSBbXTtcclxuICAgICAgICBsZXQgcG9zWCA9IGdhbWVpdGVtV2lkdGggLyAyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9ydHNfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcG9zQXJyLnB1c2goY2MudjIoaSAhPSAwID8gcG9zWCArPSB0ZW1wWCArIGdhbWVpdGVtV2lkdGggOiBwb3NYLCAwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iuvue9rnNjcm9sbHZpZXcud2lkdGhcclxuICAgICAgICBsZXQgd2lkdGggPSBwb3J0c19sZW5ndGggKiAoZ2FtZWl0ZW1XaWR0aCArIHRlbXBYKSAtIHRlbXBYO1xyXG4gICAgICAgIGNvbnRlbnQud2lkdGggPSB3aWR0aCA8IHZpZXdXaWR0aCA/IHZpZXdXaWR0aCA6IHdpZHRoO1xyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJblpKflm77moIflsZXnpLpcclxuICAgICAgICBpZiAoY29udGVudC5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3J0c19sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpZ19pZCA9IHNwb3J0c19nYW1lTGlzdFtpXS5pZDtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF0X3BhbmVsX2JpZyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3BvcnRzTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy55ID0gMDtcclxuICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLnBhcmVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGxhdF9wYW5lbF9iaWcubmFtZSA9IGBzcG9ydHMke2JpZ19pZH1gO1xyXG4gICAgICAgICAgICAgICAgcGxhdF9wYW5lbF9iaWcuaWQgPSBcIl9cIiArIGJpZ19pZDtcclxuICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLnBvc2l0aW9uID0gY2MudjIoMCwgY2Mud2luU2l6ZS5oZWlnaHQgKyBwbGF0X3BhbmVsX2JpZy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFRZX0JHX0lNSC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUWV9CR19JTUhbal0gPT0gYmlnX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRfcGFuZWxfYmlnLmdldENoaWxkQnlOYW1lKFwiaW1nX3J3XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5iaWdfdHlfcGxhdFtqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9nbyA9IHBsYXRfcGFuZWxfYmlnLmdldENoaWxkQnlOYW1lKFwibG9nb19sXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoYmlnX2lkID09IDIyKSBsb2dvID0gcGxhdF9wYW5lbF9iaWcuZ2V0Q2hpbGRCeU5hbWUoXCJsb2dvX3JcIilcclxuICAgICAgICAgICAgICAgIGxvZ28uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzX3R5X3BsYXQuZ2V0U3ByaXRlRnJhbWUoYGltZ19sb2dvXyR7YmlnX2lkfWApO1xyXG4gICAgICAgICAgICAgICAgbG9nby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwbGF0X3BhbmVsX2JpZy5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc190eV9wbGF0LmdldFNwcml0ZUZyYW1lKGBpbWdfdGl0bGVfJHtiaWdfaWR9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOaJp+ihjOWKqOS9nFxyXG4gICAgICAgIHRoaXMuZXhlY3V0aW9uQW5pKGNvbnRlbnQsIHBvcnRzX2xlbmd0aCwgcG9zQXJyLCB2aWV3V2lkdGgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDnlLXnq57nlYzpnaJcclxuICAgIGVsZWN0cm9uaWNQbGF0KCkge1xyXG4gICAgICAgIHRoaXMuZWxlY3Ryb25pY0ludGVyZmFjZS53aWR0aCA9IHRoaXMubm9kZS53aWR0aCAtIHRoaXMuZ2V0R2FtZUdyb3VwV2lkdGgoKTtcclxuICAgICAgICB0aGlzLmVsZWN0cm9uaWNJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyKSB0aGlzLmJhbm5lci5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLmxlZnQgPSB0aGlzLm9mZnNldExlZnQ7XHJcbiAgICAgICAgLy8gdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgZWxlY3Ryb25pY19nYW1lc0xpc3QgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0ucGxhdExpc3Q7XHJcbiAgICAgICAgbGV0IHBsYXRMaXN0ID0gT2JqZWN0LnZhbHVlcyhlbGVjdHJvbmljX2dhbWVzTGlzdCk7XHJcbiAgICAgICAgaWYgKHBsYXRMaXN0Lmxlbmd0aCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5lbGVjdHJvbmljSW50ZXJmYWNlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVjdHJvbmljX2lkID0gcGxhdExpc3RbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxfcGFuZWwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVsZWN0cm9uaWNOb2RlKTtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3BhbmVsLnBhcmVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxfcGFuZWwubmFtZSA9IGBlbGVjdHJvbmljJHtlbGVjdHJvbmljX2lkfWA7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9wYW5lbC5pZCA9IFwiX1wiICsgZWxlY3Ryb25pY19pZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmlkZW9QbGF0SW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1BsYXRJbmRleCA9IFwiX1wiICsgcGxhdExpc3RbMF0uaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaIv+mXtOWcuueVjOmdouW4g+WxgFxyXG4gICAgaW5pdFJvb21MaXN0KCkge1xyXG4gICAgICAgIGxldCByb29tX2dhbWVHcm91cCA9IHRoaXMuZ2FtZXNMaXN0W3RoaXMudHlwZUluZGV4XTtcclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyb29tX2ZpZWxkXCIpXHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21JbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yb29tSW50ZXJmYWNlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfcm9vbV9maWVsZCk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUludGVyZmFjZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUludGVyZmFjZS5wb3NpdGlvbiA9IGNjLnYyKGNjLndpblNpemUud2lkdGggLyAyLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5yb29tSW50ZXJmYWNlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UuZ2V0Q29tcG9uZW50KHRoaXMucm9vbUludGVyZmFjZS5uYW1lKS5pbml0RGF0YShyb29tX2dhbWVHcm91cCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RUaW1lVGFnID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJp+ihjOWKqOeUu1xyXG4gICAgZXhlY3V0aW9uQW5pKGNvbnRlbnQsIGxlbmd0aCwgcG9zQXJyLCB2aWV3V2lkdGgpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsVGltZSA9IDAuMjUsICAgLy/lm77moIfnp7vliqjml7bpl7RcclxuICAgICAgICAgICAgZXZlcnlUaW1lID0gMC4wNSwgICAgLy/lm77moIfnp7vliqjpl7TpmpTml7bpl7RcclxuICAgICAgICAgICAgZGlzdGFuY2UgPSAzMCwgICAgICAgLy/lm77moIflvLnliqjot53nprtcclxuICAgICAgICAgICAgZGlzdGFuY2VUaW1lID0gMC4xOyAgLy/lm77moIflvLnliqjml7bpl7RcclxuXHJcbiAgICAgICAgLy8g5omn6KGM5Yqo5L2cXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNvbnRlbnQuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnBvc2l0aW9uID0gY2MudjIocG9zQXJyW2ldLnggKyB2aWV3V2lkdGgsIHBvc0FycltpXS55KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhzY3JvbGxUaW1lICsgZXZlcnlUaW1lICogaSwgcG9zQXJyW2ldLnggLSBkaXN0YW5jZSwgcG9zQXJyW2ldLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkaXN0YW5jZVRpbWUsIHBvc0FycltpXSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoLTEgJiYgdGhpcy5nYW1lSW50ZXJmYWNlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpKfljoXmiafooYzliqjnlLsgPSBcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5ZnYW1lZ3JvdXBXaWR0aFxyXG4gICAgZ2V0R2FtZUdyb3VwV2lkdGgoKSB7XHJcbiAgICAgICAgbGV0IGdhbWVncm91cFdpZHRoID0gdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoICsgdGhpcy5nYW1lZ3JvdXBWaWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpLmxlZnQ7XHJcbiAgICAgICAgcmV0dXJuIGdhbWVncm91cFdpZHRoICsgdGhpcy5vZmZzZXRMZWZ0ICsgdGhpcy5sZWZ0SW50ZXJ2YWw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9rueOsOWcqOWcqOmCo+S4quWIhuexu1xyXG4gICAgc2V0Q2F0ZWdvcnlEYXRhKCkge1xyXG4gICAgICAgIGdsR2FtZS5pc0NhdGVnb3J5RGF0YS50eXBlSW5kZXggPSB0aGlzLnR5cGVJbmRleFxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZUluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJfMVwiOlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmlzQ2F0ZWdvcnlEYXRhLnBsYXRJbmRleCA9IHRoaXMucXBQbGF0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl8zXCI6XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuaXNDYXRlZ29yeURhdGEucGxhdEluZGV4ID0gdGhpcy5kelBsYXRJbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXzRcIjpcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5pc0NhdGVnb3J5RGF0YS5wbGF0SW5kZXggPSB0aGlzLnZpZGVvUGxhdEluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuaXNDYXRlZ29yeURhdGEucGxhdEluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInJlc2l6ZVwiLCB0aGlzKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
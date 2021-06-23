"use strict";
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
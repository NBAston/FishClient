
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/center.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxjZW50ZXIuanMiXSwibmFtZXMiOlsiZ3JvdXBJZCIsIkNPUk5FUl9NQVJLIiwiQkFOTkVSX1NUQVJUIiwiT04iLCJPRkYiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiYnRuV2ViR2FtZSIsImNjIiwiTm9kZSIsImFsbEludGVyZmFjZSIsImdhbWVncm91cFZpZXciLCJnYW1lZ3JvdXAiLCJwcmVmYWJfYmFubmVyIiwiUHJlZmFiIiwicHJlZmFiX3Jvb21fZmllbGQiLCJhdGxhc19jb3JuZXJfbWFyayIsIlNwcml0ZUF0bGFzIiwib25Mb2FkIiwic3RhcnQiLCJ0eXBlSW5kZXgiLCJpc0NhdGVnb3J5RGF0YSIsImZpcnN0VGltZVRhZyIsImJhbm5lciIsImlzaVBob25lWCIsIkFkYXB0aXZlSXBob25leCIsImdldENvbXBvbmVudCIsIldpZGdldCIsInVwZGF0ZUFsaWdubWVudCIsIkFkYXB0aXZlSW50ZXJmYWNlIiwiaXBob25leFdpZHRoIiwid2lkdGgiLCJjaGlsZHJlbiIsInRvZ2dsZU5vZGUiLCJ4IiwiaW50ZXJ2YWwiLCJsZWZ0SW50ZXJ2YWwiLCJnYW1lbGlzdGNmZyIsInJlcUdhbWVHcm91cCIsImludGVyRmFjZU1vZGUiLCJnZXQiLCJnYW1lRGlzcGxheVR5cGVMaXN0IiwiZ2FtZWdyb3VwV2lkdGgiLCJhY3RpdmUiLCJ6SW5kZXgiLCJsZWZ0IiwiZW1pdHRlciIsImVtaXQiLCJiaWxsYm9hcmRzRGF0YSIsInVzZXIiLCJyZXFCaWxsYm9hcmRzRGF0YSIsImJhbm5lcldpZHRoIiwicGFuZWwiLCJzaG93Q2hpbGRQYW5lbCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDaGlsZEJ5TmFtZSIsImdldEdhbWVzTGlzdCIsImdhbWVEaXNwbGF5VHlwZSIsImdhbWVEaXNwbGF5VG9rZW4iLCJ0b2tlbiIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwibXNnIiwicmVxR2FtZXNMaXN0IiwiZ2FtZXNMaXN0Iiwic2V0SXRlbSIsInN0b3JhZ2UiLCJzZXRHYW1lZ1JvdXAiLCJpbml0RGF0YSIsInNlbGZHYW1lTGlzdCIsImdhbWVMaXN0QXJyYXkiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmaWx0ZXIiLCJpdGVtIiwiaWQiLCJtYXAiLCJnYW1lTGlzdCIsInJlc3VsdCIsImZvckVhY2giLCJuYW1lIiwiaW5pdFJvb21MaXN0IiwiaW5pdExpc3QiLCJpIiwibGVuZ3RoIiwicGxhdGZvcm1fbm9kZSIsIm1fdG9nZ2xlIiwiVG9nZ2xlIiwiaXNDaGVja2VkIiwiY2hlY2siLCJvbkNsaWNrIiwic3dpdGNoSW50ZXJmYWNlIiwic3dpdGNoUm9vbSIsImlzRW5hYmxlSG90VXBkYXRlIiwiaW5kZXhPZiIsInNmX2dhbWVfbGlzdCIsIm9wZW5UcmlwYXJ0aXRlR2FtZSIsInR5cGUiLCJyb29tSW50ZXJmYWNlIiwic2Nyb2xsVGltZSIsImV2ZXJ5VGltZSIsImRpc3RhbmNlIiwiZGlzdGFuY2VUaW1lIiwidGVtcFgiLCJnYW1laXRlbVdpZHRoIiwiZ2FtZUdyb3VwIiwiZ2FtZV9saXN0IiwicHVzaCIsInBvc0FyciIsImdldFBvc0FyciIsIlNjcm9sbFZpZXciLCJzdG9wQXV0b1Njcm9sbCIsInZpZXciLCJ2aWV3V2lkdGgiLCJjb250ZW50IiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJmaWxldXRpbCIsInJlYWRQcmVmYWIiLCJwbGF6YVBhbmVsRGljdCIsInRoZW4iLCJwcmVmYWIiLCJnYW1lX2xlbmd0aCIsIm5ld1ByZWZhYiIsImluc3RhbnRpYXRlIiwiTGFiZWwiLCJzdHJpbmciLCJnYW1lTmFtZSIsInRhZyIsImNvcm5lck1hcmsiLCJjb3JuZXJfbWFyayIsImdldFNwcml0ZUZyYW1lIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJpY29uIiwidXJsIiwicmVzb3VyY2VfdXJsIiwic2hvd1JlbW90ZUltYWdlIiwicG9zaXRpb24iLCJ2MiIsIndpblNpemUiLCJoZWlnaHQiLCJyZXNldERhdGEiLCJpbml0VUkiLCJNYXRoIiwiY2VpbCIsInkiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIm1vdmVUbyIsInNldENhdGVnb3J5RGF0YSIsImxpc3QiLCJwb3NYIiwicG9zWSIsImluZGV4Iiwicm9vbV9nYW1lR3JvdXAiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHO0FBQ1osS0FBRyxLQURTO0FBRVosS0FBRyxRQUZTO0FBR1osS0FBRyxXQUhTO0FBSVosS0FBRyxTQUpTO0FBS1osS0FBRztBQUxTLENBQWhCO0FBT0EsSUFBTUMsV0FBVyxHQUFHO0FBQ2hCLEtBQUcsR0FEYTtBQUVoQixLQUFHLElBRmE7QUFHaEIsS0FBRyxJQUhhO0FBSWhCLEtBQUc7QUFKYSxDQUFwQjtBQU1BLElBQU1DLFlBQVksR0FBRztBQUNqQkMsRUFBQUEsRUFBRSxFQUFFLENBRGE7QUFDVDtBQUNSQyxFQUFBQSxHQUFHLEVBQUUsQ0FGWSxDQUVUOztBQUZTLENBQXJCO0FBS0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVDLEVBQUUsQ0FBQ0MsSUFEUDtBQUVSQyxJQUFBQSxZQUFZLEVBQUVGLEVBQUUsQ0FBQ0MsSUFGVDtBQUlSRSxJQUFBQSxhQUFhLEVBQUVILEVBQUUsQ0FBQ0MsSUFKVjtBQUtSRyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0MsSUFMTjtBQU9SSSxJQUFBQSxhQUFhLEVBQUVMLEVBQUUsQ0FBQ00sTUFQVjtBQU93QjtBQUNoQ0MsSUFBQUEsaUJBQWlCLEVBQUVQLEVBQUUsQ0FBQ00sTUFSZDtBQVF3QjtBQUVoQ0UsSUFBQUEsaUJBQWlCLEVBQUVSLEVBQUUsQ0FBQ1M7QUFWZCxHQURRO0FBYXBCQyxFQUFBQSxNQWJvQixvQkFh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QUwsR0FBcUI5RixFQUFFLENBQUN3SCxXQUFILENBQWUsS0FBS2pILGlCQUFwQixDQUFyQjtBQUNBLFdBQUt1RixhQUFMLENBQW1CL0MsTUFBbkIsR0FBNEIsS0FBS0QsSUFBakM7QUFDQSxXQUFLZ0QsYUFBTCxDQUFtQndDLFFBQW5CLEdBQThCdEksRUFBRSxDQUFDdUksRUFBSCxDQUFNdkksRUFBRSxDQUFDd0ksT0FBSCxDQUFXakgsS0FBWCxHQUFtQixDQUF6QixFQUE0QixDQUE1QixDQUE5QjtBQUNBLFdBQUt1RSxhQUFMLENBQW1CMUQsTUFBbkIsR0FBNEIsRUFBNUI7QUFDSDs7QUFDRCxTQUFLMEQsYUFBTCxDQUFtQjNELE1BQW5CLEdBQTRCLElBQTVCO0FBQ0EsU0FBSzJELGFBQUwsQ0FBbUI1RSxZQUFuQixDQUFnQyxLQUFLNEUsYUFBTCxDQUFtQmxCLElBQW5ELEVBQXlEWixRQUF6RCxDQUFrRXVGLGNBQWxFO0FBRUEsU0FBS0wsZUFBTDtBQUNBLFNBQUtwSSxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsR0FqVm1CO0FBbVZwQjtBQUNBb0ksRUFBQUEsZUFwVm9CLDZCQW9WRjtBQUNkMUYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNEJBQVosRUFBMEMsS0FBSzdDLFNBQS9DO0FBQ0FqQixJQUFBQSxNQUFNLENBQUNrQixjQUFQLENBQXNCRCxTQUF0QixHQUFrQyxLQUFLQSxTQUF2QztBQUNILEdBdlZtQjtBQXlWcEI0SSxFQUFBQSxTQXpWb0IsdUJBeVZSLENBRVg7QUEzVm1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBncm91cElkID0ge1xyXG4gICAgMTogXCJob3RcIixcclxuICAgIDI6IFwiYXJjYWRlXCIsXHJcbiAgICAzOiBcImNoZXNzQ2FyZFwiLFxyXG4gICAgNDogXCJmaXNoaW5nXCIsXHJcbiAgICA1OiBcInJvb21cIixcclxufVxyXG5jb25zdCBDT1JORVJfTUFSSyA9IHtcclxuICAgIDA6IFwi5pegXCIsXHJcbiAgICAxOiBcIuaOqOiNkFwiLFxyXG4gICAgMjogXCLngavniIZcIixcclxuICAgIDM6IFwi5pyA5pawXCIsXHJcbn1cclxuY29uc3QgQkFOTkVSX1NUQVJUID0ge1xyXG4gICAgT046IDEsICAvL+W8gOWQr1xyXG4gICAgT0ZGOiAwICAvL+WFs+mXrVxyXG59XHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnRuV2ViR2FtZTogY2MuTm9kZSxcclxuICAgICAgICBhbGxJbnRlcmZhY2U6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIGdhbWVncm91cFZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgZ2FtZWdyb3VwOiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICBwcmVmYWJfYmFubmVyOiBjYy5QcmVmYWIsICAgICAgIC8v6L2u5pKt5Zu+6aKE5Yi2XHJcbiAgICAgICAgcHJlZmFiX3Jvb21fZmllbGQ6IGNjLlByZWZhYiwgICAvL+aIv+mXtOWcuumihOWItlxyXG5cclxuICAgICAgICBhdGxhc19jb3JuZXJfbWFyazogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50eXBlSW5kZXggPSBnbEdhbWUuaXNDYXRlZ29yeURhdGEudHlwZUluZGV4O1xyXG4gICAgICAgIHRoaXMuZmlyc3RUaW1lVGFnID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYW5uZXIgPSBudWxsO1xyXG4gICAgICAgIGlmIChpc2lQaG9uZVgpIHRoaXMuQWRhcHRpdmVJcGhvbmV4KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lZ3JvdXBWaWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIHRoaXMuQWRhcHRpdmVJbnRlcmZhY2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQWRhcHRpdmVJcGhvbmV4KCkge1xyXG4gICAgICAgIHRoaXMuaXBob25leFdpZHRoID0gODA7ICAgICAgICAgLy/pgILphY1pcGhvbmXnmoTlrr3luqblgY/np7tcclxuICAgICAgICB0aGlzLmdhbWVncm91cFZpZXcud2lkdGggKz0gdGhpcy5pcGhvbmV4V2lkdGg7XHJcbiAgICAgICAgZm9yIChsZXQgdG9nZ2xlTm9kZSBvZiB0aGlzLmdhbWVncm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB0b2dnbGVOb2RlLnggPSB0aGlzLmlwaG9uZXhXaWR0aCAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBBZGFwdGl2ZUludGVyZmFjZSgpIHtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gMjA7XHJcbiAgICAgICAgdGhpcy5sZWZ0SW50ZXJ2YWwgPSAzMDtcclxuICAgICAgICAvLyDlkJEgcGhwIOiOt+WPluWIsOW9k+WJjea4uOaIj+mFjee9ruaVsOmHj+WQjui/m+ihjFVJ5bGV546wXHJcbiAgICAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLnJlcUdhbWVHcm91cCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJGYWNlTW9kZSA9IGdsR2FtZS5nYW1lbGlzdGNmZy5nZXQoXCJpbnRlckZhY2VNb2RlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVEaXNwbGF5VHlwZUxpc3QgPSBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0KFwiZ2FtZURpc3BsYXlUeXBlTGlzdFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOiOt+WPluWIhuexu+eahOWuveW6plxyXG4gICAgICAgICAgICBsZXQgZ2FtZWdyb3VwV2lkdGggPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlckZhY2VNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWdyb3VwVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lZ3JvdXBWaWV3LnpJbmRleCA9IDMwO1xyXG4gICAgICAgICAgICAgICAgZ2FtZWdyb3VwV2lkdGggPSB0aGlzLmdhbWVncm91cFZpZXcud2lkdGggKyB0aGlzLmdhbWVncm91cFZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkubGVmdCArIHRoaXMubGVmdEludGVydmFsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlSW5kZXggPSBcIl8wXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVncm91cFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnYW1lZ3JvdXBXaWR0aCA9IHRoaXMuaW50ZXJ2YWwgKiAyO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInNldHBsYXphYmdcIiwgeyB3aWR0aDogdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoIH0pOy8v5pu05o2i5aSn5Y6F6IOM5pmv5Zu+XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOiOt+WPlmJhbm5lcueahOWuveW6plxyXG4gICAgICAgICAgICBsZXQgYmlsbGJvYXJkc0RhdGEgPSBnbEdhbWUudXNlci5yZXFCaWxsYm9hcmRzRGF0YTtcclxuICAgICAgICAgICAgbGV0IGJhbm5lcldpZHRoID0gMDtcclxuICAgICAgICAgICAgLy8g5qCh6aqM5pa55byP5Li65pyN5Yqh56uv5aaC5peg5pWw5o2u5YiZ6buY6K6k5Li65byA5ZCvXHJcbiAgICAgICAgICAgIGlmIChiaWxsYm9hcmRzRGF0YS5zd2l0Y2ggIT0gQkFOTkVSX1NUQVJULk9GRikge1xyXG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsdmlld+eahOebkeWQrOebuOS6kuW9seWTje+8jOaJgOS7peagueaNruWdkOagh+WxnuaAp+aUvuWFpeeItuiKgueCuemBv+WFjeebkeWQrOebuOS6kuW5suaJsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXIgPSBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy5wcmVmYWJfYmFubmVyLCB0aGlzLm5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyLnggPSAtdGhpcy5ub2RlLndpZHRoIC8gMiArIGdhbWVncm91cFdpZHRoICsgdGhpcy5iYW5uZXIud2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgYmFubmVyV2lkdGggPSB0aGlzLmJhbm5lci53aWR0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g6K6+572u5ri45oiP5YiX6KGo55qE5a695bqmXHJcbiAgICAgICAgICAgIHRoaXMuYWxsSW50ZXJmYWNlLndpZHRoID0gdGhpcy5ub2RlLndpZHRoIC0gZ2FtZWdyb3VwV2lkdGggLSBiYW5uZXJXaWR0aCAtIHRoaXMuaW50ZXJ2YWwgLSB0aGlzLmxlZnRJbnRlcnZhbDtcclxuICAgICAgICAgICAgdGhpcy5hbGxJbnRlcmZhY2UuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsSW50ZXJmYWNlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzTGlzdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPlua4uOaIj+aVsOaNrlxyXG4gICAgZ2V0R2FtZXNMaXN0KCl7XHJcbiAgICAgICAgbGV0IGdhbWVEaXNwbGF5VHlwZSA9IGdsR2FtZS5nYW1lbGlzdGNmZy5nZXQoXCJnYW1lRGlzcGxheVR5cGVcIik7XHJcbiAgICAgICAgbGV0IGdhbWVEaXNwbGF5VG9rZW4gPSBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0KFwiZ2FtZURpc3BsYXlUb2tlblwiKTtcclxuXHJcbiAgICAgICAgLy8g6I635Y+W5a+55bqU55qE5pWw5o2u5YiX6KGoXHJcbiAgICAgICAgbGV0IHRva2VuID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZ2FtZXRva2VuXCIpO1xyXG4gICAgICAgIGlmIChnYW1lRGlzcGxheVRva2VuICE9IHRva2VuICYmIGdhbWVEaXNwbGF5VHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2VudGVyX3NvcnQgPT09PiDku47nvZHnu5zojrflj5ZcIik7XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSB7IFwidHlwZVwiOiBnYW1lRGlzcGxheVR5cGUgfVxyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcucmVxR2FtZXNMaXN0KG1zZywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lc0xpc3QgPSBnbEdhbWUuZ2FtZWxpc3RjZmcuZ2V0KFwiZ2FtZXNMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ2FtZXRva2VuXCIsIGdhbWVEaXNwbGF5VG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbShcImdhbWVkYXRhXCIsIHRoaXMuZ2FtZXNMaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlckZhY2VNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNlbnRlcl9zb3J0ID09PT4g5pyJ5YiG57G75bGV56S6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZWdSb3VwKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2VudGVyX3NvcnQgPT09PiDml6DliIbnsbvlsZXnpLpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2VudGVyX3NvcnQgPT09PiDku47mnKzlnLDojrflj5ZcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZXNMaXN0ID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShcImdhbWVkYXRhXCIpO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcuc2VsZkdhbWVMaXN0KHRoaXMuZ2FtZXNMaXN0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJGYWNlTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNlbnRlcl9zb3J0ID09PT4g5pyJ5YiG57G75bGV56S6XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lZ1JvdXAoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2VudGVyX3NvcnQgPT09PiDml6DliIbnsbvlsZXnpLpcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIneWni+aXoOWIhuexu+aVsOaNrlxyXG4gICAgaW5pdERhdGEoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJGYWNlTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBnYW1lTGlzdEFycmF5ID0gT2JqZWN0LnZhbHVlcyh0aGlzLmdhbWVzTGlzdClcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSA1KVxyXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IE9iamVjdC52YWx1ZXMoaXRlbS5nYW1lTGlzdCkpXHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICAgICAgZ2FtZUxpc3RBcnJheS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpdGVtLmlkXSA9IGl0ZW1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVzTGlzdFtcIl8wXCJdID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZXNMaXN0W1wiXzBcIl0uaWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVzTGlzdFtcIl8wXCJdLm5hbWUgPSBcIuWFqOmDqOa4uOaIj1wiXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZXNMaXN0W1wiXzBcIl0uZ2FtZUxpc3QgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR5cGVJbmRleCA9PSBcIl81XCIgPyB0aGlzLmluaXRSb29tTGlzdCgpIDogdGhpcy5pbml0TGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/orr7nva7mmL7npLrnmoTliIbnu4RcclxuICAgIHNldEdhbWVnUm91cCgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZURpc3BsYXlUeXBlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLmdhbWVEaXNwbGF5VHlwZUxpc3RbaV0uaWQ7XHJcbiAgICAgICAgICAgIGxldCBwbGF0Zm9ybV9ub2RlID0gdGhpcy5nYW1lZ3JvdXAuZ2V0Q2hpbGRCeU5hbWUoZ3JvdXBJZFtpZF0pO1xyXG4gICAgICAgICAgICBwbGF0Zm9ybV9ub2RlLnpJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIHBsYXRmb3JtX25vZGUudHlwZUluZGV4ID0gYF8ke2lkfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlSW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlSW5kZXggPSBgXyR7aWR9YDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lVGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBtX3RvZ2dsZSA9IHBsYXRmb3JtX25vZGUuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobV90b2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjZW50ZXJfc29ydCA9PT0+IHRoaXMudHlwZUluZGV45Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZUluZGV4ID09IFwiXzVcIiA/IHRoaXMuaW5pdFJvb21MaXN0KCkgOiB0aGlzLmluaXRMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtX3RvZ2dsZS5jaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInNldHBsYXphYmdcIiwgeyBuYW1lOiBncm91cElkW2lkXSwgd2lkdGg6IHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCB9KTsvL+abtOaNouWkp+WOheiDjOaZr+WbvlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZUluZGV4ID09IGBfJHtpZH1gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1fdG9nZ2xlID0gcGxhdGZvcm1fbm9kZS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobV90b2dnbGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2VudGVyX3NvcnQgPT09PiB0aGlzLnR5cGVJbmRleOS4jeS4uuepulwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlSW5kZXggPT0gXCJfNVwiID8gdGhpcy5pbml0Um9vbUxpc3QoKSA6IHRoaXMuaW5pdExpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbV90b2dnbGUuY2hlY2soKTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwic2V0cGxhemFiZ1wiLCB7IG5hbWU6IGdyb3VwSWRbaWRdLCB3aWR0aDogdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoIH0pOy8v5pu05o2i5aSn5Y6F6IOM5pmv5Zu+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxhdGZvcm1fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjZW50ZXJfc29ydCA9PT0+IOeCueWHu+aMiemSrlwiLCBuYW1lLCBub2RlKVxyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaG90XCI6IGNhc2UgXCJjaGVzc0NhcmRcIjogY2FzZSBcImFyY2FkZVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZmlzaGluZ1wiOiBjYXNlIFwicmVhbFBlcnNvblwiOiBjYXNlIFwic3BvcnRzXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJsb3R0ZXJ5XCI6IGNhc2UgXCJjb21wZXRlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaEludGVyZmFjZShuYW1lLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicm9vbVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hSb29tKG5hbWUsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRW5hYmxlSG90VXBkYXRlKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoXCJfXCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi/m+WFpeS4ieaWuea4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZl9nYW1lX2xpc3QgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0uZ2FtZUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2xHYW1lLmVtaXR0ZXIuZW1pdChNRVNTQUdFLlVJLldFQlZJRVdfT04sIHsgZ2FtZXNMaXN0OiBzZl9nYW1lX2xpc3RbbmFtZV0sIHR5cGU6IDEgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS5nYW1lbGlzdGNmZy5vcGVuVHJpcGFydGl0ZUdhbWUoeyBnYW1lc0xpc3Q6IHNmX2dhbWVfbGlzdFtuYW1lXSwgdHlwZTogMSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5ri45oiP5YiG57G75YiH5o2iXHJcbiAgICBzd2l0Y2hJbnRlcmZhY2UobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmJhbm5lcikgdGhpcy5iYW5uZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5yb29tSW50ZXJmYWNlKSB0aGlzLnJvb21JbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbGxJbnRlcmZhY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyDorr7nva7liIbpobVpZFxyXG4gICAgICAgIHRoaXMudHlwZUluZGV4ID0gbm9kZS50eXBlSW5kZXg7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInNldHBsYXphYmdcIiwgeyBuYW1lOiBuYW1lLCB3aWR0aDogdGhpcy5nYW1lZ3JvdXBWaWV3LndpZHRoIH0pOy8v5pu05o2i5aSn5Y6F6IOM5pmv5Zu+XHJcbiAgICAgICAgdGhpcy5pbml0TGlzdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDov5vlhaXliJvlu7rmiL/pl7TliIfmjaJcclxuICAgIHN3aXRjaFJvb20obmFtZSwgbm9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmJhbm5lcikgdGhpcy5iYW5uZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbGxJbnRlcmZhY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g6K6+572u5YiG6aG1aWRcclxuICAgICAgICB0aGlzLnR5cGVJbmRleCA9IG5vZGUudHlwZUluZGV4O1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJzZXRwbGF6YWJnXCIsIHsgbmFtZTogbmFtZSwgd2lkdGg6IHRoaXMuZ2FtZWdyb3VwVmlldy53aWR0aCB9KTsvL+abtOaNouWkp+WOheiDjOaZr+WbvlxyXG4gICAgICAgIHRoaXMuaW5pdFJvb21MaXN0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5qC55o2uaW5kZXjnlJ/miJDnm7jlupTmuLjmiI/liJfooahcclxuICAgIGluaXRMaXN0KCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUaW1lID0gMC4yNSwgICAvL+Wbvuagh+enu+WKqOaXtumXtFxyXG4gICAgICAgICAgICBldmVyeVRpbWUgPSAwLjA1LCAgICAvL+Wbvuagh+enu+WKqOmXtOmalOaXtumXtFxyXG4gICAgICAgICAgICBkaXN0YW5jZSA9IDMwLCAgICAgICAvL+Wbvuagh+W8ueWKqOi3neemu1xyXG4gICAgICAgICAgICBkaXN0YW5jZVRpbWUgPSAwLjE7ICAvL+Wbvuagh+W8ueWKqOaXtumXtFxyXG5cclxuICAgICAgICBsZXQgdGVtcFggPSA5LC8v5Zu+5qCH5LmL6Ze055qE6Ze06ZqUXHJcbiAgICAgICAgICAgIGdhbWVpdGVtV2lkdGggPSAzMjc7Ly9pdGVt5aSn5bCPXHJcblxyXG4gICAgICAgIGxldCBnYW1lR3JvdXAgPSB0aGlzLmdhbWVzTGlzdFt0aGlzLnR5cGVJbmRleF0uZ2FtZUxpc3Q7XHJcblxyXG4gICAgICAgIC8vIOWxj+iUvXdlYueJiOe9kemhtea4uOaIj1xyXG4gICAgICAgIGxldCBnYW1lX2xpc3QgPSBbXTtcclxuICAgICAgICBPYmplY3QudmFsdWVzKGdhbWVHcm91cCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpc0VuYWJsZUhvdFVwZGF0ZSAmJiBpdGVtLmlkID4gOTk5OSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBnYW1lX2xpc3QucHVzaChpdGVtKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOiOt+WPlumcgOimgeWxleekuuiKgueCueeahOS9jee9rlxyXG4gICAgICAgIGxldCBwb3NBcnIgPSB0aGlzLmdldFBvc0FycihnYW1lX2xpc3QpO1xyXG5cclxuICAgICAgICB0aGlzLmFsbEludGVyZmFjZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc3RvcEF1dG9TY3JvbGwoKTtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuYWxsSW50ZXJmYWNlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKTtcclxuICAgICAgICB2aWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIGxldCB2aWV3V2lkdGggPSB2aWV3LndpZHRoO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdmlldy5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgY29udGVudC54ID0gMDtcclxuXHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIoZ2xHYW1lLnBhbmVsLnBsYXphUGFuZWxEaWN0W1wiZ2FtZWl0ZW1cIl0pLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgbGV0IGdhbWVfbGVuZ3RoID0gMDsgLy/nu5/orqHlsZXnpLrmuLjmiI/nmoTmlbDph49cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBnYW1lX2xpc3RbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICAvLyDkuInmlrnmuLjmiI/nmoTlpITnkIZcclxuICAgICAgICAgICAgICAgIGlmIChpZCA+IDk5OTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UHJlZmFiID0gY2MuaW5zdGFudGlhdGUodGhpcy5idG5XZWJHYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcmVmYWIucGFyZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcmVmYWIubmFtZSA9IFwiX1wiICsgaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJlZmFiLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5ri45oiP5ZCN56ewXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJlZmFiLmdldENoaWxkQnlOYW1lKFwiZ2FtZV9uYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZ2FtZV9saXN0W2ldLmdhbWVOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruinkuagh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lX2xpc3RbaV0udGFnID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyTWFyayA9IG5ld1ByZWZhYi5nZXRDaGlsZEJ5TmFtZShcImNvcm5lck1hcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJfbWFyayA9IHRoaXMuYXRsYXNfY29ybmVyX21hcmsuZ2V0U3ByaXRlRnJhbWUoYGltZ19jb3JuZXJfbWFyayR7Z2FtZV9saXN0W2ldLnRhZ31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyTWFyay5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvcm5lcl9tYXJrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJNYXJrLmdldENoaWxkQnlOYW1lKFwidHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ09STkVSX01BUktbZ2FtZV9saXN0W2ldLnRhZ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lck1hcmsuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5ri45oiP5Zu+5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVfbGlzdFtpXS5pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBnbEdhbWUudXNlci5nZXQoJ3VybCcpLnJlc291cmNlX3VybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZW1vdGVJbWFnZShuZXdQcmVmYWIuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lX2ljb25cIiksIHVybCArIGdhbWVfbGlzdFtpXS5pY29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbGVuZ3RoKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOiHquW3seeahOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwucGFyZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5wb3NpdGlvbiA9IGNjLnYyKDAsIGNjLndpblNpemUuaGVpZ2h0ICsgcGFuZWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkucmVzZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLmluaXRVSShnYW1lX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLm5hbWUgPSBgJHtpZH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbGVuZ3RoKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v6K6+572uc2Nyb2xsdmlldy53aWR0aFxyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmNlaWwoZ2FtZV9sZW5ndGggLyAyKSAqIChnYW1laXRlbVdpZHRoICsgdGVtcFgpO1xyXG4gICAgICAgICAgICBjb250ZW50LndpZHRoID0gd2lkdGggPCB2aWV3V2lkdGggPyB2aWV3V2lkdGggOiB3aWR0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0VGltZVRhZykge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat56ys5LiA5qyh5LiN5omn6KGMXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0VGltZVRhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jaGlsZHJlbltpXS5wb3NpdGlvbiA9IHBvc0FycltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOaJp+ihjOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjb250ZW50LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucG9zaXRpb24gPSBjYy52Mihwb3NBcnJbaV0ueCArIHZpZXdXaWR0aCwgcG9zQXJyW2ldLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oc2Nyb2xsVGltZSArIGV2ZXJ5VGltZSAqIGksIHBvc0FycltpXS54IC0gZGlzdGFuY2UsIHBvc0FycltpXS55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKGRpc3RhbmNlVGltZSwgcG9zQXJyW2ldKSxcclxuICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2F0ZWdvcnlEYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635b6X5bGV56S66IqC54K555qE5L2N572uXHJcbiAgICBnZXRQb3NBcnIobGlzdCkge1xyXG4gICAgICAgIGxldCBwb3NYID0gMTY0LCBwb3NZID0gWzEzMCwgLTE4MF0sIHBvc0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBpICUgMjtcclxuICAgICAgICAgICAgcG9zQXJyLnB1c2goY2MudjIoaW5kZXggPT0gMCAmJiBpICE9IDAgPyBwb3NYICs9IDMzNiA6IHBvc1gsIHBvc1lbaW5kZXhdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5omA6ZyA6KaB55qE5L2N572u5YiX6KGoXCIsIHBvc0FycilcclxuICAgICAgICByZXR1cm4gcG9zQXJyO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0Um9vbUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVzTGlzdCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCByb29tX2dhbWVHcm91cCA9IHRoaXMuZ2FtZXNMaXN0W3RoaXMudHlwZUluZGV4XTtcclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyb29tX2ZpZWxkXCIpXHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb21JbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yb29tSW50ZXJmYWNlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfcm9vbV9maWVsZCk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUludGVyZmFjZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbUludGVyZmFjZS5wb3NpdGlvbiA9IGNjLnYyKGNjLndpblNpemUud2lkdGggLyAyLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5yb29tSW50ZXJmYWNlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJvb21JbnRlcmZhY2UuZ2V0Q29tcG9uZW50KHRoaXMucm9vbUludGVyZmFjZS5uYW1lKS5pbml0RGF0YShyb29tX2dhbWVHcm91cCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2F0ZWdvcnlEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdFRpbWVUYWcgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u546w5Zyo5Zyo6YKj5Liq5YiG57G7XHJcbiAgICBzZXRDYXRlZ29yeURhdGEoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjZW50ZXJfc29ydCA9PT0+IOiuvue9rueOsOWcqOWcqOmCo+S4quWIhuexu1wiLCB0aGlzLnR5cGVJbmRleClcclxuICAgICAgICBnbEdhbWUuaXNDYXRlZ29yeURhdGEudHlwZUluZGV4ID0gdGhpcy50eXBlSW5kZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuXHJcbiAgICB9LFxyXG59KTtcclxuIl19

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/announcement/announce.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9432bUaN5DxbxikLYl/qfX', 'announce');
// modules/plaza/script/prefab/announcement/announce.js

"use strict";

var DIMAND = 2;
var COIN = 1;
glGame.baseclass.extend({
  properties: {
    firstView: cc.Node,
    firstItem: cc.Node,
    secondView: cc.Node,
    secondItem: cc.Node,
    detailView1: cc.Node,
    node_detailView1: cc.Node,
    // layout为1时显示
    detailView2: cc.Node,
    //layout为2时显示
    rewardBar1: cc.Node,
    rewardBar2: cc.Node,
    rewardBarother: cc.Node,
    imageItem: cc.Node,
    contentItem: cc.Node,
    iconArr: [cc.SpriteFrame],
    activityArr: [cc.SpriteFrame],
    cycleTypeArr: [cc.SpriteFrame],
    detailwindow: cc.Prefab,
    conditionItem: cc.Node,
    btn_allreward: cc.Button,
    LabelItem: cc.Node,
    //以下为表格生成用到
    barItem: cc.Node,
    lineItem: cc.Node,
    wordItem: cc.Node,
    formView: cc.Node,
    downPage: cc.Node,
    upPage: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    console.log("这是当前的钻石开关", glGame.user.get("roomSwitch"));
    glGame.emitter.on("ReqRedDot", this.initReddot, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.announceActionEnd, this);
    this.cacheData = {};
  },
  announceActionEnd: function announceActionEnd() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqNotice", {}, function (route, msg) {
      _this.btn_allreward.node.active = true;
      _this.notices = msg.notices;

      _this.reqFirstTitle();

      _this.getAllrewardState(); // if (!glGame.user.isTourist()) {
      //     let data = glGame.user.get('redDotData');
      //     this.btn_allreward.interactable = data['discountReq'].length != 0;
      // } else {
      //     this.btn_allreward.interactable = false
      // }

    });
  },
  //拉取当前一键领取状态
  getAllrewardState: function getAllrewardState() {
    var _this2 = this;

    glGame.gameNet.send_msg("http.ReqDiscountsReceiveAllState", {}, function (route, msg) {
      _this2.btn_allreward.interactable = msg.state != 0;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.close();
        break;

      case "btn_allReceive":
        this.allreward();
        break;

      case "notice":
        this.noticeShow(node);
        break;

      case "firstItem":
        this.switchFirst(name, node);
        break;

      case "secondItem":
        this.switchSecond(name, node);
        break;

      case "btn_goGetCoin":
        this.goGetCoin(node);
        break;

      case "btn_reward":
        this.reward(node);
        break;

      case "btn_activityDetail":
        this.activityDetail();
        break;

      case "upPage":
        this.onUpPage();
        break;

      case "downPage":
        this.onDownPage();
        break;

      default:
        console.log(" btn name: ", name);
        break;
    }
  },
  // 1 活动时间// 2 活动对象// 3 活动介绍// 4活动表格// 5 活动细则// 6 活动规则与条款
  //更新详细信息
  updateDetailView1: function updateDetailView1(data) {
    var _this3 = this;

    this.node_detailView1.active = true;
    this.detailView2.active = false;
    this.detailView1.destroyAllChildren();
    this.detailView1.removeAllChildren();

    if (data.activitypic && data.activitypic != "") {
      var imageItem = cc.instantiate(this.imageItem);
      imageItem.parent = this.detailView1;
      glGame.panel.showRemoteImage(imageItem, data.activitypic);
      imageItem.active = true;
    }

    for (var i = 0; i < data.titledetail.length; i++) {
      if (data.titledetail[i].id == 5 || data.titledetail[i].id == 6) continue;

      if (data.titledetail[i].type == 4 && data.titledetail[i].img && data.titledetail[i].img != "") {
        var _ret = function () {
          var imageItem = cc.instantiate(_this3.imageItem);
          glGame.panel.showRemoteImage(imageItem, data.titledetail[i].img).then(function () {
            console.log("加载成功");

            if (imageItem.width > 1200) {
              imageItem.height = imageItem.height * 1200 / imageItem.width;
              imageItem.width = 1200;
            }
          });
          imageItem.parent = _this3.detailView1;
          imageItem.active = false;
          return "continue";
        }();

        if (_ret === "continue") continue;
      } else if (data.titledetail[i].img == "") {
        continue;
      }

      if (data.titledetail[i].id === 4) {
        this.initform(data.titledetail[i].content);
        continue;
      }

      var contentItem = cc.instantiate(this.contentItem);
      contentItem.parent = this.detailView1;
      contentItem.active = false;
      contentItem.getChildByName("Tip").getComponent(cc.Label).string = data.titledetail[i].title + "：";
      contentItem.getChildByName("img_icon").getComponent(cc.Sprite).spriteFrame = this.iconArr[data.titledetail[i].icon];

      if (data.titledetail[i].id == 3) {
        contentItem.getChildByName("content2").active = true;
        contentItem.getChildByName("content2").getComponent(cc.Label).string = data.titledetail[i].content;

        if (data.titledetail[i].content.length == 0) {
          contentItem.getChildByName("content2").active = false;
        }
      } else {
        contentItem.getChildByName("content1").active = true;
        contentItem.getChildByName("content1").getComponent(cc.Label).string = data.titledetail[i].content;
      }
    }

    glGame.panel.showEffectNode(this, this.detailView1, 0.02, true);
    this.updateRewardBar(data, this.rewardBar1, this.detailView1, 1);
  },
  //更新领取奖励条
  updateRewardBar: function updateRewardBar(data, BarType, parent, type) {
    var rewardItem = data.rewardItem;
    if (!rewardItem) return;

    if (rewardItem.length) {
      var sumCoin = 0;
      var sumDiamond = 0;

      for (var i = 0; i < rewardItem.length; i++) {
        var rewardBar = cc.instantiate(BarType);
        rewardBar.parent = parent;
        rewardBar.active = false;
        rewardBar.name = "".concat(i);
        var rewardTypeCount = 0;

        if (type != 2) {
          if (rewardBar.getChildByName("lab_accumulate")) {
            rewardBar.getChildByName("lab_accumulate").getComponent(cc.Label).string = rewardItem[i].getStr;
          }
        }

        var minValue = 0;

        if (type != 2) {
          minValue = -1;
        }

        var coinpic = rewardBar.getChildByName("rewardLayout").getChildByName("coinpic");
        var dimandpic = rewardBar.getChildByName("rewardLayout").getChildByName("dimandpic"); //这是金币的显示部分

        if (rewardItem[i].reward.coin > 0 && Number(rewardItem[i].reward.coin) > 0) {
          coinpic.active = true;
          rewardTypeCount++;
          sumCoin += Number(rewardItem[i].reward.coin);
          coinpic.getChildByName("lab_rewardNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.coin);
        }

        if (rewardItem[i].reward.coin == 0) {
          for (var k = 0; k < rewardItem[i].rewardType.length; k++) {
            if (rewardItem[i].rewardType[k] == COIN && Number(rewardItem[i].reward.coin) > minValue) {
              coinpic.active = true;
              coinpic.getChildByName("lab_rewardNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.coin);
              break;
            }
          }
        }

        console.log("这是当前的钻石显示", glGame.user.get("roomSwitch"), rewardItem[i].reward.diamond); //这部分是钻石的显示

        if (rewardItem[i].reward.diamond > 0 && glGame.user.get("roomSwitch") == 1) {
          dimandpic.active = true;
          rewardTypeCount++;
          sumDiamond += rewardItem[i].reward.diamond;
          dimandpic.getChildByName("lab_diamondNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.diamond);
        }

        if (rewardItem[i].reward.diamond == 0 && glGame.user.get("roomSwitch") == 1) {
          for (var _k = 0; _k < rewardItem[i].rewardType.length; _k++) {
            if (rewardItem[i].rewardType[_k] == DIMAND && Number(rewardItem[i].reward.diamond) > minValue) {
              dimandpic.active = true;
              dimandpic.getChildByName("lab_diamondNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.diamond);
              break;
            }
          }
        }

        rewardBar.getChildByName("btn_reward").active = rewardItem[i].state == 0;

        if (rewardItem[i].state == 0) {
          //this.btn_allreward.interactable = true;
          this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
        }

        rewardBar.getChildByName("btn_goGetCoin").active = rewardItem[i].state == 2;
        rewardBar.getChildByName("Receiveed").active = rewardItem[i].state == 1;
        rewardBar.getChildByName("auditing").active = rewardItem[i].state == 4;
        rewardBar.getChildByName("refuse").active = rewardItem[i].state == 5;

        if (rewardItem[i].state == -1 && data.cycleType) {
          rewardBar.getChildByName("ReceiveType").active = true;
          rewardBar.getChildByName("ReceiveType").getComponent(cc.Sprite).spriteFrame = this.cycleTypeArr[data.cycleType];
        } else {
          rewardBar.getChildByName("ReceiveType").active = false;
        } // rewardBar.getChildByName("ReceiveType").active = rewardItem[i].state == -1;
        // if (rewardItem[i].schedule[1] == 4) {
        //     rewardBar.getChildByName("ReceiveType").getComponent(cc.Label).string = rewardItem[i].schedule[4]
        // }


        if (rewardItem[i].rewardWords) {
          var rewardicon = rewardBar.getChildByName("rewardTips");
          rewardicon.getComponent(cc.Label).string = rewardItem[i].rewardWords + "：";
        }

        rewardBar.getChildByName("btn_goGetCoin").y = 4.24;
        rewardBar.getChildByName("btn_reward").y = 4.24;

        if (rewardItem[i].state == 0) {
          rewardBar.getChildByName("btn_reward").y = -20;
          rewardBar.getChildByName("btn_goGetCoin").y = -20;
          rewardBar.getChildByName("des_shcedule").active = true;
          rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = "已完成";
          continue;
        } else if (rewardItem[i].state != 2) {
          rewardBar.getChildByName("des_shcedule").active = false;
          continue;
        }

        var schedule = Number(rewardItem[i].schedule[1]);

        switch (schedule) {
          case 1:
            if (Number(rewardItem[i].schedule[3]) == -1) {
              rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4] + " ".concat(this.getFloat(rewardItem[i].schedule[2]), "</c>");
            } else {
              rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4] + " ".concat(this.getFloat(rewardItem[i].schedule[2]), "</c>/").concat(this.getFloat(rewardItem[i].schedule[3]));
            }

            rewardBar.getChildByName("des_shcedule").active = true;
            rewardBar.getChildByName("btn_reward").y = -20;
            rewardBar.getChildByName("btn_goGetCoin").y = -20;
            break;

          case 2:
            rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4];
            rewardBar.getChildByName("des_shcedule").active = true;
            rewardBar.getChildByName("btn_reward").y = -20;
            rewardBar.getChildByName("btn_goGetCoin").y = -20;
            break;

          case 3:
            rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4] + "  ".concat(rewardItem[i].schedule[2], "/").concat(rewardItem[i].schedule[3]);
            rewardBar.getChildByName("des_shcedule").active = true;
            rewardBar.getChildByName("btn_reward").y = -20;
            rewardBar.getChildByName("btn_goGetCoin").y = -20;
            break;
        }

        if (type == 2) {
          var lab_accumulate = rewardBar.getChildByName("rewardLayout").getChildByName("lab_accumulate");

          if (lab_accumulate) {
            if (rewardTypeCount == 1) {
              var str = "";

              if (coinpic.active) {
                str = "(\u7D2F\u8BA1\u5956\u52B1".concat(this.getFloat(sumCoin), "\u91D1\u5E01)");
              } else {
                str = "(\u7D2F\u8BA1\u5956\u52B1".concat(this.getFloat(sumDiamond), "\u94BB\u77F3)");
              }

              lab_accumulate.active = true;
              lab_accumulate.getComponent(cc.Label).string = str;
            } else if (rewardTypeCount == 0) {
              lab_accumulate.active = true;
              lab_accumulate.getComponent(cc.Label).string = rewardItem[i].getStr;
            }
          }
        }
      }

      glGame.panel.showEffectNode(this, parent, 0.02, true);
    } else {
      var rewardBarother = cc.instantiate(this.rewardBarother);
      rewardBarother.parent = parent;
      rewardBarother.active = true;
      rewardBarother.name = "registerbonus";
      rewardBarother.getChildByName("des_tip").getComponent(cc.Label).string = rewardItem.getStr + "：";
      rewardBarother.getChildByName("btn_reward").active = rewardItem.state == 0;
      rewardBarother.getChildByName("btn_goGetCoin").active = rewardItem.state == 2;
      rewardBarother.getChildByName("Receiveed").active = rewardItem.state == 1;
      rewardBarother.getChildByName("auditing").active = rewardItem.state == 4;
      rewardBarother.getChildByName("refuse").active = rewardItem.state == 5;
      var lab_rewardNum = rewardBarother.getChildByName("rewardLayout").getChildByName("lab_rewardNum");
      var lab_diamondNum = rewardBarother.getChildByName("rewardLayout").getChildByName("lab_diamondNum"); // //这是金币的显示部分
      // if (rewardItem.reward.coin > 0 && Number(rewardItem.reward.coin) > 0) {
      //     lab_rewardNum.active = true;
      //     lab_rewardNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.coin);
      // }
      // if (rewardItem.reward.coin == 0) {
      // }

      for (var _k2 = 0; _k2 < rewardItem.rewardType.length; _k2++) {
        if (rewardItem.rewardType[_k2] == COIN && Number(rewardItem.reward.coin) != undefined) {
          lab_rewardNum.active = true;
          lab_rewardNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.coin);
          break;
        }
      }

      for (var _k3 = 0; _k3 < rewardItem.rewardType.length; _k3++) {
        if (rewardItem.rewardType[_k3] == DIMAND && glGame.user.get("roomSwitch") == 1 && Number(rewardItem.reward.diamond) != undefined) {
          lab_diamondNum.active = true;
          lab_diamondNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.diamond);
          break;
        }
      } // //这部分是钻石的显示
      // if (Number(rewardItem.reward.diamond) > 0 && glGame.user.get("roomSwitch") == 1) {
      //     lab_diamondNum.active = true;
      //     lab_diamondNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.diamond);
      // }
      // if (Number(rewardItem.reward.diamond) == 0 && glGame.user.get("roomSwitch") == 1) {
      // }


      if (rewardItem.state == 0) {
        //this.btn_allreward.interactable = true;
        this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
      }

      var conditional = data.conditional,
          curSchdule = 0;

      for (var _i = 0; _i < conditional.length; _i++) {
        var conditionItem = cc.instantiate(this.conditionItem);
        conditionItem.getComponent(cc.Label).string = conditional[_i].content;

        if (conditional[_i].state == 1) {
          curSchdule++;
          conditionItem.getChildByName("gou").active = true;
        }

        conditionItem.color = conditional[_i].state == 1 ? cc.color(38, 218, 18) : cc.color(255, 71, 71);
        conditionItem.parent = rewardBarother.getChildByName("content");
        conditionItem.active = false;
      }

      rewardBarother.getChildByName("des_shcedule").getComponent(cc.Label).string = rewardItem.state == 0 ? "已完成" : "\u8FDB\u5EA6".concat(curSchdule, "/").concat(conditional.length);
      glGame.panel.showEffectNode(this, rewardBarother.getChildByName("content"), 0.02, true);
    }
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  //生成表格
  initform: function initform(data) {
    var formView = cc.instantiate(this.formView);
    formView.parent = this.detailView1;
    formView.active = true;
    formView.height = 100 + (data.length - 1) * 50;

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        var wordItem = cc.instantiate(this.wordItem);
        wordItem.parent = formView;
        wordItem.getComponent(cc.RichText).string = data[i][j].replace("<br>", ",");
        wordItem.active = true;
      }
    }

    var total = 0;
    var lengthBest = data[0].length;

    for (var _i2 = lengthBest; _i2 >= 1; _i2--) {
      total += formView.children[formView.childrenCount - _i2].width;
    }

    var distance = (formView.width - total) / (data[0].length + 1);
    total = 0;
    var distanceArr = [];

    for (var _i3 = lengthBest; _i3 >= 1; _i3--) {
      total += formView.children[formView.childrenCount - _i3].width + distance;
      distanceArr.push(total);
    }

    var Count = 1;
    var Posy = -50;

    for (var _i4 = 0; _i4 < data.length; _i4++) {
      for (var _j = 0; _j < data[_i4].length; _j++) {
        formView.children[Count].x = _j == 0 ? distance : distance + distanceArr[_j - 1];
        formView.children[Count].y = Posy;

        if (_j == 1) {
          formView.children[Count].color = cc.color(246, 142, 30);
          formView.children[Count].getComponent(cc.RichText).string = formView.children[Count].getComponent(cc.RichText).string.replace("<br>", ",");
        }

        if (_j != 0) {
          var lineItem = cc.instantiate(this.lineItem);
          lineItem.parent = formView.getChildByName("bg");
          lineItem.y = -(formView.height / 2);
          lineItem.x = formView.children[Count].x - distance / 2;
          lineItem.height = formView.height - 20;
          lineItem.active = true;
          lineItem.zIndex = 100 + _j;
        }

        if (_i4 % 2 == 0) {
          var barItem = cc.instantiate(this.barItem);
          barItem.parent = formView.getChildByName("bg");
          barItem.active = true;
          barItem.y = Posy;
        }

        Count++;
      }

      Posy -= 50;
    }

    formView.active = false;
  },
  updateDetailView2: function updateDetailView2(data) {
    this.node_detailView1.active = false;
    this.detailView2.active = true;
    var content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
    content.destroyAllChildren();
    content.removeAllChildren();
    var lab_time = this.detailView2.getChildByName("lab_time");

    if (data.titledetail.length && data.titledetail[0].title == "活动时间") {
      lab_time.active = true;
      lab_time.getComponent(cc.Label).string = data.titledetail[0].content;
    } else {
      lab_time.active = false;
    }

    if (data.activitypic && data.activitypic != "") {
      glGame.panel.showRemoteImage(this.detailView2, data.activitypic);
    }

    this.updateRewardBar(data, this.rewardBar2, content, 2);
    console.log("这是当前的数据", data);
  },
  //请求详情内容
  reqActivitydetail: function reqActivitydetail(id, type) {
    var _this4 = this;

    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (this.cacheData[this.nowId][index].content) {
      this.nowIndex = index;

      if (this.cacheData[this.nowId][index].content.layout == 1) {
        this.updateDetailView1(this.cacheData[this.nowId][index].content);
      } else {
        this.updateDetailView2(this.cacheData[this.nowId][index].content);
      }

      this.updateCurSecond();
      console.log("这是详情的内容", this.cacheData[this.nowId][index].content);
      return;
    }

    glGame.gameNet.send_msg("http.reqDiscountsInfo", {
      id: id,
      type: type,
      color: "#F4C404"
    }, function (route, msg) {
      _this4.nowIndex = index;
      _this4.cacheData[_this4.nowId][index].content = msg;

      if (_this4.cacheData[_this4.nowId][index].content.layout == 1) {
        _this4.updateDetailView1(_this4.cacheData[_this4.nowId][index].content);
      } else {
        _this4.updateDetailView2(_this4.cacheData[_this4.nowId][index].content);
      }

      _this4.updateCurSecond();

      console.log("这是详情的内容", _this4.cacheData[_this4.nowId][index].content);
    });
  },
  //强制刷新红点
  forceRefreshRedPoint: function forceRefreshRedPoint() {
    var _this5 = this;

    glGame.user.ReqRedDot(); //强制刷新二级标题红点

    var id = this.nowId;
    glGame.gameNet.send_msg("http.reqDiscountsList", {
      category_id: id
    }, function (route, msg) {
      _this5.cacheData[id] = msg;
      var data = _this5.cacheData[id];

      for (var i = 0; i < data.length; i++) {
        var secondItem = _this5.secondView.children[i];
        secondItem.getChildByName("redmark").active = data[i].received_status == 1;
        secondItem.getChildByName("checkmark").active = i == _this5.nowIndex;
      }

      _this5.nowId = id;

      _this5.updateSecondTitle(_this5.cacheData[id]);

      if (_this5.cacheData[id].length != 0) {
        _this5.reqActivitydetail(_this5.cacheData[id][0].id, _this5.cacheData[id][0].type);
      } else {
        var content = _this5.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");

        content.destroyAllChildren();
        content.removeAllChildren();

        _this5.detailView1.destroyAllChildren();

        _this5.detailView1.removeAllChildren();
      }
    });
  },
  //请求当前的一级大标题
  reqFirstTitle: function reqFirstTitle() {
    var _this6 = this;

    glGame.gameNet.send_msg("http.reqDiscountsType", {}, function (route, msg) {
      _this6.firstTitleData = msg;

      _this6.updateFirstTitle();

      if (_this6.firstTitleData.length != 0) {
        _this6.reqSecondTitle(_this6.firstTitleData[0].id);
      } else {
        _this6.btn_allreward.node.active = false;

        if (_this6.notices && _this6.notices.length != 0) {
          _this6.onClick("notice", _this6.firstView.getChildByName("notice"));
        }
      }

      _this6.initReddot();
    });
  },
  initReddot: function initReddot() {
    var redDotData = glGame.user.get("redDotData").discountReq;

    for (var i = 0; i < this.firstView.childrenCount; i++) {
      this.firstView.children[i].children[0].getChildByName("redmark").active = false;
      this.firstView.children[i].children[1].getChildByName("redmark").active = false;
    }

    for (var key in redDotData) {
      for (var _i5 = 0; _i5 < this.firstView.childrenCount; _i5++) {
        if (redDotData[key].category_id == this.firstView.children[_i5].children[0].name) {
          this.firstView.children[_i5].children[0].getChildByName("redmark").active = true;
          this.firstView.children[_i5].children[1].getChildByName("redmark").active = true;
        }
      }
    }
  },
  //请求当前的二级标题
  reqSecondTitle: function reqSecondTitle(id) {
    var _this7 = this;

    console.log("这是当前传入的id", id);

    for (var key in this.cacheData) {
      if (key == id) {
        this.nowId = id;
        this.updateSecondTitle(this.cacheData[key]);

        if (this.cacheData[id].length != 0) {
          this.reqActivitydetail(this.cacheData[id][0].id, this.cacheData[id][0].type);
        } else {
          var content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
          content.destroyAllChildren();
          content.removeAllChildren();
          this.detailView1.destroyAllChildren();
          this.detailView1.removeAllChildren();
        }

        return;
      }
    }

    glGame.gameNet.send_msg("http.reqDiscountsList", {
      category_id: id
    }, function (route, msg) {
      _this7.cacheData[id] = msg;
      _this7.nowId = id;

      _this7.updateSecondTitle(_this7.cacheData[id]);

      if (_this7.cacheData[id].length != 0) {
        _this7.reqActivitydetail(_this7.cacheData[id][0].id, _this7.cacheData[id][0].type);
      } else {
        var _content = _this7.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");

        _content.destroyAllChildren();

        _content.removeAllChildren();

        _this7.detailView1.destroyAllChildren();

        _this7.detailView1.removeAllChildren();
      }
    });
  },
  //更新一级标题
  updateFirstTitle: function updateFirstTitle() {
    var interval = 15,
        itemHeight = 0;
    var firstViewNode = this.node.getChildByName("firstView");
    var view = firstViewNode.getChildByName("view");

    for (var i = 0; i < this.firstTitleData.length; i++) {
      var firstItem = cc.instantiate(this.firstItem);
      firstItem.parent = this.firstView;
      firstItem.getChildByName("Background").getChildByName("title").getComponent(cc.Label).string = this.firstTitleData[i].title;
      firstItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = this.firstTitleData[i].title;
      firstItem.getChildByName("Background").name = "".concat(this.firstTitleData[i].id);
      itemHeight = firstItem.height;
      firstItem.active = true;
    }

    if (this.notices.length != 0) {
      var _firstItem = cc.instantiate(this.firstItem);

      _firstItem.parent = this.firstView;
      _firstItem.getChildByName("Background").getChildByName("title").getComponent(cc.Label).string = "公告";
      _firstItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = "公告";
      _firstItem.name = "notice";
      itemHeight = _firstItem.height;
      _firstItem.active = true;
    }

    if (this.firstView.childrenCount == 0) {
      return;
    }

    this.firstView.height = this.firstView.childrenCount * (itemHeight + this.firstView.getComponent(cc.Layout).spacingY) + 10;

    if (this.firstView.height > view.height) {
      firstViewNode.getChildByName("downPage").active = true;
    }
  },
  //更新二级标题
  updateSecondTitle: function updateSecondTitle(data) {
    this.secondView.destroyAllChildren();
    this.secondView.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var secondItem = cc.instantiate(this.secondItem);
      secondItem.parent = this.secondView;
      secondItem.getChildByName("title").getComponent(cc.Label).string = data[i].discount_activity_title;
      secondItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = data[i].discount_activity_title;
      secondItem.getChildByName("tag").getComponent(cc.Sprite).spriteFrame = this.activityArr[data[i].tag];
      secondItem.getChildByName("redmark").active = data[i].received_status == 1;
      secondItem.children[0].name = "".concat(i);
      secondItem.active = true;
      secondItem.getChildByName("checkmark").active = i == 0;
    }
  },
  //点击按钮变化toggle有bug所以改用button
  updateClick: function updateClick(node) {
    node.getChildByName("checkmark").active = true;

    for (var i = 0; i < this.secondView.childrenCount; i++) {
      if (this.secondView.children[i].children[0].name != node.children[0].name) {
        this.secondView.children[i].getChildByName("checkmark").active = false;
      }
    }
  },
  //一级标题切换
  switchFirst: function switchFirst(name, node) {
    this.btn_allreward.node.active = true;
    this.unscheduleAllCallbacks();
    this.reqSecondTitle(node.children[0].name);
  },
  //滚动事件
  onScrollEvent: function onScrollEvent(scroll, event) {
    var view = this.firstView.parent;
    var content = this.firstView;
    var minY = 0;
    var maxY = content.height - view.height;

    if (content.y <= minY) {
      this.upPage.active = false;
    } else if (content.y >= maxY) {
      this.downPage.active = false;
    } else {
      this.downPage.active = true;
      this.upPage.active = true;
    }
  },
  // 上一页
  onUpPage: function onUpPage() {
    var view = this.firstView.parent;
    var content = this.firstView;
    var item = this.firstItem;
    var layout = content.getComponent(cc.Layout);
    var minY = 0;
    var maxY = content.height - view.height;

    if (content.y <= minY) {
      return;
    }

    var cellHeight = item.height + layout.spacingY;
    var offsetCount = (content.y - layout.paddingTop) / cellHeight;

    if (offsetCount - Math.floor(offsetCount) > 0.01) {
      offsetCount = Math.floor(offsetCount) - 1;
    } else {
      offsetCount = Math.floor(offsetCount) - 2;
    }

    var targetY = layout.paddingTop + offsetCount * cellHeight;

    if (targetY - minY < item.height) {
      targetY = minY - 1;
      this.upPage.active = false;
    }

    this.downPage.active = true;
    targetY = Math.max(targetY, minY);
    content.stopAllActions();
    content.runAction(cc.moveTo(0.2, cc.v2(0, targetY)));
  },
  // 下一页
  onDownPage: function onDownPage() {
    var view = this.firstView.parent;
    var content = this.firstView;
    var item = this.firstItem;
    var layout = content.getComponent(cc.Layout);
    var maxY = content.height - view.height;

    if (content.y >= maxY) {
      return;
    }

    var cellHeight = item.height + layout.spacingY;
    var offsetCount = (content.y + view.height - layout.paddingTop) / cellHeight;
    offsetCount = Math.max(offsetCount, 0);

    if (offsetCount - Math.floor(offsetCount) < 0.4) {
      offsetCount = Math.floor(offsetCount) + 2;
    } else {
      offsetCount = Math.ceil(offsetCount) + 1;
    }

    var targetY = layout.paddingTop + offsetCount * cellHeight - view.height;

    if (maxY - targetY < item.height) {
      targetY = maxY + 1;
      this.downPage.active = false;
    }

    this.upPage.active = true;
    targetY = Math.min(targetY, maxY);
    content.stopAllActions();
    content.runAction(cc.moveTo(0.2, cc.v2(0, targetY)));
  },
  noticeShow: function noticeShow(node) {
    var _this8 = this;

    if (this.notices) {
      this.updateNotice(this.notices);
    } else {
      glGame.gameNet.send_msg("http.reqNotice", {}, function (route, msg) {
        _this8.notices = msg.notices;

        _this8.updateNotice(_this8.notices);
      });
    }

    this.nowId = 6422;
    this.btn_allreward.node.active = false;
  },
  updateNotice: function updateNotice(data) {
    this.secondView.destroyAllChildren();
    this.secondView.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var secondItem = cc.instantiate(this.secondItem);
      secondItem.parent = this.secondView;
      secondItem.getChildByName("title").getComponent(cc.Label).string = data[i].title;
      secondItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = data[i].title;
      secondItem.getChildByName("tag").active = false;
      secondItem.children[0].name = "".concat(i);
      secondItem.active = true;
      secondItem.getChildByName("checkmark").active = i == 0;
    }

    this.node_detailView1.active = true;
    this.detailView2.active = false;
    this.detailView1.destroyAllChildren();
    this.detailView1.removeAllChildren();
    this.node_detailView1.getComponent(cc.ScrollView).stopAutoScroll();
    if (this.notices.length == 0) return; // 分帧显示公告

    this.showTextDelay(this.notices[0].content, this.LabelItem);
  },
  //获取索引
  getFirstIndex: function getFirstIndex(node) {
    for (var i = 0; i < this.firstView.childrenCount; i++) {
      if (this.firstView.children[i].children[0].name == node.children[0].name) {
        return i;
      }
    }
  },
  //二级级标题切换
  switchSecond: function switchSecond(name, node) {
    if (node.getChildByName("checkmark").active) return;
    this.updateClick(node);

    if (this.nowId == 6422) {
      this.node_detailView1.active = true;
      this.detailView2.active = false;
      this.detailView1.destroyAllChildren();
      this.detailView1.removeAllChildren();
      this.node_detailView1.getComponent(cc.ScrollView).stopAutoScroll(); // 分帧显示公告

      this.showTextDelay(this.notices[node.children[0].name].content, this.LabelItem);
      return;
    }

    var index = this.getSecondIndex(node);
    this.reqActivitydetail(this.cacheData[this.nowId][index].id, this.cacheData[this.nowId][index].type, index);
  },
  //获取索引
  getSecondIndex: function getSecondIndex(node) {
    for (var i = 0; i < this.secondView.childrenCount; i++) {
      if (this.secondView.children[i].children[0].name == node.children[0].name) {
        return i;
      }
    }
  },
  //去完成
  goGetCoin: function goGetCoin() {
    var type = this.cacheData[this.nowId][this.nowIndex].type;
    console.log("这是当前的类型", type);

    if (type == 2 || type == 3 || type == 6) {
      glGame.panel.showShop();
    } else if (type == 7) {
      glGame.user.isTourist() ? glGame.panel.showRegistration(true) : glGame.panel.showPanelByName("userinfo");
    } else if (type == 8) {
      glGame.user.isTourist() ? glGame.panel.showRegistration(true) : glGame.panel.showPanelByName("popularize");
      return;
    }

    this.remove();
    this.onClick("close");
  },
  //领取奖励
  reward: function reward(node) {
    var _this9 = this;

    var type = this.cacheData[this.nowId][this.nowIndex].type;
    var id = this.cacheData[this.nowId][this.nowIndex].id;
    var gradeid = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.id : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].id;
    var rewardCoin = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.reward.coin : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].reward.coin;
    var rewarddimand = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.reward.diamond : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].reward.diamond;
    glGame.gameNet.send_msg("http.ReqDiscountsReceive", {
      type: type,
      id: id,
      grade: gradeid
    }, function (route, msg) {
      var arr = [];
      if (rewardCoin) arr.push({
        type: glGame.awardtype.COIN,
        value: _this9.getFloat(rewardCoin)
      });
      if (glGame.user.get("roomSwitch") && rewarddimand) arr.push({
        type: glGame.awardtype.DIAMOND,
        value: _this9.getFloat(rewarddimand)
      });

      if (msg.data.type == 1) {
        glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_TIPS, arr);

        if (node.parent.name == "registerbonus") {
          _this9.cacheData[_this9.nowId][_this9.nowIndex].content.rewardItem.state = 1;
        } else {
          _this9.cacheData[_this9.nowId][_this9.nowIndex].content.rewardItem[node.parent.name].state = 1;
        }

        node.parent.getChildByName("Receiveed").active = true;
        node.parent.getChildByName("des_shcedule").active = false;
        if (node.parent.getChildByName("ReceiveType")) node.parent.getChildByName("ReceiveType").active = false;
        node.active = false;
      } else if (msg.data.type == 2) {
        glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.REVIEW_WAIT_TIPS, arr);

        if (node.parent.name == "registerbonus") {
          _this9.cacheData[_this9.nowId][_this9.nowIndex].content.rewardItem.state = 4;
        } else {
          _this9.cacheData[_this9.nowId][_this9.nowIndex].content.rewardItem[node.parent.name].state = 4;
        }

        node.parent.getChildByName("auditing").active = true;
        node.parent.getChildByName("des_shcedule").active = false;
        if (node.parent.getChildByName("ReceiveType")) node.parent.getChildByName("ReceiveType").active = false;
        node.active = false;
      }

      _this9.updateCurSecond();

      _this9.getAllrewardState();
    });
  },
  //刷新当前小类的红点
  updateCurSecond: function updateCurSecond() {
    if (!this.cacheData[this.nowId][this.nowIndex].content.rewardItem) return;

    if (!this.cacheData[this.nowId][this.nowIndex].content.rewardItem.length) {
      this.secondView.children[this.nowIndex].getChildByName("redmark").active = this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state == 0;
      this.cacheData[this.nowId][this.nowIndex].received_status = this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state == 0 ? 1 : 0;
    } else {
      var data = this.cacheData[this.nowId][this.nowIndex].content.rewardItem;
      var draw = false;

      for (var i = 0; i < data.length; i++) {
        if (data[i].state == 0) {
          draw = true;
          break;
        }
      }

      console.log("这是刷新当前红点信息的消息", draw);

      if (draw) {
        this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
        this.cacheData[this.nowId][this.nowIndex].received_status = 1;
      } else {
        this.secondView.children[this.nowIndex].getChildByName("redmark").active = false;
        this.cacheData[this.nowId][this.nowIndex].received_status = 0;
      }
    }

    this.updateFirstRed();
  },
  //刷新一级菜单红点
  updateFirstRed: function updateFirstRed() {
    var draw = false;

    for (var i = 0; i < this.cacheData[this.nowId].length; i++) {
      if (this.cacheData[this.nowId][i].received_status == 1) {
        draw = true;
        break;
      }
    }

    var index = this.getIndexById(this.nowId);
    console.log("这是刷新当前红点信息的消息111", this.cacheData, draw);
    this.firstView.children[index].children[0].getChildByName("redmark").active = draw;
    this.firstView.children[index].children[1].getChildByName("redmark").active = draw;
  },
  getIndexById: function getIndexById(id) {
    for (var i = 0; i < this.firstView.childrenCount; i++) {
      if (this.firstView.children[i].children[0].name == id) {
        return i;
      }
    }
  },
  //一键领取全部
  allreward: function allreward() {
    var _this10 = this;

    glGame.gameNet.send_msg("http.ReqDiscountsReceiveAll", {}, function (route, msg) {
      _this10.clearDetailData();

      _this10.reqActivitydetail(_this10.cacheData[_this10.nowId][_this10.nowIndex].id, _this10.cacheData[_this10.nowId][_this10.nowIndex].type, _this10.nowIndex);

      var arr = [];
      if (msg.data.coin) arr.push({
        type: glGame.awardtype.COIN,
        value: _this10.getFloat(msg.data.coin)
      });
      if (glGame.user.get("roomSwitch") && msg.data.diamond) arr.push({
        type: glGame.awardtype.DIAMOND,
        value: _this10.getFloat(msg.data.diamond)
      });

      if (msg.data.coin == 0 && msg.data.reviewNum != 0) {
        glGame.panel.showTip(glGame.tips.ANNOUNCE.REVIEW_TIPS.format(msg.data.reviewNum));
      } else if (msg.data.reviewNum == 0) {
        glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_TIPS, arr);
      } else if (msg.data.coin != 0 && msg.data.reviewNum != 0) {
        glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_REVIEW_TIPS.format(msg.data.reviewNum), arr);
      }

      console.log("这是全部领取的消息", msg);

      for (var i = 0; i < _this10.firstView.childrenCount; i++) {
        _this10.firstView.children[i].children[0].getChildByName("redmark").active = false;
        _this10.firstView.children[i].children[1].getChildByName("redmark").active = false;
      }

      for (var _i6 = 0; _i6 < _this10.secondView.childrenCount; _i6++) {
        _this10.secondView.children[_i6].getChildByName("redmark").active = false;
      } // 强制刷新红点


      _this10.forceRefreshRedPoint();
    });
  },
  //清除刷新之后的缓存数据
  clearDetailData: function clearDetailData() {
    for (var i in this.cacheData) {
      for (var j = 0; j < this.cacheData[i].length; j++) {
        if (this.cacheData[i][j].content) {
          delete this.cacheData[i][j].content;
        }

        this.cacheData[i][j].received_status = 0;
      }
    }

    console.log("这是当前的缓存数据", this.cacheData); //置灰一键领取

    this.btn_allreward.interactable = false;
  },
  //这是活动详情
  activityDetail: function activityDetail() {
    var detailwindow = glGame.panel.showPanel(this.detailwindow),
        script = detailwindow.getComponent("detailwindow");
    console.log("这是当前的数据", this.cacheData[this.nowId][this.nowIndex]);
    var titledetail = this.cacheData[this.nowId][this.nowIndex].content.titledetail;
    script.updateDetailView1(titledetail);
  },
  // 文本处理相关
  //////////////////////////////////////////////////
  showTextDelay: function showTextDelay(content, LabelItem) {
    var _this11 = this;

    LabelItem.active = true;
    var lbCom = LabelItem.getComponent(cc.Label);
    var assembler = lbCom._assembler;

    var assemblerData = assembler._getAssemblerData();

    var wrapText = this._calculateLabelFont(content, assemblerData.context, this._getFontDesc(lbCom), LabelItem.width);

    var index = 0;
    this.unscheduleAllCallbacks();
    this.schedule(function () {
      var txt = cc.instantiate(_this11.LabelItem); // txt.opacity = 0;
      // txt.runAction(cc.fadeIn(0.1));

      txt.getComponent(cc.Label).string = wrapText[index++];
      txt.parent = _this11.detailView1;
      txt.active = true;
    }, 0.01, wrapText.length - 1);
  },
  _getFontFamily: function _getFontFamily(comp) {
    if (!comp.useSystemFont) {
      if (comp.font) {
        if (comp.font._nativeAsset) return comp.font._nativeAsset;
        cc.loader.load(comp.font.nativeUrl, function (err, asset) {
          comp.font._nativeAsset = asset;
          comp.setVertsDirty();
        });
        return 'Arial';
      }

      return 'Arial';
    } else {
      return comp.fontFamily || 'Arial';
    }
  },
  _getFontDesc: function _getFontDesc(lb) {
    var fontDesc = lb.fontSize.toString() + 'px ';
    fontDesc += this._getFontFamily(lb);

    if (lb.enableBold) {
      fontDesc = "bold " + fontDesc;
    }

    if (lb.enableItalic) {
      fontDesc = "italic " + fontDesc;
    }

    return fontDesc;
  },
  _measureText: function _measureText(ctx, fontDesc) {
    return function (string) {
      return cc.textUtils.safeMeasureText(ctx, string, fontDesc);
    };
  },
  _calculateWrapText: function _calculateWrapText(context, fontDesc, paragraphedStrings, nodeWidth) {
    var _splitedStrings = [];
    var canvasWidthNoMargin = nodeWidth;

    for (var i = 0; i < paragraphedStrings.length; ++i) {
      var allWidth = cc.textUtils.safeMeasureText(context, paragraphedStrings[i], fontDesc);
      var textFragment = cc.textUtils.fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(context, fontDesc));
      _splitedStrings = _splitedStrings.concat(textFragment);
    }

    return _splitedStrings;
  },
  _calculateLabelFont: function _calculateLabelFont(txt, context, fontDesc, nodeWidth) {
    var paragraphedStrings = txt.split('\n');
    context.font = fontDesc;
    return this._calculateWrapText(context, fontDesc, paragraphedStrings, nodeWidth);
  },
  ////////////////////////////////////////////////////
  close: function close() {
    this.remove();
  },
  OnDestroy: function OnDestroy() {
    glGame.user.ReqRedDot();
    glGame.user.reqGetCoin();
    glGame.user.reqGetDiamond();
    glGame.emitter.off("ReqRedDot", this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxhbm5vdW5jZW1lbnRcXGFubm91bmNlLmpzIl0sIm5hbWVzIjpbIkRJTUFORCIsIkNPSU4iLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZmlyc3RWaWV3IiwiY2MiLCJOb2RlIiwiZmlyc3RJdGVtIiwic2Vjb25kVmlldyIsInNlY29uZEl0ZW0iLCJkZXRhaWxWaWV3MSIsIm5vZGVfZGV0YWlsVmlldzEiLCJkZXRhaWxWaWV3MiIsInJld2FyZEJhcjEiLCJyZXdhcmRCYXIyIiwicmV3YXJkQmFyb3RoZXIiLCJpbWFnZUl0ZW0iLCJjb250ZW50SXRlbSIsImljb25BcnIiLCJTcHJpdGVGcmFtZSIsImFjdGl2aXR5QXJyIiwiY3ljbGVUeXBlQXJyIiwiZGV0YWlsd2luZG93IiwiUHJlZmFiIiwiY29uZGl0aW9uSXRlbSIsImJ0bl9hbGxyZXdhcmQiLCJCdXR0b24iLCJMYWJlbEl0ZW0iLCJiYXJJdGVtIiwibGluZUl0ZW0iLCJ3b3JkSXRlbSIsImZvcm1WaWV3IiwiZG93blBhZ2UiLCJ1cFBhZ2UiLCJvbkxvYWQiLCJjb25zb2xlIiwibG9nIiwidXNlciIsImdldCIsImVtaXR0ZXIiLCJvbiIsImluaXRSZWRkb3QiLCJub2RlIiwibmFtZSIsIk1FU1NBR0UiLCJVSSIsIkFDVElPTl9FTkQiLCJhbm5vdW5jZUFjdGlvbkVuZCIsImNhY2hlRGF0YSIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJvdXRlIiwibXNnIiwiYWN0aXZlIiwibm90aWNlcyIsInJlcUZpcnN0VGl0bGUiLCJnZXRBbGxyZXdhcmRTdGF0ZSIsImludGVyYWN0YWJsZSIsInN0YXRlIiwib25DbGljayIsImNsb3NlIiwiYWxscmV3YXJkIiwibm90aWNlU2hvdyIsInN3aXRjaEZpcnN0Iiwic3dpdGNoU2Vjb25kIiwiZ29HZXRDb2luIiwicmV3YXJkIiwiYWN0aXZpdHlEZXRhaWwiLCJvblVwUGFnZSIsIm9uRG93blBhZ2UiLCJ1cGRhdGVEZXRhaWxWaWV3MSIsImRhdGEiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImFjdGl2aXR5cGljIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJwYW5lbCIsInNob3dSZW1vdGVJbWFnZSIsImkiLCJ0aXRsZWRldGFpbCIsImxlbmd0aCIsImlkIiwidHlwZSIsImltZyIsInRoZW4iLCJ3aWR0aCIsImhlaWdodCIsImluaXRmb3JtIiwiY29udGVudCIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ0aXRsZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiaWNvbiIsInNob3dFZmZlY3ROb2RlIiwidXBkYXRlUmV3YXJkQmFyIiwiQmFyVHlwZSIsInJld2FyZEl0ZW0iLCJzdW1Db2luIiwic3VtRGlhbW9uZCIsInJld2FyZEJhciIsInJld2FyZFR5cGVDb3VudCIsImdldFN0ciIsIm1pblZhbHVlIiwiY29pbnBpYyIsImRpbWFuZHBpYyIsImNvaW4iLCJOdW1iZXIiLCJnZXRGbG9hdCIsImsiLCJyZXdhcmRUeXBlIiwiZGlhbW9uZCIsImNoaWxkcmVuIiwibm93SW5kZXgiLCJjeWNsZVR5cGUiLCJyZXdhcmRXb3JkcyIsInJld2FyZGljb24iLCJ5IiwiUmljaFRleHQiLCJzY2hlZHVsZSIsImxhYl9hY2N1bXVsYXRlIiwic3RyIiwibGFiX3Jld2FyZE51bSIsImxhYl9kaWFtb25kTnVtIiwidW5kZWZpbmVkIiwiY29uZGl0aW9uYWwiLCJjdXJTY2hkdWxlIiwiY29sb3IiLCJ2YWx1ZSIsImRpdiIsInRvU3RyaW5nIiwiaiIsInJlcGxhY2UiLCJ0b3RhbCIsImxlbmd0aEJlc3QiLCJjaGlsZHJlbkNvdW50IiwiZGlzdGFuY2UiLCJkaXN0YW5jZUFyciIsInB1c2giLCJDb3VudCIsIlBvc3kiLCJ4IiwiekluZGV4IiwidXBkYXRlRGV0YWlsVmlldzIiLCJsYWJfdGltZSIsInJlcUFjdGl2aXR5ZGV0YWlsIiwiaW5kZXgiLCJub3dJZCIsImxheW91dCIsInVwZGF0ZUN1clNlY29uZCIsImZvcmNlUmVmcmVzaFJlZFBvaW50IiwiUmVxUmVkRG90IiwiY2F0ZWdvcnlfaWQiLCJyZWNlaXZlZF9zdGF0dXMiLCJ1cGRhdGVTZWNvbmRUaXRsZSIsImZpcnN0VGl0bGVEYXRhIiwidXBkYXRlRmlyc3RUaXRsZSIsInJlcVNlY29uZFRpdGxlIiwicmVkRG90RGF0YSIsImRpc2NvdW50UmVxIiwia2V5IiwiaW50ZXJ2YWwiLCJpdGVtSGVpZ2h0IiwiZmlyc3RWaWV3Tm9kZSIsInZpZXciLCJMYXlvdXQiLCJzcGFjaW5nWSIsImRpc2NvdW50X2FjdGl2aXR5X3RpdGxlIiwidGFnIiwidXBkYXRlQ2xpY2siLCJ1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzIiwib25TY3JvbGxFdmVudCIsInNjcm9sbCIsImV2ZW50IiwibWluWSIsIm1heFkiLCJpdGVtIiwiY2VsbEhlaWdodCIsIm9mZnNldENvdW50IiwicGFkZGluZ1RvcCIsIk1hdGgiLCJmbG9vciIsInRhcmdldFkiLCJtYXgiLCJzdG9wQWxsQWN0aW9ucyIsInJ1bkFjdGlvbiIsIm1vdmVUbyIsInYyIiwiY2VpbCIsIm1pbiIsInVwZGF0ZU5vdGljZSIsIlNjcm9sbFZpZXciLCJzdG9wQXV0b1Njcm9sbCIsInNob3dUZXh0RGVsYXkiLCJnZXRGaXJzdEluZGV4IiwiZ2V0U2Vjb25kSW5kZXgiLCJzaG93U2hvcCIsImlzVG91cmlzdCIsInNob3dSZWdpc3RyYXRpb24iLCJzaG93UGFuZWxCeU5hbWUiLCJyZW1vdmUiLCJncmFkZWlkIiwicmV3YXJkQ29pbiIsInJld2FyZGRpbWFuZCIsImdyYWRlIiwiYXJyIiwiYXdhcmR0eXBlIiwiRElBTU9ORCIsInNob3dBd2FyZEJveCIsInRpcHMiLCJBTk5PVU5DRSIsIkFXQVJEX1RJUFMiLCJSRVZJRVdfV0FJVF9USVBTIiwiZHJhdyIsInVwZGF0ZUZpcnN0UmVkIiwiZ2V0SW5kZXhCeUlkIiwiY2xlYXJEZXRhaWxEYXRhIiwicmV2aWV3TnVtIiwic2hvd1RpcCIsIlJFVklFV19USVBTIiwiZm9ybWF0IiwiQVdBUkRfUkVWSUVXX1RJUFMiLCJzaG93UGFuZWwiLCJzY3JpcHQiLCJsYkNvbSIsImFzc2VtYmxlciIsIl9hc3NlbWJsZXIiLCJhc3NlbWJsZXJEYXRhIiwiX2dldEFzc2VtYmxlckRhdGEiLCJ3cmFwVGV4dCIsIl9jYWxjdWxhdGVMYWJlbEZvbnQiLCJjb250ZXh0IiwiX2dldEZvbnREZXNjIiwidHh0IiwiX2dldEZvbnRGYW1pbHkiLCJjb21wIiwidXNlU3lzdGVtRm9udCIsImZvbnQiLCJfbmF0aXZlQXNzZXQiLCJsb2FkZXIiLCJsb2FkIiwibmF0aXZlVXJsIiwiZXJyIiwiYXNzZXQiLCJzZXRWZXJ0c0RpcnR5IiwiZm9udEZhbWlseSIsImxiIiwiZm9udERlc2MiLCJmb250U2l6ZSIsImVuYWJsZUJvbGQiLCJlbmFibGVJdGFsaWMiLCJfbWVhc3VyZVRleHQiLCJjdHgiLCJ0ZXh0VXRpbHMiLCJzYWZlTWVhc3VyZVRleHQiLCJfY2FsY3VsYXRlV3JhcFRleHQiLCJwYXJhZ3JhcGhlZFN0cmluZ3MiLCJub2RlV2lkdGgiLCJfc3BsaXRlZFN0cmluZ3MiLCJjYW52YXNXaWR0aE5vTWFyZ2luIiwiYWxsV2lkdGgiLCJ0ZXh0RnJhZ21lbnQiLCJmcmFnbWVudFRleHQiLCJjb25jYXQiLCJzcGxpdCIsIk9uRGVzdHJveSIsInJlcUdldENvaW4iLCJyZXFHZXREaWFtb25kIiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE1BQU0sR0FBRyxDQUFmO0FBQ0EsSUFBTUMsSUFBSSxHQUFHLENBQWI7QUFDQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxJQUROO0FBRVJDLElBQUFBLFNBQVMsRUFBRUYsRUFBRSxDQUFDQyxJQUZOO0FBR1JFLElBQUFBLFVB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QStEQyxTQUEvRCxDQUFQO0FBQ0gsR0FwL0JtQjtBQXEvQnBCO0FBRUF6TSxFQUFBQSxLQXYvQm9CLG1CQXUvQlo7QUFDSixTQUFLZ0osTUFBTDtBQUNILEdBei9CbUI7QUEwL0JwQmlFLEVBQUFBLFNBMS9Cb0IsdUJBMC9CUjtBQUNSN1EsSUFBQUEsTUFBTSxDQUFDcUMsSUFBUCxDQUFZc0gsU0FBWjtBQUNBM0osSUFBQUEsTUFBTSxDQUFDcUMsSUFBUCxDQUFZeU8sVUFBWjtBQUNBOVEsSUFBQUEsTUFBTSxDQUFDcUMsSUFBUCxDQUFZME8sYUFBWjtBQUNBL1EsSUFBQUEsTUFBTSxDQUFDdUMsT0FBUCxDQUFleU8sR0FBZixDQUFtQixXQUFuQixFQUFnQyxJQUFoQztBQUNBaFIsSUFBQUEsTUFBTSxDQUFDdUMsT0FBUCxDQUFleU8sR0FBZixXQUFzQixLQUFLdE8sSUFBTCxDQUFVQyxJQUFoQyxTQUF1Q0MsT0FBTyxDQUFDQyxFQUFSLENBQVdDLFVBQWxELEdBQWdFLElBQWhFO0FBQ0gsR0FoZ0NtQixDQWlnQ3BCOztBQWpnQ29CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBESU1BTkQgPSAyXHJcbmNvbnN0IENPSU4gPSAxXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZmlyc3RWaWV3OiBjYy5Ob2RlLFxyXG4gICAgICAgIGZpcnN0SXRlbTogY2MuTm9kZSxcclxuICAgICAgICBzZWNvbmRWaWV3OiBjYy5Ob2RlLFxyXG4gICAgICAgIHNlY29uZEl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgZGV0YWlsVmlldzE6IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9kZXRhaWxWaWV3MTogY2MuTm9kZSwgLy8gbGF5b3V05Li6MeaXtuaYvuekulxyXG4gICAgICAgIGRldGFpbFZpZXcyOiBjYy5Ob2RlLCAgICAgICAvL2xheW91dOS4ujLml7bmmL7npLpcclxuICAgICAgICByZXdhcmRCYXIxOiBjYy5Ob2RlLFxyXG4gICAgICAgIHJld2FyZEJhcjI6IGNjLk5vZGUsXHJcbiAgICAgICAgcmV3YXJkQmFyb3RoZXI6IGNjLk5vZGUsXHJcbiAgICAgICAgaW1hZ2VJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvbnRlbnRJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGljb25BcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYWN0aXZpdHlBcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgY3ljbGVUeXBlQXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGRldGFpbHdpbmRvdzogY2MuUHJlZmFiLFxyXG4gICAgICAgIGNvbmRpdGlvbkl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgYnRuX2FsbHJld2FyZDogY2MuQnV0dG9uLFxyXG5cclxuICAgICAgICBMYWJlbEl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgLy/ku6XkuIvkuLrooajmoLznlJ/miJDnlKjliLBcclxuICAgICAgICBiYXJJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxpbmVJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIHdvcmRJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGZvcm1WaWV3OiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICBkb3duUGFnZTogY2MuTm9kZSxcclxuICAgICAgICB1cFBhZ2U6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOmSu+efs+W8gOWFs1wiLCBnbEdhbWUudXNlci5nZXQoXCJyb29tU3dpdGNoXCIpKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIlJlcVJlZERvdFwiLCB0aGlzLmluaXRSZWRkb3QsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKGAke3RoaXMubm9kZS5uYW1lfSR7TUVTU0FHRS5VSS5BQ1RJT05fRU5EfWAsIHRoaXMuYW5ub3VuY2VBY3Rpb25FbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVEYXRhID0ge307XHJcblxyXG4gICAgfSxcclxuICAgIGFubm91bmNlQWN0aW9uRW5kKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFOb3RpY2VcIiwge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FsbHJld2FyZC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWNlcyA9IG1zZy5ub3RpY2VzO1xyXG4gICAgICAgICAgICB0aGlzLnJlcUZpcnN0VGl0bGUoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRBbGxyZXdhcmRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAvLyBpZiAoIWdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGF0YSA9IGdsR2FtZS51c2VyLmdldCgncmVkRG90RGF0YScpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5idG5fYWxscmV3YXJkLmludGVyYWN0YWJsZSA9IGRhdGFbJ2Rpc2NvdW50UmVxJ10ubGVuZ3RoICE9IDA7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bl9hbGxyZXdhcmQuaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5ouJ5Y+W5b2T5YmN5LiA6ZSu6aKG5Y+W54q25oCBXHJcbiAgICBnZXRBbGxyZXdhcmRTdGF0ZSgpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxRGlzY291bnRzUmVjZWl2ZUFsbFN0YXRlXCIsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9hbGxyZXdhcmQuaW50ZXJhY3RhYmxlID0gbXNnLnN0YXRlICE9IDBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMuY2xvc2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWxsUmVjZWl2ZVwiOiB0aGlzLmFsbHJld2FyZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vdGljZVwiOiB0aGlzLm5vdGljZVNob3cobm9kZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZmlyc3RJdGVtXCI6IHRoaXMuc3dpdGNoRmlyc3QobmFtZSwgbm9kZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2Vjb25kSXRlbVwiOiB0aGlzLnN3aXRjaFNlY29uZChuYW1lLCBub2RlKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZ29HZXRDb2luXCI6IHRoaXMuZ29HZXRDb2luKG5vZGUpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yZXdhcmRcIjogdGhpcy5yZXdhcmQobm9kZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2FjdGl2aXR5RGV0YWlsXCI6IHRoaXMuYWN0aXZpdHlEZXRhaWwoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1cFBhZ2VcIjogdGhpcy5vblVwUGFnZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRvd25QYWdlXCI6IHRoaXMub25Eb3duUGFnZSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5sb2coXCIgYnRuIG5hbWU6IFwiLCBuYW1lKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIDEg5rS75Yqo5pe26Ze0Ly8gMiDmtLvliqjlr7nosaEvLyAzIOa0u+WKqOS7i+e7jS8vIDTmtLvliqjooajmoLwvLyA1IOa0u+WKqOe7huWImS8vIDYg5rS75Yqo6KeE5YiZ5LiO5p2h5qy+XHJcbiAgICAvL+abtOaWsOivpue7huS/oeaBr1xyXG4gICAgdXBkYXRlRGV0YWlsVmlldzEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMubm9kZV9kZXRhaWxWaWV3MS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsVmlldzIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kZXRhaWxWaWV3MS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmRldGFpbFZpZXcxLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYgKGRhdGEuYWN0aXZpdHlwaWMgJiYgZGF0YS5hY3Rpdml0eXBpYyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmltYWdlSXRlbSk7XHJcbiAgICAgICAgICAgIGltYWdlSXRlbS5wYXJlbnQgPSB0aGlzLmRldGFpbFZpZXcxO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKGltYWdlSXRlbSwgZGF0YS5hY3Rpdml0eXBpYyk7XHJcbiAgICAgICAgICAgIGltYWdlSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRpdGxlZGV0YWlsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRpdGxlZGV0YWlsW2ldLmlkID09IDUgfHwgZGF0YS50aXRsZWRldGFpbFtpXS5pZCA9PSA2KSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEudGl0bGVkZXRhaWxbaV0udHlwZSA9PSA0ICYmIGRhdGEudGl0bGVkZXRhaWxbaV0uaW1nICYmIGRhdGEudGl0bGVkZXRhaWxbaV0uaW1nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmltYWdlSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKGltYWdlSXRlbSwgZGF0YS50aXRsZWRldGFpbFtpXS5pbWcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlSXRlbS53aWR0aCA+IDEyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VJdGVtLmhlaWdodCA9IGltYWdlSXRlbS5oZWlnaHQgKiAxMjAwIC8gaW1hZ2VJdGVtLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUl0ZW0ud2lkdGggPSAxMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUl0ZW0ucGFyZW50ID0gdGhpcy5kZXRhaWxWaWV3MTtcclxuICAgICAgICAgICAgICAgIGltYWdlSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudGl0bGVkZXRhaWxbaV0uaW1nID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRpdGxlZGV0YWlsW2ldLmlkID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRmb3JtKGRhdGEudGl0bGVkZXRhaWxbaV0uY29udGVudClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50SXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29udGVudEl0ZW0pO1xyXG4gICAgICAgICAgICBjb250ZW50SXRlbS5wYXJlbnQgPSB0aGlzLmRldGFpbFZpZXcxO1xyXG4gICAgICAgICAgICBjb250ZW50SXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29udGVudEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJUaXBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLnRpdGxlZGV0YWlsW2ldLnRpdGxlICsgXCLvvJpcIjtcclxuICAgICAgICAgICAgY29udGVudEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbkFycltkYXRhLnRpdGxlZGV0YWlsW2ldLmljb25dO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50aXRsZWRldGFpbFtpXS5pZCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnQyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnQyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS50aXRsZWRldGFpbFtpXS5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudGl0bGVkZXRhaWxbaV0uY29udGVudC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJdGVtLmdldENoaWxkQnlOYW1lKFwiY29udGVudDJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnQxXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50SXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnQxXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS50aXRsZWRldGFpbFtpXS5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCB0aGlzLmRldGFpbFZpZXcxLCAwLjAyLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJld2FyZEJhcihkYXRhLCB0aGlzLnJld2FyZEJhcjEsIHRoaXMuZGV0YWlsVmlldzEsIDEpXHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrDpooblj5blpZblirHmnaFcclxuICAgIHVwZGF0ZVJld2FyZEJhcihkYXRhLCBCYXJUeXBlLCBwYXJlbnQsIHR5cGUpIHtcclxuICAgICAgICBsZXQgcmV3YXJkSXRlbSA9IGRhdGEucmV3YXJkSXRlbVxyXG4gICAgICAgIGlmICghcmV3YXJkSXRlbSkgcmV0dXJuXHJcbiAgICAgICAgaWYgKHJld2FyZEl0ZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBzdW1Db2luID0gMDtcclxuICAgICAgICAgICAgbGV0IHN1bURpYW1vbmQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJld2FyZEl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRCYXIgPSBjYy5pbnN0YW50aWF0ZShCYXJUeXBlKVxyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgICAgIHJld2FyZEJhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJld2FyZEJhci5uYW1lID0gYCR7aX1gXHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkVHlwZUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImxhYl9hY2N1bXVsYXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImxhYl9hY2N1bXVsYXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV3YXJkSXRlbVtpXS5nZXRTdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWUgPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29pbnBpYyA9IHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcInJld2FyZExheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImNvaW5waWNcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGltYW5kcGljID0gcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwicmV3YXJkTGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwiZGltYW5kcGljXCIpO1xyXG4gICAgICAgICAgICAgICAgLy/ov5nmmK/ph5HluIHnmoTmmL7npLrpg6jliIZcclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJdGVtW2ldLnJld2FyZC5jb2luID4gMCAmJiBOdW1iZXIocmV3YXJkSXRlbVtpXS5yZXdhcmQuY29pbikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29pbnBpYy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFR5cGVDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bUNvaW4gKz0gTnVtYmVyKHJld2FyZEl0ZW1baV0ucmV3YXJkLmNvaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvaW5waWMuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfcmV3YXJkTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtW2ldLnJld2FyZC5jb2luKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJdGVtW2ldLnJld2FyZC5jb2luID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJld2FyZEl0ZW1baV0ucmV3YXJkVHlwZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV3YXJkSXRlbVtpXS5yZXdhcmRUeXBlW2tdID09IENPSU4gJiYgTnVtYmVyKHJld2FyZEl0ZW1baV0ucmV3YXJkLmNvaW4pID4gbWluVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvaW5waWMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvaW5waWMuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfcmV3YXJkTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtW2ldLnJld2FyZC5jb2luKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3nmoTpkrvnn7PmmL7npLpcIiwgZ2xHYW1lLnVzZXIuZ2V0KFwicm9vbVN3aXRjaFwiKSwgcmV3YXJkSXRlbVtpXS5yZXdhcmQuZGlhbW9uZClcclxuICAgICAgICAgICAgICAgIC8v6L+Z6YOo5YiG5piv6ZK755+z55qE5pi+56S6XHJcbiAgICAgICAgICAgICAgICBpZiAocmV3YXJkSXRlbVtpXS5yZXdhcmQuZGlhbW9uZCA+IDAgJiYgZ2xHYW1lLnVzZXIuZ2V0KFwicm9vbVN3aXRjaFwiKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGltYW5kcGljLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkVHlwZUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtRGlhbW9uZCArPSByZXdhcmRJdGVtW2ldLnJld2FyZC5kaWFtb25kO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpbWFuZHBpYy5nZXRDaGlsZEJ5TmFtZShcImxhYl9kaWFtb25kTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtW2ldLnJld2FyZC5kaWFtb25kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJdGVtW2ldLnJld2FyZC5kaWFtb25kID09IDAgJiYgZ2xHYW1lLnVzZXIuZ2V0KFwicm9vbVN3aXRjaFwiKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZXdhcmRJdGVtW2ldLnJld2FyZFR5cGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJld2FyZEl0ZW1baV0ucmV3YXJkVHlwZVtrXSA9PSBESU1BTkQgJiYgTnVtYmVyKHJld2FyZEl0ZW1baV0ucmV3YXJkLmRpYW1vbmQpID4gbWluVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpbWFuZHBpYy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGltYW5kcGljLmdldENoaWxkQnlOYW1lKFwibGFiX2RpYW1vbmROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHJld2FyZEl0ZW1baV0ucmV3YXJkLmRpYW1vbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX3Jld2FyZFwiKS5hY3RpdmUgPSByZXdhcmRJdGVtW2ldLnN0YXRlID09IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV3YXJkSXRlbVtpXS5zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmJ0bl9hbGxyZXdhcmQuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY29uZFZpZXcuY2hpbGRyZW5bdGhpcy5ub3dJbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX2dvR2V0Q29pblwiKS5hY3RpdmUgPSByZXdhcmRJdGVtW2ldLnN0YXRlID09IDI7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlZWRcIikuYWN0aXZlID0gcmV3YXJkSXRlbVtpXS5zdGF0ZSA9PSAxO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYXVkaXRpbmdcIikuYWN0aXZlID0gcmV3YXJkSXRlbVtpXS5zdGF0ZSA9PSA0O1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwicmVmdXNlXCIpLmFjdGl2ZSA9IHJld2FyZEl0ZW1baV0uc3RhdGUgPT0gNTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJdGVtW2ldLnN0YXRlID09IC0xICYmIGRhdGEuY3ljbGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiUmVjZWl2ZVR5cGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlVHlwZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY3ljbGVUeXBlQXJyW2RhdGEuY3ljbGVUeXBlXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiUmVjZWl2ZVR5cGVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlVHlwZVwiKS5hY3RpdmUgPSByZXdhcmRJdGVtW2ldLnN0YXRlID09IC0xO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHJld2FyZEl0ZW1baV0uc2NoZWR1bGVbMV0gPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcIlJlY2VpdmVUeXBlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV3YXJkSXRlbVtpXS5zY2hlZHVsZVs0XVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJld2FyZEl0ZW1baV0ucmV3YXJkV29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkaWNvbiA9IHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFRpcHNcIilcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRpY29uLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmV3YXJkSXRlbVtpXS5yZXdhcmRXb3JkcyArIFwi77yaXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZ29HZXRDb2luXCIpLnkgPSA0LjI0O1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX3Jld2FyZFwiKS55ID0gNC4yNDtcclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJdGVtW2ldLnN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcmV3YXJkXCIpLnkgPSAtMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX2dvR2V0Q29pblwiKS55ID0gLTIwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImRlc19zaGNlZHVsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImRlc19zaGNlZHVsZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwi5bey5a6M5oiQXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkSXRlbVtpXS5zdGF0ZSAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiZGVzX3NoY2VkdWxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NoZWR1bGUgPSBOdW1iZXIocmV3YXJkSXRlbVtpXS5zY2hlZHVsZVsxXSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNjaGVkdWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcihyZXdhcmRJdGVtW2ldLnNjaGVkdWxlWzNdKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiZGVzX3NoY2VkdWxlXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtW2ldLnNjaGVkdWxlWzRdICsgYCAke3RoaXMuZ2V0RmxvYXQocmV3YXJkSXRlbVtpXS5zY2hlZHVsZVsyXSl9PC9jPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImRlc19zaGNlZHVsZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkSXRlbVtpXS5zY2hlZHVsZVs0XSArIGAgJHt0aGlzLmdldEZsb2F0KHJld2FyZEl0ZW1baV0uc2NoZWR1bGVbMl0pfTwvYz4vJHt0aGlzLmdldEZsb2F0KHJld2FyZEl0ZW1baV0uc2NoZWR1bGVbM10pfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiZGVzX3NoY2VkdWxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImJ0bl9yZXdhcmRcIikueSA9IC0yMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX2dvR2V0Q29pblwiKS55ID0gLTIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImRlc19zaGNlZHVsZVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IHJld2FyZEl0ZW1baV0uc2NoZWR1bGVbNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImRlc19zaGNlZHVsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcmV3YXJkXCIpLnkgPSAtMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEJhci5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nb0dldENvaW5cIikueSA9IC0yMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNfc2hjZWR1bGVcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSByZXdhcmRJdGVtW2ldLnNjaGVkdWxlWzRdICsgYCAgJHtyZXdhcmRJdGVtW2ldLnNjaGVkdWxlWzJdfS8ke3Jld2FyZEl0ZW1baV0uc2NoZWR1bGVbM119YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNfc2hjZWR1bGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkQmFyLmdldENoaWxkQnlOYW1lKFwiYnRuX3Jld2FyZFwiKS55ID0gLTIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZ29HZXRDb2luXCIpLnkgPSAtMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiX2FjY3VtdWxhdGUgPSByZXdhcmRCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRMYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfYWNjdW11bGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFiX2FjY3VtdWxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJld2FyZFR5cGVDb3VudCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2lucGljLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGAo57Sv6K6h5aWW5YqxJHt0aGlzLmdldEZsb2F0KHN1bUNvaW4pfemHkeW4gSlgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBgKOe0r+iuoeWlluWKsSR7dGhpcy5nZXRGbG9hdChzdW1EaWFtb25kKX3pkrvnn7MpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiX2FjY3VtdWxhdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYl9hY2N1bXVsYXRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZFR5cGVDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJfYWNjdW11bGF0ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiX2FjY3VtdWxhdGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXdhcmRJdGVtW2ldLmdldFN0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCBwYXJlbnQsIDAuMDIsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmRCYXJvdGhlciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmV3YXJkQmFyb3RoZXIpO1xyXG4gICAgICAgICAgICByZXdhcmRCYXJvdGhlci5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIHJld2FyZEJhcm90aGVyLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgcmV3YXJkQmFyb3RoZXIubmFtZSA9IFwicmVnaXN0ZXJib251c1wiXHJcbiAgICAgICAgICAgIHJld2FyZEJhcm90aGVyLmdldENoaWxkQnlOYW1lKFwiZGVzX3RpcFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJld2FyZEl0ZW0uZ2V0U3RyICsgXCLvvJpcIjtcclxuICAgICAgICAgICAgcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcmV3YXJkXCIpLmFjdGl2ZSA9IHJld2FyZEl0ZW0uc3RhdGUgPT0gMDtcclxuICAgICAgICAgICAgcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZ29HZXRDb2luXCIpLmFjdGl2ZSA9IHJld2FyZEl0ZW0uc3RhdGUgPT0gMjtcclxuICAgICAgICAgICAgcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlZWRcIikuYWN0aXZlID0gcmV3YXJkSXRlbS5zdGF0ZSA9PSAxXHJcbiAgICAgICAgICAgIHJld2FyZEJhcm90aGVyLmdldENoaWxkQnlOYW1lKFwiYXVkaXRpbmdcIikuYWN0aXZlID0gcmV3YXJkSXRlbS5zdGF0ZSA9PSA0O1xyXG4gICAgICAgICAgICByZXdhcmRCYXJvdGhlci5nZXRDaGlsZEJ5TmFtZShcInJlZnVzZVwiKS5hY3RpdmUgPSByZXdhcmRJdGVtLnN0YXRlID09IDU7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGFiX3Jld2FyZE51bSA9IHJld2FyZEJhcm90aGVyLmdldENoaWxkQnlOYW1lKFwicmV3YXJkTGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwibGFiX3Jld2FyZE51bVwiKTtcclxuICAgICAgICAgICAgbGV0IGxhYl9kaWFtb25kTnVtID0gcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRMYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfZGlhbW9uZE51bVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8v6L+Z5piv6YeR5biB55qE5pi+56S66YOo5YiGXHJcbiAgICAgICAgICAgIC8vIGlmIChyZXdhcmRJdGVtLnJld2FyZC5jb2luID4gMCAmJiBOdW1iZXIocmV3YXJkSXRlbS5yZXdhcmQuY29pbikgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsYWJfcmV3YXJkTnVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBsYWJfcmV3YXJkTnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtLnJld2FyZC5jb2luKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHJld2FyZEl0ZW0ucmV3YXJkLmNvaW4gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmV3YXJkSXRlbS5yZXdhcmRUeXBlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV3YXJkSXRlbS5yZXdhcmRUeXBlW2tdID09IENPSU4gJiZOdW1iZXIocmV3YXJkSXRlbS5yZXdhcmQuY29pbikhPXVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYl9yZXdhcmROdW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsYWJfcmV3YXJkTnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtLnJld2FyZC5jb2luKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJld2FyZEl0ZW0ucmV3YXJkVHlwZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJld2FyZEl0ZW0ucmV3YXJkVHlwZVtrXSA9PSBESU1BTkQmJmdsR2FtZS51c2VyLmdldChcInJvb21Td2l0Y2hcIikgPT0gMSYmTnVtYmVyKHJld2FyZEl0ZW0ucmV3YXJkLmRpYW1vbmQpIT11bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJfZGlhbW9uZE51bS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYl9kaWFtb25kTnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChyZXdhcmRJdGVtLnJld2FyZC5kaWFtb25kKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAvL+i/memDqOWIhuaYr+mSu+efs+eahOaYvuekulxyXG4gICAgICAgICAgICAvLyBpZiAoTnVtYmVyKHJld2FyZEl0ZW0ucmV3YXJkLmRpYW1vbmQpID4gMCAmJiBnbEdhbWUudXNlci5nZXQoXCJyb29tU3dpdGNoXCIpID09IDEpIHtcclxuICAgICAgICAgICAgLy8gICAgIGxhYl9kaWFtb25kTnVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBsYWJfZGlhbW9uZE51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQocmV3YXJkSXRlbS5yZXdhcmQuZGlhbW9uZCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYgKE51bWJlcihyZXdhcmRJdGVtLnJld2FyZC5kaWFtb25kKSA9PSAwICYmIGdsR2FtZS51c2VyLmdldChcInJvb21Td2l0Y2hcIikgPT0gMSkge1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmV3YXJkSXRlbS5zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYnRuX2FsbHJld2FyZC5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmRWaWV3LmNoaWxkcmVuW3RoaXMubm93SW5kZXhdLmdldENoaWxkQnlOYW1lKFwicmVkbWFya1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb25kaXRpb25hbCA9IGRhdGEuY29uZGl0aW9uYWwsXHJcbiAgICAgICAgICAgICAgICBjdXJTY2hkdWxlID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25kaXRpb25hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmRpdGlvbkl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvbmRpdGlvbkl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uSXRlbS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbmRpdGlvbmFsW2ldLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25hbFtpXS5zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU2NoZHVsZSsrXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uSXRlbS5nZXRDaGlsZEJ5TmFtZShcImdvdVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uSXRlbS5jb2xvciA9IGNvbmRpdGlvbmFsW2ldLnN0YXRlID09IDEgPyBjYy5jb2xvcigzOCwgMjE4LCAxOCkgOiBjYy5jb2xvcigyNTUsIDcxLCA3MSlcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbkl0ZW0ucGFyZW50ID0gcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNfc2hjZWR1bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXdhcmRJdGVtLnN0YXRlID09IDAgPyBcIuW3suWujOaIkFwiIDogYOi/m+W6piR7Y3VyU2NoZHVsZX0vJHtjb25kaXRpb25hbC5sZW5ndGh9YFxyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcywgcmV3YXJkQmFyb3RoZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLCAwLjAyLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/moYzpnaLmlbDmja7nmoTmmL7npLpcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIC8v55Sf5oiQ6KGo5qC8XHJcbiAgICBpbml0Zm9ybShkYXRhKSB7XHJcbiAgICAgICAgbGV0IGZvcm1WaWV3ID0gY2MuaW5zdGFudGlhdGUodGhpcy5mb3JtVmlldyk7XHJcbiAgICAgICAgZm9ybVZpZXcucGFyZW50ID0gdGhpcy5kZXRhaWxWaWV3MTtcclxuICAgICAgICBmb3JtVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvcm1WaWV3LmhlaWdodCA9IDEwMCArIChkYXRhLmxlbmd0aCAtIDEpICogNTBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd29yZEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndvcmRJdGVtKTtcclxuICAgICAgICAgICAgICAgIHdvcmRJdGVtLnBhcmVudCA9IGZvcm1WaWV3O1xyXG4gICAgICAgICAgICAgICAgd29yZEl0ZW0uZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBkYXRhW2ldW2pdLnJlcGxhY2UoXCI8YnI+XCIsIFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIHdvcmRJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICAgICAgbGV0IGxlbmd0aEJlc3QgPSBkYXRhWzBdLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoQmVzdDsgaSA+PSAxOyBpLS0pIHtcclxuICAgICAgICAgICAgdG90YWwgKz0gZm9ybVZpZXcuY2hpbGRyZW5bZm9ybVZpZXcuY2hpbGRyZW5Db3VudCAtIGldLndpZHRoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IChmb3JtVmlldy53aWR0aCAtIHRvdGFsKSAvIChkYXRhWzBdLmxlbmd0aCArIDEpO1xyXG4gICAgICAgIHRvdGFsID0gMDtcclxuICAgICAgICBsZXQgZGlzdGFuY2VBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoQmVzdDsgaSA+PSAxOyBpLS0pIHtcclxuICAgICAgICAgICAgdG90YWwgKz0gZm9ybVZpZXcuY2hpbGRyZW5bZm9ybVZpZXcuY2hpbGRyZW5Db3VudCAtIGldLndpZHRoICsgZGlzdGFuY2VcclxuICAgICAgICAgICAgZGlzdGFuY2VBcnIucHVzaCh0b3RhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBDb3VudCA9IDE7XHJcbiAgICAgICAgbGV0IFBvc3kgPSAtNTBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtVmlldy5jaGlsZHJlbltDb3VudF0ueCA9IGogPT0gMCA/IGRpc3RhbmNlIDogZGlzdGFuY2UgKyBkaXN0YW5jZUFycltqIC0gMV07XHJcbiAgICAgICAgICAgICAgICBmb3JtVmlldy5jaGlsZHJlbltDb3VudF0ueSA9IFBvc3lcclxuICAgICAgICAgICAgICAgIGlmIChqID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtVmlldy5jaGlsZHJlbltDb3VudF0uY29sb3IgPSBjYy5jb2xvcigyNDYsIDE0MiwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZpZXcuY2hpbGRyZW5bQ291bnRdLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gZm9ybVZpZXcuY2hpbGRyZW5bQ291bnRdLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nLnJlcGxhY2UoXCI8YnI+XCIsIFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5saW5lSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUl0ZW0ucGFyZW50ID0gZm9ybVZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lSXRlbS55ID0gLShmb3JtVmlldy5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lSXRlbS54ID0gZm9ybVZpZXcuY2hpbGRyZW5bQ291bnRdLnggLSBkaXN0YW5jZSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUl0ZW0uaGVpZ2h0ID0gZm9ybVZpZXcuaGVpZ2h0IC0gMjBcclxuICAgICAgICAgICAgICAgICAgICBsaW5lSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVJdGVtLnpJbmRleCA9IDEwMCArIGo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXJJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5iYXJJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBiYXJJdGVtLnBhcmVudCA9IGZvcm1WaWV3LmdldENoaWxkQnlOYW1lKFwiYmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFySXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhckl0ZW0ueSA9IFBvc3k7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBDb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUG9zeSAtPSA1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1WaWV3LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlRGV0YWlsVmlldzIoZGF0YSkge1xyXG4gICAgICAgIHRoaXMubm9kZV9kZXRhaWxWaWV3MS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRldGFpbFZpZXcyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmRldGFpbFZpZXcyLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBsYWJfdGltZSA9IHRoaXMuZGV0YWlsVmlldzIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfdGltZVwiKTtcclxuICAgICAgICBpZiAoZGF0YS50aXRsZWRldGFpbC5sZW5ndGggJiYgZGF0YS50aXRsZWRldGFpbFswXS50aXRsZSA9PSBcIua0u+WKqOaXtumXtFwiKSB7XHJcbiAgICAgICAgICAgIGxhYl90aW1lLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxhYl90aW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS50aXRsZWRldGFpbFswXS5jb250ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhYl90aW1lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEuYWN0aXZpdHlwaWMgJiYgZGF0YS5hY3Rpdml0eXBpYyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVtb3RlSW1hZ2UodGhpcy5kZXRhaWxWaWV3MiwgZGF0YS5hY3Rpdml0eXBpYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlUmV3YXJkQmFyKGRhdGEsIHRoaXMucmV3YXJkQmFyMiwgY29udGVudCwgMilcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOaVsOaNrlwiLCBkYXRhKVxyXG4gICAgfSxcclxuICAgIC8v6K+35rGC6K+m5oOF5YaF5a65XHJcbiAgICByZXFBY3Rpdml0eWRldGFpbChpZCwgdHlwZSwgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW2luZGV4XS5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm93SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW2luZGV4XS5jb250ZW50LmxheW91dCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURldGFpbFZpZXcxKHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW2luZGV4XS5jb250ZW50KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEZXRhaWxWaWV3Mih0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVtpbmRleF0uY29udGVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1clNlY29uZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+ivpuaDheeahOWGheWuuVwiLCB0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVtpbmRleF0uY29udGVudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxRGlzY291bnRzSW5mb1wiLCB7IGlkOiBpZCwgdHlwZTogdHlwZSwgY29sb3I6IFwiI0Y0QzQwNFwiIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm93SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1baW5kZXhdLmNvbnRlbnQgPSBtc2c7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVtpbmRleF0uY29udGVudC5sYXlvdXQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEZXRhaWxWaWV3MSh0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVtpbmRleF0uY29udGVudClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGV0YWlsVmlldzIodGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1baW5kZXhdLmNvbnRlbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJTZWNvbmQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/or6bmg4XnmoTlhoXlrrlcIiwgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1baW5kZXhdLmNvbnRlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy/lvLrliLbliLfmlrDnuqLngrlcclxuICAgIGZvcmNlUmVmcmVzaFJlZFBvaW50KCkge1xyXG4gICAgICAgIGdsR2FtZS51c2VyLlJlcVJlZERvdCgpO1xyXG5cclxuICAgICAgICAvL+W8uuWItuWIt+aWsOS6jOe6p+agh+mimOe6oueCuVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMubm93SWQ7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcURpc2NvdW50c0xpc3RcIiwgeyBjYXRlZ29yeV9pZDogaWQgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbaWRdID0gbXNnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmNhY2hlRGF0YVtpZF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZEl0ZW0gPSB0aGlzLnNlY29uZFZpZXcuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBzZWNvbmRJdGVtLmdldENoaWxkQnlOYW1lKFwicmVkbWFya1wiKS5hY3RpdmUgPSBkYXRhW2ldLnJlY2VpdmVkX3N0YXR1cyA9PSAxO1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kSXRlbS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKS5hY3RpdmUgPSBpID09IHRoaXMubm93SW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub3dJZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlY29uZFRpdGxlKHRoaXMuY2FjaGVEYXRhW2lkXSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVtpZF0ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxQWN0aXZpdHlkZXRhaWwodGhpcy5jYWNoZURhdGFbaWRdWzBdLmlkLCB0aGlzLmNhY2hlRGF0YVtpZF1bMF0udHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZGV0YWlsVmlldzIuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxWaWV3MS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsVmlldzEucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6K+35rGC5b2T5YmN55qE5LiA57qn5aSn5qCH6aKYXHJcbiAgICByZXFGaXJzdFRpdGxlKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFEaXNjb3VudHNUeXBlXCIsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0VGl0bGVEYXRhID0gbXNnO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpcnN0VGl0bGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3RUaXRsZURhdGEubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxU2Vjb25kVGl0bGUodGhpcy5maXJzdFRpdGxlRGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9hbGxyZXdhcmQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vdGljZXMgJiYgdGhpcy5ub3RpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKFwibm90aWNlXCIsIHRoaXMuZmlyc3RWaWV3LmdldENoaWxkQnlOYW1lKFwibm90aWNlXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXRSZWRkb3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGluaXRSZWRkb3QoKSB7XHJcbiAgICAgICAgbGV0IHJlZERvdERhdGEgPSBnbEdhbWUudXNlci5nZXQoXCJyZWREb3REYXRhXCIpLmRpc2NvdW50UmVxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RWaWV3LmNoaWxkcmVuW2ldLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwicmVkbWFya1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcmVkRG90RGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlyc3RWaWV3LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZERvdERhdGFba2V5XS5jYXRlZ29yeV9pZCA9PSB0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbltpXS5jaGlsZHJlblswXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5baV0uY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/or7fmsYLlvZPliY3nmoTkuoznuqfmoIfpophcclxuICAgIHJlcVNlY29uZFRpdGxlKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3kvKDlhaXnmoRpZFwiLCBpZClcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5jYWNoZURhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3dJZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWNvbmRUaXRsZSh0aGlzLmNhY2hlRGF0YVtrZXldKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVtpZF0ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcUFjdGl2aXR5ZGV0YWlsKHRoaXMuY2FjaGVEYXRhW2lkXVswXS5pZCwgdGhpcy5jYWNoZURhdGFbaWRdWzBdLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZGV0YWlsVmlldzIuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxWaWV3MS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbFZpZXcxLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcURpc2NvdW50c0xpc3RcIiwgeyBjYXRlZ29yeV9pZDogaWQgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbaWRdID0gbXNnO1xyXG4gICAgICAgICAgICB0aGlzLm5vd0lkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2Vjb25kVGl0bGUodGhpcy5jYWNoZURhdGFbaWRdKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVEYXRhW2lkXS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXFBY3Rpdml0eWRldGFpbCh0aGlzLmNhY2hlRGF0YVtpZF1bMF0uaWQsIHRoaXMuY2FjaGVEYXRhW2lkXVswXS50eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5kZXRhaWxWaWV3Mi5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbFZpZXcxLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxWaWV3MS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy/mm7TmlrDkuIDnuqfmoIfpophcclxuICAgIHVwZGF0ZUZpcnN0VGl0bGUoKSB7XHJcbiAgICAgICAgbGV0IGludGVydmFsID0gMTUsIGl0ZW1IZWlnaHQgPSAwO1xyXG4gICAgICAgIGxldCBmaXJzdFZpZXdOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZmlyc3RWaWV3XCIpO1xyXG4gICAgICAgIGxldCB2aWV3ID0gZmlyc3RWaWV3Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpcnN0VGl0bGVEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpcnN0SXRlbSk7XHJcbiAgICAgICAgICAgIGZpcnN0SXRlbS5wYXJlbnQgPSB0aGlzLmZpcnN0VmlldztcclxuICAgICAgICAgICAgZmlyc3RJdGVtLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5maXJzdFRpdGxlRGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgZmlyc3RJdGVtLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZpcnN0VGl0bGVEYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBmaXJzdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLm5hbWUgPSBgJHt0aGlzLmZpcnN0VGl0bGVEYXRhW2ldLmlkfWBcclxuICAgICAgICAgICAgaXRlbUhlaWdodCA9IGZpcnN0SXRlbS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGZpcnN0SXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub3RpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpcnN0SXRlbSk7XHJcbiAgICAgICAgICAgIGZpcnN0SXRlbS5wYXJlbnQgPSB0aGlzLmZpcnN0VmlldztcclxuICAgICAgICAgICAgZmlyc3RJdGVtLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlhazlkYpcIjtcclxuICAgICAgICAgICAgZmlyc3RJdGVtLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuWFrOWRilwiO1xyXG4gICAgICAgICAgICBmaXJzdEl0ZW0ubmFtZSA9IGBub3RpY2VgXHJcbiAgICAgICAgICAgIGl0ZW1IZWlnaHQgPSBmaXJzdEl0ZW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICBmaXJzdEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maXJzdFZpZXcuaGVpZ2h0ID0gdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5Db3VudCAqIChpdGVtSGVpZ2h0ICsgdGhpcy5maXJzdFZpZXcuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuc3BhY2luZ1kpICsgMTA7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZmlyc3RWaWV3LmhlaWdodCA+IHZpZXcuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGZpcnN0Vmlld05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkb3duUGFnZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mm7TmlrDkuoznuqfmoIfpophcclxuICAgIHVwZGF0ZVNlY29uZFRpdGxlKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNlY29uZFZpZXcuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRWaWV3LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWNvbmRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWNvbmRJdGVtKTtcclxuICAgICAgICAgICAgc2Vjb25kSXRlbS5wYXJlbnQgPSB0aGlzLnNlY29uZFZpZXc7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0uZGlzY291bnRfYWN0aXZpdHlfdGl0bGU7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0uZGlzY291bnRfYWN0aXZpdHlfdGl0bGU7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmFjdGl2aXR5QXJyW2RhdGFbaV0udGFnXVxyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmdldENoaWxkQnlOYW1lKFwicmVkbWFya1wiKS5hY3RpdmUgPSBkYXRhW2ldLnJlY2VpdmVkX3N0YXR1cyA9PSAxO1xyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmNoaWxkcmVuWzBdLm5hbWUgPSBgJHtpfWA7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2Vjb25kSXRlbS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKS5hY3RpdmUgPSBpID09IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v54K55Ye75oyJ6ZKu5Y+Y5YyWdG9nZ2xl5pyJYnVn5omA5Lul5pS555SoYnV0dG9uXHJcbiAgICB1cGRhdGVDbGljayhub2RlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWNvbmRWaWV3LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWNvbmRWaWV3LmNoaWxkcmVuW2ldLmNoaWxkcmVuWzBdLm5hbWUgIT0gbm9kZS5jaGlsZHJlblswXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZFZpZXcuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/kuIDnuqfmoIfpopjliIfmjaJcclxuICAgIHN3aXRjaEZpcnN0KG5hbWUsIG5vZGUpIHtcclxuICAgICAgICB0aGlzLmJ0bl9hbGxyZXdhcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMucmVxU2Vjb25kVGl0bGUobm9kZS5jaGlsZHJlblswXS5uYW1lKVxyXG4gICAgfSxcclxuICAgIC8v5rua5Yqo5LqL5Lu2XHJcbiAgICBvblNjcm9sbEV2ZW50KHNjcm9sbCwgZXZlbnQpIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZmlyc3RWaWV3LnBhcmVudDtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZmlyc3RWaWV3O1xyXG4gICAgICAgIGxldCBtaW5ZID0gMDtcclxuICAgICAgICBsZXQgbWF4WSA9IGNvbnRlbnQuaGVpZ2h0IC0gdmlldy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmKGNvbnRlbnQueSA8PSBtaW5ZKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBQYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZihjb250ZW50LnkgPj0gbWF4WSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvd25QYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG93blBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cFBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5LiK5LiA6aG1XHJcbiAgICBvblVwUGFnZSgpIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZmlyc3RWaWV3LnBhcmVudDtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZmlyc3RWaWV3O1xyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5maXJzdEl0ZW07XHJcbiAgICAgICAgbGV0IGxheW91dCA9IGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgbGV0IG1pblkgPSAwO1xyXG4gICAgICAgIGxldCBtYXhZID0gY29udGVudC5oZWlnaHQgLSB2aWV3LmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYoY29udGVudC55IDw9IG1pblkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNlbGxIZWlnaHQgPSBpdGVtLmhlaWdodCArIGxheW91dC5zcGFjaW5nWTtcclxuICAgICAgICBsZXQgb2Zmc2V0Q291bnQgPSAoY29udGVudC55IC0gbGF5b3V0LnBhZGRpbmdUb3ApIC8gY2VsbEhlaWdodDtcclxuICAgICAgICBpZihvZmZzZXRDb3VudCAtIE1hdGguZmxvb3Iob2Zmc2V0Q291bnQpID4gMC4wMSkge1xyXG4gICAgICAgICAgICBvZmZzZXRDb3VudCA9IE1hdGguZmxvb3Iob2Zmc2V0Q291bnQpIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvZmZzZXRDb3VudCA9IE1hdGguZmxvb3Iob2Zmc2V0Q291bnQpIC0gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRZID0gbGF5b3V0LnBhZGRpbmdUb3AgKyBvZmZzZXRDb3VudCAqIGNlbGxIZWlnaHQ7XHJcbiAgICAgICAgaWYodGFyZ2V0WSAtIG1pblkgPCBpdGVtLmhlaWdodCkge1xyXG4gICAgICAgICAgICB0YXJnZXRZID0gbWluWS0xO1xyXG4gICAgICAgICAgICB0aGlzLnVwUGFnZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kb3duUGFnZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRhcmdldFkgPSBNYXRoLm1heCh0YXJnZXRZLCBtaW5ZKTtcclxuXHJcbiAgICAgICAgY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNvbnRlbnQucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIHRhcmdldFkpKSk7XHJcblxyXG4gICAgfSxcclxuICAgIC8vIOS4i+S4gOmhtVxyXG4gICAgb25Eb3duUGFnZSgpIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZmlyc3RWaWV3LnBhcmVudDtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZmlyc3RWaWV3O1xyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5maXJzdEl0ZW07XHJcbiAgICAgICAgbGV0IGxheW91dCA9IGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgbGV0IG1heFkgPSBjb250ZW50LmhlaWdodCAtIHZpZXcuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZihjb250ZW50LnkgPj0gbWF4WSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2VsbEhlaWdodCA9IGl0ZW0uaGVpZ2h0ICsgbGF5b3V0LnNwYWNpbmdZO1xyXG4gICAgICAgIGxldCBvZmZzZXRDb3VudCA9IChjb250ZW50LnkgKyB2aWV3LmhlaWdodCAtIGxheW91dC5wYWRkaW5nVG9wKSAvIGNlbGxIZWlnaHQ7XHJcbiAgICAgICAgb2Zmc2V0Q291bnQgPSBNYXRoLm1heChvZmZzZXRDb3VudCwgMCk7XHJcblxyXG4gICAgICAgIGlmKG9mZnNldENvdW50IC0gTWF0aC5mbG9vcihvZmZzZXRDb3VudCkgPCAwLjQpIHtcclxuICAgICAgICAgICAgb2Zmc2V0Q291bnQgPSBNYXRoLmZsb29yKG9mZnNldENvdW50KSArIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0Q291bnQgPSBNYXRoLmNlaWwob2Zmc2V0Q291bnQpICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRZID0gbGF5b3V0LnBhZGRpbmdUb3AgKyBvZmZzZXRDb3VudCAqIGNlbGxIZWlnaHQgLSB2aWV3LmhlaWdodDtcclxuICAgICAgICBpZihtYXhZIC0gdGFyZ2V0WSA8IGl0ZW0uaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldFkgPSBtYXhZICsgMTtcclxuICAgICAgICAgICAgdGhpcy5kb3duUGFnZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cFBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0YXJnZXRZID0gTWF0aC5taW4odGFyZ2V0WSwgbWF4WSk7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBjb250ZW50LnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCBjYy52MigwLCB0YXJnZXRZKSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2VTaG93KG5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ub3RpY2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm90aWNlKHRoaXMubm90aWNlcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAucmVxTm90aWNlXCIsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VzID0gbXNnLm5vdGljZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vdGljZSh0aGlzLm5vdGljZXMpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm93SWQgPSA2NDIyO1xyXG4gICAgICAgIHRoaXMuYnRuX2FsbHJld2FyZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZU5vdGljZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRWaWV3LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kVmlldy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2Vjb25kSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2Vjb25kSXRlbSk7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0ucGFyZW50ID0gdGhpcy5zZWNvbmRWaWV3O1xyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmdldENoaWxkQnlOYW1lKFwidGFnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWNvbmRJdGVtLmNoaWxkcmVuWzBdLm5hbWUgPSBgJHtpfWA7XHJcbiAgICAgICAgICAgIHNlY29uZEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2Vjb25kSXRlbS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKS5hY3RpdmUgPSBpID09IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZV9kZXRhaWxWaWV3MS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsVmlldzIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kZXRhaWxWaWV3MS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmRldGFpbFZpZXcxLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX2RldGFpbFZpZXcxLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vdGljZXMubGVuZ3RoID09IDApIHJldHVyblxyXG5cclxuICAgICAgICAvLyDliIbluKfmmL7npLrlhazlkYpcclxuICAgICAgICB0aGlzLnNob3dUZXh0RGVsYXkodGhpcy5ub3RpY2VzWzBdLmNvbnRlbnQsIHRoaXMuTGFiZWxJdGVtKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5bntKLlvJVcclxuICAgIGdldEZpcnN0SW5kZXgobm9kZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbltpXS5jaGlsZHJlblswXS5uYW1lID09IG5vZGUuY2hpbGRyZW5bMF0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/kuoznuqfnuqfmoIfpopjliIfmjaJcclxuICAgIHN3aXRjaFNlY29uZChuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuYWN0aXZlKSByZXR1cm5cclxuICAgICAgICB0aGlzLnVwZGF0ZUNsaWNrKG5vZGUpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vd0lkID09IDY0MjIpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2RldGFpbFZpZXcxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsVmlldzIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsVmlldzEuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsVmlldzEucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX2RldGFpbFZpZXcxLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zdG9wQXV0b1Njcm9sbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8g5YiG5bin5pi+56S65YWs5ZGKXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RleHREZWxheSh0aGlzLm5vdGljZXNbbm9kZS5jaGlsZHJlblswXS5uYW1lXS5jb250ZW50LCB0aGlzLkxhYmVsSXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldFNlY29uZEluZGV4KG5vZGUpO1xyXG4gICAgICAgIHRoaXMucmVxQWN0aXZpdHlkZXRhaWwodGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1baW5kZXhdLmlkLCB0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVtpbmRleF0udHlwZSwgaW5kZXgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+iOt+WPlue0ouW8lVxyXG4gICAgZ2V0U2Vjb25kSW5kZXgobm9kZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWNvbmRWaWV3LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWNvbmRWaWV3LmNoaWxkcmVuW2ldLmNoaWxkcmVuWzBdLm5hbWUgPT0gbm9kZS5jaGlsZHJlblswXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WOu+WujOaIkFxyXG4gICAgZ29HZXRDb2luKCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0udHlwZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOexu+Wei1wiLCB0eXBlKVxyXG4gICAgICAgIGlmICh0eXBlID09IDIgfHwgdHlwZSA9PSAzIHx8IHR5cGUgPT0gNikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Nob3AoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gNykge1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5pc1RvdXJpc3QoKSA/IGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0cmF0aW9uKHRydWUpIDogZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInVzZXJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSA4KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLmlzVG91cmlzdCgpID8gZ2xHYW1lLnBhbmVsLnNob3dSZWdpc3RyYXRpb24odHJ1ZSkgOiBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwicG9wdWxhcml6ZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgdGhpcy5vbkNsaWNrKFwiY2xvc2VcIilcclxuICAgIH0sXHJcbiAgICAvL+mihuWPluWlluWKsVxyXG4gICAgcmV3YXJkKG5vZGUpIHtcclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLnR5cGU7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uaWQ7XHJcbiAgICAgICAgbGV0IGdyYWRlaWQgPSBub2RlLnBhcmVudC5uYW1lID09IFwicmVnaXN0ZXJib251c1wiID8gdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtLmlkIDogdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtW25vZGUucGFyZW50Lm5hbWVdLmlkO1xyXG4gICAgICAgIGxldCByZXdhcmRDb2luID0gbm9kZS5wYXJlbnQubmFtZSA9PSBcInJlZ2lzdGVyYm9udXNcIiA/IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbS5yZXdhcmQuY29pbiA6IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbVtub2RlLnBhcmVudC5uYW1lXS5yZXdhcmQuY29pbjtcclxuICAgICAgICBsZXQgcmV3YXJkZGltYW5kID0gbm9kZS5wYXJlbnQubmFtZSA9PSBcInJlZ2lzdGVyYm9udXNcIiA/IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbS5yZXdhcmQuZGlhbW9uZCA6IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbVtub2RlLnBhcmVudC5uYW1lXS5yZXdhcmQuZGlhbW9uZDtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZyhcImh0dHAuUmVxRGlzY291bnRzUmVjZWl2ZVwiLCB7IHR5cGU6IHR5cGUsIGlkOiBpZCwgZ3JhZGU6IGdyYWRlaWQgfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICBpZiAocmV3YXJkQ29pbikgYXJyLnB1c2goeyB0eXBlOiBnbEdhbWUuYXdhcmR0eXBlLkNPSU4sIHZhbHVlOiB0aGlzLmdldEZsb2F0KHJld2FyZENvaW4pIH0pO1xyXG4gICAgICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuZ2V0KFwicm9vbVN3aXRjaFwiKSAmJiByZXdhcmRkaW1hbmQpIGFyci5wdXNoKHsgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5ESUFNT05ELCB2YWx1ZTogdGhpcy5nZXRGbG9hdChyZXdhcmRkaW1hbmQpIH0pO1xyXG4gICAgICAgICAgICBpZiAobXNnLmRhdGEudHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KGdsR2FtZS50aXBzLkFOTk9VTkNFLkFXQVJEX1RJUFMsIGFycik7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQubmFtZSA9PSBcInJlZ2lzdGVyYm9udXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbS5zdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbVtub2RlLnBhcmVudC5uYW1lXS5zdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIlJlY2VpdmVlZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNfc2hjZWR1bGVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlVHlwZVwiKSkgbm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNlaXZlVHlwZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtc2cuZGF0YS50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93QXdhcmRCb3goZ2xHYW1lLnRpcHMuQU5OT1VOQ0UuUkVWSUVXX1dBSVRfVElQUywgYXJyKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudC5uYW1lID09IFwicmVnaXN0ZXJib251c1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtLnN0YXRlID0gNDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtW25vZGUucGFyZW50Lm5hbWVdLnN0YXRlID0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiYXVkaXRpbmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiZGVzX3NoY2VkdWxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiUmVjZWl2ZVR5cGVcIikpIG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiUmVjZWl2ZVR5cGVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJTZWNvbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRBbGxyZXdhcmRTdGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIt+aWsOW9k+WJjeWwj+exu+eahOe6oueCuVxyXG4gICAgdXBkYXRlQ3VyU2Vjb25kKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVt0aGlzLm5vd0luZGV4XS5jb250ZW50LnJld2FyZEl0ZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kVmlldy5jaGlsZHJlblt0aGlzLm5vd0luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC5yZXdhcmRJdGVtLnN0YXRlID09IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLnJlY2VpdmVkX3N0YXR1cyA9IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbS5zdGF0ZSA9PSAwID8gMSA6IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLmNvbnRlbnQucmV3YXJkSXRlbTtcclxuICAgICAgICAgICAgbGV0IGRyYXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/liLfmlrDlvZPliY3nuqLngrnkv6Hmga/nmoTmtojmga9cIiwgZHJhdylcclxuICAgICAgICAgICAgaWYgKGRyYXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kVmlldy5jaGlsZHJlblt0aGlzLm5vd0luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLnJlY2VpdmVkX3N0YXR1cyA9IDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kVmlldy5jaGlsZHJlblt0aGlzLm5vd0luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlRGF0YVt0aGlzLm5vd0lkXVt0aGlzLm5vd0luZGV4XS5yZWNlaXZlZF9zdGF0dXMgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaXJzdFJlZCgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yi35paw5LiA57qn6I+c5Y2V57qi54K5XHJcbiAgICB1cGRhdGVGaXJzdFJlZCgpIHtcclxuICAgICAgICBsZXQgZHJhdyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW2ldLnJlY2VpdmVkX3N0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhCeUlkKHRoaXMubm93SWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5Yi35paw5b2T5YmN57qi54K55L+h5oGv55qE5raI5oGvMTExXCIsIHRoaXMuY2FjaGVEYXRhLCBkcmF3KVxyXG4gICAgICAgIHRoaXMuZmlyc3RWaWV3LmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gZHJhdztcclxuICAgICAgICB0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbltpbmRleF0uY2hpbGRyZW5bMV0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IGRyYXc7XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5kZXhCeUlkKGlkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3RWaWV3LmNoaWxkcmVuW2ldLmNoaWxkcmVuWzBdLm5hbWUgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5LiA6ZSu6aKG5Y+W5YWo6YOoXHJcbiAgICBhbGxyZXdhcmQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLlJlcURpc2NvdW50c1JlY2VpdmVBbGxcIiwge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEZXRhaWxEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVxQWN0aXZpdHlkZXRhaWwodGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uaWQsIHRoaXMuY2FjaGVEYXRhW3RoaXMubm93SWRdW3RoaXMubm93SW5kZXhdLnR5cGUsIHRoaXMubm93SW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgICAgIGlmIChtc2cuZGF0YS5jb2luKSBhcnIucHVzaCh7IHR5cGU6IGdsR2FtZS5hd2FyZHR5cGUuQ09JTiwgdmFsdWU6IHRoaXMuZ2V0RmxvYXQobXNnLmRhdGEuY29pbikgfSk7XHJcbiAgICAgICAgICAgIGlmIChnbEdhbWUudXNlci5nZXQoXCJyb29tU3dpdGNoXCIpICYmIG1zZy5kYXRhLmRpYW1vbmQpIGFyci5wdXNoKHsgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5ESUFNT05ELCB2YWx1ZTogdGhpcy5nZXRGbG9hdChtc2cuZGF0YS5kaWFtb25kKSB9KTtcclxuICAgICAgICAgICAgaWYgKG1zZy5kYXRhLmNvaW4gPT0gMCAmJiBtc2cuZGF0YS5yZXZpZXdOdW0gIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dUaXAoZ2xHYW1lLnRpcHMuQU5OT1VOQ0UuUkVWSUVXX1RJUFMuZm9ybWF0KG1zZy5kYXRhLnJldmlld051bSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1zZy5kYXRhLnJldmlld051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KGdsR2FtZS50aXBzLkFOTk9VTkNFLkFXQVJEX1RJUFMsIGFycik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobXNnLmRhdGEuY29pbiAhPSAwICYmIG1zZy5kYXRhLnJldmlld051bSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KGdsR2FtZS50aXBzLkFOTk9VTkNFLkFXQVJEX1JFVklFV19USVBTLmZvcm1hdChtc2cuZGF0YS5yZXZpZXdOdW0pLCBhcnIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+WFqOmDqOmihuWPlueahOa2iOaBr1wiLCBtc2cpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maXJzdFZpZXcuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbltpXS5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Vmlldy5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5nZXRDaGlsZEJ5TmFtZShcInJlZG1hcmtcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY29uZFZpZXcuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZFZpZXcuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDlvLrliLbliLfmlrDnuqLngrlcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVJlZnJlc2hSZWRQb2ludCgpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8v5riF6Zmk5Yi35paw5LmL5ZCO55qE57yT5a2Y5pWw5o2uXHJcbiAgICBjbGVhckRldGFpbERhdGEoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNhY2hlRGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY2FjaGVEYXRhW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZURhdGFbaV1bal0uY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlRGF0YVtpXVtqXS5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbaV1bal0ucmVjZWl2ZWRfc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOe8k+WtmOaVsOaNrlwiLCB0aGlzLmNhY2hlRGF0YSlcclxuICAgICAgICAvL+e9rueBsOS4gOmUrumihuWPllxyXG4gICAgICAgIHRoaXMuYnRuX2FsbHJld2FyZC5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIC8v6L+Z5piv5rS75Yqo6K+m5oOFXHJcbiAgICBhY3Rpdml0eURldGFpbCgpIHtcclxuICAgICAgICBsZXQgZGV0YWlsd2luZG93ID0gZ2xHYW1lLnBhbmVsLnNob3dQYW5lbCh0aGlzLmRldGFpbHdpbmRvdyksXHJcbiAgICAgICAgICAgIHNjcmlwdCA9IGRldGFpbHdpbmRvdy5nZXRDb21wb25lbnQoXCJkZXRhaWx3aW5kb3dcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3nmoTmlbDmja5cIiwgdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0pXHJcbiAgICAgICAgbGV0IHRpdGxlZGV0YWlsID0gdGhpcy5jYWNoZURhdGFbdGhpcy5ub3dJZF1bdGhpcy5ub3dJbmRleF0uY29udGVudC50aXRsZWRldGFpbFxyXG4gICAgICAgIHNjcmlwdC51cGRhdGVEZXRhaWxWaWV3MSh0aXRsZWRldGFpbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaWh+acrOWkhOeQhuebuOWFs1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIHNob3dUZXh0RGVsYXkoY29udGVudCwgTGFiZWxJdGVtKSB7XHJcbiAgICAgICAgTGFiZWxJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGxiQ29tID0gTGFiZWxJdGVtLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IGFzc2VtYmxlciA9IGxiQ29tLl9hc3NlbWJsZXI7XHJcbiAgICAgICAgbGV0IGFzc2VtYmxlckRhdGEgPSBhc3NlbWJsZXIuX2dldEFzc2VtYmxlckRhdGEoKTtcclxuICAgICAgICBsZXQgd3JhcFRleHQgPSB0aGlzLl9jYWxjdWxhdGVMYWJlbEZvbnQoY29udGVudCwgYXNzZW1ibGVyRGF0YS5jb250ZXh0LCB0aGlzLl9nZXRGb250RGVzYyhsYkNvbSksIExhYmVsSXRlbS53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0eHQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkxhYmVsSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIHR4dC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgLy8gdHh0LnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4xKSk7XHJcbiAgICAgICAgICAgIHR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdyYXBUZXh0W2luZGV4KytdO1xyXG4gICAgICAgICAgICB0eHQucGFyZW50ID0gdGhpcy5kZXRhaWxWaWV3MTtcclxuICAgICAgICAgICAgdHh0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMC4wMSwgd3JhcFRleHQubGVuZ3RoIC0gMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRGb250RmFtaWx5KGNvbXApIHtcclxuICAgICAgICBpZiAoIWNvbXAudXNlU3lzdGVtRm9udCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcC5mb250KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcC5mb250Ll9uYXRpdmVBc3NldCkgcmV0dXJuIGNvbXAuZm9udC5fbmF0aXZlQXNzZXQ7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChjb21wLmZvbnQubmF0aXZlVXJsLCAoZXJyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXAuZm9udC5fbmF0aXZlQXNzZXQgPSBhc3NldDtcclxuICAgICAgICAgICAgICAgICAgICBjb21wLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdBcmlhbCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAnQXJpYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXAuZm9udEZhbWlseSB8fCAnQXJpYWwnO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2dldEZvbnREZXNjKGxiKSB7XHJcbiAgICAgICAgbGV0IGZvbnREZXNjID0gbGIuZm9udFNpemUudG9TdHJpbmcoKSArICdweCAnO1xyXG4gICAgICAgIGZvbnREZXNjICs9IHRoaXMuX2dldEZvbnRGYW1pbHkobGIpO1xyXG4gICAgICAgIGlmIChsYi5lbmFibGVCb2xkKSB7XHJcbiAgICAgICAgICAgIGZvbnREZXNjID0gXCJib2xkIFwiICsgZm9udERlc2M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYi5lbmFibGVJdGFsaWMpIHtcclxuICAgICAgICAgICAgZm9udERlc2MgPSBcIml0YWxpYyBcIiArIGZvbnREZXNjO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9udERlc2M7XHJcbiAgICB9LFxyXG5cclxuICAgIF9tZWFzdXJlVGV4dChjdHgsIGZvbnREZXNjKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoY3R4LCBzdHJpbmcsIGZvbnREZXNjKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2FsY3VsYXRlV3JhcFRleHQoY29udGV4dCwgZm9udERlc2MsIHBhcmFncmFwaGVkU3RyaW5ncywgbm9kZVdpZHRoKSB7XHJcbiAgICAgICAgbGV0IF9zcGxpdGVkU3RyaW5ncyA9IFtdO1xyXG4gICAgICAgIGxldCBjYW52YXNXaWR0aE5vTWFyZ2luID0gbm9kZVdpZHRoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxXaWR0aCA9IGNjLnRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoY29udGV4dCwgcGFyYWdyYXBoZWRTdHJpbmdzW2ldLCBmb250RGVzYyk7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0RnJhZ21lbnQgPSBjYy50ZXh0VXRpbHMuZnJhZ21lbnRUZXh0KHBhcmFncmFwaGVkU3RyaW5nc1tpXSxcclxuICAgICAgICAgICAgICAgIGFsbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY2FudmFzV2lkdGhOb01hcmdpbixcclxuICAgICAgICAgICAgICAgIHRoaXMuX21lYXN1cmVUZXh0KGNvbnRleHQsIGZvbnREZXNjKSk7XHJcbiAgICAgICAgICAgIF9zcGxpdGVkU3RyaW5ncyA9IF9zcGxpdGVkU3RyaW5ncy5jb25jYXQodGV4dEZyYWdtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfc3BsaXRlZFN0cmluZ3M7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jYWxjdWxhdGVMYWJlbEZvbnQodHh0LCBjb250ZXh0LCBmb250RGVzYywgbm9kZVdpZHRoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFncmFwaGVkU3RyaW5ncyA9IHR4dC5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udERlc2M7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGVXcmFwVGV4dChjb250ZXh0LCBmb250RGVzYywgcGFyYWdyYXBoZWRTdHJpbmdzLCBub2RlV2lkdGgpO1xyXG4gICAgfSxcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUudXNlci5SZXFSZWREb3QoKTtcclxuICAgICAgICBnbEdhbWUudXNlci5yZXFHZXRDb2luKCk7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIucmVxR2V0RGlhbW9uZCgpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcIlJlcVJlZERvdFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
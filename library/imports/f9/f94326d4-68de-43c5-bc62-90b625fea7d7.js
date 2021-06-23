"use strict";
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
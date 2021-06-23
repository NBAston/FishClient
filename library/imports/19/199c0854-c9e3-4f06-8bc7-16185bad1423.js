"use strict";
cc._RF.push(module, '199c0hUyeNPBovHFhhbrRQj', 'detailwindow');
// modules/plaza/script/prefab/announcement/detailwindow.js

"use strict";

glGame.baseclass.extend({
  properties: {
    detailView1: cc.Node,
    contentItem: cc.Node,
    iconArr: [cc.SpriteFrame],
    imageItem: cc.Node,
    //以下为表格生成用到
    barItem: cc.Node,
    lineItem: cc.Node,
    wordItem: cc.Node,
    formView: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      default:
        console.log(" btn name: ", name);
        break;
    }
  },
  //更新详细信息
  updateDetailView1: function updateDetailView1(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].title == "活动细则" || data[i].title == "活动规则与条款") continue;

      if (data[i].type == 4 && data[i].img && data[i].img != "") {
        var imageItem = cc.instantiate(this.imageItem);
        glGame.panel.showRemoteImage(imageItem, data[i].img);
        imageItem.parent = this.detailView1;
        imageItem.active = true;
        continue;
      } else if (data[i].img == "") {
        continue;
      }

      if (data[i].title === "活动表格") {
        this.initform(data[i].content);
        continue;
      }

      var contentItem = cc.instantiate(this.contentItem);
      contentItem.parent = this.detailView1;
      contentItem.active = true;
      contentItem.getChildByName("Tip").getComponent(cc.Label).string = data[i].title + "：";
      contentItem.getChildByName("img_icon").getComponent(cc.Sprite).spriteFrame = this.iconArr[data[i].icon];

      if (data[i].title == "活动介绍") {
        contentItem.getChildByName("content2").active = true;
        contentItem.getChildByName("content2").getComponent(cc.Label).string = data[i].content;
      } else {
        contentItem.getChildByName("content1").active = true;
        contentItem.getChildByName("content1").getComponent(cc.Label).string = data[i].content;
      }
    }
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

    for (var _i = lengthBest; _i >= 1; _i--) {
      total += formView.children[formView.childrenCount - _i].width;
    }

    var distance = (formView.width - total) / (data[0].length + 1);
    total = 0;
    var distanceArr = [];

    for (var _i2 = lengthBest; _i2 >= 1; _i2--) {
      total += formView.children[formView.childrenCount - _i2].width + distance;
      distanceArr.push(total);
    }

    var Count = 1;
    var Posy = -50;

    for (var _i3 = 0; _i3 < data.length; _i3++) {
      for (var _j = 0; _j < data[_i3].length; _j++) {
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

        if (_i3 % 2 == 0) {
          var barItem = cc.instantiate(this.barItem);
          barItem.parent = formView.getChildByName("bg");
          barItem.active = true;
          barItem.y = Posy; //barItem.width = formView.width - 15;
        }

        Count++;
      }

      Posy -= 50;
    }
  } // update (dt) {},

});

cc._RF.pop();
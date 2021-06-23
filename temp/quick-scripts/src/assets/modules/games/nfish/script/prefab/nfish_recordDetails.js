"use strict";
cc._RF.push(module, '19780rykPdAK6umVqdsmkmk', 'nfish_recordDetails');
// modules/games/nfish/script/prefab/nfish_recordDetails.js

"use strict";

var CONST = require("nfishConst");

var CUT_TYPE = {
  BULLET: 1,
  FISH: 2
}; //捕鱼：详情

glGame.baseclass.extend({
  properties: {
    //子弹列表
    bullet_scrollView: cc.ScrollView,
    bullet_content: cc.Node,
    bullet_item: cc.Node,
    //鱼列表
    fish_scrollView: cc.ScrollView,
    fish_content: cc.Node,
    fish_item: cc.Node,
    //按钮切换
    bullet_bottom: cc.Node,
    fish_bottom: cc.Node
  },
  onLoad: function onLoad() {},
  initDetView: function initDetView(recordData, list, viewtype) {
    this.bullet_content.removeAllChildren();
    this.fish_content.removeAllChildren(); //时间格式化

    Date.prototype.Format = function (fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1,
        //月份
        "d+": this.getDate(),
        //日
        "h+": this.getHours(),
        //小时
        "m+": this.getMinutes(),
        //分
        "s+": this.getSeconds(),
        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度
        "S": this.getMilliseconds() //毫秒

      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }

      return fmt;
    };

    this.gameID = glGame.scenetag.FISH2;
    this.gameLevel = glGame.room.getRoomType(this.gameID);
    var hand_number = recordData["hand_number"]; //牌局编号

    var profit = Number(recordData["number"]); //结算

    var gainFee = this.cutDownNum(Number(recordData["gainFee"])); //抽水

    var bet_coin = this.cutDownNum(Number(recordData["bet_coin"])); //炮弹金额

    var coin = Number(Number(this.cutDownNum(profit)) + Number(gainFee) + Number(bet_coin)).toFixed(2); //捕获金额

    var roomStr = this.gameLevel[recordData["bettype"]]; //房间

    var panel = this.node.getChildByName("viewInfo");
    panel.getChildByName("lab_no").getComponent(cc.Label).string = hand_number + "";
    panel.getChildByName("lab_room").getComponent(cc.Label).string = roomStr + "";
    panel.getChildByName("lab_bullteCoin").getComponent(cc.Label).string = bet_coin + "";
    panel.getChildByName("lab_coin").getComponent(cc.Label).string = coin + "";
    var number = panel.getChildByName(profit > 0 ? "lab_win" : "lab_lost");
    number.getComponent(cc.Label).string = profit > 0 ? "+".concat(this.cutDownNum(profit)) : this.cutDownNum(profit);
    panel.getChildByName("lab_endTime").getComponent(cc.Label).string = recordData["end_time"];
    number.active = true;
    this.list = list;
    this.showView(viewtype);
  },
  //type = 1 是 子弹 其余的是 鱼
  showView: function showView(type) {
    if (type == this.currType) {
      return;
    }

    this.currType = type;
    this.bullet_bottom.active = type == CUT_TYPE.BULLET;
    this.fish_bottom.active = type == CUT_TYPE.FISH; //标题

    var titleFish = this.node.getChildByName("ui_txt_line").getChildByName("fishView");
    var titleBullet = this.node.getChildByName("ui_txt_line").getChildByName("bulletView");
    titleBullet.active = type == CUT_TYPE.BULLET;
    titleFish.active = !titleBullet.active; //列表 容器

    var Show = 255;
    var Close = 1;
    var ShowIndexZ = 10;
    var CloseIndexZ = 8;
    this.bullet_scrollView.node.opacity = type == CUT_TYPE.BULLET ? Show : Close;
    this.fish_scrollView.node.opacity = type == CUT_TYPE.FISH ? Show : Close;
    this.bullet_scrollView.node.zIndex = type == CUT_TYPE.BULLET ? ShowIndexZ : CloseIndexZ;
    this.fish_scrollView.node.zIndex = type == CUT_TYPE.FISH ? ShowIndexZ : CloseIndexZ; //容器content

    if (type == CUT_TYPE.BULLET && this.bullet_content.childrenCount > 0) {
      return;
    }

    if (type != CUT_TYPE.BULLET && this.fish_content.childrenCount > 0) {
      return;
    }

    if (type == CUT_TYPE.BULLET) {
      this.bullet_content.removeAllChildren();
    } else {
      this.fish_content.removeAllChildren();
    }

    if (type == CUT_TYPE.FISH) {
      //鱼
      var fishList = [];
      var fishListIndex = [];

      for (var i = 0; i < this.list.length; i++) {
        var fishId = Number(this.list[i].fishId);
        var fishName = this.list[i].fishName;
        var reward = 0;
        var pc = 0;
        var captureTime = null;
        var rewardTimeFormNumber = 0;
        var consume = 0;
        var profit = 0;
        var isKilled = false;

        if (fishListIndex.indexOf(fishId) == -1) {
          for (var j = 0; j < this.list.length; j++) {
            if (fishId == Number(this.list[j].fishId)) {
              var d = this.list[j];

              if (d.reward > 0) {
                reward += Number(d.reward);
                pc += Number(d.consume) + Number(d.profit);
              }

              rewardTimeFormNumber = d.date;
              consume += Number(d.consume);
              profit += Number(d.profit);

              if (d.isKilled) {
                isKilled = true;
                captureTime = new Date(d.date).Format("yyyy-MM-dd hh:mm:ss");
              }
            }
          }

          fishListIndex.push(fishId);
          fishList.push({
            fishId: fishId,
            fishName: fishName,
            pc: pc,
            reward: reward,
            consume: consume,
            profit: profit,
            captureTime: captureTime,
            time: rewardTimeFormNumber,
            isKilled: isKilled
          });
        }
      }

      fishList.sort(function (a, b) {
        return b.time - a.time;
      });

      for (var _i = 0; _i < fishList.length; _i++) {
        var _d = fishList[_i];
        var itemNode = cc.instantiate(this.fish_item);
        itemNode.active = false;
        itemNode.getChildByName("lab_no").getComponent(cc.Label).string = _d.fishId + ""; //鱼编号

        itemNode.getChildByName("lab_fishName").getComponent(cc.Label).string = _d.fishName + ""; //鱼 名字

        itemNode.getChildByName("lab_getTime").getComponent(cc.Label).string = "未捕获";

        if (_d.isKilled) {
          itemNode.getChildByName("lab_getTime").getComponent(cc.Label).string = _d.captureTime;
        }

        itemNode.getChildByName("lab_consume").getComponent(cc.Label).string = this.cutDownNum(_d.consume) + ""; //总消耗

        itemNode.getChildByName("lab_distribute").getComponent(cc.Label).string = this.cutDownNum(_d.reward) + ""; //派彩

        itemNode.getChildByName("lab_win").getComponent(cc.Label).string = "+" + this.cutDownNum(_d.profit); //损益 正

        itemNode.getChildByName("lab_lost").getComponent(cc.Label).string = this.cutDownNum(_d.profit) + ""; //损益 负

        itemNode.getChildByName("lab_win").active = _d.profit >= 0;
        itemNode.getChildByName("lab_lost").active = _d.profit < 0;
        itemNode.parent = this.fish_content;
        itemNode.getChildByName("img_tiao").active = _i % 2 != 0;
      }

      glGame.panel.showEffectNode(this, this.fish_content, 0.02, true);
    } else if (type == CUT_TYPE.BULLET) {
      //子弹
      for (var _i2 = 0; _i2 < this.list.length; _i2++) {
        var bulletData = this.list[_i2];

        var _itemNode = void 0;

        var currTime = new Date(bulletData.date).Format("yyyy-MM-dd hh:mm:ss");
        _itemNode = cc.instantiate(this.bullet_item);
        _itemNode.active = false;
        _itemNode.getChildByName("lab_no").getComponent(cc.Label).string = bulletData.id + ""; //子弹编号

        _itemNode.getChildByName("lab_time").getComponent(cc.Label).string = currTime + ""; //时间

        _itemNode.getChildByName("lab_type").getComponent(cc.Label).string = CONST.CannonDesc[Number(bulletData.cannonType)]; //类型

        _itemNode.getChildByName("lab_consume").getComponent(cc.Label).string = this.cutDownNum(bulletData.consume) + ""; //消耗

        _itemNode.getChildByName("lab_fiashName").getComponent(cc.Label).string = bulletData.fishName + ""; //鱼

        _itemNode.getChildByName("lab_win_capture").active = bulletData.isKilled; //是否 捕获

        _itemNode.getChildByName("lab_lost_capture").active = !_itemNode.getChildByName("lab_win_capture").active; //是否 捕获

        _itemNode.getChildByName("lab_distribute").getComponent(cc.Label).string = this.cutDownNum(Number(bulletData.consume) + Number(bulletData.profit)) + ""; //派彩

        _itemNode.parent = this.bullet_content;
        _itemNode.getChildByName("img_tiao").active = _i2 % 2 != 0;
      }

      glGame.panel.showEffectNode(this, this.bullet_content, 0.02, true);
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "ui_BtnClose":
        this.node.parent.parent.destroy();
        this.remove();
        break;

      case "img_back":
        this.remove();
        break;

      case "btn_zidananniu":
        this.showView(CUT_TYPE.BULLET);
        break;

      case "btn_fishanniu":
        this.showView(CUT_TYPE.FISH);
        break;

      default:
        break;
    }
  },
  OnDestroy: function OnDestroy() {
    this.gameRecord = null;
  },
  //截取小数点后两位
  cutDownNum: function cutDownNum(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.div(100).toString();
    } else {
      value = Number(value).div(100);
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  },

  /**
   * @param event
   * @param type UI编辑器传参 有值就不做按钮连点过滤(且不等于特殊音效字段)  使用select分页按钮
   * @Explain Button点击事件统一调用
   */
  OnClickButton: function OnClickButton(event, type) {
    var buttonName = event.target.name;
    var buttonNode = event.target;
    console.log("\u70B9\u51FB\u4E86button -> ".concat(buttonName));

    switch (buttonName) {
      case "close_eff":
        //当前界面有播放特长音效的关闭按钮
        glGame.audio.closeCurEffect();
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      case "close":
        glGame.audio.playLoadSoundEffectByPath("close");
        break;

      default:
        if (type == "select") glGame.audio.playLoadSoundEffectByPath("select");else glGame.audio.playLoadSoundEffectByPath("click");
    }

    this.onClick(buttonName, buttonNode);
  }
});

cc._RF.pop();
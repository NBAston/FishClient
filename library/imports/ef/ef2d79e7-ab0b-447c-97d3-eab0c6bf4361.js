"use strict";
cc._RF.push(module, 'ef2d7nnqwtEfJfT6rDGv0Nh', 'qznnCreate');
// modules/plaza/script/prefab/room/sonGame/qznnCreate.js

"use strict";

var ROOM_MODE = {
  RoomCharge_OwnerPay: "房主支付：创建房间时，房主一次性支付房费$钻石。",
  //房主支付模式
  RoomCharge_Average: "平摊房费：加入房间时，每人需支付房费$钻石。",
  //平摊房费模式
  RoomCharge_WinnerApportion: "赢家分摊：结算时，赢家需按赢钱比例支付房费。（总房费：$钻石）" //赢家分摊模式

}; //与服务端协商的映射关系 宏

var ROOM_MODE_INDEX = {
  RoomCharge_OwnerPay: 1,
  //房主支付模式
  RoomCharge_Average: 2,
  //平摊房费模式
  RoomCharge_WinnerApportion: 3,
  //赢家分摊模式
  Action_Free: 4 //免费

};
var Action_Free = "免费：活动期间，房费全免。";
var ROOM_TYPE = {
  PAY: 1,
  //付费模式
  FREE: 2 //免费模式

};
var modeRegex = /\$/gi;
glGame.baseclass.extend({
  properties: {
    // 选择局数
    turnsList: cc.Node,
    turnsItem: cc.Node,
    // 选择人数
    seatsList: cc.Node,
    seatsItem: cc.Node,
    nodeMask: cc.Node,
    //列表遮罩
    //抢庄时间
    labGrab: cc.Label,
    grabList: cc.Node,
    grabItem: cc.Node,
    //下注时间
    labBet: cc.Label,
    betList: cc.Node,
    betItem: cc.Node,
    //房费模式
    labMode: cc.Label,
    modeList: cc.Node,
    modeItem: cc.Node,
    btnMode: cc.Button
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var _this = this;

    this.gameId = glGame.scenetag.RQZNN;
    this.gameData = null;
    this.turnsIndex = 0;
    this.seats = 0;
    this.ratioIndex = 0;
    this.grabTime = 0;
    this.betTime = 0;
    this.modeIndex = null;
    this.registerEvent();
    glGame.gameNet.send_msg('http.ReqRoomGameConfig', {
      id: this.gameId
    }, function (route, msg) {
      _this.gameData = msg.result;
      console.log("qznnCreate ===> 从网络获取", _this.gameData);

      _this.initUi();
    });
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("roomgameupdateend", this.createRoom, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("roomgameupdateend", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "mask":
        this.click_mask();
        break;

      case "btn_grab":
        this.click_grabOpen();
        break;

      case "btn_betTime":
        this.click_betOpen();
        break;

      case "btn_mode":
        this.click_modeOpen();
        break;

      case "btn_create":
        this.click_createRoom();
        break;

      default:
        if (name.indexOf("turns_") > -1) this.click_Turns(name);
        if (name.indexOf("seats_") > -1) this.click_Seats(name);
        if (name.indexOf("ratio_") > -1) this.click_Ratio(name);
        if (name.indexOf("grab_") > -1) this.click_GrabTime(name);
        if (name.indexOf("bet_") > -1) this.click_BetTime(name);
        if (name.indexOf("mode_") > -1) this.click_Mode(name);
        break;
    }
  },
  initUi: function initUi() {
    this.initTurns();
    this.initSeats();
    this.initGrabTimes();
    this.initBetTimes();
    this.initGameMode();
  },
  // 设置牌局初始化
  initTurns: function initTurns() {
    var TurnsData = this.gameData.configure.Innings;

    for (var key in TurnsData) {
      var item = cc.instantiate(this.turnsItem);
      item.active = true;
      item.name = "turns_".concat(key);
      this.setToggleText(item, "".concat(TurnsData[key], "\u5C40"));
      this.turnsList.addChild(item);
    }
  },
  // 设置人数初始化
  initSeats: function initSeats() {
    var SeatsData = this.gameData.configure.Seats;

    for (var key in SeatsData) {
      var item = cc.instantiate(this.seatsItem);
      item.active = true;
      item.name = "seats_".concat(key);
      this.setToggleText(item, "".concat(SeatsData[key], "\u4EBA"));
      this.seatsList.addChild(item);
    }

    this.seats = SeatsData[0];
  },
  setToggleText: function setToggleText(node, strData) {
    node.getChildByName("Background").getChildByName("text").getComponent(cc.Label).string = strData;
    node.getChildByName("checkmark").getChildByName("text").getComponent(cc.Label).string = strData;
  },
  // 设置抢庄时间初始化
  initGrabTimes: function initGrabTimes() {
    var bankerTimes = this.gameData.configure.BankerTimes;

    for (var key in bankerTimes) {
      var item = cc.instantiate(this.grabItem);
      item.active = true;
      item.name = "grab_".concat(key);
      item.getChildByName("text").getComponent(cc.Label).string = "".concat(bankerTimes[key], "\u79D2");
      this.grabList.addChild(item);
    }

    this.grabTime = bankerTimes[0];
    this.labGrab.string = "".concat(this.grabTime, "\u79D2");
  },
  // 设置下注时间初始化
  initBetTimes: function initBetTimes() {
    var betTimes = this.gameData.configure.BetTimes;

    for (var key in betTimes) {
      var item = cc.instantiate(this.betItem);
      item.active = true;
      item.name = "bet_".concat(key);
      item.getChildByName("text").getComponent(cc.Label).string = "".concat(betTimes[key], "\u79D2");
      this.betList.addChild(item);
    }

    this.betTime = betTimes[0];
    this.labBet.string = "".concat(this.betTime, "\u79D2");
  },
  // 设置房间模式初始化
  initGameMode: function initGameMode() {
    if (this.gameData.costFlag == ROOM_TYPE.FREE) {
      this.labMode.string = Action_Free;
      this.modeIndex = "Action_Free";
      this.btnMode.interactable = false;
      this.btnMode.node.getChildByName("img_jiantou").active = false;
    } else {
      this.modeList.removeAllChildren();
      var gameMode = this.gameData.configure;
      var index = 0;

      for (var key in ROOM_MODE) {
        if (gameMode[key] != 1) continue;
        if (!this.modeIndex) this.modeIndex = key;
        var item = cc.instantiate(this.modeItem);
        item.active = true;
        item.name = "mode_".concat(key);
        item.getChildByName("text").getComponent(cc.Label).string = ROOM_MODE[key].replace(modeRegex, "".concat(this.getModeDiamonds(key)));
        this.modeList.addChild(item);

        if (index++ == 0) {
          item.getChildByName("img_linesmall").active = false;
        }
      }

      this.labMode.string = ROOM_MODE[this.modeIndex].replace(modeRegex, "".concat(this.getModeDiamonds(this.modeIndex)));
    }
  },
  getModeDiamonds: function getModeDiamonds(key) {
    var gameMode = this.gameData.configure,
        diamonds = 0,
        SeatsData = gameMode.Seats;

    if (key == "RoomCharge_Average") {
      diamonds = Math.ceil(gameMode.Prices[this.turnsIndex] / SeatsData[SeatsData.length - 1]);
    } else {
      diamonds = Math.ceil(gameMode.Prices[this.turnsIndex] / SeatsData[SeatsData.length - 1] * this.seats);
    }

    return this.getFixNumber(diamonds);
  },
  // 
  click_Turns: function click_Turns(name) {
    var string = name.substring(6);
    this.turnsIndex = Number(string);
    this.initGameMode();
  },
  click_Seats: function click_Seats(name) {
    var string = name.substring(6);
    var SeatsData = this.gameData.configure.Seats;
    this.seats = SeatsData[Number(string)];
    this.initGameMode();
  },
  click_Ratio: function click_Ratio(name) {
    var string = name.substring(6);
    this.ratioIndex = Number(string);
  },
  click_GrabTime: function click_GrabTime(name) {
    var string = name.substring(5);
    var bankerTimes = this.gameData.configure.BankerTimes;
    this.grabTime = bankerTimes[Number(string)];
    this.labGrab.string = "".concat(this.grabTime, "\u79D2");
    this.click_mask();
  },
  click_BetTime: function click_BetTime(name) {
    var string = name.substring(4);
    var betTimes = this.gameData.configure.BetTimes;
    this.betTime = betTimes[Number(string)];
    this.labBet.string = "".concat(this.betTime, "\u79D2");
    this.click_mask();
  },
  click_Mode: function click_Mode(name) {
    var string = name.substring(5);
    this.modeIndex = string;
    this.labMode.string = ROOM_MODE[this.modeIndex].replace(modeRegex, "".concat(this.getModeDiamonds(this.modeIndex)));
    this.click_mask();
  },
  click_mask: function click_mask() {
    this.nodeMask.active = false;
    this.grabList.active = false;
    this.betList.active = false;
    this.modeList.active = false;
  },
  click_grabOpen: function click_grabOpen() {
    this.grabList.active = !this.grabList.active;
    this.nodeMask.active = this.grabList.active;
    this.betList.active = false;
    this.modeList.active = false;
  },
  click_betOpen: function click_betOpen() {
    this.betList.active = !this.betList.active;
    this.nodeMask.active = this.betList.active;
    this.grabList.active = false;
    this.modeList.active = false;
  },
  click_modeOpen: function click_modeOpen() {
    this.modeList.active = !this.modeList.active;
    this.nodeMask.active = this.modeList.active;
    this.grabList.active = false;
    this.betList.active = false;
  },
  createRoom: function createRoom() {
    var msg = {};
    msg.RentType = ROOM_MODE_INDEX[this.modeIndex];
    msg.Seat = this.seats;
    msg.BetTime = this.betTime;
    msg.BankerTime = this.grabTime;
    msg.CardTimesIndex = this.ratioIndex;
    var TurnsData = this.gameData.configure.Innings;
    msg.Inning = TurnsData[this.turnsIndex];
    glGame.room.CreateRoom(this.gameId, msg);
  },
  // 创建房间
  click_createRoom: function click_createRoom() {
    var _this2 = this;

    glGame.room.reqMyGameState(this.gameId).then(function () {
      if (glGame.user.suspicious == 1 && glGame.user.game == 2 || glGame.user.is_game == 2) {
        glGame.panel.showDialog("", "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！", function () {
          glGame.panel.showService();
        }, function () {}, "我知道了", "联系客服");
        return;
      }

      _this2.createRoom(); // if (this.gameConfig.EntranceRestrictions > glGame.user.get("coin")) {
      //     console.log("这是当前的房间限制", this.gameConfig)
      //     let string = `<color=#99C7FF>您的金币不足，该房间需要</c> <color=#ff0000> ${this.getFloat(this.gameConfig.EntranceRestrictions)}  </c><color=#99C7FF>金币才可下注，是否马上前往充值？</c>`
      //     glGame.panel.showDialog("", string, () => { glGame.panel.showShop(100) }, () => { }, "取消", "充值");
      //     return
      // }

    });
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
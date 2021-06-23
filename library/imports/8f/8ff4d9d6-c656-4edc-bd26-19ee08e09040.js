"use strict";
cc._RF.push(module, '8ff4dnWxlZO3L0mGe4I4JBA', 'up');
// modules/plaza/script/prefab/up.js

"use strict";

var RotateTime = 0.1;
var ScaleTime = 0.2;
glGame.baseclass.extend({
  properties: {
    tourist: cc.Node,
    //游客信息显示
    formalPlayer: cc.Node,
    //正式会员信息显示
    web_label: cc.Label,
    //玩家信息
    head_bg: cc.Node,
    //玩家头像以及红点父节点
    lab_userCoin: cc.Label,
    //玩家金币
    lab_userName: cc.Label,
    //玩家名字
    lab_userVip: cc.Label,
    //玩家vip等级
    userhead: cc.Node,
    //按钮
    btn_recharge: cc.Node,
    //btn_rank: cc.Node,
    // btn_signin: cc.Node,
    btn_more: cc.Node,
    moreButton: cc.Prefab,
    fullscreen: cc.Node,
    //logo
    logo_pos: cc.Node,
    node_logo: cc.Prefab
  },
  onLoad: function onLoad() {
    this.countdown = 0;
    this.webUrl = "";
    this.registerEvent();
    this.showUserInfo();
    this.userurldata();
    this.reqRedDot();
    glGame.panel.showChildPanel(this.node_logo, this.logo_pos);
    this.node.getChildByName("lab_bg").active = false;
    this.node.getChildByName("lab_devDesc").active = false;
    this.node.getChildByName("lab_devVersion").active = false; // this.btn_recharge.active = isEnableHotUpdate;

    if (!this.btn_recharge.active) {
      this.lab_userCoin.node.x = 0;
    } // this.interval = setInterval(()=> {
    //     this.setFullScreenState();
    // }, 500);


    this.setFullScreenState();
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateReqRebateRecord", this.showPump, this);
    glGame.emitter.on('updateSigninActive', this.showSignin, this);
    glGame.emitter.on("updateUserData", this.showUserInfo, this);
    glGame.emitter.on("showBindPhone", this.click_upgradeacc, this);
    glGame.emitter.on("ReqRedDot", this.reqRedDot, this);
    glGame.emitter.on("userurldata", this.userurldata, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateReqRebateRecord", this);
    glGame.emitter.off('updateSigninActive', this);
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("showBindPhone", this);
    glGame.emitter.off("ReqRedDot", this);
    glGame.emitter.off("userurldata", this);
  },
  //url的显示数据
  userurldata: function userurldata() {
    if (!glGame.user.get("url")) return;
    var webUrl = this.webUrl = glGame.user.get("url").official_url;

    if (webUrl[0] == 'h' && webUrl[1] == 't' && webUrl[2] == 't' && webUrl[3] == 'p' && webUrl[4] == ':') {
      webUrl = webUrl.substr(7);
    }

    if (webUrl[0] == 'h' && webUrl[1] == 't' && webUrl[2] == 't' && webUrl[3] == 'p' && webUrl[4] == 's') {
      webUrl = webUrl.substr(8);
    }

    webUrl = "".concat(webUrl);
    this.web_label.string = webUrl ? webUrl : ""; //this.web_label._updateRenderData(true)

    if (this.web_label.node.width > 150) {
      this.web_label.node.anchorX = 0;
      this.web_label.node.x = -80;
    }
  },
  reqRedDot: function reqRedDot(data) {
    if (!data) data = glGame.user.get('redDotData');
    var count = 0;

    for (var i in data) {
      count++;
    }

    ;
    if (count == 0) return; //this.btn_lucky.getChildByName("redMark").active = data['dialRed'] == 1;
    // this.btn_signin.getChildByName("redMark").active = data['signinReq'] == 1;

    this.head_bg.getChildByName("redMark").active = data['vipReq'] == 1;

    if (data['dialRed'] == 1 && glGame.user.dialSwitch == 1 || data['payingReq'] == 1 || data['signinReq'] == 1) {
      this.btn_more.getChildByName("redMark").active = true;
    } else {
      this.btn_more.getChildByName("redMark").active = false;
    }
  },
  showPump: function showPump() {
    var userPumpRecord = glGame.user.get("userPumpRecord");
    var gameRecord = userPumpRecord;

    if (!gameRecord) {
      return glGame.user.ReqRebateRecord();
    }
  },
  showSignin: function showSignin() {
    var isOpenSign = glGame.user.get("isOpenSign");
    this.signinbtn.active = isOpenSign.sign_state == 1;
  },
  cutFloat: function cutFloat(num) {
    return this.getFloat(Number(num).div(100));
  },
  //浮点型运算取俩位
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  },
  // updateUserData 事件回调函数, 刷新玩家信息UI
  showUserInfo: function showUserInfo() {
    if (glGame.user.isTourist()) {
      //是否为游客
      this.tourist.active = true;
      this.formalPlayer.active = false;
    } else {
      this.tourist.active = false;
      this.formalPlayer.active = true;
      this.lab_userCoin.string = glGame.user.GoldTemp(glGame.user.get("coin"));
      this.lab_userName.string = glGame.user.get("nickname");
      glGame.panel.showHeadImage(this.userhead, glGame.user.get("headURL"));
      console.log("头像加载问题", this.head_bg.getChildByName("userHead"), glGame.user.get("headURL"));
      this.lab_userVip.string = glGame.user.get("vip_name");
    }
  },
  // 重写父类按钮点击事件
  onClick: function onClick(name, node) {
    var _this = this;

    switch (name) {
      case "btn_head_bg":
      case "userInfo":
        this.click_head();
        break;

      case "gold":
        this.click_addgold();
        break;

      case "upgradeacc":
      case "btn_zhuce":
        this.click_upgradeacc();
        break;

      case "btn_denglu":
        glGame.panel.showRegister();
        break;

      case "btn_dengluzhuce":
        glGame.panel.showRegister();
        break;

      case "notice":
        this.click_notice();
        break;

      case "setting":
        this.click_setting();
        break;

      case "welfare":
        this.click_welfare();
        break;

      case "btn_setting":
        this.click_setting();
        break;

      case "btn_fuzhi":
        this.click_officialweb();
        break;

      case "btn_service":
        this.click_service();
        break;

      case "btn_more":
        this.click_more();
        break;

      case "btn_fullscreen":
        this.click_fullscreen();
        break;

      case "btn_devVersion":
        if (glGame.isDevelop) {
          this.node.getChildByName("lab_bg").active = true;
          this.node.getChildByName("lab_devDesc").active = true;
          this.node.getChildByName("lab_devVersion").active = true;
          this.node.getChildByName("lab_devVersion").getComponent(cc.Label).string = glGame.devVersion + "";
          this.scheduleOnce(function () {
            _this.node.getChildByName("lab_devDesc").active = false;
            _this.node.getChildByName("lab_devVersion").active = false;
            _this.node.getChildByName("lab_bg").active = false;
          }, 30);
        }

        break;

      case "btn_recharge":
        if (this.countdown == 0) {
          this.countdown = 20;

          var funUp = function funUp() {
            this.countdown--;
            if (this.countdown == 0) this.unschedule(funUp);
          };

          this.schedule(funUp, 1);
          node.runAction(cc.sequence(cc.rotateBy(1, 1080), cc.rotateBy(0, 0)));
          glGame.gameNet.send_msg("http.reqBack", {}, function (route, msg) {});
        } else {
          console.log("现在定时器到时间是：countdown=", this.countdown);
          glGame.panel.showTip("\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
        }

        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_more: function click_more() {
    glGame.panel.showPanel(this.moreButton);
  },
  click_fullscreen: function click_fullscreen() {
    var _this2 = this;

    if (this.isFullScreen()) {
      cc.screen.exitFullScreen();
    } else {
      cc.screen.requestFullScreen(null, function () {
        _this2.setFullScreenState();
      }, function () {
        _this2.setFullScreenState();
      });
    }
  },
  click_service: function click_service() {
    glGame.panel.showService();
  },
  click_officialweb: function click_officialweb() {
    glGame.platform.copyToClip(this.webUrl, "官网复制成功");
  },
  click_head: function click_head() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.panel.showPanelByName("userinfo");
  },
  click_addgold: function click_addgold() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("recharge")) {
      return;
    }

    glGame.panel.showShop();
  },
  click_upgradeacc: function click_upgradeacc() {
    glGame.panel.showRegistration();
  },
  click_notice: function click_notice() {
    glGame.panel.showPanelByName("notice");
  },
  // click_setting() {
  //     glGame.panel.showSetting(false);
  // },
  click_welfare: function click_welfare() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.panel.showPanelByName("announcement");
  },
  click_setting: function click_setting() {
    glGame.panel.showPanelByName("settings");
  },
  setFullScreenState: function setFullScreenState() {
    if (!cc.sys.isBrowser || !cc.screen._supportsFullScreen) {
      this.fullscreen.active = false;
      return;
    }

    this.fullscreen.getChildByName("img_fullscreen").active = !this.isFullScreen();
    this.fullscreen.getChildByName("img_window").active = this.isFullScreen();
  },
  isFullScreen: function isFullScreen() {
    if (!cc.sys.isBrowser) {
      return false;
    }

    if (Math.abs(window.screen.width - document.body.scrollWidth) <= 2 && Math.abs(window.screen.height - document.body.scrollHeight) <= 2) {
      return true;
    }

    return false;
  }
});

cc._RF.pop();
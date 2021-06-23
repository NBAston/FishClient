"use strict";
cc._RF.push(module, '05e8en7gO5Izb9JEk/QpaVH', 'changehead');
// modules/plaza/script/prefab/userInfo/popups/changehead.js

"use strict";

/**
 * 更新头像面板
 */
glGame.baseclass.extend({
  properties: {
    scrollview: cc.ScrollView,
    listview: cc.Node,
    // 头像滑动列表
    headItem: cc.Node,
    // 头像Item Node
    node_re: cc.Node,
    man: cc.Node,
    woman: cc.Node
  },
  onLoad: function onLoad() {
    this.sex = glGame.user.get("userSex");
    this.isLock = false;
    this.resetData();
    this.headMax = 20;
    glGame.emitter.on("upheadlist", this.showUI, this);

    if (glGame.user.get("headList")[this.sex]) {
      this.showUI(this.sex);
    } else {
      glGame.user.reqGetHeadList(this.sex, this.headMax);
    }
  },
  // 初始化界面数据
  resetData: function resetData() {
    this.clickHeadItemID = null;

    if (glGame.user.get("userSex") == 1) {
      this.man.getComponent(cc.Toggle).isChecked = true;
      this.woman.getComponent(cc.Toggle).isChecked = false;
    } else if (glGame.user.get("userSex") == 2) {
      this.man.getComponent(cc.Toggle).isChecked = false;
      this.woman.getComponent(cc.Toggle).isChecked = true;
    }

    this.man.on("toggle", this.OnClickToggle, this);
    this.woman.on("toggle", this.OnClickToggle, this);
  },
  // 显示可替换头像
  showUI: function showUI(index) {
    var headObj = glGame.user.get("headList")[index];
    var keys = Object.keys(headObj);
    var count = keys.length > this.headMax ? this.headMax : keys.length;
    this.listview.removeAllChildren();
    cc.log("头像", headObj, count);

    for (var i = 0; i < count; i++) {
      var panel = cc.instantiate(this.headItem);
      panel.active = true;
      panel.name = "head_".concat(keys[i]);
      panel.parent = this.listview;
      glGame.panel.showHeadImage(panel.getChildByName("mask").getChildByName("image"), headObj[keys[i]]);
      if (i == 0) this.clickHeadItemID = keys[i];
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "confirm":
        this.click_confirm();
        break;

      case "refresh":
        this.click_refresh();
        break;

      case "head":
        this.click_headItem(node);
        break;

      case "man":
        this.click_sex(1);
        break;

      case "woman":
        this.click_sex(2);
        break;

      default:
        if (name.indexOf("head") > -1) {
          var index = name.split("_")[1];
          this.click_headItem(index);
        }

        break;
    }
  },
  click_sex: function click_sex(index) {
    this.sex = index;

    if (glGame.user.get("headList")[index]) {
      this.showUI(index);
    } else {
      glGame.user.reqGetHeadList(index, this.headMax);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  click_refresh: function click_refresh() {
    var _this = this;

    if (!this.isLock) {
      this.isLock = true;
      this.node_re.color = cc.color(165, 139, 139); //this.node_re.children[0].color = cc.color(165, 139, 139);

      glGame.user.reqGetHeadList(this.sex, this.headMax);
      var dty = cc.delayTime(3);
      var cb = cc.callFunc(function () {
        _this.isLock = false;
        _this.node_re.color = cc.color(255, 255, 255); //this.node_re.children[0].color = cc.color(255, 255, 255);
      });
      this.node.runAction(cc.sequence(dty, cb));
    } else {
      glGame.panel.showErrorTip("刷新太频繁，请稍后重试！");
    }
  },
  // 确认更换头像
  click_confirm: function click_confirm() {
    var _this2 = this;

    if (!this.clickHeadItemID) {
      return glGame.panel.showErrorTip(glGame.tips.USER.CHANGEHEAD.FAIL);
    }

    cc.log("确认更换头像", this.clickHeadItemID);
    glGame.user.reqEditHead(this.clickHeadItemID, function () {
      var headObj = glGame.user.get("headList")[_this2.sex];

      glGame.user.headURL = headObj[_this2.clickHeadItemID];

      if (_this2.sex != glGame.user.get("userSex")) {
        var msg = {
          "sex": _this2.sex
        };
        glGame.gameNet.send_msg('http.reqEditMyInfo', msg, function (route, data) {
          glGame.user.userSex = _this2.sex;
          glGame.emitter.emit("updateUserData");
        });
      } else glGame.emitter.emit("updateUserData");

      _this2.remove();
    });
  },
  // 选择头像
  click_headItem: function click_headItem(index) {
    this.clickHeadItemID = Number(index);
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("upheadlist", this);
  }
});

cc._RF.pop();
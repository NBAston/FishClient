"use strict";
cc._RF.push(module, '53d20WEMNpNL7aCq0N3L7O+', 'changeInfo');
// modules/plaza/script/prefab/userInfo/popups/changeInfo.js

"use strict";

glGame.baseclass.extend({
  properties: {
    //个人资料
    edit_name: cc.EditBox,
    edit_wechat: cc.EditBox,
    edit_qq: cc.EditBox,
    edit_email: cc.EditBox,
    //设置自定义脚本
    edits_name: cc.Node,
    edits_wechat: cc.Node,
    edits_qq: cc.Node,
    edits_email: cc.Node,
    edits_birth: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();
  },
  start: function start() {
    this.inituserinfo();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_birthPanel":
        this.showbirthPanel();
        break;

      case "btn_userSure":
        this.userSure_cb();
        break;

      case "btn_userCancel":
        this.remove();
        break;

      case "btn_forbidname":
        glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.MODIFYNAME);
        break;

      default:
        break;
    }
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("editBirthDay", this.editBirthEnd, this);
  },
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off("editBirthDay", this);
  },
  //显示生日界面
  showbirthPanel: function showbirthPanel() {
    if (glGame.user.get("birthday_month") != "") {
      return glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.MODIFYBIRTH);
    }

    glGame.panel.showBirthday();
  },
  //显示个人资料界面
  inituserinfo: function inituserinfo() {
    this.edits_name.getSelfFunc().setString(glGame.user.get("name") || "");
    this.edits_wechat.getSelfFunc().setString(glGame.user.get("wechat") || "");
    this.edits_qq.getSelfFunc().setString(glGame.user.get("qq") || "");
    this.edits_email.getSelfFunc().setString(glGame.user.get("email") || "");

    if (this.edit_name.string != "") {
      this.edit_name.enabled = false;
      this.edits_name.getChildByName("btn_forbidname").active = true;
    }

    this.brithDay = glGame.user.get("birthday_month") || "";

    if (this.brithDay && this.brithDay != "") {
      var arr = this.brithDay.split("_");
      this.edits_birth.getSelfFunc().setString("".concat(arr[0], "\u6708").concat(arr[1], "\u65E5"));
    }
  },
  editBirthEnd: function editBirthEnd(str) {
    this.brithDay = str; //生日编辑结束

    var arr = this.brithDay.split("_");
    this.edits_birth.getSelfFunc().setString("".concat(arr[0], "\u6708").concat(arr[1], "\u65E5"));
  },
  userSure_cb: function userSure_cb() {
    var _this = this;

    var msg = {}; //name

    if (this.edit_name.string != "" && this.edit_name.string != glGame.user.get("name")) {
      var name = this.checkName(this.edit_name.string);
      if (!name) return;
      msg.name = name;
    } //wechat


    if (this.edit_wechat.string != glGame.user.get("wechat") && this.edit_wechat.string != "") {
      var wechat = this.checkWX(this.edit_wechat.string);
      if (!wechat) return;
      msg.wechat = wechat;
    } //qq


    if (this.edit_qq.string != glGame.user.get("qq") && this.edit_qq.string != "") {
      var qq = this.checkQQ(this.edit_qq.string);
      if (!qq) return;
      msg.qq = qq;
    } //email


    if (this.edit_email.string != glGame.user.get("email") && this.edit_email.string != "") {
      var email = this.checkMail(this.edit_email.string);
      if (!email) return;
      msg.email = email;
    } //birth


    if (this.brithDay != glGame.user.get("birthday_month") && this.brithDay != "") {
      msg.birthday_month = this.brithDay;
    }

    if (Object.keys(msg).length == 0) {
      this.remove();
      return;
    }

    glGame.gameNet.send_msg('http.reqEditMyInfo', msg, function (route, data) {
      glGame.panel.showTip(glGame.tips.USER.EDITINFO.BASEINFO);

      for (var key in msg) {
        glGame.user[key] = msg[key];
      }

      _this.remove();
    });
  },
  //===========================================================================================
  //邮箱检查
  checkMail: function checkMail(mailNum) {
    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //验证规则

    var ismailNum_matcher = reg.test(mailNum);

    if (!ismailNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDEMAIL);
      return false;
    }

    return mailNum;
  },
  // QQ检查
  checkQQ: function checkQQ(qqNum) {
    var reg = /^[1-9][0-9]{4,14}$/gim; //验证规则

    var isQQNum_matcher = reg.test(qqNum);

    if (!isQQNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDQQ);
      return false;
    }

    return qqNum;
  },
  // 微信检查
  checkWX: function checkWX(wxNum) {
    var reg = /^[-_a-zA-Z0-9]{6,20}$/; //验证规则

    var isWXNum_matcher = reg.test(wxNum);

    if (!isWXNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDWX);
      return false;
    }

    return wxNum;
  },
  // 姓名检查
  checkName: function checkName(nameNum) {
    if (this.checkStrLength(nameNum, 2, 40)) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.NAMELIMIT);
      return false;
    } // let reg = /^[\u4e00-\u9fa5]{2,8}$/


    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证规则

    var isnameNum_matcher = reg.test(nameNum);
    console.log('姓名格式错误！?', isnameNum_matcher);

    if (!isnameNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDNAME);
      return false;
    }

    return nameNum;
  },
  //检查中文和英文混合的字符长度
  checkStrLength: function checkStrLength(str, min, max) {
    var mTextMaxlenght = 0;
    var arr = str.split("");

    for (var i = 0; i < arr.length; i++) {
      var charAt = arr[i].charCodeAt(); //32-122包含了空格，大小写字母，数字和一些常用的符号，
      //如果在这个范围内则算一个字符，
      //如果不在这个范围比如是汉字的话就是两个字符

      if (charAt >= 32 && charAt <= 122) {
        mTextMaxlenght++;
      } else {
        mTextMaxlenght += 2;
      }
    }

    return mTextMaxlenght < min || mTextMaxlenght > max;
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
  }
});

cc._RF.pop();
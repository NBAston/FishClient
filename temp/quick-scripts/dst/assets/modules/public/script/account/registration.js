
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/account/registration.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aae6avHX+VKQLwPgCfRoEf0', 'registration');
// modules/public/script/account/registration.js

"use strict";

//页面索引枚举
var PANELINDEX = {
  PHONE: 0,
  REGISTRA: 1
};
glGame.baseclass.extend({
  properties: {
    node_regis: cc.Node,
    agree_toggle: cc.Node,
    verificacode: cc.Label,
    content_Panel: cc.Node,
    node_LeftList: cc.Node,
    //左边按钮
    sprite_title: cc.Sprite,
    //标题
    node_bottom: cc.Node,
    //底部
    node_agree: cc.Toggle,
    //手机登录
    phone_phone: cc.EditBox,
    phone_code: cc.EditBox,
    phone_sendButton: [cc.Node],
    phone_sendVerifica: [cc.Node],
    phone_psw: cc.EditBox,
    phone_confirm: cc.EditBox,
    label_phoneCode: cc.Label,
    //注册彩金
    regisAward: [cc.Node],
    phoneAward: [cc.Node],
    //非注册彩金
    regisNormalcy: [cc.Node],
    phoneNormalcy: [cc.Node],
    //预制
    protocol: cc.Prefab
  },
  onLoad: function onLoad() {
    this.public_list = ["accountTitle", "division", "membershipTitle", "acc", //账号
    "psw", //密码
    "cpsw", //确认密码
    // "wpsw",         //取款密码
    "verifica" //验证码
    ];
    this.registerEvent();
    this.initRegisContent(); //  glGame.logon.reqRegisterConfig();   //获取注册表

    this.iSagree = true; //是否同意用户协议

    this.iSregisUI = false; // 当前是否为注册界面

    this.initUI();
  },
  // 按钮点击事件
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        return this.remove();

      case "send":
        return this.btn_sendCode();

      case "btn_birthday":
        return this.btn_editbirthday();

      case "btn_guanbi":
        return this.btn_guanbi();
      //leftlist

      case "toggle_phone":
        return this.leftList_cb(PANELINDEX.PHONE);

      case "toggle_registra":
        return this.leftList_cb(PANELINDEX.REGISTRA);
      //toggle

      case "btn_agree":
        return this.agree_cb();
      //retistrationLogin

      case "btn_registrationLogin":
        this.registrationLogin_cb();
        break;
      //确认注册账号
      //phoneLogin

      case "btn_phoneSendVerifica":
        this.phoneSendVerifica_cb();
        break;

      case "btn_phoneLogin":
        return this.phoneLogin_cb();

      case "btn_rememberPhone":
        return this.rememberPhone_cb();

      case "verificaCode":
        this.setVerificacode();
        break;

      case "btn_haveAccount":
        this.setRegisUi();
        break;

      case "btn_protocol":
        glGame.panel.showChildPanel(this.protocol, this.node);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  //初始化一些toggle
  initUI: function initUI() {
    this.iSagree = glGame.storage.getItem("isAgree") ? glGame.storage.getItem("isAgree").data : true;
    this.node_agree.isChecked = this.iSagree;
    var loginSwitch = glGame.user.get("loginSwitch");
    this.node_LeftList.getChildByName("toggle_phone").getComponent(cc.Toggle).isChecked = loginSwitch.phone == 1;
    this.initAwardUi();
  },
  //同意协议回调
  agree_cb: function agree_cb() {
    this.iSagree = this.node_agree.isChecked;
    glGame.storage.setItem("isAgree", {
      data: this.iSagree
    });
  },
  //左边标签回调
  leftList_cb: function leftList_cb(index) {
    for (var i = 0; i < this.content_Panel.childrenCount; i++) {
      this.content_Panel.children[i].active = index == i;
    }
  },
  //初始化注册彩金
  initAwardUi: function initAwardUi() {
    if (glGame.user.register_gold > 0) {
      this.setAwardTable(this.regisAward, true, glGame.user.register_gold);
      this.setAwardTable(this.regisNormalcy, false, glGame.user.register_gold);
    } else {
      this.setAwardTable(this.regisAward, false);
      this.setAwardTable(this.regisNormalcy, true);
    }

    var gold = glGame.user.bind_phone_gold + glGame.user.register_gold;

    if (gold > 0) {
      this.setAwardTable(this.phoneAward, true, gold);
      this.setAwardTable(this.phoneNormalcy, false, gold);
    } else {
      this.setAwardTable(this.phoneAward, false);
      this.setAwardTable(this.phoneNormalcy, true);
    }
  },
  //设置注册彩金
  setAwardTable: function setAwardTable(nodeList, blTable, coin) {
    var count = nodeList.length;

    for (var i = 0; i < count; i++) {
      nodeList[i].active = blTable;

      if (coin && nodeList[i].getChildByName("img_bottom")) {
        var nodeCoin = nodeList[i].getChildByName("img_bottom").getChildByName("coin");
        nodeCoin.getComponent(cc.Label).string = "\u8D60\u9001".concat(this.cutFloat(coin), "\u5F69\u91D1");
      }
    }
  },
  //微信登录
  weChatLogin_cb: function weChatLogin_cb() {
    console.log("微信登录");
    glGame.platform.loginWX();
  },
  //手机注册
  phoneLogin_cb: function phoneLogin_cb() {
    if (!this.iSagree) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PROTOCOL);
      return;
    }

    var phone = this.checkPhone(this.phone_phone.string);
    if (phone == null || phone == false) return;
    var psw = this.checkPassword(this.phone_psw.string);
    var confirm = this.checkPassword(this.phone_psw.string, this.phone_confirm.string);
    if (psw == null) return;
    if (confirm == null) return;
    if (this.phone_code.string == "") return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICAEMPTY);
    var code = this.phone_code.string;
    var reg = /^[0-9]{0,6}$/; //验证规则

    var verif = reg.test(Number(this.phone_code.string));

    if (!verif) {
      return glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
    }

    psw = md5(psw); //手机注册

    glGame.logon.reqPhoneRegister({
      phone: phone,
      password: psw,
      verification: code
    }); //phone:phone,verification:验证码,plat:1

    glGame.storage.setItem("accNumber", {
      data: phone
    });
  },
  //发送手机号
  btn_sendCode: function btn_sendCode() {
    var phone = this.checkPhone(this.getEditBoxString("phone"));
    if (!phone) return;
    glGame.user.reqRegistPhoneCode({
      phone: phone,
      type: 4
    });
  },
  //确认注册账号
  registrationLogin_cb: function registrationLogin_cb() {
    if (!this.iSagree) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PROTOCOL);
      return;
    } // 代理推荐码输入框中只允许输入数字和英文，英文允许大小写。11位


    var msg = {}; //获取默认选项的（设置为本地默认，不再向服务端请求登入所需数据 默认写死）

    for (var key in this.public_list) {
      var data = this.public_list[key];
      if (!data || data == "accountTitle" || data == 'membershipTitle' || data == 'division') continue;
      var regisContent = this.switchRegis(data);
      if (regisContent == null) return;

      if (regisContent) {
        msg[data] = regisContent;
        if (data == "psw") msg["cpsw"] = regisContent;
      }
    }

    glGame.logon.reqRegister(msg);
  },
  //手机登录发送验证码
  phoneSendVerifica_cb: function phoneSendVerifica_cb() {
    var phone = this.checkPhone(this.phone_phone.string);
    if (!phone) return;
    glGame.user.reqPhoneCode({
      phone: phone,
      type: 4
    });
  },
  //切换为注册界面
  setRegisUi: function setRegisUi() {
    this.remove(false);
    glGame.panel.showRegister();
  },
  //注册时的显示状态
  setLeftUIRegisGap: function setLeftUIRegisGap() {
    this.iSregisUI = true; //根据配置显示账号注册/手机注册

    var accountOpen = glGame.user.get('loginSwitch').register_account;
    var phoneOpen = glGame.user.get('loginSwitch').register_phone;

    if (accountOpen == 2 && phoneOpen == 2 || accountOpen == 1 && phoneOpen == 2) {
      this.node_LeftList.getChildByName("toggle_phone").active = false;
      this.node_LeftList.getChildByName("toggle_registra").getComponent(cc.Toggle).check();
      this.leftList_cb(PANELINDEX.REGISTRA);
    }

    if (accountOpen == 2 && phoneOpen == 1) {
      this.node_LeftList.getChildByName("toggle_registra").active = false;
      this.node_LeftList.getChildByName("toggle_phone").getComponent(cc.Toggle).check();
      this.leftList_cb(PANELINDEX.PHONE);
    }

    if (accountOpen == 1 && phoneOpen == 1) {
      this.node_LeftList.getChildByName("toggle_registra").getComponent(cc.Toggle).check();
      this.leftList_cb(PANELINDEX.REGISTRA);
    }
  },
  initRegisContent: function initRegisContent() {
    for (var i = 0, count = this.public_list.length; i < count; i++) {
      var name = this.public_list[i];
      if (!name || name == "accountTitle" || name == 'membershipTitle' || name == 'division') continue;
      var regis_strip = this.getRegisObj(name);
      regis_strip.active = true;
    }

    this.setVerificacode(); //设置验证码
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
    glGame.user.clearPostPhoneInterval();
    glGame.user.clearPhoneInterval();
    glGame.user.clearRegistPhoneInterval();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("loginSuccess ", this.loginSuccess, this);
    glGame.emitter.on(MESSAGE.USER.REGISTER_CFG, this.RegisterConfig, this);
    glGame.emitter.on("editBirthDay", this.editBirthDay, this);
    glGame.emitter.on("phoneCodeCD", this.phoneCodeCD, this);
    glGame.emitter.on('closeRegistAndLoginFace', this.closeFace, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("loginSuccess ", this);
    glGame.emitter.off(MESSAGE.USER.REGISTER_CFG, this);
    glGame.emitter.off("editBirthDay", this);
    glGame.emitter.off("phoneCodeCD", this);
    glGame.emitter.off('closeRegistAndLoginFace', this);
  },
  closeFace: function closeFace() {
    this.remove();
  },
  //手机登录验证码
  phoneCodeCD: function phoneCodeCD(msg) {
    if (glGame.user.get("phoneCodeState") && msg > 0) {
      this.phone_sendVerifica[0].active = false;
      this.phone_sendVerifica[1].active = true;
      this.phone_sendButton[0].active = false;
      this.phone_sendButton[1].active = true;
      this.label_phoneCode.string = "".concat(msg, "\u79D2");
    } else {
      this.phone_sendVerifica[0].active = true;
      this.phone_sendVerifica[1].active = false;
      this.phone_sendButton[0].active = true;
      this.phone_sendButton[1].active = false;
    }
  },
  //获取注册表的回调
  RegisterConfig: function RegisterConfig(Configdata) {
    console.log("这是当前注册的信息", Configdata);
    this.Configdata = Configdata.data;
    this.protocolinfo = Configdata.protocol;
    this.initRegisContent();
    this.initRegisUi();

    if (this.iSregisUI) {
      this.node_bottom.getChildByName("btn_agree").active = true;
      return; // this.node_LeftList.getChildByName("toggle_phone").getComponent(cc.Toggle).check();
    } else {
      for (var i = 0; i < this.node_LeftList.childrenCount; i++) {
        if (this.node_LeftList.children[i].active) {
          this.onClick(this.node_LeftList.children[i].name);
          this.node_LeftList.children[i].getComponent(cc.Toggle).isChecked = true;
          return;
        }
      }
    }
  },
  checkRegisList: function checkRegisList(regisname) {
    var bContinue = false;

    for (var i = 0, count = this.public_list.length; i < count; i++) {
      var name = this.public_list[i];
      if (!name) continue;

      if (name == regisname) {
        bContinue = true;
        break;
      }
    }

    return bContinue;
  },
  //初始化注册界面UI
  initRegisUi: function initRegisUi() {
    console.log('这是当前的注册初始化问题', this.Configdata);
    var index = 8;

    for (var key in this.Configdata) {
      var rdata = this.Configdata[key];
      var regisObj = this.getRegisObj(rdata.key);

      if (regisObj.getChildByName("editBox")) {
        regisObj.getChildByName("editBox").getComponent(cc.EditBox).placeholder = rdata.description;
      } //排除多余信息


      if (rdata.key == "verifica" && rdata.value == 1) {
        this.setVerificacode();
        regisObj.active = true;
      }

      if (!rdata || this.checkRegisList(rdata.key)) continue; // if(rdata.key == "wpsw") continue;

      if (!regisObj || rdata.value == 3) continue;
      if (rdata.value == 2) regisObj.getChildByName("label").getChildByName("star").active = false;else if (rdata.value == 1) regisObj.getChildByName("label").getChildByName("star").active = true;
      regisObj.setSiblingIndex(index);
      index++;
      regisObj.active = true;
    } //收到包开启确认按钮（间隔条）


    this.getRegisObj("gap_frame").active = true;
    this.getRegisObj("btn_registrationLogin").active = true;
    console.log("这是当前的index索引", index); //是否隐藏会员资料的字体判断以及那条线

    var draw = false;

    for (var _key in this.Configdata) {
      if (this.Configdata[_key].key == "acc" || this.Configdata[_key].key == "psw" || this.Configdata[_key].key == "cpsw" || this.Configdata[_key].key == "verifica") {
        continue;
      }

      console.log("这是当前的配置名字", _key, this.Configdata[_key].value);

      if (this.Configdata[_key].value != 3) {
        draw = true;
        break;
      }
    }

    if (!draw) {
      var title = this.getRegisObj("membershipTitle"),
          xian = this.getRegisObj("division");
      title.active = false;
      xian.active = false;
    }
  },
  //登录成功回调
  loginSuccess: function loginSuccess() {
    this.remove();
  },
  // 获取指定EditBox的文本
  getRegisObj: function getRegisObj(nodename) {
    return this.node_regis.getChildByName(nodename);
  },
  // 获取指定EditBox的文本
  getEditBoxString: function getEditBoxString(nodename) {
    var regis_obj = this.node_regis.getChildByName(nodename),
        strObj = regis_obj.getChildByName("EditBox");
    return strObj.getComponent(cc.EditBox).string;
  },
  //是否同意用户协议
  btn_agree: function btn_agree() {
    this.iSagree = !this.iSagree;
  },
  //清理倒计时
  cleanTimer: function cleanTimer() {
    if (this.setTimeOut != null) {
      clearTimeout(this.setTimeOut);
    }

    this.setTimeOut = null;
  },
  editBirthDay: function editBirthDay(msg) {
    console.log("这是当前选择的时间", msg);
    this.britharr = msg.split("_");
    var brithMonth = this.britharr[0],
        birthDay = this.britharr[1];
    this.regis_content.getChildByName("birthday").getChildByName("editBox").getComponent(cc.EditBox).string = "".concat(brithMonth, "\u6708").concat(birthDay, "\u65E5");
  },
  //生日选择
  btn_editbirthday: function btn_editbirthday() {
    glGame.panel.showBirthday();
  },
  setVerificacode: function setVerificacode() {
    var str = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
    console.log("这是当前的验证码", str);
    this.verificacode.string = str;
  },
  //判定是否填写内容有误
  switchRegis: function switchRegis(regname) {
    var data = null;

    switch (regname) {
      case "acc":
        var acc = this.checkAcc(this.getEditBoxString(regname));
        if (acc) data = acc;
        break;

      case "psw":
        var psw = this.checkPassword(this.getEditBoxString("psw"), this.getEditBoxString("cpsw"));
        if (psw) data = md5(psw);
        break;

      case "wpsw":
        var wpsw = this.checkWithdrawalPsw(this.getEditBoxString(regname));
        if (wpsw) data = wpsw;
        break;

      case "proxy":
        var proxy = this.checkProxy(this.getEditBoxString(regname));
        if (proxy) data = proxy;
        break;

      case "name":
        var name = this.checkName(this.getEditBoxString(regname));
        if (name) data = name;
        break;

      case "sex":
        break;

      case "phone":
        var phone = this.checkPhone(this.getEditBoxString(regname));
        if (phone) data = phone;
        break;

      case "wechat":
        var wechat = this.checkWX(this.getEditBoxString(regname));
        if (wechat) data = wechat;
        break;

      case "qq":
        var qqNum = this.checkQQ(this.getEditBoxString(regname));
        if (qqNum) data = qqNum;
        break;

      case "email":
        var email = this.checkMail(this.getEditBoxString(regname));
        if (email) data = email;
        break;

      case "nickname":
        var nickName = this.checkNickName(this.getEditBoxString(regname));
        if (nickName) data = nickName;
        break;

      case "birthday":
        var birthday = this.checkbirthday(this.britharr);
        if (birthday) data = birthday;
        break;

      case "verifica":
        var inputCode = this.getEditBoxString(regname);

        if (inputCode.length == 0) {
          glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
          break;
        }

        var verif = this.getEditBoxString(regname) == this.verificacode.string ? true : false;

        if (!verif) {
          glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFICA);
        } else data = this.verificacode.string;

        break;

      default:
        data = false;
        break;
    }

    return data;
  },
  //排除显示注册item的多余信息
  regisOptional: function regisOptional(regisdata) {
    var blConent = false;
    if (regisdata.value == 1) return blConent;

    if (regisdata.value == 3) {
      blConent = true;
      return blConent;
    }

    switch (regisdata.key) {
      case "proxy":
      case "name":
      case "phone":
      case "wechat":
      case "qq":
      case "email":
      case "nickname":
      case "birthday":
        blConent = this.getEditBoxString(regisdata.key) == "";
        break;

      default:
        break;
    }

    return blConent;
  },
  //生日
  checkbirthday: function checkbirthday(data) {
    if (!data) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.BIRTHDAY);
      return null;
    }

    var birthday = "".concat(data[0], "-").concat(data[1]);
    return birthday;
  },
  // 银行取现
  checkWithdrawalPsw: function checkWithdrawalPsw(wpsw) {
    if (!wpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.WITHDRAWALPSW);
      return null;
    }

    var reg = /^\d{4,6}$/; //验证规则

    var iswpsw_matcher = reg.test(wpsw);

    if (!iswpsw_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.WITHDRAWALPSWLENGTH);
      return false;
    }

    return wpsw;
  },
  //代理推荐码检查
  checkProxy: function checkProxy(proxy) {
    if (!proxy) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PROXY);
      return null;
    } // let reg = /^\w{11}$/;
    // let proxy_check = reg.test(proxy);
    // if (!proxy_check) {
    //     glGame.panel.showErrorTip('代理推荐码不存在！');
    //     return false;
    // }


    return proxy;
  },
  // 手机号码检查
  checkPhone: function checkPhone(acc) {
    if (!acc) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PHONENULL);
      return null;
    } //放开限定
    //var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    //使用服务端限定正则方式


    var reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[0-9]\d{8}$/; // let reg = /^\d{11}$/; //验证规则

    var isacc_matcher = reg.test(acc);

    if (!isacc_matcher) {
      glGame.panel.showErrorTip('请输入正确的手机号');
      return false;
    }

    return acc;
  },
  // 验证码检查
  checkVerification: function checkVerification(verif) {
    if (!verif) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.VERIFINULL);
      return null;
    }

    return verif;
  },
  // 账号检查
  checkAcc: function checkAcc(acc) {
    if (!acc || acc == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCNULL);
      return false;
    }

    if (acc.length < 4) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCLENGTH);
      return false;
    } // let reg = /^\w{2,15}$/;


    var reg = /^[A-Za-z0-9]{4,15}$/;
    var acc_check = reg.test(acc);

    if (!acc_check) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.ACCTYPE);
      return false;
    }

    return acc;
  },
  // QQ检查
  checkQQ: function checkQQ(qqNum) {
    if (!qqNum || qqNum == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.QQNULL);
      return null;
    }

    var reg = /^[1-9][0-9]{4,9}$/gim; //验证规则

    var isQQNum_matcher = reg.test(qqNum);

    if (!isQQNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.QQTYPE);
      return false;
    }

    return qqNum;
  },
  // 微信检查
  checkWX: function checkWX(wxNum) {
    if (!wxNum || wxNum == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.WECHATNULL);
      return null;
    }

    var reg = /^[a-zA-Z\d_]{5,}$/; //验证规则

    var isWXNum_matcher = reg.test(wxNum);

    if (!isWXNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.WECHATTYPE);
      return false;
    }

    return wxNum;
  },
  // 姓名检查
  checkName: function checkName(nameNum) {
    if (!nameNum || nameNum == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NAMENULL);
      return null;
    }

    if (this.checkStrLength(nameNum, 4, 12)) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NAMELENGTH);
      return false;
    }

    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/; //验证规则

    var isnameNum_matcher = reg.test(nameNum);

    if (!isnameNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NAMETYPE);
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
  // 昵称检查
  checkNickName: function checkNickName(nameNum) {
    if (!nameNum || nameNum == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NICKNAMENULL);
      return null;
    }

    if (this.checkStrLength(nameNum, 4, 12)) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NICKNAMELENGTH);
      return false;
    }

    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/; //验证规则

    var isnameNum_matcher = reg.test(nameNum);

    if (!isnameNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.NICKNAMETYPE);
      return false;
    }

    return nameNum;
  },
  // 邮箱检查
  checkMail: function checkMail(mailNum) {
    if (!mailNum || mailNum == '') {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.EMAILNULL);
      return null;
    }

    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //验证规则

    var ismailNum_matcher = reg.test(mailNum);

    if (!ismailNum_matcher) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.EMAILTYPE);
      return false;
    }

    return mailNum;
  },
  // 密码检查
  checkPassword: function checkPassword(psw, confimpsw) {
    // 未输入密码
    if (!psw || psw.length == 0) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.LOGPSWNULL);
      return null;
    } // 输入密码长度小于6位字符


    if (psw.length < 6) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWLENGTH);
      return null;
    } // 密码包含特殊字符


    if (!/\w$/.test(psw)) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWWRONGFUL);
      return null;
    }

    if (confimpsw == null) return psw;

    if (!confimpsw || psw !== confimpsw) {
      glGame.panel.showErrorTip(glGame.tips.REGISTRATION.PSWCOFAIL);
      return null;
    }

    return psw;
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.div(100).toString();
    } else {
      value = Number(value).div(100);
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGFjY291bnRcXHJlZ2lzdHJhdGlvbi5qcyJdLCJuYW1lcyI6WyJQQU5FTElOREVYIiwiUEhPTkUiLCJSRUdJU1RSQSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJub2RlX3JlZ2lzIiwiY2MiLCJOb2RlIiwiYWdyZWVfdG9nZ2xlIiwidmVyaWZpY2Fjb2RlIiwiTGFiZWwiLCJjb250ZW50X1BhbmVsIiwibm9kZV9MZWZ0TGlzdCIsInNwcml0ZV90aXRsZSIsIlNwcml0ZSIsIm5vZGVfYm90dG9tIiwibm9kZV9hZ3JlZSIsIlRvZ2dsZSIsInBob25lX3Bob25lIiwiRWRpdEJveCIsInBob25lX2NvZGUiLCJwaG9uZV9zZW5kQnV0dG9uIiwicGhvbmVfc2VuZFZlcmlmaWNhIiwicGhvbmVfcHN3IiwicGhvbmVfY29uZmlybSIsImxhYmVsX3Bob25lQ29kZSIsInJlZ2lzQXdhcmQiLCJwaG9uZUF3YXJkIiwicmVnaXNOb3JtYWxjeSIsInBob25lTm9ybWFsY3kiLCJwcm90b2NvbCIsIlByZWZhYiIsIm9uTG9hZCIsInB1YmxpY19saXN0IiwicmVnaXN0ZXJFdmVudCIsImluaXRSZWdpc0NvbnRlbnQiLCJpU2FncmVlIiwiaVNyZWdpc1VJIiwiaW5pdFVJIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwicmVtb3ZlIiwiYnRuX3NlbmRDb2RlIiwiYnRuX2VkaXRiaXJ0aGRheSIsImJ0bl9ndWFuYmkiLCJsZWZ0TGlzdF9jYiIsImFncmVlX2NiIiwicmVnaXN0cmF0aW9uTG9naW5fY2IiLCJwaG9uZVNlbmRWZXJpZmljYV9jYiIsInBob25lTG9naW5fY2IiLCJyZW1lbWJlclBob25lX2NiIiwic2V0VmVyaWZpY2Fjb2RlIiwic2V0UmVnaXNVaSIsInBhbmVsIiwic2hvd0NoaWxkUGFuZWwiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9yYWdlIiwiZ2V0SXRlbSIsImRhdGEiLCJpc0NoZWNrZWQiLCJsb2dpblN3aXRjaCIsInVzZXIiLCJnZXQiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsInBob25lIiwiaW5pdEF3YXJkVWkiLCJzZXRJdGVtIiwiaW5kZXgiLCJpIiwiY2hpbGRyZW5Db3VudCIsImNoaWxkcmVuIiwiYWN0aXZlIiwicmVnaXN0ZXJfZ29sZCIsInNldEF3YXJkVGFibGUiLCJnb2xkIiwiYmluZF9waG9uZV9nb2xkIiwibm9kZUxpc3QiLCJibFRhYmxlIiwiY29pbiIsImNvdW50IiwibGVuZ3RoIiwibm9kZUNvaW4iLCJzdHJpbmciLCJjdXRGbG9hdCIsIndlQ2hhdExvZ2luX2NiIiwibG9nIiwicGxhdGZvcm0iLCJsb2dpbldYIiwic2hvd0Vycm9yVGlwIiwidGlwcyIsIlJFR0lTVFJBVElPTiIsIlBST1RPQ09MIiwiY2hlY2tQaG9uZSIsInBzdyIsImNoZWNrUGFzc3dvcmQiLCJjb25maXJtIiwiVkVSSUZJQ0FFTVBUWSIsImNvZGUiLCJyZWciLCJ2ZXJpZiIsInRlc3QiLCJOdW1iZXIiLCJWRVJJRklDQSIsIm1kNSIsImxvZ29uIiwicmVxUGhvbmVSZWdpc3RlciIsInBhc3N3b3JkIiwidmVyaWZpY2F0aW9uIiwiZ2V0RWRpdEJveFN0cmluZyIsInJlcVJlZ2lzdFBob25lQ29kZSIsInR5cGUiLCJtc2ciLCJrZXkiLCJyZWdpc0NvbnRlbnQiLCJzd2l0Y2hSZWdpcyIsInJlcVJlZ2lzdGVyIiwicmVxUGhvbmVDb2RlIiwic2hvd1JlZ2lzdGVyIiwic2V0TGVmdFVJUmVnaXNHYXAiLCJhY2NvdW50T3BlbiIsInJlZ2lzdGVyX2FjY291bnQiLCJwaG9uZU9wZW4iLCJyZWdpc3Rlcl9waG9uZSIsImNoZWNrIiwicmVnaXNfc3RyaXAiLCJnZXRSZWdpc09iaiIsIk9uRGVzdHJveSIsInVuUmVnaXN0ZXJFdmVudCIsImNsZWFyUG9zdFBob25lSW50ZXJ2YWwiLCJjbGVhclBob25lSW50ZXJ2YWwiLCJjbGVhclJlZ2lzdFBob25lSW50ZXJ2YWwiLCJlbWl0dGVyIiwib24iLCJsb2dpblN1Y2Nlc3MiLCJNRVNTQUdFIiwiVVNFUiIsIlJFR0lTVEVSX0NGRyIsIlJlZ2lzdGVyQ29uZmlnIiwiZWRpdEJpcnRoRGF5IiwicGhvbmVDb2RlQ0QiLCJjbG9zZUZhY2UiLCJvZmYiLCJDb25maWdkYXRhIiwicHJvdG9jb2xpbmZvIiwiaW5pdFJlZ2lzVWkiLCJjaGVja1JlZ2lzTGlzdCIsInJlZ2lzbmFtZSIsImJDb250aW51ZSIsInJkYXRhIiwicmVnaXNPYmoiLCJwbGFjZWhvbGRlciIsImRlc2NyaXB0aW9uIiwidmFsdWUiLCJzZXRTaWJsaW5nSW5kZXgiLCJkcmF3IiwidGl0bGUiLCJ4aWFuIiwibm9kZW5hbWUiLCJyZWdpc19vYmoiLCJzdHJPYmoiLCJidG5fYWdyZWUiLCJjbGVhblRpbWVyIiwic2V0VGltZU91dCIsImNsZWFyVGltZW91dCIsImJyaXRoYXJyIiwic3BsaXQiLCJicml0aE1vbnRoIiwiYmlydGhEYXkiLCJyZWdpc19jb250ZW50Iiwic2hvd0JpcnRoZGF5Iiwic3RyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVnbmFtZSIsImFjYyIsImNoZWNrQWNjIiwid3BzdyIsImNoZWNrV2l0aGRyYXdhbFBzdyIsInByb3h5IiwiY2hlY2tQcm94eSIsImNoZWNrTmFtZSIsIndlY2hhdCIsImNoZWNrV1giLCJxcU51bSIsImNoZWNrUVEiLCJlbWFpbCIsImNoZWNrTWFpbCIsIm5pY2tOYW1lIiwiY2hlY2tOaWNrTmFtZSIsImJpcnRoZGF5IiwiY2hlY2tiaXJ0aGRheSIsImlucHV0Q29kZSIsInJlZ2lzT3B0aW9uYWwiLCJyZWdpc2RhdGEiLCJibENvbmVudCIsIkJJUlRIREFZIiwiV0lUSERSQVdBTFBTVyIsImlzd3Bzd19tYXRjaGVyIiwiV0lUSERSQVdBTFBTV0xFTkdUSCIsIlBST1hZIiwiUEhPTkVOVUxMIiwiaXNhY2NfbWF0Y2hlciIsImNoZWNrVmVyaWZpY2F0aW9uIiwiVkVSSUZJTlVMTCIsIkFDQ05VTEwiLCJBQ0NMRU5HVEgiLCJhY2NfY2hlY2siLCJBQ0NUWVBFIiwiUVFOVUxMIiwiaXNRUU51bV9tYXRjaGVyIiwiUVFUWVBFIiwid3hOdW0iLCJXRUNIQVROVUxMIiwiaXNXWE51bV9tYXRjaGVyIiwiV0VDSEFUVFlQRSIsIm5hbWVOdW0iLCJOQU1FTlVMTCIsImNoZWNrU3RyTGVuZ3RoIiwiTkFNRUxFTkdUSCIsImlzbmFtZU51bV9tYXRjaGVyIiwiTkFNRVRZUEUiLCJtaW4iLCJtYXgiLCJtVGV4dE1heGxlbmdodCIsImFyciIsImNoYXJBdCIsImNoYXJDb2RlQXQiLCJOSUNLTkFNRU5VTEwiLCJOSUNLTkFNRUxFTkdUSCIsIk5JQ0tOQU1FVFlQRSIsIm1haWxOdW0iLCJFTUFJTE5VTEwiLCJpc21haWxOdW1fbWF0Y2hlciIsIkVNQUlMVFlQRSIsImNvbmZpbXBzdyIsIkxPR1BTV05VTEwiLCJQU1dMRU5HVEgiLCJQU1dXUk9OR0ZVTCIsIlBTV0NPRkFJTCIsIm51bSIsImlzTmFOIiwiZGl2IiwidG9TdHJpbmciLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0EsSUFBTUEsVUFBVSxHQUFHO0FBQ2ZDLEVBQUFBLEtBQUssRUFBRSxDQURRO0FBRWZDLEVBQUFBLFFBQVEsRUFBRTtBQUZLLENBQW5CO0FBSUFDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVDLEVBQUUsQ0FBQ0MsSUFEUDtBQUVSQyxJQUFBQSxZQUFZLEVBQUVGLEVBQUUsQ0FBQ0MsSUFGVDtBQUlSRSxJQUFBQSxZQUFZLEVBQUVILEVBQUUsQ0FBQ0ksS0FKVDtBQU1SQyxJQUFBQSxhQUFhLEVBQUVMLEVBQUUsQ0FBQ0MsSUFOVjtBQU9SSyxJQUFBQSxhQUFhLEVBQUVOLEVBQUUsQ0FBQ0MsSUFQVjtBQU9nQztBQUN4Q00sSUFBQUEsWUFBWSxFQUFFUCxFQUFFLENBQUNRLE1BUlQ7QUFRZ0M7QUFDeENDLElBQUFBLFdBQVcsRUFBRVQsRUFBRSxDQUFDQyxJQVRSO0FBU2dDO0FBRXhDUyxJQUFBQSxVQUFVLEVBQUVWLEVBQUUsQ0FBQ1csTUFYUDtBQWFSO0FBQ0FDLElBQUFBLFdBQVcsRUFBRVosRUFBRSxDQUFDYSxPQWRSO0FBZVJDLElBQUFBLFVBQVUsRUFBRWQsRUFBRSxDQUFDYSxPQWZQO0FBZ0JSRSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDZixFQUFFLENBQUNDLElBQUosQ0FoQlY7QUFpQlJlLElBQUFBLGtCQUFrQixFQUFFLENBQUNoQixFQUFFLENBQUNDLElBQUosQ0FqQlo7QUFrQlJnQixJQUFBQSxTQUFTLEVBQUVqQixFQUFFLENBQUNhLE9BbEJOO0FBbUJSSyxJQUFBQSxhQUFhLEVBQUVsQixFQUFFLENBQUNhLE9BbkJWO0FBb0JSTSxJQUFBQSxlQUFlLEVBQUVuQixFQUFFLENBQUNJLEtBcEJaO0FBc0JSO0FBQ0FnQixJQUFBQSxVQUFVLEVBQUUsQ0FBQ3BCLEVBQUUsQ0FBQ0MsSUFBSixDQXZCSjtBQXdCUm9CLElBQUFBLFVBQVUsRUFBRSxDQUFDckIsRUFBRSxDQUFDQyxJQUFKLENBeEJKO0FBeUJSO0FBQ0FxQixJQUFBQSxhQUFhLEVBQUUsQ0FBQ3RCLEVBQUUsQ0FBQ0MsSUFBSixDQTFCUDtBQTJCUnNCLElBQUFBLGFBQWEsRUFBRSxDQUFDdkIsRUFBRSxDQUFDQyxJQUFKLENBM0JQO0FBNkJSO0FBQ0F1QixJQUFBQSxRQUFRLEVBQUV4QixFQUFFLENBQUN5QjtBQTlCTCxHQURRO0FBbUNwQkMsRUFBQUEsTUFuQ29CLG9CQW1DWDtBQUNMLFNBQUtDLFdBQUwsR0FBbUIsQ0FDZixjQURlLEVBRWYsVUFGZSxFQUdmLGlCQUhlLEVBS2YsS0FMZSxFQUtDO0FBQ2hCLFNBTmUsRUFNQztBQUNoQixVQVBlLEVBT0M7QUFDaEI7QUFDQSxjQVRlLENBU0M7QUFURCxLQUFuQjtBQVdBLFNBQUtDLGFBQUw7QUFDQSxTQUFLQyxnQkFBTCxHQWJLLENBY0w7O0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWYsQ0FmSyxDQWVnQjs7QUFDckIsU0FBS0MsU0FBTCxHQUFpQixLQUFqQixDQWhCSyxDQWdCbUI7O0FBQ3hCLFNBQUtDLE1BQUw7QUFDSCxHQXJEbUI7QUF1RHBCO0FBQ0FDLEVBQUFBLE9BeERvQixtQkF3RFpDLElBeERZLEVBd0ROQyxJQXhETSxFQXdEQTtBQUNoQixZQUFRRCxJQUFSO0FBQ0ksV0FBSyxPQUFMO0FBQWMsZUFBTyxLQUFLRSxNQUFMLEVBQVA7O0FBQ2QsV0FBSyxNQUFMO0FBQWEsZUFBTyxLQUFLQyxZQUFMLEVBQVA7O0FBQ2IsV0FBSyxjQUFMO0FBQXFCLGVBQU8sS0FBS0MsZ0JBQUwsRUFBUDs7QUFDckIsV0FBSyxZQUFMO0FBQW1CLGVBQU8sS0FBS0MsVUFBTCxFQUFQO0FBRW5COztBQUNBLFdBQUssY0FBTDtBQUFxQixlQUFPLEtBQUtDLFdBQUwsQ0FBaUJoRCxVQUFVLENBQUNDLEtBQTVCLENBQVA7O0FBQ3JCLFdBQUssaUJBQUw7QUFBd0IsZUFBTyxLQUFLK0MsV0FBTCxDQUFpQmhELFVBQVUsQ0FBQ0UsUUFBNUIsQ0FBUDtBQUV4Qjs7QUFDQSxXQUFLLFdBQUw7QUFBa0IsZUFBTyxLQUFLK0MsUUFBTCxFQUFQO0FBRWxCOztBQUNBLFdBQUssdUJBQUw7QUFBOEIsYUFBS0Msb0JBQUw7QUFBNkI7QUFBZTtBQUUxRTs7QUFDQSxXQUFLLHVCQUFMO0FBQThCLGFBQUtDLG9CQUFMO0FBQTZCOztBQUMzRCxXQUFLLGdCQUFMO0FBQXVCLGVBQU8sS0FBS0MsYUFBTCxFQUFQOztBQUN2QixXQUFLLG1CQUFMO0FBQTBCLGVBQU8sS0FBS0MsZ0JBQUwsRUFBUDs7QUFDMUIsV0FBSyxjQUFMO0FBQXFCLGFBQUtDLGVBQUw7QUFBd0I7O0FBQzdDLFdBQUssaUJBQUw7QUFBd0IsYUFBS0MsVUFBTDtBQUFtQjs7QUFFM0MsV0FBSyxjQUFMO0FBQXFCcEQsUUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhQyxjQUFiLENBQTRCLEtBQUt6QixRQUFqQyxFQUEyQyxLQUFLVyxJQUFoRDtBQUF1RDs7QUFDNUU7QUFBU2UsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNqQixJQUEzQztBQXhCYjtBQTBCSCxHQW5GbUI7QUFvRnBCO0FBQ0FGLEVBQUFBLE1BckZvQixvQkFxRlg7QUFDTCxTQUFLRixPQUFMLEdBQWVuQyxNQUFNLENBQUN5RCxPQUFQLENBQWVDLE9BQWYsQ0FBdUIsU0FBdkIsSUFBb0MxRCxNQUFNLENBQUN5RCxPQUFQLENBQWVDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0NDLElBQXRFLEdBQTZFLElBQTVGO0FBQ0EsU0FBSzVDLFVBQUwsQ0FBZ0I2QyxTQUFoQixHQUE0QixLQUFLekIsT0FBakM7QUFFQSxRQUFJMEIsV0FBVyxHQUFHN0QsTUFBTSxDQUFDOEQsSUFBUCxDQUFZQyxHQUFaLENBQWdCLGFBQWhCLENBQWxCO0FBQ0EsU0FBS3BELGFBQUwsQ0FBbUJxRCxjQUFuQixDQUFrQyxjQUFsQyxFQUFrREMsWUFBbEQsQ0FBK0Q1RCxFQUFFLENBQUNXLE1BQWxFLEVBQTBFNEMsU0FBMUUsR0FBc0ZDLFdBQVcsQ0FBQ0ssS0FBWixJQUFxQixDQUEzRztBQUNBLFNBQUtDLFdBQUw7QUFDSCxHQTVGbUI7QUE2RnBCO0FBQ0FyQixFQUFBQSxRQTlGb0Isc0JBOEZUO0FBQ1AsU0FBS1gsT0FBTCxHQUFlLEtBQUtwQixVQUFMLENBQWdCNkMsU0FBL0I7QUFDQTVELElBQUFBLE1BQU0sQ0FBQ3lELE9BQVAsQ0FBZVcsT0FBZixDQUF1QixTQUF2QixFQUFrQztBQUFFVCxNQUFBQSxJQUFJLEVBQUUsS0FBS3hCO0FBQWIsS0FBbEM7QUFDSCxHQWpHbUI7QUFtR3BCO0FBQ0FVLEVBQUFBLFdBcEdvQix1QkFvR1J3QixLQXBHUSxFQW9HRDtBQUNmLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLNUQsYUFBTCxDQUFtQjZELGFBQXZDLEVBQXNERCxDQUFDLEVBQXZELEVBQTJEO0FBQ3ZELFdBQUs1RCxhQUFMLENBQW1COEQsUUFBbkIsQ0FBNEJGLENBQTVCLEVBQStCRyxNQUEvQixHQUF3Q0osS0FBSyxJQUFJQyxDQUFqRDtBQUNIO0FBQ0osR0F4R21CO0FBMEdwQjtBQUNBSCxFQUFBQSxXQTNHb0IseUJBMkdOO0FBQ1YsUUFBSW5FLE1BQU0sQ0FBQzhELElBQVAsQ0FBWVksYUFBWixHQUE0QixDQUFoQyxFQUFtQztBQUMvQixXQUFLQyxhQUFMLENBQW1CLEtBQUtsRCxVQUF4QixFQUFvQyxJQUFwQyxFQUEwQ3pCLE1BQU0sQ0FBQzhELElBQVAsQ0FBWVksYUFBdEQ7QUFDQSxXQUFLQyxhQUFMLENBQW1CLEtBQUtoRCxhQUF4QixFQUF1QyxLQUF2QyxFQUE4QzNCLE1BQU0sQ0FBQzhELElBQVAsQ0FBWVksYUFBMUQ7QUFDSCxLQUhELE1BR087QUFDSCxXQUFLQyxhQUFMLENBQW1CLEtBQUtsRCxVQUF4QixFQUFvQyxLQUFwQztBQUNBLFdBQUtrRCxhQUFMLENBQW1CLEtBQUtoRCxhQUF4QixFQUF1QyxJQUF2QztBQUNIOztBQUNELFFBQUlpRCxJQUFJLEdBQUc1RSxNQUFNLENBQUM4RCxJQUFQLENBQVllLGVBQVosR0FBOEI3RSxNQUFNLENBQUM4RCxJQUFQLENBQVlZLGFBQXJEOztBQUNBLFFBQUlFLElBQUksR0FBRyxDQUFYLEVBQWM7QUFDVixXQUFLRCxhQUFMLENBQW1CLEtBQUtqRCxVQUF4QixFQUFvQyxJQUFwQyxFQUEwQ2tELElBQTFDO0FBQ0EsV0FBS0QsYUFBTCxDQUFtQixLQUFLL0MsYUFBeEIsRUFBdUMsS0FBdkMsRUFBOENnRCxJQUE5QztBQUNILEtBSEQsTUFHTztBQUNILFdBQUtELGFBQUwsQ0FBbUIsS0FBS2pELFVBQXhCLEVBQW9DLEtBQXBDO0FBQ0EsV0FBS2lELGFBQUwsQ0FBbUIsS0FBSy9DLGFBQXhCLEVBQXVDLElBQXZDO0FBQ0g7QUFDSixHQTNIbUI7QUE2SHBCO0FBQ0ErQyxFQUFBQSxhQTlIb0IseUJBOEhORyxRQTlITSxFQThISUMsT0E5SEosRUE4SGFDLElBOUhiLEVBOEhtQjtBQUNuQyxRQUFJQyxLQUFLLEdBQUdILFFBQVEsQ0FBQ0ksTUFBckI7O0FBQ0EsU0FBSyxJQUFJWixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHVyxLQUFwQixFQUEyQlgsQ0FBQyxFQUE1QixFQUFnQztBQUM1QlEsTUFBQUEsUUFBUSxDQUFDUixDQUFELENBQVIsQ0FBWUcsTUFBWixHQUFxQk0sT0FBckI7O0FBQ0EsVUFBSUMsSUFBSSxJQUFJRixRQUFRLENBQUNSLENBQUQsQ0FBUixDQUFZTixjQUFaLENBQTJCLFlBQTNCLENBQVosRUFBc0Q7QUFDbEQsWUFBSW1CLFFBQVEsR0FBR0wsUUFBUSxDQUFDUixDQUFELENBQVIsQ0FBWU4sY0FBWixDQUEyQixZQUEzQixFQUF5Q0EsY0FBekMsQ0FBd0QsTUFBeEQsQ0FBZjtBQUNBbUIsUUFBQUEsUUFBUSxDQUFDbEIsWUFBVCxDQUFzQjVELEVBQUUsQ0FBQ0ksS0FBekIsRUFBZ0MyRSxNQUFoQyx5QkFBOEMsS0FBS0MsUUFBTCxDQUFjTCxJQUFkLENBQTlDO0FBQ0g7QUFDSjtBQUNKLEdBdkltQjtBQXlJcEI7QUFDQU0sRUFBQUEsY0ExSW9CLDRCQTBJSDtBQUNiL0IsSUFBQUEsT0FBTyxDQUFDZ0MsR0FBUixDQUFZLE1BQVo7QUFDQXZGLElBQUFBLE1BQU0sQ0FBQ3dGLFFBQVAsQ0FBZ0JDLE9BQWhCO0FBQ0gsR0E3SW1CO0FBK0lwQjtBQUNBeEMsRUFBQUEsYUFoSm9CLDJCQWdKSjtBQUNaLFFBQUksQ0FBQyxLQUFLZCxPQUFWLEVBQW1CO0FBQ2ZuQyxNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCQyxRQUFuRDtBQUNBO0FBQ0g7O0FBQ0QsUUFBSTNCLEtBQUssR0FBRyxLQUFLNEIsVUFBTCxDQUFnQixLQUFLN0UsV0FBTCxDQUFpQm1FLE1BQWpDLENBQVo7QUFDQSxRQUFJbEIsS0FBSyxJQUFJLElBQVQsSUFBaUJBLEtBQUssSUFBSSxLQUE5QixFQUFxQztBQUNyQyxRQUFJNkIsR0FBRyxHQUFHLEtBQUtDLGFBQUwsQ0FBbUIsS0FBSzFFLFNBQUwsQ0FBZThELE1BQWxDLENBQVY7QUFDQSxRQUFJYSxPQUFPLEdBQUcsS0FBS0QsYUFBTCxDQUFtQixLQUFLMUUsU0FBTCxDQUFlOEQsTUFBbEMsRUFBMEMsS0FBSzdELGFBQUwsQ0FBbUI2RCxNQUE3RCxDQUFkO0FBRUEsUUFBSVcsR0FBRyxJQUFJLElBQVgsRUFBaUI7QUFDakIsUUFBSUUsT0FBTyxJQUFJLElBQWYsRUFBcUI7QUFDckIsUUFBSSxLQUFLOUUsVUFBTCxDQUFnQmlFLE1BQWhCLElBQTBCLEVBQTlCLEVBQWtDLE9BQU9wRixNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCTSxhQUFuRCxDQUFQO0FBQ2xDLFFBQUlDLElBQUksR0FBRyxLQUFLaEYsVUFBTCxDQUFnQmlFLE1BQTNCO0FBQ0EsUUFBSWdCLEdBQUcsR0FBRyxjQUFWLENBZFksQ0FjYTs7QUFDekIsUUFBSUMsS0FBSyxHQUFHRCxHQUFHLENBQUNFLElBQUosQ0FBU0MsTUFBTSxDQUFDLEtBQUtwRixVQUFMLENBQWdCaUUsTUFBakIsQ0FBZixDQUFaOztBQUNBLFFBQUksQ0FBQ2lCLEtBQUwsRUFBWTtBQUNSLGFBQU9yRyxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCWSxRQUFuRCxDQUFQO0FBQ0g7O0FBQ0RULElBQUFBLEdBQUcsR0FBR1UsR0FBRyxDQUFDVixHQUFELENBQVQsQ0FuQlksQ0FvQlo7O0FBQ0EvRixJQUFBQSxNQUFNLENBQUMwRyxLQUFQLENBQWFDLGdCQUFiLENBQThCO0FBQUV6QyxNQUFBQSxLQUFLLEVBQUVBLEtBQVQ7QUFBZ0IwQyxNQUFBQSxRQUFRLEVBQUViLEdBQTFCO0FBQStCYyxNQUFBQSxZQUFZLEVBQUVWO0FBQTdDLEtBQTlCLEVBckJZLENBcUIyRTs7QUFFdkZuRyxJQUFBQSxNQUFNLENBQUN5RCxPQUFQLENBQWVXLE9BQWYsQ0FBdUIsV0FBdkIsRUFBb0M7QUFBRVQsTUFBQUEsSUFBSSxFQUFFTztBQUFSLEtBQXBDO0FBQ0gsR0F4S21CO0FBeUtwQjtBQUNBeEIsRUFBQUEsWUExS29CLDBCQTBLTDtBQUNYLFFBQUl3QixLQUFLLEdBQUcsS0FBSzRCLFVBQUwsQ0FBZ0IsS0FBS2dCLGdCQUFMLENBQXNCLE9BQXRCLENBQWhCLENBQVo7QUFDQSxRQUFJLENBQUM1QyxLQUFMLEVBQVk7QUFDWmxFLElBQUFBLE1BQU0sQ0FBQzhELElBQVAsQ0FBWWlELGtCQUFaLENBQStCO0FBQUU3QyxNQUFBQSxLQUFLLEVBQUVBLEtBQVQ7QUFBZ0I4QyxNQUFBQSxJQUFJLEVBQUU7QUFBdEIsS0FBL0I7QUFDSCxHQTlLbUI7QUErS3BCO0FBQ0FqRSxFQUFBQSxvQkFoTG9CLGtDQWdMRztBQUNuQixRQUFJLENBQUMsS0FBS1osT0FBVixFQUFtQjtBQUNmbkMsTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QkMsUUFBbkQ7QUFDQTtBQUNILEtBSmtCLENBS25COzs7QUFDQSxRQUFJb0IsR0FBRyxHQUFHLEVBQVYsQ0FObUIsQ0FRbkI7O0FBQ0EsU0FBSyxJQUFJQyxHQUFULElBQWdCLEtBQUtsRixXQUFyQixFQUFrQztBQUM5QixVQUFJMkIsSUFBSSxHQUFHLEtBQUszQixXQUFMLENBQWlCa0YsR0FBakIsQ0FBWDtBQUNBLFVBQUksQ0FBQ3ZELElBQUQsSUFBU0EsSUFBSSxJQUFJLGNBQWpCLElBQW1DQSxJQUFJLElBQUksaUJBQTNDLElBQWdFQSxJQUFJLElBQUksVUFBNUUsRUFBd0Y7QUFDeEYsVUFBSXdELFlBQVksR0FBRyxLQUFLQyxXQUFMLENBQWlCekQsSUFBakIsQ0FBbkI7QUFDQSxVQUFJd0QsWUFBWSxJQUFJLElBQXBCLEVBQTBCOztBQUMxQixVQUFJQSxZQUFKLEVBQWtCO0FBQ2RGLFFBQUFBLEdBQUcsQ0FBQ3RELElBQUQsQ0FBSCxHQUFZd0QsWUFBWjtBQUNBLFlBQUl4RCxJQUFJLElBQUksS0FBWixFQUFtQnNELEdBQUcsQ0FBQyxNQUFELENBQUgsR0FBY0UsWUFBZDtBQUN0QjtBQUNKOztBQUVEbkgsSUFBQUEsTUFBTSxDQUFDMEcsS0FBUCxDQUFhVyxXQUFiLENBQXlCSixHQUF6QjtBQUNILEdBck1tQjtBQXNNcEI7QUFDQWpFLEVBQUFBLG9CQXZNb0Isa0NBdU1HO0FBQ25CLFFBQUlrQixLQUFLLEdBQUcsS0FBSzRCLFVBQUwsQ0FBZ0IsS0FBSzdFLFdBQUwsQ0FBaUJtRSxNQUFqQyxDQUFaO0FBQ0EsUUFBSSxDQUFDbEIsS0FBTCxFQUFZO0FBQ1psRSxJQUFBQSxNQUFNLENBQUM4RCxJQUFQLENBQVl3RCxZQUFaLENBQXlCO0FBQUVwRCxNQUFBQSxLQUFLLEVBQUVBLEtBQVQ7QUFBZ0I4QyxNQUFBQSxJQUFJLEVBQUU7QUFBdEIsS0FBekI7QUFDSCxHQTNNbUI7QUE0TXBCO0FBQ0E1RCxFQUFBQSxVQTdNb0Isd0JBNk1QO0FBQ1QsU0FBS1gsTUFBTCxDQUFZLEtBQVo7QUFDQXpDLElBQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYWtFLFlBQWI7QUFDSCxHQWhObUI7QUFrTnBCO0FBQ0FDLEVBQUFBLGlCQW5Ob0IsK0JBbU5BO0FBQ2hCLFNBQUtwRixTQUFMLEdBQWlCLElBQWpCLENBRGdCLENBRWhCOztBQUNBLFFBQUlxRixXQUFXLEdBQUd6SCxNQUFNLENBQUM4RCxJQUFQLENBQVlDLEdBQVosQ0FBZ0IsYUFBaEIsRUFBK0IyRCxnQkFBakQ7QUFDQSxRQUFJQyxTQUFTLEdBQUczSCxNQUFNLENBQUM4RCxJQUFQLENBQVlDLEdBQVosQ0FBZ0IsYUFBaEIsRUFBK0I2RCxjQUEvQzs7QUFDQSxRQUFLSCxXQUFXLElBQUksQ0FBZixJQUFvQkUsU0FBUyxJQUFJLENBQWxDLElBQXlDRixXQUFXLElBQUksQ0FBZixJQUFvQkUsU0FBUyxJQUFJLENBQTlFLEVBQWtGO0FBQzlFLFdBQUtoSCxhQUFMLENBQW1CcUQsY0FBbkIsQ0FBa0MsY0FBbEMsRUFBa0RTLE1BQWxELEdBQTJELEtBQTNEO0FBQ0EsV0FBSzlELGFBQUwsQ0FBbUJxRCxjQUFuQixDQUFrQyxpQkFBbEMsRUFBcURDLFlBQXJELENBQWtFNUQsRUFBRSxDQUFDVyxNQUFyRSxFQUE2RTZHLEtBQTdFO0FBQ0EsV0FBS2hGLFdBQUwsQ0FBaUJoRCxVQUFVLENBQUNFLFFBQTVCO0FBQ0g7O0FBQ0QsUUFBSzBILFdBQVcsSUFBSSxDQUFmLElBQW9CRSxTQUFTLElBQUksQ0FBdEMsRUFBMEM7QUFDdEMsV0FBS2hILGFBQUwsQ0FBbUJxRCxjQUFuQixDQUFrQyxpQkFBbEMsRUFBcURTLE1BQXJELEdBQThELEtBQTlEO0FBQ0EsV0FBSzlELGFBQUwsQ0FBbUJxRCxjQUFuQixDQUFrQyxjQUFsQyxFQUFrREMsWUFBbEQsQ0FBK0Q1RCxFQUFFLENBQUNXLE1BQWxFLEVBQTBFNkcsS0FBMUU7QUFDQSxXQUFLaEYsV0FBTCxDQUFpQmhELFVBQVUsQ0FBQ0MsS0FBNUI7QUFDSDs7QUFDRCxRQUFJMkgsV0FBVyxJQUFJLENBQWYsSUFBb0JFLFNBQVMsSUFBSSxDQUFyQyxFQUF3QztBQUNwQyxXQUFLaEgsYUFBTCxDQUFtQnFELGNBQW5CLENBQWtDLGlCQUFsQyxFQUFxREMsWUFBckQsQ0FBa0U1RCxFQUFFLENBQUNXLE1BQXJFLEVBQTZFNkcsS0FBN0U7QUFDQSxXQUFLaEYsV0FBTCxDQUFpQmhELFVBQVUsQ0FBQ0UsUUFBNUI7QUFDSDtBQUNKLEdBdE9tQjtBQXdPcEJtQyxFQUFBQSxnQkF4T29CLDhCQXdPRDtBQUNmLFNBQUssSUFBSW9DLENBQUMsR0FBRyxDQUFSLEVBQVdXLEtBQUssR0FBRyxLQUFLakQsV0FBTCxDQUFpQmtELE1BQXpDLEVBQWlEWixDQUFDLEdBQUdXLEtBQXJELEVBQTREWCxDQUFDLEVBQTdELEVBQWlFO0FBQzdELFVBQUkvQixJQUFJLEdBQUcsS0FBS1AsV0FBTCxDQUFpQnNDLENBQWpCLENBQVg7QUFDQSxVQUFJLENBQUMvQixJQUFELElBQVNBLElBQUksSUFBSSxjQUFqQixJQUFtQ0EsSUFBSSxJQUFJLGlCQUEzQyxJQUFnRUEsSUFBSSxJQUFJLFVBQTVFLEVBQXdGO0FBQ3hGLFVBQUl1RixXQUFXLEdBQUcsS0FBS0MsV0FBTCxDQUFpQnhGLElBQWpCLENBQWxCO0FBQ0F1RixNQUFBQSxXQUFXLENBQUNyRCxNQUFaLEdBQXFCLElBQXJCO0FBQ0g7O0FBQ0QsU0FBS3RCLGVBQUwsR0FQZSxDQU9RO0FBQzFCLEdBaFBtQjtBQWtQcEI2RSxFQUFBQSxTQWxQb0IsdUJBa1BSO0FBQ1IsU0FBS0MsZUFBTDtBQUNBakksSUFBQUEsTUFBTSxDQUFDOEQsSUFBUCxDQUFZb0Usc0JBQVo7QUFDQWxJLElBQUFBLE1BQU0sQ0FBQzhELElBQVAsQ0FBWXFFLGtCQUFaO0FBQ0FuSSxJQUFBQSxNQUFNLENBQUM4RCxJQUFQLENBQVlzRSx3QkFBWjtBQUNILEdBdlBtQjtBQXdQcEJuRyxFQUFBQSxhQXhQb0IsMkJBd1BKO0FBQ1pqQyxJQUFBQSxNQUFNLENBQUNxSSxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsZUFBbEIsRUFBbUMsS0FBS0MsWUFBeEMsRUFBc0QsSUFBdEQ7QUFDQXZJLElBQUFBLE1BQU0sQ0FBQ3FJLE9BQVAsQ0FBZUMsRUFBZixDQUFrQkUsT0FBTyxDQUFDQyxJQUFSLENBQWFDLFlBQS9CLEVBQTZDLEtBQUtDLGNBQWxELEVBQWtFLElBQWxFO0FBQ0EzSSxJQUFBQSxNQUFNLENBQUNxSSxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsY0FBbEIsRUFBa0MsS0FBS00sWUFBdkMsRUFBcUQsSUFBckQ7QUFDQTVJLElBQUFBLE1BQU0sQ0FBQ3FJLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixhQUFsQixFQUFpQyxLQUFLTyxXQUF0QyxFQUFtRCxJQUFuRDtBQUNBN0ksSUFBQUEsTUFBTSxDQUFDcUksT0FBUCxDQUFlQyxFQUFmLENBQWtCLHlCQUFsQixFQUE2QyxLQUFLUSxTQUFsRCxFQUE2RCxJQUE3RDtBQUNILEdBOVBtQjtBQStQcEJiLEVBQUFBLGVBL1BvQiw2QkErUEY7QUFDZGpJLElBQUFBLE1BQU0sQ0FBQ3FJLE9BQVAsQ0FBZVUsR0FBZixDQUFtQixlQUFuQixFQUFvQyxJQUFwQztBQUNBL0ksSUFBQUEsTUFBTSxDQUFDcUksT0FBUCxDQUFlVSxHQUFmLENBQW1CUCxPQUFPLENBQUNDLElBQVIsQ0FBYUMsWUFBaEMsRUFBOEMsSUFBOUM7QUFDQTFJLElBQUFBLE1BQU0sQ0FBQ3FJLE9BQVAsQ0FBZVUsR0FBZixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUNBL0ksSUFBQUEsTUFBTSxDQUFDcUksT0FBUCxDQUFlVSxHQUFmLENBQW1CLGFBQW5CLEVBQWtDLElBQWxDO0FBQ0EvSSxJQUFBQSxNQUFNLENBQUNxSSxPQUFQLENBQWVVLEdBQWYsQ0FBbUIseUJBQW5CLEVBQThDLElBQTlDO0FBQ0gsR0FyUW1CO0FBdVFwQkQsRUFBQUEsU0F2UW9CLHVCQXVRUjtBQUNSLFNBQUtyRyxNQUFMO0FBQ0gsR0F6UW1CO0FBMFFwQjtBQUNBb0csRUFBQUEsV0EzUW9CLHVCQTJRUjVCLEdBM1FRLEVBMlFIO0FBQ2IsUUFBSWpILE1BQU0sQ0FBQzhELElBQVAsQ0FBWUMsR0FBWixDQUFnQixnQkFBaEIsS0FBcUNrRCxHQUFHLEdBQUcsQ0FBL0MsRUFBa0Q7QUFDOUMsV0FBSzVGLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCb0QsTUFBM0IsR0FBb0MsS0FBcEM7QUFDQSxXQUFLcEQsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJvRCxNQUEzQixHQUFvQyxJQUFwQztBQUNBLFdBQUtyRCxnQkFBTCxDQUFzQixDQUF0QixFQUF5QnFELE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsV0FBS3JELGdCQUFMLENBQXNCLENBQXRCLEVBQXlCcUQsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxXQUFLakQsZUFBTCxDQUFxQjRELE1BQXJCLGFBQWlDNkIsR0FBakM7QUFDSCxLQU5ELE1BTU87QUFDSCxXQUFLNUYsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJvRCxNQUEzQixHQUFvQyxJQUFwQztBQUNBLFdBQUtwRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQm9ELE1BQTNCLEdBQW9DLEtBQXBDO0FBQ0EsV0FBS3JELGdCQUFMLENBQXNCLENBQXRCLEVBQXlCcUQsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxXQUFLckQsZ0JBQUwsQ0FBc0IsQ0FBdEIsRUFBeUJxRCxNQUF6QixHQUFrQyxLQUFsQztBQUNIO0FBQ0osR0F4Um1CO0FBeVJwQjtBQUNBa0UsRUFBQUEsY0ExUm9CLDBCQTBSTEssVUExUkssRUEwUk87QUFFdkJ6RixJQUFBQSxPQUFPLENBQUNnQyxHQUFSLENBQVksV0FBWixFQUF5QnlELFVBQXpCO0FBQ0EsU0FBS0EsVUFBTCxHQUFrQkEsVUFBVSxDQUFDckYsSUFBN0I7QUFDQSxTQUFLc0YsWUFBTCxHQUFvQkQsVUFBVSxDQUFDbkgsUUFBL0I7QUFDQSxTQUFLSyxnQkFBTDtBQUNBLFNBQUtnSCxXQUFMOztBQUNBLFFBQUksS0FBSzlHLFNBQVQsRUFBb0I7QUFDaEIsV0FBS3RCLFdBQUwsQ0FBaUJrRCxjQUFqQixDQUFnQyxXQUFoQyxFQUE2Q1MsTUFBN0MsR0FBc0QsSUFBdEQ7QUFDQSxhQUZnQixDQUdoQjtBQUNILEtBSkQsTUFJTztBQUNILFdBQUssSUFBSUgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLM0QsYUFBTCxDQUFtQjRELGFBQXZDLEVBQXNERCxDQUFDLEVBQXZELEVBQTJEO0FBQ3ZELFlBQUksS0FBSzNELGFBQUwsQ0FBbUI2RCxRQUFuQixDQUE0QkYsQ0FBNUIsRUFBK0JHLE1BQW5DLEVBQTJDO0FBQ3ZDLGVBQUtuQyxPQUFMLENBQWEsS0FBSzNCLGFBQUwsQ0FBbUI2RCxRQUFuQixDQUE0QkYsQ0FBNUIsRUFBK0IvQixJQUE1QztBQUNBLGVBQUs1QixhQUFMLENBQW1CNkQsUUFBbkIsQ0FBNEJGLENBQTVCLEVBQStCTCxZQUEvQixDQUE0QzVELEVBQUUsQ0FBQ1csTUFBL0MsRUFBdUQ0QyxTQUF2RCxHQUFtRSxJQUFuRTtBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0E5U21CO0FBZ1RwQnVGLEVBQUFBLGNBaFRvQiwwQkFnVExDLFNBaFRLLEVBZ1RNO0FBQ3RCLFFBQUlDLFNBQVMsR0FBRyxLQUFoQjs7QUFDQSxTQUFLLElBQUkvRSxDQUFDLEdBQUcsQ0FBUixFQUFXVyxLQUFLLEdBQUcsS0FBS2pELFdBQUwsQ0FBaUJrRCxNQUF6QyxFQUFpRFosQ0FBQyxHQUFHVyxLQUFyRCxFQUE0RFgsQ0FBQyxFQUE3RCxFQUFpRTtBQUM3RCxVQUFJL0IsSUFBSSxHQUFHLEtBQUtQLFdBQUwsQ0FBaUJzQyxDQUFqQixDQUFYO0FBQ0EsVUFBSSxDQUFDL0IsSUFBTCxFQUFXOztBQUNYLFVBQUlBLElBQUksSUFBSTZHLFNBQVosRUFBdUI7QUFBRUMsUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFBa0I7QUFBUTtBQUN0RDs7QUFDRCxXQUFPQSxTQUFQO0FBQ0gsR0F4VG1CO0FBMFRwQjtBQUNBSCxFQUFBQSxXQTNUb0IseUJBMlROO0FBQ1YzRixJQUFBQSxPQUFPLENBQUNnQyxHQUFSLENBQVksY0FBWixFQUE0QixLQUFLeUQsVUFBakM7QUFDQSxRQUFJM0UsS0FBSyxHQUFHLENBQVo7O0FBQ0EsU0FBSyxJQUFJNkMsR0FBVCxJQUFnQixLQUFLOEIsVUFBckIsRUFBaUM7QUFDN0IsVUFBSU0sS0FBSyxHQUFHLEtBQUtOLFVBQUwsQ0FBZ0I5QixHQUFoQixDQUFaO0FBRUEsVUFBSXFDLFFBQVEsR0FBRyxLQUFLeEIsV0FBTCxDQUFpQnVCLEtBQUssQ0FBQ3BDLEdBQXZCLENBQWY7O0FBQ0EsVUFBSXFDLFFBQVEsQ0FBQ3ZGLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUNwQ3VGLFFBQUFBLFFBQVEsQ0FBQ3ZGLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLFlBQW5DLENBQWdENUQsRUFBRSxDQUFDYSxPQUFuRCxFQUE0RHNJLFdBQTVELEdBQTBFRixLQUFLLENBQUNHLFdBQWhGO0FBQ0gsT0FONEIsQ0FPN0I7OztBQUNBLFVBQUlILEtBQUssQ0FBQ3BDLEdBQU4sSUFBYSxVQUFiLElBQTJCb0MsS0FBSyxDQUFDSSxLQUFOLElBQWUsQ0FBOUMsRUFBaUQ7QUFDN0MsYUFBS3ZHLGVBQUw7QUFDQW9HLFFBQUFBLFFBQVEsQ0FBQzlFLE1BQVQsR0FBa0IsSUFBbEI7QUFDSDs7QUFDRCxVQUFJLENBQUM2RSxLQUFELElBQVUsS0FBS0gsY0FBTCxDQUFvQkcsS0FBSyxDQUFDcEMsR0FBMUIsQ0FBZCxFQUE4QyxTQVpqQixDQWE3Qjs7QUFDQSxVQUFJLENBQUNxQyxRQUFELElBQWFELEtBQUssQ0FBQ0ksS0FBTixJQUFlLENBQWhDLEVBQW1DO0FBQ25DLFVBQUlKLEtBQUssQ0FBQ0ksS0FBTixJQUFlLENBQW5CLEVBQXNCSCxRQUFRLENBQUN2RixjQUFULENBQXdCLE9BQXhCLEVBQWlDQSxjQUFqQyxDQUFnRCxNQUFoRCxFQUF3RFMsTUFBeEQsR0FBaUUsS0FBakUsQ0FBdEIsS0FDSyxJQUFJNkUsS0FBSyxDQUFDSSxLQUFOLElBQWUsQ0FBbkIsRUFBc0JILFFBQVEsQ0FBQ3ZGLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNBLGNBQWpDLENBQWdELE1BQWhELEVBQXdEUyxNQUF4RCxHQUFpRSxJQUFqRTtBQUMzQjhFLE1BQUFBLFFBQVEsQ0FBQ0ksZUFBVCxDQUF5QnRGLEtBQXpCO0FBQ0FBLE1BQUFBLEtBQUs7QUFDTGtGLE1BQUFBLFFBQVEsQ0FBQzlFLE1BQVQsR0FBa0IsSUFBbEI7QUFFSCxLQXhCUyxDQXlCVjs7O0FBQ0EsU0FBS3NELFdBQUwsQ0FBaUIsV0FBakIsRUFBOEJ0RCxNQUE5QixHQUF1QyxJQUF2QztBQUNBLFNBQUtzRCxXQUFMLENBQWlCLHVCQUFqQixFQUEwQ3RELE1BQTFDLEdBQW1ELElBQW5EO0FBQ0FsQixJQUFBQSxPQUFPLENBQUNnQyxHQUFSLENBQVksY0FBWixFQUE0QmxCLEtBQTVCLEVBNUJVLENBNkJWOztBQUNBLFFBQUl1RixJQUFJLEdBQUcsS0FBWDs7QUFDQSxTQUFLLElBQUkxQyxJQUFULElBQWdCLEtBQUs4QixVQUFyQixFQUFpQztBQUM3QixVQUFJLEtBQUtBLFVBQUwsQ0FBZ0I5QixJQUFoQixFQUFxQkEsR0FBckIsSUFBNEIsS0FBNUIsSUFBcUMsS0FBSzhCLFVBQUwsQ0FBZ0I5QixJQUFoQixFQUFxQkEsR0FBckIsSUFBNEIsS0FBakUsSUFBMEUsS0FBSzhCLFVBQUwsQ0FBZ0I5QixJQUFoQixFQUFxQkEsR0FBckIsSUFBNEIsTUFBdEcsSUFBZ0gsS0FBSzhCLFVBQUwsQ0FBZ0I5QixJQUFoQixFQUFxQkEsR0FBckIsSUFBNEIsVUFBaEosRUFBNEo7QUFDeEo7QUFDSDs7QUFDRDNELE1BQUFBLE9BQU8sQ0FBQ2dDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCMkIsSUFBekIsRUFBOEIsS0FBSzhCLFVBQUwsQ0FBZ0I5QixJQUFoQixFQUFxQndDLEtBQW5EOztBQUNBLFVBQUksS0FBS1YsVUFBTCxDQUFnQjlCLElBQWhCLEVBQXFCd0MsS0FBckIsSUFBOEIsQ0FBbEMsRUFBcUM7QUFDakNFLFFBQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7QUFDSDtBQUNKOztBQUNELFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1AsVUFBSUMsS0FBSyxHQUFHLEtBQUs5QixXQUFMLENBQWlCLGlCQUFqQixDQUFaO0FBQUEsVUFDSStCLElBQUksR0FBRyxLQUFLL0IsV0FBTCxDQUFpQixVQUFqQixDQURYO0FBRUE4QixNQUFBQSxLQUFLLENBQUNwRixNQUFOLEdBQWUsS0FBZjtBQUNBcUYsTUFBQUEsSUFBSSxDQUFDckYsTUFBTCxHQUFjLEtBQWQ7QUFDSDtBQUNKLEdBMVdtQjtBQTRXcEI7QUFDQThELEVBQUFBLFlBN1dvQiwwQkE2V0w7QUFDWCxTQUFLOUYsTUFBTDtBQUNILEdBL1dtQjtBQWdYcEI7QUFDQXNGLEVBQUFBLFdBalhvQix1QkFpWFJnQyxRQWpYUSxFQWlYRTtBQUNsQixXQUFPLEtBQUszSixVQUFMLENBQWdCNEQsY0FBaEIsQ0FBK0IrRixRQUEvQixDQUFQO0FBQ0gsR0FuWG1CO0FBb1hwQjtBQUNBakQsRUFBQUEsZ0JBclhvQiw0QkFxWEhpRCxRQXJYRyxFQXFYTztBQUN2QixRQUFJQyxTQUFTLEdBQUcsS0FBSzVKLFVBQUwsQ0FBZ0I0RCxjQUFoQixDQUErQitGLFFBQS9CLENBQWhCO0FBQUEsUUFDSUUsTUFBTSxHQUFHRCxTQUFTLENBQUNoRyxjQUFWLENBQXlCLFNBQXpCLENBRGI7QUFFQSxXQUFPaUcsTUFBTSxDQUFDaEcsWUFBUCxDQUFvQjVELEVBQUUsQ0FBQ2EsT0FBdkIsRUFBZ0NrRSxNQUF2QztBQUNILEdBelhtQjtBQTJYcEI7QUFDQThFLEVBQUFBLFNBNVhvQix1QkE0WFI7QUFDUixTQUFLL0gsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDSCxHQTlYbUI7QUFnWXBCO0FBQ0FnSSxFQUFBQSxVQWpZb0Isd0JBaVlQO0FBQ1QsUUFBSSxLQUFLQyxVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQ3pCQyxNQUFBQSxZQUFZLENBQUMsS0FBS0QsVUFBTixDQUFaO0FBQ0g7O0FBQ0QsU0FBS0EsVUFBTCxHQUFrQixJQUFsQjtBQUNILEdBdFltQjtBQXVZcEJ4QixFQUFBQSxZQXZZb0Isd0JBdVlQM0IsR0F2WU8sRUF1WUY7QUFDZDFELElBQUFBLE9BQU8sQ0FBQ2dDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCMEIsR0FBekI7QUFDQSxTQUFLcUQsUUFBTCxHQUFnQnJELEdBQUcsQ0FBQ3NELEtBQUosQ0FBVSxHQUFWLENBQWhCO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEtBQUtGLFFBQUwsQ0FBYyxDQUFkLENBQWpCO0FBQUEsUUFDSUcsUUFBUSxHQUFHLEtBQUtILFFBQUwsQ0FBYyxDQUFkLENBRGY7QUFFQSxTQUFLSSxhQUFMLENBQW1CMUcsY0FBbkIsQ0FBa0MsVUFBbEMsRUFBOENBLGNBQTlDLENBQTZELFNBQTdELEVBQXdFQyxZQUF4RSxDQUFxRjVELEVBQUUsQ0FBQ2EsT0FBeEYsRUFBaUdrRSxNQUFqRyxhQUE2R29GLFVBQTdHLG1CQUEySEMsUUFBM0g7QUFDSCxHQTdZbUI7QUErWXBCO0FBQ0E5SCxFQUFBQSxnQkFoWm9CLDhCQWdaRDtBQUNmM0MsSUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhc0gsWUFBYjtBQUNILEdBbFptQjtBQW9acEJ4SCxFQUFBQSxlQXBab0IsNkJBb1pGO0FBQ2QsUUFBSXlILEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQixRQUFRLElBQVIsR0FBZSxDQUFoQyxJQUFxQyxJQUFoRCxDQUFWO0FBQ0F4SCxJQUFBQSxPQUFPLENBQUNnQyxHQUFSLENBQVksVUFBWixFQUF3QnFGLEdBQXhCO0FBQ0EsU0FBS3BLLFlBQUwsQ0FBa0I0RSxNQUFsQixHQUEyQndGLEdBQTNCO0FBQ0gsR0F4Wm1CO0FBMFpwQjtBQUNBeEQsRUFBQUEsV0EzWm9CLHVCQTJaUjRELE9BM1pRLEVBMlpDO0FBQ2pCLFFBQUlySCxJQUFJLEdBQUcsSUFBWDs7QUFDQSxZQUFRcUgsT0FBUjtBQUNJLFdBQUssS0FBTDtBQUNJLFlBQUlDLEdBQUcsR0FBRyxLQUFLQyxRQUFMLENBQWMsS0FBS3BFLGdCQUFMLENBQXNCa0UsT0FBdEIsQ0FBZCxDQUFWO0FBQ0EsWUFBSUMsR0FBSixFQUFTdEgsSUFBSSxHQUFHc0gsR0FBUDtBQUNUOztBQUNKLFdBQUssS0FBTDtBQUNJLFlBQUlsRixHQUFHLEdBQUcsS0FBS0MsYUFBTCxDQUFtQixLQUFLYyxnQkFBTCxDQUFzQixLQUF0QixDQUFuQixFQUFpRCxLQUFLQSxnQkFBTCxDQUFzQixNQUF0QixDQUFqRCxDQUFWO0FBQ0EsWUFBSWYsR0FBSixFQUFTcEMsSUFBSSxHQUFHOEMsR0FBRyxDQUFDVixHQUFELENBQVY7QUFDVDs7QUFDSixXQUFLLE1BQUw7QUFDSSxZQUFJb0YsSUFBSSxHQUFHLEtBQUtDLGtCQUFMLENBQXdCLEtBQUt0RSxnQkFBTCxDQUFzQmtFLE9BQXRCLENBQXhCLENBQVg7QUFDQSxZQUFJRyxJQUFKLEVBQVV4SCxJQUFJLEdBQUd3SCxJQUFQO0FBQ1Y7O0FBQ0osV0FBSyxPQUFMO0FBQ0ksWUFBSUUsS0FBSyxHQUFHLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS3hFLGdCQUFMLENBQXNCa0UsT0FBdEIsQ0FBaEIsQ0FBWjtBQUNBLFlBQUlLLEtBQUosRUFBVzFILElBQUksR0FBRzBILEtBQVA7QUFDWDs7QUFDSixXQUFLLE1BQUw7QUFDSSxZQUFJOUksSUFBSSxHQUFHLEtBQUtnSixTQUFMLENBQWUsS0FBS3pFLGdCQUFMLENBQXNCa0UsT0FBdEIsQ0FBZixDQUFYO0FBQ0EsWUFBSXpJLElBQUosRUFBVW9CLElBQUksR0FBR3BCLElBQVA7QUFDVjs7QUFDSixXQUFLLEtBQUw7QUFDSTs7QUFDSixXQUFLLE9BQUw7QUFDSSxZQUFJMkIsS0FBSyxHQUFHLEtBQUs0QixVQUFMLENBQWdCLEtBQUtnQixnQkFBTCxDQUFzQmtFLE9BQXRCLENBQWhCLENBQVo7QUFDQSxZQUFJOUcsS0FBSixFQUFXUCxJQUFJLEdBQUdPLEtBQVA7QUFDWDs7QUFDSixXQUFLLFFBQUw7QUFDSSxZQUFJc0gsTUFBTSxHQUFHLEtBQUtDLE9BQUwsQ0FBYSxLQUFLM0UsZ0JBQUwsQ0FBc0JrRSxPQUF0QixDQUFiLENBQWI7QUFDQSxZQUFJUSxNQUFKLEVBQVk3SCxJQUFJLEdBQUc2SCxNQUFQO0FBQ1o7O0FBQ0osV0FBSyxJQUFMO0FBQ0ksWUFBSUUsS0FBSyxHQUFHLEtBQUtDLE9BQUwsQ0FBYSxLQUFLN0UsZ0JBQUwsQ0FBc0JrRSxPQUF0QixDQUFiLENBQVo7QUFDQSxZQUFJVSxLQUFKLEVBQVcvSCxJQUFJLEdBQUcrSCxLQUFQO0FBQ1g7O0FBQ0osV0FBSyxPQUFMO0FBQ0ksWUFBSUUsS0FBSyxHQUFHLEtBQUtDLFNBQUwsQ0FBZSxLQUFLL0UsZ0JBQUwsQ0FBc0JrRSxPQUF0QixDQUFmLENBQVo7QUFDQSxZQUFJWSxLQUFKLEVBQVdqSSxJQUFJLEdBQUdpSSxLQUFQO0FBQ1g7O0FBQ0osV0FBSyxVQUFMO0FBQ0ksWUFBSUUsUUFBUSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUIsS0FBS2pGLGdCQUFMLENBQXNCa0UsT0FBdEIsQ0FBbkIsQ0FBZjtBQUNBLFlBQUljLFFBQUosRUFBY25JLElBQUksR0FBR21JLFFBQVA7QUFDZDs7QUFDSixXQUFLLFVBQUw7QUFDSSxZQUFJRSxRQUFRLEdBQUcsS0FBS0MsYUFBTCxDQUFtQixLQUFLM0IsUUFBeEIsQ0FBZjtBQUNBLFlBQUkwQixRQUFKLEVBQWNySSxJQUFJLEdBQUdxSSxRQUFQO0FBQ2Q7O0FBQ0osV0FBSyxVQUFMO0FBQ0ksWUFBSUUsU0FBUyxHQUFHLEtBQUtwRixnQkFBTCxDQUFzQmtFLE9BQXRCLENBQWhCOztBQUNBLFlBQUdrQixTQUFTLENBQUNoSCxNQUFWLElBQW9CLENBQXZCLEVBQTBCO0FBQ3RCbEYsVUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QlksUUFBbkQ7QUFDQTtBQUNIOztBQUVELFlBQUlILEtBQUssR0FBRyxLQUFLUyxnQkFBTCxDQUFzQmtFLE9BQXRCLEtBQWtDLEtBQUt4SyxZQUFMLENBQWtCNEUsTUFBcEQsR0FBNkQsSUFBN0QsR0FBb0UsS0FBaEY7O0FBQ0EsWUFBSSxDQUFDaUIsS0FBTCxFQUFZO0FBQ1JyRyxVQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCWSxRQUFuRDtBQUNILFNBRkQsTUFFTzdDLElBQUksR0FBRyxLQUFLbkQsWUFBTCxDQUFrQjRFLE1BQXpCOztBQUNQOztBQUVKO0FBQVN6QixRQUFBQSxJQUFJLEdBQUcsS0FBUDtBQUFjO0FBNUQzQjs7QUE4REEsV0FBT0EsSUFBUDtBQUNILEdBNWRtQjtBQThkcEI7QUFDQXdJLEVBQUFBLGFBL2RvQix5QkErZE5DLFNBL2RNLEVBK2RLO0FBQ3JCLFFBQUlDLFFBQVEsR0FBRyxLQUFmO0FBQ0EsUUFBSUQsU0FBUyxDQUFDMUMsS0FBVixJQUFtQixDQUF2QixFQUEwQixPQUFPMkMsUUFBUDs7QUFDMUIsUUFBSUQsU0FBUyxDQUFDMUMsS0FBVixJQUFtQixDQUF2QixFQUEwQjtBQUN0QjJDLE1BQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsYUFBT0EsUUFBUDtBQUNIOztBQUNELFlBQVFELFNBQVMsQ0FBQ2xGLEdBQWxCO0FBQ0ksV0FBSyxPQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQ0EsV0FBSyxPQUFMO0FBQ0EsV0FBSyxRQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxPQUFMO0FBQ0EsV0FBSyxVQUFMO0FBQ0EsV0FBSyxVQUFMO0FBQ0ltRixRQUFBQSxRQUFRLEdBQUcsS0FBS3ZGLGdCQUFMLENBQXNCc0YsU0FBUyxDQUFDbEYsR0FBaEMsS0FBd0MsRUFBbkQ7QUFDQTs7QUFDSjtBQUFTO0FBWGI7O0FBYUEsV0FBT21GLFFBQVA7QUFDSCxHQXBmbUI7QUFxZnBCO0FBQ0FKLEVBQUFBLGFBdGZvQix5QkFzZk50SSxJQXRmTSxFQXNmQTtBQUNoQixRQUFJLENBQUNBLElBQUwsRUFBVztBQUNQM0QsTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QjBHLFFBQW5EO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsUUFBSU4sUUFBUSxhQUFNckksSUFBSSxDQUFDLENBQUQsQ0FBVixjQUFpQkEsSUFBSSxDQUFDLENBQUQsQ0FBckIsQ0FBWjtBQUNBLFdBQU9xSSxRQUFQO0FBQ0gsR0E3Zm1CO0FBOGZwQjtBQUNBWixFQUFBQSxrQkEvZm9CLDhCQStmREQsSUEvZkMsRUErZks7QUFDckIsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDUG5MLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUIyRyxhQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUluRyxHQUFHLEdBQUcsV0FBVixDQUxxQixDQUtFOztBQUN2QixRQUFJb0csY0FBYyxHQUFHcEcsR0FBRyxDQUFDRSxJQUFKLENBQVM2RSxJQUFULENBQXJCOztBQUNBLFFBQUksQ0FBQ3FCLGNBQUwsRUFBcUI7QUFDakJ4TSxNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCNkcsbUJBQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT3RCLElBQVA7QUFDSCxHQTNnQm1CO0FBNGdCcEI7QUFDQUcsRUFBQUEsVUE3Z0JvQixzQkE2Z0JURCxLQTdnQlMsRUE2Z0JGO0FBQ2QsUUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUnJMLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUI4RyxLQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNILEtBSmEsQ0FLZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFdBQU9yQixLQUFQO0FBQ0gsR0F6aEJtQjtBQTBoQnBCO0FBQ0F2RixFQUFBQSxVQTNoQm9CLHNCQTJoQlRtRixHQTNoQlMsRUEyaEJKO0FBQ1osUUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDTmpMLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUIrRyxTQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNILEtBSlcsQ0FLWjtBQUNBO0FBQ0E7OztBQUNBLFFBQUl2RyxHQUFHLEdBQUcsbUhBQVYsQ0FSWSxDQVNaOztBQUNBLFFBQUl3RyxhQUFhLEdBQUd4RyxHQUFHLENBQUNFLElBQUosQ0FBUzJFLEdBQVQsQ0FBcEI7O0FBQ0EsUUFBSSxDQUFDMkIsYUFBTCxFQUFvQjtBQUNoQjVNLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIsV0FBMUI7QUFDQSxhQUFPLEtBQVA7QUFDSDs7QUFDRCxXQUFPdUYsR0FBUDtBQUNILEdBM2lCbUI7QUE0aUJwQjtBQUNBNEIsRUFBQUEsaUJBN2lCb0IsNkJBNmlCRnhHLEtBN2lCRSxFQTZpQks7QUFDckIsUUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUnJHLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUJrSCxVQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFdBQU96RyxLQUFQO0FBQ0gsR0FuakJtQjtBQW9qQnBCO0FBQ0E2RSxFQUFBQSxRQXJqQm9CLG9CQXFqQlhELEdBcmpCVyxFQXFqQk47QUFDVixRQUFJLENBQUNBLEdBQUQsSUFBUUEsR0FBRyxJQUFJLEVBQW5CLEVBQXVCO0FBQ25CakwsTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5Qm1ILE9BQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsUUFBSTlCLEdBQUcsQ0FBQy9GLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUNoQmxGLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUJvSCxTQUFuRDtBQUNBLGFBQU8sS0FBUDtBQUNILEtBUlMsQ0FTVjs7O0FBQ0EsUUFBSTVHLEdBQUcsR0FBRyxxQkFBVjtBQUNBLFFBQUk2RyxTQUFTLEdBQUc3RyxHQUFHLENBQUNFLElBQUosQ0FBUzJFLEdBQVQsQ0FBaEI7O0FBQ0EsUUFBSSxDQUFDZ0MsU0FBTCxFQUFnQjtBQUNaak4sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QnNILE9BQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT2pDLEdBQVA7QUFDSCxHQXRrQm1CO0FBdWtCcEI7QUFDQVUsRUFBQUEsT0F4a0JvQixtQkF3a0JaRCxLQXhrQlksRUF3a0JMO0FBQ1gsUUFBSSxDQUFDQSxLQUFELElBQVVBLEtBQUssSUFBSSxFQUF2QixFQUEyQjtBQUN2QjFMLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUJ1SCxNQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUkvRyxHQUFHLEdBQUcsc0JBQVYsQ0FMVyxDQUt1Qjs7QUFDbEMsUUFBSWdILGVBQWUsR0FBR2hILEdBQUcsQ0FBQ0UsSUFBSixDQUFTb0YsS0FBVCxDQUF0Qjs7QUFDQSxRQUFJLENBQUMwQixlQUFMLEVBQXNCO0FBQ2xCcE4sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QnlILE1BQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBTzNCLEtBQVA7QUFDSCxHQXBsQm1CO0FBcWxCcEI7QUFDQUQsRUFBQUEsT0F0bEJvQixtQkFzbEJaNkIsS0F0bEJZLEVBc2xCTDtBQUNYLFFBQUksQ0FBQ0EsS0FBRCxJQUFVQSxLQUFLLElBQUksRUFBdkIsRUFBMkI7QUFDdkJ0TixNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCMkgsVUFBbkQ7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFDRCxRQUFJbkgsR0FBRyxHQUFHLG1CQUFWLENBTFcsQ0FLb0I7O0FBQy9CLFFBQUlvSCxlQUFlLEdBQUdwSCxHQUFHLENBQUNFLElBQUosQ0FBU2dILEtBQVQsQ0FBdEI7O0FBQ0EsUUFBSSxDQUFDRSxlQUFMLEVBQXNCO0FBQ2xCeE4sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QjZILFVBQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT0gsS0FBUDtBQUNILEdBbG1CbUI7QUFvbUJwQjtBQUNBL0IsRUFBQUEsU0FybUJvQixxQkFxbUJWbUMsT0FybUJVLEVBcW1CRDtBQUNmLFFBQUksQ0FBQ0EsT0FBRCxJQUFZQSxPQUFPLElBQUksRUFBM0IsRUFBK0I7QUFDM0IxTixNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCK0gsUUFBbkQ7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFFRCxRQUFJLEtBQUtDLGNBQUwsQ0FBb0JGLE9BQXBCLEVBQTZCLENBQTdCLEVBQWdDLEVBQWhDLENBQUosRUFBeUM7QUFDckMxTixNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCaUksVUFBbkQ7QUFDQSxhQUFPLEtBQVA7QUFDSDs7QUFDRCxRQUFJekgsR0FBRyxHQUFHLDBCQUFWLENBVmUsQ0FVdUI7O0FBQ3RDLFFBQUkwSCxpQkFBaUIsR0FBRzFILEdBQUcsQ0FBQ0UsSUFBSixDQUFTb0gsT0FBVCxDQUF4Qjs7QUFDQSxRQUFJLENBQUNJLGlCQUFMLEVBQXdCO0FBQ3BCOU4sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5Qm1JLFFBQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT0wsT0FBUDtBQUNILEdBdG5CbUI7QUF3bkJwQjtBQUNBRSxFQUFBQSxjQXpuQm9CLDBCQXluQkxoRCxHQXpuQkssRUF5bkJBb0QsR0F6bkJBLEVBeW5CS0MsR0F6bkJMLEVBeW5CVTtBQUMxQixRQUFJQyxjQUFjLEdBQUcsQ0FBckI7QUFDQSxRQUFJQyxHQUFHLEdBQUd2RCxHQUFHLENBQUNMLEtBQUosQ0FBVSxFQUFWLENBQVY7O0FBQ0EsU0FBSyxJQUFJakcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzZKLEdBQUcsQ0FBQ2pKLE1BQXhCLEVBQWdDWixDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFVBQUk4SixNQUFNLEdBQUdELEdBQUcsQ0FBQzdKLENBQUQsQ0FBSCxDQUFPK0osVUFBUCxFQUFiLENBRGlDLENBRWpDO0FBQ0E7QUFDQTs7QUFDQSxVQUFJRCxNQUFNLElBQUksRUFBVixJQUFnQkEsTUFBTSxJQUFJLEdBQTlCLEVBQW1DO0FBQy9CRixRQUFBQSxjQUFjO0FBQ2pCLE9BRkQsTUFFTztBQUNIQSxRQUFBQSxjQUFjLElBQUksQ0FBbEI7QUFDSDtBQUNKOztBQUNELFdBQU9BLGNBQWMsR0FBR0YsR0FBakIsSUFBd0JFLGNBQWMsR0FBR0QsR0FBaEQ7QUFDSCxHQXhvQm1CO0FBeW9CcEI7QUFDQWxDLEVBQUFBLGFBMW9Cb0IseUJBMG9CTjJCLE9BMW9CTSxFQTBvQkc7QUFDbkIsUUFBSSxDQUFDQSxPQUFELElBQVlBLE9BQU8sSUFBSSxFQUEzQixFQUErQjtBQUMzQjFOLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUIwSSxZQUFuRDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUksS0FBS1YsY0FBTCxDQUFvQkYsT0FBcEIsRUFBNkIsQ0FBN0IsRUFBZ0MsRUFBaEMsQ0FBSixFQUF5QztBQUNyQzFOLE1BQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYXFDLFlBQWIsQ0FBMEIxRixNQUFNLENBQUMyRixJQUFQLENBQVlDLFlBQVosQ0FBeUIySSxjQUFuRDtBQUNBLGFBQU8sS0FBUDtBQUNIOztBQUNELFFBQUluSSxHQUFHLEdBQUcsMEJBQVYsQ0FUbUIsQ0FTbUI7O0FBQ3RDLFFBQUkwSCxpQkFBaUIsR0FBRzFILEdBQUcsQ0FBQ0UsSUFBSixDQUFTb0gsT0FBVCxDQUF4Qjs7QUFDQSxRQUFJLENBQUNJLGlCQUFMLEVBQXdCO0FBQ3BCOU4sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QjRJLFlBQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT2QsT0FBUDtBQUNILEdBMXBCbUI7QUEycEJwQjtBQUNBN0IsRUFBQUEsU0E1cEJvQixxQkE0cEJWNEMsT0E1cEJVLEVBNHBCRDtBQUNmLFFBQUksQ0FBQ0EsT0FBRCxJQUFZQSxPQUFPLElBQUksRUFBM0IsRUFBK0I7QUFDM0J6TyxNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCOEksU0FBbkQ7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFDRCxRQUFJdEksR0FBRyxHQUFHLG9FQUFWLENBTGUsQ0FLaUU7O0FBQ2hGLFFBQUl1SSxpQkFBaUIsR0FBR3ZJLEdBQUcsQ0FBQ0UsSUFBSixDQUFTbUksT0FBVCxDQUF4Qjs7QUFDQSxRQUFJLENBQUNFLGlCQUFMLEVBQXdCO0FBQ3BCM08sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QmdKLFNBQW5EO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsV0FBT0gsT0FBUDtBQUNILEdBeHFCbUI7QUF5cUJwQjtBQUNBekksRUFBQUEsYUExcUJvQix5QkEwcUJORCxHQTFxQk0sRUEwcUJEOEksU0ExcUJDLEVBMHFCVTtBQUMxQjtBQUNBLFFBQUksQ0FBQzlJLEdBQUQsSUFBUUEsR0FBRyxDQUFDYixNQUFKLElBQWMsQ0FBMUIsRUFBNkI7QUFDekJsRixNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCa0osVUFBbkQ7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUx5QixDQU8xQjs7O0FBQ0EsUUFBSS9JLEdBQUcsQ0FBQ2IsTUFBSixHQUFhLENBQWpCLEVBQW9CO0FBQ2hCbEYsTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5Qm1KLFNBQW5EO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FYeUIsQ0FhMUI7OztBQUNBLFFBQUksQ0FBQyxNQUFNekksSUFBTixDQUFXUCxHQUFYLENBQUwsRUFBc0I7QUFDbEIvRixNQUFBQSxNQUFNLENBQUNxRCxLQUFQLENBQWFxQyxZQUFiLENBQTBCMUYsTUFBTSxDQUFDMkYsSUFBUCxDQUFZQyxZQUFaLENBQXlCb0osV0FBbkQ7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFFRCxRQUFJSCxTQUFTLElBQUksSUFBakIsRUFBdUIsT0FBTzlJLEdBQVA7O0FBQ3ZCLFFBQUksQ0FBQzhJLFNBQUQsSUFBYzlJLEdBQUcsS0FBSzhJLFNBQTFCLEVBQXFDO0FBQ2pDN08sTUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhcUMsWUFBYixDQUEwQjFGLE1BQU0sQ0FBQzJGLElBQVAsQ0FBWUMsWUFBWixDQUF5QnFKLFNBQW5EO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBRUQsV0FBT2xKLEdBQVA7QUFDSCxHQXBzQm1CO0FBc3NCcEI7QUFDQVYsRUFBQUEsUUF2c0JvQixvQkF1c0JYcUUsS0F2c0JXLEVBdXNCSztBQUFBLFFBQVR3RixHQUFTLHVFQUFILENBQUc7QUFDckIsUUFBSUMsS0FBSyxDQUFDekYsS0FBRCxDQUFULEVBQWtCOztBQUNsQixRQUFJLENBQUMsQ0FBQ0EsS0FBRixLQUFZQSxLQUFoQixFQUF1QjtBQUNuQixhQUFPQSxLQUFLLENBQUMwRixHQUFOLENBQVUsR0FBVixFQUFlQyxRQUFmLEVBQVA7QUFDSCxLQUZELE1BRU87QUFDSDNGLE1BQUFBLEtBQUssR0FBR25ELE1BQU0sQ0FBQ21ELEtBQUQsQ0FBTixDQUFjMEYsR0FBZCxDQUFrQixHQUFsQixDQUFSO0FBQ0EsYUFBTyxDQUFDdkUsSUFBSSxDQUFDQyxLQUFMLENBQVdwQixLQUFLLEdBQUcsR0FBbkIsSUFBMEIsR0FBM0IsRUFBZ0M0RixPQUFoQyxDQUF3Q0osR0FBeEMsQ0FBUDtBQUNIO0FBQ0o7QUEvc0JtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8v6aG16Z2i57Si5byV5p6a5Li+XHJcbmNvbnN0IFBBTkVMSU5ERVggPSB7XHJcbiAgICBQSE9ORTogMCxcclxuICAgIFJFR0lTVFJBOiAxLFxyXG59XHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBub2RlX3JlZ2lzOiBjYy5Ob2RlLFxyXG4gICAgICAgIGFncmVlX3RvZ2dsZTogY2MuTm9kZSxcclxuXHJcbiAgICAgICAgdmVyaWZpY2Fjb2RlOiBjYy5MYWJlbCxcclxuXHJcbiAgICAgICAgY29udGVudF9QYW5lbDogY2MuTm9kZSxcclxuICAgICAgICBub2RlX0xlZnRMaXN0OiBjYy5Ob2RlLCAgICAgICAgICAgICAgICAgLy/lt6bovrnmjInpkq5cclxuICAgICAgICBzcHJpdGVfdGl0bGU6IGNjLlNwcml0ZSwgICAgICAgICAgICAgICAgLy/moIfpophcclxuICAgICAgICBub2RlX2JvdHRvbTogY2MuTm9kZSwgICAgICAgICAgICAgICAgICAgLy/lupXpg6hcclxuXHJcbiAgICAgICAgbm9kZV9hZ3JlZTogY2MuVG9nZ2xlLFxyXG5cclxuICAgICAgICAvL+aJi+acuueZu+W9lVxyXG4gICAgICAgIHBob25lX3Bob25lOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIHBob25lX2NvZGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgcGhvbmVfc2VuZEJ1dHRvbjogW2NjLk5vZGVdLFxyXG4gICAgICAgIHBob25lX3NlbmRWZXJpZmljYTogW2NjLk5vZGVdLFxyXG4gICAgICAgIHBob25lX3BzdzogY2MuRWRpdEJveCxcclxuICAgICAgICBwaG9uZV9jb25maXJtOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIGxhYmVsX3Bob25lQ29kZTogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIC8v5rOo5YaM5b2p6YeRXHJcbiAgICAgICAgcmVnaXNBd2FyZDogW2NjLk5vZGVdLFxyXG4gICAgICAgIHBob25lQXdhcmQ6IFtjYy5Ob2RlXSxcclxuICAgICAgICAvL+mdnuazqOWGjOW9qemHkVxyXG4gICAgICAgIHJlZ2lzTm9ybWFsY3k6IFtjYy5Ob2RlXSxcclxuICAgICAgICBwaG9uZU5vcm1hbGN5OiBbY2MuTm9kZV0sXHJcblxyXG4gICAgICAgIC8v6aKE5Yi2XHJcbiAgICAgICAgcHJvdG9jb2w6IGNjLlByZWZhYixcclxuXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnB1YmxpY19saXN0ID0gW1xyXG4gICAgICAgICAgICBcImFjY291bnRUaXRsZVwiLFxyXG4gICAgICAgICAgICBcImRpdmlzaW9uXCIsXHJcbiAgICAgICAgICAgIFwibWVtYmVyc2hpcFRpdGxlXCIsXHJcblxyXG4gICAgICAgICAgICBcImFjY1wiLCAgICAgICAgICAvL+i0puWPt1xyXG4gICAgICAgICAgICBcInBzd1wiLCAgICAgICAgICAvL+WvhueggVxyXG4gICAgICAgICAgICBcImNwc3dcIiwgICAgICAgICAvL+ehruiupOWvhueggVxyXG4gICAgICAgICAgICAvLyBcIndwc3dcIiwgICAgICAgICAvL+WPluasvuWvhueggVxyXG4gICAgICAgICAgICBcInZlcmlmaWNhXCIgICAgICAvL+mqjOivgeeggVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0UmVnaXNDb250ZW50KCk7XHJcbiAgICAgICAgLy8gIGdsR2FtZS5sb2dvbi5yZXFSZWdpc3RlckNvbmZpZygpOyAgIC8v6I635Y+W5rOo5YaM6KGoXHJcbiAgICAgICAgdGhpcy5pU2FncmVlID0gdHJ1ZTsgLy/mmK/lkKblkIzmhI/nlKjmiLfljY/orq5cclxuICAgICAgICB0aGlzLmlTcmVnaXNVSSA9IGZhbHNlOyAvLyDlvZPliY3mmK/lkKbkuLrms6jlhoznlYzpnaJcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmjInpkq7ngrnlh7vkuovku7ZcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogcmV0dXJuIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZW5kXCI6IHJldHVybiB0aGlzLmJ0bl9zZW5kQ29kZSgpO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JpcnRoZGF5XCI6IHJldHVybiB0aGlzLmJ0bl9lZGl0YmlydGhkYXkoKTtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9ndWFuYmlcIjogcmV0dXJuIHRoaXMuYnRuX2d1YW5iaSgpO1xyXG5cclxuICAgICAgICAgICAgLy9sZWZ0bGlzdFxyXG4gICAgICAgICAgICBjYXNlIFwidG9nZ2xlX3Bob25lXCI6IHJldHVybiB0aGlzLmxlZnRMaXN0X2NiKFBBTkVMSU5ERVguUEhPTkUpO1xyXG4gICAgICAgICAgICBjYXNlIFwidG9nZ2xlX3JlZ2lzdHJhXCI6IHJldHVybiB0aGlzLmxlZnRMaXN0X2NiKFBBTkVMSU5ERVguUkVHSVNUUkEpO1xyXG5cclxuICAgICAgICAgICAgLy90b2dnbGVcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hZ3JlZVwiOiByZXR1cm4gdGhpcy5hZ3JlZV9jYigpO1xyXG5cclxuICAgICAgICAgICAgLy9yZXRpc3RyYXRpb25Mb2dpblxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlZ2lzdHJhdGlvbkxvZ2luXCI6IHRoaXMucmVnaXN0cmF0aW9uTG9naW5fY2IoKTsgYnJlYWs7ICAgICAgICAgLy/noa7orqTms6jlhozotKblj7dcclxuXHJcbiAgICAgICAgICAgIC8vcGhvbmVMb2dpblxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3Bob25lU2VuZFZlcmlmaWNhXCI6IHRoaXMucGhvbmVTZW5kVmVyaWZpY2FfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcGhvbmVMb2dpblwiOiByZXR1cm4gdGhpcy5waG9uZUxvZ2luX2NiKCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVtZW1iZXJQaG9uZVwiOiByZXR1cm4gdGhpcy5yZW1lbWJlclBob25lX2NiKCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2ZXJpZmljYUNvZGVcIjogdGhpcy5zZXRWZXJpZmljYWNvZGUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5faGF2ZUFjY291bnRcIjogdGhpcy5zZXRSZWdpc1VpKCk7IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9wcm90b2NvbFwiOiBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy5wcm90b2NvbCwgdGhpcy5ub2RlKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluS4gOS6m3RvZ2dsZVxyXG4gICAgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuaVNhZ3JlZSA9IGdsR2FtZS5zdG9yYWdlLmdldEl0ZW0oXCJpc0FncmVlXCIpID8gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbShcImlzQWdyZWVcIikuZGF0YSA6IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlX2FncmVlLmlzQ2hlY2tlZCA9IHRoaXMuaVNhZ3JlZTtcclxuXHJcbiAgICAgICAgbGV0IGxvZ2luU3dpdGNoID0gZ2xHYW1lLnVzZXIuZ2V0KFwibG9naW5Td2l0Y2hcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlX0xlZnRMaXN0LmdldENoaWxkQnlOYW1lKFwidG9nZ2xlX3Bob25lXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IGxvZ2luU3dpdGNoLnBob25lID09IDE7XHJcbiAgICAgICAgdGhpcy5pbml0QXdhcmRVaSgpO1xyXG4gICAgfSxcclxuICAgIC8v5ZCM5oSP5Y2P6K6u5Zue6LCDXHJcbiAgICBhZ3JlZV9jYigpIHtcclxuICAgICAgICB0aGlzLmlTYWdyZWUgPSB0aGlzLm5vZGVfYWdyZWUuaXNDaGVja2VkXHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbShcImlzQWdyZWVcIiwgeyBkYXRhOiB0aGlzLmlTYWdyZWUgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy/lt6bovrnmoIfnrb7lm57osINcclxuICAgIGxlZnRMaXN0X2NiKGluZGV4KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRlbnRfUGFuZWwuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudF9QYW5lbC5jaGlsZHJlbltpXS5hY3RpdmUgPSBpbmRleCA9PSBpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/liJ3lp4vljJbms6jlhozlvanph5FcclxuICAgIGluaXRBd2FyZFVpKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5yZWdpc3Rlcl9nb2xkID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEF3YXJkVGFibGUodGhpcy5yZWdpc0F3YXJkLCB0cnVlLCBnbEdhbWUudXNlci5yZWdpc3Rlcl9nb2xkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBd2FyZFRhYmxlKHRoaXMucmVnaXNOb3JtYWxjeSwgZmFsc2UsIGdsR2FtZS51c2VyLnJlZ2lzdGVyX2dvbGQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXdhcmRUYWJsZSh0aGlzLnJlZ2lzQXdhcmQsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBd2FyZFRhYmxlKHRoaXMucmVnaXNOb3JtYWxjeSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBnb2xkID0gZ2xHYW1lLnVzZXIuYmluZF9waG9uZV9nb2xkICsgZ2xHYW1lLnVzZXIucmVnaXN0ZXJfZ29sZDtcclxuICAgICAgICBpZiAoZ29sZCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBd2FyZFRhYmxlKHRoaXMucGhvbmVBd2FyZCwgdHJ1ZSwgZ29sZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXdhcmRUYWJsZSh0aGlzLnBob25lTm9ybWFsY3ksIGZhbHNlLCBnb2xkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldEF3YXJkVGFibGUodGhpcy5waG9uZUF3YXJkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXdhcmRUYWJsZSh0aGlzLnBob25lTm9ybWFsY3ksIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/orr7nva7ms6jlhozlvanph5FcclxuICAgIHNldEF3YXJkVGFibGUobm9kZUxpc3QsIGJsVGFibGUsIGNvaW4pIHtcclxuICAgICAgICBsZXQgY291bnQgPSBub2RlTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGJsVGFibGU7XHJcbiAgICAgICAgICAgIGlmIChjb2luICYmIG5vZGVMaXN0W2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX2JvdHRvbVwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb2luID0gbm9kZUxpc3RbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiY29pblwiKTtcclxuICAgICAgICAgICAgICAgIG5vZGVDb2luLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOi1oOmAgSR7dGhpcy5jdXRGbG9hdChjb2luKX3lvanph5FgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5b6u5L+h55m75b2VXHJcbiAgICB3ZUNoYXRMb2dpbl9jYigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW+ruS/oeeZu+W9lVwiKVxyXG4gICAgICAgIGdsR2FtZS5wbGF0Zm9ybS5sb2dpbldYKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5omL5py65rOo5YaMXHJcbiAgICBwaG9uZUxvZ2luX2NiKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pU2FncmVlKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlBST1RPQ09MKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGhvbmUgPSB0aGlzLmNoZWNrUGhvbmUodGhpcy5waG9uZV9waG9uZS5zdHJpbmcpO1xyXG4gICAgICAgIGlmIChwaG9uZSA9PSBudWxsIHx8IHBob25lID09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBzdyA9IHRoaXMuY2hlY2tQYXNzd29yZCh0aGlzLnBob25lX3Bzdy5zdHJpbmcpXHJcbiAgICAgICAgbGV0IGNvbmZpcm0gPSB0aGlzLmNoZWNrUGFzc3dvcmQodGhpcy5waG9uZV9wc3cuc3RyaW5nLCB0aGlzLnBob25lX2NvbmZpcm0uc3RyaW5nKVxyXG5cclxuICAgICAgICBpZiAocHN3ID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAoY29uZmlybSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMucGhvbmVfY29kZS5zdHJpbmcgPT0gXCJcIikgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlZFUklGSUNBRU1QVFkpO1xyXG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5waG9uZV9jb2RlLnN0cmluZztcclxuICAgICAgICBsZXQgcmVnID0gL15bMC05XXswLDZ9JC87Ly/pqozor4Hop4TliJlcclxuICAgICAgICBsZXQgdmVyaWYgPSByZWcudGVzdChOdW1iZXIodGhpcy5waG9uZV9jb2RlLnN0cmluZykpO1xyXG4gICAgICAgIGlmICghdmVyaWYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlZFUklGSUNBKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHN3ID0gbWQ1KHBzdyk7XHJcbiAgICAgICAgLy/miYvmnLrms6jlhoxcclxuICAgICAgICBnbEdhbWUubG9nb24ucmVxUGhvbmVSZWdpc3Rlcih7IHBob25lOiBwaG9uZSwgcGFzc3dvcmQ6IHBzdywgdmVyaWZpY2F0aW9uOiBjb2RlIH0pOyAgICAvL3Bob25lOnBob25lLHZlcmlmaWNhdGlvbjrpqozor4HnoIEscGxhdDoxXHJcblxyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJhY2NOdW1iZXJcIiwgeyBkYXRhOiBwaG9uZSB9KVxyXG4gICAgfSxcclxuICAgIC8v5Y+R6YCB5omL5py65Y+3XHJcbiAgICBidG5fc2VuZENvZGUoKSB7XHJcbiAgICAgICAgbGV0IHBob25lID0gdGhpcy5jaGVja1Bob25lKHRoaXMuZ2V0RWRpdEJveFN0cmluZyhcInBob25lXCIpKTtcclxuICAgICAgICBpZiAoIXBob25lKSByZXR1cm47XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIucmVxUmVnaXN0UGhvbmVDb2RlKHsgcGhvbmU6IHBob25lLCB0eXBlOiA0IH0pO1xyXG4gICAgfSxcclxuICAgIC8v56Gu6K6k5rOo5YaM6LSm5Y+3XHJcbiAgICByZWdpc3RyYXRpb25Mb2dpbl9jYigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaVNhZ3JlZSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QUk9UT0NPTCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Luj55CG5o6o6I2Q56CB6L6T5YWl5qGG5Lit5Y+q5YWB6K646L6T5YWl5pWw5a2X5ZKM6Iux5paH77yM6Iux5paH5YWB6K645aSn5bCP5YaZ44CCMTHkvY1cclxuICAgICAgICBsZXQgbXNnID0ge307XHJcblxyXG4gICAgICAgIC8v6I635Y+W6buY6K6k6YCJ6aG555qE77yI6K6+572u5Li65pys5Zyw6buY6K6k77yM5LiN5YaN5ZCR5pyN5Yqh56uv6K+35rGC55m75YWl5omA6ZyA5pWw5o2uIOm7mOiupOWGmeatu++8iVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnB1YmxpY19saXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5wdWJsaWNfbGlzdFtrZXldO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YSA9PSBcImFjY291bnRUaXRsZVwiIHx8IGRhdGEgPT0gJ21lbWJlcnNoaXBUaXRsZScgfHwgZGF0YSA9PSAnZGl2aXNpb24nKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IHJlZ2lzQ29udGVudCA9IHRoaXMuc3dpdGNoUmVnaXMoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChyZWdpc0NvbnRlbnQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocmVnaXNDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBtc2dbZGF0YV0gPSByZWdpc0NvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInBzd1wiKSBtc2dbXCJjcHN3XCJdID0gcmVnaXNDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbEdhbWUubG9nb24ucmVxUmVnaXN0ZXIobXNnKTtcclxuICAgIH0sXHJcbiAgICAvL+aJi+acuueZu+W9leWPkemAgemqjOivgeeggVxyXG4gICAgcGhvbmVTZW5kVmVyaWZpY2FfY2IoKSB7XHJcbiAgICAgICAgbGV0IHBob25lID0gdGhpcy5jaGVja1Bob25lKHRoaXMucGhvbmVfcGhvbmUuc3RyaW5nKVxyXG4gICAgICAgIGlmICghcGhvbmUpIHJldHVybjtcclxuICAgICAgICBnbEdhbWUudXNlci5yZXFQaG9uZUNvZGUoeyBwaG9uZTogcGhvbmUsIHR5cGU6IDQgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/liIfmjaLkuLrms6jlhoznlYzpnaJcclxuICAgIHNldFJlZ2lzVWkoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoZmFsc2UpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/ms6jlhozml7bnmoTmmL7npLrnirbmgIFcclxuICAgIHNldExlZnRVSVJlZ2lzR2FwKCkge1xyXG4gICAgICAgIHRoaXMuaVNyZWdpc1VJID0gdHJ1ZTtcclxuICAgICAgICAvL+agueaNrumFjee9ruaYvuekuui0puWPt+azqOWGjC/miYvmnLrms6jlhoxcclxuICAgICAgICBsZXQgYWNjb3VudE9wZW4gPSBnbEdhbWUudXNlci5nZXQoJ2xvZ2luU3dpdGNoJykucmVnaXN0ZXJfYWNjb3VudFxyXG4gICAgICAgIGxldCBwaG9uZU9wZW4gPSBnbEdhbWUudXNlci5nZXQoJ2xvZ2luU3dpdGNoJykucmVnaXN0ZXJfcGhvbmVcclxuICAgICAgICBpZiAoKGFjY291bnRPcGVuID09IDIgJiYgcGhvbmVPcGVuID09IDIpIHx8IChhY2NvdW50T3BlbiA9PSAxICYmIHBob25lT3BlbiA9PSAyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfTGVmdExpc3QuZ2V0Q2hpbGRCeU5hbWUoXCJ0b2dnbGVfcGhvbmVcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ub2RlX0xlZnRMaXN0LmdldENoaWxkQnlOYW1lKFwidG9nZ2xlX3JlZ2lzdHJhXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmNoZWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdExpc3RfY2IoUEFORUxJTkRFWC5SRUdJU1RSQSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChhY2NvdW50T3BlbiA9PSAyICYmIHBob25lT3BlbiA9PSAxKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfTGVmdExpc3QuZ2V0Q2hpbGRCeU5hbWUoXCJ0b2dnbGVfcmVnaXN0cmFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ub2RlX0xlZnRMaXN0LmdldENoaWxkQnlOYW1lKFwidG9nZ2xlX3Bob25lXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmNoZWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdExpc3RfY2IoUEFORUxJTkRFWC5QSE9ORSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY291bnRPcGVuID09IDEgJiYgcGhvbmVPcGVuID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX0xlZnRMaXN0LmdldENoaWxkQnlOYW1lKFwidG9nZ2xlX3JlZ2lzdHJhXCIpLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmNoZWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdExpc3RfY2IoUEFORUxJTkRFWC5SRUdJU1RSQSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRSZWdpc0NvbnRlbnQoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvdW50ID0gdGhpcy5wdWJsaWNfbGlzdC5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5wdWJsaWNfbGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lIHx8IG5hbWUgPT0gXCJhY2NvdW50VGl0bGVcIiB8fCBuYW1lID09ICdtZW1iZXJzaGlwVGl0bGUnIHx8IG5hbWUgPT0gJ2RpdmlzaW9uJykgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCByZWdpc19zdHJpcCA9IHRoaXMuZ2V0UmVnaXNPYmoobmFtZSk7XHJcbiAgICAgICAgICAgIHJlZ2lzX3N0cmlwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VmVyaWZpY2Fjb2RlKCk7Ly/orr7nva7pqozor4HnoIFcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuY2xlYXJQb3N0UGhvbmVJbnRlcnZhbCgpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLmNsZWFyUGhvbmVJbnRlcnZhbCgpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLmNsZWFyUmVnaXN0UGhvbmVJbnRlcnZhbCgpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJsb2dpblN1Y2Nlc3MgXCIsIHRoaXMubG9naW5TdWNjZXNzLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLlVTRVIuUkVHSVNURVJfQ0ZHLCB0aGlzLlJlZ2lzdGVyQ29uZmlnLCB0aGlzKVxyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiZWRpdEJpcnRoRGF5XCIsIHRoaXMuZWRpdEJpcnRoRGF5LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInBob25lQ29kZUNEXCIsIHRoaXMucGhvbmVDb2RlQ0QsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKCdjbG9zZVJlZ2lzdEFuZExvZ2luRmFjZScsIHRoaXMuY2xvc2VGYWNlLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwibG9naW5TdWNjZXNzIFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VU0VSLlJFR0lTVEVSX0NGRywgdGhpcylcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJlZGl0QmlydGhEYXlcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwicGhvbmVDb2RlQ0RcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKCdjbG9zZVJlZ2lzdEFuZExvZ2luRmFjZScsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZUZhY2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICAvL+aJi+acuueZu+W9lemqjOivgeeggVxyXG4gICAgcGhvbmVDb2RlQ0QobXNnKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmdldChcInBob25lQ29kZVN0YXRlXCIpICYmIG1zZyA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZV9zZW5kVmVyaWZpY2FbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVfc2VuZFZlcmlmaWNhWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVfc2VuZEJ1dHRvblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZV9zZW5kQnV0dG9uWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfcGhvbmVDb2RlLnN0cmluZyA9IGAke21zZ33np5JgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVfc2VuZFZlcmlmaWNhWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVfc2VuZFZlcmlmaWNhWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lX3NlbmRCdXR0b25bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZV9zZW5kQnV0dG9uWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluazqOWGjOihqOeahOWbnuiwg1xyXG4gICAgUmVnaXN0ZXJDb25maWcoQ29uZmlnZGF0YSkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeazqOWGjOeahOS/oeaBr1wiLCBDb25maWdkYXRhKVxyXG4gICAgICAgIHRoaXMuQ29uZmlnZGF0YSA9IENvbmZpZ2RhdGEuZGF0YTtcclxuICAgICAgICB0aGlzLnByb3RvY29saW5mbyA9IENvbmZpZ2RhdGEucHJvdG9jb2xcclxuICAgICAgICB0aGlzLmluaXRSZWdpc0NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLmluaXRSZWdpc1VpKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaVNyZWdpc1VJKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fYWdyZWVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZV9MZWZ0TGlzdC5nZXRDaGlsZEJ5TmFtZShcInRvZ2dsZV9waG9uZVwiKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5jaGVjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlX0xlZnRMaXN0LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZV9MZWZ0TGlzdC5jaGlsZHJlbltpXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2sodGhpcy5ub2RlX0xlZnRMaXN0LmNoaWxkcmVuW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZV9MZWZ0TGlzdC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JlZ2lzTGlzdChyZWdpc25hbWUpIHtcclxuICAgICAgICBsZXQgYkNvbnRpbnVlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvdW50ID0gdGhpcy5wdWJsaWNfbGlzdC5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5wdWJsaWNfbGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT0gcmVnaXNuYW1lKSB7IGJDb250aW51ZSA9IHRydWU7IGJyZWFrOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiQ29udGludWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW5rOo5YaM55WM6Z2iVUlcclxuICAgIGluaXRSZWdpc1VpKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfov5nmmK/lvZPliY3nmoTms6jlhozliJ3lp4vljJbpl67popgnLCB0aGlzLkNvbmZpZ2RhdGEpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDg7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuQ29uZmlnZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcmRhdGEgPSB0aGlzLkNvbmZpZ2RhdGFba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWdpc09iaiA9IHRoaXMuZ2V0UmVnaXNPYmoocmRhdGEua2V5KTtcclxuICAgICAgICAgICAgaWYgKHJlZ2lzT2JqLmdldENoaWxkQnlOYW1lKFwiZWRpdEJveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmVnaXNPYmouZ2V0Q2hpbGRCeU5hbWUoXCJlZGl0Qm94XCIpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5wbGFjZWhvbGRlciA9IHJkYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5o6S6Zmk5aSa5L2Z5L+h5oGvXHJcbiAgICAgICAgICAgIGlmIChyZGF0YS5rZXkgPT0gXCJ2ZXJpZmljYVwiICYmIHJkYXRhLnZhbHVlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVyaWZpY2Fjb2RlKCk7XHJcbiAgICAgICAgICAgICAgICByZWdpc09iai5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmRhdGEgfHwgdGhpcy5jaGVja1JlZ2lzTGlzdChyZGF0YS5rZXkpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgLy8gaWYocmRhdGEua2V5ID09IFwid3Bzd1wiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCFyZWdpc09iaiB8fCByZGF0YS52YWx1ZSA9PSAzKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJkYXRhLnZhbHVlID09IDIpIHJlZ2lzT2JqLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZGF0YS52YWx1ZSA9PSAxKSByZWdpc09iai5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZWdpc09iai5zZXRTaWJsaW5nSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICByZWdpc09iai5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlLbliLDljIXlvIDlkK/noa7orqTmjInpkq7vvIjpl7TpmpTmnaHvvIlcclxuICAgICAgICB0aGlzLmdldFJlZ2lzT2JqKFwiZ2FwX2ZyYW1lXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nZXRSZWdpc09iaihcImJ0bl9yZWdpc3RyYXRpb25Mb2dpblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qEaW5kZXjntKLlvJVcIiwgaW5kZXgpXHJcbiAgICAgICAgLy/mmK/lkKbpmpDol4/kvJrlkZjotYTmlpnnmoTlrZfkvZPliKTmlq3ku6Xlj4rpgqPmnaHnur9cclxuICAgICAgICBsZXQgZHJhdyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLkNvbmZpZ2RhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ29uZmlnZGF0YVtrZXldLmtleSA9PSBcImFjY1wiIHx8IHRoaXMuQ29uZmlnZGF0YVtrZXldLmtleSA9PSBcInBzd1wiIHx8IHRoaXMuQ29uZmlnZGF0YVtrZXldLmtleSA9PSBcImNwc3dcIiB8fCB0aGlzLkNvbmZpZ2RhdGFba2V5XS5rZXkgPT0gXCJ2ZXJpZmljYVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE6YWN572u5ZCN5a2XXCIsIGtleSwgdGhpcy5Db25maWdkYXRhW2tleV0udmFsdWUpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvbmZpZ2RhdGFba2V5XS52YWx1ZSAhPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkcmF3KSB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IHRoaXMuZ2V0UmVnaXNPYmooXCJtZW1iZXJzaGlwVGl0bGVcIiksXHJcbiAgICAgICAgICAgICAgICB4aWFuID0gdGhpcy5nZXRSZWdpc09iaihcImRpdmlzaW9uXCIpO1xyXG4gICAgICAgICAgICB0aXRsZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgeGlhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v55m75b2V5oiQ5Yqf5Zue6LCDXHJcbiAgICBsb2dpblN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICAvLyDojrflj5bmjIflrppFZGl0Qm9455qE5paH5pysXHJcbiAgICBnZXRSZWdpc09iaihub2RlbmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVfcmVnaXMuZ2V0Q2hpbGRCeU5hbWUobm9kZW5hbWUpO1xyXG4gICAgfSxcclxuICAgIC8vIOiOt+WPluaMh+WumkVkaXRCb3jnmoTmlofmnKxcclxuICAgIGdldEVkaXRCb3hTdHJpbmcobm9kZW5hbWUpIHtcclxuICAgICAgICBsZXQgcmVnaXNfb2JqID0gdGhpcy5ub2RlX3JlZ2lzLmdldENoaWxkQnlOYW1lKG5vZGVuYW1lKSxcclxuICAgICAgICAgICAgc3RyT2JqID0gcmVnaXNfb2JqLmdldENoaWxkQnlOYW1lKFwiRWRpdEJveFwiKTtcclxuICAgICAgICByZXR1cm4gc3RyT2JqLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5piv5ZCm5ZCM5oSP55So5oi35Y2P6K6uXHJcbiAgICBidG5fYWdyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5pU2FncmVlID0gIXRoaXMuaVNhZ3JlZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/muIXnkIblgJLorqHml7ZcclxuICAgIGNsZWFuVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0VGltZU91dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNldFRpbWVPdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRpbWVPdXQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIGVkaXRCaXJ0aERheShtc2cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjemAieaLqeeahOaXtumXtFwiLCBtc2cpXHJcbiAgICAgICAgdGhpcy5icml0aGFyciA9IG1zZy5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgbGV0IGJyaXRoTW9udGggPSB0aGlzLmJyaXRoYXJyWzBdLFxyXG4gICAgICAgICAgICBiaXJ0aERheSA9IHRoaXMuYnJpdGhhcnJbMV07XHJcbiAgICAgICAgdGhpcy5yZWdpc19jb250ZW50LmdldENoaWxkQnlOYW1lKFwiYmlydGhkYXlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZGl0Qm94XCIpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmcgPSBgJHticml0aE1vbnRofeaciCR7YmlydGhEYXl95pelYDtcclxuICAgIH0sXHJcblxyXG4gICAgLy/nlJ/ml6XpgInmi6lcclxuICAgIGJ0bl9lZGl0YmlydGhkYXkoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dCaXJ0aGRheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRWZXJpZmljYWNvZGUoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAwMCAtIDEwMDAgKyAxKSArIDEwMDApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE6aqM6K+B56CBXCIsIHN0cilcclxuICAgICAgICB0aGlzLnZlcmlmaWNhY29kZS5zdHJpbmcgPSBzdHI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yik5a6a5piv5ZCm5aGr5YaZ5YaF5a655pyJ6K+vXHJcbiAgICBzd2l0Y2hSZWdpcyhyZWduYW1lKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAocmVnbmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYWNjXCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjID0gdGhpcy5jaGVja0FjYyh0aGlzLmdldEVkaXRCb3hTdHJpbmcocmVnbmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjYykgZGF0YSA9IGFjYztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicHN3XCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgcHN3ID0gdGhpcy5jaGVja1Bhc3N3b3JkKHRoaXMuZ2V0RWRpdEJveFN0cmluZyhcInBzd1wiKSwgdGhpcy5nZXRFZGl0Qm94U3RyaW5nKFwiY3Bzd1wiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHN3KSBkYXRhID0gbWQ1KHBzdyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndwc3dcIjpcclxuICAgICAgICAgICAgICAgIGxldCB3cHN3ID0gdGhpcy5jaGVja1dpdGhkcmF3YWxQc3codGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmICh3cHN3KSBkYXRhID0gd3BzdztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicHJveHlcIjpcclxuICAgICAgICAgICAgICAgIGxldCBwcm94eSA9IHRoaXMuY2hlY2tQcm94eSh0aGlzLmdldEVkaXRCb3hTdHJpbmcocmVnbmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3h5KSBkYXRhID0gcHJveHk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5jaGVja05hbWUodGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lKSBkYXRhID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2V4XCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBob25lXCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgcGhvbmUgPSB0aGlzLmNoZWNrUGhvbmUodGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaG9uZSkgZGF0YSA9IHBob25lO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3ZWNoYXRcIjpcclxuICAgICAgICAgICAgICAgIGxldCB3ZWNoYXQgPSB0aGlzLmNoZWNrV1godGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmICh3ZWNoYXQpIGRhdGEgPSB3ZWNoYXQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInFxXCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgcXFOdW0gPSB0aGlzLmNoZWNrUVEodGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChxcU51bSkgZGF0YSA9IHFxTnVtO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbWFpbFwiOlxyXG4gICAgICAgICAgICAgICAgbGV0IGVtYWlsID0gdGhpcy5jaGVja01haWwodGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbWFpbCkgZGF0YSA9IGVtYWlsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJuaWNrbmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgbGV0IG5pY2tOYW1lID0gdGhpcy5jaGVja05pY2tOYW1lKHRoaXMuZ2V0RWRpdEJveFN0cmluZyhyZWduYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmlja05hbWUpIGRhdGEgPSBuaWNrTmFtZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYmlydGhkYXlcIjpcclxuICAgICAgICAgICAgICAgIGxldCBiaXJ0aGRheSA9IHRoaXMuY2hlY2tiaXJ0aGRheSh0aGlzLmJyaXRoYXJyKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJpcnRoZGF5KSBkYXRhID0gYmlydGhkYXk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInZlcmlmaWNhXCI6XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRDb2RlID0gdGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ25hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRDb2RlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uVkVSSUZJQ0EpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB2ZXJpZiA9IHRoaXMuZ2V0RWRpdEJveFN0cmluZyhyZWduYW1lKSA9PSB0aGlzLnZlcmlmaWNhY29kZS5zdHJpbmcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZlcmlmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uVkVSSUZJQ0EpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGRhdGEgPSB0aGlzLnZlcmlmaWNhY29kZS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGRhdGEgPSBmYWxzZTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+aOkumZpOaYvuekuuazqOWGjGl0ZW3nmoTlpJrkvZnkv6Hmga9cclxuICAgIHJlZ2lzT3B0aW9uYWwocmVnaXNkYXRhKSB7XHJcbiAgICAgICAgbGV0IGJsQ29uZW50ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHJlZ2lzZGF0YS52YWx1ZSA9PSAxKSByZXR1cm4gYmxDb25lbnQ7XHJcbiAgICAgICAgaWYgKHJlZ2lzZGF0YS52YWx1ZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIGJsQ29uZW50ID0gdHJ1ZVxyXG4gICAgICAgICAgICByZXR1cm4gYmxDb25lbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChyZWdpc2RhdGEua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwcm94eVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwicGhvbmVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIndlY2hhdFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwicXFcIjpcclxuICAgICAgICAgICAgY2FzZSBcImVtYWlsXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJuaWNrbmFtZVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiYmlydGhkYXlcIjpcclxuICAgICAgICAgICAgICAgIGJsQ29uZW50ID0gdGhpcy5nZXRFZGl0Qm94U3RyaW5nKHJlZ2lzZGF0YS5rZXkpID09IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBibENvbmVudDtcclxuICAgIH0sXHJcbiAgICAvL+eUn+aXpVxyXG4gICAgY2hlY2tiaXJ0aGRheShkYXRhKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLkJJUlRIREFZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiaXJ0aGRheSA9IGAke2RhdGFbMF19LSR7ZGF0YVsxXX1gXHJcbiAgICAgICAgcmV0dXJuIGJpcnRoZGF5XHJcbiAgICB9LFxyXG4gICAgLy8g6ZO26KGM5Y+W546wXHJcbiAgICBjaGVja1dpdGhkcmF3YWxQc3cod3Bzdykge1xyXG4gICAgICAgIGlmICghd3Bzdykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5XSVRIRFJBV0FMUFNXKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWcgPSAvXlxcZHs0LDZ9JC87IC8v6aqM6K+B6KeE5YiZXHJcbiAgICAgICAgbGV0IGlzd3Bzd19tYXRjaGVyID0gcmVnLnRlc3Qod3Bzdyk7XHJcbiAgICAgICAgaWYgKCFpc3dwc3dfbWF0Y2hlcikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5XSVRIRFJBV0FMUFNXTEVOR1RIKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd3BzdztcclxuICAgIH0sXHJcbiAgICAvL+S7o+eQhuaOqOiNkOeggeajgOafpVxyXG4gICAgY2hlY2tQcm94eShwcm94eSkge1xyXG4gICAgICAgIGlmICghcHJveHkpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uUFJPWFkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IHJlZyA9IC9eXFx3ezExfSQvO1xyXG4gICAgICAgIC8vIGxldCBwcm94eV9jaGVjayA9IHJlZy50ZXN0KHByb3h5KTtcclxuICAgICAgICAvLyBpZiAoIXByb3h5X2NoZWNrKSB7XHJcbiAgICAgICAgLy8gICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoJ+S7o+eQhuaOqOiNkOeggeS4jeWtmOWcqO+8gScpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiBwcm94eTtcclxuICAgIH0sXHJcbiAgICAvLyDmiYvmnLrlj7fnoIHmo4Dmn6VcclxuICAgIGNoZWNrUGhvbmUoYWNjKSB7XHJcbiAgICAgICAgaWYgKCFhY2MpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uUEhPTkVOVUxMKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+5byA6ZmQ5a6aXHJcbiAgICAgICAgLy92YXIgcmVnID0gL14xWzN8NHw1fDZ8N3w4fDldWzAtOV17OX0kLztcclxuICAgICAgICAvL+S9v+eUqOacjeWKoeerr+mZkOWumuato+WImeaWueW8j1xyXG4gICAgICAgIHZhciByZWcgPSAvXjEzNFswLThdXFxkezd9JHxeMTNbXjRdXFxkezh9JHxeMTRbNS05XVxcZHs4fSR8XjE1W140XVxcZHs4fSR8XjE2WzZdXFxkezh9JHxeMTdbMC04XVxcZHs4fSR8XjE4W1xcZF17OX0kfF4xOVswLTldXFxkezh9JC87XHJcbiAgICAgICAgLy8gbGV0IHJlZyA9IC9eXFxkezExfSQvOyAvL+mqjOivgeinhOWImVxyXG4gICAgICAgIGxldCBpc2FjY19tYXRjaGVyID0gcmVnLnRlc3QoYWNjKTtcclxuICAgICAgICBpZiAoIWlzYWNjX21hdGNoZXIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcCgn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSxcclxuICAgIC8vIOmqjOivgeeggeajgOafpVxyXG4gICAgY2hlY2tWZXJpZmljYXRpb24odmVyaWYpIHtcclxuICAgICAgICBpZiAoIXZlcmlmKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlZFUklGSU5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZlcmlmO1xyXG4gICAgfSxcclxuICAgIC8vIOi0puWPt+ajgOafpVxyXG4gICAgY2hlY2tBY2MoYWNjKSB7XHJcbiAgICAgICAgaWYgKCFhY2MgfHwgYWNjID09ICcnKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLkFDQ05VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2MubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5BQ0NMRU5HVEgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCByZWcgPSAvXlxcd3syLDE1fSQvO1xyXG4gICAgICAgIGxldCByZWcgPSAvXltBLVphLXowLTldezQsMTV9JC9cclxuICAgICAgICBsZXQgYWNjX2NoZWNrID0gcmVnLnRlc3QoYWNjKTtcclxuICAgICAgICBpZiAoIWFjY19jaGVjaykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5BQ0NUWVBFKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSxcclxuICAgIC8vIFFR5qOA5p+lXHJcbiAgICBjaGVja1FRKHFxTnVtKSB7XHJcbiAgICAgICAgaWYgKCFxcU51bSB8fCBxcU51bSA9PSAnJykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5RUU5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlZyA9IC9eWzEtOV1bMC05XXs0LDl9JC9naW07IC8v6aqM6K+B6KeE5YiZXHJcbiAgICAgICAgbGV0IGlzUVFOdW1fbWF0Y2hlciA9IHJlZy50ZXN0KHFxTnVtKTtcclxuICAgICAgICBpZiAoIWlzUVFOdW1fbWF0Y2hlcikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5RUVRZUEUpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxcU51bTtcclxuICAgIH0sXHJcbiAgICAvLyDlvq7kv6Hmo4Dmn6VcclxuICAgIGNoZWNrV1god3hOdW0pIHtcclxuICAgICAgICBpZiAoIXd4TnVtIHx8IHd4TnVtID09ICcnKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLldFQ0hBVE5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlZyA9IC9eW2EtekEtWlxcZF9dezUsfSQvOyAvL+mqjOivgeinhOWImVxyXG4gICAgICAgIGxldCBpc1dYTnVtX21hdGNoZXIgPSByZWcudGVzdCh3eE51bSk7XHJcbiAgICAgICAgaWYgKCFpc1dYTnVtX21hdGNoZXIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uV0VDSEFUVFlQRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHd4TnVtO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlp5PlkI3mo4Dmn6VcclxuICAgIGNoZWNrTmFtZShuYW1lTnVtKSB7XHJcbiAgICAgICAgaWYgKCFuYW1lTnVtIHx8IG5hbWVOdW0gPT0gJycpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uTkFNRU5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrU3RyTGVuZ3RoKG5hbWVOdW0sIDQsIDEyKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5OQU1FTEVOR1RIKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVnID0gL15bXFx1NEUwMC1cXHU5RkE1QS1aYS16XSskLzsgLy/pqozor4Hop4TliJlcclxuICAgICAgICBsZXQgaXNuYW1lTnVtX21hdGNoZXIgPSByZWcudGVzdChuYW1lTnVtKTtcclxuICAgICAgICBpZiAoIWlzbmFtZU51bV9tYXRjaGVyKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLk5BTUVUWVBFKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZU51bTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4Dmn6XkuK3mloflkozoi7Hmlofmt7flkIjnmoTlrZfnrKbplb/luqZcclxuICAgIGNoZWNrU3RyTGVuZ3RoKHN0ciwgbWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgbVRleHRNYXhsZW5naHQgPSAwO1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJBdCA9IGFycltpXS5jaGFyQ29kZUF0KCk7XHJcbiAgICAgICAgICAgIC8vMzItMTIy5YyF5ZCr5LqG56m65qC877yM5aSn5bCP5YaZ5a2X5q+N77yM5pWw5a2X5ZKM5LiA5Lqb5bi455So55qE56ym5Y+377yMXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5Zyo6L+Z5Liq6IyD5Zu05YaF5YiZ566X5LiA5Liq5a2X56ym77yMXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5LiN5Zyo6L+Z5Liq6IyD5Zu05q+U5aaC5piv5rGJ5a2X55qE6K+d5bCx5piv5Lik5Liq5a2X56ymXHJcbiAgICAgICAgICAgIGlmIChjaGFyQXQgPj0gMzIgJiYgY2hhckF0IDw9IDEyMikge1xyXG4gICAgICAgICAgICAgICAgbVRleHRNYXhsZW5naHQrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1UZXh0TWF4bGVuZ2h0ICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1UZXh0TWF4bGVuZ2h0IDwgbWluIHx8IG1UZXh0TWF4bGVuZ2h0ID4gbWF4XHJcbiAgICB9LFxyXG4gICAgLy8g5pi156ew5qOA5p+lXHJcbiAgICBjaGVja05pY2tOYW1lKG5hbWVOdW0pIHtcclxuICAgICAgICBpZiAoIW5hbWVOdW0gfHwgbmFtZU51bSA9PSAnJykge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5OSUNLTkFNRU5VTEwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tTdHJMZW5ndGgobmFtZU51bSwgNCwgMTIpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLk5JQ0tOQU1FTEVOR1RIKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVnID0gL15bXFx1NEUwMC1cXHU5RkE1QS1aYS16XSskLzsgLy/pqozor4Hop4TliJlcclxuICAgICAgICBsZXQgaXNuYW1lTnVtX21hdGNoZXIgPSByZWcudGVzdChuYW1lTnVtKTtcclxuICAgICAgICBpZiAoIWlzbmFtZU51bV9tYXRjaGVyKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLk5JQ0tOQU1FVFlQRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWVOdW07XHJcbiAgICB9LFxyXG4gICAgLy8g6YKu566x5qOA5p+lXHJcbiAgICBjaGVja01haWwobWFpbE51bSkge1xyXG4gICAgICAgIGlmICghbWFpbE51bSB8fCBtYWlsTnVtID09ICcnKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLkVNQUlMTlVMTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVnID0gL15bQS1aYS16XFxkXSsoWy1fLl1bQS1aYS16XFxkXSspKkAoW0EtWmEtelxcZF0rWy0uXSkrW0EtWmEtelxcZF17Miw0fSQvOyAvL+mqjOivgeinhOWImVxyXG4gICAgICAgIGxldCBpc21haWxOdW1fbWF0Y2hlciA9IHJlZy50ZXN0KG1haWxOdW0pO1xyXG4gICAgICAgIGlmICghaXNtYWlsTnVtX21hdGNoZXIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uRU1BSUxUWVBFKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFpbE51bTtcclxuICAgIH0sXHJcbiAgICAvLyDlr4bnoIHmo4Dmn6VcclxuICAgIGNoZWNrUGFzc3dvcmQocHN3LCBjb25maW1wc3cpIHtcclxuICAgICAgICAvLyDmnKrovpPlhaXlr4bnoIFcclxuICAgICAgICBpZiAoIXBzdyB8fCBwc3cubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcChnbEdhbWUudGlwcy5SRUdJU1RSQVRJT04uTE9HUFNXTlVMTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6L6T5YWl5a+G56CB6ZW/5bqm5bCP5LqONuS9jeWtl+esplxyXG4gICAgICAgIGlmIChwc3cubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QU1dMRU5HVEgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWvhueggeWMheWQq+eJueauiuWtl+esplxyXG4gICAgICAgIGlmICghL1xcdyQvLnRlc3QocHN3KSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKGdsR2FtZS50aXBzLlJFR0lTVFJBVElPTi5QU1dXUk9OR0ZVTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpbXBzdyA9PSBudWxsKSByZXR1cm4gcHN3O1xyXG4gICAgICAgIGlmICghY29uZmltcHN3IHx8IHBzdyAhPT0gY29uZmltcHN3KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAoZ2xHYW1lLnRpcHMuUkVHSVNUUkFUSU9OLlBTV0NPRkFJTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHN3O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+a1rueCueWei+i/kOeul+WPluS/qeS9jVxyXG4gICAgY3V0RmxvYXQodmFsdWUsIG51bSA9IDIpIHtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5kaXYoMTAwKS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKS5kaXYoMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHZhbHVlICogMTAwKSAvIDEwMCkudG9GaXhlZChudW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
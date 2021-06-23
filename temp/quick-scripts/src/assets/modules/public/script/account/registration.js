"use strict";
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
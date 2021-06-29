

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
        edits_birth: cc.Node,
    },


    onLoad() {
        this.registerEvent();

    },

    start() { 
        this.inituserinfo();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_birthPanel": this.showbirthPanel(); break;
            case "btn_userSure": this.userSure_cb(); break;
            case "btn_userCancel": this.remove(); break;
            case "btn_forbidname": glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.MODIFYNAME); break;
            default:
                break;
        }
    },

    registerEvent() {
        glGame.emitter.on("editBirthDay", this.editBirthEnd, this);
    },
    unregisterEvent() {
        glGame.emitter.off("editBirthDay", this);
    },
    //显示生日界面
    showbirthPanel() {
        if(glGame.user.get("birthday_month")!=""){
            return glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.MODIFYBIRTH);
        }
        glGame.panel.showBirthday();
    },

    //显示个人资料界面
    inituserinfo() {
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
            let arr = this.brithDay.split("_");
            this.edits_birth.getSelfFunc().setString(`${arr[0]}月${arr[1]}日`);
        }
    },
    editBirthEnd(str) {
        this.brithDay = str;                            //生日编辑结束
        let arr = this.brithDay.split("_");
        this.edits_birth.getSelfFunc().setString(`${arr[0]}月${arr[1]}日`);
    },
    userSure_cb() {
        let msg = {};
        //name
        if (this.edit_name.string != "" && this.edit_name.string != glGame.user.get("name")) {
            let name = this.checkName(this.edit_name.string);
            if (!name) return;
            msg.name = name;
        }
        //wechat
        if (this.edit_wechat.string != glGame.user.get("wechat") && this.edit_wechat.string != "") {
            let wechat = this.checkWX(this.edit_wechat.string);
            if (!wechat) return;
            msg.wechat = wechat;
        }
        //qq
        if (this.edit_qq.string != glGame.user.get("qq") && this.edit_qq.string != "") {
            let qq = this.checkQQ(this.edit_qq.string);
            if (!qq) return;
            msg.qq = qq;
        }
        //email
        if (this.edit_email.string != glGame.user.get("email") && this.edit_email.string != "") {
            let email = this.checkMail(this.edit_email.string);
            if (!email) return;
            msg.email = email;
        }
        //birth
        if (this.brithDay != glGame.user.get("birthday_month") && this.brithDay != "") {
            msg.birthday_month = this.brithDay;
        }

        if (Object.keys(msg).length == 0) {
            this.remove();
            return;
        }

        glGame.gameNet.send_msg('http.reqEditMyInfo', msg, (route, data) => {
            glGame.panel.showTip(glGame.tips.USER.EDITINFO.BASEINFO);
            for (let key in msg) {
                glGame.user[key] = msg[key]
            }
            this.remove();
        })
    },

    //===========================================================================================
    //邮箱检查
    checkMail(mailNum) {
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ //验证规则
        let ismailNum_matcher = reg.test(mailNum);
        if (!ismailNum_matcher) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDEMAIL);
            return false;
        }
        return mailNum;
    },
    // QQ检查
    checkQQ(qqNum) {
        let reg = /^[1-9][0-9]{4,14}$/gim; //验证规则
        let isQQNum_matcher = reg.test(qqNum);
        if (!isQQNum_matcher) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDQQ);
            return false
        }
        return qqNum;
    },
    // 微信检查
    checkWX(wxNum) {
        let reg = /^[-_a-zA-Z0-9]{6,20}$/; //验证规则
        let isWXNum_matcher = reg.test(wxNum);
        if (!isWXNum_matcher) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDWX);
            return false
        }
        return wxNum;
    },
    // 姓名检查
    checkName(nameNum) {
        if (this.checkStrLength(nameNum, 2, 40)) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.NAMELIMIT);
            return false
        }
        // let reg = /^[\u4e00-\u9fa5]{2,8}$/
        let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证规则
        let isnameNum_matcher = reg.test(nameNum);
        console.log('姓名格式错误！?', isnameNum_matcher)
        if (!isnameNum_matcher) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.INVALIDNAME);
            return false
        }
        return nameNum;
    },

    //检查中文和英文混合的字符长度
    checkStrLength(str, min, max) {
        let mTextMaxlenght = 0;
        let arr = str.split("");
        for (let i = 0; i < arr.length; i++) {
            let charAt = arr[i].charCodeAt();
            //32-122包含了空格，大小写字母，数字和一些常用的符号，
            //如果在这个范围内则算一个字符，
            //如果不在这个范围比如是汉字的话就是两个字符
            if (charAt >= 32 && charAt <= 122) {
                mTextMaxlenght++;
            } else {
                mTextMaxlenght += 2;
            }
        }
        return mTextMaxlenght < min || mTextMaxlenght > max
    },

    OnDestroy() {
        this.unregisterEvent();
    },
});

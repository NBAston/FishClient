/**
 * 玩家个人信息界面
 */
const GAMETYPE = {
    CHESS: 1,    //棋牌版
    COMPLEX: 2,  //综合版
}
glGame.baseclass.extend({
    properties: {
        mainPanel: cc.Node,
        leftbtns: cc.Node,

        reddot: cc.Node,

        left_node: cc.Node,

        head: cc.Node,
        sex: cc.Sprite,
        vip_level: cc.Label,
        img_sex: [cc.SpriteFrame],

        base_acc: cc.Label,
        base_phone: cc.Label,
        base_id: cc.Label,
        base_nickname: cc.Label,
    },
    onLoad() {

        this.isFirst = true;
        this.gameDisplayType = glGame.user.get("gameDisplayType");
        this.registerEvent();

    },
    start() {

    },

    showInfo() {
        if (this.isFirst) {
            this.showPanel("vipinfo");
            this.isFirst = false;
        }
        this.initUi();
        this.initReddot();
    },

    initUi() {
        //头像
        glGame.panel.showHeadImage(this.head, glGame.user.get("headURL"));
        //基础信息
        this.base_acc.string = glGame.user.get("userName") || "";
        let phoneStr = glGame.user.get("phone").toString();
        let new_str = '';
        console.log('phoneStrphoneStr', phoneStr, phoneStr.length)
        for (let i = 0; i < phoneStr.length; i++) {
            let valueNum = phoneStr[i];
            if (i > 2 && i < 8) {
                valueNum = '*';
            }
            new_str += valueNum
        }
        this.base_phone.string = glGame.user.get("phone") ? new_str : "";
        this.sex.spriteFrame = this.img_sex[glGame.user.get("userSex")];

        this.base_id.string = glGame.user.get("logicID") || "";
        this.base_nickname.string = glGame.user.get("nickname") || "";

        this.vip_level.string = glGame.user.get("vip_name");
    },

    onClick(name, node) {
        switch (name) {
            case "account":
            case "vipinfo":
            case "statement":
            case "record":
            case "bank":
            case "seting":
                this.showPanel(name); break;
            case "head": this.changeHead_cb(); break;
            case 'btn_grzl': this.userEdit_cb(); break;
            case 'btn_phoneEdit': this.phoneEdit_cb(); break;
            case 'btn_nicknameEdit': this.nicknameEdit_cb(); break;
            case "close":
                this.remove()
                break;
        }
    },

    initReddot() {
        this.reddot.active = glGame.user.get("redDotData").vipReq == 1;
    },

    //隐藏所有界面
    hideAllPanel() {
        if (!this.mainPanel.childrenCount) return;
        for (let i = 0; i < this.mainPanel.childrenCount; i++) {
            this.mainPanel.children[i].active = false;
        }
    },

    //显示某个界面。按名字来显示
    showPanel(panelName) {
        this.hideAllPanel()
        let panellist = {}
        panellist["vipinfo"] = "userinfoVip";
        panellist["statement"] = this.gameDisplayType == GAMETYPE.CHESS ? "userinfostatement" : "userinfostatement_complex";
        panellist["account"] = "userinfoaccount";
        panellist["record"] = this.gameDisplayType == GAMETYPE.CHESS ? "userinforecord" : "userinforecord_complex";
        panellist["bank"] = "userinfoBank";
        panellist["seting"] = "userinfoSeting";

        for (let name in panellist) {
            let index = 0;
            if (panelName == name) index = 1;
            this.leftbtns.getChildByName(name).zIndex = index;
        }


        if (this.mainPanel.getChildByName(panellist[panelName])) {
            this.mainPanel.getChildByName(panellist[panelName]).active = true;
            glGame.emitter.emit("userinfo_switchFace");
            return;
        }

        glGame.panel.getPanelByName(panellist[panelName]).then(panelData => {
            panelData.parent = this.mainPanel;
        })
    },

    //浮点型运算取俩位
    cutFloat(num) {
        return (this.getFloat(Number(num).div(100))).toString();
    },
    //浮点型运算取俩位
    getFloat(value, num = 2) {
        value = Number(value);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else {
            return (Math.floor(value * 100) / 100).toFixed(num);
        }
    },

    changeHead_cb() {
        glGame.panel.showPanelByName("changehead");
    },

    //个人资料
    userEdit_cb() {
        console.log("显示个人资料")
        glGame.panel.showPanelByName("changeInfo");
    },

    //修改昵称
    nicknameEdit_cb() {
        console.log("显示修改昵称")
        glGame.panel.showPanelByName("editNickName");
    },

    //修改手机
    phoneEdit_cb() {
        //允许手机更改密码
        let phone = glGame.user.get("phone").toString();
        if (phone && phone != "") {
            if (phone == 0) glGame.panel.showPanelByName("bindPhone");      //绑定
            else if (glGame.user.get("loginSwitch").self_edit_phone == 1) glGame.panel.showPanelByName("untiedPhone");
            else glGame.panel.showPanelByName("unbind");
        } else {
            glGame.panel.showPanelByName("bindPhone");       //绑定
        }
    },

    //修改密码
    changepsw_cb() {
        if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
            glGame.panel.showPanelByName("modifypsw");
        } else {
            glGame.panel.showErrorTip(glGame.tips.USER.PASSWORD.UNCHANGE);
        }
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("ReqRedDot", this.initReddot, this);
        glGame.emitter.on("updateUserData", this.showInfo, this);
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.showInfo, this);
        glGame.emitter.on("notifyVipInfo", this.updateVip, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("ReqRedDot", this);
        glGame.emitter.off("updateUserData", this);
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
        glGame.emitter.off("notifyVipInfo", this);
    },
    updateVip(msg) {
        let vipList = msg.vipList,
            vipId = msg.userInfo.vipId;
        for (let i = 0; i < vipList.length; i++) {
            if (vipList[i].id == vipId && vipList[i].vipName != glGame.user.get("vip_name")) {
                glGame.user.set("vip_name", vipList[i].vipName);
                this.vip_level.string = glGame.user.get("vip_name");
                glGame.emitter.emit("updateUserData");
                break;
            }
        }
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
});

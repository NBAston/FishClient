glGame.baseclass.extend({
    properties: {
        serviceContent: cc.Node,
        QQItem: cc.Node,
        WechatItem: cc.Node,
        complainPanel: cc.Prefab,
        mylogicID: cc.Label,
        labDescribe: cc.Label,
        lab_freepecent: cc.Label,
        lab_complain: cc.Label,
        lab_des_miaosu: cc.Node
    },
    onLoad() {

    },

    onClick(name, node) {
        // for(let i = 0 ;i<this.payPageList.length;i++){
        //     let list = this.payPageList[i]
        //     for(let j = 0;j<list.data.length;j++){
        //         if(name == `btnContact${j}add${list.data[j].name}`){
        //             let type = list.data[j].contactType;
        //             let number = list.data[j].contactAccount
        //             let jump = glGame.user.get('url').service_url_jump
        //             let url = jump +'?'+`jump_type=${type}&jump_url=${number}`
        //             cc.sys.openURL(url)
        //             return
        //         }
        //         console.log('ddddddddddddddddddd=========',name,list.name)
        //         if(name == `btn_copy${j}add${list.name}`){
        //             this.btn_copyCB(list.data[j].contactAccount)
        //             return;
        //         }
        //     }
        // }

        for (let i = 0; i < this.pageData.data.length; i++) {
            let list = this.pageData.data[i]
            if (name == `btnContact${i}add${this.pageData.id}`) {
                let type = list.contactType;
                let number = list.contactAccount
                let jump = glGame.user.get('url').service_url_jump
                let url = '';
                //contactType: 1:微信 2：qq
                if (type == 2) {
                    //jump_type 1:跳QQ，2跳微信
                    // url = jump +'?'+`jump_type=${2}&jump_url=${number}`
                    glGame.platform.openURL("weixin://")
                } else if (type == 1) {
                    //jump_type 1:跳QQ，2跳微信
                    url = jump + '?' + `jump_type=${1}&jump_url=${number}`
                    glGame.platform.openURL(url)
                }
                return
            }
            if (name == `btn_copy${i}add${this.pageData.id}`) {
                this.btn_copyCB(list.contactAccount)
                return;
            }
        }
        for (let i = 0; i < this.payPageList.length; i++) {
            if (node.parent.name == `selectBtn${i}`) {
                this.ReqPayType(this.payPageList[i].id)
                return;
            }
        }
        switch (name) {
            case "btn_record": glGame.emitter.emit("showrechargeRecord"); break;
            case "btn_service": this.btn_serviceCB(); break;
            case "btn_copy": this.btn_copyMyId(); break;
            case "close_eff": this.click_close(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_record() {

    },
    ReqPayType(pageId) {
        //this.pageId = pageId
        let typeId = this.typeId;
        glGame.gameNet.send_msg('http.ReqPayPage', { pageId: pageId, typeId: typeId }, (route, msg) => {
            this.setContent(msg.result);
        })
    },
    initUI(data) {
        this.payPageList = data.payPageList;
        this.mylogicID.string = glGame.user.get("logicID");
        if (data.giveProportion == 0) {
            this.lab_freepecent.node.parent.active = false;
            this.lab_des_miaosu.active = true;
        } else {
            this.lab_freepecent.string = (Number(data.giveProportion).div(100)).toFixed(2) + "%"
        }

        if (data.complaint) this.lab_complain.string = `奖励${Number(data.complaint.reward).div(100).toString()}元`;
        // for (let i = 0; i < data.payPageList.length; i++) {
        //     let RowItem = cc.instantiate(this.RowItem);   
        //     RowItem.parent = this.Rowcontent;
        //     RowItem.active = true;
        //     RowItem.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = data.payPageList[i].name;
        //     RowItem.getChildByName("checkmark").getChildByName("Label").getComponent(cc.Label).string = data.payPageList[i].name;
        //     RowItem.name = `selectBtn${i}`
        //   }
        this.typeId = data.id;
        this.setContent(data.payPageList[0])
    },
    setContent(data) {
        this.serviceContent.destroyAllChildren();
        this.serviceContent.removeAllChildren();
        if (data) { } else { return };
        this.setDescribe(data.describe)
        this.pageData = data
        for (let i = 0; i < data.data.length; i++) {
            let serviceItem = cc.instantiate(data.data[i].contactType == 1 ? this.QQItem : this.WechatItem);
            serviceItem.parent = this.serviceContent;
            serviceItem.active = true;
            serviceItem.getChildByName("name").getComponent(cc.Label).string = data.data[i].name;
            serviceItem.getChildByName("Level").getComponent(cc.Label).string = "好评" + data.data[i].comment;
            serviceItem.getChildByName("Level").active = false;
            serviceItem.getChildByName("strNum").getComponent(cc.Label).string = data.data[i].contactType == 1 ? "QQ:" + data.data[i].contactAccount : "微信:" + data.data[i].contactAccount;
            serviceItem.getChildByName("btn_lianjiblue").name = `btnContact${i}add${data.id}`
            let headUrl = glGame.user.get('url').resource_url + data.data[i].avatar
            glGame.panel.showRemoteImage(serviceItem.getChildByName("headmask").getChildByName('head'), headUrl)
            let rechargeType = data.data[i].rechargeType;
            for (let j = 0; j < rechargeType.length; j++) {
                serviceItem.getChildByName("banksign").getChildByName(`${rechargeType[j]}`).active = true;
            }
            let startLevel = Number(data.data[i].star) * 56.2 - (Math.ceil(Number(data.data[i].star)) - 1) * 4;
            serviceItem.getChildByName("levelSpot").getComponent(cc.Layout).enabled = false;
            serviceItem.getChildByName("levelSpot").width = startLevel;
        }
    },
    setDescribe(data) {
        this.labDescribe.string = data;
        this.labDescribe._forceUpdateRenderData();
        if (this.labDescribe.node.height > 250) {
            this.labDescribe.overflow = 1;
            this.labDescribe.node.height = 120
            this.labDescribe.verticalAlign = 0
        }
    },
    btn_serviceCB() {
        glGame.panel.showChildPanel(this.complainPanel, this.node.parent.parent);
    },
    btn_copyCB(copyId) {
        glGame.platform.copyToClip(copyId);
    },
    btn_copyMyId() {
        glGame.platform.copyToClip(glGame.user.get("logicID"));
    },
    OnDestroy() {

    }
});

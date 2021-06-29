/**
 * 玩家个人信息界面
 */
glGame.baseclass.extend({
    properties: {
        content: cc.Node,
        item: cc.Node,
        btnGet: cc.Node,
        normalMaterial: cc.Material,
        grayMaterial: cc.Material,
    },

    onLoad() {
        this.state_color = [new cc.Color(239,65,65), new cc.Color(0,255,54), new cc.Color(89,110,139)];
        this.state_txt = glGame.tips.VIPAWARD.GETSTATE;
        this.type = 2;
        this.registerEvent();
    },

    onVipInfo(data) {
        if(this.node.active == false) {
            return;
        }

        if(this.type == 2) {
            this.showWeekGift(data.vipList, data.userInfo);
        } else {
            this.showMonthGift(data.vipList, data.userInfo);
        }
    },

    // 显示周礼金
    showWeekGift(vipList, userInfo) {
        this.type = 2;
        this.userInfo = userInfo;
        let vip_color = new cc.Color(177,136,71);
        let other_color = new cc.Color(221, 245, 255);
        let gray_color = new cc.Color(89,110,139);

        let frameBg = this.node.getChildByName("frame_big");
        frameBg.getChildByName("tittle_week").active = true;
        this.btnGet.getChildByName("Background").getChildByName("tittle_week").active = true;

        this.content.destroyAllChildren();
        for(let i = 0, count = vipList.length; i < count; i++) {
            let vipInfo = vipList[i];
            if(vipInfo.id == 1) {
                continue;
            }

            let cloneItem = cc.instantiate(this.item);
            cloneItem.active = false;
            cloneItem.parent = this.content;
            cloneItem.getChildByName("bg").active = i % 2 == 0;
            cloneItem.getChildByName("img_me").active = vipInfo.id == userInfo.vipId;
            
            cloneItem.getChildByName("vip").getComponent(cc.Label).string = `VIP${vipInfo.vipName}`;                               // vip等级
            cloneItem.getChildByName("award").getComponent(cc.Label).string = vipInfo.bonusWeekDiff/100;                // 周礼金
            cloneItem.getChildByName("allaward").getComponent(cc.Label).string = vipInfo.bonusWeek/100;                 // 累计礼金
            cloneItem.getChildByName("needbet").getComponent(cc.Label).string = vipInfo.bonusWeekBetting/100;           // 打码量需求
            cloneItem.getChildByName("needcharge").getComponent(cc.Label).string = vipInfo.bonusWeekRecharge/100;       // 存款量需求
            cloneItem.getChildByName("state").getComponent(cc.Label).string = this.state_txt[vipInfo.unclaimedWeek - 1];           // 领取状态
            cloneItem.getChildByName("state").color = this.state_color[vipInfo.unclaimedWeek - 1];  
            if(vipInfo.bonusWeekDiff <= 0) {
                cloneItem.getChildByName("state").getComponent(cc.Label).string = "-";
                cloneItem.getChildByName("state").color = this.state_color[2];
            }

            if(userInfo.vipId >= vipInfo.id) {
                cloneItem.getChildByName("vip").color = vip_color;
                cloneItem.getChildByName("award").color = other_color;
                cloneItem.getChildByName("allaward").color = other_color;

                if(userInfo.weekBetting >= vipInfo.bonusWeekBetting) {
                    cloneItem.getChildByName("needbet").color = other_color;
                }

                if(userInfo.weekRecharge >= vipInfo.bonusWeekRecharge) {
                    cloneItem.getChildByName("needcharge").color = other_color;
                }
            } else {
                cloneItem.getChildByName("vip").color = gray_color;
                cloneItem.getChildByName("award").color = gray_color;
                cloneItem.getChildByName("allaward").color = gray_color;
                cloneItem.getChildByName("needbet").color = gray_color;
                cloneItem.getChildByName("needcharge").color = gray_color;
            }

            if(i == vipList.length -1) {
                cloneItem.getChildByName("frame_horizontal").active = false;
            }
        }

        glGame.panel.showEffectNode(this,this.content,0.02,true);

        let infoNode = this.node.getChildByName("info");
        infoNode.getChildByName("all_bet").getComponent(cc.Label).string = this.cutFloat(userInfo.weekBetting);                    // 本周打码量
        infoNode.getChildByName("all_save").getComponent(cc.Label).string = this.cutFloat(userInfo.weekRecharge);                  // 本周存款量

        let rightNode = this.node.getChildByName("right");
        rightNode.getChildByName("cur_can_get").getComponent(cc.Label).string = this.cutFloat(userInfo.weekCanBonus);              // 当前可领取
        rightNode.getChildByName("all_can_get").getComponent(cc.Label).string = this.cutFloat(userInfo.weekBonus);                 // 总计可领取
        rightNode.getChildByName("have_get").getComponent(cc.Label).string = this.cutFloat(userInfo.weekCurrentBonus);             // 已领取
        rightNode.getChildByName("btn_get").getComponent(cc.Button).interactable = userInfo.weekIsReceive == 2;                      
        let btnTitle = this.btnGet.getChildByName("Background").getChildByName("tittle_week");
        if(userInfo.weekIsReceive != 2) {
            btnTitle.getComponent(cc.RenderComponent).setMaterial(0, this.grayMaterial);
        } else {
            btnTitle.getComponent(cc.RenderComponent).setMaterial(0, this.normalMaterial);
        }   
    },

    // 显示月礼金
    showMonthGift(vipList, userInfo) {
        this.type = 3;
        this.userInfo = userInfo;
        let vip_color = new cc.Color(177,136,71);
        let other_color = new cc.Color(221, 245, 255);
        let gray_color = new cc.Color(89,110,139);
        let frameBg = this.node.getChildByName("frame_big");
        frameBg.getChildByName("tittle_month").active = true;
        this.btnGet.getChildByName("Background").getChildByName("tittle_month").active = true;

        let infoNode = this.node.getChildByName("info");
        infoNode.getChildByName("tittle1").getComponent(cc.Label).string = "本月打码量";
        infoNode.getChildByName("tittle2").getComponent(cc.Label).string = "本月充值量";
        this.node.getChildByName("grid").getChildByName("img_title_ylj").active = true;
        this.node.getChildByName("grid").getChildByName("img_title_zhoulijin").active = false;

        this.content.destroyAllChildren();
        for(let i = 0, count = vipList.length; i < count; i++) {
            let vipInfo = vipList[i];
            if(vipInfo.id == 1) {
                continue;
            }

            let cloneItem = cc.instantiate(this.item);
            cloneItem.active = false;
            cloneItem.parent = this.content;
            cloneItem.getChildByName("bg").active = i % 2 == 0;
            cloneItem.getChildByName("img_me").active = vipInfo.id == userInfo.vipId;

            cloneItem.getChildByName("vip").getComponent(cc.Label).string = `VIP${vipInfo.vipName}`;                                // vip等级
            cloneItem.getChildByName("award").getComponent(cc.Label).string = vipInfo.bonusMonthDiff/100;                           // 周礼金
            cloneItem.getChildByName("allaward").getComponent(cc.Label).string = vipInfo.bonusMonth/100;                            // 累计礼金
            cloneItem.getChildByName("needbet").getComponent(cc.Label).string = vipInfo.bonusMonthBetting/100;                      // 打码量需求
            cloneItem.getChildByName("needcharge").getComponent(cc.Label).string = vipInfo.bonusMonthRecharge/100;                  // 存款量需求
            cloneItem.getChildByName("state").getComponent(cc.Label).string = this.state_txt[vipInfo.unclaimedMonth - 1];           // 领取状态
            cloneItem.getChildByName("state").color = this.state_color[vipInfo.unclaimedMonth - 1];  
            if(vipInfo.bonusMonthDiff <= 0) {
                cloneItem.getChildByName("state").getComponent(cc.Label).string = "-";
                cloneItem.getChildByName("state").color = this.state_color[2];
            }

            if(userInfo.vipId >= vipInfo.id) {
                cloneItem.getChildByName("vip").color = vip_color;
                cloneItem.getChildByName("award").color = other_color;
                cloneItem.getChildByName("allaward").color = other_color;

                if(userInfo.monthBetting >= vipInfo.bonusMonthBetting) {
                    cloneItem.getChildByName("needbet").color = other_color;
                }

                if(userInfo.monthRecharge >= vipInfo.bonusMonthRecharge) {
                    cloneItem.getChildByName("needcharge").color = other_color;
                }
            } else {
                cloneItem.getChildByName("vip").color = gray_color;
                cloneItem.getChildByName("award").color = gray_color;
                cloneItem.getChildByName("allaward").color = gray_color;
                cloneItem.getChildByName("needbet").color = gray_color;
                cloneItem.getChildByName("needcharge").color = gray_color;
            }
        }

        glGame.panel.showEffectNode(this,this.content,0.02,true);

        // let infoNode = this.node.getChildByName("info");
        infoNode.getChildByName("all_bet").getComponent(cc.Label).string = this.cutFloat(userInfo.monthBetting);                    // 本周打码量
        infoNode.getChildByName("all_save").getComponent(cc.Label).string = this.cutFloat(userInfo.monthRecharge);                  // 本周存款量

        let rightNode = this.node.getChildByName("right");
        rightNode.getChildByName("cur_can_get").getComponent(cc.Label).string = this.cutFloat(userInfo.monthCanBonus);              // 当前可领取
        rightNode.getChildByName("all_can_get").getComponent(cc.Label).string = this.cutFloat(userInfo.monthBonus);                 // 总计可领取
        rightNode.getChildByName("have_get").getComponent(cc.Label).string = this.cutFloat(userInfo.monthCurrentBonus);             // 已领取
        rightNode.getChildByName("btn_get").getComponent(cc.Button).interactable = userInfo.monthIsReceive == 2;      
        let btnTitle = this.btnGet.getChildByName("Background").getChildByName("tittle_month");       
        if(userInfo.monthIsReceive != 2) {
            btnTitle.getComponent(cc.RenderComponent).setMaterial(0, this.grayMaterial);
        } else {
            btnTitle.getComponent(cc.RenderComponent).setMaterial(0, this.normalMaterial);
        }
    },

    onClick(name, node) {
        switch (name) {
            case "close":
                this.remove()
                break;
            case "btn_get":
                this.ReqVipReward(this.type, this.userInfo.vipId);
                break;
        }
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on("notifyVipInfo", this.onVipInfo, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off("notifyVipInfo", this);
    },

    //领取 1彩金，2周礼金，3月礼金
    ReqVipReward(type, vipid) {
        let msg = { "type": type, "vip_id": vipid }
        glGame.gameNet.send_msg('http.ReqVipReward', msg, (route, data) => {
            if (data.result) {
                glGame.user.ReqRedDot();
                glGame.user.reqGetCoin();
                glGame.emitter.emit("notifyReqVipInfo");
                let strTitle = "";
                if (type == 2) strTitle = glGame.tips.VIPAWARD.WEEKAWARD;
                else if (type == 3) strTitle = glGame.tips.VIPAWARD.MONTHAWARD;
                glGame.panel.showAwardBox(strTitle, [{ type: glGame.awardtype.COIN, value: this.cutFloat(data.coin) }]);
            }
        })
    },

    //截取小数点后2位
    cutFloat(value) {
        if (typeof value !== 'string' && typeof value !== 'number') return;
        return (Math.floor(parseFloat(value)) / 100).toFixed(2);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
});

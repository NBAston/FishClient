let taskcfg = require('taskcfg');
const ON_TYPE = {
    DAYTASK: 0, // 每日任务
    WEEKTASK: 1,//每周任务
    ACHIEVERE: 2,//成就奖励
    MAKEMONEY: 3 //我要赚钱
}
const SELECTINDEX = {
    "isDaily": 1,
    "isWeekly": 2,
    "isAchievement": 0
}
const TaskType = {
    dailyType: 1,
    activeType: 2
}
glGame.baseclass.extend({
    properties: {
        awardTips: cc.Prefab,
        interFace: cc.Node,
        selectType: cc.Node,
        UsualItem: cc.Node,
        boxList: cc.Node,
        arrIcon: [cc.SpriteFrame],
    },
    onLoad() {
        this.in_type = 0; // 当前所在的界面类型
        this.record = {};//将请求过的数据存入
        this.registerEvent();
        this.ImageCode = {
            101: this.arrIcon[0],
            102: this.arrIcon[1],
            103: this.arrIcon[2],
            104: this.arrIcon[3],
            105: this.arrIcon[4],
            106: this.arrIcon[5],
            107: this.arrIcon[6],
            108: this.arrIcon[7],
            109: this.arrIcon[8],
            201: this.arrIcon[9],
            202: this.arrIcon[10],
            203: this.arrIcon[11],
            204: this.arrIcon[12],
            205: this.arrIcon[13],
        }
        glGame.panel.showEffectPariticle(this.node);
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.ReqMissionConfig, this);
    },
    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    },



    onClick(name, node) {
        switch (name) {
            case "isDaily":
            case "isWeekly":
            case "isAchievement":
                this.ReqMissionList(name); break;
            case "makeMonkey":
                this.switchFace(name)
                break;
            case "close": this.remove(); break;
            case "btn_getReward": this.getReward(); break;


            case "btn_goReward": this.goReward(node); break;
            case "btn_Reward": this.Reward(node); break;
            case "btn_gopopularize": this.popularize(); break;
            case "btn_goannounce": this.announce(); break;
            case "btn_goTask": this.goTask(); break;
            case "btn_gobackWater": this.gobackWater(); break;
            case "btn_goyubao": this.goyubao(); break;
            case "btn_goplaza": this.goplaza(); break;

            case "icon_box_1": case "icon_box_2": case "icon_box_3":
            case "icon_box_4": case "icon_box_5":
                this.boxReward(name, node)
                break
            default: console.log(" btn name: ", name); break;
        }
    },
    //请求标题的显示
    ReqMissionConfig() {
        glGame.gameNet.send_msg('http.ReqMissionConfig', null, (route, data) => {
            this.initSelect(data.result);
            for (let i = 0; i < this.selectType.childrenCount; i++) {
                if (this.selectType.children[i].active) {
                    this.selectType.children[i].getComponent(cc.Toggle).check();
                    if (i == 0) this.onClick("isDaily");
                    break;
                }
            }
        });
    },
    //1任务 2 活跃
    //state 1:进行中 2 可领取 3已完成
    ReqMissionList(name) {
        if (this.record[name]) return this.switchFace(name);
        let type = SELECTINDEX[name];
        glGame.gameNet.send_msg('http.ReqMissionList', { cycleType: type }, (route, data) => {
            this.record[name] = data.result;
            this.switchFace(name);
            this.initFaceInfo(data.result);
            this.initTask(data.result.activeList)
            this.isgetReward();
        });
    },
    //一次性领取全部的奖励
    ReqMissionAllReward(cycleType) {
        glGame.gameNet.send_msg('http.ReqMissionAllReward', { cycleType: cycleType }, (route, data) => {
            this.initWindowInfo(data.result);
            this.refreshAllReward();
            let oldReward = this.interFace.children[this.in_type].getChildByName("totalReward").getChildByName("oldReward").getComponent(cc.Label);
            oldReward.string = Number(oldReward.string) - Number(data.result.missionCoin).div(100);
            glGame.user.reqGetCoin();
            glGame.user.reqGetDiamond();
            this.isgetReward();
        });
    },
    //初始化点击选项
    initSelect(selectResult) {
        for (let key in selectResult) {
            if (this.selectType.getChildByName(`${key}`)) {
                this.selectType.getChildByName(`${key}`).active = selectResult[key];
            }
            for (let i = 0; i < this.selectType.childrenCount; i++) {
                if (this.selectType.children[i].getChildByName(`${key}`)) {
                    this.selectType.children[i].getChildByName(`${key}`).active = selectResult[key];
                }
            }
        }
        if (this.selectType.getChildByName(`makeMonkey`)) this.selectType.getChildByName(`makeMonkey`).active = true;
    },
    //界面转换
    switchFace(name) {
        for (let i = 0; i < this.interFace.childrenCount; i++) {
            if (this.interFace.children[i].name == name) {
                this.interFace.children[i].active = true;
                this.in_type = i;
            } else {
                this.interFace.children[i].active = false;
            }
        }
    },
    //界面信息初始化
    initFaceInfo(data) {
        let content = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");
        let missionList = data.missionList;
        for (let i = 0; i < missionList.length; i++) {
            let UsualItem = cc.instantiate(this.UsualItem);
            UsualItem.parent = content;
            UsualItem.active = false;
            UsualItem.getChildByName("Title").getComponent(cc.Label).string = missionList[i].title;
            UsualItem.getChildByName("describe").getComponent(cc.Label).string = taskcfg.getDescribe(missionList[i]);
            //UsualItem.getChildByName("coinreward").getComponent(cc.Label).string = this.getFloat(missionList[i].rewardCoin);
            UsualItem.name = `${i}`


            let coinreward = UsualItem.getChildByName("layout").getChildByName("coinreward");
            let dimandreward = UsualItem.getChildByName("layout").getChildByName("dimandreward");
            let activereward = UsualItem.getChildByName("activereward");
            // coinreward.active = missionList[i].rewardCoin;
            // dimandreward.active = missionList[i].rewardDiamond || glGame.user.get("roomSwitch") == 1;
            // activereward.active = missionList[i].rewardActive;
            if(missionList[i].rewardCoin>0){
                coinreward.active = true;
                coinreward.getComponent(cc.Label).string = this.getFloat(missionList[i].rewardCoin);
            }else {coinreward.active = false;}
            if(missionList[i].rewardDiamond>0&&glGame.user.get("roomSwitch") == 1){
                dimandreward.active = true;
                dimandreward.getComponent(cc.Label).string = this.getFloat(missionList[i].rewardDiamond);
            }else {dimandreward.active = false;}
            if(missionList[i].rewardActive>0){
                activereward.active = true
                activereward.getChildByName("lab_reward").getComponent(cc.Label).string = missionList[i].rewardActive
            }else {activereward.active = false;}
            //成就奖励的项目没有活跃度奖励而且icon没有底框
            if (this.in_type == ON_TYPE.ACHIEVERE) {
                UsualItem.getChildByName("activereward").active = false;
            } else {
                activereward.getChildByName("lab_reward").getComponent(cc.Label).string = missionList[i].rewardActive;
            }

            //根据当前进度与目标进度匹配显示内容
            if (Number(missionList[i].progress) >= Number(missionList[i].progressTarget) && missionList[i].state != 3) {
                UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_COMPLETE;
            } else if (missionList[i].state == 3) {
                UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
                UsualItem.getChildByName("schdule_des").y = 4;
            } else {
                UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = `${missionList[i].progress}/${missionList[i].progressTarget}`;
            }
            UsualItem.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.ImageCode[missionList[i].icon];
            UsualItem.getChildByName("btn_goReward").active = missionList[i].state == 1;
            UsualItem.getChildByName("btn_Reward").active = missionList[i].state == 2
        }

        glGame.panel.showEffectNode(this,content,0.02,true);

        let totalReward = this.interFace.children[this.in_type].getChildByName("totalReward");
        totalReward.getChildByName("dayTotalReward").getComponent(cc.Label).string = this.getFloat(data.rewardInfo.totalReward);
        totalReward.getChildByName("oldReward").getComponent(cc.Label).string = this.getFloat(data.rewardInfo.unReceiveReward);

        if (this.in_type == ON_TYPE.DAYTASK || this.in_type == ON_TYPE.WEEKTASK) {
            let activeValue = this.interFace.children[this.in_type].getChildByName("activeNum").getChildByName("Number");
            activeValue.getComponent(cc.Label).string = data.activeValue;
        }

    },
    //对宝箱进行排序
    initTask(boxList) {
        if (this.in_type > 1) return
        if (boxList.length == 0) this.interFace.children[this.in_type].getChildByName("taskProgress").active = false;
        let boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
        for (let i = 0; i < boxList.length; i++) {
            let boxItem = cc.instantiate(this.boxList.getChildByName(`icon_box_${boxList[i].iconId}`));
            boxItem.parent = boxNode;
            boxItem.name = `icon_box_${i + 1}`
            boxItem.active = true;
            // let box = boxNode.getChildByName(`icon_box_${boxList[i].iconId}`);
            // box.active = true;
            // box.setSiblingIndex(i);
        }
        /*boxNode.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.callFunc(()=>{
                this.refreshbox();
                this.refreshProress();
            })
        ))
        */

        this.refreshbox();
        this.refreshProress();
    },
    refreshbox() {
        let boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
        let activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue);
        let boxList = this.record[this.interFace.children[this.in_type].name].activeList;
        for (let i = 0; i < boxList.length; i++) {
            boxNode.children[i].getChildByName("achieveNum").getComponent(cc.Label).string = boxList[i].activity;
            console.log("这是当前的宝箱活跃度", boxList[i].activity, boxNode.children[i].getChildByName("achieveNum").getComponent(cc.Label).string)
            if (boxList[i].activity <= activeValue) {
                if (boxList[i].state == 3) {
                    boxNode.children[i].getChildByName("closing").active = false;
                    boxNode.children[i].getChildByName("opening").active = true;
                } else {
                    boxNode.children[i].getChildByName("light").active = true;
                    boxNode.children[i].getChildByName("manypill").active = true;
                }
            }

            boxNode.children[i].x = (i + 1) / boxList.length * boxNode.width;
        }
    },

    //刷新进度条信息
    refreshProress() {
        let boxList = this.record[this.interFace.children[this.in_type].name].activeList;

        let activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue);
        let boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
        let mask = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("mask");
        for(let i=0;i<boxList.length;i++){
            if(activeValue <= boxList[i].activity) {
                if(i == 0) {
                    mask.width = boxNode.children[i].x * activeValue / boxList[i].activity;
                } else {
                    let startX = boxNode.children[i-1].x;
                    let endX = boxNode.children[i].x;
                    let range = boxList[i].activity - boxList[i-1].activity;
                    mask.width = startX + (activeValue - boxList[i-1].activity) / range * (endX - startX);
                }
                return
            }
        }
        mask.width = mask.getChildByName("bar").width;
    },
    //跳转游戏
    jumpGame(gameid) {
        console.log("====》这是跳转的游戏的gameid", gameid);
        // glGame.emitter.emit("roomEntrance", gameid);
        if (gameid == 0) {
            this.remove();
        } else {
            glGame.gamelistcfg.onEnterGame(gameid, true);
        }
        
    },
    //桌面数据的显示
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    popularize() {
        this.remove(false);
        glGame.panel.showPanelByName("popularize");
    },
    //去完成
    goReward(node) {
        this.remove(false);
        let Index = node.parent.name;
        let missionList = this.record[this.interFace.children[this.in_type].name].missionList;
        if (missionList[Index].missionType >= 5) {
            this.jumpGame(missionList[Index].gameId)
        } else if (missionList[Index].missionType == 2) {
            glGame.panel.showPanelByName("popularize");
        } else if (missionList[Index].missionType == 3 || missionList[Index].missionType == 4) {
            glGame.panel.showShop();
        }
    },
    //领取任务奖励
    Reward(node) {
        let Index = node.parent.name;
        let cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
        let rewardType = TaskType.dailyType;
        let rewardId = this.record[this.interFace.children[this.in_type].name].missionList[Index].id;
        console.log("这是当前领取任务奖励参数", cycleType, rewardType, rewardId)
        glGame.gameNet.send_msg('http.ReqMissionReward', { cycleType: cycleType, rewardType: rewardType, rewardId: rewardId }, (route, data) => {
            this.initWindowInfo(data.result)
            node.active = false;
            node.parent.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
            node.parent.getChildByName("schdule_des").y = 4;
            node.parent.getChildByName("btn_Reward").active = false;
            this.record[this.interFace.children[this.in_type].name].missionList[Index].state = 3;
            let oldReward = this.interFace.children[this.in_type].getChildByName("totalReward").getChildByName("oldReward").getComponent(cc.Label);
            oldReward.string = Number(oldReward.string) - Number(data.result.coin).div(100);
            glGame.user.reqGetCoin();
            glGame.user.reqGetDiamond();
            this.isgetReward();
        });
    },
    //宝箱领取奖励
    boxReward(name, node) {
        //if (!node.getChildByName("light").active) return;
        let interFaceData = this.record[this.interFace.children[this.in_type].name]
        let index = this.getIndex(name);
        let activeValue = interFaceData.activeValue;
        let coin = null, score = null,randDiamond = null;
        if (Number(interFaceData.activeList[index].activity) > activeValue) {
            let awardTips = glGame.panel.showChildPanel(this.awardTips, this.node)

            if (interFaceData.activeList[index].randCoin.length != 0) {
                coin = `${this.getFloat(interFaceData.activeList[index].randCoin.min)}~${this.getFloat(interFaceData.activeList[index].randCoin.max)}`
            }
            console.log("这是当前数组", interFaceData.activeList[index].randIntegral, interFaceData.activeList[index].randIntegral.length)
            if (interFaceData.activeList[index].randIntegral.length != 0) {
                score = `${this.getFloat(interFaceData.activeList[index].randIntegral.min)}~${this.getFloat(interFaceData.activeList[index].randIntegral.max)}`
            }
            if (interFaceData.activeList[index].randDiamond.length != 0) {
                randDiamond = `${this.getFloat(interFaceData.activeList[index].randDiamond.min)}~${this.getFloat(interFaceData.activeList[index].randDiamond.max)}`
            }
            awardTips.getComponent("awardTips").showMsg(glGame.tips.TASK.AWARD_TITTLE, coin, score,randDiamond)
            return
        }
        let cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
        let rewardType = TaskType.activeType;
        let rewardId = interFaceData.activeList[index].id;
        glGame.gameNet.send_msg('http.ReqMissionReward', { cycleType: cycleType, rewardType: rewardType, rewardId: rewardId }, (route, data) => {
            this.initWindowInfo(data.result);
            node.getChildByName("light").active = false;
            node.getChildByName("manypill").active = false;
            node.getChildByName("closing").active = false;
            node.getChildByName("opening").active = true;
            interFaceData.activeList[index].state = 3;
            glGame.user.reqGetCoin();
            glGame.user.reqGetDiamond();
            this.isgetReward();
        });
    },
    //获取当前宝箱的索引
    getIndex(name) {
        let allReward = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
        for (let i = 0; i < allReward.childrenCount; i++) {
            if (allReward.children[i].name == name) {
                console.log("allReward.children[i].name", allReward.children[i].name, i, name)
                return i;
            }
        }
    },
    //初始化弹窗回包信息
    initWindowInfo(data) {
        let awardlist = [];
        data.coin != null &&data.coin>0? awardlist.push({ type: glGame.awardtype.COIN, value: this.getFloat(data.coin) }) : null;
        data.integral != null&&data.integral>0 ? awardlist.push({ type: glGame.awardtype.SCORE, value: this.getFloat(data.integral) }) : null;
        data.active != null &&data.active>0? awardlist.push({ type: glGame.awardtype.VITALITY, value: data.active }) : null;
        data.diamond != null &&data.diamond>0? awardlist.push({ type: glGame.awardtype.DIAMOND, value: this.getFloat(data.diamond) }) : null;
        console.log("这是当前奖励的数组", awardlist, glGame.user.get("roomSwitch"));
        glGame.panel.showAwardBox(glGame.tips.TASK.AWARD_TIPS, awardlist);
        if (data.active && data.active != 0) {
            // this.playflash();
            let activeNum = this.interFace.children[this.in_type].getChildByName("activeNum").getChildByName("Number").getComponent(cc.Label);
            this.record[this.interFace.children[this.in_type].name].activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue) + Number(data.active);
            activeNum.string = this.record[this.interFace.children[this.in_type].name].activeValue;
            this.refreshProress();
            this.refreshbox();
        }
    },
    refreshAllReward() {
        let TaskList = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");

        for (let i = 0; i < TaskList.childrenCount; i++) {
            if (TaskList.children[i].getChildByName("btn_Reward").active) {
                TaskList.children[i].getChildByName("btn_Reward").active = false;
                TaskList.children[i].getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
                TaskList.children[i].getChildByName("schdule_des").y = 4;
            }
        }
        if (this.in_type != ON_TYPE.ACHIEVERE) {
            let BoxList = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
            for (let i = 0; i < BoxList.childrenCount; i++) {
                if (BoxList.children[i].getChildByName("light").active) {
                    BoxList.children[i].getChildByName("light").active = false;
                    BoxList.children[i].getChildByName("manypill").active = false;
                    BoxList.children[i].getChildByName("closing").active = false;
                    BoxList.children[i].getChildByName("opening").active = true;
                }
            }
        }
        let activeList = this.record[this.interFace.children[this.in_type].name].activeList;
        for (let i = 0; i < activeList.length; i++) {
            activeList[i].state = 3;
        }
        let missionList = this.record[this.interFace.children[this.in_type].name].missionList;
        for (let i = 0; i < missionList.length; i++) {
            missionList[i].state = 3;
        }

    },
    playflash() {
        let flash = this.interFace.children[this.in_type].getChildByName("flash");
        flash.active = true;
        flash.getComponent(sp.Skeleton).setAnimation(0, "huoyuedu", false);
        flash.getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
            let name = trackEntry.animation ? trackEntry.animation.name : "";
            if (name == 'huoyuedu') {
                flash.active = false;
            }
        })
    },
    //是否有可领取的奖励
    isgetReward() {
        let TaskList = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");

        let btn_getReward = this.interFace.children[this.in_type].getChildByName("totalReward").getChildByName("btn_getReward");
        let interFaceData = this.record[this.interFace.children[this.in_type].name]
        let isReward = false;
        // for (let i = 0; i < TaskList.childrenCount; i++) {
        //     if (TaskList.children[i].getChildByName("btn_Reward").active) {
        //         isReward = true;
        //         break;
        //     }
        // }
        let missionList = interFaceData.missionList;
        for (let i = 0; i < missionList.length; i++) {
            if (Number(missionList[i].progress) >= Number(missionList[i].progressTarget) && missionList[i].state != 3) {
                isReward = true;
                break;
            }
        }
        if (this.in_type != ON_TYPE.ACHIEVERE) {
            // let BoxList = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
            // for (let i = 0; i < BoxList.childrenCount; i++) {
            //     if (BoxList.children[i].getChildByName("light").active) {
            //         isReward = true;
            //         break;
            //     }
            // }
            let activeList = interFaceData.activeList
            for (let i = 0; i < activeList.length; i++) {
                if (activeList[i].activity <= interFaceData.activeValue && activeList[i].state != 3) {
                    isReward = true;
                    console.log("红点隐藏", activeList[i].activity, interFaceData.activeValue, activeList[i].state, activeList)
                    break;
                }
            }
        }
        console.log("当前一键领取以及红点", isReward)
        btn_getReward.getComponent(cc.Button).interactable = isReward;
        this.selectType.children[this.in_type].children[2].active = isReward;

        for (let i = 0; i < this.selectType.childrenCount; i++) {
            if (this.selectType.children[i].children[2] && this.selectType.children[i].children[2].active) {
                return
            }
        }

        if (!glGame.user.isTourist()) {
            glGame.user.redDotData.missionReq = 2;
            glGame.emitter.emit("ReqRedDot");
            console.log("关闭大厅任务红点")
        }
    },
    //一键领取所有奖励
    getReward() {
        let cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
        console.log("这是当前的点击类型", cycleType)
        this.ReqMissionAllReward(cycleType);
    },
    announce() {
        this.remove(false);
        glGame.panel.showPanelByName("announcement");
    },
    goTask() {
        for(let i = 0; i <= ON_TYPE.ACHIEVERE; i++) {
            if(this.selectType.children[i].active) {
                this.selectType.children[i].getComponent(cc.Toggle).check();
                break;
            }
        }
        
    },
    gobackWater() {
        this.remove(false);
        glGame.panel.showPanelByName('backWater');
    },
    goyubao() {
        this.remove(false);
        glGame.panel.showPanelByName('yubao');
    },
    goplaza() {
        this.remove();
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
});

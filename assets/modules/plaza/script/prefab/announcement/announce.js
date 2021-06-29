const DIMAND = 2
const COIN = 1
glGame.baseclass.extend({

    properties: {
        firstView: cc.Node,
        firstItem: cc.Node,
        secondView: cc.Node,
        secondItem: cc.Node,
        detailView1: cc.Node,
        node_detailView1: cc.Node, // layout为1时显示
        detailView2: cc.Node,       //layout为2时显示
        rewardBar1: cc.Node,
        rewardBar2: cc.Node,
        rewardBarother: cc.Node,
        imageItem: cc.Node,
        contentItem: cc.Node,
        iconArr: [cc.SpriteFrame],
        activityArr: [cc.SpriteFrame],
        cycleTypeArr: [cc.SpriteFrame],
        detailwindow: cc.Prefab,
        conditionItem: cc.Node,
        btn_allreward: cc.Button,

        LabelItem: cc.Node,
        //以下为表格生成用到
        barItem: cc.Node,
        lineItem: cc.Node,
        wordItem: cc.Node,
        formView: cc.Node,

        downPage: cc.Node,
        upPage: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("这是当前的钻石开关", glGame.user.get("roomSwitch"));
        glGame.emitter.on("ReqRedDot", this.initReddot, this);
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.announceActionEnd, this);
        this.cacheData = {};

    },
    announceActionEnd() {
        glGame.gameNet.send_msg("http.reqNotice", {}, (route, msg) => {
            this.btn_allreward.node.active = true;
            this.notices = msg.notices;
            this.reqFirstTitle();
            this.getAllrewardState();
            // if (!glGame.user.isTourist()) {
            //     let data = glGame.user.get('redDotData');
            //     this.btn_allreward.interactable = data['discountReq'].length != 0;
            // } else {
            //     this.btn_allreward.interactable = false
            // }
        })
    },

    //拉取当前一键领取状态
    getAllrewardState() {
        glGame.gameNet.send_msg("http.ReqDiscountsReceiveAllState", {}, (route, msg) => {
            this.btn_allreward.interactable = msg.state != 0
        })
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.close(); break;
            case "btn_allReceive": this.allreward(); break;
            case "notice": this.noticeShow(node); break;
            case "firstItem": this.switchFirst(name, node); break;
            case "secondItem": this.switchSecond(name, node); break;
            case "btn_goGetCoin": this.goGetCoin(node); break;
            case "btn_reward": this.reward(node); break;
            case "btn_activityDetail": this.activityDetail(); break;
            case "upPage": this.onUpPage(); break;
            case "downPage": this.onDownPage(); break;
            default: console.log(" btn name: ", name); break;
        }
    },
    // 1 活动时间// 2 活动对象// 3 活动介绍// 4活动表格// 5 活动细则// 6 活动规则与条款
    //更新详细信息
    updateDetailView1(data) {
        this.node_detailView1.active = true;
        this.detailView2.active = false;
        this.detailView1.destroyAllChildren();
        this.detailView1.removeAllChildren();
        if (data.activitypic && data.activitypic != "") {
            let imageItem = cc.instantiate(this.imageItem);
            imageItem.parent = this.detailView1;
            glGame.panel.showRemoteImage(imageItem, data.activitypic);
            imageItem.active = true;
        }

        for (let i = 0; i < data.titledetail.length; i++) {
            if (data.titledetail[i].id == 5 || data.titledetail[i].id == 6) continue;
            if (data.titledetail[i].type == 4 && data.titledetail[i].img && data.titledetail[i].img != "") {
                let imageItem = cc.instantiate(this.imageItem);
                glGame.panel.showRemoteImage(imageItem, data.titledetail[i].img).then(() => {
                    console.log("加载成功")
                    if (imageItem.width > 1200) {
                        imageItem.height = imageItem.height * 1200 / imageItem.width;
                        imageItem.width = 1200
                    }
                });
                imageItem.parent = this.detailView1;
                imageItem.active = false;
                continue;
            } else if (data.titledetail[i].img == "") {
                continue;
            }
            if (data.titledetail[i].id === 4) {
                this.initform(data.titledetail[i].content)
                continue;
            }
            let contentItem = cc.instantiate(this.contentItem);
            contentItem.parent = this.detailView1;
            contentItem.active = false;
            contentItem.getChildByName("Tip").getComponent(cc.Label).string = data.titledetail[i].title + "：";
            contentItem.getChildByName("img_icon").getComponent(cc.Sprite).spriteFrame = this.iconArr[data.titledetail[i].icon];
            if (data.titledetail[i].id == 3) {
                contentItem.getChildByName("content2").active = true;
                contentItem.getChildByName("content2").getComponent(cc.Label).string = data.titledetail[i].content;
                if (data.titledetail[i].content.length == 0) {
                    contentItem.getChildByName("content2").active = false;
                }
            } else {
                contentItem.getChildByName("content1").active = true;
                contentItem.getChildByName("content1").getComponent(cc.Label).string = data.titledetail[i].content;
            }
        }
        glGame.panel.showEffectNode(this, this.detailView1, 0.02, true);
        this.updateRewardBar(data, this.rewardBar1, this.detailView1, 1)
    },
    //更新领取奖励条
    updateRewardBar(data, BarType, parent, type) {
        let rewardItem = data.rewardItem
        if (!rewardItem) return
        if (rewardItem.length) {
            let sumCoin = 0;
            let sumDiamond = 0;
            for (let i = 0; i < rewardItem.length; i++) {
                let rewardBar = cc.instantiate(BarType)
                rewardBar.parent = parent;
                rewardBar.active = false;
                rewardBar.name = `${i}`
                let rewardTypeCount = 0;

                if (type != 2) {
                    if (rewardBar.getChildByName("lab_accumulate")) {
                        rewardBar.getChildByName("lab_accumulate").getComponent(cc.Label).string = rewardItem[i].getStr;
                    }
                }

                let minValue = 0;
                if (type != 2) {
                    minValue = -1;
                }

                let coinpic = rewardBar.getChildByName("rewardLayout").getChildByName("coinpic");
                let dimandpic = rewardBar.getChildByName("rewardLayout").getChildByName("dimandpic");
                //这是金币的显示部分
                if (rewardItem[i].reward.coin > 0 && Number(rewardItem[i].reward.coin) > 0) {
                    coinpic.active = true;
                    rewardTypeCount++;
                    sumCoin += Number(rewardItem[i].reward.coin);
                    coinpic.getChildByName("lab_rewardNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.coin);
                }
                if (rewardItem[i].reward.coin == 0) {
                    for (let k = 0; k < rewardItem[i].rewardType.length; k++) {
                        if (rewardItem[i].rewardType[k] == COIN && Number(rewardItem[i].reward.coin) > minValue) {
                            coinpic.active = true;
                            coinpic.getChildByName("lab_rewardNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.coin);
                            break;
                        }
                    }
                }
                console.log("这是当前的钻石显示", glGame.user.get("roomSwitch"), rewardItem[i].reward.diamond)
                //这部分是钻石的显示
                if (rewardItem[i].reward.diamond > 0 && glGame.user.get("roomSwitch") == 1) {
                    dimandpic.active = true;
                    rewardTypeCount++;
                    sumDiamond += rewardItem[i].reward.diamond;
                    dimandpic.getChildByName("lab_diamondNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.diamond);
                }
                if (rewardItem[i].reward.diamond == 0 && glGame.user.get("roomSwitch") == 1) {
                    for (let k = 0; k < rewardItem[i].rewardType.length; k++) {
                        if (rewardItem[i].rewardType[k] == DIMAND && Number(rewardItem[i].reward.diamond) > minValue) {
                            dimandpic.active = true;
                            dimandpic.getChildByName("lab_diamondNum").getComponent(cc.Label).string = this.getFloat(rewardItem[i].reward.diamond);
                            break;
                        }
                    }
                }

                rewardBar.getChildByName("btn_reward").active = rewardItem[i].state == 0;
                if (rewardItem[i].state == 0) {
                    //this.btn_allreward.interactable = true;
                    this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
                }

                rewardBar.getChildByName("btn_goGetCoin").active = rewardItem[i].state == 2;
                rewardBar.getChildByName("Receiveed").active = rewardItem[i].state == 1;
                rewardBar.getChildByName("auditing").active = rewardItem[i].state == 4;
                rewardBar.getChildByName("refuse").active = rewardItem[i].state == 5;
                if (rewardItem[i].state == -1 && data.cycleType) {
                    rewardBar.getChildByName("ReceiveType").active = true;
                    rewardBar.getChildByName("ReceiveType").getComponent(cc.Sprite).spriteFrame = this.cycleTypeArr[data.cycleType];
                } else {
                    rewardBar.getChildByName("ReceiveType").active = false;
                }
                // rewardBar.getChildByName("ReceiveType").active = rewardItem[i].state == -1;
                // if (rewardItem[i].schedule[1] == 4) {
                //     rewardBar.getChildByName("ReceiveType").getComponent(cc.Label).string = rewardItem[i].schedule[4]
                // }
                if (rewardItem[i].rewardWords) {
                    let rewardicon = rewardBar.getChildByName("rewardTips")
                    rewardicon.getComponent(cc.Label).string = rewardItem[i].rewardWords + "：";
                }
                rewardBar.getChildByName("btn_goGetCoin").y = 4.24;
                rewardBar.getChildByName("btn_reward").y = 4.24;
                if (rewardItem[i].state == 0) {
                    rewardBar.getChildByName("btn_reward").y = -20;
                    rewardBar.getChildByName("btn_goGetCoin").y = -20;
                    rewardBar.getChildByName("des_shcedule").active = true;
                    rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = "已完成";
                    continue
                } else if (rewardItem[i].state != 2) {
                    rewardBar.getChildByName("des_shcedule").active = false;
                    continue
                }
                let schedule = Number(rewardItem[i].schedule[1]);
                switch (schedule) {
                    case 1:

                        if (Number(rewardItem[i].schedule[3]) == -1) {
                            rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string =
                                rewardItem[i].schedule[4] + ` ${this.getFloat(rewardItem[i].schedule[2])}</c>`
                        } else {
                            rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string =
                                rewardItem[i].schedule[4] + ` ${this.getFloat(rewardItem[i].schedule[2])}</c>/${this.getFloat(rewardItem[i].schedule[3])}`
                        }

                        rewardBar.getChildByName("des_shcedule").active = true;
                        rewardBar.getChildByName("btn_reward").y = -20;
                        rewardBar.getChildByName("btn_goGetCoin").y = -20;
                        break;
                    case 2:
                        rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4];
                        rewardBar.getChildByName("des_shcedule").active = true;
                        rewardBar.getChildByName("btn_reward").y = -20;
                        rewardBar.getChildByName("btn_goGetCoin").y = -20;
                        break;
                    case 3:
                        rewardBar.getChildByName("des_shcedule").getComponent(cc.RichText).string = rewardItem[i].schedule[4] + `  ${rewardItem[i].schedule[2]}/${rewardItem[i].schedule[3]}`
                        rewardBar.getChildByName("des_shcedule").active = true;
                        rewardBar.getChildByName("btn_reward").y = -20;
                        rewardBar.getChildByName("btn_goGetCoin").y = -20;
                        break;
                }

                if (type == 2) {
                    let lab_accumulate = rewardBar.getChildByName("rewardLayout").getChildByName("lab_accumulate");
                    if (lab_accumulate) {
                        if (rewardTypeCount == 1) {
                            let str = "";
                            if (coinpic.active) {
                                str = `(累计奖励${this.getFloat(sumCoin)}金币)`;
                            } else {
                                str = `(累计奖励${this.getFloat(sumDiamond)}钻石)`
                            }
                            lab_accumulate.active = true;
                            lab_accumulate.getComponent(cc.Label).string = str;
                        } else if (rewardTypeCount == 0) {
                            lab_accumulate.active = true;
                            lab_accumulate.getComponent(cc.Label).string = rewardItem[i].getStr;
                        }

                    }
                }

            }
            glGame.panel.showEffectNode(this, parent, 0.02, true);
        } else {
            let rewardBarother = cc.instantiate(this.rewardBarother);
            rewardBarother.parent = parent;
            rewardBarother.active = true
            rewardBarother.name = "registerbonus"
            rewardBarother.getChildByName("des_tip").getComponent(cc.Label).string = rewardItem.getStr + "：";
            rewardBarother.getChildByName("btn_reward").active = rewardItem.state == 0;
            rewardBarother.getChildByName("btn_goGetCoin").active = rewardItem.state == 2;
            rewardBarother.getChildByName("Receiveed").active = rewardItem.state == 1
            rewardBarother.getChildByName("auditing").active = rewardItem.state == 4;
            rewardBarother.getChildByName("refuse").active = rewardItem.state == 5;

            let lab_rewardNum = rewardBarother.getChildByName("rewardLayout").getChildByName("lab_rewardNum");
            let lab_diamondNum = rewardBarother.getChildByName("rewardLayout").getChildByName("lab_diamondNum");

            // //这是金币的显示部分
            // if (rewardItem.reward.coin > 0 && Number(rewardItem.reward.coin) > 0) {
            //     lab_rewardNum.active = true;
            //     lab_rewardNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.coin);
            // }

            // if (rewardItem.reward.coin == 0) {
                
            // }

            for (let k = 0; k < rewardItem.rewardType.length; k++) {
                if (rewardItem.rewardType[k] == COIN &&Number(rewardItem.reward.coin)!=undefined) {
                    lab_rewardNum.active = true;
                    lab_rewardNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.coin);
                    break;
                }
            }
            for (let k = 0; k < rewardItem.rewardType.length; k++) {
                if (rewardItem.rewardType[k] == DIMAND&&glGame.user.get("roomSwitch") == 1&&Number(rewardItem.reward.diamond)!=undefined) {
                    lab_diamondNum.active = true;
                    lab_diamondNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.diamond);
                    break;
                }
            }
            // //这部分是钻石的显示
            // if (Number(rewardItem.reward.diamond) > 0 && glGame.user.get("roomSwitch") == 1) {
            //     lab_diamondNum.active = true;
            //     lab_diamondNum.getComponent(cc.Label).string = this.getFloat(rewardItem.reward.diamond);
            // }
            // if (Number(rewardItem.reward.diamond) == 0 && glGame.user.get("roomSwitch") == 1) {
              
            // }

            if (rewardItem.state == 0) {
                //this.btn_allreward.interactable = true;
                this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
            }
            let conditional = data.conditional,
                curSchdule = 0;
            for (let i = 0; i < conditional.length; i++) {
                let conditionItem = cc.instantiate(this.conditionItem);
                conditionItem.getComponent(cc.Label).string = conditional[i].content
                if (conditional[i].state == 1) {
                    curSchdule++
                    conditionItem.getChildByName("gou").active = true;
                }
                conditionItem.color = conditional[i].state == 1 ? cc.color(38, 218, 18) : cc.color(255, 71, 71)
                conditionItem.parent = rewardBarother.getChildByName("content");
                conditionItem.active = false;
            }

            rewardBarother.getChildByName("des_shcedule").getComponent(cc.Label).string = rewardItem.state == 0 ? "已完成" : `进度${curSchdule}/${conditional.length}`
            glGame.panel.showEffectNode(this, rewardBarother.getChildByName("content"), 0.02, true);
        }
    },
    //桌面数据的显示
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    //生成表格
    initform(data) {
        let formView = cc.instantiate(this.formView);
        formView.parent = this.detailView1;
        formView.active = true;
        formView.height = 100 + (data.length - 1) * 50
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                let wordItem = cc.instantiate(this.wordItem);
                wordItem.parent = formView;
                wordItem.getComponent(cc.RichText).string = data[i][j].replace("<br>", ",");
                wordItem.active = true;
            }
        }

        let total = 0;
        let lengthBest = data[0].length;
        for (let i = lengthBest; i >= 1; i--) {
            total += formView.children[formView.childrenCount - i].width
        }
        let distance = (formView.width - total) / (data[0].length + 1);
        total = 0;
        let distanceArr = [];
        for (let i = lengthBest; i >= 1; i--) {
            total += formView.children[formView.childrenCount - i].width + distance
            distanceArr.push(total);
        }
        let Count = 1;
        let Posy = -50
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                formView.children[Count].x = j == 0 ? distance : distance + distanceArr[j - 1];
                formView.children[Count].y = Posy
                if (j == 1) {
                    formView.children[Count].color = cc.color(246, 142, 30)
                    formView.children[Count].getComponent(cc.RichText).string = formView.children[Count].getComponent(cc.RichText).string.replace("<br>", ",");
                }

                if (j != 0) {
                    let lineItem = cc.instantiate(this.lineItem);
                    lineItem.parent = formView.getChildByName("bg");
                    lineItem.y = -(formView.height / 2);
                    lineItem.x = formView.children[Count].x - distance / 2;
                    lineItem.height = formView.height - 20
                    lineItem.active = true;
                    lineItem.zIndex = 100 + j;
                }
                if (i % 2 == 0) {
                    let barItem = cc.instantiate(this.barItem);
                    barItem.parent = formView.getChildByName("bg");
                    barItem.active = true;
                    barItem.y = Posy;
                }
                Count++
            }
            Posy -= 50;
        }

        formView.active = false
    },
    updateDetailView2(data) {
        this.node_detailView1.active = false;
        this.detailView2.active = true;
        let content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        content.destroyAllChildren();
        content.removeAllChildren();
        let lab_time = this.detailView2.getChildByName("lab_time");
        if (data.titledetail.length && data.titledetail[0].title == "活动时间") {
            lab_time.active = true;
            lab_time.getComponent(cc.Label).string = data.titledetail[0].content;
        } else {
            lab_time.active = false;
        }

        if (data.activitypic && data.activitypic != "") {
            glGame.panel.showRemoteImage(this.detailView2, data.activitypic);
        }
        this.updateRewardBar(data, this.rewardBar2, content, 2)
        console.log("这是当前的数据", data)
    },
    //请求详情内容
    reqActivitydetail(id, type, index = 0) {
        if (this.cacheData[this.nowId][index].content) {
            this.nowIndex = index;
            if (this.cacheData[this.nowId][index].content.layout == 1) {
                this.updateDetailView1(this.cacheData[this.nowId][index].content)
            } else {
                this.updateDetailView2(this.cacheData[this.nowId][index].content)
            }
            this.updateCurSecond();
            console.log("这是详情的内容", this.cacheData[this.nowId][index].content)
            return;
        }
        glGame.gameNet.send_msg("http.reqDiscountsInfo", { id: id, type: type, color: "#F4C404" }, (route, msg) => {
            this.nowIndex = index;
            this.cacheData[this.nowId][index].content = msg;
            if (this.cacheData[this.nowId][index].content.layout == 1) {
                this.updateDetailView1(this.cacheData[this.nowId][index].content)
            } else {
                this.updateDetailView2(this.cacheData[this.nowId][index].content)
            }
            this.updateCurSecond();
            console.log("这是详情的内容", this.cacheData[this.nowId][index].content)
        })
    },

    //强制刷新红点
    forceRefreshRedPoint() {
        glGame.user.ReqRedDot();

        //强制刷新二级标题红点
        let id = this.nowId;
        glGame.gameNet.send_msg("http.reqDiscountsList", { category_id: id }, (route, msg) => {
            this.cacheData[id] = msg;

            let data = this.cacheData[id];
            for (let i = 0; i < data.length; i++) {
                let secondItem = this.secondView.children[i];
                secondItem.getChildByName("redmark").active = data[i].received_status == 1;
                secondItem.getChildByName("checkmark").active = i == this.nowIndex;
            }
            this.nowId = id;
            this.updateSecondTitle(this.cacheData[id]);
            if (this.cacheData[id].length != 0) {
                this.reqActivitydetail(this.cacheData[id][0].id, this.cacheData[id][0].type);
            } else {
                let content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
                content.destroyAllChildren();
                content.removeAllChildren();
                this.detailView1.destroyAllChildren();
                this.detailView1.removeAllChildren();
            }
        })
    },

    //请求当前的一级大标题
    reqFirstTitle() {
        glGame.gameNet.send_msg("http.reqDiscountsType", {}, (route, msg) => {
            this.firstTitleData = msg;
            this.updateFirstTitle();
            if (this.firstTitleData.length != 0) {
                this.reqSecondTitle(this.firstTitleData[0].id);
            } else {
                this.btn_allreward.node.active = false;
                if (this.notices && this.notices.length != 0) {
                    this.onClick("notice", this.firstView.getChildByName("notice"));
                }
            }
            this.initReddot();
        })
    },
    initReddot() {
        let redDotData = glGame.user.get("redDotData").discountReq;
        for (let i = 0; i < this.firstView.childrenCount; i++) {
            this.firstView.children[i].children[0].getChildByName("redmark").active = false;
            this.firstView.children[i].children[1].getChildByName("redmark").active = false;
        }
        for (let key in redDotData) {
            for (let i = 0; i < this.firstView.childrenCount; i++) {
                if (redDotData[key].category_id == this.firstView.children[i].children[0].name) {
                    this.firstView.children[i].children[0].getChildByName("redmark").active = true;
                    this.firstView.children[i].children[1].getChildByName("redmark").active = true;
                }
            }
        }
    },
    //请求当前的二级标题
    reqSecondTitle(id) {
        console.log("这是当前传入的id", id)
        for (let key in this.cacheData) {
            if (key == id) {
                this.nowId = id;
                this.updateSecondTitle(this.cacheData[key]);
                if (this.cacheData[id].length != 0) {
                    this.reqActivitydetail(this.cacheData[id][0].id, this.cacheData[id][0].type);
                } else {
                    let content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
                    content.destroyAllChildren();
                    content.removeAllChildren();
                    this.detailView1.destroyAllChildren();
                    this.detailView1.removeAllChildren();
                }
                return
            }
        }

        glGame.gameNet.send_msg("http.reqDiscountsList", { category_id: id }, (route, msg) => {
            this.cacheData[id] = msg;
            this.nowId = id;
            this.updateSecondTitle(this.cacheData[id]);
            if (this.cacheData[id].length != 0) {
                this.reqActivitydetail(this.cacheData[id][0].id, this.cacheData[id][0].type);
            } else {
                let content = this.detailView2.getChildByName("scrollView").getChildByName("view").getChildByName("content");
                content.destroyAllChildren();
                content.removeAllChildren();
                this.detailView1.destroyAllChildren();
                this.detailView1.removeAllChildren();
            }
        })
    },

    //更新一级标题
    updateFirstTitle() {
        let interval = 15, itemHeight = 0;
        let firstViewNode = this.node.getChildByName("firstView");
        let view = firstViewNode.getChildByName("view");
        
        for (let i = 0; i < this.firstTitleData.length; i++) {
            let firstItem = cc.instantiate(this.firstItem);
            firstItem.parent = this.firstView;
            firstItem.getChildByName("Background").getChildByName("title").getComponent(cc.Label).string = this.firstTitleData[i].title;
            firstItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = this.firstTitleData[i].title;
            firstItem.getChildByName("Background").name = `${this.firstTitleData[i].id}`
            itemHeight = firstItem.height;
            firstItem.active = true;
        }
        if (this.notices.length != 0) {
            let firstItem = cc.instantiate(this.firstItem);
            firstItem.parent = this.firstView;
            firstItem.getChildByName("Background").getChildByName("title").getComponent(cc.Label).string = "公告";
            firstItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = "公告";
            firstItem.name = `notice`
            itemHeight = firstItem.height;
            firstItem.active = true;
        }

        if (this.firstView.childrenCount == 0) {
            return;
        }

        this.firstView.height = this.firstView.childrenCount * (itemHeight + this.firstView.getComponent(cc.Layout).spacingY) + 10;

        if(this.firstView.height > view.height) {
            firstViewNode.getChildByName("downPage").active = true;
        }
    },

    //更新二级标题
    updateSecondTitle(data) {
        this.secondView.destroyAllChildren();
        this.secondView.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let secondItem = cc.instantiate(this.secondItem);
            secondItem.parent = this.secondView;
            secondItem.getChildByName("title").getComponent(cc.Label).string = data[i].discount_activity_title;
            secondItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = data[i].discount_activity_title;
            secondItem.getChildByName("tag").getComponent(cc.Sprite).spriteFrame = this.activityArr[data[i].tag]
            secondItem.getChildByName("redmark").active = data[i].received_status == 1;
            secondItem.children[0].name = `${i}`;
            secondItem.active = true;
            secondItem.getChildByName("checkmark").active = i == 0;
        }
    },
    //点击按钮变化toggle有bug所以改用button
    updateClick(node) {
        node.getChildByName("checkmark").active = true;
        for (let i = 0; i < this.secondView.childrenCount; i++) {
            if (this.secondView.children[i].children[0].name != node.children[0].name) {
                this.secondView.children[i].getChildByName("checkmark").active = false;
            }
        }
    },
    //一级标题切换
    switchFirst(name, node) {
        this.btn_allreward.node.active = true;
        this.unscheduleAllCallbacks();
        this.reqSecondTitle(node.children[0].name)
    },
    //滚动事件
    onScrollEvent(scroll, event) {
        let view = this.firstView.parent;
        let content = this.firstView;
        let minY = 0;
        let maxY = content.height - view.height;

        if(content.y <= minY) {
            this.upPage.active = false;
        } else if(content.y >= maxY) {
            this.downPage.active = false;
        } else {
            this.downPage.active = true;
            this.upPage.active = true;
        }
    },
    // 上一页
    onUpPage() {
        let view = this.firstView.parent;
        let content = this.firstView;
        let item = this.firstItem;
        let layout = content.getComponent(cc.Layout);
        let minY = 0;
        let maxY = content.height - view.height;

        if(content.y <= minY) {
            return;
        }

        let cellHeight = item.height + layout.spacingY;
        let offsetCount = (content.y - layout.paddingTop) / cellHeight;
        if(offsetCount - Math.floor(offsetCount) > 0.01) {
            offsetCount = Math.floor(offsetCount) - 1;
        } else {
            offsetCount = Math.floor(offsetCount) - 2;
        }

        let targetY = layout.paddingTop + offsetCount * cellHeight;
        if(targetY - minY < item.height) {
            targetY = minY-1;
            this.upPage.active = false;
        }
        
        this.downPage.active = true;
        targetY = Math.max(targetY, minY);

        content.stopAllActions();
        content.runAction(cc.moveTo(0.2, cc.v2(0, targetY)));

    },
    // 下一页
    onDownPage() {
        let view = this.firstView.parent;
        let content = this.firstView;
        let item = this.firstItem;
        let layout = content.getComponent(cc.Layout);
        let maxY = content.height - view.height;

        if(content.y >= maxY) {
            return;
        }

        let cellHeight = item.height + layout.spacingY;
        let offsetCount = (content.y + view.height - layout.paddingTop) / cellHeight;
        offsetCount = Math.max(offsetCount, 0);

        if(offsetCount - Math.floor(offsetCount) < 0.4) {
            offsetCount = Math.floor(offsetCount) + 2;
        } else {
            offsetCount = Math.ceil(offsetCount) + 1;
        }

        let targetY = layout.paddingTop + offsetCount * cellHeight - view.height;
        if(maxY - targetY < item.height) {
            targetY = maxY + 1;
            this.downPage.active = false;
        }
        
        this.upPage.active = true;
        targetY = Math.min(targetY, maxY);

        content.stopAllActions();
        content.runAction(cc.moveTo(0.2, cc.v2(0, targetY)));
    },

    noticeShow(node) {
        if (this.notices) {
            this.updateNotice(this.notices)
        } else {
            glGame.gameNet.send_msg("http.reqNotice", {}, (route, msg) => {
                this.notices = msg.notices;
                this.updateNotice(this.notices)
            })
        }
        this.nowId = 6422;
        this.btn_allreward.node.active = false;
    },
    updateNotice(data) {
        this.secondView.destroyAllChildren();
        this.secondView.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let secondItem = cc.instantiate(this.secondItem);
            secondItem.parent = this.secondView;
            secondItem.getChildByName("title").getComponent(cc.Label).string = data[i].title;
            secondItem.getChildByName("checkmark").getChildByName("title").getComponent(cc.Label).string = data[i].title;
            secondItem.getChildByName("tag").active = false;
            secondItem.children[0].name = `${i}`;
            secondItem.active = true;
            secondItem.getChildByName("checkmark").active = i == 0;
        }
        this.node_detailView1.active = true;
        this.detailView2.active = false;
        this.detailView1.destroyAllChildren();
        this.detailView1.removeAllChildren();
        this.node_detailView1.getComponent(cc.ScrollView).stopAutoScroll();
        if (this.notices.length == 0) return

        // 分帧显示公告
        this.showTextDelay(this.notices[0].content, this.LabelItem);
    },

    //获取索引
    getFirstIndex(node) {
        for (let i = 0; i < this.firstView.childrenCount; i++) {
            if (this.firstView.children[i].children[0].name == node.children[0].name) {
                return i;
            }
        }
    },
    //二级级标题切换
    switchSecond(name, node) {
        if (node.getChildByName("checkmark").active) return
        this.updateClick(node);
        if (this.nowId == 6422) {
            this.node_detailView1.active = true;
            this.detailView2.active = false;
            this.detailView1.destroyAllChildren();
            this.detailView1.removeAllChildren();
            this.node_detailView1.getComponent(cc.ScrollView).stopAutoScroll();

            // 分帧显示公告
            this.showTextDelay(this.notices[node.children[0].name].content, this.LabelItem);
            return
        }
        let index = this.getSecondIndex(node);
        this.reqActivitydetail(this.cacheData[this.nowId][index].id, this.cacheData[this.nowId][index].type, index);
    },

    //获取索引
    getSecondIndex(node) {
        for (let i = 0; i < this.secondView.childrenCount; i++) {
            if (this.secondView.children[i].children[0].name == node.children[0].name) {
                return i;
            }
        }
    },
    //去完成
    goGetCoin() {
        let type = this.cacheData[this.nowId][this.nowIndex].type;
        console.log("这是当前的类型", type)
        if (type == 2 || type == 3 || type == 6) {
            glGame.panel.showShop();
        } else if (type == 7) {
            glGame.user.isTourist() ? glGame.panel.showRegistration(true) : glGame.panel.showPanelByName("userinfo");
        } else if (type == 8) {
            glGame.user.isTourist() ? glGame.panel.showRegistration(true) : glGame.panel.showPanelByName("popularize");
            return;
        }
        this.remove()
        this.onClick("close")
    },
    //领取奖励
    reward(node) {
        let type = this.cacheData[this.nowId][this.nowIndex].type;
        let id = this.cacheData[this.nowId][this.nowIndex].id;
        let gradeid = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.id : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].id;
        let rewardCoin = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.reward.coin : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].reward.coin;
        let rewarddimand = node.parent.name == "registerbonus" ? this.cacheData[this.nowId][this.nowIndex].content.rewardItem.reward.diamond : this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].reward.diamond;
        glGame.gameNet.send_msg("http.ReqDiscountsReceive", { type: type, id: id, grade: gradeid }, (route, msg) => {
            let arr = [];
            if (rewardCoin) arr.push({ type: glGame.awardtype.COIN, value: this.getFloat(rewardCoin) });
            if (glGame.user.get("roomSwitch") && rewarddimand) arr.push({ type: glGame.awardtype.DIAMOND, value: this.getFloat(rewarddimand) });
            if (msg.data.type == 1) {
                glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_TIPS, arr);
                if (node.parent.name == "registerbonus") {
                    this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state = 1;
                } else {
                    this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].state = 1;
                }
                node.parent.getChildByName("Receiveed").active = true;
                node.parent.getChildByName("des_shcedule").active = false;
                if (node.parent.getChildByName("ReceiveType")) node.parent.getChildByName("ReceiveType").active = false;
                node.active = false
            } else if (msg.data.type == 2) {
                glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.REVIEW_WAIT_TIPS, arr);
                if (node.parent.name == "registerbonus") {
                    this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state = 4;
                } else {
                    this.cacheData[this.nowId][this.nowIndex].content.rewardItem[node.parent.name].state = 4;
                }
                node.parent.getChildByName("auditing").active = true;
                node.parent.getChildByName("des_shcedule").active = false;
                if (node.parent.getChildByName("ReceiveType")) node.parent.getChildByName("ReceiveType").active = false;
                node.active = false
            }
            this.updateCurSecond();
            this.getAllrewardState();
        })

    },

    //刷新当前小类的红点
    updateCurSecond() {
        if (!this.cacheData[this.nowId][this.nowIndex].content.rewardItem) return;
        if (!this.cacheData[this.nowId][this.nowIndex].content.rewardItem.length) {
            this.secondView.children[this.nowIndex].getChildByName("redmark").active = this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state == 0;
            this.cacheData[this.nowId][this.nowIndex].received_status = this.cacheData[this.nowId][this.nowIndex].content.rewardItem.state == 0 ? 1 : 0
        } else {
            let data = this.cacheData[this.nowId][this.nowIndex].content.rewardItem;
            let draw = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].state == 0) {
                    draw = true;
                    break;
                }
            }
            console.log("这是刷新当前红点信息的消息", draw)
            if (draw) {
                this.secondView.children[this.nowIndex].getChildByName("redmark").active = true;
                this.cacheData[this.nowId][this.nowIndex].received_status = 1
            } else {
                this.secondView.children[this.nowIndex].getChildByName("redmark").active = false;
                this.cacheData[this.nowId][this.nowIndex].received_status = 0
            }
        }
        this.updateFirstRed();
    },
    //刷新一级菜单红点
    updateFirstRed() {
        let draw = false;
        for (let i = 0; i < this.cacheData[this.nowId].length; i++) {
            if (this.cacheData[this.nowId][i].received_status == 1) {
                draw = true;
                break;
            }
        }
        let index = this.getIndexById(this.nowId);
        console.log("这是刷新当前红点信息的消息111", this.cacheData, draw)
        this.firstView.children[index].children[0].getChildByName("redmark").active = draw;
        this.firstView.children[index].children[1].getChildByName("redmark").active = draw;
    },
    getIndexById(id) {
        for (let i = 0; i < this.firstView.childrenCount; i++) {
            if (this.firstView.children[i].children[0].name == id) {
                return i;
            }
        }
    },
    //一键领取全部
    allreward() {
        glGame.gameNet.send_msg("http.ReqDiscountsReceiveAll", {}, (route, msg) => {
            this.clearDetailData();
            this.reqActivitydetail(this.cacheData[this.nowId][this.nowIndex].id, this.cacheData[this.nowId][this.nowIndex].type, this.nowIndex);
            let arr = [];
            if (msg.data.coin) arr.push({ type: glGame.awardtype.COIN, value: this.getFloat(msg.data.coin) });
            if (glGame.user.get("roomSwitch") && msg.data.diamond) arr.push({ type: glGame.awardtype.DIAMOND, value: this.getFloat(msg.data.diamond) });
            if (msg.data.coin == 0 && msg.data.reviewNum != 0) {
                glGame.panel.showTip(glGame.tips.ANNOUNCE.REVIEW_TIPS.format(msg.data.reviewNum));
            } else if (msg.data.reviewNum == 0) {
                glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_TIPS, arr);
            } else if (msg.data.coin != 0 && msg.data.reviewNum != 0) {
                glGame.panel.showAwardBox(glGame.tips.ANNOUNCE.AWARD_REVIEW_TIPS.format(msg.data.reviewNum), arr);
            }

            console.log("这是全部领取的消息", msg)
            for (let i = 0; i < this.firstView.childrenCount; i++) {
                this.firstView.children[i].children[0].getChildByName("redmark").active = false;
                this.firstView.children[i].children[1].getChildByName("redmark").active = false;
            }
            for (let i = 0; i < this.secondView.childrenCount; i++) {
                this.secondView.children[i].getChildByName("redmark").active = false;
            }

            // 强制刷新红点
            this.forceRefreshRedPoint();

        })
    },
    //清除刷新之后的缓存数据
    clearDetailData() {
        for (let i in this.cacheData) {
            for (let j = 0; j < this.cacheData[i].length; j++) {
                if (this.cacheData[i][j].content) {
                    delete this.cacheData[i][j].content;
                }
                this.cacheData[i][j].received_status = 0;
            }
        }
        console.log("这是当前的缓存数据", this.cacheData)
        //置灰一键领取
        this.btn_allreward.interactable = false
    },
    //这是活动详情
    activityDetail() {
        let detailwindow = glGame.panel.showPanel(this.detailwindow),
            script = detailwindow.getComponent("detailwindow");
        console.log("这是当前的数据", this.cacheData[this.nowId][this.nowIndex])
        let titledetail = this.cacheData[this.nowId][this.nowIndex].content.titledetail
        script.updateDetailView1(titledetail);
    },

    // 文本处理相关
    //////////////////////////////////////////////////
    showTextDelay(content, LabelItem) {
        LabelItem.active = true;
        let lbCom = LabelItem.getComponent(cc.Label);
        let assembler = lbCom._assembler;
        let assemblerData = assembler._getAssemblerData();
        let wrapText = this._calculateLabelFont(content, assemblerData.context, this._getFontDesc(lbCom), LabelItem.width);

        let index = 0;
        this.unscheduleAllCallbacks();
        this.schedule(() => {
            let txt = cc.instantiate(this.LabelItem);
            // txt.opacity = 0;
            // txt.runAction(cc.fadeIn(0.1));
            txt.getComponent(cc.Label).string = wrapText[index++];
            txt.parent = this.detailView1;
            txt.active = true;
        }, 0.01, wrapText.length - 1);
    },

    _getFontFamily(comp) {
        if (!comp.useSystemFont) {
            if (comp.font) {
                if (comp.font._nativeAsset) return comp.font._nativeAsset;
                cc.loader.load(comp.font.nativeUrl, (err, asset) => {
                    comp.font._nativeAsset = asset;
                    comp.setVertsDirty();
                });
                return 'Arial';
            }

            return 'Arial';
        }
        else {
            return comp.fontFamily || 'Arial';
        }
    },

    _getFontDesc(lb) {
        let fontDesc = lb.fontSize.toString() + 'px ';
        fontDesc += this._getFontFamily(lb);
        if (lb.enableBold) {
            fontDesc = "bold " + fontDesc;
        }
        if (lb.enableItalic) {
            fontDesc = "italic " + fontDesc;
        }
        return fontDesc;
    },

    _measureText(ctx, fontDesc) {
        return function (string) {
            return cc.textUtils.safeMeasureText(ctx, string, fontDesc);
        };
    },

    _calculateWrapText(context, fontDesc, paragraphedStrings, nodeWidth) {
        let _splitedStrings = [];
        let canvasWidthNoMargin = nodeWidth;
        for (let i = 0; i < paragraphedStrings.length; ++i) {
            let allWidth = cc.textUtils.safeMeasureText(context, paragraphedStrings[i], fontDesc);
            let textFragment = cc.textUtils.fragmentText(paragraphedStrings[i],
                allWidth,
                canvasWidthNoMargin,
                this._measureText(context, fontDesc));
            _splitedStrings = _splitedStrings.concat(textFragment);
        }

        return _splitedStrings;
    },

    _calculateLabelFont(txt, context, fontDesc, nodeWidth) {
        let paragraphedStrings = txt.split('\n');
        context.font = fontDesc;

        return this._calculateWrapText(context, fontDesc, paragraphedStrings, nodeWidth);
    },
    ////////////////////////////////////////////////////

    close() {
        this.remove();
    },
    OnDestroy() {
        glGame.user.ReqRedDot();
        glGame.user.reqGetCoin();
        glGame.user.reqGetDiamond();
        glGame.emitter.off("ReqRedDot", this);
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    }
    // update (dt) {},
});


glGame.baseclass.extend({

    properties: {
        leftbtns: cc.Node,
        fnt_needScore: [cc.Font],
        spin_node: cc.Sprite,
        img_spin: [cc.SpriteFrame],
        start_node: cc.Node,
        img_start: [cc.SpriteFrame],
        startbg_node: cc.Sprite,
        img_startbg: [cc.SpriteFrame],
        outside_node: cc.Sprite,
        img_outside: [cc.SpriteFrame],
        turnTable: cc.Node,
        img_turnTable: [cc.SpriteFrame],
        selectPanel: cc.Node,
        fullService: cc.Node,
        fullServiceItem: cc.Node,
        personRecord: cc.Node,
        nopersonRecord: cc.Node,
        recordItem: cc.Node,
        lab_needScore: cc.Label,
        lab_myScore: cc.Label,
        lab_getRule: cc.Label,
        allGift: cc.Node,//转盘上所有图标
        turnFlash: cc.Node,
        sp_turnFlash: [sp.SkeletonData],
        maskButton: cc.Node, // 屏蔽按钮
        drawAudio: {
            type: cc.AudioClip,
            default: null
        },
        point_node: cc.Sprite,
        img_point: [cc.SpriteFrame]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.registerEvent();
        //this.reqData();
        this.in_type = 0;
        this.angle = 0;
        this.startTurnTable = true;//转盘转动过程中限制点击
        this.time = null //全服大奖记录刷新
        this.switchPanel("fullService");
        this.btnStart = this.start_node.children[0];
        this.playBtnAni();
    },
    registerEvent() {
        glGame.emitter.on("updateDialPrizeList", this.updateDialPrizeList, this);
        glGame.emitter.on("updateTopPrize", this.updateTopPrize, this);
        glGame.emitter.on("getDialResult", this.getDialResult, this);
        glGame.emitter.on("updateMyRecord", this.updateMyRecord, this);
        glGame.emitter.on("updateDialScore", this.updateDialScore, this);
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.reqData, this);
        glGame.emitter.on("closeLuckDrawMaskButton", this.closeLuckDrawMaskButton, this);
    },

    unregisterEvent() {
        glGame.emitter.off("updateDialPrizeList", this);
        glGame.emitter.off("updateTopPrize", this);
        glGame.emitter.off("getDialResult", this);
        glGame.emitter.off("updateMyRecord", this);
        glGame.emitter.off("updateDialScore", this);
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
        glGame.emitter.off("closeLuckDrawMaskButton", this);
    },
    //检查当前红点
    checkRedDot(){
        if ((this.dialPrizeList[0].consume_integral).div(100) <= Number(this.lab_myScore.string)) {
            glGame.user.redDotData.dialRed = 1;
        }else{
            glGame.user.redDotData.dialRed = 2;
        }
        glGame.emitter.emit("ReqRedDot");
    },
    closeLuckDrawMaskButton() {
        this.maskButton.active = false;
        this.startTurnTable = true;
    },
    playBtnAni(){
        this.btnStart.stopAllActions();
        this.btnStart.runAction(cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.35,1.1,1.1),
                cc.scaleTo(0.35,1,1),
            )
        ))
    },
    //界面我的积分等数据
    updateDialPrizeList() {
        this.dialPrizeList = glGame.user.dialPrizeList;
        this.lab_needScore.string = `(${this.getFloat(this.dialPrizeList[this.in_type].consume_integral)}积分)`;
        glGame.user.reqDialIntegral();
        this.updateAwardNum();
    },
    //全服大奖记录
    updateTopPrize() {
        this.dialTopPrize = glGame.user.dialTopPrize;
        if(this.dialTopPrize.length>0){
            this.time = this.dialTopPrize[this.dialTopPrize.length - 1].time
        }
        console.log("这是当前全服大奖记录",this.dialTopPrize)
        this.initTopPrize();
    },
    //刚开始界面的生成
    initTopPrize() {
        if (this.fullService.childrenCount != 0) {
            this.recordIndex = 0;
        } else {
            this.recordIndex = 10;
            let Count = this.dialTopPrize.length >= 10 ? 10 : this.dialTopPrize.length;
            for (let i = 0; i < Count; i++) {
                let fullServiceItem = cc.instantiate(this.fullServiceItem);
                fullServiceItem.parent = this.fullService;
                //fullServiceItem.active = true;
                let name = this.dialTopPrize[i].nickname, lab_type = this.dialTopPrize[i].dial_type, prize = this.getFloat(this.dialTopPrize[i].prize);
                fullServiceItem.getChildByName("notice").getComponent(cc.RichText).string =
                    `恭喜 <color=#0fe6ff>${name}</color>在 <color=#ab9afe>[${lab_type}]</c> 中获得奖励 <color=#f4c404>${prize}元</c>！`;
                fullServiceItem.getChildByName("bg").active = i % 2 != 0;
            }
            glGame.panel.showEffectNode(this, this.fullService, 0.01, true)
        }
        this.playScrollNotice();
    },
    playScrollNotice() {
        if(this.dialTopPrize.length == 0){
            this.scheduleOnce(()=>{
                glGame.user.reqDialTopPrizeLog(this.time);
            },5)
            return
        } 
        let time = Math.random() * 2 + 3;
        this.node.runAction(cc.sequence(
            cc.delayTime(time),
            cc.callFunc(() => {
                this.addItem();
                this.recordIndex++;
                if (this.recordIndex >= this.dialTopPrize.length) {
                    glGame.user.reqDialTopPrizeLog(this.time);
                } else {
                    this.playScrollNotice();
                }
            })
        ))
    },
    //刷新转盘上的数字
    updateAwardNum() {
        for (let i = 0; i < this.allGift.childrenCount; i++) {
            let award = this.getFloat(this.dialPrizeList[this.in_type].item[i].award);
            this.allGift.children[i].getChildByName("number").getComponent(cc.Label).string = award;
        }
    },
    //刷新记录
    addItem() {
        if (!this.dialTopPrize[this.recordIndex]) return
        if (this.fullService.childrenCount >= 10) this.fullService.children[this.fullService.childrenCount - 1].destroy();
        let fullServiceItem = cc.instantiate(this.fullServiceItem);
        fullServiceItem.parent = this.fullService;
        fullServiceItem.setSiblingIndex(0)
        fullServiceItem.active = true;
        let name = this.dialTopPrize[this.recordIndex].nickname,
            lab_type = this.dialTopPrize[this.recordIndex].dial_type,
            prize = this.getFloat(this.dialTopPrize[this.recordIndex].prize);
        fullServiceItem.getChildByName("notice").getComponent(cc.RichText).string =
            `恭喜 <color=#0fe6ff>${name}</color> 在 <color=#ab9afe>[${lab_type}]</c> 中获得奖励 <color=#f4c404>${prize}元</c>！`;
        fullServiceItem.getChildByName("bg").active = this.recordIndex % 2 != 0;
    },
    //更新个人记录
    updateMyRecord() {
        this.myDialRecord = glGame.user.myDialRecord;
        this.personRecord.destroyAllChildren();
        this.personRecord.removeAllChildren();
        this.nopersonRecord.active = this.myDialRecord.length == 0;
        for (let i = 0; i < this.myDialRecord.length; i++) {
            let recordItem = cc.instantiate(this.recordItem);
            recordItem.parent = this.personRecord;
            recordItem.getChildByName("time").getComponent(cc.Label).string = this.myDialRecord[i].create_time;
            recordItem.getChildByName("type").getComponent(cc.Label).string = this.myDialRecord[i].dial_type;
            recordItem.getChildByName("coin").getComponent(cc.Label).string = this.getFloat(this.myDialRecord[i].prize) + '元';
            recordItem.getChildByName("coin").color = glGame.plazaColor.gain;
            recordItem.getChildByName("bg").active = i % 2 != 0;
            //recordItem.active = true;
        }
        glGame.panel.showEffectNode(this, this.personRecord, 0.01, true)
    },
    //当前我的积分
    updateDialScore() {
        this.lab_myScore.string = this.getFloat(glGame.user.dialScore);
        this.checkRedDot();
    },
    //开奖结果
    getDialResult() {
        // //转盘四秒左右可以点击抽奖按钮
        // this.scheduleOnce(() => {
           
        // }, 4)

        this.myDialResult = glGame.user.myDialResult;
        this.lab_myScore.string = this.getFloat(this.myDialResult.treasure);
        this.setFlash(this.in_type);
        this.btnStart.getComponent(cc.Button).interactable = false;
        this.btnStart.stopAllActions();
        this.btnStart.children[0].setScale(0.9)
        this.btnStart.children[1].setScale(0.9);
        cc.audioEngine.setVolume(glGame.audio.getBGM(), 0.1);
        this.runTurnTable();
    },
    //请求获奖数据
    reqDial() {
        if (glGame.user.isTourist()) {
            glGame.panel.showRegisteredGift(true);
            return;
        }
        if ((this.dialPrizeList[this.in_type].consume_integral).div(100) > Number(this.lab_myScore.string)) {
            return glGame.panel.showErrorTip(glGame.tips.LUCKDRAW.SCORENOTENOUGH);
        }
        if (!this.startTurnTable) return
        this.startTurnTable = false;
        this.maskButton.active = !this.startTurnTable
        console.log('开启请求')
        let type = this.in_type + 1;
        glGame.user.reqDial(type);
    },
    //刚开始进入界面的数据
    reqData() {
        glGame.user.reqDialPrize();
        glGame.user.reqDialTopPrizeLog();
    },
    onClick(name, node) {
        switch (name) {
            case "silver": case "gold": case "diamonds":
                this.switchTable(name, node);
                break;
            case "btn_close": this.remove(); break;
            case "btn_start":
                this.reqDial(); 
                break;
            case "fullService": case "personRecord": case "getRule":
                this.switchPanel(name);
                break;
            default:
                console.error('luckDraw->onClick', name);
                break;
        }
    },
    //转换转盘颜色
    switchTable(name, node) {
        let selectType = { "silver": 0, "gold": 1, "diamonds": 2 };
        let flash = node.getChildByName("checkmark").getChildByName("flash").getComponent(sp.Skeleton);
        flash.node.active = true;
        flash.setAnimation(0, name == "gold" ? "huangjin" : "baiyin", false);
        flash.setCompleteListener((trackEntry, loopCount) => {
            flash.node.active = false;
        })
        this.in_type = selectType[name];

        //this.img_turnTable.spriteFrame = this.turnTableArr[this.in_type];
        //this.img_title.spriteFrame = this.titleArr[this.in_type];
        this.changeSkin(this.in_type);
        this.updateAwardNum();
    },

    //修改轮盘的皮肤
    changeSkin(index) {
        this.spin_node.spriteFrame = this.img_spin[index];
        //this.start_node.spriteFrame = this.img_start[index];
        this.startbg_node.spriteFrame = this.img_startbg[index];
        this.outside_node.spriteFrame = this.img_outside[index];
        this.turnTable.getComponent(cc.Sprite).spriteFrame = this.img_turnTable[index];
        this.point_node.spriteFrame = this.img_point[index];
        for (let i = 0; i < this.start_node.childrenCount; i++) {
            if (i == index) {
                this.start_node.children[i].active = true;
                this.start_node.children[i].getChildByName("needScore").getComponent(cc.Label).font = this.fnt_needScore[index];
                this.start_node.children[i].getChildByName("needScore").getComponent(cc.Label).string = `(${this.getFloat(this.dialPrizeList[this.in_type].consume_integral)}积分)`;
                this.btnStart = this.start_node.children[i];
                this.playBtnAni();
            } else {
                this.start_node.children[i].active = false;
            }
        }
    },

    //切换三个界面
    switchPanel(name) {
        for (let i = 0; i < this.leftbtns.childrenCount; i++) {
            let _children = this.leftbtns.children[i];
            let index = 0;
            if (_children.name == name) index = 1;
            _children.zIndex = index;
        }

        if (name == "personRecord" && !this.myDialRecord) {
            glGame.user.reqDialPersonal();
        } else if (name == "getRule" && !this.scoreBet && !this.dialRefreshTime) {
            this.dialRefreshTime = glGame.user.get("dialRefreshTime");
            this.scoreBet = glGame.user.get("scoreBet");
            if (glGame.user.get("dialRefreshType") == 2) {
                this.lab_getRule.string =
                    `1.积分每日${this.dialRefreshTime}进行更新，更新时，将未使用的积分清零。然后将前24小时内的有效投注转化为积分。\n\n2.积分转化比例：有效投注${this.getFloat(this.scoreBet)}金币=1积分。\n\n3.转盘档次越高，每次抽奖需消耗的积分越多，奖励也越高`
            } else {
                this.lab_getRule.string = `1.每日积分会实时结算刷新。\n\n2.积分转化比例：有效投注${this.getFloat(this.scoreBet)}金币=1积分。\n\n3.转盘档次越高，每次抽奖需消耗的积分越多，奖励也越高`
            }

        }
        for (let i = 0; i < this.selectPanel.childrenCount; i++) {
            if (this.selectPanel.children[i].name == name) {
                this.selectPanel.children[i].active = true;
            } else {
                this.selectPanel.children[i].active = false;
            }
        }
    },
    // //启动转盘
    runTurnTable() {
        let time = 5
        let index = this.getIndex();
        //let angle = null
        glGame.audio.playSoundEffect(this.drawAudio);
        //this.btnStartFlash.active = false;
        //this.turnTable.angle = this.angle;
        if (this.turnTable.angle == 0) {
            this.angle = 360 - (18 + index * 36) + 360 * 3;
        } else {
            let targetAngle = 360 - ((index + 1) * 36);
            this.angle = targetAngle - Math.abs(this.turnTable.angle % 360) + 18 + 360 * 3;
        }
        this.turnTable.stopAllActions();
        this.turnTable.runAction(cc.sequence(
            cc.rotateBy(time, this.angle).easing(this.easeExponentialOut()),
            cc.callFunc(() => {
                this.setFlash();
                console.log("这是当前角度", this.turnTable.angle, this.angle)
                glGame.user.reqDialPersonal();
                glGame.panel.showAwardBox(glGame.tips.LUCKDRAW.CONGRATULATE, [{ type: glGame.awardtype.COIN, value: this.getFloat(this.myDialResult.coin) }]);
                cc.audioEngine.setVolume(glGame.audio.getBGM(), glGame.audio.getBGMVolume());
                this.btnStart.getComponent(cc.Button).interactable = true;
                this.playBtnAni();
                this.btnStart.children[0].setScale(1)
                this.btnStart.children[1].setScale(1)
                this.startTurnTable = true;
                this.maskButton.active = !this.startTurnTable
                this.checkRedDot();
            })
        ))
        // this.angle = angle;
        // this.startAngle = this.turnTable.angle;
        // this.range = this.angle - this.startAngle;
        // this.delta = 0;
        // this.duration = 4;
        // this.abcstart = true
    },
    setFlash(index = null){
        for(let i=0;i<this.turnFlash.childrenCount;i++){
            if(i == index)this.turnFlash.children[i].active = true;
            else this.turnFlash.children[i].active = false;
        }
    },
    easeExponentialOut() {
        let _easeExponentialOutObj = {
            easing: function (dt) {
                return (-(Math.pow(2, -10 * dt)) + 1);
            },
            reverse: function () {
                return _easeExponentialInObj;
            }
        }
        return _easeExponentialOutObj;
    },
    //函数思想
    // update(dt) {
    //     if(!this.abcstart)return;
    //     this.delta += dt;
    //     let percent = this.delta / this.duration;
    //     percent = this.easing(percent);
    //     this.turnTable.angle = this.startAngle + (this.angle - this.startAngle) * percent;
    // },
    // //转换当前指数函数
    // easing(dt) {
    //     return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
    // },
    //获取索引
    getIndex() {
        let allItem = this.dialPrizeList[this.in_type].item;
        for (let i = 0; i < allItem.length; i++) {
            if (allItem[i].id == this.myDialResult.item_id) {
                return i;
            }
        }
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },

    OnDestroy() {
        this.unregisterEvent();
    },


});

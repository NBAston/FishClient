glGame.baseclass.extend({

    properties: {
        content: cc.Node,
        effectiveItem: cc.Node,
        Lab_condition: cc.RichText,
        effectivemember: cc.Label,
        achiveData: cc.Label,
    },

    onLoad() {
        this.ReqPlayerExtensionCountlessReward();
    },
    ReqPlayerExtensionCountlessReward() {
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessReward', {}, (route, msg) => {
            this.TaskData = msg;
            let str = this.TaskData.recharge == 0 ? `您的下级无条件成为团队有效成员` : `存款金额达到 <color=#f4c404>${this.getFloat(this.TaskData.recharge)}</color> 元，打码量达到 <color=#f4c404>${this.getFloat(this.TaskData.bet)}</color> 元`
            this.Lab_condition.string = str;
            this.effectivemember.string = this.TaskData.effective_number;
            this.achiveData.string = `以上奖励，只需要打码量达到${this.TaskData.audit}倍即可提现`
            this.setTable(msg.list)
            console.log("这是任务列表的消息", msg)
        })
    },
    ReqPlayerExtensionCountlessRewardApply(id) {

    },
    setTable(data) {

        for (let i = 0; i < data.length; i++) {
            let effectiveItem = cc.instantiate(this.effectiveItem);
            effectiveItem.parent = this.content;
            effectiveItem.active = false;
            let strTip = `直属下级有效成员达 <color=#f4c404>${data[i].number}</color> 人`
            effectiveItem.getChildByName("Lab_condition").getComponent(cc.RichText).string = strTip;
            let Count = 0;
            for (let j = i; j >= 0; j--) {
                Count += data[j].reward
            }
            let strReward = `额外奖励 <color=#f4c404>${this.getFloat(data[i].reward)}</color> 元(累积 <color=#f4c404>${this.getFloat(Count)}</color> 元)`
            effectiveItem.getChildByName("Lab_reward").getComponent(cc.RichText).string = strReward;
            effectiveItem.getChildByName("Havereceived").active = data[i].state == 0;
            if (data[i].state == 2) {
                effectiveItem.getChildByName("needpeople").active = true;
                effectiveItem.getChildByName("needpeople").getComponent(cc.Label).string = `差${data[i].number - this.TaskData.effective_number}人`
            }
            effectiveItem.getChildByName("btn_received").active = data[i].state == 1;
            effectiveItem.getChildByName("bg").active = i % 2 == 1;
            effectiveItem.name = `${i}`;
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true);
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_received": this.btn_receivedCB(node); break;
            default: break;
        }
    },

    btn_receivedCB(node) {
        let id = this.TaskData.list[node.parent.name].id
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRewardApply', { id: id }, (route, msg) => {
            node.parent.getChildByName("Havereceived").active = true;
            node.active = false;
            let strTitle = glGame.tips.POPULARIZE.GETMEMBERPRIZE;
            glGame.panel.showAwardBox(strTitle, [{ type: glGame.awardtype.COIN, value: this.getFloat(this.TaskData.list[node.parent.name].reward)}]);
            this.TaskData.list[node.parent.name].state = 3;
            this.isCloseRed();
            glGame.user.ReqRedDot();
            glGame.user.reqGetCoin();
        })
    },
    isCloseRed() {
        let data = this.TaskData.list;
        for (let i = 0; i < data.length; i++) {
            if(data[i].state == 1){
                return
            }
        }
        glGame.emitter.emit("activeRedclose");
    },
    initUI(data) {
        console.log("这是本条数据的显示", data)
    }
});

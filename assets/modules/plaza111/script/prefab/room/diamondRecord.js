glGame.baseclass.extend({
    properties: {
        norecord: cc.Node,
        content: cc.Node,
        item: cc.Node,
        labPage: cc.Label,
    },
    onLoad() {
        this.PageIndex = 1;
        this.pageCount = 1;
        this.recordList = {};
        this.registerEvent();
        this.reqDiamondTransactionRecord();
    },
    registerEvent() {
    },
    unRegisterEvent() {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "btn_lastPage": this.lastPage_cb(); break;
            case "btn_nextPage": this.nextPage_cb(); break;
            default: console.error("no find button name -> %s", name);
        }
    },

    lastPage_cb() {
        if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！")
        this.PageIndex--;
        this.reqDiamondTransactionRecord();
    },

    nextPage_cb() {
        if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！")
        this.PageIndex++;
        this.reqDiamondTransactionRecord();
    },

    reqDiamondTransactionRecord() {
        let msg = {};
        msg.page = this.PageIndex;
        msg.pageSize = 8;
        console.log(this.recordList, "this.recordList");
        if (this.recordList[this.PageIndex]) {
            this.initRecordUI(this.recordList[this.PageIndex]);
        } else {
            glGame.gameNet.send_msg('http.ReqDiamondTransactionRecord', msg, (route, data) => {
                let result = data.result;
                this.pageCount = result.totalPage;
                this.recordList ? null : this.recordList = {};
                this.recordList[this.PageIndex] = result.data;
                this.initRecordUI(result.data);
            })
        }

    },

    //渲染牌局记录
    initRecordUI(list) {
        this.content.removeAllChildren();
        // if (list.length == 0) {
        //     this.labPage.string = '第0/0页';
        //     return;
        // }
        let count = list.length;
        if (count == 0) {
            this.norecord.active = true;
            return;
        }
        this.hiadShowNode(count > 0);

        this.labPage.string = `第${this.PageIndex}/${this.pageCount}页`;
        for (let i = 0; i < list.length; i++) {
            let node = cc.instantiate(this.item);
            node.getChildByName("bg").active = i % 2 != 0;
            node.parent = this.content;
            node.active = true;

            let timeStamp = new Date(list[i].createTime * 1000);
            let strTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1)}/${timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate()}`
            strTime += `（${glGame.tips.WEEKNAME[timeStamp.getDay()]}）`
            strTime += `${timeStamp.getHours() >= 10 ?timeStamp.getHours(): "0" + timeStamp.getHours()}:`
            strTime += `${timeStamp.getMinutes() >= 10 ?timeStamp.getMinutes(): "0" + timeStamp.getMinutes()}:`
            strTime += `${timeStamp.getSeconds() >= 10 ?timeStamp.getSeconds(): "0" + timeStamp.getSeconds()}`
            node.getChildByName("time").getComponent(cc.Label).string = strTime;
            node.getChildByName("type").getComponent(cc.Label).string = list[i].typeDes;
            let diamondNum = 0;
            diamondNum += list[i].diamondIncome;
            diamondNum -= list[i].diamondExpenses;
            node.getChildByName("diamond").getComponent(cc.Label).string = this.getFixNumber(diamondNum);
            node.getChildByName("diamond").color = diamondNum > 0 ? cc.color(0x66, 0x90, 0xcc) : cc.color(0xf4, 0xc4, 0x04);
        }
    },
    getFixNumber(value) {
        let value1 = Number(value).div(10);
        value = Number(value).div(100);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else if (~~value1 === value1) {
            return value.toFixed(1);
        } else {
            return value.toFixed(2);
        }
    },
    hiadShowNode(isBool) {
        this.node.getChildByName("btn_lastPage").active = isBool;
        this.node.getChildByName("btn_nextPage").active = isBool;
        this.node.getChildByName("pageIndex").active = isBool;
        this.node.getChildByName("downtips").active = isBool;
    },
});

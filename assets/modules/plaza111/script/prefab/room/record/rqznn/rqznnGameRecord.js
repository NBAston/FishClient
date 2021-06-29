const ROUND_STRIP_NAME = "roundstrip";

glGame.baseclass.extend({
    properties: {
        //牌局
        gameData: cc.Node,
        UserData: cc.Node,
        gameContent: cc.Node,
        gameItem: cc.Node,
        labPage: cc.Label,
    },
    onLoad() {
        this.gameDetails = {};
        this.PageIndex = 1;
        this.pageCount = 1;
        this.pageMax = 8;
        this.playerMax = 5;
        this.gameAllData = null;
        this.registerEvent();
    },

    initData(data) {
        this.gameAllData = data;
        this.gameContent.removeAllChildren();
        this.initRoomData();
        this.reqRoomGameRoundList();
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
            case "btn_return": glGame.emitter.emit("openRoomList"); break;
            case "btn_lastPage": this.lastPage_cb(); break;
            case "btn_nextPage": this.nextPage_cb(); break;

            default:
                if (name.indexOf(ROUND_STRIP_NAME) > -1) return this.click_roundStrip(name);
                break
        }
    },

    lastPage_cb() {
        if (this.PageIndex == 1 || this.PageIndex == 0) return glGame.panel.showTip("已经是第一页了！")
        this.PageIndex--;
        this.reqRoomGameRoundList();
    },

    nextPage_cb() {
        if (this.PageIndex >= this.pageCount || this.PageIndex == 0) return glGame.panel.showTip("已经是最后一页了！")
        this.PageIndex++;
        this.reqRoomGameRoundList();
    },

    click_roundStrip(name) {
        let string = name.substring(ROUND_STRIP_NAME.length);
        let data = this.gameDetails[this.gameAllData.gameId][this.gameAllData.summaryId][this.PageIndex][Number(string)];
        glGame.emitter.emit("openRoomRound", data);
    },

    reqRoomGameRoundList() {
        let msg = {};
        msg.gameId = this.gameAllData.gameId;
        msg.summaryId = this.gameAllData.summaryId;
        msg.page = this.PageIndex;
        msg.pageSize = this.pageMax;
        if (this.gameDetails[msg.gameId] && this.gameDetails[msg.gameId][msg.summaryId] && this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex]) {
            this.initGameContent(this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex]);
        } else {
            glGame.gameNet.send_msg('http.ReqRoomGameRoundList', msg, (route, data) => {
                let result = data.result;
                this.pageCount = result.totalPage;
                this.gameDetails[msg.gameId] ? null : this.gameDetails[msg.gameId] = {};
                this.gameDetails[msg.gameId][msg.summaryId] ? null : this.gameDetails[msg.gameId][msg.summaryId] = {};
                result.data = this.sortUserData(result.data);
                this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex] = result.data;
                this.initGameTitle(result.data);
                this.initGameContent(this.gameDetails[msg.gameId][msg.summaryId][this.PageIndex]);
            })
        }
    },

    initRoomData() {
        let data = this.gameAllData;
        this.gameData.getChildByName("number").getComponent(cc.Label).string = data.summaryId;

        let timeStamp = new Date(data.createTime);
        let strTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1)}/${timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate()}`
        strTime += `（${glGame.tips.WEEKNAME[timeStamp.getDay()]}）`
        strTime += `${timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours()}:`
        strTime += `${timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes()}:`
        strTime += `${timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds()}`
        this.gameData.getChildByName("time").getComponent(cc.Label).string = strTime;
        this.gameData.getChildByName("game").getComponent(cc.Label).string = data.gameName;
        this.gameData.getChildByName("round").getComponent(cc.Label).string = data.totalRound;
        this.gameData.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.score);
        this.gameData.getChildByName("score").color = data.score > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
    },

    initGameTitle(list) {
        if (list.length == 0) return;
        // 便利出自己数据
        for (let index in list[0].detail) {
            let data = list[0].detail[index];
            if (!data) continue;
            if (Number(data.uid) == glGame.user.get("userID")) {
                this.UserData.getChildByName(`seat1`).active = true;
                this.UserData.getChildByName(`seat1`).getComponent(cc.Label).string = `［我］`;
                break;
            }
        }
        // 清理其他角色
        for (let i = 2; i < this.playerMax; i++) this.UserData.getChildByName(`seat${i}`).active = false;
        // 便利出其他角色
        let i = 2;
        for (let index in list[0].detail) {
            let data = list[0].detail[index];
            if (!data) continue;
            if (Number(data.uid) != glGame.user.get("userID")) {
                this.UserData.getChildByName(`seat${i}`).active = true;
                this.UserData.getChildByName(`seat${i}`).getComponent(cc.Label).string = `［${data.nickname}］`;
                i++;
            }
        }
    },

    initGameContent(list) {
        this.gameContent.removeAllChildren();
        if (list.length == 0) {
            this.labPage.string = '第0/0页';
            return;
        }
        this.labPage.string = `第${this.PageIndex}/${this.pageCount}页`;
        for (let i = list.length - 1; i >=0; i--) {
            if (!list[i].detail) continue;
            let node = cc.instantiate(this.gameItem);
            node.name = `${ROUND_STRIP_NAME}${i}`;
            node.getChildByName("bg").active = i % 2 != 0;
            node.parent = this.gameContent;
            node.active = true;

            node.getChildByName(`round`).getComponent(cc.Label).string = `第${(list.length - i) + ((this.PageIndex - 1) * this.pageMax)}局`;

            // 便利出自己数据
            for (let index in list[i].detail) {
                let data = list[i].detail[index];
                if (!data) continue;
                if (Number(data.uid) == glGame.user.get("userID")) {
                    node.getChildByName(`score1`).active = true;
                    node.getChildByName(`score1`).getComponent(cc.Label).string = this.getFixNumber(data.scoreOffset);
                    node.getChildByName("score1").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
                    break;
                }
            }
            // 便利出其他角色
            let count = 2;
            for (let index in list[i].detail) {
                let data = list[i].detail[index];
                if (!data) continue;
                if (Number(data.uid) != glGame.user.get("userID")) {
                    node.getChildByName(`score${count}`).active = true;
                    node.getChildByName(`score${count}`).getComponent(cc.Label).string = this.getFixNumber(data.scoreOffset);
                    node.getChildByName(`score${count}`).color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
                    count++;
                }
            }
        }
    },

    sortUserData(list) {
        for (let key in list) {
            if (!list[key].detail) continue;
            list[key].detail.sort((a, b) => { return a.uid - b.uid; });
        }
        return list;
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
});

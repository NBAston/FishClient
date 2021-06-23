glGame.baseclass.extend({
    properties: {
        gameGainFee: cc.EditBox,
        gameHiddenFee: cc.EditBox,
        gameProfit: cc.EditBox,
        userLoseMoney: cc.EditBox,
        userGainFee: cc.EditBox,
        userHiddenFee: cc.EditBox
    },

    onLoad() {
        this.node.zIndex = 1000;
        if (cc.director.getScene().name == "plaza") {
            this.node.getChildByName("userinfo").active = false;
            this.node.getChildByName("tip").active = true;
        }
    },

    init(data) {
        this.gameGainFee.placeholder = data.game_gain_fee;
        this.gameHiddenFee.placeholder = data.game_hidden_fee;
        this.gameProfit.placeholder = data.game_profit;
        this.userLoseMoney.placeholder = data.user_lose_money;
        this.userGainFee.placeholder = data.user_gain_fee;
        this.userHiddenFee.placeholder = data.user_hidden_fee;
    },

    onClick(name, node) {
        switch (name) {
            case "changeBtn": this.changeBtnCB(); break;
            case "close": this.click_close(); break;
        }
    },

    changeBtnCB() {
        let game_id = glGame.room.get("curEnterGameID"),
            rank_index = glGame.room.get("curEnterGameRank");
            if(cc.director.getScene().name == "laba"){
                game_id = 31;
                rank_index = 1
            }
        let msg = {
            game_id: game_id,
            rank: rank_index,
            game_gain_fee: parseFloat(this.gameGainFee.string || this.gameGainFee.placeholder),
            game_hidden_fee: parseFloat(this.gameHiddenFee.string || this.gameHiddenFee.placeholder),
            game_profit: parseFloat(this.gameProfit.string || this.gameProfit.placeholder),
            user_gain_fee: parseFloat(this.userGainFee.string || this.userGainFee.placeholder),
            user_hidden_fee: parseFloat(this.userHiddenFee.string || this.userHiddenFee.placeholder),
            user_lose_money: parseFloat(this.userLoseMoney.string || this.userLoseMoney.placeholder),
        };
        glGame.gameNet.send_msg("http.ReqEditGameProfit", msg);
    },

    click_close() {
        glGame.user.reqMyInfo();
        this.remove();
    }
});

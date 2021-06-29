
/**
 * 修改账号登陆密码面板
 */
glGame.baseclass.extend({
    properties: {
        //修改昵称
        edit_nickname: cc.EditBox,
    },
    onLoad () {
        this.registerEvent();
    },
    registerEvent () {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    unRegisterEvent () {
    },
    onClick (name, node) {
        switch (name) {
            case "btn_editNickCancel": this.click_close(); break;
            case "btn_editNickSure": this.editNickSure_cb(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_close () {
        this.remove();
    },
    // 昵称检查
    checkNickName(nameNum) {
        if (this.checkStrLength(nameNum, 2, 6)) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.LENTHLIMIT);
            return false
        }
        return true;
    },

    // emoji屏蔽昵称
    checkEmoji(nameNum){
        var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
        if (regStr.test(nameNum))return true;
        return false;
    },

    editNickSure_cb() {
        let nickname = this.edit_nickname.string;
        if(nickname.length == 0) {
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.EMPTYNICK);
            return;
        }
        if (this.checkEmoji(nickname)){
            glGame.panel.showErrorTip(glGame.tips.USER.EDITINFO.NICKNAMEERROR);
            return;
        }

        //if(this.checkNickName(nickname)){
            glGame.gameNet.send_msg('http.reqEditMyInfo', { nickname: nickname }, (route, data) => {
                if (data.result) {
                    glGame.panel.showTip(glGame.tips.USER.EDITINFO.NICKNAME);
                    glGame.user.nickname = nickname;
                    glGame.emitter.emit("updateUserData");
                } else {
                    glGame.panel.showTip(`${data}`);
                }
                this.remove();
            })
        //}
    },
    onEditChanged() {
        let nTextLength = 0;
        let nickName = this.edit_nickname.string;
        for(let i = 0; i < nickName.length; i++) {
            let charAt = nickName[i].charCodeAt();

            if (charAt >= 32 && charAt <= 122) {
                nTextLength++;
            } else {
                nTextLength += 2;
            }

            if(nTextLength > 12) {
                this.edit_nickname.string = nickName.substr(0, i);
                return;
            }
        }
    },
    //检查中文和英文混合的字符长度
    checkStrLength(str, min, max) {
        let mTextMaxlenght = 0;
        let arr = str.split("");
        for (let i = 0; i < arr.length; i++) {
            let charAt = arr[i].charCodeAt();
            //32-122包含了空格，大小写字母，数字和一些常用的符号，
            //如果在这个范围内则算一个字符，
            //如果不在这个范围比如是汉字的话就是两个字符
            if (charAt >= 32 && charAt <= 122) {
                mTextMaxlenght++;
            } else {
                mTextMaxlenght += 2;
            }
        }
        return mTextMaxlenght < min || mTextMaxlenght > max
    },
});
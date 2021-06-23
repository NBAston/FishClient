/**
 * 玩家个人信息界面
 */
glGame.baseclass.extend({
    properties: {
        monthitem: cc.Node,
        monthcontent: cc.Node,
        mothScrollView: cc.Node,
        dayitem: cc.Node,
        daycontent: cc.Node,
        dayScrollView: cc.Node,
    },
    onLoad() {
        this.birthMonth = 1;
        this.birthDay = 1;
        this.registerEvent();

        this.mothScrollView.on(cc.Node.EventType.TOUCH_END, this.mothtouchend, this)
        this.mothScrollView.on(cc.Node.EventType.TOUCH_CANCEL, this.mothtouchend, this)
        this.dayScrollView.on(cc.Node.EventType.TOUCH_END, this.daytouchend, this)
        this.dayScrollView.on(cc.Node.EventType.TOUCH_CANCEL, this.daytouchend, this)
        this.showBirthday();
    },


    onClick(name, node) {
        switch (name) {
            case "close": this.remove(); break;
            case "btn_birthday": this.birthday_cb(); break;
            case "birthday_mask": this.birthdaymask_cb(); break;
        }
    },

    birthdaymask_cb() {
        this.remove();
    },
    //=======生日
    showBirthday() {
        for (let i = 1; i < 13; i++) {
            let monthitem = cc.instantiate(this.monthitem);
            monthitem.parent = this.monthcontent;
            monthitem.active = true;
            monthitem.children[0].getComponent(cc.Label).string = i >= 10 ? `${i}月` : `0${i}月`;
        }

        for (let i = 1; i < 32; i++) {
            let dayitem = cc.instantiate(this.dayitem);
            dayitem.parent = this.daycontent;
            dayitem.active = true;
            dayitem.children[0].getComponent(cc.Label).string = i >= 10 ? `${i}日` : `0${i}日`;
        }
    },
    //月份滑动停止回调
    mothtouchend() {
        let top = this.monthcontent.getComponent(cc.Layout).paddingTop;
        let itemH = this.monthitem.height;
        let midPos = top + itemH / 2;                                                       //view中心点的位置
        let pos = this.mothScrollView.getComponent(cc.ScrollView).getContentPosition();     //当前content的位置
        let y = pos.y;

        if (((y - midPos) % itemH) < itemH / 2) {
            y = midPos + ((Math.floor((y - midPos) / itemH)) * itemH);
        } else {
            y = midPos + (Math.floor((y - midPos) / itemH) + 1) * itemH;
        }

        if ((Math.floor((y - top) / itemH) + 1) < 1) {
            this.birthMonth = 1;
        } else if ((Math.floor((y - top) / itemH) + 1) > 12) {
            this.birthMonth = 12;
        } else {
            this.birthMonth = Math.floor((y - top) / itemH) + 1;
        }

        this.mothScrollView.getComponent(cc.ScrollView).setContentPosition(cc.v2(0, y));
        this.initDayUI(this.birthMonth);
    },
    //渲染生日scrollView
    initDayUI(index) {
        let daycount;
        if (index == 1 || index == 3 || index == 5 || index == 7 || index == 8 || index == 10 || index == 12) {
            daycount = 31;
        } else if (index == 4 || index == 6 || index == 9 || index == 11) {
            daycount = 30;
        } else {
            daycount = 29
        }
        let childrenCount = this.daycontent.childrenCount;
        if (childrenCount > 29) {
            for (let i = 29; i < childrenCount;) {
                if (!this.daycontent.children[i]) break;
                this.daycontent.removeChild(this.daycontent.children[i]);
            }
        }
        for (let i = 29; i < daycount; i++) {
            let dayitem = cc.instantiate(this.dayitem);
            dayitem.parent = this.daycontent;
            dayitem.active = true;
            dayitem.children[0].getComponent(cc.Label).string = `${i + 1} 日`;
        }
        this.daytouchend();
    },
    //日滑动停止回调
    daytouchend() {
        let top = this.daycontent.getComponent(cc.Layout).paddingTop;
        let itemH = this.dayitem.height;
        let midPos = top + itemH / 2; 
        let pos = this.dayScrollView.getComponent(cc.ScrollView).getContentPosition();
        let y = pos.y;
        if ((y - midPos) < 0) {
            y = midPos + ((Math.floor((y - midPos) / itemH) + 1) * itemH);
        } else if (((y - midPos) % itemH) < itemH / 2) {
            y = midPos + ((Math.floor((y - midPos) / itemH)) * itemH);
        } else {
            y = midPos + (Math.floor((y - midPos) / itemH) + 1) * itemH;
        }

        if ((Math.floor((y - top) / itemH) + 1) < 1) {
            this.birthDay = 1;
        } else if ((Math.floor((y - top) / itemH) + 1) > this.daycontent.childrenCount) {
            this.birthDay = this.daycontent.childrenCount;
        } else {
            this.birthDay = Math.floor((y - top) / itemH) + 1;
        }
        this.dayScrollView.getComponent(cc.ScrollView).setContentPosition(cc.v2(0, y));
    },
    //点击生日确定
    birthday_cb() {
        if (this.birthMonth == 1 || this.birthMonth == 3 || this.birthMonth == 5 || this.birthMonth == 7
            || this.birthMonth == 8 || this.birthMonth == 10 || this.birthMonth == 12) {
            if (this.birthDay > 31) return glGame.panel.showErrorTip("日期格式错误！");
        }
        else if (this.birthMonth == 4 || this.birthMonth == 6 || this.birthMonth == 9 || this.birthMonth == 11) {
            if (this.birthDay > 30) return glGame.panel.showErrorTip("日期格式错误！");
        } else {
            if (this.birthDay > 29) return glGame.panel.showErrorTip("日期格式错误！");
        }
        let str = `${this.birthMonth}_${this.birthDay}`
        glGame.emitter.emit("editBirthDay", str);
        this.remove();
    },

    // 注册界面监听事件
    registerEvent() {
    },
    // 销毁界面监听事件
    unRegisterEvent() {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
});

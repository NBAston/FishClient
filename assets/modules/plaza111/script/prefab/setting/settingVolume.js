/**
 * 设置
 */

glGame.baseclass.extend({
    properties: {
        spBar: [cc.SpriteFrame],
    },

    onLoad() {
        this.initUI();
    },

    onClick(name, node) {
        switch (name) {
            case "musicswitch":
                this.onMusicToggle();
                break;
            case "effectswitch":
                this.onEffectToggle();
                break;
            case "btn_change":
                glGame.panel.showPanelByName("exitAcc");
                break;
            case "btn_login":
                glGame.panel.showRegister();
                break;
        }
    },

    onMusicProcess () {
        let process = this.musicSlider.getComponent(cc.Slider).progress;
        this.musicSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = process;
        glGame.audio.setBGMVolume(process);

        if(!this.musicToggle.isChecked) {
            this.setToggle(this.musicToggle, true);
            glGame.audio.openBGM();
            this.setSliderState(this.musicSlider, 0);
        }
    },

    onEffectProcess() {
        let process = this.effectSlider.getComponent(cc.Slider).progress;
        this.effectSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = process;
        glGame.audio.setSoundEffectVolume(process);

        if(!this.effectToggle.isChecked) {
           this.setToggle(this.effectToggle, true);
            glGame.audio.openSE();
            this.setSliderState(this.effectSlider, 0); 
        }
    },

    initUI() {

        this.bInit = false;

        // 如果是游客 隐藏切换账号按钮
        if(glGame.user.isTourist()) {
            this.node.getChildByName("btn_login").active = true;
        } else {
            this.node.getChildByName("btn_change").active = true;
        }

        // 玩家信息
        let userinfo = this.node.getChildByName("userinfo");

        // 设置头像
        let headImage = userinfo.getChildByName("img_head");
        glGame.panel.showHeadImage(headImage, glGame.user.get("headURL"));

        // 设置账号
        userinfo.getChildByName("account").getComponent(cc.Label).string = glGame.user.get("userName") || "";

        // 设置昵称
        userinfo.getChildByName("nickbg").getChildByName("nick").getComponent(cc.Label).string = glGame.user.get("nickname") || "";

        // vip等级
        let lab_userVip = userinfo.getChildByName("vip_bg").getChildByName("lab_userVip");
        lab_userVip.getComponent(cc.Label).string = glGame.user.get("vip_name");

        if(glGame.user.isTourist()) {
            userinfo.getChildByName("vip_bg").active = false;
            userinfo.getChildByName("nickbg").active = false;
            userinfo.getChildByName("account").getComponent(cc.Label).string = "未登录";
        }


        // 音量信息
        let volume = this.node.getChildByName("volume");

        this.musicToggle = volume.getChildByName("musicswitch").getComponent(cc.Toggle);
        this.effectToggle = volume.getChildByName("effectswitch").getComponent(cc.Toggle);
        this.musicSlider = volume.getChildByName("musicslider");
        this.effectSlider = volume.getChildByName("effectslider");

        let BGMSE = glGame.audio.get("BGMSE");
        this.setToggle(this.musicToggle, BGMSE["BGMPlayState"]);
        this.setToggle(this.effectToggle, BGMSE["SoundEffectPlayState"]);

        if(BGMSE["BGMPlayState"]) {
            this.setSliderState(this.musicSlider, 0);
        } else {
            this.setSliderState(this.musicSlider, 1);
        }

        if(BGMSE["SoundEffectPlayState"]) {
            this.setSliderState(this.effectSlider, 0);
        } else {
            this.setSliderState(this.effectSlider, 1);
        }

        this.musicSlider.getComponent(cc.Slider).progress = BGMSE["BGMVolume"];
        this.effectSlider.getComponent(cc.Slider).progress = BGMSE["SoundEffectVolume"];
        this.musicSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = BGMSE["BGMVolume"];
        this.effectSlider.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = BGMSE["SoundEffectVolume"];

        this.bInit = true;
    },

    OnClickToggle(event) {
        if(!this.bInit) {
            return;
        }

        let buttonName = event.node.name;
        let buttonNode = event.node;
        console.log(`点击了toggle -> ${buttonName}`);
        glGame.audio.playLoadSoundEffectByPath("select");
        this.onClick(buttonName, buttonNode);
    },

    onMusicToggle() {
        if(!this.bInit) {
            return;
        }

        let isChecked = this.musicToggle.isChecked;
        this.setToggle(this.musicToggle, isChecked);
        if (isChecked) glGame.audio.openBGM();
        else glGame.audio.closeBGM();

        if(isChecked) {
            this.setSliderState(this.musicSlider, 0);
        } else {
            this.setSliderState(this.musicSlider, 1);
        }
    },

    onEffectToggle() {
        if(!this.bInit) {
            return;
        }

        let isChecked = this.effectToggle.isChecked;
        this.setToggle(this.effectToggle, isChecked);
        if (isChecked) glGame.audio.openSE();
        else glGame.audio.closeSE();

        if(isChecked) {
            this.setSliderState(this.effectSlider, 0);
        } else {
            this.setSliderState(this.effectSlider, 1);
        }
    },

    setToggle(toggle, isOn) {
        toggle.isChecked = isOn;

        let iconChouma = toggle.node.getChildByName("Background").getChildByName("img_chouma");
        iconChouma.active = !isOn;
    },

    setSliderState(node, state) {
        let bar = node.getChildByName("progressBar").getChildByName("bar");
        bar.getComponent(cc.Sprite).spriteFrame = this.spBar[state];
    },

    // 注册界面监听事件
    registerEvent() {
        glGame.emitter.on(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this.showInfo, this);
    },

    // 销毁界面监听事件
    unRegisterEvent() {
        glGame.emitter.off(`${this.node.name}${MESSAGE.UI.ACTION_END}`, this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
});

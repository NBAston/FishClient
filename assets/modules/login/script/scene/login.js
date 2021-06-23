cc.Class({
    extends: cc.Component,

    properties: {
        login_frame: cc.Prefab,         //登入界面
        update_frame: cc.Prefab,        //热更界面
        update_bag: cc.Prefab,          //热更底包
        login_logo: cc.Prefab,          //添加logo
        click_action: cc.Prefab,
        btn_cleanupCache: cc.Node,      //修复按钮
        btn_serive: cc.Node,            //客服按钮
        btn_website: cc.Node,           //客服按钮
        btn_website: cc.Node,           //客服按钮
        login_switch: [cc.Node],        //登录页面区分
        videoMask: cc.Node,
        videoPlayer: cc.VideoPlayer,
        coinArrvalTip: cc.Prefab,
    },
    onLoad() {
        this.btn_cleanupCache.active = cc.sys.isNative;
        startGame();
        this.serviceUrl = cc.sys.localStorage.getItem('serviceUrl') || glGame.gamecfg.serviceUrl;
        glGame.emitter.on("userurldata", this.updateService, this);
        glGame.emitter.on(MESSAGE.UI.HIDE_CLEANUP, this.hideCleanupCache, this);
        glGame.emitter.on(MESSAGE.DOWNLOAD.BAG, this.updatebag, this);

        this.setLoginFrame();

        glGame.emitter.on(MESSAGE.DOWNLOAD.END, this.openLogin, this);

        if (!cc.director.getScene().getChildByName("click_action")) glGame.panel.showPanel(this.click_action).zIndex = 999999;

        let isAudioPlay = cc.sys.localStorage.getItem("isAudioPlay");
        console.log("是否播放视频 isAudioPlay ===>", isAudioPlay);

        if (isAudioPlay || cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.isBrowser) {
            this.videoPlayer.node.active = false;
            this.videoPlayerEnd();
        } else {
            this.videoPlayer.node.active = true;
        }
    },

    playCallFunc(videoplayer, eventType, customEventData) {
        if (!this.videoPlayer.node.active) return;
        switch (eventType) {
            case cc.VideoPlayer.EventType.PLAYING:
                // console.log("videoplayer ===> 表示视频正在播放中。");
                this.scheduleOnce(() => {
                    this.videoMask.opacity = 1;
                }, 0.1);
                break;
            case cc.VideoPlayer.EventType.PAUSED:
                // console.log("videoplayer ===> 表示视频暂停播放。");
                break;
            case cc.VideoPlayer.EventType.STOPPED:
                // console.log("videoplayer ===> 表示视频已经停止播放。");
                break;
            case cc.VideoPlayer.EventType.COMPLETED:
                // console.log("videoplayer ===> 表示视频播放完成。");
                this.videoPlayerEnd();
                break;
            case cc.VideoPlayer.EventType.CLICKED:
                // console.log("videoplayer ===> 表示视频被用户点击了。（只支持 Web 平台）");
                break;
            case cc.VideoPlayer.EventType.READY_TO_PLAY:
                // console.log("videoplayer ===> 表示视频准备好了，可以开始播放了。");
                break;
            case cc.VideoPlayer.EventType.META_LOADED:
                // console.log("videoplayer ===> 表示视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长。");
                if (cc.sys.isNative) {
                    this.videoPlayer.currentTime = 0;
                    this.videoPlayer.play();
                } else this.videoPlayerEnd();
                break;
        }
    },

    start() {
        if(glGame.coinArral == null){
            glGame.panel.showPanel(this.coinArrvalTip);
        }
    },

    videoPlayerEnd(){
        this.videoMask.active = false;
        this.videoPlayer.node.destroy();

        glGame.panel.showChildPanel(this.update_frame, this.node);
        
        glGame.audio.playPathBGM();
    },

    hideCleanupCache() {
        if (this.btn_cleanupCache) this.btn_cleanupCache.active = false;
        if (this.btn_serive) this.btn_serive.active = false;
        if (this.btn_website) this.btn_website.active = false;
    },
    updateService() {
        if (glGame.user.get('url').serviceOuter) this.serviceUrl = glGame.user.get('url').serviceOuter;
    },
    cleanupCache_cb() {
        clearGame();
        this.btn_cleanupCache.active = false;
    },
    servier_cb() {
        cc.sys.openURL(this.serviceUrl);
    },
    servier_cb() {
        cc.sys.openURL(this.serviceUrl);
    },
    openLogin() {
        this.node.getChildByName('loading_logo').active = false;
        //glGame.panel.showPanel(this.login_frame);
    },

    updatebag() {
        glGame.panel.showPanel(this.update_bag);
    },

    setLoginFrame() {
        for (let index in this.login_switch) this.login_switch[index].active = false;
        let login_node = this.login_switch[glGame.gamecfg.loginSwitch];
        login_node.active = true;

        glGame.panel.showChildPanel(this.login_logo, login_node.getChildByName("loading_logo"));
    },

    onDestroy() {
        glGame.emitter.off(MESSAGE.UI.HIDE_CLEANUP, this);
        glGame.emitter.off(MESSAGE.DOWNLOAD.END, this);
        glGame.emitter.off(MESSAGE.DOWNLOAD.BAG, this);
    }
});

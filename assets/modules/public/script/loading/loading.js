glGame.baseclass.extend({
    properties: {
        progress: cc.ProgressBar,
        node_logo: cc.Node,
        light: cc.Node,
        lab_percent: cc.Label,
        lab_loading: cc.Label,

        coinLoading: cc.Node,
        commonLoading: cc.Node,
    },
    onLoad() {
        this.dianLiveCount = 0;     //点显示的个数

        this.scene = cc.director.getScene();

        this.nextSceneTag = glGame.storage.getItem(glGame.scenetag.NEXTSCENETAG) || glGame.scenetag.PLAZA;
        this.nextSceneName = glGame.scene.getSceneNameByID(this.nextSceneTag.nextSceneTag);
        this.setloadingSprite();
        this.node.active = this.scene.name !== this.nextSceneName && this.nextSceneName !== "login";
        this.light.position = cc.v2(-20, 0)
        this.plazaPreload = (this.nextSceneName === "plaza" && !glGame.panel.preloadPlazaState());
        this.completedCount = 0;
        this.totalCount = 0;
        this.preloadtotal = 0;
        this.preloadtotalMax = 0;
        this.progress.progress = 0;
        this.lab_percent.string = '0%';
        glGame.emitter.on(MESSAGE.UI.PLAZA_LOADING, this.plazaloading, this);

        this.node.zIndex = 1000;
        this.setProcessNext();
    },
    //加载界面设置不同的图片
    setloadingSprite() {
        if (this.scene.name == "plaza" && this.nextSceneName != "login") {
            this.coinLoading.active = true;
            this.commonLoading.active = false;
            //播放动画
        } else {
            this.lab_loading.string = '正在加载中';
        }
    },

    setloadingTipsSprite() {
        this.node.active = true;
        this.progress.progress = 1;
        this.lab_percent.string = '100%';
    },

    //加载界面读条设置
    plazaloading(data) {
        if (data.count >= 0) this.preloadtotal = data.count - 1;

        if (this.completedCount == 0 && this.preloadtotal != 0) {
            this.preloadtotalMax = this.preloadtotal > this.preloadtotalMax ? this.preloadtotal * 2 : this.preloadtotalMax;
            let progress = (this.preloadtotalMax / 2 - this.preloadtotal) / this.preloadtotalMax || 0;
            if (progress > this.progress.progress) {
                progress = progress > 1 ? 1 : progress;
                this.progress.progress = progress;
                this.lab_percent.string = `${Math.floor(progress * 100)}%`;
                let posX = Math.floor(730 * progress)
                this.light.position = cc.v2(posX - 20, 0)
            }
        }
    },

    //加载界面设置
    setProcessNext() {
        if (this.scene.name === "plaza" && this.scene.name === this.nextSceneName) {
            this.remove();
            return;
        }

        cc.loader.onProgress = (completedCount, totalCount, item) => {
            this.completedCount = completedCount;
            this.totalCount = totalCount;
            let progress = completedCount / (this.totalCount + this.preloadtotal) || 0;
            if (item && item.uuid && progress > this.progress.progress) {

                progress = progress > 1 ? 1 : progress;
                this.progress.progress = progress;
                this.lab_percent.string = `${Math.floor(progress * 100)}%`;
                let posX = Math.floor(730 * progress)
                this.light.position = cc.v2(posX - 20, 0)
            }

        };
    },
    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.PLAZA_LOADING, this);
        cc.loader.onProgress = () => { };
        cc.loader.onComplete = () => { }
        this.unschedule(this.dianAni);
    },
});

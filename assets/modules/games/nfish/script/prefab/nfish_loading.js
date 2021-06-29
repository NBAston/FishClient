glGame.baseclass.extend({
    properties: {
        progress: cc.ProgressBar,
        lab_percent: cc.Label,
        lab_loading: cc.Label,
    },
    onLoad() {
        this.scene = cc.director.getScene();
        this.setloadingSprite();
        this.node.active = true;
        this.progress.progress = 0;
        this.lab_percent.string = '0%';
        this.node.zIndex = 1000;
        glGame.emitter.on(MESSAGE.UI.PLAZA_LOADING, this.plazaloading, this);
    },

    setProgress(progress) {
        this.progress.progress = progress;
        this.lab_percent.string = `${Math.floor(progress * 100)}%`;
    },

    //加载界面设置不同的图片
    setloadingSprite() {
        this.lab_loading.string = '正在加载中';
    },

    setloadingTipsSprite() {
        this.node.active = true;
        this.progress.progress = 1;
        this.lab_percent.string = '100%';
    },

    //加载界面读条设置
    plazaloading(data) {
        let progress = data.completedCount / data.totalCount;
        if(progress < this.progress.progress) {
            progress = this.progress.progress + 0.0001;
        }

        if(progress > 1) {
            progress = 1;
        }

        this.progress.progress = progress;
        this.lab_percent.string = `${Math.floor(progress * 100)}%`;
    },

    OnDestroy() {
        glGame.emitter.off(MESSAGE.UI.PLAZA_LOADING, this);
        cc.loader.onProgress = () => { };
        cc.loader.onComplete = () => { }
    },
});

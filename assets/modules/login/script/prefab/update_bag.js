
glGame.baseclass.extend({
    properties: {
        progress_bar: cc.ProgressBar,
        progress: cc.Label,
    },
    onLoad() {
        this.progress_bar.progress = 0;
        this.progress.string = '()';
        this.schedule(this.updateProgress.bind(this), 1);
        this.load_size = 0;
        this.load_count = 0;
        this.bag_size = 0;
        this.move_count = 0;

    },

    start() {

    },

    updateProgress() {
        let data = glGame.platform.UpdateProgress();
        if (data && data.size && data.load) {
            if (this.load_size != data.load) this.move_count = Math.ceil((data.load - this.load_count) / (1/cc.director.getDeltaTime()));
            console.log(this.move_count);
            this.load_size = data.load;
            this.bag_size = data.size;
        }
    },

    update(dt) {
        if (this.bag_size == 0 || this.load_size == 0) return;
        if (this.load_size == this.load_count) return;
        this.load_count += this.move_count;
        this.load_count = Math.min(this.load_count, this.load_size);
        if (this.load_size == this.bag_size) this.load_count = this.bag_size;
        this.progress_bar.progress = this.load_count / this.bag_size;
        this.progress.string = `(${this.load_count}/${this.bag_size})...`;
    },
});

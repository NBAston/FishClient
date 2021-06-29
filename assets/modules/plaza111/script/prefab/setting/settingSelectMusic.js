/**
 * 设置
 */

glGame.baseclass.extend({
    properties: {
        content: cc.Node,
        item: cc.Node,
    },

    onLoad() {
        this.netMusic = null;                       // 网络音乐列表
        this.localMusic = [];                       // 本地音乐列表

        let localCount = glGame.audio.musicList.length;
        for(let i = 0; i < localCount; i++) {
            this.localMusic[i] = {name: glGame.audio.musicList[i]}
        }

        this.audioMap = {};
        this.bgName = glGame.storage.getItem("bgName") || { audio: this.localMusic[0].name };
        this.index = 0;
        this.bInit = false;
        this.reqBackgroundMusic();
    },

    OnClickToggle(event) {
        if(!this.bInit) return;
        let buttonName = event.node.name;
        let buttonNode = event.node;
        glGame.audio.playLoadSoundEffectByPath("select");
        this.onClick(buttonName, buttonNode);
    },

    onClick(name, node) {
        switch (name) {
            case "toggle":
                this.click_itemAudio(node);
                break;
            case "download":
                this.click_download(node)
                break;
        }
    },

    // 初始化本地音乐列表
    initLocalMusic() {
        let localMusic = this.localMusic;
        let count = localMusic.length;

        for(let i = 0; i < count; i++) {
            let item = cc.instantiate(this.item);
            item.active = true;
            item.index = i;
            item.parent = this.content;
            item.getChildByName("title").getComponent(cc.Label).string = localMusic[i].name;
            item.getChildByName("download").active = false;
            item.getChildByName("download").index = i;
            if(this.bgName.audio == localMusic[i].name) {
                this.setToggle(item);
                this.index = i;
            }

            this.audioMap[localMusic[i].name] = {name: localMusic[i], node: item};
        }
    },

    // 初始化网络音乐列表
    initNetMusic() {
        let netMusic = this.netMusic.data;
        let localCount = this.localMusic.length;
        let count = netMusic.length;

        for (let i = 0; i < count; i++) {
            let item = cc.instantiate(this.item);
            item.active = true;
            item.index = localCount + i;
            item.parent = this.content;
            item.getChildByName("title").getComponent(cc.Label).string = netMusic[i].name; 
            item.getChildByName("download").index = localCount + i;

            let url = netMusic[i].url;
            if(this.bgName.audio == url) {
                this.setToggle(item);
                this.index = localCount + i;
            }

            if(cc.sys.isNative) {
                if(!glGame.audioloader.isLoaded(url)) {
                    if(glGame.audioloader.isLoading(url)) {
                        this.setPercent(url, glGame.audioloader.getPercent(url));
                        glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this));
                    } else {
                        item.getChildByName("download").active = true;
                    }
                }
            }

            this.audioMap[netMusic[i].url] = {data: netMusic[i], node: item};
        }

        let allLength = localCount + count;
        let height = Math.ceil(allLength / 2) * 128;
        this.content.height = height;
        let scorllview = this.node.getChildByName("scrollview").getComponent(cc.ScrollView);
        scorllview.scrollToTop();
    },

    click_itemAudio(node) {
        if(!this.bInit) {
            return false;
        }

        let localCount = this.localMusic.length;
        let musicList = this.netMusic.data;
        let index = node.index; 
        this.index = index;

        this.hideAllSpine();
        node.getChildByName("sp_play").active = true;

        if(index < localCount) {
            glGame.storage.setItem("bgName", {audio: this.localMusic[index].name});
            glGame.audio.playPathBGM();
        } else {
            let url = musicList[node.index - localCount].url;
            glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this)).then((audioClip)=> {
                if(this.index != index) return;
                glGame.storage.setItem("bgName", {audio: url, netMusic: true})
                glGame.audio.playBGM(audioClip);
            });



            if(cc.sys.isNative) {
                if(!glGame.audioloader.isLoaded(url)) {
                    node.getChildByName("process").active = true;
                }

                node.getChildByName("download").active = false;
            }
        }
    },

    click_download(node) {
        let localCount = this.localMusic.length;
        let musicList = this.netMusic.data;
        let index = node.index - localCount;

        let url = musicList[index].url;

        if(glGame.audioloader.isLoaded(url)) {
            return;
        }

        if(glGame.audioloader.isLoading(url)) {
            return;
        }

        node.getChildByName("Background").active = false;
        glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this));
        this.reqBackgroundMusicDownloadsInc(musicList[index].id);
    },

    hideAllSpine() {
        for(let k in this.audioMap) {
            let item = this.audioMap[k];
            item.node.getChildByName("sp_play").active = false;
        }
    },

    // 音乐下载进度
    onLoadProgress(url, percent) {
        this.setPercent(url, percent);
    },

    // 设置百分比
    setPercent(url, percent) {
        let info = this.audioMap[url];
        if(!info) return;
        let node = info.node;
        let progress = node.getChildByName("process");
        let download = node.getChildByName("download");

        if(percent == 100) {
            progress.active = false;
            download.active = false;
            return;
        }

        progress.active = true;
        progress.getChildByName("pro").getComponent(cc.ProgressBar).progress = percent / 100;
        progress.getChildByName("label").getComponent(cc.Label).string = `${percent}%`;
    },

    setToggle(node) {
        node.getComponent(cc.Toggle).isChecked = true;
        node.getChildByName("sp_play").active = true;
    },

    reqBackgroundMusic() {
        glGame.gameNet.send_msg('http.ReqBackgroundMusic', { page: 1, pageSize: 100 }, (route, msg)=> {
            this.netMusic = msg;
            let data = this.netMusic.data;
            this.initLocalMusic();
            this.initNetMusic();
            this.bInit = true;
        });
    },

    reqBackgroundMusicDownloadsInc(id) {
        glGame.gameNet.send_msg('http.ReqBackgroundMusicDownloadsInc', {id: id}, (route, msg)=> {

        });
    },

    OnDestroy() {
        glGame.audioloader.clearCallback();
    },
});

let
    Audio = function () {
        this.resetData();
    },
    audio = Audio.prototype,
    g_instance = null;

audio.lastAudioSceneName = null;

/**
 * 初始化音量参数
 */
audio.resetData = function () {
    this.BGMSE = glGame.storage.getItem("BGMSE") || { BGMVolume: 1, BGMPlayState: true, SoundEffectVolume: 1, SoundEffectPlayState: true };
    this.curBGM = null;
    this.curSoundEffect = null;
    this.curLoopSE = null;
    //默认本地音效
    this.musicList = ["Hoaprox", "Axero-Trip", "Friendships"];
};
/**
 * 播放背景音乐
 * @param {cc.AudioClip} audio
 */
audio.playBGM = function (audio) {
    this.curBGMPath = audio;
    if (!this.BGMSE["BGMPlayState"]) return;
    if (this.curBGM || this.curBGM === 0) this.stopCurBGM();
    this.curBGM = cc.audioEngine.play(this.curBGMPath, true, this.BGMSE["BGMVolume"]);
};

/**
 * 播放背景音乐
 */
audio.playPathBGM = function () {
    let data = glGame.storage.getItem("bgName") || { audio: this.musicList[0] };

    if(data.netMusic) {
        glGame.audioloader.loadAudio(data.audio).then((audio)=> {
            this.curBGMPath = audio;
            if (!this.BGMSE["BGMPlayState"]) return;
            if (this.curBGM || this.curBGM === 0) this.stopCurBGM();
            this.curBGM = cc.audioEngine.play(this.curBGMPath, true, this.BGMSE["BGMVolume"]);
        });
    } else {
        glGame.fileutil.readAudio(`audio/bg/${data.audio}`).then(audio => {
            this.curBGMPath = audio;
            if (!this.BGMSE["BGMPlayState"]) return;
            if (this.curBGM || this.curBGM === 0) this.stopCurBGM();
            this.curBGM = cc.audioEngine.play(this.curBGMPath, true, this.BGMSE["BGMVolume"]);
        });
    }
};

/**
 * 停止当前播放的背景音乐
 */
audio.stopCurBGM = function () {
    if (this.curBGM || this.curBGM === 0) cc.audioEngine.stop(this.curBGM);
    else cc.audioEngine.stopAll();
    this.curBGM = null;
};

//继续播放所有音效
audio.continueAllMusic = function () {
    this.playBGM(this.curBGMPath);
};
//停止所有音效
audio.pauseAllMusic = function () {
    cc.audioEngine.stopAll();
};

/**
 * 设置背景音乐关闭
 */
audio.closeBGM = function () {
    this.BGMSE["BGMPlayState"] = false;
    this.stopCurBGM();
    this.saveVolume();
};
/**
 * 设置背景音乐播放开启
 */
audio.openBGM = function () {
    this.BGMSE["BGMPlayState"] = true;
    this.playBGM(this.curBGMPath);
    this.saveVolume();
};

/**
 * 获取背景音乐
 */
audio.getBGM = function(){
    return this.curBGM;
}
/**
 * 获取背景音乐音量
 */
audio.getBGMVolume = function(){
    return this.BGMSE["BGMVolume"];
}
/**
 * 设置背景音量
 * @param volume
 */
audio.setBGMVolume = function (volume) {
    this.BGMSE["BGMVolume"] = volume;
    cc.audioEngine.setVolume(this.curBGM, this.BGMSE["BGMVolume"]);
};
/**
 * 通过路径播放音效
 */
audio.playSoundEffectByPath = function (path) {
    if (!this.BGMSE["SoundEffectPlayState"]) return;
    if (!path) return console.error("audio.playSoundEffectByPath 参数 path 不能为空...");
    this.playSoundEffect(`res/raw-assets/${path}.mp3`);
};

/**
 * 通过路径播放音效(预加载)
 * @param name 名字。路径和格式函数拼接
 */
audio.playLoadSoundEffectByPath = function (name, bool = false) {
    if (!this.BGMSE["SoundEffectPlayState"]) return;
    if (!name) return console.error("audio.playLoadSoundEffectByPath 参数 name 不能为空...");
    if (bool) this.closeCurEffect();
    let SoundEffectVolume = this.BGMSE["SoundEffectVolume"];
    cc.loader.load(cc.url.raw(`resources/audio/public/${name}.mp3`), function (err, clip) {
        this.curSoundEffect = cc.audioEngine.play(clip, false, SoundEffectVolume);
        if (bool) this.soundEffect = this.curSoundEffect;
    });
};

/**
 * 播放音效
 * @param {cc.AudioClip} audio
 * @param bool 是否是特长音效，特长音效需要考虑秒关界面的情况，需要把音效停止
 */
audio.playSoundEffect = function (audio, bool = false,volume = -1) {
    if (!this.BGMSE["SoundEffectPlayState"]) return;
    if (bool) this.closeCurEffect();
    if(volume != -1){
        this.curSoundEffect = cc.audioEngine.play(audio, false, this.BGMSE["SoundEffectVolume"],volume);
        cc.audioEngine.setVolume(this.curSoundEffect, volume);

    }else{
        this.curSoundEffect = cc.audioEngine.play(audio, false, this.BGMSE["SoundEffectVolume"]);
    }
    if (bool) this.soundEffect = this.curSoundEffect;
};

/**
 * 循环播放音效
 */
audio.playSoundEffectLoop = function (audio,volume = -1) {
    if (!this.BGMSE["SoundEffectPlayState"]) return;
    this.stopLoopSE();
    if(volume != -1){
        this.curLoopSE = cc.audioEngine.play(audio, true, this.BGMSE["SoundEffectVolume"],volume);
    }else {
        this.curLoopSE = cc.audioEngine.play(audio, true, this.BGMSE["SoundEffectVolume"]);
    }
}
/**
 * 关闭音效
 * this.soundEffect 特长音效的ID
 */
audio.closeCurEffect = function () {
    if (!this.BGMSE["SoundEffectPlayState"]) return;
    if (this.soundEffect != null) {
        cc.audioEngine.stopEffect(this.soundEffect);
        this.soundEffect = null;
    }

}
/**
 * 设置音效大小
 * @param volume
 */
audio.setSoundEffectVolume = function (volume) {
    this.BGMSE["SoundEffectVolume"] = volume;
    cc.audioEngine.setVolume(this.curSoundEffect, this.BGMSE["SoundEffectVolume"]);
    cc.audioEngine.setVolume(this.curLoopSE, this.BGMSE["SoundEffectVolume"]);
};
/**
 * 设置音效播放开启
 */
audio.openSE = function () {
    this.BGMSE["SoundEffectPlayState"] = true;
    this.saveVolume();
};
/**
 * 设置音效播放关闭
 */
audio.closeSE = function () {
    this.BGMSE["SoundEffectPlayState"] = false;
    this.stopLoopSE();
    this.saveVolume();
};

audio.stopLoopSE = function () {
    if (this.curLoopSE !== null) cc.audioEngine.stop(this.curLoopSE);
    this.curLoopSE = null;
};

/**
 * 停止所有声音
 */
audio.stopAllMusic = function () {
    cc.audioEngine.stopAll();
    this.curBGM = null;
    this.curSoundEffect = null;
    this.curLoopSE = null;
};

/**
 * 检查预制名是否符合房间选场名称
 * @param {string} nodeName 需要坚持的预支名称 
 */
audio.checkEnterName = function (nodeName) {
    if (typeof nodeName != "string") return false;
    for (let key in glGame.scene.entryGame) {
        let panelName = `${glGame.scene.entryGame[key]}entry`;
        if (nodeName === panelName) return true;
    }
    return false;
}

/**
 * 初始化主要场景
 */
audio.initPlazaAodio = function () {
    let isHavaEntery = false;
    let scene = cc.director.getScene();
    for (let i = 0; i < scene.childrenCount; i++) {
        let str = scene.children[i] ? scene.children[i].name.indexOf("entry") : -1;
        if (str != -1 && this.checkEnterName(scene.children[i].name)) {
            isHavaEntery = true;
            let script = scene.children[i].getComponent(scene.children[i].name);
            //播放选场音乐
            if (script.BGM) glGame.audio.playBGM(script.BGM);
            break;
        }
    }
    if (!isHavaEntery) {
        //glGame.audio.playBGM(this.BGM);
        if (scene && scene.name == "plaza") {
            if (glGame.audio) glGame.audio.playPathBGM();
        }
    }
    glGame.audio.lastAudioSceneName = null;
};
/**
 * 回到主要场景
 * @param {string} name 需要坚持的预支名称 
 */
audio.goBackPlazaAudio = function (name) {
    let scene = cc.director.getScene();
    //回到大厅 继续播 原来的背景音乐
    if (scene && scene.name === "plaza" && this.checkEnterName(name)) glGame.audio.playPathBGM();
    glGame.audio.lastAudioSceneName = null;
};
/**
 * 改变场景
 */
audio.onChangeScene = function () {
    let scene = cc.director.getScene();
    let isHave = false;
    for (let i = 0; i < scene.childrenCount; i++) {
        for (let key in glGame.scene.entryGame) {
            if (glGame.scene.entryGame[key] == scene.children[i].name) {
                isHave = true;
                break;
            }
        }
        if (isHave) {
            let script = scene.children[i].getComponent(scene.children[i].name) ? scene.children[i].getComponent(scene.children[i].name) : scene.children[i].getComponent(scene.children[i].name + "Scene");
            script = script ? script : scene.children[i].getComponent(scene.children[i].name + "scene");
            if (glGame.audio.lastAudioSceneName) {
                if (glGame.audio.lastAudioSceneName == scene.children[i].name) {
                    return;
                }
            }
            glGame.audio.lastAudioSceneName = scene.children[i].name;
            //播放选场音乐
            if (script.BGM) {
                glGame.audio.playBGM(script.BGM);
            }
            break;
        }
    }
}

/**
 * 写入缓存
 */
audio.saveVolume = function () {
    glGame.storage.setItem("BGMSE", this.BGMSE);
};
audio.get = function (key) {
    return this[key];
};
module.exports = function () {
    if (!g_instance) {
        g_instance = new Audio();
    }
    return g_instance;
};

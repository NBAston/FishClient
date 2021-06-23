"use strict";
cc._RF.push(module, '558255nwSFBHI6IkYr1+faP', 'settingSelectMusic');
// modules/plaza/script/prefab/setting/settingSelectMusic.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    item: cc.Node
  },
  onLoad: function onLoad() {
    this.netMusic = null; // 网络音乐列表

    this.localMusic = []; // 本地音乐列表

    var localCount = glGame.audio.musicList.length;

    for (var i = 0; i < localCount; i++) {
      this.localMusic[i] = {
        name: glGame.audio.musicList[i]
      };
    }

    this.audioMap = {};
    this.bgName = glGame.storage.getItem("bgName") || {
      audio: this.localMusic[0].name
    };
    this.index = 0;
    this.bInit = false;
    this.reqBackgroundMusic();
  },
  OnClickToggle: function OnClickToggle(event) {
    if (!this.bInit) return;
    var buttonName = event.node.name;
    var buttonNode = event.node;
    glGame.audio.playLoadSoundEffectByPath("select");
    this.onClick(buttonName, buttonNode);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "toggle":
        this.click_itemAudio(node);
        break;

      case "download":
        this.click_download(node);
        break;
    }
  },
  // 初始化本地音乐列表
  initLocalMusic: function initLocalMusic() {
    var localMusic = this.localMusic;
    var count = localMusic.length;

    for (var i = 0; i < count; i++) {
      var item = cc.instantiate(this.item);
      item.active = true;
      item.index = i;
      item.parent = this.content;
      item.getChildByName("title").getComponent(cc.Label).string = localMusic[i].name;
      item.getChildByName("download").active = false;
      item.getChildByName("download").index = i;

      if (this.bgName.audio == localMusic[i].name) {
        this.setToggle(item);
        this.index = i;
      }

      this.audioMap[localMusic[i].name] = {
        name: localMusic[i],
        node: item
      };
    }
  },
  // 初始化网络音乐列表
  initNetMusic: function initNetMusic() {
    var netMusic = this.netMusic.data;
    var localCount = this.localMusic.length;
    var count = netMusic.length;

    for (var i = 0; i < count; i++) {
      var item = cc.instantiate(this.item);
      item.active = true;
      item.index = localCount + i;
      item.parent = this.content;
      item.getChildByName("title").getComponent(cc.Label).string = netMusic[i].name;
      item.getChildByName("download").index = localCount + i;
      var url = netMusic[i].url;

      if (this.bgName.audio == url) {
        this.setToggle(item);
        this.index = localCount + i;
      }

      if (cc.sys.isNative) {
        if (!glGame.audioloader.isLoaded(url)) {
          if (glGame.audioloader.isLoading(url)) {
            this.setPercent(url, glGame.audioloader.getPercent(url));
            glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this));
          } else {
            item.getChildByName("download").active = true;
          }
        }
      }

      this.audioMap[netMusic[i].url] = {
        data: netMusic[i],
        node: item
      };
    }

    var allLength = localCount + count;
    var height = Math.ceil(allLength / 2) * 128;
    this.content.height = height;
    var scorllview = this.node.getChildByName("scrollview").getComponent(cc.ScrollView);
    scorllview.scrollToTop();
  },
  click_itemAudio: function click_itemAudio(node) {
    var _this = this;

    if (!this.bInit) {
      return false;
    }

    var localCount = this.localMusic.length;
    var musicList = this.netMusic.data;
    var index = node.index;
    this.index = index;
    this.hideAllSpine();
    node.getChildByName("sp_play").active = true;

    if (index < localCount) {
      glGame.storage.setItem("bgName", {
        audio: this.localMusic[index].name
      });
      glGame.audio.playPathBGM();
    } else {
      var url = musicList[node.index - localCount].url;
      glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this)).then(function (audioClip) {
        if (_this.index != index) return;
        glGame.storage.setItem("bgName", {
          audio: url,
          netMusic: true
        });
        glGame.audio.playBGM(audioClip);
      });

      if (cc.sys.isNative) {
        if (!glGame.audioloader.isLoaded(url)) {
          node.getChildByName("process").active = true;
        }

        node.getChildByName("download").active = false;
      }
    }
  },
  click_download: function click_download(node) {
    var localCount = this.localMusic.length;
    var musicList = this.netMusic.data;
    var index = node.index - localCount;
    var url = musicList[index].url;

    if (glGame.audioloader.isLoaded(url)) {
      return;
    }

    if (glGame.audioloader.isLoading(url)) {
      return;
    }

    node.getChildByName("Background").active = false;
    glGame.audioloader.loadAudio(url, this.onLoadProgress.bind(this));
    this.reqBackgroundMusicDownloadsInc(musicList[index].id);
  },
  hideAllSpine: function hideAllSpine() {
    for (var k in this.audioMap) {
      var item = this.audioMap[k];
      item.node.getChildByName("sp_play").active = false;
    }
  },
  // 音乐下载进度
  onLoadProgress: function onLoadProgress(url, percent) {
    this.setPercent(url, percent);
  },
  // 设置百分比
  setPercent: function setPercent(url, percent) {
    var info = this.audioMap[url];
    if (!info) return;
    var node = info.node;
    var progress = node.getChildByName("process");
    var download = node.getChildByName("download");

    if (percent == 100) {
      progress.active = false;
      download.active = false;
      return;
    }

    progress.active = true;
    progress.getChildByName("pro").getComponent(cc.ProgressBar).progress = percent / 100;
    progress.getChildByName("label").getComponent(cc.Label).string = "".concat(percent, "%");
  },
  setToggle: function setToggle(node) {
    node.getComponent(cc.Toggle).isChecked = true;
    node.getChildByName("sp_play").active = true;
  },
  reqBackgroundMusic: function reqBackgroundMusic() {
    var _this2 = this;

    glGame.gameNet.send_msg('http.ReqBackgroundMusic', {
      page: 1,
      pageSize: 100
    }, function (route, msg) {
      _this2.netMusic = msg;
      var data = _this2.netMusic.data;

      _this2.initLocalMusic();

      _this2.initNetMusic();

      _this2.bInit = true;
    });
  },
  reqBackgroundMusicDownloadsInc: function reqBackgroundMusicDownloadsInc(id) {
    glGame.gameNet.send_msg('http.ReqBackgroundMusicDownloadsInc', {
      id: id
    }, function (route, msg) {});
  },
  OnDestroy: function OnDestroy() {
    glGame.audioloader.clearCallback();
  }
});

cc._RF.pop();
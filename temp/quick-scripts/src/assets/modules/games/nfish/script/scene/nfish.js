"use strict";
cc._RF.push(module, 'b0477NJrFZHcYRGI2hl5vvQ', 'nfish');
// modules/games/nfish/script/scene/nfish.js

"use strict";

var CONST = require("nfishConst");

var LoadIng = "gameLoadingNode";
/***
 * 捕鱼
 * 主场景
 * **/

glGame.baseclass.extend({
  properties: {
    BGM: {
      //背景声音
      type: cc.AudioClip,
      "default": null
    },
    audioList2: {
      //音效2 新加的
      type: cc.AudioClip,
      "default": []
    },
    BGMList: {
      //背景声音 4：深渊龙王boss 进入， 5：玄武boss 进入
      type: cc.AudioClip,
      "default": []
    },
    fish_Bg: cc.Prefab,
    //捕鱼：背景
    fish_deskContainer: cc.Prefab,
    //捕鱼：桌子
    fish_deskUIContainer: cc.Prefab,
    //捕鱼：UI
    fish_box: cc.Prefab,
    //捕鱼：弹窗
    effect_pic: cc.SpriteFrame,
    //刷新点击资源图片替换
    json_fishResEdit: {
      "default": null,
      displayName: "fish res desc json",
      tooltip: "鱼资源描述，碰撞点，中心点",
      type: cc.JsonAsset
    },
    json_fishTable: {
      "default": null,
      displayName: "fish table",
      tooltip: "鱼表",
      type: cc.JsonAsset
    },
    json_fishLineGroup: {
      "default": null,
      displayName: "fish line group",
      tooltip: "鱼线组",
      type: cc.JsonAsset
    },
    audioList: {
      //音效
      type: cc.AudioClip,
      "default": []
    },
    rollnoticePanel: cc.Prefab,
    LOADING: cc.Prefab
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    console.log("Fish scene !!!!!!");
    glGame.emitter.emit("RootNodeHide"); // glGame.panel.showRoomLoading();
    //init netWork

    this.logic = require("nfishlogic").getInstance(); //初始化数据中心单利
    //************************ 全新的 ******************************

    this.logic.json_fishResEdit = this.json_fishResEdit.json;
    this.logic.json_fishTable = this.json_fishTable.json;
    this.logic.json_fishLineGroup = this.json_fishLineGroup.json; //************************ 全新的 ******************************

    var loading = cc.instantiate(this.LOADING);
    loading.name = LoadIng;
    loading.zIndex = 9999;
    this.node.addChild(loading);
    loading.getComponent("nfish_loading").setloadingTipsSprite();
    this.node.getChildByName(LoadIng).active = true; //!glGame.room.checkGameState();

    glGame.panel.showChildPanel(this.fish_Bg, this.node); //层级关系1：背景管理

    glGame.panel.showChildPanel(this.fish_deskContainer, this.node); //层级关系2：桌面 炮台

    glGame.panel.showChildPanel(this.fish_deskUIContainer, this.node); //层级关系2：桌面 按钮

    this.registerEvent();
    glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_STATE, this.effect_pic);
    var OffsexFrequency = 0.5;
    var OffsexFrequency2 = 0.55;
    var OffsexX = 150;
    var OffsexY = 68;
    var zIndex = 999;
    var pos = cc.v2(cc.winSize.width * OffsexFrequency, cc.winSize.height - OffsexX);
    var size = cc.size(cc.winSize.width * OffsexFrequency2, OffsexY);
    var speed = 3,
        bActive = false,
        bBottome = true;
    var panel = glGame.panel.showPanel(this.rollnoticePanel);
    panel.name = "fish_rollnotice";
    var rollnotice = panel.getComponent("rollnotice");
    rollnotice.setPosition(pos);
    rollnotice.setContentSize(size);
    rollnotice.setSpeed(speed);
    rollnotice.setActive(bActive);
    rollnotice.setBottom(bBottome);
    rollnotice.zIndex = zIndex;
  },
  //注册监听
  registerEvent: function registerEvent() {
    glGame.emitter.on(CONST.clientEvent.closeLoading, this.clseLoadingViewHandler, this); //关闭loading

    glGame.emitter.on(CONST.clientEvent.fishSound, this.playSoundHandler, this);
    glGame.emitter.on(CONST.clientEvent.fishBgSound, this.playBgSoundHandler, this);
    glGame.emitter.on(MESSAGE.UI.GAME_SON_MSGBOX, this.sonGameMsgbox, this);
  },
  //反注册监听
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off(CONST.clientEvent.fishSound, this);
    glGame.emitter.off(CONST.clientEvent.fishBgSound, this);
    glGame.emitter.off(MESSAGE.UI.GAME_SON_MSGBOX, this);
    glGame.emitter.off(CONST.clientEvent.closeLoading, this);
  },
  //关闭loading
  clseLoadingViewHandler: function clseLoadingViewHandler() {
    if (this.node.getChildByName(LoadIng)) this.node.getChildByName(LoadIng).active = false;
  },
  //子界面弹窗
  sonGameMsgbox: function sonGameMsgbox(data) {
    var panel = glGame.panel.showPanel(this.fish_box);
    panel.getComponent(panel.name).showMsg(data.content, data.single, data.next, data.cancel, data.center);
  },
  //开始播放
  playSoundHandler: function playSoundHandler(res) {
    if (res == "button") {
      return;
    }

    var BGMSE = glGame.audio.get("BGMSE");
    if (!BGMSE["SoundEffectPlayState"]) return;

    if (CONST.fishSounds[res] != null) {
      cc.audioEngine.play(this.audioList[CONST.fishSounds[res]], false, BGMSE["SoundEffectVolume"]);
    }

    if (CONST.fishSounds2[res] != null) {
      cc.audioEngine.play(this.audioList2[CONST.fishSounds2[res]], false, BGMSE["SoundEffectVolume"]);
    }
  },
  //开始播放背景声音
  playBgSoundHandler: function playBgSoundHandler() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    if (index == -1) {
      if (this.logic.bgIndex != -1) {
        if (this.logic.playBossBGM == 2) {
          if (this.logic.currPlayBgMusic != -1 && this.logic.currPlayBgMusic == this.logic.bgIndex) {
            //防止重复播放背景音乐
            return;
          }
        } else {
          if (this.logic.currPlayBgMusic == this.logic.bgIndex) {
            return;
          }
        }

        this.logic.currPlayBgMusic = this.logic.bgIndex;
        glGame.audio.playBGM(this.BGMList[this.logic.bgIndex]);
      }

      return;
    }

    var BgMusicMax = 4;

    if (index < BgMusicMax) {
      this.logic.bgIndex = index;
      this.logic.playBossBGM = 1;
    } else {
      this.logic.playBossBGM = 2;
    }

    if (this.logic.currPlayBgMusic != -1 && this.logic.currPlayBgMusic == index) {
      //防止重复播放背景音乐
      return;
    }

    this.logic.currPlayBgMusic = index;
    glGame.audio.playBGM(this.BGMList[index]);
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
    this.logic = null;
    glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_STATE);
  }
});

cc._RF.pop();
"use strict";
cc._RF.push(module, 'bfebbxm3CdCULfG91WAEnKc', 'plaza_hall');
// modules/plaza/script/prefab/plaza_hall.js

"use strict";

// 设置背景图对应关系
var bgImg = ["chessCard", "fishing", "arcade", "realPerson", "lottery", "sports", "compete", "room", "hot"];
glGame.baseclass.extend({
  properties: {
    audio_welcome: {
      type: cc.AudioClip,
      "default": null
    },
    prefab_up: cc.Prefab,
    prefab_center: cc.Prefab,
    prefab_comprehensive: cc.Prefab,
    prefab_down: cc.Prefab,
    prefab_arrvalTip: cc.Prefab,
    sprite_bg: cc.Sprite,
    bg_list: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    if (!glGame.user.get("url")) {
      glGame.user.reqUrl();
    }

    this.bgIndex = 0;
    glGame.panel.closeLoading();

    if (glGame.isfirstEnterPlaza) {
      glGame.audio.playSoundEffect(this.audio_welcome, true);
    }

    glGame.emitter.on(MESSAGE.UI.PLAZA_OPEN, this.plazaOpen, this);
    glGame.emitter.on("setplazabg", this.setPlazaBg, this);
    glGame.emitter.emit(MESSAGE.UI.SCENE); //大厅主要预支初始化

    var gameDisplayType = glGame.user.get("gameDisplayType");

    if (gameDisplayType == 2) {
      // 综合版
      glGame.panel.showChildPanel(this.prefab_comprehensive, this.node); // glGame.panel.showPanelByName("comprehensive");
    } else {
      // 棋牌版
      glGame.panel.showChildPanel(this.prefab_center, this.node); // glGame.panel.showPanelByName("center");
    }

    glGame.panel.showChildPanel(this.prefab_up, this.node);
    glGame.panel.showChildPanel(this.prefab_down, this.node);
    var arrvalTip = glGame.panel.showPanel(this.prefab_arrvalTip);
    arrvalTip.zIndex = 99;
    cc.sys.localStorage.removeItem("isAudioPlay");
  },
  plazaOpen: function plazaOpen(nodeName) {
    if (nodeName) {
      this.node.active = true;
      return;
    }
  },
  setPlazaBg: function setPlazaBg(data) {
    if (data && data.name != null) {
      for (var i = 0; i < bgImg.length; i++) {
        if (data.name == bgImg[i]) {
          this.sprite_bg.spriteFrame = this.bg_list[i]; // let gamegroup = this.node//.getChildByName("").getChildByName("gamegroup").width;

          var width = cc.winSize.width - data.width - 15;
          this.sprite_bg.node.getComponent(cc.Widget).left = data.width - 19;
          this.sprite_bg.node.getComponent(cc.Widget).updateAlignment();
          var bg_width = this.sprite_bg.node.width;

          if (width >= bg_width) {
            this.sprite_bg.node.width = width;
          }
        }
      } // let bgIndex = data.index >= this.bg_list.lenght ? 0 : data.index;
      // if (this.bgIndex != bgIndex) {
      //     this.sprite_bg.spriteFrame = this.bg_list[this.bgIndex];
      // }

    } else {
      this.sprite_bg.node.active = false;
    }
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off(MESSAGE.UI.PLAZA_OPEN, this);
    glGame.emitter.off("setplazabg", this);
  }
});

cc._RF.pop();
let CONST = require("nfishConst");
/***
 * 捕鱼
 * 主场景
 * **/
glGame.baseclass.extend({
    properties: {
        BGM: {                              //背景声音
            type:cc.AudioClip,
            default:null,
        },
        audioList2: {                        //音效2 新加的
            type:cc.AudioClip,
            default:[],
        },
        BGMList: {                              //背景声音 4：深渊龙王boss 进入， 5：玄武boss 进入
            type:cc.AudioClip,
            default:[],
        },
        fish_Bg:cc.Prefab,              //捕鱼：背景
        fish_deskContainer:cc.Prefab,   //捕鱼：桌子
        fish_deskUIContainer:cc.Prefab, //捕鱼：UI
        fish_box:cc.Prefab,             //捕鱼：弹窗
        effect_pic:cc.SpriteFrame,      //刷新点击资源图片替换
        json_fishResEdit: {
            default: null,
            displayName: "fish res desc json",
            tooltip: "鱼资源描述，碰撞点，中心点",
            type: cc.JsonAsset,
        },
        json_fishTable: {
            default: null,
            displayName: "fish table",
            tooltip: "鱼表",
            type: cc.JsonAsset,
        },
        json_fishLineGroup: {
            default: null,
            displayName: "fish line group",
            tooltip: "鱼线组",
            type: cc.JsonAsset,
        },
        audioList: {                        //音效
            type:cc.AudioClip,
            default:[],
        },
        rollnoticePanel:cc.Prefab,
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        console.log("Fish scene !!!!!!");
        glGame.emitter.emit("RootNodeHide");
        // glGame.panel.showRoomLoading();
        //init netWork
        this.logic                    = require("nfishlogic").getInstance();              //初始化数据中心单利
        //************************ 全新的 ******************************
        this.logic.json_fishResEdit   = this.json_fishResEdit.json;
        this.logic.json_fishTable     = this.json_fishTable.json;
        this.logic.json_fishLineGroup = this.json_fishLineGroup.json;
        //************************ 全新的 ******************************
        glGame.panel.showPanel(this.fish_Bg);                   //层级关系1：背景管理
        glGame.panel.showPanel(this.fish_deskContainer);        //层级关系2：桌面 炮台
        glGame.panel.showPanel(this.fish_deskUIContainer);      //层级关系2：桌面 按钮
        this.registerEvent();

        glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_STATE, this.effect_pic);
        const OffsexFrequency = 0.5;
        const OffsexFrequency2 = 0.55;
        const OffsexX = 150;
        const OffsexY = 68;
        const zIndex = 999;
        const pos = cc.v2(cc.winSize.width*OffsexFrequency, cc.winSize.height - OffsexX);
        const size = cc.size(cc.winSize.width*OffsexFrequency2, OffsexY);
        let speed = 3, bActive = false, bBottome = true;
        let panel = glGame.panel.showPanel(this.rollnoticePanel);
        panel.name = "fish_rollnotice";
        let rollnotice = panel.getComponent("rollnotice");
        rollnotice.setPosition(pos);
        rollnotice.setContentSize(size);
        rollnotice.setSpeed(speed);
        rollnotice.setActive(bActive);
        rollnotice.setBottom(bBottome);
        rollnotice.zIndex = zIndex;
    },
    //注册监听
    registerEvent() {
        glGame.emitter.on(CONST.clientEvent.fishSound,this.playSoundHandler,this);
        glGame.emitter.on(CONST.clientEvent.fishBgSound,this.playBgSoundHandler,this);
        glGame.emitter.on(MESSAGE.UI.GAME_SON_MSGBOX, this.sonGameMsgbox, this);
    },
    //反注册监听
    unregisterEvent() {
        glGame.emitter.off(CONST.clientEvent.fishSound,this);
        glGame.emitter.off(CONST.clientEvent.fishBgSound,this);
        glGame.emitter.off(MESSAGE.UI.GAME_SON_MSGBOX, this);
    },

    //子界面弹窗
    sonGameMsgbox(data) {
        let panel = glGame.panel.showPanel(this.fish_box);
        panel.getComponent(panel.name).showMsg(data.content, data.single, data.next, data.cancel, data.center);
    },

    //开始播放
    playSoundHandler(res) {
        let volume = res == "attack" ? 0.3 : 1;//炮弹发射声音 降低70%
        if(CONST.fishSounds[res] != null){
            glGame.audio.playSoundEffect(this.audioList[CONST.fishSounds[res]],false);
        }else if(CONST.fishSounds2[res] != null){
            glGame.audio.playSoundEffect(this.audioList2[CONST.fishSounds2[res]],false);
        }
    },
    //开始播放背景声音
    playBgSoundHandler(index = -1){
        if(index == -1){
            if(this.logic.bgIndex != -1){
                if(this.logic.playBossBGM == 2){
                    if(this.logic.currPlayBgMusic != -1 && this.logic.currPlayBgMusic == this.logic.bgIndex){//防止重复播放背景音乐
                        return;
                    }
                }else{
                    if(this.logic.currPlayBgMusic == this.logic.bgIndex){
                        return;
                    }
                }
                this.logic.currPlayBgMusic = this.logic.bgIndex;
                glGame.audio.stopCurBGM();
                glGame.audio.playBGM(this.BGMList[this.logic.bgIndex]);
            }
            return;
        }
        const BgMusicMax = 4;
        if(index < BgMusicMax){
            this.logic.bgIndex = index;
            this.logic.playBossBGM = 1;
        }else{
            this.logic.playBossBGM = 2;
        }
        if(this.logic.currPlayBgMusic != -1 && this.logic.currPlayBgMusic == index){//防止重复播放背景音乐
            return;
        }
        this.logic.currPlayBgMusic = index;
        glGame.audio.stopCurBGM();
        glGame.audio.playBGM(this.BGMList[index]);
    },
    OnDestroy() {
        this.unregisterEvent();
        this.logic = null;
        glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_STATE);
    }
});

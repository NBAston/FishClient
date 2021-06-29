/**
 * 设置面板
 */
glGame.baseclass.extend({
    properties: {
        BGM: cc.Toggle,
        SE: cc.Toggle,

        content: cc.Node,
        item: cc.Node,
    },
    onLoad() {
        this.page = 1;
        this.size = 10;
        this.totalPage = 0;
        this.musicList = glGame.audio.musicList;
        let data = glGame.storage.getItem("bgName") || { audio: this.musicList[0] };
        this.selectAudio = data.audio;
        this.selectItem = null;

        this.showPanelInfo();
        this.initBgMusic();
        this.registerEvent();
    },
    registerEvent() {
        this.BGM.node.on("toggle", this.click_music, this);
        this.SE.node.on("toggle", this.click_effect, this);
    },
    unRegisterEvent() {
    },
    OnDestroy() {
        this.unRegisterEvent();
    },
    showPanelInfo() {
        // 根据本地缓存的声音数据来更新按钮状态
        let BGMSE = glGame.audio.get("BGMSE");
        this.BGM.isChecked = BGMSE["BGMPlayState"];
        this.BGM.node.getChildByName("music").active = !BGMSE["BGMPlayState"];
        this.SE.isChecked = BGMSE["SoundEffectPlayState"];
        this.SE.node.getChildByName("effect").active = !BGMSE["SoundEffectPlayState"];
    },

    onClick(name, node) {
        switch (name) {
            case "btn_changepsw": this.changepsw_cb(); break;
            case "btn_exit": this.switchacc_cb(); break;
            default:
                if (name.indexOf("item") > -1) return this.click_itemAudio(name);
                break;
        }
    },

    click_music(event) {
        let node = event.target
        let isChecked = event.isChecked;
        node.active = !isChecked;
        if (isChecked) glGame.audio.openBGM();
        else glGame.audio.closeBGM();
    },
    click_effect(event) {
        let node = event.target
        let isChecked = event.isChecked;
        node.active = !isChecked;
        if (isChecked) glGame.audio.openSE();
        else glGame.audio.closeSE();
    },
    click_switchacc() {
        glGame.logon.logout();
        glGame.storage.removeItemByKey("loginCache");
    },

    //修改密码
    changepsw_cb() {
        if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
            glGame.panel.showPanelByName("modifypsw");
        } else {
            glGame.panel.showServiceBox(glGame.tips.USER.PASSWORD.SERVICE);
        }
    },
    //设置
    switchacc_cb() {
        //退出登录清楚缓存是记录密码
        glGame.panel.showPanelByName("exitAcc");
    },

    /*
    {
      "total": 3,
      "totalPage": 1,
      "data": [
        {
          "id": 1,
          "name": "爱你斯柯达",
          "url": "http://192.168.3.101:10005/music/askdjsal.mp3",
          "downloads": 999,
          "isDefault": 1,
          "isDefaultDes": "默认"
        },
        ......
      ],
      "page": 1,
      "pageSize": 10
    }
    */

    ReqBackgroundMusic() {
        glGame.gameNet.send_msg('http.ReqBackgroundMusic', { page, pageSize }, (route, msg) => {

            this.addBgMusic();
        });
    },


    initBgMusic() {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        let count = this.musicList.length;
        for (let i = 0; i < count; i++) {
            let item = cc.instantiate(this.item);
            item.active = true;
            item.name = `item_${i}`;
            item.getChildByName("name").getComponent(cc.Label).string = this.musicList[i];
            if (this.musicList[i] == this.selectAudio) {
                this.setTaggle(item, true);
                this.selectItem = item;
            } 
            item.parent = this.content;
        }
    },

    addBgMusic() {

    },

    setTaggle(item, bol) {
        item.getChildByName("Toggle").getChildByName("checkmark").active = bol;
    },

    click_itemAudio(name) {
        if (this.selectItem) this.setTaggle(this.selectItem, false);
        let index = Number(name.substring(5));
        this.selectItem = this.content.children[index];
        this.setTaggle(this.selectItem, true);
        glGame.storage.setItem("bgName", { audio: this.musicList[index] });
        glGame.audio.playPathBGM();
    },
});

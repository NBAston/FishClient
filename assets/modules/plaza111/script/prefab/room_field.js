const CORNER_MARK = {
    0: "无",
    1: "推荐",
    2: "火爆",
    3: "最新",
}
const ROOM_ICON = {
    rqznn: "看牌抢庄",
    rddz: "斗地主",
    rdzpk: "德州扑克",
    rkpqz: "抢庄牛牛",
    rpj: "牌九",
    rsss: "十三水",
    rzjh: "炸金花",
}

glGame.baseclass.extend({
    properties: {
        appointment: cc.Node,
        room_item: cc.Node,
        url_txt: cc.Label,
        bg: cc.Node,

        atlas_corner_mark: cc.SpriteAtlas,
        atlas_room_icon: cc.SpriteAtlas,
    },

    onLoad() {
        glGame.emitter.on("hotUIRefresh", this.hotUIRefresh, this);
    },
    
    start() {
        let gamegroup = this.node.parent.getChildByName("gamegroup").width;
        let width = cc.winSize.width - gamegroup;
        this.node.width = width;
        // let bg_width = this.bg.width;
        // if (width >= bg_width) {
        //     this.bg.getComponent(cc.Widget).left = 0;
        //     this.bg.getComponent(cc.Widget).updateAlignment();
        // }
    },

    initData(list) {
        this.gameItemWidth = this.room_item.width; //item大小
        this.gameList = list.gameList;
        this.initRoomList();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_invite":
                console.log(this.url_txt.string);
                glGame.platform.copyToClip(this.url_txt.string, "推广链接复制成功");
                break;
            default:
                // 判断是否是游客
                if (glGame.user.isTourist()) {
                    glGame.panel.showRegisteredGift(true);
                    break;
                }
                if (name == "btn_jiaruzidi") glGame.panel.showPanelByName("joinRoom");  //加入房间
                else if (name == "btn_duihuanzuanshianniu") glGame.panel.showPanelByName("exchangeDiamond");    //砖石
                else if (name == "btn_chaxunzhanjianniu") glGame.panel.showPanelByName("roomRecord");   //战绩
                else if (name.indexOf("room") !== -1) {
                    // 创建房间
                    let str = name.split("room"),
                        id = Number(str[str.length - 1]),
                        room_gamedata = this.gameList[`_${id}`];
                    if (id != 0) {
                        this.onEnterRoomGame(id);
                    } else {
                        glGame.platform.copyToClip(this.url_txt.string, "敬请期待");
                    }
                }
                break;
        }
    },

    initRoomList() {
        let room_scrollTime = 0.25,   //图标移动时间
            room_everyTime = 0.05,    //图标移动间隔时间
            room_distance = 30,       //图标弹动距离
            room_distanceTime = 0.1;  //图标弹动时间

        // 设置推广链接地址
        let url = glGame.user.get("url");
        if (url){
            this.url_txt.string = url.promote_url;
        }

        // 屏蔽web版网页游戏
        this.game_list = [];
        Object.values(this.gameList).forEach(item=>{
            // if (!isEnableHotUpdate && item.id > 9999) return;
            this.game_list.push(item)
        })

        Object.keys(ROOM_ICON).forEach(item=>{
            if (item == "rqznn") {
                this.game_list[0].icon = item;
            } else {
                let game = {}
                game.id = 0;
                game.icon = item;
                game.gameName = ROOM_ICON[item];
                this.game_list.push(game)
            }
        })

        let length = this.game_list.length;
        // 获取需要展示节点的位置
        let room_posArr = this.getPosArr()

        // 设置
        this.appointment.getComponent(cc.ScrollView).stopAutoScroll();
        let room_view = this.appointment.getChildByName("view");
        room_view.getComponent(cc.Widget).updateAlignment();
        let content = room_view.getChildByName("content");
        content.destroyAllChildren();
        content.removeAllChildren();
        content.x = 0;

        //设置scrollview.width
        let viewWidth = room_view.width;
        let room_width = Math.ceil(length / 2) * this.gameItemWidth;
        content.width = room_width < viewWidth ? viewWidth : room_width;

        // 初始化UI
        // if (content.childrenCount == 0) {
            this.initUI(content);
        // }

        // 执行动作
        for (let i = 0; i < length; i++) {
            let item = content.children[i];
            if (item) {
                item.position = cc.v2(room_posArr[i].x + viewWidth, room_posArr[i].y);
                item.runAction(cc.sequence(
                    cc.moveTo(room_scrollTime + room_everyTime * i, room_posArr[i].x - room_distance, room_posArr[i].y),
                    cc.moveTo(room_distanceTime, room_posArr[i]),
                ))
            }
        }
    },

    // 初始化UI
    initUI(content) {
        this.gameList = {};
        for (let i = 0; i < this.game_list.length; i++) {
            let id = this.game_list[i].id;
            let item = cc.instantiate(this.room_item);
            item.parent = content;
            item.name = "room" + id;
            item.active = true;
            // 设置游戏名称
            item.getChildByName("game_name").getComponent(cc.Label).string = this.game_list[i].gameName;
            // 设置角标
            if (this.game_list[i].tag > 0) {
                let room_cornerMark = item.getChildByName("cornerMark");
                let corner_mark = this.atlas_corner_mark.getSpriteFrame(`img_corner_mark${this.game_list[i].tag}`);
                room_cornerMark.getComponent(cc.Sprite).spriteFrame = corner_mark;
                room_cornerMark.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[this.game_list[i].tag];
                room_cornerMark.active = true;
            }
            // 设置游戏图标
            if (this.game_list[i].icon) {
                item.getChildByName("game_icon").getComponent(cc.Sprite).spriteFrame = this.atlas_room_icon.getSpriteFrame(`icon_${this.game_list[i].icon}`);
                // let url = glGame.user.get('url').resource_url;
                // glGame.panel.showRemoteImage(item.getChildByName("game_icon"), url + this.game_list[i].icon);
            }

            let gameName = "rqznn_" + i;
            if (id > 0) {
                gameName = glGame.scene.getSceneNameByID(id);
            }
            this.gameList[gameName] = item;
        }

        // 检查游戏是否有正在更新的
        this.isHotStatus();
    },

    //获得展示节点的位置
    getPosArr() {
        let posX = this.gameItemWidth/2, posY = [95, -95], posArr = [];
        for (let i = 0; i < this.game_list.length; i++) {
            let index = i % 2;
            posArr.push(cc.v2(index == 0 && i != 0 ? posX += this.gameItemWidth : posX, posY[index]));
        }
        console.log("房间分类下的游戏展示位置列表", posArr)
        return posArr;
    },

    onEnterRoomGame(gameId) {
        // glGame.panel.showPanelByName("createRoom").then(create_room => {
        //     console.log("create_room ====> ", create_room.name);
        //     create_room.getComponent(create_room.name).setGameButton(42)
        // });
        // return;
        // 检查当前游戏是否已经在更新队列
        if (glGame.assetsManager.isUpdateQueue(gameId)) return;

        // 检查游戏是否需要更新
        glGame.gamelistcfg.isNeedUpdate(gameId).then(bol => {
            if (bol && cc.sys.isNative) {
                // 开始更新【%s(游戏名称)】，请耐心等待...
                // glGame.panel.showTip(`开始更新【${glGame.room.getGameDictById(gameId)}】，请耐心等待...`);
                let gameName = glGame.scene.getSceneNameByID(gameId);
                glGame.gamelistcfg.setGameUpdate(gameName, false);
                glGame.assetsManager.gameUpdata({gameID: gameId, manifestUrl: null});
            } else {
                // 不需要更新
                // glGame.panel.showPanelByName("createRoom")
                glGame.panel.showPanelByName("createRoom").then(create_room => {
                    console.log("create_room ====> ", create_room.name);
                    create_room.getComponent(create_room.name).setGameButton(gameId)
                });
            }
        });
    },

    // 判断游戏是否在热更
    isHotStatus() {
        if (!cc.sys.isNative) return;
        Object.keys(this.gameList).forEach(gameName=>{
            // 检查当前是否有游戏正在跟新
            let is_update_queue = glGame.assetsManager.isBeingUpdate(gameName);
            if (is_update_queue != null) {
                let data = {gameName:gameName, isActive:true}
                if (is_update_queue) {
                    data.isStatus = 0;
                }
                this.hotUIRefresh(data);
            } else {
                // 查找是否需要更新
                glGame.assetsManager.isNeedUpdate(gameName);
            }
        });
    },

    // 热更刷新UI
    hotUIRefresh(data) {
        Object.keys(this.gameList).forEach(gameName=>{
            if (data.gameName == gameName) {
                let item = this.gameList[gameName];
                let processNew = item.getChildByName("process");
                let progressPic = processNew.getChildByName("pro").getChildByName("bar").getComponent(cc.Sprite);
                // 进度条
                processNew.active = data.isActive;
                // 显示下载进度
                let schedule = processNew.getChildByName("label").getComponent(cc.Label)
                switch (data.isStatus) {
                    case 0:
                        // 热更接续
                        schedule.string = "0%";
                        progressPic.fillRange = 0;
                        break;
                    case 1:
                        // 下载中
                        schedule.string = `${parseInt(data.process * 100) || 0}%`;
                        progressPic.fillRange = data.process;
                        break;
                    default:
                        // 下载列表大于最大同时下载量的时候显示等待中
                        schedule.string = "等待中";
                        progressPic.fillRange = 0;
                        break;
                }
            }
        });
    },

    OnDestroy() {
        glGame.emitter.off("hotUIRefresh", this);
    },
});
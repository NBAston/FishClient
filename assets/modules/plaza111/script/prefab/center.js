const groupId = {
    1: "hot",
    2: "arcade",
    3: "chessCard",
    4: "fishing",
    5: "room",
}
const CORNER_MARK = {
    0: "无",
    1: "推荐",
    2: "火爆",
    3: "最新",
}
const BANNER_START = {
    ON: 1,  //开启
    OFF: 0  //关闭
}

glGame.baseclass.extend({
    properties: {
        btnWebGame: cc.Node,
        allInterface: cc.Node,

        gamegroupView: cc.Node,
        gamegroup: cc.Node,

        prefab_banner: cc.Prefab,       //轮播图预制
        prefab_room_field: cc.Prefab,   //房间场预制

        atlas_corner_mark: cc.SpriteAtlas,
    },
    onLoad() {

    },

    start() {
        this.typeIndex = glGame.isCategoryData.typeIndex;
        this.firstTimeTag = false;
        this.banner = null;
        if (isiPhoneX) this.AdaptiveIphonex();
        this.gamegroupView.getComponent(cc.Widget).updateAlignment();
        this.AdaptiveInterface();
    },

    AdaptiveIphonex() {
        this.iphonexWidth = 80;         //适配iphone的宽度偏移
        this.gamegroupView.width += this.iphonexWidth;
        for (let toggleNode of this.gamegroup.children) {
            toggleNode.x = this.iphonexWidth / 2;
        }
    },

    AdaptiveInterface() {
        this.interval = 20;
        this.leftInterval = 30;
        // 向 php 获取到当前游戏配置数量后进行UI展现
        glGame.gamelistcfg.reqGameGroup(() => {
            this.interFaceMode = glGame.gamelistcfg.get("interFaceMode");
            this.gameDisplayTypeList = glGame.gamelistcfg.get("gameDisplayTypeList");

            // 获取分类的宽度
            let gamegroupWidth = 0;
            if (this.interFaceMode == 1) {
                this.gamegroupView.active = true;
                this.gamegroupView.zIndex = 30;
                gamegroupWidth = this.gamegroupView.width + this.gamegroupView.getComponent(cc.Widget).left + this.leftInterval;
            } else {
                this.typeIndex = "_0";
                this.gamegroupView.active = false;
                gamegroupWidth = this.interval * 2;
                glGame.emitter.emit("setplazabg", { width: this.gamegroupView.width });//更换大厅背景图
            }

            // 获取banner的宽度
            let billboardsData = glGame.user.reqBillboardsData;
            let bannerWidth = 0;
            // 校验方式为服务端如无数据则默认为开启
            if (billboardsData.switch != BANNER_START.OFF) {
                // scrollview的监听相互影响，所以根据坐标属性放入父节点避免监听相互干扰
                this.banner = glGame.panel.showChildPanel(this.prefab_banner, this.node.parent);
                this.banner.x = -this.node.width / 2 + gamegroupWidth + this.banner.width / 2;
                bannerWidth = this.banner.width;
            }

            // 设置游戏列表的宽度
            this.allInterface.width = this.node.width - gamegroupWidth - bannerWidth - this.interval - this.leftInterval;
            this.allInterface.getComponent(cc.Widget).updateAlignment();
            this.allInterface.getChildByName("view").getComponent(cc.Widget).updateAlignment();

            // 初始化游戏数据
            this.getGamesList();
        })
    },

    // 获取游戏数据
    getGamesList(){
        let gameDisplayType = glGame.gamelistcfg.get("gameDisplayType");
        let gameDisplayToken = glGame.gamelistcfg.get("gameDisplayToken");

        // 获取对应的数据列表
        let token = cc.sys.localStorage.getItem("gametoken");
        if (gameDisplayToken != token && gameDisplayType == 1) {
            console.log("center_sort ===> 从网络获取");
            let msg = { "type": gameDisplayType }
            glGame.gamelistcfg.reqGamesList(msg, () => {
                this.gamesList = glGame.gamelistcfg.get("gamesList");
                cc.sys.localStorage.setItem("gametoken", gameDisplayToken);
                glGame.storage.setItem("gamedata", this.gamesList);

                if (this.interFaceMode == 1) {
                    console.log("center_sort ===> 有分类展示");
                    this.setGamegRoup();
                } else {
                    console.log("center_sort ===> 无分类展示");
                    this.initData();
                }
            })
        } else {
            console.log("center_sort ===> 从本地获取");
            this.gamesList = glGame.storage.getItem("gamedata");
            glGame.gamelistcfg.selfGameList(this.gamesList);
            if (this.interFaceMode == 1) {
                console.log("center_sort ===> 有分类展示");
                this.setGamegRoup();
            } else {
                console.log("center_sort ===> 无分类展示");
                this.initData();
            }
        }
    },

    // 初始无分类数据
    initData() {
        if (this.interFaceMode == 2) {
            let gameListArray = Object.values(this.gamesList)
                .filter(item => item.id !== 5)
                .map(item => Object.values(item.gameList))

            let result = {}
            gameListArray.forEach(item => {
                item.forEach(item => {
                    result[item.id] = item
                })
            })

            this.gamesList["_0"] = {};
            this.gamesList["_0"].id = 0;
            this.gamesList["_0"].name = "全部游戏"
            this.gamesList["_0"].gameList = result;

            this.typeIndex == "_5" ? this.initRoomList() : this.initList();
        }
    },

    //设置显示的分组
    setGamegRoup() {
        for (let i = 0; i < this.gameDisplayTypeList.length; i++) {
            let id = this.gameDisplayTypeList[i].id;
            let platform_node = this.gamegroup.getChildByName(groupId[id]);
            platform_node.zIndex = i;
            platform_node.typeIndex = `_${id}`;

            if (this.typeIndex == null) {
                this.typeIndex = `_${id}`;
                this.firstTimeTag = true;
                let m_toggle = platform_node.getComponent(cc.Toggle);
                if (m_toggle.isChecked) {
                    console.log("center_sort ===> this.typeIndex为空");
                    this.typeIndex == "_5" ? this.initRoomList() : this.initList();
                }
                m_toggle.check();
                glGame.emitter.emit("setplazabg", { name: groupId[id], width: this.gamegroupView.width });//更换大厅背景图
            } else {
                if (this.typeIndex == `_${id}`) {
                    let m_toggle = platform_node.getComponent(cc.Toggle);
                    if (m_toggle.isChecked) {
                        console.log("center_sort ===> this.typeIndex不为空");
                        this.typeIndex == "_5" ? this.initRoomList() : this.initList();
                    }
                    m_toggle.check();
                    glGame.emitter.emit("setplazabg", { name: groupId[id], width: this.gamegroupView.width });//更换大厅背景图
                }
            }
            platform_node.active = true;
        }
    },

    onClick(name, node) {
        console.log("center_sort ===> 点击按钮", name, node)
        switch (name) {
            case "hot": case "chessCard": case "arcade":
            case "fishing": case "realPerson": case "sports":
            case "lottery": case "compete":
                this.switchInterface(name, node);
                break;
            case "room":
                this.switchRoom(name, node);
                break;
            default:
                if (!isEnableHotUpdate) break;
                if (name.indexOf("_") !== -1) {
                    // 进入三方游戏
                    let sf_game_list = this.gamesList[this.typeIndex].gameList;
                    // glGame.emitter.emit(MESSAGE.UI.WEBVIEW_ON, { gamesList: sf_game_list[name], type: 1 });

                    glGame.gamelistcfg.openTripartiteGame({ gamesList: sf_game_list[name], type: 1 });
                }
                break;
        }
    },

    // 游戏分类切换
    switchInterface(name, node) {
        if (this.banner) this.banner.active = true;
        if (this.roomInterface) this.roomInterface.active = false;
        this.allInterface.active = true;
        // 设置分页id
        this.typeIndex = node.typeIndex;
        glGame.emitter.emit("setplazabg", { name: name, width: this.gamegroupView.width });//更换大厅背景图
        this.initList();
    },

    // 进入创建房间切换
    switchRoom(name, node) {
        if (this.banner) this.banner.active = false;
        this.allInterface.active = false;
        // 设置分页id
        this.typeIndex = node.typeIndex;
        glGame.emitter.emit("setplazabg", { name: name, width: this.gamegroupView.width });//更换大厅背景图
        this.initRoomList();
    },

    //根据index生成相应游戏列表
    initList() {
        let scrollTime = 0.25,   //图标移动时间
            everyTime = 0.05,    //图标移动间隔时间
            distance = 30,       //图标弹动距离
            distanceTime = 0.1;  //图标弹动时间

        let tempX = 9,//图标之间的间隔
            gameitemWidth = 327;//item大小

        let gameGroup = this.gamesList[this.typeIndex].gameList;

        // 屏蔽web版网页游戏
        let game_list = [];
        Object.values(gameGroup).forEach(item => {
            if (!isEnableHotUpdate && item.id > 9999) return;
            game_list.push(item)
        })

        // 获取需要展示节点的位置
        let posArr = this.getPosArr(game_list);

        this.allInterface.getComponent(cc.ScrollView).stopAutoScroll();
        let view = this.allInterface.getChildByName("view");
        view.getComponent(cc.Widget).updateAlignment();
        let viewWidth = view.width;
        let content = view.getChildByName("content");
        content.destroyAllChildren();
        content.removeAllChildren();
        content.x = 0;

        glGame.fileutil.readPrefab(glGame.panel.plazaPanelDict["gameitem"]).then(prefab => {
            let game_length = 0; //统计展示游戏的数量

            for (let i = 0; i < game_list.length; i++) {
                let id = game_list[i].id;
                // 三方游戏的处理
                if (id > 9999) {
                    let newPrefab = cc.instantiate(this.btnWebGame);
                    newPrefab.parent = content;
                    newPrefab.name = "_" + id;
                    newPrefab.active = true;
                    // 设置游戏名称
                    newPrefab.getChildByName("game_name").getComponent(cc.Label).string = game_list[i].gameName;
                    // 设置角标
                    if (game_list[i].tag > 0) {
                        let cornerMark = newPrefab.getChildByName("cornerMark");
                        let corner_mark = this.atlas_corner_mark.getSpriteFrame(`img_corner_mark${game_list[i].tag}`);
                        cornerMark.getComponent(cc.Sprite).spriteFrame = corner_mark;
                        cornerMark.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[game_list[i].tag];
                        cornerMark.active = true;
                    }
                    // 设置游戏图标
                    if (game_list[i].icon) {
                        let url = glGame.user.get('url').resource_url;
                        glGame.panel.showRemoteImage(newPrefab.getChildByName("game_icon"), url + game_list[i].icon);
                    }

                    game_length++;
                } else {
                    // 添加自己的游戏
                    let panel = cc.instantiate(prefab);
                    panel.parent = content;
                    panel.position = cc.v2(0, cc.winSize.height + panel.height);
                    panel.getComponent(panel.name).resetData();
                    panel.getComponent(panel.name).initUI(game_list[i]);
                    panel.name = `${id}`;
                    game_length++;
                }
            }

            //设置scrollview.width
            let width = Math.ceil(game_length / 2) * (gameitemWidth + tempX);
            content.width = width < viewWidth ? viewWidth : width;

            if (this.firstTimeTag) {
                // 判断第一次不执行
                this.firstTimeTag = false;
                for (let i = 0; i < game_length; i++) {
                    content.children[i].position = posArr[i];
                }
            } else {
                // 执行动画
                for (let i = 0; i < game_length; i++) {
                    let item = content.children[i];
                    item.position = cc.v2(posArr[i].x + viewWidth, posArr[i].y);
                    item.runAction(cc.sequence(
                        cc.moveTo(scrollTime + everyTime * i, posArr[i].x - distance, posArr[i].y),
                        cc.moveTo(distanceTime, posArr[i]),
                    ))
                }
            }
        });

        this.setCategoryData();
    },

    //获得展示节点的位置
    getPosArr(list) {
        let posX = 164, posY = [130, -180], posArr = [];
        for (let i = 0; i < list.length; i++) {
            let index = i % 2;
            posArr.push(cc.v2(index == 0 && i != 0 ? posX += 336 : posX, posY[index]));
        }
        console.log("这是当前所需要的位置列表", posArr)
        return posArr;
    },

    initRoomList() {
        if (!this.gamesList) return;
        let room_gameGroup = this.gamesList[this.typeIndex];
        this.roomInterface = this.node.getChildByName("room_field")
        if (!this.roomInterface) {
            this.roomInterface = cc.instantiate(this.prefab_room_field);
            this.roomInterface.parent = this.node;
            this.roomInterface.position = cc.v2(cc.winSize.width / 2, 0);
            this.roomInterface.zIndex = 10;
        }
        this.roomInterface.active = true;
        this.roomInterface.getComponent(this.roomInterface.name).initData(room_gameGroup);

        this.setCategoryData();
        this.firstTimeTag = false;
    },

    // 设置现在在那个分类
    setCategoryData() {
        console.log("center_sort ===> 设置现在在那个分类", this.typeIndex)
        glGame.isCategoryData.typeIndex = this.typeIndex;
    },

    OnDestroy() {

    },
});

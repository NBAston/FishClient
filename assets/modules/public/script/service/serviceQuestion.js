
glGame.baseclass.extend({

    properties: {
        item: cc.Node,
        item1: cc.Node,
        content: cc.Node,
    },

    onLoad() {
        this.node.zIndex = 1001;
        this.pageSize = 10;
        this.page = 1;
        this.isReceive = false;
        this.customList = [];
        this.severice = {};
        this.registerEvent()
        glGame.user.ReqCustomHelpList(this.page, this.pageSize, true);
        this.node.active = false;
    },
    registerEvent() {
        glGame.emitter.on("updateReqCustomHelpList", this.updateReqCustomHelpList, this);
    },
    unRegisterEvent() {
        glGame.emitter.off("updateReqCustomHelpList", this);
    },

    onClick(name, node) {
        switch (name) {
            case '': ; break;
            case '': ; break;

        }
    },

    updateReqCustomHelpList(data) {
        this.node.active = true;
        this.severice.page = data.page;
        this.severice.page_size = data.pageSize;
        this.severice.total_page = data.totalPage;
        if (!this.severice.list) this.severice.list = data.list;
        else this.severice.list = this.severice.list.concat(data.list);
        this.initQuestion();
        // this.initQuestion1();
    },

    customData() {
        // this.severice = glGame.user.get("customSever").result;
        // console.log('客服信息111question',this.severice)
        // this.initQuestion();
    },
    initQuestion1() {
        this.isReceive = true;
        this.contenHeight = 0;
        for (let i = (this.page - 1) * this.pageSize; i < this.severice.list.length; i++) {
            let cowItem = cc.instantiate(this.item);
            cowItem.active = false;
            cowItem.parent = this.content;
            cowItem.children[0].getComponent(cc.Label).string = 'Q：' + this.severice.list[i].title,
                cowItem.children[1].getComponent(cc.RichText).string = 'A：' + this.severice.list[i].content,
                this.customList.push(this.severice.list[i])
            this.contenHeight += cowItem.height
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true);
    },

    initQuestion() {
        this.isReceive = true;
        this.contenHeight = 0;
        for (let i = (this.page - 1) * this.pageSize; i < this.severice.list.length; i++) {
            let cowItem = cc.instantiate(this.item1);
            cowItem.active = false;
            cowItem.parent = this.content;
            cowItem.name = "item" + i
            // 展示的内容
            cowItem.children[0].children[0].getComponent(cc.RichText).string = 'A：' + this.severice.list[i].content;
            // 展示标题
            cowItem.children[1].children[0].getComponent(cc.Label).string = 'Q：' + this.severice.list[i].title;
            this.customList.push(this.severice.list[i])
            this.contenHeight += cowItem.height
            glGame.panel.showEffectNode(this, this.content, 0.02, true);
        }
    },

    start() {

    },
    onScrollEvent(scroll, event) {
        for (let i = 0; i < this.pageSize; i++) {
            if (this.severice.list[i] == null) {
                this.isReceive = false;
            }
        }
        if (event === cc.ScrollView.EventType.SCROLL_TO_BOTTOM && this.isReceive == true) {
            if (this.contenHeight >= 400) {
                this.page++;
                if (this.page > this.severice.total_page) return;
                this.isReceive == false;
                glGame.user.ReqCustomHelpList(this.page, this.pageSize);
            }
        }
    },

    onClick(name, node) {
        switch (name) {
            case "title_bg":
                for (let index = 0; index < this.content.childrenCount; index++) {
                    if (this.content.children[index].name == node.parent.name && node.parent.children[0].active) continue;
                    this.content.children[index].children[0].active = false;
                    this.content.children[index].children[1].children[1].scaleY = 1;
                }
                node.parent.children[0].active = !node.parent.children[0].active;
                if (node.parent.children[0].active) {
                    node.children[1].scaleY = -1;
                } else {
                    node.children[1].scaleY = 1;
                }
                break;
        }
    },
    
    OnDestroy() {
        this.unRegisterEvent();
    }
    // update (dt) {},
});

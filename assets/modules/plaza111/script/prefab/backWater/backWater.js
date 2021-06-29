/**
 * 返水信息面板
 * 有效投注*比例 = 返水金额
 * 今日有效投注 = 总的子游戏有效投注之和
 * 今日预计返水 = 总的子游戏返水金额之和
 */
const GAMETYPE = {
    CHESS:1,    //棋牌版
    COMPLEX:2,  //综合版
}

glGame.baseclass.extend({
    properties: {
        sonPanel: cc.Node,
    },

    onLoad() {
        this.gameDisplayType = glGame.user.get("gameDisplayType");
        this.registerEvent();
        this.showPanel("mywater");
        glGame.panel.showEffectPariticle(this.node);
    },

    start() {

    },

    registerEvent() {
        glGame.emitter.on(MESSAGE.UI.FORBIDDEN_BACKWATER, this.onForbbidden, this);
    },

    unRegisterEvent() {
        glGame.emitter.off(MESSAGE.UI.FORBIDDEN_BACKWATER, this);
    },

    OnDestroy() {
        this.unRegisterEvent();
    },
    onClick(name, node) {
        switch (name) {
            case "close": this.remove(); break;
            case "mywater":
            case "rateexplain":
            case "record":
                this.showPanel(name);
                break;
            default: break;
        }
    },

    onForbbidden() {
        glGame.user.rebateSwitchEx = 0;
        glGame.panel.showMsgBox("该功能暂未开放", "该功能暂未开放",
            () => { this.remove(); })
    },

    //隐藏所有界面
    hideAllPanel() {
        if (!this.sonPanel.childrenCount) return;
        for (let i = 0; i < this.sonPanel.childrenCount; i++) {
            this.sonPanel.children[i].active = false;
        }
    },
    //显示某个界面。按名字来显示
    showPanel(panelName) {
        // this.gameDisplayType = GAMETYPE.CHESS;
        this.hideAllPanel()
        let panellist = {}
        panellist["mywater"] = this.gameDisplayType == GAMETYPE.CHESS ? "mybackWater" :"mybackWater_complex";
        panellist["rateexplain"] = this.gameDisplayType == GAMETYPE.CHESS ? "porpor" :"porpor_complex";;
        panellist["record"] = "waterrecord";

        if (this.sonPanel.getChildByName(panellist[panelName])) {
            this.sonPanel.getChildByName(panellist[panelName]).active = true;
            return;
        }

        glGame.panel.getPanelByName(panellist[panelName]).then(panelData => { panelData.parent = this.sonPanel; })
    },
});

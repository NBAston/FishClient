glGame.baseclass.extend({
    properties: {
        scalecommission: cc.Prefab
    },
    onLoad() {
        this.pandectdata = null;
        this.ruleDetaildata = null;
    },


    onClick(name, node) {
        switch (name) {
            case "btn_brokerage": this.brokerage(); break;
            default: break;
        }
    },

    initUI(pandectdata, ruleDetaildata) {
        this.pandectdata = pandectdata;
        this.ruleDetaildata = ruleDetaildata;
    },

    brokerage() {
        let scalecommission = glGame.panel.showChildPanel(this.scalecommission, this.node.parent.parent);
        let script = scalecommission.getComponent("scalecommission");
        script.initUI(this.ruleDetaildata, this.pandectdata.data.achievement);
    },

    OnDestroy() {

    },
});

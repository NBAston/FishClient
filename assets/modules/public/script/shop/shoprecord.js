const rechargeType = {
    1:"代理充值",
    2:"专享闪付",
    3:"快捷支付",
    4:"支付宝充值",
    5:"微信充值",
    6:"银行卡充值",
    7:"云闪付支付",
    100:"其他"
}
const rechargestate = {
    2:"处理中",
    3:"处理中",
    4:"充值成功",
    6:"充值失败",
    7:"充值成功",
    10:"充值成功",
}
glGame.baseclass.extend({
    properties: {
        content:cc.Node,
        Item:cc.Node,
        curPage:cc.Label,
        totalPage:cc.Label
    },
    onLoad() {
        this.page = 1
        this.record = {};
        this.color = {
            2:cc.color(49,214,255),
            3:cc.color(49,214,255),
            4:cc.color(70,255,0),
            6:cc.color(255,0,0),
            7:cc.color(70,255,0),
        }
       this.ReqPayOrderList();
    },
    ReqPayOrderList(){
        if (this.record[this.page]) {
            this.curPage.string = this.page;
            this.setTable(this.record[this.page]);
            return
        }
        console.log("请求当前的页数",this.page)
        glGame.gameNet.send_msg('http.ReqPayOrderList', {page: this.page, pageSize: 8}, (route, msg) => {
            this.record[this.page] = msg.result.data;
            this.curPage.string = this.page;
            this.totalPage.string = msg.result.pageTotal
            this.setTable(msg.result.data)
            console.log("这是创建订单的记录", msg);
        })
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.btn_closeCb(); break;
            case "btn_upPage": this.upPage(); break;
            case "btn_downPage": this.downPage(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    setTable(data){
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        this.node.getChildByName("img_wujilu").active = data.length == 0;
        this.node.getChildByName("pageLayout").active = data.length > 0;
        this.node.getChildByName("btn_upPage").active = data.length > 0;
        this.node.getChildByName("btn_downPage").active = data.length > 0;
        this.node.getChildByName("bg").getChildByName("tip").active = data.length > 0;
        for(let i=0;i<data.length;i++){
            let Item = cc.instantiate(this.Item);
            Item.parent = this.content;
            Item.active = false;
            Item.getChildByName("number").getComponent(cc.Label).string = data[i].orderSn;
            Item.getChildByName("coin").getComponent(cc.Label).string = `${this.getFloat(data[i].rechargeMoney)}元`;
            glGame.panel.settingTableLabelColor(Item.getChildByName("coin"));
            Item.getChildByName("time").getComponent(cc.Label).string = data[i].rechargeTime;
            Item.getChildByName("type").getComponent(cc.Label).string = rechargeType[data[i].rechargeType]?rechargeType[data[i].rechargeType]:'其他';
            Item.getChildByName("state").getComponent(cc.Label).string = rechargestate[data[i].rechargeState];
            Item.getChildByName("state").color = this.color[data[i].rechargeState];
            Item.getChildByName("bg").active = i%2 != 0
        }
        glGame.panel.showEffectNode(this,this.content,0.02,true);
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    upPage() {
        if (this.page - 1 < 1) {
            return
        }
        this.page--;
        this.ReqPayOrderList();
    },
    downPage() {
        if (this.page + 1 > Number(this.totalPage.string)) {
            return
        }
        this.page++;
        this.ReqPayOrderList();
    },
    btn_closeCb() {
        this.remove();
    },
    OnDestroy() {

    }
});
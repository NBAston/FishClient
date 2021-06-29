/**
 * 公告面板
 */
glGame.baseclass.extend({
    properties: {
        noticecontent: cc.Label     // 公告内容
    },
    onLoad () {
        glGame.gameNet.send_msg("http.reqHorseRaceLamp", null, (route, data)=>{
            this.noticecontent.string = data.result.horse_race_lamp;
        })
    },
    onClick (name, node) {
        switch (name) {
            case "close": this.click_close(); break;
            default: console.error("no find button name -> %s", name);
        }
    },
    click_close () {
        glGame.panel.showInterface();//判断是否要开启下一个界面
        this.remove(); 
    }
});

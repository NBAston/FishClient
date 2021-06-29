/**
 * 三个弹出的顺序：紧急公告，游客注册，七日签到;
 */

const WEBVIEW_NORMAL = 0;
const WEBVIEW_EXIT = 1;
const WEBVIEW_ERROR = 2;

const WebViewEx = require('./WebViewEx');

glGame.baseclass.extend({
    properties: {
        plaza_hall: cc.Prefab,
    },
    onLoad() {
        this.game_web = null;
        this.webview_mask = null;
        glGame.emitter.on("updatePlazaSwitch", this.updatePlazaSwitch, this);
        glGame.emitter.on(MESSAGE.UI.WEBVIEW_ON, this.gameWebStart, this);
        glGame.emitter.on(MESSAGE.UI.WEBVIEW_OFF, this.gameWebExit, this);
        glGame.emitter.on("floatButton", this.onFloatButton, this);

        if (glGame.isfirstEnterPlaza) {
            this.node.stopAllActions();
            this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(() => {
                this.checkShowPanel();
            })));
        }

        // glGame.user.reqHomeView();
        this.plazaNode = glGame.panel.showPanel(this.plaza_hall);
        this.showHriseRaceLamp();
        this.showRegister();
        glGame.panel.closelimitJuhua();

        let clickAction = cc.director.getScene().getChildByName("click_action");
        if(clickAction) {
            clickAction.active = true;
        }
    },

    start() {
        // glGame.panel.showJuHua();
    },
    updatePlazaSwitch() {
        this.checkShowPanel();
    },

    showHriseRaceLamp() {
        let width = 1190, height = 68;
        let showsize = cc.size(this.node.width * 0.65, height);
        let bpersist = false;
        glGame.panel.showRollNotice(cc.v2(this.node.width / 2 + 439 / 2, this.node.height - 185), showsize, bpersist);
        glGame.notice.enterPlaza();
        if (glGame.scene.getUpScene() != glGame.scenetag.LOGIN) {
            glGame.notice.reqGetHorseRaceLamp();
        }
    },

    showRegister() {
        let arr = [];
        if (glGame.user.registerGetCoin && glGame.user.registerGetCoin > 0) arr.push({ type: glGame.awardtype.COIN, value: glGame.user.cutFloat(glGame.user.registerGetCoin) });
        if (glGame.user.registerGetDiamond && glGame.user.registerGetDiamond > 0) arr.push({ type: glGame.awardtype.DIAMOND, value: glGame.user.cutFloat(glGame.user.registerGetDiamond) });
        console.log("这是当前的数组", glGame.user.registerGetCoin, glGame.user.registerGetDiamond, arr)
        if (arr.length > 0) {
            glGame.panel.showAwardBox(glGame.tips.PLAZA.CONGRATULATE, arr, () => { glGame.user.resetAward(); });
        }
    },

    /**
     * 第一次进入大厅，判断需要弹出哪些弹窗
     */
    checkShowPanel() {
        glGame.panel.plazaShowPanel = [];
        // glGame.panel.hidejuhua();
        let isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
        // 1.每天启动第一次弹出
        // 2.安装后第一次进入弹出
        //new Date(new Date().toLocaleDateString()).getTime();
        if (cc.sys.platform == cc.sys.IPHONE) {
            let nowTime = new Date(new Date().toLocaleDateString()).getTime();
            if (!isShowSetupPanel) {
                glGame.storage.setItem('isShowSetupPanel', { isSetup: false, time: nowTime });
                glGame.panel.pushPlazaShowPanel("setupRepairTool");
            } else if (!isShowSetupPanel.isSetup
                && glGame.user.get("url").repair_switch
                && glGame.user.get("url").repair_switch == 1
                && isShowSetupPanel.time < nowTime) {
                isShowSetupPanel.time = nowTime;
                glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
                glGame.panel.pushPlazaShowPanel("setupRepairTool");
            }
        }
        if (!glGame.isfirstEnterPlaza) return
        if (!glGame.panel.showSuspicious()) {
            glGame.panel.pushPlazaShowPanel("urgentnotice")
        }
        if (glGame.user.isTourist() && glGame.user.get('tips') && glGame.isfirstEnterPlaza) {
            glGame.panel.pushPlazaShowPanel("touristtip")
        }
        if (glGame.user.get("sign_state")) {
            glGame.panel.pushPlazaShowPanel("signin")
        }
        if (glGame.user.get("loginSwitch").activity_pop_up == 2) {
            glGame.panel.pushPlazaShowPanel("announcement");
        } else if (glGame.user.get("loginSwitch").activity_pop_up == 3) {
            let isAnnouncement = glGame.storage.getItem('isAnnouncement');
            let nowTime = new Date(new Date().toLocaleDateString()).getTime();
            if (!isAnnouncement) {
                glGame.storage.setItem('isAnnouncement', { time: nowTime });
                glGame.panel.pushPlazaShowPanel("announcement");
            } else if (isAnnouncement.time < nowTime) {
                isAnnouncement.time = nowTime;
                glGame.storage.setItem('isAnnouncement', isAnnouncement);
                glGame.panel.pushPlazaShowPanel("announcement");
            }
        }
        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
    },

    /**
     * 设置回调
     * @param {*} target        //webview 对象 
     * @param {*} url           //回调scheme,带参数  scheme://state:0&code:0
     *                                      --state:状态（int）0为无状态 1为退出状态  2错误状态  
     *                                      --code:错误信息 --> 错误码(int)
     */
    jsCallback(target, url) {
        //this.game_web.url = "";
        var str = url.replace(this.scheme + '://', ''); // str === 'a=1&b=2'
        let strData = str.split("&"), data = {};
        data.state = Number(strData[0].replace("state:", ""));
        data.code = Number(strData[1].replace("code:", ""));
        if (data.state == WEBVIEW_NORMAL && data.code == 0) {
            this.gameWebOpen();
        } else if (data.state != WEBVIEW_NORMAL && data.code != 0) {
            this.gameWebExit();
            glGame.platform.changeOrientation(true);
            glGame.systemclass.changeOrientation(true);
            glGame.platform.offSuspension();
            if (data.state == WEBVIEW_ERROR && THIRD_CODE[data.code]) glGame.panel.showTip(THIRD_CODE[data.code]);
        }
    },

    /**
     * 创建widget  全屏铺满
     * @param {object} adNode 需要添加的node对象
     */
    addNodeWidget(adNode) {
        var webWidget = adNode.addComponent(cc.Widget);
        webWidget.isAlignTop = true;
        webWidget.isAlignBottom = true;
        webWidget.isAlignLeft = true;
        webWidget.isAlignRight = true;
        webWidget.top = 0;
        webWidget.bottom = 0;
        webWidget.left = 0;
        webWidget.right = 0;
        webWidget.alignMode = cc.Widget.AlignMode.ALWAYS;
        return webWidget;
    },

    /**
     * 动态创建web
     */
    gamewebNew() {
        if (this.game_web) return;

        if (!this.webview_mask) {
            this.webview_mask = cc.instantiate(glGame.panel.gameMaskPanel);
            this.webview_mask.parent = cc.director.getScene();
        }

        var webNode = new cc.Node();

        webNode.size = cc.size(this.node.width, this.node.height);
        this.addNodeWidget(webNode);

        if(cc.sys.isBrowser) {
            this.game_web = webNode.addComponent(WebViewEx);
            this.showFloatButton();
        } else {
            this.game_web = webNode.addComponent(cc.WebView);
            this.scheme = "ongamedata";
            this.game_web.setJavascriptInterfaceScheme(this.scheme);
            this.game_web.setOnJSCallback(this.jsCallback.bind(this));
        }

        this.node.addChild(webNode);
        this.plazaNode.active = false;
    },

    gameWebStart(data) {
        if(cc.sys.isBrowser) {
            this.preHandleH5(data);
        } else {
            this.preHandleNative(data);
        }
    },

    // 原生平台预处理
    preHandleNative(data) {
        this.gamewebNew();
        this.game_web.url = glGame.user.getWebGameUrl(data.gameid);
        glGame.audio.pauseAllMusic();
        this.scheduleOnce(this.changeOrientation, 1);
    },

    // h5平台预处理
    preHandleH5(data) {
        glGame.gameNet.send_msg("http.ForwardH5", {g: data.gameid}, (route, msg) => { 
            let data = msg.result;
            this.gamewebNew();
            let url = data.url;
            if(data.action == 'post') {
                url = glGame.user.getWebGameUrlH5(data.url);
            }

            this.game_web.url = url;
            glGame.audio.pauseAllMusic();
            this.scheduleOnce(this.changeOrientation, 1);
        });
    },

    changeOrientation() {
        glGame.platform.changeOrientation(false);
    },

    gameWebOpen() {
        let sendData = {};
        sendData.data = glGame.gameNet.getNetMgr().getLoginToken()
        sendData = JSON.stringify(sendData);
        this.game_web.evaluateJS(`check(${sendData})`);
    },

    gameWebExit() {
        this.unschedule(this.changeOrientation);
        this.plazaNode.active = true;
        if (this.game_web != null) {
            this.game_web.url = "";
            //this.game_web.node.removeFromParent(true);
            this.game_web.node.destroy();
            this.game_web = null;
            if (this.webview_mask) {
                this.webview_mask.destroy();
                this.webview_mask = null;
            }
            glGame.audio.continueAllMusic();
            this.scheduleOnce(() => {
                if (!this.game_web) glGame.gameNet.send_msg("http.reqBack", {}, (route, msg) => { });
            }, 1);
        }
    },

    showFloatButton() {
        let drager = document.getElementById('drager');
        if(drager)
            drager.style.visibility = "visible";
    },

    hideFloatButton() {
        let drager = document.getElementById('drager');
        if(drager)
            drager.style.visibility = "hidden";
    },

    onFloatButton() {
        this.hideFloatButton();
        this.gameWebExit();
    },

    OnDestroy() {
        glGame.emitter.off("updatePlazaSwitch", this);
        glGame.emitter.off(MESSAGE.UI.WEBVIEW_ON, this);
        glGame.emitter.off(MESSAGE.UI.WEBVIEW_OFF, this);
        glGame.emitter.off("floatButton", this);
    },
});

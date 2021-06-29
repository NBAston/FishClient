glGame.baseclass.extend({
    properties: {
        scalecommission: cc.Prefab,
        activemember: cc.Prefab,
        //myinfo
        mylogicID: cc.Label,
        myName: cc.Label,
        myhead: cc.Node,
        myVipLevel: cc.Label,
        lb_daili: cc.Label,
        lb_rebate: cc.Label,

        //预计
        commission: cc.Label,
        pDirectCommission: cc.Label,
        pContributeSubCommission: cc.Label,
        directAchievement: cc.Label,
        teamAchievement: cc.Label,

        //昨日
        yesterdayCommission: cc.Label,
        yDirectCommission: cc.Label,
        yContributeSubCommission: cc.Label,
        yDirectAchievement: cc.Label,
        yTeamAchievement: cc.Label,

        //团队
        teamEffectiveNumber: cc.Label,
        directNumber: cc.Label,
        directNumberNow: cc.Label,
        subNumber: cc.Label,
        subNumberNow: cc.Label,
        effectiveNumber: cc.Label,

        //可领取佣金
        historyCommission: cc.Label,
        canReceiveExtension: cc.Label,

        //有效成员按钮
        btn_validaward: cc.Node,

        //二维码
        node_QRcode: cc.Node,
        
        save_QRcode: cc.Node,
        node_QRcodeScreenshot: cc.Node,
        QRcodeCamera: cc.Camera,
    },
    onLoad() {
        glGame.emitter.on("activeRedclose", this.activeRedclose, this);
        this.isAftetrDraw = false;
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
            this.isAftetrDraw = true;
        });
    },

    onClick(name, node) {
        switch (name) {
            case "btn_getbrokerage": this.getbrokerageCB(); break;
            case "btn_brokerage": this.brokerage(); break;
            case "btn_validaward": this.validaward(); break;
            //二维码
            case "btn_sharefriend": this.sharefriend(); break;
            case "btn_sharefriendscircle": this.sharefriendscircle(); break;
            case "btn_copy": this.copyCB(); break;
            case "btn_saveqrcode": this.saveqrcode(); break;
            default: break;
        }
    },
    activeRedclose() {
        this.btn_validaward.getChildByName("redmark").active = false
    },

    initUI(pandectdata, ruleDetaildata) {
        this.pandectdata = pandectdata;
        this.ruleDetaildata = ruleDetaildata;

        this.mylogicID.string = glGame.user.get("logicID");
        this.myName.string = glGame.user.get("nickname");
        this.myVipLevel.string = glGame.user.get("vip_name");
        glGame.panel.showHeadImage(this.myhead, glGame.user.get("headURL"));

        this.btn_validaward.getChildByName("redmark").active = pandectdata.reward_red_dot == 1
        if (this.pandectdata.data.achievement >= this.ruleDetaildata[0].exp) {
            if (this.pandectdata.data.achievement >= this.ruleDetaildata[this.ruleDetaildata.length - 1].exp) {
                this.lb_daili.string = this.ruleDetaildata[this.ruleDetaildata.length - 1].level;
                this.lb_rebate.string = `每万返佣${this.getFloat(this.ruleDetaildata[this.ruleDetaildata.length - 1].reward)}元`;
            } else {
                for (let i = 0; i < this.ruleDetaildata.length; i++) {
                    if (this.pandectdata.data.achievement < this.ruleDetaildata[i].exp) {
                        this.lb_daili.string = this.ruleDetaildata[i - 1].level;
                        this.lb_rebate.string = `每万返佣${this.getFloat(this.ruleDetaildata[i - 1].reward)}元`;
                        break;
                    }
                }
            }
        } else {
            this.lb_daili.string = `未达到最低条件`;
            this.lb_rebate.string = `0`;
        }

        //up


        //mid
        //今日佣金
        this.commission.string = this.getFloat(this.pandectdata.data.commission);
        this.pDirectCommission.string = this.getFloat(this.pandectdata.data.direct_commission);
        this.pContributeSubCommission.string = this.getFloat(this.pandectdata.data.sub_commission);
        this.directAchievement.string = this.getFloat(this.pandectdata.data.direct_achievement);
        this.teamAchievement.string = this.getFloat(this.pandectdata.data.achievement);


        //昨日佣金
        this.yesterdayCommission.string = this.getFloat(this.pandectdata.data.yesterday_commission);
        this.yDirectCommission.string = this.getFloat(this.pandectdata.data.yesterday_direct_commission);
        this.yContributeSubCommission.string = this.getFloat(this.pandectdata.data.yesterday_sub_commission);
        this.yDirectAchievement.string = this.getFloat(this.pandectdata.data.yesterday_direct_achievement);
        this.yTeamAchievement.string = this.getFloat(this.pandectdata.data.yesterday_achievement);


        //团队佣金`${this.pandectdata.data.effective_number}/${this.pandectdata.data.direct_effective_number}`
        this.teamEffectiveNumber.string = `${this.pandectdata.data.effective_number}`

        this.directNumber.string = `${this.pandectdata.data.direct_number}`;
        this.directNumberNow.string = `(${this.pandectdata.data.new_direct_number > 0 ? '+' : ''}${this.pandectdata.data.new_direct_number})`

        this.subNumber.string = `${this.pandectdata.data.sub_number}`;
        this.subNumberNow.string = `(${this.pandectdata.data.new_sub_number > 0 ? '+' : ''}${this.pandectdata.data.new_sub_number})`

        this.effectiveNumber.string = `${this.pandectdata.data.direct_effective_number}`

        //可领取佣金
        this.historyCommission.string = this.getFloat(this.pandectdata.data.history_commission);
        this.canReceiveExtension.string = this.getFloat(this.pandectdata.data.can_receive_extension);

        // 设置有效成员显示
        this.btn_validaward.active = this.pandectdata.reward_show == 1;

        //处理二维码
        this.initShareQRcodeUI();
    },
    getFloat(value) {
        return (Number(value).div(100)).toString();
    },
    ReqAccountsShare() {
        glGame.gameNet.send_msg('http.ReqAccountsShare', {}, (route, msg) => { })
    },
    getbrokerageCB() {
        if (this.pandectdata.data.can_receive_extension < this.pandectdata.extract_limit) {
            glGame.panel.showMsgBox("消息", glGame.tips.POPULARIZE.MINLIMIT.format(`${this.getFloat(this.pandectdata.extract_limit)}`), () => { })
            return;
        }
        glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessApply', {}, (route, msg) => {
            if (this.pandectdata.mode == 1) {
                let strTitle = glGame.tips.POPULARIZE.CONGRATULATE;
                glGame.panel.showAwardBox(strTitle, [{ type: glGame.awardtype.COIN, value: this.getFloat(this.pandectdata.data.can_receive_extension) }]);
            } else if (this.pandectdata.mode == 2) {
                glGame.panel.showMsgBox("", glGame.tips.POPULARIZE.APPLYSUCCESS.format(`${this.getFloat(this.pandectdata.data.can_receive_extension)}`));
            }

            glGame.user.ReqRedDot();
            glGame.user.reqGetCoin();
            glGame.emitter.emit("refreshPopularize");
        })
    },
    brokerage() {
        let scalecommission = glGame.panel.showChildPanel(this.scalecommission, this.node.parent.parent);
        let script = scalecommission.getComponent("scalecommission");
        script.initUI(this.ruleDetaildata, this.pandectdata.data.achievement)
    },
    validaward() {
        let activemember = glGame.panel.showChildPanel(this.activemember, this.node.parent.parent);
        let script = activemember.getComponent("activemember");
        script.initUI(this.pandectdata)
    },

    initShareQRcodeUI() {
        this.initCode();
        if (!glGame.isEnableHotUpdate) this.initCodeScreenshot();
    },

    //截屏用的对象
    initCodeScreenshot() {
        var qrcode = new QRCode(8, QRErrorCorrectLevel.H);
        qrcode.addData(this.pandectdata.data.promo_url);
        qrcode.make();

        var ctx = this.node_QRcodeScreenshot.getComponent(cc.Graphics);

        var tileW = this.node_QRcodeScreenshot.width / qrcode.getModuleCount();
        var tileH = this.node_QRcodeScreenshot.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                } else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        }
    },

    initCode() {
        var qrcode = new QRCode(8, QRErrorCorrectLevel.H);
        qrcode.addData(this.pandectdata.data.promo_url);
        qrcode.make();

        var ctx = this.node_QRcode.getComponent(cc.Graphics);

        var tileW = this.node_QRcode.width / qrcode.getModuleCount();
        var tileH = this.node_QRcode.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                } else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        }
    },

    //分享微信好友
    sharefriend() {
        //已安装微信
        if (cc.sys.isNative && glGame.isLoginSelect) {
            if (!this.checkWeChatApp()) return;
            let data = this.pandectdata.share_config;
            if (data.WX_SHARE_TYPE == 1) {
                glGame.platform.shareTotWX(data.WX_SHARE_TITLE, data.WX_SHARE_INFO, data.WX_SHARE_JUMP_URL, 0, data.WX_SHARE_IMG_URL);
            } else {
                glGame.platform.shareImage(data.WX_SHARE_IMG_URL, 0);
            }
            this.ReqAccountsShare();
        } else {
            glGame.servercfg.turnOtherApp(2);
        }
    },
    //分享微信朋友圈
    sharefriendscircle() {
        //已安装微信
        if (cc.sys.isNative && glGame.isLoginSelect) {
            if (!this.checkWeChatApp()) return;
            let data = this.pandectdata.share_config;
            if (data.WX_SHARE_TYPE == 1) {
                glGame.platform.shareTotWX(data.WX_SHARE_TITLE, data.WX_SHARE_INFO, data.WX_SHARE_JUMP_URL, 1, data.WX_SHARE_IMG_URL);
            } else {
                glGame.platform.shareImage(data.WX_SHARE_IMG_URL, 1);
            }
            this.ReqAccountsShare();
        } else {
            glGame.servercfg.turnOtherApp(2);
        }
    },

    copyCB() {
        glGame.platform.copyToClip(this.pandectdata.data.promo_url, glGame.tips.POPULARIZE.COPYLINKSUCCESS);
    },

    getQrCodePic() {
        if (!this.isAftetrDraw) {
            console.error("Not yet rendered from get qrcode!")
            return;
        }
        let texture = new cc.RenderTexture();
        texture.initWithSize(270, 270);
        this.save_QRcode.active = true;
        this.QRcodeCamera.targetTexture = texture;
        this.QRcodeCamera.alignWithScreen = false;
        this.QRcodeCamera.orthoSize = 140;
        this.QRcodeCamera.render();
        let data = texture.readPixels();
        if (cc.sys.isNative) {//真机
            let fileName = "Image";
            let fileType = ".png";
            let filePath = jsb.fileUtils.getWritablePath() + fileName + fileType;
            jsb.saveImageData(data, 270, 270, filePath)
            glGame.platform.saveToLocal(filePath);
        } else {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let width = canvas.width = texture.width = 270;
            let height = canvas.height = texture.height = 270;
            canvas.width = texture.width;
            canvas.height = texture.height;
            let rowBytes = width * 4;
            for (let row = 0; row < height; row++) {
                let srow = height - 1 - row;
                let imageData = ctx.createImageData(width, 1);
                let start = srow * width * 4;
                for (let i = 0; i < rowBytes; i++) {
                    imageData.data[i] = data[start + i];
                }
                ctx.putImageData(imageData, 0, row);
            }
            let str = canvas.toDataURL("image/png");
            let div = document.createElement("div");
            let img = new Image();
            img.onload = () => {
                let urlData = str;
                let arr = urlData.split(',');
                let mime = arr[0].match(/:(.*?);/)[1] || "image/png";
                let bytes = this.dataURItoBlob(urlData);
                textFileAsBlob = new Blob([bytes], { type: mime });
                let downloadLink = document.createElement("a");
                downloadLink.download = "qrcode.png";
                downloadLink.innerHTML = "Download File";
                if (window.webkitURL != null) {
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                } else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
                }
                downloadLink.click();
            };
            div.style.position = 'absolute';
            div.setAttribute('z-index', '99');
            img.src = str;
            div.appendChild(img);
        }
    },

    saveqrcode() {
        this.getQrCodePic();
    },

    //是否有安装微信
    checkWeChatApp() {
        //判断 是否有安装微信
        if (!glGame.platform.isWxAppInstalled()) {
            glGame.panel.showMsgBox("提示", glGame.tips.POPULARIZE.CANTFINDWX);
            return false;
        }
        return true;
    },
    //base64 解码 图片 转为 二进制字节数组
    dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);//base64 解码
        else {
            byteString = unescape(base64Data.split(',')[1]);
        }
        var ia = new Uint8Array(byteString.length);//创建视图
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return ia;
    },
    OnDestroy() {
        glGame.emitter.off("activeRedclose", this);
    },
});

let
    errorCode = require("NetCode"),
    NetErrorCheck = function () { },
    netErrorCheck = NetErrorCheck.prototype,
    g_instance = null,
    send_limit = 5;

netErrorCheck.enterPlaza = function () {
    if (cc.director.getScene().name != "plaza") {
        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
        glGame.scene.enterNextScene();
    }
}
/**
 * 网络消息错误检查
 * @param route
 * @param code
 * @param data
 * @returns Boolean
 */
netErrorCheck.CheckError = function (route, code, data) {

    if (code != null) code = parseInt(code);
    if (code != 500) {
        // 收到消息500 则继续重发直到发送次数限制.
        glGame.gameNet.getNetMgr().doneWithRoute(route, code);
    }
    //如果是登陆请求关闭转菊花
    if (route == 'http.reqLogin' || route == 'http.reqRegister' || route == 'http.reqPhoneRegister') {
        glGame.panel.closelimitJuhua();
    }

    //这个是服务器队列添加结果不予理会
    if (route == 'http.queResult')
        return console.log("收到了http.queResult");
    if (route != "onMarquee")
        console.log("收到了服务器的回复=", route, data);
    if (data) {
        if (data.coolingtime != null) {
            glGame.panel.showErrorTip(glGame.tips.ERRORTIP.OPERATETOOBUSY.format(`${data.coolingtime}`));
            return false;
        }
    }
    let checkState = false;
    let errmsg = errorCode.check(code);
    //金币变化
    if (code == 10030012 || code == 10020099) glGame.user.reqGetCoin();

    switch (code) {
        case 20100004:
        case 20100005:
            //捕鱼断线重连报可能会错
        break;
        case 10000000:
            glGame.panel.showMsgBox('提示', errmsg, () => {
                // 重启游戏
                reStartGame();
            });
            break;
        case 10020050:
        case 10020108:  //用户注册填写的项与其他玩家冲突 (已服务端下发内容为条件)
            glGame.panel.showErrorTip(`${data}`);
            break;
        case 20040016:  //玩家数据有误暂时不提示
        case 10010002:  //重复提交不提示
            break;
        case 20100010: //服务器被挤爆弹窗口不提示
            glGame.panel.showMsgBox('提示', glGame.tips.ERRORTIP.GAMETOOHOT, () => {
                //glGame.emitter.emit("nodeRemove");
                if (cc.director.getScene().name != "plaza") {
                    glGame.room.exitGameRoom();
                }
            });
            break;
        case 10020004:  //根据需求，这错误码改为弹窗 -20028002红黑下注操作错误的错误码-子游戏内做处理
        case 20028002:
            break;
        case 20100011:  //游戏服新增弹窗，
        case 20100012:
            glGame.panel.showMsgBox('提示', errmsg, () => {
                // 重启游戏
                code == 20100011 ? reStartGame() : null;
            });
            break;
        case 10020002://用户账户不存在
        case 10020003://用户密码错误
            glGame.panel.showErrorTip(`${errmsg}`, () => {
                if (glGame.logon.get("isAutoLogin")) {
                    glGame.storage.removeItemByKey("loginCache");
                    reStartGame();
                }
            })
            break;
        case 10200004:
        case 10200005:
            glGame.emitter.emit('closeLuckDrawMaskButton');
            glGame.panel.showErrorTip(`${errmsg}`, () => { })
            break;
        case 500:
        case 21000500:
            if (errmsg != null) {
                glGame.emitter.emit('lb.closeautomatic')
                glGame.panel.showMsgBox('提示', errmsg);
            }
            break;
        case 100201021: //游戏中不可存款或提现
            glGame.panel.showMsgBox('提示', data.message, null, true);
            break;
        case 20100013:
            glGame.panel.showMsgBox('提示', glGame.tips.COMMON.ACCOUNTEXCEPTIONEX, null, true);
            break;
        case 100201022:
        case 100201019:
        case 10020087:
        case 10020073:
        case 10020074:
        case 100201067:
        case 10020058:
        case 10020059:
        case 10010009:
            glGame.emitter.emit(MESSAGE.USER.PHONE_VERIFICATION);
            if (code == 10010009)//您的手机已被限制，如有疑问请联系客服
                glGame.panel.showMsgBox('提示', glGame.tips.ERRORTIP.MOBILELIMIT);
            else if (errmsg != null) glGame.panel.showErrorTip(`${errmsg}`);
            break;
        case 100201071:
        case 100201072:
            glGame.panel.showMsgBox('提示', glGame.tips.ERRORTIP.BINDFAILED);
            break;
        case 10000010:
            glGame.panel.showErrorTip(`${errmsg}`);
            break
        case 10000007:
        case 10000012:
            if (cc.director.getScene().name == "plaza") glGame.panel.showErrorTip(`${errmsg}`);
            break
        case 10030021://房间相关错误
        case 10030020:
        case 10030024:
        case 10030041:
        case 10030053:
            glGame.panel.showErrorTip(`${errmsg}`, () => {
                //检测自己的房间状态
                glGame.room.reqMyRoomState();
            })
            break;
        case 20010001://token无效
            glGame.panel.showErrorTip(`${errmsg}`, () => {
                // 重启游戏
                reStartGame();
            })
            break;
        case 20030018://未经验证,非法进入房间
        case 20040009://房间已结束
        case 10030017://不在房间中
        case 10030042://找不到房间信息
        case 20040013://百人场初始化未完成
            glGame.panel.showMsgBox('提示', `${errmsg}，${glGame.tips.ERRORTIP.RESELECTROOM}`, this.enterPlaza.bind(this));
            break;
        case 20040012://房间已满
        case 10000006://捕鱼房间人数已满
            glGame.panel.showMsgBox('提示', `${errmsg}，${glGame.tips.ERRORTIP.RESELECTROOM}`,
                () => {
                    glGame.room.enterRoomFailure();
                    if (cc.director.getScene().name != "plaza") {
                        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
                        glGame.scene.enterNextScene();
                    }
                    glGame.emitter.emit(MESSAGE.UI.REFRESH_ROOM_NUM);
                });
            break;
        case 20100007:
            if (glGame.room.curEnterGameID == glGame.scenetag.DDZ) return glGame.emitter.emit("ddzExitTip");
            glGame.panel.showMsgBox('提示', glGame.tips.ERRORTIP.CANNOTEXIT);
            break;
        case 20040015://金币不足无法进入房间
            glGame.panel.showMsgBox('提示', `${errmsg}，${glGame.tips.ERRORTIP.RESELECTROOM}`, this.enterPlaza.bind(this));
            glGame.emitter.emit(MESSAGE.UI.REFRESH_ROOM_NUM);
            break;
        case 10010007://系统检测到您的账号存在异常，已被临时封停，如有疑问请联系客服(只有在登录的时候才发封停的错误码)
            glGame.panel.showMsgBox('提示', glGame.tips.ERRORTIP.ACCOUNTEXCEPTION,
                () => {
                    //清除登录缓存
                    glGame.storage.removeItemByKey("loginCache");
                    // 重启游戏
                    // reStartGame();
                });
            break;
        case 10010008://您的IP已被限制，如有疑问请联系客服
            glGame.panel.showMsgBox('提示', `    ${errmsg}`);
            break;
        case 10010010://系统检测到您的账号存在异常，暂时无法取现，如有疑问请联系客服
            glGame.panel.showMsgBox('提示', `${errmsg}`);
            break;
        case 20040020://系统检测到您的账号存在异常，暂时无法进入牌局，如有疑问请联系客服！
            glGame.panel.showMsgBox('提示', `${errmsg}`,
                () => {
                    this.enterPlaza();
                });
            break;
        case 20040022://系统检测到您的账号存在异常，无法继续进入牌局，如有疑问请联系客服！
            let strTip = data.gameStatus == 2 ? glGame.tips.ERRORTIP.GAMESERVICE : glGame.tips.ERRORTIP.GAMECLOSED;
            glGame.panel.showMsgBox('提示', strTip, this.enterPlaza.bind(this));
            glGame.panel.closeFieldSelectionJuHua();
            // glGame.panel.closeEntry();
            break;
        case 10020004://token错误
        case 10020005://该账号已存在，请重新登录
        case 10020006://注册失败
        case 10020007://登录失败
            glGame.panel.showErrorTip(`${errmsg}`, () => {
                let scene = cc.director.getScene(),
                    data = glGame.storage.getItem("loginCache");
                if (scene.name == "login" && data != null) {
                    glGame.storage.removeItemByKey("loginCache");
                    reStartGame();
                }
            })
            break;
        case 10240003:
            glGame.emitter.emit(MESSAGE.UI.SHOW_YUEBAO_LOWEST);
            break;
        case 20100009:
            glGame.panel.showMsgBox('提示', `${errmsg}`,
                () => {
                    glGame.room.enterRoomFailure();
                    if (cc.director.getScene().name != "plaza") {
                        glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
                        glGame.scene.enterNextScene();
                    }
                });
            break;
        case 10180006:
            if (data) {
                if (data.msg != null && data.msg != "") glGame.panel.showErrorTip(data.msg);
            }
            break;
        case 10080007:
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            } else checkState = true;
            glGame.emitter.emit('payCreateOrdererror');
        case 10210004:
            glGame.panel.showErrorTip(`${errmsg}`);
            break;
        case 20100003:
            if (cc.director.getScene().name != "plaza") {
                glGame.scene.setNextSceneTag(glGame.scenetag.PLAZA);
                glGame.scene.enterNextScene();
            } else glGame.panel.showErrorTip(`${errmsg}`);
            break;
        case 20100018:      //无效操作
            if (route == glGame.room.getCreateRoom(glGame.room.gameId)) {
                glGame.panel.showErrorTip(glGame.tips.ERRORTIP.NETERROR);
                glGame.emitter.emit(MESSAGE.UI.EXIT_CREATE_ROOM);
            } else if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            } else checkState = true;
            break;
        case 20100006:      //未查询到房间
        case 20100020:      //房主已拒绝您加入
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            } else checkState = true;
            glGame.emitter.emit(MESSAGE.UI.REFRESH_ROOM_NUM);
            break;
        case 20100021:
            if (route == glGame.room.getEnterRoomCheck()) {
                let time = Math.max(data.endTime - data.serverTime, 0);
                let str = time ? glGame.tips.ERRORTIP.BEKICKED.format(`${Math.floor(time / 1000)}`) : errmsg;
                glGame.panel.showErrorTip(`${str}`);
                glGame.emitter.emit(MESSAGE.UI.REFRESH_ROOM_NUM);
            } else if (route == glGame.room.getVoteDisbandRoom()) {
                let time = Math.max(data.endTime - data.serverTime, 0);
                let str = time ? glGame.tips.ERRORTIP.VOTEBUSY.format(`${Math.floor(time / 1000)}`) : errmsg;
                glGame.panel.showErrorTip(`${str}`);
            } else if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            } else checkState = true;
            break;
        case 10200002:
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            }
            glGame.emitter.emit("closeLuckDrawMaskButton");
            break;
        case 10170001:
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            }
            glGame.emitter.emit(MESSAGE.UI.FORBIDDEN_BACKWATER);
            break;
        case 10180004:
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            }
            glGame.emitter.emit(MESSAGE.UI.FORBIDDEN_SIGN);
            break;
        case 100201078:
            if (data.thirdCoinLimit && errmsg) {
                glGame.panel.showErrorTip(errmsg.format(`${glGame.user.GoldTemp(data.thirdCoinLimit)}`));
                glGame.user.set("thirdCoinLimit", data.thirdCoinLimit);
            }
            break;
        default:
            if (errmsg != null) {
                glGame.panel.showErrorTip(`${errmsg}`);
            } else checkState = true;
            break;
    }

    return checkState;
};

/**
*   发送限制  发送超过指定次数 则不再发送 直接重启或弹框提示后玩家确认就重启.
*   @param sendNum
*/
netErrorCheck.checkSendLimit = function (sendNum) {
    if (sendNum >= send_limit) {
        console.log("[errorWithTimeout] 发送超过指定次数 => 重启游戏");
        glGame.gameNet.getNetMgr().destroy();
        //清除登录缓存
        //glGame.storage.removeItemByKey("loginCache");
        glGame.panel.showMsgBox("", glGame.tips.ERRORTIP.REQUESTTIMEOUT, () => {
            // 重启游戏
            reStartGame();
        });
        return true;
    }
    return false;
}

module.exports = function () {
    if (!g_instance) {
        g_instance = new NetErrorCheck();
    }
    return g_instance;
}();
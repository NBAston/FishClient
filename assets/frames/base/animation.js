let
    Animation = function () {
        this.resetData();
    },
    animation = Animation.prototype,
    g_instance = null;

animation.MOVE_TO = 0;
animation.MOVE_DOWN = 1;
animation.MOVE_LEFT = 2;
animation.MOVE_RIGHT = 3;

animation.resetData = function () {
    //配置需要做一级界面的滚动的动画 
    //[个人中心,全民推广,活动,余额宝,返水,消息,任务,客服,提现,充值,幸运夺宝,排行榜]
    this.oneStairLisr = ["userinfo", "popularize", "announce",
        "yubao", "backWater", "email", "Task",
        "withdrawal", "shop", "luckDraw", "rank", 'setting', 'settings'];
    this.twoStairLisr = ['rule', 'help', 'record', 'setting'];//包含这些关键字的加入动效 1 （记录，帮助）详情不算内 预制体 必须带 _
    // TODO 后续游戏统一可使用关键字排查（目前命名相冲突 百人牛牛）
    this.threeStairList = ["hh_trendChartPop", "hh_playerList", "bjl_playerList", "bjl_trendChartPop"];   //子游戏内需要播放动画效果的预支
    this.oneStairTime = 0.4;
    this.twoStairTime = 0.2;
};

animation.checkInterface = function (nowNode) {
    let bolStair = false;
    //排查第二级动画播放预支
    this.twoStairLisr.forEach(element => {
        if (nowNode.name.toLowerCase().indexOf("detail") == -1) {
            if (nowNode.name.toLowerCase().indexOf(element) != -1 && nowNode.name.indexOf("_") != -1) bolStair = true;
        }
    })
    return this.oneStairLisr.find(name => name == nowNode.name) || this.threeStairList.find(name => name == nowNode.name) || bolStair;
}


/**
 * @param {object} nowNode 界面是否执行动画效果
 * @param {object} maskNode 遮罩界面传递
 * @exports 校验通用一级界面是否成功播放
 */
animation.openInterface = function (nowNode, maskNode) {
    // 校验通用一级界面是否成功播放
    if (this.openOneStairList(nowNode, maskNode)) return true;
    if (maskNode) maskNode.destroy();
    return false;
}

/**
 * @param {object} nowNode 界面是否执行动画效果
 * @param {object} maskNode 遮罩界面传递
 * @returns {boolean} 是否属于一级界面
 */
animation.openOneStairList = function (nowNode, maskNode) {
    let bolStair = this.checkInterface(nowNode);
    if (bolStair) {
        // 动画开始准备
        nowNode.scale = glGame.systemclass.convertInterface(cc.size(nowNode.width, nowNode.height));
        let nodeMask = nowNode.getChildByName("mask");
        let old = 0;
        if (nodeMask) {
            old = nodeMask.opacity + "";
            nodeMask.opacity = 0;
        }
        if (nowNode.getComponent(cc.Widget)) {
            nowNode.getComponent(cc.Widget).enabled = false
        }
        nowNode.x = nowNode.width;
        let visibleSize = cc.view.getVisibleSize();
        // 进入动画环节
        let cutAct = [], moveNum = 100;
        let spawnAct = cc.spawn(cc.moveTo(this.oneStairTime / 10 * 3, visibleSize.width / 2 - moveNum, visibleSize.height / 2), cc.fadeIn(this.oneStairTime / 5))
        cutAct.push(spawnAct);
        cutAct.push(cc.moveTo(this.oneStairTime / 10 * 7, visibleSize.width / 2, visibleSize.height / 2).easing(cc.easeElasticOut(2.0)));
        cutAct.push(cc.delayTime(0.15));
        cutAct.push(cc.callFunc(() => {
            if (nowNode.getComponent(cc.Widget)) {
                nowNode.getComponent(cc.Widget).enabled = true;
                nowNode.getComponent(cc.Widget).updateAlignment();
            }
            if (nodeMask) {
                nodeMask.opacity = Number(old);
                nodeMask.getComponent(cc.Widget).left = 0;
                nodeMask.getComponent(cc.Widget).right = 0;
                nodeMask.getComponent(cc.Widget).top = 0;
                nodeMask.getComponent(cc.Widget).bottom = 0;
                nodeMask.getComponent(cc.Widget).enabled = true;
                nodeMask.getComponent(cc.Widget).updateAlignment();
            }
            if (maskNode) maskNode.destroy();
            glGame.emitter.emit(`${nowNode.name}${MESSAGE.UI.ACTION_END}`)
        }));
        if (nodeMask) {
            nodeMask.opacity = Number(old);
            nodeMask.getComponent(cc.Widget).left -= moveNum * 2;
            nodeMask.getComponent(cc.Widget).right -= moveNum * 2;
            nodeMask.getComponent(cc.Widget).enabled = true;
            nodeMask.getComponent(cc.Widget).updateAlignment();
        }
        nowNode.runAction(cc.sequence(cutAct));
    }
    return !!bolStair;
}


/**
 * @param {object} nowNode 界面是否执行动画效果
 * @param {object} maskNode 遮罩界面传递
 * @param {object} moveType 界面出现方向
 * @returns {boolean} 是否属于一级界面
 */
animation.moveInterface = function (nowNode, maskNode, moveType) {
    // 动画开始准备
    nowNode.scale = glGame.systemclass.convertInterface(cc.size(nowNode.width, nowNode.height));
    let nodeMask = nowNode.getChildByName("mask");
    let old = 0;
    if (nodeMask) {
        old = nodeMask.opacity + "";
        nodeMask.opacity = 0;
    }
    if (nowNode.getComponent(cc.Widget)) {
        nowNode.getComponent(cc.Widget).enabled = false
    }
    this._posBegin(nowNode, moveType);
    let visibleSize = cc.view.getVisibleSize();
    // 进入动画环节
    let cutAct = [], moveNum = 100;
    let spawnAct = cc.spawn(this._actionBegin(moveType, moveNum), cc.fadeIn(this.oneStairTime / 5))
    cutAct.push(spawnAct);
    cutAct.push(cc.moveTo(this.oneStairTime / 10 * 7, visibleSize.width / 2, visibleSize.height / 2).easing(cc.easeElasticOut(2.0)));
    cutAct.push(cc.delayTime(0.15));
    cutAct.push(cc.callFunc(() => {
        if (nowNode.getComponent(cc.Widget)) {
            nowNode.getComponent(cc.Widget).enabled = true;
            nowNode.getComponent(cc.Widget).updateAlignment();
        }
        if (nodeMask) {
            nodeMask.opacity = Number(old);
            nodeMask.getComponent(cc.Widget).left = 0;
            nodeMask.getComponent(cc.Widget).right = 0;
            nodeMask.getComponent(cc.Widget).top = 0;
            nodeMask.getComponent(cc.Widget).bottom = 0;
            nodeMask.getComponent(cc.Widget).enabled = true;
            nodeMask.getComponent(cc.Widget).updateAlignment();
        }
        if (maskNode) maskNode.destroy();
        glGame.emitter.emit(`${nowNode.name}${MESSAGE.UI.ACTION_END}`)
    }));
    nowNode.runAction(cc.sequence(cutAct));
    if (nodeMask) {
        nodeMask.opacity = Number(old);
        nodeMask.getComponent(cc.Widget).left -= moveNum * 2;
        nodeMask.getComponent(cc.Widget).right -= moveNum * 2;
        nodeMask.getComponent(cc.Widget).top -= moveNum * 2;
        nodeMask.getComponent(cc.Widget).bottom -= moveNum * 2;
        nodeMask.getComponent(cc.Widget).enabled = true;
        nodeMask.getComponent(cc.Widget).updateAlignment();
    }
}

/**
 * 获取界面坐标初始化位置
 * @param {number} moveType 移动类型
 * 
 */
animation._posBegin = function (nowNode, moveType) {
    switch (moveType) {
        case this.MOVE_TO:
            nowNode.y = nowNode.height;
            break;
        case this.MOVE_DOWN:
            nowNode.y = -nowNode.height;
            break;
        case this.MOVE_LEFT:
            nowNode.x = -nowNode.width;
            break;
        case this.MOVE_RIGHT:
            nowNode.x = nowNode.width;
            break;
        default: console.error("moveType error"); break;
    }
}

/**
 * 获取初始化抖动位置
 * @param {number} moveType 移动类型
 * @param {number} moveNum  移动距离
 */
animation._actionBegin = function (moveType, moveNum) {
    let movex = 0, movey = 0;
    switch (moveType) {
        case this.MOVE_TO:
            movey -= moveNum;
            break;
        case this.MOVE_DOWN:
            movey += moveNum;
            break;
        case this.MOVE_LEFT:
            movex += moveNum;
            break;
        case this.MOVE_RIGHT:
            movex -= moveNum;
            break;
        default: console.error("moveType error"); break;
    }
    let visibleSize = cc.view.getVisibleSize();
    return cc.moveTo(this.oneStairTime / 10 * 3, visibleSize.width / 2 + movex, visibleSize.height / 2 + movey);
}


module.exports = function () {
    if (!g_instance) {
        g_instance = new Animation();
    }
    return g_instance;
};
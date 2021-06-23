const NOTICE_PLAZA = 0      //大厅跑马
const NOTICE_PUBLIC = 1     //普通跑马
const NOTICE_PUBLIC2 = 2    //普通跑马2

const NOTICE_HORIZONTAL = 1         //垂直滚动
const NOTICE_VERTICAL = 2           //特殊跑马

const HtmlTextParser = require('./html-text-parser');
const _htmlTextParser = new HtmlTextParser();

glGame.baseclass.extend({

    properties: {
        node_bottom: cc.Node,
        node_icon: cc.Node,
        node_spine: cc.Node,
        node_mask: cc.Widget,
        content: cc.Node,
        contentTemp: cc.Node,
        frame_di: [cc.SpriteFrame],
        frame_laba: [cc.SpriteFrame],
    },

    onLoad() {
        this._mutipleLineText = [];
        this._labelSegmentsCache = [];
        this.bactive = false;
        this.node.active = false;
        this.speed = 60;
        this.noticeType = NOTICE_PUBLIC;
        this.registerEvent();
        this.actionStart();
        this._originSize = this.node.getContentSize();
        this.actionType = 2;                        //初始化默认为普通跑马特效
        this.scene_names = ["wqznn", "zhajinhua", "ebg", "ddz"];     //普通跑马灯2列表

        let sceneName = glGame.scene.getSceneName();
        if(sceneName === "plaza") {
            this.setApperance(NOTICE_PLAZA);
        } else if(this.scene_names.indexOf(sceneName) != -1) {
            this.setApperance(NOTICE_PUBLIC2);
        } else {
            this.setApperance(NOTICE_PUBLIC);
        }
    },

    onEnable() {
        this.onCanvasResize();
    },

    registerEvent() {
        glGame.emitter.on(MESSAGE.NOTICE.BASE, this.basestart, this);
        glGame.emitter.on(MESSAGE.NOTICE.PLAZA, this.plazastart, this);
        glGame.emitter.on("resize", this.onCanvasResize, this);
    },
    unregisterEvent() {
        glGame.emitter.off(MESSAGE.NOTICE.BASE, this);
        glGame.emitter.off(MESSAGE.NOTICE.PLAZA, this);
        glGame.emitter.off("resize", this);
    },
    basestart() {
        this.actionStart();
    },
    plazastart() {
        this.actionStart();
    },

    /**
     * 设置跑马灯外观
     * @param type number 
     */
    setApperance(type) {
        this.node_bottom.getComponent(cc.Sprite).spriteFrame = this.frame_di[type];
        this.node_icon.getComponent(cc.Sprite).spriteFrame = this.frame_laba[type];

        let rect = this.frame_di[type].getRect();
        this.node.setContentSize(cc.size(rect.width, rect.height));
        this._originSize = this.node.getContentSize();
    },

    /**
     * 设置结束的速率
     * @param speed number 长度/秒速  每秒位移像素
     */
    setSpeed(speed) {
        this.speed = speed;
    },

    /**
     * 设置跑马大小
     * @param size cc.size 长宽
     */
    setContentSize(size) {
        this._size = size;
        let new_pos = this.node.getContentSize(),
            pos_h = size.height / new_pos.height;
        this.node.setContentSize(size);

        //设置图片
        this.node_icon.setScale(pos_h);
        
        //设置遮罩
        this.node_mask.left = this.node_icon.getContentSize().width * pos_h + 30;
        this.node_mask.updateAlignment();
        
        //设置字体大小
        let fsize = size.height / 2 + 3;
        this.content.getComponent(cc.RichText).fontSize = fsize;
        this.contentTemp.getComponent(cc.RichText).fontSize = fsize;
        //设置特效
        let initSize = cc.size(1201, 68);
        if (size.width != initSize.width || size.height != initSize.height) {
            this.node_spine.scaleX = size.width / initSize.width * 1.02;
            this.node_spine.scaleY = size.height / initSize.height;
            this.node_spine.x = this.node_spine.x * (size.width / initSize.width);
            this.node_spine.getComponent(sp.Skeleton).setAnimation(0, this.actionType, true);
        }

        this.node_bottom.getComponent(cc.Widget).updateAlignment();
        this.node_icon.getComponent(cc.Widget).updateAlignment();

    },
    /**
     * 设置跑马位置
     * @param pos cc.v2 x,y
     */
    setPosition(pos) {
        this._pos = pos;
        this.node.setPosition(pos);
    },
    /**
     * 设置是否自动做显示隐藏
     * @param bol bool 开关
     */
    setActive(bol) {
        this.bactive = bol;
        if (!this.node.active && this.bactive) this.node.active = bol;
    },
    /**
     * 设置底图的开关
     * @param bol bool 开关
     */
    setBottom(bol) {
        this.node_bottom.active = bol;
    },

    /**
     * 设置跑马的层级
     * @param zIndex bool 开关
     */
    setZIndex(zIndex) {
        if (zIndex != 0) this.node.zIndex = zIndex;
    },

    /**
     * 获取数据层里面的数据
     */
    getContent() {
        let contentData = "",
            taskData = glGame.notice.getPlazaContent();
        this.noticeType = NOTICE_PUBLIC;
        if (taskData && glGame.scene.getSceneName() === "plaza") {
            this.noticeType = NOTICE_PLAZA;
            contentData = taskData.content;
            this.mode = taskData.mode;
            this.actionType = taskData.level;

            if(this.actionType == 2) {
                this.node_spine.active = true;
                this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "1", false);
                this.node_spine.getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
                    this.node_spine.active = false;
                });

            } else {
                this.node_spine.active = true;
                this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "1", false);
                this.node_spine.getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
                    this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "2", true);
                });
            }

            if (taskData.speed) this.setSpeed(taskData.speed);
        } else {
            contentData = glGame.notice.getContent();
        }
        return contentData;
    },

    /**
     * 动画启动
     */
    actionStart() {
        if (this.content.getNumberOfRunningActions()) return;
        if (this.contentTemp && this.contentTemp.getNumberOfRunningActions()) return;
        if (!this.bactive) this.node.active = true;
        this._action();
    },
    /**
     * 动画流程
     */
    _action() {
        this.content.position = cc.v2(0, 0);
        this.contentTemp.position = cc.v2(0, -68);
        this.content_data = this.getContent();
        if (this.mode == NOTICE_VERTICAL && this.noticeType == NOTICE_PLAZA) {
            return this.CowRoll();
        }
        if (!this.content_data) {
            if (!this.bactive) this.node.active = false;
            return;
        }
        let label_content = this.content.getComponent(cc.RichText);
        label_content.string = this.content_data;
        let movex = this.node.width / 2 + this.content.width / 2 + 20;
        this.content.x = movex;
        let textSpeed = this.speed * this.content.getComponent(cc.RichText).fontSize;
        let move_act = cc.moveTo(movex / textSpeed, -movex, 0);
        let call = cc.callFunc(() => {
            if(this.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();
            else glGame.notice.removeContent();
            this._action();
        })
        this.content.runAction(cc.sequence(move_act, call))
    },

    callRun(content, speed) {
        if(this.record == this._mutipleLineText.length) {
            content.stopAllActions();
            let actionArr = [];
            actionArr.push(cc.delayTime(speed));
            actionArr.push(cc.callFunc(() => {
                if(this.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();
                else glGame.notice.removeContent();
                this.CowRoll();
            }));
            content.runAction(cc.sequence(actionArr));
        } else {
            if(this.content.y > this.contentTemp.y) {
                this.content.y = -this.content.height;
                this.getStrContent(this.content);
            } else {
                this.contentTemp.y = -this.contentTemp.height;
                this.getStrContent(this.contentTemp);
            }

            this.actRun(this.content, this.speed);
            this.actRun2(this.contentTemp, this.speed);
        }
    },

    delayCallback() {
        this.getStrContent(this.contentTemp);
        this.contentTemp.runAction(cc.moveBy(0.5, 0, this.contentTemp.height));

        this.content.runAction(cc.sequence(
            cc.moveBy(0.5, 0, this.content.height),
            cc.callFunc(this.callRun.bind(this, this.content, this.speed))
        ));
    },

    actRun2(content, speed) {
        content.stopAllActions();
        content.runAction(cc.sequence(
            cc.delayTime(speed),
            cc.moveBy(0.5, 0, content.height)
        ));
    },

    actRun(content, speed) {
        content.stopAllActions();
        content.runAction(cc.sequence(
            cc.delayTime(speed),
            cc.moveBy(0.5, 0, content.height),
            cc.callFunc(this.callRun.bind(this, content, speed))
        ));
    },

    //垂直滚动
    CowRoll() {
        this.content_data = this.getContent();
        this.initCowData();
        if (this.mode == NOTICE_HORIZONTAL && this.noticeType == NOTICE_PLAZA) {
            return this._action();
        }
        
        if (!this.content_data) {
            if (!this.bactive) {
                this.node.active = false;
                this.content.stopAllActions();
                this.contentTemp.stopAllActions();
                this.contentTemp.getComponent(cc.RichText).string = "";
                this.content.getComponent(cc.RichText).string = "";
            }
            return;
        }

        if (this.isRollOne) {
            let self = this;
            this.content.stopAllActions();
            this.content.runAction(cc.sequence(
                cc.delayTime(this.speed),
                cc.callFunc(() => {
                    if(self.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();
                    else glGame.notice.removeContent();
                    self.CowRoll();
                })
            ))
            return;
        }

        this.content.runAction(cc.sequence(cc.delayTime(this.speed), cc.callFunc(this.delayCallback.bind(this))));
    },
    //初始化滚动数据
    initCowData() {
        this.content.position = cc.v2(0, 0);
        this.contentTemp.position = cc.v2(0, -68);
        this.contentTemp.getComponent(cc.RichText).string = "";
        this.content.getComponent(cc.RichText).string = "";
        this.content.stopAllActions();
        this.contentTemp.stopAllActions();
        this.record = 0;

        if(this.mode != NOTICE_VERTICAL) {
            return;
        }

        if(this.content_data.length > 0)
            this.preHandleContent();
        this.getStrContent(this.content);
        if (this.record == this._mutipleLineText.length) {
            this.isRollOne = true;
            return
        } else {
            this.isRollOne = false;
        }
    },

    preHandleContent() {
        let richText = this.content.getComponent(cc.RichText);
        this.richText = richText;
        richText.string = "";
        this.maxWidth = this.node.width - 120;
        this._mutipleLineText = [];

        let lastEmptyLine = false;
        this._lineOffsetX = 0;

        let textArray = _htmlTextParser.parse(this.content_data);
        this._textArray = textArray;
        for(let i = 0; i < textArray.length; i++) {
            let richTextElement = this._textArray[i];
            let text = richTextElement.text;
            let multilineTexts = text.split("\n");

            for (let j = 0; j < multilineTexts.length; ++j) {
                let labelString = multilineTexts[j];
                if (labelString === "") {
                    if (richText._isLastComponentCR(text)
                        && j === multilineTexts.length - 1) {
                        continue;
                    }
                    this._mutipleLineText.push("");
                    this._lineOffsetX = 0;
                    lastEmptyLine = true;
                    continue;
                }
                lastEmptyLine = false;

                let labelWidth = richText._measureText(i, labelString);
                this._updateRichTextWithMaxWidth(labelString, labelWidth, i, richText);

                if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
                    this._mutipleLineText.push("");
                }
            }
        }
    },

    //获取当前的字数
    getStrContent(node) {
        node.getComponent(cc.RichText).string = this._mutipleLineText[this.record++];
    },

    _updateRichTextWithMaxWidth (labelString, labelWidth, styleIndex, richText) {
        let fragmentWidth = labelWidth;
        if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this.maxWidth) {
            //concat previous line
            let checkStartIndex = 0;
            while (this._lineOffsetX <= this.maxWidth) {
                let checkEndIndex = richText._getFirstWordLen(labelString,
                    checkStartIndex,
                    labelString.length);
                let checkString = labelString.substr(checkStartIndex, checkEndIndex);
                let checkStringWidth = richText._measureText(styleIndex, checkString);

                if (this._lineOffsetX + checkStringWidth <= this.maxWidth) {
                    this._lineOffsetX += checkStringWidth;
                    checkStartIndex += checkEndIndex;
                }
                else {

                    if (checkStartIndex > 0) {
                        let remainingString = labelString.substr(0, checkStartIndex);
                        this._mutipleLineText.push(remainingString);
                        labelString = labelString.substr(checkStartIndex, labelString.length);
                        fragmentWidth = richText._measureText(styleIndex, labelString, richText);
                    }
                    this._mutipleLineText.push("");
                    break;
                }
            }
        }
        if (fragmentWidth > this.maxWidth) {
            let fragments = cc.textUtils.fragmentText(labelString,
                fragmentWidth,
                this.maxWidth,
                richText._measureText(styleIndex));
            for(let i = 0; i < fragments.length; i++) {
                this._mutipleLineText.push(fragments[i]);
            }
        }
        else {
            this._lineOffsetX += fragmentWidth;
            this._mutipleLineText.push(labelString);
        }
    },

    onCanvasResize() {
        this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(()=> {
            let plaza = cc.director.getScene().getChildByName("plaza");
            if(plaza) {
                let height = 68;
                let showsize = cc.size(plaza.width * 0.65, height);
                this.setContentSize(showsize);
                this.setPosition(cc.v2(plaza.width / 2 + 439 / 2, plaza.height - 185));
            }
            
        })))
    },

    OnDestroy() {
        this.unregisterEvent();
        glGame.notice.resetData();
    },
});
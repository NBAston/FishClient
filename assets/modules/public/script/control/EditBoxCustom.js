
const NORMALCY = 0;
const CHECKED = 1;

cc.Class({
    extends: cc.Component,
    properties: {
        title: cc.String,
        placeholder: cc.String,
        editbox: cc.EditBox,
        placeholder_label: cc.Label,
        text_label: cc.Label,
        move_label: cc.Label,
        mask_node: cc.Node,
        frame_node: cc.Node,
        frame_spriter: cc.Sprite,
        bottom_spriter: cc.Sprite,
        bottom_pic: [cc.SpriteFrame],
        frame_pic: [cc.SpriteFrame],
    },

    onLoad() {
        var selfNode = this.node;
        this.node.getSelfFunc = function () { return selfNode.getComponent("EditBoxCustom"); };
        this._topmovex = -(this.node.width / 2 - 75);
        this._topmovey = this.node.height / 2 + 5;
        this._topmaskmovex = this.editbox.node.getComponent(cc.Widget).left / 2;
        this._centermovex = -(this.node.width / 2 - 2);
        this._centermovey = 0;
        this._movetime = 0.05;
        this._tet_size = [1.15, 1];          //输入中，输入后    字体大小            


        this.mask_max = 20;
        this.move_label.string = this.title;
        this.placeholder_label.string = this.placeholder;
        this.move_label.node.x = this._centermovex;
        this.move_label.node.y = 0;
        this.mask_node.x = this._centermovex;
        this.mask_node.y = 0;
        this.mask_node.width = this.move_label.node.width + this.mask_max * 2;
        this.endedcall = 0;
        this.move_colos = [cc.color(0x93, 0xae, 0xdf), cc.color(0x32, 0x75, 0xE8)];
        this.bottom_spriter.spriteFrame = this.bottom_pic[NORMALCY];
        this.frame_spriter.spriteFrame = this.frame_pic[NORMALCY];
        this.move_label.node.color = this.move_colos[NORMALCY];
        this.text_label.node.scale = this._tet_size[NORMALCY];
    },

    onBegon() {
        if (this.editbox.string == "") {
            this.move_label.node.active = true;
            this.placeholder_label.string = "";
            this.mask_node.width = this.move_label.node.width + this.mask_max * 2;
            this.move_label.node.runAction(cc.moveTo(this._movetime, this._topmovex, this._topmovey));
            this.mask_node.runAction(cc.moveTo(this._movetime, this._topmovex - this.mask_max + this._topmaskmovex, this._topmovey));
            this.frame_node.runAction(cc.fadeIn(this._movetime));
        }
        this.bottom_spriter.spriteFrame = this.bottom_pic[CHECKED];
        this.frame_spriter.spriteFrame = this.frame_pic[CHECKED];
        this.move_label.node.color = this.move_colos[CHECKED];
        this.text_label.node.scale = this._tet_size[CHECKED];
    },

    onEnded() {
        if (this.editbox.string == "") {
            this.move_label.node.active = true;
            this.editbox.placeholder = "";
            this.move_label.node.runAction(cc.sequence(cc.moveTo(this._movetime, this._centermovex, this._centermovey), cc.callFunc(() => {
                this.move_label.node.active = false;
                this.placeholder_label.string = this.placeholder;
            })));
            this.mask_node.runAction(cc.moveTo(this._movetime, this._centermovex, this._centermovey));
            this.frame_node.runAction(cc.fadeOut(this._movetime));
            this.bottom_spriter.spriteFrame = this.bottom_pic[NORMALCY];
        } else this.bottom_spriter.spriteFrame = this.bottom_pic[CHECKED];

        this.frame_spriter.spriteFrame = this.frame_pic[NORMALCY];
        this.move_label.node.color = this.move_colos[NORMALCY];
        this.text_label.node.scale = this._tet_size[NORMALCY];
        if (this.endedcall) this.endedcall();
    },

    setString(strContent) {
        if (strContent == "" && this.editbox.string == "") return;
        if (strContent == "" && this.editbox.string != "") {
            this.move_label.node.active = true;
            this.editbox.placeholder = "";
            this.move_label.node.runAction(cc.sequence(cc.moveTo(0, this._centermovex, this._centermovey), cc.callFunc(() => {
                this.move_label.node.active = false;
                this.placeholder_label.string = this.placeholder;
            })));
            this.mask_node.runAction(cc.moveTo(0, this._centermovex, this._centermovey));
            this.frame_node.runAction(cc.fadeOut(0));
        } else if (this.editbox.string == "" && strContent != "") {
            this.move_label.node.active = true;
            this.placeholder_label.string = "";
            this.mask_node.width = this.move_label.node.width + this.mask_max * 2;
            this.move_label.node.runAction(cc.moveTo(0, this._topmovex, this._topmovey));
            this.mask_node.runAction(cc.moveTo(0, this._topmovex - this.mask_max + this._topmaskmovex, this._topmovey));
            this.frame_node.runAction(cc.fadeIn(0));
        }
        this.editbox.string = strContent;
    },


    setPlaceholder(placeholder) {
        if (placeholder == "") return;
        this.placeholder = placeholder;
        this.placeholder_label.string = this.placeholder;
    },

    onEndedCall(call) {
        this.endedcall = call;
    },

    update(dt) {
    }
});

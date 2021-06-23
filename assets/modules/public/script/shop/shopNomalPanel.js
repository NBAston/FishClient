const SHOPTYPE = { BANK: 1, ALIPAY: 2, WECHAT: 3 }//公司入款的支付类型
glGame.baseclass.extend({
	properties: {
		RowItem: cc.Node,
		Rowcontent: cc.Node,
		RechargeItem: cc.Node,
		Rechargecontent: cc.Node,
		RowselectScroll: cc.ScrollView,
		Lab_coin: cc.Node,
		edit_coin: cc.EditBox,
		inputshield: cc.Node,//限制是否可以输入充值金额
		shopFastPanel: cc.Prefab,
		type_pic: [cc.SpriteFrame],
		spritePic: cc.Sprite,
		des_recharge: cc.RichText,
		bankInfo: cc.Node,
		lab_describe: cc.Label,
		towLine: cc.Node,
		edit_mask: cc.Node,
	},
	onLoad() {
		this.persent = 0;
		this.isFree = 0;//是否允许任意金额 0 不允许 1允许
		this.nowTime = Date.now()
		this.cacheData = {};
		// this.touchEvent()
	},
	ReqPayType(pageId) {
		let typeId = this.typeId;
		this.pageID = pageId
		glGame.gameNet.send_msg('http.ReqPayPage', { pageId: pageId, typeId: typeId }, (route, msg) => {
			this.Curpageinfo = msg.result
			this.setType(this.typeId)
			this.setContent(msg.result);
		})
	},
	initUI(data) {
		this.nowTime = Date.now()
		this.giveProportion = data.giveProportion;
		this.payPageList = data.payPageList;
		this.typeId = data.id;
		let min = this.payPageList[0].currentRotationAccount.config.rechargeMin;
		let max = this.payPageList[0].currentRotationAccount.config.rechargeMax;
		if (min < 0) min = 0;
		for (let i = 0; i < data.payPageList.length; i++) {
			let RowItem = cc.instantiate(this.RowItem);
			RowItem.parent = this.Rowcontent;
			RowItem.active = true;
			RowItem.getChildByName("Background").getChildByName("Label").getComponent(cc.RichText).string = data.payPageList[i].name;
			RowItem.height = RowItem.getChildByName("Background").getChildByName("Label").height + 26;//外框要比里面的字体高26；
			RowItem.getChildByName("checkmark").getChildByName("Label").getComponent(cc.RichText).string = data.payPageList[i].name;
			RowItem.getChildByName("Background").name = `${i}`
		}
		// this.btn_nextlistchecked.active = this.Rowcontent.childrenCount > 3;   
		// this.btn_leftchecked.active = this.Rowcontent.childrenCount > 3;   
		this.Curpageinfo = this.payPageList[0]
		this.setType(this.typeId)
		this.setContent(this.Curpageinfo)
	},
	setType(id) {
		if (id == glGame.pay.BANKCARDPAY || id == glGame.pay.CLOUDPAY) {
			this.spritePic.spriteFrame = this.type_pic[0]
		} else if (id == glGame.pay.ALIPAY) {
			this.spritePic.spriteFrame = this.type_pic[1]
		} else if (id == glGame.pay.WECHATPAY) {
			this.spritePic.spriteFrame = this.type_pic[2]
		} else if (id == glGame.pay.JINGDONGPAY) {
			this.spritePic.spriteFrame = this.type_pic[3]
		} else if (id == glGame.pay.QQPAY) {
			this.spritePic.spriteFrame = this.type_pic[4]
		} else if (id == glGame.pay.FASTPAY) {
			this.spritePic.spriteFrame = this.type_pic[this.Curpageinfo.currentRotationAccount.type - 1]
		}
	},
	setContent(data) {
		this.Rechargecontent.destroyAllChildren();

		this.Rechargecontent.removeAllChildren();
		if (!data) return;
		//if (data.currentRotationAccount.type == SHOPTYPE.BANK)this.setBankInfo(data.currentRotationAccount); 
		//else this.setDescribe(data.describe);
		this.setDescribe(data.describe);
		let min = glGame.user.GoldTemp(data.currentRotationAccount.config.rechargeMin);
		let max = glGame.user.GoldTemp(data.currentRotationAccount.config.rechargeMax);
		if (min < 0) min = 0;
		// this.Lab_coin.getSelfFunc().setPlaceholder(data.currentRotationAccount.config.rechargeMax == -1 ? `请输入金额(${min}~无上限)` : `请输入金额(${min}~${max})`)
		if (data.currentRotationAccount.config.rechargeMax == -1 && Number(min) == 0) {
			this.Lab_coin.getSelfFunc().setPlaceholder("");
		} else if (data.currentRotationAccount.config.rechargeMax == -1) {
			this.Lab_coin.getSelfFunc().setPlaceholder(`请输入金额(${min}~无上限)`);
		} else {
			this.Lab_coin.getSelfFunc().setPlaceholder(`请输入金额(${min}~${max})`);
		}
		this.Lab_coin.getSelfFunc().onEndedCall(this.setLabCoin.bind(this));
		this.inputshield.active = true;
		if (data.currentRotationAccount.config) {
			let quickMode = data.currentRotationAccount.config.quickMode;
			this.isFree = data.currentRotationAccount.config.isFree;
			this.inputshield.active = data.currentRotationAccount.config.isFree == 0
			if (data.currentRotationAccount.config.isFree == 1) {//是否允许任意金额 0 不允许 1允许
				this.edit_mask.active = false;
			}else{
				this.edit_mask.active = true;
				this.Lab_coin.getSelfFunc().setPlaceholder(`请选择充值金额`);
			}
			this.towLine.active = quickMode.length > 0;
			for (let i = 0; i < quickMode.length; i++) {
				let RechargeItem = cc.instantiate(this.RechargeItem);
				RechargeItem.parent = this.Rechargecontent;
				RechargeItem.active = true;
				RechargeItem.name = `${i}`;
				RechargeItem.getChildByName("red_bg").active = this.giveProportion != 0
				RechargeItem.getChildByName("number").getComponent(cc.Label).string = this.getFloat(quickMode[i]);
				if (this.giveProportion != 0) {
					RechargeItem.getChildByName("number").y += 10;
					RechargeItem.getChildByName("discount").active = true;
					let tempNum = quickMode[i] * this.giveProportion;
					RechargeItem.getChildByName("discount").getComponent(cc.Label).string = `赠送${Math.floor(Number(tempNum.div(100 * 10000)) * 100) / 100}金币`
				}
			}
		}

	},
	setDescribe(data) {
		this.lab_describe.node.active = true;
		this.bankInfo.active = false;
		this.lab_describe.string = data;
		this.node.runAction(cc.sequence(
			cc.delayTime(0.01),
			cc.callFunc(() => {
				//this.lab_describe.node.position = cc.v2(-209,326)
				if (this.lab_describe.node.height > 149.96) {
					this.lab_describe.overflow = 1;
					//this.lab_describe.node.height = 120
					this.lab_describe.verticalAlign = 0
				}
			})
		))
	},
	//设置描述或者银行卡信息
	setBankInfo(data) {
		this.bankInfo.active = true;
		this.lab_describe.node.active = false;
		this.bankInfo.getChildByName("lab_bankNum").getComponent(cc.Label).string = data.accountName;
		this.bankInfo.getChildByName("lab_userName").getComponent(cc.Label).string = data.name;
		this.bankInfo.getChildByName("lab_bankName").getComponent(cc.Label).string = data.bankName;

	},
	onClick(name, node) {
		for (let i = 0; i < this.Rechargecontent.childrenCount; i++) {
			if (name == this.Rechargecontent.children[i].name) {
				return this.RechargeItemCB(name);
			}
		}
		switch (name) {
			case "RowItem": this.pageinfo_CB(node); break;
			case "btn_nextlistchecked": this.next_CB(); break;
			case "btn_leftchecked": this.left_CB(); break;
			case "btn_submission": this.btn_submissionCB(); break;
			case "btn_record": glGame.emitter.emit("showrechargeRecord"); break;
			case "btn_copyBankNum":glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_bankNum").getComponent(cc.Label).string, glGame.tips.SHOP.COPYBANKCARD);break;
			case "btn_copyUserName":glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_userName").getComponent(cc.Label).string, glGame.tips.SHOP.COPYUSERNAME);break;
			case "btn_copyBankName":glGame.platform.copyToClip(this.bankInfo.getChildByName("lab_bankName").getComponent(cc.Label).string, glGame.tips.SHOP.COPYBANKNAME);break;
			default: console.error("no find button name -> %s", name);
		}
	},
	pageinfo_CB(node) {
		this.page = node.children[0].name
		this.ReqPayType(this.payPageList[this.page].id)
		this.nowTime = Date.now();
		this.Lab_coin.getSelfFunc().setString("")
		this.des_recharge.string = "";
	},
	next_CB() {
		let pos = this.RowselectScroll.getContentPosition();
		this.startPos = pos.x;
		let offset = cc.v2((this.startPos - 3 * 250), pos.y);
		let count = this.Rowcontent.childrenCount;
		let index = count - 3
		if ((index * 250 + offset.x) <= -370) {
			this.RowselectScroll.scrollToRight(0.01)
		} else {
			this.RowselectScroll.setContentPosition(offset);
		}
	},
	left_CB() {
		let pos = this.RowselectScroll.getContentPosition();
		this.startPos = pos.x;
		let offset = cc.v2((this.startPos + 3 * 250), pos.y);
		let count = this.Rowcontent.childrenCount;
		if ((offset.x + 250) >= -370) {
			this.RowselectScroll.scrollToLeft(0.01)
		} else {
			this.RowselectScroll.setContentPosition(offset);
		}
	},
	btn_submissionCB() {
		if (this.edit_coin.string == "" || this.edit_coin.string == 0) {
			if(this.isFree == 0){
				glGame.panel.showErrorTip(glGame.tips.SHOP.COINNULL2);
			}else{
				glGame.panel.showErrorTip(glGame.tips.SHOP.COINNULL);
			}
			return;
		}
		let regA = /^[0-9]+\.[0-9]{0,2}$/;//验证规则
		let regB = /^[1-9][0-9]{0,9}$/gim;
		let isCoinNum_matcherA = regA.test(Number(this.edit_coin.string));
		let isCoinNum_matcherB = regB.test(Number(this.edit_coin.string));
		if (isCoinNum_matcherA || isCoinNum_matcherB) {
		} else {
			glGame.panel.showErrorTip(glGame.tips.SHOP.SELECTCOIN);
			return;
		}
		if (this.Curpageinfo.currentRotationAccount.config.rechargeMax != -1) {
			if (parseFloat(this.edit_coin.string) * 100 > this.Curpageinfo.currentRotationAccount.config.rechargeMax
				|| parseFloat(this.edit_coin.string) * 100 < this.Curpageinfo.currentRotationAccount.config.rechargeMin) {
				let min = this.Curpageinfo.currentRotationAccount.config.rechargeMin;
				let max = this.Curpageinfo.currentRotationAccount.config.rechargeMax
				let str = glGame.tips.SHOP.LIMIT.format(`${glGame.user.GoldTemp(min)}`, `${glGame.user.GoldTemp(max)}`)
				glGame.panel.showErrorTip(str)
				return;
			}
		} else {
			if (parseFloat(this.edit_coin.string) * 100 < this.Curpageinfo.currentRotationAccount.config.rechargeMin) {
				let min = this.Curpageinfo.currentRotationAccount.config.rechargeMin;
				//let max = this.Curpageinfo.currentRotationAccount.config.rechargeMax
				let str = glGame.tips.SHOP.MINLIMIT.format(`${glGame.user.GoldTemp(min)}`);
				glGame.panel.showErrorTip(str)
				return;
			}
		}

		if (this.Curpageinfo.currentType) {
			let rechargeKey = glGame.user.get('url').recharge_key;
			let accountId = this.Curpageinfo.currentRotationAccount.accountId
			let myID = glGame.user.get('logicID');
			let chooseMoney = parseFloat(this.edit_coin.string) * 100;
			let payJump = glGame.user.get('url').pay_jump;
			let trilateralIden = this.Curpageinfo.currentRotationAccount.trilateralIdent, id = this.Curpageinfo.id, nowTime = this.nowTime
			let str = `userId=${myID}&money=${chooseMoney}&trilateralIdent=${trilateralIden}&id=${id}&currentType=${this.Curpageinfo.currentType}&time=${nowTime}&accountId=${accountId}&typeId=${this.typeId}&pageId=${this.Curpageinfo.id}`;
			let sign = md5(str + rechargeKey)
			str = str + `&sign=${sign}`;
			let url = payJump + '?' + str;
			cc.sys.openURL(url)
		} else {
			let shopFastPanel = glGame.panel.showChildPanel(this.shopFastPanel, this.node.parent.parent);
			let script = shopFastPanel.getComponent("shopFastPanel");
			script.initUI(this.Curpageinfo, parseFloat(this.edit_coin.string), this.giveProportion, this.typeId);
		}
	},
	compareMoney() {
		let chooseMoney = parseFloat(this.edit_coin.string)
		for (let i = 0; i < this.Rechargecontent.childrenCount; i++) {
			let name = Number(this.Rechargecontent.children[i].name)
			if (chooseMoney == this.getData(name)) {
				return true
			}
		}
		return false;
	},
	RechargeItemCB(name) {
		for (let i = 0; i < this.Rechargecontent.childrenCount; i++) {
			if (name == this.Rechargecontent.children[i].name) {
				this.Rechargecontent.children[i].setScale(1.2)
				this.Lab_coin.getSelfFunc().setString(this.getData(name));
				if (this.giveProportion != 0) {
					this.des_recharge.node.active = true;
					let rechargeReward = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).toString(),
						total = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).add(Number(this.edit_coin.string)).toString();
					this.des_recharge.string = `本次充值额外赠送<color=#f4c404>${rechargeReward}金币</c>，总共可获得<color=#f4c404>${total}金币。</c>`
				} else {
					this.des_recharge.node.active = false;
				}
			} else {
				this.Rechargecontent.children[i].setScale(1)
			}
		}

	},
	getData(index) {
		let quickMode = this.Curpageinfo.currentRotationAccount.config.quickMode;
		return this.getFloat(quickMode[index]);
	},
	getFloat(value) {
		return (Number(value).div(100)).toString();
	},

	setLabCoin() {
		if (Number(this.edit_coin.string) > 0) {
			this.des_recharge.node.active = this.giveProportion != 0;
			let rechargeReward = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).toString(),
				total = Number(Number(this.edit_coin.string) * Number(this.giveProportion)).div(10000).add(Number(this.edit_coin.string)).toString();
			let strReward = glGame.user.stringVipFix(rechargeReward, 2),
				strTotal = glGame.user.stringVipFix(total, 2);
			this.des_recharge.string = `<color=#abcaff>本次充值额外赠送</c><color=#f68e1e>${strReward ? strReward : 0}金币</c>，<color=#abcaff>总共可获得</c><color=#f68e1e>${strTotal ? strTotal : 0}金币。</c>`

			if (this.edit_coin.string.substr(0, 1) === '0')
				this.Lab_coin.getSelfFunc().setString(Number(this.edit_coin.string).toString());
		} else {
			//this.Lab_coin.getSelfFunc().setString("0");
			this.des_recharge.node.active = false;
		}

		for (let i = 0; i < this.Rechargecontent.childrenCount; i++) {
			let numTo = this.Rechargecontent.children[i].getChildByName("number").getComponent(cc.Label).string;
			if (this.edit_coin.string === numTo) {
				this.Rechargecontent.children[i].setScale(1.2);
			} else {
				this.Rechargecontent.children[i].setScale(1);
			}
		}
	},


	// //筹码滑动条触摸事件监听
	// touchEvent() {
	//   this._startPos = null;
	//   this._movePos = null;
	//   this.Rowcontent.on('touchstart', (event) => {
	//     console.log('eeeeee',event)
	//       this._startPos = event.getLocation();
	//   });
	//   this.Rowcontent.on('touchmove', (event) => {
	//       this._movePos = event.getLocation();
	//       let _offX = this._movePos.x - this._startPos.x;
	//       this.Rowcontent.x -= _offX;
	//       this._startPos = this._movePos;
	//       //位置限制
	//       let _width = (this.Rowcontent.children.length - 1) * 5 - 245;
	//       // if (this.Rowcontent.x < -_width) {
	//       //     this.Rowcontent.x = -_width;
	//       // } else if (this.Rowcontent.x > _width) {
	//       //     this.Rowcontent.x = _width;
	//       // }
	//   }); 
	// },
	OnDestroy() {
		this.Rowcontent.off('touchstar')
	}
});

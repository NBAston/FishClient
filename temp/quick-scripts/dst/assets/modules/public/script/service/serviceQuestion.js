
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/service/serviceQuestion.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf57bSnwmxOM7uWRNDK3iGT', 'serviceQuestion');
// modules/public/script/service/serviceQuestion.js

"use strict";

var _glGame$baseclass$ext;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

glGame.baseclass.extend((_glGame$baseclass$ext = {
  properties: {
    item: cc.Node,
    item1: cc.Node,
    content: cc.Node
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1001;
    this.pageSize = 10;
    this.page = 1;
    this.isReceive = false;
    this.customList = [];
    this.severice = {};
    this.registerEvent();
    glGame.user.ReqCustomHelpList(this.page, this.pageSize, true);
    this.node.active = false;
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateReqCustomHelpList", this.updateReqCustomHelpList, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateReqCustomHelpList", this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case '':
        ;
        break;

      case '':
        ;
        break;
    }
  },
  updateReqCustomHelpList: function updateReqCustomHelpList(data) {
    this.node.active = true;
    this.severice.page = data.page;
    this.severice.page_size = data.pageSize;
    this.severice.total_page = data.totalPage;
    if (!this.severice.list) this.severice.list = data.list;else this.severice.list = this.severice.list.concat(data.list);
    this.initQuestion(); // this.initQuestion1();
  },
  customData: function customData() {// this.severice = glGame.user.get("customSever").result;
    // console.log('客服信息111question',this.severice)
    // this.initQuestion();
  },
  initQuestion1: function initQuestion1() {
    this.isReceive = true;
    this.contenHeight = 0;

    for (var i = (this.page - 1) * this.pageSize; i < this.severice.list.length; i++) {
      var cowItem = cc.instantiate(this.item);
      cowItem.active = false;
      cowItem.parent = this.content;
      cowItem.children[0].getComponent(cc.Label).string = 'Q：' + this.severice.list[i].title, cowItem.children[1].getComponent(cc.RichText).string = 'A：' + this.severice.list[i].content, this.customList.push(this.severice.list[i]);
      this.contenHeight += cowItem.height;
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  initQuestion: function initQuestion() {
    this.isReceive = true;
    this.contenHeight = 0;

    for (var i = (this.page - 1) * this.pageSize; i < this.severice.list.length; i++) {
      var cowItem = cc.instantiate(this.item1);
      cowItem.active = false;
      cowItem.parent = this.content;
      cowItem.name = "item" + i; // 展示的内容

      cowItem.children[0].children[0].getComponent(cc.RichText).string = 'A：' + this.severice.list[i].content; // 展示标题

      cowItem.children[1].children[0].getComponent(cc.Label).string = 'Q：' + this.severice.list[i].title;
      this.customList.push(this.severice.list[i]);
      this.contenHeight += cowItem.height;
      glGame.panel.showEffectNode(this, this.content, 0.02, true);
    }
  },
  start: function start() {},
  onScrollEvent: function onScrollEvent(scroll, event) {
    for (var i = 0; i < this.pageSize; i++) {
      if (this.severice.list[i] == null) {
        this.isReceive = false;
      }
    }

    if (event === cc.ScrollView.EventType.SCROLL_TO_BOTTOM && this.isReceive == true) {
      if (this.contenHeight >= 400) {
        this.page++;
        if (this.page > this.severice.total_page) return;
        this.isReceive == false;
        glGame.user.ReqCustomHelpList(this.page, this.pageSize);
      }
    }
  }
}, _defineProperty(_glGame$baseclass$ext, "onClick", function onClick(name, node) {
  switch (name) {
    case "title_bg":
      for (var index = 0; index < this.content.childrenCount; index++) {
        if (this.content.children[index].name == node.parent.name && node.parent.children[0].active) continue;
        this.content.children[index].children[0].active = false;
        this.content.children[index].children[1].children[1].scaleY = 1;
      }

      node.parent.children[0].active = !node.parent.children[0].active;

      if (node.parent.children[0].active) {
        node.children[1].scaleY = -1;
      } else {
        node.children[1].scaleY = 1;
      }

      break;
  }
}), _defineProperty(_glGame$baseclass$ext, "OnDestroy", function OnDestroy() {
  this.unRegisterEvent();
}), _glGame$baseclass$ext));

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNlcnZpY2VcXHNlcnZpY2VRdWVzdGlvbi5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiaXRlbSIsImNjIiwiTm9kZSIsIml0ZW0xIiwiY29udGVudCIsIm9uTG9hZCIsIm5vZGUiLCJ6SW5kZXgiLCJwYWdlU2l6ZSIsInBhZ2UiLCJpc1JlY2VpdmUiLCJjdXN0b21MaXN0Iiwic2V2ZXJpY2UiLCJyZWdpc3RlckV2ZW50IiwidXNlciIsIlJlcUN1c3RvbUhlbHBMaXN0IiwiYWN0aXZlIiwiZW1pdHRlciIsIm9uIiwidXBkYXRlUmVxQ3VzdG9tSGVscExpc3QiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJvbkNsaWNrIiwibmFtZSIsImRhdGEiLCJwYWdlX3NpemUiLCJ0b3RhbF9wYWdlIiwidG90YWxQYWdlIiwibGlzdCIsImNvbmNhdCIsImluaXRRdWVzdGlvbiIsImN1c3RvbURhdGEiLCJpbml0UXVlc3Rpb24xIiwiY29udGVuSGVpZ2h0IiwiaSIsImxlbmd0aCIsImNvd0l0ZW0iLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ0aXRsZSIsIlJpY2hUZXh0IiwicHVzaCIsImhlaWdodCIsInBhbmVsIiwic2hvd0VmZmVjdE5vZGUiLCJzdGFydCIsIm9uU2Nyb2xsRXZlbnQiLCJzY3JvbGwiLCJldmVudCIsIlNjcm9sbFZpZXciLCJFdmVudFR5cGUiLCJTQ1JPTExfVE9fQk9UVE9NIiwiaW5kZXgiLCJjaGlsZHJlbkNvdW50Iiwic2NhbGVZIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQjtBQUVJQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFQyxFQUFFLENBQUND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R0FBOEQsQ0FBOUQ7QUFDSDs7QUFDRHBELE1BQUFBLElBQUksQ0FBQ2dDLE1BQUwsQ0FBWUMsUUFBWixDQUFxQixDQUFyQixFQUF3QnZCLE1BQXhCLEdBQWlDLENBQUNWLElBQUksQ0FBQ2dDLE1BQUwsQ0FBWUMsUUFBWixDQUFxQixDQUFyQixFQUF3QnZCLE1BQTFEOztBQUNBLFVBQUlWLElBQUksQ0FBQ2dDLE1BQUwsQ0FBWUMsUUFBWixDQUFxQixDQUFyQixFQUF3QnZCLE1BQTVCLEVBQW9DO0FBQ2hDVixRQUFBQSxJQUFJLENBQUNpQyxRQUFMLENBQWMsQ0FBZCxFQUFpQm1CLE1BQWpCLEdBQTBCLENBQUMsQ0FBM0I7QUFDSCxPQUZELE1BRU87QUFDSHBELFFBQUFBLElBQUksQ0FBQ2lDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCbUIsTUFBakIsR0FBMEIsQ0FBMUI7QUFDSDs7QUFDRDtBQWJSO0FBZUgsQ0F0SEwsNEVBd0hnQjtBQUNSLE9BQUt0QyxlQUFMO0FBQ0gsQ0ExSEwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgaXRlbTE6IGNjLk5vZGUsXHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAxO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuaXNSZWNlaXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXN0b21MaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5zZXZlcmljZSA9IHt9O1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpXHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuUmVxQ3VzdG9tSGVscExpc3QodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVJlcUN1c3RvbUhlbHBMaXN0XCIsIHRoaXMudXBkYXRlUmVxQ3VzdG9tSGVscExpc3QsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVSZXFDdXN0b21IZWxwTGlzdFwiLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJyc6IDsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJyc6IDsgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUmVxQ3VzdG9tSGVscExpc3QoZGF0YSkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V2ZXJpY2UucGFnZSA9IGRhdGEucGFnZTtcclxuICAgICAgICB0aGlzLnNldmVyaWNlLnBhZ2Vfc2l6ZSA9IGRhdGEucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5zZXZlcmljZS50b3RhbF9wYWdlID0gZGF0YS50b3RhbFBhZ2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNldmVyaWNlLmxpc3QpIHRoaXMuc2V2ZXJpY2UubGlzdCA9IGRhdGEubGlzdDtcclxuICAgICAgICBlbHNlIHRoaXMuc2V2ZXJpY2UubGlzdCA9IHRoaXMuc2V2ZXJpY2UubGlzdC5jb25jYXQoZGF0YS5saXN0KTtcclxuICAgICAgICB0aGlzLmluaXRRdWVzdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuaW5pdFF1ZXN0aW9uMSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjdXN0b21EYXRhKCkge1xyXG4gICAgICAgIC8vIHRoaXMuc2V2ZXJpY2UgPSBnbEdhbWUudXNlci5nZXQoXCJjdXN0b21TZXZlclwiKS5yZXN1bHQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+WuouacjeS/oeaBrzExMXF1ZXN0aW9uJyx0aGlzLnNldmVyaWNlKVxyXG4gICAgICAgIC8vIHRoaXMuaW5pdFF1ZXN0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdFF1ZXN0aW9uMSgpIHtcclxuICAgICAgICB0aGlzLmlzUmVjZWl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb250ZW5IZWlnaHQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAodGhpcy5wYWdlIC0gMSkgKiB0aGlzLnBhZ2VTaXplOyBpIDwgdGhpcy5zZXZlcmljZS5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3dJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgY293SXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY293SXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGNvd0l0ZW0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnUe+8micgKyB0aGlzLnNldmVyaWNlLmxpc3RbaV0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb3dJdGVtLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gJ0HvvJonICsgdGhpcy5zZXZlcmljZS5saXN0W2ldLmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUxpc3QucHVzaCh0aGlzLnNldmVyaWNlLmxpc3RbaV0pXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVuSGVpZ2h0ICs9IGNvd0l0ZW0uaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuY29udGVudCwwLjAyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0UXVlc3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5pc1JlY2VpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29udGVuSGVpZ2h0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gKHRoaXMucGFnZSAtIDEpICogdGhpcy5wYWdlU2l6ZTsgaSA8IHRoaXMuc2V2ZXJpY2UubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY293SXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbTEpO1xyXG4gICAgICAgICAgICBjb3dJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb3dJdGVtLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgY293SXRlbS5uYW1lID0gXCJpdGVtXCIgKyBpXHJcbiAgICAgICAgICAgIC8vIOWxleekuueahOWGheWuuVxyXG4gICAgICAgICAgICBjb3dJdGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gJ0HvvJonICsgdGhpcy5zZXZlcmljZS5saXN0W2ldLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIC8vIOWxleekuuagh+mimFxyXG4gICAgICAgICAgICBjb3dJdGVtLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ1HvvJonICsgdGhpcy5zZXZlcmljZS5saXN0W2ldLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUxpc3QucHVzaCh0aGlzLnNldmVyaWNlLmxpc3RbaV0pXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVuSGVpZ2h0ICs9IGNvd0l0ZW0uaGVpZ2h0XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLCB0aGlzLmNvbnRlbnQsIDAuMDIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uU2Nyb2xsRXZlbnQoc2Nyb2xsLCBldmVudCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYWdlU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldmVyaWNlLmxpc3RbaV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQgPT09IGNjLlNjcm9sbFZpZXcuRXZlbnRUeXBlLlNDUk9MTF9UT19CT1RUT00gJiYgdGhpcy5pc1JlY2VpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW5IZWlnaHQgPj0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UrKztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPiB0aGlzLnNldmVyaWNlLnRvdGFsX3BhZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNlaXZlID09IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnVzZXIuUmVxQ3VzdG9tSGVscExpc3QodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aXRsZV9iZ1wiOlxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5jaGlsZHJlbltpbmRleF0ubmFtZSA9PSBub2RlLnBhcmVudC5uYW1lICYmIG5vZGUucGFyZW50LmNoaWxkcmVuWzBdLmFjdGl2ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baW5kZXhdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudC5jaGlsZHJlblswXS5hY3RpdmUgPSAhbm9kZS5wYXJlbnQuY2hpbGRyZW5bMF0uYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50LmNoaWxkcmVuWzBdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW5bMV0uc2NhbGVZID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW5bMV0uc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
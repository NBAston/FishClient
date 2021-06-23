
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/login/script/prefab/update_bag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d162MZs6pK8KP1pkoZ+TAo', 'update_bag');
// modules/login/script/prefab/update_bag.js

"use strict";

glGame.baseclass.extend({
  properties: {
    progress_bar: cc.ProgressBar,
    progress: cc.Label
  },
  onLoad: function onLoad() {
    this.progress_bar.progress = 0;
    this.progress.string = '()';
    this.schedule(this.updateProgress.bind(this), 1);
    this.load_size = 0;
    this.load_count = 0;
    this.bag_size = 0;
    this.move_count = 0;
  },
  start: function start() {},
  updateProgress: function updateProgress() {
    var data = glGame.platform.UpdateProgress();

    if (data && data.size && data.load) {
      if (this.load_size != data.load) this.move_count = Math.ceil((data.load - this.load_count) / (1 / cc.director.getDeltaTime()));
      console.log(this.move_count);
      this.load_size = data.load;
      this.bag_size = data.size;
    }
  },
  update: function update(dt) {
    if (this.bag_size == 0 || this.load_size == 0) return;
    if (this.load_size == this.load_count) return;
    this.load_count += this.move_count;
    this.load_count = Math.min(this.load_count, this.load_size);
    if (this.load_size == this.bag_size) this.load_count = this.bag_size;
    this.progress_bar.progress = this.load_count / this.bag_size;
    this.progress.string = "(".concat(this.load_count, "/").concat(this.bag_size, ")...");
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcbG9naW5cXHNjcmlwdFxccHJlZmFiXFx1cGRhdGVfYmFnLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJwcm9ncmVzc19iYXIiLCJjYyIsIlByb2dyZXNzQmFyIiwicHJvZ3Jlc3MiLCJMYWJlbCIsIm9uTG9hZCIsInN0cmluZyIsInNjaGVkdWxlIiwidXBkYXRlUHJvZ3Jlc3MiLCJiaW5kIiwibG9hZF9zaXplIiwibG9hZF9jb3VudCIsImJhZ19zaXplIiwibW92ZV9jb3VudCIsInN0YXJ0IiwiZGF0YSIsInBsYXRmb3JtIiwiVXBkYXRlUHJvZ3Jlc3MiLCJzaXplIiwibG9hZCIsIk1hdGgiLCJjZWlsIiwiZGlyZWN0b3IiLCJnZXREZWx0YVRpbWUiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlIiwiZHQiLCJtaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVDLEVBQUUsQ0FBQ0MsV0FEVDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVGLEVBQUUsQ0FBQ0c7QUFGTCxHQURRO0FBS3BCQyxFQUFBQSxNQUxvQixvQkFLWDtBQUNMLFNBQUtMLFlBQUwsQ0FBa0JHLFFBQWxCLEdBQTZCLENBQTdCO0FBQ0EsU0FBS0EsUUFBTCxDQUFjRyxNQUFkLEdBQXVCLElBQXZCO0FBQ0EsU0FBS0MsUUFBTCxDQUFjLEtBQUtDLGNBQUwsQ0FBb0JDLElBQXBCLENBQXlCLElBQXpCLENBQWQsRUFBOEMsQ0FBOUM7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBRUgsR0FkbUI7QUFnQnBCQyxFQUFBQSxLQWhCb0IsbUJBZ0JaLENBRVAsQ0FsQm1CO0FBb0JwQk4sRUFBQUEsY0FwQm9CLDRCQW9CSDtBQUNiLFFBQUlPLElBQUksR0FBR25CLE1BQU0sQ0FBQ29CLFFBQVAsQ0FBZ0JDLGNBQWhCLEVBQVg7O0FBQ0EsUUFBSUYsSUFBSSxJQUFJQSxJQUFJLENBQUNHLElBQWIsSUFBcUJILElBQUksQ0FBQ0ksSUFBOUIsRUFBb0M7QUFDaEMsVUFBSSxLQUFLVCxTQUFMLElBQWtCSyxJQUFJLENBQUNJLElBQTNCLEVBQWlDLEtBQUtOLFVBQUwsR0FBa0JPLElBQUksQ0FBQ0MsSUFBTCxDQUFVLENBQUNOLElBQUksQ0FBQ0ksSUFBTCxHQUFZLEtBQUtSLFVBQWxCLEtBQWlDLElBQUVWLEVBQUUsQ0FBQ3FCLFFBQUgsQ0FBWUMsWUFBWixFQUFuQyxDQUFWLENBQWxCO0FBQ2pDQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLWixVQUFqQjtBQUNBLFdBQUtILFNBQUwsR0FBaUJLLElBQUksQ0FBQ0ksSUFBdEI7QUFDQSxXQUFLUCxRQUFMLEdBQWdCRyxJQUFJLENBQUNHLElBQXJCO0FBQ0g7QUFDSixHQTVCbUI7QUE4QnBCUSxFQUFBQSxNQTlCb0Isa0JBOEJiQyxFQTlCYSxFQThCVDtBQUNQLFFBQUksS0FBS2YsUUFBTCxJQUFpQixDQUFqQixJQUFzQixLQUFLRixTQUFMLElBQWtCLENBQTVDLEVBQStDO0FBQy9DLFFBQUksS0FBS0EsU0FBTCxJQUFrQixLQUFLQyxVQUEzQixFQUF1QztBQUN2QyxTQUFLQSxVQUFMLElBQW1CLEtBQUtFLFVBQXhCO0FBQ0EsU0FBS0YsVUFBTCxHQUFrQlMsSUFBSSxDQUFDUSxHQUFMLENBQVMsS0FBS2pCLFVBQWQsRUFBMEIsS0FBS0QsU0FBL0IsQ0FBbEI7QUFDQSxRQUFJLEtBQUtBLFNBQUwsSUFBa0IsS0FBS0UsUUFBM0IsRUFBcUMsS0FBS0QsVUFBTCxHQUFrQixLQUFLQyxRQUF2QjtBQUNyQyxTQUFLWixZQUFMLENBQWtCRyxRQUFsQixHQUE2QixLQUFLUSxVQUFMLEdBQWtCLEtBQUtDLFFBQXBEO0FBQ0EsU0FBS1QsUUFBTCxDQUFjRyxNQUFkLGNBQTJCLEtBQUtLLFVBQWhDLGNBQThDLEtBQUtDLFFBQW5EO0FBQ0g7QUF0Q21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHByb2dyZXNzX2JhcjogY2MuUHJvZ3Jlc3NCYXIsXHJcbiAgICAgICAgcHJvZ3Jlc3M6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHJpbmcgPSAnKCknO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVQcm9ncmVzcy5iaW5kKHRoaXMpLCAxKTtcclxuICAgICAgICB0aGlzLmxvYWRfc2l6ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmJhZ19zaXplID0gMDtcclxuICAgICAgICB0aGlzLm1vdmVfY291bnQgPSAwO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVQcm9ncmVzcygpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGdsR2FtZS5wbGF0Zm9ybS5VcGRhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuc2l6ZSAmJiBkYXRhLmxvYWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZF9zaXplICE9IGRhdGEubG9hZCkgdGhpcy5tb3ZlX2NvdW50ID0gTWF0aC5jZWlsKChkYXRhLmxvYWQgLSB0aGlzLmxvYWRfY291bnQpIC8gKDEvY2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKCkpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tb3ZlX2NvdW50KTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkX3NpemUgPSBkYXRhLmxvYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYmFnX3NpemUgPSBkYXRhLnNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5iYWdfc2l6ZSA9PSAwIHx8IHRoaXMubG9hZF9zaXplID09IDApIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5sb2FkX3NpemUgPT0gdGhpcy5sb2FkX2NvdW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5sb2FkX2NvdW50ICs9IHRoaXMubW92ZV9jb3VudDtcclxuICAgICAgICB0aGlzLmxvYWRfY291bnQgPSBNYXRoLm1pbih0aGlzLmxvYWRfY291bnQsIHRoaXMubG9hZF9zaXplKTtcclxuICAgICAgICBpZiAodGhpcy5sb2FkX3NpemUgPT0gdGhpcy5iYWdfc2l6ZSkgdGhpcy5sb2FkX2NvdW50ID0gdGhpcy5iYWdfc2l6ZTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IHRoaXMubG9hZF9jb3VudCAvIHRoaXMuYmFnX3NpemU7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHJpbmcgPSBgKCR7dGhpcy5sb2FkX2NvdW50fS8ke3RoaXMuYmFnX3NpemV9KS4uLmA7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
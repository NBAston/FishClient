
    //  设置距离窗口边距
    var cX = 0,cY=0;

		var screenHeight = document.documentElement.clientHeight;  
    var screenWidth =document.documentElement.clientWidth;

    var new_element_N=document.createElement("style"); 
    new_element_N.innerHTML = '#drager {' +
      '   position: fixed;' +
      '   background-size: contain;' +
      '   z-index: 10000;' +
      '   cursor: pointer;' +
      '   border-radius: 30%;' +
      '   padding: 6px;' +
      '   visibility: hidden;' +
      ' } ';
    document.body.appendChild(new_element_N);
    new_element_N=document.createElement('div'); 
    new_element_N.setAttribute("id","drager");
    new_element_N.style.top=`${cY}px`;
    new_element_N.style.left=`${cX}px`;
    new_element_N.style.backgroundImage=`url('exit.png')`;
    new_element_N.style.width=`${screenHeight/15}px`;
    new_element_N.style.height=`${screenHeight/15}px`;
    document.body.appendChild(new_element_N);
    
  // 
    var posX; // 相对于悬浮窗的X位置
    var posY; // 相对于悬浮窗的Y位置
    var fdiv = document.getElementById("drager"); 
    var fdivWidth = parseInt(fdiv.clientWidth/2);
    var fdivHeight = parseInt(fdiv.clientHeight/2);
    var originX = 0, originY = 0;
    fdiv.onmousedown=function(e)
    { 
      screenWidth =document.documentElement.clientWidth;
      screenHeight = document.documentElement.clientHeight; 
      cX = (screenWidth - cc.game.container.clientWidth)/2;
      cY = (screenHeight - cc.game.container.clientHeight)/2;

    
      if(!e){ e = window.event; } //IE
      originX = parseInt(fdiv.style.left);
      originY = parseInt(fdiv.style.top);
      posX = e.clientX - parseInt(fdiv.style.left);
      posY = e.clientY - parseInt(fdiv.style.top);
      document.onmousemove = mousemove;      
    }
    document.onmouseup = function()//释放时自动贴到最近位置
    {
      document.onmousemove = null;

      if(Math.abs(parseInt(fdiv.style.left) - originX) < 2 && 
      Math.abs(parseInt(fdiv.style.top) - originY) < 2) {
        glGame.emitter.emit("floatButton");
        return;
      }

      var x = parseInt(fdiv.style.left) + fdivWidth/2;
      var y = parseInt(fdiv.style.top) + fdivHeight/2;
      var offsetx, offsety;

      var offsetx = cc.game.container.clientWidth/2 - Math.abs(screenWidth/2 - x);
      var offsety = cc.game.container.clientHeight/2 - Math.abs(screenHeight/2 - y);

      var canvas = cc.game.container;
      var canvasRect = canvas.getBoundingClientRect();

      // 貼近x方向
      if(offsetx <= offsety) {
        if(x <= screenWidth/2) {
          fdiv.style.left = canvasRect.left + "px";
        } else {
          fdiv.style.left = (canvasRect.left + canvasRect.width - parseInt(fdiv.clientWidth)) + "px";
        }
      } else {
        // 貼近y方向
        if(y <= screenHeight/2) {
          fdiv.style.top = canvasRect.top + "px";
        } else {
          fdiv.style.top = (canvasRect.top + canvasRect.height - parseInt(fdiv.clientHeight)) + "px";
        }
      }
    }
    function mousemove(ev)
    {
      if(ev==null){ ev = window.event;}//IE

      fdiv.style.top = (ev.clientY - posY) + "px";
      fdiv.style.left = (ev.clientX - posX) + "px";

      var canvas = cc.game.container;
      var canvasRect = canvas.getBoundingClientRect();
      if (+fdiv.style.top.replace("px","") < canvasRect.top) {fdiv.style.top = canvasRect.top + "px";}
      if (+fdiv.style.top.replace("px","") > (canvasRect.top + canvasRect.height - parseInt(fdiv.clientHeight))) {fdiv.style.top = (canvasRect.top + canvasRect.height - parseInt(fdiv.clientHeight)) + "px";}
      if (+fdiv.style.left.replace("px","") < canvasRect.left) {fdiv.style.left = canvasRect.left + "px";}
      if (+fdiv.style.left.replace("px","") > (canvasRect.left + canvasRect.width - parseInt(fdiv.clientWidth))) {fdiv.style.left = (canvasRect.left + canvasRect.width - parseInt(fdiv.clientWidth)) + "px";}
    }
    // window.onload = window.onresize = function() { //窗口大小改变事件
    //   screenWidth =document.documentElement.clientWidth;
    //   screenHeight = document.documentElement.clientHeight;  
    //   //  to do  这要重新计算一下cX cY

    //   cX = (screenWidth - cc.game.container.clientWidth)/2;
    //   cY = (screenHeight - cc.game.container.clientHeight)/2;
    //   fdiv.style.top = cY;
    //   fdiv.style.left = cX;
      
      // if( (parseInt(fdiv.style.top)+parseInt(fdiv.clientHeight))>screenHeight){//窗口改变适应超出的部分
      //    fdiv.style.top=(screenHeight-parseInt(fdiv.clientHeight))+"px";
      // }  
      // if( (parseInt(fdiv.style.left)+parseInt(fdiv.clientWidth))>screenWidth){//窗口改变适应超出的部分
      //    fdiv.style.left=(screenWidth-parseInt(fdiv.clientWidth))+"px";
      // }  
      // document.onmouseup.apply()
    // };
    fdiv.addEventListener('touchstart', fdiv.onmousedown, false);  
    fdiv.addEventListener('touchmove', function(event) {
      // 如果这个元素的位置内只有一个手指的话
      if (event.targetTouches.length == 1) {
    　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0]; 
        if((touch.pageY)<=cY){//超过顶部
          fdiv.style.top=`${cY}px`;
        }else if(touch.pageY>(screenHeight-parseInt(fdiv.clientHeight)-cY)){//超过底部
          fdiv.style.top=(screenHeight-parseInt(fdiv.clientHeight)-cY)+"px";
        }else{
          fdiv.style.top = (touch.pageY-parseInt(fdiv.clientHeight)/2) + "px";
        }
          
        if(touch.pageX<=cX){//超过左边
          fdiv.style.left=`${cX}px`;
        }else if( touch.pageX >(screenWidth-parseInt(fdiv.clientWidth)-cX)){//超过右边
          fdiv.style.left=(screenWidth-parseInt(fdiv.clientWidth)-cX)+"px";
        }else{
          fdiv.style.left = (touch.pageX-parseInt(fdiv.clientWidth)/2) + "px";
        }
      }
    }, false); 
    fdiv.addEventListener('touchend', document.onmouseup , false);
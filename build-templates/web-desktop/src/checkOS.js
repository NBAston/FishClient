

var settingFile = 'src/settings.js';
var mainFile = 'main.js';
var cssMobileFile = 'style-mobile.css';
var cssDesktopFile = 'style-desktop.css';

var fixWidth = 1136;
var fixHeight = 640;

function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

function createCssLink(cssURL, id) {
    var head = document.getElementsByTagName('head')[0];
    var linkTag = document.createElement('link');
    linkTag.id = id;
    linkTag.href = cssURL;
    linkTag.setAttribute('rel', 'stylesheet');
    linkTag.setAttribute('media', 'all');
    linkTag.setAttribute('type', 'text/css');
    head.appendChild(linkTag);
}



if (isMobile()) {
    createCssLink(cssMobileFile)
	document.write([
		'<canvas id="GameCanvas" oncontextmenu="event.preventDefault()" tabindex="0"></canvas>',
		'<div id="GameDiv">',
		'       <div class="wrap" id="splash">',
		'	</div>',
		'</div>',
		'<div class="show-wrap" id=rotatetip style="display:none;">',
			'<div class="show-w all">',
				'<svg class="icon" aria-hidden="true">',
					'<use xlink:href="#icon-3"></use>',
				'</svg>	',
				'<p>为了更好的体验，请将设备横过来</p>',
			'</div>',
		'</div>',
		'<div class="show-wrap" id=orientationswipe style="display:none;">',
			'<div class="show-h all">',
				'<div>',
					'<svg class="icon i1" aria-hidden="true">',
						'<use xlink:href="#icon-1"></use>',
					'</svg>	',
					'<svg class="icon i2" aria-hidden="true">',
						'<use xlink:href="#icon-2"></use>',
					'</svg>',
				'</div>',
				'<p>向上滑动可全屏显示</p>',
			'</div>',
		'</div>',
		'<script src = "' + settingFile + '" charset = "utf-8"></script>',
		'<script src = "' + mainFile + '" charset = "utf-8"> </script>',
	].join('\r\n'));
} else {
    createCssLink(cssDesktopFile)
    document.write([
        '<div id="GameDiv">',
        '  <div id="posbox" class="posbox">',
        '       <canvas id="GameCanvas" oncontextmenu="event.preventDefault()" tabindex="0"></canvas>',
        '       <div class="wrap" id="splash">',
        '       </div>',
        '  </div>',
        '</div>',

        '<script src = "' + settingFile + '" charset = "utf-8"></script>',
        '<script src = "' + mainFile + '" charset = "utf-8"> </script>',
    ].join('\r\n'));
}

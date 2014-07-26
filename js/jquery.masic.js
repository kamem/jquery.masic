/**
 *	jQuery masic.
 *	jQuery required.
 *
 *	* Copyright 2014 (c) kamem
 *	* http://develo.org/
 *	* Licensed Under the MIT.
 *
 *	Date: 2014.06.28
 *
 *	@class masic
 */

(function($,global){

$.fn.masic = function (options) {
	var $content = $(this),

		options = $.extend({
			removeTime: 500
		},options),

		removeTime = options.removeTime,

		startX = 0,
		endX = 0,
		startY = 0,
		startTime = 0,
		startLeft = 0,

		count = 0,
		randomNum = 30,
		isMoving = false;

	$content.on(eventType.touchStart, function(e){
		var touch = mobile ? e.originalEvent.touches[0] : e;

		startX = mobile ? touch.pageX : touch.clientX;
		startY = mobile ? touch.pageY : touch.clientY;
		startTime = new Date().getTime();
		isMoving = true;

	});

	$content.on(eventType.touchMove, function(e){
		var $this = $(this),
		touch = mobile ? e.originalEvent.touches[0] : e,
		touchpageX = mobile ? touch.pageX : touch.clientX;
		touchpageY = mobile ? touch.pageY : touch.clientY;

		if(isMoving) {
			//console.log(count,touchpageX,touchpageY);

			var $masic = $this.append('<hr class="masic' + count + '">').find('.masic' + count);

			var randomTop = Math.random() * (randomNum * 2) - randomNum,
				randomLeft = Math.random() * (randomNum * 2) - randomNum;

			$masic.css({
				top: touchpageY + randomTop,
				left: touchpageX + randomLeft
			});

			var timer = setTimeout(function(){
				$masic.off().remove();
			},removeTime);

			count++;
		}
	});

	$content.on(eventType.touchEnd, function(e){
		var touch = mobile ? e.originalEvent.changedTouches[0] : e;
		endX = mobile ? touch.pageX : touch.clientX;

		isMoving = false;
		count = 0;
	});
}


var windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth,
	windowHeight = (!(window.innerHeight)) ?  document.documentElement.clientHeight : window.innerHeight;

var userAgent = navigator.userAgent;
userAgent.match(/iPhone OS (\w+){1,3}/g);
userAgent.match(/CPU OS (\w+){1,3}/g);

//iPhone & iPad
var osVar=(RegExp.$1.replace(/_/g, '')+'00').slice(0,3),

// User Agent
ua = {
	iPhone : userAgent.search(/iPhone/) !== -1,
	iPad : userAgent.search(/iPad/) !== -1,
	Android : ((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1),
	AndroidTab : (userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)),
	Android3_2 : userAgent.search(/Android 3.2/) !== -1,
	iOS5_less : ((userAgent.search(/iPhone/) !== -1) || (userAgent.search(/iPad/) !== -1)) && (osVar < 500),
	other : !(
	(userAgent.search(/iPhone/) !== -1) ||
	(userAgent.search(/iPad/) !== -1) ||
	(((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1)) ||
	((userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)))
	)
},

mobile = ua.iPhone || ua.iPad || ua.Android || ua.AndroidTab,

//animation type
type = "transition",

//event
eventType = {
	touchStart: mobile ? 'touchstart' : 'mousedown',
	touchEnd: mobile ? 'touchend' : 'mouseup',
	touchMove: mobile ? 'touchmove' : 'mousemove',
	animationEnd: (!(userAgent.toLowerCase().indexOf("webkit") == -1)) ? ((type == "transition") ? "webkitTransitionEnd" : "webkitAnimationEnd") :
(!(userAgent.toLowerCase().indexOf("gecko") == -1)) ? ((type == "transition") ? "transitionend" : "animationend") :
(!(userAgent.toLowerCase().indexOf("opera") == -1)) ? ((type == "transition") ? "oTransitionEnd" : "oAnimationend") :
(!(userAgent.toLowerCase().indexOf("msie 10.0") == -1)) ? ((type == "transition") ? "MSTransitionEnd" : "MSAnimationend") : ""
};
}(jQuery,this));
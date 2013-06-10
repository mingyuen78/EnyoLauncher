enyo.kind({
	name: "PopupWindow",
	defaultURL: "index.html",
	defaultWidth:320,
	defaultHeight:480,
	offSet:0,
	popupWin:function(url,param){
		if(arguments.length){
			window.open(unescape(url), "App","location=0,status=0,scrollbars=0,width="+(param.width+this.offSet)+",height="+(param.height+this.offSet));
		} else {
			window.open(unescape(url), "App","location=0,status=0,scrollbars=0,width="+(this.defaultWidth+this.offSet)+",height="+(this.defaultHeight+this.offSet));
		}
	}
});
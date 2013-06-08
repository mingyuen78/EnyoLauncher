enyo.kind({
    name: "IconButton",
    kind: "Button",
    icon:"",
    components: [
        {
        	name:"iconControl",	
        	tag:"i",
        	classes: "icon"
        }
    ],
    create:function(){
    	this.inherited(arguments);
    	this.$.iconControl.addClass(this.icon);
    }
});
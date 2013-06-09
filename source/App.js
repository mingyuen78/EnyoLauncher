enyo.kind({
	name: "App",
	global:com.Global,
	kind: "FittableRows", 
	classes: "enyo-fit enyo-unselectable",
	components: [
		{ kind:"Header"	},
		{
			kind: "Panels", 
			name:"panelControl",
			classes: "panelSlider", 
			fit: true, 
			draggable:true,
			arrangerKind: "CollapsingArranger", 
			wrap: false,
			components: [
				{
					classes:"leftPane"
				},
				{
					classes:"appBody",
					layoutKind: "FittableRowsLayout",
					components:[
						{   	
							kind: "Scroller",
							name: "contentControl",
							fit:true, touch:true, 
							thumb:true,
							vertical:"auto",
							components:[
								{ kind:"Dashboard" }
							]
						}
					]
				}
			]
		},
		{ kind:"Footer" }
	],
	create: function(inSender,inEvent){
		this.inherited(arguments);
		var self = this;
		this.$.panelControl.setIndex(1);
		this.resolution = this.global.getLocal("ENYO.KITCHENSINK.RESOLUTION");
		if (this.resolution == null){
			this.grappler = new util.Grappler(); 
			this.grappler.getJSONFile("assets/settings/resolution.json",onSuccess,onFail);
			function onSuccess(inSender,inResponse){
				console.log("Storing Settings...");
				self.global.storeLocal("ENYO.KITCHENSINK.RESOLUTION",inResponse);
			}
			function onFail(error){
				console.log("Setttings file is missing or corrupted...");	
			}
		} 
	},
	rendered : function(inSender,inEvent){
		this.inherited(arguments);
	} 
});
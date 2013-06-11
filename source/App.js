enyo.kind({
	name: "App",
	global:com.Global,
	kind: "FittableRows", 
	classes: "enyo-fit enyo-unselectable",
	components: [
		{ 
			name:"headerControl",
			kind:"Header",
			onHeaderButtonTapped:"handleHeaderButtonTapped" 
		},
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
					name:"navigationControl",
					classes:"leftPane",
					kind:"SideMenu",
					onMenuButtonTapped:"handleChangeContent"
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
	},
	handleHeaderButtonTapped:function(inSender,inEvent) {
		switch(inEvent.name){
			case "headerLeft":
				console.log(this.$.panelControl.getIndex());
				if(this.$.panelControl.getIndex()){
					this.$.panelControl.setIndex(0);
				} else {
					this.$.panelControl.setIndex(1);
				}
			break;
			case "headerRight":
				alert('Feature coming soon...');
			break;
		}
	},
	setContentKind:function(kindName){
		var kindControl = { kind:window[kindName] };
    	this.$.contentControl.destroyClientControls();
    	this.$.contentControl.createComponent(kindControl);
    	this.$.contentControl.render();
    	
    },
	handleChangeContent:function(inSender,inEvent){
		this.setContentKind(inEvent.page);
		//console.log(inEvent);
		this.$.headerControl.setTitle(inEvent.content);
	}
});
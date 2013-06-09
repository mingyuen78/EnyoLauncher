enyo.kind({
    name: "RepeaterList",
    global:com.Global,
    components:[
	    {
	    	name:"repeater",
	    	kind: "Repeater",
			count:0, 
			touch:true,
			onSetupItem: "setupItem", 
		    components: [
		        {
					name: "item", 
					classes:"itemRepeater", 
					ontap:'listItemTapped',
					layoutKind: "FittableColumnsLayout", 
					components: [
						{
							name:"iconPlaceHolder",
							tag:"i",
							classes:"listIconPlaceHolder icon-tablet icon-2x"

						},
						{
							name: "itemRepeater", 
							tag:"h1",
							content:"",
							classes:"repeaterListItem"
						}
					]
		        }
		    ]
		}
    ],
    create:function(){
    	this.inherited(arguments);
    	this.refreshList();
    },
    refreshList:function(){
    	this.datasource = this.global.getLocal("ENYO.KITCHENSINK.RESOLUTION");
    	this.$.repeater.setCount(this.datasource.length);
    },
    setupItem:function(inSender,inEvent) {
    	inEvent.item.$.itemRepeater.setContent(this.datasource[inEvent.index].name);
    },
    listItemTapped:function(inSender,inEvent) {
    	console.log("Launching page in resolution : "+ this.datasource[inEvent.index].width + " x "+ this.datasource[inEvent.index].height);
    }
});
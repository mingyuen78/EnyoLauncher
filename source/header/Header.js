enyo.kind({
	name: "Header",
	kind: "onyx.Toolbar",
	title:"EnyoJS Kitchen Sink",
	layoutKind: "FittableColumnsLayout",
	components: [
		{
			name: "headerLeft",
			classes:"headerLeft",
			kind:"IconButton",
			icon:"icon-reorder"	
		},
		{
			tag:"h1",
			classes:"txtAlignCenter headerTextTitle",
			name:"txtHeaderTitle",
			content:"Header",
			fit:true
		},
		{
			name: "headerRight",
			classes:"headerRight",
			kind:"IconButton",
			icon:"icon-cog"				
		} 
	],
	
	create:function(){
		this.inherited(arguments);
		this.setTitle(this.title);
	},
	setTitle:function(title){
		this.title = title;
		this.$.txtHeaderTitle.setContent(title);
	}
});
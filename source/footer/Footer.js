enyo.kind({
	name: "Footer",
	kind: "onyx.Toolbar",
	layoutKind: "FittableColumnsLayout",
	components: [
		{
			fit:true
		}
	],
	create:function(){
		this.inherited(arguments);
		console.log("Footer Loaded...");
	}
});
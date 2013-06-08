enyo.kind({
	name: "enyo.tutorial.app",
	kind: "FittableRows", 
	classes: "enyo-fit", 
	components: [
		// ToolBar Components.
		{   name:'headerToolbar', kind: "onyx.Toolbar",
			layoutKind: "FittableColumnsLayout", 
				components: [
					{kind: "onyx.Button", content: "Slide", name:'btnSlider', ontap:'btnSliderTapped'},
					{content: "HEADER", fit:true, style:'text-align:center'},
					{kind: "onyx.Button", content: "Next", name:'btnNext', ontap:'btnNextTapped'},
				]
		},
		// List Components.
		{   name: "list", kind: "List", count: 20000, multiSelect: false, fit: true, onSetupItem: "setupItem", 
				components: [
					{name: "item", style:'height:30px;padding:15px;border:1px solid #f3f3f3;', ontap:'listItemTapped', components: [
						{name: "index", style:'width:25%; float:left; font-size:1em'},
						{name: "name", style:'width:75%; float:left; font-size:1em;text-indent:15px'},
						{kind: "onyx.Button", content: "X", name:'btnDete', ontap:'btnDeleteRow', style:'border-radius:10px;width:30px'},
					]}
				]
		},		
	],
	names:[],
	setupItem: function(inSender, inEvent) {
			// this is the row we're setting up
			var i = inEvent.index;
			// make some mock data if we have none for this row
			if (!this.names[i]) {
				this.names[i] = Math.random(999);
			}
			var n = this.names[i];
			var ni = ("00000" + i).slice(-7);
			// apply selection style if inSender (the list) indicates that this row is selected.
			this.$.item.addRemoveClass("list-sample-selected", inSender.isSelected(i));
			this.$.name.setContent(n);
			this.$.index.setContent(ni);
	},
	listItemTapped : function(inSender, inEvent) {
		console.log(inEvent.index + ' tapped');
		// Correspond list with array "names" inside enyo;
		console.log(this.names[inEvent.index]);
	},
	btnSliderTapped: function(inSender, inEvent) {
		alert('go!');
	},

	btnNextTapped: function(inSender, inEvent) {
		new enyo.tutorial.page2().renderInto(document.body);
	}

});
enyo.kind({
	name: "enyo.tutorial.page2",
	kind: "FittableRows", 
	classes: "enyo-fit", 
	components: [
		{
			kind: "onyx.Toolbar",
			layoutKind: "FittableColumnsLayout", 
				components: [
					{kind: "onyx.Button", content: "Prev", name:'btnPrev', ontap:'btnPrevTapped'},
					{content: "Filtered Search", fit:true, style:'text-align:center'},
				]
		},
		{
			kind: "FittableColumns", 
			style:'margin:10px',
				components: [
					{
						name:'searchInput', 
						kind: "onyx.Input", 
						placeholder: "Search text here...", 
						fit:true, 
						style:'padding:10px;font-size:1.2em;', 
						onchange: "search"
					}
				]
		},
		{   
			name: "list", kind: "List", multiSelect: false, fit: true, count:0, onSetupItem: "setupItem", 
				components: [
					{name: "item", style:'height:30px;padding:15px;border:1px solid #f3f3f3;', ontap:'listItemTapped', components: [
						{name: "age", style:'width:20%; float:left; font-size:1.5em'},
						{name: "name", style:'width:80%; float:left; font-size:1.5em'}
					]}
				]
		},	 
	],
	// Sample Data in form of Array; the real thing will have some callback/ajax that returns actual data
	db: [
		{"name":"alex","age":13},
		{"name":"amy","age":12},
		{"name":"azrul","age":12},
		{"name":"ben","age":12},
		{"name":"beniotz","age":11},
		{"name":"chasse","age":13},
		{"name":"charlie","age":13},
		{"name":"donny","age":11},
		{"name":"donavon","age":12},
		{"name":"eddie","age":13},
		{"name":"edison","age":13},
		{"name":"eddy","age":11},
		{"name":"eliza","age":12},
		{"name":"fanny","age":13},
		{"name":"feng li","age":13},
		{"name":"guinevere","age":16},
		{"name":"henry","age":12},
		{"name":"henrik","age":13},
		{"name":"isaac","age":11},
		{"name":"john","age":11},
		{"name":"jessie","age":12}
	],
	rendered: function() {
		this.inherited(arguments);
		this.populateList();
	},
	btnPrevTapped: function(inSender, inEvent) {
		new enyo.tutorial.app().renderInto(document.body);
	},
	populateList : function(inSender, inEvent) {
		this.$.list.setCount(this.db.length);
		this.$.list.reset();
	},

	setupItem : function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.filter ? this.filtered : this.db;
		var names = data[i].name;
		var ages = data[i].age;
		
		this.$.name.setContent(names);
		this.$.age.setContent(ages);
	}, 

	search: function(inSender, inEvent) {
		this.searchText = this.$.searchInput.getValue();
		enyo.job(this.id + ":search", enyo.bind(this, "filterList", this.searchText), 200);

	},
	filterList : function(inFilter) {
		if (inFilter != this.filter) {
			this.filter = inFilter;
			this.filtered = this.generateFilteredData(inFilter);
			this.$.list.setCount(this.filtered.length);
			this.$.list.reset();
		}
		console.log(this.filtered);
	},
	generateFilteredData : function(inFilter){
		var re = new RegExp("^" + inFilter, "i");
		var r = [];
		for (var i=0, d; (d=this.db[i]); i++) {
			if (d.name.match(re)) {
				d.dbIndex = i;
				r.push(d);
			}
		}
		return r;
	}
});
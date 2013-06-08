enyo.kind({
    name: "Dashboard",
    kind: "Control",
    layoutKind: "FittableRowsLayout",
    components: [
        {
        	classes:"instructionBar",
        	content:"Welcome to Enyo Launcher App. Select the project profile below, then tap to launch the app file with the desired resolution and size."
        },
        { classes:"gap" },
        {
        	classes:"setWidth90 centerDiv",
        	kind:"StandardPicker"
        },	
        {
        	classes:"setWidth90 centerDiv fooBar",
        	components:[
        		{
        			content:""
        		}
        	]
        },
        { classes:"gap" },
        {
        	kind:"Group",
        	classes:"setWidth90 centerDiv txtAlignRight",
        	components:[
        		{
        			kind:"Button",
        			classes:"stdButton",
        			content:"Create Profile"
        		},
        		{
        			kind:"Button",
        			classes:"stdButton",
        			content:"Edit Profile"
        		}
        	]
        },
        { classes:"gap" }
    ]
});
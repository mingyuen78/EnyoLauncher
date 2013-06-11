enyo.kind({
    name: "SideMenu",
    kind: "FittableRows",
    components: [
        {
        	tag:"h1",
        	classes:"menuHeader",
        	content:"Tools"
        },
        {
        	kind:"Button",
        	classes:"menuButton",
        	content:"App Launcher",
        	page:"Dashboard",
        	ontap:"handleButtonTapped"
        },
        {
        	kind:"Button",
        	classes:"menuButton",
        	content:"Icon Tiler",
        	page:"IconTileCalculator",
        	ontap:"handleButtonTapped"
        },
        {
            kind:"Button",
            classes:"menuButton",
            content:"Gradient Generator",
            page:"GradientGenerator",
            disabled:true
        },
        {
        	kind:"Button",
        	classes:"menuButton",
        	content:"Shadow Generator",
        	page:"Shadow",
        	disabled:true
        },
        {
        	kind:"Button",
        	classes:"menuButton",
        	content:"EnyoJS Snippets",
        	page:"Snippets",
        	disabled:true
        },
        {
        	kind:"Button",
        	classes:"menuButton",
        	content:"Useful Links",
        	page:"Links",
        	disabled:true
        }
    ],
    handleButtonTapped:function(inSender,inEvent) {
    	this.bubble("onMenuButtonTapped",{page:inSender.page});
    }
});
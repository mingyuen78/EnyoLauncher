enyo.kind({
    name: "Dashboard",
    kind: "Control",
    global:com.Global,
    layoutKind: "FittableRowsLayout",
    components: [
        {
        	classes:"instructionBar",
        	content:"Welcome to Enyo Launcher App. Select the project profile below, then tap to launch the app file with the desired resolution and size."
        },
        { classes:"gap" },
        {
        	classes:"setWidth90 centerDiv",
        	name:"pckProfile",
            kind:"StandardPicker"
        },
        {
        	classes:"setWidth90 centerDiv fooBar",
        	components:[
        		{
                    classes:"specialSubHeader",
                    components:[
                        {
                            tag:"h1",
                            content:"Device Resolution"
                        }
                    ]
                },
                { kind:"RepeaterList" },
                { classes:"specialSubFooter" }
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
        			content:"Create",
                    ontap:"handleButtonCreateTapped"
        		},
        		{
        			kind:"Button",
        			classes:"stdButton",
        			content:"Edit",
                    ontap:"handleButtonEditTapped"

        		},
                {
                    kind:"Button",
                    classes:"stdButton",
                    content:"Delete",
                    ontap:"handleButtonDeleteTapped"
                }
        	]
        },
        { classes:"gap" },
        { 
            name: "popupInput", 
            kind: "PopupInput",
            onPopupHide:"triggerRefresh" 
        }
    ],
    create:function(){
        this.inherited(arguments);
        //this.global.storeLocal("ENYO.KITCHENSINK.PROFILE",null);
    },
    rendered:function(){
       this.inherited(arguments);
       this.triggerRefresh();
    },
    handleButtonEditTapped:function(inSender,inEvent) {
        //console.log(this.$.pckProfile.getSelected());
        if (this.$.pckProfile.getSelected() != null){
            this.$.popupInput.setEditIndex(this.$.pckProfile.getSelected().index);
            this.$.popupInput.show();
        } else {
            alert("Please select a profile first");
            this.$.popupInput.setEditIndex(null);
        }
        
    },
    handleButtonCreateTapped:function(inSender,inEvent) {
        this.$.popupInput.setEditIndex(null);
        this.$.popupInput.show();
    },
    handleButtonDeleteTapped:function(inSender,inEvent) {
        if (this.$.pckProfile.getSelected() != null){
            this.profiles = this.global.getLocal("ENYO.KITCHENSINK.PROFILE");
            this.deleteIndex = this.$.pckProfile.getSelected().index;
            console.log(this.deleteIndex);
            this.global.storeLocal("ENYO.KITCHENSINK.PROFILE",this.removeByIndex(this.profiles,this.deleteIndex));
            this.triggerRefresh();
         } else {
            alert("Please select a profile first");
            this.$.popupInput.setEditIndex(null);
        }
    },
    removeByIndex:function(arr, index) {
        arr.splice(index, 1);
        return arr;
    },
    triggerRefresh:function(inSender,inEvent) {
        this.profiles = this.global.getLocal("ENYO.KITCHENSINK.PROFILE");
        if (this.profiles != null) {
            this.$.pckProfile.setDatasource(this.profiles);
        } else {
            this.$.pckProfile.setDatasource([]);
        }
    }
});
enyo.kind({
    name: "PopupInput",
    kind: "onyx.Popup",
    global: com.Global,
	centered: true, 
 	floating: true, 
    editIndex: null,
	onShow: "popupShown", 
	onHide: "popupHidden",
	style:"width:310px",
    layoutKind: "FittableRowsLayout",
    components: [
        {
        	content:"Project Index File...",
            classes:"txtAlignCenter toUpperCase popupHeader"
        },
        {
            style:"margin:5px",
            name:"formControl",
            components:[
                { 
                    name:"inputProfile",
                    classes:"setWidthFull",
                    placeholder:"Project profile name...",
                    validation:"required",
                    kind:"InputItemControl" 
                },
                { style:"height:5px" },
                { 
                    name:"inputFile",
                    classes:"setWidthFull",
                    placeholder:"Index file location...",
                    validation:"required",
                    kind:"InputItemControl" 
                }
            ]
        },
        {
            kind:"Group",
            classes:"trenchBar txtAlignCenter",
            components:[
                {
                    kind:"Button",
                    classes:"tinyButton",
                    ontap:"handleOk",
                    content:"Ok"
                },
                {
                    kind:"Button",
                    classes:"tinyButton",
                    ontap:"handleCancel",
                    content:"Cancel"
                }
            ]
        }  
    ],
    create:function(){
    	this.inherited(arguments);
    },
    setEditIndex:function(index){
        this.editIndex = index;
        if (this.editIndex != null){
            this.datasource = this.global.getLocal("ENYO.KITCHENSINK.PROFILE");
            this.$.inputProfile.setValue(this.datasource[index].content);
            this.$.inputFile.setValue(this.datasource[index].file);
        }
    },
    popupShown:function(inSender,inEvent) {
        this.show();
    },
    resetInputs:function(){
        this.$.inputProfile.setValue("");
        this.$.inputFile.setValue("");
        this.$.inputProfile.dismissError();
        this.$.inputFile.dismissError();
           
    },
    checkValidation:function(existing){
            var self = this;
            this.validator = new util.Validator();
            this.validator.validate(this.$.formControl,onSuccess,onFail);
            self.profiles = this.global.getLocal("ENYO.KITCHENSINK.PROFILE");
            
            function onSuccess(results){
                if(existing){
                    if(self.editIndex != null){
                        console.log("Editing to existing array");
                        self.profiles[self.editIndex].content = self.$.inputProfile.getValue();
                        self.profiles[self.editIndex].file = self.$.inputFile.getValue();
                        self.global.storeLocal("ENYO.KITCHENSINK.PROFILE",self.profiles);
                    } else {
                        console.log("Pushing to existing array");
                        self.profiles.push({content:self.$.inputProfile.getValue(), file:self.$.inputFile.getValue()});
                        self.global.storeLocal("ENYO.KITCHENSINK.PROFILE",self.profiles);
                    } 
                } else {
                    this.newprofiles = [];
                    this.newprofiles.push({content:self.$.inputProfile.getValue(), file:self.$.inputFile.getValue()});
                    self.global.storeLocal("ENYO.KITCHENSINK.PROFILE",this.newprofiles); 
                }
                self.hide(); 
            }
            function onFail(errorResults){
                var i;
                for (i = 0; i < errorResults.errors.length; i++) {
                    errorResults.errors[i].controller.parent.parent.addClass("errorDecorator");
                    errorResults.errors[i].controller.setValue("");
                    errorResults.errors[i].controller.setAttribute("placeholder", "");
                    errorResults.errors[i].controller.setAttribute("placeholder", errorResults.errors[i].message);
                }   
            }
    },
    handleOk:function(inSender,inEvent) {
        this.profiles = this.global.getLocal("ENYO.KITCHENSINK.PROFILE");
        if(this.profiles != null){
            this.checkValidation(true);
        } else {
            this.checkValidation(false);
        }
    },  
    handleCancel:function(inSender,inEvent) {
        this.resetInputs();
        this.hide();
    },
    hide:function(inSender,inEvent) {
        this.resetInputs();
        this.bubble("onPopupHide");
        this.setShowing(false);
    }
});

enyo.kind({
    name: "StandardPicker",
    kind: "Control",
    global: com.Global,
    components: [
		{
            kind: "onyx.PickerDecorator",
			onSelect: "pickerHandler",
			components: [
				{
					name:"inputDecorator",
                    kind: "onyx.PickerButton", 
					onChange: "pickerDisplayChange",
 					classes: "pickerButton setWidthFull",
                    layoutKind: "FittableColumnsLayout",
                    components:[
 						{
 							content:"Select a profile to load...",
 							name:"labelPickerButtonControl",
                            style:"width:96%",
                            classes:"truncate"
 						},
                        {
                            tag:"i",
                            style:"width:4%;height:25px;margin-top:3px !important;margin-right:0px !important",
                            classes:"icon-chevron-down txtAlignRight"
                        }
 					]
				},
				{
					kind: "onyx.Picker", 
                    modal:false,
                    classes:"stdPickerMenu",
					name:"pickerMenuControl"
				}
		]} 

    ],
    published: {
        datasource: [
        ]
    },
    events: {
        onChangeItem: ""
    },
     
    rendered:function(){
    	this.inherited(arguments);
        this.datasourceChanged();
    },
    datasourceChanged: function() {
        this.setupItem(this.datasource);
    },
    pickerDisplayChange:function(inSender,inEvent) {
    	this.$.labelPickerButtonControl.setContent(this.$.pickerMenuControl.selected.content);
    },
    pickerHandler:function(inSender,inEvent) {
        this.removeError();
        this.global.storeLocal("ENYO.KITCHENSINK.LASTSELECTED",inEvent.originator.index);

        return true;
        //this.doChangeItem(this.$.pickerMenuControl.selected);
    },
    setupItem:function(items){
        var i;
        var selected = false;
     	this.items = items;
        this.$.pickerMenuControl.selected = null;
        this.$.labelPickerButtonControl.setContent("Select a profile to load...");
     	this.$.pickerMenuControl.destroyClientControls();
    	for(i = 0; i < items.length;i++){
            this.lastSelectedIndex = this.global.getLocal("ENYO.KITCHENSINK.LASTSELECTED");
            if (this.lastSelectedIndex != null){
                if (i == this.lastSelectedIndex){
                    items[i].active = true;
                }                
            }
            if (items[i].active === true) {
                selected = true;
            }
            items[i].index = i;
            this.$.pickerMenuControl.createComponent( items[i] );
    	}
    	
        if (selected) {
            this.doChangeItem(this.$.pickerMenuControl.selected);
        }
        this.$.pickerMenuControl.render();  
    },
    setError:function(){
        this.$.inputDecorator.addClass("errorDecorator");
    },
    setDisabled:function(bDisabled){
        this.$.inputDecorator.setDisabled(bDisabled); 
    },
    removeError:function(){
        this.$.inputDecorator.removeClass("errorDecorator");
    },
    getValue:function(){
        if (this.$.pickerMenuControl.selected != null) {
            return this.$.pickerMenuControl.selected.content;
        } else {
            return "";
        }
        
    },
    setButtonContent:function(content) {
        this.$.labelPickerButtonControl.setContent("");
        this.$.labelPickerButtonControl.setContent(content);
        this.$.labelPickerButtonControl.render();
    },
    setValue: function(value) {
        var selected = null;
        var i;
        for (i = 0; i < this.$.pickerMenuControl.controls.length; i++) {
            var control = this.$.pickerMenuControl.controls[i];
            if (control.index == value) {
                selected = control;
                break;
            }
        }

        if (!selected) {
            return;
        }

        this.$.pickerMenuControl.setSelected(selected);
        this.$.labelPickerButtonControl.setContent(selected.content);
        this.render();
    },
    getSelected: function() {
        return this.$.pickerMenuControl.selected;
    }
});

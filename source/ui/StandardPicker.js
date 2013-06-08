enyo.kind({
    name: "StandardPicker",
    kind: "Control",
    published: {
        datasource: []
    },
    components: [
		{
            kind: "onyx.PickerDecorator",
			onSelect: "pickerHandler",
			components: [
				{
					name:"inputDecorator",
                    kind: "onyx.PickerButton", 
					onChange: "pickerDisplayChange",
                    style:"width:100%",
 					classes: "pickerButton",
                    layoutKind: "FittableColumnsLayout",
                    components:[
 						{
 							content:"Please select a profile to load...",
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
                    classes:"stdPickerMenu",
					name:"pickerMenuControl"
				}
		]} 

    ],
    events: {
        onChangeItem: ""
    },
     
    create:function(){
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
        this.doChangeItem(this.$.pickerMenuControl.selected);
    },
    setupItem:function(items){
     	var i;
        var selected = false;
     	this.items = items;
     	this.$.pickerMenuControl.destroyClientControls();
    	for(i = 0; i < items.length;i++){
            if (items[i].active === true) {
                selected = true;
            }
    		this.$.pickerMenuControl.createComponent( items[i] );	
    	}
    	this.$.pickerMenuControl.render();

        if (selected) {
            this.doChangeItem(this.$.pickerMenuControl.selected);
        }
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
    setValue: function(value) {
        var selected = null;
        var i;
        for (i = 0; i < this.$.pickerMenuControl.controls.length; i++) {
            var control = this.$.pickerMenuControl.controls[i];
            if (control.value == value) {
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
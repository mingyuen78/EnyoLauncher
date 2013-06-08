enyo.kind({
    name: "InputItemControl",
    kind: "Control",
    placeholder:"Insert value...",
	validation:"",
	value:"",
    search:false,
	maxlength: 100,
    decoratorClass:"",
    customWidth:0,
    autoLock:true,
    title:"",
    type:"text",
    components: [
        { 
            kind:"Signals", 
            onBusy:"handleOnBusy",
            onFormLock:"handleOnBusy",
            onRelease:"handleOnRelease"
        },
        {
			tag:"div",
			classes:"formInput",
			components:[
				{
					components:[
						{
							name:"txtLabel",
							classes:"formLabels truncate",
							content:"Title"
						},
						{
							name:"layoutContainer",
                            layoutKind: "FittableColumnsLayout",
                            components:[
                            {
                                name:"inputDecorator",
                                kind: "onyx.InputDecorator",
    							classes:"appInputForm",
                                fit:true,
    							components: [
    								{
    									layoutKind: "FittableColumnsLayout",
                                        classes:"setWidthFull",
    									style:"margin-top:2px;",
    									components:[
    										{
                                                name:"inputSearch",
                                                style:"margin-right:8px",
                                                classes: "formDecoratorButton icon icon-search"
                                            },
                                            {
    											kind: "onyx.Input",
    											name: "txtInput",
     											value: "Input Area",
                                                style:"font-size:1em !important",
    											fit:true,
                                                onfocus:"dismissError",
     											oninput:"inputChanged"
    										},
    										{
    											name:"btnInputResetter",
                                                //kind:"Button",
                                                ontap:"handleRemoveInput",
                                                classes: "formDecoratorButton icon icon-remove whiteLabel"
    										}
    									]
    							   }
    							]
    						  }
                            ]
                        }
					]
				}
			]
		}
    ],
    create:function(){
    	this.inherited(arguments);
    	this.setTitle(this.title);
        this.setAttributes(this.type, this.placeholder,this.maxlength,this.validation,this.value);
        this.$.inputSearch.canGenerate = this.search;
        if(this.customWidth > 0) {
            this.setInputWidth(this.customWidth);
        }
        if(this.decoratorClass != "") {
            this.setInputDecoratorClass(this.decoratorClass);
        }
    },
    setTitle:function(text){
    	this.title = text;
    	this.$.txtLabel.setContent(this.title);
    },
    setInputDecoratorClass:function(css){
        this.decoratorClass = css;
        this.$.inputDecorator.addClass(this.decoratorClass);
    },
    setInputWidth:function(width){
        this.customWidth = width;
        this.$.txtInput.setStyle("width:"+this.customWidth+"px !important");
    },
    setAttributes:function(type,placeholder,maxlength,validation,value){
    	this.setValue(value);
        this.setType(type);
    	this.setPlaceHolder(placeholder);
    	this.setMaxLength(maxlength);
    	this.setRequired(validation);
    },
    setValue:function(value){
    	this.value = value;
    	this.$.txtInput.setValue(value);
    },
    getValue:function(value){
    	return this.$.txtInput.getValue();
    },
    setType:function(type){
        this.type = type;
        this.$.txtInput.setAttribute("type",this.type);
    },

    setError:function(){
        this.$.inputDecorator.addClass("errorDecorator");
    },
    removeError:function(){
        this.$.inputDecorator.removeClass("errorDecorator");
    },
    setPlaceHolder:function(placeholder){
    	this.placeholder = placeholder;
    	this.$.txtInput.setAttribute("placeholder",this.placeholder);
    },
    setMaxLength:function(maxlength){
    	this.maxlength = maxlength;
    	this.$.txtInput.setAttribute("maxlength",this.maxlength);
    },
    setRequired:function(validation){
    	this.validation = validation;
    	this.$.txtInput.setAttribute("required",this.validation);
    },
    setDisabled:function(bDisabled){
        this.$.inputDecorator.addRemoveClass("disabled");
        if (bDisabled) {
            this.$.btnInputResetter.hide();
        } else {
            this.$.btnInputResetter.show();
        }
        this.$.txtInput.setDisabled(bDisabled); 
    },
    handleRemoveInput:function(inSender,inEvent) {
        inSender.parent.controls[(inSender.parent.controls.length - 2)].setValue("");    
        this.$.btnInputResetter.addClass("whiteLabel");
        this.bubble("onReset",inSender.parent.controls[(inSender.parent.controls.length - 2)]);
    },
    handleOnBusy:function(inSender,inEvent) {
        if (this.autoLock){
            this.$.inputDecorator.addClass("disabled");
            this.$.btnInputResetter.hide();
            this.$.txtInput.setDisabled(true);
        }
    },
    handleOnRelease:function(inSender,inEvent) {
        if (this.autoLock){
            this.$.inputDecorator.removeClass("disabled");
            this.$.btnInputResetter.show(); 
            this.$.txtInput.setDisabled(false);
        }
    },
    dismissError:function(inSender,inEvent) {
        this.$.inputDecorator.controls[0].focus();
        this.$.inputDecorator.removeClass("errorDecorator");
    },
    inputChanged:function(inSender,inEvent) {
        this.bubble("onInput",inSender);
        if(this.$.txtInput.getValue() != ""){
            this.$.btnInputResetter.removeClass("whiteLabel");
        } else {
            this.$.btnInputResetter.addClass("whiteLabel");
        }
    }
});
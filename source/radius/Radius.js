enyo.kind({
    name: "Radius",
    global: com.Global,
	phoneGap: util.PhoneGapSuit, 
	classes: "enyo-fit enyo-unselectable",
	kind: "FittableRows",
	components: [
		{
		    classes:"instructionBar",
		    content:"This is CSS3 border radius generator tool."
		},
		{
			name:"appForm",
			classes:"txtAlignCenter setWidthFull",
			components: [
				{
					classes:"setWidth90 centerDiv",
					components:[

						{ classes:"gap" },
						{
				        	classes:"centerDiv",
				        	name:"pckType",
				        	onChangeItem:"handlePickerChange",
				            kind:"StandardPicker",
				            datasource: [
					            {content:"Full Radius", type:0, active:true},
					            {content:"Left Sided Only", type:1},
					            {content:"Right Sided Only", type:2},
					            {content:"Top Sided Only", type:3},
								{content:"Bottom Sided Only", type:4},
								{content:"Top Left Only", type:5},					        
				        		{content:"Bottom Left Only", type:6},
				        		{content:"Top Right Only", type:7},					        
				        		{content:"Bottom Right Only", type:8}
					        ]
				        },
				        { classes:"gap" },
						{
							kind: "InputItemControl",
 							id:"txtRadius",
							name:"txtRadius",
							validation:"required",
							placeholder: "Radius Amount.. (in em)"
						},
				        { classes:"gap" }

				    ]
				}
				
			]
		},
		{
			classes:"instructionBar",
			content:"Generated CSS Gradient"
		},
		{ classes:"gap" },
        {
			classes:"txtAlignCenter setWidthFull",
			components:[
				{
					classes:"centerDiv",
					components:[
						{
							kind:"onyx.InputDecorator",
							classes:"textAreaDecorator setWidth90",
							components:[
								{
									kind:"onyx.TextArea",
									name:"txtCode",
									allowHtml:true,
									placeholder:"Code here...",
									style:"margin:15px;width:98%"
								}
							]
						}
						
					]
				}
			]
		},
		{ classes:"gap" },
		{
			classes:"txtAlignCenter setWidthFull",
			components:[
				{
					classes:"centerDiv setWidth90",
					components:[
						{
							classes:"roundedCorner contentGenerator",
							components:[
								{
									tag:"div",
									classes:"flatButton centerDiv",
									name:"sampleButton",
									content:"Sample Button"
								}
							]
						}
					]
				}
			]
		},
		{ classes:"gap" },
		{
			kind:"Group",
			classes:"setWidth90 centerDiv txtAlignRight",
			components:[
				{
					kind: "Button", 
					ontap:"validateThis",
					classes:"stdButton",
					content:"Submit"
				},
				{
					kind: "Button", 
					ontap:"resetThis",
					classes:"stdButton",
					content:"Reset"
				}
			]
		}
	],
	generateCode:function(type){
		var strHtml = "";
		var value = this.$.txtRadius.getValue();
		switch(type){
			case 0:
				strHtml += "-moz-border-radius: "+value+"em;\n";
				strHtml += "-webkit-border-radius: "+value+"em;\n";
				strHtml += "border-radius: "+value+"em;";
				return strHtml;
			break;
			case 1:
				strHtml += this.generateTopRadius("left");
				strHtml += this.generateBottomRadius("left");
				return strHtml;
			break;
			case 2:
				strHtml += this.generateTopRadius("right");
				strHtml += this.generateBottomRadius("right");
				return strHtml;
			break;
			case 3:
				strHtml += this.generateTopRadius("right");
				strHtml += this.generateTopRadius("left");
				return strHtml;
			break;
			case 4:
				strHtml += this.generateBottomRadius("right");
				strHtml += this.generateBottomRadius("left");
				return strHtml;
			break;
			case 5:
				strHtml += this.generateTopRadius("left");
				return strHtml;
			break;
			case 6:
				strHtml += this.generateBottomRadius("left");
				return strHtml;
			break;
			case 7:
				strHtml += this.generateTopRadius("right");
				return strHtml;
			break;
			case 8:
				strHtml += this.generateBottomRadius("right");
				return strHtml;
			break;
		}
	},
	generateTopRadius : function(direction) {
		var strHtml = "";
		var value = this.$.txtRadius.getValue();
		strHtml += "-moz-border-radius-top"+direction+": "+value+"em;\n";
		strHtml += "-webkit-border-top-"+direction+"-radius: "+value+"em;\n";
		strHtml += "border-top-"+direction+"-radius: "+value+"em;\n";
		return strHtml;
	},
	generateBottomRadius : function(direction) {
		var strHtml = "";
		var value = this.$.txtRadius.getValue();
		strHtml += "-moz-border-radius-bottom-"+direction+": "+value+"em;\n";
		strHtml += "-webkit-border-bottom-"+direction+"-radius: "+value+"em;\n";
		strHtml += "border-bottom-"+direction+"-radius: "+value+"em;\n";
		return strHtml;
	},
	handlePickerChange:function(inSender,inEvent) {
		
	},
	resetThis:function(inSender,inEvent) {
		this.$.txtRadius.setValue("");
		this.$.txtCode.setValue("");
	},
	validateThis:function(inSender,inEvent) {
		var self = this;
		this.validateUtil = new util.Validator();
		this.validateUtil.validate(this.$.appForm,onSuccessValidate,onFailValidate);
 		function onSuccessValidate(results){
 			var code = self.generateCode(self.$.pckType.getSelected().type);
 			self.$.txtCode.setValue(code);
 			self.$.sampleButton.setStyle(code);
 		}
		function onFailValidate(results){
 			self.phoneGap.alert("Please fill up the fields with valid input to proceed");
 			var i;
 			for (i = 0; i < results.errors.length; i++) {
				results.errors[i].controller.setValue("");
				results.errors[i].controller.setAttribute("placeholder", "");
				results.errors[i].controller.setAttribute("placeholder", results.errors[i].message);		
			}
 		} 
	}
});
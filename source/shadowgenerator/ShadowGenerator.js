enyo.kind({
	name: "ShadowGenerator",
	global: com.Global,
	phoneGap: util.PhoneGapSuit, 
	classes: "enyo-fit enyo-unselectable",
	kind: "FittableRows",
	components: [
		{
		    classes:"instructionBar",
		    content:"Welcome to Shadow Generator. This is a unique tool designed to help CSS stylers to generate cross platform shadow effect used in toolbar, footers and buttons. Note: Only use shadow sparringly, dont overuse them especially if they are within a list or repeater scroller."
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
				            kind:"StandardPicker",
				            datasource: [
					            {content:"Text Shadow", type:0, active:true},
					            {content:"Box Shadow", type:1},
					            {content:"Box Shadow (Inset)", type:2}

					        ]
				        },
				        { classes:"smallgap" },
						{
							kind: "InputItemControl",
							id:"txtBlurValue",
							name:"txtBlurValue",
							placeholder: "Enter value of blur range (without px)",
							maxlength:3,
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
 							id:"txtValueX",
							name:"txtValueX",
							placeholder: "Enter value of X (without px)",
							maxlength:3,
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
 							id:"txtValueY",
							name:"txtValueY",
							placeholder: "Enter value of Y (without px)",
							maxlength:3,
							validation:"required"
						},
						{ classes:"smallgap" }
						
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
									kind:"onyx.Button",
									classes:"sampleButton",
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
	
	create: function(inSender,inEvent) {
		this.inherited(arguments);
		//Always start your code below this.inherited.
 	},
 	resetThis:function(inSender,inEvent) {
 		this.$.txtBlurValue.setValue("");
 		this.$.txtValueX.setValue("");
 		this.$.txtValueY.setValue("");
 		this.$.txtCode.setValue("");
 	},
 	validateThis : function(inSender,inEvent){
 		var self = this;
 		var validateUtil = new util.Validator();
 		validateUtil.validate(this.$.appForm,onSuccessValidate,onFailValidate);
 		function onSuccessValidate(results){
 			var strType = self.$.pckType.getSelected().type;
 			var strX = self.$.txtValueX.getValue();
 			var strY = self.$.txtValueY.getValue();
 			var strBlur = self.$.txtBlurValue.getValue();
 			var strHTML = "";
  			if (strType == 0){
	 			strHTML += "text-shadow: "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3) !important;\n";
	 			self.$.txtCode.setValue(strHTML);
 			} else if (strType == 1){
 				strHTML += "-webkit-box-shadow: "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			strHTML += "-moz-box-shadow: "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			strHTML += "box-shadow: "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			self.$.txtCode.setValue(strHTML);
 			} else {
 				strHTML += "-webkit-box-shadow: inset "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			strHTML += "-moz-box-shadow: inset "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			strHTML += "box-shadow: inset "+strX+"px "+strY+"px "+strBlur+"px rgba(0, 0, 0, 0.3);\n";
	 			self.$.txtCode.setValue(strHTML);
 			}
 			self.$.sampleButton.setStyle(strHTML);
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
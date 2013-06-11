enyo.kind({
	name: "GradientGenerator",
	global: com.Global,
	phoneGap: util.PhoneGapSuit, 
	classes: "enyo-fit enyo-unselectable",
	kind: "FittableRows",
	components: [
		{
		    classes:"instructionBar",
		    content:"Welcome to Gradient Generator. This is a unique tool designed to help CSS stylers to generate cross platform gradient effect used in toolbar, footers and buttons."
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
					            {content:"Linear (Top-Down)", type:0, active:true},
					            {content:"Linear (Right-Left)", type:1}
					        ]
				        },
				        { classes:"smallgap" },
						{
							kind: "InputItemControl",
							id:"txtHexTop",
							name:"txtHexTop",
							placeholder: "Enter hex for first point (without #)",
							maxlength:6,
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
 							id:"txtHexBottom",
							name:"txtHexBottom",
							placeholder: "Enter hex for last point (without #)",
							maxlength:6,
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
 							id:"txtHexBg",
							name:"txtHexBg",
							placeholder: "Enter hex for background (without #)",
							maxlength:6,
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
 		this.$.txtHexTop.setValue("");
 		this.$.txtHexBottom.setValue("");
 		this.$.txtHexBg.setValue("");
 		this.$.txtCode.setValue("");
 	},
 	validateThis : function(inSender,inEvent){
 		var self = this;
 		var validateUtil = new util.Validator();
 		validateUtil.validate(this.$.appForm,onSuccessValidate,onFailValidate);
 		function onSuccessValidate(results){
 			var strType = self.$.pckType.getValue();
 			var strHTML = "";
 			if (strType == 0){
	 			strHTML = "background:#"+ self.$.txtHexTop.getValue() +" !important;\n";
	 			strHTML += "background-image: -webkit-gradient(linear, left top, left bottom, from( #"+self.$.txtHexTop.getValue()+" ) , to( #"+self.$.txtHexBottom.getValue()+" )) !important;\n";
	 			strHTML += "background-image: -webkit-linear-gradient( #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+") !important;\n";
				strHTML += "background-image: -moz-linear-gradient( #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: -ms-linear-gradient( #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: -o-linear-gradient( #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: linear-gradient( #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
	 			self.$.txtCode.setValue(strHTML);
 			} else {
 				strHTML = "background:#"+ self.$.txtHexTop.getValue() +" !important;\n";
	 			strHTML += "background-image: -webkit-gradient(linear, left top, right top, from( #"+self.$.txtHexTop.getValue()+" ) , to( #"+self.$.txtHexBottom.getValue()+" )) !important;\n";
	 			strHTML += "background-image: -webkit-linear-gradient( left, #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+") !important;\n";
				strHTML += "background-image: -moz-linear-gradient( left, #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: -ms-linear-gradient( left, #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: -o-linear-gradient( left, #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
				strHTML += "background-image: linear-gradient( left, #"+self.$.txtHexTop.getValue()+" , #"+self.$.txtHexBottom.getValue()+" ) !important;\n";
	 			self.$.txtCode.setValue(strHTML);
 			}
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
enyo.kind({
	name: "IconTileCalculator",
	global: com.Global,
	phoneGap: util.PhoneGapSuit, 
	classes: "enyo-fit enyo-unselectable",
	kind: "FittableRows",
	components: [
		{
		    classes:"instructionBar",
		    content:"Welcome to Icon Tile Calculator. This is a unique tool designed to help CSS stylers to place and compute scale needed for icon sprites background. Enter Original Image Size and Desired Icon Size."
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
							kind: "InputItemControl",
							type:"number",
							id:"txtWidth",
							name:"txtWidth",
							placeholder: "Enter original width (without px)",
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
							type:"number",
							id:"txtHeight",
							name:"txtHeight",
							placeholder: "Enter original height (without px)",
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
							type:"number",
							id:"txtIcon",
							name:"txtIcon",
							placeholder: "Enter icons per row",
							validation:"required"
						},
						{ classes:"smallgap" },
						{
							kind: "InputItemControl",
							type:"number",
							id:"txtPixel",
							name:"txtPixel",
							placeholder: "Enter smallest icon size (px)",
							validation:"required"
						}
					]
				}
			]
		},
		{
		    classes:"instructionBar",
		    content:"Generated CSS Ratio"
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
 		this.$.txtWidth.setValue("");
 		this.$.txtHeight.setValue("");
 		this.$.txtIcon.setValue("");
 		this.$.txtPixel.setValue("");
 		this.$.txtCode.setValue("");
 	},
 	validateThis : function(inSender,inEvent){
 		var self = this;
 		var validateUtil = new util.Validator();
 		validateUtil.validate(this.$.appForm,onSuccessValidate,onFailValidate);
 		function onSuccessValidate(results){
 			var oWidth = parseInt( self.$.txtWidth.getValue(),10 );
 			var oHeight = parseInt( self.$.txtHeight.getValue(),10 );
 			var oIcons = parseInt( self.$.txtIcon.getValue(),10 );
 			var oPixel = parseInt( self.$.txtPixel.getValue(),10 );
 			var oRatio = (oWidth/oHeight);
 			var maxWidth = 0;
 			var computedRatioValue = 0;
 			if (oHeight < oWidth) {
 				//Height vs Pixel
 				maxWidth = (oIcons *  oPixel);
 				computedRatioValue = (oHeight * maxWidth) / oWidth;
 				self.$.txtCode.setValue("");
 				self.$.txtCode.setValue("background-size: "+maxWidth+"px "+computedRatioValue+"px !important;");
 			} else {
 				//Width vs Pixel
 				computedRatioValue = (oHeight * oPixel) / oWidth;
 				self.$.txtCode.setValue("");
 				self.$.txtCode.setValue("background-size: "+oPixel+"px "+computedRatioValue+"px !important;");
 			}
 			console.log(computedRatioValue+"px");
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
enyo.kind({
    name: "Misc",
    global: com.Global,
	phoneGap: util.PhoneGapSuit, 
	classes: "enyo-fit enyo-unselectable",
	kind: "FittableRows",
	components: [
		{
		    classes:"instructionBar",
		    content:"Welcome to Misc Tool. This is mainly a collection of character and text processing tools."
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
					            {content:"Character Count", type:0, active:true}					        
					        ]
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
											classes:"textAreaDecorator setWidthFull",
											components:[
												{
													kind:"onyx.TextArea",
													name:"txtCode",
													allowHtml:true,
													placeholder:"Paste text here...",
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
							kind: "InputItemControl",
 							id:"txtCharCount",
							name:"txtCharCount",
							placeholder: "Character Count.."
						},
						{ classes:"gap" }
						
				    ]
				}
			]
		},
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
	resetThis:function(inSender,inEvent) {
		this.$.txtCharCount.setValue("");
		this.$.txtCode.setValue("");
	},
	validateThis:function(inSender,inEvent) {
		if(this.$.txtCode.getValue() != "" ){
			this.$.txtCharCount.setValue( this.$.txtCode.getValue().length );
		} else {
			this.phoneGap.alert("Please fill in the text to calculate.");
		}
	}
});
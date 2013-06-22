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
				        	onChangeItem:"handlePickerChange",
				            kind:"StandardPicker",
				            datasource: [
					            {content:"Character Count", type:0, active:true},
					            {content:"Character Generator", type:1}					        
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
													placeholder:"Text goes here...",
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
	loremText:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	handlePickerChange:function(inSender,inEvent) {
		
	},
	resetThis:function(inSender,inEvent) {
		this.$.txtCharCount.setValue("");
		this.$.txtCode.setValue("");
	},
	validateThis:function(inSender,inEvent) {
		if (isNaN(this.$.txtCharCount.getValue())){
			this.$.txtCharCount.setValue("");
			this.phoneGap.alert("Text count is integers only");
		} else {
			if (this.$.pckType.getSelected().type == 0){
				if(this.$.txtCode.getValue() != "" ){
					this.$.txtCharCount.setValue( this.$.txtCode.getValue().length );
				} else {
					this.phoneGap.alert("Please fill in the text to calculate.");
				}
			} else {
				if(this.$.txtCharCount.getValue() != "" ){
					this.$.txtCode.setValue( this.generateLorem(this.$.txtCharCount.getValue()) );
				} else {
					this.phoneGap.alert("Please fill in number of characters to generate.");
				}
			}
		}
	},
	generateLorem:function(charCount){
		return this.loremText.substring(0,charCount);
	}
});
enyo.kind({
    name: "Snippets",
    global: com.Global,
    phoneGap: util.PhoneGapSuit, 
    classes: "enyo-fit enyo-unselectable",
    kind: "FittableRows",
    components: [
        {
            classes:"instructionBar",
            content:"Welcome to EnyoJS Snippets. Creates snippets of most commonly used codes in EnyoJS to speed up development process."
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
                            title:"Select a Snippet...",
                            datasource: [
                                {content:"Enyo Component", type:0},
                                {content:"Static Kind", type:1},
                                {content:"Package", type:11},
                                {content:"List", type:2},
                                {content:"Repeater", type:3},
                                {content:"Scroller", type:4},
                                {content:"Horizontal Grid", type:5},
                                {content:"Vertical Grid", type:6},
                                {content:"Popup", type:7},
                                {content:"Picker", type:8},
                                {content:"Checkbox", type:9},
                                {content:"ToggleButton", type:10}
                            ]
                        },
                        { classes:"smallgap" }
                        
                    ]
                }
            ]
        },
        {
            classes:"instructionBar",
            content:"Generated Snippets"
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
                    ontap:"handleGenerateThis",
                    classes:"stdButton",
                    content:"Submit"
                }
            ]
        }
    ],
    
    create: function(inSender,inEvent) {
        this.inherited(arguments);
        //Always start your code below this.inherited.
    },
    handleGenerateThis:function(inSender,inEvent) {
        //DoStuff
        this.$.txtCode.setValue( this.generateThis() );
    },
    generateThis : function(){
        var strHTML = "";
        var componentStructure = 'components:[\n';
        componentStructure += '    {\n';
        componentStructure += '        //TODO: Stuff here\n';
        componentStructure += '    }\n';
        componentStructure += ']\n';

        switch(this.$.pckType.getSelected().type){
            case 0:
                strHTML += 'enyo.kind({\n';
                strHTML += 'name:"Your.Control.Name",\n';
                strHTML += 'classes: "enyo-fit enyo-unselectable",\n';
                strHTML += 'kind: "FittableRows",\n';
                strHTML += componentStructure;
                strHTML += '});';
                return strHTML;  
            break;

            case 1:
                strHTML += 'enyo.kind({\n';
                strHTML += 'name:"Your.Control.Name",\n';
                strHTML += 'statics: {\n';
                strHTML += '    //TODO: Stuff here\n';
                strHTML += '}\n';
                strHTML += '});';
                return strHTML;  
            break;

            case 2:
                strHTML += 'kind:"List",\n';
                strHTML += 'multiSelect: false,\n';
                strHTML += 'fit:true,\n'; 
                strHTML += 'count:0,\n';
                strHTML += 'touch:true,\n';
                strHTML += 'horizontal:"hidden",\n'; 
                strHTML += 'onSetupItem: "setupItem",\n'; 
                strHTML += componentStructure;
                return strHTML;
            break;

            case 3:
                strHTML += 'kind:"Repeater",\n';
                strHTML += 'fit:true,\n'; 
                strHTML += 'count:0,\n';
                strHTML += 'touch:true,\n'; 
                strHTML += 'onSetupItem: "setupItem",\n'; 
                strHTML += componentStructure;
                return strHTML;
            break;
            
            case 4:
                strHTML += 'kind:"Scroller",\n';
                strHTML += 'name:"contentControl",\n';
                strHTML += 'fit:true,\n';
                strHTML += 'touch:true,\n';
                strHTML += 'thumb:true,\n'; 
                strHTML += componentStructure;
                return strHTML;  
            break;

            case 5:
                strHTML += 'layoutKind:"FittableRowsLayout",\n';
                strHTML += componentStructure;
                return strHTML;  
            break;

            case 6:
                strHTML = 'layoutKind:"FittableColumnsLayout",\n';
                strHTML += componentStructure;
                return strHTML;  
            break;

            case 7:
                strHTML = 'kind:"onyx.Popup",\n';
                strHTML += 'centered: true,\n';
                strHTML += 'floating: true,\n';
                strHTML += 'modal: false,\n';
                strHTML += componentStructure;
                return strHTML;  
            break;

            case 8:
                strHTML = 'kind: "onyx.PickerDecorator",\n';
                strHTML += 'components: [\n';
                strHTML += '    {\n';
                strHTML += '        kind: "onyx.PickerButton",\n'; 
                strHTML += '        content: "Pick One..."\n'; 
                strHTML += '    },\n';
                strHTML += '    {\n';
                strHTML += '        kind: "onyx.Picker",\n'; 
                strHTML += '        components: [\n';
                strHTML += '              //TODO Add ons\n';
                strHTML += '        ]\n';
                strHTML += '    }\n';
                strHTML += ']\n';
                return strHTML; 
            break;

            case 9:
                strHTML += '{ kind:"onyx.Checkbox", onchange:"checkboxChanged", checked: true }';
                return strHTML;
            break;

            case 10:
                strHTML += '{ kind:"onyx.ToggleButton", onContent:"Yes", offContent:"No", value: false }';
                return strHTML;
            break;

            case 11:
                strHTML += 'enyo.depends(\n';
                strHTML += '    "File1.js",\n';
                strHTML += '    "File2.js"\n';
                strHTML += ');\n';
                return strHTML;
            break;
        }
    }
          
});
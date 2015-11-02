(function ($) {

    var namespace = "data-ui",
        optionsNamespace = namespace + "-";

    function attrToOption(attr) {
        attr = attr.substring(optionsNamespace.length).toLowerCase();
        return attr.replace(/-.?/g, function (string) {
            return string.charAt(1).toUpperCase();
        });
    }

    function callUI(element, ui, options) {
        element[ui](options);
    }
	
	function prepUI(element, ui, options) {
		var i, name, value;
		
		for (i = 0; i < element[0].attributes.length; i++) {
			name = element[0].attributes[i].name;
			value = element[0].attributes[i].value;
			
			if (name.indexOf(optionsNamespace) === 0 && name.length > optionsNamespace.length) {
				if (/(true|false)/i.test(value)) {
					value = value.toLowerCase() === "true";
				} else if (!isNaN(value)) {
					value = +value;
				} else if (value.charAt(0) === "{") {
					value = eval("(" + value + ")");
				}
				
				if(attrToOption(name) == "slide")
					options[attrToOption(name)] = function(event, ui) {
						var value = $(event.target).data("ui-slide");
						if($(value).is("input"))
							$(value).val(ui.value).change();
						else
							$(value).text(ui.value);
					};
				else if(attrToOption(name) == "change")
					options[attrToOption(name)] = function(event, ui) {
						var value = $(event.target).data("ui-change");
						if($(value).is("input"))
							$(value).val(ui.value).change();
						else
							$(value).text(ui.value);
					};
				else
					options[attrToOption(name)] = value;
			}
		}
		
		if(ui == 'dialog')
			$this = $(element.data("ui-target"));
		
		
		if (/(addClass|effect|hide|show|toggle)/i.test(ui) && options.delay) {
			window.setTimeout(function () { callUI($this, ui, options); }, options.delay);
		} else {
			callUI($this, ui, options);
		}
	}

    $(document).ready(function () {
        $("[" + namespace + "]").each(function () {
            var $this = $(this), options = {},
                ui = $this.data("ui");
			
			if(ui == 'dialog')
				$(this).click(function() {
					prepUI($this, ui, options);
					if($(this).is("a[href!='#']"))
						return false;
				});
			else
				prepUI($this, ui, options);
			
            
        });
    });

}(jQuery));

var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    assets_path = system.args[2],
	args = system.args[3];

page.onConsoleMessage = function(msg) {
    //if (msg.match(/#/)){
        return console.log(msg);
    //}
};

page.open(url, function(status) {

    if ( status === "success" ) {
        page.injectJs(assets_path + '/juice_extractor/includes/jquery.min.js');
        page.injectJs(assets_path + '/juice_extractor/includes/jquery.base.extend.js');
        page.injectJs(assets_path + '/juice_extractor/includes/jquery.curstyles.js');

        page.evaluate(function(args) {
            var styles = {'containers' : {}, 'typography' : {}},
				attributes = [],
                content_elements = ['header', 'footer', 'div', 'aside', 'article'],
                typography_elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'small', 'em', 'blockquote', 'abbr'],
				border_colors = ['border-top-color','border-left-color','border-bottom-color','border-right-color'];

			// Create object to return
			$.each(eval(args), function(key, ele){ attributes.push(ele); })
			$.each(attributes, function(i,ele){ styles['containers'][ele] = []; styles['typography'][ele] = [];})

			// Handling different border color
			if ($.inArray("border-color", attributes) >= 0) {
				$.each(border_colors, function(key, ele) { attributes.push(ele); });							
			}

			$.each(content_elements, function (i, element) {
			    if ($(element).length > 0){

			        $.each($(element).get(), function(i, single_element){

						// Handling the rest attributes
						var props = $(single_element).curStyles.apply($(single_element), attributes);
						$.each(props, function(element, key) {
							if ($.inArray(element, border_colors) >= 0){ 
								element = 'border-color';
							}
							if (key && key != undefined && key != ''){
								styles['containers'][element].push($.rgb2Hex(key));
							}
						});

			            $(single_element).find(typography_elements.join(',')).each(function(i, typo_element){
							// Handling the rest attributes
							var props = $(single_element).curStyles.apply($(single_element), attributes);
							$.each(props, function(element, key) {
								if ($.inArray(element, border_colors) >= 0){ 
									element = 'border-color';
								}
								if (key && key != undefined && key != ''){
									styles['typography'][element].push($.rgb2Hex(key));
								}
							});
			            }); // End single_elements iteration

			        }); 
			    } //End length validation
			});
			
            console.log(JSON.stringify(styles));
        }, args); //End evaluate
        phantom.exit();
    }

});
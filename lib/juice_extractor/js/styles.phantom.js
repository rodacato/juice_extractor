var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    assets_path = system.args[2],
	args = system.args[3];


if (system.args.length === 3) {
    console.log("Usage: $ phantomjs style.phantom.js <url> <js_lib_path> '[\"background-color\",\"border-color\",\"color\"]'");
}

page.onConsoleMessage = function(msg) {
    //if (msg.match(/#/)){
        return console.log(msg);
    //}
};

page.open(url, function(status) {

    if ( status === "success" ) {
        page.injectJs(assets_path + '/includes/jquery.min.js');
        page.injectJs(assets_path + '/includes/jquery.base.extend.js');
        page.injectJs(assets_path + '/includes/jquery.curstyles.js');
		page.injectJs(assets_path + '/includes/jquery.style.extractor.js');

        page.evaluate(function(args) {
            var styles = {'containers' : {}, 'typography' : {}},
				attributes = eval(args),
                content_elements = ['header', 'footer', 'div', 'aside', 'article'],
                typography_elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'small', 'em', 'blockquote', 'abbr'];

			// Create object to return
			$.each(attributes, function(i,ele){ styles['containers'][ele] = []; styles['typography'][ele] = [];})

			$.each(content_elements, function (i, element) {
			    if ($(element).length > 0){
					// Getting content elements
			        $.each($(element).get(), function(i, single_element){
						$.each($(single_element).styleExtractor.apply($(single_element), attributes), function(i, n){
							$.merge(styles['containers'][i], n)
						});

						// Getting typography elements
			            $(single_element).find(typography_elements.join(',')).each(function(i, typo_element){
							$.each($(typo_element).styleExtractor.apply($(typo_element), attributes), function(i, n){
								$.merge(styles['typography'][i], n)
							});
			            });
			        }); 
			    } //End length validation
			});
			
            console.log(JSON.stringify(styles));
        }, args); //End evaluate
        phantom.exit();
    }
});
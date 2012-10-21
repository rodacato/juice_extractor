// Read the Phantom webpage '#intro' element text using jQuery and "includeJs"
var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    assets_file = system.args[2];

if (system.args.length === 2) {
    console.log("Usage: $ phantomjs typography.phantom.js <url> <js_lib_path>");
}

page.onConsoleMessage = function(msg) {
    if (!msg.match(/(Unsafe|TypeError)/)){
        console.log(msg);
    }
};

page.open(url, function(status) {
    if ( status === "success" ) {
        page.injectJs(assets_path + '/includes/jquery.min.js');
        page.injectJs(assets_path + '/includes/jquery.base.extend.js');
        page.injectJs(assets_path + '/includes/jquery.curstyles.js');
		page.injectJs(assets_path + '/includes/jquery.style.extractor.js');
		
        page.evaluate(function() {

            $(document).ready(function () {
                var styles = {},
                    elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'body', 'a', 'span', 'small', 'em', 'blockquote', 'abbr'],
                    attributes = ['font-family', 'font-style', 'font-size', 'line-height', 'font-weight', 'letter-spacing'];

                $.map(elements, function (ele, i){
                    styles[ele] = $(ele).curStyles('font-family', 'font-style', 'font-size', 'line-height', 'font-weight', 'letter-spacing');
                });

                // TODO: Check compatibility with ie browsers
                console.log($.CSSJsonDecode(styles));
            });

        });
        phantom.exit();

    }
});
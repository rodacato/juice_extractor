// Read the Phantom webpage '#intro' element text using jQuery and "includeJs"
var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    assets_path = system.args[2];

var args = system.args[3];

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
console.log(args);

//$(["border-color","color"]).each(function(ele){ styles[ele] = [];})
            var styles = {'colors' : [], 'background-colors' : [], 'borders' : []},
                elements = ['header', 'footer', 'div', 'aside', 'article'],
                attributes = ['background-color', 'background-image', 'border-color', 'text-shadow-color', 'color'],
                typography_elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'small', 'em', 'blockquote', 'abbr'];

            $.each(elements, function (i, element) {
                return false;
                if ($(element).length > 0){
                    $.each($(element).get(), function(i, single_element){
                        var bg_color = $(single_element).curStyles('background-color')['background-color'],
                            border = $(single_element).curStyles('border-top-color','border-left-color','border-bottom-color','border-right-color');

                        // Insert container colors
                        if (bg_color && bg_color != ''){ styles['background-colors'].push($.rgb2Hex(bg_color)) }
                        if (border){
                            $.each(border, function(element, key) { styles['borders'].push($.rgb2Hex(key)) });
                        }

                        $(single_element).find(typography_elements.join(',')).each(function(i, typo_element){
                            var color = $(typo_element).curStyles('color')['color'],
                                bg_color = $(typo_element).curStyles('background-color')['background-color'],
                                border = $(typo_element).curStyles('border-top-color','border-left-color','border-bottom-color','border-right-color');

                            // Insert typography container colors
                            if (color && color != ''){ styles['colors'].push($.rgb2Hex(color)) }
                            if (bg_color && bg_color != ''){ styles['background-colors'].push($.rgb2Hex(bg_color)) }
                            if (border){
                                $.each(border, function(element, key) { styles['borders'].push($.rgb2Hex(key)) });
                            }
                        });
                    }); // End single_elements iteration
                } //End length validation
            });
            console.log(JSON.stringify(styles));
        }, args); //End evaluate
        phantom.exit();
    }

});
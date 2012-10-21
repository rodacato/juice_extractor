module("style_extractor");

test("[phantomjs] should get an object with the structure desired", function() {
	var styles = phantomCall();

	//Check general object structure
	ok($.isEmptyObject(styles) == false, "should be true");
	ok(Object.keys(styles).length == 2, "should be true");
	ok(Object.keys(styles['containers']).length == 3, "should be true");
	ok(Object.keys(styles['typography']).length == 3, "should be true");
});

test("[phantomjs] should get the computed styles for containers correctly", function() {
	var styles = phantomCall();
	
	//Check colors defined as containers
	ok($.inArray('#f4f4f4', styles['containers']['background-color']) > 0,"should be true");
	ok($.inArray('#a3a3a3', styles['containers']['color']) > 0,"should be true");
	$.each(["#ff0000", "#ffc0cb", "#0000ff", "#008000"], function(i,n){
		ok($.inArray(n, styles['containers']['border-color']) == -1,"should be true");
	});
});

test("[phantomjs] should get the computed styles for typography correctly", function() {
	var styles = phantomCall();
	
	//Check colors defined as typography
	ok($.inArray('#0000ff', styles['typography']['background-color']) > 0,"should be true");
	ok($.inArray('#ff0000', styles['typography']['color']) > 0,"should be true");
	$.each(["#ff0000", "#ffc0cb", "#0000ff", "#008000"], function(i,n){
		ok($.inArray(n, styles['typography']['border-color']) > 0,"should be true");
	});
});



function phantomCall(){
	//Runing lib/juice_extractor/js/styles.phantom.js evaluate code
    var styles = {'containers' : {}, 'typography' : {}},
		attributes = ['color', 'border-color', 'background-color'],
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
	
	return styles;
}
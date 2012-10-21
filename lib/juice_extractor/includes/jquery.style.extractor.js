(function( $ ) {
	var border_color_styles = ['border-top-color','border-left-color','border-bottom-color','border-right-color'];
	
	var addBorderColor = function (attr){
		//Remove 'border-color' attribute
		attr = $.removeFromArray('border-color', attr);

		// Add css styles
		$.each(border_color_styles, function(key, ele) { attr.push(ele); });
		return attr;								
	};
	
	var buildStyleObject = function (obj){
		var tmpObj = {};

		$.each(obj, function(index, element){			
			if ($.inArray(index, border_color_styles) >= 0 ){
				if (typeof tmpObj['border-color'] == 'undefined'){ tmpObj['border-color'] = []; }
				$(element).each(function(){ $.merge(tmpObj['border-color'], element) });
				return true;
			}
			
			if (typeof tmpObj[index] == 'undefined'){ tmpObj[index] = []; }
			$.merge(tmpObj[index], element)
		});

		return tmpObj;
	};
	
	$.styleExtractor = function( el, styles ) {
		var obj = {};

		// Computed styles doesn't have border-color
		if ($.inArray("border-color", styles) >= 0) {
			styles = addBorderColor(styles);							
		}
		
		var props = $(el).curStyles.apply($(el), styles)
		
		$.each(props, function(element, key) {
			if (key && key != undefined && key != ''){
				if (typeof obj[element] == 'undefined'){
					obj[element] = [];
				}
				obj[element].push($.rgb2Hex(key));
			}
		});
		
		return buildStyleObject(obj);
	};
	
	$.fn.styleExtractor = function() {
		return $.styleExtractor(this[0], $.makeArray(arguments));
	};
})(jQuery)
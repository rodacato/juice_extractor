module("base_extend");

test("[rgb2Hex] should transform rgb colors to hex", function() {
	var color = $('#base_extend .hex').curStyles.apply($('#base_extend .hex'), ['color']);
	ok($.rgb2Hex(color['color']) == '#ff0000', "should be true");

	color = $('#base_extend .rgb').curStyles.apply($('#base_extend .rgb'), ['color']);
	ok($.rgb2Hex(color['color']) == '#ff0000', "should be true");

	color = $('#base_extend .rgba').curStyles.apply($('#base_extend .rgba'), ['color']);
	ok($.rgb2Hex(color['color']) == '#ff0000', "should be true");

	color = $('#base_extend .rgba2').curStyles.apply($('#base_extend .rgba2'), ['color']);
	ok($.rgb2Hex(color['color']) == '#ff0000', "should be true");
});

test("[removeFromArray] should remove the selected element from the array", function() {
	var colors = ['color', 'border-color', 'background-color'];
	ok($.removeFromArray('border-color', colors).length == 2, "should be true");
	ok($.removeFromArray('border-color', colors)['border-color'] == undefined, "should be true");
});



// Tests for styleExtractor jQuery pluging

test("[styleExtractor] should transform styles to an object", function() {
	var obj = $('#container').styleExtractor.apply($('#container'), ['color', 'background-color']);
	ok($.isEmptyObject(obj) == false, "should be true");
	ok(Object.keys(obj).length == 2, "should be true");
	ok(obj['color'][0] == '#ffff00', "should be true");
	ok(obj['background-color'][0] == '#0000ff', "should be true");
});

test("[styleExtractor] should transform styles to an object with border-color properties", function() {
	var obj = $('#container h1').styleExtractor.apply($('#container h1'), ['border-color', 'background-color']);
	ok($.isEmptyObject(obj) == false, "should be true");
	ok(Object.keys(obj).length == 2, "should be true");
	ok(obj['border-color'].length == 4, "should be true");
	ok(obj['background-color'][0] == '#000000', "should be true");
});
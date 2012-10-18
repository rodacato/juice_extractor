(function($) {
    $.extend({
        rgb2Hex: function(rgb){
             rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+(.\d+)?))?\)$/);
             return "#" +
              ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
        }
    });
})(jQuery);

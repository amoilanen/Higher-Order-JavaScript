(function(host) {

    var cache = {};

    function rgb2cmyk(r, g, b) {
        var rgb = [r, g, b],
            cmy, k;

        if (!cache[rgb]) {
            cmy = rgb.map(function (color) {
                return 255 - color;
            });
            k = Math.min.apply(null, cmy);
            cache[rgb] = cmy.map(function (color) {
                return color - k;
            }).concat([k]);
        };
        return cache[rgb];
    };
   
    host.rgb2cmyk = rgb2cmyk;
})(Memoization);
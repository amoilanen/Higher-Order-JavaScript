(function(host) {

    function permute(items, callback) {
        var pattern = null,
            count = 0;
        do {
            pattern = count2pattern(count, items);       
            pattern && callback(pattern2permutation(pattern, items.slice(0)));
            count++;
        } while (pattern);
    };

    function count2pattern(count, items) {
        var pattern = items.reduce(function (pattern, item, index) {
            index++;
           pattern.unshift(count % index);
            count = Math.floor(count / index);
            return pattern;
        }, []);
        return 0 == count ? pattern : null;
    };

    function pattern2permutation(pattern, items) {
        return pattern.reduce(function (value, position) {      
            value.push(items.splice(position, 1)[0]);
            return value;
        }, []);
    };

    host.permute = permute;
})(Iterators);
(function(host) {

    function arrayDescComparator(x, y) {
        x = x.join("");
        y = y.join("");
        return (x < y) ? 1 : (x > y) ? -1 : 0;
    };

    function partition(num, callback) {
        var partitions = [[num]];
        var current, largest, from, to;
    
        while (partitions.length > 0) {
            current = partitions.shift();
            callback && callback(current);
            largest = current.shift();
            from = current.length > 0 && current[0] > 1 ? current[0] : 1;
            to = largest / 2;

            for (var i = from; i <= to; i++) {
                partitions.push([largest - i, i].concat(current));
            };
            partitions.sort(arrayDescComparator);
        };
    };
   
    host.partition = partition;
})(Iterators);
(function(host) {

    function findShares( target, treasures, callback) {
        var shares = (0 == target) 
            ? [[target, [], []]]
            : [[target, treasures, []]];

        while (shares.length > 0) {
            var [goal, pool, share] = shares.pop();
            var first = pool.shift();
            var newShare = share.slice();
            newShare.push(first);

            if (pool.length > 0) {
                shares.push([goal, pool.slice(), share.slice()]);
            };
            if (goal == first) {
                return newShare;
            } else if (goal > first) {
                shares.push([goal - first, pool.slice(), newShare]);
            }
        };
        return [];
    };

    function getAllocation(target, treasures) {
        return findShares(target, treasures).join(" ");
    };

    host.getAllocation = getAllocation;
})(Iterators);
(function(host) {
    if (!Function.prototype.curry) {
        Function.prototype.curry = function(argTransformer) {
            console.log("argTransformer = ", argTransformer);
            var f = this;
            return function() {
                var args = Array.prototype.slice.call(arguments, 0);
                return f.apply(this, argTransformer(args));
            };
        };
    };
    //Nothing is exported, just the global Function prototype is modified
})(Currying);
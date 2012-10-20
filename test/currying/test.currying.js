module("Currying");

(function() {

    test("Function.prototype.curry()", function() {
        function Value(value) {
            this.value = value;
        };

        Value.prototype.multiply = function(y) {
            return this.value * y;
        };

        Value.prototype.double = Value.prototype.multiply.curry(function (args) {
            args.push(2);
            return args;
        }); 

        var multiply = function(x, y) {
            return x * y;
        };
        var double = multiply.curry(function (args) {
            args.push(2);
            return args;
        });
        var triple = multiply.curry(function (args) {
            args.push(3);
            return args;
        });

        equal(multiply(2, 5), 10, "multiply(2, 5)");
        equal(double(3), 6, "double(3)");
        equal(triple(4), 12, "triple(4)");
        equal(new Value(5).double(), 10, "new Value(5).double()");
    });
})();
module("Memoization");

(function() {
    var rgb2cmyk = Memoization.rgb2cmyk,
        memoize = Memoization.memoize;

    test("Memoization.rgb2cmyk()", function() {
        equal(rgb2cmyk(10, 11, 12).join(","), "2,1,0,243", "rgb2cmyk(10, 11, 12)");
        equal(rgb2cmyk(9, 11, 12).join(","), "3,1,0,243", "rgb2cmyk(9, 11, 12)");
        equal(rgb2cmyk(10, 11, 13).join(","), "3,2,0,242", "rgb2cmyk(10, 11, 13)");
    });

    test("Memoization.memoize() function is called not more than once", function() {
        var calledCount = 0,
            returnValue = 5,
            host = {};
        host.testFunction = function() {
            calledCount++;
            return returnValue;
        };
        memoize("testFunction", host);
    
        equal(host.testFunction(), returnValue);
        equal(host.testFunction(), returnValue);
        equal(host.testFunction(), returnValue);
        equal(calledCount, 1, "Function is called not more than once");
    });

    test("Memoization.memoize() Fibonacci sequence", function() {
        var host = {};        
        host.fib = function(num) {
            return (num < 2) ? num : this.fib(num - 1) + this.fib(num - 2);
        };
        memoize("fib", host);
        
        equal(host.fib(5), 5, "fib(5)");
        equal(host.fib(10), 55, "fib(10)");
        equal(host.fib(11), 89, "fib(11)");
    });
})();
module("Streams");

(function() {
    var LazyStream = Streams.LazyStream,
        UpTo = Streams.UpTo;
        UpFrom = Streams.UpFrom;
        Squares = Streams.Squares;
        PowersOf = Streams.PowersOf;
        HammingNumbers = Streams.HammingNumbers,
        show = Streams.show,
        get = Streams.get,
        literal = Streams.literal,
        literals = Streams.literals,
        concat = Streams.concat,
        star = Streams.star,
        plus = Streams.plus;

    test("Streams.UpTo Streams.UpFrom", function() {
        deepEqual(get(new UpTo(3, 6)), [3, 4, 5, 6], "new UpTo(3, 6)");
        deepEqual(get(new UpFrom(7), 10), [7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "First 10 of new UpFrom(7)");
    });
    
    test("Streams.Squares.nextGroup()", function() {
        var squares = new Squares(1);

        deepEqual(squares.nextGroup(5), [1, 4, 9, 16, 25], "First 5 squares");
        deepEqual(squares.nextGroup(5), [36, 49, 64, 81, 100], "Next 5 squares");
    });

    test("Streams.LazyStream.filter() by function", function() {
        var oddNumbers = new UpFrom(1).filter(
            function(x) {
                return 1 == x % 2;
            }
        );
        deepEqual(get(oddNumbers, 10), [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], "First 10 odd numbers");
    });

    test("Streams.LazyStream.filter() by value", function() {
        deepEqual(get(new UpTo(3, 6).filter(5)), [5], "One element stream");
    });

    test("Streams.LazyStream.transform()", function() {
        var invertedStream = new UpFrom(1).transform(function (x) {
            return 10 - x;
        });
        deepEqual(get(invertedStream, 5), [9, 8, 7, 6, 5], "Transformed stream");
    });

    test("Streams.LazyStream.PowersOf - recursive stream", function() {
        deepEqual(get(new PowersOf(2), 10), [1, 2, 4, 8, 16, 32, 64, 128, 256, 512], "First 10 powers of 2")
    });

    test("Streams.LazyStream.HammingNumbers - recursive stream", function() {
        deepEqual(get(new HammingNumbers([1]), 10), [1, 2, 3, 4, 5, 6, 8, 9, 10, 12], "First 10 Hamming numbers")
    });
    
    test("Streams.LazyStream.union()", function() {
        var first = new UpTo(1, 3),
            second = new UpTo(1, 3),
            third = new UpTo(1, 3);

        deepEqual(get(LazyStream.union(first, second, third), 9), [1, 1, 1, 2, 2, 2, 3, 3, 3], "Union of three streams");
    });

    test("Streams regexp matches generation", function() {
        deepEqual(get(concat(literals("a b"), literals("c d"))), ["ac", "bc", "da", "bd"], "/(a|b)(c|d)/");
        deepEqual(get(star(literal("abc")), 4), ["", "abc", "abcabc", "abcabcabc"], "/(?:abc)*/");
    });
})();
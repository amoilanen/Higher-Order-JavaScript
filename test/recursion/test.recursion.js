module("Recursion");

(function() {
    var binary = Recursion.binary,
        factorial = Recursion.factorial,
        factorialIter = Recursion.factorialIter,
        HanoiTowers = Recursion.HanoiTowers;

    test("Recursion.binary()", function() {
        equal("0", binary(0), "0");
        equal("1", binary(1), "1");
        equal("1000", binary(8), "even positive");
        equal("10101", binary(21), "odd positive");
        equal("-100", binary(-4), "even negative");
        equal("-1011", binary(-11), "odd negative");
        equal("1000", binary(8.4321), "floating point");
    });

    test("Recursion.factorial()", function() {
        equal(1, factorial(0), "factorial(0)");
        equal(1, factorial(1), "factorial(1)");
        equal(120, factorial(5), "factorial(5)");
    });

    test("Recursion.factorialIter()", function() {
        equal(1, factorialIter(0), "factorialIter(0)");
        equal(1, factorialIter(1), "factorialIter(1)");
        equal(120, factorialIter(5), "factorialIter(5)");
    });

    test("Recursion.HanoiTowers", function() {
        var threeDiskPuzzle = new HanoiTowers(3)
            expected = [
                "1 from A to C",
                "2 from A to B",
                "1 from C to B",
                "3 from A to C",
                "1 from B to A",
                "2 from B to C",
                "1 from A to C"
            ];
        deepEqual(threeDiskPuzzle.getMoves(), expected, "3 disk Hanoi towers puzzle");
    });
})();
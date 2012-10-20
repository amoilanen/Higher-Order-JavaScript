module("DispatchTables");

(function() {
    var compute = DispatchTables.compute;

    test("DispatchTables.compute()", function() {
        equal(compute("1 2 + 3 *"), 9, "Computing 1 2 + 3 *");
    });
})();
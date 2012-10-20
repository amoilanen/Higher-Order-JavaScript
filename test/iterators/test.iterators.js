module("Iterators");

(function() {
    var permute = Iterators.permute,
        getAllocation = Iterators.getAllocation,
        partition = Iterators.partition,
        permuteGenes = Iterators.permuteGenes;

    test("Iterators.permute()", function() {
        var permutations = [],
            expected = [
                "1, 2, 3",
                "1, 3, 2",
                "2, 1, 3",
                "2, 3, 1",
                "3, 1, 2",
                "3, 2, 1"
            ];
        permute([1, 2, 3], function (perm) {
            permutations.push(perm.join(", "));
        });
    
        deepEqual(permutations, expected, "Permutations of 1, 2, 3");
    });

    test("Iterators.getAllocation()", function() {
        equal(getAllocation(1, [2, 3, 4]), "", "1, [2, 3, 4]");
        equal(getAllocation(2, [2, 3, 4]), "2", "2, [2, 3, 4]");
        equal(getAllocation(5, [2, 3, 4]), "2 3", "5, [2, 3, 4]");
        equal(getAllocation(6, [2, 3, 4]), "2 4", "6, [2, 3, 4]");
        equal(getAllocation(9, [2, 3, 4]), "2 3 4", "9, [2, 3, 4]");
        equal(getAllocation(10, [2, 3, 4]), "", "10, [2, 3, 4]");
        equal(getAllocation(5, [2, 2, 4]), "", "5, [2, 2, 4]");
    });
    
    test("Iterators.partition()", function() {
        var partitions = [],
            expected = [
              "5",
              "4,1",
              "3,2",
              "3,1,1",
              "2,2,1",
              "2,1,1,1",
              "1,1,1,1,1"
            ];
        partition(5, function (partition) {
            partitions.push(partition.join(","));
        });
    
        deepEqual(partitions, expected, "Partitions of 5");
    });

    test("Iterators.permuteGenes()", function() {
        var permutations = [],
            pattern = "AA(CGT)CG(AT)";
        permuteGenes(pattern, function (permutation) {
            permutations.push(permutation);
        });
        equal("AACCGA,AAGCGA,AATCGA,AACCGT,AAGCGT,AATCGT", permutations.join(","), "Permutations of " + pattern);
    });
})();
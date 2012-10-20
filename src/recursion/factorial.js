(function(host) {

    function factorial(number) {
        if (0 == number) {
            return 1;
        };
        return number * factorial(number - 1);
    };

    function factorialIter(number) {
        var result = 1;

        if (0 == number) {
            return 1;
        };
        for (var i = 2; i <= number; i++) {
            result = result * i;
        };
        return result;
    };
   
    host.factorial = factorial;
    host.factorialIter = factorialIter;
})(Recursion);
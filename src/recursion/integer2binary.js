(function(host) {

    function binary(number) {
        if (number == 1 || number == 0) {
            return number.toString();
        };
        return ((number < 0) ? "-" : "") + binary(Math.floor(Math.abs(number) / 2)) + (Math.floor(Math.abs(number) % 2)).toString();
    };

    host.binary = binary;
})(Recursion);
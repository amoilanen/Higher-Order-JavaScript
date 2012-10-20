(function(host) {

    function rpn(expression, operations) {
        var stack = [];
        var tokens = expression.split(" ");
        tokens.forEach(function (token) {
            var type = /\d+/.test(token) ? "number" : token;
            operations[type].call(null, token, stack);
        });
        return stack.pop();
    };

    function compute(expression) {
        operations = {
            "number": function (number, stack) {
                stack.push(parseInt(number));
            },
            "+": function add(token, stack) {
                stack.push(stack.pop() + stack.pop());
            },
            "-": function (token, stack) {
                var s = stack.pop();
                stack.push(stack.pop() - s);
            },
            "*": function (token, stack) {
                stack.push(stack.pop() * stack.pop());
            },
            "/": function (token, stack) {
                var d = stack.pop(); 
                stack.push(stack.pop() / d);
            }
        };
        return rpn(expression, operations);
    };

    host.compute = compute;
})(DispatchTables);
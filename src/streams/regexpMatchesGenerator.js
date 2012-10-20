(function(host) {

    function literal(string) {
        return new host.LazyStream(string); 
    };

    function literals(string) {
        return host.LazyStream.union.apply(host.LazyStream, 
            string.split(" ").map(function(s) {
                return literal(s);
            })
        );
    };

    function copyStream(stream) {
        return stream ? new host.LazyStream(stream.head(), stream.tail()) : new host.LazyStream();  
    };

    function concat(stream1, stream2) {
        return new host.LazyStream(stream1.head() + stream2.head(), function(last) {
            var combinations = [];
            if (!stream1.isEmpty()) {
                combinations.push(
                    copyStream(stream1.tail()).transform(function (x) {
                        return x + stream2.head();
                    })
                );
            };
            if (!stream2.isEmpty()) {
                combinations.push(
                    copyStream(stream2.tail()).transform(function (x) {
                        return x + stream1.head();
                    })
                );
            };
            if (!stream1.isEmpty() && !stream2.isEmpty()) {
                combinations.push(concat(stream1.tail(), stream2.tail()));
            };
            return host.LazyStream.union.apply(host.LazyStream, combinations);
        });
    };

    function star(stream, head) {
        head = head || "";
        return new host.LazyStream(head, function() {
            return star(stream, head + stream.head());
        });
    };

    function plus(stream) {
        return star(stream, stream.head());
    };
   
    host.literal = literal;
    host.literals = literals;
    host.concat = concat;
    host.star = star;
    host.plus = plus;
})(Streams);
(function(host) {
    function LazyStream(head, tail) {
        this.h = head;
        this.t = tail;
        this.f = null;
    };

    LazyStream.union = function() {
        var streams = Array.prototype.slice.call(arguments, 0);
        var firstStream = streams.shift();
        if (!firstStream) {
            return new LazyStream();
        };
        streams.push(firstStream.tail());
        return new LazyStream(firstStream.head(), function(last) {
            return LazyStream.union.apply(LazyStream, streams);
        });
    };

    LazyStream.prototype.head = function() {
        return this.transf ? this.transf(this.h) : this.h;
    };

    LazyStream.prototype.tail = function() {
        var tail = null;
        if (this.t instanceof Function) {
            tail = this.t(this.head());
            this.f && tail.filter(this.f);
            this.transf && tail.transform(this.transf);
        } else {
            tail = this.t;
        };
        return tail;
    };

    //Eagerly filtering the stream on setting the filter
    LazyStream.prototype.filter = function(filter) {
        this.f = (filter instanceof Function) ? filter :
            function(x) {
                return filter == x;
            };
        while (!this.f(this.h) && (this.h != null)) {
            this.drop();
        };
        return this;
    };

    LazyStream.prototype.transform = function(transformer) {
        this.transf = transformer;
        return this;
    };

    LazyStream.prototype.drop = function() {
        var h = this.head();
        var t = this.tail();
        this.h = t ? t.h : null;
        this.t = t ? t.t : null;
        return h;
    };
    
    LazyStream.prototype.isEmpty = function() {
        return null == this.head();
    };

    LazyStream.prototype.iterate = function(callback, limit) {
        while ((null != this.head()) && ((undefined == limit) || (limit > 0))) {
            limit && limit--;
            callback(this.drop());
        };
    };

    LazyStream.prototype.limit = function(num) {
        var part = [];
        this.iterate(function(x) {
            part.push(x);
        }, num);
        return part;
    };

    host.LazyStream = LazyStream;
})(Streams);

//Examples of streams
(function(host) {
    function UpTo(from, to) {
        if (from <= to) {
            this.h = from;
            this.t = function () {
                return new UpTo(from + 1, to);
            };
        };
    };

    UpTo.prototype = new host.LazyStream();

    function UpFrom(start) {
        this.h = start;
        this.t = function () {
            return new UpFrom(start + 1);
        };
    };

    UpFrom.prototype = new host.LazyStream();

    function Squares(start) {
        this.h = start;
        this.t = function () {
            return new Squares(start + 1);
        };
    };

    Squares.prototype = new host.LazyStream();

    Squares.prototype.nextGroup = function(count) {
        return this.limit(count).map(function(x) {
            return x * x;
        });
    };

    function PowersOf(of, start) {
        start = start || 1;
        this.h = start;
        this.t = function (last) {
            return new PowersOf(of, last * of);
        };
    };

    PowersOf.prototype = new host.LazyStream();

    function HammingNumbers(sequence) {
        this.h = sequence.shift();
        this.t = function (last) {
            sequence.push(2 * last);
            sequence.push(3 * last);
            sequence.push(5 * last);
            sequence = this._sortUnique(sequence);
            return new HammingNumbers(sequence);
        };
    };

    HammingNumbers.prototype = new host.LazyStream();

    HammingNumbers.prototype._sortUnique = function(arr) {
        var result = [],
            j = 1;
        arr = Array.prototype.slice.call(arr, 0);
        arr = arr.sort(function (x, y) {
            return x - y > 0
                ? 1
                    : (x - y < 0)
                        ? -1
                        : 0;
        });
        result[0] = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (result[j - 1] != arr[i]) {
                result[j++] = arr[i];
            };
        };
        return result;
    };

    host.UpTo = UpTo;
    host.UpFrom = UpFrom;
    host.Squares = Squares;
    host.PowersOf = PowersOf;
    host.HammingNumbers = HammingNumbers;
})(Streams);

Streams.show = function(stream, limit) {
    stream.iterate(function(x) {
        console.log(x);
    }, limit);
};

Streams.get = function(stream, limit) {
    var result = [];
    stream.iterate(function(x) {
        result.push(x);
    }, limit);
    return result;
};
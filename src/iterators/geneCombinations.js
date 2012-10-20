(function(host) {

    function Generator(parts) {
        this.parts = parts;
        this.index = 0;
    };

    Generator.prototype.current = function () {
        return this.parts[this.index];
    };

    Generator.prototype.next = function () {
        var result = this.current();
        this.index += 1;
        return result;
    };

    Generator.prototype.rewind = function () {
        this.index = 0;
    };

    Generator.prototype.isEnd = function () {
        return this.parts.length == this.index;
    };

    Generator.prototype.toString = function () {
        return "[" + parts.join(",") + "]";
    };

    function getTokens(pattern) {
        var tokens = pattern.split(/[()]/);
        tokens.pop();
  
        for (i = 1; i < tokens.length; i += 2) {
            tokens[i] = new Generator(tokens[i]);
        };
        return tokens;
    };

    function generateGenes(tokens, callback) {
        var incrementing = true,
            permutation = "";
            token = null;
        while (incrementing) {
            incrementing = false;
            permutation = "";
      
            for (i = 0; i < tokens.length; i++) {
                token = tokens[i];
                if (token.constructor == String) {
                    permutation = permutation + token;
                 //Generator
                } else {
                   if (incrementing) {
                       permutation = permutation + token.current();
                   } else {
                       permutation = permutation + token.next();
                       if (token.isEnd()) {
                           token.rewind();
                       } else {
                           incrementing = true
                       };
                   };
               };
            };
            callback(permutation);
        };
    };

    function permuteGenes(pattern, callback) {
        generateGenes(getTokens(pattern), callback)
    };

    host.permuteGenes = permuteGenes;
})(Iterators);
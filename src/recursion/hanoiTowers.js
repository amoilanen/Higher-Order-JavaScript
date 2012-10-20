(function(host) {

    function HanoiTowers(disksNumber) {
        this.disks = disksNumber;
        this.positions = [];
        for (var i = 1; i <= this.disks; i++) {
            this.positions[i] = "A";
        };
    };

    HanoiTowers.prototype.solve = function(disk, start, finish, extra, mover) {
        if (1 == disk) {
            mover(disk, start, finish);
        } else {
            this.solve(disk - 1, start, extra, finish, mover);
            mover(disk, start, finish);
            this.solve(disk - 1, extra, finish, start, mover);
        };
    };

    HanoiTowers.prototype.getMoves = function() {
        var oThis = this;
        var moves = [];

        this.solve(this.disks, "A", "C", "B", function (disk, start, finish) {
            if (disk < 1 || disk > oThis.positions.size - 1) {
                throw "Bad disk number:  " + disk + ".  Disks should be between 1 and " + oThis.disks + "."
            };

            if (oThis.positions[disk] != start) {
                throw "Tried to move " + disk + " from " + start + ", " +
                    "but it is on peg " + oThis.positions[disk] + ".";
            };

            for (var smaller_disk = 1; smaller_disk < disk; smaller_disk++) {
                if (oThis.positions[smaller_disk] == start) {
                    throw "Cannot move " + disk + " from " + start + ", " +
                        "because " + smaller_disk + " is on top of it.";
                } else if (oThis.positions[smaller_disk] == finish) {
                    throw "Cannot move " + disk + " to " + finish + ", " +
                        "because " + smaller_disk + " is already there.";
                };
            };
            moves.push(disk + " from " + start + " to " + finish);
            oThis.positions[disk] = finish;
        });
        return moves;
    };
    
    host.HanoiTowers = HanoiTowers;
})(Recursion);
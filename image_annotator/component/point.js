define([], function () {
    return class Point {
        x = null
        y = null

        constructor(x, y) {
            this.x = x
            this.y = y
        }

        to_json() {
            return {x: this.x, y: this.y}
        }

    }
});



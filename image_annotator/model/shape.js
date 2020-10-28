define([
], function (
) {
    return class Shape {
        #points = []
        constructor() {
        }

        add_point(point) {
            this.#points.push(point)
        }

        get_point() {
            return this.#points
        }

        to_json() {
            var json_obj = []
            this.#points.forEach(
                point => json_obj.push(point.to_json())
            )
            return json_obj
        }
    }
});

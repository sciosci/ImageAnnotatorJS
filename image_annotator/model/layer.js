define([
], function (
) {
    return class Layer {
        #color = null
        #shapes = []

        constructor(color) {
            this.#color = color
        }

        set_color(color) {
            this.#color = color
        }

        add_shape(shape) {
            this.#shapes.push(shape)
        }

        get_shape(){
            return this.#shapes
        }

        is_empty() {
            return this.#shapes.length == 0
        }

        to_json() {
            var json_obj = []
            this.#shapes.forEach(
                shape => json_obj.push(shape.to_json())
            )
            return {color: this.#color, shapes: json_obj}
        }
    }
});

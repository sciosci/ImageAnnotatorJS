define([
], function (
) {
    return class Pen {

        #canvas = null
        #layer = null

        constructor(canvas, layer) {
            this.#canvas = canvas
            this.#layer = layer
        }

        register_events() {
            throw 'Unsupported method! register_events';
        }

        unregister_events() {
            this.get_canvas().off('mouse:down', this.mouse_down)
            this.get_canvas().off('mouse:up', this.mouse_up)
            this.get_canvas().off('mouse:move', this.mouse_move)
            this.get_canvas().off('mouse:dblclick', this.mouse_dblclick)
            console.log('Unregister all event. ')
        }

        mouse_down(o) {
            throw 'Unsupported method! mouse_down';
        }

        mouse_up(o) {
            throw 'Unsupported method! mouse_up';
        }

        mouse_move(o) {
            throw 'Unsupported method! mouse_move';
        }

        mouse_dblclick(o) {
            throw 'Unsupported method! mouse_dblclick';
        }

        get_canvas() {
            return this.#canvas
        }

        change_layer(layer) {
            this.#layer = layer
        }

        get_current_layer() {
            return this.#layer
        }

        write_coordination() {
            throw 'Unsupported method! write_coordination';
        }
    }
});


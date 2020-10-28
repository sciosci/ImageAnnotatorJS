define([
], function (
) {
    return class Pen {

        #canvas = null
        #group = null

        constructor(canvas, group) {
            this.#canvas = canvas
            this.#group = group
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

        change_group(group) {
            this.#group = group
        }

        get_current_group() {
            return this.#group
        }

        write_coordination() {
            throw 'Unsupported method! write_coordination';
        }
    }
});


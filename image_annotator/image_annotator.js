define([
    'jquery',
    'fabric',
    'square_pen',
    'polygon_pen',
    'group',
    'shape',
    'point',
], function (
    $,
    fabric,
    SquarePen,
    PolygonPen,
    Group,
    Shape,
    Point,
) {
    return class ImageAnnotator {

        #canvas = null
        #shape_color = null
        #square_pen = null
        #polygon_pen = null
        #pens = null
        #activated_pen = null
        #groups = null
        #idx = 0

        constructor(canvas_id) {
            this.#canvas = window._canvas = new fabric.Canvas(canvas_id);
            var group = new Group()
            group.set_color(this.#shape_color)
            this.#groups = [group]

            this.#square_pen = new SquarePen(this.#canvas, group, this.#shape_color)
            this.#polygon_pen = new PolygonPen(this.#canvas, group, this.#shape_color)
            this.#pens = [this.#square_pen, this.#polygon_pen]
            this.#activated_pen = this.#square_pen

            this.default()
        }

        default() {
            this.change_color('red')
            this.switch_square_pen()
        }

        #register_events() {
            this.#unregister_events()
            this.#activated_pen.register_events()

            console.log('Register event complete')
            return this
        }

        #unregister_events() {
            this.#pens.forEach(pen => pen.unregister_events())
            return this
        }

        #render_group() {
            var group = this.#groups[this.#idx]
            this.#polygon_pen.render(group)
        }

        change_color(color) {
            this.#canvas.shape_color = color
            this.#groups[this.#idx].set_color(color)
            this.#render_group()
            return this
        }

        switch_square_pen() {
            this.#activated_pen = this.#square_pen
            var current_group = this.#groups[this.#idx]
            this.#activated_pen.change_group(current_group)
            this.#register_events()
            return this
        }

        switch_polygon_pen() {
            this.#activated_pen = this.#polygon_pen
            var current_group = this.#groups[this.#idx]
            this.#activated_pen.change_group(current_group)
            this.#register_events()
            return this
        }

        switch_prev_group() {
            if (this.#idx) this.#idx--
            var current_group = this.#groups[this.#idx]
            this.#activated_pen.change_group(current_group)

            this.#render_group()
            return this
        }

        switch_next_group() {
            if (!this.#groups[this.#idx].is_empty()) this.#idx++
            if (this.#groups.length == this.#idx) {
                var group = new Group()
                group.set_color(this.#shape_color)
                this.#groups.push(group)
            }
            var current_group = this.#groups[this.#idx]
            this.#activated_pen.change_group(current_group)

            this.#render_group()
            return this
        }

        delete_group() {
            this.#groups.splice(this.#idx, 1)
            if (this.#groups.length == 0) {
                var group = new Group()
                group.set_color(this.#shape_color)
                this.#groups.push(group)
            } else {
                if (this.#idx > 0) this.#idx--
            }
            var current_group = this.#groups[this.#idx]
            this.#activated_pen.change_group(current_group)

            this.#render_group()
            return this
        }

        to_json() {
            var json_obj = []
            this.#groups.forEach(
                group => json_obj.push(group.to_json())
            )
            return json_obj
        }

        from_json(json_obj_group) {
            var color = json_obj_group.color

            var group
            if (this.#groups[this.#idx].is_empty()) {
                group = this.#groups[this.#idx]
            } else {
                group = new Group()
                this.#groups.push(group)
                this.#idx++
            }

            var shapes = group.get_shape()

            json_obj_group.shapes.forEach(
                json_obj_shape => {
                    var shape = new Shape()
                    json_obj_shape.points.forEach(
                        point => shape.add_point(new Point(point.x, point.y))
                    )
                    shapes.push(shape)
                }
            )

            var current_group = this.#groups[this.#idx]
            this.change_color(color)
            this.#activated_pen.change_group(current_group)

            this.#render_group()
        }
    }
});

define([
    'jquery',
    'fabric',
    'square_pen',
    'polygon_pen',
    'layer',
    'shape',
    'point',
], function (
    $,
    fabric,
    SquarePen,
    PolygonPen,
    Layer,
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
        #layers = null
        #idx = 0
        #backgroumd_img_url = null


        constructor(canvas_id) {
            this.#canvas = window._canvas = new fabric.Canvas(canvas_id);
            var layer = new Layer()
            layer.set_color(this.#shape_color)
            this.#layers = [layer]

            this.#square_pen = new SquarePen(this.#canvas, layer, this.#shape_color)
            this.#polygon_pen = new PolygonPen(this.#canvas, layer, this.#shape_color)
            this.#pens = [this.#square_pen, this.#polygon_pen]
            this.#activated_pen = this.#square_pen

            this.default()
        }

        default() {
            this.change_color('red')
            this.switch_square_nib()
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

        #render_layer() {
            var layer = this.#layers[this.#idx]
            this.#polygon_pen.render(layer)
            this.set_backgroud_img(this.#backgroumd_img_url)
        }

        change_color(color) {
            this.#canvas.shape_color = color
            this.#layers[this.#idx].set_color(color)
            this.#render_layer()
            return this
        }

        switch_square_nib() {
            this.#activated_pen = this.#square_pen
            var current_layer = this.#layers[this.#idx]
            this.#activated_pen.change_layer(current_layer)
            this.#register_events()
            return this
        }

        switch_polygon_nib() {
            this.#activated_pen = this.#polygon_pen
            var current_layer = this.#layers[this.#idx]
            this.#activated_pen.change_layer(current_layer)
            this.#register_events()
            return this
        }

        switch_prev_layer() {
            if (this.#idx) this.#idx--
            var current_layer = this.#layers[this.#idx]
            this.#activated_pen.change_layer(current_layer)

            this.#render_layer()
            return this
        }

        switch_next_layer() {
            if (!this.#layers[this.#idx].is_empty()) this.#idx++
            if (this.#layers.length == this.#idx) {
                var layer = new Layer()
                layer.set_color(this.#shape_color)
                this.#layers.push(layer)
            }
            var current_layer = this.#layers[this.#idx]
            this.#activated_pen.change_layer(current_layer)

            this.#render_layer()
            return this
        }

        clear_layer() {
            this.#layers.splice(this.#idx, 1)
            if (this.#layers.length == 0) {
                var layer = new Layer()
                layer.set_color(this.#shape_color)
                this.#layers.push(layer)
            } else {
                if (this.#idx > 0) this.#idx--
            }
            var current_layer = this.#layers[this.#idx]
            this.#activated_pen.change_layer(current_layer)

            this.#render_layer()
            return this
        }

        get_layer_index() {
            return this.#idx
        }

        get_layers() {
            return this.#layers
        }

        set_backgroud_img(url) {
            var that = this
            this.#backgroumd_img_url = url
            fabric.Image.fromURL(url, function(img) {
                //i create an extra var for to change some image properties
                that.#canvas.setWidth(img.width);
                that.#canvas.setHeight(img.height);
                that.#canvas.setBackgroundImage(img);
                that.#canvas.calcOffset();
            });
        }

        to_json() {
            var json_obj = []
            this.#layers.forEach(
                layer => json_obj.push(layer.to_json())
            )
            return json_obj
        }

        from_json(json_obj_layer) {
            var color = json_obj_layer.color

            var layer
            if (this.#layers[this.#idx].is_empty()) {
                layer = this.#layers[this.#idx]
            } else {
                layer = new Layer()
                this.#layers.push(layer)
                this.#idx++
            }

            var shapes = layer.get_shape()

            json_obj_layer.shapes.forEach(
                json_obj_shape => {
                    var shape = new Shape()
                    json_obj_shape.points.forEach(
                        point => shape.add_point(new Point(point.x, point.y))
                    )
                    shapes.push(shape)
                }
            )

            var current_layer = this.#layers[this.#idx]
            this.change_color(color)
            this.#activated_pen.change_layer(current_layer)

            this.#render_layer()
        }
    }
});

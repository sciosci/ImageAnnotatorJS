define([
    'pen',
    'point',
    'shape',
], function (
    Pen,
    Point,
    Shape,
) {
    return class PolygonPen extends Pen {
        constructor(canvas, layer, shape_color) {
            super(canvas, layer);
            this.get_canvas().setStartingPoint = this.setStartingPoint
            this.get_canvas().makeRoof = this.makeRoof
            this.get_canvas().findTopPaddingForRoof = this.findTopPaddingForRoof
            this.get_canvas().findLeftPaddingForRoof = this.findLeftPaddingForRoof
            this.get_canvas().Point = this.Point
            this.get_canvas().shape_color = shape_color
        }

        register_events() {
            this.reset()
            console.log('Register events for PolygonPen')
        }

        reset() {
            var canvas = this.get_canvas()
            canvas.roofPoints = [];
            canvas.lines = [];
            canvas.lineCounter = 0;
            canvas.drawingObject = {};
            if (canvas.drawingObject.type == "roof") {
                canvas.drawingObject.type = "";
                canvas.lines.forEach(function (value, index, ar) {
                    canvas.remove(value);
                });
                canvas.renderAll();
            } else {
                canvas.drawingObject.type = "roof";
            }
            this.get_canvas().pen = this
            this.get_canvas().on('mouse:down', this.mouse_down)
            this.get_canvas().on('mouse:move', this.mouse_move)
            this.get_canvas().on('mouse:dblclick', this.mouse_dblclick)
        }

        mouse_down(o) {
            var that = this
            this.selection = false;
            this.setStartingPoint(o); // set x,y
            this.roofPoints.push(new Point(this.x, this.y));
            var points = [this.x, this.y, this.x, this.y];
            this.lines.push(new fabric.Line(points, {
                strokeWidth: 2,
                selectable: false,
                stroke: that.shape_color,
                left: that.x,
                top: that.y,
            }));
            this.add(this.lines[this.lineCounter]);
            this.lineCounter++;
            this.on('mouse:up', function (options) {
                that.selection = true;
            });

            if (this.active_polygon) {
                this.remove(this.active_polygon)
            }

            var points = []
            Object.assign(points, this.roofPoints)
            var polygon = new fabric.Polygon(points, {
                stroke: that.shape_color,
                strokeWidth:2,
                fill: that.shape_color,
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching:false
            });
            this.add(polygon)
            this.active_polygon = polygon
        }

        mouse_move(o) {
            if (this.lines[0] !== null && this.lines[0] !== undefined && this.drawingObject.type == "roof") {
                this.setStartingPoint(o);
                this.lines[this.lineCounter - 1].set({
                    x2: this.x,
                    y2: this.y,
                });
                var polygon = this.active_polygon
                var points = polygon.get("points");
                points[this.roofPoints.length] = {
                    x:this.x,
                    y:this.y
                }
                polygon.set({
                    points: points
                });
                this.renderAll();
            }
        }

        mouse_dblclick(o) {
            var that = this
            this.lines.forEach(function (value, index, ar) {
                that.remove(value);
            });
            this.roofPoints = this.roofPoints.slice(0, this.roofPoints.length - 1)
            this.roof = this.makeRoof(this.roofPoints);
            // The last one is the dummy point, so the length = 3 represents a line
            if (this.roof.points.length > 3) {
                this.add(this.roof);
                this.pen.write_coordination()
            }

            console.log("double click");
            //clear arrays
            this.roofPoints = [];
            this.lines = [];
            this.lineCounter = 0;
            this.remove(this.active_polygon)
            this.active_polygon = null
            this.renderAll();
        }

        setStartingPoint(options) {
            var offset = $('#c').offset();
            this.x = options.e.pageX - offset.left;
            this.y = options.e.pageY - offset.top;
        }

        makeRoof(roofPoints) {
            var that = this
            this.roofPoints.push(new Point(roofPoints[0].x, roofPoints[0].y))
            this.active_polygon.fill = 'rgba(0,0,0,0)'
            this.active_polygon.opacity = 1
            this.active_polygon.stroke = that.shape_color
            this.active_polygon.strokeWidth = 2


            return this.active_polygon;
        }

        write_coordination() {
            var points = this.get_canvas().roof.points
            points = points.slice(0, points.length - 1)
            var shape = new Shape()
            points.forEach(
                point => shape.add_point(point)
            )
            this.get_current_layer().add_shape(shape)
        }

        render(layer) {
            this.get_canvas().clear()
            if (layer.is_empty()) {
                console.log('No point to render, clean the canvas')
            } else {
                var that = this
                var shapes = layer.get_shape()
                shapes.forEach(
                    shape => {
                        var points = shape.get_point()
                        var xy = []
                        points.forEach(
                            point => xy.push({
                                x: point.x,
                                y: point.y,
                            })
                        )

                        var polygon = new fabric.Polygon(xy, {
                            stroke: that.get_canvas().shape_color,
                            strokeWidth:2,
                            fill: 'rgba(0,0,0,0)',
                            opacity: 1,
                            selectable: false,
                            hasBorders: true,
                            hasControls: false,
                            evented: false,
                            objectCaching:false
                        });
                        that.get_canvas().add(polygon)
                    }
                )
                this.get_canvas().renderAll()
            }
        }
    }
});

define([
    'pen',
    'shape',
    'point',
    'fabric',
], function (
    Pen,
    Shape,
    Point,
    fabric,
) {
    return class SquarePen extends Pen {
        constructor(canvas, group, shape_color) {
            super(canvas, group)
            this.get_canvas().shape_color = shape_color
        }

        register_events() {
            this.reset()
            console.log('Register events for SquarePen')
        }

        reset() {
            this.get_canvas().isDown = false;
            this.get_canvas().origX = null
            this.get_canvas().origY = null
            this.get_canvas().rect = null
            this.get_canvas().pen = this
            this.get_canvas().on('mouse:down', this.mouse_down)
            this.get_canvas().on('mouse:move', this.mouse_move)
            this.get_canvas().on('mouse:up', this.mouse_up)
        }


        mouse_down(o) {
            var that = this
            this.isDown = true;
            var pointer = this.getPointer(o.e);
            this.origX = pointer.x;
            this.origY = pointer.y;
            var pointer = this.getPointer(o.e);
            this.rect = new fabric.Rect({
                left: this.origX,
                top: this.origY,
                originX: 'left',
                originY: 'top',
                width: pointer.x - this.origX,
                height: pointer.y - this.origY,
                angle: 0,
                strokeWidth: 2,
                stroke: that.shape_color,
                fill: 'rgba(0,0,0,0)',
                transparentCorners: true
            });
            this.add(this.rect);
        }

        mouse_move(o) {
            if (!this.isDown) return;
            var pointer = this.getPointer(o.e);

            if (this.origX > pointer.x) {
                this.rect.set({left: Math.abs(pointer.x)});
            }
            if (this.origY > pointer.y) {
                this.rect.set({top: Math.abs(pointer.y)});
            }

            this.rect.set({width: Math.abs(this.origX - pointer.x)});
            this.rect.set({height: Math.abs(this.origY - pointer.y)});

            this.renderAll();
        }

        mouse_up(o) {
            this.isDown = false;
            this.pen.write_coordination()
        }

        write_coordination() {
            var left = this.get_canvas().rect.left
            var top = this.get_canvas().rect.top
            var width = this.get_canvas().rect.width
            var height = this.get_canvas().rect.height
            var p1 = new Point(left, top)
            var p2 = new Point(left+width, top)
            var p3 = new Point(left+width, top+height)
            var p4 = new Point(left, top+height)
            var shape = new Shape()
            var points = [p1, p2, p3, p4]
            points.forEach(
                point => shape.add_point(point)
            )
            this.get_current_group().add_shape(shape)
        }
    }
});

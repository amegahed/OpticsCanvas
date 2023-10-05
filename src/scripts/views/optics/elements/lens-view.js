/******************************************************************************\
|                                                                              |
|                                    lens-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a view of a single lens element.            |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function LensView(model, options) {

	// call superclass constructor
	//
	ElementView.call(this, model, options);

	// create subviews
	//
	this.regions = {
		surface1: new SurfaceView.create(model.surface1, {
			clockwise: true
		}),
		surface2: new SurfaceView.create(model.surface2, {
			offset: new Vector2(this.model.thickness, 0),
			clockwise: false
		})
	}
	
	return this;
}

// extend prototype from "superclass"
//
LensView.prototype = _.extend(Object.create(ElementView.prototype), {

	//
	// canvas drawing methods
	//

	drawEdge: function(context, surface1, surface2, sign) {

		// increasing radius
		//
		if (surface1.radius > surface2.radius) {
			var x1 = (-this.model.thickness / 2 + surface1.thickness) * sign;
			var x2 = (this.model.thickness / 2 + surface2.thickness) * sign;
			if (this.model.options.bevelled) {
				var x = (x1 + x2) / 2;
			} else {
				var x = x2;
			}
			var y = surface1.radius * sign;
			context.lineTo(x, y);

		// decreasing radius
		//
		} else if (surface1.radius < surface2.radius) {
			var x1 = (-this.model.thickness / 2 - surface1.thickness) * sign;
			var x2 = (this.model.thickness / 2 - surface2.thickness) * sign;
			if (this.model.options.bevelled) {
				var x = (x1 + x2) / 2;
			} else {
				var x = x1;
			}
			var y = surface2.radius * sign;
			context.lineTo(x, y);
		}
	},

	draw: function(context) {
		context.save();
		context.beginPath();

		// draw surface1
		//
		this.regions.surface1.draw(context, true);
		context.translate(this.model.thickness / 2, 0);

		// draw edge from surface1 to surface2
		//
		this.drawEdge(context, this.model.surface1, this.model.surface2, 1);

		// draw surface2
		//
		context.translate(this.model.thickness / 2, 0);
		this.regions.surface2.draw(context, false);
		context.translate(-this.model.thickness / 2, 0);

		// draw edge from surface2 to surface1
		//
		this.drawEdge(context, this.model.surface2, this.model.surface1, -1);

		context.closePath();
		context.restore();
	},
	
	//
	// svg rendering methods
	//

	getEdge: function(surface1, surface2, sign) {

		// increasing radius
		//
		if (surface1.radius > surface2.radius) {
			var x1 = (-this.model.thickness / 2 + surface1.thickness) * sign;
			var x2 = (this.model.thickness / 2 + surface2.thickness) * sign;
			if (this.model.options.bevelled) {
				var x = (x1 + x2) / 2;
			} else {
				var x = x2;
			}
			x += this.model.thickness / 2;
			var y = surface1.radius * sign;

		// decreasing radius
		//
		} else if (surface1.radius < surface2.radius) {
			var x1 = (-this.model.thickness / 2 - surface1.thickness) * sign;
			var x2 = (this.model.thickness / 2 - surface2.thickness) * sign;
			if (this.model.options.bevelled) {
				var x = (x1 + x2) / 2;
			} else {
				var x = x1;
			}
			x += this.model.thickness / 2;
			var y = surface2.radius * sign;

		// same radius
		//
		} else {
			return null;
		}

		return 'L ' + x + ' ' + y;
	},

	toPath: function() {
		var d1 = this.regions.surface1.toDrawing(new Vector2(0, 0), true);
		var e1 = this.getEdge(this.model.surface1, this.model.surface2, 1);
		var d2 = this.regions.surface2.toDrawing(new Vector2(this.model.thickness, 0), false, true);
		var e2 = this.getEdge(this.model.surface2, this.model.surface1, -1);

		// create drawing
		//
		var d = d1;
		if (e1) {
			d += ' ' + e1;
		}
		d += ' ' + d2;
		if (e2) {
			d += ' ' + e2;
		}
		d += ' Z';

		// create path
		//
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set attributes
		//
		$(path).attr('d', d);

		// set color attributes
		//
		$(path).attr('stroke', this.options.strokeStyle);
		$(path).attr('fill', this.options.fillStyle);

		return path;
	},

	toSVG: function() {
		var width = this.model.getMaxThickness();
		var height = (this.model.radius * 2);
		var strokeWidth = parseInt(getCSS('stroke-width', 'lens').replace('px', ''));
		var xmin = this.model.surface1.isConcave()? -this.model.surface1.thickness : 0;
		var xmax = xmin + width;
		var offset = this.options.offset? this.options.offset : 0;

		// create svg
		//
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		// set attributes
		//
		$(svg).attr('class', 'lens');
		$(svg).attr('thickness', this.model.getMaxThickness());
		$(svg).attr('x', (-width / 2 - strokeWidth + offset) + 'mm');
		$(svg).attr('y', (-height / 2  - strokeWidth) + 'mm');
		$(svg).attr('width', (width + strokeWidth * 2) + 'mm');
		$(svg).attr('height', (height + strokeWidth * 2) + 'mm');
		svg.setAttributeNS(null, 'viewBox', (xmin - strokeWidth) + ' ' + (-height / 2 - strokeWidth) + ' ' +
			(width + strokeWidth * 2) + ' ' + (height + strokeWidth * 2));

		// add path to svg
		//
		var index = this.options && this.options['index']? this.options['index'] : 0;
		$(svg).append(this.toPath());

		// add surfaces
		//
		$(svg).append($(this.regions.surface1.toPath()).attr({
			'class': 'surface',
			'order': 'first',
			'thickness': this.model.surface1.thickness * this.model.surface1.sign(),
			'rel': 'tooltip',
			'title': 'S' + (index * 2 + 1)
		}));
		$(svg).append($(this.regions.surface2.toPath()).attr({
			'class': 'surface',
			'order': 'second',
			'thickness': this.model.surface2.thickness * this.model.surface2.sign(),
			'rel': 'tooltip',
			'title': 'S' + (index * 2 + 2)
		}));

		return svg;
	},

	render: function() {
		return this.toSVG();
	}
});

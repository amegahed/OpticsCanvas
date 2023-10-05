/******************************************************************************\
|                                                                              |
|                                spherical-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the class definition of a view of spherical lens surface.     |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function SphericalView(model, options) {

	// call "superclass" constructor
	//
	SurfaceView.call(this, model, options);

	return this;
}

// extend prototype from "superclass"
//
SphericalView.prototype = _.extend(Object.create(SurfaceView.prototype), {

	//
	// canvas drawing methods
	//

	draw: function(context) {

		// call superclass method
		//
		var angle = Math.atan(this.model.radius / (Math.abs(this.model.radiusOfCurvature) - this.model.thickness));
		var clockwise = this.options && this.options.clockwise;
		var highAccuracy = this.options && this.options.highAccuracy;
		var sign = (clockwise? 1 : -1);

		// find arc angles
		//
		if (this.model.isConvex()) {
			var startAngle = Math.PI + sign * angle;
			var endAngle = Math.PI - sign * angle;
			var direction = clockwise;
		} else {
			var startAngle = -sign * angle;
			var endAngle = sign * angle;
			var direction = !clockwise;
		}

		// find center of arc
		//
		var x = this.model.radiusOfCurvature;
		var y = 0;

		if (!highAccuracy) {

			// draw surface in one arc
			//
			context.arc(x, y, Math.abs(this.model.radiusOfCurvature), startAngle, endAngle, direction);
		} else {

			// draw surface in two arcs
			//
			var midAngle = (startAngle + endAngle) / 2;
			context.arc(x, y, Math.abs(this.model.radiusOfCurvature), startAngle, midAngle, direction);
			context.arc(x, y, Math.abs(this.model.radiusOfCurvature), midAngle, endAngle, direction);
		}
	},

	//
	// svg rendering methods
	//

	toDrawing: function(offset, clockwise, append) {

		// set arc parameters
		//
		var rx = this.model.radiusOfCurvature;
		var ry = this.model.radiusOfCurvature;
		var xAxisRotation = 0;
		var largeArcFlag = 0;

		// find arc endpoints and sweep
		//
		var sign = (clockwise? 1 : -1);
		if (this.model.isConvex()) {
			var x1 = this.model.thickness;
			var y1 = -this.model.radius * sign;
			var x2 = x1;
			var y2 = this.model.radius * sign;
			var sweepFlag = clockwise? 0 : 1;
		} else {
			var x1 = -this.model.thickness;
			var y1 = -this.model.radius * sign;
			var x2 = x1;
			var y2 = this.model.radius * sign;
			var sweepFlag = clockwise? 1 : 0;
		}

		// add optional offset
		//
		if (offset) {
			x1 += offset.x;
			y1 += offset.y;
			x2 += offset.x;
			y2 += offset.y;
		}

		// create arc
		//
		if (append) {
			return 'L ' + x1 + ' ' + y1 + ' A ' + rx + ' ' + ry + ' ' +
				xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' +
				x2 + ' ' + y2;
		} else {
			return 'M ' + x1 + ' ' + y1 + ' A ' + rx + ' ' + ry + ' ' +
				xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' +
				x2 + ' ' + y2;			
		}
	},

	toPath: function() {
		var offset = this.options? this.options.offset : null;
		var clockwise = (this.options && this.options.clockwise)? true : false;
		var append = (this.options && this.options.append)? true : false;

		// create path
		//
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set path attributes
		//
		$(path).attr('d', this.toDrawing(offset, clockwise, append));

		return path;
	}
});
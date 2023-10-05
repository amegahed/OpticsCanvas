/******************************************************************************\
|                                                                              |
|                                  planar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the class definition of a view of of planar lens surface.     |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function PlanarView(model, options) {

	// call "superclass" constructor
	//
	SurfaceView.call(this, model, options);

	return this;
}

// extend prototype from "superclass"
//
PlanarView.prototype = _.extend(Object.create(SurfaceView.prototype), {

	//
	// canvas drawing methods
	//

	draw: function(context) {
		if (this.options && this.options.clockwise) {
			context.lineTo(0, -this.radius);
			context.lineTo(0, this.radius);
		} else {
			context.lineTo(0, this.radius);
			context.lineTo(0, -this.radius);		
		}
	},

	//
	// svg rendering methods
	//

	toDrawing: function(offset, clockwise, append) {
		if (clockwise) {
			var x1 = 0;
			var y1 = -this.model.radius;
			var x2 = 0;
			var y2 = this.model.radius;
		} else {
			var x1 = 0;
			var y1 = this.model.radius;
			var x2 = 0;
			var y2 = -this.model.radius;
		}

		// add optional offset
		//
		if (offset) {
			x1 += offset.x;
			y1 += offset.y;
			x2 += offset.x;
			y2 += offset.y;
		}

		// create line
		//
		if (append) {
			return 'L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
		} else {
			return 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;			
		}
	},

	toPath: function() {
		var offset = this.options? this.options.offset : null;
		var clockwise = this.options && this.options.clockwise;
		var append = this.options && this.options.append;

		// create path
		//
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		// set attributes
		//
		$(path).attr('d', this.toDrawing(offset, clockwise, append));

		return path;
	}
});
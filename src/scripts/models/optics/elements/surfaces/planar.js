/******************************************************************************\
|                                                                              |
|                                    planar.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the class definition of a of planar lens surface.             |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Planar(diameter) {

	// call "superclass" constructor
	//
	Surface.call(this, diameter, 0);

	return this;
}

// extend prototype from "superclass"
//
Planar.prototype = _.extend(Object.create(Surface.prototype), {

	//
	// querying methods
	//

	isConvex: function() {
		return false;
	},

	isConcave: function() {
		return false;
	},

	sign: function() {
		return 1;
	},

	intersect: function(ray, inclusive) {
		if (ray.direction.x != 0) {
			var t = (-ray.location.x / ray.direction.x);

			var epsilon = inclusive? -Surface.epsilon : Surface.epsilon;
			if (t <= epsilon) {
				t = infinity;
			}

			return t;
		} else {
			return infinity;
		}
	},

	getNormal: function(point) {
		return new Vector2(1, 0, 0);
	},

	getPoints: function(divisions, options) {

		// set optional parameter defaults
		//
		if (options && options.aperture) {

			// use specified aperture
			//
			var ymin = -options.aperture / 2;
			var ymax = options.aperture / 2;	
		} else if (options && options.ymin && options.ymax) {

			// use specified ymin, ymax
			//
			var ymin = options.ymin;
			var ymax = options.ymax;
		} else {

			// use full aperture 
			//
			var ymin = -this.radius;
			var ymax = this.radius;			
		}

		var points = [];
		for (var i = 0; i < divisions; i++) {
			var t = i / (divisions - 1);
			var y = ymin + (ymax - ymin) * t;
			points[i] = new Vector2(0, y);
		}

		return points;
	}
});
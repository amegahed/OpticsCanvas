/******************************************************************************\
|                                                                              |
|                                  spherical.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the class definition of a of spherical lens surface.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Spherical(radiusOfCurvature, diameter) {
	var distanceToCenter = Math.sqrt(Math.pow(radiusOfCurvature, 2) - 
		Math.pow(diameter / 2, 2));
	var thickness = (Math.abs(radiusOfCurvature) - distanceToCenter);

	// call "superclass" constructor
	//
	Surface.call(this, diameter, thickness);

	// set attributes
	//
	this.radiusOfCurvature = radiusOfCurvature;
	this.centerOfCurvature = new Vector2(this.radiusOfCurvature, 0);

	return this;
}

// extend prototype from "superclass"
//
Spherical.prototype = _.extend(Object.create(Surface.prototype), {

	//
	// querying methods
	//

	isConvex: function() {
		return this.radiusOfCurvature > 0;
	},

	isConcave: function() {
		return this.radiusOfCurvature < 0;
	},

	sign: function() {
		return Math.sign(this.radiusOfCurvature);
	},

	intersect: function(ray, inclusive) {
		var location = ray.location.minus(this.centerOfCurvature);
		var qa = ray.direction.dot(ray.direction);
		var qb = 2.0 * ray.direction.dot(location);
		var qc = location.dot(location) - Math.pow(this.radiusOfCurvature, 2);
		var qd = qb * qb - 4.0 * qa * qc;
		
		// check discrimanant
		//
		if (qd < 0) {
			return infinity;
		} else {
			var t, t1, t2;

			// find closest intersection which is not behind
			// the ray origin - find the smallest positive t
			//
			qd = Math.sqrt(qd);
			qa = 2.0 * qa;

			// the two intersections 
			//
			t1 = (-qb + qd) / qa;
			t2 = (-qb - qd) / qa;

			// find x coordinate of intersections
			//
			var x1 = location.x + t1 * ray.direction.x;
			var x2 = location.x + t2 * ray.direction.x;

			// reject intersections with opposite surface
			//
			if (this.isConvex()) {
				if (x1 > 0) {
					t1 = infinity;
				}
				if (x2 > 0) {
					t2 = infinity;
				}
			} else {
				if (x1 < 0) {
					t1 = infinity;
				}
				if (x2 < 0) {
					t2 = infinity;
				}
			}

			// reject intersections that are behind us
			//
			var epsilon = inclusive? -Surface.epsilon : Surface.epsilon;
			if (t1 <= epsilon) {
				t1 = infinity;
			}
			if (t2 <= epsilon) {
				t2 = infinity;
			}

			// return closest intersection
			//
			if (t1 < t2) {
				t =  t1;
			} else {
				t = t2;
			}

			// reject intersections outside of radius
			//
			if (Math.abs(location.y + t * ray.direction.y) > this.radius) {
				t = infinity;
			}

			return t;
		}
	},

	getNormal: function(point) {
		return point.minus(this.centerOfCurvature);
	},

	getEquidistantPoints: function(divisions, ymin, ymax) {
		var points = [];
		for (var i = 0; i < divisions; i++) {
			var t = i / (divisions - 1);
			var y = ymin + (ymax - ymin) * t;
			var angle = Math.asin(y / this.radiusOfCurvature);
			var x = this.radiusOfCurvature * (1 - Math.cos(angle));
			points[i] = new Vector2(x, y);
		}

		return points;
	},
	
	getEquiangularPoints: function(divisions, ymin, ymax) {
		var minAngle = Math.asin(ymin / this.radiusOfCurvature);
		var maxAngle = Math.asin(ymax / this.radiusOfCurvature);

		var points = [];
		for (var i = 0; i < divisions; i++) {
			var t = i / (divisions - 1);
			var angle = minAngle + (maxAngle - minAngle) * t;
			var y = this.radiusOfCurvature * Math.sin(angle);
			var x = this.radiusOfCurvature * (1 - Math.cos(angle));
			points[i] = new Vector2(x, y);
		}

		return points;
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

		if (options && options.equidistant) {
			return this.getEquidistantPoints(divistions, ymin, ymax);
		} else {
			return this.getEquiangularPoints(divisions, ymin, ymax);
		}
	}
});

// static members
//
Spherical.epsilon = 0.000001;
/******************************************************************************\
|                                                                              |
|                                 distant-light.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a directional (infinity) light source.      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function DistantLight(direction, location, options) {

	// call "superclass" constructor
	//
	Light.call(this, options);

	// set attributes
	//
	this.location = location;
	this.direction = direction;

	return this;
}

// extend prototype from "superclass"
//
DistantLight.prototype = _.extend(Object.create(Light.prototype), {

	//
	// querying methods
	//

	getRays: function(points) {
		var rays = [];

		// create rays from light to points
		//
		for (var i = 0; i < points.length; i++) {
			var direction = points[i].minus(this.location);
			var parallel = direction.parallel(this.direction);
			var perpendicular = direction.minus(parallel);
			rays[i] = new Ray2(this.location.plus(perpendicular), parallel.normalized());
		}

		return rays;
	}
});
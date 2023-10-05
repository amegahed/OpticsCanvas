/******************************************************************************\
|                                                                              |
|                                  point-light.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a positional (point) light source.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function PointLight(location, options) {

	// call "superclass" constructor
	//
	Light.call(this, options);

	// set attributes
	//
	this.location = location;

	return this;
}

// extend prototype from "superclass"
//
PointLight.prototype = _.extend(Object.create(Light.prototype), {

	//
	// querying methods
	//

	getRays: function(points) {
		var rays = [];

		// create rays from light to points
		//
		for (var i = 0; i < points.length; i++) {
			var direction = points[i].minus(this.location).normalized();
			rays[i] = new Ray2(this.location, direction);
		}

		return rays;
	}
});
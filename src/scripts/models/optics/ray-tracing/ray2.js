/******************************************************************************\
|                                                                              |
|                                    ray2.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a two dimensional ray type and its operations.           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Ray2(location, direction) {
	if (!location || !direction) {
		return;
	}

	// set attributes
	//
	this.location = location;
	this.direction = direction;
	
	return this;
}

_.extend(Ray2.prototype, {

	//
	// methods
	//

	equals: function(ray) {
		return (ray && (this.location.equals(ray.location)) && (this.direction.equals(ray.direction)));
	},

	clone: function() {
		return new Ray2(this.location.clone(), this.direction.clone());
	},

	intersect: function(ray2) {
		var determinant = this.direction.determinant(ray2.direction);
		if (determinant != 0) {
			var direction = ray2.location.minus(this.location);
			return direction.determinant(ray2.direction) / determinant;
		} else {

			// rays are parallel
			//
			return infinity;
		}
	}
});
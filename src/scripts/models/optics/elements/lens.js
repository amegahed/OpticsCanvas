/******************************************************************************\
|                                                                              |
|                                    lens.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a single lens element.                      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Lens(surface1, thickness, surface2, options) {

	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}
	if (options.bevelled == undefined) {
		options.bevelled = true;
	}

	// call "superclass" constructor
	//
	Element.call(this, options);

	// set attributes
	//
	this.surface1 = surface1;
	this.surface2 = surface2;
	this.radius = Math.max(surface1.radius, surface2.radius);
	this.thickness = thickness;
	
	return this;
}

// extend prototype from "superclass"
//
Lens.prototype = _.extend(Object.create(Element.prototype), {

	//
	// querying methods
	//

	getRadius: function() {
		return Math.max(this.surface1.radius, this.surface2.radius);
	},

	getCenterThickness: function() {
		return this.thickness;
	},

	getEdgeThickness: function() {
		return this.thickness + 
			(this.surface1.isConvex()? -this.surface1.thickness : this.surface1.thickness) + 
			(this.surface2.isConvex()? this.surface2.thickness : -this.surface2.thickness);
	},

	getMaxThickness: function() {
		return this.thickness + 
			(this.surface1.isConcave()? this.surface1.thickness : 0) + 
			(this.surface2.isConvex()? this.surface2.thickness : 0);
	},

	getBounds: function() {
		var radius = this.getRadius();
		var thickness = Math.max(this.thickness, this.getThickness());
		return {
			min: new Vector2(-thickness / 2, -radius),
			max: new Vector2(thickness / 2, radius)
		}
	},

	//
	// ray tracing methods
	//

	intersect: function(ray, surface, inclusive) {
		if (surface == null) {

			// intersect first surface
			//
			return this.surface1.intersect(ray, inclusive);
		} else if (surface == this.surface1) {

			// intersect second surface
			//
			var ray2 = ray.clone();
			ray2.location.x -= this.thickness;
			return this.surface2.intersect(ray2, inclusive);
		} else {

			// no intersection
			//
			return null;
		}
	},

	nextSurface: function(fromSurface) {
		if (!fromSurface) {

			// return first surface
			//
			return this.surface1;
		} else if (fromSurface == this.surface1) {

			// return second surface
			//
			return this.surface2;
		} else {

			// return no surface
			//
			return null;
		}
	}
});

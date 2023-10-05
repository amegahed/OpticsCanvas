/******************************************************************************\
|                                                                              |
|                                     optics.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a collection of optical elements.           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Optics(elements, options) {

	// set attributes
	//
	this.elements = elements;
	this.aperture = options.aperture;
	
	return this;
}

_.extend(Optics.prototype, {

	//
	// querying methods
	//

	getAperture: function() {
		return (this.aperture)? this.aperture : this.elements.getAperture();
	},

	getLength: function() {
		return this.elements.getLength();
	},

	trace: function(rays, options) {

		// set optional parameter defaults
		//
		if (!options) {
			options = {};
		}
		if (options.focus == undefined) {
			options.focus = true;
		}
		if (options.extend == undefined) {
			options.extend = false;
		}

		// create new beam
		//
		var beam = new Beam();

		// trace rays
		//
		if (options.showNormals) {
			normals = [];
		} else {
			normals = undefined;
		}
		rays = this.elements.traceRays(rays, beam, normals);

		// focus rays
		//
		if (options.focus) {
			beam.focus(rays);
		} else if (options.extend) {
			beam.extend(rays, this.elements.getLength());
		}

		return beam;
	}
});

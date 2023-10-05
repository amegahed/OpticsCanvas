/******************************************************************************\
|                                                                              |
|                                   point-light.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a point light source.                       |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Light(options) {

	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}
	if (!options.wavelengths) {
		options.wavelengths = [spectralLines.sodium.D];
		//options.wavelengths = [spectralLines.mercury.e];
	}
	if (!options.numberOfRays) {
		options.numberOfRays = 75;
	}

	// set attributes
	//
	this.wavelengths = options.wavelengths;
	this.numberOfRays = options.numberOfRays;

	return this;
}
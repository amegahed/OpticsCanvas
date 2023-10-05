/******************************************************************************\
|                                                                              |
|                                   element.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is an abstract base class for optical elements.                  |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Element(options) {

	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}

	// positioning options
	//
	if (options.spacing == undefined) {
		options.spacing = 0;
	}
	if (options.offAxisDistance == undefined) {
		options.offAxisDistance = 0;
	}
	if (options.tilt == undefined) {
		options.tilt = 0;
	}

	// material options
	//
	if (!options.material) {
		options.material = materials.glass.crown;
	}

	// set attributes
	//
	this.options = options;

	return this;
}
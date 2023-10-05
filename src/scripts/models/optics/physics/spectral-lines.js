/******************************************************************************\
|                                                                              |
|                                 spectral-lines.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a number of spectral lines commonly used in optics.      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


var spectralLines = {

	// mercury emission lines
	//
	mercury: {
		i: 365.01,	// ultraviolet
		h: 404.66,	// violet
		g: 435.84,	// blue
		e: 546.07,	// green
		t: 1013.98	// IR
	},

	// cadmium emission lines
	//
	cadmium: {
		F1: 479.99,	// blue
		C1: 643.85	// red
	},

	hydrogen: {
		F: 486.13,	// blue
		C: 656.27	// red
	},

	helium: {
		d: 587.546,	// yellow
		r: 706.52	// red
	},

	sodium: {
		D: 589.365	// yellow
	},

	potassium: {
		A1: 768.2 	// IR
	},

	cesium: {
		s: 852.11	// IR
	}
};




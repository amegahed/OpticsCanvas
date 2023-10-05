/******************************************************************************\
|                                                                              |
|                                   material.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a refractive material.                      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Material(indexOfRefraction, abbeNumber) {

	// set attributes
	//
	this.indexOfRefraction = indexOfRefraction;
	this.abbeNumber = abbeNumber;
	this.color = Material.getDefaultColor(indexOfRefraction);

	return this;
}

_.extend(Material.prototype, {

	//
	// methods to estimate index of refraction at different wavelengths
	//

	getIndexOfRefractionD: function(wavelength) {
		return getIndexOfRefractionD(wavelength, this.indexOfRefraction, this.abbeNumber);
	},

	getIndexOfRefractionE: function(wavelength) {
		return getIndexOfRefractionD(wavelength, this.indexOfRefraction, this.abbeNumber);
	},
});

//
// static methods
//

_.extend(Material, {
	getDefaultColor: function(indexOfRefraction) {
		/*
		var lowIndex = 1.5;
		var highIndex = 1.75;
		var lowIndexColor = "rgb(240,255,255)";
		var highIndexColor = "rgb(192,220,255)";
		*/

		var lowIndex = 1.5;
		var lowIndexColor = "rgb(63,191,191)";
		var highIndex = 1.75;
		var highIndexColor = "rgb(0,127,255)";

		// blend low to high index glass colors
		//
		var index = Math.clamp(indexOfRefraction, lowIndex, highIndex);
		var factor = (index - lowIndex) / (highIndex - lowIndex);
		return blendRGBColors(lowIndexColor, highIndexColor, factor);
	}
});
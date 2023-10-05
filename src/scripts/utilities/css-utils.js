/******************************************************************************\
|                                                                              |
|                                    css-utils.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a set of utilities for handling cascading style sheets.       |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

function getCSS(property, className) {

	// create temporary element
	//
	var $inspector = $("<div>").css('display', 'none').addClass(className);

	// add to DOM, in order to read the CSS property
	//
	$("body").append($inspector);

	// read css value
	//
	try {
		return $inspector.css(property);
	} finally {

		// remove from DOM
		//
		$inspector.remove(); 
	}
}

function parseCSSTransforms (string) {
	var transforms = {};
	for (var i in string = string.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
		var parameters = string[i].match(/[\w\.\-]+/g);

		// first parameter is transform
		//
		var index = parameters.shift();

		// convert parameters to numbers
		//
		for (var j = 0; j < parameters.length; j++) {
			parameters[j] = parseFloat(parameters[j]);
		}
	}
	return transforms;
}
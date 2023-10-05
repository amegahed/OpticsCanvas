/******************************************************************************\
|                                                                              |
|                                    path.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a linear path of 2D points.                 |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Path(options) {

	// extend array type
	//
	var array = [];
	array.push.apply(array, arguments);
	array.__proto__ = Path.prototype;
	
	return array;
}

// extend prototype from "superclass"
//
Path.prototype = _.extend(new Array(), {

	//
	// methods
	//

	start: function() {
		return this[0];
	},

	finish: function() {
		return this[this.length - 1];
	}
});

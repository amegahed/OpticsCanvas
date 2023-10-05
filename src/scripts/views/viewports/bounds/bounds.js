/******************************************************************************\
|                                                                              |
|                                    bounds.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a one dimensional set of bounds.                         |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Bounds(min, max) {

	// set attributes
	//
	this.min = min;
	this.max = max;

	return this;
}

_.extend(Bounds.prototype, {

	//
	// setting methods
	//

	extend: function(value) {
		if (!this.min || value < this.min) {
			this.min = value;
		}
		if (!this.max || value > this.max) {
			this.max = value;
		}
	},

	//
	// querying methods
	//

	mean: function() {
		return (this.min + this.max) / 2;
	},

	size: function() {
		return this.max - this.min;
	},

	contains: function(value) {
		return (value >= this.min && value <= this.max);
	},

	overlaps: function(bounds) {
		return this.contains(bounds.min) || this.contains(bounds.max) || 
			bounds.contains(this.max) || bounds.contains(this.min);
	}
});
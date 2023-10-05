/******************************************************************************\
|                                                                              |
|                                    bounds2.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines two dimensional set of bounds.                           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Bounds2(x, y) {

	// set attributes
	//
	this.x = x;
	this.y = y;

	return this;
}

_.extend(Bounds2.prototype, {

	//
	// setting methods
	//

	extend: function(value) {
		this.x.extend(value.x);
		this.y.extend(value.y);
	},

	//
	// querying methods
	//

	center: function() {
		return new Vector2(this.x.mean(), this.y.mean());
	},

	size: function() {
		return new Vector2(this.x.size(), this.y.size());
	},

	contains: function(value) {
		return this.x.contains(value) && this.y.contains(value);
	},

	overlaps: function(bounds) {
		return this.x.overlaps(bounds) && this.y.overlaps(bounds);
	}
});
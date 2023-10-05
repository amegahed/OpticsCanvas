/******************************************************************************\
|                                                                              |
|                                  vector2.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a two dimensional vector type and its operations.        |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Vector2(x, y) {

	// set attributes
	//
	this.x = x;
	this.y = y;
	
	return this;
}

_.extend(Vector2.prototype, {

	//
	// methods
	//

	equals: function(vector) {
		return (vector && (this.x == vector.x) && (this.y == vector.y));
	},

	clone: function() {
		return new Vector2(this.x, this.y);
	},

	toString: function(separator, precision) {
		
		// set optional parameter defaults
		//
		if (!separator) {
			separator = Vector2.separator;
		}
		if (!precision) {
			precision = Vector2.precision;
		}

		// convert to string
		//
		return this.x.toPrecision(precision) + separator + this.y.toPrecision(precision);
	},

	//
	// vector arithmetic methods
	//

	add: function(vector) {
		this.x = this.x + vector.x;
		this.y = this.y + vector.y;
	},

	subtract: function(vector) {
		this.x = this.x - vector.x;
		this.y = this.y - vector.y;
	},

	multiplyBy: function(vector) {
		this.x = this.x * vector.x;
		this.y = this.y * vector.y;
	},

	divideBy: function(vector) {
		this.x = this.x / vector.x;
		this.y = this.y / vector.y;
	},

	scaleBy: function(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	},

	normalize: function() {
		this.scaleBy(1 / this.length());
	},

	//
	// vector function methods
	//

	plus: function(vector) {
		var x = this.x + vector.x;
		var y = this.y + vector.y;
		return new Vector2(x, y);
	},

	minus: function(vector) {
		var x = this.x - vector.x;
		var y = this.y - vector.y;
		return new Vector2(x, y);
	},

	times: function(vector) {
		var x = this.x * vector.x;
		var y = this.y * vector.y;
		return new Vector2(x, y);
	},

	dividedBy: function(vector) {
		var x = this.x / vector.x;
		var y = this.y / vector.y;
		return new Vector2(x, y);
	},

	scaledBy: function(scalar) {
		var x = this.x * scalar;
		var y = this.y * scalar;
		return new Vector2(x, y);
	},

	normalized: function() {
		return this.scaledBy(1 / this.length());
	},

	parallel: function(vector) {
		return vector.scaledBy(this.dot(vector) / vector.dot(vector));
	},

	perpendicular: function(vector) {
		return this.minus(this.parallel(vector));
	},

	toPerpendicular: function() {
		return new Vector2(-this.y, this.x);
	},

	//
	// operators
	// 

	dot: function(vector) {
		return (this.x * vector.x) + (this.y * vector.y);
	},

	determinant: function(vector) {
		return (this.x * vector.y) - (vector.x * this.y);
	},

	length: function() {
		return Math.sqrt(this.dot(this));
	},

	//
	// rotation methods
	//

	rotateBy: function(angle) {
		var x = this.x * Math.cos(angle * Math.PI/180) - this.y * Math.sin(angle * Math.PI/180);
		var y = this.x * Math.sin(angle * Math.PI/180) + this.y * Math.cos(angle * Math.PI/180);
		this.x = x;
		this.y = y;
	},

	rotatedBy: function(angle) {
		var x = this.x * Math.cos(angle * Math.PI/180) - this.y * Math.sin(angle * Math.PI/180);
		var y = this.x * Math.sin(angle * Math.PI/180) + this.y * Math.cos(angle * Math.PI/180);
		return new Vector2(x, y);
	},

	//
	// conversion methods
	//

	toArray: function() {
		return [this.x, this.y];
	}
});

//
// "class" or "static" members
//

Vector2.precision = 3;
Vector2.separator = ", ";
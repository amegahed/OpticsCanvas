/******************************************************************************\
|                                                                              |
|                                    beam.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a beam (composed of an array of paths).     |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Beam() {

	// extend array type
	//
	var array = [];
	array.push.apply(array, arguments);
	array.__proto__ = Beam.prototype;
	
	return array;
}

// extend prototype from "superclass"
//
Beam.prototype = _.extend(new Array(), {

	//
	// querying methods
	//

	getObstructed: function() {
		return this.filter(function (element) {
			return element.obstructed
		});
	},

	getUnobstructed: function() {
		return this.filter(function (element) {
			return !element.obstructed;
		});
	},

	//
	// methods
	//

	extend: function(rays, t) {
		for (var i = 0; i < this.length; i++) {
			if (rays[i]) {
				this[i].push(rays[i].location.plus(rays[i].direction.scaledBy(t)));
			}
		}
	},

	focus: function(rays) {
		var self = this;

		function next(i) {

			// get next unobstructed ray
			//
			while (!self[i] || self[i].obstructed) {
				i++;
				if (i == self.length) {
					return null;
				}
			}
			return i;
		}

		function prev(i) {

			// get prev unobstructed ray
			//
			while (!self[i] || self[i].obstructed) {
				i--;
				if (i < 0) {
					return null;
				}
			}
			return i;
		}

		// find focus of rays
		//
		if (rays.length > 1) {
			var min = 0;
			var max = rays.length - 1;
			var lastT = undefined;
			while (min < max) {
				min = next(min);
				max = prev(max);
				if ((min != null) && (max != null) && (min < max) && rays[min] && rays[max]) {

					// find intersections of min and max
					//
					var ray1 = rays[min];
					var ray2 = rays[max];
					ray1.location = this[min][this[min].length - 1];
					ray2.location = this[max][this[max].length - 1];
					var t1 = ray1.intersect(ray2);
					if (t1 != infinity) {
						if (t1 < 0) {

							// extend diverging rays
							//
							this[min].push(ray1.location.plus(ray1.direction.scaledBy(-t1)));
						} else {

							// find common focus
							//
							this[min].push(ray1.location.plus(ray1.direction.scaledBy(t1)));
						}
						lastT = t1;
					}
					var t2 = ray2.intersect(ray1);
					if (t2 != infinity) {
						if (t2 < 0) {

							// extend diverging rays
							//
							this[max].push(ray2.location.plus(ray2.direction.scaledBy(-t2)));
						} else {

							// find common focus
							//
							this[max].push(ray2.location.plus(ray2.direction.scaledBy(t2)));
						}
						lastT = t2;
					}
					min++;
					max--;

					// push last odd focus point
					//
					if (min == max && lastT && rays[min]) {
						var ray = rays[min];
						ray.location = this[min][this[min].length - 1];
						this[min].push(ray.location.plus(ray.direction.scaledBy(Math.abs(lastT))));
					}
				}
			}
		}
	}
});

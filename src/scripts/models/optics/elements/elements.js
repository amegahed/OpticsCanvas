/******************************************************************************\
|                                                                              |
|                                  elements.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a collection of optical elements.           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Elements(options) {

	// extend array type
	//
	var array = [];
	array.push.apply(array, arguments);
	array.__proto__ = Elements.prototype;
	
	return array;
}

Elements.prototype = _.extend(new Array(), {

	//
	// querying methods
	//

	getAperture: function() {
		return this[0].surface1.radius * 2;
	},

	getLength: function() {

		// compute length of elements
		//
		var length = 0;
		for (var i = 0; i < this.length; i++) {

			// get element length
			//
			length += this[i].thickness;

			// add element spacing
			//
			if (this[i].options.spacing) {
				length += this[i].options.spacing;
			}
		}

		return length;
	},

	getRadius: function() {
		var radius = 0;

		// find max element radius
		//
		var length = 0;
		for (var i = 0; i < this.length; i++) {
			if (this[i].radius > radius) {
				radius = this[i].radius;
			}
		}

		return radius;
	},

	nextElement: function(element) {
		var index = this.indexOf(element);
		return this[index + 1];
	},

	//
	// ray tracing methods
	//

	traceRay: function(ray, origin, path, normals, toElement, fromSurface, fromMaterial, wavelength) {
		
		// if tracing internal rays, then don't include source intersections
		//
		var inclusive = fromSurface == null;

		// find intersection
		//
		var t = toElement.intersect(ray, fromSurface, inclusive);

		if (t != infinity && !isNaN(t)) {
			var point = ray.location.plus(ray.direction.scaledBy(t));

			// find surface
			//
			var toSurface = toElement.nextSurface(fromSurface);
			if (toSurface) {
				var surface = toSurface;
				
				// entering material
				//
				var toMaterial = toElement.options.material;
			} else {
				var surface = fromSurface;

				// leaving material
				//
				var toMaterial = null;
				point.x -= toElement.thickness;
				origin.x += toElement.thickness;
			}

			var normal = surface.getNormal(point).normalized();

			// save info
			//
			if (toSurface) {

				// save point
				//
				if (path) {
					path.push(point.plus(origin));
				}

				// save normal
				//
				if (normals) {
					normals.push(normal);
				}	
			}

			// compute indices of refraction
			//
			var indexOfRefractionFrom = fromMaterial? fromMaterial.indexOfRefraction : 1;
			var indexOfRefractionTo = toMaterial? toMaterial.indexOfRefraction : 1;

			// estimate index of refraction at different wavelengths
			//
			if (wavelength && wavelength != spectralLines.sodium.D && fromMaterial) {
				indexOfRefractionFrom = fromMaterial.getIndexOfRefraction(wavelength);
			}
			if (wavelength && wavelength != spectralLines.sodium.D && toMaterial) {
				indexOfRefractionTo = toMaterial.getIndexOfRefraction(wavelength);
			}

			// refract ray
			//			
			ray.direction = refract(ray.direction, normal, indexOfRefractionFrom, indexOfRefractionTo).normalized();

			// advance context
			//
			ray.location = point;
			
			// go to next element
			// 
			if (!toMaterial) {
				ray.location.x -= toElement.options.spacing;
				origin.x += toElement.options.spacing;
				toElement = this.nextElement(toElement);
				surface = null;
			}

			// trace refracted ray
			//
			if (toElement) {

				// trace next element
				//
				material = toElement.options.material;
				return this.traceRay(ray, origin, path, normals, toElement, surface, toMaterial, wavelength);
			} else {

				// no more elements
				//
				return ray;
			}
		} else {

			// ray misses element
			//
			path.obstructed = true;
			return null;
		}
	},

	traceRays: function(rays, paths, normals) {
		var self = this;

		// trace rays through elements
		//
		for (var i = 0; i < rays.length; i++) {
			paths[i] = new Path(rays[i].location);
			if (normals) {
				normals[i] = [];
			}
			rays[i] = this.traceRay(rays[i], new Vector2(0, 0), paths[i], normals? normals[i] : null, this[0]);
		}

		return rays;
	}
});

/******************************************************************************\
|                                                                              |
|                                    optics.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a number of optics related utility functions.            |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function reflect(direction, normal) {

	// In reflection, the component of the light ray parallel to the normal
	// reverses direction while the perpendicular component remains unchanged.
	//
	return direction.plus(direction.parallel(normal).scaledBy(-2));
}

function refract(direction, normal, indexOfRefractionFrom, indexOfRefractionTo) {
	direction.normalize();

	// component of ray perpendicular to surface
	//
	perpendicularLength = direction.dot(normal);
	perpendicular = normal.scaledBy(perpendicularLength);
	perpendicularLength = Math.abs(perpendicularLength);

	// component of ray parallel to surface
	//
	parallel = direction.minus(perpendicular);
	parallelLength = parallel.length();

	// if ray is not parallel to surface
	//
	if (parallelLength != 0) {
		var ratio = indexOfRefractionFrom / indexOfRefractionTo;
		var refraction = parallelLength * ratio;
		if (refraction >= 1) {

			// total internal reflection
			//
			direction = reflect(direction, normal);
		} else {

			// compute refraction
			//
			direction = perpendicular.plus(parallel.scaledBy(refraction *
				(perpendicularLength / parallelLength) / Math.sqrt(1 - refraction * refraction)));
		}
	}

	return direction;
}

//
// methods to estimate index of refraction at different wavelengths
//

function getIndexOfRefractionD(wavelength, indexOfRefraction, abbeNumber) {
	return (wavelength - spectralLines.sodium.D) * (indexOfRefraction - 1) / abbeNumber / 
		(spectalLines.cadmium.F1 - spectralLines.cadmium.C1);
}

function getIndexOfRefractionE(wavelength, indexOfRefraction, abbeNumber) {
	return (wavelength - spectralLines.mercury.e) * (indexOfRefraction - 1) / abbeNumber / 
		(spectalLines.cadmium.F1 - spectralLines.cadmium.C1);
}







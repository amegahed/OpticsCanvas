/******************************************************************************\
|                                                                              |
|                                    lens-types.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var lensTypes = new Optics(new Elements(

	// convex lens, equal radii
	//
	new Lens(
		new Spherical(50, 50), 10,
		new Spherical(-200, 50), {
			spacing: 10
		}
	),

	// convex lens, equal radii
	//
	new Lens(
		new Spherical(-200, 50), 10,
		new Spherical(50, 50), {
			spacing: 10
		}
	),
	
	// convex lens, differing radii
	//
	new Lens(
		new Spherical(50, 50), 10,
		new Spherical(25, 25), {
			spacing: 10
		}
	),

	// reverse convex lens, differing radii
	//
	new Lens(
		new Spherical(-25, 25), 10,
		new Spherical(-50, 50), {
			spacing: 10
		}
	),

	// concave lens, differing radii
	//
	new Lens(
		new Spherical(-50, 50), 10,
		new Spherical(25, 25), {
			spacing: 10
		}
	),

	// reverse concave lens, differing radii
	//
	new Lens(
		new Spherical(-25, 25), 10,
		new Spherical(50, 50)
	)
), {
	//aperture: 40
});
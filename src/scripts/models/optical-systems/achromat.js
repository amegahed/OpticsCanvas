/******************************************************************************\
|                                                                              |
|                                    achromat.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var achromat = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(50, 50), 15,
		new Spherical(-50, 50), {
			material: materials.glass.crown
		}
	),

	// L2
	//
	new Lens(
		new Spherical(-50, 50), 1,
		new Spherical(500, 50), {
			material: materials.glass.flint
		}
	)
), {
	//aperture: 40
});
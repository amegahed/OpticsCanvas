/******************************************************************************\
|                                                                              |
|                                    sphere.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var sphere = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(25, 50), 50,
		new Spherical(-25, 50), {
			material: materials.water
		}
	)
), {
	aperture: 40
});
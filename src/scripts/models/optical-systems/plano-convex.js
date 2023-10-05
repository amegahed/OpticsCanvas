/******************************************************************************\
|                                                                              |
|                                  plano-convex.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var planoConvex = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(50, 50), 10,
		new Planar(50), {
			material: materials.glass.crown
		}
	)
), {
	// aperture: 40
});
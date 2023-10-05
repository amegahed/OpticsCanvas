/******************************************************************************\
|                                                                              |
|                                 convex-diamond.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var convexDiamond = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(100, 50), 10,
		new Spherical(-100, 50), {
			material: materials.diamond
		}
	)
), {
	//aperture: 40
});
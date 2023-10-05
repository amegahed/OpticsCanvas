/******************************************************************************\
|                                                                              |
|                                   biconcave.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var biconcave = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(-75, 50), 10,
		new Spherical(75, 50)
	)
), {
	//aperture: 40
});
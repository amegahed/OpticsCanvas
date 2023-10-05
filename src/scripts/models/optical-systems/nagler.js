/******************************************************************************\
|                                                                              |
|                                     nagler.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var nagler = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(-18.56, 8.24 * 2), 1.65,
		new Spherical(44.30, 8.24 * 2), {
			material: materials.glass.Schott.SF5
		}
	),

	// L2
	//
	new Lens(
		new Spherical(44.30, 12.36 * 2), 7.83,
		new Spherical(-18.56, 12.36 * 2), {
			material: materials.glass.Schott.SK16,
			spacing: 0.41
		}
	),

	// L3
	//
	new Lens(
		new Spherical(1000, 15.66 * 2), 4.53,
		new Spherical(-44.30, 15.66 * 2), {
			material: materials.glass.Schott.SK16
		}
	),

	// L4
	//
	new Lens(
		new Spherical(82.40, 17.30 * 2), 14.01,
		new Spherical(-20.59, 17.30 * 2), {
			material: materials.glass.Schott.SK16
		}
	),

	// L5
	//
	new Lens(
		new Spherical(-20.59, 17.30 * 2), 2.47,
		new Spherical(-82.40, 19.77 * 2), {
			material: materials.glass.Schott.SF1,
			bevelled: false,
			spacing: 0.41
		}
	),

	// L6
	//
	new Lens(
		new Spherical(40.14, 19.77 * 2), 9.06,
		new Spherical(-82.40, 19.77 * 2), {
			material: materials.glass.Schott.SK16,
			spacing: 36.26
		}
	),

	// L7
	//
	new Lens(
		new Spherical(-20.59, 9.89 * 2), 2.06,
		new Spherical(15.57, 9.89 * 2), {
			material1: materials.glass.Schott.LAK8
		}
	),

	// L8
	//
	new Lens(
		new Spherical(15.57, 9.89 * 2), 4.94,
		new Spherical(168.59, 9.89 * 2), {
			material2: materials.glass.Schott.SF1	
		}
	)
), {
	//aperture: 40
});
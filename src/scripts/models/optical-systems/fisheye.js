/******************************************************************************\
|                                                                              |
|                                    fisheye.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var fisheye = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(85.00, 50), 2.040,
		new Spherical(16.45, 30), {
			material: materials.glass.Hikari.E.SK16,
			spacing: 8.320
		}
	),

	// L2
	//
	new Lens(
		new Spherical(61.18, 30), 1.700,
		new Spherical(20.15, 25), {
			material: materials.glass.Hikari.E.LASF09,
			bevelled: false,
			spacing: 10.316			
		}
	),

	// L3
	//
	new Lens(
		new Spherical(-204.00, 20), 3.430,
		new Spherical(-31.26, 20), {
			material: materials.glass.Hikari.E.LAF02,
			spacing: 0.250			
		}
	),

	// L4
	//
	new Lens(
		new Spherical(-27.00, 20), 2.780,
		new Spherical(11.48, 16), {
			material: materials.glass.Hikari.E.SF10,
			bevelled: false	
		}
	),

	// L5
	//
	new Lens(
		new Spherical(11.48, 16), 4.930,
		new Spherical(-55.84, 16), {
			material: materials.glass.Hikari.E.SF10,
			bevelled: false,
			spacing: 5.865		
		}
	),

	// L6
	//
	new Lens(
		new Spherical(59.67, 13), 2.570,
		new Spherical(-14.20, 13), {
			material: materials.glass.Hikari.E.KF6,
			bevelled: false	
		}
	),

	// L7
	//
	new Lens(
		new Spherical(-14.20, 13), 1.410,
		new Spherical(-76, 15), {
			material: materials.glass.Hikari.E.LASF05,
			bevelled: false,
			spacing: 3.660
		}
	),

	// L8
	//
	new Lens(
		new Spherical(-1732.00, 17), 1.490,
		new Spherical(29.90, 17), {
			material: materials.glass.Hikari.E.SF03,
			bevelled: false		
		}
	),

	// L9
	//
	new Lens(
		new Spherical(29.90, 17), 4.020,
		new Spherical(-21.55, 17), {
			material: materials.glass.Hikari.E.FK01,
			bevelled: false,
			spacing: 0.190	
		}
	),

	// L10
	//
	new Lens(
		new Spherical(44.74, 20), 3.210,
		new Spherical(-44.74, 20), {
			material: materials.glass.Hikari.E.LAK7,
			bevelled: false,
			spacing: 4.020		
		}
	)
), {
	//aperture: 40
});
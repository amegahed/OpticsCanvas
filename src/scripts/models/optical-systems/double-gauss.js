/******************************************************************************\
|                                                                              |
|                                  double-gauss.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a particular type of optical system.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/

var doubleGauss = new Optics(new Elements(

	// L1
	//
	new Lens(
		new Spherical(110.000, 80), 10,
		new Spherical(588.748, 80), {
			material: new Material(1.80416, 46.6),
			spacing: 0.20						
		}
	),

	// L2
	//
	new Lens(
		new Spherical(51.600, 75), 14.50,
		new Spherical(100.426, 75), {
			material: new Material(1.79446, 45.4),
			spacing: 3.50
		}
	),
	
	// L3
	//
	new Lens(
		new Spherical(119.00, 65), 3.00,
		new Spherical(32.792, 52), {
			material: new Material(1.71736, 29.5),
			spacing: 32.50
		}
	),

	// L4
	//
	new Lens(
		new Spherical(-36.500, 52), 2.00,
		new Spherical(131.500, 65), {
			material: new Material(1.68893, 31.1)
		}
	),

	// L5
	//
	new Lens(
		new Spherical(131.500, 65), 20.00,
		new Spherical(-56.806, 65), {
			material: new Material(1.77252, 49.6),
			spacing: 0.20
		}
	),

	// L6
	//
	new Lens(
		new Spherical(-160.500, 65), 8.50,
		new Spherical(-74.352, 65), {
			material: new Material(1.77252, 49.6),
			spacing: 0.20
		}
	),

	// L7
	//
	new Lens(
		new Spherical(122.000, 65), 9.50,
		new Spherical(2092.573, 65), {
			material: new Material(1.77252, 49.6)
		}
	)
), {
	// aperture: 60
});
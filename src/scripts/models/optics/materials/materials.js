/******************************************************************************\
|                                                                              |
|                                   materials.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a small library of standard materials.                        |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


materials = {
	glass: {

		// common glass types
		//
		crown: new Material(1.52, 75),
		flint: new Material(1.65, 50),

		// Schott glass types
		//
		Schott: {
			BK7: new Material(1.5168, 64.17),
			BAF10: new Material(1.6700, 47.11),
			BAK1: new Material(1.5725, 57.55),
			FK51A: new Material(1.4866, 84.47),
			LASF9: new Material(1.8502, 32.17),
			SF5: new Material(1.6727, 32.25),
			SF10: new Material(1.7283, 28.53),
			SF11: new Material(1.7847, 25.68),
			SK16: new Material(1.6204, 60.3),
			SF1: new Material(1.7174, 29.5),
			LAF2: new Material(1.7440, 44.9),
			FK5: new Material(1.4875, 70.4),
			LAK8: new Material(1.7130, 53.8)
		},
	},

	water: new Material(1.3330, 56),
	air: new Material(1.00028, 89.30),
	fluorite: new Material(1.433, 95),
	sapphire: new Material(1.77, 72.2),
	diamond: new Material(2.417, 55)
}
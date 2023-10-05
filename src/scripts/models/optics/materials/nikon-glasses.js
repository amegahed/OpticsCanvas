/******************************************************************************\
|                                                                              |
|                                nikon-glasses.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a library of Nikon / Hikari's standard glass types.           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


materials.glass.Hikari = {
	E: {

		// Borosilicate
		//
		BK7: new Material(1.5168, 64.11),

		// Flourite crown
		//
		FK5: new Material(1.4875, 70.41),
		FK01: new Material(1.4970, 81.61),
		FKH1: new Material(1.4978, 82.51),
		FKH2: new Material(1.4560, 91.32),

		// Phosphate crown
		//
		PKH1: new Material(1.5186, 69.97),
		PSK02: new Material(1.6180, 63.37),

		// Crown
		//
		K3: new Material(1.5182, 58.93),
		K5: new Material(1.5225, 59.73),
		KF6: new Material(1.51742, 52.42),

		// Barium crown
		//
		BAK1: new Material(1.5725, 57.74),
		BAK2: new Material(1.5400, 59.45),
		BAK4: new Material(1.5688, 56.34),

		// Barium light flint
		//
		BALFL4: new Material(1.5796, 53.71),

		// Dense crown
		//
		SK2: new Material(1.6074, 56.75),
		SK4: new Material(1.6127, 58.73),
		SK5: new Material(1.5891, 61.16),
		SK10: new Material(1.6228, 57.03),
		SK11: new Material(1.5638, 60.68),
		SK12: new Material(1.5831, 59.39),
		SK14: new Material(1.6031, 60.67),
		SK15: new Material(1.6230, 58.22),
		SK16: new Material(1.6204, 60.29),
		SK18: new Material(1.6385, 55.48),

		// Very dense flint
		//
		SSK1: new Material(1.6172, 54.01),
		SSK5: new Material(1.6584, 50.89),
		SSK8: new Material(1.6177, 49.78),

		// Lanthanum crown
		//
		LAK7: new Material(1.6516, 58.54),
		LAK8: new Material(1.7130, 53.87),
		LAK9: new Material(1.6910, 54.81),
		LAK10: new Material(1.7200, 50.23),
		LAK12: new Material(1.6779, 55.40),
		LAK13: new Material(1.6935, 53.20),
		LAK14: new Material(1.6968, 55.52),
		LAK18: new Material(1.7292, 54.66),
		LAK01: new Material(1.6400, 60.09),
		LAK02: new Material(1.6700, 57.34),
		LAK04: new Material(1.6510, 56.17),
		LAK06: new Material(1.6779, 50.71),
		LAK09: new Material(1.7340, 51.48),
		LAK011: new Material(1.7410, 52.67),
		LAKH1: new Material(1.7481, 52.30),
		LASKH2: new Material(1.7550, 52.31),

		// Very light flint
		//
		LLF1: new Material(1.5481, 45.79),
		LLF2: new Material(1.5407, 47.22),
		LLF6: new Material(1.5317, 48.86),

		// Barium flint
		//
		BAF3: new Material(1.5827, 46.48),
		BAF4: new Material(1.6056, 43.77),
		BAF8: new Material(1.6237, 47.04),
		BAF10: new Material(1.6700, 47.24),
		BAF11: new Material(1.6667, 48.31),
		BAF12: new Material(1.6393, 44.88),

		// Light flint
		//
		LF5: new Material(1.5814, 40.74),
		LF6: new Material(1.5673, 42.70),
		LF7: new Material(1.5750, 41.48),

		// Flint
		//
		F1: new Material(1.6259, 35.65),
		F2: new Material(1.6200, 36.26),
		F3: new Material(1.6129, 37.00),
		F5: new Material(1.6034, 38.01),
		F8: new Material(1.5955, 39.22),
		F16: new Material(1.5927, 35.30),

		// Barium dense flint
		//
		BASF2: new Material(1.6645, 35.91),
		BASF6: new Material(1.6675, 41.96),
		BASF7: new Material(1.7015, 41.17),
		BASF8: new Material(1.7234, 37.95),

		// Lanthanum flint
		//
		LAF2: new Material(1.7440, 44.79),
		LAF3: new Material(1.7170, 47.93),
		LAF7: new Material(1.7495, 35.28),
		LAF11: new Material(1.7569, 31.59),
		LAF01: new Material(1.7000, 48.08),
		LAF02: new Material(1.7200, 43.68),
		LAF04: new Material(1.7570, 47.83),
		LAF05: new Material(1.7620, 40.11),
		LAF09: new Material(1.6970, 48.53),
		LAF010: new Material(1.7432, 49.31),
		LAF016: new Material(1.8010, 34.96),
		LAFH2: new Material(1.8038, 33.89),
		LAFH3: new Material(1.7950, 28.69),

		// Lanthanum dense flint
		//
		LASF01: new Material(1.7859, 44.17),
		LASF02: new Material(1.7995, 42.24),
		LASF03: new Material(1.8061, 40.94),
		LASF04: new Material(1.8155, 44.34),
		LASF05: new Material(1.8348, 42.72),
		LASF08: new Material(1.8830, 40.76),
		LASF09: new Material(1.8160, 46.62),
		LASF010: new Material(1.8340, 37.16),
		LASF013: new Material(1.8044, 39.58),
		LASF014: new Material(1.7880, 47.38),
		LASF015: new Material(1.8040, 46.58),
		LASF016: new Material(1.7725, 49.61),
		LASF017: new Material(1.7950, 45.29),
		LASF021: new Material(1.8503, 32.35),
		LASFH2: new Material(1.7668, 46.80),
		LASFH6: new Material(1.8061, 33.26),
		LASFH9: new Material(1.9026, 35.70),
		LASFH13: new Material(1.9037, 31.27),
		LASFH17: new Material(2.0007, 25.45),

		// Dense flint
		//
		SF1: new Material(1.7174, 29.52),
		SF2: new Material(1.6477, 33.80),
		SF4: new Material(1.7552, 27.51),
		SF5: new Material(1.6727, 32.11),
		SF6: new Material(1.8052, 25.43),
		SF7: new Material(1.6398, 34.56),
		SF8: new Material(1.6889, 31.07),
		SF10: new Material(1.7282, 28.46),
		SF11: new Material(1.7847, 25.68),
		SF13: new Material(1.7408, 27.78),
		SF14: new Material(1.7618, 26.56),
		SF15: new Material(1.6989, 30.13),
		SF03: new Material(1.8467, 23.78),
		SFH1: new Material(1.8081, 22.79),
		SFH2: new Material(1.8607, 23.06),
		SFS3: new Material(1.7847, 26.29),
		SSFH1: new Material(1.9229, 20.51),

		// Special short flint
		//
		KZFH1: new Material(1.6127, 44.46)
	}
}
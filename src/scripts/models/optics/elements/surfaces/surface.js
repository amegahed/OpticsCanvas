/******************************************************************************\
|                                                                              |
|                                   surface.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the abstract class definition of a lens surface.              |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function Surface(diameter, thickness) {

	// set attributes
	//
	this.radius = diameter / 2;
	this.thickness = thickness;

	return this;
}

// static members
//
Surface.epsilon = 0.000001;
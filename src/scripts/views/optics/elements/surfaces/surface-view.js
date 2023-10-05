/******************************************************************************\
|                                                                              |
|                                  surface-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is an abstract base class for viewing optical surfaces.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function SurfaceView(model, options) {

	// drawing options
	//
	if (options) {
		if (!options.strokeStyle && options.material) {
			options.strokeStyle = options.material.color;
		}
	}

	// set attributes
	//
	this.model = model;
	this.options = options;

	return this;
}

// extend prototype from "superclass"
//
SurfaceView.prototype = _.extend(Object.create(Object.prototype), {

	//
	// canvas drawing methods
	//

	stroke: function(context, callback) {

		// set drawing style
		//
		if (this.options) {
			context.strokeStyle = this.options.strokeStyle;
		}

		// draw surface
		//
		context.beginPath();
		this.draw(context, this.options);
		context.closePath();

		// draw outline
		//
		context.stroke();
	},
	
	//
	// svg rendering methods
	//

	render: function() {
		return this.toPath();
	}, 
});

//
// static methods
//

_.extend(SurfaceView, {
	create: function(model, options) {
		switch (model.__proto__) {
			case Planar.prototype:
				return new PlanarView(model, options);
				break;
			case Spherical.prototype:
				return new SphericalView(model, options);
				break;
		}
	}
});
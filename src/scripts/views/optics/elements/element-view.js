/******************************************************************************\
|                                                                              |
|                                  element-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is an abstract base class for viewing optical elements.          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function ElementView(model, options) {

	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}

	// drawing options
	//
	if (!options.strokeStyle && model.options.material) {
		options.strokeStyle = model.options.material.color;
	}
	if (!options.fillStyle && model.options.material) {
		options.fillStyle = model.options.material.color;
	}

	// set optional parameter defaults
	//
	if (!options.opacity) {
		options.opacity = 0.25;
	}

	// set attributes
	//
	this.model = model;
	this.options = options;

	return this;
}

// extend prototype from "superclass"
//
ElementView.prototype = _.extend(Object.create(Object.prototype), {

	//
	// querying methods
	//

	getHighlightGradient: function(context) {
		var radius = this.model.getRadius();
		var gradient = context.createLinearGradient(0, -radius, 0, radius);

		/*
		gradient.addColorStop(0, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.25, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.33, "rgba(255,255,255,1.0)");
		gradient.addColorStop(0.50, "rgba(255,255,255,0.0)");
		gradient.addColorStop(1, "rgba(0,0,0,0.125)");
		*/

		gradient.addColorStop(0, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.1, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.25, "rgba(255,255,255,0.75)");
		gradient.addColorStop(0.3, "rgba(255,255,255,1.0)");
		gradient.addColorStop(0.4, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.5, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.6, "rgba(255,255,255,0.0)");
		gradient.addColorStop(0.7, "rgba(255,255,255,0.5)");
		gradient.addColorStop(0.8, "rgba(255,255,255,0.0)");
		gradient.addColorStop(1, "rgba(0,0,0,0.125)");
		return gradient;
	},

	//
	// canvas drawing methods
	//

	drawMarker: function(context, options) {
		context.beginPath();
		context.moveTo(0, -options.markerSize);
		context.lineTo(0, options.markerSize);
		context.moveTo(-options.markerSize, 0);
		context.lineTo(options.markerSize, 0);
		context.arc(0, 0, options.markerSize / 2, 0, Math.PI * 2);
		context.stroke();
	},

	shade: function(context, options) {

		// set drawing style
		//
		if (this.options.strokeStyle) {
			context.strokeStyle = this.options.strokeStyle;
		}

		// draw lens surfaces
		//
		context.beginPath();
		this.draw(context);
		context.closePath();

		// draw semi-transparent surface
		//
		if (this.options.fillStyle) {
			context.fillStyle = this.options.fillStyle;
		}
		if (this.options.opacity) {
			context.globalAlpha = this.options.opacity;
		}
		context.globalCompositeOperation = "multiply";
		context.fill();
		context.globalCompositeOperation = "source-over";

		// add highlight
		//
		context.globalAlpha = 1.0;
		context.fillStyle = this.getHighlightGradient(context);
		context.fill();

		// draw outline
		//
		context.stroke();

		// draw marker
		//
		if (options && options.showMarker) {
			this.drawMarker(options);
		}
	}
});
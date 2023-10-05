/******************************************************************************\
|                                                                              |
|                           mouse-wheel-zoom-behavior.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function MouseWheelZoomBehavior(viewport) {
	var self = this;

	// set attributes
	//
	this.viewport = viewport;

	// call "superclass" constructor
	//
	MouseWheelBehavior.call(this, viewport.element, function(deltaY) {

		// zoom based upon direction of wheel movement
		//
		if (deltaY > 0) {
			self.onZoom(MouseWheelZoomBehavior.zoomFactor);
		} else {
			self.onZoom(1 / MouseWheelZoomBehavior.zoomFactor);
		}
	});

	return this;
}

// extend prototype from "superclass"
//
MouseWheelZoomBehavior.prototype = _.extend(Object.create(MouseWheelBehavior.prototype), {

	//
	// event handling methods
	//

	onZoom: function(zoom) {
		var scale = this.viewport.scale * zoom;

		// check bounds on scale
		//
		if (scale > MouseWheelZoomBehavior.minScale && scale < MouseWheelZoomBehavior.maxScale) {
			this.viewport.setScale(scale);
		}
	}
});

//
// static attributes
//

_.extend(MouseWheelZoomBehavior, {
	zoomFactor: 1.05,
	minScale: 1.0e-3,
	maxScale: 1.0e3
});
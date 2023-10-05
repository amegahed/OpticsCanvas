/******************************************************************************\
|                                                                              |
|                               point-light-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a positional (point) light source.             |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function PointLightView(model) {

	// call "superclass" constructor
	//
	LightView.call(this, model);

	return this;
}

// extend prototype from "superclass"
//
PointLightView.prototype = _.extend(Object.create(LightView.prototype), {

	//
	// canvas drawing methods
	//

	draw: function(context, options) {
		context.save();

		// set icon attributes
		//
		context.font = '6px FontAwesome';
		context.textAlign = "center";
		context.textBaseline = "middle";

		// draw icon
		//
		if (options && options.scale) {
			var scale = options.scale;
			
			// scale icon
			//
			context.scale(1 / scale, 1 / scale);
			context.fillText(PointLightView.icon, this.model.location.x * scale, this.model.location.y * scale);
		} else {
			context.fillText(PointLightView.icon, this.model.location.x, this.model.location.y);
		}

		context.restore();
	},

	//
	// svg rendering methods
	//

	toText: function() {
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

		// set attributes
		//
		$(text).attr('class', 'draggable unscaled light icon');
		$(text).attr('x', this.model.location.x + 'mm');
		$(text).attr('y', this.model.location.y + 'mm');
		$(text).attr('text-anchor', 'middle');
		$(text).attr('dominant-baseline', 'middle');

		// set icon
		//
		$(text).html(PointLightView.icon);

		return text;
	}
});

//
// static attributes
//

_.extend(PointLightView, {
	icon: '\uF0eb'
});
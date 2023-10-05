/******************************************************************************\
|                                                                              |
|                                   light-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a directional (infinity) light source.         |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function LightView(model) {

	// set attributes
	//
	this.model = model;

	return this;
}

// extend prototype from "superclass"
//
LightView.prototype = _.extend(Object.create(Object.prototype), {

	//
	// svg rendering methods
	//

	render: function() {
		return this.toText();
	}
});

//
// static methods
//

_.extend(LightView, {
	create: function(model) {
		switch (model.__proto__) {
			case DistantLight.prototype:
				return new DistantLightView(model);
				break;
			case PointLight.prototype:
				return new PointLightView(model);
				break;
		}
	}
});
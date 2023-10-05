/******************************************************************************\
|                                                                              |
|                                elements-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a view of a collection of elements.         |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function ElementsView(elements, options) {

	// set attributes
	//
	this.collection = elements;

	// create subviews
	//
	this.regions = [];
	var x = 0;
	for (var i = 0; i < elements.length; i++) {
		var model = elements[i];
		var offset = model.surface1.isConcave()? model.surface1.thickness : 0;
		var width = model.getMaxThickness();

		// create new lens view
		//
		this.regions.push(new LensView(model, _.extend(options || {}, {
			'offset': x + width / 2 - offset
		})));

		x += model.thickness + model.options.spacing;
	}

	return this;
}

ElementsView.prototype = _.extend(new Array(), {

	//
	// canvas drawing methods
	//

	draw: function(context, options) {

		// center optics
		//
		context.save();

		// render elements
		//
		for (var i = 0; i < this.regions.length; i++) {
			var view = this.regions[i];

			// render element
			//
			view.draw(context, options);
			context.fill();
			context.stroke();

			// add thickness
			//
			context.translate(view.model.thickness, 0);

			// add spacing
			//
			if (view.model.options.spacing) {
				context.translate(view.model.options.spacing, 0);
			}
		}
		context.restore();
	},

	shade: function(context, options) {

		// center optics
		//
		context.save();

		// render elements
		//
		for (var i = 0; i < this.regions.length; i++) {
			var view = this.regions[i];

			// render element
			//
			view.shade(context, options);

			// add thickness
			//
			context.translate(view.model.thickness, 0);

			// add spacing
			//
			if (view.model.options.spacing) {
				context.translate(view.model.options.spacing, 0);
			}
		}
		context.restore();
	},

	//
	// svg rendering methods
	//

	toGroup: function() {
		var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		// set group attributes
		//
		$(group).attr('class', 'elements');

		// add elements
		//
		var x = 0;
		for (var i = 0; i < this.regions.length; i++) {
			$(group).append(this.regions[i].toSVG({
				'index': i,
				'id': 'lens' + i,
				'rel': 'tooltip',
				'title': 'L' + (i + 1)	
			}));
		}

		return group;
	},

	render: function() {
		return this.toGroup();
	}, 
});

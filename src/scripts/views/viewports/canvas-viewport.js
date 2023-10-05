/******************************************************************************\
|                                                                              |
|                                canvas-viewport.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a zoomable, panable drawing canvas.           |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function CanvasViewport(element, render, options) {
	var self = this;
	
	// set optional parameter defaults
	//
	if (!options) {
		options = {};
	}
	if (!options.offset) {
		options.offset = new Vector2(0, 0);
	}
	if (!options.scale) {
		options.scale = 1;
	}

	// set rendering attributes
	//
	this.element = element;
	this.render = render;
	this.width = $(element).width() * window.devicePixelRatio;
	this.height = $(element).height() * window.devicePixelRatio;
	this.context = this.element.getContext("2d");
	this.options = options;

	// set transformation attributes
	//
	this.offset = options.offset;
	this.scale = options.scale;
	this.bounds = this.getBounds();

	// set up resize callback
	//
	$(window).bind('resize', function() {
		self.width = $(self.element).width() * window.devicePixelRatio;
		self.height = $(self.element).height() * window.devicePixelRatio;
		self.onChange();
	});

	// initialize
	//
	if (this.options.grid) {

		// set grid attributes
		//
		this.options.grid.setBounds(this.bounds);
		if (this.options.grid.setPattern) {
			this.options.grid.setPattern(this.element, {
				'id': 'grid-pattern'
			});
		} else if (this.options.grid.setPatterns) {
			this.options.grid.setPatterns(this.element, {
				'id': 'grid-pattern'
			});
		}
	}

	// perform initial render
	//
	this.onChange();

	return this;
}

_.extend(CanvasViewport.prototype, {

	//
	// methods
	//

	setScale: function(scale) {
		this.scale = scale;

		// update grid
		//
		if (this.options.grid) {
			if (this.options.grid.setScale) {

				// update grid patterns
				//
				this.options.grid.setScale(this.element, this.scale);
			}
		}
		
		this.onChange();
	},

	setOffset: function(offset) {
		this.offset = offset;
		this.onChange();
	},

	//
	// private methods
	//

	setContext: function(context) {

		// set canvas size
		//
		this.element.width = this.width;
		this.element.height = this.height;

		// clear canvas
		//
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, this.width, this.height);

		// set origin to center of canvas
		//
		context.moveTo(0, 0);
		context.translate(this.width / 2, this.height / 2);

		// set drawing scale
		//
		context.scale(pixelsPerMillimeter * window.devicePixelRatio, 
			pixelsPerMillimeter * window.devicePixelRatio);

		// set zoom scale
		//
		context.scale(this.scale, this.scale);

		// set pan offset
		//
		context.translate(this.offset.x, this.offset.y);
	},

	getBounds: function() {
		var scale = 1 / window.devicePixelRatio / pixelsPerMillimeter / this.scale;
		return new Bounds2(
			new Bounds(-this.width / 2 * scale - this.offset.x,
			this.width / 2 * scale - this.offset.x),
			new Bounds(-this.height / 2 * scale - this.offset.y,
			this.height / 2 * scale - this.offset.y)
		);
	},

	//
	// event handling methods
	//

	onChange: function() {
		this.bounds = this.getBounds();
		this.setContext(this.context);

		// draw grid
		//
		if (this.options.grid) {
			this.options.grid.setBounds(this.bounds);
			this.options.grid.draw(this.context);
		}

		// render
		//
		this.render(this.context);
	}
});

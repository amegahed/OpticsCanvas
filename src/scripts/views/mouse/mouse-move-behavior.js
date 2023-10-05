/******************************************************************************\
|                                                                              |
|                               mouse-move-behavior.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function MouseMoveBehavior(element, callback) {
	var self = this;

	// set attributes
	//
	this.element = element;
	this.callback = callback;

	// set up event handler
	//
	$(this.element).mousemove(function(event) {
		self.onMouseMove(event.pageX, event.pageY);
	});

	return this;
}

_.extend(MouseMoveBehavior.prototype, {

	//
	// methods
	//

	unbind: function() {
		$(this.element).unbind('mousemove');
	},

	//
	// event handling methods
	//

	onMouseMove: function(mouseX, mouseY) {

		// perform callback
		//
		if (this.callback) {
			this.callback(mouseX, mouseY);
		}
	}
});
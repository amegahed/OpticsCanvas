/******************************************************************************\
|                                                                              |
|                              mouse-drag-behavior.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a definition of a viewport's mouse interaction behavior.      |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function MouseDragBehavior(element, callback, options) {
	var self = this;
	
	// set attributes
	//
	this.element = element;
	this.callback = callback;
	this.cursor = (options && typeof options.cursor != 'undefined')? options.cursor : undefined;
	this.button = (options && typeof options.button != 'undefined')? options.button : 1;

	// set up event handlers
	//
	$(element).on('mousedown.drag', function(event) {
		if (event.which == self.button) {
			self.onMouseDown(event.pageX, event.pageY);

			// end event handling
			//
			event.stopPropagation();
			event.preventDefault();

			// create mouse move callback
			//
			$(window).on('mousemove.drag', function(event) {

				// end event handling
				//
				event.stopPropagation();
				event.preventDefault();

				self.onMouseDrag(event.pageX, event.pageY);
			});

			// create mouse up callback
			//
			$(window).on('mouseup.drag', function(event) {

				// end event handling
				//
				event.stopPropagation();
				event.preventDefault();
				
				self.onMouseUp(event.pageX, event.pageY);

				// end behavior
				//
				$(window).off('mousemove.drag');
				$(window).off('mouseup.drag');
			});
		}
	});

	return this;
}

MouseDragBehavior.prototype = _.extend(Object.create(MouseDragBehavior.prototype), {

	//
	// methods
	//

	unbind: function() {
		$(this.element).off('mousedown');
	},

	//
	// event handling methods
	//

	onMouseDown: function(mouseX, mouseY) {

		// set start location
		//
		this.startX = mouseX;
		this.startY = mouseY;

		// set to drag cursor
		//
		if (this.cursor) {
			$(this.element).css('cursor', this.cursor);
		}
	},

	onMouseDrag: function(mouseX, mouseY) {

		// perform callback
		//
		if (this.callback) {
			this.callback(mouseX, mouseY);
		}
	},

	onMouseUp: function(mouseX, mouseY) {

		// reset start location
		//
		this.startX = undefined;
		this.startY = undefined;

		// reset cursor
		//
		if (this.cursor) {
			$(this.element).css('cursor', '');
		}
	},
});
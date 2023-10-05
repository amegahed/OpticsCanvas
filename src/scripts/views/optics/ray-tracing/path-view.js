/******************************************************************************\
|                                                                              |
|                                  path-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a view of a path (array of points).         |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function PathView(collection) {

	// set attributes
	//
	this.collection = collection;
	
	return this;
}

// extend prototype from "superclass"
//
PathView.prototype = _.extend(Object.create(Object.prototype), {

	//
	// canvas drawing methods
	//

	draw: function(context) {
		if (this.collection.length > 0) {
			context.beginPath();
			context.moveTo(this.collection[0].x, this.collection[0].y);
			for (var i = 1; i < this.collection.length; i++) {
				context.lineTo(this.collection[i].x, this.collection[i].y);
			}
			context.stroke();
		}
	},

	//
	// svg rendering methods
	//

	toDrawing: function() {
		if (this.collection.length > 0) {
			var d = 'M ' + (this.collection[0].x * pixelsPerMillimeter) + ' ' + (this.collection[0].y * pixelsPerMillimeter);
			for (var i = 1; i < this.collection.length; i++) {
				d += ' L ' + (this.collection[i].x * pixelsPerMillimeter) + ' ' + (this.collection[i].y * pixelsPerMillimeter);
			}
			return d;
		} else {
			return null;
		}
	},

	toPath: function(attributes) {
		var d = this.toDrawing();
		if (d) {

			// create path
			//
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			// set attributes
			//
			$(path).attr('class', this.collection.obstructed? 'obstructed path' : 'path');
			for (var name in attributes) {
				$(path).attr(name, attributes[name]);
			}
			$(path).attr('d', d);

			return path;
		} else {
			return null;
		}
	},

	render: function(svg, attributes) {
		$(svg).append(this.toPath(attributes));
	}
});

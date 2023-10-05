/******************************************************************************\
|                                                                              |
|                                    beam.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is the definition of a view of a beam (array of paths).          |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


function BeamView(collection) {

	// set attributes
	//
	this.collection = collection;

	// create subviews
	//
	this.regions = [];
	for (var i = 0; i < collection.length; i++) {
		this.regions.push(new PathView(collection[i]));
	}
	
	return this;
}

// extend prototype from "superclass"
//
BeamView.prototype = _.extend(Object.create(Object.prototype), {

	//
	// querying methods
	//

	getObstructed: function() {
		return this.regions.filter(function (element) {
			return element.collection.obstructed
		});
	},

	getUnobstructed: function() {
		return this.regions.filter(function (element) {
			return !element.collection.obstructed;
		});
	},

	//
	// canvas drawing methods
	//

	draw: function(context) {
		context.save();

		// set obstructed style
		//
		if (BeamView.obstructedOpacity) {
			context.globalAlpha = BeamView.obstructedOpacity;
		}
		if (BeamView.obstructedStyle) {
			context.strokeStyle = BeamView.obstructedStyle;
		}

		// draw obstructed paths
		//
		var obstructed = this.getObstructed(); 
		for (var i = 0; i < obstructed.length; i++) {
			obstructed[i].draw(context);
		}

		context.restore();

		// draw unobstructed paths
		//
		var unobstructed = this.getUnobstructed(); 
		for (var i = 0; i < unobstructed.length; i++) {
			unobstructed[i].draw(context);
		}
	},

	//
	// svg rendering methods
	//

	toGroup: function(attributes) {

		// create group
		//
		var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		// set attributes
		//
		$(group).attr('class', 'beam');
		for (var name in attributes) {
			$(group).attr(name, attributes[name]);
		}

		// add paths to group
		//
		for (var i = 0; i < this.regions.length; i++) {
			var path = this.regions[i].toPath();
			if (path) {
				$(group).append(path);
			}
		}

		return group;
	},

	render: function(svg, attributes) {
		var el = this.toGroup(attributes);
		$(svg).append(el);
		return el;
	}
});

//
// static attributes
//

_.extend(BeamView, {

	// obstructed beam attributes
	//
	obstructedOpacity: 0.25,
	obstructedStyle: "red"
});

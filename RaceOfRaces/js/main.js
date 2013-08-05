var height = 600, width = 600;
var frame = {"width": 10000, "height": 600, "xoffset": 0, "yoffset": 0};
var svg, svgGroup;
var animLow = 100, animMed = 600, animHigh = 1200;

// FrameZero Assets
var topImage = {"id":"topImage", "width": 600, "height": 80, "x":0, "url":"./img/top.jpg"};
var bottomImage = {"id":"bottomImage", "width": 600, "height": 80, "x":0, "url":"./img/bottom.jpg"};


init();

function init()
{
	svg = d3.select('#svgDiv').append('svg')
		.attr({
			'height': height,
			'width': width,
			'id': 'container'
		})
		.append('g')
		.attr('id', 'svgGroup')
		.attr('transform', 'translate(0,0)');
	svgGroup = d3.select('#svgGroup');

	// Set Frames 0

	svgGroup
		.append('image')
		.attr({
			'id': topImage.id,
			'x' : topImage.x ,
			'y' : height/2 - topImage.height,
			'width': topImage.width,
			'height': topImage.height,
			'xlink:href': topImage.url
			})
		

	svgGroup
		.append('image')
		.attr({
			'id': bottomImage.id,
			'x' : bottomImage.x ,
			'y' : height/2,
			'width': bottomImage.width,
			'height': bottomImage.height,
			'xlink:href': bottomImage.url
			});

	svgGroup
		.append('rect')
		.attr({
			'x': width/2 - 160, 'y': height/2 - 90,
			'width': 180, 'height': 180,
			'fill': 'none',
			'stroke': '#F00',
			'stroke-width': 3
		});

	// Center Line
	svg.append('line')
		.attr({
			'stroke-width': 2,
			'stroke': '#F00',
			'x1': frame.xoffset, 'x2': frame.width,
			'y1': frame.height/2 + frame.yoffset, 'y2': frame.height/2 + frame.yoffset			
	});

	shiftToFrame(0);

}

function moveImage(imageObject)
{
	console.log(this.x);
}

function shiftToFrame(i)
{
	svgGroup
	.transition()
	.duration(animHigh)
	.attr('transform', 'translate(' + -i*width + ',0)');
}
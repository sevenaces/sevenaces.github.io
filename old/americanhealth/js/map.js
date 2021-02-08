var levelsOfColor = 5;
// var levelsOfColor = 10;
// var color = d3.scale.linear().domain([1,levelsOfColor]).range(['#100000', '#F40000']);
// var color = d3.scale.linear().domain([1,levelsOfColor]).range(['#222255', '#222DD']);
var grey = '#666';

function color(num)
{
	var color = ["#FEE5D9", "#FCAE91", "#FB6A4A", "#DE2D26", "#A50F15"];
	// var color = ["#FFFFB2", "#FECC5C", "#FD8D3C", "#F03B20", "#BD0026"];
	// var color = ["#1A9641", "#A6D96A", "#FFFFBF", "#FDAE61", "#D7191C"];
	if(isNaN(num))
		return '#999';
	if(num >= 5)
		return color[4];
	if(num < 0)
		return '#999';
	
	return color[4-num];
}

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("border-radius", "5px")
	.style("padding", "10px")
	.style("color", "#000")
	.style("border", "solid 2px purple")
	.style("font-family", "'Blanch Condensed', Abel, verdana, sans-serif")
	.style("font-size", "19pt")
	.style('background', 'white')
	.style("visibility", "hidden")
	.text("State Name");

var stateName = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("padding", "10px")
	.style("font-family", "'Blanch Condensed', Abel, verdana, sans-serif")
	.style("font-size", "49pt")
	.style('color', 'black')
	.style("visibility", "hidden")
	.style("top", "1400px")
	.style("left", "950px")
	.text("State Name");

var selectFlag = false;
var mapData;
function mapInit()
{
	d3.json('./data/us-states.json', function(json){
		mapData = json;
		createMap([-1], 0);
	});
}

function createMap(selectedDrgs, groupedDrg)
{
	var path = d3.geo.path();

	

  	var districts = svg.append("g")
		.attr("class", "district");

	all_districts = districts.selectAll("path");
	svg.selectAll('path').remove();
  	
	    all_districts
	    .data(mapData.features)
	    .enter().append("path")
	    .attr('class', 'district')
	    .attr('fill', function(d){
	    	var ci = countriesNames.indexOf((d.properties["name"]));
	    	var colorIndex = 0;
	    	var colorIndexTemp = 0;
	    	var count = 0;
	    	if(selectedDrgs[0] != -1 && ci >=0)
		    {
		    	for(var i = 0; i < selectedDrgs.length; i++)
		    	{
			    		colorIndex += parseInt(levelsOfColor*(1 - prevelanceIndexArray[ci][selectedDrgs[i]]/prevelanceIndexMax[selectedDrgs[i]]));
		    	}
		    	colorIndex /= selectedDrgs.length;
		    }
		    else
		    {
		    	colorIndex = parseInt((1 - allDiseasePrevelance[ci])*levelsOfColor);
		    }
	    	if(ci == 16) colorIndex = -1;
	    	return color(parseInt(colorIndex));
	    })
	    .attr('id', function(d){
	    	return d.properties["name"];
	    })
	    .attr("d", path)
	    .on("mouseover", function(d){
			if(d.properties["name"] == "Kentucky")
				tooltip.text("Kentucky: Data not available");
			else
  				tooltip.text(d.properties["name"]);
  			return tooltip.style("visibility", "visible");
  		})
	    .on("mousemove", function(){return tooltip.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");})
  		.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
  		.on('click', function(d){ 
            if(d.properties["name"] != "Kentucky")
			{
				var flag = true;
            	stateName.text(d.properties["name"]);
			
				if(!d3.select('.selected').empty())
				{
					if(d3.select('.selected').attr('id') == this.id.toString())
					{
						shrinkMap(false);
						d3.selectAll('.district').attr('class', 'district');
						
						flag = false;
					}
				}
				if(flag)
				{
					d3.selectAll('.district').attr('class', 'district');
					d3.select(this).attr('class', 'district selected');
					
					shrinkMap(true);
					createHeartbeat(svg, 1500, 200, 600, 820, 300, getData(d.properties["name"],[-1]), true, true, false);
					
				}  
			}
  		});
}

function shrinkMap(shrink)
{
	if(shrink)
	{
	  svg
	    .transition()
	    .duration(300)
	    .attr('transform', 'scale(.8) translate(-80,140)');
		stateName.style("visibility", "visible");
	}
	else
	{
	   svg
	    .transition()
	    .duration(400)
	    .attr('transform', 'scale(1.3)');
		stateName.style("visibility", "hidden");
	}
}
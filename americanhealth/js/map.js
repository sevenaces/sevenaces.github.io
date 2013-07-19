var levelsOfColor = 10;
var color = d3.scale.linear().domain([1,levelsOfColor]).range(['pink', 'red']);
var grey = '#666';
var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("border-radius", "5px")
	.style("padding", "10px")
	.style("color", "#000")
	.style("border", "solid 2px #9f1111")
	.style("font-family", "abel, verdana, sans-serif")
	.style('background', 'white')
	.style("visibility", "hidden")
	.text("State Name");

var selectFlag = false;

function createMap(selectedDrgs)
{
	var path = d3.geo.path();

  	var districts = svg.append("g")
		.attr("class", "district");

	all_districts = districts.selectAll("path");

  	d3.json("./data/us-states.json", function(json) {
	    all_districts
	    .data(json.features)
	    .enter().append("path")
	    .attr('class', 'district')
	    .attr('fill', function(d){
	    	var ci = countriesNames.indexOf((d.properties["name"]));
	    	var colorIndex = 0;
	    	if(selectedDrgs[0] != -1)
		    {
		    	for(var i = 0; i < selectedDrgs.length; i++)
		    	{
			    	if(ci > 0)
			    		colorIndex += parseInt(levelsOfColor*(1 - prevelanceIndexArray[ci][selectedDrgs[i]]/prevelanceIndexMax[selectedDrgs[i]]));
		    	}
		    	colorIndex /= selectedDrgs.length;
		    }
		    else
		    	colorIndex = parseInt((1 - allDiseasePrevelance[ci])*10);
	    	
	    	return color(colorIndex);
	    })
	    .attr('id', function(d){
	    	// console.log(d.properties["name"]);
	    	return d.properties["name"];
	    })
	    .attr("d", path)
	    .on("mouseover", function(d){
  			tooltip.text(d.properties["name"]);
  			return tooltip.style("visibility", "visible");
  		})
	    .on("mousemove", function(){return tooltip.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");})
  		.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
  		.on('click', function(d){ 
  			var flag = true;
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
  				shrinkMap(true);
	  			d3.selectAll('.district').attr('class', 'district');
	  			d3.select(this).attr('class', 'district selected');
  			}  			
  		});
  	});
}

 function shrinkMap(shrink)
      {
        if(shrink)
        {
          svg
            .transition()
            .duration(1000)
            .attr('transform', 'scale(.6) translate(-100,0)');
        }
        else
        {
           svg
            .transition()
            .duration(400)
            .attr('transform', 'scale(1) translate(-50,0)');
        }
      }
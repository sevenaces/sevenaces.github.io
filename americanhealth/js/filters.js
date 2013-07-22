// DRG FILTER
var selectedDrgs = new Array();
var groupedDrgs = new Array();
d3.select('#filters').selectAll('li')
	.data(drgLabels)
	.enter()
	.append('li')
	.append('a')
	.attr('href', '#')
	.attr('id', function(d,i){ return 'filter-' + i;})
	.text(function(d) {return d;})
	.on('mouseover', function(){

	})
	.on('click', function(d,i){ toggleSelection(d,i);})


function toggleSelection(label, labelId)
{
	if(d3.select('#filter-' + labelId).attr('class') != 'filter-selected')
	{
		d3.select('#filter-' + labelId).attr('class', 'filter-selected');
		selectedDrgs.push(label);
	}
	else
	{
		d3.select('#filter-' + labelId).attr('class', '');
		selectedDrgs.splice(selectedDrgs.indexOf(label), 1);
	}

	// console.log(selectedDrgs);
	var index = -1;
	var indeces = new Array();
	groupedDrgs = [];
	for(var i = 0; i < selectedDrgs.length; i++)
	{
		do
		{
			index = drgCategories.indexOf(selectedDrgs[i], index+1)
			if(index >=0) 
				indeces.push(index);
		}while (index >=0);
		groupedDrgs.push(indeces.length);
		console.log(groupedDrgs);
		
	}
	if(indeces.length == 0)
		createMap([-1], 0)
	else
		createMap(indeces, groupedDrgs);

	// console.log(indeces);
}


// while (index >= 0) {
//     System.out.println(index);
//     index = word.indexOf(guess, index + 1);
// }


function getDrgs(codes)
{
	var drgsV = new Array();
	for(var i = 0; i < codes.length; i++)
	{
		// drgs.push(drgs[codes[i]]);
		drgsV.push(drgs[codes[i]]);
	}
	return drgsV;
}

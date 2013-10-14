// DRG FILTER
var singleFilter = true;
var selectedDrgs = new Array();
var groupedDrgs = new Array();
	
function filtersInit()
{
	d3.select('#filters').selectAll('li')
	.data(drgLabels)
	.enter()
	.append('li')
	.append('a')
	.attr('id', function(d,i){ return 'filter-' + i;})
	.text(function(d) {return d;})
	.on('click', function(d,i){ toggleSelection(d,i);})
	.attr('class', function(d){ if(d == 'All') return 'filter-selected';});
}

function toggleSelection(label, labelId)
{
	var index = -1;
	var indeces = new Array();
	groupedDrgs = [];
	d3.selectAll('.filter-selected').attr('class', '');
	d3.select('#filter-' + labelId).attr('class', 'filter-selected');
	selectedDrgs = label;
	
	if(selectedDrgs == 'All')
	{
		indeces = [-1];
	}
	else
	{
		do {
			index = drgCategories.indexOf(selectedDrgs, index+1);
			if(index >= 0)
				indeces.push(index);
		} while(index != -1)
	}

	createMap(indeces, groupedDrgs);
	shrinkMap(false);
}

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

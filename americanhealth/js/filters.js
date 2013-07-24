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
	.attr('href', '#')
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

	if(singleFilter)
	{
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
	}
	else
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
		}

		if(indeces.length == 0)
			indeces = [-1];
	}
	createMap(indeces, groupedDrgs);
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

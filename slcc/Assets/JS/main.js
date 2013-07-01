var data = [1,2,4,5,4];

var list = d3.select("body").append('ul');

var items = list.selectAll('li').data(data);

items.enter()
	.append('li')
	.text("test");
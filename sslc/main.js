var path = d3.geo.path().projection(d3.geo.mercator().translate([-5500, 1100]).scale(4000));

  var svg = d3.select("body")
  .append("svg");

  var districts = svg.append("g")
  .attr("id", "districts")
  .attr("class", "district");

  all_districts = districts.selectAll("path");

  d3.json("Data/india_states.geojson", function(json) {
    all_districts
    .data(json.features)
    .enter().append("path")
    .attr("d", path) 
    .attr("class", "pa")    
    //.attr("transform", "translate(-5500,1100)")    
  });
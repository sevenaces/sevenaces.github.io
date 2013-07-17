var height = 900, width = 800;
var margin = 50;

var darkRed = '#8B0000';
var scaleYAdjust = 1.2;
var scaleXAdjust = 20;

var heartbeatData = [0, .04, -0.04, 0, -0.04, 0.20, -0.20, 0.40, 0];
// var heartbeatData1 = [0, .04, -0.04, 0, -0.04, 0.20, -0.20, 0.40, 0];

var heartbeatsvg = d3.select('#heartbeat').append('svg')
                  .attr({
                    'width': width,
                    'height' : height
                  })
                  .append('g');

// createHeartbeat(heartbeatsvg, 300, 600, 100, 200, heartbeatData);
// createHeartbeat(heartbeatsvg, 300, 300, 300, 500, heartbeatData1);

function x(d,i) {return i*scaleXAdjust;}
function y(d,i) {return -d; }

function previous(accessor){
  return function(d,i){
   return i > 0 ? accessor(heartbeatData[i-1], i-1):0;
  }
}

function createHeartbeat(svg, height, width, mx, my, heartbeatData)
{
  // min width = height * 1.5;
  var path, ref, line;
  var zeros = [];
  var endZeros = [];
  var refHeartbeatData = [0, .04, -.04, 0, -.04, 1, -1, .40, 0];

  for (i = 0; i < refHeartbeatData.length; ++i) {
    refHeartbeatData[i] = refHeartbeatData[i]*height*scaleYAdjust;
    heartbeatData[i] = heartbeatData[i]*height*scaleYAdjust;
  }

  for(i = 2*scaleXAdjust; i < (width-height)/2; i+=scaleXAdjust)
  {
      zeros.push(0);
  }
  for(i = 4*scaleXAdjust; i < (width-height)/2; i+=scaleXAdjust)
  {
      endZeros.push(0);
  }
  

  var temp = zeros;
  temp = temp.concat(heartbeatData, zeros, endZeros);
  heartbeatData = temp;

  temp = zeros;
  temp = temp.concat(refHeartbeatData, zeros, endZeros);
  refHeartbeatData = temp;

  line = d3.svg.line()
    .interpolate('bundle')
    .x(x)
    .y(y);

  ref = svg
    .append('path')
    .datum(refHeartbeatData)
    .attr({
      'fill': 'none',
      'stroke-width':1,
      'stroke': darkRed,
      d: line
    })
    .attr('transform', 'translate('+mx+','+my+')');

  path = svg
    .append('path')
    .datum(heartbeatData)
    .attr({
      'fill': 'none',
      'stroke-width':2,
      'stroke': 'red',
      'stroke-dasharray': 292 + " " + 900,
      d: line
    })
    .attr('transform', 'translate('+mx+','+my+')');

    animateHeartbeat(path);
}

function animateHeartbeat(path)
{    
  path.attr('stroke-dashoffset', 0);    
  path.transition()
    .duration(3000)
    .ease('linear')
    .attr('stroke-dashoffset', -1200)
    .each("end", function(d,i){
      animateHeartbeat(path);
    });
}

var xxx = getData('ME', 12);
console.log(xxx);
createHeartbeat(heartbeatsvg, 300, 600, 100, 200, xxx);
function getData(stateCode, drg)
{
    /*
      0..x..-x..0..-y..z.z`..b..-b..0
      0 = netrual
      x = start
      y = start`
      z = abs value compared against value for healthy
      zd= average number of hospitals/capita
      b = average country

      Example: var heartbeatData = [0, .04, -0.04, 0, -0.04, 0.20, -0.20, 0.40, 0];
    */

    var prevelanceIndex = 0, hospitalIndex = 0, averagePrevelance = 0;

    prevelanceIndex = 1 - prevelanceIndexArray[countries.indexOf(stateCode)][drg]/prevelanceIndexMax[drg];
    averagePrevelance = averagePrevelanceArray[drg];
    hospitalIndex = -hospitalIndexArray[countries.indexOf(stateCode)];
    
    var data = [0, 0.04, -0.04, 0, -0.04,    prevelanceIndex,    hospitalIndex,   averagePrevelance, 0];
    return data;
}
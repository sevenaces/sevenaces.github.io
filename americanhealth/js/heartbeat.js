var darkRed = '#8B0000';
var scaleYAdjust = 1.2;
var scaleXAdjust = 20;

// var heartbeatData = [0, .04, -0.04, 0, -0.04, 0.20, -0.20, 0.40, 0];
// var heartbeatData1 = [0, .04, -0.04, 0, -0.04, 0.20, -0.20, 0.40, 0];


function x(d,i) {return i*scaleXAdjust;}
function y(d,i) {return -d; }

function previous(accessor){
  return function(d,i){
   return i > 0 ? accessor(heartbeatData[i-1], i-1):0;
  }
}

function createHeartbeat(svg, height, width, mx, my, heartbeatData)
{
  console.log(heartbeatData);
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

  d3.selectAll('.hb').remove();

  ref = svg
    .append('path')
    .datum(refHeartbeatData)
    .attr({
      'class': 'hb',
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
      'class': 'hb',
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

function getData(state, drgs)
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
    
    hospitalIndex = -hospitalIndexArray[countriesNames.indexOf(state)];

    
      
    if(drgs[0] != -1)
    {
      for(var i = 0; i < drgs.length; i++)
      {
        prevelanceIndex += 1 - prevelanceIndexArray[countriesNames.indexOf(state)][drgs[i]]/prevelanceIndexMax[drgs[i]];
        averagePrevelance += averagePrevelanceArray[drgs[i]];
      }
      prevelanceIndex /= drgs.length;
      averagePrevelance /= drgs.length;
      
      
    }
    else
    {

      prevelanceIndex = 1 - allDiseasePrevelance[countriesNames.indexOf(state)];
      averagePrevelance = 0.3651326228; 
    }

    var data = [0, 0.04, -0.04, 0, -0.04,    prevelanceIndex,    hospitalIndex,   averagePrevelance, 0];
    return data;
}
// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
  barPadding = .2;
  axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)

  let data = d3.csv("/data/population_spain.csv")
  data.then(function(data) {

    // Legend definition
    svg1.append("circle").attr("cx",360).attr("cy",-20).attr("r", 6).style("fill", "#003f5c")
    svg1.append("circle").attr("cx",360).attr("cy",10).attr("r", 6).style("fill", "#7a5195")
    svg1.append("circle").attr("cx",360).attr("cy",40).attr("r", 6).style("fill", "#ef5675")
    svg1.append("circle").attr("cx",360).attr("cy",70).attr("r", 6).style("fill", "#db8f00")
    svg1.append("text").attr("x", 380).attr("y", -20).text("Range 1: 16 to 19 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#003f5c")
    svg1.append("text").attr("x", 380).attr("y", 10).text("Range 2: 20 to 24 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#7a5195")
    svg1.append("text").attr("x", 380).attr("y", 40).text("Range 3: 25 to 54 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#ef5675")
    svg1.append("text").attr("x", 380).attr("y", 70).text("Range 4: 55 and above years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#db8f00")

// Axis limitations
var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
var xScale1 = d3.scaleBand()
var yScale = d3.scaleLinear().range([height - margin.bottom, 0])

// Axis ticks
var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

// Axis tags and domains
xScale0.domain(data.map(d => d.Year))
xScale1.domain(['Range1', 'Range2','Range3','Range4']).range([0, xScale0.bandwidth()])
yScale.domain([0, 80])

var Year = svg1.selectAll(".Year")
  .data(data)
  .enter().append("g")
  .attr("class", "Year")
  .attr("transform", d => `translate(${xScale0(d.Year)},0)`);

// Add field1 bars 
Year.selectAll(".bar.Range1")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range1")
.style("fill","#003f5c")
.attr("x", d => xScale1('Range1'))
.attr("y", d => yScale(d.Range1))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.bottom - yScale(d.Range1)
}).append('title') // Tooltip
    .text(function (d) { return 'Age Range: 16-19 yo' +
                           '\nPercentage Employed: ' + d.Range1 + '%' + 
                            '\n Year: ' + d.Year});

// Add field2 bars 
Year.selectAll(".bar.Range2")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range2")
.style("fill","#7a5195")
.attr("x", d => xScale1('Range2'))
.attr("y", d => yScale(d.Range2))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.bottom - yScale(d.Range2)
}).append('title') // Tooltip
    .text(function (d) { return 'Age Range: 20-24 yo' +
                           '\nPercentage Employed: ' + d.Range2 + '%' + 
                            '\n Year: ' + d.Year});

/* Add field3 bars */
Year.selectAll(".bar.Range3")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range3")
.style("fill","#ef5675")
.attr("x", d => xScale1('Range3'))
.attr("y", d => yScale(d.Range3))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.bottom - yScale(d.Range3)
}).append('title') // Tooltip
    .text(function (d) { return 'Age Range: 25-54 yo' +
                           '\nPercentage Employed: ' + d.Range3 + '%' + 
                            '\n Year: ' + d.Year});

/* Add field4 bars */
Year.selectAll(".bar.Range4")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range4")
.style("fill","#db8f00")
.attr("x", d => xScale1('Range4'))
.attr("y", d => yScale(d.Range4))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
  return height - margin.bottom - yScale(d.Range4)
}).append('title') // Tooltip
    .text(function (d) { return 'Age Range: 55+ yo' +
                           '\nPercentage Employed: ' + d.Range4 + '%' + 
                            '\n Year: ' + d.Year});

// Add the X Axis
svg1.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0,${height - margin.bottom})`)
     .call(xAxis);
// Add the Y Axis
svg1.append("g")
     .attr("class", "y axis")
     .call(yAxis);

// Axis labels
svg1.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", 180)
     .attr("y", 410)
     .attr('class', 'axisLabel')
     .style("font-size", "15px")
     .text("Year");


svg1.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("y", -50)
     .attr("x", -100)
     .attr("dy", ".75em")
     .attr('class', 'axisLabel')
     .style("font-size", "15px")
     .attr("transform", "rotate(-90)")
     .text("Population percentage");

// Title of the plot
svg1.append("text")
   .attr("x", 170)
   .attr("y", -20)
   .attr("text-anchor", "middle")
   .style("font-size", "22px")
   .style("font-weight", "bold")
   .text("Spanish Employment Rates");
  })

// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))


let iris = d3.csv("data/iris.csv")
iris.then(function(data) {
  // Scales
  let colorScale = {
    "Iris-setosa": "red",
    "Iris-versicolor": "green",
    "Iris-virginica": "blue"
  }

  let speciesFormatted = {
    "Iris-setosa": "Iris setosa",
    "Iris-versicolor": "Iris versicolor",
    "Iris-virginica": "Iris virginica"
  }
  var xScale = d3.scaleLinear()
    .domain([
      d3.min(data,function (d) { return d.PetalWidthCm })-0.1,
      d3.max(data,function (d) { return d.PetalWidthCm })
      ])
    .range([margin.left,width - margin.right])
  var yScale = d3.scaleLinear()
    .domain([
      d3.min(data,function (d) { return d.SepalLengthCm })-0.1,
      d3.max(data,function (d) { return d.SepalLengthCm })
      ])
    .range([height - margin.bottom,0])
  // SVG
  var g = svg2.append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  g.append("text")
   .attr("x", width/2)
   .attr("y", -20)
   .attr("text-anchor", "middle")
   .style("font-size", "22px")
   .style("font-weight", "bold")
   .text("Size of Iris Species");
  // X-axis
  var xAxis = d3.axisBottom(xScale);
  // Y-axis
  var yAxis = d3.axisLeft(yScale);
  // Circles
  var circles = g.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.PetalWidthCm) })
      .attr('cy',function (d) { return yScale(d.SepalLengthCm) })
      .attr('r',7.5)
      .attr('class','point')
      .style('fill',function (d,i) { return colorScale[d.Species] })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('class','selected')
          .attr('stroke-width',2)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('class', 'point')
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
    .text(function (d) { return 'Species: ' + speciesFormatted[d.Species] +
                           '\nPetal Width: ' + d.PetalWidthCm +
                           '\nSepal Length: ' + d.SepalLengthCm });
                           
  // X-axis
  g.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
      .call(xAxis)
  g.append('text') // X-axis Label
      .attr('class','axisLabel')
      .attr('y',height)
      .attr('x',width/2+margin.left)
      .attr('dy','.6em')
      .style('text-anchor','end')
      .text('Petal Width')
  // Y-axis
  g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (margin.left) + ', 0)')
      .call(yAxis)
  g.append('text') // y-axis Label
      .attr('class','axisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',-width/2+margin.top)
      .attr('y',0)
      .attr('dy','1em')
      .style('text-anchor','end')
      .text('Sepal Length')
})


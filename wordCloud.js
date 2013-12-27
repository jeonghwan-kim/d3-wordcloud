// ============================================================
//
// Description
//
// Input: [{text: string , freq: integer}]
// Output : Word cloud 
// 
// You must import belows
//    - d3.js
//    - d3.layout.cloud.js
//    - jquery
//
// ============================================================

var width = null;
var height = null;
var angle = 0;
var fill = d3.scale.category20();

$(document).ready( function() {
  width = $("#word-cloud").width();
  height = $("#word-cloud").height();

  $.ajax({
    type: "get",
    url: "getWords.php",
    dataType: "json",
    success: function(data) {
      showWordCloud(data);
    }
  });
});

var scale = null;

//
// Ready for word cloud
//
function showWordCloud(jsonData) {

  // 최대/최소 폰트 크기 설정
  adjustFontSize(jsonData);

  d3.layout.cloud()
    .size([width, height])
    .words(jsonData)
    .padding(2)
    .rotate(function() { return randomAngle(angle); })
    .font("Impact")
    .fontSize(function(d) {return scale(d.freq); })
    .on("end", draw)
    .start();
}

//
// scale <- adjust font size funtion
//
function adjustFontSize(jsonData) {
  var freqs = [];
  for (i in jsonData)
    freqs.push(jsonData[i]['freq']);

  scale = d3.scale.sqrt()
    .domain( [0, d3.max(freqs)] )
    .range( [0, 100] );
}

//
// Return +-andgle
//
var randomAngle = function(angle) {
  if (angle == 0)
    return 0;

  return  Math.round(Math.random()*2 - 1) *
          ~~(Math.random()*2) * 
          Math.round(Math.random() * 100 % angle);
};

//
// Draw word cloud
//
function draw(words) {
  d3.select("#word-cloud")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
  .selectAll("text")
    .data(words)
  .enter().append("text")
    .style("font-size", function(d) { return scale(d.freq); })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}
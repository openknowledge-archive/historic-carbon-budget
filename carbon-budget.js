$(function() {
  var url = 'http://thedatahub.org/api/data/f6d76bc5-8354-47ec-b893-48872229bd92/_search?callback=?';
  var size = 10000;
  var query = "WLD";
  var sort = "Year";
  var fields = "Country Code,Year,Rural population,Urban population,CO2 emissions (metric tons per capita)";

  $.getJSON(url,{
    size: size,
    q: query,
    fields: fields,
    sort: sort
  },processData);
});


function processData(data) {
  var xAxis = [];
  var yAxis = [];
  $.each(data.hits.hits, function(index, hit) {
    console.log(hit.fields['Year'] + ' :: ' + hit.fields['CO2 emissions (metric tons per capita)']);
    var yearString = hit.fields['Year'];
    var year = parseInt(yearString);
    if (year>2008) return;
    xAxis.push(year);
    var string = hit.fields['CO2 emissions (metric tons per capita)'];
    var n = parseFloat(string || '0');
    yAxis.push(n);
  });
  console.log(yAxis);

  var myChart = new Highcharts.Chart({
    chart: {
      renderTo: 'chart',
      type: 'spline'
    },
    title: {
      text: 'CO2 emissions (metric tons per capita)'
    },
    xAxis: {
      categories: xAxis,
      labels: {
        step: 10
      }
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'CO2/GDP',
        margin: 20
      }
    },
    series: [{
      name: 'Some data',
      data: yAxis
    }]
  });
}


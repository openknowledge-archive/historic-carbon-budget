
var spinner = null;

$(function() {
  var url = 'http://thedatahub.org/api/data/f6d76bc5-8354-47ec-b893-48872229bd92/_search?callback=?';
  var size = 10000;
  var query = "WLD,GBR,CHN,USA,IND";
  var sort = "Year";
  var fields = "Country Name,Country Code,Year,Rural population,Urban population,CO2 emissions (kg per 2000 US$ of GDP)";

  var opts = {
    lines: 12, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById('chart');
  spinner = new Spinner(opts).spin(target);

  $.getJSON(url,{
    size: size,
    q: query,
    fields: fields,
    sort: sort
  },processData);

});

function parseSeries(yData) {
  var series = [];
  $.each(yData, function(countryCode, countryData) {
    series.push({name: countryData.name, data: countryData.values})
  });
  return series;
}

function processData(data) {
  if (spinner) spinner.stop();
  var xAxis = [];
  var minYear = 1971;
  
  var yData = {};
  var countryCode = null;
  $.each(data.hits.hits, function(index, hit) {
    var yearString = hit.fields['Year'];
    var year = parseInt(yearString);
    if (year<minYear) return;
    if (year>2008) return;
    var string = hit.fields['CO2 emissions (kg per 2000 US$ of GDP)'];
    var n = parseFloat(string || '0');
    
    countryCode = hit.fields['Country Code'];
    var countryName = hit.fields['Country Name'];
    if (yData[countryCode] === undefined) {
      yData[countryCode] = {name: countryName, values: []};
    }
    yData[countryCode].values.push(n);
  });
  for (var n = 0; n < yData[countryCode].values.length; n++) {
    xAxis.push(minYear + n);
  }
  
  var myChart = new Highcharts.Chart({
    chart: {
      renderTo: 'chart',
      type: 'spline'
    },
    title: {
      text: 'CO2 emissions (kg per 2000 US$ of GDP)'
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
    series: parseSeries(yData)
  });
}


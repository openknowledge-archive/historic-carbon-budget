var STARTING_YEAR = 1960;
var MILLISECONDS_IN_A_YEAR = 24 * 3600 * 365.25 * 1000;

function getSeriesData() {
  return [10, 2, 17, 4, 5, 6, 3, 8, 9, 10];
}

function plotChart(starting_year, data_array) {
  return new Highcharts.Chart({
    chart: {
      renderTo: 'chart',
      type: 'spline'
    },
    title: {
      text: 'Example carbon data'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: 'CO2/GDP',
        margin: 20
      }
    },
    series: [{
      name: 'Some data',
      pointInterval: MILLISECONDS_IN_A_YEAR,
			pointStart: Date.UTC(starting_year, 0, 01),
      data: data_array
    }]
  });
}

$(document).ready(function() {
  var chart = plotChart(STARTING_YEAR, getSeriesData());
});

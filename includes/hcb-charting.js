$(document).ready(function() {
  chart1 = new Highcharts.Chart({
    chart: {
      renderTo: 'chart',
      type: 'spline'
    },
    title: {
      text: 'Example carbon data'
    },
    xAxis: {
      // type: 'datetime',
      // tickPixelInterval: 150,
      // maxZoom: 20 * 1000
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }]
  });
});

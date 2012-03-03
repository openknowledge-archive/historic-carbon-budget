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
  $.each(data.hits.hits, function(index, hit) {

    console.log(hit.fields['Year'] + ' :: ' + hit.fields['CO2 emissions (metric tons per capita)']);
  });

}

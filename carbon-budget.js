$(function() {
  var url = 'http://thedatahub.org/api/data/f6d76bc5-8354-47ec-b893-48872229bd92/_search?callback=?';
  var size = 2;

  $.getJSON(url,{
    size: size,
  },processData);
});


function processData(data) {
  console.log(data);

}

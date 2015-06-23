var geocoder;
var map;


function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 2,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function storeLocation(place, date, stay){
  var placeArray = place.split(", ") 
  var country = placeArray[1]
  var city = placeArray[0]
  $.post('/places', {country: country, city: city, date_of_visit: date, duration_of_visit: stay })
    .done(function(place){
      //AJAX request to create a new three things
    })
}

function codeAddress(locationData) {
  var address = locationData[0].value
  var date = locationData[1].value
  var stay = locationData[2].value
  console.log(locationData)
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log(results)
   place = results[0].formatted_address
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      }); 
      storeLocation(place, date, stay)   
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
  $(".addLocation").on('submit', function(e){
    e.preventDefault()
    var locationData = $(this).serializeArray()
    var mapsData = codeAddress(locationData)
   console.log(mapsData)
    console.log("hello")
  });
});



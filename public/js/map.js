var geocoder;
var map;


function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 2,
    minZoom: 2,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


function storeLocation(place, date, stay, top1, top2, top3){
  var placeArray = place.split(", ") 
  var country = placeArray[1]
  var city = placeArray[0]
  var top1 = top1.split(", ")[0]
  var top2 = top2.split(", ")[0]
  var top3 = top3.split(", ")[0]
console.log(place, date, stay, top1, top2, top3, 'anne')
  $.post('/places', {location: {city: city, country: country, date_of_visit: date, duration_of_visit: stay}, three_things: {one: top1, two: top2, three: top3 }})
    .done(function(place){
      console.log(place);
    })
}

function codeAddress(locationData) {
  //get's the data and from locationData and stores it into var usses it for pin
  var address = locationData[0].value
  var date = locationData[1].value
  var stay = locationData[2].value
  var top1 = locationData[3].value
  var top2 = locationData[4].value
  var top3 = locationData[5].value

  // console.log(locationData)
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log(results)
   place = results[0].formatted_address
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          icon: "./assets/images/red-marker.png",
          map: map,
          position: results[0].geometry.location
      }); 
      ///passes thru 3 data for ajax request
      storeLocation(place, date, stay, top1, top2, top3)   
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
//stores data for create new data
  $(".addLocation").on('submit', function(e){
    e.preventDefault()
    var locationData = $(this).serializeArray()
    // console.log(locationData)
    var mapsData = codeAddress(locationData)
  });

});



var geocoder;
var map;
threeThingsLatLng = [];

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 2,
    minZoom: 2,
    center: latlng
  }
  var styles = [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#0b3e09"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"color":"#03759e"},{"weight":"0.69"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#b0c7b0"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#162e1a"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#085301"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#54a453"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#112100"},{"saturation":"-21"},{"lightness":"35"},{"weight":"0.90"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"saturation":"-28"},{"weight":"2.24"},{"lightness":"9"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#506352"},{"lightness":"-3"},{"weight":"0.69"},{"saturation":"-21"},{"gamma":"1.00"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#ebf700"},{"lightness":19}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"color":"#e9ff00"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#203138"},{"lightness":17}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3ab1c6"}]}]
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setOptions({styles: styles});

}


function storeLocation(place, date, stay, top1, top2, top3, lat, lng){
  console.log(place, date, stay, top1, top2, top3, lat, lng)
  var placeArray = place.split(", ") 
  var country = placeArray[1]
  var city = placeArray[0]
  var lat = lat
  var lng = lng
  var top1 = {text: top1.split(", ")[0], lat: threeThingsLatLng[0][0], lng: threeThingsLatLng[0][1]}
  var top2 = {text: top2.split(", ")[0], lat: threeThingsLatLng[1][0], lng: threeThingsLatLng[1][1]}
  var top3 = {text: top3.split(", ")[0], lat: threeThingsLatLng[1][0], lng: threeThingsLatLng[1][1]}
  console.log(lat, lng ,"CHecking", 'before ajax', threeThingsLatLng); 
  $.post('/places', {
    location: {city: city, country: country, date_of_visit: date, duration_of_visit: stay, lat: lat, lng: lng}, three_things: {one: top1, two: top2, three: top3}
    })
    .done(function(place){
      //Clear the threeThingsLatLng array;
      threeThingsLatLng = [];
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
  console.log(locationData, 'location')

  // console.log(locationData)
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log(results)
   place = results[0].formatted_address
   lat = results[0].geometry.location.A
   lng = results[0].geometry.location.F
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          icon: "./assets/images/red-marker.png",
          map: map,
          position: results[0].geometry.location
      }); 
      ///passes thru 3 data for ajax request
      storeLocation(place, date, stay, top1, top2, top3, lat, lng)   
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);



$(document).ready(function(){
//stores data for create new data
  $(".new-location").on('click', function(e){
    e.preventDefault();
    var form = $(this).prev();
    var locationData = form.serializeArray()
    var mapsData = codeAddress(locationData)
  });

});



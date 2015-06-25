var geocoder;
var map;
threeThingsLatLng = [];

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 2,
    minZoom: 2,
    center: latlng,
    mapTypeControl: false,
    streetViewControl: false
  
  }
  var styles = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#424242"},{"lightness":"-61"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2a2727"},{"lightness":"-61"},{"saturation":"-100"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]}]
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setOptions({styles: styles});
  getLocationInfo();
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
          icon: "./assets/images/red-marker3.png",
          map: map,
          animation: google.maps.Animation.DROP,
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
    form.trigger('reset');
  });

});


